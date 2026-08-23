"use client";

import FrontendLayout from "@/components/FrontendLayout";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const iconsHouse: Record<string, React.ReactNode> = {
    "Villa": <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
    "Radhus / Kedjehus": <svg width="80" height="32" viewBox="0 0 60 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        <g transform="translate(0, 0)"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></g>
        <g transform="translate(18, 0)"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></g>
        <g transform="translate(36, 0)"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></g>
    </svg>,
    "Fritidshus": <svg className="fritidshus-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
    "Bostadsrättsförening / Företag": <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
};

const iconsFloor: Record<string, React.ReactNode> = {
    "1-planshus": (
        <svg width="32" height="42" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 17l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 30 9 20 15 20 15 30"></polyline>
        </svg>
    ),
    "1,5-planshus": (
        <svg width="32" height="42" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 17l9-11 9 11v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <rect x="10" y="12" width="4" height="4"></rect>
            <polyline points="9 30 9 20 15 20 15 30"></polyline>
        </svg>
    ),
    "2-planshus": (
        <svg width="32" height="42" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10l9-7 9 7v18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <rect x="6" y="13" width="4" height="4"></rect>
            <rect x="14" y="13" width="4" height="4"></rect>
            <polyline points="9 30 9 20 15 20 15 30"></polyline>
        </svg>
    )
};

