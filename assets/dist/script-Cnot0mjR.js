import { f as w, i as f, e as y, j as g, l as x, m, p as C, d as v, a as b } from "./actions-BdrbiB5J.js";
import { b as t, d as a, r as n, E as c, s as l, h as P, j as r, c as h, k as d, e as p, i as u, f as W, m as A, C as E, B as S, l as T, u as M } from "./util-D4PRAAo2.js";
window.addEventListener("alpine:init", () => {
  window.Alpine.store("alpineInitialized", Date.now()), window.Alpine.data("cardanoPress", () => ({ isAvailable: window.cardano !== void 0 && window.cardanoPress !== void 0, isConnected: false, isProcessing: false, showModal: false, openDropdown: false, connectedExtension: "", selectedHandle: "", availableWallets: [], supportedWallets: [], has(e) {
    return this.availableWallets.includes(e);
  }, isDisabled(e = null) {
    return !!(!this.isAvailable || this.isProcessing || e !== null && !this.has(e));
  }, walletAvailable(e) {
    return this.isAvailable && this.has(e);
  }, fromVespr(e) {
    return this.has(e) && W(e);
  }, getWalletHandle(e) {
    return this.selectedHandle || e;
  }, refreshWallets() {
    this.availableWallets = d.filter((e) => c.hasWallet(e));
  }, async init() {
    this.refreshWallets(), this.$watch("showModal", () => {
      this.refreshWallets();
    });
    const e = JSON.parse(this.$root.dataset.wallets || "[]");
    this.supportedWallets = Array.isArray(e) && e.length > 0 ? e.filter((s) => d.includes(s)) : [...d], h.logged ? (this.connectedExtension = p(), this.selectedHandle = this.$root.dataset.handle || "", this.isConnected = !!this.connectedExtension, this.isConnected && !u() && (t({ type: "success", text: a.connected }), r("true"))) : (u() && r("false"), p() && l(""));
  }, clipboardValue(e) {
    n("clipboardValue"), window.navigator.clipboard.writeText(e).then(() => {
      t({ id: "clipboardValue", type: "info", text: a.clipboardCopy });
    });
  }, async walletConnect(e) {
    this.isConnected ? await this.handleReconnect(e) : await this.handleConnect(e);
  }, async handleConnect(e) {
    this.isProcessing = true;
    try {
      t({ id: "loginConnect", type: "info", text: a.connecting });
      const s = await c.getWallet(e);
      await this.handleLogin(s);
    } catch (s) {
      t({ type: "error", text: s });
    }
    this.isProcessing = false;
  }, async handleLogin(e) {
    const s = await x(e);
    if (n("loginConnect"), s.success) {
      if (t({ type: "success", text: s.data.message }), l(e.type), s.data.reload) return setTimeout(() => {
        window.location.reload();
      }, 500);
      r("true"), this.showModal = false, this.isConnected = true, h.logged = "true", this.connectedExtension = e.type;
    } else t({ type: "error", text: s.data });
  }, async handleLogout() {
    if (this.isConnected) try {
      const e = await P(), s = await e.getNetwork(), i = await e.getChangeAddress(), o = await g(s, i);
      if (o.success) {
        if (t({ type: "success", text: o.data.message }), o.data.reload) return r("false"), l(""), setTimeout(() => {
          window.location.reload();
        }, 500);
      } else t({ type: "error", text: o.data });
    } catch (e) {
      t({ type: "error", text: e });
    }
  }, async handleReconnect(e) {
    this.isProcessing = true;
    try {
      const s = await c.getWallet(e);
      t({ id: "reconnect", type: "info", text: a.reconnecting });
      const i = await y(s);
      if (n("reconnect"), i.success) return t({ type: "success", text: a.reconnected }), l(s.type), setTimeout(() => {
        window.location.reload();
      }, 500);
      t({ type: "error", text: i.data });
    } catch (s) {
      t({ type: "error", text: s });
    }
    this.isProcessing = false;
  }, async handleSync() {
    t({ id: "sync", type: "info", text: a.walletSyncing }), this.isProcessing = true;
    const e = await f();
    n("sync"), e.success ? (t({ type: "success", text: e.data.message }), e.data.updated && t({ type: "info", text: a.newAssetsPulled })) : t({ type: "error", text: e.data }), this.isProcessing = false;
  }, async handleSave() {
    t({ id: "save", type: "info", text: a.handleSaving }), this.isProcessing = true;
    const e = await w(this.selectedHandle);
    n("save"), t({ type: e.success ? "success" : "error", text: e.data }), this.isProcessing = false;
  } }));
});
window.cardanoPress = { ...h, api: { ...b, ...M, ...T }, browser: { Extensions: c, supports: d }, buffer: S, csl: E, wallet: { delegationTx: v, paymentTx: C, multisendTx: m, ...A } };
