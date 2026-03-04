$areas = @(
    @{ slug = 'cheadle'; name = 'Cheadle'; postcode = 'SK8'; desc = 'Cheadle is our home base. Located in Stockport, SK8, we have been delivering exceptional construction services to homeowners and businesses across Cheadle for over 20 years. From Victorian terrace renovations to modern new builds, we understand the local architecture and planning requirements.'; extra = 'As a locally-based company, we offer the fastest response times in Cheadle. We know the conservation areas, the local planning office, and the community — which means a smoother project for you.'; nearby = @('Cheadle Hulme', 'Bramhall', 'Heaton Mersey', 'Heaton Moor', 'Stockport') },
    @{ slug = 'cheadle-hulme'; name = 'Cheadle Hulme'; postcode = 'SK8'; desc = 'Cheadle Hulme is one of our most active areas. With its mix of 1930s semis, Edwardian villas, and modern estates, we regularly carry out extensions, loft conversions, and full renovations for homeowners looking to maximise their living space.'; extra = 'We understand the typical construction challenges in Cheadle Hulme — from dealing with older foundations to matching existing brickwork on period properties. Our team has extensive experience across the area.'; nearby = @('Cheadle', 'Bramhall', 'Heaton Mersey', 'Poynton', 'Stockport') },
    @{ slug = 'bramhall'; name = 'Bramhall'; postcode = 'SK7'; desc = 'Bramhall is one of Stockport''s most desirable residential areas. We specialise in high-specification home improvements, luxury extensions, and bespoke new builds that complement Bramhall''s prestigious character.'; extra = 'Many Bramhall properties sit in conservation areas or have unique architectural features. We work sensitively with period properties while delivering contemporary interiors that add significant value.'; nearby = @('Cheadle Hulme', 'Poynton', 'Wilmslow', 'Hazel Grove', 'Stockport') },
    @{ slug = 'wilmslow'; name = 'Wilmslow'; postcode = 'SK9'; desc = 'Wilmslow is one of Cheshire''s most prestigious addresses. We deliver luxury construction projects across Wilmslow, from bespoke new builds on private plots to high-end kitchen and bathroom renovations.'; extra = 'Wilmslow properties demand exceptional attention to detail and premium materials. Our team delivers the quality of finish that Wilmslow homeowners expect — on time and within budget.'; nearby = @('Alderley Edge', 'Prestbury', 'Handforth', 'Bramhall', 'Knutsford') },
    @{ slug = 'alderley-edge'; name = 'Alderley Edge'; postcode = 'SK9'; desc = 'Alderley Edge is renowned for its luxury properties and discerning residents. We provide bespoke construction services tailored to the high expectations of homeowners in this exclusive Cheshire village.'; extra = 'From grand entrance hallways to designer kitchens and spa-quality bathrooms, we deliver the premium craftsmanship that Alderley Edge properties deserve. Our portfolio includes several notable projects in the area.'; nearby = @('Wilmslow', 'Prestbury', 'Knutsford', 'Macclesfield', 'Chelford') },
    @{ slug = 'prestbury'; name = 'Prestbury'; postcode = 'SK10'; desc = 'Prestbury is consistently ranked among England''s most expensive villages. We provide bespoke, high-end construction services to match the exclusive standards expected in this sought-after Cheshire location.'; extra = 'Working in Prestbury requires sensitivity to the conservation area and an understanding of luxury specifications. We deliver projects that enhance property values and exceed homeowner expectations.'; nearby = @('Alderley Edge', 'Wilmslow', 'Macclesfield', 'Bollington', 'Poynton') },
    @{ slug = 'hale'; name = 'Hale'; postcode = 'WA15'; desc = 'Hale is one of Greater Manchester''s most desirable suburbs, known for its charming village centre and beautiful period properties. We deliver premium construction services across Hale and Hale Village.'; extra = 'From Edwardian villa renovations to contemporary rear extensions, we understand the architectural character of Hale and work to enhance it. Many of our projects involve sympathetic upgrades to period homes.'; nearby = @('Hale Barns', 'Bowdon', 'Altrincham', 'Timperley', 'Sale') },
    @{ slug = 'hale-barns'; name = 'Hale Barns'; postcode = 'WA15'; desc = 'Hale Barns is known for its large detached properties, generous plots, and family-friendly environment. We provide comprehensive construction services from extensions and loft conversions to complete new builds.'; extra = 'Hale Barns properties often have excellent scope for expansion. We specialise in maximising living space through well-designed extensions, garage conversions, and loft room additions.'; nearby = @('Hale', 'Bowdon', 'Altrincham', 'Wilmslow', 'Knutsford') },
    @{ slug = 'bowdon'; name = 'Bowdon'; postcode = 'WA14'; desc = 'Bowdon is one of Trafford''s most affluent areas, known for its leafy streets and substantial period properties. We deliver high-quality construction work that respects Bowdon''s architectural heritage while creating modern living spaces.'; extra = 'Many Bowdon properties are in the Bowdon Conservation Area, requiring sensitive alterations and planning expertise. We have extensive experience navigating conservation requirements.'; nearby = @('Hale', 'Hale Barns', 'Altrincham', 'Dunham Massey', 'Sale') },
    @{ slug = 'didsbury'; name = 'Didsbury'; postcode = 'M20'; desc = 'Didsbury is one of South Manchester''s most popular suburbs, beloved for its village atmosphere, independent shops, and beautiful parks. We provide professional construction services to homeowners across Didsbury and East Didsbury.'; extra = 'Didsbury has a wonderful mix of Victorian terraces, Edwardian semis, and 1930s properties. We specialise in extending and renovating these homes to create the open-plan, contemporary living spaces families want.'; nearby = @('Heaton Mersey', 'Chorlton', 'Withington', 'Burnage', 'Stockport') },
    @{ slug = 'heaton-moor'; name = 'Heaton Moor'; postcode = 'SK4'; desc = 'Heaton Moor is a vibrant, popular area of Stockport with a thriving high street and strong community. We provide reliable, high-quality construction services to homeowners looking to improve and extend their properties.'; extra = 'The area features many traditional bay-fronted semis and terraces. We regularly carry out side returns, rear extensions, and loft conversions that transform these classic homes into modern family spaces.'; nearby = @('Heaton Mersey', 'Didsbury', 'Stockport', 'Reddish', 'Levenshulme') },
    @{ slug = 'heaton-mersey'; name = 'Heaton Mersey'; postcode = 'SK4'; desc = 'Heaton Mersey sits conveniently between Stockport town centre and Didsbury village. We provide comprehensive building services to homeowners throughout Heaton Mersey, from small repairs to major extensions and conversions.'; extra = 'Many Heaton Mersey homes have excellent potential for side and rear extensions. We help homeowners unlock this potential, adding bedrooms, creating open-plan kitchens, and building garden rooms.'; nearby = @('Heaton Moor', 'Didsbury', 'Cheadle', 'Stockport', 'Burnage') },
    @{ slug = 'poynton'; name = 'Poynton'; postcode = 'SK12'; desc = 'Poynton is a charming village on the Cheshire border, popular with families and commuters. We provide professional construction services to homeowners across Poynton and the surrounding rural areas.'; extra = 'Poynton properties range from period stone cottages to modern executive homes. We have experience working with both traditional and contemporary building methods to deliver excellent results across the area.'; nearby = @('Bramhall', 'Prestbury', 'Bollington', 'Hazel Grove', 'Disley') }
)

