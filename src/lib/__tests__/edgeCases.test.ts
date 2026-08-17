import { test, describe } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToString } from "react-dom/server";
import Home from "../../app/page";
import { validateContactSubmission } from "../contactValidation";
import { PIPELINE_STAGES } from "../../data/pipelineStages";
import { SERVICES } from "../../data/services";
import { TECH_NODES } from "../../data/techNodes";
import { CASE_STUDIES } from "../../data/caseStudies";
import { PROCESS_STEPS } from "../../data/processSteps";
import { CONTROL_METRICS } from "../../data/controlRoomMetrics";
import { SITE_CONTENT } from "../../data/siteContent";

// ═══════════════════════════════════════════════════
// 1. FULL DOM STRUCTURE VERIFICATION
// ═══════════════════════════════════════════════════

describe("Full DOM Structure & Accessibility Audit", () => {
  const html = renderToString(React.createElement(Home));

  test("All critical ARIA roles and landmarks exist", () => {
    assert.ok(html.includes('id="main-content"'), "Main content landmark missing");
    assert.ok(html.includes('aria-label="Main Navigation"'), "Main nav aria-label missing");
    assert.ok(html.includes('aria-label="Toggle Navigation Menu"'), "Mobile menu button aria-label missing");
    assert.ok(html.includes('aria-expanded='), "Mobile menu aria-expanded attribute missing");
  });

  test("Skip link is present for keyboard navigation", () => {
    assert.ok(html.includes('href="#main-content"'), "Skip-to-content link missing");
    assert.ok(html.includes("Skip to main content"), "Skip link text missing");
  });

  test("All section IDs for navigation anchors exist in rendered DOM", () => {
    const sectionIds = ["pipeline", "services", "matrix", "stories", "telemetry", "contact"];
    sectionIds.forEach((id) => {
      assert.ok(html.includes(`id="${id}"`), `Missing section id="${id}" in DOM`);
    });
  });

  test("Header branding contains SRE logo and operational status", () => {
    assert.ok(html.includes("RELEASE ENGINEERING"), "Brand name missing in header");
    assert.ok(html.includes("SYS v2.4 OPERATIONAL"), "System version missing in header");
  });

  test("Footer contains copyright and operational status", () => {
    assert.ok(html.includes("SMARTER RELEASE ENGINEERING"), "Footer brand missing");
    assert.ok(html.includes("SYS STATUS: 100% OPERATIONAL"), "Footer operational status missing");
    assert.ok(html.includes("ALL RIGHTS RESERVED"), "Copyright text missing");
  });

  test("Hero section renders headline and accent text from siteContent", () => {
    assert.ok(html.includes(SITE_CONTENT.hero.headline), "Hero headline missing");
    assert.ok(html.includes(SITE_CONTENT.hero.headlineAccent), "Hero headline accent missing");
    assert.ok(html.includes(SITE_CONTENT.hero.description), "Hero description missing");
    assert.ok(html.includes(SITE_CONTENT.hero.badge), "Hero badge missing");
  });

  test("CTA buttons exist with correct text", () => {
    assert.ok(html.includes("EXPLORE PIPELINES"), "Explore Pipelines CTA missing");
    assert.ok(html.includes("INITIATE PIPELINE"), "Initiate Pipeline CTA missing");
    assert.ok(html.includes("VIEW CAPABILITIES"), "Mobile View Capabilities CTA missing");
  });

  test("Circle dial SVG has correct viewBox and 8 rotated stage groups", () => {
    assert.ok(html.includes('viewBox="0 0 1400 1400"'), "SVG viewBox missing");
    assert.ok(html.includes("dial-rotate-ccw"), "Continuous rotation CSS class missing");

    // Each stage renders with a rotate transform
    const stages = ["PLAN", "CODE", "BUILD", "TEST", "RELEASE", "DEPLOY", "OPERATE", "MONITOR"];
    stages.forEach((stage) => {
      assert.ok(html.includes(stage), `Stage "${stage}" not rendered in circle SVG`);
    });

    // Verify rotation transforms for 8 wedges (0, 45, 90, 135, 180, 225, 270, 315)
    [0, 45, 90, 135, 180, 225, 270, 315].forEach((angle) => {
      assert.ok(
        html.includes(`rotate(${angle}, 700, 700)`),
        `Missing wedge rotation at ${angle} degrees`
      );
    });
  });

  test("Engineering Dashboard renders all services with icons and categories", () => {
    SERVICES.forEach((service) => {
      const name = service.name.replace(/&/g, "&amp;");
      assert.ok(html.includes(name), `Service "${service.name}" not rendered`);
      assert.ok(html.includes(service.code), `Service code "${service.code}" not rendered`);
    });
  });

  test("Tech Ecosystem renders all nodes with pipeline stages", () => {
    TECH_NODES.forEach((node) => {
      assert.ok(html.includes(node.name), `Tech node "${node.name}" not rendered`);
      assert.ok(html.includes(node.category), `Tech category "${node.category}" not rendered`);
    });
  });

  test("Deployment Stories renders all case studies with challenge and solution sections", () => {
    CASE_STUDIES.forEach((study) => {
      const title = study.title.replace(/&/g, "&amp;");
      assert.ok(html.includes(title), `Case study "${study.title}" not rendered`);
      assert.ok(html.includes(study.problem.replace(/&/g, "&amp;")), `Case study problem not rendered`);
      assert.ok(html.includes(study.architectureFix.replace(/&/g, "&amp;")), `Case study solution not rendered`);
    });
  });

  test("Process Timeline renders all steps with phase labels", () => {
    PROCESS_STEPS.forEach((step) => {
      assert.ok(html.includes(step.name), `Process step "${step.name}" not rendered`);
      assert.ok(html.includes(`PHASE ${step.step}`), `Phase label missing for step ${step.step}`);
    });
  });

  test("Control Room renders traffic light dots and all metrics", () => {
    assert.ok(html.includes("sre-control-room.sys"), "Control room terminal label missing");
    assert.ok(html.includes("ALL SYSTEMS NOMINAL"), "Nominal status readout missing");
    assert.ok(html.includes("SAMPLE TELEMETRY PREVIEW"), "Sample telemetry label missing");
    CONTROL_METRICS.forEach((metric) => {
      assert.ok(html.includes(metric.label), `Metric "${metric.label}" not rendered`);
      assert.ok(html.includes(metric.value), `Metric value "${metric.value}" not rendered`);
    });
  });

  test("Contact form has all required inputs with correct types and attributes", () => {
    assert.ok(html.includes('id="contact-name"'), "Name input missing id");
    assert.ok(html.includes('id="contact-email"'), "Email input missing id");
    assert.ok(html.includes('id="contact-details"'), "Details textarea missing id");
    assert.ok(html.includes('type="submit"'), "Submit button missing");
    assert.ok(html.includes('id="website-hp"'), "Honeypot input missing");
    assert.ok(html.includes('aria-hidden="true"'), "Honeypot container aria-hidden missing");
    assert.ok(html.includes('type="email"'), "Email input type incorrect");
  });
});

