#!/usr/bin/env python3
"""Writes docs/seo/keyword-map.csv from the built site. Run after `npm run build`.
Volumes and difficulty stay 'Not verified' until a real tool supplies them."""
import csv, html, re
from pathlib import Path

DIST = Path('dist')
S = '/services/'
# keyword, target url, intent, audience, geo, priority, conversion goal
ROWS = [
 # Personal brand
 *[(k, '/', 'Navigational', 'People checking Salman Faris', g, 'High', 'Contact') for k, g in [
   ('Salman Faris', 'Global'), ('Salman Faris developer', 'Global'), ('Salman Faris portfolio', 'Global'), ('Salman Faris full-stack developer', 'Global'),
   ('Salman Faris video editor', 'Global'), ('Salman Faris digital marketer', 'Global'), ('Salman Faris AI developer', 'Global'), ('Salman Faris freelancer', 'Global'),
   ('Salman Faris Kerala', 'Kerala'), ('Salman Faris Calicut', 'Calicut')]],
 # Development
 ('full stack developer in Calicut', S+'full-stack-development/', 'Local service', 'Businesses and startups', 'Calicut', 'High', 'Project enquiry'),
 ('full stack developer in Kozhikode', S+'full-stack-development/', 'Local service', 'Businesses and startups', 'Calicut', 'High', 'Project enquiry'),
 ('best full stack developer in Calicut', S+'full-stack-development/', 'Commercial investigation', 'Businesses comparing developers', 'Calicut', 'High', 'Project enquiry'),
 ('best developer in Calicut', S+'full-stack-development/', 'Commercial investigation', 'Businesses comparing developers', 'Calicut', 'Medium', 'Project enquiry'),
 ('freelance developer in Kerala', S+'full-stack-development/', 'Transactional', 'Businesses', 'Kerala', 'High', 'Project enquiry'),
 ('web application developer Kerala', S+'full-stack-development/', 'Transactional', 'Businesses', 'Kerala', 'Medium', 'Project enquiry'),
 ('custom software developer Kerala', S+'full-stack-development/', 'Transactional', 'Businesses', 'Kerala', 'Medium', 'Project enquiry'),
 ('backend developer Kerala', S+'full-stack-development/', 'Transactional', 'Startups', 'Kerala', 'Medium', 'Project enquiry'),
 ('remote full-stack developer India', '/locations/india/', 'Transactional', 'Remote clients', 'India', 'Medium', 'Project enquiry'),
 ('freelance full-stack developer India', '/locations/india/', 'Transactional', 'Remote clients', 'India', 'Medium', 'Project enquiry'),
 ('developer in Kerala', '/best-developer-in-kerala/', 'Local service', 'Businesses', 'Kerala', 'High', 'Project enquiry'),
 ('best developer in Kerala', '/best-developer-in-kerala/', 'Commercial investigation', 'Businesses comparing developers', 'Kerala', 'High', 'Project enquiry'),
 ('website development in Calicut', S+'website-development-calicut/', 'Local service', 'Local businesses', 'Calicut', 'High', 'Project enquiry'),
 ('web developer in Calicut', S+'website-development-calicut/', 'Local service', 'Local businesses', 'Calicut', 'High', 'Project enquiry'),
 ('freelance web developer in Calicut', S+'website-development-calicut/', 'Transactional', 'Local businesses', 'Calicut', 'High', 'Project enquiry'),
 ('website developer in Kozhikode', S+'website-development-calicut/', 'Local service', 'Local businesses', 'Calicut', 'High', 'Project enquiry'),
 ('custom website developer Calicut', S+'website-development-calicut/', 'Transactional', 'Local businesses', 'Calicut', 'Medium', 'Project enquiry'),
 ('affordable business website development in Calicut', S+'website-development-calicut/', 'Transactional', 'Small businesses', 'Calicut', 'Medium', 'Project enquiry'),
 ('hire a freelance website developer in Calicut', S+'website-development-calicut/', 'Transactional', 'Local businesses', 'Calicut', 'High', 'Project enquiry'),
 ('landing page designer Calicut', S+'website-development-calicut/', 'Transactional', 'Marketers', 'Calicut', 'Low', 'Project enquiry'),
 ('React and Next.js developer in Kerala', S+'react-nextjs-development/', 'Transactional', 'Startups', 'Kerala', 'High', 'Project enquiry'),
 ('React developer Kerala', S+'react-nextjs-development/', 'Transactional', 'Startups', 'Kerala', 'High', 'Project enquiry'),
 ('Next.js developer Kerala', S+'react-nextjs-development/', 'Transactional', 'Startups', 'Kerala', 'High', 'Project enquiry'),
 ('Next.js developer Calicut', S+'react-nextjs-development/', 'Transactional', 'Startups', 'Calicut', 'Medium', 'Project enquiry'),
 ('Next.js developer for startups', S+'react-nextjs-development/', 'Transactional', 'Startups', 'Global', 'Medium', 'Project enquiry'),
 ('e-commerce website development in Kerala', S+'ecommerce-development/', 'Transactional', 'Small brands', 'Kerala', 'Medium', 'Project enquiry'),
 ('e-commerce website developer Calicut', S+'ecommerce-development/', 'Transactional', 'Small brands', 'Calicut', 'Medium', 'Project enquiry'),
 # AI
 ('AI website developer in Kerala', S+'ai-web-development/', 'Local service', 'Businesses', 'Kerala', 'High', 'Project enquiry'),
 ('AI web developer Calicut', S+'ai-web-development/', 'Local service', 'Businesses', 'Calicut', 'High', 'Project enquiry'),
 ('AI website developer India', S+'ai-web-development/', 'Transactional', 'Businesses', 'India', 'Medium', 'Project enquiry'),
 ('AI website development Kerala', S+'ai-web-development/', 'Transactional', 'Businesses', 'Kerala', 'High', 'Project enquiry'),
 ('AI-powered website development', S+'ai-web-development/', 'Commercial investigation', 'Businesses', 'Global', 'Medium', 'Project enquiry'),
 ('AI integration services', S+'ai-web-development/', 'Transactional', 'Businesses', 'Global', 'Medium', 'Project enquiry'),
 ('AI application developer', S+'ai-web-development/', 'Transactional', 'Businesses', 'Global', 'Medium', 'Project enquiry'),
 ('AI chatbot development Kerala', S+'ai-web-development/', 'Transactional', 'Businesses', 'Kerala', 'Medium', 'Project enquiry'),
 ('AI automation developer in Kerala', S+'ai-agent-automation/', 'Local service', 'Businesses', 'Kerala', 'High', 'Project enquiry'),
 ('AI agent developer', S+'ai-agent-automation/', 'Transactional', 'Businesses', 'Global', 'Medium', 'Project enquiry'),
 ('AI workflow automation', S+'ai-agent-automation/', 'Commercial investigation', 'Businesses', 'Global', 'Medium', 'Project enquiry'),
 ('AI solutions for businesses', S+'ai-agent-automation/', 'Commercial investigation', 'Businesses', 'Global', 'Low', 'Project enquiry'),
 # Video
 ('video editor in Calicut', S+'video-editor-calicut/', 'Local service', 'Brands and creators', 'Calicut', 'High', 'Project enquiry'),
 ('best video editor in Calicut', S+'video-editor-calicut/', 'Commercial investigation', 'Brands and creators', 'Calicut', 'High', 'Project enquiry'),
 ('freelance video editor Kerala', S+'video-editor-calicut/', 'Transactional', 'Brands and creators', 'Kerala', 'High', 'Project enquiry'),
 ('professional video editing Kerala', S+'video-editor-calicut/', 'Transactional', 'Brands', 'Kerala', 'Medium', 'Project enquiry'),
 ('reels editor Kerala', S+'video-editor-calicut/', 'Transactional', 'Creators', 'Kerala', 'High', 'Project enquiry'),
 ('After Effects editor Kerala', S+'video-editor-calicut/', 'Transactional', 'Brands', 'Kerala', 'Medium', 'Project enquiry'),
 ('Premiere Pro video editor', S+'video-editor-calicut/', 'Transactional', 'Brands', 'Global', 'Low', 'Project enquiry'),
 ('DaVinci Resolve editor', S+'video-editor-calicut/', 'Transactional', 'Brands', 'Global', 'Low', 'Project enquiry'),
 ('cinematic video editor Calicut', S+'video-editor-calicut/', 'Local service', 'Brands', 'Calicut', 'Medium', 'Project enquiry'),
 ('social media video editor', S+'video-editor-calicut/', 'Transactional', 'Creators', 'Global', 'Low', 'Project enquiry'),
 ('remote video editor', '/locations/india/', 'Transactional', 'Remote clients', 'Global', 'Low', 'Project enquiry'),
 ('motion graphics designer in Kerala', S+'motion-graphics/', 'Transactional', 'Brands', 'Kerala', 'High', 'Project enquiry'),
 ('motion graphics designer Calicut', S+'motion-graphics/', 'Local service', 'Brands', 'Calicut', 'High', 'Project enquiry'),
 ('freelance motion designer India', S+'motion-graphics/', 'Transactional', 'Brands', 'India', 'Medium', 'Project enquiry'),
 ('AI video editor in Kerala', S+'ai-video-editing/', 'Transactional', 'Creators', 'Kerala', 'High', 'Project enquiry'),
 ('best AI video editor in Calicut', S+'ai-video-editing/', 'Commercial investigation', 'Creators', 'Calicut', 'High', 'Project enquiry'),
 ('AI video content creator Kozhikode', S+'ai-video-editing/', 'Local service', 'Creators', 'Calicut', 'Medium', 'Project enquiry'),
 ('UI UX designer in Kerala', S+'ui-ux-design/', 'Transactional', 'Founders', 'Kerala', 'Medium', 'Project enquiry'),
 ('UI UX designer Calicut', S+'ui-ux-design/', 'Local service', 'Founders', 'Calicut', 'Medium', 'Project enquiry'),
 ('website designer Kozhikode', S+'ui-ux-design/', 'Local service', 'Businesses', 'Calicut', 'Medium', 'Project enquiry'),
 ('Figma designer Kerala', S+'ui-ux-design/', 'Transactional', 'Founders', 'Kerala', 'Low', 'Project enquiry'),
 ('creative developer Kerala', S+'ui-ux-design/', 'Transactional', 'Brands', 'Kerala', 'Medium', 'Project enquiry'),
 # Marketing
 ('digital marketer in Calicut', S+'digital-marketer-calicut/', 'Local service', 'Small businesses', 'Calicut', 'High', 'Project enquiry'),
 ('best digital marketer in Calicut', S+'digital-marketer-calicut/', 'Commercial investigation', 'Small businesses', 'Calicut', 'High', 'Project enquiry'),
 ('freelance digital marketer Calicut', S+'digital-marketer-calicut/', 'Transactional', 'Small businesses', 'Calicut', 'High', 'Project enquiry'),
 ('freelance digital marketer Kerala', S+'digital-marketer-calicut/', 'Transactional', 'Small businesses', 'Kerala', 'High', 'Project enquiry'),
 ('digital marketing expert Kozhikode', S+'digital-marketer-calicut/', 'Local service', 'Small businesses', 'Calicut', 'High', 'Project enquiry'),
 ('digital marketing services Calicut', S+'digital-marketer-calicut/', 'Transactional', 'Small businesses', 'Calicut', 'High', 'Project enquiry'),
 ('digital marketing freelancer India', S+'digital-marketer-calicut/', 'Transactional', 'Small businesses', 'India', 'Medium', 'Project enquiry'),
 ('remote digital marketing services', '/locations/india/', 'Transactional', 'Remote clients', 'Global', 'Low', 'Project enquiry'),
 ('SEO expert in Calicut', S+'seo-services/', 'Local service', 'Businesses', 'Calicut', 'High', 'Project enquiry'),
 ('SEO specialist Kerala', S+'seo-services/', 'Transactional', 'Businesses', 'Kerala', 'High', 'Project enquiry'),
 ('SEO freelancer Kerala', S+'seo-services/', 'Transactional', 'Businesses', 'Kerala', 'High', 'Project enquiry'),
 ('freelance SEO consultant Kerala', S+'seo-services/', 'Transactional', 'Businesses', 'Kerala', 'High', 'Project enquiry'),
 ('website SEO consultant', S+'seo-services/', 'Transactional', 'Businesses', 'Global', 'Low', 'Project enquiry'),
 ('technical SEO specialist', S+'seo-services/', 'Transactional', 'Businesses', 'Global', 'Medium', 'Project enquiry'),
 ('local SEO services in Kerala', S+'local-seo/', 'Transactional', 'Local businesses', 'Kerala', 'High', 'Project enquiry'),
 ('local SEO expert Kozhikode', S+'local-seo/', 'Local service', 'Local businesses', 'Calicut', 'High', 'Project enquiry'),
 ('local SEO services Calicut', S+'local-seo/', 'Local service', 'Local businesses', 'Calicut', 'High', 'Project enquiry'),
 ('social media marketing in Calicut', S+'social-media-marketing/', 'Local service', 'Brands', 'Calicut', 'Medium', 'Project enquiry'),
 ('social media marketer Calicut', S+'social-media-marketing/', 'Local service', 'Brands', 'Calicut', 'Medium', 'Project enquiry'),
 ('Instagram marketing Kerala', S+'social-media-marketing/', 'Transactional', 'Brands', 'Kerala', 'Medium', 'Project enquiry'),
 # Courses
 ('AI web development course in Calicut', '/courses/ai-web-development/', 'Course enrolment', 'Learners', 'Calicut', 'High', 'Course enquiry'),
 ('AI web development course Kerala', '/courses/ai-web-development/', 'Course enrolment', 'Learners', 'Kerala', 'High', 'Course enquiry'),
 ('AI web development online course India', '/courses/ai-web-development/', 'Course enrolment', 'Learners', 'India', 'High', 'Course enquiry'),
 ('vibe coding course Kerala', '/courses/ai-vibe-coding/', 'Course enrolment', 'Learners', 'Kerala', 'High', 'Course enquiry'),
 ('what is vibe coding', '/blog/ai-development/what-is-vibe-coding/', 'Informational', 'Learners', 'Global', 'Medium', 'Course enquiry'),
 ('what is a forward deployed engineer', '/blog/ai-development/what-is-a-forward-deployed-engineer/', 'Informational', 'Learners', 'Global', 'Medium', 'Course enquiry'),
 *[(k, '/courses/', 'Educational', 'Learners', 'Kerala', 'Low', 'Course enquiry') for k in [
   'forward deployed engineer course India', 'AI engineer course Kerala', 'full-stack development course Calicut', 'full-stack development course Kerala', 'MERN stack course Kerala',
   'Golang course Kerala', 'Go programming course India', 'Python programming course Kerala', 'AI and ML course Kerala', 'AI agent automation course', 'Claude AI course', 'ChatGPT course',
   'generative AI course Kerala', 'digital marketing course Calicut', 'SEO course Kerala', 'AI video editing course', 'video editing course Calicut', 'After Effects course Kerala',
   'Premiere Pro course Kerala', 'DaVinci Resolve course Kerala', 'UI UX design course Calicut']],
 # Local and languages
 ('freelancer in Kozhikode', '/locations/kozhikode/', 'Local service', 'Local businesses', 'Calicut', 'Medium', 'Project enquiry'),
 ('developer and digital marketer in Kerala', '/locations/kerala/', 'Local service', 'Businesses', 'Kerala', 'Medium', 'Project enquiry'),
 ('remote freelance developer India', '/locations/india/', 'Transactional', 'Remote clients', 'India', 'Medium', 'Project enquiry'),
 ('കോഴിക്കോട് ഫുൾ സ്റ്റാക്ക് ഡെവലപ്പർ', '/ml/', 'Local service', 'Malayalam searchers', 'Kerala', 'Medium', 'Project enquiry'),
 ('AI വെബ് ഡെവലപ്മെന്റ് കോഴ്സ് മലയാളം', '/ml/courses/', 'Course enrolment', 'Malayalam learners', 'Kerala', 'High', 'Course enquiry'),
 ('AI वेब डेवलपमेंट कोर्स', '/hi/courses/', 'Course enrolment', 'Hindi learners', 'India', 'Medium', 'Course enquiry'),
 ('AI வலை மேம்பாட்டு படிப்பு', '/ta/courses/', 'Course enrolment', 'Tamil learners', 'India', 'Low', 'Course enquiry'),
 ('دورة تطوير الويب بالذكاء الاصطناعي', '/ar/courses/', 'Course enrolment', 'Arabic learners', 'Gulf', 'Medium', 'Course enquiry'),
 # Articles
 ('choose a website developer in Calicut', '/blog/web-development/how-to-choose-a-website-developer-in-calicut/', 'Informational', 'Local businesses', 'Calicut', 'Medium', 'Project enquiry'),
 ('local SEO Kozhikode', '/blog/seo/how-local-seo-works-in-kozhikode/', 'Informational', 'Local businesses', 'Calicut', 'Medium', 'Project enquiry'),
 ('digital marketing for small business Kerala', '/blog/digital-marketing/fix-this-before-running-ads-small-business-kerala/', 'Informational', 'Small businesses', 'Kerala', 'Medium', 'Project enquiry'),
 ('Malayalam reel series', '/blog/video-editing/how-i-built-a-30-part-malayalam-reel-series/', 'Informational', 'Creators', 'Kerala', 'Low', 'Project enquiry'),
]
NOT_TARGETED = [
 ('Python Django developer in Calicut', 'Not your stack. From a different Salman Faris.'),
 ('FastAPI developer', 'Not your stack.'),
 ('custom RAG and LLM developer India', 'Only add when you have a RAG project to show.'),
 ('Google Ads specialist Kerala', 'No ad campaign evidence yet. Confirm and add proof first.'),
 ('Google Ads freelancer Calicut', 'No ad campaign evidence yet.'),
 ('high-converting Meta ad creative designer Calicut', 'No ad campaign evidence yet.'),
 ('performance marketing freelancer Calicut', 'No ad campaign evidence yet.'),
 ('Top 10 full stack developers in Kerala', 'A self-written ranking of competitors is not credible.'),
 ('closest digital marketer near me', 'Near-me results depend on a verified Google Business Profile.'),
]