export default function KalkylatorPage() {
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState(1);
    const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
    
    // State
    const [houseType, setHouseType] = useState<string>("");
    const [floorType, setFloorType] = useState<string>("");
    const [distance, setDistance] = useState<string>("");
    const [foundation, setFoundation] = useState<string>("");
    const [problems, setProblems] = useState<string[]>([]);
    
    // Qtys
    const [qtys, setQtys] = useState({
        badrum: 1,
        gasttoalett: 0,
        kok: 1,
        tvattstuga: 0,
        extra: 0,
        gjutjarn: 0
    });

    // Form
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
        if (currentStep === 5) {
            const timer = setTimeout(() => setIsFilled(true), 100);
            return () => clearTimeout(timer);
        } else {
            setIsFilled(false);
        }
    }, [currentStep]);

    const updateQty = (room: keyof typeof qtys, delta: number) => {
        setQtys(prev => {
            let next = prev[room] + delta;
            if (next < 0) next = 0;
            if (room === 'gjutjarn' && next > prev.extra) next = prev.extra;
            
            const newQtys = { ...prev, [room]: next };
            
            if (room === 'extra') {
                if (next === 0) newQtys.gjutjarn = 0;
                else if (newQtys.gjutjarn > next) newQtys.gjutjarn = next;
            }
            return newQtys;
        });
    };

    const toggleProblem = (problem: string) => {
        setProblems(prev => 
            prev.includes(problem) 
                ? prev.filter(p => p !== problem)
                : [...prev, problem]
        );
    };

    const totalPoints = (qtys.badrum * 3) + (qtys.gasttoalett * 2) + (qtys.kok * 1) + (qtys.tvattstuga * 1) + (qtys.extra * 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        
        try {
            let body = `Offertförfrågan från Kalkylatorn\n\n`;
            body += `Namn: ${name}\n`;
            body += `E-post: ${email}\n`;
            body += `Telefon: ${phone}\n\n`;
            body += `--- Fastighetsinfo ---\n`;
            body += `Hustyp: ${houseType}\n`;
            body += `Våningsplan: ${floorType || "Vet ej"}\n`;
            body += `Längd till avlopp: ${distance || "Vet ej"}\n`;
            body += `Grundläggning: ${foundation || "Vet ej"}\n\n`;
            body += `--- Rum att relina ---\n`;
            body += `Badrum: ${qtys.badrum}\n`;
            body += `Gästtoalett: ${qtys.gasttoalett}\n`;
            body += `Kök: ${qtys.kok}\n`;
            body += `Tvättstuga: ${qtys.tvattstuga}\n`;
            body += `Extra golvbrunnar: ${qtys.extra}\n`;
            if(qtys.extra > 0) body += `Varav i gjutjärn: ${qtys.gjutjarn}\n`;
            
            body += `\nTotalt antal anslutningspunkter: ${totalPoints}\n`;
            
            if (problems.length > 0) {
                body += `\n--- Nuvarande problem ---\n`;
                problems.forEach(p => { body += `- ${p}\n`; });
            }

            const formData = new FormData();
            formData.append("type", "offert");
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("message", body);
            
            const response = await fetch("/api/contact", {
                method: "POST",
                body: formData,
            });
            
            if (response.ok) {
                router.push("/tack");
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus("error");
        }
    };

    return (
        <FrontendLayout>
            <link rel="stylesheet" href="/kalkylator.css?v=2" />
            <style dangerouslySetInnerHTML={{__html: `
                body.light-theme { background-color: #faf8f5 !important; }
                
                @media (max-width: 768px) {
                    .calc-card { padding: 40px 42px !important; }
                    .view-title { font-size: 1.1rem !important; margin-bottom: 8px !important; line-height: 1.3 !important; }
                    .view-subtitle { font-size: 0.85rem !important; margin-bottom: 20px !important; padding-bottom: 0 !important; line-height: 1.4 !important; }
                    .option-card { padding: 12px 10px !important; min-height: auto !important; }
                    .option-title { font-size: 0.85rem !important; margin-bottom: 2px !important; white-space: normal !important; }
                    .option-desc { font-size: 0.75rem !important; line-height: 1.2 !important; }
                    .option-icon { margin-bottom: 8px !important; display: flex !important; align-items: center !important; justify-content: center !important; }
                    .option-icon svg { height: 26px !important; width: auto !important; transform: none !important; }
                    .option-icon svg.fritidshus-icon { height: 21px !important; }
                    .distance-card { padding: 8px !important; font-size: 0.85rem !important; }
                    .qty-item { padding: 10px 15px !important; }
                    .qty-item span { font-size: 0.85rem !important; }
                    .qty-btn { width: 28px !important; height: 28px !important; font-size: 1rem !important; }
                    .action-row .btn-back, .action-row .btn-primary, .action-row a.btn-primary { font-size: 0.85rem !important; padding: 12px 10px !important; border-radius: 6px !important; height: auto !important; }
                    .action-row { gap: 12px !important; padding-top: 1rem !important; }
                    .step-label { font-size: 0.55rem !important; letter-spacing: -0.3px !important; }
                    
                    /* Step 6 button stacking */
                    .step6-actions { flex-direction: column !important; gap: 12px !important; }
                    .step6-primary-group { display: flex !important; flex-direction: column !important; width: 100% !important; gap: 12px !important; }
                    .step6-actions .btn-primary, .step6-actions .btn-back { width: 100% !important; text-align: center; }
                }
                
                @media (min-width: 769px) {
                    .step6-actions { display: flex; flex-direction: row-reverse; justify-content: space-between; align-items: center; padding-top: 0; }
                    .step6-primary-group { display: flex; gap: 15px; }
                    .step6-actions .btn-primary { padding: 14px 24px; font-size: 1rem; font-weight: 600; border: 1px solid #0284c7; box-shadow: none; text-align: center; }
                }
            `}} />
            
            <main className="calc-main" style={{ backgroundColor: "#faf8f5", minHeight: "100vh" }}>
                <div className={`calc-card`} style={{ transition: 'background-color 0.5s ease', position: 'relative', borderRadius: '24px' }}>
                    
                    {/* Pipe Frame */}
                    <div className="p-pipe p-top">
                        <div className="p-muff" style={{ left: "20%" }}></div><div className="p-muff" style={{ right: "20%" }}></div>
                    </div>
                    <div className="p-pipe p-bottom">
                        <div className="p-muff" style={{ left: "50%", transform: "translateX(-50%) translateY(-50%)" }}></div>
                    </div>
                    <div className="p-pipe p-left">
                        <div className="p-muff-v" style={{ top: "30%" }}></div>
                    </div>
                    <div className="p-pipe p-right">
                        <div className="p-muff-v" style={{ top: "70%" }}></div>
                    </div>
                    <div className="p-corner p-tl"></div>
                    <div className="p-corner p-tr"></div>
                    <div className="p-corner p-bl"></div>
                    <div className="p-corner p-br"></div>

                    {/* Water Wrapper with Overflow Hidden */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '24px', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
                        {currentStep === 5 && (
                            <div className="water-fill-container" style={{ position: 'absolute', bottom: 0, left: 0, height: isFilled ? 'calc(100% - 75px)' : '0%', transform: 'translateY(0)', width: '100%', transition: 'height 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                                <svg className="water-fill-wave-1" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ animation: isFilled ? 'wave-sway 5s linear infinite' : 'none', fill: '#7dd3fc' }}>
                                    <path d="M0,60 C150,10 350,110 600,60 C850,10 1050,110 1200,60 L1200,120 L0,120 Z"></path>
                                </svg>
                                <svg className="water-fill-wave-2" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ animation: isFilled ? 'wave-sway 3.5s linear infinite' : 'none', fill: '#38bdf8' }}>
                                    <path d="M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60 L1200,120 L0,120 Z"></path>
                                </svg>
                                <svg className="water-fill-wave-3" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ animation: isFilled ? 'wave-sway 2.5s linear infinite' : 'none', fill: '#0284c7' }}>
                                    <path d="M0,60 C250,130 350,-10 600,60 C850,130 950,-10 1200,60 L1200,120 L0,120 Z"></path>
                                </svg>
                            </div>
                        )}
                    </div>

                    <div id="views-container" style={{ position: 'relative', zIndex: 2 }}>
                        
                        <div className="stepper-container">
                            <div className="stepper-progress" style={{ width: currentStep === 1 ? '10%' : currentStep === 2 ? '30%' : currentStep === 3 ? '55%' : currentStep === 4 ? '80%' : '100%' }}></div>
                            <span className={`step-label ${currentStep >= 1 ? 'active' : ''}`}>Ditt hus</span>
                            <span className={`step-label ${currentStep >= 2 ? 'active' : ''}`}>Våningar</span>
                            <span className={`step-label ${currentStep >= 3 ? 'active' : ''}`}>Grund</span>
                            <span className={`step-label ${currentStep >= 4 ? 'active' : ''}`}>Omfattning</span>
                            <span className={`step-label ${currentStep >= 5 ? 'active' : ''}`}>Sammanfattning</span>
                        </div>

                        {currentStep === 1 && (
                            <div className="calc-view active">
                                <h2 className="view-title">Vilken typ av bostad gäller det?</h2>
                                <p className="view-subtitle">Välj den hustyp som stämmer bäst överens med din fastighet.</p>
                                
                                <div className="options-grid">
                                    {["Villa", "Radhus / Kedjehus", "Fritidshus"].map(type => (
                                        <div key={type} className={`option-card ${houseType === type ? 'selected' : ''}`} onClick={() => { setHouseType(type); setTimeout(() => setCurrentStep(2), 200); }}>
                                            <div className="option-icon">{iconsHouse[type]}</div>
                                            <div className="option-title" style={{fontWeight: 700, fontSize: "1.1rem"}}>{type}</div>
                                        </div>
                                    ))}
                                    <div className={`option-card ${houseType === "Bostadsrättsförening / Företag" ? 'selected' : ''}`} style={{ gridColumn: "1 / -1", maxWidth: "450px", margin: "0 auto", width: "100%" }} onClick={() => { setHouseType("Bostadsrättsförening / Företag"); setTimeout(() => setCurrentStep(6), 200); }}>
                                        <div className="option-icon">{iconsHouse["Bostadsrättsförening / Företag"]}</div>
                                        <div className="option-title" style={{fontWeight: 700, fontSize: "1.1rem", whiteSpace: "nowrap"}}>Bostadsrättsförening / Företag</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="calc-view active">
                                <h2 className="view-title">Hur många våningsplan?</h2>
                                <p className="view-subtitle">Välj antal våningsplan för din bostad.</p>
                                
                                <div className="options-grid">
                                    {["1-planshus", "1,5-planshus", "2-planshus"].map(type => (
                                        <div key={type} className={`option-card ${floorType === type ? 'selected' : ''}`} onClick={() => { setFloorType(type); setTimeout(() => setCurrentStep(3), 200); }}>
                                            <div className="option-icon">{iconsFloor[type]}</div>
                                            <div className="option-title" style={{fontWeight: 700, fontSize: "1.1rem"}}>{type}</div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="action-row" style={{ justifyContent: 'center' }}>
                                    <button className="btn-back" onClick={() => setCurrentStep(1)}>Tillbaka</button>
                                </div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="calc-view active">
                                <h2 className="view-title">Rum & Omfattning</h2>
                                <p className="view-subtitle">Ange antal rum som har vatten/avlopp, samt uppskattad längd till kommunalt avlopp.</p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                    
                                    <div>
                                        <div className="qty-list">
                                            {[
                                                { id: "badrum", label: "Badrum", points: 3, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg> },
                                                { id: "gasttoalett", label: "Gästtoalett", points: 2, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
                                                { id: "kok", label: "Kök", points: 1, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> },
                                                { id: "tvattstuga", label: "Tvättstuga", points: 1, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="12" cy="13" r="5"/><path d="M12 13c0-2.5 1.5-4.5 4-5s-1.5 4.5-4 5z"/><path d="M8 6h.01"/><path d="M11 6h.01"/></svg> },
                                                { id: "extra", label: "Extra golvbrunnar", points: 1, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg> }
                                            ].map((room) => (
                                                <div key={room.id} className="qty-item">
                                                    <div className="qty-item-info">
                                                        <div className="qty-item-icon">{room.icon}</div>
                                                        <div className="qty-item-text">
                                                            <div className="qty-item-title">{room.label}</div>
                                                            <div className="qty-item-subtitle">{room.points} {room.points === 1 ? 'anslutningspunkt' : 'anslutningspunkter'} per rum</div>
                                                        </div>
                                                    </div>
                                                    <div className="qty-controls">
                                                        <button className="qty-btn" onClick={() => updateQty(room.id as keyof typeof qtys, -1)}>-</button>
                                                        <span style={{ fontSize: "1.2rem", fontWeight: 700, width: "24px", textAlign: "center", color: "#0f172a" }}>{qtys[room.id as keyof typeof qtys]}</span>
                                                        <button className="qty-btn" onClick={() => updateQty(room.id as keyof typeof qtys, 1)}>+</button>
                                                    </div>
                                                </div>
                                            ))}
                                            
                                            {qtys.extra > 0 && (
                                                <div className="qty-item" style={{ borderLeft: "4px solid #facc15", backgroundColor: "#fffbeb", borderColor: "#fde68a" }}>
                                                    <div className="qty-item-info">
                                                        <div className="qty-item-icon" style={{color: "#d97706"}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
                                                        <div className="qty-item-text">
                                                            <div className="qty-item-title" style={{color: "#b45309"}}>Antal gjutjärnsbrunnar</div>
                                                            <div className="qty-item-subtitle" style={{color: "#d97706"}}>Gjutjärn kräver ofta en specialanpassad metod.</div>
                                                        </div>
                                                    </div>
                                                    <div className="qty-controls">
                                                        <button className="qty-btn" style={{borderColor: "#fcd34d", backgroundColor: "#fffbeb", color: "#b45309"}} onClick={() => updateQty("gjutjarn", -1)}>-</button>
                                                        <span style={{ fontSize: "1.2rem", fontWeight: 700, width: "24px", textAlign: "center", color: "#b45309" }}>{qtys.gjutjarn}</span>
                                                        <button className="qty-btn" style={{borderColor: "#fcd34d", backgroundColor: "#fffbeb", color: "#b45309"}} onClick={() => updateQty("gjutjarn", 1)}>+</button>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            <div className="qty-item" style={{ marginTop: "10px", backgroundColor: "#f8fafc", border: "1px dashed #cbd5e1", padding: "20px" }}>
                                                <div className="qty-item-info">
                                                    <div className="qty-item-text">
                                                        <div className="qty-item-title" style={{ fontSize: "1.1rem" }}>Totalt antal anslutningspunkter</div>
                                                        <div className="qty-item-subtitle">Beräknas automatiskt baserat på dina val</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "center", width: "126px" }}>
                                                    <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0284c7", width: "24px", textAlign: "center" }}>
                                                        {totalPoints}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "15px", color: "#0f172a" }}>Uppskattad längd till kommunalt avlopp</h3>
                                        <div className="options-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
                                            {["0-10m", "10-20m", "Över 20m", "Vet ej"].map(dist => (
                                                <div key={dist} className={`option-card ${distance === dist ? 'selected' : ''}`} style={{ padding: "15px 10px", minHeight: "auto" }} onClick={() => setDistance(dist)}>
                                                    <div className="option-title" style={{fontWeight: 600, marginBottom: 0}}>{dist}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                                <div className="action-row">
                                    <button className="btn-back" onClick={() => setCurrentStep(3)}>Tillbaka</button>
                                    <button className="btn-primary" disabled={!distance} onClick={() => setCurrentStep(5)}>Nästa Steg</button>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="calc-view active">
                                <h2 className="view-title">Grundläggning</h2>
                                <p className="view-subtitle">Vilken typ av grund står huset på?</p>
                                
                                <div className="options-grid">
                                    {[
                                        { id: "Platta på mark", icon: <svg width="32" height="48" viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline><rect x="1" y="22" width="22" height="3" rx="0.5"></rect></svg> },
                                        { id: "Källare", icon: <svg width="32" height="48" viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline><path d="M3 22v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-10"></path><line x1="1" y1="22" x2="23" y2="22"></line><rect x="10" y="25" width="4" height="3"></rect></svg> },
                                        { id: "Krypgrund", icon: <svg width="32" height="48" viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline><rect x="3" y="22" width="18" height="6"></rect><rect x="6" y="24" width="3" height="2"></rect><rect x="15" y="24" width="3" height="2"></rect><line x1="1" y1="28" x2="23" y2="28"></line></svg> },
                                        { id: "Torpargrund", icon: <svg width="32" height="48" viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline><rect x="3" y="22" width="3" height="6"></rect><rect x="10.5" y="22" width="3" height="6"></rect><rect x="18" y="22" width="3" height="6"></rect><line x1="1" y1="28" x2="23" y2="28"></line></svg> },
                                        { id: "Vet ej", icon: <svg width="32" height="48" viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 12a4.5 4.5 0 1 1 9 0c0 3.5-4.5 4.5-4.5 8"></path><circle cx="12" cy="26" r="1.2" fill="currentColor"></circle></svg> }
                                    ].map(found => (
                                        <div key={found.id} className={`option-card ${foundation === found.id ? 'selected' : ''}`} onClick={() => { setFoundation(found.id); setTimeout(() => setCurrentStep(4), 200); }}>
                                            <div className="option-icon">{found.icon}</div>
                                            <div className="option-title" style={{fontWeight: 700, fontSize: "1.1rem"}}>{found.id}</div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="action-row" style={{ justifyContent: 'center' }}>
                                    <button className="btn-back" onClick={() => setCurrentStep(2)}>Tillbaka</button>
                                </div>
                            </div>
                        )}

                        {currentStep === 5 && (
                            <div className="calc-view active">
                                <h2 className="view-title" style={{ color: isFilled ? "#ffffff" : "#0f172a", transition: "color 1.2s ease 0.6s" }}>Din Sammanfattning</h2>
                                <p className="view-subtitle" style={{ color: isFilled ? "#ffffff" : "#475569", transition: "color 1.2s ease 0.6s" }}>Fyll i dina kontaktuppgifter nedan så återkommer vi inom 24 timmar med en offert eller ett samtal.</p>
                                
                                <div className="modern-result">
                                    <div className="modern-result-body">
                                        <div className="price-main">
                                            <div className="price-value" style={{ color: "#0f172a" }}>{totalPoints}</div>
                                            <div className="price-suffix" style={{ color: "#64748b" }}>Anslutningspunkter</div>
                                        </div>
                                        <div className="price-details" style={{ maxWidth: '500px', margin: '0 auto' }}>
                                            <div className="detail-row"><span>Hustyp</span><span style={{fontWeight: 600, color: "#0f172a"}}>{houseType}</span></div>
                                            <div className="detail-row"><span>Våningsplan</span><span style={{fontWeight: 600, color: "#0f172a"}}>{floorType}</span></div>
                                            <div className="detail-row"><span>Längd till avlopp</span><span style={{fontWeight: 600, color: "#0f172a"}}>{distance}</span></div>
                                            <div className="detail-row"><span>Grund</span><span style={{fontWeight: 600, color: "#0f172a"}}>{foundation}</span></div>
                                        </div>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <div>
                                        <label htmlFor="calc-name" style={{ display: "block", fontSize: "0.95rem", fontWeight: 600, marginBottom: "5px", color: isFilled ? "#ffffff" : "#475569", transition: "color 1.2s ease 0.6s" }}>Namn *</label>
                                        <input type="text" id="calc-name" required value={name} onChange={e => setName(e.target.value)} placeholder="För- och efternamn" style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", color: "#0f172a", fontSize: "1rem", outline: "none" }} />
                                    </div>
                                    
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                                        <div>
                                            <label htmlFor="calc-email" style={{ display: "block", fontSize: "0.95rem", fontWeight: 600, marginBottom: "5px", color: isFilled ? "#ffffff" : "#475569", transition: "color 1.2s ease 0.6s" }}>E-post</label>
                                            <input type="email" id="calc-email" value={email} onChange={e => setEmail(e.target.value)} placeholder="din@epost.se" style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", color: "#0f172a", fontSize: "1rem", outline: "none" }} />
                                        </div>
                                        <div>
                                            <label htmlFor="calc-phone" style={{ display: "block", fontSize: "0.95rem", fontWeight: 600, marginBottom: "5px", color: isFilled ? "#ffffff" : "#475569", transition: "color 1.2s ease 0.6s" }}>Telefon *</label>
                                            <input type="tel" id="calc-phone" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="070-123 45 67" style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", color: "#0f172a", fontSize: "1rem", outline: "none" }} />
                                        </div>
                                    </div>

                                    <div className="action-row">
                                        <button type="button" className="btn-back" onClick={() => setCurrentStep(4)}>Tillbaka</button>
                                        <button type="submit" className="btn-primary" style={{ backgroundColor: isFilled ? "#ffffff" : "", color: isFilled ? "#0284c7" : "", transition: "all 1.2s ease 0.6s" }} disabled={status === "loading"}>
                                            {status === "loading" ? "Skickar..." : "Skicka Förfrågan"}
                                        </button>
                                    </div>

                                    {status === "error" && (
                                        <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "8px", color: "#ef4444", textAlign: "center", fontWeight: 500 }}>
                                            Något gick fel. Vänligen försök igen eller ring oss.
                                        </div>
                                    )}
                                </form>

                            </div>
                        )}

                        {currentStep === 6 && (
                            <div className="calc-view active">
                                <h2 className="view-title">Relining för BRF & Företag</h2>
                                <p className="view-subtitle">För större fastigheter krävs rätt förutsättningar</p>
                                
                                <div style={{ backgroundColor: "#faf8f5", borderRadius: "12px", padding: "30px", border: "1px solid #e2e8f0", marginBottom: "30px", lineHeight: "1.6", color: "#0f172a", fontSize: "1.05rem" }}>
                                    <p style={{ marginBottom: "15px" }}>Ett stambyte eller relining för en bostadsrättsförening (BRF) eller fastighet är ett omfattande projekt som kräver expertis. Varje rörsystem är unikt – från ålder och slitage till fastighetens specifika konstruktion. Därför rekommenderar vi alltid en noggrann översyn för större entreprenader.</p>
                                    <p style={{ marginBottom: "15px" }}>Vi på Nordxrelining är specialister på smidig och kostnadseffektiv rörinfodring och relining. För att ge er ett exakt och skräddarsytt underlag erbjuder vi alltid ett <span style={{fontWeight: 600}}>kostnadsfritt och villkorslöst platsbesök</span>.</p>
                                    <p style={{ color: "#0f172a" }}>Under besöket gör vi en professionell bedömning av stammarna och diskuterar den bästa lösningen för just er fastighet, så att ni kan känna er helt trygga inför nästa steg.</p>
                                </div>
                                
                                <div className="action-row step6-actions">
                                    <div className="step6-primary-group">
                                        <button className="btn-primary" onClick={() => router.push('/kontakt')}>Skicka förfrågan för besök</button>
                                        <a href="tel:0703185110" className="btn-primary" style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>Ring oss: 070-318 51 10</a>
                                    </div>
                                    <button className="btn-back" onClick={() => setCurrentStep(1)}>Tillbaka</button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </FrontendLayout>
    );
}
