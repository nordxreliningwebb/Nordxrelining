import FrontendLayout from "@/components/FrontendLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Köpvillkor | NordX Relining',
  description: 'Allmänna villkor för tjänster och uppdrag utförda av NordX Relining.',
};

export default function KopvillkorPage() {
  return (
    <FrontendLayout>
      <main id="main-content">
        <section className="legal-hero" style={{ backgroundColor: "#0284c7", padding: "120px 20px 80px 20px", color: "white", textAlign: "center" }}>
            <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
                <h1 className="anim-mask-text" style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "1rem" }}><span className="anim-mask-inner">Köpvillkor</span></h1>
                <p className="legal-date anim-fade-up" style={{ opacity: 0.8, fontSize: "1.1rem" }}>Senast uppdaterad: 17 augusti 2026</p>
            </div>
        </section>

        <section className="legal-page-wrapper" style={{ padding: "80px 20px", backgroundColor: "#ffffff" }}>
            <div className="legal-container" style={{ maxWidth: "800px", margin: "0 auto", color: "#334155", fontSize: "1.125rem", lineHeight: "1.8" }}>
                <p className="anim-fade-up" style={{ marginBottom: "2rem" }}>
                    Dessa allmänna villkor gäller för alla tjänster och uppdrag som utförs av NordX Relining (hädanefter "NordX Relining", "vi" eller "oss") gentemot dig som kund ("Kunden"), såvida inget annat skriftligen avtalats.
                </p>
                
                <h2 className="anim-mask-text" style={{ fontSize: "2rem", color: "#0f172a", marginTop: "3rem", marginBottom: "1rem", fontWeight: 700 }}><span className="anim-mask-inner">1. Omfattning och tjänster</span></h2>
                <p className="anim-fade-up" style={{ marginBottom: "1.5rem" }}>
                    NordX Relining erbjuder tjänster inom stamspolning, relining och rörinspektion för fastigheter, bostadsrättsföreningar och privatpersoner, enligt specifikation i offert eller avtal mellan båda parter.
                </p>

                <h2 className="anim-mask-text" style={{ fontSize: "2rem", color: "#0f172a", marginTop: "3rem", marginBottom: "1rem", fontWeight: 700 }}><span className="anim-mask-inner">2. Beställning och avtal</span></h2>
                <p className="anim-fade-up" style={{ marginBottom: "1.5rem" }}>
                    Avtal anses bindande när Kunden accepterar en offert från oss (digitalt eller skriftligen) eller när ett formellt entreprenadkontrakt undertecknats. Denna process sker i enlighet med gällande branschstandard (exempelvis ABT 06, AB 04 eller konsumenttjänstlagen beroende på avtalsform och kundtyp).
                </p>

                <h2 className="anim-mask-text" style={{ fontSize: "2rem", color: "#0f172a", marginTop: "3rem", marginBottom: "1rem", fontWeight: 700 }}><span className="anim-mask-inner">3. Priser och betalning</span></h2>
                <p className="anim-fade-up" style={{ marginBottom: "1.5rem" }}>
                    För företagskunder och BRF anges alla priser exklusive mervärdesskatt (moms) om inte annat uttryckligen anges. För privatkonsumenter anges priser inklusive moms. Betalning sker normalt mot faktura med 30 dagars förfallotid. Vid dröjsmål med betalning utgår dröjsmålsränta enligt räntelagen samt lagstadgad påminnelseavgift.
                </p>

                <h2 className="anim-mask-text" style={{ fontSize: "2rem", color: "#0f172a", marginTop: "3rem", marginBottom: "1rem", fontWeight: 700 }}><span className="anim-mask-inner">4. Utförande och ändringar (ÄTA)</span></h2>
                <p className="anim-fade-up" style={{ marginBottom: "1.5rem" }}>
                    Vi arbetar med stor noggrannhet och följer gällande branschregler och byggnormer för rörsystem och våtutrymmen. Eventuella ändringar (Ändrings-, Tilläggs-, och Avgående arbeten) ska överenskommas skriftligen mellan parterna och kan komma att påverka både kostnad och tidsplanering.
                </p>

                <h2 className="anim-mask-text" style={{ fontSize: "2rem", color: "#0f172a", marginTop: "3rem", marginBottom: "1rem", fontWeight: 700 }}><span className="anim-mask-inner">5. Ansvar och försäkring</span></h2>
                <p className="anim-fade-up" style={{ marginBottom: "1.5rem" }}>
                    NordX Relining innehar tillbörlig entreprenad- och ansvarsförsäkring. Vårt skadeståndsansvar är begränsat till direkt skada med ett maximalt belopp enligt gällande standardavtal, såvida olyckan inte orsakats av grov vårdslöshet. Vi ansvarar ej för indirekta skador såsom inkomstbortfall eller produktionsbortfall.
                </p>

                <h2 className="anim-mask-text" style={{ fontSize: "2rem", color: "#0f172a", marginTop: "3rem", marginBottom: "1rem", fontWeight: 700 }}><span className="anim-mask-inner">6. Upphovsrätt och dokumentation</span></h2>
                <p className="anim-fade-up" style={{ marginBottom: "1.5rem" }}>
                    Alla rättigheter till framtagen dokumentation, rörinspektionsfilmer, protokoll och garantibevis tillhör NordX Relining till dess att full betalning har erlagts. Därefter erhåller Kunden full äganderätt och rätt att nyttja handlingarna för den specifika fastigheten.
                </p>
                
                <h2 className="anim-mask-text" style={{ fontSize: "2rem", color: "#0f172a", marginTop: "3rem", marginBottom: "1rem", fontWeight: 700 }}><span className="anim-mask-inner">7. Tvist och tillämplig lag</span></h2>
                <p className="anim-fade-up" style={{ marginBottom: "1.5rem" }}>
                    Tvist i anledning av avtal och dessa villkor ska i första hand lösas mellan parterna genom förhandling. För konsumenter gäller att tvist även kan prövas av Allmänna reklamationsnämnden (ARN). Kan enighet ej uppnås ska tvisten slutligt avgöras enligt svensk lag, i behörig domstol.
                </p>
            </div>
        </section>
      </main>
    </FrontendLayout>
  );
}