def strip(text):
    return html.unescape(re.sub(r'<[^>]+>', ' ', text)).strip()

def page(url):
    file = DIST / url.strip('/') / 'index.html' if url != '/' else DIST / 'index.html'
    source = file.read_text(encoding='utf8')
    title = html.unescape(re.search(r'<title>(.*?)</title>', source).group(1))
    desc = html.unescape(re.search(r'<meta name="description" content="(.*?)"', source).group(1))
    h1 = re.sub(r'\s+', ' ', strip(re.search(r'<h1[^>]*>(.*?)</h1>', source, re.S).group(1)))
    return title, desc, h1

groups = {}
for row in ROWS:
    groups.setdefault(row[1], []).append(row[0])

header = ['keyword', 'primary_keyword', 'secondary_keywords', 'search_intent', 'target_audience', 'geo', 'target_url', 'title', 'meta_description', 'h1', 'internal_links', 'conversion_goal', 'priority', 'content_status', 'measurement', 'volume', 'difficulty']
out = Path('docs/seo/keyword-map.csv')
with out.open('w', newline='', encoding='utf8') as handle:
    writer = csv.writer(handle)
    writer.writerow(header)
    for keyword, url, intent, audience, geo, priority, goal in ROWS:
        title, desc, h1 = page(url)
        others = [k for k in groups[url] if k != groups[url][0]]
        writer.writerow([keyword, groups[url][0], '; '.join(others[:6]), intent, audience, geo, url, title, desc, h1,
                         'Footer, /services/, related pages', goal, priority, 'Published on branch', 'Search Console query report + GA4 ' + ('course_enquiry' if 'Course' in goal else 'contact_form_submit'), 'Not verified', 'Not verified'])
    for keyword, reason in NOT_TARGETED:
        writer.writerow([keyword, '', '', 'Not targeted', '', '', '', '', '', '', '', '', '', f'Not targeted: {reason}', '', 'Not verified', 'Not verified'])
print(f'{len(ROWS)} keywords mapped to {len(groups)} URLs, {len(NOT_TARGETED)} not targeted -> {out}')
