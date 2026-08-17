export interface ContactSubmission {
  name: string;
  email: string;
  projectDetails: string;
  honeypot?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    email?: string;
    projectDetails?: string;
    honeypot?: string;
  };
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;

export function validateContactSubmission(data: Partial<ContactSubmission>): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  // Honeypot check
  if (data.honeypot && data.honeypot.trim() !== "") {
    errors.honeypot = "Spam detected";
    return { isValid: false, errors };
  }

  // Name validation
  const name = data.name?.trim() || "";
  if (!name) {
    errors.name = "Engineer or organization name is required.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters long.";
  } else if (name.length > 100) {
    errors.name = "Name cannot exceed 100 characters.";
  }

  // Email validation
  const email = data.email?.trim() || "";
  if (!email) {
    errors.email = "Work email address is required.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid work email address.";
  } else if (email.length > 254) {
    errors.email = "Email address is too long.";
  }

  // Project details validation
  const details = data.projectDetails?.trim() || "";
  if (!details) {
    errors.projectDetails = "System infrastructure details are required.";
  } else if (details.length < 10) {
    errors.projectDetails = "Please provide a bit more detail (at least 10 characters).";
  } else if (details.length > 2000) {
    errors.projectDetails = "Project details cannot exceed 2000 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
