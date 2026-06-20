import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const formId = formData.get("wpforms[id]") as string;
    
    // Parse Name (handles single name field or first/last field setup)
    let name = (formData.get("wpforms[fields][2]") || "") as string;
    if (!name) {
      const first = (formData.get("wpforms[fields][2][first]") || "") as string;
      const last = (formData.get("wpforms[fields][2][last]") || "") as string;
      name = `${first} ${last}`.trim();
    }
    
    const email = formData.get("wpforms[fields][3]") as string;
    const phone = formData.get("wpforms[fields][8]") as string;
    const subjectChoice = formData.get("wpforms[fields][11]") as string;
    const message = formData.get("wpforms[fields][6]") as string;

    const apiKey = process.env.SMTP2GO_API_KEY;
    const recipient = process.env.CONTACT_FORM_RECIPIENT || "kontakt@fido.sk";
    const sender = process.env.SMTP2GO_SENDER || "no-reply@fido.sk";

    // If SMTP2GO credentials are configured, send the email directly via SMTP2GO API
    if (apiKey) {
      const subject = formId === "713"
        ? `Rezidencia Ľubovec - Nový dopyt: ${name}`
        : `FIDO.sk Kontakt - ${subjectChoice || "Všeobecná otázka"}: ${name}`;

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #fcfcfc;">
          <div style="background-color: #111111; padding: 15px; border-radius: 6px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">Nová správa z FIDO.sk</h2>
          </div>
          <div style="padding: 20px 10px;">
            <p style="margin: 8px 0;"><strong>Meno a priezvisko:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>E-mailová adresa:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 8px 0;"><strong>Telefónne číslo:</strong> ${phone || 'Neuvedené'}</p>
            ${subjectChoice ? `<p style="margin: 8px 0;"><strong>Predmet záujmu:</strong> ${subjectChoice}</p>` : ''}
            <p style="margin: 8px 0;"><strong>Typ formulára:</strong> ${formId === '713' ? 'Rezidencia Ľubovec - Byt' : 'Kontaktný formulár'}</p>
            <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
            <p style="margin: 8px 0;"><strong>Text správy:</strong></p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 6px; border-left: 4px solid #e0945d; white-space: pre-wrap; line-height: 1.6; margin-top: 8px;">${message || 'Bez textu správy.'}</div>
          </div>
          <div style="font-size: 11px; color: #888888; text-align: center; margin-top: 20px; border-top: 1px solid #eeeeee; padding-top: 10px;">
            Tento e-mail bol vygenerovaný automaticky po vyplnení formulára na webe FIDO.sk.
          </div>
        </div>
      `;

      const response = await fetch("https://api.smtp2go.com/v3/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          to: [recipient],
          sender: sender,
          subject: subject,
          html_body: htmlBody,
          custom_headers: email ? [
            {
              header: "Reply-To",
              value: email,
            }
          ] : [],
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`SMTP2GO API responded with status ${response.status}: ${errorData}`);
      }

      return NextResponse.json({ success: true });
    }

    // Fallback: If no API Key configured, proxy to live WordPress backends
    const targetUrl = formId === "713"
      ? "https://www.fido.sk/rezidencia-lubovec/"
      : "https://www.fido.sk/kontakt/";

    const proxyResponse = await fetch(targetUrl, {
      method: "POST",
      body: formData,
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!proxyResponse.ok) {
      throw new Error(`Fallback WordPress responded with status ${proxyResponse.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact Form error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
