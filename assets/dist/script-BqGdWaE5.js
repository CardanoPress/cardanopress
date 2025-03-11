import { h as x, a as m, b as C, l as b, c as v, m as P, p as W, d as E, e as T } from "./actions-CJB7nn4J.js";
import { s as c, a as s, c as a, r as i, E as d, b as l, g as u, N as A, u as g, d as r, e as h, f as p, i as w, h as N, w as L, C as S, j as M } from "./util-CjQW_pXR.js";
const { hexToBech32: H } = g;
window.addEventListener("alpine:init", () => {
  Alpine.data("cardanoPress", () => ({ isAvailable: window.cardano !== void 0 && window.cardanoPress !== void 0, isConnected: false, isProcessing: false, showModal: false, openDropdown: false, connectedExtension: "", selectedHandle: "", availableWallets: [], supportedWallets: c, has(e) {
    return this.availableWallets.includes(e);
  }, isDisabled(e = null) {
    return !!(!this.isAvailable || this.isProcessing || e !== null && !this.has(e));
  }, walletAvailable(e) {
    return this.isAvailable && this.has(e);
  }, fromVespr(e) {
    return this.has(e) && N(e);
  }, getWalletHandle(e) {
    return this.selectedHandle || e;
  }, refreshWallets() {
    this.availableWallets = c.filter((e) => d.hasWallet(e));
  }, async init() {
    if (this.refreshWallets(), this.$watch("showModal", () => {
      this.refreshWallets();
    }), this.supportedWallets = c.filter((e) => this.$root.dataset.wallets.includes(e)), h.logged ? (this.connectedExtension = p(), this.selectedHandle = this.$root.dataset.handle, this.isConnected = !!this.connectedExtension, this.isConnected && !w() && (s({ type: "success", text: a.connected }), r(true))) : (w() && r(false), p() && l("")), this.isAvailable && this.connectedExtension === "Nami") {
      const e = await u();
      e.cardano.experimental.on("networkChange", (t) => this.handleLogout(t, 0)), e.cardano.experimental.on("accountChange", (t) => this.handleLogout(-1, t));
    }
  }, clipboardValue(e) {
    i("clipboardValue"), window.navigator.clipboard.writeText(e).then(() => {
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
    const t = await v(e);
    if (i("loginConnect"), t.success) {
      if (s({ type: "success", text: t.data.message }), l(e.type), t.data.reload) return setTimeout(() => {
        window.location.reload();
      }, 500);
      r(true), this.showModal = false, this.isConnected = true, h.logged = true, this.connectedExtension = e.type;
    } else s({ type: "error", text: t.data });
  }, async handleLogout(e, t) {
    if (this.isConnected) try {
      const n = await u(), f = 0 <= e ? A[e] : await n.getNetwork(), y = t !== 0 ? H(t[0]) : await n.getChangeAddress(), o = await b(f, y);
      if (o.success) {
        if (s({ type: "success", text: o.data.message }), o.data.reload) return r(false), l(""), setTimeout(() => {
          window.location.reload();
        }, 500);
      } else s({ type: "error", text: o.data.message });
    } catch (n) {
      s({ type: "error", text: n });
    }
  }, async handleReconnect(e) {
    this.isProcessing = true;
    try {
      const t = await d.getWallet(e);
      s({ id: "reconnect", type: "info", text: a.reconnecting });
      const n = await C(t);
      if (i("reconnect"), n.success) return s({ type: "success", text: a.reconnected }), l(t.type), setTimeout(() => {
        window.location.reload();
      }, 500);
      s({ type: "error", text: n.data });
    } catch (t) {
      s({ type: "error", text: t });
    }
    this.isProcessing = false;
  }, async handleSync() {
    s({ id: "sync", type: "info", text: a.walletSyncing }), this.isProcessing = true;
    const e = await m();
    i("sync"), e.success ? (s({ type: "success", text: e.data.message }), e.data.updated && s({ type: "info", text: a.newAssetsPulled })) : s({ type: "error", text: e.data }), this.isProcessing = false;
  }, async handleSave() {
    s({ id: "save", type: "info", text: a.handleSaving }), this.isProcessing = true;
    const e = await x(this.selectedHandle);
    i("save"), s({ type: e.success ? "success" : "error", text: e.data }), this.isProcessing = false;
  } }));
});
window.cardanoPress = { ...h, api: { ...T, ...M, ...g }, browser: { Extensions: d, supports: c }, csl: S, wallet: { delegationTx: E, paymentTx: W, multisendTx: P, ...L } };
