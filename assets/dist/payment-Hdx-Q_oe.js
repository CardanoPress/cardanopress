import { a as t, c as i, r, g as o, l as c, m as d } from "./util-CjQW_pXR.js";
import { g as n, i as l } from "./actions-CJB7nn4J.js";
window.addEventListener("alpine:init", () => {
  Alpine.data("paymentForm", () => ({ isVerified: false, isProcessing: false, payAmount: 1, quantity: 1, currentBalance: 0, remainingBalance: 0, transactionHash: "", showAddress: false, paymentAddress: "", recaptchaKey: "", syncedBalance: false, async init() {
    if (this.payAmount = parseFloat(this.$root.dataset.amount), this.paymentAddress = this.$root.dataset.address || "", this.recaptchaKey = this.$root.dataset.recaptcha, this.recaptchaKey === "" && this.paymentAddress === "") {
      this.isVerified = true;
      const a = await n();
      this.paymentAddress = a.data;
    }
    window.addEventListener("cardanoPress:recaptcha", async (a) => {
      if (this.isVerified = a.detail, this.isVerified && !this.paymentAddress) {
        const e = await n();
        this.paymentAddress = e.data;
      }
    }, { once: true });
  }, isReady(a = "extension") {
    return !!((a !== "extension" ? this.isVerified : !this.transactionHash) && !this.isProcessing);
  }, balanceValue(a, e = true) {
    const s = this[a + "Balance"];
    return parseFloat(s) / (e ? 1e6 : 1);
  }, lovelaceValue() {
    return c(this.payAmount);
  }, totalAmount(a = true) {
    const e = this.payAmount * 100 * (this.quantity * 100) / 1e4;
    return a ? e.toFixed(1) : c(e);
  }, async syncBalance() {
    t({ id: "balance", type: "info", text: i.walletSyncing }), this.isProcessing = true;
    try {
      const a = await o();
      this.currentBalance = parseInt(await a.getBalance()), this.remainingBalance = this.currentBalance - parseInt(this.lovelaceValue()), this.syncedBalance = true;
    } catch (a) {
      t({ type: "error", text: a });
    }
    r("balance"), this.isProcessing = false;
  }, async handlePayment() {
    if (this.transactionHash = "", t({ id: "payment", type: "info", text: i.paying }), !this.paymentAddress) {
      const { success: e, data: s } = await n();
      e && (this.paymentAddress = s);
    }
    this.isProcessing = true;
    const a = await l(this.totalAmount(false), this.paymentAddress);
    r("payment"), a.success ? (this.transactionHash = a.data.hash, t({ type: "info", text: a.data.message })) : t({ type: "warning", text: a.data }), this.isProcessing = false;
  } }));
});
window.cardanoPressRecaptchaCallback = () => {
  const a = (e) => window.dispatchEvent(new CustomEvent("cardanoPress:recaptcha", { detail: e }));
  window.addEventListener("alpine:init", () => {
    d("#cardanopress-recaptcha").then((e) => {
      grecaptcha.render(e, { callback: () => {
        a(true);
      }, "expired-callback": () => {
        a(false);
      }, "error-callback": () => {
        a(false);
      } });
    });
  });
};
