import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Determine the target URL based on the form ID
    const formId = formData.get("wpforms[id]");
    const targetUrl = formId === "713"
      ? "https://www.fido.sk/rezidencia-lubovec/"
      : "https://www.fido.sk/kontakt/";

    // Forward the POST request to the original WordPress site
    const response = await fetch(targetUrl, {
      method: "POST",
      body: formData,
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`WordPress server responded with status ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact Form proxy error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
