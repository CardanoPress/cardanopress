var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
let f, u, k, j, K, V, I, g, L, R, E, $, q, P, A, O, z, D, U, W;
let __tla = (async () => {
  var _a, _b, _c;
  let M, p, v, T, b, S;
  M = {
    0: "testnet",
    1: "mainnet"
  };
  p = {
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
  v = "modulepreload";
  T = function(n) {
    return "/wp-content/plugins/cardanopress/assets/dist/" + n;
  };
  b = {};
  S = function(t, e, s) {
    let o = Promise.resolve();
    if (e && e.length > 0) {
      document.getElementsByTagName("link");
      const c = document.querySelector("meta[property=csp-nonce]"), r = (c == null ? void 0 : c.nonce) || (c == null ? void 0 : c.getAttribute("nonce"));
      o = Promise.allSettled(e.map((d) => {
        if (d = T(d), d in b) return;
        b[d] = true;
        const i = d.endsWith(".css"), w = i ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${d}"]${w}`)) return;
        const l = document.createElement("link");
        if (l.rel = i ? "stylesheet" : v, i || (l.as = "script"), l.crossOrigin = "", l.href = d, r && l.setAttribute("nonce", r), document.head.appendChild(l), i) return new Promise((h, C) => {
          l.addEventListener("load", h), l.addEventListener("error", () => C(new Error(`Unable to preload CSS for ${d}`)));
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
  f = (_a = class {
    static async load() {
      return f.Module === void 0 && (f.Module = (await S(async () => {
        const { Buffer: t } = await import("./index-CVsC6eDr.js").then((e) => e.i);
        return {
          Buffer: t
        };
      }, [])).Buffer), f.Module;
    }
  }, __publicField(_a, "Module"), _a);
  u = (_b = class {
    static async load() {
      return u.Module === void 0 && (u.Module = await S(() => import("./cardano_serialization_lib-pHqu9iRB.js").then(async (m2) => {
        await m2.__tla;
        return m2;
      }), [])), u.Module;
    }
  }, __publicField(_b, "Module"), _b);
  let m, x, _, y;
  A = (n) => (parseFloat(n || "1") * 1e6).toFixed();
  m = async (n) => {
    const t = await u.load(), e = await f.load();
    return t.Address.from_bytes(e.from(n, "hex")).to_bech32();
  };
  x = (n) => {
    let t = "";
    for (var e = 0, s = n.length; e < s; e++) t += n.charCodeAt(e).toString(16);
    return t;
  };
  U = Object.freeze(Object.defineProperty({
    __proto__: null,
    adaToLovelace: A,
    hexEncode: x,
    hexToBech32: m
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  _ = async (n, t) => {
    const e = await u.load(), s = e.TransactionUnspentOutputs.new(), o = e.TransactionOutputs.new();
    return t.forEach((a) => s.add(a)), n.forEach((a) => {
      o.add(e.TransactionOutput.new(e.Address.from_bech32(a.address), e.Value.new(e.BigNum.from_str(a.amount))));
    }), {
      inputs: s,
      outputs: o
    };
  };
  y = async (n, t, e, s, o = null) => {
    const a = await u.load(), c = a.TransactionBuilderConfigBuilder.new().fee_algo(a.LinearFee.new(a.BigNum.from_str(s.minFeeA.toString()), a.BigNum.from_str(s.minFeeB.toString()))).coins_per_utxo_byte(a.BigNum.from_str(s.coinsPerUtxoSize)).pool_deposit(a.BigNum.from_str(s.poolDeposit)).key_deposit(a.BigNum.from_str(s.keyDeposit)).max_value_size(s.maxValSize).max_tx_size(s.maxTxSize).prefer_pure_change(true), r = a.TransactionBuilder.new(c.build());
    o && r.set_certs(o);
    for (let w = 0; w < e.len(); w++) r.add_output(e.get(w));
    r.set_ttl(s.slot + p.invalid_hereafter), r.add_inputs_from(t, a.CoinSelectionStrategyCIP2.RandomImproveMultiAsset), r.add_change_if_needed(a.Address.from_bech32(n));
    const d = a.Transaction.new(r.build(), a.TransactionWitnessSet.new());
    if (d.to_bytes().length * 2 > s.maxTxSize) throw p.too_big;
    return d;
  };
  W = Object.freeze(Object.defineProperty({
    __proto__: null,
    buildTx: y,
    prepareTx: _
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  class B {
    constructor(t, e) {
      __publicField(this, "type");
      __publicField(this, "cardano");
      __publicField(this, "getNetwork", async () => {
        let t = await this.cardano.getNetworkId();
        return M[t];
      });
      __publicField(this, "getBalance", async () => {
        const t = await this.cardano.getBalance(), e = await u.load(), s = await f.load();
        return e.Value.from_bytes(s.from(t, "hex")).coin().to_str();
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
        const t = await this.cardano.getUtxos(), e = await u.load(), s = await f.load();
        return t.map((o) => e.TransactionUnspentOutput.from_bytes(s.from(o, "hex")));
      });
      __publicField(this, "getStakeKeyHash", async () => {
        var _a2, _b2, _c2;
        const t = await this.getRewardAddress(), e = await u.load();
        return (_c2 = (_b2 = (_a2 = e.RewardAddress.from_address(e.Address.from_bech32(t))) == null ? void 0 : _a2.payment_cred()) == null ? void 0 : _b2.to_keyhash()) == null ? void 0 : _c2.to_bytes();
      });
      __publicField(this, "signData", async (t) => {
        const e = x(t), s = this.cardano;
        return s.signData(await s.getChangeAddress(), e);
      });
      __publicField(this, "signAndSubmit", async (t) => {
        try {
          const e = await f.load(), s = await u.load(), o = e.from(t.to_bytes()), a = await this.cardano.signTx(o.toString("hex")), c = s.Transaction.new(t.body(), s.TransactionWitnessSet.from_bytes(e.from(a, "hex")));
          let r = e.from(c.to_bytes());
          return await this.cardano.submitTx(r.toString("hex"));
        } catch (e) {
          throw e.info;
        }
      });
      __publicField(this, "payTo", async (t, e, s) => this.multiSend([
        {
          address: t,
          amount: e
        }
      ], s));
      __publicField(this, "multiSend", async (t, e) => {
        try {
          const s = await this.getChangeAddress(), o = await this.getUtxos(), { inputs: a, outputs: c } = await _(t, o), r = await y(s, a, c, e);
          return await this.signAndSubmit(r);
        } catch (s) {
          throw s;
        }
      });
      __publicField(this, "delegateTo", async (t, e, s) => {
        try {
          const o = await this.getChangeAddress(), a = await this.getUtxos(), { inputs: c, outputs: r } = await _([
            {
              address: o,
              amount: e.keyDeposit
            }
          ], a), d = await this.getStakeKeyHash(), i = await u.load(), w = await f.load(), l = i.Certificates.new();
          s.active || l.add(i.Certificate.new_stake_registration(i.StakeRegistration.new(i.Credential.from_keyhash(i.Ed25519KeyHash.from_bytes(w.from(d)))))), l.add(i.Certificate.new_stake_delegation(i.StakeDelegation.new(i.Credential.from_keyhash(i.Ed25519KeyHash.from_bytes(w.from(d))), i.Ed25519KeyHash.from_bytes(w.from(t, "hex")))));
          const h = await y(o, c, r, e, l);
          return await this.signAndSubmit(h);
        } catch (o) {
          throw o;
        }
      });
      this.type = t, this.cardano = e;
    }
  }
  let N;
  N = async (n) => (n === "typhon" && (n = "typhoncip30"), await window.cardano[n].enable());
  E = (n) => {
    var _a2, _b2;
    return ((_b2 = (_a2 = window.cardano[n.toLowerCase()]) == null ? void 0 : _a2.experimental) == null ? void 0 : _b2.vespr_compat) || false;
  };
  k = (_c = class {
    static isSupported(t) {
      return t === "VESPR" ? true : g.includes(t);
    }
    static fromVespr() {
      return g.filter(E);
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
      const e = t.toLowerCase(), s = `${e}Object`;
      if (this[s] === void 0 || !await this.isEnabled(t)) try {
        this[s] = new B(t, await N(e));
      } catch (o) {
        throw typeof o == "string" ? o : o.info || o.message || "user abort connection";
      }
      return Object.freeze(this[s]);
    }
  }, __publicField(_c, "supported", g), _c);
  I = window.cardanoPress || {
    ajaxUrl: "",
    _nonce: "",
    logged: ""
  };
  V = window.cardanoPressMessages || {
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
  L = () => {
    const n = localStorage.getItem("_x_connectedExtension") || "";
    return n === "" ? "" : `${n}${E(n) ? "(VESPR Compat)" : ""}`;
  };
  D = (n) => localStorage.setItem("_x_connectedExtension", n);
  $ = () => (localStorage.getItem("_x_isNotified") || "false") === "true";
  K = (n) => localStorage.setItem("_x_isNotified", n);
  O = (n) => new Promise((t) => {
    if (document.querySelector(n)) return t(document.querySelector(n));
    const e = new MutationObserver(() => {
      document.querySelector(n) && (t(document.querySelector(n)), e.disconnect());
    });
    e.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
  P = () => {
    const n = () => Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
    return n() + n() + "-" + n() + "-" + n() + "-" + n() + "-" + n() + n() + n();
  };
  j = (n) => {
    window.dispatchEvent(new CustomEvent("cardanoPress:addNotice", {
      detail: n
    }));
  };
  z = (n) => {
    window.dispatchEvent(new CustomEvent("cardanoPress:removeNotice", {
      detail: n
    }));
  };
  R = async () => {
    const n = L();
    if (!n) throw "Not connected to a wallet";
    return await k.getWallet(n);
  };
  q = Object.freeze(Object.defineProperty({
    __proto__: null,
    addNotice: j,
    generateUuid: P,
    getConnectedWallet: R,
    removeNotice: z,
    waitElement: O
  }, Symbol.toStringTag, {
    value: "Module"
  }));
})();
export {
  f as B,
  u as C,
  k as E,
  __tla,
  j as a,
  K as b,
  V as c,
  I as d,
  g as e,
  L as f,
  R as g,
  E as h,
  $ as i,
  q as j,
  P as k,
  A as l,
  O as m,
  z as r,
  D as s,
  U as u,
  W as w
};
