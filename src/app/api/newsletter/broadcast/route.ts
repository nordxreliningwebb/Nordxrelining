import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { title, excerpt, slug } = data;

    if (!title || !slug) {
      return NextResponse.json({ error: 'Missing title or slug' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.RESEND_AUDIENCE_ID) {
      return NextResponse.json({ error: 'Resend not configured' }, { status: 500 });
    }

    const subscribers = await prisma.subscriber.findMany({ where: { active: true } });
    
    if (subscribers.length === 0) {
      return NextResponse.json({ success: true, sent: 0 });
    }

    const emailsToSend = subscribers.map((sub: any) => {
      const unsubscribeUrl = `https://globalconstruction.se/api/newsletter/unsubscribe?id=${sub.id}`;
      const articleUrl = `https://globalconstruction.se/artikel.html?slug=${slug}`;
      
      return {
        from: 'Global Construction <info@globalconstruction.se>',
        to: sub.email,
        subject: `Nytt i kunskapsbanken: ${title}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333;">${title}</h2>
            <p style="color: #555; line-height: 1.6;">
              Vi har precis publicerat en ny artikel i vår kunskapsbank som vi tror kan vara intressant för dig.
            </p>
            ${excerpt ? `<p style="color: #666; font-style: italic; margin-bottom: 20px;">"${excerpt}"</p>` : ''}
            <div style="margin: 30px 0;">
              <a href="${articleUrl}" style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Läs hela artikeln
              </a>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin-top: 40px; margin-bottom: 20px;" />
            <p style="font-size: 12px; color: #999; text-align: center;">
              Du får detta mejl för att du prenumererar på vårt nyhetsbrev.<br>
              <a href="${unsubscribeUrl}" style="color: #666; text-decoration: underline;">Klicka här för att avregistrera dig</a>.
            </p>
          </div>
        `
      };
    });

    const response = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailsToSend)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Resend API Error:", errText);
      return NextResponse.json({ error: 'Failed to send batch' }, { status: 500 });
    }
    
    console.log(`Skickade nyhetsbrev till ${emailsToSend.length} prenumeranter.`);
    return NextResponse.json({ success: true, sent: emailsToSend.length });
  } catch (error) {
    console.error('Error triggering broadcast:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
