'use client';
import { useEffect } from 'react';

export default function RorinspektionClientLogic() {
    useEffect(() => {
        document.body.classList.add('light-theme');
        
        // Lyssna på när rör-animationen (main.js) flyttar kameran (via style.transform)
        
            const camera = document.getElementById('dynamic-nozzle');
            const cablePath = document.getElementById('camera-cable-path');
            const stripePath = document.getElementById('camera-cable-stripe');
            
            if(camera && cablePath && stripePath) {
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.attributeName === 'style' || mutation.attributeName === 'transform') {
                            const transformStr = camera.style.transform || camera.getAttribute('transform');
                            if(transformStr) {
                                const match = transformStr.match(/translate\(([^,]+),\s*([^)]+)\)/);
                                if(match && match[1] && match[2]) {
                                    const x = parseFloat(match[1]);
                                    const y = parseFloat(match[2]);
                                    
                                    // Förenklad rörål: En rak linje från Y=-100 ner till kameran
                                    const cameraCenterX = x + 100;
                                    
                                    // Rita en vertikal kabel ner till kameran
                                    const d = `M ${cameraCenterX} -100 L ${cameraCenterX} ${y - 20}`;
                                    cablePath.setAttribute('d', d);
                                    stripePath.setAttribute('d', d);
                                }
                            }
                        }
                    });
                });
                observer.observe(camera, { attributes: true, attributeFilter: ['style', 'transform'] });
            }
        

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
                                if(match && match[1] && match[2]) {
                                    const x = parseFloat(match[1]);
                                    const y = parseFloat(match[2]);
                                    // Sätt strumpans X-position för att matcha munstyckets translation
                                    liner.setAttribute('transform', `translate(${x}, 0)`);
                                    
                                    // Sätt längden på själva kroppen
                                    const mainBody = liner.querySelector('.relining-main-body');
                                    if(mainBody) mainBody.setAttribute('height', Math.max(0, y + 10));
                                    
                                    // Sätt längden på blänken så att de sträcker sig exakt ner till sina punkter i huvudet
                                    const h1 = liner.querySelector('.relining-h1');
                                    if(h1) h1.setAttribute('height', Math.max(0, y + 18));
                                    
                                    const h2 = liner.querySelector('.relining-h2');
                                    if(h2) h2.setAttribute('height', Math.max(0, y + 22));
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
