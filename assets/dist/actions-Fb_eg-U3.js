import { c as s, h as w, b as _, d as y, r as g } from "./util-D4PRAAo2.js";
const d = async (a) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_protocol_parameters", query_network: a }) }).then((e) => e.json()), u = async (a, e) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_account_details", query_network: a, reward_address: e }) }).then((t) => t.json()), i = async (a, e, t) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_wallet_transaction", query_network: a, transaction_action: e, transaction_hash: t }) }).then((n) => n.json()), j = Object.freeze(Object.defineProperty({ __proto__: null, getAccount: u, getProtocol: d, saveWalletTx: i }, Symbol.toStringTag, { value: "Module" })), p = async (a) => {
  let e;
  try {
    e = await w();
  } catch (n) {
    return { success: false, data: n };
  }
  const t = await e.getNetwork();
  try {
    const n = await d(t);
    if (!n.success) return n;
    const r = n.data, c = await e.getRewardAddress(), o = await u(t, c);
    if (!o.success) return o;
    const h = o.data;
    return { success: true, data: { network: t, transaction: await e.delegateTo(a, r, h) } };
  } catch (n) {
    return { success: false, data: n };
  }
}, m = async (a) => {
  let e;
  try {
    e = await w();
  } catch (n) {
    return { success: false, data: n };
  }
  const t = await e.getNetwork();
  try {
    const n = await d(t);
    if (!n.success) return n;
    const r = n.data;
    return { success: true, data: { network: t, transaction: await e.multiSend(a, r) } };
  } catch (n) {
    return { success: false, data: n };
  }
}, f = async (a, e) => {
  let t;
  try {
    t = await w();
  } catch (r) {
    return { success: false, data: r };
  }
  const n = await t.getNetwork();
  try {
    const r = await d(n);
    if (!r.success) return r;
    const c = r.data;
    return { success: true, data: { network: n, transaction: await t.payTo(a, e, c) } };
  } catch (r) {
    return { success: false, data: r };
  }
}, k = async (a) => {
  const e = await a.getNetwork(), t = await a.getChangeAddress(), n = await a.getRewardAddress(), r = await l();
  if (!r.success) return r;
  const c = await a.signData(r.data.message);
  return await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_reconnect_account", data_signature: JSON.stringify(c), login_nonce: r.data.nonce, stake_address: n, wallet_address: t, query_network: e }) }).then((o) => o.json());
}, U = async (a) => {
  const e = await a.getNetwork(), t = await a.getChangeAddress(), n = await a.getRewardAddress(), r = await l();
  if (!r.success) return r;
  const c = await a.signData(r.data.message);
  return _({ id: "loginVerify", type: "info", text: y.verifying }), await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_user_account", data_signature: JSON.stringify(c), login_nonce: r.data.nonce, stake_address: n, wallet_address: t, query_network: e }) }).then((o) => (g("loginVerify"), o.json()));
}, l = async () => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_login_challenge" }) }).then((a) => a.json()), b = async (a, e) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_user_change", query_network: a, wallet_address: e }) }).then((t) => t.json()), O = async () => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_sync_assets" }) }).then((a) => a.json()), R = async (a) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_save_handle", ada_handle: a }) }).then((e) => e.json()), T = async (a = "") => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_payment_address", recaptcha_token: a }) }).then((e) => e.json()), x = async (a, e) => {
  const t = await f(e, a);
  return t.success ? await i(t.data.network, "payment", t.data.transaction) : t;
}, P = async () => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_delegation_data" }) }).then((a) => a.json()), A = async () => {
  const a = await P();
  if (!a.success) return a;
  const e = a.data, t = await p(e);
  return t.success ? await i(t.data.network, "delegation", t.data.transaction) : t;
}, L = async (a) => {
  const e = await m(a);
  return e.success ? await i(e.data.network, "payment", e.data.transaction) : e;
};
export {
  j as a,
  L as b,
  x as c,
  p as d,
  k as e,
  R as f,
  T as g,
  A as h,
  O as i,
  b as j,
  U as l,
  m,
  f as p
};
