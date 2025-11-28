let L, VG, A, le, G, v_, a_, B, ae, Qe, _r, K, y, yt, m_, k_, aH, bt, ut, x_, ft, HG, MG, tH, Y, WG, Kt, or, j_, GG, s_, It, z_, Ut, ge, i_, kt, nH, x, Ft, F_, R_, H, O_, TG, Dt, Tt, q_, Ge, Yt, Ee, q, P, pt, er, Rt, nt, Ke, ce, ze, Oe, wr, rr, d_, ue, Qt, we, $_, rt, U, Se, IG, Nt, c_, Ct, He, X, L_, J_, Ae, fe, D, CG, qe, Ie, De, DG, KG, Y_, br, rH, se, he, lt, Gt, Te, $e, We, Vt, Q_, N, X_, W, _H, Ht, E, Pt, UG, be, Bt, t_, y_, p_, Le, vt, O, EG, eH, it, ye, Je, M, me, St, tt, At, Ye, nr, Z_, ve, U_, E_, K_, S_, mt, W_, ot, at, Xt, iH, st, ct, AG, Wt, Zt, PG, M_, T, G_, H_, A_, u_, Q, oH, I_, D_, T_, xt, sH, N_, C_, V_, P_, jt, zt, B_, te, lr, __, e_, Ot, fr, hr, _e, V, gr, Ce, et, dt, Z, S, J, NG, Fe, I, w_, pe, b_, SG, qt, de, ht, l_, ke, r_, Ne, ar, k, ee, n_, $t, f_, ie, R, je, _t, ur, Lt, re, ne, BG, oe, C, ZG, Me, sr, gt, g_, Jt, ir, Et, Mt, dr, zs, Cs, Ss, Ts, ri, Rs, si, ci, Xs, ii, Hs, As, Ys, Zs, Ps, Ws, ei, Ks, Es, Vs, ti, $s, Os, Qs, di, ai, Js, Ms, oi, Fs, Ns, Bs, Ds, ps, _i, qs, Gs, pi, ks, Us, js, Ls, Is, ni, bi, hs, xs, ys, ms, vs, wi, bG, XG, yG, mG, fG, QG, hG, vG, LG, uG, YG, qG, OG, JG, zG, FG, RG, kG, xG, jG, $G, wG, gG, lG;
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
  wG = function(b, t) {
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
  bG = function(b, t) {
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
  lG = function(b, t) {
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
  gG = function(b, t) {
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
  uG = function(b, t) {
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
  fG = function(b, t) {
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
  hG = function(b) {
    const t = h(b, _.__wbindgen_malloc), e = g, a = _.encode_arbitrary_bytes_as_metadatum(t, e);
    return J.__wrap(a);
  };
  yG = function(b) {
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
  vG = function(b, t) {
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
  mG = function(b, t) {
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
  function us(b, t) {
    const e = t(b.length * 4, 4) >>> 0;
    return es().set(b, e / 4), g = b.length, e;
  }
  kG = function(b, t, e) {
    w(b, dt), w(t, ft), w(e, Ie);
    const a = _.make_daedalus_bootstrap_witness(b.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
    return ut.__wrap(a);
  };
  xG = function(b, t, e) {
    w(b, dt), w(t, ft), w(e, yt);
    const a = _.make_icarus_bootstrap_witness(b.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr);
    return ut.__wrap(a);
  };
  jG = function(b, t) {
    w(b, dt), w(t, mt);
    const e = _.make_vkey_witness(b.__wbg_ptr, t.__wbg_ptr);
    return Lt.__wrap(e);
  };
  zG = function(b) {
    w(b, B);
    const t = _.hash_auxiliary_data(b.__wbg_ptr);
    return ae.__wrap(t);
  };
  FG = function(b) {
    w(b, O);
    const t = _.hash_plutus_data(b.__wbg_ptr);
    return Yt.__wrap(t);
  };
  RG = function(b, t, e) {
    w(b, Wt), w(t, kt);
    let a = 0;
    wt(e) || (w(e, it), a = e.__destroy_into_raw());
    const n = _.hash_script_data(b.__wbg_ptr, t.__wbg_ptr, a);
    return u_.__wrap(n);
  };
  OG = function(b, t, e) {
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
  qG = function(b, t, e) {
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
  $G = function(b, t) {
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
  LG = function(b, t, e) {
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
  JG = function(b) {
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
  YG = function(b, t, e, a) {
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
  QG = function(b, t) {
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
  XG = function(b, t, e) {
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
  function h_(b, t) {
    try {
      return b.apply(this, t);
    } catch (e) {
      _.__wbindgen_exn_store($(e));
    }
  }
  let yr;
  ZG = Object.freeze({
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
  UG = Object.freeze({
    Testnet: 0,
    0: "Testnet",
    Mainnet: 1,
    1: "Mainnet"
  });
  EG = Object.freeze({
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
  KG = Object.freeze({
    Reserves: 0,
    0: "Reserves",
    Treasury: 1,
    1: "Treasury"
  });
  SG = Object.freeze({
    AllSetsHaveTag: 0,
    0: "AllSetsHaveTag",
    AllSetsHaveNoTag: 1,
    1: "AllSetsHaveNoTag",
    MixedSets: 2,
    2: "MixedSets"
  });
  WG = Object.freeze({
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
  MG = Object.freeze({
    Array: 0,
    0: "Array",
    Map: 1,
    1: "Map"
  });
  GG = Object.freeze({
    LargestFirst: 0,
    0: "LargestFirst",
    RandomImprove: 1,
    1: "RandomImprove",
    LargestFirstMultiAsset: 2,
    2: "LargestFirstMultiAsset",
    RandomImproveMultiAsset: 3,
    3: "RandomImproveMultiAsset"
  });
  HG = Object.freeze({
    ATPubKey: 0,
    0: "ATPubKey",
    ATScript: 1,
    1: "ATScript",
    ATRedeem: 2,
    2: "ATRedeem"
  });
  AG = Object.freeze({
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
    ToOtherPot: 0,
    0: "ToOtherPot",
    ToStakeCredentials: 1,
    1: "ToStakeCredentials"
  });
  TG = Object.freeze({
    KeyHash: 0,
    0: "KeyHash",
    ScriptHash: 1,
    1: "ScriptHash",
    AlwaysAbstain: 2,
    2: "AlwaysAbstain",
    AlwaysNoConfidence: 3,
    3: "AlwaysNoConfidence"
  });
  NG = Object.freeze({
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
  CG = Object.freeze({
    PlutusV1: 0,
    0: "PlutusV1",
    PlutusV2: 1,
    1: "PlutusV2",
    PlutusV3: 2,
    2: "PlutusV3"
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
    SingleHostAddr: 0,
    0: "SingleHostAddr",
    SingleHostName: 1,
    1: "SingleHostName",
    MultiHostName: 2,
    2: "MultiHostName"
  });
  BG = Object.freeze({
    No: 0,
    0: "No",
    Yes: 1,
    1: "Yes",
    Abstain: 2,
    2: "Abstain"
  });
  tH = Object.freeze({
    Tagged: 0,
    0: "Tagged",
    Untagged: 1,
    1: "Untagged"
  });
  _H = Object.freeze({
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
  eH = Object.freeze({
    BasicConversions: 0,
    0: "BasicConversions",
    DetailedSchema: 1,
    1: "DetailedSchema"
  });
  rH = Object.freeze({
    NoConversions: 0,
    0: "NoConversions",
    BasicConversions: 1,
    1: "BasicConversions",
    DetailedSchema: 2,
    2: "DetailedSchema"
  });
  nH = Object.freeze({
    Key: 0,
    0: "Key",
    Script: 1,
    1: "Script"
  });
  oH = Object.freeze({
    NativeScript: 0,
    0: "NativeScript",
    PlutusScript: 1,
    1: "PlutusScript",
    PlutusScriptV2: 2,
    2: "PlutusScriptV2",
    PlutusScriptV3: 3,
    3: "PlutusScriptV3"
  });
  aH = Object.freeze({
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
  sH = Object.freeze({
    Wallet: 0,
    0: "Wallet",
    Node: 1,
    1: "Node"
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
      return _.assets_len(this.__wbg_ptr) >>> 0;
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
      return _.credential_kind(this.__wbg_ptr);
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
      const e = _.datacost_new_coins_per_byte(t.__wbg_ptr);
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
      const t = _.ed25519keyhashes_new();
      return P.__wrap(t);
    }
    len() {
      return _.ed25519keyhashes_len(this.__wbg_ptr) >>> 0;
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
      return _.genesishashes_len(this.__wbg_ptr) >>> 0;
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
      return _.metadatalist_len(this.__wbg_ptr) >>> 0;
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
      return _.mint_len(this.__wbg_ptr) >>> 0;
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
      return _.assets_len(this.__wbg_ptr) >>> 0;
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
      return _.assets_len(this.__wbg_ptr) >>> 0;
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
      return _.nativescripts_len(this.__wbg_ptr) >>> 0;
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
      const t = _.noconfidenceaction_gov_action_id(this.__wbg_ptr);
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
      return _.plutuslist_len(this.__wbg_ptr) >>> 0;
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
      const t = _.plutusmapvalues_new();
      return Je.__wrap(t);
    }
    len() {
      return _.plutuslist_len(this.__wbg_ptr) >>> 0;
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
      return _.plutusscripts_len(this.__wbg_ptr) >>> 0;
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
      const t = _.fixedtransactionbodies_new();
      return At.__wrap(t);
    }
    len() {
      return _.plutuswitnesses_len(this.__wbg_ptr) >>> 0;
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
      return _.publickeys_size(this.__wbg_ptr) >>> 0;
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
      return _.redeemers_len(this.__wbg_ptr) >>> 0;
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
      return _.rewardaddresses_len(this.__wbg_ptr) >>> 0;
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
      return _.genesishashes_len(this.__wbg_ptr) >>> 0;
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
      const t = _.committeehotauth_committee_cold_credential(this.__wbg_ptr);
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
      return _.committeehotauth_has_script_credentials(this.__wbg_ptr) !== 0;
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
      const t = _.stakedelegation_stake_credential(this.__wbg_ptr);
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
      return _.stakedelegation_has_script_credentials(this.__wbg_ptr) !== 0;
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
      const t = _.stakeregistrationanddelegation_coin(this.__wbg_ptr);
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
      const t = _.stakeregistrationanddelegation_coin(this.__wbg_ptr);
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
      return _.strings_len(this.__wbg_ptr) >>> 0;
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
      return _.transactionbatch_len(this.__wbg_ptr) >>> 0;
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
      return _.transactionbatchlist_len(this.__wbg_ptr) >>> 0;
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
      return _.transactionbodies_len(this.__wbg_ptr) >>> 0;
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
      return _.transactioninputs_len(this.__wbg_ptr) >>> 0;
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
      return _.transactionmetadatum_kind(this.__wbg_ptr);
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
      const t = _.plutusmapvalues_new();
      return Fe.__wrap(t);
    }
    len() {
      return _.transactionmetadatumlabels_len(this.__wbg_ptr) >>> 0;
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
      return _.transactionoutputs_len(this.__wbg_ptr) >>> 0;
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
      const t = _.transactionwitnessset_native_scripts(this.__wbg_ptr);
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
      const t = _.fixedtransactionbodies_new();
      return l_.__wrap(t);
    }
    len() {
      return _.transactionwitnesssets_len(this.__wbg_ptr) >>> 0;
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
      return _.treasurywithdrawals_len(this.__wbg_ptr) >>> 0;
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
      const t = _.publickeys_new();
      return ur.__wrap(t);
    }
    len() {
      return _.publickeys_size(this.__wbg_ptr) >>> 0;
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
      const t = _.vkeywitness_signature(this.__wbg_ptr);
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
      const t = _.committeehotauth_committee_cold_credential(this.__wbg_ptr);
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
      return _.committeehotauth_has_script_credentials(this.__wbg_ptr) !== 0;
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
      const t = _.voteregistrationanddelegation_stake_credential(this.__wbg_ptr);
      return x.__wrap(t);
    }
    drep() {
      const t = _.voteregistrationanddelegation_drep(this.__wbg_ptr);
      return H.__wrap(t);
    }
    coin() {
      const t = _.stakeregistrationanddelegation_coin(this.__wbg_ptr);
      return y.__wrap(t);
    }
    static new(t, e, a) {
      w(t, x), w(e, H), w(a, y);
      const n = _.voteregistrationanddelegation_new(t.__wbg_ptr, e.__wbg_ptr, a.__wbg_ptr);
      return oe.__wrap(n);
    }
    has_script_credentials() {
      return _.voteregistrationanddelegation_has_script_credentials(this.__wbg_ptr) !== 0;
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
      return _.voters_len(this.__wbg_ptr) >>> 0;
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
      const t = _.treasurywithdrawals_new();
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
      const t = _.votingbuilder_new();
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
      const t = _.certificates_new();
      return Et.__wrap(t);
    }
    len() {
      return _.certificates_len(this.__wbg_ptr) >>> 0;
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
      const t = _.mintbuilder_new();
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
    const e = F(t), a = typeof e == "string" ? e : void 0;
    var n = wt(a) ? 0 : u(a, _.__wbindgen_malloc, _.__wbindgen_realloc), r = g;
    o()[b / 4 + 1] = r, o()[b / 4 + 0] = n;
  };
  ks = function(b, t) {
    const e = new Error(f(b, t));
    return $(e);
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
      F(b).randomFillSync(c(t));
    }, arguments);
  };
  Xs = function() {
    return h_(function(b, t) {
      F(b).getRandomValues(F(t));
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
      __wbindgen_string_get: ms,
      __wbindgen_error_new: ks,
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
      __wbg_randomFillSync_5c9c955aa56b6049: Qs,
      __wbg_getRandomValues_3aa56aa6edec874c: Xs,
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
  }, ds), li = s.memory, gi = s.__wbg_moveinstantaneousrewardscert_free, ui = s.moveinstantaneousrewardscert_to_bytes, fi = s.moveinstantaneousrewardscert_from_bytes, hi = s.moveinstantaneousrewardscert_to_hex, yi = s.moveinstantaneousrewardscert_from_hex, vi = s.moveinstantaneousrewardscert_to_json, mi = s.moveinstantaneousrewardscert_to_js_value, ki = s.moveinstantaneousrewardscert_from_json, xi = s.moveinstantaneousrewardscert_move_instantaneous_reward, ji = s.moveinstantaneousrewardscert_new, zi = s.__wbg_mirtostakecredentials_free, Fi = s.mirtostakecredentials_to_bytes, Ri = s.mirtostakecredentials_from_bytes, Oi = s.mirtostakecredentials_to_hex, qi = s.mirtostakecredentials_from_hex, $i = s.mirtostakecredentials_to_json, Li = s.mirtostakecredentials_to_js_value, Ji = s.mirtostakecredentials_from_json, Yi = s.mirtostakecredentials_new, Qi = s.mirtostakecredentials_len, Xi = s.mirtostakecredentials_insert, Zi = s.mirtostakecredentials_get, Ui = s.mirtostakecredentials_keys, Ei = s.__wbg_moveinstantaneousreward_free, Ki = s.moveinstantaneousreward_to_bytes, Si = s.moveinstantaneousreward_from_bytes, Wi = s.moveinstantaneousreward_to_hex, Mi = s.moveinstantaneousreward_from_hex, Gi = s.moveinstantaneousreward_to_json, Hi = s.moveinstantaneousreward_to_js_value, Ai = s.moveinstantaneousreward_from_json, Ii = s.moveinstantaneousreward_new_to_other_pot, Di = s.moveinstantaneousreward_new_to_stake_creds, Ti = s.moveinstantaneousreward_pot, Ni = s.moveinstantaneousreward_kind, Ci = s.moveinstantaneousreward_as_to_other_pot, Vi = s.moveinstantaneousreward_as_to_stake_creds, Pi = s.poolregistration_to_bytes, Bi = s.poolregistration_from_bytes, td = s.poolregistration_to_hex, _d = s.poolregistration_from_hex, ed = s.poolregistration_to_json, rd = s.poolregistration_to_js_value, nd = s.poolregistration_from_json, od = s.poolregistration_pool_params, ad = s.poolregistration_new, sd = s.__wbg_relays_free, id = s.relays_to_bytes, dd = s.relays_from_bytes, cd = s.relays_to_hex, pd = s.relays_from_hex, wd = s.relays_to_json, bd = s.relays_to_js_value, ld = s.relays_from_json, gd = s.relays_new, ud = s.relays_len, fd = s.relays_get, hd = s.relays_add, yd = s.__wbg_poolparams_free, vd = s.poolparams_to_bytes, md = s.poolparams_from_bytes, kd = s.poolparams_to_hex, xd = s.poolparams_from_hex, jd = s.poolparams_to_json, zd = s.poolparams_to_js_value, Fd = s.poolparams_from_json, Rd = s.poolparams_operator, Od = s.poolparams_vrf_keyhash, qd = s.poolparams_pledge, $d = s.poolparams_cost, Ld = s.poolparams_margin, Jd = s.poolparams_reward_account, Yd = s.poolparams_pool_owners, Qd = s.poolparams_relays, Xd = s.poolparams_pool_metadata, Zd = s.poolparams_new, Ud = s.votedelegation_to_bytes, Ed = s.votedelegation_from_bytes, Kd = s.votedelegation_to_hex, Sd = s.votedelegation_from_hex, Wd = s.votedelegation_to_json, Md = s.votedelegation_to_js_value, Gd = s.votedelegation_from_json, Hd = s.votedelegation_new, Ad = s.__wbg_stakeandvotedelegation_free, Id = s.stakeandvotedelegation_to_bytes, Dd = s.stakeandvotedelegation_from_bytes, Td = s.stakeandvotedelegation_to_hex, Nd = s.stakeandvotedelegation_from_hex, Cd = s.stakeandvotedelegation_to_json, Vd = s.stakeandvotedelegation_to_js_value, Pd = s.stakeandvotedelegation_from_json, Bd = s.stakeandvotedelegation_pool_keyhash, tc = s.stakeandvotedelegation_drep, _c = s.stakeandvotedelegation_new, ec = s.__wbg_stakeregistrationanddelegation_free, rc = s.stakeregistrationanddelegation_to_bytes, nc = s.stakeregistrationanddelegation_from_bytes, oc = s.stakeregistrationanddelegation_to_hex, ac = s.stakeregistrationanddelegation_from_hex, sc = s.stakeregistrationanddelegation_to_json, ic = s.stakeregistrationanddelegation_to_js_value, dc = s.stakeregistrationanddelegation_from_json, cc = s.stakeregistrationanddelegation_stake_credential, pc = s.stakeregistrationanddelegation_pool_keyhash, wc = s.stakeregistrationanddelegation_coin, bc = s.stakeregistrationanddelegation_new, lc = s.stakeregistrationanddelegation_has_script_credentials, gc = s.__wbg_stakevoteregistrationanddelegation_free, uc = s.stakevoteregistrationanddelegation_to_bytes, fc = s.stakevoteregistrationanddelegation_from_bytes, hc = s.stakevoteregistrationanddelegation_to_hex, yc = s.stakevoteregistrationanddelegation_from_hex, vc = s.stakevoteregistrationanddelegation_to_json, mc = s.stakevoteregistrationanddelegation_to_js_value, kc = s.stakevoteregistrationanddelegation_from_json, xc = s.stakevoteregistrationanddelegation_stake_credential, jc = s.stakevoteregistrationanddelegation_drep, zc = s.stakevoteregistrationanddelegation_new, Fc = s.stakevoteregistrationanddelegation_has_script_credentials, Rc = s.voteregistrationanddelegation_to_bytes, Oc = s.voteregistrationanddelegation_from_bytes, qc = s.voteregistrationanddelegation_to_hex, $c = s.voteregistrationanddelegation_from_hex, Lc = s.voteregistrationanddelegation_to_json, Jc = s.voteregistrationanddelegation_to_js_value, Yc = s.voteregistrationanddelegation_from_json, Qc = s.voteregistrationanddelegation_stake_credential, Xc = s.voteregistrationanddelegation_drep, Zc = s.voteregistrationanddelegation_new, Uc = s.voteregistrationanddelegation_has_script_credentials, Ec = s.__wbg_committeehotauth_free, Kc = s.committeehotauth_to_bytes, Sc = s.committeehotauth_from_bytes, Wc = s.committeehotauth_to_hex, Mc = s.committeehotauth_from_hex, Gc = s.committeehotauth_to_json, Hc = s.committeehotauth_to_js_value, Ac = s.committeehotauth_from_json, Ic = s.committeehotauth_committee_cold_credential, Dc = s.committeehotauth_committee_hot_credential, Tc = s.committeehotauth_new, Nc = s.committeehotauth_has_script_credentials, Cc = s.drep_to_bytes, Vc = s.drep_from_bytes, Pc = s.drep_to_hex, Bc = s.drep_from_hex, tp = s.drep_to_json, _p = s.drep_to_js_value, ep = s.drep_from_json, rp = s.drep_new_key_hash, np = s.drep_new_script_hash, op = s.drep_new_always_abstain, ap = s.drep_new_always_no_confidence, sp = s.drep_new_from_credential, ip = s.drep_kind, dp = s.drep_to_key_hash, cp = s.drep_to_script_hash, pp = s.drep_to_bech32, wp = s.drep_from_bech32, bp = s.__wbg_voter_free, lp = s.voter_to_bytes, gp = s.voter_from_bytes, up = s.voter_to_hex, fp = s.voter_from_hex, hp = s.voter_to_json, yp = s.voter_to_js_value, vp = s.voter_from_json, mp = s.voter_new_constitutional_committee_hot_credential, kp = s.voter_new_drep_credential, xp = s.voter_new_stake_pool_key_hash, jp = s.voter_kind, zp = s.voter_to_constitutional_committee_hot_credential, Fp = s.voter_to_drep_credential, Rp = s.voter_to_stake_pool_key_hash, Op = s.voter_has_script_credentials, qp = s.voter_to_key_hash, $p = s.__wbg_language_free, Lp = s.language_to_bytes, Jp = s.language_from_bytes, Yp = s.language_to_hex, Qp = s.language_from_hex, Xp = s.language_to_json, Zp = s.language_to_js_value, Up = s.language_from_json, Ep = s.language_new_plutus_v1, Kp = s.language_new_plutus_v2, Sp = s.language_new_plutus_v3, Wp = s.language_kind, Mp = s.__wbg_credential_free, Gp = s.credential_from_keyhash, Hp = s.credential_from_scripthash, Ap = s.credential_to_keyhash, Ip = s.credential_to_scripthash, Dp = s.credential_kind, Tp = s.credential_has_script_hash, Np = s.credential_to_bytes, Cp = s.credential_from_bytes, Vp = s.credential_to_hex, Pp = s.credential_from_hex, Bp = s.credential_to_json, tw = s.credential_to_js_value, _w = s.credential_from_json, ew = s.__wbg_vkeywitnesses_free, rw = s.vkeywitnesses_to_bytes, nw = s.vkeywitnesses_from_bytes, ow = s.vkeywitnesses_to_hex, aw = s.vkeywitnesses_from_hex, sw = s.vkeywitnesses_to_json, iw = s.vkeywitnesses_to_js_value, dw = s.vkeywitnesses_from_json, cw = s.vkeywitnesses_get, pw = s.vkeywitnesses_add, ww = s.__wbg_bootstrapwitnesses_free, bw = s.bootstrapwitnesses_to_bytes, lw = s.bootstrapwitnesses_from_bytes, gw = s.bootstrapwitnesses_to_hex, uw = s.bootstrapwitnesses_from_hex, fw = s.bootstrapwitnesses_to_json, hw = s.bootstrapwitnesses_to_js_value, yw = s.bootstrapwitnesses_from_json, vw = s.bootstrapwitnesses_new, mw = s.bootstrapwitnesses_len, kw = s.bootstrapwitnesses_get, xw = s.bootstrapwitnesses_add, jw = s.__wbg_publickey_free, zw = s.publickey_from_hex, Fw = s.publickey_to_hex, Rw = s.publickey_hash, Ow = s.publickey_verify, qw = s.publickey_from_bytes, $w = s.publickey_as_bytes, Lw = s.publickey_to_bech32, Jw = s.publickey_from_bech32, Yw = s.__wbg_poolregistration_free, Qw = s.__wbg_voteregistrationanddelegation_free, Xw = s.__wbg_votedelegation_free, Zw = s.__wbg_drep_free, Uw = s.vkeywitnesses_new, Ew = s.votedelegation_drep, Kw = s.votedelegation_has_script_credentials, Sw = s.votedelegation_stake_credential, Ww = s.stakevoteregistrationanddelegation_coin, Mw = s.stakevoteregistrationanddelegation_pool_keyhash, Gw = s.voteregistrationanddelegation_coin, Hw = s.stakeandvotedelegation_has_script_credentials, Aw = s.stakeandvotedelegation_stake_credential, Iw = s.vkeywitnesses_len, Dw = s.__wbg_stakeregistration_free, Tw = s.stakeregistration_to_bytes, Nw = s.stakeregistration_from_bytes, Cw = s.stakeregistration_to_hex, Vw = s.stakeregistration_from_hex, Pw = s.stakeregistration_to_json, Bw = s.stakeregistration_to_js_value, tb = s.stakeregistration_from_json, _b = s.stakeregistration_stake_credential, eb = s.stakeregistration_coin, rb = s.stakeregistration_new, nb = s.stakeregistration_new_with_explicit_deposit, ob = s.stakeregistration_has_script_credentials, ab = s.__wbg_redeemertag_free, sb = s.redeemertag_to_bytes, ib = s.redeemertag_from_bytes, db = s.redeemertag_to_hex, cb = s.redeemertag_from_hex, pb = s.redeemertag_to_json, wb = s.redeemertag_to_js_value, bb = s.redeemertag_from_json, lb = s.redeemertag_new_spend, gb = s.redeemertag_new_mint, ub = s.redeemertag_new_cert, fb = s.redeemertag_new_reward, hb = s.redeemertag_new_vote, yb = s.redeemertag_new_voting_proposal, vb = s.redeemertag_kind, mb = s.__wbg_bip32publickey_free, kb = s.__wbg_legacydaedalusprivatekey_free, xb = s.legacydaedalusprivatekey_from_bytes, jb = s.legacydaedalusprivatekey_as_bytes, zb = s.legacydaedalusprivatekey_chaincode, Fb = s.__wbg_nonce_free, Rb = s.nonce_to_bytes, Ob = s.nonce_from_bytes, qb = s.nonce_to_hex, $b = s.nonce_from_hex, Lb = s.nonce_to_json, Jb = s.nonce_to_js_value, Yb = s.nonce_from_json, Qb = s.nonce_new_identity, Xb = s.nonce_new_from_hash, Zb = s.nonce_get_hash, Ub = s.__wbg_unitinterval_free, Eb = s.unitinterval_to_bytes, Kb = s.unitinterval_from_bytes, Sb = s.unitinterval_to_hex, Wb = s.unitinterval_from_hex, Mb = s.unitinterval_to_json, Gb = s.unitinterval_to_js_value, Hb = s.unitinterval_from_json, Ab = s.unitinterval_denominator, Ib = s.unitinterval_new, Db = s.__wbg_transaction_free, Tb = s.transaction_to_bytes, Nb = s.transaction_from_bytes, Cb = s.transaction_to_hex, Vb = s.transaction_from_hex, Pb = s.transaction_to_json, Bb = s.transaction_to_js_value, tl = s.transaction_from_json, _l = s.transaction_body, el = s.transaction_witness_set, rl = s.transaction_is_valid, nl = s.transaction_auxiliary_data, ol = s.transaction_set_is_valid, al = s.transaction_new, sl = s.__wbg_transactionoutputs_free, il = s.transactionoutputs_to_bytes, dl = s.transactionoutputs_from_bytes, cl = s.transactionoutputs_to_hex, pl = s.transactionoutputs_from_hex, wl = s.transactionoutputs_to_json, bl = s.transactionoutputs_to_js_value, ll = s.transactionoutputs_from_json, gl = s.transactionoutputs_new, ul = s.transactionoutputs_len, fl = s.transactionoutputs_get, hl = s.transactionoutputs_add, yl = s.__wbg_datacost_free, vl = s.datacost_new_coins_per_byte, ml = s.datacost_coins_per_byte, kl = s.__wbg_transactionoutput_free, xl = s.transactionoutput_to_bytes, jl = s.transactionoutput_from_bytes, zl = s.transactionoutput_to_hex, Fl = s.transactionoutput_from_hex, Rl = s.transactionoutput_to_json, Ol = s.transactionoutput_to_js_value, ql = s.transactionoutput_from_json, $l = s.transactionoutput_address, Ll = s.transactionoutput_amount, Jl = s.transactionoutput_data_hash, Yl = s.transactionoutput_plutus_data, Ql = s.transactionoutput_script_ref, Xl = s.transactionoutput_set_script_ref, Zl = s.transactionoutput_set_plutus_data, Ul = s.transactionoutput_set_data_hash, El = s.transactionoutput_has_plutus_data, Kl = s.transactionoutput_has_data_hash, Sl = s.transactionoutput_has_script_ref, Wl = s.transactionoutput_new, Ml = s.transactionoutput_serialization_format, Gl = s.__wbg_ipv4_free, Hl = s.ipv4_to_bytes, Al = s.ipv4_from_bytes, Il = s.ipv4_to_hex, Dl = s.ipv4_from_hex, Tl = s.ipv4_to_json, Nl = s.ipv4_to_js_value, Cl = s.ipv4_from_json, Vl = s.ipv4_new, Pl = s.ipv4_ip, Bl = s.__wbg_ipv6_free, tg = s.ipv6_to_bytes, _g = s.ipv6_from_bytes, eg = s.ipv6_to_hex, rg = s.ipv6_from_hex, ng = s.ipv6_to_json, og = s.ipv6_to_js_value, ag = s.ipv6_from_json, sg = s.ipv6_new, ig = s.ipv6_ip, dg = s.url_to_bytes, cg = s.url_from_bytes, pg = s.url_to_hex, wg = s.url_from_hex, bg = s.url_from_json, lg = s.url_new, gg = s.dnsrecordaoraaaa_to_bytes, ug = s.dnsrecordaoraaaa_from_bytes, fg = s.dnsrecordaoraaaa_to_hex, hg = s.dnsrecordaoraaaa_from_hex, yg = s.dnsrecordaoraaaa_to_json, vg = s.dnsrecordaoraaaa_to_js_value, mg = s.dnsrecordaoraaaa_from_json, kg = s.dnsrecordaoraaaa_new, xg = s.dnsrecordaoraaaa_record, jg = s.dnsrecordsrv_to_bytes, zg = s.dnsrecordsrv_from_bytes, Fg = s.dnsrecordsrv_to_hex, Rg = s.dnsrecordsrv_from_hex, Og = s.dnsrecordsrv_from_json, qg = s.dnsrecordsrv_new, $g = s.__wbg_singlehostaddr_free, Lg = s.singlehostaddr_to_bytes, Jg = s.singlehostaddr_from_bytes, Yg = s.singlehostaddr_to_hex, Qg = s.singlehostaddr_from_hex, Xg = s.singlehostaddr_to_json, Zg = s.singlehostaddr_to_js_value, Ug = s.singlehostaddr_from_json, Eg = s.singlehostaddr_port, Kg = s.singlehostaddr_ipv4, Sg = s.singlehostaddr_ipv6, Wg = s.singlehostaddr_new, Mg = s.__wbg_singlehostname_free, Gg = s.singlehostname_to_bytes, Hg = s.singlehostname_from_bytes, Ag = s.singlehostname_to_hex, Ig = s.singlehostname_from_hex, Dg = s.singlehostname_to_json, Tg = s.singlehostname_to_js_value, Ng = s.singlehostname_from_json, Cg = s.singlehostname_port, Vg = s.singlehostname_new, Pg = s.multihostname_to_bytes, Bg = s.multihostname_from_bytes, tu = s.multihostname_to_hex, _u = s.multihostname_from_hex, eu = s.multihostname_to_json, ru = s.multihostname_to_js_value, nu = s.multihostname_from_json, ou = s.multihostname_dns_name, au = s.__wbg_relay_free, su = s.relay_to_bytes, iu = s.relay_from_bytes, du = s.relay_to_hex, cu = s.relay_from_hex, pu = s.relay_to_json, wu = s.relay_to_js_value, bu = s.relay_from_json, lu = s.relay_new_single_host_addr, gu = s.relay_new_single_host_name, uu = s.relay_new_multi_host_name, fu = s.relay_kind, hu = s.relay_as_single_host_addr, yu = s.relay_as_single_host_name, vu = s.relay_as_multi_host_name, mu = s.__wbg_poolmetadata_free, ku = s.poolmetadata_to_bytes, xu = s.poolmetadata_from_bytes, ju = s.poolmetadata_to_hex, zu = s.poolmetadata_from_hex, Fu = s.poolmetadata_to_json, Ru = s.poolmetadata_to_js_value, Ou = s.poolmetadata_from_json, qu = s.poolmetadata_pool_metadata_hash, $u = s.poolmetadata_new, Lu = s.__wbg_rewardaddresses_free, Ju = s.rewardaddresses_to_bytes, Yu = s.rewardaddresses_from_bytes, Qu = s.rewardaddresses_to_hex, Xu = s.rewardaddresses_from_hex, Zu = s.rewardaddresses_to_json, Uu = s.rewardaddresses_to_js_value, Eu = s.rewardaddresses_from_json, Ku = s.rewardaddresses_len, Su = s.rewardaddresses_get, Wu = s.rewardaddresses_add, Mu = s.__wbg_withdrawals_free, Gu = s.withdrawals_to_bytes, Hu = s.withdrawals_from_bytes, Au = s.withdrawals_to_hex, Iu = s.withdrawals_from_hex, Du = s.withdrawals_to_json, Tu = s.withdrawals_to_js_value, Nu = s.withdrawals_from_json, Cu = s.withdrawals_insert, Vu = s.withdrawals_get, Pu = s.withdrawals_keys, Bu = s.__wbg_outputdatum_free, tf = s.outputdatum_new_data_hash, _f = s.outputdatum_new_data, ef = s.outputdatum_data_hash, rf = s.outputdatum_data, nf = s.__wbg_update_free, of = s.update_to_bytes, af = s.update_from_bytes, sf = s.update_to_hex, df = s.update_from_hex, cf = s.update_to_json, pf = s.update_to_js_value, wf = s.update_from_json, bf = s.update_proposed_protocol_parameter_updates, lf = s.update_epoch, gf = s.update_new, uf = s.__wbg_genesishashes_free, ff = s.genesishashes_to_bytes, hf = s.genesishashes_from_bytes, yf = s.genesishashes_to_hex, vf = s.genesishashes_from_hex, mf = s.genesishashes_to_json, kf = s.genesishashes_to_js_value, xf = s.genesishashes_from_json, jf = s.genesishashes_new, zf = s.genesishashes_len, Ff = s.genesishashes_get, Rf = s.genesishashes_add, Of = s.scripthashes_to_bytes, qf = s.scripthashes_from_bytes, $f = s.scripthashes_to_hex, Lf = s.scripthashes_from_hex, Jf = s.scripthashes_to_json, Yf = s.scripthashes_to_js_value, Qf = s.scripthashes_from_json, Xf = s.scripthashes_get, Zf = s.scripthashes_add, Uf = s.__wbg_proposedprotocolparameterupdates_free, Ef = s.proposedprotocolparameterupdates_to_bytes, Kf = s.proposedprotocolparameterupdates_from_bytes, Sf = s.proposedprotocolparameterupdates_to_hex, Wf = s.proposedprotocolparameterupdates_from_hex, Mf = s.proposedprotocolparameterupdates_to_json, Gf = s.proposedprotocolparameterupdates_to_js_value, Hf = s.proposedprotocolparameterupdates_from_json, Af = s.proposedprotocolparameterupdates_insert, If = s.proposedprotocolparameterupdates_get, Df = s.proposedprotocolparameterupdates_keys, Tf = s.__wbg_protocolversion_free, Nf = s.protocolversion_to_bytes, Cf = s.protocolversion_from_bytes, Vf = s.protocolversion_to_hex, Pf = s.protocolversion_from_hex, Bf = s.protocolversion_to_json, th = s.protocolversion_to_js_value, _h = s.protocolversion_from_json, eh = s.protocolversion_major, rh = s.protocolversion_minor, nh = s.protocolversion_new, oh = s.__wbg_auxiliarydataset_free, ah = s.auxiliarydataset_new, sh = s.auxiliarydataset_len, ih = s.auxiliarydataset_insert, dh = s.auxiliarydataset_get, ch = s.auxiliarydataset_indices, ph = s.__wbg_assetname_free, wh = s.assetname_to_bytes, bh = s.assetname_from_bytes, lh = s.assetname_to_hex, gh = s.assetname_from_hex, uh = s.assetname_to_json, fh = s.assetname_to_js_value, hh = s.assetname_from_json, yh = s.assetname_new, vh = s.assetname_name, mh = s.__wbg_assetnames_free, kh = s.assetnames_to_bytes, xh = s.assetnames_from_bytes, jh = s.assetnames_to_hex, zh = s.assetnames_from_hex, Fh = s.assetnames_to_json, Rh = s.assetnames_to_js_value, Oh = s.assetnames_from_json, qh = s.assetnames_new, $h = s.assetnames_len, Lh = s.assetnames_get, Jh = s.assetnames_add, Yh = s.__wbg_assets_free, Qh = s.assets_to_bytes, Xh = s.assets_from_bytes, Zh = s.assets_to_hex, Uh = s.assets_from_hex, Eh = s.assets_to_json, Kh = s.assets_to_js_value, Sh = s.assets_from_json, Wh = s.assets_new, Mh = s.assets_len, Gh = s.assets_insert, Hh = s.assets_get, Ah = s.assets_keys, Ih = s.__wbg_multiasset_free, Dh = s.multiasset_to_bytes, Th = s.multiasset_from_bytes, Nh = s.multiasset_to_hex, Ch = s.multiasset_from_hex, Vh = s.multiasset_to_json, Ph = s.multiasset_to_js_value, Bh = s.multiasset_from_json, ty = s.multiasset_insert, _y = s.multiasset_get, ey = s.multiasset_set_asset, ry = s.multiasset_get_asset, ny = s.multiasset_keys, oy = s.multiasset_sub, ay = s.__wbg_mintsassets_free, sy = s.mintsassets_to_json, iy = s.mintsassets_to_js_value, dy = s.mintsassets_from_json, cy = s.mintsassets_add, py = s.mintsassets_get, wy = s.__wbg_mintassets_free, by = s.mintassets_new_from_entry, ly = s.mintassets_insert, gy = s.mintassets_get, uy = s.mintassets_keys, fy = s.__wbg_mint_free, hy = s.mint_to_bytes, yy = s.mint_from_bytes, vy = s.mint_to_hex, my = s.mint_from_hex, ky = s.mint_to_json, xy = s.mint_to_js_value, jy = s.mint_from_json, zy = s.mint_new_from_entry, Fy = s.mint_len, Ry = s.mint_insert, Oy = s.mint_get, qy = s.mint_keys, $y = s.mint_as_positive_multiasset, Ly = s.mint_as_negative_multiasset, Jy = s.__wbg_networkid_free, Yy = s.networkid_to_bytes, Qy = s.networkid_from_bytes, Xy = s.networkid_to_hex, Zy = s.networkid_from_hex, Uy = s.networkid_to_json, Ey = s.networkid_to_js_value, Ky = s.networkid_from_json, Sy = s.networkid_testnet, Wy = s.networkid_mainnet, My = s.networkid_kind, Gy = s.bip32publickey_from_hex, Hy = s.bip32publickey_to_hex, Ay = s.bip32publickey_chaincode, Iy = s.bip32publickey_to_bech32, Dy = s.bip32publickey_from_bech32, Ty = s.bip32publickey_as_bytes, Ny = s.bip32publickey_from_bytes, Cy = s.bip32publickey_to_raw_key, Vy = s.bip32publickey_derive, Py = s.__wbg_url_free, By = s.__wbg_dnsrecordsrv_free, tv = s.__wbg_multihostname_free, _v = s.__wbg_dnsrecordaoraaaa_free, ev = s.unitinterval_numerator, rv = s.withdrawals_len, nv = s.proposedprotocolparameterupdates_len, ov = s.multiasset_len, av = s.mintassets_len, sv = s.scripthashes_len, iv = s.mintsassets_len, dv = s.url_to_json, cv = s.dnsrecordsrv_to_json, pv = s.url_url, wv = s.dnsrecordsrv_record, bv = s.multiasset_new, lv = s.mintassets_new, gv = s.withdrawals_new, uv = s.proposedprotocolparameterupdates_new, fv = s.url_to_js_value, hv = s.dnsrecordsrv_to_js_value, yv = s.__wbg_scripthashes_free, vv = s.singlehostname_dns_name, mv = s.poolmetadata_url, kv = s.rewardaddresses_new, xv = s.scripthashes_new, jv = s.multihostname_new, zv = s.mintsassets_new, Fv = s.mint_new, Rv = s.__wbg_linearfee_free, Ov = s.linearfee_constant, qv = s.linearfee_coefficient, $v = s.linearfee_new, Lv = s.min_fee, Jv = s.calculate_ex_units_ceil_cost, Yv = s.min_script_fee, Qv = s.min_ref_script_fee, Xv = s.__wbg_languages_free, Zv = s.languages_new, Uv = s.languages_len, Ev = s.languages_get, Kv = s.languages_add, Sv = s.languages_list, Wv = s.__wbg_exunitprices_free, Mv = s.exunitprices_to_bytes, Gv = s.exunitprices_from_bytes, Hv = s.exunitprices_to_hex, Av = s.exunitprices_from_hex, Iv = s.exunitprices_to_json, Dv = s.exunitprices_to_js_value, Tv = s.exunitprices_from_json, Nv = s.exunitprices_new, Cv = s.__wbg_redeemer_free, Vv = s.redeemer_to_bytes, Pv = s.redeemer_from_bytes, Bv = s.redeemer_to_hex, tm = s.redeemer_from_hex, _m = s.redeemer_to_json, em = s.redeemer_to_js_value, rm = s.redeemer_from_json, nm = s.redeemer_tag, om = s.redeemer_index, am = s.redeemer_data, sm = s.redeemer_ex_units, im = s.redeemer_new, dm = s.__wbg_redeemers_free, cm = s.redeemers_to_bytes, pm = s.redeemers_from_bytes, wm = s.redeemers_to_hex, bm = s.redeemers_from_hex, lm = s.redeemers_to_json, gm = s.redeemers_to_js_value, um = s.redeemers_from_json, fm = s.redeemers_new, hm = s.redeemers_len, ym = s.redeemers_get, vm = s.redeemers_add, mm = s.redeemers_get_container_type, km = s.redeemers_total_ex_units, xm = s.__wbg_constrplutusdata_free, jm = s.constrplutusdata_to_bytes, zm = s.constrplutusdata_from_bytes, Fm = s.constrplutusdata_to_hex, Rm = s.constrplutusdata_from_hex, Om = s.constrplutusdata_alternative, qm = s.constrplutusdata_data, $m = s.constrplutusdata_new, Lm = s.__wbg_plutusmapvalues_free, Jm = s.plutusmapvalues_new, Ym = s.plutusmapvalues_get, Qm = s.plutusmapvalues_add, Xm = s.__wbg_plutusmap_free, Zm = s.plutusmap_to_bytes, Um = s.plutusmap_from_bytes, Em = s.plutusmap_to_hex, Km = s.plutusmap_from_hex, Sm = s.plutusmap_insert, Wm = s.plutusmap_get, Mm = s.plutusmap_keys, Gm = s.__wbg_plutusdata_free, Hm = s.plutusdata_to_bytes, Am = s.plutusdata_from_bytes, Im = s.plutusdata_to_hex, Dm = s.plutusdata_from_hex, Tm = s.plutusdata_new_constr_plutus_data, Nm = s.plutusdata_new_empty_constr_plutus_data, Cm = s.plutusdata_new_single_value_constr_plutus_data, Vm = s.plutusdata_new_map, Pm = s.plutusdata_new_list, Bm = s.plutusdata_new_integer, t1 = s.plutusdata_new_bytes, _1 = s.plutusdata_kind, e1 = s.plutusdata_as_constr_plutus_data, r1 = s.plutusdata_as_map, n1 = s.plutusdata_as_list, o1 = s.plutusdata_as_integer, a1 = s.plutusdata_as_bytes, s1 = s.plutusdata_from_address, i1 = s.plutusdata_as_address, d1 = s.__wbg_plutuslist_free, c1 = s.plutuslist_to_bytes, p1 = s.plutuslist_from_bytes, w1 = s.plutuslist_to_hex, b1 = s.plutuslist_from_hex, l1 = s.plutuslist_new, g1 = s.plutuslist_len, u1 = s.plutuslist_get, f1 = s.plutuslist_add, h1 = s.encode_json_str_to_plutus_datum, y1 = s.decode_plutus_datum_to_json_str, v1 = s.__wbg_metadatamap_free, m1 = s.metadatamap_to_bytes, k1 = s.metadatamap_from_bytes, x1 = s.metadatamap_to_hex, j1 = s.metadatamap_from_hex, z1 = s.metadatamap_insert, F1 = s.metadatamap_insert_str, R1 = s.metadatamap_insert_i32, O1 = s.metadatamap_get, q1 = s.metadatamap_get_str, $1 = s.metadatamap_get_i32, L1 = s.metadatamap_has, J1 = s.metadatamap_keys, Y1 = s.__wbg_metadatalist_free, Q1 = s.metadatalist_to_bytes, X1 = s.metadatalist_from_bytes, Z1 = s.metadatalist_to_hex, U1 = s.metadatalist_from_hex, E1 = s.metadatalist_new, K1 = s.metadatalist_len, S1 = s.metadatalist_get, W1 = s.metadatalist_add, M1 = s.__wbg_transactionmetadatum_free, G1 = s.transactionmetadatum_to_bytes, H1 = s.transactionmetadatum_from_bytes, A1 = s.transactionmetadatum_to_hex, I1 = s.transactionmetadatum_from_hex, D1 = s.transactionmetadatum_new_map, T1 = s.transactionmetadatum_new_list, N1 = s.transactionmetadatum_new_int, C1 = s.transactionmetadatum_new_bytes, V1 = s.transactionmetadatum_new_text, P1 = s.transactionmetadatum_kind, B1 = s.transactionmetadatum_as_map, tk = s.transactionmetadatum_as_list, _k = s.transactionmetadatum_as_int, ek = s.transactionmetadatum_as_bytes, rk = s.transactionmetadatum_as_text, nk = s.__wbg_transactionmetadatumlabels_free, ok = s.transactionmetadatumlabels_to_bytes, ak = s.transactionmetadatumlabels_from_bytes, sk = s.transactionmetadatumlabels_to_hex, ik = s.transactionmetadatumlabels_from_hex, dk = s.transactionmetadatumlabels_len, ck = s.transactionmetadatumlabels_get, pk = s.transactionmetadatumlabels_add, wk = s.__wbg_generaltransactionmetadata_free, bk = s.generaltransactionmetadata_to_bytes, lk = s.generaltransactionmetadata_from_bytes, gk = s.generaltransactionmetadata_to_hex, uk = s.generaltransactionmetadata_from_hex, fk = s.generaltransactionmetadata_to_json, hk = s.generaltransactionmetadata_to_js_value, yk = s.generaltransactionmetadata_from_json, vk = s.generaltransactionmetadata_new, mk = s.generaltransactionmetadata_len, kk = s.generaltransactionmetadata_insert, xk = s.generaltransactionmetadata_get, jk = s.generaltransactionmetadata_keys, zk = s.__wbg_auxiliarydata_free, Fk = s.auxiliarydata_to_bytes, Rk = s.auxiliarydata_from_bytes, Ok = s.auxiliarydata_to_hex, qk = s.auxiliarydata_from_hex, $k = s.auxiliarydata_to_json, Lk = s.auxiliarydata_to_js_value, Jk = s.auxiliarydata_from_json, Yk = s.auxiliarydata_new, Qk = s.auxiliarydata_metadata, Xk = s.auxiliarydata_set_metadata, Zk = s.auxiliarydata_native_scripts, Uk = s.auxiliarydata_set_native_scripts, Ek = s.auxiliarydata_plutus_scripts, Kk = s.auxiliarydata_set_plutus_scripts, Sk = s.auxiliarydata_prefer_alonzo_format, Wk = s.auxiliarydata_set_prefer_alonzo_format, Mk = s.encode_arbitrary_bytes_as_metadatum, Gk = s.decode_arbitrary_bytes_from_metadatum, Hk = s.encode_json_str_to_metadatum, Ak = s.decode_metadatum_to_json_str, Ik = s.__wbg_poolvotingthresholds_free, Dk = s.poolvotingthresholds_to_bytes, Tk = s.poolvotingthresholds_from_bytes, Nk = s.poolvotingthresholds_to_hex, Ck = s.poolvotingthresholds_from_hex, Vk = s.poolvotingthresholds_to_json, Pk = s.poolvotingthresholds_to_js_value, Bk = s.poolvotingthresholds_from_json, t0 = s.poolvotingthresholds_new, _0 = s.__wbg_drepvotingthresholds_free, e0 = s.drepvotingthresholds_to_bytes, r0 = s.drepvotingthresholds_from_bytes, n0 = s.drepvotingthresholds_to_hex, o0 = s.drepvotingthresholds_from_hex, a0 = s.drepvotingthresholds_to_json, s0 = s.drepvotingthresholds_to_js_value, i0 = s.drepvotingthresholds_from_json, d0 = s.drepvotingthresholds_new, c0 = s.drepvotingthresholds_set_motion_no_confidence, p0 = s.drepvotingthresholds_set_committee_normal, w0 = s.drepvotingthresholds_set_committee_no_confidence, b0 = s.drepvotingthresholds_set_update_constitution, l0 = s.drepvotingthresholds_set_hard_fork_initiation, g0 = s.drepvotingthresholds_set_pp_network_group, u0 = s.drepvotingthresholds_set_pp_economic_group, f0 = s.drepvotingthresholds_set_pp_technical_group, h0 = s.drepvotingthresholds_set_pp_governance_group, y0 = s.drepvotingthresholds_set_treasury_withdrawal, v0 = s.drepvotingthresholds_motion_no_confidence, m0 = s.drepvotingthresholds_committee_normal, k0 = s.drepvotingthresholds_committee_no_confidence, x0 = s.drepvotingthresholds_update_constitution, j0 = s.drepvotingthresholds_hard_fork_initiation, z0 = s.drepvotingthresholds_pp_network_group, F0 = s.drepvotingthresholds_pp_economic_group, R0 = s.drepvotingthresholds_pp_technical_group, O0 = s.drepvotingthresholds_pp_governance_group, q0 = s.drepvotingthresholds_treasury_withdrawal, $0 = s.__wbg_protocolparamupdate_free, L0 = s.protocolparamupdate_to_bytes, J0 = s.protocolparamupdate_from_bytes, Y0 = s.protocolparamupdate_to_hex, Q0 = s.protocolparamupdate_from_hex, X0 = s.protocolparamupdate_to_json, Z0 = s.protocolparamupdate_to_js_value, U0 = s.protocolparamupdate_from_json, E0 = s.protocolparamupdate_set_minfee_a, K0 = s.protocolparamupdate_minfee_a, S0 = s.protocolparamupdate_set_minfee_b, W0 = s.protocolparamupdate_minfee_b, M0 = s.protocolparamupdate_set_max_block_body_size, G0 = s.protocolparamupdate_max_block_body_size, H0 = s.protocolparamupdate_set_max_tx_size, A0 = s.protocolparamupdate_max_tx_size, I0 = s.protocolparamupdate_set_max_block_header_size, D0 = s.protocolparamupdate_max_block_header_size, T0 = s.protocolparamupdate_set_key_deposit, N0 = s.protocolparamupdate_key_deposit, C0 = s.protocolparamupdate_set_pool_deposit, V0 = s.protocolparamupdate_pool_deposit, P0 = s.protocolparamupdate_set_max_epoch, B0 = s.protocolparamupdate_max_epoch, t4 = s.protocolparamupdate_set_n_opt, _4 = s.protocolparamupdate_n_opt, e4 = s.protocolparamupdate_set_pool_pledge_influence, r4 = s.protocolparamupdate_pool_pledge_influence, n4 = s.protocolparamupdate_set_expansion_rate, o4 = s.protocolparamupdate_expansion_rate, a4 = s.protocolparamupdate_set_treasury_growth_rate, s4 = s.protocolparamupdate_treasury_growth_rate, i4 = s.protocolparamupdate_d, d4 = s.protocolparamupdate_extra_entropy, c4 = s.protocolparamupdate_set_protocol_version, p4 = s.protocolparamupdate_protocol_version, w4 = s.protocolparamupdate_set_min_pool_cost, b4 = s.protocolparamupdate_min_pool_cost, l4 = s.protocolparamupdate_set_ada_per_utxo_byte, g4 = s.protocolparamupdate_ada_per_utxo_byte, u4 = s.protocolparamupdate_set_cost_models, f4 = s.protocolparamupdate_cost_models, h4 = s.protocolparamupdate_set_execution_costs, y4 = s.protocolparamupdate_execution_costs, v4 = s.protocolparamupdate_set_max_tx_ex_units, m4 = s.protocolparamupdate_max_tx_ex_units, k4 = s.protocolparamupdate_set_max_block_ex_units, x4 = s.protocolparamupdate_max_block_ex_units, j4 = s.protocolparamupdate_set_max_value_size, z4 = s.protocolparamupdate_max_value_size, F4 = s.protocolparamupdate_set_collateral_percentage, R4 = s.protocolparamupdate_collateral_percentage, O4 = s.protocolparamupdate_set_max_collateral_inputs, q4 = s.protocolparamupdate_max_collateral_inputs, $4 = s.protocolparamupdate_set_pool_voting_thresholds, L4 = s.protocolparamupdate_pool_voting_thresholds, J4 = s.protocolparamupdate_set_drep_voting_thresholds, Y4 = s.protocolparamupdate_drep_voting_thresholds, Q4 = s.protocolparamupdate_set_min_committee_size, X4 = s.protocolparamupdate_min_committee_size, Z4 = s.protocolparamupdate_set_committee_term_limit, U4 = s.protocolparamupdate_committee_term_limit, E4 = s.protocolparamupdate_set_governance_action_validity_period, K4 = s.protocolparamupdate_governance_action_validity_period, S4 = s.protocolparamupdate_set_governance_action_deposit, W4 = s.protocolparamupdate_governance_action_deposit, M4 = s.protocolparamupdate_set_drep_deposit, G4 = s.protocolparamupdate_drep_deposit, H4 = s.protocolparamupdate_set_drep_inactivity_period, A4 = s.protocolparamupdate_drep_inactivity_period, I4 = s.protocolparamupdate_set_ref_script_coins_per_byte, D4 = s.protocolparamupdate_ref_script_coins_per_byte, T4 = s.protocolparamupdate_new, N4 = s.__wbg_bootstrapwitness_free, C4 = s.bootstrapwitness_to_bytes, V4 = s.bootstrapwitness_from_bytes, P4 = s.bootstrapwitness_to_hex, B4 = s.bootstrapwitness_from_hex, t6 = s.bootstrapwitness_to_json, _6 = s.bootstrapwitness_to_js_value, e6 = s.bootstrapwitness_from_json, r6 = s.bootstrapwitness_vkey, n6 = s.bootstrapwitness_signature, o6 = s.bootstrapwitness_chain_code, a6 = s.bootstrapwitness_attributes, s6 = s.bootstrapwitness_new, i6 = s.__wbg_ed25519signature_free, d6 = s.ed25519signature_to_bytes, c6 = s.ed25519signature_to_bech32, p6 = s.ed25519signature_to_hex, w6 = s.ed25519signature_from_bech32, b6 = s.ed25519signature_from_hex, l6 = s.ed25519signature_from_bytes, g6 = s.__wbg_vkey_free, u6 = s.vkey_to_bytes, f6 = s.vkey_from_bytes, h6 = s.vkey_to_hex, y6 = s.vkey_from_hex, v6 = s.vkey_to_json, m6 = s.vkey_to_js_value, k6 = s.vkey_from_json, x6 = s.vkey_new, j6 = s.vkey_public_key, z6 = s.__wbg_operationalcert_free, F6 = s.operationalcert_to_bytes, R6 = s.operationalcert_from_bytes, O6 = s.operationalcert_to_hex, q6 = s.operationalcert_from_hex, $6 = s.operationalcert_to_json, L6 = s.operationalcert_to_js_value, J6 = s.operationalcert_from_json, Y6 = s.operationalcert_hot_vkey, Q6 = s.operationalcert_sequence_number, X6 = s.operationalcert_kes_period, Z6 = s.operationalcert_sigma, U6 = s.operationalcert_new, E6 = s.__wbg_fixedversionedblock_free, K6 = s.fixedversionedblock_from_bytes, S6 = s.fixedversionedblock_from_hex, W6 = s.fixedversionedblock_block, M6 = s.fixedversionedblock_era, G6 = s.__wbg_versionedblock_free, H6 = s.versionedblock_to_bytes, A6 = s.versionedblock_from_bytes, I6 = s.versionedblock_to_hex, D6 = s.versionedblock_from_hex, T6 = s.versionedblock_to_json, N6 = s.versionedblock_to_js_value, C6 = s.versionedblock_from_json, V6 = s.versionedblock_new, P6 = s.versionedblock_block, B6 = s.versionedblock_era, tx = s.poolvotingthresholds_motion_no_confidence, _x = s.poolvotingthresholds_committee_normal, ex = s.exunitprices_mem_price, rx = s.exunitprices_step_price, nx = s.poolvotingthresholds_committee_no_confidence, ox = s.poolvotingthresholds_hard_fork_initiation, ax = s.poolvotingthresholds_security_relevant_threshold, sx = s.plutusmap_len, ix = s.metadatamap_len, dx = s.plutusmapvalues_len, cx = s.plutusdata_to_json, px = s.plutusdata_from_json, wx = s.plutusmap_new, bx = s.metadatamap_new, lx = s.transactionmetadatumlabels_new, gx = s.__wbg_anchor_free, ux = s.anchor_to_bytes, fx = s.anchor_from_bytes, hx = s.anchor_to_hex, yx = s.anchor_from_hex, vx = s.anchor_to_json, mx = s.anchor_to_js_value, kx = s.anchor_from_json, xx = s.anchor_url, jx = s.anchor_anchor_data_hash, zx = s.anchor_new, Fx = s.__wbg_governanceactionid_free, Rx = s.governanceactionid_to_bytes, Ox = s.governanceactionid_from_bytes, qx = s.governanceactionid_to_hex, $x = s.governanceactionid_from_hex, Lx = s.governanceactionid_to_json, Jx = s.governanceactionid_to_js_value, Yx = s.governanceactionid_from_json, Qx = s.governanceactionid_transaction_id, Xx = s.governanceactionid_index, Zx = s.governanceactionid_new, Ux = s.__wbg_parameterchangeaction_free, Ex = s.parameterchangeaction_to_bytes, Kx = s.parameterchangeaction_from_bytes, Sx = s.parameterchangeaction_to_hex, Wx = s.parameterchangeaction_from_hex, Mx = s.parameterchangeaction_to_json, Gx = s.parameterchangeaction_to_js_value, Hx = s.parameterchangeaction_from_json, Ax = s.parameterchangeaction_gov_action_id, Ix = s.parameterchangeaction_protocol_param_updates, Dx = s.parameterchangeaction_policy_hash, Tx = s.parameterchangeaction_new, Nx = s.parameterchangeaction_new_with_action_id, Cx = s.parameterchangeaction_new_with_policy_hash, Vx = s.parameterchangeaction_new_with_policy_hash_and_action_id, Px = s.__wbg_hardforkinitiationaction_free, Bx = s.hardforkinitiationaction_to_bytes, tj = s.hardforkinitiationaction_from_bytes, _j = s.hardforkinitiationaction_to_hex, ej = s.hardforkinitiationaction_from_hex, rj = s.hardforkinitiationaction_to_json, nj = s.hardforkinitiationaction_to_js_value, oj = s.hardforkinitiationaction_from_json, aj = s.hardforkinitiationaction_gov_action_id, sj = s.hardforkinitiationaction_protocol_version, ij = s.hardforkinitiationaction_new, dj = s.hardforkinitiationaction_new_with_action_id, cj = s.__wbg_treasurywithdrawalsaction_free, pj = s.treasurywithdrawalsaction_to_bytes, wj = s.treasurywithdrawalsaction_from_bytes, bj = s.treasurywithdrawalsaction_to_hex, lj = s.treasurywithdrawalsaction_from_hex, gj = s.treasurywithdrawalsaction_to_json, uj = s.treasurywithdrawalsaction_to_js_value, fj = s.treasurywithdrawalsaction_from_json, hj = s.treasurywithdrawalsaction_withdrawals, yj = s.treasurywithdrawalsaction_policy_hash, vj = s.treasurywithdrawalsaction_new, mj = s.treasurywithdrawalsaction_new_with_policy_hash, kj = s.__wbg_updatecommitteeaction_free, xj = s.updatecommitteeaction_to_bytes, jj = s.updatecommitteeaction_from_bytes, zj = s.updatecommitteeaction_to_hex, Fj = s.updatecommitteeaction_from_hex, Rj = s.updatecommitteeaction_to_json, Oj = s.updatecommitteeaction_to_js_value, qj = s.updatecommitteeaction_from_json, $j = s.updatecommitteeaction_gov_action_id, Lj = s.updatecommitteeaction_committee, Jj = s.updatecommitteeaction_members_to_remove, Yj = s.updatecommitteeaction_new, Qj = s.updatecommitteeaction_new_with_action_id, Xj = s.__wbg_constitution_free, Zj = s.constitution_to_bytes, Uj = s.constitution_from_bytes, Ej = s.constitution_to_hex, Kj = s.constitution_from_hex, Sj = s.constitution_to_json, Wj = s.constitution_to_js_value, Mj = s.constitution_from_json, Gj = s.constitution_anchor, Hj = s.constitution_script_hash, Aj = s.constitution_new, Ij = s.constitution_new_with_script_hash, Dj = s.__wbg_newconstitutionaction_free, Tj = s.newconstitutionaction_to_bytes, Nj = s.newconstitutionaction_from_bytes, Cj = s.newconstitutionaction_to_hex, Vj = s.newconstitutionaction_from_hex, Pj = s.newconstitutionaction_to_json, Bj = s.newconstitutionaction_to_js_value, t2 = s.newconstitutionaction_from_json, _2 = s.newconstitutionaction_constitution, e2 = s.newconstitutionaction_new, r2 = s.newconstitutionaction_new_with_action_id, n2 = s.newconstitutionaction_has_script_hash, o2 = s.__wbg_votingproposal_free, a2 = s.votingproposal_to_bytes, s2 = s.votingproposal_from_bytes, i2 = s.votingproposal_to_hex, d2 = s.votingproposal_from_hex, c2 = s.votingproposal_to_json, p2 = s.votingproposal_to_js_value, w2 = s.votingproposal_from_json, b2 = s.votingproposal_governance_action, l2 = s.votingproposal_anchor, g2 = s.votingproposal_reward_account, u2 = s.votingproposal_deposit, f2 = s.votingproposal_new, h2 = s.transactioninput_to_bytes, y2 = s.transactioninput_from_bytes, v2 = s.transactioninput_to_hex, m2 = s.transactioninput_from_hex, k2 = s.transactioninput_to_json, x2 = s.transactioninput_to_js_value, j2 = s.transactioninput_from_json, z2 = s.__wbg_block_free, F2 = s.block_to_bytes, R2 = s.block_from_bytes, O2 = s.block_to_hex, q2 = s.block_from_hex, $2 = s.block_to_json, L2 = s.block_to_js_value, J2 = s.block_from_json, Y2 = s.block_header, Q2 = s.block_transaction_bodies, X2 = s.block_transaction_witness_sets, Z2 = s.block_auxiliary_data_set, U2 = s.block_invalid_transactions, E2 = s.block_new, K2 = s.__wbg_fixedblock_free, S2 = s.fixedblock_from_bytes, W2 = s.fixedblock_from_hex, M2 = s.fixedblock_header, G2 = s.fixedblock_transaction_bodies, H2 = s.fixedblock_transaction_witness_sets, A2 = s.fixedblock_auxiliary_data_set, I2 = s.fixedblock_invalid_transactions, D2 = s.fixedblock_block_hash, T2 = s.__wbg_header_free, N2 = s.header_to_bytes, C2 = s.header_from_bytes, V2 = s.header_to_hex, P2 = s.header_from_hex, B2 = s.header_to_json, tz = s.header_to_js_value, _z = s.header_from_json, ez = s.header_header_body, rz = s.header_body_signature, nz = s.header_new, oz = s.__wbg_transactionunspentoutput_free, az = s.transactionunspentoutput_to_bytes, sz = s.transactionunspentoutput_from_bytes, iz = s.transactionunspentoutput_to_hex, dz = s.transactionunspentoutput_from_hex, cz = s.transactionunspentoutput_to_json, pz = s.transactionunspentoutput_to_js_value, wz = s.transactionunspentoutput_from_json, bz = s.transactionunspentoutput_new, lz = s.transactionunspentoutput_input, gz = s.transactionunspentoutput_output, uz = s.__wbg_transactionunspentoutputs_free, fz = s.transactionunspentoutputs_to_json, hz = s.transactionunspentoutputs_to_js_value, yz = s.transactionunspentoutputs_from_json, vz = s.transactionunspentoutputs_new, mz = s.transactionunspentoutputs_len, kz = s.transactionunspentoutputs_get, xz = s.transactionunspentoutputs_add, jz = s.__wbg_value_free, zz = s.value_to_bytes, Fz = s.value_from_bytes, Rz = s.value_to_hex, Oz = s.value_from_hex, qz = s.value_to_json, $z = s.value_to_js_value, Lz = s.value_from_json, Jz = s.value_new, Yz = s.value_new_from_assets, Qz = s.value_new_with_assets, Xz = s.value_zero, Zz = s.value_is_zero, Uz = s.value_coin, Ez = s.value_set_coin, Kz = s.value_multiasset, Sz = s.value_set_multiasset, Wz = s.value_checked_add, Mz = s.value_checked_sub, Gz = s.value_clamped_sub, Hz = s.value_compare, Az = s.make_daedalus_bootstrap_witness, Iz = s.make_icarus_bootstrap_witness, Dz = s.make_vkey_witness, Tz = s.hash_auxiliary_data, Nz = s.hash_plutus_data, Cz = s.hash_script_data, Vz = s.get_implicit_input, Pz = s.get_deposit, Bz = s.min_ada_for_output, tF = s.encode_json_str_to_native_script, _F = s.has_transaction_set_tag, eF = s.__wbg_transactioninput_free, rF = s.transactioninput_index, nF = s.newconstitutionaction_gov_action_id, oF = s.transactioninput_new, aF = s.transactioninput_transaction_id, sF = s.__wbg_certificatesbuilder_free, iF = s.certificatesbuilder_new, dF = s.certificatesbuilder_add, cF = s.certificatesbuilder_add_with_plutus_witness, pF = s.certificatesbuilder_add_with_native_script, wF = s.certificatesbuilder_get_plutus_witnesses, bF = s.certificatesbuilder_get_ref_inputs, lF = s.certificatesbuilder_get_native_scripts, gF = s.certificatesbuilder_get_certificates_refund, uF = s.certificatesbuilder_get_certificates_deposit, fF = s.certificatesbuilder_has_plutus_scripts, hF = s.certificatesbuilder_build, yF = s.__wbg_votingbuilder_free, vF = s.votingbuilder_new, mF = s.votingbuilder_add, kF = s.votingbuilder_add_with_plutus_witness, xF = s.votingbuilder_add_with_native_script, jF = s.votingbuilder_get_plutus_witnesses, zF = s.votingbuilder_get_ref_inputs, FF = s.votingbuilder_get_native_scripts, RF = s.votingbuilder_has_plutus_scripts, OF = s.votingbuilder_build, qF = s.__wbg_votingproposalbuilder_free, $F = s.votingproposalbuilder_add, LF = s.votingproposalbuilder_add_with_plutus_witness, JF = s.votingproposalbuilder_get_plutus_witnesses, YF = s.votingproposalbuilder_get_ref_inputs, QF = s.votingproposalbuilder_has_plutus_scripts, XF = s.votingproposalbuilder_build, ZF = s.encrypt_with_password, UF = s.decrypt_with_password, EF = s.__wbg_certificates_free, KF = s.certificates_to_bytes, SF = s.certificates_from_bytes, WF = s.certificates_to_hex, MF = s.certificates_from_hex, GF = s.certificates_to_json, HF = s.certificates_to_js_value, AF = s.certificates_from_json, IF = s.certificates_new, DF = s.certificates_len, TF = s.certificates_get, NF = s.certificates_add, CF = s.__wbg_votingproposals_free, VF = s.votingproposals_to_bytes, PF = s.votingproposals_from_bytes, BF = s.votingproposals_to_hex, t3 = s.votingproposals_from_hex, _3 = s.votingproposals_to_json, e3 = s.votingproposals_to_js_value, r3 = s.votingproposals_from_json, n3 = s.votingproposals_get, o3 = s.votingproposals_add, a3 = s.votingproposals_contains, s3 = s.votingproposals_to_option, i3 = s.__wbg_plutusscript_free, d3 = s.plutusscript_to_bytes, c3 = s.plutusscript_from_bytes, p3 = s.plutusscript_to_hex, w3 = s.plutusscript_from_hex, b3 = s.plutusscript_new, l3 = s.plutusscript_new_v2, g3 = s.plutusscript_new_v3, u3 = s.plutusscript_new_with_version, f3 = s.plutusscript_bytes, h3 = s.plutusscript_from_bytes_v2, y3 = s.plutusscript_from_bytes_v3, v3 = s.plutusscript_from_bytes_with_version, m3 = s.plutusscript_from_hex_with_version, k3 = s.plutusscript_hash, x3 = s.plutusscript_language_version, j3 = s.__wbg_transactioninputs_free, z3 = s.transactioninputs_to_bytes, F3 = s.transactioninputs_from_bytes, R3 = s.transactioninputs_to_hex, O3 = s.transactioninputs_from_hex, q3 = s.transactioninputs_to_json, $3 = s.transactioninputs_to_js_value, L3 = s.transactioninputs_from_json, J3 = s.transactioninputs_new, Y3 = s.transactioninputs_len, Q3 = s.transactioninputs_get, X3 = s.transactioninputs_add, Z3 = s.transactioninputs_to_option, U3 = s.votingproposals_new, E3 = s.votingproposals_len, K3 = s.votingproposalbuilder_new, S3 = s.__wbg_mintwitness_free, W3 = s.mintwitness_new_native_script, M3 = s.mintwitness_new_plutus_script, G3 = s.__wbg_mintbuilder_free, H3 = s.mintbuilder_new, A3 = s.mintbuilder_add_asset, I3 = s.mintbuilder_set_asset, D3 = s.mintbuilder_build, T3 = s.mintbuilder_get_native_scripts, N3 = s.mintbuilder_get_plutus_witnesses, C3 = s.mintbuilder_get_ref_inputs, V3 = s.mintbuilder_get_redeemers, P3 = s.mintbuilder_has_plutus_scripts, B3 = s.mintbuilder_has_native_scripts, tR = s.__wbg_plutuswitness_free, _R = s.plutuswitness_new, eR = s.plutuswitness_new_with_ref, rR = s.plutuswitness_new_without_datum, nR = s.plutuswitness_new_with_ref_without_datum, oR = s.plutuswitness_script, aR = s.plutuswitness_datum, sR = s.plutuswitness_redeemer, iR = s.__wbg_plutuswitnesses_free, dR = s.plutuswitnesses_len, cR = s.plutuswitnesses_get, pR = s.plutuswitnesses_add, wR = s.__wbg_withdrawalsbuilder_free, bR = s.withdrawalsbuilder_add, lR = s.withdrawalsbuilder_add_with_plutus_witness, gR = s.withdrawalsbuilder_add_with_native_script, uR = s.withdrawalsbuilder_get_plutus_witnesses, fR = s.withdrawalsbuilder_get_ref_inputs, hR = s.withdrawalsbuilder_get_native_scripts, yR = s.withdrawalsbuilder_get_total_withdrawals, vR = s.withdrawalsbuilder_has_plutus_scripts, mR = s.withdrawalsbuilder_build, kR = s.__wbg_transactionoutputbuilder_free, xR = s.transactionoutputbuilder_new, jR = s.transactionoutputbuilder_with_address, zR = s.transactionoutputbuilder_with_data_hash, FR = s.transactionoutputbuilder_with_plutus_data, RR = s.transactionoutputbuilder_with_script_ref, OR = s.transactionoutputbuilder_next, qR = s.__wbg_transactionoutputamountbuilder_free, $R = s.transactionoutputamountbuilder_with_value, LR = s.transactionoutputamountbuilder_with_coin, JR = s.transactionoutputamountbuilder_with_coin_and_asset, YR = s.transactionoutputamountbuilder_with_asset_and_min_required_coin_by_utxo_cost, QR = s.transactionoutputamountbuilder_build, XR = s.__wbg_fixedtransaction_free, ZR = s.fixedtransaction_to_bytes, UR = s.fixedtransaction_from_bytes, ER = s.fixedtransaction_to_hex, KR = s.fixedtransaction_from_hex, SR = s.fixedtransaction_new, WR = s.fixedtransaction_new_with_auxiliary, MR = s.fixedtransaction_new_from_body_bytes, GR = s.fixedtransaction_body, HR = s.fixedtransaction_raw_body, AR = s.fixedtransaction_set_body, IR = s.fixedtransaction_set_witness_set, DR = s.fixedtransaction_witness_set, TR = s.fixedtransaction_raw_witness_set, NR = s.fixedtransaction_set_is_valid, CR = s.fixedtransaction_is_valid, VR = s.fixedtransaction_set_auxiliary_data, PR = s.fixedtransaction_auxiliary_data, BR = s.fixedtransaction_raw_auxiliary_data, t5 = s.fixedtransaction_transaction_hash, _5 = s.fixedtransaction_add_vkey_witness, e5 = s.fixedtransaction_add_bootstrap_witness, r5 = s.fixedtransaction_sign_and_add_vkey_signature, n5 = s.fixedtransaction_sign_and_add_icarus_bootstrap_signature, o5 = s.fixedtransaction_sign_and_add_daedalus_bootstrap_signature, a5 = s.__wbg_networkinfo_free, s5 = s.networkinfo_new, i5 = s.networkinfo_network_id, d5 = s.networkinfo_protocol_magic, c5 = s.networkinfo_testnet_preview, p5 = s.networkinfo_testnet_preprod, w5 = s.networkinfo_mainnet, b5 = s.__wbg_malformedaddress_free, l5 = s.malformedaddress_original_bytes, g5 = s.malformedaddress_to_address, u5 = s.malformedaddress_from_address, f5 = s.__wbg_byronaddress_free, h5 = s.byronaddress_to_base58, y5 = s.byronaddress_to_bytes, v5 = s.byronaddress_from_bytes, m5 = s.byronaddress_byron_protocol_magic, k5 = s.byronaddress_byron_address_kind, x5 = s.byronaddress_attributes, j5 = s.byronaddress_network_id, z5 = s.byronaddress_from_base58, F5 = s.byronaddress_icarus_from_key, R5 = s.byronaddress_is_valid, O5 = s.byronaddress_to_address, q5 = s.byronaddress_from_address, $5 = s.__wbg_address_free, L5 = s.address_from_bytes, J5 = s.address_to_json, Y5 = s.address_to_js_value, Q5 = s.address_from_json, X5 = s.address_kind, Z5 = s.address_payment_cred, U5 = s.address_is_malformed, E5 = s.address_to_hex, K5 = s.address_from_hex, S5 = s.address_to_bytes, W5 = s.address_to_bech32, M5 = s.address_from_bech32, G5 = s.address_network_id, H5 = s.__wbg_baseaddress_free, A5 = s.baseaddress_new, I5 = s.baseaddress_payment_cred, D5 = s.baseaddress_stake_cred, T5 = s.baseaddress_to_address, N5 = s.baseaddress_from_address, C5 = s.baseaddress_network_id, V5 = s.__wbg_enterpriseaddress_free, P5 = s.enterpriseaddress_new, B5 = s.enterpriseaddress_to_address, tO = s.enterpriseaddress_from_address, _O = s.enterpriseaddress_network_id, eO = s.rewardaddress_to_address, rO = s.rewardaddress_from_address, nO = s.__wbg_pointer_free, oO = s.pointer_new, aO = s.pointer_new_pointer, sO = s.pointer_slot, iO = s.pointer_tx_index, dO = s.pointer_cert_index, cO = s.pointer_slot_bignum, pO = s.pointer_tx_index_bignum, wO = s.pointer_cert_index_bignum, bO = s.__wbg_pointeraddress_free, lO = s.pointeraddress_new, gO = s.pointeraddress_payment_cred, uO = s.pointeraddress_stake_pointer, fO = s.pointeraddress_to_address, hO = s.pointeraddress_from_address, yO = s.pointeraddress_network_id, vO = s.__wbg_transactionwitnesssets_free, mO = s.transactionwitnesssets_to_bytes, kO = s.transactionwitnesssets_from_bytes, xO = s.transactionwitnesssets_to_hex, jO = s.transactionwitnesssets_from_hex, zO = s.transactionwitnesssets_to_json, FO = s.transactionwitnesssets_to_js_value, RO = s.transactionwitnesssets_from_json, OO = s.transactionwitnesssets_len, qO = s.transactionwitnesssets_get, $O = s.transactionwitnesssets_add, LO = s.__wbg_fixedtxwitnessesset_free, JO = s.fixedtxwitnessesset_tx_witnesses_set, YO = s.fixedtxwitnessesset_add_vkey_witness, QO = s.fixedtxwitnessesset_add_bootstrap_witness, XO = s.fixedtxwitnessesset_to_bytes, ZO = s.fixedtxwitnessesset_from_bytes, UO = s.__wbg_privatekey_free, EO = s.__wbg_nativescripts_free, KO = s.nativescripts_new, SO = s.nativescripts_len, WO = s.nativescripts_get, MO = s.nativescripts_add, GO = s.nativescripts_to_bytes, HO = s.nativescripts_from_bytes, AO = s.nativescripts_to_hex, IO = s.nativescripts_from_hex, DO = s.nativescripts_to_json, TO = s.nativescripts_to_js_value, NO = s.nativescripts_from_json, CO = s.__wbg_bigint_free, VO = s.bigint_to_bytes, PO = s.bigint_from_bytes, BO = s.bigint_to_hex, t9 = s.bigint_from_hex, _9 = s.bigint_to_json, e9 = s.bigint_to_js_value, r9 = s.bigint_from_json, n9 = s.bigint_is_zero, o9 = s.bigint_as_u64, a9 = s.bigint_as_int, s9 = s.bigint_from_str, i9 = s.bigint_to_str, d9 = s.bigint_add, c9 = s.bigint_sub, p9 = s.bigint_mul, w9 = s.bigint_pow, b9 = s.bigint_one, l9 = s.bigint_zero, g9 = s.bigint_abs, u9 = s.bigint_increment, f9 = s.bigint_div_ceil, h9 = s.bigint_div_floor, y9 = s.__wbg_fixedtransactionbody_free, v9 = s.fixedtransactionbody_from_bytes, m9 = s.fixedtransactionbody_from_hex, k9 = s.fixedtransactionbody_tx_hash, x9 = s.fixedtransactionbody_original_bytes, j9 = s.__wbg_transactionbodies_free, z9 = s.transactionbodies_to_bytes, F9 = s.transactionbodies_from_bytes, R9 = s.transactionbodies_to_hex, O9 = s.transactionbodies_from_hex, q9 = s.transactionbodies_to_json, $9 = s.transactionbodies_to_js_value, L9 = s.transactionbodies_from_json, J9 = s.transactionbodies_len, Y9 = s.transactionbodies_get, Q9 = s.transactionbodies_add, X9 = s.__wbg_fixedtransactionbodies_free, Z9 = s.fixedtransactionbodies_from_bytes, U9 = s.fixedtransactionbodies_from_hex, E9 = s.fixedtransactionbodies_new, K9 = s.fixedtransactionbodies_len, S9 = s.fixedtransactionbodies_get, W9 = s.fixedtransactionbodies_add, M9 = s.privatekey_from_hex, G9 = s.privatekey_to_hex, H9 = s.privatekey_sign, A9 = s.privatekey_from_normal_bytes, I9 = s.privatekey_from_extended_bytes, D9 = s.privatekey_as_bytes, T9 = s.privatekey_to_bech32, N9 = s.privatekey_from_bech32, C9 = s.privatekey_generate_ed25519extended, V9 = s.privatekey_generate_ed25519, P9 = s.privatekey_to_public, B9 = s.__wbg_rewardaddress_free, t8 = s.enterpriseaddress_payment_cred, _8 = s.rewardaddress_payment_cred, e8 = s.fixedtransactionbody_transaction_body, r8 = s.rewardaddress_new, n8 = s.withdrawalsbuilder_new, o8 = s.rewardaddress_network_id, a8 = s.transactionwitnesssets_new, s8 = s.transactionbodies_new, i8 = s.plutuswitnesses_new, d8 = s.__wbg_poolretirement_free, c8 = s.poolretirement_to_bytes, p8 = s.poolretirement_from_bytes, w8 = s.poolretirement_to_hex, b8 = s.poolretirement_from_hex, l8 = s.poolretirement_to_json, g8 = s.poolretirement_to_js_value, u8 = s.poolretirement_from_json, f8 = s.poolretirement_pool_keyhash, h8 = s.poolretirement_epoch, y8 = s.poolretirement_new, v8 = s.__wbg_stakedelegation_free, m8 = s.stakedelegation_to_bytes, k8 = s.stakedelegation_from_bytes, x8 = s.stakedelegation_to_hex, j8 = s.stakedelegation_from_hex, z8 = s.stakedelegation_to_json, F8 = s.stakedelegation_to_js_value, R8 = s.stakedelegation_from_json, O8 = s.stakedelegation_stake_credential, q8 = s.stakedelegation_pool_keyhash, $8 = s.stakedelegation_new, L8 = s.stakedelegation_has_script_credentials, J8 = s.__wbg_committeecoldresign_free, Y8 = s.committeecoldresign_to_bytes, Q8 = s.committeecoldresign_from_bytes, X8 = s.committeecoldresign_to_hex, Z8 = s.committeecoldresign_from_hex, U8 = s.committeecoldresign_to_json, E8 = s.committeecoldresign_to_js_value, K8 = s.committeecoldresign_from_json, S8 = s.committeecoldresign_committee_cold_credential, W8 = s.committeecoldresign_anchor, M8 = s.committeecoldresign_new, G8 = s.committeecoldresign_new_with_anchor, H8 = s.committeecoldresign_has_script_credentials, A8 = s.__wbg_drepregistration_free, I8 = s.drepregistration_to_bytes, D8 = s.drepregistration_from_bytes, T8 = s.drepregistration_to_hex, N8 = s.drepregistration_from_hex, C8 = s.drepregistration_to_json, V8 = s.drepregistration_to_js_value, P8 = s.drepregistration_from_json, B8 = s.drepregistration_voting_credential, t7 = s.drepregistration_coin, _7 = s.drepregistration_anchor, e7 = s.drepregistration_new, r7 = s.drepregistration_new_with_anchor, n7 = s.drepregistration_has_script_credentials, o7 = s.__wbg_votingprocedure_free, a7 = s.votingprocedure_to_bytes, s7 = s.votingprocedure_from_bytes, i7 = s.votingprocedure_to_hex, d7 = s.votingprocedure_from_hex, c7 = s.votingprocedure_to_json, p7 = s.votingprocedure_to_js_value, w7 = s.votingprocedure_from_json, b7 = s.votingprocedure_new, l7 = s.votingprocedure_new_with_anchor, g7 = s.votingprocedure_vote_kind, u7 = s.__wbg_governanceactionids_free, f7 = s.governanceactionids_to_json, h7 = s.governanceactionids_to_js_value, y7 = s.governanceactionids_from_json, v7 = s.governanceactionids_new, m7 = s.governanceactionids_add, k7 = s.governanceactionids_get, x7 = s.governanceactionids_len, j7 = s.__wbg_infoaction_free, z7 = s.infoaction_new, F7 = s.__wbg_vkeywitness_free, R7 = s.vkeywitness_to_bytes, O7 = s.vkeywitness_from_bytes, q7 = s.vkeywitness_to_hex, $7 = s.vkeywitness_from_hex, L7 = s.vkeywitness_to_json, J7 = s.vkeywitness_to_js_value, Y7 = s.vkeywitness_from_json, Q7 = s.vkeywitness_new, X7 = s.vkeywitness_vkey, Z7 = s.vkeywitness_signature, U7 = s.__wbg_bip32privatekey_free, E7 = s.bip32privatekey_derive, K7 = s.bip32privatekey_from_128_xprv, S7 = s.bip32privatekey_to_128_xprv, W7 = s.bip32privatekey_generate_ed25519_bip32, M7 = s.bip32privatekey_to_raw_key, G7 = s.bip32privatekey_to_public, H7 = s.bip32privatekey_from_bytes, A7 = s.bip32privatekey_as_bytes, I7 = s.bip32privatekey_from_bech32, D7 = s.bip32privatekey_to_bech32, T7 = s.bip32privatekey_from_bip39_entropy, N7 = s.bip32privatekey_chaincode, C7 = s.bip32privatekey_to_hex, V7 = s.bip32privatekey_from_hex, P7 = s.vkeys_get, B7 = s.vkeys_add, tq = s.__wbg_publickeys_free, _q = s.publickeys_new, eq = s.publickeys_size, rq = s.publickeys_get, nq = s.publickeys_add, oq = s.__wbg_kessignature_free, aq = s.kessignature_to_bytes, sq = s.kessignature_from_bytes, iq = s.__wbg_nativescript_free, dq = s.nativescript_to_bytes, cq = s.nativescript_from_bytes, pq = s.nativescript_to_hex, wq = s.nativescript_from_hex, bq = s.nativescript_to_json, lq = s.nativescript_to_js_value, gq = s.nativescript_from_json, uq = s.nativescript_hash, fq = s.nativescript_new_script_pubkey, hq = s.nativescript_new_script_all, yq = s.nativescript_new_script_any, vq = s.nativescript_new_script_n_of_k, mq = s.nativescript_new_timelock_start, kq = s.nativescript_new_timelock_expiry, xq = s.nativescript_kind, jq = s.nativescript_as_script_pubkey, zq = s.nativescript_as_script_all, Fq = s.nativescript_as_script_any, Rq = s.nativescript_as_script_n_of_k, Oq = s.nativescript_as_timelock_start, qq = s.nativescript_as_timelock_expiry, $q = s.nativescript_get_required_signers, Lq = s.__wbg_scriptpubkey_free, Jq = s.scriptpubkey_to_bytes, Yq = s.scriptpubkey_from_bytes, Qq = s.scriptpubkey_to_hex, Xq = s.scriptpubkey_from_hex, Zq = s.scriptpubkey_to_json, Uq = s.scriptpubkey_to_js_value, Eq = s.scriptpubkey_from_json, Kq = s.scriptpubkey_addr_keyhash, Sq = s.scriptpubkey_new, Wq = s.__wbg_scriptall_free, Mq = s.scriptall_to_bytes, Gq = s.scriptall_from_bytes, Hq = s.scriptall_to_hex, Aq = s.scriptall_from_hex, Iq = s.scriptall_to_json, Dq = s.scriptall_to_js_value, Tq = s.scriptall_from_json, Nq = s.scriptall_native_scripts, Cq = s.scriptall_new, Vq = s.scriptany_to_bytes, Pq = s.scriptany_from_bytes, Bq = s.scriptany_to_hex, t$ = s.scriptany_from_hex, _$ = s.scriptany_to_json, e$ = s.scriptany_to_js_value, r$ = s.scriptany_from_json, n$ = s.__wbg_scriptnofk_free, o$ = s.scriptnofk_to_bytes, a$ = s.scriptnofk_from_bytes, s$ = s.scriptnofk_to_hex, i$ = s.scriptnofk_from_hex, d$ = s.scriptnofk_to_json, c$ = s.scriptnofk_to_js_value, p$ = s.scriptnofk_from_json, w$ = s.scriptnofk_n, b$ = s.scriptnofk_new, l$ = s.timelockstart_to_bytes, g$ = s.timelockstart_from_bytes, u$ = s.timelockstart_to_hex, f$ = s.timelockstart_from_hex, h$ = s.timelockstart_to_json, y$ = s.timelockstart_to_js_value, v$ = s.timelockstart_from_json, m$ = s.__wbg_timelockexpiry_free, k$ = s.timelockexpiry_to_bytes, x$ = s.timelockexpiry_from_bytes, j$ = s.timelockexpiry_to_hex, z$ = s.timelockexpiry_from_hex, F$ = s.timelockexpiry_to_json, R$ = s.timelockexpiry_to_js_value, O$ = s.timelockexpiry_from_json, q$ = s.timelockexpiry_slot, $$ = s.timelockexpiry_slot_bignum, L$ = s.timelockexpiry_new, J$ = s.timelockexpiry_new_timelockexpiry, Y$ = s.__wbg_headerbody_free, Q$ = s.headerbody_to_bytes, X$ = s.headerbody_from_bytes, Z$ = s.headerbody_to_hex, U$ = s.headerbody_from_hex, E$ = s.headerbody_to_json, K$ = s.headerbody_to_js_value, S$ = s.headerbody_from_json, W$ = s.headerbody_block_number, M$ = s.headerbody_slot, G$ = s.headerbody_slot_bignum, H$ = s.headerbody_prev_hash, A$ = s.headerbody_issuer_vkey, I$ = s.headerbody_vrf_vkey, D$ = s.headerbody_has_nonce_and_leader_vrf, T$ = s.headerbody_nonce_vrf_or_nothing, N$ = s.headerbody_leader_vrf_or_nothing, C$ = s.headerbody_has_vrf_result, V$ = s.headerbody_vrf_result_or_nothing, P$ = s.headerbody_block_body_size, B$ = s.headerbody_block_body_hash, tL = s.headerbody_operational_cert, _L = s.headerbody_protocol_version, eL = s.headerbody_new, rL = s.headerbody_new_headerbody, nL = s.votingprocedure_anchor, oL = s.__wbg_scriptany_free, aL = s.timelockstart_slot_bignum, sL = s.timelockstart_slot, iL = s.vkeys_len, dL = s.scriptany_native_scripts, cL = s.scriptnofk_native_scripts, pL = s.scriptany_new, wL = s.__wbg_vkeys_free, bL = s.vkeys_new, lL = s.__wbg_timelockstart_free, gL = s.timelockstart_new_timelockstart, uL = s.timelockstart_new, fL = s.__wbg_plutusscriptsource_free, hL = s.plutusscriptsource_new, yL = s.plutusscriptsource_new_ref_input, vL = s.plutusscriptsource_set_required_signers, mL = s.plutusscriptsource_get_ref_script_size, kL = s.__wbg_nativescriptsource_free, xL = s.nativescriptsource_new, jL = s.nativescriptsource_new_ref_input, zL = s.nativescriptsource_set_required_signers, FL = s.nativescriptsource_get_ref_script_size, RL = s.__wbg_transactionbatchlist_free, OL = s.transactionbatchlist_len, qL = s.transactionbatchlist_get, $L = s.__wbg_transactionbatch_free, LL = s.transactionbatch_len, JL = s.transactionbatch_get, YL = s.create_send_all, QL = s.__wbg_txinputsbuilder_free, XL = s.txinputsbuilder_new, ZL = s.txinputsbuilder_add_regular_utxo, UL = s.txinputsbuilder_add_plutus_script_utxo, EL = s.txinputsbuilder_add_native_script_utxo, KL = s.txinputsbuilder_add_key_input, SL = s.txinputsbuilder_add_native_script_input, WL = s.txinputsbuilder_add_plutus_script_input, ML = s.txinputsbuilder_add_bootstrap_input, GL = s.txinputsbuilder_add_regular_input, HL = s.txinputsbuilder_get_ref_inputs, AL = s.txinputsbuilder_get_native_input_scripts, IL = s.txinputsbuilder_get_plutus_input_scripts, DL = s.txinputsbuilder_len, TL = s.txinputsbuilder_add_required_signer, NL = s.txinputsbuilder_add_required_signers, CL = s.txinputsbuilder_total_value, VL = s.txinputsbuilder_inputs, PL = s.txinputsbuilder_inputs_option, BL = s.__wbg_certificate_free, tJ = s.certificate_to_bytes, _J = s.certificate_from_bytes, eJ = s.certificate_to_hex, rJ = s.certificate_from_hex, nJ = s.certificate_to_json, oJ = s.certificate_to_js_value, aJ = s.certificate_from_json, sJ = s.certificate_new_stake_registration, iJ = s.certificate_new_reg_cert, dJ = s.certificate_new_stake_deregistration, cJ = s.certificate_new_unreg_cert, pJ = s.certificate_new_stake_delegation, wJ = s.certificate_new_pool_registration, bJ = s.certificate_new_pool_retirement, lJ = s.certificate_new_genesis_key_delegation, gJ = s.certificate_new_move_instantaneous_rewards_cert, uJ = s.certificate_new_committee_hot_auth, fJ = s.certificate_new_committee_cold_resign, hJ = s.certificate_new_drep_deregistration, yJ = s.certificate_new_drep_registration, vJ = s.certificate_new_drep_update, mJ = s.certificate_new_stake_and_vote_delegation, kJ = s.certificate_new_stake_registration_and_delegation, xJ = s.certificate_new_stake_vote_registration_and_delegation, jJ = s.certificate_new_vote_delegation, zJ = s.certificate_new_vote_registration_and_delegation, FJ = s.certificate_kind, RJ = s.certificate_as_stake_registration, OJ = s.certificate_as_reg_cert, qJ = s.certificate_as_stake_deregistration, $J = s.certificate_as_unreg_cert, LJ = s.certificate_as_stake_delegation, JJ = s.certificate_as_pool_registration, YJ = s.certificate_as_pool_retirement, QJ = s.certificate_as_genesis_key_delegation, XJ = s.certificate_as_move_instantaneous_rewards_cert, ZJ = s.certificate_as_committee_hot_auth, UJ = s.certificate_as_committee_cold_resign, EJ = s.certificate_as_drep_deregistration, KJ = s.certificate_as_drep_registration, SJ = s.certificate_as_drep_update, WJ = s.certificate_as_stake_and_vote_delegation, MJ = s.certificate_as_stake_registration_and_delegation, GJ = s.certificate_as_stake_vote_registration_and_delegation, HJ = s.certificate_as_vote_delegation, AJ = s.certificate_as_vote_registration_and_delegation, IJ = s.certificate_has_required_script_witness, DJ = s.__wbg_genesiskeydelegation_free, TJ = s.genesiskeydelegation_to_bytes, NJ = s.genesiskeydelegation_from_bytes, CJ = s.genesiskeydelegation_to_hex, VJ = s.genesiskeydelegation_from_hex, PJ = s.genesiskeydelegation_to_json, BJ = s.genesiskeydelegation_to_js_value, tY = s.genesiskeydelegation_from_json, _Y = s.genesiskeydelegation_genesishash, eY = s.genesiskeydelegation_genesis_delegate_hash, rY = s.genesiskeydelegation_vrf_keyhash, nY = s.genesiskeydelegation_new, oY = s.__wbg_stakederegistration_free, aY = s.stakederegistration_to_bytes, sY = s.stakederegistration_from_bytes, iY = s.stakederegistration_to_hex, dY = s.stakederegistration_from_hex, cY = s.stakederegistration_to_json, pY = s.stakederegistration_to_js_value, wY = s.stakederegistration_from_json, bY = s.stakederegistration_stake_credential, lY = s.stakederegistration_coin, gY = s.stakederegistration_new, uY = s.stakederegistration_new_with_explicit_refund, fY = s.stakederegistration_has_script_credentials, hY = s.__wbg_voters_free, yY = s.voters_to_json, vY = s.voters_to_js_value, mY = s.voters_from_json, kY = s.voters_new, xY = s.voters_add, jY = s.voters_get, zY = s.voters_len, FY = s.__wbg_plutusscripts_free, RY = s.plutusscripts_to_bytes, OY = s.plutusscripts_from_bytes, qY = s.plutusscripts_to_hex, $Y = s.plutusscripts_from_hex, LY = s.plutusscripts_to_json, JY = s.plutusscripts_to_js_value, YY = s.plutusscripts_from_json, QY = s.plutusscripts_new, XY = s.plutusscripts_len, ZY = s.plutusscripts_get, UY = s.plutusscripts_add, EY = s.__wbg_costmdls_free, KY = s.costmdls_to_bytes, SY = s.costmdls_from_bytes, WY = s.costmdls_to_hex, MY = s.costmdls_from_hex, GY = s.costmdls_to_json, HY = s.costmdls_to_js_value, AY = s.costmdls_from_json, IY = s.costmdls_new, DY = s.costmdls_len, TY = s.costmdls_insert, NY = s.costmdls_get, CY = s.costmdls_keys, VY = s.costmdls_retain_language_versions, PY = s.__wbg_ed25519keyhashes_free, BY = s.ed25519keyhashes_to_bytes, tQ = s.ed25519keyhashes_from_bytes, _Q = s.ed25519keyhashes_to_hex, eQ = s.ed25519keyhashes_from_hex, rQ = s.ed25519keyhashes_to_json, nQ = s.ed25519keyhashes_to_js_value, oQ = s.ed25519keyhashes_from_json, aQ = s.ed25519keyhashes_new, sQ = s.ed25519keyhashes_len, iQ = s.ed25519keyhashes_get, dQ = s.ed25519keyhashes_add, cQ = s.ed25519keyhashes_contains, pQ = s.ed25519keyhashes_to_option, wQ = s.__wbg_ed25519keyhash_free, bQ = s.ed25519keyhash_from_bytes, lQ = s.ed25519keyhash_to_bytes, gQ = s.ed25519keyhash_to_bech32, uQ = s.ed25519keyhash_from_bech32, fQ = s.ed25519keyhash_to_hex, hQ = s.ed25519keyhash_from_hex, yQ = s.scripthash_from_bytes, vQ = s.scripthash_from_bech32, mQ = s.scripthash_from_hex, kQ = s.__wbg_anchordatahash_free, xQ = s.anchordatahash_from_bytes, jQ = s.anchordatahash_to_bytes, zQ = s.anchordatahash_to_bech32, FQ = s.anchordatahash_from_bech32, RQ = s.anchordatahash_to_hex, OQ = s.anchordatahash_from_hex, qQ = s.transactionhash_from_bytes, $Q = s.transactionhash_from_bech32, LQ = s.transactionhash_from_hex, JQ = s.genesisdelegatehash_from_bytes, YQ = s.genesisdelegatehash_from_bech32, QQ = s.genesisdelegatehash_from_hex, XQ = s.genesishash_from_bytes, ZQ = s.genesishash_from_bech32, UQ = s.genesishash_from_hex, EQ = s.auxiliarydatahash_from_bytes, KQ = s.auxiliarydatahash_from_bech32, SQ = s.auxiliarydatahash_from_hex, WQ = s.poolmetadatahash_from_bytes, MQ = s.poolmetadatahash_from_bech32, GQ = s.poolmetadatahash_from_hex, HQ = s.vrfkeyhash_from_bytes, AQ = s.vrfkeyhash_from_bech32, IQ = s.vrfkeyhash_from_hex, DQ = s.blockhash_from_bytes, TQ = s.blockhash_from_bech32, NQ = s.blockhash_from_hex, CQ = s.datahash_from_bytes, VQ = s.datahash_from_bech32, PQ = s.datahash_from_hex, BQ = s.scriptdatahash_from_bytes, tX = s.scriptdatahash_from_bech32, _X = s.scriptdatahash_from_hex, eX = s.vrfvkey_from_bytes, rX = s.vrfvkey_from_bech32, nX = s.vrfvkey_from_hex, oX = s.kesvkey_from_bytes, aX = s.kesvkey_from_bech32, sX = s.kesvkey_from_hex, iX = s.__wbg_scripthash_free, dX = s.__wbg_transactionhash_free, cX = s.__wbg_genesisdelegatehash_free, pX = s.__wbg_genesishash_free, wX = s.__wbg_auxiliarydatahash_free, bX = s.__wbg_poolmetadatahash_free, lX = s.__wbg_vrfkeyhash_free, gX = s.__wbg_blockhash_free, uX = s.__wbg_datahash_free, fX = s.__wbg_scriptdatahash_free, hX = s.__wbg_vrfvkey_free, yX = s.__wbg_kesvkey_free, vX = s.scripthash_to_hex, mX = s.transactionhash_to_hex, kX = s.genesisdelegatehash_to_hex, xX = s.genesishash_to_hex, jX = s.auxiliarydatahash_to_hex, zX = s.poolmetadatahash_to_hex, FX = s.vrfkeyhash_to_hex, RX = s.blockhash_to_hex, OX = s.datahash_to_hex, qX = s.scriptdatahash_to_hex, $X = s.vrfvkey_to_hex, LX = s.kesvkey_to_hex, JX = s.scripthash_to_bytes, YX = s.vrfkeyhash_to_bytes, QX = s.genesisdelegatehash_to_bytes, XX = s.genesishash_to_bytes, ZX = s.transactionhash_to_bytes, UX = s.poolmetadatahash_to_bytes, EX = s.auxiliarydatahash_to_bytes, KX = s.blockhash_to_bytes, SX = s.datahash_to_bytes, WX = s.scriptdatahash_to_bytes, MX = s.vrfvkey_to_bytes, GX = s.kesvkey_to_bytes, HX = s.scripthash_to_bech32, AX = s.vrfkeyhash_to_bech32, IX = s.genesisdelegatehash_to_bech32, DX = s.genesishash_to_bech32, TX = s.transactionhash_to_bech32, NX = s.poolmetadatahash_to_bech32, CX = s.auxiliarydatahash_to_bech32, VX = s.blockhash_to_bech32, PX = s.datahash_to_bech32, BX = s.scriptdatahash_to_bech32, tZ = s.vrfvkey_to_bech32, _Z = s.kesvkey_to_bech32, eZ = s.__wbg_transactionbuilderconfig_free, rZ = s.__wbg_transactionbuilderconfigbuilder_free, nZ = s.transactionbuilderconfigbuilder_new, oZ = s.transactionbuilderconfigbuilder_fee_algo, aZ = s.transactionbuilderconfigbuilder_coins_per_utxo_byte, sZ = s.transactionbuilderconfigbuilder_ex_unit_prices, iZ = s.transactionbuilderconfigbuilder_pool_deposit, dZ = s.transactionbuilderconfigbuilder_key_deposit, cZ = s.transactionbuilderconfigbuilder_max_value_size, pZ = s.transactionbuilderconfigbuilder_max_tx_size, wZ = s.transactionbuilderconfigbuilder_ref_script_coins_per_byte, bZ = s.transactionbuilderconfigbuilder_prefer_pure_change, lZ = s.transactionbuilderconfigbuilder_deduplicate_explicit_ref_inputs_with_regular_inputs, gZ = s.transactionbuilderconfigbuilder_do_not_burn_extra_change, uZ = s.transactionbuilderconfigbuilder_build, fZ = s.__wbg_changeconfig_free, hZ = s.changeconfig_new, yZ = s.changeconfig_change_address, vZ = s.changeconfig_change_plutus_data, mZ = s.changeconfig_change_script_ref, kZ = s.__wbg_transactionbuilder_free, xZ = s.transactionbuilder_add_inputs_from, jZ = s.transactionbuilder_set_inputs, zZ = s.transactionbuilder_set_collateral, FZ = s.transactionbuilder_set_collateral_return, RZ = s.transactionbuilder_remove_collateral_return, OZ = s.transactionbuilder_set_collateral_return_and_total, qZ = s.transactionbuilder_set_total_collateral, $Z = s.transactionbuilder_remove_total_collateral, LZ = s.transactionbuilder_set_total_collateral_and_return, JZ = s.transactionbuilder_add_reference_input, YZ = s.transactionbuilder_add_script_reference_input, QZ = s.transactionbuilder_add_key_input, XZ = s.transactionbuilder_add_native_script_input, ZZ = s.transactionbuilder_add_plutus_script_input, UZ = s.transactionbuilder_add_bootstrap_input, EZ = s.transactionbuilder_add_regular_input, KZ = s.transactionbuilder_add_inputs_from_and_change, SZ = s.transactionbuilder_add_inputs_from_and_change_with_collateral_return, WZ = s.transactionbuilder_get_native_input_scripts, MZ = s.transactionbuilder_get_plutus_input_scripts, GZ = s.transactionbuilder_fee_for_input, HZ = s.transactionbuilder_add_output, AZ = s.transactionbuilder_fee_for_output, IZ = s.transactionbuilder_set_fee, DZ = s.transactionbuilder_set_min_fee, TZ = s.transactionbuilder_set_ttl, NZ = s.transactionbuilder_set_ttl_bignum, CZ = s.transactionbuilder_remove_ttl, VZ = s.transactionbuilder_set_validity_start_interval, PZ = s.transactionbuilder_set_validity_start_interval_bignum, BZ = s.transactionbuilder_remove_validity_start_interval, tU = s.transactionbuilder_set_certs, _U = s.transactionbuilder_remove_certs, eU = s.transactionbuilder_set_certs_builder, rU = s.transactionbuilder_set_withdrawals, nU = s.transactionbuilder_set_withdrawals_builder, oU = s.transactionbuilder_set_voting_builder, aU = s.transactionbuilder_set_voting_proposal_builder, sU = s.transactionbuilder_remove_withdrawals, iU = s.transactionbuilder_get_auxiliary_data, dU = s.transactionbuilder_set_auxiliary_data, cU = s.transactionbuilder_remove_auxiliary_data, pU = s.transactionbuilder_set_metadata, wU = s.transactionbuilder_add_metadatum, bU = s.transactionbuilder_add_json_metadatum, lU = s.transactionbuilder_add_json_metadatum_with_schema, gU = s.transactionbuilder_set_mint_builder, uU = s.transactionbuilder_remove_mint_builder, fU = s.transactionbuilder_get_mint_builder, hU = s.transactionbuilder_set_mint, yU = s.transactionbuilder_get_mint, vU = s.transactionbuilder_get_mint_scripts, mU = s.transactionbuilder_set_mint_asset, kU = s.transactionbuilder_add_mint_asset, xU = s.transactionbuilder_add_mint_asset_and_output, jU = s.transactionbuilder_add_mint_asset_and_output_min_required_coin, zU = s.transactionbuilder_add_extra_witness_datum, FU = s.transactionbuilder_get_extra_witness_datums, RU = s.transactionbuilder_set_donation, OU = s.transactionbuilder_get_donation, qU = s.transactionbuilder_set_current_treasury_value, $U = s.transactionbuilder_get_current_treasury_value, LU = s.transactionbuilder_new, JU = s.transactionbuilder_get_reference_inputs, YU = s.transactionbuilder_get_explicit_input, QU = s.transactionbuilder_get_implicit_input, XU = s.transactionbuilder_get_total_input, ZU = s.transactionbuilder_get_total_output, UU = s.transactionbuilder_get_explicit_output, EU = s.transactionbuilder_get_deposit, KU = s.transactionbuilder_get_fee_if_set, SU = s.transactionbuilder_add_change_if_needed, WU = s.transactionbuilder_add_change_if_needed_with_datum, MU = s.transactionbuilder_calc_script_data_hash, GU = s.transactionbuilder_set_script_data_hash, HU = s.transactionbuilder_remove_script_data_hash, AU = s.transactionbuilder_add_required_signer, IU = s.transactionbuilder_full_size, DU = s.transactionbuilder_output_sizes, TU = s.transactionbuilder_build, NU = s.transactionbuilder_build_tx, CU = s.transactionbuilder_build_tx_unsafe, VU = s.transactionbuilder_min_fee, PU = s.__wbg_votingprocedures_free, BU = s.votingprocedures_to_bytes, tE = s.votingprocedures_from_bytes, _E = s.votingprocedures_to_hex, eE = s.votingprocedures_from_hex, rE = s.votingprocedures_to_json, nE = s.votingprocedures_to_js_value, oE = s.votingprocedures_from_json, aE = s.votingprocedures_insert, sE = s.votingprocedures_get, iE = s.votingprocedures_get_voters, dE = s.votingprocedures_get_governance_action_ids_by_voter, cE = s.__wbg_treasurywithdrawals_free, pE = s.treasurywithdrawals_to_json, wE = s.treasurywithdrawals_to_js_value, bE = s.treasurywithdrawals_from_json, lE = s.treasurywithdrawals_new, gE = s.treasurywithdrawals_get, uE = s.treasurywithdrawals_insert, fE = s.treasurywithdrawals_keys, hE = s.treasurywithdrawals_len, yE = s.__wbg_committee_free, vE = s.committee_to_bytes, mE = s.committee_from_bytes, kE = s.committee_to_hex, xE = s.committee_from_hex, jE = s.committee_to_json, zE = s.committee_to_js_value, FE = s.committee_from_json, RE = s.committee_new, OE = s.committee_members_keys, qE = s.committee_quorum_threshold, $E = s.committee_add_member, LE = s.committee_get_member_epoch, JE = s.__wbg_costmodel_free, YE = s.costmodel_to_bytes, QE = s.costmodel_from_bytes, XE = s.costmodel_to_hex, ZE = s.costmodel_from_hex, UE = s.costmodel_to_json, EE = s.costmodel_to_js_value, KE = s.costmodel_from_json, SE = s.costmodel_new, WE = s.costmodel_set, ME = s.costmodel_get, GE = s.costmodel_len, HE = s.__wbg_exunits_free, AE = s.exunits_to_bytes, IE = s.exunits_from_bytes, DE = s.exunits_to_hex, TE = s.exunits_from_hex, NE = s.exunits_to_json, CE = s.exunits_to_js_value, VE = s.exunits_from_json, PE = s.exunits_mem, BE = s.exunits_steps, tK = s.exunits_new, _K = s.__wbg_transactionbody_free, eK = s.transactionbody_to_bytes, rK = s.transactionbody_from_bytes, nK = s.transactionbody_to_hex, oK = s.transactionbody_from_hex, aK = s.transactionbody_to_json, sK = s.transactionbody_to_js_value, iK = s.transactionbody_from_json, dK = s.transactionbody_inputs, cK = s.transactionbody_outputs, pK = s.transactionbody_fee, wK = s.transactionbody_ttl, bK = s.transactionbody_ttl_bignum, lK = s.transactionbody_set_ttl, gK = s.transactionbody_remove_ttl, uK = s.transactionbody_set_certs, fK = s.transactionbody_certs, hK = s.transactionbody_set_withdrawals, yK = s.transactionbody_withdrawals, vK = s.transactionbody_set_update, mK = s.transactionbody_update, kK = s.transactionbody_set_auxiliary_data_hash, xK = s.transactionbody_auxiliary_data_hash, jK = s.transactionbody_set_validity_start_interval, zK = s.transactionbody_set_validity_start_interval_bignum, FK = s.transactionbody_validity_start_interval_bignum, RK = s.transactionbody_validity_start_interval, OK = s.transactionbody_set_mint, qK = s.transactionbody_mint, $K = s.transactionbody_set_reference_inputs, LK = s.transactionbody_reference_inputs, JK = s.transactionbody_set_script_data_hash, YK = s.transactionbody_script_data_hash, QK = s.transactionbody_set_collateral, XK = s.transactionbody_collateral, ZK = s.transactionbody_set_required_signers, UK = s.transactionbody_required_signers, EK = s.transactionbody_set_network_id, KK = s.transactionbody_network_id, SK = s.transactionbody_set_collateral_return, WK = s.transactionbody_collateral_return, MK = s.transactionbody_set_total_collateral, GK = s.transactionbody_total_collateral, HK = s.transactionbody_set_voting_procedures, AK = s.transactionbody_voting_procedures, IK = s.transactionbody_set_voting_proposals, DK = s.transactionbody_voting_proposals, TK = s.transactionbody_set_donation, NK = s.transactionbody_donation, CK = s.transactionbody_set_current_treasury_value, VK = s.transactionbody_current_treasury_value, PK = s.transactionbody_new, BK = s.transactionbody_new_tx_body, tS = s.__wbg_transactionwitnessset_free, _S = s.transactionwitnessset_to_bytes, eS = s.transactionwitnessset_from_bytes, rS = s.transactionwitnessset_to_hex, nS = s.transactionwitnessset_from_hex, oS = s.transactionwitnessset_to_json, aS = s.transactionwitnessset_to_js_value, sS = s.transactionwitnessset_from_json, iS = s.transactionwitnessset_set_vkeys, dS = s.transactionwitnessset_vkeys, cS = s.transactionwitnessset_set_native_scripts, pS = s.transactionwitnessset_native_scripts, wS = s.transactionwitnessset_set_bootstraps, bS = s.transactionwitnessset_bootstraps, lS = s.transactionwitnessset_set_plutus_scripts, gS = s.transactionwitnessset_plutus_scripts, uS = s.transactionwitnessset_set_plutus_data, fS = s.transactionwitnessset_plutus_data, hS = s.transactionwitnessset_set_redeemers, yS = s.transactionwitnessset_redeemers, vS = s.transactionwitnessset_new, mS = s.__wbg_vrfcert_free, kS = s.vrfcert_to_bytes, xS = s.vrfcert_from_bytes, jS = s.vrfcert_to_hex, zS = s.vrfcert_from_hex, FS = s.vrfcert_to_json, RS = s.vrfcert_to_js_value, OS = s.vrfcert_from_json, qS = s.vrfcert_output, $S = s.vrfcert_proof, LS = s.vrfcert_new, JS = s.votingprocedures_new, YS = s.__wbg_datumsource_free, QS = s.datumsource_new, XS = s.datumsource_new_ref_input, ZS = s.__wbg_drepderegistration_free, US = s.drepderegistration_to_bytes, ES = s.drepderegistration_from_bytes, KS = s.drepderegistration_to_hex, SS = s.drepderegistration_from_hex, WS = s.drepderegistration_to_json, MS = s.drepderegistration_to_js_value, GS = s.drepderegistration_from_json, HS = s.drepderegistration_voting_credential, AS = s.drepderegistration_coin, IS = s.drepderegistration_new, DS = s.drepderegistration_has_script_credentials, TS = s.__wbg_drepupdate_free, NS = s.drepupdate_to_bytes, CS = s.drepupdate_from_bytes, VS = s.drepupdate_to_hex, PS = s.drepupdate_from_hex, BS = s.drepupdate_to_json, tW = s.drepupdate_to_js_value, _W = s.drepupdate_from_json, eW = s.drepupdate_voting_credential, rW = s.drepupdate_anchor, nW = s.drepupdate_new, oW = s.drepupdate_new_with_anchor, aW = s.drepupdate_has_script_credentials, sW = s.__wbg_noconfidenceaction_free, iW = s.noconfidenceaction_to_bytes, dW = s.noconfidenceaction_from_bytes, cW = s.noconfidenceaction_to_hex, pW = s.noconfidenceaction_from_hex, wW = s.noconfidenceaction_to_json, bW = s.noconfidenceaction_to_js_value, lW = s.noconfidenceaction_from_json, gW = s.noconfidenceaction_gov_action_id, uW = s.noconfidenceaction_new, fW = s.noconfidenceaction_new_with_action_id, hW = s.__wbg_governanceaction_free, yW = s.governanceaction_to_bytes, vW = s.governanceaction_from_bytes, mW = s.governanceaction_to_hex, kW = s.governanceaction_from_hex, xW = s.governanceaction_to_json, jW = s.governanceaction_to_js_value, zW = s.governanceaction_from_json, FW = s.governanceaction_new_parameter_change_action, RW = s.governanceaction_new_hard_fork_initiation_action, OW = s.governanceaction_new_treasury_withdrawals_action, qW = s.governanceaction_new_no_confidence_action, $W = s.governanceaction_new_new_committee_action, LW = s.governanceaction_new_new_constitution_action, JW = s.governanceaction_new_info_action, YW = s.governanceaction_kind, QW = s.governanceaction_as_parameter_change_action, XW = s.governanceaction_as_hard_fork_initiation_action, ZW = s.governanceaction_as_treasury_withdrawals_action, UW = s.governanceaction_as_no_confidence_action, EW = s.governanceaction_as_new_committee_action, KW = s.governanceaction_as_new_constitution_action, SW = s.governanceaction_as_info_action, WW = s.__wbg_strings_free, MW = s.strings_new, GW = s.strings_len, HW = s.strings_get, AW = s.strings_add, IW = s.__wbg_credentials_free, DW = s.credentials_to_bytes, TW = s.credentials_from_bytes, NW = s.credentials_to_hex, CW = s.credentials_from_hex, VW = s.credentials_to_json, PW = s.credentials_to_js_value, BW = s.credentials_from_json, tM = s.credentials_new, _M = s.credentials_len, eM = s.credentials_get, rM = s.credentials_add, nM = s.__wbg_int_free, oM = s.int_to_bytes, aM = s.int_from_bytes, sM = s.int_to_hex, iM = s.int_from_hex, dM = s.int_to_json, cM = s.int_to_js_value, pM = s.int_from_json, wM = s.int_new, bM = s.int_new_negative, lM = s.int_new_i32, gM = s.int_is_positive, uM = s.int_as_positive, fM = s.int_as_negative, hM = s.int_as_i32, yM = s.int_as_i32_or_nothing, vM = s.int_as_i32_or_fail, mM = s.int_to_str, kM = s.int_from_str, xM = s.__wbg_bignum_free, jM = s.bignum_to_bytes, zM = s.bignum_from_bytes, FM = s.bignum_to_hex, RM = s.bignum_from_hex, OM = s.bignum_to_json, qM = s.bignum_to_js_value, $M = s.bignum_from_json, LM = s.bignum_from_str, JM = s.bignum_to_str, YM = s.bignum_zero, QM = s.bignum_one, XM = s.bignum_is_zero, ZM = s.bignum_div_floor, UM = s.bignum_checked_mul, EM = s.bignum_checked_add, KM = s.bignum_checked_sub, SM = s.bignum_clamped_sub, WM = s.bignum_compare, MM = s.bignum_less_than, GM = s.bignum_max_value, HM = s.bignum_max, AM = s.__wbg_scriptref_free, IM = s.scriptref_to_bytes, DM = s.scriptref_from_bytes, TM = s.scriptref_to_hex, NM = s.scriptref_from_hex, CM = s.scriptref_to_json, VM = s.scriptref_to_js_value, PM = s.scriptref_from_json, BM = s.scriptref_new_native_script, tG = s.scriptref_new_plutus_script, _G = s.scriptref_is_native_script, eG = s.scriptref_is_plutus_script, rG = s.scriptref_native_script, nG = s.scriptref_plutus_script, oG = s.scriptref_to_unwrapped_bytes, aG = s.__wbindgen_malloc, sG = s.__wbindgen_realloc, iG = s.__wbindgen_add_to_stack_pointer, dG = s.__wbindgen_free, cG = s.__wbindgen_exn_store, pG = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wbg_address_free: $5,
    __wbg_anchor_free: gx,
    __wbg_anchordatahash_free: kQ,
    __wbg_assetname_free: ph,
    __wbg_assetnames_free: mh,
    __wbg_assets_free: Yh,
    __wbg_auxiliarydata_free: zk,
    __wbg_auxiliarydatahash_free: wX,
    __wbg_auxiliarydataset_free: oh,
    __wbg_baseaddress_free: H5,
    __wbg_bigint_free: CO,
    __wbg_bignum_free: xM,
    __wbg_bip32privatekey_free: U7,
    __wbg_bip32publickey_free: mb,
    __wbg_block_free: z2,
    __wbg_blockhash_free: gX,
    __wbg_bootstrapwitness_free: N4,
    __wbg_bootstrapwitnesses_free: ww,
    __wbg_byronaddress_free: f5,
    __wbg_certificate_free: BL,
    __wbg_certificates_free: EF,
    __wbg_certificatesbuilder_free: sF,
    __wbg_changeconfig_free: fZ,
    __wbg_committee_free: yE,
    __wbg_committeecoldresign_free: J8,
    __wbg_committeehotauth_free: Ec,
    __wbg_constitution_free: Xj,
    __wbg_constrplutusdata_free: xm,
    __wbg_costmdls_free: EY,
    __wbg_costmodel_free: JE,
    __wbg_credential_free: Mp,
    __wbg_credentials_free: IW,
    __wbg_datacost_free: yl,
    __wbg_datahash_free: uX,
    __wbg_datumsource_free: YS,
    __wbg_dnsrecordaoraaaa_free: _v,
    __wbg_dnsrecordsrv_free: By,
    __wbg_drep_free: Zw,
    __wbg_drepderegistration_free: ZS,
    __wbg_drepregistration_free: A8,
    __wbg_drepupdate_free: TS,
    __wbg_drepvotingthresholds_free: _0,
    __wbg_ed25519keyhash_free: wQ,
    __wbg_ed25519keyhashes_free: PY,
    __wbg_ed25519signature_free: i6,
    __wbg_enterpriseaddress_free: V5,
    __wbg_exunitprices_free: Wv,
    __wbg_exunits_free: HE,
    __wbg_fixedblock_free: K2,
    __wbg_fixedtransaction_free: XR,
    __wbg_fixedtransactionbodies_free: X9,
    __wbg_fixedtransactionbody_free: y9,
    __wbg_fixedtxwitnessesset_free: LO,
    __wbg_fixedversionedblock_free: E6,
    __wbg_generaltransactionmetadata_free: wk,
    __wbg_genesisdelegatehash_free: cX,
    __wbg_genesishash_free: pX,
    __wbg_genesishashes_free: uf,
    __wbg_genesiskeydelegation_free: DJ,
    __wbg_governanceaction_free: hW,
    __wbg_governanceactionid_free: Fx,
    __wbg_governanceactionids_free: u7,
    __wbg_hardforkinitiationaction_free: Px,
    __wbg_header_free: T2,
    __wbg_headerbody_free: Y$,
    __wbg_infoaction_free: j7,
    __wbg_int_free: nM,
    __wbg_ipv4_free: Gl,
    __wbg_ipv6_free: Bl,
    __wbg_kessignature_free: oq,
    __wbg_kesvkey_free: yX,
    __wbg_language_free: $p,
    __wbg_languages_free: Xv,
    __wbg_legacydaedalusprivatekey_free: kb,
    __wbg_linearfee_free: Rv,
    __wbg_malformedaddress_free: b5,
    __wbg_metadatalist_free: Y1,
    __wbg_metadatamap_free: v1,
    __wbg_mint_free: fy,
    __wbg_mintassets_free: wy,
    __wbg_mintbuilder_free: G3,
    __wbg_mintsassets_free: ay,
    __wbg_mintwitness_free: S3,
    __wbg_mirtostakecredentials_free: zi,
    __wbg_moveinstantaneousreward_free: Ei,
    __wbg_moveinstantaneousrewardscert_free: gi,
    __wbg_multiasset_free: Ih,
    __wbg_multihostname_free: tv,
    __wbg_nativescript_free: iq,
    __wbg_nativescripts_free: EO,
    __wbg_nativescriptsource_free: kL,
    __wbg_networkid_free: Jy,
    __wbg_networkinfo_free: a5,
    __wbg_newconstitutionaction_free: Dj,
    __wbg_noconfidenceaction_free: sW,
    __wbg_nonce_free: Fb,
    __wbg_operationalcert_free: z6,
    __wbg_outputdatum_free: Bu,
    __wbg_parameterchangeaction_free: Ux,
    __wbg_plutusdata_free: Gm,
    __wbg_plutuslist_free: d1,
    __wbg_plutusmap_free: Xm,
    __wbg_plutusmapvalues_free: Lm,
    __wbg_plutusscript_free: i3,
    __wbg_plutusscripts_free: FY,
    __wbg_plutusscriptsource_free: fL,
    __wbg_plutuswitness_free: tR,
    __wbg_plutuswitnesses_free: iR,
    __wbg_pointer_free: nO,
    __wbg_pointeraddress_free: bO,
    __wbg_poolmetadata_free: mu,
    __wbg_poolmetadatahash_free: bX,
    __wbg_poolparams_free: yd,
    __wbg_poolregistration_free: Yw,
    __wbg_poolretirement_free: d8,
    __wbg_poolvotingthresholds_free: Ik,
    __wbg_privatekey_free: UO,
    __wbg_proposedprotocolparameterupdates_free: Uf,
    __wbg_protocolparamupdate_free: $0,
    __wbg_protocolversion_free: Tf,
    __wbg_publickey_free: jw,
    __wbg_publickeys_free: tq,
    __wbg_redeemer_free: Cv,
    __wbg_redeemers_free: dm,
    __wbg_redeemertag_free: ab,
    __wbg_relay_free: au,
    __wbg_relays_free: sd,
    __wbg_rewardaddress_free: B9,
    __wbg_rewardaddresses_free: Lu,
    __wbg_scriptall_free: Wq,
    __wbg_scriptany_free: oL,
    __wbg_scriptdatahash_free: fX,
    __wbg_scripthash_free: iX,
    __wbg_scripthashes_free: yv,
    __wbg_scriptnofk_free: n$,
    __wbg_scriptpubkey_free: Lq,
    __wbg_scriptref_free: AM,
    __wbg_singlehostaddr_free: $g,
    __wbg_singlehostname_free: Mg,
    __wbg_stakeandvotedelegation_free: Ad,
    __wbg_stakedelegation_free: v8,
    __wbg_stakederegistration_free: oY,
    __wbg_stakeregistration_free: Dw,
    __wbg_stakeregistrationanddelegation_free: ec,
    __wbg_stakevoteregistrationanddelegation_free: gc,
    __wbg_strings_free: WW,
    __wbg_timelockexpiry_free: m$,
    __wbg_timelockstart_free: lL,
    __wbg_transaction_free: Db,
    __wbg_transactionbatch_free: $L,
    __wbg_transactionbatchlist_free: RL,
    __wbg_transactionbodies_free: j9,
    __wbg_transactionbody_free: _K,
    __wbg_transactionbuilder_free: kZ,
    __wbg_transactionbuilderconfig_free: eZ,
    __wbg_transactionbuilderconfigbuilder_free: rZ,
    __wbg_transactionhash_free: dX,
    __wbg_transactioninput_free: eF,
    __wbg_transactioninputs_free: j3,
    __wbg_transactionmetadatum_free: M1,
    __wbg_transactionmetadatumlabels_free: nk,
    __wbg_transactionoutput_free: kl,
    __wbg_transactionoutputamountbuilder_free: qR,
    __wbg_transactionoutputbuilder_free: kR,
    __wbg_transactionoutputs_free: sl,
    __wbg_transactionunspentoutput_free: oz,
    __wbg_transactionunspentoutputs_free: uz,
    __wbg_transactionwitnessset_free: tS,
    __wbg_transactionwitnesssets_free: vO,
    __wbg_treasurywithdrawals_free: cE,
    __wbg_treasurywithdrawalsaction_free: cj,
    __wbg_txinputsbuilder_free: QL,
    __wbg_unitinterval_free: Ub,
    __wbg_update_free: nf,
    __wbg_updatecommitteeaction_free: kj,
    __wbg_url_free: Py,
    __wbg_value_free: jz,
    __wbg_versionedblock_free: G6,
    __wbg_vkey_free: g6,
    __wbg_vkeys_free: wL,
    __wbg_vkeywitness_free: F7,
    __wbg_vkeywitnesses_free: ew,
    __wbg_votedelegation_free: Xw,
    __wbg_voter_free: bp,
    __wbg_voteregistrationanddelegation_free: Qw,
    __wbg_voters_free: hY,
    __wbg_votingbuilder_free: yF,
    __wbg_votingprocedure_free: o7,
    __wbg_votingprocedures_free: PU,
    __wbg_votingproposal_free: o2,
    __wbg_votingproposalbuilder_free: qF,
    __wbg_votingproposals_free: CF,
    __wbg_vrfcert_free: mS,
    __wbg_vrfkeyhash_free: lX,
    __wbg_vrfvkey_free: hX,
    __wbg_withdrawals_free: Mu,
    __wbg_withdrawalsbuilder_free: wR,
    __wbindgen_add_to_stack_pointer: iG,
    __wbindgen_exn_store: cG,
    __wbindgen_free: dG,
    __wbindgen_malloc: aG,
    __wbindgen_realloc: sG,
    address_from_bech32: M5,
    address_from_bytes: L5,
    address_from_hex: K5,
    address_from_json: Q5,
    address_is_malformed: U5,
    address_kind: X5,
    address_network_id: G5,
    address_payment_cred: Z5,
    address_to_bech32: W5,
    address_to_bytes: S5,
    address_to_hex: E5,
    address_to_js_value: Y5,
    address_to_json: J5,
    anchor_anchor_data_hash: jx,
    anchor_from_bytes: fx,
    anchor_from_hex: yx,
    anchor_from_json: kx,
    anchor_new: zx,
    anchor_to_bytes: ux,
    anchor_to_hex: hx,
    anchor_to_js_value: mx,
    anchor_to_json: vx,
    anchor_url: xx,
    anchordatahash_from_bech32: FQ,
    anchordatahash_from_bytes: xQ,
    anchordatahash_from_hex: OQ,
    anchordatahash_to_bech32: zQ,
    anchordatahash_to_bytes: jQ,
    anchordatahash_to_hex: RQ,
    assetname_from_bytes: bh,
    assetname_from_hex: gh,
    assetname_from_json: hh,
    assetname_name: vh,
    assetname_new: yh,
    assetname_to_bytes: wh,
    assetname_to_hex: lh,
    assetname_to_js_value: fh,
    assetname_to_json: uh,
    assetnames_add: Jh,
    assetnames_from_bytes: xh,
    assetnames_from_hex: zh,
    assetnames_from_json: Oh,
    assetnames_get: Lh,
    assetnames_len: $h,
    assetnames_new: qh,
    assetnames_to_bytes: kh,
    assetnames_to_hex: jh,
    assetnames_to_js_value: Rh,
    assetnames_to_json: Fh,
    assets_from_bytes: Xh,
    assets_from_hex: Uh,
    assets_from_json: Sh,
    assets_get: Hh,
    assets_insert: Gh,
    assets_keys: Ah,
    assets_len: Mh,
    assets_new: Wh,
    assets_to_bytes: Qh,
    assets_to_hex: Zh,
    assets_to_js_value: Kh,
    assets_to_json: Eh,
    auxiliarydata_from_bytes: Rk,
    auxiliarydata_from_hex: qk,
    auxiliarydata_from_json: Jk,
    auxiliarydata_metadata: Qk,
    auxiliarydata_native_scripts: Zk,
    auxiliarydata_new: Yk,
    auxiliarydata_plutus_scripts: Ek,
    auxiliarydata_prefer_alonzo_format: Sk,
    auxiliarydata_set_metadata: Xk,
    auxiliarydata_set_native_scripts: Uk,
    auxiliarydata_set_plutus_scripts: Kk,
    auxiliarydata_set_prefer_alonzo_format: Wk,
    auxiliarydata_to_bytes: Fk,
    auxiliarydata_to_hex: Ok,
    auxiliarydata_to_js_value: Lk,
    auxiliarydata_to_json: $k,
    auxiliarydatahash_from_bech32: KQ,
    auxiliarydatahash_from_bytes: EQ,
    auxiliarydatahash_from_hex: SQ,
    auxiliarydatahash_to_bech32: CX,
    auxiliarydatahash_to_bytes: EX,
    auxiliarydatahash_to_hex: jX,
    auxiliarydataset_get: dh,
    auxiliarydataset_indices: ch,
    auxiliarydataset_insert: ih,
    auxiliarydataset_len: sh,
    auxiliarydataset_new: ah,
    baseaddress_from_address: N5,
    baseaddress_network_id: C5,
    baseaddress_new: A5,
    baseaddress_payment_cred: I5,
    baseaddress_stake_cred: D5,
    baseaddress_to_address: T5,
    bigint_abs: g9,
    bigint_add: d9,
    bigint_as_int: a9,
    bigint_as_u64: o9,
    bigint_div_ceil: f9,
    bigint_div_floor: h9,
    bigint_from_bytes: PO,
    bigint_from_hex: t9,
    bigint_from_json: r9,
    bigint_from_str: s9,
    bigint_increment: u9,
    bigint_is_zero: n9,
    bigint_mul: p9,
    bigint_one: b9,
    bigint_pow: w9,
    bigint_sub: c9,
    bigint_to_bytes: VO,
    bigint_to_hex: BO,
    bigint_to_js_value: e9,
    bigint_to_json: _9,
    bigint_to_str: i9,
    bigint_zero: l9,
    bignum_checked_add: EM,
    bignum_checked_mul: UM,
    bignum_checked_sub: KM,
    bignum_clamped_sub: SM,
    bignum_compare: WM,
    bignum_div_floor: ZM,
    bignum_from_bytes: zM,
    bignum_from_hex: RM,
    bignum_from_json: $M,
    bignum_from_str: LM,
    bignum_is_zero: XM,
    bignum_less_than: MM,
    bignum_max: HM,
    bignum_max_value: GM,
    bignum_one: QM,
    bignum_to_bytes: jM,
    bignum_to_hex: FM,
    bignum_to_js_value: qM,
    bignum_to_json: OM,
    bignum_to_str: JM,
    bignum_zero: YM,
    bip32privatekey_as_bytes: A7,
    bip32privatekey_chaincode: N7,
    bip32privatekey_derive: E7,
    bip32privatekey_from_128_xprv: K7,
    bip32privatekey_from_bech32: I7,
    bip32privatekey_from_bip39_entropy: T7,
    bip32privatekey_from_bytes: H7,
    bip32privatekey_from_hex: V7,
    bip32privatekey_generate_ed25519_bip32: W7,
    bip32privatekey_to_128_xprv: S7,
    bip32privatekey_to_bech32: D7,
    bip32privatekey_to_hex: C7,
    bip32privatekey_to_public: G7,
    bip32privatekey_to_raw_key: M7,
    bip32publickey_as_bytes: Ty,
    bip32publickey_chaincode: Ay,
    bip32publickey_derive: Vy,
    bip32publickey_from_bech32: Dy,
    bip32publickey_from_bytes: Ny,
    bip32publickey_from_hex: Gy,
    bip32publickey_to_bech32: Iy,
    bip32publickey_to_hex: Hy,
    bip32publickey_to_raw_key: Cy,
    block_auxiliary_data_set: Z2,
    block_from_bytes: R2,
    block_from_hex: q2,
    block_from_json: J2,
    block_header: Y2,
    block_invalid_transactions: U2,
    block_new: E2,
    block_to_bytes: F2,
    block_to_hex: O2,
    block_to_js_value: L2,
    block_to_json: $2,
    block_transaction_bodies: Q2,
    block_transaction_witness_sets: X2,
    blockhash_from_bech32: TQ,
    blockhash_from_bytes: DQ,
    blockhash_from_hex: NQ,
    blockhash_to_bech32: VX,
    blockhash_to_bytes: KX,
    blockhash_to_hex: RX,
    bootstrapwitness_attributes: a6,
    bootstrapwitness_chain_code: o6,
    bootstrapwitness_from_bytes: V4,
    bootstrapwitness_from_hex: B4,
    bootstrapwitness_from_json: e6,
    bootstrapwitness_new: s6,
    bootstrapwitness_signature: n6,
    bootstrapwitness_to_bytes: C4,
    bootstrapwitness_to_hex: P4,
    bootstrapwitness_to_js_value: _6,
    bootstrapwitness_to_json: t6,
    bootstrapwitness_vkey: r6,
    bootstrapwitnesses_add: xw,
    bootstrapwitnesses_from_bytes: lw,
    bootstrapwitnesses_from_hex: uw,
    bootstrapwitnesses_from_json: yw,
    bootstrapwitnesses_get: kw,
    bootstrapwitnesses_len: mw,
    bootstrapwitnesses_new: vw,
    bootstrapwitnesses_to_bytes: bw,
    bootstrapwitnesses_to_hex: gw,
    bootstrapwitnesses_to_js_value: hw,
    bootstrapwitnesses_to_json: fw,
    byronaddress_attributes: x5,
    byronaddress_byron_address_kind: k5,
    byronaddress_byron_protocol_magic: m5,
    byronaddress_from_address: q5,
    byronaddress_from_base58: z5,
    byronaddress_from_bytes: v5,
    byronaddress_icarus_from_key: F5,
    byronaddress_is_valid: R5,
    byronaddress_network_id: j5,
    byronaddress_to_address: O5,
    byronaddress_to_base58: h5,
    byronaddress_to_bytes: y5,
    calculate_ex_units_ceil_cost: Jv,
    certificate_as_committee_cold_resign: UJ,
    certificate_as_committee_hot_auth: ZJ,
    certificate_as_drep_deregistration: EJ,
    certificate_as_drep_registration: KJ,
    certificate_as_drep_update: SJ,
    certificate_as_genesis_key_delegation: QJ,
    certificate_as_move_instantaneous_rewards_cert: XJ,
    certificate_as_pool_registration: JJ,
    certificate_as_pool_retirement: YJ,
    certificate_as_reg_cert: OJ,
    certificate_as_stake_and_vote_delegation: WJ,
    certificate_as_stake_delegation: LJ,
    certificate_as_stake_deregistration: qJ,
    certificate_as_stake_registration: RJ,
    certificate_as_stake_registration_and_delegation: MJ,
    certificate_as_stake_vote_registration_and_delegation: GJ,
    certificate_as_unreg_cert: $J,
    certificate_as_vote_delegation: HJ,
    certificate_as_vote_registration_and_delegation: AJ,
    certificate_from_bytes: _J,
    certificate_from_hex: rJ,
    certificate_from_json: aJ,
    certificate_has_required_script_witness: IJ,
    certificate_kind: FJ,
    certificate_new_committee_cold_resign: fJ,
    certificate_new_committee_hot_auth: uJ,
    certificate_new_drep_deregistration: hJ,
    certificate_new_drep_registration: yJ,
    certificate_new_drep_update: vJ,
    certificate_new_genesis_key_delegation: lJ,
    certificate_new_move_instantaneous_rewards_cert: gJ,
    certificate_new_pool_registration: wJ,
    certificate_new_pool_retirement: bJ,
    certificate_new_reg_cert: iJ,
    certificate_new_stake_and_vote_delegation: mJ,
    certificate_new_stake_delegation: pJ,
    certificate_new_stake_deregistration: dJ,
    certificate_new_stake_registration: sJ,
    certificate_new_stake_registration_and_delegation: kJ,
    certificate_new_stake_vote_registration_and_delegation: xJ,
    certificate_new_unreg_cert: cJ,
    certificate_new_vote_delegation: jJ,
    certificate_new_vote_registration_and_delegation: zJ,
    certificate_to_bytes: tJ,
    certificate_to_hex: eJ,
    certificate_to_js_value: oJ,
    certificate_to_json: nJ,
    certificates_add: NF,
    certificates_from_bytes: SF,
    certificates_from_hex: MF,
    certificates_from_json: AF,
    certificates_get: TF,
    certificates_len: DF,
    certificates_new: IF,
    certificates_to_bytes: KF,
    certificates_to_hex: WF,
    certificates_to_js_value: HF,
    certificates_to_json: GF,
    certificatesbuilder_add: dF,
    certificatesbuilder_add_with_native_script: pF,
    certificatesbuilder_add_with_plutus_witness: cF,
    certificatesbuilder_build: hF,
    certificatesbuilder_get_certificates_deposit: uF,
    certificatesbuilder_get_certificates_refund: gF,
    certificatesbuilder_get_native_scripts: lF,
    certificatesbuilder_get_plutus_witnesses: wF,
    certificatesbuilder_get_ref_inputs: bF,
    certificatesbuilder_has_plutus_scripts: fF,
    certificatesbuilder_new: iF,
    changeconfig_change_address: yZ,
    changeconfig_change_plutus_data: vZ,
    changeconfig_change_script_ref: mZ,
    changeconfig_new: hZ,
    committee_add_member: $E,
    committee_from_bytes: mE,
    committee_from_hex: xE,
    committee_from_json: FE,
    committee_get_member_epoch: LE,
    committee_members_keys: OE,
    committee_new: RE,
    committee_quorum_threshold: qE,
    committee_to_bytes: vE,
    committee_to_hex: kE,
    committee_to_js_value: zE,
    committee_to_json: jE,
    committeecoldresign_anchor: W8,
    committeecoldresign_committee_cold_credential: S8,
    committeecoldresign_from_bytes: Q8,
    committeecoldresign_from_hex: Z8,
    committeecoldresign_from_json: K8,
    committeecoldresign_has_script_credentials: H8,
    committeecoldresign_new: M8,
    committeecoldresign_new_with_anchor: G8,
    committeecoldresign_to_bytes: Y8,
    committeecoldresign_to_hex: X8,
    committeecoldresign_to_js_value: E8,
    committeecoldresign_to_json: U8,
    committeehotauth_committee_cold_credential: Ic,
    committeehotauth_committee_hot_credential: Dc,
    committeehotauth_from_bytes: Sc,
    committeehotauth_from_hex: Mc,
    committeehotauth_from_json: Ac,
    committeehotauth_has_script_credentials: Nc,
    committeehotauth_new: Tc,
    committeehotauth_to_bytes: Kc,
    committeehotauth_to_hex: Wc,
    committeehotauth_to_js_value: Hc,
    committeehotauth_to_json: Gc,
    constitution_anchor: Gj,
    constitution_from_bytes: Uj,
    constitution_from_hex: Kj,
    constitution_from_json: Mj,
    constitution_new: Aj,
    constitution_new_with_script_hash: Ij,
    constitution_script_hash: Hj,
    constitution_to_bytes: Zj,
    constitution_to_hex: Ej,
    constitution_to_js_value: Wj,
    constitution_to_json: Sj,
    constrplutusdata_alternative: Om,
    constrplutusdata_data: qm,
    constrplutusdata_from_bytes: zm,
    constrplutusdata_from_hex: Rm,
    constrplutusdata_new: $m,
    constrplutusdata_to_bytes: jm,
    constrplutusdata_to_hex: Fm,
    costmdls_from_bytes: SY,
    costmdls_from_hex: MY,
    costmdls_from_json: AY,
    costmdls_get: NY,
    costmdls_insert: TY,
    costmdls_keys: CY,
    costmdls_len: DY,
    costmdls_new: IY,
    costmdls_retain_language_versions: VY,
    costmdls_to_bytes: KY,
    costmdls_to_hex: WY,
    costmdls_to_js_value: HY,
    costmdls_to_json: GY,
    costmodel_from_bytes: QE,
    costmodel_from_hex: ZE,
    costmodel_from_json: KE,
    costmodel_get: ME,
    costmodel_len: GE,
    costmodel_new: SE,
    costmodel_set: WE,
    costmodel_to_bytes: YE,
    costmodel_to_hex: XE,
    costmodel_to_js_value: EE,
    costmodel_to_json: UE,
    create_send_all: YL,
    credential_from_bytes: Cp,
    credential_from_hex: Pp,
    credential_from_json: _w,
    credential_from_keyhash: Gp,
    credential_from_scripthash: Hp,
    credential_has_script_hash: Tp,
    credential_kind: Dp,
    credential_to_bytes: Np,
    credential_to_hex: Vp,
    credential_to_js_value: tw,
    credential_to_json: Bp,
    credential_to_keyhash: Ap,
    credential_to_scripthash: Ip,
    credentials_add: rM,
    credentials_from_bytes: TW,
    credentials_from_hex: CW,
    credentials_from_json: BW,
    credentials_get: eM,
    credentials_len: _M,
    credentials_new: tM,
    credentials_to_bytes: DW,
    credentials_to_hex: NW,
    credentials_to_js_value: PW,
    credentials_to_json: VW,
    datacost_coins_per_byte: ml,
    datacost_new_coins_per_byte: vl,
    datahash_from_bech32: VQ,
    datahash_from_bytes: CQ,
    datahash_from_hex: PQ,
    datahash_to_bech32: PX,
    datahash_to_bytes: SX,
    datahash_to_hex: OX,
    datumsource_new: QS,
    datumsource_new_ref_input: XS,
    decode_arbitrary_bytes_from_metadatum: Gk,
    decode_metadatum_to_json_str: Ak,
    decode_plutus_datum_to_json_str: y1,
    decrypt_with_password: UF,
    dnsrecordaoraaaa_from_bytes: ug,
    dnsrecordaoraaaa_from_hex: hg,
    dnsrecordaoraaaa_from_json: mg,
    dnsrecordaoraaaa_new: kg,
    dnsrecordaoraaaa_record: xg,
    dnsrecordaoraaaa_to_bytes: gg,
    dnsrecordaoraaaa_to_hex: fg,
    dnsrecordaoraaaa_to_js_value: vg,
    dnsrecordaoraaaa_to_json: yg,
    dnsrecordsrv_from_bytes: zg,
    dnsrecordsrv_from_hex: Rg,
    dnsrecordsrv_from_json: Og,
    dnsrecordsrv_new: qg,
    dnsrecordsrv_record: wv,
    dnsrecordsrv_to_bytes: jg,
    dnsrecordsrv_to_hex: Fg,
    dnsrecordsrv_to_js_value: hv,
    dnsrecordsrv_to_json: cv,
    drep_from_bech32: wp,
    drep_from_bytes: Vc,
    drep_from_hex: Bc,
    drep_from_json: ep,
    drep_kind: ip,
    drep_new_always_abstain: op,
    drep_new_always_no_confidence: ap,
    drep_new_from_credential: sp,
    drep_new_key_hash: rp,
    drep_new_script_hash: np,
    drep_to_bech32: pp,
    drep_to_bytes: Cc,
    drep_to_hex: Pc,
    drep_to_js_value: _p,
    drep_to_json: tp,
    drep_to_key_hash: dp,
    drep_to_script_hash: cp,
    drepderegistration_coin: AS,
    drepderegistration_from_bytes: ES,
    drepderegistration_from_hex: SS,
    drepderegistration_from_json: GS,
    drepderegistration_has_script_credentials: DS,
    drepderegistration_new: IS,
    drepderegistration_to_bytes: US,
    drepderegistration_to_hex: KS,
    drepderegistration_to_js_value: MS,
    drepderegistration_to_json: WS,
    drepderegistration_voting_credential: HS,
    drepregistration_anchor: _7,
    drepregistration_coin: t7,
    drepregistration_from_bytes: D8,
    drepregistration_from_hex: N8,
    drepregistration_from_json: P8,
    drepregistration_has_script_credentials: n7,
    drepregistration_new: e7,
    drepregistration_new_with_anchor: r7,
    drepregistration_to_bytes: I8,
    drepregistration_to_hex: T8,
    drepregistration_to_js_value: V8,
    drepregistration_to_json: C8,
    drepregistration_voting_credential: B8,
    drepupdate_anchor: rW,
    drepupdate_from_bytes: CS,
    drepupdate_from_hex: PS,
    drepupdate_from_json: _W,
    drepupdate_has_script_credentials: aW,
    drepupdate_new: nW,
    drepupdate_new_with_anchor: oW,
    drepupdate_to_bytes: NS,
    drepupdate_to_hex: VS,
    drepupdate_to_js_value: tW,
    drepupdate_to_json: BS,
    drepupdate_voting_credential: eW,
    drepvotingthresholds_committee_no_confidence: k0,
    drepvotingthresholds_committee_normal: m0,
    drepvotingthresholds_from_bytes: r0,
    drepvotingthresholds_from_hex: o0,
    drepvotingthresholds_from_json: i0,
    drepvotingthresholds_hard_fork_initiation: j0,
    drepvotingthresholds_motion_no_confidence: v0,
    drepvotingthresholds_new: d0,
    drepvotingthresholds_pp_economic_group: F0,
    drepvotingthresholds_pp_governance_group: O0,
    drepvotingthresholds_pp_network_group: z0,
    drepvotingthresholds_pp_technical_group: R0,
    drepvotingthresholds_set_committee_no_confidence: w0,
    drepvotingthresholds_set_committee_normal: p0,
    drepvotingthresholds_set_hard_fork_initiation: l0,
    drepvotingthresholds_set_motion_no_confidence: c0,
    drepvotingthresholds_set_pp_economic_group: u0,
    drepvotingthresholds_set_pp_governance_group: h0,
    drepvotingthresholds_set_pp_network_group: g0,
    drepvotingthresholds_set_pp_technical_group: f0,
    drepvotingthresholds_set_treasury_withdrawal: y0,
    drepvotingthresholds_set_update_constitution: b0,
    drepvotingthresholds_to_bytes: e0,
    drepvotingthresholds_to_hex: n0,
    drepvotingthresholds_to_js_value: s0,
    drepvotingthresholds_to_json: a0,
    drepvotingthresholds_treasury_withdrawal: q0,
    drepvotingthresholds_update_constitution: x0,
    ed25519keyhash_from_bech32: uQ,
    ed25519keyhash_from_bytes: bQ,
    ed25519keyhash_from_hex: hQ,
    ed25519keyhash_to_bech32: gQ,
    ed25519keyhash_to_bytes: lQ,
    ed25519keyhash_to_hex: fQ,
    ed25519keyhashes_add: dQ,
    ed25519keyhashes_contains: cQ,
    ed25519keyhashes_from_bytes: tQ,
    ed25519keyhashes_from_hex: eQ,
    ed25519keyhashes_from_json: oQ,
    ed25519keyhashes_get: iQ,
    ed25519keyhashes_len: sQ,
    ed25519keyhashes_new: aQ,
    ed25519keyhashes_to_bytes: BY,
    ed25519keyhashes_to_hex: _Q,
    ed25519keyhashes_to_js_value: nQ,
    ed25519keyhashes_to_json: rQ,
    ed25519keyhashes_to_option: pQ,
    ed25519signature_from_bech32: w6,
    ed25519signature_from_bytes: l6,
    ed25519signature_from_hex: b6,
    ed25519signature_to_bech32: c6,
    ed25519signature_to_bytes: d6,
    ed25519signature_to_hex: p6,
    encode_arbitrary_bytes_as_metadatum: Mk,
    encode_json_str_to_metadatum: Hk,
    encode_json_str_to_native_script: tF,
    encode_json_str_to_plutus_datum: h1,
    encrypt_with_password: ZF,
    enterpriseaddress_from_address: tO,
    enterpriseaddress_network_id: _O,
    enterpriseaddress_new: P5,
    enterpriseaddress_payment_cred: t8,
    enterpriseaddress_to_address: B5,
    exunitprices_from_bytes: Gv,
    exunitprices_from_hex: Av,
    exunitprices_from_json: Tv,
    exunitprices_mem_price: ex,
    exunitprices_new: Nv,
    exunitprices_step_price: rx,
    exunitprices_to_bytes: Mv,
    exunitprices_to_hex: Hv,
    exunitprices_to_js_value: Dv,
    exunitprices_to_json: Iv,
    exunits_from_bytes: IE,
    exunits_from_hex: TE,
    exunits_from_json: VE,
    exunits_mem: PE,
    exunits_new: tK,
    exunits_steps: BE,
    exunits_to_bytes: AE,
    exunits_to_hex: DE,
    exunits_to_js_value: CE,
    exunits_to_json: NE,
    fixedblock_auxiliary_data_set: A2,
    fixedblock_block_hash: D2,
    fixedblock_from_bytes: S2,
    fixedblock_from_hex: W2,
    fixedblock_header: M2,
    fixedblock_invalid_transactions: I2,
    fixedblock_transaction_bodies: G2,
    fixedblock_transaction_witness_sets: H2,
    fixedtransaction_add_bootstrap_witness: e5,
    fixedtransaction_add_vkey_witness: _5,
    fixedtransaction_auxiliary_data: PR,
    fixedtransaction_body: GR,
    fixedtransaction_from_bytes: UR,
    fixedtransaction_from_hex: KR,
    fixedtransaction_is_valid: CR,
    fixedtransaction_new: SR,
    fixedtransaction_new_from_body_bytes: MR,
    fixedtransaction_new_with_auxiliary: WR,
    fixedtransaction_raw_auxiliary_data: BR,
    fixedtransaction_raw_body: HR,
    fixedtransaction_raw_witness_set: TR,
    fixedtransaction_set_auxiliary_data: VR,
    fixedtransaction_set_body: AR,
    fixedtransaction_set_is_valid: NR,
    fixedtransaction_set_witness_set: IR,
    fixedtransaction_sign_and_add_daedalus_bootstrap_signature: o5,
    fixedtransaction_sign_and_add_icarus_bootstrap_signature: n5,
    fixedtransaction_sign_and_add_vkey_signature: r5,
    fixedtransaction_to_bytes: ZR,
    fixedtransaction_to_hex: ER,
    fixedtransaction_transaction_hash: t5,
    fixedtransaction_witness_set: DR,
    fixedtransactionbodies_add: W9,
    fixedtransactionbodies_from_bytes: Z9,
    fixedtransactionbodies_from_hex: U9,
    fixedtransactionbodies_get: S9,
    fixedtransactionbodies_len: K9,
    fixedtransactionbodies_new: E9,
    fixedtransactionbody_from_bytes: v9,
    fixedtransactionbody_from_hex: m9,
    fixedtransactionbody_original_bytes: x9,
    fixedtransactionbody_transaction_body: e8,
    fixedtransactionbody_tx_hash: k9,
    fixedtxwitnessesset_add_bootstrap_witness: QO,
    fixedtxwitnessesset_add_vkey_witness: YO,
    fixedtxwitnessesset_from_bytes: ZO,
    fixedtxwitnessesset_to_bytes: XO,
    fixedtxwitnessesset_tx_witnesses_set: JO,
    fixedversionedblock_block: W6,
    fixedversionedblock_era: M6,
    fixedversionedblock_from_bytes: K6,
    fixedversionedblock_from_hex: S6,
    generaltransactionmetadata_from_bytes: lk,
    generaltransactionmetadata_from_hex: uk,
    generaltransactionmetadata_from_json: yk,
    generaltransactionmetadata_get: xk,
    generaltransactionmetadata_insert: kk,
    generaltransactionmetadata_keys: jk,
    generaltransactionmetadata_len: mk,
    generaltransactionmetadata_new: vk,
    generaltransactionmetadata_to_bytes: bk,
    generaltransactionmetadata_to_hex: gk,
    generaltransactionmetadata_to_js_value: hk,
    generaltransactionmetadata_to_json: fk,
    genesisdelegatehash_from_bech32: YQ,
    genesisdelegatehash_from_bytes: JQ,
    genesisdelegatehash_from_hex: QQ,
    genesisdelegatehash_to_bech32: IX,
    genesisdelegatehash_to_bytes: QX,
    genesisdelegatehash_to_hex: kX,
    genesishash_from_bech32: ZQ,
    genesishash_from_bytes: XQ,
    genesishash_from_hex: UQ,
    genesishash_to_bech32: DX,
    genesishash_to_bytes: XX,
    genesishash_to_hex: xX,
    genesishashes_add: Rf,
    genesishashes_from_bytes: hf,
    genesishashes_from_hex: vf,
    genesishashes_from_json: xf,
    genesishashes_get: Ff,
    genesishashes_len: zf,
    genesishashes_new: jf,
    genesishashes_to_bytes: ff,
    genesishashes_to_hex: yf,
    genesishashes_to_js_value: kf,
    genesishashes_to_json: mf,
    genesiskeydelegation_from_bytes: NJ,
    genesiskeydelegation_from_hex: VJ,
    genesiskeydelegation_from_json: tY,
    genesiskeydelegation_genesis_delegate_hash: eY,
    genesiskeydelegation_genesishash: _Y,
    genesiskeydelegation_new: nY,
    genesiskeydelegation_to_bytes: TJ,
    genesiskeydelegation_to_hex: CJ,
    genesiskeydelegation_to_js_value: BJ,
    genesiskeydelegation_to_json: PJ,
    genesiskeydelegation_vrf_keyhash: rY,
    get_deposit: Pz,
    get_implicit_input: Vz,
    governanceaction_as_hard_fork_initiation_action: XW,
    governanceaction_as_info_action: SW,
    governanceaction_as_new_committee_action: EW,
    governanceaction_as_new_constitution_action: KW,
    governanceaction_as_no_confidence_action: UW,
    governanceaction_as_parameter_change_action: QW,
    governanceaction_as_treasury_withdrawals_action: ZW,
    governanceaction_from_bytes: vW,
    governanceaction_from_hex: kW,
    governanceaction_from_json: zW,
    governanceaction_kind: YW,
    governanceaction_new_hard_fork_initiation_action: RW,
    governanceaction_new_info_action: JW,
    governanceaction_new_new_committee_action: $W,
    governanceaction_new_new_constitution_action: LW,
    governanceaction_new_no_confidence_action: qW,
    governanceaction_new_parameter_change_action: FW,
    governanceaction_new_treasury_withdrawals_action: OW,
    governanceaction_to_bytes: yW,
    governanceaction_to_hex: mW,
    governanceaction_to_js_value: jW,
    governanceaction_to_json: xW,
    governanceactionid_from_bytes: Ox,
    governanceactionid_from_hex: $x,
    governanceactionid_from_json: Yx,
    governanceactionid_index: Xx,
    governanceactionid_new: Zx,
    governanceactionid_to_bytes: Rx,
    governanceactionid_to_hex: qx,
    governanceactionid_to_js_value: Jx,
    governanceactionid_to_json: Lx,
    governanceactionid_transaction_id: Qx,
    governanceactionids_add: m7,
    governanceactionids_from_json: y7,
    governanceactionids_get: k7,
    governanceactionids_len: x7,
    governanceactionids_new: v7,
    governanceactionids_to_js_value: h7,
    governanceactionids_to_json: f7,
    hardforkinitiationaction_from_bytes: tj,
    hardforkinitiationaction_from_hex: ej,
    hardforkinitiationaction_from_json: oj,
    hardforkinitiationaction_gov_action_id: aj,
    hardforkinitiationaction_new: ij,
    hardforkinitiationaction_new_with_action_id: dj,
    hardforkinitiationaction_protocol_version: sj,
    hardforkinitiationaction_to_bytes: Bx,
    hardforkinitiationaction_to_hex: _j,
    hardforkinitiationaction_to_js_value: nj,
    hardforkinitiationaction_to_json: rj,
    has_transaction_set_tag: _F,
    hash_auxiliary_data: Tz,
    hash_plutus_data: Nz,
    hash_script_data: Cz,
    header_body_signature: rz,
    header_from_bytes: C2,
    header_from_hex: P2,
    header_from_json: _z,
    header_header_body: ez,
    header_new: nz,
    header_to_bytes: N2,
    header_to_hex: V2,
    header_to_js_value: tz,
    header_to_json: B2,
    headerbody_block_body_hash: B$,
    headerbody_block_body_size: P$,
    headerbody_block_number: W$,
    headerbody_from_bytes: X$,
    headerbody_from_hex: U$,
    headerbody_from_json: S$,
    headerbody_has_nonce_and_leader_vrf: D$,
    headerbody_has_vrf_result: C$,
    headerbody_issuer_vkey: A$,
    headerbody_leader_vrf_or_nothing: N$,
    headerbody_new: eL,
    headerbody_new_headerbody: rL,
    headerbody_nonce_vrf_or_nothing: T$,
    headerbody_operational_cert: tL,
    headerbody_prev_hash: H$,
    headerbody_protocol_version: _L,
    headerbody_slot: M$,
    headerbody_slot_bignum: G$,
    headerbody_to_bytes: Q$,
    headerbody_to_hex: Z$,
    headerbody_to_js_value: K$,
    headerbody_to_json: E$,
    headerbody_vrf_result_or_nothing: V$,
    headerbody_vrf_vkey: I$,
    infoaction_new: z7,
    int_as_i32: hM,
    int_as_i32_or_fail: vM,
    int_as_i32_or_nothing: yM,
    int_as_negative: fM,
    int_as_positive: uM,
    int_from_bytes: aM,
    int_from_hex: iM,
    int_from_json: pM,
    int_from_str: kM,
    int_is_positive: gM,
    int_new: wM,
    int_new_i32: lM,
    int_new_negative: bM,
    int_to_bytes: oM,
    int_to_hex: sM,
    int_to_js_value: cM,
    int_to_json: dM,
    int_to_str: mM,
    ipv4_from_bytes: Al,
    ipv4_from_hex: Dl,
    ipv4_from_json: Cl,
    ipv4_ip: Pl,
    ipv4_new: Vl,
    ipv4_to_bytes: Hl,
    ipv4_to_hex: Il,
    ipv4_to_js_value: Nl,
    ipv4_to_json: Tl,
    ipv6_from_bytes: _g,
    ipv6_from_hex: rg,
    ipv6_from_json: ag,
    ipv6_ip: ig,
    ipv6_new: sg,
    ipv6_to_bytes: tg,
    ipv6_to_hex: eg,
    ipv6_to_js_value: og,
    ipv6_to_json: ng,
    kessignature_from_bytes: sq,
    kessignature_to_bytes: aq,
    kesvkey_from_bech32: aX,
    kesvkey_from_bytes: oX,
    kesvkey_from_hex: sX,
    kesvkey_to_bech32: _Z,
    kesvkey_to_bytes: GX,
    kesvkey_to_hex: LX,
    language_from_bytes: Jp,
    language_from_hex: Qp,
    language_from_json: Up,
    language_kind: Wp,
    language_new_plutus_v1: Ep,
    language_new_plutus_v2: Kp,
    language_new_plutus_v3: Sp,
    language_to_bytes: Lp,
    language_to_hex: Yp,
    language_to_js_value: Zp,
    language_to_json: Xp,
    languages_add: Kv,
    languages_get: Ev,
    languages_len: Uv,
    languages_list: Sv,
    languages_new: Zv,
    legacydaedalusprivatekey_as_bytes: jb,
    legacydaedalusprivatekey_chaincode: zb,
    legacydaedalusprivatekey_from_bytes: xb,
    linearfee_coefficient: qv,
    linearfee_constant: Ov,
    linearfee_new: $v,
    make_daedalus_bootstrap_witness: Az,
    make_icarus_bootstrap_witness: Iz,
    make_vkey_witness: Dz,
    malformedaddress_from_address: u5,
    malformedaddress_original_bytes: l5,
    malformedaddress_to_address: g5,
    memory: li,
    metadatalist_add: W1,
    metadatalist_from_bytes: X1,
    metadatalist_from_hex: U1,
    metadatalist_get: S1,
    metadatalist_len: K1,
    metadatalist_new: E1,
    metadatalist_to_bytes: Q1,
    metadatalist_to_hex: Z1,
    metadatamap_from_bytes: k1,
    metadatamap_from_hex: j1,
    metadatamap_get: O1,
    metadatamap_get_i32: $1,
    metadatamap_get_str: q1,
    metadatamap_has: L1,
    metadatamap_insert: z1,
    metadatamap_insert_i32: R1,
    metadatamap_insert_str: F1,
    metadatamap_keys: J1,
    metadatamap_len: ix,
    metadatamap_new: bx,
    metadatamap_to_bytes: m1,
    metadatamap_to_hex: x1,
    min_ada_for_output: Bz,
    min_fee: Lv,
    min_ref_script_fee: Qv,
    min_script_fee: Yv,
    mint_as_negative_multiasset: Ly,
    mint_as_positive_multiasset: $y,
    mint_from_bytes: yy,
    mint_from_hex: my,
    mint_from_json: jy,
    mint_get: Oy,
    mint_insert: Ry,
    mint_keys: qy,
    mint_len: Fy,
    mint_new: Fv,
    mint_new_from_entry: zy,
    mint_to_bytes: hy,
    mint_to_hex: vy,
    mint_to_js_value: xy,
    mint_to_json: ky,
    mintassets_get: gy,
    mintassets_insert: ly,
    mintassets_keys: uy,
    mintassets_len: av,
    mintassets_new: lv,
    mintassets_new_from_entry: by,
    mintbuilder_add_asset: A3,
    mintbuilder_build: D3,
    mintbuilder_get_native_scripts: T3,
    mintbuilder_get_plutus_witnesses: N3,
    mintbuilder_get_redeemers: V3,
    mintbuilder_get_ref_inputs: C3,
    mintbuilder_has_native_scripts: B3,
    mintbuilder_has_plutus_scripts: P3,
    mintbuilder_new: H3,
    mintbuilder_set_asset: I3,
    mintsassets_add: cy,
    mintsassets_from_json: dy,
    mintsassets_get: py,
    mintsassets_len: iv,
    mintsassets_new: zv,
    mintsassets_to_js_value: iy,
    mintsassets_to_json: sy,
    mintwitness_new_native_script: W3,
    mintwitness_new_plutus_script: M3,
    mirtostakecredentials_from_bytes: Ri,
    mirtostakecredentials_from_hex: qi,
    mirtostakecredentials_from_json: Ji,
    mirtostakecredentials_get: Zi,
    mirtostakecredentials_insert: Xi,
    mirtostakecredentials_keys: Ui,
    mirtostakecredentials_len: Qi,
    mirtostakecredentials_new: Yi,
    mirtostakecredentials_to_bytes: Fi,
    mirtostakecredentials_to_hex: Oi,
    mirtostakecredentials_to_js_value: Li,
    mirtostakecredentials_to_json: $i,
    moveinstantaneousreward_as_to_other_pot: Ci,
    moveinstantaneousreward_as_to_stake_creds: Vi,
    moveinstantaneousreward_from_bytes: Si,
    moveinstantaneousreward_from_hex: Mi,
    moveinstantaneousreward_from_json: Ai,
    moveinstantaneousreward_kind: Ni,
    moveinstantaneousreward_new_to_other_pot: Ii,
    moveinstantaneousreward_new_to_stake_creds: Di,
    moveinstantaneousreward_pot: Ti,
    moveinstantaneousreward_to_bytes: Ki,
    moveinstantaneousreward_to_hex: Wi,
    moveinstantaneousreward_to_js_value: Hi,
    moveinstantaneousreward_to_json: Gi,
    moveinstantaneousrewardscert_from_bytes: fi,
    moveinstantaneousrewardscert_from_hex: yi,
    moveinstantaneousrewardscert_from_json: ki,
    moveinstantaneousrewardscert_move_instantaneous_reward: xi,
    moveinstantaneousrewardscert_new: ji,
    moveinstantaneousrewardscert_to_bytes: ui,
    moveinstantaneousrewardscert_to_hex: hi,
    moveinstantaneousrewardscert_to_js_value: mi,
    moveinstantaneousrewardscert_to_json: vi,
    multiasset_from_bytes: Th,
    multiasset_from_hex: Ch,
    multiasset_from_json: Bh,
    multiasset_get: _y,
    multiasset_get_asset: ry,
    multiasset_insert: ty,
    multiasset_keys: ny,
    multiasset_len: ov,
    multiasset_new: bv,
    multiasset_set_asset: ey,
    multiasset_sub: oy,
    multiasset_to_bytes: Dh,
    multiasset_to_hex: Nh,
    multiasset_to_js_value: Ph,
    multiasset_to_json: Vh,
    multihostname_dns_name: ou,
    multihostname_from_bytes: Bg,
    multihostname_from_hex: _u,
    multihostname_from_json: nu,
    multihostname_new: jv,
    multihostname_to_bytes: Pg,
    multihostname_to_hex: tu,
    multihostname_to_js_value: ru,
    multihostname_to_json: eu,
    nativescript_as_script_all: zq,
    nativescript_as_script_any: Fq,
    nativescript_as_script_n_of_k: Rq,
    nativescript_as_script_pubkey: jq,
    nativescript_as_timelock_expiry: qq,
    nativescript_as_timelock_start: Oq,
    nativescript_from_bytes: cq,
    nativescript_from_hex: wq,
    nativescript_from_json: gq,
    nativescript_get_required_signers: $q,
    nativescript_hash: uq,
    nativescript_kind: xq,
    nativescript_new_script_all: hq,
    nativescript_new_script_any: yq,
    nativescript_new_script_n_of_k: vq,
    nativescript_new_script_pubkey: fq,
    nativescript_new_timelock_expiry: kq,
    nativescript_new_timelock_start: mq,
    nativescript_to_bytes: dq,
    nativescript_to_hex: pq,
    nativescript_to_js_value: lq,
    nativescript_to_json: bq,
    nativescripts_add: MO,
    nativescripts_from_bytes: HO,
    nativescripts_from_hex: IO,
    nativescripts_from_json: NO,
    nativescripts_get: WO,
    nativescripts_len: SO,
    nativescripts_new: KO,
    nativescripts_to_bytes: GO,
    nativescripts_to_hex: AO,
    nativescripts_to_js_value: TO,
    nativescripts_to_json: DO,
    nativescriptsource_get_ref_script_size: FL,
    nativescriptsource_new: xL,
    nativescriptsource_new_ref_input: jL,
    nativescriptsource_set_required_signers: zL,
    networkid_from_bytes: Qy,
    networkid_from_hex: Zy,
    networkid_from_json: Ky,
    networkid_kind: My,
    networkid_mainnet: Wy,
    networkid_testnet: Sy,
    networkid_to_bytes: Yy,
    networkid_to_hex: Xy,
    networkid_to_js_value: Ey,
    networkid_to_json: Uy,
    networkinfo_mainnet: w5,
    networkinfo_network_id: i5,
    networkinfo_new: s5,
    networkinfo_protocol_magic: d5,
    networkinfo_testnet_preprod: p5,
    networkinfo_testnet_preview: c5,
    newconstitutionaction_constitution: _2,
    newconstitutionaction_from_bytes: Nj,
    newconstitutionaction_from_hex: Vj,
    newconstitutionaction_from_json: t2,
    newconstitutionaction_gov_action_id: nF,
    newconstitutionaction_has_script_hash: n2,
    newconstitutionaction_new: e2,
    newconstitutionaction_new_with_action_id: r2,
    newconstitutionaction_to_bytes: Tj,
    newconstitutionaction_to_hex: Cj,
    newconstitutionaction_to_js_value: Bj,
    newconstitutionaction_to_json: Pj,
    noconfidenceaction_from_bytes: dW,
    noconfidenceaction_from_hex: pW,
    noconfidenceaction_from_json: lW,
    noconfidenceaction_gov_action_id: gW,
    noconfidenceaction_new: uW,
    noconfidenceaction_new_with_action_id: fW,
    noconfidenceaction_to_bytes: iW,
    noconfidenceaction_to_hex: cW,
    noconfidenceaction_to_js_value: bW,
    noconfidenceaction_to_json: wW,
    nonce_from_bytes: Ob,
    nonce_from_hex: $b,
    nonce_from_json: Yb,
    nonce_get_hash: Zb,
    nonce_new_from_hash: Xb,
    nonce_new_identity: Qb,
    nonce_to_bytes: Rb,
    nonce_to_hex: qb,
    nonce_to_js_value: Jb,
    nonce_to_json: Lb,
    operationalcert_from_bytes: R6,
    operationalcert_from_hex: q6,
    operationalcert_from_json: J6,
    operationalcert_hot_vkey: Y6,
    operationalcert_kes_period: X6,
    operationalcert_new: U6,
    operationalcert_sequence_number: Q6,
    operationalcert_sigma: Z6,
    operationalcert_to_bytes: F6,
    operationalcert_to_hex: O6,
    operationalcert_to_js_value: L6,
    operationalcert_to_json: $6,
    outputdatum_data: rf,
    outputdatum_data_hash: ef,
    outputdatum_new_data: _f,
    outputdatum_new_data_hash: tf,
    parameterchangeaction_from_bytes: Kx,
    parameterchangeaction_from_hex: Wx,
    parameterchangeaction_from_json: Hx,
    parameterchangeaction_gov_action_id: Ax,
    parameterchangeaction_new: Tx,
    parameterchangeaction_new_with_action_id: Nx,
    parameterchangeaction_new_with_policy_hash: Cx,
    parameterchangeaction_new_with_policy_hash_and_action_id: Vx,
    parameterchangeaction_policy_hash: Dx,
    parameterchangeaction_protocol_param_updates: Ix,
    parameterchangeaction_to_bytes: Ex,
    parameterchangeaction_to_hex: Sx,
    parameterchangeaction_to_js_value: Gx,
    parameterchangeaction_to_json: Mx,
    plutusdata_as_address: i1,
    plutusdata_as_bytes: a1,
    plutusdata_as_constr_plutus_data: e1,
    plutusdata_as_integer: o1,
    plutusdata_as_list: n1,
    plutusdata_as_map: r1,
    plutusdata_from_address: s1,
    plutusdata_from_bytes: Am,
    plutusdata_from_hex: Dm,
    plutusdata_from_json: px,
    plutusdata_kind: _1,
    plutusdata_new_bytes: t1,
    plutusdata_new_constr_plutus_data: Tm,
    plutusdata_new_empty_constr_plutus_data: Nm,
    plutusdata_new_integer: Bm,
    plutusdata_new_list: Pm,
    plutusdata_new_map: Vm,
    plutusdata_new_single_value_constr_plutus_data: Cm,
    plutusdata_to_bytes: Hm,
    plutusdata_to_hex: Im,
    plutusdata_to_json: cx,
    plutuslist_add: f1,
    plutuslist_from_bytes: p1,
    plutuslist_from_hex: b1,
    plutuslist_get: u1,
    plutuslist_len: g1,
    plutuslist_new: l1,
    plutuslist_to_bytes: c1,
    plutuslist_to_hex: w1,
    plutusmap_from_bytes: Um,
    plutusmap_from_hex: Km,
    plutusmap_get: Wm,
    plutusmap_insert: Sm,
    plutusmap_keys: Mm,
    plutusmap_len: sx,
    plutusmap_new: wx,
    plutusmap_to_bytes: Zm,
    plutusmap_to_hex: Em,
    plutusmapvalues_add: Qm,
    plutusmapvalues_get: Ym,
    plutusmapvalues_len: dx,
    plutusmapvalues_new: Jm,
    plutusscript_bytes: f3,
    plutusscript_from_bytes: c3,
    plutusscript_from_bytes_v2: h3,
    plutusscript_from_bytes_v3: y3,
    plutusscript_from_bytes_with_version: v3,
    plutusscript_from_hex: w3,
    plutusscript_from_hex_with_version: m3,
    plutusscript_hash: k3,
    plutusscript_language_version: x3,
    plutusscript_new: b3,
    plutusscript_new_v2: l3,
    plutusscript_new_v3: g3,
    plutusscript_new_with_version: u3,
    plutusscript_to_bytes: d3,
    plutusscript_to_hex: p3,
    plutusscripts_add: UY,
    plutusscripts_from_bytes: OY,
    plutusscripts_from_hex: $Y,
    plutusscripts_from_json: YY,
    plutusscripts_get: ZY,
    plutusscripts_len: XY,
    plutusscripts_new: QY,
    plutusscripts_to_bytes: RY,
    plutusscripts_to_hex: qY,
    plutusscripts_to_js_value: JY,
    plutusscripts_to_json: LY,
    plutusscriptsource_get_ref_script_size: mL,
    plutusscriptsource_new: hL,
    plutusscriptsource_new_ref_input: yL,
    plutusscriptsource_set_required_signers: vL,
    plutuswitness_datum: aR,
    plutuswitness_new: _R,
    plutuswitness_new_with_ref: eR,
    plutuswitness_new_with_ref_without_datum: nR,
    plutuswitness_new_without_datum: rR,
    plutuswitness_redeemer: sR,
    plutuswitness_script: oR,
    plutuswitnesses_add: pR,
    plutuswitnesses_get: cR,
    plutuswitnesses_len: dR,
    plutuswitnesses_new: i8,
    pointer_cert_index: dO,
    pointer_cert_index_bignum: wO,
    pointer_new: oO,
    pointer_new_pointer: aO,
    pointer_slot: sO,
    pointer_slot_bignum: cO,
    pointer_tx_index: iO,
    pointer_tx_index_bignum: pO,
    pointeraddress_from_address: hO,
    pointeraddress_network_id: yO,
    pointeraddress_new: lO,
    pointeraddress_payment_cred: gO,
    pointeraddress_stake_pointer: uO,
    pointeraddress_to_address: fO,
    poolmetadata_from_bytes: xu,
    poolmetadata_from_hex: zu,
    poolmetadata_from_json: Ou,
    poolmetadata_new: $u,
    poolmetadata_pool_metadata_hash: qu,
    poolmetadata_to_bytes: ku,
    poolmetadata_to_hex: ju,
    poolmetadata_to_js_value: Ru,
    poolmetadata_to_json: Fu,
    poolmetadata_url: mv,
    poolmetadatahash_from_bech32: MQ,
    poolmetadatahash_from_bytes: WQ,
    poolmetadatahash_from_hex: GQ,
    poolmetadatahash_to_bech32: NX,
    poolmetadatahash_to_bytes: UX,
    poolmetadatahash_to_hex: zX,
    poolparams_cost: $d,
    poolparams_from_bytes: md,
    poolparams_from_hex: xd,
    poolparams_from_json: Fd,
    poolparams_margin: Ld,
    poolparams_new: Zd,
    poolparams_operator: Rd,
    poolparams_pledge: qd,
    poolparams_pool_metadata: Xd,
    poolparams_pool_owners: Yd,
    poolparams_relays: Qd,
    poolparams_reward_account: Jd,
    poolparams_to_bytes: vd,
    poolparams_to_hex: kd,
    poolparams_to_js_value: zd,
    poolparams_to_json: jd,
    poolparams_vrf_keyhash: Od,
    poolregistration_from_bytes: Bi,
    poolregistration_from_hex: _d,
    poolregistration_from_json: nd,
    poolregistration_new: ad,
    poolregistration_pool_params: od,
    poolregistration_to_bytes: Pi,
    poolregistration_to_hex: td,
    poolregistration_to_js_value: rd,
    poolregistration_to_json: ed,
    poolretirement_epoch: h8,
    poolretirement_from_bytes: p8,
    poolretirement_from_hex: b8,
    poolretirement_from_json: u8,
    poolretirement_new: y8,
    poolretirement_pool_keyhash: f8,
    poolretirement_to_bytes: c8,
    poolretirement_to_hex: w8,
    poolretirement_to_js_value: g8,
    poolretirement_to_json: l8,
    poolvotingthresholds_committee_no_confidence: nx,
    poolvotingthresholds_committee_normal: _x,
    poolvotingthresholds_from_bytes: Tk,
    poolvotingthresholds_from_hex: Ck,
    poolvotingthresholds_from_json: Bk,
    poolvotingthresholds_hard_fork_initiation: ox,
    poolvotingthresholds_motion_no_confidence: tx,
    poolvotingthresholds_new: t0,
    poolvotingthresholds_security_relevant_threshold: ax,
    poolvotingthresholds_to_bytes: Dk,
    poolvotingthresholds_to_hex: Nk,
    poolvotingthresholds_to_js_value: Pk,
    poolvotingthresholds_to_json: Vk,
    privatekey_as_bytes: D9,
    privatekey_from_bech32: N9,
    privatekey_from_extended_bytes: I9,
    privatekey_from_hex: M9,
    privatekey_from_normal_bytes: A9,
    privatekey_generate_ed25519: V9,
    privatekey_generate_ed25519extended: C9,
    privatekey_sign: H9,
    privatekey_to_bech32: T9,
    privatekey_to_hex: G9,
    privatekey_to_public: P9,
    proposedprotocolparameterupdates_from_bytes: Kf,
    proposedprotocolparameterupdates_from_hex: Wf,
    proposedprotocolparameterupdates_from_json: Hf,
    proposedprotocolparameterupdates_get: If,
    proposedprotocolparameterupdates_insert: Af,
    proposedprotocolparameterupdates_keys: Df,
    proposedprotocolparameterupdates_len: nv,
    proposedprotocolparameterupdates_new: uv,
    proposedprotocolparameterupdates_to_bytes: Ef,
    proposedprotocolparameterupdates_to_hex: Sf,
    proposedprotocolparameterupdates_to_js_value: Gf,
    proposedprotocolparameterupdates_to_json: Mf,
    protocolparamupdate_ada_per_utxo_byte: g4,
    protocolparamupdate_collateral_percentage: R4,
    protocolparamupdate_committee_term_limit: U4,
    protocolparamupdate_cost_models: f4,
    protocolparamupdate_d: i4,
    protocolparamupdate_drep_deposit: G4,
    protocolparamupdate_drep_inactivity_period: A4,
    protocolparamupdate_drep_voting_thresholds: Y4,
    protocolparamupdate_execution_costs: y4,
    protocolparamupdate_expansion_rate: o4,
    protocolparamupdate_extra_entropy: d4,
    protocolparamupdate_from_bytes: J0,
    protocolparamupdate_from_hex: Q0,
    protocolparamupdate_from_json: U0,
    protocolparamupdate_governance_action_deposit: W4,
    protocolparamupdate_governance_action_validity_period: K4,
    protocolparamupdate_key_deposit: N0,
    protocolparamupdate_max_block_body_size: G0,
    protocolparamupdate_max_block_ex_units: x4,
    protocolparamupdate_max_block_header_size: D0,
    protocolparamupdate_max_collateral_inputs: q4,
    protocolparamupdate_max_epoch: B0,
    protocolparamupdate_max_tx_ex_units: m4,
    protocolparamupdate_max_tx_size: A0,
    protocolparamupdate_max_value_size: z4,
    protocolparamupdate_min_committee_size: X4,
    protocolparamupdate_min_pool_cost: b4,
    protocolparamupdate_minfee_a: K0,
    protocolparamupdate_minfee_b: W0,
    protocolparamupdate_n_opt: _4,
    protocolparamupdate_new: T4,
    protocolparamupdate_pool_deposit: V0,
    protocolparamupdate_pool_pledge_influence: r4,
    protocolparamupdate_pool_voting_thresholds: L4,
    protocolparamupdate_protocol_version: p4,
    protocolparamupdate_ref_script_coins_per_byte: D4,
    protocolparamupdate_set_ada_per_utxo_byte: l4,
    protocolparamupdate_set_collateral_percentage: F4,
    protocolparamupdate_set_committee_term_limit: Z4,
    protocolparamupdate_set_cost_models: u4,
    protocolparamupdate_set_drep_deposit: M4,
    protocolparamupdate_set_drep_inactivity_period: H4,
    protocolparamupdate_set_drep_voting_thresholds: J4,
    protocolparamupdate_set_execution_costs: h4,
    protocolparamupdate_set_expansion_rate: n4,
    protocolparamupdate_set_governance_action_deposit: S4,
    protocolparamupdate_set_governance_action_validity_period: E4,
    protocolparamupdate_set_key_deposit: T0,
    protocolparamupdate_set_max_block_body_size: M0,
    protocolparamupdate_set_max_block_ex_units: k4,
    protocolparamupdate_set_max_block_header_size: I0,
    protocolparamupdate_set_max_collateral_inputs: O4,
    protocolparamupdate_set_max_epoch: P0,
    protocolparamupdate_set_max_tx_ex_units: v4,
    protocolparamupdate_set_max_tx_size: H0,
    protocolparamupdate_set_max_value_size: j4,
    protocolparamupdate_set_min_committee_size: Q4,
    protocolparamupdate_set_min_pool_cost: w4,
    protocolparamupdate_set_minfee_a: E0,
    protocolparamupdate_set_minfee_b: S0,
    protocolparamupdate_set_n_opt: t4,
    protocolparamupdate_set_pool_deposit: C0,
    protocolparamupdate_set_pool_pledge_influence: e4,
    protocolparamupdate_set_pool_voting_thresholds: $4,
    protocolparamupdate_set_protocol_version: c4,
    protocolparamupdate_set_ref_script_coins_per_byte: I4,
    protocolparamupdate_set_treasury_growth_rate: a4,
    protocolparamupdate_to_bytes: L0,
    protocolparamupdate_to_hex: Y0,
    protocolparamupdate_to_js_value: Z0,
    protocolparamupdate_to_json: X0,
    protocolparamupdate_treasury_growth_rate: s4,
    protocolversion_from_bytes: Cf,
    protocolversion_from_hex: Pf,
    protocolversion_from_json: _h,
    protocolversion_major: eh,
    protocolversion_minor: rh,
    protocolversion_new: nh,
    protocolversion_to_bytes: Nf,
    protocolversion_to_hex: Vf,
    protocolversion_to_js_value: th,
    protocolversion_to_json: Bf,
    publickey_as_bytes: $w,
    publickey_from_bech32: Jw,
    publickey_from_bytes: qw,
    publickey_from_hex: zw,
    publickey_hash: Rw,
    publickey_to_bech32: Lw,
    publickey_to_hex: Fw,
    publickey_verify: Ow,
    publickeys_add: nq,
    publickeys_get: rq,
    publickeys_new: _q,
    publickeys_size: eq,
    redeemer_data: am,
    redeemer_ex_units: sm,
    redeemer_from_bytes: Pv,
    redeemer_from_hex: tm,
    redeemer_from_json: rm,
    redeemer_index: om,
    redeemer_new: im,
    redeemer_tag: nm,
    redeemer_to_bytes: Vv,
    redeemer_to_hex: Bv,
    redeemer_to_js_value: em,
    redeemer_to_json: _m,
    redeemers_add: vm,
    redeemers_from_bytes: pm,
    redeemers_from_hex: bm,
    redeemers_from_json: um,
    redeemers_get: ym,
    redeemers_get_container_type: mm,
    redeemers_len: hm,
    redeemers_new: fm,
    redeemers_to_bytes: cm,
    redeemers_to_hex: wm,
    redeemers_to_js_value: gm,
    redeemers_to_json: lm,
    redeemers_total_ex_units: km,
    redeemertag_from_bytes: ib,
    redeemertag_from_hex: cb,
    redeemertag_from_json: bb,
    redeemertag_kind: vb,
    redeemertag_new_cert: ub,
    redeemertag_new_mint: gb,
    redeemertag_new_reward: fb,
    redeemertag_new_spend: lb,
    redeemertag_new_vote: hb,
    redeemertag_new_voting_proposal: yb,
    redeemertag_to_bytes: sb,
    redeemertag_to_hex: db,
    redeemertag_to_js_value: wb,
    redeemertag_to_json: pb,
    relay_as_multi_host_name: vu,
    relay_as_single_host_addr: hu,
    relay_as_single_host_name: yu,
    relay_from_bytes: iu,
    relay_from_hex: cu,
    relay_from_json: bu,
    relay_kind: fu,
    relay_new_multi_host_name: uu,
    relay_new_single_host_addr: lu,
    relay_new_single_host_name: gu,
    relay_to_bytes: su,
    relay_to_hex: du,
    relay_to_js_value: wu,
    relay_to_json: pu,
    relays_add: hd,
    relays_from_bytes: dd,
    relays_from_hex: pd,
    relays_from_json: ld,
    relays_get: fd,
    relays_len: ud,
    relays_new: gd,
    relays_to_bytes: id,
    relays_to_hex: cd,
    relays_to_js_value: bd,
    relays_to_json: wd,
    rewardaddress_from_address: rO,
    rewardaddress_network_id: o8,
    rewardaddress_new: r8,
    rewardaddress_payment_cred: _8,
    rewardaddress_to_address: eO,
    rewardaddresses_add: Wu,
    rewardaddresses_from_bytes: Yu,
    rewardaddresses_from_hex: Xu,
    rewardaddresses_from_json: Eu,
    rewardaddresses_get: Su,
    rewardaddresses_len: Ku,
    rewardaddresses_new: kv,
    rewardaddresses_to_bytes: Ju,
    rewardaddresses_to_hex: Qu,
    rewardaddresses_to_js_value: Uu,
    rewardaddresses_to_json: Zu,
    scriptall_from_bytes: Gq,
    scriptall_from_hex: Aq,
    scriptall_from_json: Tq,
    scriptall_native_scripts: Nq,
    scriptall_new: Cq,
    scriptall_to_bytes: Mq,
    scriptall_to_hex: Hq,
    scriptall_to_js_value: Dq,
    scriptall_to_json: Iq,
    scriptany_from_bytes: Pq,
    scriptany_from_hex: t$,
    scriptany_from_json: r$,
    scriptany_native_scripts: dL,
    scriptany_new: pL,
    scriptany_to_bytes: Vq,
    scriptany_to_hex: Bq,
    scriptany_to_js_value: e$,
    scriptany_to_json: _$,
    scriptdatahash_from_bech32: tX,
    scriptdatahash_from_bytes: BQ,
    scriptdatahash_from_hex: _X,
    scriptdatahash_to_bech32: BX,
    scriptdatahash_to_bytes: WX,
    scriptdatahash_to_hex: qX,
    scripthash_from_bech32: vQ,
    scripthash_from_bytes: yQ,
    scripthash_from_hex: mQ,
    scripthash_to_bech32: HX,
    scripthash_to_bytes: JX,
    scripthash_to_hex: vX,
    scripthashes_add: Zf,
    scripthashes_from_bytes: qf,
    scripthashes_from_hex: Lf,
    scripthashes_from_json: Qf,
    scripthashes_get: Xf,
    scripthashes_len: sv,
    scripthashes_new: xv,
    scripthashes_to_bytes: Of,
    scripthashes_to_hex: $f,
    scripthashes_to_js_value: Yf,
    scripthashes_to_json: Jf,
    scriptnofk_from_bytes: a$,
    scriptnofk_from_hex: i$,
    scriptnofk_from_json: p$,
    scriptnofk_n: w$,
    scriptnofk_native_scripts: cL,
    scriptnofk_new: b$,
    scriptnofk_to_bytes: o$,
    scriptnofk_to_hex: s$,
    scriptnofk_to_js_value: c$,
    scriptnofk_to_json: d$,
    scriptpubkey_addr_keyhash: Kq,
    scriptpubkey_from_bytes: Yq,
    scriptpubkey_from_hex: Xq,
    scriptpubkey_from_json: Eq,
    scriptpubkey_new: Sq,
    scriptpubkey_to_bytes: Jq,
    scriptpubkey_to_hex: Qq,
    scriptpubkey_to_js_value: Uq,
    scriptpubkey_to_json: Zq,
    scriptref_from_bytes: DM,
    scriptref_from_hex: NM,
    scriptref_from_json: PM,
    scriptref_is_native_script: _G,
    scriptref_is_plutus_script: eG,
    scriptref_native_script: rG,
    scriptref_new_native_script: BM,
    scriptref_new_plutus_script: tG,
    scriptref_plutus_script: nG,
    scriptref_to_bytes: IM,
    scriptref_to_hex: TM,
    scriptref_to_js_value: VM,
    scriptref_to_json: CM,
    scriptref_to_unwrapped_bytes: oG,
    singlehostaddr_from_bytes: Jg,
    singlehostaddr_from_hex: Qg,
    singlehostaddr_from_json: Ug,
    singlehostaddr_ipv4: Kg,
    singlehostaddr_ipv6: Sg,
    singlehostaddr_new: Wg,
    singlehostaddr_port: Eg,
    singlehostaddr_to_bytes: Lg,
    singlehostaddr_to_hex: Yg,
    singlehostaddr_to_js_value: Zg,
    singlehostaddr_to_json: Xg,
    singlehostname_dns_name: vv,
    singlehostname_from_bytes: Hg,
    singlehostname_from_hex: Ig,
    singlehostname_from_json: Ng,
    singlehostname_new: Vg,
    singlehostname_port: Cg,
    singlehostname_to_bytes: Gg,
    singlehostname_to_hex: Ag,
    singlehostname_to_js_value: Tg,
    singlehostname_to_json: Dg,
    stakeandvotedelegation_drep: tc,
    stakeandvotedelegation_from_bytes: Dd,
    stakeandvotedelegation_from_hex: Nd,
    stakeandvotedelegation_from_json: Pd,
    stakeandvotedelegation_has_script_credentials: Hw,
    stakeandvotedelegation_new: _c,
    stakeandvotedelegation_pool_keyhash: Bd,
    stakeandvotedelegation_stake_credential: Aw,
    stakeandvotedelegation_to_bytes: Id,
    stakeandvotedelegation_to_hex: Td,
    stakeandvotedelegation_to_js_value: Vd,
    stakeandvotedelegation_to_json: Cd,
    stakedelegation_from_bytes: k8,
    stakedelegation_from_hex: j8,
    stakedelegation_from_json: R8,
    stakedelegation_has_script_credentials: L8,
    stakedelegation_new: $8,
    stakedelegation_pool_keyhash: q8,
    stakedelegation_stake_credential: O8,
    stakedelegation_to_bytes: m8,
    stakedelegation_to_hex: x8,
    stakedelegation_to_js_value: F8,
    stakedelegation_to_json: z8,
    stakederegistration_coin: lY,
    stakederegistration_from_bytes: sY,
    stakederegistration_from_hex: dY,
    stakederegistration_from_json: wY,
    stakederegistration_has_script_credentials: fY,
    stakederegistration_new: gY,
    stakederegistration_new_with_explicit_refund: uY,
    stakederegistration_stake_credential: bY,
    stakederegistration_to_bytes: aY,
    stakederegistration_to_hex: iY,
    stakederegistration_to_js_value: pY,
    stakederegistration_to_json: cY,
    stakeregistration_coin: eb,
    stakeregistration_from_bytes: Nw,
    stakeregistration_from_hex: Vw,
    stakeregistration_from_json: tb,
    stakeregistration_has_script_credentials: ob,
    stakeregistration_new: rb,
    stakeregistration_new_with_explicit_deposit: nb,
    stakeregistration_stake_credential: _b,
    stakeregistration_to_bytes: Tw,
    stakeregistration_to_hex: Cw,
    stakeregistration_to_js_value: Bw,
    stakeregistration_to_json: Pw,
    stakeregistrationanddelegation_coin: wc,
    stakeregistrationanddelegation_from_bytes: nc,
    stakeregistrationanddelegation_from_hex: ac,
    stakeregistrationanddelegation_from_json: dc,
    stakeregistrationanddelegation_has_script_credentials: lc,
    stakeregistrationanddelegation_new: bc,
    stakeregistrationanddelegation_pool_keyhash: pc,
    stakeregistrationanddelegation_stake_credential: cc,
    stakeregistrationanddelegation_to_bytes: rc,
    stakeregistrationanddelegation_to_hex: oc,
    stakeregistrationanddelegation_to_js_value: ic,
    stakeregistrationanddelegation_to_json: sc,
    stakevoteregistrationanddelegation_coin: Ww,
    stakevoteregistrationanddelegation_drep: jc,
    stakevoteregistrationanddelegation_from_bytes: fc,
    stakevoteregistrationanddelegation_from_hex: yc,
    stakevoteregistrationanddelegation_from_json: kc,
    stakevoteregistrationanddelegation_has_script_credentials: Fc,
    stakevoteregistrationanddelegation_new: zc,
    stakevoteregistrationanddelegation_pool_keyhash: Mw,
    stakevoteregistrationanddelegation_stake_credential: xc,
    stakevoteregistrationanddelegation_to_bytes: uc,
    stakevoteregistrationanddelegation_to_hex: hc,
    stakevoteregistrationanddelegation_to_js_value: mc,
    stakevoteregistrationanddelegation_to_json: vc,
    strings_add: AW,
    strings_get: HW,
    strings_len: GW,
    strings_new: MW,
    timelockexpiry_from_bytes: x$,
    timelockexpiry_from_hex: z$,
    timelockexpiry_from_json: O$,
    timelockexpiry_new: L$,
    timelockexpiry_new_timelockexpiry: J$,
    timelockexpiry_slot: q$,
    timelockexpiry_slot_bignum: $$,
    timelockexpiry_to_bytes: k$,
    timelockexpiry_to_hex: j$,
    timelockexpiry_to_js_value: R$,
    timelockexpiry_to_json: F$,
    timelockstart_from_bytes: g$,
    timelockstart_from_hex: f$,
    timelockstart_from_json: v$,
    timelockstart_new: uL,
    timelockstart_new_timelockstart: gL,
    timelockstart_slot: sL,
    timelockstart_slot_bignum: aL,
    timelockstart_to_bytes: l$,
    timelockstart_to_hex: u$,
    timelockstart_to_js_value: y$,
    timelockstart_to_json: h$,
    transaction_auxiliary_data: nl,
    transaction_body: _l,
    transaction_from_bytes: Nb,
    transaction_from_hex: Vb,
    transaction_from_json: tl,
    transaction_is_valid: rl,
    transaction_new: al,
    transaction_set_is_valid: ol,
    transaction_to_bytes: Tb,
    transaction_to_hex: Cb,
    transaction_to_js_value: Bb,
    transaction_to_json: Pb,
    transaction_witness_set: el,
    transactionbatch_get: JL,
    transactionbatch_len: LL,
    transactionbatchlist_get: qL,
    transactionbatchlist_len: OL,
    transactionbodies_add: Q9,
    transactionbodies_from_bytes: F9,
    transactionbodies_from_hex: O9,
    transactionbodies_from_json: L9,
    transactionbodies_get: Y9,
    transactionbodies_len: J9,
    transactionbodies_new: s8,
    transactionbodies_to_bytes: z9,
    transactionbodies_to_hex: R9,
    transactionbodies_to_js_value: $9,
    transactionbodies_to_json: q9,
    transactionbody_auxiliary_data_hash: xK,
    transactionbody_certs: fK,
    transactionbody_collateral: XK,
    transactionbody_collateral_return: WK,
    transactionbody_current_treasury_value: VK,
    transactionbody_donation: NK,
    transactionbody_fee: pK,
    transactionbody_from_bytes: rK,
    transactionbody_from_hex: oK,
    transactionbody_from_json: iK,
    transactionbody_inputs: dK,
    transactionbody_mint: qK,
    transactionbody_network_id: KK,
    transactionbody_new: PK,
    transactionbody_new_tx_body: BK,
    transactionbody_outputs: cK,
    transactionbody_reference_inputs: LK,
    transactionbody_remove_ttl: gK,
    transactionbody_required_signers: UK,
    transactionbody_script_data_hash: YK,
    transactionbody_set_auxiliary_data_hash: kK,
    transactionbody_set_certs: uK,
    transactionbody_set_collateral: QK,
    transactionbody_set_collateral_return: SK,
    transactionbody_set_current_treasury_value: CK,
    transactionbody_set_donation: TK,
    transactionbody_set_mint: OK,
    transactionbody_set_network_id: EK,
    transactionbody_set_reference_inputs: $K,
    transactionbody_set_required_signers: ZK,
    transactionbody_set_script_data_hash: JK,
    transactionbody_set_total_collateral: MK,
    transactionbody_set_ttl: lK,
    transactionbody_set_update: vK,
    transactionbody_set_validity_start_interval: jK,
    transactionbody_set_validity_start_interval_bignum: zK,
    transactionbody_set_voting_procedures: HK,
    transactionbody_set_voting_proposals: IK,
    transactionbody_set_withdrawals: hK,
    transactionbody_to_bytes: eK,
    transactionbody_to_hex: nK,
    transactionbody_to_js_value: sK,
    transactionbody_to_json: aK,
    transactionbody_total_collateral: GK,
    transactionbody_ttl: wK,
    transactionbody_ttl_bignum: bK,
    transactionbody_update: mK,
    transactionbody_validity_start_interval: RK,
    transactionbody_validity_start_interval_bignum: FK,
    transactionbody_voting_procedures: AK,
    transactionbody_voting_proposals: DK,
    transactionbody_withdrawals: yK,
    transactionbuilder_add_bootstrap_input: UZ,
    transactionbuilder_add_change_if_needed: SU,
    transactionbuilder_add_change_if_needed_with_datum: WU,
    transactionbuilder_add_extra_witness_datum: zU,
    transactionbuilder_add_inputs_from: xZ,
    transactionbuilder_add_inputs_from_and_change: KZ,
    transactionbuilder_add_inputs_from_and_change_with_collateral_return: SZ,
    transactionbuilder_add_json_metadatum: bU,
    transactionbuilder_add_json_metadatum_with_schema: lU,
    transactionbuilder_add_key_input: QZ,
    transactionbuilder_add_metadatum: wU,
    transactionbuilder_add_mint_asset: kU,
    transactionbuilder_add_mint_asset_and_output: xU,
    transactionbuilder_add_mint_asset_and_output_min_required_coin: jU,
    transactionbuilder_add_native_script_input: XZ,
    transactionbuilder_add_output: HZ,
    transactionbuilder_add_plutus_script_input: ZZ,
    transactionbuilder_add_reference_input: JZ,
    transactionbuilder_add_regular_input: EZ,
    transactionbuilder_add_required_signer: AU,
    transactionbuilder_add_script_reference_input: YZ,
    transactionbuilder_build: TU,
    transactionbuilder_build_tx: NU,
    transactionbuilder_build_tx_unsafe: CU,
    transactionbuilder_calc_script_data_hash: MU,
    transactionbuilder_fee_for_input: GZ,
    transactionbuilder_fee_for_output: AZ,
    transactionbuilder_full_size: IU,
    transactionbuilder_get_auxiliary_data: iU,
    transactionbuilder_get_current_treasury_value: $U,
    transactionbuilder_get_deposit: EU,
    transactionbuilder_get_donation: OU,
    transactionbuilder_get_explicit_input: YU,
    transactionbuilder_get_explicit_output: UU,
    transactionbuilder_get_extra_witness_datums: FU,
    transactionbuilder_get_fee_if_set: KU,
    transactionbuilder_get_implicit_input: QU,
    transactionbuilder_get_mint: yU,
    transactionbuilder_get_mint_builder: fU,
    transactionbuilder_get_mint_scripts: vU,
    transactionbuilder_get_native_input_scripts: WZ,
    transactionbuilder_get_plutus_input_scripts: MZ,
    transactionbuilder_get_reference_inputs: JU,
    transactionbuilder_get_total_input: XU,
    transactionbuilder_get_total_output: ZU,
    transactionbuilder_min_fee: VU,
    transactionbuilder_new: LU,
    transactionbuilder_output_sizes: DU,
    transactionbuilder_remove_auxiliary_data: cU,
    transactionbuilder_remove_certs: _U,
    transactionbuilder_remove_collateral_return: RZ,
    transactionbuilder_remove_mint_builder: uU,
    transactionbuilder_remove_script_data_hash: HU,
    transactionbuilder_remove_total_collateral: $Z,
    transactionbuilder_remove_ttl: CZ,
    transactionbuilder_remove_validity_start_interval: BZ,
    transactionbuilder_remove_withdrawals: sU,
    transactionbuilder_set_auxiliary_data: dU,
    transactionbuilder_set_certs: tU,
    transactionbuilder_set_certs_builder: eU,
    transactionbuilder_set_collateral: zZ,
    transactionbuilder_set_collateral_return: FZ,
    transactionbuilder_set_collateral_return_and_total: OZ,
    transactionbuilder_set_current_treasury_value: qU,
    transactionbuilder_set_donation: RU,
    transactionbuilder_set_fee: IZ,
    transactionbuilder_set_inputs: jZ,
    transactionbuilder_set_metadata: pU,
    transactionbuilder_set_min_fee: DZ,
    transactionbuilder_set_mint: hU,
    transactionbuilder_set_mint_asset: mU,
    transactionbuilder_set_mint_builder: gU,
    transactionbuilder_set_script_data_hash: GU,
    transactionbuilder_set_total_collateral: qZ,
    transactionbuilder_set_total_collateral_and_return: LZ,
    transactionbuilder_set_ttl: TZ,
    transactionbuilder_set_ttl_bignum: NZ,
    transactionbuilder_set_validity_start_interval: VZ,
    transactionbuilder_set_validity_start_interval_bignum: PZ,
    transactionbuilder_set_voting_builder: oU,
    transactionbuilder_set_voting_proposal_builder: aU,
    transactionbuilder_set_withdrawals: rU,
    transactionbuilder_set_withdrawals_builder: nU,
    transactionbuilderconfigbuilder_build: uZ,
    transactionbuilderconfigbuilder_coins_per_utxo_byte: aZ,
    transactionbuilderconfigbuilder_deduplicate_explicit_ref_inputs_with_regular_inputs: lZ,
    transactionbuilderconfigbuilder_do_not_burn_extra_change: gZ,
    transactionbuilderconfigbuilder_ex_unit_prices: sZ,
    transactionbuilderconfigbuilder_fee_algo: oZ,
    transactionbuilderconfigbuilder_key_deposit: dZ,
    transactionbuilderconfigbuilder_max_tx_size: pZ,
    transactionbuilderconfigbuilder_max_value_size: cZ,
    transactionbuilderconfigbuilder_new: nZ,
    transactionbuilderconfigbuilder_pool_deposit: iZ,
    transactionbuilderconfigbuilder_prefer_pure_change: bZ,
    transactionbuilderconfigbuilder_ref_script_coins_per_byte: wZ,
    transactionhash_from_bech32: $Q,
    transactionhash_from_bytes: qQ,
    transactionhash_from_hex: LQ,
    transactionhash_to_bech32: TX,
    transactionhash_to_bytes: ZX,
    transactionhash_to_hex: mX,
    transactioninput_from_bytes: y2,
    transactioninput_from_hex: m2,
    transactioninput_from_json: j2,
    transactioninput_index: rF,
    transactioninput_new: oF,
    transactioninput_to_bytes: h2,
    transactioninput_to_hex: v2,
    transactioninput_to_js_value: x2,
    transactioninput_to_json: k2,
    transactioninput_transaction_id: aF,
    transactioninputs_add: X3,
    transactioninputs_from_bytes: F3,
    transactioninputs_from_hex: O3,
    transactioninputs_from_json: L3,
    transactioninputs_get: Q3,
    transactioninputs_len: Y3,
    transactioninputs_new: J3,
    transactioninputs_to_bytes: z3,
    transactioninputs_to_hex: R3,
    transactioninputs_to_js_value: $3,
    transactioninputs_to_json: q3,
    transactioninputs_to_option: Z3,
    transactionmetadatum_as_bytes: ek,
    transactionmetadatum_as_int: _k,
    transactionmetadatum_as_list: tk,
    transactionmetadatum_as_map: B1,
    transactionmetadatum_as_text: rk,
    transactionmetadatum_from_bytes: H1,
    transactionmetadatum_from_hex: I1,
    transactionmetadatum_kind: P1,
    transactionmetadatum_new_bytes: C1,
    transactionmetadatum_new_int: N1,
    transactionmetadatum_new_list: T1,
    transactionmetadatum_new_map: D1,
    transactionmetadatum_new_text: V1,
    transactionmetadatum_to_bytes: G1,
    transactionmetadatum_to_hex: A1,
    transactionmetadatumlabels_add: pk,
    transactionmetadatumlabels_from_bytes: ak,
    transactionmetadatumlabels_from_hex: ik,
    transactionmetadatumlabels_get: ck,
    transactionmetadatumlabels_len: dk,
    transactionmetadatumlabels_new: lx,
    transactionmetadatumlabels_to_bytes: ok,
    transactionmetadatumlabels_to_hex: sk,
    transactionoutput_address: $l,
    transactionoutput_amount: Ll,
    transactionoutput_data_hash: Jl,
    transactionoutput_from_bytes: jl,
    transactionoutput_from_hex: Fl,
    transactionoutput_from_json: ql,
    transactionoutput_has_data_hash: Kl,
    transactionoutput_has_plutus_data: El,
    transactionoutput_has_script_ref: Sl,
    transactionoutput_new: Wl,
    transactionoutput_plutus_data: Yl,
    transactionoutput_script_ref: Ql,
    transactionoutput_serialization_format: Ml,
    transactionoutput_set_data_hash: Ul,
    transactionoutput_set_plutus_data: Zl,
    transactionoutput_set_script_ref: Xl,
    transactionoutput_to_bytes: xl,
    transactionoutput_to_hex: zl,
    transactionoutput_to_js_value: Ol,
    transactionoutput_to_json: Rl,
    transactionoutputamountbuilder_build: QR,
    transactionoutputamountbuilder_with_asset_and_min_required_coin_by_utxo_cost: YR,
    transactionoutputamountbuilder_with_coin: LR,
    transactionoutputamountbuilder_with_coin_and_asset: JR,
    transactionoutputamountbuilder_with_value: $R,
    transactionoutputbuilder_new: xR,
    transactionoutputbuilder_next: OR,
    transactionoutputbuilder_with_address: jR,
    transactionoutputbuilder_with_data_hash: zR,
    transactionoutputbuilder_with_plutus_data: FR,
    transactionoutputbuilder_with_script_ref: RR,
    transactionoutputs_add: hl,
    transactionoutputs_from_bytes: dl,
    transactionoutputs_from_hex: pl,
    transactionoutputs_from_json: ll,
    transactionoutputs_get: fl,
    transactionoutputs_len: ul,
    transactionoutputs_new: gl,
    transactionoutputs_to_bytes: il,
    transactionoutputs_to_hex: cl,
    transactionoutputs_to_js_value: bl,
    transactionoutputs_to_json: wl,
    transactionunspentoutput_from_bytes: sz,
    transactionunspentoutput_from_hex: dz,
    transactionunspentoutput_from_json: wz,
    transactionunspentoutput_input: lz,
    transactionunspentoutput_new: bz,
    transactionunspentoutput_output: gz,
    transactionunspentoutput_to_bytes: az,
    transactionunspentoutput_to_hex: iz,
    transactionunspentoutput_to_js_value: pz,
    transactionunspentoutput_to_json: cz,
    transactionunspentoutputs_add: xz,
    transactionunspentoutputs_from_json: yz,
    transactionunspentoutputs_get: kz,
    transactionunspentoutputs_len: mz,
    transactionunspentoutputs_new: vz,
    transactionunspentoutputs_to_js_value: hz,
    transactionunspentoutputs_to_json: fz,
    transactionwitnessset_bootstraps: bS,
    transactionwitnessset_from_bytes: eS,
    transactionwitnessset_from_hex: nS,
    transactionwitnessset_from_json: sS,
    transactionwitnessset_native_scripts: pS,
    transactionwitnessset_new: vS,
    transactionwitnessset_plutus_data: fS,
    transactionwitnessset_plutus_scripts: gS,
    transactionwitnessset_redeemers: yS,
    transactionwitnessset_set_bootstraps: wS,
    transactionwitnessset_set_native_scripts: cS,
    transactionwitnessset_set_plutus_data: uS,
    transactionwitnessset_set_plutus_scripts: lS,
    transactionwitnessset_set_redeemers: hS,
    transactionwitnessset_set_vkeys: iS,
    transactionwitnessset_to_bytes: _S,
    transactionwitnessset_to_hex: rS,
    transactionwitnessset_to_js_value: aS,
    transactionwitnessset_to_json: oS,
    transactionwitnessset_vkeys: dS,
    transactionwitnesssets_add: $O,
    transactionwitnesssets_from_bytes: kO,
    transactionwitnesssets_from_hex: jO,
    transactionwitnesssets_from_json: RO,
    transactionwitnesssets_get: qO,
    transactionwitnesssets_len: OO,
    transactionwitnesssets_new: a8,
    transactionwitnesssets_to_bytes: mO,
    transactionwitnesssets_to_hex: xO,
    transactionwitnesssets_to_js_value: FO,
    transactionwitnesssets_to_json: zO,
    treasurywithdrawals_from_json: bE,
    treasurywithdrawals_get: gE,
    treasurywithdrawals_insert: uE,
    treasurywithdrawals_keys: fE,
    treasurywithdrawals_len: hE,
    treasurywithdrawals_new: lE,
    treasurywithdrawals_to_js_value: wE,
    treasurywithdrawals_to_json: pE,
    treasurywithdrawalsaction_from_bytes: wj,
    treasurywithdrawalsaction_from_hex: lj,
    treasurywithdrawalsaction_from_json: fj,
    treasurywithdrawalsaction_new: vj,
    treasurywithdrawalsaction_new_with_policy_hash: mj,
    treasurywithdrawalsaction_policy_hash: yj,
    treasurywithdrawalsaction_to_bytes: pj,
    treasurywithdrawalsaction_to_hex: bj,
    treasurywithdrawalsaction_to_js_value: uj,
    treasurywithdrawalsaction_to_json: gj,
    treasurywithdrawalsaction_withdrawals: hj,
    txinputsbuilder_add_bootstrap_input: ML,
    txinputsbuilder_add_key_input: KL,
    txinputsbuilder_add_native_script_input: SL,
    txinputsbuilder_add_native_script_utxo: EL,
    txinputsbuilder_add_plutus_script_input: WL,
    txinputsbuilder_add_plutus_script_utxo: UL,
    txinputsbuilder_add_regular_input: GL,
    txinputsbuilder_add_regular_utxo: ZL,
    txinputsbuilder_add_required_signer: TL,
    txinputsbuilder_add_required_signers: NL,
    txinputsbuilder_get_native_input_scripts: AL,
    txinputsbuilder_get_plutus_input_scripts: IL,
    txinputsbuilder_get_ref_inputs: HL,
    txinputsbuilder_inputs: VL,
    txinputsbuilder_inputs_option: PL,
    txinputsbuilder_len: DL,
    txinputsbuilder_new: XL,
    txinputsbuilder_total_value: CL,
    unitinterval_denominator: Ab,
    unitinterval_from_bytes: Kb,
    unitinterval_from_hex: Wb,
    unitinterval_from_json: Hb,
    unitinterval_new: Ib,
    unitinterval_numerator: ev,
    unitinterval_to_bytes: Eb,
    unitinterval_to_hex: Sb,
    unitinterval_to_js_value: Gb,
    unitinterval_to_json: Mb,
    update_epoch: lf,
    update_from_bytes: af,
    update_from_hex: df,
    update_from_json: wf,
    update_new: gf,
    update_proposed_protocol_parameter_updates: bf,
    update_to_bytes: of,
    update_to_hex: sf,
    update_to_js_value: pf,
    update_to_json: cf,
    updatecommitteeaction_committee: Lj,
    updatecommitteeaction_from_bytes: jj,
    updatecommitteeaction_from_hex: Fj,
    updatecommitteeaction_from_json: qj,
    updatecommitteeaction_gov_action_id: $j,
    updatecommitteeaction_members_to_remove: Jj,
    updatecommitteeaction_new: Yj,
    updatecommitteeaction_new_with_action_id: Qj,
    updatecommitteeaction_to_bytes: xj,
    updatecommitteeaction_to_hex: zj,
    updatecommitteeaction_to_js_value: Oj,
    updatecommitteeaction_to_json: Rj,
    url_from_bytes: cg,
    url_from_hex: wg,
    url_from_json: bg,
    url_new: lg,
    url_to_bytes: dg,
    url_to_hex: pg,
    url_to_js_value: fv,
    url_to_json: dv,
    url_url: pv,
    value_checked_add: Wz,
    value_checked_sub: Mz,
    value_clamped_sub: Gz,
    value_coin: Uz,
    value_compare: Hz,
    value_from_bytes: Fz,
    value_from_hex: Oz,
    value_from_json: Lz,
    value_is_zero: Zz,
    value_multiasset: Kz,
    value_new: Jz,
    value_new_from_assets: Yz,
    value_new_with_assets: Qz,
    value_set_coin: Ez,
    value_set_multiasset: Sz,
    value_to_bytes: zz,
    value_to_hex: Rz,
    value_to_js_value: $z,
    value_to_json: qz,
    value_zero: Xz,
    versionedblock_block: P6,
    versionedblock_era: B6,
    versionedblock_from_bytes: A6,
    versionedblock_from_hex: D6,
    versionedblock_from_json: C6,
    versionedblock_new: V6,
    versionedblock_to_bytes: H6,
    versionedblock_to_hex: I6,
    versionedblock_to_js_value: N6,
    versionedblock_to_json: T6,
    vkey_from_bytes: f6,
    vkey_from_hex: y6,
    vkey_from_json: k6,
    vkey_new: x6,
    vkey_public_key: j6,
    vkey_to_bytes: u6,
    vkey_to_hex: h6,
    vkey_to_js_value: m6,
    vkey_to_json: v6,
    vkeys_add: B7,
    vkeys_get: P7,
    vkeys_len: iL,
    vkeys_new: bL,
    vkeywitness_from_bytes: O7,
    vkeywitness_from_hex: $7,
    vkeywitness_from_json: Y7,
    vkeywitness_new: Q7,
    vkeywitness_signature: Z7,
    vkeywitness_to_bytes: R7,
    vkeywitness_to_hex: q7,
    vkeywitness_to_js_value: J7,
    vkeywitness_to_json: L7,
    vkeywitness_vkey: X7,
    vkeywitnesses_add: pw,
    vkeywitnesses_from_bytes: nw,
    vkeywitnesses_from_hex: aw,
    vkeywitnesses_from_json: dw,
    vkeywitnesses_get: cw,
    vkeywitnesses_len: Iw,
    vkeywitnesses_new: Uw,
    vkeywitnesses_to_bytes: rw,
    vkeywitnesses_to_hex: ow,
    vkeywitnesses_to_js_value: iw,
    vkeywitnesses_to_json: sw,
    votedelegation_drep: Ew,
    votedelegation_from_bytes: Ed,
    votedelegation_from_hex: Sd,
    votedelegation_from_json: Gd,
    votedelegation_has_script_credentials: Kw,
    votedelegation_new: Hd,
    votedelegation_stake_credential: Sw,
    votedelegation_to_bytes: Ud,
    votedelegation_to_hex: Kd,
    votedelegation_to_js_value: Md,
    votedelegation_to_json: Wd,
    voter_from_bytes: gp,
    voter_from_hex: fp,
    voter_from_json: vp,
    voter_has_script_credentials: Op,
    voter_kind: jp,
    voter_new_constitutional_committee_hot_credential: mp,
    voter_new_drep_credential: kp,
    voter_new_stake_pool_key_hash: xp,
    voter_to_bytes: lp,
    voter_to_constitutional_committee_hot_credential: zp,
    voter_to_drep_credential: Fp,
    voter_to_hex: up,
    voter_to_js_value: yp,
    voter_to_json: hp,
    voter_to_key_hash: qp,
    voter_to_stake_pool_key_hash: Rp,
    voteregistrationanddelegation_coin: Gw,
    voteregistrationanddelegation_drep: Xc,
    voteregistrationanddelegation_from_bytes: Oc,
    voteregistrationanddelegation_from_hex: $c,
    voteregistrationanddelegation_from_json: Yc,
    voteregistrationanddelegation_has_script_credentials: Uc,
    voteregistrationanddelegation_new: Zc,
    voteregistrationanddelegation_stake_credential: Qc,
    voteregistrationanddelegation_to_bytes: Rc,
    voteregistrationanddelegation_to_hex: qc,
    voteregistrationanddelegation_to_js_value: Jc,
    voteregistrationanddelegation_to_json: Lc,
    voters_add: xY,
    voters_from_json: mY,
    voters_get: jY,
    voters_len: zY,
    voters_new: kY,
    voters_to_js_value: vY,
    voters_to_json: yY,
    votingbuilder_add: mF,
    votingbuilder_add_with_native_script: xF,
    votingbuilder_add_with_plutus_witness: kF,
    votingbuilder_build: OF,
    votingbuilder_get_native_scripts: FF,
    votingbuilder_get_plutus_witnesses: jF,
    votingbuilder_get_ref_inputs: zF,
    votingbuilder_has_plutus_scripts: RF,
    votingbuilder_new: vF,
    votingprocedure_anchor: nL,
    votingprocedure_from_bytes: s7,
    votingprocedure_from_hex: d7,
    votingprocedure_from_json: w7,
    votingprocedure_new: b7,
    votingprocedure_new_with_anchor: l7,
    votingprocedure_to_bytes: a7,
    votingprocedure_to_hex: i7,
    votingprocedure_to_js_value: p7,
    votingprocedure_to_json: c7,
    votingprocedure_vote_kind: g7,
    votingprocedures_from_bytes: tE,
    votingprocedures_from_hex: eE,
    votingprocedures_from_json: oE,
    votingprocedures_get: sE,
    votingprocedures_get_governance_action_ids_by_voter: dE,
    votingprocedures_get_voters: iE,
    votingprocedures_insert: aE,
    votingprocedures_new: JS,
    votingprocedures_to_bytes: BU,
    votingprocedures_to_hex: _E,
    votingprocedures_to_js_value: nE,
    votingprocedures_to_json: rE,
    votingproposal_anchor: l2,
    votingproposal_deposit: u2,
    votingproposal_from_bytes: s2,
    votingproposal_from_hex: d2,
    votingproposal_from_json: w2,
    votingproposal_governance_action: b2,
    votingproposal_new: f2,
    votingproposal_reward_account: g2,
    votingproposal_to_bytes: a2,
    votingproposal_to_hex: i2,
    votingproposal_to_js_value: p2,
    votingproposal_to_json: c2,
    votingproposalbuilder_add: $F,
    votingproposalbuilder_add_with_plutus_witness: LF,
    votingproposalbuilder_build: XF,
    votingproposalbuilder_get_plutus_witnesses: JF,
    votingproposalbuilder_get_ref_inputs: YF,
    votingproposalbuilder_has_plutus_scripts: QF,
    votingproposalbuilder_new: K3,
    votingproposals_add: o3,
    votingproposals_contains: a3,
    votingproposals_from_bytes: PF,
    votingproposals_from_hex: t3,
    votingproposals_from_json: r3,
    votingproposals_get: n3,
    votingproposals_len: E3,
    votingproposals_new: U3,
    votingproposals_to_bytes: VF,
    votingproposals_to_hex: BF,
    votingproposals_to_js_value: e3,
    votingproposals_to_json: _3,
    votingproposals_to_option: s3,
    vrfcert_from_bytes: xS,
    vrfcert_from_hex: zS,
    vrfcert_from_json: OS,
    vrfcert_new: LS,
    vrfcert_output: qS,
    vrfcert_proof: $S,
    vrfcert_to_bytes: kS,
    vrfcert_to_hex: jS,
    vrfcert_to_js_value: RS,
    vrfcert_to_json: FS,
    vrfkeyhash_from_bech32: AQ,
    vrfkeyhash_from_bytes: HQ,
    vrfkeyhash_from_hex: IQ,
    vrfkeyhash_to_bech32: AX,
    vrfkeyhash_to_bytes: YX,
    vrfkeyhash_to_hex: FX,
    vrfvkey_from_bech32: rX,
    vrfvkey_from_bytes: eX,
    vrfvkey_from_hex: nX,
    vrfvkey_to_bech32: tZ,
    vrfvkey_to_bytes: MX,
    vrfvkey_to_hex: $X,
    withdrawals_from_bytes: Hu,
    withdrawals_from_hex: Iu,
    withdrawals_from_json: Nu,
    withdrawals_get: Vu,
    withdrawals_insert: Cu,
    withdrawals_keys: Pu,
    withdrawals_len: rv,
    withdrawals_new: gv,
    withdrawals_to_bytes: Gu,
    withdrawals_to_hex: Au,
    withdrawals_to_js_value: Tu,
    withdrawals_to_json: Du,
    withdrawalsbuilder_add: bR,
    withdrawalsbuilder_add_with_native_script: gR,
    withdrawalsbuilder_add_with_plutus_witness: lR,
    withdrawalsbuilder_build: mR,
    withdrawalsbuilder_get_native_scripts: hR,
    withdrawalsbuilder_get_plutus_witnesses: uR,
    withdrawalsbuilder_get_ref_inputs: fR,
    withdrawalsbuilder_get_total_withdrawals: yR,
    withdrawalsbuilder_has_plutus_scripts: vR,
    withdrawalsbuilder_new: n8
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
  aH as BlockEra,
  bt as BlockHash,
  ut as BootstrapWitness,
  x_ as BootstrapWitnesses,
  ft as ByronAddress,
  HG as ByronAddressType,
  MG as CborContainerType,
  tH as CborSetType,
  Y as Certificate,
  WG as CertificateKind,
  Kt as Certificates,
  or as CertificatesBuilder,
  j_ as ChangeConfig,
  GG as CoinSelectionStrategyCIP2,
  s_ as Committee,
  It as CommitteeColdResign,
  z_ as CommitteeHotAuth,
  Ut as Constitution,
  ge as ConstrPlutusData,
  i_ as CostModel,
  kt as Costmdls,
  nH as CredKind,
  x as Credential,
  Ft as Credentials,
  F_ as DNSRecordAorAAAA,
  R_ as DNSRecordSRV,
  H as DRep,
  O_ as DRepDeregistration,
  TG as DRepKind,
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
  CG as LanguageKind,
  qe as Languages,
  Ie as LegacyDaedalusPrivateKey,
  De as LinearFee,
  DG as MIRKind,
  KG as MIRPot,
  Y_ as MIRToStakeCredentials,
  br as MalformedAddress,
  rH as MetadataJsonSchema,
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
  _H as NativeScriptKind,
  Ht as NativeScriptSource,
  E as NativeScripts,
  Pt as NetworkId,
  UG as NetworkIdKind,
  be as NetworkInfo,
  Bt as NewConstitutionAction,
  t_ as NoConfidenceAction,
  y_ as Nonce,
  p_ as OperationalCert,
  Le as OutputDatum,
  vt as ParameterChangeAction,
  O as PlutusData,
  EG as PlutusDataKind,
  eH as PlutusDatumSchema,
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
  AG as RedeemerTagKind,
  Wt as Redeemers,
  Zt as Relay,
  PG as RelayKind,
  M_ as Relays,
  T as RewardAddress,
  G_ as RewardAddresses,
  H_ as ScriptAll,
  A_ as ScriptAny,
  u_ as ScriptDataHash,
  Q as ScriptHash,
  oH as ScriptHashNamespace,
  I_ as ScriptHashes,
  D_ as ScriptNOfK,
  T_ as ScriptPubkey,
  xt as ScriptRef,
  sH as ScriptSchema,
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
  NG as TransactionMetadatumKind,
  Fe as TransactionMetadatumLabels,
  I as TransactionOutput,
  w_ as TransactionOutputAmountBuilder,
  pe as TransactionOutputBuilder,
  b_ as TransactionOutputs,
  SG as TransactionSetsState,
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
  BG as VoteKind,
  oe as VoteRegistrationAndDelegation,
  C as Voter,
  ZG as VoterKind,
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
  Xs as __wbg_getRandomValues_3aa56aa6edec874c,
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
  Qs as __wbg_randomFillSync_5c9c955aa56b6049,
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
  ks as __wbindgen_error_new,
  Us as __wbindgen_is_function,
  js as __wbindgen_is_object,
  Ls as __wbindgen_is_string,
  Is as __wbindgen_is_undefined,
  ni as __wbindgen_jsval_eq,
  bi as __wbindgen_memory,
  hs as __wbindgen_number_new,
  xs as __wbindgen_object_clone_ref,
  ys as __wbindgen_object_drop_ref,
  ms as __wbindgen_string_get,
  vs as __wbindgen_string_new,
  wi as __wbindgen_throw,
  bG as calculate_ex_units_ceil_cost,
  XG as create_send_all,
  yG as decode_arbitrary_bytes_from_metadatum,
  mG as decode_metadatum_to_json_str,
  fG as decode_plutus_datum_to_json_str,
  QG as decrypt_with_password,
  hG as encode_arbitrary_bytes_as_metadatum,
  vG as encode_json_str_to_metadatum,
  LG as encode_json_str_to_native_script,
  uG as encode_json_str_to_plutus_datum,
  YG as encrypt_with_password,
  qG as get_deposit,
  OG as get_implicit_input,
  JG as has_transaction_set_tag,
  zG as hash_auxiliary_data,
  FG as hash_plutus_data,
  RG as hash_script_data,
  kG as make_daedalus_bootstrap_witness,
  xG as make_icarus_bootstrap_witness,
  jG as make_vkey_witness,
  $G as min_ada_for_output,
  wG as min_fee,
  gG as min_ref_script_fee,
  lG as min_script_fee
};
