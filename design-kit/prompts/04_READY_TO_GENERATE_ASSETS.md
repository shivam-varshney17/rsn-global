# Ready-to-generate asset prompts

Use this alongside 03_COMPLETE_PRODUCTION_PLAN.md and the machine-readable ../assets/asset-plan.json. The user will generate assets in their chosen models; these prompts are model-agnostic. They assume actual approved product images are uploaded as references. Replace bracketed inputs before generation. Never use an invented product as a final catalogue item.

## A. Shared direction to prepend to each scene prompt

Create original editorial retail imagery for RSN ONE / Global Select. The audience is households in Nepal and India. Warm cream #F1E9DA, espresso #1F1712 and restrained brass #C9A25A guide the environment; the actual products retain their own exact colours. The mood is knowledgeable, welcoming and desirable for everyday shopping. Soft directional daylight from the upper left, readable objects, believable relative scale, natural surfaces and controlled shadows. Keep the same light and surface family across the image set. No festive decoration, invented logos, added slogans or false product information. Use the uploaded product references exactly. If exact label reproduction fails, preserve the original product photography and composite it into the generated environment instead.

This shared direction is an art brief, not a claim that an international product is manufactured by RSN ONE.

## H01 / Desktop hero

**Inputs:** [3–5 real product reference images], [their real product IDs and dimensions], [the actual hero frame].

**Prompt:** Arrange these exact products as one considered everyday collection on a warm cream stone surface. Use one pale wood plane and a small natural linen detail to create depth without clutter. Make one product the visual anchor, a second product the counterweight and the smaller objects a deliberate supporting rhythm. Separate silhouettes so labels and shapes remain understandable at website size. Keep the grouping in the central two-thirds with balanced negative space. A beauty/care item and a genuinely available home/everyday item should both remain visible if they belong to the real assortment. Use the real relative heights from the references. Camera at a three-quarter tabletop angle with a natural product-photography perspective, enough depth of field for the important packaging to stay readable. The picture sits beside the headline, so no text or blank fake label is needed. Produce 4:3 at 3200×2400 or larger.

**Second composition to test:** use the same exact goods and light, but put the lowest object at the front left and shift the vertical anchor right. Change the arrangement, not the merchandise or lighting style. Compare the two inside the page design.

**Output:** h01-hero-desktop-master.png plus efficient web derivatives.

## H02 / Mobile hero

**Inputs:** the approved H01 and its original product references.

**Prompt:** Recompose the approved RSN ONE product selection for a portrait 4:5 frame. Preserve the exact product identities, dimensions, colours and approved light direction. Keep a confident central grouping: tall object behind, useful everyday object forward, smaller item as a quiet counterweight. Reduce empty horizontal gaps so each important product reads on a 390px screen. Protect the main labels and silhouettes within the central 70% of the frame; don't shrink the desktop arrangement until everything becomes miniature. No generated copy. Keep the same surface and household mood as H01. Output 1600×2000 or larger.

**Output:** h02-hero-mobile-master.png. Test a real mobile crop before making more variants.

## C01 / Beauty & Care

**Inputs:** [actual available care-product reference images].

**Prompt:** Create a simple image-led category composition from these exact products. A small, readable group on the approved cream surface, the leading package upright, a second real item slightly behind and a small linen edge for material context. Soft side light and a gentle grounding shadow. Make the category understandable as a thumbnail. Preserve labels, caps, seals, volumes and colours. Nothing should imply a clinical result or show an unverified before/after. Leave category naming to the website. Square 1600×1600.

**Output:** c01-beauty-care-master.png.

## C02 / Health & Wellness

**Inputs:** [actual available wellness-product reference images and permitted identity/claims].

**Prompt:** Make a calm retail category image using these exact eligible products, on the same surface and in the same light as C01. Use a stable low grouping with one clear package face and enough breathing room to distinguish each actual item. The visual message is thoughtful everyday selection. Keep the real packaging intact. Do not add medical equipment, a clinician, certification marks, health-result graphics or ingredients absent from the references. Square 1600×1600. The website supplies the category title.

**Output:** c02-wellness-master.png. If there is no useful available assortment, omit this tile rather than inventing goods.

## C03 / Home & Living

**Inputs:** [actual home/everyday product references].

**Prompt:** Show these exact objects in a restrained, useful tabletop arrangement with the same light and cream/pale-wood material language as the other category images. Let one recognisable everyday use guide the composition: a real cup on a small tray, an actual organiser holding its appropriate objects, or another use supported by the references. Keep the supplied products central and at truthful relative scale. Avoid a staged hotel interior or a pile of decorative props. Square 1600×1600. Preserve material finish and colour.

**Output:** c03-home-living-master.png.

## C04 / Gifts

**Inputs:** [real gift-suitable product references], [approved presentation materials if sold or clearly contextual].