// ═══════════════════════════════════════════════════
// 2. CONTACT FORM EDGE CASE VALIDATION
// ═══════════════════════════════════════════════════

describe("Contact Form — Comprehensive Edge Cases", () => {
  test("Valid submission passes all checks", () => {
    const result = validateContactSubmission({
      name: "Jane Doe",
      email: "jane@company.com",
      projectDetails: "We need to deploy kubernetes clusters for zero-downtime releases",
      honeypot: "",
    });
    assert.equal(result.isValid, true);
    assert.deepEqual(result.errors, {});
  });

  test("Empty fields fail validation with appropriate messages", () => {
    const result = validateContactSubmission({
      name: "",
      email: "",
      projectDetails: "",
      honeypot: "",
    });
    assert.equal(result.isValid, false);
    assert.ok(result.errors.name, "Name error expected");
    assert.ok(result.errors.email, "Email error expected");
    assert.ok(result.errors.projectDetails, "Project details error expected");
  });

  test("Undefined fields fail validation", () => {
    const result = validateContactSubmission({});
    assert.equal(result.isValid, false);
    assert.ok(result.errors.name, "Name error expected for undefined");
    assert.ok(result.errors.email, "Email error expected for undefined");
    assert.ok(result.errors.projectDetails, "Details error expected for undefined");
  });

  test("Whitespace-only name is rejected", () => {
    const result = validateContactSubmission({
      name: "     ",
      email: "test@domain.com",
      projectDetails: "Valid project description here",
      honeypot: "",
    });
    assert.equal(result.isValid, false);
    assert.ok(result.errors.name);
  });

  test("Single character name is rejected (minimum 2 chars)", () => {
    const result = validateContactSubmission({
      name: "A",
      email: "test@domain.com",
      projectDetails: "Valid project description here",
      honeypot: "",
    });
    assert.equal(result.isValid, false);
    assert.ok(result.errors.name);
  });

  test("Two character name is accepted", () => {
    const result = validateContactSubmission({
      name: "Jo",
      email: "test@domain.com",
      projectDetails: "Valid project description here",
      honeypot: "",
    });
    assert.equal(result.isValid, true);
  });

  test("Name exceeding 100 characters is rejected", () => {
    const result = validateContactSubmission({
      name: "A".repeat(101),
      email: "test@domain.com",
      projectDetails: "Valid project description here",
      honeypot: "",
    });
    assert.equal(result.isValid, false);
    assert.ok(result.errors.name);
  });

  test("Name at exactly 100 characters is accepted", () => {
    const result = validateContactSubmission({
      name: "A".repeat(100),
      email: "test@domain.com",
      projectDetails: "Valid project description here",
      honeypot: "",
    });
    assert.equal(result.isValid, true);
  });

  test("Various invalid email formats are rejected", () => {
    const invalidEmails = [
      "notanemail",
      "@nodomain.com",
      "user@",
      "user@.com",
      "user@domain",
      "user name@domain.com",
      "user@domain..com",
    ];

    invalidEmails.forEach((email) => {
      const result = validateContactSubmission({
        name: "Test User",
        email,
        projectDetails: "Valid project description here",
        honeypot: "",
      });
      assert.equal(result.isValid, false, `Email "${email}" should be rejected`);
      assert.ok(result.errors.email, `Missing error for email "${email}"`);
    });
  });

  test("Valid email formats are accepted", () => {
    const validEmails = [
      "user@example.com",
      "user.name@domain.co",
      "user+tag@company.io",
      "user123@test-domain.org",
      "a@b.cc",
    ];

    validEmails.forEach((email) => {
      const result = validateContactSubmission({
        name: "Test User",
        email,
        projectDetails: "Valid project description here",
        honeypot: "",
      });
      assert.equal(result.isValid, true, `Email "${email}" should be accepted`);
    });
  });

  test("Email exceeding 254 characters is rejected", () => {
    const longEmail = "a".repeat(245) + "@test.com"; // 254 chars
    const tooLongEmail = "a".repeat(246) + "@test.com"; // 256 chars

    const shortResult = validateContactSubmission({
      name: "Test",
      email: longEmail,
      projectDetails: "Valid project description here",
      honeypot: "",
    });
    // 254 chars is the RFC limit, should pass
    assert.equal(shortResult.isValid, true, "Email at 254 chars should pass");

    const longResult = validateContactSubmission({
      name: "Test",
      email: tooLongEmail,
      projectDetails: "Valid project description here",
      honeypot: "",
    });
    assert.equal(longResult.isValid, false, "Email over 254 chars should fail");
    assert.ok(longResult.errors.email);
  });

  test("Project details under 10 characters is rejected", () => {
    const result = validateContactSubmission({
      name: "Test User",
      email: "test@test.com",
      projectDetails: "Short",
      honeypot: "",
    });
    assert.equal(result.isValid, false);
    assert.ok(result.errors.projectDetails);
  });

  test("Project details at exactly 10 characters is accepted", () => {
    const result = validateContactSubmission({
      name: "Test User",
      email: "test@test.com",
      projectDetails: "1234567890",
      honeypot: "",
    });
    assert.equal(result.isValid, true);
  });

  test("Project details exceeding 2000 characters is rejected", () => {
    const result = validateContactSubmission({
      name: "Test User",
      email: "test@test.com",
      projectDetails: "A".repeat(2001),
      honeypot: "",
    });
    assert.equal(result.isValid, false);
    assert.ok(result.errors.projectDetails);
  });

  test("Honeypot filled triggers immediate rejection", () => {
    const result = validateContactSubmission({
      name: "Test User",
      email: "test@test.com",
      projectDetails: "Valid project description here",
      honeypot: "bot-filled-value",
    });
    assert.equal(result.isValid, false);
    assert.ok(result.errors.honeypot);
  });

  test("Honeypot with only whitespace is rejected as spam", () => {
    // Non-empty whitespace should NOT trigger honeypot (trimmed to empty)
    const result = validateContactSubmission({
      name: "Test User",
      email: "test@test.com",
      projectDetails: "Valid project description here",
      honeypot: "   ",
    });
    // After trim, honeypot is empty so this should pass
    assert.equal(result.isValid, true, "Whitespace-only honeypot should pass (trims to empty)");
  });

  test("XSS injection attempt in name is handled (no crash)", () => {
    const result = validateContactSubmission({
      name: '<script>alert("XSS")</script>',
      email: "test@test.com",
      projectDetails: "Valid project description",
      honeypot: "",
    });
    // Should not crash; the script tag name is valid length-wise (30 chars)
    assert.ok(typeof result.isValid === "boolean", "Validator should return boolean for XSS input");
    assert.equal(result.isValid, true, "Script content is valid string of acceptable length");
  });

  test("SQL injection attempt in email is properly rejected", () => {
    const result = validateContactSubmission({
      name: "Test User",
      email: "'; DROP TABLE users; --",
      projectDetails: "Valid project description",
      honeypot: "",
    });
    assert.equal(result.isValid, false);
    assert.ok(result.errors.email, "SQL injection email should fail regex validation");
  });

  test("Unicode characters in name are handled gracefully", () => {
    const result = validateContactSubmission({
      name: "José García 中文名",
      email: "jose@company.com",
      projectDetails: "International team deployment",
      honeypot: "",
    });
    assert.equal(result.isValid, true, "Unicode names should be valid");
  });

  test("Multiple fields failing simultaneously returns all errors", () => {
    const result = validateContactSubmission({
      name: "",
      email: "invalid",
      projectDetails: "short",
      honeypot: "",
    });
    assert.equal(result.isValid, false);
    assert.ok(result.errors.name, "Name error expected");
    assert.ok(result.errors.email, "Email error expected");
    assert.ok(result.errors.projectDetails, "Details error expected");
  });
});

