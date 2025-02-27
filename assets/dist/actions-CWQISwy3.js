import { e as s, g as w, a as h, r as y } from "./util-DkhQt4IU.js";
const c = async (a) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_protocol_parameters", query_network: a }) }).then((e) => e.json()), u = async (a, e) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_account_details", query_network: a, reward_address: e }) }).then((t) => t.json()), d = async (a, e, t) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_wallet_transaction", query_network: a, transaction_action: e, transaction_hash: t }) }).then((n) => n.json()), P = Object.freeze(Object.defineProperty({ __proto__: null, getAccount: u, getProtocol: c, saveWalletTx: d }, Symbol.toStringTag, { value: "Module" })), _ = async (a) => {
  let e;
  try {
    e = await w();
  } catch (n) {
    return { success: false, data: n };
  }
  const t = await e.getNetwork();
  try {
    let n = null, r = null;
    if (e.type !== "Typhon") {
      const o = await c(t);
      if (!o.success) return o;
      n = o.data;
      const l = await e.getRewardAddress(), i = await u(t, l);
      if (!i.success) return i;
      r = i.data;
    }
    return { success: true, data: { network: t, transaction: await e.delegateTo(a, n, r) } };
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
    let n = null;
    if (e.type !== "Typhon") {
      const r = await c(t);
      if (!r.success) return r;
      n = r.data;
    }
    return { success: true, data: { network: t, transaction: await e.multiSend(a, n) } };
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
    let r = null;
    if (t.type !== "Typhon") {
      const o = await c(n);
      if (!o.success) return o;
      r = o.data;
    }
    return { success: true, data: { network: n, transaction: await t.payTo(a, e, r) } };
  } catch (r) {
    return { success: false, data: r };
  }
}, S = async (a) => {
  const e = await a.getNetwork(), t = await a.getChangeAddress(), n = await a.getRewardAddress(), r = await a.signData(cardanoPressMessages.dataMessage);
  return await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_reconnect_account", data_signature: JSON.stringify(r), stake_address: n, wallet_address: t, query_network: e }) }).then((o) => o.json());
}, j = async (a) => {
  const e = await a.getNetwork(), t = await a.getChangeAddress(), n = await a.getRewardAddress(), r = await a.signData(cardanoPressMessages.dataMessage);
  return h({ id: "loginVerify", type: "info", text: cardanoPressMessages.verifying }), await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_user_account", data_signature: JSON.stringify(r), stake_address: n, wallet_address: t, query_network: e }) }).then((o) => (y("loginVerify"), o.json()));
}, k = async (a, e) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_user_change", query_network: a, wallet_address: e }) }).then((t) => t.json()), U = async () => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_sync_assets" }) }).then((a) => a.json()), T = async (a) => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_save_handle", ada_handle: a }) }).then((e) => e.json()), O = async () => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_payment_address" }) }).then((a) => a.json()), b = async (a, e) => {
  const t = await p(e, a);
  return t.success ? await d(t.data.network, "payment", t.data.transaction) : t;
}, f = async () => await fetch(s.ajaxUrl, { method: "POST", body: new URLSearchParams({ _wpnonce: s._nonce, action: "cardanopress_delegation_data" }) }).then((a) => a.json()), R = async () => {
  const a = await f();
  if (!a.success) return a;
  const e = a.data, t = await _(e);
  return t.success ? await d(t.data.network, "delegation", t.data.transaction) : t;
}, x = async (a) => {
  const e = await g(a);
  return e.success ? await d(e.data.network, "payment", e.data.transaction) : e;
};
export {
  U as a,
  S as b,
  j as c,
  _ as d,
  P as e,
  R as f,
  O as g,
  T as h,
  b as i,
  x as j,
  k as l,
  g as m,
  p
};
