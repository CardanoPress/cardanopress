import{Value as a,BigNum as m,min_ada_required as U,Assets as O,AssetName as D,MultiAsset as F,ScriptHash as X,TransactionUnspentOutput as C,__tla as R}from"./cardano_serialization_lib-DZgxyT4u.js";let S,H=Promise.all([(()=>{try{return R}catch{}})()]).then(async()=>{let g=null;S={setProtocolParameters:(t,e,s,i)=>{g={minUTxO:t,minFeeA:e,minFeeB:s,maxTxSize:i}},randomImprove:async(t,e,s)=>{if(!g)throw new Error("Protocol parameters not set. Use setProtocolParameters().");const i=BigInt(e.len())*BigInt(g.minUTxO);let n={selection:[],remaining:[...t],subset:[],amount:a.new(m.from_str("0"))},r=N(e),o=P(r);for(let u=0;u<o.length;u++)b(n,o[u]),n=I(n,o[u],s,i);o=y(o);for(let u=0;u<o.length;u++){b(n,o[u]);let l={};l.ideal=a.new(m.from_str("0")).checked_add(o[u]).checked_add(o[u]),l.maximum=a.new(m.from_str("0")).checked_add(l.ideal).checked_add(o[u]),B(n,o[u],s-n.selection.length,l)}if(n.remaining.length>0){const u=n.amount.checked_sub(r);let l=a.new(U(u,m.from_str(g.minUTxO))),f=BigInt(g.minFeeA)*BigInt(g.maxTxSize)+BigInt(g.minFeeB);if(f=a.new(m.from_str(f.toString())),l=l.checked_add(f),c(u,l)<0){const T=l.checked_sub(a.new(u.coin())).checked_add(a.new(n.amount.coin()));b(n,T),n=I(n,T,s,i)}}return{input:n.selection,output:e,remaining:n.remaining,amount:n.amount,change:n.amount.checked_sub(r)}}};function I(t,e,s,i){try{t=w(A(t),e,s-t.selection.length,i)}catch(n){if(n.message==="INPUT_LIMIT_EXCEEDED")t=x(t,e,i);else throw n}return t}function w(t,e,s,i){let n=t.subset.length;if(h(e,t.amount,i,n))return t.remaining=[...t.remaining,...t.subset],t.subset=[],t;if(s<=0)throw new Error("INPUT_LIMIT_EXCEEDED");if(n<=0)throw h(e,t.amount,0,0)?new Error("MIN_UTXO_ERROR"):new Error("INPUTS_EXHAUSTED");let r=t.subset.splice(Math.floor(Math.random()*n),1).pop();return t.selection.push(r),t.amount=d(r.output().amount(),t.amount),w(t,e,s-1,i)}function x(t,e,s){t.subset=t.subset.sort((i,n)=>Number(k(e,n.output().amount())-k(e,i.output().amount())));do{if(t.subset.length<=0)throw h(e,t.amount,0,0)?new Error("MIN_UTXO_ERROR"):new Error("INPUTS_EXHAUSTED");let i=t.subset.splice(0,1).pop();t.selection.push(i),t.amount=d(i.output().amount(),t.amount)}while(!h(e,t.amount,s,t.subset.length-1));return t.remaining=[...t.remaining,...t.subset],t.subset=[],t}function B(t,e,s,i){let n=t.subset.length;if(c(t.amount,i.ideal)>=0||n<=0||s<=0){t.remaining=[...t.remaining,...t.subset],t.subset=[];return}const r=t.subset.splice(Math.floor(Math.random()*n),1).pop(),o=a.new(m.from_str("0")).checked_add(r.output().amount()).checked_add(e);return E(_(i.ideal)-_(o))<E(_(i.ideal)-_(e))&&c(o,i.maximum)<=0?(t.selection.push(r),t.amount=d(r.output().amount(),t.amount),s--):t.remaining.push(r),B(t,e,s,i)}function N(t){let e=a.new(m.from_str("0"));for(let s=0;s<t.len();s++)e=d(t.get(s).amount(),e);return e}function d(t,e){return e.checked_add(t)}function P(t){let e=[];if(t.multiasset()){let s=t.multiasset();for(let i=0;i<s.keys().len();i++){let n=s.keys().get(i);for(let r=0;r<s.get(n).keys().len();r++){let o=O.new(),u=s.get(n).keys().get(r);o.insert(D.from_bytes(u.to_bytes()),m.from_bytes(s.get(n).get(u).to_bytes()));let l=F.new();l.insert(X.from_bytes(n.to_bytes()),o);let f=a.new(m.from_str("0"));f.set_multiasset(l),e.push(f)}}}return e=y(e,"DESC"),e.push(a.new(m.from_bytes(t.coin().to_bytes()))),e}function y(t,e="ASC"){return t.sort((s,i)=>{let n=BigInt(e==="DESC"?-1:1);return Number((_(s)-_(i))*n)})}function _(t){let e=BigInt(0),s=BigInt(t.coin().to_str());if(s>0)e=s;else if(t.multiasset()&&t.multiasset().len()>0){let i=t.multiasset().keys().get(0),n=t.multiasset().get(i).keys().get(0);e=BigInt(t.multiasset().get(i).get(n).to_str())}return e}function k(t,e){let s=BigInt(0);if(BigInt(t.coin().to_str())>0)s=BigInt(e.coin().to_str());else if(t.multiasset()&&e.multiasset()&&t.multiasset().len()>0&&e.multiasset().len()>0){let i=t.multiasset().keys().get(0),n=t.multiasset().get(i).keys().get(0);s=BigInt(e.multiasset().get(i).get(n).to_str())}return s}function b(t,e){if(BigInt(e.coin().to_str())<BigInt(1)){let s=[],i=[];for(let n=0;n<t.remaining.length;n++)c(t.remaining[n].output().amount(),e)!==void 0?s.push(t.remaining[n]):i.push(t.remaining[n]);t.subset=s,t.remaining=i}else t.subset=t.remaining.splice(0,t.remaining.length)}function h(t,e,s,i){let n=t;if(s&&BigInt(t.coin().to_str())>0){let r=a.new(U(e,m.from_str(s.toString())));if(c(e,r)<0)return!1;if(c(t,r)<0&&(n=r.checked_add(a.new(m.from_str(g.minUTxO)))),i>0){let o=BigInt(g.minFeeA)*BigInt(g.maxTxSize)+BigInt(g.minFeeB);o=a.new(m.from_str(o.toString())),n=n.checked_add(o)}}return c(e,n)>=0}function A(t){return{selection:p(t.selection),remaining:p(t.remaining),subset:p(t.subset),amount:M(t.amount)}}const p=t=>t.map(e=>C.from_bytes(e.to_bytes())),M=t=>a.from_bytes(t.to_bytes());function E(t){return t<0?t*BigInt(-1):t}function c(t,e){let s=BigInt(t.coin().to_str()),i=BigInt(e.coin().to_str());if(e.multiasset()){let n=e.multiasset().keys().get(0),r=e.multiasset().get(n).keys().get(0);if(t.multiasset()&&t.multiasset().len())if(t.multiasset().get(n)&&t.multiasset().get(n).get(r))s=BigInt(t.multiasset().get(n).get(r).to_str()),i=BigInt(e.multiasset().get(n).get(r).to_str());else return;else return}return s>=i?s===i?0:1:-1}});export{H as __tla,S as default};