**Prompt:** Compose these exact products as a thoughtful everyday gift. Use one restrained unbranded paper wrap or reusable material detail as context, with one real product visibly identifiable. Keep the same cream surface, light direction and natural shadows as the category family. The feeling is considered and personal, without a festive motif, artificial luxury, abundance display or a suggestion that unsupported gift packaging is included in an order. Preserve actual packaging. Square 1600×1600; no generated category text.

**Output:** c04-gifts-master.png.

## E01 / Everyday editorial scene

**Inputs:** [approved actual products], [relevant real-use reference if available].

**Prompt:** Create a believable quiet household moment around these actual products. Use a small dressing area, open shelf or everyday table rather than an elaborate luxury residence. Soft late-morning light, a natural wood or cream surface, one tactile fabric and a practical arrangement. Show how one genuine everyday object belongs in the space. A hand can enter only for a plausible action supported by the actual product; identity and product use remain accurate. Keep the products the reason for the picture. Make the setting contemporary and grounded, without national stereotypes or religious/seasonal decoration. Landscape 3:2 at 3000×2000; also supply a composition-safe portrait crop if the story section needs it. This is illustrative lifestyle advertising, not a customer testimonial.

**Output:** e01-everyday-scene-master.png.

## E02 / A detail worth seeing

**Inputs:** [one real product and an informative verified material/packaging detail].

**Prompt:** Make an editorial close-up of the exact supplied detail: the real material texture, package structure, product surface or useful component. Use the approved soft light with enough contrast to see what the detail is. Retain the actual geometry, finish, colour and visible information. The image should help someone inspect a real object, not imply an unverified quality test or product benefit. Keep the surrounding frame restrained and warm. Landscape 4:3 at 2400×1800. No fabricated label text or added claim.

**Output:** e02-product-detail-master.png.

## P01–P06 / Clean catalogue packshots

**Input per item:** the approved original front image, alternate view, real dimensions and product ID.

**Prompt:** Retouch or composite the uploaded product into a consistent warm neutral catalogue setting. Keep the original product silhouette, print, seals, quantity, colours, cap/closure and all customer-relevant information unchanged. Use a clean front or slight three-quarter view, a soft grounding shadow and matching scale within the image family. Remove unrelated background clutter without deleting parts of the product. If the model alters packaging information, use the original cut-out rather than generated text. Output a high-resolution master with suitable clean background or alpha, plus the actual website's product-card crop.

Reuse an existing good packshot instead of generating it again. Name each result with its **real product ID**, not a made-up retail name. The manifest's six slots are placeholders for four to eight real featured records.

## EV01 / Existing preferred film — keep, inspect, adapt

The user confirmed that the preferred video is already on the homepage. Keep its current homepage placement. Do not generate a replacement from this prompt. Identify and watch that actual clip, preserve its source and original file, then adapt the surrounding layout. Any proposed relocation is a creative decision to discuss, not a default implementation change.

**Poster selection instruction:** Choose a sharp, useful real frame that represents the clip and is readable before playback. If the clip shows actual products, favour an identifiable product grouping. Export a desktop poster and an intentional mobile crop where the footage supports it. Do not create a poster promising content the video does not contain.

**Editing instruction:** Preserve the strongest existing moment. Trim dead time only where it improves the specific website use. Keep original aspect ratio/crop options when a vertical reframing would cut out the important object or person. Informative speech remains available with controls/captions. No claim of a seamless loop until the actual start/end frames are inspected.

## NV01 / Optional product microfilm

Generate only if EV01 lacks a specific useful product-led role. Start from the approved H01/H02 and exact product references. Produce separate short shots, then edit them; this gives more control than one long unconstrained generation.

**Shot 1, 0–3 seconds:** Fixed-camera still-life shot of the approved actual product grouping. Soft daylight changes very gently across the surface. Objects keep exact shapes, printed information and relative scale. No camera orbit or label morphing. A clear first frame works as a static image.

**Shot 2, 3–6 seconds:** Cut to the approved informative product/material detail from E02. A tiny camera move or natural light movement reveals texture. Geometry and all product markings remain fixed. No invented functionality, transformation or certification.

**Shot 3, 6–9 seconds:** A natural hand places one actual everyday object in its plausible household setting, or the selection settles back into the approved final composition. The action is physically simple. No objects appear or disappear. End with a stable frame; use a designed cut rather than pretending any two frames will loop.

**Overall output:** 8–10 second landscape master and a separately framed mobile version if useful. Neutral room sound or silence; no essential spoken message unless deliberately written, recorded and captioned. The website still works with its poster alone.

## Final review before integration

Compare every output to its source products at full size and inside the actual page. Check identities, packaging, colours, proportions, hands, perspective, reflections and typography. Look at mobile thumbnails and the real hero crop. Confirm the media's rights and purpose. Retain the final approved master and useful metadata. A beautiful scene with a false package is not a usable retail asset.
