# Integration contract for Claude

## Find the actual consumer application first

The available rsn-global checkout has a wholesale demo and does not contain the currently deployed Global Select page. The uploaded brief describes a household-retail offer. Before integration, identify the real homepage, collection/product routes, authentication provider, membership decision, server-side price visibility, cart, supported-market state and delivery/returns sources in the actual site project. A matching domain name is not evidence that this older checkout contains the production consumer backend.

## Copy the presentation, preserve the business rules

Import EvergreenHome from design-kit/react/EvergreenHome.tsx and its scoped evergreen.css. Do not copy the independent preview app, illustrative catalogue, placeholder destination routes or noindex configuration into production.

Build a server-side adapter from existing authorised data to RetailHomeProps. The props are deliberately public presentation values:

| Prop | Binding |
|---|---|
| products | Actual current records, filtered by existing visibility and availability logic |
| categories | Existing categories with a useful available assortment |
| product.href | Existing canonical product route |
| product.image | Approved real product asset and useful alt text |
| product.origin | Verified display label; omit if unknown |
| product.priceState | Existing backend price-access decision |
| product.priceLabel | Already authorised formatted display price; omit private member prices for guests |
| isMember | Existing authenticated membership decision; never a query parameter or client-only flag |
| market | Supported current country and currency from the existing market provider |
| market.alternatives | Existing market-switch routes/actions; don't implement a cosmetic currency change |
| bagCount | Current cart state, if available |
| links | Actual site routes and supported search action |
| searchFields | Existing GET search context if required; the component reserves q for the query |
| logo | The actual existing RSN ONE mark as a React node, if provided |
| newsletter | Existing working component; omit when unbound |

The component has no account creation, membership, checkout, product-mutation or newsletter API. It does not decide entitlement or provide a storefront backend. It must not receive secret/raw member prices in a guest payload, even if a UI branch would hide them. Public prices can still be visible to guests if the current system allows that; membership-to-order and membership-to-view-prices are separate decisions.

Keep existing login return paths, server enforcement, payment flow, membership terms and price currency logic. Do not replace them with preview fixtures or simulated success states.

## Photography and selection evidence

Replace preview illustrations with real merchandise images before release. Preserve packaging and distinguish international brands from RSN ONE's curation. The hero should communicate the genuinely available breadth; do not add a home object solely to imply a category that is unavailable.

The selection section needs authentic evidence from the business: who selects, an actual inclusion reason, what information shoppers can inspect and the support process. The provided fallback copy makes no claim of laboratory testing, medical benefit, exclusive supply, certification or owned manufacturing.

## Release verification

1. Check the proposition with a new visitor: selected global everyday goods, open browsing, membership to order.
2. Test anonymous and actual member sessions. Verify product access, server responses and authorised price data, not only button labels.
3. Follow real category, search, product, account, bag and membership routes. Preserve the actual logged-out return journey.
4. Test both supported markets. Confirm currency, catalogue availability, delivery and returns source; don't assume all cities share coverage.
5. Check desktop and 360/390px mobile. Keep a two-column product grid and comfortable touch targets. Verify focus, menu, search and FAQs by keyboard.
6. Read full HTML without JavaScript; the proposition and product links should remain accessible. Optimise real images and retain stable dimensions.
7. Retain the host's working consent, analytics and unobtrusive concierge. Never simulate signup or assistance.
8. Run the actual project's checks and report existing failures separately. Use the existing release workflow and the user's deployment authorization.
