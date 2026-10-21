# Validation / 22 October 2026

Scope: the independent design review app and reusable homepage component. This does not validate the deployed RSN website, real catalogue, authentication, membership purchase or checkout.

| Check | Result |
|---|---|
| Independent production build | Passed |
| Independent TypeScript validation | Passed during Next build; no ignoreBuildErrors override |
| Component contract checks | 4 passed, zero skipped |
| Production-browser checks | 15 passed |
| Targeted ESLint | Zero errors; one advisory about using the host's image optimisation instead of a plain img element |
| Main application preservation | src/, package files and main configuration have no diff |
| Reference websites | Proxy blocked; not visually inspected |
| Fonts | Official Google Fonts repository downloads succeeded; licenses retained |

The image advisory is left explicit: the reusable presentation currently uses ordinary dimensioned images. During integration, retain or adapt the actual site's image pipeline and approved remote-image configuration. Preview illustrations are local SVGs. The production media brief requests efficient real photographic derivatives and stable crops.

## Browser evidence

[Results](browser-results.json) · [Editorial desktop](editorial-desktop.png) · [Editorial mobile](editorial-mobile.png) · [Storefront desktop](storefront-desktop.png) · [Journal desktop](journal-desktop.png)

The browser run uses the built preview, not Next's development overlay. It checks all three directions, local fonts/assets, initial HTML, noindex review metadata, country view changes, search context, empty results, category routes, integration boundaries, keyboard FAQs, mobile navigation, two-column mobile product grids, horizontal overflow and runtime errors. The fixtures are clearly identified as illustrative.

Component checks exercise price-state presentation, public guest prices, empty catalogue behavior, search context and host-route preservation. They are not a substitute for server-side entitlement tests in the actual consumer application.

## Reproduce

From the repository root, with its dependencies installed:

    node --test design-kit/tools/contracts.test.mjs
    node node_modules/next/dist/bin/next build design-kit/preview-app
    node node_modules/next/dist/bin/next start design-kit/preview-app -p 3063 -H 127.0.0.1

Then, in another terminal with Playwright available:

    CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium node design-kit/tools/browser-review.mjs

If Playwright is installed outside the repository, set PLAYWRIGHT_MODULE to its actual importable entry point. The validation here used the already installed workspace copy; no new dependency was added to the main application. REVIEW_BASE_URL can select the preview's configured local test port. These local addresses are for internal testing, not published previews.

No external publishing, account creation, membership, order, paid research run or customer communication occurred.
