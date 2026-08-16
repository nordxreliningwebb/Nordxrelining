'use client';
import { useEffect } from 'react';

export default function ReliningClientLogic() {
    useEffect(() => {
        document.body.classList.add('light-theme');
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N9QNLFS9');

        // Lyssna på när rör-animationen (main.js) flyttar munstycket (via style.transform)
        
            const nozzle = document.getElementById('dynamic-nozzle');
            const liner = document.getElementById('relining-liner');
            
            if(nozzle && liner) {
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.attributeName === 'style' || mutation.attributeName === 'transform') {
                            const transformStr = nozzle.style.transform || nozzle.getAttribute('transform');
                            if(transformStr) {
                                // Extrahera X och Y från translate(xpx, ypx)
                                const match = transformStr.match(/translate\(([^,]+),\s*([^)]+)\)/);
                                const scaleMatch = transformStr.match(/scale\(([^)]+)\)/);
                                const scale = scaleMatch ? parseFloat(scaleMatch[1]) : 1;
                                
                                if(match && match[1] && match[2]) {
                                    const x = parseFloat(match[1]);
                                    const y = parseFloat(match[2]);
                                    // Sätt strumpans X-position och skala för att matcha munstyckets translation och skala
                                    liner.style.transformOrigin = '100px 0px';
                                    liner.setAttribute('transform', `translate(${x}, 0) scale(${scale})`);
                                    
                                    // Sätt längden på själva kroppen, justerad för skala
                                    const mainBody = liner.querySelector('.relining-main-body');
                                    if(mainBody) mainBody.setAttribute('height', Math.max(0, (y / scale) + 10));
                                    
                                    // Sätt längden på blänken så att de sträcker sig exakt ner till sina punkter i huvudet
                                    const h1 = liner.querySelector('.relining-h1');
                                    if(h1) h1.setAttribute('height', Math.max(0, (y / scale) + 18));
                                    
                                    const h2 = liner.querySelector('.relining-h2');
                                    if(h2) h2.setAttribute('height', Math.max(0, (y / scale) + 22));
                                }
                            }
                        }
                    });
                });
                observer.observe(nozzle, { attributes: true, attributeFilter: ['style', 'transform'] });
            }
        

        
        return () => {
            document.body.classList.remove('light-theme');
        };
    }, []);
    return null;
}
