import type {Metadata} from "next";
import "../../react/evergreen.css";
import "./review.css";
export const metadata:Metadata={title:"RSN ONE / Evergreen design review",robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
