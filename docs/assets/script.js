(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
  new MutationObserver((s) => {
    for (const n of s)
      if (n.type === "childList")
        for (const r of n.addedNodes)
          r.tagName === "LINK" && r.rel === "modulepreload" && i(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(s) {
    const n = {};
    return (
      s.integrity && (n.integrity = s.integrity),
      s.referrerPolicy && (n.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (n.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (n.credentials = "omit")
        : (n.credentials = "same-origin"),
      n
    );
  }
  function i(s) {
    if (s.ep) return;
    s.ep = !0;
    const n = t(s);
    fetch(s.href, n);
  }
})();
function Dt(o) {
  return (
    o !== null &&
    typeof o == "object" &&
    "constructor" in o &&
    o.constructor === Object
  );
}
function At(o, e) {
  o === void 0 && (o = {}),
    e === void 0 && (e = {}),
    Object.keys(e).forEach((t) => {
      typeof o[t] > "u"
        ? (o[t] = e[t])
        : Dt(e[t]) &&
          Dt(o[t]) &&
          Object.keys(e[t]).length > 0 &&
          At(o[t], e[t]);
    });
}
const vi = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: "" },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return { initEvent() {} };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      },
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
};
function ce() {
  const o = typeof document < "u" ? document : {};
  return At(o, vi), o;
}
const Gi = {
  document: vi,
  navigator: { userAgent: "" },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      },
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
  requestAnimationFrame(o) {
    return typeof setTimeout > "u" ? (o(), null) : setTimeout(o, 0);
  },
  cancelAnimationFrame(o) {
    typeof setTimeout > "u" || clearTimeout(o);
  },
};
function W() {
  const o = typeof window < "u" ? window : {};
  return At(o, Gi), o;
}
function ue(o) {
  return (
    o === void 0 && (o = ""),
    o
      .trim()
      .split(" ")
      .filter((e) => !!e.trim())
  );
}
function Wi(o) {
  const e = o;
  Object.keys(e).forEach((t) => {
    try {
      e[t] = null;
    } catch {}
    try {
      delete e[t];
    } catch {}
  });
}
function Ce(o, e) {
  return e === void 0 && (e = 0), setTimeout(o, e);
}
function Q() {
  return Date.now();
}
function Xi(o) {
  const e = W();
  let t;
  return (
    e.getComputedStyle && (t = e.getComputedStyle(o, null)),
    !t && o.currentStyle && (t = o.currentStyle),
    t || (t = o.style),
    t
  );
}
function qi(o, e) {
  e === void 0 && (e = "x");
  const t = W();
  let i, s, n;
  const r = Xi(o);
  return (
    t.WebKitCSSMatrix
      ? ((s = r.transform || r.webkitTransform),
        s.split(",").length > 6 &&
          (s = s
            .split(", ")
            .map((a) => a.replace(",", "."))
            .join(", ")),
        (n = new t.WebKitCSSMatrix(s === "none" ? "" : s)))
      : ((n =
          r.MozTransform ||
          r.OTransform ||
          r.MsTransform ||
          r.msTransform ||
          r.transform ||
          r
            .getPropertyValue("transform")
            .replace("translate(", "matrix(1, 0, 0, 1,")),
        (i = n.toString().split(","))),
    e === "x" &&
      (t.WebKitCSSMatrix
        ? (s = n.m41)
        : i.length === 16
        ? (s = parseFloat(i[12]))
        : (s = parseFloat(i[4]))),
    e === "y" &&
      (t.WebKitCSSMatrix
        ? (s = n.m42)
        : i.length === 16
        ? (s = parseFloat(i[13]))
        : (s = parseFloat(i[5]))),
    s || 0
  );
}
function De(o) {
  return (
    typeof o == "object" &&
    o !== null &&
    o.constructor &&
    Object.prototype.toString.call(o).slice(8, -1) === "Object"
  );
}
function Yi(o) {
  return typeof window < "u" && typeof window.HTMLElement < "u"
    ? o instanceof HTMLElement
    : o && (o.nodeType === 1 || o.nodeType === 11);
}
function Y() {
  const o = Object(arguments.length <= 0 ? void 0 : arguments[0]),
    e = ["__proto__", "constructor", "prototype"];
  for (let t = 1; t < arguments.length; t += 1) {
    const i = t < 0 || arguments.length <= t ? void 0 : arguments[t];
    if (i != null && !Yi(i)) {
      const s = Object.keys(Object(i)).filter((n) => e.indexOf(n) < 0);
      for (let n = 0, r = s.length; n < r; n += 1) {
        const a = s[n],
          l = Object.getOwnPropertyDescriptor(i, a);
        l !== void 0 &&
          l.enumerable &&
          (De(o[a]) && De(i[a])
            ? i[a].__swiper__
              ? (o[a] = i[a])
              : Y(o[a], i[a])
            : !De(o[a]) && De(i[a])
            ? ((o[a] = {}), i[a].__swiper__ ? (o[a] = i[a]) : Y(o[a], i[a]))
            : (o[a] = i[a]));
      }
    }
  }
  return o;
}
function Re(o, e, t) {
  o.style.setProperty(e, t);
}
function bi(o) {
  let { swiper: e, targetPosition: t, side: i } = o;
  const s = W(),
    n = -e.translate;
  let r = null,
    a;
  const l = e.params.speed;
  (e.wrapperEl.style.scrollSnapType = "none"),
    s.cancelAnimationFrame(e.cssModeFrameID);
  const c = t > n ? "next" : "prev",
    d = (f, h) => (c === "next" && f >= h) || (c === "prev" && f <= h),
    u = () => {
      (a = new Date().getTime()), r === null && (r = a);
      const f = Math.max(Math.min((a - r) / l, 1), 0),
        h = 0.5 - Math.cos(f * Math.PI) / 2;
      let p = n + h * (t - n);
      if ((d(p, t) && (p = t), e.wrapperEl.scrollTo({ [i]: p }), d(p, t))) {
        (e.wrapperEl.style.overflow = "hidden"),
          (e.wrapperEl.style.scrollSnapType = ""),
          setTimeout(() => {
            (e.wrapperEl.style.overflow = ""), e.wrapperEl.scrollTo({ [i]: p });
          }),
          s.cancelAnimationFrame(e.cssModeFrameID);
        return;
      }
      e.cssModeFrameID = s.requestAnimationFrame(u);
    };
  u();
}
function se(o, e) {
  e === void 0 && (e = "");
  const t = [...o.children];
  return (
    o instanceof HTMLSlotElement && t.push(...o.assignedElements()),
    e ? t.filter((i) => i.matches(e)) : t
  );
}
function Zi(o, e) {
  var i, s;
  const t = [e];
  for (; t.length > 0; ) {
    const n = t.shift();
    if (o === n) return !0;
    t.push(
      ...n.children,
      ...(((i = n.shadowRoot) == null ? void 0 : i.children) || []),
      ...(((s = n.assignedElements) == null ? void 0 : s.call(n)) || [])
    );
  }
}
function Ui(o, e) {
  let t = e.contains(o);
  return (
    !t &&
      e instanceof HTMLSlotElement &&
      ((t = [...e.assignedElements()].includes(o)), t || (t = Zi(o, e))),
    t
  );
}
function Ze(o) {
  try {
    console.warn(o);
    return;
  } catch {}
}
function ke(o, e) {
  e === void 0 && (e = []);
  const t = document.createElement(o);
  return t.classList.add(...(Array.isArray(e) ? e : ue(e))), t;
}
function Ki(o) {
  const e = W(),
    t = ce(),
    i = o.getBoundingClientRect(),
    s = t.body,
    n = o.clientTop || s.clientTop || 0,
    r = o.clientLeft || s.clientLeft || 0,
    a = o === e ? e.scrollY : o.scrollTop,
    l = o === e ? e.scrollX : o.scrollLeft;
  return { top: i.top + a - n, left: i.left + l - r };
}
function Ji(o, e) {
  const t = [];
  for (; o.previousElementSibling; ) {
    const i = o.previousElementSibling;
    e ? i.matches(e) && t.push(i) : t.push(i), (o = i);
  }
  return t;
}
function Qi(o, e) {
  const t = [];
  for (; o.nextElementSibling; ) {
    const i = o.nextElementSibling;
    e ? i.matches(e) && t.push(i) : t.push(i), (o = i);
  }
  return t;
}
function he(o, e) {
  return W().getComputedStyle(o, null).getPropertyValue(e);
}
function Rt(o) {
  let e = o,
    t;
  if (e) {
    for (t = 0; (e = e.previousSibling) !== null; )
      e.nodeType === 1 && (t += 1);
    return t;
  }
}
function es(o, e) {
  const t = [];
  let i = o.parentElement;
  for (; i; ) t.push(i), (i = i.parentElement);
  return t;
}
function Qe(o, e) {
  function t(i) {
    i.target === o && (e.call(o, i), o.removeEventListener("transitionend", t));
  }
  e && o.addEventListener("transitionend", t);
}
function Ft(o, e, t) {
  const i = W();
  return (
    o[e === "width" ? "offsetWidth" : "offsetHeight"] +
    parseFloat(
      i
        .getComputedStyle(o, null)
        .getPropertyValue(e === "width" ? "margin-right" : "margin-top")
    ) +
    parseFloat(
      i
        .getComputedStyle(o, null)
        .getPropertyValue(e === "width" ? "margin-left" : "margin-bottom")
    )
  );
}
function ie(o) {
  return (Array.isArray(o) ? o : [o]).filter((e) => !!e);
}
let et;
function ts() {
  const o = W(),
    e = ce();
  return {
    smoothScroll:
      e.documentElement &&
      e.documentElement.style &&
      "scrollBehavior" in e.documentElement.style,
    touch: !!(
      "ontouchstart" in o ||
      (o.DocumentTouch && e instanceof o.DocumentTouch)
    ),
  };
}
function yi() {
  return et || (et = ts()), et;
}
let tt;
function is(o) {
  let { userAgent: e } = o === void 0 ? {} : o;
  const t = yi(),
    i = W(),
    s = i.navigator.platform,
    n = e || i.navigator.userAgent,
    r = { ios: !1, android: !1 },
    a = i.screen.width,
    l = i.screen.height,
    c = n.match(/(Android);?[\s\/]+([\d.]+)?/);
  let d = n.match(/(iPad).*OS\s([\d_]+)/);
  const u = n.match(/(iPod)(.*OS\s([\d_]+))?/),
    f = !d && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    h = s === "Win32";
  let p = s === "MacIntel";
  const m = [
    "1024x1366",
    "1366x1024",
    "834x1194",
    "1194x834",
    "834x1112",
    "1112x834",
    "768x1024",
    "1024x768",
    "820x1180",
    "1180x820",
    "810x1080",
    "1080x810",
  ];
  return (
    !d &&
      p &&
      t.touch &&
      m.indexOf(`${a}x${l}`) >= 0 &&
      ((d = n.match(/(Version)\/([\d.]+)/)),
      d || (d = [0, 1, "13_0_0"]),
      (p = !1)),
    c && !h && ((r.os = "android"), (r.android = !0)),
    (d || f || u) && ((r.os = "ios"), (r.ios = !0)),
    r
  );
}
function wi(o) {
  return o === void 0 && (o = {}), tt || (tt = is(o)), tt;
}
let it;
function ss() {
  const o = W(),
    e = wi();
  let t = !1;
  function i() {
    const a = o.navigator.userAgent.toLowerCase();
    return (
      a.indexOf("safari") >= 0 &&
      a.indexOf("chrome") < 0 &&
      a.indexOf("android") < 0
    );
  }
  if (i()) {
    const a = String(o.navigator.userAgent);
    if (a.includes("Version/")) {
      const [l, c] = a
        .split("Version/")[1]
        .split(" ")[0]
        .split(".")
        .map((d) => Number(d));
      t = l < 16 || (l === 16 && c < 2);
    }
  }
  const s = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      o.navigator.userAgent
    ),
    n = i(),
    r = n || (s && e.ios);
  return {
    isSafari: t || n,
    needPerspectiveFix: t,
    need3dFix: r,
    isWebView: s,
  };
}
function ns() {
  return it || (it = ss()), it;
}
function os(o) {
  let { swiper: e, on: t, emit: i } = o;
  const s = W();
  let n = null,
    r = null;
  const a = () => {
      !e || e.destroyed || !e.initialized || (i("beforeResize"), i("resize"));
    },
    l = () => {
      !e ||
        e.destroyed ||
        !e.initialized ||
        ((n = new ResizeObserver((u) => {
          r = s.requestAnimationFrame(() => {
            const { width: f, height: h } = e;
            let p = f,
              m = h;
            u.forEach((v) => {
              let { contentBoxSize: g, contentRect: y, target: b } = v;
              (b && b !== e.el) ||
                ((p = y ? y.width : (g[0] || g).inlineSize),
                (m = y ? y.height : (g[0] || g).blockSize));
            }),
              (p !== f || m !== h) && a();
          });
        })),
        n.observe(e.el));
    },
    c = () => {
      r && s.cancelAnimationFrame(r),
        n && n.unobserve && e.el && (n.unobserve(e.el), (n = null));
    },
    d = () => {
      !e || e.destroyed || !e.initialized || i("orientationchange");
    };
  t("init", () => {
    if (e.params.resizeObserver && typeof s.ResizeObserver < "u") {
      l();
      return;
    }
    s.addEventListener("resize", a), s.addEventListener("orientationchange", d);
  }),
    t("destroy", () => {
      c(),
        s.removeEventListener("resize", a),
        s.removeEventListener("orientationchange", d);
    });
}
function rs(o) {
  let { swiper: e, extendParams: t, on: i, emit: s } = o;
  const n = [],
    r = W(),
    a = function (d, u) {
      u === void 0 && (u = {});
      const f = r.MutationObserver || r.WebkitMutationObserver,
        h = new f((p) => {
          if (e.__preventObserver__) return;
          if (p.length === 1) {
            s("observerUpdate", p[0]);
            return;
          }
          const m = function () {
            s("observerUpdate", p[0]);
          };
          r.requestAnimationFrame
            ? r.requestAnimationFrame(m)
            : r.setTimeout(m, 0);
        });
      h.observe(d, {
        attributes: typeof u.attributes > "u" ? !0 : u.attributes,
        childList: e.isElement || (typeof u.childList > "u" ? !0 : u).childList,
        characterData: typeof u.characterData > "u" ? !0 : u.characterData,
      }),
        n.push(h);
    },
    l = () => {
      if (e.params.observer) {
        if (e.params.observeParents) {
          const d = es(e.hostEl);
          for (let u = 0; u < d.length; u += 1) a(d[u]);
        }
        a(e.hostEl, { childList: e.params.observeSlideChildren }),
          a(e.wrapperEl, { attributes: !1 });
      }
    },
    c = () => {
      n.forEach((d) => {
        d.disconnect();
      }),
        n.splice(0, n.length);
    };
  t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    i("init", l),
    i("destroy", c);
}
var as = {
  on(o, e, t) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof e != "function") return i;
    const s = t ? "unshift" : "push";
    return (
      o.split(" ").forEach((n) => {
        i.eventsListeners[n] || (i.eventsListeners[n] = []),
          i.eventsListeners[n][s](e);
      }),
      i
    );
  },
  once(o, e, t) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof e != "function") return i;
    function s() {
      i.off(o, s), s.__emitterProxy && delete s.__emitterProxy;
      for (var n = arguments.length, r = new Array(n), a = 0; a < n; a++)
        r[a] = arguments[a];
      e.apply(i, r);
    }
    return (s.__emitterProxy = e), i.on(o, s, t);
  },
  onAny(o, e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || typeof o != "function") return t;
    const i = e ? "unshift" : "push";
    return t.eventsAnyListeners.indexOf(o) < 0 && t.eventsAnyListeners[i](o), t;
  },
  offAny(o) {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners) return e;
    const t = e.eventsAnyListeners.indexOf(o);
    return t >= 0 && e.eventsAnyListeners.splice(t, 1), e;
  },
  off(o, e) {
    const t = this;
    return (
      !t.eventsListeners ||
        t.destroyed ||
        !t.eventsListeners ||
        o.split(" ").forEach((i) => {
          typeof e > "u"
            ? (t.eventsListeners[i] = [])
            : t.eventsListeners[i] &&
              t.eventsListeners[i].forEach((s, n) => {
                (s === e || (s.__emitterProxy && s.__emitterProxy === e)) &&
                  t.eventsListeners[i].splice(n, 1);
              });
        }),
      t
    );
  },
  emit() {
    const o = this;
    if (!o.eventsListeners || o.destroyed || !o.eventsListeners) return o;
    let e, t, i;
    for (var s = arguments.length, n = new Array(s), r = 0; r < s; r++)
      n[r] = arguments[r];
    return (
      typeof n[0] == "string" || Array.isArray(n[0])
        ? ((e = n[0]), (t = n.slice(1, n.length)), (i = o))
        : ((e = n[0].events), (t = n[0].data), (i = n[0].context || o)),
      t.unshift(i),
      (Array.isArray(e) ? e : e.split(" ")).forEach((l) => {
        o.eventsAnyListeners &&
          o.eventsAnyListeners.length &&
          o.eventsAnyListeners.forEach((c) => {
            c.apply(i, [l, ...t]);
          }),
          o.eventsListeners &&
            o.eventsListeners[l] &&
            o.eventsListeners[l].forEach((c) => {
              c.apply(i, t);
            });
      }),
      o
    );
  },
};
function ls() {
  const o = this;
  let e, t;
  const i = o.el;
  typeof o.params.width < "u" && o.params.width !== null
    ? (e = o.params.width)
    : (e = i.clientWidth),
    typeof o.params.height < "u" && o.params.height !== null
      ? (t = o.params.height)
      : (t = i.clientHeight),
    !((e === 0 && o.isHorizontal()) || (t === 0 && o.isVertical())) &&
      ((e =
        e -
        parseInt(he(i, "padding-left") || 0, 10) -
        parseInt(he(i, "padding-right") || 0, 10)),
      (t =
        t -
        parseInt(he(i, "padding-top") || 0, 10) -
        parseInt(he(i, "padding-bottom") || 0, 10)),
      Number.isNaN(e) && (e = 0),
      Number.isNaN(t) && (t = 0),
      Object.assign(o, {
        width: e,
        height: t,
        size: o.isHorizontal() ? e : t,
      }));
}
function cs() {
  const o = this;
  function e(E, L) {
    return parseFloat(E.getPropertyValue(o.getDirectionLabel(L)) || 0);
  }
  const t = o.params,
    { wrapperEl: i, slidesEl: s, size: n, rtlTranslate: r, wrongRTL: a } = o,
    l = o.virtual && t.virtual.enabled,
    c = l ? o.virtual.slides.length : o.slides.length,
    d = se(s, `.${o.params.slideClass}, swiper-slide`),
    u = l ? o.virtual.slides.length : d.length;
  let f = [];
  const h = [],
    p = [];
  let m = t.slidesOffsetBefore;
  typeof m == "function" && (m = t.slidesOffsetBefore.call(o));
  let v = t.slidesOffsetAfter;
  typeof v == "function" && (v = t.slidesOffsetAfter.call(o));
  const g = o.snapGrid.length,
    y = o.slidesGrid.length;
  let b = t.spaceBetween,
    w = -m,
    T = 0,
    C = 0;
  if (typeof n > "u") return;
  typeof b == "string" && b.indexOf("%") >= 0
    ? (b = (parseFloat(b.replace("%", "")) / 100) * n)
    : typeof b == "string" && (b = parseFloat(b)),
    (o.virtualSize = -b),
    d.forEach((E) => {
      r ? (E.style.marginLeft = "") : (E.style.marginRight = ""),
        (E.style.marginBottom = ""),
        (E.style.marginTop = "");
    }),
    t.centeredSlides &&
      t.cssMode &&
      (Re(i, "--swiper-centered-offset-before", ""),
      Re(i, "--swiper-centered-offset-after", ""));
  const z = t.grid && t.grid.rows > 1 && o.grid;
  z ? o.grid.initSlides(d) : o.grid && o.grid.unsetSlides();
  let O;
  const k =
    t.slidesPerView === "auto" &&
    t.breakpoints &&
    Object.keys(t.breakpoints).filter(
      (E) => typeof t.breakpoints[E].slidesPerView < "u"
    ).length > 0;
  for (let E = 0; E < u; E += 1) {
    O = 0;
    let L;
    if (
      (d[E] && (L = d[E]),
      z && o.grid.updateSlide(E, L, d),
      !(d[E] && he(L, "display") === "none"))
    ) {
      if (t.slidesPerView === "auto") {
        k && (d[E].style[o.getDirectionLabel("width")] = "");
        const x = getComputedStyle(L),
          S = L.style.transform,
          P = L.style.webkitTransform;
        if (
          (S && (L.style.transform = "none"),
          P && (L.style.webkitTransform = "none"),
          t.roundLengths)
        )
          O = o.isHorizontal() ? Ft(L, "width") : Ft(L, "height");
        else {
          const A = e(x, "width"),
            D = e(x, "padding-left"),
            $ = e(x, "padding-right"),
            V = e(x, "margin-left"),
            B = e(x, "margin-right"),
            we = x.getPropertyValue("box-sizing");
          if (we && we === "border-box") O = A + V + B;
          else {
            const { clientWidth: Vi, offsetWidth: $i } = L;
            O = A + D + $ + V + B + ($i - Vi);
          }
        }
        S && (L.style.transform = S),
          P && (L.style.webkitTransform = P),
          t.roundLengths && (O = Math.floor(O));
      } else
        (O = (n - (t.slidesPerView - 1) * b) / t.slidesPerView),
          t.roundLengths && (O = Math.floor(O)),
          d[E] && (d[E].style[o.getDirectionLabel("width")] = `${O}px`);
      d[E] && (d[E].swiperSlideSize = O),
        p.push(O),
        t.centeredSlides
          ? ((w = w + O / 2 + T / 2 + b),
            T === 0 && E !== 0 && (w = w - n / 2 - b),
            E === 0 && (w = w - n / 2 - b),
            Math.abs(w) < 1 / 1e3 && (w = 0),
            t.roundLengths && (w = Math.floor(w)),
            C % t.slidesPerGroup === 0 && f.push(w),
            h.push(w))
          : (t.roundLengths && (w = Math.floor(w)),
            (C - Math.min(o.params.slidesPerGroupSkip, C)) %
              o.params.slidesPerGroup ===
              0 && f.push(w),
            h.push(w),
            (w = w + O + b)),
        (o.virtualSize += O + b),
        (T = O),
        (C += 1);
    }
  }
  if (
    ((o.virtualSize = Math.max(o.virtualSize, n) + v),
    r &&
      a &&
      (t.effect === "slide" || t.effect === "coverflow") &&
      (i.style.width = `${o.virtualSize + b}px`),
    t.setWrapperSize &&
      (i.style[o.getDirectionLabel("width")] = `${o.virtualSize + b}px`),
    z && o.grid.updateWrapperSize(O, f),
    !t.centeredSlides)
  ) {
    const E = [];
    for (let L = 0; L < f.length; L += 1) {
      let x = f[L];
      t.roundLengths && (x = Math.floor(x)),
        f[L] <= o.virtualSize - n && E.push(x);
    }
    (f = E),
      Math.floor(o.virtualSize - n) - Math.floor(f[f.length - 1]) > 1 &&
        f.push(o.virtualSize - n);
  }
  if (l && t.loop) {
    const E = p[0] + b;
    if (t.slidesPerGroup > 1) {
      const L = Math.ceil(
          (o.virtual.slidesBefore + o.virtual.slidesAfter) / t.slidesPerGroup
        ),
        x = E * t.slidesPerGroup;
      for (let S = 0; S < L; S += 1) f.push(f[f.length - 1] + x);
    }
    for (let L = 0; L < o.virtual.slidesBefore + o.virtual.slidesAfter; L += 1)
      t.slidesPerGroup === 1 && f.push(f[f.length - 1] + E),
        h.push(h[h.length - 1] + E),
        (o.virtualSize += E);
  }
  if ((f.length === 0 && (f = [0]), b !== 0)) {
    const E =
      o.isHorizontal() && r ? "marginLeft" : o.getDirectionLabel("marginRight");
    d.filter((L, x) =>
      !t.cssMode || t.loop ? !0 : x !== d.length - 1
    ).forEach((L) => {
      L.style[E] = `${b}px`;
    });
  }
  if (t.centeredSlides && t.centeredSlidesBounds) {
    let E = 0;
    p.forEach((x) => {
      E += x + (b || 0);
    }),
      (E -= b);
    const L = E > n ? E - n : 0;
    f = f.map((x) => (x <= 0 ? -m : x > L ? L + v : x));
  }
  if (t.centerInsufficientSlides) {
    let E = 0;
    p.forEach((x) => {
      E += x + (b || 0);
    }),
      (E -= b);
    const L = (t.slidesOffsetBefore || 0) + (t.slidesOffsetAfter || 0);
    if (E + L < n) {
      const x = (n - E - L) / 2;
      f.forEach((S, P) => {
        f[P] = S - x;
      }),
        h.forEach((S, P) => {
          h[P] = S + x;
        });
    }
  }
  if (
    (Object.assign(o, {
      slides: d,
      snapGrid: f,
      slidesGrid: h,
      slidesSizesGrid: p,
    }),
    t.centeredSlides && t.cssMode && !t.centeredSlidesBounds)
  ) {
    Re(i, "--swiper-centered-offset-before", `${-f[0]}px`),
      Re(
        i,
        "--swiper-centered-offset-after",
        `${o.size / 2 - p[p.length - 1] / 2}px`
      );
    const E = -o.snapGrid[0],
      L = -o.slidesGrid[0];
    (o.snapGrid = o.snapGrid.map((x) => x + E)),
      (o.slidesGrid = o.slidesGrid.map((x) => x + L));
  }
  if (
    (u !== c && o.emit("slidesLengthChange"),
    f.length !== g &&
      (o.params.watchOverflow && o.checkOverflow(),
      o.emit("snapGridLengthChange")),
    h.length !== y && o.emit("slidesGridLengthChange"),
    t.watchSlidesProgress && o.updateSlidesOffset(),
    o.emit("slidesUpdated"),
    !l && !t.cssMode && (t.effect === "slide" || t.effect === "fade"))
  ) {
    const E = `${t.containerModifierClass}backface-hidden`,
      L = o.el.classList.contains(E);
    u <= t.maxBackfaceHiddenSlides
      ? L || o.el.classList.add(E)
      : L && o.el.classList.remove(E);
  }
}
function ds(o) {
  const e = this,
    t = [],
    i = e.virtual && e.params.virtual.enabled;
  let s = 0,
    n;
  typeof o == "number"
    ? e.setTransition(o)
    : o === !0 && e.setTransition(e.params.speed);
  const r = (a) => (i ? e.slides[e.getSlideIndexByData(a)] : e.slides[a]);
  if (e.params.slidesPerView !== "auto" && e.params.slidesPerView > 1)
    if (e.params.centeredSlides)
      (e.visibleSlides || []).forEach((a) => {
        t.push(a);
      });
    else
      for (n = 0; n < Math.ceil(e.params.slidesPerView); n += 1) {
        const a = e.activeIndex + n;
        if (a > e.slides.length && !i) break;
        t.push(r(a));
      }
  else t.push(r(e.activeIndex));
  for (n = 0; n < t.length; n += 1)
    if (typeof t[n] < "u") {
      const a = t[n].offsetHeight;
      s = a > s ? a : s;
    }
  (s || s === 0) && (e.wrapperEl.style.height = `${s}px`);
}
function us() {
  const o = this,
    e = o.slides,
    t = o.isElement
      ? o.isHorizontal()
        ? o.wrapperEl.offsetLeft
        : o.wrapperEl.offsetTop
      : 0;
  for (let i = 0; i < e.length; i += 1)
    e[i].swiperSlideOffset =
      (o.isHorizontal() ? e[i].offsetLeft : e[i].offsetTop) -
      t -
      o.cssOverflowAdjustment();
}
const jt = (o, e, t) => {
  e && !o.classList.contains(t)
    ? o.classList.add(t)
    : !e && o.classList.contains(t) && o.classList.remove(t);
};
function hs(o) {
  o === void 0 && (o = (this && this.translate) || 0);
  const e = this,
    t = e.params,
    { slides: i, rtlTranslate: s, snapGrid: n } = e;
  if (i.length === 0) return;
  typeof i[0].swiperSlideOffset > "u" && e.updateSlidesOffset();
  let r = -o;
  s && (r = o), (e.visibleSlidesIndexes = []), (e.visibleSlides = []);
  let a = t.spaceBetween;
  typeof a == "string" && a.indexOf("%") >= 0
    ? (a = (parseFloat(a.replace("%", "")) / 100) * e.size)
    : typeof a == "string" && (a = parseFloat(a));
  for (let l = 0; l < i.length; l += 1) {
    const c = i[l];
    let d = c.swiperSlideOffset;
    t.cssMode && t.centeredSlides && (d -= i[0].swiperSlideOffset);
    const u =
        (r + (t.centeredSlides ? e.minTranslate() : 0) - d) /
        (c.swiperSlideSize + a),
      f =
        (r - n[0] + (t.centeredSlides ? e.minTranslate() : 0) - d) /
        (c.swiperSlideSize + a),
      h = -(r - d),
      p = h + e.slidesSizesGrid[l],
      m = h >= 0 && h <= e.size - e.slidesSizesGrid[l],
      v =
        (h >= 0 && h < e.size - 1) ||
        (p > 1 && p <= e.size) ||
        (h <= 0 && p >= e.size);
    v && (e.visibleSlides.push(c), e.visibleSlidesIndexes.push(l)),
      jt(c, v, t.slideVisibleClass),
      jt(c, m, t.slideFullyVisibleClass),
      (c.progress = s ? -u : u),
      (c.originalProgress = s ? -f : f);
  }
}
function fs(o) {
  const e = this;
  if (typeof o > "u") {
    const d = e.rtlTranslate ? -1 : 1;
    o = (e && e.translate && e.translate * d) || 0;
  }
  const t = e.params,
    i = e.maxTranslate() - e.minTranslate();
  let { progress: s, isBeginning: n, isEnd: r, progressLoop: a } = e;
  const l = n,
    c = r;
  if (i === 0) (s = 0), (n = !0), (r = !0);
  else {
    s = (o - e.minTranslate()) / i;
    const d = Math.abs(o - e.minTranslate()) < 1,
      u = Math.abs(o - e.maxTranslate()) < 1;
    (n = d || s <= 0), (r = u || s >= 1), d && (s = 0), u && (s = 1);
  }
  if (t.loop) {
    const d = e.getSlideIndexByData(0),
      u = e.getSlideIndexByData(e.slides.length - 1),
      f = e.slidesGrid[d],
      h = e.slidesGrid[u],
      p = e.slidesGrid[e.slidesGrid.length - 1],
      m = Math.abs(o);
    m >= f ? (a = (m - f) / p) : (a = (m + p - h) / p), a > 1 && (a -= 1);
  }
  Object.assign(e, { progress: s, progressLoop: a, isBeginning: n, isEnd: r }),
    (t.watchSlidesProgress || (t.centeredSlides && t.autoHeight)) &&
      e.updateSlidesProgress(o),
    n && !l && e.emit("reachBeginning toEdge"),
    r && !c && e.emit("reachEnd toEdge"),
    ((l && !n) || (c && !r)) && e.emit("fromEdge"),
    e.emit("progress", s);
}
const st = (o, e, t) => {
  e && !o.classList.contains(t)
    ? o.classList.add(t)
    : !e && o.classList.contains(t) && o.classList.remove(t);
};
function ps() {
  const o = this,
    { slides: e, params: t, slidesEl: i, activeIndex: s } = o,
    n = o.virtual && t.virtual.enabled,
    r = o.grid && t.grid && t.grid.rows > 1,
    a = (u) => se(i, `.${t.slideClass}${u}, swiper-slide${u}`)[0];
  let l, c, d;
  if (n)
    if (t.loop) {
      let u = s - o.virtual.slidesBefore;
      u < 0 && (u = o.virtual.slides.length + u),
        u >= o.virtual.slides.length && (u -= o.virtual.slides.length),
        (l = a(`[data-swiper-slide-index="${u}"]`));
    } else l = a(`[data-swiper-slide-index="${s}"]`);
  else
    r
      ? ((l = e.find((u) => u.column === s)),
        (d = e.find((u) => u.column === s + 1)),
        (c = e.find((u) => u.column === s - 1)))
      : (l = e[s]);
  l &&
    (r ||
      ((d = Qi(l, `.${t.slideClass}, swiper-slide`)[0]),
      t.loop && !d && (d = e[0]),
      (c = Ji(l, `.${t.slideClass}, swiper-slide`)[0]),
      t.loop && !c === 0 && (c = e[e.length - 1]))),
    e.forEach((u) => {
      st(u, u === l, t.slideActiveClass),
        st(u, u === d, t.slideNextClass),
        st(u, u === c, t.slidePrevClass);
    }),
    o.emitSlidesClasses();
}
const Ye = (o, e) => {
    if (!o || o.destroyed || !o.params) return;
    const t = () => (o.isElement ? "swiper-slide" : `.${o.params.slideClass}`),
      i = e.closest(t());
    if (i) {
      let s = i.querySelector(`.${o.params.lazyPreloaderClass}`);
      !s &&
        o.isElement &&
        (i.shadowRoot
          ? (s = i.shadowRoot.querySelector(`.${o.params.lazyPreloaderClass}`))
          : requestAnimationFrame(() => {
              i.shadowRoot &&
                ((s = i.shadowRoot.querySelector(
                  `.${o.params.lazyPreloaderClass}`
                )),
                s && s.remove());
            })),
        s && s.remove();
    }
  },
  nt = (o, e) => {
    if (!o.slides[e]) return;
    const t = o.slides[e].querySelector('[loading="lazy"]');
    t && t.removeAttribute("loading");
  },
  Mt = (o) => {
    if (!o || o.destroyed || !o.params) return;
    let e = o.params.lazyPreloadPrevNext;
    const t = o.slides.length;
    if (!t || !e || e < 0) return;
    e = Math.min(e, t);
    const i =
        o.params.slidesPerView === "auto"
          ? o.slidesPerViewDynamic()
          : Math.ceil(o.params.slidesPerView),
      s = o.activeIndex;
    if (o.params.grid && o.params.grid.rows > 1) {
      const r = s,
        a = [r - e];
      a.push(...Array.from({ length: e }).map((l, c) => r + i + c)),
        o.slides.forEach((l, c) => {
          a.includes(l.column) && nt(o, c);
        });
      return;
    }
    const n = s + i - 1;
    if (o.params.rewind || o.params.loop)
      for (let r = s - e; r <= n + e; r += 1) {
        const a = ((r % t) + t) % t;
        (a < s || a > n) && nt(o, a);
      }
    else
      for (let r = Math.max(s - e, 0); r <= Math.min(n + e, t - 1); r += 1)
        r !== s && (r > n || r < s) && nt(o, r);
  };
function ms(o) {
  const { slidesGrid: e, params: t } = o,
    i = o.rtlTranslate ? o.translate : -o.translate;
  let s;
  for (let n = 0; n < e.length; n += 1)
    typeof e[n + 1] < "u"
      ? i >= e[n] && i < e[n + 1] - (e[n + 1] - e[n]) / 2
        ? (s = n)
        : i >= e[n] && i < e[n + 1] && (s = n + 1)
      : i >= e[n] && (s = n);
  return t.normalizeSlideIndex && (s < 0 || typeof s > "u") && (s = 0), s;
}
function gs(o) {
  const e = this,
    t = e.rtlTranslate ? e.translate : -e.translate,
    { snapGrid: i, params: s, activeIndex: n, realIndex: r, snapIndex: a } = e;
  let l = o,
    c;
  const d = (h) => {
    let p = h - e.virtual.slidesBefore;
    return (
      p < 0 && (p = e.virtual.slides.length + p),
      p >= e.virtual.slides.length && (p -= e.virtual.slides.length),
      p
    );
  };
  if ((typeof l > "u" && (l = ms(e)), i.indexOf(t) >= 0)) c = i.indexOf(t);
  else {
    const h = Math.min(s.slidesPerGroupSkip, l);
    c = h + Math.floor((l - h) / s.slidesPerGroup);
  }
  if ((c >= i.length && (c = i.length - 1), l === n && !e.params.loop)) {
    c !== a && ((e.snapIndex = c), e.emit("snapIndexChange"));
    return;
  }
  if (l === n && e.params.loop && e.virtual && e.params.virtual.enabled) {
    e.realIndex = d(l);
    return;
  }
  const u = e.grid && s.grid && s.grid.rows > 1;
  let f;
  if (e.virtual && s.virtual.enabled && s.loop) f = d(l);
  else if (u) {
    const h = e.slides.find((m) => m.column === l);
    let p = parseInt(h.getAttribute("data-swiper-slide-index"), 10);
    Number.isNaN(p) && (p = Math.max(e.slides.indexOf(h), 0)),
      (f = Math.floor(p / s.grid.rows));
  } else if (e.slides[l]) {
    const h = e.slides[l].getAttribute("data-swiper-slide-index");
    h ? (f = parseInt(h, 10)) : (f = l);
  } else f = l;
  Object.assign(e, {
    previousSnapIndex: a,
    snapIndex: c,
    previousRealIndex: r,
    realIndex: f,
    previousIndex: n,
    activeIndex: l,
  }),
    e.initialized && Mt(e),
    e.emit("activeIndexChange"),
    e.emit("snapIndexChange"),
    (e.initialized || e.params.runCallbacksOnInit) &&
      (r !== f && e.emit("realIndexChange"), e.emit("slideChange"));
}
function vs(o, e) {
  const t = this,
    i = t.params;
  let s = o.closest(`.${i.slideClass}, swiper-slide`);
  !s &&
    t.isElement &&
    e &&
    e.length > 1 &&
    e.includes(o) &&
    [...e.slice(e.indexOf(o) + 1, e.length)].forEach((a) => {
      !s && a.matches && a.matches(`.${i.slideClass}, swiper-slide`) && (s = a);
    });
  let n = !1,
    r;
  if (s) {
    for (let a = 0; a < t.slides.length; a += 1)
      if (t.slides[a] === s) {
        (n = !0), (r = a);
        break;
      }
  }
  if (s && n)
    (t.clickedSlide = s),
      t.virtual && t.params.virtual.enabled
        ? (t.clickedIndex = parseInt(
            s.getAttribute("data-swiper-slide-index"),
            10
          ))
        : (t.clickedIndex = r);
  else {
    (t.clickedSlide = void 0), (t.clickedIndex = void 0);
    return;
  }
  i.slideToClickedSlide &&
    t.clickedIndex !== void 0 &&
    t.clickedIndex !== t.activeIndex &&
    t.slideToClickedSlide();
}
var bs = {
  updateSize: ls,
  updateSlides: cs,
  updateAutoHeight: ds,
  updateSlidesOffset: us,
  updateSlidesProgress: hs,
  updateProgress: fs,
  updateSlidesClasses: ps,
  updateActiveIndex: gs,
  updateClickedSlide: vs,
};
function ys(o) {
  o === void 0 && (o = this.isHorizontal() ? "x" : "y");
  const e = this,
    { params: t, rtlTranslate: i, translate: s, wrapperEl: n } = e;
  if (t.virtualTranslate) return i ? -s : s;
  if (t.cssMode) return s;
  let r = qi(n, o);
  return (r += e.cssOverflowAdjustment()), i && (r = -r), r || 0;
}
function ws(o, e) {
  const t = this,
    { rtlTranslate: i, params: s, wrapperEl: n, progress: r } = t;
  let a = 0,
    l = 0;
  const c = 0;
  t.isHorizontal() ? (a = i ? -o : o) : (l = o),
    s.roundLengths && ((a = Math.floor(a)), (l = Math.floor(l))),
    (t.previousTranslate = t.translate),
    (t.translate = t.isHorizontal() ? a : l),
    s.cssMode
      ? (n[t.isHorizontal() ? "scrollLeft" : "scrollTop"] = t.isHorizontal()
          ? -a
          : -l)
      : s.virtualTranslate ||
        (t.isHorizontal()
          ? (a -= t.cssOverflowAdjustment())
          : (l -= t.cssOverflowAdjustment()),
        (n.style.transform = `translate3d(${a}px, ${l}px, ${c}px)`));
  let d;
  const u = t.maxTranslate() - t.minTranslate();
  u === 0 ? (d = 0) : (d = (o - t.minTranslate()) / u),
    d !== r && t.updateProgress(o),
    t.emit("setTranslate", t.translate, e);
}
function Ss() {
  return -this.snapGrid[0];
}
function xs() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function Ts(o, e, t, i, s) {
  o === void 0 && (o = 0),
    e === void 0 && (e = this.params.speed),
    t === void 0 && (t = !0),
    i === void 0 && (i = !0);
  const n = this,
    { params: r, wrapperEl: a } = n;
  if (n.animating && r.preventInteractionOnTransition) return !1;
  const l = n.minTranslate(),
    c = n.maxTranslate();
  let d;
  if (
    (i && o > l ? (d = l) : i && o < c ? (d = c) : (d = o),
    n.updateProgress(d),
    r.cssMode)
  ) {
    const u = n.isHorizontal();
    if (e === 0) a[u ? "scrollLeft" : "scrollTop"] = -d;
    else {
      if (!n.support.smoothScroll)
        return (
          bi({ swiper: n, targetPosition: -d, side: u ? "left" : "top" }), !0
        );
      a.scrollTo({ [u ? "left" : "top"]: -d, behavior: "smooth" });
    }
    return !0;
  }
  return (
    e === 0
      ? (n.setTransition(0),
        n.setTranslate(d),
        t && (n.emit("beforeTransitionStart", e, s), n.emit("transitionEnd")))
      : (n.setTransition(e),
        n.setTranslate(d),
        t && (n.emit("beforeTransitionStart", e, s), n.emit("transitionStart")),
        n.animating ||
          ((n.animating = !0),
          n.onTranslateToWrapperTransitionEnd ||
            (n.onTranslateToWrapperTransitionEnd = function (f) {
              !n ||
                n.destroyed ||
                (f.target === this &&
                  (n.wrapperEl.removeEventListener(
                    "transitionend",
                    n.onTranslateToWrapperTransitionEnd
                  ),
                  (n.onTranslateToWrapperTransitionEnd = null),
                  delete n.onTranslateToWrapperTransitionEnd,
                  (n.animating = !1),
                  t && n.emit("transitionEnd")));
            }),
          n.wrapperEl.addEventListener(
            "transitionend",
            n.onTranslateToWrapperTransitionEnd
          ))),
    !0
  );
}
var Es = {
  getTranslate: ys,
  setTranslate: ws,
  minTranslate: Ss,
  maxTranslate: xs,
  translateTo: Ts,
};
function Ps(o, e) {
  const t = this;
  t.params.cssMode ||
    ((t.wrapperEl.style.transitionDuration = `${o}ms`),
    (t.wrapperEl.style.transitionDelay = o === 0 ? "0ms" : "")),
    t.emit("setTransition", o, e);
}
function Si(o) {
  let { swiper: e, runCallbacks: t, direction: i, step: s } = o;
  const { activeIndex: n, previousIndex: r } = e;
  let a = i;
  if (
    (a || (n > r ? (a = "next") : n < r ? (a = "prev") : (a = "reset")),
    e.emit(`transition${s}`),
    t && n !== r)
  ) {
    if (a === "reset") {
      e.emit(`slideResetTransition${s}`);
      return;
    }
    e.emit(`slideChangeTransition${s}`),
      a === "next"
        ? e.emit(`slideNextTransition${s}`)
        : e.emit(`slidePrevTransition${s}`);
  }
}
function Ms(o, e) {
  o === void 0 && (o = !0);
  const t = this,
    { params: i } = t;
  i.cssMode ||
    (i.autoHeight && t.updateAutoHeight(),
    Si({ swiper: t, runCallbacks: o, direction: e, step: "Start" }));
}
function Cs(o, e) {
  o === void 0 && (o = !0);
  const t = this,
    { params: i } = t;
  (t.animating = !1),
    !i.cssMode &&
      (t.setTransition(0),
      Si({ swiper: t, runCallbacks: o, direction: e, step: "End" }));
}
var Os = { setTransition: Ps, transitionStart: Ms, transitionEnd: Cs };
function Ls(o, e, t, i, s) {
  o === void 0 && (o = 0),
    t === void 0 && (t = !0),
    typeof o == "string" && (o = parseInt(o, 10));
  const n = this;
  let r = o;
  r < 0 && (r = 0);
  const {
    params: a,
    snapGrid: l,
    slidesGrid: c,
    previousIndex: d,
    activeIndex: u,
    rtlTranslate: f,
    wrapperEl: h,
    enabled: p,
  } = n;
  if (
    (!p && !i && !s) ||
    n.destroyed ||
    (n.animating && a.preventInteractionOnTransition)
  )
    return !1;
  typeof e > "u" && (e = n.params.speed);
  const m = Math.min(n.params.slidesPerGroupSkip, r);
  let v = m + Math.floor((r - m) / n.params.slidesPerGroup);
  v >= l.length && (v = l.length - 1);
  const g = -l[v];
  if (a.normalizeSlideIndex)
    for (let T = 0; T < c.length; T += 1) {
      const C = -Math.floor(g * 100),
        z = Math.floor(c[T] * 100),
        O = Math.floor(c[T + 1] * 100);
      typeof c[T + 1] < "u"
        ? C >= z && C < O - (O - z) / 2
          ? (r = T)
          : C >= z && C < O && (r = T + 1)
        : C >= z && (r = T);
    }
  if (
    n.initialized &&
    r !== u &&
    ((!n.allowSlideNext &&
      (f
        ? g > n.translate && g > n.minTranslate()
        : g < n.translate && g < n.minTranslate())) ||
      (!n.allowSlidePrev &&
        g > n.translate &&
        g > n.maxTranslate() &&
        (u || 0) !== r))
  )
    return !1;
  r !== (d || 0) && t && n.emit("beforeSlideChangeStart"), n.updateProgress(g);
  let y;
  r > u ? (y = "next") : r < u ? (y = "prev") : (y = "reset");
  const b = n.virtual && n.params.virtual.enabled;
  if (!(b && s) && ((f && -g === n.translate) || (!f && g === n.translate)))
    return (
      n.updateActiveIndex(r),
      a.autoHeight && n.updateAutoHeight(),
      n.updateSlidesClasses(),
      a.effect !== "slide" && n.setTranslate(g),
      y !== "reset" && (n.transitionStart(t, y), n.transitionEnd(t, y)),
      !1
    );
  if (a.cssMode) {
    const T = n.isHorizontal(),
      C = f ? g : -g;
    if (e === 0)
      b &&
        ((n.wrapperEl.style.scrollSnapType = "none"),
        (n._immediateVirtual = !0)),
        b && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0
          ? ((n._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              h[T ? "scrollLeft" : "scrollTop"] = C;
            }))
          : (h[T ? "scrollLeft" : "scrollTop"] = C),
        b &&
          requestAnimationFrame(() => {
            (n.wrapperEl.style.scrollSnapType = ""), (n._immediateVirtual = !1);
          });
    else {
      if (!n.support.smoothScroll)
        return (
          bi({ swiper: n, targetPosition: C, side: T ? "left" : "top" }), !0
        );
      h.scrollTo({ [T ? "left" : "top"]: C, behavior: "smooth" });
    }
    return !0;
  }
  return (
    n.setTransition(e),
    n.setTranslate(g),
    n.updateActiveIndex(r),
    n.updateSlidesClasses(),
    n.emit("beforeTransitionStart", e, i),
    n.transitionStart(t, y),
    e === 0
      ? n.transitionEnd(t, y)
      : n.animating ||
        ((n.animating = !0),
        n.onSlideToWrapperTransitionEnd ||
          (n.onSlideToWrapperTransitionEnd = function (C) {
            !n ||
              n.destroyed ||
              (C.target === this &&
                (n.wrapperEl.removeEventListener(
                  "transitionend",
                  n.onSlideToWrapperTransitionEnd
                ),
                (n.onSlideToWrapperTransitionEnd = null),
                delete n.onSlideToWrapperTransitionEnd,
                n.transitionEnd(t, y)));
          }),
        n.wrapperEl.addEventListener(
          "transitionend",
          n.onSlideToWrapperTransitionEnd
        )),
    !0
  );
}
function As(o, e, t, i) {
  o === void 0 && (o = 0),
    t === void 0 && (t = !0),
    typeof o == "string" && (o = parseInt(o, 10));
  const s = this;
  if (s.destroyed) return;
  typeof e > "u" && (e = s.params.speed);
  const n = s.grid && s.params.grid && s.params.grid.rows > 1;
  let r = o;
  if (s.params.loop)
    if (s.virtual && s.params.virtual.enabled) r = r + s.virtual.slidesBefore;
    else {
      let a;
      if (n) {
        const f = r * s.params.grid.rows;
        a = s.slides.find(
          (h) => h.getAttribute("data-swiper-slide-index") * 1 === f
        ).column;
      } else a = s.getSlideIndexByData(r);
      const l = n
          ? Math.ceil(s.slides.length / s.params.grid.rows)
          : s.slides.length,
        { centeredSlides: c } = s.params;
      let d = s.params.slidesPerView;
      d === "auto"
        ? (d = s.slidesPerViewDynamic())
        : ((d = Math.ceil(parseFloat(s.params.slidesPerView, 10))),
          c && d % 2 === 0 && (d = d + 1));
      let u = l - a < d;
      if (
        (c && (u = u || a < Math.ceil(d / 2)),
        i && c && s.params.slidesPerView !== "auto" && !n && (u = !1),
        u)
      ) {
        const f = c
          ? a < s.activeIndex
            ? "prev"
            : "next"
          : a - s.activeIndex - 1 < s.params.slidesPerView
          ? "next"
          : "prev";
        s.loopFix({
          direction: f,
          slideTo: !0,
          activeSlideIndex: f === "next" ? a + 1 : a - l + 1,
          slideRealIndex: f === "next" ? s.realIndex : void 0,
        });
      }
      if (n) {
        const f = r * s.params.grid.rows;
        r = s.slides.find(
          (h) => h.getAttribute("data-swiper-slide-index") * 1 === f
        ).column;
      } else r = s.getSlideIndexByData(r);
    }
  return (
    requestAnimationFrame(() => {
      s.slideTo(r, e, t, i);
    }),
    s
  );
}
function Is(o, e, t) {
  e === void 0 && (e = !0);
  const i = this,
    { enabled: s, params: n, animating: r } = i;
  if (!s || i.destroyed) return i;
  typeof o > "u" && (o = i.params.speed);
  let a = n.slidesPerGroup;
  n.slidesPerView === "auto" &&
    n.slidesPerGroup === 1 &&
    n.slidesPerGroupAuto &&
    (a = Math.max(i.slidesPerViewDynamic("current", !0), 1));
  const l = i.activeIndex < n.slidesPerGroupSkip ? 1 : a,
    c = i.virtual && n.virtual.enabled;
  if (n.loop) {
    if (r && !c && n.loopPreventsSliding) return !1;
    if (
      (i.loopFix({ direction: "next" }),
      (i._clientLeft = i.wrapperEl.clientLeft),
      i.activeIndex === i.slides.length - 1 && n.cssMode)
    )
      return (
        requestAnimationFrame(() => {
          i.slideTo(i.activeIndex + l, o, e, t);
        }),
        !0
      );
  }
  return n.rewind && i.isEnd
    ? i.slideTo(0, o, e, t)
    : i.slideTo(i.activeIndex + l, o, e, t);
}
function zs(o, e, t) {
  e === void 0 && (e = !0);
  const i = this,
    {
      params: s,
      snapGrid: n,
      slidesGrid: r,
      rtlTranslate: a,
      enabled: l,
      animating: c,
    } = i;
  if (!l || i.destroyed) return i;
  typeof o > "u" && (o = i.params.speed);
  const d = i.virtual && s.virtual.enabled;
  if (s.loop) {
    if (c && !d && s.loopPreventsSliding) return !1;
    i.loopFix({ direction: "prev" }), (i._clientLeft = i.wrapperEl.clientLeft);
  }
  const u = a ? i.translate : -i.translate;
  function f(g) {
    return g < 0 ? -Math.floor(Math.abs(g)) : Math.floor(g);
  }
  const h = f(u),
    p = n.map((g) => f(g));
  let m = n[p.indexOf(h) - 1];
  if (typeof m > "u" && s.cssMode) {
    let g;
    n.forEach((y, b) => {
      h >= y && (g = b);
    }),
      typeof g < "u" && (m = n[g > 0 ? g - 1 : g]);
  }
  let v = 0;
  if (
    (typeof m < "u" &&
      ((v = r.indexOf(m)),
      v < 0 && (v = i.activeIndex - 1),
      s.slidesPerView === "auto" &&
        s.slidesPerGroup === 1 &&
        s.slidesPerGroupAuto &&
        ((v = v - i.slidesPerViewDynamic("previous", !0) + 1),
        (v = Math.max(v, 0)))),
    s.rewind && i.isBeginning)
  ) {
    const g =
      i.params.virtual && i.params.virtual.enabled && i.virtual
        ? i.virtual.slides.length - 1
        : i.slides.length - 1;
    return i.slideTo(g, o, e, t);
  } else if (s.loop && i.activeIndex === 0 && s.cssMode)
    return (
      requestAnimationFrame(() => {
        i.slideTo(v, o, e, t);
      }),
      !0
    );
  return i.slideTo(v, o, e, t);
}
function ks(o, e, t) {
  e === void 0 && (e = !0);
  const i = this;
  if (!i.destroyed)
    return (
      typeof o > "u" && (o = i.params.speed), i.slideTo(i.activeIndex, o, e, t)
    );
}
function Ds(o, e, t, i) {
  e === void 0 && (e = !0), i === void 0 && (i = 0.5);
  const s = this;
  if (s.destroyed) return;
  typeof o > "u" && (o = s.params.speed);
  let n = s.activeIndex;
  const r = Math.min(s.params.slidesPerGroupSkip, n),
    a = r + Math.floor((n - r) / s.params.slidesPerGroup),
    l = s.rtlTranslate ? s.translate : -s.translate;
  if (l >= s.snapGrid[a]) {
    const c = s.snapGrid[a],
      d = s.snapGrid[a + 1];
    l - c > (d - c) * i && (n += s.params.slidesPerGroup);
  } else {
    const c = s.snapGrid[a - 1],
      d = s.snapGrid[a];
    l - c <= (d - c) * i && (n -= s.params.slidesPerGroup);
  }
  return (
    (n = Math.max(n, 0)),
    (n = Math.min(n, s.slidesGrid.length - 1)),
    s.slideTo(n, o, e, t)
  );
}
function Rs() {
  const o = this;
  if (o.destroyed) return;
  const { params: e, slidesEl: t } = o,
    i = e.slidesPerView === "auto" ? o.slidesPerViewDynamic() : e.slidesPerView;
  let s = o.clickedIndex,
    n;
  const r = o.isElement ? "swiper-slide" : `.${e.slideClass}`;
  if (e.loop) {
    if (o.animating) return;
    (n = parseInt(o.clickedSlide.getAttribute("data-swiper-slide-index"), 10)),
      e.centeredSlides
        ? s < o.loopedSlides - i / 2 ||
          s > o.slides.length - o.loopedSlides + i / 2
          ? (o.loopFix(),
            (s = o.getSlideIndex(
              se(t, `${r}[data-swiper-slide-index="${n}"]`)[0]
            )),
            Ce(() => {
              o.slideTo(s);
            }))
          : o.slideTo(s)
        : s > o.slides.length - i
        ? (o.loopFix(),
          (s = o.getSlideIndex(
            se(t, `${r}[data-swiper-slide-index="${n}"]`)[0]
          )),
          Ce(() => {
            o.slideTo(s);
          }))
        : o.slideTo(s);
  } else o.slideTo(s);
}
var Fs = {
  slideTo: Ls,
  slideToLoop: As,
  slideNext: Is,
  slidePrev: zs,
  slideReset: ks,
  slideToClosest: Ds,
  slideToClickedSlide: Rs,
};
function js(o) {
  const e = this,
    { params: t, slidesEl: i } = e;
  if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
  const s = () => {
      se(i, `.${t.slideClass}, swiper-slide`).forEach((u, f) => {
        u.setAttribute("data-swiper-slide-index", f);
      });
    },
    n = e.grid && t.grid && t.grid.rows > 1,
    r = t.slidesPerGroup * (n ? t.grid.rows : 1),
    a = e.slides.length % r !== 0,
    l = n && e.slides.length % t.grid.rows !== 0,
    c = (d) => {
      for (let u = 0; u < d; u += 1) {
        const f = e.isElement
          ? ke("swiper-slide", [t.slideBlankClass])
          : ke("div", [t.slideClass, t.slideBlankClass]);
        e.slidesEl.append(f);
      }
    };
  if (a) {
    if (t.loopAddBlankSlides) {
      const d = r - (e.slides.length % r);
      c(d), e.recalcSlides(), e.updateSlides();
    } else
      Ze(
        "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
      );
    s();
  } else if (l) {
    if (t.loopAddBlankSlides) {
      const d = t.grid.rows - (e.slides.length % t.grid.rows);
      c(d), e.recalcSlides(), e.updateSlides();
    } else
      Ze(
        "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
      );
    s();
  } else s();
  e.loopFix({
    slideRealIndex: o,
    direction: t.centeredSlides ? void 0 : "next",
  });
}
function Bs(o) {
  let {
    slideRealIndex: e,
    slideTo: t = !0,
    direction: i,
    setTranslate: s,
    activeSlideIndex: n,
    byController: r,
    byMousewheel: a,
  } = o === void 0 ? {} : o;
  const l = this;
  if (!l.params.loop) return;
  l.emit("beforeLoopFix");
  const {
      slides: c,
      allowSlidePrev: d,
      allowSlideNext: u,
      slidesEl: f,
      params: h,
    } = l,
    { centeredSlides: p } = h;
  if (
    ((l.allowSlidePrev = !0),
    (l.allowSlideNext = !0),
    l.virtual && h.virtual.enabled)
  ) {
    t &&
      (!h.centeredSlides && l.snapIndex === 0
        ? l.slideTo(l.virtual.slides.length, 0, !1, !0)
        : h.centeredSlides && l.snapIndex < h.slidesPerView
        ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0)
        : l.snapIndex === l.snapGrid.length - 1 &&
          l.slideTo(l.virtual.slidesBefore, 0, !1, !0)),
      (l.allowSlidePrev = d),
      (l.allowSlideNext = u),
      l.emit("loopFix");
    return;
  }
  let m = h.slidesPerView;
  m === "auto"
    ? (m = l.slidesPerViewDynamic())
    : ((m = Math.ceil(parseFloat(h.slidesPerView, 10))),
      p && m % 2 === 0 && (m = m + 1));
  const v = h.slidesPerGroupAuto ? m : h.slidesPerGroup;
  let g = v;
  g % v !== 0 && (g += v - (g % v)),
    (g += h.loopAdditionalSlides),
    (l.loopedSlides = g);
  const y = l.grid && h.grid && h.grid.rows > 1;
  c.length < m + g
    ? Ze(
        "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"
      )
    : y &&
      h.grid.fill === "row" &&
      Ze(
        "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`"
      );
  const b = [],
    w = [];
  let T = l.activeIndex;
  typeof n > "u"
    ? (n = l.getSlideIndex(
        c.find((S) => S.classList.contains(h.slideActiveClass))
      ))
    : (T = n);
  const C = i === "next" || !i,
    z = i === "prev" || !i;
  let O = 0,
    k = 0;
  const E = y ? Math.ceil(c.length / h.grid.rows) : c.length,
    x = (y ? c[n].column : n) + (p && typeof s > "u" ? -m / 2 + 0.5 : 0);
  if (x < g) {
    O = Math.max(g - x, v);
    for (let S = 0; S < g - x; S += 1) {
      const P = S - Math.floor(S / E) * E;
      if (y) {
        const A = E - P - 1;
        for (let D = c.length - 1; D >= 0; D -= 1)
          c[D].column === A && b.push(D);
      } else b.push(E - P - 1);
    }
  } else if (x + m > E - g) {
    k = Math.max(x - (E - g * 2), v);
    for (let S = 0; S < k; S += 1) {
      const P = S - Math.floor(S / E) * E;
      y
        ? c.forEach((A, D) => {
            A.column === P && w.push(D);
          })
        : w.push(P);
    }
  }
  if (
    ((l.__preventObserver__ = !0),
    requestAnimationFrame(() => {
      l.__preventObserver__ = !1;
    }),
    z &&
      b.forEach((S) => {
        (c[S].swiperLoopMoveDOM = !0),
          f.prepend(c[S]),
          (c[S].swiperLoopMoveDOM = !1);
      }),
    C &&
      w.forEach((S) => {
        (c[S].swiperLoopMoveDOM = !0),
          f.append(c[S]),
          (c[S].swiperLoopMoveDOM = !1);
      }),
    l.recalcSlides(),
    h.slidesPerView === "auto"
      ? l.updateSlides()
      : y &&
        ((b.length > 0 && z) || (w.length > 0 && C)) &&
        l.slides.forEach((S, P) => {
          l.grid.updateSlide(P, S, l.slides);
        }),
    h.watchSlidesProgress && l.updateSlidesOffset(),
    t)
  ) {
    if (b.length > 0 && z) {
      if (typeof e > "u") {
        const S = l.slidesGrid[T],
          A = l.slidesGrid[T + O] - S;
        a
          ? l.setTranslate(l.translate - A)
          : (l.slideTo(T + Math.ceil(O), 0, !1, !0),
            s &&
              ((l.touchEventsData.startTranslate =
                l.touchEventsData.startTranslate - A),
              (l.touchEventsData.currentTranslate =
                l.touchEventsData.currentTranslate - A)));
      } else if (s) {
        const S = y ? b.length / h.grid.rows : b.length;
        l.slideTo(l.activeIndex + S, 0, !1, !0),
          (l.touchEventsData.currentTranslate = l.translate);
      }
    } else if (w.length > 0 && C)
      if (typeof e > "u") {
        const S = l.slidesGrid[T],
          A = l.slidesGrid[T - k] - S;
        a
          ? l.setTranslate(l.translate - A)
          : (l.slideTo(T - k, 0, !1, !0),
            s &&
              ((l.touchEventsData.startTranslate =
                l.touchEventsData.startTranslate - A),
              (l.touchEventsData.currentTranslate =
                l.touchEventsData.currentTranslate - A)));
      } else {
        const S = y ? w.length / h.grid.rows : w.length;
        l.slideTo(l.activeIndex - S, 0, !1, !0);
      }
  }
  if (
    ((l.allowSlidePrev = d),
    (l.allowSlideNext = u),
    l.controller && l.controller.control && !r)
  ) {
    const S = {
      slideRealIndex: e,
      direction: i,
      setTranslate: s,
      activeSlideIndex: n,
      byController: !0,
    };
    Array.isArray(l.controller.control)
      ? l.controller.control.forEach((P) => {
          !P.destroyed &&
            P.params.loop &&
            P.loopFix({
              ...S,
              slideTo: P.params.slidesPerView === h.slidesPerView ? t : !1,
            });
        })
      : l.controller.control instanceof l.constructor &&
        l.controller.control.params.loop &&
        l.controller.control.loopFix({
          ...S,
          slideTo:
            l.controller.control.params.slidesPerView === h.slidesPerView
              ? t
              : !1,
        });
  }
  l.emit("loopFix");
}
function Hs() {
  const o = this,
    { params: e, slidesEl: t } = o;
  if (!e.loop || (o.virtual && o.params.virtual.enabled)) return;
  o.recalcSlides();
  const i = [];
  o.slides.forEach((s) => {
    const n =
      typeof s.swiperSlideIndex > "u"
        ? s.getAttribute("data-swiper-slide-index") * 1
        : s.swiperSlideIndex;
    i[n] = s;
  }),
    o.slides.forEach((s) => {
      s.removeAttribute("data-swiper-slide-index");
    }),
    i.forEach((s) => {
      t.append(s);
    }),
    o.recalcSlides(),
    o.slideTo(o.realIndex, 0);
}
var Ns = { loopCreate: js, loopFix: Bs, loopDestroy: Hs };
function _s(o) {
  const e = this;
  if (
    !e.params.simulateTouch ||
    (e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode
  )
    return;
  const t = e.params.touchEventsTarget === "container" ? e.el : e.wrapperEl;
  e.isElement && (e.__preventObserver__ = !0),
    (t.style.cursor = "move"),
    (t.style.cursor = o ? "grabbing" : "grab"),
    e.isElement &&
      requestAnimationFrame(() => {
        e.__preventObserver__ = !1;
      });
}
function Vs() {
  const o = this;
  (o.params.watchOverflow && o.isLocked) ||
    o.params.cssMode ||
    (o.isElement && (o.__preventObserver__ = !0),
    (o[
      o.params.touchEventsTarget === "container" ? "el" : "wrapperEl"
    ].style.cursor = ""),
    o.isElement &&
      requestAnimationFrame(() => {
        o.__preventObserver__ = !1;
      }));
}
var $s = { setGrabCursor: _s, unsetGrabCursor: Vs };
function Gs(o, e) {
  e === void 0 && (e = this);
  function t(i) {
    if (!i || i === ce() || i === W()) return null;
    i.assignedSlot && (i = i.assignedSlot);
    const s = i.closest(o);
    return !s && !i.getRootNode ? null : s || t(i.getRootNode().host);
  }
  return t(e);
}
function Bt(o, e, t) {
  const i = W(),
    { params: s } = o,
    n = s.edgeSwipeDetection,
    r = s.edgeSwipeThreshold;
  return n && (t <= r || t >= i.innerWidth - r)
    ? n === "prevent"
      ? (e.preventDefault(), !0)
      : !1
    : !0;
}
function Ws(o) {
  const e = this,
    t = ce();
  let i = o;
  i.originalEvent && (i = i.originalEvent);
  const s = e.touchEventsData;
  if (i.type === "pointerdown") {
    if (s.pointerId !== null && s.pointerId !== i.pointerId) return;
    s.pointerId = i.pointerId;
  } else
    i.type === "touchstart" &&
      i.targetTouches.length === 1 &&
      (s.touchId = i.targetTouches[0].identifier);
  if (i.type === "touchstart") {
    Bt(e, i, i.targetTouches[0].pageX);
    return;
  }
  const { params: n, touches: r, enabled: a } = e;
  if (
    !a ||
    (!n.simulateTouch && i.pointerType === "mouse") ||
    (e.animating && n.preventInteractionOnTransition)
  )
    return;
  !e.animating && n.cssMode && n.loop && e.loopFix();
  let l = i.target;
  if (
    (n.touchEventsTarget === "wrapper" && !Ui(l, e.wrapperEl)) ||
    ("which" in i && i.which === 3) ||
    ("button" in i && i.button > 0) ||
    (s.isTouched && s.isMoved)
  )
    return;
  const c = !!n.noSwipingClass && n.noSwipingClass !== "",
    d = i.composedPath ? i.composedPath() : i.path;
  c && i.target && i.target.shadowRoot && d && (l = d[0]);
  const u = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`,
    f = !!(i.target && i.target.shadowRoot);
  if (n.noSwiping && (f ? Gs(u, l) : l.closest(u))) {
    e.allowClick = !0;
    return;
  }
  if (n.swipeHandler && !l.closest(n.swipeHandler)) return;
  (r.currentX = i.pageX), (r.currentY = i.pageY);
  const h = r.currentX,
    p = r.currentY;
  if (!Bt(e, i, h)) return;
  Object.assign(s, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0,
  }),
    (r.startX = h),
    (r.startY = p),
    (s.touchStartTime = Q()),
    (e.allowClick = !0),
    e.updateSize(),
    (e.swipeDirection = void 0),
    n.threshold > 0 && (s.allowThresholdMove = !1);
  let m = !0;
  l.matches(s.focusableElements) &&
    ((m = !1), l.nodeName === "SELECT" && (s.isTouched = !1)),
    t.activeElement &&
      t.activeElement.matches(s.focusableElements) &&
      t.activeElement !== l &&
      (i.pointerType === "mouse" ||
        (i.pointerType !== "mouse" && !l.matches(s.focusableElements))) &&
      t.activeElement.blur();
  const v = m && e.allowTouchMove && n.touchStartPreventDefault;
  (n.touchStartForcePreventDefault || v) &&
    !l.isContentEditable &&
    i.preventDefault(),
    n.freeMode &&
      n.freeMode.enabled &&
      e.freeMode &&
      e.animating &&
      !n.cssMode &&
      e.freeMode.onTouchStart(),
    e.emit("touchStart", i);
}
function Xs(o) {
  const e = ce(),
    t = this,
    i = t.touchEventsData,
    { params: s, touches: n, rtlTranslate: r, enabled: a } = t;
  if (!a || (!s.simulateTouch && o.pointerType === "mouse")) return;
  let l = o;
  if (
    (l.originalEvent && (l = l.originalEvent),
    l.type === "pointermove" &&
      (i.touchId !== null || l.pointerId !== i.pointerId))
  )
    return;
  let c;
  if (l.type === "touchmove") {
    if (
      ((c = [...l.changedTouches].find((C) => C.identifier === i.touchId)),
      !c || c.identifier !== i.touchId)
    )
      return;
  } else c = l;
  if (!i.isTouched) {
    i.startMoving && i.isScrolling && t.emit("touchMoveOpposite", l);
    return;
  }
  const d = c.pageX,
    u = c.pageY;
  if (l.preventedByNestedSwiper) {
    (n.startX = d), (n.startY = u);
    return;
  }
  if (!t.allowTouchMove) {
    l.target.matches(i.focusableElements) || (t.allowClick = !1),
      i.isTouched &&
        (Object.assign(n, { startX: d, startY: u, currentX: d, currentY: u }),
        (i.touchStartTime = Q()));
    return;
  }
  if (s.touchReleaseOnEdges && !s.loop) {
    if (t.isVertical()) {
      if (
        (u < n.startY && t.translate <= t.maxTranslate()) ||
        (u > n.startY && t.translate >= t.minTranslate())
      ) {
        (i.isTouched = !1), (i.isMoved = !1);
        return;
      }
    } else if (
      (d < n.startX && t.translate <= t.maxTranslate()) ||
      (d > n.startX && t.translate >= t.minTranslate())
    )
      return;
  }
  if (
    (e.activeElement &&
      e.activeElement.matches(i.focusableElements) &&
      e.activeElement !== l.target &&
      l.pointerType !== "mouse" &&
      e.activeElement.blur(),
    e.activeElement &&
      l.target === e.activeElement &&
      l.target.matches(i.focusableElements))
  ) {
    (i.isMoved = !0), (t.allowClick = !1);
    return;
  }
  i.allowTouchCallbacks && t.emit("touchMove", l),
    (n.previousX = n.currentX),
    (n.previousY = n.currentY),
    (n.currentX = d),
    (n.currentY = u);
  const f = n.currentX - n.startX,
    h = n.currentY - n.startY;
  if (t.params.threshold && Math.sqrt(f ** 2 + h ** 2) < t.params.threshold)
    return;
  if (typeof i.isScrolling > "u") {
    let C;
    (t.isHorizontal() && n.currentY === n.startY) ||
    (t.isVertical() && n.currentX === n.startX)
      ? (i.isScrolling = !1)
      : f * f + h * h >= 25 &&
        ((C = (Math.atan2(Math.abs(h), Math.abs(f)) * 180) / Math.PI),
        (i.isScrolling = t.isHorizontal()
          ? C > s.touchAngle
          : 90 - C > s.touchAngle));
  }
  if (
    (i.isScrolling && t.emit("touchMoveOpposite", l),
    typeof i.startMoving > "u" &&
      (n.currentX !== n.startX || n.currentY !== n.startY) &&
      (i.startMoving = !0),
    i.isScrolling ||
      (l.type === "touchmove" && i.preventTouchMoveFromPointerMove))
  ) {
    i.isTouched = !1;
    return;
  }
  if (!i.startMoving) return;
  (t.allowClick = !1),
    !s.cssMode && l.cancelable && l.preventDefault(),
    s.touchMoveStopPropagation && !s.nested && l.stopPropagation();
  let p = t.isHorizontal() ? f : h,
    m = t.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
  s.oneWayMovement &&
    ((p = Math.abs(p) * (r ? 1 : -1)), (m = Math.abs(m) * (r ? 1 : -1))),
    (n.diff = p),
    (p *= s.touchRatio),
    r && ((p = -p), (m = -m));
  const v = t.touchesDirection;
  (t.swipeDirection = p > 0 ? "prev" : "next"),
    (t.touchesDirection = m > 0 ? "prev" : "next");
  const g = t.params.loop && !s.cssMode,
    y =
      (t.touchesDirection === "next" && t.allowSlideNext) ||
      (t.touchesDirection === "prev" && t.allowSlidePrev);
  if (!i.isMoved) {
    if (
      (g && y && t.loopFix({ direction: t.swipeDirection }),
      (i.startTranslate = t.getTranslate()),
      t.setTransition(0),
      t.animating)
    ) {
      const C = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
        detail: { bySwiperTouchMove: !0 },
      });
      t.wrapperEl.dispatchEvent(C);
    }
    (i.allowMomentumBounce = !1),
      s.grabCursor &&
        (t.allowSlideNext === !0 || t.allowSlidePrev === !0) &&
        t.setGrabCursor(!0),
      t.emit("sliderFirstMove", l);
  }
  let b;
  if (
    (new Date().getTime(),
    i.isMoved &&
      i.allowThresholdMove &&
      v !== t.touchesDirection &&
      g &&
      y &&
      Math.abs(p) >= 1)
  ) {
    Object.assign(n, {
      startX: d,
      startY: u,
      currentX: d,
      currentY: u,
      startTranslate: i.currentTranslate,
    }),
      (i.loopSwapReset = !0),
      (i.startTranslate = i.currentTranslate);
    return;
  }
  t.emit("sliderMove", l),
    (i.isMoved = !0),
    (i.currentTranslate = p + i.startTranslate);
  let w = !0,
    T = s.resistanceRatio;
  if (
    (s.touchReleaseOnEdges && (T = 0),
    p > 0
      ? (g &&
          y &&
          !b &&
          i.allowThresholdMove &&
          i.currentTranslate >
            (s.centeredSlides
              ? t.minTranslate() -
                t.slidesSizesGrid[t.activeIndex + 1] -
                (s.slidesPerView !== "auto" &&
                t.slides.length - s.slidesPerView >= 2
                  ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween
                  : 0) -
                t.params.spaceBetween
              : t.minTranslate()) &&
          t.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0,
          }),
        i.currentTranslate > t.minTranslate() &&
          ((w = !1),
          s.resistance &&
            (i.currentTranslate =
              t.minTranslate() -
              1 +
              (-t.minTranslate() + i.startTranslate + p) ** T)))
      : p < 0 &&
        (g &&
          y &&
          !b &&
          i.allowThresholdMove &&
          i.currentTranslate <
            (s.centeredSlides
              ? t.maxTranslate() +
                t.slidesSizesGrid[t.slidesSizesGrid.length - 1] +
                t.params.spaceBetween +
                (s.slidesPerView !== "auto" &&
                t.slides.length - s.slidesPerView >= 2
                  ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] +
                    t.params.spaceBetween
                  : 0)
              : t.maxTranslate()) &&
          t.loopFix({
            direction: "next",
            setTranslate: !0,
            activeSlideIndex:
              t.slides.length -
              (s.slidesPerView === "auto"
                ? t.slidesPerViewDynamic()
                : Math.ceil(parseFloat(s.slidesPerView, 10))),
          }),
        i.currentTranslate < t.maxTranslate() &&
          ((w = !1),
          s.resistance &&
            (i.currentTranslate =
              t.maxTranslate() +
              1 -
              (t.maxTranslate() - i.startTranslate - p) ** T))),
    w && (l.preventedByNestedSwiper = !0),
    !t.allowSlideNext &&
      t.swipeDirection === "next" &&
      i.currentTranslate < i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !t.allowSlidePrev &&
      t.swipeDirection === "prev" &&
      i.currentTranslate > i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !t.allowSlidePrev &&
      !t.allowSlideNext &&
      (i.currentTranslate = i.startTranslate),
    s.threshold > 0)
  )
    if (Math.abs(p) > s.threshold || i.allowThresholdMove) {
      if (!i.allowThresholdMove) {
        (i.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (i.currentTranslate = i.startTranslate),
          (n.diff = t.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY);
        return;
      }
    } else {
      i.currentTranslate = i.startTranslate;
      return;
    }
  !s.followFinger ||
    s.cssMode ||
    (((s.freeMode && s.freeMode.enabled && t.freeMode) ||
      s.watchSlidesProgress) &&
      (t.updateActiveIndex(), t.updateSlidesClasses()),
    s.freeMode && s.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(),
    t.updateProgress(i.currentTranslate),
    t.setTranslate(i.currentTranslate));
}
function qs(o) {
  const e = this,
    t = e.touchEventsData;
  let i = o;
  i.originalEvent && (i = i.originalEvent);
  let s;
  if (i.type === "touchend" || i.type === "touchcancel") {
    if (
      ((s = [...i.changedTouches].find((T) => T.identifier === t.touchId)),
      !s || s.identifier !== t.touchId)
    )
      return;
  } else {
    if (t.touchId !== null || i.pointerId !== t.pointerId) return;
    s = i;
  }
  if (
    ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
      i.type
    ) &&
    !(
      ["pointercancel", "contextmenu"].includes(i.type) &&
      (e.browser.isSafari || e.browser.isWebView)
    )
  )
    return;
  (t.pointerId = null), (t.touchId = null);
  const {
    params: r,
    touches: a,
    rtlTranslate: l,
    slidesGrid: c,
    enabled: d,
  } = e;
  if (!d || (!r.simulateTouch && i.pointerType === "mouse")) return;
  if (
    (t.allowTouchCallbacks && e.emit("touchEnd", i),
    (t.allowTouchCallbacks = !1),
    !t.isTouched)
  ) {
    t.isMoved && r.grabCursor && e.setGrabCursor(!1),
      (t.isMoved = !1),
      (t.startMoving = !1);
    return;
  }
  r.grabCursor &&
    t.isMoved &&
    t.isTouched &&
    (e.allowSlideNext === !0 || e.allowSlidePrev === !0) &&
    e.setGrabCursor(!1);
  const u = Q(),
    f = u - t.touchStartTime;
  if (e.allowClick) {
    const T = i.path || (i.composedPath && i.composedPath());
    e.updateClickedSlide((T && T[0]) || i.target, T),
      e.emit("tap click", i),
      f < 300 &&
        u - t.lastClickTime < 300 &&
        e.emit("doubleTap doubleClick", i);
  }
  if (
    ((t.lastClickTime = Q()),
    Ce(() => {
      e.destroyed || (e.allowClick = !0);
    }),
    !t.isTouched ||
      !t.isMoved ||
      !e.swipeDirection ||
      (a.diff === 0 && !t.loopSwapReset) ||
      (t.currentTranslate === t.startTranslate && !t.loopSwapReset))
  ) {
    (t.isTouched = !1), (t.isMoved = !1), (t.startMoving = !1);
    return;
  }
  (t.isTouched = !1), (t.isMoved = !1), (t.startMoving = !1);
  let h;
  if (
    (r.followFinger
      ? (h = l ? e.translate : -e.translate)
      : (h = -t.currentTranslate),
    r.cssMode)
  )
    return;
  if (r.freeMode && r.freeMode.enabled) {
    e.freeMode.onTouchEnd({ currentPos: h });
    return;
  }
  const p = h >= -e.maxTranslate() && !e.params.loop;
  let m = 0,
    v = e.slidesSizesGrid[0];
  for (
    let T = 0;
    T < c.length;
    T += T < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup
  ) {
    const C = T < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
    typeof c[T + C] < "u"
      ? (p || (h >= c[T] && h < c[T + C])) && ((m = T), (v = c[T + C] - c[T]))
      : (p || h >= c[T]) && ((m = T), (v = c[c.length - 1] - c[c.length - 2]));
  }
  let g = null,
    y = null;
  r.rewind &&
    (e.isBeginning
      ? (y =
          r.virtual && r.virtual.enabled && e.virtual
            ? e.virtual.slides.length - 1
            : e.slides.length - 1)
      : e.isEnd && (g = 0));
  const b = (h - c[m]) / v,
    w = m < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
  if (f > r.longSwipesMs) {
    if (!r.longSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.swipeDirection === "next" &&
      (b >= r.longSwipesRatio
        ? e.slideTo(r.rewind && e.isEnd ? g : m + w)
        : e.slideTo(m)),
      e.swipeDirection === "prev" &&
        (b > 1 - r.longSwipesRatio
          ? e.slideTo(m + w)
          : y !== null && b < 0 && Math.abs(b) > r.longSwipesRatio
          ? e.slideTo(y)
          : e.slideTo(m));
  } else {
    if (!r.shortSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.navigation &&
    (i.target === e.navigation.nextEl || i.target === e.navigation.prevEl)
      ? i.target === e.navigation.nextEl
        ? e.slideTo(m + w)
        : e.slideTo(m)
      : (e.swipeDirection === "next" && e.slideTo(g !== null ? g : m + w),
        e.swipeDirection === "prev" && e.slideTo(y !== null ? y : m));
  }
}
function Ht() {
  const o = this,
    { params: e, el: t } = o;
  if (t && t.offsetWidth === 0) return;
  e.breakpoints && o.setBreakpoint();
  const { allowSlideNext: i, allowSlidePrev: s, snapGrid: n } = o,
    r = o.virtual && o.params.virtual.enabled;
  (o.allowSlideNext = !0),
    (o.allowSlidePrev = !0),
    o.updateSize(),
    o.updateSlides(),
    o.updateSlidesClasses();
  const a = r && e.loop;
  (e.slidesPerView === "auto" || e.slidesPerView > 1) &&
  o.isEnd &&
  !o.isBeginning &&
  !o.params.centeredSlides &&
  !a
    ? o.slideTo(o.slides.length - 1, 0, !1, !0)
    : o.params.loop && !r
    ? o.slideToLoop(o.realIndex, 0, !1, !0)
    : o.slideTo(o.activeIndex, 0, !1, !0),
    o.autoplay &&
      o.autoplay.running &&
      o.autoplay.paused &&
      (clearTimeout(o.autoplay.resizeTimeout),
      (o.autoplay.resizeTimeout = setTimeout(() => {
        o.autoplay &&
          o.autoplay.running &&
          o.autoplay.paused &&
          o.autoplay.resume();
      }, 500))),
    (o.allowSlidePrev = s),
    (o.allowSlideNext = i),
    o.params.watchOverflow && n !== o.snapGrid && o.checkOverflow();
}
function Ys(o) {
  const e = this;
  e.enabled &&
    (e.allowClick ||
      (e.params.preventClicks && o.preventDefault(),
      e.params.preventClicksPropagation &&
        e.animating &&
        (o.stopPropagation(), o.stopImmediatePropagation())));
}
function Zs() {
  const o = this,
    { wrapperEl: e, rtlTranslate: t, enabled: i } = o;
  if (!i) return;
  (o.previousTranslate = o.translate),
    o.isHorizontal()
      ? (o.translate = -e.scrollLeft)
      : (o.translate = -e.scrollTop),
    o.translate === 0 && (o.translate = 0),
    o.updateActiveIndex(),
    o.updateSlidesClasses();
  let s;
  const n = o.maxTranslate() - o.minTranslate();
  n === 0 ? (s = 0) : (s = (o.translate - o.minTranslate()) / n),
    s !== o.progress && o.updateProgress(t ? -o.translate : o.translate),
    o.emit("setTranslate", o.translate, !1);
}
function Us(o) {
  const e = this;
  Ye(e, o.target),
    !(
      e.params.cssMode ||
      (e.params.slidesPerView !== "auto" && !e.params.autoHeight)
    ) && e.update();
}
function Ks() {
  const o = this;
  o.documentTouchHandlerProceeded ||
    ((o.documentTouchHandlerProceeded = !0),
    o.params.touchReleaseOnEdges && (o.el.style.touchAction = "auto"));
}
const xi = (o, e) => {
  const t = ce(),
    { params: i, el: s, wrapperEl: n, device: r } = o,
    a = !!i.nested,
    l = e === "on" ? "addEventListener" : "removeEventListener",
    c = e;
  !s ||
    typeof s == "string" ||
    (t[l]("touchstart", o.onDocumentTouchStart, { passive: !1, capture: a }),
    s[l]("touchstart", o.onTouchStart, { passive: !1 }),
    s[l]("pointerdown", o.onTouchStart, { passive: !1 }),
    t[l]("touchmove", o.onTouchMove, { passive: !1, capture: a }),
    t[l]("pointermove", o.onTouchMove, { passive: !1, capture: a }),
    t[l]("touchend", o.onTouchEnd, { passive: !0 }),
    t[l]("pointerup", o.onTouchEnd, { passive: !0 }),
    t[l]("pointercancel", o.onTouchEnd, { passive: !0 }),
    t[l]("touchcancel", o.onTouchEnd, { passive: !0 }),
    t[l]("pointerout", o.onTouchEnd, { passive: !0 }),
    t[l]("pointerleave", o.onTouchEnd, { passive: !0 }),
    t[l]("contextmenu", o.onTouchEnd, { passive: !0 }),
    (i.preventClicks || i.preventClicksPropagation) &&
      s[l]("click", o.onClick, !0),
    i.cssMode && n[l]("scroll", o.onScroll),
    i.updateOnWindowResize
      ? o[c](
          r.ios || r.android
            ? "resize orientationchange observerUpdate"
            : "resize observerUpdate",
          Ht,
          !0
        )
      : o[c]("observerUpdate", Ht, !0),
    s[l]("load", o.onLoad, { capture: !0 }));
};
function Js() {
  const o = this,
    { params: e } = o;
  (o.onTouchStart = Ws.bind(o)),
    (o.onTouchMove = Xs.bind(o)),
    (o.onTouchEnd = qs.bind(o)),
    (o.onDocumentTouchStart = Ks.bind(o)),
    e.cssMode && (o.onScroll = Zs.bind(o)),
    (o.onClick = Ys.bind(o)),
    (o.onLoad = Us.bind(o)),
    xi(o, "on");
}
function Qs() {
  xi(this, "off");
}
var en = { attachEvents: Js, detachEvents: Qs };
const Nt = (o, e) => o.grid && e.grid && e.grid.rows > 1;
function tn() {
  const o = this,
    { realIndex: e, initialized: t, params: i, el: s } = o,
    n = i.breakpoints;
  if (!n || (n && Object.keys(n).length === 0)) return;
  const r = ce(),
    a =
      i.breakpointsBase === "window" || !i.breakpointsBase
        ? i.breakpointsBase
        : "container",
    l =
      ["window", "container"].includes(i.breakpointsBase) || !i.breakpointsBase
        ? o.el
        : r.querySelector(i.breakpointsBase),
    c = o.getBreakpoint(n, a, l);
  if (!c || o.currentBreakpoint === c) return;
  const u = (c in n ? n[c] : void 0) || o.originalParams,
    f = Nt(o, i),
    h = Nt(o, u),
    p = o.params.grabCursor,
    m = u.grabCursor,
    v = i.enabled;
  f && !h
    ? (s.classList.remove(
        `${i.containerModifierClass}grid`,
        `${i.containerModifierClass}grid-column`
      ),
      o.emitContainerClasses())
    : !f &&
      h &&
      (s.classList.add(`${i.containerModifierClass}grid`),
      ((u.grid.fill && u.grid.fill === "column") ||
        (!u.grid.fill && i.grid.fill === "column")) &&
        s.classList.add(`${i.containerModifierClass}grid-column`),
      o.emitContainerClasses()),
    p && !m ? o.unsetGrabCursor() : !p && m && o.setGrabCursor(),
    ["navigation", "pagination", "scrollbar"].forEach((C) => {
      if (typeof u[C] > "u") return;
      const z = i[C] && i[C].enabled,
        O = u[C] && u[C].enabled;
      z && !O && o[C].disable(), !z && O && o[C].enable();
    });
  const g = u.direction && u.direction !== i.direction,
    y = i.loop && (u.slidesPerView !== i.slidesPerView || g),
    b = i.loop;
  g && t && o.changeDirection(), Y(o.params, u);
  const w = o.params.enabled,
    T = o.params.loop;
  Object.assign(o, {
    allowTouchMove: o.params.allowTouchMove,
    allowSlideNext: o.params.allowSlideNext,
    allowSlidePrev: o.params.allowSlidePrev,
  }),
    v && !w ? o.disable() : !v && w && o.enable(),
    (o.currentBreakpoint = c),
    o.emit("_beforeBreakpoint", u),
    t &&
      (y
        ? (o.loopDestroy(), o.loopCreate(e), o.updateSlides())
        : !b && T
        ? (o.loopCreate(e), o.updateSlides())
        : b && !T && o.loopDestroy()),
    o.emit("breakpoint", u);
}
function sn(o, e, t) {
  if ((e === void 0 && (e = "window"), !o || (e === "container" && !t))) return;
  let i = !1;
  const s = W(),
    n = e === "window" ? s.innerHeight : t.clientHeight,
    r = Object.keys(o).map((a) => {
      if (typeof a == "string" && a.indexOf("@") === 0) {
        const l = parseFloat(a.substr(1));
        return { value: n * l, point: a };
      }
      return { value: a, point: a };
    });
  r.sort((a, l) => parseInt(a.value, 10) - parseInt(l.value, 10));
  for (let a = 0; a < r.length; a += 1) {
    const { point: l, value: c } = r[a];
    e === "window"
      ? s.matchMedia(`(min-width: ${c}px)`).matches && (i = l)
      : c <= t.clientWidth && (i = l);
  }
  return i || "max";
}
var nn = { setBreakpoint: tn, getBreakpoint: sn };
function on(o, e) {
  const t = [];
  return (
    o.forEach((i) => {
      typeof i == "object"
        ? Object.keys(i).forEach((s) => {
            i[s] && t.push(e + s);
          })
        : typeof i == "string" && t.push(e + i);
    }),
    t
  );
}
function rn() {
  const o = this,
    { classNames: e, params: t, rtl: i, el: s, device: n } = o,
    r = on(
      [
        "initialized",
        t.direction,
        { "free-mode": o.params.freeMode && t.freeMode.enabled },
        { autoheight: t.autoHeight },
        { rtl: i },
        { grid: t.grid && t.grid.rows > 1 },
        {
          "grid-column": t.grid && t.grid.rows > 1 && t.grid.fill === "column",
        },
        { android: n.android },
        { ios: n.ios },
        { "css-mode": t.cssMode },
        { centered: t.cssMode && t.centeredSlides },
        { "watch-progress": t.watchSlidesProgress },
      ],
      t.containerModifierClass
    );
  e.push(...r), s.classList.add(...e), o.emitContainerClasses();
}
function an() {
  const o = this,
    { el: e, classNames: t } = o;
  !e ||
    typeof e == "string" ||
    (e.classList.remove(...t), o.emitContainerClasses());
}
var ln = { addClasses: rn, removeClasses: an };
function cn() {
  const o = this,
    { isLocked: e, params: t } = o,
    { slidesOffsetBefore: i } = t;
  if (i) {
    const s = o.slides.length - 1,
      n = o.slidesGrid[s] + o.slidesSizesGrid[s] + i * 2;
    o.isLocked = o.size > n;
  } else o.isLocked = o.snapGrid.length === 1;
  t.allowSlideNext === !0 && (o.allowSlideNext = !o.isLocked),
    t.allowSlidePrev === !0 && (o.allowSlidePrev = !o.isLocked),
    e && e !== o.isLocked && (o.isEnd = !1),
    e !== o.isLocked && o.emit(o.isLocked ? "lock" : "unlock");
}
var dn = { checkOverflow: cn },
  _t = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    swiperElementNodeName: "SWIPER-CONTAINER",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
function un(o, e) {
  return function (i) {
    i === void 0 && (i = {});
    const s = Object.keys(i)[0],
      n = i[s];
    if (typeof n != "object" || n === null) {
      Y(e, i);
      return;
    }
    if (
      (o[s] === !0 && (o[s] = { enabled: !0 }),
      s === "navigation" &&
        o[s] &&
        o[s].enabled &&
        !o[s].prevEl &&
        !o[s].nextEl &&
        (o[s].auto = !0),
      ["pagination", "scrollbar"].indexOf(s) >= 0 &&
        o[s] &&
        o[s].enabled &&
        !o[s].el &&
        (o[s].auto = !0),
      !(s in o && "enabled" in n))
    ) {
      Y(e, i);
      return;
    }
    typeof o[s] == "object" && !("enabled" in o[s]) && (o[s].enabled = !0),
      o[s] || (o[s] = { enabled: !1 }),
      Y(e, i);
  };
}
const ot = {
    eventsEmitter: as,
    update: bs,
    translate: Es,
    transition: Os,
    slide: Fs,
    loop: Ns,
    grabCursor: $s,
    events: en,
    breakpoints: nn,
    checkOverflow: dn,
    classes: ln,
  },
  rt = {};
class N {
  constructor() {
    let e, t;
    for (var i = arguments.length, s = new Array(i), n = 0; n < i; n++)
      s[n] = arguments[n];
    s.length === 1 &&
    s[0].constructor &&
    Object.prototype.toString.call(s[0]).slice(8, -1) === "Object"
      ? (t = s[0])
      : ([e, t] = s),
      t || (t = {}),
      (t = Y({}, t)),
      e && !t.el && (t.el = e);
    const r = ce();
    if (
      t.el &&
      typeof t.el == "string" &&
      r.querySelectorAll(t.el).length > 1
    ) {
      const d = [];
      return (
        r.querySelectorAll(t.el).forEach((u) => {
          const f = Y({}, t, { el: u });
          d.push(new N(f));
        }),
        d
      );
    }
    const a = this;
    (a.__swiper__ = !0),
      (a.support = yi()),
      (a.device = wi({ userAgent: t.userAgent })),
      (a.browser = ns()),
      (a.eventsListeners = {}),
      (a.eventsAnyListeners = []),
      (a.modules = [...a.__modules__]),
      t.modules && Array.isArray(t.modules) && a.modules.push(...t.modules);
    const l = {};
    a.modules.forEach((d) => {
      d({
        params: t,
        swiper: a,
        extendParams: un(t, l),
        on: a.on.bind(a),
        once: a.once.bind(a),
        off: a.off.bind(a),
        emit: a.emit.bind(a),
      });
    });
    const c = Y({}, _t, l);
    return (
      (a.params = Y({}, c, rt, t)),
      (a.originalParams = Y({}, a.params)),
      (a.passedParams = Y({}, t)),
      a.params &&
        a.params.on &&
        Object.keys(a.params.on).forEach((d) => {
          a.on(d, a.params.on[d]);
        }),
      a.params && a.params.onAny && a.onAny(a.params.onAny),
      Object.assign(a, {
        enabled: a.params.enabled,
        el: e,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return a.params.direction === "horizontal";
        },
        isVertical() {
          return a.params.direction === "vertical";
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
        },
        allowSlideNext: a.params.allowSlideNext,
        allowSlidePrev: a.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: a.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          pointerId: null,
          touchId: null,
        },
        allowClick: !0,
        allowTouchMove: a.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      a.emit("_swiper"),
      a.params.init && a.init(),
      a
    );
  }
  getDirectionLabel(e) {
    return this.isHorizontal()
      ? e
      : {
          width: "height",
          "margin-top": "margin-left",
          "margin-bottom ": "margin-right",
          "margin-left": "margin-top",
          "margin-right": "margin-bottom",
          "padding-left": "padding-top",
          "padding-right": "padding-bottom",
          marginRight: "marginBottom",
        }[e];
  }
  getSlideIndex(e) {
    const { slidesEl: t, params: i } = this,
      s = se(t, `.${i.slideClass}, swiper-slide`),
      n = Rt(s[0]);
    return Rt(e) - n;
  }
  getSlideIndexByData(e) {
    return this.getSlideIndex(
      this.slides.find(
        (t) => t.getAttribute("data-swiper-slide-index") * 1 === e
      )
    );
  }
  recalcSlides() {
    const e = this,
      { slidesEl: t, params: i } = e;
    e.slides = se(t, `.${i.slideClass}, swiper-slide`);
  }
  enable() {
    const e = this;
    e.enabled ||
      ((e.enabled = !0),
      e.params.grabCursor && e.setGrabCursor(),
      e.emit("enable"));
  }
  disable() {
    const e = this;
    e.enabled &&
      ((e.enabled = !1),
      e.params.grabCursor && e.unsetGrabCursor(),
      e.emit("disable"));
  }
  setProgress(e, t) {
    const i = this;
    e = Math.min(Math.max(e, 0), 1);
    const s = i.minTranslate(),
      r = (i.maxTranslate() - s) * e + s;
    i.translateTo(r, typeof t > "u" ? 0 : t),
      i.updateActiveIndex(),
      i.updateSlidesClasses();
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = e.el.className
      .split(" ")
      .filter(
        (i) =>
          i.indexOf("swiper") === 0 ||
          i.indexOf(e.params.containerModifierClass) === 0
      );
    e.emit("_containerClasses", t.join(" "));
  }
  getSlideClasses(e) {
    const t = this;
    return t.destroyed
      ? ""
      : e.className
          .split(" ")
          .filter(
            (i) =>
              i.indexOf("swiper-slide") === 0 ||
              i.indexOf(t.params.slideClass) === 0
          )
          .join(" ");
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = [];
    e.slides.forEach((i) => {
      const s = e.getSlideClasses(i);
      t.push({ slideEl: i, classNames: s }), e.emit("_slideClass", i, s);
    }),
      e.emit("_slideClasses", t);
  }
  slidesPerViewDynamic(e, t) {
    e === void 0 && (e = "current"), t === void 0 && (t = !1);
    const i = this,
      {
        params: s,
        slides: n,
        slidesGrid: r,
        slidesSizesGrid: a,
        size: l,
        activeIndex: c,
      } = i;
    let d = 1;
    if (typeof s.slidesPerView == "number") return s.slidesPerView;
    if (s.centeredSlides) {
      let u = n[c] ? Math.ceil(n[c].swiperSlideSize) : 0,
        f;
      for (let h = c + 1; h < n.length; h += 1)
        n[h] &&
          !f &&
          ((u += Math.ceil(n[h].swiperSlideSize)), (d += 1), u > l && (f = !0));
      for (let h = c - 1; h >= 0; h -= 1)
        n[h] &&
          !f &&
          ((u += n[h].swiperSlideSize), (d += 1), u > l && (f = !0));
    } else if (e === "current")
      for (let u = c + 1; u < n.length; u += 1)
        (t ? r[u] + a[u] - r[c] < l : r[u] - r[c] < l) && (d += 1);
    else for (let u = c - 1; u >= 0; u -= 1) r[c] - r[u] < l && (d += 1);
    return d;
  }
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const { snapGrid: t, params: i } = e;
    i.breakpoints && e.setBreakpoint(),
      [...e.el.querySelectorAll('[loading="lazy"]')].forEach((r) => {
        r.complete && Ye(e, r);
      }),
      e.updateSize(),
      e.updateSlides(),
      e.updateProgress(),
      e.updateSlidesClasses();
    function s() {
      const r = e.rtlTranslate ? e.translate * -1 : e.translate,
        a = Math.min(Math.max(r, e.maxTranslate()), e.minTranslate());
      e.setTranslate(a), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let n;
    if (i.freeMode && i.freeMode.enabled && !i.cssMode)
      s(), i.autoHeight && e.updateAutoHeight();
    else {
      if (
        (i.slidesPerView === "auto" || i.slidesPerView > 1) &&
        e.isEnd &&
        !i.centeredSlides
      ) {
        const r = e.virtual && i.virtual.enabled ? e.virtual.slides : e.slides;
        n = e.slideTo(r.length - 1, 0, !1, !0);
      } else n = e.slideTo(e.activeIndex, 0, !1, !0);
      n || s();
    }
    i.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update");
  }
  changeDirection(e, t) {
    t === void 0 && (t = !0);
    const i = this,
      s = i.params.direction;
    return (
      e || (e = s === "horizontal" ? "vertical" : "horizontal"),
      e === s ||
        (e !== "horizontal" && e !== "vertical") ||
        (i.el.classList.remove(`${i.params.containerModifierClass}${s}`),
        i.el.classList.add(`${i.params.containerModifierClass}${e}`),
        i.emitContainerClasses(),
        (i.params.direction = e),
        i.slides.forEach((n) => {
          e === "vertical" ? (n.style.width = "") : (n.style.height = "");
        }),
        i.emit("changeDirection"),
        t && i.update()),
      i
    );
  }
  changeLanguageDirection(e) {
    const t = this;
    (t.rtl && e === "rtl") ||
      (!t.rtl && e === "ltr") ||
      ((t.rtl = e === "rtl"),
      (t.rtlTranslate = t.params.direction === "horizontal" && t.rtl),
      t.rtl
        ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
          (t.el.dir = "rtl"))
        : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
          (t.el.dir = "ltr")),
      t.update());
  }
  mount(e) {
    const t = this;
    if (t.mounted) return !0;
    let i = e || t.params.el;
    if ((typeof i == "string" && (i = document.querySelector(i)), !i))
      return !1;
    (i.swiper = t),
      i.parentNode &&
        i.parentNode.host &&
        i.parentNode.host.nodeName ===
          t.params.swiperElementNodeName.toUpperCase() &&
        (t.isElement = !0);
    const s = () =>
      `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let r =
      i && i.shadowRoot && i.shadowRoot.querySelector
        ? i.shadowRoot.querySelector(s())
        : se(i, s())[0];
    return (
      !r &&
        t.params.createElements &&
        ((r = ke("div", t.params.wrapperClass)),
        i.append(r),
        se(i, `.${t.params.slideClass}`).forEach((a) => {
          r.append(a);
        })),
      Object.assign(t, {
        el: i,
        wrapperEl: r,
        slidesEl:
          t.isElement && !i.parentNode.host.slideSlots ? i.parentNode.host : r,
        hostEl: t.isElement ? i.parentNode.host : i,
        mounted: !0,
        rtl: i.dir.toLowerCase() === "rtl" || he(i, "direction") === "rtl",
        rtlTranslate:
          t.params.direction === "horizontal" &&
          (i.dir.toLowerCase() === "rtl" || he(i, "direction") === "rtl"),
        wrongRTL: he(r, "display") === "-webkit-box",
      }),
      !0
    );
  }
  init(e) {
    const t = this;
    if (t.initialized || t.mount(e) === !1) return t;
    t.emit("beforeInit"),
      t.params.breakpoints && t.setBreakpoint(),
      t.addClasses(),
      t.updateSize(),
      t.updateSlides(),
      t.params.watchOverflow && t.checkOverflow(),
      t.params.grabCursor && t.enabled && t.setGrabCursor(),
      t.params.loop && t.virtual && t.params.virtual.enabled
        ? t.slideTo(
            t.params.initialSlide + t.virtual.slidesBefore,
            0,
            t.params.runCallbacksOnInit,
            !1,
            !0
          )
        : t.slideTo(
            t.params.initialSlide,
            0,
            t.params.runCallbacksOnInit,
            !1,
            !0
          ),
      t.params.loop && t.loopCreate(),
      t.attachEvents();
    const s = [...t.el.querySelectorAll('[loading="lazy"]')];
    return (
      t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
      s.forEach((n) => {
        n.complete
          ? Ye(t, n)
          : n.addEventListener("load", (r) => {
              Ye(t, r.target);
            });
      }),
      Mt(t),
      (t.initialized = !0),
      Mt(t),
      t.emit("init"),
      t.emit("afterInit"),
      t
    );
  }
  destroy(e, t) {
    e === void 0 && (e = !0), t === void 0 && (t = !0);
    const i = this,
      { params: s, el: n, wrapperEl: r, slides: a } = i;
    return (
      typeof i.params > "u" ||
        i.destroyed ||
        (i.emit("beforeDestroy"),
        (i.initialized = !1),
        i.detachEvents(),
        s.loop && i.loopDestroy(),
        t &&
          (i.removeClasses(),
          n && typeof n != "string" && n.removeAttribute("style"),
          r && r.removeAttribute("style"),
          a &&
            a.length &&
            a.forEach((l) => {
              l.classList.remove(
                s.slideVisibleClass,
                s.slideFullyVisibleClass,
                s.slideActiveClass,
                s.slideNextClass,
                s.slidePrevClass
              ),
                l.removeAttribute("style"),
                l.removeAttribute("data-swiper-slide-index");
            })),
        i.emit("destroy"),
        Object.keys(i.eventsListeners).forEach((l) => {
          i.off(l);
        }),
        e !== !1 &&
          (i.el && typeof i.el != "string" && (i.el.swiper = null), Wi(i)),
        (i.destroyed = !0)),
      null
    );
  }
  static extendDefaults(e) {
    Y(rt, e);
  }
  static get extendedDefaults() {
    return rt;
  }
  static get defaults() {
    return _t;
  }
  static installModule(e) {
    N.prototype.__modules__ || (N.prototype.__modules__ = []);
    const t = N.prototype.__modules__;
    typeof e == "function" && t.indexOf(e) < 0 && t.push(e);
  }
  static use(e) {
    return Array.isArray(e)
      ? (e.forEach((t) => N.installModule(t)), N)
      : (N.installModule(e), N);
  }
}
Object.keys(ot).forEach((o) => {
  Object.keys(ot[o]).forEach((e) => {
    N.prototype[e] = ot[o][e];
  });
});
N.use([os, rs]);
function at(o) {
  let { swiper: e, extendParams: t, on: i, emit: s } = o;
  const n = W();
  t({
    mousewheel: {
      enabled: !1,
      releaseOnEdges: !1,
      invert: !1,
      forceToAxis: !1,
      sensitivity: 1,
      eventsTarget: "container",
      thresholdDelta: null,
      thresholdTime: null,
      noMousewheelClass: "swiper-no-mousewheel",
    },
  }),
    (e.mousewheel = { enabled: !1 });
  let r,
    a = Q(),
    l;
  const c = [];
  function d(b) {
    let z = 0,
      O = 0,
      k = 0,
      E = 0;
    return (
      "detail" in b && (O = b.detail),
      "wheelDelta" in b && (O = -b.wheelDelta / 120),
      "wheelDeltaY" in b && (O = -b.wheelDeltaY / 120),
      "wheelDeltaX" in b && (z = -b.wheelDeltaX / 120),
      "axis" in b && b.axis === b.HORIZONTAL_AXIS && ((z = O), (O = 0)),
      (k = z * 10),
      (E = O * 10),
      "deltaY" in b && (E = b.deltaY),
      "deltaX" in b && (k = b.deltaX),
      b.shiftKey && !k && ((k = E), (E = 0)),
      (k || E) &&
        b.deltaMode &&
        (b.deltaMode === 1 ? ((k *= 40), (E *= 40)) : ((k *= 800), (E *= 800))),
      k && !z && (z = k < 1 ? -1 : 1),
      E && !O && (O = E < 1 ? -1 : 1),
      { spinX: z, spinY: O, pixelX: k, pixelY: E }
    );
  }
  function u() {
    e.enabled && (e.mouseEntered = !0);
  }
  function f() {
    e.enabled && (e.mouseEntered = !1);
  }
  function h(b) {
    return (e.params.mousewheel.thresholdDelta &&
      b.delta < e.params.mousewheel.thresholdDelta) ||
      (e.params.mousewheel.thresholdTime &&
        Q() - a < e.params.mousewheel.thresholdTime)
      ? !1
      : b.delta >= 6 && Q() - a < 60
      ? !0
      : (b.direction < 0
          ? (!e.isEnd || e.params.loop) &&
            !e.animating &&
            (e.slideNext(), s("scroll", b.raw))
          : (!e.isBeginning || e.params.loop) &&
            !e.animating &&
            (e.slidePrev(), s("scroll", b.raw)),
        (a = new n.Date().getTime()),
        !1);
  }
  function p(b) {
    const w = e.params.mousewheel;
    if (b.direction < 0) {
      if (e.isEnd && !e.params.loop && w.releaseOnEdges) return !0;
    } else if (e.isBeginning && !e.params.loop && w.releaseOnEdges) return !0;
    return !1;
  }
  function m(b) {
    let w = b,
      T = !0;
    if (
      !e.enabled ||
      b.target.closest(`.${e.params.mousewheel.noMousewheelClass}`)
    )
      return;
    const C = e.params.mousewheel;
    e.params.cssMode && w.preventDefault();
    let z = e.el;
    e.params.mousewheel.eventsTarget !== "container" &&
      (z = document.querySelector(e.params.mousewheel.eventsTarget));
    const O = z && z.contains(w.target);
    if (!e.mouseEntered && !O && !C.releaseOnEdges) return !0;
    w.originalEvent && (w = w.originalEvent);
    let k = 0;
    const E = e.rtlTranslate ? -1 : 1,
      L = d(w);
    if (C.forceToAxis)
      if (e.isHorizontal())
        if (Math.abs(L.pixelX) > Math.abs(L.pixelY)) k = -L.pixelX * E;
        else return !0;
      else if (Math.abs(L.pixelY) > Math.abs(L.pixelX)) k = -L.pixelY;
      else return !0;
    else
      k = Math.abs(L.pixelX) > Math.abs(L.pixelY) ? -L.pixelX * E : -L.pixelY;
    if (k === 0) return !0;
    C.invert && (k = -k);
    let x = e.getTranslate() + k * C.sensitivity;
    if (
      (x >= e.minTranslate() && (x = e.minTranslate()),
      x <= e.maxTranslate() && (x = e.maxTranslate()),
      (T = e.params.loop
        ? !0
        : !(x === e.minTranslate() || x === e.maxTranslate())),
      T && e.params.nested && w.stopPropagation(),
      !e.params.freeMode || !e.params.freeMode.enabled)
    ) {
      const S = {
        time: Q(),
        delta: Math.abs(k),
        direction: Math.sign(k),
        raw: b,
      };
      c.length >= 2 && c.shift();
      const P = c.length ? c[c.length - 1] : void 0;
      if (
        (c.push(S),
        P
          ? (S.direction !== P.direction ||
              S.delta > P.delta ||
              S.time > P.time + 150) &&
            h(S)
          : h(S),
        p(S))
      )
        return !0;
    } else {
      const S = { time: Q(), delta: Math.abs(k), direction: Math.sign(k) },
        P =
          l &&
          S.time < l.time + 500 &&
          S.delta <= l.delta &&
          S.direction === l.direction;
      if (!P) {
        l = void 0;
        let A = e.getTranslate() + k * C.sensitivity;
        const D = e.isBeginning,
          $ = e.isEnd;
        if (
          (A >= e.minTranslate() && (A = e.minTranslate()),
          A <= e.maxTranslate() && (A = e.maxTranslate()),
          e.setTransition(0),
          e.setTranslate(A),
          e.updateProgress(),
          e.updateActiveIndex(),
          e.updateSlidesClasses(),
          ((!D && e.isBeginning) || (!$ && e.isEnd)) && e.updateSlidesClasses(),
          e.params.loop &&
            e.loopFix({
              direction: S.direction < 0 ? "next" : "prev",
              byMousewheel: !0,
            }),
          e.params.freeMode.sticky)
        ) {
          clearTimeout(r), (r = void 0), c.length >= 15 && c.shift();
          const V = c.length ? c[c.length - 1] : void 0,
            B = c[0];
          if (
            (c.push(S), V && (S.delta > V.delta || S.direction !== V.direction))
          )
            c.splice(0);
          else if (
            c.length >= 15 &&
            S.time - B.time < 500 &&
            B.delta - S.delta >= 1 &&
            S.delta <= 6
          ) {
            const we = k > 0 ? 0.8 : 0.2;
            (l = S),
              c.splice(0),
              (r = Ce(() => {
                e.destroyed ||
                  !e.params ||
                  e.slideToClosest(e.params.speed, !0, void 0, we);
              }, 0));
          }
          r ||
            (r = Ce(() => {
              if (e.destroyed || !e.params) return;
              const we = 0.5;
              (l = S),
                c.splice(0),
                e.slideToClosest(e.params.speed, !0, void 0, we);
            }, 500));
        }
        if (
          (P || s("scroll", w),
          e.params.autoplay &&
            e.params.autoplayDisableOnInteraction &&
            e.autoplay.stop(),
          C.releaseOnEdges &&
            (A === e.minTranslate() || A === e.maxTranslate()))
        )
          return !0;
      }
    }
    return w.preventDefault ? w.preventDefault() : (w.returnValue = !1), !1;
  }
  function v(b) {
    let w = e.el;
    e.params.mousewheel.eventsTarget !== "container" &&
      (w = document.querySelector(e.params.mousewheel.eventsTarget)),
      w[b]("mouseenter", u),
      w[b]("mouseleave", f),
      w[b]("wheel", m);
  }
  function g() {
    return e.params.cssMode
      ? (e.wrapperEl.removeEventListener("wheel", m), !0)
      : e.mousewheel.enabled
      ? !1
      : (v("addEventListener"), (e.mousewheel.enabled = !0), !0);
  }
  function y() {
    return e.params.cssMode
      ? (e.wrapperEl.addEventListener(event, m), !0)
      : e.mousewheel.enabled
      ? (v("removeEventListener"), (e.mousewheel.enabled = !1), !0)
      : !1;
  }
  i("init", () => {
    !e.params.mousewheel.enabled && e.params.cssMode && y(),
      e.params.mousewheel.enabled && g();
  }),
    i("destroy", () => {
      e.params.cssMode && g(), e.mousewheel.enabled && y();
    }),
    Object.assign(e.mousewheel, { enable: g, disable: y });
}
function Ti(o, e, t, i) {
  return (
    o.params.createElements &&
      Object.keys(i).forEach((s) => {
        if (!t[s] && t.auto === !0) {
          let n = se(o.el, `.${i[s]}`)[0];
          n || ((n = ke("div", i[s])), (n.className = i[s]), o.el.append(n)),
            (t[s] = n),
            (e[s] = n);
        }
      }),
    t
  );
}
function Oe(o) {
  let { swiper: e, extendParams: t, on: i, emit: s } = o;
  t({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled",
    },
  }),
    (e.navigation = { nextEl: null, prevEl: null });
  function n(p) {
    let m;
    return p &&
      typeof p == "string" &&
      e.isElement &&
      ((m = e.el.querySelector(p) || e.hostEl.querySelector(p)), m)
      ? m
      : (p &&
          (typeof p == "string" && (m = [...document.querySelectorAll(p)]),
          e.params.uniqueNavElements &&
          typeof p == "string" &&
          m &&
          m.length > 1 &&
          e.el.querySelectorAll(p).length === 1
            ? (m = e.el.querySelector(p))
            : m && m.length === 1 && (m = m[0])),
        p && !m ? p : m);
  }
  function r(p, m) {
    const v = e.params.navigation;
    (p = ie(p)),
      p.forEach((g) => {
        g &&
          (g.classList[m ? "add" : "remove"](...v.disabledClass.split(" ")),
          g.tagName === "BUTTON" && (g.disabled = m),
          e.params.watchOverflow &&
            e.enabled &&
            g.classList[e.isLocked ? "add" : "remove"](v.lockClass));
      });
  }
  function a() {
    const { nextEl: p, prevEl: m } = e.navigation;
    if (e.params.loop) {
      r(m, !1), r(p, !1);
      return;
    }
    r(m, e.isBeginning && !e.params.rewind), r(p, e.isEnd && !e.params.rewind);
  }
  function l(p) {
    p.preventDefault(),
      !(e.isBeginning && !e.params.loop && !e.params.rewind) &&
        (e.slidePrev(), s("navigationPrev"));
  }
  function c(p) {
    p.preventDefault(),
      !(e.isEnd && !e.params.loop && !e.params.rewind) &&
        (e.slideNext(), s("navigationNext"));
  }
  function d() {
    const p = e.params.navigation;
    if (
      ((e.params.navigation = Ti(
        e,
        e.originalParams.navigation,
        e.params.navigation,
        { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
      )),
      !(p.nextEl || p.prevEl))
    )
      return;
    let m = n(p.nextEl),
      v = n(p.prevEl);
    Object.assign(e.navigation, { nextEl: m, prevEl: v }),
      (m = ie(m)),
      (v = ie(v));
    const g = (y, b) => {
      y && y.addEventListener("click", b === "next" ? c : l),
        !e.enabled && y && y.classList.add(...p.lockClass.split(" "));
    };
    m.forEach((y) => g(y, "next")), v.forEach((y) => g(y, "prev"));
  }
  function u() {
    let { nextEl: p, prevEl: m } = e.navigation;
    (p = ie(p)), (m = ie(m));
    const v = (g, y) => {
      g.removeEventListener("click", y === "next" ? c : l),
        g.classList.remove(...e.params.navigation.disabledClass.split(" "));
    };
    p.forEach((g) => v(g, "next")), m.forEach((g) => v(g, "prev"));
  }
  i("init", () => {
    e.params.navigation.enabled === !1 ? h() : (d(), a());
  }),
    i("toEdge fromEdge lock unlock", () => {
      a();
    }),
    i("destroy", () => {
      u();
    }),
    i("enable disable", () => {
      let { nextEl: p, prevEl: m } = e.navigation;
      if (((p = ie(p)), (m = ie(m)), e.enabled)) {
        a();
        return;
      }
      [...p, ...m]
        .filter((v) => !!v)
        .forEach((v) => v.classList.add(e.params.navigation.lockClass));
    }),
    i("click", (p, m) => {
      let { nextEl: v, prevEl: g } = e.navigation;
      (v = ie(v)), (g = ie(g));
      const y = m.target;
      let b = g.includes(y) || v.includes(y);
      if (e.isElement && !b) {
        const w = m.path || (m.composedPath && m.composedPath());
        w && (b = w.find((T) => v.includes(T) || g.includes(T)));
      }
      if (e.params.navigation.hideOnClick && !b) {
        if (
          e.pagination &&
          e.params.pagination &&
          e.params.pagination.clickable &&
          (e.pagination.el === y || e.pagination.el.contains(y))
        )
          return;
        let w;
        v.length
          ? (w = v[0].classList.contains(e.params.navigation.hiddenClass))
          : g.length &&
            (w = g[0].classList.contains(e.params.navigation.hiddenClass)),
          s(w === !0 ? "navigationShow" : "navigationHide"),
          [...v, ...g]
            .filter((T) => !!T)
            .forEach((T) =>
              T.classList.toggle(e.params.navigation.hiddenClass)
            );
      }
    });
  const f = () => {
      e.el.classList.remove(
        ...e.params.navigation.navigationDisabledClass.split(" ")
      ),
        d(),
        a();
    },
    h = () => {
      e.el.classList.add(
        ...e.params.navigation.navigationDisabledClass.split(" ")
      ),
        u();
    };
  Object.assign(e.navigation, {
    enable: f,
    disable: h,
    update: a,
    init: d,
    destroy: u,
  });
}
function hn(o) {
  return (
    o === void 0 && (o = ""),
    `.${o
      .trim()
      .replace(/([\.:!+\/])/g, "\\$1")
      .replace(/ /g, ".")}`
  );
}
function lt(o) {
  let { swiper: e, extendParams: t, on: i, emit: s } = o;
  const n = ce();
  let r = !1,
    a = null,
    l = null,
    c,
    d,
    u,
    f;
  t({
    scrollbar: {
      el: null,
      dragSize: "auto",
      hide: !1,
      draggable: !1,
      snapOnRelease: !0,
      lockClass: "swiper-scrollbar-lock",
      dragClass: "swiper-scrollbar-drag",
      scrollbarDisabledClass: "swiper-scrollbar-disabled",
      horizontalClass: "swiper-scrollbar-horizontal",
      verticalClass: "swiper-scrollbar-vertical",
    },
  }),
    (e.scrollbar = { el: null, dragEl: null });
  function h() {
    if (!e.params.scrollbar.el || !e.scrollbar.el) return;
    const { scrollbar: x, rtlTranslate: S } = e,
      { dragEl: P, el: A } = x,
      D = e.params.scrollbar,
      $ = e.params.loop ? e.progressLoop : e.progress;
    let V = d,
      B = (u - d) * $;
    S
      ? ((B = -B), B > 0 ? ((V = d - B), (B = 0)) : -B + d > u && (V = u + B))
      : B < 0
      ? ((V = d + B), (B = 0))
      : B + d > u && (V = u - B),
      e.isHorizontal()
        ? ((P.style.transform = `translate3d(${B}px, 0, 0)`),
          (P.style.width = `${V}px`))
        : ((P.style.transform = `translate3d(0px, ${B}px, 0)`),
          (P.style.height = `${V}px`)),
      D.hide &&
        (clearTimeout(a),
        (A.style.opacity = 1),
        (a = setTimeout(() => {
          (A.style.opacity = 0), (A.style.transitionDuration = "400ms");
        }, 1e3)));
  }
  function p(x) {
    !e.params.scrollbar.el ||
      !e.scrollbar.el ||
      (e.scrollbar.dragEl.style.transitionDuration = `${x}ms`);
  }
  function m() {
    if (!e.params.scrollbar.el || !e.scrollbar.el) return;
    const { scrollbar: x } = e,
      { dragEl: S, el: P } = x;
    (S.style.width = ""),
      (S.style.height = ""),
      (u = e.isHorizontal() ? P.offsetWidth : P.offsetHeight),
      (f =
        e.size /
        (e.virtualSize +
          e.params.slidesOffsetBefore -
          (e.params.centeredSlides ? e.snapGrid[0] : 0))),
      e.params.scrollbar.dragSize === "auto"
        ? (d = u * f)
        : (d = parseInt(e.params.scrollbar.dragSize, 10)),
      e.isHorizontal()
        ? (S.style.width = `${d}px`)
        : (S.style.height = `${d}px`),
      f >= 1 ? (P.style.display = "none") : (P.style.display = ""),
      e.params.scrollbar.hide && (P.style.opacity = 0),
      e.params.watchOverflow &&
        e.enabled &&
        x.el.classList[e.isLocked ? "add" : "remove"](
          e.params.scrollbar.lockClass
        );
  }
  function v(x) {
    return e.isHorizontal() ? x.clientX : x.clientY;
  }
  function g(x) {
    const { scrollbar: S, rtlTranslate: P } = e,
      { el: A } = S;
    let D;
    (D =
      (v(x) -
        Ki(A)[e.isHorizontal() ? "left" : "top"] -
        (c !== null ? c : d / 2)) /
      (u - d)),
      (D = Math.max(Math.min(D, 1), 0)),
      P && (D = 1 - D);
    const $ = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * D;
    e.updateProgress($),
      e.setTranslate($),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
  }
  function y(x) {
    const S = e.params.scrollbar,
      { scrollbar: P, wrapperEl: A } = e,
      { el: D, dragEl: $ } = P;
    (r = !0),
      (c =
        x.target === $
          ? v(x) -
            x.target.getBoundingClientRect()[e.isHorizontal() ? "left" : "top"]
          : null),
      x.preventDefault(),
      x.stopPropagation(),
      (A.style.transitionDuration = "100ms"),
      ($.style.transitionDuration = "100ms"),
      g(x),
      clearTimeout(l),
      (D.style.transitionDuration = "0ms"),
      S.hide && (D.style.opacity = 1),
      e.params.cssMode && (e.wrapperEl.style["scroll-snap-type"] = "none"),
      s("scrollbarDragStart", x);
  }
  function b(x) {
    const { scrollbar: S, wrapperEl: P } = e,
      { el: A, dragEl: D } = S;
    r &&
      (x.preventDefault && x.cancelable
        ? x.preventDefault()
        : (x.returnValue = !1),
      g(x),
      (P.style.transitionDuration = "0ms"),
      (A.style.transitionDuration = "0ms"),
      (D.style.transitionDuration = "0ms"),
      s("scrollbarDragMove", x));
  }
  function w(x) {
    const S = e.params.scrollbar,
      { scrollbar: P, wrapperEl: A } = e,
      { el: D } = P;
    r &&
      ((r = !1),
      e.params.cssMode &&
        ((e.wrapperEl.style["scroll-snap-type"] = ""),
        (A.style.transitionDuration = "")),
      S.hide &&
        (clearTimeout(l),
        (l = Ce(() => {
          (D.style.opacity = 0), (D.style.transitionDuration = "400ms");
        }, 1e3))),
      s("scrollbarDragEnd", x),
      S.snapOnRelease && e.slideToClosest());
  }
  function T(x) {
    const { scrollbar: S, params: P } = e,
      A = S.el;
    if (!A) return;
    const D = A,
      $ = P.passiveListeners ? { passive: !1, capture: !1 } : !1,
      V = P.passiveListeners ? { passive: !0, capture: !1 } : !1;
    if (!D) return;
    const B = x === "on" ? "addEventListener" : "removeEventListener";
    D[B]("pointerdown", y, $),
      n[B]("pointermove", b, $),
      n[B]("pointerup", w, V);
  }
  function C() {
    !e.params.scrollbar.el || !e.scrollbar.el || T("on");
  }
  function z() {
    !e.params.scrollbar.el || !e.scrollbar.el || T("off");
  }
  function O() {
    const { scrollbar: x, el: S } = e;
    e.params.scrollbar = Ti(e, e.originalParams.scrollbar, e.params.scrollbar, {
      el: "swiper-scrollbar",
    });
    const P = e.params.scrollbar;
    if (!P.el) return;
    let A;
    if (
      (typeof P.el == "string" && e.isElement && (A = e.el.querySelector(P.el)),
      !A && typeof P.el == "string")
    ) {
      if (((A = n.querySelectorAll(P.el)), !A.length)) return;
    } else A || (A = P.el);
    e.params.uniqueNavElements &&
      typeof P.el == "string" &&
      A.length > 1 &&
      S.querySelectorAll(P.el).length === 1 &&
      (A = S.querySelector(P.el)),
      A.length > 0 && (A = A[0]),
      A.classList.add(e.isHorizontal() ? P.horizontalClass : P.verticalClass);
    let D;
    A &&
      ((D = A.querySelector(hn(e.params.scrollbar.dragClass))),
      D || ((D = ke("div", e.params.scrollbar.dragClass)), A.append(D))),
      Object.assign(x, { el: A, dragEl: D }),
      P.draggable && C(),
      A &&
        A.classList[e.enabled ? "remove" : "add"](
          ...ue(e.params.scrollbar.lockClass)
        );
  }
  function k() {
    const x = e.params.scrollbar,
      S = e.scrollbar.el;
    S &&
      S.classList.remove(
        ...ue(e.isHorizontal() ? x.horizontalClass : x.verticalClass)
      ),
      z();
  }
  i("changeDirection", () => {
    if (!e.scrollbar || !e.scrollbar.el) return;
    const x = e.params.scrollbar;
    let { el: S } = e.scrollbar;
    (S = ie(S)),
      S.forEach((P) => {
        P.classList.remove(x.horizontalClass, x.verticalClass),
          P.classList.add(
            e.isHorizontal() ? x.horizontalClass : x.verticalClass
          );
      });
  }),
    i("init", () => {
      e.params.scrollbar.enabled === !1 ? L() : (O(), m(), h());
    }),
    i("update resize observerUpdate lock unlock changeDirection", () => {
      m();
    }),
    i("setTranslate", () => {
      h();
    }),
    i("setTransition", (x, S) => {
      p(S);
    }),
    i("enable disable", () => {
      const { el: x } = e.scrollbar;
      x &&
        x.classList[e.enabled ? "remove" : "add"](
          ...ue(e.params.scrollbar.lockClass)
        );
    }),
    i("destroy", () => {
      k();
    });
  const E = () => {
      e.el.classList.remove(...ue(e.params.scrollbar.scrollbarDisabledClass)),
        e.scrollbar.el &&
          e.scrollbar.el.classList.remove(
            ...ue(e.params.scrollbar.scrollbarDisabledClass)
          ),
        O(),
        m(),
        h();
    },
    L = () => {
      e.el.classList.add(...ue(e.params.scrollbar.scrollbarDisabledClass)),
        e.scrollbar.el &&
          e.scrollbar.el.classList.add(
            ...ue(e.params.scrollbar.scrollbarDisabledClass)
          ),
        k();
    };
  Object.assign(e.scrollbar, {
    enable: E,
    disable: L,
    updateSize: m,
    setTranslate: h,
    init: O,
    destroy: k,
  });
}
function ct(o) {
  let { swiper: e, extendParams: t, emit: i, once: s } = o;
  t({
    freeMode: {
      enabled: !1,
      momentum: !0,
      momentumRatio: 1,
      momentumBounce: !0,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: !1,
      minimumVelocity: 0.02,
    },
  });
  function n() {
    if (e.params.cssMode) return;
    const l = e.getTranslate();
    e.setTranslate(l),
      e.setTransition(0),
      (e.touchEventsData.velocities.length = 0),
      e.freeMode.onTouchEnd({ currentPos: e.rtl ? e.translate : -e.translate });
  }
  function r() {
    if (e.params.cssMode) return;
    const { touchEventsData: l, touches: c } = e;
    l.velocities.length === 0 &&
      l.velocities.push({
        position: c[e.isHorizontal() ? "startX" : "startY"],
        time: l.touchStartTime,
      }),
      l.velocities.push({
        position: c[e.isHorizontal() ? "currentX" : "currentY"],
        time: Q(),
      });
  }
  function a(l) {
    let { currentPos: c } = l;
    if (e.params.cssMode) return;
    const {
        params: d,
        wrapperEl: u,
        rtlTranslate: f,
        snapGrid: h,
        touchEventsData: p,
      } = e,
      v = Q() - p.touchStartTime;
    if (c < -e.minTranslate()) {
      e.slideTo(e.activeIndex);
      return;
    }
    if (c > -e.maxTranslate()) {
      e.slides.length < h.length
        ? e.slideTo(h.length - 1)
        : e.slideTo(e.slides.length - 1);
      return;
    }
    if (d.freeMode.momentum) {
      if (p.velocities.length > 1) {
        const O = p.velocities.pop(),
          k = p.velocities.pop(),
          E = O.position - k.position,
          L = O.time - k.time;
        (e.velocity = E / L),
          (e.velocity /= 2),
          Math.abs(e.velocity) < d.freeMode.minimumVelocity && (e.velocity = 0),
          (L > 150 || Q() - O.time > 300) && (e.velocity = 0);
      } else e.velocity = 0;
      (e.velocity *= d.freeMode.momentumVelocityRatio),
        (p.velocities.length = 0);
      let g = 1e3 * d.freeMode.momentumRatio;
      const y = e.velocity * g;
      let b = e.translate + y;
      f && (b = -b);
      let w = !1,
        T;
      const C = Math.abs(e.velocity) * 20 * d.freeMode.momentumBounceRatio;
      let z;
      if (b < e.maxTranslate())
        d.freeMode.momentumBounce
          ? (b + e.maxTranslate() < -C && (b = e.maxTranslate() - C),
            (T = e.maxTranslate()),
            (w = !0),
            (p.allowMomentumBounce = !0))
          : (b = e.maxTranslate()),
          d.loop && d.centeredSlides && (z = !0);
      else if (b > e.minTranslate())
        d.freeMode.momentumBounce
          ? (b - e.minTranslate() > C && (b = e.minTranslate() + C),
            (T = e.minTranslate()),
            (w = !0),
            (p.allowMomentumBounce = !0))
          : (b = e.minTranslate()),
          d.loop && d.centeredSlides && (z = !0);
      else if (d.freeMode.sticky) {
        let O;
        for (let k = 0; k < h.length; k += 1)
          if (h[k] > -b) {
            O = k;
            break;
          }
        Math.abs(h[O] - b) < Math.abs(h[O - 1] - b) ||
        e.swipeDirection === "next"
          ? (b = h[O])
          : (b = h[O - 1]),
          (b = -b);
      }
      if (
        (z &&
          s("transitionEnd", () => {
            e.loopFix();
          }),
        e.velocity !== 0)
      ) {
        if (
          (f
            ? (g = Math.abs((-b - e.translate) / e.velocity))
            : (g = Math.abs((b - e.translate) / e.velocity)),
          d.freeMode.sticky)
        ) {
          const O = Math.abs((f ? -b : b) - e.translate),
            k = e.slidesSizesGrid[e.activeIndex];
          O < k
            ? (g = d.speed)
            : O < 2 * k
            ? (g = d.speed * 1.5)
            : (g = d.speed * 2.5);
        }
      } else if (d.freeMode.sticky) {
        e.slideToClosest();
        return;
      }
      d.freeMode.momentumBounce && w
        ? (e.updateProgress(T),
          e.setTransition(g),
          e.setTranslate(b),
          e.transitionStart(!0, e.swipeDirection),
          (e.animating = !0),
          Qe(u, () => {
            !e ||
              e.destroyed ||
              !p.allowMomentumBounce ||
              (i("momentumBounce"),
              e.setTransition(d.speed),
              setTimeout(() => {
                e.setTranslate(T),
                  Qe(u, () => {
                    !e || e.destroyed || e.transitionEnd();
                  });
              }, 0));
          }))
        : e.velocity
        ? (i("_freeModeNoMomentumRelease"),
          e.updateProgress(b),
          e.setTransition(g),
          e.setTranslate(b),
          e.transitionStart(!0, e.swipeDirection),
          e.animating ||
            ((e.animating = !0),
            Qe(u, () => {
              !e || e.destroyed || e.transitionEnd();
            })))
        : e.updateProgress(b),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
    } else if (d.freeMode.sticky) {
      e.slideToClosest();
      return;
    } else d.freeMode && i("_freeModeNoMomentumRelease");
    (!d.freeMode.momentum || v >= d.longSwipesMs) &&
      (i("_freeModeStaticRelease"),
      e.updateProgress(),
      e.updateActiveIndex(),
      e.updateSlidesClasses());
  }
  Object.assign(e, {
    freeMode: { onTouchStart: n, onTouchMove: r, onTouchEnd: a },
  });
}
const M = (o, e = 1e4) => (
    (o = parseFloat(o + "") || 0), Math.round((o + Number.EPSILON) * e) / e
  ),
  Ct = function (o) {
    if (!(o && o instanceof Element && o.offsetParent)) return !1;
    const e = o.scrollHeight > o.clientHeight,
      t = window.getComputedStyle(o).overflowY,
      i = t.indexOf("hidden") !== -1,
      s = t.indexOf("visible") !== -1;
    return e && !i && !s;
  },
  Ue = function (o, e = void 0) {
    return (
      !(!o || o === document.body || (e && o === e)) &&
      (Ct(o) ? o : Ue(o.parentElement, e))
    );
  },
  ne = function (o) {
    var e = new DOMParser().parseFromString(o, "text/html").body;
    if (e.childElementCount > 1) {
      for (var t = document.createElement("div"); e.firstChild; )
        t.appendChild(e.firstChild);
      return t;
    }
    return e.firstChild;
  },
  It = (o) => `${o || ""}`.split(" ").filter((e) => !!e),
  oe = (o, e, t) => {
    o &&
      It(e).forEach((i) => {
        o.classList.toggle(i, t || !1);
      });
  };
class Se {
  constructor(e) {
    Object.defineProperty(this, "pageX", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0,
    }),
      Object.defineProperty(this, "pageY", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "clientX", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "clientY", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "id", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "time", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "nativePointer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.nativePointer = e),
      (this.pageX = e.pageX),
      (this.pageY = e.pageY),
      (this.clientX = e.clientX),
      (this.clientY = e.clientY),
      (this.id = self.Touch && e instanceof Touch ? e.identifier : -1),
      (this.time = Date.now());
  }
}
const xe = { passive: !1 };
class fn {
  constructor(
    e,
    { start: t = () => !0, move: i = () => {}, end: s = () => {} }
  ) {
    Object.defineProperty(this, "element", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0,
    }),
      Object.defineProperty(this, "startCallback", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "moveCallback", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "endCallback", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "currentPointers", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      Object.defineProperty(this, "startPointers", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      (this.element = e),
      (this.startCallback = t),
      (this.moveCallback = i),
      (this.endCallback = s);
    for (const n of [
      "onPointerStart",
      "onTouchStart",
      "onMove",
      "onTouchEnd",
      "onPointerEnd",
      "onWindowBlur",
    ])
      this[n] = this[n].bind(this);
    this.element.addEventListener("mousedown", this.onPointerStart, xe),
      this.element.addEventListener("touchstart", this.onTouchStart, xe),
      this.element.addEventListener("touchmove", this.onMove, xe),
      this.element.addEventListener("touchend", this.onTouchEnd),
      this.element.addEventListener("touchcancel", this.onTouchEnd);
  }
  onPointerStart(e) {
    if (!e.buttons || e.button !== 0) return;
    const t = new Se(e);
    this.currentPointers.some((i) => i.id === t.id) ||
      (this.triggerPointerStart(t, e) &&
        (window.addEventListener("mousemove", this.onMove),
        window.addEventListener("mouseup", this.onPointerEnd),
        window.addEventListener("blur", this.onWindowBlur)));
  }
  onTouchStart(e) {
    for (const t of Array.from(e.changedTouches || []))
      this.triggerPointerStart(new Se(t), e);
    window.addEventListener("blur", this.onWindowBlur);
  }
  onMove(e) {
    const t = this.currentPointers.slice(),
      i =
        "changedTouches" in e
          ? Array.from(e.changedTouches || []).map((n) => new Se(n))
          : [new Se(e)],
      s = [];
    for (const n of i) {
      const r = this.currentPointers.findIndex((a) => a.id === n.id);
      r < 0 || (s.push(n), (this.currentPointers[r] = n));
    }
    s.length && this.moveCallback(e, this.currentPointers.slice(), t);
  }
  onPointerEnd(e) {
    (e.buttons > 0 && e.button !== 0) ||
      (this.triggerPointerEnd(e, new Se(e)),
      window.removeEventListener("mousemove", this.onMove),
      window.removeEventListener("mouseup", this.onPointerEnd),
      window.removeEventListener("blur", this.onWindowBlur));
  }
  onTouchEnd(e) {
    for (const t of Array.from(e.changedTouches || []))
      this.triggerPointerEnd(e, new Se(t));
  }
  triggerPointerStart(e, t) {
    return (
      !!this.startCallback(t, e, this.currentPointers.slice()) &&
      (this.currentPointers.push(e), this.startPointers.push(e), !0)
    );
  }
  triggerPointerEnd(e, t) {
    const i = this.currentPointers.findIndex((s) => s.id === t.id);
    i < 0 ||
      (this.currentPointers.splice(i, 1),
      this.startPointers.splice(i, 1),
      this.endCallback(e, t, this.currentPointers.slice()));
  }
  onWindowBlur() {
    this.clear();
  }
  clear() {
    for (; this.currentPointers.length; ) {
      const e = this.currentPointers[this.currentPointers.length - 1];
      this.currentPointers.splice(this.currentPointers.length - 1, 1),
        this.startPointers.splice(this.currentPointers.length - 1, 1),
        this.endCallback(
          new Event("touchend", {
            bubbles: !0,
            cancelable: !0,
            clientX: e.clientX,
            clientY: e.clientY,
          }),
          e,
          this.currentPointers.slice()
        );
    }
  }
  stop() {
    this.element.removeEventListener("mousedown", this.onPointerStart, xe),
      this.element.removeEventListener("touchstart", this.onTouchStart, xe),
      this.element.removeEventListener("touchmove", this.onMove, xe),
      this.element.removeEventListener("touchend", this.onTouchEnd),
      this.element.removeEventListener("touchcancel", this.onTouchEnd),
      window.removeEventListener("mousemove", this.onMove),
      window.removeEventListener("mouseup", this.onPointerEnd),
      window.removeEventListener("blur", this.onWindowBlur);
  }
}
function Vt(o, e) {
  return e
    ? Math.sqrt(
        Math.pow(e.clientX - o.clientX, 2) + Math.pow(e.clientY - o.clientY, 2)
      )
    : 0;
}
function $t(o, e) {
  return e
    ? {
        clientX: (o.clientX + e.clientX) / 2,
        clientY: (o.clientY + e.clientY) / 2,
      }
    : o;
}
const Ot = (o) =>
    typeof o == "object" &&
    o !== null &&
    o.constructor === Object &&
    Object.prototype.toString.call(o) === "[object Object]",
  q = (o, ...e) => {
    const t = e.length;
    for (let i = 0; i < t; i++) {
      const s = e[i] || {};
      Object.entries(s).forEach(([n, r]) => {
        const a = Array.isArray(r) ? [] : {};
        o[n] || Object.assign(o, { [n]: a }),
          Ot(r)
            ? Object.assign(o[n], q(a, r))
            : Array.isArray(r)
            ? Object.assign(o, { [n]: [...r] })
            : Object.assign(o, { [n]: r });
      });
    }
    return o;
  },
  dt = function (o, e) {
    return o
      .split(".")
      .reduce((t, i) => (typeof t == "object" ? t[i] : void 0), e);
  };
class Ke {
  constructor(e = {}) {
    Object.defineProperty(this, "options", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: e,
    }),
      Object.defineProperty(this, "events", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Map(),
      }),
      this.setOptions(e);
    for (const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))
      t.startsWith("on") &&
        typeof this[t] == "function" &&
        (this[t] = this[t].bind(this));
  }
  setOptions(e) {
    this.options = e ? q({}, this.constructor.defaults, e) : {};
    for (const [t, i] of Object.entries(this.option("on") || {})) this.on(t, i);
  }
  option(e, ...t) {
    let i = dt(e, this.options);
    return i && typeof i == "function" && (i = i.call(this, this, ...t)), i;
  }
  optionFor(e, t, i, ...s) {
    let n = dt(t, e);
    var r;
    typeof (r = n) != "string" ||
      isNaN(r) ||
      isNaN(parseFloat(r)) ||
      (n = parseFloat(n)),
      n === "true" && (n = !0),
      n === "false" && (n = !1),
      n && typeof n == "function" && (n = n.call(this, this, e, ...s));
    let a = dt(t, this.options);
    return (
      a && typeof a == "function"
        ? (n = a.call(this, this, e, ...s, n))
        : n === void 0 && (n = a),
      n === void 0 ? i : n
    );
  }
  cn(e) {
    const t = this.options.classes;
    return (t && t[e]) || "";
  }
  localize(e, t = []) {
    e = String(e).replace(/\{\{(\w+).?(\w+)?\}\}/g, (i, s, n) => {
      let r = "";
      return (
        n
          ? (r = this.option(
              `${s[0] + s.toLowerCase().substring(1)}.l10n.${n}`
            ))
          : s && (r = this.option(`l10n.${s}`)),
        r || (r = i),
        r
      );
    });
    for (let i = 0; i < t.length; i++) e = e.split(t[i][0]).join(t[i][1]);
    return (e = e.replace(/\{\{(.*?)\}\}/g, (i, s) => s));
  }
  on(e, t) {
    let i = [];
    typeof e == "string" ? (i = e.split(" ")) : Array.isArray(e) && (i = e),
      this.events || (this.events = new Map()),
      i.forEach((s) => {
        let n = this.events.get(s);
        n || (this.events.set(s, []), (n = [])),
          n.includes(t) || n.push(t),
          this.events.set(s, n);
      });
  }
  off(e, t) {
    let i = [];
    typeof e == "string" ? (i = e.split(" ")) : Array.isArray(e) && (i = e),
      i.forEach((s) => {
        const n = this.events.get(s);
        if (Array.isArray(n)) {
          const r = n.indexOf(t);
          r > -1 && n.splice(r, 1);
        }
      });
  }
  emit(e, ...t) {
    [...(this.events.get(e) || [])].forEach((i) => i(this, ...t)),
      e !== "*" && this.emit("*", e, ...t);
  }
}
Object.defineProperty(Ke, "version", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: "5.0.36",
}),
  Object.defineProperty(Ke, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {},
  });
class zt extends Ke {
  constructor(e = {}) {
    super(e),
      Object.defineProperty(this, "plugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {},
      });
  }
  attachPlugins(e = {}) {
    const t = new Map();
    for (const [i, s] of Object.entries(e)) {
      const n = this.option(i),
        r = this.plugins[i];
      r || n === !1
        ? r && n === !1 && (r.detach(), delete this.plugins[i])
        : t.set(i, new s(this, n || {}));
    }
    for (const [i, s] of t) (this.plugins[i] = s), s.attach();
  }
  detachPlugins(e) {
    e = e || Object.keys(this.plugins);
    for (const t of e) {
      const i = this.plugins[t];
      i && i.detach(), delete this.plugins[t];
    }
    return this.emit("detachPlugins"), this;
  }
}
var j;
(function (o) {
  (o[(o.Init = 0)] = "Init"),
    (o[(o.Error = 1)] = "Error"),
    (o[(o.Ready = 2)] = "Ready"),
    (o[(o.Panning = 3)] = "Panning"),
    (o[(o.Mousemove = 4)] = "Mousemove"),
    (o[(o.Destroy = 5)] = "Destroy");
})(j || (j = {}));
const re = ["a", "b", "c", "d", "e", "f"],
  Ei = {
    PANUP: "Move up",
    PANDOWN: "Move down",
    PANLEFT: "Move left",
    PANRIGHT: "Move right",
    ZOOMIN: "Zoom in",
    ZOOMOUT: "Zoom out",
    TOGGLEZOOM: "Toggle zoom level",
    TOGGLE1TO1: "Toggle zoom level",
    ITERATEZOOM: "Toggle zoom level",
    ROTATECCW: "Rotate counterclockwise",
    ROTATECW: "Rotate clockwise",
    FLIPX: "Flip horizontally",
    FLIPY: "Flip vertically",
    FITX: "Fit horizontally",
    FITY: "Fit vertically",
    RESET: "Reset",
    TOGGLEFS: "Toggle fullscreen",
  },
  pn = {
    content: null,
    width: "auto",
    height: "auto",
    panMode: "drag",
    touch: !0,
    dragMinThreshold: 3,
    lockAxis: !1,
    mouseMoveFactor: 1,
    mouseMoveFriction: 0.12,
    zoom: !0,
    pinchToZoom: !0,
    panOnlyZoomed: "auto",
    minScale: 1,
    maxScale: 2,
    friction: 0.25,
    dragFriction: 0.35,
    decelFriction: 0.05,
    click: "toggleZoom",
    dblClick: !1,
    wheel: "zoom",
    wheelLimit: 7,
    spinner: !0,
    bounds: "auto",
    infinite: !1,
    rubberband: !0,
    bounce: !0,
    maxVelocity: 75,
    transformParent: !1,
    classes: {
      content: "f-panzoom__content",
      isLoading: "is-loading",
      canZoomIn: "can-zoom_in",
      canZoomOut: "can-zoom_out",
      isDraggable: "is-draggable",
      isDragging: "is-dragging",
      inFullscreen: "in-fullscreen",
      htmlHasFullscreen: "with-panzoom-in-fullscreen",
    },
    l10n: Ei,
  },
  Gt = '<circle cx="25" cy="25" r="20"></circle>',
  kt =
    '<div class="f-spinner"><svg viewBox="0 0 50 50">' +
    Gt +
    Gt +
    "</svg></div>",
  X = (o) => o && o !== null && o instanceof Element && "nodeType" in o,
  F = (o, e) => {
    o &&
      It(e).forEach((t) => {
        o.classList.remove(t);
      });
  },
  I = (o, e) => {
    o &&
      It(e).forEach((t) => {
        o.classList.add(t);
      });
  },
  Fe = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
  mn = 1e5,
  je = 1e4,
  Z = "mousemove",
  Wt = "drag",
  Xt = "content",
  U = "auto";
let ut = null,
  ht = null;
class ye extends zt {
  get fits() {
    return (
      this.contentRect.width - this.contentRect.fitWidth < 1 &&
      this.contentRect.height - this.contentRect.fitHeight < 1
    );
  }
  get isTouchDevice() {
    return ht === null && (ht = window.matchMedia("(hover: none)").matches), ht;
  }
  get isMobile() {
    return (
      ut === null &&
        (ut = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)),
      ut
    );
  }
  get panMode() {
    return this.options.panMode !== Z || this.isTouchDevice ? Wt : Z;
  }
  get panOnlyZoomed() {
    const e = this.options.panOnlyZoomed;
    return e === U ? this.isTouchDevice : e;
  }
  get isInfinite() {
    return this.option("infinite");
  }
  get angle() {
    return (180 * Math.atan2(this.current.b, this.current.a)) / Math.PI || 0;
  }
  get targetAngle() {
    return (180 * Math.atan2(this.target.b, this.target.a)) / Math.PI || 0;
  }
  get scale() {
    const { a: e, b: t } = this.current;
    return Math.sqrt(e * e + t * t) || 1;
  }
  get targetScale() {
    const { a: e, b: t } = this.target;
    return Math.sqrt(e * e + t * t) || 1;
  }
  get minScale() {
    return this.option("minScale") || 1;
  }
  get fullScale() {
    const { contentRect: e } = this;
    return e.fullWidth / e.fitWidth || 1;
  }
  get maxScale() {
    return this.fullScale * (this.option("maxScale") || 1) || 1;
  }
  get coverScale() {
    const { containerRect: e, contentRect: t } = this,
      i = Math.max(e.height / t.fitHeight, e.width / t.fitWidth) || 1;
    return Math.min(this.fullScale, i);
  }
  get isScaling() {
    return Math.abs(this.targetScale - this.scale) > 1e-5 && !this.isResting;
  }
  get isContentLoading() {
    const e = this.content;
    return !!(e && e instanceof HTMLImageElement) && !e.complete;
  }
  get isResting() {
    if (this.isBouncingX || this.isBouncingY) return !1;
    for (const e of re) {
      const t = e == "e" || e === "f" ? 1e-4 : 1e-5;
      if (Math.abs(this.target[e] - this.current[e]) > t) return !1;
    }
    return !(!this.ignoreBounds && !this.checkBounds().inBounds);
  }
  constructor(e, t = {}, i = {}) {
    var s;
    if (
      (super(t),
      Object.defineProperty(this, "pointerTracker", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "resizeObserver", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "updateTimer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "clickTimer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "rAF", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "isTicking", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "ignoreBounds", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "isBouncingX", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "isBouncingY", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "clicks", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "trackingPoints", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      Object.defineProperty(this, "pwt", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "cwd", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "pmme", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "friction", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: j.Init,
      }),
      Object.defineProperty(this, "isDragging", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "content", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "spinner", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "containerRect", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: { width: 0, height: 0, innerWidth: 0, innerHeight: 0 },
      }),
      Object.defineProperty(this, "contentRect", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          fullWidth: 0,
          fullHeight: 0,
          fitWidth: 0,
          fitHeight: 0,
          width: 0,
          height: 0,
        },
      }),
      Object.defineProperty(this, "dragStart", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: { x: 0, y: 0, top: 0, left: 0, time: 0 },
      }),
      Object.defineProperty(this, "dragOffset", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: { x: 0, y: 0, time: 0 },
      }),
      Object.defineProperty(this, "current", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Object.assign({}, Fe),
      }),
      Object.defineProperty(this, "target", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Object.assign({}, Fe),
      }),
      Object.defineProperty(this, "velocity", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 },
      }),
      Object.defineProperty(this, "lockedAxis", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      !e)
    )
      throw new Error("Container Element Not Found");
    (this.container = e),
      this.initContent(),
      this.attachPlugins(Object.assign(Object.assign({}, ye.Plugins), i)),
      this.emit("attachPlugins"),
      this.emit("init");
    const n = this.content;
    if (
      (n.addEventListener("load", this.onLoad),
      n.addEventListener("error", this.onError),
      this.isContentLoading)
    ) {
      if (this.option("spinner")) {
        e.classList.add(this.cn("isLoading"));
        const r = ne(kt);
        !e.contains(n) || n.parentElement instanceof HTMLPictureElement
          ? (this.spinner = e.appendChild(r))
          : (this.spinner =
              ((s = n.parentElement) === null || s === void 0
                ? void 0
                : s.insertBefore(r, n)) || null);
      }
      this.emit("beforeLoad");
    } else
      queueMicrotask(() => {
        this.enable();
      });
  }
  initContent() {
    const { container: e } = this,
      t = this.cn(Xt);
    let i = this.option(Xt) || e.querySelector(`.${t}`);
    if (
      (i ||
        ((i = e.querySelector("img,picture") || e.firstElementChild),
        i && I(i, t)),
      i instanceof HTMLPictureElement && (i = i.querySelector("img")),
      !i)
    )
      throw new Error("No content found");
    this.content = i;
  }
  onLoad() {
    const { spinner: e, container: t, state: i } = this;
    e && (e.remove(), (this.spinner = null)),
      this.option("spinner") && t.classList.remove(this.cn("isLoading")),
      this.emit("afterLoad"),
      i === j.Init ? this.enable() : this.updateMetrics();
  }
  onError() {
    this.state !== j.Destroy &&
      (this.spinner && (this.spinner.remove(), (this.spinner = null)),
      this.stop(),
      this.detachEvents(),
      (this.state = j.Error),
      this.emit("error"));
  }
  getNextScale(e) {
    const {
      fullScale: t,
      targetScale: i,
      coverScale: s,
      maxScale: n,
      minScale: r,
    } = this;
    let a = r;
    switch (e) {
      case "toggleMax":
        a = i - r < 0.5 * (n - r) ? n : r;
        break;
      case "toggleCover":
        a = i - r < 0.5 * (s - r) ? s : r;
        break;
      case "toggleZoom":
        a = i - r < 0.5 * (t - r) ? t : r;
        break;
      case "iterateZoom":
        let l = [1, t, n].sort((d, u) => d - u),
          c = l.findIndex((d) => d > i + 1e-5);
        a = l[c] || 1;
    }
    return a;
  }
  attachObserver() {
    var e;
    const t = () => {
      const { container: i, containerRect: s } = this;
      return (
        Math.abs(s.width - i.getBoundingClientRect().width) > 0.1 ||
        Math.abs(s.height - i.getBoundingClientRect().height) > 0.1
      );
    };
    this.resizeObserver ||
      window.ResizeObserver === void 0 ||
      (this.resizeObserver = new ResizeObserver(() => {
        this.updateTimer ||
          (t()
            ? (this.onResize(),
              this.isMobile &&
                (this.updateTimer = setTimeout(() => {
                  t() && this.onResize(), (this.updateTimer = null);
                }, 500)))
            : this.updateTimer &&
              (clearTimeout(this.updateTimer), (this.updateTimer = null)));
      })),
      (e = this.resizeObserver) === null ||
        e === void 0 ||
        e.observe(this.container);
  }
  detachObserver() {
    var e;
    (e = this.resizeObserver) === null || e === void 0 || e.disconnect();
  }
  attachEvents() {
    const { container: e } = this;
    e.addEventListener("click", this.onClick, { passive: !1, capture: !1 }),
      e.addEventListener("wheel", this.onWheel, { passive: !1 }),
      (this.pointerTracker = new fn(e, {
        start: this.onPointerDown,
        move: this.onPointerMove,
        end: this.onPointerUp,
      })),
      document.addEventListener(Z, this.onMouseMove);
  }
  detachEvents() {
    var e;
    const { container: t } = this;
    t.removeEventListener("click", this.onClick, { passive: !1, capture: !1 }),
      t.removeEventListener("wheel", this.onWheel, { passive: !1 }),
      (e = this.pointerTracker) === null || e === void 0 || e.stop(),
      (this.pointerTracker = null),
      document.removeEventListener(Z, this.onMouseMove),
      document.removeEventListener("keydown", this.onKeydown, !0),
      this.clickTimer &&
        (clearTimeout(this.clickTimer), (this.clickTimer = null)),
      this.updateTimer &&
        (clearTimeout(this.updateTimer), (this.updateTimer = null));
  }
  animate() {
    this.setTargetForce();
    const e = this.friction,
      t = this.option("maxVelocity");
    for (const i of re)
      e
        ? ((this.velocity[i] *= 1 - e),
          t &&
            !this.isScaling &&
            (this.velocity[i] = Math.max(
              Math.min(this.velocity[i], t),
              -1 * t
            )),
          (this.current[i] += this.velocity[i]))
        : (this.current[i] = this.target[i]);
    this.setTransform(),
      this.setEdgeForce(),
      !this.isResting || this.isDragging
        ? (this.rAF = requestAnimationFrame(() => this.animate()))
        : this.stop("current");
  }
  setTargetForce() {
    for (const e of re)
      (e === "e" && this.isBouncingX) ||
        (e === "f" && this.isBouncingY) ||
        (this.velocity[e] =
          (1 / (1 - this.friction) - 1) * (this.target[e] - this.current[e]));
  }
  checkBounds(e = 0, t = 0) {
    const { current: i } = this,
      s = i.e + e,
      n = i.f + t,
      r = this.getBounds(),
      { x: a, y: l } = r,
      c = a.min,
      d = a.max,
      u = l.min,
      f = l.max;
    let h = 0,
      p = 0;
    return (
      c !== 1 / 0 && s < c ? (h = c - s) : d !== 1 / 0 && s > d && (h = d - s),
      u !== 1 / 0 && n < u ? (p = u - n) : f !== 1 / 0 && n > f && (p = f - n),
      Math.abs(h) < 1e-4 && (h = 0),
      Math.abs(p) < 1e-4 && (p = 0),
      Object.assign(Object.assign({}, r), {
        xDiff: h,
        yDiff: p,
        inBounds: !h && !p,
      })
    );
  }
  clampTargetBounds() {
    const { target: e } = this,
      { x: t, y: i } = this.getBounds();
    t.min !== 1 / 0 && (e.e = Math.max(e.e, t.min)),
      t.max !== 1 / 0 && (e.e = Math.min(e.e, t.max)),
      i.min !== 1 / 0 && (e.f = Math.max(e.f, i.min)),
      i.max !== 1 / 0 && (e.f = Math.min(e.f, i.max));
  }
  calculateContentDim(e = this.current) {
    const { content: t, contentRect: i } = this,
      { fitWidth: s, fitHeight: n, fullWidth: r, fullHeight: a } = i;
    let l = r,
      c = a;
    if (this.option("zoom") || this.angle !== 0) {
      const d =
          !(t instanceof HTMLImageElement) &&
          (window.getComputedStyle(t).maxWidth === "none" ||
            window.getComputedStyle(t).maxHeight === "none"),
        u = d ? r : s,
        f = d ? a : n,
        h = this.getMatrix(e),
        p = new DOMPoint(0, 0).matrixTransform(h),
        m = new DOMPoint(0 + u, 0).matrixTransform(h),
        v = new DOMPoint(0 + u, 0 + f).matrixTransform(h),
        g = new DOMPoint(0, 0 + f).matrixTransform(h),
        y = Math.abs(v.x - p.x),
        b = Math.abs(v.y - p.y),
        w = Math.abs(g.x - m.x),
        T = Math.abs(g.y - m.y);
      (l = Math.max(y, w)), (c = Math.max(b, T));
    }
    return { contentWidth: l, contentHeight: c };
  }
  setEdgeForce() {
    if (
      this.ignoreBounds ||
      this.isDragging ||
      this.panMode === Z ||
      this.targetScale < this.scale
    )
      return (this.isBouncingX = !1), void (this.isBouncingY = !1);
    const { target: e } = this,
      { x: t, y: i, xDiff: s, yDiff: n } = this.checkBounds(),
      r = this.option("maxVelocity");
    let a = this.velocity.e,
      l = this.velocity.f;
    s !== 0
      ? ((this.isBouncingX = !0),
        s * a <= 0
          ? (a += 0.14 * s)
          : ((a = 0.14 * s),
            t.min !== 1 / 0 && (this.target.e = Math.max(e.e, t.min)),
            t.max !== 1 / 0 && (this.target.e = Math.min(e.e, t.max))),
        r && (a = Math.max(Math.min(a, r), -1 * r)))
      : (this.isBouncingX = !1),
      n !== 0
        ? ((this.isBouncingY = !0),
          n * l <= 0
            ? (l += 0.14 * n)
            : ((l = 0.14 * n),
              i.min !== 1 / 0 && (this.target.f = Math.max(e.f, i.min)),
              i.max !== 1 / 0 && (this.target.f = Math.min(e.f, i.max))),
          r && (l = Math.max(Math.min(l, r), -1 * r)))
        : (this.isBouncingY = !1),
      this.isBouncingX && (this.velocity.e = a),
      this.isBouncingY && (this.velocity.f = l);
  }
  enable() {
    const { content: e } = this,
      t = new DOMMatrixReadOnly(window.getComputedStyle(e).transform);
    for (const i of re) this.current[i] = this.target[i] = t[i];
    this.updateMetrics(),
      this.attachObserver(),
      this.attachEvents(),
      (this.state = j.Ready),
      this.emit("ready");
  }
  onClick(e) {
    var t;
    e.type === "click" &&
      e.detail === 0 &&
      ((this.dragOffset.x = 0), (this.dragOffset.y = 0)),
      this.isDragging &&
        ((t = this.pointerTracker) === null || t === void 0 || t.clear(),
        (this.trackingPoints = []),
        this.startDecelAnim());
    const i = e.target;
    if (!i || e.defaultPrevented) return;
    if (i.hasAttribute("disabled"))
      return e.preventDefault(), void e.stopPropagation();
    if (
      (() => {
        const h = window.getSelection();
        return h && h.type === "Range";
      })() &&
      !i.closest("button")
    )
      return;
    const s = i.closest("[data-panzoom-action]"),
      n = i.closest("[data-panzoom-change]"),
      r = s || n,
      a = r && X(r) ? r.dataset : null;
    if (a) {
      const h = a.panzoomChange,
        p = a.panzoomAction;
      if (((h || p) && e.preventDefault(), h)) {
        let m = {};
        try {
          m = JSON.parse(h);
        } catch {
          console && console.warn("The given data was not valid JSON");
        }
        return void this.applyChange(m);
      }
      if (p) return void (this[p] && this[p]());
    }
    if (Math.abs(this.dragOffset.x) > 3 || Math.abs(this.dragOffset.y) > 3)
      return e.preventDefault(), void e.stopPropagation();
    if (i.closest("[data-fancybox]")) return;
    const l = this.content.getBoundingClientRect(),
      c = this.dragStart;
    if (
      c.time &&
      !this.canZoomOut() &&
      (Math.abs(l.x - c.x) > 2 || Math.abs(l.y - c.y) > 2)
    )
      return;
    this.dragStart.time = 0;
    const d = (h) => {
        this.option("zoom", e) &&
          h &&
          typeof h == "string" &&
          /(iterateZoom)|(toggle(Zoom|Full|Cover|Max)|(zoomTo(Fit|Cover|Max)))/.test(
            h
          ) &&
          typeof this[h] == "function" &&
          (e.preventDefault(), this[h]({ event: e }));
      },
      u = this.option("click", e),
      f = this.option("dblClick", e);
    f
      ? (this.clicks++,
        this.clicks == 1 &&
          (this.clickTimer = setTimeout(() => {
            this.clicks === 1
              ? (this.emit("click", e), !e.defaultPrevented && u && d(u))
              : (this.emit("dblClick", e), e.defaultPrevented || d(f)),
              (this.clicks = 0),
              (this.clickTimer = null);
          }, 350)))
      : (this.emit("click", e), !e.defaultPrevented && u && d(u));
  }
  addTrackingPoint(e) {
    const t = this.trackingPoints.filter((i) => i.time > Date.now() - 100);
    t.push(e), (this.trackingPoints = t);
  }
  onPointerDown(e, t, i) {
    var s;
    if (this.option("touch", e) === !1) return !1;
    (this.pwt = 0),
      (this.dragOffset = { x: 0, y: 0, time: 0 }),
      (this.trackingPoints = []);
    const n = this.content.getBoundingClientRect();
    if (
      ((this.dragStart = {
        x: n.x,
        y: n.y,
        top: n.top,
        left: n.left,
        time: Date.now(),
      }),
      this.clickTimer)
    )
      return !1;
    if (this.panMode === Z && this.targetScale > 1)
      return e.preventDefault(), e.stopPropagation(), !1;
    const r = e.composedPath()[0];
    if (!i.length) {
      if (
        ["TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO", "IFRAME"].includes(
          r.nodeName
        ) ||
        r.closest(
          "[contenteditable],[data-selectable],[data-draggable],[data-clickable],[data-panzoom-change],[data-panzoom-action]"
        )
      )
        return !1;
      (s = window.getSelection()) === null ||
        s === void 0 ||
        s.removeAllRanges();
    }
    if (e.type === "mousedown")
      ["A", "BUTTON"].includes(r.nodeName) || e.preventDefault();
    else if (Math.abs(this.velocity.a) > 0.3) return !1;
    return (
      (this.target.e = this.current.e),
      (this.target.f = this.current.f),
      this.stop(),
      this.isDragging ||
        ((this.isDragging = !0),
        this.addTrackingPoint(t),
        this.emit("touchStart", e)),
      !0
    );
  }
  onPointerMove(e, t, i) {
    if (
      this.option("touch", e) === !1 ||
      !this.isDragging ||
      (t.length < 2 &&
        this.panOnlyZoomed &&
        M(this.targetScale) <= M(this.minScale)) ||
      (this.emit("touchMove", e), e.defaultPrevented)
    )
      return;
    this.addTrackingPoint(t[0]);
    const { content: s } = this,
      n = $t(i[0], i[1]),
      r = $t(t[0], t[1]);
    let a = 0,
      l = 0;
    if (t.length > 1) {
      const b = s.getBoundingClientRect();
      (a = n.clientX - b.left - 0.5 * b.width),
        (l = n.clientY - b.top - 0.5 * b.height);
    }
    const c = Vt(i[0], i[1]),
      d = Vt(t[0], t[1]);
    let u = c ? d / c : 1,
      f = r.clientX - n.clientX,
      h = r.clientY - n.clientY;
    (this.dragOffset.x += f),
      (this.dragOffset.y += h),
      (this.dragOffset.time = Date.now() - this.dragStart.time);
    let p = M(this.targetScale) === M(this.minScale) && this.option("lockAxis");
    if (p && !this.lockedAxis)
      if (p === "xy" || p === "y" || e.type === "touchmove") {
        if (Math.abs(this.dragOffset.x) < 6 && Math.abs(this.dragOffset.y) < 6)
          return void e.preventDefault();
        const b = Math.abs(
          (180 * Math.atan2(this.dragOffset.y, this.dragOffset.x)) / Math.PI
        );
        (this.lockedAxis = b > 45 && b < 135 ? "y" : "x"),
          (this.dragOffset.x = 0),
          (this.dragOffset.y = 0),
          (f = 0),
          (h = 0);
      } else this.lockedAxis = p;
    if (
      (Ue(e.target, this.content) && ((p = "x"), (this.dragOffset.y = 0)),
      p &&
        p !== "xy" &&
        this.lockedAxis !== p &&
        M(this.targetScale) === M(this.minScale))
    )
      return;
    e.cancelable && e.preventDefault(),
      this.container.classList.add(this.cn("isDragging"));
    const m = this.checkBounds(f, h);
    this.option("rubberband")
      ? (this.isInfinite !== "x" &&
          ((m.xDiff > 0 && f < 0) || (m.xDiff < 0 && f > 0)) &&
          (f *= Math.max(
            0,
            0.5 - Math.abs((0.75 / this.contentRect.fitWidth) * m.xDiff)
          )),
        this.isInfinite !== "y" &&
          ((m.yDiff > 0 && h < 0) || (m.yDiff < 0 && h > 0)) &&
          (h *= Math.max(
            0,
            0.5 - Math.abs((0.75 / this.contentRect.fitHeight) * m.yDiff)
          )))
      : (m.xDiff && (f = 0), m.yDiff && (h = 0));
    const v = this.targetScale,
      g = this.minScale,
      y = this.maxScale;
    v < 0.5 * g && (u = Math.max(u, g)),
      v > 1.5 * y && (u = Math.min(u, y)),
      this.lockedAxis === "y" && M(v) === M(g) && (f = 0),
      this.lockedAxis === "x" && M(v) === M(g) && (h = 0),
      this.applyChange({
        originX: a,
        originY: l,
        panX: f,
        panY: h,
        scale: u,
        friction: this.option("dragFriction"),
        ignoreBounds: !0,
      });
  }
  onPointerUp(e, t, i) {
    if (i.length)
      return (
        (this.dragOffset.x = 0),
        (this.dragOffset.y = 0),
        void (this.trackingPoints = [])
      );
    this.container.classList.remove(this.cn("isDragging")),
      this.isDragging &&
        (this.addTrackingPoint(t),
        this.panOnlyZoomed &&
          this.contentRect.width - this.contentRect.fitWidth < 1 &&
          this.contentRect.height - this.contentRect.fitHeight < 1 &&
          (this.trackingPoints = []),
        Ue(e.target, this.content) &&
          this.lockedAxis === "y" &&
          (this.trackingPoints = []),
        this.emit("touchEnd", e),
        (this.isDragging = !1),
        (this.lockedAxis = !1),
        this.state !== j.Destroy &&
          (e.defaultPrevented || this.startDecelAnim()));
  }
  startDecelAnim() {
    var e;
    const t = this.isScaling;
    this.rAF && (cancelAnimationFrame(this.rAF), (this.rAF = null)),
      (this.isBouncingX = !1),
      (this.isBouncingY = !1);
    for (const b of re) this.velocity[b] = 0;
    (this.target.e = this.current.e),
      (this.target.f = this.current.f),
      F(this.container, "is-scaling"),
      F(this.container, "is-animating"),
      (this.isTicking = !1);
    const { trackingPoints: i } = this,
      s = i[0],
      n = i[i.length - 1];
    let r = 0,
      a = 0,
      l = 0;
    n &&
      s &&
      ((r = n.clientX - s.clientX),
      (a = n.clientY - s.clientY),
      (l = n.time - s.time));
    const c =
      ((e = window.visualViewport) === null || e === void 0
        ? void 0
        : e.scale) || 1;
    c !== 1 && ((r *= c), (a *= c));
    let d = 0,
      u = 0,
      f = 0,
      h = 0,
      p = this.option("decelFriction");
    const m = this.targetScale;
    if (l > 0) {
      (f = Math.abs(r) > 3 ? r / (l / 30) : 0),
        (h = Math.abs(a) > 3 ? a / (l / 30) : 0);
      const b = this.option("maxVelocity");
      b &&
        ((f = Math.max(Math.min(f, b), -1 * b)),
        (h = Math.max(Math.min(h, b), -1 * b)));
    }
    f && (d = f / (1 / (1 - p) - 1)),
      h && (u = h / (1 / (1 - p) - 1)),
      (this.option("lockAxis") === "y" ||
        (this.option("lockAxis") === "xy" &&
          this.lockedAxis === "y" &&
          M(m) === this.minScale)) &&
        (d = f = 0),
      (this.option("lockAxis") === "x" ||
        (this.option("lockAxis") === "xy" &&
          this.lockedAxis === "x" &&
          M(m) === this.minScale)) &&
        (u = h = 0);
    const v = this.dragOffset.x,
      g = this.dragOffset.y,
      y = this.option("dragMinThreshold") || 0;
    Math.abs(v) < y && Math.abs(g) < y && ((d = u = 0), (f = h = 0)),
      ((this.option("zoom") &&
        (m < this.minScale - 1e-5 || m > this.maxScale + 1e-5)) ||
        (t && !d && !u)) &&
        (p = 0.35),
      this.applyChange({ panX: d, panY: u, friction: p }),
      this.emit("decel", f, h, v, g);
  }
  onWheel(e) {
    var t = [-e.deltaX || 0, -e.deltaY || 0, -e.detail || 0].reduce(function (
      n,
      r
    ) {
      return Math.abs(r) > Math.abs(n) ? r : n;
    });
    const i = Math.max(-1, Math.min(1, t));
    if ((this.emit("wheel", e, i), this.panMode === Z || e.defaultPrevented))
      return;
    const s = this.option("wheel");
    s === "pan"
      ? (e.preventDefault(),
        (this.panOnlyZoomed && !this.canZoomOut()) ||
          this.applyChange({
            panX: 2 * -e.deltaX,
            panY: 2 * -e.deltaY,
            bounce: !1,
          }))
      : s === "zoom" && this.option("zoom") !== !1 && this.zoomWithWheel(e);
  }
  onMouseMove(e) {
    this.panWithMouse(e);
  }
  onKeydown(e) {
    e.key === "Escape" && this.toggleFS();
  }
  onResize() {
    this.updateMetrics(), this.checkBounds().inBounds || this.requestTick();
  }
  setTransform() {
    this.emit("beforeTransform");
    const { current: e, target: t, content: i, contentRect: s } = this,
      n = Object.assign({}, Fe);
    for (const v of re) {
      const g = v == "e" || v === "f" ? je : mn;
      (n[v] = M(e[v], g)),
        Math.abs(t[v] - e[v]) < (v == "e" || v === "f" ? 0.51 : 0.001) &&
          (e[v] = t[v]);
    }
    let { a: r, b: a, c: l, d: c, e: d, f: u } = n,
      f = `matrix(${r}, ${a}, ${l}, ${c}, ${d}, ${u})`,
      h = i.parentElement instanceof HTMLPictureElement ? i.parentElement : i;
    if (
      (this.option("transformParent") && (h = h.parentElement || h),
      h.style.transform === f)
    )
      return;
    h.style.transform = f;
    const { contentWidth: p, contentHeight: m } = this.calculateContentDim();
    (s.width = p), (s.height = m), this.emit("afterTransform");
  }
  updateMetrics(e = !1) {
    var t;
    if (!this || this.state === j.Destroy || this.isContentLoading) return;
    const i = Math.max(
        1,
        ((t = window.visualViewport) === null || t === void 0
          ? void 0
          : t.scale) || 1
      ),
      { container: s, content: n } = this,
      r = n instanceof HTMLImageElement,
      a = s.getBoundingClientRect(),
      l = getComputedStyle(this.container);
    let c = a.width * i,
      d = a.height * i;
    const u = parseFloat(l.paddingTop) + parseFloat(l.paddingBottom),
      f = c - (parseFloat(l.paddingLeft) + parseFloat(l.paddingRight)),
      h = d - u;
    this.containerRect = { width: c, height: d, innerWidth: f, innerHeight: h };
    const p =
        parseFloat(n.dataset.width || "") ||
        ((S) => {
          let P = 0;
          return (
            (P =
              S instanceof HTMLImageElement
                ? S.naturalWidth
                : S instanceof SVGElement
                ? S.width.baseVal.value
                : Math.max(S.offsetWidth, S.scrollWidth)),
            P || 0
          );
        })(n),
      m =
        parseFloat(n.dataset.height || "") ||
        ((S) => {
          let P = 0;
          return (
            (P =
              S instanceof HTMLImageElement
                ? S.naturalHeight
                : S instanceof SVGElement
                ? S.height.baseVal.value
                : Math.max(S.offsetHeight, S.scrollHeight)),
            P || 0
          );
        })(n);
    let v = this.option("width", p) || U,
      g = this.option("height", m) || U;
    const y = v === U,
      b = g === U;
    typeof v != "number" && (v = p),
      typeof g != "number" && (g = m),
      y && (v = p * (g / m)),
      b && (g = m / (p / v));
    let w = n.parentElement instanceof HTMLPictureElement ? n.parentElement : n;
    this.option("transformParent") && (w = w.parentElement || w);
    const T = w.getAttribute("style") || "";
    w.style.setProperty("transform", "none", "important"),
      r && ((w.style.width = ""), (w.style.height = "")),
      w.offsetHeight;
    const C = n.getBoundingClientRect();
    let z = C.width * i,
      O = C.height * i,
      k = z,
      E = O;
    (z = Math.min(z, v)),
      (O = Math.min(O, g)),
      r
        ? ({ width: z, height: O } = ((S, P, A, D) => {
            const $ = A / S,
              V = D / P,
              B = Math.min($, V);
            return { width: (S *= B), height: (P *= B) };
          })(v, g, z, O))
        : ((z = Math.min(z, v)), (O = Math.min(O, g)));
    let L = 0.5 * (E - O),
      x = 0.5 * (k - z);
    (this.contentRect = Object.assign(Object.assign({}, this.contentRect), {
      top: C.top - a.top + L,
      bottom: a.bottom - C.bottom + L,
      left: C.left - a.left + x,
      right: a.right - C.right + x,
      fitWidth: z,
      fitHeight: O,
      width: z,
      height: O,
      fullWidth: v,
      fullHeight: g,
    })),
      (w.style.cssText = T),
      r && ((w.style.width = `${z}px`), (w.style.height = `${O}px`)),
      this.setTransform(),
      e !== !0 && this.emit("refresh"),
      this.ignoreBounds ||
        (M(this.targetScale) < M(this.minScale)
          ? this.zoomTo(this.minScale, { friction: 0 })
          : this.targetScale > this.maxScale
          ? this.zoomTo(this.maxScale, { friction: 0 })
          : this.state === j.Init ||
            this.checkBounds().inBounds ||
            this.requestTick()),
      this.updateControls();
  }
  calculateBounds() {
    const { contentWidth: e, contentHeight: t } = this.calculateContentDim(
        this.target
      ),
      { targetScale: i, lockedAxis: s } = this,
      { fitWidth: n, fitHeight: r } = this.contentRect;
    let a = 0,
      l = 0,
      c = 0,
      d = 0;
    const u = this.option("infinite");
    if (u === !0 || (s && u === s))
      (a = -1 / 0), (c = 1 / 0), (l = -1 / 0), (d = 1 / 0);
    else {
      let { containerRect: f, contentRect: h } = this,
        p = M(n * i, je),
        m = M(r * i, je),
        { innerWidth: v, innerHeight: g } = f;
      if (
        (f.width === p && (v = f.width), f.width === m && (g = f.height), e > v)
      ) {
        (c = 0.5 * (e - v)), (a = -1 * c);
        let y = 0.5 * (h.right - h.left);
        (a += y), (c += y);
      }
      if (
        (n > v && e < v && ((a -= 0.5 * (n - v)), (c -= 0.5 * (n - v))), t > g)
      ) {
        (d = 0.5 * (t - g)), (l = -1 * d);
        let y = 0.5 * (h.bottom - h.top);
        (l += y), (d += y);
      }
      r > g && t < g && ((a -= 0.5 * (r - g)), (c -= 0.5 * (r - g)));
    }
    return { x: { min: a, max: c }, y: { min: l, max: d } };
  }
  getBounds() {
    const e = this.option("bounds");
    return e !== U ? e : this.calculateBounds();
  }
  updateControls() {
    const e = this,
      t = e.container,
      { panMode: i, contentRect: s, targetScale: n, minScale: r } = e;
    let a = r,
      l = e.option("click") || !1;
    l && (a = e.getNextScale(l));
    let c = e.canZoomIn(),
      d = e.canZoomOut(),
      u = i === Wt && !!this.option("touch"),
      f = d && u;
    if (
      (u &&
        (M(n) < M(r) && !this.panOnlyZoomed && (f = !0),
        (M(s.width, 1) > M(s.fitWidth, 1) ||
          M(s.height, 1) > M(s.fitHeight, 1)) &&
          (f = !0)),
      M(s.width * n, 1) < M(s.fitWidth, 1) && (f = !1),
      i === Z && (f = !1),
      oe(t, this.cn("isDraggable"), f),
      !this.option("zoom"))
    )
      return;
    let h = c && M(a) > M(n),
      p = !h && !f && d && M(a) < M(n);
    oe(t, this.cn("canZoomIn"), h), oe(t, this.cn("canZoomOut"), p);
    for (const m of t.querySelectorAll("[data-panzoom-action]")) {
      let v = !1,
        g = !1;
      switch (m.dataset.panzoomAction) {
        case "zoomIn":
          c ? (v = !0) : (g = !0);
          break;
        case "zoomOut":
          d ? (v = !0) : (g = !0);
          break;
        case "toggleZoom":
        case "iterateZoom":
          c || d ? (v = !0) : (g = !0);
          const y = m.querySelector("g");
          y && (y.style.display = c ? "" : "none");
      }
      v
        ? (m.removeAttribute("disabled"), m.removeAttribute("tabindex"))
        : g &&
          (m.setAttribute("disabled", ""), m.setAttribute("tabindex", "-1"));
    }
  }
  panTo({
    x: e = this.target.e,
    y: t = this.target.f,
    scale: i = this.targetScale,
    friction: s = this.option("friction"),
    angle: n = 0,
    originX: r = 0,
    originY: a = 0,
    flipX: l = !1,
    flipY: c = !1,
    ignoreBounds: d = !1,
  }) {
    this.state !== j.Destroy &&
      this.applyChange({
        panX: e - this.target.e,
        panY: t - this.target.f,
        scale: i / this.targetScale,
        angle: n,
        originX: r,
        originY: a,
        friction: s,
        flipX: l,
        flipY: c,
        ignoreBounds: d,
      });
  }
  applyChange({
    panX: e = 0,
    panY: t = 0,
    scale: i = 1,
    angle: s = 0,
    originX: n = -this.current.e,
    originY: r = -this.current.f,
    friction: a = this.option("friction"),
    flipX: l = !1,
    flipY: c = !1,
    ignoreBounds: d = !1,
    bounce: u = this.option("bounce"),
  }) {
    const f = this.state;
    if (f === j.Destroy) return;
    this.rAF && (cancelAnimationFrame(this.rAF), (this.rAF = null)),
      (this.friction = a || 0),
      (this.ignoreBounds = d);
    const { current: h } = this,
      p = h.e,
      m = h.f,
      v = this.getMatrix(this.target);
    let g = new DOMMatrix().translate(p, m).translate(n, r).translate(e, t);
    if (this.option("zoom")) {
      if (!d) {
        const y = this.targetScale,
          b = this.minScale,
          w = this.maxScale;
        y * i < b && (i = b / y), y * i > w && (i = w / y);
      }
      g = g.scale(i);
    }
    (g = g.translate(-n, -r).translate(-p, -m).multiply(v)),
      s && (g = g.rotate(s)),
      l && (g = g.scale(-1, 1)),
      c && (g = g.scale(1, -1));
    for (const y of re)
      y !== "e" &&
      y !== "f" &&
      (g[y] > this.minScale + 1e-5 || g[y] < this.minScale - 1e-5)
        ? (this.target[y] = g[y])
        : (this.target[y] = M(g[y], je));
    (this.targetScale < this.scale ||
      Math.abs(i - 1) > 0.1 ||
      this.panMode === Z ||
      u === !1) &&
      !d &&
      this.clampTargetBounds(),
      f === j.Init
        ? this.animate()
        : this.isResting || ((this.state = j.Panning), this.requestTick());
  }
  stop(e = !1) {
    if (this.state === j.Init || this.state === j.Destroy) return;
    const t = this.isTicking;
    this.rAF && (cancelAnimationFrame(this.rAF), (this.rAF = null)),
      (this.isBouncingX = !1),
      (this.isBouncingY = !1);
    for (const i of re)
      (this.velocity[i] = 0),
        e === "current"
          ? (this.current[i] = this.target[i])
          : e === "target" && (this.target[i] = this.current[i]);
    this.setTransform(),
      F(this.container, "is-scaling"),
      F(this.container, "is-animating"),
      (this.isTicking = !1),
      (this.state = j.Ready),
      t && (this.emit("endAnimation"), this.updateControls());
  }
  requestTick() {
    this.isTicking ||
      (this.emit("startAnimation"),
      this.updateControls(),
      I(this.container, "is-animating"),
      this.isScaling && I(this.container, "is-scaling")),
      (this.isTicking = !0),
      this.rAF || (this.rAF = requestAnimationFrame(() => this.animate()));
  }
  panWithMouse(e, t = this.option("mouseMoveFriction")) {
    if (
      ((this.pmme = e),
      this.panMode !== Z || !e || M(this.targetScale) <= M(this.minScale))
    )
      return;
    this.emit("mouseMove", e);
    const { container: i, containerRect: s, contentRect: n } = this,
      r = s.width,
      a = s.height,
      l = i.getBoundingClientRect(),
      c = (e.clientX || 0) - l.left,
      d = (e.clientY || 0) - l.top;
    let { contentWidth: u, contentHeight: f } = this.calculateContentDim(
      this.target
    );
    const h = this.option("mouseMoveFactor");
    h > 1 && (u !== r && (u *= h), f !== a && (f *= h));
    let p = 0.5 * (u - r) - (((c / r) * 100) / 100) * (u - r);
    p += 0.5 * (n.right - n.left);
    let m = 0.5 * (f - a) - (((d / a) * 100) / 100) * (f - a);
    (m += 0.5 * (n.bottom - n.top)),
      this.applyChange({
        panX: p - this.target.e,
        panY: m - this.target.f,
        friction: t,
      });
  }
  zoomWithWheel(e) {
    if (this.state === j.Destroy || this.state === j.Init) return;
    const t = Date.now();
    if (t - this.pwt < 45) return void e.preventDefault();
    this.pwt = t;
    var i = [-e.deltaX || 0, -e.deltaY || 0, -e.detail || 0].reduce(function (
      c,
      d
    ) {
      return Math.abs(d) > Math.abs(c) ? d : c;
    });
    const s = Math.max(-1, Math.min(1, i)),
      { targetScale: n, maxScale: r, minScale: a } = this;
    let l = (n * (100 + 45 * s)) / 100;
    M(l) < M(a) && M(n) <= M(a)
      ? ((this.cwd += Math.abs(s)), (l = a))
      : M(l) > M(r) && M(n) >= M(r)
      ? ((this.cwd += Math.abs(s)), (l = r))
      : ((this.cwd = 0), (l = Math.max(Math.min(l, r), a))),
      this.cwd > this.option("wheelLimit") ||
        (e.preventDefault(), M(l) !== M(n) && this.zoomTo(l, { event: e }));
  }
  canZoomIn() {
    return (
      this.option("zoom") &&
      (M(this.contentRect.width, 1) < M(this.contentRect.fitWidth, 1) ||
        M(this.targetScale) < M(this.maxScale))
    );
  }
  canZoomOut() {
    return this.option("zoom") && M(this.targetScale) > M(this.minScale);
  }
  zoomIn(e = 1.25, t) {
    this.zoomTo(this.targetScale * e, t);
  }
  zoomOut(e = 0.8, t) {
    this.zoomTo(this.targetScale * e, t);
  }
  zoomToFit(e) {
    this.zoomTo("fit", e);
  }
  zoomToCover(e) {
    this.zoomTo("cover", e);
  }
  zoomToFull(e) {
    this.zoomTo("full", e);
  }
  zoomToMax(e) {
    this.zoomTo("max", e);
  }
  toggleZoom(e) {
    this.zoomTo(this.getNextScale("toggleZoom"), e);
  }
  toggleMax(e) {
    this.zoomTo(this.getNextScale("toggleMax"), e);
  }
  toggleCover(e) {
    this.zoomTo(this.getNextScale("toggleCover"), e);
  }
  iterateZoom(e) {
    this.zoomTo("next", e);
  }
  zoomTo(
    e = 1,
    { friction: t = U, originX: i = U, originY: s = U, event: n } = {}
  ) {
    if (this.isContentLoading || this.state === j.Destroy) return;
    const { targetScale: r, fullScale: a, maxScale: l, coverScale: c } = this;
    if (
      (this.stop(),
      this.panMode === Z && (n = this.pmme || n),
      n || i === U || s === U)
    ) {
      const u = this.content.getBoundingClientRect(),
        f = this.container.getBoundingClientRect(),
        h = n ? n.clientX : f.left + 0.5 * f.width,
        p = n ? n.clientY : f.top + 0.5 * f.height;
      (i = h - u.left - 0.5 * u.width), (s = p - u.top - 0.5 * u.height);
    }
    let d = 1;
    typeof e == "number"
      ? (d = e)
      : e === "full"
      ? (d = a)
      : e === "cover"
      ? (d = c)
      : e === "max"
      ? (d = l)
      : e === "fit"
      ? (d = 1)
      : e === "next" && (d = this.getNextScale("iterateZoom")),
      (d = d / r || 1),
      (t = t === U ? (d > 1 ? 0.15 : 0.25) : t),
      this.applyChange({ scale: d, originX: i, originY: s, friction: t }),
      n && this.panMode === Z && this.panWithMouse(n, t);
  }
  rotateCCW() {
    this.applyChange({ angle: -90 });
  }
  rotateCW() {
    this.applyChange({ angle: 90 });
  }
  flipX() {
    this.applyChange({ flipX: !0 });
  }
  flipY() {
    this.applyChange({ flipY: !0 });
  }
  fitX() {
    this.stop("target");
    const { containerRect: e, contentRect: t, target: i } = this;
    this.applyChange({
      panX: 0.5 * e.width - (t.left + 0.5 * t.fitWidth) - i.e,
      panY: 0.5 * e.height - (t.top + 0.5 * t.fitHeight) - i.f,
      scale: e.width / t.fitWidth / this.targetScale,
      originX: 0,
      originY: 0,
      ignoreBounds: !0,
    });
  }
  fitY() {
    this.stop("target");
    const { containerRect: e, contentRect: t, target: i } = this;
    this.applyChange({
      panX: 0.5 * e.width - (t.left + 0.5 * t.fitWidth) - i.e,
      panY: 0.5 * e.innerHeight - (t.top + 0.5 * t.fitHeight) - i.f,
      scale: e.height / t.fitHeight / this.targetScale,
      originX: 0,
      originY: 0,
      ignoreBounds: !0,
    });
  }
  toggleFS() {
    const { container: e } = this,
      t = this.cn("inFullscreen"),
      i = this.cn("htmlHasFullscreen");
    e.classList.toggle(t);
    const s = e.classList.contains(t);
    s
      ? (document.documentElement.classList.add(i),
        document.addEventListener("keydown", this.onKeydown, !0))
      : (document.documentElement.classList.remove(i),
        document.removeEventListener("keydown", this.onKeydown, !0)),
      this.updateMetrics(),
      this.emit(s ? "enterFS" : "exitFS");
  }
  getMatrix(e = this.current) {
    const { a: t, b: i, c: s, d: n, e: r, f: a } = e;
    return new DOMMatrix([t, i, s, n, r, a]);
  }
  reset(e) {
    if (this.state !== j.Init && this.state !== j.Destroy) {
      this.stop("current");
      for (const t of re) this.target[t] = Fe[t];
      (this.target.a = this.minScale),
        (this.target.d = this.minScale),
        this.clampTargetBounds(),
        this.isResting ||
          ((this.friction = e === void 0 ? this.option("friction") : e),
          (this.state = j.Panning),
          this.requestTick());
    }
  }
  destroy() {
    this.stop(),
      (this.state = j.Destroy),
      this.detachEvents(),
      this.detachObserver();
    const { container: e, content: t } = this,
      i = this.option("classes") || {};
    for (const s of Object.values(i)) e.classList.remove(s + "");
    t &&
      (t.removeEventListener("load", this.onLoad),
      t.removeEventListener("error", this.onError)),
      this.detachPlugins();
  }
}
Object.defineProperty(ye, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: pn,
}),
  Object.defineProperty(ye, "Plugins", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {},
  });
const qt = function (o, e) {
    let t = !0;
    return (...i) => {
      t &&
        ((t = !1),
        o(...i),
        setTimeout(() => {
          t = !0;
        }, e));
    };
  },
  Yt = (o, e) => {
    let t = [];
    return (
      o.childNodes.forEach((i) => {
        i.nodeType !== Node.ELEMENT_NODE || (e && !i.matches(e)) || t.push(i);
      }),
      t
    );
  },
  gn = {
    viewport: null,
    track: null,
    enabled: !0,
    slides: [],
    axis: "x",
    transition: "fade",
    preload: 1,
    slidesPerPage: "auto",
    initialPage: 0,
    friction: 0.12,
    Panzoom: { decelFriction: 0.12 },
    center: !0,
    infinite: !0,
    fill: !0,
    dragFree: !1,
    adaptiveHeight: !1,
    direction: "ltr",
    classes: {
      container: "f-carousel",
      viewport: "f-carousel__viewport",
      track: "f-carousel__track",
      slide: "f-carousel__slide",
      isLTR: "is-ltr",
      isRTL: "is-rtl",
      isHorizontal: "is-horizontal",
      isVertical: "is-vertical",
      inTransition: "in-transition",
      isSelected: "is-selected",
    },
    l10n: {
      NEXT: "Next slide",
      PREV: "Previous slide",
      GOTO: "Go to slide #%d",
    },
  };
var H;
(function (o) {
  (o[(o.Init = 0)] = "Init"),
    (o[(o.Ready = 1)] = "Ready"),
    (o[(o.Destroy = 2)] = "Destroy");
})(H || (H = {}));
const ft = (o) => {
    if (typeof o == "string" || o instanceof HTMLElement) o = { html: o };
    else {
      const e = o.thumb;
      e !== void 0 &&
        (typeof e == "string" && (o.thumbSrc = e),
        e instanceof HTMLImageElement &&
          ((o.thumbEl = e), (o.thumbElSrc = e.src), (o.thumbSrc = e.src)),
        delete o.thumb);
    }
    return Object.assign(
      {
        html: "",
        el: null,
        isDom: !1,
        class: "",
        customClass: "",
        index: -1,
        dim: 0,
        gap: 0,
        pos: 0,
        transition: !1,
      },
      o
    );
  },
  vn = (o = {}) => Object.assign({ index: -1, slides: [], dim: 0, pos: -1 }, o);
class ee extends Ke {
  constructor(e, t) {
    super(t),
      Object.defineProperty(this, "instance", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e,
      });
  }
  attach() {}
  detach() {}
}
const bn = {
  classes: {
    list: "f-carousel__dots",
    isDynamic: "is-dynamic",
    hasDots: "has-dots",
    dot: "f-carousel__dot",
    isBeforePrev: "is-before-prev",
    isPrev: "is-prev",
    isCurrent: "is-current",
    isNext: "is-next",
    isAfterNext: "is-after-next",
  },
  dotTpl:
    '<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"><span class="f-carousel__dot" aria-hidden="true"></span></button>',
  dynamicFrom: 11,
  maxCount: 1 / 0,
  minCount: 2,
};
class Pi extends ee {
  constructor() {
    super(...arguments),
      Object.defineProperty(this, "isDynamic", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "list", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      });
  }
  onRefresh() {
    this.refresh();
  }
  build() {
    let e = this.list;
    if (!e) {
      (e = document.createElement("ul")),
        I(e, this.cn("list")),
        e.setAttribute("role", "tablist");
      const t = this.instance.container;
      t.appendChild(e), I(t, this.cn("hasDots")), (this.list = e);
    }
    return e;
  }
  refresh() {
    var e;
    const t = this.instance.pages.length,
      i = Math.min(2, this.option("minCount")),
      s = Math.max(2e3, this.option("maxCount")),
      n = this.option("dynamicFrom");
    if (t < i || t > s) return void this.cleanup();
    const r = typeof n == "number" && t > 5 && t >= n,
      a = !this.list || this.isDynamic !== r || this.list.children.length !== t;
    a && this.cleanup();
    const l = this.build();
    if ((oe(l, this.cn("isDynamic"), !!r), a))
      for (let u = 0; u < t; u++) l.append(this.createItem(u));
    let c,
      d = 0;
    for (const u of [...l.children]) {
      const f = d === this.instance.page;
      f && (c = u),
        oe(u, this.cn("isCurrent"), f),
        (e = u.children[0]) === null ||
          e === void 0 ||
          e.setAttribute("aria-selected", f ? "true" : "false");
      for (const h of ["isBeforePrev", "isPrev", "isNext", "isAfterNext"])
        F(u, this.cn(h));
      d++;
    }
    if (((c = c || l.firstChild), r && c)) {
      const u = c.previousElementSibling,
        f = u && u.previousElementSibling;
      I(u, this.cn("isPrev")), I(f, this.cn("isBeforePrev"));
      const h = c.nextElementSibling,
        p = h && h.nextElementSibling;
      I(h, this.cn("isNext")), I(p, this.cn("isAfterNext"));
    }
    this.isDynamic = r;
  }
  createItem(e = 0) {
    var t;
    const i = document.createElement("li");
    i.setAttribute("role", "presentation");
    const s = ne(
      this.instance
        .localize(this.option("dotTpl"), [["%d", e + 1]])
        .replace(/\%i/g, e + "")
    );
    return (
      i.appendChild(s),
      (t = i.children[0]) === null ||
        t === void 0 ||
        t.setAttribute("role", "tab"),
      i
    );
  }
  cleanup() {
    this.list && (this.list.remove(), (this.list = null)),
      (this.isDynamic = !1),
      F(this.instance.container, this.cn("hasDots"));
  }
  attach() {
    this.instance.on(["refresh", "change"], this.onRefresh);
  }
  detach() {
    this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup();
  }
}
Object.defineProperty(Pi, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: bn,
});
const Be = "disabled",
  He = "next",
  Zt = "prev";
class Mi extends ee {
  constructor() {
    super(...arguments),
      Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "prev", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "next", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "isDom", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      });
  }
  onRefresh() {
    const e = this.instance,
      t = e.pages.length,
      i = e.page;
    if (t < 2) return void this.cleanup();
    this.build();
    let s = this.prev,
      n = this.next;
    s &&
      n &&
      (s.removeAttribute(Be),
      n.removeAttribute(Be),
      e.isInfinite ||
        (i <= 0 && s.setAttribute(Be, ""),
        i >= t - 1 && n.setAttribute(Be, "")));
  }
  addBtn(e) {
    var t;
    const i = this.instance,
      s = document.createElement("button");
    s.setAttribute("tabindex", "0"),
      s.setAttribute("title", i.localize(`{{${e.toUpperCase()}}}`)),
      I(s, this.cn("button") + " " + this.cn(e === He ? "isNext" : "isPrev"));
    const n = i.isRTL ? (e === He ? Zt : He) : e;
    var r;
    return (
      (s.innerHTML = i.localize(this.option(`${n}Tpl`))),
      (s.dataset[
        `carousel${
          ((r = e),
          r
            ? r.match("^[a-z]")
              ? r.charAt(0).toUpperCase() + r.substring(1)
              : r
            : "")
        }`
      ] = "true"),
      (t = this.container) === null || t === void 0 || t.appendChild(s),
      s
    );
  }
  build() {
    const e = this.instance.container,
      t = this.cn("container");
    let { container: i, prev: s, next: n } = this;
    i || ((i = e.querySelector("." + t)), (this.isDom = !!i)),
      i || ((i = document.createElement("div")), I(i, t), e.appendChild(i)),
      (this.container = i),
      n || (n = i.querySelector("[data-carousel-next]")),
      n || (n = this.addBtn(He)),
      (this.next = n),
      s || (s = i.querySelector("[data-carousel-prev]")),
      s || (s = this.addBtn(Zt)),
      (this.prev = s);
  }
  cleanup() {
    this.isDom ||
      (this.prev && this.prev.remove(),
      this.next && this.next.remove(),
      this.container && this.container.remove()),
      (this.prev = null),
      (this.next = null),
      (this.container = null),
      (this.isDom = !1);
  }
  attach() {
    this.instance.on(["refresh", "change"], this.onRefresh);
  }
  detach() {
    this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup();
  }
}
Object.defineProperty(Mi, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: {
    classes: {
      container: "f-carousel__nav",
      button: "f-button",
      isNext: "is-next",
      isPrev: "is-prev",
    },
    nextTpl:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',
    prevTpl:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>',
  },
});
class Ci extends ee {
  constructor() {
    super(...arguments),
      Object.defineProperty(this, "selectedIndex", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "target", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "nav", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      });
  }
  addAsTargetFor(e) {
    (this.target = this.instance), (this.nav = e), this.attachEvents();
  }
  addAsNavFor(e) {
    (this.nav = this.instance), (this.target = e), this.attachEvents();
  }
  attachEvents() {
    const { nav: e, target: t } = this;
    e &&
      t &&
      ((e.options.initialSlide = t.options.initialPage),
      e.state === H.Ready ? this.onNavReady(e) : e.on("ready", this.onNavReady),
      t.state === H.Ready
        ? this.onTargetReady(t)
        : t.on("ready", this.onTargetReady));
  }
  onNavReady(e) {
    e.on("createSlide", this.onNavCreateSlide),
      e.on("Panzoom.click", this.onNavClick),
      e.on("Panzoom.touchEnd", this.onNavTouch),
      this.onTargetChange();
  }
  onTargetReady(e) {
    e.on("change", this.onTargetChange),
      e.on("Panzoom.refresh", this.onTargetChange),
      this.onTargetChange();
  }
  onNavClick(e, t, i) {
    this.onNavTouch(e, e.panzoom, i);
  }
  onNavTouch(e, t, i) {
    var s, n;
    if (Math.abs(t.dragOffset.x) > 3 || Math.abs(t.dragOffset.y) > 3) return;
    const r = i.target,
      { nav: a, target: l } = this;
    if (!a || !l || !r) return;
    const c = r.closest("[data-index]");
    if ((i.stopPropagation(), i.preventDefault(), !c)) return;
    const d = parseInt(c.dataset.index || "", 10) || 0,
      u = l.getPageForSlide(d),
      f = a.getPageForSlide(d);
    a.slideTo(f),
      l.slideTo(u, {
        friction:
          ((n =
            (s = this.nav) === null || s === void 0 ? void 0 : s.plugins) ===
            null || n === void 0
            ? void 0
            : n.Sync.option("friction")) || 0,
      }),
      this.markSelectedSlide(d);
  }
  onNavCreateSlide(e, t) {
    t.index === this.selectedIndex && this.markSelectedSlide(t.index);
  }
  onTargetChange() {
    var e, t;
    const { target: i, nav: s } = this;
    if (!i || !s || s.state !== H.Ready || i.state !== H.Ready) return;
    const n =
        (t =
          (e = i.pages[i.page]) === null || e === void 0
            ? void 0
            : e.slides[0]) === null || t === void 0
          ? void 0
          : t.index,
      r = s.getPageForSlide(n);
    this.markSelectedSlide(n),
      s.slideTo(
        r,
        s.prevPage === null && i.prevPage === null ? { friction: 0 } : void 0
      );
  }
  markSelectedSlide(e) {
    const t = this.nav;
    t &&
      t.state === H.Ready &&
      ((this.selectedIndex = e),
      [...t.slides].map((i) => {
        i.el &&
          i.el.classList[i.index === e ? "add" : "remove"]("is-nav-selected");
      }));
  }
  attach() {
    const e = this;
    let t = e.options.target,
      i = e.options.nav;
    t ? e.addAsNavFor(t) : i && e.addAsTargetFor(i);
  }
  detach() {
    const e = this,
      t = e.nav,
      i = e.target;
    t &&
      (t.off("ready", e.onNavReady),
      t.off("createSlide", e.onNavCreateSlide),
      t.off("Panzoom.click", e.onNavClick),
      t.off("Panzoom.touchEnd", e.onNavTouch)),
      (e.nav = null),
      i &&
        (i.off("ready", e.onTargetReady),
        i.off("refresh", e.onTargetChange),
        i.off("change", e.onTargetChange)),
      (e.target = null);
  }
}
Object.defineProperty(Ci, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: { friction: 0.35 },
});
const yn = { Navigation: Mi, Dots: Pi, Sync: Ci },
  Ne = "animationend",
  Ut = "isSelected",
  _e = "slide";
class be extends zt {
  get axis() {
    return this.isHorizontal ? "e" : "f";
  }
  get isEnabled() {
    return this.state === H.Ready;
  }
  get isInfinite() {
    let e = !1;
    const { contentDim: t, viewportDim: i, pages: s, slides: n } = this,
      r = n[0];
    return (
      s.length >= 2 && r && t + r.dim >= i && (e = this.option("infinite")), e
    );
  }
  get isRTL() {
    return this.option("direction") === "rtl";
  }
  get isHorizontal() {
    return this.option("axis") === "x";
  }
  constructor(e, t = {}, i = {}) {
    if (
      (super(),
      Object.defineProperty(this, "bp", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "",
      }),
      Object.defineProperty(this, "lp", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "userOptions", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {},
      }),
      Object.defineProperty(this, "userPlugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {},
      }),
      Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: H.Init,
      }),
      Object.defineProperty(this, "page", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "prevPage", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "viewport", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "track", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "slides", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      Object.defineProperty(this, "pages", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      Object.defineProperty(this, "panzoom", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "inTransition", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Set(),
      }),
      Object.defineProperty(this, "contentDim", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "viewportDim", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      typeof e == "string" && (e = document.querySelector(e)),
      !e || !X(e))
    )
      throw new Error("No Element found");
    (this.container = e),
      (this.slideNext = qt(this.slideNext.bind(this), 150)),
      (this.slidePrev = qt(this.slidePrev.bind(this), 150)),
      (this.userOptions = t),
      (this.userPlugins = i),
      queueMicrotask(() => {
        this.processOptions();
      });
  }
  processOptions() {
    var e, t;
    const i = q({}, be.defaults, this.userOptions);
    let s = "";
    const n = i.breakpoints;
    if (n && Ot(n))
      for (const [r, a] of Object.entries(n))
        window.matchMedia(r).matches && Ot(a) && ((s += r), q(i, a));
    (s === this.bp && this.state !== H.Init) ||
      ((this.bp = s),
      this.state === H.Ready &&
        (i.initialSlide =
          ((t =
            (e = this.pages[this.page]) === null || e === void 0
              ? void 0
              : e.slides[0]) === null || t === void 0
            ? void 0
            : t.index) || 0),
      this.state !== H.Init && this.destroy(),
      super.setOptions(i),
      this.option("enabled") === !1
        ? this.attachEvents()
        : setTimeout(() => {
            this.init();
          }, 0));
  }
  init() {
    (this.state = H.Init),
      this.emit("init"),
      this.attachPlugins(
        Object.assign(Object.assign({}, be.Plugins), this.userPlugins)
      ),
      this.emit("attachPlugins"),
      this.initLayout(),
      this.initSlides(),
      this.updateMetrics(),
      this.setInitialPosition(),
      this.initPanzoom(),
      this.attachEvents(),
      (this.state = H.Ready),
      this.emit("ready");
  }
  initLayout() {
    const { container: e } = this,
      t = this.option("classes");
    I(e, this.cn("container")),
      oe(e, t.isLTR, !this.isRTL),
      oe(e, t.isRTL, this.isRTL),
      oe(e, t.isVertical, !this.isHorizontal),
      oe(e, t.isHorizontal, this.isHorizontal);
    let i = this.option("viewport") || e.querySelector(`.${t.viewport}`);
    i ||
      ((i = document.createElement("div")),
      I(i, t.viewport),
      i.append(...Yt(e, `.${t.slide}`)),
      e.prepend(i)),
      i.addEventListener("scroll", this.onScroll);
    let s = this.option("track") || e.querySelector(`.${t.track}`);
    s ||
      ((s = document.createElement("div")),
      I(s, t.track),
      s.append(...Array.from(i.childNodes))),
      s.setAttribute("aria-live", "polite"),
      i.contains(s) || i.prepend(s),
      (this.viewport = i),
      (this.track = s),
      this.emit("initLayout");
  }
  initSlides() {
    const { track: e } = this;
    if (!e) return;
    const t = [...this.slides],
      i = [];
    [...Yt(e, `.${this.cn(_e)}`)].forEach((s) => {
      if (X(s)) {
        const n = ft({ el: s, isDom: !0, index: this.slides.length });
        i.push(n);
      }
    });
    for (let s of [...(this.option("slides", []) || []), ...t]) i.push(ft(s));
    this.slides = i;
    for (let s = 0; s < this.slides.length; s++) this.slides[s].index = s;
    for (const s of i)
      this.emit("beforeInitSlide", s, s.index),
        this.emit("initSlide", s, s.index);
    this.emit("initSlides");
  }
  setInitialPage() {
    const e = this.option("initialSlide");
    this.page =
      typeof e == "number"
        ? this.getPageForSlide(e)
        : parseInt(this.option("initialPage", 0) + "", 10) || 0;
  }
  setInitialPosition() {
    const { track: e, pages: t, isHorizontal: i } = this;
    if (!e || !t.length) return;
    let s = this.page;
    t[s] || (this.page = s = 0);
    const n = (t[s].pos || 0) * (this.isRTL && i ? 1 : -1),
      r = i ? `${n}px` : "0",
      a = i ? "0" : `${n}px`;
    (e.style.transform = `translate3d(${r}, ${a}, 0) scale(1)`),
      this.option("adaptiveHeight") && this.setViewportHeight();
  }
  initPanzoom() {
    this.panzoom && (this.panzoom.destroy(), (this.panzoom = null));
    const e = this.option("Panzoom") || {};
    (this.panzoom = new ye(
      this.viewport,
      q(
        {},
        {
          content: this.track,
          zoom: !1,
          panOnlyZoomed: !1,
          lockAxis: this.isHorizontal ? "x" : "y",
          infinite: this.isInfinite,
          click: !1,
          dblClick: !1,
          touch: (t) => !(this.pages.length < 2 && !t.options.infinite),
          bounds: () => this.getBounds(),
          maxVelocity: (t) =>
            Math.abs(t.target[this.axis] - t.current[this.axis]) <
            2 * this.viewportDim
              ? 100
              : 0,
        },
        e
      )
    )),
      this.panzoom.on("*", (t, i, ...s) => {
        this.emit(`Panzoom.${i}`, t, ...s);
      }),
      this.panzoom.on("decel", this.onDecel),
      this.panzoom.on("refresh", this.onRefresh),
      this.panzoom.on("beforeTransform", this.onBeforeTransform),
      this.panzoom.on("endAnimation", this.onEndAnimation);
  }
  attachEvents() {
    const e = this.container;
    e &&
      (e.addEventListener("click", this.onClick, { passive: !1, capture: !1 }),
      e.addEventListener("slideTo", this.onSlideTo)),
      window.addEventListener("resize", this.onResize);
  }
  createPages() {
    let e = [];
    const { contentDim: t, viewportDim: i } = this;
    let s = this.option("slidesPerPage");
    s =
      (s === "auto" || t <= i) && this.option("fill") !== !1
        ? 1 / 0
        : parseFloat(s + "");
    let n = 0,
      r = 0,
      a = 0;
    for (const l of this.slides)
      (!e.length || r + l.dim - i > 0.05 || a >= s) &&
        (e.push(vn()), (n = e.length - 1), (r = 0), (a = 0)),
        e[n].slides.push(l),
        (r += l.dim + l.gap),
        a++;
    return e;
  }
  processPages() {
    const e = this.pages,
      { contentDim: t, viewportDim: i, isInfinite: s } = this,
      n = this.option("center"),
      r = this.option("fill"),
      a = r && n && t > i && !s;
    if (
      (e.forEach((d, u) => {
        var f;
        (d.index = u),
          (d.pos =
            ((f = d.slides[0]) === null || f === void 0 ? void 0 : f.pos) || 0),
          (d.dim = 0);
        for (const [h, p] of d.slides.entries())
          (d.dim += p.dim), h < d.slides.length - 1 && (d.dim += p.gap);
        a && d.pos + 0.5 * d.dim < 0.5 * i
          ? (d.pos = 0)
          : a && d.pos + 0.5 * d.dim >= t - 0.5 * i
          ? (d.pos = t - i)
          : n && (d.pos += -0.5 * (i - d.dim));
      }),
      e.forEach((d) => {
        r &&
          !s &&
          t > i &&
          ((d.pos = Math.max(d.pos, 0)), (d.pos = Math.min(d.pos, t - i))),
          (d.pos = M(d.pos, 1e3)),
          (d.dim = M(d.dim, 1e3)),
          Math.abs(d.pos) <= 0.1 && (d.pos = 0);
      }),
      s)
    )
      return e;
    const l = [];
    let c;
    return (
      e.forEach((d) => {
        const u = Object.assign({}, d);
        c && u.pos === c.pos
          ? ((c.dim += u.dim), (c.slides = [...c.slides, ...u.slides]))
          : ((u.index = l.length), (c = u), l.push(u));
      }),
      l
    );
  }
  getPageFromIndex(e = 0) {
    const t = this.pages.length;
    let i;
    return (
      (e = parseInt((e || 0).toString()) || 0),
      (i = this.isInfinite
        ? ((e % t) + t) % t
        : Math.max(Math.min(e, t - 1), 0)),
      i
    );
  }
  getSlideMetrics(e) {
    var t, i;
    const s = this.isHorizontal ? "width" : "height";
    let n = 0,
      r = 0,
      a = e.el;
    const l = !(!a || a.parentNode);
    if (
      (a
        ? (n = parseFloat(a.dataset[s] || "") || 0)
        : ((a = document.createElement("div")),
          (a.style.visibility = "hidden"),
          (this.track || document.body).prepend(a)),
      I(a, this.cn(_e) + " " + e.class + " " + e.customClass),
      n)
    )
      (a.style[s] = `${n}px`),
        (a.style[s === "width" ? "height" : "width"] = "");
    else {
      l && (this.track || document.body).prepend(a),
        (n =
          a.getBoundingClientRect()[s] *
          Math.max(
            1,
            ((t = window.visualViewport) === null || t === void 0
              ? void 0
              : t.scale) || 1
          ));
      let d = a[this.isHorizontal ? "offsetWidth" : "offsetHeight"];
      d - 1 > n && (n = d);
    }
    const c = getComputedStyle(a);
    return (
      c.boxSizing === "content-box" &&
        (this.isHorizontal
          ? ((n += parseFloat(c.paddingLeft) || 0),
            (n += parseFloat(c.paddingRight) || 0))
          : ((n += parseFloat(c.paddingTop) || 0),
            (n += parseFloat(c.paddingBottom) || 0))),
      (r =
        parseFloat(c[this.isHorizontal ? "marginRight" : "marginBottom"]) || 0),
      l
        ? (i = a.parentElement) === null || i === void 0 || i.removeChild(a)
        : e.el || a.remove(),
      { dim: M(n, 1e3), gap: M(r, 1e3) }
    );
  }
  getBounds() {
    const { isInfinite: e, isRTL: t, isHorizontal: i, pages: s } = this;
    let n = { min: 0, max: 0 };
    if (e) n = { min: -1 / 0, max: 1 / 0 };
    else if (s.length) {
      const r = s[0].pos,
        a = s[s.length - 1].pos;
      n = t && i ? { min: r, max: a } : { min: -1 * a, max: -1 * r };
    }
    return { x: i ? n : { min: 0, max: 0 }, y: i ? { min: 0, max: 0 } : n };
  }
  repositionSlides() {
    let e,
      {
        isHorizontal: t,
        isRTL: i,
        isInfinite: s,
        viewport: n,
        viewportDim: r,
        contentDim: a,
        page: l,
        pages: c,
        slides: d,
        panzoom: u,
      } = this,
      f = 0,
      h = 0,
      p = 0,
      m = 0;
    u ? (m = -1 * u.current[this.axis]) : c[l] && (m = c[l].pos || 0),
      (e = t ? (i ? "right" : "left") : "top"),
      i && t && (m *= -1);
    for (const b of d) {
      const w = b.el;
      w
        ? (e === "top"
            ? ((w.style.right = ""), (w.style.left = ""))
            : (w.style.top = ""),
          b.index !== f
            ? (w.style[e] = h === 0 ? "" : `${M(h, 1e3)}px`)
            : (w.style[e] = ""),
          (p += b.dim + b.gap),
          f++)
        : (h += b.dim + b.gap);
    }
    if (s && p && n) {
      let b = getComputedStyle(n),
        w = "padding",
        T = t ? "Right" : "Bottom",
        C = parseFloat(b[w + (t ? "Left" : "Top")]);
      (m -= C), (r += C), (r += parseFloat(b[w + T]));
      for (const z of d)
        z.el &&
          (M(z.pos) < M(r) &&
            M(z.pos + z.dim + z.gap) < M(m) &&
            M(m) > M(a - r) &&
            (z.el.style[e] = `${M(h + p, 1e3)}px`),
          M(z.pos + z.gap) >= M(a - r) &&
            M(z.pos) > M(m + r) &&
            M(m) < M(r) &&
            (z.el.style[e] = `-${M(p, 1e3)}px`));
    }
    let v,
      g,
      y = [...this.inTransition];
    if ((y.length > 1 && ((v = c[y[0]]), (g = c[y[1]])), v && g)) {
      let b = 0;
      for (const w of d)
        w.el
          ? this.inTransition.has(w.index) &&
            v.slides.indexOf(w) < 0 &&
            (w.el.style[e] = `${M(b + (v.pos - g.pos), 1e3)}px`)
          : (b += w.dim + w.gap);
    }
  }
  createSlideEl(e) {
    const { track: t, slides: i } = this;
    if (!t || !e || (e.el && e.el.parentNode)) return;
    const s = e.el || document.createElement("div");
    I(s, this.cn(_e)), I(s, e.class), I(s, e.customClass);
    const n = e.html;
    n &&
      (n instanceof HTMLElement
        ? s.appendChild(n)
        : (s.innerHTML = e.html + ""));
    const r = [];
    i.forEach((d, u) => {
      d.el && r.push(u);
    });
    const a = e.index;
    let l = null;
    r.length &&
      (l = i[r.reduce((d, u) => (Math.abs(u - a) < Math.abs(d - a) ? u : d))]);
    const c =
      l && l.el && l.el.parentNode
        ? l.index < e.index
          ? l.el.nextSibling
          : l.el
        : null;
    t.insertBefore(s, t.contains(c) ? c : null),
      (e.el = s),
      this.emit("createSlide", e);
  }
  removeSlideEl(e, t = !1) {
    const i = e == null ? void 0 : e.el;
    if (!i || !i.parentNode) return;
    const s = this.cn(Ut);
    if (
      (i.classList.contains(s) && (F(i, s), this.emit("unselectSlide", e)),
      e.isDom && !t)
    )
      return (
        i.removeAttribute("aria-hidden"),
        i.removeAttribute("data-index"),
        void (i.style.left = "")
      );
    this.emit("removeSlide", e);
    const n = new CustomEvent(Ne);
    i.dispatchEvent(n), e.el && (e.el.remove(), (e.el = null));
  }
  transitionTo(e = 0, t = this.option("transition")) {
    var i, s, n, r;
    if (!t) return !1;
    const a = this.page,
      { pages: l, panzoom: c } = this;
    e = parseInt((e || 0).toString()) || 0;
    const d = this.getPageFromIndex(e);
    if (
      !c ||
      !l[d] ||
      l.length < 2 ||
      Math.abs(
        (((s = (i = l[a]) === null || i === void 0 ? void 0 : i.slides[0]) ===
          null || s === void 0
          ? void 0
          : s.dim) || 0) - this.viewportDim
      ) > 1
    )
      return !1;
    let u = e > a ? 1 : -1;
    this.isInfinite &&
      (a === 0 && e === l.length - 1 && (u = -1),
      a === l.length - 1 && e === 0 && (u = 1));
    const f = l[d].pos * (this.isRTL ? 1 : -1);
    if (a === d && Math.abs(f - c.target[this.axis]) < 1) return !1;
    this.clearTransitions();
    const h = c.isResting;
    I(this.container, this.cn("inTransition"));
    const p =
        ((n = l[a]) === null || n === void 0 ? void 0 : n.slides[0]) || null,
      m = ((r = l[d]) === null || r === void 0 ? void 0 : r.slides[0]) || null;
    this.inTransition.add(m.index), this.createSlideEl(m);
    let v = p.el,
      g = m.el;
    h || t === _e || ((t = "fadeFast"), (v = null));
    const y = this.isRTL ? "next" : "prev",
      b = this.isRTL ? "prev" : "next";
    return (
      v &&
        (this.inTransition.add(p.index),
        (p.transition = t),
        v.addEventListener(Ne, this.onAnimationEnd),
        v.classList.add(`f-${t}Out`, `to-${u > 0 ? b : y}`)),
      g &&
        ((m.transition = t),
        g.addEventListener(Ne, this.onAnimationEnd),
        g.classList.add(`f-${t}In`, `from-${u > 0 ? y : b}`)),
      (c.current[this.axis] = f),
      (c.target[this.axis] = f),
      c.requestTick(),
      this.onChange(d),
      !0
    );
  }
  manageSlideVisiblity() {
    const e = new Set(),
      t = new Set(),
      i = this.getVisibleSlides(
        parseFloat(this.option("preload", 0) + "") || 0
      );
    for (const s of this.slides) i.has(s) ? e.add(s) : t.add(s);
    for (const s of this.inTransition) e.add(this.slides[s]);
    for (const s of e) this.createSlideEl(s), this.lazyLoadSlide(s);
    for (const s of t) e.has(s) || this.removeSlideEl(s);
    this.markSelectedSlides(), this.repositionSlides();
  }
  markSelectedSlides() {
    if (!this.pages[this.page] || !this.pages[this.page].slides) return;
    const e = "aria-hidden";
    let t = this.cn(Ut);
    if (t)
      for (const i of this.slides) {
        const s = i.el;
        s &&
          ((s.dataset.index = `${i.index}`),
          s.classList.contains("f-thumbs__slide")
            ? this.getVisibleSlides(0).has(i)
              ? s.removeAttribute(e)
              : s.setAttribute(e, "true")
            : this.pages[this.page].slides.includes(i)
            ? (s.classList.contains(t) ||
                (I(s, t), this.emit("selectSlide", i)),
              s.removeAttribute(e))
            : (s.classList.contains(t) &&
                (F(s, t), this.emit("unselectSlide", i)),
              s.setAttribute(e, "true")));
      }
  }
  flipInfiniteTrack() {
    const {
        axis: e,
        isHorizontal: t,
        isInfinite: i,
        isRTL: s,
        viewportDim: n,
        contentDim: r,
      } = this,
      a = this.panzoom;
    if (!a || !i) return;
    let l = a.current[e],
      c = a.target[e] - l,
      d = 0,
      u = 0.5 * n;
    s && t
      ? (l < -u && ((d = -1), (l += r)), l > r - u && ((d = 1), (l -= r)))
      : (l > u && ((d = 1), (l -= r)), l < -r + u && ((d = -1), (l += r))),
      d && ((a.current[e] = l), (a.target[e] = l + c));
  }
  lazyLoadImg(e, t) {
    const i = this,
      s = "f-fadeIn",
      n = "is-preloading";
    let r = !1,
      a = null;
    const l = () => {
      r ||
        ((r = !0),
        a && (a.remove(), (a = null)),
        F(t, n),
        t.complete &&
          (I(t, s),
          setTimeout(() => {
            F(t, s);
          }, 350)),
        this.option("adaptiveHeight") &&
          e.el &&
          this.pages[this.page].slides.indexOf(e) > -1 &&
          (i.updateMetrics(), i.setViewportHeight()),
        this.emit("load", e));
    };
    I(t, n),
      (t.src = t.dataset.lazySrcset || t.dataset.lazySrc || ""),
      delete t.dataset.lazySrc,
      delete t.dataset.lazySrcset,
      t.addEventListener("error", () => {
        l();
      }),
      t.addEventListener("load", () => {
        l();
      }),
      setTimeout(() => {
        const c = t.parentNode;
        c &&
          e.el &&
          (t.complete ? l() : r || ((a = ne(kt)), c.insertBefore(a, t)));
      }, 300);
  }
  lazyLoadSlide(e) {
    const t = e && e.el;
    if (!t) return;
    const i = new Set();
    let s = Array.from(
      t.querySelectorAll("[data-lazy-src],[data-lazy-srcset]")
    );
    t.dataset.lazySrc && s.push(t),
      s.map((n) => {
        n instanceof HTMLImageElement
          ? i.add(n)
          : n instanceof HTMLElement &&
            n.dataset.lazySrc &&
            ((n.style.backgroundImage = `url('${n.dataset.lazySrc}')`),
            delete n.dataset.lazySrc);
      });
    for (const n of i) this.lazyLoadImg(e, n);
  }
  onAnimationEnd(e) {
    var t;
    const i = e.target,
      s = i ? parseInt(i.dataset.index || "", 10) || 0 : -1,
      n = this.slides[s],
      r = e.animationName;
    if (!i || !n || !r) return;
    const a = !!this.inTransition.has(s) && n.transition;
    a &&
      r.substring(0, a.length + 2) === `f-${a}` &&
      this.inTransition.delete(s),
      this.inTransition.size || this.clearTransitions(),
      s === this.page &&
        !((t = this.panzoom) === null || t === void 0) &&
        t.isResting &&
        this.emit("settle");
  }
  onDecel(e, t = 0, i = 0, s = 0, n = 0) {
    if (this.option("dragFree")) return void this.setPageFromPosition();
    const { isRTL: r, isHorizontal: a, axis: l, pages: c } = this,
      d = c.length,
      u = Math.abs(Math.atan2(i, t) / (Math.PI / 180));
    let f = 0;
    if (((f = u > 45 && u < 135 ? (a ? 0 : i) : a ? t : 0), !d)) return;
    let h = this.page,
      p = r && a ? 1 : -1;
    const m = e.current[l] * p;
    let { pageIndex: v } = this.getPageFromPosition(m);
    Math.abs(f) > 5
      ? (c[h].dim <
          document.documentElement[
            "client" + (this.isHorizontal ? "Width" : "Height")
          ] -
            1 && (h = v),
        (h = r && a ? (f < 0 ? h - 1 : h + 1) : f < 0 ? h + 1 : h - 1))
      : (h = s === 0 && n === 0 ? h : v),
      this.slideTo(h, { transition: !1, friction: e.option("decelFriction") });
  }
  onClick(e) {
    const t = e.target,
      i = t && X(t) ? t.dataset : null;
    let s, n;
    i &&
      (i.carouselPage !== void 0
        ? ((n = "slideTo"), (s = i.carouselPage))
        : i.carouselNext !== void 0
        ? (n = "slideNext")
        : i.carouselPrev !== void 0 && (n = "slidePrev")),
      n
        ? (e.preventDefault(),
          e.stopPropagation(),
          t && !t.hasAttribute("disabled") && this[n](s))
        : this.emit("click", e);
  }
  onSlideTo(e) {
    const t = e.detail || 0;
    this.slideTo(this.getPageForSlide(t), { friction: 0 });
  }
  onChange(e, t = 0) {
    const i = this.page;
    (this.prevPage = i),
      (this.page = e),
      this.option("adaptiveHeight") && this.setViewportHeight(),
      e !== i && (this.markSelectedSlides(), this.emit("change", e, i, t));
  }
  onRefresh() {
    let e = this.contentDim,
      t = this.viewportDim;
    this.updateMetrics(),
      (this.contentDim === e && this.viewportDim === t) ||
        this.slideTo(this.page, { friction: 0, transition: !1 });
  }
  onScroll() {
    var e;
    (e = this.viewport) === null || e === void 0 || e.scroll(0, 0);
  }
  onResize() {
    this.option("breakpoints") && this.processOptions();
  }
  onBeforeTransform(e) {
    this.lp !== e.current[this.axis] &&
      (this.flipInfiniteTrack(), this.manageSlideVisiblity()),
      (this.lp = e.current.e);
  }
  onEndAnimation() {
    this.inTransition.size || this.emit("settle");
  }
  reInit(e = null, t = null) {
    this.destroy(),
      (this.state = H.Init),
      (this.prevPage = null),
      (this.userOptions = e || this.userOptions),
      (this.userPlugins = t || this.userPlugins),
      this.processOptions();
  }
  slideTo(
    e = 0,
    {
      friction: t = this.option("friction"),
      transition: i = this.option("transition"),
    } = {}
  ) {
    if (this.state === H.Destroy) return;
    e = parseInt((e || 0).toString()) || 0;
    const s = this.getPageFromIndex(e),
      { axis: n, isHorizontal: r, isRTL: a, pages: l, panzoom: c } = this,
      d = l.length,
      u = a && r ? 1 : -1;
    if (!c || !d) return;
    if (this.page !== s) {
      const h = new Event("beforeChange", { bubbles: !0, cancelable: !0 });
      if ((this.emit("beforeChange", h, e), h.defaultPrevented)) return;
    }
    if (this.transitionTo(e, i)) return;
    let f = l[s].pos;
    if (this.isInfinite) {
      const h = this.contentDim,
        p = c.target[n] * u;
      d === 2
        ? (f += h * Math.floor(parseFloat(e + "") / 2))
        : (f = [f, f - h, f + h].reduce(function (m, v) {
            return Math.abs(v - p) < Math.abs(m - p) ? v : m;
          }));
    }
    (f *= u),
      Math.abs(c.target[n] - f) < 1 ||
        (c.panTo({ x: r ? f : 0, y: r ? 0 : f, friction: t }),
        this.onChange(s));
  }
  slideToClosest(e) {
    if (this.panzoom) {
      const { pageIndex: t } = this.getPageFromPosition();
      this.slideTo(t, e);
    }
  }
  slideNext() {
    this.slideTo(this.page + 1);
  }
  slidePrev() {
    this.slideTo(this.page - 1);
  }
  clearTransitions() {
    this.inTransition.clear(), F(this.container, this.cn("inTransition"));
    const e = ["to-prev", "to-next", "from-prev", "from-next"];
    for (const t of this.slides) {
      const i = t.el;
      if (i) {
        i.removeEventListener(Ne, this.onAnimationEnd),
          i.classList.remove(...e);
        const s = t.transition;
        s && i.classList.remove(`f-${s}Out`, `f-${s}In`);
      }
    }
    this.manageSlideVisiblity();
  }
  addSlide(e, t) {
    var i, s, n, r;
    const a = this.panzoom,
      l =
        ((i = this.pages[this.page]) === null || i === void 0
          ? void 0
          : i.pos) || 0,
      c =
        ((s = this.pages[this.page]) === null || s === void 0
          ? void 0
          : s.dim) || 0,
      d = this.contentDim < this.viewportDim;
    let u = Array.isArray(t) ? t : [t];
    const f = [];
    for (const h of u) f.push(ft(h));
    this.slides.splice(e, 0, ...f);
    for (let h = 0; h < this.slides.length; h++) this.slides[h].index = h;
    for (const h of f) this.emit("beforeInitSlide", h, h.index);
    if ((this.page >= e && (this.page += f.length), this.updateMetrics(), a)) {
      const h =
          ((n = this.pages[this.page]) === null || n === void 0
            ? void 0
            : n.pos) || 0,
        p =
          ((r = this.pages[this.page]) === null || r === void 0
            ? void 0
            : r.dim) || 0,
        m = this.pages.length || 1,
        v = this.isRTL ? c - p : p - c,
        g = this.isRTL ? l - h : h - l;
      d && m === 1
        ? (e <= this.page &&
            ((a.current[this.axis] -= v), (a.target[this.axis] -= v)),
          a.panTo({ [this.isHorizontal ? "x" : "y"]: -1 * h }))
        : g &&
          e <= this.page &&
          ((a.target[this.axis] -= g),
          (a.current[this.axis] -= g),
          a.requestTick());
    }
    for (const h of f) this.emit("initSlide", h, h.index);
  }
  prependSlide(e) {
    this.addSlide(0, e);
  }
  appendSlide(e) {
    this.addSlide(this.slides.length, e);
  }
  removeSlide(e) {
    const t = this.slides.length;
    e = ((e % t) + t) % t;
    const i = this.slides[e];
    if (i) {
      this.removeSlideEl(i, !0), this.slides.splice(e, 1);
      for (let s = 0; s < this.slides.length; s++) this.slides[s].index = s;
      this.updateMetrics(),
        this.slideTo(this.page, { friction: 0, transition: !1 }),
        this.emit("destroySlide", i);
    }
  }
  updateMetrics() {
    const {
      panzoom: e,
      viewport: t,
      track: i,
      slides: s,
      isHorizontal: n,
      isInfinite: r,
    } = this;
    if (!i) return;
    const a = n ? "width" : "height",
      l = n ? "offsetWidth" : "offsetHeight";
    if (t) {
      let u = Math.max(t[l], M(t.getBoundingClientRect()[a], 1e3)),
        f = getComputedStyle(t),
        h = "padding",
        p = n ? "Right" : "Bottom";
      (u -= parseFloat(f[h + (n ? "Left" : "Top")]) + parseFloat(f[h + p])),
        (this.viewportDim = u);
    }
    let c,
      d = 0;
    for (const [u, f] of s.entries()) {
      let h = 0,
        p = 0;
      !f.el && c
        ? ((h = c.dim), (p = c.gap))
        : (({ dim: h, gap: p } = this.getSlideMetrics(f)), (c = f)),
        (h = M(h, 1e3)),
        (p = M(p, 1e3)),
        (f.dim = h),
        (f.gap = p),
        (f.pos = d),
        (d += h),
        (r || u < s.length - 1) && (d += p);
    }
    (d = M(d, 1e3)),
      (this.contentDim = d),
      e &&
        ((e.contentRect[a] = d),
        (e.contentRect[n ? "fullWidth" : "fullHeight"] = d)),
      (this.pages = this.createPages()),
      (this.pages = this.processPages()),
      this.state === H.Init && this.setInitialPage(),
      (this.page = Math.max(0, Math.min(this.page, this.pages.length - 1))),
      this.manageSlideVisiblity(),
      this.emit("refresh");
  }
  getProgress(e, t = !1, i = !1) {
    e === void 0 && (e = this.page);
    const s = this,
      n = s.panzoom,
      r = s.contentDim,
      a = s.pages[e] || 0;
    if (!a || !n) return e > this.page ? -1 : 1;
    let l = -1 * n.current.e,
      c = M((l - a.pos) / (1 * a.dim), 1e3),
      d = c,
      u = c;
    this.isInfinite &&
      i !== !0 &&
      ((d = M((l - a.pos + r) / (1 * a.dim), 1e3)),
      (u = M((l - a.pos - r) / (1 * a.dim), 1e3)));
    let f = [c, d, u].reduce(function (h, p) {
      return Math.abs(p) < Math.abs(h) ? p : h;
    });
    return t ? f : f > 1 ? 1 : f < -1 ? -1 : f;
  }
  setViewportHeight() {
    const { page: e, pages: t, viewport: i, isHorizontal: s } = this;
    if (!i || !t[e]) return;
    let n = 0;
    s &&
      this.track &&
      ((this.track.style.height = "auto"),
      t[e].slides.forEach((r) => {
        r.el && (n = Math.max(n, r.el.offsetHeight));
      })),
      (i.style.height = n ? `${n}px` : "");
  }
  getPageForSlide(e) {
    for (const t of this.pages)
      for (const i of t.slides) if (i.index === e) return t.index;
    return -1;
  }
  getVisibleSlides(e = 0) {
    var t;
    const i = new Set();
    let { panzoom: s, contentDim: n, viewportDim: r, pages: a, page: l } = this;
    if (r) {
      n =
        n +
          ((t = this.slides[this.slides.length - 1]) === null || t === void 0
            ? void 0
            : t.gap) || 0;
      let c = 0;
      (c =
        s && s.state !== j.Init && s.state !== j.Destroy
          ? -1 * s.current[this.axis]
          : (a[l] && a[l].pos) || 0),
        this.isInfinite && (c -= Math.floor(c / n) * n),
        this.isRTL && this.isHorizontal && (c *= -1);
      const d = c - r * e,
        u = c + r * (e + 1),
        f = this.isInfinite ? [-1, 0, 1] : [0];
      for (const h of this.slides)
        for (const p of f) {
          const m = h.pos + p * n,
            v = m + h.dim + h.gap;
          m < u && v > d && i.add(h);
        }
    }
    return i;
  }
  getPageFromPosition(e) {
    const {
        viewportDim: t,
        contentDim: i,
        slides: s,
        pages: n,
        panzoom: r,
      } = this,
      a = n.length,
      l = s.length,
      c = s[0],
      d = s[l - 1],
      u = this.option("center");
    let f = 0,
      h = 0,
      p = 0,
      m =
        e === void 0
          ? -1 * ((r == null ? void 0 : r.target[this.axis]) || 0)
          : e;
    u && (m += 0.5 * t),
      this.isInfinite
        ? (m < c.pos - 0.5 * d.gap && ((m -= i), (p = -1)),
          m > d.pos + d.dim + 0.5 * d.gap && ((m -= i), (p = 1)))
        : (m = Math.max(c.pos || 0, Math.min(m, d.pos)));
    let v = d,
      g = s.find((y) => {
        const b = y.pos - 0.5 * v.gap,
          w = y.pos + y.dim + 0.5 * y.gap;
        return (v = y), m >= b && m < w;
      });
    return (
      g || (g = d),
      (h = this.getPageForSlide(g.index)),
      (f = h + p * a),
      { page: f, pageIndex: h }
    );
  }
  setPageFromPosition() {
    const { pageIndex: e } = this.getPageFromPosition();
    this.onChange(e);
  }
  destroy() {
    if ([H.Destroy].includes(this.state)) return;
    this.state = H.Destroy;
    const { container: e, viewport: t, track: i, slides: s, panzoom: n } = this,
      r = this.option("classes");
    e.removeEventListener("click", this.onClick, { passive: !1, capture: !1 }),
      e.removeEventListener("slideTo", this.onSlideTo),
      window.removeEventListener("resize", this.onResize),
      n && (n.destroy(), (this.panzoom = null)),
      s &&
        s.forEach((l) => {
          this.removeSlideEl(l);
        }),
      this.detachPlugins(),
      t &&
        (t.removeEventListener("scroll", this.onScroll),
        t.offsetParent &&
          i &&
          i.offsetParent &&
          t.replaceWith(...i.childNodes));
    for (const [l, c] of Object.entries(r))
      l !== "container" && c && e.classList.remove(c);
    (this.track = null),
      (this.viewport = null),
      (this.page = 0),
      (this.slides = []);
    const a = this.events.get("ready");
    (this.events = new Map()), a && this.events.set("ready", a);
  }
}
Object.defineProperty(be, "Panzoom", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: ye,
}),
  Object.defineProperty(be, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: gn,
  }),
  Object.defineProperty(be, "Plugins", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: yn,
  });
const Oi = function (o) {
    if (!X(o)) return 0;
    const e = window.scrollY,
      t = window.innerHeight,
      i = e + t,
      s = o.getBoundingClientRect(),
      n = s.y + e,
      r = s.height,
      a = n + r;
    if (e > a || i < n) return 0;
    if ((e < n && i > a) || (n < e && a > i)) return 100;
    let l = r;
    n < e && (l -= e - n), a > i && (l -= a - i);
    const c = (l / t) * 100;
    return Math.round(c);
  },
  ze = !(
    typeof window > "u" ||
    !window.document ||
    !window.document.createElement
  );
let pt;
const mt = [
    "a[href]",
    "area[href]",
    'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
    "select:not([disabled]):not([aria-hidden])",
    "textarea:not([disabled]):not([aria-hidden])",
    "button:not([disabled]):not([aria-hidden]):not(.fancybox-focus-guard)",
    "iframe",
    "object",
    "embed",
    "video",
    "audio",
    "[contenteditable]",
    '[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])',
  ].join(","),
  Kt = (o) => {
    if (o && ze) {
      pt === void 0 &&
        document.createElement("div").focus({
          get preventScroll() {
            return (pt = !0), !1;
          },
        });
      try {
        if (pt) o.focus({ preventScroll: !0 });
        else {
          const e = window.scrollY || document.body.scrollTop,
            t = window.scrollX || document.body.scrollLeft;
          o.focus(),
            document.body.scrollTo({ top: e, left: t, behavior: "auto" });
        }
      } catch {}
    }
  },
  Li = () => {
    const o = document;
    let e,
      t = "",
      i = "",
      s = "";
    return (
      o.fullscreenEnabled
        ? ((t = "requestFullscreen"),
          (i = "exitFullscreen"),
          (s = "fullscreenElement"))
        : o.webkitFullscreenEnabled &&
          ((t = "webkitRequestFullscreen"),
          (i = "webkitExitFullscreen"),
          (s = "webkitFullscreenElement")),
      t &&
        (e = {
          request: function (n = o.documentElement) {
            return t === "webkitRequestFullscreen"
              ? n[t](Element.ALLOW_KEYBOARD_INPUT)
              : n[t]();
          },
          exit: function () {
            return o[s] && o[i]();
          },
          isFullscreen: function () {
            return o[s];
          },
        }),
      e
    );
  },
  Lt = {
    animated: !0,
    autoFocus: !0,
    backdropClick: "close",
    Carousel: {
      classes: {
        container: "fancybox__carousel",
        viewport: "fancybox__viewport",
        track: "fancybox__track",
        slide: "fancybox__slide",
      },
    },
    closeButton: "auto",
    closeExisting: !1,
    commonCaption: !1,
    compact: () =>
      window.matchMedia("(max-width: 578px), (max-height: 578px)").matches,
    contentClick: "toggleZoom",
    contentDblClick: !1,
    defaultType: "image",
    defaultDisplay: "flex",
    dragToClose: !0,
    Fullscreen: { autoStart: !1 },
    groupAll: !1,
    groupAttr: "data-fancybox",
    hideClass: "f-fadeOut",
    hideScrollbar: !0,
    idle: 3500,
    keyboard: {
      Escape: "close",
      Delete: "close",
      Backspace: "close",
      PageUp: "next",
      PageDown: "prev",
      ArrowUp: "prev",
      ArrowDown: "next",
      ArrowRight: "next",
      ArrowLeft: "prev",
    },
    l10n: Object.assign(Object.assign({}, Ei), {
      CLOSE: "Close",
      NEXT: "Next",
      PREV: "Previous",
      MODAL: "You can close this modal content with the ESC key",
      ERROR: "Something Went Wrong, Please Try Again Later",
      IMAGE_ERROR: "Image Not Found",
      ELEMENT_NOT_FOUND: "HTML Element Not Found",
      AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
      AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
      IFRAME_ERROR: "Error Loading Page",
      TOGGLE_ZOOM: "Toggle zoom level",
      TOGGLE_THUMBS: "Toggle thumbnails",
      TOGGLE_SLIDESHOW: "Toggle slideshow",
      TOGGLE_FULLSCREEN: "Toggle full-screen mode",
      DOWNLOAD: "Download",
    }),
    parentEl: null,
    placeFocusBack: !0,
    showClass: "f-zoomInUp",
    startIndex: 0,
    tpl: {
      closeButton:
        '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg></button>',
      main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
    <div class="fancybox__backdrop"></div>
    <div class="fancybox__carousel"></div>
    <div class="fancybox__footer"></div>
  </div>`,
    },
    trapFocus: !0,
    wheel: "zoom",
  };
var _, G;
(function (o) {
  (o[(o.Init = 0)] = "Init"),
    (o[(o.Ready = 1)] = "Ready"),
    (o[(o.Closing = 2)] = "Closing"),
    (o[(o.CustomClosing = 3)] = "CustomClosing"),
    (o[(o.Destroy = 4)] = "Destroy");
})(_ || (_ = {})),
  (function (o) {
    (o[(o.Loading = 0)] = "Loading"),
      (o[(o.Opening = 1)] = "Opening"),
      (o[(o.Ready = 2)] = "Ready"),
      (o[(o.Closing = 3)] = "Closing");
  })(G || (G = {}));
let Jt = "",
  Ie = !1,
  Ve = !1,
  ge = null;
const Ai = () => {
    let o = "",
      e = "";
    const t = R.getInstance();
    if (t) {
      const i = t.carousel,
        s = t.getSlide();
      if (i && s) {
        let n = s.slug || void 0,
          r = s.triggerEl || void 0;
        (e = n || t.option("slug") || ""),
          !e && r && r.dataset && (e = r.dataset.fancybox || ""),
          e &&
            e !== "true" &&
            (o =
              "#" + e + (!n && i.slides.length > 1 ? "-" + (s.index + 1) : ""));
      }
    }
    return { hash: o, slug: e, index: 1 };
  },
  Je = () => {
    const o = new URL(document.URL).hash,
      e = o.slice(1).split("-"),
      t = e[e.length - 1],
      i = (t && /^\+?\d+$/.test(t) && parseInt(e.pop() || "1", 10)) || 1;
    return { hash: o, slug: e.join("-"), index: i };
  },
  Ii = () => {
    const { slug: o, index: e } = Je();
    if (!o) return;
    let t = document.querySelector(`[data-slug="${o}"]`);
    if (
      (t &&
        t.dispatchEvent(
          new CustomEvent("click", { bubbles: !0, cancelable: !0 })
        ),
      R.getInstance())
    )
      return;
    const i = document.querySelectorAll(`[data-fancybox="${o}"]`);
    i.length &&
      ((t = i[e - 1]),
      t &&
        t.dispatchEvent(
          new CustomEvent("click", { bubbles: !0, cancelable: !0 })
        ));
  },
  zi = () => {
    if (R.defaults.Hash === !1) return;
    const o = R.getInstance();
    if ((o == null ? void 0 : o.options.Hash) === !1) return;
    const { slug: e, index: t } = Je(),
      { slug: i } = Ai();
    o && (e === i ? o.jumpTo(t - 1) : ((Ie = !0), o.close())), Ii();
  },
  ki = () => {
    ge && clearTimeout(ge),
      queueMicrotask(() => {
        zi();
      });
  },
  Qt = () => {
    window.addEventListener("hashchange", ki, !1),
      setTimeout(() => {
        zi();
      }, 500);
  };
ze &&
  (/complete|interactive|loaded/.test(document.readyState)
    ? Qt()
    : document.addEventListener("DOMContentLoaded", Qt));
const $e = "is-zooming-in";
class Di extends ee {
  onCreateSlide(e, t, i) {
    const s = this.instance.optionFor(i, "src") || "";
    i.el && i.type === "image" && typeof s == "string" && this.setImage(i, s);
  }
  onRemoveSlide(e, t, i) {
    i.panzoom && i.panzoom.destroy(),
      (i.panzoom = void 0),
      (i.imageEl = void 0);
  }
  onChange(e, t, i, s) {
    F(this.instance.container, $e);
    for (const n of t.slides) {
      const r = n.panzoom;
      r && n.index !== i && r.reset(0.35);
    }
  }
  onClose() {
    var e;
    const t = this.instance,
      i = t.container,
      s = t.getSlide();
    if (!i || !i.parentElement || !s) return;
    const { el: n, contentEl: r, panzoom: a, thumbElSrc: l } = s;
    if (
      !n ||
      !l ||
      !r ||
      !a ||
      a.isContentLoading ||
      a.state === j.Init ||
      a.state === j.Destroy
    )
      return;
    a.updateMetrics();
    let c = this.getZoomInfo(s);
    if (!c) return;
    (this.instance.state = _.CustomClosing),
      i.classList.remove($e),
      i.classList.add("is-zooming-out"),
      (r.style.backgroundImage = `url('${l}')`);
    const d = i.getBoundingClientRect();
    (((e = window.visualViewport) === null || e === void 0
      ? void 0
      : e.scale) || 1) === 1 &&
      Object.assign(i.style, {
        position: "absolute",
        top: `${i.offsetTop + window.scrollY}px`,
        left: `${i.offsetLeft + window.scrollX}px`,
        bottom: "auto",
        right: "auto",
        width: `${d.width}px`,
        height: `${d.height}px`,
        overflow: "hidden",
      });
    const { x: u, y: f, scale: h, opacity: p } = c;
    if (p) {
      const m = ((v, g, y, b) => {
        const w = g - v,
          T = b - y;
        return (C) => y + (((C - v) / w) * T || 0);
      })(a.scale, h, 1, 0);
      a.on("afterTransform", () => {
        r.style.opacity = m(a.scale) + "";
      });
    }
    a.on("endAnimation", () => {
      t.destroy();
    }),
      (a.target.a = h),
      (a.target.b = 0),
      (a.target.c = 0),
      (a.target.d = h),
      a.panTo({
        x: u,
        y: f,
        scale: h,
        friction: p ? 0.2 : 0.33,
        ignoreBounds: !0,
      }),
      a.isResting && t.destroy();
  }
  setImage(e, t) {
    const i = this.instance;
    (e.src = t),
      this.process(e, t).then(
        (s) => {
          const { contentEl: n, imageEl: r, thumbElSrc: a, el: l } = e;
          if (i.isClosing() || !n || !r) return;
          n.offsetHeight;
          const c = !!i.isOpeningSlide(e) && this.getZoomInfo(e);
          if (this.option("protected") && l) {
            l.addEventListener("contextmenu", (f) => {
              f.preventDefault();
            });
            const u = document.createElement("div");
            I(u, "fancybox-protected"), n.appendChild(u);
          }
          if (a && c) {
            const u = s.contentRect,
              f = Math.max(u.fullWidth, u.fullHeight);
            let h = null;
            !c.opacity &&
              f > 1200 &&
              ((h = document.createElement("img")),
              I(h, "fancybox-ghost"),
              (h.src = a),
              n.appendChild(h));
            const p = () => {
              h &&
                (I(h, "f-fadeFastOut"),
                setTimeout(() => {
                  h && (h.remove(), (h = null));
                }, 200));
            };
            ((d = a),
            new Promise((m, v) => {
              const g = new Image();
              (g.onload = m), (g.onerror = v), (g.src = d);
            })).then(
              () => {
                i.hideLoading(e),
                  (e.state = G.Opening),
                  this.instance.emit("reveal", e),
                  this.zoomIn(e).then(
                    () => {
                      p(), this.instance.done(e);
                    },
                    () => {}
                  ),
                  h &&
                    setTimeout(
                      () => {
                        p();
                      },
                      f > 2500 ? 800 : 200
                    );
              },
              () => {
                i.hideLoading(e), i.revealContent(e);
              }
            );
          } else {
            const u = this.optionFor(e, "initialSize"),
              f = this.optionFor(e, "zoom"),
              h = {
                event: i.prevMouseMoveEvent || i.options.event,
                friction: f ? 0.12 : 0,
              };
            let p = i.optionFor(e, "showClass") || void 0,
              m = !0;
            i.isOpeningSlide(e) &&
              (u === "full"
                ? s.zoomToFull(h)
                : u === "cover"
                ? s.zoomToCover(h)
                : u === "max"
                ? s.zoomToMax(h)
                : (m = !1),
              s.stop("current")),
              m && p && (p = s.isDragging ? "f-fadeIn" : ""),
              i.hideLoading(e),
              i.revealContent(e, p);
          }
          var d;
        },
        () => {
          i.setError(e, "{{IMAGE_ERROR}}");
        }
      );
  }
  process(e, t) {
    return new Promise((i, s) => {
      var n;
      const r = this.instance,
        a = e.el;
      r.clearContent(e), r.showLoading(e);
      let l = this.optionFor(e, "content");
      if ((typeof l == "string" && (l = ne(l)), !l || !X(l))) {
        if (
          ((l = document.createElement("img")), l instanceof HTMLImageElement)
        ) {
          let c = "",
            d = e.caption;
          (c =
            typeof d == "string" && d
              ? d.replace(/<[^>]+>/gi, "").substring(0, 1e3)
              : `Image ${e.index + 1} of ${
                  ((n = r.carousel) === null || n === void 0
                    ? void 0
                    : n.pages.length) || 1
                }`),
            (l.src = t || ""),
            (l.alt = c),
            (l.draggable = !1),
            e.srcset && l.setAttribute("srcset", e.srcset),
            this.instance.isOpeningSlide(e) && (l.fetchPriority = "high");
        }
        e.sizes && l.setAttribute("sizes", e.sizes);
      }
      I(l, "fancybox-image"),
        (e.imageEl = l),
        r.setContent(e, l, !1),
        (e.panzoom = new ye(
          a,
          q({ transformParent: !0 }, this.option("Panzoom") || {}, {
            content: l,
            width: (c, d) => r.optionFor(e, "width", "auto", d) || "auto",
            height: (c, d) => r.optionFor(e, "height", "auto", d) || "auto",
            wheel: () => {
              const c = r.option("wheel");
              return (c === "zoom" || c == "pan") && c;
            },
            click: (c, d) => {
              var u, f;
              if (
                r.isCompact ||
                r.isClosing() ||
                e.index !==
                  ((u = r.getSlide()) === null || u === void 0
                    ? void 0
                    : u.index)
              )
                return !1;
              if (d) {
                const p = d.composedPath()[0];
                if (
                  [
                    "A",
                    "BUTTON",
                    "TEXTAREA",
                    "OPTION",
                    "INPUT",
                    "SELECT",
                    "VIDEO",
                  ].includes(p.nodeName)
                )
                  return !1;
              }
              let h =
                !d ||
                (d.target &&
                  ((f = e.contentEl) === null || f === void 0
                    ? void 0
                    : f.contains(d.target)));
              return r.option(h ? "contentClick" : "backdropClick") || !1;
            },
            dblClick: () =>
              r.isCompact ? "toggleZoom" : r.option("contentDblClick") || !1,
            spinner: !1,
            panOnlyZoomed: !0,
            wheelLimit: 1 / 0,
            on: {
              ready: (c) => {
                i(c);
              },
              error: () => {
                s();
              },
              destroy: () => {
                s();
              },
            },
          })
        ));
    });
  }
  zoomIn(e) {
    return new Promise((t, i) => {
      const s = this.instance,
        n = s.container,
        { panzoom: r, contentEl: a, el: l } = e;
      r && r.updateMetrics();
      const c = this.getZoomInfo(e);
      if (!(c && l && a && r && n)) return void i();
      const { x: d, y: u, scale: f, opacity: h } = c,
        p = () => {
          e.state !== G.Closing &&
            (h &&
              (a.style.opacity =
                Math.max(Math.min(1, 1 - (1 - r.scale) / (1 - f)), 0) + ""),
            r.scale >= 1 && r.scale > r.targetScale - 0.1 && t(r));
        },
        m = (y) => {
          ((y.scale < 0.99 || y.scale > 1.01) && !y.isDragging) ||
            (F(n, $e),
            (a.style.opacity = ""),
            y.off("endAnimation", m),
            y.off("touchStart", m),
            y.off("afterTransform", p),
            t(y));
        };
      r.on("endAnimation", m),
        r.on("touchStart", m),
        r.on("afterTransform", p),
        r.on(["error", "destroy"], () => {
          i();
        }),
        r.panTo({ x: d, y: u, scale: f, friction: 0, ignoreBounds: !0 }),
        r.stop("current");
      const v = {
          event:
            r.panMode === "mousemove"
              ? s.prevMouseMoveEvent || s.options.event
              : void 0,
        },
        g = this.optionFor(e, "initialSize");
      I(n, $e),
        s.hideLoading(e),
        g === "full"
          ? r.zoomToFull(v)
          : g === "cover"
          ? r.zoomToCover(v)
          : g === "max"
          ? r.zoomToMax(v)
          : r.reset(0.172);
    });
  }
  getZoomInfo(e) {
    const { el: t, imageEl: i, thumbEl: s, panzoom: n } = e,
      r = this.instance,
      a = r.container;
    if (
      !t ||
      !i ||
      !s ||
      !n ||
      Oi(s) < 3 ||
      !this.optionFor(e, "zoom") ||
      !a ||
      r.state === _.Destroy ||
      getComputedStyle(a).getPropertyValue("--f-images-zoom") === "0"
    )
      return !1;
    const l = window.visualViewport || null;
    if ((l ? l.scale : 1) !== 1) return !1;
    let { top: c, left: d, width: u, height: f } = s.getBoundingClientRect(),
      { top: h, left: p, fitWidth: m, fitHeight: v } = n.contentRect;
    if (!(u && f && m && v)) return !1;
    const g = n.container.getBoundingClientRect();
    (p += g.left), (h += g.top);
    const y = -1 * (p + 0.5 * m - (d + 0.5 * u)),
      b = -1 * (h + 0.5 * v - (c + 0.5 * f)),
      w = u / m;
    let T = this.option("zoomOpacity") || !1;
    return (
      T === "auto" && (T = Math.abs(u / f - m / v) > 0.1),
      { x: y, y: b, scale: w, opacity: T }
    );
  }
  attach() {
    const e = this,
      t = e.instance;
    t.on("Carousel.change", e.onChange),
      t.on("Carousel.createSlide", e.onCreateSlide),
      t.on("Carousel.removeSlide", e.onRemoveSlide),
      t.on("close", e.onClose);
  }
  detach() {
    const e = this,
      t = e.instance;
    t.off("Carousel.change", e.onChange),
      t.off("Carousel.createSlide", e.onCreateSlide),
      t.off("Carousel.removeSlide", e.onRemoveSlide),
      t.off("close", e.onClose);
  }
}
Object.defineProperty(Di, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: {
    initialSize: "fit",
    Panzoom: { maxScale: 1 },
    protected: !1,
    zoom: !0,
    zoomOpacity: "auto",
  },
}),
  typeof SuppressedError == "function" && SuppressedError;
const gt = "html",
  ei = "image",
  vt = "map",
  ae = "youtube",
  fe = "vimeo",
  Le = "html5video",
  ti = (o, e = {}) => {
    const t = new URL(o),
      i = new URLSearchParams(t.search),
      s = new URLSearchParams();
    for (const [a, l] of [...i, ...Object.entries(e)]) {
      let c = l + "";
      if (a === "t") {
        let d = c.match(/((\d*)m)?(\d*)s?/);
        d &&
          s.set(
            "start",
            60 * parseInt(d[2] || "0") + parseInt(d[3] || "0") + ""
          );
      } else s.set(a, c);
    }
    let n = s + "",
      r = o.match(/#t=((.*)?\d+s)/);
    return r && (n += `#t=${r[1]}`), n;
  },
  wn = {
    ajax: null,
    autoSize: !0,
    iframeAttr: { allow: "autoplay; fullscreen", scrolling: "auto" },
    preload: !0,
    videoAutoplay: !0,
    videoRatio: 16 / 9,
    videoTpl: `<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">
  <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn't support embedded videos.</video>`,
    videoFormat: "",
    vimeo: { byline: 1, color: "00adef", controls: 1, dnt: 1, muted: 0 },
    youtube: { controls: 1, enablejsapi: 1, nocookie: 1, rel: 0, fs: 1 },
  },
  Sn = [
    "image",
    "html",
    "ajax",
    "inline",
    "clone",
    "iframe",
    "map",
    "pdf",
    "html5video",
    "youtube",
    "vimeo",
  ];
class Ri extends ee {
  onBeforeInitSlide(e, t, i) {
    this.processType(i);
  }
  onCreateSlide(e, t, i) {
    this.setContent(i);
  }
  onClearContent(e, t) {
    t.xhr && (t.xhr.abort(), (t.xhr = null));
    const i = t.iframeEl;
    i &&
      ((i.onload = i.onerror = null),
      (i.src = "//about:blank"),
      (t.iframeEl = null));
    const s = t.contentEl,
      n = t.placeholderEl;
    if (t.type === "inline" && s && n)
      s.classList.remove("fancybox__content"),
        getComputedStyle(s).getPropertyValue("display") !== "none" &&
          (s.style.display = "none"),
        setTimeout(() => {
          n &&
            (s && n.parentNode && n.parentNode.insertBefore(s, n), n.remove());
        }, 0),
        (t.contentEl = void 0),
        (t.placeholderEl = void 0);
    else for (; t.el && t.el.firstChild; ) t.el.removeChild(t.el.firstChild);
  }
  onSelectSlide(e, t, i) {
    i.state === G.Ready && this.playVideo();
  }
  onUnselectSlide(e, t, i) {
    var s, n;
    if (i.type === Le) {
      try {
        (n =
          (s = i.el) === null || s === void 0
            ? void 0
            : s.querySelector("video")) === null ||
          n === void 0 ||
          n.pause();
      } catch {}
      return;
    }
    let r;
    i.type === fe
      ? (r = { method: "pause", value: "true" })
      : i.type === ae && (r = { event: "command", func: "pauseVideo" }),
      r &&
        i.iframeEl &&
        i.iframeEl.contentWindow &&
        i.iframeEl.contentWindow.postMessage(JSON.stringify(r), "*"),
      i.poller && clearTimeout(i.poller);
  }
  onDone(e, t) {
    e.isCurrentSlide(t) && !e.isClosing() && this.playVideo();
  }
  onRefresh(e, t) {
    t.slides.forEach((i) => {
      i.el && (this.resizeIframe(i), this.setAspectRatio(i));
    });
  }
  onMessage(e) {
    try {
      let t = JSON.parse(e.data);
      if (e.origin === "https://player.vimeo.com") {
        if (t.event === "ready")
          for (let i of Array.from(
            document.getElementsByClassName("fancybox__iframe")
          ))
            i instanceof HTMLIFrameElement &&
              i.contentWindow === e.source &&
              (i.dataset.ready = "true");
      } else if (
        e.origin.match(/^https:\/\/(www.)?youtube(-nocookie)?.com$/) &&
        t.event === "onReady"
      ) {
        const i = document.getElementById(t.id);
        i && (i.dataset.ready = "true");
      }
    } catch {}
  }
  loadAjaxContent(e) {
    const t = this.instance.optionFor(e, "src") || "";
    this.instance.showLoading(e);
    const i = this.instance,
      s = new XMLHttpRequest();
    i.showLoading(e),
      (s.onreadystatechange = function () {
        s.readyState === XMLHttpRequest.DONE &&
          i.state === _.Ready &&
          (i.hideLoading(e),
          s.status === 200
            ? i.setContent(e, s.responseText)
            : i.setError(
                e,
                s.status === 404 ? "{{AJAX_NOT_FOUND}}" : "{{AJAX_FORBIDDEN}}"
              ));
      });
    const n = e.ajax || null;
    s.open(n ? "POST" : "GET", t + ""),
      s.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
      s.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
      s.send(n),
      (e.xhr = s);
  }
  setInlineContent(e) {
    let t = null;
    if (X(e.src)) t = e.src;
    else if (typeof e.src == "string") {
      const i = e.src.split("#", 2).pop();
      t = i ? document.getElementById(i) : null;
    }
    if (t) {
      if (e.type === "clone" || t.closest(".fancybox__slide")) {
        t = t.cloneNode(!0);
        const i = t.dataset.animationName;
        i && (t.classList.remove(i), delete t.dataset.animationName);
        let s = t.getAttribute("id");
        (s = s ? `${s}--clone` : `clone-${this.instance.id}-${e.index}`),
          t.setAttribute("id", s);
      } else if (t.parentNode) {
        const i = document.createElement("div");
        i.classList.add("fancybox-placeholder"),
          t.parentNode.insertBefore(i, t),
          (e.placeholderEl = i);
      }
      this.instance.setContent(e, t);
    } else this.instance.setError(e, "{{ELEMENT_NOT_FOUND}}");
  }
  setIframeContent(e) {
    const { src: t, el: i } = e;
    if (!t || typeof t != "string" || !i) return;
    i.classList.add("is-loading");
    const s = this.instance,
      n = document.createElement("iframe");
    (n.className = "fancybox__iframe"),
      n.setAttribute("id", `fancybox__iframe_${s.id}_${e.index}`);
    for (const [a, l] of Object.entries(this.optionFor(e, "iframeAttr") || {}))
      n.setAttribute(a, l);
    (n.onerror = () => {
      s.setError(e, "{{IFRAME_ERROR}}");
    }),
      (e.iframeEl = n);
    const r = this.optionFor(e, "preload");
    if (e.type !== "iframe" || r === !1)
      return (
        n.setAttribute("src", e.src + ""),
        s.setContent(e, n, !1),
        this.resizeIframe(e),
        void s.revealContent(e)
      );
    s.showLoading(e),
      (n.onload = () => {
        if (!n.src.length) return;
        const a = n.dataset.ready !== "true";
        (n.dataset.ready = "true"),
          this.resizeIframe(e),
          a ? s.revealContent(e) : s.hideLoading(e);
      }),
      n.setAttribute("src", t),
      s.setContent(e, n, !1);
  }
  resizeIframe(e) {
    const { type: t, iframeEl: i } = e;
    if (t === ae || t === fe) return;
    const s = i == null ? void 0 : i.parentElement;
    if (!i || !s) return;
    let n = e.autoSize;
    n === void 0 && (n = this.optionFor(e, "autoSize"));
    let r = e.width || 0,
      a = e.height || 0;
    r && a && (n = !1);
    const l = s && s.style;
    if (e.preload !== !1 && n !== !1 && l)
      try {
        const c = window.getComputedStyle(s),
          d = parseFloat(c.paddingLeft) + parseFloat(c.paddingRight),
          u = parseFloat(c.paddingTop) + parseFloat(c.paddingBottom),
          f = i.contentWindow;
        if (f) {
          const h = f.document,
            p = h.getElementsByTagName(gt)[0],
            m = h.body;
          (l.width = ""),
            (m.style.overflow = "hidden"),
            (r = r || p.scrollWidth + d),
            (l.width = `${r}px`),
            (m.style.overflow = ""),
            (l.flex = "0 0 auto"),
            (l.height = `${m.scrollHeight}px`),
            (a = p.scrollHeight + u);
        }
      } catch {}
    if (r || a) {
      const c = { flex: "0 1 auto", width: "", height: "" };
      r && r !== "auto" && (c.width = `${r}px`),
        a && a !== "auto" && (c.height = `${a}px`),
        Object.assign(l, c);
    }
  }
  playVideo() {
    const e = this.instance.getSlide();
    if (!e) return;
    const { el: t } = e;
    if (!t || !t.offsetParent || !this.optionFor(e, "videoAutoplay")) return;
    if (e.type === Le)
      try {
        const s = t.querySelector("video");
        if (s) {
          const n = s.play();
          n !== void 0 &&
            n
              .then(() => {})
              .catch((r) => {
                (s.muted = !0), s.play();
              });
        }
      } catch {}
    if (e.type !== ae && e.type !== fe) return;
    const i = () => {
      if (e.iframeEl && e.iframeEl.contentWindow) {
        let s;
        if (e.iframeEl.dataset.ready === "true")
          return (
            (s =
              e.type === ae
                ? { event: "command", func: "playVideo" }
                : { method: "play", value: "true" }),
            s && e.iframeEl.contentWindow.postMessage(JSON.stringify(s), "*"),
            void (e.poller = void 0)
          );
        e.type === ae &&
          ((s = { event: "listening", id: e.iframeEl.getAttribute("id") }),
          e.iframeEl.contentWindow.postMessage(JSON.stringify(s), "*"));
      }
      e.poller = setTimeout(i, 250);
    };
    i();
  }
  processType(e) {
    if (e.html) return (e.type = gt), (e.src = e.html), void (e.html = "");
    const t = this.instance.optionFor(e, "src", "");
    if (!t || typeof t != "string") return;
    let i = e.type,
      s = null;
    if (
      (s = t.match(
        /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|shorts\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i
      ))
    ) {
      const n = this.optionFor(e, ae),
        { nocookie: r } = n,
        a = (function (u, f) {
          var h = {};
          for (var p in u)
            Object.prototype.hasOwnProperty.call(u, p) &&
              f.indexOf(p) < 0 &&
              (h[p] = u[p]);
          if (u != null && typeof Object.getOwnPropertySymbols == "function") {
            var m = 0;
            for (p = Object.getOwnPropertySymbols(u); m < p.length; m++)
              f.indexOf(p[m]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(u, p[m]) &&
                (h[p[m]] = u[p[m]]);
          }
          return h;
        })(n, ["nocookie"]),
        l = `www.youtube${r ? "-nocookie" : ""}.com`,
        c = ti(t, a),
        d = encodeURIComponent(s[2]);
      (e.videoId = d),
        (e.src = `https://${l}/embed/${d}?${c}`),
        (e.thumbSrc =
          e.thumbSrc || `https://i.ytimg.com/vi/${d}/mqdefault.jpg`),
        (i = ae);
    } else if (
      (s = t.match(/^.+vimeo.com\/(?:\/)?([\d]+)((\/|\?h=)([a-z0-9]+))?(.*)?/))
    ) {
      const n = ti(t, this.optionFor(e, fe)),
        r = encodeURIComponent(s[1]),
        a = s[4] || "";
      (e.videoId = r),
        (e.src = `https://player.vimeo.com/video/${r}?${
          a ? `h=${a}${n ? "&" : ""}` : ""
        }${n}`),
        (i = fe);
    }
    if (!i && e.triggerEl) {
      const n = e.triggerEl.dataset.type;
      Sn.includes(n) && (i = n);
    }
    i ||
      (typeof t == "string" &&
        (t.charAt(0) === "#"
          ? (i = "inline")
          : (s = t.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))
          ? ((i = Le),
            (e.videoFormat =
              e.videoFormat || "video/" + (s[1] === "ogv" ? "ogg" : s[1])))
          : t.match(
              /(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i
            )
          ? (i = ei)
          : t.match(/\.(pdf)((\?|#).*)?$/i) && (i = "pdf"))),
      (s = t.match(
        /(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i
      ))
        ? ((e.src = `https://maps.google.${s[1]}/?ll=${(s[2]
            ? s[2] +
              "&z=" +
              Math.floor(parseFloat(s[3])) +
              (s[4] ? s[4].replace(/^\//, "&") : "")
            : s[4] + ""
          ).replace(/\?/, "&")}&output=${
            s[4] && s[4].indexOf("layer=c") > 0 ? "svembed" : "embed"
          }`),
          (i = vt))
        : (s = t.match(
            /(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i
          )) &&
          ((e.src = `https://maps.google.${s[1]}/maps?q=${s[2]
            .replace("query=", "q=")
            .replace("api=1", "")}&output=embed`),
          (i = vt)),
      (i = i || this.instance.option("defaultType")),
      (e.type = i),
      i === ei && (e.thumbSrc = e.thumbSrc || e.src);
  }
  setContent(e) {
    const t = this.instance.optionFor(e, "src") || "";
    if (e && e.type && t) {
      switch (e.type) {
        case gt:
          this.instance.setContent(e, t);
          break;
        case Le:
          const i = this.option("videoTpl");
          i &&
            this.instance.setContent(
              e,
              i
                .replace(/\{\{src\}\}/gi, t + "")
                .replace(
                  /\{\{format\}\}/gi,
                  this.optionFor(e, "videoFormat") || ""
                )
                .replace(/\{\{poster\}\}/gi, e.poster || e.thumbSrc || "")
            );
          break;
        case "inline":
        case "clone":
          this.setInlineContent(e);
          break;
        case "ajax":
          this.loadAjaxContent(e);
          break;
        case "pdf":
        case vt:
        case ae:
        case fe:
          e.preload = !1;
        case "iframe":
          this.setIframeContent(e);
      }
      this.setAspectRatio(e);
    }
  }
  setAspectRatio(e) {
    const t = e.contentEl;
    if (!(e.el && t && e.type && [ae, fe, Le].includes(e.type))) return;
    let i,
      s = e.width || "auto",
      n = e.height || "auto";
    if (s === "auto" || n === "auto") {
      i = this.optionFor(e, "videoRatio");
      const c = (i + "").match(/(\d+)\s*\/\s?(\d+)/);
      i =
        c && c.length > 2
          ? parseFloat(c[1]) / parseFloat(c[2])
          : parseFloat(i + "");
    } else s && n && (i = s / n);
    if (!i) return;
    (t.style.aspectRatio = ""),
      (t.style.width = ""),
      (t.style.height = ""),
      t.offsetHeight;
    const r = t.getBoundingClientRect(),
      a = r.width || 1,
      l = r.height || 1;
    (t.style.aspectRatio = i + ""),
      i < a / l
        ? ((n = n === "auto" ? l : Math.min(l, n)),
          (t.style.width = "auto"),
          (t.style.height = `${n}px`))
        : ((s = s === "auto" ? a : Math.min(a, s)),
          (t.style.width = `${s}px`),
          (t.style.height = "auto"));
  }
  attach() {
    const e = this,
      t = e.instance;
    t.on("Carousel.beforeInitSlide", e.onBeforeInitSlide),
      t.on("Carousel.createSlide", e.onCreateSlide),
      t.on("Carousel.selectSlide", e.onSelectSlide),
      t.on("Carousel.unselectSlide", e.onUnselectSlide),
      t.on("Carousel.Panzoom.refresh", e.onRefresh),
      t.on("done", e.onDone),
      t.on("clearContent", e.onClearContent),
      window.addEventListener("message", e.onMessage);
  }
  detach() {
    const e = this,
      t = e.instance;
    t.off("Carousel.beforeInitSlide", e.onBeforeInitSlide),
      t.off("Carousel.createSlide", e.onCreateSlide),
      t.off("Carousel.selectSlide", e.onSelectSlide),
      t.off("Carousel.unselectSlide", e.onUnselectSlide),
      t.off("Carousel.Panzoom.refresh", e.onRefresh),
      t.off("done", e.onDone),
      t.off("clearContent", e.onClearContent),
      window.removeEventListener("message", e.onMessage);
  }
}
Object.defineProperty(Ri, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: wn,
});
const Ge = "play",
  We = "pause",
  Ae = "ready";
class Fi extends ee {
  constructor() {
    super(...arguments),
      Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Ae,
      }),
      Object.defineProperty(this, "inHover", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "timer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "progressBar", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      });
  }
  get isActive() {
    return this.state !== Ae;
  }
  onReady(e) {
    this.option("autoStart") &&
      (e.isInfinite || e.page < e.pages.length - 1) &&
      this.start();
  }
  onChange() {
    this.removeProgressBar(), this.pause();
  }
  onSettle() {
    this.resume();
  }
  onVisibilityChange() {
    document.visibilityState === "visible" ? this.resume() : this.pause();
  }
  onMouseEnter() {
    (this.inHover = !0), this.pause();
  }
  onMouseLeave() {
    var e;
    (this.inHover = !1),
      !((e = this.instance.panzoom) === null || e === void 0) &&
        e.isResting &&
        this.resume();
  }
  onTimerEnd() {
    const e = this.instance;
    this.state === "play" &&
      (e.isInfinite || e.page !== e.pages.length - 1
        ? e.slideNext()
        : e.slideTo(0));
  }
  removeProgressBar() {
    this.progressBar && (this.progressBar.remove(), (this.progressBar = null));
  }
  createProgressBar() {
    var e;
    if (!this.option("showProgress")) return null;
    this.removeProgressBar();
    const t = this.instance,
      i =
        ((e = t.pages[t.page]) === null || e === void 0 ? void 0 : e.slides) ||
        [];
    let s = this.option("progressParentEl");
    if ((s || (s = (i.length === 1 ? i[0].el : null) || t.viewport), !s))
      return null;
    const n = document.createElement("div");
    return (
      I(n, "f-progress"),
      s.prepend(n),
      (this.progressBar = n),
      n.offsetHeight,
      n
    );
  }
  set() {
    const e = this,
      t = e.instance;
    if (t.pages.length < 2 || e.timer) return;
    const i = e.option("timeout");
    (e.state = Ge), I(t.container, "has-autoplay");
    let s = e.createProgressBar();
    s &&
      ((s.style.transitionDuration = `${i}ms`),
      (s.style.transform = "scaleX(1)")),
      (e.timer = setTimeout(() => {
        (e.timer = null), e.inHover || e.onTimerEnd();
      }, i)),
      e.emit("set");
  }
  clear() {
    const e = this;
    e.timer && (clearTimeout(e.timer), (e.timer = null)), e.removeProgressBar();
  }
  start() {
    const e = this;
    if ((e.set(), e.state !== Ae)) {
      if (e.option("pauseOnHover")) {
        const t = e.instance.container;
        t.addEventListener("mouseenter", e.onMouseEnter, !1),
          t.addEventListener("mouseleave", e.onMouseLeave, !1);
      }
      document.addEventListener("visibilitychange", e.onVisibilityChange, !1),
        e.emit("start");
    }
  }
  stop() {
    const e = this,
      t = e.state,
      i = e.instance.container;
    e.clear(),
      (e.state = Ae),
      i.removeEventListener("mouseenter", e.onMouseEnter, !1),
      i.removeEventListener("mouseleave", e.onMouseLeave, !1),
      document.removeEventListener(
        "visibilitychange",
        e.onVisibilityChange,
        !1
      ),
      F(i, "has-autoplay"),
      t !== Ae && e.emit("stop");
  }
  pause() {
    const e = this;
    e.state === Ge && ((e.state = We), e.clear(), e.emit(We));
  }
  resume() {
    const e = this,
      t = e.instance;
    if (t.isInfinite || t.page !== t.pages.length - 1)
      if (e.state !== Ge) {
        if (e.state === We && !e.inHover) {
          const i = new Event("resume", { bubbles: !0, cancelable: !0 });
          e.emit("resume", i), i.defaultPrevented || e.set();
        }
      } else e.set();
    else e.stop();
  }
  toggle() {
    this.state === Ge || this.state === We ? this.stop() : this.start();
  }
  attach() {
    const e = this,
      t = e.instance;
    t.on("ready", e.onReady),
      t.on("Panzoom.startAnimation", e.onChange),
      t.on("Panzoom.endAnimation", e.onSettle),
      t.on("Panzoom.touchMove", e.onChange);
  }
  detach() {
    const e = this,
      t = e.instance;
    t.off("ready", e.onReady),
      t.off("Panzoom.startAnimation", e.onChange),
      t.off("Panzoom.endAnimation", e.onSettle),
      t.off("Panzoom.touchMove", e.onChange),
      e.stop();
  }
}
Object.defineProperty(Fi, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: {
    autoStart: !0,
    pauseOnHover: !0,
    progressParentEl: null,
    showProgress: !0,
    timeout: 3e3,
  },
});
class ji extends ee {
  constructor() {
    super(...arguments),
      Object.defineProperty(this, "ref", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      });
  }
  onPrepare(e) {
    const t = e.carousel;
    if (!t) return;
    const i = e.container;
    i &&
      ((t.options.Autoplay = q(
        { autoStart: !1 },
        this.option("Autoplay") || {},
        {
          pauseOnHover: !1,
          timeout: this.option("timeout"),
          progressParentEl: () => this.option("progressParentEl") || null,
          on: {
            start: () => {
              e.emit("startSlideshow");
            },
            set: (s) => {
              var n;
              i.classList.add("has-slideshow"),
                ((n = e.getSlide()) === null || n === void 0
                  ? void 0
                  : n.state) !== G.Ready && s.pause();
            },
            stop: () => {
              i.classList.remove("has-slideshow"),
                e.isCompact || e.endIdle(),
                e.emit("endSlideshow");
            },
            resume: (s, n) => {
              var r, a, l;
              !n ||
                !n.cancelable ||
                (((r = e.getSlide()) === null || r === void 0
                  ? void 0
                  : r.state) === G.Ready &&
                  !(
                    (l =
                      (a = e.carousel) === null || a === void 0
                        ? void 0
                        : a.panzoom) === null || l === void 0
                  ) &&
                  l.isResting) ||
                n.preventDefault();
            },
          },
        }
      )),
      t.attachPlugins({ Autoplay: Fi }),
      (this.ref = t.plugins.Autoplay));
  }
  onReady(e) {
    const t = e.carousel,
      i = this.ref;
    i &&
      t &&
      this.option("playOnStart") &&
      (t.isInfinite || t.page < t.pages.length - 1) &&
      i.start();
  }
  onDone(e, t) {
    const i = this.ref,
      s = e.carousel;
    if (!i || !s) return;
    const n = t.panzoom;
    n &&
      n.on("startAnimation", () => {
        e.isCurrentSlide(t) && i.stop();
      }),
      e.isCurrentSlide(t) && i.resume();
  }
  onKeydown(e, t) {
    var i;
    const s = this.ref;
    s &&
      t === this.option("key") &&
      ((i = document.activeElement) === null || i === void 0
        ? void 0
        : i.nodeName) !== "BUTTON" &&
      s.toggle();
  }
  attach() {
    const e = this,
      t = e.instance;
    t.on("Carousel.init", e.onPrepare),
      t.on("Carousel.ready", e.onReady),
      t.on("done", e.onDone),
      t.on("keydown", e.onKeydown);
  }
  detach() {
    const e = this,
      t = e.instance;
    t.off("Carousel.init", e.onPrepare),
      t.off("Carousel.ready", e.onReady),
      t.off("done", e.onDone),
      t.off("keydown", e.onKeydown);
  }
}
Object.defineProperty(ji, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: {
    key: " ",
    playOnStart: !1,
    progressParentEl: (o) => {
      var e;
      return (
        ((e = o.instance.container) === null || e === void 0
          ? void 0
          : e.querySelector(
              ".fancybox__toolbar [data-fancybox-toggle-slideshow]"
            )) || o.instance.container
      );
    },
    timeout: 3e3,
  },
});
const Bi = {
  classes: {
    container: "f-thumbs f-carousel__thumbs",
    viewport: "f-thumbs__viewport",
    track: "f-thumbs__track",
    slide: "f-thumbs__slide",
    isResting: "is-resting",
    isSelected: "is-selected",
    isLoading: "is-loading",
    hasThumbs: "has-thumbs",
  },
  minCount: 2,
  parentEl: null,
  thumbTpl:
    '<button class="f-thumbs__slide__button" tabindex="0" type="button" aria-label="{{GOTO}}" data-carousel-index="%i"><img class="f-thumbs__slide__img" data-lazy-src="{{%s}}" alt="" /></button>',
  type: "modern",
};
var le;
(function (o) {
  (o[(o.Init = 0)] = "Init"),
    (o[(o.Ready = 1)] = "Ready"),
    (o[(o.Hidden = 2)] = "Hidden");
})(le || (le = {}));
const ii = "isResting",
  Xe = "thumbWidth",
  Te = "thumbHeight",
  te = "thumbClipWidth";
let Hi = class extends ee {
  constructor() {
    super(...arguments),
      Object.defineProperty(this, "type", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "modern",
      }),
      Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "track", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "carousel", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "thumbWidth", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "thumbClipWidth", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "thumbHeight", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "thumbGap", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "thumbExtraGap", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: le.Init,
      });
  }
  get isModern() {
    return this.type === "modern";
  }
  onInitSlide(o, e) {
    const t = e.el ? e.el.dataset : void 0;
    t &&
      ((e.thumbSrc = t.thumbSrc || e.thumbSrc || ""),
      (e[te] = parseFloat(t[te] || "") || e[te] || 0),
      (e[Te] = parseFloat(t.thumbHeight || "") || e[Te] || 0)),
      this.addSlide(e);
  }
  onInitSlides() {
    this.build();
  }
  onChange() {
    var o;
    if (!this.isModern) return;
    const e = this.container,
      t = this.instance,
      i = t.panzoom,
      s = this.carousel,
      n = s ? s.panzoom : null,
      r = t.page;
    if (i && s && n) {
      if (i.isDragging) {
        F(e, this.cn(ii));
        let a =
          ((o = s.pages[r]) === null || o === void 0 ? void 0 : o.pos) || 0;
        a += t.getProgress(r) * (this[te] + this.thumbGap);
        let l = n.getBounds();
        -1 * a > l.x.min &&
          -1 * a < l.x.max &&
          n.panTo({ x: -1 * a, friction: 0.12 });
      } else oe(e, this.cn(ii), i.isResting);
      this.shiftModern();
    }
  }
  onRefresh() {
    this.updateProps();
    for (const o of this.instance.slides || []) this.resizeModernSlide(o);
    this.shiftModern();
  }
  isDisabled() {
    const o = this.option("minCount") || 0;
    if (o) {
      const t = this.instance;
      let i = 0;
      for (const s of t.slides || []) s.thumbSrc && i++;
      if (i < o) return !0;
    }
    const e = this.option("type");
    return ["modern", "classic"].indexOf(e) < 0;
  }
  getThumb(o) {
    const e = this.option("thumbTpl") || "";
    return {
      html: this.instance.localize(e, [
        ["%i", o.index],
        ["%d", o.index + 1],
        [
          "%s",
          o.thumbSrc ||
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        ],
      ]),
    };
  }
  addSlide(o) {
    const e = this.carousel;
    e && e.addSlide(o.index, this.getThumb(o));
  }
  getSlides() {
    const o = [];
    for (const e of this.instance.slides || []) o.push(this.getThumb(e));
    return o;
  }
  resizeModernSlide(o) {
    this.isModern &&
      (o[Xe] =
        o[te] && o[Te] ? Math.round(this[Te] * (o[te] / o[Te])) : this[Xe]);
  }
  updateProps() {
    const o = this.container;
    if (!o) return;
    const e = (t) =>
      parseFloat(getComputedStyle(o).getPropertyValue("--f-thumb-" + t)) || 0;
    (this.thumbGap = e("gap")),
      (this.thumbExtraGap = e("extra-gap")),
      (this[Xe] = e("width") || 40),
      (this[te] = e("clip-width") || 40),
      (this[Te] = e("height") || 40);
  }
  build() {
    const o = this;
    if (o.state !== le.Init) return;
    if (o.isDisabled()) return void o.emit("disabled");
    const e = o.instance,
      t = e.container,
      i = o.getSlides(),
      s = o.option("type");
    o.type = s;
    const n = o.option("parentEl"),
      r = o.cn("container"),
      a = o.cn("track");
    let l = n == null ? void 0 : n.querySelector("." + r);
    l ||
      ((l = document.createElement("div")),
      I(l, r),
      n ? n.appendChild(l) : t.after(l)),
      I(l, `is-${s}`),
      I(t, o.cn("hasThumbs")),
      (o.container = l),
      o.updateProps();
    let c = l.querySelector("." + a);
    c ||
      ((c = document.createElement("div")),
      I(c, o.cn("track")),
      l.appendChild(c)),
      (o.track = c);
    const d = q(
        {},
        {
          track: c,
          infinite: !1,
          center: !0,
          fill: s === "classic",
          dragFree: !0,
          slidesPerPage: 1,
          transition: !1,
          preload: 0.25,
          friction: 0.12,
          Panzoom: { maxVelocity: 0 },
          Dots: !1,
          Navigation: !1,
          classes: {
            container: "f-thumbs",
            viewport: "f-thumbs__viewport",
            track: "f-thumbs__track",
            slide: "f-thumbs__slide",
          },
        },
        o.option("Carousel") || {},
        { Sync: { target: e }, slides: i }
      ),
      u = new e.constructor(l, d);
    u.on("createSlide", (f, h) => {
      o.setProps(h.index), o.emit("createSlide", h, h.el);
    }),
      u.on("ready", () => {
        o.shiftModern(), o.emit("ready");
      }),
      u.on("refresh", () => {
        o.shiftModern();
      }),
      u.on("Panzoom.click", (f, h, p) => {
        o.onClick(p);
      }),
      (o.carousel = u),
      (o.state = le.Ready);
  }
  onClick(o) {
    o.preventDefault(), o.stopPropagation();
    const e = this.instance,
      { pages: t, page: i } = e,
      s = (m) => {
        if (m) {
          const v = m.closest("[data-carousel-index]");
          if (v) return [parseInt(v.dataset.carouselIndex || "", 10) || 0, v];
        }
        return [-1, void 0];
      },
      n = (m, v) => {
        const g = document.elementFromPoint(m, v);
        return g ? s(g) : [-1, void 0];
      };
    let [r, a] = s(o.target);
    if (r > -1) return;
    const l = this[te],
      c = o.clientX,
      d = o.clientY;
    let [u, f] = n(c - l, d),
      [h, p] = n(c + l, d);
    f && p
      ? ((r =
          Math.abs(c - f.getBoundingClientRect().right) <
          Math.abs(c - p.getBoundingClientRect().left)
            ? u
            : h),
        r === i && (r = r === u ? h : u))
      : f
      ? (r = u)
      : p && (r = h),
      r > -1 && t[r] && e.slideTo(r);
  }
  getShift(o) {
    var e;
    const t = this,
      { instance: i } = t,
      s = t.carousel;
    if (!i || !s) return 0;
    const n = t[Xe],
      r = t[te],
      a = t.thumbGap,
      l = t.thumbExtraGap;
    if (!(!((e = s.slides[o]) === null || e === void 0) && e.el)) return 0;
    const c = 0.5 * (n - r),
      d = i.pages.length - 1;
    let u = i.getProgress(0),
      f = i.getProgress(d),
      h = i.getProgress(o, !1, !0),
      p = 0,
      m = c + l + a;
    const v = u < 0 && u > -1,
      g = f > 0 && f < 1;
    return (
      o === 0
        ? ((p = m * Math.abs(u)), g && u === 1 && (p -= m * Math.abs(f)))
        : o === d
        ? ((p = m * Math.abs(f) * -1), v && f === -1 && (p += m * Math.abs(u)))
        : v || g
        ? ((p = -1 * m), (p += m * Math.abs(u)), (p += m * (1 - Math.abs(f))))
        : (p = m * h),
      p
    );
  }
  setProps(o) {
    var e;
    const t = this;
    if (!t.isModern) return;
    const { instance: i } = t,
      s = t.carousel;
    if (i && s) {
      const n = (e = s.slides[o]) === null || e === void 0 ? void 0 : e.el;
      if (n && n.childNodes.length) {
        let r = M(1 - Math.abs(i.getProgress(o))),
          a = M(t.getShift(o));
        n.style.setProperty("--progress", r ? r + "" : ""),
          n.style.setProperty("--shift", a + "");
      }
    }
  }
  shiftModern() {
    const o = this;
    if (!o.isModern) return;
    const { instance: e, track: t } = o,
      i = e.panzoom,
      s = o.carousel;
    if (!(e && t && i && s) || i.state === j.Init || i.state === j.Destroy)
      return;
    for (const r of e.slides) o.setProps(r.index);
    let n = (o[te] + o.thumbGap) * (s.slides.length || 0);
    t.style.setProperty("--width", n + "");
  }
  cleanup() {
    const o = this;
    o.carousel && o.carousel.destroy(),
      (o.carousel = null),
      o.container && o.container.remove(),
      (o.container = null),
      o.track && o.track.remove(),
      (o.track = null),
      (o.state = le.Init),
      F(o.instance.container, o.cn("hasThumbs"));
  }
  attach() {
    const o = this,
      e = o.instance;
    e.on("initSlide", o.onInitSlide),
      e.state === H.Init
        ? e.on("initSlides", o.onInitSlides)
        : o.onInitSlides(),
      e.on(["change", "Panzoom.afterTransform"], o.onChange),
      e.on("Panzoom.refresh", o.onRefresh);
  }
  detach() {
    const o = this,
      e = o.instance;
    e.off("initSlide", o.onInitSlide),
      e.off("initSlides", o.onInitSlides),
      e.off(["change", "Panzoom.afterTransform"], o.onChange),
      e.off("Panzoom.refresh", o.onRefresh),
      o.cleanup();
  }
};
Object.defineProperty(Hi, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: Bi,
});
const xn = Object.assign(Object.assign({}, Bi), {
    key: "t",
    showOnStart: !0,
    parentEl: null,
  }),
  si = "is-masked",
  ni = "aria-hidden";
class Ni extends ee {
  constructor() {
    super(...arguments),
      Object.defineProperty(this, "ref", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "hidden", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      });
  }
  get isEnabled() {
    const e = this.ref;
    return e && !e.isDisabled();
  }
  get isHidden() {
    return this.hidden;
  }
  onClick(e, t) {
    t.stopPropagation();
  }
  onCreateSlide(e, t) {
    var i, s, n;
    const r =
        ((n =
          (s =
            (i = this.instance) === null || i === void 0
              ? void 0
              : i.carousel) === null || s === void 0
            ? void 0
            : s.slides[t.index]) === null || n === void 0
          ? void 0
          : n.type) || "",
      a = t.el;
    if (a && r) {
      let l = `for-${r}`;
      ["video", "youtube", "vimeo", "html5video"].includes(r) &&
        (l += " for-video"),
        I(a, l);
    }
  }
  onInit() {
    var e;
    const t = this,
      i = t.instance,
      s = i.carousel;
    if (t.ref || !s) return;
    const n = t.option("parentEl") || i.footer || i.container;
    if (!n) return;
    const r = q({}, t.options, {
      parentEl: n,
      classes: { container: "f-thumbs fancybox__thumbs" },
      Carousel: { Sync: { friction: i.option("Carousel.friction") || 0 } },
      on: {
        ready: (a) => {
          const l = a.container;
          l &&
            this.hidden &&
            (t.refresh(),
            (l.style.transition = "none"),
            t.hide(),
            l.offsetHeight,
            queueMicrotask(() => {
              (l.style.transition = ""), t.show();
            }));
        },
      },
    });
    (r.Carousel = r.Carousel || {}),
      (r.Carousel.on = q(
        ((e = t.options.Carousel) === null || e === void 0 ? void 0 : e.on) ||
          {},
        { click: this.onClick, createSlide: this.onCreateSlide }
      )),
      (s.options.Thumbs = r),
      s.attachPlugins({ Thumbs: Hi }),
      (t.ref = s.plugins.Thumbs),
      t.option("showOnStart") || ((t.ref.state = le.Hidden), (t.hidden = !0));
  }
  onResize() {
    var e;
    const t = (e = this.ref) === null || e === void 0 ? void 0 : e.container;
    t && (t.style.maxHeight = "");
  }
  onKeydown(e, t) {
    const i = this.option("key");
    i && i === t && this.toggle();
  }
  toggle() {
    const e = this.ref;
    if (e && !e.isDisabled())
      return e.state === le.Hidden
        ? ((e.state = le.Init), void e.build())
        : void (this.hidden ? this.show() : this.hide());
  }
  show() {
    const e = this.ref;
    if (!e || e.isDisabled()) return;
    const t = e.container;
    t &&
      (this.refresh(),
      t.offsetHeight,
      t.removeAttribute(ni),
      t.classList.remove(si),
      (this.hidden = !1));
  }
  hide() {
    const e = this.ref,
      t = e && e.container;
    t &&
      (this.refresh(),
      t.offsetHeight,
      t.classList.add(si),
      t.setAttribute(ni, "true")),
      (this.hidden = !0);
  }
  refresh() {
    const e = this.ref;
    if (!e || !e.state) return;
    const t = e.container,
      i = (t == null ? void 0 : t.firstChild) || null;
    t &&
      i &&
      i.childNodes.length &&
      (t.style.maxHeight = `${i.getBoundingClientRect().height}px`);
  }
  attach() {
    const e = this,
      t = e.instance;
    t.state === _.Init ? t.on("Carousel.init", e.onInit) : e.onInit(),
      t.on("resize", e.onResize),
      t.on("keydown", e.onKeydown);
  }
  detach() {
    var e;
    const t = this,
      i = t.instance;
    i.off("Carousel.init", t.onInit),
      i.off("resize", t.onResize),
      i.off("keydown", t.onKeydown),
      (e = i.carousel) === null || e === void 0 || e.detachPlugins(["Thumbs"]),
      (t.ref = null);
  }
}
Object.defineProperty(Ni, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: xn,
});
const bt = {
  panLeft: {
    icon: '<svg><path d="M5 12h14M5 12l6 6M5 12l6-6"/></svg>',
    change: { panX: -100 },
  },
  panRight: {
    icon: '<svg><path d="M5 12h14M13 18l6-6M13 6l6 6"/></svg>',
    change: { panX: 100 },
  },
  panUp: {
    icon: '<svg><path d="M12 5v14M18 11l-6-6M6 11l6-6"/></svg>',
    change: { panY: -100 },
  },
  panDown: {
    icon: '<svg><path d="M12 5v14M18 13l-6 6M6 13l6 6"/></svg>',
    change: { panY: 100 },
  },
  zoomIn: {
    icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>',
    action: "zoomIn",
  },
  zoomOut: {
    icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
    action: "zoomOut",
  },
  toggle1to1: {
    icon: '<svg><path d="M3.51 3.07c5.74.02 11.48-.02 17.22.02 1.37.1 2.34 1.64 2.18 3.13 0 4.08.02 8.16 0 12.23-.1 1.54-1.47 2.64-2.79 2.46-5.61-.01-11.24.02-16.86-.01-1.36-.12-2.33-1.65-2.17-3.14 0-4.07-.02-8.16 0-12.23.1-1.36 1.22-2.48 2.42-2.46Z"/><path d="M5.65 8.54h1.49v6.92m8.94-6.92h1.49v6.92M11.5 9.4v.02m0 5.18v0"/></svg>',
    action: "toggleZoom",
  },
  toggleZoom: {
    icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
    action: "toggleZoom",
  },
  iterateZoom: {
    icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
    action: "iterateZoom",
  },
  rotateCCW: {
    icon: '<svg><path d="M15 4.55a8 8 0 0 0-6 14.9M9 15v5H4M18.37 7.16v.01M13 19.94v.01M16.84 18.37v.01M19.37 15.1v.01M19.94 11v.01"/></svg>',
    action: "rotateCCW",
  },
  rotateCW: {
    icon: '<svg><path d="M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01"/></svg>',
    action: "rotateCW",
  },
  flipX: {
    icon: '<svg style="stroke-width: 1.3"><path d="M12 3v18M16 7v10h5L16 7M8 7v10H3L8 7"/></svg>',
    action: "flipX",
  },
  flipY: {
    icon: '<svg style="stroke-width: 1.3"><path d="M3 12h18M7 16h10L7 21v-5M7 8h10L7 3v5"/></svg>',
    action: "flipY",
  },
  fitX: {
    icon: '<svg><path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M10 18H3M21 18h-7M6 15l-3 3 3 3M18 15l3 3-3 3"/></svg>',
    action: "fitX",
  },
  fitY: {
    icon: '<svg><path d="M12 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6M18 14v7M18 3v7M15 18l3 3 3-3M15 6l3-3 3 3"/></svg>',
    action: "fitY",
  },
  reset: {
    icon: '<svg><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>',
    action: "reset",
  },
  toggleFS: {
    icon: '<svg><g><path d="M14.5 9.5 21 3m0 0h-6m6 0v6M3 21l6.5-6.5M3 21v-6m0 6h6"/></g><g><path d="m14 10 7-7m-7 7h6m-6 0V4M3 21l7-7m0 0v6m0-6H4"/></g></svg>',
    action: "toggleFS",
  },
};
var ve;
(function (o) {
  (o[(o.Init = 0)] = "Init"),
    (o[(o.Ready = 1)] = "Ready"),
    (o[(o.Disabled = 2)] = "Disabled");
})(ve || (ve = {}));
const Tn = {
    absolute: "auto",
    display: {
      left: ["infobar"],
      middle: [],
      right: ["iterateZoom", "slideshow", "fullscreen", "thumbs", "close"],
    },
    enabled: "auto",
    items: {
      infobar: {
        tpl: '<div class="fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span>/<span data-fancybox-count></span></div>',
      },
      download: {
        tpl: '<a class="f-button" title="{{DOWNLOAD}}" data-fancybox-download href="javasript:;"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></a>',
      },
      prev: {
        tpl: '<button class="f-button" title="{{PREV}}" data-fancybox-prev><svg><path d="m15 6-6 6 6 6"/></svg></button>',
      },
      next: {
        tpl: '<button class="f-button" title="{{NEXT}}" data-fancybox-next><svg><path d="m9 6 6 6-6 6"/></svg></button>',
      },
      slideshow: {
        tpl: '<button class="f-button" title="{{TOGGLE_SLIDESHOW}}" data-fancybox-toggle-slideshow><svg><g><path d="M8 4v16l13 -8z"></path></g><g><path d="M8 4v15M17 4v15"/></g></svg></button>',
      },
      fullscreen: {
        tpl: '<button class="f-button" title="{{TOGGLE_FULLSCREEN}}" data-fancybox-toggle-fullscreen><svg><g><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2"/></g><g><path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5"/></g></svg></button>',
      },
      thumbs: {
        tpl: '<button class="f-button" title="{{TOGGLE_THUMBS}}" data-fancybox-toggle-thumbs><svg><circle cx="5.5" cy="5.5" r="1"/><circle cx="12" cy="5.5" r="1"/><circle cx="18.5" cy="5.5" r="1"/><circle cx="5.5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18.5" cy="12" r="1"/><circle cx="5.5" cy="18.5" r="1"/><circle cx="12" cy="18.5" r="1"/><circle cx="18.5" cy="18.5" r="1"/></svg></button>',
      },
      close: {
        tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg><path d="m19.5 4.5-15 15M4.5 4.5l15 15"/></svg></button>',
      },
    },
    parentEl: null,
  },
  En = {
    tabindex: "-1",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
  },
  oi = "has-toolbar",
  yt = "fancybox__toolbar";
class _i extends ee {
  constructor() {
    super(...arguments),
      Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: ve.Init,
      }),
      Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      });
  }
  onReady(e) {
    var t;
    if (!e.carousel) return;
    let i = this.option("display"),
      s = this.option("absolute"),
      n = this.option("enabled");
    if (n === "auto") {
      const c = this.instance.carousel;
      let d = 0;
      if (c) for (const u of c.slides) (u.panzoom || u.type === "image") && d++;
      d || (n = !1);
    }
    n || (i = void 0);
    let r = 0;
    const a = { left: [], middle: [], right: [] };
    if (i)
      for (const c of ["left", "middle", "right"])
        for (const d of i[c]) {
          const u = this.createEl(d);
          u && ((t = a[c]) === null || t === void 0 || t.push(u), r++);
        }
    let l = null;
    if ((r && (l = this.createContainer()), l)) {
      for (const [c, d] of Object.entries(a)) {
        const u = document.createElement("div");
        I(u, yt + "__column is-" + c);
        for (const f of d) u.appendChild(f);
        s !== "auto" || c !== "middle" || d.length || (s = !0),
          l.appendChild(u);
      }
      s === !0 && I(l, "is-absolute"),
        (this.state = ve.Ready),
        this.onRefresh();
    } else this.state = ve.Disabled;
  }
  onClick(e) {
    var t, i;
    const s = this.instance,
      n = s.getSlide(),
      r = n == null ? void 0 : n.panzoom,
      a = e.target,
      l = a && X(a) ? a.dataset : null;
    if (!l) return;
    if (l.fancyboxToggleThumbs !== void 0)
      return (
        e.preventDefault(),
        e.stopPropagation(),
        void ((t = s.plugins.Thumbs) === null || t === void 0 || t.toggle())
      );
    if (l.fancyboxToggleFullscreen !== void 0)
      return (
        e.preventDefault(),
        e.stopPropagation(),
        void this.instance.toggleFullscreen()
      );
    if (l.fancyboxToggleSlideshow !== void 0) {
      e.preventDefault(), e.stopPropagation();
      const u =
        (i = s.carousel) === null || i === void 0 ? void 0 : i.plugins.Autoplay;
      let f = u.isActive;
      return (
        r && r.panMode === "mousemove" && !f && r.reset(),
        void (f ? u.stop() : u.start())
      );
    }
    const c = l.panzoomAction,
      d = l.panzoomChange;
    if (((d || c) && (e.preventDefault(), e.stopPropagation()), d)) {
      let u = {};
      try {
        u = JSON.parse(d);
      } catch {}
      r && r.applyChange(u);
    } else c && r && r[c] && r[c]();
  }
  onChange() {
    this.onRefresh();
  }
  onRefresh() {
    if (this.instance.isClosing()) return;
    const e = this.container;
    if (!e) return;
    const t = this.instance.getSlide();
    if (!t || t.state !== G.Ready) return;
    const i = t && !t.error && t.panzoom;
    for (const r of e.querySelectorAll("[data-panzoom-action]"))
      i
        ? (r.removeAttribute("disabled"), r.removeAttribute("tabindex"))
        : (r.setAttribute("disabled", ""), r.setAttribute("tabindex", "-1"));
    let s = i && i.canZoomIn(),
      n = i && i.canZoomOut();
    for (const r of e.querySelectorAll('[data-panzoom-action="zoomIn"]'))
      s
        ? (r.removeAttribute("disabled"), r.removeAttribute("tabindex"))
        : (r.setAttribute("disabled", ""), r.setAttribute("tabindex", "-1"));
    for (const r of e.querySelectorAll('[data-panzoom-action="zoomOut"]'))
      n
        ? (r.removeAttribute("disabled"), r.removeAttribute("tabindex"))
        : (r.setAttribute("disabled", ""), r.setAttribute("tabindex", "-1"));
    for (const r of e.querySelectorAll(
      '[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]'
    )) {
      n || s
        ? (r.removeAttribute("disabled"), r.removeAttribute("tabindex"))
        : (r.setAttribute("disabled", ""), r.setAttribute("tabindex", "-1"));
      const a = r.querySelector("g");
      a && (a.style.display = s ? "" : "none");
    }
  }
  onDone(e, t) {
    var i;
    (i = t.panzoom) === null ||
      i === void 0 ||
      i.on("afterTransform", () => {
        this.instance.isCurrentSlide(t) && this.onRefresh();
      }),
      this.instance.isCurrentSlide(t) && this.onRefresh();
  }
  createContainer() {
    const e = this.instance.container;
    if (!e) return null;
    const t = this.option("parentEl") || e;
    let i = t.querySelector("." + yt);
    return (
      i || ((i = document.createElement("div")), I(i, yt), t.prepend(i)),
      i.addEventListener("click", this.onClick, { passive: !1, capture: !0 }),
      e && I(e, oi),
      (this.container = i),
      i
    );
  }
  createEl(e) {
    const t = this.instance,
      i = t.carousel;
    if (!i || e === "toggleFS" || (e === "fullscreen" && !Li())) return null;
    let s = null;
    const n = i.slides.length || 0;
    let r = 0,
      a = 0;
    for (const c of i.slides)
      (c.panzoom || c.type === "image") && r++,
        (c.type === "image" || c.downloadSrc) && a++;
    if (n < 2 && ["infobar", "prev", "next"].includes(e)) return s;
    if ((bt[e] !== void 0 && !r) || (e === "download" && !a)) return null;
    if (e === "thumbs") {
      const c = t.plugins.Thumbs;
      if (!c || !c.isEnabled) return null;
    }
    if (e === "slideshow" && (!i.plugins.Autoplay || n < 2)) return null;
    if (bt[e] !== void 0) {
      const c = bt[e];
      (s = document.createElement("button")),
        s.setAttribute(
          "title",
          this.instance.localize(`{{${e.toUpperCase()}}}`)
        ),
        I(s, "f-button"),
        c.action && (s.dataset.panzoomAction = c.action),
        c.change && (s.dataset.panzoomChange = JSON.stringify(c.change)),
        s.appendChild(ne(this.instance.localize(c.icon)));
    } else {
      const c = (this.option("items") || [])[e];
      c &&
        ((s = ne(this.instance.localize(c.tpl))),
        typeof c.click == "function" &&
          s.addEventListener("click", (d) => {
            d.preventDefault(),
              d.stopPropagation(),
              typeof c.click == "function" && c.click.call(this, this, d);
          }));
    }
    const l = s == null ? void 0 : s.querySelector("svg");
    if (l)
      for (const [c, d] of Object.entries(En))
        l.getAttribute(c) || l.setAttribute(c, String(d));
    return s;
  }
  removeContainer() {
    const e = this.container;
    e && e.remove(), (this.container = null), (this.state = ve.Disabled);
    const t = this.instance.container;
    t && F(t, oi);
  }
  attach() {
    const e = this,
      t = e.instance;
    t.on("Carousel.initSlides", e.onReady),
      t.on("done", e.onDone),
      t.on(["reveal", "Carousel.change"], e.onChange),
      e.onReady(e.instance);
  }
  detach() {
    const e = this,
      t = e.instance;
    t.off("Carousel.initSlides", e.onReady),
      t.off("done", e.onDone),
      t.off(["reveal", "Carousel.change"], e.onChange),
      e.removeContainer();
  }
}
Object.defineProperty(_i, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: Tn,
});
const Pn = {
    Hash: class extends ee {
      onReady() {
        Ie = !1;
      }
      onChange(o) {
        ge && clearTimeout(ge);
        const { hash: e } = Ai(),
          { hash: t } = Je(),
          i = o.isOpeningSlide(o.getSlide());
        i && (Jt = t === e ? "" : t),
          e &&
            e !== t &&
            (ge = setTimeout(() => {
              try {
                if (o.state === _.Ready) {
                  let s = "replaceState";
                  i && !Ve && ((s = "pushState"), (Ve = !0)),
                    window.history[s](
                      {},
                      document.title,
                      window.location.pathname + window.location.search + e
                    );
                }
              } catch {}
            }, 300));
      }
      onClose(o) {
        if ((ge && clearTimeout(ge), !Ie && Ve))
          return (Ve = !1), (Ie = !1), void window.history.back();
        if (!Ie)
          try {
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname + window.location.search + (Jt || "")
            );
          } catch {}
      }
      attach() {
        const o = this.instance;
        o.on("ready", this.onReady),
          o.on(["Carousel.ready", "Carousel.change"], this.onChange),
          o.on("close", this.onClose);
      }
      detach() {
        const o = this.instance;
        o.off("ready", this.onReady),
          o.off(["Carousel.ready", "Carousel.change"], this.onChange),
          o.off("close", this.onClose);
      }
      static parseURL() {
        return Je();
      }
      static startFromUrl() {
        Ii();
      }
      static destroy() {
        window.removeEventListener("hashchange", ki, !1);
      }
    },
    Html: Ri,
    Images: Di,
    Slideshow: ji,
    Thumbs: Ni,
    Toolbar: _i,
  },
  ri = "with-fancybox",
  wt = "hide-scrollbar",
  ai = "--fancybox-scrollbar-compensate",
  li = "--fancybox-body-margin",
  St = "aria-hidden",
  xt = "is-using-tab",
  Tt = "is-animated",
  ci = "is-compact",
  di = "is-loading",
  Et = "is-opening",
  qe = "has-caption",
  Ee = "disabled",
  pe = "tabindex",
  ui = "download",
  Pt = "href",
  Pe = "src",
  de = (o) => typeof o == "string",
  hi = function () {
    var o = window.getSelection();
    return !!o && o.type === "Range";
  };
let K,
  J = null,
  me = null,
  fi = 0,
  pi = 0,
  mi = 0,
  gi = 0;
const Me = new Map();
let Mn = 0;
class R extends zt {
  get isIdle() {
    return this.idle;
  }
  get isCompact() {
    return this.option("compact");
  }
  constructor(e = [], t = {}, i = {}) {
    super(t),
      Object.defineProperty(this, "userSlides", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: [],
      }),
      Object.defineProperty(this, "userPlugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {},
      }),
      Object.defineProperty(this, "idle", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "idleTimer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "clickTimer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "pwt", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "ignoreFocusChange", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "startedFs", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1,
      }),
      Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: _.Init,
      }),
      Object.defineProperty(this, "id", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "caption", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "footer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "carousel", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "lastFocus", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null,
      }),
      Object.defineProperty(this, "prevMouseMoveEvent", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      K || (K = Li()),
      (this.id = t.id || ++Mn),
      Me.set(this.id, this),
      (this.userSlides = e),
      (this.userPlugins = i),
      queueMicrotask(() => {
        this.init();
      });
  }
  init() {
    if (this.state === _.Destroy) return;
    (this.state = _.Init),
      this.attachPlugins(
        Object.assign(Object.assign({}, R.Plugins), this.userPlugins)
      ),
      this.emit("init"),
      this.emit("attachPlugins"),
      this.option("hideScrollbar") === !0 &&
        (() => {
          if (!ze) return;
          const t = document,
            i = t.body,
            s = t.documentElement;
          if (i.classList.contains(wt)) return;
          let n = window.innerWidth - s.getBoundingClientRect().width;
          const r = parseFloat(window.getComputedStyle(i).marginRight);
          n < 0 && (n = 0),
            s.style.setProperty(ai, `${n}px`),
            r && i.style.setProperty(li, `${r}px`),
            i.classList.add(wt);
        })(),
      this.initLayout(),
      this.scale();
    const e = () => {
      this.initCarousel(this.userSlides),
        (this.state = _.Ready),
        this.attachEvents(),
        this.emit("ready"),
        setTimeout(() => {
          this.container && this.container.setAttribute(St, "false");
        }, 16);
    };
    this.option("Fullscreen.autoStart") && K && !K.isFullscreen()
      ? K.request()
          .then(() => {
            (this.startedFs = !0), e();
          })
          .catch(() => e())
      : e();
  }
  initLayout() {
    var e, t;
    const i = this.option("parentEl") || document.body,
      s = ne(this.localize(this.option("tpl.main") || ""));
    if (s) {
      if (
        (s.setAttribute("id", `fancybox-${this.id}`),
        s.setAttribute("aria-label", this.localize("{{MODAL}}")),
        s.classList.toggle(ci, this.isCompact),
        I(s, this.option("mainClass") || ""),
        I(s, Et),
        (this.container = s),
        (this.footer = s.querySelector(".fancybox__footer")),
        i.appendChild(s),
        I(document.documentElement, ri),
        (J && me) ||
          ((J = document.createElement("span")),
          I(J, "fancybox-focus-guard"),
          J.setAttribute(pe, "0"),
          J.setAttribute(St, "true"),
          J.setAttribute("aria-label", "Focus guard"),
          (me = J.cloneNode()),
          (e = s.parentElement) === null ||
            e === void 0 ||
            e.insertBefore(J, s),
          (t = s.parentElement) === null || t === void 0 || t.append(me)),
        s.addEventListener("mousedown", (n) => {
          (fi = n.pageX), (pi = n.pageY), F(s, xt);
        }),
        this.option("closeExisting"))
      )
        for (const n of Me.values()) n.id !== this.id && n.close();
      else
        this.option("animated") &&
          (I(s, Tt),
          setTimeout(() => {
            this.isClosing() || F(s, Tt);
          }, 350));
      this.emit("initLayout");
    }
  }
  initCarousel(e) {
    const t = this.container;
    if (!t) return;
    const i = t.querySelector(".fancybox__carousel");
    if (!i) return;
    const s = (this.carousel = new be(
      i,
      q(
        {},
        {
          slides: e,
          transition: "fade",
          Panzoom: {
            lockAxis: this.option("dragToClose") ? "xy" : "x",
            infinite: !!this.option("dragToClose") && "y",
          },
          Dots: !1,
          Navigation: {
            classes: {
              container: "fancybox__nav",
              button: "f-button",
              isNext: "is-next",
              isPrev: "is-prev",
            },
          },
          initialPage: this.option("startIndex"),
          l10n: this.option("l10n"),
        },
        this.option("Carousel") || {}
      )
    ));
    s.on("*", (n, r, ...a) => {
      this.emit(`Carousel.${r}`, n, ...a);
    }),
      s.on(["ready", "change"], () => {
        this.manageCaption();
      }),
      this.on("Carousel.removeSlide", (n, r, a) => {
        this.clearContent(a), (a.state = void 0);
      }),
      s.on("Panzoom.touchStart", () => {
        var n, r;
        this.isCompact || this.endIdle(),
          !((n = document.activeElement) === null || n === void 0) &&
            n.closest(".f-thumbs") &&
            ((r = this.container) === null || r === void 0 || r.focus());
      }),
      s.on("settle", () => {
        this.idleTimer ||
          this.isCompact ||
          !this.option("idle") ||
          this.setIdle(),
          this.option("autoFocus") && !this.isClosing && this.checkFocus();
      }),
      this.option("dragToClose") &&
        (s.on("Panzoom.afterTransform", (n, r) => {
          const a = this.getSlide();
          if (a && Ct(a.el)) return;
          const l = this.container;
          if (l) {
            const c = Math.abs(r.current.f),
              d =
                c < 1
                  ? ""
                  : Math.max(
                      0.5,
                      Math.min(1, 1 - (c / r.contentRect.fitHeight) * 1.5)
                    );
            l.style.setProperty("--fancybox-ts", d ? "0s" : ""),
              l.style.setProperty("--fancybox-opacity", d + "");
          }
        }),
        s.on("Panzoom.touchEnd", (n, r, a) => {
          var l;
          const c = this.getSlide();
          if (
            (c && Ct(c.el)) ||
            (r.isMobile &&
              document.activeElement &&
              ["TEXTAREA", "INPUT"].indexOf(
                (l = document.activeElement) === null || l === void 0
                  ? void 0
                  : l.nodeName
              ) !== -1)
          )
            return;
          const d = Math.abs(r.dragOffset.y);
          r.lockedAxis === "y" &&
            (d >= 200 || (d >= 50 && r.dragOffset.time < 300)) &&
            (a && a.cancelable && a.preventDefault(),
            this.close(a, "f-throwOut" + (r.current.f < 0 ? "Up" : "Down")));
        })),
      s.on("change", (n) => {
        var r;
        let a =
          (r = this.getSlide()) === null || r === void 0 ? void 0 : r.triggerEl;
        if (a) {
          const l = new CustomEvent("slideTo", {
            bubbles: !0,
            cancelable: !0,
            detail: n.page,
          });
          a.dispatchEvent(l);
        }
      }),
      s.on(["refresh", "change"], (n) => {
        const r = this.container;
        if (!r) return;
        for (const c of r.querySelectorAll("[data-fancybox-current-index]"))
          c.innerHTML = n.page + 1;
        for (const c of r.querySelectorAll("[data-fancybox-count]"))
          c.innerHTML = n.pages.length;
        if (!n.isInfinite) {
          for (const c of r.querySelectorAll("[data-fancybox-next]"))
            n.page < n.pages.length - 1
              ? (c.removeAttribute(Ee), c.removeAttribute(pe))
              : (c.setAttribute(Ee, ""), c.setAttribute(pe, "-1"));
          for (const c of r.querySelectorAll("[data-fancybox-prev]"))
            n.page > 0
              ? (c.removeAttribute(Ee), c.removeAttribute(pe))
              : (c.setAttribute(Ee, ""), c.setAttribute(pe, "-1"));
        }
        const a = this.getSlide();
        if (!a) return;
        let l = a.downloadSrc || "";
        l || a.type !== "image" || a.error || !de(a[Pe]) || (l = a[Pe]);
        for (const c of r.querySelectorAll("[data-fancybox-download]")) {
          const d = a.downloadFilename;
          l
            ? (c.removeAttribute(Ee),
              c.removeAttribute(pe),
              c.setAttribute(Pt, l),
              c.setAttribute(ui, d || l),
              c.setAttribute("target", "_blank"))
            : (c.setAttribute(Ee, ""),
              c.setAttribute(pe, "-1"),
              c.removeAttribute(Pt),
              c.removeAttribute(ui));
        }
      }),
      this.emit("initCarousel");
  }
  attachEvents() {
    const e = this,
      t = e.container;
    if (!t) return;
    t.addEventListener("click", e.onClick, { passive: !1, capture: !1 }),
      t.addEventListener("wheel", e.onWheel, { passive: !1, capture: !1 }),
      document.addEventListener("keydown", e.onKeydown, {
        passive: !1,
        capture: !0,
      }),
      document.addEventListener("visibilitychange", e.onVisibilityChange, !1),
      document.addEventListener("mousemove", e.onMousemove),
      e.option("trapFocus") &&
        document.addEventListener("focus", e.onFocus, !0),
      window.addEventListener("resize", e.onResize);
    const i = window.visualViewport;
    i &&
      (i.addEventListener("scroll", e.onResize),
      i.addEventListener("resize", e.onResize));
  }
  detachEvents() {
    const e = this,
      t = e.container;
    if (!t) return;
    document.removeEventListener("keydown", e.onKeydown, {
      passive: !1,
      capture: !0,
    }),
      t.removeEventListener("wheel", e.onWheel, { passive: !1, capture: !1 }),
      t.removeEventListener("click", e.onClick, { passive: !1, capture: !1 }),
      document.removeEventListener("mousemove", e.onMousemove),
      window.removeEventListener("resize", e.onResize);
    const i = window.visualViewport;
    i &&
      (i.removeEventListener("resize", e.onResize),
      i.removeEventListener("scroll", e.onResize)),
      document.removeEventListener(
        "visibilitychange",
        e.onVisibilityChange,
        !1
      ),
      document.removeEventListener("focus", e.onFocus, !0);
  }
  scale() {
    const e = this.container;
    if (!e) return;
    const t = window.visualViewport,
      i = Math.max(1, (t == null ? void 0 : t.scale) || 1);
    let s = "",
      n = "",
      r = "";
    if (t && i > 1) {
      let a = `${t.offsetLeft}px`,
        l = `${t.offsetTop}px`;
      (s = t.width * i + "px"),
        (n = t.height * i + "px"),
        (r = `translate3d(${a}, ${l}, 0) scale(${1 / i})`);
    }
    (e.style.transform = r), (e.style.width = s), (e.style.height = n);
  }
  onClick(e) {
    var t;
    const { container: i, isCompact: s } = this;
    if (!i || this.isClosing()) return;
    !s && this.option("idle") && this.resetIdle();
    const n = e.composedPath()[0];
    if (n.closest(".fancybox-spinner") || n.closest("[data-fancybox-close]"))
      return e.preventDefault(), void this.close(e);
    if (n.closest("[data-fancybox-prev]"))
      return e.preventDefault(), void this.prev();
    if (n.closest("[data-fancybox-next]"))
      return e.preventDefault(), void this.next();
    if (
      (e.type === "click" && e.detail === 0) ||
      Math.abs(e.pageX - fi) > 30 ||
      Math.abs(e.pageY - pi) > 30
    )
      return;
    const r = document.activeElement;
    if (hi() && r && i.contains(r)) return;
    if (
      s &&
      ((t = this.getSlide()) === null || t === void 0 ? void 0 : t.type) ===
        "image"
    )
      return void (this.clickTimer
        ? (clearTimeout(this.clickTimer), (this.clickTimer = null))
        : (this.clickTimer = setTimeout(() => {
            this.toggleIdle(), (this.clickTimer = null);
          }, 350)));
    if ((this.emit("click", e), e.defaultPrevented)) return;
    let a = !1;
    if (n.closest(".fancybox__content")) {
      if (r) {
        if (r.closest("[contenteditable]")) return;
        n.matches(mt) || r.blur();
      }
      if (hi()) return;
      a = this.option("contentClick");
    } else
      n.closest(".fancybox__carousel") &&
        !n.matches(mt) &&
        (a = this.option("backdropClick"));
    a === "close"
      ? (e.preventDefault(), this.close(e))
      : a === "next"
      ? (e.preventDefault(), this.next())
      : a === "prev" && (e.preventDefault(), this.prev());
  }
  onWheel(e) {
    const t = e.target;
    let i = this.option("wheel", e);
    t.closest(".fancybox__thumbs") && (i = "slide");
    const s = i === "slide",
      n = [-e.deltaX || 0, -e.deltaY || 0, -e.detail || 0].reduce(function (
        l,
        c
      ) {
        return Math.abs(c) > Math.abs(l) ? c : l;
      }),
      r = Math.max(-1, Math.min(1, n)),
      a = Date.now();
    this.pwt && a - this.pwt < 300
      ? s && e.preventDefault()
      : ((this.pwt = a),
        this.emit("wheel", e, r),
        e.defaultPrevented ||
          (i === "close"
            ? (e.preventDefault(), this.close(e))
            : i === "slide" &&
              (Ue(t) ||
                (e.preventDefault(), this[r > 0 ? "prev" : "next"]()))));
  }
  onScroll() {
    window.scrollTo(mi, gi);
  }
  onKeydown(e) {
    if (!this.isTopmost()) return;
    this.isCompact ||
      !this.option("idle") ||
      this.isClosing() ||
      this.resetIdle();
    const t = e.key,
      i = this.option("keyboard");
    if (!i) return;
    const s = e.composedPath()[0],
      n = document.activeElement && document.activeElement.classList,
      r =
        (n && n.contains("f-button")) ||
        s.dataset.carouselPage ||
        s.dataset.carouselIndex;
    if (
      (t !== "Escape" &&
        !r &&
        X(s) &&
        (s.isContentEditable ||
          ["TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].indexOf(
            s.nodeName
          ) !== -1)) ||
      (e.key === "Tab" ? I(this.container, xt) : F(this.container, xt),
      e.ctrlKey || e.altKey || e.shiftKey)
    )
      return;
    this.emit("keydown", t, e);
    const a = i[t];
    a && typeof this[a] == "function" && (e.preventDefault(), this[a]());
  }
  onResize() {
    const e = this.container;
    if (!e) return;
    const t = this.isCompact;
    e.classList.toggle(ci, t),
      this.manageCaption(this.getSlide()),
      this.isCompact ? this.clearIdle() : this.endIdle(),
      this.scale(),
      this.emit("resize");
  }
  onFocus(e) {
    this.isTopmost() && this.checkFocus(e);
  }
  onMousemove(e) {
    (this.prevMouseMoveEvent = e),
      !this.isCompact && this.option("idle") && this.resetIdle();
  }
  onVisibilityChange() {
    document.visibilityState === "visible" ? this.checkFocus() : this.endIdle();
  }
  manageCloseBtn(e) {
    const t = this.optionFor(e, "closeButton") || !1;
    if (t === "auto") {
      const s = this.plugins.Toolbar;
      if (s && s.state === ve.Ready) return;
    }
    if (!t || !e.contentEl || e.closeBtnEl) return;
    const i = this.option("tpl.closeButton");
    if (i) {
      const s = ne(this.localize(i));
      (e.closeBtnEl = e.contentEl.appendChild(s)),
        e.el && I(e.el, "has-close-btn");
    }
  }
  manageCaption(e = void 0) {
    var t, i;
    const s = "fancybox__caption",
      n = this.container;
    if (!n) return;
    F(n, qe);
    const r = this.isCompact || this.option("commonCaption"),
      a = !r;
    if (
      (this.caption && this.stop(this.caption),
      a && this.caption && (this.caption.remove(), (this.caption = null)),
      r && !this.caption)
    )
      for (const u of ((t = this.carousel) === null || t === void 0
        ? void 0
        : t.slides) || [])
        u.captionEl &&
          (u.captionEl.remove(),
          (u.captionEl = void 0),
          F(u.el, qe),
          (i = u.el) === null ||
            i === void 0 ||
            i.removeAttribute("aria-labelledby"));
    if ((e || (e = this.getSlide()), !e || (r && !this.isCurrentSlide(e))))
      return;
    const l = e.el;
    let c = this.optionFor(e, "caption", "");
    if (!c)
      return void (
        r &&
        this.caption &&
        this.animate(this.caption, "f-fadeOut", () => {
          this.caption && (this.caption.innerHTML = "");
        })
      );
    let d = null;
    if (a) {
      if (((d = e.captionEl || null), l && !d)) {
        const u = s + `_${this.id}_${e.index}`;
        (d = document.createElement("div")),
          I(d, s),
          d.setAttribute("id", u),
          (e.captionEl = l.appendChild(d)),
          I(l, qe),
          l.setAttribute("aria-labelledby", u);
      }
    } else
      (d = this.caption),
        d || (d = n.querySelector("." + s)),
        !d &&
          ((d = document.createElement("div")),
          (d.dataset.fancyboxCaption = ""),
          I(d, s),
          (this.footer || n).prepend(d)),
        I(n, qe),
        (this.caption = d);
    d &&
      ((d.innerHTML = ""),
      de(c) || typeof c == "number"
        ? (d.innerHTML = c + "")
        : c instanceof HTMLElement && d.appendChild(c));
  }
  checkFocus(e) {
    this.focus(e);
  }
  focus(e) {
    var t;
    if (this.ignoreFocusChange) return;
    const i = document.activeElement || null,
      s = (e == null ? void 0 : e.target) || null,
      n = this.container,
      r = (t = this.carousel) === null || t === void 0 ? void 0 : t.viewport;
    if (!n || !r || (!e && i && n.contains(i))) return;
    const a = this.getSlide(),
      l = a && a.state === G.Ready ? a.el : null;
    if (!l || l.contains(i) || n === i) return;
    e && e.cancelable && e.preventDefault(), (this.ignoreFocusChange = !0);
    const c = Array.from(n.querySelectorAll(mt));
    let d = [],
      u = null;
    for (let h of c) {
      const p = !h.offsetParent || !!h.closest('[aria-hidden="true"]'),
        m = l && l.contains(h),
        v = !r.contains(h);
      if (h === n || ((m || v) && !p)) {
        d.push(h);
        const g = h.dataset.origTabindex;
        g !== void 0 && g && (h.tabIndex = parseFloat(g)),
          h.removeAttribute("data-orig-tabindex"),
          (!h.hasAttribute("autoFocus") && u) || (u = h);
      } else {
        const g =
          h.dataset.origTabindex === void 0
            ? h.getAttribute("tabindex") || ""
            : h.dataset.origTabindex;
        g && (h.dataset.origTabindex = g), (h.tabIndex = -1);
      }
    }
    let f = null;
    e
      ? (!s || d.indexOf(s) < 0) &&
        ((f = u || n),
        d.length &&
          (i === me
            ? (f = d[0])
            : (this.lastFocus !== n && i !== J) || (f = d[d.length - 1])))
      : (f = a && a.type === "image" ? n : u || n),
      f && Kt(f),
      (this.lastFocus = document.activeElement),
      (this.ignoreFocusChange = !1);
  }
  next() {
    const e = this.carousel;
    e && e.pages.length > 1 && e.slideNext();
  }
  prev() {
    const e = this.carousel;
    e && e.pages.length > 1 && e.slidePrev();
  }
  jumpTo(...e) {
    this.carousel && this.carousel.slideTo(...e);
  }
  isTopmost() {
    var e;
    return (
      ((e = R.getInstance()) === null || e === void 0 ? void 0 : e.id) ==
      this.id
    );
  }
  animate(e = null, t = "", i) {
    if (!e || !t) return void (i && i());
    this.stop(e);
    const s = (n) => {
      n.target === e &&
        e.dataset.animationName &&
        (e.removeEventListener("animationend", s),
        delete e.dataset.animationName,
        i && i(),
        F(e, t));
    };
    (e.dataset.animationName = t),
      e.addEventListener("animationend", s),
      I(e, t);
  }
  stop(e) {
    e &&
      e.dispatchEvent(
        new CustomEvent("animationend", {
          bubbles: !1,
          cancelable: !0,
          currentTarget: e,
        })
      );
  }
  setContent(e, t = "", i = !0) {
    if (this.isClosing()) return;
    const s = e.el;
    if (!s) return;
    let n = null;
    if (
      (X(t)
        ? (n = t)
        : ((n = ne(t + "")),
          X(n) ||
            ((n = document.createElement("div")), (n.innerHTML = t + ""))),
      ["img", "picture", "iframe", "video", "audio"].includes(
        n.nodeName.toLowerCase()
      ))
    ) {
      const r = document.createElement("div");
      r.appendChild(n), (n = r);
    }
    X(n) && e.filter && !e.error && (n = n.querySelector(e.filter)),
      n && X(n)
        ? (I(n, "fancybox__content"),
          e.id && n.setAttribute("id", e.id),
          s.classList.add(`has-${e.error ? "error" : e.type || "unknown"}`),
          s.prepend(n),
          n.style.display === "none" && (n.style.display = ""),
          getComputedStyle(n).getPropertyValue("display") === "none" &&
            (n.style.display =
              e.display || this.option("defaultDisplay") || "flex"),
          (e.contentEl = n),
          i && this.revealContent(e),
          this.manageCloseBtn(e),
          this.manageCaption(e))
        : this.setError(e, "{{ELEMENT_NOT_FOUND}}");
  }
  revealContent(e, t) {
    const i = e.el,
      s = e.contentEl;
    i &&
      s &&
      (this.emit("reveal", e),
      this.hideLoading(e),
      (e.state = G.Opening),
      (t = this.isOpeningSlide(e)
        ? t === void 0
          ? this.optionFor(e, "showClass")
          : t
        : "f-fadeIn")
        ? this.animate(s, t, () => {
            this.done(e);
          })
        : this.done(e));
  }
  done(e) {
    this.isClosing() ||
      ((e.state = G.Ready),
      this.emit("done", e),
      I(e.el, "is-done"),
      this.isCurrentSlide(e) &&
        this.option("autoFocus") &&
        queueMicrotask(() => {
          var t;
          (t = e.panzoom) === null || t === void 0 || t.updateControls(),
            this.option("autoFocus") && this.focus();
        }),
      this.isOpeningSlide(e) &&
        (F(this.container, Et),
        !this.isCompact && this.option("idle") && this.setIdle()));
  }
  isCurrentSlide(e) {
    const t = this.getSlide();
    return !(!e || !t) && t.index === e.index;
  }
  isOpeningSlide(e) {
    var t, i;
    return (
      ((t = this.carousel) === null || t === void 0 ? void 0 : t.prevPage) ===
        null &&
      e &&
      e.index ===
        ((i = this.getSlide()) === null || i === void 0 ? void 0 : i.index)
    );
  }
  showLoading(e) {
    e.state = G.Loading;
    const t = e.el;
    t &&
      (I(t, di),
      this.emit("loading", e),
      e.spinnerEl ||
        setTimeout(() => {
          if (!this.isClosing() && !e.spinnerEl && e.state === G.Loading) {
            let i = ne(kt);
            I(i, "fancybox-spinner"),
              (e.spinnerEl = i),
              t.prepend(i),
              this.animate(i, "f-fadeIn");
          }
        }, 250));
  }
  hideLoading(e) {
    const t = e.el;
    if (!t) return;
    const i = e.spinnerEl;
    this.isClosing()
      ? i == null || i.remove()
      : (F(t, di),
        i &&
          this.animate(i, "f-fadeOut", () => {
            i.remove();
          }),
        e.state === G.Loading && (this.emit("loaded", e), (e.state = G.Ready)));
  }
  setError(e, t) {
    if (this.isClosing()) return;
    const i = new Event("error", { bubbles: !0, cancelable: !0 });
    if ((this.emit("error", i, e), i.defaultPrevented)) return;
    (e.error = t), this.hideLoading(e), this.clearContent(e);
    const s = document.createElement("div");
    s.classList.add("fancybox-error"),
      (s.innerHTML = this.localize(t || "<p>{{ERROR}}</p>")),
      this.setContent(e, s);
  }
  clearContent(e) {
    if (e.state === void 0) return;
    this.emit("clearContent", e),
      e.contentEl && (e.contentEl.remove(), (e.contentEl = void 0));
    const t = e.el;
    t &&
      (F(t, "has-error"),
      F(t, "has-unknown"),
      F(t, `has-${e.type || "unknown"}`)),
      e.closeBtnEl && e.closeBtnEl.remove(),
      (e.closeBtnEl = void 0),
      e.captionEl && e.captionEl.remove(),
      (e.captionEl = void 0),
      e.spinnerEl && e.spinnerEl.remove(),
      (e.spinnerEl = void 0);
  }
  getSlide() {
    var e;
    const t = this.carousel;
    return (
      ((e = t == null ? void 0 : t.pages[t == null ? void 0 : t.page]) ===
        null || e === void 0
        ? void 0
        : e.slides[0]) || void 0
    );
  }
  close(e, t) {
    if (this.isClosing()) return;
    const i = new Event("shouldClose", { bubbles: !0, cancelable: !0 });
    if ((this.emit("shouldClose", i, e), i.defaultPrevented)) return;
    e && e.cancelable && (e.preventDefault(), e.stopPropagation());
    const s = () => {
      this.proceedClose(e, t);
    };
    this.startedFs && K && K.isFullscreen()
      ? Promise.resolve(K.exit()).then(() => s())
      : s();
  }
  clearIdle() {
    this.idleTimer && clearTimeout(this.idleTimer), (this.idleTimer = null);
  }
  setIdle(e = !1) {
    const t = () => {
      this.clearIdle(),
        (this.idle = !0),
        I(this.container, "is-idle"),
        this.emit("setIdle");
    };
    if ((this.clearIdle(), !this.isClosing()))
      if (e) t();
      else {
        const i = this.option("idle");
        i && (this.idleTimer = setTimeout(t, i));
      }
  }
  endIdle() {
    this.clearIdle(),
      this.idle &&
        !this.isClosing() &&
        ((this.idle = !1), F(this.container, "is-idle"), this.emit("endIdle"));
  }
  resetIdle() {
    this.endIdle(), this.setIdle();
  }
  toggleIdle() {
    this.idle ? this.endIdle() : this.setIdle(!0);
  }
  toggleFullscreen() {
    K &&
      (K.isFullscreen()
        ? K.exit()
        : K.request().then(() => {
            this.startedFs = !0;
          }));
  }
  isClosing() {
    return [_.Closing, _.CustomClosing, _.Destroy].includes(this.state);
  }
  proceedClose(e, t) {
    var i, s;
    (this.state = _.Closing), this.clearIdle(), this.detachEvents();
    const n = this.container,
      r = this.carousel,
      a = this.getSlide(),
      l =
        a && this.option("placeFocusBack")
          ? a.triggerEl || this.option("triggerEl")
          : null;
    if (
      (l && (Oi(l) ? Kt(l) : l.focus()),
      n &&
        (F(n, Et),
        I(n, "is-closing"),
        n.setAttribute(St, "true"),
        this.option("animated") && I(n, Tt),
        (n.style.pointerEvents = "none")),
      r)
    ) {
      r.clearTransitions(),
        (i = r.panzoom) === null || i === void 0 || i.destroy(),
        (s = r.plugins.Navigation) === null || s === void 0 || s.detach();
      for (const c of r.slides) {
        (c.state = G.Closing), this.hideLoading(c);
        const d = c.contentEl;
        d && this.stop(d);
        const u = c == null ? void 0 : c.panzoom;
        u && (u.stop(), u.detachEvents(), u.detachObserver()),
          this.isCurrentSlide(c) || r.emit("removeSlide", c);
      }
    }
    (mi = window.scrollX),
      (gi = window.scrollY),
      window.addEventListener("scroll", this.onScroll),
      this.emit("close", e),
      this.state !== _.CustomClosing
        ? (t === void 0 && a && (t = this.optionFor(a, "hideClass")),
          t && a
            ? (this.animate(a.contentEl, t, () => {
                r && r.emit("removeSlide", a);
              }),
              setTimeout(() => {
                this.destroy();
              }, 500))
            : this.destroy())
        : setTimeout(() => {
            this.destroy();
          }, 500);
  }
  destroy() {
    var e;
    if (this.state === _.Destroy) return;
    window.removeEventListener("scroll", this.onScroll),
      (this.state = _.Destroy),
      (e = this.carousel) === null || e === void 0 || e.destroy();
    const t = this.container;
    t && t.remove(), Me.delete(this.id);
    const i = R.getInstance();
    i
      ? i.focus()
      : (J && (J.remove(), (J = null)),
        me && (me.remove(), (me = null)),
        F(document.documentElement, ri),
        (() => {
          if (!ze) return;
          const s = document,
            n = s.body;
          n.classList.remove(wt),
            n.style.setProperty(li, ""),
            s.documentElement.style.setProperty(ai, "");
        })(),
        this.emit("destroy"));
  }
  static bind(e, t, i) {
    if (!ze) return;
    let s,
      n = "",
      r = {};
    if (
      (e === void 0
        ? (s = document.body)
        : de(e)
        ? ((s = document.body), (n = e), typeof t == "object" && (r = t || {}))
        : ((s = e), de(t) && (n = t), typeof i == "object" && (r = i || {})),
      !s || !X(s))
    )
      return;
    n = n || "[data-fancybox]";
    const a = R.openers.get(s) || new Map();
    a.set(n, r),
      R.openers.set(s, a),
      a.size === 1 && s.addEventListener("click", R.fromEvent);
  }
  static unbind(e, t) {
    let i,
      s = "";
    if (
      (de(e) ? ((i = document.body), (s = e)) : ((i = e), de(t) && (s = t)), !i)
    )
      return;
    const n = R.openers.get(i);
    n && s && n.delete(s),
      (s && n) ||
        (R.openers.delete(i), i.removeEventListener("click", R.fromEvent));
  }
  static destroy() {
    let e;
    for (; (e = R.getInstance()); ) e.destroy();
    for (const t of R.openers.keys())
      t.removeEventListener("click", R.fromEvent);
    R.openers = new Map();
  }
  static fromEvent(e) {
    if (
      e.defaultPrevented ||
      (e.button && e.button !== 0) ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey
    )
      return;
    let t = e.composedPath()[0];
    const i = t.closest("[data-fancybox-trigger]");
    if (i) {
      const p = i.dataset.fancyboxTrigger || "",
        m = document.querySelectorAll(`[data-fancybox="${p}"]`),
        v = parseInt(i.dataset.fancyboxIndex || "", 10) || 0;
      t = m[v] || t;
    }
    if (!(t && t instanceof Element)) return;
    let s, n, r, a;
    if (
      ([...R.openers].reverse().find(
        ([p, m]) =>
          !(
            !p.contains(t) ||
            ![...m].reverse().find(([v, g]) => {
              let y = t.closest(v);
              return !!y && ((s = p), (n = v), (r = y), (a = g), !0);
            })
          )
      ),
      !s || !n || !r)
    )
      return;
    (a = a || {}), e.preventDefault(), (t = r);
    let l = [],
      c = q({}, Lt, a);
    (c.event = e), (c.triggerEl = t), (c.delegate = i);
    const d = c.groupAll,
      u = c.groupAttr,
      f = u && t ? t.getAttribute(`${u}`) : "";
    if (
      ((!t || f || d) && (l = [].slice.call(s.querySelectorAll(n))),
      t && !d && (l = f ? l.filter((p) => p.getAttribute(`${u}`) === f) : [t]),
      !l.length)
    )
      return;
    const h = R.getInstance();
    return h && h.options.triggerEl && l.indexOf(h.options.triggerEl) > -1
      ? void 0
      : (t && (c.startIndex = l.indexOf(t)), R.fromNodes(l, c));
  }
  static fromSelector(e, t, i) {
    let s = null,
      n = "",
      r = {};
    if (
      (de(e)
        ? ((s = document.body), (n = e), typeof t == "object" && (r = t || {}))
        : e instanceof HTMLElement &&
          de(t) &&
          ((s = e), (n = t), typeof i == "object" && (r = i || {})),
      !s || !n)
    )
      return !1;
    const a = R.openers.get(s);
    return (
      !!a &&
      ((r = q({}, a.get(n) || {}, r)),
      !!r && R.fromNodes(Array.from(s.querySelectorAll(n)), r))
    );
  }
  static fromNodes(e, t) {
    t = q({}, Lt, t || {});
    const i = [];
    for (const s of e) {
      const n = s.dataset || {},
        r =
          n[Pe] ||
          s.getAttribute(Pt) ||
          s.getAttribute("currentSrc") ||
          s.getAttribute(Pe) ||
          void 0;
      let a;
      const l = t.delegate;
      let c;
      l &&
        i.length === t.startIndex &&
        (a =
          l instanceof HTMLImageElement
            ? l
            : l.querySelector("img:not([aria-hidden])")),
        a ||
          (a =
            s instanceof HTMLImageElement
              ? s
              : s.querySelector("img:not([aria-hidden])")),
        a &&
          ((c = a.currentSrc || a[Pe] || void 0),
          !c &&
            a.dataset &&
            (c = a.dataset.lazySrc || a.dataset[Pe] || void 0));
      const d = {
        src: r,
        triggerEl: s,
        thumbEl: a,
        thumbElSrc: c,
        thumbSrc: c,
      };
      for (const u in n) {
        let f = n[u] + "";
        (f = f !== "false" && (f === "true" || f)), (d[u] = f);
      }
      i.push(d);
    }
    return new R(i, t);
  }
  static getInstance(e) {
    return e
      ? Me.get(e)
      : Array.from(Me.values())
          .reverse()
          .find((t) => !t.isClosing() && t) || null;
  }
  static getSlide() {
    var e;
    return (
      ((e = R.getInstance()) === null || e === void 0
        ? void 0
        : e.getSlide()) || null
    );
  }
  static show(e = [], t = {}) {
    return new R(e, t);
  }
  static next() {
    const e = R.getInstance();
    e && e.next();
  }
  static prev() {
    const e = R.getInstance();
    e && e.prev();
  }
  static close(e = !0, ...t) {
    if (e) for (const i of Me.values()) i.close(...t);
    else {
      const i = R.getInstance();
      i && i.close(...t);
    }
  }
}
Object.defineProperty(R, "version", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: "5.0.36",
}),
  Object.defineProperty(R, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Lt,
  }),
  Object.defineProperty(R, "Plugins", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Pn,
  }),
  Object.defineProperty(R, "openers", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: new Map(),
  });
document.addEventListener("DOMContentLoaded", () => {
  new N(".js-presentationSlider", {
    modules: [Oe],
    speed: 700,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: ".js-presentationSliderNext",
      prevEl: ".js-presentationSliderPrev",
    },
  }),
    new N(".js-presentationSliderRow", {
      speed: 700,
      slidesPerView: "auto",
      spaceBetween: 25,
    }),
    new N(".js-lookSlider", {
      modules: [Oe],
      speed: 700,
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: ".js-lookSliderNext",
        prevEl: ".js-lookSliderPrev",
      },
    }),
    new N(".js-audioScroll", {
      modules: [lt, ct, at],
      slidesPerView: "auto",
      direction: "vertical",
      mousewheel: !0,
      freeMode: !0,
      scrollbar: { el: ".js-audioScrollBar" },
    }),
    new N(".js-audioArea", {
      modules: [lt, ct, at],
      slidesPerView: "auto",
      direction: "vertical",
      mousewheel: !0,
      freeMode: !0,
      scrollbar: { el: ".js-audioAreaScrollBar" },
    }),
    new N(".js-photoAlbumsGallery", {
      modules: [lt, ct, at],
      slidesPerView: "auto",
      direction: "vertical",
      mousewheel: !0,
      freeMode: !0,
      scrollbar: { el: ".js-photoAlbumsGalleryScrollBar" },
      breakpoints: {
        320: { direction: "horizontal" },
        1020: { direction: "vertical" },
      },
    }),
    new N(".js-readSlider", {
      modules: [Oe],
      speed: 700,
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: ".js-readSliderNext",
        prevEl: ".js-readSliderPrev",
      },
    }),
    new N(".js-booksSlider", {
      modules: [Oe],
      speed: 700,
      slidesPerView: "auto",
      spaceBetween: 25,
      navigation: {
        nextEl: ".js-booksSliderNext",
        prevEl: ".js-booksSliderPrev",
      },
    });
  const o = new N(".js-photoAlbumsSlider", {
    modules: [Oe],
    speed: 700,
    slidesPerView: 1,
    spaceBetween: 25,
    navigation: {
      nextEl: ".js-photoAlbumsSliderNext",
      prevEl: ".js-photoAlbumsSliderPrev",
    },
    on: {
      init: (e) => {
        const t = e.el
          .closest(".photo-albums")
          .querySelector(".js-galleryDescription");
        t.textContent = e.slides[e.activeIndex].querySelector(
          ".photo-albums-slider__wrap-img"
        ).dataset.description;
      },
      activeIndexChange: (e) => {
        const t = e.el
          .closest(".photo-albums")
          .querySelector(".js-galleryDescription");
        t.textContent = e.slides[e.activeIndex].querySelector(
          ".photo-albums-slider__wrap-img"
        ).dataset.description;
      },
    },
  });
  if (document.querySelector(".js-cardVideo")) {
    const e = document.querySelectorAll(".js-buttonPlay"),
      t = document.querySelectorAll(".js-video");
    e.forEach((i) => {
      i.addEventListener("click", (s) => {
        const n = s.target,
          r = n.closest(".js-cardVideo").querySelector(".js-video");
        e.forEach((a) => {
          a.classList.remove("is-hide");
        }),
          t.forEach((a) => {
            a.pause(), (a.muted = !0), (a.currentTime = 0);
          }),
          n.classList.add("is-hide"),
          r.play(),
          (r.muted = !1);
      });
    });
  }
  if (document.querySelector(".js-blockAudio")) {
    const e = document.querySelectorAll(".js-blockAudio"),
      t = document.querySelectorAll(".js-blockAudioAccordion"),
      i = document
        .querySelector(".js-blockAudio.is-open")
        .querySelector(".js-blockAudioAccordion"),
      s = i.scrollHeight;
    (i.style.maxHeight = `${s}px`),
      e.forEach((n) => {
        n.addEventListener("click", (r) => {
          const a = r.target,
            l = a.closest(".js-blockAudio"),
            c = l.querySelector(".js-blockAudioAccordion"),
            d = c.scrollHeight;
          a.classList.contains("js-blockAudioButton") &&
            (l.classList.contains("is-open")
              ? ((c.style.maxHeight = null), l.classList.remove("is-open"))
              : (t.forEach((u) => {
                  u.style.maxHeight = null;
                }),
                e.forEach((u) => {
                  u.classList.remove("is-open");
                }),
                l.classList.add("is-open"),
                (c.style.maxHeight = `${d}px`)));
        });
      });
  }
  R.bind('[data-fancybox="gallery"]', {
    startIndex: o.activeIndex,
    on: {
      close: (e, t) => {
        o.slideTo(e.getSlide().index);
      },
    },
  });

  if (document.querySelector('video')) {
    document.querySelectorAll('video').forEach(elem => {
      elem.addEventListener('play', event => {

        document.querySelectorAll('audio').forEach(el => {
          if(!el.classList.contains('is-pause')) {
            el.classList.add('is-pause')
          }
          el.pause();
          el.currentTime = 0;
        })

      });
    })
  }


  if (document.querySelector('audio')) {
    document.querySelectorAll('audio').forEach(elem => {
      elem.addEventListener('play', event => {

        document.querySelectorAll('audio').forEach(el => {
          if(!el.classList.contains('is-pause')) {
            el.classList.add('is-pause')
          }
        })

        event.target.classList.remove('is-pause')

        document.querySelectorAll('audio.is-pause').forEach(el => {
          el.pause();
          el.currentTime = 0;
        })

        document.querySelectorAll('.js-video').forEach(el => {
          el.pause();
          el.currentTime = 0;
        })        

      });
    })
  }
});