import { h as s } from "./actions-1q3OfuLA.js";
import { b as a, d as t, r as i } from "./util-Bhdwjmsx.js";
window.addEventListener("alpine:init", () => {
  window.Alpine.data("poolDelegation", () => ({ isProcessing: false, transactionHash: "", async handleDelegation() {
    this.transactionHash = "", a({ id: "delegation", type: "info", text: t.delegating }), this.isProcessing = true;
    const e = await s();
    i("delegation"), e.success ? (this.transactionHash = e.data.hash, a({ type: "info", text: e.data.message })) : a({ type: "warning", text: e.data }), this.isProcessing = false;
  } }));
});
