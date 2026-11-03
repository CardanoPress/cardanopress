import { c as r, h as w, b as y, d as g, r as p } from "./util-BoaWaB64.js";
const d = async (a) => await fetch(r.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: r._nonce, action: "cardanopress_protocol_parameters", query_network: a }) }).then((e) => e.json()), u = async (a, e) => await fetch(r.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: r._nonce, action: "cardanopress_account_details", query_network: a, reward_address: e }) }).then((t) => t.json()), i = async (a, e, t) => await fetch(r.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: r._nonce, action: "cardanopress_wallet_transaction", query_network: a, transaction_action: e, transaction_hash: t }) }).then((n) => n.json()), k = Object.freeze(Object.defineProperty({ __proto__: null, getAccount: u, getProtocol: d, saveWalletTx: i }, Symbol.toStringTag, { value: "Module" })), m = async (a) => {
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
    const s = n.data, c = await e.getRewardAddress(), o = await u(t, c);
    if (!o.success) return o;
    const _ = o.data;
    return { success: true, data: { network: t, transaction: await e.delegateTo(a, s, _) } };
  } catch (n) {
    return { success: false, data: n };
  }
}, f = async (a) => {
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
    const s = n.data;
    return { success: true, data: { network: t, transaction: await e.multiSend(a, s) } };
  } catch (n) {
    return { success: false, data: n };
  }
}, S = async (a, e) => {
  let t;
  try {
    t = await w();
  } catch (s) {
    return { success: false, data: s };
  }
  const n = await t.getNetwork();
  try {
    const s = await d(n);
    if (!s.success) return s;
    const c = s.data;
    return { success: true, data: { network: n, transaction: await t.payTo(a, e, c) } };
  } catch (s) {
    return { success: false, data: s };
  }
}, l = async (a, e) => {
  const [t] = await a.cardano.getRewardAddresses(), n = Array.from(new TextEncoder().encode(e), (s) => s.toString(16).padStart(2, "0")).join("");
  return a.cardano.signData(t, n);
}, U = async (a) => {
  const e = await a.getNetwork(), t = await a.getChangeAddress(), n = await a.getRewardAddress(), s = await h();
  if (!s.success) return s;
  const c = await l(a, s.data.message);
  return await fetch(r.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: r._nonce, action: "cardanopress_reconnect_account", data_signature: JSON.stringify(c), login_nonce: s.data.nonce, stake_address: n, wallet_address: t, query_network: e }) }).then((o) => o.json());
}, b = async (a) => {
  const e = await a.getNetwork(), t = await a.getChangeAddress(), n = await a.getRewardAddress(), s = await h();
  if (!s.success) return s;
  const c = await l(a, s.data.message);
  return y({ id: "loginVerify", type: "info", text: g.verifying }), await fetch(r.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: r._nonce, action: "cardanopress_user_account", data_signature: JSON.stringify(c), login_nonce: s.data.nonce, stake_address: n, wallet_address: t, query_network: e }) }).then((o) => (p("loginVerify"), o.json()));
}, h = async () => await fetch(r.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: r._nonce, action: "cardanopress_login_challenge" }) }).then((a) => a.json()), A = async (a, e) => await fetch(r.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: r._nonce, action: "cardanopress_user_change", query_network: a, wallet_address: e }) }).then((t) => t.json()), O = async () => await fetch(r.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: r._nonce, action: "cardanopress_sync_assets" }) }).then((a) => a.json()), R = async (a) => await fetch(r.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: r._nonce, action: "cardanopress_save_handle", ada_handle: a }) }).then((e) => e.json()), T = async (a = "") => await fetch(r.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: r._nonce, action: "cardanopress_payment_address", recaptcha_token: a }) }).then((e) => e.json()), x = async (a, e) => {
  const t = await S(e, a);
  return t.success ? await i(t.data.network, "payment", t.data.transaction) : t;
}, P = async () => await fetch(r.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: r._nonce, action: "cardanopress_delegation_data" }) }).then((a) => a.json()), L = async () => {
  const a = await P();
  if (!a.success) return a;
  const e = a.data, t = await m(e);
  return t.success ? await i(t.data.network, "delegation", t.data.transaction) : t;
}, N = async (a) => {
  const e = await f(a);
  return e.success ? await i(e.data.network, "payment", e.data.transaction) : e;
};
export {
  k as a,
  N as b,
  x as c,
  m as d,
  U as e,
  R as f,
  T as g,
  L as h,
  O as i,
  A as j,
  b as l,
  f as m,
  S as p
};