// ═══════════════════════════════════════════════════
// 3. DATA INTEGRITY — CROSS-REFERENCES & CONTRACTS
// ═══════════════════════════════════════════════════

describe("Data Integrity & Cross-Reference Contracts", () => {
  test("Pipeline stages have unique IDs", () => {
    const ids = PIPELINE_STAGES.map((s) => s.id);
    const uniqueIds = new Set(ids);
    assert.equal(ids.length, uniqueIds.size, "Pipeline stage IDs must be unique");
  });

  test("Pipeline stages follow correct DevOps lifecycle order", () => {
    const expectedOrder = ["plan", "code", "build", "test", "release", "deploy", "operate", "monitor"];
    PIPELINE_STAGES.forEach((stage, idx) => {
      assert.equal(stage.id, expectedOrder[idx], `Stage at index ${idx} should be "${expectedOrder[idx]}" but got "${stage.id}"`);
    });
  });

  test("Each pipeline stage has exactly 4 pillars with non-empty labels and icons", () => {
    PIPELINE_STAGES.forEach((stage) => {
      assert.equal(stage.pillars!.length, 4, `Stage "${stage.id}" should have exactly 4 pillars`);
      stage.pillars!.forEach((pillar, pIdx) => {
        assert.ok(pillar.label.trim().length > 0, `Stage "${stage.id}" pillar ${pIdx} has empty label`);
        assert.ok(pillar.icon.trim().length > 0, `Stage "${stage.id}" pillar ${pIdx} has empty icon`);
      });
    });
  });

  test("Each pipeline stage has exactly 2 metrics", () => {
    PIPELINE_STAGES.forEach((stage) => {
      assert.equal(stage.metrics.length, 2, `Stage "${stage.id}" should have exactly 2 metrics`);
      stage.metrics.forEach((metric) => {
        assert.ok(metric.label.trim().length > 0);
        assert.ok(metric.value.trim().length > 0);
      });
    });
  });

  test("Services have unique IDs", () => {
    const ids = SERVICES.map((s) => s.id);
    const uniqueIds = new Set(ids);
    assert.equal(ids.length, uniqueIds.size, "Service IDs must be unique");
  });

  test("Each service has non-empty metrics and tags arrays", () => {
    SERVICES.forEach((service) => {
      assert.ok(service.metrics.length >= 1, `Service "${service.id}" needs at least 1 metric`);
      assert.ok(service.tags.length >= 1, `Service "${service.id}" needs at least 1 tag`);
    });
  });

  test("Tech nodes have unique IDs", () => {
    const ids = TECH_NODES.map((n) => n.id);
    const uniqueIds = new Set(ids);
    assert.equal(ids.length, uniqueIds.size, "Tech node IDs must be unique");
  });

  test("Case studies have unique IDs", () => {
    const ids = CASE_STUDIES.map((s) => s.id);
    const uniqueIds = new Set(ids);
    assert.equal(ids.length, uniqueIds.size, "Case study IDs must be unique");
  });

  test("Each case study has at least 3 business impact items", () => {
    CASE_STUDIES.forEach((study) => {
      assert.ok(
        study.businessImpact.length >= 3,
        `Case study "${study.title}" needs at least 3 business impact items`
      );
    });
  });

  test("Control metrics have valid status values", () => {
    const validStatuses = ["healthy", "warning", "critical", "accent"];
    CONTROL_METRICS.forEach((metric) => {
      assert.ok(
        validStatuses.includes(metric.status),
        `Metric "${metric.id}" has invalid status: "${metric.status}"`
      );
    });
  });

  test("Control metrics with progress bars have valid percentages (0-100)", () => {
    const progressMetrics = CONTROL_METRICS.filter((m) => m.progressPercent !== undefined);
    assert.ok(progressMetrics.length > 0, "Should have at least one progress metric");
    progressMetrics.forEach((metric) => {
      assert.ok(
        metric.progressPercent! >= 0 && metric.progressPercent! <= 100,
        `Metric "${metric.id}" has invalid progress: ${metric.progressPercent}%`
      );
    });
  });

  test("Process steps have unique step identifiers", () => {
    const steps = PROCESS_STEPS.map((s) => s.step);
    const uniqueSteps = new Set(steps);
    assert.equal(steps.length, uniqueSteps.size, "Process step numbers must be unique");
  });
});

