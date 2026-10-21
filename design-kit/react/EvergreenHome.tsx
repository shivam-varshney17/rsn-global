import type { ReactNode } from "react";

export type DesignDirection = "editorial" | "storefront" | "journal";
export type RetailImage = { src: string; alt: string };
export type RetailCategory = { id: string; name: string; href: string; image?: RetailImage };
export type RetailProduct = {
  id: string; brand: string; name: string; href: string; image?: RetailImage;
  origin?: string; priceLabel?: string; priceState: "visible" | "member-only" | "unavailable";
};
export type RetailLinks = {
  home: string; globalSelect: string; membership: string; account: string; bag: string;
  searchAction: string; support: string; delivery: string; returns: string;
  about?: string; sourcing?: string; suppliers?: string; legal?: string;
};
export type RetailHomeProps = {
  direction?: DesignDirection;
  market: { name: string; currency: string; alternatives: { name: string; currency: string; href: string }[] };
  links: RetailLinks; categories: RetailCategory[]; products: RetailProduct[];
  heroImage?: RetailImage; storyImage?: RetailImage; logo?: ReactNode;
  bagCount?: number; searchQuery?: string; searchFields?: Record<string,string>; isMember: boolean; newsletter?: ReactNode;
  selectionNote?: string;
};

function Arrow({small=false}:{small?:boolean}) {
  return <svg aria-hidden="true" viewBox="0 0 20 20" width={small?14:18} height={small?14:18} fill="none"><path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.3"/></svg>;
}
function Icon({kind}:{kind:"search"|"account"|"bag"}) {
  return <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35">{kind==="search"?<><circle cx="10.5" cy="10.5" r="6.8"/><path d="m16 16 5 5"/></>:kind==="account"?<><circle cx="12" cy="7" r="3.4"/><path d="M4.5 21v-2a7.5 7.5 0 0 1 15 0v2"/></>:<><path d="M5 8h14l1 13H4L5 8Z"/><path d="M8.5 9V6a3.5 3.5 0 0 1 7 0v3"/></>}</svg>;
}
function Photo({image,className="",hero=false}:{image?:RetailImage;className?:string;hero?:boolean}) {
  return image?<img className={className} src={image.src} alt={image.alt} width={hero?1600:600} height={hero?1200:720} loading={hero?"eager":"lazy"} decoding="async" fetchPriority={hero?"high":"auto"}/>:<div className={`rsn-retail-image-empty ${className}`}>Product photography</div>;
}

