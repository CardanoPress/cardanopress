import { f as s } from "./actions-CJB7nn4J.js";
import { a, c as t, r as i } from "./util-CjQW_pXR.js";
window.addEventListener("alpine:init", () => {
  Alpine.data("poolDelegation", () => ({ isProcessing: false, transactionHash: "", async handleDelegation() {
    this.transactionHash = "", a({ id: "delegation", type: "info", text: t.delegating }), this.isProcessing = true;
    const e = await s();
    i("delegation"), e.success ? (this.transactionHash = e.data.hash, a({ type: "info", text: e.data.message })) : a({ type: "warning", text: e.data }), this.isProcessing = false;
  } }));
});
