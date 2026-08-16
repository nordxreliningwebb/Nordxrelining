export default function PricePlanLivePreview({ 
  name, 
  price, 
  description, 
  features, 
  isPopular,
  category,
  campaignText,
  ctaText,
  ctaLink
}: { 
  name: string, 
  price: string, 
  description: string, 
  features: string[], 
  isPopular: boolean,
  category?: string,
  campaignText?: string | null,
  ctaText?: string,
  ctaLink?: string
}) {
  const buttonText = ctaText ? ctaText : (category === 'Företag' ? 'KONTAKTA OSS' : 'Ring nu');

  return (
    <div className="w-full max-w-sm w-[350px]">
      <style dangerouslySetInnerHTML={{__html: `
        .pricing-card {
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
            position: relative;
            display: flex;
            flex-direction: column;
            border: 1px solid rgba(0, 0, 0, 0.05);
            min-height: 580px;
        }
        
        .pricing-card.is-popular {
            border: 4px solid #48bb78;
            transform: scale(1.02);
            box-shadow: 0 20px 40px rgba(72, 187, 120, 0.15);
        }

        .pricing-blue-bg {
            background: #0284c7;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            color: #ffffff;
            position: relative;
            margin-top: -1px; /* Negative margin to overlap the wave and prevent subpixel gap */
        }

        .pricing-wave {
            width: 100%;
            height: 25px;
            background-size: 100% 100%;
            background-position: bottom;
            background-repeat: no-repeat;
            pointer-events: none;
            z-index: 1;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,60 C150,10 350,110 600,60 C850,10 1050,110 1200,60 L1200,120 L0,120 Z' fill='%23bae6fd' opacity='0.3'/%3E%3Cpath d='M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60 L1200,120 L0,120 Z' fill='%237dd3fc' opacity='0.5'/%3E%3Cpath d='M0,80 C250,130 350,10 600,80 C850,130 950,10 1200,80 L1200,120 L0,120 Z' fill='%230284c7'/%3E%3C/svg%3E");
            margin-top: 35px; /* Pushes the wave down from the top */
        }

        .water-fill-content {
            position: relative;
            z-index: 1;
            padding: 1.5rem 2rem 2.5rem 2rem;
            display: flex;
            flex-direction: column;
            height: 100%;
            text-align: center;
        }
        .water-btn {
            display: inline-block;
            background: #ffffff;
            color: #0284c7;
            text-decoration: none;
            padding: 1rem 2rem;
            border-radius: 5px;
            font-weight: 700;
            letter-spacing: 0.5px;
            margin-top: auto;
            width: 100%;
            text-align: center;
            font-size: 0.95rem;
        }
      `}} />

      <article className={`pricing-card ${isPopular ? 'is-popular' : ''}`}>
        {isPopular && (
          <div 
            className="absolute top-0 left-0 w-full bg-[#48bb78] text-white text-center py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] z-10 rounded-t-[8px]"
            style={{ borderBottom: 'none', margin: 0 }}
          >
            {campaignText || 'KAMPANJ 20% RABATT'}
          </div>
        )}
        
        <div className="pricing-wave"></div>
        <div className="pricing-blue-bg">
          <div className="water-fill-content">
              <h3 style={{fontFamily: "'Syne', sans-serif", fontSize: "1.75rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.75rem"}}>
                {name || 'Paketnamn'}
              </h3>
              <p style={{color: "rgba(255,255,255,0.95)", marginBottom: "1.5rem", fontSize: "0.95rem", minHeight: "70px", lineHeight: 1.4}}>
                {description || 'En kort beskrivning av vad som ingår i paketet.'}
              </p>
              
              {/* PRICE */}
              <div style={{fontFamily: "'Outfit', sans-serif", marginBottom: "2.5rem", display: "flex", justifyContent: "center", alignItems: "baseline"}}>
                <span style={{fontSize: "4.5rem", fontWeight: 800, color: "#ffffff", lineHeight: 0.8, letterSpacing: "-1px"}}>
                  {price.replace(/[^\d]/g, '') || '3495'}
                </span>
                <span style={{fontSize: "1.5rem", fontWeight: 700, color: "#ffffff", marginLeft: "2px"}}>
                  {price.replace(/[\d\s]/g, '') || 'kr'}
                </span>
              </div>

              {/* FEATURES */}
              <ul style={{listStyle: "none", padding: 0, margin: "0 0 2.5rem", textAlign: "left", color: "#ffffff", flexGrow: 1}}>
                  {features.length > 0 ? (
                    features.map((feature, idx) => (
                      <li key={idx} style={{marginBottom: "1rem", display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.95rem", lineHeight: 1.4}}>
                        <svg style={{flexShrink: 0, marginTop: "2px"}} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 
                        <span>{feature}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li style={{marginBottom: "1rem", display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.95rem", lineHeight: 1.4}}>
                        <svg style={{flexShrink: 0, marginTop: "2px"}} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 
                        <span>Exempelfunktion 1</span>
                      </li>
                      <li style={{marginBottom: "1rem", display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.95rem", lineHeight: 1.4}}>
                        <svg style={{flexShrink: 0, marginTop: "2px"}} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 
                        <span>Exempelfunktion 2</span>
                      </li>
                    </>
                  )}
              </ul>
              
              <div className="water-btn">{buttonText}</div>
          </div>
        </div>
      </article>
    </div>
  );
}
