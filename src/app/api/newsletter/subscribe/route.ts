import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Stark input-validering med Zod
const subscribeSchema = z.object({
  email: z.string().email("Ogiltig e-postadress"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validera input säkert
    const parsed = subscribeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    // Save to database using Prisma
    await prisma.subscriber.upsert({
      where: { email },
      update: { active: true },
      create: { email, active: true },
    });

    // Skicka välkomstmejl via Resend
    if (process.env.RESEND_API_KEY) {
      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Välkommen till Global Constructions kunskapsbank!</h2>
          <p>Tack för att du prenumererar på vårt nyhetsbrev.</p>
          <p>Vi kommer att hålla dig uppdaterad med de senaste insikterna inom byggkonstruktion och skyddsrum.</p>
          <br>
          <p>Med vänliga hälsningar,<br>Teamet på Global Construction</p>
        </div>
      `;

      // Skicka välkomstmejlet (fire and forget)
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'Global Construction <info@globalconstruction.se>', 
          to: [email],
          subject: 'Välkommen till vårt nyhetsbrev!',
          html: emailHtml,
        })
      }).catch(err => console.error("Kunde inte skicka välkomstmejl", err));

      // Lägg till i Resend Audience (Mailing list) om Audience ID finns
      if (process.env.RESEND_AUDIENCE_ID) {
        fetch(`https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            email: email,
            unsubscribed: false
          })
        }).catch(err => console.error("Kunde inte lägga till kontakt i Resend Audience", err));
      }
    }

    return NextResponse.json({
      success: true,
      message: "Tack för din prenumeration!",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Kunde inte registrera prenumerationen. Försök igen senare." },
      { status: 500 }
    );
  }
}
