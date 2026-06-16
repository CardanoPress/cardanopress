import { b as s, d as i, r, h as d, a as c, w as h } from "./util-D4PRAAo2.js";
import { g as n, c as l } from "./actions-Fb_eg-U3.js";
window.addEventListener("alpine:init", () => {
  window.Alpine.data("paymentForm", () => ({ isVerified: false, isProcessing: false, payAmount: 1, quantity: 1, currentBalance: 0, remainingBalance: 0, transactionHash: "", showAddress: false, paymentAddress: "", recaptchaKey: "", recaptchaToken: "", syncedBalance: false, async init() {
    if (this.payAmount = parseFloat(this.$root.dataset.amount || "1.0"), this.paymentAddress = this.$root.dataset.address || "", this.recaptchaKey = this.$root.dataset.recaptcha || "", this.recaptchaKey === "" && this.paymentAddress === "") {
      this.isVerified = true;
      const e = await n();
      this.paymentAddress = e.data;
    }
    window.addEventListener("cardanoPress:recaptcha", async (e) => {
      const a = e.detail || "";
      if (a !== "" && (this.recaptchaToken = a, this.isVerified = true, !this.paymentAddress)) {
        const t = await n(a);
        this.paymentAddress = t.data;
      }
    }, { once: true });
  }, isReady(e = "extension") {
    return !!((e !== "extension" ? this.isVerified : !this.transactionHash) && !this.isProcessing);
  }, balanceValue(e, a = true) {
    const t = this[e + "Balance"] || 0;
    return parseFloat(t) / (a ? 1e6 : 1);
  }, lovelaceValue() {
    return c(this.payAmount.toString());
  }, totalAmount(e = true) {
    const a = this.payAmount * 100 * (this.quantity * 100) / 1e4;
    return e ? a.toFixed(1) : c(a.toString());
  }, async syncBalance() {
    s({ id: "balance", type: "info", text: i.walletSyncing }), this.isProcessing = true;
    try {
      const e = await d();
      this.currentBalance = parseInt(await e.getBalance()), this.remainingBalance = this.currentBalance - parseInt(this.lovelaceValue()), this.syncedBalance = true;
    } catch (e) {
      s({ type: "error", text: e });
    }
    r("balance"), this.isProcessing = false;
  }, async handlePayment() {
    if (this.transactionHash = "", s({ id: "payment", type: "info", text: i.paying }), !this.paymentAddress) {
      const { success: a, data: t } = await n(this.recaptchaToken);
      a && (this.paymentAddress = t);
    }
    this.isProcessing = true;
    const e = await l(this.totalAmount(false), this.paymentAddress);
    r("payment"), e.success ? (this.transactionHash = e.data.hash, s({ type: "info", text: e.data.message })) : s({ type: "warning", text: e.data }), this.isProcessing = false;
  } }));
});
window.cardanoPressRecaptchaCallback = () => {
  const e = (t) => window.dispatchEvent(new CustomEvent("cardanoPress:recaptcha", { detail: t })), a = () => {
    h("#cardanopress-recaptcha").then((t) => {
      grecaptcha.render(t, { callback: (o) => {
        e(o);
      }, "expired-callback": () => {
        e("");
      }, "error-callback": () => {
        e("");
      } });
    });
  };
  window.Alpine.store("alpineInitialized") ? a() : window.addEventListener("alpine:init", a);
};
