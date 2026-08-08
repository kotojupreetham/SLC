import test from "node:test";
import assert from "node:assert/strict";
import { validateContactSubmission } from "../contactValidation";

test("validateContactSubmission - valid submission", () => {
  const result = validateContactSubmission({
    name: "Jane Doe",
    email: "jane@example.com",
    projectDetails: "Looking to modernize our Kubernetes deployment pipelines.",
  });
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test("validateContactSubmission - missing required fields", () => {
  const result = validateContactSubmission({});
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.projectDetails);
});

test("validateContactSubmission - invalid email format", () => {
  const result = validateContactSubmission({
    name: "Jane Doe",
    email: "not-an-email",
    projectDetails: "Valid details string over 10 chars",
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.email);
});

test("validateContactSubmission - honeypot triggers failure", () => {
  const result = validateContactSubmission({
    name: "Jane Doe",
    email: "jane@example.com",
    projectDetails: "Valid details string over 10 chars",
    honeypot: "http://spam-link.com",
  });
  assert.equal(result.isValid, false);
  assert.equal(result.errors.honeypot, "Spam detected");
});