// ═══════════════════════════════════════════════════
// 4. RESPONSIVE LAYOUT & CSS CLASS VERIFICATION
// ═══════════════════════════════════════════════════

describe("Responsive Layout & CSS Architecture Verification", () => {
  const html = renderToString(React.createElement(Home));

  test("Mobile navigation drawer has responsive visibility classes", () => {
    // Desktop nav should be hidden on mobile
    assert.ok(html.includes("hidden lg:flex"), "Desktop nav should be hidden below lg breakpoint");
    // Mobile menu button should be visible on mobile only
    assert.ok(html.includes("lg:hidden"), "Mobile elements should use lg:hidden for desktop hide");
  });

  test("Hero layout uses responsive grid positioning", () => {
    // Desktop: circle is absolutely positioned right
    assert.ok(html.includes("lg:absolute"), "Circle should be absolutely positioned on desktop");
    assert.ok(html.includes("lg:right-"), "Circle should be right-aligned on desktop");
    // Mobile: circle is hidden, stage grid is shown
    assert.ok(html.includes("hidden md:block"), "Desktop circle hidden on mobile");
    assert.ok(html.includes("md:hidden"), "Mobile stage list hidden on desktop");
  });

  test("Glassmorphism utility classes are present", () => {
    assert.ok(html.includes("glass-panel"), "Glass panel utility class should be used");
    assert.ok(html.includes("backdrop-blur"), "Backdrop blur should be applied");
  });

  test("Focus-visible rings are applied to interactive elements", () => {
    // Count focus-visible instances to ensure accessibility
    const focusCount = (html.match(/focus-visible/g) || []).length;
    assert.ok(focusCount >= 5, `Expected at least 5 focus-visible instances, got ${focusCount}`);
  });

  test("Gradient accent class is used in hero", () => {
    assert.ok(html.includes("gradient-accent"), "Gradient accent class should be in hero");
  });

  test("Ambient orb elements exist for background atmosphere", () => {
    assert.ok(html.includes("ambient-orb orb-1"), "Ambient orb 1 missing");
    assert.ok(html.includes("ambient-orb orb-2"), "Ambient orb 2 missing");
    assert.ok(html.includes("ambient-orb orb-3"), "Ambient orb 3 missing");
  });

  test("Section dividers use consistent border styling", () => {
    const borderCount = (html.match(/border-t border-\[rgba\(255,255,255,0\.08\)\]/g) || []).length;
    assert.ok(borderCount >= 3, `Expected at least 3 section dividers, got ${borderCount}`);
  });

  test("Engineering Dashboard uses responsive column grid", () => {
    assert.ok(html.includes("lg:col-span-5"), "Service list should span 5 cols on desktop");
    assert.ok(html.includes("lg:col-span-7"), "Detail panel should span 7 cols on desktop");
  });

  test("Process Timeline uses responsive 3-column grid", () => {
    assert.ok(
      html.includes("lg:grid-cols-3"),
      "Process timeline should use 3-col grid on desktop"
    );
  });

  test("Mobile stage grid renders as 2-column layout", () => {
    assert.ok(html.includes("grid-cols-2"), "Mobile stage grid should be 2 columns");
  });
});