$footer = @'
<footer class="footer" id="footer"><div class="container"><div class="footer__grid"><div class="footer__brand"><div class="footer__logo">Cheadle <span>Construction</span></div><p class="footer__brand-text">We are a well established, trustworthy, reliable and professional company with over 20 years experience. We serve Stockport, Manchester and all surrounding areas of the North West.</p><div class="footer__contact-item"><span class="footer__contact-icon">📞</span><a href="tel:01612189616" class="footer__link">0161 218 9616</a></div><div class="footer__contact-item"><span class="footer__contact-icon">📱</span><a href="tel:07725818183" class="footer__link">07725 818183</a></div><div class="footer__contact-item"><span class="footer__contact-icon">✉</span><a href="mailto:info@cheadleconstruction.com" class="footer__link">info@cheadleconstruction.com</a></div><div class="footer__contact-item"><span class="footer__contact-icon">📍</span><span>Cheadle, Stockport, SK8</span></div></div><div><h3 class="footer__heading">Quick Links</h3><nav class="footer__links" aria-label="Footer quick links"><a href="index.html" class="footer__link">Home</a><a href="about.html" class="footer__link">About Us</a><a href="our-process.html" class="footer__link">Our Process</a><a href="portfolio.html" class="footer__link">Portfolio</a><a href="testimonials.html" class="footer__link">Testimonials</a><a href="blog.html" class="footer__link">Blog</a><a href="faqs.html" class="footer__link">FAQs</a><a href="contact.html" class="footer__link">Contact</a><a href="request-quote.html" class="footer__link">Request a Quote</a></nav></div><div><h3 class="footer__heading">Services</h3><nav class="footer__links" aria-label="Footer service links"><a href="new-builds.html" class="footer__link">New Builds</a><a href="home-extensions.html" class="footer__link">Home Extensions</a><a href="loft-conversions.html" class="footer__link">Loft Conversions</a><a href="kitchen-renovation.html" class="footer__link">Kitchen Renovation</a><a href="bathroom-renovation.html" class="footer__link">Bathroom Renovation</a><a href="garage-conversions.html" class="footer__link">Garage Conversions</a><a href="commercial-new-builds.html" class="footer__link">Commercial Builds</a><a href="office-construction.html" class="footer__link">Office Construction</a></nav></div><div><h3 class="footer__heading">Areas</h3><nav class="footer__links" aria-label="Footer area links"><a href="builders-cheadle.html" class="footer__link">Cheadle</a><a href="builders-cheadle-hulme.html" class="footer__link">Cheadle Hulme</a><a href="builders-bramhall.html" class="footer__link">Bramhall</a><a href="builders-wilmslow.html" class="footer__link">Wilmslow</a><a href="builders-alderley-edge.html" class="footer__link">Alderley Edge</a><a href="builders-prestbury.html" class="footer__link">Prestbury</a><a href="builders-hale.html" class="footer__link">Hale</a><a href="builders-bowdon.html" class="footer__link">Bowdon</a><a href="builders-didsbury.html" class="footer__link">Didsbury</a></nav></div></div><div class="footer__bottom"><p class="footer__copyright">&copy; 2025 Cheadle Construction. All rights reserved. Company Reg: 12345678</p><div class="footer__legal"><a href="privacy-policy.html">Privacy Policy</a><a href="terms-conditions.html">Terms &amp; Conditions</a><a href="sitemap.html">Sitemap</a></div></div></div></footer>
'@

