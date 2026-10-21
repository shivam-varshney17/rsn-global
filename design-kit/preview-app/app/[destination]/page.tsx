import Link from "next/link";
export default async function IntegrationPoint({params}:{params:Promise<{destination:string}>}){
 const {destination}=await params;
 return <main className="review-page"><span>DESIGN REVIEW / INTEGRATION POINT</span><h1>{destination.replace(/-/g," ")}</h1><p>This preview demonstrates the homepage presentation. This link must connect to RSN ONE’s actual {destination} route during integration.</p><div className="review-note">Authentication, membership, product information, prices, cart, delivery and returns remain controlled by the existing application. No account, order, membership or signup is created by this preview.</div><p><Link href="/">Return to the design review</Link></p></main>;
}
