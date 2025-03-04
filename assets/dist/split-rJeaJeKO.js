import { j as a, i } from "./actions-CWQISwy3.js";
import { a as e, c as n, r } from "./util-DkhQt4IU.js";
window.addEventListener("alpine:init", () => {
  Alpine.data("splitForm", () => ({ isProcessing: false, percentage: 0, address: "", transactionHash: "", outputs: [], isReady(s = "") {
    return this.syncedBalance && !this.isProcessing && !this.transactionHash ? s === "all" ? this.isVerified && this.outputs.length : this.remainingBalance && this.percentage && this.address : false;
  }, paymentAmount() {
    return ((this.currentBalance - parseInt(this.lovelaceValue())) * this.percentage / 100).toFixed();
  }, addOutput() {
    this.outputs.push({ address: this.address, amount: this.paymentAmount(), percentage: this.percentage }), this.remainingBalance -= this.paymentAmount(), this.address = "", this.percentage = 0;
  }, removeOutput(s) {
    this.outputs.splice(s, 1);
  }, async handleSend(s = "") {
    this.transactionHash = "", e({ id: "payment", type: "info", text: n.paying }), this.isProcessing = true;
    let t;
    s === "all" ? t = await a(this.outputs) : t = await i(this.paymentAmount(), this.address), r("payment"), t.success ? (this.transactionHash = t.data.hash, e({ type: "info", text: t.data.message })) : e({ type: "warning", text: t.data }), this.isProcessing = false;
  } }));
});
