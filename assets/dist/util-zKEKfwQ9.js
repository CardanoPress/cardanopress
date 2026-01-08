var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
let w, l, O, z, K, I, R, g, v, W, L, D, H, P, B, j, U, V, q, F;
let __tla = (async () => {
  var _a, _b, _c;
  let M, p, T, A, b, S;
  R = window.cardanoPress || {
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
  v = () => localStorage.getItem("_x_connectedExtension") || "";
  V = (n) => localStorage.setItem("_x_connectedExtension", n);
  D = () => (localStorage.getItem("_x_isNotified") || "false") === "true";
  K = (n) => localStorage.setItem("_x_isNotified", n);
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
    "Begin",
    "VESPR"
  ]);
  T = "modulepreload";
  A = function(n) {
    return "/" + n;
  };
  b = {};
  S = function(e, t, s) {
    let o = Promise.resolve();
    if (t && t.length > 0) {
      let h = function(i) {
        return Promise.all(i.map((d) => Promise.resolve(d).then((f) => ({
          status: "fulfilled",
          value: f
        }), (f) => ({
          status: "rejected",
          reason: f
        }))));
      };
      document.getElementsByTagName("link");
      const c = document.querySelector("meta[property=csp-nonce]"), r = (c == null ? void 0 : c.nonce) || (c == null ? void 0 : c.getAttribute("nonce"));
      o = h(t.map((i) => {
        if (i = A(i), i in b) return;
        b[i] = true;
        const d = i.endsWith(".css"), f = d ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${i}"]${f}`)) return;
        const u = document.createElement("link");
        if (u.rel = d ? "stylesheet" : T, d || (u.as = "script"), u.crossOrigin = "", u.href = i, r && u.setAttribute("nonce", r), document.head.appendChild(u), d) return new Promise((E, C) => {
          u.addEventListener("load", E), u.addEventListener("error", () => C(new Error(`Unable to preload CSS for ${i}`)));
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
      return e().catch(a);
    });
  };
  w = (_a = class {
    static async load() {
      return w.Module === void 0 && (w.Module = (await S(async () => {
        const { Buffer: e } = await import("./index-MkSInhvO.js").then((t) => t.i);
        return {
          Buffer: e
        };
      }, [])).Buffer), w.Module;
    }
  }, __publicField(_a, "Module"), _a);
  l = (_b = class {
    static async load() {
      return l.Module === void 0 && (l.Module = await S(() => import("./cardano_serialization_lib-ykJEShHf.js").then(async (m2) => {
        await m2.__tla;
        return m2;
      }), [])), l.Module;
    }
  }, __publicField(_b, "Module"), _b);
  let m, x, _, y;
  B = (n) => (parseFloat(n || "1") * 1e6).toFixed();
  m = async (n) => {
    const e = await l.load(), t = await w.load();
    return e.Address.from_bytes(t.from(n, "hex")).to_bech32();
  };
  x = (n) => {
    let e = "";
    for (var t = 0, s = n.length; t < s; t++) e += n.charCodeAt(t).toString(16);
    return e;
  };
  q = Object.freeze(Object.defineProperty({
    __proto__: null,
    adaToLovelace: B,
    hexEncode: x,
    hexToBech32: m
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  _ = async (n, e) => {
    const t = await l.load(), s = t.TransactionUnspentOutputs.new(), o = t.TransactionOutputs.new();
    return e && e.forEach((a) => s.add(a)), n && n.forEach((a) => {
      o.add(t.TransactionOutput.new(t.Address.from_bech32(a.address), t.Value.new(t.BigNum.from_str(a.amount))));
    }), {
      inputs: s,
      outputs: o
    };
  };
  y = async (n, e, t, s, o = null) => {
    const a = await l.load(), c = a.TransactionBuilderConfigBuilder.new().fee_algo(a.LinearFee.new(a.BigNum.from_str(s.minFeeA.toString()), a.BigNum.from_str(s.minFeeB.toString()))).coins_per_utxo_byte(a.BigNum.from_str(s.coinsPerUtxoSize)).pool_deposit(a.BigNum.from_str(s.poolDeposit)).key_deposit(a.BigNum.from_str(s.keyDeposit)).max_value_size(s.maxValSize).max_tx_size(s.maxTxSize).prefer_pure_change(true), r = a.TransactionBuilder.new(c.build());
    o && r.set_certs(o);
    for (let d = 0; d < t.len(); d++) r.add_output(t.get(d));
    r.set_ttl(s.slot + p.invalid_hereafter), r.add_inputs_from(e, a.CoinSelectionStrategyCIP2.RandomImproveMultiAsset), r.add_change_if_needed(a.Address.from_bech32(n));
    const h = a.Transaction.new(r.build(), a.TransactionWitnessSet.new());
    if (h.to_bytes().length * 2 > s.maxTxSize) throw p.too_big;
    return h;
  };
  F = Object.freeze(Object.defineProperty({
    __proto__: null,
    buildTx: y,
    prepareTx: _
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  class N {
    constructor(e, t) {
      __publicField(this, "type");
      __publicField(this, "cardano");
      __publicField(this, "getNetwork", async () => {
        let e = await this.cardano.getNetworkId();
        return M[e];
      });
      __publicField(this, "getBalance", async () => {
        const e = await this.cardano.getBalance(), t = await l.load(), s = await w.load();
        return t.Value.from_bytes(s.from(e, "hex")).coin().to_str();
      });
      __publicField(this, "getChangeAddress", async () => {
        const e = await this.cardano.getChangeAddress();
        return await m(e);
      });
      __publicField(this, "getRewardAddress", async () => {
        const e = await this.cardano.getRewardAddresses();
        return await m(e[0]);
      });
      __publicField(this, "getUtxos", async () => {
        const e = await this.cardano.getUtxos(), t = await l.load(), s = await w.load();
        return e.map((o) => t.TransactionUnspentOutput.from_bytes(s.from(o, "hex")));
      });
      __publicField(this, "getStakeKeyHash", async () => {
        var _a2, _b2, _c2;
        const e = await this.getRewardAddress(), t = await l.load();
        return (_c2 = (_b2 = (_a2 = t.RewardAddress.from_address(t.Address.from_bech32(e))) == null ? void 0 : _a2.payment_cred()) == null ? void 0 : _b2.to_keyhash()) == null ? void 0 : _c2.to_bytes();
      });
      __publicField(this, "signData", async (e) => {
        const t = x(e), s = this.cardano;
        return s.signData(await s.getChangeAddress(), t);
      });
      __publicField(this, "signAndSubmit", async (e) => {
        try {
          const t = await w.load(), s = await l.load(), o = t.from(e.to_bytes()), a = await this.cardano.signTx(o.toString("hex")), c = s.Transaction.new(e.body(), s.TransactionWitnessSet.from_bytes(t.from(a, "hex")));
          let r = t.from(c.to_bytes());
          return await this.cardano.submitTx(r.toString("hex"));
        } catch (t) {
          throw t.info;
        }
      });
      __publicField(this, "payTo", async (e, t, s) => this.multiSend([
        {
          address: e,
          amount: t
        }
      ], s));
      __publicField(this, "multiSend", async (e, t) => {
        try {
          const s = await this.getChangeAddress(), o = await this.getUtxos(), { inputs: a, outputs: c } = await _(e, o), r = await y(s, a, c, t);
          return await this.signAndSubmit(r);
        } catch (s) {
          throw s;
        }
      });
      __publicField(this, "delegateTo", async (e, t, s) => {
        try {
          const o = await this.getChangeAddress(), a = await this.getUtxos(), { inputs: c, outputs: r } = await _([
            {
              address: o,
              amount: t.keyDeposit
            }
          ], a), h = await this.getStakeKeyHash(), i = await l.load(), d = await w.load(), f = i.Certificates.new();
          s.active || f.add(i.Certificate.new_stake_registration(i.StakeRegistration.new(i.Credential.from_keyhash(i.Ed25519KeyHash.from_bytes(d.from(h)))))), f.add(i.Certificate.new_stake_delegation(i.StakeDelegation.new(i.Credential.from_keyhash(i.Ed25519KeyHash.from_bytes(d.from(h))), i.Ed25519KeyHash.from_bytes(d.from(e, "hex")))));
          const u = await y(o, c, r, t, f);
          return await this.signAndSubmit(u);
        } catch (o) {
          throw o;
        }
      });
      this.type = e, this.cardano = t;
    }
  }
  let k;
  k = async (n) => (n === "typhon" && (n = "typhoncip30"), await window.cardano[n].enable());
  L = (n) => {
    var _a2, _b2;
    return ((_b2 = (_a2 = window.cardano[n.toLowerCase()]) == null ? void 0 : _a2.experimental) == null ? void 0 : _b2.vespr_compat) || false;
  };
  O = (_c = class {
    static isSupported(e) {
      return g.includes(e);
    }
    static fromVespr() {
      return g.filter(L);
    }
    static hasWallet(e) {
      var _a2;
      return this.isSupported(e) ? !!((_a2 = window.cardano) == null ? void 0 : _a2[e.toLowerCase()]) : false;
    }
    static async isEnabled(e) {
      return this.hasWallet(e) ? window.cardano[e.toLowerCase()].isEnabled() : false;
    }
    static async getWallet(e) {
      if (!this.isSupported(e)) throw `Not supported wallet "${e}"`;
      if (!this.hasWallet(e)) throw `Not available wallet "${e}"`;
      const t = e.toLowerCase(), s = `${t}Object`;
      if (this[s] === void 0 || !await this.isEnabled(e)) try {
        this[s] = new N(e, await k(t));
      } catch (o) {
        throw typeof o == "string" ? o : o.info || o.message || "user abort connection";
      }
      return Object.freeze(this[s]);
    }
  }, __publicField(_c, "supported", g), _c);
  j = (n) => new Promise((e) => {
    if (document.querySelector(n)) return e(document.querySelector(n));
    const t = new MutationObserver(() => {
      document.querySelector(n) && (e(document.querySelector(n)), t.disconnect());
    });
    t.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
  P = () => {
    const n = () => Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
    return n() + n() + "-" + n() + "-" + n() + "-" + n() + "-" + n() + n() + n();
  };
  z = (n) => {
    window.dispatchEvent(new CustomEvent("cardanoPress:addNotice", {
      detail: n
    }));
  };
  U = (n) => {
    window.dispatchEvent(new CustomEvent("cardanoPress:removeNotice", {
      detail: n
    }));
  };
  W = async () => {
    const n = v();
    if (!n) throw "Not connected to a wallet";
    return await O.getWallet(n);
  };
  H = Object.freeze(Object.defineProperty({
    __proto__: null,
    addNotice: z,
    generateUuid: P,
    getConnectedWallet: W,
    removeNotice: U,
    waitElement: j
  }, Symbol.toStringTag, {
    value: "Module"
  }));
})();
export {
  w as B,
  l as C,
  O as E,
  __tla,
  z as a,
  K as b,
  I as c,
  R as d,
  g as e,
  v as f,
  W as g,
  L as h,
  D as i,
  H as j,
  P as k,
  B as l,
  j as m,
  U as r,
  V as s,
  q as u,
  F as w
};
