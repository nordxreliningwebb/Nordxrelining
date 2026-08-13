import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Förhindra att Next.js cachar denna route, vi vill att pingen ska köras på riktigt varje gång
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Säkerhetskontroll: Verifiera att anropet kommer från Vercel Cron
  // Du kan konfigurera CRON_SECRET som en miljövariabel i Vercel
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // Gör ett superlätt anrop till databasen för att förhindra att den pausas
    // Vi hämtar bara ID från 1 rad i BlogPost-tabellen
    const { data, error } = await supabase
      .from('BlogPost')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Supabase keep-alive error:', error);
      throw error;
    }

    return NextResponse.json({
      status: 'success',
      message: 'Supabase keep-alive ping successful',
      timestamp: new Date().toISOString(),
      rowsFetched: data?.length || 0
    });
  } catch (error: any) {
    console.error('Keep-alive ping failed:', error.message);
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  }
}
