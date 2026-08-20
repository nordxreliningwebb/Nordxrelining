import FrontendLayout from "@/components/FrontendLayout";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sidan hittades inte | Nordxrelining',
  description: 'Sidan du söker kunde tyvärr inte hittas.',
};

export default function NotFoundPage() {
    return (
        <FrontendLayout>
            <main id="main-content">
                <section style={{ 
                    paddingTop: "200px", 
                    paddingBottom: "120px", 
                    backgroundColor: "#faf8f5", 
                    minHeight: "70vh", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    textAlign: "center"
                }}>
                    <div className="container" style={{ maxWidth: "600px" }}>
                        <h1 style={{ 
                            fontSize: "6rem", 
                            fontWeight: 900, 
                            color: "#0284c7", 
                            lineHeight: 1, 
                            marginBottom: "1rem" 
                        }} className="anim-fade-up">404</h1>
                        
                        <h2 style={{ 
                            fontSize: "2rem", 
                            fontWeight: 700, 
                            color: "#0f172a", 
                            marginBottom: "1.5rem" 
                        }} className="anim-fade-up" style={{ transitionDelay: "0.1s" }}>
                            Sidan kunde inte hittas
                        </h2>
                        
                        <p style={{ 
                            fontSize: "1.125rem", 
                            color: "#475569", 
                            marginBottom: "3rem" 
                        }} className="anim-fade-up" style={{ transitionDelay: "0.2s" }}>
                            Det verkar som att länken du följde är bruten eller att sidan har flyttats. Oroa dig inte, du kan enkelt hitta tillbaka till vår startsida!
                        </p>
                        
                        <div className="anim-fade-up" style={{ transitionDelay: "0.3s" }}>
                            <Link href="/" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: "1.1rem" }}>
                                Tillbaka till startsidan
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </FrontendLayout>
    );
}
