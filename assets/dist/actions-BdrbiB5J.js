import { c as s, h as u, d as w, b as _, r as y } from "./util-D4PRAAo2.js";
const o = async (a) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_protocol_parameters", query_network: a }) }).then((e) => e.json()), h = async (a, e) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_account_details", query_network: a, reward_address: e }) }).then((t) => t.json()), d = async (a, e, t) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_wallet_transaction", query_network: a, transaction_action: e, transaction_hash: t }) }).then((n) => n.json()), S = Object.freeze(Object.defineProperty({ __proto__: null, getAccount: h, getProtocol: o, saveWalletTx: d }, Symbol.toStringTag, { value: "Module" })), g = async (a) => {
  let e;
  try {
    e = await u();
  } catch (n) {
    return { success: false, data: n };
  }
  const t = await e.getNetwork();
  try {
    const n = await o(t);
    if (!n.success) return n;
    const r = n.data, c = await e.getRewardAddress(), i = await h(t, c);
    if (!i.success) return i;
    const l = i.data;
    return { success: true, data: { network: t, transaction: await e.delegateTo(a, r, l) } };
  } catch (n) {
    return { success: false, data: n };
  }
}, p = async (a) => {
  let e;
  try {
    e = await u();
  } catch (n) {
    return { success: false, data: n };
  }
  const t = await e.getNetwork();
  try {
    const n = await o(t);
    if (!n.success) return n;
    const r = n.data;
    return { success: true, data: { network: t, transaction: await e.multiSend(a, r) } };
  } catch (n) {
    return { success: false, data: n };
  }
}, m = async (a, e) => {
  let t;
  try {
    t = await u();
  } catch (r) {
    return { success: false, data: r };
  }
  const n = await t.getNetwork();
  try {
    const r = await o(n);
    if (!r.success) return r;
    const c = r.data;
    return { success: true, data: { network: n, transaction: await t.payTo(a, e, c) } };
  } catch (r) {
    return { success: false, data: r };
  }
}, j = async (a) => {
  const e = await a.getNetwork(), t = await a.getChangeAddress(), n = await a.getRewardAddress(), r = await a.signData(w.dataMessage);
  return await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_reconnect_account", data_signature: JSON.stringify(r), stake_address: n, wallet_address: t, query_network: e }) }).then((c) => c.json());
}, k = async (a) => {
  const e = await a.getNetwork(), t = await a.getChangeAddress(), n = await a.getRewardAddress(), r = await a.signData(w.dataMessage);
  return _({ id: "loginVerify", type: "info", text: w.verifying }), await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_user_account", data_signature: JSON.stringify(r), stake_address: n, wallet_address: t, query_network: e }) }).then((c) => (y("loginVerify"), c.json()));
}, U = async (a, e) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_user_change", query_network: a, wallet_address: e }) }).then((t) => t.json()), b = async () => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_sync_assets" }) }).then((a) => a.json()), O = async (a) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_save_handle", ada_handle: a }) }).then((e) => e.json()), R = async () => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_payment_address" }) }).then((a) => a.json()), T = async (a, e) => {
  const t = await m(e, a);
  return t.success ? await d(t.data.network, "payment", t.data.transaction) : t;
}, f = async () => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_delegation_data" }) }).then((a) => a.json()), x = async () => {
  const a = await f();
  if (!a.success) return a;
  const e = a.data, t = await g(e);
  return t.success ? await d(t.data.network, "delegation", t.data.transaction) : t;
}, A = async (a) => {
  const e = await p(a);
  return e.success ? await d(e.data.network, "payment", e.data.transaction) : e;
};
export {
  S as a,
  A as b,
  T as c,
  g as d,
  j as e,
  O as f,
  R as g,
  x as h,
  b as i,
  U as j,
  k as l,
  p as m,
  m as p
};
