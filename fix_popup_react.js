const fs = require('fs');
let code = fs.readFileSync('src/components/public/CampaignPopupClient.tsx', 'utf8');

const newComponent = `
function CountdownTimer({ countdownDate }: { countdownDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!countdownDate) return;

    const calculateTimeLeft = () => {
      const difference = new Date(countdownDate).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [countdownDate]);

  return (
    <div className="campaign-countdown">
        <div className="countdown-item">
            <span className="countdown-value cd-days notranslate">{timeLeft.days.toString().padStart(2, '0')}</span>
            <span className="countdown-label">Dagar</span>
        </div>
        <div className="countdown-item">
            <span className="countdown-value cd-hours notranslate">{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className="countdown-label">Timmar</span>
        </div>
        <div className="countdown-item">
            <span className="countdown-value cd-mins notranslate">{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className="countdown-label">Min</span>
        </div>
        <div className="countdown-item">
            <span className="countdown-value cd-secs notranslate">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span className="countdown-label">Sek</span>
        </div>
    </div>
  );
}

export default function CampaignPopupClient({ campaign }: { campaign: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
`;

code = code.replace(/export default function CampaignPopupClient[\s\S]*?seconds: 0\s*\}\);/, newComponent);

code = code.replace(/useEffect\(\(\) => \{\s*if \(!campaign\?\.countdownDate\) return;[\s\S]*?clearInterval\(interval\);\s*\}, \[campaign\]\);/, '');

const oldHtml = `<div className="campaign-countdown">
                                <div className="countdown-item">
                                    <span className="countdown-value cd-days notranslate">{timeLeft.days.toString().padStart(2, '0')}</span>
                                    <span className="countdown-label">Dagar</span>
                                </div>
                                <div className="countdown-item">
                                    <span className="countdown-value cd-hours notranslate">{timeLeft.hours.toString().padStart(2, '0')}</span>
                                    <span className="countdown-label">Timmar</span>
                                </div>
                                <div className="countdown-item">
                                    <span className="countdown-value cd-mins notranslate">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                                    <span className="countdown-label">Min</span>
                                </div>
                                <div className="countdown-item">
                                    <span className="countdown-value cd-secs notranslate">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                                    <span className="countdown-label">Sek</span>
                                </div>
                            </div>`;

code = code.replace(oldHtml, `<CountdownTimer countdownDate={campaign.countdownDate} />`);

fs.writeFileSync('src/components/public/CampaignPopupClient.tsx', code);
console.log('Modified CampaignPopupClient.tsx');
