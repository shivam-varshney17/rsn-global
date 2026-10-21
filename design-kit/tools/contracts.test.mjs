import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import Module from "node:module";
import ts from "typescript";
import React from "react";
import {renderToStaticMarkup} from "react-dom/server";

const file=fileURLToPath(new URL("../react/EvergreenHome.tsx",import.meta.url));
const compiled=ts.transpileModule(readFileSync(file,"utf8"),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2017}}).outputText;
const m=new Module(file);m.filename=file;m.paths=Module._nodeModulePaths(path.dirname(file));m._compile(compiled,file);
const Component=m.exports.EvergreenHome;
const links=Object.fromEntries(["home","globalSelect","membership","account","bag","searchAction","support","delivery","returns"].map(k=>[k,"/"+k]));
const fixture=()=>({market:{name:"Nepal",currency:"NPR",alternatives:[]},links,isMember:false,categories:[],products:[]});
const render=p=>renderToStaticMarkup(React.createElement(Component,p));

test("member-only values cannot become display prices in the presentation",()=>{
 const p=fixture();p.products=[{id:"one",brand:"Actual brand",name:"Actual product",href:"/product/one",priceState:"member-only",priceLabel:"PRIVATE_SECRET_PRICE_9841"}];
 const html=render(p);assert.ok(!html.includes("PRIVATE_SECRET_PRICE_9841"));assert.ok(html.includes("Sign in to view member pricing"));assert.ok(html.includes('href="/account"'));
});
test("public pricing remains possible for guests and empty data creates no fake stock",()=>{
 const p=fixture();p.products=[{id:"one",brand:"Actual brand",name:"Actual product",href:"/product/one",priceState:"visible",priceLabel:"NPR 1234"}];
 assert.ok(render(p).includes("NPR 1234"));assert.ok(render(fixture()).includes("No products in this view."));
});
test("search preserves caller-supplied context without duplicating its query input",()=>{
 const p=fixture();p.searchFields={market:"nepal",design:"editorial",q:"should-not-be-a-hidden-query"};
 const html=render(p);assert.ok(html.includes('name="market" value="nepal"'));assert.ok(!html.includes("should-not-be-a-hidden-query"));assert.equal((html.match(/name="q"/g)||[]).length,1);
});
test("consumer copy and host routes survive rendering without creating purchase controls",()=>{
 const html=render(fixture());assert.ok(html.includes("Membership is required to order."));assert.ok(html.includes('href="/membership"'));assert.ok(html.includes('href="/bag"'));assert.ok(!/add to cart|apply for procurement|lifetime membership|festival countdown/i.test(html));
});
