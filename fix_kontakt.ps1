$filePath = "public/kontakt.html"
$content = Get-Content $filePath -Raw -Encoding UTF8

# Remove breadcrumbs
$content = $content -replace '(?s)<nav class="breadcrumbs".*?</nav>\s*', ''

# Change Title
$content = $content -replace '<h1>Kontakta oss för relining & rörinspektion</h1>', '<h1 class="section-title" style="margin-bottom:15px; color:#111111;">Kontakta oss</h1>'

# Change Subheading
$content = $content -replace '<h2 class="contact-subheading">Få hjälp med relining, stamspolning och rörinspektion i hela Sverige</h2>', '<h2 class="contact-subheading">Har du frågor eller vill boka in ett kostnadsfritt platsbesök? Tveka inte att höra av dig – vi hjälper dig gärna!</h2>'

# SEO block replace
$oldSeo = '(?s)<div class="seo-text-block">.*?</section>'
$newSeo = @"
                    <div class="seo-text-block">
                        <h2 class="section-title" style="font-size: 2.2rem; margin-bottom: 25px; color:#111111;">Din trygga partner för avlopp och rörsystem</h2>
                        <p>På Nordx Relining har vi lång erfarenhet av att underhålla och renovera rörsystem för både privatpersoner, företag och bostadsrättsföreningar. Vi erbjuder helhetslösningar inom avloppsteknik för att förlänga livslängden på din fastighet och förebygga dyra vattenskador.</p>
                        
                        <p>Våra huvudsakliga tjänster inkluderar:</p>
                        <ul style="margin-bottom: 25px; list-style-type: disc; padding-left: 20px; display:flex; flex-direction:column; gap:10px;">
                            <li><strong><a href="stamspolning.html" style="color: #0284c7; text-decoration: underline;">Stamspolning</a></strong>: Förebyggande underhåll som avlägsnar fett och beläggningar, vilket minskar risken för akuta stopp och ökar flödet i rören.</li>
                            <li><strong><a href="rorinspektion.html" style="color: #0284c7; text-decoration: underline;">Rörinspektion</a></strong>: Avancerad kamerateknik för att upptäcka sprickor, förslitningar och dolda problem inuti avloppssystemet.</li>
                            <li><strong><a href="relining.html" style="color: #0284c7; text-decoration: underline;">Relining</a></strong>: Ett kostnadseffektivt alternativ till stambyte där vi bygger nya, självbärande rör inuti de befintliga.</li>
                        </ul>
                        
                        <p>Oavsett om du behöver akut hjälp med avloppsrensning eller vill planera in en statuskontroll inför en eventuell relining, levererar vi teknisk precision och expertvägledning. Vi arbetar med marknadens bästa material och lämnar alltid 20 års garanti på vårt reliningsarbete.</p>
                    </div>

                    <div class="contact-checklist">
                        <h3>När ska du kontakta oss?</h3>
                        <ul>
                            <li>Vid återkommande stopp i avloppet</li>
                            <li>För planerat underhåll (stamspolning)</li>
                            <li>Inför ett misstänkt stambytesbehov</li>
                            <li>För fuktmätning och läcksökning</li>
                            <li>Kostnadsfri konsultation och offert</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
"@

$content = $content -replace $oldSeo, $newSeo

[System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)

$stylePath = "public/style.css"
$styleContent = Get-Content $stylePath -Raw -Encoding UTF8
$styleContent = $styleContent -replace "content: '→';", "content: '\2713';"
[System.IO.File]::WriteAllText($stylePath, $styleContent, [System.Text.Encoding]::UTF8)

Write-Host "Updated kontakt.html and style.css"
