# RSN ONE / Global Select evergreen design kit

**Image/video agents:** [Claude coordinator command](prompts/05_IMAGE_VIDEO_AGENT_COMMAND.md) · [Batch-one product prompts](prompts/06_BATCH_ONE_PRODUCT_PROMPTS.md) · [Agent definitions](claude-agents/) · [Locked shortlist](assets/locked-shortlist.json). Batch one prepares desktop hero, mobile hero, Beauty and Wellness around the user's actual product references; the video agent preserves the existing homepage clip.

An original, separate design handoff for Claude. The user's latest brief is the authority: household retail in Nepal and India, open browsing, membership required to order. There is no festival campaign in this kit.

**Start here:** [Claude master prompt](prompts/01_CLAUDE_MASTER_PROMPT.md) · [Three directions](DIRECTIONS.md) · [Final proposed copy](COPY.md) · [Image and film prompts](prompts/02_MEDIA_PROMPTS.md) · [Reference access record](reference/RESEARCH.md) · [Integration contract](INTEGRATION.md).

**Full production handoff:** [Complete Claude build and media plan](prompts/03_COMPLETE_PRODUCTION_PLAN.md) · [Ready-to-generate photo/video prompts](prompts/04_READY_TO_GENERATE_ASSETS.md) · [Asset manifest](assets/asset-plan.json). This update preserves the user's preferred existing homepage video in its current placement and prioritises eight editorial images plus actual catalogue packshots; a new film is optional.

**See the designs:** [Editorial desktop](evidence/editorial-overview.png) · [Editorial mobile](evidence/editorial-mobile-overview.png) · [Storefront](evidence/storefront-overview.png) · [Journal](evidence/journal-overview.png) · [Validation](evidence/VALIDATION.md).

## What is delivered

- One reusable React/TypeScript homepage with three art directions: Editorial, Storefront and Journal.
- Scoped CSS using the supplied cream, espresso and brass identity, with Fraunces/Inter typography and responsive layouts.
- A standalone review app with four illustrative category/product fixtures. This is deliberately separate from the site's source and business logic.
- Desktop/mobile previews and browser validation under evidence/ after the review run.
- A concrete Claude implementation prompt and production-media briefs.

The recommended starting point is **01 Editorial**. Compare 02 Storefront if reaching products sooner is the priority. 03 Journal needs the strongest authentic photography; its mobile version puts the product proposition before the image.

## Run the review

Use the existing repository's installed Node/Next/React dependencies. From the repository root:

    npm ci --cache /workspace/.npm-cache
    node node_modules/next/dist/bin/next dev design-kit/preview-app -p 3062

Build only the independent preview:

    node node_modules/next/dist/bin/next build design-kit/preview-app

No database, API key, external font service, authentication or payment service is needed for this review. The preview intentionally has noindex metadata. Do not copy its fixture data, generic destination routes or preview configuration into production.

## What is and is not research

Live fetches of Aesop, TOAST, MUJI, Pinterest, Behance, rsnone.com and /globalselect failed at this cloud's proxy. They were not visually inspected, scraped or copied. Their suggested roles come from the supplied brief; the code and illustrations are original. See the exact access record rather than treating named brands as a completed contemporary audit.

Claude's prompt starts with live inspection in an environment that can access the sites. It asks for specific project URLs and inspected desktop/mobile examples, not a Pinterest search page presented as evidence.

## Production boundary

The main application's src/, catalogue, authentication, membership, prices and purchasing rules are unchanged by this kit. The earlier B2B sourcing prototype was set aside outside the checkout after the consumer-retail brief arrived.

The preview objects and product names are **layout fixtures**, not real merchandise, brand partnerships, origin claims, stock, prices or sourcing proof. Product photographs, real catalogue records and approved policies must be supplied by the actual application. Fees, lifetime terms, invitation restrictions, scarcity, invented benefits and false customer evidence are absent.

The complete user input is preserved in BRIEF_ORIGINAL.txt with LF line endings.
