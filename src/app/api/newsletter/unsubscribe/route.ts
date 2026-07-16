import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.redirect(new URL('/nyhetsbrev/avsluta?error=missing_id', req.url));
  }

  try {
    const subscriber = await prisma.subscriber.update({
      where: { id },
      data: { active: false },
    });

    // Update Resend Audience to unsubscribe them
    if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
      await fetch(`https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts/${subscriber.email}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({ unsubscribed: true })
      }).catch(err => console.error("Could not update Resend contact", err));
    }

    // Redirect to success page
    return NextResponse.redirect(new URL('/nyhetsbrev/avsluta', req.url));
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return NextResponse.redirect(new URL('/nyhetsbrev/avsluta?error=true', req.url));
  }
}
