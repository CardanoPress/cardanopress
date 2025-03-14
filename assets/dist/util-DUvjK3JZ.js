var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
let w, l, O, P, K, I, V, g, k, z, x, $, q, U, v, L, j, D, R, W;
let __tla = (async () => {
  var _a, _b, _c;
  let A, y, M, T, p, b;
  A = {
    0: "testnet",
    1: "mainnet"
  };
  y = {
    too_big: "Transaction too big",
    invalid_hereafter: 3600 * 2
  };
  g = Object.freeze([
    "Eternl",
    "Yoroi",
    "Typhon",
    "GeroWallet",
    "NuFi",
    "Lace",
    "Begin"
  ]);
  M = "modulepreload";
  T = function(e) {
    return "/wp-content/plugins/cardanopress/assets/dist/" + e;
  };
  p = {};
  b = function(t, n, s) {
    let o = Promise.resolve();
    if (n && n.length > 0) {
      document.getElementsByTagName("link");
      const c = document.querySelector("meta[property=csp-nonce]"), r = (c == null ? void 0 : c.nonce) || (c == null ? void 0 : c.getAttribute("nonce"));
      o = Promise.allSettled(n.map((i) => {
        if (i = T(i), i in p) return;
        p[i] = true;
        const u = i.endsWith(".css"), h = u ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${i}"]${h}`)) return;
        const d = document.createElement("link");
        if (d.rel = u ? "stylesheet" : M, u || (d.as = "script"), d.crossOrigin = "", d.href = i, r && d.setAttribute("nonce", r), document.head.appendChild(d), u) return new Promise((E, C) => {
          d.addEventListener("load", E), d.addEventListener("error", () => C(new Error(`Unable to preload CSS for ${i}`)));
        });
      }));
    }
    function a(c) {
      const r = new Event("vite:preloadError", {
        cancelable: true
      });
      if (r.payload = c, window.dispatchEvent(r), !r.defaultPrevented) throw c;
    }
    return o.then((c) => {
      for (const r of c || []) r.status === "rejected" && a(r.reason);
      return t().catch(a);
    });
  };
  l = (_a = class {
    static async load() {
      return l.Module === void 0 && (l.Module = await b(() => import("./cardano_serialization_lib-pHqu9iRB.js").then(async (m2) => {
        await m2.__tla;
        return m2;
      }), [])), l.Module;
    }
  }, __publicField(_a, "Module"), _a);
  w = (_b = class {
    static async load() {
      return w.Module === void 0 && (w.Module = (await b(async () => {
        const { Buffer: t } = await import("./index-CVsC6eDr.js").then((n) => n.i);
        return {
          Buffer: t
        };
      }, [])).Buffer), w.Module;
    }
  }, __publicField(_b, "Module"), _b);
  let m, S, _, f;
  v = (e) => (parseFloat(e || "1") * 1e6).toFixed();
  m = async (e) => {
    const t = await l.load(), n = await w.load();
    return t.Address.from_bytes(n.from(e, "hex")).to_bech32();
  };
  S = (e) => {
    let t = "";
    for (var n = 0, s = e.length; n < s; n++) t += e.charCodeAt(n).toString(16);
    return t;
  };
  R = Object.freeze(Object.defineProperty({
    __proto__: null,
    adaToLovelace: v,
    hexEncode: S,
    hexToBech32: m
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  _ = async (e, t) => {
    const n = await l.load(), s = n.TransactionOutputs.new();
    return s.add(n.TransactionOutput.new(n.Address.from_bech32(t), n.Value.new(n.BigNum.from_str(e)))), s;
  };
  f = async (e, t, n, s, o = null) => {
    const a = await l.load(), c = a.TransactionBuilderConfigBuilder.new().fee_algo(a.LinearFee.new(a.BigNum.from_str(s.minFeeA.toString()), a.BigNum.from_str(s.minFeeB.toString()))).coins_per_utxo_byte(a.BigNum.from_str(s.coinsPerUtxoSize)).pool_deposit(a.BigNum.from_str(s.poolDeposit)).key_deposit(a.BigNum.from_str(s.keyDeposit)).max_value_size(s.maxValSize).max_tx_size(s.maxTxSize).prefer_pure_change(true), r = a.TransactionBuilder.new(c.build());
    o && r.set_certs(o);
    const i = a.TransactionUnspentOutputs.new();
    t.forEach((d) => i.add(d));
    for (let d = 0; d < n.len(); d++) r.add_output(n.get(d));
    r.set_ttl(s.slot + y.invalid_hereafter), r.add_inputs_from(i, a.CoinSelectionStrategyCIP2.RandomImproveMultiAsset), r.add_change_if_needed(a.Address.from_bech32(e));
    const u = a.Transaction.new(r.build(), a.TransactionWitnessSet.new());
    if (u.to_bytes().length * 2 > s.maxTxSize) throw y.too_big;
    return u;
  };
  W = Object.freeze(Object.defineProperty({
    __proto__: null,
    buildTx: f,
    prepareTx: _
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  class B {
    constructor(t, n) {
      __publicField(this, "type");
      __publicField(this, "cardano");
      __publicField(this, "getNetwork", async () => {
        let t = await this.cardano.getNetworkId();
        return A[t];
      });
      __publicField(this, "getBalance", async () => {
        const t = await this.cardano.getBalance(), n = await l.load(), s = await w.load();
        return n.Value.from_bytes(s.from(t, "hex")).coin().to_str();
      });
      __publicField(this, "getChangeAddress", async () => {
        const t = await this.cardano.getChangeAddress();
        return await m(t);
      });
      __publicField(this, "getRewardAddress", async () => {
        const t = await this.cardano.getRewardAddresses();
        return await m(t[0]);
      });
      __publicField(this, "getUtxos", async () => {
        const t = await this.cardano.getUtxos(), n = await l.load(), s = await w.load();
        return t.map((o) => n.TransactionUnspentOutput.from_bytes(s.from(o, "hex")));
      });
      __publicField(this, "getStakeKeyHash", async () => {
        var _a2, _b2, _c2;
        const t = await this.getRewardAddress(), n = await l.load();
        return (_c2 = (_b2 = (_a2 = n.RewardAddress.from_address(n.Address.from_bech32(t))) == null ? void 0 : _a2.payment_cred()) == null ? void 0 : _b2.to_keyhash()) == null ? void 0 : _c2.to_bytes();
      });
      __publicField(this, "signData", async (t) => {
        const n = S(t), s = this.cardano;
        return s.signData(await s.getChangeAddress(), n);
      });
      __publicField(this, "signAndSubmit", async (t) => {
        try {
          const n = await w.load(), s = await l.load(), o = n.from(t.to_bytes()), a = await this.cardano.signTx(o.toString("hex")), c = s.Transaction.new(t.body(), s.TransactionWitnessSet.from_bytes(n.from(a, "hex")));
          let r = n.from(c.to_bytes());
          return await this.cardano.submitTx(r.toString("hex"));
        } catch (n) {
          throw n.info;
        }
      });
      __publicField(this, "payTo", async (t, n, s) => {
        try {
          const o = await this.getChangeAddress(), a = await this.getUtxos(), c = await _(n, t), r = await f(o, a, c, s);
          return await this.signAndSubmit(r);
        } catch (o) {
          throw o;
        }
      });
      __publicField(this, "multiSend", async (t, n) => {
        try {
          const s = await this.getChangeAddress(), o = await this.getUtxos(), a = await l.load(), c = a.TransactionOutputs.new();
          t.forEach((i) => {
            c.add(a.TransactionOutput.new(a.Address.from_bech32(i.address), a.Value.new(a.BigNum.from_str(i.amount))));
          });
          const r = await f(s, o, c, n);
          return await this.signAndSubmit(r);
        } catch (s) {
          throw s;
        }
      });
      __publicField(this, "delegateTo", async (t, n, s) => {
        try {
          const o = await this.getChangeAddress(), a = await this.getUtxos(), c = await _(n.keyDeposit, o), r = await this.getStakeKeyHash(), i = await l.load(), u = await w.load(), h = i.Certificates.new();
          s.active || h.add(i.Certificate.new_stake_registration(i.StakeRegistration.new(i.Credential.from_keyhash(i.Ed25519KeyHash.from_bytes(u.from(r)))))), h.add(i.Certificate.new_stake_delegation(i.StakeDelegation.new(i.Credential.from_keyhash(i.Ed25519KeyHash.from_bytes(u.from(r))), i.Ed25519KeyHash.from_bytes(u.from(t, "hex")))));
          const d = await f(o, a, c, n, h);
          return await this.signAndSubmit(d);
        } catch (o) {
          throw o;
        }
      });
      this.type = t, this.cardano = n;
    }
  }
  let N;
  N = async (e) => (e === "typhon" && (e = "typhoncip30"), await window.cardano[e].enable());
  x = (e) => {
    var _a2, _b2;
    return ((_b2 = (_a2 = window.cardano[e.toLowerCase()]) == null ? void 0 : _a2.experimental) == null ? void 0 : _b2.vespr_compat) || false;
  };
  O = (_c = class {
    static isSupported(t) {
      return t === "VESPR" ? true : g.includes(t);
    }
    static fromVespr() {
      return g.filter(x);
    }
    static hasWallet(t) {
      var _a2;
      return this.isSupported(t) ? !!((_a2 = window.cardano) == null ? void 0 : _a2[t.toLowerCase()]) : false;
    }
    static async isEnabled(t) {
      return this.hasWallet(t) ? window.cardano[t.toLowerCase()].isEnabled() : false;
    }
    static async getWallet(t) {
      if (!this.isSupported(t)) throw `Not supported wallet "${t}"`;
      if (!this.hasWallet(t)) throw `Not available wallet "${t}"`;
      const n = t.toLowerCase(), s = `${n}Object`;
      if (this[s] === void 0 || !await this.isEnabled(t)) try {
        this[s] = new B(t, await N(n));
      } catch (o) {
        throw typeof o == "string" ? o : o.info || o.message || "user abort connection";
      }
      return Object.freeze(this[s]);
    }
  }, __publicField(_c, "supported", g), _c);
  V = window.cardanoPress || {
    ajaxUrl: "",
    _nonce: "",
    logged: ""
  };
  I = window.cardanoPressMessages || {
    connected: "",
    connecting: "",
    verifying: "",
    reconnected: "",
    reconnecting: "",
    walletSyncing: "",
    newAssetsPulled: "",
    handleSaving: "",
    delegating: "",
    paying: "",
    clipboardCopy: "",
    dataMessage: ""
  };
  k = () => {
    const e = localStorage.getItem("_x_connectedExtension") || "";
    return e === "" ? "" : `${e}${x(e) ? "(VESPR Compat)" : ""}`;
  };
  D = (e) => localStorage.setItem("_x_connectedExtension", e);
  $ = () => (localStorage.getItem("_x_isNotified") || "false") === "true";
  K = (e) => localStorage.setItem("_x_isNotified", e);
  L = (e) => new Promise((t) => {
    if (document.querySelector(e)) return t(document.querySelector(e));
    const n = new MutationObserver(() => {
      document.querySelector(e) && (t(document.querySelector(e)), n.disconnect());
    });
    n.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
  U = () => {
    const e = () => Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
    return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e();
  };
  P = (e) => {
    window.dispatchEvent(new CustomEvent("cardanoPress:addNotice", {
      detail: e
    }));
  };
  j = (e) => {
    window.dispatchEvent(new CustomEvent("cardanoPress:removeNotice", {
      detail: e
    }));
  };
  z = async () => {
    const e = k();
    if (!e) throw "Not connected to a wallet";
    return await O.getWallet(e);
  };
  q = Object.freeze(Object.defineProperty({
    __proto__: null,
    addNotice: P,
    generateUuid: U,
    getConnectedWallet: z,
    removeNotice: j,
    waitElement: L
  }, Symbol.toStringTag, {
    value: "Module"
  }));
})();
export {
  w as B,
  l as C,
  O as E,
  __tla,
  P as a,
  K as b,
  I as c,
  V as d,
  g as e,
  k as f,
  z as g,
  x as h,
  $ as i,
  q as j,
  U as k,
  v as l,
  L as m,
  j as r,
  D as s,
  R as u,
  W as w
};
