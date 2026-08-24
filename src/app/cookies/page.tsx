import FrontendLayout from "@/components/FrontendLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Cookies & ePrivacy | NordX Relining',
  description: 'Information om hur NordX Relining använder cookies för att förbättra din webbupplevelse.',
};

export default function CookiesPage() {
  return (
    <FrontendLayout>
      <main id="main-content">
        <section className="legal-hero" style={{ backgroundColor: "#0284c7", padding: "120px 20px 80px 20px", color: "white", textAlign: "center" }}>
            <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
                <h1 className="anim-mask-text" style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "1rem" }}><span className="anim-mask-inner">Cookies & ePrivacy</span></h1>
                <p className="legal-date anim-fade-up" style={{ opacity: 0.9, fontSize: "1.1rem" }}>Senast uppdaterad: 17 augusti 2026</p>
            </div>
        </section>

        <section className="legal-page-wrapper" style={{ padding: "80px 20px", backgroundColor: "#ffffff" }}>
            <div className="legal-container" style={{ maxWidth: "800px", margin: "0 auto", color: "#334155", fontSize: "1.125rem", lineHeight: "1.8" }}>
                <p className="anim-fade-up" style={{ marginBottom: "2rem" }}>
                    Vi på NordX Relining använder cookies (kakor) och liknande tekniker för att ge dig den bästa möjliga upplevelsen på vår webbplats. Denna policy förklarar vad cookies är, hur vi använder dem och hur du kan hantera dina inställningar i enlighet med Lagen om elektronisk kommunikation (LEK) och Dataskyddsförordningen (GDPR).
                </p>

                <h2 className="anim-mask-text" style={{ fontSize: "2rem", color: "#0f172a", marginTop: "3rem", marginBottom: "1rem", fontWeight: 700 }}><span className="anim-mask-inner">1. Vad är en cookie?</span></h2>
                <p className="anim-fade-up" style={{ marginBottom: "1.5rem" }}>
                    En cookie är en liten textfil som sparas på din dator, surfplatta eller mobiltelefon när du besöker en webbplats. Filen gör det möjligt för webbplatsen att "minnas" dina handlingar eller preferenser över tid, så att du slipper ställa in dem på nytt varje gång du besöker sidan.
                </p>

                <h2 className="anim-mask-text" style={{ fontSize: "2rem", color: "#0f172a", marginTop: "3rem", marginBottom: "1rem", fontWeight: 700 }}><span className="anim-mask-inner">2. Samtycke till cookies</span></h2>
                <p className="anim-fade-up" style={{ marginBottom: "1.5rem" }}>
                    Nödvändiga cookies placeras automatiskt när du besöker webbplatsen eftersom de krävs för att den ska fungera säkert och korrekt. För alla andra typer av cookies (som analys och marknadsföring) ber vi om ditt uttryckliga samtycke via den cookie-banner som visas när du först besöker vår hemsida.
                </p>

                <h2 className="anim-mask-text" style={{ fontSize: "2rem", color: "#0f172a", marginTop: "3rem", marginBottom: "1rem", fontWeight: 700 }}><span className="anim-mask-inner">3. Vilka typer av cookies vi använder</span></h2>
                
                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.5rem" }}>Nödvändiga (Strikt nödvändiga)</h3>
                <p className="anim-fade-up" style={{ marginBottom: "1rem" }}>
                    Dessa är avgörande för webbplatsens tekniska funktion och säkerhet. De sparar t.ex. dina val kring cookie-samtycke.
                </p>
                <ul style={{ marginBottom: "2rem", paddingLeft: "1.5rem", fontSize: "1rem" }}>
                    <li><strong>Namn:</strong> <code>nordx_consent</code><br/><strong>Ändamål:</strong> Kommer ihåg dina val för cookie-samtycke.<br/><strong>Lagringstid:</strong> 1 år.</li>
                </ul>

                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.5rem" }}>Analys och Prestanda</h3>
                <p className="anim-fade-up" style={{ marginBottom: "1rem" }}>
                    Vi använder Google Analytics för att förstå hur våra besökare hittar och använder webbsidan. Informationen är anonymiserad (IP-maskering) och samlas in aggregerat för att vi ska kunna optimera vår hemsida och våra tjänster.
                </p>
                <ul style={{ marginBottom: "2rem", paddingLeft: "1.5rem", fontSize: "1rem" }}>
                    <li><strong>Namn:</strong> <code>_ga</code>, <code>_gid</code><br/><strong>Ändamål:</strong> Insamling av statistik om besöksbeteende via Google Analytics.<br/><strong>Lagringstid:</strong> Upp till 2 år.</li>
                </ul>

                <h2 className="anim-mask-text" style={{ fontSize: "2rem", color: "#0f172a", marginTop: "3rem", marginBottom: "1rem", fontWeight: 700 }}><span className="anim-mask-inner">4. Hantera eller ta bort cookies</span></h2>
                <p className="anim-fade-up" style={{ marginBottom: "1rem" }}>
                    Du kan när som helst ändra eller dra tillbaka ditt samtycke genom att klicka på knappen "Cookie-inställningar" i sidfoten på vår hemsida. Där får du upp rutan för att justera dina val.
                </p>
                <p className="anim-fade-up" style={{ marginBottom: "1.5rem" }}>
                    Du kan även ställa in din webbläsare så att den automatiskt nekar all lagring av cookies eller informerar dig varje gång en webbplats begär att få lagra en cookie. Genom webbläsaren kan också tidigare lagrade cookies raderas. Mer information hittar du på Post- och telestyrelsens (PTS) hemsida eller i din webbläsares hjälpsidor.
                </p>

                <h2 className="anim-mask-text" style={{ fontSize: "2rem", color: "#0f172a", marginTop: "3rem", marginBottom: "1rem", fontWeight: 700 }}><span className="anim-mask-inner">5. Kontakt</span></h2>
                <p className="anim-fade-up" style={{ marginBottom: "1.5rem" }}>
                    Vid frågor om vår cookie-policy eller hur vi hanterar dina personuppgifter (läs mer i vår Integritetspolicy), vänligen kontakta oss på <strong>info@nordxrelining.se</strong>.
                </p>
            </div>
        </section>
      </main>
    </FrontendLayout>
  );
}
