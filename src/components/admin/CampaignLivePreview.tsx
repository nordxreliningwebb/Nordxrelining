"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type CampaignPreviewProps = {
  title: string;
  description: string;
  discount: string;
  countdownDate: string;
  ctaText: string;
};

export default function CampaignLivePreview({
  title,
  description,
  discount,
  countdownDate,
  ctaText
}: CampaignPreviewProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(countdownDate) - +new Date();
      let timeLeftObj = {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00"
      };

      if (difference > 0) {
        timeLeftObj = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
          minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, '0'),
          seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, '0')
        };
      }
      return timeLeftObj;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownDate]);

  return (
    <div className="w-full flex justify-center items-center py-16 px-6 bg-slate-50 rounded-xl overflow-hidden min-h-[700px] relative">

      {/* Main Card */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-10 pt-12 flex flex-col items-center">
        
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors w-8 h-8 rounded-full flex items-center justify-center">
          <X className="w-5 h-5" />
        </button>

        {/* Timer Boxes */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="flex flex-col items-center justify-center w-[72px] h-[82px] border border-slate-200 rounded-xl bg-white shadow-sm">
            <span className="text-[#0284c7] text-[32px] font-bold leading-none mb-1">{timeLeft.days}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">DAGAR</span>
          </div>
          <div className="flex flex-col items-center justify-center w-[72px] h-[82px] border border-slate-200 rounded-xl bg-white shadow-sm">
            <span className="text-[#0284c7] text-[32px] font-bold leading-none mb-1">{timeLeft.hours}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">TIMMAR</span>
          </div>
          <div className="flex flex-col items-center justify-center w-[72px] h-[82px] border border-slate-200 rounded-xl bg-white shadow-sm">
            <span className="text-[#0284c7] text-[32px] font-bold leading-none mb-1">{timeLeft.minutes}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">MIN</span>
          </div>
          <div className="flex flex-col items-center justify-center w-[72px] h-[82px] border border-slate-200 rounded-xl bg-white shadow-sm">
            <span className="text-[#0284c7] text-[32px] font-bold leading-none mb-1">{timeLeft.seconds}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">SEK</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-[32px] font-bold text-slate-900 mb-6 text-center leading-[1.15]">
          {discount || title || "Sommarkampanj på Rörinspektion"}
        </h2>

        {/* Description */}
        <p className="text-[16px] text-slate-600 text-center leading-[1.6] mb-10 px-2 font-medium">
          {description || "Boka en komplett rörinspektion innan erbjudandet går ut och få 20% rabatt på hela arbetskostnaden. Vi säkerställer era rör inför hösten."}
        </p>

        {/* CTA Button */}
        <button className="w-full bg-[#0284c7] hover:bg-[#026aa2] text-white text-[17px] font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center mb-8 shadow-lg shadow-sky-600/20">
          {ctaText || "Ta del av erbjudandet"}
        </button>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2">
          <div className="w-[24px] h-[8px] rounded-full bg-[#0284c7]"></div>
          <div className="w-[8px] h-[8px] rounded-full bg-slate-200"></div>
        </div>

      </div>
    </div>
  );
}
