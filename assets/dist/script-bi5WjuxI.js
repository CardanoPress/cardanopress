import { h as f, a as g, b as y, l as x, c as m, m as C, p as b, d as v, e as P } from "./actions-o4M7JdP1.js";
import { s as c, a as s, c as a, r as n, E as d, b as r, g as W, N as E, d as l, e as h, f as u, i as p, h as T, w as A, C as N, B as S, u as M, j as H } from "./util-CHNbL_kJ.js";
window.addEventListener("alpine:init", () => {
  window.Alpine.data("cardanoPress", () => ({ isAvailable: window.cardano !== void 0 && window.cardanoPress !== void 0, isConnected: false, isProcessing: false, showModal: false, openDropdown: false, connectedExtension: "", selectedHandle: "", availableWallets: [], supportedWallets: c, has(e) {
    return this.availableWallets.includes(e);
  }, isDisabled(e = null) {
    return !!(!this.isAvailable || this.isProcessing || e !== null && !this.has(e));
  }, walletAvailable(e) {
    return this.isAvailable && this.has(e);
  }, fromVespr(e) {
    return this.has(e) && T(e);
  }, getWalletHandle(e) {
    return this.selectedHandle || e;
  }, refreshWallets() {
    this.availableWallets = c.filter((e) => d.hasWallet(e));
  }, async init() {
    this.refreshWallets(), this.$watch("showModal", () => {
      this.refreshWallets();
    }), this.supportedWallets = c.filter((e) => this.$root.dataset.wallets.includes(e)), h.logged ? (this.connectedExtension = u(), this.selectedHandle = this.$root.dataset.handle, this.isConnected = !!this.connectedExtension, this.isConnected && !p() && (s({ type: "success", text: a.connected }), l("true"))) : (p() && l("false"), u() && r(""));
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
      const t = await d.getWallet(e);
      await this.handleLogin(t);
    } catch (t) {
      s({ type: "error", text: t });
    }
    this.isProcessing = false;
  }, async handleLogin(e) {
    const t = await m(e);
    if (n("loginConnect"), t.success) {
      if (s({ type: "success", text: t.data.message }), r(e.type), t.data.reload) return setTimeout(() => {
        window.location.reload();
      }, 500);
      l("true"), this.showModal = false, this.isConnected = true, h.logged = "true", this.connectedExtension = e.type;
    } else s({ type: "error", text: t.data });
  }, async handleLogout(e) {
    if (this.isConnected) try {
      const t = await W(), i = 0 <= e ? E[e] : await t.getNetwork(), w = await t.getChangeAddress(), o = await x(i, w);
      if (o.success) {
        if (s({ type: "success", text: o.data.message }), o.data.reload) return l("false"), r(""), setTimeout(() => {
          window.location.reload();
        }, 500);
      } else s({ type: "error", text: o.data });
    } catch (t) {
      s({ type: "error", text: t });
    }
  }, async handleReconnect(e) {
    this.isProcessing = true;
    try {
      const t = await d.getWallet(e);
      s({ id: "reconnect", type: "info", text: a.reconnecting });
      const i = await y(t);
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
    const e = await g();
    n("sync"), e.success ? (s({ type: "success", text: e.data.message }), e.data.updated && s({ type: "info", text: a.newAssetsPulled })) : s({ type: "error", text: e.data }), this.isProcessing = false;
  }, async handleSave() {
    s({ id: "save", type: "info", text: a.handleSaving }), this.isProcessing = true;
    const e = await f(this.selectedHandle);
    n("save"), s({ type: e.success ? "success" : "error", text: e.data }), this.isProcessing = false;
  } }));
});
window.cardanoPress = { ...h, api: { ...P, ...H, ...M }, browser: { Extensions: d, supports: c }, buffer: S, csl: N, wallet: { delegationTx: v, paymentTx: b, multisendTx: C, ...A } };
