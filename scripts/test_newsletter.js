const dotenv = require('dotenv');
const pg = require('pg');

// Läs in miljövariabler
dotenv.config();
dotenv.config({ path: '.env.local' });

const pool = new pg.Pool({ connectionString: process.env.DIRECT_URL });

async function main() {
  const email = 'jesper@webix.se';
  const testTitle = 'Test: Nytt inlägg i kunskapsbanken';
  const testSlug = 'test-inlagg-' + Date.now();
  const testExcerpt = 'Detta är ett automatiskt test för att se så att nyhetsbrevsfunktionen och Resend-integrationen fungerar.';

  console.log(`1. Lägger till/uppdaterar prenumerant: ${email}...`);
  
  // Använd ren SQL för att undvika problem med genererad PrismaClient i testscriptet
  await pool.query(`
    INSERT INTO "Subscriber" (id, email, active, "updatedAt")
    VALUES (gen_random_uuid()::text, $1, true, NOW())
    ON CONFLICT (email) DO UPDATE SET active = true, "updatedAt" = NOW()
    RETURNING id
  `, [email]);
  
  const subRes = await pool.query('SELECT * FROM "Subscriber" WHERE email = $1', [email]);
  const subscriber = subRes.rows[0];
  console.log(`Prenumerant inlagd med ID: ${subscriber.id}`);

  console.log('2. Hämtar aktiva prenumeranter från databasen...');
  const allSubsRes = await pool.query('SELECT * FROM "Subscriber" WHERE active = true');
  const subscribers = allSubsRes.rows;
  console.log(`Hittade ${subscribers.length} aktiva prenumeranter.`);

  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY saknas i .env.local');
  }

  console.log('3. Skapar mejl-batch för utskick via Resend...');
  const emailsToSend = subscribers.map(sub => {
    const unsubscribeUrl = `https://globalconstruction.se/api/newsletter/unsubscribe?id=${sub.id}`;
    const articleUrl = `https://globalconstruction.se/artikel.html?slug=${testSlug}`;
    
    return {
      from: 'Global Construction <info@globalconstruction.se>',
      to: sub.email,
      subject: testTitle,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">${testTitle}</h2>
          <p style="color: #555; line-height: 1.6;">
            Detta är ett testmeddelande för att verifiera att utskicken fungerar som de ska när ett nytt inlägg skapas i kunskapsbanken.
          </p>
          <p style="color: #666; font-style: italic; margin-bottom: 20px;">"${testExcerpt}"</p>
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

  console.log(`4. Skickar ${emailsToSend.length} mejl via Resend API...`);
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
    throw new Error(`Resend API Error: ${errText}`);
  }

  const result = await response.json();
  console.log('5. Klar! Svar från Resend:', result);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
