import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const slug = data.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    const post = await prisma.blogPost.create({
      data: {
        ...data,
        slug,
      },
    });

    // Skicka automatiskt nyhetsbrev till aktiva prenumeranter
    if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
      try {
        const subscribers = await prisma.subscriber.findMany({ where: { active: true } });
        
        if (subscribers.length > 0) {
          const emailsToSend = subscribers.map(sub => {
            const unsubscribeUrl = `https://globalconstruction.se/api/newsletter/unsubscribe?id=${sub.id}`;
            const articleUrl = `https://globalconstruction.se/artikel.html?slug=${slug}`;
            
            return {
              from: 'Global Construction <info@globalconstruction.se>',
              to: sub.email,
              subject: `Nytt i kunskapsbanken: ${post.title}`,
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h2 style="color: #333;">${post.title}</h2>
                  <p style="color: #555; line-height: 1.6;">
                    Vi har precis publicerat en ny artikel i vår kunskapsbank som vi tror kan vara intressant för dig.
                  </p>
                  ${post.excerpt ? `<p style="color: #666; font-style: italic; margin-bottom: 20px;">"${post.excerpt}"</p>` : ''}
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

          await fetch('https://api.resend.com/emails/batch', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailsToSend)
          });
          
          console.log(`Skickade nyhetsbrev till ${emailsToSend.length} prenumeranter.`);
        }
      } catch (newsletterError) {
        console.error("Kunde inte skicka automatiskt nyhetsbrev:", newsletterError);
      }
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