/** Presentation only. The host supplies authorised catalogue data and existing routes. */
export function EvergreenHome(p:RetailHomeProps) {
  const {links:l,market:m}=p;
  return <div className={`rsn-retail rsn-retail--${p.direction??"editorial"}`}>
    <a className="rsn-retail-skip" href="#retail-main">Skip to products</a>
    <div className="rsn-retail-strip"><span>GLOBAL SELECT BY RSN ONE</span><span>Browse freely. Membership is required to order.</span></div>
    <header className="rsn-retail-header"><div className="rsn-retail-shell rsn-retail-navrow">
      <a href={l.home} className="rsn-retail-logo" aria-label="RSN ONE home">{p.logo??<>RSN<span>ONE</span></>}</a>
      <nav className="rsn-retail-nav" aria-label="Shopping navigation"><a href={l.globalSelect}>Global Select</a><a href="#categories">Shop by category</a><a href={l.membership}>How membership works</a></nav>
      <div className="rsn-retail-utilities">
        <details className="rsn-retail-country"><summary>{m.name} <span>· {m.currency}</span><svg aria-hidden="true" width="9" height="9" viewBox="0 0 10 10"><path d="m2 4 3 3 3-3" fill="none" stroke="currentColor"/></svg></summary><div>{m.alternatives.map(x=><a href={x.href} key={x.name}>{x.name} · {x.currency}</a>)}</div></details>
        <a href="#retail-search" className="rsn-retail-utility" aria-label="Search products"><Icon kind="search"/><span>Search</span></a>
        <a href={l.account} className="rsn-retail-utility" aria-label="Your account"><Icon kind="account"/><span>Account</span></a>
        <a href={l.bag} className="rsn-retail-utility" aria-label={`Shopping bag${p.bagCount!==undefined?`, ${p.bagCount} items`:""}`}><Icon kind="bag"/><span>Bag{p.bagCount!==undefined?` (${p.bagCount})`:""}</span></a>
        <details className="rsn-retail-mobile-menu"><summary>Menu</summary><nav aria-label="Mobile shopping navigation"><a href={l.globalSelect}>Global Select</a><a href="#categories">Shop by category</a><a href={l.membership}>How membership works</a><a href={l.account}>Account</a></nav></details>
      </div>
    </div></header>

    <main id="retail-main" tabIndex={-1}>
      <section className="rsn-retail-shell rsn-retail-hero"><div className="rsn-retail-hero-copy"><span className="rsn-retail-eyebrow">RSN ONE · GLOBAL SELECT</span><h1>Global finds.<br/><em>For your everyday.</em></h1><p>Beauty, wellbeing, home and everyday goods from international brands. Thoughtfully selected for households in Nepal and India.</p><div className="rsn-retail-actions"><a className="rsn-retail-button" href={l.globalSelect}>Explore Global Select <Arrow/></a><a className="rsn-retail-link" href={l.membership}>How it works <Arrow small/></a></div><span className="rsn-retail-hero-note">Browse freely. Membership is required to order.</span></div><figure className="rsn-retail-hero-photo"><Photo image={p.heroImage} hero/><figcaption><span>THE EVERYDAY, SELECTED.</span><span>GLOBAL SELECT / RSN ONE</span></figcaption></figure></section>

      <section className="rsn-retail-shell rsn-retail-categories" id="categories"><div className="rsn-retail-sectionline"><h2>A good place to start.</h2><span>SHOP BY CATEGORY</span></div><div className="rsn-retail-category-grid">{p.categories.map(c=><a href={c.href} key={c.id} className="rsn-retail-category"><Photo image={c.image}/><span>{c.name}<Arrow small/></span></a>)}</div></section>

      <section className="rsn-retail-shell rsn-retail-selection" id="selection"><div className="rsn-retail-sectionheading"><div><span className="rsn-retail-eyebrow">GLOBAL SELECT</span><h2>Meet the selection.</h2></div><a href={l.globalSelect} className="rsn-retail-link">Browse the collection <Arrow small/></a></div><form action={l.searchAction} className="rsn-retail-search" id="retail-search" role="search">{Object.entries(p.searchFields??{}).filter(([key])=>key!=="q").map(([key,value])=><input type="hidden" key={key} name={key} value={value}/>)}<label htmlFor="retail-query">Looking for something?</label><div><input id="retail-query" name="q" type="search" defaultValue={p.searchQuery} placeholder="Search products, brands or categories"/><button type="submit" aria-label="Search Global Select"><Icon kind="search"/></button></div></form>
      {p.products.length?<div className="rsn-retail-products">{p.products.map(x=><article key={x.id} className="rsn-retail-product"><a href={x.href} className="rsn-retail-product-image"><Photo image={x.image}/><span>View product <Arrow small/></span></a><div className="rsn-retail-product-info"><span className="rsn-retail-brand">{x.brand}</span><h3><a href={x.href}>{x.name}</a></h3>{x.origin&&<p className="rsn-retail-origin">{x.origin}</p>}<p className="rsn-retail-price">{x.priceState==="visible"&&x.priceLabel?x.priceLabel:x.priceState==="member-only"?<a href={l.account}>Sign in to view member pricing</a>:"See product for pricing"}</p><span className="rsn-retail-order-state">{p.isMember?"Explore product details":"Membership required to order"}</span></div></article>)}</div>:<div className="rsn-retail-empty"><h3>No products in this view.</h3><p>Try another search or browse Global Select.</p><a href={l.globalSelect} className="rsn-retail-link">Browse all products <Arrow small/></a></div>}{p.selectionNote&&<p className="rsn-retail-selection-note">{p.selectionNote}</p>}</section>

      <section className="rsn-retail-membership" id="membership"><div className="rsn-retail-shell"><div><span className="rsn-retail-eyebrow">THE RSN ONE RELATIONSHIP</span><h2>Browse first.<br/><em>Join when it fits.</em></h2><p>Explore Global Select openly. When you’re ready to order, membership is the next step.</p><a className="rsn-retail-button rsn-retail-button--cream" href={l.membership}>How membership works <Arrow/></a></div><ol><li><span>01</span><div><h3>Explore freely.</h3><p>Discover products, brands and details before joining.</p></div></li><li><span>02</span><div><h3>Understand membership.</h3><p>Read the current terms and what membership includes.</p></div></li><li><span>03</span><div><h3>Order as a member.</h3><p>Use your account when you’re ready to make a purchase.</p></div></li></ol></div></section>

      <section className="rsn-retail-shell rsn-retail-story"><figure><Photo image={p.storyImage}/></figure><div><span className="rsn-retail-eyebrow">A LITTLE MORE ABOUT THE SELECTION</span><h2>The product.<br/>The reason.<br/><em>The details.</em></h2><p>A useful selection starts with the things you want to know: the brand, what the product is for, and the details that help you choose.</p><p>Meet Global Select through its products. Explore what belongs in your everyday, at your own pace.</p><a href={l.about??l.globalSelect} className="rsn-retail-link">Get to know RSN ONE <Arrow small/></a></div></section>

      <section className="rsn-retail-shell rsn-retail-questions" id="questions"><div><span className="rsn-retail-eyebrow">PRACTICAL THINGS</span><h2>A few good<br/><em>questions.</em></h2></div><div>{[
        ["Can I browse without joining?",<>Yes. Global Select is open to browse. Membership is required to order.</>],
        ["How do I order?",<>Explore a product, check its details, then use your member account to order. <a href={l.membership}>Read how membership works.</a></>],
        ["Where do you deliver?",<>Check the current delivery information for your country and location before ordering. <a href={l.delivery}>View delivery information.</a></>],
        ["Which currency will I pay in?",<>You are browsing the {m.name} view ({m.currency}). Check the confirmed price and currency in the product and checkout information.</>],
        ["How do returns work?",<>Review the applicable conditions for the product and market before buying. <a href={l.returns}>Read the returns information.</a></>],
      ].map(([q,a])=><details key={String(q)}><summary>{q}<span aria-hidden="true">+</span></summary><div>{a}</div></details>)}</div></section>

      <section className="rsn-retail-closing"><span className="rsn-retail-eyebrow">GLOBAL SELECT / RSN ONE</span><h2>Find something<br/><em>for your everyday.</em></h2><div className="rsn-retail-actions"><a className="rsn-retail-button" href={l.globalSelect}>Browse Global Select <Arrow/></a><a className="rsn-retail-link" href={l.membership}>How membership works <Arrow small/></a></div></section>
    </main>
    <footer className="rsn-retail-footer"><div className="rsn-retail-shell"><div className="rsn-retail-footer-top"><div><a href={l.home} className="rsn-retail-logo">{p.logo??<>RSN<span>ONE</span></>}</a><p>Global finds.<br/>For your everyday.</p></div><div><span className="rsn-retail-eyebrow">HERE TO HELP</span><a href={l.support}>Customer support</a><a href={l.delivery}>Delivery</a><a href={l.returns}>Returns</a><a href={l.membership}>Membership</a></div><div><span className="rsn-retail-eyebrow">RSN ONE</span>{l.about&&<a href={l.about}>About RSN ONE</a>}{l.sourcing&&<a href={l.sourcing}>Sourcing</a>}{l.suppliers&&<a href={l.suppliers}>Supplier information</a>}{l.legal&&<a href={l.legal}>Legal information</a>}</div>{p.newsletter&&<div className="rsn-retail-newsletter">{p.newsletter}</div>}</div><div className="rsn-retail-footer-bottom"><span>© RSN ONE</span><span>{m.name} · {m.currency}</span><span>GLOBAL SELECT</span></div></div></footer>
  </div>;
}
