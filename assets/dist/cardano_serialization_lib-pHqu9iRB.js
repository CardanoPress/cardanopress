let L, VG, A, le, G, v_, a_, B, ae, Qe, _r, K, y, yt, m_, k_, AG, bt, ut, x_, ft, DG, KG, UG, Y, aH, Kt, or, j_, BG, s_, It, z_, Ut, ge, i_, kt, _H, x, Ft, F_, R_, H, O_, sH, Dt, Tt, q_, Ge, Yt, Ee, q, P, pt, er, Rt, nt, Ke, ce, ze, Oe, wr, rr, d_, ue, Qt, we, $_, rt, U, Se, IG, Nt, c_, Ct, He, X, L_, J_, Ae, fe, D, ZG, qe, Ie, De, EG, nH, Y_, br, HG, se, he, lt, Gt, Te, $e, We, Vt, Q_, N, X_, W, eH, Ht, E, Pt, TG, be, Bt, t_, y_, p_, Le, vt, O, oH, NG, it, ye, Je, M, me, St, tt, At, Ye, nr, Z_, ve, U_, E_, K_, S_, mt, W_, ot, at, Xt, iH, st, ct, WG, Wt, Zt, tH, M_, T, G_, H_, A_, u_, Q, SG, I_, D_, T_, xt, MG, N_, C_, V_, P_, jt, zt, B_, te, lr, __, e_, Ot, fr, hr, _e, V, gr, Ce, et, dt, Z, S, J, GG, Fe, I, w_, pe, b_, CG, qt, de, ht, l_, ke, r_, Ne, ar, k, ee, n_, $t, f_, ie, R, je, _t, ur, Lt, re, ne, rH, oe, C, PG, Me, sr, gt, g_, Jt, ir, Et, Mt, dr, zs, Cs, Ss, Ts, ri, Rs, si, ci, Qs, ii, Hs, As, Ys, Zs, Ps, Ws, ei, Ks, Es, Vs, ti, $s, Os, Xs, di, ai, Js, Ms, oi, Fs, Ns, Bs, Ds, ps, _i, qs, Gs, pi, ms, Us, js, Ls, Is, ni, bi, hs, xs, ys, ks, vs, wi, lG, wG, vG, kG, hG, jG, yG, mG, QG, fG, xG, JG, LG, XG, OG, qG, $G, zG, FG, RG, YG, bG, uG, gG;
let __tla = (async () => {
  const ds = "//unpkg.com/@emurgo/cardano-serialization-lib-browser@14.1.1/cardano_serialization_lib_bg.wasm", cs = async (b = {}, t) => {
    let e;
    if (t.startsWith("data:")) {
      const a = t.replace(/^data:.*?base64,/, "");
      let n;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") n = Buffer.from(a, "base64");
      else if (typeof atob == "function") {
        const r = atob(a);
        n = new Uint8Array(r.length);
        for (let d = 0; d < r.length; d++) n[d] = r.charCodeAt(d);
      } else throw new Error("Cannot decode base64-encoded data URL");
      e = await WebAssembly.instantiate(n, b);
    } else {
      const a = await fetch(t), n = a.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && n.startsWith("application/wasm")) e = await WebAssembly.instantiateStreaming(a, b);
      else {
        const r = await a.arrayBuffer();
        e = await WebAssembly.instantiate(r, b);
      }
    }
    return e.instance.exports;
  };
  let _;
  ps = function(b) {
    _ = b;
  };
  const o_ = new Array(128).fill(void 0);
  o_.push(void 0, null, true, false);
  let Ue = o_.length;
  function $(b) {
    Ue === o_.length && o_.push(o_.length + 1);
    const t = Ue;
    return Ue = o_[t], o_[t] = b, t;
  }
  function F(b) {
    return o_[b];
  }
  function ws(b) {
    b < 132 || (o_[b] = Ue, Ue = b);
  }
  function c(b) {
    const t = F(b);
    return ws(b), t;
  }
  const bs = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
  let _s = new bs("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  _s.decode();
  let Ve = null;
  function Re() {
    return (Ve === null || Ve.byteLength === 0) && (Ve = new Uint8Array(_.memory.buffer)), Ve;
  }
  function f(b, t) {
    return b = b >>> 0, _s.decode(Re().subarray(b, b + t));
  }
  let g = 0;
  const ls = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
  let tr = new ls("utf-8");
  const gs = typeof tr.encodeInto == "function" ? function(b, t) {
    return tr.encodeInto(b, t);
  } : function(b, t) {
    const e = tr.encode(b);
    return t.set(e), {
      read: b.length,
      written: e.length
    };
  };
  function u(b, t, e) {
    if (e === void 0) {
      const i = tr.encode(b), l = t(i.length, 1) >>> 0;
      return Re().subarray(l, l + i.length).set(i), g = i.length, l;
    }
    let a = b.length, n = t(a, 1) >>> 0;
    const r = Re();
    let d = 0;
    for (; d < a; d++) {
      const i = b.charCodeAt(d);
      if (i > 127) break;
      r[n + d] = i;
    }
    if (d !== a) {
      d !== 0 && (b = b.slice(d)), n = e(n, a, a = d + b.length * 3, 1) >>> 0;
      const i = Re().subarray(n + d, n + a), l = gs(b, i);
      d += l.written, n = e(n, a, d, 1) >>> 0;
    }
    return g = d, n;
  }
  function wt(b) {
    return b == null;
  }
  let Pe = null;
  function o() {
    return (Pe === null || Pe.byteLength === 0) && (Pe = new Int32Array(_.memory.buffer)), Pe;
  }
  function pr(b) {
    const t = typeof b;
    if (t == "number" || t == "boolean" || b == null) return `${b}`;
    if (t == "string") return `"${b}"`;
    if (t == "symbol") {
      const n = b.description;
      return n == null ? "Symbol" : `Symbol(${n})`;
    }
    if (t == "function") {
      const n = b.name;
      return typeof n == "string" && n.length > 0 ? `Function(${n})` : "Function";
    }
    if (Array.isArray(b)) {
      const n = b.length;
      let r = "[";
      n > 0 && (r += pr(b[0]));
      for (let d = 1; d < n; d++) r += ", " + pr(b[d]);
      return r += "]", r;
    }
    const e = /\[object ([^\]]+)\]/.exec(toString.call(b));
    let a;
    if (e.length > 1) a = e[1];
    else return toString.call(b);
    if (a == "Object") try {
      return "Object(" + JSON.stringify(b) + ")";
    } catch {
      return "Object";
    }
    return b instanceof Error ? `${b.name}: ${b.message}
${b.stack}` : a;
  }
  function v(b, t) {
    return b = b >>> 0, Re().subarray(b / 1, b / 1 + t);
  }
  function h(b, t) {
    const e = t(b.length * 1, 1) >>> 0;
    return Re().set(b, e / 1), g = b.length, e;
  }
  function w(b, t) {
    if (!(b instanceof t)) throw new Error(`expected instance of ${t.name}`);
    return b.ptr;
  }
  let Be = null;
  function es() {
    return (Be === null || Be.byteLength === 0) && (Be = new Uint32Array(_.memory.buffer)), Be;
  }
  function cr(b, t) {
    return b = b >>> 0, es().subarray(b / 4, b / 4 + t);
  }
  wG = function(b, t, e) {
    try {
      const d = _.__wbindgen_add_to_stack_pointer(-16);
      w(b, L), w(t, de), w(e, Ce), _.create_send_all(d, b.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
      var a = o()[d / 4 + 0], n = o()[d / 4 + 1], r = o()[d / 4 + 2];
      if (r) throw c(n);
      return hr.__wrap(a);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  };
  bG = function(b, t) {
    try {
      const r = _.__wbindgen_add_to_stack_pointer(-16);
      w(b, Ot), w(t, De), _.min_fee(r, b.__wbg_ptr, t.__wbg_ptr);
      var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
      if (n) throw c(a);
      return y.__wrap(e);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  };
  lG = function(b, t) {
    try {
      const r = _.__wbindgen_add_to_stack_pointer(-16);
      w(b, nt), w(t, Rt), _.calculate_ex_units_ceil_cost(r, b.__wbg_ptr, t.__wbg_ptr);
      var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
      if (n) throw c(a);
      return y.__wrap(e);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  };
  gG = function(b, t) {
    try {
      const r = _.__wbindgen_add_to_stack_pointer(-16);
      w(b, Ot), w(t, Rt), _.min_script_fee(r, b.__wbg_ptr, t.__wbg_ptr);
      var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
      if (n) throw c(a);
      return y.__wrap(e);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  };
  uG = function(b, t) {
    try {
      const r = _.__wbindgen_add_to_stack_pointer(-16);
      w(t, k), _.min_ref_script_fee(r, b, t.__wbg_ptr);
      var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
      if (n) throw c(a);
      return y.__wrap(e);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  };
  fG = function(b, t) {
    try {
      const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(b, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
      _.encode_json_str_to_plutus_datum(r, d, i, t);
      var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
      if (n) throw c(a);
      return O.__wrap(e);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  };
  hG = function(b, t) {
    let e, a;
    try {
      const m = _.__wbindgen_add_to_stack_pointer(-16);
      w(b, O), _.decode_plutus_datum_to_json_str(m, b.__wbg_ptr, t);
      var n = o()[m / 4 + 0], r = o()[m / 4 + 1], d = o()[m / 4 + 2], i = o()[m / 4 + 3], l = n, p = r;
      if (i) throw l = 0, p = 0, c(d);
      return e = l, a = p, f(l, p);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
    }
  };
  yG = function(b) {
    const t = h(b, _.__wbindgen_malloc), e = g, a = _.encode_arbitrary_bytes_as_metadatum(t, e);
    return J.__wrap(a);
  };
  vG = function(b) {
    try {
      const d = _.__wbindgen_add_to_stack_pointer(-16);
      w(b, J), _.decode_arbitrary_bytes_from_metadatum(d, b.__wbg_ptr);
      var t = o()[d / 4 + 0], e = o()[d / 4 + 1], a = o()[d / 4 + 2], n = o()[d / 4 + 3];
      if (n) throw c(a);
      var r = v(t, e).slice();
      return _.__wbindgen_free(t, e * 1, 1), r;
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  };
  mG = function(b, t) {
    try {
      const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(b, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
      _.encode_json_str_to_metadatum(r, d, i, t);
      var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
      if (n) throw c(a);
      return J.__wrap(e);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  };
  kG = function(b, t) {
    let e, a;
    try {
      const m = _.__wbindgen_add_to_stack_pointer(-16);
      w(b, J), _.decode_metadatum_to_json_str(m, b.__wbg_ptr, t);
      var n = o()[m / 4 + 0], r = o()[m / 4 + 1], d = o()[m / 4 + 2], i = o()[m / 4 + 3], l = n, p = r;
      if (i) throw l = 0, p = 0, c(d);
      return e = l, a = p, f(l, p);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
    }
  };
  xG = function(b, t, e, a) {
    let n, r;
    try {
      const z = _.__wbindgen_add_to_stack_pointer(-16), Xe = u(b, _.__wbindgen_malloc, _.__wbindgen_realloc), Ze = g, rs = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), ns = g, os = u(e, _.__wbindgen_malloc, _.__wbindgen_realloc), as = g, ss = u(a, _.__wbindgen_malloc, _.__wbindgen_realloc), is = g;
      _.encrypt_with_password(z, Xe, Ze, rs, ns, os, as, ss, is);
      var d = o()[z / 4 + 0], i = o()[z / 4 + 1], l = o()[z / 4 + 2], p = o()[z / 4 + 3], m = d, j = i;
      if (p) throw m = 0, j = 0, c(l);
      return n = m, r = j, f(m, j);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(n, r, 1);
    }
  };
  jG = function(b, t) {
    let e, a;
    try {
      const m = _.__wbindgen_add_to_stack_pointer(-16), j = u(b, _.__wbindgen_malloc, _.__wbindgen_realloc), z = g, Xe = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), Ze = g;
      _.decrypt_with_password(m, j, z, Xe, Ze);
      var n = o()[m / 4 + 0], r = o()[m / 4 + 1], d = o()[m / 4 + 2], i = o()[m / 4 + 3], l = n, p = r;
      if (i) throw l = 0, p = 0, c(d);
      return e = l, a = p, f(l, p);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
    }
  };
  zG = function(b, t, e) {
    w(b, dt), w(t, ft), w(e, Ie);
    const a = _.make_daedalus_bootstrap_witness(b.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
    return ut.__wrap(a);
  };
  FG = function(b, t, e) {
    w(b, dt), w(t, ft), w(e, yt);
    const a = _.make_icarus_bootstrap_witness(b.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
    return ut.__wrap(a);
  };
  RG = function(b, t) {
    w(b, dt), w(t, mt);
    const e = _.make_vkey_witness(b.__wbg_ptr, t.__wbg_ptr);
    return Lt.__wrap(e);
  };
  OG = function(b) {
    w(b, B);
    const t = _.hash_auxiliary_data(b.__wbg_ptr);
    return ae.__wrap(t);
  };
  qG = function(b) {
    w(b, O);
    const t = _.hash_plutus_data(b.__wbg_ptr);
    return Yt.__wrap(t);
  };
  $G = function(b, t, e) {
    w(b, Wt), w(t, kt);
    let a = 0;
    wt(e) || (w(e, it), a = e.__destroy_into_raw());
    const n = _.hash_script_data(b.__wbg_ptr, t.__wbg_ptr, a);
    return u_.__wrap(n);
  };
  LG = function(b, t, e) {
    try {
      const d = _.__wbindgen_add_to_stack_pointer(-16);
      w(b, V), w(t, y), w(e, y), _.get_implicit_input(d, b.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
      var a = o()[d / 4 + 0], n = o()[d / 4 + 1], r = o()[d / 4 + 2];
      if (r) throw c(n);
      return R.__wrap(a);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  };
  JG = function(b, t, e) {
    try {
      const d = _.__wbindgen_add_to_stack_pointer(-16);
      w(b, V), w(t, y), w(e, y), _.get_deposit(d, b.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
      var a = o()[d / 4 + 0], n = o()[d / 4 + 1], r = o()[d / 4 + 2];
      if (r) throw c(n);
      return y.__wrap(a);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  };
  YG = function(b, t) {
    try {
      const r = _.__wbindgen_add_to_stack_pointer(-16);
      w(b, I), w(t, Ge), _.min_ada_for_output(r, b.__wbg_ptr, t.__wbg_ptr);
      var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
      if (n) throw c(a);
      return y.__wrap(e);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  };
  QG = function(b, t, e) {
    try {
      const d = _.__wbindgen_add_to_stack_pointer(-16), i = u(b, _.__wbindgen_malloc, _.__wbindgen_realloc), l = g, p = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), m = g;
      _.encode_json_str_to_native_script(d, i, l, p, m, e);
      var a = o()[d / 4 + 0], n = o()[d / 4 + 1], r = o()[d / 4 + 2];
      if (r) throw c(n);
      return W.__wrap(a);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  };
  XG = function(b) {
    try {
      const n = _.__wbindgen_add_to_stack_pointer(-16), r = h(b, _.__wbindgen_malloc), d = g;
      _.has_transaction_set_tag(n, r, d);
      var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
      if (a) throw c(e);
      return t;
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  };
  function us(b, t) {
    const e = t(b.length * 4, 4) >>> 0;
    return es().set(b, e / 4), g = b.length, e;
  }
  function h_(b, t) {
    try {
      return b.apply(this, t);
    } catch (e) {
      _.__wbindgen_exn_store($(e));
    }
  }
  let yr;
  ZG = Object.freeze({
    PlutusV1: 0,
    0: "PlutusV1",
    PlutusV2: 1,
    1: "PlutusV2",
    PlutusV3: 2,
    2: "PlutusV3"
  });
  UG = Object.freeze({
    Tagged: 0,
    0: "Tagged",
    Untagged: 1,
    1: "Untagged"
  });
  EG = Object.freeze({
    ToOtherPot: 0,
    0: "ToOtherPot",
    ToStakeCredentials: 1,
    1: "ToStakeCredentials"
  });
  KG = Object.freeze({
    Array: 0,
    0: "Array",
    Map: 1,
    1: "Map"
  });
  SG = Object.freeze({
    NativeScript: 0,
    0: "NativeScript",
    PlutusScript: 1,
    1: "PlutusScript",
    PlutusScriptV2: 2,
    2: "PlutusScriptV2",
    PlutusScriptV3: 3,
    3: "PlutusScriptV3"
  });
  WG = Object.freeze({
    Spend: 0,
    0: "Spend",
    Mint: 1,
    1: "Mint",
    Cert: 2,
    2: "Cert",
    Reward: 3,
    3: "Reward",
    Vote: 4,
    4: "Vote",
    VotingProposal: 5,
    5: "VotingProposal"
  });
  MG = Object.freeze({
    Wallet: 0,
    0: "Wallet",
    Node: 1,
    1: "Node"
  });
  GG = Object.freeze({
    MetadataMap: 0,
    0: "MetadataMap",
    MetadataList: 1,
    1: "MetadataList",
    Int: 2,
    2: "Int",
    Bytes: 3,
    3: "Bytes",
    Text: 4,
    4: "Text"
  });
  HG = Object.freeze({
    NoConversions: 0,
    0: "NoConversions",
    BasicConversions: 1,
    1: "BasicConversions",
    DetailedSchema: 2,
    2: "DetailedSchema"
  });
  AG = Object.freeze({
    Byron: 0,
    0: "Byron",
    Shelley: 1,
    1: "Shelley",
    Allegra: 2,
    2: "Allegra",
    Mary: 3,
    3: "Mary",
    Alonzo: 4,
    4: "Alonzo",
    Babbage: 5,
    5: "Babbage",
    Conway: 6,
    6: "Conway",
    Unknown: 7,
    7: "Unknown"
  });
  IG = Object.freeze({
    ParameterChangeAction: 0,
    0: "ParameterChangeAction",
    HardForkInitiationAction: 1,
    1: "HardForkInitiationAction",
    TreasuryWithdrawalsAction: 2,
    2: "TreasuryWithdrawalsAction",
    NoConfidenceAction: 3,
    3: "NoConfidenceAction",
    UpdateCommitteeAction: 4,
    4: "UpdateCommitteeAction",
    NewConstitutionAction: 5,
    5: "NewConstitutionAction",
    InfoAction: 6,
    6: "InfoAction"
  });
  DG = Object.freeze({
    ATPubKey: 0,
    0: "ATPubKey",
    ATScript: 1,
    1: "ATScript",
    ATRedeem: 2,
    2: "ATRedeem"
  });
  TG = Object.freeze({
    Testnet: 0,
    0: "Testnet",
    Mainnet: 1,
    1: "Mainnet"
  });
  NG = Object.freeze({
    BasicConversions: 0,
    0: "BasicConversions",
    DetailedSchema: 1,
    1: "DetailedSchema"
  });
  CG = Object.freeze({
    AllSetsHaveTag: 0,
    0: "AllSetsHaveTag",
    AllSetsHaveNoTag: 1,
    1: "AllSetsHaveNoTag",
    MixedSets: 2,
    2: "MixedSets"
  });
  VG = Object.freeze({
    Base: 0,
    0: "Base",
    Pointer: 1,
    1: "Pointer",
    Enterprise: 2,
    2: "Enterprise",
    Reward: 3,
    3: "Reward",
    Byron: 4,
    4: "Byron",
    Malformed: 5,
    5: "Malformed"
  });
  PG = Object.freeze({
    ConstitutionalCommitteeHotKeyHash: 0,
    0: "ConstitutionalCommitteeHotKeyHash",
    ConstitutionalCommitteeHotScriptHash: 1,
    1: "ConstitutionalCommitteeHotScriptHash",
    DRepKeyHash: 2,
    2: "DRepKeyHash",
    DRepScriptHash: 3,
    3: "DRepScriptHash",
    StakingPoolKeyHash: 4,
    4: "StakingPoolKeyHash"
  });
  BG = Object.freeze({
    LargestFirst: 0,
    0: "LargestFirst",
    RandomImprove: 1,
    1: "RandomImprove",
    LargestFirstMultiAsset: 2,
    2: "LargestFirstMultiAsset",
    RandomImproveMultiAsset: 3,
    3: "RandomImproveMultiAsset"
  });
  tH = Object.freeze({
    SingleHostAddr: 0,
    0: "SingleHostAddr",
    SingleHostName: 1,
    1: "SingleHostName",
    MultiHostName: 2,
    2: "MultiHostName"
  });
  _H = Object.freeze({
    Key: 0,
    0: "Key",
    Script: 1,
    1: "Script"
  });
  eH = Object.freeze({
    ScriptPubkey: 0,
    0: "ScriptPubkey",
    ScriptAll: 1,
    1: "ScriptAll",
    ScriptAny: 2,
    2: "ScriptAny",
    ScriptNOfK: 3,
    3: "ScriptNOfK",
    TimelockStart: 4,
    4: "TimelockStart",
    TimelockExpiry: 5,
    5: "TimelockExpiry"
  });
  rH = Object.freeze({
    No: 0,
    0: "No",
    Yes: 1,
    1: "Yes",
    Abstain: 2,
    2: "Abstain"
  });
  nH = Object.freeze({
    Reserves: 0,
    0: "Reserves",
    Treasury: 1,
    1: "Treasury"
  });
  oH = Object.freeze({
    ConstrPlutusData: 0,
    0: "ConstrPlutusData",
    Map: 1,
    1: "Map",
    List: 2,
    2: "List",
    Integer: 3,
    3: "Integer",
    Bytes: 4,
    4: "Bytes"
  });
  aH = Object.freeze({
    StakeRegistration: 0,
    0: "StakeRegistration",
    StakeDeregistration: 1,
    1: "StakeDeregistration",
    StakeDelegation: 2,
    2: "StakeDelegation",
    PoolRegistration: 3,
    3: "PoolRegistration",
    PoolRetirement: 4,
    4: "PoolRetirement",
    GenesisKeyDelegation: 5,
    5: "GenesisKeyDelegation",
    MoveInstantaneousRewardsCert: 6,
    6: "MoveInstantaneousRewardsCert",
    CommitteeHotAuth: 7,
    7: "CommitteeHotAuth",
    CommitteeColdResign: 8,
    8: "CommitteeColdResign",
    DRepDeregistration: 9,
    9: "DRepDeregistration",
    DRepRegistration: 10,
    10: "DRepRegistration",
    DRepUpdate: 11,
    11: "DRepUpdate",
    StakeAndVoteDelegation: 12,
    12: "StakeAndVoteDelegation",
    StakeRegistrationAndDelegation: 13,
    13: "StakeRegistrationAndDelegation",
    StakeVoteRegistrationAndDelegation: 14,
    14: "StakeVoteRegistrationAndDelegation",
    VoteDelegation: 15,
    15: "VoteDelegation",
    VoteRegistrationAndDelegation: 16,
    16: "VoteRegistrationAndDelegation"
  });
  sH = Object.freeze({
    KeyHash: 0,
    0: "KeyHash",
    ScriptHash: 1,
    1: "ScriptHash",
    AlwaysAbstain: 2,
    2: "AlwaysAbstain",
    AlwaysNoConfidence: 3,
    3: "AlwaysNoConfidence"
  });
  yr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_address_free(b >>> 0));
  L = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(L.prototype);
      return e.__wbg_ptr = t, yr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, yr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_address_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.address_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return L.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.address_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.address_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.address_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return L.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    kind() {
      return _.address_kind(this.__wbg_ptr);
    }
    payment_cred() {
      const t = _.address_payment_cred(this.__wbg_ptr);
      return t === 0 ? void 0 : x.__wrap(t);
    }
    is_malformed() {
      return _.address_is_malformed(this.__wbg_ptr) !== 0;
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.address_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.address_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return L.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.address_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(t) {
      let e, a;
      try {
        const z = _.__wbindgen_add_to_stack_pointer(-16);
        var n = wt(t) ? 0 : u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), r = g;
        _.address_to_bech32(z, this.__wbg_ptr, n, r);
        var d = o()[z / 4 + 0], i = o()[z / 4 + 1], l = o()[z / 4 + 2], p = o()[z / 4 + 3], m = d, j = i;
        if (p) throw m = 0, j = 0, c(l);
        return e = m, a = j, f(m, j);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.address_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return L.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    network_id() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.address_network_id(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return t;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const vr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_anchor_free(b >>> 0));
  A = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(A.prototype);
      return e.__wbg_ptr = t, vr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, vr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_anchor_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchor_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.anchor_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return A.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchor_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.anchor_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return A.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchor_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchor_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.anchor_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return A.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    url() {
      const t = _.anchor_url(this.__wbg_ptr);
      return ar.__wrap(t);
    }
    anchor_data_hash() {
      const t = _.anchor_anchor_data_hash(this.__wbg_ptr);
      return le.__wrap(t);
    }
    static new(t, e) {
      w(t, ar), w(e, le);
      const a = _.anchor_new(t.__wbg_ptr, e.__wbg_ptr);
      return A.__wrap(a);
    }
  };
  const mr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_anchordatahash_free(b >>> 0));
  le = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(le.prototype);
      return e.__wbg_ptr = t, mr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, mr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_anchordatahash_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.anchordatahash_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return le.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(t) {
      let e, a;
      try {
        const m = _.__wbindgen_add_to_stack_pointer(-16), j = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), z = g;
        _.anchordatahash_to_bech32(m, this.__wbg_ptr, j, z);
        var n = o()[m / 4 + 0], r = o()[m / 4 + 1], d = o()[m / 4 + 2], i = o()[m / 4 + 3], l = n, p = r;
        if (i) throw l = 0, p = 0, c(d);
        return e = l, a = p, f(l, p);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.anchordatahash_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return le.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.anchordatahash_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return le.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const kr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_assetname_free(b >>> 0));
  G = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(G.prototype);
      return e.__wbg_ptr = t, kr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, kr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_assetname_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.assetname_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.assetname_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return G.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.assetname_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.assetname_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return G.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.assetname_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.assetname_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.assetname_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return G.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.assetname_new(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return G.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    name() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.assetname_name(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const xr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_assetnames_free(b >>> 0));
  v_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(v_.prototype);
      return e.__wbg_ptr = t, xr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, xr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_assetnames_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.assetnames_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.assetnames_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return v_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.assetnames_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.assetnames_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return v_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.assetnames_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.assetnames_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.assetnames_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return v_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.assetnames_new();
      return v_.__wrap(t);
    }
    len() {
      return _.assetnames_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.assetnames_get(this.__wbg_ptr, t);
      return G.__wrap(e);
    }
    add(t) {
      w(t, G), _.assetnames_add(this.__wbg_ptr, t.__wbg_ptr);
    }
  };
  const jr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_assets_free(b >>> 0));
  a_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(a_.prototype);
      return e.__wbg_ptr = t, jr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, jr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_assets_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.assets_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.assets_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return a_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.assets_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.assets_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return a_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.assets_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.assets_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.assets_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return a_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.assets_new();
      return a_.__wrap(t);
    }
    len() {
      return _.assetnames_len(this.__wbg_ptr) >>> 0;
    }
    insert(t, e) {
      w(t, G), w(e, y);
      const a = _.assets_insert(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
      return a === 0 ? void 0 : y.__wrap(a);
    }
    get(t) {
      w(t, G);
      const e = _.assets_get(this.__wbg_ptr, t.__wbg_ptr);
      return e === 0 ? void 0 : y.__wrap(e);
    }
    keys() {
      const t = _.assets_keys(this.__wbg_ptr);
      return v_.__wrap(t);
    }
  };
  const zr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_auxiliarydata_free(b >>> 0));
  B = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(B.prototype);
      return e.__wbg_ptr = t, zr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, zr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_auxiliarydata_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.auxiliarydata_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.auxiliarydata_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return B.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.auxiliarydata_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.auxiliarydata_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return B.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.auxiliarydata_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.auxiliarydata_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.auxiliarydata_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return B.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.auxiliarydata_new();
      return B.__wrap(t);
    }
    metadata() {
      const t = _.auxiliarydata_metadata(this.__wbg_ptr);
      return t === 0 ? void 0 : d_.__wrap(t);
    }
    set_metadata(t) {
      w(t, d_), _.auxiliarydata_set_metadata(this.__wbg_ptr, t.__wbg_ptr);
    }
    native_scripts() {
      const t = _.auxiliarydata_native_scripts(this.__wbg_ptr);
      return t === 0 ? void 0 : E.__wrap(t);
    }
    set_native_scripts(t) {
      w(t, E), _.auxiliarydata_set_native_scripts(this.__wbg_ptr, t.__wbg_ptr);
    }
    plutus_scripts() {
      const t = _.auxiliarydata_plutus_scripts(this.__wbg_ptr);
      return t === 0 ? void 0 : St.__wrap(t);
    }
    set_plutus_scripts(t) {
      w(t, St), _.auxiliarydata_set_plutus_scripts(this.__wbg_ptr, t.__wbg_ptr);
    }
    prefer_alonzo_format() {
      return _.auxiliarydata_prefer_alonzo_format(this.__wbg_ptr) !== 0;
    }
    set_prefer_alonzo_format(t) {
      _.auxiliarydata_set_prefer_alonzo_format(this.__wbg_ptr, t);
    }
  };
  const Fr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_auxiliarydatahash_free(b >>> 0));
  ae = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ae.prototype);
      return e.__wbg_ptr = t, Fr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Fr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_auxiliarydatahash_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.auxiliarydatahash_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ae.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(t) {
      let e, a;
      try {
        const m = _.__wbindgen_add_to_stack_pointer(-16), j = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), z = g;
        _.anchordatahash_to_bech32(m, this.__wbg_ptr, j, z);
        var n = o()[m / 4 + 0], r = o()[m / 4 + 1], d = o()[m / 4 + 2], i = o()[m / 4 + 3], l = n, p = r;
        if (i) throw l = 0, p = 0, c(d);
        return e = l, a = p, f(l, p);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.auxiliarydatahash_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ae.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.auxiliarydatahash_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ae.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Rr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_auxiliarydataset_free(b >>> 0));
  Qe = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Qe.prototype);
      return e.__wbg_ptr = t, Rr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Rr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_auxiliarydataset_free(t);
    }
    static new() {
      const t = _.auxiliarydataset_new();
      return Qe.__wrap(t);
    }
    len() {
      return _.auxiliarydataset_len(this.__wbg_ptr) >>> 0;
    }
    insert(t, e) {
      w(e, B);
      const a = _.auxiliarydataset_insert(this.__wbg_ptr, t, e.__wbg_ptr);
      return a === 0 ? void 0 : B.__wrap(a);
    }
    get(t) {
      const e = _.auxiliarydataset_get(this.__wbg_ptr, t);
      return e === 0 ? void 0 : B.__wrap(e);
    }
    indices() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.auxiliarydataset_indices(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = cr(t, e).slice();
        return _.__wbindgen_free(t, e * 4, 4), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Or = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_baseaddress_free(b >>> 0));
  _r = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(_r.prototype);
      return e.__wbg_ptr = t, Or.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Or.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_baseaddress_free(t);
    }
    static new(t, e, a) {
      w(e, x), w(a, x);
      const n = _.baseaddress_new(t, e.__wbg_ptr, a.__wbg_ptr);
      return _r.__wrap(n);
    }
    payment_cred() {
      const t = _.baseaddress_payment_cred(this.__wbg_ptr);
      return x.__wrap(t);
    }
    stake_cred() {
      const t = _.baseaddress_stake_cred(this.__wbg_ptr);
      return x.__wrap(t);
    }
    to_address() {
      const t = _.baseaddress_to_address(this.__wbg_ptr);
      return L.__wrap(t);
    }
    static from_address(t) {
      w(t, L);
      const e = _.baseaddress_from_address(t.__wbg_ptr);
      return e === 0 ? void 0 : _r.__wrap(e);
    }
    network_id() {
      return _.baseaddress_network_id(this.__wbg_ptr);
    }
  };
  const qr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_bigint_free(b >>> 0));
  K = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(K.prototype);
      return e.__wbg_ptr = t, qr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, qr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_bigint_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.bigint_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.bigint_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return K.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.bigint_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.bigint_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return K.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.bigint_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.bigint_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.bigint_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return K.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    is_zero() {
      return _.bigint_is_zero(this.__wbg_ptr) !== 0;
    }
    as_u64() {
      const t = _.bigint_as_u64(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    as_int() {
      const t = _.bigint_as_int(this.__wbg_ptr);
      return t === 0 ? void 0 : X.__wrap(t);
    }
    static from_str(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.bigint_from_str(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return K.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_str() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.bigint_to_str(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    add(t) {
      w(t, K);
      const e = _.bigint_add(this.__wbg_ptr, t.__wbg_ptr);
      return K.__wrap(e);
    }
    sub(t) {
      w(t, K);
      const e = _.bigint_sub(this.__wbg_ptr, t.__wbg_ptr);
      return K.__wrap(e);
    }
    mul(t) {
      w(t, K);
      const e = _.bigint_mul(this.__wbg_ptr, t.__wbg_ptr);
      return K.__wrap(e);
    }
    pow(t) {
      const e = _.bigint_pow(this.__wbg_ptr, t);
      return K.__wrap(e);
    }
    static one() {
      const t = _.bigint_one();
      return K.__wrap(t);
    }
    static zero() {
      const t = _.bigint_zero();
      return K.__wrap(t);
    }
    abs() {
      const t = _.bigint_abs(this.__wbg_ptr);
      return K.__wrap(t);
    }
    increment() {
      const t = _.bigint_increment(this.__wbg_ptr);
      return K.__wrap(t);
    }
    div_ceil(t) {
      w(t, K);
      const e = _.bigint_div_ceil(this.__wbg_ptr, t.__wbg_ptr);
      return K.__wrap(e);
    }
    div_floor(t) {
      w(t, K);
      const e = _.bigint_div_floor(this.__wbg_ptr, t.__wbg_ptr);
      return K.__wrap(e);
    }
  };
  const $r = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_bignum_free(b >>> 0));
  y = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(y.prototype);
      return e.__wbg_ptr = t, $r.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, $r.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_bignum_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.bignum_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.bignum_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return y.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.bignum_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.bignum_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return y.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.bignum_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.bignum_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.bignum_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return y.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_str(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.bignum_from_str(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return y.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_str() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.bignum_to_str(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static zero() {
      const t = _.bignum_zero();
      return y.__wrap(t);
    }
    static one() {
      const t = _.bignum_one();
      return y.__wrap(t);
    }
    is_zero() {
      return _.bignum_is_zero(this.__wbg_ptr) !== 0;
    }
    div_floor(t) {
      w(t, y);
      const e = _.bignum_div_floor(this.__wbg_ptr, t.__wbg_ptr);
      return y.__wrap(e);
    }
    checked_mul(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, y), _.bignum_checked_mul(r, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return y.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    checked_add(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, y), _.bignum_checked_add(r, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return y.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    checked_sub(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, y), _.bignum_checked_sub(r, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return y.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    clamped_sub(t) {
      w(t, y);
      const e = _.bignum_clamped_sub(this.__wbg_ptr, t.__wbg_ptr);
      return y.__wrap(e);
    }
    compare(t) {
      return w(t, y), _.bignum_compare(this.__wbg_ptr, t.__wbg_ptr);
    }
    less_than(t) {
      return w(t, y), _.bignum_less_than(this.__wbg_ptr, t.__wbg_ptr) !== 0;
    }
    static max_value() {
      const t = _.bignum_max_value();
      return y.__wrap(t);
    }
    static max(t, e) {
      w(t, y), w(e, y);
      const a = _.bignum_max(t.__wbg_ptr, e.__wbg_ptr);
      return y.__wrap(a);
    }
  };
  const Lr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_bip32privatekey_free(b >>> 0));
  yt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(yt.prototype);
      return e.__wbg_ptr = t, Lr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Lr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_bip32privatekey_free(t);
    }
    derive(t) {
      const e = _.bip32privatekey_derive(this.__wbg_ptr, t);
      return yt.__wrap(e);
    }
    static from_128_xprv(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.bip32privatekey_from_128_xprv(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return yt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_128_xprv() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.bip32privatekey_to_128_xprv(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static generate_ed25519_bip32() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.bip32privatekey_generate_ed25519_bip32(n);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return yt.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_raw_key() {
      const t = _.bip32privatekey_to_raw_key(this.__wbg_ptr);
      return mt.__wrap(t);
    }
    to_public() {
      const t = _.bip32privatekey_to_public(this.__wbg_ptr);
      return m_.__wrap(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.bip32privatekey_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return yt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.bip32privatekey_as_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.bip32privatekey_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return yt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.bip32privatekey_to_bech32(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_bip39_entropy(t, e) {
      const a = h(t, _.__wbindgen_malloc), n = g, r = h(e, _.__wbindgen_malloc), d = g, i = _.bip32privatekey_from_bip39_entropy(a, n, r, d);
      return yt.__wrap(i);
    }
    chaincode() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.bip32privatekey_chaincode(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.bip32privatekey_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.bip32privatekey_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return yt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Jr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_bip32publickey_free(b >>> 0));
  m_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(m_.prototype);
      return e.__wbg_ptr = t, Jr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Jr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_bip32publickey_free(t);
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.bip32publickey_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return m_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.bip32publickey_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    chaincode() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.bip32publickey_chaincode(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.bip32publickey_to_bech32(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.bip32publickey_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return m_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.bip32publickey_as_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.bip32publickey_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return m_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_raw_key() {
      const t = _.bip32publickey_to_raw_key(this.__wbg_ptr);
      return Xt.__wrap(t);
    }
    derive(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.bip32publickey_derive(r, this.__wbg_ptr, t);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return m_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Yr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_block_free(b >>> 0));
  k_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(k_.prototype);
      return e.__wbg_ptr = t, Yr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Yr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_block_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.block_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.block_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return k_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.block_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.block_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return k_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.block_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.block_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.block_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return k_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    header() {
      const t = _.block_header(this.__wbg_ptr);
      return c_.__wrap(t);
    }
    transaction_bodies() {
      const t = _.block_transaction_bodies(this.__wbg_ptr);
      return _e.__wrap(t);
    }
    transaction_witness_sets() {
      const t = _.block_transaction_witness_sets(this.__wbg_ptr);
      return l_.__wrap(t);
    }
    auxiliary_data_set() {
      const t = _.block_auxiliary_data_set(this.__wbg_ptr);
      return Qe.__wrap(t);
    }
    invalid_transactions() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.block_invalid_transactions(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = cr(t, e).slice();
        return _.__wbindgen_free(t, e * 4, 4), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t, e, a, n, r) {
      w(t, c_), w(e, _e), w(a, l_), w(n, Qe);
      const d = us(r, _.__wbindgen_malloc), i = g, l = _.block_new(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr, n.__wbg_ptr, d, i);
      return k_.__wrap(l);
    }
  };
  const Qr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_blockhash_free(b >>> 0));
  bt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(bt.prototype);
      return e.__wbg_ptr = t, Qr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Qr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_blockhash_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.blockhash_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return bt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(t) {
      let e, a;
      try {
        const m = _.__wbindgen_add_to_stack_pointer(-16), j = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), z = g;
        _.anchordatahash_to_bech32(m, this.__wbg_ptr, j, z);
        var n = o()[m / 4 + 0], r = o()[m / 4 + 1], d = o()[m / 4 + 2], i = o()[m / 4 + 3], l = n, p = r;
        if (i) throw l = 0, p = 0, c(d);
        return e = l, a = p, f(l, p);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.blockhash_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return bt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.blockhash_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return bt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Xr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_bootstrapwitness_free(b >>> 0));
  ut = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ut.prototype);
      return e.__wbg_ptr = t, Xr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Xr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_bootstrapwitness_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.bootstrapwitness_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.bootstrapwitness_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ut.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.bootstrapwitness_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.bootstrapwitness_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ut.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.bootstrapwitness_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.bootstrapwitness_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.bootstrapwitness_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ut.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    vkey() {
      const t = _.bootstrapwitness_vkey(this.__wbg_ptr);
      return _t.__wrap(t);
    }
    signature() {
      const t = _.bootstrapwitness_signature(this.__wbg_ptr);
      return pt.__wrap(t);
    }
    chain_code() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.bootstrapwitness_chain_code(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    attributes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.bootstrapwitness_attributes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t, e, a, n) {
      w(t, _t), w(e, pt);
      const r = h(a, _.__wbindgen_malloc), d = g, i = h(n, _.__wbindgen_malloc), l = g, p = _.bootstrapwitness_new(t.__wbg_ptr, e.__wbg_ptr, r, d, i, l);
      return ut.__wrap(p);
    }
  };
  const Zr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_bootstrapwitnesses_free(b >>> 0));
  x_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(x_.prototype);
      return e.__wbg_ptr = t, Zr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Zr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_bootstrapwitnesses_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.bootstrapwitnesses_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.bootstrapwitnesses_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return x_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.bootstrapwitnesses_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.bootstrapwitnesses_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return x_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.bootstrapwitnesses_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.bootstrapwitnesses_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.bootstrapwitnesses_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return x_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.bootstrapwitnesses_new();
      return x_.__wrap(t);
    }
    len() {
      return _.bootstrapwitnesses_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.bootstrapwitnesses_get(this.__wbg_ptr, t);
      return ut.__wrap(e);
    }
    add(t) {
      return w(t, ut), _.bootstrapwitnesses_add(this.__wbg_ptr, t.__wbg_ptr) !== 0;
    }
  };
  const Ur = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_byronaddress_free(b >>> 0));
  ft = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ft.prototype);
      return e.__wbg_ptr = t, Ur.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ur.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_byronaddress_free(t);
    }
    to_base58() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.byronaddress_to_base58(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.byronaddress_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.byronaddress_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ft.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    byron_protocol_magic() {
      return _.byronaddress_byron_protocol_magic(this.__wbg_ptr) >>> 0;
    }
    byron_address_kind() {
      return _.byronaddress_byron_address_kind(this.__wbg_ptr);
    }
    attributes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.byronaddress_attributes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    network_id() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.byronaddress_network_id(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return t;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_base58(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.byronaddress_from_base58(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ft.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static icarus_from_key(t, e) {
      w(t, m_);
      const a = _.byronaddress_icarus_from_key(t.__wbg_ptr, e);
      return ft.__wrap(a);
    }
    static is_valid(t) {
      const e = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), a = g;
      return _.byronaddress_is_valid(e, a) !== 0;
    }
    to_address() {
      const t = _.byronaddress_to_address(this.__wbg_ptr);
      return L.__wrap(t);
    }
    static from_address(t) {
      w(t, L);
      const e = _.byronaddress_from_address(t.__wbg_ptr);
      return e === 0 ? void 0 : ft.__wrap(e);
    }
  };
  const Er = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_certificate_free(b >>> 0));
  Y = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Y.prototype);
      return e.__wbg_ptr = t, Er.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Er.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_certificate_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.certificate_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.certificate_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Y.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.certificate_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.certificate_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Y.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.certificate_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.certificate_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.certificate_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Y.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_stake_registration(t) {
      w(t, zt);
      const e = _.certificate_new_stake_registration(t.__wbg_ptr);
      return Y.__wrap(e);
    }
    static new_reg_cert(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, zt), _.certificate_new_reg_cert(r, t.__wbg_ptr);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Y.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_stake_deregistration(t) {
      w(t, jt);
      const e = _.certificate_new_stake_deregistration(t.__wbg_ptr);
      return Y.__wrap(e);
    }
    static new_unreg_cert(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, jt), _.certificate_new_unreg_cert(r, t.__wbg_ptr);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Y.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_stake_delegation(t) {
      w(t, P_);
      const e = _.certificate_new_stake_delegation(t.__wbg_ptr);
      return Y.__wrap(e);
    }
    static new_pool_registration(t) {
      w(t, E_);
      const e = _.certificate_new_pool_registration(t.__wbg_ptr);
      return Y.__wrap(e);
    }
    static new_pool_retirement(t) {
      w(t, K_);
      const e = _.certificate_new_pool_retirement(t.__wbg_ptr);
      return Y.__wrap(e);
    }
    static new_genesis_key_delegation(t) {
      w(t, $_);
      const e = _.certificate_new_genesis_key_delegation(t.__wbg_ptr);
      return Y.__wrap(e);
    }
    static new_move_instantaneous_rewards_cert(t) {
      w(t, Q_);
      const e = _.certificate_new_move_instantaneous_rewards_cert(t.__wbg_ptr);
      return Y.__wrap(e);
    }
    static new_committee_hot_auth(t) {
      w(t, z_);
      const e = _.certificate_new_committee_hot_auth(t.__wbg_ptr);
      return Y.__wrap(e);
    }
    static new_committee_cold_resign(t) {
      w(t, It);
      const e = _.certificate_new_committee_cold_resign(t.__wbg_ptr);
      return Y.__wrap(e);
    }
    static new_drep_deregistration(t) {
      w(t, O_);
      const e = _.certificate_new_drep_deregistration(t.__wbg_ptr);
      return Y.__wrap(e);
    }
    static new_drep_registration(t) {
      w(t, Dt);
      const e = _.certificate_new_drep_registration(t.__wbg_ptr);
      return Y.__wrap(e);
    }
    static new_drep_update(t) {
      w(t, Tt);
      const e = _.certificate_new_drep_update(t.__wbg_ptr);
      return Y.__wrap(e);
    }
    static new_stake_and_vote_delegation(t) {
      w(t, V_);
      const e = _.certificate_new_stake_and_vote_delegation(t.__wbg_ptr);
      return Y.__wrap(e);
    }
    static new_stake_registration_and_delegation(t) {
      w(t, B_);
      const e = _.certificate_new_stake_registration_and_delegation(t.__wbg_ptr);
      return Y.__wrap(e);
    }
    static new_stake_vote_registration_and_delegation(t) {
      w(t, te);
      const e = _.certificate_new_stake_vote_registration_and_delegation(t.__wbg_ptr);
      return Y.__wrap(e);
    }
    static new_vote_delegation(t) {
      w(t, ne);
      const e = _.certificate_new_vote_delegation(t.__wbg_ptr);
      return Y.__wrap(e);
    }
    static new_vote_registration_and_delegation(t) {
      w(t, oe);
      const e = _.certificate_new_vote_registration_and_delegation(t.__wbg_ptr);
      return Y.__wrap(e);
    }
    kind() {
      return _.certificate_kind(this.__wbg_ptr);
    }
    as_stake_registration() {
      const t = _.certificate_as_stake_registration(this.__wbg_ptr);
      return t === 0 ? void 0 : zt.__wrap(t);
    }
    as_reg_cert() {
      const t = _.certificate_as_reg_cert(this.__wbg_ptr);
      return t === 0 ? void 0 : zt.__wrap(t);
    }
    as_stake_deregistration() {
      const t = _.certificate_as_stake_deregistration(this.__wbg_ptr);
      return t === 0 ? void 0 : jt.__wrap(t);
    }
    as_unreg_cert() {
      const t = _.certificate_as_unreg_cert(this.__wbg_ptr);
      return t === 0 ? void 0 : jt.__wrap(t);
    }
    as_stake_delegation() {
      const t = _.certificate_as_stake_delegation(this.__wbg_ptr);
      return t === 0 ? void 0 : P_.__wrap(t);
    }
    as_pool_registration() {
      const t = _.certificate_as_pool_registration(this.__wbg_ptr);
      return t === 0 ? void 0 : E_.__wrap(t);
    }
    as_pool_retirement() {
      const t = _.certificate_as_pool_retirement(this.__wbg_ptr);
      return t === 0 ? void 0 : K_.__wrap(t);
    }
    as_genesis_key_delegation() {
      const t = _.certificate_as_genesis_key_delegation(this.__wbg_ptr);
      return t === 0 ? void 0 : $_.__wrap(t);
    }
    as_move_instantaneous_rewards_cert() {
      const t = _.certificate_as_move_instantaneous_rewards_cert(this.__wbg_ptr);
      return t === 0 ? void 0 : Q_.__wrap(t);
    }
    as_committee_hot_auth() {
      const t = _.certificate_as_committee_hot_auth(this.__wbg_ptr);
      return t === 0 ? void 0 : z_.__wrap(t);
    }
    as_committee_cold_resign() {
      const t = _.certificate_as_committee_cold_resign(this.__wbg_ptr);
      return t === 0 ? void 0 : It.__wrap(t);
    }
    as_drep_deregistration() {
      const t = _.certificate_as_drep_deregistration(this.__wbg_ptr);
      return t === 0 ? void 0 : O_.__wrap(t);
    }
    as_drep_registration() {
      const t = _.certificate_as_drep_registration(this.__wbg_ptr);
      return t === 0 ? void 0 : Dt.__wrap(t);
    }
    as_drep_update() {
      const t = _.certificate_as_drep_update(this.__wbg_ptr);
      return t === 0 ? void 0 : Tt.__wrap(t);
    }
    as_stake_and_vote_delegation() {
      const t = _.certificate_as_stake_and_vote_delegation(this.__wbg_ptr);
      return t === 0 ? void 0 : V_.__wrap(t);
    }
    as_stake_registration_and_delegation() {
      const t = _.certificate_as_stake_registration_and_delegation(this.__wbg_ptr);
      return t === 0 ? void 0 : B_.__wrap(t);
    }
    as_stake_vote_registration_and_delegation() {
      const t = _.certificate_as_stake_vote_registration_and_delegation(this.__wbg_ptr);
      return t === 0 ? void 0 : te.__wrap(t);
    }
    as_vote_delegation() {
      const t = _.certificate_as_vote_delegation(this.__wbg_ptr);
      return t === 0 ? void 0 : ne.__wrap(t);
    }
    as_vote_registration_and_delegation() {
      const t = _.certificate_as_vote_registration_and_delegation(this.__wbg_ptr);
      return t === 0 ? void 0 : oe.__wrap(t);
    }
    has_required_script_witness() {
      return _.certificate_has_required_script_witness(this.__wbg_ptr) !== 0;
    }
  };
  const Kr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_certificates_free(b >>> 0));
  Kt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Kt.prototype);
      return e.__wbg_ptr = t, Kr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Kr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_certificates_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.certificates_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.certificates_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Kt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.certificates_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.certificates_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Kt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.certificates_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.certificates_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.certificates_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Kt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.certificates_new();
      return Kt.__wrap(t);
    }
    len() {
      return _.certificates_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.certificates_get(this.__wbg_ptr, t);
      return Y.__wrap(e);
    }
    add(t) {
      return w(t, Y), _.certificates_add(this.__wbg_ptr, t.__wbg_ptr) !== 0;
    }
  };
  const Sr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_certificatesbuilder_free(b >>> 0));
  or = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(or.prototype);
      return e.__wbg_ptr = t, Sr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Sr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_certificatesbuilder_free(t);
    }
    static new() {
      const t = _.certificatesbuilder_new();
      return or.__wrap(t);
    }
    add(t) {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, Y), _.certificatesbuilder_add(n, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[n / 4 + 0], a = o()[n / 4 + 1];
        if (a) throw c(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_with_plutus_witness(t, e) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, Y), w(e, tt), _.certificatesbuilder_add_with_plutus_witness(r, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        if (n) throw c(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_with_native_script(t, e) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, Y), w(e, Ht), _.certificatesbuilder_add_with_native_script(r, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        if (n) throw c(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_plutus_witnesses() {
      const t = _.certificatesbuilder_get_plutus_witnesses(this.__wbg_ptr);
      return At.__wrap(t);
    }
    get_ref_inputs() {
      const t = _.certificatesbuilder_get_ref_inputs(this.__wbg_ptr);
      return S.__wrap(t);
    }
    get_native_scripts() {
      const t = _.certificatesbuilder_get_native_scripts(this.__wbg_ptr);
      return E.__wrap(t);
    }
    get_certificates_refund(t, e) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, y), w(e, y), _.certificatesbuilder_get_certificates_refund(d, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
        var a = o()[d / 4 + 0], n = o()[d / 4 + 1], r = o()[d / 4 + 2];
        if (r) throw c(n);
        return R.__wrap(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_certificates_deposit(t, e) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, y), w(e, y), _.certificatesbuilder_get_certificates_deposit(d, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
        var a = o()[d / 4 + 0], n = o()[d / 4 + 1], r = o()[d / 4 + 2];
        if (r) throw c(n);
        return y.__wrap(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    has_plutus_scripts() {
      return _.certificatesbuilder_has_plutus_scripts(this.__wbg_ptr) !== 0;
    }
    build() {
      const t = _.certificatesbuilder_build(this.__wbg_ptr);
      return Kt.__wrap(t);
    }
  };
  const Wr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_changeconfig_free(b >>> 0));
  j_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(j_.prototype);
      return e.__wbg_ptr = t, Wr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Wr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_changeconfig_free(t);
    }
    static new(t) {
      w(t, L);
      const e = _.changeconfig_new(t.__wbg_ptr);
      return j_.__wrap(e);
    }
    change_address(t) {
      w(t, L);
      const e = _.changeconfig_change_address(this.__wbg_ptr, t.__wbg_ptr);
      return j_.__wrap(e);
    }
    change_plutus_data(t) {
      w(t, Le);
      const e = _.changeconfig_change_plutus_data(this.__wbg_ptr, t.__wbg_ptr);
      return j_.__wrap(e);
    }
    change_script_ref(t) {
      w(t, xt);
      const e = _.changeconfig_change_script_ref(this.__wbg_ptr, t.__wbg_ptr);
      return j_.__wrap(e);
    }
  };
  const Mr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_committee_free(b >>> 0));
  s_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(s_.prototype);
      return e.__wbg_ptr = t, Mr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Mr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_committee_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.committee_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.committee_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return s_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.committee_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.committee_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return s_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.committee_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.committee_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.committee_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return s_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t) {
      w(t, k);
      const e = _.committee_new(t.__wbg_ptr);
      return s_.__wrap(e);
    }
    members_keys() {
      const t = _.committee_members_keys(this.__wbg_ptr);
      return Ft.__wrap(t);
    }
    quorum_threshold() {
      const t = _.committee_quorum_threshold(this.__wbg_ptr);
      return k.__wrap(t);
    }
    add_member(t, e) {
      w(t, x), _.committee_add_member(this.__wbg_ptr, t.__wbg_ptr, e);
    }
    get_member_epoch(t) {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, x), _.committee_get_member_epoch(n, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[n / 4 + 0], a = o()[n / 4 + 1];
        return e === 0 ? void 0 : a >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Gr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_committeecoldresign_free(b >>> 0));
  It = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(It.prototype);
      return e.__wbg_ptr = t, Gr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Gr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_committeecoldresign_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.committeecoldresign_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.committeecoldresign_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return It.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.committeecoldresign_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.committeecoldresign_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return It.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.committeecoldresign_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.committeecoldresign_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.committeecoldresign_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return It.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    committee_cold_credential() {
      const t = _.committeecoldresign_committee_cold_credential(this.__wbg_ptr);
      return x.__wrap(t);
    }
    anchor() {
      const t = _.committeecoldresign_anchor(this.__wbg_ptr);
      return t === 0 ? void 0 : A.__wrap(t);
    }
    static new(t) {
      w(t, x);
      const e = _.committeecoldresign_new(t.__wbg_ptr);
      return It.__wrap(e);
    }
    static new_with_anchor(t, e) {
      w(t, x), w(e, A);
      const a = _.committeecoldresign_new_with_anchor(t.__wbg_ptr, e.__wbg_ptr);
      return It.__wrap(a);
    }
    has_script_credentials() {
      return _.committeecoldresign_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const Hr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_committeehotauth_free(b >>> 0));
  z_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(z_.prototype);
      return e.__wbg_ptr = t, Hr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Hr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_committeehotauth_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.committeehotauth_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.committeehotauth_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return z_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.committeehotauth_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.committeehotauth_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return z_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.committeehotauth_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.committeehotauth_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.committeehotauth_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return z_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    committee_cold_credential() {
      const t = _.committeehotauth_committee_cold_credential(this.__wbg_ptr);
      return x.__wrap(t);
    }
    committee_hot_credential() {
      const t = _.committeehotauth_committee_hot_credential(this.__wbg_ptr);
      return x.__wrap(t);
    }
    static new(t, e) {
      w(t, x), w(e, x);
      const a = _.committeehotauth_new(t.__wbg_ptr, e.__wbg_ptr);
      return z_.__wrap(a);
    }
    has_script_credentials() {
      return _.committeehotauth_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const Ar = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_constitution_free(b >>> 0));
  Ut = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Ut.prototype);
      return e.__wbg_ptr = t, Ar.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ar.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_constitution_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.constitution_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.constitution_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Ut.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.constitution_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.constitution_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Ut.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.constitution_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.constitution_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.constitution_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Ut.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    anchor() {
      const t = _.constitution_anchor(this.__wbg_ptr);
      return A.__wrap(t);
    }
    script_hash() {
      const t = _.constitution_script_hash(this.__wbg_ptr);
      return t === 0 ? void 0 : Q.__wrap(t);
    }
    static new(t) {
      w(t, A);
      const e = _.constitution_new(t.__wbg_ptr);
      return Ut.__wrap(e);
    }
    static new_with_script_hash(t, e) {
      w(t, A), w(e, Q);
      const a = _.constitution_new_with_script_hash(t.__wbg_ptr, e.__wbg_ptr);
      return Ut.__wrap(a);
    }
  };
  const Ir = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_constrplutusdata_free(b >>> 0));
  ge = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ge.prototype);
      return e.__wbg_ptr = t, Ir.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ir.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_constrplutusdata_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.constrplutusdata_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.constrplutusdata_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ge.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.constrplutusdata_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.constrplutusdata_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ge.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    alternative() {
      const t = _.constrplutusdata_alternative(this.__wbg_ptr);
      return y.__wrap(t);
    }
    data() {
      const t = _.constrplutusdata_data(this.__wbg_ptr);
      return it.__wrap(t);
    }
    static new(t, e) {
      w(t, y), w(e, it);
      const a = _.constrplutusdata_new(t.__wbg_ptr, e.__wbg_ptr);
      return ge.__wrap(a);
    }
  };
  const Dr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_costmodel_free(b >>> 0));
  i_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(i_.prototype);
      return e.__wbg_ptr = t, Dr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Dr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_costmodel_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.costmodel_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.costmodel_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return i_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.costmodel_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.costmodel_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return i_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.costmodel_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.costmodel_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.costmodel_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return i_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.costmodel_new();
      return i_.__wrap(t);
    }
    set(t, e) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16);
        w(e, X), _.costmodel_set(d, this.__wbg_ptr, t, e.__wbg_ptr);
        var a = o()[d / 4 + 0], n = o()[d / 4 + 1], r = o()[d / 4 + 2];
        if (r) throw c(n);
        return X.__wrap(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.costmodel_get(r, this.__wbg_ptr, t);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return X.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    len() {
      return _.costmodel_len(this.__wbg_ptr) >>> 0;
    }
  };
  const Tr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_costmdls_free(b >>> 0));
  kt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(kt.prototype);
      return e.__wbg_ptr = t, Tr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Tr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_costmdls_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.costmdls_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.costmdls_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return kt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.costmdls_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.costmdls_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return kt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.costmdls_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.costmdls_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.costmdls_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return kt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.costmdls_new();
      return kt.__wrap(t);
    }
    len() {
      return _.costmdls_len(this.__wbg_ptr) >>> 0;
    }
    insert(t, e) {
      w(t, D), w(e, i_);
      const a = _.costmdls_insert(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
      return a === 0 ? void 0 : i_.__wrap(a);
    }
    get(t) {
      w(t, D);
      const e = _.costmdls_get(this.__wbg_ptr, t.__wbg_ptr);
      return e === 0 ? void 0 : i_.__wrap(e);
    }
    keys() {
      const t = _.costmdls_keys(this.__wbg_ptr);
      return qe.__wrap(t);
    }
    retain_language_versions(t) {
      w(t, qe);
      const e = _.costmdls_retain_language_versions(this.__wbg_ptr, t.__wbg_ptr);
      return kt.__wrap(e);
    }
  };
  const Nr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_credential_free(b >>> 0));
  x = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(x.prototype);
      return e.__wbg_ptr = t, Nr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Nr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_credential_free(t);
    }
    static from_keyhash(t) {
      w(t, q);
      const e = _.credential_from_keyhash(t.__wbg_ptr);
      return x.__wrap(e);
    }
    static from_scripthash(t) {
      w(t, Q);
      const e = _.credential_from_scripthash(t.__wbg_ptr);
      return x.__wrap(e);
    }
    to_keyhash() {
      const t = _.credential_to_keyhash(this.__wbg_ptr);
      return t === 0 ? void 0 : q.__wrap(t);
    }
    to_scripthash() {
      const t = _.credential_to_scripthash(this.__wbg_ptr);
      return t === 0 ? void 0 : Q.__wrap(t);
    }
    kind() {
      return _.credential_has_script_hash(this.__wbg_ptr);
    }
    has_script_hash() {
      return _.credential_has_script_hash(this.__wbg_ptr) !== 0;
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.credential_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.credential_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return x.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.credential_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.credential_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return x.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.credential_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.credential_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.credential_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return x.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Cr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_credentials_free(b >>> 0));
  Ft = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Ft.prototype);
      return e.__wbg_ptr = t, Cr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Cr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_credentials_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.credentials_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.credentials_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Ft.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.credentials_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.credentials_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Ft.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.credentials_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.credentials_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.credentials_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Ft.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.credentials_new();
      return Ft.__wrap(t);
    }
    len() {
      return _.credentials_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.credentials_get(this.__wbg_ptr, t);
      return x.__wrap(e);
    }
    add(t) {
      return w(t, x), _.credentials_add(this.__wbg_ptr, t.__wbg_ptr) !== 0;
    }
  };
  const Vr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_dnsrecordaoraaaa_free(b >>> 0));
  F_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(F_.prototype);
      return e.__wbg_ptr = t, Vr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Vr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_dnsrecordaoraaaa_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.dnsrecordaoraaaa_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.dnsrecordaoraaaa_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return F_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.dnsrecordaoraaaa_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.dnsrecordaoraaaa_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return F_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.dnsrecordaoraaaa_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.dnsrecordaoraaaa_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.dnsrecordaoraaaa_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return F_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.dnsrecordaoraaaa_new(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return F_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    record() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.dnsrecordaoraaaa_record(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
  };
  const Pr = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_dnsrecordsrv_free(b >>> 0));
  R_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(R_.prototype);
      return e.__wbg_ptr = t, Pr.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Pr.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_dnsrecordsrv_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.dnsrecordsrv_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.dnsrecordsrv_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return R_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.dnsrecordsrv_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.dnsrecordsrv_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return R_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.dnsrecordaoraaaa_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.dnsrecordaoraaaa_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.dnsrecordsrv_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return R_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.dnsrecordsrv_new(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return R_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    record() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.dnsrecordaoraaaa_record(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
  };
  const Br = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_drep_free(b >>> 0));
  H = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(H.prototype);
      return e.__wbg_ptr = t, Br.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Br.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_drep_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.drep_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.drep_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return H.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.drep_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.drep_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return H.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.drep_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.drep_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.drep_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return H.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_key_hash(t) {
      w(t, q);
      const e = _.drep_new_key_hash(t.__wbg_ptr);
      return H.__wrap(e);
    }
    static new_script_hash(t) {
      w(t, Q);
      const e = _.drep_new_script_hash(t.__wbg_ptr);
      return H.__wrap(e);
    }
    static new_always_abstain() {
      const t = _.drep_new_always_abstain();
      return H.__wrap(t);
    }
    static new_always_no_confidence() {
      const t = _.drep_new_always_no_confidence();
      return H.__wrap(t);
    }
    static new_from_credential(t) {
      w(t, x);
      const e = _.drep_new_from_credential(t.__wbg_ptr);
      return H.__wrap(e);
    }
    kind() {
      return _.drep_kind(this.__wbg_ptr);
    }
    to_key_hash() {
      const t = _.drep_to_key_hash(this.__wbg_ptr);
      return t === 0 ? void 0 : q.__wrap(t);
    }
    to_script_hash() {
      const t = _.drep_to_script_hash(this.__wbg_ptr);
      return t === 0 ? void 0 : Q.__wrap(t);
    }
    to_bech32(t) {
      let e, a;
      try {
        const m = _.__wbindgen_add_to_stack_pointer(-16);
        _.drep_to_bech32(m, this.__wbg_ptr, t);
        var n = o()[m / 4 + 0], r = o()[m / 4 + 1], d = o()[m / 4 + 2], i = o()[m / 4 + 3], l = n, p = r;
        if (i) throw l = 0, p = 0, c(d);
        return e = l, a = p, f(l, p);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.drep_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return H.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const tn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_drepderegistration_free(b >>> 0));
  O_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(O_.prototype);
      return e.__wbg_ptr = t, tn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, tn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_drepderegistration_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.drepderegistration_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.drepderegistration_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return O_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.drepderegistration_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.drepderegistration_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return O_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.drepderegistration_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.drepderegistration_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.drepderegistration_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return O_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    voting_credential() {
      const t = _.drepderegistration_voting_credential(this.__wbg_ptr);
      return x.__wrap(t);
    }
    coin() {
      const t = _.drepderegistration_coin(this.__wbg_ptr);
      return y.__wrap(t);
    }
    static new(t, e) {
      w(t, x), w(e, y);
      const a = _.drepderegistration_new(t.__wbg_ptr, e.__wbg_ptr);
      return O_.__wrap(a);
    }
    has_script_credentials() {
      return _.drepderegistration_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const _n = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_drepregistration_free(b >>> 0));
  Dt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Dt.prototype);
      return e.__wbg_ptr = t, _n.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, _n.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_drepregistration_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.drepregistration_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.drepregistration_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Dt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.drepregistration_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.drepregistration_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Dt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.drepregistration_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.drepregistration_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.drepregistration_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Dt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    voting_credential() {
      const t = _.drepregistration_voting_credential(this.__wbg_ptr);
      return x.__wrap(t);
    }
    coin() {
      const t = _.drepregistration_coin(this.__wbg_ptr);
      return y.__wrap(t);
    }
    anchor() {
      const t = _.drepregistration_anchor(this.__wbg_ptr);
      return t === 0 ? void 0 : A.__wrap(t);
    }
    static new(t, e) {
      w(t, x), w(e, y);
      const a = _.drepregistration_new(t.__wbg_ptr, e.__wbg_ptr);
      return Dt.__wrap(a);
    }
    static new_with_anchor(t, e, a) {
      w(t, x), w(e, y), w(a, A);
      const n = _.drepregistration_new_with_anchor(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
      return Dt.__wrap(n);
    }
    has_script_credentials() {
      return _.drepregistration_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const en = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_drepupdate_free(b >>> 0));
  Tt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Tt.prototype);
      return e.__wbg_ptr = t, en.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, en.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_drepupdate_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.drepupdate_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.drepupdate_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Tt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.drepupdate_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.drepupdate_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Tt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.drepupdate_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.drepupdate_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.drepupdate_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Tt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    voting_credential() {
      const t = _.drepupdate_voting_credential(this.__wbg_ptr);
      return x.__wrap(t);
    }
    anchor() {
      const t = _.drepupdate_anchor(this.__wbg_ptr);
      return t === 0 ? void 0 : A.__wrap(t);
    }
    static new(t) {
      w(t, x);
      const e = _.drepupdate_new(t.__wbg_ptr);
      return Tt.__wrap(e);
    }
    static new_with_anchor(t, e) {
      w(t, x), w(e, A);
      const a = _.drepupdate_new_with_anchor(t.__wbg_ptr, e.__wbg_ptr);
      return Tt.__wrap(a);
    }
    has_script_credentials() {
      return _.drepupdate_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const rn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_drepvotingthresholds_free(b >>> 0));
  q_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(q_.prototype);
      return e.__wbg_ptr = t, rn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, rn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_drepvotingthresholds_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.drepvotingthresholds_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.drepvotingthresholds_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return q_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.drepvotingthresholds_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.drepvotingthresholds_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return q_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.drepvotingthresholds_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.drepvotingthresholds_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.drepvotingthresholds_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return q_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t, e, a, n, r, d, i, l, p, m) {
      w(t, k), w(e, k), w(a, k), w(n, k), w(r, k), w(d, k), w(i, k), w(l, k), w(p, k), w(m, k);
      const j = _.drepvotingthresholds_new(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr, n.__wbg_ptr, r.__wbg_ptr, d.__wbg_ptr, i.__wbg_ptr, l.__wbg_ptr, p.__wbg_ptr, m.__wbg_ptr);
      return q_.__wrap(j);
    }
    set_motion_no_confidence(t) {
      w(t, k), _.drepvotingthresholds_set_motion_no_confidence(this.__wbg_ptr, t.__wbg_ptr);
    }
    set_committee_normal(t) {
      w(t, k), _.drepvotingthresholds_set_committee_normal(this.__wbg_ptr, t.__wbg_ptr);
    }
    set_committee_no_confidence(t) {
      w(t, k), _.drepvotingthresholds_set_committee_no_confidence(this.__wbg_ptr, t.__wbg_ptr);
    }
    set_update_constitution(t) {
      w(t, k), _.drepvotingthresholds_set_update_constitution(this.__wbg_ptr, t.__wbg_ptr);
    }
    set_hard_fork_initiation(t) {
      w(t, k), _.drepvotingthresholds_set_hard_fork_initiation(this.__wbg_ptr, t.__wbg_ptr);
    }
    set_pp_network_group(t) {
      w(t, k), _.drepvotingthresholds_set_pp_network_group(this.__wbg_ptr, t.__wbg_ptr);
    }
    set_pp_economic_group(t) {
      w(t, k), _.drepvotingthresholds_set_pp_economic_group(this.__wbg_ptr, t.__wbg_ptr);
    }
    set_pp_technical_group(t) {
      w(t, k), _.drepvotingthresholds_set_pp_technical_group(this.__wbg_ptr, t.__wbg_ptr);
    }
    set_pp_governance_group(t) {
      w(t, k), _.drepvotingthresholds_set_pp_governance_group(this.__wbg_ptr, t.__wbg_ptr);
    }
    set_treasury_withdrawal(t) {
      w(t, k), _.drepvotingthresholds_set_treasury_withdrawal(this.__wbg_ptr, t.__wbg_ptr);
    }
    motion_no_confidence() {
      const t = _.drepvotingthresholds_motion_no_confidence(this.__wbg_ptr);
      return k.__wrap(t);
    }
    committee_normal() {
      const t = _.drepvotingthresholds_committee_normal(this.__wbg_ptr);
      return k.__wrap(t);
    }
    committee_no_confidence() {
      const t = _.drepvotingthresholds_committee_no_confidence(this.__wbg_ptr);
      return k.__wrap(t);
    }
    update_constitution() {
      const t = _.drepvotingthresholds_update_constitution(this.__wbg_ptr);
      return k.__wrap(t);
    }
    hard_fork_initiation() {
      const t = _.drepvotingthresholds_hard_fork_initiation(this.__wbg_ptr);
      return k.__wrap(t);
    }
    pp_network_group() {
      const t = _.drepvotingthresholds_pp_network_group(this.__wbg_ptr);
      return k.__wrap(t);
    }
    pp_economic_group() {
      const t = _.drepvotingthresholds_pp_economic_group(this.__wbg_ptr);
      return k.__wrap(t);
    }
    pp_technical_group() {
      const t = _.drepvotingthresholds_pp_technical_group(this.__wbg_ptr);
      return k.__wrap(t);
    }
    pp_governance_group() {
      const t = _.drepvotingthresholds_pp_governance_group(this.__wbg_ptr);
      return k.__wrap(t);
    }
    treasury_withdrawal() {
      const t = _.drepvotingthresholds_treasury_withdrawal(this.__wbg_ptr);
      return k.__wrap(t);
    }
  };
  const nn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_datacost_free(b >>> 0));
  Ge = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Ge.prototype);
      return e.__wbg_ptr = t, nn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, nn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_datacost_free(t);
    }
    static new_coins_per_byte(t) {
      w(t, y);
      const e = _.datacost_coins_per_byte(t.__wbg_ptr);
      return Ge.__wrap(e);
    }
    coins_per_byte() {
      const t = _.datacost_coins_per_byte(this.__wbg_ptr);
      return y.__wrap(t);
    }
  };
  const on = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_datahash_free(b >>> 0));
  Yt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Yt.prototype);
      return e.__wbg_ptr = t, on.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, on.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_datahash_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.datahash_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Yt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(t) {
      let e, a;
      try {
        const m = _.__wbindgen_add_to_stack_pointer(-16), j = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), z = g;
        _.anchordatahash_to_bech32(m, this.__wbg_ptr, j, z);
        var n = o()[m / 4 + 0], r = o()[m / 4 + 1], d = o()[m / 4 + 2], i = o()[m / 4 + 3], l = n, p = r;
        if (i) throw l = 0, p = 0, c(d);
        return e = l, a = p, f(l, p);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.datahash_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Yt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.datahash_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Yt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const an = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_datumsource_free(b >>> 0));
  Ee = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Ee.prototype);
      return e.__wbg_ptr = t, an.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, an.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_datumsource_free(t);
    }
    static new(t) {
      w(t, O);
      const e = _.datumsource_new(t.__wbg_ptr);
      return Ee.__wrap(e);
    }
    static new_ref_input(t) {
      w(t, Z);
      const e = _.datumsource_new_ref_input(t.__wbg_ptr);
      return Ee.__wrap(e);
    }
  };
  const sn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_ed25519keyhash_free(b >>> 0));
  q = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(q.prototype);
      return e.__wbg_ptr = t, sn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, sn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_ed25519keyhash_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.ed25519keyhash_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return q.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.ed25519keyhash_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(t) {
      let e, a;
      try {
        const m = _.__wbindgen_add_to_stack_pointer(-16), j = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), z = g;
        _.ed25519keyhash_to_bech32(m, this.__wbg_ptr, j, z);
        var n = o()[m / 4 + 0], r = o()[m / 4 + 1], d = o()[m / 4 + 2], i = o()[m / 4 + 3], l = n, p = r;
        if (i) throw l = 0, p = 0, c(d);
        return e = l, a = p, f(l, p);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.ed25519keyhash_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return q.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.ed25519keyhash_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.ed25519keyhash_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return q.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const dn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_ed25519keyhashes_free(b >>> 0));
  P = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(P.prototype);
      return e.__wbg_ptr = t, dn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, dn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_ed25519keyhashes_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.ed25519keyhashes_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.ed25519keyhashes_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return P.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.ed25519keyhashes_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.ed25519keyhashes_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return P.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.ed25519keyhashes_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.ed25519keyhashes_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.ed25519keyhashes_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return P.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.credentials_new();
      return P.__wrap(t);
    }
    len() {
      return _.credentials_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.ed25519keyhashes_get(this.__wbg_ptr, t);
      return q.__wrap(e);
    }
    add(t) {
      return w(t, q), _.ed25519keyhashes_add(this.__wbg_ptr, t.__wbg_ptr) !== 0;
    }
    contains(t) {
      return w(t, q), _.ed25519keyhashes_contains(this.__wbg_ptr, t.__wbg_ptr) !== 0;
    }
    to_option() {
      const t = _.ed25519keyhashes_to_option(this.__wbg_ptr);
      return t === 0 ? void 0 : P.__wrap(t);
    }
  };
  const cn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_ed25519signature_free(b >>> 0));
  pt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(pt.prototype);
      return e.__wbg_ptr = t, cn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, cn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_ed25519signature_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.ed25519signature_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.ed25519signature_to_bech32(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.ed25519signature_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.ed25519signature_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return pt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.ed25519signature_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return pt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.ed25519signature_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return pt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const pn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_enterpriseaddress_free(b >>> 0));
  er = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(er.prototype);
      return e.__wbg_ptr = t, pn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, pn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_enterpriseaddress_free(t);
    }
    static new(t, e) {
      w(e, x);
      const a = _.enterpriseaddress_new(t, e.__wbg_ptr);
      return er.__wrap(a);
    }
    payment_cred() {
      const t = _.baseaddress_payment_cred(this.__wbg_ptr);
      return x.__wrap(t);
    }
    to_address() {
      const t = _.enterpriseaddress_to_address(this.__wbg_ptr);
      return L.__wrap(t);
    }
    static from_address(t) {
      w(t, L);
      const e = _.enterpriseaddress_from_address(t.__wbg_ptr);
      return e === 0 ? void 0 : er.__wrap(e);
    }
    network_id() {
      return _.enterpriseaddress_network_id(this.__wbg_ptr);
    }
  };
  const wn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_exunitprices_free(b >>> 0));
  Rt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Rt.prototype);
      return e.__wbg_ptr = t, wn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, wn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_exunitprices_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.exunitprices_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.exunitprices_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Rt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.exunitprices_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.exunitprices_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Rt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.exunitprices_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.exunitprices_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.exunitprices_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Rt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    mem_price() {
      const t = _.drepvotingthresholds_motion_no_confidence(this.__wbg_ptr);
      return k.__wrap(t);
    }
    step_price() {
      const t = _.drepvotingthresholds_committee_normal(this.__wbg_ptr);
      return k.__wrap(t);
    }
    static new(t, e) {
      w(t, k), w(e, k);
      const a = _.exunitprices_new(t.__wbg_ptr, e.__wbg_ptr);
      return Rt.__wrap(a);
    }
  };
  const bn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_exunits_free(b >>> 0));
  nt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(nt.prototype);
      return e.__wbg_ptr = t, bn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, bn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_exunits_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.exunits_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.exunits_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return nt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.exunits_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.exunits_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return nt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.exunits_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.exunits_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.exunits_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return nt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    mem() {
      const t = _.exunits_mem(this.__wbg_ptr);
      return y.__wrap(t);
    }
    steps() {
      const t = _.exunits_steps(this.__wbg_ptr);
      return y.__wrap(t);
    }
    static new(t, e) {
      w(t, y), w(e, y);
      const a = _.exunits_new(t.__wbg_ptr, e.__wbg_ptr);
      return nt.__wrap(a);
    }
  };
  const ln = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_fixedblock_free(b >>> 0));
  Ke = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Ke.prototype);
      return e.__wbg_ptr = t, ln.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ln.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_fixedblock_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.fixedblock_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Ke.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.fixedblock_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Ke.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    header() {
      const t = _.fixedblock_header(this.__wbg_ptr);
      return c_.__wrap(t);
    }
    transaction_bodies() {
      const t = _.fixedblock_transaction_bodies(this.__wbg_ptr);
      return ze.__wrap(t);
    }
    transaction_witness_sets() {
      const t = _.fixedblock_transaction_witness_sets(this.__wbg_ptr);
      return l_.__wrap(t);
    }
    auxiliary_data_set() {
      const t = _.fixedblock_auxiliary_data_set(this.__wbg_ptr);
      return Qe.__wrap(t);
    }
    invalid_transactions() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.fixedblock_invalid_transactions(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = cr(t, e).slice();
        return _.__wbindgen_free(t, e * 4, 4), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    block_hash() {
      const t = _.fixedblock_block_hash(this.__wbg_ptr);
      return bt.__wrap(t);
    }
  };
  const gn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_fixedtransaction_free(b >>> 0));
  ce = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ce.prototype);
      return e.__wbg_ptr = t, gn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, gn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_fixedtransaction_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.fixedtransaction_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.fixedtransaction_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ce.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.fixedtransaction_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.fixedtransaction_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ce.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t, e, a) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16), l = h(t, _.__wbindgen_malloc), p = g, m = h(e, _.__wbindgen_malloc), j = g;
        _.fixedtransaction_new(i, l, p, m, j, a);
        var n = o()[i / 4 + 0], r = o()[i / 4 + 1], d = o()[i / 4 + 2];
        if (d) throw c(r);
        return ce.__wrap(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_with_auxiliary(t, e, a, n) {
      try {
        const l = _.__wbindgen_add_to_stack_pointer(-16), p = h(t, _.__wbindgen_malloc), m = g, j = h(e, _.__wbindgen_malloc), z = g, Xe = h(a, _.__wbindgen_malloc), Ze = g;
        _.fixedtransaction_new_with_auxiliary(l, p, m, j, z, Xe, Ze, n);
        var r = o()[l / 4 + 0], d = o()[l / 4 + 1], i = o()[l / 4 + 2];
        if (i) throw c(d);
        return ce.__wrap(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_from_body_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.fixedtransaction_new_from_body_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ce.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    body() {
      const t = _.fixedtransaction_body(this.__wbg_ptr);
      return V.__wrap(t);
    }
    raw_body() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.fixedtransaction_raw_body(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_body(t) {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16), r = h(t, _.__wbindgen_malloc), d = g;
        _.fixedtransaction_set_body(n, this.__wbg_ptr, r, d);
        var e = o()[n / 4 + 0], a = o()[n / 4 + 1];
        if (a) throw c(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_witness_set(t) {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16), r = h(t, _.__wbindgen_malloc), d = g;
        _.fixedtransaction_set_witness_set(n, this.__wbg_ptr, r, d);
        var e = o()[n / 4 + 0], a = o()[n / 4 + 1];
        if (a) throw c(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    witness_set() {
      const t = _.fixedtransaction_witness_set(this.__wbg_ptr);
      return ht.__wrap(t);
    }
    raw_witness_set() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.fixedtransaction_raw_witness_set(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_is_valid(t) {
      _.fixedtransaction_set_is_valid(this.__wbg_ptr, t);
    }
    is_valid() {
      return _.fixedtransaction_is_valid(this.__wbg_ptr) !== 0;
    }
    set_auxiliary_data(t) {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16), r = h(t, _.__wbindgen_malloc), d = g;
        _.fixedtransaction_set_auxiliary_data(n, this.__wbg_ptr, r, d);
        var e = o()[n / 4 + 0], a = o()[n / 4 + 1];
        if (a) throw c(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    auxiliary_data() {
      const t = _.fixedtransaction_auxiliary_data(this.__wbg_ptr);
      return t === 0 ? void 0 : B.__wrap(t);
    }
    raw_auxiliary_data() {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.fixedtransaction_raw_auxiliary_data(a, this.__wbg_ptr);
        var t = o()[a / 4 + 0], e = o()[a / 4 + 1];
        let n;
        return t !== 0 && (n = v(t, e).slice(), _.__wbindgen_free(t, e * 1, 1)), n;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    transaction_hash() {
      const t = _.fixedtransaction_transaction_hash(this.__wbg_ptr);
      return dt.__wrap(t);
    }
    add_vkey_witness(t) {
      w(t, Lt), _.fixedtransaction_add_vkey_witness(this.__wbg_ptr, t.__wbg_ptr);
    }
    add_bootstrap_witness(t) {
      w(t, ut), _.fixedtransaction_add_bootstrap_witness(this.__wbg_ptr, t.__wbg_ptr);
    }
    sign_and_add_vkey_signature(t) {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, mt), _.fixedtransaction_sign_and_add_vkey_signature(n, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[n / 4 + 0], a = o()[n / 4 + 1];
        if (a) throw c(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    sign_and_add_icarus_bootstrap_signature(t, e) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, ft), w(e, yt), _.fixedtransaction_sign_and_add_icarus_bootstrap_signature(r, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        if (n) throw c(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    sign_and_add_daedalus_bootstrap_signature(t, e) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, ft), w(e, Ie), _.fixedtransaction_sign_and_add_daedalus_bootstrap_signature(r, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        if (n) throw c(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const un = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_fixedtransactionbodies_free(b >>> 0));
  ze = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ze.prototype);
      return e.__wbg_ptr = t, un.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, un.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_fixedtransactionbodies_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.fixedtransactionbodies_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ze.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.fixedtransactionbodies_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ze.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.fixedtransactionbodies_new();
      return ze.__wrap(t);
    }
    len() {
      return _.fixedtransactionbodies_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.fixedtransactionbodies_get(this.__wbg_ptr, t);
      return Oe.__wrap(e);
    }
    add(t) {
      w(t, Oe), _.fixedtransactionbodies_add(this.__wbg_ptr, t.__wbg_ptr);
    }
  };
  const fn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_fixedtransactionbody_free(b >>> 0));
  Oe = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Oe.prototype);
      return e.__wbg_ptr = t, fn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, fn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_fixedtransactionbody_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.fixedtransactionbody_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Oe.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.fixedtransactionbody_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Oe.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    transaction_body() {
      const t = _.fixedtransaction_body(this.__wbg_ptr);
      return V.__wrap(t);
    }
    tx_hash() {
      const t = _.fixedtransactionbody_tx_hash(this.__wbg_ptr);
      return dt.__wrap(t);
    }
    original_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.fixedtransactionbody_original_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const hn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_fixedtxwitnessesset_free(b >>> 0));
  wr = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(wr.prototype);
      return e.__wbg_ptr = t, hn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, hn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_fixedtxwitnessesset_free(t);
    }
    tx_witnesses_set() {
      const t = _.fixedtxwitnessesset_tx_witnesses_set(this.__wbg_ptr);
      return ht.__wrap(t);
    }
    add_vkey_witness(t) {
      w(t, Lt), _.fixedtxwitnessesset_add_vkey_witness(this.__wbg_ptr, t.__wbg_ptr);
    }
    add_bootstrap_witness(t) {
      w(t, ut), _.fixedtxwitnessesset_add_bootstrap_witness(this.__wbg_ptr, t.__wbg_ptr);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.fixedtxwitnessesset_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.fixedtxwitnessesset_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return wr.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const yn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_fixedversionedblock_free(b >>> 0));
  rr = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(rr.prototype);
      return e.__wbg_ptr = t, yn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, yn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_fixedversionedblock_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.fixedversionedblock_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return rr.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.fixedversionedblock_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return rr.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    block() {
      const t = _.fixedversionedblock_block(this.__wbg_ptr);
      return Ke.__wrap(t);
    }
    era() {
      return _.fixedversionedblock_era(this.__wbg_ptr);
    }
  };
  const vn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_generaltransactionmetadata_free(b >>> 0));
  d_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(d_.prototype);
      return e.__wbg_ptr = t, vn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, vn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_generaltransactionmetadata_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.generaltransactionmetadata_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.generaltransactionmetadata_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return d_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.generaltransactionmetadata_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.generaltransactionmetadata_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return d_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.generaltransactionmetadata_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.generaltransactionmetadata_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.generaltransactionmetadata_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return d_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.generaltransactionmetadata_new();
      return d_.__wrap(t);
    }
    len() {
      return _.generaltransactionmetadata_len(this.__wbg_ptr) >>> 0;
    }
    insert(t, e) {
      w(t, y), w(e, J);
      const a = _.generaltransactionmetadata_insert(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
      return a === 0 ? void 0 : J.__wrap(a);
    }
    get(t) {
      w(t, y);
      const e = _.generaltransactionmetadata_get(this.__wbg_ptr, t.__wbg_ptr);
      return e === 0 ? void 0 : J.__wrap(e);
    }
    keys() {
      const t = _.generaltransactionmetadata_keys(this.__wbg_ptr);
      return Fe.__wrap(t);
    }
  };
  const mn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_genesisdelegatehash_free(b >>> 0));
  ue = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ue.prototype);
      return e.__wbg_ptr = t, mn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, mn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_genesisdelegatehash_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.genesisdelegatehash_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ue.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.ed25519keyhash_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(t) {
      let e, a;
      try {
        const m = _.__wbindgen_add_to_stack_pointer(-16), j = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), z = g;
        _.ed25519keyhash_to_bech32(m, this.__wbg_ptr, j, z);
        var n = o()[m / 4 + 0], r = o()[m / 4 + 1], d = o()[m / 4 + 2], i = o()[m / 4 + 3], l = n, p = r;
        if (i) throw l = 0, p = 0, c(d);
        return e = l, a = p, f(l, p);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.genesisdelegatehash_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ue.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.ed25519keyhash_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.genesisdelegatehash_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ue.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const kn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_genesishash_free(b >>> 0));
  Qt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Qt.prototype);
      return e.__wbg_ptr = t, kn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, kn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_genesishash_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.genesishash_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Qt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.ed25519keyhash_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(t) {
      let e, a;
      try {
        const m = _.__wbindgen_add_to_stack_pointer(-16), j = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), z = g;
        _.ed25519keyhash_to_bech32(m, this.__wbg_ptr, j, z);
        var n = o()[m / 4 + 0], r = o()[m / 4 + 1], d = o()[m / 4 + 2], i = o()[m / 4 + 3], l = n, p = r;
        if (i) throw l = 0, p = 0, c(d);
        return e = l, a = p, f(l, p);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.genesishash_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Qt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.ed25519keyhash_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.genesishash_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Qt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const xn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_genesishashes_free(b >>> 0));
  we = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(we.prototype);
      return e.__wbg_ptr = t, xn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, xn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_genesishashes_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.genesishashes_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.genesishashes_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return we.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.genesishashes_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.genesishashes_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return we.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.genesishashes_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.genesishashes_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.genesishashes_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return we.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.genesishashes_new();
      return we.__wrap(t);
    }
    len() {
      return _.assetnames_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.genesishashes_get(this.__wbg_ptr, t);
      return Qt.__wrap(e);
    }
    add(t) {
      w(t, Qt), _.genesishashes_add(this.__wbg_ptr, t.__wbg_ptr);
    }
  };
  const jn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_genesiskeydelegation_free(b >>> 0));
  $_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create($_.prototype);
      return e.__wbg_ptr = t, jn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, jn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_genesiskeydelegation_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.genesiskeydelegation_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.genesiskeydelegation_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return $_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.genesiskeydelegation_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.genesiskeydelegation_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return $_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.genesiskeydelegation_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.genesiskeydelegation_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.genesiskeydelegation_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return $_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    genesishash() {
      const t = _.genesiskeydelegation_genesishash(this.__wbg_ptr);
      return Qt.__wrap(t);
    }
    genesis_delegate_hash() {
      const t = _.genesiskeydelegation_genesis_delegate_hash(this.__wbg_ptr);
      return ue.__wrap(t);
    }
    vrf_keyhash() {
      const t = _.genesiskeydelegation_vrf_keyhash(this.__wbg_ptr);
      return f_.__wrap(t);
    }
    static new(t, e, a) {
      w(t, Qt), w(e, ue), w(a, f_);
      const n = _.genesiskeydelegation_new(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
      return $_.__wrap(n);
    }
  };
  const zn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_governanceaction_free(b >>> 0));
  rt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(rt.prototype);
      return e.__wbg_ptr = t, zn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, zn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_governanceaction_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.governanceaction_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.governanceaction_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return rt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.governanceaction_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.governanceaction_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return rt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.governanceaction_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.governanceaction_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.governanceaction_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return rt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_parameter_change_action(t) {
      w(t, vt);
      const e = _.governanceaction_new_parameter_change_action(t.__wbg_ptr);
      return rt.__wrap(e);
    }
    static new_hard_fork_initiation_action(t) {
      w(t, Nt);
      const e = _.governanceaction_new_hard_fork_initiation_action(t.__wbg_ptr);
      return rt.__wrap(e);
    }
    static new_treasury_withdrawals_action(t) {
      w(t, r_);
      const e = _.governanceaction_new_treasury_withdrawals_action(t.__wbg_ptr);
      return rt.__wrap(e);
    }
    static new_no_confidence_action(t) {
      w(t, t_);
      const e = _.governanceaction_new_no_confidence_action(t.__wbg_ptr);
      return rt.__wrap(e);
    }
    static new_new_committee_action(t) {
      w(t, n_);
      const e = _.governanceaction_new_new_committee_action(t.__wbg_ptr);
      return rt.__wrap(e);
    }
    static new_new_constitution_action(t) {
      w(t, Bt);
      const e = _.governanceaction_new_new_constitution_action(t.__wbg_ptr);
      return rt.__wrap(e);
    }
    static new_info_action(t) {
      w(t, He);
      const e = _.governanceaction_new_info_action(t.__wbg_ptr);
      return rt.__wrap(e);
    }
    kind() {
      return _.governanceaction_kind(this.__wbg_ptr);
    }
    as_parameter_change_action() {
      const t = _.governanceaction_as_parameter_change_action(this.__wbg_ptr);
      return t === 0 ? void 0 : vt.__wrap(t);
    }
    as_hard_fork_initiation_action() {
      const t = _.governanceaction_as_hard_fork_initiation_action(this.__wbg_ptr);
      return t === 0 ? void 0 : Nt.__wrap(t);
    }
    as_treasury_withdrawals_action() {
      const t = _.governanceaction_as_treasury_withdrawals_action(this.__wbg_ptr);
      return t === 0 ? void 0 : r_.__wrap(t);
    }
    as_no_confidence_action() {
      const t = _.governanceaction_as_no_confidence_action(this.__wbg_ptr);
      return t === 0 ? void 0 : t_.__wrap(t);
    }
    as_new_committee_action() {
      const t = _.governanceaction_as_new_committee_action(this.__wbg_ptr);
      return t === 0 ? void 0 : n_.__wrap(t);
    }
    as_new_constitution_action() {
      const t = _.governanceaction_as_new_constitution_action(this.__wbg_ptr);
      return t === 0 ? void 0 : Bt.__wrap(t);
    }
    as_info_action() {
      const t = _.governanceaction_as_info_action(this.__wbg_ptr);
      return t === 0 ? void 0 : He.__wrap(t);
    }
  };
  const Fn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_governanceactionid_free(b >>> 0));
  U = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(U.prototype);
      return e.__wbg_ptr = t, Fn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Fn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_governanceactionid_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.governanceactionid_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.governanceactionid_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return U.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.governanceactionid_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.governanceactionid_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return U.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.governanceactionid_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.governanceactionid_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.governanceactionid_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return U.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    transaction_id() {
      const t = _.governanceactionid_transaction_id(this.__wbg_ptr);
      return dt.__wrap(t);
    }
    index() {
      return _.governanceactionid_index(this.__wbg_ptr) >>> 0;
    }
    static new(t, e) {
      w(t, dt);
      const a = _.governanceactionid_new(t.__wbg_ptr, e);
      return U.__wrap(a);
    }
  };
  const Rn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_governanceactionids_free(b >>> 0));
  Se = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Se.prototype);
      return e.__wbg_ptr = t, Rn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Rn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_governanceactionids_free(t);
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.governanceactionids_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.governanceactionids_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.governanceactionids_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Se.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.governanceactionids_new();
      return Se.__wrap(t);
    }
    add(t) {
      w(t, U), _.governanceactionids_add(this.__wbg_ptr, t.__wbg_ptr);
    }
    get(t) {
      const e = _.governanceactionids_get(this.__wbg_ptr, t);
      return e === 0 ? void 0 : U.__wrap(e);
    }
    len() {
      return _.governanceactionids_len(this.__wbg_ptr) >>> 0;
    }
  };
  const On = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_hardforkinitiationaction_free(b >>> 0));
  Nt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Nt.prototype);
      return e.__wbg_ptr = t, On.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, On.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_hardforkinitiationaction_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.hardforkinitiationaction_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.hardforkinitiationaction_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Nt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.hardforkinitiationaction_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.hardforkinitiationaction_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Nt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.hardforkinitiationaction_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.hardforkinitiationaction_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.hardforkinitiationaction_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Nt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    gov_action_id() {
      const t = _.hardforkinitiationaction_gov_action_id(this.__wbg_ptr);
      return t === 0 ? void 0 : U.__wrap(t);
    }
    protocol_version() {
      const t = _.hardforkinitiationaction_protocol_version(this.__wbg_ptr);
      return at.__wrap(t);
    }
    static new(t) {
      w(t, at);
      const e = _.hardforkinitiationaction_new(t.__wbg_ptr);
      return Nt.__wrap(e);
    }
    static new_with_action_id(t, e) {
      w(t, U), w(e, at);
      const a = _.hardforkinitiationaction_new_with_action_id(t.__wbg_ptr, e.__wbg_ptr);
      return Nt.__wrap(a);
    }
  };
  const qn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_header_free(b >>> 0));
  c_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(c_.prototype);
      return e.__wbg_ptr = t, qn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, qn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_header_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.header_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.header_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return c_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.header_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.header_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return c_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.header_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.header_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.header_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return c_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    header_body() {
      const t = _.header_header_body(this.__wbg_ptr);
      return Ct.__wrap(t);
    }
    body_signature() {
      const t = _.header_body_signature(this.__wbg_ptr);
      return Ae.__wrap(t);
    }
    static new(t, e) {
      w(t, Ct), w(e, Ae);
      const a = _.header_new(t.__wbg_ptr, e.__wbg_ptr);
      return c_.__wrap(a);
    }
  };
  const $n = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_headerbody_free(b >>> 0));
  Ct = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Ct.prototype);
      return e.__wbg_ptr = t, $n.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, $n.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_headerbody_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.headerbody_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.headerbody_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Ct.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.headerbody_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.headerbody_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Ct.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.headerbody_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.headerbody_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.headerbody_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Ct.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    block_number() {
      return _.headerbody_block_number(this.__wbg_ptr) >>> 0;
    }
    slot() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.headerbody_slot(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return t >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    slot_bignum() {
      const t = _.headerbody_slot_bignum(this.__wbg_ptr);
      return y.__wrap(t);
    }
    prev_hash() {
      const t = _.headerbody_prev_hash(this.__wbg_ptr);
      return t === 0 ? void 0 : bt.__wrap(t);
    }
    issuer_vkey() {
      const t = _.headerbody_issuer_vkey(this.__wbg_ptr);
      return _t.__wrap(t);
    }
    vrf_vkey() {
      const t = _.headerbody_vrf_vkey(this.__wbg_ptr);
      return ie.__wrap(t);
    }
    has_nonce_and_leader_vrf() {
      return _.headerbody_has_nonce_and_leader_vrf(this.__wbg_ptr) !== 0;
    }
    nonce_vrf_or_nothing() {
      const t = _.headerbody_nonce_vrf_or_nothing(this.__wbg_ptr);
      return t === 0 ? void 0 : $t.__wrap(t);
    }
    leader_vrf_or_nothing() {
      const t = _.headerbody_leader_vrf_or_nothing(this.__wbg_ptr);
      return t === 0 ? void 0 : $t.__wrap(t);
    }
    has_vrf_result() {
      return _.headerbody_has_vrf_result(this.__wbg_ptr) !== 0;
    }
    vrf_result_or_nothing() {
      const t = _.headerbody_vrf_result_or_nothing(this.__wbg_ptr);
      return t === 0 ? void 0 : $t.__wrap(t);
    }
    block_body_size() {
      return _.headerbody_block_body_size(this.__wbg_ptr) >>> 0;
    }
    block_body_hash() {
      const t = _.headerbody_block_body_hash(this.__wbg_ptr);
      return bt.__wrap(t);
    }
    operational_cert() {
      const t = _.headerbody_operational_cert(this.__wbg_ptr);
      return p_.__wrap(t);
    }
    protocol_version() {
      const t = _.headerbody_protocol_version(this.__wbg_ptr);
      return at.__wrap(t);
    }
    static new(t, e, a, n, r, d, i, l, p, m) {
      let j = 0;
      wt(a) || (w(a, bt), j = a.__destroy_into_raw()), w(n, _t), w(r, ie), w(d, $t), w(l, bt), w(p, p_), w(m, at);
      const z = _.headerbody_new(t, e, j, n.__wbg_ptr, r.__wbg_ptr, d.__wbg_ptr, i, l.__wbg_ptr, p.__wbg_ptr, m.__wbg_ptr);
      return Ct.__wrap(z);
    }
    static new_headerbody(t, e, a, n, r, d, i, l, p, m) {
      w(e, y);
      let j = 0;
      wt(a) || (w(a, bt), j = a.__destroy_into_raw()), w(n, _t), w(r, ie), w(d, $t), w(l, bt), w(p, p_), w(m, at);
      const z = _.headerbody_new_headerbody(t, e.__wbg_ptr, j, n.__wbg_ptr, r.__wbg_ptr, d.__wbg_ptr, i, l.__wbg_ptr, p.__wbg_ptr, m.__wbg_ptr);
      return Ct.__wrap(z);
    }
  };
  const Ln = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_infoaction_free(b >>> 0));
  He = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(He.prototype);
      return e.__wbg_ptr = t, Ln.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ln.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_infoaction_free(t);
    }
    static new() {
      const t = _.infoaction_new();
      return He.__wrap(t);
    }
  };
  const Jn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_int_free(b >>> 0));
  X = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(X.prototype);
      return e.__wbg_ptr = t, Jn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Jn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_int_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.int_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.int_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return X.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.int_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.int_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return X.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.int_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.int_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.int_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return X.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t) {
      w(t, y);
      const e = _.int_new(t.__wbg_ptr);
      return X.__wrap(e);
    }
    static new_negative(t) {
      w(t, y);
      const e = _.int_new_negative(t.__wbg_ptr);
      return X.__wrap(e);
    }
    static new_i32(t) {
      const e = _.int_new_i32(t);
      return X.__wrap(e);
    }
    is_positive() {
      return _.int_is_positive(this.__wbg_ptr) !== 0;
    }
    as_positive() {
      const t = _.int_as_positive(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    as_negative() {
      const t = _.int_as_negative(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    as_i32() {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.int_as_i32(a, this.__wbg_ptr);
        var t = o()[a / 4 + 0], e = o()[a / 4 + 1];
        return t === 0 ? void 0 : e;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_i32_or_nothing() {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.int_as_i32_or_nothing(a, this.__wbg_ptr);
        var t = o()[a / 4 + 0], e = o()[a / 4 + 1];
        return t === 0 ? void 0 : e;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_i32_or_fail() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.int_as_i32_or_fail(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return t;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_str() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.int_to_str(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_str(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.int_from_str(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return X.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Yn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_ipv4_free(b >>> 0));
  L_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(L_.prototype);
      return e.__wbg_ptr = t, Yn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Yn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_ipv4_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.ipv4_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.ipv4_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return L_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.ipv4_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.ipv4_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return L_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.ipv4_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.ipv4_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.ipv4_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return L_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.ipv4_new(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return L_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    ip() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.ipv4_ip(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Qn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_ipv6_free(b >>> 0));
  J_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(J_.prototype);
      return e.__wbg_ptr = t, Qn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Qn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_ipv6_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.ipv6_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.ipv6_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return J_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.ipv6_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.ipv6_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return J_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.ipv6_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.ipv6_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.ipv6_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return J_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.ipv6_new(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return J_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    ip() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.ipv6_ip(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Xn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_kessignature_free(b >>> 0));
  Ae = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Ae.prototype);
      return e.__wbg_ptr = t, Xn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Xn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_kessignature_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.kessignature_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.kessignature_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Ae.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Zn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_kesvkey_free(b >>> 0));
  fe = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(fe.prototype);
      return e.__wbg_ptr = t, Zn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Zn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_kesvkey_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.kesvkey_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return fe.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(t) {
      let e, a;
      try {
        const m = _.__wbindgen_add_to_stack_pointer(-16), j = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), z = g;
        _.anchordatahash_to_bech32(m, this.__wbg_ptr, j, z);
        var n = o()[m / 4 + 0], r = o()[m / 4 + 1], d = o()[m / 4 + 2], i = o()[m / 4 + 3], l = n, p = r;
        if (i) throw l = 0, p = 0, c(d);
        return e = l, a = p, f(l, p);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.kesvkey_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return fe.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.kesvkey_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return fe.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Un = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_language_free(b >>> 0));
  D = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(D.prototype);
      return e.__wbg_ptr = t, Un.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Un.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_language_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.language_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.language_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return D.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.language_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.language_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return D.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.language_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.language_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.language_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return D.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_plutus_v1() {
      const t = _.language_new_plutus_v1();
      return D.__wrap(t);
    }
    static new_plutus_v2() {
      const t = _.language_new_plutus_v2();
      return D.__wrap(t);
    }
    static new_plutus_v3() {
      const t = _.language_new_plutus_v3();
      return D.__wrap(t);
    }
    kind() {
      return _.language_kind(this.__wbg_ptr);
    }
  };
  const En = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_languages_free(b >>> 0));
  qe = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(qe.prototype);
      return e.__wbg_ptr = t, En.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, En.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_languages_free(t);
    }
    static new() {
      const t = _.languages_new();
      return qe.__wrap(t);
    }
    len() {
      return _.languages_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.languages_get(this.__wbg_ptr, t);
      return D.__wrap(e);
    }
    add(t) {
      w(t, D);
      var e = t.__destroy_into_raw();
      _.languages_add(this.__wbg_ptr, e);
    }
    static list() {
      const t = _.languages_list();
      return qe.__wrap(t);
    }
  };
  const Kn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_legacydaedalusprivatekey_free(b >>> 0));
  Ie = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Ie.prototype);
      return e.__wbg_ptr = t, Kn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Kn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_legacydaedalusprivatekey_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.legacydaedalusprivatekey_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Ie.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.legacydaedalusprivatekey_as_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    chaincode() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.legacydaedalusprivatekey_chaincode(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Sn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_linearfee_free(b >>> 0));
  De = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(De.prototype);
      return e.__wbg_ptr = t, Sn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Sn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_linearfee_free(t);
    }
    constant() {
      const t = _.linearfee_constant(this.__wbg_ptr);
      return y.__wrap(t);
    }
    coefficient() {
      const t = _.linearfee_coefficient(this.__wbg_ptr);
      return y.__wrap(t);
    }
    static new(t, e) {
      w(t, y), w(e, y);
      const a = _.linearfee_new(t.__wbg_ptr, e.__wbg_ptr);
      return De.__wrap(a);
    }
  };
  const Wn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_mirtostakecredentials_free(b >>> 0));
  Y_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Y_.prototype);
      return e.__wbg_ptr = t, Wn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Wn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_mirtostakecredentials_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.mirtostakecredentials_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.mirtostakecredentials_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Y_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.mirtostakecredentials_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.mirtostakecredentials_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Y_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.mirtostakecredentials_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.mirtostakecredentials_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.mirtostakecredentials_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Y_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.mirtostakecredentials_new();
      return Y_.__wrap(t);
    }
    len() {
      return _.mirtostakecredentials_len(this.__wbg_ptr) >>> 0;
    }
    insert(t, e) {
      w(t, x), w(e, X);
      const a = _.mirtostakecredentials_insert(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
      return a === 0 ? void 0 : X.__wrap(a);
    }
    get(t) {
      w(t, x);
      const e = _.mirtostakecredentials_get(this.__wbg_ptr, t.__wbg_ptr);
      return e === 0 ? void 0 : X.__wrap(e);
    }
    keys() {
      const t = _.mirtostakecredentials_keys(this.__wbg_ptr);
      return Ft.__wrap(t);
    }
  };
  const Mn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_malformedaddress_free(b >>> 0));
  br = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(br.prototype);
      return e.__wbg_ptr = t, Mn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Mn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_malformedaddress_free(t);
    }
    original_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.malformedaddress_original_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_address() {
      const t = _.malformedaddress_to_address(this.__wbg_ptr);
      return L.__wrap(t);
    }
    static from_address(t) {
      w(t, L);
      const e = _.malformedaddress_from_address(t.__wbg_ptr);
      return e === 0 ? void 0 : br.__wrap(e);
    }
  };
  const Gn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_metadatalist_free(b >>> 0));
  se = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(se.prototype);
      return e.__wbg_ptr = t, Gn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Gn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_metadatalist_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.metadatalist_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.metadatalist_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return se.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.metadatalist_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.metadatalist_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return se.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.metadatalist_new();
      return se.__wrap(t);
    }
    len() {
      return _.languages_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.metadatalist_get(this.__wbg_ptr, t);
      return J.__wrap(e);
    }
    add(t) {
      w(t, J), _.metadatalist_add(this.__wbg_ptr, t.__wbg_ptr);
    }
  };
  const Hn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_metadatamap_free(b >>> 0));
  he = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(he.prototype);
      return e.__wbg_ptr = t, Hn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Hn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_metadatamap_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.metadatamap_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.metadatamap_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return he.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.metadatamap_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.metadatamap_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return he.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.generaltransactionmetadata_new();
      return he.__wrap(t);
    }
    len() {
      return _.generaltransactionmetadata_len(this.__wbg_ptr) >>> 0;
    }
    insert(t, e) {
      w(t, J), w(e, J);
      const a = _.metadatamap_insert(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
      return a === 0 ? void 0 : J.__wrap(a);
    }
    insert_str(t, e) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16), i = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), l = g;
        w(e, J), _.metadatamap_insert_str(d, this.__wbg_ptr, i, l, e.__wbg_ptr);
        var a = o()[d / 4 + 0], n = o()[d / 4 + 1], r = o()[d / 4 + 2];
        if (r) throw c(n);
        return a === 0 ? void 0 : J.__wrap(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    insert_i32(t, e) {
      w(e, J);
      const a = _.metadatamap_insert_i32(this.__wbg_ptr, t, e.__wbg_ptr);
      return a === 0 ? void 0 : J.__wrap(a);
    }
    get(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, J), _.metadatamap_get(r, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return J.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_str(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.metadatamap_get_str(r, this.__wbg_ptr, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return J.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_i32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.metadatamap_get_i32(r, this.__wbg_ptr, t);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return J.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    has(t) {
      return w(t, J), _.metadatamap_has(this.__wbg_ptr, t.__wbg_ptr) !== 0;
    }
    keys() {
      const t = _.metadatamap_keys(this.__wbg_ptr);
      return se.__wrap(t);
    }
  };
  const An = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_mint_free(b >>> 0));
  lt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(lt.prototype);
      return e.__wbg_ptr = t, An.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, An.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_mint_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.mint_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.mint_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return lt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.mint_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.mint_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return lt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.mint_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.mint_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.mint_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return lt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.assetnames_new();
      return lt.__wrap(t);
    }
    static new_from_entry(t, e) {
      w(t, Q), w(e, Gt);
      const a = _.mint_new_from_entry(t.__wbg_ptr, e.__wbg_ptr);
      return lt.__wrap(a);
    }
    len() {
      return _.assetnames_len(this.__wbg_ptr) >>> 0;
    }
    insert(t, e) {
      w(t, Q), w(e, Gt);
      const a = _.mint_insert(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
      return a === 0 ? void 0 : Gt.__wrap(a);
    }
    get(t) {
      w(t, Q);
      const e = _.mint_get(this.__wbg_ptr, t.__wbg_ptr);
      return e === 0 ? void 0 : We.__wrap(e);
    }
    keys() {
      const t = _.mint_keys(this.__wbg_ptr);
      return I_.__wrap(t);
    }
    as_positive_multiasset() {
      const t = _.mint_as_positive_multiasset(this.__wbg_ptr);
      return N.__wrap(t);
    }
    as_negative_multiasset() {
      const t = _.mint_as_negative_multiasset(this.__wbg_ptr);
      return N.__wrap(t);
    }
  };
  const In = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_mintassets_free(b >>> 0));
  Gt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Gt.prototype);
      return e.__wbg_ptr = t, In.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, In.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_mintassets_free(t);
    }
    static new() {
      const t = _.assets_new();
      return Gt.__wrap(t);
    }
    static new_from_entry(t, e) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, G), w(e, X), _.mintassets_new_from_entry(d, t.__wbg_ptr, e.__wbg_ptr);
        var a = o()[d / 4 + 0], n = o()[d / 4 + 1], r = o()[d / 4 + 2];
        if (r) throw c(n);
        return Gt.__wrap(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    len() {
      return _.assetnames_len(this.__wbg_ptr) >>> 0;
    }
    insert(t, e) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, G), w(e, X), _.mintassets_insert(d, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
        var a = o()[d / 4 + 0], n = o()[d / 4 + 1], r = o()[d / 4 + 2];
        if (r) throw c(n);
        return a === 0 ? void 0 : X.__wrap(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get(t) {
      w(t, G);
      const e = _.mintassets_get(this.__wbg_ptr, t.__wbg_ptr);
      return e === 0 ? void 0 : X.__wrap(e);
    }
    keys() {
      const t = _.mintassets_keys(this.__wbg_ptr);
      return v_.__wrap(t);
    }
  };
  const Dn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_mintbuilder_free(b >>> 0));
  Te = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Te.prototype);
      return e.__wbg_ptr = t, Dn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Dn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_mintbuilder_free(t);
    }
    static new() {
      const t = _.mintbuilder_new();
      return Te.__wrap(t);
    }
    add_asset(t, e, a) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, $e), w(e, G), w(a, X), _.mintbuilder_add_asset(d, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
        var n = o()[d / 4 + 0], r = o()[d / 4 + 1];
        if (r) throw c(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_asset(t, e, a) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, $e), w(e, G), w(a, X), _.mintbuilder_set_asset(d, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
        var n = o()[d / 4 + 0], r = o()[d / 4 + 1];
        if (r) throw c(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    build() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.mintbuilder_build(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return lt.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_native_scripts() {
      const t = _.mintbuilder_get_native_scripts(this.__wbg_ptr);
      return E.__wrap(t);
    }
    get_plutus_witnesses() {
      const t = _.mintbuilder_get_plutus_witnesses(this.__wbg_ptr);
      return At.__wrap(t);
    }
    get_ref_inputs() {
      const t = _.mintbuilder_get_ref_inputs(this.__wbg_ptr);
      return S.__wrap(t);
    }
    get_redeemers() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.mintbuilder_get_redeemers(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return Wt.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    has_plutus_scripts() {
      return _.mintbuilder_has_plutus_scripts(this.__wbg_ptr) !== 0;
    }
    has_native_scripts() {
      return _.mintbuilder_has_native_scripts(this.__wbg_ptr) !== 0;
    }
  };
  const Tn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_mintwitness_free(b >>> 0));
  $e = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create($e.prototype);
      return e.__wbg_ptr = t, Tn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Tn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_mintwitness_free(t);
    }
    static new_native_script(t) {
      w(t, Ht);
      const e = _.mintwitness_new_native_script(t.__wbg_ptr);
      return $e.__wrap(e);
    }
    static new_plutus_script(t, e) {
      w(t, me), w(e, st);
      const a = _.mintwitness_new_plutus_script(t.__wbg_ptr, e.__wbg_ptr);
      return $e.__wrap(a);
    }
  };
  const Nn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_mintsassets_free(b >>> 0));
  We = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(We.prototype);
      return e.__wbg_ptr = t, Nn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Nn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_mintsassets_free(t);
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.mintsassets_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.mintsassets_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.mintsassets_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return We.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.assetnames_new();
      return We.__wrap(t);
    }
    add(t) {
      w(t, Gt), _.mintsassets_add(this.__wbg_ptr, t.__wbg_ptr);
    }
    get(t) {
      const e = _.mintsassets_get(this.__wbg_ptr, t);
      return e === 0 ? void 0 : Gt.__wrap(e);
    }
    len() {
      return _.assetnames_len(this.__wbg_ptr) >>> 0;
    }
  };
  const Cn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_moveinstantaneousreward_free(b >>> 0));
  Vt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Vt.prototype);
      return e.__wbg_ptr = t, Cn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Cn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_moveinstantaneousreward_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.moveinstantaneousreward_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.moveinstantaneousreward_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Vt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.moveinstantaneousreward_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.moveinstantaneousreward_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Vt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.moveinstantaneousreward_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.moveinstantaneousreward_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.moveinstantaneousreward_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Vt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_to_other_pot(t, e) {
      w(e, y);
      const a = _.moveinstantaneousreward_new_to_other_pot(t, e.__wbg_ptr);
      return Vt.__wrap(a);
    }
    static new_to_stake_creds(t, e) {
      w(e, Y_);
      const a = _.moveinstantaneousreward_new_to_stake_creds(t, e.__wbg_ptr);
      return Vt.__wrap(a);
    }
    pot() {
      return _.moveinstantaneousreward_pot(this.__wbg_ptr);
    }
    kind() {
      return _.moveinstantaneousreward_kind(this.__wbg_ptr);
    }
    as_to_other_pot() {
      const t = _.moveinstantaneousreward_as_to_other_pot(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    as_to_stake_creds() {
      const t = _.moveinstantaneousreward_as_to_stake_creds(this.__wbg_ptr);
      return t === 0 ? void 0 : Y_.__wrap(t);
    }
  };
  const Vn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_moveinstantaneousrewardscert_free(b >>> 0));
  Q_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Q_.prototype);
      return e.__wbg_ptr = t, Vn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Vn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_moveinstantaneousrewardscert_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.moveinstantaneousrewardscert_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.moveinstantaneousrewardscert_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Q_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.moveinstantaneousrewardscert_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.moveinstantaneousrewardscert_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Q_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.moveinstantaneousrewardscert_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.moveinstantaneousrewardscert_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.moveinstantaneousrewardscert_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Q_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    move_instantaneous_reward() {
      const t = _.moveinstantaneousrewardscert_move_instantaneous_reward(this.__wbg_ptr);
      return Vt.__wrap(t);
    }
    static new(t) {
      w(t, Vt);
      const e = _.moveinstantaneousrewardscert_new(t.__wbg_ptr);
      return Q_.__wrap(e);
    }
  };
  const Pn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_multiasset_free(b >>> 0));
  N = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(N.prototype);
      return e.__wbg_ptr = t, Pn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Pn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_multiasset_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.multiasset_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.multiasset_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return N.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.multiasset_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.multiasset_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return N.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.multiasset_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.multiasset_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.multiasset_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return N.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.assets_new();
      return N.__wrap(t);
    }
    len() {
      return _.assetnames_len(this.__wbg_ptr) >>> 0;
    }
    insert(t, e) {
      w(t, Q), w(e, a_);
      const a = _.multiasset_insert(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
      return a === 0 ? void 0 : a_.__wrap(a);
    }
    get(t) {
      w(t, Q);
      const e = _.multiasset_get(this.__wbg_ptr, t.__wbg_ptr);
      return e === 0 ? void 0 : a_.__wrap(e);
    }
    set_asset(t, e, a) {
      w(t, Q), w(e, G), w(a, y);
      const n = _.multiasset_set_asset(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
      return n === 0 ? void 0 : y.__wrap(n);
    }
    get_asset(t, e) {
      w(t, Q), w(e, G);
      const a = _.multiasset_get_asset(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
      return y.__wrap(a);
    }
    keys() {
      const t = _.multiasset_keys(this.__wbg_ptr);
      return I_.__wrap(t);
    }
    sub(t) {
      w(t, N);
      const e = _.multiasset_sub(this.__wbg_ptr, t.__wbg_ptr);
      return N.__wrap(e);
    }
  };
  const Bn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_multihostname_free(b >>> 0));
  X_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(X_.prototype);
      return e.__wbg_ptr = t, Bn.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Bn.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_multihostname_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.multihostname_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.multihostname_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return X_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.multihostname_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.multihostname_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return X_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.multihostname_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.multihostname_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.multihostname_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return X_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    dns_name() {
      const t = _.multihostname_dns_name(this.__wbg_ptr);
      return R_.__wrap(t);
    }
    static new(t) {
      w(t, R_);
      const e = _.multihostname_dns_name(t.__wbg_ptr);
      return X_.__wrap(e);
    }
  };
  const to = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_nativescript_free(b >>> 0));
  W = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(W.prototype);
      return e.__wbg_ptr = t, to.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, to.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_nativescript_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.nativescript_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.nativescript_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return W.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.nativescript_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.nativescript_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return W.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.nativescript_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.nativescript_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.nativescript_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return W.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    hash() {
      const t = _.nativescript_hash(this.__wbg_ptr);
      return Q.__wrap(t);
    }
    static new_script_pubkey(t) {
      w(t, T_);
      const e = _.nativescript_new_script_pubkey(t.__wbg_ptr);
      return W.__wrap(e);
    }
    static new_script_all(t) {
      w(t, H_);
      const e = _.nativescript_new_script_all(t.__wbg_ptr);
      return W.__wrap(e);
    }
    static new_script_any(t) {
      w(t, A_);
      const e = _.nativescript_new_script_any(t.__wbg_ptr);
      return W.__wrap(e);
    }
    static new_script_n_of_k(t) {
      w(t, D_);
      const e = _.nativescript_new_script_n_of_k(t.__wbg_ptr);
      return W.__wrap(e);
    }
    static new_timelock_start(t) {
      w(t, e_);
      const e = _.nativescript_new_timelock_start(t.__wbg_ptr);
      return W.__wrap(e);
    }
    static new_timelock_expiry(t) {
      w(t, __);
      const e = _.nativescript_new_timelock_expiry(t.__wbg_ptr);
      return W.__wrap(e);
    }
    kind() {
      return _.nativescript_kind(this.__wbg_ptr);
    }
    as_script_pubkey() {
      const t = _.nativescript_as_script_pubkey(this.__wbg_ptr);
      return t === 0 ? void 0 : T_.__wrap(t);
    }
    as_script_all() {
      const t = _.nativescript_as_script_all(this.__wbg_ptr);
      return t === 0 ? void 0 : H_.__wrap(t);
    }
    as_script_any() {
      const t = _.nativescript_as_script_any(this.__wbg_ptr);
      return t === 0 ? void 0 : A_.__wrap(t);
    }
    as_script_n_of_k() {
      const t = _.nativescript_as_script_n_of_k(this.__wbg_ptr);
      return t === 0 ? void 0 : D_.__wrap(t);
    }
    as_timelock_start() {
      const t = _.nativescript_as_timelock_start(this.__wbg_ptr);
      return t === 0 ? void 0 : e_.__wrap(t);
    }
    as_timelock_expiry() {
      const t = _.nativescript_as_timelock_expiry(this.__wbg_ptr);
      return t === 0 ? void 0 : __.__wrap(t);
    }
    get_required_signers() {
      const t = _.nativescript_get_required_signers(this.__wbg_ptr);
      return P.__wrap(t);
    }
  };
  const _o = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_nativescriptsource_free(b >>> 0));
  Ht = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Ht.prototype);
      return e.__wbg_ptr = t, _o.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, _o.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_nativescriptsource_free(t);
    }
    static new(t) {
      w(t, W);
      const e = _.nativescriptsource_new(t.__wbg_ptr);
      return Ht.__wrap(e);
    }
    static new_ref_input(t, e, a) {
      w(t, Q), w(e, Z);
      const n = _.nativescriptsource_new_ref_input(t.__wbg_ptr, e.__wbg_ptr, a);
      return Ht.__wrap(n);
    }
    set_required_signers(t) {
      w(t, P), _.nativescriptsource_set_required_signers(this.__wbg_ptr, t.__wbg_ptr);
    }
    get_ref_script_size() {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.nativescriptsource_get_ref_script_size(a, this.__wbg_ptr);
        var t = o()[a / 4 + 0], e = o()[a / 4 + 1];
        return t === 0 ? void 0 : e >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const eo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_nativescripts_free(b >>> 0));
  E = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(E.prototype);
      return e.__wbg_ptr = t, eo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, eo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_nativescripts_free(t);
    }
    static new() {
      const t = _.nativescripts_new();
      return E.__wrap(t);
    }
    len() {
      return _.costmodel_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.nativescripts_get(this.__wbg_ptr, t);
      return W.__wrap(e);
    }
    add(t) {
      w(t, W), _.nativescripts_add(this.__wbg_ptr, t.__wbg_ptr);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.nativescripts_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.nativescripts_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return E.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.nativescripts_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.nativescripts_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return E.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.nativescripts_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.nativescripts_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.nativescripts_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return E.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const ro = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_networkid_free(b >>> 0));
  Pt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Pt.prototype);
      return e.__wbg_ptr = t, ro.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ro.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_networkid_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.networkid_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.networkid_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Pt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.networkid_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.networkid_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Pt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.networkid_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.networkid_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.networkid_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Pt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static testnet() {
      const t = _.networkid_testnet();
      return Pt.__wrap(t);
    }
    static mainnet() {
      const t = _.networkid_mainnet();
      return Pt.__wrap(t);
    }
    kind() {
      return _.networkid_kind(this.__wbg_ptr);
    }
  };
  const no = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_networkinfo_free(b >>> 0));
  be = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(be.prototype);
      return e.__wbg_ptr = t, no.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, no.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_networkinfo_free(t);
    }
    static new(t, e) {
      const a = _.networkinfo_new(t, e);
      return be.__wrap(a);
    }
    network_id() {
      return _.networkinfo_network_id(this.__wbg_ptr);
    }
    protocol_magic() {
      return _.networkinfo_protocol_magic(this.__wbg_ptr) >>> 0;
    }
    static testnet_preview() {
      const t = _.networkinfo_testnet_preview();
      return be.__wrap(t);
    }
    static testnet_preprod() {
      const t = _.networkinfo_testnet_preprod();
      return be.__wrap(t);
    }
    static mainnet() {
      const t = _.networkinfo_mainnet();
      return be.__wrap(t);
    }
  };
  const oo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_newconstitutionaction_free(b >>> 0));
  Bt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Bt.prototype);
      return e.__wbg_ptr = t, oo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, oo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_newconstitutionaction_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.newconstitutionaction_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.newconstitutionaction_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Bt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.newconstitutionaction_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.newconstitutionaction_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Bt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.newconstitutionaction_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.newconstitutionaction_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.newconstitutionaction_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Bt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    gov_action_id() {
      const t = _.hardforkinitiationaction_gov_action_id(this.__wbg_ptr);
      return t === 0 ? void 0 : U.__wrap(t);
    }
    constitution() {
      const t = _.newconstitutionaction_constitution(this.__wbg_ptr);
      return Ut.__wrap(t);
    }
    static new(t) {
      w(t, Ut);
      const e = _.newconstitutionaction_new(t.__wbg_ptr);
      return Bt.__wrap(e);
    }
    static new_with_action_id(t, e) {
      w(t, U), w(e, Ut);
      const a = _.newconstitutionaction_new_with_action_id(t.__wbg_ptr, e.__wbg_ptr);
      return Bt.__wrap(a);
    }
    has_script_hash() {
      return _.newconstitutionaction_has_script_hash(this.__wbg_ptr) !== 0;
    }
  };
  const ao = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_noconfidenceaction_free(b >>> 0));
  t_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(t_.prototype);
      return e.__wbg_ptr = t, ao.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ao.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_noconfidenceaction_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.noconfidenceaction_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.noconfidenceaction_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return t_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.noconfidenceaction_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.noconfidenceaction_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return t_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.noconfidenceaction_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.noconfidenceaction_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.noconfidenceaction_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return t_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    gov_action_id() {
      const t = _.hardforkinitiationaction_gov_action_id(this.__wbg_ptr);
      return t === 0 ? void 0 : U.__wrap(t);
    }
    static new() {
      const t = _.noconfidenceaction_new();
      return t_.__wrap(t);
    }
    static new_with_action_id(t) {
      w(t, U);
      const e = _.noconfidenceaction_new_with_action_id(t.__wbg_ptr);
      return t_.__wrap(e);
    }
  };
  const so = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_nonce_free(b >>> 0));
  y_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(y_.prototype);
      return e.__wbg_ptr = t, so.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, so.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_nonce_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.nonce_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.nonce_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return y_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.nonce_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.nonce_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return y_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.nonce_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.nonce_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.nonce_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return y_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_identity() {
      const t = _.nonce_new_identity();
      return y_.__wrap(t);
    }
    static new_from_hash(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.nonce_new_from_hash(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return y_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_hash() {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.nonce_get_hash(a, this.__wbg_ptr);
        var t = o()[a / 4 + 0], e = o()[a / 4 + 1];
        let n;
        return t !== 0 && (n = v(t, e).slice(), _.__wbindgen_free(t, e * 1, 1)), n;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const io = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_operationalcert_free(b >>> 0));
  p_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(p_.prototype);
      return e.__wbg_ptr = t, io.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, io.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_operationalcert_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.operationalcert_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.operationalcert_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return p_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.operationalcert_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.operationalcert_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return p_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.operationalcert_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.operationalcert_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.operationalcert_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return p_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    hot_vkey() {
      const t = _.operationalcert_hot_vkey(this.__wbg_ptr);
      return fe.__wrap(t);
    }
    sequence_number() {
      return _.operationalcert_sequence_number(this.__wbg_ptr) >>> 0;
    }
    kes_period() {
      return _.operationalcert_kes_period(this.__wbg_ptr) >>> 0;
    }
    sigma() {
      const t = _.operationalcert_sigma(this.__wbg_ptr);
      return pt.__wrap(t);
    }
    static new(t, e, a, n) {
      w(t, fe), w(n, pt);
      const r = _.operationalcert_new(t.__wbg_ptr, e, a, n.__wbg_ptr);
      return p_.__wrap(r);
    }
  };
  const co = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_outputdatum_free(b >>> 0));
  Le = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Le.prototype);
      return e.__wbg_ptr = t, co.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, co.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_outputdatum_free(t);
    }
    static new_data_hash(t) {
      w(t, Yt);
      const e = _.outputdatum_new_data_hash(t.__wbg_ptr);
      return Le.__wrap(e);
    }
    static new_data(t) {
      w(t, O);
      const e = _.outputdatum_new_data(t.__wbg_ptr);
      return Le.__wrap(e);
    }
    data_hash() {
      const t = _.outputdatum_data_hash(this.__wbg_ptr);
      return t === 0 ? void 0 : Yt.__wrap(t);
    }
    data() {
      const t = _.outputdatum_data(this.__wbg_ptr);
      return t === 0 ? void 0 : O.__wrap(t);
    }
  };
  const po = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_parameterchangeaction_free(b >>> 0));
  vt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(vt.prototype);
      return e.__wbg_ptr = t, po.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, po.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_parameterchangeaction_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.parameterchangeaction_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.parameterchangeaction_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return vt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.parameterchangeaction_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.parameterchangeaction_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return vt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.parameterchangeaction_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.parameterchangeaction_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.parameterchangeaction_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return vt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    gov_action_id() {
      const t = _.parameterchangeaction_gov_action_id(this.__wbg_ptr);
      return t === 0 ? void 0 : U.__wrap(t);
    }
    protocol_param_updates() {
      const t = _.parameterchangeaction_protocol_param_updates(this.__wbg_ptr);
      return ot.__wrap(t);
    }
    policy_hash() {
      const t = _.parameterchangeaction_policy_hash(this.__wbg_ptr);
      return t === 0 ? void 0 : Q.__wrap(t);
    }
    static new(t) {
      w(t, ot);
      const e = _.parameterchangeaction_new(t.__wbg_ptr);
      return vt.__wrap(e);
    }
    static new_with_action_id(t, e) {
      w(t, U), w(e, ot);
      const a = _.parameterchangeaction_new_with_action_id(t.__wbg_ptr, e.__wbg_ptr);
      return vt.__wrap(a);
    }
    static new_with_policy_hash(t, e) {
      w(t, ot), w(e, Q);
      const a = _.parameterchangeaction_new_with_policy_hash(t.__wbg_ptr, e.__wbg_ptr);
      return vt.__wrap(a);
    }
    static new_with_policy_hash_and_action_id(t, e, a) {
      w(t, U), w(e, ot), w(a, Q);
      const n = _.parameterchangeaction_new_with_policy_hash_and_action_id(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
      return vt.__wrap(n);
    }
  };
  const wo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_plutusdata_free(b >>> 0));
  O = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(O.prototype);
      return e.__wbg_ptr = t, wo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, wo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_plutusdata_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.plutusdata_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.plutusdata_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return O.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.plutusdata_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.plutusdata_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return O.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_constr_plutus_data(t) {
      w(t, ge);
      const e = _.plutusdata_new_constr_plutus_data(t.__wbg_ptr);
      return O.__wrap(e);
    }
    static new_empty_constr_plutus_data(t) {
      w(t, y);
      const e = _.plutusdata_new_empty_constr_plutus_data(t.__wbg_ptr);
      return O.__wrap(e);
    }
    static new_single_value_constr_plutus_data(t, e) {
      w(t, y), w(e, O);
      const a = _.plutusdata_new_single_value_constr_plutus_data(t.__wbg_ptr, e.__wbg_ptr);
      return O.__wrap(a);
    }
    static new_map(t) {
      w(t, ye);
      const e = _.plutusdata_new_map(t.__wbg_ptr);
      return O.__wrap(e);
    }
    static new_list(t) {
      w(t, it);
      const e = _.plutusdata_new_list(t.__wbg_ptr);
      return O.__wrap(e);
    }
    static new_integer(t) {
      w(t, K);
      const e = _.plutusdata_new_integer(t.__wbg_ptr);
      return O.__wrap(e);
    }
    static new_bytes(t) {
      const e = h(t, _.__wbindgen_malloc), a = g, n = _.plutusdata_new_bytes(e, a);
      return O.__wrap(n);
    }
    kind() {
      return _.plutusdata_kind(this.__wbg_ptr);
    }
    as_constr_plutus_data() {
      const t = _.plutusdata_as_constr_plutus_data(this.__wbg_ptr);
      return t === 0 ? void 0 : ge.__wrap(t);
    }
    as_map() {
      const t = _.plutusdata_as_map(this.__wbg_ptr);
      return t === 0 ? void 0 : ye.__wrap(t);
    }
    as_list() {
      const t = _.plutusdata_as_list(this.__wbg_ptr);
      return t === 0 ? void 0 : it.__wrap(t);
    }
    as_integer() {
      const t = _.plutusdata_as_integer(this.__wbg_ptr);
      return t === 0 ? void 0 : K.__wrap(t);
    }
    as_bytes() {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.plutusdata_as_bytes(a, this.__wbg_ptr);
        var t = o()[a / 4 + 0], e = o()[a / 4 + 1];
        let n;
        return t !== 0 && (n = v(t, e).slice(), _.__wbindgen_free(t, e * 1, 1)), n;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json(t) {
      let e, a;
      try {
        const m = _.__wbindgen_add_to_stack_pointer(-16);
        _.decode_plutus_datum_to_json_str(m, this.__wbg_ptr, t);
        var n = o()[m / 4 + 0], r = o()[m / 4 + 1], d = o()[m / 4 + 2], i = o()[m / 4 + 3], l = n, p = r;
        if (i) throw l = 0, p = 0, c(d);
        return e = l, a = p, f(l, p);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
      }
    }
    static from_json(t, e) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16), i = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), l = g;
        _.encode_json_str_to_plutus_datum(d, i, l, e);
        var a = o()[d / 4 + 0], n = o()[d / 4 + 1], r = o()[d / 4 + 2];
        if (r) throw c(n);
        return O.__wrap(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_address(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, L), _.plutusdata_from_address(r, t.__wbg_ptr);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return O.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_address(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, be), _.plutusdata_as_address(r, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return L.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const bo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_plutuslist_free(b >>> 0));
  it = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(it.prototype);
      return e.__wbg_ptr = t, bo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, bo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_plutuslist_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.plutuslist_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.plutuslist_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return it.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.plutuslist_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.plutuslist_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return it.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.plutuslist_new();
      return it.__wrap(t);
    }
    len() {
      return _.languages_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.plutuslist_get(this.__wbg_ptr, t);
      return O.__wrap(e);
    }
    add(t) {
      w(t, O), _.plutuslist_add(this.__wbg_ptr, t.__wbg_ptr);
    }
  };
  const lo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_plutusmap_free(b >>> 0));
  ye = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ye.prototype);
      return e.__wbg_ptr = t, lo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, lo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_plutusmap_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.plutusmap_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.plutusmap_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ye.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.plutusmap_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.plutusmap_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ye.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.generaltransactionmetadata_new();
      return ye.__wrap(t);
    }
    len() {
      return _.generaltransactionmetadata_len(this.__wbg_ptr) >>> 0;
    }
    insert(t, e) {
      w(t, O), w(e, Je);
      const a = _.plutusmap_insert(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
      return a === 0 ? void 0 : Je.__wrap(a);
    }
    get(t) {
      w(t, O);
      const e = _.plutusmap_get(this.__wbg_ptr, t.__wbg_ptr);
      return e === 0 ? void 0 : Je.__wrap(e);
    }
    keys() {
      const t = _.plutusmap_keys(this.__wbg_ptr);
      return it.__wrap(t);
    }
  };
  const go = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_plutusmapvalues_free(b >>> 0));
  Je = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Je.prototype);
      return e.__wbg_ptr = t, go.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, go.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_plutusmapvalues_free(t);
    }
    static new() {
      const t = _.metadatalist_new();
      return Je.__wrap(t);
    }
    len() {
      return _.languages_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.plutusmapvalues_get(this.__wbg_ptr, t);
      return e === 0 ? void 0 : O.__wrap(e);
    }
    add(t) {
      w(t, O), _.plutusmapvalues_add(this.__wbg_ptr, t.__wbg_ptr);
    }
  };
  const uo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_plutusscript_free(b >>> 0));
  M = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(M.prototype);
      return e.__wbg_ptr = t, uo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, uo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_plutusscript_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.plutusscript_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.plutusscript_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return M.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.plutusscript_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.plutusscript_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return M.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t) {
      const e = h(t, _.__wbindgen_malloc), a = g, n = _.plutusscript_new(e, a);
      return M.__wrap(n);
    }
    static new_v2(t) {
      const e = h(t, _.__wbindgen_malloc), a = g, n = _.plutusscript_new_v2(e, a);
      return M.__wrap(n);
    }
    static new_v3(t) {
      const e = h(t, _.__wbindgen_malloc), a = g, n = _.plutusscript_new_v3(e, a);
      return M.__wrap(n);
    }
    static new_with_version(t, e) {
      const a = h(t, _.__wbindgen_malloc), n = g;
      w(e, D);
      const r = _.plutusscript_new_with_version(a, n, e.__wbg_ptr);
      return M.__wrap(r);
    }
    bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.plutusscript_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes_v2(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.plutusscript_from_bytes_v2(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return M.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes_v3(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.plutusscript_from_bytes_v3(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return M.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes_with_version(t, e) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16), i = h(t, _.__wbindgen_malloc), l = g;
        w(e, D), _.plutusscript_from_bytes_with_version(d, i, l, e.__wbg_ptr);
        var a = o()[d / 4 + 0], n = o()[d / 4 + 1], r = o()[d / 4 + 2];
        if (r) throw c(n);
        return M.__wrap(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_hex_with_version(t, e) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16), i = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), l = g;
        w(e, D), _.plutusscript_from_hex_with_version(d, i, l, e.__wbg_ptr);
        var a = o()[d / 4 + 0], n = o()[d / 4 + 1], r = o()[d / 4 + 2];
        if (r) throw c(n);
        return M.__wrap(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    hash() {
      const t = _.plutusscript_hash(this.__wbg_ptr);
      return Q.__wrap(t);
    }
    language_version() {
      const t = _.plutusscript_language_version(this.__wbg_ptr);
      return D.__wrap(t);
    }
  };
  const fo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_plutusscriptsource_free(b >>> 0));
  me = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(me.prototype);
      return e.__wbg_ptr = t, fo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, fo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_plutusscriptsource_free(t);
    }
    static new(t) {
      w(t, M);
      const e = _.plutusscriptsource_new(t.__wbg_ptr);
      return me.__wrap(e);
    }
    static new_ref_input(t, e, a, n) {
      w(t, Q), w(e, Z), w(a, D);
      const r = _.plutusscriptsource_new_ref_input(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr, n);
      return me.__wrap(r);
    }
    set_required_signers(t) {
      w(t, P), _.plutusscriptsource_set_required_signers(this.__wbg_ptr, t.__wbg_ptr);
    }
    get_ref_script_size() {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.plutusscriptsource_get_ref_script_size(a, this.__wbg_ptr);
        var t = o()[a / 4 + 0], e = o()[a / 4 + 1];
        return t === 0 ? void 0 : e >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const ho = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_plutusscripts_free(b >>> 0));
  St = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(St.prototype);
      return e.__wbg_ptr = t, ho.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ho.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_plutusscripts_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.plutusscripts_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.plutusscripts_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return St.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.plutusscripts_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.plutusscripts_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return St.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.plutusscripts_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.plutusscripts_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.plutusscripts_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return St.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.plutusscripts_new();
      return St.__wrap(t);
    }
    len() {
      return _.credentials_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.plutusscripts_get(this.__wbg_ptr, t);
      return M.__wrap(e);
    }
    add(t) {
      w(t, M), _.plutusscripts_add(this.__wbg_ptr, t.__wbg_ptr);
    }
  };
  const yo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_plutuswitness_free(b >>> 0));
  tt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(tt.prototype);
      return e.__wbg_ptr = t, yo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, yo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_plutuswitness_free(t);
    }
    static new(t, e, a) {
      w(t, M), w(e, O), w(a, st);
      const n = _.plutuswitness_new(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
      return tt.__wrap(n);
    }
    static new_with_ref(t, e, a) {
      w(t, me), w(e, Ee), w(a, st);
      const n = _.plutuswitness_new_with_ref(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
      return tt.__wrap(n);
    }
    static new_without_datum(t, e) {
      w(t, M), w(e, st);
      const a = _.plutuswitness_new_without_datum(t.__wbg_ptr, e.__wbg_ptr);
      return tt.__wrap(a);
    }
    static new_with_ref_without_datum(t, e) {
      w(t, me), w(e, st);
      const a = _.plutuswitness_new_with_ref_without_datum(t.__wbg_ptr, e.__wbg_ptr);
      return tt.__wrap(a);
    }
    script() {
      const t = _.plutuswitness_script(this.__wbg_ptr);
      return t === 0 ? void 0 : M.__wrap(t);
    }
    datum() {
      const t = _.plutuswitness_datum(this.__wbg_ptr);
      return t === 0 ? void 0 : O.__wrap(t);
    }
    redeemer() {
      const t = _.plutuswitness_redeemer(this.__wbg_ptr);
      return st.__wrap(t);
    }
  };
  const vo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_plutuswitnesses_free(b >>> 0));
  At = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(At.prototype);
      return e.__wbg_ptr = t, vo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, vo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_plutuswitnesses_free(t);
    }
    static new() {
      const t = _.costmodel_new();
      return At.__wrap(t);
    }
    len() {
      return _.costmodel_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.plutuswitnesses_get(this.__wbg_ptr, t);
      return tt.__wrap(e);
    }
    add(t) {
      w(t, tt), _.plutuswitnesses_add(this.__wbg_ptr, t.__wbg_ptr);
    }
  };
  const mo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_pointer_free(b >>> 0));
  Ye = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Ye.prototype);
      return e.__wbg_ptr = t, mo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, mo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_pointer_free(t);
    }
    static new(t, e, a) {
      const n = _.pointer_new(t, e, a);
      return Ye.__wrap(n);
    }
    static new_pointer(t, e, a) {
      w(t, y), w(e, y), w(a, y);
      const n = _.pointer_new_pointer(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
      return Ye.__wrap(n);
    }
    slot() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.pointer_slot(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return t >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    tx_index() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.pointer_tx_index(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return t >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    cert_index() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.pointer_cert_index(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return t >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    slot_bignum() {
      const t = _.pointer_slot_bignum(this.__wbg_ptr);
      return y.__wrap(t);
    }
    tx_index_bignum() {
      const t = _.pointer_tx_index_bignum(this.__wbg_ptr);
      return y.__wrap(t);
    }
    cert_index_bignum() {
      const t = _.pointer_cert_index_bignum(this.__wbg_ptr);
      return y.__wrap(t);
    }
  };
  const ko = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_pointeraddress_free(b >>> 0));
  nr = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(nr.prototype);
      return e.__wbg_ptr = t, ko.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ko.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_pointeraddress_free(t);
    }
    static new(t, e, a) {
      w(e, x), w(a, Ye);
      const n = _.pointeraddress_new(t, e.__wbg_ptr, a.__wbg_ptr);
      return nr.__wrap(n);
    }
    payment_cred() {
      const t = _.pointeraddress_payment_cred(this.__wbg_ptr);
      return x.__wrap(t);
    }
    stake_pointer() {
      const t = _.pointeraddress_stake_pointer(this.__wbg_ptr);
      return Ye.__wrap(t);
    }
    to_address() {
      const t = _.pointeraddress_to_address(this.__wbg_ptr);
      return L.__wrap(t);
    }
    static from_address(t) {
      w(t, L);
      const e = _.pointeraddress_from_address(t.__wbg_ptr);
      return e === 0 ? void 0 : nr.__wrap(e);
    }
    network_id() {
      return _.pointeraddress_network_id(this.__wbg_ptr);
    }
  };
  const xo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_poolmetadata_free(b >>> 0));
  Z_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Z_.prototype);
      return e.__wbg_ptr = t, xo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, xo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_poolmetadata_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolmetadata_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.poolmetadata_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Z_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolmetadata_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.poolmetadata_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Z_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolmetadata_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolmetadata_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.poolmetadata_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Z_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    url() {
      const t = _.multihostname_dns_name(this.__wbg_ptr);
      return ar.__wrap(t);
    }
    pool_metadata_hash() {
      const t = _.poolmetadata_pool_metadata_hash(this.__wbg_ptr);
      return ve.__wrap(t);
    }
    static new(t, e) {
      w(t, ar), w(e, ve);
      const a = _.poolmetadata_new(t.__wbg_ptr, e.__wbg_ptr);
      return Z_.__wrap(a);
    }
  };
  const jo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_poolmetadatahash_free(b >>> 0));
  ve = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ve.prototype);
      return e.__wbg_ptr = t, jo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, jo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_poolmetadatahash_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.poolmetadatahash_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ve.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(t) {
      let e, a;
      try {
        const m = _.__wbindgen_add_to_stack_pointer(-16), j = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), z = g;
        _.anchordatahash_to_bech32(m, this.__wbg_ptr, j, z);
        var n = o()[m / 4 + 0], r = o()[m / 4 + 1], d = o()[m / 4 + 2], i = o()[m / 4 + 3], l = n, p = r;
        if (i) throw l = 0, p = 0, c(d);
        return e = l, a = p, f(l, p);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.poolmetadatahash_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ve.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.poolmetadatahash_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ve.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const zo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_poolparams_free(b >>> 0));
  U_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(U_.prototype);
      return e.__wbg_ptr = t, zo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, zo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_poolparams_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolparams_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.poolparams_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return U_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolparams_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.poolparams_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return U_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolparams_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolparams_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.poolparams_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return U_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    operator() {
      const t = _.poolparams_operator(this.__wbg_ptr);
      return q.__wrap(t);
    }
    vrf_keyhash() {
      const t = _.poolparams_vrf_keyhash(this.__wbg_ptr);
      return f_.__wrap(t);
    }
    pledge() {
      const t = _.poolparams_pledge(this.__wbg_ptr);
      return y.__wrap(t);
    }
    cost() {
      const t = _.poolparams_cost(this.__wbg_ptr);
      return y.__wrap(t);
    }
    margin() {
      const t = _.poolparams_margin(this.__wbg_ptr);
      return k.__wrap(t);
    }
    reward_account() {
      const t = _.poolparams_reward_account(this.__wbg_ptr);
      return T.__wrap(t);
    }
    pool_owners() {
      const t = _.poolparams_pool_owners(this.__wbg_ptr);
      return P.__wrap(t);
    }
    relays() {
      const t = _.poolparams_relays(this.__wbg_ptr);
      return M_.__wrap(t);
    }
    pool_metadata() {
      const t = _.poolparams_pool_metadata(this.__wbg_ptr);
      return t === 0 ? void 0 : Z_.__wrap(t);
    }
    static new(t, e, a, n, r, d, i, l, p) {
      w(t, q), w(e, f_), w(a, y), w(n, y), w(r, k), w(d, T), w(i, P), w(l, M_);
      let m = 0;
      wt(p) || (w(p, Z_), m = p.__destroy_into_raw());
      const j = _.poolparams_new(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr, n.__wbg_ptr, r.__wbg_ptr, d.__wbg_ptr, i.__wbg_ptr, l.__wbg_ptr, m);
      return U_.__wrap(j);
    }
  };
  const Fo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_poolregistration_free(b >>> 0));
  E_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(E_.prototype);
      return e.__wbg_ptr = t, Fo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Fo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_poolregistration_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolregistration_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.poolregistration_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return E_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolregistration_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.poolregistration_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return E_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolregistration_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolregistration_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.poolregistration_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return E_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    pool_params() {
      const t = _.poolregistration_pool_params(this.__wbg_ptr);
      return U_.__wrap(t);
    }
    static new(t) {
      w(t, U_);
      const e = _.poolregistration_new(t.__wbg_ptr);
      return E_.__wrap(e);
    }
  };
  const Ro = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_poolretirement_free(b >>> 0));
  K_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(K_.prototype);
      return e.__wbg_ptr = t, Ro.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ro.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_poolretirement_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolretirement_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.poolretirement_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return K_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolretirement_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.poolretirement_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return K_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolretirement_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolretirement_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.poolretirement_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return K_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    pool_keyhash() {
      const t = _.poolretirement_pool_keyhash(this.__wbg_ptr);
      return q.__wrap(t);
    }
    epoch() {
      return _.poolretirement_epoch(this.__wbg_ptr) >>> 0;
    }
    static new(t, e) {
      w(t, q);
      const a = _.poolretirement_new(t.__wbg_ptr, e);
      return K_.__wrap(a);
    }
  };
  const Oo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_poolvotingthresholds_free(b >>> 0));
  S_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(S_.prototype);
      return e.__wbg_ptr = t, Oo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Oo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_poolvotingthresholds_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolvotingthresholds_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.poolvotingthresholds_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return S_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolvotingthresholds_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.poolvotingthresholds_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return S_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolvotingthresholds_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.poolvotingthresholds_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.poolvotingthresholds_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return S_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t, e, a, n, r) {
      w(t, k), w(e, k), w(a, k), w(n, k), w(r, k);
      const d = _.poolvotingthresholds_new(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr, n.__wbg_ptr, r.__wbg_ptr);
      return S_.__wrap(d);
    }
    motion_no_confidence() {
      const t = _.drepvotingthresholds_motion_no_confidence(this.__wbg_ptr);
      return k.__wrap(t);
    }
    committee_normal() {
      const t = _.drepvotingthresholds_committee_normal(this.__wbg_ptr);
      return k.__wrap(t);
    }
    committee_no_confidence() {
      const t = _.drepvotingthresholds_committee_no_confidence(this.__wbg_ptr);
      return k.__wrap(t);
    }
    hard_fork_initiation() {
      const t = _.drepvotingthresholds_update_constitution(this.__wbg_ptr);
      return k.__wrap(t);
    }
    security_relevant_threshold() {
      const t = _.drepvotingthresholds_hard_fork_initiation(this.__wbg_ptr);
      return k.__wrap(t);
    }
  };
  const qo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_privatekey_free(b >>> 0));
  mt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(mt.prototype);
      return e.__wbg_ptr = t, qo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, qo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_privatekey_free(t);
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.privatekey_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return mt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.privatekey_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    sign(t) {
      const e = h(t, _.__wbindgen_malloc), a = g, n = _.privatekey_sign(this.__wbg_ptr, e, a);
      return pt.__wrap(n);
    }
    static from_normal_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.privatekey_from_normal_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return mt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_extended_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.privatekey_from_extended_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return mt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.privatekey_as_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.privatekey_to_bech32(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.privatekey_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return mt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static generate_ed25519extended() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.privatekey_generate_ed25519extended(n);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return mt.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static generate_ed25519() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.privatekey_generate_ed25519(n);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return mt.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_public() {
      const t = _.privatekey_to_public(this.__wbg_ptr);
      return Xt.__wrap(t);
    }
  };
  const $o = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_proposedprotocolparameterupdates_free(b >>> 0));
  W_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(W_.prototype);
      return e.__wbg_ptr = t, $o.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, $o.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_proposedprotocolparameterupdates_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.proposedprotocolparameterupdates_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.proposedprotocolparameterupdates_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return W_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.proposedprotocolparameterupdates_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.proposedprotocolparameterupdates_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return W_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.proposedprotocolparameterupdates_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.proposedprotocolparameterupdates_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.proposedprotocolparameterupdates_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return W_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.auxiliarydataset_new();
      return W_.__wrap(t);
    }
    len() {
      return _.auxiliarydataset_len(this.__wbg_ptr) >>> 0;
    }
    insert(t, e) {
      w(t, Qt), w(e, ot);
      const a = _.proposedprotocolparameterupdates_insert(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
      return a === 0 ? void 0 : ot.__wrap(a);
    }
    get(t) {
      w(t, Qt);
      const e = _.proposedprotocolparameterupdates_get(this.__wbg_ptr, t.__wbg_ptr);
      return e === 0 ? void 0 : ot.__wrap(e);
    }
    keys() {
      const t = _.proposedprotocolparameterupdates_keys(this.__wbg_ptr);
      return we.__wrap(t);
    }
  };
  const Lo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_protocolparamupdate_free(b >>> 0));
  ot = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ot.prototype);
      return e.__wbg_ptr = t, Lo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Lo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_protocolparamupdate_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolparamupdate_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.protocolparamupdate_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ot.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolparamupdate_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.protocolparamupdate_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ot.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolparamupdate_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolparamupdate_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.protocolparamupdate_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ot.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_minfee_a(t) {
      w(t, y), _.protocolparamupdate_set_minfee_a(this.__wbg_ptr, t.__wbg_ptr);
    }
    minfee_a() {
      const t = _.protocolparamupdate_minfee_a(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    set_minfee_b(t) {
      w(t, y), _.protocolparamupdate_set_minfee_b(this.__wbg_ptr, t.__wbg_ptr);
    }
    minfee_b() {
      const t = _.protocolparamupdate_minfee_b(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    set_max_block_body_size(t) {
      _.protocolparamupdate_set_max_block_body_size(this.__wbg_ptr, t);
    }
    max_block_body_size() {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolparamupdate_max_block_body_size(a, this.__wbg_ptr);
        var t = o()[a / 4 + 0], e = o()[a / 4 + 1];
        return t === 0 ? void 0 : e >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_max_tx_size(t) {
      _.protocolparamupdate_set_max_tx_size(this.__wbg_ptr, t);
    }
    max_tx_size() {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolparamupdate_max_tx_size(a, this.__wbg_ptr);
        var t = o()[a / 4 + 0], e = o()[a / 4 + 1];
        return t === 0 ? void 0 : e >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_max_block_header_size(t) {
      _.protocolparamupdate_set_max_block_header_size(this.__wbg_ptr, t);
    }
    max_block_header_size() {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolparamupdate_max_block_header_size(a, this.__wbg_ptr);
        var t = o()[a / 4 + 0], e = o()[a / 4 + 1];
        return t === 0 ? void 0 : e >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_key_deposit(t) {
      w(t, y), _.protocolparamupdate_set_key_deposit(this.__wbg_ptr, t.__wbg_ptr);
    }
    key_deposit() {
      const t = _.protocolparamupdate_key_deposit(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    set_pool_deposit(t) {
      w(t, y), _.protocolparamupdate_set_pool_deposit(this.__wbg_ptr, t.__wbg_ptr);
    }
    pool_deposit() {
      const t = _.protocolparamupdate_pool_deposit(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    set_max_epoch(t) {
      _.protocolparamupdate_set_max_epoch(this.__wbg_ptr, t);
    }
    max_epoch() {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolparamupdate_max_epoch(a, this.__wbg_ptr);
        var t = o()[a / 4 + 0], e = o()[a / 4 + 1];
        return t === 0 ? void 0 : e >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_n_opt(t) {
      _.protocolparamupdate_set_n_opt(this.__wbg_ptr, t);
    }
    n_opt() {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolparamupdate_n_opt(a, this.__wbg_ptr);
        var t = o()[a / 4 + 0], e = o()[a / 4 + 1];
        return t === 0 ? void 0 : e >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_pool_pledge_influence(t) {
      w(t, k), _.protocolparamupdate_set_pool_pledge_influence(this.__wbg_ptr, t.__wbg_ptr);
    }
    pool_pledge_influence() {
      const t = _.protocolparamupdate_pool_pledge_influence(this.__wbg_ptr);
      return t === 0 ? void 0 : k.__wrap(t);
    }
    set_expansion_rate(t) {
      w(t, k), _.protocolparamupdate_set_expansion_rate(this.__wbg_ptr, t.__wbg_ptr);
    }
    expansion_rate() {
      const t = _.protocolparamupdate_expansion_rate(this.__wbg_ptr);
      return t === 0 ? void 0 : k.__wrap(t);
    }
    set_treasury_growth_rate(t) {
      w(t, k), _.protocolparamupdate_set_treasury_growth_rate(this.__wbg_ptr, t.__wbg_ptr);
    }
    treasury_growth_rate() {
      const t = _.protocolparamupdate_treasury_growth_rate(this.__wbg_ptr);
      return t === 0 ? void 0 : k.__wrap(t);
    }
    d() {
      const t = _.protocolparamupdate_d(this.__wbg_ptr);
      return t === 0 ? void 0 : k.__wrap(t);
    }
    extra_entropy() {
      const t = _.protocolparamupdate_extra_entropy(this.__wbg_ptr);
      return t === 0 ? void 0 : y_.__wrap(t);
    }
    set_protocol_version(t) {
      w(t, at), _.protocolparamupdate_set_protocol_version(this.__wbg_ptr, t.__wbg_ptr);
    }
    protocol_version() {
      const t = _.protocolparamupdate_protocol_version(this.__wbg_ptr);
      return t === 0 ? void 0 : at.__wrap(t);
    }
    set_min_pool_cost(t) {
      w(t, y), _.protocolparamupdate_set_min_pool_cost(this.__wbg_ptr, t.__wbg_ptr);
    }
    min_pool_cost() {
      const t = _.protocolparamupdate_min_pool_cost(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    set_ada_per_utxo_byte(t) {
      w(t, y), _.protocolparamupdate_set_ada_per_utxo_byte(this.__wbg_ptr, t.__wbg_ptr);
    }
    ada_per_utxo_byte() {
      const t = _.protocolparamupdate_ada_per_utxo_byte(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    set_cost_models(t) {
      w(t, kt), _.protocolparamupdate_set_cost_models(this.__wbg_ptr, t.__wbg_ptr);
    }
    cost_models() {
      const t = _.protocolparamupdate_cost_models(this.__wbg_ptr);
      return t === 0 ? void 0 : kt.__wrap(t);
    }
    set_execution_costs(t) {
      w(t, Rt), _.protocolparamupdate_set_execution_costs(this.__wbg_ptr, t.__wbg_ptr);
    }
    execution_costs() {
      const t = _.protocolparamupdate_execution_costs(this.__wbg_ptr);
      return t === 0 ? void 0 : Rt.__wrap(t);
    }
    set_max_tx_ex_units(t) {
      w(t, nt), _.protocolparamupdate_set_max_tx_ex_units(this.__wbg_ptr, t.__wbg_ptr);
    }
    max_tx_ex_units() {
      const t = _.protocolparamupdate_max_tx_ex_units(this.__wbg_ptr);
      return t === 0 ? void 0 : nt.__wrap(t);
    }
    set_max_block_ex_units(t) {
      w(t, nt), _.protocolparamupdate_set_max_block_ex_units(this.__wbg_ptr, t.__wbg_ptr);
    }
    max_block_ex_units() {
      const t = _.protocolparamupdate_max_block_ex_units(this.__wbg_ptr);
      return t === 0 ? void 0 : nt.__wrap(t);
    }
    set_max_value_size(t) {
      _.protocolparamupdate_set_max_value_size(this.__wbg_ptr, t);
    }
    max_value_size() {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolparamupdate_max_value_size(a, this.__wbg_ptr);
        var t = o()[a / 4 + 0], e = o()[a / 4 + 1];
        return t === 0 ? void 0 : e >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_collateral_percentage(t) {
      _.protocolparamupdate_set_collateral_percentage(this.__wbg_ptr, t);
    }
    collateral_percentage() {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolparamupdate_collateral_percentage(a, this.__wbg_ptr);
        var t = o()[a / 4 + 0], e = o()[a / 4 + 1];
        return t === 0 ? void 0 : e >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_max_collateral_inputs(t) {
      _.protocolparamupdate_set_max_collateral_inputs(this.__wbg_ptr, t);
    }
    max_collateral_inputs() {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolparamupdate_max_collateral_inputs(a, this.__wbg_ptr);
        var t = o()[a / 4 + 0], e = o()[a / 4 + 1];
        return t === 0 ? void 0 : e >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_pool_voting_thresholds(t) {
      w(t, S_), _.protocolparamupdate_set_pool_voting_thresholds(this.__wbg_ptr, t.__wbg_ptr);
    }
    pool_voting_thresholds() {
      const t = _.protocolparamupdate_pool_voting_thresholds(this.__wbg_ptr);
      return t === 0 ? void 0 : S_.__wrap(t);
    }
    set_drep_voting_thresholds(t) {
      w(t, q_), _.protocolparamupdate_set_drep_voting_thresholds(this.__wbg_ptr, t.__wbg_ptr);
    }
    drep_voting_thresholds() {
      const t = _.protocolparamupdate_drep_voting_thresholds(this.__wbg_ptr);
      return t === 0 ? void 0 : q_.__wrap(t);
    }
    set_min_committee_size(t) {
      _.protocolparamupdate_set_min_committee_size(this.__wbg_ptr, t);
    }
    min_committee_size() {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolparamupdate_min_committee_size(a, this.__wbg_ptr);
        var t = o()[a / 4 + 0], e = o()[a / 4 + 1];
        return t === 0 ? void 0 : e >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_committee_term_limit(t) {
      _.protocolparamupdate_set_committee_term_limit(this.__wbg_ptr, t);
    }
    committee_term_limit() {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolparamupdate_committee_term_limit(a, this.__wbg_ptr);
        var t = o()[a / 4 + 0], e = o()[a / 4 + 1];
        return t === 0 ? void 0 : e >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_governance_action_validity_period(t) {
      _.protocolparamupdate_set_governance_action_validity_period(this.__wbg_ptr, t);
    }
    governance_action_validity_period() {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolparamupdate_governance_action_validity_period(a, this.__wbg_ptr);
        var t = o()[a / 4 + 0], e = o()[a / 4 + 1];
        return t === 0 ? void 0 : e >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_governance_action_deposit(t) {
      w(t, y), _.protocolparamupdate_set_governance_action_deposit(this.__wbg_ptr, t.__wbg_ptr);
    }
    governance_action_deposit() {
      const t = _.protocolparamupdate_governance_action_deposit(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    set_drep_deposit(t) {
      w(t, y), _.protocolparamupdate_set_drep_deposit(this.__wbg_ptr, t.__wbg_ptr);
    }
    drep_deposit() {
      const t = _.protocolparamupdate_drep_deposit(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    set_drep_inactivity_period(t) {
      _.protocolparamupdate_set_drep_inactivity_period(this.__wbg_ptr, t);
    }
    drep_inactivity_period() {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolparamupdate_drep_inactivity_period(a, this.__wbg_ptr);
        var t = o()[a / 4 + 0], e = o()[a / 4 + 1];
        return t === 0 ? void 0 : e >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_ref_script_coins_per_byte(t) {
      w(t, k), _.protocolparamupdate_set_ref_script_coins_per_byte(this.__wbg_ptr, t.__wbg_ptr);
    }
    ref_script_coins_per_byte() {
      const t = _.protocolparamupdate_ref_script_coins_per_byte(this.__wbg_ptr);
      return t === 0 ? void 0 : k.__wrap(t);
    }
    static new() {
      const t = _.protocolparamupdate_new();
      return ot.__wrap(t);
    }
  };
  const Jo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_protocolversion_free(b >>> 0));
  at = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(at.prototype);
      return e.__wbg_ptr = t, Jo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Jo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_protocolversion_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolversion_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.protocolversion_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return at.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolversion_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.protocolversion_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return at.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolversion_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.protocolversion_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.protocolversion_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return at.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    major() {
      return _.protocolversion_major(this.__wbg_ptr) >>> 0;
    }
    minor() {
      return _.protocolversion_minor(this.__wbg_ptr) >>> 0;
    }
    static new(t, e) {
      const a = _.protocolversion_new(t, e);
      return at.__wrap(a);
    }
  };
  const Yo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_publickey_free(b >>> 0));
  Xt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Xt.prototype);
      return e.__wbg_ptr = t, Yo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Yo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_publickey_free(t);
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.publickey_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Xt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.publickey_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    hash() {
      const t = _.publickey_hash(this.__wbg_ptr);
      return q.__wrap(t);
    }
    verify(t, e) {
      const a = h(t, _.__wbindgen_malloc), n = g;
      return w(e, pt), _.publickey_verify(this.__wbg_ptr, a, n, e.__wbg_ptr) !== 0;
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.publickey_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Xt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.publickey_as_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.publickey_to_bech32(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.publickey_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Xt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const fs = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_publickeys_free(b >>> 0));
  iH = class {
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, fs.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_publickeys_free(t);
    }
    constructor() {
      const t = _.publickeys_new();
      return this.__wbg_ptr = t >>> 0, this;
    }
    size() {
      return _.governanceactionids_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.publickeys_get(this.__wbg_ptr, t);
      return Xt.__wrap(e);
    }
    add(t) {
      w(t, Xt), _.publickeys_add(this.__wbg_ptr, t.__wbg_ptr);
    }
  };
  const Qo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_redeemer_free(b >>> 0));
  st = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(st.prototype);
      return e.__wbg_ptr = t, Qo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Qo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_redeemer_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.redeemer_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.redeemer_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return st.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.redeemer_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.redeemer_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return st.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.redeemer_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.redeemer_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.redeemer_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return st.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    tag() {
      const t = _.redeemer_tag(this.__wbg_ptr);
      return ct.__wrap(t);
    }
    index() {
      const t = _.redeemer_index(this.__wbg_ptr);
      return y.__wrap(t);
    }
    data() {
      const t = _.redeemer_data(this.__wbg_ptr);
      return O.__wrap(t);
    }
    ex_units() {
      const t = _.redeemer_ex_units(this.__wbg_ptr);
      return nt.__wrap(t);
    }
    static new(t, e, a, n) {
      w(t, ct), w(e, y), w(a, O), w(n, nt);
      const r = _.redeemer_new(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr, n.__wbg_ptr);
      return st.__wrap(r);
    }
  };
  const Xo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_redeemertag_free(b >>> 0));
  ct = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ct.prototype);
      return e.__wbg_ptr = t, Xo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Xo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_redeemertag_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.redeemertag_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.redeemertag_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ct.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.redeemertag_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.redeemertag_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ct.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.redeemertag_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.redeemertag_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.redeemertag_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ct.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_spend() {
      const t = _.redeemertag_new_spend();
      return ct.__wrap(t);
    }
    static new_mint() {
      const t = _.redeemertag_new_mint();
      return ct.__wrap(t);
    }
    static new_cert() {
      const t = _.redeemertag_new_cert();
      return ct.__wrap(t);
    }
    static new_reward() {
      const t = _.redeemertag_new_reward();
      return ct.__wrap(t);
    }
    static new_vote() {
      const t = _.redeemertag_new_vote();
      return ct.__wrap(t);
    }
    static new_voting_proposal() {
      const t = _.redeemertag_new_voting_proposal();
      return ct.__wrap(t);
    }
    kind() {
      return _.redeemertag_kind(this.__wbg_ptr);
    }
  };
  const Zo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_redeemers_free(b >>> 0));
  Wt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Wt.prototype);
      return e.__wbg_ptr = t, Zo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Zo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_redeemers_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.redeemers_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.redeemers_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Wt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.redeemers_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.redeemers_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Wt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.redeemers_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.redeemers_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.redeemers_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Wt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.redeemers_new();
      return Wt.__wrap(t);
    }
    len() {
      return _.fixedtransactionbodies_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.redeemers_get(this.__wbg_ptr, t);
      return st.__wrap(e);
    }
    add(t) {
      w(t, st), _.redeemers_add(this.__wbg_ptr, t.__wbg_ptr);
    }
    get_container_type() {
      return _.redeemers_get_container_type(this.__wbg_ptr);
    }
    total_ex_units() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.redeemers_total_ex_units(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return nt.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Uo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_relay_free(b >>> 0));
  Zt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Zt.prototype);
      return e.__wbg_ptr = t, Uo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Uo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_relay_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.relay_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.relay_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Zt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.relay_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.relay_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Zt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.relay_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.relay_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.relay_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Zt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_single_host_addr(t) {
      w(t, N_);
      const e = _.relay_new_single_host_addr(t.__wbg_ptr);
      return Zt.__wrap(e);
    }
    static new_single_host_name(t) {
      w(t, C_);
      const e = _.relay_new_single_host_name(t.__wbg_ptr);
      return Zt.__wrap(e);
    }
    static new_multi_host_name(t) {
      w(t, X_);
      const e = _.relay_new_multi_host_name(t.__wbg_ptr);
      return Zt.__wrap(e);
    }
    kind() {
      return _.relay_kind(this.__wbg_ptr);
    }
    as_single_host_addr() {
      const t = _.relay_as_single_host_addr(this.__wbg_ptr);
      return t === 0 ? void 0 : N_.__wrap(t);
    }
    as_single_host_name() {
      const t = _.relay_as_single_host_name(this.__wbg_ptr);
      return t === 0 ? void 0 : C_.__wrap(t);
    }
    as_multi_host_name() {
      const t = _.relay_as_multi_host_name(this.__wbg_ptr);
      return t === 0 ? void 0 : X_.__wrap(t);
    }
  };
  const Eo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_relays_free(b >>> 0));
  M_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(M_.prototype);
      return e.__wbg_ptr = t, Eo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Eo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_relays_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.relays_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.relays_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return M_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.relays_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.relays_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return M_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.relays_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.relays_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.relays_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return M_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.relays_new();
      return M_.__wrap(t);
    }
    len() {
      return _.relays_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.relays_get(this.__wbg_ptr, t);
      return Zt.__wrap(e);
    }
    add(t) {
      w(t, Zt), _.relays_add(this.__wbg_ptr, t.__wbg_ptr);
    }
  };
  const Ko = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_rewardaddress_free(b >>> 0));
  T = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(T.prototype);
      return e.__wbg_ptr = t, Ko.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ko.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_rewardaddress_free(t);
    }
    static new(t, e) {
      w(e, x);
      const a = _.enterpriseaddress_new(t, e.__wbg_ptr);
      return T.__wrap(a);
    }
    payment_cred() {
      const t = _.baseaddress_payment_cred(this.__wbg_ptr);
      return x.__wrap(t);
    }
    to_address() {
      const t = _.rewardaddress_to_address(this.__wbg_ptr);
      return L.__wrap(t);
    }
    static from_address(t) {
      w(t, L);
      const e = _.rewardaddress_from_address(t.__wbg_ptr);
      return e === 0 ? void 0 : T.__wrap(e);
    }
    network_id() {
      return _.enterpriseaddress_network_id(this.__wbg_ptr);
    }
  };
  const So = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_rewardaddresses_free(b >>> 0));
  G_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(G_.prototype);
      return e.__wbg_ptr = t, So.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, So.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_rewardaddresses_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.rewardaddresses_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.rewardaddresses_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return G_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.rewardaddresses_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.rewardaddresses_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return G_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.rewardaddresses_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.rewardaddresses_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.rewardaddresses_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return G_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.genesishashes_new();
      return G_.__wrap(t);
    }
    len() {
      return _.assetnames_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.rewardaddresses_get(this.__wbg_ptr, t);
      return T.__wrap(e);
    }
    add(t) {
      w(t, T), _.rewardaddresses_add(this.__wbg_ptr, t.__wbg_ptr);
    }
  };
  const Wo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_scriptall_free(b >>> 0));
  H_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(H_.prototype);
      return e.__wbg_ptr = t, Wo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Wo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_scriptall_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptall_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.scriptall_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return H_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptall_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.scriptall_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return H_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptall_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptall_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.scriptall_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return H_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    native_scripts() {
      const t = _.scriptall_native_scripts(this.__wbg_ptr);
      return E.__wrap(t);
    }
    static new(t) {
      w(t, E);
      const e = _.scriptall_new(t.__wbg_ptr);
      return H_.__wrap(e);
    }
  };
  const Mo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_scriptany_free(b >>> 0));
  A_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(A_.prototype);
      return e.__wbg_ptr = t, Mo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Mo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_scriptany_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptany_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.scriptany_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return A_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptany_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.scriptany_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return A_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptany_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptany_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.scriptany_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return A_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    native_scripts() {
      const t = _.scriptall_native_scripts(this.__wbg_ptr);
      return E.__wrap(t);
    }
    static new(t) {
      w(t, E);
      const e = _.scriptall_new(t.__wbg_ptr);
      return A_.__wrap(e);
    }
  };
  const Go = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_scriptdatahash_free(b >>> 0));
  u_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(u_.prototype);
      return e.__wbg_ptr = t, Go.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Go.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_scriptdatahash_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.scriptdatahash_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return u_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(t) {
      let e, a;
      try {
        const m = _.__wbindgen_add_to_stack_pointer(-16), j = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), z = g;
        _.anchordatahash_to_bech32(m, this.__wbg_ptr, j, z);
        var n = o()[m / 4 + 0], r = o()[m / 4 + 1], d = o()[m / 4 + 2], i = o()[m / 4 + 3], l = n, p = r;
        if (i) throw l = 0, p = 0, c(d);
        return e = l, a = p, f(l, p);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.scriptdatahash_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return u_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.scriptdatahash_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return u_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Ho = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_scripthash_free(b >>> 0));
  Q = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Q.prototype);
      return e.__wbg_ptr = t, Ho.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ho.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_scripthash_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.scripthash_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Q.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.ed25519keyhash_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(t) {
      let e, a;
      try {
        const m = _.__wbindgen_add_to_stack_pointer(-16), j = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), z = g;
        _.ed25519keyhash_to_bech32(m, this.__wbg_ptr, j, z);
        var n = o()[m / 4 + 0], r = o()[m / 4 + 1], d = o()[m / 4 + 2], i = o()[m / 4 + 3], l = n, p = r;
        if (i) throw l = 0, p = 0, c(d);
        return e = l, a = p, f(l, p);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.scripthash_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Q.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.ed25519keyhash_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.scripthash_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Q.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Ao = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_scripthashes_free(b >>> 0));
  I_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(I_.prototype);
      return e.__wbg_ptr = t, Ao.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ao.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_scripthashes_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.scripthashes_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.scripthashes_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return I_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.scripthashes_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.scripthashes_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return I_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.scripthashes_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.scripthashes_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.scripthashes_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return I_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.genesishashes_new();
      return I_.__wrap(t);
    }
    len() {
      return _.assetnames_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.scripthashes_get(this.__wbg_ptr, t);
      return Q.__wrap(e);
    }
    add(t) {
      w(t, Q), _.scripthashes_add(this.__wbg_ptr, t.__wbg_ptr);
    }
  };
  const Io = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_scriptnofk_free(b >>> 0));
  D_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(D_.prototype);
      return e.__wbg_ptr = t, Io.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Io.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_scriptnofk_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptnofk_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.scriptnofk_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return D_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptnofk_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.scriptnofk_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return D_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptnofk_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptnofk_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.scriptnofk_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return D_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    n() {
      return _.scriptnofk_n(this.__wbg_ptr) >>> 0;
    }
    native_scripts() {
      const t = _.scriptall_native_scripts(this.__wbg_ptr);
      return E.__wrap(t);
    }
    static new(t, e) {
      w(e, E);
      const a = _.scriptnofk_new(t, e.__wbg_ptr);
      return D_.__wrap(a);
    }
  };
  const Do = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_scriptpubkey_free(b >>> 0));
  T_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(T_.prototype);
      return e.__wbg_ptr = t, Do.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Do.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_scriptpubkey_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptpubkey_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.scriptpubkey_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return T_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptpubkey_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.scriptpubkey_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return T_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptpubkey_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptpubkey_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.scriptpubkey_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return T_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    addr_keyhash() {
      const t = _.scriptpubkey_addr_keyhash(this.__wbg_ptr);
      return q.__wrap(t);
    }
    static new(t) {
      w(t, q);
      const e = _.scriptpubkey_new(t.__wbg_ptr);
      return T_.__wrap(e);
    }
  };
  const To = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_scriptref_free(b >>> 0));
  xt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(xt.prototype);
      return e.__wbg_ptr = t, To.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, To.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_scriptref_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptref_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.scriptref_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return xt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptref_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.scriptref_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return xt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptref_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptref_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.scriptref_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return xt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_native_script(t) {
      w(t, W);
      const e = _.scriptref_new_native_script(t.__wbg_ptr);
      return xt.__wrap(e);
    }
    static new_plutus_script(t) {
      w(t, M);
      const e = _.scriptref_new_plutus_script(t.__wbg_ptr);
      return xt.__wrap(e);
    }
    is_native_script() {
      return _.scriptref_is_native_script(this.__wbg_ptr) !== 0;
    }
    is_plutus_script() {
      return _.scriptref_is_plutus_script(this.__wbg_ptr) !== 0;
    }
    native_script() {
      const t = _.scriptref_native_script(this.__wbg_ptr);
      return t === 0 ? void 0 : W.__wrap(t);
    }
    plutus_script() {
      const t = _.scriptref_plutus_script(this.__wbg_ptr);
      return t === 0 ? void 0 : M.__wrap(t);
    }
    to_unwrapped_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.scriptref_to_unwrapped_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const No = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_singlehostaddr_free(b >>> 0));
  N_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(N_.prototype);
      return e.__wbg_ptr = t, No.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, No.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_singlehostaddr_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.singlehostaddr_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.singlehostaddr_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return N_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.singlehostaddr_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.singlehostaddr_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return N_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.singlehostaddr_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.singlehostaddr_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.singlehostaddr_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return N_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    port() {
      const t = _.singlehostaddr_port(this.__wbg_ptr);
      return t === 16777215 ? void 0 : t;
    }
    ipv4() {
      const t = _.singlehostaddr_ipv4(this.__wbg_ptr);
      return t === 0 ? void 0 : L_.__wrap(t);
    }
    ipv6() {
      const t = _.singlehostaddr_ipv6(this.__wbg_ptr);
      return t === 0 ? void 0 : J_.__wrap(t);
    }
    static new(t, e, a) {
      let n = 0;
      wt(e) || (w(e, L_), n = e.__destroy_into_raw());
      let r = 0;
      wt(a) || (w(a, J_), r = a.__destroy_into_raw());
      const d = _.singlehostaddr_new(wt(t) ? 16777215 : t, n, r);
      return N_.__wrap(d);
    }
  };
  const Co = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_singlehostname_free(b >>> 0));
  C_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(C_.prototype);
      return e.__wbg_ptr = t, Co.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Co.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_singlehostname_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.singlehostname_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.singlehostname_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return C_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.singlehostname_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.singlehostname_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return C_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.singlehostname_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.singlehostname_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.singlehostname_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return C_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    port() {
      const t = _.singlehostname_port(this.__wbg_ptr);
      return t === 16777215 ? void 0 : t;
    }
    dns_name() {
      const t = _.multihostname_dns_name(this.__wbg_ptr);
      return F_.__wrap(t);
    }
    static new(t, e) {
      w(e, F_);
      const a = _.singlehostname_new(wt(t) ? 16777215 : t, e.__wbg_ptr);
      return C_.__wrap(a);
    }
  };
  const Vo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_stakeandvotedelegation_free(b >>> 0));
  V_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(V_.prototype);
      return e.__wbg_ptr = t, Vo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Vo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_stakeandvotedelegation_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakeandvotedelegation_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.stakeandvotedelegation_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return V_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakeandvotedelegation_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.stakeandvotedelegation_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return V_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakeandvotedelegation_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakeandvotedelegation_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.stakeandvotedelegation_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return V_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    stake_credential() {
      const t = _.stakeandvotedelegation_stake_credential(this.__wbg_ptr);
      return x.__wrap(t);
    }
    pool_keyhash() {
      const t = _.stakeandvotedelegation_pool_keyhash(this.__wbg_ptr);
      return q.__wrap(t);
    }
    drep() {
      const t = _.stakeandvotedelegation_drep(this.__wbg_ptr);
      return H.__wrap(t);
    }
    static new(t, e, a) {
      w(t, x), w(e, q), w(a, H);
      const n = _.stakeandvotedelegation_new(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
      return V_.__wrap(n);
    }
    has_script_credentials() {
      return _.stakeandvotedelegation_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const Po = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_stakedelegation_free(b >>> 0));
  P_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(P_.prototype);
      return e.__wbg_ptr = t, Po.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Po.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_stakedelegation_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakedelegation_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.stakedelegation_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return P_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakedelegation_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.stakedelegation_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return P_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakedelegation_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakedelegation_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.stakedelegation_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return P_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    stake_credential() {
      const t = _.stakeandvotedelegation_stake_credential(this.__wbg_ptr);
      return x.__wrap(t);
    }
    pool_keyhash() {
      const t = _.stakedelegation_pool_keyhash(this.__wbg_ptr);
      return q.__wrap(t);
    }
    static new(t, e) {
      w(t, x), w(e, q);
      const a = _.stakedelegation_new(t.__wbg_ptr, e.__wbg_ptr);
      return P_.__wrap(a);
    }
    has_script_credentials() {
      return _.stakeandvotedelegation_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const Bo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_stakederegistration_free(b >>> 0));
  jt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(jt.prototype);
      return e.__wbg_ptr = t, Bo.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Bo.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_stakederegistration_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakederegistration_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.stakederegistration_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return jt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakederegistration_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.stakederegistration_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return jt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakederegistration_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakederegistration_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.stakederegistration_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return jt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    stake_credential() {
      const t = _.stakederegistration_stake_credential(this.__wbg_ptr);
      return x.__wrap(t);
    }
    coin() {
      const t = _.stakederegistration_coin(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    static new(t) {
      w(t, x);
      const e = _.stakederegistration_new(t.__wbg_ptr);
      return jt.__wrap(e);
    }
    static new_with_explicit_refund(t, e) {
      w(t, x), w(e, y);
      const a = _.stakederegistration_new_with_explicit_refund(t.__wbg_ptr, e.__wbg_ptr);
      return jt.__wrap(a);
    }
    has_script_credentials() {
      return _.stakederegistration_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const ta = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_stakeregistration_free(b >>> 0));
  zt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(zt.prototype);
      return e.__wbg_ptr = t, ta.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ta.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_stakeregistration_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakeregistration_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.stakeregistration_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return zt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakeregistration_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.stakeregistration_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return zt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakeregistration_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakeregistration_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.stakeregistration_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return zt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    stake_credential() {
      const t = _.stakeregistration_stake_credential(this.__wbg_ptr);
      return x.__wrap(t);
    }
    coin() {
      const t = _.stakeregistration_coin(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    static new(t) {
      w(t, x);
      const e = _.stakeregistration_new(t.__wbg_ptr);
      return zt.__wrap(e);
    }
    static new_with_explicit_deposit(t, e) {
      w(t, x), w(e, y);
      const a = _.stakeregistration_new_with_explicit_deposit(t.__wbg_ptr, e.__wbg_ptr);
      return zt.__wrap(a);
    }
    has_script_credentials() {
      return _.stakeregistration_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const _a = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_stakeregistrationanddelegation_free(b >>> 0));
  B_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(B_.prototype);
      return e.__wbg_ptr = t, _a.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, _a.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_stakeregistrationanddelegation_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakeregistrationanddelegation_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.stakeregistrationanddelegation_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return B_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakeregistrationanddelegation_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.stakeregistrationanddelegation_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return B_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakeregistrationanddelegation_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakeregistrationanddelegation_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.stakeregistrationanddelegation_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return B_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    stake_credential() {
      const t = _.stakeregistrationanddelegation_stake_credential(this.__wbg_ptr);
      return x.__wrap(t);
    }
    pool_keyhash() {
      const t = _.stakeregistrationanddelegation_pool_keyhash(this.__wbg_ptr);
      return q.__wrap(t);
    }
    coin() {
      const t = _.drepderegistration_coin(this.__wbg_ptr);
      return y.__wrap(t);
    }
    static new(t, e, a) {
      w(t, x), w(e, q), w(a, y);
      const n = _.stakeregistrationanddelegation_new(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
      return B_.__wrap(n);
    }
    has_script_credentials() {
      return _.stakeregistrationanddelegation_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const ea = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_stakevoteregistrationanddelegation_free(b >>> 0));
  te = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(te.prototype);
      return e.__wbg_ptr = t, ea.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ea.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_stakevoteregistrationanddelegation_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakevoteregistrationanddelegation_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.stakevoteregistrationanddelegation_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return te.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakevoteregistrationanddelegation_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.stakevoteregistrationanddelegation_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return te.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakevoteregistrationanddelegation_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.stakevoteregistrationanddelegation_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.stakevoteregistrationanddelegation_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return te.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    stake_credential() {
      const t = _.stakevoteregistrationanddelegation_stake_credential(this.__wbg_ptr);
      return x.__wrap(t);
    }
    pool_keyhash() {
      const t = _.stakeregistrationanddelegation_pool_keyhash(this.__wbg_ptr);
      return q.__wrap(t);
    }
    drep() {
      const t = _.stakevoteregistrationanddelegation_drep(this.__wbg_ptr);
      return H.__wrap(t);
    }
    coin() {
      const t = _.drepderegistration_coin(this.__wbg_ptr);
      return y.__wrap(t);
    }
    static new(t, e, a, n) {
      w(t, x), w(e, q), w(a, H), w(n, y);
      const r = _.stakevoteregistrationanddelegation_new(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr, n.__wbg_ptr);
      return te.__wrap(r);
    }
    has_script_credentials() {
      return _.stakevoteregistrationanddelegation_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const ra = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_strings_free(b >>> 0));
  lr = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(lr.prototype);
      return e.__wbg_ptr = t, ra.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ra.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_strings_free(t);
    }
    static new() {
      const t = _.strings_new();
      return lr.__wrap(t);
    }
    len() {
      return _.costmdls_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      let e, a;
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16);
        _.strings_get(d, this.__wbg_ptr, t);
        var n = o()[d / 4 + 0], r = o()[d / 4 + 1];
        return e = n, a = r, f(n, r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
      }
    }
    add(t) {
      const e = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), a = g;
      _.strings_add(this.__wbg_ptr, e, a);
    }
  };
  const na = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_timelockexpiry_free(b >>> 0));
  __ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(__.prototype);
      return e.__wbg_ptr = t, na.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, na.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_timelockexpiry_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.timelockexpiry_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.timelockexpiry_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return __.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.timelockexpiry_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.timelockexpiry_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return __.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.timelockexpiry_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.timelockexpiry_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.timelockexpiry_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return __.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    slot() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.timelockexpiry_slot(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return t >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    slot_bignum() {
      const t = _.timelockexpiry_slot_bignum(this.__wbg_ptr);
      return y.__wrap(t);
    }
    static new(t) {
      const e = _.timelockexpiry_new(t);
      return __.__wrap(e);
    }
    static new_timelockexpiry(t) {
      w(t, y);
      const e = _.timelockexpiry_new_timelockexpiry(t.__wbg_ptr);
      return __.__wrap(e);
    }
  };
  const oa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_timelockstart_free(b >>> 0));
  e_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(e_.prototype);
      return e.__wbg_ptr = t, oa.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, oa.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_timelockstart_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.timelockstart_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.timelockstart_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return e_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.timelockstart_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.timelockstart_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return e_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.timelockstart_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.timelockstart_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.timelockstart_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return e_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    slot() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.timelockexpiry_slot(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return t >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    slot_bignum() {
      const t = _.timelockexpiry_slot_bignum(this.__wbg_ptr);
      return y.__wrap(t);
    }
    static new(t) {
      const e = _.timelockexpiry_new(t);
      return e_.__wrap(e);
    }
    static new_timelockstart(t) {
      w(t, y);
      const e = _.timelockexpiry_new_timelockexpiry(t.__wbg_ptr);
      return e_.__wrap(e);
    }
  };
  const aa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transaction_free(b >>> 0));
  Ot = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Ot.prototype);
      return e.__wbg_ptr = t, aa.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, aa.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transaction_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transaction_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.transaction_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Ot.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.transaction_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transaction_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Ot.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.transaction_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transaction_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transaction_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Ot.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    body() {
      const t = _.transaction_body(this.__wbg_ptr);
      return V.__wrap(t);
    }
    witness_set() {
      const t = _.transaction_witness_set(this.__wbg_ptr);
      return ht.__wrap(t);
    }
    is_valid() {
      return _.transaction_is_valid(this.__wbg_ptr) !== 0;
    }
    auxiliary_data() {
      const t = _.transaction_auxiliary_data(this.__wbg_ptr);
      return t === 0 ? void 0 : B.__wrap(t);
    }
    set_is_valid(t) {
      _.transaction_set_is_valid(this.__wbg_ptr, t);
    }
    static new(t, e, a) {
      w(t, V), w(e, ht);
      let n = 0;
      wt(a) || (w(a, B), n = a.__destroy_into_raw());
      const r = _.transaction_new(t.__wbg_ptr, e.__wbg_ptr, n);
      return Ot.__wrap(r);
    }
  };
  const sa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactionbatch_free(b >>> 0));
  fr = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(fr.prototype);
      return e.__wbg_ptr = t, sa.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, sa.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactionbatch_free(t);
    }
    len() {
      return _.governanceactionids_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.transactionbatch_get(this.__wbg_ptr, t);
      return Ot.__wrap(e);
    }
  };
  const ia = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactionbatchlist_free(b >>> 0));
  hr = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(hr.prototype);
      return e.__wbg_ptr = t, ia.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ia.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactionbatchlist_free(t);
    }
    len() {
      return _.governanceactionids_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.transactionbatchlist_get(this.__wbg_ptr, t);
      return fr.__wrap(e);
    }
  };
  const da = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactionbodies_free(b >>> 0));
  _e = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(_e.prototype);
      return e.__wbg_ptr = t, da.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, da.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactionbodies_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbodies_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.transactionbodies_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return _e.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbodies_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionbodies_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return _e.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbodies_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbodies_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionbodies_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return _e.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.fixedtransactionbodies_new();
      return _e.__wrap(t);
    }
    len() {
      return _.fixedtransactionbodies_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.transactionbodies_get(this.__wbg_ptr, t);
      return V.__wrap(e);
    }
    add(t) {
      w(t, V), _.transactionbodies_add(this.__wbg_ptr, t.__wbg_ptr);
    }
  };
  const ca = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactionbody_free(b >>> 0));
  V = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(V.prototype);
      return e.__wbg_ptr = t, ca.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ca.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactionbody_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbody_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.transactionbody_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return V.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbody_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionbody_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return V.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbody_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbody_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionbody_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return V.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    inputs() {
      const t = _.transactionbody_inputs(this.__wbg_ptr);
      return S.__wrap(t);
    }
    outputs() {
      const t = _.transactionbody_outputs(this.__wbg_ptr);
      return b_.__wrap(t);
    }
    fee() {
      const t = _.transactionbody_fee(this.__wbg_ptr);
      return y.__wrap(t);
    }
    ttl() {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbody_ttl(r, this.__wbg_ptr);
        var t = o()[r / 4 + 0], e = o()[r / 4 + 1], a = o()[r / 4 + 2], n = o()[r / 4 + 3];
        if (n) throw c(a);
        return t === 0 ? void 0 : e >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    ttl_bignum() {
      const t = _.transactionbody_ttl_bignum(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    set_ttl(t) {
      w(t, y), _.transactionbody_set_ttl(this.__wbg_ptr, t.__wbg_ptr);
    }
    remove_ttl() {
      _.transactionbody_remove_ttl(this.__wbg_ptr);
    }
    set_certs(t) {
      w(t, Kt), _.transactionbody_set_certs(this.__wbg_ptr, t.__wbg_ptr);
    }
    certs() {
      const t = _.transactionbody_certs(this.__wbg_ptr);
      return t === 0 ? void 0 : Kt.__wrap(t);
    }
    set_withdrawals(t) {
      w(t, Mt), _.transactionbody_set_withdrawals(this.__wbg_ptr, t.__wbg_ptr);
    }
    withdrawals() {
      const t = _.transactionbody_withdrawals(this.__wbg_ptr);
      return t === 0 ? void 0 : Mt.__wrap(t);
    }
    set_update(t) {
      w(t, ee), _.transactionbody_set_update(this.__wbg_ptr, t.__wbg_ptr);
    }
    update() {
      const t = _.transactionbody_update(this.__wbg_ptr);
      return t === 0 ? void 0 : ee.__wrap(t);
    }
    set_auxiliary_data_hash(t) {
      w(t, ae), _.transactionbody_set_auxiliary_data_hash(this.__wbg_ptr, t.__wbg_ptr);
    }
    auxiliary_data_hash() {
      const t = _.transactionbody_auxiliary_data_hash(this.__wbg_ptr);
      return t === 0 ? void 0 : ae.__wrap(t);
    }
    set_validity_start_interval(t) {
      _.transactionbody_set_validity_start_interval(this.__wbg_ptr, t);
    }
    set_validity_start_interval_bignum(t) {
      w(t, y), _.transactionbody_set_validity_start_interval_bignum(this.__wbg_ptr, t.__wbg_ptr);
    }
    validity_start_interval_bignum() {
      const t = _.transactionbody_validity_start_interval_bignum(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    validity_start_interval() {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbody_validity_start_interval(r, this.__wbg_ptr);
        var t = o()[r / 4 + 0], e = o()[r / 4 + 1], a = o()[r / 4 + 2], n = o()[r / 4 + 3];
        if (n) throw c(a);
        return t === 0 ? void 0 : e >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_mint(t) {
      w(t, lt), _.transactionbody_set_mint(this.__wbg_ptr, t.__wbg_ptr);
    }
    mint() {
      const t = _.transactionbody_mint(this.__wbg_ptr);
      return t === 0 ? void 0 : lt.__wrap(t);
    }
    set_reference_inputs(t) {
      w(t, S), _.transactionbody_set_reference_inputs(this.__wbg_ptr, t.__wbg_ptr);
    }
    reference_inputs() {
      const t = _.transactionbody_reference_inputs(this.__wbg_ptr);
      return t === 0 ? void 0 : S.__wrap(t);
    }
    set_script_data_hash(t) {
      w(t, u_), _.transactionbody_set_script_data_hash(this.__wbg_ptr, t.__wbg_ptr);
    }
    script_data_hash() {
      const t = _.transactionbody_script_data_hash(this.__wbg_ptr);
      return t === 0 ? void 0 : u_.__wrap(t);
    }
    set_collateral(t) {
      w(t, S), _.transactionbody_set_collateral(this.__wbg_ptr, t.__wbg_ptr);
    }
    collateral() {
      const t = _.transactionbody_collateral(this.__wbg_ptr);
      return t === 0 ? void 0 : S.__wrap(t);
    }
    set_required_signers(t) {
      w(t, P), _.transactionbody_set_required_signers(this.__wbg_ptr, t.__wbg_ptr);
    }
    required_signers() {
      const t = _.transactionbody_required_signers(this.__wbg_ptr);
      return t === 0 ? void 0 : P.__wrap(t);
    }
    set_network_id(t) {
      w(t, Pt), _.transactionbody_set_network_id(this.__wbg_ptr, t.__wbg_ptr);
    }
    network_id() {
      const t = _.transactionbody_network_id(this.__wbg_ptr);
      return t === 0 ? void 0 : Pt.__wrap(t);
    }
    set_collateral_return(t) {
      w(t, I), _.transactionbody_set_collateral_return(this.__wbg_ptr, t.__wbg_ptr);
    }
    collateral_return() {
      const t = _.transactionbody_collateral_return(this.__wbg_ptr);
      return t === 0 ? void 0 : I.__wrap(t);
    }
    set_total_collateral(t) {
      w(t, y), _.transactionbody_set_total_collateral(this.__wbg_ptr, t.__wbg_ptr);
    }
    total_collateral() {
      const t = _.transactionbody_total_collateral(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    set_voting_procedures(t) {
      w(t, g_), _.transactionbody_set_voting_procedures(this.__wbg_ptr, t.__wbg_ptr);
    }
    voting_procedures() {
      const t = _.transactionbody_voting_procedures(this.__wbg_ptr);
      return t === 0 ? void 0 : g_.__wrap(t);
    }
    set_voting_proposals(t) {
      w(t, Et), _.transactionbody_set_voting_proposals(this.__wbg_ptr, t.__wbg_ptr);
    }
    voting_proposals() {
      const t = _.transactionbody_voting_proposals(this.__wbg_ptr);
      return t === 0 ? void 0 : Et.__wrap(t);
    }
    set_donation(t) {
      w(t, y), _.transactionbody_set_donation(this.__wbg_ptr, t.__wbg_ptr);
    }
    donation() {
      const t = _.transactionbody_donation(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    set_current_treasury_value(t) {
      w(t, y), _.transactionbody_set_current_treasury_value(this.__wbg_ptr, t.__wbg_ptr);
    }
    current_treasury_value() {
      const t = _.transactionbody_current_treasury_value(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    static new(t, e, a, n) {
      w(t, S), w(e, b_), w(a, y);
      const r = _.transactionbody_new(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr, !wt(n), wt(n) ? 0 : n);
      return V.__wrap(r);
    }
    static new_tx_body(t, e, a) {
      w(t, S), w(e, b_), w(a, y);
      const n = _.transactionbody_new_tx_body(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
      return V.__wrap(n);
    }
  };
  const pa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactionbuilder_free(b >>> 0));
  gr = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(gr.prototype);
      return e.__wbg_ptr = t, pa.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, pa.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactionbuilder_free(t);
    }
    add_inputs_from(t, e) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, de), _.transactionbuilder_add_inputs_from(r, this.__wbg_ptr, t.__wbg_ptr, e);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        if (n) throw c(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_inputs(t) {
      w(t, Ne), _.transactionbuilder_set_inputs(this.__wbg_ptr, t.__wbg_ptr);
    }
    set_collateral(t) {
      w(t, Ne), _.transactionbuilder_set_collateral(this.__wbg_ptr, t.__wbg_ptr);
    }
    set_collateral_return(t) {
      w(t, I), _.transactionbuilder_set_collateral_return(this.__wbg_ptr, t.__wbg_ptr);
    }
    remove_collateral_return() {
      _.transactionbuilder_remove_collateral_return(this.__wbg_ptr);
    }
    set_collateral_return_and_total(t) {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, I), _.transactionbuilder_set_collateral_return_and_total(n, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[n / 4 + 0], a = o()[n / 4 + 1];
        if (a) throw c(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_total_collateral(t) {
      w(t, y), _.transactionbuilder_set_total_collateral(this.__wbg_ptr, t.__wbg_ptr);
    }
    remove_total_collateral() {
      _.transactionbuilder_remove_total_collateral(this.__wbg_ptr);
    }
    set_total_collateral_and_return(t, e) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, y), w(e, L), _.transactionbuilder_set_total_collateral_and_return(r, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        if (n) throw c(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_reference_input(t) {
      w(t, Z), _.transactionbuilder_add_reference_input(this.__wbg_ptr, t.__wbg_ptr);
    }
    add_script_reference_input(t, e) {
      w(t, Z), _.transactionbuilder_add_script_reference_input(this.__wbg_ptr, t.__wbg_ptr, e);
    }
    add_key_input(t, e, a) {
      w(t, q), w(e, Z), w(a, R), _.transactionbuilder_add_key_input(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
    }
    add_native_script_input(t, e, a) {
      w(t, W), w(e, Z), w(a, R), _.transactionbuilder_add_native_script_input(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
    }
    add_plutus_script_input(t, e, a) {
      w(t, tt), w(e, Z), w(a, R), _.transactionbuilder_add_plutus_script_input(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
    }
    add_bootstrap_input(t, e, a) {
      w(t, ft), w(e, Z), w(a, R), _.transactionbuilder_add_bootstrap_input(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
    }
    add_regular_input(t, e, a) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, L), w(e, Z), w(a, R), _.transactionbuilder_add_regular_input(d, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
        var n = o()[d / 4 + 0], r = o()[d / 4 + 1];
        if (r) throw c(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_inputs_from_and_change(t, e, a) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, de), w(a, j_), _.transactionbuilder_add_inputs_from_and_change(i, this.__wbg_ptr, t.__wbg_ptr, e, a.__wbg_ptr);
        var n = o()[i / 4 + 0], r = o()[i / 4 + 1], d = o()[i / 4 + 2];
        if (d) throw c(r);
        return n !== 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_inputs_from_and_change_with_collateral_return(t, e, a, n) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, de), w(a, j_), w(n, y), _.transactionbuilder_add_inputs_from_and_change_with_collateral_return(i, this.__wbg_ptr, t.__wbg_ptr, e, a.__wbg_ptr, n.__wbg_ptr);
        var r = o()[i / 4 + 0], d = o()[i / 4 + 1];
        if (d) throw c(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_native_input_scripts() {
      const t = _.transactionbuilder_get_native_input_scripts(this.__wbg_ptr);
      return t === 0 ? void 0 : E.__wrap(t);
    }
    get_plutus_input_scripts() {
      const t = _.transactionbuilder_get_plutus_input_scripts(this.__wbg_ptr);
      return t === 0 ? void 0 : At.__wrap(t);
    }
    fee_for_input(t, e, a) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, L), w(e, Z), w(a, R), _.transactionbuilder_fee_for_input(i, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
        var n = o()[i / 4 + 0], r = o()[i / 4 + 1], d = o()[i / 4 + 2];
        if (d) throw c(r);
        return y.__wrap(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_output(t) {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, I), _.transactionbuilder_add_output(n, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[n / 4 + 0], a = o()[n / 4 + 1];
        if (a) throw c(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    fee_for_output(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, I), _.transactionbuilder_fee_for_output(r, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return y.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_fee(t) {
      w(t, y), _.transactionbuilder_set_fee(this.__wbg_ptr, t.__wbg_ptr);
    }
    set_min_fee(t) {
      w(t, y), _.transactionbuilder_set_min_fee(this.__wbg_ptr, t.__wbg_ptr);
    }
    set_ttl(t) {
      _.transactionbuilder_set_ttl(this.__wbg_ptr, t);
    }
    set_ttl_bignum(t) {
      w(t, y), _.transactionbuilder_set_ttl_bignum(this.__wbg_ptr, t.__wbg_ptr);
    }
    remove_ttl() {
      _.transactionbuilder_remove_ttl(this.__wbg_ptr);
    }
    set_validity_start_interval(t) {
      _.transactionbuilder_set_validity_start_interval(this.__wbg_ptr, t);
    }
    set_validity_start_interval_bignum(t) {
      w(t, y);
      var e = t.__destroy_into_raw();
      _.transactionbuilder_set_validity_start_interval_bignum(this.__wbg_ptr, e);
    }
    remove_validity_start_interval() {
      _.transactionbuilder_remove_validity_start_interval(this.__wbg_ptr);
    }
    set_certs(t) {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, Kt), _.transactionbuilder_set_certs(n, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[n / 4 + 0], a = o()[n / 4 + 1];
        if (a) throw c(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    remove_certs() {
      _.transactionbuilder_remove_certs(this.__wbg_ptr);
    }
    set_certs_builder(t) {
      w(t, or), _.transactionbuilder_set_certs_builder(this.__wbg_ptr, t.__wbg_ptr);
    }
    set_withdrawals(t) {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, Mt), _.transactionbuilder_set_withdrawals(n, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[n / 4 + 0], a = o()[n / 4 + 1];
        if (a) throw c(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_withdrawals_builder(t) {
      w(t, dr), _.transactionbuilder_set_withdrawals_builder(this.__wbg_ptr, t.__wbg_ptr);
    }
    set_voting_builder(t) {
      w(t, sr), _.transactionbuilder_set_voting_builder(this.__wbg_ptr, t.__wbg_ptr);
    }
    set_voting_proposal_builder(t) {
      w(t, ir), _.transactionbuilder_set_voting_proposal_builder(this.__wbg_ptr, t.__wbg_ptr);
    }
    remove_withdrawals() {
      _.transactionbuilder_remove_withdrawals(this.__wbg_ptr);
    }
    get_auxiliary_data() {
      const t = _.transactionbuilder_get_auxiliary_data(this.__wbg_ptr);
      return t === 0 ? void 0 : B.__wrap(t);
    }
    set_auxiliary_data(t) {
      w(t, B), _.transactionbuilder_set_auxiliary_data(this.__wbg_ptr, t.__wbg_ptr);
    }
    remove_auxiliary_data() {
      _.transactionbuilder_remove_auxiliary_data(this.__wbg_ptr);
    }
    set_metadata(t) {
      w(t, d_), _.transactionbuilder_set_metadata(this.__wbg_ptr, t.__wbg_ptr);
    }
    add_metadatum(t, e) {
      w(t, y), w(e, J), _.transactionbuilder_add_metadatum(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
    }
    add_json_metadatum(t, e) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, y);
        const d = u(e, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionbuilder_add_json_metadatum(r, this.__wbg_ptr, t.__wbg_ptr, d, i);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        if (n) throw c(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_json_metadatum_with_schema(t, e, a) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, y);
        const i = u(e, _.__wbindgen_malloc, _.__wbindgen_realloc), l = g;
        _.transactionbuilder_add_json_metadatum_with_schema(d, this.__wbg_ptr, t.__wbg_ptr, i, l, a);
        var n = o()[d / 4 + 0], r = o()[d / 4 + 1];
        if (r) throw c(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_mint_builder(t) {
      w(t, Te), _.transactionbuilder_set_mint_builder(this.__wbg_ptr, t.__wbg_ptr);
    }
    remove_mint_builder() {
      _.transactionbuilder_remove_mint_builder(this.__wbg_ptr);
    }
    get_mint_builder() {
      const t = _.transactionbuilder_get_mint_builder(this.__wbg_ptr);
      return t === 0 ? void 0 : Te.__wrap(t);
    }
    set_mint(t, e) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, lt), w(e, E), _.transactionbuilder_set_mint(r, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        if (n) throw c(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_mint() {
      const t = _.transactionbuilder_get_mint(this.__wbg_ptr);
      return t === 0 ? void 0 : lt.__wrap(t);
    }
    get_mint_scripts() {
      const t = _.transactionbuilder_get_mint_scripts(this.__wbg_ptr);
      return t === 0 ? void 0 : E.__wrap(t);
    }
    set_mint_asset(t, e) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, W), w(e, Gt), _.transactionbuilder_set_mint_asset(r, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        if (n) throw c(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_mint_asset(t, e, a) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, W), w(e, G), w(a, X), _.transactionbuilder_add_mint_asset(d, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
        var n = o()[d / 4 + 0], r = o()[d / 4 + 1];
        if (r) throw c(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_mint_asset_and_output(t, e, a, n, r) {
      try {
        const l = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, W), w(e, G), w(a, X), w(n, w_), w(r, y), _.transactionbuilder_add_mint_asset_and_output(l, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr, n.__wbg_ptr, r.__wbg_ptr);
        var d = o()[l / 4 + 0], i = o()[l / 4 + 1];
        if (i) throw c(d);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_mint_asset_and_output_min_required_coin(t, e, a, n) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, W), w(e, G), w(a, X), w(n, w_), _.transactionbuilder_add_mint_asset_and_output_min_required_coin(i, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr, n.__wbg_ptr);
        var r = o()[i / 4 + 0], d = o()[i / 4 + 1];
        if (d) throw c(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_extra_witness_datum(t) {
      w(t, O), _.transactionbuilder_add_extra_witness_datum(this.__wbg_ptr, t.__wbg_ptr);
    }
    get_extra_witness_datums() {
      const t = _.transactionbuilder_get_extra_witness_datums(this.__wbg_ptr);
      return t === 0 ? void 0 : it.__wrap(t);
    }
    set_donation(t) {
      w(t, y), _.transactionbuilder_set_donation(this.__wbg_ptr, t.__wbg_ptr);
    }
    get_donation() {
      const t = _.transactionbuilder_get_donation(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    set_current_treasury_value(t) {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, y), _.transactionbuilder_set_current_treasury_value(n, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[n / 4 + 0], a = o()[n / 4 + 1];
        if (a) throw c(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_current_treasury_value() {
      const t = _.transactionbuilder_get_current_treasury_value(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    static new(t) {
      w(t, Ce);
      const e = _.transactionbuilder_new(t.__wbg_ptr);
      return gr.__wrap(e);
    }
    get_reference_inputs() {
      const t = _.transactionbuilder_get_reference_inputs(this.__wbg_ptr);
      return S.__wrap(t);
    }
    get_explicit_input() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbuilder_get_explicit_input(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return R.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_implicit_input() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbuilder_get_implicit_input(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return R.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_total_input() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbuilder_get_total_input(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return R.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_total_output() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbuilder_get_total_output(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return R.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_explicit_output() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbuilder_get_explicit_output(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return R.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_deposit() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbuilder_get_deposit(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return y.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_fee_if_set() {
      const t = _.transactionbuilder_get_fee_if_set(this.__wbg_ptr);
      return t === 0 ? void 0 : y.__wrap(t);
    }
    add_change_if_needed(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, L), _.transactionbuilder_add_change_if_needed(r, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return e !== 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_change_if_needed_with_datum(t, e) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, L), w(e, Le), _.transactionbuilder_add_change_if_needed_with_datum(d, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
        var a = o()[d / 4 + 0], n = o()[d / 4 + 1], r = o()[d / 4 + 2];
        if (r) throw c(n);
        return a !== 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    calc_script_data_hash(t) {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, kt), _.transactionbuilder_calc_script_data_hash(n, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[n / 4 + 0], a = o()[n / 4 + 1];
        if (a) throw c(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_script_data_hash(t) {
      w(t, u_), _.transactionbuilder_set_script_data_hash(this.__wbg_ptr, t.__wbg_ptr);
    }
    remove_script_data_hash() {
      _.transactionbuilder_remove_script_data_hash(this.__wbg_ptr);
    }
    add_required_signer(t) {
      w(t, q), _.transactionbuilder_add_required_signer(this.__wbg_ptr, t.__wbg_ptr);
    }
    full_size() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbuilder_full_size(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return t >>> 0;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    output_sizes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbuilder_output_sizes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = cr(t, e).slice();
        return _.__wbindgen_free(t, e * 4, 4), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    build() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbuilder_build(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return V.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    build_tx() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbuilder_build_tx(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return Ot.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    build_tx_unsafe() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbuilder_build_tx_unsafe(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return Ot.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    min_fee() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbuilder_min_fee(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return y.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const wa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactionbuilderconfig_free(b >>> 0));
  Ce = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Ce.prototype);
      return e.__wbg_ptr = t, wa.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, wa.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactionbuilderconfig_free(t);
    }
  };
  const ba = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactionbuilderconfigbuilder_free(b >>> 0));
  et = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(et.prototype);
      return e.__wbg_ptr = t, ba.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ba.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactionbuilderconfigbuilder_free(t);
    }
    static new() {
      const t = _.transactionbuilderconfigbuilder_new();
      return et.__wrap(t);
    }
    fee_algo(t) {
      w(t, De);
      const e = _.transactionbuilderconfigbuilder_fee_algo(this.__wbg_ptr, t.__wbg_ptr);
      return et.__wrap(e);
    }
    coins_per_utxo_byte(t) {
      w(t, y);
      const e = _.transactionbuilderconfigbuilder_coins_per_utxo_byte(this.__wbg_ptr, t.__wbg_ptr);
      return et.__wrap(e);
    }
    ex_unit_prices(t) {
      w(t, Rt);
      const e = _.transactionbuilderconfigbuilder_ex_unit_prices(this.__wbg_ptr, t.__wbg_ptr);
      return et.__wrap(e);
    }
    pool_deposit(t) {
      w(t, y);
      const e = _.transactionbuilderconfigbuilder_pool_deposit(this.__wbg_ptr, t.__wbg_ptr);
      return et.__wrap(e);
    }
    key_deposit(t) {
      w(t, y);
      const e = _.transactionbuilderconfigbuilder_key_deposit(this.__wbg_ptr, t.__wbg_ptr);
      return et.__wrap(e);
    }
    max_value_size(t) {
      const e = _.transactionbuilderconfigbuilder_max_value_size(this.__wbg_ptr, t);
      return et.__wrap(e);
    }
    max_tx_size(t) {
      const e = _.transactionbuilderconfigbuilder_max_tx_size(this.__wbg_ptr, t);
      return et.__wrap(e);
    }
    ref_script_coins_per_byte(t) {
      w(t, k);
      const e = _.transactionbuilderconfigbuilder_ref_script_coins_per_byte(this.__wbg_ptr, t.__wbg_ptr);
      return et.__wrap(e);
    }
    prefer_pure_change(t) {
      const e = _.transactionbuilderconfigbuilder_prefer_pure_change(this.__wbg_ptr, t);
      return et.__wrap(e);
    }
    deduplicate_explicit_ref_inputs_with_regular_inputs(t) {
      const e = _.transactionbuilderconfigbuilder_deduplicate_explicit_ref_inputs_with_regular_inputs(this.__wbg_ptr, t);
      return et.__wrap(e);
    }
    do_not_burn_extra_change(t) {
      const e = _.transactionbuilderconfigbuilder_do_not_burn_extra_change(this.__wbg_ptr, t);
      return et.__wrap(e);
    }
    build() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionbuilderconfigbuilder_build(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return Ce.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const la = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactionhash_free(b >>> 0));
  dt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(dt.prototype);
      return e.__wbg_ptr = t, la.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, la.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactionhash_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.transactionhash_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return dt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(t) {
      let e, a;
      try {
        const m = _.__wbindgen_add_to_stack_pointer(-16), j = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), z = g;
        _.anchordatahash_to_bech32(m, this.__wbg_ptr, j, z);
        var n = o()[m / 4 + 0], r = o()[m / 4 + 1], d = o()[m / 4 + 2], i = o()[m / 4 + 3], l = n, p = r;
        if (i) throw l = 0, p = 0, c(d);
        return e = l, a = p, f(l, p);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionhash_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return dt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionhash_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return dt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const ga = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactioninput_free(b >>> 0));
  Z = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Z.prototype);
      return e.__wbg_ptr = t, ga.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ga.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactioninput_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactioninput_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.transactioninput_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Z.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactioninput_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactioninput_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Z.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactioninput_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactioninput_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactioninput_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Z.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    transaction_id() {
      const t = _.governanceactionid_transaction_id(this.__wbg_ptr);
      return dt.__wrap(t);
    }
    index() {
      return _.governanceactionid_index(this.__wbg_ptr) >>> 0;
    }
    static new(t, e) {
      w(t, dt);
      const a = _.governanceactionid_new(t.__wbg_ptr, e);
      return Z.__wrap(a);
    }
  };
  const ua = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactioninputs_free(b >>> 0));
  S = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(S.prototype);
      return e.__wbg_ptr = t, ua.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ua.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactioninputs_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactioninputs_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.transactioninputs_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return S.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactioninputs_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactioninputs_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return S.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactioninputs_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactioninputs_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactioninputs_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return S.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.transactioninputs_new();
      return S.__wrap(t);
    }
    len() {
      return _.governanceactionids_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.transactioninputs_get(this.__wbg_ptr, t);
      return Z.__wrap(e);
    }
    add(t) {
      return w(t, Z), _.transactioninputs_add(this.__wbg_ptr, t.__wbg_ptr) !== 0;
    }
    to_option() {
      const t = _.transactioninputs_to_option(this.__wbg_ptr);
      return t === 0 ? void 0 : S.__wrap(t);
    }
  };
  const fa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactionmetadatum_free(b >>> 0));
  J = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(J.prototype);
      return e.__wbg_ptr = t, fa.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, fa.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactionmetadatum_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionmetadatum_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.transactionmetadatum_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return J.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionmetadatum_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionmetadatum_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return J.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_map(t) {
      w(t, he);
      const e = _.transactionmetadatum_new_map(t.__wbg_ptr);
      return J.__wrap(e);
    }
    static new_list(t) {
      w(t, se);
      const e = _.transactionmetadatum_new_list(t.__wbg_ptr);
      return J.__wrap(e);
    }
    static new_int(t) {
      w(t, X);
      const e = _.transactionmetadatum_new_int(t.__wbg_ptr);
      return J.__wrap(e);
    }
    static new_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.transactionmetadatum_new_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return J.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_text(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionmetadatum_new_text(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return J.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    kind() {
      return _.plutusdata_kind(this.__wbg_ptr);
    }
    as_map() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionmetadatum_as_map(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return he.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_list() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionmetadatum_as_list(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return se.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_int() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionmetadatum_as_int(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return X.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_bytes() {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionmetadatum_as_bytes(d, this.__wbg_ptr);
        var t = o()[d / 4 + 0], e = o()[d / 4 + 1], a = o()[d / 4 + 2], n = o()[d / 4 + 3];
        if (n) throw c(a);
        var r = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), r;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_text() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionmetadatum_as_text(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
  };
  const ha = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactionmetadatumlabels_free(b >>> 0));
  Fe = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Fe.prototype);
      return e.__wbg_ptr = t, ha.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ha.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactionmetadatumlabels_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionmetadatumlabels_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.transactionmetadatumlabels_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Fe.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionmetadatumlabels_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionmetadatumlabels_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Fe.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.metadatalist_new();
      return Fe.__wrap(t);
    }
    len() {
      return _.languages_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.transactionmetadatumlabels_get(this.__wbg_ptr, t);
      return y.__wrap(e);
    }
    add(t) {
      w(t, y), _.transactionmetadatumlabels_add(this.__wbg_ptr, t.__wbg_ptr);
    }
  };
  const ya = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactionoutput_free(b >>> 0));
  I = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(I.prototype);
      return e.__wbg_ptr = t, ya.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ya.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactionoutput_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionoutput_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.transactionoutput_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return I.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionoutput_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionoutput_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return I.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionoutput_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionoutput_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionoutput_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return I.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    address() {
      const t = _.transactionoutput_address(this.__wbg_ptr);
      return L.__wrap(t);
    }
    amount() {
      const t = _.transactionoutput_amount(this.__wbg_ptr);
      return R.__wrap(t);
    }
    data_hash() {
      const t = _.transactionoutput_data_hash(this.__wbg_ptr);
      return t === 0 ? void 0 : Yt.__wrap(t);
    }
    plutus_data() {
      const t = _.transactionoutput_plutus_data(this.__wbg_ptr);
      return t === 0 ? void 0 : O.__wrap(t);
    }
    script_ref() {
      const t = _.transactionoutput_script_ref(this.__wbg_ptr);
      return t === 0 ? void 0 : xt.__wrap(t);
    }
    set_script_ref(t) {
      w(t, xt), _.transactionoutput_set_script_ref(this.__wbg_ptr, t.__wbg_ptr);
    }
    set_plutus_data(t) {
      w(t, O), _.transactionoutput_set_plutus_data(this.__wbg_ptr, t.__wbg_ptr);
    }
    set_data_hash(t) {
      w(t, Yt), _.transactionoutput_set_data_hash(this.__wbg_ptr, t.__wbg_ptr);
    }
    has_plutus_data() {
      return _.transactionoutput_has_plutus_data(this.__wbg_ptr) !== 0;
    }
    has_data_hash() {
      return _.transactionoutput_has_data_hash(this.__wbg_ptr) !== 0;
    }
    has_script_ref() {
      return _.transactionoutput_has_script_ref(this.__wbg_ptr) !== 0;
    }
    static new(t, e) {
      w(t, L), w(e, R);
      const a = _.transactionoutput_new(t.__wbg_ptr, e.__wbg_ptr);
      return I.__wrap(a);
    }
    serialization_format() {
      const t = _.transactionoutput_serialization_format(this.__wbg_ptr);
      return t === 2 ? void 0 : t;
    }
  };
  const va = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactionoutputamountbuilder_free(b >>> 0));
  w_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(w_.prototype);
      return e.__wbg_ptr = t, va.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, va.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactionoutputamountbuilder_free(t);
    }
    with_value(t) {
      w(t, R);
      const e = _.transactionoutputamountbuilder_with_value(this.__wbg_ptr, t.__wbg_ptr);
      return w_.__wrap(e);
    }
    with_coin(t) {
      w(t, y);
      const e = _.transactionoutputamountbuilder_with_coin(this.__wbg_ptr, t.__wbg_ptr);
      return w_.__wrap(e);
    }
    with_coin_and_asset(t, e) {
      w(t, y), w(e, N);
      const a = _.transactionoutputamountbuilder_with_coin_and_asset(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
      return w_.__wrap(a);
    }
    with_asset_and_min_required_coin_by_utxo_cost(t, e) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, N), w(e, Ge), _.transactionoutputamountbuilder_with_asset_and_min_required_coin_by_utxo_cost(d, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
        var a = o()[d / 4 + 0], n = o()[d / 4 + 1], r = o()[d / 4 + 2];
        if (r) throw c(n);
        return w_.__wrap(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    build() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionoutputamountbuilder_build(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return I.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const ma = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactionoutputbuilder_free(b >>> 0));
  pe = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(pe.prototype);
      return e.__wbg_ptr = t, ma.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ma.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactionoutputbuilder_free(t);
    }
    static new() {
      const t = _.transactionoutputbuilder_new();
      return pe.__wrap(t);
    }
    with_address(t) {
      w(t, L);
      const e = _.transactionoutputbuilder_with_address(this.__wbg_ptr, t.__wbg_ptr);
      return pe.__wrap(e);
    }
    with_data_hash(t) {
      w(t, Yt);
      const e = _.transactionoutputbuilder_with_data_hash(this.__wbg_ptr, t.__wbg_ptr);
      return pe.__wrap(e);
    }
    with_plutus_data(t) {
      w(t, O);
      const e = _.transactionoutputbuilder_with_plutus_data(this.__wbg_ptr, t.__wbg_ptr);
      return pe.__wrap(e);
    }
    with_script_ref(t) {
      w(t, xt);
      const e = _.transactionoutputbuilder_with_script_ref(this.__wbg_ptr, t.__wbg_ptr);
      return pe.__wrap(e);
    }
    next() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionoutputbuilder_next(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return w_.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const ka = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactionoutputs_free(b >>> 0));
  b_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(b_.prototype);
      return e.__wbg_ptr = t, ka.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ka.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactionoutputs_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionoutputs_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.transactionoutputs_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return b_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionoutputs_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionoutputs_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return b_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionoutputs_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionoutputs_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionoutputs_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return b_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.transactionoutputs_new();
      return b_.__wrap(t);
    }
    len() {
      return _.assetnames_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.transactionoutputs_get(this.__wbg_ptr, t);
      return I.__wrap(e);
    }
    add(t) {
      w(t, I), _.transactionoutputs_add(this.__wbg_ptr, t.__wbg_ptr);
    }
  };
  const xa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactionunspentoutput_free(b >>> 0));
  qt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(qt.prototype);
      return e.__wbg_ptr = t, xa.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, xa.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactionunspentoutput_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionunspentoutput_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.transactionunspentoutput_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return qt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionunspentoutput_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionunspentoutput_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return qt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionunspentoutput_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionunspentoutput_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionunspentoutput_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return qt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t, e) {
      w(t, Z), w(e, I);
      const a = _.transactionunspentoutput_new(t.__wbg_ptr, e.__wbg_ptr);
      return qt.__wrap(a);
    }
    input() {
      const t = _.transactionunspentoutput_input(this.__wbg_ptr);
      return Z.__wrap(t);
    }
    output() {
      const t = _.transactionunspentoutput_output(this.__wbg_ptr);
      return I.__wrap(t);
    }
  };
  const ja = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactionunspentoutputs_free(b >>> 0));
  de = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(de.prototype);
      return e.__wbg_ptr = t, ja.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ja.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactionunspentoutputs_free(t);
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionunspentoutputs_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionunspentoutputs_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionunspentoutputs_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return de.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.transactionunspentoutputs_new();
      return de.__wrap(t);
    }
    len() {
      return _.transactionunspentoutputs_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.transactionunspentoutputs_get(this.__wbg_ptr, t);
      return qt.__wrap(e);
    }
    add(t) {
      w(t, qt), _.transactionunspentoutputs_add(this.__wbg_ptr, t.__wbg_ptr);
    }
  };
  const za = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactionwitnessset_free(b >>> 0));
  ht = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ht.prototype);
      return e.__wbg_ptr = t, za.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, za.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactionwitnessset_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionwitnessset_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.transactionwitnessset_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ht.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionwitnessset_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionwitnessset_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ht.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionwitnessset_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionwitnessset_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionwitnessset_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ht.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_vkeys(t) {
      w(t, re), _.transactionwitnessset_set_vkeys(this.__wbg_ptr, t.__wbg_ptr);
    }
    vkeys() {
      const t = _.transactionwitnessset_vkeys(this.__wbg_ptr);
      return t === 0 ? void 0 : re.__wrap(t);
    }
    set_native_scripts(t) {
      w(t, E), _.transactionwitnessset_set_native_scripts(this.__wbg_ptr, t.__wbg_ptr);
    }
    native_scripts() {
      const t = _.auxiliarydata_native_scripts(this.__wbg_ptr);
      return t === 0 ? void 0 : E.__wrap(t);
    }
    set_bootstraps(t) {
      w(t, x_), _.transactionwitnessset_set_bootstraps(this.__wbg_ptr, t.__wbg_ptr);
    }
    bootstraps() {
      const t = _.transactionwitnessset_bootstraps(this.__wbg_ptr);
      return t === 0 ? void 0 : x_.__wrap(t);
    }
    set_plutus_scripts(t) {
      w(t, St), _.transactionwitnessset_set_plutus_scripts(this.__wbg_ptr, t.__wbg_ptr);
    }
    plutus_scripts() {
      const t = _.transactionwitnessset_plutus_scripts(this.__wbg_ptr);
      return t === 0 ? void 0 : St.__wrap(t);
    }
    set_plutus_data(t) {
      w(t, it), _.transactionwitnessset_set_plutus_data(this.__wbg_ptr, t.__wbg_ptr);
    }
    plutus_data() {
      const t = _.transactionwitnessset_plutus_data(this.__wbg_ptr);
      return t === 0 ? void 0 : it.__wrap(t);
    }
    set_redeemers(t) {
      w(t, Wt), _.transactionwitnessset_set_redeemers(this.__wbg_ptr, t.__wbg_ptr);
    }
    redeemers() {
      const t = _.transactionwitnessset_redeemers(this.__wbg_ptr);
      return t === 0 ? void 0 : Wt.__wrap(t);
    }
    static new() {
      const t = _.transactionwitnessset_new();
      return ht.__wrap(t);
    }
  };
  const Fa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_transactionwitnesssets_free(b >>> 0));
  l_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(l_.prototype);
      return e.__wbg_ptr = t, Fa.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Fa.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_transactionwitnesssets_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionwitnesssets_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.transactionwitnesssets_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return l_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionwitnesssets_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionwitnesssets_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return l_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionwitnesssets_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.transactionwitnesssets_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.transactionwitnesssets_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return l_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.transactionwitnesssets_new();
      return l_.__wrap(t);
    }
    len() {
      return _.governanceactionids_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.transactionwitnesssets_get(this.__wbg_ptr, t);
      return ht.__wrap(e);
    }
    add(t) {
      w(t, ht), _.transactionwitnesssets_add(this.__wbg_ptr, t.__wbg_ptr);
    }
  };
  const Ra = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_treasurywithdrawals_free(b >>> 0));
  ke = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ke.prototype);
      return e.__wbg_ptr = t, Ra.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ra.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_treasurywithdrawals_free(t);
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.treasurywithdrawals_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.treasurywithdrawals_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.treasurywithdrawals_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ke.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.treasurywithdrawals_new();
      return ke.__wrap(t);
    }
    get(t) {
      w(t, T);
      const e = _.treasurywithdrawals_get(this.__wbg_ptr, t.__wbg_ptr);
      return e === 0 ? void 0 : y.__wrap(e);
    }
    insert(t, e) {
      w(t, T), w(e, y), _.treasurywithdrawals_insert(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
    }
    keys() {
      const t = _.treasurywithdrawals_keys(this.__wbg_ptr);
      return G_.__wrap(t);
    }
    len() {
      return _.costmodel_len(this.__wbg_ptr) >>> 0;
    }
  };
  const Oa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_treasurywithdrawalsaction_free(b >>> 0));
  r_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(r_.prototype);
      return e.__wbg_ptr = t, Oa.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Oa.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_treasurywithdrawalsaction_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.treasurywithdrawalsaction_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.treasurywithdrawalsaction_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return r_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.treasurywithdrawalsaction_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.treasurywithdrawalsaction_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return r_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.treasurywithdrawalsaction_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.treasurywithdrawalsaction_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.treasurywithdrawalsaction_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return r_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    withdrawals() {
      const t = _.treasurywithdrawalsaction_withdrawals(this.__wbg_ptr);
      return ke.__wrap(t);
    }
    policy_hash() {
      const t = _.treasurywithdrawalsaction_policy_hash(this.__wbg_ptr);
      return t === 0 ? void 0 : Q.__wrap(t);
    }
    static new(t) {
      w(t, ke);
      const e = _.treasurywithdrawalsaction_new(t.__wbg_ptr);
      return r_.__wrap(e);
    }
    static new_with_policy_hash(t, e) {
      w(t, ke), w(e, Q);
      const a = _.treasurywithdrawalsaction_new_with_policy_hash(t.__wbg_ptr, e.__wbg_ptr);
      return r_.__wrap(a);
    }
  };
  const qa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_txinputsbuilder_free(b >>> 0));
  Ne = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Ne.prototype);
      return e.__wbg_ptr = t, qa.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, qa.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_txinputsbuilder_free(t);
    }
    static new() {
      const t = _.txinputsbuilder_new();
      return Ne.__wrap(t);
    }
    add_regular_utxo(t) {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, qt), _.txinputsbuilder_add_regular_utxo(n, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[n / 4 + 0], a = o()[n / 4 + 1];
        if (a) throw c(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_plutus_script_utxo(t, e) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, qt), w(e, tt), _.txinputsbuilder_add_plutus_script_utxo(r, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        if (n) throw c(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_native_script_utxo(t, e) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, qt), w(e, Ht), _.txinputsbuilder_add_native_script_utxo(r, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        if (n) throw c(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_key_input(t, e, a) {
      w(t, q), w(e, Z), w(a, R), _.txinputsbuilder_add_key_input(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
    }
    add_native_script_input(t, e, a) {
      w(t, Ht), w(e, Z), w(a, R), _.txinputsbuilder_add_native_script_input(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
    }
    add_plutus_script_input(t, e, a) {
      w(t, tt), w(e, Z), w(a, R), _.txinputsbuilder_add_plutus_script_input(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
    }
    add_bootstrap_input(t, e, a) {
      w(t, ft), w(e, Z), w(a, R), _.txinputsbuilder_add_bootstrap_input(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
    }
    add_regular_input(t, e, a) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, L), w(e, Z), w(a, R), _.txinputsbuilder_add_regular_input(d, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
        var n = o()[d / 4 + 0], r = o()[d / 4 + 1];
        if (r) throw c(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_ref_inputs() {
      const t = _.txinputsbuilder_get_ref_inputs(this.__wbg_ptr);
      return S.__wrap(t);
    }
    get_native_input_scripts() {
      const t = _.txinputsbuilder_get_native_input_scripts(this.__wbg_ptr);
      return t === 0 ? void 0 : E.__wrap(t);
    }
    get_plutus_input_scripts() {
      const t = _.txinputsbuilder_get_plutus_input_scripts(this.__wbg_ptr);
      return t === 0 ? void 0 : At.__wrap(t);
    }
    len() {
      return _.txinputsbuilder_len(this.__wbg_ptr) >>> 0;
    }
    add_required_signer(t) {
      w(t, q), _.txinputsbuilder_add_required_signer(this.__wbg_ptr, t.__wbg_ptr);
    }
    add_required_signers(t) {
      w(t, P), _.txinputsbuilder_add_required_signers(this.__wbg_ptr, t.__wbg_ptr);
    }
    total_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.txinputsbuilder_total_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return R.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    inputs() {
      const t = _.txinputsbuilder_inputs(this.__wbg_ptr);
      return S.__wrap(t);
    }
    inputs_option() {
      const t = _.txinputsbuilder_inputs_option(this.__wbg_ptr);
      return t === 0 ? void 0 : S.__wrap(t);
    }
  };
  const $a = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_url_free(b >>> 0));
  ar = class xe {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(xe.prototype);
      return e.__wbg_ptr = t, $a.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, $a.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_url_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.url_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.url_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return xe.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.url_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.url_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return xe.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.dnsrecordaoraaaa_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.dnsrecordaoraaaa_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.url_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return xe.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.url_new(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return xe.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    url() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.dnsrecordaoraaaa_record(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
  };
  const La = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_unitinterval_free(b >>> 0));
  k = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(k.prototype);
      return e.__wbg_ptr = t, La.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, La.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_unitinterval_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.unitinterval_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.unitinterval_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return k.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.unitinterval_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.unitinterval_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return k.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.unitinterval_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.unitinterval_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.unitinterval_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return k.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    numerator() {
      const t = _.datacost_coins_per_byte(this.__wbg_ptr);
      return y.__wrap(t);
    }
    denominator() {
      const t = _.unitinterval_denominator(this.__wbg_ptr);
      return y.__wrap(t);
    }
    static new(t, e) {
      w(t, y), w(e, y);
      const a = _.unitinterval_new(t.__wbg_ptr, e.__wbg_ptr);
      return k.__wrap(a);
    }
  };
  const Ja = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_update_free(b >>> 0));
  ee = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ee.prototype);
      return e.__wbg_ptr = t, Ja.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ja.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_update_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.update_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.update_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ee.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.update_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.update_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ee.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.update_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.update_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.update_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ee.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    proposed_protocol_parameter_updates() {
      const t = _.update_proposed_protocol_parameter_updates(this.__wbg_ptr);
      return W_.__wrap(t);
    }
    epoch() {
      return _.update_epoch(this.__wbg_ptr) >>> 0;
    }
    static new(t, e) {
      w(t, W_);
      const a = _.update_new(t.__wbg_ptr, e);
      return ee.__wrap(a);
    }
  };
  const Ya = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_updatecommitteeaction_free(b >>> 0));
  n_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(n_.prototype);
      return e.__wbg_ptr = t, Ya.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ya.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_updatecommitteeaction_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.updatecommitteeaction_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.updatecommitteeaction_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return n_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.updatecommitteeaction_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.updatecommitteeaction_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return n_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.updatecommitteeaction_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.updatecommitteeaction_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.updatecommitteeaction_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return n_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    gov_action_id() {
      const t = _.updatecommitteeaction_gov_action_id(this.__wbg_ptr);
      return t === 0 ? void 0 : U.__wrap(t);
    }
    committee() {
      const t = _.updatecommitteeaction_committee(this.__wbg_ptr);
      return s_.__wrap(t);
    }
    members_to_remove() {
      const t = _.updatecommitteeaction_members_to_remove(this.__wbg_ptr);
      return Ft.__wrap(t);
    }
    static new(t, e) {
      w(t, s_), w(e, Ft);
      const a = _.updatecommitteeaction_new(t.__wbg_ptr, e.__wbg_ptr);
      return n_.__wrap(a);
    }
    static new_with_action_id(t, e, a) {
      w(t, U), w(e, s_), w(a, Ft);
      const n = _.updatecommitteeaction_new_with_action_id(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
      return n_.__wrap(n);
    }
  };
  const Qa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_vrfcert_free(b >>> 0));
  $t = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create($t.prototype);
      return e.__wbg_ptr = t, Qa.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Qa.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_vrfcert_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.vrfcert_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.vrfcert_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return $t.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.vrfcert_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.vrfcert_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return $t.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.vrfcert_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.vrfcert_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.vrfcert_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return $t.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    output() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.vrfcert_output(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    proof() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.vrfcert_proof(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t, e) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16), i = h(t, _.__wbindgen_malloc), l = g, p = h(e, _.__wbindgen_malloc), m = g;
        _.vrfcert_new(d, i, l, p, m);
        var a = o()[d / 4 + 0], n = o()[d / 4 + 1], r = o()[d / 4 + 2];
        if (r) throw c(n);
        return $t.__wrap(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Xa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_vrfkeyhash_free(b >>> 0));
  f_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(f_.prototype);
      return e.__wbg_ptr = t, Xa.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Xa.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_vrfkeyhash_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.vrfkeyhash_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return f_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(t) {
      let e, a;
      try {
        const m = _.__wbindgen_add_to_stack_pointer(-16), j = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), z = g;
        _.anchordatahash_to_bech32(m, this.__wbg_ptr, j, z);
        var n = o()[m / 4 + 0], r = o()[m / 4 + 1], d = o()[m / 4 + 2], i = o()[m / 4 + 3], l = n, p = r;
        if (i) throw l = 0, p = 0, c(d);
        return e = l, a = p, f(l, p);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.vrfkeyhash_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return f_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.vrfkeyhash_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return f_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Za = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_vrfvkey_free(b >>> 0));
  ie = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ie.prototype);
      return e.__wbg_ptr = t, Za.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Za.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_vrfvkey_free(t);
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.vrfvkey_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ie.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(t) {
      let e, a;
      try {
        const m = _.__wbindgen_add_to_stack_pointer(-16), j = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), z = g;
        _.anchordatahash_to_bech32(m, this.__wbg_ptr, j, z);
        var n = o()[m / 4 + 0], r = o()[m / 4 + 1], d = o()[m / 4 + 2], i = o()[m / 4 + 3], l = n, p = r;
        if (i) throw l = 0, p = 0, c(d);
        return e = l, a = p, f(l, p);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, a, 1);
      }
    }
    static from_bech32(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.vrfvkey_from_bech32(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ie.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.anchordatahash_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.vrfvkey_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ie.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Ua = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_value_free(b >>> 0));
  R = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(R.prototype);
      return e.__wbg_ptr = t, Ua.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ua.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_value_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.value_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.value_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return R.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.value_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.value_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return R.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.value_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.value_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.value_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return R.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t) {
      w(t, y);
      const e = _.value_new(t.__wbg_ptr);
      return R.__wrap(e);
    }
    static new_from_assets(t) {
      w(t, N);
      const e = _.value_new_from_assets(t.__wbg_ptr);
      return R.__wrap(e);
    }
    static new_with_assets(t, e) {
      w(t, y), w(e, N);
      const a = _.value_new_with_assets(t.__wbg_ptr, e.__wbg_ptr);
      return R.__wrap(a);
    }
    static zero() {
      const t = _.value_zero();
      return R.__wrap(t);
    }
    is_zero() {
      return _.value_is_zero(this.__wbg_ptr) !== 0;
    }
    coin() {
      const t = _.value_coin(this.__wbg_ptr);
      return y.__wrap(t);
    }
    set_coin(t) {
      w(t, y), _.value_set_coin(this.__wbg_ptr, t.__wbg_ptr);
    }
    multiasset() {
      const t = _.value_multiasset(this.__wbg_ptr);
      return t === 0 ? void 0 : N.__wrap(t);
    }
    set_multiasset(t) {
      w(t, N), _.value_set_multiasset(this.__wbg_ptr, t.__wbg_ptr);
    }
    checked_add(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, R), _.value_checked_add(r, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return R.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    checked_sub(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, R), _.value_checked_sub(r, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return R.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    clamped_sub(t) {
      w(t, R);
      const e = _.value_clamped_sub(this.__wbg_ptr, t.__wbg_ptr);
      return R.__wrap(e);
    }
    compare(t) {
      w(t, R);
      const e = _.value_compare(this.__wbg_ptr, t.__wbg_ptr);
      return e === 16777215 ? void 0 : e;
    }
  };
  const Ea = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_versionedblock_free(b >>> 0));
  je = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(je.prototype);
      return e.__wbg_ptr = t, Ea.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ea.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_versionedblock_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.versionedblock_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.versionedblock_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return je.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.versionedblock_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.versionedblock_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return je.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.versionedblock_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.versionedblock_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.versionedblock_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return je.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t, e) {
      w(t, k_);
      var a = t.__destroy_into_raw();
      const n = _.versionedblock_new(a, e);
      return je.__wrap(n);
    }
    block() {
      const t = _.versionedblock_block(this.__wbg_ptr);
      return k_.__wrap(t);
    }
    era() {
      return _.versionedblock_era(this.__wbg_ptr);
    }
  };
  const Ka = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_vkey_free(b >>> 0));
  _t = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(_t.prototype);
      return e.__wbg_ptr = t, Ka.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ka.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_vkey_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.vkey_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.vkey_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return _t.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.vkey_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.vkey_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return _t.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.vkey_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.vkey_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.vkey_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return _t.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t) {
      w(t, Xt);
      const e = _.vkey_new(t.__wbg_ptr);
      return _t.__wrap(e);
    }
    public_key() {
      const t = _.vkey_public_key(this.__wbg_ptr);
      return Xt.__wrap(t);
    }
  };
  const Sa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_vkeys_free(b >>> 0));
  ur = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ur.prototype);
      return e.__wbg_ptr = t, Sa.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Sa.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_vkeys_free(t);
    }
    static new() {
      const t = _.vkeys_new();
      return ur.__wrap(t);
    }
    len() {
      return _.costmdls_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.vkeys_get(this.__wbg_ptr, t);
      return _t.__wrap(e);
    }
    add(t) {
      w(t, _t), _.vkeys_add(this.__wbg_ptr, t.__wbg_ptr);
    }
  };
  const Wa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_vkeywitness_free(b >>> 0));
  Lt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Lt.prototype);
      return e.__wbg_ptr = t, Wa.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Wa.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_vkeywitness_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.vkeywitness_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.vkeywitness_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Lt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.vkeywitness_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.vkeywitness_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Lt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.vkeywitness_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.vkeywitness_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.vkeywitness_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Lt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t, e) {
      w(t, _t), w(e, pt);
      const a = _.vkeywitness_new(t.__wbg_ptr, e.__wbg_ptr);
      return Lt.__wrap(a);
    }
    vkey() {
      const t = _.vkeywitness_vkey(this.__wbg_ptr);
      return _t.__wrap(t);
    }
    signature() {
      const t = _.operationalcert_sigma(this.__wbg_ptr);
      return pt.__wrap(t);
    }
  };
  const Ma = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_vkeywitnesses_free(b >>> 0));
  re = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(re.prototype);
      return e.__wbg_ptr = t, Ma.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ma.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_vkeywitnesses_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.vkeywitnesses_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.vkeywitnesses_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return re.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.vkeywitnesses_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.vkeywitnesses_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return re.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.vkeywitnesses_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.vkeywitnesses_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.vkeywitnesses_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return re.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.bootstrapwitnesses_new();
      return re.__wrap(t);
    }
    len() {
      return _.bootstrapwitnesses_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.vkeywitnesses_get(this.__wbg_ptr, t);
      return Lt.__wrap(e);
    }
    add(t) {
      return w(t, Lt), _.vkeywitnesses_add(this.__wbg_ptr, t.__wbg_ptr) !== 0;
    }
  };
  const Ga = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_votedelegation_free(b >>> 0));
  ne = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ne.prototype);
      return e.__wbg_ptr = t, Ga.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ga.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_votedelegation_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.votedelegation_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.votedelegation_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ne.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.votedelegation_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.votedelegation_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ne.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.votedelegation_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.votedelegation_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.votedelegation_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return ne.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    stake_credential() {
      const t = _.stakeandvotedelegation_stake_credential(this.__wbg_ptr);
      return x.__wrap(t);
    }
    drep() {
      const t = _.stakeandvotedelegation_drep(this.__wbg_ptr);
      return H.__wrap(t);
    }
    static new(t, e) {
      w(t, x), w(e, H);
      const a = _.votedelegation_new(t.__wbg_ptr, e.__wbg_ptr);
      return ne.__wrap(a);
    }
    has_script_credentials() {
      return _.stakeandvotedelegation_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const Ha = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_voteregistrationanddelegation_free(b >>> 0));
  oe = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(oe.prototype);
      return e.__wbg_ptr = t, Ha.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ha.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_voteregistrationanddelegation_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.voteregistrationanddelegation_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.voteregistrationanddelegation_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return oe.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.voteregistrationanddelegation_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.voteregistrationanddelegation_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return oe.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.voteregistrationanddelegation_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.voteregistrationanddelegation_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.voteregistrationanddelegation_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return oe.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    stake_credential() {
      const t = _.drepderegistration_voting_credential(this.__wbg_ptr);
      return x.__wrap(t);
    }
    drep() {
      const t = _.voteregistrationanddelegation_drep(this.__wbg_ptr);
      return H.__wrap(t);
    }
    coin() {
      const t = _.drepderegistration_coin(this.__wbg_ptr);
      return y.__wrap(t);
    }
    static new(t, e, a) {
      w(t, x), w(e, H), w(a, y);
      const n = _.voteregistrationanddelegation_new(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
      return oe.__wrap(n);
    }
    has_script_credentials() {
      return _.drepderegistration_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const Aa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_voter_free(b >>> 0));
  C = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(C.prototype);
      return e.__wbg_ptr = t, Aa.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Aa.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_voter_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.voter_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.voter_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return C.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.voter_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.voter_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return C.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.voter_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.voter_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.voter_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return C.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_constitutional_committee_hot_credential(t) {
      w(t, x);
      const e = _.voter_new_constitutional_committee_hot_credential(t.__wbg_ptr);
      return C.__wrap(e);
    }
    static new_drep_credential(t) {
      w(t, x);
      const e = _.voter_new_drep_credential(t.__wbg_ptr);
      return C.__wrap(e);
    }
    static new_stake_pool_key_hash(t) {
      w(t, q);
      const e = _.voter_new_stake_pool_key_hash(t.__wbg_ptr);
      return C.__wrap(e);
    }
    kind() {
      return _.voter_kind(this.__wbg_ptr);
    }
    to_constitutional_committee_hot_credential() {
      const t = _.voter_to_constitutional_committee_hot_credential(this.__wbg_ptr);
      return t === 0 ? void 0 : x.__wrap(t);
    }
    to_drep_credential() {
      const t = _.voter_to_drep_credential(this.__wbg_ptr);
      return t === 0 ? void 0 : x.__wrap(t);
    }
    to_stake_pool_key_hash() {
      const t = _.voter_to_stake_pool_key_hash(this.__wbg_ptr);
      return t === 0 ? void 0 : q.__wrap(t);
    }
    has_script_credentials() {
      return _.voter_has_script_credentials(this.__wbg_ptr) !== 0;
    }
    to_key_hash() {
      const t = _.voter_to_key_hash(this.__wbg_ptr);
      return t === 0 ? void 0 : q.__wrap(t);
    }
  };
  const Ia = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_voters_free(b >>> 0));
  Me = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Me.prototype);
      return e.__wbg_ptr = t, Ia.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ia.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_voters_free(t);
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.voters_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.voters_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.voters_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Me.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.voters_new();
      return Me.__wrap(t);
    }
    add(t) {
      w(t, C), _.voters_add(this.__wbg_ptr, t.__wbg_ptr);
    }
    get(t) {
      const e = _.voters_get(this.__wbg_ptr, t);
      return e === 0 ? void 0 : C.__wrap(e);
    }
    len() {
      return _.relays_len(this.__wbg_ptr) >>> 0;
    }
  };
  const Da = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_votingbuilder_free(b >>> 0));
  sr = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(sr.prototype);
      return e.__wbg_ptr = t, Da.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Da.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_votingbuilder_free(t);
    }
    static new() {
      const t = _.votingbuilder_new();
      return sr.__wrap(t);
    }
    add(t, e, a) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, C), w(e, U), w(a, gt), _.votingbuilder_add(d, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
        var n = o()[d / 4 + 0], r = o()[d / 4 + 1];
        if (r) throw c(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_with_plutus_witness(t, e, a, n) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, C), w(e, U), w(a, gt), w(n, tt), _.votingbuilder_add_with_plutus_witness(i, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr, n.__wbg_ptr);
        var r = o()[i / 4 + 0], d = o()[i / 4 + 1];
        if (d) throw c(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_with_native_script(t, e, a, n) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, C), w(e, U), w(a, gt), w(n, Ht), _.votingbuilder_add_with_native_script(i, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr, n.__wbg_ptr);
        var r = o()[i / 4 + 0], d = o()[i / 4 + 1];
        if (d) throw c(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_plutus_witnesses() {
      const t = _.votingbuilder_get_plutus_witnesses(this.__wbg_ptr);
      return At.__wrap(t);
    }
    get_ref_inputs() {
      const t = _.votingbuilder_get_ref_inputs(this.__wbg_ptr);
      return S.__wrap(t);
    }
    get_native_scripts() {
      const t = _.votingbuilder_get_native_scripts(this.__wbg_ptr);
      return E.__wrap(t);
    }
    has_plutus_scripts() {
      return _.votingbuilder_has_plutus_scripts(this.__wbg_ptr) !== 0;
    }
    build() {
      const t = _.votingbuilder_build(this.__wbg_ptr);
      return g_.__wrap(t);
    }
  };
  const Ta = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_votingprocedure_free(b >>> 0));
  gt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(gt.prototype);
      return e.__wbg_ptr = t, Ta.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ta.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_votingprocedure_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.votingprocedure_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.votingprocedure_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return gt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.votingprocedure_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.votingprocedure_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return gt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.votingprocedure_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.votingprocedure_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.votingprocedure_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return gt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(t) {
      const e = _.votingprocedure_new(t);
      return gt.__wrap(e);
    }
    static new_with_anchor(t, e) {
      w(e, A);
      const a = _.votingprocedure_new_with_anchor(t, e.__wbg_ptr);
      return gt.__wrap(a);
    }
    vote_kind() {
      return _.votingprocedure_vote_kind(this.__wbg_ptr);
    }
    anchor() {
      const t = _.committeecoldresign_anchor(this.__wbg_ptr);
      return t === 0 ? void 0 : A.__wrap(t);
    }
  };
  const Na = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_votingprocedures_free(b >>> 0));
  g_ = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(g_.prototype);
      return e.__wbg_ptr = t, Na.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Na.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_votingprocedures_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.votingprocedures_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.votingprocedures_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return g_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.votingprocedures_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.votingprocedures_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return g_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.votingprocedures_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.votingprocedures_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.votingprocedures_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return g_.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.costmdls_new();
      return g_.__wrap(t);
    }
    insert(t, e, a) {
      w(t, C), w(e, U), w(a, gt), _.votingprocedures_insert(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
    }
    get(t, e) {
      w(t, C), w(e, U);
      const a = _.votingprocedures_get(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
      return a === 0 ? void 0 : gt.__wrap(a);
    }
    get_voters() {
      const t = _.votingprocedures_get_voters(this.__wbg_ptr);
      return Me.__wrap(t);
    }
    get_governance_action_ids_by_voter(t) {
      w(t, C);
      const e = _.votingprocedures_get_governance_action_ids_by_voter(this.__wbg_ptr, t.__wbg_ptr);
      return Se.__wrap(e);
    }
  };
  const Ca = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_votingproposal_free(b >>> 0));
  Jt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Jt.prototype);
      return e.__wbg_ptr = t, Ca.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ca.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_votingproposal_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.votingproposal_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.votingproposal_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Jt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.votingproposal_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.votingproposal_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Jt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.votingproposal_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.votingproposal_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.votingproposal_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Jt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    governance_action() {
      const t = _.votingproposal_governance_action(this.__wbg_ptr);
      return rt.__wrap(t);
    }
    anchor() {
      const t = _.votingproposal_anchor(this.__wbg_ptr);
      return A.__wrap(t);
    }
    reward_account() {
      const t = _.votingproposal_reward_account(this.__wbg_ptr);
      return T.__wrap(t);
    }
    deposit() {
      const t = _.votingproposal_deposit(this.__wbg_ptr);
      return y.__wrap(t);
    }
    static new(t, e, a, n) {
      w(t, rt), w(e, A), w(a, T), w(n, y);
      const r = _.votingproposal_new(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr, n.__wbg_ptr);
      return Jt.__wrap(r);
    }
  };
  const Va = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_votingproposalbuilder_free(b >>> 0));
  ir = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(ir.prototype);
      return e.__wbg_ptr = t, Va.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Va.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_votingproposalbuilder_free(t);
    }
    static new() {
      const t = _.mintbuilder_new();
      return ir.__wrap(t);
    }
    add(t) {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, Jt), _.votingproposalbuilder_add(n, this.__wbg_ptr, t.__wbg_ptr);
        var e = o()[n / 4 + 0], a = o()[n / 4 + 1];
        if (a) throw c(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_with_plutus_witness(t, e) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, Jt), w(e, tt), _.votingproposalbuilder_add_with_plutus_witness(r, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        if (n) throw c(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_plutus_witnesses() {
      const t = _.votingproposalbuilder_get_plutus_witnesses(this.__wbg_ptr);
      return At.__wrap(t);
    }
    get_ref_inputs() {
      const t = _.votingproposalbuilder_get_ref_inputs(this.__wbg_ptr);
      return S.__wrap(t);
    }
    has_plutus_scripts() {
      return _.votingproposalbuilder_has_plutus_scripts(this.__wbg_ptr) !== 0;
    }
    build() {
      const t = _.votingproposalbuilder_build(this.__wbg_ptr);
      return Et.__wrap(t);
    }
  };
  const Pa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_votingproposals_free(b >>> 0));
  Et = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Et.prototype);
      return e.__wbg_ptr = t, Pa.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Pa.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_votingproposals_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.votingproposals_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.votingproposals_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Et.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.votingproposals_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.votingproposals_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Et.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.votingproposals_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.votingproposals_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.votingproposals_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Et.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.credentials_new();
      return Et.__wrap(t);
    }
    len() {
      return _.credentials_len(this.__wbg_ptr) >>> 0;
    }
    get(t) {
      const e = _.votingproposals_get(this.__wbg_ptr, t);
      return Jt.__wrap(e);
    }
    add(t) {
      return w(t, Jt), _.votingproposals_add(this.__wbg_ptr, t.__wbg_ptr) !== 0;
    }
    contains(t) {
      return w(t, Jt), _.votingproposals_contains(this.__wbg_ptr, t.__wbg_ptr) !== 0;
    }
    to_option() {
      const t = _.votingproposals_to_option(this.__wbg_ptr);
      return t === 0 ? void 0 : Et.__wrap(t);
    }
  };
  const Ba = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_withdrawals_free(b >>> 0));
  Mt = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(Mt.prototype);
      return e.__wbg_ptr = t, Ba.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ba.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_withdrawals_free(t);
    }
    to_bytes() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.withdrawals_to_bytes(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = v(t, e).slice();
        return _.__wbindgen_free(t, e * 1, 1), a;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = h(t, _.__wbindgen_malloc), i = g;
        _.withdrawals_from_bytes(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Mt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let t, e;
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.withdrawals_to_hex(r, this.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        return t = a, e = n, f(a, n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    static from_hex(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.withdrawals_from_hex(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Mt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let t, e;
      try {
        const p = _.__wbindgen_add_to_stack_pointer(-16);
        _.withdrawals_to_json(p, this.__wbg_ptr);
        var a = o()[p / 4 + 0], n = o()[p / 4 + 1], r = o()[p / 4 + 2], d = o()[p / 4 + 3], i = a, l = n;
        if (d) throw i = 0, l = 0, c(r);
        return t = i, e = l, f(i, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(t, e, 1);
      }
    }
    to_js_value() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.withdrawals_to_js_value(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return c(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(t) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16), d = u(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = g;
        _.withdrawals_from_json(r, d, i);
        var e = o()[r / 4 + 0], a = o()[r / 4 + 1], n = o()[r / 4 + 2];
        if (n) throw c(a);
        return Mt.__wrap(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const t = _.auxiliarydataset_new();
      return Mt.__wrap(t);
    }
    len() {
      return _.auxiliarydataset_len(this.__wbg_ptr) >>> 0;
    }
    insert(t, e) {
      w(t, T), w(e, y);
      const a = _.withdrawals_insert(this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
      return a === 0 ? void 0 : y.__wrap(a);
    }
    get(t) {
      w(t, T);
      const e = _.withdrawals_get(this.__wbg_ptr, t.__wbg_ptr);
      return e === 0 ? void 0 : y.__wrap(e);
    }
    keys() {
      const t = _.withdrawals_keys(this.__wbg_ptr);
      return G_.__wrap(t);
    }
  };
  const ts = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((b) => _.__wbg_withdrawalsbuilder_free(b >>> 0));
  dr = class {
    static __wrap(t) {
      t = t >>> 0;
      const e = Object.create(dr.prototype);
      return e.__wbg_ptr = t, ts.register(e, e.__wbg_ptr, e), e;
    }
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ts.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      _.__wbg_withdrawalsbuilder_free(t);
    }
    static new() {
      const t = _.withdrawalsbuilder_new();
      return dr.__wrap(t);
    }
    add(t, e) {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, T), w(e, y), _.withdrawalsbuilder_add(r, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
        var a = o()[r / 4 + 0], n = o()[r / 4 + 1];
        if (n) throw c(a);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_with_plutus_witness(t, e, a) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, T), w(e, y), w(a, tt), _.withdrawalsbuilder_add_with_plutus_witness(d, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
        var n = o()[d / 4 + 0], r = o()[d / 4 + 1];
        if (r) throw c(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_with_native_script(t, e, a) {
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16);
        w(t, T), w(e, y), w(a, Ht), _.withdrawalsbuilder_add_with_native_script(d, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
        var n = o()[d / 4 + 0], r = o()[d / 4 + 1];
        if (r) throw c(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_plutus_witnesses() {
      const t = _.withdrawalsbuilder_get_plutus_witnesses(this.__wbg_ptr);
      return At.__wrap(t);
    }
    get_ref_inputs() {
      const t = _.withdrawalsbuilder_get_ref_inputs(this.__wbg_ptr);
      return S.__wrap(t);
    }
    get_native_scripts() {
      const t = _.withdrawalsbuilder_get_native_scripts(this.__wbg_ptr);
      return E.__wrap(t);
    }
    get_total_withdrawals() {
      try {
        const n = _.__wbindgen_add_to_stack_pointer(-16);
        _.withdrawalsbuilder_get_total_withdrawals(n, this.__wbg_ptr);
        var t = o()[n / 4 + 0], e = o()[n / 4 + 1], a = o()[n / 4 + 2];
        if (a) throw c(e);
        return R.__wrap(t);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    has_plutus_scripts() {
      return _.withdrawalsbuilder_has_plutus_scripts(this.__wbg_ptr) !== 0;
    }
    build() {
      const t = _.withdrawalsbuilder_build(this.__wbg_ptr);
      return Mt.__wrap(t);
    }
  };
  hs = function(b) {
    return $(b);
  };
  ys = function(b) {
    c(b);
  };
  vs = function(b, t) {
    const e = f(b, t);
    return $(e);
  };
  ms = function(b, t) {
    const e = new Error(f(b, t));
    return $(e);
  };
  ks = function(b, t) {
    const e = F(t), a = typeof e == "string" ? e : void 0;
    var n = wt(a) ? 0 : u(a, _.__wbindgen_malloc, _.__wbindgen_realloc), r = g;
    o()[b / 4 + 1] = r, o()[b / 4 + 0] = n;
  };
  xs = function(b) {
    const t = F(b);
    return $(t);
  };
  js = function(b) {
    const t = F(b);
    return typeof t == "object" && t !== null;
  };
  zs = function(b, t) {
    const e = String(F(t)), a = u(e, _.__wbindgen_malloc, _.__wbindgen_realloc), n = g;
    o()[b / 4 + 1] = n, o()[b / 4 + 0] = a;
  };
  Fs = function(b, t, e) {
    F(b)[c(t)] = c(e);
  };
  Rs = function(b) {
    const t = F(b).crypto;
    return $(t);
  };
  Os = function(b) {
    const t = F(b).process;
    return $(t);
  };
  qs = function(b) {
    const t = F(b).versions;
    return $(t);
  };
  $s = function(b) {
    const t = F(b).node;
    return $(t);
  };
  Ls = function(b) {
    return typeof F(b) == "string";
  };
  Js = function() {
    return h_(function() {
      const b = module.require;
      return $(b);
    }, arguments);
  };
  Ys = function(b) {
    const t = F(b).msCrypto;
    return $(t);
  };
  Qs = function() {
    return h_(function(b, t) {
      F(b).getRandomValues(F(t));
    }, arguments);
  };
  Xs = function() {
    return h_(function(b, t) {
      F(b).randomFillSync(c(t));
    }, arguments);
  };
  Zs = function() {
    const b = new Array();
    return $(b);
  };
  Us = function(b) {
    return typeof F(b) == "function";
  };
  Es = function(b, t) {
    const e = new Function(f(b, t));
    return $(e);
  };
  Ks = function() {
    return $(/* @__PURE__ */ new Map());
  };
  Ss = function() {
    return h_(function(b, t) {
      const e = F(b).call(F(t));
      return $(e);
    }, arguments);
  };
  Ws = function() {
    const b = new Object();
    return $(b);
  };
  Ms = function() {
    return h_(function() {
      const b = self.self;
      return $(b);
    }, arguments);
  };
  Gs = function() {
    return h_(function() {
      const b = window.window;
      return $(b);
    }, arguments);
  };
  Hs = function() {
    return h_(function() {
      const b = globalThis.globalThis;
      return $(b);
    }, arguments);
  };
  As = function() {
    return h_(function() {
      const b = global.global;
      return $(b);
    }, arguments);
  };
  Is = function(b) {
    return F(b) === void 0;
  };
  Ds = function(b, t, e) {
    F(b)[t >>> 0] = c(e);
  };
  Ts = function() {
    return h_(function(b, t, e) {
      const a = F(b).call(F(t), F(e));
      return $(a);
    }, arguments);
  };
  Ns = function(b, t, e) {
    const a = F(b).set(F(t), F(e));
    return $(a);
  };
  Cs = function(b) {
    const t = F(b).buffer;
    return $(t);
  };
  Vs = function(b, t, e) {
    const a = new Uint8Array(F(b), t >>> 0, e >>> 0);
    return $(a);
  };
  Ps = function(b) {
    const t = new Uint8Array(F(b));
    return $(t);
  };
  Bs = function(b, t, e) {
    F(b).set(F(t), e >>> 0);
  };
  ti = function(b) {
    const t = new Uint8Array(b >>> 0);
    return $(t);
  };
  _i = function(b, t, e) {
    const a = F(b).subarray(t >>> 0, e >>> 0);
    return $(a);
  };
  ei = function(b, t) {
    const e = new Function(f(b, t));
    return $(e);
  };
  ri = function(b, t) {
    const e = F(b).call(F(t));
    return $(e);
  };
  ni = function(b, t) {
    return F(b) === F(t);
  };
  oi = function(b) {
    const t = F(b).self;
    return $(t);
  };
  ai = function(b, t) {
    const e = require(f(b, t));
    return $(e);
  };
  si = function(b) {
    const t = F(b).crypto;
    return $(t);
  };
  ii = function(b) {
    const t = F(b).getRandomValues;
    return $(t);
  };
  di = function(b, t, e) {
    F(b).randomFillSync(v(t, e));
  };
  ci = function(b, t, e) {
    F(b).getRandomValues(v(t, e));
  };
  pi = function(b, t) {
    const e = pr(F(t)), a = u(e, _.__wbindgen_malloc, _.__wbindgen_realloc), n = g;
    o()[b / 4 + 1] = n, o()[b / 4 + 0] = a;
  };
  wi = function(b, t) {
    throw new Error(f(b, t));
  };
  bi = function() {
    const b = _.memory;
    return $(b);
  };
  URL = globalThis.URL;
  const s = await cs({
    "./cardano_serialization_lib_bg.js": {
      __wbindgen_number_new: hs,
      __wbindgen_object_drop_ref: ys,
      __wbindgen_string_new: vs,
      __wbindgen_error_new: ms,
      __wbindgen_string_get: ks,
      __wbindgen_object_clone_ref: xs,
      __wbindgen_is_object: js,
      __wbg_String_91fba7ded13ba54c: zs,
      __wbg_set_20cbc34131e76824: Fs,
      __wbg_crypto_1d1f22824a6a080c: Rs,
      __wbg_process_4a72847cc503995b: Os,
      __wbg_versions_f686565e586dd935: qs,
      __wbg_node_104a2ff8d6ea03a2: $s,
      __wbindgen_is_string: Ls,
      __wbg_require_cca90b1a94a0255b: Js,
      __wbg_msCrypto_eb05e62b530a1508: Ys,
      __wbg_getRandomValues_3aa56aa6edec874c: Qs,
      __wbg_randomFillSync_5c9c955aa56b6049: Xs,
      __wbg_new_16b304a2cfa7ff4a: Zs,
      __wbindgen_is_function: Us,
      __wbg_newnoargs_e258087cd0daa0ea: Es,
      __wbg_new_d9bc3a0147634640: Ks,
      __wbg_call_27c0f87801dedf93: Ss,
      __wbg_new_72fb9a18b5ae2624: Ws,
      __wbg_self_ce0dbfc45cf2f5be: Ms,
      __wbg_window_c6fb939a7f436783: Gs,
      __wbg_globalThis_d1e6af4856ba331b: Hs,
      __wbg_global_207b558942527489: As,
      __wbindgen_is_undefined: Is,
      __wbg_set_d4638f722068f043: Ds,
      __wbg_call_b3ca7c6051f9bec1: Ts,
      __wbg_set_8417257aaedc936b: Ns,
      __wbg_buffer_12d079cc21e14bdb: Cs,
      __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb: Vs,
      __wbg_new_63b92bc8671ed464: Ps,
      __wbg_set_a47bac70306a19a7: Bs,
      __wbg_newwithlength_e9b4878cebadb3d3: ti,
      __wbg_subarray_a1f73cd4b5b42fe1: _i,
      __wbg_new_d87f272aec784ec0: ei,
      __wbg_call_eae29933372a39be: ri,
      __wbindgen_jsval_eq: ni,
      __wbg_self_e0b3266d2d9eba1a: oi,
      __wbg_require_0993fe224bf8e202: ai,
      __wbg_crypto_e95a6e54c5c2e37f: si,
      __wbg_getRandomValues_dc67302a7bd1aec5: ii,
      __wbg_randomFillSync_dd2297de5917c74e: di,
      __wbg_getRandomValues_02639197c8166a96: ci,
      __wbindgen_debug_string: pi,
      __wbindgen_throw: wi,
      __wbindgen_memory: bi
    }
  }, ds), li = s.memory, gi = s.__wbg_stakederegistration_free, ui = s.stakederegistration_to_bytes, fi = s.stakederegistration_from_bytes, hi = s.stakederegistration_to_hex, yi = s.stakederegistration_from_hex, vi = s.stakederegistration_to_json, mi = s.stakederegistration_to_js_value, ki = s.stakederegistration_from_json, xi = s.stakederegistration_stake_credential, ji = s.stakederegistration_coin, zi = s.stakederegistration_new, Fi = s.stakederegistration_new_with_explicit_refund, Ri = s.stakederegistration_has_script_credentials, Oi = s.__wbg_committeehotauth_free, qi = s.committeehotauth_to_bytes, $i = s.committeehotauth_from_bytes, Li = s.committeehotauth_to_hex, Ji = s.committeehotauth_from_hex, Yi = s.committeehotauth_to_json, Qi = s.committeehotauth_to_js_value, Xi = s.committeehotauth_from_json, Zi = s.committeehotauth_committee_cold_credential, Ui = s.committeehotauth_committee_hot_credential, Ei = s.committeehotauth_new, Ki = s.committeehotauth_has_script_credentials, Si = s.__wbg_fixedtxwitnessesset_free, Wi = s.fixedtxwitnessesset_tx_witnesses_set, Mi = s.fixedtxwitnessesset_add_vkey_witness, Gi = s.fixedtxwitnessesset_add_bootstrap_witness, Hi = s.fixedtxwitnessesset_to_bytes, Ai = s.fixedtxwitnessesset_from_bytes, Ii = s.__wbg_ed25519signature_free, Di = s.ed25519signature_to_bytes, Ti = s.ed25519signature_to_bech32, Ni = s.ed25519signature_to_hex, Ci = s.ed25519signature_from_bech32, Vi = s.ed25519signature_from_hex, Pi = s.ed25519signature_from_bytes, Bi = s.__wbg_nonce_free, td = s.nonce_to_bytes, _d = s.nonce_from_bytes, ed = s.nonce_to_hex, rd = s.nonce_from_hex, nd = s.nonce_to_json, od = s.nonce_to_js_value, ad = s.nonce_from_json, sd = s.nonce_new_identity, id = s.nonce_new_from_hash, dd = s.nonce_get_hash, cd = s.__wbg_bignum_free, pd = s.bignum_to_bytes, wd = s.bignum_from_bytes, bd = s.bignum_to_hex, ld = s.bignum_from_hex, gd = s.bignum_to_json, ud = s.bignum_to_js_value, fd = s.bignum_from_json, hd = s.bignum_from_str, yd = s.bignum_to_str, vd = s.bignum_zero, md = s.bignum_one, kd = s.bignum_is_zero, xd = s.bignum_div_floor, jd = s.bignum_checked_mul, zd = s.bignum_checked_add, Fd = s.bignum_checked_sub, Rd = s.bignum_clamped_sub, Od = s.bignum_compare, qd = s.bignum_less_than, $d = s.bignum_max_value, Ld = s.bignum_max, Jd = s.__wbg_unitinterval_free, Yd = s.unitinterval_to_bytes, Qd = s.unitinterval_from_bytes, Xd = s.unitinterval_to_hex, Zd = s.unitinterval_from_hex, Ud = s.unitinterval_to_json, Ed = s.unitinterval_to_js_value, Kd = s.unitinterval_from_json, Sd = s.unitinterval_denominator, Wd = s.unitinterval_new, Md = s.__wbg_transaction_free, Gd = s.transaction_to_bytes, Hd = s.transaction_from_bytes, Ad = s.transaction_to_hex, Id = s.transaction_from_hex, Dd = s.transaction_to_json, Td = s.transaction_to_js_value, Nd = s.transaction_from_json, Cd = s.transaction_body, Vd = s.transaction_witness_set, Pd = s.transaction_is_valid, Bd = s.transaction_auxiliary_data, tc = s.transaction_set_is_valid, _c = s.transaction_new, ec = s.__wbg_transactionoutputs_free, rc = s.transactionoutputs_to_bytes, nc = s.transactionoutputs_from_bytes, oc = s.transactionoutputs_to_hex, ac = s.transactionoutputs_from_hex, sc = s.transactionoutputs_to_json, ic = s.transactionoutputs_to_js_value, dc = s.transactionoutputs_from_json, cc = s.transactionoutputs_new, pc = s.transactionoutputs_get, wc = s.transactionoutputs_add, bc = s.datacost_coins_per_byte, lc = s.__wbg_transactionoutput_free, gc = s.transactionoutput_to_bytes, uc = s.transactionoutput_from_bytes, fc = s.transactionoutput_to_hex, hc = s.transactionoutput_from_hex, yc = s.transactionoutput_to_json, vc = s.transactionoutput_to_js_value, mc = s.transactionoutput_from_json, kc = s.transactionoutput_address, xc = s.transactionoutput_amount, jc = s.transactionoutput_data_hash, zc = s.transactionoutput_plutus_data, Fc = s.transactionoutput_script_ref, Rc = s.transactionoutput_set_script_ref, Oc = s.transactionoutput_set_plutus_data, qc = s.transactionoutput_set_data_hash, $c = s.transactionoutput_has_plutus_data, Lc = s.transactionoutput_has_data_hash, Jc = s.transactionoutput_has_script_ref, Yc = s.transactionoutput_new, Qc = s.transactionoutput_serialization_format, Xc = s.__wbg_ipv4_free, Zc = s.ipv4_to_bytes, Uc = s.ipv4_from_bytes, Ec = s.ipv4_to_hex, Kc = s.ipv4_from_hex, Sc = s.ipv4_to_json, Wc = s.ipv4_to_js_value, Mc = s.ipv4_from_json, Gc = s.ipv4_new, Hc = s.ipv4_ip, Ac = s.__wbg_ipv6_free, Ic = s.ipv6_to_bytes, Dc = s.ipv6_from_bytes, Tc = s.ipv6_to_hex, Nc = s.ipv6_from_hex, Cc = s.ipv6_to_json, Vc = s.ipv6_to_js_value, Pc = s.ipv6_from_json, Bc = s.ipv6_new, tp = s.ipv6_ip, _p = s.url_to_bytes, ep = s.url_from_bytes, rp = s.url_to_hex, np = s.url_from_hex, op = s.url_from_json, ap = s.url_new, sp = s.dnsrecordaoraaaa_to_bytes, ip = s.dnsrecordaoraaaa_from_bytes, dp = s.dnsrecordaoraaaa_to_hex, cp = s.dnsrecordaoraaaa_from_hex, pp = s.dnsrecordaoraaaa_to_json, wp = s.dnsrecordaoraaaa_to_js_value, bp = s.dnsrecordaoraaaa_from_json, lp = s.dnsrecordaoraaaa_new, gp = s.dnsrecordaoraaaa_record, up = s.dnsrecordsrv_to_bytes, fp = s.dnsrecordsrv_from_bytes, hp = s.dnsrecordsrv_to_hex, yp = s.dnsrecordsrv_from_hex, vp = s.dnsrecordsrv_from_json, mp = s.dnsrecordsrv_new, kp = s.__wbg_singlehostaddr_free, xp = s.singlehostaddr_to_bytes, jp = s.singlehostaddr_from_bytes, zp = s.singlehostaddr_to_hex, Fp = s.singlehostaddr_from_hex, Rp = s.singlehostaddr_to_json, Op = s.singlehostaddr_to_js_value, qp = s.singlehostaddr_from_json, $p = s.singlehostaddr_port, Lp = s.singlehostaddr_ipv4, Jp = s.singlehostaddr_ipv6, Yp = s.singlehostaddr_new, Qp = s.__wbg_singlehostname_free, Xp = s.singlehostname_to_bytes, Zp = s.singlehostname_from_bytes, Up = s.singlehostname_to_hex, Ep = s.singlehostname_from_hex, Kp = s.singlehostname_to_json, Sp = s.singlehostname_to_js_value, Wp = s.singlehostname_from_json, Mp = s.singlehostname_port, Gp = s.singlehostname_new, Hp = s.multihostname_to_bytes, Ap = s.multihostname_from_bytes, Ip = s.multihostname_to_hex, Dp = s.multihostname_from_hex, Tp = s.multihostname_to_json, Np = s.multihostname_to_js_value, Cp = s.multihostname_from_json, Vp = s.multihostname_dns_name, Pp = s.__wbg_relay_free, Bp = s.relay_to_bytes, tw = s.relay_from_bytes, _w = s.relay_to_hex, ew = s.relay_from_hex, rw = s.relay_to_json, nw = s.relay_to_js_value, ow = s.relay_from_json, aw = s.relay_new_single_host_addr, sw = s.relay_new_single_host_name, iw = s.relay_new_multi_host_name, dw = s.relay_kind, cw = s.relay_as_single_host_addr, pw = s.relay_as_single_host_name, ww = s.relay_as_multi_host_name, bw = s.__wbg_poolmetadata_free, lw = s.poolmetadata_to_bytes, gw = s.poolmetadata_from_bytes, uw = s.poolmetadata_to_hex, fw = s.poolmetadata_from_hex, hw = s.poolmetadata_to_json, yw = s.poolmetadata_to_js_value, vw = s.poolmetadata_from_json, mw = s.poolmetadata_pool_metadata_hash, kw = s.poolmetadata_new, xw = s.__wbg_rewardaddresses_free, jw = s.rewardaddresses_to_bytes, zw = s.rewardaddresses_from_bytes, Fw = s.rewardaddresses_to_hex, Rw = s.rewardaddresses_from_hex, Ow = s.rewardaddresses_to_json, qw = s.rewardaddresses_to_js_value, $w = s.rewardaddresses_from_json, Lw = s.rewardaddresses_get, Jw = s.rewardaddresses_add, Yw = s.__wbg_withdrawals_free, Qw = s.withdrawals_to_bytes, Xw = s.withdrawals_from_bytes, Zw = s.withdrawals_to_hex, Uw = s.withdrawals_from_hex, Ew = s.withdrawals_to_json, Kw = s.withdrawals_to_js_value, Sw = s.withdrawals_from_json, Ww = s.withdrawals_insert, Mw = s.withdrawals_get, Gw = s.withdrawals_keys, Hw = s.__wbg_outputdatum_free, Aw = s.outputdatum_new_data_hash, Iw = s.outputdatum_new_data, Dw = s.outputdatum_data_hash, Tw = s.outputdatum_data, Nw = s.__wbg_update_free, Cw = s.update_to_bytes, Vw = s.update_from_bytes, Pw = s.update_to_hex, Bw = s.update_from_hex, tb = s.update_to_json, _b = s.update_to_js_value, eb = s.update_from_json, rb = s.update_proposed_protocol_parameter_updates, nb = s.update_epoch, ob = s.update_new, ab = s.__wbg_genesishashes_free, sb = s.genesishashes_to_bytes, ib = s.genesishashes_from_bytes, db = s.genesishashes_to_hex, cb = s.genesishashes_from_hex, pb = s.genesishashes_to_json, wb = s.genesishashes_to_js_value, bb = s.genesishashes_from_json, lb = s.genesishashes_new, gb = s.genesishashes_get, ub = s.genesishashes_add, fb = s.scripthashes_to_bytes, hb = s.scripthashes_from_bytes, yb = s.scripthashes_to_hex, vb = s.scripthashes_from_hex, mb = s.scripthashes_to_json, kb = s.scripthashes_to_js_value, xb = s.scripthashes_from_json, jb = s.scripthashes_get, zb = s.scripthashes_add, Fb = s.__wbg_proposedprotocolparameterupdates_free, Rb = s.proposedprotocolparameterupdates_to_bytes, Ob = s.proposedprotocolparameterupdates_from_bytes, qb = s.proposedprotocolparameterupdates_to_hex, $b = s.proposedprotocolparameterupdates_from_hex, Lb = s.proposedprotocolparameterupdates_to_json, Jb = s.proposedprotocolparameterupdates_to_js_value, Yb = s.proposedprotocolparameterupdates_from_json, Qb = s.proposedprotocolparameterupdates_insert, Xb = s.proposedprotocolparameterupdates_get, Zb = s.proposedprotocolparameterupdates_keys, Ub = s.__wbg_protocolversion_free, Eb = s.protocolversion_to_bytes, Kb = s.protocolversion_from_bytes, Sb = s.protocolversion_to_hex, Wb = s.protocolversion_from_hex, Mb = s.protocolversion_to_json, Gb = s.protocolversion_to_js_value, Hb = s.protocolversion_from_json, Ab = s.protocolversion_major, Ib = s.protocolversion_minor, Db = s.protocolversion_new, Tb = s.__wbg_auxiliarydataset_free, Nb = s.auxiliarydataset_new, Cb = s.auxiliarydataset_len, Vb = s.auxiliarydataset_insert, Pb = s.auxiliarydataset_get, Bb = s.auxiliarydataset_indices, tl = s.__wbg_assetname_free, _l = s.assetname_to_bytes, el = s.assetname_from_bytes, rl = s.assetname_to_hex, nl = s.assetname_from_hex, ol = s.assetname_to_json, al = s.assetname_to_js_value, sl = s.assetname_from_json, il = s.assetname_new, dl = s.assetname_name, cl = s.__wbg_assetnames_free, pl = s.assetnames_to_bytes, wl = s.assetnames_from_bytes, bl = s.assetnames_to_hex, ll = s.assetnames_from_hex, gl = s.assetnames_to_json, ul = s.assetnames_to_js_value, fl = s.assetnames_from_json, hl = s.assetnames_new, yl = s.assetnames_len, vl = s.assetnames_get, ml = s.assetnames_add, kl = s.__wbg_assets_free, xl = s.assets_to_bytes, jl = s.assets_from_bytes, zl = s.assets_to_hex, Fl = s.assets_from_hex, Rl = s.assets_to_json, Ol = s.assets_to_js_value, ql = s.assets_from_json, $l = s.assets_new, Ll = s.assets_insert, Jl = s.assets_get, Yl = s.assets_keys, Ql = s.__wbg_multiasset_free, Xl = s.multiasset_to_bytes, Zl = s.multiasset_from_bytes, Ul = s.multiasset_to_hex, El = s.multiasset_from_hex, Kl = s.multiasset_to_json, Sl = s.multiasset_to_js_value, Wl = s.multiasset_from_json, Ml = s.multiasset_insert, Gl = s.multiasset_get, Hl = s.multiasset_set_asset, Al = s.multiasset_get_asset, Il = s.multiasset_keys, Dl = s.multiasset_sub, Tl = s.__wbg_mintsassets_free, Nl = s.mintsassets_to_json, Cl = s.mintsassets_to_js_value, Vl = s.mintsassets_from_json, Pl = s.mintsassets_add, Bl = s.mintsassets_get, tg = s.__wbg_mintassets_free, _g = s.mintassets_new_from_entry, eg = s.mintassets_insert, rg = s.mintassets_get, ng = s.mintassets_keys, og = s.__wbg_mint_free, ag = s.mint_to_bytes, sg = s.mint_from_bytes, ig = s.mint_to_hex, dg = s.mint_from_hex, cg = s.mint_to_json, pg = s.mint_to_js_value, wg = s.mint_from_json, bg = s.mint_new_from_entry, lg = s.mint_insert, gg = s.mint_get, ug = s.mint_keys, fg = s.mint_as_positive_multiasset, hg = s.mint_as_negative_multiasset, yg = s.__wbg_networkid_free, vg = s.networkid_to_bytes, mg = s.networkid_from_bytes, kg = s.networkid_to_hex, xg = s.networkid_from_hex, jg = s.networkid_to_json, zg = s.networkid_to_js_value, Fg = s.networkid_from_json, Rg = s.networkid_testnet, Og = s.networkid_mainnet, qg = s.networkid_kind, $g = s.__wbg_url_free, Lg = s.__wbg_dnsrecordsrv_free, Jg = s.__wbg_multihostname_free, Yg = s.__wbg_dnsrecordaoraaaa_free, Qg = s.multiasset_new, Xg = s.mintassets_new, Zg = s.withdrawals_new, Ug = s.proposedprotocolparameterupdates_new, Eg = s.__wbg_scripthashes_free, Kg = s.url_url, Sg = s.dnsrecordsrv_record, Wg = s.rewardaddresses_new, Mg = s.scripthashes_new, Gg = s.mintsassets_new, Hg = s.mint_new, Ag = s.url_to_json, Ig = s.datacost_new_coins_per_byte, Dg = s.unitinterval_numerator, Tg = s.url_to_js_value, Ng = s.singlehostname_dns_name, Cg = s.poolmetadata_url, Vg = s.transactionoutputs_len, Pg = s.multihostname_new, Bg = s.dnsrecordsrv_to_js_value, tu = s.dnsrecordsrv_to_json, _u = s.rewardaddresses_len, eu = s.scripthashes_len, ru = s.proposedprotocolparameterupdates_len, nu = s.withdrawals_len, ou = s.genesishashes_len, au = s.assets_len, su = s.multiasset_len, iu = s.mintsassets_len, du = s.mintassets_len, cu = s.mint_len, pu = s.__wbg_datacost_free, wu = s.__wbg_moveinstantaneousrewardscert_free, bu = s.moveinstantaneousrewardscert_to_bytes, lu = s.moveinstantaneousrewardscert_from_bytes, gu = s.moveinstantaneousrewardscert_to_hex, uu = s.moveinstantaneousrewardscert_from_hex, fu = s.moveinstantaneousrewardscert_to_json, hu = s.moveinstantaneousrewardscert_to_js_value, yu = s.moveinstantaneousrewardscert_from_json, vu = s.moveinstantaneousrewardscert_move_instantaneous_reward, mu = s.moveinstantaneousrewardscert_new, ku = s.__wbg_mirtostakecredentials_free, xu = s.mirtostakecredentials_to_bytes, ju = s.mirtostakecredentials_from_bytes, zu = s.mirtostakecredentials_to_hex, Fu = s.mirtostakecredentials_from_hex, Ru = s.mirtostakecredentials_to_json, Ou = s.mirtostakecredentials_to_js_value, qu = s.mirtostakecredentials_from_json, $u = s.mirtostakecredentials_new, Lu = s.mirtostakecredentials_len, Ju = s.mirtostakecredentials_insert, Yu = s.mirtostakecredentials_get, Qu = s.mirtostakecredentials_keys, Xu = s.__wbg_moveinstantaneousreward_free, Zu = s.moveinstantaneousreward_to_bytes, Uu = s.moveinstantaneousreward_from_bytes, Eu = s.moveinstantaneousreward_to_hex, Ku = s.moveinstantaneousreward_from_hex, Su = s.moveinstantaneousreward_to_json, Wu = s.moveinstantaneousreward_to_js_value, Mu = s.moveinstantaneousreward_from_json, Gu = s.moveinstantaneousreward_new_to_other_pot, Hu = s.moveinstantaneousreward_new_to_stake_creds, Au = s.moveinstantaneousreward_pot, Iu = s.moveinstantaneousreward_kind, Du = s.moveinstantaneousreward_as_to_other_pot, Tu = s.moveinstantaneousreward_as_to_stake_creds, Nu = s.poolregistration_to_bytes, Cu = s.poolregistration_from_bytes, Vu = s.poolregistration_to_hex, Pu = s.poolregistration_from_hex, Bu = s.poolregistration_to_json, tf = s.poolregistration_to_js_value, _f = s.poolregistration_from_json, ef = s.poolregistration_pool_params, rf = s.poolregistration_new, nf = s.__wbg_relays_free, of = s.relays_to_bytes, af = s.relays_from_bytes, sf = s.relays_to_hex, df = s.relays_from_hex, cf = s.relays_to_json, pf = s.relays_to_js_value, wf = s.relays_from_json, bf = s.relays_new, lf = s.relays_len, gf = s.relays_get, uf = s.relays_add, ff = s.__wbg_poolparams_free, hf = s.poolparams_to_bytes, yf = s.poolparams_from_bytes, vf = s.poolparams_to_hex, mf = s.poolparams_from_hex, kf = s.poolparams_to_json, xf = s.poolparams_to_js_value, jf = s.poolparams_from_json, zf = s.poolparams_operator, Ff = s.poolparams_vrf_keyhash, Rf = s.poolparams_pledge, Of = s.poolparams_cost, qf = s.poolparams_margin, $f = s.poolparams_reward_account, Lf = s.poolparams_pool_owners, Jf = s.poolparams_relays, Yf = s.poolparams_pool_metadata, Qf = s.poolparams_new, Xf = s.__wbg_stakedelegation_free, Zf = s.stakedelegation_to_bytes, Uf = s.stakedelegation_from_bytes, Ef = s.stakedelegation_to_hex, Kf = s.stakedelegation_from_hex, Sf = s.stakedelegation_to_json, Wf = s.stakedelegation_to_js_value, Mf = s.stakedelegation_from_json, Gf = s.stakedelegation_pool_keyhash, Hf = s.stakedelegation_new, Af = s.__wbg_votedelegation_free, If = s.votedelegation_to_bytes, Df = s.votedelegation_from_bytes, Tf = s.votedelegation_to_hex, Nf = s.votedelegation_from_hex, Cf = s.votedelegation_to_json, Vf = s.votedelegation_to_js_value, Pf = s.votedelegation_from_json, Bf = s.votedelegation_new, th = s.__wbg_stakeandvotedelegation_free, _h = s.stakeandvotedelegation_to_bytes, eh = s.stakeandvotedelegation_from_bytes, rh = s.stakeandvotedelegation_to_hex, nh = s.stakeandvotedelegation_from_hex, oh = s.stakeandvotedelegation_to_json, ah = s.stakeandvotedelegation_to_js_value, sh = s.stakeandvotedelegation_from_json, ih = s.stakeandvotedelegation_stake_credential, dh = s.stakeandvotedelegation_pool_keyhash, ch = s.stakeandvotedelegation_drep, ph = s.stakeandvotedelegation_new, wh = s.stakeandvotedelegation_has_script_credentials, bh = s.__wbg_stakeregistrationanddelegation_free, lh = s.stakeregistrationanddelegation_to_bytes, gh = s.stakeregistrationanddelegation_from_bytes, uh = s.stakeregistrationanddelegation_to_hex, fh = s.stakeregistrationanddelegation_from_hex, hh = s.stakeregistrationanddelegation_to_json, yh = s.stakeregistrationanddelegation_to_js_value, vh = s.stakeregistrationanddelegation_from_json, mh = s.stakeregistrationanddelegation_stake_credential, kh = s.stakeregistrationanddelegation_pool_keyhash, xh = s.stakeregistrationanddelegation_new, jh = s.stakeregistrationanddelegation_has_script_credentials, zh = s.__wbg_stakevoteregistrationanddelegation_free, Fh = s.stakevoteregistrationanddelegation_to_bytes, Rh = s.stakevoteregistrationanddelegation_from_bytes, Oh = s.stakevoteregistrationanddelegation_to_hex, qh = s.stakevoteregistrationanddelegation_from_hex, $h = s.stakevoteregistrationanddelegation_to_json, Lh = s.stakevoteregistrationanddelegation_to_js_value, Jh = s.stakevoteregistrationanddelegation_from_json, Yh = s.stakevoteregistrationanddelegation_stake_credential, Qh = s.stakevoteregistrationanddelegation_drep, Xh = s.stakevoteregistrationanddelegation_new, Zh = s.stakevoteregistrationanddelegation_has_script_credentials, Uh = s.voteregistrationanddelegation_to_bytes, Eh = s.voteregistrationanddelegation_from_bytes, Kh = s.voteregistrationanddelegation_to_hex, Sh = s.voteregistrationanddelegation_from_hex, Wh = s.voteregistrationanddelegation_to_json, Mh = s.voteregistrationanddelegation_to_js_value, Gh = s.voteregistrationanddelegation_from_json, Hh = s.voteregistrationanddelegation_drep, Ah = s.voteregistrationanddelegation_new, Ih = s.__wbg_drepderegistration_free, Dh = s.drepderegistration_to_bytes, Th = s.drepderegistration_from_bytes, Nh = s.drepderegistration_to_hex, Ch = s.drepderegistration_from_hex, Vh = s.drepderegistration_to_json, Ph = s.drepderegistration_to_js_value, Bh = s.drepderegistration_from_json, ty = s.drepderegistration_voting_credential, _y = s.drepderegistration_coin, ey = s.drepderegistration_new, ry = s.drepderegistration_has_script_credentials, ny = s.__wbg_drepupdate_free, oy = s.drepupdate_to_bytes, ay = s.drepupdate_from_bytes, sy = s.drepupdate_to_hex, iy = s.drepupdate_from_hex, dy = s.drepupdate_to_json, cy = s.drepupdate_to_js_value, py = s.drepupdate_from_json, wy = s.drepupdate_voting_credential, by = s.drepupdate_anchor, ly = s.drepupdate_new, gy = s.drepupdate_new_with_anchor, uy = s.drepupdate_has_script_credentials, fy = s.__wbg_voter_free, hy = s.voter_to_bytes, yy = s.voter_from_bytes, vy = s.voter_to_hex, my = s.voter_from_hex, ky = s.voter_to_json, xy = s.voter_to_js_value, jy = s.voter_from_json, zy = s.voter_new_constitutional_committee_hot_credential, Fy = s.voter_new_drep_credential, Ry = s.voter_new_stake_pool_key_hash, Oy = s.voter_kind, qy = s.voter_to_constitutional_committee_hot_credential, $y = s.voter_to_drep_credential, Ly = s.voter_to_stake_pool_key_hash, Jy = s.voter_has_script_credentials, Yy = s.voter_to_key_hash, Qy = s.__wbg_voters_free, Xy = s.voters_to_json, Zy = s.voters_to_js_value, Uy = s.voters_from_json, Ey = s.voters_new, Ky = s.voters_add, Sy = s.voters_get, Wy = s.__wbg_language_free, My = s.language_to_bytes, Gy = s.language_from_bytes, Hy = s.language_to_hex, Ay = s.language_from_hex, Iy = s.language_to_json, Dy = s.language_to_js_value, Ty = s.language_from_json, Ny = s.language_new_plutus_v1, Cy = s.language_new_plutus_v2, Vy = s.language_new_plutus_v3, Py = s.language_kind, By = s.__wbg_credential_free, tv = s.credential_from_keyhash, _v = s.credential_from_scripthash, ev = s.credential_to_keyhash, rv = s.credential_to_scripthash, nv = s.credential_has_script_hash, ov = s.credential_to_bytes, av = s.credential_from_bytes, sv = s.credential_to_hex, iv = s.credential_from_hex, dv = s.credential_to_json, cv = s.credential_to_js_value, pv = s.credential_from_json, wv = s.__wbg_vkeywitnesses_free, bv = s.vkeywitnesses_to_bytes, lv = s.vkeywitnesses_from_bytes, gv = s.vkeywitnesses_to_hex, uv = s.vkeywitnesses_from_hex, fv = s.vkeywitnesses_to_json, hv = s.vkeywitnesses_to_js_value, yv = s.vkeywitnesses_from_json, vv = s.vkeywitnesses_get, mv = s.vkeywitnesses_add, kv = s.__wbg_bootstrapwitnesses_free, xv = s.bootstrapwitnesses_to_bytes, jv = s.bootstrapwitnesses_from_bytes, zv = s.bootstrapwitnesses_to_hex, Fv = s.bootstrapwitnesses_from_hex, Rv = s.bootstrapwitnesses_to_json, Ov = s.bootstrapwitnesses_to_js_value, qv = s.bootstrapwitnesses_from_json, $v = s.bootstrapwitnesses_new, Lv = s.bootstrapwitnesses_len, Jv = s.bootstrapwitnesses_get, Yv = s.bootstrapwitnesses_add, Qv = s.__wbg_bip32privatekey_free, Xv = s.bip32privatekey_derive, Zv = s.bip32privatekey_from_128_xprv, Uv = s.bip32privatekey_to_128_xprv, Ev = s.bip32privatekey_generate_ed25519_bip32, Kv = s.bip32privatekey_to_raw_key, Sv = s.bip32privatekey_to_public, Wv = s.bip32privatekey_from_bytes, Mv = s.bip32privatekey_as_bytes, Gv = s.bip32privatekey_from_bech32, Hv = s.bip32privatekey_to_bech32, Av = s.bip32privatekey_from_bip39_entropy, Iv = s.bip32privatekey_chaincode, Dv = s.bip32privatekey_to_hex, Tv = s.bip32privatekey_from_hex, Nv = s.__wbg_voteregistrationanddelegation_free, Cv = s.votedelegation_stake_credential, Vv = s.stakedelegation_stake_credential, Pv = s.stakevoteregistrationanddelegation_coin, Bv = s.voteregistrationanddelegation_coin, tm = s.stakeregistrationanddelegation_coin, _m = s.voters_len, em = s.vkeywitnesses_len, rm = s.voteregistrationanddelegation_stake_credential, nm = s.vkeywitnesses_new, om = s.votedelegation_has_script_credentials, am = s.stakedelegation_has_script_credentials, sm = s.voteregistrationanddelegation_has_script_credentials, im = s.credential_kind, dm = s.votedelegation_drep, cm = s.__wbg_poolregistration_free, pm = s.stakevoteregistrationanddelegation_pool_keyhash, wm = s.__wbg_mintwitness_free, bm = s.mintwitness_new_native_script, lm = s.mintwitness_new_plutus_script, gm = s.__wbg_mintbuilder_free, um = s.mintbuilder_new, fm = s.mintbuilder_add_asset, hm = s.mintbuilder_set_asset, ym = s.mintbuilder_build, vm = s.mintbuilder_get_native_scripts, mm = s.mintbuilder_get_plutus_witnesses, km = s.mintbuilder_get_ref_inputs, xm = s.mintbuilder_get_redeemers, jm = s.mintbuilder_has_plutus_scripts, zm = s.mintbuilder_has_native_scripts, Fm = s.__wbg_plutusscriptsource_free, Rm = s.plutusscriptsource_new, Om = s.plutusscriptsource_new_ref_input, qm = s.plutusscriptsource_set_required_signers, $m = s.plutusscriptsource_get_ref_script_size, Lm = s.__wbg_nativescriptsource_free, Jm = s.nativescriptsource_new, Ym = s.nativescriptsource_new_ref_input, Qm = s.nativescriptsource_set_required_signers, Xm = s.nativescriptsource_get_ref_script_size, Zm = s.__wbg_datumsource_free, Um = s.datumsource_new, Em = s.datumsource_new_ref_input, Km = s.__wbg_transactionbatchlist_free, Sm = s.transactionbatchlist_get, Wm = s.__wbg_transactionbatch_free, Mm = s.transactionbatch_get, Gm = s.create_send_all, Hm = s.__wbg_votingproposalbuilder_free, Am = s.votingproposalbuilder_add, Im = s.votingproposalbuilder_add_with_plutus_witness, Dm = s.votingproposalbuilder_get_plutus_witnesses, Tm = s.votingproposalbuilder_get_ref_inputs, Nm = s.votingproposalbuilder_has_plutus_scripts, Cm = s.votingproposalbuilder_build, Vm = s.__wbg_withdrawalsbuilder_free, Pm = s.withdrawalsbuilder_new, Bm = s.withdrawalsbuilder_add, t1 = s.withdrawalsbuilder_add_with_plutus_witness, _1 = s.withdrawalsbuilder_add_with_native_script, e1 = s.withdrawalsbuilder_get_plutus_witnesses, r1 = s.withdrawalsbuilder_get_ref_inputs, n1 = s.withdrawalsbuilder_get_native_scripts, o1 = s.withdrawalsbuilder_get_total_withdrawals, a1 = s.withdrawalsbuilder_has_plutus_scripts, s1 = s.withdrawalsbuilder_build, i1 = s.__wbg_transactionoutputbuilder_free, d1 = s.transactionoutputbuilder_new, c1 = s.transactionoutputbuilder_with_address, p1 = s.transactionoutputbuilder_with_data_hash, w1 = s.transactionoutputbuilder_with_plutus_data, b1 = s.transactionoutputbuilder_with_script_ref, l1 = s.transactionoutputbuilder_next, g1 = s.__wbg_transactionoutputamountbuilder_free, u1 = s.transactionoutputamountbuilder_with_value, f1 = s.transactionoutputamountbuilder_with_coin, h1 = s.transactionoutputamountbuilder_with_coin_and_asset, y1 = s.transactionoutputamountbuilder_with_asset_and_min_required_coin_by_utxo_cost, v1 = s.transactionoutputamountbuilder_build, m1 = s.__wbg_governanceactionids_free, k1 = s.governanceactionids_to_json, x1 = s.governanceactionids_to_js_value, j1 = s.governanceactionids_from_json, z1 = s.governanceactionids_new, F1 = s.governanceactionids_add, R1 = s.governanceactionids_get, O1 = s.governanceactionids_len, q1 = s.__wbg_votingproposals_free, $1 = s.votingproposals_to_bytes, L1 = s.votingproposals_from_bytes, J1 = s.votingproposals_to_hex, Y1 = s.votingproposals_from_hex, Q1 = s.votingproposals_to_json, X1 = s.votingproposals_to_js_value, Z1 = s.votingproposals_from_json, U1 = s.votingproposals_get, E1 = s.votingproposals_add, K1 = s.votingproposals_contains, S1 = s.votingproposals_to_option, W1 = s.__wbg_plutusscripts_free, M1 = s.plutusscripts_to_bytes, G1 = s.plutusscripts_from_bytes, H1 = s.plutusscripts_to_hex, A1 = s.plutusscripts_from_hex, I1 = s.plutusscripts_to_json, D1 = s.plutusscripts_to_js_value, T1 = s.plutusscripts_from_json, N1 = s.plutusscripts_new, C1 = s.plutusscripts_get, V1 = s.plutusscripts_add, P1 = s.__wbg_transactioninputs_free, B1 = s.transactioninputs_to_bytes, tk = s.transactioninputs_from_bytes, _k = s.transactioninputs_to_hex, ek = s.transactioninputs_from_hex, rk = s.transactioninputs_to_json, nk = s.transactioninputs_to_js_value, ok = s.transactioninputs_from_json, ak = s.transactioninputs_new, sk = s.transactioninputs_get, ik = s.transactioninputs_add, dk = s.transactioninputs_to_option, ck = s.__wbg_credentials_free, pk = s.credentials_to_bytes, wk = s.credentials_from_bytes, bk = s.credentials_to_hex, lk = s.credentials_from_hex, gk = s.credentials_to_json, uk = s.credentials_to_js_value, fk = s.credentials_from_json, hk = s.credentials_new, yk = s.credentials_len, vk = s.credentials_get, mk = s.credentials_add, kk = s.__wbg_ed25519keyhashes_free, xk = s.ed25519keyhashes_to_bytes, jk = s.ed25519keyhashes_from_bytes, zk = s.ed25519keyhashes_to_hex, Fk = s.ed25519keyhashes_from_hex, Rk = s.ed25519keyhashes_to_json, Ok = s.ed25519keyhashes_to_js_value, qk = s.ed25519keyhashes_from_json, $k = s.ed25519keyhashes_get, Lk = s.ed25519keyhashes_add, Jk = s.ed25519keyhashes_contains, Yk = s.ed25519keyhashes_to_option, Qk = s.__wbg_transactionwitnesssets_free, Xk = s.transactionwitnesssets_to_bytes, Zk = s.transactionwitnesssets_from_bytes, Uk = s.transactionwitnesssets_to_hex, Ek = s.transactionwitnesssets_from_hex, Kk = s.transactionwitnesssets_to_json, Sk = s.transactionwitnesssets_to_js_value, Wk = s.transactionwitnesssets_from_json, Mk = s.transactionwitnesssets_new, Gk = s.transactionwitnesssets_get, Hk = s.transactionwitnesssets_add, Ak = s.__wbg_privatekey_free, Ik = s.__wbg_vkey_free, Dk = s.vkey_to_bytes, Tk = s.vkey_from_bytes, Nk = s.vkey_to_hex, Ck = s.vkey_from_hex, Vk = s.vkey_to_json, Pk = s.vkey_to_js_value, Bk = s.vkey_from_json, t0 = s.vkey_new, _0 = s.vkey_public_key, e0 = s.__wbg_publickeys_free, r0 = s.publickeys_new, n0 = s.publickeys_get, o0 = s.publickeys_add, a0 = s.privatekey_from_hex, s0 = s.privatekey_to_hex, i0 = s.privatekey_sign, d0 = s.privatekey_from_normal_bytes, c0 = s.privatekey_from_extended_bytes, p0 = s.privatekey_as_bytes, w0 = s.privatekey_to_bech32, b0 = s.privatekey_from_bech32, l0 = s.privatekey_generate_ed25519extended, g0 = s.privatekey_generate_ed25519, u0 = s.privatekey_to_public, f0 = s.transactionbatchlist_len, h0 = s.transactionbatch_len, y0 = s.votingproposals_len, v0 = s.transactioninputs_len, m0 = s.plutusscripts_len, k0 = s.ed25519keyhashes_len, x0 = s.transactionwitnesssets_len, j0 = s.publickeys_size, z0 = s.votingproposalbuilder_new, F0 = s.votingproposals_new, R0 = s.ed25519keyhashes_new, O0 = s.__wbg_plutuswitness_free, q0 = s.plutuswitness_new, $0 = s.plutuswitness_new_with_ref, L0 = s.plutuswitness_new_without_datum, J0 = s.plutuswitness_new_with_ref_without_datum, Y0 = s.plutuswitness_script, Q0 = s.plutuswitness_datum, X0 = s.plutuswitness_redeemer, Z0 = s.__wbg_drep_free, U0 = s.drep_to_bytes, E0 = s.drep_from_bytes, K0 = s.drep_to_hex, S0 = s.drep_from_hex, W0 = s.drep_to_json, M0 = s.drep_to_js_value, G0 = s.drep_from_json, H0 = s.drep_new_key_hash, A0 = s.drep_new_script_hash, I0 = s.drep_new_always_abstain, D0 = s.drep_new_always_no_confidence, T0 = s.drep_new_from_credential, N0 = s.drep_kind, C0 = s.drep_to_key_hash, V0 = s.drep_to_script_hash, P0 = s.drep_to_bech32, B0 = s.drep_from_bech32, t4 = s.__wbg_governanceaction_free, _4 = s.governanceaction_to_bytes, e4 = s.governanceaction_from_bytes, r4 = s.governanceaction_to_hex, n4 = s.governanceaction_from_hex, o4 = s.governanceaction_to_json, a4 = s.governanceaction_to_js_value, s4 = s.governanceaction_from_json, i4 = s.governanceaction_new_parameter_change_action, d4 = s.governanceaction_new_hard_fork_initiation_action, c4 = s.governanceaction_new_treasury_withdrawals_action, p4 = s.governanceaction_new_no_confidence_action, w4 = s.governanceaction_new_new_committee_action, b4 = s.governanceaction_new_new_constitution_action, l4 = s.governanceaction_new_info_action, g4 = s.governanceaction_kind, u4 = s.governanceaction_as_parameter_change_action, f4 = s.governanceaction_as_hard_fork_initiation_action, h4 = s.governanceaction_as_treasury_withdrawals_action, y4 = s.governanceaction_as_no_confidence_action, v4 = s.governanceaction_as_new_committee_action, m4 = s.governanceaction_as_new_constitution_action, k4 = s.governanceaction_as_info_action, x4 = s.__wbg_networkinfo_free, j4 = s.networkinfo_new, z4 = s.networkinfo_network_id, F4 = s.networkinfo_protocol_magic, R4 = s.networkinfo_testnet_preview, O4 = s.networkinfo_testnet_preprod, q4 = s.networkinfo_mainnet, $4 = s.__wbg_malformedaddress_free, L4 = s.malformedaddress_original_bytes, J4 = s.malformedaddress_to_address, Y4 = s.malformedaddress_from_address, Q4 = s.__wbg_byronaddress_free, X4 = s.byronaddress_to_base58, Z4 = s.byronaddress_to_bytes, U4 = s.byronaddress_from_bytes, E4 = s.byronaddress_byron_protocol_magic, K4 = s.byronaddress_byron_address_kind, S4 = s.byronaddress_attributes, W4 = s.byronaddress_network_id, M4 = s.byronaddress_from_base58, G4 = s.byronaddress_icarus_from_key, H4 = s.byronaddress_is_valid, A4 = s.byronaddress_to_address, I4 = s.byronaddress_from_address, D4 = s.__wbg_address_free, T4 = s.address_from_bytes, N4 = s.address_to_json, C4 = s.address_to_js_value, V4 = s.address_from_json, P4 = s.address_kind, B4 = s.address_payment_cred, t6 = s.address_is_malformed, _6 = s.address_to_hex, e6 = s.address_from_hex, r6 = s.address_to_bytes, n6 = s.address_to_bech32, o6 = s.address_from_bech32, a6 = s.address_network_id, s6 = s.__wbg_baseaddress_free, i6 = s.baseaddress_new, d6 = s.baseaddress_payment_cred, c6 = s.baseaddress_stake_cred, p6 = s.baseaddress_to_address, w6 = s.baseaddress_from_address, b6 = s.baseaddress_network_id, l6 = s.__wbg_enterpriseaddress_free, g6 = s.enterpriseaddress_new, u6 = s.enterpriseaddress_to_address, f6 = s.enterpriseaddress_from_address, h6 = s.enterpriseaddress_network_id, y6 = s.rewardaddress_to_address, v6 = s.rewardaddress_from_address, m6 = s.__wbg_pointer_free, k6 = s.pointer_new, x6 = s.pointer_new_pointer, j6 = s.pointer_slot, z6 = s.pointer_tx_index, F6 = s.pointer_cert_index, R6 = s.pointer_slot_bignum, O6 = s.pointer_tx_index_bignum, q6 = s.pointer_cert_index_bignum, $6 = s.__wbg_pointeraddress_free, L6 = s.pointeraddress_new, J6 = s.pointeraddress_payment_cred, Y6 = s.pointeraddress_stake_pointer, Q6 = s.pointeraddress_to_address, X6 = s.pointeraddress_from_address, Z6 = s.pointeraddress_network_id, U6 = s.__wbg_int_free, E6 = s.int_to_bytes, K6 = s.int_from_bytes, S6 = s.int_to_hex, W6 = s.int_from_hex, M6 = s.int_to_json, G6 = s.int_to_js_value, H6 = s.int_from_json, A6 = s.int_new, I6 = s.int_new_negative, D6 = s.int_new_i32, T6 = s.int_is_positive, N6 = s.int_as_positive, C6 = s.int_as_negative, V6 = s.int_as_i32, P6 = s.int_as_i32_or_nothing, B6 = s.int_as_i32_or_fail, tx = s.int_to_str, _x = s.int_from_str, ex = s.__wbg_rewardaddress_free, rx = s.enterpriseaddress_payment_cred, nx = s.rewardaddress_payment_cred, ox = s.rewardaddress_new, ax = s.rewardaddress_network_id, sx = s.__wbg_linearfee_free, ix = s.linearfee_constant, dx = s.linearfee_coefficient, cx = s.linearfee_new, px = s.min_fee, wx = s.calculate_ex_units_ceil_cost, bx = s.min_script_fee, lx = s.min_ref_script_fee, gx = s.__wbg_parameterchangeaction_free, ux = s.parameterchangeaction_to_bytes, fx = s.parameterchangeaction_from_bytes, hx = s.parameterchangeaction_to_hex, yx = s.parameterchangeaction_from_hex, vx = s.parameterchangeaction_to_json, mx = s.parameterchangeaction_to_js_value, kx = s.parameterchangeaction_from_json, xx = s.parameterchangeaction_gov_action_id, jx = s.parameterchangeaction_protocol_param_updates, zx = s.parameterchangeaction_policy_hash, Fx = s.parameterchangeaction_new, Rx = s.parameterchangeaction_new_with_action_id, Ox = s.parameterchangeaction_new_with_policy_hash, qx = s.parameterchangeaction_new_with_policy_hash_and_action_id, $x = s.__wbg_hardforkinitiationaction_free, Lx = s.hardforkinitiationaction_to_bytes, Jx = s.hardforkinitiationaction_from_bytes, Yx = s.hardforkinitiationaction_to_hex, Qx = s.hardforkinitiationaction_from_hex, Xx = s.hardforkinitiationaction_to_json, Zx = s.hardforkinitiationaction_to_js_value, Ux = s.hardforkinitiationaction_from_json, Ex = s.hardforkinitiationaction_gov_action_id, Kx = s.hardforkinitiationaction_protocol_version, Sx = s.hardforkinitiationaction_new, Wx = s.hardforkinitiationaction_new_with_action_id, Mx = s.__wbg_treasurywithdrawalsaction_free, Gx = s.treasurywithdrawalsaction_to_bytes, Hx = s.treasurywithdrawalsaction_from_bytes, Ax = s.treasurywithdrawalsaction_to_hex, Ix = s.treasurywithdrawalsaction_from_hex, Dx = s.treasurywithdrawalsaction_to_json, Tx = s.treasurywithdrawalsaction_to_js_value, Nx = s.treasurywithdrawalsaction_from_json, Cx = s.treasurywithdrawalsaction_withdrawals, Vx = s.treasurywithdrawalsaction_policy_hash, Px = s.treasurywithdrawalsaction_new, Bx = s.treasurywithdrawalsaction_new_with_policy_hash, tj = s.__wbg_noconfidenceaction_free, _j = s.noconfidenceaction_to_bytes, ej = s.noconfidenceaction_from_bytes, rj = s.noconfidenceaction_to_hex, nj = s.noconfidenceaction_from_hex, oj = s.noconfidenceaction_to_json, aj = s.noconfidenceaction_to_js_value, sj = s.noconfidenceaction_from_json, ij = s.noconfidenceaction_new, dj = s.noconfidenceaction_new_with_action_id, cj = s.__wbg_updatecommitteeaction_free, pj = s.updatecommitteeaction_to_bytes, wj = s.updatecommitteeaction_from_bytes, bj = s.updatecommitteeaction_to_hex, lj = s.updatecommitteeaction_from_hex, gj = s.updatecommitteeaction_to_json, uj = s.updatecommitteeaction_to_js_value, fj = s.updatecommitteeaction_from_json, hj = s.updatecommitteeaction_gov_action_id, yj = s.updatecommitteeaction_committee, vj = s.updatecommitteeaction_members_to_remove, mj = s.updatecommitteeaction_new, kj = s.updatecommitteeaction_new_with_action_id, xj = s.__wbg_constitution_free, jj = s.constitution_to_bytes, zj = s.constitution_from_bytes, Fj = s.constitution_to_hex, Rj = s.constitution_from_hex, Oj = s.constitution_to_json, qj = s.constitution_to_js_value, $j = s.constitution_from_json, Lj = s.constitution_anchor, Jj = s.constitution_script_hash, Yj = s.constitution_new, Qj = s.constitution_new_with_script_hash, Xj = s.__wbg_newconstitutionaction_free, Zj = s.newconstitutionaction_to_bytes, Uj = s.newconstitutionaction_from_bytes, Ej = s.newconstitutionaction_to_hex, Kj = s.newconstitutionaction_from_hex, Sj = s.newconstitutionaction_to_json, Wj = s.newconstitutionaction_to_js_value, Mj = s.newconstitutionaction_from_json, Gj = s.newconstitutionaction_constitution, Hj = s.newconstitutionaction_new, Aj = s.newconstitutionaction_new_with_action_id, Ij = s.newconstitutionaction_has_script_hash, Dj = s.__wbg_votingproposal_free, Tj = s.votingproposal_to_bytes, Nj = s.votingproposal_from_bytes, Cj = s.votingproposal_to_hex, Vj = s.votingproposal_from_hex, Pj = s.votingproposal_to_json, Bj = s.votingproposal_to_js_value, t2 = s.votingproposal_from_json, _2 = s.votingproposal_governance_action, e2 = s.votingproposal_anchor, r2 = s.votingproposal_reward_account, n2 = s.votingproposal_deposit, o2 = s.votingproposal_new, a2 = s.__wbg_languages_free, s2 = s.languages_new, i2 = s.languages_len, d2 = s.languages_get, c2 = s.languages_add, p2 = s.languages_list, w2 = s.__wbg_constrplutusdata_free, b2 = s.constrplutusdata_to_bytes, l2 = s.constrplutusdata_from_bytes, g2 = s.constrplutusdata_to_hex, u2 = s.constrplutusdata_from_hex, f2 = s.constrplutusdata_alternative, h2 = s.constrplutusdata_data, y2 = s.constrplutusdata_new, v2 = s.__wbg_plutusmapvalues_free, m2 = s.plutusmapvalues_get, k2 = s.plutusmapvalues_add, x2 = s.__wbg_plutusmap_free, j2 = s.plutusmap_to_bytes, z2 = s.plutusmap_from_bytes, F2 = s.plutusmap_to_hex, R2 = s.plutusmap_from_hex, O2 = s.plutusmap_insert, q2 = s.plutusmap_get, $2 = s.plutusmap_keys, L2 = s.__wbg_plutusdata_free, J2 = s.plutusdata_to_bytes, Y2 = s.plutusdata_from_bytes, Q2 = s.plutusdata_to_hex, X2 = s.plutusdata_from_hex, Z2 = s.plutusdata_new_constr_plutus_data, U2 = s.plutusdata_new_empty_constr_plutus_data, E2 = s.plutusdata_new_single_value_constr_plutus_data, K2 = s.plutusdata_new_map, S2 = s.plutusdata_new_list, W2 = s.plutusdata_new_integer, M2 = s.plutusdata_new_bytes, G2 = s.plutusdata_kind, H2 = s.plutusdata_as_constr_plutus_data, A2 = s.plutusdata_as_map, I2 = s.plutusdata_as_list, D2 = s.plutusdata_as_integer, T2 = s.plutusdata_as_bytes, N2 = s.plutusdata_from_address, C2 = s.plutusdata_as_address, V2 = s.__wbg_plutuslist_free, P2 = s.plutuslist_to_bytes, B2 = s.plutuslist_from_bytes, tz = s.plutuslist_to_hex, _z = s.plutuslist_from_hex, ez = s.plutuslist_new, rz = s.plutuslist_get, nz = s.plutuslist_add, oz = s.encode_json_str_to_plutus_datum, az = s.decode_plutus_datum_to_json_str, sz = s.__wbg_metadatamap_free, iz = s.metadatamap_to_bytes, dz = s.metadatamap_from_bytes, cz = s.metadatamap_to_hex, pz = s.metadatamap_from_hex, wz = s.metadatamap_insert, bz = s.metadatamap_insert_str, lz = s.metadatamap_insert_i32, gz = s.metadatamap_get, uz = s.metadatamap_get_str, fz = s.metadatamap_get_i32, hz = s.metadatamap_has, yz = s.metadatamap_keys, vz = s.__wbg_metadatalist_free, mz = s.metadatalist_to_bytes, kz = s.metadatalist_from_bytes, xz = s.metadatalist_to_hex, jz = s.metadatalist_from_hex, zz = s.metadatalist_new, Fz = s.metadatalist_get, Rz = s.metadatalist_add, Oz = s.__wbg_transactionmetadatum_free, qz = s.transactionmetadatum_to_bytes, $z = s.transactionmetadatum_from_bytes, Lz = s.transactionmetadatum_to_hex, Jz = s.transactionmetadatum_from_hex, Yz = s.transactionmetadatum_new_map, Qz = s.transactionmetadatum_new_list, Xz = s.transactionmetadatum_new_int, Zz = s.transactionmetadatum_new_bytes, Uz = s.transactionmetadatum_new_text, Ez = s.transactionmetadatum_as_map, Kz = s.transactionmetadatum_as_list, Sz = s.transactionmetadatum_as_int, Wz = s.transactionmetadatum_as_bytes, Mz = s.transactionmetadatum_as_text, Gz = s.__wbg_transactionmetadatumlabels_free, Hz = s.transactionmetadatumlabels_to_bytes, Az = s.transactionmetadatumlabels_from_bytes, Iz = s.transactionmetadatumlabels_to_hex, Dz = s.transactionmetadatumlabels_from_hex, Tz = s.transactionmetadatumlabels_get, Nz = s.transactionmetadatumlabels_add, Cz = s.__wbg_generaltransactionmetadata_free, Vz = s.generaltransactionmetadata_to_bytes, Pz = s.generaltransactionmetadata_from_bytes, Bz = s.generaltransactionmetadata_to_hex, tF = s.generaltransactionmetadata_from_hex, _F = s.generaltransactionmetadata_to_json, eF = s.generaltransactionmetadata_to_js_value, rF = s.generaltransactionmetadata_from_json, nF = s.generaltransactionmetadata_new, oF = s.generaltransactionmetadata_len, aF = s.generaltransactionmetadata_insert, sF = s.generaltransactionmetadata_get, iF = s.generaltransactionmetadata_keys, dF = s.__wbg_auxiliarydata_free, cF = s.auxiliarydata_to_bytes, pF = s.auxiliarydata_from_bytes, wF = s.auxiliarydata_to_hex, bF = s.auxiliarydata_from_hex, lF = s.auxiliarydata_to_json, gF = s.auxiliarydata_to_js_value, uF = s.auxiliarydata_from_json, fF = s.auxiliarydata_new, hF = s.auxiliarydata_metadata, yF = s.auxiliarydata_set_metadata, vF = s.auxiliarydata_native_scripts, mF = s.auxiliarydata_set_native_scripts, kF = s.auxiliarydata_plutus_scripts, xF = s.auxiliarydata_set_plutus_scripts, jF = s.auxiliarydata_prefer_alonzo_format, zF = s.auxiliarydata_set_prefer_alonzo_format, FF = s.encode_arbitrary_bytes_as_metadatum, RF = s.decode_arbitrary_bytes_from_metadatum, OF = s.encode_json_str_to_metadatum, qF = s.decode_metadatum_to_json_str, $F = s.__wbg_transactionbody_free, LF = s.transactionbody_to_bytes, JF = s.transactionbody_from_bytes, YF = s.transactionbody_to_hex, QF = s.transactionbody_from_hex, XF = s.transactionbody_to_json, ZF = s.transactionbody_to_js_value, UF = s.transactionbody_from_json, EF = s.transactionbody_inputs, KF = s.transactionbody_outputs, SF = s.transactionbody_fee, WF = s.transactionbody_ttl, MF = s.transactionbody_ttl_bignum, GF = s.transactionbody_set_ttl, HF = s.transactionbody_remove_ttl, AF = s.transactionbody_set_certs, IF = s.transactionbody_certs, DF = s.transactionbody_set_withdrawals, TF = s.transactionbody_withdrawals, NF = s.transactionbody_set_update, CF = s.transactionbody_update, VF = s.transactionbody_set_auxiliary_data_hash, PF = s.transactionbody_auxiliary_data_hash, BF = s.transactionbody_set_validity_start_interval, t3 = s.transactionbody_set_validity_start_interval_bignum, _3 = s.transactionbody_validity_start_interval_bignum, e3 = s.transactionbody_validity_start_interval, r3 = s.transactionbody_set_mint, n3 = s.transactionbody_mint, o3 = s.transactionbody_set_reference_inputs, a3 = s.transactionbody_reference_inputs, s3 = s.transactionbody_set_script_data_hash, i3 = s.transactionbody_script_data_hash, d3 = s.transactionbody_set_collateral, c3 = s.transactionbody_collateral, p3 = s.transactionbody_set_required_signers, w3 = s.transactionbody_required_signers, b3 = s.transactionbody_set_network_id, l3 = s.transactionbody_network_id, g3 = s.transactionbody_set_collateral_return, u3 = s.transactionbody_collateral_return, f3 = s.transactionbody_set_total_collateral, h3 = s.transactionbody_total_collateral, y3 = s.transactionbody_set_voting_procedures, v3 = s.transactionbody_voting_procedures, m3 = s.transactionbody_set_voting_proposals, k3 = s.transactionbody_voting_proposals, x3 = s.transactionbody_set_donation, j3 = s.transactionbody_donation, z3 = s.transactionbody_set_current_treasury_value, F3 = s.transactionbody_current_treasury_value, R3 = s.transactionbody_new, O3 = s.transactionbody_new_tx_body, q3 = s.__wbg_transactionwitnessset_free, $3 = s.transactionwitnessset_to_bytes, L3 = s.transactionwitnessset_from_bytes, J3 = s.transactionwitnessset_to_hex, Y3 = s.transactionwitnessset_from_hex, Q3 = s.transactionwitnessset_to_json, X3 = s.transactionwitnessset_to_js_value, Z3 = s.transactionwitnessset_from_json, U3 = s.transactionwitnessset_set_vkeys, E3 = s.transactionwitnessset_vkeys, K3 = s.transactionwitnessset_set_native_scripts, S3 = s.transactionwitnessset_set_bootstraps, W3 = s.transactionwitnessset_bootstraps, M3 = s.transactionwitnessset_set_plutus_scripts, G3 = s.transactionwitnessset_plutus_scripts, H3 = s.transactionwitnessset_set_plutus_data, A3 = s.transactionwitnessset_plutus_data, I3 = s.transactionwitnessset_set_redeemers, D3 = s.transactionwitnessset_redeemers, T3 = s.transactionwitnessset_new, N3 = s.__wbg_bigint_free, C3 = s.bigint_to_bytes, V3 = s.bigint_from_bytes, P3 = s.bigint_to_hex, B3 = s.bigint_from_hex, tR = s.bigint_to_json, _R = s.bigint_to_js_value, eR = s.bigint_from_json, rR = s.bigint_is_zero, nR = s.bigint_as_u64, oR = s.bigint_as_int, aR = s.bigint_from_str, sR = s.bigint_to_str, iR = s.bigint_add, dR = s.bigint_sub, cR = s.bigint_mul, pR = s.bigint_pow, wR = s.bigint_one, bR = s.bigint_zero, lR = s.bigint_abs, gR = s.bigint_increment, uR = s.bigint_div_ceil, fR = s.bigint_div_floor, hR = s.plutusdata_from_json, yR = s.plutusmapvalues_len, vR = s.plutuslist_len, mR = s.plutusmap_len, kR = s.metadatalist_len, xR = s.transactionmetadatum_kind, jR = s.transactionmetadatumlabels_len, zR = s.metadatamap_len, FR = s.plutusdata_to_json, RR = s.noconfidenceaction_gov_action_id, OR = s.newconstitutionaction_gov_action_id, qR = s.transactionwitnessset_native_scripts, $R = s.plutusmap_new, LR = s.metadatamap_new, JR = s.plutusmapvalues_new, YR = s.transactionmetadatumlabels_new, QR = s.__wbg_certificatesbuilder_free, XR = s.certificatesbuilder_new, ZR = s.certificatesbuilder_add, UR = s.certificatesbuilder_add_with_plutus_witness, ER = s.certificatesbuilder_add_with_native_script, KR = s.certificatesbuilder_get_plutus_witnesses, SR = s.certificatesbuilder_get_ref_inputs, WR = s.certificatesbuilder_get_native_scripts, MR = s.certificatesbuilder_get_certificates_refund, GR = s.certificatesbuilder_get_certificates_deposit, HR = s.certificatesbuilder_has_plutus_scripts, AR = s.certificatesbuilder_build, IR = s.__wbg_votingbuilder_free, DR = s.votingbuilder_new, TR = s.votingbuilder_add, NR = s.votingbuilder_add_with_plutus_witness, CR = s.votingbuilder_add_with_native_script, VR = s.votingbuilder_get_plutus_witnesses, PR = s.votingbuilder_get_ref_inputs, BR = s.votingbuilder_get_native_scripts, t5 = s.votingbuilder_has_plutus_scripts, _5 = s.votingbuilder_build, e5 = s.encrypt_with_password, r5 = s.decrypt_with_password, n5 = s.__wbg_certificate_free, o5 = s.certificate_to_bytes, a5 = s.certificate_from_bytes, s5 = s.certificate_to_hex, i5 = s.certificate_from_hex, d5 = s.certificate_to_json, c5 = s.certificate_to_js_value, p5 = s.certificate_from_json, w5 = s.certificate_new_stake_registration, b5 = s.certificate_new_reg_cert, l5 = s.certificate_new_stake_deregistration, g5 = s.certificate_new_unreg_cert, u5 = s.certificate_new_stake_delegation, f5 = s.certificate_new_pool_registration, h5 = s.certificate_new_pool_retirement, y5 = s.certificate_new_genesis_key_delegation, v5 = s.certificate_new_move_instantaneous_rewards_cert, m5 = s.certificate_new_committee_hot_auth, k5 = s.certificate_new_committee_cold_resign, x5 = s.certificate_new_drep_deregistration, j5 = s.certificate_new_drep_registration, z5 = s.certificate_new_drep_update, F5 = s.certificate_new_stake_and_vote_delegation, R5 = s.certificate_new_stake_registration_and_delegation, O5 = s.certificate_new_stake_vote_registration_and_delegation, q5 = s.certificate_new_vote_delegation, $5 = s.certificate_new_vote_registration_and_delegation, L5 = s.certificate_kind, J5 = s.certificate_as_stake_registration, Y5 = s.certificate_as_reg_cert, Q5 = s.certificate_as_stake_deregistration, X5 = s.certificate_as_unreg_cert, Z5 = s.certificate_as_stake_delegation, U5 = s.certificate_as_pool_registration, E5 = s.certificate_as_pool_retirement, K5 = s.certificate_as_genesis_key_delegation, S5 = s.certificate_as_move_instantaneous_rewards_cert, W5 = s.certificate_as_committee_hot_auth, M5 = s.certificate_as_committee_cold_resign, G5 = s.certificate_as_drep_deregistration, H5 = s.certificate_as_drep_registration, A5 = s.certificate_as_drep_update, I5 = s.certificate_as_stake_and_vote_delegation, D5 = s.certificate_as_stake_registration_and_delegation, T5 = s.certificate_as_stake_vote_registration_and_delegation, N5 = s.certificate_as_vote_delegation, C5 = s.certificate_as_vote_registration_and_delegation, V5 = s.certificate_has_required_script_witness, P5 = s.__wbg_stakeregistration_free, B5 = s.stakeregistration_to_bytes, tO = s.stakeregistration_from_bytes, _O = s.stakeregistration_to_hex, eO = s.stakeregistration_from_hex, rO = s.stakeregistration_to_json, nO = s.stakeregistration_to_js_value, oO = s.stakeregistration_from_json, aO = s.stakeregistration_stake_credential, sO = s.stakeregistration_coin, iO = s.stakeregistration_new, dO = s.stakeregistration_new_with_explicit_deposit, cO = s.stakeregistration_has_script_credentials, pO = s.__wbg_redeemertag_free, wO = s.redeemertag_to_bytes, bO = s.redeemertag_from_bytes, lO = s.redeemertag_to_hex, gO = s.redeemertag_from_hex, uO = s.redeemertag_to_json, fO = s.redeemertag_to_js_value, hO = s.redeemertag_from_json, yO = s.redeemertag_new_spend, vO = s.redeemertag_new_mint, mO = s.redeemertag_new_cert, kO = s.redeemertag_new_reward, xO = s.redeemertag_new_vote, jO = s.redeemertag_new_voting_proposal, zO = s.redeemertag_kind, FO = s.__wbg_bip32publickey_free, RO = s.__wbg_scriptref_free, OO = s.scriptref_to_bytes, qO = s.scriptref_from_bytes, $O = s.scriptref_to_hex, LO = s.scriptref_from_hex, JO = s.scriptref_to_json, YO = s.scriptref_to_js_value, QO = s.scriptref_from_json, XO = s.scriptref_new_native_script, ZO = s.scriptref_new_plutus_script, UO = s.scriptref_is_native_script, EO = s.scriptref_is_plutus_script, KO = s.scriptref_native_script, SO = s.scriptref_plutus_script, WO = s.scriptref_to_unwrapped_bytes, MO = s.bip32publickey_from_hex, GO = s.bip32publickey_to_hex, HO = s.bip32publickey_chaincode, AO = s.bip32publickey_to_bech32, IO = s.bip32publickey_from_bech32, DO = s.bip32publickey_as_bytes, TO = s.bip32publickey_from_bytes, NO = s.bip32publickey_to_raw_key, CO = s.bip32publickey_derive, VO = s.__wbg_exunitprices_free, PO = s.exunitprices_to_bytes, BO = s.exunitprices_from_bytes, t9 = s.exunitprices_to_hex, _9 = s.exunitprices_from_hex, e9 = s.exunitprices_to_json, r9 = s.exunitprices_to_js_value, n9 = s.exunitprices_from_json, o9 = s.exunitprices_new, a9 = s.__wbg_exunits_free, s9 = s.exunits_to_bytes, i9 = s.exunits_from_bytes, d9 = s.exunits_to_hex, c9 = s.exunits_from_hex, p9 = s.exunits_to_json, w9 = s.exunits_to_js_value, b9 = s.exunits_from_json, l9 = s.exunits_mem, g9 = s.exunits_steps, u9 = s.exunits_new, f9 = s.__wbg_redeemer_free, h9 = s.redeemer_to_bytes, y9 = s.redeemer_from_bytes, v9 = s.redeemer_to_hex, m9 = s.redeemer_from_hex, k9 = s.redeemer_to_json, x9 = s.redeemer_to_js_value, j9 = s.redeemer_from_json, z9 = s.redeemer_tag, F9 = s.redeemer_index, R9 = s.redeemer_data, O9 = s.redeemer_ex_units, q9 = s.redeemer_new, $9 = s.__wbg_poolvotingthresholds_free, L9 = s.poolvotingthresholds_to_bytes, J9 = s.poolvotingthresholds_from_bytes, Y9 = s.poolvotingthresholds_to_hex, Q9 = s.poolvotingthresholds_from_hex, X9 = s.poolvotingthresholds_to_json, Z9 = s.poolvotingthresholds_to_js_value, U9 = s.poolvotingthresholds_from_json, E9 = s.poolvotingthresholds_new, K9 = s.__wbg_drepvotingthresholds_free, S9 = s.drepvotingthresholds_to_bytes, W9 = s.drepvotingthresholds_from_bytes, M9 = s.drepvotingthresholds_to_hex, G9 = s.drepvotingthresholds_from_hex, H9 = s.drepvotingthresholds_to_json, A9 = s.drepvotingthresholds_to_js_value, I9 = s.drepvotingthresholds_from_json, D9 = s.drepvotingthresholds_new, T9 = s.drepvotingthresholds_set_motion_no_confidence, N9 = s.drepvotingthresholds_set_committee_normal, C9 = s.drepvotingthresholds_set_committee_no_confidence, V9 = s.drepvotingthresholds_set_update_constitution, P9 = s.drepvotingthresholds_set_hard_fork_initiation, B9 = s.drepvotingthresholds_set_pp_network_group, t8 = s.drepvotingthresholds_set_pp_economic_group, _8 = s.drepvotingthresholds_set_pp_technical_group, e8 = s.drepvotingthresholds_set_pp_governance_group, r8 = s.drepvotingthresholds_set_treasury_withdrawal, n8 = s.drepvotingthresholds_motion_no_confidence, o8 = s.drepvotingthresholds_committee_normal, a8 = s.drepvotingthresholds_committee_no_confidence, s8 = s.drepvotingthresholds_update_constitution, i8 = s.drepvotingthresholds_hard_fork_initiation, d8 = s.drepvotingthresholds_pp_network_group, c8 = s.drepvotingthresholds_pp_economic_group, p8 = s.drepvotingthresholds_pp_technical_group, w8 = s.drepvotingthresholds_pp_governance_group, b8 = s.drepvotingthresholds_treasury_withdrawal, l8 = s.__wbg_protocolparamupdate_free, g8 = s.protocolparamupdate_to_bytes, u8 = s.protocolparamupdate_from_bytes, f8 = s.protocolparamupdate_to_hex, h8 = s.protocolparamupdate_from_hex, y8 = s.protocolparamupdate_to_json, v8 = s.protocolparamupdate_to_js_value, m8 = s.protocolparamupdate_from_json, k8 = s.protocolparamupdate_set_minfee_a, x8 = s.protocolparamupdate_minfee_a, j8 = s.protocolparamupdate_set_minfee_b, z8 = s.protocolparamupdate_minfee_b, F8 = s.protocolparamupdate_set_max_block_body_size, R8 = s.protocolparamupdate_max_block_body_size, O8 = s.protocolparamupdate_set_max_tx_size, q8 = s.protocolparamupdate_max_tx_size, $8 = s.protocolparamupdate_set_max_block_header_size, L8 = s.protocolparamupdate_max_block_header_size, J8 = s.protocolparamupdate_set_key_deposit, Y8 = s.protocolparamupdate_key_deposit, Q8 = s.protocolparamupdate_set_pool_deposit, X8 = s.protocolparamupdate_pool_deposit, Z8 = s.protocolparamupdate_set_max_epoch, U8 = s.protocolparamupdate_max_epoch, E8 = s.protocolparamupdate_set_n_opt, K8 = s.protocolparamupdate_n_opt, S8 = s.protocolparamupdate_set_pool_pledge_influence, W8 = s.protocolparamupdate_pool_pledge_influence, M8 = s.protocolparamupdate_set_expansion_rate, G8 = s.protocolparamupdate_expansion_rate, H8 = s.protocolparamupdate_set_treasury_growth_rate, A8 = s.protocolparamupdate_treasury_growth_rate, I8 = s.protocolparamupdate_d, D8 = s.protocolparamupdate_extra_entropy, T8 = s.protocolparamupdate_set_protocol_version, N8 = s.protocolparamupdate_protocol_version, C8 = s.protocolparamupdate_set_min_pool_cost, V8 = s.protocolparamupdate_min_pool_cost, P8 = s.protocolparamupdate_set_ada_per_utxo_byte, B8 = s.protocolparamupdate_ada_per_utxo_byte, t7 = s.protocolparamupdate_set_cost_models, _7 = s.protocolparamupdate_cost_models, e7 = s.protocolparamupdate_set_execution_costs, r7 = s.protocolparamupdate_execution_costs, n7 = s.protocolparamupdate_set_max_tx_ex_units, o7 = s.protocolparamupdate_max_tx_ex_units, a7 = s.protocolparamupdate_set_max_block_ex_units, s7 = s.protocolparamupdate_max_block_ex_units, i7 = s.protocolparamupdate_set_max_value_size, d7 = s.protocolparamupdate_max_value_size, c7 = s.protocolparamupdate_set_collateral_percentage, p7 = s.protocolparamupdate_collateral_percentage, w7 = s.protocolparamupdate_set_max_collateral_inputs, b7 = s.protocolparamupdate_max_collateral_inputs, l7 = s.protocolparamupdate_set_pool_voting_thresholds, g7 = s.protocolparamupdate_pool_voting_thresholds, u7 = s.protocolparamupdate_set_drep_voting_thresholds, f7 = s.protocolparamupdate_drep_voting_thresholds, h7 = s.protocolparamupdate_set_min_committee_size, y7 = s.protocolparamupdate_min_committee_size, v7 = s.protocolparamupdate_set_committee_term_limit, m7 = s.protocolparamupdate_committee_term_limit, k7 = s.protocolparamupdate_set_governance_action_validity_period, x7 = s.protocolparamupdate_governance_action_validity_period, j7 = s.protocolparamupdate_set_governance_action_deposit, z7 = s.protocolparamupdate_governance_action_deposit, F7 = s.protocolparamupdate_set_drep_deposit, R7 = s.protocolparamupdate_drep_deposit, O7 = s.protocolparamupdate_set_drep_inactivity_period, q7 = s.protocolparamupdate_drep_inactivity_period, $7 = s.protocolparamupdate_set_ref_script_coins_per_byte, L7 = s.protocolparamupdate_ref_script_coins_per_byte, J7 = s.protocolparamupdate_new, Y7 = s.__wbg_vrfcert_free, Q7 = s.vrfcert_to_bytes, X7 = s.vrfcert_from_bytes, Z7 = s.vrfcert_to_hex, U7 = s.vrfcert_from_hex, E7 = s.vrfcert_to_json, K7 = s.vrfcert_to_js_value, S7 = s.vrfcert_from_json, W7 = s.vrfcert_output, M7 = s.vrfcert_proof, G7 = s.vrfcert_new, H7 = s.__wbg_fixedblock_free, A7 = s.fixedblock_from_bytes, I7 = s.fixedblock_from_hex, D7 = s.fixedblock_header, T7 = s.fixedblock_transaction_bodies, N7 = s.fixedblock_transaction_witness_sets, C7 = s.fixedblock_auxiliary_data_set, V7 = s.fixedblock_invalid_transactions, P7 = s.fixedblock_block_hash, B7 = s.__wbg_fixedversionedblock_free, tq = s.fixedversionedblock_from_bytes, _q = s.fixedversionedblock_from_hex, eq = s.fixedversionedblock_block, rq = s.fixedversionedblock_era, nq = s.__wbg_versionedblock_free, oq = s.versionedblock_to_bytes, aq = s.versionedblock_from_bytes, sq = s.versionedblock_to_hex, iq = s.versionedblock_from_hex, dq = s.versionedblock_to_json, cq = s.versionedblock_to_js_value, pq = s.versionedblock_from_json, wq = s.versionedblock_new, bq = s.versionedblock_block, lq = s.versionedblock_era, gq = s.__wbg_transactionunspentoutput_free, uq = s.transactionunspentoutput_to_bytes, fq = s.transactionunspentoutput_from_bytes, hq = s.transactionunspentoutput_to_hex, yq = s.transactionunspentoutput_from_hex, vq = s.transactionunspentoutput_to_json, mq = s.transactionunspentoutput_to_js_value, kq = s.transactionunspentoutput_from_json, xq = s.transactionunspentoutput_new, jq = s.transactionunspentoutput_input, zq = s.transactionunspentoutput_output, Fq = s.__wbg_transactionunspentoutputs_free, Rq = s.transactionunspentoutputs_to_json, Oq = s.transactionunspentoutputs_to_js_value, qq = s.transactionunspentoutputs_from_json, $q = s.transactionunspentoutputs_new, Lq = s.transactionunspentoutputs_len, Jq = s.transactionunspentoutputs_get, Yq = s.transactionunspentoutputs_add, Qq = s.__wbg_value_free, Xq = s.value_to_bytes, Zq = s.value_from_bytes, Uq = s.value_to_hex, Eq = s.value_from_hex, Kq = s.value_to_json, Sq = s.value_to_js_value, Wq = s.value_from_json, Mq = s.value_new, Gq = s.value_new_from_assets, Hq = s.value_new_with_assets, Aq = s.value_zero, Iq = s.value_is_zero, Dq = s.value_coin, Tq = s.value_set_coin, Nq = s.value_multiasset, Cq = s.value_set_multiasset, Vq = s.value_checked_add, Pq = s.value_checked_sub, Bq = s.value_clamped_sub, t$ = s.value_compare, _$ = s.make_daedalus_bootstrap_witness, e$ = s.make_icarus_bootstrap_witness, r$ = s.make_vkey_witness, n$ = s.hash_auxiliary_data, o$ = s.hash_plutus_data, a$ = s.hash_script_data, s$ = s.get_implicit_input, i$ = s.get_deposit, d$ = s.min_ada_for_output, c$ = s.encode_json_str_to_native_script, p$ = s.has_transaction_set_tag, w$ = s.poolvotingthresholds_motion_no_confidence, b$ = s.poolvotingthresholds_committee_normal, l$ = s.exunitprices_mem_price, g$ = s.exunitprices_step_price, u$ = s.poolvotingthresholds_committee_no_confidence, f$ = s.poolvotingthresholds_hard_fork_initiation, h$ = s.poolvotingthresholds_security_relevant_threshold, y$ = s.__wbg_plutuswitnesses_free, v$ = s.plutuswitnesses_get, m$ = s.plutuswitnesses_add, k$ = s.__wbg_txinputsbuilder_free, x$ = s.txinputsbuilder_new, j$ = s.txinputsbuilder_add_regular_utxo, z$ = s.txinputsbuilder_add_plutus_script_utxo, F$ = s.txinputsbuilder_add_native_script_utxo, R$ = s.txinputsbuilder_add_key_input, O$ = s.txinputsbuilder_add_native_script_input, q$ = s.txinputsbuilder_add_plutus_script_input, $$ = s.txinputsbuilder_add_bootstrap_input, L$ = s.txinputsbuilder_add_regular_input, J$ = s.txinputsbuilder_get_ref_inputs, Y$ = s.txinputsbuilder_get_native_input_scripts, Q$ = s.txinputsbuilder_get_plutus_input_scripts, X$ = s.txinputsbuilder_len, Z$ = s.txinputsbuilder_add_required_signer, U$ = s.txinputsbuilder_add_required_signers, E$ = s.txinputsbuilder_total_value, K$ = s.txinputsbuilder_inputs, S$ = s.txinputsbuilder_inputs_option, W$ = s.__wbg_transactionbuilderconfig_free, M$ = s.__wbg_transactionbuilderconfigbuilder_free, G$ = s.transactionbuilderconfigbuilder_new, H$ = s.transactionbuilderconfigbuilder_fee_algo, A$ = s.transactionbuilderconfigbuilder_coins_per_utxo_byte, I$ = s.transactionbuilderconfigbuilder_ex_unit_prices, D$ = s.transactionbuilderconfigbuilder_pool_deposit, T$ = s.transactionbuilderconfigbuilder_key_deposit, N$ = s.transactionbuilderconfigbuilder_max_value_size, C$ = s.transactionbuilderconfigbuilder_max_tx_size, V$ = s.transactionbuilderconfigbuilder_ref_script_coins_per_byte, P$ = s.transactionbuilderconfigbuilder_prefer_pure_change, B$ = s.transactionbuilderconfigbuilder_deduplicate_explicit_ref_inputs_with_regular_inputs, tL = s.transactionbuilderconfigbuilder_do_not_burn_extra_change, _L = s.transactionbuilderconfigbuilder_build, eL = s.__wbg_changeconfig_free, rL = s.changeconfig_new, nL = s.changeconfig_change_address, oL = s.changeconfig_change_plutus_data, aL = s.changeconfig_change_script_ref, sL = s.__wbg_transactionbuilder_free, iL = s.transactionbuilder_add_inputs_from, dL = s.transactionbuilder_set_inputs, cL = s.transactionbuilder_set_collateral, pL = s.transactionbuilder_set_collateral_return, wL = s.transactionbuilder_remove_collateral_return, bL = s.transactionbuilder_set_collateral_return_and_total, lL = s.transactionbuilder_set_total_collateral, gL = s.transactionbuilder_remove_total_collateral, uL = s.transactionbuilder_set_total_collateral_and_return, fL = s.transactionbuilder_add_reference_input, hL = s.transactionbuilder_add_script_reference_input, yL = s.transactionbuilder_add_key_input, vL = s.transactionbuilder_add_native_script_input, mL = s.transactionbuilder_add_plutus_script_input, kL = s.transactionbuilder_add_bootstrap_input, xL = s.transactionbuilder_add_regular_input, jL = s.transactionbuilder_add_inputs_from_and_change, zL = s.transactionbuilder_add_inputs_from_and_change_with_collateral_return, FL = s.transactionbuilder_get_native_input_scripts, RL = s.transactionbuilder_get_plutus_input_scripts, OL = s.transactionbuilder_fee_for_input, qL = s.transactionbuilder_add_output, $L = s.transactionbuilder_fee_for_output, LL = s.transactionbuilder_set_fee, JL = s.transactionbuilder_set_min_fee, YL = s.transactionbuilder_set_ttl, QL = s.transactionbuilder_set_ttl_bignum, XL = s.transactionbuilder_remove_ttl, ZL = s.transactionbuilder_set_validity_start_interval, UL = s.transactionbuilder_set_validity_start_interval_bignum, EL = s.transactionbuilder_remove_validity_start_interval, KL = s.transactionbuilder_set_certs, SL = s.transactionbuilder_remove_certs, WL = s.transactionbuilder_set_certs_builder, ML = s.transactionbuilder_set_withdrawals, GL = s.transactionbuilder_set_withdrawals_builder, HL = s.transactionbuilder_set_voting_builder, AL = s.transactionbuilder_set_voting_proposal_builder, IL = s.transactionbuilder_remove_withdrawals, DL = s.transactionbuilder_get_auxiliary_data, TL = s.transactionbuilder_set_auxiliary_data, NL = s.transactionbuilder_remove_auxiliary_data, CL = s.transactionbuilder_set_metadata, VL = s.transactionbuilder_add_metadatum, PL = s.transactionbuilder_add_json_metadatum, BL = s.transactionbuilder_add_json_metadatum_with_schema, tJ = s.transactionbuilder_set_mint_builder, _J = s.transactionbuilder_remove_mint_builder, eJ = s.transactionbuilder_get_mint_builder, rJ = s.transactionbuilder_set_mint, nJ = s.transactionbuilder_get_mint, oJ = s.transactionbuilder_get_mint_scripts, aJ = s.transactionbuilder_set_mint_asset, sJ = s.transactionbuilder_add_mint_asset, iJ = s.transactionbuilder_add_mint_asset_and_output, dJ = s.transactionbuilder_add_mint_asset_and_output_min_required_coin, cJ = s.transactionbuilder_add_extra_witness_datum, pJ = s.transactionbuilder_get_extra_witness_datums, wJ = s.transactionbuilder_set_donation, bJ = s.transactionbuilder_get_donation, lJ = s.transactionbuilder_set_current_treasury_value, gJ = s.transactionbuilder_get_current_treasury_value, uJ = s.transactionbuilder_new, fJ = s.transactionbuilder_get_reference_inputs, hJ = s.transactionbuilder_get_explicit_input, yJ = s.transactionbuilder_get_implicit_input, vJ = s.transactionbuilder_get_total_input, mJ = s.transactionbuilder_get_total_output, kJ = s.transactionbuilder_get_explicit_output, xJ = s.transactionbuilder_get_deposit, jJ = s.transactionbuilder_get_fee_if_set, zJ = s.transactionbuilder_add_change_if_needed, FJ = s.transactionbuilder_add_change_if_needed_with_datum, RJ = s.transactionbuilder_calc_script_data_hash, OJ = s.transactionbuilder_set_script_data_hash, qJ = s.transactionbuilder_remove_script_data_hash, $J = s.transactionbuilder_add_required_signer, LJ = s.transactionbuilder_full_size, JJ = s.transactionbuilder_output_sizes, YJ = s.transactionbuilder_build, QJ = s.transactionbuilder_build_tx, XJ = s.transactionbuilder_build_tx_unsafe, ZJ = s.transactionbuilder_min_fee, UJ = s.__wbg_treasurywithdrawals_free, EJ = s.treasurywithdrawals_to_json, KJ = s.treasurywithdrawals_to_js_value, SJ = s.treasurywithdrawals_from_json, WJ = s.treasurywithdrawals_new, MJ = s.treasurywithdrawals_get, GJ = s.treasurywithdrawals_insert, HJ = s.treasurywithdrawals_keys, AJ = s.__wbg_plutusscript_free, IJ = s.plutusscript_to_bytes, DJ = s.plutusscript_from_bytes, TJ = s.plutusscript_to_hex, NJ = s.plutusscript_from_hex, CJ = s.plutusscript_new, VJ = s.plutusscript_new_v2, PJ = s.plutusscript_new_v3, BJ = s.plutusscript_new_with_version, tY = s.plutusscript_bytes, _Y = s.plutusscript_from_bytes_v2, eY = s.plutusscript_from_bytes_v3, rY = s.plutusscript_from_bytes_with_version, nY = s.plutusscript_from_hex_with_version, oY = s.plutusscript_hash, aY = s.plutusscript_language_version, sY = s.__wbg_costmodel_free, iY = s.costmodel_to_bytes, dY = s.costmodel_from_bytes, cY = s.costmodel_to_hex, pY = s.costmodel_from_hex, wY = s.costmodel_to_json, bY = s.costmodel_to_js_value, lY = s.costmodel_from_json, gY = s.costmodel_new, uY = s.costmodel_set, fY = s.costmodel_get, hY = s.costmodel_len, yY = s.__wbg_nativescripts_free, vY = s.nativescripts_new, mY = s.nativescripts_get, kY = s.nativescripts_add, xY = s.nativescripts_to_bytes, jY = s.nativescripts_from_bytes, zY = s.nativescripts_to_hex, FY = s.nativescripts_from_hex, RY = s.nativescripts_to_json, OY = s.nativescripts_to_js_value, qY = s.nativescripts_from_json, $Y = s.treasurywithdrawals_len, LY = s.plutuswitnesses_len, JY = s.nativescripts_len, YY = s.plutuswitnesses_new, QY = s.__wbg_poolretirement_free, XY = s.poolretirement_to_bytes, ZY = s.poolretirement_from_bytes, UY = s.poolretirement_to_hex, EY = s.poolretirement_from_hex, KY = s.poolretirement_to_json, SY = s.poolretirement_to_js_value, WY = s.poolretirement_from_json, MY = s.poolretirement_pool_keyhash, GY = s.poolretirement_epoch, HY = s.poolretirement_new, AY = s.__wbg_votingprocedures_free, IY = s.votingprocedures_to_bytes, DY = s.votingprocedures_from_bytes, TY = s.votingprocedures_to_hex, NY = s.votingprocedures_from_hex, CY = s.votingprocedures_to_json, VY = s.votingprocedures_to_js_value, PY = s.votingprocedures_from_json, BY = s.votingprocedures_insert, tQ = s.votingprocedures_get, _Q = s.votingprocedures_get_voters, eQ = s.votingprocedures_get_governance_action_ids_by_voter, rQ = s.__wbg_infoaction_free, nQ = s.infoaction_new, oQ = s.__wbg_costmdls_free, aQ = s.costmdls_to_bytes, sQ = s.costmdls_from_bytes, iQ = s.costmdls_to_hex, dQ = s.costmdls_from_hex, cQ = s.costmdls_to_json, pQ = s.costmdls_to_js_value, wQ = s.costmdls_from_json, bQ = s.costmdls_new, lQ = s.costmdls_len, gQ = s.costmdls_insert, uQ = s.costmdls_get, fQ = s.costmdls_keys, hQ = s.costmdls_retain_language_versions, yQ = s.__wbg_strings_free, vQ = s.strings_new, mQ = s.strings_get, kQ = s.strings_add, xQ = s.__wbg_vkeywitness_free, jQ = s.vkeywitness_to_bytes, zQ = s.vkeywitness_from_bytes, FQ = s.vkeywitness_to_hex, RQ = s.vkeywitness_from_hex, OQ = s.vkeywitness_to_json, qQ = s.vkeywitness_to_js_value, $Q = s.vkeywitness_from_json, LQ = s.vkeywitness_new, JQ = s.vkeywitness_vkey, YQ = s.__wbg_bootstrapwitness_free, QQ = s.bootstrapwitness_to_bytes, XQ = s.bootstrapwitness_from_bytes, ZQ = s.bootstrapwitness_to_hex, UQ = s.bootstrapwitness_from_hex, EQ = s.bootstrapwitness_to_json, KQ = s.bootstrapwitness_to_js_value, SQ = s.bootstrapwitness_from_json, WQ = s.bootstrapwitness_vkey, MQ = s.bootstrapwitness_signature, GQ = s.bootstrapwitness_chain_code, HQ = s.bootstrapwitness_attributes, AQ = s.bootstrapwitness_new, IQ = s.__wbg_vkeys_free, DQ = s.vkeys_new, TQ = s.vkeys_get, NQ = s.vkeys_add, CQ = s.__wbg_nativescript_free, VQ = s.nativescript_to_bytes, PQ = s.nativescript_from_bytes, BQ = s.nativescript_to_hex, tX = s.nativescript_from_hex, _X = s.nativescript_to_json, eX = s.nativescript_to_js_value, rX = s.nativescript_from_json, nX = s.nativescript_hash, oX = s.nativescript_new_script_pubkey, aX = s.nativescript_new_script_all, sX = s.nativescript_new_script_any, iX = s.nativescript_new_script_n_of_k, dX = s.nativescript_new_timelock_start, cX = s.nativescript_new_timelock_expiry, pX = s.nativescript_kind, wX = s.nativescript_as_script_pubkey, bX = s.nativescript_as_script_all, lX = s.nativescript_as_script_any, gX = s.nativescript_as_script_n_of_k, uX = s.nativescript_as_timelock_start, fX = s.nativescript_as_timelock_expiry, hX = s.nativescript_get_required_signers, yX = s.__wbg_scriptpubkey_free, vX = s.scriptpubkey_to_bytes, mX = s.scriptpubkey_from_bytes, kX = s.scriptpubkey_to_hex, xX = s.scriptpubkey_from_hex, jX = s.scriptpubkey_to_json, zX = s.scriptpubkey_to_js_value, FX = s.scriptpubkey_from_json, RX = s.scriptpubkey_addr_keyhash, OX = s.scriptpubkey_new, qX = s.__wbg_scriptall_free, $X = s.scriptall_to_bytes, LX = s.scriptall_from_bytes, JX = s.scriptall_to_hex, YX = s.scriptall_from_hex, QX = s.scriptall_to_json, XX = s.scriptall_to_js_value, ZX = s.scriptall_from_json, UX = s.scriptall_native_scripts, EX = s.scriptall_new, KX = s.scriptany_to_bytes, SX = s.scriptany_from_bytes, WX = s.scriptany_to_hex, MX = s.scriptany_from_hex, GX = s.scriptany_to_json, HX = s.scriptany_to_js_value, AX = s.scriptany_from_json, IX = s.__wbg_scriptnofk_free, DX = s.scriptnofk_to_bytes, TX = s.scriptnofk_from_bytes, NX = s.scriptnofk_to_hex, CX = s.scriptnofk_from_hex, VX = s.scriptnofk_to_json, PX = s.scriptnofk_to_js_value, BX = s.scriptnofk_from_json, tZ = s.scriptnofk_n, _Z = s.scriptnofk_new, eZ = s.timelockstart_to_bytes, rZ = s.timelockstart_from_bytes, nZ = s.timelockstart_to_hex, oZ = s.timelockstart_from_hex, aZ = s.timelockstart_to_json, sZ = s.timelockstart_to_js_value, iZ = s.timelockstart_from_json, dZ = s.__wbg_timelockexpiry_free, cZ = s.timelockexpiry_to_bytes, pZ = s.timelockexpiry_from_bytes, wZ = s.timelockexpiry_to_hex, bZ = s.timelockexpiry_from_hex, lZ = s.timelockexpiry_to_json, gZ = s.timelockexpiry_to_js_value, uZ = s.timelockexpiry_from_json, fZ = s.timelockexpiry_slot, hZ = s.timelockexpiry_slot_bignum, yZ = s.timelockexpiry_new, vZ = s.timelockexpiry_new_timelockexpiry, mZ = s.__wbg_headerbody_free, kZ = s.headerbody_to_bytes, xZ = s.headerbody_from_bytes, jZ = s.headerbody_to_hex, zZ = s.headerbody_from_hex, FZ = s.headerbody_to_json, RZ = s.headerbody_to_js_value, OZ = s.headerbody_from_json, qZ = s.headerbody_block_number, $Z = s.headerbody_slot, LZ = s.headerbody_slot_bignum, JZ = s.headerbody_prev_hash, YZ = s.headerbody_issuer_vkey, QZ = s.headerbody_vrf_vkey, XZ = s.headerbody_has_nonce_and_leader_vrf, ZZ = s.headerbody_nonce_vrf_or_nothing, UZ = s.headerbody_leader_vrf_or_nothing, EZ = s.headerbody_has_vrf_result, KZ = s.headerbody_vrf_result_or_nothing, SZ = s.headerbody_block_body_size, WZ = s.headerbody_block_body_hash, MZ = s.headerbody_operational_cert, GZ = s.headerbody_protocol_version, HZ = s.headerbody_new, AZ = s.headerbody_new_headerbody, IZ = s.__wbg_operationalcert_free, DZ = s.operationalcert_to_bytes, TZ = s.operationalcert_from_bytes, NZ = s.operationalcert_to_hex, CZ = s.operationalcert_from_hex, VZ = s.operationalcert_to_json, PZ = s.operationalcert_to_js_value, BZ = s.operationalcert_from_json, tU = s.operationalcert_hot_vkey, _U = s.operationalcert_sequence_number, eU = s.operationalcert_kes_period, rU = s.operationalcert_sigma, nU = s.operationalcert_new, oU = s.__wbg_scriptany_free, aU = s.timelockstart_slot_bignum, sU = s.timelockstart_slot, iU = s.strings_len, dU = s.vkeys_len, cU = s.scriptany_native_scripts, pU = s.scriptnofk_native_scripts, wU = s.scriptany_new, bU = s.votingprocedures_new, lU = s.vkeywitness_signature, gU = s.__wbg_timelockstart_free, uU = s.timelockstart_new_timelockstart, fU = s.timelockstart_new, hU = s.__wbg_fixedtransaction_free, yU = s.fixedtransaction_to_bytes, vU = s.fixedtransaction_from_bytes, mU = s.fixedtransaction_to_hex, kU = s.fixedtransaction_from_hex, xU = s.fixedtransaction_new, jU = s.fixedtransaction_new_with_auxiliary, zU = s.fixedtransaction_new_from_body_bytes, FU = s.fixedtransaction_body, RU = s.fixedtransaction_raw_body, OU = s.fixedtransaction_set_body, qU = s.fixedtransaction_set_witness_set, $U = s.fixedtransaction_witness_set, LU = s.fixedtransaction_raw_witness_set, JU = s.fixedtransaction_set_is_valid, YU = s.fixedtransaction_is_valid, QU = s.fixedtransaction_set_auxiliary_data, XU = s.fixedtransaction_auxiliary_data, ZU = s.fixedtransaction_raw_auxiliary_data, UU = s.fixedtransaction_transaction_hash, EU = s.fixedtransaction_add_vkey_witness, KU = s.fixedtransaction_add_bootstrap_witness, SU = s.fixedtransaction_sign_and_add_vkey_signature, WU = s.fixedtransaction_sign_and_add_icarus_bootstrap_signature, MU = s.fixedtransaction_sign_and_add_daedalus_bootstrap_signature, GU = s.__wbg_certificates_free, HU = s.certificates_to_bytes, AU = s.certificates_from_bytes, IU = s.certificates_to_hex, DU = s.certificates_from_hex, TU = s.certificates_to_json, NU = s.certificates_to_js_value, CU = s.certificates_from_json, VU = s.certificates_new, PU = s.certificates_len, BU = s.certificates_get, tE = s.certificates_add, _E = s.__wbg_genesiskeydelegation_free, eE = s.genesiskeydelegation_to_bytes, rE = s.genesiskeydelegation_from_bytes, nE = s.genesiskeydelegation_to_hex, oE = s.genesiskeydelegation_from_hex, aE = s.genesiskeydelegation_to_json, sE = s.genesiskeydelegation_to_js_value, iE = s.genesiskeydelegation_from_json, dE = s.genesiskeydelegation_genesishash, cE = s.genesiskeydelegation_genesis_delegate_hash, pE = s.genesiskeydelegation_vrf_keyhash, wE = s.genesiskeydelegation_new, bE = s.__wbg_committeecoldresign_free, lE = s.committeecoldresign_to_bytes, gE = s.committeecoldresign_from_bytes, uE = s.committeecoldresign_to_hex, fE = s.committeecoldresign_from_hex, hE = s.committeecoldresign_to_json, yE = s.committeecoldresign_to_js_value, vE = s.committeecoldresign_from_json, mE = s.committeecoldresign_committee_cold_credential, kE = s.committeecoldresign_anchor, xE = s.committeecoldresign_new, jE = s.committeecoldresign_new_with_anchor, zE = s.committeecoldresign_has_script_credentials, FE = s.__wbg_drepregistration_free, RE = s.drepregistration_to_bytes, OE = s.drepregistration_from_bytes, qE = s.drepregistration_to_hex, $E = s.drepregistration_from_hex, LE = s.drepregistration_to_json, JE = s.drepregistration_to_js_value, YE = s.drepregistration_from_json, QE = s.drepregistration_voting_credential, XE = s.drepregistration_coin, ZE = s.drepregistration_anchor, UE = s.drepregistration_new, EE = s.drepregistration_new_with_anchor, KE = s.drepregistration_has_script_credentials, SE = s.__wbg_anchor_free, WE = s.anchor_to_bytes, ME = s.anchor_from_bytes, GE = s.anchor_to_hex, HE = s.anchor_from_hex, AE = s.anchor_to_json, IE = s.anchor_to_js_value, DE = s.anchor_from_json, TE = s.anchor_url, NE = s.anchor_anchor_data_hash, CE = s.anchor_new, VE = s.__wbg_votingprocedure_free, PE = s.votingprocedure_to_bytes, BE = s.votingprocedure_from_bytes, tK = s.votingprocedure_to_hex, _K = s.votingprocedure_from_hex, eK = s.votingprocedure_to_json, rK = s.votingprocedure_to_js_value, nK = s.votingprocedure_from_json, oK = s.votingprocedure_new, aK = s.votingprocedure_new_with_anchor, sK = s.votingprocedure_vote_kind, iK = s.__wbg_governanceactionid_free, dK = s.governanceactionid_to_bytes, cK = s.governanceactionid_from_bytes, pK = s.governanceactionid_to_hex, wK = s.governanceactionid_from_hex, bK = s.governanceactionid_to_json, lK = s.governanceactionid_to_js_value, gK = s.governanceactionid_from_json, uK = s.governanceactionid_transaction_id, fK = s.governanceactionid_index, hK = s.governanceactionid_new, yK = s.__wbg_committee_free, vK = s.committee_to_bytes, mK = s.committee_from_bytes, kK = s.committee_to_hex, xK = s.committee_from_hex, jK = s.committee_to_json, zK = s.committee_to_js_value, FK = s.committee_from_json, RK = s.committee_new, OK = s.committee_members_keys, qK = s.committee_quorum_threshold, $K = s.committee_add_member, LK = s.committee_get_member_epoch, JK = s.__wbg_redeemers_free, YK = s.redeemers_to_bytes, QK = s.redeemers_from_bytes, XK = s.redeemers_to_hex, ZK = s.redeemers_from_hex, UK = s.redeemers_to_json, EK = s.redeemers_to_js_value, KK = s.redeemers_from_json, SK = s.redeemers_new, WK = s.redeemers_get, MK = s.redeemers_add, GK = s.redeemers_get_container_type, HK = s.redeemers_total_ex_units, AK = s.transactioninput_to_bytes, IK = s.transactioninput_from_bytes, DK = s.transactioninput_to_hex, TK = s.transactioninput_from_hex, NK = s.transactioninput_to_json, CK = s.transactioninput_to_js_value, VK = s.transactioninput_from_json, PK = s.__wbg_publickey_free, BK = s.__wbg_legacydaedalusprivatekey_free, tS = s.legacydaedalusprivatekey_from_bytes, _S = s.legacydaedalusprivatekey_as_bytes, eS = s.legacydaedalusprivatekey_chaincode, rS = s.__wbg_kessignature_free, nS = s.kessignature_to_bytes, oS = s.kessignature_from_bytes, aS = s.__wbg_block_free, sS = s.block_to_bytes, iS = s.block_from_bytes, dS = s.block_to_hex, cS = s.block_from_hex, pS = s.block_to_json, wS = s.block_to_js_value, bS = s.block_from_json, lS = s.block_header, gS = s.block_transaction_bodies, uS = s.block_transaction_witness_sets, fS = s.block_auxiliary_data_set, hS = s.block_invalid_transactions, yS = s.block_new, vS = s.__wbg_fixedtransactionbody_free, mS = s.fixedtransactionbody_from_bytes, kS = s.fixedtransactionbody_from_hex, xS = s.fixedtransactionbody_tx_hash, jS = s.fixedtransactionbody_original_bytes, zS = s.__wbg_header_free, FS = s.header_to_bytes, RS = s.header_from_bytes, OS = s.header_to_hex, qS = s.header_from_hex, $S = s.header_to_json, LS = s.header_to_js_value, JS = s.header_from_json, YS = s.header_header_body, QS = s.header_body_signature, XS = s.header_new, ZS = s.__wbg_transactionbodies_free, US = s.transactionbodies_to_bytes, ES = s.transactionbodies_from_bytes, KS = s.transactionbodies_to_hex, SS = s.transactionbodies_from_hex, WS = s.transactionbodies_to_json, MS = s.transactionbodies_to_js_value, GS = s.transactionbodies_from_json, HS = s.transactionbodies_get, AS = s.transactionbodies_add, IS = s.__wbg_fixedtransactionbodies_free, DS = s.fixedtransactionbodies_from_bytes, TS = s.fixedtransactionbodies_from_hex, NS = s.fixedtransactionbodies_new, CS = s.fixedtransactionbodies_len, VS = s.fixedtransactionbodies_get, PS = s.fixedtransactionbodies_add, BS = s.publickey_from_hex, tW = s.publickey_to_hex, _W = s.publickey_hash, eW = s.publickey_verify, rW = s.publickey_from_bytes, nW = s.publickey_as_bytes, oW = s.publickey_to_bech32, aW = s.publickey_from_bech32, sW = s.__wbg_transactioninput_free, iW = s.fixedtransactionbody_transaction_body, dW = s.votingprocedure_anchor, cW = s.transactioninput_index, pW = s.transactionbodies_len, wW = s.redeemers_len, bW = s.transactioninput_new, lW = s.transactioninput_transaction_id, gW = s.transactionbodies_new, uW = s.__wbg_ed25519keyhash_free, fW = s.ed25519keyhash_from_bytes, hW = s.ed25519keyhash_to_bytes, yW = s.ed25519keyhash_to_bech32, vW = s.ed25519keyhash_from_bech32, mW = s.ed25519keyhash_to_hex, kW = s.ed25519keyhash_from_hex, xW = s.scripthash_from_bytes, jW = s.scripthash_from_bech32, zW = s.scripthash_from_hex, FW = s.__wbg_anchordatahash_free, RW = s.anchordatahash_from_bytes, OW = s.anchordatahash_to_bytes, qW = s.anchordatahash_to_bech32, $W = s.anchordatahash_from_bech32, LW = s.anchordatahash_to_hex, JW = s.anchordatahash_from_hex, YW = s.transactionhash_from_bytes, QW = s.transactionhash_from_bech32, XW = s.transactionhash_from_hex, ZW = s.genesisdelegatehash_from_bytes, UW = s.genesisdelegatehash_from_bech32, EW = s.genesisdelegatehash_from_hex, KW = s.genesishash_from_bytes, SW = s.genesishash_from_bech32, WW = s.genesishash_from_hex, MW = s.auxiliarydatahash_from_bytes, GW = s.auxiliarydatahash_from_bech32, HW = s.auxiliarydatahash_from_hex, AW = s.poolmetadatahash_from_bytes, IW = s.poolmetadatahash_from_bech32, DW = s.poolmetadatahash_from_hex, TW = s.vrfkeyhash_from_bytes, NW = s.vrfkeyhash_from_bech32, CW = s.vrfkeyhash_from_hex, VW = s.blockhash_from_bytes, PW = s.blockhash_from_bech32, BW = s.blockhash_from_hex, tM = s.datahash_from_bytes, _M = s.datahash_from_bech32, eM = s.datahash_from_hex, rM = s.scriptdatahash_from_bytes, nM = s.scriptdatahash_from_bech32, oM = s.scriptdatahash_from_hex, aM = s.vrfvkey_from_bytes, sM = s.vrfvkey_from_bech32, iM = s.vrfvkey_from_hex, dM = s.kesvkey_from_bytes, cM = s.kesvkey_from_bech32, pM = s.kesvkey_from_hex, wM = s.__wbg_scripthash_free, bM = s.__wbg_transactionhash_free, lM = s.__wbg_genesisdelegatehash_free, gM = s.__wbg_genesishash_free, uM = s.__wbg_auxiliarydatahash_free, fM = s.__wbg_poolmetadatahash_free, hM = s.__wbg_vrfkeyhash_free, yM = s.__wbg_blockhash_free, vM = s.__wbg_datahash_free, mM = s.__wbg_scriptdatahash_free, kM = s.__wbg_vrfvkey_free, xM = s.__wbg_kesvkey_free, jM = s.scripthash_to_hex, zM = s.transactionhash_to_hex, FM = s.genesisdelegatehash_to_hex, RM = s.genesishash_to_hex, OM = s.auxiliarydatahash_to_hex, qM = s.poolmetadatahash_to_hex, $M = s.vrfkeyhash_to_hex, LM = s.blockhash_to_hex, JM = s.datahash_to_hex, YM = s.scriptdatahash_to_hex, QM = s.vrfvkey_to_hex, XM = s.kesvkey_to_hex, ZM = s.scripthash_to_bytes, UM = s.vrfkeyhash_to_bytes, EM = s.genesisdelegatehash_to_bytes, KM = s.genesishash_to_bytes, SM = s.transactionhash_to_bytes, WM = s.poolmetadatahash_to_bytes, MM = s.auxiliarydatahash_to_bytes, GM = s.blockhash_to_bytes, HM = s.datahash_to_bytes, AM = s.scriptdatahash_to_bytes, IM = s.vrfvkey_to_bytes, DM = s.kesvkey_to_bytes, TM = s.scripthash_to_bech32, NM = s.vrfkeyhash_to_bech32, CM = s.genesisdelegatehash_to_bech32, VM = s.genesishash_to_bech32, PM = s.transactionhash_to_bech32, BM = s.poolmetadatahash_to_bech32, tG = s.auxiliarydatahash_to_bech32, _G = s.blockhash_to_bech32, eG = s.datahash_to_bech32, rG = s.scriptdatahash_to_bech32, nG = s.vrfvkey_to_bech32, oG = s.kesvkey_to_bech32, aG = s.__wbindgen_malloc, sG = s.__wbindgen_realloc, iG = s.__wbindgen_add_to_stack_pointer, dG = s.__wbindgen_free, cG = s.__wbindgen_exn_store, pG = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wbg_address_free: D4,
    __wbg_anchor_free: SE,
    __wbg_anchordatahash_free: FW,
    __wbg_assetname_free: tl,
    __wbg_assetnames_free: cl,
    __wbg_assets_free: kl,
    __wbg_auxiliarydata_free: dF,
    __wbg_auxiliarydatahash_free: uM,
    __wbg_auxiliarydataset_free: Tb,
    __wbg_baseaddress_free: s6,
    __wbg_bigint_free: N3,
    __wbg_bignum_free: cd,
    __wbg_bip32privatekey_free: Qv,
    __wbg_bip32publickey_free: FO,
    __wbg_block_free: aS,
    __wbg_blockhash_free: yM,
    __wbg_bootstrapwitness_free: YQ,
    __wbg_bootstrapwitnesses_free: kv,
    __wbg_byronaddress_free: Q4,
    __wbg_certificate_free: n5,
    __wbg_certificates_free: GU,
    __wbg_certificatesbuilder_free: QR,
    __wbg_changeconfig_free: eL,
    __wbg_committee_free: yK,
    __wbg_committeecoldresign_free: bE,
    __wbg_committeehotauth_free: Oi,
    __wbg_constitution_free: xj,
    __wbg_constrplutusdata_free: w2,
    __wbg_costmdls_free: oQ,
    __wbg_costmodel_free: sY,
    __wbg_credential_free: By,
    __wbg_credentials_free: ck,
    __wbg_datacost_free: pu,
    __wbg_datahash_free: vM,
    __wbg_datumsource_free: Zm,
    __wbg_dnsrecordaoraaaa_free: Yg,
    __wbg_dnsrecordsrv_free: Lg,
    __wbg_drep_free: Z0,
    __wbg_drepderegistration_free: Ih,
    __wbg_drepregistration_free: FE,
    __wbg_drepupdate_free: ny,
    __wbg_drepvotingthresholds_free: K9,
    __wbg_ed25519keyhash_free: uW,
    __wbg_ed25519keyhashes_free: kk,
    __wbg_ed25519signature_free: Ii,
    __wbg_enterpriseaddress_free: l6,
    __wbg_exunitprices_free: VO,
    __wbg_exunits_free: a9,
    __wbg_fixedblock_free: H7,
    __wbg_fixedtransaction_free: hU,
    __wbg_fixedtransactionbodies_free: IS,
    __wbg_fixedtransactionbody_free: vS,
    __wbg_fixedtxwitnessesset_free: Si,
    __wbg_fixedversionedblock_free: B7,
    __wbg_generaltransactionmetadata_free: Cz,
    __wbg_genesisdelegatehash_free: lM,
    __wbg_genesishash_free: gM,
    __wbg_genesishashes_free: ab,
    __wbg_genesiskeydelegation_free: _E,
    __wbg_governanceaction_free: t4,
    __wbg_governanceactionid_free: iK,
    __wbg_governanceactionids_free: m1,
    __wbg_hardforkinitiationaction_free: $x,
    __wbg_header_free: zS,
    __wbg_headerbody_free: mZ,
    __wbg_infoaction_free: rQ,
    __wbg_int_free: U6,
    __wbg_ipv4_free: Xc,
    __wbg_ipv6_free: Ac,
    __wbg_kessignature_free: rS,
    __wbg_kesvkey_free: xM,
    __wbg_language_free: Wy,
    __wbg_languages_free: a2,
    __wbg_legacydaedalusprivatekey_free: BK,
    __wbg_linearfee_free: sx,
    __wbg_malformedaddress_free: $4,
    __wbg_metadatalist_free: vz,
    __wbg_metadatamap_free: sz,
    __wbg_mint_free: og,
    __wbg_mintassets_free: tg,
    __wbg_mintbuilder_free: gm,
    __wbg_mintsassets_free: Tl,
    __wbg_mintwitness_free: wm,
    __wbg_mirtostakecredentials_free: ku,
    __wbg_moveinstantaneousreward_free: Xu,
    __wbg_moveinstantaneousrewardscert_free: wu,
    __wbg_multiasset_free: Ql,
    __wbg_multihostname_free: Jg,
    __wbg_nativescript_free: CQ,
    __wbg_nativescripts_free: yY,
    __wbg_nativescriptsource_free: Lm,
    __wbg_networkid_free: yg,
    __wbg_networkinfo_free: x4,
    __wbg_newconstitutionaction_free: Xj,
    __wbg_noconfidenceaction_free: tj,
    __wbg_nonce_free: Bi,
    __wbg_operationalcert_free: IZ,
    __wbg_outputdatum_free: Hw,
    __wbg_parameterchangeaction_free: gx,
    __wbg_plutusdata_free: L2,
    __wbg_plutuslist_free: V2,
    __wbg_plutusmap_free: x2,
    __wbg_plutusmapvalues_free: v2,
    __wbg_plutusscript_free: AJ,
    __wbg_plutusscripts_free: W1,
    __wbg_plutusscriptsource_free: Fm,
    __wbg_plutuswitness_free: O0,
    __wbg_plutuswitnesses_free: y$,
    __wbg_pointer_free: m6,
    __wbg_pointeraddress_free: $6,
    __wbg_poolmetadata_free: bw,
    __wbg_poolmetadatahash_free: fM,
    __wbg_poolparams_free: ff,
    __wbg_poolregistration_free: cm,
    __wbg_poolretirement_free: QY,
    __wbg_poolvotingthresholds_free: $9,
    __wbg_privatekey_free: Ak,
    __wbg_proposedprotocolparameterupdates_free: Fb,
    __wbg_protocolparamupdate_free: l8,
    __wbg_protocolversion_free: Ub,
    __wbg_publickey_free: PK,
    __wbg_publickeys_free: e0,
    __wbg_redeemer_free: f9,
    __wbg_redeemers_free: JK,
    __wbg_redeemertag_free: pO,
    __wbg_relay_free: Pp,
    __wbg_relays_free: nf,
    __wbg_rewardaddress_free: ex,
    __wbg_rewardaddresses_free: xw,
    __wbg_scriptall_free: qX,
    __wbg_scriptany_free: oU,
    __wbg_scriptdatahash_free: mM,
    __wbg_scripthash_free: wM,
    __wbg_scripthashes_free: Eg,
    __wbg_scriptnofk_free: IX,
    __wbg_scriptpubkey_free: yX,
    __wbg_scriptref_free: RO,
    __wbg_singlehostaddr_free: kp,
    __wbg_singlehostname_free: Qp,
    __wbg_stakeandvotedelegation_free: th,
    __wbg_stakedelegation_free: Xf,
    __wbg_stakederegistration_free: gi,
    __wbg_stakeregistration_free: P5,
    __wbg_stakeregistrationanddelegation_free: bh,
    __wbg_stakevoteregistrationanddelegation_free: zh,
    __wbg_strings_free: yQ,
    __wbg_timelockexpiry_free: dZ,
    __wbg_timelockstart_free: gU,
    __wbg_transaction_free: Md,
    __wbg_transactionbatch_free: Wm,
    __wbg_transactionbatchlist_free: Km,
    __wbg_transactionbodies_free: ZS,
    __wbg_transactionbody_free: $F,
    __wbg_transactionbuilder_free: sL,
    __wbg_transactionbuilderconfig_free: W$,
    __wbg_transactionbuilderconfigbuilder_free: M$,
    __wbg_transactionhash_free: bM,
    __wbg_transactioninput_free: sW,
    __wbg_transactioninputs_free: P1,
    __wbg_transactionmetadatum_free: Oz,
    __wbg_transactionmetadatumlabels_free: Gz,
    __wbg_transactionoutput_free: lc,
    __wbg_transactionoutputamountbuilder_free: g1,
    __wbg_transactionoutputbuilder_free: i1,
    __wbg_transactionoutputs_free: ec,
    __wbg_transactionunspentoutput_free: gq,
    __wbg_transactionunspentoutputs_free: Fq,
    __wbg_transactionwitnessset_free: q3,
    __wbg_transactionwitnesssets_free: Qk,
    __wbg_treasurywithdrawals_free: UJ,
    __wbg_treasurywithdrawalsaction_free: Mx,
    __wbg_txinputsbuilder_free: k$,
    __wbg_unitinterval_free: Jd,
    __wbg_update_free: Nw,
    __wbg_updatecommitteeaction_free: cj,
    __wbg_url_free: $g,
    __wbg_value_free: Qq,
    __wbg_versionedblock_free: nq,
    __wbg_vkey_free: Ik,
    __wbg_vkeys_free: IQ,
    __wbg_vkeywitness_free: xQ,
    __wbg_vkeywitnesses_free: wv,
    __wbg_votedelegation_free: Af,
    __wbg_voter_free: fy,
    __wbg_voteregistrationanddelegation_free: Nv,
    __wbg_voters_free: Qy,
    __wbg_votingbuilder_free: IR,
    __wbg_votingprocedure_free: VE,
    __wbg_votingprocedures_free: AY,
    __wbg_votingproposal_free: Dj,
    __wbg_votingproposalbuilder_free: Hm,
    __wbg_votingproposals_free: q1,
    __wbg_vrfcert_free: Y7,
    __wbg_vrfkeyhash_free: hM,
    __wbg_vrfvkey_free: kM,
    __wbg_withdrawals_free: Yw,
    __wbg_withdrawalsbuilder_free: Vm,
    __wbindgen_add_to_stack_pointer: iG,
    __wbindgen_exn_store: cG,
    __wbindgen_free: dG,
    __wbindgen_malloc: aG,
    __wbindgen_realloc: sG,
    address_from_bech32: o6,
    address_from_bytes: T4,
    address_from_hex: e6,
    address_from_json: V4,
    address_is_malformed: t6,
    address_kind: P4,
    address_network_id: a6,
    address_payment_cred: B4,
    address_to_bech32: n6,
    address_to_bytes: r6,
    address_to_hex: _6,
    address_to_js_value: C4,
    address_to_json: N4,
    anchor_anchor_data_hash: NE,
    anchor_from_bytes: ME,
    anchor_from_hex: HE,
    anchor_from_json: DE,
    anchor_new: CE,
    anchor_to_bytes: WE,
    anchor_to_hex: GE,
    anchor_to_js_value: IE,
    anchor_to_json: AE,
    anchor_url: TE,
    anchordatahash_from_bech32: $W,
    anchordatahash_from_bytes: RW,
    anchordatahash_from_hex: JW,
    anchordatahash_to_bech32: qW,
    anchordatahash_to_bytes: OW,
    anchordatahash_to_hex: LW,
    assetname_from_bytes: el,
    assetname_from_hex: nl,
    assetname_from_json: sl,
    assetname_name: dl,
    assetname_new: il,
    assetname_to_bytes: _l,
    assetname_to_hex: rl,
    assetname_to_js_value: al,
    assetname_to_json: ol,
    assetnames_add: ml,
    assetnames_from_bytes: wl,
    assetnames_from_hex: ll,
    assetnames_from_json: fl,
    assetnames_get: vl,
    assetnames_len: yl,
    assetnames_new: hl,
    assetnames_to_bytes: pl,
    assetnames_to_hex: bl,
    assetnames_to_js_value: ul,
    assetnames_to_json: gl,
    assets_from_bytes: jl,
    assets_from_hex: Fl,
    assets_from_json: ql,
    assets_get: Jl,
    assets_insert: Ll,
    assets_keys: Yl,
    assets_len: au,
    assets_new: $l,
    assets_to_bytes: xl,
    assets_to_hex: zl,
    assets_to_js_value: Ol,
    assets_to_json: Rl,
    auxiliarydata_from_bytes: pF,
    auxiliarydata_from_hex: bF,
    auxiliarydata_from_json: uF,
    auxiliarydata_metadata: hF,
    auxiliarydata_native_scripts: vF,
    auxiliarydata_new: fF,
    auxiliarydata_plutus_scripts: kF,
    auxiliarydata_prefer_alonzo_format: jF,
    auxiliarydata_set_metadata: yF,
    auxiliarydata_set_native_scripts: mF,
    auxiliarydata_set_plutus_scripts: xF,
    auxiliarydata_set_prefer_alonzo_format: zF,
    auxiliarydata_to_bytes: cF,
    auxiliarydata_to_hex: wF,
    auxiliarydata_to_js_value: gF,
    auxiliarydata_to_json: lF,
    auxiliarydatahash_from_bech32: GW,
    auxiliarydatahash_from_bytes: MW,
    auxiliarydatahash_from_hex: HW,
    auxiliarydatahash_to_bech32: tG,
    auxiliarydatahash_to_bytes: MM,
    auxiliarydatahash_to_hex: OM,
    auxiliarydataset_get: Pb,
    auxiliarydataset_indices: Bb,
    auxiliarydataset_insert: Vb,
    auxiliarydataset_len: Cb,
    auxiliarydataset_new: Nb,
    baseaddress_from_address: w6,
    baseaddress_network_id: b6,
    baseaddress_new: i6,
    baseaddress_payment_cred: d6,
    baseaddress_stake_cred: c6,
    baseaddress_to_address: p6,
    bigint_abs: lR,
    bigint_add: iR,
    bigint_as_int: oR,
    bigint_as_u64: nR,
    bigint_div_ceil: uR,
    bigint_div_floor: fR,
    bigint_from_bytes: V3,
    bigint_from_hex: B3,
    bigint_from_json: eR,
    bigint_from_str: aR,
    bigint_increment: gR,
    bigint_is_zero: rR,
    bigint_mul: cR,
    bigint_one: wR,
    bigint_pow: pR,
    bigint_sub: dR,
    bigint_to_bytes: C3,
    bigint_to_hex: P3,
    bigint_to_js_value: _R,
    bigint_to_json: tR,
    bigint_to_str: sR,
    bigint_zero: bR,
    bignum_checked_add: zd,
    bignum_checked_mul: jd,
    bignum_checked_sub: Fd,
    bignum_clamped_sub: Rd,
    bignum_compare: Od,
    bignum_div_floor: xd,
    bignum_from_bytes: wd,
    bignum_from_hex: ld,
    bignum_from_json: fd,
    bignum_from_str: hd,
    bignum_is_zero: kd,
    bignum_less_than: qd,
    bignum_max: Ld,
    bignum_max_value: $d,
    bignum_one: md,
    bignum_to_bytes: pd,
    bignum_to_hex: bd,
    bignum_to_js_value: ud,
    bignum_to_json: gd,
    bignum_to_str: yd,
    bignum_zero: vd,
    bip32privatekey_as_bytes: Mv,
    bip32privatekey_chaincode: Iv,
    bip32privatekey_derive: Xv,
    bip32privatekey_from_128_xprv: Zv,
    bip32privatekey_from_bech32: Gv,
    bip32privatekey_from_bip39_entropy: Av,
    bip32privatekey_from_bytes: Wv,
    bip32privatekey_from_hex: Tv,
    bip32privatekey_generate_ed25519_bip32: Ev,
    bip32privatekey_to_128_xprv: Uv,
    bip32privatekey_to_bech32: Hv,
    bip32privatekey_to_hex: Dv,
    bip32privatekey_to_public: Sv,
    bip32privatekey_to_raw_key: Kv,
    bip32publickey_as_bytes: DO,
    bip32publickey_chaincode: HO,
    bip32publickey_derive: CO,
    bip32publickey_from_bech32: IO,
    bip32publickey_from_bytes: TO,
    bip32publickey_from_hex: MO,
    bip32publickey_to_bech32: AO,
    bip32publickey_to_hex: GO,
    bip32publickey_to_raw_key: NO,
    block_auxiliary_data_set: fS,
    block_from_bytes: iS,
    block_from_hex: cS,
    block_from_json: bS,
    block_header: lS,
    block_invalid_transactions: hS,
    block_new: yS,
    block_to_bytes: sS,
    block_to_hex: dS,
    block_to_js_value: wS,
    block_to_json: pS,
    block_transaction_bodies: gS,
    block_transaction_witness_sets: uS,
    blockhash_from_bech32: PW,
    blockhash_from_bytes: VW,
    blockhash_from_hex: BW,
    blockhash_to_bech32: _G,
    blockhash_to_bytes: GM,
    blockhash_to_hex: LM,
    bootstrapwitness_attributes: HQ,
    bootstrapwitness_chain_code: GQ,
    bootstrapwitness_from_bytes: XQ,
    bootstrapwitness_from_hex: UQ,
    bootstrapwitness_from_json: SQ,
    bootstrapwitness_new: AQ,
    bootstrapwitness_signature: MQ,
    bootstrapwitness_to_bytes: QQ,
    bootstrapwitness_to_hex: ZQ,
    bootstrapwitness_to_js_value: KQ,
    bootstrapwitness_to_json: EQ,
    bootstrapwitness_vkey: WQ,
    bootstrapwitnesses_add: Yv,
    bootstrapwitnesses_from_bytes: jv,
    bootstrapwitnesses_from_hex: Fv,
    bootstrapwitnesses_from_json: qv,
    bootstrapwitnesses_get: Jv,
    bootstrapwitnesses_len: Lv,
    bootstrapwitnesses_new: $v,
    bootstrapwitnesses_to_bytes: xv,
    bootstrapwitnesses_to_hex: zv,
    bootstrapwitnesses_to_js_value: Ov,
    bootstrapwitnesses_to_json: Rv,
    byronaddress_attributes: S4,
    byronaddress_byron_address_kind: K4,
    byronaddress_byron_protocol_magic: E4,
    byronaddress_from_address: I4,
    byronaddress_from_base58: M4,
    byronaddress_from_bytes: U4,
    byronaddress_icarus_from_key: G4,
    byronaddress_is_valid: H4,
    byronaddress_network_id: W4,
    byronaddress_to_address: A4,
    byronaddress_to_base58: X4,
    byronaddress_to_bytes: Z4,
    calculate_ex_units_ceil_cost: wx,
    certificate_as_committee_cold_resign: M5,
    certificate_as_committee_hot_auth: W5,
    certificate_as_drep_deregistration: G5,
    certificate_as_drep_registration: H5,
    certificate_as_drep_update: A5,
    certificate_as_genesis_key_delegation: K5,
    certificate_as_move_instantaneous_rewards_cert: S5,
    certificate_as_pool_registration: U5,
    certificate_as_pool_retirement: E5,
    certificate_as_reg_cert: Y5,
    certificate_as_stake_and_vote_delegation: I5,
    certificate_as_stake_delegation: Z5,
    certificate_as_stake_deregistration: Q5,
    certificate_as_stake_registration: J5,
    certificate_as_stake_registration_and_delegation: D5,
    certificate_as_stake_vote_registration_and_delegation: T5,
    certificate_as_unreg_cert: X5,
    certificate_as_vote_delegation: N5,
    certificate_as_vote_registration_and_delegation: C5,
    certificate_from_bytes: a5,
    certificate_from_hex: i5,
    certificate_from_json: p5,
    certificate_has_required_script_witness: V5,
    certificate_kind: L5,
    certificate_new_committee_cold_resign: k5,
    certificate_new_committee_hot_auth: m5,
    certificate_new_drep_deregistration: x5,
    certificate_new_drep_registration: j5,
    certificate_new_drep_update: z5,
    certificate_new_genesis_key_delegation: y5,
    certificate_new_move_instantaneous_rewards_cert: v5,
    certificate_new_pool_registration: f5,
    certificate_new_pool_retirement: h5,
    certificate_new_reg_cert: b5,
    certificate_new_stake_and_vote_delegation: F5,
    certificate_new_stake_delegation: u5,
    certificate_new_stake_deregistration: l5,
    certificate_new_stake_registration: w5,
    certificate_new_stake_registration_and_delegation: R5,
    certificate_new_stake_vote_registration_and_delegation: O5,
    certificate_new_unreg_cert: g5,
    certificate_new_vote_delegation: q5,
    certificate_new_vote_registration_and_delegation: $5,
    certificate_to_bytes: o5,
    certificate_to_hex: s5,
    certificate_to_js_value: c5,
    certificate_to_json: d5,
    certificates_add: tE,
    certificates_from_bytes: AU,
    certificates_from_hex: DU,
    certificates_from_json: CU,
    certificates_get: BU,
    certificates_len: PU,
    certificates_new: VU,
    certificates_to_bytes: HU,
    certificates_to_hex: IU,
    certificates_to_js_value: NU,
    certificates_to_json: TU,
    certificatesbuilder_add: ZR,
    certificatesbuilder_add_with_native_script: ER,
    certificatesbuilder_add_with_plutus_witness: UR,
    certificatesbuilder_build: AR,
    certificatesbuilder_get_certificates_deposit: GR,
    certificatesbuilder_get_certificates_refund: MR,
    certificatesbuilder_get_native_scripts: WR,
    certificatesbuilder_get_plutus_witnesses: KR,
    certificatesbuilder_get_ref_inputs: SR,
    certificatesbuilder_has_plutus_scripts: HR,
    certificatesbuilder_new: XR,
    changeconfig_change_address: nL,
    changeconfig_change_plutus_data: oL,
    changeconfig_change_script_ref: aL,
    changeconfig_new: rL,
    committee_add_member: $K,
    committee_from_bytes: mK,
    committee_from_hex: xK,
    committee_from_json: FK,
    committee_get_member_epoch: LK,
    committee_members_keys: OK,
    committee_new: RK,
    committee_quorum_threshold: qK,
    committee_to_bytes: vK,
    committee_to_hex: kK,
    committee_to_js_value: zK,
    committee_to_json: jK,
    committeecoldresign_anchor: kE,
    committeecoldresign_committee_cold_credential: mE,
    committeecoldresign_from_bytes: gE,
    committeecoldresign_from_hex: fE,
    committeecoldresign_from_json: vE,
    committeecoldresign_has_script_credentials: zE,
    committeecoldresign_new: xE,
    committeecoldresign_new_with_anchor: jE,
    committeecoldresign_to_bytes: lE,
    committeecoldresign_to_hex: uE,
    committeecoldresign_to_js_value: yE,
    committeecoldresign_to_json: hE,
    committeehotauth_committee_cold_credential: Zi,
    committeehotauth_committee_hot_credential: Ui,
    committeehotauth_from_bytes: $i,
    committeehotauth_from_hex: Ji,
    committeehotauth_from_json: Xi,
    committeehotauth_has_script_credentials: Ki,
    committeehotauth_new: Ei,
    committeehotauth_to_bytes: qi,
    committeehotauth_to_hex: Li,
    committeehotauth_to_js_value: Qi,
    committeehotauth_to_json: Yi,
    constitution_anchor: Lj,
    constitution_from_bytes: zj,
    constitution_from_hex: Rj,
    constitution_from_json: $j,
    constitution_new: Yj,
    constitution_new_with_script_hash: Qj,
    constitution_script_hash: Jj,
    constitution_to_bytes: jj,
    constitution_to_hex: Fj,
    constitution_to_js_value: qj,
    constitution_to_json: Oj,
    constrplutusdata_alternative: f2,
    constrplutusdata_data: h2,
    constrplutusdata_from_bytes: l2,
    constrplutusdata_from_hex: u2,
    constrplutusdata_new: y2,
    constrplutusdata_to_bytes: b2,
    constrplutusdata_to_hex: g2,
    costmdls_from_bytes: sQ,
    costmdls_from_hex: dQ,
    costmdls_from_json: wQ,
    costmdls_get: uQ,
    costmdls_insert: gQ,
    costmdls_keys: fQ,
    costmdls_len: lQ,
    costmdls_new: bQ,
    costmdls_retain_language_versions: hQ,
    costmdls_to_bytes: aQ,
    costmdls_to_hex: iQ,
    costmdls_to_js_value: pQ,
    costmdls_to_json: cQ,
    costmodel_from_bytes: dY,
    costmodel_from_hex: pY,
    costmodel_from_json: lY,
    costmodel_get: fY,
    costmodel_len: hY,
    costmodel_new: gY,
    costmodel_set: uY,
    costmodel_to_bytes: iY,
    costmodel_to_hex: cY,
    costmodel_to_js_value: bY,
    costmodel_to_json: wY,
    create_send_all: Gm,
    credential_from_bytes: av,
    credential_from_hex: iv,
    credential_from_json: pv,
    credential_from_keyhash: tv,
    credential_from_scripthash: _v,
    credential_has_script_hash: nv,
    credential_kind: im,
    credential_to_bytes: ov,
    credential_to_hex: sv,
    credential_to_js_value: cv,
    credential_to_json: dv,
    credential_to_keyhash: ev,
    credential_to_scripthash: rv,
    credentials_add: mk,
    credentials_from_bytes: wk,
    credentials_from_hex: lk,
    credentials_from_json: fk,
    credentials_get: vk,
    credentials_len: yk,
    credentials_new: hk,
    credentials_to_bytes: pk,
    credentials_to_hex: bk,
    credentials_to_js_value: uk,
    credentials_to_json: gk,
    datacost_coins_per_byte: bc,
    datacost_new_coins_per_byte: Ig,
    datahash_from_bech32: _M,
    datahash_from_bytes: tM,
    datahash_from_hex: eM,
    datahash_to_bech32: eG,
    datahash_to_bytes: HM,
    datahash_to_hex: JM,
    datumsource_new: Um,
    datumsource_new_ref_input: Em,
    decode_arbitrary_bytes_from_metadatum: RF,
    decode_metadatum_to_json_str: qF,
    decode_plutus_datum_to_json_str: az,
    decrypt_with_password: r5,
    dnsrecordaoraaaa_from_bytes: ip,
    dnsrecordaoraaaa_from_hex: cp,
    dnsrecordaoraaaa_from_json: bp,
    dnsrecordaoraaaa_new: lp,
    dnsrecordaoraaaa_record: gp,
    dnsrecordaoraaaa_to_bytes: sp,
    dnsrecordaoraaaa_to_hex: dp,
    dnsrecordaoraaaa_to_js_value: wp,
    dnsrecordaoraaaa_to_json: pp,
    dnsrecordsrv_from_bytes: fp,
    dnsrecordsrv_from_hex: yp,
    dnsrecordsrv_from_json: vp,
    dnsrecordsrv_new: mp,
    dnsrecordsrv_record: Sg,
    dnsrecordsrv_to_bytes: up,
    dnsrecordsrv_to_hex: hp,
    dnsrecordsrv_to_js_value: Bg,
    dnsrecordsrv_to_json: tu,
    drep_from_bech32: B0,
    drep_from_bytes: E0,
    drep_from_hex: S0,
    drep_from_json: G0,
    drep_kind: N0,
    drep_new_always_abstain: I0,
    drep_new_always_no_confidence: D0,
    drep_new_from_credential: T0,
    drep_new_key_hash: H0,
    drep_new_script_hash: A0,
    drep_to_bech32: P0,
    drep_to_bytes: U0,
    drep_to_hex: K0,
    drep_to_js_value: M0,
    drep_to_json: W0,
    drep_to_key_hash: C0,
    drep_to_script_hash: V0,
    drepderegistration_coin: _y,
    drepderegistration_from_bytes: Th,
    drepderegistration_from_hex: Ch,
    drepderegistration_from_json: Bh,
    drepderegistration_has_script_credentials: ry,
    drepderegistration_new: ey,
    drepderegistration_to_bytes: Dh,
    drepderegistration_to_hex: Nh,
    drepderegistration_to_js_value: Ph,
    drepderegistration_to_json: Vh,
    drepderegistration_voting_credential: ty,
    drepregistration_anchor: ZE,
    drepregistration_coin: XE,
    drepregistration_from_bytes: OE,
    drepregistration_from_hex: $E,
    drepregistration_from_json: YE,
    drepregistration_has_script_credentials: KE,
    drepregistration_new: UE,
    drepregistration_new_with_anchor: EE,
    drepregistration_to_bytes: RE,
    drepregistration_to_hex: qE,
    drepregistration_to_js_value: JE,
    drepregistration_to_json: LE,
    drepregistration_voting_credential: QE,
    drepupdate_anchor: by,
    drepupdate_from_bytes: ay,
    drepupdate_from_hex: iy,
    drepupdate_from_json: py,
    drepupdate_has_script_credentials: uy,
    drepupdate_new: ly,
    drepupdate_new_with_anchor: gy,
    drepupdate_to_bytes: oy,
    drepupdate_to_hex: sy,
    drepupdate_to_js_value: cy,
    drepupdate_to_json: dy,
    drepupdate_voting_credential: wy,
    drepvotingthresholds_committee_no_confidence: a8,
    drepvotingthresholds_committee_normal: o8,
    drepvotingthresholds_from_bytes: W9,
    drepvotingthresholds_from_hex: G9,
    drepvotingthresholds_from_json: I9,
    drepvotingthresholds_hard_fork_initiation: i8,
    drepvotingthresholds_motion_no_confidence: n8,
    drepvotingthresholds_new: D9,
    drepvotingthresholds_pp_economic_group: c8,
    drepvotingthresholds_pp_governance_group: w8,
    drepvotingthresholds_pp_network_group: d8,
    drepvotingthresholds_pp_technical_group: p8,
    drepvotingthresholds_set_committee_no_confidence: C9,
    drepvotingthresholds_set_committee_normal: N9,
    drepvotingthresholds_set_hard_fork_initiation: P9,
    drepvotingthresholds_set_motion_no_confidence: T9,
    drepvotingthresholds_set_pp_economic_group: t8,
    drepvotingthresholds_set_pp_governance_group: e8,
    drepvotingthresholds_set_pp_network_group: B9,
    drepvotingthresholds_set_pp_technical_group: _8,
    drepvotingthresholds_set_treasury_withdrawal: r8,
    drepvotingthresholds_set_update_constitution: V9,
    drepvotingthresholds_to_bytes: S9,
    drepvotingthresholds_to_hex: M9,
    drepvotingthresholds_to_js_value: A9,
    drepvotingthresholds_to_json: H9,
    drepvotingthresholds_treasury_withdrawal: b8,
    drepvotingthresholds_update_constitution: s8,
    ed25519keyhash_from_bech32: vW,
    ed25519keyhash_from_bytes: fW,
    ed25519keyhash_from_hex: kW,
    ed25519keyhash_to_bech32: yW,
    ed25519keyhash_to_bytes: hW,
    ed25519keyhash_to_hex: mW,
    ed25519keyhashes_add: Lk,
    ed25519keyhashes_contains: Jk,
    ed25519keyhashes_from_bytes: jk,
    ed25519keyhashes_from_hex: Fk,
    ed25519keyhashes_from_json: qk,
    ed25519keyhashes_get: $k,
    ed25519keyhashes_len: k0,
    ed25519keyhashes_new: R0,
    ed25519keyhashes_to_bytes: xk,
    ed25519keyhashes_to_hex: zk,
    ed25519keyhashes_to_js_value: Ok,
    ed25519keyhashes_to_json: Rk,
    ed25519keyhashes_to_option: Yk,
    ed25519signature_from_bech32: Ci,
    ed25519signature_from_bytes: Pi,
    ed25519signature_from_hex: Vi,
    ed25519signature_to_bech32: Ti,
    ed25519signature_to_bytes: Di,
    ed25519signature_to_hex: Ni,
    encode_arbitrary_bytes_as_metadatum: FF,
    encode_json_str_to_metadatum: OF,
    encode_json_str_to_native_script: c$,
    encode_json_str_to_plutus_datum: oz,
    encrypt_with_password: e5,
    enterpriseaddress_from_address: f6,
    enterpriseaddress_network_id: h6,
    enterpriseaddress_new: g6,
    enterpriseaddress_payment_cred: rx,
    enterpriseaddress_to_address: u6,
    exunitprices_from_bytes: BO,
    exunitprices_from_hex: _9,
    exunitprices_from_json: n9,
    exunitprices_mem_price: l$,
    exunitprices_new: o9,
    exunitprices_step_price: g$,
    exunitprices_to_bytes: PO,
    exunitprices_to_hex: t9,
    exunitprices_to_js_value: r9,
    exunitprices_to_json: e9,
    exunits_from_bytes: i9,
    exunits_from_hex: c9,
    exunits_from_json: b9,
    exunits_mem: l9,
    exunits_new: u9,
    exunits_steps: g9,
    exunits_to_bytes: s9,
    exunits_to_hex: d9,
    exunits_to_js_value: w9,
    exunits_to_json: p9,
    fixedblock_auxiliary_data_set: C7,
    fixedblock_block_hash: P7,
    fixedblock_from_bytes: A7,
    fixedblock_from_hex: I7,
    fixedblock_header: D7,
    fixedblock_invalid_transactions: V7,
    fixedblock_transaction_bodies: T7,
    fixedblock_transaction_witness_sets: N7,
    fixedtransaction_add_bootstrap_witness: KU,
    fixedtransaction_add_vkey_witness: EU,
    fixedtransaction_auxiliary_data: XU,
    fixedtransaction_body: FU,
    fixedtransaction_from_bytes: vU,
    fixedtransaction_from_hex: kU,
    fixedtransaction_is_valid: YU,
    fixedtransaction_new: xU,
    fixedtransaction_new_from_body_bytes: zU,
    fixedtransaction_new_with_auxiliary: jU,
    fixedtransaction_raw_auxiliary_data: ZU,
    fixedtransaction_raw_body: RU,
    fixedtransaction_raw_witness_set: LU,
    fixedtransaction_set_auxiliary_data: QU,
    fixedtransaction_set_body: OU,
    fixedtransaction_set_is_valid: JU,
    fixedtransaction_set_witness_set: qU,
    fixedtransaction_sign_and_add_daedalus_bootstrap_signature: MU,
    fixedtransaction_sign_and_add_icarus_bootstrap_signature: WU,
    fixedtransaction_sign_and_add_vkey_signature: SU,
    fixedtransaction_to_bytes: yU,
    fixedtransaction_to_hex: mU,
    fixedtransaction_transaction_hash: UU,
    fixedtransaction_witness_set: $U,
    fixedtransactionbodies_add: PS,
    fixedtransactionbodies_from_bytes: DS,
    fixedtransactionbodies_from_hex: TS,
    fixedtransactionbodies_get: VS,
    fixedtransactionbodies_len: CS,
    fixedtransactionbodies_new: NS,
    fixedtransactionbody_from_bytes: mS,
    fixedtransactionbody_from_hex: kS,
    fixedtransactionbody_original_bytes: jS,
    fixedtransactionbody_transaction_body: iW,
    fixedtransactionbody_tx_hash: xS,
    fixedtxwitnessesset_add_bootstrap_witness: Gi,
    fixedtxwitnessesset_add_vkey_witness: Mi,
    fixedtxwitnessesset_from_bytes: Ai,
    fixedtxwitnessesset_to_bytes: Hi,
    fixedtxwitnessesset_tx_witnesses_set: Wi,
    fixedversionedblock_block: eq,
    fixedversionedblock_era: rq,
    fixedversionedblock_from_bytes: tq,
    fixedversionedblock_from_hex: _q,
    generaltransactionmetadata_from_bytes: Pz,
    generaltransactionmetadata_from_hex: tF,
    generaltransactionmetadata_from_json: rF,
    generaltransactionmetadata_get: sF,
    generaltransactionmetadata_insert: aF,
    generaltransactionmetadata_keys: iF,
    generaltransactionmetadata_len: oF,
    generaltransactionmetadata_new: nF,
    generaltransactionmetadata_to_bytes: Vz,
    generaltransactionmetadata_to_hex: Bz,
    generaltransactionmetadata_to_js_value: eF,
    generaltransactionmetadata_to_json: _F,
    genesisdelegatehash_from_bech32: UW,
    genesisdelegatehash_from_bytes: ZW,
    genesisdelegatehash_from_hex: EW,
    genesisdelegatehash_to_bech32: CM,
    genesisdelegatehash_to_bytes: EM,
    genesisdelegatehash_to_hex: FM,
    genesishash_from_bech32: SW,
    genesishash_from_bytes: KW,
    genesishash_from_hex: WW,
    genesishash_to_bech32: VM,
    genesishash_to_bytes: KM,
    genesishash_to_hex: RM,
    genesishashes_add: ub,
    genesishashes_from_bytes: ib,
    genesishashes_from_hex: cb,
    genesishashes_from_json: bb,
    genesishashes_get: gb,
    genesishashes_len: ou,
    genesishashes_new: lb,
    genesishashes_to_bytes: sb,
    genesishashes_to_hex: db,
    genesishashes_to_js_value: wb,
    genesishashes_to_json: pb,
    genesiskeydelegation_from_bytes: rE,
    genesiskeydelegation_from_hex: oE,
    genesiskeydelegation_from_json: iE,
    genesiskeydelegation_genesis_delegate_hash: cE,
    genesiskeydelegation_genesishash: dE,
    genesiskeydelegation_new: wE,
    genesiskeydelegation_to_bytes: eE,
    genesiskeydelegation_to_hex: nE,
    genesiskeydelegation_to_js_value: sE,
    genesiskeydelegation_to_json: aE,
    genesiskeydelegation_vrf_keyhash: pE,
    get_deposit: i$,
    get_implicit_input: s$,
    governanceaction_as_hard_fork_initiation_action: f4,
    governanceaction_as_info_action: k4,
    governanceaction_as_new_committee_action: v4,
    governanceaction_as_new_constitution_action: m4,
    governanceaction_as_no_confidence_action: y4,
    governanceaction_as_parameter_change_action: u4,
    governanceaction_as_treasury_withdrawals_action: h4,
    governanceaction_from_bytes: e4,
    governanceaction_from_hex: n4,
    governanceaction_from_json: s4,
    governanceaction_kind: g4,
    governanceaction_new_hard_fork_initiation_action: d4,
    governanceaction_new_info_action: l4,
    governanceaction_new_new_committee_action: w4,
    governanceaction_new_new_constitution_action: b4,
    governanceaction_new_no_confidence_action: p4,
    governanceaction_new_parameter_change_action: i4,
    governanceaction_new_treasury_withdrawals_action: c4,
    governanceaction_to_bytes: _4,
    governanceaction_to_hex: r4,
    governanceaction_to_js_value: a4,
    governanceaction_to_json: o4,
    governanceactionid_from_bytes: cK,
    governanceactionid_from_hex: wK,
    governanceactionid_from_json: gK,
    governanceactionid_index: fK,
    governanceactionid_new: hK,
    governanceactionid_to_bytes: dK,
    governanceactionid_to_hex: pK,
    governanceactionid_to_js_value: lK,
    governanceactionid_to_json: bK,
    governanceactionid_transaction_id: uK,
    governanceactionids_add: F1,
    governanceactionids_from_json: j1,
    governanceactionids_get: R1,
    governanceactionids_len: O1,
    governanceactionids_new: z1,
    governanceactionids_to_js_value: x1,
    governanceactionids_to_json: k1,
    hardforkinitiationaction_from_bytes: Jx,
    hardforkinitiationaction_from_hex: Qx,
    hardforkinitiationaction_from_json: Ux,
    hardforkinitiationaction_gov_action_id: Ex,
    hardforkinitiationaction_new: Sx,
    hardforkinitiationaction_new_with_action_id: Wx,
    hardforkinitiationaction_protocol_version: Kx,
    hardforkinitiationaction_to_bytes: Lx,
    hardforkinitiationaction_to_hex: Yx,
    hardforkinitiationaction_to_js_value: Zx,
    hardforkinitiationaction_to_json: Xx,
    has_transaction_set_tag: p$,
    hash_auxiliary_data: n$,
    hash_plutus_data: o$,
    hash_script_data: a$,
    header_body_signature: QS,
    header_from_bytes: RS,
    header_from_hex: qS,
    header_from_json: JS,
    header_header_body: YS,
    header_new: XS,
    header_to_bytes: FS,
    header_to_hex: OS,
    header_to_js_value: LS,
    header_to_json: $S,
    headerbody_block_body_hash: WZ,
    headerbody_block_body_size: SZ,
    headerbody_block_number: qZ,
    headerbody_from_bytes: xZ,
    headerbody_from_hex: zZ,
    headerbody_from_json: OZ,
    headerbody_has_nonce_and_leader_vrf: XZ,
    headerbody_has_vrf_result: EZ,
    headerbody_issuer_vkey: YZ,
    headerbody_leader_vrf_or_nothing: UZ,
    headerbody_new: HZ,
    headerbody_new_headerbody: AZ,
    headerbody_nonce_vrf_or_nothing: ZZ,
    headerbody_operational_cert: MZ,
    headerbody_prev_hash: JZ,
    headerbody_protocol_version: GZ,
    headerbody_slot: $Z,
    headerbody_slot_bignum: LZ,
    headerbody_to_bytes: kZ,
    headerbody_to_hex: jZ,
    headerbody_to_js_value: RZ,
    headerbody_to_json: FZ,
    headerbody_vrf_result_or_nothing: KZ,
    headerbody_vrf_vkey: QZ,
    infoaction_new: nQ,
    int_as_i32: V6,
    int_as_i32_or_fail: B6,
    int_as_i32_or_nothing: P6,
    int_as_negative: C6,
    int_as_positive: N6,
    int_from_bytes: K6,
    int_from_hex: W6,
    int_from_json: H6,
    int_from_str: _x,
    int_is_positive: T6,
    int_new: A6,
    int_new_i32: D6,
    int_new_negative: I6,
    int_to_bytes: E6,
    int_to_hex: S6,
    int_to_js_value: G6,
    int_to_json: M6,
    int_to_str: tx,
    ipv4_from_bytes: Uc,
    ipv4_from_hex: Kc,
    ipv4_from_json: Mc,
    ipv4_ip: Hc,
    ipv4_new: Gc,
    ipv4_to_bytes: Zc,
    ipv4_to_hex: Ec,
    ipv4_to_js_value: Wc,
    ipv4_to_json: Sc,
    ipv6_from_bytes: Dc,
    ipv6_from_hex: Nc,
    ipv6_from_json: Pc,
    ipv6_ip: tp,
    ipv6_new: Bc,
    ipv6_to_bytes: Ic,
    ipv6_to_hex: Tc,
    ipv6_to_js_value: Vc,
    ipv6_to_json: Cc,
    kessignature_from_bytes: oS,
    kessignature_to_bytes: nS,
    kesvkey_from_bech32: cM,
    kesvkey_from_bytes: dM,
    kesvkey_from_hex: pM,
    kesvkey_to_bech32: oG,
    kesvkey_to_bytes: DM,
    kesvkey_to_hex: XM,
    language_from_bytes: Gy,
    language_from_hex: Ay,
    language_from_json: Ty,
    language_kind: Py,
    language_new_plutus_v1: Ny,
    language_new_plutus_v2: Cy,
    language_new_plutus_v3: Vy,
    language_to_bytes: My,
    language_to_hex: Hy,
    language_to_js_value: Dy,
    language_to_json: Iy,
    languages_add: c2,
    languages_get: d2,
    languages_len: i2,
    languages_list: p2,
    languages_new: s2,
    legacydaedalusprivatekey_as_bytes: _S,
    legacydaedalusprivatekey_chaincode: eS,
    legacydaedalusprivatekey_from_bytes: tS,
    linearfee_coefficient: dx,
    linearfee_constant: ix,
    linearfee_new: cx,
    make_daedalus_bootstrap_witness: _$,
    make_icarus_bootstrap_witness: e$,
    make_vkey_witness: r$,
    malformedaddress_from_address: Y4,
    malformedaddress_original_bytes: L4,
    malformedaddress_to_address: J4,
    memory: li,
    metadatalist_add: Rz,
    metadatalist_from_bytes: kz,
    metadatalist_from_hex: jz,
    metadatalist_get: Fz,
    metadatalist_len: kR,
    metadatalist_new: zz,
    metadatalist_to_bytes: mz,
    metadatalist_to_hex: xz,
    metadatamap_from_bytes: dz,
    metadatamap_from_hex: pz,
    metadatamap_get: gz,
    metadatamap_get_i32: fz,
    metadatamap_get_str: uz,
    metadatamap_has: hz,
    metadatamap_insert: wz,
    metadatamap_insert_i32: lz,
    metadatamap_insert_str: bz,
    metadatamap_keys: yz,
    metadatamap_len: zR,
    metadatamap_new: LR,
    metadatamap_to_bytes: iz,
    metadatamap_to_hex: cz,
    min_ada_for_output: d$,
    min_fee: px,
    min_ref_script_fee: lx,
    min_script_fee: bx,
    mint_as_negative_multiasset: hg,
    mint_as_positive_multiasset: fg,
    mint_from_bytes: sg,
    mint_from_hex: dg,
    mint_from_json: wg,
    mint_get: gg,
    mint_insert: lg,
    mint_keys: ug,
    mint_len: cu,
    mint_new: Hg,
    mint_new_from_entry: bg,
    mint_to_bytes: ag,
    mint_to_hex: ig,
    mint_to_js_value: pg,
    mint_to_json: cg,
    mintassets_get: rg,
    mintassets_insert: eg,
    mintassets_keys: ng,
    mintassets_len: du,
    mintassets_new: Xg,
    mintassets_new_from_entry: _g,
    mintbuilder_add_asset: fm,
    mintbuilder_build: ym,
    mintbuilder_get_native_scripts: vm,
    mintbuilder_get_plutus_witnesses: mm,
    mintbuilder_get_redeemers: xm,
    mintbuilder_get_ref_inputs: km,
    mintbuilder_has_native_scripts: zm,
    mintbuilder_has_plutus_scripts: jm,
    mintbuilder_new: um,
    mintbuilder_set_asset: hm,
    mintsassets_add: Pl,
    mintsassets_from_json: Vl,
    mintsassets_get: Bl,
    mintsassets_len: iu,
    mintsassets_new: Gg,
    mintsassets_to_js_value: Cl,
    mintsassets_to_json: Nl,
    mintwitness_new_native_script: bm,
    mintwitness_new_plutus_script: lm,
    mirtostakecredentials_from_bytes: ju,
    mirtostakecredentials_from_hex: Fu,
    mirtostakecredentials_from_json: qu,
    mirtostakecredentials_get: Yu,
    mirtostakecredentials_insert: Ju,
    mirtostakecredentials_keys: Qu,
    mirtostakecredentials_len: Lu,
    mirtostakecredentials_new: $u,
    mirtostakecredentials_to_bytes: xu,
    mirtostakecredentials_to_hex: zu,
    mirtostakecredentials_to_js_value: Ou,
    mirtostakecredentials_to_json: Ru,
    moveinstantaneousreward_as_to_other_pot: Du,
    moveinstantaneousreward_as_to_stake_creds: Tu,
    moveinstantaneousreward_from_bytes: Uu,
    moveinstantaneousreward_from_hex: Ku,
    moveinstantaneousreward_from_json: Mu,
    moveinstantaneousreward_kind: Iu,
    moveinstantaneousreward_new_to_other_pot: Gu,
    moveinstantaneousreward_new_to_stake_creds: Hu,
    moveinstantaneousreward_pot: Au,
    moveinstantaneousreward_to_bytes: Zu,
    moveinstantaneousreward_to_hex: Eu,
    moveinstantaneousreward_to_js_value: Wu,
    moveinstantaneousreward_to_json: Su,
    moveinstantaneousrewardscert_from_bytes: lu,
    moveinstantaneousrewardscert_from_hex: uu,
    moveinstantaneousrewardscert_from_json: yu,
    moveinstantaneousrewardscert_move_instantaneous_reward: vu,
    moveinstantaneousrewardscert_new: mu,
    moveinstantaneousrewardscert_to_bytes: bu,
    moveinstantaneousrewardscert_to_hex: gu,
    moveinstantaneousrewardscert_to_js_value: hu,
    moveinstantaneousrewardscert_to_json: fu,
    multiasset_from_bytes: Zl,
    multiasset_from_hex: El,
    multiasset_from_json: Wl,
    multiasset_get: Gl,
    multiasset_get_asset: Al,
    multiasset_insert: Ml,
    multiasset_keys: Il,
    multiasset_len: su,
    multiasset_new: Qg,
    multiasset_set_asset: Hl,
    multiasset_sub: Dl,
    multiasset_to_bytes: Xl,
    multiasset_to_hex: Ul,
    multiasset_to_js_value: Sl,
    multiasset_to_json: Kl,
    multihostname_dns_name: Vp,
    multihostname_from_bytes: Ap,
    multihostname_from_hex: Dp,
    multihostname_from_json: Cp,
    multihostname_new: Pg,
    multihostname_to_bytes: Hp,
    multihostname_to_hex: Ip,
    multihostname_to_js_value: Np,
    multihostname_to_json: Tp,
    nativescript_as_script_all: bX,
    nativescript_as_script_any: lX,
    nativescript_as_script_n_of_k: gX,
    nativescript_as_script_pubkey: wX,
    nativescript_as_timelock_expiry: fX,
    nativescript_as_timelock_start: uX,
    nativescript_from_bytes: PQ,
    nativescript_from_hex: tX,
    nativescript_from_json: rX,
    nativescript_get_required_signers: hX,
    nativescript_hash: nX,
    nativescript_kind: pX,
    nativescript_new_script_all: aX,
    nativescript_new_script_any: sX,
    nativescript_new_script_n_of_k: iX,
    nativescript_new_script_pubkey: oX,
    nativescript_new_timelock_expiry: cX,
    nativescript_new_timelock_start: dX,
    nativescript_to_bytes: VQ,
    nativescript_to_hex: BQ,
    nativescript_to_js_value: eX,
    nativescript_to_json: _X,
    nativescripts_add: kY,
    nativescripts_from_bytes: jY,
    nativescripts_from_hex: FY,
    nativescripts_from_json: qY,
    nativescripts_get: mY,
    nativescripts_len: JY,
    nativescripts_new: vY,
    nativescripts_to_bytes: xY,
    nativescripts_to_hex: zY,
    nativescripts_to_js_value: OY,
    nativescripts_to_json: RY,
    nativescriptsource_get_ref_script_size: Xm,
    nativescriptsource_new: Jm,
    nativescriptsource_new_ref_input: Ym,
    nativescriptsource_set_required_signers: Qm,
    networkid_from_bytes: mg,
    networkid_from_hex: xg,
    networkid_from_json: Fg,
    networkid_kind: qg,
    networkid_mainnet: Og,
    networkid_testnet: Rg,
    networkid_to_bytes: vg,
    networkid_to_hex: kg,
    networkid_to_js_value: zg,
    networkid_to_json: jg,
    networkinfo_mainnet: q4,
    networkinfo_network_id: z4,
    networkinfo_new: j4,
    networkinfo_protocol_magic: F4,
    networkinfo_testnet_preprod: O4,
    networkinfo_testnet_preview: R4,
    newconstitutionaction_constitution: Gj,
    newconstitutionaction_from_bytes: Uj,
    newconstitutionaction_from_hex: Kj,
    newconstitutionaction_from_json: Mj,
    newconstitutionaction_gov_action_id: OR,
    newconstitutionaction_has_script_hash: Ij,
    newconstitutionaction_new: Hj,
    newconstitutionaction_new_with_action_id: Aj,
    newconstitutionaction_to_bytes: Zj,
    newconstitutionaction_to_hex: Ej,
    newconstitutionaction_to_js_value: Wj,
    newconstitutionaction_to_json: Sj,
    noconfidenceaction_from_bytes: ej,
    noconfidenceaction_from_hex: nj,
    noconfidenceaction_from_json: sj,
    noconfidenceaction_gov_action_id: RR,
    noconfidenceaction_new: ij,
    noconfidenceaction_new_with_action_id: dj,
    noconfidenceaction_to_bytes: _j,
    noconfidenceaction_to_hex: rj,
    noconfidenceaction_to_js_value: aj,
    noconfidenceaction_to_json: oj,
    nonce_from_bytes: _d,
    nonce_from_hex: rd,
    nonce_from_json: ad,
    nonce_get_hash: dd,
    nonce_new_from_hash: id,
    nonce_new_identity: sd,
    nonce_to_bytes: td,
    nonce_to_hex: ed,
    nonce_to_js_value: od,
    nonce_to_json: nd,
    operationalcert_from_bytes: TZ,
    operationalcert_from_hex: CZ,
    operationalcert_from_json: BZ,
    operationalcert_hot_vkey: tU,
    operationalcert_kes_period: eU,
    operationalcert_new: nU,
    operationalcert_sequence_number: _U,
    operationalcert_sigma: rU,
    operationalcert_to_bytes: DZ,
    operationalcert_to_hex: NZ,
    operationalcert_to_js_value: PZ,
    operationalcert_to_json: VZ,
    outputdatum_data: Tw,
    outputdatum_data_hash: Dw,
    outputdatum_new_data: Iw,
    outputdatum_new_data_hash: Aw,
    parameterchangeaction_from_bytes: fx,
    parameterchangeaction_from_hex: yx,
    parameterchangeaction_from_json: kx,
    parameterchangeaction_gov_action_id: xx,
    parameterchangeaction_new: Fx,
    parameterchangeaction_new_with_action_id: Rx,
    parameterchangeaction_new_with_policy_hash: Ox,
    parameterchangeaction_new_with_policy_hash_and_action_id: qx,
    parameterchangeaction_policy_hash: zx,
    parameterchangeaction_protocol_param_updates: jx,
    parameterchangeaction_to_bytes: ux,
    parameterchangeaction_to_hex: hx,
    parameterchangeaction_to_js_value: mx,
    parameterchangeaction_to_json: vx,
    plutusdata_as_address: C2,
    plutusdata_as_bytes: T2,
    plutusdata_as_constr_plutus_data: H2,
    plutusdata_as_integer: D2,
    plutusdata_as_list: I2,
    plutusdata_as_map: A2,
    plutusdata_from_address: N2,
    plutusdata_from_bytes: Y2,
    plutusdata_from_hex: X2,
    plutusdata_from_json: hR,
    plutusdata_kind: G2,
    plutusdata_new_bytes: M2,
    plutusdata_new_constr_plutus_data: Z2,
    plutusdata_new_empty_constr_plutus_data: U2,
    plutusdata_new_integer: W2,
    plutusdata_new_list: S2,
    plutusdata_new_map: K2,
    plutusdata_new_single_value_constr_plutus_data: E2,
    plutusdata_to_bytes: J2,
    plutusdata_to_hex: Q2,
    plutusdata_to_json: FR,
    plutuslist_add: nz,
    plutuslist_from_bytes: B2,
    plutuslist_from_hex: _z,
    plutuslist_get: rz,
    plutuslist_len: vR,
    plutuslist_new: ez,
    plutuslist_to_bytes: P2,
    plutuslist_to_hex: tz,
    plutusmap_from_bytes: z2,
    plutusmap_from_hex: R2,
    plutusmap_get: q2,
    plutusmap_insert: O2,
    plutusmap_keys: $2,
    plutusmap_len: mR,
    plutusmap_new: $R,
    plutusmap_to_bytes: j2,
    plutusmap_to_hex: F2,
    plutusmapvalues_add: k2,
    plutusmapvalues_get: m2,
    plutusmapvalues_len: yR,
    plutusmapvalues_new: JR,
    plutusscript_bytes: tY,
    plutusscript_from_bytes: DJ,
    plutusscript_from_bytes_v2: _Y,
    plutusscript_from_bytes_v3: eY,
    plutusscript_from_bytes_with_version: rY,
    plutusscript_from_hex: NJ,
    plutusscript_from_hex_with_version: nY,
    plutusscript_hash: oY,
    plutusscript_language_version: aY,
    plutusscript_new: CJ,
    plutusscript_new_v2: VJ,
    plutusscript_new_v3: PJ,
    plutusscript_new_with_version: BJ,
    plutusscript_to_bytes: IJ,
    plutusscript_to_hex: TJ,
    plutusscripts_add: V1,
    plutusscripts_from_bytes: G1,
    plutusscripts_from_hex: A1,
    plutusscripts_from_json: T1,
    plutusscripts_get: C1,
    plutusscripts_len: m0,
    plutusscripts_new: N1,
    plutusscripts_to_bytes: M1,
    plutusscripts_to_hex: H1,
    plutusscripts_to_js_value: D1,
    plutusscripts_to_json: I1,
    plutusscriptsource_get_ref_script_size: $m,
    plutusscriptsource_new: Rm,
    plutusscriptsource_new_ref_input: Om,
    plutusscriptsource_set_required_signers: qm,
    plutuswitness_datum: Q0,
    plutuswitness_new: q0,
    plutuswitness_new_with_ref: $0,
    plutuswitness_new_with_ref_without_datum: J0,
    plutuswitness_new_without_datum: L0,
    plutuswitness_redeemer: X0,
    plutuswitness_script: Y0,
    plutuswitnesses_add: m$,
    plutuswitnesses_get: v$,
    plutuswitnesses_len: LY,
    plutuswitnesses_new: YY,
    pointer_cert_index: F6,
    pointer_cert_index_bignum: q6,
    pointer_new: k6,
    pointer_new_pointer: x6,
    pointer_slot: j6,
    pointer_slot_bignum: R6,
    pointer_tx_index: z6,
    pointer_tx_index_bignum: O6,
    pointeraddress_from_address: X6,
    pointeraddress_network_id: Z6,
    pointeraddress_new: L6,
    pointeraddress_payment_cred: J6,
    pointeraddress_stake_pointer: Y6,
    pointeraddress_to_address: Q6,
    poolmetadata_from_bytes: gw,
    poolmetadata_from_hex: fw,
    poolmetadata_from_json: vw,
    poolmetadata_new: kw,
    poolmetadata_pool_metadata_hash: mw,
    poolmetadata_to_bytes: lw,
    poolmetadata_to_hex: uw,
    poolmetadata_to_js_value: yw,
    poolmetadata_to_json: hw,
    poolmetadata_url: Cg,
    poolmetadatahash_from_bech32: IW,
    poolmetadatahash_from_bytes: AW,
    poolmetadatahash_from_hex: DW,
    poolmetadatahash_to_bech32: BM,
    poolmetadatahash_to_bytes: WM,
    poolmetadatahash_to_hex: qM,
    poolparams_cost: Of,
    poolparams_from_bytes: yf,
    poolparams_from_hex: mf,
    poolparams_from_json: jf,
    poolparams_margin: qf,
    poolparams_new: Qf,
    poolparams_operator: zf,
    poolparams_pledge: Rf,
    poolparams_pool_metadata: Yf,
    poolparams_pool_owners: Lf,
    poolparams_relays: Jf,
    poolparams_reward_account: $f,
    poolparams_to_bytes: hf,
    poolparams_to_hex: vf,
    poolparams_to_js_value: xf,
    poolparams_to_json: kf,
    poolparams_vrf_keyhash: Ff,
    poolregistration_from_bytes: Cu,
    poolregistration_from_hex: Pu,
    poolregistration_from_json: _f,
    poolregistration_new: rf,
    poolregistration_pool_params: ef,
    poolregistration_to_bytes: Nu,
    poolregistration_to_hex: Vu,
    poolregistration_to_js_value: tf,
    poolregistration_to_json: Bu,
    poolretirement_epoch: GY,
    poolretirement_from_bytes: ZY,
    poolretirement_from_hex: EY,
    poolretirement_from_json: WY,
    poolretirement_new: HY,
    poolretirement_pool_keyhash: MY,
    poolretirement_to_bytes: XY,
    poolretirement_to_hex: UY,
    poolretirement_to_js_value: SY,
    poolretirement_to_json: KY,
    poolvotingthresholds_committee_no_confidence: u$,
    poolvotingthresholds_committee_normal: b$,
    poolvotingthresholds_from_bytes: J9,
    poolvotingthresholds_from_hex: Q9,
    poolvotingthresholds_from_json: U9,
    poolvotingthresholds_hard_fork_initiation: f$,
    poolvotingthresholds_motion_no_confidence: w$,
    poolvotingthresholds_new: E9,
    poolvotingthresholds_security_relevant_threshold: h$,
    poolvotingthresholds_to_bytes: L9,
    poolvotingthresholds_to_hex: Y9,
    poolvotingthresholds_to_js_value: Z9,
    poolvotingthresholds_to_json: X9,
    privatekey_as_bytes: p0,
    privatekey_from_bech32: b0,
    privatekey_from_extended_bytes: c0,
    privatekey_from_hex: a0,
    privatekey_from_normal_bytes: d0,
    privatekey_generate_ed25519: g0,
    privatekey_generate_ed25519extended: l0,
    privatekey_sign: i0,
    privatekey_to_bech32: w0,
    privatekey_to_hex: s0,
    privatekey_to_public: u0,
    proposedprotocolparameterupdates_from_bytes: Ob,
    proposedprotocolparameterupdates_from_hex: $b,
    proposedprotocolparameterupdates_from_json: Yb,
    proposedprotocolparameterupdates_get: Xb,
    proposedprotocolparameterupdates_insert: Qb,
    proposedprotocolparameterupdates_keys: Zb,
    proposedprotocolparameterupdates_len: ru,
    proposedprotocolparameterupdates_new: Ug,
    proposedprotocolparameterupdates_to_bytes: Rb,
    proposedprotocolparameterupdates_to_hex: qb,
    proposedprotocolparameterupdates_to_js_value: Jb,
    proposedprotocolparameterupdates_to_json: Lb,
    protocolparamupdate_ada_per_utxo_byte: B8,
    protocolparamupdate_collateral_percentage: p7,
    protocolparamupdate_committee_term_limit: m7,
    protocolparamupdate_cost_models: _7,
    protocolparamupdate_d: I8,
    protocolparamupdate_drep_deposit: R7,
    protocolparamupdate_drep_inactivity_period: q7,
    protocolparamupdate_drep_voting_thresholds: f7,
    protocolparamupdate_execution_costs: r7,
    protocolparamupdate_expansion_rate: G8,
    protocolparamupdate_extra_entropy: D8,
    protocolparamupdate_from_bytes: u8,
    protocolparamupdate_from_hex: h8,
    protocolparamupdate_from_json: m8,
    protocolparamupdate_governance_action_deposit: z7,
    protocolparamupdate_governance_action_validity_period: x7,
    protocolparamupdate_key_deposit: Y8,
    protocolparamupdate_max_block_body_size: R8,
    protocolparamupdate_max_block_ex_units: s7,
    protocolparamupdate_max_block_header_size: L8,
    protocolparamupdate_max_collateral_inputs: b7,
    protocolparamupdate_max_epoch: U8,
    protocolparamupdate_max_tx_ex_units: o7,
    protocolparamupdate_max_tx_size: q8,
    protocolparamupdate_max_value_size: d7,
    protocolparamupdate_min_committee_size: y7,
    protocolparamupdate_min_pool_cost: V8,
    protocolparamupdate_minfee_a: x8,
    protocolparamupdate_minfee_b: z8,
    protocolparamupdate_n_opt: K8,
    protocolparamupdate_new: J7,
    protocolparamupdate_pool_deposit: X8,
    protocolparamupdate_pool_pledge_influence: W8,
    protocolparamupdate_pool_voting_thresholds: g7,
    protocolparamupdate_protocol_version: N8,
    protocolparamupdate_ref_script_coins_per_byte: L7,
    protocolparamupdate_set_ada_per_utxo_byte: P8,
    protocolparamupdate_set_collateral_percentage: c7,
    protocolparamupdate_set_committee_term_limit: v7,
    protocolparamupdate_set_cost_models: t7,
    protocolparamupdate_set_drep_deposit: F7,
    protocolparamupdate_set_drep_inactivity_period: O7,
    protocolparamupdate_set_drep_voting_thresholds: u7,
    protocolparamupdate_set_execution_costs: e7,
    protocolparamupdate_set_expansion_rate: M8,
    protocolparamupdate_set_governance_action_deposit: j7,
    protocolparamupdate_set_governance_action_validity_period: k7,
    protocolparamupdate_set_key_deposit: J8,
    protocolparamupdate_set_max_block_body_size: F8,
    protocolparamupdate_set_max_block_ex_units: a7,
    protocolparamupdate_set_max_block_header_size: $8,
    protocolparamupdate_set_max_collateral_inputs: w7,
    protocolparamupdate_set_max_epoch: Z8,
    protocolparamupdate_set_max_tx_ex_units: n7,
    protocolparamupdate_set_max_tx_size: O8,
    protocolparamupdate_set_max_value_size: i7,
    protocolparamupdate_set_min_committee_size: h7,
    protocolparamupdate_set_min_pool_cost: C8,
    protocolparamupdate_set_minfee_a: k8,
    protocolparamupdate_set_minfee_b: j8,
    protocolparamupdate_set_n_opt: E8,
    protocolparamupdate_set_pool_deposit: Q8,
    protocolparamupdate_set_pool_pledge_influence: S8,
    protocolparamupdate_set_pool_voting_thresholds: l7,
    protocolparamupdate_set_protocol_version: T8,
    protocolparamupdate_set_ref_script_coins_per_byte: $7,
    protocolparamupdate_set_treasury_growth_rate: H8,
    protocolparamupdate_to_bytes: g8,
    protocolparamupdate_to_hex: f8,
    protocolparamupdate_to_js_value: v8,
    protocolparamupdate_to_json: y8,
    protocolparamupdate_treasury_growth_rate: A8,
    protocolversion_from_bytes: Kb,
    protocolversion_from_hex: Wb,
    protocolversion_from_json: Hb,
    protocolversion_major: Ab,
    protocolversion_minor: Ib,
    protocolversion_new: Db,
    protocolversion_to_bytes: Eb,
    protocolversion_to_hex: Sb,
    protocolversion_to_js_value: Gb,
    protocolversion_to_json: Mb,
    publickey_as_bytes: nW,
    publickey_from_bech32: aW,
    publickey_from_bytes: rW,
    publickey_from_hex: BS,
    publickey_hash: _W,
    publickey_to_bech32: oW,
    publickey_to_hex: tW,
    publickey_verify: eW,
    publickeys_add: o0,
    publickeys_get: n0,
    publickeys_new: r0,
    publickeys_size: j0,
    redeemer_data: R9,
    redeemer_ex_units: O9,
    redeemer_from_bytes: y9,
    redeemer_from_hex: m9,
    redeemer_from_json: j9,
    redeemer_index: F9,
    redeemer_new: q9,
    redeemer_tag: z9,
    redeemer_to_bytes: h9,
    redeemer_to_hex: v9,
    redeemer_to_js_value: x9,
    redeemer_to_json: k9,
    redeemers_add: MK,
    redeemers_from_bytes: QK,
    redeemers_from_hex: ZK,
    redeemers_from_json: KK,
    redeemers_get: WK,
    redeemers_get_container_type: GK,
    redeemers_len: wW,
    redeemers_new: SK,
    redeemers_to_bytes: YK,
    redeemers_to_hex: XK,
    redeemers_to_js_value: EK,
    redeemers_to_json: UK,
    redeemers_total_ex_units: HK,
    redeemertag_from_bytes: bO,
    redeemertag_from_hex: gO,
    redeemertag_from_json: hO,
    redeemertag_kind: zO,
    redeemertag_new_cert: mO,
    redeemertag_new_mint: vO,
    redeemertag_new_reward: kO,
    redeemertag_new_spend: yO,
    redeemertag_new_vote: xO,
    redeemertag_new_voting_proposal: jO,
    redeemertag_to_bytes: wO,
    redeemertag_to_hex: lO,
    redeemertag_to_js_value: fO,
    redeemertag_to_json: uO,
    relay_as_multi_host_name: ww,
    relay_as_single_host_addr: cw,
    relay_as_single_host_name: pw,
    relay_from_bytes: tw,
    relay_from_hex: ew,
    relay_from_json: ow,
    relay_kind: dw,
    relay_new_multi_host_name: iw,
    relay_new_single_host_addr: aw,
    relay_new_single_host_name: sw,
    relay_to_bytes: Bp,
    relay_to_hex: _w,
    relay_to_js_value: nw,
    relay_to_json: rw,
    relays_add: uf,
    relays_from_bytes: af,
    relays_from_hex: df,
    relays_from_json: wf,
    relays_get: gf,
    relays_len: lf,
    relays_new: bf,
    relays_to_bytes: of,
    relays_to_hex: sf,
    relays_to_js_value: pf,
    relays_to_json: cf,
    rewardaddress_from_address: v6,
    rewardaddress_network_id: ax,
    rewardaddress_new: ox,
    rewardaddress_payment_cred: nx,
    rewardaddress_to_address: y6,
    rewardaddresses_add: Jw,
    rewardaddresses_from_bytes: zw,
    rewardaddresses_from_hex: Rw,
    rewardaddresses_from_json: $w,
    rewardaddresses_get: Lw,
    rewardaddresses_len: _u,
    rewardaddresses_new: Wg,
    rewardaddresses_to_bytes: jw,
    rewardaddresses_to_hex: Fw,
    rewardaddresses_to_js_value: qw,
    rewardaddresses_to_json: Ow,
    scriptall_from_bytes: LX,
    scriptall_from_hex: YX,
    scriptall_from_json: ZX,
    scriptall_native_scripts: UX,
    scriptall_new: EX,
    scriptall_to_bytes: $X,
    scriptall_to_hex: JX,
    scriptall_to_js_value: XX,
    scriptall_to_json: QX,
    scriptany_from_bytes: SX,
    scriptany_from_hex: MX,
    scriptany_from_json: AX,
    scriptany_native_scripts: cU,
    scriptany_new: wU,
    scriptany_to_bytes: KX,
    scriptany_to_hex: WX,
    scriptany_to_js_value: HX,
    scriptany_to_json: GX,
    scriptdatahash_from_bech32: nM,
    scriptdatahash_from_bytes: rM,
    scriptdatahash_from_hex: oM,
    scriptdatahash_to_bech32: rG,
    scriptdatahash_to_bytes: AM,
    scriptdatahash_to_hex: YM,
    scripthash_from_bech32: jW,
    scripthash_from_bytes: xW,
    scripthash_from_hex: zW,
    scripthash_to_bech32: TM,
    scripthash_to_bytes: ZM,
    scripthash_to_hex: jM,
    scripthashes_add: zb,
    scripthashes_from_bytes: hb,
    scripthashes_from_hex: vb,
    scripthashes_from_json: xb,
    scripthashes_get: jb,
    scripthashes_len: eu,
    scripthashes_new: Mg,
    scripthashes_to_bytes: fb,
    scripthashes_to_hex: yb,
    scripthashes_to_js_value: kb,
    scripthashes_to_json: mb,
    scriptnofk_from_bytes: TX,
    scriptnofk_from_hex: CX,
    scriptnofk_from_json: BX,
    scriptnofk_n: tZ,
    scriptnofk_native_scripts: pU,
    scriptnofk_new: _Z,
    scriptnofk_to_bytes: DX,
    scriptnofk_to_hex: NX,
    scriptnofk_to_js_value: PX,
    scriptnofk_to_json: VX,
    scriptpubkey_addr_keyhash: RX,
    scriptpubkey_from_bytes: mX,
    scriptpubkey_from_hex: xX,
    scriptpubkey_from_json: FX,
    scriptpubkey_new: OX,
    scriptpubkey_to_bytes: vX,
    scriptpubkey_to_hex: kX,
    scriptpubkey_to_js_value: zX,
    scriptpubkey_to_json: jX,
    scriptref_from_bytes: qO,
    scriptref_from_hex: LO,
    scriptref_from_json: QO,
    scriptref_is_native_script: UO,
    scriptref_is_plutus_script: EO,
    scriptref_native_script: KO,
    scriptref_new_native_script: XO,
    scriptref_new_plutus_script: ZO,
    scriptref_plutus_script: SO,
    scriptref_to_bytes: OO,
    scriptref_to_hex: $O,
    scriptref_to_js_value: YO,
    scriptref_to_json: JO,
    scriptref_to_unwrapped_bytes: WO,
    singlehostaddr_from_bytes: jp,
    singlehostaddr_from_hex: Fp,
    singlehostaddr_from_json: qp,
    singlehostaddr_ipv4: Lp,
    singlehostaddr_ipv6: Jp,
    singlehostaddr_new: Yp,
    singlehostaddr_port: $p,
    singlehostaddr_to_bytes: xp,
    singlehostaddr_to_hex: zp,
    singlehostaddr_to_js_value: Op,
    singlehostaddr_to_json: Rp,
    singlehostname_dns_name: Ng,
    singlehostname_from_bytes: Zp,
    singlehostname_from_hex: Ep,
    singlehostname_from_json: Wp,
    singlehostname_new: Gp,
    singlehostname_port: Mp,
    singlehostname_to_bytes: Xp,
    singlehostname_to_hex: Up,
    singlehostname_to_js_value: Sp,
    singlehostname_to_json: Kp,
    stakeandvotedelegation_drep: ch,
    stakeandvotedelegation_from_bytes: eh,
    stakeandvotedelegation_from_hex: nh,
    stakeandvotedelegation_from_json: sh,
    stakeandvotedelegation_has_script_credentials: wh,
    stakeandvotedelegation_new: ph,
    stakeandvotedelegation_pool_keyhash: dh,
    stakeandvotedelegation_stake_credential: ih,
    stakeandvotedelegation_to_bytes: _h,
    stakeandvotedelegation_to_hex: rh,
    stakeandvotedelegation_to_js_value: ah,
    stakeandvotedelegation_to_json: oh,
    stakedelegation_from_bytes: Uf,
    stakedelegation_from_hex: Kf,
    stakedelegation_from_json: Mf,
    stakedelegation_has_script_credentials: am,
    stakedelegation_new: Hf,
    stakedelegation_pool_keyhash: Gf,
    stakedelegation_stake_credential: Vv,
    stakedelegation_to_bytes: Zf,
    stakedelegation_to_hex: Ef,
    stakedelegation_to_js_value: Wf,
    stakedelegation_to_json: Sf,
    stakederegistration_coin: ji,
    stakederegistration_from_bytes: fi,
    stakederegistration_from_hex: yi,
    stakederegistration_from_json: ki,
    stakederegistration_has_script_credentials: Ri,
    stakederegistration_new: zi,
    stakederegistration_new_with_explicit_refund: Fi,
    stakederegistration_stake_credential: xi,
    stakederegistration_to_bytes: ui,
    stakederegistration_to_hex: hi,
    stakederegistration_to_js_value: mi,
    stakederegistration_to_json: vi,
    stakeregistration_coin: sO,
    stakeregistration_from_bytes: tO,
    stakeregistration_from_hex: eO,
    stakeregistration_from_json: oO,
    stakeregistration_has_script_credentials: cO,
    stakeregistration_new: iO,
    stakeregistration_new_with_explicit_deposit: dO,
    stakeregistration_stake_credential: aO,
    stakeregistration_to_bytes: B5,
    stakeregistration_to_hex: _O,
    stakeregistration_to_js_value: nO,
    stakeregistration_to_json: rO,
    stakeregistrationanddelegation_coin: tm,
    stakeregistrationanddelegation_from_bytes: gh,
    stakeregistrationanddelegation_from_hex: fh,
    stakeregistrationanddelegation_from_json: vh,
    stakeregistrationanddelegation_has_script_credentials: jh,
    stakeregistrationanddelegation_new: xh,
    stakeregistrationanddelegation_pool_keyhash: kh,
    stakeregistrationanddelegation_stake_credential: mh,
    stakeregistrationanddelegation_to_bytes: lh,
    stakeregistrationanddelegation_to_hex: uh,
    stakeregistrationanddelegation_to_js_value: yh,
    stakeregistrationanddelegation_to_json: hh,
    stakevoteregistrationanddelegation_coin: Pv,
    stakevoteregistrationanddelegation_drep: Qh,
    stakevoteregistrationanddelegation_from_bytes: Rh,
    stakevoteregistrationanddelegation_from_hex: qh,
    stakevoteregistrationanddelegation_from_json: Jh,
    stakevoteregistrationanddelegation_has_script_credentials: Zh,
    stakevoteregistrationanddelegation_new: Xh,
    stakevoteregistrationanddelegation_pool_keyhash: pm,
    stakevoteregistrationanddelegation_stake_credential: Yh,
    stakevoteregistrationanddelegation_to_bytes: Fh,
    stakevoteregistrationanddelegation_to_hex: Oh,
    stakevoteregistrationanddelegation_to_js_value: Lh,
    stakevoteregistrationanddelegation_to_json: $h,
    strings_add: kQ,
    strings_get: mQ,
    strings_len: iU,
    strings_new: vQ,
    timelockexpiry_from_bytes: pZ,
    timelockexpiry_from_hex: bZ,
    timelockexpiry_from_json: uZ,
    timelockexpiry_new: yZ,
    timelockexpiry_new_timelockexpiry: vZ,
    timelockexpiry_slot: fZ,
    timelockexpiry_slot_bignum: hZ,
    timelockexpiry_to_bytes: cZ,
    timelockexpiry_to_hex: wZ,
    timelockexpiry_to_js_value: gZ,
    timelockexpiry_to_json: lZ,
    timelockstart_from_bytes: rZ,
    timelockstart_from_hex: oZ,
    timelockstart_from_json: iZ,
    timelockstart_new: fU,
    timelockstart_new_timelockstart: uU,
    timelockstart_slot: sU,
    timelockstart_slot_bignum: aU,
    timelockstart_to_bytes: eZ,
    timelockstart_to_hex: nZ,
    timelockstart_to_js_value: sZ,
    timelockstart_to_json: aZ,
    transaction_auxiliary_data: Bd,
    transaction_body: Cd,
    transaction_from_bytes: Hd,
    transaction_from_hex: Id,
    transaction_from_json: Nd,
    transaction_is_valid: Pd,
    transaction_new: _c,
    transaction_set_is_valid: tc,
    transaction_to_bytes: Gd,
    transaction_to_hex: Ad,
    transaction_to_js_value: Td,
    transaction_to_json: Dd,
    transaction_witness_set: Vd,
    transactionbatch_get: Mm,
    transactionbatch_len: h0,
    transactionbatchlist_get: Sm,
    transactionbatchlist_len: f0,
    transactionbodies_add: AS,
    transactionbodies_from_bytes: ES,
    transactionbodies_from_hex: SS,
    transactionbodies_from_json: GS,
    transactionbodies_get: HS,
    transactionbodies_len: pW,
    transactionbodies_new: gW,
    transactionbodies_to_bytes: US,
    transactionbodies_to_hex: KS,
    transactionbodies_to_js_value: MS,
    transactionbodies_to_json: WS,
    transactionbody_auxiliary_data_hash: PF,
    transactionbody_certs: IF,
    transactionbody_collateral: c3,
    transactionbody_collateral_return: u3,
    transactionbody_current_treasury_value: F3,
    transactionbody_donation: j3,
    transactionbody_fee: SF,
    transactionbody_from_bytes: JF,
    transactionbody_from_hex: QF,
    transactionbody_from_json: UF,
    transactionbody_inputs: EF,
    transactionbody_mint: n3,
    transactionbody_network_id: l3,
    transactionbody_new: R3,
    transactionbody_new_tx_body: O3,
    transactionbody_outputs: KF,
    transactionbody_reference_inputs: a3,
    transactionbody_remove_ttl: HF,
    transactionbody_required_signers: w3,
    transactionbody_script_data_hash: i3,
    transactionbody_set_auxiliary_data_hash: VF,
    transactionbody_set_certs: AF,
    transactionbody_set_collateral: d3,
    transactionbody_set_collateral_return: g3,
    transactionbody_set_current_treasury_value: z3,
    transactionbody_set_donation: x3,
    transactionbody_set_mint: r3,
    transactionbody_set_network_id: b3,
    transactionbody_set_reference_inputs: o3,
    transactionbody_set_required_signers: p3,
    transactionbody_set_script_data_hash: s3,
    transactionbody_set_total_collateral: f3,
    transactionbody_set_ttl: GF,
    transactionbody_set_update: NF,
    transactionbody_set_validity_start_interval: BF,
    transactionbody_set_validity_start_interval_bignum: t3,
    transactionbody_set_voting_procedures: y3,
    transactionbody_set_voting_proposals: m3,
    transactionbody_set_withdrawals: DF,
    transactionbody_to_bytes: LF,
    transactionbody_to_hex: YF,
    transactionbody_to_js_value: ZF,
    transactionbody_to_json: XF,
    transactionbody_total_collateral: h3,
    transactionbody_ttl: WF,
    transactionbody_ttl_bignum: MF,
    transactionbody_update: CF,
    transactionbody_validity_start_interval: e3,
    transactionbody_validity_start_interval_bignum: _3,
    transactionbody_voting_procedures: v3,
    transactionbody_voting_proposals: k3,
    transactionbody_withdrawals: TF,
    transactionbuilder_add_bootstrap_input: kL,
    transactionbuilder_add_change_if_needed: zJ,
    transactionbuilder_add_change_if_needed_with_datum: FJ,
    transactionbuilder_add_extra_witness_datum: cJ,
    transactionbuilder_add_inputs_from: iL,
    transactionbuilder_add_inputs_from_and_change: jL,
    transactionbuilder_add_inputs_from_and_change_with_collateral_return: zL,
    transactionbuilder_add_json_metadatum: PL,
    transactionbuilder_add_json_metadatum_with_schema: BL,
    transactionbuilder_add_key_input: yL,
    transactionbuilder_add_metadatum: VL,
    transactionbuilder_add_mint_asset: sJ,
    transactionbuilder_add_mint_asset_and_output: iJ,
    transactionbuilder_add_mint_asset_and_output_min_required_coin: dJ,
    transactionbuilder_add_native_script_input: vL,
    transactionbuilder_add_output: qL,
    transactionbuilder_add_plutus_script_input: mL,
    transactionbuilder_add_reference_input: fL,
    transactionbuilder_add_regular_input: xL,
    transactionbuilder_add_required_signer: $J,
    transactionbuilder_add_script_reference_input: hL,
    transactionbuilder_build: YJ,
    transactionbuilder_build_tx: QJ,
    transactionbuilder_build_tx_unsafe: XJ,
    transactionbuilder_calc_script_data_hash: RJ,
    transactionbuilder_fee_for_input: OL,
    transactionbuilder_fee_for_output: $L,
    transactionbuilder_full_size: LJ,
    transactionbuilder_get_auxiliary_data: DL,
    transactionbuilder_get_current_treasury_value: gJ,
    transactionbuilder_get_deposit: xJ,
    transactionbuilder_get_donation: bJ,
    transactionbuilder_get_explicit_input: hJ,
    transactionbuilder_get_explicit_output: kJ,
    transactionbuilder_get_extra_witness_datums: pJ,
    transactionbuilder_get_fee_if_set: jJ,
    transactionbuilder_get_implicit_input: yJ,
    transactionbuilder_get_mint: nJ,
    transactionbuilder_get_mint_builder: eJ,
    transactionbuilder_get_mint_scripts: oJ,
    transactionbuilder_get_native_input_scripts: FL,
    transactionbuilder_get_plutus_input_scripts: RL,
    transactionbuilder_get_reference_inputs: fJ,
    transactionbuilder_get_total_input: vJ,
    transactionbuilder_get_total_output: mJ,
    transactionbuilder_min_fee: ZJ,
    transactionbuilder_new: uJ,
    transactionbuilder_output_sizes: JJ,
    transactionbuilder_remove_auxiliary_data: NL,
    transactionbuilder_remove_certs: SL,
    transactionbuilder_remove_collateral_return: wL,
    transactionbuilder_remove_mint_builder: _J,
    transactionbuilder_remove_script_data_hash: qJ,
    transactionbuilder_remove_total_collateral: gL,
    transactionbuilder_remove_ttl: XL,
    transactionbuilder_remove_validity_start_interval: EL,
    transactionbuilder_remove_withdrawals: IL,
    transactionbuilder_set_auxiliary_data: TL,
    transactionbuilder_set_certs: KL,
    transactionbuilder_set_certs_builder: WL,
    transactionbuilder_set_collateral: cL,
    transactionbuilder_set_collateral_return: pL,
    transactionbuilder_set_collateral_return_and_total: bL,
    transactionbuilder_set_current_treasury_value: lJ,
    transactionbuilder_set_donation: wJ,
    transactionbuilder_set_fee: LL,
    transactionbuilder_set_inputs: dL,
    transactionbuilder_set_metadata: CL,
    transactionbuilder_set_min_fee: JL,
    transactionbuilder_set_mint: rJ,
    transactionbuilder_set_mint_asset: aJ,
    transactionbuilder_set_mint_builder: tJ,
    transactionbuilder_set_script_data_hash: OJ,
    transactionbuilder_set_total_collateral: lL,
    transactionbuilder_set_total_collateral_and_return: uL,
    transactionbuilder_set_ttl: YL,
    transactionbuilder_set_ttl_bignum: QL,
    transactionbuilder_set_validity_start_interval: ZL,
    transactionbuilder_set_validity_start_interval_bignum: UL,
    transactionbuilder_set_voting_builder: HL,
    transactionbuilder_set_voting_proposal_builder: AL,
    transactionbuilder_set_withdrawals: ML,
    transactionbuilder_set_withdrawals_builder: GL,
    transactionbuilderconfigbuilder_build: _L,
    transactionbuilderconfigbuilder_coins_per_utxo_byte: A$,
    transactionbuilderconfigbuilder_deduplicate_explicit_ref_inputs_with_regular_inputs: B$,
    transactionbuilderconfigbuilder_do_not_burn_extra_change: tL,
    transactionbuilderconfigbuilder_ex_unit_prices: I$,
    transactionbuilderconfigbuilder_fee_algo: H$,
    transactionbuilderconfigbuilder_key_deposit: T$,
    transactionbuilderconfigbuilder_max_tx_size: C$,
    transactionbuilderconfigbuilder_max_value_size: N$,
    transactionbuilderconfigbuilder_new: G$,
    transactionbuilderconfigbuilder_pool_deposit: D$,
    transactionbuilderconfigbuilder_prefer_pure_change: P$,
    transactionbuilderconfigbuilder_ref_script_coins_per_byte: V$,
    transactionhash_from_bech32: QW,
    transactionhash_from_bytes: YW,
    transactionhash_from_hex: XW,
    transactionhash_to_bech32: PM,
    transactionhash_to_bytes: SM,
    transactionhash_to_hex: zM,
    transactioninput_from_bytes: IK,
    transactioninput_from_hex: TK,
    transactioninput_from_json: VK,
    transactioninput_index: cW,
    transactioninput_new: bW,
    transactioninput_to_bytes: AK,
    transactioninput_to_hex: DK,
    transactioninput_to_js_value: CK,
    transactioninput_to_json: NK,
    transactioninput_transaction_id: lW,
    transactioninputs_add: ik,
    transactioninputs_from_bytes: tk,
    transactioninputs_from_hex: ek,
    transactioninputs_from_json: ok,
    transactioninputs_get: sk,
    transactioninputs_len: v0,
    transactioninputs_new: ak,
    transactioninputs_to_bytes: B1,
    transactioninputs_to_hex: _k,
    transactioninputs_to_js_value: nk,
    transactioninputs_to_json: rk,
    transactioninputs_to_option: dk,
    transactionmetadatum_as_bytes: Wz,
    transactionmetadatum_as_int: Sz,
    transactionmetadatum_as_list: Kz,
    transactionmetadatum_as_map: Ez,
    transactionmetadatum_as_text: Mz,
    transactionmetadatum_from_bytes: $z,
    transactionmetadatum_from_hex: Jz,
    transactionmetadatum_kind: xR,
    transactionmetadatum_new_bytes: Zz,
    transactionmetadatum_new_int: Xz,
    transactionmetadatum_new_list: Qz,
    transactionmetadatum_new_map: Yz,
    transactionmetadatum_new_text: Uz,
    transactionmetadatum_to_bytes: qz,
    transactionmetadatum_to_hex: Lz,
    transactionmetadatumlabels_add: Nz,
    transactionmetadatumlabels_from_bytes: Az,
    transactionmetadatumlabels_from_hex: Dz,
    transactionmetadatumlabels_get: Tz,
    transactionmetadatumlabels_len: jR,
    transactionmetadatumlabels_new: YR,
    transactionmetadatumlabels_to_bytes: Hz,
    transactionmetadatumlabels_to_hex: Iz,
    transactionoutput_address: kc,
    transactionoutput_amount: xc,
    transactionoutput_data_hash: jc,
    transactionoutput_from_bytes: uc,
    transactionoutput_from_hex: hc,
    transactionoutput_from_json: mc,
    transactionoutput_has_data_hash: Lc,
    transactionoutput_has_plutus_data: $c,
    transactionoutput_has_script_ref: Jc,
    transactionoutput_new: Yc,
    transactionoutput_plutus_data: zc,
    transactionoutput_script_ref: Fc,
    transactionoutput_serialization_format: Qc,
    transactionoutput_set_data_hash: qc,
    transactionoutput_set_plutus_data: Oc,
    transactionoutput_set_script_ref: Rc,
    transactionoutput_to_bytes: gc,
    transactionoutput_to_hex: fc,
    transactionoutput_to_js_value: vc,
    transactionoutput_to_json: yc,
    transactionoutputamountbuilder_build: v1,
    transactionoutputamountbuilder_with_asset_and_min_required_coin_by_utxo_cost: y1,
    transactionoutputamountbuilder_with_coin: f1,
    transactionoutputamountbuilder_with_coin_and_asset: h1,
    transactionoutputamountbuilder_with_value: u1,
    transactionoutputbuilder_new: d1,
    transactionoutputbuilder_next: l1,
    transactionoutputbuilder_with_address: c1,
    transactionoutputbuilder_with_data_hash: p1,
    transactionoutputbuilder_with_plutus_data: w1,
    transactionoutputbuilder_with_script_ref: b1,
    transactionoutputs_add: wc,
    transactionoutputs_from_bytes: nc,
    transactionoutputs_from_hex: ac,
    transactionoutputs_from_json: dc,
    transactionoutputs_get: pc,
    transactionoutputs_len: Vg,
    transactionoutputs_new: cc,
    transactionoutputs_to_bytes: rc,
    transactionoutputs_to_hex: oc,
    transactionoutputs_to_js_value: ic,
    transactionoutputs_to_json: sc,
    transactionunspentoutput_from_bytes: fq,
    transactionunspentoutput_from_hex: yq,
    transactionunspentoutput_from_json: kq,
    transactionunspentoutput_input: jq,
    transactionunspentoutput_new: xq,
    transactionunspentoutput_output: zq,
    transactionunspentoutput_to_bytes: uq,
    transactionunspentoutput_to_hex: hq,
    transactionunspentoutput_to_js_value: mq,
    transactionunspentoutput_to_json: vq,
    transactionunspentoutputs_add: Yq,
    transactionunspentoutputs_from_json: qq,
    transactionunspentoutputs_get: Jq,
    transactionunspentoutputs_len: Lq,
    transactionunspentoutputs_new: $q,
    transactionunspentoutputs_to_js_value: Oq,
    transactionunspentoutputs_to_json: Rq,
    transactionwitnessset_bootstraps: W3,
    transactionwitnessset_from_bytes: L3,
    transactionwitnessset_from_hex: Y3,
    transactionwitnessset_from_json: Z3,
    transactionwitnessset_native_scripts: qR,
    transactionwitnessset_new: T3,
    transactionwitnessset_plutus_data: A3,
    transactionwitnessset_plutus_scripts: G3,
    transactionwitnessset_redeemers: D3,
    transactionwitnessset_set_bootstraps: S3,
    transactionwitnessset_set_native_scripts: K3,
    transactionwitnessset_set_plutus_data: H3,
    transactionwitnessset_set_plutus_scripts: M3,
    transactionwitnessset_set_redeemers: I3,
    transactionwitnessset_set_vkeys: U3,
    transactionwitnessset_to_bytes: $3,
    transactionwitnessset_to_hex: J3,
    transactionwitnessset_to_js_value: X3,
    transactionwitnessset_to_json: Q3,
    transactionwitnessset_vkeys: E3,
    transactionwitnesssets_add: Hk,
    transactionwitnesssets_from_bytes: Zk,
    transactionwitnesssets_from_hex: Ek,
    transactionwitnesssets_from_json: Wk,
    transactionwitnesssets_get: Gk,
    transactionwitnesssets_len: x0,
    transactionwitnesssets_new: Mk,
    transactionwitnesssets_to_bytes: Xk,
    transactionwitnesssets_to_hex: Uk,
    transactionwitnesssets_to_js_value: Sk,
    transactionwitnesssets_to_json: Kk,
    treasurywithdrawals_from_json: SJ,
    treasurywithdrawals_get: MJ,
    treasurywithdrawals_insert: GJ,
    treasurywithdrawals_keys: HJ,
    treasurywithdrawals_len: $Y,
    treasurywithdrawals_new: WJ,
    treasurywithdrawals_to_js_value: KJ,
    treasurywithdrawals_to_json: EJ,
    treasurywithdrawalsaction_from_bytes: Hx,
    treasurywithdrawalsaction_from_hex: Ix,
    treasurywithdrawalsaction_from_json: Nx,
    treasurywithdrawalsaction_new: Px,
    treasurywithdrawalsaction_new_with_policy_hash: Bx,
    treasurywithdrawalsaction_policy_hash: Vx,
    treasurywithdrawalsaction_to_bytes: Gx,
    treasurywithdrawalsaction_to_hex: Ax,
    treasurywithdrawalsaction_to_js_value: Tx,
    treasurywithdrawalsaction_to_json: Dx,
    treasurywithdrawalsaction_withdrawals: Cx,
    txinputsbuilder_add_bootstrap_input: $$,
    txinputsbuilder_add_key_input: R$,
    txinputsbuilder_add_native_script_input: O$,
    txinputsbuilder_add_native_script_utxo: F$,
    txinputsbuilder_add_plutus_script_input: q$,
    txinputsbuilder_add_plutus_script_utxo: z$,
    txinputsbuilder_add_regular_input: L$,
    txinputsbuilder_add_regular_utxo: j$,
    txinputsbuilder_add_required_signer: Z$,
    txinputsbuilder_add_required_signers: U$,
    txinputsbuilder_get_native_input_scripts: Y$,
    txinputsbuilder_get_plutus_input_scripts: Q$,
    txinputsbuilder_get_ref_inputs: J$,
    txinputsbuilder_inputs: K$,
    txinputsbuilder_inputs_option: S$,
    txinputsbuilder_len: X$,
    txinputsbuilder_new: x$,
    txinputsbuilder_total_value: E$,
    unitinterval_denominator: Sd,
    unitinterval_from_bytes: Qd,
    unitinterval_from_hex: Zd,
    unitinterval_from_json: Kd,
    unitinterval_new: Wd,
    unitinterval_numerator: Dg,
    unitinterval_to_bytes: Yd,
    unitinterval_to_hex: Xd,
    unitinterval_to_js_value: Ed,
    unitinterval_to_json: Ud,
    update_epoch: nb,
    update_from_bytes: Vw,
    update_from_hex: Bw,
    update_from_json: eb,
    update_new: ob,
    update_proposed_protocol_parameter_updates: rb,
    update_to_bytes: Cw,
    update_to_hex: Pw,
    update_to_js_value: _b,
    update_to_json: tb,
    updatecommitteeaction_committee: yj,
    updatecommitteeaction_from_bytes: wj,
    updatecommitteeaction_from_hex: lj,
    updatecommitteeaction_from_json: fj,
    updatecommitteeaction_gov_action_id: hj,
    updatecommitteeaction_members_to_remove: vj,
    updatecommitteeaction_new: mj,
    updatecommitteeaction_new_with_action_id: kj,
    updatecommitteeaction_to_bytes: pj,
    updatecommitteeaction_to_hex: bj,
    updatecommitteeaction_to_js_value: uj,
    updatecommitteeaction_to_json: gj,
    url_from_bytes: ep,
    url_from_hex: np,
    url_from_json: op,
    url_new: ap,
    url_to_bytes: _p,
    url_to_hex: rp,
    url_to_js_value: Tg,
    url_to_json: Ag,
    url_url: Kg,
    value_checked_add: Vq,
    value_checked_sub: Pq,
    value_clamped_sub: Bq,
    value_coin: Dq,
    value_compare: t$,
    value_from_bytes: Zq,
    value_from_hex: Eq,
    value_from_json: Wq,
    value_is_zero: Iq,
    value_multiasset: Nq,
    value_new: Mq,
    value_new_from_assets: Gq,
    value_new_with_assets: Hq,
    value_set_coin: Tq,
    value_set_multiasset: Cq,
    value_to_bytes: Xq,
    value_to_hex: Uq,
    value_to_js_value: Sq,
    value_to_json: Kq,
    value_zero: Aq,
    versionedblock_block: bq,
    versionedblock_era: lq,
    versionedblock_from_bytes: aq,
    versionedblock_from_hex: iq,
    versionedblock_from_json: pq,
    versionedblock_new: wq,
    versionedblock_to_bytes: oq,
    versionedblock_to_hex: sq,
    versionedblock_to_js_value: cq,
    versionedblock_to_json: dq,
    vkey_from_bytes: Tk,
    vkey_from_hex: Ck,
    vkey_from_json: Bk,
    vkey_new: t0,
    vkey_public_key: _0,
    vkey_to_bytes: Dk,
    vkey_to_hex: Nk,
    vkey_to_js_value: Pk,
    vkey_to_json: Vk,
    vkeys_add: NQ,
    vkeys_get: TQ,
    vkeys_len: dU,
    vkeys_new: DQ,
    vkeywitness_from_bytes: zQ,
    vkeywitness_from_hex: RQ,
    vkeywitness_from_json: $Q,
    vkeywitness_new: LQ,
    vkeywitness_signature: lU,
    vkeywitness_to_bytes: jQ,
    vkeywitness_to_hex: FQ,
    vkeywitness_to_js_value: qQ,
    vkeywitness_to_json: OQ,
    vkeywitness_vkey: JQ,
    vkeywitnesses_add: mv,
    vkeywitnesses_from_bytes: lv,
    vkeywitnesses_from_hex: uv,
    vkeywitnesses_from_json: yv,
    vkeywitnesses_get: vv,
    vkeywitnesses_len: em,
    vkeywitnesses_new: nm,
    vkeywitnesses_to_bytes: bv,
    vkeywitnesses_to_hex: gv,
    vkeywitnesses_to_js_value: hv,
    vkeywitnesses_to_json: fv,
    votedelegation_drep: dm,
    votedelegation_from_bytes: Df,
    votedelegation_from_hex: Nf,
    votedelegation_from_json: Pf,
    votedelegation_has_script_credentials: om,
    votedelegation_new: Bf,
    votedelegation_stake_credential: Cv,
    votedelegation_to_bytes: If,
    votedelegation_to_hex: Tf,
    votedelegation_to_js_value: Vf,
    votedelegation_to_json: Cf,
    voter_from_bytes: yy,
    voter_from_hex: my,
    voter_from_json: jy,
    voter_has_script_credentials: Jy,
    voter_kind: Oy,
    voter_new_constitutional_committee_hot_credential: zy,
    voter_new_drep_credential: Fy,
    voter_new_stake_pool_key_hash: Ry,
    voter_to_bytes: hy,
    voter_to_constitutional_committee_hot_credential: qy,
    voter_to_drep_credential: $y,
    voter_to_hex: vy,
    voter_to_js_value: xy,
    voter_to_json: ky,
    voter_to_key_hash: Yy,
    voter_to_stake_pool_key_hash: Ly,
    voteregistrationanddelegation_coin: Bv,
    voteregistrationanddelegation_drep: Hh,
    voteregistrationanddelegation_from_bytes: Eh,
    voteregistrationanddelegation_from_hex: Sh,
    voteregistrationanddelegation_from_json: Gh,
    voteregistrationanddelegation_has_script_credentials: sm,
    voteregistrationanddelegation_new: Ah,
    voteregistrationanddelegation_stake_credential: rm,
    voteregistrationanddelegation_to_bytes: Uh,
    voteregistrationanddelegation_to_hex: Kh,
    voteregistrationanddelegation_to_js_value: Mh,
    voteregistrationanddelegation_to_json: Wh,
    voters_add: Ky,
    voters_from_json: Uy,
    voters_get: Sy,
    voters_len: _m,
    voters_new: Ey,
    voters_to_js_value: Zy,
    voters_to_json: Xy,
    votingbuilder_add: TR,
    votingbuilder_add_with_native_script: CR,
    votingbuilder_add_with_plutus_witness: NR,
    votingbuilder_build: _5,
    votingbuilder_get_native_scripts: BR,
    votingbuilder_get_plutus_witnesses: VR,
    votingbuilder_get_ref_inputs: PR,
    votingbuilder_has_plutus_scripts: t5,
    votingbuilder_new: DR,
    votingprocedure_anchor: dW,
    votingprocedure_from_bytes: BE,
    votingprocedure_from_hex: _K,
    votingprocedure_from_json: nK,
    votingprocedure_new: oK,
    votingprocedure_new_with_anchor: aK,
    votingprocedure_to_bytes: PE,
    votingprocedure_to_hex: tK,
    votingprocedure_to_js_value: rK,
    votingprocedure_to_json: eK,
    votingprocedure_vote_kind: sK,
    votingprocedures_from_bytes: DY,
    votingprocedures_from_hex: NY,
    votingprocedures_from_json: PY,
    votingprocedures_get: tQ,
    votingprocedures_get_governance_action_ids_by_voter: eQ,
    votingprocedures_get_voters: _Q,
    votingprocedures_insert: BY,
    votingprocedures_new: bU,
    votingprocedures_to_bytes: IY,
    votingprocedures_to_hex: TY,
    votingprocedures_to_js_value: VY,
    votingprocedures_to_json: CY,
    votingproposal_anchor: e2,
    votingproposal_deposit: n2,
    votingproposal_from_bytes: Nj,
    votingproposal_from_hex: Vj,
    votingproposal_from_json: t2,
    votingproposal_governance_action: _2,
    votingproposal_new: o2,
    votingproposal_reward_account: r2,
    votingproposal_to_bytes: Tj,
    votingproposal_to_hex: Cj,
    votingproposal_to_js_value: Bj,
    votingproposal_to_json: Pj,
    votingproposalbuilder_add: Am,
    votingproposalbuilder_add_with_plutus_witness: Im,
    votingproposalbuilder_build: Cm,
    votingproposalbuilder_get_plutus_witnesses: Dm,
    votingproposalbuilder_get_ref_inputs: Tm,
    votingproposalbuilder_has_plutus_scripts: Nm,
    votingproposalbuilder_new: z0,
    votingproposals_add: E1,
    votingproposals_contains: K1,
    votingproposals_from_bytes: L1,
    votingproposals_from_hex: Y1,
    votingproposals_from_json: Z1,
    votingproposals_get: U1,
    votingproposals_len: y0,
    votingproposals_new: F0,
    votingproposals_to_bytes: $1,
    votingproposals_to_hex: J1,
    votingproposals_to_js_value: X1,
    votingproposals_to_json: Q1,
    votingproposals_to_option: S1,
    vrfcert_from_bytes: X7,
    vrfcert_from_hex: U7,
    vrfcert_from_json: S7,
    vrfcert_new: G7,
    vrfcert_output: W7,
    vrfcert_proof: M7,
    vrfcert_to_bytes: Q7,
    vrfcert_to_hex: Z7,
    vrfcert_to_js_value: K7,
    vrfcert_to_json: E7,
    vrfkeyhash_from_bech32: NW,
    vrfkeyhash_from_bytes: TW,
    vrfkeyhash_from_hex: CW,
    vrfkeyhash_to_bech32: NM,
    vrfkeyhash_to_bytes: UM,
    vrfkeyhash_to_hex: $M,
    vrfvkey_from_bech32: sM,
    vrfvkey_from_bytes: aM,
    vrfvkey_from_hex: iM,
    vrfvkey_to_bech32: nG,
    vrfvkey_to_bytes: IM,
    vrfvkey_to_hex: QM,
    withdrawals_from_bytes: Xw,
    withdrawals_from_hex: Uw,
    withdrawals_from_json: Sw,
    withdrawals_get: Mw,
    withdrawals_insert: Ww,
    withdrawals_keys: Gw,
    withdrawals_len: nu,
    withdrawals_new: Zg,
    withdrawals_to_bytes: Qw,
    withdrawals_to_hex: Zw,
    withdrawals_to_js_value: Kw,
    withdrawals_to_json: Ew,
    withdrawalsbuilder_add: Bm,
    withdrawalsbuilder_add_with_native_script: _1,
    withdrawalsbuilder_add_with_plutus_witness: t1,
    withdrawalsbuilder_build: s1,
    withdrawalsbuilder_get_native_scripts: n1,
    withdrawalsbuilder_get_plutus_witnesses: e1,
    withdrawalsbuilder_get_ref_inputs: r1,
    withdrawalsbuilder_get_total_withdrawals: o1,
    withdrawalsbuilder_has_plutus_scripts: a1,
    withdrawalsbuilder_new: Pm
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  ps(pG);
})();
export {
  L as Address,
  VG as AddressKind,
  A as Anchor,
  le as AnchorDataHash,
  G as AssetName,
  v_ as AssetNames,
  a_ as Assets,
  B as AuxiliaryData,
  ae as AuxiliaryDataHash,
  Qe as AuxiliaryDataSet,
  _r as BaseAddress,
  K as BigInt,
  y as BigNum,
  yt as Bip32PrivateKey,
  m_ as Bip32PublicKey,
  k_ as Block,
  AG as BlockEra,
  bt as BlockHash,
  ut as BootstrapWitness,
  x_ as BootstrapWitnesses,
  ft as ByronAddress,
  DG as ByronAddressType,
  KG as CborContainerType,
  UG as CborSetType,
  Y as Certificate,
  aH as CertificateKind,
  Kt as Certificates,
  or as CertificatesBuilder,
  j_ as ChangeConfig,
  BG as CoinSelectionStrategyCIP2,
  s_ as Committee,
  It as CommitteeColdResign,
  z_ as CommitteeHotAuth,
  Ut as Constitution,
  ge as ConstrPlutusData,
  i_ as CostModel,
  kt as Costmdls,
  _H as CredKind,
  x as Credential,
  Ft as Credentials,
  F_ as DNSRecordAorAAAA,
  R_ as DNSRecordSRV,
  H as DRep,
  O_ as DRepDeregistration,
  sH as DRepKind,
  Dt as DRepRegistration,
  Tt as DRepUpdate,
  q_ as DRepVotingThresholds,
  Ge as DataCost,
  Yt as DataHash,
  Ee as DatumSource,
  q as Ed25519KeyHash,
  P as Ed25519KeyHashes,
  pt as Ed25519Signature,
  er as EnterpriseAddress,
  Rt as ExUnitPrices,
  nt as ExUnits,
  Ke as FixedBlock,
  ce as FixedTransaction,
  ze as FixedTransactionBodies,
  Oe as FixedTransactionBody,
  wr as FixedTxWitnessesSet,
  rr as FixedVersionedBlock,
  d_ as GeneralTransactionMetadata,
  ue as GenesisDelegateHash,
  Qt as GenesisHash,
  we as GenesisHashes,
  $_ as GenesisKeyDelegation,
  rt as GovernanceAction,
  U as GovernanceActionId,
  Se as GovernanceActionIds,
  IG as GovernanceActionKind,
  Nt as HardForkInitiationAction,
  c_ as Header,
  Ct as HeaderBody,
  He as InfoAction,
  X as Int,
  L_ as Ipv4,
  J_ as Ipv6,
  Ae as KESSignature,
  fe as KESVKey,
  D as Language,
  ZG as LanguageKind,
  qe as Languages,
  Ie as LegacyDaedalusPrivateKey,
  De as LinearFee,
  EG as MIRKind,
  nH as MIRPot,
  Y_ as MIRToStakeCredentials,
  br as MalformedAddress,
  HG as MetadataJsonSchema,
  se as MetadataList,
  he as MetadataMap,
  lt as Mint,
  Gt as MintAssets,
  Te as MintBuilder,
  $e as MintWitness,
  We as MintsAssets,
  Vt as MoveInstantaneousReward,
  Q_ as MoveInstantaneousRewardsCert,
  N as MultiAsset,
  X_ as MultiHostName,
  W as NativeScript,
  eH as NativeScriptKind,
  Ht as NativeScriptSource,
  E as NativeScripts,
  Pt as NetworkId,
  TG as NetworkIdKind,
  be as NetworkInfo,
  Bt as NewConstitutionAction,
  t_ as NoConfidenceAction,
  y_ as Nonce,
  p_ as OperationalCert,
  Le as OutputDatum,
  vt as ParameterChangeAction,
  O as PlutusData,
  oH as PlutusDataKind,
  NG as PlutusDatumSchema,
  it as PlutusList,
  ye as PlutusMap,
  Je as PlutusMapValues,
  M as PlutusScript,
  me as PlutusScriptSource,
  St as PlutusScripts,
  tt as PlutusWitness,
  At as PlutusWitnesses,
  Ye as Pointer,
  nr as PointerAddress,
  Z_ as PoolMetadata,
  ve as PoolMetadataHash,
  U_ as PoolParams,
  E_ as PoolRegistration,
  K_ as PoolRetirement,
  S_ as PoolVotingThresholds,
  mt as PrivateKey,
  W_ as ProposedProtocolParameterUpdates,
  ot as ProtocolParamUpdate,
  at as ProtocolVersion,
  Xt as PublicKey,
  iH as PublicKeys,
  st as Redeemer,
  ct as RedeemerTag,
  WG as RedeemerTagKind,
  Wt as Redeemers,
  Zt as Relay,
  tH as RelayKind,
  M_ as Relays,
  T as RewardAddress,
  G_ as RewardAddresses,
  H_ as ScriptAll,
  A_ as ScriptAny,
  u_ as ScriptDataHash,
  Q as ScriptHash,
  SG as ScriptHashNamespace,
  I_ as ScriptHashes,
  D_ as ScriptNOfK,
  T_ as ScriptPubkey,
  xt as ScriptRef,
  MG as ScriptSchema,
  N_ as SingleHostAddr,
  C_ as SingleHostName,
  V_ as StakeAndVoteDelegation,
  P_ as StakeDelegation,
  jt as StakeDeregistration,
  zt as StakeRegistration,
  B_ as StakeRegistrationAndDelegation,
  te as StakeVoteRegistrationAndDelegation,
  lr as Strings,
  __ as TimelockExpiry,
  e_ as TimelockStart,
  Ot as Transaction,
  fr as TransactionBatch,
  hr as TransactionBatchList,
  _e as TransactionBodies,
  V as TransactionBody,
  gr as TransactionBuilder,
  Ce as TransactionBuilderConfig,
  et as TransactionBuilderConfigBuilder,
  dt as TransactionHash,
  Z as TransactionInput,
  S as TransactionInputs,
  J as TransactionMetadatum,
  GG as TransactionMetadatumKind,
  Fe as TransactionMetadatumLabels,
  I as TransactionOutput,
  w_ as TransactionOutputAmountBuilder,
  pe as TransactionOutputBuilder,
  b_ as TransactionOutputs,
  CG as TransactionSetsState,
  qt as TransactionUnspentOutput,
  de as TransactionUnspentOutputs,
  ht as TransactionWitnessSet,
  l_ as TransactionWitnessSets,
  ke as TreasuryWithdrawals,
  r_ as TreasuryWithdrawalsAction,
  Ne as TxInputsBuilder,
  ar as URL,
  k as UnitInterval,
  ee as Update,
  n_ as UpdateCommitteeAction,
  $t as VRFCert,
  f_ as VRFKeyHash,
  ie as VRFVKey,
  R as Value,
  je as VersionedBlock,
  _t as Vkey,
  ur as Vkeys,
  Lt as Vkeywitness,
  re as Vkeywitnesses,
  ne as VoteDelegation,
  rH as VoteKind,
  oe as VoteRegistrationAndDelegation,
  C as Voter,
  PG as VoterKind,
  Me as Voters,
  sr as VotingBuilder,
  gt as VotingProcedure,
  g_ as VotingProcedures,
  Jt as VotingProposal,
  ir as VotingProposalBuilder,
  Et as VotingProposals,
  Mt as Withdrawals,
  dr as WithdrawalsBuilder,
  __tla,
  zs as __wbg_String_91fba7ded13ba54c,
  Cs as __wbg_buffer_12d079cc21e14bdb,
  Ss as __wbg_call_27c0f87801dedf93,
  Ts as __wbg_call_b3ca7c6051f9bec1,
  ri as __wbg_call_eae29933372a39be,
  Rs as __wbg_crypto_1d1f22824a6a080c,
  si as __wbg_crypto_e95a6e54c5c2e37f,
  ci as __wbg_getRandomValues_02639197c8166a96,
  Qs as __wbg_getRandomValues_3aa56aa6edec874c,
  ii as __wbg_getRandomValues_dc67302a7bd1aec5,
  Hs as __wbg_globalThis_d1e6af4856ba331b,
  As as __wbg_global_207b558942527489,
  Ys as __wbg_msCrypto_eb05e62b530a1508,
  Zs as __wbg_new_16b304a2cfa7ff4a,
  Ps as __wbg_new_63b92bc8671ed464,
  Ws as __wbg_new_72fb9a18b5ae2624,
  ei as __wbg_new_d87f272aec784ec0,
  Ks as __wbg_new_d9bc3a0147634640,
  Es as __wbg_newnoargs_e258087cd0daa0ea,
  Vs as __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb,
  ti as __wbg_newwithlength_e9b4878cebadb3d3,
  $s as __wbg_node_104a2ff8d6ea03a2,
  Os as __wbg_process_4a72847cc503995b,
  Xs as __wbg_randomFillSync_5c9c955aa56b6049,
  di as __wbg_randomFillSync_dd2297de5917c74e,
  ai as __wbg_require_0993fe224bf8e202,
  Js as __wbg_require_cca90b1a94a0255b,
  Ms as __wbg_self_ce0dbfc45cf2f5be,
  oi as __wbg_self_e0b3266d2d9eba1a,
  Fs as __wbg_set_20cbc34131e76824,
  Ns as __wbg_set_8417257aaedc936b,
  Bs as __wbg_set_a47bac70306a19a7,
  Ds as __wbg_set_d4638f722068f043,
  ps as __wbg_set_wasm,
  _i as __wbg_subarray_a1f73cd4b5b42fe1,
  qs as __wbg_versions_f686565e586dd935,
  Gs as __wbg_window_c6fb939a7f436783,
  pi as __wbindgen_debug_string,
  ms as __wbindgen_error_new,
  Us as __wbindgen_is_function,
  js as __wbindgen_is_object,
  Ls as __wbindgen_is_string,
  Is as __wbindgen_is_undefined,
  ni as __wbindgen_jsval_eq,
  bi as __wbindgen_memory,
  hs as __wbindgen_number_new,
  xs as __wbindgen_object_clone_ref,
  ys as __wbindgen_object_drop_ref,
  ks as __wbindgen_string_get,
  vs as __wbindgen_string_new,
  wi as __wbindgen_throw,
  lG as calculate_ex_units_ceil_cost,
  wG as create_send_all,
  vG as decode_arbitrary_bytes_from_metadatum,
  kG as decode_metadatum_to_json_str,
  hG as decode_plutus_datum_to_json_str,
  jG as decrypt_with_password,
  yG as encode_arbitrary_bytes_as_metadatum,
  mG as encode_json_str_to_metadatum,
  QG as encode_json_str_to_native_script,
  fG as encode_json_str_to_plutus_datum,
  xG as encrypt_with_password,
  JG as get_deposit,
  LG as get_implicit_input,
  XG as has_transaction_set_tag,
  OG as hash_auxiliary_data,
  qG as hash_plutus_data,
  $G as hash_script_data,
  zG as make_daedalus_bootstrap_witness,
  FG as make_icarus_bootstrap_witness,
  RG as make_vkey_witness,
  YG as min_ada_for_output,
  bG as min_fee,
  uG as min_ref_script_fee,
  gG as min_script_fee
};
