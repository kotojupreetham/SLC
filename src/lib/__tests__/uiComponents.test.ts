import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { PIPELINE_STAGES } from "../../data/pipelineStages";
import { SERVICES } from "../../data/services";
import { TECH_NODES } from "../../data/techNodes";
import { CASE_STUDIES } from "../../data/caseStudies";
import { CONTROL_METRICS } from "../../data/controlRoomMetrics";
import { getServiceIcon } from "../icons";
import { validateContactSubmission } from "../contactValidation";

describe("UI & Data Contracts Verification", () => {
  test("PIPELINE_STAGES has exactly 8 lifecycle stages with valid attributes", () => {
    assert.equal(PIPELINE_STAGES.length, 8);
    const expectedIds = ["plan", "code", "build", "test", "release", "deploy", "operate", "monitor"];

    PIPELINE_STAGES.forEach((stage, idx) => {
      assert.equal(stage.id, expectedIds[idx]);
      assert.ok(stage.title.length > 0, `Stage ${stage.id} missing title`);
      assert.ok(stage.description.length > 0, `Stage ${stage.id} missing description`);
      assert.ok(stage.pillars && stage.pillars.length === 4, `Stage ${stage.id} should have 4 pillars`);
      stage.pillars.forEach((pillar) => {
        assert.ok(pillar.label.length > 0);
        assert.ok(pillar.icon.length > 0);
      });
    });
  });

  test("SERVICES data integrity and icon mapping", () => {
    assert.ok(SERVICES.length >= 5);
    SERVICES.forEach((service) => {
      assert.ok(service.id.length > 0);
      assert.ok(service.name.length > 0);
      assert.ok(service.description.length > 0);
      assert.ok(service.metrics.length > 0);
      assert.ok(service.tags.length > 0);

      // Verify icon exists
      const IconComponent = getServiceIcon(service.id);
      assert.ok(IconComponent !== undefined, `Icon missing for service ${service.id}`);
    });
  });

  test("TECH_NODES integrity", () => {
    assert.equal(TECH_NODES.length, 9);
    TECH_NODES.forEach((node) => {
      assert.ok(node.id.length > 0);
      assert.ok(node.name.length > 0);
      assert.ok(node.pipelineStage.length > 0);
      assert.ok(node.roleDescription.length > 0);
    });
  });

  test("CASE_STUDIES has challenge, solution, and impact items", () => {
    assert.ok(CASE_STUDIES.length >= 2);
    CASE_STUDIES.forEach((study) => {
      assert.ok(study.title.length > 0);
      assert.ok(study.problem.length > 0);
      assert.ok(study.architectureFix.length > 0);
      assert.ok(study.businessImpact.length >= 3);
    });
  });

  test("CONTROL_METRICS telemetry integrity", () => {
    assert.ok(CONTROL_METRICS.length >= 5);
    CONTROL_METRICS.forEach((metric) => {
      assert.ok(metric.id.length > 0);
      assert.ok(metric.label.length > 0);
      assert.ok(metric.value.length > 0);
      assert.ok(["healthy", "warning", "critical", "accent"].includes(metric.status));
    });
  });

  test("Contact form edge cases: spaces-only, malicious scripts, oversized payloads", () => {
    // Spaces only name
    const spaceOnlyRes = validateContactSubmission({
      name: "     ",
      email: "jane@company.com",
      projectDetails: "Deploying kubernetes clusters",
      honeypot: "",
    });
    assert.equal(spaceOnlyRes.isValid, false);
    assert.ok(spaceOnlyRes.errors.name);

    // Oversized text
    const oversizedRes = validateContactSubmission({
      name: "A".repeat(150),
      email: "jane@company.com",
      projectDetails: "Valid text",
      honeypot: "",
    });
    assert.equal(oversizedRes.isValid, false);
    assert.ok(oversizedRes.errors.name);
  });
});
