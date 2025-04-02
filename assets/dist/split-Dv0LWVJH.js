import { j as a, i } from "./actions-DvbpDV6r.js";
import { a as s, c as n, r } from "./util-Dqeh-Nlc.js";
window.addEventListener("alpine:init", () => {
  window.Alpine.data("splitForm", () => ({ isProcessing: false, percentage: 0, address: "", transactionHash: "", outputs: [], get parent() {
    return this;
  }, isReady(e = "") {
    return this.parent.syncedBalance && !this.isProcessing && !this.transactionHash ? e === "all" ? this.parent.isVerified && !!this.outputs.length : !!this.parent.remainingBalance && !!this.percentage && !!this.address : false;
  }, paymentAmount() {
    return ((this.parent.currentBalance - parseInt(this.parent.lovelaceValue())) * this.percentage / 100).toFixed();
  }, addOutput() {
    this.outputs.push({ address: this.address, amount: this.paymentAmount(), percentage: this.percentage }), this.parent.remainingBalance -= parseInt(this.paymentAmount()), this.address = "", this.percentage = 0;
  }, removeOutput(e) {
    this.outputs.splice(e, 1);
  }, async handleSend(e = "") {
    this.transactionHash = "", s({ id: "payment", type: "info", text: n.paying }), this.isProcessing = true;
    let t;
    e === "all" ? t = await a(this.outputs) : t = await i(this.paymentAmount(), this.address), r("payment"), t.success ? (this.transactionHash = t.data.hash, s({ type: "info", text: t.data.message })) : s({ type: "warning", text: t.data }), this.isProcessing = false;
  } }));
});
