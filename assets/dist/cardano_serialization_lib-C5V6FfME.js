let $, VG, H, gr, M, yt, at, P, ar, Yr, _e, E, h, h_, vt, mt, oH, w_, l_, kt, f_, HG, MG, _H, J, WG, E_, ne, jt, GG, ot, A_, xt, Z_, br, it, m_, nH, k, z_, zt, Ft, G, Rt, TG, I_, D_, Ot, Mr, J_, Ur, O, V, c_, te, F_, e_, Er, dr, xr, Rr, pe, re, st, lr, Y_, pr, qt, r_, Z, Kr, IG, T_, dt, N_, Gr, Q, $t, Lt, Hr, fr, I, CG, Or, Ar, Ir, DG, KG, Jt, we, eH, or, ur, g_, M_, Dr, qr, Sr, C_, Yt, T, Qt, S, tH, G_, U, V_, UG, wr, P_, B_, ht, ct, $r, y_, R, EG, rH, i_, hr, Lr, W, vr, K_, B, H_, Jr, ee, Xt, yr, Zt, Ut, Et, Kt, v_, St, n_, a_, Q_, sH, o_, d_, AG, S_, X_, PG, Wt, D, Mt, Gt, Ht, lt, Y, aH, At, It, Dt, k_, iH, Tt, Nt, Ct, Vt, j_, x_, Pt, Bt, ge, _t, tt, R_, fe, ue, _r, C, be, Nr, t_, s_, X, K, L, NG, zr, A, pt, cr, wt, SG, O_, sr, u_, gt, mr, rt, Tr, ae, m, tr, et, q_, ft, ir, F, jr, __, le, $_, rr, er, BG, nr, N, ZG, Wr, oe, b_, bt, L_, ie, U_, W_, se, xi, Ni, Ki, Di, rs, Fi, os, ds, Qi, is, Gi, Hi, Ji, Xi, Vi, Si, ts, Ei, Ui, Ci, Bi, qi, Ri, Yi, ss, as, Li, Wi, ns, zi, Ti, Pi, Ii, ci, _s, Oi, Mi, cs, mi, Zi, ji, $i, Ai, es, ws, ui, ki, hi, vi, yi, ps, gG, XG, yG, mG, uG, QG, hG, vG, LG, fG, YG, qG, OG, JG, zG, FG, RG, kG, jG, xG, $G, wG, lG, bG;
let __tla = (async () => {
  const si = "//unpkg.com/@emurgo/cardano-serialization-lib-browser@14.1.1/cardano_serialization_lib_bg.wasm", di = async (w = {}, _) => {
    let r;
    if (_.startsWith("data:")) {
      const o = _.replace(/^data:.*?base64,/, "");
      let n;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") n = Buffer.from(o, "base64");
      else if (typeof atob == "function") {
        const e = atob(o);
        n = new Uint8Array(e.length);
        for (let s = 0; s < e.length; s++) n[s] = e.charCodeAt(s);
      } else throw new Error("Cannot decode base64-encoded data URL");
      r = await WebAssembly.instantiate(n, w);
    } else {
      const o = await fetch(_), n = o.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && n.startsWith("application/wasm")) r = await WebAssembly.instantiateStreaming(o, w);
      else {
        const e = await o.arrayBuffer();
        r = await WebAssembly.instantiate(e, w);
      }
    }
    return r.instance.exports;
  };
  let t;
  ci = function(w) {
    t = w;
  };
  const nt = new Array(128).fill(void 0);
  nt.push(void 0, null, true, false);
  let Zr = nt.length;
  function q(w) {
    Zr === nt.length && nt.push(nt.length + 1);
    const _ = Zr;
    return Zr = nt[_], nt[_] = w, _;
  }
  function z(w) {
    return nt[w];
  }
  function pi(w) {
    w < 132 || (nt[w] = Zr, Zr = w);
  }
  function d(w) {
    const _ = z(w);
    return pi(w), _;
  }
  const wi = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
  let _i = new wi("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  _i.decode();
  let Cr = null;
  function Fr() {
    return (Cr === null || Cr.byteLength === 0) && (Cr = new Uint8Array(t.memory.buffer)), Cr;
  }
  function f(w, _) {
    return w = w >>> 0, _i.decode(Fr().subarray(w, w + _));
  }
  let b = 0;
  const gi = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
  let Br = new gi("utf-8");
  const bi = typeof Br.encodeInto == "function" ? function(w, _) {
    return Br.encodeInto(w, _);
  } : function(w, _) {
    const r = Br.encode(w);
    return _.set(r), {
      read: w.length,
      written: r.length
    };
  };
  function l(w, _, r) {
    if (r === void 0) {
      const i = Br.encode(w), g = _(i.length, 1) >>> 0;
      return Fr().subarray(g, g + i.length).set(i), b = i.length, g;
    }
    let o = w.length, n = _(o, 1) >>> 0;
    const e = Fr();
    let s = 0;
    for (; s < o; s++) {
      const i = w.charCodeAt(s);
      if (i > 127) break;
      e[n + s] = i;
    }
    if (s !== o) {
      s !== 0 && (w = w.slice(s)), n = r(n, o, o = s + w.length * 3, 1) >>> 0;
      const i = Fr().subarray(n + s, n + o), g = bi(w, i);
      s += g.written, n = r(n, o, s, 1) >>> 0;
    }
    return b = s, n;
  }
  function p_(w) {
    return w == null;
  }
  let Vr = null;
  function a() {
    return (Vr === null || Vr.byteLength === 0) && (Vr = new Int32Array(t.memory.buffer)), Vr;
  }
  function ce(w) {
    const _ = typeof w;
    if (_ == "number" || _ == "boolean" || w == null) return `${w}`;
    if (_ == "string") return `"${w}"`;
    if (_ == "symbol") {
      const n = w.description;
      return n == null ? "Symbol" : `Symbol(${n})`;
    }
    if (_ == "function") {
      const n = w.name;
      return typeof n == "string" && n.length > 0 ? `Function(${n})` : "Function";
    }
    if (Array.isArray(w)) {
      const n = w.length;
      let e = "[";
      n > 0 && (e += ce(w[0]));
      for (let s = 1; s < n; s++) e += ", " + ce(w[s]);
      return e += "]", e;
    }
    const r = /\[object ([^\]]+)\]/.exec(toString.call(w));
    let o;
    if (r.length > 1) o = r[1];
    else return toString.call(w);
    if (o == "Object") try {
      return "Object(" + JSON.stringify(w) + ")";
    } catch {
      return "Object";
    }
    return w instanceof Error ? `${w.name}: ${w.message}
${w.stack}` : o;
  }
  function y(w, _) {
    return w = w >>> 0, Fr().subarray(w / 1, w / 1 + _);
  }
  function u(w, _) {
    const r = _(w.length * 1, 1) >>> 0;
    return Fr().set(w, r / 1), b = w.length, r;
  }
  function p(w, _) {
    if (!(w instanceof _)) throw new Error(`expected instance of ${_.name}`);
    return w.ptr;
  }
  let Pr = null;
  function ti() {
    return (Pr === null || Pr.byteLength === 0) && (Pr = new Uint32Array(t.memory.buffer)), Pr;
  }
  function de(w, _) {
    return w = w >>> 0, ti().subarray(w / 4, w / 4 + _);
  }
  wG = function(w, _) {
    try {
      const e = t.__wbindgen_add_to_stack_pointer(-16);
      p(w, R_), p(_, Ir), t.min_fee(e, w.__wbg_ptr, _.__wbg_ptr);
      var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
      if (n) throw d(o);
      return h.__wrap(r);
    } finally {
      t.__wbindgen_add_to_stack_pointer(16);
    }
  };
  gG = function(w, _) {
    try {
      const e = t.__wbindgen_add_to_stack_pointer(-16);
      p(w, e_), p(_, F_), t.calculate_ex_units_ceil_cost(e, w.__wbg_ptr, _.__wbg_ptr);
      var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
      if (n) throw d(o);
      return h.__wrap(r);
    } finally {
      t.__wbindgen_add_to_stack_pointer(16);
    }
  };
  bG = function(w, _) {
    try {
      const e = t.__wbindgen_add_to_stack_pointer(-16);
      p(w, R_), p(_, F_), t.min_script_fee(e, w.__wbg_ptr, _.__wbg_ptr);
      var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
      if (n) throw d(o);
      return h.__wrap(r);
    } finally {
      t.__wbindgen_add_to_stack_pointer(16);
    }
  };
  lG = function(w, _) {
    try {
      const e = t.__wbindgen_add_to_stack_pointer(-16);
      p(_, m), t.min_ref_script_fee(e, w, _.__wbg_ptr);
      var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
      if (n) throw d(o);
      return h.__wrap(r);
    } finally {
      t.__wbindgen_add_to_stack_pointer(16);
    }
  };
  fG = function(w, _) {
    try {
      const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(w, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
      t.encode_json_str_to_plutus_datum(e, s, i, _);
      var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
      if (n) throw d(o);
      return R.__wrap(r);
    } finally {
      t.__wbindgen_add_to_stack_pointer(16);
    }
  };
  uG = function(w, _) {
    let r, o;
    try {
      const v = t.__wbindgen_add_to_stack_pointer(-16);
      p(w, R), t.decode_plutus_datum_to_json_str(v, w.__wbg_ptr, _);
      var n = a()[v / 4 + 0], e = a()[v / 4 + 1], s = a()[v / 4 + 2], i = a()[v / 4 + 3], g = n, c = e;
      if (i) throw g = 0, c = 0, d(s);
      return r = g, o = c, f(g, c);
    } finally {
      t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
    }
  };
  hG = function(w) {
    const _ = u(w, t.__wbindgen_malloc), r = b, o = t.encode_arbitrary_bytes_as_metadatum(_, r);
    return L.__wrap(o);
  };
  yG = function(w) {
    try {
      const s = t.__wbindgen_add_to_stack_pointer(-16);
      p(w, L), t.decode_arbitrary_bytes_from_metadatum(s, w.__wbg_ptr);
      var _ = a()[s / 4 + 0], r = a()[s / 4 + 1], o = a()[s / 4 + 2], n = a()[s / 4 + 3];
      if (n) throw d(o);
      var e = y(_, r).slice();
      return t.__wbindgen_free(_, r * 1, 1), e;
    } finally {
      t.__wbindgen_add_to_stack_pointer(16);
    }
  };
  vG = function(w, _) {
    try {
      const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(w, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
      t.encode_json_str_to_metadatum(e, s, i, _);
      var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
      if (n) throw d(o);
      return L.__wrap(r);
    } finally {
      t.__wbindgen_add_to_stack_pointer(16);
    }
  };
  mG = function(w, _) {
    let r, o;
    try {
      const v = t.__wbindgen_add_to_stack_pointer(-16);
      p(w, L), t.decode_metadatum_to_json_str(v, w.__wbg_ptr, _);
      var n = a()[v / 4 + 0], e = a()[v / 4 + 1], s = a()[v / 4 + 2], i = a()[v / 4 + 3], g = n, c = e;
      if (i) throw g = 0, c = 0, d(s);
      return r = g, o = c, f(g, c);
    } finally {
      t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
    }
  };
  function li(w, _) {
    const r = _(w.length * 4, 4) >>> 0;
    return ti().set(w, r / 4), b = w.length, r;
  }
  kG = function(w, _, r) {
    p(w, s_), p(_, f_), p(r, Ar);
    const o = t.make_daedalus_bootstrap_witness(w.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
    return l_.__wrap(o);
  };
  jG = function(w, _, r) {
    p(w, s_), p(_, f_), p(r, h_);
    const o = t.make_icarus_bootstrap_witness(w.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
    return l_.__wrap(o);
  };
  xG = function(w, _) {
    p(w, s_), p(_, v_);
    const r = t.make_vkey_witness(w.__wbg_ptr, _.__wbg_ptr);
    return $_.__wrap(r);
  };
  zG = function(w) {
    p(w, P);
    const _ = t.hash_auxiliary_data(w.__wbg_ptr);
    return ar.__wrap(_);
  };
  FG = function(w) {
    p(w, R);
    const _ = t.hash_plutus_data(w.__wbg_ptr);
    return J_.__wrap(_);
  };
  RG = function(w, _, r) {
    p(w, S_), p(_, m_);
    let o = 0;
    p_(r) || (p(r, i_), o = r.__destroy_into_raw());
    const n = t.hash_script_data(w.__wbg_ptr, _.__wbg_ptr, o);
    return lt.__wrap(n);
  };
  OG = function(w, _, r) {
    try {
      const s = t.__wbindgen_add_to_stack_pointer(-16);
      p(w, C), p(_, h), p(r, h), t.get_implicit_input(s, w.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
      var o = a()[s / 4 + 0], n = a()[s / 4 + 1], e = a()[s / 4 + 2];
      if (e) throw d(n);
      return F.__wrap(o);
    } finally {
      t.__wbindgen_add_to_stack_pointer(16);
    }
  };
  qG = function(w, _, r) {
    try {
      const s = t.__wbindgen_add_to_stack_pointer(-16);
      p(w, C), p(_, h), p(r, h), t.get_deposit(s, w.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
      var o = a()[s / 4 + 0], n = a()[s / 4 + 1], e = a()[s / 4 + 2];
      if (e) throw d(n);
      return h.__wrap(o);
    } finally {
      t.__wbindgen_add_to_stack_pointer(16);
    }
  };
  $G = function(w, _) {
    try {
      const e = t.__wbindgen_add_to_stack_pointer(-16);
      p(w, A), p(_, Mr), t.min_ada_for_output(e, w.__wbg_ptr, _.__wbg_ptr);
      var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
      if (n) throw d(o);
      return h.__wrap(r);
    } finally {
      t.__wbindgen_add_to_stack_pointer(16);
    }
  };
  LG = function(w, _, r) {
    try {
      const s = t.__wbindgen_add_to_stack_pointer(-16), i = l(w, t.__wbindgen_malloc, t.__wbindgen_realloc), g = b, c = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), v = b;
      t.encode_json_str_to_native_script(s, i, g, c, v, r);
      var o = a()[s / 4 + 0], n = a()[s / 4 + 1], e = a()[s / 4 + 2];
      if (e) throw d(n);
      return S.__wrap(o);
    } finally {
      t.__wbindgen_add_to_stack_pointer(16);
    }
  };
  JG = function(w) {
    try {
      const n = t.__wbindgen_add_to_stack_pointer(-16), e = u(w, t.__wbindgen_malloc), s = b;
      t.has_transaction_set_tag(n, e, s);
      var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
      if (o) throw d(r);
      return _;
    } finally {
      t.__wbindgen_add_to_stack_pointer(16);
    }
  };
  YG = function(w, _, r, o) {
    let n, e;
    try {
      const x = t.__wbindgen_add_to_stack_pointer(-16), Qr = l(w, t.__wbindgen_malloc, t.__wbindgen_realloc), Xr = b, ri = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), ei = b, ni = l(r, t.__wbindgen_malloc, t.__wbindgen_realloc), ai = b, oi = l(o, t.__wbindgen_malloc, t.__wbindgen_realloc), ii = b;
      t.encrypt_with_password(x, Qr, Xr, ri, ei, ni, ai, oi, ii);
      var s = a()[x / 4 + 0], i = a()[x / 4 + 1], g = a()[x / 4 + 2], c = a()[x / 4 + 3], v = s, j = i;
      if (c) throw v = 0, j = 0, d(g);
      return n = v, e = j, f(v, j);
    } finally {
      t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(n, e, 1);
    }
  };
  QG = function(w, _) {
    let r, o;
    try {
      const v = t.__wbindgen_add_to_stack_pointer(-16), j = l(w, t.__wbindgen_malloc, t.__wbindgen_realloc), x = b, Qr = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), Xr = b;
      t.decrypt_with_password(v, j, x, Qr, Xr);
      var n = a()[v / 4 + 0], e = a()[v / 4 + 1], s = a()[v / 4 + 2], i = a()[v / 4 + 3], g = n, c = e;
      if (i) throw g = 0, c = 0, d(s);
      return r = g, o = c, f(g, c);
    } finally {
      t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
    }
  };
  XG = function(w, _, r) {
    try {
      const s = t.__wbindgen_add_to_stack_pointer(-16);
      p(w, $), p(_, sr), p(r, Nr), t.create_send_all(s, w.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
      var o = a()[s / 4 + 0], n = a()[s / 4 + 1], e = a()[s / 4 + 2];
      if (e) throw d(n);
      return ue.__wrap(o);
    } finally {
      t.__wbindgen_add_to_stack_pointer(16);
    }
  };
  function ut(w, _) {
    try {
      return w.apply(this, _);
    } catch (r) {
      t.__wbindgen_exn_store(q(r));
    }
  }
  let he;
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
  _H = Object.freeze({
    Tagged: 0,
    0: "Tagged",
    Untagged: 1,
    1: "Untagged"
  });
  tH = Object.freeze({
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
    BasicConversions: 0,
    0: "BasicConversions",
    DetailedSchema: 1,
    1: "DetailedSchema"
  });
  eH = Object.freeze({
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
  aH = Object.freeze({
    NativeScript: 0,
    0: "NativeScript",
    PlutusScript: 1,
    1: "PlutusScript",
    PlutusScriptV2: 2,
    2: "PlutusScriptV2",
    PlutusScriptV3: 3,
    3: "PlutusScriptV3"
  });
  oH = Object.freeze({
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
  iH = Object.freeze({
    Wallet: 0,
    0: "Wallet",
    Node: 1,
    1: "Node"
  });
  he = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_address_free(w >>> 0));
  $ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create($.prototype);
      return r.__wbg_ptr = _, he.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, he.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_address_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.address_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return $.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.address_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.address_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.address_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return $.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    kind() {
      return t.address_kind(this.__wbg_ptr);
    }
    payment_cred() {
      const _ = t.address_payment_cred(this.__wbg_ptr);
      return _ === 0 ? void 0 : k.__wrap(_);
    }
    is_malformed() {
      return t.address_is_malformed(this.__wbg_ptr) !== 0;
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.address_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.address_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return $.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.address_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(_) {
      let r, o;
      try {
        const x = t.__wbindgen_add_to_stack_pointer(-16);
        var n = p_(_) ? 0 : l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), e = b;
        t.address_to_bech32(x, this.__wbg_ptr, n, e);
        var s = a()[x / 4 + 0], i = a()[x / 4 + 1], g = a()[x / 4 + 2], c = a()[x / 4 + 3], v = s, j = i;
        if (c) throw v = 0, j = 0, d(g);
        return r = v, o = j, f(v, j);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.address_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return $.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    network_id() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.address_network_id(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return _;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const ye = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_anchor_free(w >>> 0));
  H = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(H.prototype);
      return r.__wbg_ptr = _, ye.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ye.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_anchor_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchor_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.anchor_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return H.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchor_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.anchor_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return H.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchor_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchor_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.anchor_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return H.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    url() {
      const _ = t.anchor_url(this.__wbg_ptr);
      return ae.__wrap(_);
    }
    anchor_data_hash() {
      const _ = t.anchor_anchor_data_hash(this.__wbg_ptr);
      return gr.__wrap(_);
    }
    static new(_, r) {
      p(_, ae), p(r, gr);
      const o = t.anchor_new(_.__wbg_ptr, r.__wbg_ptr);
      return H.__wrap(o);
    }
  };
  const ve = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_anchordatahash_free(w >>> 0));
  gr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(gr.prototype);
      return r.__wbg_ptr = _, ve.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ve.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_anchordatahash_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.anchordatahash_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return gr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(_) {
      let r, o;
      try {
        const v = t.__wbindgen_add_to_stack_pointer(-16), j = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), x = b;
        t.anchordatahash_to_bech32(v, this.__wbg_ptr, j, x);
        var n = a()[v / 4 + 0], e = a()[v / 4 + 1], s = a()[v / 4 + 2], i = a()[v / 4 + 3], g = n, c = e;
        if (i) throw g = 0, c = 0, d(s);
        return r = g, o = c, f(g, c);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.anchordatahash_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return gr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.anchordatahash_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return gr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const me = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_assetname_free(w >>> 0));
  M = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(M.prototype);
      return r.__wbg_ptr = _, me.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, me.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_assetname_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.assetname_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.assetname_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return M.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.assetname_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.assetname_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return M.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.assetname_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.assetname_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.assetname_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return M.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.assetname_new(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return M.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    name() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.assetname_name(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const ke = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_assetnames_free(w >>> 0));
  yt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(yt.prototype);
      return r.__wbg_ptr = _, ke.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ke.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_assetnames_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.assetnames_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.assetnames_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return yt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.assetnames_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.assetnames_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return yt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.assetnames_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.assetnames_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.assetnames_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return yt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.assetnames_new();
      return yt.__wrap(_);
    }
    len() {
      return t.assetnames_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.assetnames_get(this.__wbg_ptr, _);
      return M.__wrap(r);
    }
    add(_) {
      p(_, M), t.assetnames_add(this.__wbg_ptr, _.__wbg_ptr);
    }
  };
  const je = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_assets_free(w >>> 0));
  at = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(at.prototype);
      return r.__wbg_ptr = _, je.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, je.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_assets_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.assets_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.assets_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return at.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.assets_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.assets_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return at.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.assets_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.assets_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.assets_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return at.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.assets_new();
      return at.__wrap(_);
    }
    len() {
      return t.assets_len(this.__wbg_ptr) >>> 0;
    }
    insert(_, r) {
      p(_, M), p(r, h);
      const o = t.assets_insert(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
      return o === 0 ? void 0 : h.__wrap(o);
    }
    get(_) {
      p(_, M);
      const r = t.assets_get(this.__wbg_ptr, _.__wbg_ptr);
      return r === 0 ? void 0 : h.__wrap(r);
    }
    keys() {
      const _ = t.assets_keys(this.__wbg_ptr);
      return yt.__wrap(_);
    }
  };
  const xe = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_auxiliarydata_free(w >>> 0));
  P = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(P.prototype);
      return r.__wbg_ptr = _, xe.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, xe.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_auxiliarydata_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.auxiliarydata_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.auxiliarydata_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return P.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.auxiliarydata_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.auxiliarydata_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return P.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.auxiliarydata_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.auxiliarydata_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.auxiliarydata_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return P.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.auxiliarydata_new();
      return P.__wrap(_);
    }
    metadata() {
      const _ = t.auxiliarydata_metadata(this.__wbg_ptr);
      return _ === 0 ? void 0 : st.__wrap(_);
    }
    set_metadata(_) {
      p(_, st), t.auxiliarydata_set_metadata(this.__wbg_ptr, _.__wbg_ptr);
    }
    native_scripts() {
      const _ = t.auxiliarydata_native_scripts(this.__wbg_ptr);
      return _ === 0 ? void 0 : U.__wrap(_);
    }
    set_native_scripts(_) {
      p(_, U), t.auxiliarydata_set_native_scripts(this.__wbg_ptr, _.__wbg_ptr);
    }
    plutus_scripts() {
      const _ = t.auxiliarydata_plutus_scripts(this.__wbg_ptr);
      return _ === 0 ? void 0 : K_.__wrap(_);
    }
    set_plutus_scripts(_) {
      p(_, K_), t.auxiliarydata_set_plutus_scripts(this.__wbg_ptr, _.__wbg_ptr);
    }
    prefer_alonzo_format() {
      return t.auxiliarydata_prefer_alonzo_format(this.__wbg_ptr) !== 0;
    }
    set_prefer_alonzo_format(_) {
      t.auxiliarydata_set_prefer_alonzo_format(this.__wbg_ptr, _);
    }
  };
  const ze = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_auxiliarydatahash_free(w >>> 0));
  ar = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(ar.prototype);
      return r.__wbg_ptr = _, ze.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ze.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_auxiliarydatahash_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.auxiliarydatahash_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ar.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(_) {
      let r, o;
      try {
        const v = t.__wbindgen_add_to_stack_pointer(-16), j = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), x = b;
        t.anchordatahash_to_bech32(v, this.__wbg_ptr, j, x);
        var n = a()[v / 4 + 0], e = a()[v / 4 + 1], s = a()[v / 4 + 2], i = a()[v / 4 + 3], g = n, c = e;
        if (i) throw g = 0, c = 0, d(s);
        return r = g, o = c, f(g, c);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.auxiliarydatahash_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ar.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.auxiliarydatahash_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ar.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Fe = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_auxiliarydataset_free(w >>> 0));
  Yr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Yr.prototype);
      return r.__wbg_ptr = _, Fe.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Fe.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_auxiliarydataset_free(_);
    }
    static new() {
      const _ = t.auxiliarydataset_new();
      return Yr.__wrap(_);
    }
    len() {
      return t.auxiliarydataset_len(this.__wbg_ptr) >>> 0;
    }
    insert(_, r) {
      p(r, P);
      const o = t.auxiliarydataset_insert(this.__wbg_ptr, _, r.__wbg_ptr);
      return o === 0 ? void 0 : P.__wrap(o);
    }
    get(_) {
      const r = t.auxiliarydataset_get(this.__wbg_ptr, _);
      return r === 0 ? void 0 : P.__wrap(r);
    }
    indices() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.auxiliarydataset_indices(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = de(_, r).slice();
        return t.__wbindgen_free(_, r * 4, 4), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Re = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_baseaddress_free(w >>> 0));
  _e = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(_e.prototype);
      return r.__wbg_ptr = _, Re.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Re.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_baseaddress_free(_);
    }
    static new(_, r, o) {
      p(r, k), p(o, k);
      const n = t.baseaddress_new(_, r.__wbg_ptr, o.__wbg_ptr);
      return _e.__wrap(n);
    }
    payment_cred() {
      const _ = t.baseaddress_payment_cred(this.__wbg_ptr);
      return k.__wrap(_);
    }
    stake_cred() {
      const _ = t.baseaddress_stake_cred(this.__wbg_ptr);
      return k.__wrap(_);
    }
    to_address() {
      const _ = t.baseaddress_to_address(this.__wbg_ptr);
      return $.__wrap(_);
    }
    static from_address(_) {
      p(_, $);
      const r = t.baseaddress_from_address(_.__wbg_ptr);
      return r === 0 ? void 0 : _e.__wrap(r);
    }
    network_id() {
      return t.baseaddress_network_id(this.__wbg_ptr);
    }
  };
  const Oe = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_bigint_free(w >>> 0));
  E = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(E.prototype);
      return r.__wbg_ptr = _, Oe.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Oe.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_bigint_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.bigint_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.bigint_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return E.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.bigint_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.bigint_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return E.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.bigint_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.bigint_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.bigint_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return E.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    is_zero() {
      return t.bigint_is_zero(this.__wbg_ptr) !== 0;
    }
    as_u64() {
      const _ = t.bigint_as_u64(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    as_int() {
      const _ = t.bigint_as_int(this.__wbg_ptr);
      return _ === 0 ? void 0 : Q.__wrap(_);
    }
    static from_str(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.bigint_from_str(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return E.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_str() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.bigint_to_str(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    add(_) {
      p(_, E);
      const r = t.bigint_add(this.__wbg_ptr, _.__wbg_ptr);
      return E.__wrap(r);
    }
    sub(_) {
      p(_, E);
      const r = t.bigint_sub(this.__wbg_ptr, _.__wbg_ptr);
      return E.__wrap(r);
    }
    mul(_) {
      p(_, E);
      const r = t.bigint_mul(this.__wbg_ptr, _.__wbg_ptr);
      return E.__wrap(r);
    }
    pow(_) {
      const r = t.bigint_pow(this.__wbg_ptr, _);
      return E.__wrap(r);
    }
    static one() {
      const _ = t.bigint_one();
      return E.__wrap(_);
    }
    static zero() {
      const _ = t.bigint_zero();
      return E.__wrap(_);
    }
    abs() {
      const _ = t.bigint_abs(this.__wbg_ptr);
      return E.__wrap(_);
    }
    increment() {
      const _ = t.bigint_increment(this.__wbg_ptr);
      return E.__wrap(_);
    }
    div_ceil(_) {
      p(_, E);
      const r = t.bigint_div_ceil(this.__wbg_ptr, _.__wbg_ptr);
      return E.__wrap(r);
    }
    div_floor(_) {
      p(_, E);
      const r = t.bigint_div_floor(this.__wbg_ptr, _.__wbg_ptr);
      return E.__wrap(r);
    }
  };
  const qe = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_bignum_free(w >>> 0));
  h = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(h.prototype);
      return r.__wbg_ptr = _, qe.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, qe.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_bignum_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.bignum_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.bignum_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return h.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.bignum_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.bignum_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return h.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.bignum_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.bignum_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.bignum_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return h.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_str(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.bignum_from_str(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return h.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_str() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.bignum_to_str(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static zero() {
      const _ = t.bignum_zero();
      return h.__wrap(_);
    }
    static one() {
      const _ = t.bignum_one();
      return h.__wrap(_);
    }
    is_zero() {
      return t.bignum_is_zero(this.__wbg_ptr) !== 0;
    }
    div_floor(_) {
      p(_, h);
      const r = t.bignum_div_floor(this.__wbg_ptr, _.__wbg_ptr);
      return h.__wrap(r);
    }
    checked_mul(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, h), t.bignum_checked_mul(e, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return h.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    checked_add(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, h), t.bignum_checked_add(e, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return h.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    checked_sub(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, h), t.bignum_checked_sub(e, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return h.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    clamped_sub(_) {
      p(_, h);
      const r = t.bignum_clamped_sub(this.__wbg_ptr, _.__wbg_ptr);
      return h.__wrap(r);
    }
    compare(_) {
      return p(_, h), t.bignum_compare(this.__wbg_ptr, _.__wbg_ptr);
    }
    less_than(_) {
      return p(_, h), t.bignum_less_than(this.__wbg_ptr, _.__wbg_ptr) !== 0;
    }
    static max_value() {
      const _ = t.bignum_max_value();
      return h.__wrap(_);
    }
    static max(_, r) {
      p(_, h), p(r, h);
      const o = t.bignum_max(_.__wbg_ptr, r.__wbg_ptr);
      return h.__wrap(o);
    }
  };
  const $e = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_bip32privatekey_free(w >>> 0));
  h_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(h_.prototype);
      return r.__wbg_ptr = _, $e.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, $e.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_bip32privatekey_free(_);
    }
    derive(_) {
      const r = t.bip32privatekey_derive(this.__wbg_ptr, _);
      return h_.__wrap(r);
    }
    static from_128_xprv(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.bip32privatekey_from_128_xprv(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return h_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_128_xprv() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.bip32privatekey_to_128_xprv(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static generate_ed25519_bip32() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.bip32privatekey_generate_ed25519_bip32(n);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return h_.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_raw_key() {
      const _ = t.bip32privatekey_to_raw_key(this.__wbg_ptr);
      return v_.__wrap(_);
    }
    to_public() {
      const _ = t.bip32privatekey_to_public(this.__wbg_ptr);
      return vt.__wrap(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.bip32privatekey_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return h_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.bip32privatekey_as_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.bip32privatekey_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return h_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.bip32privatekey_to_bech32(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_bip39_entropy(_, r) {
      const o = u(_, t.__wbindgen_malloc), n = b, e = u(r, t.__wbindgen_malloc), s = b, i = t.bip32privatekey_from_bip39_entropy(o, n, e, s);
      return h_.__wrap(i);
    }
    chaincode() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.bip32privatekey_chaincode(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.bip32privatekey_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.bip32privatekey_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return h_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Le = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_bip32publickey_free(w >>> 0));
  vt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(vt.prototype);
      return r.__wbg_ptr = _, Le.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Le.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_bip32publickey_free(_);
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.bip32publickey_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return vt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.bip32publickey_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    chaincode() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.bip32publickey_chaincode(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.bip32publickey_to_bech32(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.bip32publickey_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return vt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.bip32publickey_as_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.bip32publickey_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return vt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_raw_key() {
      const _ = t.bip32publickey_to_raw_key(this.__wbg_ptr);
      return Q_.__wrap(_);
    }
    derive(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.bip32publickey_derive(e, this.__wbg_ptr, _);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return vt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Je = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_block_free(w >>> 0));
  mt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(mt.prototype);
      return r.__wbg_ptr = _, Je.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Je.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_block_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.block_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.block_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return mt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.block_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.block_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return mt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.block_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.block_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.block_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return mt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    header() {
      const _ = t.block_header(this.__wbg_ptr);
      return dt.__wrap(_);
    }
    transaction_bodies() {
      const _ = t.block_transaction_bodies(this.__wbg_ptr);
      return _r.__wrap(_);
    }
    transaction_witness_sets() {
      const _ = t.block_transaction_witness_sets(this.__wbg_ptr);
      return gt.__wrap(_);
    }
    auxiliary_data_set() {
      const _ = t.block_auxiliary_data_set(this.__wbg_ptr);
      return Yr.__wrap(_);
    }
    invalid_transactions() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.block_invalid_transactions(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = de(_, r).slice();
        return t.__wbindgen_free(_, r * 4, 4), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_, r, o, n, e) {
      p(_, dt), p(r, _r), p(o, gt), p(n, Yr);
      const s = li(e, t.__wbindgen_malloc), i = b, g = t.block_new(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr, n.__wbg_ptr, s, i);
      return mt.__wrap(g);
    }
  };
  const Ye = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_blockhash_free(w >>> 0));
  w_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(w_.prototype);
      return r.__wbg_ptr = _, Ye.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ye.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_blockhash_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.blockhash_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return w_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(_) {
      let r, o;
      try {
        const v = t.__wbindgen_add_to_stack_pointer(-16), j = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), x = b;
        t.anchordatahash_to_bech32(v, this.__wbg_ptr, j, x);
        var n = a()[v / 4 + 0], e = a()[v / 4 + 1], s = a()[v / 4 + 2], i = a()[v / 4 + 3], g = n, c = e;
        if (i) throw g = 0, c = 0, d(s);
        return r = g, o = c, f(g, c);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.blockhash_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return w_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.blockhash_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return w_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Qe = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_bootstrapwitness_free(w >>> 0));
  l_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(l_.prototype);
      return r.__wbg_ptr = _, Qe.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Qe.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_bootstrapwitness_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.bootstrapwitness_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.bootstrapwitness_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return l_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.bootstrapwitness_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.bootstrapwitness_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return l_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.bootstrapwitness_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.bootstrapwitness_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.bootstrapwitness_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return l_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    vkey() {
      const _ = t.bootstrapwitness_vkey(this.__wbg_ptr);
      return __.__wrap(_);
    }
    signature() {
      const _ = t.bootstrapwitness_signature(this.__wbg_ptr);
      return c_.__wrap(_);
    }
    chain_code() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.bootstrapwitness_chain_code(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    attributes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.bootstrapwitness_attributes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_, r, o, n) {
      p(_, __), p(r, c_);
      const e = u(o, t.__wbindgen_malloc), s = b, i = u(n, t.__wbindgen_malloc), g = b, c = t.bootstrapwitness_new(_.__wbg_ptr, r.__wbg_ptr, e, s, i, g);
      return l_.__wrap(c);
    }
  };
  const Xe = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_bootstrapwitnesses_free(w >>> 0));
  kt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(kt.prototype);
      return r.__wbg_ptr = _, Xe.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Xe.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_bootstrapwitnesses_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.bootstrapwitnesses_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.bootstrapwitnesses_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return kt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.bootstrapwitnesses_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.bootstrapwitnesses_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return kt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.bootstrapwitnesses_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.bootstrapwitnesses_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.bootstrapwitnesses_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return kt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.bootstrapwitnesses_new();
      return kt.__wrap(_);
    }
    len() {
      return t.bootstrapwitnesses_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.bootstrapwitnesses_get(this.__wbg_ptr, _);
      return l_.__wrap(r);
    }
    add(_) {
      return p(_, l_), t.bootstrapwitnesses_add(this.__wbg_ptr, _.__wbg_ptr) !== 0;
    }
  };
  const Ze = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_byronaddress_free(w >>> 0));
  f_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(f_.prototype);
      return r.__wbg_ptr = _, Ze.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ze.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_byronaddress_free(_);
    }
    to_base58() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.byronaddress_to_base58(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.byronaddress_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.byronaddress_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return f_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    byron_protocol_magic() {
      return t.byronaddress_byron_protocol_magic(this.__wbg_ptr) >>> 0;
    }
    byron_address_kind() {
      return t.byronaddress_byron_address_kind(this.__wbg_ptr);
    }
    attributes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.byronaddress_attributes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    network_id() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.byronaddress_network_id(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return _;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_base58(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.byronaddress_from_base58(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return f_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static icarus_from_key(_, r) {
      p(_, vt);
      const o = t.byronaddress_icarus_from_key(_.__wbg_ptr, r);
      return f_.__wrap(o);
    }
    static is_valid(_) {
      const r = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), o = b;
      return t.byronaddress_is_valid(r, o) !== 0;
    }
    to_address() {
      const _ = t.byronaddress_to_address(this.__wbg_ptr);
      return $.__wrap(_);
    }
    static from_address(_) {
      p(_, $);
      const r = t.byronaddress_from_address(_.__wbg_ptr);
      return r === 0 ? void 0 : f_.__wrap(r);
    }
  };
  const Ue = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_certificate_free(w >>> 0));
  J = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(J.prototype);
      return r.__wbg_ptr = _, Ue.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ue.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_certificate_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.certificate_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.certificate_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return J.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.certificate_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.certificate_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return J.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.certificate_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.certificate_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.certificate_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return J.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_stake_registration(_) {
      p(_, x_);
      const r = t.certificate_new_stake_registration(_.__wbg_ptr);
      return J.__wrap(r);
    }
    static new_reg_cert(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, x_), t.certificate_new_reg_cert(e, _.__wbg_ptr);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return J.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_stake_deregistration(_) {
      p(_, j_);
      const r = t.certificate_new_stake_deregistration(_.__wbg_ptr);
      return J.__wrap(r);
    }
    static new_unreg_cert(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, j_), t.certificate_new_unreg_cert(e, _.__wbg_ptr);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return J.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_stake_delegation(_) {
      p(_, Vt);
      const r = t.certificate_new_stake_delegation(_.__wbg_ptr);
      return J.__wrap(r);
    }
    static new_pool_registration(_) {
      p(_, Ut);
      const r = t.certificate_new_pool_registration(_.__wbg_ptr);
      return J.__wrap(r);
    }
    static new_pool_retirement(_) {
      p(_, Et);
      const r = t.certificate_new_pool_retirement(_.__wbg_ptr);
      return J.__wrap(r);
    }
    static new_genesis_key_delegation(_) {
      p(_, qt);
      const r = t.certificate_new_genesis_key_delegation(_.__wbg_ptr);
      return J.__wrap(r);
    }
    static new_move_instantaneous_rewards_cert(_) {
      p(_, Yt);
      const r = t.certificate_new_move_instantaneous_rewards_cert(_.__wbg_ptr);
      return J.__wrap(r);
    }
    static new_committee_hot_auth(_) {
      p(_, xt);
      const r = t.certificate_new_committee_hot_auth(_.__wbg_ptr);
      return J.__wrap(r);
    }
    static new_committee_cold_resign(_) {
      p(_, A_);
      const r = t.certificate_new_committee_cold_resign(_.__wbg_ptr);
      return J.__wrap(r);
    }
    static new_drep_deregistration(_) {
      p(_, Rt);
      const r = t.certificate_new_drep_deregistration(_.__wbg_ptr);
      return J.__wrap(r);
    }
    static new_drep_registration(_) {
      p(_, I_);
      const r = t.certificate_new_drep_registration(_.__wbg_ptr);
      return J.__wrap(r);
    }
    static new_drep_update(_) {
      p(_, D_);
      const r = t.certificate_new_drep_update(_.__wbg_ptr);
      return J.__wrap(r);
    }
    static new_stake_and_vote_delegation(_) {
      p(_, Ct);
      const r = t.certificate_new_stake_and_vote_delegation(_.__wbg_ptr);
      return J.__wrap(r);
    }
    static new_stake_registration_and_delegation(_) {
      p(_, Pt);
      const r = t.certificate_new_stake_registration_and_delegation(_.__wbg_ptr);
      return J.__wrap(r);
    }
    static new_stake_vote_registration_and_delegation(_) {
      p(_, Bt);
      const r = t.certificate_new_stake_vote_registration_and_delegation(_.__wbg_ptr);
      return J.__wrap(r);
    }
    static new_vote_delegation(_) {
      p(_, er);
      const r = t.certificate_new_vote_delegation(_.__wbg_ptr);
      return J.__wrap(r);
    }
    static new_vote_registration_and_delegation(_) {
      p(_, nr);
      const r = t.certificate_new_vote_registration_and_delegation(_.__wbg_ptr);
      return J.__wrap(r);
    }
    kind() {
      return t.certificate_kind(this.__wbg_ptr);
    }
    as_stake_registration() {
      const _ = t.certificate_as_stake_registration(this.__wbg_ptr);
      return _ === 0 ? void 0 : x_.__wrap(_);
    }
    as_reg_cert() {
      const _ = t.certificate_as_reg_cert(this.__wbg_ptr);
      return _ === 0 ? void 0 : x_.__wrap(_);
    }
    as_stake_deregistration() {
      const _ = t.certificate_as_stake_deregistration(this.__wbg_ptr);
      return _ === 0 ? void 0 : j_.__wrap(_);
    }
    as_unreg_cert() {
      const _ = t.certificate_as_unreg_cert(this.__wbg_ptr);
      return _ === 0 ? void 0 : j_.__wrap(_);
    }
    as_stake_delegation() {
      const _ = t.certificate_as_stake_delegation(this.__wbg_ptr);
      return _ === 0 ? void 0 : Vt.__wrap(_);
    }
    as_pool_registration() {
      const _ = t.certificate_as_pool_registration(this.__wbg_ptr);
      return _ === 0 ? void 0 : Ut.__wrap(_);
    }
    as_pool_retirement() {
      const _ = t.certificate_as_pool_retirement(this.__wbg_ptr);
      return _ === 0 ? void 0 : Et.__wrap(_);
    }
    as_genesis_key_delegation() {
      const _ = t.certificate_as_genesis_key_delegation(this.__wbg_ptr);
      return _ === 0 ? void 0 : qt.__wrap(_);
    }
    as_move_instantaneous_rewards_cert() {
      const _ = t.certificate_as_move_instantaneous_rewards_cert(this.__wbg_ptr);
      return _ === 0 ? void 0 : Yt.__wrap(_);
    }
    as_committee_hot_auth() {
      const _ = t.certificate_as_committee_hot_auth(this.__wbg_ptr);
      return _ === 0 ? void 0 : xt.__wrap(_);
    }
    as_committee_cold_resign() {
      const _ = t.certificate_as_committee_cold_resign(this.__wbg_ptr);
      return _ === 0 ? void 0 : A_.__wrap(_);
    }
    as_drep_deregistration() {
      const _ = t.certificate_as_drep_deregistration(this.__wbg_ptr);
      return _ === 0 ? void 0 : Rt.__wrap(_);
    }
    as_drep_registration() {
      const _ = t.certificate_as_drep_registration(this.__wbg_ptr);
      return _ === 0 ? void 0 : I_.__wrap(_);
    }
    as_drep_update() {
      const _ = t.certificate_as_drep_update(this.__wbg_ptr);
      return _ === 0 ? void 0 : D_.__wrap(_);
    }
    as_stake_and_vote_delegation() {
      const _ = t.certificate_as_stake_and_vote_delegation(this.__wbg_ptr);
      return _ === 0 ? void 0 : Ct.__wrap(_);
    }
    as_stake_registration_and_delegation() {
      const _ = t.certificate_as_stake_registration_and_delegation(this.__wbg_ptr);
      return _ === 0 ? void 0 : Pt.__wrap(_);
    }
    as_stake_vote_registration_and_delegation() {
      const _ = t.certificate_as_stake_vote_registration_and_delegation(this.__wbg_ptr);
      return _ === 0 ? void 0 : Bt.__wrap(_);
    }
    as_vote_delegation() {
      const _ = t.certificate_as_vote_delegation(this.__wbg_ptr);
      return _ === 0 ? void 0 : er.__wrap(_);
    }
    as_vote_registration_and_delegation() {
      const _ = t.certificate_as_vote_registration_and_delegation(this.__wbg_ptr);
      return _ === 0 ? void 0 : nr.__wrap(_);
    }
    has_required_script_witness() {
      return t.certificate_has_required_script_witness(this.__wbg_ptr) !== 0;
    }
  };
  const Ee = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_certificates_free(w >>> 0));
  E_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(E_.prototype);
      return r.__wbg_ptr = _, Ee.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ee.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_certificates_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.certificates_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.certificates_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return E_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.certificates_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.certificates_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return E_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.certificates_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.certificates_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.certificates_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return E_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.certificates_new();
      return E_.__wrap(_);
    }
    len() {
      return t.certificates_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.certificates_get(this.__wbg_ptr, _);
      return J.__wrap(r);
    }
    add(_) {
      return p(_, J), t.certificates_add(this.__wbg_ptr, _.__wbg_ptr) !== 0;
    }
  };
  const Ke = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_certificatesbuilder_free(w >>> 0));
  ne = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(ne.prototype);
      return r.__wbg_ptr = _, Ke.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ke.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_certificatesbuilder_free(_);
    }
    static new() {
      const _ = t.certificatesbuilder_new();
      return ne.__wrap(_);
    }
    add(_) {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, J), t.certificatesbuilder_add(n, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[n / 4 + 0], o = a()[n / 4 + 1];
        if (o) throw d(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_with_plutus_witness(_, r) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, J), p(r, B), t.certificatesbuilder_add_with_plutus_witness(e, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        if (n) throw d(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_with_native_script(_, r) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, J), p(r, G_), t.certificatesbuilder_add_with_native_script(e, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        if (n) throw d(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_plutus_witnesses() {
      const _ = t.certificatesbuilder_get_plutus_witnesses(this.__wbg_ptr);
      return H_.__wrap(_);
    }
    get_ref_inputs() {
      const _ = t.certificatesbuilder_get_ref_inputs(this.__wbg_ptr);
      return K.__wrap(_);
    }
    get_native_scripts() {
      const _ = t.certificatesbuilder_get_native_scripts(this.__wbg_ptr);
      return U.__wrap(_);
    }
    get_certificates_refund(_, r) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, h), p(r, h), t.certificatesbuilder_get_certificates_refund(s, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
        var o = a()[s / 4 + 0], n = a()[s / 4 + 1], e = a()[s / 4 + 2];
        if (e) throw d(n);
        return F.__wrap(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_certificates_deposit(_, r) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, h), p(r, h), t.certificatesbuilder_get_certificates_deposit(s, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
        var o = a()[s / 4 + 0], n = a()[s / 4 + 1], e = a()[s / 4 + 2];
        if (e) throw d(n);
        return h.__wrap(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    has_plutus_scripts() {
      return t.certificatesbuilder_has_plutus_scripts(this.__wbg_ptr) !== 0;
    }
    build() {
      const _ = t.certificatesbuilder_build(this.__wbg_ptr);
      return E_.__wrap(_);
    }
  };
  const Se = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_changeconfig_free(w >>> 0));
  jt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(jt.prototype);
      return r.__wbg_ptr = _, Se.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Se.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_changeconfig_free(_);
    }
    static new(_) {
      p(_, $);
      const r = t.changeconfig_new(_.__wbg_ptr);
      return jt.__wrap(r);
    }
    change_address(_) {
      p(_, $);
      const r = t.changeconfig_change_address(this.__wbg_ptr, _.__wbg_ptr);
      return jt.__wrap(r);
    }
    change_plutus_data(_) {
      p(_, $r);
      const r = t.changeconfig_change_plutus_data(this.__wbg_ptr, _.__wbg_ptr);
      return jt.__wrap(r);
    }
    change_script_ref(_) {
      p(_, k_);
      const r = t.changeconfig_change_script_ref(this.__wbg_ptr, _.__wbg_ptr);
      return jt.__wrap(r);
    }
  };
  const We = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_committee_free(w >>> 0));
  ot = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(ot.prototype);
      return r.__wbg_ptr = _, We.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, We.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_committee_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.committee_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.committee_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ot.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.committee_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.committee_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ot.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.committee_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.committee_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.committee_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ot.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_) {
      p(_, m);
      const r = t.committee_new(_.__wbg_ptr);
      return ot.__wrap(r);
    }
    members_keys() {
      const _ = t.committee_members_keys(this.__wbg_ptr);
      return z_.__wrap(_);
    }
    quorum_threshold() {
      const _ = t.committee_quorum_threshold(this.__wbg_ptr);
      return m.__wrap(_);
    }
    add_member(_, r) {
      p(_, k), t.committee_add_member(this.__wbg_ptr, _.__wbg_ptr, r);
    }
    get_member_epoch(_) {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, k), t.committee_get_member_epoch(n, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[n / 4 + 0], o = a()[n / 4 + 1];
        return r === 0 ? void 0 : o >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Me = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_committeecoldresign_free(w >>> 0));
  A_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(A_.prototype);
      return r.__wbg_ptr = _, Me.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Me.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_committeecoldresign_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.committeecoldresign_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.committeecoldresign_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return A_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.committeecoldresign_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.committeecoldresign_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return A_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.committeecoldresign_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.committeecoldresign_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.committeecoldresign_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return A_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    committee_cold_credential() {
      const _ = t.committeecoldresign_committee_cold_credential(this.__wbg_ptr);
      return k.__wrap(_);
    }
    anchor() {
      const _ = t.committeecoldresign_anchor(this.__wbg_ptr);
      return _ === 0 ? void 0 : H.__wrap(_);
    }
    static new(_) {
      p(_, k);
      const r = t.committeecoldresign_new(_.__wbg_ptr);
      return A_.__wrap(r);
    }
    static new_with_anchor(_, r) {
      p(_, k), p(r, H);
      const o = t.committeecoldresign_new_with_anchor(_.__wbg_ptr, r.__wbg_ptr);
      return A_.__wrap(o);
    }
    has_script_credentials() {
      return t.committeecoldresign_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const Ge = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_committeehotauth_free(w >>> 0));
  xt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(xt.prototype);
      return r.__wbg_ptr = _, Ge.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ge.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_committeehotauth_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.committeehotauth_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.committeehotauth_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return xt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.committeehotauth_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.committeehotauth_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return xt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.committeehotauth_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.committeehotauth_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.committeehotauth_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return xt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    committee_cold_credential() {
      const _ = t.committeehotauth_committee_cold_credential(this.__wbg_ptr);
      return k.__wrap(_);
    }
    committee_hot_credential() {
      const _ = t.committeehotauth_committee_hot_credential(this.__wbg_ptr);
      return k.__wrap(_);
    }
    static new(_, r) {
      p(_, k), p(r, k);
      const o = t.committeehotauth_new(_.__wbg_ptr, r.__wbg_ptr);
      return xt.__wrap(o);
    }
    has_script_credentials() {
      return t.committeehotauth_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const He = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_constitution_free(w >>> 0));
  Z_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Z_.prototype);
      return r.__wbg_ptr = _, He.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, He.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_constitution_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.constitution_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.constitution_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Z_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.constitution_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.constitution_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Z_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.constitution_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.constitution_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.constitution_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Z_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    anchor() {
      const _ = t.constitution_anchor(this.__wbg_ptr);
      return H.__wrap(_);
    }
    script_hash() {
      const _ = t.constitution_script_hash(this.__wbg_ptr);
      return _ === 0 ? void 0 : Y.__wrap(_);
    }
    static new(_) {
      p(_, H);
      const r = t.constitution_new(_.__wbg_ptr);
      return Z_.__wrap(r);
    }
    static new_with_script_hash(_, r) {
      p(_, H), p(r, Y);
      const o = t.constitution_new_with_script_hash(_.__wbg_ptr, r.__wbg_ptr);
      return Z_.__wrap(o);
    }
  };
  const Ae = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_constrplutusdata_free(w >>> 0));
  br = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(br.prototype);
      return r.__wbg_ptr = _, Ae.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ae.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_constrplutusdata_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.constrplutusdata_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.constrplutusdata_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return br.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.constrplutusdata_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.constrplutusdata_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return br.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    alternative() {
      const _ = t.constrplutusdata_alternative(this.__wbg_ptr);
      return h.__wrap(_);
    }
    data() {
      const _ = t.constrplutusdata_data(this.__wbg_ptr);
      return i_.__wrap(_);
    }
    static new(_, r) {
      p(_, h), p(r, i_);
      const o = t.constrplutusdata_new(_.__wbg_ptr, r.__wbg_ptr);
      return br.__wrap(o);
    }
  };
  const Ie = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_costmodel_free(w >>> 0));
  it = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(it.prototype);
      return r.__wbg_ptr = _, Ie.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ie.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_costmodel_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.costmodel_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.costmodel_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return it.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.costmodel_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.costmodel_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return it.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.costmodel_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.costmodel_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.costmodel_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return it.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.costmodel_new();
      return it.__wrap(_);
    }
    set(_, r) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16);
        p(r, Q), t.costmodel_set(s, this.__wbg_ptr, _, r.__wbg_ptr);
        var o = a()[s / 4 + 0], n = a()[s / 4 + 1], e = a()[s / 4 + 2];
        if (e) throw d(n);
        return Q.__wrap(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.costmodel_get(e, this.__wbg_ptr, _);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Q.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    len() {
      return t.costmodel_len(this.__wbg_ptr) >>> 0;
    }
  };
  const De = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_costmdls_free(w >>> 0));
  m_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(m_.prototype);
      return r.__wbg_ptr = _, De.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, De.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_costmdls_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.costmdls_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.costmdls_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return m_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.costmdls_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.costmdls_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return m_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.costmdls_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.costmdls_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.costmdls_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return m_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.costmdls_new();
      return m_.__wrap(_);
    }
    len() {
      return t.costmdls_len(this.__wbg_ptr) >>> 0;
    }
    insert(_, r) {
      p(_, I), p(r, it);
      const o = t.costmdls_insert(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
      return o === 0 ? void 0 : it.__wrap(o);
    }
    get(_) {
      p(_, I);
      const r = t.costmdls_get(this.__wbg_ptr, _.__wbg_ptr);
      return r === 0 ? void 0 : it.__wrap(r);
    }
    keys() {
      const _ = t.costmdls_keys(this.__wbg_ptr);
      return Or.__wrap(_);
    }
    retain_language_versions(_) {
      p(_, Or);
      const r = t.costmdls_retain_language_versions(this.__wbg_ptr, _.__wbg_ptr);
      return m_.__wrap(r);
    }
  };
  const Te = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_credential_free(w >>> 0));
  k = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(k.prototype);
      return r.__wbg_ptr = _, Te.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Te.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_credential_free(_);
    }
    static from_keyhash(_) {
      p(_, O);
      const r = t.credential_from_keyhash(_.__wbg_ptr);
      return k.__wrap(r);
    }
    static from_scripthash(_) {
      p(_, Y);
      const r = t.credential_from_scripthash(_.__wbg_ptr);
      return k.__wrap(r);
    }
    to_keyhash() {
      const _ = t.credential_to_keyhash(this.__wbg_ptr);
      return _ === 0 ? void 0 : O.__wrap(_);
    }
    to_scripthash() {
      const _ = t.credential_to_scripthash(this.__wbg_ptr);
      return _ === 0 ? void 0 : Y.__wrap(_);
    }
    kind() {
      return t.credential_kind(this.__wbg_ptr);
    }
    has_script_hash() {
      return t.credential_has_script_hash(this.__wbg_ptr) !== 0;
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.credential_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.credential_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return k.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.credential_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.credential_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return k.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.credential_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.credential_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.credential_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return k.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Ne = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_credentials_free(w >>> 0));
  z_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(z_.prototype);
      return r.__wbg_ptr = _, Ne.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ne.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_credentials_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.credentials_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.credentials_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return z_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.credentials_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.credentials_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return z_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.credentials_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.credentials_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.credentials_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return z_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.credentials_new();
      return z_.__wrap(_);
    }
    len() {
      return t.credentials_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.credentials_get(this.__wbg_ptr, _);
      return k.__wrap(r);
    }
    add(_) {
      return p(_, k), t.credentials_add(this.__wbg_ptr, _.__wbg_ptr) !== 0;
    }
  };
  const Ce = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_dnsrecordaoraaaa_free(w >>> 0));
  zt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(zt.prototype);
      return r.__wbg_ptr = _, Ce.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ce.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_dnsrecordaoraaaa_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.dnsrecordaoraaaa_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.dnsrecordaoraaaa_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return zt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.dnsrecordaoraaaa_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.dnsrecordaoraaaa_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return zt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.dnsrecordaoraaaa_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.dnsrecordaoraaaa_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.dnsrecordaoraaaa_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return zt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.dnsrecordaoraaaa_new(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return zt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    record() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.dnsrecordaoraaaa_record(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
  };
  const Ve = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_dnsrecordsrv_free(w >>> 0));
  Ft = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Ft.prototype);
      return r.__wbg_ptr = _, Ve.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ve.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_dnsrecordsrv_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.dnsrecordsrv_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.dnsrecordsrv_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Ft.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.dnsrecordsrv_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.dnsrecordsrv_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Ft.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.dnsrecordaoraaaa_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.dnsrecordaoraaaa_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.dnsrecordsrv_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Ft.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.dnsrecordsrv_new(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Ft.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    record() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.dnsrecordaoraaaa_record(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
  };
  const Pe = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_drep_free(w >>> 0));
  G = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(G.prototype);
      return r.__wbg_ptr = _, Pe.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Pe.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_drep_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.drep_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.drep_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return G.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.drep_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.drep_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return G.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.drep_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.drep_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.drep_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return G.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_key_hash(_) {
      p(_, O);
      const r = t.drep_new_key_hash(_.__wbg_ptr);
      return G.__wrap(r);
    }
    static new_script_hash(_) {
      p(_, Y);
      const r = t.drep_new_script_hash(_.__wbg_ptr);
      return G.__wrap(r);
    }
    static new_always_abstain() {
      const _ = t.drep_new_always_abstain();
      return G.__wrap(_);
    }
    static new_always_no_confidence() {
      const _ = t.drep_new_always_no_confidence();
      return G.__wrap(_);
    }
    static new_from_credential(_) {
      p(_, k);
      const r = t.drep_new_from_credential(_.__wbg_ptr);
      return G.__wrap(r);
    }
    kind() {
      return t.drep_kind(this.__wbg_ptr);
    }
    to_key_hash() {
      const _ = t.drep_to_key_hash(this.__wbg_ptr);
      return _ === 0 ? void 0 : O.__wrap(_);
    }
    to_script_hash() {
      const _ = t.drep_to_script_hash(this.__wbg_ptr);
      return _ === 0 ? void 0 : Y.__wrap(_);
    }
    to_bech32(_) {
      let r, o;
      try {
        const v = t.__wbindgen_add_to_stack_pointer(-16);
        t.drep_to_bech32(v, this.__wbg_ptr, _);
        var n = a()[v / 4 + 0], e = a()[v / 4 + 1], s = a()[v / 4 + 2], i = a()[v / 4 + 3], g = n, c = e;
        if (i) throw g = 0, c = 0, d(s);
        return r = g, o = c, f(g, c);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.drep_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return G.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Be = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_drepderegistration_free(w >>> 0));
  Rt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Rt.prototype);
      return r.__wbg_ptr = _, Be.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Be.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_drepderegistration_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.drepderegistration_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.drepderegistration_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Rt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.drepderegistration_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.drepderegistration_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Rt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.drepderegistration_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.drepderegistration_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.drepderegistration_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Rt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    voting_credential() {
      const _ = t.drepderegistration_voting_credential(this.__wbg_ptr);
      return k.__wrap(_);
    }
    coin() {
      const _ = t.drepderegistration_coin(this.__wbg_ptr);
      return h.__wrap(_);
    }
    static new(_, r) {
      p(_, k), p(r, h);
      const o = t.drepderegistration_new(_.__wbg_ptr, r.__wbg_ptr);
      return Rt.__wrap(o);
    }
    has_script_credentials() {
      return t.drepderegistration_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const _n = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_drepregistration_free(w >>> 0));
  I_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(I_.prototype);
      return r.__wbg_ptr = _, _n.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, _n.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_drepregistration_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.drepregistration_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.drepregistration_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return I_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.drepregistration_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.drepregistration_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return I_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.drepregistration_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.drepregistration_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.drepregistration_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return I_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    voting_credential() {
      const _ = t.drepregistration_voting_credential(this.__wbg_ptr);
      return k.__wrap(_);
    }
    coin() {
      const _ = t.drepregistration_coin(this.__wbg_ptr);
      return h.__wrap(_);
    }
    anchor() {
      const _ = t.drepregistration_anchor(this.__wbg_ptr);
      return _ === 0 ? void 0 : H.__wrap(_);
    }
    static new(_, r) {
      p(_, k), p(r, h);
      const o = t.drepregistration_new(_.__wbg_ptr, r.__wbg_ptr);
      return I_.__wrap(o);
    }
    static new_with_anchor(_, r, o) {
      p(_, k), p(r, h), p(o, H);
      const n = t.drepregistration_new_with_anchor(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
      return I_.__wrap(n);
    }
    has_script_credentials() {
      return t.drepregistration_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const tn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_drepupdate_free(w >>> 0));
  D_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(D_.prototype);
      return r.__wbg_ptr = _, tn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, tn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_drepupdate_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.drepupdate_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.drepupdate_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return D_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.drepupdate_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.drepupdate_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return D_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.drepupdate_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.drepupdate_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.drepupdate_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return D_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    voting_credential() {
      const _ = t.drepupdate_voting_credential(this.__wbg_ptr);
      return k.__wrap(_);
    }
    anchor() {
      const _ = t.drepupdate_anchor(this.__wbg_ptr);
      return _ === 0 ? void 0 : H.__wrap(_);
    }
    static new(_) {
      p(_, k);
      const r = t.drepupdate_new(_.__wbg_ptr);
      return D_.__wrap(r);
    }
    static new_with_anchor(_, r) {
      p(_, k), p(r, H);
      const o = t.drepupdate_new_with_anchor(_.__wbg_ptr, r.__wbg_ptr);
      return D_.__wrap(o);
    }
    has_script_credentials() {
      return t.drepupdate_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const rn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_drepvotingthresholds_free(w >>> 0));
  Ot = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Ot.prototype);
      return r.__wbg_ptr = _, rn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, rn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_drepvotingthresholds_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.drepvotingthresholds_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.drepvotingthresholds_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Ot.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.drepvotingthresholds_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.drepvotingthresholds_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Ot.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.drepvotingthresholds_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.drepvotingthresholds_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.drepvotingthresholds_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Ot.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_, r, o, n, e, s, i, g, c, v) {
      p(_, m), p(r, m), p(o, m), p(n, m), p(e, m), p(s, m), p(i, m), p(g, m), p(c, m), p(v, m);
      const j = t.drepvotingthresholds_new(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr, n.__wbg_ptr, e.__wbg_ptr, s.__wbg_ptr, i.__wbg_ptr, g.__wbg_ptr, c.__wbg_ptr, v.__wbg_ptr);
      return Ot.__wrap(j);
    }
    set_motion_no_confidence(_) {
      p(_, m), t.drepvotingthresholds_set_motion_no_confidence(this.__wbg_ptr, _.__wbg_ptr);
    }
    set_committee_normal(_) {
      p(_, m), t.drepvotingthresholds_set_committee_normal(this.__wbg_ptr, _.__wbg_ptr);
    }
    set_committee_no_confidence(_) {
      p(_, m), t.drepvotingthresholds_set_committee_no_confidence(this.__wbg_ptr, _.__wbg_ptr);
    }
    set_update_constitution(_) {
      p(_, m), t.drepvotingthresholds_set_update_constitution(this.__wbg_ptr, _.__wbg_ptr);
    }
    set_hard_fork_initiation(_) {
      p(_, m), t.drepvotingthresholds_set_hard_fork_initiation(this.__wbg_ptr, _.__wbg_ptr);
    }
    set_pp_network_group(_) {
      p(_, m), t.drepvotingthresholds_set_pp_network_group(this.__wbg_ptr, _.__wbg_ptr);
    }
    set_pp_economic_group(_) {
      p(_, m), t.drepvotingthresholds_set_pp_economic_group(this.__wbg_ptr, _.__wbg_ptr);
    }
    set_pp_technical_group(_) {
      p(_, m), t.drepvotingthresholds_set_pp_technical_group(this.__wbg_ptr, _.__wbg_ptr);
    }
    set_pp_governance_group(_) {
      p(_, m), t.drepvotingthresholds_set_pp_governance_group(this.__wbg_ptr, _.__wbg_ptr);
    }
    set_treasury_withdrawal(_) {
      p(_, m), t.drepvotingthresholds_set_treasury_withdrawal(this.__wbg_ptr, _.__wbg_ptr);
    }
    motion_no_confidence() {
      const _ = t.drepvotingthresholds_motion_no_confidence(this.__wbg_ptr);
      return m.__wrap(_);
    }
    committee_normal() {
      const _ = t.drepvotingthresholds_committee_normal(this.__wbg_ptr);
      return m.__wrap(_);
    }
    committee_no_confidence() {
      const _ = t.drepvotingthresholds_committee_no_confidence(this.__wbg_ptr);
      return m.__wrap(_);
    }
    update_constitution() {
      const _ = t.drepvotingthresholds_update_constitution(this.__wbg_ptr);
      return m.__wrap(_);
    }
    hard_fork_initiation() {
      const _ = t.drepvotingthresholds_hard_fork_initiation(this.__wbg_ptr);
      return m.__wrap(_);
    }
    pp_network_group() {
      const _ = t.drepvotingthresholds_pp_network_group(this.__wbg_ptr);
      return m.__wrap(_);
    }
    pp_economic_group() {
      const _ = t.drepvotingthresholds_pp_economic_group(this.__wbg_ptr);
      return m.__wrap(_);
    }
    pp_technical_group() {
      const _ = t.drepvotingthresholds_pp_technical_group(this.__wbg_ptr);
      return m.__wrap(_);
    }
    pp_governance_group() {
      const _ = t.drepvotingthresholds_pp_governance_group(this.__wbg_ptr);
      return m.__wrap(_);
    }
    treasury_withdrawal() {
      const _ = t.drepvotingthresholds_treasury_withdrawal(this.__wbg_ptr);
      return m.__wrap(_);
    }
  };
  const en = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_datacost_free(w >>> 0));
  Mr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Mr.prototype);
      return r.__wbg_ptr = _, en.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, en.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_datacost_free(_);
    }
    static new_coins_per_byte(_) {
      p(_, h);
      const r = t.datacost_new_coins_per_byte(_.__wbg_ptr);
      return Mr.__wrap(r);
    }
    coins_per_byte() {
      const _ = t.datacost_coins_per_byte(this.__wbg_ptr);
      return h.__wrap(_);
    }
  };
  const nn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_datahash_free(w >>> 0));
  J_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(J_.prototype);
      return r.__wbg_ptr = _, nn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, nn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_datahash_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.datahash_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return J_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(_) {
      let r, o;
      try {
        const v = t.__wbindgen_add_to_stack_pointer(-16), j = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), x = b;
        t.anchordatahash_to_bech32(v, this.__wbg_ptr, j, x);
        var n = a()[v / 4 + 0], e = a()[v / 4 + 1], s = a()[v / 4 + 2], i = a()[v / 4 + 3], g = n, c = e;
        if (i) throw g = 0, c = 0, d(s);
        return r = g, o = c, f(g, c);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.datahash_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return J_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.datahash_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return J_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const an = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_datumsource_free(w >>> 0));
  Ur = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Ur.prototype);
      return r.__wbg_ptr = _, an.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, an.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_datumsource_free(_);
    }
    static new(_) {
      p(_, R);
      const r = t.datumsource_new(_.__wbg_ptr);
      return Ur.__wrap(r);
    }
    static new_ref_input(_) {
      p(_, X);
      const r = t.datumsource_new_ref_input(_.__wbg_ptr);
      return Ur.__wrap(r);
    }
  };
  const on = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_ed25519keyhash_free(w >>> 0));
  O = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(O.prototype);
      return r.__wbg_ptr = _, on.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, on.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_ed25519keyhash_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.ed25519keyhash_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return O.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.ed25519keyhash_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(_) {
      let r, o;
      try {
        const v = t.__wbindgen_add_to_stack_pointer(-16), j = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), x = b;
        t.ed25519keyhash_to_bech32(v, this.__wbg_ptr, j, x);
        var n = a()[v / 4 + 0], e = a()[v / 4 + 1], s = a()[v / 4 + 2], i = a()[v / 4 + 3], g = n, c = e;
        if (i) throw g = 0, c = 0, d(s);
        return r = g, o = c, f(g, c);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.ed25519keyhash_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return O.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.ed25519keyhash_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.ed25519keyhash_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return O.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const sn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_ed25519keyhashes_free(w >>> 0));
  V = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(V.prototype);
      return r.__wbg_ptr = _, sn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, sn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_ed25519keyhashes_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.ed25519keyhashes_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.ed25519keyhashes_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return V.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.ed25519keyhashes_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.ed25519keyhashes_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return V.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.ed25519keyhashes_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.ed25519keyhashes_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.ed25519keyhashes_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return V.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.ed25519keyhashes_new();
      return V.__wrap(_);
    }
    len() {
      return t.ed25519keyhashes_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.ed25519keyhashes_get(this.__wbg_ptr, _);
      return O.__wrap(r);
    }
    add(_) {
      return p(_, O), t.ed25519keyhashes_add(this.__wbg_ptr, _.__wbg_ptr) !== 0;
    }
    contains(_) {
      return p(_, O), t.ed25519keyhashes_contains(this.__wbg_ptr, _.__wbg_ptr) !== 0;
    }
    to_option() {
      const _ = t.ed25519keyhashes_to_option(this.__wbg_ptr);
      return _ === 0 ? void 0 : V.__wrap(_);
    }
  };
  const dn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_ed25519signature_free(w >>> 0));
  c_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(c_.prototype);
      return r.__wbg_ptr = _, dn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, dn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_ed25519signature_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.ed25519signature_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.ed25519signature_to_bech32(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.ed25519signature_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.ed25519signature_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return c_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.ed25519signature_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return c_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.ed25519signature_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return c_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const cn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_enterpriseaddress_free(w >>> 0));
  te = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(te.prototype);
      return r.__wbg_ptr = _, cn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, cn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_enterpriseaddress_free(_);
    }
    static new(_, r) {
      p(r, k);
      const o = t.enterpriseaddress_new(_, r.__wbg_ptr);
      return te.__wrap(o);
    }
    payment_cred() {
      const _ = t.baseaddress_payment_cred(this.__wbg_ptr);
      return k.__wrap(_);
    }
    to_address() {
      const _ = t.enterpriseaddress_to_address(this.__wbg_ptr);
      return $.__wrap(_);
    }
    static from_address(_) {
      p(_, $);
      const r = t.enterpriseaddress_from_address(_.__wbg_ptr);
      return r === 0 ? void 0 : te.__wrap(r);
    }
    network_id() {
      return t.enterpriseaddress_network_id(this.__wbg_ptr);
    }
  };
  const pn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_exunitprices_free(w >>> 0));
  F_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(F_.prototype);
      return r.__wbg_ptr = _, pn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, pn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_exunitprices_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.exunitprices_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.exunitprices_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return F_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.exunitprices_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.exunitprices_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return F_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.exunitprices_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.exunitprices_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.exunitprices_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return F_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    mem_price() {
      const _ = t.drepvotingthresholds_motion_no_confidence(this.__wbg_ptr);
      return m.__wrap(_);
    }
    step_price() {
      const _ = t.drepvotingthresholds_committee_normal(this.__wbg_ptr);
      return m.__wrap(_);
    }
    static new(_, r) {
      p(_, m), p(r, m);
      const o = t.exunitprices_new(_.__wbg_ptr, r.__wbg_ptr);
      return F_.__wrap(o);
    }
  };
  const wn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_exunits_free(w >>> 0));
  e_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(e_.prototype);
      return r.__wbg_ptr = _, wn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, wn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_exunits_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.exunits_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.exunits_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return e_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.exunits_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.exunits_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return e_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.exunits_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.exunits_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.exunits_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return e_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    mem() {
      const _ = t.exunits_mem(this.__wbg_ptr);
      return h.__wrap(_);
    }
    steps() {
      const _ = t.exunits_steps(this.__wbg_ptr);
      return h.__wrap(_);
    }
    static new(_, r) {
      p(_, h), p(r, h);
      const o = t.exunits_new(_.__wbg_ptr, r.__wbg_ptr);
      return e_.__wrap(o);
    }
  };
  const gn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_fixedblock_free(w >>> 0));
  Er = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Er.prototype);
      return r.__wbg_ptr = _, gn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, gn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_fixedblock_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.fixedblock_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Er.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.fixedblock_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Er.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    header() {
      const _ = t.fixedblock_header(this.__wbg_ptr);
      return dt.__wrap(_);
    }
    transaction_bodies() {
      const _ = t.fixedblock_transaction_bodies(this.__wbg_ptr);
      return xr.__wrap(_);
    }
    transaction_witness_sets() {
      const _ = t.fixedblock_transaction_witness_sets(this.__wbg_ptr);
      return gt.__wrap(_);
    }
    auxiliary_data_set() {
      const _ = t.fixedblock_auxiliary_data_set(this.__wbg_ptr);
      return Yr.__wrap(_);
    }
    invalid_transactions() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.fixedblock_invalid_transactions(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = de(_, r).slice();
        return t.__wbindgen_free(_, r * 4, 4), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    block_hash() {
      const _ = t.fixedblock_block_hash(this.__wbg_ptr);
      return w_.__wrap(_);
    }
  };
  const bn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_fixedtransaction_free(w >>> 0));
  dr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(dr.prototype);
      return r.__wbg_ptr = _, bn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, bn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_fixedtransaction_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.fixedtransaction_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.fixedtransaction_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return dr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.fixedtransaction_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.fixedtransaction_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return dr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_, r, o) {
      try {
        const i = t.__wbindgen_add_to_stack_pointer(-16), g = u(_, t.__wbindgen_malloc), c = b, v = u(r, t.__wbindgen_malloc), j = b;
        t.fixedtransaction_new(i, g, c, v, j, o);
        var n = a()[i / 4 + 0], e = a()[i / 4 + 1], s = a()[i / 4 + 2];
        if (s) throw d(e);
        return dr.__wrap(n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_with_auxiliary(_, r, o, n) {
      try {
        const g = t.__wbindgen_add_to_stack_pointer(-16), c = u(_, t.__wbindgen_malloc), v = b, j = u(r, t.__wbindgen_malloc), x = b, Qr = u(o, t.__wbindgen_malloc), Xr = b;
        t.fixedtransaction_new_with_auxiliary(g, c, v, j, x, Qr, Xr, n);
        var e = a()[g / 4 + 0], s = a()[g / 4 + 1], i = a()[g / 4 + 2];
        if (i) throw d(s);
        return dr.__wrap(e);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_from_body_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.fixedtransaction_new_from_body_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return dr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    body() {
      const _ = t.fixedtransaction_body(this.__wbg_ptr);
      return C.__wrap(_);
    }
    raw_body() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.fixedtransaction_raw_body(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_body(_) {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16), e = u(_, t.__wbindgen_malloc), s = b;
        t.fixedtransaction_set_body(n, this.__wbg_ptr, e, s);
        var r = a()[n / 4 + 0], o = a()[n / 4 + 1];
        if (o) throw d(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_witness_set(_) {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16), e = u(_, t.__wbindgen_malloc), s = b;
        t.fixedtransaction_set_witness_set(n, this.__wbg_ptr, e, s);
        var r = a()[n / 4 + 0], o = a()[n / 4 + 1];
        if (o) throw d(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    witness_set() {
      const _ = t.fixedtransaction_witness_set(this.__wbg_ptr);
      return u_.__wrap(_);
    }
    raw_witness_set() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.fixedtransaction_raw_witness_set(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_is_valid(_) {
      t.fixedtransaction_set_is_valid(this.__wbg_ptr, _);
    }
    is_valid() {
      return t.fixedtransaction_is_valid(this.__wbg_ptr) !== 0;
    }
    set_auxiliary_data(_) {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16), e = u(_, t.__wbindgen_malloc), s = b;
        t.fixedtransaction_set_auxiliary_data(n, this.__wbg_ptr, e, s);
        var r = a()[n / 4 + 0], o = a()[n / 4 + 1];
        if (o) throw d(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    auxiliary_data() {
      const _ = t.fixedtransaction_auxiliary_data(this.__wbg_ptr);
      return _ === 0 ? void 0 : P.__wrap(_);
    }
    raw_auxiliary_data() {
      try {
        const o = t.__wbindgen_add_to_stack_pointer(-16);
        t.fixedtransaction_raw_auxiliary_data(o, this.__wbg_ptr);
        var _ = a()[o / 4 + 0], r = a()[o / 4 + 1];
        let n;
        return _ !== 0 && (n = y(_, r).slice(), t.__wbindgen_free(_, r * 1, 1)), n;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    transaction_hash() {
      const _ = t.fixedtransaction_transaction_hash(this.__wbg_ptr);
      return s_.__wrap(_);
    }
    add_vkey_witness(_) {
      p(_, $_), t.fixedtransaction_add_vkey_witness(this.__wbg_ptr, _.__wbg_ptr);
    }
    add_bootstrap_witness(_) {
      p(_, l_), t.fixedtransaction_add_bootstrap_witness(this.__wbg_ptr, _.__wbg_ptr);
    }
    sign_and_add_vkey_signature(_) {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, v_), t.fixedtransaction_sign_and_add_vkey_signature(n, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[n / 4 + 0], o = a()[n / 4 + 1];
        if (o) throw d(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    sign_and_add_icarus_bootstrap_signature(_, r) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, f_), p(r, h_), t.fixedtransaction_sign_and_add_icarus_bootstrap_signature(e, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        if (n) throw d(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    sign_and_add_daedalus_bootstrap_signature(_, r) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, f_), p(r, Ar), t.fixedtransaction_sign_and_add_daedalus_bootstrap_signature(e, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        if (n) throw d(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const ln = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_fixedtransactionbodies_free(w >>> 0));
  xr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(xr.prototype);
      return r.__wbg_ptr = _, ln.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ln.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_fixedtransactionbodies_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.fixedtransactionbodies_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return xr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.fixedtransactionbodies_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return xr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.fixedtransactionbodies_new();
      return xr.__wrap(_);
    }
    len() {
      return t.fixedtransactionbodies_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.fixedtransactionbodies_get(this.__wbg_ptr, _);
      return Rr.__wrap(r);
    }
    add(_) {
      p(_, Rr), t.fixedtransactionbodies_add(this.__wbg_ptr, _.__wbg_ptr);
    }
  };
  const fn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_fixedtransactionbody_free(w >>> 0));
  Rr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Rr.prototype);
      return r.__wbg_ptr = _, fn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, fn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_fixedtransactionbody_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.fixedtransactionbody_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Rr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.fixedtransactionbody_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Rr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    transaction_body() {
      const _ = t.fixedtransaction_body(this.__wbg_ptr);
      return C.__wrap(_);
    }
    tx_hash() {
      const _ = t.fixedtransactionbody_tx_hash(this.__wbg_ptr);
      return s_.__wrap(_);
    }
    original_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.fixedtransactionbody_original_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const un = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_fixedtxwitnessesset_free(w >>> 0));
  pe = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(pe.prototype);
      return r.__wbg_ptr = _, un.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, un.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_fixedtxwitnessesset_free(_);
    }
    tx_witnesses_set() {
      const _ = t.fixedtxwitnessesset_tx_witnesses_set(this.__wbg_ptr);
      return u_.__wrap(_);
    }
    add_vkey_witness(_) {
      p(_, $_), t.fixedtxwitnessesset_add_vkey_witness(this.__wbg_ptr, _.__wbg_ptr);
    }
    add_bootstrap_witness(_) {
      p(_, l_), t.fixedtxwitnessesset_add_bootstrap_witness(this.__wbg_ptr, _.__wbg_ptr);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.fixedtxwitnessesset_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.fixedtxwitnessesset_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return pe.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const hn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_fixedversionedblock_free(w >>> 0));
  re = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(re.prototype);
      return r.__wbg_ptr = _, hn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, hn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_fixedversionedblock_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.fixedversionedblock_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return re.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.fixedversionedblock_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return re.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    block() {
      const _ = t.fixedversionedblock_block(this.__wbg_ptr);
      return Er.__wrap(_);
    }
    era() {
      return t.fixedversionedblock_era(this.__wbg_ptr);
    }
  };
  const yn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_generaltransactionmetadata_free(w >>> 0));
  st = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(st.prototype);
      return r.__wbg_ptr = _, yn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, yn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_generaltransactionmetadata_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.generaltransactionmetadata_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.generaltransactionmetadata_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return st.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.generaltransactionmetadata_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.generaltransactionmetadata_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return st.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.generaltransactionmetadata_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.generaltransactionmetadata_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.generaltransactionmetadata_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return st.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.generaltransactionmetadata_new();
      return st.__wrap(_);
    }
    len() {
      return t.generaltransactionmetadata_len(this.__wbg_ptr) >>> 0;
    }
    insert(_, r) {
      p(_, h), p(r, L);
      const o = t.generaltransactionmetadata_insert(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
      return o === 0 ? void 0 : L.__wrap(o);
    }
    get(_) {
      p(_, h);
      const r = t.generaltransactionmetadata_get(this.__wbg_ptr, _.__wbg_ptr);
      return r === 0 ? void 0 : L.__wrap(r);
    }
    keys() {
      const _ = t.generaltransactionmetadata_keys(this.__wbg_ptr);
      return zr.__wrap(_);
    }
  };
  const vn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_genesisdelegatehash_free(w >>> 0));
  lr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(lr.prototype);
      return r.__wbg_ptr = _, vn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, vn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_genesisdelegatehash_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.genesisdelegatehash_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return lr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.ed25519keyhash_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(_) {
      let r, o;
      try {
        const v = t.__wbindgen_add_to_stack_pointer(-16), j = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), x = b;
        t.ed25519keyhash_to_bech32(v, this.__wbg_ptr, j, x);
        var n = a()[v / 4 + 0], e = a()[v / 4 + 1], s = a()[v / 4 + 2], i = a()[v / 4 + 3], g = n, c = e;
        if (i) throw g = 0, c = 0, d(s);
        return r = g, o = c, f(g, c);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.genesisdelegatehash_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return lr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.ed25519keyhash_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.genesisdelegatehash_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return lr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const mn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_genesishash_free(w >>> 0));
  Y_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Y_.prototype);
      return r.__wbg_ptr = _, mn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, mn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_genesishash_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.genesishash_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Y_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.ed25519keyhash_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(_) {
      let r, o;
      try {
        const v = t.__wbindgen_add_to_stack_pointer(-16), j = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), x = b;
        t.ed25519keyhash_to_bech32(v, this.__wbg_ptr, j, x);
        var n = a()[v / 4 + 0], e = a()[v / 4 + 1], s = a()[v / 4 + 2], i = a()[v / 4 + 3], g = n, c = e;
        if (i) throw g = 0, c = 0, d(s);
        return r = g, o = c, f(g, c);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.genesishash_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Y_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.ed25519keyhash_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.genesishash_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Y_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const kn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_genesishashes_free(w >>> 0));
  pr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(pr.prototype);
      return r.__wbg_ptr = _, kn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, kn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_genesishashes_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.genesishashes_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.genesishashes_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return pr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.genesishashes_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.genesishashes_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return pr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.genesishashes_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.genesishashes_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.genesishashes_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return pr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.genesishashes_new();
      return pr.__wrap(_);
    }
    len() {
      return t.genesishashes_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.genesishashes_get(this.__wbg_ptr, _);
      return Y_.__wrap(r);
    }
    add(_) {
      p(_, Y_), t.genesishashes_add(this.__wbg_ptr, _.__wbg_ptr);
    }
  };
  const jn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_genesiskeydelegation_free(w >>> 0));
  qt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(qt.prototype);
      return r.__wbg_ptr = _, jn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, jn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_genesiskeydelegation_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.genesiskeydelegation_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.genesiskeydelegation_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return qt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.genesiskeydelegation_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.genesiskeydelegation_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return qt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.genesiskeydelegation_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.genesiskeydelegation_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.genesiskeydelegation_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return qt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    genesishash() {
      const _ = t.genesiskeydelegation_genesishash(this.__wbg_ptr);
      return Y_.__wrap(_);
    }
    genesis_delegate_hash() {
      const _ = t.genesiskeydelegation_genesis_delegate_hash(this.__wbg_ptr);
      return lr.__wrap(_);
    }
    vrf_keyhash() {
      const _ = t.genesiskeydelegation_vrf_keyhash(this.__wbg_ptr);
      return ft.__wrap(_);
    }
    static new(_, r, o) {
      p(_, Y_), p(r, lr), p(o, ft);
      const n = t.genesiskeydelegation_new(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
      return qt.__wrap(n);
    }
  };
  const xn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_governanceaction_free(w >>> 0));
  r_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(r_.prototype);
      return r.__wbg_ptr = _, xn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, xn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_governanceaction_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.governanceaction_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.governanceaction_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return r_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.governanceaction_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.governanceaction_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return r_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.governanceaction_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.governanceaction_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.governanceaction_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return r_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_parameter_change_action(_) {
      p(_, y_);
      const r = t.governanceaction_new_parameter_change_action(_.__wbg_ptr);
      return r_.__wrap(r);
    }
    static new_hard_fork_initiation_action(_) {
      p(_, T_);
      const r = t.governanceaction_new_hard_fork_initiation_action(_.__wbg_ptr);
      return r_.__wrap(r);
    }
    static new_treasury_withdrawals_action(_) {
      p(_, rt);
      const r = t.governanceaction_new_treasury_withdrawals_action(_.__wbg_ptr);
      return r_.__wrap(r);
    }
    static new_no_confidence_action(_) {
      p(_, B_);
      const r = t.governanceaction_new_no_confidence_action(_.__wbg_ptr);
      return r_.__wrap(r);
    }
    static new_new_committee_action(_) {
      p(_, et);
      const r = t.governanceaction_new_new_committee_action(_.__wbg_ptr);
      return r_.__wrap(r);
    }
    static new_new_constitution_action(_) {
      p(_, P_);
      const r = t.governanceaction_new_new_constitution_action(_.__wbg_ptr);
      return r_.__wrap(r);
    }
    static new_info_action(_) {
      p(_, Gr);
      const r = t.governanceaction_new_info_action(_.__wbg_ptr);
      return r_.__wrap(r);
    }
    kind() {
      return t.governanceaction_kind(this.__wbg_ptr);
    }
    as_parameter_change_action() {
      const _ = t.governanceaction_as_parameter_change_action(this.__wbg_ptr);
      return _ === 0 ? void 0 : y_.__wrap(_);
    }
    as_hard_fork_initiation_action() {
      const _ = t.governanceaction_as_hard_fork_initiation_action(this.__wbg_ptr);
      return _ === 0 ? void 0 : T_.__wrap(_);
    }
    as_treasury_withdrawals_action() {
      const _ = t.governanceaction_as_treasury_withdrawals_action(this.__wbg_ptr);
      return _ === 0 ? void 0 : rt.__wrap(_);
    }
    as_no_confidence_action() {
      const _ = t.governanceaction_as_no_confidence_action(this.__wbg_ptr);
      return _ === 0 ? void 0 : B_.__wrap(_);
    }
    as_new_committee_action() {
      const _ = t.governanceaction_as_new_committee_action(this.__wbg_ptr);
      return _ === 0 ? void 0 : et.__wrap(_);
    }
    as_new_constitution_action() {
      const _ = t.governanceaction_as_new_constitution_action(this.__wbg_ptr);
      return _ === 0 ? void 0 : P_.__wrap(_);
    }
    as_info_action() {
      const _ = t.governanceaction_as_info_action(this.__wbg_ptr);
      return _ === 0 ? void 0 : Gr.__wrap(_);
    }
  };
  const zn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_governanceactionid_free(w >>> 0));
  Z = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Z.prototype);
      return r.__wbg_ptr = _, zn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, zn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_governanceactionid_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.governanceactionid_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.governanceactionid_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Z.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.governanceactionid_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.governanceactionid_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Z.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.governanceactionid_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.governanceactionid_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.governanceactionid_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Z.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    transaction_id() {
      const _ = t.governanceactionid_transaction_id(this.__wbg_ptr);
      return s_.__wrap(_);
    }
    index() {
      return t.governanceactionid_index(this.__wbg_ptr) >>> 0;
    }
    static new(_, r) {
      p(_, s_);
      const o = t.governanceactionid_new(_.__wbg_ptr, r);
      return Z.__wrap(o);
    }
  };
  const Fn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_governanceactionids_free(w >>> 0));
  Kr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Kr.prototype);
      return r.__wbg_ptr = _, Fn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Fn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_governanceactionids_free(_);
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.governanceactionids_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.governanceactionids_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.governanceactionids_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Kr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.governanceactionids_new();
      return Kr.__wrap(_);
    }
    add(_) {
      p(_, Z), t.governanceactionids_add(this.__wbg_ptr, _.__wbg_ptr);
    }
    get(_) {
      const r = t.governanceactionids_get(this.__wbg_ptr, _);
      return r === 0 ? void 0 : Z.__wrap(r);
    }
    len() {
      return t.governanceactionids_len(this.__wbg_ptr) >>> 0;
    }
  };
  const Rn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_hardforkinitiationaction_free(w >>> 0));
  T_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(T_.prototype);
      return r.__wbg_ptr = _, Rn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Rn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_hardforkinitiationaction_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.hardforkinitiationaction_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.hardforkinitiationaction_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return T_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.hardforkinitiationaction_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.hardforkinitiationaction_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return T_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.hardforkinitiationaction_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.hardforkinitiationaction_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.hardforkinitiationaction_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return T_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    gov_action_id() {
      const _ = t.hardforkinitiationaction_gov_action_id(this.__wbg_ptr);
      return _ === 0 ? void 0 : Z.__wrap(_);
    }
    protocol_version() {
      const _ = t.hardforkinitiationaction_protocol_version(this.__wbg_ptr);
      return a_.__wrap(_);
    }
    static new(_) {
      p(_, a_);
      const r = t.hardforkinitiationaction_new(_.__wbg_ptr);
      return T_.__wrap(r);
    }
    static new_with_action_id(_, r) {
      p(_, Z), p(r, a_);
      const o = t.hardforkinitiationaction_new_with_action_id(_.__wbg_ptr, r.__wbg_ptr);
      return T_.__wrap(o);
    }
  };
  const On = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_header_free(w >>> 0));
  dt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(dt.prototype);
      return r.__wbg_ptr = _, On.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, On.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_header_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.header_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.header_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return dt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.header_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.header_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return dt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.header_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.header_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.header_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return dt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    header_body() {
      const _ = t.header_header_body(this.__wbg_ptr);
      return N_.__wrap(_);
    }
    body_signature() {
      const _ = t.header_body_signature(this.__wbg_ptr);
      return Hr.__wrap(_);
    }
    static new(_, r) {
      p(_, N_), p(r, Hr);
      const o = t.header_new(_.__wbg_ptr, r.__wbg_ptr);
      return dt.__wrap(o);
    }
  };
  const qn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_headerbody_free(w >>> 0));
  N_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(N_.prototype);
      return r.__wbg_ptr = _, qn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, qn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_headerbody_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.headerbody_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.headerbody_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return N_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.headerbody_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.headerbody_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return N_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.headerbody_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.headerbody_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.headerbody_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return N_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    block_number() {
      return t.headerbody_block_number(this.__wbg_ptr) >>> 0;
    }
    slot() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.headerbody_slot(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return _ >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    slot_bignum() {
      const _ = t.headerbody_slot_bignum(this.__wbg_ptr);
      return h.__wrap(_);
    }
    prev_hash() {
      const _ = t.headerbody_prev_hash(this.__wbg_ptr);
      return _ === 0 ? void 0 : w_.__wrap(_);
    }
    issuer_vkey() {
      const _ = t.headerbody_issuer_vkey(this.__wbg_ptr);
      return __.__wrap(_);
    }
    vrf_vkey() {
      const _ = t.headerbody_vrf_vkey(this.__wbg_ptr);
      return ir.__wrap(_);
    }
    has_nonce_and_leader_vrf() {
      return t.headerbody_has_nonce_and_leader_vrf(this.__wbg_ptr) !== 0;
    }
    nonce_vrf_or_nothing() {
      const _ = t.headerbody_nonce_vrf_or_nothing(this.__wbg_ptr);
      return _ === 0 ? void 0 : q_.__wrap(_);
    }
    leader_vrf_or_nothing() {
      const _ = t.headerbody_leader_vrf_or_nothing(this.__wbg_ptr);
      return _ === 0 ? void 0 : q_.__wrap(_);
    }
    has_vrf_result() {
      return t.headerbody_has_vrf_result(this.__wbg_ptr) !== 0;
    }
    vrf_result_or_nothing() {
      const _ = t.headerbody_vrf_result_or_nothing(this.__wbg_ptr);
      return _ === 0 ? void 0 : q_.__wrap(_);
    }
    block_body_size() {
      return t.headerbody_block_body_size(this.__wbg_ptr) >>> 0;
    }
    block_body_hash() {
      const _ = t.headerbody_block_body_hash(this.__wbg_ptr);
      return w_.__wrap(_);
    }
    operational_cert() {
      const _ = t.headerbody_operational_cert(this.__wbg_ptr);
      return ct.__wrap(_);
    }
    protocol_version() {
      const _ = t.headerbody_protocol_version(this.__wbg_ptr);
      return a_.__wrap(_);
    }
    static new(_, r, o, n, e, s, i, g, c, v) {
      let j = 0;
      p_(o) || (p(o, w_), j = o.__destroy_into_raw()), p(n, __), p(e, ir), p(s, q_), p(g, w_), p(c, ct), p(v, a_);
      const x = t.headerbody_new(_, r, j, n.__wbg_ptr, e.__wbg_ptr, s.__wbg_ptr, i, g.__wbg_ptr, c.__wbg_ptr, v.__wbg_ptr);
      return N_.__wrap(x);
    }
    static new_headerbody(_, r, o, n, e, s, i, g, c, v) {
      p(r, h);
      let j = 0;
      p_(o) || (p(o, w_), j = o.__destroy_into_raw()), p(n, __), p(e, ir), p(s, q_), p(g, w_), p(c, ct), p(v, a_);
      const x = t.headerbody_new_headerbody(_, r.__wbg_ptr, j, n.__wbg_ptr, e.__wbg_ptr, s.__wbg_ptr, i, g.__wbg_ptr, c.__wbg_ptr, v.__wbg_ptr);
      return N_.__wrap(x);
    }
  };
  const $n = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_infoaction_free(w >>> 0));
  Gr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Gr.prototype);
      return r.__wbg_ptr = _, $n.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, $n.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_infoaction_free(_);
    }
    static new() {
      const _ = t.infoaction_new();
      return Gr.__wrap(_);
    }
  };
  const Ln = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_int_free(w >>> 0));
  Q = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Q.prototype);
      return r.__wbg_ptr = _, Ln.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ln.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_int_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.int_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.int_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Q.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.int_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.int_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Q.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.int_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.int_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.int_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Q.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_) {
      p(_, h);
      const r = t.int_new(_.__wbg_ptr);
      return Q.__wrap(r);
    }
    static new_negative(_) {
      p(_, h);
      const r = t.int_new_negative(_.__wbg_ptr);
      return Q.__wrap(r);
    }
    static new_i32(_) {
      const r = t.int_new_i32(_);
      return Q.__wrap(r);
    }
    is_positive() {
      return t.int_is_positive(this.__wbg_ptr) !== 0;
    }
    as_positive() {
      const _ = t.int_as_positive(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    as_negative() {
      const _ = t.int_as_negative(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    as_i32() {
      try {
        const o = t.__wbindgen_add_to_stack_pointer(-16);
        t.int_as_i32(o, this.__wbg_ptr);
        var _ = a()[o / 4 + 0], r = a()[o / 4 + 1];
        return _ === 0 ? void 0 : r;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_i32_or_nothing() {
      try {
        const o = t.__wbindgen_add_to_stack_pointer(-16);
        t.int_as_i32_or_nothing(o, this.__wbg_ptr);
        var _ = a()[o / 4 + 0], r = a()[o / 4 + 1];
        return _ === 0 ? void 0 : r;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_i32_or_fail() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.int_as_i32_or_fail(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return _;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_str() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.int_to_str(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_str(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.int_from_str(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Q.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Jn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_ipv4_free(w >>> 0));
  $t = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create($t.prototype);
      return r.__wbg_ptr = _, Jn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Jn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_ipv4_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.ipv4_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.ipv4_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return $t.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.ipv4_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.ipv4_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return $t.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.ipv4_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.ipv4_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.ipv4_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return $t.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.ipv4_new(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return $t.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    ip() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.ipv4_ip(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Yn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_ipv6_free(w >>> 0));
  Lt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Lt.prototype);
      return r.__wbg_ptr = _, Yn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Yn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_ipv6_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.ipv6_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.ipv6_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Lt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.ipv6_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.ipv6_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Lt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.ipv6_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.ipv6_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.ipv6_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Lt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.ipv6_new(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Lt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    ip() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.ipv6_ip(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Qn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_kessignature_free(w >>> 0));
  Hr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Hr.prototype);
      return r.__wbg_ptr = _, Qn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Qn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_kessignature_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.kessignature_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.kessignature_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Hr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Xn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_kesvkey_free(w >>> 0));
  fr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(fr.prototype);
      return r.__wbg_ptr = _, Xn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Xn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_kesvkey_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.kesvkey_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return fr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(_) {
      let r, o;
      try {
        const v = t.__wbindgen_add_to_stack_pointer(-16), j = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), x = b;
        t.anchordatahash_to_bech32(v, this.__wbg_ptr, j, x);
        var n = a()[v / 4 + 0], e = a()[v / 4 + 1], s = a()[v / 4 + 2], i = a()[v / 4 + 3], g = n, c = e;
        if (i) throw g = 0, c = 0, d(s);
        return r = g, o = c, f(g, c);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.kesvkey_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return fr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.kesvkey_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return fr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Zn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_language_free(w >>> 0));
  I = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(I.prototype);
      return r.__wbg_ptr = _, Zn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Zn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_language_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.language_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.language_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return I.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.language_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.language_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return I.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.language_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.language_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.language_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return I.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_plutus_v1() {
      const _ = t.language_new_plutus_v1();
      return I.__wrap(_);
    }
    static new_plutus_v2() {
      const _ = t.language_new_plutus_v2();
      return I.__wrap(_);
    }
    static new_plutus_v3() {
      const _ = t.language_new_plutus_v3();
      return I.__wrap(_);
    }
    kind() {
      return t.language_kind(this.__wbg_ptr);
    }
  };
  const Un = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_languages_free(w >>> 0));
  Or = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Or.prototype);
      return r.__wbg_ptr = _, Un.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Un.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_languages_free(_);
    }
    static new() {
      const _ = t.languages_new();
      return Or.__wrap(_);
    }
    len() {
      return t.languages_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.languages_get(this.__wbg_ptr, _);
      return I.__wrap(r);
    }
    add(_) {
      p(_, I);
      var r = _.__destroy_into_raw();
      t.languages_add(this.__wbg_ptr, r);
    }
    static list() {
      const _ = t.languages_list();
      return Or.__wrap(_);
    }
  };
  const En = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_legacydaedalusprivatekey_free(w >>> 0));
  Ar = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Ar.prototype);
      return r.__wbg_ptr = _, En.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, En.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_legacydaedalusprivatekey_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.legacydaedalusprivatekey_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Ar.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.legacydaedalusprivatekey_as_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    chaincode() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.legacydaedalusprivatekey_chaincode(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Kn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_linearfee_free(w >>> 0));
  Ir = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Ir.prototype);
      return r.__wbg_ptr = _, Kn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Kn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_linearfee_free(_);
    }
    constant() {
      const _ = t.linearfee_constant(this.__wbg_ptr);
      return h.__wrap(_);
    }
    coefficient() {
      const _ = t.linearfee_coefficient(this.__wbg_ptr);
      return h.__wrap(_);
    }
    static new(_, r) {
      p(_, h), p(r, h);
      const o = t.linearfee_new(_.__wbg_ptr, r.__wbg_ptr);
      return Ir.__wrap(o);
    }
  };
  const Sn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_mirtostakecredentials_free(w >>> 0));
  Jt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Jt.prototype);
      return r.__wbg_ptr = _, Sn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Sn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_mirtostakecredentials_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.mirtostakecredentials_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.mirtostakecredentials_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Jt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.mirtostakecredentials_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.mirtostakecredentials_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Jt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.mirtostakecredentials_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.mirtostakecredentials_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.mirtostakecredentials_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Jt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.mirtostakecredentials_new();
      return Jt.__wrap(_);
    }
    len() {
      return t.mirtostakecredentials_len(this.__wbg_ptr) >>> 0;
    }
    insert(_, r) {
      p(_, k), p(r, Q);
      const o = t.mirtostakecredentials_insert(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
      return o === 0 ? void 0 : Q.__wrap(o);
    }
    get(_) {
      p(_, k);
      const r = t.mirtostakecredentials_get(this.__wbg_ptr, _.__wbg_ptr);
      return r === 0 ? void 0 : Q.__wrap(r);
    }
    keys() {
      const _ = t.mirtostakecredentials_keys(this.__wbg_ptr);
      return z_.__wrap(_);
    }
  };
  const Wn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_malformedaddress_free(w >>> 0));
  we = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(we.prototype);
      return r.__wbg_ptr = _, Wn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Wn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_malformedaddress_free(_);
    }
    original_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.malformedaddress_original_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_address() {
      const _ = t.malformedaddress_to_address(this.__wbg_ptr);
      return $.__wrap(_);
    }
    static from_address(_) {
      p(_, $);
      const r = t.malformedaddress_from_address(_.__wbg_ptr);
      return r === 0 ? void 0 : we.__wrap(r);
    }
  };
  const Mn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_metadatalist_free(w >>> 0));
  or = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(or.prototype);
      return r.__wbg_ptr = _, Mn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Mn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_metadatalist_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.metadatalist_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.metadatalist_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return or.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.metadatalist_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.metadatalist_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return or.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.metadatalist_new();
      return or.__wrap(_);
    }
    len() {
      return t.metadatalist_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.metadatalist_get(this.__wbg_ptr, _);
      return L.__wrap(r);
    }
    add(_) {
      p(_, L), t.metadatalist_add(this.__wbg_ptr, _.__wbg_ptr);
    }
  };
  const Gn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_metadatamap_free(w >>> 0));
  ur = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(ur.prototype);
      return r.__wbg_ptr = _, Gn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Gn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_metadatamap_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.metadatamap_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.metadatamap_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ur.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.metadatamap_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.metadatamap_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ur.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.generaltransactionmetadata_new();
      return ur.__wrap(_);
    }
    len() {
      return t.generaltransactionmetadata_len(this.__wbg_ptr) >>> 0;
    }
    insert(_, r) {
      p(_, L), p(r, L);
      const o = t.metadatamap_insert(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
      return o === 0 ? void 0 : L.__wrap(o);
    }
    insert_str(_, r) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16), i = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), g = b;
        p(r, L), t.metadatamap_insert_str(s, this.__wbg_ptr, i, g, r.__wbg_ptr);
        var o = a()[s / 4 + 0], n = a()[s / 4 + 1], e = a()[s / 4 + 2];
        if (e) throw d(n);
        return o === 0 ? void 0 : L.__wrap(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    insert_i32(_, r) {
      p(r, L);
      const o = t.metadatamap_insert_i32(this.__wbg_ptr, _, r.__wbg_ptr);
      return o === 0 ? void 0 : L.__wrap(o);
    }
    get(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, L), t.metadatamap_get(e, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return L.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_str(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.metadatamap_get_str(e, this.__wbg_ptr, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return L.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_i32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.metadatamap_get_i32(e, this.__wbg_ptr, _);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return L.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    has(_) {
      return p(_, L), t.metadatamap_has(this.__wbg_ptr, _.__wbg_ptr) !== 0;
    }
    keys() {
      const _ = t.metadatamap_keys(this.__wbg_ptr);
      return or.__wrap(_);
    }
  };
  const Hn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_mint_free(w >>> 0));
  g_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(g_.prototype);
      return r.__wbg_ptr = _, Hn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Hn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_mint_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.mint_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.mint_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return g_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.mint_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.mint_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return g_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.mint_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.mint_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.mint_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return g_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.assetnames_new();
      return g_.__wrap(_);
    }
    static new_from_entry(_, r) {
      p(_, Y), p(r, M_);
      const o = t.mint_new_from_entry(_.__wbg_ptr, r.__wbg_ptr);
      return g_.__wrap(o);
    }
    len() {
      return t.mint_len(this.__wbg_ptr) >>> 0;
    }
    insert(_, r) {
      p(_, Y), p(r, M_);
      const o = t.mint_insert(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
      return o === 0 ? void 0 : M_.__wrap(o);
    }
    get(_) {
      p(_, Y);
      const r = t.mint_get(this.__wbg_ptr, _.__wbg_ptr);
      return r === 0 ? void 0 : Sr.__wrap(r);
    }
    keys() {
      const _ = t.mint_keys(this.__wbg_ptr);
      return At.__wrap(_);
    }
    as_positive_multiasset() {
      const _ = t.mint_as_positive_multiasset(this.__wbg_ptr);
      return T.__wrap(_);
    }
    as_negative_multiasset() {
      const _ = t.mint_as_negative_multiasset(this.__wbg_ptr);
      return T.__wrap(_);
    }
  };
  const An = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_mintassets_free(w >>> 0));
  M_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(M_.prototype);
      return r.__wbg_ptr = _, An.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, An.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_mintassets_free(_);
    }
    static new() {
      const _ = t.assets_new();
      return M_.__wrap(_);
    }
    static new_from_entry(_, r) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, M), p(r, Q), t.mintassets_new_from_entry(s, _.__wbg_ptr, r.__wbg_ptr);
        var o = a()[s / 4 + 0], n = a()[s / 4 + 1], e = a()[s / 4 + 2];
        if (e) throw d(n);
        return M_.__wrap(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    len() {
      return t.assets_len(this.__wbg_ptr) >>> 0;
    }
    insert(_, r) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, M), p(r, Q), t.mintassets_insert(s, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
        var o = a()[s / 4 + 0], n = a()[s / 4 + 1], e = a()[s / 4 + 2];
        if (e) throw d(n);
        return o === 0 ? void 0 : Q.__wrap(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get(_) {
      p(_, M);
      const r = t.mintassets_get(this.__wbg_ptr, _.__wbg_ptr);
      return r === 0 ? void 0 : Q.__wrap(r);
    }
    keys() {
      const _ = t.mintassets_keys(this.__wbg_ptr);
      return yt.__wrap(_);
    }
  };
  const In = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_mintbuilder_free(w >>> 0));
  Dr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Dr.prototype);
      return r.__wbg_ptr = _, In.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, In.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_mintbuilder_free(_);
    }
    static new() {
      const _ = t.mintbuilder_new();
      return Dr.__wrap(_);
    }
    add_asset(_, r, o) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, qr), p(r, M), p(o, Q), t.mintbuilder_add_asset(s, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
        var n = a()[s / 4 + 0], e = a()[s / 4 + 1];
        if (e) throw d(n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_asset(_, r, o) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, qr), p(r, M), p(o, Q), t.mintbuilder_set_asset(s, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
        var n = a()[s / 4 + 0], e = a()[s / 4 + 1];
        if (e) throw d(n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    build() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.mintbuilder_build(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return g_.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_native_scripts() {
      const _ = t.mintbuilder_get_native_scripts(this.__wbg_ptr);
      return U.__wrap(_);
    }
    get_plutus_witnesses() {
      const _ = t.mintbuilder_get_plutus_witnesses(this.__wbg_ptr);
      return H_.__wrap(_);
    }
    get_ref_inputs() {
      const _ = t.mintbuilder_get_ref_inputs(this.__wbg_ptr);
      return K.__wrap(_);
    }
    get_redeemers() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.mintbuilder_get_redeemers(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return S_.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    has_plutus_scripts() {
      return t.mintbuilder_has_plutus_scripts(this.__wbg_ptr) !== 0;
    }
    has_native_scripts() {
      return t.mintbuilder_has_native_scripts(this.__wbg_ptr) !== 0;
    }
  };
  const Dn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_mintwitness_free(w >>> 0));
  qr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(qr.prototype);
      return r.__wbg_ptr = _, Dn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Dn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_mintwitness_free(_);
    }
    static new_native_script(_) {
      p(_, G_);
      const r = t.mintwitness_new_native_script(_.__wbg_ptr);
      return qr.__wrap(r);
    }
    static new_plutus_script(_, r) {
      p(_, vr), p(r, o_);
      const o = t.mintwitness_new_plutus_script(_.__wbg_ptr, r.__wbg_ptr);
      return qr.__wrap(o);
    }
  };
  const Tn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_mintsassets_free(w >>> 0));
  Sr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Sr.prototype);
      return r.__wbg_ptr = _, Tn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Tn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_mintsassets_free(_);
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.mintsassets_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.mintsassets_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.mintsassets_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Sr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.assetnames_new();
      return Sr.__wrap(_);
    }
    add(_) {
      p(_, M_), t.mintsassets_add(this.__wbg_ptr, _.__wbg_ptr);
    }
    get(_) {
      const r = t.mintsassets_get(this.__wbg_ptr, _);
      return r === 0 ? void 0 : M_.__wrap(r);
    }
    len() {
      return t.assetnames_len(this.__wbg_ptr) >>> 0;
    }
  };
  const Nn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_moveinstantaneousreward_free(w >>> 0));
  C_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(C_.prototype);
      return r.__wbg_ptr = _, Nn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Nn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_moveinstantaneousreward_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.moveinstantaneousreward_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.moveinstantaneousreward_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return C_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.moveinstantaneousreward_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.moveinstantaneousreward_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return C_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.moveinstantaneousreward_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.moveinstantaneousreward_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.moveinstantaneousreward_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return C_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_to_other_pot(_, r) {
      p(r, h);
      const o = t.moveinstantaneousreward_new_to_other_pot(_, r.__wbg_ptr);
      return C_.__wrap(o);
    }
    static new_to_stake_creds(_, r) {
      p(r, Jt);
      const o = t.moveinstantaneousreward_new_to_stake_creds(_, r.__wbg_ptr);
      return C_.__wrap(o);
    }
    pot() {
      return t.moveinstantaneousreward_pot(this.__wbg_ptr);
    }
    kind() {
      return t.moveinstantaneousreward_kind(this.__wbg_ptr);
    }
    as_to_other_pot() {
      const _ = t.moveinstantaneousreward_as_to_other_pot(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    as_to_stake_creds() {
      const _ = t.moveinstantaneousreward_as_to_stake_creds(this.__wbg_ptr);
      return _ === 0 ? void 0 : Jt.__wrap(_);
    }
  };
  const Cn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_moveinstantaneousrewardscert_free(w >>> 0));
  Yt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Yt.prototype);
      return r.__wbg_ptr = _, Cn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Cn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_moveinstantaneousrewardscert_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.moveinstantaneousrewardscert_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.moveinstantaneousrewardscert_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Yt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.moveinstantaneousrewardscert_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.moveinstantaneousrewardscert_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Yt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.moveinstantaneousrewardscert_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.moveinstantaneousrewardscert_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.moveinstantaneousrewardscert_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Yt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    move_instantaneous_reward() {
      const _ = t.moveinstantaneousrewardscert_move_instantaneous_reward(this.__wbg_ptr);
      return C_.__wrap(_);
    }
    static new(_) {
      p(_, C_);
      const r = t.moveinstantaneousrewardscert_new(_.__wbg_ptr);
      return Yt.__wrap(r);
    }
  };
  const Vn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_multiasset_free(w >>> 0));
  T = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(T.prototype);
      return r.__wbg_ptr = _, Vn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Vn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_multiasset_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.multiasset_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.multiasset_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return T.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.multiasset_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.multiasset_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return T.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.multiasset_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.multiasset_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.multiasset_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return T.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.assets_new();
      return T.__wrap(_);
    }
    len() {
      return t.assets_len(this.__wbg_ptr) >>> 0;
    }
    insert(_, r) {
      p(_, Y), p(r, at);
      const o = t.multiasset_insert(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
      return o === 0 ? void 0 : at.__wrap(o);
    }
    get(_) {
      p(_, Y);
      const r = t.multiasset_get(this.__wbg_ptr, _.__wbg_ptr);
      return r === 0 ? void 0 : at.__wrap(r);
    }
    set_asset(_, r, o) {
      p(_, Y), p(r, M), p(o, h);
      const n = t.multiasset_set_asset(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
      return n === 0 ? void 0 : h.__wrap(n);
    }
    get_asset(_, r) {
      p(_, Y), p(r, M);
      const o = t.multiasset_get_asset(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
      return h.__wrap(o);
    }
    keys() {
      const _ = t.multiasset_keys(this.__wbg_ptr);
      return At.__wrap(_);
    }
    sub(_) {
      p(_, T);
      const r = t.multiasset_sub(this.__wbg_ptr, _.__wbg_ptr);
      return T.__wrap(r);
    }
  };
  const Pn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_multihostname_free(w >>> 0));
  Qt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Qt.prototype);
      return r.__wbg_ptr = _, Pn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Pn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_multihostname_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.multihostname_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.multihostname_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Qt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.multihostname_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.multihostname_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Qt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.multihostname_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.multihostname_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.multihostname_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Qt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    dns_name() {
      const _ = t.multihostname_dns_name(this.__wbg_ptr);
      return Ft.__wrap(_);
    }
    static new(_) {
      p(_, Ft);
      const r = t.multihostname_dns_name(_.__wbg_ptr);
      return Qt.__wrap(r);
    }
  };
  const Bn = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_nativescript_free(w >>> 0));
  S = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(S.prototype);
      return r.__wbg_ptr = _, Bn.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Bn.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_nativescript_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.nativescript_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.nativescript_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return S.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.nativescript_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.nativescript_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return S.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.nativescript_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.nativescript_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.nativescript_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return S.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    hash() {
      const _ = t.nativescript_hash(this.__wbg_ptr);
      return Y.__wrap(_);
    }
    static new_script_pubkey(_) {
      p(_, Dt);
      const r = t.nativescript_new_script_pubkey(_.__wbg_ptr);
      return S.__wrap(r);
    }
    static new_script_all(_) {
      p(_, Gt);
      const r = t.nativescript_new_script_all(_.__wbg_ptr);
      return S.__wrap(r);
    }
    static new_script_any(_) {
      p(_, Ht);
      const r = t.nativescript_new_script_any(_.__wbg_ptr);
      return S.__wrap(r);
    }
    static new_script_n_of_k(_) {
      p(_, It);
      const r = t.nativescript_new_script_n_of_k(_.__wbg_ptr);
      return S.__wrap(r);
    }
    static new_timelock_start(_) {
      p(_, tt);
      const r = t.nativescript_new_timelock_start(_.__wbg_ptr);
      return S.__wrap(r);
    }
    static new_timelock_expiry(_) {
      p(_, _t);
      const r = t.nativescript_new_timelock_expiry(_.__wbg_ptr);
      return S.__wrap(r);
    }
    kind() {
      return t.nativescript_kind(this.__wbg_ptr);
    }
    as_script_pubkey() {
      const _ = t.nativescript_as_script_pubkey(this.__wbg_ptr);
      return _ === 0 ? void 0 : Dt.__wrap(_);
    }
    as_script_all() {
      const _ = t.nativescript_as_script_all(this.__wbg_ptr);
      return _ === 0 ? void 0 : Gt.__wrap(_);
    }
    as_script_any() {
      const _ = t.nativescript_as_script_any(this.__wbg_ptr);
      return _ === 0 ? void 0 : Ht.__wrap(_);
    }
    as_script_n_of_k() {
      const _ = t.nativescript_as_script_n_of_k(this.__wbg_ptr);
      return _ === 0 ? void 0 : It.__wrap(_);
    }
    as_timelock_start() {
      const _ = t.nativescript_as_timelock_start(this.__wbg_ptr);
      return _ === 0 ? void 0 : tt.__wrap(_);
    }
    as_timelock_expiry() {
      const _ = t.nativescript_as_timelock_expiry(this.__wbg_ptr);
      return _ === 0 ? void 0 : _t.__wrap(_);
    }
    get_required_signers() {
      const _ = t.nativescript_get_required_signers(this.__wbg_ptr);
      return V.__wrap(_);
    }
  };
  const _a = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_nativescriptsource_free(w >>> 0));
  G_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(G_.prototype);
      return r.__wbg_ptr = _, _a.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, _a.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_nativescriptsource_free(_);
    }
    static new(_) {
      p(_, S);
      const r = t.nativescriptsource_new(_.__wbg_ptr);
      return G_.__wrap(r);
    }
    static new_ref_input(_, r, o) {
      p(_, Y), p(r, X);
      const n = t.nativescriptsource_new_ref_input(_.__wbg_ptr, r.__wbg_ptr, o);
      return G_.__wrap(n);
    }
    set_required_signers(_) {
      p(_, V), t.nativescriptsource_set_required_signers(this.__wbg_ptr, _.__wbg_ptr);
    }
    get_ref_script_size() {
      try {
        const o = t.__wbindgen_add_to_stack_pointer(-16);
        t.nativescriptsource_get_ref_script_size(o, this.__wbg_ptr);
        var _ = a()[o / 4 + 0], r = a()[o / 4 + 1];
        return _ === 0 ? void 0 : r >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const ta = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_nativescripts_free(w >>> 0));
  U = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(U.prototype);
      return r.__wbg_ptr = _, ta.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ta.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_nativescripts_free(_);
    }
    static new() {
      const _ = t.nativescripts_new();
      return U.__wrap(_);
    }
    len() {
      return t.nativescripts_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.nativescripts_get(this.__wbg_ptr, _);
      return S.__wrap(r);
    }
    add(_) {
      p(_, S), t.nativescripts_add(this.__wbg_ptr, _.__wbg_ptr);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.nativescripts_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.nativescripts_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return U.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.nativescripts_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.nativescripts_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return U.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.nativescripts_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.nativescripts_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.nativescripts_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return U.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const ra = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_networkid_free(w >>> 0));
  V_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(V_.prototype);
      return r.__wbg_ptr = _, ra.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ra.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_networkid_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.networkid_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.networkid_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return V_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.networkid_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.networkid_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return V_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.networkid_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.networkid_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.networkid_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return V_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static testnet() {
      const _ = t.networkid_testnet();
      return V_.__wrap(_);
    }
    static mainnet() {
      const _ = t.networkid_mainnet();
      return V_.__wrap(_);
    }
    kind() {
      return t.networkid_kind(this.__wbg_ptr);
    }
  };
  const ea = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_networkinfo_free(w >>> 0));
  wr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(wr.prototype);
      return r.__wbg_ptr = _, ea.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ea.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_networkinfo_free(_);
    }
    static new(_, r) {
      const o = t.networkinfo_new(_, r);
      return wr.__wrap(o);
    }
    network_id() {
      return t.networkinfo_network_id(this.__wbg_ptr);
    }
    protocol_magic() {
      return t.networkinfo_protocol_magic(this.__wbg_ptr) >>> 0;
    }
    static testnet_preview() {
      const _ = t.networkinfo_testnet_preview();
      return wr.__wrap(_);
    }
    static testnet_preprod() {
      const _ = t.networkinfo_testnet_preprod();
      return wr.__wrap(_);
    }
    static mainnet() {
      const _ = t.networkinfo_mainnet();
      return wr.__wrap(_);
    }
  };
  const na = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_newconstitutionaction_free(w >>> 0));
  P_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(P_.prototype);
      return r.__wbg_ptr = _, na.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, na.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_newconstitutionaction_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.newconstitutionaction_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.newconstitutionaction_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return P_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.newconstitutionaction_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.newconstitutionaction_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return P_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.newconstitutionaction_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.newconstitutionaction_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.newconstitutionaction_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return P_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    gov_action_id() {
      const _ = t.hardforkinitiationaction_gov_action_id(this.__wbg_ptr);
      return _ === 0 ? void 0 : Z.__wrap(_);
    }
    constitution() {
      const _ = t.newconstitutionaction_constitution(this.__wbg_ptr);
      return Z_.__wrap(_);
    }
    static new(_) {
      p(_, Z_);
      const r = t.newconstitutionaction_new(_.__wbg_ptr);
      return P_.__wrap(r);
    }
    static new_with_action_id(_, r) {
      p(_, Z), p(r, Z_);
      const o = t.newconstitutionaction_new_with_action_id(_.__wbg_ptr, r.__wbg_ptr);
      return P_.__wrap(o);
    }
    has_script_hash() {
      return t.newconstitutionaction_has_script_hash(this.__wbg_ptr) !== 0;
    }
  };
  const aa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_noconfidenceaction_free(w >>> 0));
  B_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(B_.prototype);
      return r.__wbg_ptr = _, aa.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, aa.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_noconfidenceaction_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.noconfidenceaction_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.noconfidenceaction_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return B_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.noconfidenceaction_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.noconfidenceaction_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return B_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.noconfidenceaction_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.noconfidenceaction_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.noconfidenceaction_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return B_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    gov_action_id() {
      const _ = t.noconfidenceaction_gov_action_id(this.__wbg_ptr);
      return _ === 0 ? void 0 : Z.__wrap(_);
    }
    static new() {
      const _ = t.noconfidenceaction_new();
      return B_.__wrap(_);
    }
    static new_with_action_id(_) {
      p(_, Z);
      const r = t.noconfidenceaction_new_with_action_id(_.__wbg_ptr);
      return B_.__wrap(r);
    }
  };
  const oa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_nonce_free(w >>> 0));
  ht = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(ht.prototype);
      return r.__wbg_ptr = _, oa.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, oa.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_nonce_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.nonce_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.nonce_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ht.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.nonce_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.nonce_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ht.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.nonce_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.nonce_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.nonce_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ht.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_identity() {
      const _ = t.nonce_new_identity();
      return ht.__wrap(_);
    }
    static new_from_hash(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.nonce_new_from_hash(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ht.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_hash() {
      try {
        const o = t.__wbindgen_add_to_stack_pointer(-16);
        t.nonce_get_hash(o, this.__wbg_ptr);
        var _ = a()[o / 4 + 0], r = a()[o / 4 + 1];
        let n;
        return _ !== 0 && (n = y(_, r).slice(), t.__wbindgen_free(_, r * 1, 1)), n;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const ia = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_operationalcert_free(w >>> 0));
  ct = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(ct.prototype);
      return r.__wbg_ptr = _, ia.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ia.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_operationalcert_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.operationalcert_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.operationalcert_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ct.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.operationalcert_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.operationalcert_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ct.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.operationalcert_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.operationalcert_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.operationalcert_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ct.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    hot_vkey() {
      const _ = t.operationalcert_hot_vkey(this.__wbg_ptr);
      return fr.__wrap(_);
    }
    sequence_number() {
      return t.operationalcert_sequence_number(this.__wbg_ptr) >>> 0;
    }
    kes_period() {
      return t.operationalcert_kes_period(this.__wbg_ptr) >>> 0;
    }
    sigma() {
      const _ = t.operationalcert_sigma(this.__wbg_ptr);
      return c_.__wrap(_);
    }
    static new(_, r, o, n) {
      p(_, fr), p(n, c_);
      const e = t.operationalcert_new(_.__wbg_ptr, r, o, n.__wbg_ptr);
      return ct.__wrap(e);
    }
  };
  const sa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_outputdatum_free(w >>> 0));
  $r = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create($r.prototype);
      return r.__wbg_ptr = _, sa.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, sa.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_outputdatum_free(_);
    }
    static new_data_hash(_) {
      p(_, J_);
      const r = t.outputdatum_new_data_hash(_.__wbg_ptr);
      return $r.__wrap(r);
    }
    static new_data(_) {
      p(_, R);
      const r = t.outputdatum_new_data(_.__wbg_ptr);
      return $r.__wrap(r);
    }
    data_hash() {
      const _ = t.outputdatum_data_hash(this.__wbg_ptr);
      return _ === 0 ? void 0 : J_.__wrap(_);
    }
    data() {
      const _ = t.outputdatum_data(this.__wbg_ptr);
      return _ === 0 ? void 0 : R.__wrap(_);
    }
  };
  const da = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_parameterchangeaction_free(w >>> 0));
  y_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(y_.prototype);
      return r.__wbg_ptr = _, da.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, da.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_parameterchangeaction_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.parameterchangeaction_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.parameterchangeaction_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return y_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.parameterchangeaction_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.parameterchangeaction_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return y_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.parameterchangeaction_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.parameterchangeaction_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.parameterchangeaction_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return y_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    gov_action_id() {
      const _ = t.parameterchangeaction_gov_action_id(this.__wbg_ptr);
      return _ === 0 ? void 0 : Z.__wrap(_);
    }
    protocol_param_updates() {
      const _ = t.parameterchangeaction_protocol_param_updates(this.__wbg_ptr);
      return n_.__wrap(_);
    }
    policy_hash() {
      const _ = t.parameterchangeaction_policy_hash(this.__wbg_ptr);
      return _ === 0 ? void 0 : Y.__wrap(_);
    }
    static new(_) {
      p(_, n_);
      const r = t.parameterchangeaction_new(_.__wbg_ptr);
      return y_.__wrap(r);
    }
    static new_with_action_id(_, r) {
      p(_, Z), p(r, n_);
      const o = t.parameterchangeaction_new_with_action_id(_.__wbg_ptr, r.__wbg_ptr);
      return y_.__wrap(o);
    }
    static new_with_policy_hash(_, r) {
      p(_, n_), p(r, Y);
      const o = t.parameterchangeaction_new_with_policy_hash(_.__wbg_ptr, r.__wbg_ptr);
      return y_.__wrap(o);
    }
    static new_with_policy_hash_and_action_id(_, r, o) {
      p(_, Z), p(r, n_), p(o, Y);
      const n = t.parameterchangeaction_new_with_policy_hash_and_action_id(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
      return y_.__wrap(n);
    }
  };
  const ca = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_plutusdata_free(w >>> 0));
  R = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(R.prototype);
      return r.__wbg_ptr = _, ca.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ca.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_plutusdata_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.plutusdata_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.plutusdata_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return R.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.plutusdata_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.plutusdata_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return R.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_constr_plutus_data(_) {
      p(_, br);
      const r = t.plutusdata_new_constr_plutus_data(_.__wbg_ptr);
      return R.__wrap(r);
    }
    static new_empty_constr_plutus_data(_) {
      p(_, h);
      const r = t.plutusdata_new_empty_constr_plutus_data(_.__wbg_ptr);
      return R.__wrap(r);
    }
    static new_single_value_constr_plutus_data(_, r) {
      p(_, h), p(r, R);
      const o = t.plutusdata_new_single_value_constr_plutus_data(_.__wbg_ptr, r.__wbg_ptr);
      return R.__wrap(o);
    }
    static new_map(_) {
      p(_, hr);
      const r = t.plutusdata_new_map(_.__wbg_ptr);
      return R.__wrap(r);
    }
    static new_list(_) {
      p(_, i_);
      const r = t.plutusdata_new_list(_.__wbg_ptr);
      return R.__wrap(r);
    }
    static new_integer(_) {
      p(_, E);
      const r = t.plutusdata_new_integer(_.__wbg_ptr);
      return R.__wrap(r);
    }
    static new_bytes(_) {
      const r = u(_, t.__wbindgen_malloc), o = b, n = t.plutusdata_new_bytes(r, o);
      return R.__wrap(n);
    }
    kind() {
      return t.plutusdata_kind(this.__wbg_ptr);
    }
    as_constr_plutus_data() {
      const _ = t.plutusdata_as_constr_plutus_data(this.__wbg_ptr);
      return _ === 0 ? void 0 : br.__wrap(_);
    }
    as_map() {
      const _ = t.plutusdata_as_map(this.__wbg_ptr);
      return _ === 0 ? void 0 : hr.__wrap(_);
    }
    as_list() {
      const _ = t.plutusdata_as_list(this.__wbg_ptr);
      return _ === 0 ? void 0 : i_.__wrap(_);
    }
    as_integer() {
      const _ = t.plutusdata_as_integer(this.__wbg_ptr);
      return _ === 0 ? void 0 : E.__wrap(_);
    }
    as_bytes() {
      try {
        const o = t.__wbindgen_add_to_stack_pointer(-16);
        t.plutusdata_as_bytes(o, this.__wbg_ptr);
        var _ = a()[o / 4 + 0], r = a()[o / 4 + 1];
        let n;
        return _ !== 0 && (n = y(_, r).slice(), t.__wbindgen_free(_, r * 1, 1)), n;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json(_) {
      let r, o;
      try {
        const v = t.__wbindgen_add_to_stack_pointer(-16);
        t.decode_plutus_datum_to_json_str(v, this.__wbg_ptr, _);
        var n = a()[v / 4 + 0], e = a()[v / 4 + 1], s = a()[v / 4 + 2], i = a()[v / 4 + 3], g = n, c = e;
        if (i) throw g = 0, c = 0, d(s);
        return r = g, o = c, f(g, c);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
      }
    }
    static from_json(_, r) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16), i = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), g = b;
        t.encode_json_str_to_plutus_datum(s, i, g, r);
        var o = a()[s / 4 + 0], n = a()[s / 4 + 1], e = a()[s / 4 + 2];
        if (e) throw d(n);
        return R.__wrap(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_address(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, $), t.plutusdata_from_address(e, _.__wbg_ptr);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return R.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_address(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, wr), t.plutusdata_as_address(e, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return $.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const pa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_plutuslist_free(w >>> 0));
  i_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(i_.prototype);
      return r.__wbg_ptr = _, pa.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, pa.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_plutuslist_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.plutuslist_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.plutuslist_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return i_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.plutuslist_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.plutuslist_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return i_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.plutuslist_new();
      return i_.__wrap(_);
    }
    len() {
      return t.plutuslist_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.plutuslist_get(this.__wbg_ptr, _);
      return R.__wrap(r);
    }
    add(_) {
      p(_, R), t.plutuslist_add(this.__wbg_ptr, _.__wbg_ptr);
    }
  };
  const wa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_plutusmap_free(w >>> 0));
  hr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(hr.prototype);
      return r.__wbg_ptr = _, wa.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, wa.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_plutusmap_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.plutusmap_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.plutusmap_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return hr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.plutusmap_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.plutusmap_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return hr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.generaltransactionmetadata_new();
      return hr.__wrap(_);
    }
    len() {
      return t.generaltransactionmetadata_len(this.__wbg_ptr) >>> 0;
    }
    insert(_, r) {
      p(_, R), p(r, Lr);
      const o = t.plutusmap_insert(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
      return o === 0 ? void 0 : Lr.__wrap(o);
    }
    get(_) {
      p(_, R);
      const r = t.plutusmap_get(this.__wbg_ptr, _.__wbg_ptr);
      return r === 0 ? void 0 : Lr.__wrap(r);
    }
    keys() {
      const _ = t.plutusmap_keys(this.__wbg_ptr);
      return i_.__wrap(_);
    }
  };
  const ga = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_plutusmapvalues_free(w >>> 0));
  Lr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Lr.prototype);
      return r.__wbg_ptr = _, ga.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ga.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_plutusmapvalues_free(_);
    }
    static new() {
      const _ = t.plutusmapvalues_new();
      return Lr.__wrap(_);
    }
    len() {
      return t.plutuslist_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.plutusmapvalues_get(this.__wbg_ptr, _);
      return r === 0 ? void 0 : R.__wrap(r);
    }
    add(_) {
      p(_, R), t.plutusmapvalues_add(this.__wbg_ptr, _.__wbg_ptr);
    }
  };
  const ba = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_plutusscript_free(w >>> 0));
  W = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(W.prototype);
      return r.__wbg_ptr = _, ba.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ba.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_plutusscript_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.plutusscript_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.plutusscript_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return W.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.plutusscript_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.plutusscript_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return W.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_) {
      const r = u(_, t.__wbindgen_malloc), o = b, n = t.plutusscript_new(r, o);
      return W.__wrap(n);
    }
    static new_v2(_) {
      const r = u(_, t.__wbindgen_malloc), o = b, n = t.plutusscript_new_v2(r, o);
      return W.__wrap(n);
    }
    static new_v3(_) {
      const r = u(_, t.__wbindgen_malloc), o = b, n = t.plutusscript_new_v3(r, o);
      return W.__wrap(n);
    }
    static new_with_version(_, r) {
      const o = u(_, t.__wbindgen_malloc), n = b;
      p(r, I);
      const e = t.plutusscript_new_with_version(o, n, r.__wbg_ptr);
      return W.__wrap(e);
    }
    bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.plutusscript_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes_v2(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.plutusscript_from_bytes_v2(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return W.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes_v3(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.plutusscript_from_bytes_v3(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return W.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes_with_version(_, r) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16), i = u(_, t.__wbindgen_malloc), g = b;
        p(r, I), t.plutusscript_from_bytes_with_version(s, i, g, r.__wbg_ptr);
        var o = a()[s / 4 + 0], n = a()[s / 4 + 1], e = a()[s / 4 + 2];
        if (e) throw d(n);
        return W.__wrap(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_hex_with_version(_, r) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16), i = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), g = b;
        p(r, I), t.plutusscript_from_hex_with_version(s, i, g, r.__wbg_ptr);
        var o = a()[s / 4 + 0], n = a()[s / 4 + 1], e = a()[s / 4 + 2];
        if (e) throw d(n);
        return W.__wrap(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    hash() {
      const _ = t.plutusscript_hash(this.__wbg_ptr);
      return Y.__wrap(_);
    }
    language_version() {
      const _ = t.plutusscript_language_version(this.__wbg_ptr);
      return I.__wrap(_);
    }
  };
  const la = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_plutusscriptsource_free(w >>> 0));
  vr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(vr.prototype);
      return r.__wbg_ptr = _, la.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, la.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_plutusscriptsource_free(_);
    }
    static new(_) {
      p(_, W);
      const r = t.plutusscriptsource_new(_.__wbg_ptr);
      return vr.__wrap(r);
    }
    static new_ref_input(_, r, o, n) {
      p(_, Y), p(r, X), p(o, I);
      const e = t.plutusscriptsource_new_ref_input(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr, n);
      return vr.__wrap(e);
    }
    set_required_signers(_) {
      p(_, V), t.plutusscriptsource_set_required_signers(this.__wbg_ptr, _.__wbg_ptr);
    }
    get_ref_script_size() {
      try {
        const o = t.__wbindgen_add_to_stack_pointer(-16);
        t.plutusscriptsource_get_ref_script_size(o, this.__wbg_ptr);
        var _ = a()[o / 4 + 0], r = a()[o / 4 + 1];
        return _ === 0 ? void 0 : r >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const fa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_plutusscripts_free(w >>> 0));
  K_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(K_.prototype);
      return r.__wbg_ptr = _, fa.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, fa.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_plutusscripts_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.plutusscripts_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.plutusscripts_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return K_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.plutusscripts_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.plutusscripts_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return K_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.plutusscripts_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.plutusscripts_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.plutusscripts_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return K_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.plutusscripts_new();
      return K_.__wrap(_);
    }
    len() {
      return t.plutusscripts_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.plutusscripts_get(this.__wbg_ptr, _);
      return W.__wrap(r);
    }
    add(_) {
      p(_, W), t.plutusscripts_add(this.__wbg_ptr, _.__wbg_ptr);
    }
  };
  const ua = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_plutuswitness_free(w >>> 0));
  B = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(B.prototype);
      return r.__wbg_ptr = _, ua.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ua.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_plutuswitness_free(_);
    }
    static new(_, r, o) {
      p(_, W), p(r, R), p(o, o_);
      const n = t.plutuswitness_new(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
      return B.__wrap(n);
    }
    static new_with_ref(_, r, o) {
      p(_, vr), p(r, Ur), p(o, o_);
      const n = t.plutuswitness_new_with_ref(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
      return B.__wrap(n);
    }
    static new_without_datum(_, r) {
      p(_, W), p(r, o_);
      const o = t.plutuswitness_new_without_datum(_.__wbg_ptr, r.__wbg_ptr);
      return B.__wrap(o);
    }
    static new_with_ref_without_datum(_, r) {
      p(_, vr), p(r, o_);
      const o = t.plutuswitness_new_with_ref_without_datum(_.__wbg_ptr, r.__wbg_ptr);
      return B.__wrap(o);
    }
    script() {
      const _ = t.plutuswitness_script(this.__wbg_ptr);
      return _ === 0 ? void 0 : W.__wrap(_);
    }
    datum() {
      const _ = t.plutuswitness_datum(this.__wbg_ptr);
      return _ === 0 ? void 0 : R.__wrap(_);
    }
    redeemer() {
      const _ = t.plutuswitness_redeemer(this.__wbg_ptr);
      return o_.__wrap(_);
    }
  };
  const ha = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_plutuswitnesses_free(w >>> 0));
  H_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(H_.prototype);
      return r.__wbg_ptr = _, ha.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ha.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_plutuswitnesses_free(_);
    }
    static new() {
      const _ = t.fixedtransactionbodies_new();
      return H_.__wrap(_);
    }
    len() {
      return t.plutuswitnesses_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.plutuswitnesses_get(this.__wbg_ptr, _);
      return B.__wrap(r);
    }
    add(_) {
      p(_, B), t.plutuswitnesses_add(this.__wbg_ptr, _.__wbg_ptr);
    }
  };
  const ya = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_pointer_free(w >>> 0));
  Jr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Jr.prototype);
      return r.__wbg_ptr = _, ya.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ya.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_pointer_free(_);
    }
    static new(_, r, o) {
      const n = t.pointer_new(_, r, o);
      return Jr.__wrap(n);
    }
    static new_pointer(_, r, o) {
      p(_, h), p(r, h), p(o, h);
      const n = t.pointer_new_pointer(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
      return Jr.__wrap(n);
    }
    slot() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.pointer_slot(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return _ >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    tx_index() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.pointer_tx_index(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return _ >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    cert_index() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.pointer_cert_index(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return _ >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    slot_bignum() {
      const _ = t.pointer_slot_bignum(this.__wbg_ptr);
      return h.__wrap(_);
    }
    tx_index_bignum() {
      const _ = t.pointer_tx_index_bignum(this.__wbg_ptr);
      return h.__wrap(_);
    }
    cert_index_bignum() {
      const _ = t.pointer_cert_index_bignum(this.__wbg_ptr);
      return h.__wrap(_);
    }
  };
  const va = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_pointeraddress_free(w >>> 0));
  ee = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(ee.prototype);
      return r.__wbg_ptr = _, va.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, va.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_pointeraddress_free(_);
    }
    static new(_, r, o) {
      p(r, k), p(o, Jr);
      const n = t.pointeraddress_new(_, r.__wbg_ptr, o.__wbg_ptr);
      return ee.__wrap(n);
    }
    payment_cred() {
      const _ = t.pointeraddress_payment_cred(this.__wbg_ptr);
      return k.__wrap(_);
    }
    stake_pointer() {
      const _ = t.pointeraddress_stake_pointer(this.__wbg_ptr);
      return Jr.__wrap(_);
    }
    to_address() {
      const _ = t.pointeraddress_to_address(this.__wbg_ptr);
      return $.__wrap(_);
    }
    static from_address(_) {
      p(_, $);
      const r = t.pointeraddress_from_address(_.__wbg_ptr);
      return r === 0 ? void 0 : ee.__wrap(r);
    }
    network_id() {
      return t.pointeraddress_network_id(this.__wbg_ptr);
    }
  };
  const ma = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_poolmetadata_free(w >>> 0));
  Xt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Xt.prototype);
      return r.__wbg_ptr = _, ma.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ma.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_poolmetadata_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolmetadata_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.poolmetadata_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Xt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolmetadata_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.poolmetadata_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Xt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolmetadata_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolmetadata_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.poolmetadata_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Xt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    url() {
      const _ = t.multihostname_dns_name(this.__wbg_ptr);
      return ae.__wrap(_);
    }
    pool_metadata_hash() {
      const _ = t.poolmetadata_pool_metadata_hash(this.__wbg_ptr);
      return yr.__wrap(_);
    }
    static new(_, r) {
      p(_, ae), p(r, yr);
      const o = t.poolmetadata_new(_.__wbg_ptr, r.__wbg_ptr);
      return Xt.__wrap(o);
    }
  };
  const ka = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_poolmetadatahash_free(w >>> 0));
  yr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(yr.prototype);
      return r.__wbg_ptr = _, ka.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ka.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_poolmetadatahash_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.poolmetadatahash_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return yr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(_) {
      let r, o;
      try {
        const v = t.__wbindgen_add_to_stack_pointer(-16), j = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), x = b;
        t.anchordatahash_to_bech32(v, this.__wbg_ptr, j, x);
        var n = a()[v / 4 + 0], e = a()[v / 4 + 1], s = a()[v / 4 + 2], i = a()[v / 4 + 3], g = n, c = e;
        if (i) throw g = 0, c = 0, d(s);
        return r = g, o = c, f(g, c);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.poolmetadatahash_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return yr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.poolmetadatahash_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return yr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const ja = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_poolparams_free(w >>> 0));
  Zt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Zt.prototype);
      return r.__wbg_ptr = _, ja.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ja.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_poolparams_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolparams_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.poolparams_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Zt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolparams_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.poolparams_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Zt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolparams_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolparams_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.poolparams_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Zt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    operator() {
      const _ = t.poolparams_operator(this.__wbg_ptr);
      return O.__wrap(_);
    }
    vrf_keyhash() {
      const _ = t.poolparams_vrf_keyhash(this.__wbg_ptr);
      return ft.__wrap(_);
    }
    pledge() {
      const _ = t.poolparams_pledge(this.__wbg_ptr);
      return h.__wrap(_);
    }
    cost() {
      const _ = t.poolparams_cost(this.__wbg_ptr);
      return h.__wrap(_);
    }
    margin() {
      const _ = t.poolparams_margin(this.__wbg_ptr);
      return m.__wrap(_);
    }
    reward_account() {
      const _ = t.poolparams_reward_account(this.__wbg_ptr);
      return D.__wrap(_);
    }
    pool_owners() {
      const _ = t.poolparams_pool_owners(this.__wbg_ptr);
      return V.__wrap(_);
    }
    relays() {
      const _ = t.poolparams_relays(this.__wbg_ptr);
      return Wt.__wrap(_);
    }
    pool_metadata() {
      const _ = t.poolparams_pool_metadata(this.__wbg_ptr);
      return _ === 0 ? void 0 : Xt.__wrap(_);
    }
    static new(_, r, o, n, e, s, i, g, c) {
      p(_, O), p(r, ft), p(o, h), p(n, h), p(e, m), p(s, D), p(i, V), p(g, Wt);
      let v = 0;
      p_(c) || (p(c, Xt), v = c.__destroy_into_raw());
      const j = t.poolparams_new(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr, n.__wbg_ptr, e.__wbg_ptr, s.__wbg_ptr, i.__wbg_ptr, g.__wbg_ptr, v);
      return Zt.__wrap(j);
    }
  };
  const xa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_poolregistration_free(w >>> 0));
  Ut = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Ut.prototype);
      return r.__wbg_ptr = _, xa.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, xa.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_poolregistration_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolregistration_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.poolregistration_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Ut.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolregistration_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.poolregistration_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Ut.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolregistration_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolregistration_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.poolregistration_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Ut.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    pool_params() {
      const _ = t.poolregistration_pool_params(this.__wbg_ptr);
      return Zt.__wrap(_);
    }
    static new(_) {
      p(_, Zt);
      const r = t.poolregistration_new(_.__wbg_ptr);
      return Ut.__wrap(r);
    }
  };
  const za = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_poolretirement_free(w >>> 0));
  Et = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Et.prototype);
      return r.__wbg_ptr = _, za.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, za.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_poolretirement_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolretirement_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.poolretirement_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Et.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolretirement_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.poolretirement_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Et.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolretirement_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolretirement_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.poolretirement_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Et.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    pool_keyhash() {
      const _ = t.poolretirement_pool_keyhash(this.__wbg_ptr);
      return O.__wrap(_);
    }
    epoch() {
      return t.poolretirement_epoch(this.__wbg_ptr) >>> 0;
    }
    static new(_, r) {
      p(_, O);
      const o = t.poolretirement_new(_.__wbg_ptr, r);
      return Et.__wrap(o);
    }
  };
  const Fa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_poolvotingthresholds_free(w >>> 0));
  Kt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Kt.prototype);
      return r.__wbg_ptr = _, Fa.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Fa.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_poolvotingthresholds_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolvotingthresholds_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.poolvotingthresholds_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Kt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolvotingthresholds_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.poolvotingthresholds_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Kt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolvotingthresholds_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.poolvotingthresholds_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.poolvotingthresholds_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Kt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_, r, o, n, e) {
      p(_, m), p(r, m), p(o, m), p(n, m), p(e, m);
      const s = t.poolvotingthresholds_new(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr, n.__wbg_ptr, e.__wbg_ptr);
      return Kt.__wrap(s);
    }
    motion_no_confidence() {
      const _ = t.drepvotingthresholds_motion_no_confidence(this.__wbg_ptr);
      return m.__wrap(_);
    }
    committee_normal() {
      const _ = t.drepvotingthresholds_committee_normal(this.__wbg_ptr);
      return m.__wrap(_);
    }
    committee_no_confidence() {
      const _ = t.drepvotingthresholds_committee_no_confidence(this.__wbg_ptr);
      return m.__wrap(_);
    }
    hard_fork_initiation() {
      const _ = t.drepvotingthresholds_update_constitution(this.__wbg_ptr);
      return m.__wrap(_);
    }
    security_relevant_threshold() {
      const _ = t.drepvotingthresholds_hard_fork_initiation(this.__wbg_ptr);
      return m.__wrap(_);
    }
  };
  const Ra = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_privatekey_free(w >>> 0));
  v_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(v_.prototype);
      return r.__wbg_ptr = _, Ra.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ra.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_privatekey_free(_);
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.privatekey_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return v_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.privatekey_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    sign(_) {
      const r = u(_, t.__wbindgen_malloc), o = b, n = t.privatekey_sign(this.__wbg_ptr, r, o);
      return c_.__wrap(n);
    }
    static from_normal_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.privatekey_from_normal_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return v_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_extended_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.privatekey_from_extended_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return v_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.privatekey_as_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.privatekey_to_bech32(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.privatekey_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return v_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static generate_ed25519extended() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.privatekey_generate_ed25519extended(n);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return v_.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static generate_ed25519() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.privatekey_generate_ed25519(n);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return v_.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_public() {
      const _ = t.privatekey_to_public(this.__wbg_ptr);
      return Q_.__wrap(_);
    }
  };
  const Oa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_proposedprotocolparameterupdates_free(w >>> 0));
  St = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(St.prototype);
      return r.__wbg_ptr = _, Oa.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Oa.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_proposedprotocolparameterupdates_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.proposedprotocolparameterupdates_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.proposedprotocolparameterupdates_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return St.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.proposedprotocolparameterupdates_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.proposedprotocolparameterupdates_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return St.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.proposedprotocolparameterupdates_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.proposedprotocolparameterupdates_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.proposedprotocolparameterupdates_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return St.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.auxiliarydataset_new();
      return St.__wrap(_);
    }
    len() {
      return t.auxiliarydataset_len(this.__wbg_ptr) >>> 0;
    }
    insert(_, r) {
      p(_, Y_), p(r, n_);
      const o = t.proposedprotocolparameterupdates_insert(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
      return o === 0 ? void 0 : n_.__wrap(o);
    }
    get(_) {
      p(_, Y_);
      const r = t.proposedprotocolparameterupdates_get(this.__wbg_ptr, _.__wbg_ptr);
      return r === 0 ? void 0 : n_.__wrap(r);
    }
    keys() {
      const _ = t.proposedprotocolparameterupdates_keys(this.__wbg_ptr);
      return pr.__wrap(_);
    }
  };
  const qa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_protocolparamupdate_free(w >>> 0));
  n_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(n_.prototype);
      return r.__wbg_ptr = _, qa.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, qa.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_protocolparamupdate_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolparamupdate_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.protocolparamupdate_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return n_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolparamupdate_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.protocolparamupdate_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return n_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolparamupdate_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolparamupdate_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.protocolparamupdate_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return n_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_minfee_a(_) {
      p(_, h), t.protocolparamupdate_set_minfee_a(this.__wbg_ptr, _.__wbg_ptr);
    }
    minfee_a() {
      const _ = t.protocolparamupdate_minfee_a(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    set_minfee_b(_) {
      p(_, h), t.protocolparamupdate_set_minfee_b(this.__wbg_ptr, _.__wbg_ptr);
    }
    minfee_b() {
      const _ = t.protocolparamupdate_minfee_b(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    set_max_block_body_size(_) {
      t.protocolparamupdate_set_max_block_body_size(this.__wbg_ptr, _);
    }
    max_block_body_size() {
      try {
        const o = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolparamupdate_max_block_body_size(o, this.__wbg_ptr);
        var _ = a()[o / 4 + 0], r = a()[o / 4 + 1];
        return _ === 0 ? void 0 : r >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_max_tx_size(_) {
      t.protocolparamupdate_set_max_tx_size(this.__wbg_ptr, _);
    }
    max_tx_size() {
      try {
        const o = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolparamupdate_max_tx_size(o, this.__wbg_ptr);
        var _ = a()[o / 4 + 0], r = a()[o / 4 + 1];
        return _ === 0 ? void 0 : r >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_max_block_header_size(_) {
      t.protocolparamupdate_set_max_block_header_size(this.__wbg_ptr, _);
    }
    max_block_header_size() {
      try {
        const o = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolparamupdate_max_block_header_size(o, this.__wbg_ptr);
        var _ = a()[o / 4 + 0], r = a()[o / 4 + 1];
        return _ === 0 ? void 0 : r >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_key_deposit(_) {
      p(_, h), t.protocolparamupdate_set_key_deposit(this.__wbg_ptr, _.__wbg_ptr);
    }
    key_deposit() {
      const _ = t.protocolparamupdate_key_deposit(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    set_pool_deposit(_) {
      p(_, h), t.protocolparamupdate_set_pool_deposit(this.__wbg_ptr, _.__wbg_ptr);
    }
    pool_deposit() {
      const _ = t.protocolparamupdate_pool_deposit(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    set_max_epoch(_) {
      t.protocolparamupdate_set_max_epoch(this.__wbg_ptr, _);
    }
    max_epoch() {
      try {
        const o = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolparamupdate_max_epoch(o, this.__wbg_ptr);
        var _ = a()[o / 4 + 0], r = a()[o / 4 + 1];
        return _ === 0 ? void 0 : r >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_n_opt(_) {
      t.protocolparamupdate_set_n_opt(this.__wbg_ptr, _);
    }
    n_opt() {
      try {
        const o = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolparamupdate_n_opt(o, this.__wbg_ptr);
        var _ = a()[o / 4 + 0], r = a()[o / 4 + 1];
        return _ === 0 ? void 0 : r >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_pool_pledge_influence(_) {
      p(_, m), t.protocolparamupdate_set_pool_pledge_influence(this.__wbg_ptr, _.__wbg_ptr);
    }
    pool_pledge_influence() {
      const _ = t.protocolparamupdate_pool_pledge_influence(this.__wbg_ptr);
      return _ === 0 ? void 0 : m.__wrap(_);
    }
    set_expansion_rate(_) {
      p(_, m), t.protocolparamupdate_set_expansion_rate(this.__wbg_ptr, _.__wbg_ptr);
    }
    expansion_rate() {
      const _ = t.protocolparamupdate_expansion_rate(this.__wbg_ptr);
      return _ === 0 ? void 0 : m.__wrap(_);
    }
    set_treasury_growth_rate(_) {
      p(_, m), t.protocolparamupdate_set_treasury_growth_rate(this.__wbg_ptr, _.__wbg_ptr);
    }
    treasury_growth_rate() {
      const _ = t.protocolparamupdate_treasury_growth_rate(this.__wbg_ptr);
      return _ === 0 ? void 0 : m.__wrap(_);
    }
    d() {
      const _ = t.protocolparamupdate_d(this.__wbg_ptr);
      return _ === 0 ? void 0 : m.__wrap(_);
    }
    extra_entropy() {
      const _ = t.protocolparamupdate_extra_entropy(this.__wbg_ptr);
      return _ === 0 ? void 0 : ht.__wrap(_);
    }
    set_protocol_version(_) {
      p(_, a_), t.protocolparamupdate_set_protocol_version(this.__wbg_ptr, _.__wbg_ptr);
    }
    protocol_version() {
      const _ = t.protocolparamupdate_protocol_version(this.__wbg_ptr);
      return _ === 0 ? void 0 : a_.__wrap(_);
    }
    set_min_pool_cost(_) {
      p(_, h), t.protocolparamupdate_set_min_pool_cost(this.__wbg_ptr, _.__wbg_ptr);
    }
    min_pool_cost() {
      const _ = t.protocolparamupdate_min_pool_cost(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    set_ada_per_utxo_byte(_) {
      p(_, h), t.protocolparamupdate_set_ada_per_utxo_byte(this.__wbg_ptr, _.__wbg_ptr);
    }
    ada_per_utxo_byte() {
      const _ = t.protocolparamupdate_ada_per_utxo_byte(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    set_cost_models(_) {
      p(_, m_), t.protocolparamupdate_set_cost_models(this.__wbg_ptr, _.__wbg_ptr);
    }
    cost_models() {
      const _ = t.protocolparamupdate_cost_models(this.__wbg_ptr);
      return _ === 0 ? void 0 : m_.__wrap(_);
    }
    set_execution_costs(_) {
      p(_, F_), t.protocolparamupdate_set_execution_costs(this.__wbg_ptr, _.__wbg_ptr);
    }
    execution_costs() {
      const _ = t.protocolparamupdate_execution_costs(this.__wbg_ptr);
      return _ === 0 ? void 0 : F_.__wrap(_);
    }
    set_max_tx_ex_units(_) {
      p(_, e_), t.protocolparamupdate_set_max_tx_ex_units(this.__wbg_ptr, _.__wbg_ptr);
    }
    max_tx_ex_units() {
      const _ = t.protocolparamupdate_max_tx_ex_units(this.__wbg_ptr);
      return _ === 0 ? void 0 : e_.__wrap(_);
    }
    set_max_block_ex_units(_) {
      p(_, e_), t.protocolparamupdate_set_max_block_ex_units(this.__wbg_ptr, _.__wbg_ptr);
    }
    max_block_ex_units() {
      const _ = t.protocolparamupdate_max_block_ex_units(this.__wbg_ptr);
      return _ === 0 ? void 0 : e_.__wrap(_);
    }
    set_max_value_size(_) {
      t.protocolparamupdate_set_max_value_size(this.__wbg_ptr, _);
    }
    max_value_size() {
      try {
        const o = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolparamupdate_max_value_size(o, this.__wbg_ptr);
        var _ = a()[o / 4 + 0], r = a()[o / 4 + 1];
        return _ === 0 ? void 0 : r >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_collateral_percentage(_) {
      t.protocolparamupdate_set_collateral_percentage(this.__wbg_ptr, _);
    }
    collateral_percentage() {
      try {
        const o = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolparamupdate_collateral_percentage(o, this.__wbg_ptr);
        var _ = a()[o / 4 + 0], r = a()[o / 4 + 1];
        return _ === 0 ? void 0 : r >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_max_collateral_inputs(_) {
      t.protocolparamupdate_set_max_collateral_inputs(this.__wbg_ptr, _);
    }
    max_collateral_inputs() {
      try {
        const o = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolparamupdate_max_collateral_inputs(o, this.__wbg_ptr);
        var _ = a()[o / 4 + 0], r = a()[o / 4 + 1];
        return _ === 0 ? void 0 : r >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_pool_voting_thresholds(_) {
      p(_, Kt), t.protocolparamupdate_set_pool_voting_thresholds(this.__wbg_ptr, _.__wbg_ptr);
    }
    pool_voting_thresholds() {
      const _ = t.protocolparamupdate_pool_voting_thresholds(this.__wbg_ptr);
      return _ === 0 ? void 0 : Kt.__wrap(_);
    }
    set_drep_voting_thresholds(_) {
      p(_, Ot), t.protocolparamupdate_set_drep_voting_thresholds(this.__wbg_ptr, _.__wbg_ptr);
    }
    drep_voting_thresholds() {
      const _ = t.protocolparamupdate_drep_voting_thresholds(this.__wbg_ptr);
      return _ === 0 ? void 0 : Ot.__wrap(_);
    }
    set_min_committee_size(_) {
      t.protocolparamupdate_set_min_committee_size(this.__wbg_ptr, _);
    }
    min_committee_size() {
      try {
        const o = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolparamupdate_min_committee_size(o, this.__wbg_ptr);
        var _ = a()[o / 4 + 0], r = a()[o / 4 + 1];
        return _ === 0 ? void 0 : r >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_committee_term_limit(_) {
      t.protocolparamupdate_set_committee_term_limit(this.__wbg_ptr, _);
    }
    committee_term_limit() {
      try {
        const o = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolparamupdate_committee_term_limit(o, this.__wbg_ptr);
        var _ = a()[o / 4 + 0], r = a()[o / 4 + 1];
        return _ === 0 ? void 0 : r >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_governance_action_validity_period(_) {
      t.protocolparamupdate_set_governance_action_validity_period(this.__wbg_ptr, _);
    }
    governance_action_validity_period() {
      try {
        const o = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolparamupdate_governance_action_validity_period(o, this.__wbg_ptr);
        var _ = a()[o / 4 + 0], r = a()[o / 4 + 1];
        return _ === 0 ? void 0 : r >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_governance_action_deposit(_) {
      p(_, h), t.protocolparamupdate_set_governance_action_deposit(this.__wbg_ptr, _.__wbg_ptr);
    }
    governance_action_deposit() {
      const _ = t.protocolparamupdate_governance_action_deposit(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    set_drep_deposit(_) {
      p(_, h), t.protocolparamupdate_set_drep_deposit(this.__wbg_ptr, _.__wbg_ptr);
    }
    drep_deposit() {
      const _ = t.protocolparamupdate_drep_deposit(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    set_drep_inactivity_period(_) {
      t.protocolparamupdate_set_drep_inactivity_period(this.__wbg_ptr, _);
    }
    drep_inactivity_period() {
      try {
        const o = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolparamupdate_drep_inactivity_period(o, this.__wbg_ptr);
        var _ = a()[o / 4 + 0], r = a()[o / 4 + 1];
        return _ === 0 ? void 0 : r >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_ref_script_coins_per_byte(_) {
      p(_, m), t.protocolparamupdate_set_ref_script_coins_per_byte(this.__wbg_ptr, _.__wbg_ptr);
    }
    ref_script_coins_per_byte() {
      const _ = t.protocolparamupdate_ref_script_coins_per_byte(this.__wbg_ptr);
      return _ === 0 ? void 0 : m.__wrap(_);
    }
    static new() {
      const _ = t.protocolparamupdate_new();
      return n_.__wrap(_);
    }
  };
  const $a = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_protocolversion_free(w >>> 0));
  a_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(a_.prototype);
      return r.__wbg_ptr = _, $a.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, $a.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_protocolversion_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolversion_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.protocolversion_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return a_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolversion_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.protocolversion_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return a_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolversion_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.protocolversion_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.protocolversion_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return a_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    major() {
      return t.protocolversion_major(this.__wbg_ptr) >>> 0;
    }
    minor() {
      return t.protocolversion_minor(this.__wbg_ptr) >>> 0;
    }
    static new(_, r) {
      const o = t.protocolversion_new(_, r);
      return a_.__wrap(o);
    }
  };
  const La = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_publickey_free(w >>> 0));
  Q_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Q_.prototype);
      return r.__wbg_ptr = _, La.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, La.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_publickey_free(_);
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.publickey_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Q_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.publickey_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    hash() {
      const _ = t.publickey_hash(this.__wbg_ptr);
      return O.__wrap(_);
    }
    verify(_, r) {
      const o = u(_, t.__wbindgen_malloc), n = b;
      return p(r, c_), t.publickey_verify(this.__wbg_ptr, o, n, r.__wbg_ptr) !== 0;
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.publickey_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Q_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.publickey_as_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.publickey_to_bech32(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.publickey_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Q_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const fi = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_publickeys_free(w >>> 0));
  sH = class {
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, fi.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_publickeys_free(_);
    }
    constructor() {
      const _ = t.publickeys_new();
      return this.__wbg_ptr = _ >>> 0, this;
    }
    size() {
      return t.publickeys_size(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.publickeys_get(this.__wbg_ptr, _);
      return Q_.__wrap(r);
    }
    add(_) {
      p(_, Q_), t.publickeys_add(this.__wbg_ptr, _.__wbg_ptr);
    }
  };
  const Ja = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_redeemer_free(w >>> 0));
  o_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(o_.prototype);
      return r.__wbg_ptr = _, Ja.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ja.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_redeemer_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.redeemer_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.redeemer_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return o_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.redeemer_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.redeemer_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return o_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.redeemer_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.redeemer_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.redeemer_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return o_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    tag() {
      const _ = t.redeemer_tag(this.__wbg_ptr);
      return d_.__wrap(_);
    }
    index() {
      const _ = t.redeemer_index(this.__wbg_ptr);
      return h.__wrap(_);
    }
    data() {
      const _ = t.redeemer_data(this.__wbg_ptr);
      return R.__wrap(_);
    }
    ex_units() {
      const _ = t.redeemer_ex_units(this.__wbg_ptr);
      return e_.__wrap(_);
    }
    static new(_, r, o, n) {
      p(_, d_), p(r, h), p(o, R), p(n, e_);
      const e = t.redeemer_new(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr, n.__wbg_ptr);
      return o_.__wrap(e);
    }
  };
  const Ya = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_redeemertag_free(w >>> 0));
  d_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(d_.prototype);
      return r.__wbg_ptr = _, Ya.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ya.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_redeemertag_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.redeemertag_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.redeemertag_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return d_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.redeemertag_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.redeemertag_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return d_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.redeemertag_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.redeemertag_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.redeemertag_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return d_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_spend() {
      const _ = t.redeemertag_new_spend();
      return d_.__wrap(_);
    }
    static new_mint() {
      const _ = t.redeemertag_new_mint();
      return d_.__wrap(_);
    }
    static new_cert() {
      const _ = t.redeemertag_new_cert();
      return d_.__wrap(_);
    }
    static new_reward() {
      const _ = t.redeemertag_new_reward();
      return d_.__wrap(_);
    }
    static new_vote() {
      const _ = t.redeemertag_new_vote();
      return d_.__wrap(_);
    }
    static new_voting_proposal() {
      const _ = t.redeemertag_new_voting_proposal();
      return d_.__wrap(_);
    }
    kind() {
      return t.redeemertag_kind(this.__wbg_ptr);
    }
  };
  const Qa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_redeemers_free(w >>> 0));
  S_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(S_.prototype);
      return r.__wbg_ptr = _, Qa.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Qa.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_redeemers_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.redeemers_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.redeemers_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return S_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.redeemers_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.redeemers_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return S_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.redeemers_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.redeemers_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.redeemers_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return S_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.redeemers_new();
      return S_.__wrap(_);
    }
    len() {
      return t.redeemers_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.redeemers_get(this.__wbg_ptr, _);
      return o_.__wrap(r);
    }
    add(_) {
      p(_, o_), t.redeemers_add(this.__wbg_ptr, _.__wbg_ptr);
    }
    get_container_type() {
      return t.redeemers_get_container_type(this.__wbg_ptr);
    }
    total_ex_units() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.redeemers_total_ex_units(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return e_.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Xa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_relay_free(w >>> 0));
  X_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(X_.prototype);
      return r.__wbg_ptr = _, Xa.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Xa.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_relay_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.relay_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.relay_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return X_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.relay_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.relay_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return X_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.relay_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.relay_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.relay_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return X_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_single_host_addr(_) {
      p(_, Tt);
      const r = t.relay_new_single_host_addr(_.__wbg_ptr);
      return X_.__wrap(r);
    }
    static new_single_host_name(_) {
      p(_, Nt);
      const r = t.relay_new_single_host_name(_.__wbg_ptr);
      return X_.__wrap(r);
    }
    static new_multi_host_name(_) {
      p(_, Qt);
      const r = t.relay_new_multi_host_name(_.__wbg_ptr);
      return X_.__wrap(r);
    }
    kind() {
      return t.relay_kind(this.__wbg_ptr);
    }
    as_single_host_addr() {
      const _ = t.relay_as_single_host_addr(this.__wbg_ptr);
      return _ === 0 ? void 0 : Tt.__wrap(_);
    }
    as_single_host_name() {
      const _ = t.relay_as_single_host_name(this.__wbg_ptr);
      return _ === 0 ? void 0 : Nt.__wrap(_);
    }
    as_multi_host_name() {
      const _ = t.relay_as_multi_host_name(this.__wbg_ptr);
      return _ === 0 ? void 0 : Qt.__wrap(_);
    }
  };
  const Za = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_relays_free(w >>> 0));
  Wt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Wt.prototype);
      return r.__wbg_ptr = _, Za.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Za.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_relays_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.relays_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.relays_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Wt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.relays_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.relays_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Wt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.relays_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.relays_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.relays_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Wt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.relays_new();
      return Wt.__wrap(_);
    }
    len() {
      return t.relays_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.relays_get(this.__wbg_ptr, _);
      return X_.__wrap(r);
    }
    add(_) {
      p(_, X_), t.relays_add(this.__wbg_ptr, _.__wbg_ptr);
    }
  };
  const Ua = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_rewardaddress_free(w >>> 0));
  D = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(D.prototype);
      return r.__wbg_ptr = _, Ua.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ua.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_rewardaddress_free(_);
    }
    static new(_, r) {
      p(r, k);
      const o = t.enterpriseaddress_new(_, r.__wbg_ptr);
      return D.__wrap(o);
    }
    payment_cred() {
      const _ = t.baseaddress_payment_cred(this.__wbg_ptr);
      return k.__wrap(_);
    }
    to_address() {
      const _ = t.rewardaddress_to_address(this.__wbg_ptr);
      return $.__wrap(_);
    }
    static from_address(_) {
      p(_, $);
      const r = t.rewardaddress_from_address(_.__wbg_ptr);
      return r === 0 ? void 0 : D.__wrap(r);
    }
    network_id() {
      return t.enterpriseaddress_network_id(this.__wbg_ptr);
    }
  };
  const Ea = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_rewardaddresses_free(w >>> 0));
  Mt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Mt.prototype);
      return r.__wbg_ptr = _, Ea.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ea.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_rewardaddresses_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.rewardaddresses_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.rewardaddresses_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Mt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.rewardaddresses_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.rewardaddresses_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Mt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.rewardaddresses_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.rewardaddresses_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.rewardaddresses_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Mt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.genesishashes_new();
      return Mt.__wrap(_);
    }
    len() {
      return t.rewardaddresses_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.rewardaddresses_get(this.__wbg_ptr, _);
      return D.__wrap(r);
    }
    add(_) {
      p(_, D), t.rewardaddresses_add(this.__wbg_ptr, _.__wbg_ptr);
    }
  };
  const Ka = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_scriptall_free(w >>> 0));
  Gt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Gt.prototype);
      return r.__wbg_ptr = _, Ka.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ka.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_scriptall_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptall_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.scriptall_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Gt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptall_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.scriptall_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Gt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptall_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptall_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.scriptall_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Gt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    native_scripts() {
      const _ = t.scriptall_native_scripts(this.__wbg_ptr);
      return U.__wrap(_);
    }
    static new(_) {
      p(_, U);
      const r = t.scriptall_new(_.__wbg_ptr);
      return Gt.__wrap(r);
    }
  };
  const Sa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_scriptany_free(w >>> 0));
  Ht = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Ht.prototype);
      return r.__wbg_ptr = _, Sa.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Sa.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_scriptany_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptany_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.scriptany_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Ht.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptany_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.scriptany_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Ht.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptany_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptany_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.scriptany_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Ht.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    native_scripts() {
      const _ = t.scriptall_native_scripts(this.__wbg_ptr);
      return U.__wrap(_);
    }
    static new(_) {
      p(_, U);
      const r = t.scriptall_new(_.__wbg_ptr);
      return Ht.__wrap(r);
    }
  };
  const Wa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_scriptdatahash_free(w >>> 0));
  lt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(lt.prototype);
      return r.__wbg_ptr = _, Wa.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Wa.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_scriptdatahash_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.scriptdatahash_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return lt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(_) {
      let r, o;
      try {
        const v = t.__wbindgen_add_to_stack_pointer(-16), j = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), x = b;
        t.anchordatahash_to_bech32(v, this.__wbg_ptr, j, x);
        var n = a()[v / 4 + 0], e = a()[v / 4 + 1], s = a()[v / 4 + 2], i = a()[v / 4 + 3], g = n, c = e;
        if (i) throw g = 0, c = 0, d(s);
        return r = g, o = c, f(g, c);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.scriptdatahash_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return lt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.scriptdatahash_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return lt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Ma = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_scripthash_free(w >>> 0));
  Y = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Y.prototype);
      return r.__wbg_ptr = _, Ma.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ma.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_scripthash_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.scripthash_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Y.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.ed25519keyhash_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(_) {
      let r, o;
      try {
        const v = t.__wbindgen_add_to_stack_pointer(-16), j = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), x = b;
        t.ed25519keyhash_to_bech32(v, this.__wbg_ptr, j, x);
        var n = a()[v / 4 + 0], e = a()[v / 4 + 1], s = a()[v / 4 + 2], i = a()[v / 4 + 3], g = n, c = e;
        if (i) throw g = 0, c = 0, d(s);
        return r = g, o = c, f(g, c);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.scripthash_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Y.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.ed25519keyhash_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.scripthash_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Y.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Ga = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_scripthashes_free(w >>> 0));
  At = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(At.prototype);
      return r.__wbg_ptr = _, Ga.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ga.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_scripthashes_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.scripthashes_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.scripthashes_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return At.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.scripthashes_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.scripthashes_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return At.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.scripthashes_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.scripthashes_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.scripthashes_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return At.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.genesishashes_new();
      return At.__wrap(_);
    }
    len() {
      return t.genesishashes_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.scripthashes_get(this.__wbg_ptr, _);
      return Y.__wrap(r);
    }
    add(_) {
      p(_, Y), t.scripthashes_add(this.__wbg_ptr, _.__wbg_ptr);
    }
  };
  const Ha = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_scriptnofk_free(w >>> 0));
  It = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(It.prototype);
      return r.__wbg_ptr = _, Ha.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ha.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_scriptnofk_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptnofk_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.scriptnofk_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return It.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptnofk_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.scriptnofk_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return It.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptnofk_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptnofk_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.scriptnofk_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return It.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    n() {
      return t.scriptnofk_n(this.__wbg_ptr) >>> 0;
    }
    native_scripts() {
      const _ = t.scriptall_native_scripts(this.__wbg_ptr);
      return U.__wrap(_);
    }
    static new(_, r) {
      p(r, U);
      const o = t.scriptnofk_new(_, r.__wbg_ptr);
      return It.__wrap(o);
    }
  };
  const Aa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_scriptpubkey_free(w >>> 0));
  Dt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Dt.prototype);
      return r.__wbg_ptr = _, Aa.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Aa.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_scriptpubkey_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptpubkey_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.scriptpubkey_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Dt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptpubkey_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.scriptpubkey_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Dt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptpubkey_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptpubkey_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.scriptpubkey_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Dt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    addr_keyhash() {
      const _ = t.scriptpubkey_addr_keyhash(this.__wbg_ptr);
      return O.__wrap(_);
    }
    static new(_) {
      p(_, O);
      const r = t.scriptpubkey_new(_.__wbg_ptr);
      return Dt.__wrap(r);
    }
  };
  const Ia = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_scriptref_free(w >>> 0));
  k_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(k_.prototype);
      return r.__wbg_ptr = _, Ia.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ia.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_scriptref_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptref_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.scriptref_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return k_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptref_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.scriptref_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return k_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptref_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptref_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.scriptref_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return k_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_native_script(_) {
      p(_, S);
      const r = t.scriptref_new_native_script(_.__wbg_ptr);
      return k_.__wrap(r);
    }
    static new_plutus_script(_) {
      p(_, W);
      const r = t.scriptref_new_plutus_script(_.__wbg_ptr);
      return k_.__wrap(r);
    }
    is_native_script() {
      return t.scriptref_is_native_script(this.__wbg_ptr) !== 0;
    }
    is_plutus_script() {
      return t.scriptref_is_plutus_script(this.__wbg_ptr) !== 0;
    }
    native_script() {
      const _ = t.scriptref_native_script(this.__wbg_ptr);
      return _ === 0 ? void 0 : S.__wrap(_);
    }
    plutus_script() {
      const _ = t.scriptref_plutus_script(this.__wbg_ptr);
      return _ === 0 ? void 0 : W.__wrap(_);
    }
    to_unwrapped_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.scriptref_to_unwrapped_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Da = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_singlehostaddr_free(w >>> 0));
  Tt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Tt.prototype);
      return r.__wbg_ptr = _, Da.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Da.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_singlehostaddr_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.singlehostaddr_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.singlehostaddr_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Tt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.singlehostaddr_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.singlehostaddr_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Tt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.singlehostaddr_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.singlehostaddr_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.singlehostaddr_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Tt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    port() {
      const _ = t.singlehostaddr_port(this.__wbg_ptr);
      return _ === 16777215 ? void 0 : _;
    }
    ipv4() {
      const _ = t.singlehostaddr_ipv4(this.__wbg_ptr);
      return _ === 0 ? void 0 : $t.__wrap(_);
    }
    ipv6() {
      const _ = t.singlehostaddr_ipv6(this.__wbg_ptr);
      return _ === 0 ? void 0 : Lt.__wrap(_);
    }
    static new(_, r, o) {
      let n = 0;
      p_(r) || (p(r, $t), n = r.__destroy_into_raw());
      let e = 0;
      p_(o) || (p(o, Lt), e = o.__destroy_into_raw());
      const s = t.singlehostaddr_new(p_(_) ? 16777215 : _, n, e);
      return Tt.__wrap(s);
    }
  };
  const Ta = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_singlehostname_free(w >>> 0));
  Nt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Nt.prototype);
      return r.__wbg_ptr = _, Ta.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ta.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_singlehostname_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.singlehostname_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.singlehostname_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Nt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.singlehostname_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.singlehostname_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Nt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.singlehostname_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.singlehostname_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.singlehostname_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Nt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    port() {
      const _ = t.singlehostname_port(this.__wbg_ptr);
      return _ === 16777215 ? void 0 : _;
    }
    dns_name() {
      const _ = t.multihostname_dns_name(this.__wbg_ptr);
      return zt.__wrap(_);
    }
    static new(_, r) {
      p(r, zt);
      const o = t.singlehostname_new(p_(_) ? 16777215 : _, r.__wbg_ptr);
      return Nt.__wrap(o);
    }
  };
  const Na = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_stakeandvotedelegation_free(w >>> 0));
  Ct = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Ct.prototype);
      return r.__wbg_ptr = _, Na.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Na.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_stakeandvotedelegation_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakeandvotedelegation_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.stakeandvotedelegation_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Ct.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakeandvotedelegation_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.stakeandvotedelegation_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Ct.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakeandvotedelegation_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakeandvotedelegation_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.stakeandvotedelegation_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Ct.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    stake_credential() {
      const _ = t.committeehotauth_committee_cold_credential(this.__wbg_ptr);
      return k.__wrap(_);
    }
    pool_keyhash() {
      const _ = t.stakeandvotedelegation_pool_keyhash(this.__wbg_ptr);
      return O.__wrap(_);
    }
    drep() {
      const _ = t.stakeandvotedelegation_drep(this.__wbg_ptr);
      return G.__wrap(_);
    }
    static new(_, r, o) {
      p(_, k), p(r, O), p(o, G);
      const n = t.stakeandvotedelegation_new(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
      return Ct.__wrap(n);
    }
    has_script_credentials() {
      return t.committeehotauth_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const Ca = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_stakedelegation_free(w >>> 0));
  Vt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Vt.prototype);
      return r.__wbg_ptr = _, Ca.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ca.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_stakedelegation_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakedelegation_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.stakedelegation_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Vt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakedelegation_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.stakedelegation_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Vt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakedelegation_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakedelegation_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.stakedelegation_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Vt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    stake_credential() {
      const _ = t.stakedelegation_stake_credential(this.__wbg_ptr);
      return k.__wrap(_);
    }
    pool_keyhash() {
      const _ = t.stakedelegation_pool_keyhash(this.__wbg_ptr);
      return O.__wrap(_);
    }
    static new(_, r) {
      p(_, k), p(r, O);
      const o = t.stakedelegation_new(_.__wbg_ptr, r.__wbg_ptr);
      return Vt.__wrap(o);
    }
    has_script_credentials() {
      return t.stakedelegation_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const Va = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_stakederegistration_free(w >>> 0));
  j_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(j_.prototype);
      return r.__wbg_ptr = _, Va.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Va.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_stakederegistration_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakederegistration_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.stakederegistration_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return j_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakederegistration_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.stakederegistration_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return j_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakederegistration_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakederegistration_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.stakederegistration_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return j_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    stake_credential() {
      const _ = t.stakederegistration_stake_credential(this.__wbg_ptr);
      return k.__wrap(_);
    }
    coin() {
      const _ = t.stakederegistration_coin(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    static new(_) {
      p(_, k);
      const r = t.stakederegistration_new(_.__wbg_ptr);
      return j_.__wrap(r);
    }
    static new_with_explicit_refund(_, r) {
      p(_, k), p(r, h);
      const o = t.stakederegistration_new_with_explicit_refund(_.__wbg_ptr, r.__wbg_ptr);
      return j_.__wrap(o);
    }
    has_script_credentials() {
      return t.stakederegistration_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const Pa = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_stakeregistration_free(w >>> 0));
  x_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(x_.prototype);
      return r.__wbg_ptr = _, Pa.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Pa.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_stakeregistration_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakeregistration_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.stakeregistration_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return x_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakeregistration_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.stakeregistration_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return x_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakeregistration_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakeregistration_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.stakeregistration_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return x_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    stake_credential() {
      const _ = t.stakeregistration_stake_credential(this.__wbg_ptr);
      return k.__wrap(_);
    }
    coin() {
      const _ = t.stakeregistration_coin(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    static new(_) {
      p(_, k);
      const r = t.stakeregistration_new(_.__wbg_ptr);
      return x_.__wrap(r);
    }
    static new_with_explicit_deposit(_, r) {
      p(_, k), p(r, h);
      const o = t.stakeregistration_new_with_explicit_deposit(_.__wbg_ptr, r.__wbg_ptr);
      return x_.__wrap(o);
    }
    has_script_credentials() {
      return t.stakeregistration_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const Ba = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_stakeregistrationanddelegation_free(w >>> 0));
  Pt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Pt.prototype);
      return r.__wbg_ptr = _, Ba.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ba.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_stakeregistrationanddelegation_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakeregistrationanddelegation_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.stakeregistrationanddelegation_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Pt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakeregistrationanddelegation_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.stakeregistrationanddelegation_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Pt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakeregistrationanddelegation_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakeregistrationanddelegation_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.stakeregistrationanddelegation_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Pt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    stake_credential() {
      const _ = t.stakeregistrationanddelegation_stake_credential(this.__wbg_ptr);
      return k.__wrap(_);
    }
    pool_keyhash() {
      const _ = t.stakeregistrationanddelegation_pool_keyhash(this.__wbg_ptr);
      return O.__wrap(_);
    }
    coin() {
      const _ = t.stakeregistrationanddelegation_coin(this.__wbg_ptr);
      return h.__wrap(_);
    }
    static new(_, r, o) {
      p(_, k), p(r, O), p(o, h);
      const n = t.stakeregistrationanddelegation_new(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
      return Pt.__wrap(n);
    }
    has_script_credentials() {
      return t.stakeregistrationanddelegation_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const _o = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_stakevoteregistrationanddelegation_free(w >>> 0));
  Bt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Bt.prototype);
      return r.__wbg_ptr = _, _o.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, _o.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_stakevoteregistrationanddelegation_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakevoteregistrationanddelegation_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.stakevoteregistrationanddelegation_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Bt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakevoteregistrationanddelegation_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.stakevoteregistrationanddelegation_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Bt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakevoteregistrationanddelegation_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.stakevoteregistrationanddelegation_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.stakevoteregistrationanddelegation_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Bt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    stake_credential() {
      const _ = t.stakevoteregistrationanddelegation_stake_credential(this.__wbg_ptr);
      return k.__wrap(_);
    }
    pool_keyhash() {
      const _ = t.stakeregistrationanddelegation_pool_keyhash(this.__wbg_ptr);
      return O.__wrap(_);
    }
    drep() {
      const _ = t.stakevoteregistrationanddelegation_drep(this.__wbg_ptr);
      return G.__wrap(_);
    }
    coin() {
      const _ = t.stakeregistrationanddelegation_coin(this.__wbg_ptr);
      return h.__wrap(_);
    }
    static new(_, r, o, n) {
      p(_, k), p(r, O), p(o, G), p(n, h);
      const e = t.stakevoteregistrationanddelegation_new(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr, n.__wbg_ptr);
      return Bt.__wrap(e);
    }
    has_script_credentials() {
      return t.stakevoteregistrationanddelegation_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const to = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_strings_free(w >>> 0));
  ge = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(ge.prototype);
      return r.__wbg_ptr = _, to.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, to.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_strings_free(_);
    }
    static new() {
      const _ = t.strings_new();
      return ge.__wrap(_);
    }
    len() {
      return t.strings_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      let r, o;
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16);
        t.strings_get(s, this.__wbg_ptr, _);
        var n = a()[s / 4 + 0], e = a()[s / 4 + 1];
        return r = n, o = e, f(n, e);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
      }
    }
    add(_) {
      const r = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), o = b;
      t.strings_add(this.__wbg_ptr, r, o);
    }
  };
  const ro = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_timelockexpiry_free(w >>> 0));
  _t = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(_t.prototype);
      return r.__wbg_ptr = _, ro.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ro.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_timelockexpiry_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.timelockexpiry_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.timelockexpiry_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return _t.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.timelockexpiry_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.timelockexpiry_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return _t.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.timelockexpiry_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.timelockexpiry_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.timelockexpiry_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return _t.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    slot() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.timelockexpiry_slot(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return _ >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    slot_bignum() {
      const _ = t.timelockexpiry_slot_bignum(this.__wbg_ptr);
      return h.__wrap(_);
    }
    static new(_) {
      const r = t.timelockexpiry_new(_);
      return _t.__wrap(r);
    }
    static new_timelockexpiry(_) {
      p(_, h);
      const r = t.timelockexpiry_new_timelockexpiry(_.__wbg_ptr);
      return _t.__wrap(r);
    }
  };
  const eo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_timelockstart_free(w >>> 0));
  tt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(tt.prototype);
      return r.__wbg_ptr = _, eo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, eo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_timelockstart_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.timelockstart_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.timelockstart_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return tt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.timelockstart_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.timelockstart_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return tt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.timelockstart_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.timelockstart_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.timelockstart_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return tt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    slot() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.timelockexpiry_slot(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return _ >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    slot_bignum() {
      const _ = t.timelockexpiry_slot_bignum(this.__wbg_ptr);
      return h.__wrap(_);
    }
    static new(_) {
      const r = t.timelockexpiry_new(_);
      return tt.__wrap(r);
    }
    static new_timelockstart(_) {
      p(_, h);
      const r = t.timelockexpiry_new_timelockexpiry(_.__wbg_ptr);
      return tt.__wrap(r);
    }
  };
  const no = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transaction_free(w >>> 0));
  R_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(R_.prototype);
      return r.__wbg_ptr = _, no.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, no.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transaction_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transaction_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.transaction_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return R_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.transaction_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transaction_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return R_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.transaction_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transaction_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transaction_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return R_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    body() {
      const _ = t.transaction_body(this.__wbg_ptr);
      return C.__wrap(_);
    }
    witness_set() {
      const _ = t.transaction_witness_set(this.__wbg_ptr);
      return u_.__wrap(_);
    }
    is_valid() {
      return t.transaction_is_valid(this.__wbg_ptr) !== 0;
    }
    auxiliary_data() {
      const _ = t.transaction_auxiliary_data(this.__wbg_ptr);
      return _ === 0 ? void 0 : P.__wrap(_);
    }
    set_is_valid(_) {
      t.transaction_set_is_valid(this.__wbg_ptr, _);
    }
    static new(_, r, o) {
      p(_, C), p(r, u_);
      let n = 0;
      p_(o) || (p(o, P), n = o.__destroy_into_raw());
      const e = t.transaction_new(_.__wbg_ptr, r.__wbg_ptr, n);
      return R_.__wrap(e);
    }
  };
  const ao = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactionbatch_free(w >>> 0));
  fe = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(fe.prototype);
      return r.__wbg_ptr = _, ao.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ao.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactionbatch_free(_);
    }
    len() {
      return t.transactionbatch_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.transactionbatch_get(this.__wbg_ptr, _);
      return R_.__wrap(r);
    }
  };
  const oo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactionbatchlist_free(w >>> 0));
  ue = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(ue.prototype);
      return r.__wbg_ptr = _, oo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, oo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactionbatchlist_free(_);
    }
    len() {
      return t.transactionbatchlist_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.transactionbatchlist_get(this.__wbg_ptr, _);
      return fe.__wrap(r);
    }
  };
  const io = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactionbodies_free(w >>> 0));
  _r = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(_r.prototype);
      return r.__wbg_ptr = _, io.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, io.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactionbodies_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbodies_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.transactionbodies_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return _r.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbodies_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionbodies_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return _r.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbodies_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbodies_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionbodies_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return _r.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.fixedtransactionbodies_new();
      return _r.__wrap(_);
    }
    len() {
      return t.transactionbodies_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.transactionbodies_get(this.__wbg_ptr, _);
      return C.__wrap(r);
    }
    add(_) {
      p(_, C), t.transactionbodies_add(this.__wbg_ptr, _.__wbg_ptr);
    }
  };
  const so = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactionbody_free(w >>> 0));
  C = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(C.prototype);
      return r.__wbg_ptr = _, so.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, so.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactionbody_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbody_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.transactionbody_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return C.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbody_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionbody_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return C.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbody_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbody_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionbody_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return C.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    inputs() {
      const _ = t.transactionbody_inputs(this.__wbg_ptr);
      return K.__wrap(_);
    }
    outputs() {
      const _ = t.transactionbody_outputs(this.__wbg_ptr);
      return wt.__wrap(_);
    }
    fee() {
      const _ = t.transactionbody_fee(this.__wbg_ptr);
      return h.__wrap(_);
    }
    ttl() {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbody_ttl(e, this.__wbg_ptr);
        var _ = a()[e / 4 + 0], r = a()[e / 4 + 1], o = a()[e / 4 + 2], n = a()[e / 4 + 3];
        if (n) throw d(o);
        return _ === 0 ? void 0 : r >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    ttl_bignum() {
      const _ = t.transactionbody_ttl_bignum(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    set_ttl(_) {
      p(_, h), t.transactionbody_set_ttl(this.__wbg_ptr, _.__wbg_ptr);
    }
    remove_ttl() {
      t.transactionbody_remove_ttl(this.__wbg_ptr);
    }
    set_certs(_) {
      p(_, E_), t.transactionbody_set_certs(this.__wbg_ptr, _.__wbg_ptr);
    }
    certs() {
      const _ = t.transactionbody_certs(this.__wbg_ptr);
      return _ === 0 ? void 0 : E_.__wrap(_);
    }
    set_withdrawals(_) {
      p(_, W_), t.transactionbody_set_withdrawals(this.__wbg_ptr, _.__wbg_ptr);
    }
    withdrawals() {
      const _ = t.transactionbody_withdrawals(this.__wbg_ptr);
      return _ === 0 ? void 0 : W_.__wrap(_);
    }
    set_update(_) {
      p(_, tr), t.transactionbody_set_update(this.__wbg_ptr, _.__wbg_ptr);
    }
    update() {
      const _ = t.transactionbody_update(this.__wbg_ptr);
      return _ === 0 ? void 0 : tr.__wrap(_);
    }
    set_auxiliary_data_hash(_) {
      p(_, ar), t.transactionbody_set_auxiliary_data_hash(this.__wbg_ptr, _.__wbg_ptr);
    }
    auxiliary_data_hash() {
      const _ = t.transactionbody_auxiliary_data_hash(this.__wbg_ptr);
      return _ === 0 ? void 0 : ar.__wrap(_);
    }
    set_validity_start_interval(_) {
      t.transactionbody_set_validity_start_interval(this.__wbg_ptr, _);
    }
    set_validity_start_interval_bignum(_) {
      p(_, h), t.transactionbody_set_validity_start_interval_bignum(this.__wbg_ptr, _.__wbg_ptr);
    }
    validity_start_interval_bignum() {
      const _ = t.transactionbody_validity_start_interval_bignum(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    validity_start_interval() {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbody_validity_start_interval(e, this.__wbg_ptr);
        var _ = a()[e / 4 + 0], r = a()[e / 4 + 1], o = a()[e / 4 + 2], n = a()[e / 4 + 3];
        if (n) throw d(o);
        return _ === 0 ? void 0 : r >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_mint(_) {
      p(_, g_), t.transactionbody_set_mint(this.__wbg_ptr, _.__wbg_ptr);
    }
    mint() {
      const _ = t.transactionbody_mint(this.__wbg_ptr);
      return _ === 0 ? void 0 : g_.__wrap(_);
    }
    set_reference_inputs(_) {
      p(_, K), t.transactionbody_set_reference_inputs(this.__wbg_ptr, _.__wbg_ptr);
    }
    reference_inputs() {
      const _ = t.transactionbody_reference_inputs(this.__wbg_ptr);
      return _ === 0 ? void 0 : K.__wrap(_);
    }
    set_script_data_hash(_) {
      p(_, lt), t.transactionbody_set_script_data_hash(this.__wbg_ptr, _.__wbg_ptr);
    }
    script_data_hash() {
      const _ = t.transactionbody_script_data_hash(this.__wbg_ptr);
      return _ === 0 ? void 0 : lt.__wrap(_);
    }
    set_collateral(_) {
      p(_, K), t.transactionbody_set_collateral(this.__wbg_ptr, _.__wbg_ptr);
    }
    collateral() {
      const _ = t.transactionbody_collateral(this.__wbg_ptr);
      return _ === 0 ? void 0 : K.__wrap(_);
    }
    set_required_signers(_) {
      p(_, V), t.transactionbody_set_required_signers(this.__wbg_ptr, _.__wbg_ptr);
    }
    required_signers() {
      const _ = t.transactionbody_required_signers(this.__wbg_ptr);
      return _ === 0 ? void 0 : V.__wrap(_);
    }
    set_network_id(_) {
      p(_, V_), t.transactionbody_set_network_id(this.__wbg_ptr, _.__wbg_ptr);
    }
    network_id() {
      const _ = t.transactionbody_network_id(this.__wbg_ptr);
      return _ === 0 ? void 0 : V_.__wrap(_);
    }
    set_collateral_return(_) {
      p(_, A), t.transactionbody_set_collateral_return(this.__wbg_ptr, _.__wbg_ptr);
    }
    collateral_return() {
      const _ = t.transactionbody_collateral_return(this.__wbg_ptr);
      return _ === 0 ? void 0 : A.__wrap(_);
    }
    set_total_collateral(_) {
      p(_, h), t.transactionbody_set_total_collateral(this.__wbg_ptr, _.__wbg_ptr);
    }
    total_collateral() {
      const _ = t.transactionbody_total_collateral(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    set_voting_procedures(_) {
      p(_, bt), t.transactionbody_set_voting_procedures(this.__wbg_ptr, _.__wbg_ptr);
    }
    voting_procedures() {
      const _ = t.transactionbody_voting_procedures(this.__wbg_ptr);
      return _ === 0 ? void 0 : bt.__wrap(_);
    }
    set_voting_proposals(_) {
      p(_, U_), t.transactionbody_set_voting_proposals(this.__wbg_ptr, _.__wbg_ptr);
    }
    voting_proposals() {
      const _ = t.transactionbody_voting_proposals(this.__wbg_ptr);
      return _ === 0 ? void 0 : U_.__wrap(_);
    }
    set_donation(_) {
      p(_, h), t.transactionbody_set_donation(this.__wbg_ptr, _.__wbg_ptr);
    }
    donation() {
      const _ = t.transactionbody_donation(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    set_current_treasury_value(_) {
      p(_, h), t.transactionbody_set_current_treasury_value(this.__wbg_ptr, _.__wbg_ptr);
    }
    current_treasury_value() {
      const _ = t.transactionbody_current_treasury_value(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    static new(_, r, o, n) {
      p(_, K), p(r, wt), p(o, h);
      const e = t.transactionbody_new(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr, !p_(n), p_(n) ? 0 : n);
      return C.__wrap(e);
    }
    static new_tx_body(_, r, o) {
      p(_, K), p(r, wt), p(o, h);
      const n = t.transactionbody_new_tx_body(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
      return C.__wrap(n);
    }
  };
  const co = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactionbuilder_free(w >>> 0));
  be = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(be.prototype);
      return r.__wbg_ptr = _, co.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, co.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactionbuilder_free(_);
    }
    add_inputs_from(_, r) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, sr), t.transactionbuilder_add_inputs_from(e, this.__wbg_ptr, _.__wbg_ptr, r);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        if (n) throw d(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_inputs(_) {
      p(_, Tr), t.transactionbuilder_set_inputs(this.__wbg_ptr, _.__wbg_ptr);
    }
    set_collateral(_) {
      p(_, Tr), t.transactionbuilder_set_collateral(this.__wbg_ptr, _.__wbg_ptr);
    }
    set_collateral_return(_) {
      p(_, A), t.transactionbuilder_set_collateral_return(this.__wbg_ptr, _.__wbg_ptr);
    }
    remove_collateral_return() {
      t.transactionbuilder_remove_collateral_return(this.__wbg_ptr);
    }
    set_collateral_return_and_total(_) {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, A), t.transactionbuilder_set_collateral_return_and_total(n, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[n / 4 + 0], o = a()[n / 4 + 1];
        if (o) throw d(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_total_collateral(_) {
      p(_, h), t.transactionbuilder_set_total_collateral(this.__wbg_ptr, _.__wbg_ptr);
    }
    remove_total_collateral() {
      t.transactionbuilder_remove_total_collateral(this.__wbg_ptr);
    }
    set_total_collateral_and_return(_, r) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, h), p(r, $), t.transactionbuilder_set_total_collateral_and_return(e, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        if (n) throw d(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_reference_input(_) {
      p(_, X), t.transactionbuilder_add_reference_input(this.__wbg_ptr, _.__wbg_ptr);
    }
    add_script_reference_input(_, r) {
      p(_, X), t.transactionbuilder_add_script_reference_input(this.__wbg_ptr, _.__wbg_ptr, r);
    }
    add_key_input(_, r, o) {
      p(_, O), p(r, X), p(o, F), t.transactionbuilder_add_key_input(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
    }
    add_native_script_input(_, r, o) {
      p(_, S), p(r, X), p(o, F), t.transactionbuilder_add_native_script_input(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
    }
    add_plutus_script_input(_, r, o) {
      p(_, B), p(r, X), p(o, F), t.transactionbuilder_add_plutus_script_input(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
    }
    add_bootstrap_input(_, r, o) {
      p(_, f_), p(r, X), p(o, F), t.transactionbuilder_add_bootstrap_input(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
    }
    add_regular_input(_, r, o) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, $), p(r, X), p(o, F), t.transactionbuilder_add_regular_input(s, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
        var n = a()[s / 4 + 0], e = a()[s / 4 + 1];
        if (e) throw d(n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_inputs_from_and_change(_, r, o) {
      try {
        const i = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, sr), p(o, jt), t.transactionbuilder_add_inputs_from_and_change(i, this.__wbg_ptr, _.__wbg_ptr, r, o.__wbg_ptr);
        var n = a()[i / 4 + 0], e = a()[i / 4 + 1], s = a()[i / 4 + 2];
        if (s) throw d(e);
        return n !== 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_inputs_from_and_change_with_collateral_return(_, r, o, n) {
      try {
        const i = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, sr), p(o, jt), p(n, h), t.transactionbuilder_add_inputs_from_and_change_with_collateral_return(i, this.__wbg_ptr, _.__wbg_ptr, r, o.__wbg_ptr, n.__wbg_ptr);
        var e = a()[i / 4 + 0], s = a()[i / 4 + 1];
        if (s) throw d(e);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_native_input_scripts() {
      const _ = t.transactionbuilder_get_native_input_scripts(this.__wbg_ptr);
      return _ === 0 ? void 0 : U.__wrap(_);
    }
    get_plutus_input_scripts() {
      const _ = t.transactionbuilder_get_plutus_input_scripts(this.__wbg_ptr);
      return _ === 0 ? void 0 : H_.__wrap(_);
    }
    fee_for_input(_, r, o) {
      try {
        const i = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, $), p(r, X), p(o, F), t.transactionbuilder_fee_for_input(i, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
        var n = a()[i / 4 + 0], e = a()[i / 4 + 1], s = a()[i / 4 + 2];
        if (s) throw d(e);
        return h.__wrap(n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_output(_) {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, A), t.transactionbuilder_add_output(n, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[n / 4 + 0], o = a()[n / 4 + 1];
        if (o) throw d(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    fee_for_output(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, A), t.transactionbuilder_fee_for_output(e, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return h.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_fee(_) {
      p(_, h), t.transactionbuilder_set_fee(this.__wbg_ptr, _.__wbg_ptr);
    }
    set_min_fee(_) {
      p(_, h), t.transactionbuilder_set_min_fee(this.__wbg_ptr, _.__wbg_ptr);
    }
    set_ttl(_) {
      t.transactionbuilder_set_ttl(this.__wbg_ptr, _);
    }
    set_ttl_bignum(_) {
      p(_, h), t.transactionbuilder_set_ttl_bignum(this.__wbg_ptr, _.__wbg_ptr);
    }
    remove_ttl() {
      t.transactionbuilder_remove_ttl(this.__wbg_ptr);
    }
    set_validity_start_interval(_) {
      t.transactionbuilder_set_validity_start_interval(this.__wbg_ptr, _);
    }
    set_validity_start_interval_bignum(_) {
      p(_, h);
      var r = _.__destroy_into_raw();
      t.transactionbuilder_set_validity_start_interval_bignum(this.__wbg_ptr, r);
    }
    remove_validity_start_interval() {
      t.transactionbuilder_remove_validity_start_interval(this.__wbg_ptr);
    }
    set_certs(_) {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, E_), t.transactionbuilder_set_certs(n, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[n / 4 + 0], o = a()[n / 4 + 1];
        if (o) throw d(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    remove_certs() {
      t.transactionbuilder_remove_certs(this.__wbg_ptr);
    }
    set_certs_builder(_) {
      p(_, ne), t.transactionbuilder_set_certs_builder(this.__wbg_ptr, _.__wbg_ptr);
    }
    set_withdrawals(_) {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, W_), t.transactionbuilder_set_withdrawals(n, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[n / 4 + 0], o = a()[n / 4 + 1];
        if (o) throw d(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_withdrawals_builder(_) {
      p(_, se), t.transactionbuilder_set_withdrawals_builder(this.__wbg_ptr, _.__wbg_ptr);
    }
    set_voting_builder(_) {
      p(_, oe), t.transactionbuilder_set_voting_builder(this.__wbg_ptr, _.__wbg_ptr);
    }
    set_voting_proposal_builder(_) {
      p(_, ie), t.transactionbuilder_set_voting_proposal_builder(this.__wbg_ptr, _.__wbg_ptr);
    }
    remove_withdrawals() {
      t.transactionbuilder_remove_withdrawals(this.__wbg_ptr);
    }
    get_auxiliary_data() {
      const _ = t.transactionbuilder_get_auxiliary_data(this.__wbg_ptr);
      return _ === 0 ? void 0 : P.__wrap(_);
    }
    set_auxiliary_data(_) {
      p(_, P), t.transactionbuilder_set_auxiliary_data(this.__wbg_ptr, _.__wbg_ptr);
    }
    remove_auxiliary_data() {
      t.transactionbuilder_remove_auxiliary_data(this.__wbg_ptr);
    }
    set_metadata(_) {
      p(_, st), t.transactionbuilder_set_metadata(this.__wbg_ptr, _.__wbg_ptr);
    }
    add_metadatum(_, r) {
      p(_, h), p(r, L), t.transactionbuilder_add_metadatum(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
    }
    add_json_metadatum(_, r) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, h);
        const s = l(r, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionbuilder_add_json_metadatum(e, this.__wbg_ptr, _.__wbg_ptr, s, i);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        if (n) throw d(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_json_metadatum_with_schema(_, r, o) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, h);
        const i = l(r, t.__wbindgen_malloc, t.__wbindgen_realloc), g = b;
        t.transactionbuilder_add_json_metadatum_with_schema(s, this.__wbg_ptr, _.__wbg_ptr, i, g, o);
        var n = a()[s / 4 + 0], e = a()[s / 4 + 1];
        if (e) throw d(n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_mint_builder(_) {
      p(_, Dr), t.transactionbuilder_set_mint_builder(this.__wbg_ptr, _.__wbg_ptr);
    }
    remove_mint_builder() {
      t.transactionbuilder_remove_mint_builder(this.__wbg_ptr);
    }
    get_mint_builder() {
      const _ = t.transactionbuilder_get_mint_builder(this.__wbg_ptr);
      return _ === 0 ? void 0 : Dr.__wrap(_);
    }
    set_mint(_, r) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, g_), p(r, U), t.transactionbuilder_set_mint(e, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        if (n) throw d(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_mint() {
      const _ = t.transactionbuilder_get_mint(this.__wbg_ptr);
      return _ === 0 ? void 0 : g_.__wrap(_);
    }
    get_mint_scripts() {
      const _ = t.transactionbuilder_get_mint_scripts(this.__wbg_ptr);
      return _ === 0 ? void 0 : U.__wrap(_);
    }
    set_mint_asset(_, r) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, S), p(r, M_), t.transactionbuilder_set_mint_asset(e, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        if (n) throw d(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_mint_asset(_, r, o) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, S), p(r, M), p(o, Q), t.transactionbuilder_add_mint_asset(s, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
        var n = a()[s / 4 + 0], e = a()[s / 4 + 1];
        if (e) throw d(n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_mint_asset_and_output(_, r, o, n, e) {
      try {
        const g = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, S), p(r, M), p(o, Q), p(n, pt), p(e, h), t.transactionbuilder_add_mint_asset_and_output(g, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr, n.__wbg_ptr, e.__wbg_ptr);
        var s = a()[g / 4 + 0], i = a()[g / 4 + 1];
        if (i) throw d(s);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_mint_asset_and_output_min_required_coin(_, r, o, n) {
      try {
        const i = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, S), p(r, M), p(o, Q), p(n, pt), t.transactionbuilder_add_mint_asset_and_output_min_required_coin(i, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr, n.__wbg_ptr);
        var e = a()[i / 4 + 0], s = a()[i / 4 + 1];
        if (s) throw d(e);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_extra_witness_datum(_) {
      p(_, R), t.transactionbuilder_add_extra_witness_datum(this.__wbg_ptr, _.__wbg_ptr);
    }
    get_extra_witness_datums() {
      const _ = t.transactionbuilder_get_extra_witness_datums(this.__wbg_ptr);
      return _ === 0 ? void 0 : i_.__wrap(_);
    }
    set_donation(_) {
      p(_, h), t.transactionbuilder_set_donation(this.__wbg_ptr, _.__wbg_ptr);
    }
    get_donation() {
      const _ = t.transactionbuilder_get_donation(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    set_current_treasury_value(_) {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, h), t.transactionbuilder_set_current_treasury_value(n, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[n / 4 + 0], o = a()[n / 4 + 1];
        if (o) throw d(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_current_treasury_value() {
      const _ = t.transactionbuilder_get_current_treasury_value(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    static new(_) {
      p(_, Nr);
      const r = t.transactionbuilder_new(_.__wbg_ptr);
      return be.__wrap(r);
    }
    get_reference_inputs() {
      const _ = t.transactionbuilder_get_reference_inputs(this.__wbg_ptr);
      return K.__wrap(_);
    }
    get_explicit_input() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbuilder_get_explicit_input(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return F.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_implicit_input() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbuilder_get_implicit_input(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return F.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_total_input() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbuilder_get_total_input(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return F.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_total_output() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbuilder_get_total_output(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return F.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_explicit_output() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbuilder_get_explicit_output(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return F.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_deposit() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbuilder_get_deposit(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return h.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_fee_if_set() {
      const _ = t.transactionbuilder_get_fee_if_set(this.__wbg_ptr);
      return _ === 0 ? void 0 : h.__wrap(_);
    }
    add_change_if_needed(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, $), t.transactionbuilder_add_change_if_needed(e, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return r !== 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_change_if_needed_with_datum(_, r) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, $), p(r, $r), t.transactionbuilder_add_change_if_needed_with_datum(s, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
        var o = a()[s / 4 + 0], n = a()[s / 4 + 1], e = a()[s / 4 + 2];
        if (e) throw d(n);
        return o !== 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    calc_script_data_hash(_) {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, m_), t.transactionbuilder_calc_script_data_hash(n, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[n / 4 + 0], o = a()[n / 4 + 1];
        if (o) throw d(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_script_data_hash(_) {
      p(_, lt), t.transactionbuilder_set_script_data_hash(this.__wbg_ptr, _.__wbg_ptr);
    }
    remove_script_data_hash() {
      t.transactionbuilder_remove_script_data_hash(this.__wbg_ptr);
    }
    add_required_signer(_) {
      p(_, O), t.transactionbuilder_add_required_signer(this.__wbg_ptr, _.__wbg_ptr);
    }
    full_size() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbuilder_full_size(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return _ >>> 0;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    output_sizes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbuilder_output_sizes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = de(_, r).slice();
        return t.__wbindgen_free(_, r * 4, 4), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    build() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbuilder_build(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return C.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    build_tx() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbuilder_build_tx(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return R_.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    build_tx_unsafe() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbuilder_build_tx_unsafe(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return R_.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    min_fee() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbuilder_min_fee(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return h.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const po = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactionbuilderconfig_free(w >>> 0));
  Nr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Nr.prototype);
      return r.__wbg_ptr = _, po.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, po.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactionbuilderconfig_free(_);
    }
  };
  const wo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactionbuilderconfigbuilder_free(w >>> 0));
  t_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(t_.prototype);
      return r.__wbg_ptr = _, wo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, wo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactionbuilderconfigbuilder_free(_);
    }
    static new() {
      const _ = t.transactionbuilderconfigbuilder_new();
      return t_.__wrap(_);
    }
    fee_algo(_) {
      p(_, Ir);
      const r = t.transactionbuilderconfigbuilder_fee_algo(this.__wbg_ptr, _.__wbg_ptr);
      return t_.__wrap(r);
    }
    coins_per_utxo_byte(_) {
      p(_, h);
      const r = t.transactionbuilderconfigbuilder_coins_per_utxo_byte(this.__wbg_ptr, _.__wbg_ptr);
      return t_.__wrap(r);
    }
    ex_unit_prices(_) {
      p(_, F_);
      const r = t.transactionbuilderconfigbuilder_ex_unit_prices(this.__wbg_ptr, _.__wbg_ptr);
      return t_.__wrap(r);
    }
    pool_deposit(_) {
      p(_, h);
      const r = t.transactionbuilderconfigbuilder_pool_deposit(this.__wbg_ptr, _.__wbg_ptr);
      return t_.__wrap(r);
    }
    key_deposit(_) {
      p(_, h);
      const r = t.transactionbuilderconfigbuilder_key_deposit(this.__wbg_ptr, _.__wbg_ptr);
      return t_.__wrap(r);
    }
    max_value_size(_) {
      const r = t.transactionbuilderconfigbuilder_max_value_size(this.__wbg_ptr, _);
      return t_.__wrap(r);
    }
    max_tx_size(_) {
      const r = t.transactionbuilderconfigbuilder_max_tx_size(this.__wbg_ptr, _);
      return t_.__wrap(r);
    }
    ref_script_coins_per_byte(_) {
      p(_, m);
      const r = t.transactionbuilderconfigbuilder_ref_script_coins_per_byte(this.__wbg_ptr, _.__wbg_ptr);
      return t_.__wrap(r);
    }
    prefer_pure_change(_) {
      const r = t.transactionbuilderconfigbuilder_prefer_pure_change(this.__wbg_ptr, _);
      return t_.__wrap(r);
    }
    deduplicate_explicit_ref_inputs_with_regular_inputs(_) {
      const r = t.transactionbuilderconfigbuilder_deduplicate_explicit_ref_inputs_with_regular_inputs(this.__wbg_ptr, _);
      return t_.__wrap(r);
    }
    do_not_burn_extra_change(_) {
      const r = t.transactionbuilderconfigbuilder_do_not_burn_extra_change(this.__wbg_ptr, _);
      return t_.__wrap(r);
    }
    build() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionbuilderconfigbuilder_build(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return Nr.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const go = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactionhash_free(w >>> 0));
  s_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(s_.prototype);
      return r.__wbg_ptr = _, go.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, go.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactionhash_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.transactionhash_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return s_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(_) {
      let r, o;
      try {
        const v = t.__wbindgen_add_to_stack_pointer(-16), j = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), x = b;
        t.anchordatahash_to_bech32(v, this.__wbg_ptr, j, x);
        var n = a()[v / 4 + 0], e = a()[v / 4 + 1], s = a()[v / 4 + 2], i = a()[v / 4 + 3], g = n, c = e;
        if (i) throw g = 0, c = 0, d(s);
        return r = g, o = c, f(g, c);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionhash_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return s_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionhash_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return s_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const bo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactioninput_free(w >>> 0));
  X = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(X.prototype);
      return r.__wbg_ptr = _, bo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, bo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactioninput_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactioninput_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.transactioninput_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return X.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactioninput_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactioninput_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return X.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactioninput_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactioninput_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactioninput_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return X.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    transaction_id() {
      const _ = t.governanceactionid_transaction_id(this.__wbg_ptr);
      return s_.__wrap(_);
    }
    index() {
      return t.governanceactionid_index(this.__wbg_ptr) >>> 0;
    }
    static new(_, r) {
      p(_, s_);
      const o = t.governanceactionid_new(_.__wbg_ptr, r);
      return X.__wrap(o);
    }
  };
  const lo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactioninputs_free(w >>> 0));
  K = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(K.prototype);
      return r.__wbg_ptr = _, lo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, lo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactioninputs_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactioninputs_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.transactioninputs_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return K.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactioninputs_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactioninputs_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return K.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactioninputs_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactioninputs_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactioninputs_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return K.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.transactioninputs_new();
      return K.__wrap(_);
    }
    len() {
      return t.transactioninputs_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.transactioninputs_get(this.__wbg_ptr, _);
      return X.__wrap(r);
    }
    add(_) {
      return p(_, X), t.transactioninputs_add(this.__wbg_ptr, _.__wbg_ptr) !== 0;
    }
    to_option() {
      const _ = t.transactioninputs_to_option(this.__wbg_ptr);
      return _ === 0 ? void 0 : K.__wrap(_);
    }
  };
  const fo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactionmetadatum_free(w >>> 0));
  L = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(L.prototype);
      return r.__wbg_ptr = _, fo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, fo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactionmetadatum_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionmetadatum_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.transactionmetadatum_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return L.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionmetadatum_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionmetadatum_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return L.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_map(_) {
      p(_, ur);
      const r = t.transactionmetadatum_new_map(_.__wbg_ptr);
      return L.__wrap(r);
    }
    static new_list(_) {
      p(_, or);
      const r = t.transactionmetadatum_new_list(_.__wbg_ptr);
      return L.__wrap(r);
    }
    static new_int(_) {
      p(_, Q);
      const r = t.transactionmetadatum_new_int(_.__wbg_ptr);
      return L.__wrap(r);
    }
    static new_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.transactionmetadatum_new_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return L.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_text(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionmetadatum_new_text(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return L.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    kind() {
      return t.transactionmetadatum_kind(this.__wbg_ptr);
    }
    as_map() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionmetadatum_as_map(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return ur.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_list() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionmetadatum_as_list(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return or.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_int() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionmetadatum_as_int(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return Q.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_bytes() {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionmetadatum_as_bytes(s, this.__wbg_ptr);
        var _ = a()[s / 4 + 0], r = a()[s / 4 + 1], o = a()[s / 4 + 2], n = a()[s / 4 + 3];
        if (n) throw d(o);
        var e = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), e;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    as_text() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionmetadatum_as_text(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
  };
  const uo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactionmetadatumlabels_free(w >>> 0));
  zr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(zr.prototype);
      return r.__wbg_ptr = _, uo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, uo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactionmetadatumlabels_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionmetadatumlabels_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.transactionmetadatumlabels_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return zr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionmetadatumlabels_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionmetadatumlabels_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return zr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.plutusmapvalues_new();
      return zr.__wrap(_);
    }
    len() {
      return t.transactionmetadatumlabels_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.transactionmetadatumlabels_get(this.__wbg_ptr, _);
      return h.__wrap(r);
    }
    add(_) {
      p(_, h), t.transactionmetadatumlabels_add(this.__wbg_ptr, _.__wbg_ptr);
    }
  };
  const ho = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactionoutput_free(w >>> 0));
  A = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(A.prototype);
      return r.__wbg_ptr = _, ho.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ho.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactionoutput_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionoutput_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.transactionoutput_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return A.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionoutput_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionoutput_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return A.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionoutput_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionoutput_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionoutput_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return A.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    address() {
      const _ = t.transactionoutput_address(this.__wbg_ptr);
      return $.__wrap(_);
    }
    amount() {
      const _ = t.transactionoutput_amount(this.__wbg_ptr);
      return F.__wrap(_);
    }
    data_hash() {
      const _ = t.transactionoutput_data_hash(this.__wbg_ptr);
      return _ === 0 ? void 0 : J_.__wrap(_);
    }
    plutus_data() {
      const _ = t.transactionoutput_plutus_data(this.__wbg_ptr);
      return _ === 0 ? void 0 : R.__wrap(_);
    }
    script_ref() {
      const _ = t.transactionoutput_script_ref(this.__wbg_ptr);
      return _ === 0 ? void 0 : k_.__wrap(_);
    }
    set_script_ref(_) {
      p(_, k_), t.transactionoutput_set_script_ref(this.__wbg_ptr, _.__wbg_ptr);
    }
    set_plutus_data(_) {
      p(_, R), t.transactionoutput_set_plutus_data(this.__wbg_ptr, _.__wbg_ptr);
    }
    set_data_hash(_) {
      p(_, J_), t.transactionoutput_set_data_hash(this.__wbg_ptr, _.__wbg_ptr);
    }
    has_plutus_data() {
      return t.transactionoutput_has_plutus_data(this.__wbg_ptr) !== 0;
    }
    has_data_hash() {
      return t.transactionoutput_has_data_hash(this.__wbg_ptr) !== 0;
    }
    has_script_ref() {
      return t.transactionoutput_has_script_ref(this.__wbg_ptr) !== 0;
    }
    static new(_, r) {
      p(_, $), p(r, F);
      const o = t.transactionoutput_new(_.__wbg_ptr, r.__wbg_ptr);
      return A.__wrap(o);
    }
    serialization_format() {
      const _ = t.transactionoutput_serialization_format(this.__wbg_ptr);
      return _ === 2 ? void 0 : _;
    }
  };
  const yo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactionoutputamountbuilder_free(w >>> 0));
  pt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(pt.prototype);
      return r.__wbg_ptr = _, yo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, yo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactionoutputamountbuilder_free(_);
    }
    with_value(_) {
      p(_, F);
      const r = t.transactionoutputamountbuilder_with_value(this.__wbg_ptr, _.__wbg_ptr);
      return pt.__wrap(r);
    }
    with_coin(_) {
      p(_, h);
      const r = t.transactionoutputamountbuilder_with_coin(this.__wbg_ptr, _.__wbg_ptr);
      return pt.__wrap(r);
    }
    with_coin_and_asset(_, r) {
      p(_, h), p(r, T);
      const o = t.transactionoutputamountbuilder_with_coin_and_asset(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
      return pt.__wrap(o);
    }
    with_asset_and_min_required_coin_by_utxo_cost(_, r) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, T), p(r, Mr), t.transactionoutputamountbuilder_with_asset_and_min_required_coin_by_utxo_cost(s, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
        var o = a()[s / 4 + 0], n = a()[s / 4 + 1], e = a()[s / 4 + 2];
        if (e) throw d(n);
        return pt.__wrap(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    build() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionoutputamountbuilder_build(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return A.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const vo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactionoutputbuilder_free(w >>> 0));
  cr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(cr.prototype);
      return r.__wbg_ptr = _, vo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, vo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactionoutputbuilder_free(_);
    }
    static new() {
      const _ = t.transactionoutputbuilder_new();
      return cr.__wrap(_);
    }
    with_address(_) {
      p(_, $);
      const r = t.transactionoutputbuilder_with_address(this.__wbg_ptr, _.__wbg_ptr);
      return cr.__wrap(r);
    }
    with_data_hash(_) {
      p(_, J_);
      const r = t.transactionoutputbuilder_with_data_hash(this.__wbg_ptr, _.__wbg_ptr);
      return cr.__wrap(r);
    }
    with_plutus_data(_) {
      p(_, R);
      const r = t.transactionoutputbuilder_with_plutus_data(this.__wbg_ptr, _.__wbg_ptr);
      return cr.__wrap(r);
    }
    with_script_ref(_) {
      p(_, k_);
      const r = t.transactionoutputbuilder_with_script_ref(this.__wbg_ptr, _.__wbg_ptr);
      return cr.__wrap(r);
    }
    next() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionoutputbuilder_next(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return pt.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const mo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactionoutputs_free(w >>> 0));
  wt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(wt.prototype);
      return r.__wbg_ptr = _, mo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, mo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactionoutputs_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionoutputs_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.transactionoutputs_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return wt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionoutputs_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionoutputs_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return wt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionoutputs_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionoutputs_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionoutputs_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return wt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.transactionoutputs_new();
      return wt.__wrap(_);
    }
    len() {
      return t.transactionoutputs_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.transactionoutputs_get(this.__wbg_ptr, _);
      return A.__wrap(r);
    }
    add(_) {
      p(_, A), t.transactionoutputs_add(this.__wbg_ptr, _.__wbg_ptr);
    }
  };
  const ko = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactionunspentoutput_free(w >>> 0));
  O_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(O_.prototype);
      return r.__wbg_ptr = _, ko.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, ko.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactionunspentoutput_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionunspentoutput_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.transactionunspentoutput_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return O_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionunspentoutput_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionunspentoutput_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return O_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionunspentoutput_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionunspentoutput_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionunspentoutput_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return O_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_, r) {
      p(_, X), p(r, A);
      const o = t.transactionunspentoutput_new(_.__wbg_ptr, r.__wbg_ptr);
      return O_.__wrap(o);
    }
    input() {
      const _ = t.transactionunspentoutput_input(this.__wbg_ptr);
      return X.__wrap(_);
    }
    output() {
      const _ = t.transactionunspentoutput_output(this.__wbg_ptr);
      return A.__wrap(_);
    }
  };
  const jo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactionunspentoutputs_free(w >>> 0));
  sr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(sr.prototype);
      return r.__wbg_ptr = _, jo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, jo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactionunspentoutputs_free(_);
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionunspentoutputs_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionunspentoutputs_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionunspentoutputs_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return sr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.transactionunspentoutputs_new();
      return sr.__wrap(_);
    }
    len() {
      return t.transactionunspentoutputs_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.transactionunspentoutputs_get(this.__wbg_ptr, _);
      return O_.__wrap(r);
    }
    add(_) {
      p(_, O_), t.transactionunspentoutputs_add(this.__wbg_ptr, _.__wbg_ptr);
    }
  };
  const xo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactionwitnessset_free(w >>> 0));
  u_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(u_.prototype);
      return r.__wbg_ptr = _, xo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, xo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactionwitnessset_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionwitnessset_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.transactionwitnessset_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return u_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionwitnessset_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionwitnessset_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return u_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionwitnessset_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionwitnessset_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionwitnessset_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return u_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set_vkeys(_) {
      p(_, rr), t.transactionwitnessset_set_vkeys(this.__wbg_ptr, _.__wbg_ptr);
    }
    vkeys() {
      const _ = t.transactionwitnessset_vkeys(this.__wbg_ptr);
      return _ === 0 ? void 0 : rr.__wrap(_);
    }
    set_native_scripts(_) {
      p(_, U), t.transactionwitnessset_set_native_scripts(this.__wbg_ptr, _.__wbg_ptr);
    }
    native_scripts() {
      const _ = t.transactionwitnessset_native_scripts(this.__wbg_ptr);
      return _ === 0 ? void 0 : U.__wrap(_);
    }
    set_bootstraps(_) {
      p(_, kt), t.transactionwitnessset_set_bootstraps(this.__wbg_ptr, _.__wbg_ptr);
    }
    bootstraps() {
      const _ = t.transactionwitnessset_bootstraps(this.__wbg_ptr);
      return _ === 0 ? void 0 : kt.__wrap(_);
    }
    set_plutus_scripts(_) {
      p(_, K_), t.transactionwitnessset_set_plutus_scripts(this.__wbg_ptr, _.__wbg_ptr);
    }
    plutus_scripts() {
      const _ = t.transactionwitnessset_plutus_scripts(this.__wbg_ptr);
      return _ === 0 ? void 0 : K_.__wrap(_);
    }
    set_plutus_data(_) {
      p(_, i_), t.transactionwitnessset_set_plutus_data(this.__wbg_ptr, _.__wbg_ptr);
    }
    plutus_data() {
      const _ = t.transactionwitnessset_plutus_data(this.__wbg_ptr);
      return _ === 0 ? void 0 : i_.__wrap(_);
    }
    set_redeemers(_) {
      p(_, S_), t.transactionwitnessset_set_redeemers(this.__wbg_ptr, _.__wbg_ptr);
    }
    redeemers() {
      const _ = t.transactionwitnessset_redeemers(this.__wbg_ptr);
      return _ === 0 ? void 0 : S_.__wrap(_);
    }
    static new() {
      const _ = t.transactionwitnessset_new();
      return u_.__wrap(_);
    }
  };
  const zo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_transactionwitnesssets_free(w >>> 0));
  gt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(gt.prototype);
      return r.__wbg_ptr = _, zo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, zo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_transactionwitnesssets_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionwitnesssets_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.transactionwitnesssets_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return gt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionwitnesssets_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionwitnesssets_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return gt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionwitnesssets_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.transactionwitnesssets_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.transactionwitnesssets_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return gt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.fixedtransactionbodies_new();
      return gt.__wrap(_);
    }
    len() {
      return t.transactionwitnesssets_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.transactionwitnesssets_get(this.__wbg_ptr, _);
      return u_.__wrap(r);
    }
    add(_) {
      p(_, u_), t.transactionwitnesssets_add(this.__wbg_ptr, _.__wbg_ptr);
    }
  };
  const Fo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_treasurywithdrawals_free(w >>> 0));
  mr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(mr.prototype);
      return r.__wbg_ptr = _, Fo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Fo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_treasurywithdrawals_free(_);
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.treasurywithdrawals_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.treasurywithdrawals_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.treasurywithdrawals_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return mr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.treasurywithdrawals_new();
      return mr.__wrap(_);
    }
    get(_) {
      p(_, D);
      const r = t.treasurywithdrawals_get(this.__wbg_ptr, _.__wbg_ptr);
      return r === 0 ? void 0 : h.__wrap(r);
    }
    insert(_, r) {
      p(_, D), p(r, h), t.treasurywithdrawals_insert(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
    }
    keys() {
      const _ = t.treasurywithdrawals_keys(this.__wbg_ptr);
      return Mt.__wrap(_);
    }
    len() {
      return t.treasurywithdrawals_len(this.__wbg_ptr) >>> 0;
    }
  };
  const Ro = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_treasurywithdrawalsaction_free(w >>> 0));
  rt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(rt.prototype);
      return r.__wbg_ptr = _, Ro.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ro.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_treasurywithdrawalsaction_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.treasurywithdrawalsaction_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.treasurywithdrawalsaction_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return rt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.treasurywithdrawalsaction_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.treasurywithdrawalsaction_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return rt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.treasurywithdrawalsaction_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.treasurywithdrawalsaction_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.treasurywithdrawalsaction_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return rt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    withdrawals() {
      const _ = t.treasurywithdrawalsaction_withdrawals(this.__wbg_ptr);
      return mr.__wrap(_);
    }
    policy_hash() {
      const _ = t.treasurywithdrawalsaction_policy_hash(this.__wbg_ptr);
      return _ === 0 ? void 0 : Y.__wrap(_);
    }
    static new(_) {
      p(_, mr);
      const r = t.treasurywithdrawalsaction_new(_.__wbg_ptr);
      return rt.__wrap(r);
    }
    static new_with_policy_hash(_, r) {
      p(_, mr), p(r, Y);
      const o = t.treasurywithdrawalsaction_new_with_policy_hash(_.__wbg_ptr, r.__wbg_ptr);
      return rt.__wrap(o);
    }
  };
  const Oo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_txinputsbuilder_free(w >>> 0));
  Tr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Tr.prototype);
      return r.__wbg_ptr = _, Oo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Oo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_txinputsbuilder_free(_);
    }
    static new() {
      const _ = t.txinputsbuilder_new();
      return Tr.__wrap(_);
    }
    add_regular_utxo(_) {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, O_), t.txinputsbuilder_add_regular_utxo(n, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[n / 4 + 0], o = a()[n / 4 + 1];
        if (o) throw d(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_plutus_script_utxo(_, r) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, O_), p(r, B), t.txinputsbuilder_add_plutus_script_utxo(e, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        if (n) throw d(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_native_script_utxo(_, r) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, O_), p(r, G_), t.txinputsbuilder_add_native_script_utxo(e, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        if (n) throw d(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_key_input(_, r, o) {
      p(_, O), p(r, X), p(o, F), t.txinputsbuilder_add_key_input(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
    }
    add_native_script_input(_, r, o) {
      p(_, G_), p(r, X), p(o, F), t.txinputsbuilder_add_native_script_input(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
    }
    add_plutus_script_input(_, r, o) {
      p(_, B), p(r, X), p(o, F), t.txinputsbuilder_add_plutus_script_input(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
    }
    add_bootstrap_input(_, r, o) {
      p(_, f_), p(r, X), p(o, F), t.txinputsbuilder_add_bootstrap_input(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
    }
    add_regular_input(_, r, o) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, $), p(r, X), p(o, F), t.txinputsbuilder_add_regular_input(s, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
        var n = a()[s / 4 + 0], e = a()[s / 4 + 1];
        if (e) throw d(n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_ref_inputs() {
      const _ = t.txinputsbuilder_get_ref_inputs(this.__wbg_ptr);
      return K.__wrap(_);
    }
    get_native_input_scripts() {
      const _ = t.txinputsbuilder_get_native_input_scripts(this.__wbg_ptr);
      return _ === 0 ? void 0 : U.__wrap(_);
    }
    get_plutus_input_scripts() {
      const _ = t.txinputsbuilder_get_plutus_input_scripts(this.__wbg_ptr);
      return _ === 0 ? void 0 : H_.__wrap(_);
    }
    len() {
      return t.txinputsbuilder_len(this.__wbg_ptr) >>> 0;
    }
    add_required_signer(_) {
      p(_, O), t.txinputsbuilder_add_required_signer(this.__wbg_ptr, _.__wbg_ptr);
    }
    add_required_signers(_) {
      p(_, V), t.txinputsbuilder_add_required_signers(this.__wbg_ptr, _.__wbg_ptr);
    }
    total_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.txinputsbuilder_total_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return F.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    inputs() {
      const _ = t.txinputsbuilder_inputs(this.__wbg_ptr);
      return K.__wrap(_);
    }
    inputs_option() {
      const _ = t.txinputsbuilder_inputs_option(this.__wbg_ptr);
      return _ === 0 ? void 0 : K.__wrap(_);
    }
  };
  const qo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_url_free(w >>> 0));
  ae = class kr {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(kr.prototype);
      return r.__wbg_ptr = _, qo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, qo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_url_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.url_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.url_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return kr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.url_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.url_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return kr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.dnsrecordaoraaaa_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.dnsrecordaoraaaa_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.url_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return kr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.url_new(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return kr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    url() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.dnsrecordaoraaaa_record(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
  };
  const $o = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_unitinterval_free(w >>> 0));
  m = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(m.prototype);
      return r.__wbg_ptr = _, $o.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, $o.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_unitinterval_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.unitinterval_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.unitinterval_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return m.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.unitinterval_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.unitinterval_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return m.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.unitinterval_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.unitinterval_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.unitinterval_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return m.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    numerator() {
      const _ = t.datacost_coins_per_byte(this.__wbg_ptr);
      return h.__wrap(_);
    }
    denominator() {
      const _ = t.unitinterval_denominator(this.__wbg_ptr);
      return h.__wrap(_);
    }
    static new(_, r) {
      p(_, h), p(r, h);
      const o = t.unitinterval_new(_.__wbg_ptr, r.__wbg_ptr);
      return m.__wrap(o);
    }
  };
  const Lo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_update_free(w >>> 0));
  tr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(tr.prototype);
      return r.__wbg_ptr = _, Lo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Lo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_update_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.update_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.update_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return tr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.update_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.update_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return tr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.update_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.update_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.update_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return tr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    proposed_protocol_parameter_updates() {
      const _ = t.update_proposed_protocol_parameter_updates(this.__wbg_ptr);
      return St.__wrap(_);
    }
    epoch() {
      return t.update_epoch(this.__wbg_ptr) >>> 0;
    }
    static new(_, r) {
      p(_, St);
      const o = t.update_new(_.__wbg_ptr, r);
      return tr.__wrap(o);
    }
  };
  const Jo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_updatecommitteeaction_free(w >>> 0));
  et = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(et.prototype);
      return r.__wbg_ptr = _, Jo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Jo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_updatecommitteeaction_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.updatecommitteeaction_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.updatecommitteeaction_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return et.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.updatecommitteeaction_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.updatecommitteeaction_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return et.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.updatecommitteeaction_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.updatecommitteeaction_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.updatecommitteeaction_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return et.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    gov_action_id() {
      const _ = t.updatecommitteeaction_gov_action_id(this.__wbg_ptr);
      return _ === 0 ? void 0 : Z.__wrap(_);
    }
    committee() {
      const _ = t.updatecommitteeaction_committee(this.__wbg_ptr);
      return ot.__wrap(_);
    }
    members_to_remove() {
      const _ = t.updatecommitteeaction_members_to_remove(this.__wbg_ptr);
      return z_.__wrap(_);
    }
    static new(_, r) {
      p(_, ot), p(r, z_);
      const o = t.updatecommitteeaction_new(_.__wbg_ptr, r.__wbg_ptr);
      return et.__wrap(o);
    }
    static new_with_action_id(_, r, o) {
      p(_, Z), p(r, ot), p(o, z_);
      const n = t.updatecommitteeaction_new_with_action_id(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
      return et.__wrap(n);
    }
  };
  const Yo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_vrfcert_free(w >>> 0));
  q_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(q_.prototype);
      return r.__wbg_ptr = _, Yo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Yo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_vrfcert_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.vrfcert_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.vrfcert_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return q_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.vrfcert_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.vrfcert_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return q_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.vrfcert_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.vrfcert_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.vrfcert_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return q_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    output() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.vrfcert_output(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    proof() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.vrfcert_proof(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_, r) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16), i = u(_, t.__wbindgen_malloc), g = b, c = u(r, t.__wbindgen_malloc), v = b;
        t.vrfcert_new(s, i, g, c, v);
        var o = a()[s / 4 + 0], n = a()[s / 4 + 1], e = a()[s / 4 + 2];
        if (e) throw d(n);
        return q_.__wrap(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Qo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_vrfkeyhash_free(w >>> 0));
  ft = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(ft.prototype);
      return r.__wbg_ptr = _, Qo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Qo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_vrfkeyhash_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.vrfkeyhash_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ft.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(_) {
      let r, o;
      try {
        const v = t.__wbindgen_add_to_stack_pointer(-16), j = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), x = b;
        t.anchordatahash_to_bech32(v, this.__wbg_ptr, j, x);
        var n = a()[v / 4 + 0], e = a()[v / 4 + 1], s = a()[v / 4 + 2], i = a()[v / 4 + 3], g = n, c = e;
        if (i) throw g = 0, c = 0, d(s);
        return r = g, o = c, f(g, c);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.vrfkeyhash_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ft.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.vrfkeyhash_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ft.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Xo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_vrfvkey_free(w >>> 0));
  ir = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(ir.prototype);
      return r.__wbg_ptr = _, Xo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Xo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_vrfvkey_free(_);
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.vrfvkey_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ir.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_bech32(_) {
      let r, o;
      try {
        const v = t.__wbindgen_add_to_stack_pointer(-16), j = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), x = b;
        t.anchordatahash_to_bech32(v, this.__wbg_ptr, j, x);
        var n = a()[v / 4 + 0], e = a()[v / 4 + 1], s = a()[v / 4 + 2], i = a()[v / 4 + 3], g = n, c = e;
        if (i) throw g = 0, c = 0, d(s);
        return r = g, o = c, f(g, c);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(r, o, 1);
      }
    }
    static from_bech32(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.vrfvkey_from_bech32(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ir.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.anchordatahash_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.vrfvkey_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return ir.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  const Zo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_value_free(w >>> 0));
  F = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(F.prototype);
      return r.__wbg_ptr = _, Zo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Zo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_value_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.value_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.value_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return F.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.value_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.value_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return F.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.value_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.value_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.value_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return F.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_) {
      p(_, h);
      const r = t.value_new(_.__wbg_ptr);
      return F.__wrap(r);
    }
    static new_from_assets(_) {
      p(_, T);
      const r = t.value_new_from_assets(_.__wbg_ptr);
      return F.__wrap(r);
    }
    static new_with_assets(_, r) {
      p(_, h), p(r, T);
      const o = t.value_new_with_assets(_.__wbg_ptr, r.__wbg_ptr);
      return F.__wrap(o);
    }
    static zero() {
      const _ = t.value_zero();
      return F.__wrap(_);
    }
    is_zero() {
      return t.value_is_zero(this.__wbg_ptr) !== 0;
    }
    coin() {
      const _ = t.value_coin(this.__wbg_ptr);
      return h.__wrap(_);
    }
    set_coin(_) {
      p(_, h), t.value_set_coin(this.__wbg_ptr, _.__wbg_ptr);
    }
    multiasset() {
      const _ = t.value_multiasset(this.__wbg_ptr);
      return _ === 0 ? void 0 : T.__wrap(_);
    }
    set_multiasset(_) {
      p(_, T), t.value_set_multiasset(this.__wbg_ptr, _.__wbg_ptr);
    }
    checked_add(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, F), t.value_checked_add(e, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return F.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    checked_sub(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, F), t.value_checked_sub(e, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return F.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    clamped_sub(_) {
      p(_, F);
      const r = t.value_clamped_sub(this.__wbg_ptr, _.__wbg_ptr);
      return F.__wrap(r);
    }
    compare(_) {
      p(_, F);
      const r = t.value_compare(this.__wbg_ptr, _.__wbg_ptr);
      return r === 16777215 ? void 0 : r;
    }
  };
  const Uo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_versionedblock_free(w >>> 0));
  jr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(jr.prototype);
      return r.__wbg_ptr = _, Uo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Uo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_versionedblock_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.versionedblock_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.versionedblock_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return jr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.versionedblock_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.versionedblock_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return jr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.versionedblock_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.versionedblock_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.versionedblock_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return jr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_, r) {
      p(_, mt);
      var o = _.__destroy_into_raw();
      const n = t.versionedblock_new(o, r);
      return jr.__wrap(n);
    }
    block() {
      const _ = t.versionedblock_block(this.__wbg_ptr);
      return mt.__wrap(_);
    }
    era() {
      return t.versionedblock_era(this.__wbg_ptr);
    }
  };
  const Eo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_vkey_free(w >>> 0));
  __ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(__.prototype);
      return r.__wbg_ptr = _, Eo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Eo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_vkey_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.vkey_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.vkey_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return __.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.vkey_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.vkey_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return __.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.vkey_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.vkey_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.vkey_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return __.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_) {
      p(_, Q_);
      const r = t.vkey_new(_.__wbg_ptr);
      return __.__wrap(r);
    }
    public_key() {
      const _ = t.vkey_public_key(this.__wbg_ptr);
      return Q_.__wrap(_);
    }
  };
  const Ko = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_vkeys_free(w >>> 0));
  le = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(le.prototype);
      return r.__wbg_ptr = _, Ko.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ko.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_vkeys_free(_);
    }
    static new() {
      const _ = t.publickeys_new();
      return le.__wrap(_);
    }
    len() {
      return t.publickeys_size(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.vkeys_get(this.__wbg_ptr, _);
      return __.__wrap(r);
    }
    add(_) {
      p(_, __), t.vkeys_add(this.__wbg_ptr, _.__wbg_ptr);
    }
  };
  const So = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_vkeywitness_free(w >>> 0));
  $_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create($_.prototype);
      return r.__wbg_ptr = _, So.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, So.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_vkeywitness_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.vkeywitness_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.vkeywitness_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return $_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.vkeywitness_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.vkeywitness_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return $_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.vkeywitness_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.vkeywitness_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.vkeywitness_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return $_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_, r) {
      p(_, __), p(r, c_);
      const o = t.vkeywitness_new(_.__wbg_ptr, r.__wbg_ptr);
      return $_.__wrap(o);
    }
    vkey() {
      const _ = t.vkeywitness_vkey(this.__wbg_ptr);
      return __.__wrap(_);
    }
    signature() {
      const _ = t.vkeywitness_signature(this.__wbg_ptr);
      return c_.__wrap(_);
    }
  };
  const Wo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_vkeywitnesses_free(w >>> 0));
  rr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(rr.prototype);
      return r.__wbg_ptr = _, Wo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Wo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_vkeywitnesses_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.vkeywitnesses_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.vkeywitnesses_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return rr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.vkeywitnesses_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.vkeywitnesses_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return rr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.vkeywitnesses_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.vkeywitnesses_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.vkeywitnesses_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return rr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.bootstrapwitnesses_new();
      return rr.__wrap(_);
    }
    len() {
      return t.bootstrapwitnesses_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.vkeywitnesses_get(this.__wbg_ptr, _);
      return $_.__wrap(r);
    }
    add(_) {
      return p(_, $_), t.vkeywitnesses_add(this.__wbg_ptr, _.__wbg_ptr) !== 0;
    }
  };
  const Mo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_votedelegation_free(w >>> 0));
  er = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(er.prototype);
      return r.__wbg_ptr = _, Mo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Mo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_votedelegation_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.votedelegation_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.votedelegation_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return er.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.votedelegation_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.votedelegation_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return er.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.votedelegation_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.votedelegation_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.votedelegation_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return er.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    stake_credential() {
      const _ = t.committeehotauth_committee_cold_credential(this.__wbg_ptr);
      return k.__wrap(_);
    }
    drep() {
      const _ = t.stakeandvotedelegation_drep(this.__wbg_ptr);
      return G.__wrap(_);
    }
    static new(_, r) {
      p(_, k), p(r, G);
      const o = t.votedelegation_new(_.__wbg_ptr, r.__wbg_ptr);
      return er.__wrap(o);
    }
    has_script_credentials() {
      return t.committeehotauth_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const Go = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_voteregistrationanddelegation_free(w >>> 0));
  nr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(nr.prototype);
      return r.__wbg_ptr = _, Go.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Go.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_voteregistrationanddelegation_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.voteregistrationanddelegation_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.voteregistrationanddelegation_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return nr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.voteregistrationanddelegation_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.voteregistrationanddelegation_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return nr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.voteregistrationanddelegation_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.voteregistrationanddelegation_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.voteregistrationanddelegation_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return nr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    stake_credential() {
      const _ = t.voteregistrationanddelegation_stake_credential(this.__wbg_ptr);
      return k.__wrap(_);
    }
    drep() {
      const _ = t.voteregistrationanddelegation_drep(this.__wbg_ptr);
      return G.__wrap(_);
    }
    coin() {
      const _ = t.stakeregistrationanddelegation_coin(this.__wbg_ptr);
      return h.__wrap(_);
    }
    static new(_, r, o) {
      p(_, k), p(r, G), p(o, h);
      const n = t.voteregistrationanddelegation_new(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
      return nr.__wrap(n);
    }
    has_script_credentials() {
      return t.voteregistrationanddelegation_has_script_credentials(this.__wbg_ptr) !== 0;
    }
  };
  const Ho = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_voter_free(w >>> 0));
  N = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(N.prototype);
      return r.__wbg_ptr = _, Ho.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ho.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_voter_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.voter_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.voter_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return N.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.voter_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.voter_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return N.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.voter_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.voter_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.voter_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return N.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new_constitutional_committee_hot_credential(_) {
      p(_, k);
      const r = t.voter_new_constitutional_committee_hot_credential(_.__wbg_ptr);
      return N.__wrap(r);
    }
    static new_drep_credential(_) {
      p(_, k);
      const r = t.voter_new_drep_credential(_.__wbg_ptr);
      return N.__wrap(r);
    }
    static new_stake_pool_key_hash(_) {
      p(_, O);
      const r = t.voter_new_stake_pool_key_hash(_.__wbg_ptr);
      return N.__wrap(r);
    }
    kind() {
      return t.voter_kind(this.__wbg_ptr);
    }
    to_constitutional_committee_hot_credential() {
      const _ = t.voter_to_constitutional_committee_hot_credential(this.__wbg_ptr);
      return _ === 0 ? void 0 : k.__wrap(_);
    }
    to_drep_credential() {
      const _ = t.voter_to_drep_credential(this.__wbg_ptr);
      return _ === 0 ? void 0 : k.__wrap(_);
    }
    to_stake_pool_key_hash() {
      const _ = t.voter_to_stake_pool_key_hash(this.__wbg_ptr);
      return _ === 0 ? void 0 : O.__wrap(_);
    }
    has_script_credentials() {
      return t.voter_has_script_credentials(this.__wbg_ptr) !== 0;
    }
    to_key_hash() {
      const _ = t.voter_to_key_hash(this.__wbg_ptr);
      return _ === 0 ? void 0 : O.__wrap(_);
    }
  };
  const Ao = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_voters_free(w >>> 0));
  Wr = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(Wr.prototype);
      return r.__wbg_ptr = _, Ao.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ao.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_voters_free(_);
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.voters_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.voters_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.voters_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return Wr.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.voters_new();
      return Wr.__wrap(_);
    }
    add(_) {
      p(_, N), t.voters_add(this.__wbg_ptr, _.__wbg_ptr);
    }
    get(_) {
      const r = t.voters_get(this.__wbg_ptr, _);
      return r === 0 ? void 0 : N.__wrap(r);
    }
    len() {
      return t.voters_len(this.__wbg_ptr) >>> 0;
    }
  };
  const Io = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_votingbuilder_free(w >>> 0));
  oe = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(oe.prototype);
      return r.__wbg_ptr = _, Io.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Io.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_votingbuilder_free(_);
    }
    static new() {
      const _ = t.votingbuilder_new();
      return oe.__wrap(_);
    }
    add(_, r, o) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, N), p(r, Z), p(o, b_), t.votingbuilder_add(s, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
        var n = a()[s / 4 + 0], e = a()[s / 4 + 1];
        if (e) throw d(n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_with_plutus_witness(_, r, o, n) {
      try {
        const i = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, N), p(r, Z), p(o, b_), p(n, B), t.votingbuilder_add_with_plutus_witness(i, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr, n.__wbg_ptr);
        var e = a()[i / 4 + 0], s = a()[i / 4 + 1];
        if (s) throw d(e);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_with_native_script(_, r, o, n) {
      try {
        const i = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, N), p(r, Z), p(o, b_), p(n, G_), t.votingbuilder_add_with_native_script(i, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr, n.__wbg_ptr);
        var e = a()[i / 4 + 0], s = a()[i / 4 + 1];
        if (s) throw d(e);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_plutus_witnesses() {
      const _ = t.votingbuilder_get_plutus_witnesses(this.__wbg_ptr);
      return H_.__wrap(_);
    }
    get_ref_inputs() {
      const _ = t.votingbuilder_get_ref_inputs(this.__wbg_ptr);
      return K.__wrap(_);
    }
    get_native_scripts() {
      const _ = t.votingbuilder_get_native_scripts(this.__wbg_ptr);
      return U.__wrap(_);
    }
    has_plutus_scripts() {
      return t.votingbuilder_has_plutus_scripts(this.__wbg_ptr) !== 0;
    }
    build() {
      const _ = t.votingbuilder_build(this.__wbg_ptr);
      return bt.__wrap(_);
    }
  };
  const Do = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_votingprocedure_free(w >>> 0));
  b_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(b_.prototype);
      return r.__wbg_ptr = _, Do.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Do.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_votingprocedure_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.votingprocedure_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.votingprocedure_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return b_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.votingprocedure_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.votingprocedure_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return b_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.votingprocedure_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.votingprocedure_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.votingprocedure_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return b_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new(_) {
      const r = t.votingprocedure_new(_);
      return b_.__wrap(r);
    }
    static new_with_anchor(_, r) {
      p(r, H);
      const o = t.votingprocedure_new_with_anchor(_, r.__wbg_ptr);
      return b_.__wrap(o);
    }
    vote_kind() {
      return t.votingprocedure_vote_kind(this.__wbg_ptr);
    }
    anchor() {
      const _ = t.committeecoldresign_anchor(this.__wbg_ptr);
      return _ === 0 ? void 0 : H.__wrap(_);
    }
  };
  const To = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_votingprocedures_free(w >>> 0));
  bt = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(bt.prototype);
      return r.__wbg_ptr = _, To.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, To.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_votingprocedures_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.votingprocedures_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.votingprocedures_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return bt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.votingprocedures_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.votingprocedures_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return bt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.votingprocedures_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.votingprocedures_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.votingprocedures_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return bt.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.treasurywithdrawals_new();
      return bt.__wrap(_);
    }
    insert(_, r, o) {
      p(_, N), p(r, Z), p(o, b_), t.votingprocedures_insert(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
    }
    get(_, r) {
      p(_, N), p(r, Z);
      const o = t.votingprocedures_get(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
      return o === 0 ? void 0 : b_.__wrap(o);
    }
    get_voters() {
      const _ = t.votingprocedures_get_voters(this.__wbg_ptr);
      return Wr.__wrap(_);
    }
    get_governance_action_ids_by_voter(_) {
      p(_, N);
      const r = t.votingprocedures_get_governance_action_ids_by_voter(this.__wbg_ptr, _.__wbg_ptr);
      return Kr.__wrap(r);
    }
  };
  const No = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_votingproposal_free(w >>> 0));
  L_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(L_.prototype);
      return r.__wbg_ptr = _, No.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, No.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_votingproposal_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.votingproposal_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.votingproposal_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return L_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.votingproposal_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.votingproposal_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return L_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.votingproposal_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.votingproposal_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.votingproposal_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return L_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    governance_action() {
      const _ = t.votingproposal_governance_action(this.__wbg_ptr);
      return r_.__wrap(_);
    }
    anchor() {
      const _ = t.votingproposal_anchor(this.__wbg_ptr);
      return H.__wrap(_);
    }
    reward_account() {
      const _ = t.votingproposal_reward_account(this.__wbg_ptr);
      return D.__wrap(_);
    }
    deposit() {
      const _ = t.votingproposal_deposit(this.__wbg_ptr);
      return h.__wrap(_);
    }
    static new(_, r, o, n) {
      p(_, r_), p(r, H), p(o, D), p(n, h);
      const e = t.votingproposal_new(_.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr, n.__wbg_ptr);
      return L_.__wrap(e);
    }
  };
  const Co = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_votingproposalbuilder_free(w >>> 0));
  ie = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(ie.prototype);
      return r.__wbg_ptr = _, Co.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Co.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_votingproposalbuilder_free(_);
    }
    static new() {
      const _ = t.votingbuilder_new();
      return ie.__wrap(_);
    }
    add(_) {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, L_), t.votingproposalbuilder_add(n, this.__wbg_ptr, _.__wbg_ptr);
        var r = a()[n / 4 + 0], o = a()[n / 4 + 1];
        if (o) throw d(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_with_plutus_witness(_, r) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, L_), p(r, B), t.votingproposalbuilder_add_with_plutus_witness(e, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        if (n) throw d(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_plutus_witnesses() {
      const _ = t.votingproposalbuilder_get_plutus_witnesses(this.__wbg_ptr);
      return H_.__wrap(_);
    }
    get_ref_inputs() {
      const _ = t.votingproposalbuilder_get_ref_inputs(this.__wbg_ptr);
      return K.__wrap(_);
    }
    has_plutus_scripts() {
      return t.votingproposalbuilder_has_plutus_scripts(this.__wbg_ptr) !== 0;
    }
    build() {
      const _ = t.votingproposalbuilder_build(this.__wbg_ptr);
      return U_.__wrap(_);
    }
  };
  const Vo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_votingproposals_free(w >>> 0));
  U_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(U_.prototype);
      return r.__wbg_ptr = _, Vo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Vo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_votingproposals_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.votingproposals_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.votingproposals_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return U_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.votingproposals_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.votingproposals_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return U_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.votingproposals_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.votingproposals_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.votingproposals_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return U_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.certificates_new();
      return U_.__wrap(_);
    }
    len() {
      return t.certificates_len(this.__wbg_ptr) >>> 0;
    }
    get(_) {
      const r = t.votingproposals_get(this.__wbg_ptr, _);
      return L_.__wrap(r);
    }
    add(_) {
      return p(_, L_), t.votingproposals_add(this.__wbg_ptr, _.__wbg_ptr) !== 0;
    }
    contains(_) {
      return p(_, L_), t.votingproposals_contains(this.__wbg_ptr, _.__wbg_ptr) !== 0;
    }
    to_option() {
      const _ = t.votingproposals_to_option(this.__wbg_ptr);
      return _ === 0 ? void 0 : U_.__wrap(_);
    }
  };
  const Po = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_withdrawals_free(w >>> 0));
  W_ = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(W_.prototype);
      return r.__wbg_ptr = _, Po.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Po.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_withdrawals_free(_);
    }
    to_bytes() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.withdrawals_to_bytes(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = y(_, r).slice();
        return t.__wbindgen_free(_, r * 1, 1), o;
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_bytes(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = u(_, t.__wbindgen_malloc), i = b;
        t.withdrawals_from_bytes(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return W_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_hex() {
      let _, r;
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        t.withdrawals_to_hex(e, this.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        return _ = o, r = n, f(o, n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    static from_hex(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.withdrawals_from_hex(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return W_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    to_json() {
      let _, r;
      try {
        const c = t.__wbindgen_add_to_stack_pointer(-16);
        t.withdrawals_to_json(c, this.__wbg_ptr);
        var o = a()[c / 4 + 0], n = a()[c / 4 + 1], e = a()[c / 4 + 2], s = a()[c / 4 + 3], i = o, g = n;
        if (s) throw i = 0, g = 0, d(e);
        return _ = i, r = g, f(i, g);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16), t.__wbindgen_free(_, r, 1);
      }
    }
    to_js_value() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.withdrawals_to_js_value(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return d(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static from_json(_) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16), s = l(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = b;
        t.withdrawals_from_json(e, s, i);
        var r = a()[e / 4 + 0], o = a()[e / 4 + 1], n = a()[e / 4 + 2];
        if (n) throw d(o);
        return W_.__wrap(r);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    static new() {
      const _ = t.auxiliarydataset_new();
      return W_.__wrap(_);
    }
    len() {
      return t.auxiliarydataset_len(this.__wbg_ptr) >>> 0;
    }
    insert(_, r) {
      p(_, D), p(r, h);
      const o = t.withdrawals_insert(this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
      return o === 0 ? void 0 : h.__wrap(o);
    }
    get(_) {
      p(_, D);
      const r = t.withdrawals_get(this.__wbg_ptr, _.__wbg_ptr);
      return r === 0 ? void 0 : h.__wrap(r);
    }
    keys() {
      const _ = t.withdrawals_keys(this.__wbg_ptr);
      return Mt.__wrap(_);
    }
  };
  const Bo = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((w) => t.__wbg_withdrawalsbuilder_free(w >>> 0));
  se = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const r = Object.create(se.prototype);
      return r.__wbg_ptr = _, Bo.register(r, r.__wbg_ptr, r), r;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Bo.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      t.__wbg_withdrawalsbuilder_free(_);
    }
    static new() {
      const _ = t.mintbuilder_new();
      return se.__wrap(_);
    }
    add(_, r) {
      try {
        const e = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, D), p(r, h), t.withdrawalsbuilder_add(e, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr);
        var o = a()[e / 4 + 0], n = a()[e / 4 + 1];
        if (n) throw d(o);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_with_plutus_witness(_, r, o) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, D), p(r, h), p(o, B), t.withdrawalsbuilder_add_with_plutus_witness(s, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
        var n = a()[s / 4 + 0], e = a()[s / 4 + 1];
        if (e) throw d(n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    add_with_native_script(_, r, o) {
      try {
        const s = t.__wbindgen_add_to_stack_pointer(-16);
        p(_, D), p(r, h), p(o, G_), t.withdrawalsbuilder_add_with_native_script(s, this.__wbg_ptr, _.__wbg_ptr, r.__wbg_ptr, o.__wbg_ptr);
        var n = a()[s / 4 + 0], e = a()[s / 4 + 1];
        if (e) throw d(n);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get_plutus_witnesses() {
      const _ = t.withdrawalsbuilder_get_plutus_witnesses(this.__wbg_ptr);
      return H_.__wrap(_);
    }
    get_ref_inputs() {
      const _ = t.withdrawalsbuilder_get_ref_inputs(this.__wbg_ptr);
      return K.__wrap(_);
    }
    get_native_scripts() {
      const _ = t.withdrawalsbuilder_get_native_scripts(this.__wbg_ptr);
      return U.__wrap(_);
    }
    get_total_withdrawals() {
      try {
        const n = t.__wbindgen_add_to_stack_pointer(-16);
        t.withdrawalsbuilder_get_total_withdrawals(n, this.__wbg_ptr);
        var _ = a()[n / 4 + 0], r = a()[n / 4 + 1], o = a()[n / 4 + 2];
        if (o) throw d(r);
        return F.__wrap(_);
      } finally {
        t.__wbindgen_add_to_stack_pointer(16);
      }
    }
    has_plutus_scripts() {
      return t.withdrawalsbuilder_has_plutus_scripts(this.__wbg_ptr) !== 0;
    }
    build() {
      const _ = t.withdrawalsbuilder_build(this.__wbg_ptr);
      return W_.__wrap(_);
    }
  };
  ui = function(w) {
    return q(w);
  };
  hi = function(w) {
    d(w);
  };
  yi = function(w, _) {
    const r = f(w, _);
    return q(r);
  };
  vi = function(w, _) {
    const r = z(_), o = typeof r == "string" ? r : void 0;
    var n = p_(o) ? 0 : l(o, t.__wbindgen_malloc, t.__wbindgen_realloc), e = b;
    a()[w / 4 + 1] = e, a()[w / 4 + 0] = n;
  };
  mi = function(w, _) {
    const r = new Error(f(w, _));
    return q(r);
  };
  ki = function(w) {
    const _ = z(w);
    return q(_);
  };
  ji = function(w) {
    const _ = z(w);
    return typeof _ == "object" && _ !== null;
  };
  xi = function(w, _) {
    const r = String(z(_)), o = l(r, t.__wbindgen_malloc, t.__wbindgen_realloc), n = b;
    a()[w / 4 + 1] = n, a()[w / 4 + 0] = o;
  };
  zi = function(w, _, r) {
    z(w)[d(_)] = d(r);
  };
  Fi = function(w) {
    const _ = z(w).crypto;
    return q(_);
  };
  Ri = function(w) {
    const _ = z(w).process;
    return q(_);
  };
  Oi = function(w) {
    const _ = z(w).versions;
    return q(_);
  };
  qi = function(w) {
    const _ = z(w).node;
    return q(_);
  };
  $i = function(w) {
    return typeof z(w) == "string";
  };
  Li = function() {
    return ut(function() {
      const w = module.require;
      return q(w);
    }, arguments);
  };
  Ji = function(w) {
    const _ = z(w).msCrypto;
    return q(_);
  };
  Yi = function() {
    return ut(function(w, _) {
      z(w).randomFillSync(d(_));
    }, arguments);
  };
  Qi = function() {
    return ut(function(w, _) {
      z(w).getRandomValues(z(_));
    }, arguments);
  };
  Xi = function() {
    const w = new Array();
    return q(w);
  };
  Zi = function(w) {
    return typeof z(w) == "function";
  };
  Ui = function(w, _) {
    const r = new Function(f(w, _));
    return q(r);
  };
  Ei = function() {
    return q(/* @__PURE__ */ new Map());
  };
  Ki = function() {
    return ut(function(w, _) {
      const r = z(w).call(z(_));
      return q(r);
    }, arguments);
  };
  Si = function() {
    const w = new Object();
    return q(w);
  };
  Wi = function() {
    return ut(function() {
      const w = self.self;
      return q(w);
    }, arguments);
  };
  Mi = function() {
    return ut(function() {
      const w = window.window;
      return q(w);
    }, arguments);
  };
  Gi = function() {
    return ut(function() {
      const w = globalThis.globalThis;
      return q(w);
    }, arguments);
  };
  Hi = function() {
    return ut(function() {
      const w = global.global;
      return q(w);
    }, arguments);
  };
  Ai = function(w) {
    return z(w) === void 0;
  };
  Ii = function(w, _, r) {
    z(w)[_ >>> 0] = d(r);
  };
  Di = function() {
    return ut(function(w, _, r) {
      const o = z(w).call(z(_), z(r));
      return q(o);
    }, arguments);
  };
  Ti = function(w, _, r) {
    const o = z(w).set(z(_), z(r));
    return q(o);
  };
  Ni = function(w) {
    const _ = z(w).buffer;
    return q(_);
  };
  Ci = function(w, _, r) {
    const o = new Uint8Array(z(w), _ >>> 0, r >>> 0);
    return q(o);
  };
  Vi = function(w) {
    const _ = new Uint8Array(z(w));
    return q(_);
  };
  Pi = function(w, _, r) {
    z(w).set(z(_), r >>> 0);
  };
  Bi = function(w) {
    const _ = new Uint8Array(w >>> 0);
    return q(_);
  };
  _s = function(w, _, r) {
    const o = z(w).subarray(_ >>> 0, r >>> 0);
    return q(o);
  };
  ts = function(w, _) {
    const r = new Function(f(w, _));
    return q(r);
  };
  rs = function(w, _) {
    const r = z(w).call(z(_));
    return q(r);
  };
  es = function(w, _) {
    return z(w) === z(_);
  };
  ns = function(w) {
    const _ = z(w).self;
    return q(_);
  };
  as = function(w, _) {
    const r = require(f(w, _));
    return q(r);
  };
  os = function(w) {
    const _ = z(w).crypto;
    return q(_);
  };
  is = function(w) {
    const _ = z(w).getRandomValues;
    return q(_);
  };
  ss = function(w, _, r) {
    z(w).randomFillSync(y(_, r));
  };
  ds = function(w, _, r) {
    z(w).getRandomValues(y(_, r));
  };
  cs = function(w, _) {
    const r = ce(z(_)), o = l(r, t.__wbindgen_malloc, t.__wbindgen_realloc), n = b;
    a()[w / 4 + 1] = n, a()[w / 4 + 0] = o;
  };
  ps = function(w, _) {
    throw new Error(f(w, _));
  };
  ws = function() {
    const w = t.memory;
    return q(w);
  };
  URL = globalThis.URL;
  const gs = await di({
    "./cardano_serialization_lib_bg.js": {
      __wbindgen_number_new: ui,
      __wbindgen_object_drop_ref: hi,
      __wbindgen_string_new: yi,
      __wbindgen_string_get: vi,
      __wbindgen_error_new: mi,
      __wbindgen_object_clone_ref: ki,
      __wbindgen_is_object: ji,
      __wbg_String_91fba7ded13ba54c: xi,
      __wbg_set_20cbc34131e76824: zi,
      __wbg_crypto_1d1f22824a6a080c: Fi,
      __wbg_process_4a72847cc503995b: Ri,
      __wbg_versions_f686565e586dd935: Oi,
      __wbg_node_104a2ff8d6ea03a2: qi,
      __wbindgen_is_string: $i,
      __wbg_require_cca90b1a94a0255b: Li,
      __wbg_msCrypto_eb05e62b530a1508: Ji,
      __wbg_randomFillSync_5c9c955aa56b6049: Yi,
      __wbg_getRandomValues_3aa56aa6edec874c: Qi,
      __wbg_new_16b304a2cfa7ff4a: Xi,
      __wbindgen_is_function: Zi,
      __wbg_newnoargs_e258087cd0daa0ea: Ui,
      __wbg_new_d9bc3a0147634640: Ei,
      __wbg_call_27c0f87801dedf93: Ki,
      __wbg_new_72fb9a18b5ae2624: Si,
      __wbg_self_ce0dbfc45cf2f5be: Wi,
      __wbg_window_c6fb939a7f436783: Mi,
      __wbg_globalThis_d1e6af4856ba331b: Gi,
      __wbg_global_207b558942527489: Hi,
      __wbindgen_is_undefined: Ai,
      __wbg_set_d4638f722068f043: Ii,
      __wbg_call_b3ca7c6051f9bec1: Di,
      __wbg_set_8417257aaedc936b: Ti,
      __wbg_buffer_12d079cc21e14bdb: Ni,
      __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb: Ci,
      __wbg_new_63b92bc8671ed464: Vi,
      __wbg_set_a47bac70306a19a7: Pi,
      __wbg_newwithlength_e9b4878cebadb3d3: Bi,
      __wbg_subarray_a1f73cd4b5b42fe1: _s,
      __wbg_new_d87f272aec784ec0: ts,
      __wbg_call_eae29933372a39be: rs,
      __wbindgen_jsval_eq: es,
      __wbg_self_e0b3266d2d9eba1a: ns,
      __wbg_require_0993fe224bf8e202: as,
      __wbg_crypto_e95a6e54c5c2e37f: os,
      __wbg_getRandomValues_dc67302a7bd1aec5: is,
      __wbg_randomFillSync_dd2297de5917c74e: ss,
      __wbg_getRandomValues_02639197c8166a96: ds,
      __wbindgen_debug_string: cs,
      __wbindgen_throw: ps,
      __wbindgen_memory: ws
    }
  }, si), { memory: bs, __wbg_moveinstantaneousrewardscert_free: ls, moveinstantaneousrewardscert_to_bytes: fs, moveinstantaneousrewardscert_from_bytes: us, moveinstantaneousrewardscert_to_hex: hs, moveinstantaneousrewardscert_from_hex: ys, moveinstantaneousrewardscert_to_json: vs, moveinstantaneousrewardscert_to_js_value: ms, moveinstantaneousrewardscert_from_json: ks, moveinstantaneousrewardscert_move_instantaneous_reward: js, moveinstantaneousrewardscert_new: xs, __wbg_mirtostakecredentials_free: zs, mirtostakecredentials_to_bytes: Fs, mirtostakecredentials_from_bytes: Rs, mirtostakecredentials_to_hex: Os, mirtostakecredentials_from_hex: qs, mirtostakecredentials_to_json: $s, mirtostakecredentials_to_js_value: Ls, mirtostakecredentials_from_json: Js, mirtostakecredentials_new: Ys, mirtostakecredentials_len: Qs, mirtostakecredentials_insert: Xs, mirtostakecredentials_get: Zs, mirtostakecredentials_keys: Us, __wbg_moveinstantaneousreward_free: Es, moveinstantaneousreward_to_bytes: Ks, moveinstantaneousreward_from_bytes: Ss, moveinstantaneousreward_to_hex: Ws, moveinstantaneousreward_from_hex: Ms, moveinstantaneousreward_to_json: Gs, moveinstantaneousreward_to_js_value: Hs, moveinstantaneousreward_from_json: As, moveinstantaneousreward_new_to_other_pot: Is, moveinstantaneousreward_new_to_stake_creds: Ds, moveinstantaneousreward_pot: Ts, moveinstantaneousreward_kind: Ns, moveinstantaneousreward_as_to_other_pot: Cs, moveinstantaneousreward_as_to_stake_creds: Vs, poolregistration_to_bytes: Ps, poolregistration_from_bytes: Bs, poolregistration_to_hex: _d, poolregistration_from_hex: td, poolregistration_to_json: rd, poolregistration_to_js_value: ed, poolregistration_from_json: nd, poolregistration_pool_params: ad, poolregistration_new: od, __wbg_relays_free: id, relays_to_bytes: sd, relays_from_bytes: dd, relays_to_hex: cd, relays_from_hex: pd, relays_to_json: wd, relays_to_js_value: gd, relays_from_json: bd, relays_new: ld, relays_len: fd, relays_get: ud, relays_add: hd, __wbg_poolparams_free: yd, poolparams_to_bytes: vd, poolparams_from_bytes: md, poolparams_to_hex: kd, poolparams_from_hex: jd, poolparams_to_json: xd, poolparams_to_js_value: zd, poolparams_from_json: Fd, poolparams_operator: Rd, poolparams_vrf_keyhash: Od, poolparams_pledge: qd, poolparams_cost: $d, poolparams_margin: Ld, poolparams_reward_account: Jd, poolparams_pool_owners: Yd, poolparams_relays: Qd, poolparams_pool_metadata: Xd, poolparams_new: Zd, votedelegation_to_bytes: Ud, votedelegation_from_bytes: Ed, votedelegation_to_hex: Kd, votedelegation_from_hex: Sd, votedelegation_to_json: Wd, votedelegation_to_js_value: Md, votedelegation_from_json: Gd, votedelegation_new: Hd, __wbg_stakeandvotedelegation_free: Ad, stakeandvotedelegation_to_bytes: Id, stakeandvotedelegation_from_bytes: Dd, stakeandvotedelegation_to_hex: Td, stakeandvotedelegation_from_hex: Nd, stakeandvotedelegation_to_json: Cd, stakeandvotedelegation_to_js_value: Vd, stakeandvotedelegation_from_json: Pd, stakeandvotedelegation_pool_keyhash: Bd, stakeandvotedelegation_drep: _c, stakeandvotedelegation_new: tc, __wbg_stakeregistrationanddelegation_free: rc, stakeregistrationanddelegation_to_bytes: ec, stakeregistrationanddelegation_from_bytes: nc, stakeregistrationanddelegation_to_hex: ac, stakeregistrationanddelegation_from_hex: oc, stakeregistrationanddelegation_to_json: ic, stakeregistrationanddelegation_to_js_value: sc, stakeregistrationanddelegation_from_json: dc, stakeregistrationanddelegation_stake_credential: cc, stakeregistrationanddelegation_pool_keyhash: pc, stakeregistrationanddelegation_coin: wc, stakeregistrationanddelegation_new: gc, stakeregistrationanddelegation_has_script_credentials: bc, __wbg_stakevoteregistrationanddelegation_free: lc, stakevoteregistrationanddelegation_to_bytes: fc, stakevoteregistrationanddelegation_from_bytes: uc, stakevoteregistrationanddelegation_to_hex: hc, stakevoteregistrationanddelegation_from_hex: yc, stakevoteregistrationanddelegation_to_json: vc, stakevoteregistrationanddelegation_to_js_value: mc, stakevoteregistrationanddelegation_from_json: kc, stakevoteregistrationanddelegation_stake_credential: jc, stakevoteregistrationanddelegation_drep: xc, stakevoteregistrationanddelegation_new: zc, stakevoteregistrationanddelegation_has_script_credentials: Fc, voteregistrationanddelegation_to_bytes: Rc, voteregistrationanddelegation_from_bytes: Oc, voteregistrationanddelegation_to_hex: qc, voteregistrationanddelegation_from_hex: $c, voteregistrationanddelegation_to_json: Lc, voteregistrationanddelegation_to_js_value: Jc, voteregistrationanddelegation_from_json: Yc, voteregistrationanddelegation_stake_credential: Qc, voteregistrationanddelegation_drep: Xc, voteregistrationanddelegation_new: Zc, voteregistrationanddelegation_has_script_credentials: Uc, __wbg_committeehotauth_free: Ec, committeehotauth_to_bytes: Kc, committeehotauth_from_bytes: Sc, committeehotauth_to_hex: Wc, committeehotauth_from_hex: Mc, committeehotauth_to_json: Gc, committeehotauth_to_js_value: Hc, committeehotauth_from_json: Ac, committeehotauth_committee_cold_credential: Ic, committeehotauth_committee_hot_credential: Dc, committeehotauth_new: Tc, committeehotauth_has_script_credentials: Nc, drep_to_bytes: Cc, drep_from_bytes: Vc, drep_to_hex: Pc, drep_from_hex: Bc, drep_to_json: _p, drep_to_js_value: tp, drep_from_json: rp, drep_new_key_hash: ep, drep_new_script_hash: np, drep_new_always_abstain: ap, drep_new_always_no_confidence: op, drep_new_from_credential: ip, drep_kind: sp, drep_to_key_hash: dp, drep_to_script_hash: cp, drep_to_bech32: pp, drep_from_bech32: wp, __wbg_voter_free: gp, voter_to_bytes: bp, voter_from_bytes: lp, voter_to_hex: fp, voter_from_hex: up, voter_to_json: hp, voter_to_js_value: yp, voter_from_json: vp, voter_new_constitutional_committee_hot_credential: mp, voter_new_drep_credential: kp, voter_new_stake_pool_key_hash: jp, voter_kind: xp, voter_to_constitutional_committee_hot_credential: zp, voter_to_drep_credential: Fp, voter_to_stake_pool_key_hash: Rp, voter_has_script_credentials: Op, voter_to_key_hash: qp, __wbg_language_free: $p, language_to_bytes: Lp, language_from_bytes: Jp, language_to_hex: Yp, language_from_hex: Qp, language_to_json: Xp, language_to_js_value: Zp, language_from_json: Up, language_new_plutus_v1: Ep, language_new_plutus_v2: Kp, language_new_plutus_v3: Sp, language_kind: Wp, __wbg_credential_free: Mp, credential_from_keyhash: Gp, credential_from_scripthash: Hp, credential_to_keyhash: Ap, credential_to_scripthash: Ip, credential_kind: Dp, credential_has_script_hash: Tp, credential_to_bytes: Np, credential_from_bytes: Cp, credential_to_hex: Vp, credential_from_hex: Pp, credential_to_json: Bp, credential_to_js_value: _w, credential_from_json: tw, __wbg_vkeywitnesses_free: rw, vkeywitnesses_to_bytes: ew, vkeywitnesses_from_bytes: nw, vkeywitnesses_to_hex: aw, vkeywitnesses_from_hex: ow, vkeywitnesses_to_json: iw, vkeywitnesses_to_js_value: sw, vkeywitnesses_from_json: dw, vkeywitnesses_get: cw, vkeywitnesses_add: pw, __wbg_bootstrapwitnesses_free: ww, bootstrapwitnesses_to_bytes: gw, bootstrapwitnesses_from_bytes: bw, bootstrapwitnesses_to_hex: lw, bootstrapwitnesses_from_hex: fw, bootstrapwitnesses_to_json: uw, bootstrapwitnesses_to_js_value: hw, bootstrapwitnesses_from_json: yw, bootstrapwitnesses_new: vw, bootstrapwitnesses_len: mw, bootstrapwitnesses_get: kw, bootstrapwitnesses_add: jw, __wbg_publickey_free: xw, publickey_from_hex: zw, publickey_to_hex: Fw, publickey_hash: Rw, publickey_verify: Ow, publickey_from_bytes: qw, publickey_as_bytes: $w, publickey_to_bech32: Lw, publickey_from_bech32: Jw, __wbg_poolregistration_free: Yw, __wbg_voteregistrationanddelegation_free: Qw, __wbg_votedelegation_free: Xw, __wbg_drep_free: Zw, vkeywitnesses_new: Uw, votedelegation_drep: Ew, votedelegation_has_script_credentials: Kw, votedelegation_stake_credential: Sw, stakevoteregistrationanddelegation_coin: Ww, stakevoteregistrationanddelegation_pool_keyhash: Mw, voteregistrationanddelegation_coin: Gw, stakeandvotedelegation_has_script_credentials: Hw, stakeandvotedelegation_stake_credential: Aw, vkeywitnesses_len: Iw, __wbg_stakeregistration_free: Dw, stakeregistration_to_bytes: Tw, stakeregistration_from_bytes: Nw, stakeregistration_to_hex: Cw, stakeregistration_from_hex: Vw, stakeregistration_to_json: Pw, stakeregistration_to_js_value: Bw, stakeregistration_from_json: _g, stakeregistration_stake_credential: tg, stakeregistration_coin: rg, stakeregistration_new: eg, stakeregistration_new_with_explicit_deposit: ng, stakeregistration_has_script_credentials: ag, __wbg_redeemertag_free: og, redeemertag_to_bytes: ig, redeemertag_from_bytes: sg, redeemertag_to_hex: dg, redeemertag_from_hex: cg, redeemertag_to_json: pg, redeemertag_to_js_value: wg, redeemertag_from_json: gg, redeemertag_new_spend: bg, redeemertag_new_mint: lg, redeemertag_new_cert: fg, redeemertag_new_reward: ug, redeemertag_new_vote: hg, redeemertag_new_voting_proposal: yg, redeemertag_kind: vg, __wbg_bip32publickey_free: mg, __wbg_legacydaedalusprivatekey_free: kg, legacydaedalusprivatekey_from_bytes: jg, legacydaedalusprivatekey_as_bytes: xg, legacydaedalusprivatekey_chaincode: zg, __wbg_nonce_free: Fg, nonce_to_bytes: Rg, nonce_from_bytes: Og, nonce_to_hex: qg, nonce_from_hex: $g, nonce_to_json: Lg, nonce_to_js_value: Jg, nonce_from_json: Yg, nonce_new_identity: Qg, nonce_new_from_hash: Xg, nonce_get_hash: Zg, __wbg_unitinterval_free: Ug, unitinterval_to_bytes: Eg, unitinterval_from_bytes: Kg, unitinterval_to_hex: Sg, unitinterval_from_hex: Wg, unitinterval_to_json: Mg, unitinterval_to_js_value: Gg, unitinterval_from_json: Hg, unitinterval_denominator: Ag, unitinterval_new: Ig, __wbg_transaction_free: Dg, transaction_to_bytes: Tg, transaction_from_bytes: Ng, transaction_to_hex: Cg, transaction_from_hex: Vg, transaction_to_json: Pg, transaction_to_js_value: Bg, transaction_from_json: _b, transaction_body: tb, transaction_witness_set: rb, transaction_is_valid: eb, transaction_auxiliary_data: nb, transaction_set_is_valid: ab, transaction_new: ob, __wbg_transactionoutputs_free: ib, transactionoutputs_to_bytes: sb, transactionoutputs_from_bytes: db, transactionoutputs_to_hex: cb, transactionoutputs_from_hex: pb, transactionoutputs_to_json: wb, transactionoutputs_to_js_value: gb, transactionoutputs_from_json: bb, transactionoutputs_new: lb, transactionoutputs_len: fb, transactionoutputs_get: ub, transactionoutputs_add: hb, __wbg_datacost_free: yb, datacost_new_coins_per_byte: vb, datacost_coins_per_byte: mb, __wbg_transactionoutput_free: kb, transactionoutput_to_bytes: jb, transactionoutput_from_bytes: xb, transactionoutput_to_hex: zb, transactionoutput_from_hex: Fb, transactionoutput_to_json: Rb, transactionoutput_to_js_value: Ob, transactionoutput_from_json: qb, transactionoutput_address: $b, transactionoutput_amount: Lb, transactionoutput_data_hash: Jb, transactionoutput_plutus_data: Yb, transactionoutput_script_ref: Qb, transactionoutput_set_script_ref: Xb, transactionoutput_set_plutus_data: Zb, transactionoutput_set_data_hash: Ub, transactionoutput_has_plutus_data: Eb, transactionoutput_has_data_hash: Kb, transactionoutput_has_script_ref: Sb, transactionoutput_new: Wb, transactionoutput_serialization_format: Mb, __wbg_ipv4_free: Gb, ipv4_to_bytes: Hb, ipv4_from_bytes: Ab, ipv4_to_hex: Ib, ipv4_from_hex: Db, ipv4_to_json: Tb, ipv4_to_js_value: Nb, ipv4_from_json: Cb, ipv4_new: Vb, ipv4_ip: Pb, __wbg_ipv6_free: Bb, ipv6_to_bytes: _l, ipv6_from_bytes: tl, ipv6_to_hex: rl, ipv6_from_hex: el, ipv6_to_json: nl, ipv6_to_js_value: al, ipv6_from_json: ol, ipv6_new: il, ipv6_ip: sl, url_to_bytes: dl, url_from_bytes: cl, url_to_hex: pl, url_from_hex: wl, url_from_json: gl, url_new: bl, dnsrecordaoraaaa_to_bytes: ll, dnsrecordaoraaaa_from_bytes: fl, dnsrecordaoraaaa_to_hex: ul, dnsrecordaoraaaa_from_hex: hl, dnsrecordaoraaaa_to_json: yl, dnsrecordaoraaaa_to_js_value: vl, dnsrecordaoraaaa_from_json: ml, dnsrecordaoraaaa_new: kl, dnsrecordaoraaaa_record: jl, dnsrecordsrv_to_bytes: xl, dnsrecordsrv_from_bytes: zl, dnsrecordsrv_to_hex: Fl, dnsrecordsrv_from_hex: Rl, dnsrecordsrv_from_json: Ol, dnsrecordsrv_new: ql, __wbg_singlehostaddr_free: $l, singlehostaddr_to_bytes: Ll, singlehostaddr_from_bytes: Jl, singlehostaddr_to_hex: Yl, singlehostaddr_from_hex: Ql, singlehostaddr_to_json: Xl, singlehostaddr_to_js_value: Zl, singlehostaddr_from_json: Ul, singlehostaddr_port: El, singlehostaddr_ipv4: Kl, singlehostaddr_ipv6: Sl, singlehostaddr_new: Wl, __wbg_singlehostname_free: Ml, singlehostname_to_bytes: Gl, singlehostname_from_bytes: Hl, singlehostname_to_hex: Al, singlehostname_from_hex: Il, singlehostname_to_json: Dl, singlehostname_to_js_value: Tl, singlehostname_from_json: Nl, singlehostname_port: Cl, singlehostname_new: Vl, multihostname_to_bytes: Pl, multihostname_from_bytes: Bl, multihostname_to_hex: _f, multihostname_from_hex: tf, multihostname_to_json: rf, multihostname_to_js_value: ef, multihostname_from_json: nf, multihostname_dns_name: af, __wbg_relay_free: of, relay_to_bytes: sf, relay_from_bytes: df, relay_to_hex: cf, relay_from_hex: pf, relay_to_json: wf, relay_to_js_value: gf, relay_from_json: bf, relay_new_single_host_addr: lf, relay_new_single_host_name: ff, relay_new_multi_host_name: uf, relay_kind: hf, relay_as_single_host_addr: yf, relay_as_single_host_name: vf, relay_as_multi_host_name: mf, __wbg_poolmetadata_free: kf, poolmetadata_to_bytes: jf, poolmetadata_from_bytes: xf, poolmetadata_to_hex: zf, poolmetadata_from_hex: Ff, poolmetadata_to_json: Rf, poolmetadata_to_js_value: Of, poolmetadata_from_json: qf, poolmetadata_pool_metadata_hash: $f, poolmetadata_new: Lf, __wbg_rewardaddresses_free: Jf, rewardaddresses_to_bytes: Yf, rewardaddresses_from_bytes: Qf, rewardaddresses_to_hex: Xf, rewardaddresses_from_hex: Zf, rewardaddresses_to_json: Uf, rewardaddresses_to_js_value: Ef, rewardaddresses_from_json: Kf, rewardaddresses_len: Sf, rewardaddresses_get: Wf, rewardaddresses_add: Mf, __wbg_withdrawals_free: Gf, withdrawals_to_bytes: Hf, withdrawals_from_bytes: Af, withdrawals_to_hex: If, withdrawals_from_hex: Df, withdrawals_to_json: Tf, withdrawals_to_js_value: Nf, withdrawals_from_json: Cf, withdrawals_insert: Vf, withdrawals_get: Pf, withdrawals_keys: Bf, __wbg_outputdatum_free: _u, outputdatum_new_data_hash: tu, outputdatum_new_data: ru, outputdatum_data_hash: eu, outputdatum_data: nu, __wbg_update_free: au, update_to_bytes: ou, update_from_bytes: iu, update_to_hex: su, update_from_hex: du, update_to_json: cu, update_to_js_value: pu, update_from_json: wu, update_proposed_protocol_parameter_updates: gu, update_epoch: bu, update_new: lu, __wbg_genesishashes_free: fu, genesishashes_to_bytes: uu, genesishashes_from_bytes: hu, genesishashes_to_hex: yu, genesishashes_from_hex: vu, genesishashes_to_json: mu, genesishashes_to_js_value: ku, genesishashes_from_json: ju, genesishashes_new: xu, genesishashes_len: zu, genesishashes_get: Fu, genesishashes_add: Ru, scripthashes_to_bytes: Ou, scripthashes_from_bytes: qu, scripthashes_to_hex: $u, scripthashes_from_hex: Lu, scripthashes_to_json: Ju, scripthashes_to_js_value: Yu, scripthashes_from_json: Qu, scripthashes_get: Xu, scripthashes_add: Zu, __wbg_proposedprotocolparameterupdates_free: Uu, proposedprotocolparameterupdates_to_bytes: Eu, proposedprotocolparameterupdates_from_bytes: Ku, proposedprotocolparameterupdates_to_hex: Su, proposedprotocolparameterupdates_from_hex: Wu, proposedprotocolparameterupdates_to_json: Mu, proposedprotocolparameterupdates_to_js_value: Gu, proposedprotocolparameterupdates_from_json: Hu, proposedprotocolparameterupdates_insert: Au, proposedprotocolparameterupdates_get: Iu, proposedprotocolparameterupdates_keys: Du, __wbg_protocolversion_free: Tu, protocolversion_to_bytes: Nu, protocolversion_from_bytes: Cu, protocolversion_to_hex: Vu, protocolversion_from_hex: Pu, protocolversion_to_json: Bu, protocolversion_to_js_value: _h, protocolversion_from_json: th, protocolversion_major: rh, protocolversion_minor: eh, protocolversion_new: nh, __wbg_auxiliarydataset_free: ah, auxiliarydataset_new: oh, auxiliarydataset_len: ih, auxiliarydataset_insert: sh, auxiliarydataset_get: dh, auxiliarydataset_indices: ch, __wbg_assetname_free: ph, assetname_to_bytes: wh, assetname_from_bytes: gh, assetname_to_hex: bh, assetname_from_hex: lh, assetname_to_json: fh, assetname_to_js_value: uh, assetname_from_json: hh, assetname_new: yh, assetname_name: vh, __wbg_assetnames_free: mh, assetnames_to_bytes: kh, assetnames_from_bytes: jh, assetnames_to_hex: xh, assetnames_from_hex: zh, assetnames_to_json: Fh, assetnames_to_js_value: Rh, assetnames_from_json: Oh, assetnames_new: qh, assetnames_len: $h, assetnames_get: Lh, assetnames_add: Jh, __wbg_assets_free: Yh, assets_to_bytes: Qh, assets_from_bytes: Xh, assets_to_hex: Zh, assets_from_hex: Uh, assets_to_json: Eh, assets_to_js_value: Kh, assets_from_json: Sh, assets_new: Wh, assets_len: Mh, assets_insert: Gh, assets_get: Hh, assets_keys: Ah, __wbg_multiasset_free: Ih, multiasset_to_bytes: Dh, multiasset_from_bytes: Th, multiasset_to_hex: Nh, multiasset_from_hex: Ch, multiasset_to_json: Vh, multiasset_to_js_value: Ph, multiasset_from_json: Bh, multiasset_insert: _y, multiasset_get: ty, multiasset_set_asset: ry, multiasset_get_asset: ey, multiasset_keys: ny, multiasset_sub: ay, __wbg_mintsassets_free: oy, mintsassets_to_json: iy, mintsassets_to_js_value: sy, mintsassets_from_json: dy, mintsassets_add: cy, mintsassets_get: py, __wbg_mintassets_free: wy, mintassets_new_from_entry: gy, mintassets_insert: by, mintassets_get: ly, mintassets_keys: fy, __wbg_mint_free: uy, mint_to_bytes: hy, mint_from_bytes: yy, mint_to_hex: vy, mint_from_hex: my, mint_to_json: ky, mint_to_js_value: jy, mint_from_json: xy, mint_new_from_entry: zy, mint_len: Fy, mint_insert: Ry, mint_get: Oy, mint_keys: qy, mint_as_positive_multiasset: $y, mint_as_negative_multiasset: Ly, __wbg_networkid_free: Jy, networkid_to_bytes: Yy, networkid_from_bytes: Qy, networkid_to_hex: Xy, networkid_from_hex: Zy, networkid_to_json: Uy, networkid_to_js_value: Ey, networkid_from_json: Ky, networkid_testnet: Sy, networkid_mainnet: Wy, networkid_kind: My, bip32publickey_from_hex: Gy, bip32publickey_to_hex: Hy, bip32publickey_chaincode: Ay, bip32publickey_to_bech32: Iy, bip32publickey_from_bech32: Dy, bip32publickey_as_bytes: Ty, bip32publickey_from_bytes: Ny, bip32publickey_to_raw_key: Cy, bip32publickey_derive: Vy, __wbg_url_free: Py, __wbg_dnsrecordsrv_free: By, __wbg_multihostname_free: _v, __wbg_dnsrecordaoraaaa_free: tv, unitinterval_numerator: rv, withdrawals_len: ev, proposedprotocolparameterupdates_len: nv, multiasset_len: av, mintassets_len: ov, scripthashes_len: iv, mintsassets_len: sv, url_to_json: dv, dnsrecordsrv_to_json: cv, url_url: pv, dnsrecordsrv_record: wv, multiasset_new: gv, mintassets_new: bv, withdrawals_new: lv, proposedprotocolparameterupdates_new: fv, url_to_js_value: uv, dnsrecordsrv_to_js_value: hv, __wbg_scripthashes_free: yv, singlehostname_dns_name: vv, poolmetadata_url: mv, rewardaddresses_new: kv, scripthashes_new: jv, multihostname_new: xv, mintsassets_new: zv, mint_new: Fv, __wbg_linearfee_free: Rv, linearfee_constant: Ov, linearfee_coefficient: qv, linearfee_new: $v, min_fee: Lv, calculate_ex_units_ceil_cost: Jv, min_script_fee: Yv, min_ref_script_fee: Qv, __wbg_languages_free: Xv, languages_new: Zv, languages_len: Uv, languages_get: Ev, languages_add: Kv, languages_list: Sv, __wbg_exunitprices_free: Wv, exunitprices_to_bytes: Mv, exunitprices_from_bytes: Gv, exunitprices_to_hex: Hv, exunitprices_from_hex: Av, exunitprices_to_json: Iv, exunitprices_to_js_value: Dv, exunitprices_from_json: Tv, exunitprices_new: Nv, __wbg_redeemer_free: Cv, redeemer_to_bytes: Vv, redeemer_from_bytes: Pv, redeemer_to_hex: Bv, redeemer_from_hex: _1, redeemer_to_json: t1, redeemer_to_js_value: r1, redeemer_from_json: e1, redeemer_tag: n1, redeemer_index: a1, redeemer_data: o1, redeemer_ex_units: i1, redeemer_new: s1, __wbg_redeemers_free: d1, redeemers_to_bytes: c1, redeemers_from_bytes: p1, redeemers_to_hex: w1, redeemers_from_hex: g1, redeemers_to_json: b1, redeemers_to_js_value: l1, redeemers_from_json: f1, redeemers_new: u1, redeemers_len: h1, redeemers_get: y1, redeemers_add: v1, redeemers_get_container_type: m1, redeemers_total_ex_units: k1, __wbg_constrplutusdata_free: j1, constrplutusdata_to_bytes: x1, constrplutusdata_from_bytes: z1, constrplutusdata_to_hex: F1, constrplutusdata_from_hex: R1, constrplutusdata_alternative: O1, constrplutusdata_data: q1, constrplutusdata_new: $1, __wbg_plutusmapvalues_free: L1, plutusmapvalues_new: J1, plutusmapvalues_get: Y1, plutusmapvalues_add: Q1, __wbg_plutusmap_free: X1, plutusmap_to_bytes: Z1, plutusmap_from_bytes: U1, plutusmap_to_hex: E1, plutusmap_from_hex: K1, plutusmap_insert: S1, plutusmap_get: W1, plutusmap_keys: M1, __wbg_plutusdata_free: G1, plutusdata_to_bytes: H1, plutusdata_from_bytes: A1, plutusdata_to_hex: I1, plutusdata_from_hex: D1, plutusdata_new_constr_plutus_data: T1, plutusdata_new_empty_constr_plutus_data: N1, plutusdata_new_single_value_constr_plutus_data: C1, plutusdata_new_map: V1, plutusdata_new_list: P1, plutusdata_new_integer: B1, plutusdata_new_bytes: _m, plutusdata_kind: tm, plutusdata_as_constr_plutus_data: rm, plutusdata_as_map: em, plutusdata_as_list: nm, plutusdata_as_integer: am, plutusdata_as_bytes: om, plutusdata_from_address: im, plutusdata_as_address: sm, __wbg_plutuslist_free: dm, plutuslist_to_bytes: cm, plutuslist_from_bytes: pm, plutuslist_to_hex: wm, plutuslist_from_hex: gm, plutuslist_new: bm, plutuslist_len: lm, plutuslist_get: fm, plutuslist_add: um, encode_json_str_to_plutus_datum: hm, decode_plutus_datum_to_json_str: ym, __wbg_metadatamap_free: vm, metadatamap_to_bytes: mm, metadatamap_from_bytes: km, metadatamap_to_hex: jm, metadatamap_from_hex: xm, metadatamap_insert: zm, metadatamap_insert_str: Fm, metadatamap_insert_i32: Rm, metadatamap_get: Om, metadatamap_get_str: qm, metadatamap_get_i32: $m, metadatamap_has: Lm, metadatamap_keys: Jm, __wbg_metadatalist_free: Ym, metadatalist_to_bytes: Qm, metadatalist_from_bytes: Xm, metadatalist_to_hex: Zm, metadatalist_from_hex: Um, metadatalist_new: Em, metadatalist_len: Km, metadatalist_get: Sm, metadatalist_add: Wm, __wbg_transactionmetadatum_free: Mm, transactionmetadatum_to_bytes: Gm, transactionmetadatum_from_bytes: Hm, transactionmetadatum_to_hex: Am, transactionmetadatum_from_hex: Im, transactionmetadatum_new_map: Dm, transactionmetadatum_new_list: Tm, transactionmetadatum_new_int: Nm, transactionmetadatum_new_bytes: Cm, transactionmetadatum_new_text: Vm, transactionmetadatum_kind: Pm, transactionmetadatum_as_map: Bm, transactionmetadatum_as_list: _0, transactionmetadatum_as_int: t0, transactionmetadatum_as_bytes: r0, transactionmetadatum_as_text: e0, __wbg_transactionmetadatumlabels_free: n0, transactionmetadatumlabels_to_bytes: a0, transactionmetadatumlabels_from_bytes: o0, transactionmetadatumlabels_to_hex: i0, transactionmetadatumlabels_from_hex: s0, transactionmetadatumlabels_len: d0, transactionmetadatumlabels_get: c0, transactionmetadatumlabels_add: p0, __wbg_generaltransactionmetadata_free: w0, generaltransactionmetadata_to_bytes: g0, generaltransactionmetadata_from_bytes: b0, generaltransactionmetadata_to_hex: l0, generaltransactionmetadata_from_hex: f0, generaltransactionmetadata_to_json: u0, generaltransactionmetadata_to_js_value: h0, generaltransactionmetadata_from_json: y0, generaltransactionmetadata_new: v0, generaltransactionmetadata_len: m0, generaltransactionmetadata_insert: k0, generaltransactionmetadata_get: j0, generaltransactionmetadata_keys: x0, __wbg_auxiliarydata_free: z0, auxiliarydata_to_bytes: F0, auxiliarydata_from_bytes: R0, auxiliarydata_to_hex: O0, auxiliarydata_from_hex: q0, auxiliarydata_to_json: $0, auxiliarydata_to_js_value: L0, auxiliarydata_from_json: J0, auxiliarydata_new: Y0, auxiliarydata_metadata: Q0, auxiliarydata_set_metadata: X0, auxiliarydata_native_scripts: Z0, auxiliarydata_set_native_scripts: U0, auxiliarydata_plutus_scripts: E0, auxiliarydata_set_plutus_scripts: K0, auxiliarydata_prefer_alonzo_format: S0, auxiliarydata_set_prefer_alonzo_format: W0, encode_arbitrary_bytes_as_metadatum: M0, decode_arbitrary_bytes_from_metadatum: G0, encode_json_str_to_metadatum: H0, decode_metadatum_to_json_str: A0, __wbg_poolvotingthresholds_free: I0, poolvotingthresholds_to_bytes: D0, poolvotingthresholds_from_bytes: T0, poolvotingthresholds_to_hex: N0, poolvotingthresholds_from_hex: C0, poolvotingthresholds_to_json: V0, poolvotingthresholds_to_js_value: P0, poolvotingthresholds_from_json: B0, poolvotingthresholds_new: _4, __wbg_drepvotingthresholds_free: t4, drepvotingthresholds_to_bytes: r4, drepvotingthresholds_from_bytes: e4, drepvotingthresholds_to_hex: n4, drepvotingthresholds_from_hex: a4, drepvotingthresholds_to_json: o4, drepvotingthresholds_to_js_value: i4, drepvotingthresholds_from_json: s4, drepvotingthresholds_new: d4, drepvotingthresholds_set_motion_no_confidence: c4, drepvotingthresholds_set_committee_normal: p4, drepvotingthresholds_set_committee_no_confidence: w4, drepvotingthresholds_set_update_constitution: g4, drepvotingthresholds_set_hard_fork_initiation: b4, drepvotingthresholds_set_pp_network_group: l4, drepvotingthresholds_set_pp_economic_group: f4, drepvotingthresholds_set_pp_technical_group: u4, drepvotingthresholds_set_pp_governance_group: h4, drepvotingthresholds_set_treasury_withdrawal: y4, drepvotingthresholds_motion_no_confidence: v4, drepvotingthresholds_committee_normal: m4, drepvotingthresholds_committee_no_confidence: k4, drepvotingthresholds_update_constitution: j4, drepvotingthresholds_hard_fork_initiation: x4, drepvotingthresholds_pp_network_group: z4, drepvotingthresholds_pp_economic_group: F4, drepvotingthresholds_pp_technical_group: R4, drepvotingthresholds_pp_governance_group: O4, drepvotingthresholds_treasury_withdrawal: q4, __wbg_protocolparamupdate_free: $4, protocolparamupdate_to_bytes: L4, protocolparamupdate_from_bytes: J4, protocolparamupdate_to_hex: Y4, protocolparamupdate_from_hex: Q4, protocolparamupdate_to_json: X4, protocolparamupdate_to_js_value: Z4, protocolparamupdate_from_json: U4, protocolparamupdate_set_minfee_a: E4, protocolparamupdate_minfee_a: K4, protocolparamupdate_set_minfee_b: S4, protocolparamupdate_minfee_b: W4, protocolparamupdate_set_max_block_body_size: M4, protocolparamupdate_max_block_body_size: G4, protocolparamupdate_set_max_tx_size: H4, protocolparamupdate_max_tx_size: A4, protocolparamupdate_set_max_block_header_size: I4, protocolparamupdate_max_block_header_size: D4, protocolparamupdate_set_key_deposit: T4, protocolparamupdate_key_deposit: N4, protocolparamupdate_set_pool_deposit: C4, protocolparamupdate_pool_deposit: V4, protocolparamupdate_set_max_epoch: P4, protocolparamupdate_max_epoch: B4, protocolparamupdate_set_n_opt: _k, protocolparamupdate_n_opt: tk, protocolparamupdate_set_pool_pledge_influence: rk, protocolparamupdate_pool_pledge_influence: ek, protocolparamupdate_set_expansion_rate: nk, protocolparamupdate_expansion_rate: ak, protocolparamupdate_set_treasury_growth_rate: ok, protocolparamupdate_treasury_growth_rate: ik, protocolparamupdate_d: sk, protocolparamupdate_extra_entropy: dk, protocolparamupdate_set_protocol_version: ck, protocolparamupdate_protocol_version: pk, protocolparamupdate_set_min_pool_cost: wk, protocolparamupdate_min_pool_cost: gk, protocolparamupdate_set_ada_per_utxo_byte: bk, protocolparamupdate_ada_per_utxo_byte: lk, protocolparamupdate_set_cost_models: fk, protocolparamupdate_cost_models: uk, protocolparamupdate_set_execution_costs: hk, protocolparamupdate_execution_costs: yk, protocolparamupdate_set_max_tx_ex_units: vk, protocolparamupdate_max_tx_ex_units: mk, protocolparamupdate_set_max_block_ex_units: kk, protocolparamupdate_max_block_ex_units: jk, protocolparamupdate_set_max_value_size: xk, protocolparamupdate_max_value_size: zk, protocolparamupdate_set_collateral_percentage: Fk, protocolparamupdate_collateral_percentage: Rk, protocolparamupdate_set_max_collateral_inputs: Ok, protocolparamupdate_max_collateral_inputs: qk, protocolparamupdate_set_pool_voting_thresholds: $k, protocolparamupdate_pool_voting_thresholds: Lk, protocolparamupdate_set_drep_voting_thresholds: Jk, protocolparamupdate_drep_voting_thresholds: Yk, protocolparamupdate_set_min_committee_size: Qk, protocolparamupdate_min_committee_size: Xk, protocolparamupdate_set_committee_term_limit: Zk, protocolparamupdate_committee_term_limit: Uk, protocolparamupdate_set_governance_action_validity_period: Ek, protocolparamupdate_governance_action_validity_period: Kk, protocolparamupdate_set_governance_action_deposit: Sk, protocolparamupdate_governance_action_deposit: Wk, protocolparamupdate_set_drep_deposit: Mk, protocolparamupdate_drep_deposit: Gk, protocolparamupdate_set_drep_inactivity_period: Hk, protocolparamupdate_drep_inactivity_period: Ak, protocolparamupdate_set_ref_script_coins_per_byte: Ik, protocolparamupdate_ref_script_coins_per_byte: Dk, protocolparamupdate_new: Tk, __wbg_bootstrapwitness_free: Nk, bootstrapwitness_to_bytes: Ck, bootstrapwitness_from_bytes: Vk, bootstrapwitness_to_hex: Pk, bootstrapwitness_from_hex: Bk, bootstrapwitness_to_json: _6, bootstrapwitness_to_js_value: t6, bootstrapwitness_from_json: r6, bootstrapwitness_vkey: e6, bootstrapwitness_signature: n6, bootstrapwitness_chain_code: a6, bootstrapwitness_attributes: o6, bootstrapwitness_new: i6, __wbg_ed25519signature_free: s6, ed25519signature_to_bytes: d6, ed25519signature_to_bech32: c6, ed25519signature_to_hex: p6, ed25519signature_from_bech32: w6, ed25519signature_from_hex: g6, ed25519signature_from_bytes: b6, __wbg_vkey_free: l6, vkey_to_bytes: f6, vkey_from_bytes: u6, vkey_to_hex: h6, vkey_from_hex: y6, vkey_to_json: v6, vkey_to_js_value: m6, vkey_from_json: k6, vkey_new: j6, vkey_public_key: x6, __wbg_operationalcert_free: z6, operationalcert_to_bytes: F6, operationalcert_from_bytes: R6, operationalcert_to_hex: O6, operationalcert_from_hex: q6, operationalcert_to_json: $6, operationalcert_to_js_value: L6, operationalcert_from_json: J6, operationalcert_hot_vkey: Y6, operationalcert_sequence_number: Q6, operationalcert_kes_period: X6, operationalcert_sigma: Z6, operationalcert_new: U6, __wbg_fixedversionedblock_free: E6, fixedversionedblock_from_bytes: K6, fixedversionedblock_from_hex: S6, fixedversionedblock_block: W6, fixedversionedblock_era: M6, __wbg_versionedblock_free: G6, versionedblock_to_bytes: H6, versionedblock_from_bytes: A6, versionedblock_to_hex: I6, versionedblock_from_hex: D6, versionedblock_to_json: T6, versionedblock_to_js_value: N6, versionedblock_from_json: C6, versionedblock_new: V6, versionedblock_block: P6, versionedblock_era: B6, poolvotingthresholds_motion_no_confidence: _j, poolvotingthresholds_committee_normal: tj, exunitprices_mem_price: rj, exunitprices_step_price: ej, poolvotingthresholds_committee_no_confidence: nj, poolvotingthresholds_hard_fork_initiation: aj, poolvotingthresholds_security_relevant_threshold: oj, plutusmap_len: ij, metadatamap_len: sj, plutusmapvalues_len: dj, plutusdata_to_json: cj, plutusdata_from_json: pj, plutusmap_new: wj, metadatamap_new: gj, transactionmetadatumlabels_new: bj, __wbg_anchor_free: lj, anchor_to_bytes: fj, anchor_from_bytes: uj, anchor_to_hex: hj, anchor_from_hex: yj, anchor_to_json: vj, anchor_to_js_value: mj, anchor_from_json: kj, anchor_url: jj, anchor_anchor_data_hash: xj, anchor_new: zj, __wbg_governanceactionid_free: Fj, governanceactionid_to_bytes: Rj, governanceactionid_from_bytes: Oj, governanceactionid_to_hex: qj, governanceactionid_from_hex: $j, governanceactionid_to_json: Lj, governanceactionid_to_js_value: Jj, governanceactionid_from_json: Yj, governanceactionid_transaction_id: Qj, governanceactionid_index: Xj, governanceactionid_new: Zj, __wbg_parameterchangeaction_free: Uj, parameterchangeaction_to_bytes: Ej, parameterchangeaction_from_bytes: Kj, parameterchangeaction_to_hex: Sj, parameterchangeaction_from_hex: Wj, parameterchangeaction_to_json: Mj, parameterchangeaction_to_js_value: Gj, parameterchangeaction_from_json: Hj, parameterchangeaction_gov_action_id: Aj, parameterchangeaction_protocol_param_updates: Ij, parameterchangeaction_policy_hash: Dj, parameterchangeaction_new: Tj, parameterchangeaction_new_with_action_id: Nj, parameterchangeaction_new_with_policy_hash: Cj, parameterchangeaction_new_with_policy_hash_and_action_id: Vj, __wbg_hardforkinitiationaction_free: Pj, hardforkinitiationaction_to_bytes: Bj, hardforkinitiationaction_from_bytes: _x, hardforkinitiationaction_to_hex: tx, hardforkinitiationaction_from_hex: rx, hardforkinitiationaction_to_json: ex, hardforkinitiationaction_to_js_value: nx, hardforkinitiationaction_from_json: ax, hardforkinitiationaction_gov_action_id: ox, hardforkinitiationaction_protocol_version: ix, hardforkinitiationaction_new: sx, hardforkinitiationaction_new_with_action_id: dx, __wbg_treasurywithdrawalsaction_free: cx, treasurywithdrawalsaction_to_bytes: px, treasurywithdrawalsaction_from_bytes: wx, treasurywithdrawalsaction_to_hex: gx, treasurywithdrawalsaction_from_hex: bx, treasurywithdrawalsaction_to_json: lx, treasurywithdrawalsaction_to_js_value: fx, treasurywithdrawalsaction_from_json: ux, treasurywithdrawalsaction_withdrawals: hx, treasurywithdrawalsaction_policy_hash: yx, treasurywithdrawalsaction_new: vx, treasurywithdrawalsaction_new_with_policy_hash: mx, __wbg_updatecommitteeaction_free: kx, updatecommitteeaction_to_bytes: jx, updatecommitteeaction_from_bytes: xx, updatecommitteeaction_to_hex: zx, updatecommitteeaction_from_hex: Fx, updatecommitteeaction_to_json: Rx, updatecommitteeaction_to_js_value: Ox, updatecommitteeaction_from_json: qx, updatecommitteeaction_gov_action_id: $x, updatecommitteeaction_committee: Lx, updatecommitteeaction_members_to_remove: Jx, updatecommitteeaction_new: Yx, updatecommitteeaction_new_with_action_id: Qx, __wbg_constitution_free: Xx, constitution_to_bytes: Zx, constitution_from_bytes: Ux, constitution_to_hex: Ex, constitution_from_hex: Kx, constitution_to_json: Sx, constitution_to_js_value: Wx, constitution_from_json: Mx, constitution_anchor: Gx, constitution_script_hash: Hx, constitution_new: Ax, constitution_new_with_script_hash: Ix, __wbg_newconstitutionaction_free: Dx, newconstitutionaction_to_bytes: Tx, newconstitutionaction_from_bytes: Nx, newconstitutionaction_to_hex: Cx, newconstitutionaction_from_hex: Vx, newconstitutionaction_to_json: Px, newconstitutionaction_to_js_value: Bx, newconstitutionaction_from_json: _2, newconstitutionaction_constitution: t2, newconstitutionaction_new: r2, newconstitutionaction_new_with_action_id: e2, newconstitutionaction_has_script_hash: n2, __wbg_votingproposal_free: a2, votingproposal_to_bytes: o2, votingproposal_from_bytes: i2, votingproposal_to_hex: s2, votingproposal_from_hex: d2, votingproposal_to_json: c2, votingproposal_to_js_value: p2, votingproposal_from_json: w2, votingproposal_governance_action: g2, votingproposal_anchor: b2, votingproposal_reward_account: l2, votingproposal_deposit: f2, votingproposal_new: u2, transactioninput_to_bytes: h2, transactioninput_from_bytes: y2, transactioninput_to_hex: v2, transactioninput_from_hex: m2, transactioninput_to_json: k2, transactioninput_to_js_value: j2, transactioninput_from_json: x2, __wbg_block_free: z2, block_to_bytes: F2, block_from_bytes: R2, block_to_hex: O2, block_from_hex: q2, block_to_json: $2, block_to_js_value: L2, block_from_json: J2, block_header: Y2, block_transaction_bodies: Q2, block_transaction_witness_sets: X2, block_auxiliary_data_set: Z2, block_invalid_transactions: U2, block_new: E2, __wbg_fixedblock_free: K2, fixedblock_from_bytes: S2, fixedblock_from_hex: W2, fixedblock_header: M2, fixedblock_transaction_bodies: G2, fixedblock_transaction_witness_sets: H2, fixedblock_auxiliary_data_set: A2, fixedblock_invalid_transactions: I2, fixedblock_block_hash: D2, __wbg_header_free: T2, header_to_bytes: N2, header_from_bytes: C2, header_to_hex: V2, header_from_hex: P2, header_to_json: B2, header_to_js_value: _z, header_from_json: tz, header_header_body: rz, header_body_signature: ez, header_new: nz, __wbg_transactionunspentoutput_free: az, transactionunspentoutput_to_bytes: oz, transactionunspentoutput_from_bytes: iz, transactionunspentoutput_to_hex: sz, transactionunspentoutput_from_hex: dz, transactionunspentoutput_to_json: cz, transactionunspentoutput_to_js_value: pz, transactionunspentoutput_from_json: wz, transactionunspentoutput_new: gz, transactionunspentoutput_input: bz, transactionunspentoutput_output: lz, __wbg_transactionunspentoutputs_free: fz, transactionunspentoutputs_to_json: uz, transactionunspentoutputs_to_js_value: hz, transactionunspentoutputs_from_json: yz, transactionunspentoutputs_new: vz, transactionunspentoutputs_len: mz, transactionunspentoutputs_get: kz, transactionunspentoutputs_add: jz, __wbg_value_free: xz, value_to_bytes: zz, value_from_bytes: Fz, value_to_hex: Rz, value_from_hex: Oz, value_to_json: qz, value_to_js_value: $z, value_from_json: Lz, value_new: Jz, value_new_from_assets: Yz, value_new_with_assets: Qz, value_zero: Xz, value_is_zero: Zz, value_coin: Uz, value_set_coin: Ez, value_multiasset: Kz, value_set_multiasset: Sz, value_checked_add: Wz, value_checked_sub: Mz, value_clamped_sub: Gz, value_compare: Hz, make_daedalus_bootstrap_witness: Az, make_icarus_bootstrap_witness: Iz, make_vkey_witness: Dz, hash_auxiliary_data: Tz, hash_plutus_data: Nz, hash_script_data: Cz, get_implicit_input: Vz, get_deposit: Pz, min_ada_for_output: Bz, encode_json_str_to_native_script: _F, has_transaction_set_tag: tF, __wbg_transactioninput_free: rF, transactioninput_index: eF, newconstitutionaction_gov_action_id: nF, transactioninput_new: aF, transactioninput_transaction_id: oF, __wbg_certificatesbuilder_free: iF, certificatesbuilder_new: sF, certificatesbuilder_add: dF, certificatesbuilder_add_with_plutus_witness: cF, certificatesbuilder_add_with_native_script: pF, certificatesbuilder_get_plutus_witnesses: wF, certificatesbuilder_get_ref_inputs: gF, certificatesbuilder_get_native_scripts: bF, certificatesbuilder_get_certificates_refund: lF, certificatesbuilder_get_certificates_deposit: fF, certificatesbuilder_has_plutus_scripts: uF, certificatesbuilder_build: hF, __wbg_votingbuilder_free: yF, votingbuilder_new: vF, votingbuilder_add: mF, votingbuilder_add_with_plutus_witness: kF, votingbuilder_add_with_native_script: jF, votingbuilder_get_plutus_witnesses: xF, votingbuilder_get_ref_inputs: zF, votingbuilder_get_native_scripts: FF, votingbuilder_has_plutus_scripts: RF, votingbuilder_build: OF, __wbg_votingproposalbuilder_free: qF, votingproposalbuilder_add: $F, votingproposalbuilder_add_with_plutus_witness: LF, votingproposalbuilder_get_plutus_witnesses: JF, votingproposalbuilder_get_ref_inputs: YF, votingproposalbuilder_has_plutus_scripts: QF, votingproposalbuilder_build: XF, encrypt_with_password: ZF, decrypt_with_password: UF, __wbg_certificates_free: EF, certificates_to_bytes: KF, certificates_from_bytes: SF, certificates_to_hex: WF, certificates_from_hex: MF, certificates_to_json: GF, certificates_to_js_value: HF, certificates_from_json: AF, certificates_new: IF, certificates_len: DF, certificates_get: TF, certificates_add: NF, __wbg_votingproposals_free: CF, votingproposals_to_bytes: VF, votingproposals_from_bytes: PF, votingproposals_to_hex: BF, votingproposals_from_hex: _3, votingproposals_to_json: t3, votingproposals_to_js_value: r3, votingproposals_from_json: e3, votingproposals_get: n3, votingproposals_add: a3, votingproposals_contains: o3, votingproposals_to_option: i3, __wbg_plutusscript_free: s3, plutusscript_to_bytes: d3, plutusscript_from_bytes: c3, plutusscript_to_hex: p3, plutusscript_from_hex: w3, plutusscript_new: g3, plutusscript_new_v2: b3, plutusscript_new_v3: l3, plutusscript_new_with_version: f3, plutusscript_bytes: u3, plutusscript_from_bytes_v2: h3, plutusscript_from_bytes_v3: y3, plutusscript_from_bytes_with_version: v3, plutusscript_from_hex_with_version: m3, plutusscript_hash: k3, plutusscript_language_version: j3, __wbg_transactioninputs_free: x3, transactioninputs_to_bytes: z3, transactioninputs_from_bytes: F3, transactioninputs_to_hex: R3, transactioninputs_from_hex: O3, transactioninputs_to_json: q3, transactioninputs_to_js_value: $3, transactioninputs_from_json: L3, transactioninputs_new: J3, transactioninputs_len: Y3, transactioninputs_get: Q3, transactioninputs_add: X3, transactioninputs_to_option: Z3, votingproposals_new: U3, votingproposals_len: E3, votingproposalbuilder_new: K3, __wbg_mintwitness_free: S3, mintwitness_new_native_script: W3, mintwitness_new_plutus_script: M3, __wbg_mintbuilder_free: G3, mintbuilder_new: H3, mintbuilder_add_asset: A3, mintbuilder_set_asset: I3, mintbuilder_build: D3, mintbuilder_get_native_scripts: T3, mintbuilder_get_plutus_witnesses: N3, mintbuilder_get_ref_inputs: C3, mintbuilder_get_redeemers: V3, mintbuilder_has_plutus_scripts: P3, mintbuilder_has_native_scripts: B3, __wbg_plutuswitness_free: _R, plutuswitness_new: tR, plutuswitness_new_with_ref: rR, plutuswitness_new_without_datum: eR, plutuswitness_new_with_ref_without_datum: nR, plutuswitness_script: aR, plutuswitness_datum: oR, plutuswitness_redeemer: iR, __wbg_plutuswitnesses_free: sR, plutuswitnesses_len: dR, plutuswitnesses_get: cR, plutuswitnesses_add: pR, __wbg_withdrawalsbuilder_free: wR, withdrawalsbuilder_add: gR, withdrawalsbuilder_add_with_plutus_witness: bR, withdrawalsbuilder_add_with_native_script: lR, withdrawalsbuilder_get_plutus_witnesses: fR, withdrawalsbuilder_get_ref_inputs: uR, withdrawalsbuilder_get_native_scripts: hR, withdrawalsbuilder_get_total_withdrawals: yR, withdrawalsbuilder_has_plutus_scripts: vR, withdrawalsbuilder_build: mR, __wbg_transactionoutputbuilder_free: kR, transactionoutputbuilder_new: jR, transactionoutputbuilder_with_address: xR, transactionoutputbuilder_with_data_hash: zR, transactionoutputbuilder_with_plutus_data: FR, transactionoutputbuilder_with_script_ref: RR, transactionoutputbuilder_next: OR, __wbg_transactionoutputamountbuilder_free: qR, transactionoutputamountbuilder_with_value: $R, transactionoutputamountbuilder_with_coin: LR, transactionoutputamountbuilder_with_coin_and_asset: JR, transactionoutputamountbuilder_with_asset_and_min_required_coin_by_utxo_cost: YR, transactionoutputamountbuilder_build: QR, __wbg_fixedtransaction_free: XR, fixedtransaction_to_bytes: ZR, fixedtransaction_from_bytes: UR, fixedtransaction_to_hex: ER, fixedtransaction_from_hex: KR, fixedtransaction_new: SR, fixedtransaction_new_with_auxiliary: WR, fixedtransaction_new_from_body_bytes: MR, fixedtransaction_body: GR, fixedtransaction_raw_body: HR, fixedtransaction_set_body: AR, fixedtransaction_set_witness_set: IR, fixedtransaction_witness_set: DR, fixedtransaction_raw_witness_set: TR, fixedtransaction_set_is_valid: NR, fixedtransaction_is_valid: CR, fixedtransaction_set_auxiliary_data: VR, fixedtransaction_auxiliary_data: PR, fixedtransaction_raw_auxiliary_data: BR, fixedtransaction_transaction_hash: _5, fixedtransaction_add_vkey_witness: t5, fixedtransaction_add_bootstrap_witness: r5, fixedtransaction_sign_and_add_vkey_signature: e5, fixedtransaction_sign_and_add_icarus_bootstrap_signature: n5, fixedtransaction_sign_and_add_daedalus_bootstrap_signature: a5, __wbg_networkinfo_free: o5, networkinfo_new: i5, networkinfo_network_id: s5, networkinfo_protocol_magic: d5, networkinfo_testnet_preview: c5, networkinfo_testnet_preprod: p5, networkinfo_mainnet: w5, __wbg_malformedaddress_free: g5, malformedaddress_original_bytes: b5, malformedaddress_to_address: l5, malformedaddress_from_address: f5, __wbg_byronaddress_free: u5, byronaddress_to_base58: h5, byronaddress_to_bytes: y5, byronaddress_from_bytes: v5, byronaddress_byron_protocol_magic: m5, byronaddress_byron_address_kind: k5, byronaddress_attributes: j5, byronaddress_network_id: x5, byronaddress_from_base58: z5, byronaddress_icarus_from_key: F5, byronaddress_is_valid: R5, byronaddress_to_address: O5, byronaddress_from_address: q5, __wbg_address_free: $5, address_from_bytes: L5, address_to_json: J5, address_to_js_value: Y5, address_from_json: Q5, address_kind: X5, address_payment_cred: Z5, address_is_malformed: U5, address_to_hex: E5, address_from_hex: K5, address_to_bytes: S5, address_to_bech32: W5, address_from_bech32: M5, address_network_id: G5, __wbg_baseaddress_free: H5, baseaddress_new: A5, baseaddress_payment_cred: I5, baseaddress_stake_cred: D5, baseaddress_to_address: T5, baseaddress_from_address: N5, baseaddress_network_id: C5, __wbg_enterpriseaddress_free: V5, enterpriseaddress_new: P5, enterpriseaddress_to_address: B5, enterpriseaddress_from_address: _O, enterpriseaddress_network_id: tO, rewardaddress_to_address: rO, rewardaddress_from_address: eO, __wbg_pointer_free: nO, pointer_new: aO, pointer_new_pointer: oO, pointer_slot: iO, pointer_tx_index: sO, pointer_cert_index: dO, pointer_slot_bignum: cO, pointer_tx_index_bignum: pO, pointer_cert_index_bignum: wO, __wbg_pointeraddress_free: gO, pointeraddress_new: bO, pointeraddress_payment_cred: lO, pointeraddress_stake_pointer: fO, pointeraddress_to_address: uO, pointeraddress_from_address: hO, pointeraddress_network_id: yO, __wbg_transactionwitnesssets_free: vO, transactionwitnesssets_to_bytes: mO, transactionwitnesssets_from_bytes: kO, transactionwitnesssets_to_hex: jO, transactionwitnesssets_from_hex: xO, transactionwitnesssets_to_json: zO, transactionwitnesssets_to_js_value: FO, transactionwitnesssets_from_json: RO, transactionwitnesssets_len: OO, transactionwitnesssets_get: qO, transactionwitnesssets_add: $O, __wbg_fixedtxwitnessesset_free: LO, fixedtxwitnessesset_tx_witnesses_set: JO, fixedtxwitnessesset_add_vkey_witness: YO, fixedtxwitnessesset_add_bootstrap_witness: QO, fixedtxwitnessesset_to_bytes: XO, fixedtxwitnessesset_from_bytes: ZO, __wbg_privatekey_free: UO, __wbg_nativescripts_free: EO, nativescripts_new: KO, nativescripts_len: SO, nativescripts_get: WO, nativescripts_add: MO, nativescripts_to_bytes: GO, nativescripts_from_bytes: HO, nativescripts_to_hex: AO, nativescripts_from_hex: IO, nativescripts_to_json: DO, nativescripts_to_js_value: TO, nativescripts_from_json: NO, __wbg_bigint_free: CO, bigint_to_bytes: VO, bigint_from_bytes: PO, bigint_to_hex: BO, bigint_from_hex: _9, bigint_to_json: t9, bigint_to_js_value: r9, bigint_from_json: e9, bigint_is_zero: n9, bigint_as_u64: a9, bigint_as_int: o9, bigint_from_str: i9, bigint_to_str: s9, bigint_add: d9, bigint_sub: c9, bigint_mul: p9, bigint_pow: w9, bigint_one: g9, bigint_zero: b9, bigint_abs: l9, bigint_increment: f9, bigint_div_ceil: u9, bigint_div_floor: h9, __wbg_fixedtransactionbody_free: y9, fixedtransactionbody_from_bytes: v9, fixedtransactionbody_from_hex: m9, fixedtransactionbody_tx_hash: k9, fixedtransactionbody_original_bytes: j9, __wbg_transactionbodies_free: x9, transactionbodies_to_bytes: z9, transactionbodies_from_bytes: F9, transactionbodies_to_hex: R9, transactionbodies_from_hex: O9, transactionbodies_to_json: q9, transactionbodies_to_js_value: $9, transactionbodies_from_json: L9, transactionbodies_len: J9, transactionbodies_get: Y9, transactionbodies_add: Q9, __wbg_fixedtransactionbodies_free: X9, fixedtransactionbodies_from_bytes: Z9, fixedtransactionbodies_from_hex: U9, fixedtransactionbodies_new: E9, fixedtransactionbodies_len: K9, fixedtransactionbodies_get: S9, fixedtransactionbodies_add: W9, privatekey_from_hex: M9, privatekey_to_hex: G9, privatekey_sign: H9, privatekey_from_normal_bytes: A9, privatekey_from_extended_bytes: I9, privatekey_as_bytes: D9, privatekey_to_bech32: T9, privatekey_from_bech32: N9, privatekey_generate_ed25519extended: C9, privatekey_generate_ed25519: V9, privatekey_to_public: P9, __wbg_rewardaddress_free: B9, enterpriseaddress_payment_cred: _8, rewardaddress_payment_cred: t8, fixedtransactionbody_transaction_body: r8, rewardaddress_new: e8, withdrawalsbuilder_new: n8, rewardaddress_network_id: a8, transactionwitnesssets_new: o8, transactionbodies_new: i8, plutuswitnesses_new: s8, __wbg_poolretirement_free: d8, poolretirement_to_bytes: c8, poolretirement_from_bytes: p8, poolretirement_to_hex: w8, poolretirement_from_hex: g8, poolretirement_to_json: b8, poolretirement_to_js_value: l8, poolretirement_from_json: f8, poolretirement_pool_keyhash: u8, poolretirement_epoch: h8, poolretirement_new: y8, __wbg_stakedelegation_free: v8, stakedelegation_to_bytes: m8, stakedelegation_from_bytes: k8, stakedelegation_to_hex: j8, stakedelegation_from_hex: x8, stakedelegation_to_json: z8, stakedelegation_to_js_value: F8, stakedelegation_from_json: R8, stakedelegation_stake_credential: O8, stakedelegation_pool_keyhash: q8, stakedelegation_new: $8, stakedelegation_has_script_credentials: L8, __wbg_committeecoldresign_free: J8, committeecoldresign_to_bytes: Y8, committeecoldresign_from_bytes: Q8, committeecoldresign_to_hex: X8, committeecoldresign_from_hex: Z8, committeecoldresign_to_json: U8, committeecoldresign_to_js_value: E8, committeecoldresign_from_json: K8, committeecoldresign_committee_cold_credential: S8, committeecoldresign_anchor: W8, committeecoldresign_new: M8, committeecoldresign_new_with_anchor: G8, committeecoldresign_has_script_credentials: H8, __wbg_drepregistration_free: A8, drepregistration_to_bytes: I8, drepregistration_from_bytes: D8, drepregistration_to_hex: T8, drepregistration_from_hex: N8, drepregistration_to_json: C8, drepregistration_to_js_value: V8, drepregistration_from_json: P8, drepregistration_voting_credential: B8, drepregistration_coin: _7, drepregistration_anchor: t7, drepregistration_new: r7, drepregistration_new_with_anchor: e7, drepregistration_has_script_credentials: n7, __wbg_votingprocedure_free: a7, votingprocedure_to_bytes: o7, votingprocedure_from_bytes: i7, votingprocedure_to_hex: s7, votingprocedure_from_hex: d7, votingprocedure_to_json: c7, votingprocedure_to_js_value: p7, votingprocedure_from_json: w7, votingprocedure_new: g7, votingprocedure_new_with_anchor: b7, votingprocedure_vote_kind: l7, __wbg_governanceactionids_free: f7, governanceactionids_to_json: u7, governanceactionids_to_js_value: h7, governanceactionids_from_json: y7, governanceactionids_new: v7, governanceactionids_add: m7, governanceactionids_get: k7, governanceactionids_len: j7, __wbg_infoaction_free: x7, infoaction_new: z7, __wbg_vkeywitness_free: F7, vkeywitness_to_bytes: R7, vkeywitness_from_bytes: O7, vkeywitness_to_hex: q7, vkeywitness_from_hex: $7, vkeywitness_to_json: L7, vkeywitness_to_js_value: J7, vkeywitness_from_json: Y7, vkeywitness_new: Q7, vkeywitness_vkey: X7, vkeywitness_signature: Z7, __wbg_bip32privatekey_free: U7, bip32privatekey_derive: E7, bip32privatekey_from_128_xprv: K7, bip32privatekey_to_128_xprv: S7, bip32privatekey_generate_ed25519_bip32: W7, bip32privatekey_to_raw_key: M7, bip32privatekey_to_public: G7, bip32privatekey_from_bytes: H7, bip32privatekey_as_bytes: A7, bip32privatekey_from_bech32: I7, bip32privatekey_to_bech32: D7, bip32privatekey_from_bip39_entropy: T7, bip32privatekey_chaincode: N7, bip32privatekey_to_hex: C7, bip32privatekey_from_hex: V7, vkeys_get: P7, vkeys_add: B7, __wbg_publickeys_free: _q, publickeys_new: tq, publickeys_size: rq, publickeys_get: eq, publickeys_add: nq, __wbg_kessignature_free: aq, kessignature_to_bytes: oq, kessignature_from_bytes: iq, __wbg_nativescript_free: sq, nativescript_to_bytes: dq, nativescript_from_bytes: cq, nativescript_to_hex: pq, nativescript_from_hex: wq, nativescript_to_json: gq, nativescript_to_js_value: bq, nativescript_from_json: lq, nativescript_hash: fq, nativescript_new_script_pubkey: uq, nativescript_new_script_all: hq, nativescript_new_script_any: yq, nativescript_new_script_n_of_k: vq, nativescript_new_timelock_start: mq, nativescript_new_timelock_expiry: kq, nativescript_kind: jq, nativescript_as_script_pubkey: xq, nativescript_as_script_all: zq, nativescript_as_script_any: Fq, nativescript_as_script_n_of_k: Rq, nativescript_as_timelock_start: Oq, nativescript_as_timelock_expiry: qq, nativescript_get_required_signers: $q, __wbg_scriptpubkey_free: Lq, scriptpubkey_to_bytes: Jq, scriptpubkey_from_bytes: Yq, scriptpubkey_to_hex: Qq, scriptpubkey_from_hex: Xq, scriptpubkey_to_json: Zq, scriptpubkey_to_js_value: Uq, scriptpubkey_from_json: Eq, scriptpubkey_addr_keyhash: Kq, scriptpubkey_new: Sq, __wbg_scriptall_free: Wq, scriptall_to_bytes: Mq, scriptall_from_bytes: Gq, scriptall_to_hex: Hq, scriptall_from_hex: Aq, scriptall_to_json: Iq, scriptall_to_js_value: Dq, scriptall_from_json: Tq, scriptall_native_scripts: Nq, scriptall_new: Cq, scriptany_to_bytes: Vq, scriptany_from_bytes: Pq, scriptany_to_hex: Bq, scriptany_from_hex: _$, scriptany_to_json: t$, scriptany_to_js_value: r$, scriptany_from_json: e$, __wbg_scriptnofk_free: n$, scriptnofk_to_bytes: a$, scriptnofk_from_bytes: o$, scriptnofk_to_hex: i$, scriptnofk_from_hex: s$, scriptnofk_to_json: d$, scriptnofk_to_js_value: c$, scriptnofk_from_json: p$, scriptnofk_n: w$, scriptnofk_new: g$, timelockstart_to_bytes: b$, timelockstart_from_bytes: l$, timelockstart_to_hex: f$, timelockstart_from_hex: u$, timelockstart_to_json: h$, timelockstart_to_js_value: y$, timelockstart_from_json: v$, __wbg_timelockexpiry_free: m$, timelockexpiry_to_bytes: k$, timelockexpiry_from_bytes: j$, timelockexpiry_to_hex: x$, timelockexpiry_from_hex: z$, timelockexpiry_to_json: F$, timelockexpiry_to_js_value: R$, timelockexpiry_from_json: O$, timelockexpiry_slot: q$, timelockexpiry_slot_bignum: $$, timelockexpiry_new: L$, timelockexpiry_new_timelockexpiry: J$, __wbg_headerbody_free: Y$, headerbody_to_bytes: Q$, headerbody_from_bytes: X$, headerbody_to_hex: Z$, headerbody_from_hex: U$, headerbody_to_json: E$, headerbody_to_js_value: K$, headerbody_from_json: S$, headerbody_block_number: W$, headerbody_slot: M$, headerbody_slot_bignum: G$, headerbody_prev_hash: H$, headerbody_issuer_vkey: A$, headerbody_vrf_vkey: I$, headerbody_has_nonce_and_leader_vrf: D$, headerbody_nonce_vrf_or_nothing: T$, headerbody_leader_vrf_or_nothing: N$, headerbody_has_vrf_result: C$, headerbody_vrf_result_or_nothing: V$, headerbody_block_body_size: P$, headerbody_block_body_hash: B$, headerbody_operational_cert: _L, headerbody_protocol_version: tL, headerbody_new: rL, headerbody_new_headerbody: eL, votingprocedure_anchor: nL, __wbg_scriptany_free: aL, timelockstart_slot_bignum: oL, timelockstart_slot: iL, vkeys_len: sL, scriptany_native_scripts: dL, scriptnofk_native_scripts: cL, scriptany_new: pL, __wbg_vkeys_free: wL, vkeys_new: gL, __wbg_timelockstart_free: bL, timelockstart_new_timelockstart: lL, timelockstart_new: fL, __wbg_plutusscriptsource_free: uL, plutusscriptsource_new: hL, plutusscriptsource_new_ref_input: yL, plutusscriptsource_set_required_signers: vL, plutusscriptsource_get_ref_script_size: mL, __wbg_nativescriptsource_free: kL, nativescriptsource_new: jL, nativescriptsource_new_ref_input: xL, nativescriptsource_set_required_signers: zL, nativescriptsource_get_ref_script_size: FL, __wbg_transactionbatchlist_free: RL, transactionbatchlist_len: OL, transactionbatchlist_get: qL, __wbg_transactionbatch_free: $L, transactionbatch_len: LL, transactionbatch_get: JL, create_send_all: YL, __wbg_txinputsbuilder_free: QL, txinputsbuilder_new: XL, txinputsbuilder_add_regular_utxo: ZL, txinputsbuilder_add_plutus_script_utxo: UL, txinputsbuilder_add_native_script_utxo: EL, txinputsbuilder_add_key_input: KL, txinputsbuilder_add_native_script_input: SL, txinputsbuilder_add_plutus_script_input: WL, txinputsbuilder_add_bootstrap_input: ML, txinputsbuilder_add_regular_input: GL, txinputsbuilder_get_ref_inputs: HL, txinputsbuilder_get_native_input_scripts: AL, txinputsbuilder_get_plutus_input_scripts: IL, txinputsbuilder_len: DL, txinputsbuilder_add_required_signer: TL, txinputsbuilder_add_required_signers: NL, txinputsbuilder_total_value: CL, txinputsbuilder_inputs: VL, txinputsbuilder_inputs_option: PL, __wbg_certificate_free: BL, certificate_to_bytes: _J, certificate_from_bytes: tJ, certificate_to_hex: rJ, certificate_from_hex: eJ, certificate_to_json: nJ, certificate_to_js_value: aJ, certificate_from_json: oJ, certificate_new_stake_registration: iJ, certificate_new_reg_cert: sJ, certificate_new_stake_deregistration: dJ, certificate_new_unreg_cert: cJ, certificate_new_stake_delegation: pJ, certificate_new_pool_registration: wJ, certificate_new_pool_retirement: gJ, certificate_new_genesis_key_delegation: bJ, certificate_new_move_instantaneous_rewards_cert: lJ, certificate_new_committee_hot_auth: fJ, certificate_new_committee_cold_resign: uJ, certificate_new_drep_deregistration: hJ, certificate_new_drep_registration: yJ, certificate_new_drep_update: vJ, certificate_new_stake_and_vote_delegation: mJ, certificate_new_stake_registration_and_delegation: kJ, certificate_new_stake_vote_registration_and_delegation: jJ, certificate_new_vote_delegation: xJ, certificate_new_vote_registration_and_delegation: zJ, certificate_kind: FJ, certificate_as_stake_registration: RJ, certificate_as_reg_cert: OJ, certificate_as_stake_deregistration: qJ, certificate_as_unreg_cert: $J, certificate_as_stake_delegation: LJ, certificate_as_pool_registration: JJ, certificate_as_pool_retirement: YJ, certificate_as_genesis_key_delegation: QJ, certificate_as_move_instantaneous_rewards_cert: XJ, certificate_as_committee_hot_auth: ZJ, certificate_as_committee_cold_resign: UJ, certificate_as_drep_deregistration: EJ, certificate_as_drep_registration: KJ, certificate_as_drep_update: SJ, certificate_as_stake_and_vote_delegation: WJ, certificate_as_stake_registration_and_delegation: MJ, certificate_as_stake_vote_registration_and_delegation: GJ, certificate_as_vote_delegation: HJ, certificate_as_vote_registration_and_delegation: AJ, certificate_has_required_script_witness: IJ, __wbg_genesiskeydelegation_free: DJ, genesiskeydelegation_to_bytes: TJ, genesiskeydelegation_from_bytes: NJ, genesiskeydelegation_to_hex: CJ, genesiskeydelegation_from_hex: VJ, genesiskeydelegation_to_json: PJ, genesiskeydelegation_to_js_value: BJ, genesiskeydelegation_from_json: _Y, genesiskeydelegation_genesishash: tY, genesiskeydelegation_genesis_delegate_hash: rY, genesiskeydelegation_vrf_keyhash: eY, genesiskeydelegation_new: nY, __wbg_stakederegistration_free: aY, stakederegistration_to_bytes: oY, stakederegistration_from_bytes: iY, stakederegistration_to_hex: sY, stakederegistration_from_hex: dY, stakederegistration_to_json: cY, stakederegistration_to_js_value: pY, stakederegistration_from_json: wY, stakederegistration_stake_credential: gY, stakederegistration_coin: bY, stakederegistration_new: lY, stakederegistration_new_with_explicit_refund: fY, stakederegistration_has_script_credentials: uY, __wbg_voters_free: hY, voters_to_json: yY, voters_to_js_value: vY, voters_from_json: mY, voters_new: kY, voters_add: jY, voters_get: xY, voters_len: zY, __wbg_plutusscripts_free: FY, plutusscripts_to_bytes: RY, plutusscripts_from_bytes: OY, plutusscripts_to_hex: qY, plutusscripts_from_hex: $Y, plutusscripts_to_json: LY, plutusscripts_to_js_value: JY, plutusscripts_from_json: YY, plutusscripts_new: QY, plutusscripts_len: XY, plutusscripts_get: ZY, plutusscripts_add: UY, __wbg_costmdls_free: EY, costmdls_to_bytes: KY, costmdls_from_bytes: SY, costmdls_to_hex: WY, costmdls_from_hex: MY, costmdls_to_json: GY, costmdls_to_js_value: HY, costmdls_from_json: AY, costmdls_new: IY, costmdls_len: DY, costmdls_insert: TY, costmdls_get: NY, costmdls_keys: CY, costmdls_retain_language_versions: VY, __wbg_ed25519keyhashes_free: PY, ed25519keyhashes_to_bytes: BY, ed25519keyhashes_from_bytes: _Q, ed25519keyhashes_to_hex: tQ, ed25519keyhashes_from_hex: rQ, ed25519keyhashes_to_json: eQ, ed25519keyhashes_to_js_value: nQ, ed25519keyhashes_from_json: aQ, ed25519keyhashes_new: oQ, ed25519keyhashes_len: iQ, ed25519keyhashes_get: sQ, ed25519keyhashes_add: dQ, ed25519keyhashes_contains: cQ, ed25519keyhashes_to_option: pQ, __wbg_ed25519keyhash_free: wQ, ed25519keyhash_from_bytes: gQ, ed25519keyhash_to_bytes: bQ, ed25519keyhash_to_bech32: lQ, ed25519keyhash_from_bech32: fQ, ed25519keyhash_to_hex: uQ, ed25519keyhash_from_hex: hQ, scripthash_from_bytes: yQ, scripthash_from_bech32: vQ, scripthash_from_hex: mQ, __wbg_anchordatahash_free: kQ, anchordatahash_from_bytes: jQ, anchordatahash_to_bytes: xQ, anchordatahash_to_bech32: zQ, anchordatahash_from_bech32: FQ, anchordatahash_to_hex: RQ, anchordatahash_from_hex: OQ, transactionhash_from_bytes: qQ, transactionhash_from_bech32: $Q, transactionhash_from_hex: LQ, genesisdelegatehash_from_bytes: JQ, genesisdelegatehash_from_bech32: YQ, genesisdelegatehash_from_hex: QQ, genesishash_from_bytes: XQ, genesishash_from_bech32: ZQ, genesishash_from_hex: UQ, auxiliarydatahash_from_bytes: EQ, auxiliarydatahash_from_bech32: KQ, auxiliarydatahash_from_hex: SQ, poolmetadatahash_from_bytes: WQ, poolmetadatahash_from_bech32: MQ, poolmetadatahash_from_hex: GQ, vrfkeyhash_from_bytes: HQ, vrfkeyhash_from_bech32: AQ, vrfkeyhash_from_hex: IQ, blockhash_from_bytes: DQ, blockhash_from_bech32: TQ, blockhash_from_hex: NQ, datahash_from_bytes: CQ, datahash_from_bech32: VQ, datahash_from_hex: PQ, scriptdatahash_from_bytes: BQ, scriptdatahash_from_bech32: _X, scriptdatahash_from_hex: tX, vrfvkey_from_bytes: rX, vrfvkey_from_bech32: eX, vrfvkey_from_hex: nX, kesvkey_from_bytes: aX, kesvkey_from_bech32: oX, kesvkey_from_hex: iX, __wbg_scripthash_free: sX, __wbg_transactionhash_free: dX, __wbg_genesisdelegatehash_free: cX, __wbg_genesishash_free: pX, __wbg_auxiliarydatahash_free: wX, __wbg_poolmetadatahash_free: gX, __wbg_vrfkeyhash_free: bX, __wbg_blockhash_free: lX, __wbg_datahash_free: fX, __wbg_scriptdatahash_free: uX, __wbg_vrfvkey_free: hX, __wbg_kesvkey_free: yX, scripthash_to_hex: vX, transactionhash_to_hex: mX, genesisdelegatehash_to_hex: kX, genesishash_to_hex: jX, auxiliarydatahash_to_hex: xX, poolmetadatahash_to_hex: zX, vrfkeyhash_to_hex: FX, blockhash_to_hex: RX, datahash_to_hex: OX, scriptdatahash_to_hex: qX, vrfvkey_to_hex: $X, kesvkey_to_hex: LX, scripthash_to_bytes: JX, vrfkeyhash_to_bytes: YX, genesisdelegatehash_to_bytes: QX, genesishash_to_bytes: XX, transactionhash_to_bytes: ZX, poolmetadatahash_to_bytes: UX, auxiliarydatahash_to_bytes: EX, blockhash_to_bytes: KX, datahash_to_bytes: SX, scriptdatahash_to_bytes: WX, vrfvkey_to_bytes: MX, kesvkey_to_bytes: GX, scripthash_to_bech32: HX, vrfkeyhash_to_bech32: AX, genesisdelegatehash_to_bech32: IX, genesishash_to_bech32: DX, transactionhash_to_bech32: TX, poolmetadatahash_to_bech32: NX, auxiliarydatahash_to_bech32: CX, blockhash_to_bech32: VX, datahash_to_bech32: PX, scriptdatahash_to_bech32: BX, vrfvkey_to_bech32: _Z, kesvkey_to_bech32: tZ, __wbg_transactionbuilderconfig_free: rZ, __wbg_transactionbuilderconfigbuilder_free: eZ, transactionbuilderconfigbuilder_new: nZ, transactionbuilderconfigbuilder_fee_algo: aZ, transactionbuilderconfigbuilder_coins_per_utxo_byte: oZ, transactionbuilderconfigbuilder_ex_unit_prices: iZ, transactionbuilderconfigbuilder_pool_deposit: sZ, transactionbuilderconfigbuilder_key_deposit: dZ, transactionbuilderconfigbuilder_max_value_size: cZ, transactionbuilderconfigbuilder_max_tx_size: pZ, transactionbuilderconfigbuilder_ref_script_coins_per_byte: wZ, transactionbuilderconfigbuilder_prefer_pure_change: gZ, transactionbuilderconfigbuilder_deduplicate_explicit_ref_inputs_with_regular_inputs: bZ, transactionbuilderconfigbuilder_do_not_burn_extra_change: lZ, transactionbuilderconfigbuilder_build: fZ, __wbg_changeconfig_free: uZ, changeconfig_new: hZ, changeconfig_change_address: yZ, changeconfig_change_plutus_data: vZ, changeconfig_change_script_ref: mZ, __wbg_transactionbuilder_free: kZ, transactionbuilder_add_inputs_from: jZ, transactionbuilder_set_inputs: xZ, transactionbuilder_set_collateral: zZ, transactionbuilder_set_collateral_return: FZ, transactionbuilder_remove_collateral_return: RZ, transactionbuilder_set_collateral_return_and_total: OZ, transactionbuilder_set_total_collateral: qZ, transactionbuilder_remove_total_collateral: $Z, transactionbuilder_set_total_collateral_and_return: LZ, transactionbuilder_add_reference_input: JZ, transactionbuilder_add_script_reference_input: YZ, transactionbuilder_add_key_input: QZ, transactionbuilder_add_native_script_input: XZ, transactionbuilder_add_plutus_script_input: ZZ, transactionbuilder_add_bootstrap_input: UZ, transactionbuilder_add_regular_input: EZ, transactionbuilder_add_inputs_from_and_change: KZ, transactionbuilder_add_inputs_from_and_change_with_collateral_return: SZ, transactionbuilder_get_native_input_scripts: WZ, transactionbuilder_get_plutus_input_scripts: MZ, transactionbuilder_fee_for_input: GZ, transactionbuilder_add_output: HZ, transactionbuilder_fee_for_output: AZ, transactionbuilder_set_fee: IZ, transactionbuilder_set_min_fee: DZ, transactionbuilder_set_ttl: TZ, transactionbuilder_set_ttl_bignum: NZ, transactionbuilder_remove_ttl: CZ, transactionbuilder_set_validity_start_interval: VZ, transactionbuilder_set_validity_start_interval_bignum: PZ, transactionbuilder_remove_validity_start_interval: BZ, transactionbuilder_set_certs: _U, transactionbuilder_remove_certs: tU, transactionbuilder_set_certs_builder: rU, transactionbuilder_set_withdrawals: eU, transactionbuilder_set_withdrawals_builder: nU, transactionbuilder_set_voting_builder: aU, transactionbuilder_set_voting_proposal_builder: oU, transactionbuilder_remove_withdrawals: iU, transactionbuilder_get_auxiliary_data: sU, transactionbuilder_set_auxiliary_data: dU, transactionbuilder_remove_auxiliary_data: cU, transactionbuilder_set_metadata: pU, transactionbuilder_add_metadatum: wU, transactionbuilder_add_json_metadatum: gU, transactionbuilder_add_json_metadatum_with_schema: bU, transactionbuilder_set_mint_builder: lU, transactionbuilder_remove_mint_builder: fU, transactionbuilder_get_mint_builder: uU, transactionbuilder_set_mint: hU, transactionbuilder_get_mint: yU, transactionbuilder_get_mint_scripts: vU, transactionbuilder_set_mint_asset: mU, transactionbuilder_add_mint_asset: kU, transactionbuilder_add_mint_asset_and_output: jU, transactionbuilder_add_mint_asset_and_output_min_required_coin: xU, transactionbuilder_add_extra_witness_datum: zU, transactionbuilder_get_extra_witness_datums: FU, transactionbuilder_set_donation: RU, transactionbuilder_get_donation: OU, transactionbuilder_set_current_treasury_value: qU, transactionbuilder_get_current_treasury_value: $U, transactionbuilder_new: LU, transactionbuilder_get_reference_inputs: JU, transactionbuilder_get_explicit_input: YU, transactionbuilder_get_implicit_input: QU, transactionbuilder_get_total_input: XU, transactionbuilder_get_total_output: ZU, transactionbuilder_get_explicit_output: UU, transactionbuilder_get_deposit: EU, transactionbuilder_get_fee_if_set: KU, transactionbuilder_add_change_if_needed: SU, transactionbuilder_add_change_if_needed_with_datum: WU, transactionbuilder_calc_script_data_hash: MU, transactionbuilder_set_script_data_hash: GU, transactionbuilder_remove_script_data_hash: HU, transactionbuilder_add_required_signer: AU, transactionbuilder_full_size: IU, transactionbuilder_output_sizes: DU, transactionbuilder_build: TU, transactionbuilder_build_tx: NU, transactionbuilder_build_tx_unsafe: CU, transactionbuilder_min_fee: VU, __wbg_votingprocedures_free: PU, votingprocedures_to_bytes: BU, votingprocedures_from_bytes: _E, votingprocedures_to_hex: tE, votingprocedures_from_hex: rE, votingprocedures_to_json: eE, votingprocedures_to_js_value: nE, votingprocedures_from_json: aE, votingprocedures_insert: oE, votingprocedures_get: iE, votingprocedures_get_voters: sE, votingprocedures_get_governance_action_ids_by_voter: dE, __wbg_treasurywithdrawals_free: cE, treasurywithdrawals_to_json: pE, treasurywithdrawals_to_js_value: wE, treasurywithdrawals_from_json: gE, treasurywithdrawals_new: bE, treasurywithdrawals_get: lE, treasurywithdrawals_insert: fE, treasurywithdrawals_keys: uE, treasurywithdrawals_len: hE, __wbg_committee_free: yE, committee_to_bytes: vE, committee_from_bytes: mE, committee_to_hex: kE, committee_from_hex: jE, committee_to_json: xE, committee_to_js_value: zE, committee_from_json: FE, committee_new: RE, committee_members_keys: OE, committee_quorum_threshold: qE, committee_add_member: $E, committee_get_member_epoch: LE, __wbg_costmodel_free: JE, costmodel_to_bytes: YE, costmodel_from_bytes: QE, costmodel_to_hex: XE, costmodel_from_hex: ZE, costmodel_to_json: UE, costmodel_to_js_value: EE, costmodel_from_json: KE, costmodel_new: SE, costmodel_set: WE, costmodel_get: ME, costmodel_len: GE, __wbg_exunits_free: HE, exunits_to_bytes: AE, exunits_from_bytes: IE, exunits_to_hex: DE, exunits_from_hex: TE, exunits_to_json: NE, exunits_to_js_value: CE, exunits_from_json: VE, exunits_mem: PE, exunits_steps: BE, exunits_new: _K, __wbg_transactionbody_free: tK, transactionbody_to_bytes: rK, transactionbody_from_bytes: eK, transactionbody_to_hex: nK, transactionbody_from_hex: aK, transactionbody_to_json: oK, transactionbody_to_js_value: iK, transactionbody_from_json: sK, transactionbody_inputs: dK, transactionbody_outputs: cK, transactionbody_fee: pK, transactionbody_ttl: wK, transactionbody_ttl_bignum: gK, transactionbody_set_ttl: bK, transactionbody_remove_ttl: lK, transactionbody_set_certs: fK, transactionbody_certs: uK, transactionbody_set_withdrawals: hK, transactionbody_withdrawals: yK, transactionbody_set_update: vK, transactionbody_update: mK, transactionbody_set_auxiliary_data_hash: kK, transactionbody_auxiliary_data_hash: jK, transactionbody_set_validity_start_interval: xK, transactionbody_set_validity_start_interval_bignum: zK, transactionbody_validity_start_interval_bignum: FK, transactionbody_validity_start_interval: RK, transactionbody_set_mint: OK, transactionbody_mint: qK, transactionbody_set_reference_inputs: $K, transactionbody_reference_inputs: LK, transactionbody_set_script_data_hash: JK, transactionbody_script_data_hash: YK, transactionbody_set_collateral: QK, transactionbody_collateral: XK, transactionbody_set_required_signers: ZK, transactionbody_required_signers: UK, transactionbody_set_network_id: EK, transactionbody_network_id: KK, transactionbody_set_collateral_return: SK, transactionbody_collateral_return: WK, transactionbody_set_total_collateral: MK, transactionbody_total_collateral: GK, transactionbody_set_voting_procedures: HK, transactionbody_voting_procedures: AK, transactionbody_set_voting_proposals: IK, transactionbody_voting_proposals: DK, transactionbody_set_donation: TK, transactionbody_donation: NK, transactionbody_set_current_treasury_value: CK, transactionbody_current_treasury_value: VK, transactionbody_new: PK, transactionbody_new_tx_body: BK, __wbg_transactionwitnessset_free: _S, transactionwitnessset_to_bytes: tS, transactionwitnessset_from_bytes: rS, transactionwitnessset_to_hex: eS, transactionwitnessset_from_hex: nS, transactionwitnessset_to_json: aS, transactionwitnessset_to_js_value: oS, transactionwitnessset_from_json: iS, transactionwitnessset_set_vkeys: sS, transactionwitnessset_vkeys: dS, transactionwitnessset_set_native_scripts: cS, transactionwitnessset_native_scripts: pS, transactionwitnessset_set_bootstraps: wS, transactionwitnessset_bootstraps: gS, transactionwitnessset_set_plutus_scripts: bS, transactionwitnessset_plutus_scripts: lS, transactionwitnessset_set_plutus_data: fS, transactionwitnessset_plutus_data: uS, transactionwitnessset_set_redeemers: hS, transactionwitnessset_redeemers: yS, transactionwitnessset_new: vS, __wbg_vrfcert_free: mS, vrfcert_to_bytes: kS, vrfcert_from_bytes: jS, vrfcert_to_hex: xS, vrfcert_from_hex: zS, vrfcert_to_json: FS, vrfcert_to_js_value: RS, vrfcert_from_json: OS, vrfcert_output: qS, vrfcert_proof: $S, vrfcert_new: LS, votingprocedures_new: JS, __wbg_datumsource_free: YS, datumsource_new: QS, datumsource_new_ref_input: XS, __wbg_drepderegistration_free: ZS, drepderegistration_to_bytes: US, drepderegistration_from_bytes: ES, drepderegistration_to_hex: KS, drepderegistration_from_hex: SS, drepderegistration_to_json: WS, drepderegistration_to_js_value: MS, drepderegistration_from_json: GS, drepderegistration_voting_credential: HS, drepderegistration_coin: AS, drepderegistration_new: IS, drepderegistration_has_script_credentials: DS, __wbg_drepupdate_free: TS, drepupdate_to_bytes: NS, drepupdate_from_bytes: CS, drepupdate_to_hex: VS, drepupdate_from_hex: PS, drepupdate_to_json: BS, drepupdate_to_js_value: _W, drepupdate_from_json: tW, drepupdate_voting_credential: rW, drepupdate_anchor: eW, drepupdate_new: nW, drepupdate_new_with_anchor: aW, drepupdate_has_script_credentials: oW, __wbg_noconfidenceaction_free: iW, noconfidenceaction_to_bytes: sW, noconfidenceaction_from_bytes: dW, noconfidenceaction_to_hex: cW, noconfidenceaction_from_hex: pW, noconfidenceaction_to_json: wW, noconfidenceaction_to_js_value: gW, noconfidenceaction_from_json: bW, noconfidenceaction_gov_action_id: lW, noconfidenceaction_new: fW, noconfidenceaction_new_with_action_id: uW, __wbg_governanceaction_free: hW, governanceaction_to_bytes: yW, governanceaction_from_bytes: vW, governanceaction_to_hex: mW, governanceaction_from_hex: kW, governanceaction_to_json: jW, governanceaction_to_js_value: xW, governanceaction_from_json: zW, governanceaction_new_parameter_change_action: FW, governanceaction_new_hard_fork_initiation_action: RW, governanceaction_new_treasury_withdrawals_action: OW, governanceaction_new_no_confidence_action: qW, governanceaction_new_new_committee_action: $W, governanceaction_new_new_constitution_action: LW, governanceaction_new_info_action: JW, governanceaction_kind: YW, governanceaction_as_parameter_change_action: QW, governanceaction_as_hard_fork_initiation_action: XW, governanceaction_as_treasury_withdrawals_action: ZW, governanceaction_as_no_confidence_action: UW, governanceaction_as_new_committee_action: EW, governanceaction_as_new_constitution_action: KW, governanceaction_as_info_action: SW, __wbg_strings_free: WW, strings_new: MW, strings_len: GW, strings_get: HW, strings_add: AW, __wbg_credentials_free: IW, credentials_to_bytes: DW, credentials_from_bytes: TW, credentials_to_hex: NW, credentials_from_hex: CW, credentials_to_json: VW, credentials_to_js_value: PW, credentials_from_json: BW, credentials_new: _M, credentials_len: tM, credentials_get: rM, credentials_add: eM, __wbg_int_free: nM, int_to_bytes: aM, int_from_bytes: oM, int_to_hex: iM, int_from_hex: sM, int_to_json: dM, int_to_js_value: cM, int_from_json: pM, int_new: wM, int_new_negative: gM, int_new_i32: bM, int_is_positive: lM, int_as_positive: fM, int_as_negative: uM, int_as_i32: hM, int_as_i32_or_nothing: yM, int_as_i32_or_fail: vM, int_to_str: mM, int_from_str: kM, __wbg_bignum_free: jM, bignum_to_bytes: xM, bignum_from_bytes: zM, bignum_to_hex: FM, bignum_from_hex: RM, bignum_to_json: OM, bignum_to_js_value: qM, bignum_from_json: $M, bignum_from_str: LM, bignum_to_str: JM, bignum_zero: YM, bignum_one: QM, bignum_is_zero: XM, bignum_div_floor: ZM, bignum_checked_mul: UM, bignum_checked_add: EM, bignum_checked_sub: KM, bignum_clamped_sub: SM, bignum_compare: WM, bignum_less_than: MM, bignum_max_value: GM, bignum_max: HM, __wbg_scriptref_free: AM, scriptref_to_bytes: IM, scriptref_from_bytes: DM, scriptref_to_hex: TM, scriptref_from_hex: NM, scriptref_to_json: CM, scriptref_to_js_value: VM, scriptref_from_json: PM, scriptref_new_native_script: BM, scriptref_new_plutus_script: _G, scriptref_is_native_script: tG, scriptref_is_plutus_script: rG, scriptref_native_script: eG, scriptref_plutus_script: nG, scriptref_to_unwrapped_bytes: aG, __wbindgen_malloc: oG, __wbindgen_realloc: iG, __wbindgen_add_to_stack_pointer: sG, __wbindgen_free: dG, __wbindgen_exn_store: cG } = gs, pG = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wbg_address_free: $5,
    __wbg_anchor_free: lj,
    __wbg_anchordatahash_free: kQ,
    __wbg_assetname_free: ph,
    __wbg_assetnames_free: mh,
    __wbg_assets_free: Yh,
    __wbg_auxiliarydata_free: z0,
    __wbg_auxiliarydatahash_free: wX,
    __wbg_auxiliarydataset_free: ah,
    __wbg_baseaddress_free: H5,
    __wbg_bigint_free: CO,
    __wbg_bignum_free: jM,
    __wbg_bip32privatekey_free: U7,
    __wbg_bip32publickey_free: mg,
    __wbg_block_free: z2,
    __wbg_blockhash_free: lX,
    __wbg_bootstrapwitness_free: Nk,
    __wbg_bootstrapwitnesses_free: ww,
    __wbg_byronaddress_free: u5,
    __wbg_certificate_free: BL,
    __wbg_certificates_free: EF,
    __wbg_certificatesbuilder_free: iF,
    __wbg_changeconfig_free: uZ,
    __wbg_committee_free: yE,
    __wbg_committeecoldresign_free: J8,
    __wbg_committeehotauth_free: Ec,
    __wbg_constitution_free: Xx,
    __wbg_constrplutusdata_free: j1,
    __wbg_costmdls_free: EY,
    __wbg_costmodel_free: JE,
    __wbg_credential_free: Mp,
    __wbg_credentials_free: IW,
    __wbg_datacost_free: yb,
    __wbg_datahash_free: fX,
    __wbg_datumsource_free: YS,
    __wbg_dnsrecordaoraaaa_free: tv,
    __wbg_dnsrecordsrv_free: By,
    __wbg_drep_free: Zw,
    __wbg_drepderegistration_free: ZS,
    __wbg_drepregistration_free: A8,
    __wbg_drepupdate_free: TS,
    __wbg_drepvotingthresholds_free: t4,
    __wbg_ed25519keyhash_free: wQ,
    __wbg_ed25519keyhashes_free: PY,
    __wbg_ed25519signature_free: s6,
    __wbg_enterpriseaddress_free: V5,
    __wbg_exunitprices_free: Wv,
    __wbg_exunits_free: HE,
    __wbg_fixedblock_free: K2,
    __wbg_fixedtransaction_free: XR,
    __wbg_fixedtransactionbodies_free: X9,
    __wbg_fixedtransactionbody_free: y9,
    __wbg_fixedtxwitnessesset_free: LO,
    __wbg_fixedversionedblock_free: E6,
    __wbg_generaltransactionmetadata_free: w0,
    __wbg_genesisdelegatehash_free: cX,
    __wbg_genesishash_free: pX,
    __wbg_genesishashes_free: fu,
    __wbg_genesiskeydelegation_free: DJ,
    __wbg_governanceaction_free: hW,
    __wbg_governanceactionid_free: Fj,
    __wbg_governanceactionids_free: f7,
    __wbg_hardforkinitiationaction_free: Pj,
    __wbg_header_free: T2,
    __wbg_headerbody_free: Y$,
    __wbg_infoaction_free: x7,
    __wbg_int_free: nM,
    __wbg_ipv4_free: Gb,
    __wbg_ipv6_free: Bb,
    __wbg_kessignature_free: aq,
    __wbg_kesvkey_free: yX,
    __wbg_language_free: $p,
    __wbg_languages_free: Xv,
    __wbg_legacydaedalusprivatekey_free: kg,
    __wbg_linearfee_free: Rv,
    __wbg_malformedaddress_free: g5,
    __wbg_metadatalist_free: Ym,
    __wbg_metadatamap_free: vm,
    __wbg_mint_free: uy,
    __wbg_mintassets_free: wy,
    __wbg_mintbuilder_free: G3,
    __wbg_mintsassets_free: oy,
    __wbg_mintwitness_free: S3,
    __wbg_mirtostakecredentials_free: zs,
    __wbg_moveinstantaneousreward_free: Es,
    __wbg_moveinstantaneousrewardscert_free: ls,
    __wbg_multiasset_free: Ih,
    __wbg_multihostname_free: _v,
    __wbg_nativescript_free: sq,
    __wbg_nativescripts_free: EO,
    __wbg_nativescriptsource_free: kL,
    __wbg_networkid_free: Jy,
    __wbg_networkinfo_free: o5,
    __wbg_newconstitutionaction_free: Dx,
    __wbg_noconfidenceaction_free: iW,
    __wbg_nonce_free: Fg,
    __wbg_operationalcert_free: z6,
    __wbg_outputdatum_free: _u,
    __wbg_parameterchangeaction_free: Uj,
    __wbg_plutusdata_free: G1,
    __wbg_plutuslist_free: dm,
    __wbg_plutusmap_free: X1,
    __wbg_plutusmapvalues_free: L1,
    __wbg_plutusscript_free: s3,
    __wbg_plutusscripts_free: FY,
    __wbg_plutusscriptsource_free: uL,
    __wbg_plutuswitness_free: _R,
    __wbg_plutuswitnesses_free: sR,
    __wbg_pointer_free: nO,
    __wbg_pointeraddress_free: gO,
    __wbg_poolmetadata_free: kf,
    __wbg_poolmetadatahash_free: gX,
    __wbg_poolparams_free: yd,
    __wbg_poolregistration_free: Yw,
    __wbg_poolretirement_free: d8,
    __wbg_poolvotingthresholds_free: I0,
    __wbg_privatekey_free: UO,
    __wbg_proposedprotocolparameterupdates_free: Uu,
    __wbg_protocolparamupdate_free: $4,
    __wbg_protocolversion_free: Tu,
    __wbg_publickey_free: xw,
    __wbg_publickeys_free: _q,
    __wbg_redeemer_free: Cv,
    __wbg_redeemers_free: d1,
    __wbg_redeemertag_free: og,
    __wbg_relay_free: of,
    __wbg_relays_free: id,
    __wbg_rewardaddress_free: B9,
    __wbg_rewardaddresses_free: Jf,
    __wbg_scriptall_free: Wq,
    __wbg_scriptany_free: aL,
    __wbg_scriptdatahash_free: uX,
    __wbg_scripthash_free: sX,
    __wbg_scripthashes_free: yv,
    __wbg_scriptnofk_free: n$,
    __wbg_scriptpubkey_free: Lq,
    __wbg_scriptref_free: AM,
    __wbg_singlehostaddr_free: $l,
    __wbg_singlehostname_free: Ml,
    __wbg_stakeandvotedelegation_free: Ad,
    __wbg_stakedelegation_free: v8,
    __wbg_stakederegistration_free: aY,
    __wbg_stakeregistration_free: Dw,
    __wbg_stakeregistrationanddelegation_free: rc,
    __wbg_stakevoteregistrationanddelegation_free: lc,
    __wbg_strings_free: WW,
    __wbg_timelockexpiry_free: m$,
    __wbg_timelockstart_free: bL,
    __wbg_transaction_free: Dg,
    __wbg_transactionbatch_free: $L,
    __wbg_transactionbatchlist_free: RL,
    __wbg_transactionbodies_free: x9,
    __wbg_transactionbody_free: tK,
    __wbg_transactionbuilder_free: kZ,
    __wbg_transactionbuilderconfig_free: rZ,
    __wbg_transactionbuilderconfigbuilder_free: eZ,
    __wbg_transactionhash_free: dX,
    __wbg_transactioninput_free: rF,
    __wbg_transactioninputs_free: x3,
    __wbg_transactionmetadatum_free: Mm,
    __wbg_transactionmetadatumlabels_free: n0,
    __wbg_transactionoutput_free: kb,
    __wbg_transactionoutputamountbuilder_free: qR,
    __wbg_transactionoutputbuilder_free: kR,
    __wbg_transactionoutputs_free: ib,
    __wbg_transactionunspentoutput_free: az,
    __wbg_transactionunspentoutputs_free: fz,
    __wbg_transactionwitnessset_free: _S,
    __wbg_transactionwitnesssets_free: vO,
    __wbg_treasurywithdrawals_free: cE,
    __wbg_treasurywithdrawalsaction_free: cx,
    __wbg_txinputsbuilder_free: QL,
    __wbg_unitinterval_free: Ug,
    __wbg_update_free: au,
    __wbg_updatecommitteeaction_free: kx,
    __wbg_url_free: Py,
    __wbg_value_free: xz,
    __wbg_versionedblock_free: G6,
    __wbg_vkey_free: l6,
    __wbg_vkeys_free: wL,
    __wbg_vkeywitness_free: F7,
    __wbg_vkeywitnesses_free: rw,
    __wbg_votedelegation_free: Xw,
    __wbg_voter_free: gp,
    __wbg_voteregistrationanddelegation_free: Qw,
    __wbg_voters_free: hY,
    __wbg_votingbuilder_free: yF,
    __wbg_votingprocedure_free: a7,
    __wbg_votingprocedures_free: PU,
    __wbg_votingproposal_free: a2,
    __wbg_votingproposalbuilder_free: qF,
    __wbg_votingproposals_free: CF,
    __wbg_vrfcert_free: mS,
    __wbg_vrfkeyhash_free: bX,
    __wbg_vrfvkey_free: hX,
    __wbg_withdrawals_free: Gf,
    __wbg_withdrawalsbuilder_free: wR,
    __wbindgen_add_to_stack_pointer: sG,
    __wbindgen_exn_store: cG,
    __wbindgen_free: dG,
    __wbindgen_malloc: oG,
    __wbindgen_realloc: iG,
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
    anchor_anchor_data_hash: xj,
    anchor_from_bytes: uj,
    anchor_from_hex: yj,
    anchor_from_json: kj,
    anchor_new: zj,
    anchor_to_bytes: fj,
    anchor_to_hex: hj,
    anchor_to_js_value: mj,
    anchor_to_json: vj,
    anchor_url: jj,
    anchordatahash_from_bech32: FQ,
    anchordatahash_from_bytes: jQ,
    anchordatahash_from_hex: OQ,
    anchordatahash_to_bech32: zQ,
    anchordatahash_to_bytes: xQ,
    anchordatahash_to_hex: RQ,
    assetname_from_bytes: gh,
    assetname_from_hex: lh,
    assetname_from_json: hh,
    assetname_name: vh,
    assetname_new: yh,
    assetname_to_bytes: wh,
    assetname_to_hex: bh,
    assetname_to_js_value: uh,
    assetname_to_json: fh,
    assetnames_add: Jh,
    assetnames_from_bytes: jh,
    assetnames_from_hex: zh,
    assetnames_from_json: Oh,
    assetnames_get: Lh,
    assetnames_len: $h,
    assetnames_new: qh,
    assetnames_to_bytes: kh,
    assetnames_to_hex: xh,
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
    auxiliarydata_from_bytes: R0,
    auxiliarydata_from_hex: q0,
    auxiliarydata_from_json: J0,
    auxiliarydata_metadata: Q0,
    auxiliarydata_native_scripts: Z0,
    auxiliarydata_new: Y0,
    auxiliarydata_plutus_scripts: E0,
    auxiliarydata_prefer_alonzo_format: S0,
    auxiliarydata_set_metadata: X0,
    auxiliarydata_set_native_scripts: U0,
    auxiliarydata_set_plutus_scripts: K0,
    auxiliarydata_set_prefer_alonzo_format: W0,
    auxiliarydata_to_bytes: F0,
    auxiliarydata_to_hex: O0,
    auxiliarydata_to_js_value: L0,
    auxiliarydata_to_json: $0,
    auxiliarydatahash_from_bech32: KQ,
    auxiliarydatahash_from_bytes: EQ,
    auxiliarydatahash_from_hex: SQ,
    auxiliarydatahash_to_bech32: CX,
    auxiliarydatahash_to_bytes: EX,
    auxiliarydatahash_to_hex: xX,
    auxiliarydataset_get: dh,
    auxiliarydataset_indices: ch,
    auxiliarydataset_insert: sh,
    auxiliarydataset_len: ih,
    auxiliarydataset_new: oh,
    baseaddress_from_address: N5,
    baseaddress_network_id: C5,
    baseaddress_new: A5,
    baseaddress_payment_cred: I5,
    baseaddress_stake_cred: D5,
    baseaddress_to_address: T5,
    bigint_abs: l9,
    bigint_add: d9,
    bigint_as_int: o9,
    bigint_as_u64: a9,
    bigint_div_ceil: u9,
    bigint_div_floor: h9,
    bigint_from_bytes: PO,
    bigint_from_hex: _9,
    bigint_from_json: e9,
    bigint_from_str: i9,
    bigint_increment: f9,
    bigint_is_zero: n9,
    bigint_mul: p9,
    bigint_one: g9,
    bigint_pow: w9,
    bigint_sub: c9,
    bigint_to_bytes: VO,
    bigint_to_hex: BO,
    bigint_to_js_value: r9,
    bigint_to_json: t9,
    bigint_to_str: s9,
    bigint_zero: b9,
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
    bignum_to_bytes: xM,
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
    bootstrapwitness_attributes: o6,
    bootstrapwitness_chain_code: a6,
    bootstrapwitness_from_bytes: Vk,
    bootstrapwitness_from_hex: Bk,
    bootstrapwitness_from_json: r6,
    bootstrapwitness_new: i6,
    bootstrapwitness_signature: n6,
    bootstrapwitness_to_bytes: Ck,
    bootstrapwitness_to_hex: Pk,
    bootstrapwitness_to_js_value: t6,
    bootstrapwitness_to_json: _6,
    bootstrapwitness_vkey: e6,
    bootstrapwitnesses_add: jw,
    bootstrapwitnesses_from_bytes: bw,
    bootstrapwitnesses_from_hex: fw,
    bootstrapwitnesses_from_json: yw,
    bootstrapwitnesses_get: kw,
    bootstrapwitnesses_len: mw,
    bootstrapwitnesses_new: vw,
    bootstrapwitnesses_to_bytes: gw,
    bootstrapwitnesses_to_hex: lw,
    bootstrapwitnesses_to_js_value: hw,
    bootstrapwitnesses_to_json: uw,
    byronaddress_attributes: j5,
    byronaddress_byron_address_kind: k5,
    byronaddress_byron_protocol_magic: m5,
    byronaddress_from_address: q5,
    byronaddress_from_base58: z5,
    byronaddress_from_bytes: v5,
    byronaddress_icarus_from_key: F5,
    byronaddress_is_valid: R5,
    byronaddress_network_id: x5,
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
    certificate_from_bytes: tJ,
    certificate_from_hex: eJ,
    certificate_from_json: oJ,
    certificate_has_required_script_witness: IJ,
    certificate_kind: FJ,
    certificate_new_committee_cold_resign: uJ,
    certificate_new_committee_hot_auth: fJ,
    certificate_new_drep_deregistration: hJ,
    certificate_new_drep_registration: yJ,
    certificate_new_drep_update: vJ,
    certificate_new_genesis_key_delegation: bJ,
    certificate_new_move_instantaneous_rewards_cert: lJ,
    certificate_new_pool_registration: wJ,
    certificate_new_pool_retirement: gJ,
    certificate_new_reg_cert: sJ,
    certificate_new_stake_and_vote_delegation: mJ,
    certificate_new_stake_delegation: pJ,
    certificate_new_stake_deregistration: dJ,
    certificate_new_stake_registration: iJ,
    certificate_new_stake_registration_and_delegation: kJ,
    certificate_new_stake_vote_registration_and_delegation: jJ,
    certificate_new_unreg_cert: cJ,
    certificate_new_vote_delegation: xJ,
    certificate_new_vote_registration_and_delegation: zJ,
    certificate_to_bytes: _J,
    certificate_to_hex: rJ,
    certificate_to_js_value: aJ,
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
    certificatesbuilder_get_certificates_deposit: fF,
    certificatesbuilder_get_certificates_refund: lF,
    certificatesbuilder_get_native_scripts: bF,
    certificatesbuilder_get_plutus_witnesses: wF,
    certificatesbuilder_get_ref_inputs: gF,
    certificatesbuilder_has_plutus_scripts: uF,
    certificatesbuilder_new: sF,
    changeconfig_change_address: yZ,
    changeconfig_change_plutus_data: vZ,
    changeconfig_change_script_ref: mZ,
    changeconfig_new: hZ,
    committee_add_member: $E,
    committee_from_bytes: mE,
    committee_from_hex: jE,
    committee_from_json: FE,
    committee_get_member_epoch: LE,
    committee_members_keys: OE,
    committee_new: RE,
    committee_quorum_threshold: qE,
    committee_to_bytes: vE,
    committee_to_hex: kE,
    committee_to_js_value: zE,
    committee_to_json: xE,
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
    constitution_anchor: Gx,
    constitution_from_bytes: Ux,
    constitution_from_hex: Kx,
    constitution_from_json: Mx,
    constitution_new: Ax,
    constitution_new_with_script_hash: Ix,
    constitution_script_hash: Hx,
    constitution_to_bytes: Zx,
    constitution_to_hex: Ex,
    constitution_to_js_value: Wx,
    constitution_to_json: Sx,
    constrplutusdata_alternative: O1,
    constrplutusdata_data: q1,
    constrplutusdata_from_bytes: z1,
    constrplutusdata_from_hex: R1,
    constrplutusdata_new: $1,
    constrplutusdata_to_bytes: x1,
    constrplutusdata_to_hex: F1,
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
    credential_from_json: tw,
    credential_from_keyhash: Gp,
    credential_from_scripthash: Hp,
    credential_has_script_hash: Tp,
    credential_kind: Dp,
    credential_to_bytes: Np,
    credential_to_hex: Vp,
    credential_to_js_value: _w,
    credential_to_json: Bp,
    credential_to_keyhash: Ap,
    credential_to_scripthash: Ip,
    credentials_add: eM,
    credentials_from_bytes: TW,
    credentials_from_hex: CW,
    credentials_from_json: BW,
    credentials_get: rM,
    credentials_len: tM,
    credentials_new: _M,
    credentials_to_bytes: DW,
    credentials_to_hex: NW,
    credentials_to_js_value: PW,
    credentials_to_json: VW,
    datacost_coins_per_byte: mb,
    datacost_new_coins_per_byte: vb,
    datahash_from_bech32: VQ,
    datahash_from_bytes: CQ,
    datahash_from_hex: PQ,
    datahash_to_bech32: PX,
    datahash_to_bytes: SX,
    datahash_to_hex: OX,
    datumsource_new: QS,
    datumsource_new_ref_input: XS,
    decode_arbitrary_bytes_from_metadatum: G0,
    decode_metadatum_to_json_str: A0,
    decode_plutus_datum_to_json_str: ym,
    decrypt_with_password: UF,
    dnsrecordaoraaaa_from_bytes: fl,
    dnsrecordaoraaaa_from_hex: hl,
    dnsrecordaoraaaa_from_json: ml,
    dnsrecordaoraaaa_new: kl,
    dnsrecordaoraaaa_record: jl,
    dnsrecordaoraaaa_to_bytes: ll,
    dnsrecordaoraaaa_to_hex: ul,
    dnsrecordaoraaaa_to_js_value: vl,
    dnsrecordaoraaaa_to_json: yl,
    dnsrecordsrv_from_bytes: zl,
    dnsrecordsrv_from_hex: Rl,
    dnsrecordsrv_from_json: Ol,
    dnsrecordsrv_new: ql,
    dnsrecordsrv_record: wv,
    dnsrecordsrv_to_bytes: xl,
    dnsrecordsrv_to_hex: Fl,
    dnsrecordsrv_to_js_value: hv,
    dnsrecordsrv_to_json: cv,
    drep_from_bech32: wp,
    drep_from_bytes: Vc,
    drep_from_hex: Bc,
    drep_from_json: rp,
    drep_kind: sp,
    drep_new_always_abstain: ap,
    drep_new_always_no_confidence: op,
    drep_new_from_credential: ip,
    drep_new_key_hash: ep,
    drep_new_script_hash: np,
    drep_to_bech32: pp,
    drep_to_bytes: Cc,
    drep_to_hex: Pc,
    drep_to_js_value: tp,
    drep_to_json: _p,
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
    drepregistration_anchor: t7,
    drepregistration_coin: _7,
    drepregistration_from_bytes: D8,
    drepregistration_from_hex: N8,
    drepregistration_from_json: P8,
    drepregistration_has_script_credentials: n7,
    drepregistration_new: r7,
    drepregistration_new_with_anchor: e7,
    drepregistration_to_bytes: I8,
    drepregistration_to_hex: T8,
    drepregistration_to_js_value: V8,
    drepregistration_to_json: C8,
    drepregistration_voting_credential: B8,
    drepupdate_anchor: eW,
    drepupdate_from_bytes: CS,
    drepupdate_from_hex: PS,
    drepupdate_from_json: tW,
    drepupdate_has_script_credentials: oW,
    drepupdate_new: nW,
    drepupdate_new_with_anchor: aW,
    drepupdate_to_bytes: NS,
    drepupdate_to_hex: VS,
    drepupdate_to_js_value: _W,
    drepupdate_to_json: BS,
    drepupdate_voting_credential: rW,
    drepvotingthresholds_committee_no_confidence: k4,
    drepvotingthresholds_committee_normal: m4,
    drepvotingthresholds_from_bytes: e4,
    drepvotingthresholds_from_hex: a4,
    drepvotingthresholds_from_json: s4,
    drepvotingthresholds_hard_fork_initiation: x4,
    drepvotingthresholds_motion_no_confidence: v4,
    drepvotingthresholds_new: d4,
    drepvotingthresholds_pp_economic_group: F4,
    drepvotingthresholds_pp_governance_group: O4,
    drepvotingthresholds_pp_network_group: z4,
    drepvotingthresholds_pp_technical_group: R4,
    drepvotingthresholds_set_committee_no_confidence: w4,
    drepvotingthresholds_set_committee_normal: p4,
    drepvotingthresholds_set_hard_fork_initiation: b4,
    drepvotingthresholds_set_motion_no_confidence: c4,
    drepvotingthresholds_set_pp_economic_group: f4,
    drepvotingthresholds_set_pp_governance_group: h4,
    drepvotingthresholds_set_pp_network_group: l4,
    drepvotingthresholds_set_pp_technical_group: u4,
    drepvotingthresholds_set_treasury_withdrawal: y4,
    drepvotingthresholds_set_update_constitution: g4,
    drepvotingthresholds_to_bytes: r4,
    drepvotingthresholds_to_hex: n4,
    drepvotingthresholds_to_js_value: i4,
    drepvotingthresholds_to_json: o4,
    drepvotingthresholds_treasury_withdrawal: q4,
    drepvotingthresholds_update_constitution: j4,
    ed25519keyhash_from_bech32: fQ,
    ed25519keyhash_from_bytes: gQ,
    ed25519keyhash_from_hex: hQ,
    ed25519keyhash_to_bech32: lQ,
    ed25519keyhash_to_bytes: bQ,
    ed25519keyhash_to_hex: uQ,
    ed25519keyhashes_add: dQ,
    ed25519keyhashes_contains: cQ,
    ed25519keyhashes_from_bytes: _Q,
    ed25519keyhashes_from_hex: rQ,
    ed25519keyhashes_from_json: aQ,
    ed25519keyhashes_get: sQ,
    ed25519keyhashes_len: iQ,
    ed25519keyhashes_new: oQ,
    ed25519keyhashes_to_bytes: BY,
    ed25519keyhashes_to_hex: tQ,
    ed25519keyhashes_to_js_value: nQ,
    ed25519keyhashes_to_json: eQ,
    ed25519keyhashes_to_option: pQ,
    ed25519signature_from_bech32: w6,
    ed25519signature_from_bytes: b6,
    ed25519signature_from_hex: g6,
    ed25519signature_to_bech32: c6,
    ed25519signature_to_bytes: d6,
    ed25519signature_to_hex: p6,
    encode_arbitrary_bytes_as_metadatum: M0,
    encode_json_str_to_metadatum: H0,
    encode_json_str_to_native_script: _F,
    encode_json_str_to_plutus_datum: hm,
    encrypt_with_password: ZF,
    enterpriseaddress_from_address: _O,
    enterpriseaddress_network_id: tO,
    enterpriseaddress_new: P5,
    enterpriseaddress_payment_cred: _8,
    enterpriseaddress_to_address: B5,
    exunitprices_from_bytes: Gv,
    exunitprices_from_hex: Av,
    exunitprices_from_json: Tv,
    exunitprices_mem_price: rj,
    exunitprices_new: Nv,
    exunitprices_step_price: ej,
    exunitprices_to_bytes: Mv,
    exunitprices_to_hex: Hv,
    exunitprices_to_js_value: Dv,
    exunitprices_to_json: Iv,
    exunits_from_bytes: IE,
    exunits_from_hex: TE,
    exunits_from_json: VE,
    exunits_mem: PE,
    exunits_new: _K,
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
    fixedtransaction_add_bootstrap_witness: r5,
    fixedtransaction_add_vkey_witness: t5,
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
    fixedtransaction_sign_and_add_daedalus_bootstrap_signature: a5,
    fixedtransaction_sign_and_add_icarus_bootstrap_signature: n5,
    fixedtransaction_sign_and_add_vkey_signature: e5,
    fixedtransaction_to_bytes: ZR,
    fixedtransaction_to_hex: ER,
    fixedtransaction_transaction_hash: _5,
    fixedtransaction_witness_set: DR,
    fixedtransactionbodies_add: W9,
    fixedtransactionbodies_from_bytes: Z9,
    fixedtransactionbodies_from_hex: U9,
    fixedtransactionbodies_get: S9,
    fixedtransactionbodies_len: K9,
    fixedtransactionbodies_new: E9,
    fixedtransactionbody_from_bytes: v9,
    fixedtransactionbody_from_hex: m9,
    fixedtransactionbody_original_bytes: j9,
    fixedtransactionbody_transaction_body: r8,
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
    generaltransactionmetadata_from_bytes: b0,
    generaltransactionmetadata_from_hex: f0,
    generaltransactionmetadata_from_json: y0,
    generaltransactionmetadata_get: j0,
    generaltransactionmetadata_insert: k0,
    generaltransactionmetadata_keys: x0,
    generaltransactionmetadata_len: m0,
    generaltransactionmetadata_new: v0,
    generaltransactionmetadata_to_bytes: g0,
    generaltransactionmetadata_to_hex: l0,
    generaltransactionmetadata_to_js_value: h0,
    generaltransactionmetadata_to_json: u0,
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
    genesishash_to_hex: jX,
    genesishashes_add: Ru,
    genesishashes_from_bytes: hu,
    genesishashes_from_hex: vu,
    genesishashes_from_json: ju,
    genesishashes_get: Fu,
    genesishashes_len: zu,
    genesishashes_new: xu,
    genesishashes_to_bytes: uu,
    genesishashes_to_hex: yu,
    genesishashes_to_js_value: ku,
    genesishashes_to_json: mu,
    genesiskeydelegation_from_bytes: NJ,
    genesiskeydelegation_from_hex: VJ,
    genesiskeydelegation_from_json: _Y,
    genesiskeydelegation_genesis_delegate_hash: rY,
    genesiskeydelegation_genesishash: tY,
    genesiskeydelegation_new: nY,
    genesiskeydelegation_to_bytes: TJ,
    genesiskeydelegation_to_hex: CJ,
    genesiskeydelegation_to_js_value: BJ,
    genesiskeydelegation_to_json: PJ,
    genesiskeydelegation_vrf_keyhash: eY,
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
    governanceaction_to_js_value: xW,
    governanceaction_to_json: jW,
    governanceactionid_from_bytes: Oj,
    governanceactionid_from_hex: $j,
    governanceactionid_from_json: Yj,
    governanceactionid_index: Xj,
    governanceactionid_new: Zj,
    governanceactionid_to_bytes: Rj,
    governanceactionid_to_hex: qj,
    governanceactionid_to_js_value: Jj,
    governanceactionid_to_json: Lj,
    governanceactionid_transaction_id: Qj,
    governanceactionids_add: m7,
    governanceactionids_from_json: y7,
    governanceactionids_get: k7,
    governanceactionids_len: j7,
    governanceactionids_new: v7,
    governanceactionids_to_js_value: h7,
    governanceactionids_to_json: u7,
    hardforkinitiationaction_from_bytes: _x,
    hardforkinitiationaction_from_hex: rx,
    hardforkinitiationaction_from_json: ax,
    hardforkinitiationaction_gov_action_id: ox,
    hardforkinitiationaction_new: sx,
    hardforkinitiationaction_new_with_action_id: dx,
    hardforkinitiationaction_protocol_version: ix,
    hardforkinitiationaction_to_bytes: Bj,
    hardforkinitiationaction_to_hex: tx,
    hardforkinitiationaction_to_js_value: nx,
    hardforkinitiationaction_to_json: ex,
    has_transaction_set_tag: tF,
    hash_auxiliary_data: Tz,
    hash_plutus_data: Nz,
    hash_script_data: Cz,
    header_body_signature: ez,
    header_from_bytes: C2,
    header_from_hex: P2,
    header_from_json: tz,
    header_header_body: rz,
    header_new: nz,
    header_to_bytes: N2,
    header_to_hex: V2,
    header_to_js_value: _z,
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
    headerbody_new: rL,
    headerbody_new_headerbody: eL,
    headerbody_nonce_vrf_or_nothing: T$,
    headerbody_operational_cert: _L,
    headerbody_prev_hash: H$,
    headerbody_protocol_version: tL,
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
    int_as_negative: uM,
    int_as_positive: fM,
    int_from_bytes: oM,
    int_from_hex: sM,
    int_from_json: pM,
    int_from_str: kM,
    int_is_positive: lM,
    int_new: wM,
    int_new_i32: bM,
    int_new_negative: gM,
    int_to_bytes: aM,
    int_to_hex: iM,
    int_to_js_value: cM,
    int_to_json: dM,
    int_to_str: mM,
    ipv4_from_bytes: Ab,
    ipv4_from_hex: Db,
    ipv4_from_json: Cb,
    ipv4_ip: Pb,
    ipv4_new: Vb,
    ipv4_to_bytes: Hb,
    ipv4_to_hex: Ib,
    ipv4_to_js_value: Nb,
    ipv4_to_json: Tb,
    ipv6_from_bytes: tl,
    ipv6_from_hex: el,
    ipv6_from_json: ol,
    ipv6_ip: sl,
    ipv6_new: il,
    ipv6_to_bytes: _l,
    ipv6_to_hex: rl,
    ipv6_to_js_value: al,
    ipv6_to_json: nl,
    kessignature_from_bytes: iq,
    kessignature_to_bytes: oq,
    kesvkey_from_bech32: oX,
    kesvkey_from_bytes: aX,
    kesvkey_from_hex: iX,
    kesvkey_to_bech32: tZ,
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
    legacydaedalusprivatekey_as_bytes: xg,
    legacydaedalusprivatekey_chaincode: zg,
    legacydaedalusprivatekey_from_bytes: jg,
    linearfee_coefficient: qv,
    linearfee_constant: Ov,
    linearfee_new: $v,
    make_daedalus_bootstrap_witness: Az,
    make_icarus_bootstrap_witness: Iz,
    make_vkey_witness: Dz,
    malformedaddress_from_address: f5,
    malformedaddress_original_bytes: b5,
    malformedaddress_to_address: l5,
    memory: bs,
    metadatalist_add: Wm,
    metadatalist_from_bytes: Xm,
    metadatalist_from_hex: Um,
    metadatalist_get: Sm,
    metadatalist_len: Km,
    metadatalist_new: Em,
    metadatalist_to_bytes: Qm,
    metadatalist_to_hex: Zm,
    metadatamap_from_bytes: km,
    metadatamap_from_hex: xm,
    metadatamap_get: Om,
    metadatamap_get_i32: $m,
    metadatamap_get_str: qm,
    metadatamap_has: Lm,
    metadatamap_insert: zm,
    metadatamap_insert_i32: Rm,
    metadatamap_insert_str: Fm,
    metadatamap_keys: Jm,
    metadatamap_len: sj,
    metadatamap_new: gj,
    metadatamap_to_bytes: mm,
    metadatamap_to_hex: jm,
    min_ada_for_output: Bz,
    min_fee: Lv,
    min_ref_script_fee: Qv,
    min_script_fee: Yv,
    mint_as_negative_multiasset: Ly,
    mint_as_positive_multiasset: $y,
    mint_from_bytes: yy,
    mint_from_hex: my,
    mint_from_json: xy,
    mint_get: Oy,
    mint_insert: Ry,
    mint_keys: qy,
    mint_len: Fy,
    mint_new: Fv,
    mint_new_from_entry: zy,
    mint_to_bytes: hy,
    mint_to_hex: vy,
    mint_to_js_value: jy,
    mint_to_json: ky,
    mintassets_get: ly,
    mintassets_insert: by,
    mintassets_keys: fy,
    mintassets_len: ov,
    mintassets_new: bv,
    mintassets_new_from_entry: gy,
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
    mintsassets_len: sv,
    mintsassets_new: zv,
    mintsassets_to_js_value: sy,
    mintsassets_to_json: iy,
    mintwitness_new_native_script: W3,
    mintwitness_new_plutus_script: M3,
    mirtostakecredentials_from_bytes: Rs,
    mirtostakecredentials_from_hex: qs,
    mirtostakecredentials_from_json: Js,
    mirtostakecredentials_get: Zs,
    mirtostakecredentials_insert: Xs,
    mirtostakecredentials_keys: Us,
    mirtostakecredentials_len: Qs,
    mirtostakecredentials_new: Ys,
    mirtostakecredentials_to_bytes: Fs,
    mirtostakecredentials_to_hex: Os,
    mirtostakecredentials_to_js_value: Ls,
    mirtostakecredentials_to_json: $s,
    moveinstantaneousreward_as_to_other_pot: Cs,
    moveinstantaneousreward_as_to_stake_creds: Vs,
    moveinstantaneousreward_from_bytes: Ss,
    moveinstantaneousreward_from_hex: Ms,
    moveinstantaneousreward_from_json: As,
    moveinstantaneousreward_kind: Ns,
    moveinstantaneousreward_new_to_other_pot: Is,
    moveinstantaneousreward_new_to_stake_creds: Ds,
    moveinstantaneousreward_pot: Ts,
    moveinstantaneousreward_to_bytes: Ks,
    moveinstantaneousreward_to_hex: Ws,
    moveinstantaneousreward_to_js_value: Hs,
    moveinstantaneousreward_to_json: Gs,
    moveinstantaneousrewardscert_from_bytes: us,
    moveinstantaneousrewardscert_from_hex: ys,
    moveinstantaneousrewardscert_from_json: ks,
    moveinstantaneousrewardscert_move_instantaneous_reward: js,
    moveinstantaneousrewardscert_new: xs,
    moveinstantaneousrewardscert_to_bytes: fs,
    moveinstantaneousrewardscert_to_hex: hs,
    moveinstantaneousrewardscert_to_js_value: ms,
    moveinstantaneousrewardscert_to_json: vs,
    multiasset_from_bytes: Th,
    multiasset_from_hex: Ch,
    multiasset_from_json: Bh,
    multiasset_get: ty,
    multiasset_get_asset: ey,
    multiasset_insert: _y,
    multiasset_keys: ny,
    multiasset_len: av,
    multiasset_new: gv,
    multiasset_set_asset: ry,
    multiasset_sub: ay,
    multiasset_to_bytes: Dh,
    multiasset_to_hex: Nh,
    multiasset_to_js_value: Ph,
    multiasset_to_json: Vh,
    multihostname_dns_name: af,
    multihostname_from_bytes: Bl,
    multihostname_from_hex: tf,
    multihostname_from_json: nf,
    multihostname_new: xv,
    multihostname_to_bytes: Pl,
    multihostname_to_hex: _f,
    multihostname_to_js_value: ef,
    multihostname_to_json: rf,
    nativescript_as_script_all: zq,
    nativescript_as_script_any: Fq,
    nativescript_as_script_n_of_k: Rq,
    nativescript_as_script_pubkey: xq,
    nativescript_as_timelock_expiry: qq,
    nativescript_as_timelock_start: Oq,
    nativescript_from_bytes: cq,
    nativescript_from_hex: wq,
    nativescript_from_json: lq,
    nativescript_get_required_signers: $q,
    nativescript_hash: fq,
    nativescript_kind: jq,
    nativescript_new_script_all: hq,
    nativescript_new_script_any: yq,
    nativescript_new_script_n_of_k: vq,
    nativescript_new_script_pubkey: uq,
    nativescript_new_timelock_expiry: kq,
    nativescript_new_timelock_start: mq,
    nativescript_to_bytes: dq,
    nativescript_to_hex: pq,
    nativescript_to_js_value: bq,
    nativescript_to_json: gq,
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
    nativescriptsource_new: jL,
    nativescriptsource_new_ref_input: xL,
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
    networkinfo_network_id: s5,
    networkinfo_new: i5,
    networkinfo_protocol_magic: d5,
    networkinfo_testnet_preprod: p5,
    networkinfo_testnet_preview: c5,
    newconstitutionaction_constitution: t2,
    newconstitutionaction_from_bytes: Nx,
    newconstitutionaction_from_hex: Vx,
    newconstitutionaction_from_json: _2,
    newconstitutionaction_gov_action_id: nF,
    newconstitutionaction_has_script_hash: n2,
    newconstitutionaction_new: r2,
    newconstitutionaction_new_with_action_id: e2,
    newconstitutionaction_to_bytes: Tx,
    newconstitutionaction_to_hex: Cx,
    newconstitutionaction_to_js_value: Bx,
    newconstitutionaction_to_json: Px,
    noconfidenceaction_from_bytes: dW,
    noconfidenceaction_from_hex: pW,
    noconfidenceaction_from_json: bW,
    noconfidenceaction_gov_action_id: lW,
    noconfidenceaction_new: fW,
    noconfidenceaction_new_with_action_id: uW,
    noconfidenceaction_to_bytes: sW,
    noconfidenceaction_to_hex: cW,
    noconfidenceaction_to_js_value: gW,
    noconfidenceaction_to_json: wW,
    nonce_from_bytes: Og,
    nonce_from_hex: $g,
    nonce_from_json: Yg,
    nonce_get_hash: Zg,
    nonce_new_from_hash: Xg,
    nonce_new_identity: Qg,
    nonce_to_bytes: Rg,
    nonce_to_hex: qg,
    nonce_to_js_value: Jg,
    nonce_to_json: Lg,
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
    outputdatum_data: nu,
    outputdatum_data_hash: eu,
    outputdatum_new_data: ru,
    outputdatum_new_data_hash: tu,
    parameterchangeaction_from_bytes: Kj,
    parameterchangeaction_from_hex: Wj,
    parameterchangeaction_from_json: Hj,
    parameterchangeaction_gov_action_id: Aj,
    parameterchangeaction_new: Tj,
    parameterchangeaction_new_with_action_id: Nj,
    parameterchangeaction_new_with_policy_hash: Cj,
    parameterchangeaction_new_with_policy_hash_and_action_id: Vj,
    parameterchangeaction_policy_hash: Dj,
    parameterchangeaction_protocol_param_updates: Ij,
    parameterchangeaction_to_bytes: Ej,
    parameterchangeaction_to_hex: Sj,
    parameterchangeaction_to_js_value: Gj,
    parameterchangeaction_to_json: Mj,
    plutusdata_as_address: sm,
    plutusdata_as_bytes: om,
    plutusdata_as_constr_plutus_data: rm,
    plutusdata_as_integer: am,
    plutusdata_as_list: nm,
    plutusdata_as_map: em,
    plutusdata_from_address: im,
    plutusdata_from_bytes: A1,
    plutusdata_from_hex: D1,
    plutusdata_from_json: pj,
    plutusdata_kind: tm,
    plutusdata_new_bytes: _m,
    plutusdata_new_constr_plutus_data: T1,
    plutusdata_new_empty_constr_plutus_data: N1,
    plutusdata_new_integer: B1,
    plutusdata_new_list: P1,
    plutusdata_new_map: V1,
    plutusdata_new_single_value_constr_plutus_data: C1,
    plutusdata_to_bytes: H1,
    plutusdata_to_hex: I1,
    plutusdata_to_json: cj,
    plutuslist_add: um,
    plutuslist_from_bytes: pm,
    plutuslist_from_hex: gm,
    plutuslist_get: fm,
    plutuslist_len: lm,
    plutuslist_new: bm,
    plutuslist_to_bytes: cm,
    plutuslist_to_hex: wm,
    plutusmap_from_bytes: U1,
    plutusmap_from_hex: K1,
    plutusmap_get: W1,
    plutusmap_insert: S1,
    plutusmap_keys: M1,
    plutusmap_len: ij,
    plutusmap_new: wj,
    plutusmap_to_bytes: Z1,
    plutusmap_to_hex: E1,
    plutusmapvalues_add: Q1,
    plutusmapvalues_get: Y1,
    plutusmapvalues_len: dj,
    plutusmapvalues_new: J1,
    plutusscript_bytes: u3,
    plutusscript_from_bytes: c3,
    plutusscript_from_bytes_v2: h3,
    plutusscript_from_bytes_v3: y3,
    plutusscript_from_bytes_with_version: v3,
    plutusscript_from_hex: w3,
    plutusscript_from_hex_with_version: m3,
    plutusscript_hash: k3,
    plutusscript_language_version: j3,
    plutusscript_new: g3,
    plutusscript_new_v2: b3,
    plutusscript_new_v3: l3,
    plutusscript_new_with_version: f3,
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
    plutuswitness_datum: oR,
    plutuswitness_new: tR,
    plutuswitness_new_with_ref: rR,
    plutuswitness_new_with_ref_without_datum: nR,
    plutuswitness_new_without_datum: eR,
    plutuswitness_redeemer: iR,
    plutuswitness_script: aR,
    plutuswitnesses_add: pR,
    plutuswitnesses_get: cR,
    plutuswitnesses_len: dR,
    plutuswitnesses_new: s8,
    pointer_cert_index: dO,
    pointer_cert_index_bignum: wO,
    pointer_new: aO,
    pointer_new_pointer: oO,
    pointer_slot: iO,
    pointer_slot_bignum: cO,
    pointer_tx_index: sO,
    pointer_tx_index_bignum: pO,
    pointeraddress_from_address: hO,
    pointeraddress_network_id: yO,
    pointeraddress_new: bO,
    pointeraddress_payment_cred: lO,
    pointeraddress_stake_pointer: fO,
    pointeraddress_to_address: uO,
    poolmetadata_from_bytes: xf,
    poolmetadata_from_hex: Ff,
    poolmetadata_from_json: qf,
    poolmetadata_new: Lf,
    poolmetadata_pool_metadata_hash: $f,
    poolmetadata_to_bytes: jf,
    poolmetadata_to_hex: zf,
    poolmetadata_to_js_value: Of,
    poolmetadata_to_json: Rf,
    poolmetadata_url: mv,
    poolmetadatahash_from_bech32: MQ,
    poolmetadatahash_from_bytes: WQ,
    poolmetadatahash_from_hex: GQ,
    poolmetadatahash_to_bech32: NX,
    poolmetadatahash_to_bytes: UX,
    poolmetadatahash_to_hex: zX,
    poolparams_cost: $d,
    poolparams_from_bytes: md,
    poolparams_from_hex: jd,
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
    poolparams_to_json: xd,
    poolparams_vrf_keyhash: Od,
    poolregistration_from_bytes: Bs,
    poolregistration_from_hex: td,
    poolregistration_from_json: nd,
    poolregistration_new: od,
    poolregistration_pool_params: ad,
    poolregistration_to_bytes: Ps,
    poolregistration_to_hex: _d,
    poolregistration_to_js_value: ed,
    poolregistration_to_json: rd,
    poolretirement_epoch: h8,
    poolretirement_from_bytes: p8,
    poolretirement_from_hex: g8,
    poolretirement_from_json: f8,
    poolretirement_new: y8,
    poolretirement_pool_keyhash: u8,
    poolretirement_to_bytes: c8,
    poolretirement_to_hex: w8,
    poolretirement_to_js_value: l8,
    poolretirement_to_json: b8,
    poolvotingthresholds_committee_no_confidence: nj,
    poolvotingthresholds_committee_normal: tj,
    poolvotingthresholds_from_bytes: T0,
    poolvotingthresholds_from_hex: C0,
    poolvotingthresholds_from_json: B0,
    poolvotingthresholds_hard_fork_initiation: aj,
    poolvotingthresholds_motion_no_confidence: _j,
    poolvotingthresholds_new: _4,
    poolvotingthresholds_security_relevant_threshold: oj,
    poolvotingthresholds_to_bytes: D0,
    poolvotingthresholds_to_hex: N0,
    poolvotingthresholds_to_js_value: P0,
    poolvotingthresholds_to_json: V0,
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
    proposedprotocolparameterupdates_from_bytes: Ku,
    proposedprotocolparameterupdates_from_hex: Wu,
    proposedprotocolparameterupdates_from_json: Hu,
    proposedprotocolparameterupdates_get: Iu,
    proposedprotocolparameterupdates_insert: Au,
    proposedprotocolparameterupdates_keys: Du,
    proposedprotocolparameterupdates_len: nv,
    proposedprotocolparameterupdates_new: fv,
    proposedprotocolparameterupdates_to_bytes: Eu,
    proposedprotocolparameterupdates_to_hex: Su,
    proposedprotocolparameterupdates_to_js_value: Gu,
    proposedprotocolparameterupdates_to_json: Mu,
    protocolparamupdate_ada_per_utxo_byte: lk,
    protocolparamupdate_collateral_percentage: Rk,
    protocolparamupdate_committee_term_limit: Uk,
    protocolparamupdate_cost_models: uk,
    protocolparamupdate_d: sk,
    protocolparamupdate_drep_deposit: Gk,
    protocolparamupdate_drep_inactivity_period: Ak,
    protocolparamupdate_drep_voting_thresholds: Yk,
    protocolparamupdate_execution_costs: yk,
    protocolparamupdate_expansion_rate: ak,
    protocolparamupdate_extra_entropy: dk,
    protocolparamupdate_from_bytes: J4,
    protocolparamupdate_from_hex: Q4,
    protocolparamupdate_from_json: U4,
    protocolparamupdate_governance_action_deposit: Wk,
    protocolparamupdate_governance_action_validity_period: Kk,
    protocolparamupdate_key_deposit: N4,
    protocolparamupdate_max_block_body_size: G4,
    protocolparamupdate_max_block_ex_units: jk,
    protocolparamupdate_max_block_header_size: D4,
    protocolparamupdate_max_collateral_inputs: qk,
    protocolparamupdate_max_epoch: B4,
    protocolparamupdate_max_tx_ex_units: mk,
    protocolparamupdate_max_tx_size: A4,
    protocolparamupdate_max_value_size: zk,
    protocolparamupdate_min_committee_size: Xk,
    protocolparamupdate_min_pool_cost: gk,
    protocolparamupdate_minfee_a: K4,
    protocolparamupdate_minfee_b: W4,
    protocolparamupdate_n_opt: tk,
    protocolparamupdate_new: Tk,
    protocolparamupdate_pool_deposit: V4,
    protocolparamupdate_pool_pledge_influence: ek,
    protocolparamupdate_pool_voting_thresholds: Lk,
    protocolparamupdate_protocol_version: pk,
    protocolparamupdate_ref_script_coins_per_byte: Dk,
    protocolparamupdate_set_ada_per_utxo_byte: bk,
    protocolparamupdate_set_collateral_percentage: Fk,
    protocolparamupdate_set_committee_term_limit: Zk,
    protocolparamupdate_set_cost_models: fk,
    protocolparamupdate_set_drep_deposit: Mk,
    protocolparamupdate_set_drep_inactivity_period: Hk,
    protocolparamupdate_set_drep_voting_thresholds: Jk,
    protocolparamupdate_set_execution_costs: hk,
    protocolparamupdate_set_expansion_rate: nk,
    protocolparamupdate_set_governance_action_deposit: Sk,
    protocolparamupdate_set_governance_action_validity_period: Ek,
    protocolparamupdate_set_key_deposit: T4,
    protocolparamupdate_set_max_block_body_size: M4,
    protocolparamupdate_set_max_block_ex_units: kk,
    protocolparamupdate_set_max_block_header_size: I4,
    protocolparamupdate_set_max_collateral_inputs: Ok,
    protocolparamupdate_set_max_epoch: P4,
    protocolparamupdate_set_max_tx_ex_units: vk,
    protocolparamupdate_set_max_tx_size: H4,
    protocolparamupdate_set_max_value_size: xk,
    protocolparamupdate_set_min_committee_size: Qk,
    protocolparamupdate_set_min_pool_cost: wk,
    protocolparamupdate_set_minfee_a: E4,
    protocolparamupdate_set_minfee_b: S4,
    protocolparamupdate_set_n_opt: _k,
    protocolparamupdate_set_pool_deposit: C4,
    protocolparamupdate_set_pool_pledge_influence: rk,
    protocolparamupdate_set_pool_voting_thresholds: $k,
    protocolparamupdate_set_protocol_version: ck,
    protocolparamupdate_set_ref_script_coins_per_byte: Ik,
    protocolparamupdate_set_treasury_growth_rate: ok,
    protocolparamupdate_to_bytes: L4,
    protocolparamupdate_to_hex: Y4,
    protocolparamupdate_to_js_value: Z4,
    protocolparamupdate_to_json: X4,
    protocolparamupdate_treasury_growth_rate: ik,
    protocolversion_from_bytes: Cu,
    protocolversion_from_hex: Pu,
    protocolversion_from_json: th,
    protocolversion_major: rh,
    protocolversion_minor: eh,
    protocolversion_new: nh,
    protocolversion_to_bytes: Nu,
    protocolversion_to_hex: Vu,
    protocolversion_to_js_value: _h,
    protocolversion_to_json: Bu,
    publickey_as_bytes: $w,
    publickey_from_bech32: Jw,
    publickey_from_bytes: qw,
    publickey_from_hex: zw,
    publickey_hash: Rw,
    publickey_to_bech32: Lw,
    publickey_to_hex: Fw,
    publickey_verify: Ow,
    publickeys_add: nq,
    publickeys_get: eq,
    publickeys_new: tq,
    publickeys_size: rq,
    redeemer_data: o1,
    redeemer_ex_units: i1,
    redeemer_from_bytes: Pv,
    redeemer_from_hex: _1,
    redeemer_from_json: e1,
    redeemer_index: a1,
    redeemer_new: s1,
    redeemer_tag: n1,
    redeemer_to_bytes: Vv,
    redeemer_to_hex: Bv,
    redeemer_to_js_value: r1,
    redeemer_to_json: t1,
    redeemers_add: v1,
    redeemers_from_bytes: p1,
    redeemers_from_hex: g1,
    redeemers_from_json: f1,
    redeemers_get: y1,
    redeemers_get_container_type: m1,
    redeemers_len: h1,
    redeemers_new: u1,
    redeemers_to_bytes: c1,
    redeemers_to_hex: w1,
    redeemers_to_js_value: l1,
    redeemers_to_json: b1,
    redeemers_total_ex_units: k1,
    redeemertag_from_bytes: sg,
    redeemertag_from_hex: cg,
    redeemertag_from_json: gg,
    redeemertag_kind: vg,
    redeemertag_new_cert: fg,
    redeemertag_new_mint: lg,
    redeemertag_new_reward: ug,
    redeemertag_new_spend: bg,
    redeemertag_new_vote: hg,
    redeemertag_new_voting_proposal: yg,
    redeemertag_to_bytes: ig,
    redeemertag_to_hex: dg,
    redeemertag_to_js_value: wg,
    redeemertag_to_json: pg,
    relay_as_multi_host_name: mf,
    relay_as_single_host_addr: yf,
    relay_as_single_host_name: vf,
    relay_from_bytes: df,
    relay_from_hex: pf,
    relay_from_json: bf,
    relay_kind: hf,
    relay_new_multi_host_name: uf,
    relay_new_single_host_addr: lf,
    relay_new_single_host_name: ff,
    relay_to_bytes: sf,
    relay_to_hex: cf,
    relay_to_js_value: gf,
    relay_to_json: wf,
    relays_add: hd,
    relays_from_bytes: dd,
    relays_from_hex: pd,
    relays_from_json: bd,
    relays_get: ud,
    relays_len: fd,
    relays_new: ld,
    relays_to_bytes: sd,
    relays_to_hex: cd,
    relays_to_js_value: gd,
    relays_to_json: wd,
    rewardaddress_from_address: eO,
    rewardaddress_network_id: a8,
    rewardaddress_new: e8,
    rewardaddress_payment_cred: t8,
    rewardaddress_to_address: rO,
    rewardaddresses_add: Mf,
    rewardaddresses_from_bytes: Qf,
    rewardaddresses_from_hex: Zf,
    rewardaddresses_from_json: Kf,
    rewardaddresses_get: Wf,
    rewardaddresses_len: Sf,
    rewardaddresses_new: kv,
    rewardaddresses_to_bytes: Yf,
    rewardaddresses_to_hex: Xf,
    rewardaddresses_to_js_value: Ef,
    rewardaddresses_to_json: Uf,
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
    scriptany_from_hex: _$,
    scriptany_from_json: e$,
    scriptany_native_scripts: dL,
    scriptany_new: pL,
    scriptany_to_bytes: Vq,
    scriptany_to_hex: Bq,
    scriptany_to_js_value: r$,
    scriptany_to_json: t$,
    scriptdatahash_from_bech32: _X,
    scriptdatahash_from_bytes: BQ,
    scriptdatahash_from_hex: tX,
    scriptdatahash_to_bech32: BX,
    scriptdatahash_to_bytes: WX,
    scriptdatahash_to_hex: qX,
    scripthash_from_bech32: vQ,
    scripthash_from_bytes: yQ,
    scripthash_from_hex: mQ,
    scripthash_to_bech32: HX,
    scripthash_to_bytes: JX,
    scripthash_to_hex: vX,
    scripthashes_add: Zu,
    scripthashes_from_bytes: qu,
    scripthashes_from_hex: Lu,
    scripthashes_from_json: Qu,
    scripthashes_get: Xu,
    scripthashes_len: iv,
    scripthashes_new: jv,
    scripthashes_to_bytes: Ou,
    scripthashes_to_hex: $u,
    scripthashes_to_js_value: Yu,
    scripthashes_to_json: Ju,
    scriptnofk_from_bytes: o$,
    scriptnofk_from_hex: s$,
    scriptnofk_from_json: p$,
    scriptnofk_n: w$,
    scriptnofk_native_scripts: cL,
    scriptnofk_new: g$,
    scriptnofk_to_bytes: a$,
    scriptnofk_to_hex: i$,
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
    scriptref_is_native_script: tG,
    scriptref_is_plutus_script: rG,
    scriptref_native_script: eG,
    scriptref_new_native_script: BM,
    scriptref_new_plutus_script: _G,
    scriptref_plutus_script: nG,
    scriptref_to_bytes: IM,
    scriptref_to_hex: TM,
    scriptref_to_js_value: VM,
    scriptref_to_json: CM,
    scriptref_to_unwrapped_bytes: aG,
    singlehostaddr_from_bytes: Jl,
    singlehostaddr_from_hex: Ql,
    singlehostaddr_from_json: Ul,
    singlehostaddr_ipv4: Kl,
    singlehostaddr_ipv6: Sl,
    singlehostaddr_new: Wl,
    singlehostaddr_port: El,
    singlehostaddr_to_bytes: Ll,
    singlehostaddr_to_hex: Yl,
    singlehostaddr_to_js_value: Zl,
    singlehostaddr_to_json: Xl,
    singlehostname_dns_name: vv,
    singlehostname_from_bytes: Hl,
    singlehostname_from_hex: Il,
    singlehostname_from_json: Nl,
    singlehostname_new: Vl,
    singlehostname_port: Cl,
    singlehostname_to_bytes: Gl,
    singlehostname_to_hex: Al,
    singlehostname_to_js_value: Tl,
    singlehostname_to_json: Dl,
    stakeandvotedelegation_drep: _c,
    stakeandvotedelegation_from_bytes: Dd,
    stakeandvotedelegation_from_hex: Nd,
    stakeandvotedelegation_from_json: Pd,
    stakeandvotedelegation_has_script_credentials: Hw,
    stakeandvotedelegation_new: tc,
    stakeandvotedelegation_pool_keyhash: Bd,
    stakeandvotedelegation_stake_credential: Aw,
    stakeandvotedelegation_to_bytes: Id,
    stakeandvotedelegation_to_hex: Td,
    stakeandvotedelegation_to_js_value: Vd,
    stakeandvotedelegation_to_json: Cd,
    stakedelegation_from_bytes: k8,
    stakedelegation_from_hex: x8,
    stakedelegation_from_json: R8,
    stakedelegation_has_script_credentials: L8,
    stakedelegation_new: $8,
    stakedelegation_pool_keyhash: q8,
    stakedelegation_stake_credential: O8,
    stakedelegation_to_bytes: m8,
    stakedelegation_to_hex: j8,
    stakedelegation_to_js_value: F8,
    stakedelegation_to_json: z8,
    stakederegistration_coin: bY,
    stakederegistration_from_bytes: iY,
    stakederegistration_from_hex: dY,
    stakederegistration_from_json: wY,
    stakederegistration_has_script_credentials: uY,
    stakederegistration_new: lY,
    stakederegistration_new_with_explicit_refund: fY,
    stakederegistration_stake_credential: gY,
    stakederegistration_to_bytes: oY,
    stakederegistration_to_hex: sY,
    stakederegistration_to_js_value: pY,
    stakederegistration_to_json: cY,
    stakeregistration_coin: rg,
    stakeregistration_from_bytes: Nw,
    stakeregistration_from_hex: Vw,
    stakeregistration_from_json: _g,
    stakeregistration_has_script_credentials: ag,
    stakeregistration_new: eg,
    stakeregistration_new_with_explicit_deposit: ng,
    stakeregistration_stake_credential: tg,
    stakeregistration_to_bytes: Tw,
    stakeregistration_to_hex: Cw,
    stakeregistration_to_js_value: Bw,
    stakeregistration_to_json: Pw,
    stakeregistrationanddelegation_coin: wc,
    stakeregistrationanddelegation_from_bytes: nc,
    stakeregistrationanddelegation_from_hex: oc,
    stakeregistrationanddelegation_from_json: dc,
    stakeregistrationanddelegation_has_script_credentials: bc,
    stakeregistrationanddelegation_new: gc,
    stakeregistrationanddelegation_pool_keyhash: pc,
    stakeregistrationanddelegation_stake_credential: cc,
    stakeregistrationanddelegation_to_bytes: ec,
    stakeregistrationanddelegation_to_hex: ac,
    stakeregistrationanddelegation_to_js_value: sc,
    stakeregistrationanddelegation_to_json: ic,
    stakevoteregistrationanddelegation_coin: Ww,
    stakevoteregistrationanddelegation_drep: xc,
    stakevoteregistrationanddelegation_from_bytes: uc,
    stakevoteregistrationanddelegation_from_hex: yc,
    stakevoteregistrationanddelegation_from_json: kc,
    stakevoteregistrationanddelegation_has_script_credentials: Fc,
    stakevoteregistrationanddelegation_new: zc,
    stakevoteregistrationanddelegation_pool_keyhash: Mw,
    stakevoteregistrationanddelegation_stake_credential: jc,
    stakevoteregistrationanddelegation_to_bytes: fc,
    stakevoteregistrationanddelegation_to_hex: hc,
    stakevoteregistrationanddelegation_to_js_value: mc,
    stakevoteregistrationanddelegation_to_json: vc,
    strings_add: AW,
    strings_get: HW,
    strings_len: GW,
    strings_new: MW,
    timelockexpiry_from_bytes: j$,
    timelockexpiry_from_hex: z$,
    timelockexpiry_from_json: O$,
    timelockexpiry_new: L$,
    timelockexpiry_new_timelockexpiry: J$,
    timelockexpiry_slot: q$,
    timelockexpiry_slot_bignum: $$,
    timelockexpiry_to_bytes: k$,
    timelockexpiry_to_hex: x$,
    timelockexpiry_to_js_value: R$,
    timelockexpiry_to_json: F$,
    timelockstart_from_bytes: l$,
    timelockstart_from_hex: u$,
    timelockstart_from_json: v$,
    timelockstart_new: fL,
    timelockstart_new_timelockstart: lL,
    timelockstart_slot: iL,
    timelockstart_slot_bignum: oL,
    timelockstart_to_bytes: b$,
    timelockstart_to_hex: f$,
    timelockstart_to_js_value: y$,
    timelockstart_to_json: h$,
    transaction_auxiliary_data: nb,
    transaction_body: tb,
    transaction_from_bytes: Ng,
    transaction_from_hex: Vg,
    transaction_from_json: _b,
    transaction_is_valid: eb,
    transaction_new: ob,
    transaction_set_is_valid: ab,
    transaction_to_bytes: Tg,
    transaction_to_hex: Cg,
    transaction_to_js_value: Bg,
    transaction_to_json: Pg,
    transaction_witness_set: rb,
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
    transactionbodies_new: i8,
    transactionbodies_to_bytes: z9,
    transactionbodies_to_hex: R9,
    transactionbodies_to_js_value: $9,
    transactionbodies_to_json: q9,
    transactionbody_auxiliary_data_hash: jK,
    transactionbody_certs: uK,
    transactionbody_collateral: XK,
    transactionbody_collateral_return: WK,
    transactionbody_current_treasury_value: VK,
    transactionbody_donation: NK,
    transactionbody_fee: pK,
    transactionbody_from_bytes: eK,
    transactionbody_from_hex: aK,
    transactionbody_from_json: sK,
    transactionbody_inputs: dK,
    transactionbody_mint: qK,
    transactionbody_network_id: KK,
    transactionbody_new: PK,
    transactionbody_new_tx_body: BK,
    transactionbody_outputs: cK,
    transactionbody_reference_inputs: LK,
    transactionbody_remove_ttl: lK,
    transactionbody_required_signers: UK,
    transactionbody_script_data_hash: YK,
    transactionbody_set_auxiliary_data_hash: kK,
    transactionbody_set_certs: fK,
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
    transactionbody_set_ttl: bK,
    transactionbody_set_update: vK,
    transactionbody_set_validity_start_interval: xK,
    transactionbody_set_validity_start_interval_bignum: zK,
    transactionbody_set_voting_procedures: HK,
    transactionbody_set_voting_proposals: IK,
    transactionbody_set_withdrawals: hK,
    transactionbody_to_bytes: rK,
    transactionbody_to_hex: nK,
    transactionbody_to_js_value: iK,
    transactionbody_to_json: oK,
    transactionbody_total_collateral: GK,
    transactionbody_ttl: wK,
    transactionbody_ttl_bignum: gK,
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
    transactionbuilder_add_inputs_from: jZ,
    transactionbuilder_add_inputs_from_and_change: KZ,
    transactionbuilder_add_inputs_from_and_change_with_collateral_return: SZ,
    transactionbuilder_add_json_metadatum: gU,
    transactionbuilder_add_json_metadatum_with_schema: bU,
    transactionbuilder_add_key_input: QZ,
    transactionbuilder_add_metadatum: wU,
    transactionbuilder_add_mint_asset: kU,
    transactionbuilder_add_mint_asset_and_output: jU,
    transactionbuilder_add_mint_asset_and_output_min_required_coin: xU,
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
    transactionbuilder_get_auxiliary_data: sU,
    transactionbuilder_get_current_treasury_value: $U,
    transactionbuilder_get_deposit: EU,
    transactionbuilder_get_donation: OU,
    transactionbuilder_get_explicit_input: YU,
    transactionbuilder_get_explicit_output: UU,
    transactionbuilder_get_extra_witness_datums: FU,
    transactionbuilder_get_fee_if_set: KU,
    transactionbuilder_get_implicit_input: QU,
    transactionbuilder_get_mint: yU,
    transactionbuilder_get_mint_builder: uU,
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
    transactionbuilder_remove_certs: tU,
    transactionbuilder_remove_collateral_return: RZ,
    transactionbuilder_remove_mint_builder: fU,
    transactionbuilder_remove_script_data_hash: HU,
    transactionbuilder_remove_total_collateral: $Z,
    transactionbuilder_remove_ttl: CZ,
    transactionbuilder_remove_validity_start_interval: BZ,
    transactionbuilder_remove_withdrawals: iU,
    transactionbuilder_set_auxiliary_data: dU,
    transactionbuilder_set_certs: _U,
    transactionbuilder_set_certs_builder: rU,
    transactionbuilder_set_collateral: zZ,
    transactionbuilder_set_collateral_return: FZ,
    transactionbuilder_set_collateral_return_and_total: OZ,
    transactionbuilder_set_current_treasury_value: qU,
    transactionbuilder_set_donation: RU,
    transactionbuilder_set_fee: IZ,
    transactionbuilder_set_inputs: xZ,
    transactionbuilder_set_metadata: pU,
    transactionbuilder_set_min_fee: DZ,
    transactionbuilder_set_mint: hU,
    transactionbuilder_set_mint_asset: mU,
    transactionbuilder_set_mint_builder: lU,
    transactionbuilder_set_script_data_hash: GU,
    transactionbuilder_set_total_collateral: qZ,
    transactionbuilder_set_total_collateral_and_return: LZ,
    transactionbuilder_set_ttl: TZ,
    transactionbuilder_set_ttl_bignum: NZ,
    transactionbuilder_set_validity_start_interval: VZ,
    transactionbuilder_set_validity_start_interval_bignum: PZ,
    transactionbuilder_set_voting_builder: aU,
    transactionbuilder_set_voting_proposal_builder: oU,
    transactionbuilder_set_withdrawals: eU,
    transactionbuilder_set_withdrawals_builder: nU,
    transactionbuilderconfigbuilder_build: fZ,
    transactionbuilderconfigbuilder_coins_per_utxo_byte: oZ,
    transactionbuilderconfigbuilder_deduplicate_explicit_ref_inputs_with_regular_inputs: bZ,
    transactionbuilderconfigbuilder_do_not_burn_extra_change: lZ,
    transactionbuilderconfigbuilder_ex_unit_prices: iZ,
    transactionbuilderconfigbuilder_fee_algo: aZ,
    transactionbuilderconfigbuilder_key_deposit: dZ,
    transactionbuilderconfigbuilder_max_tx_size: pZ,
    transactionbuilderconfigbuilder_max_value_size: cZ,
    transactionbuilderconfigbuilder_new: nZ,
    transactionbuilderconfigbuilder_pool_deposit: sZ,
    transactionbuilderconfigbuilder_prefer_pure_change: gZ,
    transactionbuilderconfigbuilder_ref_script_coins_per_byte: wZ,
    transactionhash_from_bech32: $Q,
    transactionhash_from_bytes: qQ,
    transactionhash_from_hex: LQ,
    transactionhash_to_bech32: TX,
    transactionhash_to_bytes: ZX,
    transactionhash_to_hex: mX,
    transactioninput_from_bytes: y2,
    transactioninput_from_hex: m2,
    transactioninput_from_json: x2,
    transactioninput_index: eF,
    transactioninput_new: aF,
    transactioninput_to_bytes: h2,
    transactioninput_to_hex: v2,
    transactioninput_to_js_value: j2,
    transactioninput_to_json: k2,
    transactioninput_transaction_id: oF,
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
    transactionmetadatum_as_bytes: r0,
    transactionmetadatum_as_int: t0,
    transactionmetadatum_as_list: _0,
    transactionmetadatum_as_map: Bm,
    transactionmetadatum_as_text: e0,
    transactionmetadatum_from_bytes: Hm,
    transactionmetadatum_from_hex: Im,
    transactionmetadatum_kind: Pm,
    transactionmetadatum_new_bytes: Cm,
    transactionmetadatum_new_int: Nm,
    transactionmetadatum_new_list: Tm,
    transactionmetadatum_new_map: Dm,
    transactionmetadatum_new_text: Vm,
    transactionmetadatum_to_bytes: Gm,
    transactionmetadatum_to_hex: Am,
    transactionmetadatumlabels_add: p0,
    transactionmetadatumlabels_from_bytes: o0,
    transactionmetadatumlabels_from_hex: s0,
    transactionmetadatumlabels_get: c0,
    transactionmetadatumlabels_len: d0,
    transactionmetadatumlabels_new: bj,
    transactionmetadatumlabels_to_bytes: a0,
    transactionmetadatumlabels_to_hex: i0,
    transactionoutput_address: $b,
    transactionoutput_amount: Lb,
    transactionoutput_data_hash: Jb,
    transactionoutput_from_bytes: xb,
    transactionoutput_from_hex: Fb,
    transactionoutput_from_json: qb,
    transactionoutput_has_data_hash: Kb,
    transactionoutput_has_plutus_data: Eb,
    transactionoutput_has_script_ref: Sb,
    transactionoutput_new: Wb,
    transactionoutput_plutus_data: Yb,
    transactionoutput_script_ref: Qb,
    transactionoutput_serialization_format: Mb,
    transactionoutput_set_data_hash: Ub,
    transactionoutput_set_plutus_data: Zb,
    transactionoutput_set_script_ref: Xb,
    transactionoutput_to_bytes: jb,
    transactionoutput_to_hex: zb,
    transactionoutput_to_js_value: Ob,
    transactionoutput_to_json: Rb,
    transactionoutputamountbuilder_build: QR,
    transactionoutputamountbuilder_with_asset_and_min_required_coin_by_utxo_cost: YR,
    transactionoutputamountbuilder_with_coin: LR,
    transactionoutputamountbuilder_with_coin_and_asset: JR,
    transactionoutputamountbuilder_with_value: $R,
    transactionoutputbuilder_new: jR,
    transactionoutputbuilder_next: OR,
    transactionoutputbuilder_with_address: xR,
    transactionoutputbuilder_with_data_hash: zR,
    transactionoutputbuilder_with_plutus_data: FR,
    transactionoutputbuilder_with_script_ref: RR,
    transactionoutputs_add: hb,
    transactionoutputs_from_bytes: db,
    transactionoutputs_from_hex: pb,
    transactionoutputs_from_json: bb,
    transactionoutputs_get: ub,
    transactionoutputs_len: fb,
    transactionoutputs_new: lb,
    transactionoutputs_to_bytes: sb,
    transactionoutputs_to_hex: cb,
    transactionoutputs_to_js_value: gb,
    transactionoutputs_to_json: wb,
    transactionunspentoutput_from_bytes: iz,
    transactionunspentoutput_from_hex: dz,
    transactionunspentoutput_from_json: wz,
    transactionunspentoutput_input: bz,
    transactionunspentoutput_new: gz,
    transactionunspentoutput_output: lz,
    transactionunspentoutput_to_bytes: oz,
    transactionunspentoutput_to_hex: sz,
    transactionunspentoutput_to_js_value: pz,
    transactionunspentoutput_to_json: cz,
    transactionunspentoutputs_add: jz,
    transactionunspentoutputs_from_json: yz,
    transactionunspentoutputs_get: kz,
    transactionunspentoutputs_len: mz,
    transactionunspentoutputs_new: vz,
    transactionunspentoutputs_to_js_value: hz,
    transactionunspentoutputs_to_json: uz,
    transactionwitnessset_bootstraps: gS,
    transactionwitnessset_from_bytes: rS,
    transactionwitnessset_from_hex: nS,
    transactionwitnessset_from_json: iS,
    transactionwitnessset_native_scripts: pS,
    transactionwitnessset_new: vS,
    transactionwitnessset_plutus_data: uS,
    transactionwitnessset_plutus_scripts: lS,
    transactionwitnessset_redeemers: yS,
    transactionwitnessset_set_bootstraps: wS,
    transactionwitnessset_set_native_scripts: cS,
    transactionwitnessset_set_plutus_data: fS,
    transactionwitnessset_set_plutus_scripts: bS,
    transactionwitnessset_set_redeemers: hS,
    transactionwitnessset_set_vkeys: sS,
    transactionwitnessset_to_bytes: tS,
    transactionwitnessset_to_hex: eS,
    transactionwitnessset_to_js_value: oS,
    transactionwitnessset_to_json: aS,
    transactionwitnessset_vkeys: dS,
    transactionwitnesssets_add: $O,
    transactionwitnesssets_from_bytes: kO,
    transactionwitnesssets_from_hex: xO,
    transactionwitnesssets_from_json: RO,
    transactionwitnesssets_get: qO,
    transactionwitnesssets_len: OO,
    transactionwitnesssets_new: o8,
    transactionwitnesssets_to_bytes: mO,
    transactionwitnesssets_to_hex: jO,
    transactionwitnesssets_to_js_value: FO,
    transactionwitnesssets_to_json: zO,
    treasurywithdrawals_from_json: gE,
    treasurywithdrawals_get: lE,
    treasurywithdrawals_insert: fE,
    treasurywithdrawals_keys: uE,
    treasurywithdrawals_len: hE,
    treasurywithdrawals_new: bE,
    treasurywithdrawals_to_js_value: wE,
    treasurywithdrawals_to_json: pE,
    treasurywithdrawalsaction_from_bytes: wx,
    treasurywithdrawalsaction_from_hex: bx,
    treasurywithdrawalsaction_from_json: ux,
    treasurywithdrawalsaction_new: vx,
    treasurywithdrawalsaction_new_with_policy_hash: mx,
    treasurywithdrawalsaction_policy_hash: yx,
    treasurywithdrawalsaction_to_bytes: px,
    treasurywithdrawalsaction_to_hex: gx,
    treasurywithdrawalsaction_to_js_value: fx,
    treasurywithdrawalsaction_to_json: lx,
    treasurywithdrawalsaction_withdrawals: hx,
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
    unitinterval_denominator: Ag,
    unitinterval_from_bytes: Kg,
    unitinterval_from_hex: Wg,
    unitinterval_from_json: Hg,
    unitinterval_new: Ig,
    unitinterval_numerator: rv,
    unitinterval_to_bytes: Eg,
    unitinterval_to_hex: Sg,
    unitinterval_to_js_value: Gg,
    unitinterval_to_json: Mg,
    update_epoch: bu,
    update_from_bytes: iu,
    update_from_hex: du,
    update_from_json: wu,
    update_new: lu,
    update_proposed_protocol_parameter_updates: gu,
    update_to_bytes: ou,
    update_to_hex: su,
    update_to_js_value: pu,
    update_to_json: cu,
    updatecommitteeaction_committee: Lx,
    updatecommitteeaction_from_bytes: xx,
    updatecommitteeaction_from_hex: Fx,
    updatecommitteeaction_from_json: qx,
    updatecommitteeaction_gov_action_id: $x,
    updatecommitteeaction_members_to_remove: Jx,
    updatecommitteeaction_new: Yx,
    updatecommitteeaction_new_with_action_id: Qx,
    updatecommitteeaction_to_bytes: jx,
    updatecommitteeaction_to_hex: zx,
    updatecommitteeaction_to_js_value: Ox,
    updatecommitteeaction_to_json: Rx,
    url_from_bytes: cl,
    url_from_hex: wl,
    url_from_json: gl,
    url_new: bl,
    url_to_bytes: dl,
    url_to_hex: pl,
    url_to_js_value: uv,
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
    vkey_from_bytes: u6,
    vkey_from_hex: y6,
    vkey_from_json: k6,
    vkey_new: j6,
    vkey_public_key: x6,
    vkey_to_bytes: f6,
    vkey_to_hex: h6,
    vkey_to_js_value: m6,
    vkey_to_json: v6,
    vkeys_add: B7,
    vkeys_get: P7,
    vkeys_len: sL,
    vkeys_new: gL,
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
    vkeywitnesses_from_hex: ow,
    vkeywitnesses_from_json: dw,
    vkeywitnesses_get: cw,
    vkeywitnesses_len: Iw,
    vkeywitnesses_new: Uw,
    vkeywitnesses_to_bytes: ew,
    vkeywitnesses_to_hex: aw,
    vkeywitnesses_to_js_value: sw,
    vkeywitnesses_to_json: iw,
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
    voter_from_bytes: lp,
    voter_from_hex: up,
    voter_from_json: vp,
    voter_has_script_credentials: Op,
    voter_kind: xp,
    voter_new_constitutional_committee_hot_credential: mp,
    voter_new_drep_credential: kp,
    voter_new_stake_pool_key_hash: jp,
    voter_to_bytes: bp,
    voter_to_constitutional_committee_hot_credential: zp,
    voter_to_drep_credential: Fp,
    voter_to_hex: fp,
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
    voters_add: jY,
    voters_from_json: mY,
    voters_get: xY,
    voters_len: zY,
    voters_new: kY,
    voters_to_js_value: vY,
    voters_to_json: yY,
    votingbuilder_add: mF,
    votingbuilder_add_with_native_script: jF,
    votingbuilder_add_with_plutus_witness: kF,
    votingbuilder_build: OF,
    votingbuilder_get_native_scripts: FF,
    votingbuilder_get_plutus_witnesses: xF,
    votingbuilder_get_ref_inputs: zF,
    votingbuilder_has_plutus_scripts: RF,
    votingbuilder_new: vF,
    votingprocedure_anchor: nL,
    votingprocedure_from_bytes: i7,
    votingprocedure_from_hex: d7,
    votingprocedure_from_json: w7,
    votingprocedure_new: g7,
    votingprocedure_new_with_anchor: b7,
    votingprocedure_to_bytes: o7,
    votingprocedure_to_hex: s7,
    votingprocedure_to_js_value: p7,
    votingprocedure_to_json: c7,
    votingprocedure_vote_kind: l7,
    votingprocedures_from_bytes: _E,
    votingprocedures_from_hex: rE,
    votingprocedures_from_json: aE,
    votingprocedures_get: iE,
    votingprocedures_get_governance_action_ids_by_voter: dE,
    votingprocedures_get_voters: sE,
    votingprocedures_insert: oE,
    votingprocedures_new: JS,
    votingprocedures_to_bytes: BU,
    votingprocedures_to_hex: tE,
    votingprocedures_to_js_value: nE,
    votingprocedures_to_json: eE,
    votingproposal_anchor: b2,
    votingproposal_deposit: f2,
    votingproposal_from_bytes: i2,
    votingproposal_from_hex: d2,
    votingproposal_from_json: w2,
    votingproposal_governance_action: g2,
    votingproposal_new: u2,
    votingproposal_reward_account: l2,
    votingproposal_to_bytes: o2,
    votingproposal_to_hex: s2,
    votingproposal_to_js_value: p2,
    votingproposal_to_json: c2,
    votingproposalbuilder_add: $F,
    votingproposalbuilder_add_with_plutus_witness: LF,
    votingproposalbuilder_build: XF,
    votingproposalbuilder_get_plutus_witnesses: JF,
    votingproposalbuilder_get_ref_inputs: YF,
    votingproposalbuilder_has_plutus_scripts: QF,
    votingproposalbuilder_new: K3,
    votingproposals_add: a3,
    votingproposals_contains: o3,
    votingproposals_from_bytes: PF,
    votingproposals_from_hex: _3,
    votingproposals_from_json: e3,
    votingproposals_get: n3,
    votingproposals_len: E3,
    votingproposals_new: U3,
    votingproposals_to_bytes: VF,
    votingproposals_to_hex: BF,
    votingproposals_to_js_value: r3,
    votingproposals_to_json: t3,
    votingproposals_to_option: i3,
    vrfcert_from_bytes: jS,
    vrfcert_from_hex: zS,
    vrfcert_from_json: OS,
    vrfcert_new: LS,
    vrfcert_output: qS,
    vrfcert_proof: $S,
    vrfcert_to_bytes: kS,
    vrfcert_to_hex: xS,
    vrfcert_to_js_value: RS,
    vrfcert_to_json: FS,
    vrfkeyhash_from_bech32: AQ,
    vrfkeyhash_from_bytes: HQ,
    vrfkeyhash_from_hex: IQ,
    vrfkeyhash_to_bech32: AX,
    vrfkeyhash_to_bytes: YX,
    vrfkeyhash_to_hex: FX,
    vrfvkey_from_bech32: eX,
    vrfvkey_from_bytes: rX,
    vrfvkey_from_hex: nX,
    vrfvkey_to_bech32: _Z,
    vrfvkey_to_bytes: MX,
    vrfvkey_to_hex: $X,
    withdrawals_from_bytes: Af,
    withdrawals_from_hex: Df,
    withdrawals_from_json: Cf,
    withdrawals_get: Pf,
    withdrawals_insert: Vf,
    withdrawals_keys: Bf,
    withdrawals_len: ev,
    withdrawals_new: lv,
    withdrawals_to_bytes: Hf,
    withdrawals_to_hex: If,
    withdrawals_to_js_value: Nf,
    withdrawals_to_json: Tf,
    withdrawalsbuilder_add: gR,
    withdrawalsbuilder_add_with_native_script: lR,
    withdrawalsbuilder_add_with_plutus_witness: bR,
    withdrawalsbuilder_build: mR,
    withdrawalsbuilder_get_native_scripts: hR,
    withdrawalsbuilder_get_plutus_witnesses: fR,
    withdrawalsbuilder_get_ref_inputs: uR,
    withdrawalsbuilder_get_total_withdrawals: yR,
    withdrawalsbuilder_has_plutus_scripts: vR,
    withdrawalsbuilder_new: n8
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  ci(pG);
})();
export {
  $ as Address,
  VG as AddressKind,
  H as Anchor,
  gr as AnchorDataHash,
  M as AssetName,
  yt as AssetNames,
  at as Assets,
  P as AuxiliaryData,
  ar as AuxiliaryDataHash,
  Yr as AuxiliaryDataSet,
  _e as BaseAddress,
  E as BigInt,
  h as BigNum,
  h_ as Bip32PrivateKey,
  vt as Bip32PublicKey,
  mt as Block,
  oH as BlockEra,
  w_ as BlockHash,
  l_ as BootstrapWitness,
  kt as BootstrapWitnesses,
  f_ as ByronAddress,
  HG as ByronAddressType,
  MG as CborContainerType,
  _H as CborSetType,
  J as Certificate,
  WG as CertificateKind,
  E_ as Certificates,
  ne as CertificatesBuilder,
  jt as ChangeConfig,
  GG as CoinSelectionStrategyCIP2,
  ot as Committee,
  A_ as CommitteeColdResign,
  xt as CommitteeHotAuth,
  Z_ as Constitution,
  br as ConstrPlutusData,
  it as CostModel,
  m_ as Costmdls,
  nH as CredKind,
  k as Credential,
  z_ as Credentials,
  zt as DNSRecordAorAAAA,
  Ft as DNSRecordSRV,
  G as DRep,
  Rt as DRepDeregistration,
  TG as DRepKind,
  I_ as DRepRegistration,
  D_ as DRepUpdate,
  Ot as DRepVotingThresholds,
  Mr as DataCost,
  J_ as DataHash,
  Ur as DatumSource,
  O as Ed25519KeyHash,
  V as Ed25519KeyHashes,
  c_ as Ed25519Signature,
  te as EnterpriseAddress,
  F_ as ExUnitPrices,
  e_ as ExUnits,
  Er as FixedBlock,
  dr as FixedTransaction,
  xr as FixedTransactionBodies,
  Rr as FixedTransactionBody,
  pe as FixedTxWitnessesSet,
  re as FixedVersionedBlock,
  st as GeneralTransactionMetadata,
  lr as GenesisDelegateHash,
  Y_ as GenesisHash,
  pr as GenesisHashes,
  qt as GenesisKeyDelegation,
  r_ as GovernanceAction,
  Z as GovernanceActionId,
  Kr as GovernanceActionIds,
  IG as GovernanceActionKind,
  T_ as HardForkInitiationAction,
  dt as Header,
  N_ as HeaderBody,
  Gr as InfoAction,
  Q as Int,
  $t as Ipv4,
  Lt as Ipv6,
  Hr as KESSignature,
  fr as KESVKey,
  I as Language,
  CG as LanguageKind,
  Or as Languages,
  Ar as LegacyDaedalusPrivateKey,
  Ir as LinearFee,
  DG as MIRKind,
  KG as MIRPot,
  Jt as MIRToStakeCredentials,
  we as MalformedAddress,
  eH as MetadataJsonSchema,
  or as MetadataList,
  ur as MetadataMap,
  g_ as Mint,
  M_ as MintAssets,
  Dr as MintBuilder,
  qr as MintWitness,
  Sr as MintsAssets,
  C_ as MoveInstantaneousReward,
  Yt as MoveInstantaneousRewardsCert,
  T as MultiAsset,
  Qt as MultiHostName,
  S as NativeScript,
  tH as NativeScriptKind,
  G_ as NativeScriptSource,
  U as NativeScripts,
  V_ as NetworkId,
  UG as NetworkIdKind,
  wr as NetworkInfo,
  P_ as NewConstitutionAction,
  B_ as NoConfidenceAction,
  ht as Nonce,
  ct as OperationalCert,
  $r as OutputDatum,
  y_ as ParameterChangeAction,
  R as PlutusData,
  EG as PlutusDataKind,
  rH as PlutusDatumSchema,
  i_ as PlutusList,
  hr as PlutusMap,
  Lr as PlutusMapValues,
  W as PlutusScript,
  vr as PlutusScriptSource,
  K_ as PlutusScripts,
  B as PlutusWitness,
  H_ as PlutusWitnesses,
  Jr as Pointer,
  ee as PointerAddress,
  Xt as PoolMetadata,
  yr as PoolMetadataHash,
  Zt as PoolParams,
  Ut as PoolRegistration,
  Et as PoolRetirement,
  Kt as PoolVotingThresholds,
  v_ as PrivateKey,
  St as ProposedProtocolParameterUpdates,
  n_ as ProtocolParamUpdate,
  a_ as ProtocolVersion,
  Q_ as PublicKey,
  sH as PublicKeys,
  o_ as Redeemer,
  d_ as RedeemerTag,
  AG as RedeemerTagKind,
  S_ as Redeemers,
  X_ as Relay,
  PG as RelayKind,
  Wt as Relays,
  D as RewardAddress,
  Mt as RewardAddresses,
  Gt as ScriptAll,
  Ht as ScriptAny,
  lt as ScriptDataHash,
  Y as ScriptHash,
  aH as ScriptHashNamespace,
  At as ScriptHashes,
  It as ScriptNOfK,
  Dt as ScriptPubkey,
  k_ as ScriptRef,
  iH as ScriptSchema,
  Tt as SingleHostAddr,
  Nt as SingleHostName,
  Ct as StakeAndVoteDelegation,
  Vt as StakeDelegation,
  j_ as StakeDeregistration,
  x_ as StakeRegistration,
  Pt as StakeRegistrationAndDelegation,
  Bt as StakeVoteRegistrationAndDelegation,
  ge as Strings,
  _t as TimelockExpiry,
  tt as TimelockStart,
  R_ as Transaction,
  fe as TransactionBatch,
  ue as TransactionBatchList,
  _r as TransactionBodies,
  C as TransactionBody,
  be as TransactionBuilder,
  Nr as TransactionBuilderConfig,
  t_ as TransactionBuilderConfigBuilder,
  s_ as TransactionHash,
  X as TransactionInput,
  K as TransactionInputs,
  L as TransactionMetadatum,
  NG as TransactionMetadatumKind,
  zr as TransactionMetadatumLabels,
  A as TransactionOutput,
  pt as TransactionOutputAmountBuilder,
  cr as TransactionOutputBuilder,
  wt as TransactionOutputs,
  SG as TransactionSetsState,
  O_ as TransactionUnspentOutput,
  sr as TransactionUnspentOutputs,
  u_ as TransactionWitnessSet,
  gt as TransactionWitnessSets,
  mr as TreasuryWithdrawals,
  rt as TreasuryWithdrawalsAction,
  Tr as TxInputsBuilder,
  ae as URL,
  m as UnitInterval,
  tr as Update,
  et as UpdateCommitteeAction,
  q_ as VRFCert,
  ft as VRFKeyHash,
  ir as VRFVKey,
  F as Value,
  jr as VersionedBlock,
  __ as Vkey,
  le as Vkeys,
  $_ as Vkeywitness,
  rr as Vkeywitnesses,
  er as VoteDelegation,
  BG as VoteKind,
  nr as VoteRegistrationAndDelegation,
  N as Voter,
  ZG as VoterKind,
  Wr as Voters,
  oe as VotingBuilder,
  b_ as VotingProcedure,
  bt as VotingProcedures,
  L_ as VotingProposal,
  ie as VotingProposalBuilder,
  U_ as VotingProposals,
  W_ as Withdrawals,
  se as WithdrawalsBuilder,
  __tla,
  xi as __wbg_String_91fba7ded13ba54c,
  Ni as __wbg_buffer_12d079cc21e14bdb,
  Ki as __wbg_call_27c0f87801dedf93,
  Di as __wbg_call_b3ca7c6051f9bec1,
  rs as __wbg_call_eae29933372a39be,
  Fi as __wbg_crypto_1d1f22824a6a080c,
  os as __wbg_crypto_e95a6e54c5c2e37f,
  ds as __wbg_getRandomValues_02639197c8166a96,
  Qi as __wbg_getRandomValues_3aa56aa6edec874c,
  is as __wbg_getRandomValues_dc67302a7bd1aec5,
  Gi as __wbg_globalThis_d1e6af4856ba331b,
  Hi as __wbg_global_207b558942527489,
  Ji as __wbg_msCrypto_eb05e62b530a1508,
  Xi as __wbg_new_16b304a2cfa7ff4a,
  Vi as __wbg_new_63b92bc8671ed464,
  Si as __wbg_new_72fb9a18b5ae2624,
  ts as __wbg_new_d87f272aec784ec0,
  Ei as __wbg_new_d9bc3a0147634640,
  Ui as __wbg_newnoargs_e258087cd0daa0ea,
  Ci as __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb,
  Bi as __wbg_newwithlength_e9b4878cebadb3d3,
  qi as __wbg_node_104a2ff8d6ea03a2,
  Ri as __wbg_process_4a72847cc503995b,
  Yi as __wbg_randomFillSync_5c9c955aa56b6049,
  ss as __wbg_randomFillSync_dd2297de5917c74e,
  as as __wbg_require_0993fe224bf8e202,
  Li as __wbg_require_cca90b1a94a0255b,
  Wi as __wbg_self_ce0dbfc45cf2f5be,
  ns as __wbg_self_e0b3266d2d9eba1a,
  zi as __wbg_set_20cbc34131e76824,
  Ti as __wbg_set_8417257aaedc936b,
  Pi as __wbg_set_a47bac70306a19a7,
  Ii as __wbg_set_d4638f722068f043,
  ci as __wbg_set_wasm,
  _s as __wbg_subarray_a1f73cd4b5b42fe1,
  Oi as __wbg_versions_f686565e586dd935,
  Mi as __wbg_window_c6fb939a7f436783,
  cs as __wbindgen_debug_string,
  mi as __wbindgen_error_new,
  Zi as __wbindgen_is_function,
  ji as __wbindgen_is_object,
  $i as __wbindgen_is_string,
  Ai as __wbindgen_is_undefined,
  es as __wbindgen_jsval_eq,
  ws as __wbindgen_memory,
  ui as __wbindgen_number_new,
  ki as __wbindgen_object_clone_ref,
  hi as __wbindgen_object_drop_ref,
  vi as __wbindgen_string_get,
  yi as __wbindgen_string_new,
  ps as __wbindgen_throw,
  gG as calculate_ex_units_ceil_cost,
  XG as create_send_all,
  yG as decode_arbitrary_bytes_from_metadatum,
  mG as decode_metadatum_to_json_str,
  uG as decode_plutus_datum_to_json_str,
  QG as decrypt_with_password,
  hG as encode_arbitrary_bytes_as_metadatum,
  vG as encode_json_str_to_metadatum,
  LG as encode_json_str_to_native_script,
  fG as encode_json_str_to_plutus_datum,
  YG as encrypt_with_password,
  qG as get_deposit,
  OG as get_implicit_input,
  JG as has_transaction_set_tag,
  zG as hash_auxiliary_data,
  FG as hash_plutus_data,
  RG as hash_script_data,
  kG as make_daedalus_bootstrap_witness,
  jG as make_icarus_bootstrap_witness,
  xG as make_vkey_witness,
  $G as min_ada_for_output,
  wG as min_fee,
  lG as min_ref_script_fee,
  bG as min_script_fee
};
