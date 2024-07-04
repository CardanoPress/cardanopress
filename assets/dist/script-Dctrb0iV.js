import{l as f,a as m,h as b,b as v,c as C,d as P,e as W,p as A,m as E}from"./actions-CwSxVuVK.js";import{s as c,f as T,E as l,c as h,g as p,i as w,a as s,b as a,d as r,e as d,h as g,r as i,N as L,u as H,j as u,C as S,w as M}from"./util-DCAb0w2C.js";const{hexToBech32:V}=u;window.addEventListener("alpine:init",()=>{Alpine.data("cardanoPress",()=>({isAvailable:window.cardano!==void 0&&window.cardanoPress!==void 0,isConnected:!1,isProcessing:!1,showModal:!1,openDropdown:!1,connectedExtension:"",selectedHandle:"",availableWallets:[],supportedWallets:c,has(e){return this.availableWallets.includes(e)},isDisabled(e=null){return!!(!this.isAvailable||this.isProcessing||e!==null&&!this.has(e))},walletAvailable(e){return this.isAvailable&&this.has(e)},fromVespr(e){return this.has(e)&&T(e)},getWalletHandle(e){return this.selectedHandle||e},refreshWallets(){this.availableWallets=c.filter(e=>l.hasWallet(e))},async init(){if(this.refreshWallets(),this.$watch("showModal",()=>{this.refreshWallets()}),this.supportedWallets=c.filter(e=>this.$root.dataset.wallets.includes(e)),h.logged?(this.connectedExtension=p(),this.selectedHandle=this.$root.dataset.handle,this.isConnected=!!this.connectedExtension,this.isConnected&&!w()&&(s({type:"success",text:a.connected}),r(!0))):(w()&&r(!1),p()&&d("")),this.isAvailable&&this.connectedExtension==="Nami"){const e=await g();e.cardano.experimental.on("networkChange",t=>this.handleLogout(t,0)),e.cardano.experimental.on("accountChange",t=>this.handleLogout(-1,t))}},clipboardValue(e){i("clipboardValue"),window.navigator.clipboard.writeText(e).then(()=>{s({id:"clipboardValue",type:"info",text:a.clipboardCopy})})},async walletConnect(e){this.isConnected?await this.handleReconnect(e):await this.handleConnect(e)},async handleConnect(e){this.isProcessing=!0;try{const t=await l.getWallet(e);s({id:"loginConnect",type:"info",text:a.connecting}),await this.handleLogin(t)}catch(t){s({type:"error",text:t})}this.isProcessing=!1},async handleLogin(e){const t=await f(e);if(t.success){if(i("loginConnect"),s({type:"success",text:t.data.message}),d(e.type),t.data.reload)return setTimeout(()=>{window.location.reload()},500);r(!0),this.showModal=!1,this.isConnected=!0,h.logged=!0,this.connectedExtension=e.type}else s({type:"error",text:t.data})},async handleLogout(e,t){if(this.isConnected)try{const n=await g(),y=0<=e?L[e]:await n.getNetwork(),x=t!==0?V(t[0]):await n.getChangeAddress(),o=await m(y,x);if(o.success){if(s({type:"success",text:o.data.message}),o.data.reload)return r(!1),d(""),setTimeout(()=>{window.location.reload()},500)}else s({type:"error",text:o.data.message})}catch(n){s({type:"error",text:n})}},async handleReconnect(e){this.isProcessing=!0;try{const t=await l.getWallet(e);s({id:"reconnect",type:"info",text:a.reconnecting});const n=await b(t);if(i("reconnect"),n.success)return s({type:"success",text:a.reconnected}),d(t.type),setTimeout(()=>{window.location.reload()},500);s({type:"error",text:n.data})}catch(t){s({type:"error",text:t})}this.isProcessing=!1},async handleSync(){s({id:"sync",type:"info",text:a.walletSyncing}),this.isProcessing=!0;const e=await v();i("sync"),e.success?(s({type:"success",text:e.data.message}),e.data.updated&&s({type:"info",text:a.newAssetsPulled})):s({type:"error",text:e.data}),this.isProcessing=!1},async handleSave(){s({id:"save",type:"info",text:a.handleSaving}),this.isProcessing=!0;const e=await C(this.selectedHandle);i("save"),s({type:e.success?"success":"error",text:e.data}),this.isProcessing=!1}}))}),window.cardanoPress={...h,api:{...P,...H,...u},browser:{Extensions:l,supports:c},csl:S,wallet:{delegationTx:W,paymentTx:A,multisendTx:E,...M}};
