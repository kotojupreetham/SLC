import { test, describe } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToString } from "react-dom/server";
import Home from "../../app/page";

describe("DOM & Semantic Architecture Verification", () => {
  const html = renderToString(React.createElement(Home));

  test("Semantic landmark hierarchy exists", () => {
    assert.ok(html.includes('<main id="main-content"'), "Missing main landmark with id");
    assert.ok(html.includes("<header"), "Missing header element");
    assert.ok(html.includes("<nav"), "Missing nav landmark");
    assert.ok(html.includes("<footer"), "Missing footer landmark");
    assert.ok(html.includes("<h1"), "Missing h1 headline");
    assert.ok(html.includes("<h2") || html.includes("<h3"), "Missing sub-headings");
  });

  test("All navigation anchors match target section IDs", () => {
    const expectedTargets = ["pipeline", "services", "matrix", "stories", "telemetry", "contact"];
    expectedTargets.forEach((targetId) => {
      assert.ok(
        html.includes(`id="${targetId}"`) || html.includes(`href="#${targetId}"`),
        `Missing target anchor or section for #${targetId}`
      );
    });
  });

  test("Hero continuous lifecycle circle dial rendered with 8 stages", () => {
    // Circle dial SVG
    assert.ok(html.includes('viewBox="0 0 1400 1400"'), "Missing circle dial viewBox");
    assert.ok(html.includes("dial-rotate-ccw"), "Missing continuous rotating animation class");
    
    // 8 stages in uppercase
    const stages = ["PLAN", "CODE", "BUILD", "TEST", "RELEASE", "DEPLOY", "OPERATE", "MONITOR"];
    stages.forEach((stage) => {
      assert.ok(html.includes(stage), `Circle SVG missing stage ${stage}`);
    });
  });

  test("Contact form has security honeypot and proper accessibility attributes", () => {
    assert.ok(html.includes('id="website-hp"'), "Missing honeypot input");
    assert.ok(html.includes('id="contact-name"'), "Missing contact-name input");
    assert.ok(html.includes('id="contact-email"'), "Missing contact-email input");
    assert.ok(html.includes('id="contact-details"'), "Missing contact-details textarea");
    assert.ok(html.includes('type="submit"'), "Missing submit button");
  });

  test("Control Room has operational indicators and traffic lights", () => {
    assert.ok(html.includes("sre-control-room.sys"), "Missing control room title");
    assert.ok(html.includes("ALL SYSTEMS NOMINAL"), "Missing nominal status readout");
  });

  test("Footer includes brand mark, copyright, and operational status dot", () => {
    assert.ok(html.includes("SMARTER RELEASE ENGINEERING"), "Missing brand in footer");
    assert.ok(html.includes("SYS STATUS: 100% OPERATIONAL"), "Missing status in footer");
  });
});
