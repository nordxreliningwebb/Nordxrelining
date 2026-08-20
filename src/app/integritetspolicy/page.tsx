import FrontendLayout from "@/components/FrontendLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Integritetspolicy (GDPR) | Nordxrelining',
  description: 'Information om hur Nordxrelining hanterar dina personuppgifter i enlighet med GDPR.',
};

export default function IntegritetspolicyPage() {
  return (
    <FrontendLayout>
      <main id="main-content">
        <section className="legal-hero" style={{ backgroundColor: "#0284c7", padding: "120px 20px 80px 20px", color: "white", textAlign: "center" }}>
            <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
                <h1 className="anim-mask-text" style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "1rem" }}><span className="anim-mask-inner">Integritetspolicy (GDPR)</span></h1>
                <p className="legal-date anim-fade-up" style={{ opacity: 0.9, fontSize: "1.1rem" }}>Senast uppdaterad: 17 augusti 2026</p>
            </div>
        </section>

        <section className="legal-page-wrapper" style={{ padding: "80px 20px", backgroundColor: "#ffffff" }}>
            <div className="legal-container" style={{ maxWidth: "800px", margin: "0 auto", color: "#334155", fontSize: "1.125rem", lineHeight: "1.8" }}>
                <p className="anim-fade-up" style={{ marginBottom: "2rem" }}>
                    Din integritet är viktig för oss på Nordxrelining. I denna integritetspolicy förklarar vi i detalj hur vi samlar in, använder och skyddar dina personuppgifter när du använder våra tjänster eller besöker vår hemsida, i enlighet med Dataskyddsförordningen (GDPR).
                </p>

                <h2 className="anim-mask-text" style={{ fontSize: "2rem", color: "#0f172a", marginTop: "3rem", marginBottom: "1rem", fontWeight: 700 }}><span className="anim-mask-inner">1. Personuppgiftsansvarig</span></h2>
                <p className="anim-fade-up" style={{ marginBottom: "1.5rem" }}>
                    Nordxrelining AB, med adress Skogsgatan 3b, 152 44 Södertälje, är personuppgiftsansvarig för behandlingen av de personuppgifter du delar med oss. För frågor om vår personuppgiftshantering kan du alltid nå oss på <strong>info@nordxrelining.se</strong>.
                </p>

                <h2 className="anim-mask-text" style={{ fontSize: "2rem", color: "#0f172a", marginTop: "3rem", marginBottom: "1rem", fontWeight: 700 }}><span className="anim-mask-inner">2. Uppgifter vi samlar in</span></h2>
                <p className="anim-fade-up" style={{ marginBottom: "1rem" }}>Vi samlar in information som du aktivt förser oss med när du begär offert, fyller i kontaktformulär, eller tecknar avtal. Detta kan inkludera:</p>
                <ul style={{ marginBottom: "2rem", paddingLeft: "1.5rem" }}>
                    <li style={{ marginBottom: "0.5rem" }}><strong>Identitetsuppgifter:</strong> Namn och befattning.</li>
                    <li style={{ marginBottom: "0.5rem" }}><strong>Kontaktuppgifter:</strong> E-postadress, telefonnummer, faktura- och fastighetsadress.</li>
                    <li style={{ marginBottom: "0.5rem" }}><strong>Företagsuppgifter:</strong> Organisationsnummer (för företagskunder och Bostadsrättsföreningar).</li>
                    <li style={{ marginBottom: "0.5rem" }}><strong>Teknisk data:</strong> IP-adress och webbläsarbeteende via cookies (läs mer i vår <a href="/cookies" style={{ color: "#0284c7", textDecoration: "underline" }}>Cookie-policy</a>).</li>
                </ul>

                <h2 className="anim-mask-text" style={{ fontSize: "2rem", color: "#0f172a", marginTop: "3rem", marginBottom: "1rem", fontWeight: 700 }}><span className="anim-mask-inner">3. Ändamål och laglig grund</span></h2>
                <p className="anim-fade-up" style={{ marginBottom: "1rem" }}>Enligt GDPR måste all behandling ha en rättslig grund. Vi behandlar dina uppgifter för följande ändamål:</p>
                <ul style={{ marginBottom: "2rem", paddingLeft: "1.5rem" }}>
                    <li style={{ marginBottom: "0.5rem" }}><strong>Fullgörande av avtal:</strong> För att kunna projektera, utföra stamspolning/relining, fakturera och leverera garanti- och slutdokumentation till dig.</li>
                    <li style={{ marginBottom: "0.5rem" }}><strong>Rättslig förpliktelse:</strong> För att följa kraven i bland annat Bokföringslagen och skattelagstiftning.</li>
                    <li style={{ marginBottom: "0.5rem" }}><strong>Berättigat intresse:</strong> För att kunna svara på dina offertförfrågningar, kommunicera med dig under kundrelationen samt för att underhålla och förbättra vår webbplats funktionalitet.</li>
                </ul>

                <h2 className="anim-mask-text" style={{ fontSize: "2rem", color: "#0f172a", marginTop: "3rem", marginBottom: "1rem", fontWeight: 700 }}><span className="anim-mask-inner">4. Hur länge vi sparar uppgifterna</span></h2>
                <p className="anim-fade-up" style={{ marginBottom: "1.5rem" }}>
                    Vi sparar aldrig dina personuppgifter under en längre tid än vad som är nödvändigt. Bokföringsunderlag (fakturor och dylikt) sparas i 7 år enligt Bokföringslagen. Dokumentation rörande fastigheten (såsom rörinspektionsfilmer, protokoll och garantibevis) arkiveras så länge garantiansvaret gäller. Offertförfrågningar som inte leder till avtal gallras rutinmässigt när de inte längre är aktuella.
                </p>

                <h2 className="anim-mask-text" style={{ fontSize: "2rem", color: "#0f172a", marginTop: "3rem", marginBottom: "1rem", fontWeight: 700 }}><span className="anim-mask-inner">5. Delning av data och tredjeland</span></h2>
                <p className="anim-fade-up" style={{ marginBottom: "1.5rem" }}>
                    Dina uppgifter är säkra hos oss och vi säljer dem aldrig vidare. För att kunna leverera våra tjänster kan vi dock behöva dela uppgifter med utvalda underleverantörer, fraktbolag samt systemleverantörer (t.ex. affärssystem och CRM). Vi tecknar alltid Personuppgiftsbiträdesavtal med dessa partners för att säkerställa att din data hanteras säkert och i enlighet med GDPR. Vi strävar efter att all data ska behandlas inom EU/EES.
                </p>

                <h2 className="anim-mask-text" style={{ fontSize: "2rem", color: "#0f172a", marginTop: "3rem", marginBottom: "1rem", fontWeight: 700 }}><span className="anim-mask-inner">6. Dina rättigheter</span></h2>
                <p className="anim-fade-up" style={{ marginBottom: "1rem" }}>Eftersom vi hanterar din data har du en rad rättigheter enligt GDPR:</p>
                <ul style={{ marginBottom: "2rem", paddingLeft: "1.5rem" }}>
                    <li style={{ marginBottom: "0.5rem" }}><strong>Rätt till tillgång (Registerutdrag):</strong> Du kan begära ut en kopia på vilka personuppgifter vi har om dig.</li>
                    <li style={{ marginBottom: "0.5rem" }}><strong>Rätt till rättelse:</strong> Om vi har felaktiga eller ofullständiga uppgifter har du rätt att få dessa korrigerade.</li>
                    <li style={{ marginBottom: "0.5rem" }}><strong>Rätt till radering ("Rätten att bli glömd"):</strong> Under vissa förutsättningar kan du be oss radera din data, förutsatt att ingen laglig grund (t.ex. bokföringskrav) hindrar det.</li>
                    <li style={{ marginBottom: "0.5rem" }}><strong>Rätt till begränsning och invändning:</strong> Du kan invända mot hur vi behandlar din data, inklusive behandling som baseras på berättigat intresse.</li>
                </ul>

                <h2 className="anim-mask-text" style={{ fontSize: "2rem", color: "#0f172a", marginTop: "3rem", marginBottom: "1rem", fontWeight: 700 }}><span className="anim-mask-inner">7. Klagomål till tillsynsmyndighet</span></h2>
                <p className="anim-fade-up" style={{ marginBottom: "1.5rem" }}>
                    Om du anser att vår hantering av dina personuppgifter strider mot GDPR eller annan gällande lagstiftning, har du rätt att lämna in ett klagomål till Integritetsskyddsmyndigheten (IMY), som är den ansvariga tillsynsmyndigheten i Sverige.
                </p>
            </div>
        </section>
      </main>
    </FrontendLayout>
  );
}
