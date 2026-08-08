import { NextResponse } from "next/server";
import { validateContactSubmission } from "@/lib/contactValidation";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
    // 1. Rate limiting check
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const { allowed } = checkRateLimit(clientIp);

    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Rate limit exceeded. Please wait a minute before submitting again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse request body
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    // 3. Honeypot & Validation
    const validation = validateContactSubmission(body);

    if (body.honeypot && body.honeypot.trim() !== "") {
      // Return success to spammers without processing
      return NextResponse.json({
        success: true,
        message: "Transmission received.",
      });
    }

    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please check input fields.",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // 4. Lead delivery (support Webhook via ENV or log destination)
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    const payload = {
      name: body.name.trim(),
      email: body.email.trim(),
      projectDetails: body.projectDetails.trim(),
      timestamp: new Date().toISOString(),
      source: "SRE Website Contact Node",
    };

    if (webhookUrl) {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!webhookRes.ok) {
        console.error("Lead webhook delivery failed:", await webhookRes.text());
        return NextResponse.json(
          {
            success: false,
            message: "Lead dispatch service unavailable. Please try again or email directly.",
          },
          { status: 502 }
        );
      }
    } else {
      // Server log delivery confirmation for production auditing
      console.log("[SRE LEAD RECEIVED]", JSON.stringify(payload));
    }

    return NextResponse.json({
      success: true,
      message: "Transmission received. Your request has been dispatched to the SRE architecture team.",
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
