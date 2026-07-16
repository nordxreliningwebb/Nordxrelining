import os
import re

# Ensure the scratch directory exists if it doesn't already
# But we are in the workspace root, so we can just read from public/
with open('public/index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

header_end_idx = index_html.find('</header>') + len('</header>')
footer_start_idx = index_html.find('<footer')

header_part = index_html[:header_end_idx] + '\n<main>\n'
footer_part = '\n</main>\n' + index_html[footer_start_idx:]

def generate_page(title, h1, text, page_id):
    new_header = re.sub(r'<title>.*?</title>', f'<title>{title} - Nordx Relining</title>', header_part)
    
    # Also highlight the correct nav link by matching href=
    # This is a bit tricky, so we'll do it via javascript or just leave it for now.
    
    main_content = f'''
    <section class="service-page-hero" style="padding:150px 0 50px 0; background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color:#fff; text-align:center;">
        <div class="container">
            <h1 style="font-size:3rem; margin-bottom:1rem; color:#0fb3ff;">{h1}</h1>
            <p style="font-size:1.2rem; max-width:800px; margin:0 auto; color:#cbd5e1;">{text}</p>
        </div>
    </section>
    <section class="service-page-content" id="{page_id}-content" style="padding:50px 0;">
        <div class="container" id="{page_id}-container">
            <!-- Content will be injected here -->
        </div>
    </section>'''
    
    return new_header + main_content + footer_part

pages = [
    ('relining.html', 'Relining', 'Relining - Framtidens Rörrenovering', 'Vi förnyar dina rör inifrån med modern relining-teknik.'),
    ('stamspolning.html', 'Stamspolning', 'Professionell Stamspolning', 'Förebygg stopp och vattenskador med regelbunden stamspolning.'),
    ('rorinspektion.html', 'Rörinspektion', 'Avancerad Rörinspektion', 'Felsökning och dokumentation med modern kamerateknik.')
]

for filename, title, h1, text in pages:
    with open(f'public/{filename}', 'w', encoding='utf-8') as f:
        f.write(generate_page(title, h1, text, filename.split('.')[0]))

print('Pages created successfully.')
