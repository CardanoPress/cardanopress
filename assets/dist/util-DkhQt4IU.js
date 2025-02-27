var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
let d, O, C, U, V, I, $, q, k, z, S, D, K, R, v, L, j, g, W, P;
let __tla = (async () => {
  var _a, _b;
  let m, A, M, _, b;
  C = {
    0: "testnet",
    1: "mainnet"
  };
  m = {
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
  A = "modulepreload";
  M = function(n) {
    return "/wp-content/plugins/cardanopress/assets/dist/" + n;
  };
  _ = {};
  b = function(t, e, a) {
    let o = Promise.resolve();
    if (e && e.length > 0) {
      document.getElementsByTagName("link");
      const c = document.querySelector("meta[property=csp-nonce]"), r = (c == null ? void 0 : c.nonce) || (c == null ? void 0 : c.getAttribute("nonce"));
      o = Promise.allSettled(e.map((i) => {
        if (i = M(i), i in _) return;
        _[i] = true;
        const l = i.endsWith(".css"), w = l ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${i}"]${w}`)) return;
        const u = document.createElement("link");
        if (u.rel = l ? "stylesheet" : A, l || (u.as = "script"), u.crossOrigin = "", u.href = i, r && u.setAttribute("nonce", r), document.head.appendChild(u), l) return new Promise((T, E) => {
          u.addEventListener("load", T), u.addEventListener("error", () => E(new Error(`Unable to preload CSS for ${i}`)));
        });
      }));
    }
    function s(c) {
      const r = new Event("vite:preloadError", {
        cancelable: true
      });
      if (r.payload = c, window.dispatchEvent(r), !r.defaultPrevented) throw c;
    }
    return o.then((c) => {
      for (const r of c || []) r.status === "rejected" && s(r.reason);
      return t().catch(s);
    });
  };
  d = (_a = class {
    static async load() {
      return d.Module === void 0 && (d.Module = await b(() => import("./cardano_serialization_lib-pHqu9iRB.js").then(async (m2) => {
        await m2.__tla;
        return m2;
      }), [])), d.Module;
    }
  }, __publicField(_a, "Module"), _a);
  const _h = class _h {
    static async load() {
      return _h.Module === void 0 && (_h.Module = (await b(async () => {
        const { Buffer: t } = await import("./index-CVsC6eDr.js").then((e) => e.i);
        return {
          Buffer: t
        };
      }, [])).Buffer), _h.Module;
    }
  };
  __publicField(_h, "Module");
  let h = _h;
  let y, x, p, f;
  v = (n) => (parseFloat(n || "1") * 1e6).toFixed();
  y = async (n) => {
    const t = await d.load(), e = await h.load();
    return t.Address.from_bytes(e.from(n, "hex")).to_bech32();
  };
  x = (n) => {
    let t = "";
    for (var e = 0, a = n.length; e < a; e++) t += n.charCodeAt(e).toString(16);
    return t;
  };
  W = Object.freeze(Object.defineProperty({
    __proto__: null,
    adaToLovelace: v,
    hexEncode: x,
    hexToBech32: y
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  p = async (n, t) => {
    const e = await d.load(), a = e.TransactionOutputs.new();
    return a.add(e.TransactionOutput.new(e.Address.from_bech32(t), e.Value.new(e.BigNum.from_str(n)))), a;
  };
  f = async (n, t, e, a, o = null) => {
    const s = await d.load(), c = s.TransactionBuilderConfigBuilder.new().fee_algo(s.LinearFee.new(s.BigNum.from_str(a.minFeeA.toString()), s.BigNum.from_str(a.minFeeB.toString()))).coins_per_utxo_byte(s.BigNum.from_str(a.coinsPerUtxoSize)).pool_deposit(s.BigNum.from_str(a.poolDeposit)).key_deposit(s.BigNum.from_str(a.keyDeposit)).max_value_size(a.maxValSize).max_tx_size(a.maxTxSize).prefer_pure_change(true), r = s.TransactionBuilder.new(c.build());
    o && r.set_certs(o);
    const i = s.TransactionUnspentOutputs.new();
    t.forEach((u) => i.add(u)), r.add_output(e.get(0)), r.set_ttl(a.slot + m.invalid_hereafter), r.add_inputs_from(i, s.CoinSelectionStrategyCIP2.RandomImproveMultiAsset), r.add_change_if_needed(s.Address.from_bech32(n));
    const l = s.Transaction.new(r.build(), s.TransactionWitnessSet.new());
    if (l.to_bytes().length * 2 > a.maxTxSize) throw m.too_big;
    return l;
  };
  P = Object.freeze(Object.defineProperty({
    __proto__: null,
    buildTx: f,
    prepareTx: p
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  class N {
    constructor(t, e) {
      __publicField(this, "type");
      __publicField(this, "cardano");
      __publicField(this, "getNetwork", async () => {
        let t = await this.cardano.getNetworkId();
        return this.type === "Typhon" && (t = t.data), C[t];
      });
      __publicField(this, "getBalance", async () => {
        if (this.type === "Typhon") return (await this.cardano.getBalance()).data.ada;
        const t = await this.cardano.getBalance(), e = await d.load(), a = await h.load();
        return e.Value.from_bytes(a.from(t, "hex")).coin().to_str();
      });
      __publicField(this, "getChangeAddress", async () => {
        if (this.type === "Typhon") return (await this.cardano.getAddress()).data;
        const t = await this.cardano.getChangeAddress();
        return await y(t);
      });
      __publicField(this, "getRewardAddress", async () => {
        if (this.type === "Typhon") return (await this.cardano.getRewardAddress()).data;
        const t = await this.cardano.getRewardAddresses();
        return await y(t[0]);
      });
      __publicField(this, "getUtxos", async () => {
        if (this.type === "Typhon") return [];
        const t = await this.cardano.getUtxos(), e = await d.load(), a = await h.load();
        return t.map((o) => e.TransactionUnspentOutput.from_bytes(a.from(o, "hex")));
      });
      __publicField(this, "getStakeKeyHash", async () => {
        var _a2, _b2, _c;
        const t = await this.getRewardAddress(), e = await d.load();
        return (_c = (_b2 = (_a2 = e.RewardAddress.from_address(e.Address.from_bech32(t))) == null ? void 0 : _a2.payment_cred()) == null ? void 0 : _b2.to_keyhash()) == null ? void 0 : _c.to_bytes();
      });
      __publicField(this, "signData", async (t) => {
        const e = x(t);
        let a = this.cardano;
        return this.type === "Typhon" && (a = await window.cardano.typhoncip30.enable()), a.signData(await a.getChangeAddress(), e);
      });
      __publicField(this, "signAndSubmit", async (t) => {
        if (this.type === "Typhon") throw "No implementation from the extension";
        try {
          const e = await h.load(), a = await d.load(), o = e.from(t.to_bytes()), s = await this.cardano.signTx(o.toString("hex")), c = a.Transaction.new(t.body(), a.TransactionWitnessSet.from_bytes(e.from(s, "hex")));
          let r = e.from(c.to_bytes());
          return await this.cardano.submitTx(r.toString("hex"));
        } catch (e) {
          throw e.info;
        }
      });
      __publicField(this, "payTo", async (t, e, a = null) => {
        if (this.type === "Typhon") {
          const { status: o, data: s, error: c, reason: r } = await this.cardano.paymentTransaction({
            outputs: [
              {
                address: t,
                amount: e
              }
            ]
          });
          if (o) return s.transactionId;
          throw c ?? r;
        }
        if (!a) throw "Required protocol parameters";
        try {
          const o = await this.getChangeAddress(), s = await this.getUtxos(), c = await p(e, t), r = await f(o, s, c, a);
          return await this.signAndSubmit(r);
        } catch (o) {
          throw o;
        }
      });
      __publicField(this, "multiSend", async (t, e = null) => {
        if (this.type === "Typhon") {
          const { status: a, data: o, error: s, reason: c } = await this.cardano.paymentTransaction({
            outputs: t
          });
          if (a) return o.transactionId;
          throw s ?? c;
        }
        if (!e) throw "Required protocol parameters";
        try {
          const a = await this.getChangeAddress(), o = await this.getUtxos(), s = await d.load(), c = s.TransactionOutputs.new();
          t.forEach((i) => {
            c.add(s.TransactionOutput.new(s.Address.from_bech32(i.address), s.Value.new(s.BigNum.from_str(i.amount))));
          });
          const r = await f(a, o, c, e);
          return await this.signAndSubmit(r);
        } catch (a) {
          throw a;
        }
      });
      __publicField(this, "delegateTo", async (t, e = null, a = null) => {
        if (this.type === "Typhon") {
          const { status: o, data: s, error: c, reason: r } = await this.cardano.delegationTransaction({
            poolId: t
          });
          if (o) return s.transactionId;
          throw c ?? r;
        }
        if (!e) throw "Required protocol parameters";
        if (!a) throw "Required account information";
        try {
          const o = await this.getChangeAddress(), s = await this.getUtxos(), c = await p(e.keyDeposit, o), r = await this.getStakeKeyHash(), i = await d.load(), l = await h.load(), w = i.Certificates.new();
          a.active || w.add(i.Certificate.new_stake_registration(i.StakeRegistration.new(i.Credential.from_keyhash(i.Ed25519KeyHash.from_bytes(l.from(r)))))), w.add(i.Certificate.new_stake_delegation(i.StakeDelegation.new(i.Credential.from_keyhash(i.Ed25519KeyHash.from_bytes(l.from(r))), i.Ed25519KeyHash.from_bytes(l.from(t, "hex")))));
          const u = await f(o, s, c, e, w);
          return await this.signAndSubmit(u);
        } catch (o) {
          throw o;
        }
      });
      this.type = t, this.cardano = e;
    }
  }
  let B;
  B = async (n) => {
    const t = await window.cardano[n].enable();
    if (n === "typhon") {
      if (t.status === false) throw (t == null ? void 0 : t.error) ?? t.reason;
      return await window.cardano[n];
    }
    return t;
  };
  S = (n) => {
    var _a2, _b2;
    return ((_b2 = (_a2 = window.cardano[n.toLowerCase()]) == null ? void 0 : _a2.experimental) == null ? void 0 : _b2.vespr_compat) || false;
  };
  O = (_b = class {
    static isSupported(t) {
      return t === "VESPR" ? true : g.includes(t);
    }
    static fromVespr() {
      return g.filter(S);
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
      const e = t.toLowerCase(), a = `${e}Object`;
      if (this[a] === void 0 || !await this.isEnabled(t)) try {
        this[a] = new N(t, await B(e));
      } catch (o) {
        throw typeof o == "string" ? o : o.info || o.message || "user abort connection";
      }
      return Object.freeze(this[a]);
    }
  }, __publicField(_b, "supported", g), _b);
  q = window.cardanoPress || {
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
    const n = localStorage.getItem("_x_connectedExtension") || "";
    return n === "" ? "" : `${n}${S(n) ? "(VESPR Compat)" : ""}`;
  };
  V = (n) => localStorage.setItem("_x_connectedExtension", n);
  D = () => (localStorage.getItem("_x_isNotified") || "false") === "true";
  $ = (n) => localStorage.setItem("_x_isNotified", n);
  L = (n) => new Promise((t) => {
    if (document.querySelector(n)) return t(document.querySelector(n));
    const e = new MutationObserver(() => {
      document.querySelector(n) && (t(document.querySelector(n)), e.disconnect());
    });
    e.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
  R = () => {
    const n = () => Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
    return n() + n() + "-" + n() + "-" + n() + "-" + n() + "-" + n() + n() + n();
  };
  U = (n) => {
    window.dispatchEvent(new CustomEvent("cardanoPress:addNotice", {
      detail: n
    }));
  };
  j = (n) => {
    window.dispatchEvent(new CustomEvent("cardanoPress:removeNotice", {
      detail: n
    }));
  };
  z = async () => {
    const n = k();
    if (!n) throw "Not connected to a wallet";
    return await O.getWallet(n);
  };
  K = Object.freeze(Object.defineProperty({
    __proto__: null,
    addNotice: U,
    generateUuid: R,
    getConnectedWallet: z,
    removeNotice: j,
    waitElement: L
  }, Symbol.toStringTag, {
    value: "Module"
  }));
})();
export {
  d as C,
  O as E,
  C as N,
  __tla,
  U as a,
  V as b,
  I as c,
  $ as d,
  q as e,
  k as f,
  z as g,
  S as h,
  D as i,
  K as j,
  R as k,
  v as l,
  L as m,
  j as r,
  g as s,
  W as u,
  P as w
};
