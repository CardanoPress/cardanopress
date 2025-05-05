var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
let w, l, L, z, q, $, V, g, O, U, E, K, F, j, B, P, R, D, W, I;
let __tla = (async () => {
  var _a, _b, _c;
  let M, p, T, A, b, S;
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
  T = "modulepreload";
  A = function(t) {
    return "/wp-content/plugins/cardanopress/assets/dist/" + t;
  };
  b = {};
  S = function(e, n, s) {
    let o = Promise.resolve();
    if (n && n.length > 0) {
      let c = function(i) {
        return Promise.all(i.map((d) => Promise.resolve(d).then((f) => ({
          status: "fulfilled",
          value: f
        }), (f) => ({
          status: "rejected",
          reason: f
        }))));
      };
      document.getElementsByTagName("link");
      const r = document.querySelector("meta[property=csp-nonce]"), h = (r == null ? void 0 : r.nonce) || (r == null ? void 0 : r.getAttribute("nonce"));
      o = c(n.map((i) => {
        if (i = A(i), i in b) return;
        b[i] = true;
        const d = i.endsWith(".css"), f = d ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${i}"]${f}`)) return;
        const u = document.createElement("link");
        if (u.rel = d ? "stylesheet" : T, d || (u.as = "script"), u.crossOrigin = "", u.href = i, h && u.setAttribute("nonce", h), document.head.appendChild(u), d) return new Promise((C, v) => {
          u.addEventListener("load", C), u.addEventListener("error", () => v(new Error(`Unable to preload CSS for ${i}`)));
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
        const { Buffer: e } = await import("./index-CVsC6eDr.js").then((n) => n.i);
        return {
          Buffer: e
        };
      }, [])).Buffer), w.Module;
    }
  }, __publicField(_a, "Module"), _a);
  l = (_b = class {
    static async load() {
      return l.Module === void 0 && (l.Module = await S(() => import("./cardano_serialization_lib-pHqu9iRB.js").then(async (m2) => {
        await m2.__tla;
        return m2;
      }), [])), l.Module;
    }
  }, __publicField(_b, "Module"), _b);
  let m, x, _, y;
  B = (t) => (parseFloat(t || "1") * 1e6).toFixed();
  m = async (t) => {
    const e = await l.load(), n = await w.load();
    return e.Address.from_bytes(n.from(t, "hex")).to_bech32();
  };
  x = (t) => {
    let e = "";
    for (var n = 0, s = t.length; n < s; n++) e += t.charCodeAt(n).toString(16);
    return e;
  };
  W = Object.freeze(Object.defineProperty({
    __proto__: null,
    adaToLovelace: B,
    hexEncode: x,
    hexToBech32: m
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  _ = async (t, e) => {
    const n = await l.load(), s = n.TransactionUnspentOutputs.new(), o = n.TransactionOutputs.new();
    return e && e.forEach((a) => s.add(a)), t && t.forEach((a) => {
      o.add(n.TransactionOutput.new(n.Address.from_bech32(a.address), n.Value.new(n.BigNum.from_str(a.amount))));
    }), {
      inputs: s,
      outputs: o
    };
  };
  y = async (t, e, n, s, o = null) => {
    const a = await l.load(), c = a.TransactionBuilderConfigBuilder.new().fee_algo(a.LinearFee.new(a.BigNum.from_str(s.minFeeA.toString()), a.BigNum.from_str(s.minFeeB.toString()))).coins_per_utxo_byte(a.BigNum.from_str(s.coinsPerUtxoSize)).pool_deposit(a.BigNum.from_str(s.poolDeposit)).key_deposit(a.BigNum.from_str(s.keyDeposit)).max_value_size(s.maxValSize).max_tx_size(s.maxTxSize).prefer_pure_change(true), r = a.TransactionBuilder.new(c.build());
    o && r.set_certs(o);
    for (let d = 0; d < n.len(); d++) r.add_output(n.get(d));
    r.set_ttl(s.slot + p.invalid_hereafter), r.add_inputs_from(e, a.CoinSelectionStrategyCIP2.RandomImproveMultiAsset), r.add_change_if_needed(a.Address.from_bech32(t));
    const h = a.Transaction.new(r.build(), a.TransactionWitnessSet.new());
    if (h.to_bytes().length * 2 > s.maxTxSize) throw p.too_big;
    return h;
  };
  I = Object.freeze(Object.defineProperty({
    __proto__: null,
    buildTx: y,
    prepareTx: _
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  class N {
    constructor(e, n) {
      __publicField(this, "type");
      __publicField(this, "cardano");
      __publicField(this, "getNetwork", async () => {
        let e = await this.cardano.getNetworkId();
        return M[e];
      });
      __publicField(this, "getBalance", async () => {
        const e = await this.cardano.getBalance(), n = await l.load(), s = await w.load();
        return n.Value.from_bytes(s.from(e, "hex")).coin().to_str();
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
        const e = await this.cardano.getUtxos(), n = await l.load(), s = await w.load();
        return e.map((o) => n.TransactionUnspentOutput.from_bytes(s.from(o, "hex")));
      });
      __publicField(this, "getStakeKeyHash", async () => {
        var _a2, _b2, _c2;
        const e = await this.getRewardAddress(), n = await l.load();
        return (_c2 = (_b2 = (_a2 = n.RewardAddress.from_address(n.Address.from_bech32(e))) == null ? void 0 : _a2.payment_cred()) == null ? void 0 : _b2.to_keyhash()) == null ? void 0 : _c2.to_bytes();
      });
      __publicField(this, "signData", async (e) => {
        const n = x(e), s = this.cardano;
        return s.signData(await s.getChangeAddress(), n);
      });
      __publicField(this, "signAndSubmit", async (e) => {
        try {
          const n = await w.load(), s = await l.load(), o = n.from(e.to_bytes()), a = await this.cardano.signTx(o.toString("hex")), c = s.Transaction.new(e.body(), s.TransactionWitnessSet.from_bytes(n.from(a, "hex")));
          let r = n.from(c.to_bytes());
          return await this.cardano.submitTx(r.toString("hex"));
        } catch (n) {
          throw n.info;
        }
      });
      __publicField(this, "payTo", async (e, n, s) => this.multiSend([
        {
          address: e,
          amount: n
        }
      ], s));
      __publicField(this, "multiSend", async (e, n) => {
        try {
          const s = await this.getChangeAddress(), o = await this.getUtxos(), { inputs: a, outputs: c } = await _(e, o), r = await y(s, a, c, n);
          return await this.signAndSubmit(r);
        } catch (s) {
          throw s;
        }
      });
      __publicField(this, "delegateTo", async (e, n, s) => {
        try {
          const o = await this.getChangeAddress(), a = await this.getUtxos(), { inputs: c, outputs: r } = await _([
            {
              address: o,
              amount: n.keyDeposit
            }
          ], a), h = await this.getStakeKeyHash(), i = await l.load(), d = await w.load(), f = i.Certificates.new();
          s.active || f.add(i.Certificate.new_stake_registration(i.StakeRegistration.new(i.Credential.from_keyhash(i.Ed25519KeyHash.from_bytes(d.from(h)))))), f.add(i.Certificate.new_stake_delegation(i.StakeDelegation.new(i.Credential.from_keyhash(i.Ed25519KeyHash.from_bytes(d.from(h))), i.Ed25519KeyHash.from_bytes(d.from(e, "hex")))));
          const u = await y(o, c, r, n, f);
          return await this.signAndSubmit(u);
        } catch (o) {
          throw o;
        }
      });
      this.type = e, this.cardano = n;
    }
  }
  let k;
  k = async (t) => (t === "typhon" && (t = "typhoncip30"), await window.cardano[t].enable());
  E = (t) => {
    var _a2, _b2;
    return ((_b2 = (_a2 = window.cardano[t.toLowerCase()]) == null ? void 0 : _a2.experimental) == null ? void 0 : _b2.vespr_compat) || false;
  };
  L = (_c = class {
    static isSupported(e) {
      return e === "VESPR" ? true : g.includes(e);
    }
    static fromVespr() {
      return g.filter(E);
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
      const n = e.toLowerCase(), s = `${n}Object`;
      if (this[s] === void 0 || !await this.isEnabled(e)) try {
        this[s] = new N(e, await k(n));
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
  $ = window.cardanoPressMessages || {
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
  O = () => {
    const t = localStorage.getItem("_x_connectedExtension") || "";
    return t === "" ? "" : `${t}${E(t) ? "(VESPR Compat)" : ""}`;
  };
  D = (t) => localStorage.setItem("_x_connectedExtension", t);
  K = () => (localStorage.getItem("_x_isNotified") || "false") === "true";
  q = (t) => localStorage.setItem("_x_isNotified", t);
  P = (t) => new Promise((e) => {
    if (document.querySelector(t)) return e(document.querySelector(t));
    const n = new MutationObserver(() => {
      document.querySelector(t) && (e(document.querySelector(t)), n.disconnect());
    });
    n.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
  j = () => {
    const t = () => Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
    return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t();
  };
  z = (t) => {
    window.dispatchEvent(new CustomEvent("cardanoPress:addNotice", {
      detail: t
    }));
  };
  R = (t) => {
    window.dispatchEvent(new CustomEvent("cardanoPress:removeNotice", {
      detail: t
    }));
  };
  U = async () => {
    const t = O();
    if (!t) throw "Not connected to a wallet";
    return await L.getWallet(t);
  };
  F = Object.freeze(Object.defineProperty({
    __proto__: null,
    addNotice: z,
    generateUuid: j,
    getConnectedWallet: U,
    removeNotice: R,
    waitElement: P
  }, Symbol.toStringTag, {
    value: "Module"
  }));
})();
export {
  w as B,
  l as C,
  L as E,
  __tla,
  z as a,
  q as b,
  $ as c,
  V as d,
  g as e,
  O as f,
  U as g,
  E as h,
  K as i,
  F as j,
  j as k,
  B as l,
  P as m,
  R as r,
  D as s,
  W as u,
  I as w
};
