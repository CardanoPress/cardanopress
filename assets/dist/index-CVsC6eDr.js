function Tr(y, c) {
  for (var F = 0; F < c.length; F++) {
    const m = c[F];
    if (typeof m != "string" && !Array.isArray(m)) {
      for (const a in m) if (a !== "default" && !(a in y)) {
        const E = Object.getOwnPropertyDescriptor(m, a);
        E && Object.defineProperty(y, a, E.get ? E : { enumerable: true, get: () => m[a] });
      }
    }
  }
  return Object.freeze(Object.defineProperty(y, Symbol.toStringTag, { value: "Module" }));
}
var V = {}, j = {}, ur;
function Cr() {
  if (ur) return j;
  ur = 1, j.byteLength = u, j.toByteArray = N, j.fromByteArray = M;
  for (var y = [], c = [], F = typeof Uint8Array < "u" ? Uint8Array : Array, m = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, E = m.length; a < E; ++a) y[a] = m[a], c[m.charCodeAt(a)] = a;
  c[45] = 62, c[95] = 63;
  function p(f) {
    var l = f.length;
    if (l % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var w = f.indexOf("=");
    w === -1 && (w = l);
    var C = w === l ? 0 : 4 - w % 4;
    return [w, C];
  }
  function u(f) {
    var l = p(f), w = l[0], C = l[1];
    return (w + C) * 3 / 4 - C;
  }
  function L(f, l, w) {
    return (l + w) * 3 / 4 - w;
  }
  function N(f) {
    var l, w = p(f), C = w[0], _ = w[1], R = new F(L(f, C, _)), S = 0, P = _ > 0 ? C - 4 : C, I;
    for (I = 0; I < P; I += 4) l = c[f.charCodeAt(I)] << 18 | c[f.charCodeAt(I + 1)] << 12 | c[f.charCodeAt(I + 2)] << 6 | c[f.charCodeAt(I + 3)], R[S++] = l >> 16 & 255, R[S++] = l >> 8 & 255, R[S++] = l & 255;
    return _ === 2 && (l = c[f.charCodeAt(I)] << 2 | c[f.charCodeAt(I + 1)] >> 4, R[S++] = l & 255), _ === 1 && (l = c[f.charCodeAt(I)] << 10 | c[f.charCodeAt(I + 1)] << 4 | c[f.charCodeAt(I + 2)] >> 2, R[S++] = l >> 8 & 255, R[S++] = l & 255), R;
  }
  function A(f) {
    return y[f >> 18 & 63] + y[f >> 12 & 63] + y[f >> 6 & 63] + y[f & 63];
  }
  function U(f, l, w) {
    for (var C, _ = [], R = l; R < w; R += 3) C = (f[R] << 16 & 16711680) + (f[R + 1] << 8 & 65280) + (f[R + 2] & 255), _.push(A(C));
    return _.join("");
  }
  function M(f) {
    for (var l, w = f.length, C = w % 3, _ = [], R = 16383, S = 0, P = w - C; S < P; S += R) _.push(U(f, S, S + R > P ? P : S + R));
    return C === 1 ? (l = f[w - 1], _.push(y[l >> 2] + y[l << 4 & 63] + "==")) : C === 2 && (l = (f[w - 2] << 8) + f[w - 1], _.push(y[l >> 10] + y[l >> 4 & 63] + y[l << 2 & 63] + "=")), _.join("");
  }
  return j;
}
var Y = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var hr;
function _r() {
  return hr || (hr = 1, Y.read = function(y, c, F, m, a) {
    var E, p, u = a * 8 - m - 1, L = (1 << u) - 1, N = L >> 1, A = -7, U = F ? a - 1 : 0, M = F ? -1 : 1, f = y[c + U];
    for (U += M, E = f & (1 << -A) - 1, f >>= -A, A += u; A > 0; E = E * 256 + y[c + U], U += M, A -= 8) ;
    for (p = E & (1 << -A) - 1, E >>= -A, A += m; A > 0; p = p * 256 + y[c + U], U += M, A -= 8) ;
    if (E === 0) E = 1 - N;
    else {
      if (E === L) return p ? NaN : (f ? -1 : 1) * (1 / 0);
      p = p + Math.pow(2, m), E = E - N;
    }
    return (f ? -1 : 1) * p * Math.pow(2, E - m);
  }, Y.write = function(y, c, F, m, a, E) {
    var p, u, L, N = E * 8 - a - 1, A = (1 << N) - 1, U = A >> 1, M = a === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, f = m ? 0 : E - 1, l = m ? 1 : -1, w = c < 0 || c === 0 && 1 / c < 0 ? 1 : 0;
    for (c = Math.abs(c), isNaN(c) || c === 1 / 0 ? (u = isNaN(c) ? 1 : 0, p = A) : (p = Math.floor(Math.log(c) / Math.LN2), c * (L = Math.pow(2, -p)) < 1 && (p--, L *= 2), p + U >= 1 ? c += M / L : c += M * Math.pow(2, 1 - U), c * L >= 2 && (p++, L /= 2), p + U >= A ? (u = 0, p = A) : p + U >= 1 ? (u = (c * L - 1) * Math.pow(2, a), p = p + U) : (u = c * Math.pow(2, U - 1) * Math.pow(2, a), p = 0)); a >= 8; y[F + f] = u & 255, f += l, u /= 256, a -= 8) ;
    for (p = p << a | u, N += a; N > 0; y[F + f] = p & 255, f += l, p /= 256, N -= 8) ;
    y[F + f - l] |= w * 128;
  }), Y;
}
/*!
* The buffer module from node.js, for the browser.
*
* @author   Feross Aboukhadijeh <https://feross.org>
* @license  MIT
*/
var fr;
function Sr() {
  return fr || (fr = 1, function(y) {
    const c = Cr(), F = _r(), m = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    y.Buffer = u, y.SlowBuffer = R, y.INSPECT_MAX_BYTES = 50;
    const a = 2147483647;
    y.kMaxLength = a, u.TYPED_ARRAY_SUPPORT = E(), !u.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
    function E() {
      try {
        const i = new Uint8Array(1), r = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(r, Uint8Array.prototype), Object.setPrototypeOf(i, r), i.foo() === 42;
      } catch {
        return false;
      }
    }
    Object.defineProperty(u.prototype, "parent", { enumerable: true, get: function() {
      if (u.isBuffer(this)) return this.buffer;
    } }), Object.defineProperty(u.prototype, "offset", { enumerable: true, get: function() {
      if (u.isBuffer(this)) return this.byteOffset;
    } });
    function p(i) {
      if (i > a) throw new RangeError('The value "' + i + '" is invalid for option "size"');
      const r = new Uint8Array(i);
      return Object.setPrototypeOf(r, u.prototype), r;
    }
    function u(i, r, t) {
      if (typeof i == "number") {
        if (typeof r == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
        return U(i);
      }
      return L(i, r, t);
    }
    u.poolSize = 8192;
    function L(i, r, t) {
      if (typeof i == "string") return M(i, r);
      if (ArrayBuffer.isView(i)) return l(i);
      if (i == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof i);
      if (k(i, ArrayBuffer) || i && k(i.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (k(i, SharedArrayBuffer) || i && k(i.buffer, SharedArrayBuffer))) return w(i, r, t);
      if (typeof i == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
      const e = i.valueOf && i.valueOf();
      if (e != null && e !== i) return u.from(e, r, t);
      const n = C(i);
      if (n) return n;
      if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof i[Symbol.toPrimitive] == "function") return u.from(i[Symbol.toPrimitive]("string"), r, t);
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof i);
    }
    u.from = function(i, r, t) {
      return L(i, r, t);
    }, Object.setPrototypeOf(u.prototype, Uint8Array.prototype), Object.setPrototypeOf(u, Uint8Array);
    function N(i) {
      if (typeof i != "number") throw new TypeError('"size" argument must be of type number');
      if (i < 0) throw new RangeError('The value "' + i + '" is invalid for option "size"');
    }
    function A(i, r, t) {
      return N(i), i <= 0 ? p(i) : r !== void 0 ? typeof t == "string" ? p(i).fill(r, t) : p(i).fill(r) : p(i);
    }
    u.alloc = function(i, r, t) {
      return A(i, r, t);
    };
    function U(i) {
      return N(i), p(i < 0 ? 0 : _(i) | 0);
    }
    u.allocUnsafe = function(i) {
      return U(i);
    }, u.allocUnsafeSlow = function(i) {
      return U(i);
    };
    function M(i, r) {
      if ((typeof r != "string" || r === "") && (r = "utf8"), !u.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
      const t = S(i, r) | 0;
      let e = p(t);
      const n = e.write(i, r);
      return n !== t && (e = e.slice(0, n)), e;
    }
    function f(i) {
      const r = i.length < 0 ? 0 : _(i.length) | 0, t = p(r);
      for (let e = 0; e < r; e += 1) t[e] = i[e] & 255;
      return t;
    }
    function l(i) {
      if (k(i, Uint8Array)) {
        const r = new Uint8Array(i);
        return w(r.buffer, r.byteOffset, r.byteLength);
      }
      return f(i);
    }
    function w(i, r, t) {
      if (r < 0 || i.byteLength < r) throw new RangeError('"offset" is outside of buffer bounds');
      if (i.byteLength < r + (t || 0)) throw new RangeError('"length" is outside of buffer bounds');
      let e;
      return r === void 0 && t === void 0 ? e = new Uint8Array(i) : t === void 0 ? e = new Uint8Array(i, r) : e = new Uint8Array(i, r, t), Object.setPrototypeOf(e, u.prototype), e;
    }
    function C(i) {
      if (u.isBuffer(i)) {
        const r = _(i.length) | 0, t = p(r);
        return t.length === 0 || i.copy(t, 0, 0, r), t;
      }
      if (i.length !== void 0) return typeof i.length != "number" || H(i.length) ? p(0) : f(i);
      if (i.type === "Buffer" && Array.isArray(i.data)) return f(i.data);
    }
    function _(i) {
      if (i >= a) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a.toString(16) + " bytes");
      return i | 0;
    }
    function R(i) {
      return +i != i && (i = 0), u.alloc(+i);
    }
    u.isBuffer = function(r) {
      return r != null && r._isBuffer === true && r !== u.prototype;
    }, u.compare = function(r, t) {
      if (k(r, Uint8Array) && (r = u.from(r, r.offset, r.byteLength)), k(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)), !u.isBuffer(r) || !u.isBuffer(t)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      if (r === t) return 0;
      let e = r.length, n = t.length;
      for (let o = 0, h = Math.min(e, n); o < h; ++o) if (r[o] !== t[o]) {
        e = r[o], n = t[o];
        break;
      }
      return e < n ? -1 : n < e ? 1 : 0;
    }, u.isEncoding = function(r) {
      switch (String(r).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    }, u.concat = function(r, t) {
      if (!Array.isArray(r)) throw new TypeError('"list" argument must be an Array of Buffers');
      if (r.length === 0) return u.alloc(0);
      let e;
      if (t === void 0) for (t = 0, e = 0; e < r.length; ++e) t += r[e].length;
      const n = u.allocUnsafe(t);
      let o = 0;
      for (e = 0; e < r.length; ++e) {
        let h = r[e];
        if (k(h, Uint8Array)) o + h.length > n.length ? (u.isBuffer(h) || (h = u.from(h)), h.copy(n, o)) : Uint8Array.prototype.set.call(n, h, o);
        else if (u.isBuffer(h)) h.copy(n, o);
        else throw new TypeError('"list" argument must be an Array of Buffers');
        o += h.length;
      }
      return n;
    };
    function S(i, r) {
      if (u.isBuffer(i)) return i.length;
      if (ArrayBuffer.isView(i) || k(i, ArrayBuffer)) return i.byteLength;
      if (typeof i != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof i);
      const t = i.length, e = arguments.length > 2 && arguments[2] === true;
      if (!e && t === 0) return 0;
      let n = false;
      for (; ; ) switch (r) {
        case "ascii":
        case "latin1":
        case "binary":
          return t;
        case "utf8":
        case "utf-8":
          return J(i).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return t * 2;
        case "hex":
          return t >>> 1;
        case "base64":
          return or(i).length;
        default:
          if (n) return e ? -1 : J(i).length;
          r = ("" + r).toLowerCase(), n = true;
      }
    }
    u.byteLength = S;
    function P(i, r, t) {
      let e = false;
      if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((t === void 0 || t > this.length) && (t = this.length), t <= 0) || (t >>>= 0, r >>>= 0, t <= r)) return "";
      for (i || (i = "utf8"); ; ) switch (i) {
        case "hex":
          return Er(this, r, t);
        case "utf8":
        case "utf-8":
          return K(this, r, t);
        case "ascii":
          return xr(this, r, t);
        case "latin1":
        case "binary":
          return Br(this, r, t);
        case "base64":
          return yr(this, r, t);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return dr(this, r, t);
        default:
          if (e) throw new TypeError("Unknown encoding: " + i);
          i = (i + "").toLowerCase(), e = true;
      }
    }
    u.prototype._isBuffer = true;
    function I(i, r, t) {
      const e = i[r];
      i[r] = i[t], i[t] = e;
    }
    u.prototype.swap16 = function() {
      const r = this.length;
      if (r % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let t = 0; t < r; t += 2) I(this, t, t + 1);
      return this;
    }, u.prototype.swap32 = function() {
      const r = this.length;
      if (r % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let t = 0; t < r; t += 4) I(this, t, t + 3), I(this, t + 1, t + 2);
      return this;
    }, u.prototype.swap64 = function() {
      const r = this.length;
      if (r % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let t = 0; t < r; t += 8) I(this, t, t + 7), I(this, t + 1, t + 6), I(this, t + 2, t + 5), I(this, t + 3, t + 4);
      return this;
    }, u.prototype.toString = function() {
      const r = this.length;
      return r === 0 ? "" : arguments.length === 0 ? K(this, 0, r) : P.apply(this, arguments);
    }, u.prototype.toLocaleString = u.prototype.toString, u.prototype.equals = function(r) {
      if (!u.isBuffer(r)) throw new TypeError("Argument must be a Buffer");
      return this === r ? true : u.compare(this, r) === 0;
    }, u.prototype.inspect = function() {
      let r = "";
      const t = y.INSPECT_MAX_BYTES;
      return r = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (r += " ... "), "<Buffer " + r + ">";
    }, m && (u.prototype[m] = u.prototype.inspect), u.prototype.compare = function(r, t, e, n, o) {
      if (k(r, Uint8Array) && (r = u.from(r, r.offset, r.byteLength)), !u.isBuffer(r)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof r);
      if (t === void 0 && (t = 0), e === void 0 && (e = r ? r.length : 0), n === void 0 && (n = 0), o === void 0 && (o = this.length), t < 0 || e > r.length || n < 0 || o > this.length) throw new RangeError("out of range index");
      if (n >= o && t >= e) return 0;
      if (n >= o) return -1;
      if (t >= e) return 1;
      if (t >>>= 0, e >>>= 0, n >>>= 0, o >>>= 0, this === r) return 0;
      let h = o - n, s = e - t;
      const d = Math.min(h, s), B = this.slice(n, o), g = r.slice(t, e);
      for (let x = 0; x < d; ++x) if (B[x] !== g[x]) {
        h = B[x], s = g[x];
        break;
      }
      return h < s ? -1 : s < h ? 1 : 0;
    };
    function X(i, r, t, e, n) {
      if (i.length === 0) return -1;
      if (typeof t == "string" ? (e = t, t = 0) : t > 2147483647 ? t = 2147483647 : t < -2147483648 && (t = -2147483648), t = +t, H(t) && (t = n ? 0 : i.length - 1), t < 0 && (t = i.length + t), t >= i.length) {
        if (n) return -1;
        t = i.length - 1;
      } else if (t < 0) if (n) t = 0;
      else return -1;
      if (typeof r == "string" && (r = u.from(r, e)), u.isBuffer(r)) return r.length === 0 ? -1 : z(i, r, t, e, n);
      if (typeof r == "number") return r = r & 255, typeof Uint8Array.prototype.indexOf == "function" ? n ? Uint8Array.prototype.indexOf.call(i, r, t) : Uint8Array.prototype.lastIndexOf.call(i, r, t) : z(i, [r], t, e, n);
      throw new TypeError("val must be string, number or Buffer");
    }
    function z(i, r, t, e, n) {
      let o = 1, h = i.length, s = r.length;
      if (e !== void 0 && (e = String(e).toLowerCase(), e === "ucs2" || e === "ucs-2" || e === "utf16le" || e === "utf-16le")) {
        if (i.length < 2 || r.length < 2) return -1;
        o = 2, h /= 2, s /= 2, t /= 2;
      }
      function d(g, x) {
        return o === 1 ? g[x] : g.readUInt16BE(x * o);
      }
      let B;
      if (n) {
        let g = -1;
        for (B = t; B < h; B++) if (d(i, B) === d(r, g === -1 ? 0 : B - g)) {
          if (g === -1 && (g = B), B - g + 1 === s) return g * o;
        } else g !== -1 && (B -= B - g), g = -1;
      } else for (t + s > h && (t = h - s), B = t; B >= 0; B--) {
        let g = true;
        for (let x = 0; x < s; x++) if (d(i, B + x) !== d(r, x)) {
          g = false;
          break;
        }
        if (g) return B;
      }
      return -1;
    }
    u.prototype.includes = function(r, t, e) {
      return this.indexOf(r, t, e) !== -1;
    }, u.prototype.indexOf = function(r, t, e) {
      return X(this, r, t, e, true);
    }, u.prototype.lastIndexOf = function(r, t, e) {
      return X(this, r, t, e, false);
    };
    function cr(i, r, t, e) {
      t = Number(t) || 0;
      const n = i.length - t;
      e ? (e = Number(e), e > n && (e = n)) : e = n;
      const o = r.length;
      e > o / 2 && (e = o / 2);
      let h;
      for (h = 0; h < e; ++h) {
        const s = parseInt(r.substr(h * 2, 2), 16);
        if (H(s)) return h;
        i[t + h] = s;
      }
      return h;
    }
    function pr(i, r, t, e) {
      return G(J(r, i.length - t), i, t, e);
    }
    function sr(i, r, t, e) {
      return G(Fr(r), i, t, e);
    }
    function lr(i, r, t, e) {
      return G(or(r), i, t, e);
    }
    function ar(i, r, t, e) {
      return G(Ar(r, i.length - t), i, t, e);
    }
    u.prototype.write = function(r, t, e, n) {
      if (t === void 0) n = "utf8", e = this.length, t = 0;
      else if (e === void 0 && typeof t == "string") n = t, e = this.length, t = 0;
      else if (isFinite(t)) t = t >>> 0, isFinite(e) ? (e = e >>> 0, n === void 0 && (n = "utf8")) : (n = e, e = void 0);
      else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      const o = this.length - t;
      if ((e === void 0 || e > o) && (e = o), r.length > 0 && (e < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
      n || (n = "utf8");
      let h = false;
      for (; ; ) switch (n) {
        case "hex":
          return cr(this, r, t, e);
        case "utf8":
        case "utf-8":
          return pr(this, r, t, e);
        case "ascii":
        case "latin1":
        case "binary":
          return sr(this, r, t, e);
        case "base64":
          return lr(this, r, t, e);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ar(this, r, t, e);
        default:
          if (h) throw new TypeError("Unknown encoding: " + n);
          n = ("" + n).toLowerCase(), h = true;
      }
    }, u.prototype.toJSON = function() {
      return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
    };
    function yr(i, r, t) {
      return r === 0 && t === i.length ? c.fromByteArray(i) : c.fromByteArray(i.slice(r, t));
    }
    function K(i, r, t) {
      t = Math.min(i.length, t);
      const e = [];
      let n = r;
      for (; n < t; ) {
        const o = i[n];
        let h = null, s = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
        if (n + s <= t) {
          let d, B, g, x;
          switch (s) {
            case 1:
              o < 128 && (h = o);
              break;
            case 2:
              d = i[n + 1], (d & 192) === 128 && (x = (o & 31) << 6 | d & 63, x > 127 && (h = x));
              break;
            case 3:
              d = i[n + 1], B = i[n + 2], (d & 192) === 128 && (B & 192) === 128 && (x = (o & 15) << 12 | (d & 63) << 6 | B & 63, x > 2047 && (x < 55296 || x > 57343) && (h = x));
              break;
            case 4:
              d = i[n + 1], B = i[n + 2], g = i[n + 3], (d & 192) === 128 && (B & 192) === 128 && (g & 192) === 128 && (x = (o & 15) << 18 | (d & 63) << 12 | (B & 63) << 6 | g & 63, x > 65535 && x < 1114112 && (h = x));
          }
        }
        h === null ? (h = 65533, s = 1) : h > 65535 && (h -= 65536, e.push(h >>> 10 & 1023 | 55296), h = 56320 | h & 1023), e.push(h), n += s;
      }
      return wr(e);
    }
    const Z = 4096;
    function wr(i) {
      const r = i.length;
      if (r <= Z) return String.fromCharCode.apply(String, i);
      let t = "", e = 0;
      for (; e < r; ) t += String.fromCharCode.apply(String, i.slice(e, e += Z));
      return t;
    }
    function xr(i, r, t) {
      let e = "";
      t = Math.min(i.length, t);
      for (let n = r; n < t; ++n) e += String.fromCharCode(i[n] & 127);
      return e;
    }
    function Br(i, r, t) {
      let e = "";
      t = Math.min(i.length, t);
      for (let n = r; n < t; ++n) e += String.fromCharCode(i[n]);
      return e;
    }
    function Er(i, r, t) {
      const e = i.length;
      (!r || r < 0) && (r = 0), (!t || t < 0 || t > e) && (t = e);
      let n = "";
      for (let o = r; o < t; ++o) n += Ur[i[o]];
      return n;
    }
    function dr(i, r, t) {
      const e = i.slice(r, t);
      let n = "";
      for (let o = 0; o < e.length - 1; o += 2) n += String.fromCharCode(e[o] + e[o + 1] * 256);
      return n;
    }
    u.prototype.slice = function(r, t) {
      const e = this.length;
      r = ~~r, t = t === void 0 ? e : ~~t, r < 0 ? (r += e, r < 0 && (r = 0)) : r > e && (r = e), t < 0 ? (t += e, t < 0 && (t = 0)) : t > e && (t = e), t < r && (t = r);
      const n = this.subarray(r, t);
      return Object.setPrototypeOf(n, u.prototype), n;
    };
    function T(i, r, t) {
      if (i % 1 !== 0 || i < 0) throw new RangeError("offset is not uint");
      if (i + r > t) throw new RangeError("Trying to access beyond buffer length");
    }
    u.prototype.readUintLE = u.prototype.readUIntLE = function(r, t, e) {
      r = r >>> 0, t = t >>> 0, e || T(r, t, this.length);
      let n = this[r], o = 1, h = 0;
      for (; ++h < t && (o *= 256); ) n += this[r + h] * o;
      return n;
    }, u.prototype.readUintBE = u.prototype.readUIntBE = function(r, t, e) {
      r = r >>> 0, t = t >>> 0, e || T(r, t, this.length);
      let n = this[r + --t], o = 1;
      for (; t > 0 && (o *= 256); ) n += this[r + --t] * o;
      return n;
    }, u.prototype.readUint8 = u.prototype.readUInt8 = function(r, t) {
      return r = r >>> 0, t || T(r, 1, this.length), this[r];
    }, u.prototype.readUint16LE = u.prototype.readUInt16LE = function(r, t) {
      return r = r >>> 0, t || T(r, 2, this.length), this[r] | this[r + 1] << 8;
    }, u.prototype.readUint16BE = u.prototype.readUInt16BE = function(r, t) {
      return r = r >>> 0, t || T(r, 2, this.length), this[r] << 8 | this[r + 1];
    }, u.prototype.readUint32LE = u.prototype.readUInt32LE = function(r, t) {
      return r = r >>> 0, t || T(r, 4, this.length), (this[r] | this[r + 1] << 8 | this[r + 2] << 16) + this[r + 3] * 16777216;
    }, u.prototype.readUint32BE = u.prototype.readUInt32BE = function(r, t) {
      return r = r >>> 0, t || T(r, 4, this.length), this[r] * 16777216 + (this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3]);
    }, u.prototype.readBigUInt64LE = D(function(r) {
      r = r >>> 0, O(r, "offset");
      const t = this[r], e = this[r + 7];
      (t === void 0 || e === void 0) && q(r, this.length - 8);
      const n = t + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + this[++r] * 2 ** 24, o = this[++r] + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + e * 2 ** 24;
      return BigInt(n) + (BigInt(o) << BigInt(32));
    }), u.prototype.readBigUInt64BE = D(function(r) {
      r = r >>> 0, O(r, "offset");
      const t = this[r], e = this[r + 7];
      (t === void 0 || e === void 0) && q(r, this.length - 8);
      const n = t * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + this[++r], o = this[++r] * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + e;
      return (BigInt(n) << BigInt(32)) + BigInt(o);
    }), u.prototype.readIntLE = function(r, t, e) {
      r = r >>> 0, t = t >>> 0, e || T(r, t, this.length);
      let n = this[r], o = 1, h = 0;
      for (; ++h < t && (o *= 256); ) n += this[r + h] * o;
      return o *= 128, n >= o && (n -= Math.pow(2, 8 * t)), n;
    }, u.prototype.readIntBE = function(r, t, e) {
      r = r >>> 0, t = t >>> 0, e || T(r, t, this.length);
      let n = t, o = 1, h = this[r + --n];
      for (; n > 0 && (o *= 256); ) h += this[r + --n] * o;
      return o *= 128, h >= o && (h -= Math.pow(2, 8 * t)), h;
    }, u.prototype.readInt8 = function(r, t) {
      return r = r >>> 0, t || T(r, 1, this.length), this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r];
    }, u.prototype.readInt16LE = function(r, t) {
      r = r >>> 0, t || T(r, 2, this.length);
      const e = this[r] | this[r + 1] << 8;
      return e & 32768 ? e | 4294901760 : e;
    }, u.prototype.readInt16BE = function(r, t) {
      r = r >>> 0, t || T(r, 2, this.length);
      const e = this[r + 1] | this[r] << 8;
      return e & 32768 ? e | 4294901760 : e;
    }, u.prototype.readInt32LE = function(r, t) {
      return r = r >>> 0, t || T(r, 4, this.length), this[r] | this[r + 1] << 8 | this[r + 2] << 16 | this[r + 3] << 24;
    }, u.prototype.readInt32BE = function(r, t) {
      return r = r >>> 0, t || T(r, 4, this.length), this[r] << 24 | this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3];
    }, u.prototype.readBigInt64LE = D(function(r) {
      r = r >>> 0, O(r, "offset");
      const t = this[r], e = this[r + 7];
      (t === void 0 || e === void 0) && q(r, this.length - 8);
      const n = this[r + 4] + this[r + 5] * 2 ** 8 + this[r + 6] * 2 ** 16 + (e << 24);
      return (BigInt(n) << BigInt(32)) + BigInt(t + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + this[++r] * 2 ** 24);
    }), u.prototype.readBigInt64BE = D(function(r) {
      r = r >>> 0, O(r, "offset");
      const t = this[r], e = this[r + 7];
      (t === void 0 || e === void 0) && q(r, this.length - 8);
      const n = (t << 24) + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + this[++r];
      return (BigInt(n) << BigInt(32)) + BigInt(this[++r] * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + e);
    }), u.prototype.readFloatLE = function(r, t) {
      return r = r >>> 0, t || T(r, 4, this.length), F.read(this, r, true, 23, 4);
    }, u.prototype.readFloatBE = function(r, t) {
      return r = r >>> 0, t || T(r, 4, this.length), F.read(this, r, false, 23, 4);
    }, u.prototype.readDoubleLE = function(r, t) {
      return r = r >>> 0, t || T(r, 8, this.length), F.read(this, r, true, 52, 8);
    }, u.prototype.readDoubleBE = function(r, t) {
      return r = r >>> 0, t || T(r, 8, this.length), F.read(this, r, false, 52, 8);
    };
    function b(i, r, t, e, n, o) {
      if (!u.isBuffer(i)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (r > n || r < o) throw new RangeError('"value" argument is out of bounds');
      if (t + e > i.length) throw new RangeError("Index out of range");
    }
    u.prototype.writeUintLE = u.prototype.writeUIntLE = function(r, t, e, n) {
      if (r = +r, t = t >>> 0, e = e >>> 0, !n) {
        const s = Math.pow(2, 8 * e) - 1;
        b(this, r, t, e, s, 0);
      }
      let o = 1, h = 0;
      for (this[t] = r & 255; ++h < e && (o *= 256); ) this[t + h] = r / o & 255;
      return t + e;
    }, u.prototype.writeUintBE = u.prototype.writeUIntBE = function(r, t, e, n) {
      if (r = +r, t = t >>> 0, e = e >>> 0, !n) {
        const s = Math.pow(2, 8 * e) - 1;
        b(this, r, t, e, s, 0);
      }
      let o = e - 1, h = 1;
      for (this[t + o] = r & 255; --o >= 0 && (h *= 256); ) this[t + o] = r / h & 255;
      return t + e;
    }, u.prototype.writeUint8 = u.prototype.writeUInt8 = function(r, t, e) {
      return r = +r, t = t >>> 0, e || b(this, r, t, 1, 255, 0), this[t] = r & 255, t + 1;
    }, u.prototype.writeUint16LE = u.prototype.writeUInt16LE = function(r, t, e) {
      return r = +r, t = t >>> 0, e || b(this, r, t, 2, 65535, 0), this[t] = r & 255, this[t + 1] = r >>> 8, t + 2;
    }, u.prototype.writeUint16BE = u.prototype.writeUInt16BE = function(r, t, e) {
      return r = +r, t = t >>> 0, e || b(this, r, t, 2, 65535, 0), this[t] = r >>> 8, this[t + 1] = r & 255, t + 2;
    }, u.prototype.writeUint32LE = u.prototype.writeUInt32LE = function(r, t, e) {
      return r = +r, t = t >>> 0, e || b(this, r, t, 4, 4294967295, 0), this[t + 3] = r >>> 24, this[t + 2] = r >>> 16, this[t + 1] = r >>> 8, this[t] = r & 255, t + 4;
    }, u.prototype.writeUint32BE = u.prototype.writeUInt32BE = function(r, t, e) {
      return r = +r, t = t >>> 0, e || b(this, r, t, 4, 4294967295, 0), this[t] = r >>> 24, this[t + 1] = r >>> 16, this[t + 2] = r >>> 8, this[t + 3] = r & 255, t + 4;
    };
    function Q(i, r, t, e, n) {
      nr(r, e, n, i, t, 7);
      let o = Number(r & BigInt(4294967295));
      i[t++] = o, o = o >> 8, i[t++] = o, o = o >> 8, i[t++] = o, o = o >> 8, i[t++] = o;
      let h = Number(r >> BigInt(32) & BigInt(4294967295));
      return i[t++] = h, h = h >> 8, i[t++] = h, h = h >> 8, i[t++] = h, h = h >> 8, i[t++] = h, t;
    }
    function v(i, r, t, e, n) {
      nr(r, e, n, i, t, 7);
      let o = Number(r & BigInt(4294967295));
      i[t + 7] = o, o = o >> 8, i[t + 6] = o, o = o >> 8, i[t + 5] = o, o = o >> 8, i[t + 4] = o;
      let h = Number(r >> BigInt(32) & BigInt(4294967295));
      return i[t + 3] = h, h = h >> 8, i[t + 2] = h, h = h >> 8, i[t + 1] = h, h = h >> 8, i[t] = h, t + 8;
    }
    u.prototype.writeBigUInt64LE = D(function(r, t = 0) {
      return Q(this, r, t, BigInt(0), BigInt("0xffffffffffffffff"));
    }), u.prototype.writeBigUInt64BE = D(function(r, t = 0) {
      return v(this, r, t, BigInt(0), BigInt("0xffffffffffffffff"));
    }), u.prototype.writeIntLE = function(r, t, e, n) {
      if (r = +r, t = t >>> 0, !n) {
        const d = Math.pow(2, 8 * e - 1);
        b(this, r, t, e, d - 1, -d);
      }
      let o = 0, h = 1, s = 0;
      for (this[t] = r & 255; ++o < e && (h *= 256); ) r < 0 && s === 0 && this[t + o - 1] !== 0 && (s = 1), this[t + o] = (r / h >> 0) - s & 255;
      return t + e;
    }, u.prototype.writeIntBE = function(r, t, e, n) {
      if (r = +r, t = t >>> 0, !n) {
        const d = Math.pow(2, 8 * e - 1);
        b(this, r, t, e, d - 1, -d);
      }
      let o = e - 1, h = 1, s = 0;
      for (this[t + o] = r & 255; --o >= 0 && (h *= 256); ) r < 0 && s === 0 && this[t + o + 1] !== 0 && (s = 1), this[t + o] = (r / h >> 0) - s & 255;
      return t + e;
    }, u.prototype.writeInt8 = function(r, t, e) {
      return r = +r, t = t >>> 0, e || b(this, r, t, 1, 127, -128), r < 0 && (r = 255 + r + 1), this[t] = r & 255, t + 1;
    }, u.prototype.writeInt16LE = function(r, t, e) {
      return r = +r, t = t >>> 0, e || b(this, r, t, 2, 32767, -32768), this[t] = r & 255, this[t + 1] = r >>> 8, t + 2;
    }, u.prototype.writeInt16BE = function(r, t, e) {
      return r = +r, t = t >>> 0, e || b(this, r, t, 2, 32767, -32768), this[t] = r >>> 8, this[t + 1] = r & 255, t + 2;
    }, u.prototype.writeInt32LE = function(r, t, e) {
      return r = +r, t = t >>> 0, e || b(this, r, t, 4, 2147483647, -2147483648), this[t] = r & 255, this[t + 1] = r >>> 8, this[t + 2] = r >>> 16, this[t + 3] = r >>> 24, t + 4;
    }, u.prototype.writeInt32BE = function(r, t, e) {
      return r = +r, t = t >>> 0, e || b(this, r, t, 4, 2147483647, -2147483648), r < 0 && (r = 4294967295 + r + 1), this[t] = r >>> 24, this[t + 1] = r >>> 16, this[t + 2] = r >>> 8, this[t + 3] = r & 255, t + 4;
    }, u.prototype.writeBigInt64LE = D(function(r, t = 0) {
      return Q(this, r, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }), u.prototype.writeBigInt64BE = D(function(r, t = 0) {
      return v(this, r, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function rr(i, r, t, e, n, o) {
      if (t + e > i.length) throw new RangeError("Index out of range");
      if (t < 0) throw new RangeError("Index out of range");
    }
    function tr(i, r, t, e, n) {
      return r = +r, t = t >>> 0, n || rr(i, r, t, 4), F.write(i, r, t, e, 23, 4), t + 4;
    }
    u.prototype.writeFloatLE = function(r, t, e) {
      return tr(this, r, t, true, e);
    }, u.prototype.writeFloatBE = function(r, t, e) {
      return tr(this, r, t, false, e);
    };
    function ir(i, r, t, e, n) {
      return r = +r, t = t >>> 0, n || rr(i, r, t, 8), F.write(i, r, t, e, 52, 8), t + 8;
    }
    u.prototype.writeDoubleLE = function(r, t, e) {
      return ir(this, r, t, true, e);
    }, u.prototype.writeDoubleBE = function(r, t, e) {
      return ir(this, r, t, false, e);
    }, u.prototype.copy = function(r, t, e, n) {
      if (!u.isBuffer(r)) throw new TypeError("argument should be a Buffer");
      if (e || (e = 0), !n && n !== 0 && (n = this.length), t >= r.length && (t = r.length), t || (t = 0), n > 0 && n < e && (n = e), n === e || r.length === 0 || this.length === 0) return 0;
      if (t < 0) throw new RangeError("targetStart out of bounds");
      if (e < 0 || e >= this.length) throw new RangeError("Index out of range");
      if (n < 0) throw new RangeError("sourceEnd out of bounds");
      n > this.length && (n = this.length), r.length - t < n - e && (n = r.length - t + e);
      const o = n - e;
      return this === r && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t, e, n) : Uint8Array.prototype.set.call(r, this.subarray(e, n), t), o;
    }, u.prototype.fill = function(r, t, e, n) {
      if (typeof r == "string") {
        if (typeof t == "string" ? (n = t, t = 0, e = this.length) : typeof e == "string" && (n = e, e = this.length), n !== void 0 && typeof n != "string") throw new TypeError("encoding must be a string");
        if (typeof n == "string" && !u.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
        if (r.length === 1) {
          const h = r.charCodeAt(0);
          (n === "utf8" && h < 128 || n === "latin1") && (r = h);
        }
      } else typeof r == "number" ? r = r & 255 : typeof r == "boolean" && (r = Number(r));
      if (t < 0 || this.length < t || this.length < e) throw new RangeError("Out of range index");
      if (e <= t) return this;
      t = t >>> 0, e = e === void 0 ? this.length : e >>> 0, r || (r = 0);
      let o;
      if (typeof r == "number") for (o = t; o < e; ++o) this[o] = r;
      else {
        const h = u.isBuffer(r) ? r : u.from(r, n), s = h.length;
        if (s === 0) throw new TypeError('The value "' + r + '" is invalid for argument "value"');
        for (o = 0; o < e - t; ++o) this[o + t] = h[o % s];
      }
      return this;
    };
    const $ = {};
    function W(i, r, t) {
      $[i] = class extends t {
        constructor() {
          super(), Object.defineProperty(this, "message", { value: r.apply(this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${i}]`, this.stack, delete this.name;
        }
        get code() {
          return i;
        }
        set code(n) {
          Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: n, writable: true });
        }
        toString() {
          return `${this.name} [${i}]: ${this.message}`;
        }
      };
    }
    W("ERR_BUFFER_OUT_OF_BOUNDS", function(i) {
      return i ? `${i} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    }, RangeError), W("ERR_INVALID_ARG_TYPE", function(i, r) {
      return `The "${i}" argument must be of type number. Received type ${typeof r}`;
    }, TypeError), W("ERR_OUT_OF_RANGE", function(i, r, t) {
      let e = `The value of "${i}" is out of range.`, n = t;
      return Number.isInteger(t) && Math.abs(t) > 2 ** 32 ? n = er(String(t)) : typeof t == "bigint" && (n = String(t), (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) && (n = er(n)), n += "n"), e += ` It must be ${r}. Received ${n}`, e;
    }, RangeError);
    function er(i) {
      let r = "", t = i.length;
      const e = i[0] === "-" ? 1 : 0;
      for (; t >= e + 4; t -= 3) r = `_${i.slice(t - 3, t)}${r}`;
      return `${i.slice(0, t)}${r}`;
    }
    function gr(i, r, t) {
      O(r, "offset"), (i[r] === void 0 || i[r + t] === void 0) && q(r, i.length - (t + 1));
    }
    function nr(i, r, t, e, n, o) {
      if (i > t || i < r) {
        const h = typeof r == "bigint" ? "n" : "";
        let s;
        throw r === 0 || r === BigInt(0) ? s = `>= 0${h} and < 2${h} ** ${(o + 1) * 8}${h}` : s = `>= -(2${h} ** ${(o + 1) * 8 - 1}${h}) and < 2 ** ${(o + 1) * 8 - 1}${h}`, new $.ERR_OUT_OF_RANGE("value", s, i);
      }
      gr(e, n, o);
    }
    function O(i, r) {
      if (typeof i != "number") throw new $.ERR_INVALID_ARG_TYPE(r, "number", i);
    }
    function q(i, r, t) {
      throw Math.floor(i) !== i ? (O(i, t), new $.ERR_OUT_OF_RANGE("offset", "an integer", i)) : r < 0 ? new $.ERR_BUFFER_OUT_OF_BOUNDS() : new $.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${r}`, i);
    }
    const mr = /[^+/0-9A-Za-z-_]/g;
    function Ir(i) {
      if (i = i.split("=")[0], i = i.trim().replace(mr, ""), i.length < 2) return "";
      for (; i.length % 4 !== 0; ) i = i + "=";
      return i;
    }
    function J(i, r) {
      r = r || 1 / 0;
      let t;
      const e = i.length;
      let n = null;
      const o = [];
      for (let h = 0; h < e; ++h) {
        if (t = i.charCodeAt(h), t > 55295 && t < 57344) {
          if (!n) {
            if (t > 56319) {
              (r -= 3) > -1 && o.push(239, 191, 189);
              continue;
            } else if (h + 1 === e) {
              (r -= 3) > -1 && o.push(239, 191, 189);
              continue;
            }
            n = t;
            continue;
          }
          if (t < 56320) {
            (r -= 3) > -1 && o.push(239, 191, 189), n = t;
            continue;
          }
          t = (n - 55296 << 10 | t - 56320) + 65536;
        } else n && (r -= 3) > -1 && o.push(239, 191, 189);
        if (n = null, t < 128) {
          if ((r -= 1) < 0) break;
          o.push(t);
        } else if (t < 2048) {
          if ((r -= 2) < 0) break;
          o.push(t >> 6 | 192, t & 63 | 128);
        } else if (t < 65536) {
          if ((r -= 3) < 0) break;
          o.push(t >> 12 | 224, t >> 6 & 63 | 128, t & 63 | 128);
        } else if (t < 1114112) {
          if ((r -= 4) < 0) break;
          o.push(t >> 18 | 240, t >> 12 & 63 | 128, t >> 6 & 63 | 128, t & 63 | 128);
        } else throw new Error("Invalid code point");
      }
      return o;
    }
    function Fr(i) {
      const r = [];
      for (let t = 0; t < i.length; ++t) r.push(i.charCodeAt(t) & 255);
      return r;
    }
    function Ar(i, r) {
      let t, e, n;
      const o = [];
      for (let h = 0; h < i.length && !((r -= 2) < 0); ++h) t = i.charCodeAt(h), e = t >> 8, n = t % 256, o.push(n), o.push(e);
      return o;
    }
    function or(i) {
      return c.toByteArray(Ir(i));
    }
    function G(i, r, t, e) {
      let n;
      for (n = 0; n < e && !(n + t >= r.length || n >= i.length); ++n) r[n + t] = i[n];
      return n;
    }
    function k(i, r) {
      return i instanceof r || i != null && i.constructor != null && i.constructor.name != null && i.constructor.name === r.name;
    }
    function H(i) {
      return i !== i;
    }
    const Ur = function() {
      const i = "0123456789abcdef", r = new Array(256);
      for (let t = 0; t < 16; ++t) {
        const e = t * 16;
        for (let n = 0; n < 16; ++n) r[e + n] = i[t] + i[n];
      }
      return r;
    }();
    function D(i) {
      return typeof BigInt > "u" ? Rr : i;
    }
    function Rr() {
      throw new Error("BigInt not supported");
    }
  }(V)), V;
}
var Lr = Sr();
const Nr = Tr({ __proto__: null }, [Lr]);
export {
  Nr as i
};