foreach ($area in $areas) {
    $slug = $area.slug
    $name = $area.name
    $pc = $area.postcode
    $desc = $area.desc
    $extra = $area.extra
    $nearbyLinks = ($area.nearby | ForEach-Object {
            $s = $_.ToLower().Replace(' ', '-')
            "                            <a href=`"builders-$s.html`" class=`"area-nearby__link`">Builders in $_</a>"
        }) -join "`r`n"

    $html = @"
<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Professional builders in $name ($pc) - new builds, extensions, loft conversions, kitchens, bathrooms, and commercial construction. Call 0161 218 9616.">
<title>Builders in $name | Cheadle Construction</title>
<link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="css/areas-shared.css">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<script src="js/load-includes.js" defer></script>
</head><body>
<div id="header-root"></div>
<main>

<!-- HERO -->
<section class="page-hero page-hero--area" id="area-hero">
    <div class="page-hero__bg-img" aria-hidden="true"></div>
    <div class="container"><div class="page-hero__content">
        <div class="page-hero__breadcrumb"><a href="index.html">Home</a> <span>/</span> <a href="areas.html">Areas</a> <span>/</span> Builders in $name</div>
        <h1 class="page-hero__title">Builders in <em>$name</em></h1>
        <p class="page-hero__subtitle">Professional construction services in $name and surrounding areas. New builds, extensions, conversions, renovations, and commercial projects.</p>
    </div></div>
</section>

<!-- INTRO -->
<section class="area-intro section" id="area-intro" aria-labelledby="area-intro-title">
    <div class="container"><div class="area-intro__grid">
        <div class="area-intro__content">
            <span class="section-label">Local Builders</span>
            <h2 class="section-title section-title--gold" id="area-intro-title">Construction Services in <span>$name</span></h2>
            <p>$desc</p>
            <p>$extra</p>
            <div class="area-intro__highlights">
                <div class="area-intro__highlight"><span>📍</span> Based near $name ($pc)</div>
                <div class="area-intro__highlight"><span>⭐</span> Over 20 years experience</div>
                <div class="area-intro__highlight"><span>📋</span> Free surveys &amp; quotes</div>
                <div class="area-intro__highlight"><span>🛡</span> Fully insured &amp; guaranteed</div>
            </div>
            <a href="request-quote.html" class="btn btn--primary">Get a Free Quote in $name</a>
        </div>
        <div class="area-intro__image-wrap"><img src="images/commercial.png" alt="Construction project in $name, $pc" width="600" height="480" loading="lazy"></div>
    </div></div>
</section>

<!-- SERVICES -->
<section class="area-services section section--alt" id="area-services" aria-labelledby="area-svc-title">
    <div class="container">
        <div class="section-header">
            <span class="section-label">Our Services in $name</span>
            <h2 class="section-title section-title--gold" id="area-svc-title">What We <span>Build</span></h2>
            <hr class="divider">
        </div>
        <div class="area-services__grid">
            <div class="area-services__card"><span class="area-services__icon">🏠</span><h3>New Builds</h3><p>Bespoke new build homes on private plots, from foundation to completion.</p></div>
            <div class="area-services__card"><span class="area-services__icon">🔨</span><h3>Extensions</h3><p>Single &amp; double storey extensions, side returns, and wraparound extensions.</p></div>
            <div class="area-services__card"><span class="area-services__icon">🏗</span><h3>Loft Conversions</h3><p>Dormer, hip-to-gable, and Velux loft conversions with en-suite bathrooms.</p></div>
            <div class="area-services__card"><span class="area-services__icon">🚗</span><h3>Garage Conversions</h3><p>Converting garages into living rooms, home offices, gyms, and bedrooms.</p></div>
            <div class="area-services__card"><span class="area-services__icon">🍳</span><h3>Kitchen Renovation</h3><p>Complete kitchen redesigns with premium units, worktops, and appliances.</p></div>
            <div class="area-services__card"><span class="area-services__icon">🚿</span><h3>Bathroom Renovation</h3><p>Luxury bathroom refits, wet rooms, and en-suite installations.</p></div>
            <div class="area-services__card"><span class="area-services__icon">🏢</span><h3>Commercial</h3><p>Office fit-outs, retail construction, warehouse builds, and commercial refurbishments.</p></div>
            <div class="area-services__card"><span class="area-services__icon">🔧</span><h3>Renovations</h3><p>Full house renovations, structural repairs, damp treatment, and property refurbishments.</p></div>
        </div>
    </div>
</section>

<!-- WHY CHOOSE US -->
<section class="area-why section" id="why-us" aria-labelledby="area-why-title">
    <div class="container">
        <div class="section-header">
            <span class="section-label">Why Cheadle Construction</span>
            <h2 class="section-title section-title--gold" id="area-why-title">Why Choose <span>Us</span></h2>
            <hr class="divider">
        </div>
        <div class="area-why__grid">
            <div class="area-why__card"><span>🏆</span><h3>20+ Years Experience</h3><p>Established, trusted builders with hundreds of completed projects across the North West.</p></div>
            <div class="area-why__card"><span>📐</span><h3>Design to Completion</h3><p>We handle everything — architectural plans, planning applications, building control, and build.</p></div>
            <div class="area-why__card"><span>💰</span><h3>Fixed-Price Quotes</h3><p>Transparent, detailed quotations with no hidden costs. The price we quote is the price you pay.</p></div>
            <div class="area-why__card"><span>👷</span><h3>Qualified Tradesmen</h3><p>Fully qualified, experienced tradesmen delivering outstanding craftsmanship on every project.</p></div>
            <div class="area-why__card"><span>🛡</span><h3>Fully Insured</h3><p>Comprehensive public liability and employers liability insurance for your peace of mind.</p></div>
            <div class="area-why__card"><span>📞</span><h3>Responsive Service</h3><p>Quick response times, clear communication, and a dedicated project manager on every job.</p></div>
        </div>
    </div>
</section>

<!-- NEARBY AREAS -->
<section class="area-nearby section section--alt" id="nearby-areas" aria-labelledby="area-nearby-title">
    <div class="container">
        <div class="section-header">
            <span class="section-label">We Also Serve</span>
            <h2 class="section-title section-title--gold" id="area-nearby-title">Nearby <span>Areas</span></h2>
            <hr class="divider">
        </div>
        <div class="area-nearby__grid">
$nearbyLinks
        </div>
    </div>
</section>

<!-- CTA -->
<section class="cta-banner"><div class="cta-banner__bg"></div><div class="container"><div class="cta-banner__content">
<span class="section-label">Start Your Project</span>
<h2 class="cta-banner__title">Ready to Build in <span>$name</span>?</h2>
<p class="cta-banner__text">Get in touch today for a free, no-obligation consultation and quotation for your project in $name.</p>
<div class="btn-group"><a href="request-quote.html" class="btn btn--primary">Request a Free Quote</a><a href="tel:01612189616" class="btn btn--secondary">Call 0161 218 9616</a></div>
</div></div></section>
</main>
$footer
</body></html>
"@

    $filePath = "c:\Users\ss\Desktop\cheadle\builders-$slug.html"
    [System.IO.File]::WriteAllText($filePath, $html, [System.Text.Encoding]::UTF8)
    Write-Host "Created: builders-$slug.html"
}

Write-Host "`nAll 13 area pages generated!"
