// app/api/contact/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.json();
    console.log("Form received:", formData);

    if (!formData.fullName || !formData.email || !formData.phone || !formData.city) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Form submitted", data: formData }, { status: 200 });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json({ success: false, message: "Internal error" }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
