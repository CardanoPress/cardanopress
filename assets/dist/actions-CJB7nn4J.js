import { e as s, g as w, a as h, r as _ } from "./util-CjQW_pXR.js";
const o = async (a) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_protocol_parameters", query_network: a }) }).then((e) => e.json()), u = async (a, e) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_account_details", query_network: a, reward_address: e }) }).then((t) => t.json()), d = async (a, e, t) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_wallet_transaction", query_network: a, transaction_action: e, transaction_hash: t }) }).then((n) => n.json()), P = Object.freeze(Object.defineProperty({ __proto__: null, getAccount: u, getProtocol: o, saveWalletTx: d }, Symbol.toStringTag, { value: "Module" })), y = async (a) => {
  let e;
  try {
    e = await w();
  } catch (n) {
    return { success: false, data: n };
  }
  const t = await e.getNetwork();
  try {
    const n = await o(t);
    if (!n.success) return n;
    const r = n.data, c = await e.getRewardAddress(), i = await u(t, c);
    if (!i.success) return i;
    const l = i.data;
    return { success: true, data: { network: t, transaction: await e.delegateTo(a, r, l) } };
  } catch (n) {
    return { success: false, data: n };
  }
}, g = async (a) => {
  let e;
  try {
    e = await w();
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
}, p = async (a, e) => {
  let t;
  try {
    t = await w();
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
}, S = async (a) => {
  const e = await a.getNetwork(), t = await a.getChangeAddress(), n = await a.getRewardAddress(), r = await a.signData(cardanoPressMessages.dataMessage);
  return await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_reconnect_account", data_signature: JSON.stringify(r), stake_address: n, wallet_address: t, query_network: e }) }).then((c) => c.json());
}, j = async (a) => {
  const e = await a.getNetwork(), t = await a.getChangeAddress(), n = await a.getRewardAddress(), r = await a.signData(cardanoPressMessages.dataMessage);
  return h({ id: "loginVerify", type: "info", text: cardanoPressMessages.verifying }), await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_user_account", data_signature: JSON.stringify(r), stake_address: n, wallet_address: t, query_network: e }) }).then((c) => (_("loginVerify"), c.json()));
}, k = async (a, e) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_user_change", query_network: a, wallet_address: e }) }).then((t) => t.json()), U = async () => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_sync_assets" }) }).then((a) => a.json()), O = async (a) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_save_handle", ada_handle: a }) }).then((e) => e.json()), b = async () => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_payment_address" }) }).then((a) => a.json()), R = async (a, e) => {
  const t = await p(e, a);
  return t.success ? await d(t.data.network, "payment", t.data.transaction) : t;
}, m = async () => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_delegation_data" }) }).then((a) => a.json()), T = async () => {
  const a = await m();
  if (!a.success) return a;
  const e = a.data, t = await y(e);
  return t.success ? await d(t.data.network, "delegation", t.data.transaction) : t;
}, x = async (a) => {
  const e = await g(a);
  return e.success ? await d(e.data.network, "payment", e.data.transaction) : e;
};
export {
  U as a,
  S as b,
  j as c,
  y as d,
  P as e,
  T as f,
  b as g,
  O as h,
  R as i,
  x as j,
  k as l,
  g as m,
  p
};
