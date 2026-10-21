import {EvergreenHome,type DesignDirection,type RetailHomeProps} from "../../react/EvergreenHome";

const DATA=[
 {id:"care-a",brand:"Catalogue brand",name:"Daily care — layout example",category:"beauty",art:"care"},
 {id:"wellbeing-a",brand:"Catalogue brand",name:"Wellbeing — layout example",category:"wellness",art:"wellbeing"},
 {id:"home-a",brand:"Catalogue brand",name:"Home essential — layout example",category:"home",art:"home"},
 {id:"gift-a",brand:"Catalogue brand",name:"Everyday gift — layout example",category:"gifts",art:"gifts"},
];
export default async function Preview({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
 const q=await searchParams,market=q.market==="nepal"?"nepal":"india",country=market==="nepal"?"Nepal":"India",currency=market==="nepal"?"NPR":"INR";
 const direction:DesignDirection=q.design==="storefront"||q.design==="journal"?q.design:"editorial";
 const url=(patch:Record<string,string>={})=>"/?"+new URLSearchParams({design:direction,market,...patch});
 const query=typeof q.q==="string"?q.q:"",category=typeof q.category==="string"?q.category:"";
 const products=DATA.filter(x=>(!category||category===x.category)&&(!query||`${x.name} ${x.category}`.toLowerCase().includes(query.toLowerCase())));
 const props:RetailHomeProps={direction,market:{name:country,currency,alternatives:[{name:"India",currency:"INR",href:url({market:"india"})},{name:"Nepal",currency:"NPR",href:url({market:"nepal"})}]},links:{home:url(),globalSelect:url()+"#selection",membership:"/membership",account:"/account",bag:"/bag",searchAction:"/",support:"/support",delivery:"/delivery",returns:"/returns",about:"/about",sourcing:"/sourcing",suppliers:"/suppliers",legal:"/legal"},isMember:false,bagCount:0,searchQuery:query,searchFields:{market,design:direction},
 categories:[{id:"beauty",name:"Beauty & Care",art:"care"},{id:"wellness",name:"Health & Wellness",art:"wellbeing"},{id:"home",name:"Home & Living",art:"home"},{id:"gifts",name:"Gifts",art:"gifts"}].map(x=>({id:x.id,name:x.name,href:url({category:x.id})+"#selection",image:{src:`/${x.art}.svg`,alt:`Illustrative ${x.name} category composition`}})),
 products:products.map(x=>({id:x.id,brand:x.brand,name:x.name,href:`/product?id=${x.id}`,image:{src:`/${x.art}.svg`,alt:"Original illustration for layout review; replace with actual product photography"},priceState:"unavailable"})),heroImage:{src:"/concept-still-life.svg",alt:"Original concept illustration of unbranded care, wellbeing and home objects; not actual catalogue stock"},storyImage:{src:"/home.svg",alt:"Illustrative materials composition; replace with an authentic selection or service photograph"},selectionNote:"Design preview: examples are not actual products or availability. Production prices and membership access come from the existing catalogue."};
 return <><div className="review-bar"><span>DESIGN REVIEW · ORIGINAL ILLUSTRATIONS · CATALOGUE DATA IS A PLACEHOLDER</span><nav aria-label="Compare design directions"><a href={url({design:"editorial"})}>01 Editorial</a><a href={url({design:"storefront"})}>02 Storefront</a><a href={url({design:"journal"})}>03 Journal</a></nav></div><EvergreenHome {...props}/></>;
}
