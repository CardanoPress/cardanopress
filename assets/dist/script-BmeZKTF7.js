import { h as w, a as f, b as g, l as y, c as x, m, p as C, d as b, e as v } from "./actions-Cq0Gjs0R.js";
import { a as s, c as a, r as n, E as c, s as r, g as P, b as l, d as h, e as d, f as p, i as u, h as W, w as A, C as E, B as S, u as T, j as M } from "./util-SXkw7wqT.js";
window.addEventListener("alpine:init", () => {
  window.Alpine.data("cardanoPress", () => ({ isAvailable: window.cardano !== void 0 && window.cardanoPress !== void 0, isConnected: false, isProcessing: false, showModal: false, openDropdown: false, connectedExtension: "", selectedHandle: "", availableWallets: [], supportedWallets: [], has(e) {
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
    this.supportedWallets = Array.isArray(e) && e.length > 0 ? e.filter((t) => d.includes(t)) : [...d], h.logged ? (this.connectedExtension = p(), this.selectedHandle = this.$root.dataset.handle || "", this.isConnected = !!this.connectedExtension, this.isConnected && !u() && (s({ type: "success", text: a.connected }), l("true"))) : (u() && l("false"), p() && r(""));
  }, clipboardValue(e) {
    n("clipboardValue"), window.navigator.clipboard.writeText(e).then(() => {
      s({ id: "clipboardValue", type: "info", text: a.clipboardCopy });
    });
  }, async walletConnect(e) {
    this.isConnected ? await this.handleReconnect(e) : await this.handleConnect(e);
  }, async handleConnect(e) {
    this.isProcessing = true;
    try {
      s({ id: "loginConnect", type: "info", text: a.connecting });
      const t = await c.getWallet(e);
      await this.handleLogin(t);
    } catch (t) {
      s({ type: "error", text: t });
    }
    this.isProcessing = false;
  }, async handleLogin(e) {
    const t = await x(e);
    if (n("loginConnect"), t.success) {
      if (s({ type: "success", text: t.data.message }), r(e.type), t.data.reload) return setTimeout(() => {
        window.location.reload();
      }, 500);
      l("true"), this.showModal = false, this.isConnected = true, h.logged = "true", this.connectedExtension = e.type;
    } else s({ type: "error", text: t.data });
  }, async handleLogout() {
    if (this.isConnected) try {
      const e = await P(), t = await e.getNetwork(), i = await e.getChangeAddress(), o = await y(t, i);
      if (o.success) {
        if (s({ type: "success", text: o.data.message }), o.data.reload) return l("false"), r(""), setTimeout(() => {
          window.location.reload();
        }, 500);
      } else s({ type: "error", text: o.data });
    } catch (e) {
      s({ type: "error", text: e });
    }
  }, async handleReconnect(e) {
    this.isProcessing = true;
    try {
      const t = await c.getWallet(e);
      s({ id: "reconnect", type: "info", text: a.reconnecting });
      const i = await g(t);
      if (n("reconnect"), i.success) return s({ type: "success", text: a.reconnected }), r(t.type), setTimeout(() => {
        window.location.reload();
      }, 500);
      s({ type: "error", text: i.data });
    } catch (t) {
      s({ type: "error", text: t });
    }
    this.isProcessing = false;
  }, async handleSync() {
    s({ id: "sync", type: "info", text: a.walletSyncing }), this.isProcessing = true;
    const e = await f();
    n("sync"), e.success ? (s({ type: "success", text: e.data.message }), e.data.updated && s({ type: "info", text: a.newAssetsPulled })) : s({ type: "error", text: e.data }), this.isProcessing = false;
  }, async handleSave() {
    s({ id: "save", type: "info", text: a.handleSaving }), this.isProcessing = true;
    const e = await w(this.selectedHandle);
    n("save"), s({ type: e.success ? "success" : "error", text: e.data }), this.isProcessing = false;
  } }));
});
window.cardanoPress = { ...h, api: { ...v, ...M, ...T }, browser: { Extensions: c, supports: d }, buffer: S, csl: E, wallet: { delegationTx: b, paymentTx: C, multisendTx: m, ...A } };
