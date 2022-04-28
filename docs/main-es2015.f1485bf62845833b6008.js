(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    0: function (t, e, n) {
      t.exports = n("zUnb");
    },
    zUnb: function (t, e, n) {
      "use strict";
      function i(t) {
        return "function" == typeof t;
      }
      n.r(e);
      let r = !1;
      const o = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const t = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                t.stack
            );
          } else
            r &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          r = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return r;
        },
      };
      function a(t) {
        setTimeout(() => {
          throw t;
        }, 0);
      }
      const s = {
          closed: !0,
          next(t) {},
          error(t) {
            if (o.useDeprecatedSynchronousErrorHandling) throw t;
            a(t);
          },
          complete() {},
        },
        l = (() =>
          Array.isArray || ((t) => t && "number" == typeof t.length))();
      function c(t) {
        return null !== t && "object" == typeof t;
      }
      const u = (() => {
        function t(t) {
          return (
            Error.call(this),
            (this.message = t
              ? `${t.length} errors occurred during unsubscription:\n${t
                  .map((t, e) => `${e + 1}) ${t.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = t),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      let h = (() => {
        class t {
          constructor(t) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              t && (this._unsubscribe = t);
          }
          unsubscribe() {
            let e;
            if (this.closed) return;
            let {
              _parentOrParents: n,
              _unsubscribe: r,
              _subscriptions: o,
            } = this;
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              n instanceof t)
            )
              n.remove(this);
            else if (null !== n)
              for (let t = 0; t < n.length; ++t) n[t].remove(this);
            if (i(r))
              try {
                r.call(this);
              } catch (a) {
                e = a instanceof u ? d(a.errors) : [a];
              }
            if (l(o)) {
              let t = -1,
                n = o.length;
              for (; ++t < n; ) {
                const n = o[t];
                if (c(n))
                  try {
                    n.unsubscribe();
                  } catch (a) {
                    (e = e || []),
                      a instanceof u ? (e = e.concat(d(a.errors))) : e.push(a);
                  }
              }
            }
            if (e) throw new u(e);
          }
          add(e) {
            let n = e;
            if (!e) return t.EMPTY;
            switch (typeof e) {
              case "function":
                n = new t(e);
              case "object":
                if (
                  n === this ||
                  n.closed ||
                  "function" != typeof n.unsubscribe
                )
                  return n;
                if (this.closed) return n.unsubscribe(), n;
                if (!(n instanceof t)) {
                  const e = n;
                  (n = new t()), (n._subscriptions = [e]);
                }
                break;
              default:
                throw new Error(
                  "unrecognized teardown " + e + " added to Subscription."
                );
            }
            let { _parentOrParents: i } = n;
            if (null === i) n._parentOrParents = this;
            else if (i instanceof t) {
              if (i === this) return n;
              n._parentOrParents = [i, this];
            } else {
              if (-1 !== i.indexOf(this)) return n;
              i.push(this);
            }
            const r = this._subscriptions;
            return null === r ? (this._subscriptions = [n]) : r.push(n), n;
          }
          remove(t) {
            const e = this._subscriptions;
            if (e) {
              const n = e.indexOf(t);
              -1 !== n && e.splice(n, 1);
            }
          }
        }
        return (
          (t.EMPTY = (function (t) {
            return (t.closed = !0), t;
          })(new t())),
          t
        );
      })();
      function d(t) {
        return t.reduce((t, e) => t.concat(e instanceof u ? e.errors : e), []);
      }
      const p = (() =>
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random())();
      class f extends h {
        constructor(t, e, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = s;
              break;
            case 1:
              if (!t) {
                this.destination = s;
                break;
              }
              if ("object" == typeof t) {
                t instanceof f
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                    (this.destination = t),
                    t.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new g(this, t)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new g(this, t, e, n));
          }
        }
        [p]() {
          return this;
        }
        static create(t, e, n) {
          const i = new f(t, e, n);
          return (i.syncErrorThrowable = !1), i;
        }
        next(t) {
          this.isStopped || this._next(t);
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: t } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          );
        }
      }
      class g extends f {
        constructor(t, e, n, r) {
          let o;
          super(), (this._parentSubscriber = t);
          let a = this;
          i(e)
            ? (o = e)
            : e &&
              ((o = e.next),
              (n = e.error),
              (r = e.complete),
              e !== s &&
                ((a = Object.create(e)),
                i(a.unsubscribe) && this.add(a.unsubscribe.bind(a)),
                (a.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = a),
            (this._next = o),
            (this._error = n),
            (this._complete = r);
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: e } = this;
            o.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this,
              { useDeprecatedSynchronousErrorHandling: n } = o;
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (e.syncErrorThrowable)
              n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : a(t),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw t;
              a(t);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this;
            if (this._complete) {
              const e = () => this._complete.call(this._context);
              o.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e);
          } catch (n) {
            if ((this.unsubscribe(), o.useDeprecatedSynchronousErrorHandling))
              throw n;
            a(n);
          }
        }
        __tryOrSetError(t, e, n) {
          if (!o.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            e.call(this._context, n);
          } catch (i) {
            return o.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = i), (t.syncErrorThrown = !0), !0)
              : (a(i), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: t } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            t.unsubscribe();
        }
      }
      const m = (() =>
        ("function" == typeof Symbol && Symbol.observable) || "@@observable")();
      function b(t) {
        return t;
      }
      function _(...t) {
        return y(t);
      }
      function y(t) {
        return 0 === t.length
          ? b
          : 1 === t.length
          ? t[0]
          : function (e) {
              return t.reduce((t, e) => e(t), e);
            };
      }
      let w = (() => {
        class t {
          constructor(t) {
            (this._isScalar = !1), t && (this._subscribe = t);
          }
          lift(e) {
            const n = new t();
            return (n.source = this), (n.operator = e), n;
          }
          subscribe(t, e, n) {
            const { operator: i } = this,
              r = (function (t, e, n) {
                if (t) {
                  if (t instanceof f) return t;
                  if (t[p]) return t[p]();
                }
                return t || e || n ? new f(t, e, n) : new f(s);
              })(t, e, n);
            if (
              (r.add(
                i
                  ? i.call(r, this.source)
                  : this.source ||
                    (o.useDeprecatedSynchronousErrorHandling &&
                      !r.syncErrorThrowable)
                  ? this._subscribe(r)
                  : this._trySubscribe(r)
              ),
              o.useDeprecatedSynchronousErrorHandling &&
                r.syncErrorThrowable &&
                ((r.syncErrorThrowable = !1), r.syncErrorThrown))
            )
              throw r.syncErrorValue;
            return r;
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              o.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: i } = t;
                    if (e || i) return !1;
                    t = n && n instanceof f ? n : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }
          forEach(t, e) {
            return new (e = C(e))((e, n) => {
              let i;
              i = this.subscribe(
                (e) => {
                  try {
                    t(e);
                  } catch (r) {
                    n(r), i && i.unsubscribe();
                  }
                },
                n,
                e
              );
            });
          }
          _subscribe(t) {
            const { source: e } = this;
            return e && e.subscribe(t);
          }
          [m]() {
            return this;
          }
          pipe(...t) {
            return 0 === t.length ? this : y(t)(this);
          }
          toPromise(t) {
            return new (t = C(t))((t, e) => {
              let n;
              this.subscribe(
                (t) => (n = t),
                (t) => e(t),
                () => t(n)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function C(t) {
        if ((t || (t = o.Promise || Promise), !t))
          throw new Error("no Promise impl found");
        return t;
      }
      const v = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class x extends h {
        constructor(t, e) {
          super(),
            (this.subject = t),
            (this.subscriber = e),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const t = this.subject,
            e = t.observers;
          if (
            ((this.subject = null),
            !e || 0 === e.length || t.isStopped || t.closed)
          )
            return;
          const n = e.indexOf(this.subscriber);
          -1 !== n && e.splice(n, 1);
        }
      }
      class O extends f {
        constructor(t) {
          super(t), (this.destination = t);
        }
      }
      let k = (() => {
        class t extends w {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [p]() {
            return new O(this);
          }
          lift(t) {
            const e = new P(this, this);
            return (e.operator = t), e;
          }
          next(t) {
            if (this.closed) throw new v();
            if (!this.isStopped) {
              const { observers: e } = this,
                n = e.length,
                i = e.slice();
              for (let r = 0; r < n; r++) i[r].next(t);
            }
          }
          error(t) {
            if (this.closed) throw new v();
            (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
            const { observers: e } = this,
              n = e.length,
              i = e.slice();
            for (let r = 0; r < n; r++) i[r].error(t);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new v();
            this.isStopped = !0;
            const { observers: t } = this,
              e = t.length,
              n = t.slice();
            for (let i = 0; i < e; i++) n[i].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(t) {
            if (this.closed) throw new v();
            return super._trySubscribe(t);
          }
          _subscribe(t) {
            if (this.closed) throw new v();
            return this.hasError
              ? (t.error(this.thrownError), h.EMPTY)
              : this.isStopped
              ? (t.complete(), h.EMPTY)
              : (this.observers.push(t), new x(this, t));
          }
          asObservable() {
            const t = new w();
            return (t.source = this), t;
          }
        }
        return (t.create = (t, e) => new P(t, e)), t;
      })();
      class P extends k {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          const { destination: e } = this;
          e && e.next && e.next(t);
        }
        error(t) {
          const { destination: e } = this;
          e && e.error && this.destination.error(t);
        }
        complete() {
          const { destination: t } = this;
          t && t.complete && this.destination.complete();
        }
        _subscribe(t) {
          const { source: e } = this;
          return e ? this.source.subscribe(t) : h.EMPTY;
        }
      }
      function M(t) {
        return t && "function" == typeof t.schedule;
      }
      class S extends f {
        constructor(t, e, n) {
          super(),
            (this.parent = t),
            (this.outerValue = e),
            (this.outerIndex = n),
            (this.index = 0);
        }
        _next(t) {
          this.parent.notifyNext(
            this.outerValue,
            t,
            this.outerIndex,
            this.index++,
            this
          );
        }
        _error(t) {
          this.parent.notifyError(t, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      const E = (t) => (e) => {
        for (let n = 0, i = t.length; n < i && !e.closed; n++) e.next(t[n]);
        e.complete();
      };
      function T() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      const A = T(),
        I = (t) => t && "number" == typeof t.length && "function" != typeof t;
      function R(t) {
        return (
          !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        );
      }
      const N = (t) => {
        if (t && "function" == typeof t[m])
          return (
            (i = t),
            (t) => {
              const e = i[m]();
              if ("function" != typeof e.subscribe)
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              return e.subscribe(t);
            }
          );
        if (I(t)) return E(t);
        if (R(t))
          return (
            (n = t),
            (t) => (
              n
                .then(
                  (e) => {
                    t.closed || (t.next(e), t.complete());
                  },
                  (e) => t.error(e)
                )
                .then(null, a),
              t
            )
          );
        if (t && "function" == typeof t[A])
          return (
            (e = t),
            (t) => {
              const n = e[A]();
              for (;;) {
                const e = n.next();
                if (e.done) {
                  t.complete();
                  break;
                }
                if ((t.next(e.value), t.closed)) break;
              }
              return (
                "function" == typeof n.return &&
                  t.add(() => {
                    n.return && n.return();
                  }),
                t
              );
            }
          );
        {
          const e = c(t) ? "an invalid object" : `'${t}'`;
          throw new TypeError(
            `You provided ${e} where a stream was expected.` +
              " You can provide an Observable, Promise, Array, or Iterable."
          );
        }
        var e, n, i;
      };
      function D(t, e, n, i, r = new S(t, n, i)) {
        if (!r.closed) return e instanceof w ? e.subscribe(r) : N(e)(r);
      }
      class V extends f {
        notifyNext(t, e, n, i, r) {
          this.destination.next(e);
        }
        notifyError(t, e) {
          this.destination.error(t);
        }
        notifyComplete(t) {
          this.destination.complete();
        }
      }
      function j(t, e) {
        return function (n) {
          if ("function" != typeof t)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return n.lift(new z(t, e));
        };
      }
      class z {
        constructor(t, e) {
          (this.project = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new U(t, this.project, this.thisArg));
        }
      }
      class U extends f {
        constructor(t, e, n) {
          super(t),
            (this.project = e),
            (this.count = 0),
            (this.thisArg = n || this);
        }
        _next(t) {
          let e;
          try {
            e = this.project.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      function F(t, e) {
        return new w((n) => {
          const i = new h();
          let r = 0;
          return (
            i.add(
              e.schedule(function () {
                r !== t.length
                  ? (n.next(t[r++]), n.closed || i.add(this.schedule()))
                  : n.complete();
              })
            ),
            i
          );
        });
      }
      function L(t, e) {
        return e
          ? (function (t, e) {
              if (null != t) {
                if (
                  (function (t) {
                    return t && "function" == typeof t[m];
                  })(t)
                )
                  return (function (t, e) {
                    return new w((n) => {
                      const i = new h();
                      return (
                        i.add(
                          e.schedule(() => {
                            const r = t[m]();
                            i.add(
                              r.subscribe({
                                next(t) {
                                  i.add(e.schedule(() => n.next(t)));
                                },
                                error(t) {
                                  i.add(e.schedule(() => n.error(t)));
                                },
                                complete() {
                                  i.add(e.schedule(() => n.complete()));
                                },
                              })
                            );
                          })
                        ),
                        i
                      );
                    });
                  })(t, e);
                if (R(t))
                  return (function (t, e) {
                    return new w((n) => {
                      const i = new h();
                      return (
                        i.add(
                          e.schedule(() =>
                            t.then(
                              (t) => {
                                i.add(
                                  e.schedule(() => {
                                    n.next(t),
                                      i.add(e.schedule(() => n.complete()));
                                  })
                                );
                              },
                              (t) => {
                                i.add(e.schedule(() => n.error(t)));
                              }
                            )
                          )
                        ),
                        i
                      );
                    });
                  })(t, e);
                if (I(t)) return F(t, e);
                if (
                  (function (t) {
                    return t && "function" == typeof t[A];
                  })(t) ||
                  "string" == typeof t
                )
                  return (function (t, e) {
                    if (!t) throw new Error("Iterable cannot be null");
                    return new w((n) => {
                      const i = new h();
                      let r;
                      return (
                        i.add(() => {
                          r && "function" == typeof r.return && r.return();
                        }),
                        i.add(
                          e.schedule(() => {
                            (r = t[A]()),
                              i.add(
                                e.schedule(function () {
                                  if (n.closed) return;
                                  let t, e;
                                  try {
                                    const n = r.next();
                                    (t = n.value), (e = n.done);
                                  } catch (i) {
                                    return void n.error(i);
                                  }
                                  e
                                    ? n.complete()
                                    : (n.next(t), this.schedule());
                                })
                              );
                          })
                        ),
                        i
                      );
                    });
                  })(t, e);
              }
              throw new TypeError(
                ((null !== t && typeof t) || t) + " is not observable"
              );
            })(t, e)
          : t instanceof w
          ? t
          : new w(N(t));
      }
      function H(t, e, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof e
          ? (i) =>
              i.pipe(
                H((n, i) => L(t(n, i)).pipe(j((t, r) => e(n, t, i, r))), n)
              )
          : ("number" == typeof e && (n = e), (e) => e.lift(new q(t, n)));
      }
      class q {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          (this.project = t), (this.concurrent = e);
        }
        call(t, e) {
          return e.subscribe(new $(t, this.project, this.concurrent));
        }
      }
      class $ extends V {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = e),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(t) {
          this.active < this.concurrent
            ? this._tryNext(t)
            : this.buffer.push(t);
        }
        _tryNext(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (i) {
            return void this.destination.error(i);
          }
          this.active++, this._innerSub(e, t, n);
        }
        _innerSub(t, e, n) {
          const i = new S(this, e, n),
            r = this.destination;
          r.add(i);
          const o = D(this, t, void 0, void 0, i);
          o !== i && r.add(o);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(t, e, n, i, r) {
          this.destination.next(e);
        }
        notifyComplete(t) {
          const e = this.buffer;
          this.remove(t),
            this.active--,
            e.length > 0
              ? this._next(e.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function Y(t = Number.POSITIVE_INFINITY) {
        return H(b, t);
      }
      function B(t, e) {
        return e ? F(t, e) : new w(E(t));
      }
      function G() {
        return function (t) {
          return t.lift(new X(t));
        };
      }
      class X {
        constructor(t) {
          this.connectable = t;
        }
        call(t, e) {
          const { connectable: n } = this;
          n._refCount++;
          const i = new W(t, n),
            r = e.subscribe(i);
          return i.closed || (i.connection = n.connect()), r;
        }
      }
      class W extends f {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _unsubscribe() {
          const { connectable: t } = this;
          if (!t) return void (this.connection = null);
          this.connectable = null;
          const e = t._refCount;
          if (e <= 0) return void (this.connection = null);
          if (((t._refCount = e - 1), e > 1))
            return void (this.connection = null);
          const { connection: n } = this,
            i = t._connection;
          (this.connection = null), !i || (n && i !== n) || i.unsubscribe();
        }
      }
      class Z extends w {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (t && !t.isStopped) || (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let t = this._connection;
          return (
            t ||
              ((this._isComplete = !1),
              (t = this._connection = new h()),
              t.add(this.source.subscribe(new J(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = h.EMPTY))),
            t
          );
        }
        refCount() {
          return G()(this);
        }
      }
      const Q = (() => {
        const t = Z.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: t._subscribe },
          _isComplete: { value: t._isComplete, writable: !0 },
          getSubject: { value: t.getSubject },
          connect: { value: t.connect },
          refCount: { value: t.refCount },
        };
      })();
      class J extends O {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _error(t) {
          this._unsubscribe(), super._error(t);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const t = this.connectable;
          if (t) {
            this.connectable = null;
            const e = t._connection;
            (t._refCount = 0),
              (t._subject = null),
              (t._connection = null),
              e && e.unsubscribe();
          }
        }
      }
      function K() {
        return new k();
      }
      function tt(t) {
        return { toString: t }.toString();
      }
      function et(t, e, n) {
        return tt(() => {
          const i = (function (t) {
            return function (...e) {
              if (t) {
                const n = t(...e);
                for (const t in n) this[t] = n[t];
              }
            };
          })(e);
          function r(...t) {
            if (this instanceof r) return i.apply(this, t), this;
            const e = new r(...t);
            return (n.annotation = e), n;
            function n(t, n, i) {
              const r = t.hasOwnProperty("__parameters__")
                ? t.__parameters__
                : Object.defineProperty(t, "__parameters__", { value: [] })
                    .__parameters__;
              for (; r.length <= i; ) r.push(null);
              return (r[i] = r[i] || []).push(e), t;
            }
          }
          return (
            n && (r.prototype = Object.create(n.prototype)),
            (r.prototype.ngMetadataName = t),
            (r.annotationCls = r),
            r
          );
        });
      }
      const nt = et("Inject", (t) => ({ token: t })),
        it = et("Optional"),
        rt = et("Self"),
        ot = et("SkipSelf");
      var at = (function (t) {
        return (
          (t[(t.Default = 0)] = "Default"),
          (t[(t.Host = 1)] = "Host"),
          (t[(t.Self = 2)] = "Self"),
          (t[(t.SkipSelf = 4)] = "SkipSelf"),
          (t[(t.Optional = 8)] = "Optional"),
          t
        );
      })({});
      function st(t) {
        for (let e in t) if (t[e] === st) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function lt(t, e) {
        for (const n in e)
          e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n]);
      }
      function ct(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function ut(t) {
        return {
          factory: t.factory,
          providers: t.providers || [],
          imports: t.imports || [],
        };
      }
      function ht(t) {
        return dt(t, t[ft]) || dt(t, t[bt]);
      }
      function dt(t, e) {
        return e && e.token === t ? e : null;
      }
      function pt(t) {
        return t && (t.hasOwnProperty(gt) || t.hasOwnProperty(_t))
          ? t[gt]
          : null;
      }
      const ft = st({ "\u0275prov": st }),
        gt = st({ "\u0275inj": st }),
        mt = st({ "\u0275provFallback": st }),
        bt = st({ ngInjectableDef: st }),
        _t = st({ ngInjectorDef: st });
      function yt(t) {
        if ("string" == typeof t) return t;
        if (Array.isArray(t)) return "[" + t.map(yt).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return `${t.overriddenName}`;
        if (t.name) return `${t.name}`;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      function wt(t, e) {
        return null == t || "" === t
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? t
          : t + " " + e;
      }
      const Ct = st({ __forward_ref__: st });
      function vt(t) {
        return (
          (t.__forward_ref__ = vt),
          (t.toString = function () {
            return yt(this());
          }),
          t
        );
      }
      function xt(t) {
        return Ot(t) ? t() : t;
      }
      function Ot(t) {
        return (
          "function" == typeof t &&
          t.hasOwnProperty(Ct) &&
          t.__forward_ref__ === vt
        );
      }
      const kt = "undefined" != typeof globalThis && globalThis,
        Pt = "undefined" != typeof window && window,
        Mt =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        St = "undefined" != typeof global && global,
        Et = kt || St || Pt || Mt,
        Tt = st({ "\u0275cmp": st }),
        At = st({ "\u0275dir": st }),
        It = st({ "\u0275pipe": st }),
        Rt = st({ "\u0275mod": st }),
        Nt = st({ "\u0275loc": st }),
        Dt = st({ "\u0275fac": st }),
        Vt = st({ __NG_ELEMENT_ID__: st });
      class jt {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = ct({
                  token: this,
                  providedIn: e.providedIn || "root",
                  factory: e.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const zt = new jt("INJECTOR", -1),
        Ut = {},
        Ft = /\n/gm,
        Lt = st({ provide: String, useValue: st });
      let Ht,
        qt = void 0;
      function $t(t) {
        const e = qt;
        return (qt = t), e;
      }
      function Yt(t) {
        const e = Ht;
        return (Ht = t), e;
      }
      function Bt(t, e = at.Default) {
        if (void 0 === qt)
          throw new Error("inject() must be called from an injection context");
        return null === qt
          ? Xt(t, void 0, e)
          : qt.get(t, e & at.Optional ? null : void 0, e);
      }
      function Gt(t, e = at.Default) {
        return (Ht || Bt)(xt(t), e);
      }
      function Xt(t, e, n) {
        const i = ht(t);
        if (i && "root" == i.providedIn)
          return void 0 === i.value ? (i.value = i.factory()) : i.value;
        if (n & at.Optional) return null;
        if (void 0 !== e) return e;
        throw new Error(`Injector: NOT_FOUND [${yt(t)}]`);
      }
      function Wt(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const i = xt(t[n]);
          if (Array.isArray(i)) {
            if (0 === i.length)
              throw new Error("Arguments array must have arguments.");
            let t = void 0,
              n = at.Default;
            for (let e = 0; e < i.length; e++) {
              const r = i[e];
              r instanceof it || "Optional" === r.ngMetadataName || r === it
                ? (n |= at.Optional)
                : r instanceof ot || "SkipSelf" === r.ngMetadataName || r === ot
                ? (n |= at.SkipSelf)
                : r instanceof rt || "Self" === r.ngMetadataName || r === rt
                ? (n |= at.Self)
                : (t = r instanceof nt || r === nt ? r.token : r);
            }
            e.push(Gt(t, n));
          } else e.push(Gt(i));
        }
        return e;
      }
      class Zt {
        get(t, e = Ut) {
          if (e === Ut) {
            const e = new Error(`NullInjectorError: No provider for ${yt(t)}!`);
            throw ((e.name = "NullInjectorError"), e);
          }
          return e;
        }
      }
      class Qt {}
      class Jt {}
      function Kt(t, e) {
        t.forEach((t) => (Array.isArray(t) ? Kt(t, e) : e(t)));
      }
      function te(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function ee(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      function ne(t, e) {
        const n = [];
        for (let i = 0; i < t; i++) n.push(e);
        return n;
      }
      function ie(t, e, n) {
        let i = oe(t, e);
        return (
          i >= 0
            ? (t[1 | i] = n)
            : ((i = ~i),
              (function (t, e, n, i) {
                let r = t.length;
                if (r == e) t.push(n, i);
                else if (1 === r) t.push(i, t[0]), (t[0] = n);
                else {
                  for (r--, t.push(t[r - 1], t[r]); r > e; )
                    (t[r] = t[r - 2]), r--;
                  (t[e] = n), (t[e + 1] = i);
                }
              })(t, i, e, n)),
          i
        );
      }
      function re(t, e) {
        const n = oe(t, e);
        if (n >= 0) return t[1 | n];
      }
      function oe(t, e) {
        return (function (t, e, n) {
          let i = 0,
            r = t.length >> 1;
          for (; r !== i; ) {
            const n = i + ((r - i) >> 1),
              o = t[n << 1];
            if (e === o) return n << 1;
            o > e ? (r = n) : (i = n + 1);
          }
          return ~(r << 1);
        })(t, e);
      }
      const ae = (function () {
          var t = { OnPush: 0, Default: 1 };
          return (t[t.OnPush] = "OnPush"), (t[t.Default] = "Default"), t;
        })(),
        se = (function () {
          var t = { Emulated: 0, Native: 1, None: 2, ShadowDom: 3 };
          return (
            (t[t.Emulated] = "Emulated"),
            (t[t.Native] = "Native"),
            (t[t.None] = "None"),
            (t[t.ShadowDom] = "ShadowDom"),
            t
          );
        })(),
        le = {},
        ce = [];
      let ue = 0;
      function he(t) {
        return tt(() => {
          const e = t.type,
            n = e.prototype,
            i = {},
            r = {
              type: e,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: i,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onChanges: null,
              onInit: n.ngOnInit || null,
              doCheck: n.ngDoCheck || null,
              afterContentInit: n.ngAfterContentInit || null,
              afterContentChecked: n.ngAfterContentChecked || null,
              afterViewInit: n.ngAfterViewInit || null,
              afterViewChecked: n.ngAfterViewChecked || null,
              onDestroy: n.ngOnDestroy || null,
              onPush: t.changeDetection === ae.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || ce,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || se.Emulated,
              id: "c",
              styles: t.styles || ce,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            o = t.directives,
            a = t.features,
            s = t.pipes;
          return (
            (r.id += ue++),
            (r.inputs = me(t.inputs, i)),
            (r.outputs = me(t.outputs)),
            a && a.forEach((t) => t(r)),
            (r.directiveDefs = o
              ? () => ("function" == typeof o ? o() : o).map(de)
              : null),
            (r.pipeDefs = s
              ? () => ("function" == typeof s ? s() : s).map(pe)
              : null),
            r
          );
        });
      }
      function de(t) {
        return (
          ye(t) ||
          (function (t) {
            return t[At] || null;
          })(t)
        );
      }
      function pe(t) {
        return (function (t) {
          return t[It] || null;
        })(t);
      }
      const fe = {};
      function ge(t) {
        const e = {
          type: t.type,
          bootstrap: t.bootstrap || ce,
          declarations: t.declarations || ce,
          imports: t.imports || ce,
          exports: t.exports || ce,
          transitiveCompileScopes: null,
          schemas: t.schemas || null,
          id: t.id || null,
        };
        return (
          null != t.id &&
            tt(() => {
              fe[t.id] = t.type;
            }),
          e
        );
      }
      function me(t, e) {
        if (null == t) return le;
        const n = {};
        for (const i in t)
          if (t.hasOwnProperty(i)) {
            let r = t[i],
              o = r;
            Array.isArray(r) && ((o = r[1]), (r = r[0])),
              (n[r] = i),
              e && (e[r] = o);
          }
        return n;
      }
      const be = he;
      function _e(t) {
        return {
          type: t.type,
          name: t.name,
          factory: null,
          pure: !1 !== t.pure,
          onDestroy: t.type.prototype.ngOnDestroy || null,
        };
      }
      function ye(t) {
        return t[Tt] || null;
      }
      function we(t, e) {
        return t.hasOwnProperty(Dt) ? t[Dt] : null;
      }
      function Ce(t, e) {
        const n = t[Rt] || null;
        if (!n && !0 === e)
          throw new Error(`Type ${yt(t)} does not have '\u0275mod' property.`);
        return n;
      }
      function ve(t) {
        return Array.isArray(t) && "object" == typeof t[1];
      }
      function xe(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function Oe(t) {
        return 0 != (8 & t.flags);
      }
      function ke(t) {
        return 2 == (2 & t.flags);
      }
      function Pe(t) {
        return 1 == (1 & t.flags);
      }
      function Me(t) {
        return null !== t.template;
      }
      function Se(t) {
        return 0 != (512 & t[2]);
      }
      let Ee = void 0;
      function Te() {
        return void 0 !== Ee
          ? Ee
          : "undefined" != typeof document
          ? document
          : void 0;
      }
      function Ae(t) {
        return !!t.listen;
      }
      const Ie = { createRenderer: (t, e) => Te() };
      function Re(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function Ne(t, e) {
        return Re(e[t + 20]);
      }
      function De(t, e) {
        return Re(e[t.index]);
      }
      function Ve(t, e) {
        return t.data[e + 20];
      }
      function je(t, e) {
        return t[e + 20];
      }
      function ze(t, e) {
        const n = e[t];
        return ve(n) ? n : n[0];
      }
      function Ue(t) {
        const e = (function (t) {
          return t.__ngContext__ || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function Fe(t) {
        return 128 == (128 & t[2]);
      }
      function Le(t, e) {
        return null === t || null == e ? null : t[e];
      }
      function He(t) {
        t[18] = 0;
      }
      function qe(t, e) {
        t[5] += e;
        let n = t,
          i = t[3];
        for (
          ;
          null !== i && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

        )
          (i[5] += e), (n = i), (i = i[3]);
      }
      const $e = {
        lFrame: hn(null),
        bindingsEnabled: !0,
        checkNoChangesMode: !1,
      };
      function Ye() {
        return $e.bindingsEnabled;
      }
      function Be() {
        return $e.lFrame.lView;
      }
      function Ge() {
        return $e.lFrame.tView;
      }
      function Xe(t) {
        $e.lFrame.contextLView = t;
      }
      function We() {
        return $e.lFrame.previousOrParentTNode;
      }
      function Ze(t, e) {
        ($e.lFrame.previousOrParentTNode = t), ($e.lFrame.isParent = e);
      }
      function Qe() {
        return $e.lFrame.isParent;
      }
      function Je() {
        $e.lFrame.isParent = !1;
      }
      function Ke() {
        return $e.checkNoChangesMode;
      }
      function tn(t) {
        $e.checkNoChangesMode = t;
      }
      function en() {
        const t = $e.lFrame;
        let e = t.bindingRootIndex;
        return (
          -1 === e && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e
        );
      }
      function nn() {
        return $e.lFrame.bindingIndex++;
      }
      function rn(t) {
        const e = $e.lFrame,
          n = e.bindingIndex;
        return (e.bindingIndex = e.bindingIndex + t), n;
      }
      function on(t, e) {
        const n = $e.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), an(e);
      }
      function an(t) {
        $e.lFrame.currentDirectiveIndex = t;
      }
      function sn(t) {
        $e.lFrame.currentQueryIndex = t;
      }
      function ln(t, e) {
        const n = un();
        ($e.lFrame = n), (n.previousOrParentTNode = e), (n.lView = t);
      }
      function cn(t, e) {
        const n = un(),
          i = t[1];
        ($e.lFrame = n),
          (n.previousOrParentTNode = e),
          (n.lView = t),
          (n.tView = i),
          (n.contextLView = t),
          (n.bindingIndex = i.bindingStartIndex);
      }
      function un() {
        const t = $e.lFrame,
          e = null === t ? null : t.child;
        return null === e ? hn(t) : e;
      }
      function hn(t) {
        const e = {
          previousOrParentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: 0,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentSanitizer: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
        };
        return null !== t && (t.child = e), e;
      }
      function dn() {
        const t = $e.lFrame;
        return (
          ($e.lFrame = t.parent),
          (t.previousOrParentTNode = null),
          (t.lView = null),
          t
        );
      }
      const pn = dn;
      function fn() {
        const t = dn();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = 0),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.currentSanitizer = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function gn() {
        return $e.lFrame.selectedIndex;
      }
      function mn(t) {
        $e.lFrame.selectedIndex = t;
      }
      function bn() {
        const t = $e.lFrame;
        return Ve(t.tView, t.selectedIndex);
      }
      function _n(t, e) {
        for (let n = e.directiveStart, i = e.directiveEnd; n < i; n++) {
          const e = t.data[n];
          e.afterContentInit &&
            (t.contentHooks || (t.contentHooks = [])).push(
              -n,
              e.afterContentInit
            ),
            e.afterContentChecked &&
              ((t.contentHooks || (t.contentHooks = [])).push(
                n,
                e.afterContentChecked
              ),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(
                n,
                e.afterContentChecked
              )),
            e.afterViewInit &&
              (t.viewHooks || (t.viewHooks = [])).push(-n, e.afterViewInit),
            e.afterViewChecked &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, e.afterViewChecked),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(
                n,
                e.afterViewChecked
              )),
            null != e.onDestroy &&
              (t.destroyHooks || (t.destroyHooks = [])).push(n, e.onDestroy);
        }
      }
      function yn(t, e, n) {
        vn(t, e, 3, n);
      }
      function wn(t, e, n, i) {
        (3 & t[2]) === n && vn(t, e, n, i);
      }
      function Cn(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
      }
      function vn(t, e, n, i) {
        const r = null != i ? i : -1;
        let o = 0;
        for (let a = void 0 !== i ? 65535 & t[18] : 0; a < e.length; a++)
          if ("number" == typeof e[a + 1]) {
            if (((o = e[a]), null != i && o >= i)) break;
          } else
            e[a] < 0 && (t[18] += 65536),
              (o < r || -1 == r) &&
                (xn(t, n, e, a), (t[18] = (4294901760 & t[18]) + a + 2)),
              a++;
      }
      function xn(t, e, n, i) {
        const r = n[i] < 0,
          o = n[i + 1],
          a = t[r ? -n[i] : n[i]];
        r
          ? t[2] >> 11 < t[18] >> 16 &&
            (3 & t[2]) === e &&
            ((t[2] += 2048), o.call(a))
          : o.call(a);
      }
      class On {
        constructor(t, e, n) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = e),
            (this.injectImpl = n);
        }
      }
      function kn(t, e, n) {
        const i = Ae(t);
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const a = n[r++],
              s = n[r++],
              l = n[r++];
            i ? t.setAttribute(e, s, l, a) : e.setAttributeNS(a, s, l);
          } else {
            const a = o,
              s = n[++r];
            Mn(a)
              ? i && t.setProperty(e, a, s)
              : i
              ? t.setAttribute(e, a, s)
              : e.setAttribute(a, s),
              r++;
          }
        }
        return r;
      }
      function Pn(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function Mn(t) {
        return 64 === t.charCodeAt(0);
      }
      function Sn(t, e) {
        if (null === e || 0 === e.length);
        else if (null === t || 0 === t.length) t = e.slice();
        else {
          let n = -1;
          for (let i = 0; i < e.length; i++) {
            const r = e[i];
            "number" == typeof r
              ? (n = r)
              : 0 === n ||
                En(t, n, r, null, -1 === n || 2 === n ? e[++i] : null);
          }
        }
        return t;
      }
      function En(t, e, n, i, r) {
        let o = 0,
          a = t.length;
        if (-1 === e) a = -1;
        else
          for (; o < t.length; ) {
            const n = t[o++];
            if ("number" == typeof n) {
              if (n === e) {
                a = -1;
                break;
              }
              if (n > e) {
                a = o - 1;
                break;
              }
            }
          }
        for (; o < t.length; ) {
          const e = t[o];
          if ("number" == typeof e) break;
          if (e === n) {
            if (null === i) return void (null !== r && (t[o + 1] = r));
            if (i === t[o + 1]) return void (t[o + 2] = r);
          }
          o++, null !== i && o++, null !== r && o++;
        }
        -1 !== a && (t.splice(a, 0, e), (o = a + 1)),
          t.splice(o++, 0, n),
          null !== i && t.splice(o++, 0, i),
          null !== r && t.splice(o++, 0, r);
      }
      function Tn(t) {
        return -1 !== t;
      }
      function An(t) {
        return 32767 & t;
      }
      function In(t) {
        return t >> 16;
      }
      function Rn(t, e) {
        let n = In(t),
          i = e;
        for (; n > 0; ) (i = i[15]), n--;
        return i;
      }
      function Nn(t) {
        return "string" == typeof t ? t : null == t ? "" : "" + t;
      }
      function Dn(t) {
        return "function" == typeof t
          ? t.name || t.toString()
          : "object" == typeof t && null != t && "function" == typeof t.type
          ? t.type.name || t.type.toString()
          : Nn(t);
      }
      const Vn = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(Et))();
      function jn(t) {
        return t instanceof Function ? t() : t;
      }
      let zn = !0;
      function Un(t) {
        const e = zn;
        return (zn = t), e;
      }
      let Fn = 0;
      function Ln(t, e) {
        const n = qn(t, e);
        if (-1 !== n) return n;
        const i = e[1];
        i.firstCreatePass &&
          ((t.injectorIndex = e.length),
          Hn(i.data, t),
          Hn(e, null),
          Hn(i.blueprint, null));
        const r = $n(t, e),
          o = t.injectorIndex;
        if (Tn(r)) {
          const t = An(r),
            n = Rn(r, e),
            i = n[1].data;
          for (let r = 0; r < 8; r++) e[o + r] = n[t + r] | i[t + r];
        }
        return (e[o + 8] = r), o;
      }
      function Hn(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function qn(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null == e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function $n(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex;
        let n = e[6],
          i = 1;
        for (; n && -1 === n.injectorIndex; )
          (n = (e = e[15]) ? e[6] : null), i++;
        return n ? n.injectorIndex | (i << 16) : -1;
      }
      function Yn(t, e, n) {
        !(function (t, e, n) {
          let i = "string" != typeof n ? n[Vt] : n.charCodeAt(0) || 0;
          null == i && (i = n[Vt] = Fn++);
          const r = 255 & i,
            o = 1 << r,
            a = 64 & r,
            s = 32 & r,
            l = e.data;
          128 & r
            ? a
              ? s
                ? (l[t + 7] |= o)
                : (l[t + 6] |= o)
              : s
              ? (l[t + 5] |= o)
              : (l[t + 4] |= o)
            : a
            ? s
              ? (l[t + 3] |= o)
              : (l[t + 2] |= o)
            : s
            ? (l[t + 1] |= o)
            : (l[t] |= o);
        })(t, e, n);
      }
      function Bn(t, e, n, i = at.Default, r) {
        if (null !== t) {
          const r = (function (t) {
            if ("string" == typeof t) return t.charCodeAt(0) || 0;
            const e = t[Vt];
            return "number" == typeof e && e > 0 ? 255 & e : e;
          })(n);
          if ("function" == typeof r) {
            ln(e, t);
            try {
              const t = r();
              if (null != t || i & at.Optional) return t;
              throw new Error(`No provider for ${Dn(n)}!`);
            } finally {
              pn();
            }
          } else if ("number" == typeof r) {
            if (-1 === r) return new Jn(t, e);
            let o = null,
              a = qn(t, e),
              s = -1,
              l = i & at.Host ? e[16][6] : null;
            for (
              (-1 === a || i & at.SkipSelf) &&
              ((s = -1 === a ? $n(t, e) : e[a + 8]),
              Qn(i, !1) ? ((o = e[1]), (a = An(s)), (e = Rn(s, e))) : (a = -1));
              -1 !== a;

            ) {
              s = e[a + 8];
              const t = e[1];
              if (Zn(r, a, t.data)) {
                const t = Xn(a, e, n, o, i, l);
                if (t !== Gn) return t;
              }
              Qn(i, e[1].data[a + 8] === l) && Zn(r, a, e)
                ? ((o = t), (a = An(s)), (e = Rn(s, e)))
                : (a = -1);
            }
          }
        }
        if (
          (i & at.Optional && void 0 === r && (r = null),
          0 == (i & (at.Self | at.Host)))
        ) {
          const t = e[9],
            o = Yt(void 0);
          try {
            return t ? t.get(n, r, i & at.Optional) : Xt(n, r, i & at.Optional);
          } finally {
            Yt(o);
          }
        }
        if (i & at.Optional) return r;
        throw new Error(`NodeInjector: NOT_FOUND [${Dn(n)}]`);
      }
      const Gn = {};
      function Xn(t, e, n, i, r, o) {
        const a = e[1],
          s = a.data[t + 8],
          l = (function (t, e, n, i, r) {
            const o = t.providerIndexes,
              a = e.data,
              s = 65535 & o,
              l = t.directiveStart,
              c = o >> 16,
              u = r ? s + c : t.directiveEnd;
            for (let h = i ? s : s + c; h < u; h++) {
              const t = a[h];
              if ((h < l && n === t) || (h >= l && t.type === n)) return h;
            }
            if (r) {
              const t = a[l];
              if (t && Me(t) && t.type === n) return l;
            }
            return null;
          })(
            s,
            a,
            n,
            null == i ? ke(s) && zn : i != a && 3 === s.type,
            r & at.Host && o === s
          );
        return null !== l ? Wn(e, a, l, s) : Gn;
      }
      function Wn(t, e, n, i) {
        let r = t[n];
        const o = e.data;
        if (r instanceof On) {
          const a = r;
          if (a.resolving) throw new Error(`Circular dep for ${Dn(o[n])}`);
          const s = Un(a.canSeeViewProviders);
          let l;
          (a.resolving = !0), a.injectImpl && (l = Yt(a.injectImpl)), ln(t, i);
          try {
            (r = t[n] = a.factory(void 0, o, t, i)),
              e.firstCreatePass &&
                n >= i.directiveStart &&
                (function (t, e, n) {
                  const { onChanges: i, onInit: r, doCheck: o } = e;
                  i &&
                    ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, i),
                    (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(
                      t,
                      i
                    )),
                    r &&
                      (n.preOrderHooks || (n.preOrderHooks = [])).push(-t, r),
                    o &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, o),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, o));
                })(n, o[n], e);
          } finally {
            a.injectImpl && Yt(l), Un(s), (a.resolving = !1), pn();
          }
        }
        return r;
      }
      function Zn(t, e, n) {
        const i = 64 & t,
          r = 32 & t;
        let o;
        return (
          (o =
            128 & t
              ? i
                ? r
                  ? n[e + 7]
                  : n[e + 6]
                : r
                ? n[e + 5]
                : n[e + 4]
              : i
              ? r
                ? n[e + 3]
                : n[e + 2]
              : r
              ? n[e + 1]
              : n[e]),
          !!(o & (1 << t))
        );
      }
      function Qn(t, e) {
        return !(t & at.Self || (t & at.Host && e));
      }
      class Jn {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e) {
          return Bn(this._tNode, this._lView, t, void 0, e);
        }
      }
      function Kn(t) {
        return tt(() => {
          const e = Object.getPrototypeOf(t.prototype).constructor,
            n =
              e[Dt] ||
              (function t(e) {
                const n = e;
                if (Ot(e))
                  return () => {
                    const e = t(xt(n));
                    return e ? e() : null;
                  };
                let i = we(n);
                if (null === i) {
                  const t = pt(n);
                  i = t && t.factory;
                }
                return i || null;
              })(e);
          return null !== n ? n : (t) => new t();
        });
      }
      function ti(t) {
        return t.ngDebugContext;
      }
      function ei(t) {
        return t.ngOriginalError;
      }
      function ni(t, ...e) {
        t.error(...e);
      }
      class ii {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            i = (function (t) {
              return t.ngErrorLogger || ni;
            })(t);
          i(this._console, "ERROR", t),
            e && i(this._console, "ORIGINAL ERROR", e),
            n && i(this._console, "ERROR CONTEXT", n);
        }
        _findContext(t) {
          return t ? (ti(t) ? ti(t) : this._findContext(ei(t))) : null;
        }
        _findOriginalError(t) {
          let e = ei(t);
          for (; e && ei(e); ) e = ei(e);
          return e;
        }
      }
      class ri {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return (
            `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}` +
            " (see http://g.co/ng/security#xss)"
          );
        }
      }
      function oi(t) {
        return t instanceof ri ? t.changingThisBreaksApplicationSecurity : t;
      }
      function ai(t, e) {
        const n = (function (t) {
          return (t instanceof ri && t.getTypeName()) || null;
        })(t);
        if (null != n && n !== e) {
          if ("ResourceURL" === n && "URL" === e) return !0;
          throw new Error(
            `Required a safe ${e}, got a ${n} (see http://g.co/ng/security#xss)`
          );
        }
        return n === e;
      }
      let si = !0,
        li = !1;
      function ci() {
        return (li = !0), si;
      }
      class ui {
        constructor(t) {
          (this.defaultDoc = t),
            (this.inertDocument = this.defaultDoc.implementation.createHTMLDocument(
              "sanitization-inert"
            ));
          let e = this.inertDocument.body;
          if (null == e) {
            const t = this.inertDocument.createElement("html");
            this.inertDocument.appendChild(t),
              (e = this.inertDocument.createElement("body")),
              t.appendChild(e);
          }
          (e.innerHTML =
            '<svg><g onload="this.parentNode.remove()"></g></svg>'),
            !e.querySelector || e.querySelector("svg")
              ? ((e.innerHTML =
                  '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">'),
                (this.getInertBodyElement =
                  e.querySelector &&
                  e.querySelector("svg img") &&
                  (function () {
                    try {
                      return !!window.DOMParser;
                    } catch (t) {
                      return !1;
                    }
                  })()
                    ? this.getInertBodyElement_DOMParser
                    : this.getInertBodyElement_InertDocument))
              : (this.getInertBodyElement = this.getInertBodyElement_XHR);
        }
        getInertBodyElement_XHR(t) {
          t = "<body><remove></remove>" + t + "</body>";
          try {
            t = encodeURI(t);
          } catch (i) {
            return null;
          }
          const e = new XMLHttpRequest();
          (e.responseType = "document"),
            e.open("GET", "data:text/html;charset=utf-8," + t, !1),
            e.send(void 0);
          const n = e.response.body;
          return n.removeChild(n.firstChild), n;
        }
        getInertBodyElement_DOMParser(t) {
          t = "<body><remove></remove>" + t + "</body>";
          try {
            const e = new window.DOMParser().parseFromString(t, "text/html")
              .body;
            return e.removeChild(e.firstChild), e;
          } catch (e) {
            return null;
          }
        }
        getInertBodyElement_InertDocument(t) {
          const e = this.inertDocument.createElement("template");
          if ("content" in e) return (e.innerHTML = t), e;
          const n = this.inertDocument.createElement("body");
          return (
            (n.innerHTML = t),
            this.defaultDoc.documentMode && this.stripCustomNsAttrs(n),
            n
          );
        }
        stripCustomNsAttrs(t) {
          const e = t.attributes;
          for (let i = e.length - 1; 0 < i; i--) {
            const n = e.item(i).name;
            ("xmlns:ns1" !== n && 0 !== n.indexOf("ns1:")) ||
              t.removeAttribute(n);
          }
          let n = t.firstChild;
          for (; n; )
            n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n),
              (n = n.nextSibling);
        }
      }
      const hi = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        di = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function pi(t) {
        return (t = String(t)).match(hi) || t.match(di)
          ? t
          : (ci() &&
              console.warn(
                `WARNING: sanitizing unsafe URL value ${t} (see http://g.co/ng/security#xss)`
              ),
            "unsafe:" + t);
      }
      function fi(t) {
        const e = {};
        for (const n of t.split(",")) e[n] = !0;
        return e;
      }
      function gi(...t) {
        const e = {};
        for (const n of t)
          for (const t in n) n.hasOwnProperty(t) && (e[t] = !0);
        return e;
      }
      const mi = fi("area,br,col,hr,img,wbr"),
        bi = fi("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        _i = fi("rp,rt"),
        yi = gi(_i, bi),
        wi = gi(
          mi,
          gi(
            bi,
            fi(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          gi(
            _i,
            fi(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          yi
        ),
        Ci = fi("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        vi = fi("srcset"),
        xi = gi(
          Ci,
          vi,
          fi(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          fi(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        Oi = fi("script,style,template");
      class ki {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let e = t.firstChild,
            n = !0;
          for (; e; )
            if (
              (e.nodeType === Node.ELEMENT_NODE
                ? (n = this.startElement(e))
                : e.nodeType === Node.TEXT_NODE
                ? this.chars(e.nodeValue)
                : (this.sanitizedSomething = !0),
              n && e.firstChild)
            )
              e = e.firstChild;
            else
              for (; e; ) {
                e.nodeType === Node.ELEMENT_NODE && this.endElement(e);
                let t = this.checkClobberedElement(e, e.nextSibling);
                if (t) {
                  e = t;
                  break;
                }
                e = this.checkClobberedElement(e, e.parentNode);
              }
          return this.buf.join("");
        }
        startElement(t) {
          const e = t.nodeName.toLowerCase();
          if (!wi.hasOwnProperty(e))
            return (this.sanitizedSomething = !0), !Oi.hasOwnProperty(e);
          this.buf.push("<"), this.buf.push(e);
          const n = t.attributes;
          for (let r = 0; r < n.length; r++) {
            const t = n.item(r),
              e = t.name,
              o = e.toLowerCase();
            if (!xi.hasOwnProperty(o)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let a = t.value;
            Ci[o] && (a = pi(a)),
              vi[o] &&
                ((i = a),
                (a = (i = String(i))
                  .split(",")
                  .map((t) => pi(t.trim()))
                  .join(", "))),
              this.buf.push(" ", e, '="', Si(a), '"');
          }
          var i;
          return this.buf.push(">"), !0;
        }
        endElement(t) {
          const e = t.nodeName.toLowerCase();
          wi.hasOwnProperty(e) &&
            !mi.hasOwnProperty(e) &&
            (this.buf.push("</"), this.buf.push(e), this.buf.push(">"));
        }
        chars(t) {
          this.buf.push(Si(t));
        }
        checkClobberedElement(t, e) {
          if (
            e &&
            (t.compareDocumentPosition(e) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`
            );
          return e;
        }
      }
      const Pi = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        Mi = /([^\#-~ |!])/g;
      function Si(t) {
        return t
          .replace(/&/g, "&amp;")
          .replace(Pi, function (t) {
            return (
              "&#" +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(Mi, function (t) {
            return "&#" + t.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let Ei;
      function Ti(t) {
        return "content" in t &&
          (function (t) {
            return (
              t.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === t.nodeName
            );
          })(t)
          ? t.content
          : null;
      }
      const Ai = (function () {
        var t = {
          NONE: 0,
          HTML: 1,
          STYLE: 2,
          SCRIPT: 3,
          URL: 4,
          RESOURCE_URL: 5,
        };
        return (
          (t[t.NONE] = "NONE"),
          (t[t.HTML] = "HTML"),
          (t[t.STYLE] = "STYLE"),
          (t[t.SCRIPT] = "SCRIPT"),
          (t[t.URL] = "URL"),
          (t[t.RESOURCE_URL] = "RESOURCE_URL"),
          t
        );
      })();
      function Ii(t) {
        const e = Ni();
        return e
          ? e.sanitize(Ai.HTML, t) || ""
          : ai(t, "HTML")
          ? oi(t)
          : (function (t, e) {
              let n = null;
              try {
                Ei = Ei || new ui(t);
                let i = e ? String(e) : "";
                n = Ei.getInertBodyElement(i);
                let r = 5,
                  o = i;
                do {
                  if (0 === r)
                    throw new Error(
                      "Failed to sanitize html because the input is unstable"
                    );
                  r--,
                    (i = o),
                    (o = n.innerHTML),
                    (n = Ei.getInertBodyElement(i));
                } while (i !== o);
                const a = new ki(),
                  s = a.sanitizeChildren(Ti(n) || n);
                return (
                  ci() &&
                    a.sanitizedSomething &&
                    console.warn(
                      "WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss"
                    ),
                  s
                );
              } finally {
                if (n) {
                  const t = Ti(n) || n;
                  for (; t.firstChild; ) t.removeChild(t.firstChild);
                }
              }
            })(Te(), Nn(t));
      }
      function Ri(t) {
        const e = Ni();
        return e
          ? e.sanitize(Ai.URL, t) || ""
          : ai(t, "URL")
          ? oi(t)
          : pi(Nn(t));
      }
      function Ni() {
        const t = Be();
        return t && t[12];
      }
      function Di(t, e) {
        t.__ngContext__ = e;
      }
      function Vi(t) {
        throw new Error(
          `Multiple components match node with tagname ${t.tagName}`
        );
      }
      function ji() {
        throw new Error("Cannot mix multi providers and regular providers");
      }
      function zi(t, e, n) {
        let i = t.length;
        for (;;) {
          const r = t.indexOf(e, n);
          if (-1 === r) return r;
          if (0 === r || t.charCodeAt(r - 1) <= 32) {
            const n = e.length;
            if (r + n === i || t.charCodeAt(r + n) <= 32) return r;
          }
          n = r + 1;
        }
      }
      function Ui(t, e, n) {
        let i = 0;
        for (; i < t.length; ) {
          let r = t[i++];
          if (n && "class" === r) {
            if (((r = t[i]), -1 !== zi(r.toLowerCase(), e, 0))) return !0;
          } else if (1 === r) {
            for (; i < t.length && "string" == typeof (r = t[i++]); )
              if (r.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Fi(t) {
        return 0 === t.type && "ng-template" !== t.tagName;
      }
      function Li(t, e, n) {
        return e === (0 !== t.type || n ? t.tagName : "ng-template");
      }
      function Hi(t, e, n) {
        let i = 4;
        const r = t.attrs || [],
          o = (function (t) {
            for (let e = 0; e < t.length; e++) if (Pn(t[e])) return e;
            return t.length;
          })(r);
        let a = !1;
        for (let s = 0; s < e.length; s++) {
          const l = e[s];
          if ("number" != typeof l) {
            if (!a)
              if (4 & i) {
                if (
                  ((i = 2 | (1 & i)),
                  ("" !== l && !Li(t, l, n)) || ("" === l && 1 === e.length))
                ) {
                  if (qi(i)) return !1;
                  a = !0;
                }
              } else {
                const c = 8 & i ? l : e[++s];
                if (8 & i && null !== t.attrs) {
                  if (!Ui(t.attrs, c, n)) {
                    if (qi(i)) return !1;
                    a = !0;
                  }
                  continue;
                }
                const u = $i(8 & i ? "class" : l, r, Fi(t), n);
                if (-1 === u) {
                  if (qi(i)) return !1;
                  a = !0;
                  continue;
                }
                if ("" !== c) {
                  let t;
                  t = u > o ? "" : r[u + 1].toLowerCase();
                  const e = 8 & i ? t : null;
                  if ((e && -1 !== zi(e, c, 0)) || (2 & i && c !== t)) {
                    if (qi(i)) return !1;
                    a = !0;
                  }
                }
              }
          } else {
            if (!a && !qi(i) && !qi(l)) return !1;
            if (a && qi(l)) continue;
            (a = !1), (i = l | (1 & i));
          }
        }
        return qi(i) || a;
      }
      function qi(t) {
        return 0 == (1 & t);
      }
      function $i(t, e, n, i) {
        if (null === e) return -1;
        let r = 0;
        if (i || !n) {
          let n = !1;
          for (; r < e.length; ) {
            const i = e[r];
            if (i === t) return r;
            if (3 === i || 6 === i) n = !0;
            else {
              if (1 === i || 2 === i) {
                let t = e[++r];
                for (; "string" == typeof t; ) t = e[++r];
                continue;
              }
              if (4 === i) break;
              if (0 === i) {
                r += 4;
                continue;
              }
            }
            r += n ? 1 : 2;
          }
          return -1;
        }
        return (function (t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const i = t[n];
              if ("number" == typeof i) return -1;
              if (i === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function Yi(t, e, n = !1) {
        for (let i = 0; i < e.length; i++) if (Hi(t, e[i], n)) return !0;
        return !1;
      }
      function Bi(t, e) {
        return t ? ":not(" + e.trim() + ")" : e;
      }
      function Gi(t) {
        let e = t[0],
          n = 1,
          i = 2,
          r = "",
          o = !1;
        for (; n < t.length; ) {
          let a = t[n];
          if ("string" == typeof a)
            if (2 & i) {
              const e = t[++n];
              r += "[" + a + (e.length > 0 ? '="' + e + '"' : "") + "]";
            } else 8 & i ? (r += "." + a) : 4 & i && (r += " " + a);
          else
            "" === r || qi(a) || ((e += Bi(o, r)), (r = "")),
              (i = a),
              (o = o || !qi(i));
          n++;
        }
        return "" !== r && (e += Bi(o, r)), e;
      }
      const Xi = {};
      function Wi(t) {
        const e = t[3];
        return xe(e) ? e[3] : e;
      }
      function Zi(t) {
        Qi(Ge(), Be(), gn() + t, Ke());
      }
      function Qi(t, e, n, i) {
        if (!i)
          if (3 == (3 & e[2])) {
            const i = t.preOrderCheckHooks;
            null !== i && yn(e, i, n);
          } else {
            const i = t.preOrderHooks;
            null !== i && wn(e, i, 0, n);
          }
        mn(n);
      }
      function Ji(t, e) {
        return (t << 17) | (e << 2);
      }
      function Ki(t) {
        return (t >> 17) & 32767;
      }
      function tr(t) {
        return 2 | t;
      }
      function er(t) {
        return (131068 & t) >> 2;
      }
      function nr(t, e) {
        return (-131069 & t) | (e << 2);
      }
      function ir(t) {
        return 1 | t;
      }
      function rr(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let i = 0; i < n.length; i += 2) {
            const r = n[i],
              o = n[i + 1];
            if (-1 !== o) {
              const n = t.data[o];
              sn(r), n.contentQueries(2, e[o], o);
            }
          }
      }
      function or(t, e, n) {
        return Ae(e)
          ? e.createElement(t, n)
          : null === n
          ? e.createElement(t)
          : e.createElementNS(n, t);
      }
      function ar(t, e, n, i, r, o, a, s, l, c) {
        const u = e.blueprint.slice();
        return (
          (u[0] = r),
          (u[2] = 140 | i),
          He(u),
          (u[3] = u[15] = t),
          (u[8] = n),
          (u[10] = a || (t && t[10])),
          (u[11] = s || (t && t[11])),
          (u[12] = l || (t && t[12]) || null),
          (u[9] = c || (t && t[9]) || null),
          (u[6] = o),
          (u[16] = 2 == e.type ? t[16] : u),
          u
        );
      }
      function sr(t, e, n, i, r, o) {
        const a = n + 20,
          s =
            t.data[a] ||
            (function (t, e, n, i, r, o) {
              const a = We(),
                s = Qe(),
                l = s ? a : a && a.parent,
                c = (t.data[n] = mr(0, l && l !== e ? l : null, i, n, r, o));
              return (
                null === t.firstChild && (t.firstChild = c),
                a &&
                  (!s || null != a.child || (null === c.parent && 2 !== a.type)
                    ? s || (a.next = c)
                    : (a.child = c)),
                c
              );
            })(t, e, a, i, r, o);
        return Ze(s, !0), s;
      }
      function lr(t, e, n) {
        cn(e, e[6]);
        try {
          const i = t.viewQuery;
          null !== i && Ur(1, i, n);
          const r = t.template;
          null !== r && hr(t, e, r, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && rr(t, e),
            t.staticViewQueries && Ur(2, t.viewQuery, n);
          const o = t.components;
          null !== o &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) Nr(t, e[n]);
            })(e, o);
        } catch (i) {
          throw (t.firstCreatePass && (t.incompleteFirstPass = !0), i);
        } finally {
          (e[2] &= -5), fn();
        }
      }
      function cr(t, e, n, i) {
        const r = e[2];
        if (256 == (256 & r)) return;
        cn(e, e[6]);
        const o = Ke();
        try {
          He(e),
            ($e.lFrame.bindingIndex = t.bindingStartIndex),
            null !== n && hr(t, e, n, 2, i);
          const a = 3 == (3 & r);
          if (!o)
            if (a) {
              const n = t.preOrderCheckHooks;
              null !== n && yn(e, n, null);
            } else {
              const n = t.preOrderHooks;
              null !== n && wn(e, n, 0, null), Cn(e, 0);
            }
          if (
            ((function (t) {
              for (let e = Ar(t); null !== e; e = Ir(e))
                if (0 != (1 & e[2])) {
                  const t = e[9];
                  for (let e = 0; e < t.length; e++) {
                    const n = t[e],
                      i = n[3];
                    0 == (1024 & n[2]) && qe(i, 1), (n[2] |= 1024);
                  }
                }
            })(e),
            (function (t) {
              for (let e = Ar(t); null !== e; e = Ir(e))
                for (let t = 10; t < e.length; t++) {
                  const n = e[t],
                    i = n[1];
                  Fe(n) && cr(i, n, i.template, n[8]);
                }
            })(e),
            null !== t.contentQueries && rr(t, e),
            !o)
          )
            if (a) {
              const n = t.contentCheckHooks;
              null !== n && yn(e, n);
            } else {
              const n = t.contentHooks;
              null !== n && wn(e, n, 1), Cn(e, 1);
            }
          !(function (t, e) {
            try {
              const n = t.expandoInstructions;
              if (null !== n) {
                let i = t.expandoStartIndex,
                  r = -1,
                  o = -1;
                for (let t = 0; t < n.length; t++) {
                  const a = n[t];
                  "number" == typeof a
                    ? a <= 0
                      ? ((o = 0 - a), mn(o), (i += 9 + n[++t]), (r = i))
                      : (i += a)
                    : (null !== a && (on(i, r), a(2, e[r])), r++);
                }
              }
            } finally {
              mn(-1);
            }
          })(t, e);
          const s = t.components;
          null !== s &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) Rr(t, e[n]);
            })(e, s);
          const l = t.viewQuery;
          if ((null !== l && Ur(2, l, i), !o))
            if (a) {
              const n = t.viewCheckHooks;
              null !== n && yn(e, n);
            } else {
              const n = t.viewHooks;
              null !== n && wn(e, n, 2), Cn(e, 2);
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            o || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), qe(e[3], -1));
        } finally {
          fn();
        }
      }
      function ur(t, e, n, i) {
        const r = e[10],
          o = !Ke(),
          a = 4 == (4 & e[2]);
        try {
          o && !a && r.begin && r.begin(), a && lr(t, e, i), cr(t, e, n, i);
        } finally {
          o && !a && r.end && r.end();
        }
      }
      function hr(t, e, n, i, r) {
        const o = gn();
        try {
          mn(-1), 2 & i && e.length > 20 && Qi(t, e, 0, Ke()), n(i, r);
        } finally {
          mn(o);
        }
      }
      function dr(t, e, n) {
        Ye() &&
          ((function (t, e, n, i) {
            const r = n.directiveStart,
              o = n.directiveEnd;
            t.firstCreatePass || Ln(n, e), Di(i, e);
            const a = n.initialInputs;
            for (let s = r; s < o; s++) {
              const i = t.data[s],
                o = Me(i);
              o && Mr(e, n, i);
              const l = Wn(e, t, s, n);
              Di(l, e),
                null !== a && Sr(0, s - r, l, i, 0, a),
                o && (ze(n.index, e)[8] = l);
            }
          })(t, e, n, De(n, e)),
          128 == (128 & n.flags) &&
            (function (t, e, n) {
              const i = n.directiveStart,
                r = n.directiveEnd,
                o = t.expandoInstructions,
                a = t.firstCreatePass,
                s = n.index - 20,
                l = $e.lFrame.currentDirectiveIndex;
              try {
                mn(s);
                for (let n = i; n < r; n++) {
                  const i = t.data[n],
                    r = e[n];
                  an(n),
                    null !== i.hostBindings ||
                    0 !== i.hostVars ||
                    null !== i.hostAttrs
                      ? Cr(i, r)
                      : a && o.push(null);
                }
              } finally {
                mn(-1), an(l);
              }
            })(t, e, n));
      }
      function pr(t, e, n = De) {
        const i = e.localNames;
        if (null !== i) {
          let r = e.index + 1;
          for (let o = 0; o < i.length; o += 2) {
            const a = i[o + 1],
              s = -1 === a ? n(e, t) : t[a];
            t[r++] = s;
          }
        }
      }
      function fr(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = gr(
              1,
              -1,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : e;
      }
      function gr(t, e, n, i, r, o, a, s, l, c) {
        const u = 20 + i,
          h = u + r,
          d = (function (t, e) {
            const n = [];
            for (let i = 0; i < e; i++) n.push(i < t ? null : Xi);
            return n;
          })(u, h);
        return (d[1] = {
          type: t,
          id: e,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: s,
          node: null,
          data: d.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: h,
          expandoInstructions: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof o ? o() : o,
          pipeRegistry: "function" == typeof a ? a() : a,
          firstChild: null,
          schemas: l,
          consts: c,
          incompleteFirstPass: !1,
        });
      }
      function mr(t, e, n, i, r, o) {
        return {
          type: n,
          index: i,
          injectorIndex: e ? e.injectorIndex : -1,
          directiveStart: -1,
          directiveEnd: -1,
          directiveStylingLast: -1,
          propertyBindings: null,
          flags: 0,
          providerIndexes: 0,
          tagName: r,
          attrs: o,
          mergedAttrs: null,
          localNames: null,
          initialInputs: void 0,
          inputs: null,
          outputs: null,
          tViews: null,
          next: null,
          projectionNext: null,
          child: null,
          parent: e,
          projection: null,
          styles: null,
          residualStyles: void 0,
          classes: null,
          residualClasses: void 0,
          classBindings: 0,
          styleBindings: 0,
        };
      }
      function br(t, e, n) {
        for (let i in t)
          if (t.hasOwnProperty(i)) {
            const r = t[i];
            (n = null === n ? {} : n).hasOwnProperty(i)
              ? n[i].push(e, r)
              : (n[i] = [e, r]);
          }
        return n;
      }
      function _r(t, e, n, i) {
        let r = !1;
        if (Ye()) {
          const o = (function (t, e, n) {
              const i = t.directiveRegistry;
              let r = null;
              if (i)
                for (let o = 0; o < i.length; o++) {
                  const a = i[o];
                  Yi(n, a.selectors, !1) &&
                    (r || (r = []),
                    Yn(Ln(n, e), t, a.type),
                    Me(a)
                      ? (2 & n.flags && Vi(n), xr(t, n), r.unshift(a))
                      : r.push(a));
                }
              return r;
            })(t, e, n),
            a = null === i ? null : { "": -1 };
          if (null !== o) {
            let i = 0;
            (r = !0), kr(n, t.data.length, o.length);
            for (let t = 0; t < o.length; t++) {
              const e = o[t];
              e.providersResolver && e.providersResolver(e);
            }
            vr(t, n, o.length);
            let s = !1,
              l = !1;
            for (let r = 0; r < o.length; r++) {
              const c = o[r];
              (n.mergedAttrs = Sn(n.mergedAttrs, c.hostAttrs)),
                Pr(t, e, c),
                Or(t.data.length - 1, c, a),
                null !== c.contentQueries && (n.flags |= 8),
                (null === c.hostBindings &&
                  null === c.hostAttrs &&
                  0 === c.hostVars) ||
                  (n.flags |= 128),
                !s &&
                  (c.onChanges || c.onInit || c.doCheck) &&
                  ((t.preOrderHooks || (t.preOrderHooks = [])).push(
                    n.index - 20
                  ),
                  (s = !0)),
                l ||
                  (!c.onChanges && !c.doCheck) ||
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(
                    n.index - 20
                  ),
                  (l = !0)),
                yr(t, c),
                (i += c.hostVars);
            }
            !(function (t, e) {
              const n = e.directiveEnd,
                i = t.data,
                r = e.attrs,
                o = [];
              let a = null,
                s = null;
              for (let l = e.directiveStart; l < n; l++) {
                const t = i[l],
                  n = t.inputs,
                  c = null === r || Fi(e) ? null : Er(n, r);
                o.push(c), (a = br(n, l, a)), (s = br(t.outputs, l, s));
              }
              null !== a &&
                (a.hasOwnProperty("class") && (e.flags |= 16),
                a.hasOwnProperty("style") && (e.flags |= 32)),
                (e.initialInputs = o),
                (e.inputs = a),
                (e.outputs = s);
            })(t, n),
              wr(t, e, i);
          }
          a &&
            (function (t, e, n) {
              if (e) {
                const i = (t.localNames = []);
                for (let t = 0; t < e.length; t += 2) {
                  const r = n[e[t + 1]];
                  if (null == r)
                    throw new Error(`Export of name '${e[t + 1]}' not found!`);
                  i.push(e[t], r);
                }
              }
            })(n, i, a);
        }
        return (n.mergedAttrs = Sn(n.mergedAttrs, n.attrs)), r;
      }
      function yr(t, e) {
        const n = t.expandoInstructions;
        n.push(e.hostBindings), 0 !== e.hostVars && n.push(e.hostVars);
      }
      function wr(t, e, n) {
        for (let i = 0; i < n; i++)
          e.push(Xi), t.blueprint.push(Xi), t.data.push(null);
      }
      function Cr(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function vr(t, e, n) {
        const i = 20 - e.index,
          r = t.data.length - (65535 & e.providerIndexes);
        (t.expandoInstructions || (t.expandoInstructions = [])).push(i, r, n);
      }
      function xr(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function Or(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let i = 0; i < e.exportAs.length; i++) n[e.exportAs[i]] = t;
          Me(e) && (n[""] = t);
        }
      }
      function kr(t, e, n) {
        (t.flags |= 1),
          (t.directiveStart = e),
          (t.directiveEnd = e + n),
          (t.providerIndexes = e);
      }
      function Pr(t, e, n) {
        t.data.push(n);
        const i = n.factory || (n.factory = we(n.type)),
          r = new On(i, Me(n), null);
        t.blueprint.push(r), e.push(r);
      }
      function Mr(t, e, n) {
        const i = De(e, t),
          r = fr(n),
          o = t[10],
          a = Dr(
            t,
            ar(t, r, null, n.onPush ? 64 : 16, i, e, o, o.createRenderer(i, n))
          );
        t[e.index] = a;
      }
      function Sr(t, e, n, i, r, o) {
        const a = o[e];
        if (null !== a) {
          const t = i.setInput;
          for (let e = 0; e < a.length; ) {
            const r = a[e++],
              o = a[e++],
              s = a[e++];
            null !== t ? i.setInput(n, s, r, o) : (n[o] = s);
          }
        }
      }
      function Er(t, e) {
        let n = null,
          i = 0;
        for (; i < e.length; ) {
          const r = e[i];
          if (0 !== r)
            if (5 !== r) {
              if ("number" == typeof r) break;
              t.hasOwnProperty(r) &&
                (null === n && (n = []), n.push(r, t[r], e[i + 1])),
                (i += 2);
            } else i += 2;
          else i += 4;
        }
        return n;
      }
      function Tr(t, e, n, i) {
        return new Array(t, !0, -2, e, null, 0, i, n, null, null);
      }
      function Ar(t) {
        let e = t[13];
        for (; null !== e && (!xe(e) || e[2] >> 1 != -1); ) e = e[4];
        return e;
      }
      function Ir(t) {
        let e = t[4];
        for (; null !== e && (!xe(e) || e[2] >> 1 != -1); ) e = e[4];
        return e;
      }
      function Rr(t, e) {
        const n = ze(e, t);
        if (Fe(n)) {
          const t = n[1];
          80 & n[2]
            ? cr(t, n, t.template, n[8])
            : n[5] > 0 &&
              (function t(e) {
                for (let i = Ar(e); null !== i; i = Ir(i))
                  for (let e = 10; e < i.length; e++) {
                    const n = i[e];
                    if (1024 & n[2]) {
                      const t = n[1];
                      cr(t, n, t.template, n[8]);
                    } else n[5] > 0 && t(n);
                  }
                const n = e[1].components;
                if (null !== n)
                  for (let i = 0; i < n.length; i++) {
                    const r = ze(n[i], e);
                    Fe(r) && r[5] > 0 && t(r);
                  }
              })(n);
        }
      }
      function Nr(t, e) {
        const n = ze(e, t),
          i = n[1];
        !(function (t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n]);
        })(i, n),
          lr(i, n, n[8]);
      }
      function Dr(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function Vr(t) {
        for (; t; ) {
          t[2] |= 64;
          const e = Wi(t);
          if (Se(t) && !e) return t;
          t = e;
        }
        return null;
      }
      function jr(t, e, n) {
        const i = e[10];
        i.begin && i.begin();
        try {
          cr(t, e, t.template, n);
        } catch (r) {
          throw (Hr(e, r), r);
        } finally {
          i.end && i.end();
        }
      }
      function zr(t) {
        !(function (t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              i = Ue(n),
              r = i[1];
            ur(r, i, r.template, n);
          }
        })(t[8]);
      }
      function Ur(t, e, n) {
        sn(0), e(t, n);
      }
      const Fr = (() => Promise.resolve(null))();
      function Lr(t) {
        return t[7] || (t[7] = []);
      }
      function Hr(t, e) {
        const n = t[9],
          i = n ? n.get(ii, null) : null;
        i && i.handleError(e);
      }
      function qr(t, e, n, i, r) {
        for (let o = 0; o < n.length; ) {
          const a = n[o++],
            s = n[o++],
            l = e[a],
            c = t.data[a];
          null !== c.setInput ? c.setInput(l, r, i, s) : (l[s] = r);
        }
      }
      function $r(t, e) {
        const n = e[3];
        return -1 === t.index ? (xe(n) ? n : null) : n;
      }
      function Yr(t, e) {
        const n = $r(t, e);
        return n ? io(e[11], n[7]) : null;
      }
      function Br(t, e, n, i, r) {
        if (null != i) {
          let o,
            a = !1;
          xe(i) ? (o = i) : ve(i) && ((a = !0), (i = i[0]));
          const s = Re(i);
          0 === t && null !== n
            ? null == r
              ? eo(e, n, s)
              : to(e, n, s, r || null)
            : 1 === t && null !== n
            ? to(e, n, s, r || null)
            : 2 === t
            ? (function (t, e, n) {
                const i = io(t, e);
                i &&
                  (function (t, e, n, i) {
                    Ae(t) ? t.removeChild(e, n, i) : e.removeChild(n);
                  })(t, i, e, n);
              })(e, s, a)
            : 3 === t && e.destroyNode(s),
            null != o &&
              (function (t, e, n, i, r) {
                const o = n[7];
                o !== Re(n) && Br(e, t, i, o, r);
                for (let a = 10; a < n.length; a++) {
                  const r = n[a];
                  lo(r[1], r, t, e, i, o);
                }
              })(e, t, o, n, r);
        }
      }
      function Gr(t, e, n, i) {
        const r = Yr(t.node, e);
        r && lo(t, e, e[11], n ? 1 : 2, r, i);
      }
      function Xr(t, e) {
        const n = t[9],
          i = n.indexOf(e);
        1024 & e[2] && qe(e[3], -1), n.splice(i, 1);
      }
      function Wr(t, e) {
        if (t.length <= 10) return;
        const n = 10 + e,
          i = t[n];
        if (i) {
          const r = i[17];
          null !== r && r !== t && Xr(r, i), e > 0 && (t[n - 1][4] = i[4]);
          const o = ee(t, 10 + e);
          Gr(i[1], i, !1, null);
          const a = o[19];
          null !== a && a.detachView(o[1]),
            (i[3] = null),
            (i[4] = null),
            (i[2] &= -129);
        }
        return i;
      }
      function Zr(t, e) {
        if (!(256 & e[2])) {
          const n = e[11];
          Ae(n) && n.destroyNode && lo(t, e, n, 3, null, null),
            (function (t) {
              let e = t[13];
              if (!e) return Jr(t[1], t);
              for (; e; ) {
                let n = null;
                if (ve(e)) n = e[13];
                else {
                  const t = e[10];
                  t && (n = t);
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; )
                    ve(e) && Jr(e[1], e), (e = Qr(e, t));
                  null === e && (e = t), ve(e) && Jr(e[1], e), (n = e && e[4]);
                }
                e = n;
              }
            })(e);
        }
      }
      function Qr(t, e) {
        let n;
        return ve(t) && (n = t[6]) && 2 === n.type
          ? $r(n, t)
          : t[3] === e
          ? null
          : t[3];
      }
      function Jr(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function (t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let i = 0; i < n.length; i += 2) {
                  const t = e[n[i]];
                  if (!(t instanceof On)) {
                    const e = n[i + 1];
                    if (Array.isArray(e))
                      for (let n = 0; n < e.length; n += 2)
                        e[n + 1].call(t[e[n]]);
                    else e.call(t);
                  }
                }
            })(t, e),
            (function (t, e) {
              const n = t.cleanup;
              if (null !== n) {
                const t = e[7];
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const r = n[i + 1],
                      o = "function" == typeof r ? r(e) : Re(e[r]),
                      a = t[n[i + 2]],
                      s = n[i + 3];
                    "boolean" == typeof s
                      ? o.removeEventListener(n[i], a, s)
                      : s >= 0
                      ? t[s]()
                      : t[-s].unsubscribe(),
                      (i += 2);
                  } else n[i].call(t[n[i + 1]]);
                e[7] = null;
              }
            })(t, e);
          const n = e[6];
          n && 3 === n.type && Ae(e[11]) && e[11].destroy();
          const i = e[17];
          if (null !== i && xe(e[3])) {
            i !== e[3] && Xr(i, e);
            const n = e[19];
            null !== n && n.detachView(t);
          }
        }
      }
      function Kr(t, e, n) {
        let i = e.parent;
        for (; null != i && (4 === i.type || 5 === i.type); )
          i = (e = i).parent;
        if (null == i) {
          const t = n[6];
          return 2 === t.type ? Yr(t, n) : n[0];
        }
        if (e && 5 === e.type && 4 & e.flags) return De(e, n).parentNode;
        if (2 & i.flags) {
          const e = t.data,
            n = e[e[i.index].directiveStart].encapsulation;
          if (n !== se.ShadowDom && n !== se.Native) return null;
        }
        return De(i, n);
      }
      function to(t, e, n, i) {
        Ae(t) ? t.insertBefore(e, n, i) : e.insertBefore(n, i, !0);
      }
      function eo(t, e, n) {
        Ae(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function no(t, e, n, i) {
        null !== i ? to(t, e, n, i) : eo(t, e, n);
      }
      function io(t, e) {
        return Ae(t) ? t.parentNode(e) : e.parentNode;
      }
      function ro(t, e) {
        if (2 === t.type) {
          const n = $r(t, e);
          return null === n ? null : ao(n.indexOf(e, 10) - 10, n);
        }
        return 4 === t.type || 5 === t.type ? De(t, e) : null;
      }
      function oo(t, e, n, i) {
        const r = Kr(t, i, e);
        if (null != r) {
          const t = e[11],
            o = ro(i.parent || e[6], e);
          if (Array.isArray(n))
            for (let e = 0; e < n.length; e++) no(t, r, n[e], o);
          else no(t, r, n, o);
        }
      }
      function ao(t, e) {
        const n = 10 + t + 1;
        if (n < e.length) {
          const t = e[n],
            i = t[1].firstChild;
          if (null !== i)
            return (function t(e, n) {
              if (null !== n) {
                const i = n.type;
                if (3 === i) return De(n, e);
                if (0 === i) return ao(-1, e[n.index]);
                if (4 === i || 5 === i) {
                  const i = n.child;
                  if (null !== i) return t(e, i);
                  {
                    const t = e[n.index];
                    return xe(t) ? ao(-1, t) : Re(t);
                  }
                }
                {
                  const i = e[16],
                    r = i[6],
                    o = Wi(i),
                    a = r.projection[n.projection];
                  return null != a ? t(o, a) : t(e, n.next);
                }
              }
              return null;
            })(t, i);
        }
        return e[7];
      }
      function so(t, e, n, i, r, o, a) {
        for (; null != n; ) {
          const s = i[n.index],
            l = n.type;
          a && 0 === e && (s && Di(Re(s), i), (n.flags |= 4)),
            64 != (64 & n.flags) &&
              (4 === l || 5 === l
                ? (so(t, e, n.child, i, r, o, !1), Br(e, t, r, s, o))
                : 1 === l
                ? co(t, e, i, n, r, o)
                : Br(e, t, r, s, o)),
            (n = a ? n.projectionNext : n.next);
        }
      }
      function lo(t, e, n, i, r, o) {
        so(n, i, t.node.child, e, r, o, !1);
      }
      function co(t, e, n, i, r, o) {
        const a = n[16],
          s = a[6].projection[i.projection];
        if (Array.isArray(s))
          for (let l = 0; l < s.length; l++) Br(e, t, r, s[l], o);
        else so(t, e, s, a[3], r, o, !0);
      }
      function uo(t, e, n) {
        Ae(t) ? t.setAttribute(e, "style", n) : (e.style.cssText = n);
      }
      function ho(t, e, n) {
        Ae(t)
          ? "" === n
            ? t.removeAttribute(e, "class")
            : t.setAttribute(e, "class", n)
          : (e.className = n);
      }
      class po {
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._viewContainerRef = null),
            (this._tViewNode = null);
        }
        get rootNodes() {
          const t = this._lView;
          return null == t[0]
            ? (function t(e, n, i, r, o = !1) {
                for (; null !== i; ) {
                  const a = n[i.index];
                  if ((null !== a && r.push(Re(a)), xe(a)))
                    for (let e = 10; e < a.length; e++) {
                      const n = a[e],
                        i = n[1].firstChild;
                      null !== i && t(n[1], n, i, r);
                    }
                  const s = i.type;
                  if (4 === s || 5 === s) t(e, n, i.child, r);
                  else if (1 === s) {
                    const e = n[16],
                      o = e[6].projection[i.projection];
                    if (Array.isArray(o)) r.push(...o);
                    else {
                      const n = Wi(e);
                      t(n[1], n, o, r, !0);
                    }
                  }
                  i = o ? i.projectionNext : i.next;
                }
                return r;
              })(t[1], t, t[6].child, [])
            : [];
        }
        get context() {
          return this._lView[8];
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._viewContainerRef) {
            const t = this._viewContainerRef.indexOf(this);
            t > -1 && this._viewContainerRef.detach(t),
              (this._viewContainerRef = null);
          }
          Zr(this._lView[1], this._lView);
        }
        onDestroy(t) {
          var e, n, i;
          (e = this._lView[1]),
            (i = t),
            Lr((n = this._lView)).push(i),
            e.firstCreatePass &&
              (function (t) {
                return t.cleanup || (t.cleanup = []);
              })(e).push(n[7].length - 1, null);
        }
        markForCheck() {
          Vr(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          jr(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (t, e, n) {
            tn(!0);
            try {
              jr(t, e, n);
            } finally {
              tn(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef(t) {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._viewContainerRef = t;
        }
        detachFromAppRef() {
          var t;
          (this._appRef = null),
            lo(this._lView[1], (t = this._lView), t[11], 2, null, null);
        }
        attachToAppRef(t) {
          if (this._viewContainerRef)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = t;
        }
      }
      class fo extends po {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          zr(this._view);
        }
        checkNoChanges() {
          !(function (t) {
            tn(!0);
            try {
              zr(t);
            } finally {
              tn(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      let go, mo, bo;
      function _o(t, e, n) {
        return go || (go = class extends t {}), new go(De(e, n));
      }
      function yo(t, e, n, i) {
        return (
          mo ||
            (mo = class extends t {
              constructor(t, e, n) {
                super(),
                  (this._declarationView = t),
                  (this._declarationTContainer = e),
                  (this.elementRef = n);
              }
              createEmbeddedView(t) {
                const e = this._declarationTContainer.tViews,
                  n = ar(this._declarationView, e, t, 16, null, e.node);
                n[17] = this._declarationView[
                  this._declarationTContainer.index
                ];
                const i = this._declarationView[19];
                null !== i && (n[19] = i.createEmbeddedView(e)), lr(e, n, t);
                const r = new po(n);
                return (r._tViewNode = n[6]), r;
              }
            }),
          0 === n.type ? new mo(i, n, _o(e, n, i)) : null
        );
      }
      let wo = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => Co()), t;
      })();
      const Co = function (t = !1) {
          return (function (t, e, n) {
            if (!n && ke(t)) {
              const n = ze(t.index, e);
              return new po(n, n);
            }
            return 3 === t.type || 0 === t.type || 4 === t.type || 5 === t.type
              ? new po(e[16], e)
              : null;
          })(We(), Be(), t);
        },
        vo = new jt("Set Injector scope."),
        xo = {},
        Oo = {},
        ko = [];
      let Po = void 0;
      function Mo() {
        return void 0 === Po && (Po = new Zt()), Po;
      }
      function So(t, e = null, n = null, i) {
        return new Eo(t, n, e || Mo(), i);
      }
      class Eo {
        constructor(t, e, n, i = null) {
          (this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const r = [];
          e && Kt(e, (n) => this.processProvider(n, t, e)),
            Kt([t], (t) => this.processInjectorType(t, [], r)),
            this.records.set(zt, Io(void 0, this));
          const o = this.records.get(vo);
          (this.scope = null != o ? o.value : null),
            (this.source = i || ("object" == typeof t ? null : yt(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(t, e = Ut, n = at.Default) {
          this.assertNotDestroyed();
          const i = $t(this);
          try {
            if (!(n & at.SkipSelf)) {
              let e = this.records.get(t);
              if (void 0 === e) {
                const n =
                  ("function" == typeof (r = t) ||
                    ("object" == typeof r && r instanceof jt)) &&
                  ht(t);
                (e = n && this.injectableDefInScope(n) ? Io(To(t), xo) : null),
                  this.records.set(t, e);
              }
              if (null != e) return this.hydrate(t, e);
            }
            return (n & at.Self ? Mo() : this.parent).get(
              t,
              (e = n & at.Optional && e === Ut ? null : e)
            );
          } catch (o) {
            if ("NullInjectorError" === o.name) {
              if (
                ((o.ngTempTokenPath = o.ngTempTokenPath || []).unshift(yt(t)),
                i)
              )
                throw o;
              return (function (t, e, n, i) {
                const r = t.ngTempTokenPath;
                throw (
                  (e.__source && r.unshift(e.__source),
                  (t.message = (function (t, e, n, i = null) {
                    t =
                      t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1)
                        ? t.substr(2)
                        : t;
                    let r = yt(e);
                    if (Array.isArray(e)) r = e.map(yt).join(" -> ");
                    else if ("object" == typeof e) {
                      let t = [];
                      for (let n in e)
                        if (e.hasOwnProperty(n)) {
                          let i = e[n];
                          t.push(
                            n +
                              ":" +
                              ("string" == typeof i ? JSON.stringify(i) : yt(i))
                          );
                        }
                      r = `{${t.join(", ")}}`;
                    }
                    return `${n}${i ? "(" + i + ")" : ""}[${r}]: ${t.replace(
                      Ft,
                      "\n  "
                    )}`;
                  })("\n" + t.message, r, n, i)),
                  (t.ngTokenPath = r),
                  (t.ngTempTokenPath = null),
                  t)
                );
              })(o, t, "R3InjectorError", this.source);
            }
            throw o;
          } finally {
            $t(i);
          }
          var r;
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((e, n) => t.push(yt(n))),
            `R3Injector[${t.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error("Injector has already been destroyed.");
        }
        processInjectorType(t, e, n) {
          if (!(t = xt(t))) return !1;
          let i = pt(t);
          const r = (null == i && t.ngModule) || void 0,
            o = void 0 === r ? t : r,
            a = -1 !== n.indexOf(o);
          if ((void 0 !== r && (i = pt(r)), null == i)) return !1;
          if (null != i.imports && !a) {
            let t;
            n.push(o);
            try {
              Kt(i.imports, (i) => {
                this.processInjectorType(i, e, n) &&
                  (void 0 === t && (t = []), t.push(i));
              });
            } finally {
            }
            if (void 0 !== t)
              for (let e = 0; e < t.length; e++) {
                const { ngModule: n, providers: i } = t[e];
                Kt(i, (t) => this.processProvider(t, n, i || ko));
              }
          }
          this.injectorDefTypes.add(o), this.records.set(o, Io(i.factory, xo));
          const s = i.providers;
          if (null != s && !a) {
            const e = t;
            Kt(s, (t) => this.processProvider(t, e, s));
          }
          return void 0 !== r && void 0 !== t.providers;
        }
        processProvider(t, e, n) {
          let i = No((t = xt(t))) ? t : xt(t && t.provide);
          const r = (function (t, e, n) {
            return Ro(t) ? Io(void 0, t.useValue) : Io(Ao(t, e, n), xo);
          })(t, e, n);
          if (No(t) || !0 !== t.multi) {
            const t = this.records.get(i);
            t && void 0 !== t.multi && ji();
          } else {
            let e = this.records.get(i);
            e
              ? void 0 === e.multi && ji()
              : ((e = Io(void 0, xo, !0)),
                (e.factory = () => Wt(e.multi)),
                this.records.set(i, e)),
              (i = t),
              e.multi.push(t);
          }
          this.records.set(i, r);
        }
        hydrate(t, e) {
          var n;
          return (
            e.value === Oo
              ? (function (t) {
                  throw new Error(`Cannot instantiate cyclic dependency! ${t}`);
                })(yt(t))
              : e.value === xo && ((e.value = Oo), (e.value = e.factory())),
            "object" == typeof e.value &&
              e.value &&
              null !== (n = e.value) &&
              "object" == typeof n &&
              "function" == typeof n.ngOnDestroy &&
              this.onDestroy.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          return (
            !!t.providedIn &&
            ("string" == typeof t.providedIn
              ? "any" === t.providedIn || t.providedIn === this.scope
              : this.injectorDefTypes.has(t.providedIn))
          );
        }
      }
      function To(t) {
        const e = ht(t),
          n = null !== e ? e.factory : we(t);
        if (null !== n) return n;
        const i = pt(t);
        if (null !== i) return i.factory;
        if (t instanceof jt)
          throw new Error(`Token ${yt(t)} is missing a \u0275prov definition.`);
        if (t instanceof Function)
          return (function (t) {
            const e = t.length;
            if (e > 0) {
              const n = ne(e, "?");
              throw new Error(
                `Can't resolve all parameters for ${yt(t)}: (${n.join(", ")}).`
              );
            }
            const n = (function (t) {
              const e = t && (t[ft] || t[bt] || (t[mt] && t[mt]()));
              if (e) {
                const n = (function (t) {
                  if (t.hasOwnProperty("name")) return t.name;
                  const e = ("" + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\n` +
                      `This will become an error in v10. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new Error("unreachable");
      }
      function Ao(t, e, n) {
        let i = void 0;
        if (No(t)) {
          const e = xt(t);
          return we(e) || To(e);
        }
        if (Ro(t)) i = () => xt(t.useValue);
        else if ((r = t) && r.useFactory)
          i = () => t.useFactory(...Wt(t.deps || []));
        else if (
          (function (t) {
            return !(!t || !t.useExisting);
          })(t)
        )
          i = () => Gt(xt(t.useExisting));
        else {
          const r = xt(t && (t.useClass || t.provide));
          if (
            (r ||
              (function (t, e, n) {
                let i = "";
                throw (
                  (t &&
                    e &&
                    (i = ` - only instances of Provider and Type are allowed, got: [${e
                      .map((t) => (t == n ? "?" + n + "?" : "..."))
                      .join(", ")}]`),
                  new Error(`Invalid provider for the NgModule '${yt(t)}'` + i))
                );
              })(e, n, t),
            !(function (t) {
              return !!t.deps;
            })(t))
          )
            return we(r) || To(r);
          i = () => new r(...Wt(t.deps));
        }
        var r;
        return i;
      }
      function Io(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function Ro(t) {
        return null !== t && "object" == typeof t && Lt in t;
      }
      function No(t) {
        return "function" == typeof t;
      }
      const Do = function (t, e, n) {
        return (function (t, e = null, n = null, i) {
          const r = So(t, e, n, i);
          return r._resolveInjectorDefTypes(), r;
        })({ name: n }, e, t, n);
      };
      let Vo = (() => {
        class t {
          static create(t, e) {
            return Array.isArray(t)
              ? Do(t, e, "")
              : Do(t.providers, t.parent, t.name || "");
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = Ut),
          (t.NULL = new Zt()),
          (t.ɵprov = ct({
            token: t,
            providedIn: "any",
            factory: () => Gt(zt),
          })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      const jo = new jt("AnalyzeForEntryComponents");
      let zo = new Map();
      const Uo = new Set();
      function Fo(t) {
        return "string" == typeof t ? t : t.text();
      }
      function Lo(t, e) {
        let n = t.styles,
          i = t.classes,
          r = 0;
        for (let o = 0; o < e.length; o++) {
          const t = e[o];
          "number" == typeof t
            ? (r = t)
            : 1 == r
            ? (i = wt(i, t))
            : 2 == r && (n = wt(n, t + ": " + e[++o] + ";"));
        }
        null !== n && (t.styles = n), null !== i && (t.classes = i);
      }
      let Ho = null;
      function qo() {
        if (!Ho) {
          const t = Et.Symbol;
          if (t && t.iterator) Ho = t.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const n = t[e];
              "entries" !== n &&
                "size" !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (Ho = n);
            }
          }
        }
        return Ho;
      }
      function $o(t, e) {
        return (
          t === e ||
          ("number" == typeof t && "number" == typeof e && isNaN(t) && isNaN(e))
        );
      }
      class Yo {
        constructor(t) {
          this.wrapped = t;
        }
        static wrap(t) {
          return new Yo(t);
        }
        static unwrap(t) {
          return Yo.isWrapped(t) ? t.wrapped : t;
        }
        static isWrapped(t) {
          return t instanceof Yo;
        }
      }
      function Bo(t) {
        return (
          !!Go(t) && (Array.isArray(t) || (!(t instanceof Map) && qo() in t))
        );
      }
      function Go(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t);
      }
      function Xo(t, e, n) {
        return (t[e] = n);
      }
      function Wo(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function Zo(t, e, n, i) {
        const r = Wo(t, e, n);
        return Wo(t, e + 1, i) || r;
      }
      function Qo(t, e, n, i) {
        const r = Be();
        return (
          Wo(r, nn(), e) &&
            (Ge(),
            (function (t, e, n, i, r, o) {
              const a = De(t, e),
                s = e[11];
              if (null == i)
                Ae(s) ? s.removeAttribute(a, n, o) : a.removeAttribute(n);
              else {
                const e = null == r ? Nn(i) : r(i, t.tagName || "", n);
                Ae(s)
                  ? s.setAttribute(a, n, e, o)
                  : o
                  ? a.setAttributeNS(o, n, e)
                  : a.setAttribute(n, e);
              }
            })(bn(), r, t, e, n, i)),
          Qo
        );
      }
      function Jo(t, e, n, i) {
        return Wo(t, nn(), n) ? e + Nn(n) + i : Xi;
      }
      function Ko(t, e, n, i, r, o, a, s) {
        const l = Be(),
          c = Ge(),
          u = t + 20,
          h = c.firstCreatePass
            ? (function (t, e, n, i, r, o, a, s, l) {
                const c = e.consts,
                  u = sr(e, n[6], t, 0, a || null, Le(c, s));
                _r(e, n, u, Le(c, l)), _n(e, u);
                const h = (u.tViews = gr(
                    2,
                    -1,
                    i,
                    r,
                    o,
                    e.directiveRegistry,
                    e.pipeRegistry,
                    null,
                    e.schemas,
                    c
                  )),
                  d = mr(0, null, 2, -1, null, null);
                return (
                  (d.injectorIndex = u.injectorIndex),
                  (h.node = d),
                  null !== e.queries &&
                    (e.queries.template(e, u),
                    (h.queries = e.queries.embeddedTView(u))),
                  u
                );
              })(t, c, l, e, n, i, r, o, a)
            : c.data[u];
        Ze(h, !1);
        const d = l[11].createComment("");
        oo(c, l, d, h),
          Di(d, l),
          Dr(l, (l[u] = Tr(d, l, d, h))),
          Pe(h) && dr(c, l, h),
          null != a && pr(l, h, s);
      }
      function ta(t) {
        return je($e.lFrame.contextLView, t);
      }
      function ea(t, e = at.Default) {
        const n = Be();
        return null == n ? Gt(t, e) : Bn(We(), n, xt(t), e);
      }
      function na() {
        throw new Error("invalid");
      }
      function ia(t, e, n) {
        const i = Be();
        return (
          Wo(i, nn(), e) &&
            (function (t, e, n, i, r, o, a, s) {
              const l = De(e, n);
              let c,
                u = e.inputs;
              var h;
              null != u && (c = u[i])
                ? (qr(t, n, c, i, r),
                  ke(e) &&
                    (function (t, e) {
                      const n = ze(e, t);
                      16 & n[2] || (n[2] |= 64);
                    })(n, e.index))
                : 3 === e.type &&
                  ((i =
                    "class" === (h = i)
                      ? "className"
                      : "for" === h
                      ? "htmlFor"
                      : "formaction" === h
                      ? "formAction"
                      : "innerHtml" === h
                      ? "innerHTML"
                      : "readonly" === h
                      ? "readOnly"
                      : "tabindex" === h
                      ? "tabIndex"
                      : h),
                  (r = null != a ? a(r, e.tagName || "", i) : r),
                  Ae(o)
                    ? o.setProperty(l, i, r)
                    : Mn(i) ||
                      (l.setProperty ? l.setProperty(i, r) : (l[i] = r)));
            })(Ge(), bn(), i, t, e, i[11], n),
          ia
        );
      }
      function ra(t, e, n, i, r) {
        const o = r ? "class" : "style";
        qr(t, n, e.inputs[o], o, i);
      }
      function oa(t, e, n, i) {
        const r = Be(),
          o = Ge(),
          a = 20 + t,
          s = r[11],
          l = (r[a] = or(e, s, $e.lFrame.currentNamespace)),
          c = o.firstCreatePass
            ? (function (t, e, n, i, r, o, a) {
                const s = e.consts,
                  l = Le(s, o),
                  c = sr(e, n[6], t, 3, r, l);
                return (
                  _r(e, n, c, Le(s, a)),
                  null !== c.mergedAttrs && Lo(c, c.mergedAttrs),
                  null !== e.queries && e.queries.elementStart(e, c),
                  c
                );
              })(t, o, r, 0, e, n, i)
            : o.data[a];
        Ze(c, !0);
        const u = c.mergedAttrs;
        null !== u && kn(s, l, u);
        const h = c.classes;
        null !== h && ho(s, l, h);
        const d = c.styles;
        null !== d && uo(s, l, d),
          oo(o, r, l, c),
          0 === $e.lFrame.elementDepthCount && Di(l, r),
          $e.lFrame.elementDepthCount++,
          Pe(c) &&
            (dr(o, r, c),
            (function (t, e, n) {
              if (Oe(e)) {
                const i = e.directiveEnd;
                for (let r = e.directiveStart; r < i; r++) {
                  const e = t.data[r];
                  e.contentQueries && e.contentQueries(1, n[r], r);
                }
              }
            })(o, c, r)),
          null !== i && pr(r, c);
      }
      function aa() {
        let t = We();
        Qe() ? Je() : ((t = t.parent), Ze(t, !1));
        const e = t;
        $e.lFrame.elementDepthCount--;
        const n = Ge();
        n.firstCreatePass && (_n(n, t), Oe(t) && n.queries.elementEnd(t)),
          null !== e.classes &&
            (function (t) {
              return 0 != (16 & t.flags);
            })(e) &&
            ra(n, e, Be(), e.classes, !0),
          null !== e.styles &&
            (function (t) {
              return 0 != (32 & t.flags);
            })(e) &&
            ra(n, e, Be(), e.styles, !1);
      }
      function sa(t, e, n, i) {
        oa(t, e, n, i), aa();
      }
      function la() {
        return Be();
      }
      function ca(t) {
        return !!t && "function" == typeof t.then;
      }
      function ua(t) {
        return !!t && "function" == typeof t.subscribe;
      }
      function ha(t, e, n = !1, i) {
        const r = Be(),
          o = Ge(),
          a = We();
        return (
          (function (t, e, n, i, r, o, a = !1, s) {
            const l = Pe(i),
              c = t.firstCreatePass && (t.cleanup || (t.cleanup = [])),
              u = Lr(e);
            let h = !0;
            if (3 === i.type) {
              const d = De(i, e),
                p = s ? s(d) : le,
                f = p.target || d,
                g = u.length,
                m = s ? (t) => s(Re(t[i.index])).target : i.index;
              if (Ae(n)) {
                let a = null;
                if (
                  (!s &&
                    l &&
                    (a = (function (t, e, n, i) {
                      const r = t.cleanup;
                      if (null != r)
                        for (let o = 0; o < r.length - 1; o += 2) {
                          const t = r[o];
                          if (t === n && r[o + 1] === i) {
                            const t = e[7],
                              n = r[o + 2];
                            return t.length > n ? t[n] : null;
                          }
                          "string" == typeof t && (o += 2);
                        }
                      return null;
                    })(t, e, r, i.index)),
                  null !== a)
                )
                  ((a.__ngLastListenerFn__ || a).__ngNextListenerFn__ = o),
                    (a.__ngLastListenerFn__ = o),
                    (h = !1);
                else {
                  o = pa(i, e, o, !1);
                  const t = n.listen(p.name || f, r, o);
                  u.push(o, t), c && c.push(r, m, g, g + 1);
                }
              } else
                (o = pa(i, e, o, !0)),
                  f.addEventListener(r, o, a),
                  u.push(o),
                  c && c.push(r, m, g, a);
            }
            const d = i.outputs;
            let p;
            if (h && null !== d && (p = d[r])) {
              const t = p.length;
              if (t)
                for (let n = 0; n < t; n += 2) {
                  const t = e[p[n]][p[n + 1]].subscribe(o),
                    a = u.length;
                  u.push(o, t), c && c.push(r, i.index, a, -(a + 1));
                }
            }
          })(o, r, r[11], a, t, e, n, i),
          ha
        );
      }
      function da(t, e, n) {
        try {
          return !1 !== e(n);
        } catch (i) {
          return Hr(t, i), !1;
        }
      }
      function pa(t, e, n, i) {
        return function r(o) {
          if (o === Function) return n;
          const a = 2 & t.flags ? ze(t.index, e) : e;
          0 == (32 & e[2]) && Vr(a);
          let s = da(e, n, o),
            l = r.__ngNextListenerFn__;
          for (; l; ) (s = da(e, l, o) && s), (l = l.__ngNextListenerFn__);
          return i && !1 === s && (o.preventDefault(), (o.returnValue = !1)), s;
        };
      }
      function fa(t = 1) {
        return (function (t) {
          return ($e.lFrame.contextLView = (function (t, e) {
            for (; t > 0; ) (e = e[15]), t--;
            return e;
          })(t, $e.lFrame.contextLView))[8];
        })(t);
      }
      const ga = [];
      function ma(t, e, n, i, r) {
        const o = t[n + 1],
          a = null === e;
        let s = i ? Ki(o) : er(o),
          l = !1;
        for (; 0 !== s && (!1 === l || a); ) {
          const n = t[s + 1];
          ba(t[s], e) && ((l = !0), (t[s + 1] = i ? ir(n) : tr(n))),
            (s = i ? Ki(n) : er(n));
        }
        l && (t[n + 1] = i ? tr(o) : ir(o));
      }
      function ba(t, e) {
        return (
          null === t ||
          null == e ||
          (Array.isArray(t) ? t[1] : t) === e ||
          (!(!Array.isArray(t) || "string" != typeof e) && oe(t, e) >= 0)
        );
      }
      const _a = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function ya(t) {
        return t.substring(_a.key, _a.keyEnd);
      }
      function wa(t, e) {
        const n = _a.textEnd;
        return n === e
          ? -1
          : ((e = _a.keyEnd = (function (t, e, n) {
              for (; e < n && t.charCodeAt(e) > 32; ) e++;
              return e;
            })(t, (_a.key = e), n)),
            Ca(t, e, n));
      }
      function Ca(t, e, n) {
        for (; e < n && t.charCodeAt(e) <= 32; ) e++;
        return e;
      }
      function va(t, e, n) {
        return ka(t, e, n, !1), va;
      }
      function xa(t, e) {
        return ka(t, e, null, !0), xa;
      }
      function Oa(t, e) {
        for (
          let n = (function (t) {
            return (
              (function (t) {
                (_a.key = 0),
                  (_a.keyEnd = 0),
                  (_a.value = 0),
                  (_a.valueEnd = 0),
                  (_a.textEnd = t.length);
              })(t),
              wa(t, Ca(t, 0, _a.textEnd))
            );
          })(e);
          n >= 0;
          n = wa(e, n)
        )
          ie(t, ya(e), !0);
      }
      function ka(t, e, n, i) {
        const r = Be(),
          o = Ge(),
          a = rn(2);
        if ((o.firstUpdatePass && Sa(o, t, a, i), e !== Xi && Wo(r, a, e))) {
          let s;
          null == n &&
            (s = (function () {
              const t = $e.lFrame;
              return null === t ? null : t.currentSanitizer;
            })()) &&
            (n = s),
            Aa(
              o,
              o.data[gn() + 20],
              r,
              r[11],
              t,
              (r[a + 1] = (function (t, e) {
                return (
                  null == t ||
                    ("function" == typeof e
                      ? (t = e(t))
                      : "string" == typeof e
                      ? (t += e)
                      : "object" == typeof t && (t = yt(oi(t)))),
                  t
                );
              })(e, n)),
              i,
              a
            );
        }
      }
      function Pa(t, e, n, i) {
        const r = Ge(),
          o = rn(2);
        r.firstUpdatePass && Sa(r, null, o, i);
        const a = Be();
        if (n !== Xi && Wo(a, o, n)) {
          const s = r.data[gn() + 20];
          if (Na(s, i) && !Ma(r, o)) {
            let t = i ? s.classes : s.styles;
            null !== t && (n = wt(t, n || "")), ra(r, s, a, n, i);
          } else
            !(function (t, e, n, i, r, o, a, s) {
              r === Xi && (r = ga);
              let l = 0,
                c = 0,
                u = 0 < r.length ? r[0] : null,
                h = 0 < o.length ? o[0] : null;
              for (; null !== u || null !== h; ) {
                const d = l < r.length ? r[l + 1] : void 0,
                  p = c < o.length ? o[c + 1] : void 0;
                let f = null,
                  g = void 0;
                u === h
                  ? ((l += 2), (c += 2), d !== p && ((f = h), (g = p)))
                  : null === h || (null !== u && u < h)
                  ? ((l += 2), (f = u))
                  : ((c += 2), (f = h), (g = p)),
                  null !== f && Aa(t, e, n, i, f, g, a, s),
                  (u = l < r.length ? r[l] : null),
                  (h = c < o.length ? o[c] : null);
              }
            })(
              r,
              s,
              a,
              a[11],
              a[o + 1],
              (a[o + 1] = (function (t, e, n) {
                if (null == n || "" === n) return ga;
                const i = [],
                  r = oi(n);
                if (Array.isArray(r))
                  for (let o = 0; o < r.length; o++) t(i, r[o], !0);
                else if ("object" == typeof r)
                  for (const o in r) r.hasOwnProperty(o) && t(i, o, r[o]);
                else "string" == typeof r && e(i, r);
                return i;
              })(t, e, n)),
              i,
              o
            );
        }
      }
      function Ma(t, e) {
        return e >= t.expandoStartIndex;
      }
      function Sa(t, e, n, i) {
        const r = t.data;
        if (null === r[n + 1]) {
          const o = r[gn() + 20],
            a = Ma(t, n);
          Na(o, i) && null === e && !a && (e = !1),
            (e = (function (t, e, n, i) {
              const r = (function (t) {
                const e = $e.lFrame.currentDirectiveIndex;
                return -1 === e ? null : t[e];
              })(t);
              let o = i ? e.residualClasses : e.residualStyles;
              if (null === r)
                0 === (i ? e.classBindings : e.styleBindings) &&
                  ((n = Ta((n = Ea(null, t, e, n, i)), e.attrs, i)),
                  (o = null));
              else {
                const a = e.directiveStylingLast;
                if (-1 === a || t[a] !== r)
                  if (((n = Ea(r, t, e, n, i)), null === o)) {
                    let n = (function (t, e, n) {
                      const i = n ? e.classBindings : e.styleBindings;
                      if (0 !== er(i)) return t[Ki(i)];
                    })(t, e, i);
                    void 0 !== n &&
                      Array.isArray(n) &&
                      ((n = Ea(null, t, e, n[1], i)),
                      (n = Ta(n, e.attrs, i)),
                      (function (t, e, n, i) {
                        t[Ki(n ? e.classBindings : e.styleBindings)] = i;
                      })(t, e, i, n));
                  } else
                    o = (function (t, e, n) {
                      let i = void 0;
                      const r = e.directiveEnd;
                      for (let o = 1 + e.directiveStylingLast; o < r; o++)
                        i = Ta(i, t[o].hostAttrs, n);
                      return Ta(i, e.attrs, n);
                    })(t, e, i);
              }
              return (
                void 0 !== o &&
                  (i ? (e.residualClasses = o) : (e.residualStyles = o)),
                n
              );
            })(r, o, e, i)),
            (function (t, e, n, i, r, o) {
              let a = o ? e.classBindings : e.styleBindings,
                s = Ki(a),
                l = er(a);
              t[i] = n;
              let c,
                u = !1;
              if (Array.isArray(n)) {
                const t = n;
                (c = t[1]), (null === c || oe(t, c) > 0) && (u = !0);
              } else c = n;
              if (r)
                if (0 !== l) {
                  const e = Ki(t[s + 1]);
                  (t[i + 1] = Ji(e, s)),
                    0 !== e && (t[e + 1] = nr(t[e + 1], i)),
                    (t[s + 1] = (131071 & t[s + 1]) | (i << 17));
                } else
                  (t[i + 1] = Ji(s, 0)),
                    0 !== s && (t[s + 1] = nr(t[s + 1], i)),
                    (s = i);
              else
                (t[i + 1] = Ji(l, 0)),
                  0 === s ? (s = i) : (t[l + 1] = nr(t[l + 1], i)),
                  (l = i);
              u && (t[i + 1] = tr(t[i + 1])),
                ma(t, c, i, !0),
                ma(t, c, i, !1),
                (function (t, e, n, i, r) {
                  const o = r ? t.residualClasses : t.residualStyles;
                  null != o &&
                    "string" == typeof e &&
                    oe(o, e) >= 0 &&
                    (n[i + 1] = ir(n[i + 1]));
                })(e, c, t, i, o),
                (a = Ji(s, l)),
                o ? (e.classBindings = a) : (e.styleBindings = a);
            })(r, o, e, n, a, i);
        }
      }
      function Ea(t, e, n, i, r) {
        let o = null;
        const a = n.directiveEnd;
        let s = n.directiveStylingLast;
        for (
          -1 === s ? (s = n.directiveStart) : s++;
          s < a && ((o = e[s]), (i = Ta(i, o.hostAttrs, r)), o !== t);

        )
          s++;
        return null !== t && (n.directiveStylingLast = s), i;
      }
      function Ta(t, e, n) {
        const i = n ? 1 : 2;
        let r = -1;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const a = e[o];
            "number" == typeof a
              ? (r = a)
              : r === i &&
                (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]),
                ie(t, a, !!n || e[++o]));
          }
        return void 0 === t ? null : t;
      }
      function Aa(t, e, n, i, r, o, a, s) {
        if (3 !== e.type) return;
        const l = t.data,
          c = l[s + 1];
        Ra(1 == (1 & c) ? Ia(l, e, n, r, er(c), a) : void 0) ||
          (Ra(o) ||
            ((function (t) {
              return 2 == (2 & t);
            })(c) &&
              (o = Ia(l, null, n, r, s, a))),
          (function (t, e, n, i, r) {
            const o = Ae(t);
            if (e)
              r
                ? o
                  ? t.addClass(n, i)
                  : n.classList.add(i)
                : o
                ? t.removeClass(n, i)
                : n.classList.remove(i);
            else {
              const e = -1 == i.indexOf("-") ? void 0 : 2;
              null == r
                ? o
                  ? t.removeStyle(n, i, e)
                  : n.style.removeProperty(i)
                : o
                ? t.setStyle(n, i, r, e)
                : n.style.setProperty(i, r);
            }
          })(i, a, Ne(gn(), n), r, o));
      }
      function Ia(t, e, n, i, r, o) {
        const a = null === e;
        let s = void 0;
        for (; r > 0; ) {
          const e = t[r],
            o = Array.isArray(e),
            l = o ? e[1] : e,
            c = null === l;
          let u = n[r + 1];
          u === Xi && (u = c ? ga : void 0);
          let h = c ? re(u, i) : l === i ? u : void 0;
          if ((o && !Ra(h) && (h = re(e, i)), Ra(h) && ((s = h), a))) return s;
          const d = t[r + 1];
          r = a ? Ki(d) : er(d);
        }
        if (null !== e) {
          let t = o ? e.residualClasses : e.residualStyles;
          null != t && (s = re(t, i));
        }
        return s;
      }
      function Ra(t) {
        return void 0 !== t;
      }
      function Na(t, e) {
        return 0 != (t.flags & (e ? 16 : 32));
      }
      function Da(t, e = "") {
        const n = Be(),
          i = Ge(),
          r = t + 20,
          o = i.firstCreatePass ? sr(i, n[6], t, 3, null, null) : i.data[r],
          a = (n[r] = (function (t, e) {
            return Ae(e) ? e.createText(t) : e.createTextNode(t);
          })(e, n[11]));
        oo(i, n, a, o), Ze(o, !1);
      }
      function Va(t) {
        return ja("", t, ""), Va;
      }
      function ja(t, e, n) {
        const i = Be(),
          r = Jo(i, t, e, n);
        return (
          r !== Xi &&
            (function (t, e, n) {
              const i = Ne(e, t),
                r = t[11];
              Ae(r) ? r.setValue(i, n) : (i.textContent = n);
            })(i, gn(), r),
          ja
        );
      }
      function za(t, e) {
        const n = Ue(t)[1],
          i = n.data.length - 1;
        _n(n, { directiveStart: i, directiveEnd: i + 1 });
      }
      function Ua(t) {
        let e = Object.getPrototypeOf(t.type.prototype).constructor,
          n = !0;
        const i = [t];
        for (; e; ) {
          let r = void 0;
          if (Me(t)) r = e.ɵcmp || e.ɵdir;
          else {
            if (e.ɵcmp) throw new Error("Directives cannot inherit Components");
            r = e.ɵdir;
          }
          if (r) {
            if (n) {
              i.push(r);
              const e = t;
              (e.inputs = Fa(t.inputs)),
                (e.declaredInputs = Fa(t.declaredInputs)),
                (e.outputs = Fa(t.outputs));
              const n = r.hostBindings;
              n && qa(t, n);
              const o = r.viewQuery,
                a = r.contentQueries;
              if (
                (o && La(t, o),
                a && Ha(t, a),
                lt(t.inputs, r.inputs),
                lt(t.declaredInputs, r.declaredInputs),
                lt(t.outputs, r.outputs),
                Me(r) && r.data.animation)
              ) {
                const e = t.data;
                e.animation = (e.animation || []).concat(r.data.animation);
              }
              (e.afterContentChecked =
                e.afterContentChecked || r.afterContentChecked),
                (e.afterContentInit = t.afterContentInit || r.afterContentInit),
                (e.afterViewChecked = t.afterViewChecked || r.afterViewChecked),
                (e.afterViewInit = t.afterViewInit || r.afterViewInit),
                (e.doCheck = t.doCheck || r.doCheck),
                (e.onDestroy = t.onDestroy || r.onDestroy),
                (e.onInit = t.onInit || r.onInit);
            }
            const e = r.features;
            if (e)
              for (let i = 0; i < e.length; i++) {
                const r = e[i];
                r && r.ngInherit && r(t), r === Ua && (n = !1);
              }
          }
          e = Object.getPrototypeOf(e);
        }
        !(function (t) {
          let e = 0,
            n = null;
          for (let i = t.length - 1; i >= 0; i--) {
            const r = t[i];
            (r.hostVars = e += r.hostVars),
              (r.hostAttrs = Sn(r.hostAttrs, (n = Sn(n, r.hostAttrs))));
          }
        })(i);
      }
      function Fa(t) {
        return t === le ? {} : t === ce ? [] : t;
      }
      function La(t, e) {
        const n = t.viewQuery;
        t.viewQuery = n
          ? (t, i) => {
              e(t, i), n(t, i);
            }
          : e;
      }
      function Ha(t, e) {
        const n = t.contentQueries;
        t.contentQueries = n
          ? (t, i, r) => {
              e(t, i, r), n(t, i, r);
            }
          : e;
      }
      function qa(t, e) {
        const n = t.hostBindings;
        t.hostBindings = n
          ? (t, i) => {
              e(t, i), n(t, i);
            }
          : e;
      }
      class $a {
        constructor(t, e, n) {
          (this.previousValue = t),
            (this.currentValue = e),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Ya(t) {
        t.type.prototype.ngOnChanges &&
          ((t.setInput = Ba),
          (t.onChanges = function () {
            const t = Ga(this),
              e = t && t.current;
            if (e) {
              const n = t.previous;
              if (n === le) t.previous = e;
              else for (let t in e) n[t] = e[t];
              (t.current = null), this.ngOnChanges(e);
            }
          }));
      }
      function Ba(t, e, n, i) {
        const r =
            Ga(t) ||
            (function (t, e) {
              return (t.__ngSimpleChanges__ = e);
            })(t, { previous: le, current: null }),
          o = r.current || (r.current = {}),
          a = r.previous,
          s = this.declaredInputs[n],
          l = a[s];
        (o[s] = new $a(l && l.currentValue, e, a === le)), (t[i] = e);
      }
      function Ga(t) {
        return t.__ngSimpleChanges__ || null;
      }
      function Xa(t, e, n, i, r) {
        if (((t = xt(t)), Array.isArray(t)))
          for (let o = 0; o < t.length; o++) Xa(t[o], e, n, i, r);
        else {
          const o = Ge(),
            a = Be();
          let s = No(t) ? t : xt(t.provide),
            l = Ao(t);
          const c = We(),
            u = 65535 & c.providerIndexes,
            h = c.directiveStart,
            d = c.providerIndexes >> 16;
          if (No(t) || !t.multi) {
            const i = new On(l, r, ea),
              p = Qa(s, e, r ? u : u + d, h);
            -1 === p
              ? (Yn(Ln(c, a), o, s),
                Wa(o, t, e.length),
                e.push(s),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 65536),
                n.push(i),
                a.push(i))
              : ((n[p] = i), (a[p] = i));
          } else {
            const p = Qa(s, e, u + d, h),
              f = Qa(s, e, u, u + d),
              g = p >= 0 && n[p],
              m = f >= 0 && n[f];
            if ((r && !m) || (!r && !g)) {
              Yn(Ln(c, a), o, s);
              const u = (function (t, e, n, i, r) {
                const o = new On(t, n, ea);
                return (
                  (o.multi = []),
                  (o.index = e),
                  (o.componentProviders = 0),
                  Za(o, r, i && !n),
                  o
                );
              })(r ? Ka : Ja, n.length, r, i, l);
              !r && m && (n[f].providerFactory = u),
                Wa(o, t, e.length, 0),
                e.push(s),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 65536),
                n.push(u),
                a.push(u);
            } else Wa(o, t, p > -1 ? p : f, Za(n[r ? f : p], l, !r && i));
            !r && i && m && n[f].componentProviders++;
          }
        }
      }
      function Wa(t, e, n, i) {
        const r = No(e);
        if (r || e.useClass) {
          const o = (e.useClass || e).prototype.ngOnDestroy;
          if (o) {
            const a = t.destroyHooks || (t.destroyHooks = []);
            if (!r && e.multi) {
              const t = a.indexOf(n);
              -1 === t ? a.push(n, [i, o]) : a[t + 1].push(i, o);
            } else a.push(n, o);
          }
        }
      }
      function Za(t, e, n) {
        return n && t.componentProviders++, t.multi.push(e) - 1;
      }
      function Qa(t, e, n, i) {
        for (let r = n; r < i; r++) if (e[r] === t) return r;
        return -1;
      }
      function Ja(t, e, n, i) {
        return ts(this.multi, []);
      }
      function Ka(t, e, n, i) {
        const r = this.multi;
        let o;
        if (this.providerFactory) {
          const t = this.providerFactory.componentProviders,
            e = Wn(n, n[1], this.providerFactory.index, i);
          (o = e.slice(0, t)), ts(r, o);
          for (let n = t; n < e.length; n++) o.push(e[n]);
        } else (o = []), ts(r, o);
        return o;
      }
      function ts(t, e) {
        for (let n = 0; n < t.length; n++) e.push((0, t[n])());
        return e;
      }
      function es(t, e = []) {
        return (n) => {
          n.providersResolver = (n, i) =>
            (function (t, e, n) {
              const i = Ge();
              if (i.firstCreatePass) {
                const r = Me(t);
                Xa(n, i.data, i.blueprint, r, !0),
                  Xa(e, i.data, i.blueprint, r, !1);
              }
            })(n, i ? i(t) : t, e);
        };
      }
      Ya.ngInherit = !0;
      class ns {}
      class is {
        resolveComponentFactory(t) {
          throw (function (t) {
            const e = Error(
              `No component factory found for ${yt(
                t
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = t), e;
          })(t);
        }
      }
      let rs = (() => {
          class t {}
          return (t.NULL = new is()), t;
        })(),
        os = (() => {
          class t {
            constructor(t) {
              this.nativeElement = t;
            }
          }
          return (t.__NG_ELEMENT_ID__ = () => as(t)), t;
        })();
      const as = function (t) {
        return _o(t, We(), Be());
      };
      class ss {}
      const ls = (function () {
        var t = { Important: 1, DashCase: 2 };
        return (t[t.Important] = "Important"), (t[t.DashCase] = "DashCase"), t;
      })();
      let cs = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => us()), t;
      })();
      const us = function () {
        const t = Be(),
          e = ze(We().index, t);
        return (function (t) {
          const e = t[11];
          if (Ae(e)) return e;
          throw new Error(
            "Cannot inject Renderer2 when the application uses Renderer3!"
          );
        })(ve(e) ? e : t);
      };
      let hs = (() => {
        class t {}
        return (
          (t.ɵprov = ct({ token: t, providedIn: "root", factory: () => null })),
          t
        );
      })();
      class ds {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const ps = new ds("9.1.7");
      class fs {
        constructor() {}
        supports(t) {
          return Bo(t);
        }
        create(t) {
          return new ms(t);
        }
      }
      const gs = (t, e) => e;
      class ms {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || gs);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            i = 0,
            r = null;
          for (; e || n; ) {
            const o = !n || (e && e.currentIndex < ws(n, i, r)) ? e : n,
              a = ws(o, i, r),
              s = o.currentIndex;
            if (o === n) i--, (n = n._nextRemoved);
            else if (((e = e._next), null == o.previousIndex)) i++;
            else {
              r || (r = []);
              const t = a - i,
                e = s - i;
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const i = n < r.length ? r[n] : (r[n] = 0),
                    o = i + n;
                  e <= o && o < t && (r[n] = i + 1);
                }
                r[o.previousIndex] = e - t;
              }
            }
            a !== s && t(o, a, s);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (
            e = this._identityChangesHead;
            null !== e;
            e = e._nextIdentityChange
          )
            t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !Bo(t)))
            throw new Error(
              `Error trying to diff '${yt(
                t
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e,
            n,
            i,
            r = this._itHead,
            o = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let e = 0; e < this.length; e++)
              (n = t[e]),
                (i = this._trackByFn(e, n)),
                null !== r && $o(r.trackById, i)
                  ? (o && (r = this._verifyReinsertion(r, n, i, e)),
                    $o(r.item, n) || this._addIdentityChange(r, n))
                  : ((r = this._mismatch(r, n, i, e)), (o = !0)),
                (r = r._next);
          } else
            (e = 0),
              (function (t, e) {
                if (Array.isArray(t))
                  for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[qo()]();
                  let i;
                  for (; !(i = n.next()).done; ) e(i.value);
                }
              })(t, (t) => {
                (i = this._trackByFn(e, t)),
                  null !== r && $o(r.trackById, i)
                    ? (o && (r = this._verifyReinsertion(r, t, i, e)),
                      $o(r.item, t) || this._addIdentityChange(r, t))
                    : ((r = this._mismatch(r, t, i, e)), (o = !0)),
                  (r = r._next),
                  e++;
              }),
              (this.length = e);
          return this._truncate(r), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t, e;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = e
            )
              (t.previousIndex = t.currentIndex), (e = t._nextMoved);
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, n, i) {
          let r;
          return (
            null === t ? (r = this._itTail) : ((r = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._linkedRecords
                ? null
                : this._linkedRecords.get(n, i))
              ? ($o(t.item, e) || this._addIdentityChange(t, e),
                this._moveAfter(t, r, i))
              : null !==
                (t =
                  null === this._unlinkedRecords
                    ? null
                    : this._unlinkedRecords.get(n, null))
              ? ($o(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, r, i))
              : (t = this._addAfter(new bs(e, n), r, i)),
            t
          );
        }
        _verifyReinsertion(t, e, n, i) {
          let r =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== r
              ? (t = this._reinsertAfter(r, t._prev, i))
              : t.currentIndex != i &&
                ((t.currentIndex = i), this._addToMoves(t, i)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const i = t._prevRemoved,
            r = t._nextRemoved;
          return (
            null === i ? (this._removalsHead = r) : (i._nextRemoved = r),
            null === r ? (this._removalsTail = i) : (r._prevRemoved = i),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _moveAfter(t, e, n) {
          return (
            this._unlink(t),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _addAfter(t, e, n) {
          return (
            this._insertAfter(t, e, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, n) {
          const i = null === e ? this._itHead : e._next;
          return (
            (t._next = i),
            (t._prev = e),
            null === i ? (this._itTail = t) : (i._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new ys()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            n = t._next;
          return (
            null === e ? (this._itHead = n) : (e._next = n),
            null === n ? (this._itTail = e) : (n._prev = e),
            t
          );
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new ys()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class bs {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class _s {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, e) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if ((null === e || e <= n.currentIndex) && $o(n.trackById, t))
              return n;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup;
          return (
            null === e ? (this._head = n) : (e._nextDup = n),
            null === n ? (this._tail = e) : (n._prevDup = e),
            null === this._head
          );
        }
      }
      class ys {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let n = this.map.get(e);
          n || ((n = new _s()), this.map.set(e, n)), n.add(t);
        }
        get(t, e) {
          const n = this.map.get(t);
          return n ? n.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function ws(t, e, n) {
        const i = t.previousIndex;
        if (null === i) return i;
        let r = 0;
        return n && i < n.length && (r = n[i]), i + e + r;
      }
      class Cs {
        constructor() {}
        supports(t) {
          return t instanceof Map || Go(t);
        }
        create() {
          return new vs();
        }
      }
      class vs {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e);
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Go(t)))
              throw new Error(
                `Error trying to diff '${yt(
                  t
                )}'. Only maps and objects are allowed`
              );
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (t, n) => {
              if (e && e.key === n)
                this._maybeAddToChanges(e, t),
                  (this._appendAfter = e),
                  (e = e._next);
              else {
                const i = this._getOrCreateRecordForKey(n, t);
                e = this._insertBeforeOrAppend(e, i);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let t = e; null !== t; t = t._nextRemoved)
              t === this._mapHead && (this._mapHead = null),
                this._records.delete(t.key),
                (t._nextRemoved = t._next),
                (t.previousValue = t.currentValue),
                (t.currentValue = null),
                (t._prev = null),
                (t._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev;
            return (
              (e._next = t),
              (e._prev = n),
              (t._prev = e),
              n && (n._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
              : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t);
            this._maybeAddToChanges(n, e);
            const i = n._prev,
              r = n._next;
            return (
              i && (i._next = r),
              r && (r._prev = i),
              (n._next = null),
              (n._prev = null),
              n
            );
          }
          const n = new xs(t);
          return (
            this._records.set(t, n),
            (n.currentValue = e),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, e) {
          $o(e, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = e),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, e) {
          t instanceof Map
            ? t.forEach(e)
            : Object.keys(t).forEach((n) => e(t[n], n));
        }
      }
      class xs {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      let Os = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (null != n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend IterableDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new ot(), new it()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (null != e) return e;
              throw new Error(
                `Cannot find a differ supporting object '${t}' of type '${
                  ((n = t), n.name || typeof n)
                }'`
              );
              var n;
            }
          }
          return (
            (t.ɵprov = ct({
              token: t,
              providedIn: "root",
              factory: () => new t([new fs()]),
            })),
            t
          );
        })(),
        ks = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend KeyValueDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new ot(), new it()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (e) return e;
              throw new Error(`Cannot find a differ supporting object '${t}'`);
            }
          }
          return (
            (t.ɵprov = ct({
              token: t,
              providedIn: "root",
              factory: () => new t([new Cs()]),
            })),
            t
          );
        })();
      const Ps = [new Cs()],
        Ms = new Os([new fs()]),
        Ss = new ks(Ps);
      let Es = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => Ts(t, os)), t;
      })();
      const Ts = function (t, e) {
        return yo(t, e, We(), Be());
      };
      let As = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => Is(t, os)), t;
      })();
      const Is = function (t, e) {
          return (function (t, e, n, i) {
            let r;
            bo ||
              (bo = class extends t {
                constructor(t, e, n) {
                  super(),
                    (this._lContainer = t),
                    (this._hostTNode = e),
                    (this._hostView = n);
                }
                get element() {
                  return _o(e, this._hostTNode, this._hostView);
                }
                get injector() {
                  return new Jn(this._hostTNode, this._hostView);
                }
                get parentInjector() {
                  const t = $n(this._hostTNode, this._hostView),
                    e = Rn(t, this._hostView),
                    n = (function (t, e, n) {
                      if (n.parent && -1 !== n.parent.injectorIndex) {
                        const t = n.parent.injectorIndex;
                        let e = n.parent;
                        for (
                          ;
                          null != e.parent && t == e.parent.injectorIndex;

                        )
                          e = e.parent;
                        return e;
                      }
                      let i = In(t),
                        r = e,
                        o = e[6];
                      for (; i > 1; ) (r = r[15]), (o = r[6]), i--;
                      return o;
                    })(t, this._hostView, this._hostTNode);
                  return Tn(t) && null != n
                    ? new Jn(n, e)
                    : new Jn(null, this._hostView);
                }
                clear() {
                  for (; this.length > 0; ) this.remove(this.length - 1);
                }
                get(t) {
                  return (
                    (null !== this._lContainer[8] && this._lContainer[8][t]) ||
                    null
                  );
                }
                get length() {
                  return this._lContainer.length - 10;
                }
                createEmbeddedView(t, e, n) {
                  const i = t.createEmbeddedView(e || {});
                  return this.insert(i, n), i;
                }
                createComponent(t, e, n, i, r) {
                  const o = n || this.parentInjector;
                  if (!r && null == t.ngModule && o) {
                    const t = o.get(Qt, null);
                    t && (r = t);
                  }
                  const a = t.create(o, i, void 0, r);
                  return this.insert(a.hostView, e), a;
                }
                insert(t, e) {
                  const n = t._lView,
                    i = n[1];
                  if (t.destroyed)
                    throw new Error(
                      "Cannot insert a destroyed View in a ViewContainer!"
                    );
                  if ((this.allocateContainerIfNeeded(), xe(n[3]))) {
                    const e = this.indexOf(t);
                    if (-1 !== e) this.detach(e);
                    else {
                      const e = n[3],
                        i = new bo(e, e[6], e[3]);
                      i.detach(i.indexOf(t));
                    }
                  }
                  const r = this._adjustIndex(e);
                  return (
                    (function (t, e, n, i) {
                      const r = 10 + i,
                        o = n.length;
                      i > 0 && (n[r - 1][4] = e),
                        i < o - 10
                          ? ((e[4] = n[r]), te(n, 10 + i, e))
                          : (n.push(e), (e[4] = null)),
                        (e[3] = n);
                      const a = e[17];
                      null !== a &&
                        n !== a &&
                        (function (t, e) {
                          const n = t[9];
                          e[16] !== e[3][3][16] && (t[2] |= 1),
                            null === n ? (t[9] = [e]) : n.push(e);
                        })(a, e);
                      const s = e[19];
                      null !== s && s.insertView(t), (e[2] |= 128);
                    })(i, n, this._lContainer, r),
                    Gr(i, n, !0, ao(r, this._lContainer)),
                    t.attachToViewContainerRef(this),
                    te(this._lContainer[8], r, t),
                    t
                  );
                }
                move(t, e) {
                  if (t.destroyed)
                    throw new Error(
                      "Cannot move a destroyed View in a ViewContainer!"
                    );
                  return this.insert(t, e);
                }
                indexOf(t) {
                  const e = this._lContainer[8];
                  return null !== e ? e.indexOf(t) : -1;
                }
                remove(t) {
                  this.allocateContainerIfNeeded();
                  const e = this._adjustIndex(t, -1);
                  !(function (t, e) {
                    const n = Wr(t, e);
                    n && Zr(n[1], n);
                  })(this._lContainer, e),
                    ee(this._lContainer[8], e);
                }
                detach(t) {
                  this.allocateContainerIfNeeded();
                  const e = this._adjustIndex(t, -1),
                    n = Wr(this._lContainer, e);
                  return n && null != ee(this._lContainer[8], e)
                    ? new po(n)
                    : null;
                }
                _adjustIndex(t, e = 0) {
                  return null == t ? this.length + e : t;
                }
                allocateContainerIfNeeded() {
                  null === this._lContainer[8] && (this._lContainer[8] = []);
                }
              });
            const o = i[n.index];
            if (xe(o))
              (r = o),
                (function (t, e) {
                  t[2] = -2;
                })(r);
            else {
              let t;
              if (4 === n.type) t = Re(o);
              else if (((t = i[11].createComment("")), Se(i))) {
                const e = i[11],
                  r = De(n, i);
                to(
                  e,
                  io(e, r),
                  t,
                  (function (t, e) {
                    return Ae(t) ? t.nextSibling(e) : e.nextSibling;
                  })(e, r)
                );
              } else oo(i[1], i, t, n);
              (i[n.index] = r = Tr(o, i, t, n)), Dr(i, r);
            }
            return new bo(r, n, i);
          })(t, e, We(), Be());
        },
        Rs = {};
      class Ns extends rs {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = ye(t);
          return new js(e, this.ngModule);
        }
      }
      function Ds(t) {
        const e = [];
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      const Vs = new jt("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => Vn,
      });
      class js extends ns {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = t.selectors.map(Gi).join(",")),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return Ds(this.componentDef.inputs);
        }
        get outputs() {
          return Ds(this.componentDef.outputs);
        }
        create(t, e, n, i) {
          const r = (i = i || this.ngModule)
              ? (function (t, e) {
                  return {
                    get: (n, i, r) => {
                      const o = t.get(n, Rs, r);
                      return o !== Rs || i === Rs ? o : e.get(n, i, r);
                    },
                  };
                })(t, i.injector)
              : t,
            o = r.get(ss, Ie),
            a = r.get(hs, null),
            s = o.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            c = n
              ? (function (t, e, n) {
                  if (Ae(t)) return t.selectRootElement(e, n === se.ShadowDom);
                  let i = "string" == typeof e ? t.querySelector(e) : e;
                  return (i.textContent = ""), i;
                })(s, n, this.componentDef.encapsulation)
              : or(
                  l,
                  o.createRenderer(null, this.componentDef),
                  (function (t) {
                    const e = t.toLowerCase();
                    return "svg" === e
                      ? "http://www.w3.org/2000/svg"
                      : "math" === e
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(l)
                ),
            u = this.componentDef.onPush ? 576 : 528,
            h =
              "string" == typeof n && /^#root-ng-internal-isolated-\d+/.test(n),
            d = {
              components: [],
              scheduler: Vn,
              clean: Fr,
              playerHandler: null,
              flags: 0,
            },
            p = gr(0, -1, null, 1, 0, null, null, null, null, null),
            f = ar(null, p, d, u, null, null, o, s, a, r);
          let g, m;
          cn(f, null);
          try {
            const t = (function (t, e, n, i, r, o) {
              const a = n[1];
              n[20] = t;
              const s = sr(a, null, 0, 3, null, null),
                l = (s.mergedAttrs = e.hostAttrs);
              null !== l &&
                (Lo(s, l),
                null !== t &&
                  (kn(r, t, l),
                  null !== s.classes && ho(r, t, s.classes),
                  null !== s.styles && uo(r, t, s.styles)));
              const c = i.createRenderer(t, e),
                u = ar(
                  n,
                  fr(e),
                  null,
                  e.onPush ? 64 : 16,
                  n[20],
                  s,
                  i,
                  c,
                  void 0
                );
              return (
                a.firstCreatePass &&
                  (Yn(Ln(s, n), a, e.type), xr(a, s), kr(s, n.length, 1)),
                Dr(n, u),
                (n[20] = u)
              );
            })(c, this.componentDef, f, o, s);
            if (c)
              if (n) kn(s, c, ["ng-version", ps.full]);
              else {
                const { attrs: t, classes: e } = (function (t) {
                  const e = [],
                    n = [];
                  let i = 1,
                    r = 2;
                  for (; i < t.length; ) {
                    let o = t[i];
                    if ("string" == typeof o)
                      2 === r
                        ? "" !== o && e.push(o, t[++i])
                        : 8 === r && n.push(o);
                    else {
                      if (!qi(r)) break;
                      r = o;
                    }
                    i++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                t && kn(s, c, t), e && e.length > 0 && ho(s, c, e.join(" "));
              }
            if (((m = Ve(p, 0)), void 0 !== e)) {
              const t = (m.projection = []);
              for (let n = 0; n < this.ngContentSelectors.length; n++) {
                const i = e[n];
                t.push(null != i ? Array.from(i) : null);
              }
            }
            (g = (function (t, e, n, i, r) {
              const o = n[1],
                a = (function (t, e, n) {
                  const i = We();
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    vr(t, i, 1),
                    Pr(t, e, n));
                  const r = Wn(e, t, e.length - 1, i);
                  Di(r, e);
                  const o = De(i, e);
                  return o && Di(o, e), r;
                })(o, n, e);
              i.components.push(a),
                (t[8] = a),
                r && r.forEach((t) => t(a, e)),
                e.contentQueries && e.contentQueries(1, a, n.length - 1);
              const s = We();
              if (
                o.firstCreatePass &&
                (null !== e.hostBindings || null !== e.hostAttrs)
              ) {
                mn(s.index - 20);
                const t = n[1];
                yr(t, e), wr(t, n, e.hostVars), Cr(e, a);
              }
              return a;
            })(t, this.componentDef, f, d, [za])),
              lr(p, f, null);
          } finally {
            fn();
          }
          const b = new zs(this.componentType, g, _o(os, m, f), f, m);
          return (n && !h) || (b.hostView._tViewNode.child = m), b;
        }
      }
      class zs extends class {} {
        constructor(t, e, n, i, r) {
          super(),
            (this.location = n),
            (this._rootLView = i),
            (this._tNode = r),
            (this.destroyCbs = []),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new fo(i)),
            (this.hostView._tViewNode = (function (t, e, n, i) {
              let r = t.node;
              return (
                null == r && (t.node = r = mr(0, null, 2, -1, null, null)),
                (i[6] = r)
              );
            })(i[1], 0, 0, i)),
            (this.componentType = t);
        }
        get injector() {
          return new Jn(this._tNode, this._rootLView);
        }
        destroy() {
          this.destroyCbs &&
            (this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null),
            !this.hostView.destroyed && this.hostView.destroy());
        }
        onDestroy(t) {
          this.destroyCbs && this.destroyCbs.push(t);
        }
      }
      const Us = void 0;
      var Fs = [
        "en",
        [["a", "p"], ["AM", "PM"], Us],
        [["AM", "PM"], Us, Us],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        Us,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        Us,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", Us, "{1} 'at' {0}", Us],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function (t) {
          let e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === e && 0 === n ? 1 : 5;
        },
      ];
      let Ls = {};
      function Hs(t) {
        return (
          t in Ls ||
            (Ls[t] =
              Et.ng &&
              Et.ng.common &&
              Et.ng.common.locales &&
              Et.ng.common.locales[t]),
          Ls[t]
        );
      }
      const qs = (function () {
        var t = {
          LocaleId: 0,
          DayPeriodsFormat: 1,
          DayPeriodsStandalone: 2,
          DaysFormat: 3,
          DaysStandalone: 4,
          MonthsFormat: 5,
          MonthsStandalone: 6,
          Eras: 7,
          FirstDayOfWeek: 8,
          WeekendRange: 9,
          DateFormat: 10,
          TimeFormat: 11,
          DateTimeFormat: 12,
          NumberSymbols: 13,
          NumberFormats: 14,
          CurrencyCode: 15,
          CurrencySymbol: 16,
          CurrencyName: 17,
          Currencies: 18,
          Directionality: 19,
          PluralCase: 20,
          ExtraData: 21,
        };
        return (
          (t[t.LocaleId] = "LocaleId"),
          (t[t.DayPeriodsFormat] = "DayPeriodsFormat"),
          (t[t.DayPeriodsStandalone] = "DayPeriodsStandalone"),
          (t[t.DaysFormat] = "DaysFormat"),
          (t[t.DaysStandalone] = "DaysStandalone"),
          (t[t.MonthsFormat] = "MonthsFormat"),
          (t[t.MonthsStandalone] = "MonthsStandalone"),
          (t[t.Eras] = "Eras"),
          (t[t.FirstDayOfWeek] = "FirstDayOfWeek"),
          (t[t.WeekendRange] = "WeekendRange"),
          (t[t.DateFormat] = "DateFormat"),
          (t[t.TimeFormat] = "TimeFormat"),
          (t[t.DateTimeFormat] = "DateTimeFormat"),
          (t[t.NumberSymbols] = "NumberSymbols"),
          (t[t.NumberFormats] = "NumberFormats"),
          (t[t.CurrencyCode] = "CurrencyCode"),
          (t[t.CurrencySymbol] = "CurrencySymbol"),
          (t[t.CurrencyName] = "CurrencyName"),
          (t[t.Currencies] = "Currencies"),
          (t[t.Directionality] = "Directionality"),
          (t[t.PluralCase] = "PluralCase"),
          (t[t.ExtraData] = "ExtraData"),
          t
        );
      })();
      let $s = "en-US";
      function Ys(t) {
        var e, n;
        (n = "Expected localeId to be defined"),
          null == (e = t) &&
            (function (t, e, n, i) {
              throw new Error(
                `ASSERTION ERROR: ${t}` + ` [Expected=> null != ${e} <=Actual]`
              );
            })(n, e),
          "string" == typeof t && ($s = t.toLowerCase().replace(/_/g, "-"));
      }
      const Bs = new Map();
      class Gs extends Qt {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Ns(this));
          const n = Ce(t),
            i = t[Nt] || null;
          i && Ys(i),
            (this._bootstrapComponents = jn(n.bootstrap)),
            (this._r3Injector = So(
              t,
              e,
              [
                { provide: Qt, useValue: this },
                { provide: rs, useValue: this.componentFactoryResolver },
              ],
              yt(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, e = Vo.THROW_IF_NOT_FOUND, n = at.Default) {
          return t === Vo || t === Qt || t === zt
            ? this
            : this._r3Injector.get(t, e, n);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Xs extends Jt {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== Ce(t) &&
              (function t(e) {
                if (null !== e.ɵmod.id) {
                  const t = e.ɵmod.id;
                  (function (t, e, n) {
                    if (e && e !== n)
                      throw new Error(
                        `Duplicate module registered for ${t} - ${yt(
                          e
                        )} vs ${yt(e.name)}`
                      );
                  })(t, Bs.get(t), e),
                    Bs.set(t, e);
                }
                let n = e.ɵmod.imports;
                n instanceof Function && (n = n()), n && n.forEach((e) => t(e));
              })(t);
        }
        create(t) {
          return new Gs(this.moduleType, t);
        }
      }
      function Ws(t, e, n, i) {
        return Qs(Be(), en(), t, e, n, i);
      }
      function Zs(t, e) {
        const n = t[e];
        return n === Xi ? void 0 : n;
      }
      function Qs(t, e, n, i, r, o) {
        const a = e + n;
        return Wo(t, a, r)
          ? Xo(t, a + 1, o ? i.call(o, r) : i(r))
          : Zs(t, a + 1);
      }
      function Js(t, e, n, i, r, o, a, s) {
        const l = e + n;
        return (function (t, e, n, i, r) {
          const o = Zo(t, e, n, i);
          return Wo(t, e + 2, r) || o;
        })(t, l, r, o, a)
          ? Xo(t, l + 3, s ? i.call(s, r, o, a) : i(r, o, a))
          : Zs(t, l + 3);
      }
      function Ks(t, e) {
        const n = Ge();
        let i;
        const r = t + 20;
        n.firstCreatePass
          ? ((i = (function (t, e) {
              if (e)
                for (let n = e.length - 1; n >= 0; n--) {
                  const i = e[n];
                  if (t === i.name) return i;
                }
              throw new Error(`The pipe '${t}' could not be found!`);
            })(e, n.pipeRegistry)),
            (n.data[r] = i),
            i.onDestroy &&
              (n.destroyHooks || (n.destroyHooks = [])).push(r, i.onDestroy))
          : (i = n.data[r]);
        const o = i.factory || (i.factory = we(i.type)),
          a = Yt(ea),
          s = Un(!1),
          l = o();
        return (
          Un(s),
          Yt(a),
          (function (t, e, n, i) {
            const r = n + 20;
            r >= t.data.length && ((t.data[r] = null), (t.blueprint[r] = null)),
              (e[r] = i);
          })(n, Be(), t, l),
          l
        );
      }
      function tl(t, e, n) {
        const i = Be(),
          r = je(i, t);
        return il(
          i,
          nl(i, t) ? Qs(i, en(), e, r.transform, n, r) : r.transform(n)
        );
      }
      function el(t, e, n, i) {
        const r = Be(),
          o = je(r, t);
        return il(
          r,
          nl(r, t)
            ? (function (t, e, n, i, r, o, a) {
                const s = e + n;
                return Zo(t, s, r, o)
                  ? Xo(t, s + 2, a ? i.call(a, r, o) : i(r, o))
                  : Zs(t, s + 2);
              })(r, en(), e, o.transform, n, i, o)
            : o.transform(n, i)
        );
      }
      function nl(t, e) {
        return t[1].data[e + 20].pure;
      }
      function il(t, e) {
        return (
          Yo.isWrapped(e) &&
            ((e = Yo.unwrap(e)), (t[$e.lFrame.bindingIndex] = Xi)),
          e
        );
      }
      class rl extends k {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, e, n) {
          let i,
            r = (t) => null,
            o = () => null;
          t && "object" == typeof t
            ? ((i = this.__isAsync
                ? (e) => {
                    setTimeout(() => t.next(e));
                  }
                : (e) => {
                    t.next(e);
                  }),
              t.error &&
                (r = this.__isAsync
                  ? (e) => {
                      setTimeout(() => t.error(e));
                    }
                  : (e) => {
                      t.error(e);
                    }),
              t.complete &&
                (o = this.__isAsync
                  ? () => {
                      setTimeout(() => t.complete());
                    }
                  : () => {
                      t.complete();
                    }))
            : ((i = this.__isAsync
                ? (e) => {
                    setTimeout(() => t(e));
                  }
                : (e) => {
                    t(e);
                  }),
              e &&
                (r = this.__isAsync
                  ? (t) => {
                      setTimeout(() => e(t));
                    }
                  : (t) => {
                      e(t);
                    }),
              n &&
                (o = this.__isAsync
                  ? () => {
                      setTimeout(() => n());
                    }
                  : () => {
                      n();
                    }));
          const a = super.subscribe(i, r, o);
          return t instanceof h && t.add(a), a;
        }
      }
      function ol(t, e) {
        return yo(Es, os, t, e);
      }
      const al = new jt("Application Initializer");
      let sl = (() => {
        class t {
          constructor(t) {
            (this.appInits = t),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((t, e) => {
                (this.resolve = t), (this.reject = e);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              e = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const e = this.appInits[n]();
                ca(e) && t.push(e);
              }
            Promise.all(t)
              .then(() => {
                e();
              })
              .catch((t) => {
                this.reject(t);
              }),
              0 === t.length && e(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(al, 8));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ll = new jt("AppId"),
        cl = {
          provide: ll,
          useFactory: function () {
            return `${ul()}${ul()}${ul()}`;
          },
          deps: [],
        };
      function ul() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const hl = new jt("Platform Initializer"),
        dl = new jt("Platform ID"),
        pl = new jt("appBootstrapListener");
      let fl = (() => {
        class t {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const gl = new jt("LocaleId"),
        ml = new jt("DefaultCurrencyCode");
      class bl {
        constructor(t, e) {
          (this.ngModuleFactory = t), (this.componentFactories = e);
        }
      }
      const _l = function (t) {
          return new Xs(t);
        },
        yl = _l,
        wl = function (t) {
          return Promise.resolve(_l(t));
        },
        Cl = function (t) {
          const e = _l(t),
            n = jn(Ce(t).declarations).reduce((t, e) => {
              const n = ye(e);
              return n && t.push(new js(n)), t;
            }, []);
          return new bl(e, n);
        },
        vl = Cl,
        xl = function (t) {
          return Promise.resolve(Cl(t));
        };
      let Ol = (() => {
        class t {
          constructor() {
            (this.compileModuleSync = yl),
              (this.compileModuleAsync = wl),
              (this.compileModuleAndAllComponentsSync = vl),
              (this.compileModuleAndAllComponentsAsync = xl);
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const kl = new jt("compilerOptions"),
        Pl = (() => Promise.resolve(0))();
      function Ml(t) {
        "undefined" == typeof Zone
          ? Pl.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      class Sl {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new rl(!1)),
            (this.onMicrotaskEmpty = new rl(!1)),
            (this.onStable = new rl(!1)),
            (this.onError = new rl(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched(),
            (this._nesting = 0),
            (this._outer = this._inner = Zone.current),
            Zone.wtfZoneSpec &&
              (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
            Zone.TaskTrackingZoneSpec &&
              (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
            (this.shouldCoalesceEventChangeDetection = e),
            (this.lastRequestAnimationFrameId = -1),
            (this.nativeRequestAnimationFrame = (function () {
              let t = Et.requestAnimationFrame,
                e = Et.cancelAnimationFrame;
              if ("undefined" != typeof Zone && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const i = e[Zone.__symbol__("OriginalDelegate")];
                i && (e = i);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function (t) {
              const e =
                !!t.shouldCoalesceEventChangeDetection &&
                t.nativeRequestAnimationFrame &&
                (() => {
                  !(function (t) {
                    -1 === t.lastRequestAnimationFrameId &&
                      ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
                        Et,
                        () => {
                          (t.lastRequestAnimationFrameId = -1), Il(t), Al(t);
                        }
                      )),
                      Il(t));
                  })(t);
                });
              t._inner = t._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0, maybeDelayChangeDetection: e },
                onInvokeTask: (n, i, r, o, a, s) => {
                  try {
                    return Rl(t), n.invokeTask(r, o, a, s);
                  } finally {
                    e && "eventTask" === o.type && e(), Nl(t);
                  }
                },
                onInvoke: (e, n, i, r, o, a, s) => {
                  try {
                    return Rl(t), e.invoke(i, r, o, a, s);
                  } finally {
                    Nl(t);
                  }
                },
                onHasTask: (e, n, i, r) => {
                  e.hasTask(i, r),
                    n === i &&
                      ("microTask" == r.change
                        ? ((t._hasPendingMicrotasks = r.microTask),
                          Il(t),
                          Al(t))
                        : "macroTask" == r.change &&
                          (t.hasPendingMacrotasks = r.macroTask));
                },
                onHandleError: (e, n, i, r) => (
                  e.handleError(i, r),
                  t.runOutsideAngular(() => t.onError.emit(r)),
                  !1
                ),
              });
            })(this);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Sl.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (Sl.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, e, n) {
          return this._inner.run(t, e, n);
        }
        runTask(t, e, n, i) {
          const r = this._inner,
            o = r.scheduleEventTask("NgZoneEvent: " + i, t, Tl, El, El);
          try {
            return r.runTask(o, e, n);
          } finally {
            r.cancelTask(o);
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      function El() {}
      const Tl = {};
      function Al(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function Il(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          (t.shouldCoalesceEventChangeDetection &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function Rl(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function Nl(t) {
        t._nesting--, Al(t);
      }
      class Dl {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new rl()),
            (this.onMicrotaskEmpty = new rl()),
            (this.onStable = new rl()),
            (this.onError = new rl());
        }
        run(t, e, n) {
          return t.apply(e, n);
        }
        runGuarded(t, e, n) {
          return t.apply(e, n);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, n, i) {
          return t.apply(e, n);
        }
      }
      let Vl = (() => {
          class t {
            constructor(t) {
              (this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Sl.assertNotInAngularZone(),
                        Ml(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Ml(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (e) =>
                    !e.updateCb ||
                    !e.updateCb(t) ||
                    (clearTimeout(e.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, e, n) {
              let i = -1;
              e &&
                e > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (t) => t.timeoutId !== i
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, e)),
                this._callbacks.push({ doneCb: t, timeoutId: i, updateCb: n });
            }
            whenStable(t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
                );
              this.addCallback(t, e, n), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(t, e, n) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(Sl));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        jl = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), Fl.addToWindow(this);
            }
            registerApplication(t, e) {
              this._applications.set(t, e);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, e = !0) {
              return Fl.findTestabilityInTree(this, t, e);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      class zl {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null;
        }
      }
      let Ul,
        Fl = new zl(),
        Ll = function (t, e, n) {
          const i = t.get(kl, []).concat(e),
            r = new Xs(n);
          if (0 === zo.size) return Promise.resolve(r);
          const o = (function (t) {
            const e = [];
            return t.forEach((t) => t && e.push(...t)), e;
          })(i.map((t) => t.providers));
          if (0 === o.length) return Promise.resolve(r);
          const a = (function () {
              const t = Et.ng;
              if (!t || !t.ɵcompilerFacade)
                throw new Error(
                  "Angular JIT compilation failed: '@angular/compiler' not loaded!\n  - JIT compilation is discouraged for production use-cases! Consider AOT mode instead.\n  - Did you bootstrap using '@angular/platform-browser-dynamic' or '@angular/platform-server'?\n  - Alternatively provide the compiler with 'import \"@angular/compiler\";' before bootstrapping."
                );
              return t.ɵcompilerFacade;
            })(),
            s = Vo.create({ providers: o }).get(a.ResourceLoader);
          return (function (t) {
            const e = [],
              n = new Map();
            function i(t) {
              let e = n.get(t);
              if (!e) {
                const i = ((t) => Promise.resolve(s.get(t)))(t);
                n.set(t, (e = i.then(Fo)));
              }
              return e;
            }
            return (
              zo.forEach((t, n) => {
                const r = [];
                t.templateUrl &&
                  r.push(
                    i(t.templateUrl).then((e) => {
                      t.template = e;
                    })
                  );
                const o = t.styleUrls,
                  a = t.styles || (t.styles = []),
                  s = t.styles.length;
                o &&
                  o.forEach((e, n) => {
                    a.push(""),
                      r.push(
                        i(e).then((i) => {
                          (a[s + n] = i),
                            o.splice(o.indexOf(e), 1),
                            0 == o.length && (t.styleUrls = void 0);
                        })
                      );
                  });
                const l = Promise.all(r).then(() =>
                  (function (t) {
                    Uo.delete(t);
                  })(n)
                );
                e.push(l);
              }),
              (zo = new Map()),
              Promise.all(e).then(() => {})
            );
          })().then(() => r);
        };
      const Hl = new jt("AllowMultipleToken");
      class ql {
        constructor(t, e) {
          (this.name = t), (this.token = e);
        }
      }
      function $l(t, e, n = []) {
        const i = `Platform: ${e}`,
          r = new jt(i);
        return (e = []) => {
          let o = Yl();
          if (!o || o.injector.get(Hl, !1))
            if (t) t(n.concat(e).concat({ provide: r, useValue: !0 }));
            else {
              const t = n
                .concat(e)
                .concat(
                  { provide: r, useValue: !0 },
                  { provide: vo, useValue: "platform" }
                );
              !(function (t) {
                if (Ul && !Ul.destroyed && !Ul.injector.get(Hl, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                Ul = t.get(Bl);
                const e = t.get(hl, null);
                e && e.forEach((t) => t());
              })(Vo.create({ providers: t, name: i }));
            }
          return (function (t) {
            const e = Yl();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(t, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return e;
          })(r);
        };
      }
      function Yl() {
        return Ul && !Ul.destroyed ? Ul : null;
      }
      let Bl = (() => {
        class t {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, e) {
            const n = (function (t, e) {
                let n;
                return (
                  (n =
                    "noop" === t
                      ? new Dl()
                      : ("zone.js" === t ? void 0 : t) ||
                        new Sl({
                          enableLongStackTrace: ci(),
                          shouldCoalesceEventChangeDetection: e,
                        })),
                  n
                );
              })(e ? e.ngZone : void 0, (e && e.ngZoneEventCoalescing) || !1),
              i = [{ provide: Sl, useValue: n }];
            return n.run(() => {
              const e = Vo.create({
                  providers: i,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                r = t.create(e),
                o = r.injector.get(ii, null);
              if (!o)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?"
                );
              return (
                r.onDestroy(() => Wl(this._modules, r)),
                n.runOutsideAngular(() =>
                  n.onError.subscribe({
                    next: (t) => {
                      o.handleError(t);
                    },
                  })
                ),
                (function (t, e, n) {
                  try {
                    const i = n();
                    return ca(i)
                      ? i.catch((n) => {
                          throw (
                            (e.runOutsideAngular(() => t.handleError(n)), n)
                          );
                        })
                      : i;
                  } catch (i) {
                    throw (e.runOutsideAngular(() => t.handleError(i)), i);
                  }
                })(o, n, () => {
                  const t = r.injector.get(sl);
                  return (
                    t.runInitializers(),
                    t.donePromise.then(
                      () => (
                        Ys(r.injector.get(gl, "en-US") || "en-US"),
                        this._moduleDoBootstrap(r),
                        r
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, e = []) {
            const n = Gl({}, e);
            return Ll(this.injector, n, t).then((t) =>
              this.bootstrapModuleFactory(t, n)
            );
          }
          _moduleDoBootstrap(t) {
            const e = t.injector.get(Xl);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((t) => e.bootstrap(t));
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${yt(
                    t.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` +
                    "Please define one of these."
                );
              t.instance.ngDoBootstrap(e);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach((t) => t.destroy()),
              this._destroyListeners.forEach((t) => t()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(Vo));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Gl(t, e) {
        return Array.isArray(e)
          ? e.reduce(Gl, t)
          : Object.assign(Object.assign({}, t), e);
      }
      let Xl = (() => {
        class t {
          constructor(t, e, n, i, r, o) {
            (this._zone = t),
              (this._console = e),
              (this._injector = n),
              (this._exceptionHandler = i),
              (this._componentFactoryResolver = r),
              (this._initStatus = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._enforceNoNewChanges = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._enforceNoNewChanges = ci()),
              this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick();
                  });
                },
              });
            const a = new w((t) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete();
                  });
              }),
              s = new w((t) => {
                let e;
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    Sl.assertNotInAngularZone(),
                      Ml(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), t.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  Sl.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        t.next(!1);
                      }));
                });
                return () => {
                  e.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = (function (...t) {
              let e = Number.POSITIVE_INFINITY,
                n = null,
                i = t[t.length - 1];
              return (
                M(i)
                  ? ((n = t.pop()),
                    t.length > 1 &&
                      "number" == typeof t[t.length - 1] &&
                      (e = t.pop()))
                  : "number" == typeof i && (e = t.pop()),
                null === n && 1 === t.length && t[0] instanceof w
                  ? t[0]
                  : Y(e)(B(t, n))
              );
            })(
              a,
              s.pipe((t) => {
                return G()(
                  ((e = K),
                  function (t) {
                    let n;
                    n =
                      "function" == typeof e
                        ? e
                        : function () {
                            return e;
                          };
                    const i = Object.create(t, Q);
                    return (i.source = t), (i.subjectFactory = n), i;
                  })(t)
                );
                var e;
              })
            );
          }
          bootstrap(t, e) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let n;
            (n =
              t instanceof ns
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType);
            const i = n.isBoundToModule ? void 0 : this._injector.get(Qt),
              r = n.create(Vo.NULL, [], e || n.selector, i);
            r.onDestroy(() => {
              this._unloadComponent(r);
            });
            const o = r.injector.get(Vl, null);
            return (
              o &&
                r.injector
                  .get(jl)
                  .registerApplication(r.location.nativeElement, o),
              this._loadComponent(r),
              ci() &&
                this._console.log(
                  "Angular is running in the development mode. Call enableProdMode() to enable the production mode."
                ),
              r
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
              if (this._enforceNoNewChanges)
                for (let t of this._views) t.checkNoChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const e = t;
            this._views.push(e), e.attachToAppRef(this);
          }
          detachView(t) {
            const e = t;
            Wl(this._views, e), e.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(pl, [])
                .concat(this._bootstrapListeners)
                .forEach((e) => e(t));
          }
          _unloadComponent(t) {
            this.detachView(t.hostView), Wl(this.components, t);
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy());
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(Sl), Gt(fl), Gt(Vo), Gt(ii), Gt(rs), Gt(sl));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Wl(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      class Zl {}
      class Ql {}
      const Jl = { factoryPathPrefix: "", factoryPathSuffix: ".ngfactory" };
      let Kl = (() => {
        class t {
          constructor(t, e) {
            (this._compiler = t), (this._config = e || Jl);
          }
          load(t) {
            return this.loadAndCompile(t);
          }
          loadAndCompile(t) {
            let [e, i] = t.split("#");
            return (
              void 0 === i && (i = "default"),
              n("zn8P")(e)
                .then((t) => t[i])
                .then((t) => tc(t, e, i))
                .then((t) => this._compiler.compileModuleAsync(t))
            );
          }
          loadFactory(t) {
            let [e, i] = t.split("#"),
              r = "NgFactory";
            return (
              void 0 === i && ((i = "default"), (r = "")),
              n("zn8P")(
                this._config.factoryPathPrefix +
                  e +
                  this._config.factoryPathSuffix
              )
                .then((t) => t[i + r])
                .then((t) => tc(t, e, i))
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(Ol), Gt(Ql, 8));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function tc(t, e, n) {
        if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
        return t;
      }
      const ec = $l(null, "core", [
          { provide: dl, useValue: "unknown" },
          { provide: Bl, deps: [Vo] },
          { provide: jl, deps: [] },
          { provide: fl, deps: [] },
        ]),
        nc = [
          { provide: Xl, useClass: Xl, deps: [Sl, fl, Vo, ii, rs, sl] },
          {
            provide: Vs,
            deps: [Sl],
            useFactory: function (t) {
              let e = [];
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (t) {
                  e.push(t);
                }
              );
            },
          },
          { provide: sl, useClass: sl, deps: [[new it(), al]] },
          { provide: Ol, useClass: Ol, deps: [] },
          cl,
          {
            provide: Os,
            useFactory: function () {
              return Ms;
            },
            deps: [],
          },
          {
            provide: ks,
            useFactory: function () {
              return Ss;
            },
            deps: [],
          },
          {
            provide: gl,
            useFactory: function (t) {
              return (
                Ys(
                  (t =
                    t ||
                    ("undefined" != typeof $localize && $localize.locale) ||
                    "en-US")
                ),
                t
              );
            },
            deps: [[new nt(gl), new it(), new ot()]],
          },
          { provide: ml, useValue: "USD" },
        ];
      let ic = (() => {
        class t {
          constructor(t) {}
        }
        return (
          (t.ɵmod = ge({ type: t })),
          (t.ɵinj = ut({
            factory: function (e) {
              return new (e || t)(Gt(Xl));
            },
            providers: nc,
          })),
          t
        );
      })();
      window, window;
      let rc = null;
      function oc() {
        return rc;
      }
      const ac = new jt("DocumentToken");
      let sc = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ factory: lc, token: t, providedIn: "platform" })),
          t
        );
      })();
      function lc() {
        return Gt(uc);
      }
      const cc = new jt("Location Initialized");
      let uc = (() => {
        class t extends sc {
          constructor(t) {
            super(), (this._doc = t), this._init();
          }
          _init() {
            (this.location = oc().getLocation()),
              (this._history = oc().getHistory());
          }
          getBaseHrefFromDOM() {
            return oc().getBaseHref(this._doc);
          }
          onPopState(t) {
            oc()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("popstate", t, !1);
          }
          onHashChange(t) {
            oc()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("hashchange", t, !1);
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(t) {
            this.location.pathname = t;
          }
          pushState(t, e, n) {
            hc() ? this._history.pushState(t, e, n) : (this.location.hash = n);
          }
          replaceState(t, e, n) {
            hc()
              ? this._history.replaceState(t, e, n)
              : (this.location.hash = n);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(ac));
          }),
          (t.ɵprov = ct({ factory: dc, token: t, providedIn: "platform" })),
          t
        );
      })();
      function hc() {
        return !!window.history.pushState;
      }
      function dc() {
        return new uc(Gt(ac));
      }
      function pc(t, e) {
        if (0 == t.length) return e;
        if (0 == e.length) return t;
        let n = 0;
        return (
          t.endsWith("/") && n++,
          e.startsWith("/") && n++,
          2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
        );
      }
      function fc(t) {
        const e = t.match(/#|\?|$/),
          n = (e && e.index) || t.length;
        return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n);
      }
      function gc(t) {
        return t && "?" !== t[0] ? "?" + t : t;
      }
      let mc = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ factory: bc, token: t, providedIn: "root" })),
          t
        );
      })();
      function bc(t) {
        const e = Gt(ac).location;
        return new yc(Gt(sc), (e && e.origin) || "");
      }
      const _c = new jt("appBaseHref");
      let yc = (() => {
          class t extends mc {
            constructor(t, e) {
              if (
                (super(),
                (this._platformLocation = t),
                null == e && (e = this._platformLocation.getBaseHrefFromDOM()),
                null == e)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = e;
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return pc(this._baseHref, t);
            }
            path(t = !1) {
              const e =
                  this._platformLocation.pathname +
                  gc(this._platformLocation.search),
                n = this._platformLocation.hash;
              return n && t ? `${e}${n}` : e;
            }
            pushState(t, e, n, i) {
              const r = this.prepareExternalUrl(n + gc(i));
              this._platformLocation.pushState(t, e, r);
            }
            replaceState(t, e, n, i) {
              const r = this.prepareExternalUrl(n + gc(i));
              this._platformLocation.replaceState(t, e, r);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(sc), Gt(_c, 8));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        wc = (() => {
          class t extends mc {
            constructor(t, e) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ""),
                null != e && (this._baseHref = e);
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let e = this._platformLocation.hash;
              return null == e && (e = "#"), e.length > 0 ? e.substring(1) : e;
            }
            prepareExternalUrl(t) {
              const e = pc(this._baseHref, t);
              return e.length > 0 ? "#" + e : e;
            }
            pushState(t, e, n, i) {
              let r = this.prepareExternalUrl(n + gc(i));
              0 == r.length && (r = this._platformLocation.pathname),
                this._platformLocation.pushState(t, e, r);
            }
            replaceState(t, e, n, i) {
              let r = this.prepareExternalUrl(n + gc(i));
              0 == r.length && (r = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, e, r);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(sc), Gt(_c, 8));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Cc = (() => {
          class t {
            constructor(t, e) {
              (this._subject = new rl()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = t);
              const n = this._platformStrategy.getBaseHref();
              (this._platformLocation = e),
                (this._baseHref = fc(xc(n))),
                this._platformStrategy.onPopState((t) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: t.state,
                    type: t.type,
                  });
                });
            }
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(t, e = "") {
              return this.path() == this.normalize(t + gc(e));
            }
            normalize(e) {
              return t.stripTrailingSlash(
                (function (t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e;
                })(this._baseHref, xc(e))
              );
            }
            prepareExternalUrl(t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._platformStrategy.prepareExternalUrl(t)
              );
            }
            go(t, e = "", n = null) {
              this._platformStrategy.pushState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + gc(e)),
                  n
                );
            }
            replaceState(t, e = "", n = null) {
              this._platformStrategy.replaceState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + gc(e)),
                  n
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t),
                this.subscribe((t) => {
                  this._notifyUrlChangeListeners(t.url, t.state);
                });
            }
            _notifyUrlChangeListeners(t = "", e) {
              this._urlChangeListeners.forEach((n) => n(t, e));
            }
            subscribe(t, e, n) {
              return this._subject.subscribe({
                next: t,
                error: e,
                complete: n,
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(mc), Gt(sc));
            }),
            (t.normalizeQueryParams = gc),
            (t.joinWithSlash = pc),
            (t.stripTrailingSlash = fc),
            (t.ɵprov = ct({ factory: vc, token: t, providedIn: "root" })),
            t
          );
        })();
      function vc() {
        return new Cc(Gt(mc), Gt(sc));
      }
      function xc(t) {
        return t.replace(/\/index.html$/, "");
      }
      const Oc = (function () {
        var t = { Zero: 0, One: 1, Two: 2, Few: 3, Many: 4, Other: 5 };
        return (
          (t[t.Zero] = "Zero"),
          (t[t.One] = "One"),
          (t[t.Two] = "Two"),
          (t[t.Few] = "Few"),
          (t[t.Many] = "Many"),
          (t[t.Other] = "Other"),
          t
        );
      })();
      class kc {}
      let Pc = (() => {
        class t extends kc {
          constructor(t) {
            super(), (this.locale = t);
          }
          getPluralCategory(t, e) {
            switch (
              (function (t) {
                return (function (t) {
                  const e = (function (t) {
                    return t.toLowerCase().replace(/_/g, "-");
                  })(t);
                  let n = Hs(e);
                  if (n) return n;
                  const i = e.split("-")[0];
                  if (((n = Hs(i)), n)) return n;
                  if ("en" === i) return Fs;
                  throw new Error(`Missing locale data for the locale "${t}".`);
                })(t)[qs.PluralCase];
              })(e || this.locale)(t)
            ) {
              case Oc.Zero:
                return "zero";
              case Oc.One:
                return "one";
              case Oc.Two:
                return "two";
              case Oc.Few:
                return "few";
              case Oc.Many:
                return "many";
              default:
                return "other";
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(gl));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Mc(t, e) {
        e = encodeURIComponent(e);
        for (const n of t.split(";")) {
          const t = n.indexOf("="),
            [i, r] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
          if (i.trim() === e) return decodeURIComponent(r);
        }
        return null;
      }
      let Sc = (() => {
        class t {
          constructor(t, e, n, i) {
            (this._iterableDiffers = t),
              (this._keyValueDiffers = e),
              (this._ngEl = n),
              (this._renderer = i),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._initialClasses = []),
              (this._rawClass = null);
          }
          set klass(t) {
            this._removeClasses(this._initialClasses),
              (this._initialClasses =
                "string" == typeof t ? t.split(/\s+/) : []),
              this._applyClasses(this._initialClasses),
              this._applyClasses(this._rawClass);
          }
          set ngClass(t) {
            this._removeClasses(this._rawClass),
              this._applyClasses(this._initialClasses),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._rawClass = "string" == typeof t ? t.split(/\s+/) : t),
              this._rawClass &&
                (Bo(this._rawClass)
                  ? (this._iterableDiffer = this._iterableDiffers
                      .find(this._rawClass)
                      .create())
                  : (this._keyValueDiffer = this._keyValueDiffers
                      .find(this._rawClass)
                      .create()));
          }
          ngDoCheck() {
            if (this._iterableDiffer) {
              const t = this._iterableDiffer.diff(this._rawClass);
              t && this._applyIterableChanges(t);
            } else if (this._keyValueDiffer) {
              const t = this._keyValueDiffer.diff(this._rawClass);
              t && this._applyKeyValueChanges(t);
            }
          }
          _applyKeyValueChanges(t) {
            t.forEachAddedItem((t) => this._toggleClass(t.key, t.currentValue)),
              t.forEachChangedItem((t) =>
                this._toggleClass(t.key, t.currentValue)
              ),
              t.forEachRemovedItem((t) => {
                t.previousValue && this._toggleClass(t.key, !1);
              });
          }
          _applyIterableChanges(t) {
            t.forEachAddedItem((t) => {
              if ("string" != typeof t.item)
                throw new Error(
                  `NgClass can only toggle CSS classes expressed as strings, got ${yt(
                    t.item
                  )}`
                );
              this._toggleClass(t.item, !0);
            }),
              t.forEachRemovedItem((t) => this._toggleClass(t.item, !1));
          }
          _applyClasses(t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach((t) => this._toggleClass(t, !0))
                : Object.keys(t).forEach((e) => this._toggleClass(e, !!t[e])));
          }
          _removeClasses(t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach((t) => this._toggleClass(t, !1))
                : Object.keys(t).forEach((t) => this._toggleClass(t, !1)));
          }
          _toggleClass(t, e) {
            (t = t.trim()) &&
              t.split(/\s+/g).forEach((t) => {
                e
                  ? this._renderer.addClass(this._ngEl.nativeElement, t)
                  : this._renderer.removeClass(this._ngEl.nativeElement, t);
              });
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ea(Os), ea(ks), ea(os), ea(cs));
          }),
          (t.ɵdir = be({
            type: t,
            selectors: [["", "ngClass", ""]],
            inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
          })),
          t
        );
      })();
      class Ec {
        constructor(t, e, n, i) {
          (this.$implicit = t),
            (this.ngForOf = e),
            (this.index = n),
            (this.count = i);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Tc = (() => {
        class t {
          constructor(t, e, n) {
            (this._viewContainer = t),
              (this._template = e),
              (this._differs = n),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            ci() &&
              null != t &&
              "function" != typeof t &&
              console &&
              console.warn &&
              console.warn(
                `trackBy must be a function, but received ${JSON.stringify(
                  t
                )}. ` +
                  "See https://angular.io/api/common/NgForOf#change-propagation for more information."
              ),
              (this._trackByFn = t);
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              if (!this._differ && n)
                try {
                  this._differ = this._differs
                    .find(n)
                    .create(this.ngForTrackBy);
                } catch (e) {
                  throw new Error(
                    `Cannot find a differ supporting object '${n}' of type '${
                      ((t = n), t.name || typeof t)
                    }'. NgFor only supports binding to Iterables such as Arrays.`
                  );
                }
            }
            var t;
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const e = [];
            t.forEachOperation((t, n, i) => {
              if (null == t.previousIndex) {
                const n = this._viewContainer.createEmbeddedView(
                    this._template,
                    new Ec(null, this._ngForOf, -1, -1),
                    null === i ? void 0 : i
                  ),
                  r = new Ac(t, n);
                e.push(r);
              } else if (null == i)
                this._viewContainer.remove(null === n ? void 0 : n);
              else if (null !== n) {
                const r = this._viewContainer.get(n);
                this._viewContainer.move(r, i);
                const o = new Ac(t, r);
                e.push(o);
              }
            });
            for (let n = 0; n < e.length; n++)
              this._perViewChange(e[n].view, e[n].record);
            for (let n = 0, i = this._viewContainer.length; n < i; n++) {
              const t = this._viewContainer.get(n);
              (t.context.index = n),
                (t.context.count = i),
                (t.context.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((t) => {
              this._viewContainer.get(t.currentIndex).context.$implicit =
                t.item;
            });
          }
          _perViewChange(t, e) {
            t.context.$implicit = e.item;
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ea(As), ea(Es), ea(Os));
          }),
          (t.ɵdir = be({
            type: t,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
          })),
          t
        );
      })();
      class Ac {
        constructor(t, e) {
          (this.record = t), (this.view = e);
        }
      }
      let Ic = (() => {
        class t {
          constructor(t, e) {
            (this._viewContainer = t),
              (this._context = new Rc()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = e);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            Nc("ngIfThen", t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            Nc("ngIfElse", t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ea(As), ea(Es));
          }),
          (t.ɵdir = be({
            type: t,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          t
        );
      })();
      class Rc {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Nc(t, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${t} must be a TemplateRef, but received '${yt(e)}'.`
          );
      }
      let Dc = (() => {
          class t {
            constructor(t, e, n) {
              (this._ngEl = t),
                (this._differs = e),
                (this._renderer = n),
                (this._ngStyle = null),
                (this._differ = null);
            }
            set ngStyle(t) {
              (this._ngStyle = t),
                !this._differ &&
                  t &&
                  (this._differ = this._differs.find(t).create());
            }
            ngDoCheck() {
              if (this._differ) {
                const t = this._differ.diff(this._ngStyle);
                t && this._applyChanges(t);
              }
            }
            _setStyle(t, e) {
              const [n, i] = t.split(".");
              null != (e = null != e && i ? `${e}${i}` : e)
                ? this._renderer.setStyle(this._ngEl.nativeElement, n, e)
                : this._renderer.removeStyle(this._ngEl.nativeElement, n);
            }
            _applyChanges(t) {
              t.forEachRemovedItem((t) => this._setStyle(t.key, null)),
                t.forEachAddedItem((t) =>
                  this._setStyle(t.key, t.currentValue)
                ),
                t.forEachChangedItem((t) =>
                  this._setStyle(t.key, t.currentValue)
                );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ea(os), ea(ks), ea(cs));
            }),
            (t.ɵdir = be({
              type: t,
              selectors: [["", "ngStyle", ""]],
              inputs: { ngStyle: "ngStyle" },
            })),
            t
          );
        })(),
        Vc = (() => {
          class t {
            transform(e, n, i) {
              if (null == e) return e;
              if (!this.supports(e))
                throw (function (t, e) {
                  return Error(
                    `InvalidPipeArgument: '${e}' for pipe '${yt(t)}'`
                  );
                })(t, e);
              return e.slice(n, i);
            }
            supports(t) {
              return "string" == typeof t || Array.isArray(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵpipe = _e({ name: "slice", type: t, pure: !1 })),
            t
          );
        })(),
        jc = (() => {
          class t {}
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [{ provide: kc, useClass: Pc }],
            })),
            t
          );
        })(),
        zc = (() => {
          class t {}
          return (
            (t.ɵprov = ct({
              token: t,
              providedIn: "root",
              factory: () => new Uc(Gt(ac), window, Gt(ii)),
            })),
            t
          );
        })();
      class Uc {
        constructor(t, e, n) {
          (this.document = t),
            (this.window = e),
            (this.errorHandler = n),
            (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportScrollRestoration()
            ? [this.window.scrollX, this.window.scrollY]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportScrollRestoration() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (this.supportScrollRestoration()) {
            t =
              this.window.CSS && this.window.CSS.escape
                ? this.window.CSS.escape(t)
                : t.replace(/(\"|\'\ |:|\.|\[|\]|,|=)/g, "\\$1");
            try {
              const e = this.document.querySelector(`#${t}`);
              if (e) return void this.scrollToElement(e);
              const n = this.document.querySelector(`[name='${t}']`);
              if (n) return void this.scrollToElement(n);
            } catch (e) {
              this.errorHandler.handleError(e);
            }
          }
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history;
            e && e.scrollRestoration && (e.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const e = t.getBoundingClientRect(),
            n = e.left + this.window.pageXOffset,
            i = e.top + this.window.pageYOffset,
            r = this.offset();
          this.window.scrollTo(n - r[0], i - r[1]);
        }
        supportScrollRestoration() {
          try {
            return !!this.window && !!this.window.scrollTo;
          } catch (t) {
            return !1;
          }
        }
      }
      class Fc extends class extends class {} {
        constructor() {
          super();
        }
        supportsDOMEvents() {
          return !0;
        }
      } {
        static makeCurrent() {
          var t;
          (t = new Fc()), rc || (rc = t);
        }
        getProperty(t, e) {
          return t[e];
        }
        log(t) {
          window.console && window.console.log && window.console.log(t);
        }
        logGroup(t) {
          window.console && window.console.group && window.console.group(t);
        }
        logGroupEnd() {
          window.console &&
            window.console.groupEnd &&
            window.console.groupEnd();
        }
        onAndCancel(t, e, n) {
          return (
            t.addEventListener(e, n, !1),
            () => {
              t.removeEventListener(e, n, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          return t.parentNode && t.parentNode.removeChild(t), t;
        }
        getValue(t) {
          return t.value;
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return "window" === e
            ? window
            : "document" === e
            ? t
            : "body" === e
            ? t.body
            : null;
        }
        getHistory() {
          return window.history;
        }
        getLocation() {
          return window.location;
        }
        getBaseHref(t) {
          const e =
            Hc || ((Hc = document.querySelector("base")), Hc)
              ? Hc.getAttribute("href")
              : null;
          return null == e
            ? null
            : ((n = e),
              Lc || (Lc = document.createElement("a")),
              Lc.setAttribute("href", n),
              "/" === Lc.pathname.charAt(0) ? Lc.pathname : "/" + Lc.pathname);
          var n;
        }
        resetBaseElement() {
          Hc = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        performanceNow() {
          return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime();
        }
        supportsCookies() {
          return !0;
        }
        getCookie(t) {
          return Mc(document.cookie, t);
        }
      }
      let Lc,
        Hc = null;
      const qc = new jt("TRANSITION_ID"),
        $c = [
          {
            provide: al,
            useFactory: function (t, e, n) {
              return () => {
                n.get(sl).donePromise.then(() => {
                  const n = oc();
                  Array.prototype.slice
                    .apply(e.querySelectorAll("style[ng-transition]"))
                    .filter((e) => e.getAttribute("ng-transition") === t)
                    .forEach((t) => n.remove(t));
                });
              };
            },
            deps: [qc, ac, Vo],
            multi: !0,
          },
        ];
      class Yc {
        static init() {
          var t;
          (t = new Yc()), (Fl = t);
        }
        addToWindow(t) {
          (Et.getAngularTestability = (e, n = !0) => {
            const i = t.findTestabilityInTree(e, n);
            if (null == i)
              throw new Error("Could not find testability for element.");
            return i;
          }),
            (Et.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (Et.getAllAngularRootElements = () => t.getAllRootElements()),
            Et.frameworkStabilizers || (Et.frameworkStabilizers = []),
            Et.frameworkStabilizers.push((t) => {
              const e = Et.getAllAngularTestabilities();
              let n = e.length,
                i = !1;
              const r = function (e) {
                (i = i || e), n--, 0 == n && t(i);
              };
              e.forEach(function (t) {
                t.whenStable(r);
              });
            });
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null;
          const i = t.getTestability(e);
          return null != i
            ? i
            : n
            ? oc().isShadowRoot(e)
              ? this.findTestabilityInTree(t, e.host, !0)
              : this.findTestabilityInTree(t, e.parentElement, !0)
            : null;
        }
      }
      const Bc = new jt("EventManagerPlugins");
      let Gc = (() => {
        class t {
          constructor(t, e) {
            (this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach((t) => (t.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n);
          }
          addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t);
            if (e) return e;
            const n = this._plugins;
            for (let i = 0; i < n.length; i++) {
              const e = n[i];
              if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e;
            }
            throw new Error(`No event manager plugin found for event ${t}`);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(Bc), Gt(Sl));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Xc {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, n) {
          const i = oc().getGlobalEventTarget(this._doc, t);
          if (!i)
            throw new Error(`Unsupported event target ${i} for event ${e}`);
          return this.addEventListener(i, e, n);
        }
      }
      let Wc = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const e = new Set();
              t.forEach((t) => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t));
              }),
                this.onStylesAdded(e);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Zc = (() => {
          class t extends Wc {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Set()),
                (this._styleNodes = new Set()),
                this._hostNodes.add(t.head);
            }
            _addStylesToHost(t, e) {
              t.forEach((t) => {
                const n = this._doc.createElement("style");
                (n.textContent = t), this._styleNodes.add(e.appendChild(n));
              });
            }
            addHost(t) {
              this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t);
            }
            removeHost(t) {
              this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((e) => this._addStylesToHost(t, e));
            }
            ngOnDestroy() {
              this._styleNodes.forEach((t) => oc().remove(t));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(ac));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const Qc = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        Jc = /%COMP%/g;
      function Kc(t, e, n) {
        for (let i = 0; i < e.length; i++) {
          let r = e[i];
          Array.isArray(r) ? Kc(t, r, n) : ((r = r.replace(Jc, t)), n.push(r));
        }
        return n;
      }
      function tu(t) {
        return (e) => {
          if ("__ngUnwrap__" === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let eu = (() => {
        class t {
          constructor(t, e, n) {
            (this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new nu(t));
          }
          createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer;
            switch (e.encapsulation) {
              case se.Emulated: {
                let n = this.rendererByCompId.get(e.id);
                return (
                  n ||
                    ((n = new iu(
                      this.eventManager,
                      this.sharedStylesHost,
                      e,
                      this.appId
                    )),
                    this.rendererByCompId.set(e.id, n)),
                  n.applyToHost(t),
                  n
                );
              }
              case se.Native:
              case se.ShadowDom:
                return new ru(this.eventManager, this.sharedStylesHost, t, e);
              default:
                if (!this.rendererByCompId.has(e.id)) {
                  const t = Kc(e.id, e.styles, []);
                  this.sharedStylesHost.addStyles(t),
                    this.rendererByCompId.set(e.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(Gc), Gt(Zc), Gt(ll));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class nu {
        constructor(t) {
          (this.eventManager = t), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(t, e) {
          return e
            ? document.createElementNS(Qc[e] || e, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          t.appendChild(e);
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let n = "string" == typeof t ? document.querySelector(t) : t;
          if (!n)
            throw new Error(`The selector "${t}" did not match any elements`);
          return e || (n.textContent = ""), n;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, n, i) {
          if (i) {
            e = i + ":" + e;
            const r = Qc[i];
            r ? t.setAttributeNS(r, e, n) : t.setAttribute(e, n);
          } else t.setAttribute(e, n);
        }
        removeAttribute(t, e, n) {
          if (n) {
            const i = Qc[n];
            i ? t.removeAttributeNS(i, e) : t.removeAttribute(`${n}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, n, i) {
          i & ls.DashCase
            ? t.style.setProperty(e, n, i & ls.Important ? "important" : "")
            : (t.style[e] = n);
        }
        removeStyle(t, e, n) {
          n & ls.DashCase ? t.style.removeProperty(e) : (t.style[e] = "");
        }
        setProperty(t, e, n) {
          t[e] = n;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, n) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, tu(n))
            : this.eventManager.addEventListener(t, e, tu(n));
        }
      }
      class iu extends nu {
        constructor(t, e, n, i) {
          super(t), (this.component = n);
          const r = Kc(i + "-" + n.id, n.styles, []);
          e.addStyles(r),
            (this.contentAttr = "_ngcontent-%COMP%".replace(
              Jc,
              i + "-" + n.id
            )),
            (this.hostAttr = (function (t) {
              return "_nghost-%COMP%".replace(Jc, t);
            })(i + "-" + n.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, e) {
          const n = super.createElement(t, e);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      class ru extends nu {
        constructor(t, e, n, i) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = n),
            (this.component = i),
            (this.shadowRoot =
              i.encapsulation === se.ShadowDom
                ? n.attachShadow({ mode: "open" })
                : n.createShadowRoot()),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const r = Kc(i.id, i.styles, []);
          for (let o = 0; o < r.length; o++) {
            const t = document.createElement("style");
            (t.textContent = r[o]), this.shadowRoot.appendChild(t);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let ou = (() => {
        class t extends Xc {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, e, n) {
            return (
              t.addEventListener(e, n, !1),
              () => this.removeEventListener(t, e, n)
            );
          }
          removeEventListener(t, e, n) {
            return t.removeEventListener(e, n);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(ac));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const au = ["alt", "control", "meta", "shift"],
        su = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        lu = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        cu = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let uu = (() => {
        class t extends Xc {
          constructor(t) {
            super(t);
          }
          supports(e) {
            return null != t.parseEventName(e);
          }
          addEventListener(e, n, i) {
            const r = t.parseEventName(n),
              o = t.eventCallback(r.fullKey, i, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => oc().onAndCancel(e, r.domEventName, o));
          }
          static parseEventName(e) {
            const n = e.toLowerCase().split("."),
              i = n.shift();
            if (0 === n.length || ("keydown" !== i && "keyup" !== i))
              return null;
            const r = t._normalizeKey(n.pop());
            let o = "";
            if (
              (au.forEach((t) => {
                const e = n.indexOf(t);
                e > -1 && (n.splice(e, 1), (o += t + "."));
              }),
              (o += r),
              0 != n.length || 0 === r.length)
            )
              return null;
            const a = {};
            return (a.domEventName = i), (a.fullKey = o), a;
          }
          static getEventFullKey(t) {
            let e = "",
              n = (function (t) {
                let e = t.key;
                if (null == e) {
                  if (((e = t.keyIdentifier), null == e)) return "Unidentified";
                  e.startsWith("U+") &&
                    ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                    3 === t.location && lu.hasOwnProperty(e) && (e = lu[e]));
                }
                return su[e] || e;
              })(t);
            return (
              (n = n.toLowerCase()),
              " " === n ? (n = "space") : "." === n && (n = "dot"),
              au.forEach((i) => {
                i != n && (0, cu[i])(t) && (e += i + ".");
              }),
              (e += n),
              e
            );
          }
          static eventCallback(e, n, i) {
            return (r) => {
              t.getEventFullKey(r) === e && i.runGuarded(() => n(r));
            };
          }
          static _normalizeKey(t) {
            switch (t) {
              case "esc":
                return "escape";
              default:
                return t;
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(ac));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const hu = $l(ec, "browser", [
          { provide: dl, useValue: "browser" },
          {
            provide: hl,
            useValue: function () {
              Fc.makeCurrent(), Yc.init();
            },
            multi: !0,
          },
          {
            provide: ac,
            useFactory: function () {
              return (
                (function (t) {
                  Ee = t;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        du = [
          [],
          { provide: vo, useValue: "root" },
          {
            provide: ii,
            useFactory: function () {
              return new ii();
            },
            deps: [],
          },
          { provide: Bc, useClass: ou, multi: !0, deps: [ac, Sl, dl] },
          { provide: Bc, useClass: uu, multi: !0, deps: [ac] },
          [],
          { provide: eu, useClass: eu, deps: [Gc, Zc, ll] },
          { provide: ss, useExisting: eu },
          { provide: Wc, useExisting: Zc },
          { provide: Zc, useClass: Zc, deps: [ac] },
          { provide: Vl, useClass: Vl, deps: [Sl] },
          { provide: Gc, useClass: Gc, deps: [Bc, Sl] },
          [],
        ];
      let pu = (() => {
        class t {
          constructor(t) {
            if (t)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(e) {
            return {
              ngModule: t,
              providers: [
                { provide: ll, useValue: e.appId },
                { provide: qc, useExisting: ll },
                $c,
              ],
            };
          }
        }
        return (
          (t.ɵmod = ge({ type: t })),
          (t.ɵinj = ut({
            factory: function (e) {
              return new (e || t)(Gt(t, 12));
            },
            providers: du,
            imports: [jc, ic],
          })),
          t
        );
      })();
      function fu(...t) {
        let e = t[t.length - 1];
        return M(e) ? (t.pop(), F(t, e)) : B(t);
      }
      "undefined" != typeof window && window;
      class gu extends k {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const e = super._subscribe(t);
          return e && !e.closed && t.next(this._value), e;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new v();
          return this._value;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const mu = (() => {
          function t() {
            return (
              Error.call(this),
              (this.message = "no elements in sequence"),
              (this.name = "EmptyError"),
              this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })(),
        bu = {};
      class _u {
        constructor(t) {
          this.resultSelector = t;
        }
        call(t, e) {
          return e.subscribe(new yu(t, this.resultSelector));
        }
      }
      class yu extends V {
        constructor(t, e) {
          super(t),
            (this.resultSelector = e),
            (this.active = 0),
            (this.values = []),
            (this.observables = []);
        }
        _next(t) {
          this.values.push(bu), this.observables.push(t);
        }
        _complete() {
          const t = this.observables,
            e = t.length;
          if (0 === e) this.destination.complete();
          else {
            (this.active = e), (this.toRespond = e);
            for (let n = 0; n < e; n++) {
              const e = t[n];
              this.add(D(this, e, e, n));
            }
          }
        }
        notifyComplete(t) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(t, e, n, i, r) {
          const o = this.values,
            a = this.toRespond
              ? o[n] === bu
                ? --this.toRespond
                : this.toRespond
              : 0;
          (o[n] = e),
            0 === a &&
              (this.resultSelector
                ? this._tryResultSelector(o)
                : this.destination.next(o.slice()));
        }
        _tryResultSelector(t) {
          let e;
          try {
            e = this.resultSelector.apply(this, t);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      const wu = new w((t) => t.complete());
      function Cu(t) {
        return t
          ? (function (t) {
              return new w((e) => t.schedule(() => e.complete()));
            })(t)
          : wu;
      }
      function vu(t) {
        return new w((e) => {
          let n;
          try {
            n = t();
          } catch (i) {
            return void e.error(i);
          }
          return (n ? L(n) : Cu()).subscribe(e);
        });
      }
      function xu() {
        return Y(1);
      }
      function Ou(t, e) {
        return function (n) {
          return n.lift(new ku(t, e));
        };
      }
      class ku {
        constructor(t, e) {
          (this.predicate = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new Pu(t, this.predicate, this.thisArg));
        }
      }
      class Pu extends f {
        constructor(t, e, n) {
          super(t), (this.predicate = e), (this.thisArg = n), (this.count = 0);
        }
        _next(t) {
          let e;
          try {
            e = this.predicate.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          e && this.destination.next(t);
        }
      }
      const Mu = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "argument out of range"),
            (this.name = "ArgumentOutOfRangeError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      function Su(t) {
        return function (e) {
          return 0 === t ? Cu() : e.lift(new Eu(t));
        };
      }
      class Eu {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Mu();
        }
        call(t, e) {
          return e.subscribe(new Tu(t, this.total));
        }
      }
      class Tu extends f {
        constructor(t, e) {
          super(t),
            (this.total = e),
            (this.ring = new Array()),
            (this.count = 0);
        }
        _next(t) {
          const e = this.ring,
            n = this.total,
            i = this.count++;
          e.length < n ? e.push(t) : (e[i % n] = t);
        }
        _complete() {
          const t = this.destination;
          let e = this.count;
          if (e > 0) {
            const n = this.count >= this.total ? this.total : this.count,
              i = this.ring;
            for (let r = 0; r < n; r++) {
              const r = e++ % n;
              t.next(i[r]);
            }
          }
          t.complete();
        }
      }
      function Au(t = Nu) {
        return (e) => e.lift(new Iu(t));
      }
      class Iu {
        constructor(t) {
          this.errorFactory = t;
        }
        call(t, e) {
          return e.subscribe(new Ru(t, this.errorFactory));
        }
      }
      class Ru extends f {
        constructor(t, e) {
          super(t), (this.errorFactory = e), (this.hasValue = !1);
        }
        _next(t) {
          (this.hasValue = !0), this.destination.next(t);
        }
        _complete() {
          if (this.hasValue) return this.destination.complete();
          {
            let e;
            try {
              e = this.errorFactory();
            } catch (t) {
              e = t;
            }
            this.destination.error(e);
          }
        }
      }
      function Nu() {
        return new mu();
      }
      function Du(t = null) {
        return (e) => e.lift(new Vu(t));
      }
      class Vu {
        constructor(t) {
          this.defaultValue = t;
        }
        call(t, e) {
          return e.subscribe(new ju(t, this.defaultValue));
        }
      }
      class ju extends f {
        constructor(t, e) {
          super(t), (this.defaultValue = e), (this.isEmpty = !0);
        }
        _next(t) {
          (this.isEmpty = !1), this.destination.next(t);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete();
        }
      }
      function zu(t, e) {
        const n = arguments.length >= 2;
        return (i) =>
          i.pipe(
            t ? Ou((e, n) => t(e, n, i)) : b,
            Su(1),
            n ? Du(e) : Au(() => new mu())
          );
      }
      function Uu(t) {
        return function (e) {
          const n = new Fu(t),
            i = e.lift(n);
          return (n.caught = i);
        };
      }
      class Fu {
        constructor(t) {
          this.selector = t;
        }
        call(t, e) {
          return e.subscribe(new Lu(t, this.selector, this.caught));
        }
      }
      class Lu extends V {
        constructor(t, e, n) {
          super(t), (this.selector = e), (this.caught = n);
        }
        error(t) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(t, this.caught);
            } catch (e) {
              return void super.error(e);
            }
            this._unsubscribeAndRecycle();
            const i = new S(this, void 0, void 0);
            this.add(i);
            const r = D(this, n, void 0, void 0, i);
            r !== i && this.add(r);
          }
        }
      }
      function Hu(t) {
        return (e) => (0 === t ? Cu() : e.lift(new qu(t)));
      }
      class qu {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Mu();
        }
        call(t, e) {
          return e.subscribe(new $u(t, this.total));
        }
      }
      class $u extends f {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0);
        }
        _next(t) {
          const e = this.total,
            n = ++this.count;
          n <= e &&
            (this.destination.next(t),
            n === e && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function Yu(t, e) {
        const n = arguments.length >= 2;
        return (i) =>
          i.pipe(
            t ? Ou((e, n) => t(e, n, i)) : b,
            Hu(1),
            n ? Du(e) : Au(() => new mu())
          );
      }
      class Bu {
        constructor(t, e, n) {
          (this.predicate = t), (this.thisArg = e), (this.source = n);
        }
        call(t, e) {
          return e.subscribe(
            new Gu(t, this.predicate, this.thisArg, this.source)
          );
        }
      }
      class Gu extends f {
        constructor(t, e, n, i) {
          super(t),
            (this.predicate = e),
            (this.thisArg = n),
            (this.source = i),
            (this.index = 0),
            (this.thisArg = n || this);
        }
        notifyComplete(t) {
          this.destination.next(t), this.destination.complete();
        }
        _next(t) {
          let e = !1;
          try {
            e = this.predicate.call(this.thisArg, t, this.index++, this.source);
          } catch (n) {
            return void this.destination.error(n);
          }
          e || this.notifyComplete(!1);
        }
        _complete() {
          this.notifyComplete(!0);
        }
      }
      function Xu(t, e) {
        return "function" == typeof e
          ? (n) =>
              n.pipe(Xu((n, i) => L(t(n, i)).pipe(j((t, r) => e(n, t, i, r)))))
          : (e) => e.lift(new Wu(t));
      }
      class Wu {
        constructor(t) {
          this.project = t;
        }
        call(t, e) {
          return e.subscribe(new Zu(t, this.project));
        }
      }
      class Zu extends V {
        constructor(t, e) {
          super(t), (this.project = e), (this.index = 0);
        }
        _next(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (i) {
            return void this.destination.error(i);
          }
          this._innerSub(e, t, n);
        }
        _innerSub(t, e, n) {
          const i = this.innerSubscription;
          i && i.unsubscribe();
          const r = new S(this, e, n),
            o = this.destination;
          o.add(r),
            (this.innerSubscription = D(this, t, void 0, void 0, r)),
            this.innerSubscription !== r && o.add(this.innerSubscription);
        }
        _complete() {
          const { innerSubscription: t } = this;
          (t && !t.closed) || super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = null;
        }
        notifyComplete(t) {
          this.destination.remove(t),
            (this.innerSubscription = null),
            this.isStopped && super._complete();
        }
        notifyNext(t, e, n, i, r) {
          this.destination.next(e);
        }
      }
      function Qu(...t) {
        return xu()(fu(...t));
      }
      function Ju(t, e) {
        let n = !1;
        return (
          arguments.length >= 2 && (n = !0),
          function (i) {
            return i.lift(new Ku(t, e, n));
          }
        );
      }
      class Ku {
        constructor(t, e, n = !1) {
          (this.accumulator = t), (this.seed = e), (this.hasSeed = n);
        }
        call(t, e) {
          return e.subscribe(
            new th(t, this.accumulator, this.seed, this.hasSeed)
          );
        }
      }
      class th extends f {
        constructor(t, e, n, i) {
          super(t),
            (this.accumulator = e),
            (this._seed = n),
            (this.hasSeed = i),
            (this.index = 0);
        }
        get seed() {
          return this._seed;
        }
        set seed(t) {
          (this.hasSeed = !0), (this._seed = t);
        }
        _next(t) {
          if (this.hasSeed) return this._tryNext(t);
          (this.seed = t), this.destination.next(t);
        }
        _tryNext(t) {
          const e = this.index++;
          let n;
          try {
            n = this.accumulator(this.seed, t, e);
          } catch (i) {
            this.destination.error(i);
          }
          (this.seed = n), this.destination.next(n);
        }
      }
      function eh(t, e) {
        return H(t, e, 1);
      }
      function nh() {}
      function ih(t, e, n) {
        return function (i) {
          return i.lift(new rh(t, e, n));
        };
      }
      class rh {
        constructor(t, e, n) {
          (this.nextOrObserver = t), (this.error = e), (this.complete = n);
        }
        call(t, e) {
          return e.subscribe(
            new oh(t, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class oh extends f {
        constructor(t, e, n, r) {
          super(t),
            (this._tapNext = nh),
            (this._tapError = nh),
            (this._tapComplete = nh),
            (this._tapError = n || nh),
            (this._tapComplete = r || nh),
            i(e)
              ? ((this._context = this), (this._tapNext = e))
              : e &&
                ((this._context = e),
                (this._tapNext = e.next || nh),
                (this._tapError = e.error || nh),
                (this._tapComplete = e.complete || nh));
        }
        _next(t) {
          try {
            this._tapNext.call(this._context, t);
          } catch (e) {
            return void this.destination.error(e);
          }
          this.destination.next(t);
        }
        _error(t) {
          try {
            this._tapError.call(this._context, t);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.error(t);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (t) {
            return void this.destination.error(t);
          }
          return this.destination.complete();
        }
      }
      class ah {
        constructor(t) {
          this.callback = t;
        }
        call(t, e) {
          return e.subscribe(new sh(t, this.callback));
        }
      }
      class sh extends f {
        constructor(t, e) {
          super(t), this.add(new h(e));
        }
      }
      class lh {
        constructor(t, e) {
          (this.id = t), (this.url = e);
        }
      }
      class ch extends lh {
        constructor(t, e, n = "imperative", i = null) {
          super(t, e), (this.navigationTrigger = n), (this.restoredState = i);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class uh extends lh {
        constructor(t, e, n) {
          super(t, e), (this.urlAfterRedirects = n);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class hh extends lh {
        constructor(t, e, n) {
          super(t, e), (this.reason = n);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class dh extends lh {
        constructor(t, e, n) {
          super(t, e), (this.error = n);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class ph extends lh {
        constructor(t, e, n, i) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = i);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class fh extends lh {
        constructor(t, e, n, i) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = i);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class gh extends lh {
        constructor(t, e, n, i, r) {
          super(t, e),
            (this.urlAfterRedirects = n),
            (this.state = i),
            (this.shouldActivate = r);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class mh extends lh {
        constructor(t, e, n, i) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = i);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class bh extends lh {
        constructor(t, e, n, i) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = i);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class _h {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class yh {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class wh {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Ch {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class vh {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class xh {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Oh {
        constructor(t, e, n) {
          (this.routerEvent = t), (this.position = e), (this.anchor = n);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      let kh = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = he({
            type: t,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (t, e) {
              1 & t && sa(0, "router-outlet");
            },
            directives: function () {
              return [Pp];
            },
            encapsulation: 2,
          })),
          t
        );
      })();
      class Ph {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return this.params.hasOwnProperty(t);
        }
        get(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e[0] : e;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e : [e];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Mh(t) {
        return new Ph(t);
      }
      function Sh(t) {
        const e = Error("NavigationCancelingError: " + t);
        return (e.ngNavigationCancelingError = !0), e;
      }
      function Eh(t, e, n) {
        const i = n.path.split("/");
        if (i.length > t.length) return null;
        if ("full" === n.pathMatch && (e.hasChildren() || i.length < t.length))
          return null;
        const r = {};
        for (let o = 0; o < i.length; o++) {
          const e = i[o],
            n = t[o];
          if (e.startsWith(":")) r[e.substring(1)] = n;
          else if (e !== n.path) return null;
        }
        return { consumed: t.slice(0, i.length), posParams: r };
      }
      class Th {
        constructor(t, e) {
          (this.routes = t), (this.module = e);
        }
      }
      function Ah(t, e = "") {
        for (let n = 0; n < t.length; n++) {
          const i = t[n];
          Ih(i, Rh(e, i));
        }
      }
      function Ih(t, e) {
        if (!t)
          throw new Error(
            `\n      Invalid configuration of route '${e}': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    `
          );
        if (Array.isArray(t))
          throw new Error(
            `Invalid configuration of route '${e}': Array cannot be specified`
          );
        if (
          !t.component &&
          !t.children &&
          !t.loadChildren &&
          t.outlet &&
          "primary" !== t.outlet
        )
          throw new Error(
            `Invalid configuration of route '${e}': a componentless route without children or loadChildren cannot have a named outlet set`
          );
        if (t.redirectTo && t.children)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and children cannot be used together`
          );
        if (t.redirectTo && t.loadChildren)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and loadChildren cannot be used together`
          );
        if (t.children && t.loadChildren)
          throw new Error(
            `Invalid configuration of route '${e}': children and loadChildren cannot be used together`
          );
        if (t.redirectTo && t.component)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and component cannot be used together`
          );
        if (t.path && t.matcher)
          throw new Error(
            `Invalid configuration of route '${e}': path and matcher cannot be used together`
          );
        if (
          void 0 === t.redirectTo &&
          !t.component &&
          !t.children &&
          !t.loadChildren
        )
          throw new Error(
            `Invalid configuration of route '${e}'. One of the following must be provided: component, redirectTo, children or loadChildren`
          );
        if (void 0 === t.path && void 0 === t.matcher)
          throw new Error(
            `Invalid configuration of route '${e}': routes must have either a path or a matcher specified`
          );
        if ("string" == typeof t.path && "/" === t.path.charAt(0))
          throw new Error(
            `Invalid configuration of route '${e}': path cannot start with a slash`
          );
        if ("" === t.path && void 0 !== t.redirectTo && void 0 === t.pathMatch)
          throw new Error(
            `Invalid configuration of route '{path: "${e}", redirectTo: "${t.redirectTo}"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`
          );
        if (
          void 0 !== t.pathMatch &&
          "full" !== t.pathMatch &&
          "prefix" !== t.pathMatch
        )
          throw new Error(
            `Invalid configuration of route '${e}': pathMatch can only be set to 'prefix' or 'full'`
          );
        t.children && Ah(t.children, e);
      }
      function Rh(t, e) {
        return e
          ? t || e.path
            ? t && !e.path
              ? `${t}/`
              : !t && e.path
              ? e.path
              : `${t}/${e.path}`
            : ""
          : t;
      }
      function Nh(t) {
        const e = t.children && t.children.map(Nh),
          n = e
            ? Object.assign(Object.assign({}, t), { children: e })
            : Object.assign({}, t);
        return (
          !n.component &&
            (e || n.loadChildren) &&
            n.outlet &&
            "primary" !== n.outlet &&
            (n.component = kh),
          n
        );
      }
      function Dh(t, e) {
        const n = Object.keys(t),
          i = Object.keys(e);
        if (!n || !i || n.length != i.length) return !1;
        let r;
        for (let o = 0; o < n.length; o++)
          if (((r = n[o]), !Vh(t[r], e[r]))) return !1;
        return !0;
      }
      function Vh(t, e) {
        return Array.isArray(t) && Array.isArray(e)
          ? t.length == e.length && t.every((t) => e.indexOf(t) > -1)
          : t === e;
      }
      function jh(t) {
        return Array.prototype.concat.apply([], t);
      }
      function zh(t) {
        return t.length > 0 ? t[t.length - 1] : null;
      }
      function Uh(t, e) {
        for (const n in t) t.hasOwnProperty(n) && e(t[n], n);
      }
      function Fh(t) {
        return ua(t) ? t : ca(t) ? L(Promise.resolve(t)) : fu(t);
      }
      function Lh(t, e, n) {
        return n
          ? (function (t, e) {
              return Dh(t, e);
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                if (!Yh(e.segments, n.segments)) return !1;
                if (e.numberOfChildren !== n.numberOfChildren) return !1;
                for (const i in n.children) {
                  if (!e.children[i]) return !1;
                  if (!t(e.children[i], n.children[i])) return !1;
                }
                return !0;
              })(t.root, e.root)
          : (function (t, e) {
              return (
                Object.keys(e).length <= Object.keys(t).length &&
                Object.keys(e).every((n) => Vh(t[n], e[n]))
              );
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                return (function e(n, i, r) {
                  if (n.segments.length > r.length)
                    return (
                      !!Yh(n.segments.slice(0, r.length), r) && !i.hasChildren()
                    );
                  if (n.segments.length === r.length) {
                    if (!Yh(n.segments, r)) return !1;
                    for (const e in i.children) {
                      if (!n.children[e]) return !1;
                      if (!t(n.children[e], i.children[e])) return !1;
                    }
                    return !0;
                  }
                  {
                    const t = r.slice(0, n.segments.length),
                      o = r.slice(n.segments.length);
                    return (
                      !!Yh(n.segments, t) &&
                      !!n.children.primary &&
                      e(n.children.primary, i, o)
                    );
                  }
                })(e, n, n.segments);
              })(t.root, e.root);
      }
      class Hh {
        constructor(t, e, n) {
          (this.root = t), (this.queryParams = e), (this.fragment = n);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Mh(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return Wh.serialize(this);
        }
      }
      class qh {
        constructor(t, e) {
          (this.segments = t),
            (this.children = e),
            (this.parent = null),
            Uh(e, (t, e) => (t.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Zh(this);
        }
      }
      class $h {
        constructor(t, e) {
          (this.path = t), (this.parameters = e);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Mh(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return nd(this);
        }
      }
      function Yh(t, e) {
        return t.length === e.length && t.every((t, n) => t.path === e[n].path);
      }
      function Bh(t, e) {
        let n = [];
        return (
          Uh(t.children, (t, i) => {
            "primary" === i && (n = n.concat(e(t, i)));
          }),
          Uh(t.children, (t, i) => {
            "primary" !== i && (n = n.concat(e(t, i)));
          }),
          n
        );
      }
      class Gh {}
      class Xh {
        parse(t) {
          const e = new sd(t);
          return new Hh(
            e.parseRootSegment(),
            e.parseQueryParams(),
            e.parseFragment()
          );
        }
        serialize(t) {
          var e;
          return `${`/${(function t(e, n) {
            if (!e.hasChildren()) return Zh(e);
            if (n) {
              const n = e.children.primary ? t(e.children.primary, !1) : "",
                i = [];
              return (
                Uh(e.children, (e, n) => {
                  "primary" !== n && i.push(`${n}:${t(e, !1)}`);
                }),
                i.length > 0 ? `${n}(${i.join("//")})` : n
              );
            }
            {
              const n = Bh(e, (n, i) =>
                "primary" === i
                  ? [t(e.children.primary, !1)]
                  : [`${i}:${t(n, !1)}`]
              );
              return `${Zh(e)}/(${n.join("//")})`;
            }
          })(t.root, !0)}`}${(function (t) {
            const e = Object.keys(t).map((e) => {
              const n = t[e];
              return Array.isArray(n)
                ? n.map((t) => `${Jh(e)}=${Jh(t)}`).join("&")
                : `${Jh(e)}=${Jh(n)}`;
            });
            return e.length ? `?${e.join("&")}` : "";
          })(t.queryParams)}${
            "string" == typeof t.fragment
              ? `#${((e = t.fragment), encodeURI(e))}`
              : ""
          }`;
        }
      }
      const Wh = new Xh();
      function Zh(t) {
        return t.segments.map((t) => nd(t)).join("/");
      }
      function Qh(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Jh(t) {
        return Qh(t).replace(/%3B/gi, ";");
      }
      function Kh(t) {
        return Qh(t)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function td(t) {
        return decodeURIComponent(t);
      }
      function ed(t) {
        return td(t.replace(/\+/g, "%20"));
      }
      function nd(t) {
        return `${Kh(t.path)}${
          ((e = t.parameters),
          Object.keys(e)
            .map((t) => `;${Kh(t)}=${Kh(e[t])}`)
            .join(""))
        }`;
        var e;
      }
      const id = /^[^\/()?;=#]+/;
      function rd(t) {
        const e = t.match(id);
        return e ? e[0] : "";
      }
      const od = /^[^=?&#]+/,
        ad = /^[^?&#]+/;
      class sd {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new qh([], {})
              : new qh([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let e = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (e = this.parseParens(!0)));
          let n = {};
          return (
            this.peekStartsWith("(") && (n = this.parseParens(!1)),
            (t.length > 0 || Object.keys(e).length > 0) &&
              (n.primary = new qh(t, e)),
            n
          );
        }
        parseSegment() {
          const t = rd(this.remaining);
          if ("" === t && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(t), new $h(td(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const e = rd(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = rd(this.remaining);
            t && ((n = t), this.capture(n));
          }
          t[td(e)] = td(n);
        }
        parseQueryParam(t) {
          const e = (function (t) {
            const e = t.match(od);
            return e ? e[0] : "";
          })(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = (function (t) {
              const e = t.match(ad);
              return e ? e[0] : "";
            })(this.remaining);
            t && ((n = t), this.capture(n));
          }
          const i = ed(e),
            r = ed(n);
          if (t.hasOwnProperty(i)) {
            let e = t[i];
            Array.isArray(e) || ((e = [e]), (t[i] = e)), e.push(r);
          } else t[i] = r;
        }
        parseParens(t) {
          const e = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const n = rd(this.remaining),
              i = this.remaining[n.length];
            if ("/" !== i && ")" !== i && ";" !== i)
              throw new Error(`Cannot parse url '${this.url}'`);
            let r = void 0;
            n.indexOf(":") > -1
              ? ((r = n.substr(0, n.indexOf(":"))),
                this.capture(r),
                this.capture(":"))
              : t && (r = "primary");
            const o = this.parseChildren();
            (e[r] = 1 === Object.keys(o).length ? o.primary : new qh([], o)),
              this.consumeOptional("//");
          }
          return e;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`);
        }
      }
      class ld {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const e = this.pathFromRoot(t);
          return e.length > 1 ? e[e.length - 2] : null;
        }
        children(t) {
          const e = cd(t, this._root);
          return e ? e.children.map((t) => t.value) : [];
        }
        firstChild(t) {
          const e = cd(t, this._root);
          return e && e.children.length > 0 ? e.children[0].value : null;
        }
        siblings(t) {
          const e = ud(t, this._root);
          return e.length < 2
            ? []
            : e[e.length - 2].children
                .map((t) => t.value)
                .filter((e) => e !== t);
        }
        pathFromRoot(t) {
          return ud(t, this._root).map((t) => t.value);
        }
      }
      function cd(t, e) {
        if (t === e.value) return e;
        for (const n of e.children) {
          const e = cd(t, n);
          if (e) return e;
        }
        return null;
      }
      function ud(t, e) {
        if (t === e.value) return [e];
        for (const n of e.children) {
          const i = ud(t, n);
          if (i.length) return i.unshift(e), i;
        }
        return [];
      }
      class hd {
        constructor(t, e) {
          (this.value = t), (this.children = e);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function dd(t) {
        const e = {};
        return t && t.children.forEach((t) => (e[t.value.outlet] = t)), e;
      }
      class pd extends ld {
        constructor(t, e) {
          super(t), (this.snapshot = e), yd(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function fd(t, e) {
        const n = (function (t, e) {
            const n = new bd(
              [],
              {},
              {},
              "",
              {},
              "primary",
              e,
              null,
              t.root,
              -1,
              {}
            );
            return new _d("", new hd(n, []));
          })(t, e),
          i = new gu([new $h("", {})]),
          r = new gu({}),
          o = new gu({}),
          a = new gu({}),
          s = new gu(""),
          l = new gd(i, r, a, s, o, "primary", e, n.root);
        return (l.snapshot = n.root), new pd(new hd(l, []), n);
      }
      class gd {
        constructor(t, e, n, i, r, o, a, s) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = i),
            (this.data = r),
            (this.outlet = o),
            (this.component = a),
            (this._futureSnapshot = s);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(j((t) => Mh(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(j((t) => Mh(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function md(t, e = "emptyOnly") {
        const n = t.pathFromRoot;
        let i = 0;
        if ("always" !== e)
          for (i = n.length - 1; i >= 1; ) {
            const t = n[i],
              e = n[i - 1];
            if (t.routeConfig && "" === t.routeConfig.path) i--;
            else {
              if (e.component) break;
              i--;
            }
          }
        return (function (t) {
          return t.reduce(
            (t, e) => ({
              params: Object.assign(Object.assign({}, t.params), e.params),
              data: Object.assign(Object.assign({}, t.data), e.data),
              resolve: Object.assign(
                Object.assign({}, t.resolve),
                e._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(i));
      }
      class bd {
        constructor(t, e, n, i, r, o, a, s, l, c, u) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = i),
            (this.data = r),
            (this.outlet = o),
            (this.component = a),
            (this.routeConfig = s),
            (this._urlSegment = l),
            (this._lastPathIndex = c),
            (this._resolve = u);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Mh(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Mh(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((t) => t.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class _d extends ld {
        constructor(t, e) {
          super(e), (this.url = t), yd(this, e);
        }
        toString() {
          return wd(this._root);
        }
      }
      function yd(t, e) {
        (e.value._routerState = t), e.children.forEach((e) => yd(t, e));
      }
      function wd(t) {
        const e =
          t.children.length > 0 ? ` { ${t.children.map(wd).join(", ")} } ` : "";
        return `${t.value}${e}`;
      }
      function Cd(t) {
        if (t.snapshot) {
          const e = t.snapshot,
            n = t._futureSnapshot;
          (t.snapshot = n),
            Dh(e.queryParams, n.queryParams) ||
              t.queryParams.next(n.queryParams),
            e.fragment !== n.fragment && t.fragment.next(n.fragment),
            Dh(e.params, n.params) || t.params.next(n.params),
            (function (t, e) {
              if (t.length !== e.length) return !1;
              for (let n = 0; n < t.length; ++n) if (!Dh(t[n], e[n])) return !1;
              return !0;
            })(e.url, n.url) || t.url.next(n.url),
            Dh(e.data, n.data) || t.data.next(n.data);
        } else
          (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data);
      }
      function vd(t, e) {
        var n, i;
        return (
          Dh(t.params, e.params) &&
          Yh((n = t.url), (i = e.url)) &&
          n.every((t, e) => Dh(t.parameters, i[e].parameters)) &&
          !(!t.parent != !e.parent) &&
          (!t.parent || vd(t.parent, e.parent))
        );
      }
      function xd(t) {
        return (
          "object" == typeof t && null != t && !t.outlets && !t.segmentPath
        );
      }
      function Od(t, e, n, i, r) {
        let o = {};
        return (
          i &&
            Uh(i, (t, e) => {
              o[e] = Array.isArray(t) ? t.map((t) => `${t}`) : `${t}`;
            }),
          new Hh(
            n.root === t
              ? e
              : (function t(e, n, i) {
                  const r = {};
                  return (
                    Uh(e.children, (e, o) => {
                      r[o] = e === n ? i : t(e, n, i);
                    }),
                    new qh(e.segments, r)
                  );
                })(n.root, t, e),
            o,
            r
          )
        );
      }
      class kd {
        constructor(t, e, n) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = e),
            (this.commands = n),
            t && n.length > 0 && xd(n[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const i = n.find(
            (t) => "object" == typeof t && null != t && t.outlets
          );
          if (i && i !== zh(n))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Pd {
        constructor(t, e, n) {
          (this.segmentGroup = t), (this.processChildren = e), (this.index = n);
        }
      }
      function Md(t) {
        return "object" == typeof t && null != t && t.outlets
          ? t.outlets.primary
          : `${t}`;
      }
      function Sd(t, e, n) {
        if (
          (t || (t = new qh([], {})),
          0 === t.segments.length && t.hasChildren())
        )
          return Ed(t, e, n);
        const i = (function (t, e, n) {
            let i = 0,
              r = e;
            const o = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; r < t.segments.length; ) {
              if (i >= n.length) return o;
              const e = t.segments[r],
                a = Md(n[i]),
                s = i < n.length - 1 ? n[i + 1] : null;
              if (r > 0 && void 0 === a) break;
              if (a && s && "object" == typeof s && void 0 === s.outlets) {
                if (!Rd(a, s, e)) return o;
                i += 2;
              } else {
                if (!Rd(a, {}, e)) return o;
                i++;
              }
              r++;
            }
            return { match: !0, pathIndex: r, commandIndex: i };
          })(t, e, n),
          r = n.slice(i.commandIndex);
        if (i.match && i.pathIndex < t.segments.length) {
          const e = new qh(t.segments.slice(0, i.pathIndex), {});
          return (
            (e.children.primary = new qh(
              t.segments.slice(i.pathIndex),
              t.children
            )),
            Ed(e, 0, r)
          );
        }
        return i.match && 0 === r.length
          ? new qh(t.segments, {})
          : i.match && !t.hasChildren()
          ? Td(t, e, n)
          : i.match
          ? Ed(t, 0, r)
          : Td(t, e, n);
      }
      function Ed(t, e, n) {
        if (0 === n.length) return new qh(t.segments, {});
        {
          const i = (function (t) {
              return "object" != typeof t[0] || void 0 === t[0].outlets
                ? { primary: t }
                : t[0].outlets;
            })(n),
            r = {};
          return (
            Uh(i, (n, i) => {
              null !== n && (r[i] = Sd(t.children[i], e, n));
            }),
            Uh(t.children, (t, e) => {
              void 0 === i[e] && (r[e] = t);
            }),
            new qh(t.segments, r)
          );
        }
      }
      function Td(t, e, n) {
        const i = t.segments.slice(0, e);
        let r = 0;
        for (; r < n.length; ) {
          if ("object" == typeof n[r] && void 0 !== n[r].outlets) {
            const t = Ad(n[r].outlets);
            return new qh(i, t);
          }
          if (0 === r && xd(n[0])) {
            i.push(new $h(t.segments[e].path, n[0])), r++;
            continue;
          }
          const o = Md(n[r]),
            a = r < n.length - 1 ? n[r + 1] : null;
          o && a && xd(a)
            ? (i.push(new $h(o, Id(a))), (r += 2))
            : (i.push(new $h(o, {})), r++);
        }
        return new qh(i, {});
      }
      function Ad(t) {
        const e = {};
        return (
          Uh(t, (t, n) => {
            null !== t && (e[n] = Td(new qh([], {}), 0, t));
          }),
          e
        );
      }
      function Id(t) {
        const e = {};
        return Uh(t, (t, n) => (e[n] = `${t}`)), e;
      }
      function Rd(t, e, n) {
        return t == n.path && Dh(e, n.parameters);
      }
      class Nd {
        constructor(t, e, n, i) {
          (this.routeReuseStrategy = t),
            (this.futureState = e),
            (this.currState = n),
            (this.forwardEvent = i);
        }
        activate(t) {
          const e = this.futureState._root,
            n = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(e, n, t),
            Cd(this.futureState.root),
            this.activateChildRoutes(e, n, t);
        }
        deactivateChildRoutes(t, e, n) {
          const i = dd(e);
          t.children.forEach((t) => {
            const e = t.value.outlet;
            this.deactivateRoutes(t, i[e], n), delete i[e];
          }),
            Uh(i, (t, e) => {
              this.deactivateRouteAndItsChildren(t, n);
            });
        }
        deactivateRoutes(t, e, n) {
          const i = t.value,
            r = e ? e.value : null;
          if (i === r)
            if (i.component) {
              const r = n.getContext(i.outlet);
              r && this.deactivateChildRoutes(t, e, r.children);
            } else this.deactivateChildRoutes(t, e, n);
          else r && this.deactivateRouteAndItsChildren(e, n);
        }
        deactivateRouteAndItsChildren(t, e) {
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, e)
            : this.deactivateRouteAndOutlet(t, e);
        }
        detachAndStoreRouteSubtree(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n && n.outlet) {
            const e = n.outlet.detach(),
              i = n.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: e,
              route: t,
              contexts: i,
            });
          }
        }
        deactivateRouteAndOutlet(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n) {
            const i = dd(t),
              r = t.value.component ? n.children : e;
            Uh(i, (t, e) => this.deactivateRouteAndItsChildren(t, r)),
              n.outlet &&
                (n.outlet.deactivate(), n.children.onOutletDeactivated());
          }
        }
        activateChildRoutes(t, e, n) {
          const i = dd(e);
          t.children.forEach((t) => {
            this.activateRoutes(t, i[t.value.outlet], n),
              this.forwardEvent(new xh(t.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new Ch(t.value.snapshot));
        }
        activateRoutes(t, e, n) {
          const i = t.value,
            r = e ? e.value : null;
          if ((Cd(i), i === r))
            if (i.component) {
              const r = n.getOrCreateContext(i.outlet);
              this.activateChildRoutes(t, e, r.children);
            } else this.activateChildRoutes(t, e, n);
          else if (i.component) {
            const e = n.getOrCreateContext(i.outlet);
            if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
              const t = this.routeReuseStrategy.retrieve(i.snapshot);
              this.routeReuseStrategy.store(i.snapshot, null),
                e.children.onOutletReAttached(t.contexts),
                (e.attachRef = t.componentRef),
                (e.route = t.route.value),
                e.outlet && e.outlet.attach(t.componentRef, t.route.value),
                Dd(t.route);
            } else {
              const n = (function (t) {
                  for (let e = t.parent; e; e = e.parent) {
                    const t = e.routeConfig;
                    if (t && t._loadedConfig) return t._loadedConfig;
                    if (t && t.component) return null;
                  }
                  return null;
                })(i.snapshot),
                r = n ? n.module.componentFactoryResolver : null;
              (e.attachRef = null),
                (e.route = i),
                (e.resolver = r),
                e.outlet && e.outlet.activateWith(i, r),
                this.activateChildRoutes(t, null, e.children);
            }
          } else this.activateChildRoutes(t, null, n);
        }
      }
      function Dd(t) {
        Cd(t.value), t.children.forEach(Dd);
      }
      function Vd(t) {
        return "function" == typeof t;
      }
      function jd(t) {
        return t instanceof Hh;
      }
      class zd {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class Ud {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Fd(t) {
        return new w((e) => e.error(new zd(t)));
      }
      function Ld(t) {
        return new w((e) => e.error(new Ud(t)));
      }
      function Hd(t) {
        return new w((e) =>
          e.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${t}'`
            )
          )
        );
      }
      class qd {
        constructor(t, e, n, i, r) {
          (this.configLoader = e),
            (this.urlSerializer = n),
            (this.urlTree = i),
            (this.config = r),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(Qt));
        }
        apply() {
          return this.expandSegmentGroup(
            this.ngModule,
            this.config,
            this.urlTree.root,
            "primary"
          )
            .pipe(
              j((t) =>
                this.createUrlTree(
                  t,
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Uu((t) => {
                if (t instanceof Ud)
                  return (this.allowRedirects = !1), this.match(t.urlTree);
                if (t instanceof zd) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(
            this.ngModule,
            this.config,
            t.root,
            "primary"
          )
            .pipe(j((e) => this.createUrlTree(e, t.queryParams, t.fragment)))
            .pipe(
              Uu((t) => {
                if (t instanceof zd) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
          );
        }
        createUrlTree(t, e, n) {
          const i = t.segments.length > 0 ? new qh([], { primary: t }) : t;
          return new Hh(i, e, n);
        }
        expandSegmentGroup(t, e, n, i) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.expandChildren(t, e, n).pipe(j((t) => new qh([], t)))
            : this.expandSegment(t, n, e, n.segments, i, !0);
        }
        expandChildren(t, e, n) {
          return (function (t, e) {
            if (0 === Object.keys(t).length) return fu({});
            const n = [],
              i = [],
              r = {};
            return (
              Uh(t, (t, o) => {
                const a = e(o, t).pipe(j((t) => (r[o] = t)));
                "primary" === o ? n.push(a) : i.push(a);
              }),
              fu.apply(null, n.concat(i)).pipe(
                xu(),
                zu(),
                j(() => r)
              )
            );
          })(n.children, (n, i) => this.expandSegmentGroup(t, e, i, n));
        }
        expandSegment(t, e, n, i, r, o) {
          return fu(...n).pipe(
            j((a) =>
              this.expandSegmentAgainstRoute(t, e, n, a, i, r, o).pipe(
                Uu((t) => {
                  if (t instanceof zd) return fu(null);
                  throw t;
                })
              )
            ),
            xu(),
            Yu((t) => !!t),
            Uu((t, n) => {
              if (t instanceof mu || "EmptyError" === t.name) {
                if (this.noLeftoversInUrl(e, i, r)) return fu(new qh([], {}));
                throw new zd(e);
              }
              throw t;
            })
          );
        }
        noLeftoversInUrl(t, e, n) {
          return 0 === e.length && !t.children[n];
        }
        expandSegmentAgainstRoute(t, e, n, i, r, o, a) {
          return Gd(i) !== o
            ? Fd(e)
            : void 0 === i.redirectTo
            ? this.matchSegmentAgainstRoute(t, e, i, r)
            : a && this.allowRedirects
            ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, i, r, o)
            : Fd(e);
        }
        expandSegmentAgainstRouteUsingRedirect(t, e, n, i, r, o) {
          return "**" === i.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, i, o)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                e,
                n,
                i,
                r,
                o
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, i) {
          const r = this.applyRedirectCommands([], n.redirectTo, {});
          return n.redirectTo.startsWith("/")
            ? Ld(r)
            : this.lineralizeSegments(n, r).pipe(
                H((n) => {
                  const r = new qh(n, {});
                  return this.expandSegment(t, r, e, n, i, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, i, r, o) {
          const {
            matched: a,
            consumedSegments: s,
            lastChild: l,
            positionalParamSegments: c,
          } = $d(e, i, r);
          if (!a) return Fd(e);
          const u = this.applyRedirectCommands(s, i.redirectTo, c);
          return i.redirectTo.startsWith("/")
            ? Ld(u)
            : this.lineralizeSegments(i, u).pipe(
                H((i) =>
                  this.expandSegment(t, e, n, i.concat(r.slice(l)), o, !1)
                )
              );
        }
        matchSegmentAgainstRoute(t, e, n, i) {
          if ("**" === n.path)
            return n.loadChildren
              ? this.configLoader
                  .load(t.injector, n)
                  .pipe(j((t) => ((n._loadedConfig = t), new qh(i, {}))))
              : fu(new qh(i, {}));
          const { matched: r, consumedSegments: o, lastChild: a } = $d(e, n, i);
          if (!r) return Fd(e);
          const s = i.slice(a);
          return this.getChildConfig(t, n, i).pipe(
            H((t) => {
              const n = t.module,
                i = t.routes,
                { segmentGroup: r, slicedSegments: a } = (function (
                  t,
                  e,
                  n,
                  i
                ) {
                  return n.length > 0 &&
                    (function (t, e, n) {
                      return n.some((n) => Bd(t, e, n) && "primary" !== Gd(n));
                    })(t, n, i)
                    ? {
                        segmentGroup: Yd(
                          new qh(
                            e,
                            (function (t, e) {
                              const n = {};
                              n.primary = e;
                              for (const i of t)
                                "" === i.path &&
                                  "primary" !== Gd(i) &&
                                  (n[Gd(i)] = new qh([], {}));
                              return n;
                            })(i, new qh(n, t.children))
                          )
                        ),
                        slicedSegments: [],
                      }
                    : 0 === n.length &&
                      (function (t, e, n) {
                        return n.some((n) => Bd(t, e, n));
                      })(t, n, i)
                    ? {
                        segmentGroup: Yd(
                          new qh(
                            t.segments,
                            (function (t, e, n, i) {
                              const r = {};
                              for (const o of n)
                                Bd(t, e, o) &&
                                  !i[Gd(o)] &&
                                  (r[Gd(o)] = new qh([], {}));
                              return Object.assign(Object.assign({}, i), r);
                            })(t, n, i, t.children)
                          )
                        ),
                        slicedSegments: n,
                      }
                    : { segmentGroup: t, slicedSegments: n };
                })(e, o, s, i);
              return 0 === a.length && r.hasChildren()
                ? this.expandChildren(n, i, r).pipe(j((t) => new qh(o, t)))
                : 0 === i.length && 0 === a.length
                ? fu(new qh(o, {}))
                : this.expandSegment(n, r, i, a, "primary", !0).pipe(
                    j((t) => new qh(o.concat(t.segments), t.children))
                  );
            })
          );
        }
        getChildConfig(t, e, n) {
          return e.children
            ? fu(new Th(e.children, t))
            : e.loadChildren
            ? void 0 !== e._loadedConfig
              ? fu(e._loadedConfig)
              : (function (t, e, n) {
                  const i = e.canLoad;
                  return i && 0 !== i.length
                    ? L(i)
                        .pipe(
                          j((i) => {
                            const r = t.get(i);
                            let o;
                            if (
                              (function (t) {
                                return t && Vd(t.canLoad);
                              })(r)
                            )
                              o = r.canLoad(e, n);
                            else {
                              if (!Vd(r))
                                throw new Error("Invalid CanLoad guard");
                              o = r(e, n);
                            }
                            return Fh(o);
                          })
                        )
                        .pipe(
                          xu(),
                          ((r = (t) => !0 === t),
                          (t) => t.lift(new Bu(r, void 0, t)))
                        )
                    : fu(!0);
                  var r;
                })(t.injector, e, n).pipe(
                  H((n) =>
                    n
                      ? this.configLoader
                          .load(t.injector, e)
                          .pipe(j((t) => ((e._loadedConfig = t), t)))
                      : (function (t) {
                          return new w((e) =>
                            e.error(
                              Sh(
                                `Cannot load children because the guard of the route "path: '${t.path}'" returned false`
                              )
                            )
                          );
                        })(e)
                  )
                )
            : fu(new Th([], t));
        }
        lineralizeSegments(t, e) {
          let n = [],
            i = e.root;
          for (;;) {
            if (((n = n.concat(i.segments)), 0 === i.numberOfChildren))
              return fu(n);
            if (i.numberOfChildren > 1 || !i.children.primary)
              return Hd(t.redirectTo);
            i = i.children.primary;
          }
        }
        applyRedirectCommands(t, e, n) {
          return this.applyRedirectCreatreUrlTree(
            e,
            this.urlSerializer.parse(e),
            t,
            n
          );
        }
        applyRedirectCreatreUrlTree(t, e, n, i) {
          const r = this.createSegmentGroup(t, e.root, n, i);
          return new Hh(
            r,
            this.createQueryParams(e.queryParams, this.urlTree.queryParams),
            e.fragment
          );
        }
        createQueryParams(t, e) {
          const n = {};
          return (
            Uh(t, (t, i) => {
              if ("string" == typeof t && t.startsWith(":")) {
                const r = t.substring(1);
                n[i] = e[r];
              } else n[i] = t;
            }),
            n
          );
        }
        createSegmentGroup(t, e, n, i) {
          const r = this.createSegments(t, e.segments, n, i);
          let o = {};
          return (
            Uh(e.children, (e, r) => {
              o[r] = this.createSegmentGroup(t, e, n, i);
            }),
            new qh(r, o)
          );
        }
        createSegments(t, e, n, i) {
          return e.map((e) =>
            e.path.startsWith(":")
              ? this.findPosParam(t, e, i)
              : this.findOrReturn(e, n)
          );
        }
        findPosParam(t, e, n) {
          const i = n[e.path.substring(1)];
          if (!i)
            throw new Error(
              `Cannot redirect to '${t}'. Cannot find '${e.path}'.`
            );
          return i;
        }
        findOrReturn(t, e) {
          let n = 0;
          for (const i of e) {
            if (i.path === t.path) return e.splice(n), i;
            n++;
          }
          return t;
        }
      }
      function $d(t, e, n) {
        if ("" === e.path)
          return "full" === e.pathMatch && (t.hasChildren() || n.length > 0)
            ? {
                matched: !1,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              }
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              };
        const i = (e.matcher || Eh)(n, t, e);
        return i
          ? {
              matched: !0,
              consumedSegments: i.consumed,
              lastChild: i.consumed.length,
              positionalParamSegments: i.posParams,
            }
          : {
              matched: !1,
              consumedSegments: [],
              lastChild: 0,
              positionalParamSegments: {},
            };
      }
      function Yd(t) {
        if (1 === t.numberOfChildren && t.children.primary) {
          const e = t.children.primary;
          return new qh(t.segments.concat(e.segments), e.children);
        }
        return t;
      }
      function Bd(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 !== n.redirectTo
        );
      }
      function Gd(t) {
        return t.outlet || "primary";
      }
      class Xd {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Wd {
        constructor(t, e) {
          (this.component = t), (this.route = e);
        }
      }
      function Zd(t, e, n) {
        const i = t._root;
        return (function t(
          e,
          n,
          i,
          r,
          o = { canDeactivateChecks: [], canActivateChecks: [] }
        ) {
          const a = dd(n);
          return (
            e.children.forEach((e) => {
              !(function (
                e,
                n,
                i,
                r,
                o = { canDeactivateChecks: [], canActivateChecks: [] }
              ) {
                const a = e.value,
                  s = n ? n.value : null,
                  l = i ? i.getContext(e.value.outlet) : null;
                if (s && a.routeConfig === s.routeConfig) {
                  const c = (function (t, e, n) {
                    if ("function" == typeof n) return n(t, e);
                    switch (n) {
                      case "pathParamsChange":
                        return !Yh(t.url, e.url);
                      case "pathParamsOrQueryParamsChange":
                        return (
                          !Yh(t.url, e.url) || !Dh(t.queryParams, e.queryParams)
                        );
                      case "always":
                        return !0;
                      case "paramsOrQueryParamsChange":
                        return !vd(t, e) || !Dh(t.queryParams, e.queryParams);
                      case "paramsChange":
                      default:
                        return !vd(t, e);
                    }
                  })(s, a, a.routeConfig.runGuardsAndResolvers);
                  c
                    ? o.canActivateChecks.push(new Xd(r))
                    : ((a.data = s.data), (a._resolvedData = s._resolvedData)),
                    t(e, n, a.component ? (l ? l.children : null) : i, r, o),
                    c &&
                      o.canDeactivateChecks.push(
                        new Wd((l && l.outlet && l.outlet.component) || null, s)
                      );
                } else
                  s && Jd(n, l, o),
                    o.canActivateChecks.push(new Xd(r)),
                    t(e, null, a.component ? (l ? l.children : null) : i, r, o);
              })(e, a[e.value.outlet], i, r.concat([e.value]), o),
                delete a[e.value.outlet];
            }),
            Uh(a, (t, e) => Jd(t, i.getContext(e), o)),
            o
          );
        })(i, e ? e._root : null, n, [i.value]);
      }
      function Qd(t, e, n) {
        const i = (function (t) {
          if (!t) return null;
          for (let e = t.parent; e; e = e.parent) {
            const t = e.routeConfig;
            if (t && t._loadedConfig) return t._loadedConfig;
          }
          return null;
        })(e);
        return (i ? i.module.injector : n).get(t);
      }
      function Jd(t, e, n) {
        const i = dd(t),
          r = t.value;
        Uh(i, (t, i) => {
          Jd(t, r.component ? (e ? e.children.getContext(i) : null) : e, n);
        }),
          n.canDeactivateChecks.push(
            new Wd(
              r.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              r
            )
          );
      }
      const Kd = Symbol("INITIAL_VALUE");
      function tp() {
        return Xu((t) =>
          (function (...t) {
            let e = null,
              n = null;
            return (
              M(t[t.length - 1]) && (n = t.pop()),
              "function" == typeof t[t.length - 1] && (e = t.pop()),
              1 === t.length && l(t[0]) && (t = t[0]),
              B(t, n).lift(new _u(e))
            );
          })(
            ...t.map((t) =>
              t.pipe(
                Hu(1),
                (function (...t) {
                  const e = t[t.length - 1];
                  return M(e) ? (t.pop(), (n) => Qu(t, n, e)) : (e) => Qu(t, e);
                })(Kd)
              )
            )
          ).pipe(
            Ju((t, e) => {
              let n = !1;
              return e.reduce((t, i, r) => {
                if (t !== Kd) return t;
                if ((i === Kd && (n = !0), !n)) {
                  if (!1 === i) return i;
                  if (r === e.length - 1 || jd(i)) return i;
                }
                return t;
              }, t);
            }, Kd),
            Ou((t) => t !== Kd),
            j((t) => (jd(t) ? t : !0 === t)),
            Hu(1)
          )
        );
      }
      function ep(t, e) {
        return null !== t && e && e(new vh(t)), fu(!0);
      }
      function np(t, e) {
        return null !== t && e && e(new wh(t)), fu(!0);
      }
      function ip(t, e, n) {
        const i = e.routeConfig ? e.routeConfig.canActivate : null;
        return i && 0 !== i.length
          ? fu(
              i.map((i) =>
                vu(() => {
                  const r = Qd(i, e, n);
                  let o;
                  if (
                    (function (t) {
                      return t && Vd(t.canActivate);
                    })(r)
                  )
                    o = Fh(r.canActivate(e, t));
                  else {
                    if (!Vd(r)) throw new Error("Invalid CanActivate guard");
                    o = Fh(r(e, t));
                  }
                  return o.pipe(Yu());
                })
              )
            ).pipe(tp())
          : fu(!0);
      }
      function rp(t, e, n) {
        const i = e[e.length - 1],
          r = e
            .slice(0, e.length - 1)
            .reverse()
            .map((t) =>
              (function (t) {
                const e = t.routeConfig ? t.routeConfig.canActivateChild : null;
                return e && 0 !== e.length ? { node: t, guards: e } : null;
              })(t)
            )
            .filter((t) => null !== t)
            .map((e) =>
              vu(() =>
                fu(
                  e.guards.map((r) => {
                    const o = Qd(r, e.node, n);
                    let a;
                    if (
                      (function (t) {
                        return t && Vd(t.canActivateChild);
                      })(o)
                    )
                      a = Fh(o.canActivateChild(i, t));
                    else {
                      if (!Vd(o))
                        throw new Error("Invalid CanActivateChild guard");
                      a = Fh(o(i, t));
                    }
                    return a.pipe(Yu());
                  })
                ).pipe(tp())
              )
            );
        return fu(r).pipe(tp());
      }
      class op {}
      class ap {
        constructor(t, e, n, i, r, o) {
          (this.rootComponentType = t),
            (this.config = e),
            (this.urlTree = n),
            (this.url = i),
            (this.paramsInheritanceStrategy = r),
            (this.relativeLinkResolution = o);
        }
        recognize() {
          try {
            const t = cp(
                this.urlTree.root,
                [],
                [],
                this.config,
                this.relativeLinkResolution
              ).segmentGroup,
              e = this.processSegmentGroup(this.config, t, "primary"),
              n = new bd(
                [],
                Object.freeze({}),
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                {},
                "primary",
                this.rootComponentType,
                null,
                this.urlTree.root,
                -1,
                {}
              ),
              i = new hd(n, e),
              r = new _d(this.url, i);
            return this.inheritParamsAndData(r._root), fu(r);
          } catch (t) {
            return new w((e) => e.error(t));
          }
        }
        inheritParamsAndData(t) {
          const e = t.value,
            n = md(e, this.paramsInheritanceStrategy);
          (e.params = Object.freeze(n.params)),
            (e.data = Object.freeze(n.data)),
            t.children.forEach((t) => this.inheritParamsAndData(t));
        }
        processSegmentGroup(t, e, n) {
          return 0 === e.segments.length && e.hasChildren()
            ? this.processChildren(t, e)
            : this.processSegment(t, e, e.segments, n);
        }
        processChildren(t, e) {
          const n = Bh(e, (e, n) => this.processSegmentGroup(t, e, n));
          return (
            (function (t) {
              const e = {};
              t.forEach((t) => {
                const n = e[t.value.outlet];
                if (n) {
                  const e = n.url.map((t) => t.toString()).join("/"),
                    i = t.value.url.map((t) => t.toString()).join("/");
                  throw new Error(
                    `Two segments cannot have the same outlet name: '${e}' and '${i}'.`
                  );
                }
                e[t.value.outlet] = t.value;
              });
            })(n),
            n.sort((t, e) =>
              "primary" === t.value.outlet
                ? -1
                : "primary" === e.value.outlet
                ? 1
                : t.value.outlet.localeCompare(e.value.outlet)
            ),
            n
          );
        }
        processSegment(t, e, n, i) {
          for (const o of t)
            try {
              return this.processSegmentAgainstRoute(o, e, n, i);
            } catch (r) {
              if (!(r instanceof op)) throw r;
            }
          if (this.noLeftoversInUrl(e, n, i)) return [];
          throw new op();
        }
        noLeftoversInUrl(t, e, n) {
          return 0 === e.length && !t.children[n];
        }
        processSegmentAgainstRoute(t, e, n, i) {
          if (t.redirectTo) throw new op();
          if ((t.outlet || "primary") !== i) throw new op();
          let r,
            o = [],
            a = [];
          if ("**" === t.path) {
            const o = n.length > 0 ? zh(n).parameters : {};
            r = new bd(
              n,
              o,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              dp(t),
              i,
              t.component,
              t,
              sp(e),
              lp(e) + n.length,
              pp(t)
            );
          } else {
            const s = (function (t, e, n) {
              if ("" === e.path) {
                if ("full" === e.pathMatch && (t.hasChildren() || n.length > 0))
                  throw new op();
                return { consumedSegments: [], lastChild: 0, parameters: {} };
              }
              const i = (e.matcher || Eh)(n, t, e);
              if (!i) throw new op();
              const r = {};
              Uh(i.posParams, (t, e) => {
                r[e] = t.path;
              });
              const o =
                i.consumed.length > 0
                  ? Object.assign(
                      Object.assign({}, r),
                      i.consumed[i.consumed.length - 1].parameters
                    )
                  : r;
              return {
                consumedSegments: i.consumed,
                lastChild: i.consumed.length,
                parameters: o,
              };
            })(e, t, n);
            (o = s.consumedSegments),
              (a = n.slice(s.lastChild)),
              (r = new bd(
                o,
                s.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                dp(t),
                i,
                t.component,
                t,
                sp(e),
                lp(e) + o.length,
                pp(t)
              ));
          }
          const s = (function (t) {
              return t.children
                ? t.children
                : t.loadChildren
                ? t._loadedConfig.routes
                : [];
            })(t),
            { segmentGroup: l, slicedSegments: c } = cp(
              e,
              o,
              a,
              s,
              this.relativeLinkResolution
            );
          if (0 === c.length && l.hasChildren()) {
            const t = this.processChildren(s, l);
            return [new hd(r, t)];
          }
          if (0 === s.length && 0 === c.length) return [new hd(r, [])];
          const u = this.processSegment(s, l, c, "primary");
          return [new hd(r, u)];
        }
      }
      function sp(t) {
        let e = t;
        for (; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function lp(t) {
        let e = t,
          n = e._segmentIndexShift ? e._segmentIndexShift : 0;
        for (; e._sourceSegment; )
          (e = e._sourceSegment),
            (n += e._segmentIndexShift ? e._segmentIndexShift : 0);
        return n - 1;
      }
      function cp(t, e, n, i, r) {
        if (
          n.length > 0 &&
          (function (t, e, n) {
            return n.some((n) => up(t, e, n) && "primary" !== hp(n));
          })(t, n, i)
        ) {
          const r = new qh(
            e,
            (function (t, e, n, i) {
              const r = {};
              (r.primary = i),
                (i._sourceSegment = t),
                (i._segmentIndexShift = e.length);
              for (const o of n)
                if ("" === o.path && "primary" !== hp(o)) {
                  const n = new qh([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift = e.length),
                    (r[hp(o)] = n);
                }
              return r;
            })(t, e, i, new qh(n, t.children))
          );
          return (
            (r._sourceSegment = t),
            (r._segmentIndexShift = e.length),
            { segmentGroup: r, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function (t, e, n) {
            return n.some((n) => up(t, e, n));
          })(t, n, i)
        ) {
          const o = new qh(
            t.segments,
            (function (t, e, n, i, r, o) {
              const a = {};
              for (const s of i)
                if (up(t, n, s) && !r[hp(s)]) {
                  const n = new qh([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift =
                      "legacy" === o ? t.segments.length : e.length),
                    (a[hp(s)] = n);
                }
              return Object.assign(Object.assign({}, r), a);
            })(t, e, n, i, t.children, r)
          );
          return (
            (o._sourceSegment = t),
            (o._segmentIndexShift = e.length),
            { segmentGroup: o, slicedSegments: n }
          );
        }
        const o = new qh(t.segments, t.children);
        return (
          (o._sourceSegment = t),
          (o._segmentIndexShift = e.length),
          { segmentGroup: o, slicedSegments: n }
        );
      }
      function up(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 === n.redirectTo
        );
      }
      function hp(t) {
        return t.outlet || "primary";
      }
      function dp(t) {
        return t.data || {};
      }
      function pp(t) {
        return t.resolve || {};
      }
      function fp(t, e, n, i) {
        const r = Qd(t, e, i);
        return Fh(r.resolve ? r.resolve(e, n) : r(e, n));
      }
      function gp(t) {
        return function (e) {
          return e.pipe(
            Xu((e) => {
              const n = t(e);
              return n ? L(n).pipe(j(() => e)) : L([e]);
            })
          );
        };
      }
      class mp {
        shouldDetach(t) {
          return !1;
        }
        store(t, e) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, e) {
          return t.routeConfig === e.routeConfig;
        }
      }
      const bp = new jt("ROUTES");
      class _p {
        constructor(t, e, n, i) {
          (this.loader = t),
            (this.compiler = e),
            (this.onLoadStartListener = n),
            (this.onLoadEndListener = i);
        }
        load(t, e) {
          return (
            this.onLoadStartListener && this.onLoadStartListener(e),
            this.loadModuleFactory(e.loadChildren).pipe(
              j((n) => {
                this.onLoadEndListener && this.onLoadEndListener(e);
                const i = n.create(t);
                return new Th(jh(i.injector.get(bp)).map(Nh), i);
              })
            )
          );
        }
        loadModuleFactory(t) {
          return "string" == typeof t
            ? L(this.loader.load(t))
            : Fh(t()).pipe(
                H((t) =>
                  t instanceof Jt
                    ? fu(t)
                    : L(this.compiler.compileModuleAsync(t))
                )
              );
        }
      }
      class yp {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, e) {
          return t;
        }
      }
      function wp(t) {
        throw t;
      }
      function Cp(t, e, n) {
        return e.parse("/");
      }
      function vp(t, e) {
        return fu(null);
      }
      let xp = (() => {
        class t {
          constructor(t, e, n, i, r, o, a, s) {
            (this.rootComponentType = t),
              (this.urlSerializer = e),
              (this.rootContexts = n),
              (this.location = i),
              (this.config = s),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.navigationId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new k()),
              (this.errorHandler = wp),
              (this.malformedUriErrorHandler = Cp),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.hooks = {
                beforePreactivation: vp,
                afterPreactivation: vp,
              }),
              (this.urlHandlingStrategy = new yp()),
              (this.routeReuseStrategy = new mp()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "legacy"),
              (this.ngModule = r.get(Qt)),
              (this.console = r.get(fl));
            const l = r.get(Sl);
            (this.isNgZoneEnabled = l instanceof Sl),
              this.resetConfig(s),
              (this.currentUrlTree = new Hh(new qh([], {}), {}, null)),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.configLoader = new _p(
                o,
                a,
                (t) => this.triggerEvent(new _h(t)),
                (t) => this.triggerEvent(new yh(t))
              )),
              (this.routerState = fd(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new gu({
                id: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          setupNavigations(t) {
            const e = this.events;
            return t.pipe(
              Ou((t) => 0 !== t.id),
              j((t) =>
                Object.assign(Object.assign({}, t), {
                  extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl),
                })
              ),
              Xu((t) => {
                let n = !1,
                  i = !1;
                return fu(t).pipe(
                  ih((t) => {
                    this.currentNavigation = {
                      id: t.id,
                      initialUrl: t.currentRawUrl,
                      extractedUrl: t.extractedUrl,
                      trigger: t.source,
                      extras: t.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? Object.assign(
                            Object.assign({}, this.lastSuccessfulNavigation),
                            { previousNavigation: null }
                          )
                        : null,
                    };
                  }),
                  Xu((t) => {
                    const n =
                      !this.navigated ||
                      t.extractedUrl.toString() !==
                        this.browserUrlTree.toString();
                    if (
                      ("reload" === this.onSameUrlNavigation || n) &&
                      this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)
                    )
                      return fu(t).pipe(
                        Xu((t) => {
                          const n = this.transitions.getValue();
                          return (
                            e.next(
                              new ch(
                                t.id,
                                this.serializeUrl(t.extractedUrl),
                                t.source,
                                t.restoredState
                              )
                            ),
                            n !== this.transitions.getValue() ? wu : [t]
                          );
                        }),
                        Xu((t) => Promise.resolve(t)),
                        ((i = this.ngModule.injector),
                        (r = this.configLoader),
                        (o = this.urlSerializer),
                        (a = this.config),
                        function (t) {
                          return t.pipe(
                            Xu((t) =>
                              (function (t, e, n, i, r) {
                                return new qd(t, e, n, i, r).apply();
                              })(i, r, o, t.extractedUrl, a).pipe(
                                j((e) =>
                                  Object.assign(Object.assign({}, t), {
                                    urlAfterRedirects: e,
                                  })
                                )
                              )
                            )
                          );
                        }),
                        ih((t) => {
                          this.currentNavigation = Object.assign(
                            Object.assign({}, this.currentNavigation),
                            { finalUrl: t.urlAfterRedirects }
                          );
                        }),
                        (function (t, e, n, i, r) {
                          return function (o) {
                            return o.pipe(
                              H((o) =>
                                (function (
                                  t,
                                  e,
                                  n,
                                  i,
                                  r = "emptyOnly",
                                  o = "legacy"
                                ) {
                                  return new ap(t, e, n, i, r, o).recognize();
                                })(
                                  t,
                                  e,
                                  o.urlAfterRedirects,
                                  n(o.urlAfterRedirects),
                                  i,
                                  r
                                ).pipe(
                                  j((t) =>
                                    Object.assign(Object.assign({}, o), {
                                      targetSnapshot: t,
                                    })
                                  )
                                )
                              )
                            );
                          };
                        })(
                          this.rootComponentType,
                          this.config,
                          (t) => this.serializeUrl(t),
                          this.paramsInheritanceStrategy,
                          this.relativeLinkResolution
                        ),
                        ih((t) => {
                          "eager" === this.urlUpdateStrategy &&
                            (t.extras.skipLocationChange ||
                              this.setBrowserUrl(
                                t.urlAfterRedirects,
                                !!t.extras.replaceUrl,
                                t.id,
                                t.extras.state
                              ),
                            (this.browserUrlTree = t.urlAfterRedirects));
                        }),
                        ih((t) => {
                          const n = new ph(
                            t.id,
                            this.serializeUrl(t.extractedUrl),
                            this.serializeUrl(t.urlAfterRedirects),
                            t.targetSnapshot
                          );
                          e.next(n);
                        })
                      );
                    var i, r, o, a;
                    if (
                      n &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: n,
                          extractedUrl: i,
                          source: r,
                          restoredState: o,
                          extras: a,
                        } = t,
                        s = new ch(n, this.serializeUrl(i), r, o);
                      e.next(s);
                      const l = fd(i, this.rootComponentType).snapshot;
                      return fu(
                        Object.assign(Object.assign({}, t), {
                          targetSnapshot: l,
                          urlAfterRedirects: i,
                          extras: Object.assign(Object.assign({}, a), {
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          }),
                        })
                      );
                    }
                    return (
                      (this.rawUrlTree = t.rawUrl),
                      (this.browserUrlTree = t.urlAfterRedirects),
                      t.resolve(null),
                      wu
                    );
                  }),
                  gp((t) => {
                    const {
                      targetSnapshot: e,
                      id: n,
                      extractedUrl: i,
                      rawUrl: r,
                      extras: { skipLocationChange: o, replaceUrl: a },
                    } = t;
                    return this.hooks.beforePreactivation(e, {
                      navigationId: n,
                      appliedUrlTree: i,
                      rawUrlTree: r,
                      skipLocationChange: !!o,
                      replaceUrl: !!a,
                    });
                  }),
                  ih((t) => {
                    const e = new fh(
                      t.id,
                      this.serializeUrl(t.extractedUrl),
                      this.serializeUrl(t.urlAfterRedirects),
                      t.targetSnapshot
                    );
                    this.triggerEvent(e);
                  }),
                  j((t) =>
                    Object.assign(Object.assign({}, t), {
                      guards: Zd(
                        t.targetSnapshot,
                        t.currentSnapshot,
                        this.rootContexts
                      ),
                    })
                  ),
                  (function (t, e) {
                    return function (n) {
                      return n.pipe(
                        H((n) => {
                          const {
                            targetSnapshot: i,
                            currentSnapshot: r,
                            guards: {
                              canActivateChecks: o,
                              canDeactivateChecks: a,
                            },
                          } = n;
                          return 0 === a.length && 0 === o.length
                            ? fu(
                                Object.assign(Object.assign({}, n), {
                                  guardsResult: !0,
                                })
                              )
                            : (function (t, e, n, i) {
                                return L(t).pipe(
                                  H((t) =>
                                    (function (t, e, n, i, r) {
                                      const o =
                                        e && e.routeConfig
                                          ? e.routeConfig.canDeactivate
                                          : null;
                                      return o && 0 !== o.length
                                        ? fu(
                                            o.map((o) => {
                                              const a = Qd(o, e, r);
                                              let s;
                                              if (
                                                (function (t) {
                                                  return (
                                                    t && Vd(t.canDeactivate)
                                                  );
                                                })(a)
                                              )
                                                s = Fh(
                                                  a.canDeactivate(t, e, n, i)
                                                );
                                              else {
                                                if (!Vd(a))
                                                  throw new Error(
                                                    "Invalid CanDeactivate guard"
                                                  );
                                                s = Fh(a(t, e, n, i));
                                              }
                                              return s.pipe(Yu());
                                            })
                                          ).pipe(tp())
                                        : fu(!0);
                                    })(t.component, t.route, n, e, i)
                                  ),
                                  Yu((t) => !0 !== t, !0)
                                );
                              })(a, i, r, t).pipe(
                                H((n) =>
                                  n && "boolean" == typeof n
                                    ? (function (t, e, n, i) {
                                        return L(e).pipe(
                                          eh((e) =>
                                            L([
                                              np(e.route.parent, i),
                                              ep(e.route, i),
                                              rp(t, e.path, n),
                                              ip(t, e.route, n),
                                            ]).pipe(
                                              xu(),
                                              Yu((t) => !0 !== t, !0)
                                            )
                                          ),
                                          Yu((t) => !0 !== t, !0)
                                        );
                                      })(i, o, t, e)
                                    : fu(n)
                                ),
                                j((t) =>
                                  Object.assign(Object.assign({}, n), {
                                    guardsResult: t,
                                  })
                                )
                              );
                        })
                      );
                    };
                  })(this.ngModule.injector, (t) => this.triggerEvent(t)),
                  ih((t) => {
                    if (jd(t.guardsResult)) {
                      const e = Sh(
                        `Redirecting to "${this.serializeUrl(t.guardsResult)}"`
                      );
                      throw ((e.url = t.guardsResult), e);
                    }
                  }),
                  ih((t) => {
                    const e = new gh(
                      t.id,
                      this.serializeUrl(t.extractedUrl),
                      this.serializeUrl(t.urlAfterRedirects),
                      t.targetSnapshot,
                      !!t.guardsResult
                    );
                    this.triggerEvent(e);
                  }),
                  Ou((t) => {
                    if (!t.guardsResult) {
                      this.resetUrlToCurrentUrlTree();
                      const n = new hh(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        ""
                      );
                      return e.next(n), t.resolve(!1), !1;
                    }
                    return !0;
                  }),
                  gp((t) => {
                    if (t.guards.canActivateChecks.length)
                      return fu(t).pipe(
                        ih((t) => {
                          const e = new mh(
                            t.id,
                            this.serializeUrl(t.extractedUrl),
                            this.serializeUrl(t.urlAfterRedirects),
                            t.targetSnapshot
                          );
                          this.triggerEvent(e);
                        }),
                        ((e = this.paramsInheritanceStrategy),
                        (n = this.ngModule.injector),
                        function (t) {
                          return t.pipe(
                            H((t) => {
                              const {
                                targetSnapshot: i,
                                guards: { canActivateChecks: r },
                              } = t;
                              return r.length
                                ? L(r).pipe(
                                    eh((t) =>
                                      (function (t, e, n, i) {
                                        return (function (t, e, n, i) {
                                          const r = Object.keys(t);
                                          if (0 === r.length) return fu({});
                                          if (1 === r.length) {
                                            const o = r[0];
                                            return fp(t[o], e, n, i).pipe(
                                              j((t) => ({ [o]: t }))
                                            );
                                          }
                                          const o = {};
                                          return L(r)
                                            .pipe(
                                              H((r) =>
                                                fp(t[r], e, n, i).pipe(
                                                  j((t) => ((o[r] = t), t))
                                                )
                                              )
                                            )
                                            .pipe(
                                              zu(),
                                              j(() => o)
                                            );
                                        })(t._resolve, t, e, i).pipe(
                                          j(
                                            (e) => (
                                              (t._resolvedData = e),
                                              (t.data = Object.assign(
                                                Object.assign({}, t.data),
                                                md(t, n).resolve
                                              )),
                                              null
                                            )
                                          )
                                        );
                                      })(t.route, i, e, n)
                                    ),
                                    (function (t, e) {
                                      return arguments.length >= 2
                                        ? function (n) {
                                            return _(Ju(t, e), Su(1), Du(e))(n);
                                          }
                                        : function (e) {
                                            return _(
                                              Ju((e, n, i) => t(e, n, i + 1)),
                                              Su(1)
                                            )(e);
                                          };
                                    })((t, e) => t),
                                    j((e) => t)
                                  )
                                : fu(t);
                            })
                          );
                        }),
                        ih((t) => {
                          const e = new bh(
                            t.id,
                            this.serializeUrl(t.extractedUrl),
                            this.serializeUrl(t.urlAfterRedirects),
                            t.targetSnapshot
                          );
                          this.triggerEvent(e);
                        })
                      );
                    var e, n;
                  }),
                  gp((t) => {
                    const {
                      targetSnapshot: e,
                      id: n,
                      extractedUrl: i,
                      rawUrl: r,
                      extras: { skipLocationChange: o, replaceUrl: a },
                    } = t;
                    return this.hooks.afterPreactivation(e, {
                      navigationId: n,
                      appliedUrlTree: i,
                      rawUrlTree: r,
                      skipLocationChange: !!o,
                      replaceUrl: !!a,
                    });
                  }),
                  j((t) => {
                    const e = (function (t, e, n) {
                      const i = (function t(e, n, i) {
                        if (
                          i &&
                          e.shouldReuseRoute(n.value, i.value.snapshot)
                        ) {
                          const r = i.value;
                          r._futureSnapshot = n.value;
                          const o = (function (e, n, i) {
                            return n.children.map((n) => {
                              for (const r of i.children)
                                if (
                                  e.shouldReuseRoute(r.value.snapshot, n.value)
                                )
                                  return t(e, n, r);
                              return t(e, n);
                            });
                          })(e, n, i);
                          return new hd(r, o);
                        }
                        {
                          const i = e.retrieve(n.value);
                          if (i) {
                            const t = i.route;
                            return (
                              (function t(e, n) {
                                if (e.value.routeConfig !== n.value.routeConfig)
                                  throw new Error(
                                    "Cannot reattach ActivatedRouteSnapshot created from a different route"
                                  );
                                if (e.children.length !== n.children.length)
                                  throw new Error(
                                    "Cannot reattach ActivatedRouteSnapshot with a different number of children"
                                  );
                                n.value._futureSnapshot = e.value;
                                for (let i = 0; i < e.children.length; ++i)
                                  t(e.children[i], n.children[i]);
                              })(n, t),
                              t
                            );
                          }
                          {
                            const i = new gd(
                                new gu((r = n.value).url),
                                new gu(r.params),
                                new gu(r.queryParams),
                                new gu(r.fragment),
                                new gu(r.data),
                                r.outlet,
                                r.component,
                                r
                              ),
                              o = n.children.map((n) => t(e, n));
                            return new hd(i, o);
                          }
                        }
                        var r;
                      })(t, e._root, n ? n._root : void 0);
                      return new pd(i, e);
                    })(
                      this.routeReuseStrategy,
                      t.targetSnapshot,
                      t.currentRouterState
                    );
                    return Object.assign(Object.assign({}, t), {
                      targetRouterState: e,
                    });
                  }),
                  ih((t) => {
                    (this.currentUrlTree = t.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        this.currentUrlTree,
                        t.rawUrl
                      )),
                      (this.routerState = t.targetRouterState),
                      "deferred" === this.urlUpdateStrategy &&
                        (t.extras.skipLocationChange ||
                          this.setBrowserUrl(
                            this.rawUrlTree,
                            !!t.extras.replaceUrl,
                            t.id,
                            t.extras.state
                          ),
                        (this.browserUrlTree = t.urlAfterRedirects));
                  }),
                  ((o = this.rootContexts),
                  (a = this.routeReuseStrategy),
                  (s = (t) => this.triggerEvent(t)),
                  j(
                    (t) => (
                      new Nd(
                        a,
                        t.targetRouterState,
                        t.currentRouterState,
                        s
                      ).activate(o),
                      t
                    )
                  )),
                  ih({
                    next() {
                      n = !0;
                    },
                    complete() {
                      n = !0;
                    },
                  }),
                  ((r = () => {
                    if (!n && !i) {
                      this.resetUrlToCurrentUrlTree();
                      const n = new hh(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`
                      );
                      e.next(n), t.resolve(!1);
                    }
                    this.currentNavigation = null;
                  }),
                  (t) => t.lift(new ah(r))),
                  Uu((n) => {
                    if (((i = !0), (r = n) && r.ngNavigationCancelingError)) {
                      const i = jd(n.url);
                      i ||
                        ((this.navigated = !0),
                        this.resetStateAndUrl(
                          t.currentRouterState,
                          t.currentUrlTree,
                          t.rawUrl
                        ));
                      const r = new hh(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        n.message
                      );
                      e.next(r),
                        i
                          ? setTimeout(() => {
                              const e = this.urlHandlingStrategy.merge(
                                n.url,
                                this.rawUrlTree
                              );
                              return this.scheduleNavigation(
                                e,
                                "imperative",
                                null,
                                {
                                  skipLocationChange:
                                    t.extras.skipLocationChange,
                                  replaceUrl:
                                    "eager" === this.urlUpdateStrategy,
                                },
                                {
                                  resolve: t.resolve,
                                  reject: t.reject,
                                  promise: t.promise,
                                }
                              );
                            }, 0)
                          : t.resolve(!1);
                    } else {
                      this.resetStateAndUrl(
                        t.currentRouterState,
                        t.currentUrlTree,
                        t.rawUrl
                      );
                      const i = new dh(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        n
                      );
                      e.next(i);
                      try {
                        t.resolve(this.errorHandler(n));
                      } catch (o) {
                        t.reject(o);
                      }
                    }
                    var r;
                    return wu;
                  })
                );
                var r, o, a, s;
              })
            );
          }
          resetRootComponentType(t) {
            (this.rootComponentType = t),
              (this.routerState.root.component = this.rootComponentType);
          }
          getTransition() {
            const t = this.transitions.value;
            return (t.urlAfterRedirects = this.browserUrlTree), t;
          }
          setTransition(t) {
            this.transitions.next(
              Object.assign(Object.assign({}, this.getTransition()), t)
            );
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((t) => {
                let e = this.parseUrl(t.url);
                const n = "popstate" === t.type ? "popstate" : "hashchange",
                  i = t.state && t.state.navigationId ? t.state : null;
                setTimeout(() => {
                  this.scheduleNavigation(e, n, i, { replaceUrl: !0 });
                }, 0);
              }));
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(t) {
            this.events.next(t);
          }
          resetConfig(t) {
            Ah(t),
              (this.config = t.map(Nh)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.locationSubscription &&
              (this.locationSubscription.unsubscribe(),
              (this.locationSubscription = null));
          }
          createUrlTree(t, e = {}) {
            const {
              relativeTo: n,
              queryParams: i,
              fragment: r,
              preserveQueryParams: o,
              queryParamsHandling: a,
              preserveFragment: s,
            } = e;
            ci() &&
              o &&
              console &&
              console.warn &&
              console.warn(
                "preserveQueryParams is deprecated, use queryParamsHandling instead."
              );
            const l = n || this.routerState.root,
              c = s ? this.currentUrlTree.fragment : r;
            let u = null;
            if (a)
              switch (a) {
                case "merge":
                  u = Object.assign(
                    Object.assign({}, this.currentUrlTree.queryParams),
                    i
                  );
                  break;
                case "preserve":
                  u = this.currentUrlTree.queryParams;
                  break;
                default:
                  u = i || null;
              }
            else u = o ? this.currentUrlTree.queryParams : i || null;
            return (
              null !== u && (u = this.removeEmptyProps(u)),
              (function (t, e, n, i, r) {
                if (0 === n.length) return Od(e.root, e.root, e, i, r);
                const o = (function (t) {
                  if ("string" == typeof t[0] && 1 === t.length && "/" === t[0])
                    return new kd(!0, 0, t);
                  let e = 0,
                    n = !1;
                  const i = t.reduce((t, i, r) => {
                    if ("object" == typeof i && null != i) {
                      if (i.outlets) {
                        const e = {};
                        return (
                          Uh(i.outlets, (t, n) => {
                            e[n] = "string" == typeof t ? t.split("/") : t;
                          }),
                          [...t, { outlets: e }]
                        );
                      }
                      if (i.segmentPath) return [...t, i.segmentPath];
                    }
                    return "string" != typeof i
                      ? [...t, i]
                      : 0 === r
                      ? (i.split("/").forEach((i, r) => {
                          (0 == r && "." === i) ||
                            (0 == r && "" === i
                              ? (n = !0)
                              : ".." === i
                              ? e++
                              : "" != i && t.push(i));
                        }),
                        t)
                      : [...t, i];
                  }, []);
                  return new kd(n, e, i);
                })(n);
                if (o.toRoot()) return Od(e.root, new qh([], {}), e, i, r);
                const a = (function (t, e, n) {
                    if (t.isAbsolute) return new Pd(e.root, !0, 0);
                    if (-1 === n.snapshot._lastPathIndex)
                      return new Pd(n.snapshot._urlSegment, !0, 0);
                    const i = xd(t.commands[0]) ? 0 : 1;
                    return (function (t, e, n) {
                      let i = t,
                        r = e,
                        o = n;
                      for (; o > r; ) {
                        if (((o -= r), (i = i.parent), !i))
                          throw new Error("Invalid number of '../'");
                        r = i.segments.length;
                      }
                      return new Pd(i, !1, r - o);
                    })(
                      n.snapshot._urlSegment,
                      n.snapshot._lastPathIndex + i,
                      t.numberOfDoubleDots
                    );
                  })(o, e, t),
                  s = a.processChildren
                    ? Ed(a.segmentGroup, a.index, o.commands)
                    : Sd(a.segmentGroup, a.index, o.commands);
                return Od(a.segmentGroup, s, e, i, r);
              })(l, this.currentUrlTree, t, u, c)
            );
          }
          navigateByUrl(t, e = { skipLocationChange: !1 }) {
            ci() &&
              this.isNgZoneEnabled &&
              !Sl.isInAngularZone() &&
              this.console.warn(
                "Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?"
              );
            const n = jd(t) ? t : this.parseUrl(t),
              i = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
            return this.scheduleNavigation(i, "imperative", null, e);
          }
          navigate(t, e = { skipLocationChange: !1 }) {
            return (
              (function (t) {
                for (let e = 0; e < t.length; e++) {
                  const n = t[e];
                  if (null == n)
                    throw new Error(
                      `The requested path contains ${n} segment at index ${e}`
                    );
                }
              })(t),
              this.navigateByUrl(this.createUrlTree(t, e), e)
            );
          }
          serializeUrl(t) {
            return this.urlSerializer.serialize(t);
          }
          parseUrl(t) {
            let e;
            try {
              e = this.urlSerializer.parse(t);
            } catch (n) {
              e = this.malformedUriErrorHandler(n, this.urlSerializer, t);
            }
            return e;
          }
          isActive(t, e) {
            if (jd(t)) return Lh(this.currentUrlTree, t, e);
            const n = this.parseUrl(t);
            return Lh(this.currentUrlTree, n, e);
          }
          removeEmptyProps(t) {
            return Object.keys(t).reduce((e, n) => {
              const i = t[n];
              return null != i && (e[n] = i), e;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (t) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = t.id),
                  this.events.next(
                    new uh(
                      t.id,
                      this.serializeUrl(t.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  (this.currentNavigation = null),
                  t.resolve(!0);
              },
              (t) => {
                this.console.warn("Unhandled Navigation Error: ");
              }
            );
          }
          scheduleNavigation(t, e, n, i, r) {
            const o = this.getTransition();
            if (
              o &&
              "imperative" !== e &&
              "imperative" === o.source &&
              o.rawUrl.toString() === t.toString()
            )
              return Promise.resolve(!0);
            if (
              o &&
              "hashchange" == e &&
              "popstate" === o.source &&
              o.rawUrl.toString() === t.toString()
            )
              return Promise.resolve(!0);
            if (
              o &&
              "popstate" == e &&
              "hashchange" === o.source &&
              o.rawUrl.toString() === t.toString()
            )
              return Promise.resolve(!0);
            let a, s, l;
            r
              ? ((a = r.resolve), (s = r.reject), (l = r.promise))
              : (l = new Promise((t, e) => {
                  (a = t), (s = e);
                }));
            const c = ++this.navigationId;
            return (
              this.setTransition({
                id: c,
                source: e,
                restoredState: n,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: t,
                extras: i,
                resolve: a,
                reject: s,
                promise: l,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              l.catch((t) => Promise.reject(t))
            );
          }
          setBrowserUrl(t, e, n, i) {
            const r = this.urlSerializer.serialize(t);
            (i = i || {}),
              this.location.isCurrentPathEqualTo(r) || e
                ? this.location.replaceState(
                    r,
                    "",
                    Object.assign(Object.assign({}, i), { navigationId: n })
                  )
                : this.location.go(
                    r,
                    "",
                    Object.assign(Object.assign({}, i), { navigationId: n })
                  );
          }
          resetStateAndUrl(t, e, n) {
            (this.routerState = t),
              (this.currentUrlTree = e),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n
              )),
              this.resetUrlToCurrentUrlTree();
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              { navigationId: this.lastSuccessfulId }
            );
          }
        }
        return (
          (t.ɵfac = function (t) {
            na();
          }),
          (t.ɵdir = be({ type: t })),
          t
        );
      })();
      class Op {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new kp()),
            (this.attachRef = null);
        }
      }
      class kp {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(t, e) {
          const n = this.getOrCreateContext(t);
          (n.outlet = e), this.contexts.set(t, n);
        }
        onChildOutletDestroyed(t) {
          const e = this.getContext(t);
          e && (e.outlet = null);
        }
        onOutletDeactivated() {
          const t = this.contexts;
          return (this.contexts = new Map()), t;
        }
        onOutletReAttached(t) {
          this.contexts = t;
        }
        getOrCreateContext(t) {
          let e = this.getContext(t);
          return e || ((e = new Op()), this.contexts.set(t, e)), e;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      let Pp = (() => {
        class t {
          constructor(t, e, n, i, r) {
            (this.parentContexts = t),
              (this.location = e),
              (this.resolver = n),
              (this.changeDetector = r),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new rl()),
              (this.deactivateEvents = new rl()),
              (this.name = i || "primary"),
              t.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const t = this.parentContexts.getContext(this.name);
              t &&
                t.route &&
                (t.attachRef
                  ? this.attach(t.attachRef, t.route)
                  : this.activateWith(t.route, t.resolver || null));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new Error("Outlet is not activated");
            this.location.detach();
            const t = this.activated;
            return (this.activated = null), (this._activatedRoute = null), t;
          }
          attach(t, e) {
            (this.activated = t),
              (this._activatedRoute = e),
              this.location.insert(t.hostView);
          }
          deactivate() {
            if (this.activated) {
              const t = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(t);
            }
          }
          activateWith(t, e) {
            if (this.isActivated)
              throw new Error("Cannot activate an already activated outlet");
            this._activatedRoute = t;
            const n = (e = e || this.resolver).resolveComponentFactory(
                t._futureSnapshot.routeConfig.component
              ),
              i = this.parentContexts.getOrCreateContext(this.name).children,
              r = new Mp(t, i, this.location.injector);
            (this.activated = this.location.createComponent(
              n,
              this.location.length,
              r
            )),
              this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(
              ea(kp),
              ea(As),
              ea(rs),
              ("name",
              (function (t, e) {
                const n = t.attrs;
                if (n) {
                  const t = n.length;
                  let e = 0;
                  for (; e < t; ) {
                    const i = n[e];
                    if (Pn(i)) break;
                    if (0 === i) e += 2;
                    else if ("number" == typeof i)
                      for (e++; e < t && "string" == typeof n[e]; ) e++;
                    else {
                      if ("name" === i) return n[e + 1];
                      e += 2;
                    }
                  }
                }
                return null;
              })(We())),
              ea(wo)
            );
          }),
          (t.ɵdir = be({
            type: t,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
            },
            exportAs: ["outlet"],
          })),
          t
        );
      })();
      class Mp {
        constructor(t, e, n) {
          (this.route = t), (this.childContexts = e), (this.parent = n);
        }
        get(t, e) {
          return t === gd
            ? this.route
            : t === kp
            ? this.childContexts
            : this.parent.get(t, e);
        }
      }
      class Sp {}
      class Ep {
        preload(t, e) {
          return fu(null);
        }
      }
      let Tp = (() => {
          class t {
            constructor(t, e, n, i, r) {
              (this.router = t),
                (this.injector = i),
                (this.preloadingStrategy = r),
                (this.loader = new _p(
                  e,
                  n,
                  (e) => t.triggerEvent(new _h(e)),
                  (e) => t.triggerEvent(new yh(e))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  Ou((t) => t instanceof uh),
                  eh(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const t = this.injector.get(Qt);
              return this.processRoutes(t, this.router.config);
            }
            ngOnDestroy() {
              this.subscription.unsubscribe();
            }
            processRoutes(t, e) {
              const n = [];
              for (const i of e)
                if (i.loadChildren && !i.canLoad && i._loadedConfig) {
                  const t = i._loadedConfig;
                  n.push(this.processRoutes(t.module, t.routes));
                } else
                  i.loadChildren && !i.canLoad
                    ? n.push(this.preloadConfig(t, i))
                    : i.children && n.push(this.processRoutes(t, i.children));
              return L(n).pipe(
                Y(),
                j((t) => {})
              );
            }
            preloadConfig(t, e) {
              return this.preloadingStrategy.preload(e, () =>
                this.loader
                  .load(t.injector, e)
                  .pipe(
                    H(
                      (t) => (
                        (e._loadedConfig = t),
                        this.processRoutes(t.module, t.routes)
                      )
                    )
                  )
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(xp), Gt(Zl), Gt(Ol), Gt(Vo), Gt(Sp));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Ap = (() => {
          class t {
            constructor(t, e, n = {}) {
              (this.router = t),
                (this.viewportScroller = e),
                (this.options = n),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (n.scrollPositionRestoration =
                  n.scrollPositionRestoration || "disabled"),
                (n.anchorScrolling = n.anchorScrolling || "disabled");
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof ch
                  ? ((this.store[
                      this.lastId
                    ] = this.viewportScroller.getScrollPosition()),
                    (this.lastSource = t.navigationTrigger),
                    (this.restoredId = t.restoredState
                      ? t.restoredState.navigationId
                      : 0))
                  : t instanceof uh &&
                    ((this.lastId = t.id),
                    this.scheduleScrollEvent(
                      t,
                      this.router.parseUrl(t.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof Oh &&
                  (t.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(t.position)
                    : t.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(t.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(t, e) {
              this.router.triggerEvent(
                new Oh(
                  t,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  e
                )
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (t) {
              na();
            }),
            (t.ɵdir = be({ type: t })),
            t
          );
        })();
      const Ip = new jt("ROUTER_CONFIGURATION"),
        Rp = new jt("ROUTER_FORROOT_GUARD"),
        Np = [
          Cc,
          { provide: Gh, useClass: Xh },
          {
            provide: xp,
            useFactory: function (t, e, n, i, r, o, a, s = {}, l, c) {
              const u = new xp(null, t, e, n, i, r, o, jh(a));
              if (
                (l && (u.urlHandlingStrategy = l),
                c && (u.routeReuseStrategy = c),
                s.errorHandler && (u.errorHandler = s.errorHandler),
                s.malformedUriErrorHandler &&
                  (u.malformedUriErrorHandler = s.malformedUriErrorHandler),
                s.enableTracing)
              ) {
                const t = oc();
                u.events.subscribe((e) => {
                  t.logGroup(`Router Event: ${e.constructor.name}`),
                    t.log(e.toString()),
                    t.log(e),
                    t.logGroupEnd();
                });
              }
              return (
                s.onSameUrlNavigation &&
                  (u.onSameUrlNavigation = s.onSameUrlNavigation),
                s.paramsInheritanceStrategy &&
                  (u.paramsInheritanceStrategy = s.paramsInheritanceStrategy),
                s.urlUpdateStrategy &&
                  (u.urlUpdateStrategy = s.urlUpdateStrategy),
                s.relativeLinkResolution &&
                  (u.relativeLinkResolution = s.relativeLinkResolution),
                u
              );
            },
            deps: [
              Gh,
              kp,
              Cc,
              Vo,
              Zl,
              Ol,
              bp,
              Ip,
              [class {}, new it()],
              [class {}, new it()],
            ],
          },
          kp,
          {
            provide: gd,
            useFactory: function (t) {
              return t.routerState.root;
            },
            deps: [xp],
          },
          { provide: Zl, useClass: Kl },
          Tp,
          Ep,
          class {
            preload(t, e) {
              return e().pipe(Uu(() => fu(null)));
            }
          },
          { provide: Ip, useValue: { enableTracing: !1 } },
        ];
      function Dp() {
        return new ql("Router", xp);
      }
      let Vp = (() => {
        class t {
          constructor(t, e) {}
          static forRoot(e, n) {
            return {
              ngModule: t,
              providers: [
                Np,
                Fp(e),
                {
                  provide: Rp,
                  useFactory: Up,
                  deps: [[xp, new it(), new ot()]],
                },
                { provide: Ip, useValue: n || {} },
                {
                  provide: mc,
                  useFactory: zp,
                  deps: [sc, [new nt(_c), new it()], Ip],
                },
                { provide: Ap, useFactory: jp, deps: [xp, zc, Ip] },
                {
                  provide: Sp,
                  useExisting:
                    n && n.preloadingStrategy ? n.preloadingStrategy : Ep,
                },
                { provide: ql, multi: !0, useFactory: Dp },
                [
                  Lp,
                  { provide: al, multi: !0, useFactory: Hp, deps: [Lp] },
                  { provide: $p, useFactory: qp, deps: [Lp] },
                  { provide: pl, multi: !0, useExisting: $p },
                ],
              ],
            };
          }
          static forChild(e) {
            return { ngModule: t, providers: [Fp(e)] };
          }
        }
        return (
          (t.ɵmod = ge({ type: t })),
          (t.ɵinj = ut({
            factory: function (e) {
              return new (e || t)(Gt(Rp, 8), Gt(xp, 8));
            },
          })),
          t
        );
      })();
      function jp(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new Ap(t, e, n);
      }
      function zp(t, e, n = {}) {
        return n.useHash ? new wc(t, e) : new yc(t, e);
      }
      function Up(t) {
        if (t)
          throw new Error(
            "RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function Fp(t) {
        return [
          { provide: jo, multi: !0, useValue: t },
          { provide: bp, multi: !0, useValue: t },
        ];
      }
      let Lp = (() => {
        class t {
          constructor(t) {
            (this.injector = t),
              (this.initNavigation = !1),
              (this.resultOfPreactivationDone = new k());
          }
          appInitializer() {
            return this.injector.get(cc, Promise.resolve(null)).then(() => {
              let t = null;
              const e = new Promise((e) => (t = e)),
                n = this.injector.get(xp),
                i = this.injector.get(Ip);
              if (this.isLegacyDisabled(i) || this.isLegacyEnabled(i)) t(!0);
              else if ("disabled" === i.initialNavigation)
                n.setUpLocationChangeListener(), t(!0);
              else {
                if ("enabled" !== i.initialNavigation)
                  throw new Error(
                    `Invalid initialNavigation options: '${i.initialNavigation}'`
                  );
                (n.hooks.afterPreactivation = () =>
                  this.initNavigation
                    ? fu(null)
                    : ((this.initNavigation = !0),
                      t(!0),
                      this.resultOfPreactivationDone)),
                  n.initialNavigation();
              }
              return e;
            });
          }
          bootstrapListener(t) {
            const e = this.injector.get(Ip),
              n = this.injector.get(Tp),
              i = this.injector.get(Ap),
              r = this.injector.get(xp),
              o = this.injector.get(Xl);
            t === o.components[0] &&
              (this.isLegacyEnabled(e)
                ? r.initialNavigation()
                : this.isLegacyDisabled(e) && r.setUpLocationChangeListener(),
              n.setUpPreloading(),
              i.init(),
              r.resetRootComponentType(o.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
          isLegacyEnabled(t) {
            return (
              "legacy_enabled" === t.initialNavigation ||
              !0 === t.initialNavigation ||
              void 0 === t.initialNavigation
            );
          }
          isLegacyDisabled(t) {
            return (
              "legacy_disabled" === t.initialNavigation ||
              !1 === t.initialNavigation
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(Vo));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Hp(t) {
        return t.appInitializer.bind(t);
      }
      function qp(t) {
        return t.bootstrapListener.bind(t);
      }
      const $p = new jt("Router Initializer");
      let Yp = (() => {
        class t {
          constructor() {
            this.title = "Personal-Portfolio-Angular";
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = he({
            type: t,
            selectors: [["app-root"]],
            decls: 1,
            vars: 0,
            template: function (t, e) {
              1 & t && sa(0, "router-outlet");
            },
            directives: [Pp],
            styles: [""],
          })),
          t
        );
      })();
      class Bp extends h {
        constructor(t, e) {
          super();
        }
        schedule(t, e = 0) {
          return this;
        }
      }
      class Gp extends Bp {
        constructor(t, e) {
          super(t, e),
            (this.scheduler = t),
            (this.work = e),
            (this.pending = !1);
        }
        schedule(t, e = 0) {
          if (this.closed) return this;
          this.state = t;
          const n = this.id,
            i = this.scheduler;
          return (
            null != n && (this.id = this.recycleAsyncId(i, n, e)),
            (this.pending = !0),
            (this.delay = e),
            (this.id = this.id || this.requestAsyncId(i, this.id, e)),
            this
          );
        }
        requestAsyncId(t, e, n = 0) {
          return setInterval(t.flush.bind(t, this), n);
        }
        recycleAsyncId(t, e, n = 0) {
          if (null !== n && this.delay === n && !1 === this.pending) return e;
          clearInterval(e);
        }
        execute(t, e) {
          if (this.closed) return new Error("executing a cancelled action");
          this.pending = !1;
          const n = this._execute(t, e);
          if (n) return n;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(t, e) {
          let n = !1,
            i = void 0;
          try {
            this.work(t);
          } catch (r) {
            (n = !0), (i = (!!r && r) || new Error(r));
          }
          if (n) return this.unsubscribe(), i;
        }
        _unsubscribe() {
          const t = this.id,
            e = this.scheduler,
            n = e.actions,
            i = n.indexOf(this);
          (this.work = null),
            (this.state = null),
            (this.pending = !1),
            (this.scheduler = null),
            -1 !== i && n.splice(i, 1),
            null != t && (this.id = this.recycleAsyncId(e, t, null)),
            (this.delay = null);
        }
      }
      class Xp extends Gp {
        constructor(t, e) {
          super(t, e), (this.scheduler = t), (this.work = e);
        }
        schedule(t, e = 0) {
          return e > 0
            ? super.schedule(t, e)
            : ((this.delay = e),
              (this.state = t),
              this.scheduler.flush(this),
              this);
        }
        execute(t, e) {
          return e > 0 || this.closed
            ? super.execute(t, e)
            : this._execute(t, e);
        }
        requestAsyncId(t, e, n = 0) {
          return (null !== n && n > 0) || (null === n && this.delay > 0)
            ? super.requestAsyncId(t, e, n)
            : t.flush(this);
        }
      }
      let Wp = (() => {
        class t {
          constructor(e, n = t.now) {
            (this.SchedulerAction = e), (this.now = n);
          }
          schedule(t, e = 0, n) {
            return new this.SchedulerAction(this, t).schedule(n, e);
          }
        }
        return (t.now = () => Date.now()), t;
      })();
      class Zp extends Wp {
        constructor(t, e = Wp.now) {
          super(t, () =>
            Zp.delegate && Zp.delegate !== this ? Zp.delegate.now() : e()
          ),
            (this.actions = []),
            (this.active = !1),
            (this.scheduled = void 0);
        }
        schedule(t, e = 0, n) {
          return Zp.delegate && Zp.delegate !== this
            ? Zp.delegate.schedule(t, e, n)
            : super.schedule(t, e, n);
        }
        flush(t) {
          const { actions: e } = this;
          if (this.active) return void e.push(t);
          let n;
          this.active = !0;
          do {
            if ((n = t.execute(t.state, t.delay))) break;
          } while ((t = e.shift()));
          if (((this.active = !1), n)) {
            for (; (t = e.shift()); ) t.unsubscribe();
            throw n;
          }
        }
      }
      class Qp extends Zp {}
      const Jp = new Qp(Xp);
      let Kp = (() => {
        class t {
          constructor(t, e, n) {
            (this.kind = t),
              (this.value = e),
              (this.error = n),
              (this.hasValue = "N" === t);
          }
          observe(t) {
            switch (this.kind) {
              case "N":
                return t.next && t.next(this.value);
              case "E":
                return t.error && t.error(this.error);
              case "C":
                return t.complete && t.complete();
            }
          }
          do(t, e, n) {
            switch (this.kind) {
              case "N":
                return t && t(this.value);
              case "E":
                return e && e(this.error);
              case "C":
                return n && n();
            }
          }
          accept(t, e, n) {
            return t && "function" == typeof t.next
              ? this.observe(t)
              : this.do(t, e, n);
          }
          toObservable() {
            switch (this.kind) {
              case "N":
                return fu(this.value);
              case "E":
                return (t = this.error), new w((e) => e.error(t));
              case "C":
                return Cu();
            }
            var t;
            throw new Error("unexpected notification kind value");
          }
          static createNext(e) {
            return void 0 !== e ? new t("N", e) : t.undefinedValueNotification;
          }
          static createError(e) {
            return new t("E", void 0, e);
          }
          static createComplete() {
            return t.completeNotification;
          }
        }
        return (
          (t.completeNotification = new t("C")),
          (t.undefinedValueNotification = new t("N", void 0)),
          t
        );
      })();
      class tf extends f {
        constructor(t, e, n = 0) {
          super(t), (this.scheduler = e), (this.delay = n);
        }
        static dispatch(t) {
          const { notification: e, destination: n } = t;
          e.observe(n), this.unsubscribe();
        }
        scheduleMessage(t) {
          this.destination.add(
            this.scheduler.schedule(
              tf.dispatch,
              this.delay,
              new ef(t, this.destination)
            )
          );
        }
        _next(t) {
          this.scheduleMessage(Kp.createNext(t));
        }
        _error(t) {
          this.scheduleMessage(Kp.createError(t)), this.unsubscribe();
        }
        _complete() {
          this.scheduleMessage(Kp.createComplete()), this.unsubscribe();
        }
      }
      class ef {
        constructor(t, e) {
          (this.notification = t), (this.destination = e);
        }
      }
      class nf extends k {
        constructor(
          t = Number.POSITIVE_INFINITY,
          e = Number.POSITIVE_INFINITY,
          n
        ) {
          super(),
            (this.scheduler = n),
            (this._events = []),
            (this._infiniteTimeWindow = !1),
            (this._bufferSize = t < 1 ? 1 : t),
            (this._windowTime = e < 1 ? 1 : e),
            e === Number.POSITIVE_INFINITY
              ? ((this._infiniteTimeWindow = !0),
                (this.next = this.nextInfiniteTimeWindow))
              : (this.next = this.nextTimeWindow);
        }
        nextInfiniteTimeWindow(t) {
          const e = this._events;
          e.push(t), e.length > this._bufferSize && e.shift(), super.next(t);
        }
        nextTimeWindow(t) {
          this._events.push(new rf(this._getNow(), t)),
            this._trimBufferThenGetEvents(),
            super.next(t);
        }
        _subscribe(t) {
          const e = this._infiniteTimeWindow,
            n = e ? this._events : this._trimBufferThenGetEvents(),
            i = this.scheduler,
            r = n.length;
          let o;
          if (this.closed) throw new v();
          if (
            (this.isStopped || this.hasError
              ? (o = h.EMPTY)
              : (this.observers.push(t), (o = new x(this, t))),
            i && t.add((t = new tf(t, i))),
            e)
          )
            for (let a = 0; a < r && !t.closed; a++) t.next(n[a]);
          else for (let a = 0; a < r && !t.closed; a++) t.next(n[a].value);
          return (
            this.hasError
              ? t.error(this.thrownError)
              : this.isStopped && t.complete(),
            o
          );
        }
        _getNow() {
          return (this.scheduler || Jp).now();
        }
        _trimBufferThenGetEvents() {
          const t = this._getNow(),
            e = this._bufferSize,
            n = this._windowTime,
            i = this._events,
            r = i.length;
          let o = 0;
          for (; o < r && !(t - i[o].time < n); ) o++;
          return r > e && (o = Math.max(o, r - e)), o > 0 && i.splice(0, o), i;
        }
      }
      class rf {
        constructor(t, e) {
          (this.time = t), (this.value = e);
        }
      }
      class of {
        constructor(t) {
          this.notifier = t;
        }
        call(t, e) {
          const n = new af(t),
            i = D(n, this.notifier);
          return i && !n.seenValue ? (n.add(i), e.subscribe(n)) : n;
        }
      }
      class af extends V {
        constructor(t) {
          super(t), (this.seenValue = !1);
        }
        notifyNext(t, e, n, i, r) {
          (this.seenValue = !0), this.complete();
        }
        notifyComplete() {}
      }
      function sf(t, e) {
        return { type: 7, name: t, definitions: e, options: {} };
      }
      function lf(t, e = null) {
        return { type: 4, styles: e, timings: t };
      }
      function cf(t) {
        return { type: 6, styles: t, offset: null };
      }
      function uf(t, e, n) {
        return { type: 0, name: t, styles: e, options: n };
      }
      function hf(t, e, n = null) {
        return { type: 1, expr: t, animation: e, options: n };
      }
      function df(t, e) {
        1 & t && sa(0, "div");
      }
      function pf(t, e) {
        if ((1 & t && (oa(0, "div"), Ko(1, df, 1, 0, "div", 5), aa()), 2 & t)) {
          const t = fa(2);
          Pa(ie, Oa, t.spinner.class, !0),
            va("color", t.spinner.color),
            Zi(1),
            ia("ngForOf", t.spinner.divArray);
        }
      }
      function ff(t, e) {
        1 & t && sa(0, "div", 6), 2 & t && ia("innerHTML", fa(2).template, Ii);
      }
      function gf(t, e) {
        if (
          (1 & t &&
            (oa(0, "div", 1),
            Ko(1, pf, 2, 5, "div", 2),
            Ko(2, ff, 1, 1, "div", 3),
            oa(3, "div", 4),
            (function (t, e = 0, n) {
              const i = Be(),
                r = Ge(),
                o = sr(r, i[6], t, 1, null, n || null);
              null === o.projection && (o.projection = e),
                Je(),
                (function (t, e, n) {
                  co(e[11], 0, e, n, Kr(t, n, e), ro(n.parent || e[6], e));
                })(r, i, o);
            })(4),
            aa(),
            aa()),
          2 & t)
        ) {
          const t = fa();
          va("background-color", t.spinner.bdColor)(
            "z-index",
            t.spinner.zIndex
          )("position", t.spinner.fullScreen ? "fixed" : "absolute"),
            ia("@fadeIn", "in"),
            Zi(1),
            ia("ngIf", !t.template),
            Zi(1),
            ia("ngIf", t.template),
            Zi(1),
            va("z-index", t.spinner.zIndex);
        }
      }
      const mf = ["*"],
        bf = {
          "ball-8bits": 16,
          "ball-atom": 4,
          "ball-beat": 3,
          "ball-circus": 5,
          "ball-climbing-dot": 4,
          "ball-clip-rotate": 1,
          "ball-clip-rotate-multiple": 2,
          "ball-clip-rotate-pulse": 2,
          "ball-elastic-dots": 5,
          "ball-fall": 3,
          "ball-fussion": 4,
          "ball-grid-beat": 9,
          "ball-grid-pulse": 9,
          "ball-newton-cradle": 4,
          "ball-pulse": 3,
          "ball-pulse-rise": 5,
          "ball-pulse-sync": 3,
          "ball-rotate": 1,
          "ball-running-dots": 5,
          "ball-scale": 1,
          "ball-scale-multiple": 3,
          "ball-scale-pulse": 2,
          "ball-scale-ripple": 1,
          "ball-scale-ripple-multiple": 3,
          "ball-spin": 8,
          "ball-spin-clockwise": 8,
          "ball-spin-clockwise-fade": 8,
          "ball-spin-clockwise-fade-rotating": 8,
          "ball-spin-fade": 8,
          "ball-spin-fade-rotating": 8,
          "ball-spin-rotate": 2,
          "ball-square-clockwise-spin": 8,
          "ball-square-spin": 8,
          "ball-triangle-path": 3,
          "ball-zig-zag": 2,
          "ball-zig-zag-deflect": 2,
          cog: 1,
          "cube-transition": 2,
          fire: 3,
          "line-scale": 5,
          "line-scale-party": 5,
          "line-scale-pulse-out": 5,
          "line-scale-pulse-out-rapid": 5,
          "line-spin-clockwise-fade": 8,
          "line-spin-clockwise-fade-rotating": 8,
          "line-spin-fade": 8,
          "line-spin-fade-rotating": 8,
          pacman: 6,
          "square-jelly-box": 2,
          "square-loader": 1,
          "square-spin": 1,
          timer: 1,
          "triangle-skew-spin": 1,
        };
      class _f {
        constructor(t) {
          Object.assign(this, t);
        }
      }
      let yf = (() => {
          let t = class {
            constructor() {
              this.spinnerObservable = new nf(1);
            }
            getSpinner(t) {
              return this.spinnerObservable
                .asObservable()
                .pipe(Ou((e) => e && e.name === t));
            }
            show(t = "primary", e) {
              return new Promise((n, i) => {
                e && Object.keys(e).length
                  ? ((e.name = t),
                    this.spinnerObservable.next(
                      new _f(Object.assign(Object.assign({}, e), { show: !0 }))
                    ),
                    n(!0))
                  : (this.spinnerObservable.next(new _f({ name: t, show: !0 })),
                    n(!0));
              });
            }
            hide(t = "primary", e = 0) {
              return new Promise((n, i) => {
                setTimeout(() => {
                  this.spinnerObservable.next(new _f({ name: t, show: !1 })),
                    n(!0);
                }, e);
              });
            }
          };
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t();
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        wf = (() => {
          let t = class {
            constructor(t, e) {
              (this.spinnerService = t),
                (this.changeDetector = e),
                (this.spinner = new _f()),
                (this.ngUnsubscribe = new k()),
                (this.setDefaultOptions = () => {
                  this.spinner = new _f({
                    name: this.name,
                    bdColor: this.bdColor,
                    size: this.size,
                    color: this.color,
                    type: this.type,
                    fullScreen: this.fullScreen,
                    divArray: this.divArray,
                    divCount: this.divCount,
                    show: this.show,
                    zIndex: this.zIndex,
                    template: this.template,
                  });
                }),
                (this.bdColor = "rgba(51,51,51,0.8)"),
                (this.zIndex = 99999),
                (this.color = "#fff"),
                (this.type = "ball-scale-multiple"),
                (this.size = "large"),
                (this.fullScreen = !0),
                (this.name = "primary"),
                (this.template = null),
                (this.divArray = []),
                (this.divCount = 0),
                (this.show = !1);
            }
            ngOnInit() {
              var t;
              this.setDefaultOptions(),
                this.spinnerService
                  .getSpinner(this.name)
                  .pipe(((t = this.ngUnsubscribe), (e) => e.lift(new of(t))))
                  .subscribe((t) => {
                    this.setDefaultOptions(),
                      Object.assign(this.spinner, t),
                      t.show && this.onInputChange(),
                      this.changeDetector.markForCheck();
                  });
            }
            ngOnChanges(t) {
              for (const e in t)
                if (e) {
                  const n = t[e];
                  if (n.isFirstChange()) return;
                  void 0 !== n.currentValue &&
                    n.currentValue !== n.previousValue &&
                    "" !== n.currentValue &&
                    (this.spinner[e] = n.currentValue);
                }
            }
            getClass(t, e) {
              (this.spinner.divCount = bf[t]),
                (this.spinner.divArray = Array(this.spinner.divCount)
                  .fill(0)
                  .map((t, e) => e));
              let n = "";
              switch (e.toLowerCase()) {
                case "small":
                  n = "la-sm";
                  break;
                case "medium":
                  n = "la-2x";
                  break;
                case "large":
                  n = "la-3x";
              }
              return "la-" + t + " " + n;
            }
            onInputChange() {
              this.spinner.class = this.getClass(
                this.spinner.type,
                this.spinner.size
              );
            }
            ngOnDestroy() {
              this.ngUnsubscribe.next(), this.ngUnsubscribe.complete();
            }
          };
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ea(yf), ea(wo));
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["ngx-spinner"]],
              inputs: {
                bdColor: "bdColor",
                zIndex: "zIndex",
                color: "color",
                type: "type",
                size: "size",
                fullScreen: "fullScreen",
                name: "name",
                template: "template",
              },
              features: [Ya],
              ngContentSelectors: mf,
              decls: 1,
              vars: 1,
              consts: [
                [
                  "class",
                  "overlay",
                  3,
                  "background-color",
                  "z-index",
                  "position",
                  4,
                  "ngIf",
                ],
                [1, "overlay"],
                [3, "class", "color", 4, "ngIf"],
                [3, "innerHTML", 4, "ngIf"],
                [1, "loading-text"],
                [4, "ngFor", "ngForOf"],
                [3, "innerHTML"],
              ],
              template: function (t, e) {
                1 & t &&
                  ((function (t) {
                    const e = Be()[16][6];
                    if (!e.projection) {
                      const t = (e.projection = ne(1, null)),
                        n = t.slice();
                      let i = e.child;
                      for (; null !== i; ) {
                        const e = 0;
                        null !== e &&
                          (n[e] ? (n[e].projectionNext = i) : (t[e] = i),
                          (n[e] = i)),
                          (i = i.next);
                      }
                    }
                  })(),
                  Ko(0, gf, 5, 11, "div", 0)),
                  2 & t && ia("ngIf", e.spinner.show);
              },
              directives: [Ic, Tc],
              styles: [
                '.la-ball-8bits[_ngcontent-%COMP%], .la-ball-8bits[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-8bits[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:12px;height:12px}.la-ball-8bits.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-8bits[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:4px;height:4px;border-radius:0;opacity:0;-webkit-transform:translate(100%,100%);transform:translate(100%,100%);-webkit-animation:1s infinite ball-8bits;animation:1s infinite ball-8bits}.la-ball-8bits[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){-webkit-animation-delay:-.9375s;animation-delay:-.9375s;top:-100%;left:0}.la-ball-8bits[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){-webkit-animation-delay:-.875s;animation-delay:-.875s;top:-100%;left:33.3333333333%}.la-ball-8bits[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){-webkit-animation-delay:-.8125s;animation-delay:-.8125s;top:-66.6666666667%;left:66.6666666667%}.la-ball-8bits[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){-webkit-animation-delay:-.75s;animation-delay:-.75s;top:-33.3333333333%;left:100%}.la-ball-8bits[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){-webkit-animation-delay:-.6875s;animation-delay:-.6875s;top:0;left:100%}.la-ball-8bits[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){-webkit-animation-delay:-.625s;animation-delay:-.625s;top:33.3333333333%;left:100%}.la-ball-8bits[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(7){-webkit-animation-delay:-.5625s;animation-delay:-.5625s;top:66.6666666667%;left:66.6666666667%}.la-ball-8bits[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(8){-webkit-animation-delay:-.5s;animation-delay:-.5s;top:100%;left:33.3333333333%}.la-ball-8bits[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(9){-webkit-animation-delay:-.4375s;animation-delay:-.4375s;top:100%;left:0}.la-ball-8bits[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(10){-webkit-animation-delay:-.375s;animation-delay:-.375s;top:100%;left:-33.3333333333%}.la-ball-8bits[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(11){-webkit-animation-delay:-.3125s;animation-delay:-.3125s;top:66.6666666667%;left:-66.6666666667%}.la-ball-8bits[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(12){-webkit-animation-delay:-.25s;animation-delay:-.25s;top:33.3333333333%;left:-100%}.la-ball-8bits[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(13){-webkit-animation-delay:-.1875s;animation-delay:-.1875s;top:0;left:-100%}.la-ball-8bits[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(14){-webkit-animation-delay:-.125s;animation-delay:-.125s;top:-33.3333333333%;left:-100%}.la-ball-8bits[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(15){-webkit-animation-delay:-.0625s;animation-delay:-.0625s;top:-66.6666666667%;left:-66.6666666667%}.la-ball-8bits[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(16){-webkit-animation-delay:0s;animation-delay:0s;top:-100%;left:-33.3333333333%}.la-ball-8bits.la-sm[_ngcontent-%COMP%]{width:6px;height:6px}.la-ball-8bits.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:2px;height:2px}.la-ball-8bits.la-2x[_ngcontent-%COMP%]{width:24px;height:24px}.la-ball-8bits.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:8px;height:8px}.la-ball-8bits.la-3x[_ngcontent-%COMP%]{width:36px;height:36px}.la-ball-8bits.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:12px;height:12px}@-webkit-keyframes ball-8bits{0%,50%{opacity:1}51%{opacity:0}}@keyframes ball-8bits{0%,50%{opacity:1}51%{opacity:0}}.la-ball-atom[_ngcontent-%COMP%], .la-ball-atom[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-atom[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-atom.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-atom[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor}.la-ball-atom[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){position:absolute;top:50%;left:50%;z-index:1;width:60%;height:60%;background:#aaa;border-radius:100%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);-webkit-animation:4.5s linear infinite ball-atom-shrink;animation:4.5s linear infinite ball-atom-shrink}.la-ball-atom[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(:nth-child(1)){position:absolute;left:0;z-index:0;width:100%;height:100%;background:0 0;-webkit-animation:1.5s steps(2,end) infinite ball-atom-zindex;animation:1.5s steps(2,end) infinite ball-atom-zindex}.la-ball-atom[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(:nth-child(1)):before{position:absolute;top:0;left:0;width:10px;height:10px;margin-top:-5px;margin-left:-5px;content:"";background:currentColor;border-radius:50%;opacity:.75;-webkit-animation:1.5s infinite ball-atom-position,1.5s infinite ball-atom-size;animation:1.5s infinite ball-atom-position,1.5s infinite ball-atom-size}.la-ball-atom[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){-webkit-animation-delay:.75s;animation-delay:.75s}.la-ball-atom[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2):before{-webkit-animation-delay:0s,-1.125s;animation-delay:0s,-1.125s}.la-ball-atom[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){-webkit-transform:rotate(120deg);transform:rotate(120deg);-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-ball-atom[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3):before{-webkit-animation-delay:-1s,-.75s;animation-delay:-1s,-.75s}.la-ball-atom[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){-webkit-transform:rotate(240deg);transform:rotate(240deg);-webkit-animation-delay:.25s;animation-delay:.25s}.la-ball-atom[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4):before{-webkit-animation-delay:-.5s,-125ms;animation-delay:-.5s,-125ms}.la-ball-atom.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-atom.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(:nth-child(1)):before{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-atom.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-ball-atom.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(:nth-child(1)):before{width:20px;height:20px;margin-top:-10px;margin-left:-10px}.la-ball-atom.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-ball-atom.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(:nth-child(1)):before{width:30px;height:30px;margin-top:-15px;margin-left:-15px}@-webkit-keyframes ball-atom-position{50%{top:100%;left:100%}}@keyframes ball-atom-position{50%{top:100%;left:100%}}@-webkit-keyframes ball-atom-size{50%{-webkit-transform:scale(.5,.5);transform:scale(.5,.5)}}@keyframes ball-atom-size{50%{-webkit-transform:scale(.5,.5);transform:scale(.5,.5)}}@-webkit-keyframes ball-atom-zindex{50%{z-index:10}}@keyframes ball-atom-zindex{50%{z-index:10}}@-webkit-keyframes ball-atom-shrink{50%{-webkit-transform:translate(-50%,-50%) scale(.8,.8);transform:translate(-50%,-50%) scale(.8,.8)}}@keyframes ball-atom-shrink{50%{-webkit-transform:translate(-50%,-50%) scale(.8,.8);transform:translate(-50%,-50%) scale(.8,.8)}}.la-ball-beat[_ngcontent-%COMP%], .la-ball-beat[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-beat[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:54px;height:18px}.la-ball-beat.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-beat[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;margin:4px;border-radius:100%;-webkit-animation:.7s linear -.15s infinite ball-beat;animation:.7s linear -.15s infinite ball-beat}.la-ball-beat[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2n-1){-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-ball-beat.la-sm[_ngcontent-%COMP%]{width:26px;height:8px}.la-ball-beat.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px;margin:2px}.la-ball-beat.la-2x[_ngcontent-%COMP%]{width:108px;height:36px}.la-ball-beat.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:20px;height:20px;margin:8px}.la-ball-beat.la-3x[_ngcontent-%COMP%]{width:162px;height:54px}.la-ball-beat.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:30px;height:30px;margin:12px}@-webkit-keyframes ball-beat{50%{opacity:.2;-webkit-transform:scale(.75);transform:scale(.75)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@keyframes ball-beat{50%{opacity:.2;-webkit-transform:scale(.75);transform:scale(.75)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}.la-ball-circus[_ngcontent-%COMP%], .la-ball-circus[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-circus[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:16px;height:16px}.la-ball-circus.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-circus[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:0;left:-100%;display:block;width:100%;height:100%;border-radius:100%;opacity:.5;-webkit-animation:2.5s cubic-bezier(.25,0,.75,1) infinite ball-circus-position,2.5s cubic-bezier(.25,0,.75,1) infinite ball-circus-size;animation:2.5s cubic-bezier(.25,0,.75,1) infinite ball-circus-position,2.5s cubic-bezier(.25,0,.75,1) infinite ball-circus-size}.la-ball-circus[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){-webkit-animation-delay:0s,-.5s;animation-delay:0s,-.5s}.la-ball-circus[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){-webkit-animation-delay:-.5s,-1s;animation-delay:-.5s,-1s}.la-ball-circus[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){-webkit-animation-delay:-1s,-1.5s;animation-delay:-1s,-1.5s}.la-ball-circus[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){-webkit-animation-delay:-1.5s,-2s;animation-delay:-1.5s,-2s}.la-ball-circus[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){-webkit-animation-delay:-2s,-2.5s;animation-delay:-2s,-2.5s}.la-ball-circus.la-sm[_ngcontent-%COMP%], .la-ball-circus.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:8px;height:8px}.la-ball-circus.la-2x[_ngcontent-%COMP%], .la-ball-circus.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:32px;height:32px}.la-ball-circus.la-3x[_ngcontent-%COMP%], .la-ball-circus.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:48px;height:48px}@-webkit-keyframes ball-circus-position{50%{left:100%}}@keyframes ball-circus-position{50%{left:100%}}@-webkit-keyframes ball-circus-size{50%{-webkit-transform:scale(.3,.3);transform:scale(.3,.3)}}@keyframes ball-circus-size{50%{-webkit-transform:scale(.3,.3);transform:scale(.3,.3)}}.la-ball-climbing-dot[_ngcontent-%COMP%], .la-ball-climbing-dot[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-climbing-dot[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:42px;height:32px}.la-ball-climbing-dot.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-climbing-dot[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor}.la-ball-climbing-dot[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){position:absolute;bottom:32%;left:18%;width:14px;height:14px;border-radius:100%;-webkit-transform-origin:center bottom;transform-origin:center bottom;-webkit-animation:.6s ease-in-out infinite ball-climbing-dot-jump;animation:.6s ease-in-out infinite ball-climbing-dot-jump}.la-ball-climbing-dot[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(:nth-child(1)){position:absolute;top:0;right:0;width:14px;height:2px;border-radius:0;-webkit-transform:translate(60%,0);transform:translate(60%,0);-webkit-animation:1.8s linear infinite ball-climbing-dot-steps;animation:1.8s linear infinite ball-climbing-dot-steps}.la-ball-climbing-dot[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(:nth-child(1)):nth-child(2){-webkit-animation-delay:0s;animation-delay:0s}.la-ball-climbing-dot[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(:nth-child(1)):nth-child(3){-webkit-animation-delay:-.6s;animation-delay:-.6s}.la-ball-climbing-dot[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(:nth-child(1)):nth-child(4){-webkit-animation-delay:-1.2s;animation-delay:-1.2s}.la-ball-climbing-dot.la-sm[_ngcontent-%COMP%]{width:20px;height:16px}.la-ball-climbing-dot.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){width:6px;height:6px}.la-ball-climbing-dot.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(:nth-child(1)){width:6px;height:1px}.la-ball-climbing-dot.la-2x[_ngcontent-%COMP%]{width:84px;height:64px}.la-ball-climbing-dot.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){width:28px;height:28px}.la-ball-climbing-dot.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(:nth-child(1)){width:28px;height:4px}.la-ball-climbing-dot.la-3x[_ngcontent-%COMP%]{width:126px;height:96px}.la-ball-climbing-dot.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){width:42px;height:42px}.la-ball-climbing-dot.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(:nth-child(1)){width:42px;height:6px}@-webkit-keyframes ball-climbing-dot-jump{0%,100%{-webkit-transform:scale(1,.7);transform:scale(1,.7)}20%,80%,90%{-webkit-transform:scale(.7,1.2);transform:scale(.7,1.2)}40%,46%{-webkit-transform:scale(1,1);transform:scale(1,1)}50%{bottom:125%}}@keyframes ball-climbing-dot-jump{0%,100%{-webkit-transform:scale(1,.7);transform:scale(1,.7)}20%,80%,90%{-webkit-transform:scale(.7,1.2);transform:scale(.7,1.2)}40%,46%{-webkit-transform:scale(1,1);transform:scale(1,1)}50%{bottom:125%}}@-webkit-keyframes ball-climbing-dot-steps{0%{top:0;right:0;opacity:0}50%{opacity:1}100%{top:100%;right:100%;opacity:0}}@keyframes ball-climbing-dot-steps{0%{top:0;right:0;opacity:0}50%{opacity:1}100%{top:100%;right:100%;opacity:0}}.la-ball-clip-rotate-multiple[_ngcontent-%COMP%], .la-ball-clip-rotate-multiple[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-clip-rotate-multiple[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-clip-rotate-multiple.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-clip-rotate-multiple[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;border:2px solid currentColor;position:absolute;top:50%;left:50%;background:0 0;border-radius:100%;-webkit-animation:1s ease-in-out infinite ball-clip-rotate-multiple-rotate;animation:1s ease-in-out infinite ball-clip-rotate-multiple-rotate}.la-ball-clip-rotate-multiple[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:first-child{position:absolute;width:32px;height:32px;border-right-color:transparent;border-left-color:transparent}.la-ball-clip-rotate-multiple[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:last-child{width:16px;height:16px;border-top-color:transparent;border-bottom-color:transparent;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-direction:reverse;animation-direction:reverse}.la-ball-clip-rotate-multiple.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-clip-rotate-multiple.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{border-width:1px}.la-ball-clip-rotate-multiple.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:first-child{width:16px;height:16px}.la-ball-clip-rotate-multiple.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:last-child{width:8px;height:8px}.la-ball-clip-rotate-multiple.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-ball-clip-rotate-multiple.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{border-width:4px}.la-ball-clip-rotate-multiple.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:first-child{width:64px;height:64px}.la-ball-clip-rotate-multiple.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:last-child{width:32px;height:32px}.la-ball-clip-rotate-multiple.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-ball-clip-rotate-multiple.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{border-width:6px}.la-ball-clip-rotate-multiple.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:first-child{width:96px;height:96px}.la-ball-clip-rotate-multiple.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:last-child{width:48px;height:48px}@-webkit-keyframes ball-clip-rotate-multiple-rotate{0%{-webkit-transform:translate(-50%,-50%) rotate(0);transform:translate(-50%,-50%) rotate(0)}50%{-webkit-transform:translate(-50%,-50%) rotate(180deg);transform:translate(-50%,-50%) rotate(180deg)}100%{-webkit-transform:translate(-50%,-50%) rotate(360deg);transform:translate(-50%,-50%) rotate(360deg)}}@keyframes ball-clip-rotate-multiple-rotate{0%{-webkit-transform:translate(-50%,-50%) rotate(0);transform:translate(-50%,-50%) rotate(0)}50%{-webkit-transform:translate(-50%,-50%) rotate(180deg);transform:translate(-50%,-50%) rotate(180deg)}100%{-webkit-transform:translate(-50%,-50%) rotate(360deg);transform:translate(-50%,-50%) rotate(360deg)}}.la-ball-clip-rotate-pulse[_ngcontent-%COMP%], .la-ball-clip-rotate-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-clip-rotate-pulse[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-clip-rotate-pulse.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-clip-rotate-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;border-radius:100%}.la-ball-clip-rotate-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:first-child{position:absolute;width:32px;height:32px;background:0 0;border-style:solid;border-width:2px;border-right-color:transparent;border-left-color:transparent;-webkit-animation:1s cubic-bezier(.09,.57,.49,.9) infinite ball-clip-rotate-pulse-rotate;animation:1s cubic-bezier(.09,.57,.49,.9) infinite ball-clip-rotate-pulse-rotate}.la-ball-clip-rotate-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:last-child{width:16px;height:16px;-webkit-animation:1s cubic-bezier(.09,.57,.49,.9) infinite ball-clip-rotate-pulse-scale;animation:1s cubic-bezier(.09,.57,.49,.9) infinite ball-clip-rotate-pulse-scale}.la-ball-clip-rotate-pulse.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-clip-rotate-pulse.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:first-child{width:16px;height:16px;border-width:1px}.la-ball-clip-rotate-pulse.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:last-child{width:8px;height:8px}.la-ball-clip-rotate-pulse.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-ball-clip-rotate-pulse.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:first-child{width:64px;height:64px;border-width:4px}.la-ball-clip-rotate-pulse.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:last-child{width:32px;height:32px}.la-ball-clip-rotate-pulse.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-ball-clip-rotate-pulse.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:first-child{width:96px;height:96px;border-width:6px}.la-ball-clip-rotate-pulse.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:last-child{width:48px;height:48px}@-webkit-keyframes ball-clip-rotate-pulse-rotate{0%{-webkit-transform:translate(-50%,-50%) rotate(0);transform:translate(-50%,-50%) rotate(0)}50%{-webkit-transform:translate(-50%,-50%) rotate(180deg);transform:translate(-50%,-50%) rotate(180deg)}100%{-webkit-transform:translate(-50%,-50%) rotate(360deg);transform:translate(-50%,-50%) rotate(360deg)}}@keyframes ball-clip-rotate-pulse-rotate{0%{-webkit-transform:translate(-50%,-50%) rotate(0);transform:translate(-50%,-50%) rotate(0)}50%{-webkit-transform:translate(-50%,-50%) rotate(180deg);transform:translate(-50%,-50%) rotate(180deg)}100%{-webkit-transform:translate(-50%,-50%) rotate(360deg);transform:translate(-50%,-50%) rotate(360deg)}}@-webkit-keyframes ball-clip-rotate-pulse-scale{0%,100%{opacity:1;-webkit-transform:translate(-50%,-50%) scale(1);transform:translate(-50%,-50%) scale(1)}30%{opacity:.3;-webkit-transform:translate(-50%,-50%) scale(.15);transform:translate(-50%,-50%) scale(.15)}}@keyframes ball-clip-rotate-pulse-scale{0%,100%{opacity:1;-webkit-transform:translate(-50%,-50%) scale(1);transform:translate(-50%,-50%) scale(1)}30%{opacity:.3;-webkit-transform:translate(-50%,-50%) scale(.15);transform:translate(-50%,-50%) scale(.15)}}.la-ball-clip-rotate[_ngcontent-%COMP%], .la-ball-clip-rotate[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-clip-rotate[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-clip-rotate.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-clip-rotate[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;border:2px solid currentColor;width:32px;height:32px;background:0 0;border-bottom-color:transparent;border-radius:100%;-webkit-animation:.75s linear infinite ball-clip-rotate;animation:.75s linear infinite ball-clip-rotate}.la-ball-clip-rotate.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-clip-rotate.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:16px;height:16px;border-width:1px}.la-ball-clip-rotate.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-ball-clip-rotate.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:64px;height:64px;border-width:4px}.la-ball-clip-rotate.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-ball-clip-rotate.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:96px;height:96px;border-width:6px}@-webkit-keyframes ball-clip-rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes ball-clip-rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.la-ball-elastic-dots[_ngcontent-%COMP%], .la-ball-elastic-dots[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-elastic-dots[_ngcontent-%COMP%]{display:block;color:#fff;width:120px;height:10px;font-size:0;text-align:center}.la-ball-elastic-dots.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-elastic-dots[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{float:none;background-color:currentColor;border:0 solid currentColor;display:inline-block;width:10px;height:10px;white-space:nowrap;border-radius:100%;-webkit-animation:1s infinite ball-elastic-dots-anim;animation:1s infinite ball-elastic-dots-anim}.la-ball-elastic-dots.la-sm[_ngcontent-%COMP%]{width:60px;height:4px}.la-ball-elastic-dots.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px}.la-ball-elastic-dots.la-2x[_ngcontent-%COMP%]{width:240px;height:20px}.la-ball-elastic-dots.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:20px;height:20px}.la-ball-elastic-dots.la-3x[_ngcontent-%COMP%]{width:360px;height:30px}.la-ball-elastic-dots.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:30px;height:30px}@-webkit-keyframes ball-elastic-dots-anim{0%,100%{margin:0;-webkit-transform:scale(1);transform:scale(1)}50%{margin:0 5%;-webkit-transform:scale(.65);transform:scale(.65)}}@keyframes ball-elastic-dots-anim{0%,100%{margin:0;-webkit-transform:scale(1);transform:scale(1)}50%{margin:0 5%;-webkit-transform:scale(.65);transform:scale(.65)}}.la-ball-fall[_ngcontent-%COMP%], .la-ball-fall[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-fall[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:54px;height:18px}.la-ball-fall.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-fall[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;margin:4px;border-radius:100%;opacity:0;-webkit-animation:1s ease-in-out infinite ball-fall;animation:1s ease-in-out infinite ball-fall}.la-ball-fall[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){-webkit-animation-delay:-.2s;animation-delay:-.2s}.la-ball-fall[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){-webkit-animation-delay:-.1s;animation-delay:-.1s}.la-ball-fall[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){-webkit-animation-delay:0s;animation-delay:0s}.la-ball-fall.la-sm[_ngcontent-%COMP%]{width:26px;height:8px}.la-ball-fall.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px;margin:2px}.la-ball-fall.la-2x[_ngcontent-%COMP%]{width:108px;height:36px}.la-ball-fall.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:20px;height:20px;margin:8px}.la-ball-fall.la-3x[_ngcontent-%COMP%]{width:162px;height:54px}.la-ball-fall.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:30px;height:30px;margin:12px}@-webkit-keyframes ball-fall{0%{opacity:0;-webkit-transform:translateY(-145%);transform:translateY(-145%)}10%,90%{opacity:.5}20%,80%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}100%{opacity:0;-webkit-transform:translateY(145%);transform:translateY(145%)}}@keyframes ball-fall{0%{opacity:0;-webkit-transform:translateY(-145%);transform:translateY(-145%)}10%,90%{opacity:.5}20%,80%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}100%{opacity:0;-webkit-transform:translateY(145%);transform:translateY(145%)}}.la-ball-fussion[_ngcontent-%COMP%], .la-ball-fussion[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-fussion[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:8px;height:8px}.la-ball-fussion.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-fussion[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;width:12px;height:12px;border-radius:100%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);-webkit-animation:1s infinite ball-fussion-ball1;animation:1s infinite ball-fussion-ball1}.la-ball-fussion[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){top:0;left:50%;z-index:1}.la-ball-fussion[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){top:50%;left:100%;z-index:2;-webkit-animation-name:ball-fussion-ball2;animation-name:ball-fussion-ball2}.la-ball-fussion[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){top:100%;left:50%;z-index:1;-webkit-animation-name:ball-fussion-ball3;animation-name:ball-fussion-ball3}.la-ball-fussion[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){top:50%;left:0;z-index:2;-webkit-animation-name:ball-fussion-ball4;animation-name:ball-fussion-ball4}.la-ball-fussion.la-sm[_ngcontent-%COMP%]{width:4px;height:4px}.la-ball-fussion.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:6px;height:6px}.la-ball-fussion.la-2x[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-fussion.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%], .la-ball-fussion.la-3x[_ngcontent-%COMP%]{width:24px;height:24px}.la-ball-fussion.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:36px;height:36px}@-webkit-keyframes ball-fussion-ball1{0%{opacity:.35}50%{top:-100%;left:200%;opacity:1}100%{top:50%;left:100%;z-index:2;opacity:.35}}@keyframes ball-fussion-ball1{0%{opacity:.35}50%{top:-100%;left:200%;opacity:1}100%{top:50%;left:100%;z-index:2;opacity:.35}}@-webkit-keyframes ball-fussion-ball2{0%{opacity:.35}50%{top:200%;left:200%;opacity:1}100%{top:100%;left:50%;z-index:1;opacity:.35}}@keyframes ball-fussion-ball2{0%{opacity:.35}50%{top:200%;left:200%;opacity:1}100%{top:100%;left:50%;z-index:1;opacity:.35}}@-webkit-keyframes ball-fussion-ball3{0%{opacity:.35}50%{top:200%;left:-100%;opacity:1}100%{top:50%;left:0;z-index:2;opacity:.35}}@keyframes ball-fussion-ball3{0%{opacity:.35}50%{top:200%;left:-100%;opacity:1}100%{top:50%;left:0;z-index:2;opacity:.35}}@-webkit-keyframes ball-fussion-ball4{0%{opacity:.35}50%{top:-100%;left:-100%;opacity:1}100%{top:0;left:50%;z-index:1;opacity:.35}}@keyframes ball-fussion-ball4{0%{opacity:.35}50%{top:-100%;left:-100%;opacity:1}100%{top:0;left:50%;z-index:1;opacity:.35}}.la-ball-grid-beat[_ngcontent-%COMP%], .la-ball-grid-beat[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-grid-beat[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:36px;height:36px}.la-ball-grid-beat.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-grid-beat[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:8px;height:8px;margin:2px;border-radius:100%;-webkit-animation-name:ball-grid-beat;animation-name:ball-grid-beat;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.la-ball-grid-beat[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){-webkit-animation-duration:.65s;animation-duration:.65s;-webkit-animation-delay:.03s;animation-delay:.03s}.la-ball-grid-beat[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){-webkit-animation-duration:1.02s;animation-duration:1.02s;-webkit-animation-delay:.09s;animation-delay:.09s}.la-ball-grid-beat[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){-webkit-animation-duration:1.06s;animation-duration:1.06s;-webkit-animation-delay:-.69s;animation-delay:-.69s}.la-ball-grid-beat[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){-webkit-animation-duration:1.5s;animation-duration:1.5s;-webkit-animation-delay:-.41s;animation-delay:-.41s}.la-ball-grid-beat[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){-webkit-animation-duration:1.6s;animation-duration:1.6s;-webkit-animation-delay:.04s;animation-delay:.04s}.la-ball-grid-beat[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){-webkit-animation-duration:.84s;animation-duration:.84s;-webkit-animation-delay:.07s;animation-delay:.07s}.la-ball-grid-beat[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(7){-webkit-animation-duration:.68s;animation-duration:.68s;-webkit-animation-delay:-.66s;animation-delay:-.66s}.la-ball-grid-beat[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(8){-webkit-animation-duration:.93s;animation-duration:.93s;-webkit-animation-delay:-.76s;animation-delay:-.76s}.la-ball-grid-beat[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(9){-webkit-animation-duration:1.24s;animation-duration:1.24s;-webkit-animation-delay:-.76s;animation-delay:-.76s}.la-ball-grid-beat.la-sm[_ngcontent-%COMP%]{width:18px;height:18px}.la-ball-grid-beat.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px;margin:1px}.la-ball-grid-beat.la-2x[_ngcontent-%COMP%]{width:72px;height:72px}.la-ball-grid-beat.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:16px;height:16px;margin:4px}.la-ball-grid-beat.la-3x[_ngcontent-%COMP%]{width:108px;height:108px}.la-ball-grid-beat.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:24px;height:24px;margin:6px}@-webkit-keyframes ball-grid-beat{0%,100%{opacity:1}50%{opacity:.35}}@keyframes ball-grid-beat{0%,100%{opacity:1}50%{opacity:.35}}.la-ball-grid-pulse[_ngcontent-%COMP%], .la-ball-grid-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-grid-pulse[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:36px;height:36px}.la-ball-grid-pulse.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-grid-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:8px;height:8px;margin:2px;border-radius:100%;-webkit-animation-name:ball-grid-pulse;animation-name:ball-grid-pulse;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.la-ball-grid-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){-webkit-animation-duration:.65s;animation-duration:.65s;-webkit-animation-delay:.03s;animation-delay:.03s}.la-ball-grid-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){-webkit-animation-duration:1.02s;animation-duration:1.02s;-webkit-animation-delay:.09s;animation-delay:.09s}.la-ball-grid-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){-webkit-animation-duration:1.06s;animation-duration:1.06s;-webkit-animation-delay:-.69s;animation-delay:-.69s}.la-ball-grid-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){-webkit-animation-duration:1.5s;animation-duration:1.5s;-webkit-animation-delay:-.41s;animation-delay:-.41s}.la-ball-grid-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){-webkit-animation-duration:1.6s;animation-duration:1.6s;-webkit-animation-delay:.04s;animation-delay:.04s}.la-ball-grid-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){-webkit-animation-duration:.84s;animation-duration:.84s;-webkit-animation-delay:.07s;animation-delay:.07s}.la-ball-grid-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(7){-webkit-animation-duration:.68s;animation-duration:.68s;-webkit-animation-delay:-.66s;animation-delay:-.66s}.la-ball-grid-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(8){-webkit-animation-duration:.93s;animation-duration:.93s;-webkit-animation-delay:-.76s;animation-delay:-.76s}.la-ball-grid-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(9){-webkit-animation-duration:1.24s;animation-duration:1.24s;-webkit-animation-delay:-.76s;animation-delay:-.76s}.la-ball-grid-pulse.la-sm[_ngcontent-%COMP%]{width:18px;height:18px}.la-ball-grid-pulse.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px;margin:1px}.la-ball-grid-pulse.la-2x[_ngcontent-%COMP%]{width:72px;height:72px}.la-ball-grid-pulse.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:16px;height:16px;margin:4px}.la-ball-grid-pulse.la-3x[_ngcontent-%COMP%]{width:108px;height:108px}.la-ball-grid-pulse.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:24px;height:24px;margin:6px}@-webkit-keyframes ball-grid-pulse{0%,100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}50%{opacity:.35;-webkit-transform:scale(.45);transform:scale(.45)}}@keyframes ball-grid-pulse{0%,100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}50%{opacity:.35;-webkit-transform:scale(.45);transform:scale(.45)}}.la-ball-newton-cradle[_ngcontent-%COMP%], .la-ball-newton-cradle[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-newton-cradle[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:40px;height:10px}.la-ball-newton-cradle.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-newton-cradle[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;border-radius:100%}.la-ball-newton-cradle[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:first-child{-webkit-transform:translateX(0);transform:translateX(0);-webkit-animation:1s ease-out infinite ball-newton-cradle-left;animation:1s ease-out infinite ball-newton-cradle-left}.la-ball-newton-cradle[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:last-child{-webkit-transform:translateX(0);transform:translateX(0);-webkit-animation:1s ease-out infinite ball-newton-cradle-right;animation:1s ease-out infinite ball-newton-cradle-right}.la-ball-newton-cradle.la-sm[_ngcontent-%COMP%]{width:20px;height:4px}.la-ball-newton-cradle.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px}.la-ball-newton-cradle.la-2x[_ngcontent-%COMP%]{width:80px;height:20px}.la-ball-newton-cradle.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:20px;height:20px}.la-ball-newton-cradle.la-3x[_ngcontent-%COMP%]{width:120px;height:30px}.la-ball-newton-cradle.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:30px;height:30px}@-webkit-keyframes ball-newton-cradle-left{25%{-webkit-transform:translateX(-100%);transform:translateX(-100%);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}50%{-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes ball-newton-cradle-left{25%{-webkit-transform:translateX(-100%);transform:translateX(-100%);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}50%{-webkit-transform:translateX(0);transform:translateX(0)}}@-webkit-keyframes ball-newton-cradle-right{100%,50%{-webkit-transform:translateX(0);transform:translateX(0)}75%{-webkit-transform:translateX(100%);transform:translateX(100%);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}}@keyframes ball-newton-cradle-right{100%,50%{-webkit-transform:translateX(0);transform:translateX(0)}75%{-webkit-transform:translateX(100%);transform:translateX(100%);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}}.la-ball-pulse-rise[_ngcontent-%COMP%], .la-ball-pulse-rise[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-pulse-rise[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:70px;height:14px}.la-ball-pulse-rise.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-pulse-rise[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;margin:2px;border-radius:100%;-webkit-animation:1s cubic-bezier(.15,.36,.9,.6) infinite ball-pulse-rise-even;animation:1s cubic-bezier(.15,.36,.9,.6) infinite ball-pulse-rise-even}.la-ball-pulse-rise[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2n-1){-webkit-animation-name:ball-pulse-rise-odd;animation-name:ball-pulse-rise-odd}.la-ball-pulse-rise.la-sm[_ngcontent-%COMP%]{width:34px;height:6px}.la-ball-pulse-rise.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px;margin:1px}.la-ball-pulse-rise.la-2x[_ngcontent-%COMP%]{width:140px;height:28px}.la-ball-pulse-rise.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:20px;height:20px;margin:4px}.la-ball-pulse-rise.la-3x[_ngcontent-%COMP%]{width:210px;height:42px}.la-ball-pulse-rise.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:30px;height:30px;margin:6px}@-webkit-keyframes ball-pulse-rise-even{0%{opacity:1;-webkit-transform:scale(1.1);transform:scale(1.1)}25%{-webkit-transform:translateY(-200%);transform:translateY(-200%)}50%{opacity:.35;-webkit-transform:scale(.3);transform:scale(.3)}75%{-webkit-transform:translateY(200%);transform:translateY(200%)}100%{opacity:1;-webkit-transform:translateY(0);-webkit-transform:scale(1);transform:translateY(0);transform:scale(1)}}@keyframes ball-pulse-rise-even{0%{opacity:1;-webkit-transform:scale(1.1);transform:scale(1.1)}25%{-webkit-transform:translateY(-200%);transform:translateY(-200%)}50%{opacity:.35;-webkit-transform:scale(.3);transform:scale(.3)}75%{-webkit-transform:translateY(200%);transform:translateY(200%)}100%{opacity:1;-webkit-transform:translateY(0);-webkit-transform:scale(1);transform:translateY(0);transform:scale(1)}}@-webkit-keyframes ball-pulse-rise-odd{0%{opacity:.35;-webkit-transform:scale(.4);transform:scale(.4)}25%{-webkit-transform:translateY(200%);transform:translateY(200%)}50%{opacity:1;-webkit-transform:scale(1.1);transform:scale(1.1)}75%{-webkit-transform:translateY(-200%);transform:translateY(-200%)}100%{opacity:.35;-webkit-transform:translateY(0);-webkit-transform:scale(.75);transform:translateY(0);transform:scale(.75)}}@keyframes ball-pulse-rise-odd{0%{opacity:.35;-webkit-transform:scale(.4);transform:scale(.4)}25%{-webkit-transform:translateY(200%);transform:translateY(200%)}50%{opacity:1;-webkit-transform:scale(1.1);transform:scale(1.1)}75%{-webkit-transform:translateY(-200%);transform:translateY(-200%)}100%{opacity:.35;-webkit-transform:translateY(0);-webkit-transform:scale(.75);transform:translateY(0);transform:scale(.75)}}.la-ball-pulse-sync[_ngcontent-%COMP%], .la-ball-pulse-sync[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-pulse-sync[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:54px;height:18px}.la-ball-pulse-sync.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-pulse-sync[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;margin:4px;border-radius:100%;-webkit-animation:.6s ease-in-out infinite ball-pulse-sync;animation:.6s ease-in-out infinite ball-pulse-sync}.la-ball-pulse-sync[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){-webkit-animation-delay:-.14s;animation-delay:-.14s}.la-ball-pulse-sync[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){-webkit-animation-delay:-.07s;animation-delay:-.07s}.la-ball-pulse-sync[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){-webkit-animation-delay:0s;animation-delay:0s}.la-ball-pulse-sync.la-sm[_ngcontent-%COMP%]{width:26px;height:8px}.la-ball-pulse-sync.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px;margin:2px}.la-ball-pulse-sync.la-2x[_ngcontent-%COMP%]{width:108px;height:36px}.la-ball-pulse-sync.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:20px;height:20px;margin:8px}.la-ball-pulse-sync.la-3x[_ngcontent-%COMP%]{width:162px;height:54px}.la-ball-pulse-sync.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:30px;height:30px;margin:12px}@-webkit-keyframes ball-pulse-sync{33%{-webkit-transform:translateY(100%);transform:translateY(100%)}66%{-webkit-transform:translateY(-100%);transform:translateY(-100%)}100%{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes ball-pulse-sync{33%{-webkit-transform:translateY(100%);transform:translateY(100%)}66%{-webkit-transform:translateY(-100%);transform:translateY(-100%)}100%{-webkit-transform:translateY(0);transform:translateY(0)}}.la-ball-pulse[_ngcontent-%COMP%], .la-ball-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-pulse[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:54px;height:18px}.la-ball-pulse.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;margin:4px;border-radius:100%;-webkit-animation:1s infinite ball-pulse;animation:1s infinite ball-pulse}.la-ball-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){-webkit-animation-delay:-.2s;animation-delay:-.2s}.la-ball-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){-webkit-animation-delay:-.1s;animation-delay:-.1s}.la-ball-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){-webkit-animation-delay:0s;animation-delay:0s}.la-ball-pulse.la-sm[_ngcontent-%COMP%]{width:26px;height:8px}.la-ball-pulse.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px;margin:2px}.la-ball-pulse.la-2x[_ngcontent-%COMP%]{width:108px;height:36px}.la-ball-pulse.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:20px;height:20px;margin:8px}.la-ball-pulse.la-3x[_ngcontent-%COMP%]{width:162px;height:54px}.la-ball-pulse.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:30px;height:30px;margin:12px}@-webkit-keyframes ball-pulse{0%,100%,60%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}30%{opacity:.1;-webkit-transform:scale(.01);transform:scale(.01)}}@keyframes ball-pulse{0%,100%,60%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}30%{opacity:.1;-webkit-transform:scale(.01);transform:scale(.01)}}.la-ball-rotate[_ngcontent-%COMP%], .la-ball-rotate[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-rotate[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:10px;height:10px}.la-ball-rotate.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-rotate[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;border-radius:100%;-webkit-animation:1s cubic-bezier(.7,-.13,.22,.86) infinite ball-rotate-animation;animation:1s cubic-bezier(.7,-.13,.22,.86) infinite ball-rotate-animation}.la-ball-rotate[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:after, .la-ball-rotate[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:before{position:absolute;width:inherit;height:inherit;margin:inherit;content:"";background:currentColor;border-radius:inherit;opacity:.8}.la-ball-rotate[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:before{top:0;left:-150%}.la-ball-rotate[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:after{top:0;left:150%}.la-ball-rotate.la-sm[_ngcontent-%COMP%], .la-ball-rotate.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px}.la-ball-rotate.la-2x[_ngcontent-%COMP%], .la-ball-rotate.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:20px;height:20px}.la-ball-rotate.la-3x[_ngcontent-%COMP%], .la-ball-rotate.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:30px;height:30px}@-webkit-keyframes ball-rotate-animation{0%{-webkit-transform:rotate(0);transform:rotate(0)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes ball-rotate-animation{0%{-webkit-transform:rotate(0);transform:rotate(0)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.la-ball-running-dots[_ngcontent-%COMP%], .la-ball-running-dots[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-running-dots[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:10px;height:10px}.la-ball-running-dots.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-running-dots[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;width:10px;height:10px;margin-left:-25px;border-radius:100%;-webkit-animation:2s linear infinite ball-running-dots-animate;animation:2s linear infinite ball-running-dots-animate}.la-ball-running-dots[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){-webkit-animation-delay:0s;animation-delay:0s}.la-ball-running-dots[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){-webkit-animation-delay:-.4s;animation-delay:-.4s}.la-ball-running-dots[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){-webkit-animation-delay:-.8s;animation-delay:-.8s}.la-ball-running-dots[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){-webkit-animation-delay:-1.2s;animation-delay:-1.2s}.la-ball-running-dots[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){-webkit-animation-delay:-1.6s;animation-delay:-1.6s}.la-ball-running-dots[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){-webkit-animation-delay:-2s;animation-delay:-2s}.la-ball-running-dots[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(7){-webkit-animation-delay:-2.4s;animation-delay:-2.4s}.la-ball-running-dots[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(8){-webkit-animation-delay:-2.8s;animation-delay:-2.8s}.la-ball-running-dots[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(9){-webkit-animation-delay:-3.2s;animation-delay:-3.2s}.la-ball-running-dots[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(10){-webkit-animation-delay:-3.6s;animation-delay:-3.6s}.la-ball-running-dots.la-sm[_ngcontent-%COMP%]{width:4px;height:4px}.la-ball-running-dots.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px;margin-left:-12px}.la-ball-running-dots.la-2x[_ngcontent-%COMP%]{width:20px;height:20px}.la-ball-running-dots.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:20px;height:20px;margin-left:-50px}.la-ball-running-dots.la-3x[_ngcontent-%COMP%]{width:30px;height:30px}.la-ball-running-dots.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:30px;height:30px;margin-left:-75px}@-webkit-keyframes ball-running-dots-animate{0%,100%{width:100%;height:100%;-webkit-transform:translateY(0) translateX(500%);transform:translateY(0) translateX(500%)}80%{-webkit-transform:translateY(0) translateX(0);transform:translateY(0) translateX(0)}85%{width:100%;height:100%;-webkit-transform:translateY(-125%) translateX(0);transform:translateY(-125%) translateX(0)}90%{width:200%;height:75%}95%{width:100%;height:100%;-webkit-transform:translateY(-100%) translateX(500%);transform:translateY(-100%) translateX(500%)}}@keyframes ball-running-dots-animate{0%,100%{width:100%;height:100%;-webkit-transform:translateY(0) translateX(500%);transform:translateY(0) translateX(500%)}80%{-webkit-transform:translateY(0) translateX(0);transform:translateY(0) translateX(0)}85%{width:100%;height:100%;-webkit-transform:translateY(-125%) translateX(0);transform:translateY(-125%) translateX(0)}90%{width:200%;height:75%}95%{width:100%;height:100%;-webkit-transform:translateY(-100%) translateX(500%);transform:translateY(-100%) translateX(500%)}}.la-ball-scale-multiple[_ngcontent-%COMP%], .la-ball-scale-multiple[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-scale-multiple[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-scale-multiple.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-scale-multiple[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:0;left:0;width:32px;height:32px;border-radius:100%;opacity:0;-webkit-animation:1s linear infinite ball-scale-multiple;animation:1s linear infinite ball-scale-multiple}.la-ball-scale-multiple[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){-webkit-animation-delay:.2s;animation-delay:.2s}.la-ball-scale-multiple[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){-webkit-animation-delay:.4s;animation-delay:.4s}.la-ball-scale-multiple.la-sm[_ngcontent-%COMP%], .la-ball-scale-multiple.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-scale-multiple.la-2x[_ngcontent-%COMP%], .la-ball-scale-multiple.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:64px;height:64px}.la-ball-scale-multiple.la-3x[_ngcontent-%COMP%], .la-ball-scale-multiple.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:96px;height:96px}@-webkit-keyframes ball-scale-multiple{0%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}5%{opacity:.75}100%{opacity:0;-webkit-transform:scale(1);transform:scale(1)}}@keyframes ball-scale-multiple{0%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}5%{opacity:.75}100%{opacity:0;-webkit-transform:scale(1);transform:scale(1)}}.la-ball-scale-pulse[_ngcontent-%COMP%], .la-ball-scale-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-scale-pulse[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-scale-pulse.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-scale-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:0;left:0;width:32px;height:32px;border-radius:100%;opacity:.5;-webkit-animation:2s ease-in-out infinite ball-scale-pulse;animation:2s ease-in-out infinite ball-scale-pulse}.la-ball-scale-pulse[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:last-child{-webkit-animation-delay:-1s;animation-delay:-1s}.la-ball-scale-pulse.la-sm[_ngcontent-%COMP%], .la-ball-scale-pulse.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-scale-pulse.la-2x[_ngcontent-%COMP%], .la-ball-scale-pulse.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:64px;height:64px}.la-ball-scale-pulse.la-3x[_ngcontent-%COMP%], .la-ball-scale-pulse.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:96px;height:96px}@-webkit-keyframes ball-scale-pulse{0%,100%{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes ball-scale-pulse{0%,100%{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}}.la-ball-scale-ripple-multiple[_ngcontent-%COMP%], .la-ball-scale-ripple-multiple[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-scale-ripple-multiple[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-scale-ripple-multiple.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-scale-ripple-multiple[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;border:2px solid currentColor;position:absolute;top:0;left:0;width:32px;height:32px;background:0 0;border-radius:100%;opacity:0;-webkit-animation:1.25s cubic-bezier(.21,.53,.56,.8) infinite ball-scale-ripple-multiple;animation:1.25s cubic-bezier(.21,.53,.56,.8) infinite ball-scale-ripple-multiple}.la-ball-scale-ripple-multiple[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){-webkit-animation-delay:0s;animation-delay:0s}.la-ball-scale-ripple-multiple[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){-webkit-animation-delay:.25s;animation-delay:.25s}.la-ball-scale-ripple-multiple[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){-webkit-animation-delay:.5s;animation-delay:.5s}.la-ball-scale-ripple-multiple.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-scale-ripple-multiple.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:16px;height:16px;border-width:1px}.la-ball-scale-ripple-multiple.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-ball-scale-ripple-multiple.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:64px;height:64px;border-width:4px}.la-ball-scale-ripple-multiple.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-ball-scale-ripple-multiple.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:96px;height:96px;border-width:6px}@-webkit-keyframes ball-scale-ripple-multiple{0%{opacity:1;-webkit-transform:scale(.1);transform:scale(.1)}70%{opacity:.5;-webkit-transform:scale(1);transform:scale(1)}95%{opacity:0}}@keyframes ball-scale-ripple-multiple{0%{opacity:1;-webkit-transform:scale(.1);transform:scale(.1)}70%{opacity:.5;-webkit-transform:scale(1);transform:scale(1)}95%{opacity:0}}.la-ball-scale-ripple[_ngcontent-%COMP%], .la-ball-scale-ripple[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-scale-ripple[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-scale-ripple.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-scale-ripple[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;border:2px solid currentColor;width:32px;height:32px;background:0 0;border-radius:100%;opacity:0;-webkit-animation:1s cubic-bezier(.21,.53,.56,.8) infinite ball-scale-ripple;animation:1s cubic-bezier(.21,.53,.56,.8) infinite ball-scale-ripple}.la-ball-scale-ripple.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-scale-ripple.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:16px;height:16px;border-width:1px}.la-ball-scale-ripple.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-ball-scale-ripple.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:64px;height:64px;border-width:4px}.la-ball-scale-ripple.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-ball-scale-ripple.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:96px;height:96px;border-width:6px}@-webkit-keyframes ball-scale-ripple{0%{opacity:1;-webkit-transform:scale(.1);transform:scale(.1)}70%{opacity:.65;-webkit-transform:scale(1);transform:scale(1)}100%{opacity:0}}@keyframes ball-scale-ripple{0%{opacity:1;-webkit-transform:scale(.1);transform:scale(.1)}70%{opacity:.65;-webkit-transform:scale(1);transform:scale(1)}100%{opacity:0}}.la-ball-scale[_ngcontent-%COMP%], .la-ball-scale[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-scale[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-scale.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-scale[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:32px;height:32px;border-radius:100%;opacity:0;-webkit-animation:1s ease-in-out infinite ball-scale;animation:1s ease-in-out infinite ball-scale}.la-ball-scale.la-sm[_ngcontent-%COMP%], .la-ball-scale.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-scale.la-2x[_ngcontent-%COMP%], .la-ball-scale.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:64px;height:64px}.la-ball-scale.la-3x[_ngcontent-%COMP%], .la-ball-scale.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:96px;height:96px}@-webkit-keyframes ball-scale{0%{opacity:1;-webkit-transform:scale(0);transform:scale(0)}100%{opacity:0;-webkit-transform:scale(1);transform:scale(1)}}@keyframes ball-scale{0%{opacity:1;-webkit-transform:scale(0);transform:scale(0)}100%{opacity:0;-webkit-transform:scale(1);transform:scale(1)}}.la-ball-spin-clockwise-fade-rotating[_ngcontent-%COMP%], .la-ball-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-spin-clockwise-fade-rotating[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px;-webkit-animation:6s linear infinite ball-spin-clockwise-fade-rotating-rotate;animation:6s linear infinite ball-spin-clockwise-fade-rotating-rotate}.la-ball-spin-clockwise-fade-rotating.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:100%;-webkit-animation:1s linear infinite ball-spin-clockwise-fade-rotating;animation:1s linear infinite ball-spin-clockwise-fade-rotating}.la-ball-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-.875s;animation-delay:-.875s}.la-ball-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-.75s;animation-delay:-.75s}.la-ball-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-.625s;animation-delay:-.625s}.la-ball-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-ball-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-.375s;animation-delay:-.375s}.la-ball-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-ball-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-.125s;animation-delay:-.125s}.la-ball-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:0s;animation-delay:0s}.la-ball-spin-clockwise-fade-rotating.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-spin-clockwise-fade-rotating.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-spin-clockwise-fade-rotating.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-ball-spin-clockwise-fade-rotating.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:16px;height:16px;margin-top:-8px;margin-left:-8px}.la-ball-spin-clockwise-fade-rotating.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-ball-spin-clockwise-fade-rotating.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:24px;height:24px;margin-top:-12px;margin-left:-12px}@-webkit-keyframes ball-spin-clockwise-fade-rotating-rotate{100%{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}@keyframes ball-spin-clockwise-fade-rotating-rotate{100%{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}@-webkit-keyframes ball-spin-clockwise-fade-rotating{50%{opacity:.25;-webkit-transform:scale(.5);transform:scale(.5)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@keyframes ball-spin-clockwise-fade-rotating{50%{opacity:.25;-webkit-transform:scale(.5);transform:scale(.5)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}.la-ball-spin-clockwise-fade[_ngcontent-%COMP%], .la-ball-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-spin-clockwise-fade[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-spin-clockwise-fade.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:100%;-webkit-animation:1s linear infinite ball-spin-clockwise-fade;animation:1s linear infinite ball-spin-clockwise-fade}.la-ball-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-.875s;animation-delay:-.875s}.la-ball-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-.75s;animation-delay:-.75s}.la-ball-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-.625s;animation-delay:-.625s}.la-ball-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-ball-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-.375s;animation-delay:-.375s}.la-ball-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-ball-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-.125s;animation-delay:-.125s}.la-ball-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:0s;animation-delay:0s}.la-ball-spin-clockwise-fade.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-spin-clockwise-fade.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-spin-clockwise-fade.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-ball-spin-clockwise-fade.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:16px;height:16px;margin-top:-8px;margin-left:-8px}.la-ball-spin-clockwise-fade.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-ball-spin-clockwise-fade.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:24px;height:24px;margin-top:-12px;margin-left:-12px}@-webkit-keyframes ball-spin-clockwise-fade{50%{opacity:.25;-webkit-transform:scale(.5);transform:scale(.5)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@keyframes ball-spin-clockwise-fade{50%{opacity:.25;-webkit-transform:scale(.5);transform:scale(.5)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}.la-ball-spin-clockwise[_ngcontent-%COMP%], .la-ball-spin-clockwise[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-spin-clockwise[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-spin-clockwise.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-spin-clockwise[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:100%;-webkit-animation:1s ease-in-out infinite ball-spin-clockwise;animation:1s ease-in-out infinite ball-spin-clockwise}.la-ball-spin-clockwise[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-.875s;animation-delay:-.875s}.la-ball-spin-clockwise[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-.75s;animation-delay:-.75s}.la-ball-spin-clockwise[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-.625s;animation-delay:-.625s}.la-ball-spin-clockwise[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-ball-spin-clockwise[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-.375s;animation-delay:-.375s}.la-ball-spin-clockwise[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-ball-spin-clockwise[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-.125s;animation-delay:-.125s}.la-ball-spin-clockwise[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:0s;animation-delay:0s}.la-ball-spin-clockwise.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-spin-clockwise.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-spin-clockwise.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-ball-spin-clockwise.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:16px;height:16px;margin-top:-8px;margin-left:-8px}.la-ball-spin-clockwise.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-ball-spin-clockwise.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:24px;height:24px;margin-top:-12px;margin-left:-12px}@-webkit-keyframes ball-spin-clockwise{0%,100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}20%{opacity:1}80%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}}@keyframes ball-spin-clockwise{0%,100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}20%{opacity:1}80%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}}.la-ball-spin-fade-rotating[_ngcontent-%COMP%], .la-ball-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-spin-fade-rotating[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px;-webkit-animation:6s linear infinite ball-spin-fade-rotate;animation:6s linear infinite ball-spin-fade-rotate}.la-ball-spin-fade-rotating.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:100%;-webkit-animation:1s linear infinite ball-spin-fade;animation:1s linear infinite ball-spin-fade}.la-ball-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.la-ball-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.la-ball-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.la-ball-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.la-ball-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.la-ball-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.la-ball-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.la-ball-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:-2s;animation-delay:-2s}.la-ball-spin-fade-rotating.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-spin-fade-rotating.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-spin-fade-rotating.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-ball-spin-fade-rotating.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:16px;height:16px;margin-top:-8px;margin-left:-8px}.la-ball-spin-fade-rotating.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-ball-spin-fade-rotating.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:24px;height:24px;margin-top:-12px;margin-left:-12px}@-webkit-keyframes ball-spin-fade-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes ball-spin-fade-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.la-ball-spin-fade[_ngcontent-%COMP%], .la-ball-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-spin-fade[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-spin-fade.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:100%;-webkit-animation:1s linear infinite ball-spin-fade;animation:1s linear infinite ball-spin-fade}.la-ball-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.la-ball-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.la-ball-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.la-ball-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.la-ball-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.la-ball-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.la-ball-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.la-ball-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:-2s;animation-delay:-2s}.la-ball-spin-fade.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-spin-fade.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-spin-fade.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-ball-spin-fade.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:16px;height:16px;margin-top:-8px;margin-left:-8px}.la-ball-spin-fade.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-ball-spin-fade.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:24px;height:24px;margin-top:-12px;margin-left:-12px}@-webkit-keyframes ball-spin-fade{0%,100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}50%{opacity:.25;-webkit-transform:scale(.5);transform:scale(.5)}}@keyframes ball-spin-fade{0%,100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}50%{opacity:.25;-webkit-transform:scale(.5);transform:scale(.5)}}.la-ball-spin-rotate[_ngcontent-%COMP%], .la-ball-spin-rotate[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-spin-rotate[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px;-webkit-animation:2s linear infinite ball-spin-rotate;animation:2s linear infinite ball-spin-rotate}.la-ball-spin-rotate.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-spin-rotate[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:0;width:60%;height:60%;border-radius:100%;-webkit-animation:2s ease-in-out infinite ball-spin-bounce;animation:2s ease-in-out infinite ball-spin-bounce}.la-ball-spin-rotate[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:last-child{top:auto;bottom:0;-webkit-animation-delay:-1s;animation-delay:-1s}.la-ball-spin-rotate.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-spin-rotate.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-ball-spin-rotate.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}@-webkit-keyframes ball-spin-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes ball-spin-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes ball-spin-bounce{0%,100%{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes ball-spin-bounce{0%,100%{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}}.la-ball-spin[_ngcontent-%COMP%], .la-ball-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-spin[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-spin.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:100%;-webkit-animation:1s ease-in-out infinite ball-spin;animation:1s ease-in-out infinite ball-spin}.la-ball-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.la-ball-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.la-ball-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.la-ball-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.la-ball-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.la-ball-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.la-ball-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.la-ball-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:-2s;animation-delay:-2s}.la-ball-spin.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-spin.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-spin.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-ball-spin.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:16px;height:16px;margin-top:-8px;margin-left:-8px}.la-ball-spin.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-ball-spin.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:24px;height:24px;margin-top:-12px;margin-left:-12px}@-webkit-keyframes ball-spin{0%,100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}20%{opacity:1}80%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}}@keyframes ball-spin{0%,100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}20%{opacity:1}80%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}}.la-ball-square-clockwise-spin[_ngcontent-%COMP%], .la-ball-square-clockwise-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-square-clockwise-spin[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:26px;height:26px}.la-ball-square-clockwise-spin.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-square-clockwise-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:12px;height:12px;margin-top:-6px;margin-left:-6px;border-radius:100%;-webkit-animation:1s ease-in-out infinite ball-square-clockwise-spin;animation:1s ease-in-out infinite ball-square-clockwise-spin}.la-ball-square-clockwise-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){top:0;left:0;-webkit-animation-delay:-.875s;animation-delay:-.875s}.la-ball-square-clockwise-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){top:0;left:50%;-webkit-animation-delay:-.75s;animation-delay:-.75s}.la-ball-square-clockwise-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){top:0;left:100%;-webkit-animation-delay:-.625s;animation-delay:-.625s}.la-ball-square-clockwise-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){top:50%;left:100%;-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-ball-square-clockwise-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){top:100%;left:100%;-webkit-animation-delay:-.375s;animation-delay:-.375s}.la-ball-square-clockwise-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){top:100%;left:50%;-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-ball-square-clockwise-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(7){top:100%;left:0;-webkit-animation-delay:-.125s;animation-delay:-.125s}.la-ball-square-clockwise-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(8){top:50%;left:0;-webkit-animation-delay:0s;animation-delay:0s}.la-ball-square-clockwise-spin.la-sm[_ngcontent-%COMP%]{width:12px;height:12px}.la-ball-square-clockwise-spin.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:6px;height:6px;margin-top:-3px;margin-left:-3px}.la-ball-square-clockwise-spin.la-2x[_ngcontent-%COMP%]{width:52px;height:52px}.la-ball-square-clockwise-spin.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:24px;height:24px;margin-top:-12px;margin-left:-12px}.la-ball-square-clockwise-spin.la-3x[_ngcontent-%COMP%]{width:78px;height:78px}.la-ball-square-clockwise-spin.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:36px;height:36px;margin-top:-18px;margin-left:-18px}@-webkit-keyframes ball-square-clockwise-spin{0%,100%,40%{-webkit-transform:scale(.4);transform:scale(.4)}70%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes ball-square-clockwise-spin{0%,100%,40%{-webkit-transform:scale(.4);transform:scale(.4)}70%{-webkit-transform:scale(1);transform:scale(1)}}.la-ball-square-spin[_ngcontent-%COMP%], .la-ball-square-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-square-spin[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:26px;height:26px}.la-ball-square-spin.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-square-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:12px;height:12px;margin-top:-6px;margin-left:-6px;border-radius:100%;-webkit-animation:1s ease-in-out infinite ball-square-spin;animation:1s ease-in-out infinite ball-square-spin}.la-ball-square-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){top:0;left:0;-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.la-ball-square-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){top:0;left:50%;-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.la-ball-square-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){top:0;left:100%;-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.la-ball-square-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){top:50%;left:100%;-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.la-ball-square-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){top:100%;left:100%;-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.la-ball-square-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){top:100%;left:50%;-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.la-ball-square-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(7){top:100%;left:0;-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.la-ball-square-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(8){top:50%;left:0;-webkit-animation-delay:-2s;animation-delay:-2s}.la-ball-square-spin.la-sm[_ngcontent-%COMP%]{width:12px;height:12px}.la-ball-square-spin.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:6px;height:6px;margin-top:-3px;margin-left:-3px}.la-ball-square-spin.la-2x[_ngcontent-%COMP%]{width:52px;height:52px}.la-ball-square-spin.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:24px;height:24px;margin-top:-12px;margin-left:-12px}.la-ball-square-spin.la-3x[_ngcontent-%COMP%]{width:78px;height:78px}.la-ball-square-spin.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:36px;height:36px;margin-top:-18px;margin-left:-18px}@-webkit-keyframes ball-square-spin{0%,100%,40%{-webkit-transform:scale(.4);transform:scale(.4)}70%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes ball-square-spin{0%,100%,40%{-webkit-transform:scale(.4);transform:scale(.4)}70%{-webkit-transform:scale(1);transform:scale(1)}}.la-ball-triangle-path[_ngcontent-%COMP%], .la-ball-triangle-path[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-ball-triangle-path[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-triangle-path.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-triangle-path[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:0;left:0;width:10px;height:10px;border-radius:100%}.la-ball-triangle-path[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){-webkit-animation:2s ease-in-out infinite ball-triangle-path-ball-one;animation:2s ease-in-out infinite ball-triangle-path-ball-one}.la-ball-triangle-path[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){-webkit-animation:2s ease-in-out infinite ball-triangle-path-ball-two;animation:2s ease-in-out infinite ball-triangle-path-ball-two}.la-ball-triangle-path[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){-webkit-animation:2s ease-in-out infinite ball-triangle-path-ball-tree;animation:2s ease-in-out infinite ball-triangle-path-ball-tree}.la-ball-triangle-path.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-triangle-path.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px}.la-ball-triangle-path.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-ball-triangle-path.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:20px;height:20px}.la-ball-triangle-path.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-ball-triangle-path.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:30px;height:30px}@-webkit-keyframes ball-triangle-path-ball-one{0%{-webkit-transform:translate(0,220%);transform:translate(0,220%)}17%,50%,83%{opacity:.25}33%{opacity:1;-webkit-transform:translate(110%,0);transform:translate(110%,0)}66%{opacity:1;-webkit-transform:translate(220%,220%);transform:translate(220%,220%)}100%{opacity:1;-webkit-transform:translate(0,220%);transform:translate(0,220%)}}@keyframes ball-triangle-path-ball-one{0%{-webkit-transform:translate(0,220%);transform:translate(0,220%)}17%,50%,83%{opacity:.25}33%{opacity:1;-webkit-transform:translate(110%,0);transform:translate(110%,0)}66%{opacity:1;-webkit-transform:translate(220%,220%);transform:translate(220%,220%)}100%{opacity:1;-webkit-transform:translate(0,220%);transform:translate(0,220%)}}@-webkit-keyframes ball-triangle-path-ball-two{0%{-webkit-transform:translate(110%,0);transform:translate(110%,0)}17%,50%,83%{opacity:.25}33%{opacity:1;-webkit-transform:translate(220%,220%);transform:translate(220%,220%)}66%{opacity:1;-webkit-transform:translate(0,220%);transform:translate(0,220%)}100%{opacity:1;-webkit-transform:translate(110%,0);transform:translate(110%,0)}}@keyframes ball-triangle-path-ball-two{0%{-webkit-transform:translate(110%,0);transform:translate(110%,0)}17%,50%,83%{opacity:.25}33%{opacity:1;-webkit-transform:translate(220%,220%);transform:translate(220%,220%)}66%{opacity:1;-webkit-transform:translate(0,220%);transform:translate(0,220%)}100%{opacity:1;-webkit-transform:translate(110%,0);transform:translate(110%,0)}}@-webkit-keyframes ball-triangle-path-ball-tree{0%{-webkit-transform:translate(220%,220%);transform:translate(220%,220%)}17%,50%,83%{opacity:.25}33%{opacity:1;-webkit-transform:translate(0,220%);transform:translate(0,220%)}66%{opacity:1;-webkit-transform:translate(110%,0);transform:translate(110%,0)}100%{opacity:1;-webkit-transform:translate(220%,220%);transform:translate(220%,220%)}}@keyframes ball-triangle-path-ball-tree{0%{-webkit-transform:translate(220%,220%);transform:translate(220%,220%)}17%,50%,83%{opacity:.25}33%{opacity:1;-webkit-transform:translate(0,220%);transform:translate(0,220%)}66%{opacity:1;-webkit-transform:translate(110%,0);transform:translate(110%,0)}100%{opacity:1;-webkit-transform:translate(220%,220%);transform:translate(220%,220%)}}.la-ball-zig-zag-deflect[_ngcontent-%COMP%], .la-ball-zig-zag-deflect[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{box-sizing:border-box}.la-ball-zig-zag-deflect[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;position:relative;width:32px;height:32px}.la-ball-zig-zag-deflect.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-zig-zag-deflect[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:10px;height:10px;margin-top:-5px;margin-left:-5px;border-radius:100%}.la-ball-zig-zag-deflect[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:first-child{-webkit-animation:1.5s linear infinite ball-zig-deflect;animation:1.5s linear infinite ball-zig-deflect}.la-ball-zig-zag-deflect[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:last-child{-webkit-animation:1.5s linear infinite ball-zag-deflect;animation:1.5s linear infinite ball-zag-deflect}.la-ball-zig-zag-deflect.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-zig-zag-deflect.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-zig-zag-deflect.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-ball-zig-zag-deflect.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:20px;height:20px;margin-top:-10px;margin-left:-10px}.la-ball-zig-zag-deflect.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-ball-zig-zag-deflect.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:30px;height:30px;margin-top:-15px;margin-left:-15px}@-webkit-keyframes ball-zig-deflect{17%,84%{-webkit-transform:translate(-80%,-160%);transform:translate(-80%,-160%)}34%,67%{-webkit-transform:translate(80%,-160%);transform:translate(80%,-160%)}100%,50%{-webkit-transform:translate(0,0);transform:translate(0,0)}}@keyframes ball-zig-deflect{17%,84%{-webkit-transform:translate(-80%,-160%);transform:translate(-80%,-160%)}34%,67%{-webkit-transform:translate(80%,-160%);transform:translate(80%,-160%)}100%,50%{-webkit-transform:translate(0,0);transform:translate(0,0)}}@-webkit-keyframes ball-zag-deflect{17%,84%{-webkit-transform:translate(80%,160%);transform:translate(80%,160%)}34%,67%{-webkit-transform:translate(-80%,160%);transform:translate(-80%,160%)}100%,50%{-webkit-transform:translate(0,0);transform:translate(0,0)}}@keyframes ball-zag-deflect{17%,84%{-webkit-transform:translate(80%,160%);transform:translate(80%,160%)}34%,67%{-webkit-transform:translate(-80%,160%);transform:translate(-80%,160%)}100%,50%{-webkit-transform:translate(0,0);transform:translate(0,0)}}.la-ball-zig-zag[_ngcontent-%COMP%], .la-ball-zig-zag[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{box-sizing:border-box}.la-ball-zig-zag[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;position:relative;width:32px;height:32px}.la-ball-zig-zag.la-dark[_ngcontent-%COMP%]{color:#333}.la-ball-zig-zag[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:10px;height:10px;margin-top:-5px;margin-left:-5px;border-radius:100%}.la-ball-zig-zag[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:first-child{-webkit-animation:.7s linear infinite ball-zig-effect;animation:.7s linear infinite ball-zig-effect}.la-ball-zig-zag[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:last-child{-webkit-animation:.7s linear infinite ball-zag-effect;animation:.7s linear infinite ball-zag-effect}.la-ball-zig-zag.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-ball-zig-zag.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-zig-zag.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-ball-zig-zag.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:20px;height:20px;margin-top:-10px;margin-left:-10px}.la-ball-zig-zag.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-ball-zig-zag.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:30px;height:30px;margin-top:-15px;margin-left:-15px}@-webkit-keyframes ball-zig-effect{0%,100%{-webkit-transform:translate(0,0);transform:translate(0,0)}33%{-webkit-transform:translate(-75%,-150%);transform:translate(-75%,-150%)}66%{-webkit-transform:translate(75%,-150%);transform:translate(75%,-150%)}}@keyframes ball-zig-effect{0%,100%{-webkit-transform:translate(0,0);transform:translate(0,0)}33%{-webkit-transform:translate(-75%,-150%);transform:translate(-75%,-150%)}66%{-webkit-transform:translate(75%,-150%);transform:translate(75%,-150%)}}@-webkit-keyframes ball-zag-effect{0%,100%{-webkit-transform:translate(0,0);transform:translate(0,0)}33%{-webkit-transform:translate(75%,150%);transform:translate(75%,150%)}66%{-webkit-transform:translate(-75%,150%);transform:translate(-75%,150%)}}@keyframes ball-zag-effect{0%,100%{-webkit-transform:translate(0,0);transform:translate(0,0)}33%{-webkit-transform:translate(75%,150%);transform:translate(75%,150%)}66%{-webkit-transform:translate(-75%,150%);transform:translate(-75%,150%)}}.la-cog[_ngcontent-%COMP%], .la-cog[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-cog[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:31px;height:31px}.la-cog.la-dark[_ngcontent-%COMP%]{color:#333}.la-cog[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;border:2px dashed currentColor;width:100%;height:100%;background-color:transparent;border-radius:100%;-webkit-animation:4s linear infinite cog-rotate;animation:4s linear infinite cog-rotate}.la-cog[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:after{position:absolute;top:0;left:0;width:100%;height:100%;content:"";border:2px solid currentColor;border-radius:100%}.la-cog.la-sm[_ngcontent-%COMP%]{width:15px;height:15px}.la-cog.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%], .la-cog.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:after{border-width:1px}.la-cog.la-2x[_ngcontent-%COMP%]{width:61px;height:61px}.la-cog.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%], .la-cog.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:after{border-width:4px}.la-cog.la-3x[_ngcontent-%COMP%]{width:91px;height:91px}.la-cog.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%], .la-cog.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:after{border-width:6px}@-webkit-keyframes cog-rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes cog-rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.la-cube-transition[_ngcontent-%COMP%], .la-cube-transition[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-cube-transition[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-cube-transition.la-dark[_ngcontent-%COMP%]{color:#333}.la-cube-transition[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:0;left:0;width:14px;height:14px;margin-top:-7px;margin-left:-7px;border-radius:0;-webkit-animation:1.6s ease-in-out infinite cube-transition;animation:1.6s ease-in-out infinite cube-transition}.la-cube-transition[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:last-child{-webkit-animation-delay:-.8s;animation-delay:-.8s}.la-cube-transition.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-cube-transition.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:6px;height:6px;margin-top:-3px;margin-left:-3px}.la-cube-transition.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-cube-transition.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:28px;height:28px;margin-top:-14px;margin-left:-14px}.la-cube-transition.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-cube-transition.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:42px;height:42px;margin-top:-21px;margin-left:-21px}@-webkit-keyframes cube-transition{25%{top:0;left:100%;-webkit-transform:scale(.5) rotate(-90deg);transform:scale(.5) rotate(-90deg)}50%{top:100%;left:100%;-webkit-transform:scale(1) rotate(-180deg);transform:scale(1) rotate(-180deg)}75%{top:100%;left:0;-webkit-transform:scale(.5) rotate(-270deg);transform:scale(.5) rotate(-270deg)}100%{top:0;left:0;-webkit-transform:scale(1) rotate(-360deg);transform:scale(1) rotate(-360deg)}}@keyframes cube-transition{25%{top:0;left:100%;-webkit-transform:scale(.5) rotate(-90deg);transform:scale(.5) rotate(-90deg)}50%{top:100%;left:100%;-webkit-transform:scale(1) rotate(-180deg);transform:scale(1) rotate(-180deg)}75%{top:100%;left:0;-webkit-transform:scale(.5) rotate(-270deg);transform:scale(.5) rotate(-270deg)}100%{top:0;left:0;-webkit-transform:scale(1) rotate(-360deg);transform:scale(1) rotate(-360deg)}}.la-fire[_ngcontent-%COMP%], .la-fire[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-fire[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-fire.la-dark[_ngcontent-%COMP%]{color:#333}.la-fire[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;bottom:0;left:50%;width:12px;height:12px;border-radius:2px;-webkit-transform:translateY(0) translateX(-50%) rotate(45deg) scale(0);transform:translateY(0) translateX(-50%) rotate(45deg) scale(0);-webkit-animation:1.5s linear infinite fire-diamonds;animation:1.5s linear infinite fire-diamonds}.la-fire[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){-webkit-animation-delay:-.85s;animation-delay:-.85s}.la-fire[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){-webkit-animation-delay:-1.85s;animation-delay:-1.85s}.la-fire[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){-webkit-animation-delay:-2.85s;animation-delay:-2.85s}.la-fire.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-fire.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:6px;height:6px}.la-fire.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-fire.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:24px;height:24px}.la-fire.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-fire.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:36px;height:36px}@-webkit-keyframes fire-diamonds{0%{-webkit-transform:translateY(75%) translateX(-50%) rotate(45deg) scale(0);transform:translateY(75%) translateX(-50%) rotate(45deg) scale(0)}50%{-webkit-transform:translateY(-87.5%) translateX(-50%) rotate(45deg) scale(1);transform:translateY(-87.5%) translateX(-50%) rotate(45deg) scale(1)}100%{-webkit-transform:translateY(-212.5%) translateX(-50%) rotate(45deg) scale(0);transform:translateY(-212.5%) translateX(-50%) rotate(45deg) scale(0)}}@keyframes fire-diamonds{0%{-webkit-transform:translateY(75%) translateX(-50%) rotate(45deg) scale(0);transform:translateY(75%) translateX(-50%) rotate(45deg) scale(0)}50%{-webkit-transform:translateY(-87.5%) translateX(-50%) rotate(45deg) scale(1);transform:translateY(-87.5%) translateX(-50%) rotate(45deg) scale(1)}100%{-webkit-transform:translateY(-212.5%) translateX(-50%) rotate(45deg) scale(0);transform:translateY(-212.5%) translateX(-50%) rotate(45deg) scale(0)}}.la-line-scale-party[_ngcontent-%COMP%], .la-line-scale-party[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-line-scale-party[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:40px;height:32px}.la-line-scale-party.la-dark[_ngcontent-%COMP%]{color:#333}.la-line-scale-party[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:4px;height:32px;margin:0 2px;border-radius:0;-webkit-animation-name:line-scale-party;animation-name:line-scale-party;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.la-line-scale-party[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){-webkit-animation-duration:.43s;animation-duration:.43s;-webkit-animation-delay:-.23s;animation-delay:-.23s}.la-line-scale-party[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){-webkit-animation-duration:.62s;animation-duration:.62s;-webkit-animation-delay:-.32s;animation-delay:-.32s}.la-line-scale-party[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){-webkit-animation-duration:.43s;animation-duration:.43s;-webkit-animation-delay:-.44s;animation-delay:-.44s}.la-line-scale-party[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){-webkit-animation-duration:.8s;animation-duration:.8s;-webkit-animation-delay:-.31s;animation-delay:-.31s}.la-line-scale-party[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){-webkit-animation-duration:.74s;animation-duration:.74s;-webkit-animation-delay:-.24s;animation-delay:-.24s}.la-line-scale-party.la-sm[_ngcontent-%COMP%]{width:20px;height:16px}.la-line-scale-party.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:2px;height:16px;margin:0 1px}.la-line-scale-party.la-2x[_ngcontent-%COMP%]{width:80px;height:64px}.la-line-scale-party.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:8px;height:64px;margin:0 4px}.la-line-scale-party.la-3x[_ngcontent-%COMP%]{width:120px;height:96px}.la-line-scale-party.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:12px;height:96px;margin:0 6px}@-webkit-keyframes line-scale-party{0%,100%{-webkit-transform:scaleY(1);transform:scaleY(1)}50%{-webkit-transform:scaleY(.3);transform:scaleY(.3)}}@keyframes line-scale-party{0%,100%{-webkit-transform:scaleY(1);transform:scaleY(1)}50%{-webkit-transform:scaleY(.3);transform:scaleY(.3)}}.la-line-scale-pulse-out-rapid[_ngcontent-%COMP%], .la-line-scale-pulse-out-rapid[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-line-scale-pulse-out-rapid[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:40px;height:32px}.la-line-scale-pulse-out-rapid.la-dark[_ngcontent-%COMP%]{color:#333}.la-line-scale-pulse-out-rapid[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:4px;height:32px;margin:0 2px;border-radius:0;-webkit-animation:.9s cubic-bezier(.11,.49,.38,.78) infinite line-scale-pulse-out-rapid;animation:.9s cubic-bezier(.11,.49,.38,.78) infinite line-scale-pulse-out-rapid}.la-line-scale-pulse-out-rapid[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){-webkit-animation-delay:-.9s;animation-delay:-.9s}.la-line-scale-pulse-out-rapid[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2), .la-line-scale-pulse-out-rapid[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){-webkit-animation-delay:-.65s;animation-delay:-.65s}.la-line-scale-pulse-out-rapid[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1), .la-line-scale-pulse-out-rapid[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){-webkit-animation-delay:-.4s;animation-delay:-.4s}.la-line-scale-pulse-out-rapid.la-sm[_ngcontent-%COMP%]{width:20px;height:16px}.la-line-scale-pulse-out-rapid.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:2px;height:16px;margin:0 1px}.la-line-scale-pulse-out-rapid.la-2x[_ngcontent-%COMP%]{width:80px;height:64px}.la-line-scale-pulse-out-rapid.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:8px;height:64px;margin:0 4px}.la-line-scale-pulse-out-rapid.la-3x[_ngcontent-%COMP%]{width:120px;height:96px}.la-line-scale-pulse-out-rapid.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:12px;height:96px;margin:0 6px}@-webkit-keyframes line-scale-pulse-out-rapid{0%,90%{-webkit-transform:scaley(1);transform:scaley(1)}80%{-webkit-transform:scaley(.3);transform:scaley(.3)}}@keyframes line-scale-pulse-out-rapid{0%,90%{-webkit-transform:scaley(1);transform:scaley(1)}80%{-webkit-transform:scaley(.3);transform:scaley(.3)}}.la-line-scale-pulse-out[_ngcontent-%COMP%], .la-line-scale-pulse-out[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-line-scale-pulse-out[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:40px;height:32px}.la-line-scale-pulse-out.la-dark[_ngcontent-%COMP%]{color:#333}.la-line-scale-pulse-out[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:4px;height:32px;margin:0 2px;border-radius:0;-webkit-animation:.9s cubic-bezier(.85,.25,.37,.85) infinite line-scale-pulse-out;animation:.9s cubic-bezier(.85,.25,.37,.85) infinite line-scale-pulse-out}.la-line-scale-pulse-out[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){-webkit-animation-delay:-.9s;animation-delay:-.9s}.la-line-scale-pulse-out[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2), .la-line-scale-pulse-out[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){-webkit-animation-delay:-.7s;animation-delay:-.7s}.la-line-scale-pulse-out[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1), .la-line-scale-pulse-out[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-line-scale-pulse-out.la-sm[_ngcontent-%COMP%]{width:20px;height:16px}.la-line-scale-pulse-out.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:2px;height:16px;margin:0 1px}.la-line-scale-pulse-out.la-2x[_ngcontent-%COMP%]{width:80px;height:64px}.la-line-scale-pulse-out.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:8px;height:64px;margin:0 4px}.la-line-scale-pulse-out.la-3x[_ngcontent-%COMP%]{width:120px;height:96px}.la-line-scale-pulse-out.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:12px;height:96px;margin:0 6px}@-webkit-keyframes line-scale-pulse-out{0%,100%{-webkit-transform:scaley(1);transform:scaley(1)}50%{-webkit-transform:scaley(.3);transform:scaley(.3)}}@keyframes line-scale-pulse-out{0%,100%{-webkit-transform:scaley(1);transform:scaley(1)}50%{-webkit-transform:scaley(.3);transform:scaley(.3)}}.la-line-scale[_ngcontent-%COMP%], .la-line-scale[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-line-scale[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:40px;height:32px}.la-line-scale.la-dark[_ngcontent-%COMP%]{color:#333}.la-line-scale[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:4px;height:32px;margin:0 2px;border-radius:0;-webkit-animation:1.2s infinite line-scale;animation:1.2s infinite line-scale}.la-line-scale[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){-webkit-animation-delay:-1.2s;animation-delay:-1.2s}.la-line-scale[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.la-line-scale[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){-webkit-animation-delay:-1s;animation-delay:-1s}.la-line-scale[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){-webkit-animation-delay:-.9s;animation-delay:-.9s}.la-line-scale[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){-webkit-animation-delay:-.8s;animation-delay:-.8s}.la-line-scale.la-sm[_ngcontent-%COMP%]{width:20px;height:16px}.la-line-scale.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:2px;height:16px;margin:0 1px}.la-line-scale.la-2x[_ngcontent-%COMP%]{width:80px;height:64px}.la-line-scale.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:8px;height:64px;margin:0 4px}.la-line-scale.la-3x[_ngcontent-%COMP%]{width:120px;height:96px}.la-line-scale.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:12px;height:96px;margin:0 6px}@-webkit-keyframes line-scale{0%,100%,40%{-webkit-transform:scaleY(.4);transform:scaleY(.4)}20%{-webkit-transform:scaleY(1);transform:scaleY(1)}}@keyframes line-scale{0%,100%,40%{-webkit-transform:scaleY(.4);transform:scaleY(.4)}20%{-webkit-transform:scaleY(1);transform:scaleY(1)}}.la-line-spin-clockwise-fade-rotating[_ngcontent-%COMP%], .la-line-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-line-spin-clockwise-fade-rotating[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px;-webkit-animation:6s linear infinite line-spin-clockwise-fade-rotating-rotate;animation:6s linear infinite line-spin-clockwise-fade-rotating-rotate}.la-line-spin-clockwise-fade-rotating.la-dark[_ngcontent-%COMP%]{color:#333}.la-line-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;width:2px;height:10px;margin:-5px 2px 2px -1px;border-radius:0;-webkit-animation:1s ease-in-out infinite line-spin-clockwise-fade-rotating;animation:1s ease-in-out infinite line-spin-clockwise-fade-rotating}.la-line-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){top:15%;left:50%;-webkit-transform:rotate(0);transform:rotate(0);-webkit-animation-delay:-.875s;animation-delay:-.875s}.la-line-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){top:25.2512626585%;left:74.7487373415%;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation-delay:-.75s;animation-delay:-.75s}.la-line-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){top:50%;left:85%;-webkit-transform:rotate(90deg);transform:rotate(90deg);-webkit-animation-delay:-.625s;animation-delay:-.625s}.la-line-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){top:74.7487373415%;left:74.7487373415%;-webkit-transform:rotate(135deg);transform:rotate(135deg);-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-line-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){top:84.9999999974%;left:50.0000000004%;-webkit-transform:rotate(180deg);transform:rotate(180deg);-webkit-animation-delay:-.375s;animation-delay:-.375s}.la-line-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){top:74.7487369862%;left:25.2512627193%;-webkit-transform:rotate(225deg);transform:rotate(225deg);-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-line-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(7){top:49.9999806189%;left:15.0000039834%;-webkit-transform:rotate(270deg);transform:rotate(270deg);-webkit-animation-delay:-.125s;animation-delay:-.125s}.la-line-spin-clockwise-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(8){top:25.2506949798%;left:25.2513989292%;-webkit-transform:rotate(315deg);transform:rotate(315deg);-webkit-animation-delay:0s;animation-delay:0s}.la-line-spin-clockwise-fade-rotating.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-line-spin-clockwise-fade-rotating.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:1px;height:4px;margin-top:-2px;margin-left:0}.la-line-spin-clockwise-fade-rotating.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-line-spin-clockwise-fade-rotating.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:20px;margin-top:-10px;margin-left:-2px}.la-line-spin-clockwise-fade-rotating.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-line-spin-clockwise-fade-rotating.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:6px;height:30px;margin-top:-15px;margin-left:-3px}@-webkit-keyframes line-spin-clockwise-fade-rotating-rotate{100%{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}@keyframes line-spin-clockwise-fade-rotating-rotate{100%{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}@-webkit-keyframes line-spin-clockwise-fade-rotating{50%{opacity:.2}100%{opacity:1}}@keyframes line-spin-clockwise-fade-rotating{50%{opacity:.2}100%{opacity:1}}.la-line-spin-clockwise-fade[_ngcontent-%COMP%], .la-line-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-line-spin-clockwise-fade[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-line-spin-clockwise-fade.la-dark[_ngcontent-%COMP%]{color:#333}.la-line-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;width:2px;height:10px;margin:-5px 2px 2px -1px;border-radius:0;-webkit-animation:1s ease-in-out infinite line-spin-clockwise-fade;animation:1s ease-in-out infinite line-spin-clockwise-fade}.la-line-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){top:15%;left:50%;-webkit-transform:rotate(0);transform:rotate(0);-webkit-animation-delay:-.875s;animation-delay:-.875s}.la-line-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){top:25.2512626585%;left:74.7487373415%;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation-delay:-.75s;animation-delay:-.75s}.la-line-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){top:50%;left:85%;-webkit-transform:rotate(90deg);transform:rotate(90deg);-webkit-animation-delay:-.625s;animation-delay:-.625s}.la-line-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){top:74.7487373415%;left:74.7487373415%;-webkit-transform:rotate(135deg);transform:rotate(135deg);-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-line-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){top:84.9999999974%;left:50.0000000004%;-webkit-transform:rotate(180deg);transform:rotate(180deg);-webkit-animation-delay:-.375s;animation-delay:-.375s}.la-line-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){top:74.7487369862%;left:25.2512627193%;-webkit-transform:rotate(225deg);transform:rotate(225deg);-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-line-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(7){top:49.9999806189%;left:15.0000039834%;-webkit-transform:rotate(270deg);transform:rotate(270deg);-webkit-animation-delay:-.125s;animation-delay:-.125s}.la-line-spin-clockwise-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(8){top:25.2506949798%;left:25.2513989292%;-webkit-transform:rotate(315deg);transform:rotate(315deg);-webkit-animation-delay:0s;animation-delay:0s}.la-line-spin-clockwise-fade.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-line-spin-clockwise-fade.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:1px;height:4px;margin-top:-2px;margin-left:0}.la-line-spin-clockwise-fade.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-line-spin-clockwise-fade.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:20px;margin-top:-10px;margin-left:-2px}.la-line-spin-clockwise-fade.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-line-spin-clockwise-fade.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:6px;height:30px;margin-top:-15px;margin-left:-3px}@-webkit-keyframes line-spin-clockwise-fade{50%{opacity:.2}100%{opacity:1}}@keyframes line-spin-clockwise-fade{50%{opacity:.2}100%{opacity:1}}.la-line-spin-fade-rotating[_ngcontent-%COMP%], .la-line-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-line-spin-fade-rotating[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px;-webkit-animation:6s linear infinite ball-spin-fade-rotating-rotate;animation:6s linear infinite ball-spin-fade-rotating-rotate}.la-line-spin-fade-rotating.la-dark[_ngcontent-%COMP%]{color:#333}.la-line-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;width:2px;height:10px;margin:-5px 2px 2px -1px;border-radius:0;-webkit-animation:1s ease-in-out infinite line-spin-fade-rotating;animation:1s ease-in-out infinite line-spin-fade-rotating}.la-line-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){top:15%;left:50%;-webkit-transform:rotate(0);transform:rotate(0);-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.la-line-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){top:25.2512626585%;left:74.7487373415%;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.la-line-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){top:50%;left:85%;-webkit-transform:rotate(90deg);transform:rotate(90deg);-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.la-line-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){top:74.7487373415%;left:74.7487373415%;-webkit-transform:rotate(135deg);transform:rotate(135deg);-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.la-line-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){top:84.9999999974%;left:50.0000000004%;-webkit-transform:rotate(180deg);transform:rotate(180deg);-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.la-line-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){top:74.7487369862%;left:25.2512627193%;-webkit-transform:rotate(225deg);transform:rotate(225deg);-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.la-line-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(7){top:49.9999806189%;left:15.0000039834%;-webkit-transform:rotate(270deg);transform:rotate(270deg);-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.la-line-spin-fade-rotating[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(8){top:25.2506949798%;left:25.2513989292%;-webkit-transform:rotate(315deg);transform:rotate(315deg);-webkit-animation-delay:-2s;animation-delay:-2s}.la-line-spin-fade-rotating.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-line-spin-fade-rotating.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:1px;height:4px;margin-top:-2px;margin-left:0}.la-line-spin-fade-rotating.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-line-spin-fade-rotating.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:20px;margin-top:-10px;margin-left:-2px}.la-line-spin-fade-rotating.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-line-spin-fade-rotating.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:6px;height:30px;margin-top:-15px;margin-left:-3px}@-webkit-keyframes ball-spin-fade-rotating-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes ball-spin-fade-rotating-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes line-spin-fade-rotating{50%{opacity:.2}100%{opacity:1}}@keyframes line-spin-fade-rotating{50%{opacity:.2}100%{opacity:1}}.la-line-spin-fade[_ngcontent-%COMP%], .la-line-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-line-spin-fade[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-line-spin-fade.la-dark[_ngcontent-%COMP%]{color:#333}.la-line-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;width:2px;height:10px;margin:-5px 2px 2px -1px;border-radius:0;-webkit-animation:1s ease-in-out infinite line-spin-fade;animation:1s ease-in-out infinite line-spin-fade}.la-line-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){top:15%;left:50%;-webkit-transform:rotate(0);transform:rotate(0);-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.la-line-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){top:25.2512626585%;left:74.7487373415%;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.la-line-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){top:50%;left:85%;-webkit-transform:rotate(90deg);transform:rotate(90deg);-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.la-line-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){top:74.7487373415%;left:74.7487373415%;-webkit-transform:rotate(135deg);transform:rotate(135deg);-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.la-line-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){top:84.9999999974%;left:50.0000000004%;-webkit-transform:rotate(180deg);transform:rotate(180deg);-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.la-line-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){top:74.7487369862%;left:25.2512627193%;-webkit-transform:rotate(225deg);transform:rotate(225deg);-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.la-line-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(7){top:49.9999806189%;left:15.0000039834%;-webkit-transform:rotate(270deg);transform:rotate(270deg);-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.la-line-spin-fade[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(8){top:25.2506949798%;left:25.2513989292%;-webkit-transform:rotate(315deg);transform:rotate(315deg);-webkit-animation-delay:-2s;animation-delay:-2s}.la-line-spin-fade.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-line-spin-fade.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:1px;height:4px;margin-top:-2px;margin-left:0}.la-line-spin-fade.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-line-spin-fade.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:4px;height:20px;margin-top:-10px;margin-left:-2px}.la-line-spin-fade.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-line-spin-fade.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:6px;height:30px;margin-top:-15px;margin-left:-3px}@-webkit-keyframes line-spin-fade{50%{opacity:.2}100%{opacity:1}}@keyframes line-spin-fade{50%{opacity:.2}100%{opacity:1}}.la-pacman[_ngcontent-%COMP%], .la-pacman[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-pacman[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-pacman.la-dark[_ngcontent-%COMP%]{color:#333}.la-pacman[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor}.la-pacman[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1), .la-pacman[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){width:0;height:0;background:0 0;border-style:solid;border-width:16px;border-right-color:transparent;border-radius:100%;-webkit-animation:.5s infinite pacman-rotate-half-up;animation:.5s infinite pacman-rotate-half-up}.la-pacman[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){margin-top:-32px;-webkit-animation-name:pacman-rotate-half-down;animation-name:pacman-rotate-half-down}.la-pacman[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3), .la-pacman[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4), .la-pacman[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5), .la-pacman[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){position:absolute;top:50%;left:200%;width:8px;height:8px;border-radius:100%;opacity:0;-webkit-animation:2s linear infinite pacman-balls;animation:2s linear infinite pacman-balls}.la-pacman[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3){-webkit-animation-delay:-1.44s;animation-delay:-1.44s}.la-pacman[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4){-webkit-animation-delay:-1.94s;animation-delay:-1.94s}.la-pacman[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5){-webkit-animation-delay:-2.44s;animation-delay:-2.44s}.la-pacman[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){-webkit-animation-delay:-2.94s;animation-delay:-2.94s}.la-pacman.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-pacman.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1), .la-pacman.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){border-width:8px}.la-pacman.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){margin-top:-16px}.la-pacman.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3), .la-pacman.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4), .la-pacman.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5), .la-pacman.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){width:4px;height:4px}.la-pacman.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-pacman.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1), .la-pacman.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){border-width:32px}.la-pacman.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){margin-top:-64px}.la-pacman.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3), .la-pacman.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4), .la-pacman.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5), .la-pacman.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){width:16px;height:16px}.la-pacman.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-pacman.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1), .la-pacman.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){border-width:48px}.la-pacman.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){margin-top:-96px}.la-pacman.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(3), .la-pacman.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(4), .la-pacman.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(5), .la-pacman.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(6){width:24px;height:24px}@-webkit-keyframes pacman-rotate-half-up{0%,100%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}50%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes pacman-rotate-half-up{0%,100%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}50%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes pacman-rotate-half-down{0%,100%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}50%{-webkit-transform:rotate(0);transform:rotate(0)}}@keyframes pacman-rotate-half-down{0%,100%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}50%{-webkit-transform:rotate(0);transform:rotate(0)}}@-webkit-keyframes pacman-balls{0%{left:200%;opacity:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}5%{opacity:.5}66%{opacity:1}67%{opacity:0}100%{left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}}@keyframes pacman-balls{0%{left:200%;opacity:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}5%{opacity:.5}66%{opacity:1}67%{opacity:0}100%{left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}}.la-square-jelly-box[_ngcontent-%COMP%], .la-square-jelly-box[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-square-jelly-box[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-square-jelly-box.la-dark[_ngcontent-%COMP%]{color:#333}.la-square-jelly-box[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor}.la-square-jelly-box[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1), .la-square-jelly-box[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){position:absolute;left:0;width:100%}.la-square-jelly-box[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(1){top:-25%;z-index:1;height:100%;border-radius:10%;-webkit-animation:.6s linear -.1s infinite square-jelly-box-animate;animation:.6s linear -.1s infinite square-jelly-box-animate}.la-square-jelly-box[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){bottom:-9%;height:10%;background:#000;border-radius:50%;opacity:.2;-webkit-animation:.6s linear -.1s infinite square-jelly-box-shadow;animation:.6s linear -.1s infinite square-jelly-box-shadow}.la-square-jelly-box.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-square-jelly-box.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-square-jelly-box.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}@-webkit-keyframes square-jelly-box-animate{17%{border-bottom-right-radius:10%}25%{-webkit-transform:translateY(25%) rotate(22.5deg);transform:translateY(25%) rotate(22.5deg)}50%{border-bottom-right-radius:100%;-webkit-transform:translateY(50%) scale(1,.9) rotate(45deg);transform:translateY(50%) scale(1,.9) rotate(45deg)}75%{-webkit-transform:translateY(25%) rotate(67.5deg);transform:translateY(25%) rotate(67.5deg)}100%{-webkit-transform:translateY(0) rotate(90deg);transform:translateY(0) rotate(90deg)}}@keyframes square-jelly-box-animate{17%{border-bottom-right-radius:10%}25%{-webkit-transform:translateY(25%) rotate(22.5deg);transform:translateY(25%) rotate(22.5deg)}50%{border-bottom-right-radius:100%;-webkit-transform:translateY(50%) scale(1,.9) rotate(45deg);transform:translateY(50%) scale(1,.9) rotate(45deg)}75%{-webkit-transform:translateY(25%) rotate(67.5deg);transform:translateY(25%) rotate(67.5deg)}100%{-webkit-transform:translateY(0) rotate(90deg);transform:translateY(0) rotate(90deg)}}@-webkit-keyframes square-jelly-box-shadow{50%{-webkit-transform:scale(1.25,1);transform:scale(1.25,1)}}@keyframes square-jelly-box-shadow{50%{-webkit-transform:scale(1.25,1);transform:scale(1.25,1)}}.la-square-loader[_ngcontent-%COMP%], .la-square-loader[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-square-loader[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-square-loader.la-dark[_ngcontent-%COMP%]{color:#333}.la-square-loader[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;border:2px solid currentColor;width:100%;height:100%;background:0 0;border-radius:0;-webkit-animation:2s infinite square-loader;animation:2s infinite square-loader}.la-square-loader[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:after{display:inline-block;width:100%;vertical-align:top;content:"";background-color:currentColor;-webkit-animation:2s ease-in infinite square-loader-inner;animation:2s ease-in infinite square-loader-inner}.la-square-loader.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-square-loader.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{border-width:1px}.la-square-loader.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-square-loader.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{border-width:4px}.la-square-loader.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-square-loader.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{border-width:6px}@-webkit-keyframes square-loader{0%{-webkit-transform:rotate(0);transform:rotate(0)}25%,50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}100%,75%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes square-loader{0%{-webkit-transform:rotate(0);transform:rotate(0)}25%,50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}100%,75%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes square-loader-inner{0%,100%,25%{height:0}50%,75%{height:100%}}@keyframes square-loader-inner{0%,100%,25%{height:0}50%,75%{height:100%}}.la-square-spin[_ngcontent-%COMP%], .la-square-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-square-spin[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-square-spin.la-dark[_ngcontent-%COMP%]{color:#333}.la-square-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:100%;height:100%;border-radius:0;-webkit-animation:3s cubic-bezier(.09,.57,.49,.9) infinite square-spin;animation:3s cubic-bezier(.09,.57,.49,.9) infinite square-spin}.la-square-spin.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-square-spin.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-square-spin.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}@-webkit-keyframes square-spin{0%{-webkit-transform:perspective(100px) rotateX(0) rotateY(0);transform:perspective(100px) rotateX(0) rotateY(0)}25%{-webkit-transform:perspective(100px) rotateX(180deg) rotateY(0);transform:perspective(100px) rotateX(180deg) rotateY(0)}50%{-webkit-transform:perspective(100px) rotateX(180deg) rotateY(180deg);transform:perspective(100px) rotateX(180deg) rotateY(180deg)}75%{-webkit-transform:perspective(100px) rotateX(0) rotateY(180deg);transform:perspective(100px) rotateX(0) rotateY(180deg)}100%{-webkit-transform:perspective(100px) rotateX(0) rotateY(360deg);transform:perspective(100px) rotateX(0) rotateY(360deg)}}@keyframes square-spin{0%{-webkit-transform:perspective(100px) rotateX(0) rotateY(0);transform:perspective(100px) rotateX(0) rotateY(0)}25%{-webkit-transform:perspective(100px) rotateX(180deg) rotateY(0);transform:perspective(100px) rotateX(180deg) rotateY(0)}50%{-webkit-transform:perspective(100px) rotateX(180deg) rotateY(180deg);transform:perspective(100px) rotateX(180deg) rotateY(180deg)}75%{-webkit-transform:perspective(100px) rotateX(0) rotateY(180deg);transform:perspective(100px) rotateX(0) rotateY(180deg)}100%{-webkit-transform:perspective(100px) rotateX(0) rotateY(360deg);transform:perspective(100px) rotateX(0) rotateY(360deg)}}.la-timer[_ngcontent-%COMP%], .la-timer[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-timer[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-timer.la-dark[_ngcontent-%COMP%]{color:#333}.la-timer[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;border:2px solid currentColor;width:32px;height:32px;background:0 0;border-radius:100%}.la-timer[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:after, .la-timer[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:before{position:absolute;top:14px;left:14px;display:block;width:2px;margin-top:-1px;margin-left:-1px;content:"";background:currentColor;border-radius:2px;-webkit-transform-origin:1px 1px 0;transform-origin:1px 1px 0;-webkit-animation:1.25s linear -625ms infinite timer-loader;animation:1.25s linear -625ms infinite timer-loader}.la-timer[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:before{height:12px}.la-timer[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:after{height:8px;-webkit-animation-duration:15s;animation-duration:15s;-webkit-animation-delay:-7.5s;animation-delay:-7.5s}.la-timer.la-sm[_ngcontent-%COMP%]{width:16px;height:16px}.la-timer.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:16px;height:16px;border-width:1px}.la-timer.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:after, .la-timer.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:before{top:7px;left:7px;width:1px;margin-top:-.5px;margin-left:-.5px;border-radius:1px;-webkit-transform-origin:.5px .5px 0;transform-origin:.5px .5px 0}.la-timer.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:before{height:6px}.la-timer.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:after{height:4px}.la-timer.la-2x[_ngcontent-%COMP%]{width:64px;height:64px}.la-timer.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:64px;height:64px;border-width:4px}.la-timer.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:after, .la-timer.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:before{top:28px;left:28px;width:4px;margin-top:-2px;margin-left:-2px;border-radius:4px;-webkit-transform-origin:2px 2px 0;transform-origin:2px 2px 0}.la-timer.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:before{height:24px}.la-timer.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:after{height:16px}.la-timer.la-3x[_ngcontent-%COMP%]{width:96px;height:96px}.la-timer.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:96px;height:96px;border-width:6px}.la-timer.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:after, .la-timer.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:before{top:42px;left:42px;width:6px;margin-top:-3px;margin-left:-3px;border-radius:6px;-webkit-transform-origin:3px 3px 0;transform-origin:3px 3px 0}.la-timer.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:before{height:36px}.la-timer.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:after{height:24px}@-webkit-keyframes timer-loader{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes timer-loader{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.la-triangle-skew-spin[_ngcontent-%COMP%], .la-triangle-skew-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.la-triangle-skew-spin[_ngcontent-%COMP%]{display:block;font-size:0;color:#fff;width:32px;height:16px}.la-triangle-skew-spin.la-dark[_ngcontent-%COMP%]{color:#333}.la-triangle-skew-spin[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:inline-block;float:none;border:0 solid currentColor;width:0;height:0;background:0 0;border:solid;border-width:0 16px 16px;border-right-color:transparent;border-left-color:transparent;-webkit-animation:3s cubic-bezier(.09,.57,.49,.9) infinite triangle-skew-spin;animation:3s cubic-bezier(.09,.57,.49,.9) infinite triangle-skew-spin}.la-triangle-skew-spin.la-sm[_ngcontent-%COMP%]{width:16px;height:8px}.la-triangle-skew-spin.la-sm[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{border-width:0 8px 8px}.la-triangle-skew-spin.la-2x[_ngcontent-%COMP%]{width:64px;height:32px}.la-triangle-skew-spin.la-2x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{border-width:0 32px 32px}.la-triangle-skew-spin.la-3x[_ngcontent-%COMP%]{width:96px;height:48px}.la-triangle-skew-spin.la-3x[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{border-width:0 48px 48px}@-webkit-keyframes triangle-skew-spin{0%{-webkit-transform:perspective(100px) rotateX(0) rotateY(0);transform:perspective(100px) rotateX(0) rotateY(0)}25%{-webkit-transform:perspective(100px) rotateX(180deg) rotateY(0);transform:perspective(100px) rotateX(180deg) rotateY(0)}50%{-webkit-transform:perspective(100px) rotateX(180deg) rotateY(180deg);transform:perspective(100px) rotateX(180deg) rotateY(180deg)}75%{-webkit-transform:perspective(100px) rotateX(0) rotateY(180deg);transform:perspective(100px) rotateX(0) rotateY(180deg)}100%{-webkit-transform:perspective(100px) rotateX(0) rotateY(360deg);transform:perspective(100px) rotateX(0) rotateY(360deg)}}@keyframes triangle-skew-spin{0%{-webkit-transform:perspective(100px) rotateX(0) rotateY(0);transform:perspective(100px) rotateX(0) rotateY(0)}25%{-webkit-transform:perspective(100px) rotateX(180deg) rotateY(0);transform:perspective(100px) rotateX(180deg) rotateY(0)}50%{-webkit-transform:perspective(100px) rotateX(180deg) rotateY(180deg);transform:perspective(100px) rotateX(180deg) rotateY(180deg)}75%{-webkit-transform:perspective(100px) rotateX(0) rotateY(180deg);transform:perspective(100px) rotateX(0) rotateY(180deg)}100%{-webkit-transform:perspective(100px) rotateX(0) rotateY(360deg);transform:perspective(100px) rotateX(0) rotateY(360deg)}}.overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%}.overlay[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(.loading-text){top:50%;left:50%;margin:0;position:absolute;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.loading-text[_ngcontent-%COMP%]{position:absolute;top:60%;left:50%;-webkit-transform:translate(-50%,-60%);transform:translate(-50%,-60%)}',
              ],
              data: {
                animation: [
                  sf("fadeIn", [
                    uf("in", cf({ opacity: 1 })),
                    hf(":enter", [cf({ opacity: 0 }), lf(300)]),
                    hf(":leave", lf(200, cf({ opacity: 0 }))),
                  ]),
                ],
              },
              changeDetection: 0,
            })),
            t
          );
        })(),
        Cf = (() => {
          let t = class {};
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[jc]],
            })),
            t
          );
        })(),
        vf = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["app-header"]],
              decls: 34,
              vars: 0,
              consts: [
                [1, "profile-page", "sidebar-collapse"],
                [
                  "color-on-scroll",
                  "400",
                  1,
                  "navbar",
                  "navbar-expand-lg",
                  "fixed-top",
                  "navbar-transparent",
                  "bg-primary",
                ],
                [1, "container"],
                [1, "navbar-translate"],
                ["href", "#", "rel", "tooltip", 1, "navbar-brand"],
                [
                  "type",
                  "button",
                  "data-toggle",
                  "collapse",
                  "data-target",
                  "#navigation",
                  "aria-controls",
                  "navigation",
                  "aria-expanded",
                  "false",
                  "aria-label",
                  "Toggle navigation",
                  1,
                  "navbar-toggler",
                  "navbar-toggler",
                ],
                [1, "navbar-toggler-bar", "bar1"],
                [1, "navbar-toggler-bar", "bar2"],
                [1, "navbar-toggler-bar", "bar3"],
                [
                  "id",
                  "navigation",
                  1,
                  "collapse",
                  "navbar-collapse",
                  "justify-content-end",
                ],
                [1, "navbar-nav"],
                [1, "nav-item"],
                ["href", "#about", 1, "nav-link", "smooth-scroll"],
                ["href", "#experience", 1, "nav-link", "smooth-scroll"],
                ["href", "#projects", 1, "nav-link", "smooth-scroll"],
                ["href", "#skill", 1, "nav-link", "smooth-scroll"],
                ["href", "#education", 1, "nav-link", "smooth-scroll"],
                ["href", "#reference", 1, "nav-link", "smooth-scroll"],
                ["href", "#contact", 1, "nav-link", "smooth-scroll"],
              ],
              template: function (t, e) {
                1 & t &&
                  (oa(0, "header"),
                  oa(1, "div", 0),
                  oa(2, "nav", 1),
                  oa(3, "div", 2),
                  oa(4, "div", 3),
                  oa(5, "a", 4),
                  Da(6, "Punithraj M N"),
                  aa(),
                  oa(7, "button", 5),
                  sa(8, "span", 6),
                  sa(9, "span", 7),
                  sa(10, "span", 8),
                  aa(),
                  aa(),
                  oa(11, "div", 9),
                  oa(12, "ul", 10),
                  oa(13, "li", 11),
                  oa(14, "a", 12),
                  Da(15, "About"),
                  aa(),
                  aa(),
                  oa(16, "li", 11),
                  oa(17, "a", 13),
                  Da(18, "Experience"),
                  aa(),
                  aa(),
                  oa(19, "li", 11),
                  oa(20, "a", 14),
                  Da(21, "Projects"),
                  aa(),
                  aa(),
                  oa(22, "li", 11),
                  oa(23, "a", 15),
                  Da(24, "Skills"),
                  aa(),
                  aa(),
                  oa(25, "li", 11),
                  oa(26, "a", 16),
                  Da(27, "Education"),
                  aa(),
                  aa(),
                  oa(28, "li", 11),
                  oa(29, "a", 17),
                  Da(30, "Reference"),
                  aa(),
                  aa(),
                  oa(31, "li", 11),
                  oa(32, "a", 18),
                  Da(33, "Contact"),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa());
              },
              styles: [""],
            })),
            t
          );
        })(),
        xf = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["app-intro"]],
              decls: 32,
              vars: 0,
              consts: [
                [1, "profile-page"],
                [1, "wrapper"],
                [
                  "filter-color",
                  "orange",
                  1,
                  "page-header",
                  "page-header-small",
                ],
                [
                  "data-parallax",
                  "true",
                  1,
                  "page-header-image",
                  2,
                  "background-image",
                  "url('assets/images/introduction.jpg')",
                ],
                [1, "container"],
                [1, "content-center"],
                [1, "profile-image"],
                ["href", "#"],
                ["src", "assets/images/profile.JPG", "alt", "Image"],
                [1, "h2", "title"],
                [1, "category", "text-white"],
                [
                  "href",
                  "#contact",
                  "data-aos",
                  "zoom-in",
                  "data-aos-anchor",
                  "data-aos-anchor",
                  1,
                  "btn",
                  "btn-primary",
                  "smooth-scroll",
                  "mr-2",
                ],
                [
                  "href",
                  "https://drive.google.com/file/d/1Bngz7t8l_RAtwVmtHjnPe6CIoFWK9AfY/view?usp=sharing",
                  "target",
                  "_blank",
                  "data-aos",
                  "zoom-in",
                  "data-aos-anchor",
                  "data-aos-anchor",
                  1,
                  "btn",
                  "btn-primary",
                ],
                [1, "section"],
                [1, "button-container"],
                [
                  "href",
                  "https://www.facebook.com/roaring.raaj/",
                  "target",
                  "_blank",
                  "rel",
                  "tooltip",
                  "title",
                  "Follow me on Facebook",
                  1,
                  "btn",
                  "btn-default",
                  "btn-round",
                  "btn-lg",
                  "btn-icon",
                ],
                [1, "fa", "fa-facebook"],
                [
                  "href",
                  "https://www.instagram.com/roaring_raaj/",
                  "target",
                  "_blank",
                  "rel",
                  "tooltip",
                  "title",
                  "Follow me on Instagram",
                  1,
                  "btn",
                  "btn-default",
                  "btn-round",
                  "btn-lg",
                  "btn-icon",
                ],
                [1, "fa", "fa-instagram"],
                [
                  "href",
                  "https://www.linkedin.com/in/roaring-raaj",
                  "target",
                  "_blank",
                  "rel",
                  "tooltip",
                  "title",
                  "Follow me on Linkedin",
                  1,
                  "btn",
                  "btn-default",
                  "btn-round",
                  "btn-lg",
                  "btn-icon",
                ],
                [1, "fa", "fa-linkedin"],
                [
                  "href",
                  "https://github.com/Punithraaj",
                  "target",
                  "_blank",
                  "rel",
                  "tooltip",
                  "title",
                  "Follow me on Github",
                  1,
                  "btn",
                  "btn-default",
                  "btn-round",
                  "btn-lg",
                  "btn-icon",
                ],
                [1, "fa", "fa-github"],
                [
                  "href",
                  "https://twitter.com/roaringraaj",
                  "target",
                  "_blank",
                  "rel",
                  "tooltip",
                  "title",
                  "Follow me on Twitter",
                  1,
                  "btn",
                  "btn-default",
                  "btn-round",
                  "btn-lg",
                  "btn-icon",
                ],
                [1, "fa", "fa-twitter"],
                [
                  "href",
                  "#",
                  "target",
                  "_blank",
                  "rel",
                  "tooltip",
                  "title",
                  "Follow me on Google+",
                  1,
                  "btn",
                  "btn-default",
                  "btn-round",
                  "btn-lg",
                  "btn-icon",
                ],
                [1, "fa", "fa-google-plus"],
              ],
              template: function (t, e) {
                1 & t &&
                  (oa(0, "div", 0),
                  oa(1, "div", 1),
                  oa(2, "div", 2),
                  sa(3, "div", 3),
                  oa(4, "div", 4),
                  oa(5, "div", 5),
                  oa(6, "div", 6),
                  oa(7, "a", 7),
                  sa(8, "img", 8),
                  aa(),
                  aa(),
                  oa(9, "div", 9),
                  Da(10, "Punithraj M N "),
                  aa(),
                  oa(11, "p", 10),
                  Da(12, "Full STack Developer"),
                  aa(),
                  oa(13, "a", 11),
                  Da(14, "Hire Me"),
                  aa(),
                  oa(15, "a", 12),
                  Da(16, "Download CV"),
                  aa(),
                  aa(),
                  aa(),
                  oa(17, "div", 13),
                  oa(18, "div", 4),
                  oa(19, "div", 14),
                  oa(20, "a", 15),
                  sa(21, "i", 16),
                  aa(),
                  oa(22, "a", 17),
                  sa(23, "i", 18),
                  aa(),
                  oa(24, "a", 19),
                  sa(25, "i", 20),
                  aa(),
                  oa(26, "a", 21),
                  sa(27, "i", 22),
                  aa(),
                  oa(28, "a", 23),
                  sa(29, "i", 24),
                  aa(),
                  oa(30, "a", 25),
                  sa(31, "i", 26),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa());
              },
              styles: [""],
            })),
            t
          );
        })(),
        Of = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["app-about"]],
              decls: 48,
              vars: 0,
              consts: [
                ["id", "about", 1, "section"],
                [1, "container"],
                ["data-aos", "fade-up", "data-aos-offset", "10", 1, "card"],
                [1, "row"],
                [1, "col-lg-6", "col-md-12"],
                [1, "card-body"],
                [1, "h4", "mt-0", "title"],
                ["align", "justify"],
                [1, "col-sm-4"],
                [1, "text-uppercase"],
                [1, "col-sm-8"],
                [1, "row", "mt-4"],
              ],
              template: function (t, e) {
                1 & t &&
                  (oa(0, "div", 0),
                  oa(1, "div", 1),
                  oa(2, "div", 2),
                  oa(3, "div", 3),
                  oa(4, "div", 4),
                  oa(5, "div", 5),
                  oa(6, "div", 6),
                  Da(7, "About Me"),
                  aa(),
                  oa(8, "p", 7),
                  Da(
                    9,
                    "From a young age, I\u2019ve always had a sense of motivation and passion driving me forward. Whether it\u2019s exploring unique opportunities, learning additional skills, or meeting new people, I bring these values to every experience throughout my life on a personal and professional level."
                  ),
                  aa(),
                  oa(10, "p", 7),
                  Da(
                    11,
                    "Lover of innovation and everything related to generate new knowledge.Face problems with a smile and solve them as soon as possible. Very calculated about the time I spend and work I do."
                  ),
                  aa(),
                  oa(12, "p", 7),
                  Da(
                    13,
                    "To learn more about me, keep exploring my site or reach out directly."
                  ),
                  aa(),
                  aa(),
                  aa(),
                  oa(14, "div", 4),
                  oa(15, "div", 5),
                  oa(16, "div", 6),
                  Da(17, "Basic Information"),
                  aa(),
                  oa(18, "div", 3),
                  oa(19, "div", 8),
                  oa(20, "strong", 9),
                  Da(21, "Date of Birth:"),
                  aa(),
                  aa(),
                  oa(22, "div", 10),
                  Da(23, "June 14, 1994"),
                  aa(),
                  aa(),
                  oa(24, "div", 11),
                  oa(25, "div", 8),
                  oa(26, "strong", 9),
                  Da(27, "Email:"),
                  aa(),
                  aa(),
                  oa(28, "div", 10),
                  Da(29, "punithraaj14@gmail"),
                  aa(),
                  aa(),
                  oa(30, "div", 11),
                  oa(31, "div", 8),
                  oa(32, "strong", 9),
                  Da(33, "Mobile No:"),
                  aa(),
                  aa(),
                  oa(34, "div", 10),
                  Da(35, "8088041006"),
                  aa(),
                  aa(),
                  oa(36, "div", 11),
                  oa(37, "div", 8),
                  oa(38, "strong", 9),
                  Da(39, "Address:"),
                  aa(),
                  aa(),
                  oa(40, "div", 10),
                  Da(41, "#397 ashoka road vidyanagr Hassan"),
                  aa(),
                  aa(),
                  oa(42, "div", 11),
                  oa(43, "div", 8),
                  oa(44, "strong", 9),
                  Da(45, "Language:"),
                  aa(),
                  aa(),
                  oa(46, "div", 10),
                  Da(47, "Kannada, English, Hindi, Telugu"),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa());
              },
              styles: [""],
            })),
            t
          );
        })(),
        kf = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["app-experience"]],
              decls: 98,
              vars: 0,
              consts: [
                ["id", "experience", 1, "section"],
                [1, "container", "py-2", "cc-experience"],
                [1, "h4", "text-center", "mb-4", "title"],
                [1, "row"],
                [1, "timeline"],
                [1, "timeline-badge", "up", "bg-green"],
                [1, "fa", "fa-thumbs-up"],
                [1, "timeline-panel"],
                [1, "col-lg-6"],
                [1, "h5", "mt-0", "title"],
                [1, "h6", "mt-0", "title"],
                ["align", "justify"],
                [1, "list"],
                [1, "non_list"],
                [1, "col-md-6"],
                [1, "timeline-badge", "down"],
                [1, "fa", "fa-users"],
              ],
              template: function (t, e) {
                1 & t &&
                  (oa(0, "div", 0),
                  oa(1, "div", 1),
                  oa(2, "div", 2),
                  Da(3, "Work Experience"),
                  aa(),
                  oa(4, "div", 3),
                  oa(5, "ul", 4),
                  oa(6, "li"),
                  oa(7, "div", 5),
                  sa(8, "i", 6),
                  aa(),
                  oa(9, "div", 7),
                  oa(10, "div", 3),
                  oa(11, "div", 8),
                  oa(12, "div", 9),
                  Da(13, "Morgan Stanley Payroll on Zen & Art"),
                  aa(),
                  oa(14, "div", 10),
                  Da(15, "Associate Software Engineer (2010-08 - Present)"),
                  aa(),
                  oa(16, "p", 11),
                  Da(
                    17,
                    "Morgan Stanley mobilizes capital to help governments, corporations, institutions and individuals around the world achieve their financial goals."
                  ),
                  aa(),
                  oa(18, "p", 11),
                  Da(19, "Worknig as java developer for Margin team"),
                  aa(),
                  aa(),
                  oa(20, "div", 8),
                  oa(21, "ul"),
                  oa(22, "li", 12),
                  Da(23, "Core Functionality"),
                  aa(),
                  oa(24, "ul"),
                  oa(25, "li", 13),
                  Da(26, "Software Development"),
                  aa(),
                  oa(27, "li", 13),
                  Da(28, "Application Development"),
                  aa(),
                  aa(),
                  oa(29, "li", 12),
                  Da(30, "Technologies and Language"),
                  aa(),
                  oa(31, "ul"),
                  oa(32, "div", 3),
                  oa(33, "div", 14),
                  oa(34, "li", 13),
                  Da(35, "Agile"),
                  aa(),
                  oa(36, "li", 13),
                  Da(37, "Autosys"),
                  aa(),
                  oa(38, "li", 13),
                  Da(39, "jenkins"),
                  aa(),
                  oa(40, "li", 13),
                  Da(41, "Treadmill"),
                  aa(),
                  oa(42, "li", 13),
                  Da(43, "Git"),
                  aa(),
                  aa(),
                  oa(44, "div", 14),
                  oa(45, "li", 13),
                  Da(46, "Spring"),
                  aa(),
                  oa(47, "li", 13),
                  Da(48, "Java"),
                  aa(),
                  oa(49, "li", 13),
                  Da(50, "DB2"),
                  aa(),
                  oa(51, "li", 13),
                  Da(52, "Shel-Script"),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  oa(53, "li"),
                  oa(54, "div", 15),
                  sa(55, "i", 16),
                  aa(),
                  oa(56, "div", 7),
                  oa(57, "div", 3),
                  oa(58, "div", 8),
                  oa(59, "div", 9),
                  Da(60, "Novelsynth Soft Solution Pvt Ltd"),
                  aa(),
                  oa(61, "div", 10),
                  Da(62, "Associate Software Engineer (2018-07 - 2019-08)"),
                  aa(),
                  oa(63, "p", 11),
                  Da(
                    64,
                    "Worked as a Software developer to develop analytical and visualization solution for oil and gas industries."
                  ),
                  aa(),
                  aa(),
                  oa(65, "div", 8),
                  oa(66, "ul"),
                  oa(67, "li", 12),
                  Da(68, "Core Functionality"),
                  aa(),
                  oa(69, "ul"),
                  oa(70, "li", 13),
                  Da(71, "Software Development"),
                  aa(),
                  oa(72, "li", 13),
                  Da(73, "Application Development"),
                  aa(),
                  oa(74, "li", 13),
                  Da(75, "Web Development"),
                  aa(),
                  aa(),
                  oa(76, "li", 12),
                  Da(77, "Technologies and Language"),
                  aa(),
                  oa(78, "ul"),
                  oa(79, "div", 3),
                  oa(80, "div", 14),
                  oa(81, "li", 13),
                  Da(82, "Java"),
                  aa(),
                  oa(83, "li", 13),
                  Da(84, "Hibernate"),
                  aa(),
                  oa(85, "li", 13),
                  Da(86, "Maven"),
                  aa(),
                  oa(87, "li", 13),
                  Da(88, "Mysql"),
                  aa(),
                  aa(),
                  oa(89, "div", 14),
                  oa(90, "li", 13),
                  Da(91, "Python"),
                  aa(),
                  oa(92, "li", 13),
                  Da(93, "Microsoft Azure"),
                  aa(),
                  oa(94, "li", 13),
                  Da(95, "Vaadin Web Framework"),
                  aa(),
                  oa(96, "li", 13),
                  Da(97, "Git"),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa());
              },
              styles: [""],
            })),
            t
          );
        })(),
        Pf = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["app-skills"]],
              decls: 57,
              vars: 0,
              consts: [
                ["id", "skill", 1, "section"],
                [1, "container"],
                [1, "h4", "text-center", "mb-4", "title"],
                [
                  "data-aos",
                  "fade-up",
                  "data-aos-anchor-placement",
                  "top-bottom",
                  1,
                  "card",
                ],
                [1, "card-body"],
                [1, "row"],
                [1, "col-md-6"],
                [1, "progress-container", "progress-primary"],
                [1, "progress-badge"],
                [1, "progress"],
                [
                  "data-aos",
                  "progress-full",
                  "data-aos-offset",
                  "10",
                  "data-aos-duration",
                  "2000",
                  "role",
                  "progressbar",
                  "aria-valuenow",
                  "60",
                  "aria-valuemin",
                  "0",
                  "aria-valuemax",
                  "100",
                  1,
                  "progress-bar",
                  "progress-bar-primary",
                  2,
                  "width",
                  "85%",
                ],
                [1, "progress-value"],
                [
                  "data-aos",
                  "progress-full",
                  "data-aos-offset",
                  "10",
                  "data-aos-duration",
                  "2000",
                  "role",
                  "progressbar",
                  "aria-valuenow",
                  "60",
                  "aria-valuemin",
                  "0",
                  "aria-valuemax",
                  "100",
                  1,
                  "progress-bar",
                  "progress-bar-primary",
                  2,
                  "width",
                  "60%",
                ],
                [
                  "data-aos",
                  "progress-full",
                  "data-aos-offset",
                  "10",
                  "data-aos-duration",
                  "2000",
                  "role",
                  "progressbar",
                  "aria-valuenow",
                  "60",
                  "aria-valuemin",
                  "0",
                  "aria-valuemax",
                  "100",
                  1,
                  "progress-bar",
                  "progress-bar-primary",
                  2,
                  "width",
                  "70%",
                ],
                [
                  "data-aos",
                  "progress-full",
                  "data-aos-offset",
                  "10",
                  "data-aos-duration",
                  "2000",
                  "role",
                  "progressbar",
                  "aria-valuenow",
                  "60",
                  "aria-valuemin",
                  "0",
                  "aria-valuemax",
                  "100",
                  1,
                  "progress-bar",
                  "progress-bar-striped",
                  "progress-bar-animated",
                  2,
                  "width",
                  "60%",
                ],
                [
                  "data-aos",
                  "progress-full",
                  "data-aos-offset",
                  "10",
                  "data-aos-duration",
                  "2000",
                  "role",
                  "progressbar",
                  "aria-valuenow",
                  "60",
                  "aria-valuemin",
                  "0",
                  "aria-valuemax",
                  "100",
                  1,
                  "progress-bar",
                  "progress-bar-primary",
                  2,
                  "width",
                  "75%",
                ],
              ],
              template: function (t, e) {
                1 & t &&
                  (oa(0, "div", 0),
                  oa(1, "div", 1),
                  oa(2, "div", 2),
                  Da(3, "Skills"),
                  aa(),
                  oa(4, "div", 3),
                  oa(5, "div", 4),
                  oa(6, "div", 5),
                  oa(7, "div", 6),
                  oa(8, "div", 7),
                  oa(9, "span", 8),
                  Da(10, "Java"),
                  aa(),
                  oa(11, "div", 9),
                  sa(12, "div", 10),
                  oa(13, "span", 11),
                  Da(14, "85%"),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  oa(15, "div", 6),
                  oa(16, "div", 7),
                  oa(17, "span", 8),
                  Da(18, "Python"),
                  aa(),
                  oa(19, "div", 9),
                  sa(20, "div", 12),
                  oa(21, "span", 11),
                  Da(22, "60%"),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  oa(23, "div", 5),
                  oa(24, "div", 6),
                  oa(25, "div", 7),
                  oa(26, "span", 8),
                  Da(27, "Vaadin Framework"),
                  aa(),
                  oa(28, "div", 9),
                  sa(29, "div", 13),
                  oa(30, "span", 11),
                  Da(31, "70%"),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  oa(32, "div", 6),
                  oa(33, "div", 7),
                  oa(34, "span", 8),
                  Da(35, "Angular8"),
                  aa(),
                  oa(36, "div", 9),
                  sa(37, "div", 14),
                  oa(38, "span", 11),
                  Da(39, "60%"),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  oa(40, "div", 5),
                  oa(41, "div", 6),
                  oa(42, "div", 7),
                  oa(43, "span", 8),
                  Da(44, "SQL, MYSQL AND DB2"),
                  aa(),
                  oa(45, "div", 9),
                  sa(46, "div", 15),
                  oa(47, "span", 11),
                  Da(48, "75%"),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  oa(49, "div", 6),
                  oa(50, "div", 7),
                  oa(51, "span", 8),
                  Da(52, "HTML,CSS,JS"),
                  aa(),
                  oa(53, "div", 9),
                  sa(54, "div", 13),
                  oa(55, "span", 11),
                  Da(56, "70%"),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa());
              },
              styles: [""],
            })),
            t
          );
        })(),
        Mf = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["app-education"]],
              decls: 101,
              vars: 0,
              consts: [
                ["id", "education", 1, "section"],
                [1, "container", "cc-education"],
                [1, "h4", "text-center", "mb-4", "title"],
                [1, "card"],
                [1, "row"],
                [
                  "data-aos",
                  "fade-right",
                  "data-aos-offset",
                  "50",
                  "data-aos-duration",
                  "500",
                  1,
                  "col-md-3",
                  "bg-primary",
                ],
                [1, "card-body", "cc-education-header"],
                [1, "h5"],
                [
                  "data-aos",
                  "fade-left",
                  "data-aos-offset",
                  "50",
                  "data-aos-duration",
                  "500",
                  1,
                  "col-md-9",
                ],
                [1, "card-body"],
                [1, "h4"],
                [1, "category"],
              ],
              template: function (t, e) {
                1 & t &&
                  (oa(0, "div", 0),
                  oa(1, "div", 1),
                  oa(2, "div", 2),
                  Da(3, "Education"),
                  aa(),
                  oa(4, "div", 3),
                  oa(5, "div", 4),
                  oa(6, "div", 5),
                  oa(7, "div", 6),
                  oa(8, "p"),
                  Da(9, "2015-2018"),
                  aa(),
                  oa(10, "div", 7),
                  Da(11, "Bachelor Degree"),
                  aa(),
                  aa(),
                  aa(),
                  oa(12, "div", 8),
                  oa(13, "div", 9),
                  oa(14, "div", 10),
                  Da(15, "Bachelor of Engineering"),
                  aa(),
                  oa(16, "h4", 11),
                  Da(17, "R.V College Of Engineering"),
                  aa(),
                  oa(18, "ul"),
                  oa(19, "li"),
                  Da(20, " R.V College Of Engineering(Affilated to VTU) "),
                  oa(21, "b"),
                  Da(22, "ranks 1st"),
                  aa(),
                  Da(23, " in Karnataka "),
                  aa(),
                  oa(24, "li"),
                  Da(25, "Completed B.E in Computer Engineering with "),
                  oa(26, "b"),
                  Da(27, "8.1 CGPA"),
                  aa(),
                  Da(28, "."),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  oa(29, "div", 3),
                  oa(30, "div", 4),
                  oa(31, "div", 5),
                  oa(32, "div", 6),
                  oa(33, "p"),
                  Da(34, "2012-2015"),
                  aa(),
                  oa(35, "div", 7),
                  Da(36, "DIPLOMA"),
                  aa(),
                  aa(),
                  aa(),
                  oa(37, "div", 8),
                  oa(38, "div", 9),
                  oa(39, "div", 10),
                  Da(40, "Diploma (Department Of Technical Education)"),
                  aa(),
                  oa(41, "h4", 11),
                  Da(42, "Smt L.V Polytechnic Hassan"),
                  aa(),
                  oa(43, "ul"),
                  oa(44, "li"),
                  Da(45, "Completed "),
                  oa(46, "b"),
                  Da(47, "Diploma"),
                  aa(),
                  Da(48, " in "),
                  oa(49, "b"),
                  Da(50, "Computer Science"),
                  aa(),
                  Da(51, " with "),
                  oa(52, "b"),
                  Da(53, "90%"),
                  aa(),
                  Da(54, " aggregate."),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  oa(55, "div", 3),
                  oa(56, "div", 4),
                  oa(57, "div", 5),
                  oa(58, "div", 6),
                  oa(59, "p"),
                  Da(60, "2009-2011"),
                  aa(),
                  oa(61, "div", 7),
                  Da(62, "Industrial Training Institute"),
                  aa(),
                  aa(),
                  aa(),
                  oa(63, "div", 8),
                  oa(64, "div", 9),
                  oa(65, "div", 7),
                  Da(66, "ITI(NCVT)"),
                  aa(),
                  oa(67, "h4", 11),
                  Da(68, "GOVT ITI HASSAN"),
                  aa(),
                  oa(69, "ul"),
                  oa(70, "li"),
                  Da(71, "Completed "),
                  oa(72, "b"),
                  Da(73, "ITI"),
                  aa(),
                  Da(74, " in "),
                  oa(75, "b"),
                  Da(76, "Center of Excellence(COE)"),
                  aa(),
                  Da(77, " with "),
                  oa(78, "b"),
                  Da(79, "80% "),
                  aa(),
                  Da(80, "aggregate."),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  oa(81, "div", 3),
                  oa(82, "div", 4),
                  oa(83, "div", 5),
                  oa(84, "div", 6),
                  oa(85, "p"),
                  Da(86, "2008-2009"),
                  aa(),
                  oa(87, "div", 7),
                  Da(88, "Sedcondary School"),
                  aa(),
                  aa(),
                  aa(),
                  oa(89, "div", 8),
                  oa(90, "div", 9),
                  oa(91, "div", 10),
                  Da(92, "Sedcondary School(KSEEB)"),
                  aa(),
                  oa(93, "h4", 11),
                  Da(94, "Sri Adhichunchanagiri English School Hassan"),
                  aa(),
                  oa(95, "ul"),
                  oa(96, "li"),
                  Da(97, "Completed SSLC with "),
                  oa(98, "b"),
                  Da(99, "65.6%"),
                  aa(),
                  Da(100, "."),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa(),
                  aa());
              },
              styles: [""],
            })),
            t
          );
        })();
      class Sf {}
      class Ef {}
      class Tf {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach((t) => {
                            const e = t.indexOf(":");
                            if (e > 0) {
                              const n = t.slice(0, e),
                                i = n.toLowerCase(),
                                r = t.slice(e + 1).trim();
                              this.maybeSetNormalizedName(n, i),
                                this.headers.has(i)
                                  ? this.headers.get(i).push(r)
                                  : this.headers.set(i, [r]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((e) => {
                            let n = t[e];
                            const i = e.toLowerCase();
                            "string" == typeof n && (n = [n]),
                              n.length > 0 &&
                                (this.headers.set(i, n),
                                this.maybeSetNormalizedName(e, i));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const e = this.headers.get(t.toLowerCase());
          return e && e.length > 0 ? e[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, e) {
          return this.clone({ name: t, value: e, op: "a" });
        }
        set(t, e) {
          return this.clone({ name: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ name: t, value: e, op: "d" });
        }
        maybeSetNormalizedName(t, e) {
          this.normalizedNames.has(e) || this.normalizedNames.set(e, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Tf
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((e) => {
              this.headers.set(e, t.headers.get(e)),
                this.normalizedNames.set(e, t.normalizedNames.get(e));
            });
        }
        clone(t) {
          const e = new Tf();
          return (
            (e.lazyInit =
              this.lazyInit && this.lazyInit instanceof Tf
                ? this.lazyInit
                : this),
            (e.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            e
          );
        }
        applyUpdate(t) {
          const e = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let n = t.value;
              if (("string" == typeof n && (n = [n]), 0 === n.length)) return;
              this.maybeSetNormalizedName(t.name, e);
              const i = ("a" === t.op ? this.headers.get(e) : void 0) || [];
              i.push(...n), this.headers.set(e, i);
              break;
            case "d":
              const r = t.value;
              if (r) {
                let t = this.headers.get(e);
                if (!t) return;
                (t = t.filter((t) => -1 === r.indexOf(t))),
                  0 === t.length
                    ? (this.headers.delete(e), this.normalizedNames.delete(e))
                    : this.headers.set(e, t);
              } else this.headers.delete(e), this.normalizedNames.delete(e);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((e) =>
              t(this.normalizedNames.get(e), this.headers.get(e))
            );
        }
      }
      class Af {
        encodeKey(t) {
          return If(t);
        }
        encodeValue(t) {
          return If(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      function If(t) {
        return encodeURIComponent(t)
          .replace(/%40/gi, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/gi, "$")
          .replace(/%2C/gi, ",")
          .replace(/%3B/gi, ";")
          .replace(/%2B/gi, "+")
          .replace(/%3D/gi, "=")
          .replace(/%3F/gi, "?")
          .replace(/%2F/gi, "/");
      }
      class Rf {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new Af()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function (t, e) {
              const n = new Map();
              return (
                t.length > 0 &&
                  t.split("&").forEach((t) => {
                    const i = t.indexOf("="),
                      [r, o] =
                        -1 == i
                          ? [e.decodeKey(t), ""]
                          : [
                              e.decodeKey(t.slice(0, i)),
                              e.decodeValue(t.slice(i + 1)),
                            ],
                      a = n.get(r) || [];
                    a.push(o), n.set(r, a);
                  }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((e) => {
                  const n = t.fromObject[e];
                  this.map.set(e, Array.isArray(n) ? n : [n]);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const e = this.map.get(t);
          return e ? e[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, e) {
          return this.clone({ param: t, value: e, op: "a" });
        }
        set(t, e) {
          return this.clone({ param: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ param: t, value: e, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const e = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((t) => e + "=" + this.encoder.encodeValue(t))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const e = new Rf({ encoder: this.encoder });
          return (
            (e.cloneFrom = this.cloneFrom || this),
            (e.updates = (this.updates || []).concat([t])),
            e
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const e =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    e.push(t.value), this.map.set(t.param, e);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let e = this.map.get(t.param) || [];
                      const n = e.indexOf(t.value);
                      -1 !== n && e.splice(n, 1),
                        e.length > 0
                          ? this.map.set(t.param, e)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      function Nf(t) {
        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer;
      }
      function Df(t) {
        return "undefined" != typeof Blob && t instanceof Blob;
      }
      function Vf(t) {
        return "undefined" != typeof FormData && t instanceof FormData;
      }
      class jf {
        constructor(t, e, n, i) {
          let r;
          if (
            ((this.url = e),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function (t) {
              switch (t) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || i
              ? ((this.body = void 0 !== n ? n : null), (r = i))
              : (r = n),
            r &&
              ((this.reportProgress = !!r.reportProgress),
              (this.withCredentials = !!r.withCredentials),
              r.responseType && (this.responseType = r.responseType),
              r.headers && (this.headers = r.headers),
              r.params && (this.params = r.params)),
            this.headers || (this.headers = new Tf()),
            this.params)
          ) {
            const t = this.params.toString();
            if (0 === t.length) this.urlWithParams = e;
            else {
              const n = e.indexOf("?");
              this.urlWithParams =
                e + (-1 === n ? "?" : n < e.length - 1 ? "&" : "") + t;
            }
          } else (this.params = new Rf()), (this.urlWithParams = e);
        }
        serializeBody() {
          return null === this.body
            ? null
            : Nf(this.body) ||
              Df(this.body) ||
              Vf(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Rf
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Vf(this.body)
            ? null
            : Df(this.body)
            ? this.body.type || null
            : Nf(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Rf
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              Array.isArray(this.body)
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const e = t.method || this.method,
            n = t.url || this.url,
            i = t.responseType || this.responseType,
            r = void 0 !== t.body ? t.body : this.body,
            o =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            a =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let s = t.headers || this.headers,
            l = t.params || this.params;
          return (
            void 0 !== t.setHeaders &&
              (s = Object.keys(t.setHeaders).reduce(
                (e, n) => e.set(n, t.setHeaders[n]),
                s
              )),
            t.setParams &&
              (l = Object.keys(t.setParams).reduce(
                (e, n) => e.set(n, t.setParams[n]),
                l
              )),
            new jf(e, n, r, {
              params: l,
              headers: s,
              reportProgress: a,
              responseType: i,
              withCredentials: o,
            })
          );
        }
      }
      const zf = (function () {
        var t = {
          Sent: 0,
          UploadProgress: 1,
          ResponseHeader: 2,
          DownloadProgress: 3,
          Response: 4,
          User: 5,
        };
        return (
          (t[t.Sent] = "Sent"),
          (t[t.UploadProgress] = "UploadProgress"),
          (t[t.ResponseHeader] = "ResponseHeader"),
          (t[t.DownloadProgress] = "DownloadProgress"),
          (t[t.Response] = "Response"),
          (t[t.User] = "User"),
          t
        );
      })();
      class Uf {
        constructor(t, e = 200, n = "OK") {
          (this.headers = t.headers || new Tf()),
            (this.status = void 0 !== t.status ? t.status : e),
            (this.statusText = t.statusText || n),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Ff extends Uf {
        constructor(t = {}) {
          super(t), (this.type = zf.ResponseHeader);
        }
        clone(t = {}) {
          return new Ff({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Lf extends Uf {
        constructor(t = {}) {
          super(t),
            (this.type = zf.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new Lf({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Hf extends Uf {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function qf(t, e) {
        return {
          body: e,
          headers: t.headers,
          observe: t.observe,
          params: t.params,
          reportProgress: t.reportProgress,
          responseType: t.responseType,
          withCredentials: t.withCredentials,
        };
      }
      let $f = (() => {
        class t {
          constructor(t) {
            this.handler = t;
          }
          request(t, e, n = {}) {
            let i;
            if (t instanceof jf) i = t;
            else {
              let r = void 0;
              r = n.headers instanceof Tf ? n.headers : new Tf(n.headers);
              let o = void 0;
              n.params &&
                (o =
                  n.params instanceof Rf
                    ? n.params
                    : new Rf({ fromObject: n.params })),
                (i = new jf(t, e, void 0 !== n.body ? n.body : null, {
                  headers: r,
                  params: o,
                  reportProgress: n.reportProgress,
                  responseType: n.responseType || "json",
                  withCredentials: n.withCredentials,
                }));
            }
            const r = fu(i).pipe(eh((t) => this.handler.handle(t)));
            if (t instanceof jf || "events" === n.observe) return r;
            const o = r.pipe(Ou((t) => t instanceof Lf));
            switch (n.observe || "body") {
              case "body":
                switch (i.responseType) {
                  case "arraybuffer":
                    return o.pipe(
                      j((t) => {
                        if (null !== t.body && !(t.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return t.body;
                      })
                    );
                  case "blob":
                    return o.pipe(
                      j((t) => {
                        if (null !== t.body && !(t.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return t.body;
                      })
                    );
                  case "text":
                    return o.pipe(
                      j((t) => {
                        if (null !== t.body && "string" != typeof t.body)
                          throw new Error("Response is not a string.");
                        return t.body;
                      })
                    );
                  case "json":
                  default:
                    return o.pipe(j((t) => t.body));
                }
              case "response":
                return o;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${n.observe}}`
                );
            }
          }
          delete(t, e = {}) {
            return this.request("DELETE", t, e);
          }
          get(t, e = {}) {
            return this.request("GET", t, e);
          }
          head(t, e = {}) {
            return this.request("HEAD", t, e);
          }
          jsonp(t, e) {
            return this.request("JSONP", t, {
              params: new Rf().append(e, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(t, e = {}) {
            return this.request("OPTIONS", t, e);
          }
          patch(t, e, n = {}) {
            return this.request("PATCH", t, qf(n, e));
          }
          post(t, e, n = {}) {
            return this.request("POST", t, qf(n, e));
          }
          put(t, e, n = {}) {
            return this.request("PUT", t, qf(n, e));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(Sf));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Yf {
        constructor(t, e) {
          (this.next = t), (this.interceptor = e);
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next);
        }
      }
      const Bf = new jt("HTTP_INTERCEPTORS");
      let Gf = (() => {
        class t {
          intercept(t, e) {
            return e.handle(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Xf = /^\)\]\}',?\n/;
      class Wf {}
      let Zf = (() => {
          class t {
            constructor() {}
            build() {
              return new XMLHttpRequest();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Qf = (() => {
          class t {
            constructor(t) {
              this.xhrFactory = t;
            }
            handle(t) {
              if ("JSONP" === t.method)
                throw new Error(
                  "Attempted to construct Jsonp request without JsonpClientModule installed."
                );
              return new w((e) => {
                const n = this.xhrFactory.build();
                if (
                  (n.open(t.method, t.urlWithParams),
                  t.withCredentials && (n.withCredentials = !0),
                  t.headers.forEach((t, e) =>
                    n.setRequestHeader(t, e.join(","))
                  ),
                  t.headers.has("Accept") ||
                    n.setRequestHeader(
                      "Accept",
                      "application/json, text/plain, */*"
                    ),
                  !t.headers.has("Content-Type"))
                ) {
                  const e = t.detectContentTypeHeader();
                  null !== e && n.setRequestHeader("Content-Type", e);
                }
                if (t.responseType) {
                  const e = t.responseType.toLowerCase();
                  n.responseType = "json" !== e ? e : "text";
                }
                const i = t.serializeBody();
                let r = null;
                const o = () => {
                    if (null !== r) return r;
                    const e = 1223 === n.status ? 204 : n.status,
                      i = n.statusText || "OK",
                      o = new Tf(n.getAllResponseHeaders()),
                      a =
                        (function (t) {
                          return "responseURL" in t && t.responseURL
                            ? t.responseURL
                            : /^X-Request-URL:/m.test(t.getAllResponseHeaders())
                            ? t.getResponseHeader("X-Request-URL")
                            : null;
                        })(n) || t.url;
                    return (
                      (r = new Ff({
                        headers: o,
                        status: e,
                        statusText: i,
                        url: a,
                      })),
                      r
                    );
                  },
                  a = () => {
                    let { headers: i, status: r, statusText: a, url: s } = o(),
                      l = null;
                    204 !== r &&
                      (l = void 0 === n.response ? n.responseText : n.response),
                      0 === r && (r = l ? 200 : 0);
                    let c = r >= 200 && r < 300;
                    if ("json" === t.responseType && "string" == typeof l) {
                      const t = l;
                      l = l.replace(Xf, "");
                      try {
                        l = "" !== l ? JSON.parse(l) : null;
                      } catch (u) {
                        (l = t), c && ((c = !1), (l = { error: u, text: l }));
                      }
                    }
                    c
                      ? (e.next(
                          new Lf({
                            body: l,
                            headers: i,
                            status: r,
                            statusText: a,
                            url: s || void 0,
                          })
                        ),
                        e.complete())
                      : e.error(
                          new Hf({
                            error: l,
                            headers: i,
                            status: r,
                            statusText: a,
                            url: s || void 0,
                          })
                        );
                  },
                  s = (t) => {
                    const { url: i } = o(),
                      r = new Hf({
                        error: t,
                        status: n.status || 0,
                        statusText: n.statusText || "Unknown Error",
                        url: i || void 0,
                      });
                    e.error(r);
                  };
                let l = !1;
                const c = (i) => {
                    l || (e.next(o()), (l = !0));
                    let r = { type: zf.DownloadProgress, loaded: i.loaded };
                    i.lengthComputable && (r.total = i.total),
                      "text" === t.responseType &&
                        n.responseText &&
                        (r.partialText = n.responseText),
                      e.next(r);
                  },
                  u = (t) => {
                    let n = { type: zf.UploadProgress, loaded: t.loaded };
                    t.lengthComputable && (n.total = t.total), e.next(n);
                  };
                return (
                  n.addEventListener("load", a),
                  n.addEventListener("error", s),
                  t.reportProgress &&
                    (n.addEventListener("progress", c),
                    null !== i &&
                      n.upload &&
                      n.upload.addEventListener("progress", u)),
                  n.send(i),
                  e.next({ type: zf.Sent }),
                  () => {
                    n.removeEventListener("error", s),
                      n.removeEventListener("load", a),
                      t.reportProgress &&
                        (n.removeEventListener("progress", c),
                        null !== i &&
                          n.upload &&
                          n.upload.removeEventListener("progress", u)),
                      n.abort();
                  }
                );
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(Wf));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const Jf = new jt("XSRF_COOKIE_NAME"),
        Kf = new jt("XSRF_HEADER_NAME");
      class tg {}
      let eg = (() => {
          class t {
            constructor(t, e, n) {
              (this.doc = t),
                (this.platform = e),
                (this.cookieName = n),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ("server" === this.platform) return null;
              const t = this.doc.cookie || "";
              return (
                t !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = Mc(t, this.cookieName)),
                  (this.lastCookieString = t)),
                this.lastToken
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(ac), Gt(dl), Gt(Jf));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        ng = (() => {
          class t {
            constructor(t, e) {
              (this.tokenService = t), (this.headerName = e);
            }
            intercept(t, e) {
              const n = t.url.toLowerCase();
              if (
                "GET" === t.method ||
                "HEAD" === t.method ||
                n.startsWith("http://") ||
                n.startsWith("https://")
              )
                return e.handle(t);
              const i = this.tokenService.getToken();
              return (
                null === i ||
                  t.headers.has(this.headerName) ||
                  (t = t.clone({ headers: t.headers.set(this.headerName, i) })),
                e.handle(t)
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(tg), Gt(Kf));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        ig = (() => {
          class t {
            constructor(t, e) {
              (this.backend = t), (this.injector = e), (this.chain = null);
            }
            handle(t) {
              if (null === this.chain) {
                const t = this.injector.get(Bf, []);
                this.chain = t.reduceRight(
                  (t, e) => new Yf(t, e),
                  this.backend
                );
              }
              return this.chain.handle(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(Ef), Gt(Vo));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        rg = (() => {
          class t {
            static disable() {
              return {
                ngModule: t,
                providers: [{ provide: ng, useClass: Gf }],
              };
            }
            static withOptions(e = {}) {
              return {
                ngModule: t,
                providers: [
                  e.cookieName ? { provide: Jf, useValue: e.cookieName } : [],
                  e.headerName ? { provide: Kf, useValue: e.headerName } : [],
                ],
              };
            }
          }
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [
                ng,
                { provide: Bf, useExisting: ng, multi: !0 },
                { provide: tg, useClass: eg },
                { provide: Jf, useValue: "XSRF-TOKEN" },
                { provide: Kf, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            t
          );
        })(),
        og = (() => {
          class t {}
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [
                $f,
                { provide: Sf, useClass: ig },
                Qf,
                { provide: Ef, useExisting: Qf },
                Zf,
                { provide: Wf, useExisting: Zf },
              ],
              imports: [
                [
                  rg.withOptions({
                    cookieName: "XSRF-TOKEN",
                    headerName: "X-XSRF-TOKEN",
                  }),
                ],
              ],
            })),
            t
          );
        })();
      function ag(t, e) {
        return new w((n) => {
          const i = t.length;
          if (0 === i) return void n.complete();
          const r = new Array(i);
          let o = 0,
            a = 0;
          for (let s = 0; s < i; s++) {
            const l = L(t[s]);
            let c = !1;
            n.add(
              l.subscribe({
                next: (t) => {
                  c || ((c = !0), a++), (r[s] = t);
                },
                error: (t) => n.error(t),
                complete: () => {
                  o++,
                    (o !== i && c) ||
                      (a === i &&
                        n.next(
                          e ? e.reduce((t, e, n) => ((t[e] = r[n]), t), {}) : r
                        ),
                      n.complete());
                },
              })
            );
          }
        });
      }
      const sg = new jt("NgValueAccessor"),
        lg = { provide: sg, useExisting: vt(() => cg), multi: !0 };
      let cg = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = (t) => {}),
              (this.onTouched = () => {});
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "checked",
              t
            );
          }
          registerOnChange(t) {
            this.onChange = t;
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ea(cs), ea(os));
          }),
          (t.ɵdir = be({
            type: t,
            selectors: [
              ["input", "type", "checkbox", "formControlName", ""],
              ["input", "type", "checkbox", "formControl", ""],
              ["input", "type", "checkbox", "ngModel", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                ha("change", function (t) {
                  return e.onChange(t.target.checked);
                })("blur", function () {
                  return e.onTouched();
                });
            },
            features: [es([lg])],
          })),
          t
        );
      })();
      const ug = { provide: sg, useExisting: vt(() => dg), multi: !0 },
        hg = new jt("CompositionEventMode");
      let dg = (() => {
          class t {
            constructor(t, e, n) {
              (this._renderer = t),
                (this._elementRef = e),
                (this._compositionMode = n),
                (this.onChange = (t) => {}),
                (this.onTouched = () => {}),
                (this._composing = !1),
                null == this._compositionMode &&
                  (this._compositionMode = !(function () {
                    const t = oc() ? oc().getUserAgent() : "";
                    return /android (\d+)/.test(t.toLowerCase());
                  })());
            }
            writeValue(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "value",
                null == t ? "" : t
              );
            }
            registerOnChange(t) {
              this.onChange = t;
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }
            _handleInput(t) {
              (!this._compositionMode ||
                (this._compositionMode && !this._composing)) &&
                this.onChange(t);
            }
            _compositionStart() {
              this._composing = !0;
            }
            _compositionEnd(t) {
              (this._composing = !1), this._compositionMode && this.onChange(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ea(cs), ea(os), ea(hg, 8));
            }),
            (t.ɵdir = be({
              type: t,
              selectors: [
                ["input", "formControlName", "", 3, "type", "checkbox"],
                ["textarea", "formControlName", ""],
                ["input", "formControl", "", 3, "type", "checkbox"],
                ["textarea", "formControl", ""],
                ["input", "ngModel", "", 3, "type", "checkbox"],
                ["textarea", "ngModel", ""],
                ["", "ngDefaultControl", ""],
              ],
              hostBindings: function (t, e) {
                1 & t &&
                  ha("input", function (t) {
                    return e._handleInput(t.target.value);
                  })("blur", function () {
                    return e.onTouched();
                  })("compositionstart", function () {
                    return e._compositionStart();
                  })("compositionend", function (t) {
                    return e._compositionEnd(t.target.value);
                  });
              },
              features: [es([ug])],
            })),
            t
          );
        })(),
        pg = (() => {
          class t {
            get value() {
              return this.control ? this.control.value : null;
            }
            get valid() {
              return this.control ? this.control.valid : null;
            }
            get invalid() {
              return this.control ? this.control.invalid : null;
            }
            get pending() {
              return this.control ? this.control.pending : null;
            }
            get disabled() {
              return this.control ? this.control.disabled : null;
            }
            get enabled() {
              return this.control ? this.control.enabled : null;
            }
            get errors() {
              return this.control ? this.control.errors : null;
            }
            get pristine() {
              return this.control ? this.control.pristine : null;
            }
            get dirty() {
              return this.control ? this.control.dirty : null;
            }
            get touched() {
              return this.control ? this.control.touched : null;
            }
            get status() {
              return this.control ? this.control.status : null;
            }
            get untouched() {
              return this.control ? this.control.untouched : null;
            }
            get statusChanges() {
              return this.control ? this.control.statusChanges : null;
            }
            get valueChanges() {
              return this.control ? this.control.valueChanges : null;
            }
            get path() {
              return null;
            }
            reset(t) {
              this.control && this.control.reset(t);
            }
            hasError(t, e) {
              return !!this.control && this.control.hasError(t, e);
            }
            getError(t, e) {
              return this.control ? this.control.getError(t, e) : null;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = be({ type: t })),
            t
          );
        })(),
        fg = (() => {
          class t extends pg {
            get formDirective() {
              return null;
            }
            get path() {
              return null;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return gg(e || t);
            }),
            (t.ɵdir = be({ type: t, features: [Ua] })),
            t
          );
        })();
      const gg = Kn(fg);
      function mg() {
        throw new Error("unimplemented");
      }
      class bg extends pg {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null),
            (this._rawValidators = []),
            (this._rawAsyncValidators = []);
        }
        get validator() {
          return mg();
        }
        get asyncValidator() {
          return mg();
        }
      }
      class _g {
        constructor(t) {
          this._cd = t;
        }
        get ngClassUntouched() {
          return !!this._cd.control && this._cd.control.untouched;
        }
        get ngClassTouched() {
          return !!this._cd.control && this._cd.control.touched;
        }
        get ngClassPristine() {
          return !!this._cd.control && this._cd.control.pristine;
        }
        get ngClassDirty() {
          return !!this._cd.control && this._cd.control.dirty;
        }
        get ngClassValid() {
          return !!this._cd.control && this._cd.control.valid;
        }
        get ngClassInvalid() {
          return !!this._cd.control && this._cd.control.invalid;
        }
        get ngClassPending() {
          return !!this._cd.control && this._cd.control.pending;
        }
      }
      let yg = (() => {
          class t extends _g {
            constructor(t) {
              super(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ea(bg, 2));
            }),
            (t.ɵdir = be({
              type: t,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""],
              ],
              hostVars: 14,
              hostBindings: function (t, e) {
                2 & t &&
                  xa("ng-untouched", e.ngClassUntouched)(
                    "ng-touched",
                    e.ngClassTouched
                  )("ng-pristine", e.ngClassPristine)(
                    "ng-dirty",
                    e.ngClassDirty
                  )("ng-valid", e.ngClassValid)("ng-invalid", e.ngClassInvalid)(
                    "ng-pending",
                    e.ngClassPending
                  );
              },
              features: [Ua],
            })),
            t
          );
        })(),
        wg = (() => {
          class t extends _g {
            constructor(t) {
              super(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ea(fg, 2));
            }),
            (t.ɵdir = be({
              type: t,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""],
              ],
              hostVars: 14,
              hostBindings: function (t, e) {
                2 & t &&
                  xa("ng-untouched", e.ngClassUntouched)(
                    "ng-touched",
                    e.ngClassTouched
                  )("ng-pristine", e.ngClassPristine)(
                    "ng-dirty",
                    e.ngClassDirty
                  )("ng-valid", e.ngClassValid)("ng-invalid", e.ngClassInvalid)(
                    "ng-pending",
                    e.ngClassPending
                  );
              },
              features: [Ua],
            })),
            t
          );
        })();
      function Cg(t) {
        return null == t || 0 === t.length;
      }
      const vg = new jt("NgValidators"),
        xg = new jt("NgAsyncValidators"),
        Og = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class kg {
        static min(t) {
          return (e) => {
            if (Cg(e.value) || Cg(t)) return null;
            const n = parseFloat(e.value);
            return !isNaN(n) && n < t
              ? { min: { min: t, actual: e.value } }
              : null;
          };
        }
        static max(t) {
          return (e) => {
            if (Cg(e.value) || Cg(t)) return null;
            const n = parseFloat(e.value);
            return !isNaN(n) && n > t
              ? { max: { max: t, actual: e.value } }
              : null;
          };
        }
        static required(t) {
          return Cg(t.value) ? { required: !0 } : null;
        }
        static requiredTrue(t) {
          return !0 === t.value ? null : { required: !0 };
        }
        static email(t) {
          return Cg(t.value) || Og.test(t.value) ? null : { email: !0 };
        }
        static minLength(t) {
          return (e) => {
            if (Cg(e.value)) return null;
            const n = e.value ? e.value.length : 0;
            return n < t
              ? { minlength: { requiredLength: t, actualLength: n } }
              : null;
          };
        }
        static maxLength(t) {
          return (e) => {
            const n = e.value ? e.value.length : 0;
            return n > t
              ? { maxlength: { requiredLength: t, actualLength: n } }
              : null;
          };
        }
        static pattern(t) {
          if (!t) return kg.nullValidator;
          let e, n;
          return (
            "string" == typeof t
              ? ((n = ""),
                "^" !== t.charAt(0) && (n += "^"),
                (n += t),
                "$" !== t.charAt(t.length - 1) && (n += "$"),
                (e = new RegExp(n)))
              : ((n = t.toString()), (e = t)),
            (t) => {
              if (Cg(t.value)) return null;
              const i = t.value;
              return e.test(i)
                ? null
                : { pattern: { requiredPattern: n, actualValue: i } };
            }
          );
        }
        static nullValidator(t) {
          return null;
        }
        static compose(t) {
          if (!t) return null;
          const e = t.filter(Pg);
          return 0 == e.length
            ? null
            : function (t) {
                return Sg(
                  (function (t, e) {
                    return e.map((e) => e(t));
                  })(t, e)
                );
              };
        }
        static composeAsync(t) {
          if (!t) return null;
          const e = t.filter(Pg);
          return 0 == e.length
            ? null
            : function (t) {
                return (function (...t) {
                  if (1 === t.length) {
                    const e = t[0];
                    if (l(e)) return ag(e, null);
                    if (c(e) && Object.getPrototypeOf(e) === Object.prototype) {
                      const t = Object.keys(e);
                      return ag(
                        t.map((t) => e[t]),
                        t
                      );
                    }
                  }
                  if ("function" == typeof t[t.length - 1]) {
                    const e = t.pop();
                    return ag(
                      (t = 1 === t.length && l(t[0]) ? t[0] : t),
                      null
                    ).pipe(j((t) => e(...t)));
                  }
                  return ag(t, null);
                })(
                  (function (t, e) {
                    return e.map((e) => e(t));
                  })(t, e).map(Mg)
                ).pipe(j(Sg));
              };
        }
      }
      function Pg(t) {
        return null != t;
      }
      function Mg(t) {
        const e = ca(t) ? L(t) : t;
        if (!ua(e))
          throw new Error(
            "Expected validator to return Promise or Observable."
          );
        return e;
      }
      function Sg(t) {
        let e = {};
        return (
          t.forEach((t) => {
            e = null != t ? Object.assign(Object.assign({}, e), t) : e;
          }),
          0 === Object.keys(e).length ? null : e
        );
      }
      function Eg(t) {
        return t.validate ? (e) => t.validate(e) : t;
      }
      function Tg(t) {
        return t.validate ? (e) => t.validate(e) : t;
      }
      const Ag = { provide: sg, useExisting: vt(() => Ig), multi: !0 };
      let Ig = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = (t) => {}),
              (this.onTouched = () => {});
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              null == t ? "" : t
            );
          }
          registerOnChange(t) {
            this.onChange = (e) => {
              t("" == e ? null : parseFloat(e));
            };
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ea(cs), ea(os));
          }),
          (t.ɵdir = be({
            type: t,
            selectors: [
              ["input", "type", "number", "formControlName", ""],
              ["input", "type", "number", "formControl", ""],
              ["input", "type", "number", "ngModel", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                ha("change", function (t) {
                  return e.onChange(t.target.value);
                })("input", function (t) {
                  return e.onChange(t.target.value);
                })("blur", function () {
                  return e.onTouched();
                });
            },
            features: [es([Ag])],
          })),
          t
        );
      })();
      const Rg = { provide: sg, useExisting: vt(() => Dg), multi: !0 };
      let Ng = (() => {
          class t {
            constructor() {
              this._accessors = [];
            }
            add(t, e) {
              this._accessors.push([t, e]);
            }
            remove(t) {
              for (let e = this._accessors.length - 1; e >= 0; --e)
                if (this._accessors[e][1] === t)
                  return void this._accessors.splice(e, 1);
            }
            select(t) {
              this._accessors.forEach((e) => {
                this._isSameGroup(e, t) &&
                  e[1] !== t &&
                  e[1].fireUncheck(t.value);
              });
            }
            _isSameGroup(t, e) {
              return (
                !!t[0].control &&
                t[0]._parent === e._control._parent &&
                t[1].name === e.name
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Dg = (() => {
          class t {
            constructor(t, e, n, i) {
              (this._renderer = t),
                (this._elementRef = e),
                (this._registry = n),
                (this._injector = i),
                (this.onChange = () => {}),
                (this.onTouched = () => {});
            }
            ngOnInit() {
              (this._control = this._injector.get(bg)),
                this._checkName(),
                this._registry.add(this._control, this);
            }
            ngOnDestroy() {
              this._registry.remove(this);
            }
            writeValue(t) {
              (this._state = t === this.value),
                this._renderer.setProperty(
                  this._elementRef.nativeElement,
                  "checked",
                  this._state
                );
            }
            registerOnChange(t) {
              (this._fn = t),
                (this.onChange = () => {
                  t(this.value), this._registry.select(this);
                });
            }
            fireUncheck(t) {
              this.writeValue(t);
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }
            _checkName() {
              this.name &&
                this.formControlName &&
                this.name !== this.formControlName &&
                this._throwNameError(),
                !this.name &&
                  this.formControlName &&
                  (this.name = this.formControlName);
            }
            _throwNameError() {
              throw new Error(
                '\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type="radio" formControlName="food" name="food">\n    '
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ea(cs), ea(os), ea(Ng), ea(Vo));
            }),
            (t.ɵdir = be({
              type: t,
              selectors: [
                ["input", "type", "radio", "formControlName", ""],
                ["input", "type", "radio", "formControl", ""],
                ["input", "type", "radio", "ngModel", ""],
              ],
              hostBindings: function (t, e) {
                1 & t &&
                  ha("change", function () {
                    return e.onChange();
                  })("blur", function () {
                    return e.onTouched();
                  });
              },
              inputs: {
                name: "name",
                formControlName: "formControlName",
                value: "value",
              },
              features: [es([Rg])],
            })),
            t
          );
        })();
      const Vg = { provide: sg, useExisting: vt(() => jg), multi: !0 };
      let jg = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = (t) => {}),
              (this.onTouched = () => {});
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              parseFloat(t)
            );
          }
          registerOnChange(t) {
            this.onChange = (e) => {
              t("" == e ? null : parseFloat(e));
            };
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ea(cs), ea(os));
          }),
          (t.ɵdir = be({
            type: t,
            selectors: [
              ["input", "type", "range", "formControlName", ""],
              ["input", "type", "range", "formControl", ""],
              ["input", "type", "range", "ngModel", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                ha("change", function (t) {
                  return e.onChange(t.target.value);
                })("input", function (t) {
                  return e.onChange(t.target.value);
                })("blur", function () {
                  return e.onTouched();
                });
            },
            features: [es([Vg])],
          })),
          t
        );
      })();
      const zg =
          '\n    <div [formGroup]="myGroup">\n       <div formGroupName="person">\n          <input formControlName="firstName">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });',
        Ug =
          '\n    <form>\n       <div ngModelGroup="person">\n          <input [(ngModel)]="person.name" name="firstName">\n       </div>\n    </form>',
        Fg = { provide: sg, useExisting: vt(() => Lg), multi: !0 };
      let Lg = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this._optionMap = new Map()),
              (this._idCounter = 0),
              (this.onChange = (t) => {}),
              (this.onTouched = () => {}),
              (this._compareWith = $o);
          }
          set compareWith(t) {
            if ("function" != typeof t)
              throw new Error(
                `compareWith must be a function, but received ${JSON.stringify(
                  t
                )}`
              );
            this._compareWith = t;
          }
          writeValue(t) {
            this.value = t;
            const e = this._getOptionId(t);
            null == e &&
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "selectedIndex",
                -1
              );
            const n = (function (t, e) {
              return null == t
                ? `${e}`
                : (e && "object" == typeof e && (e = "Object"),
                  `${t}: ${e}`.slice(0, 50));
            })(e, t);
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              n
            );
          }
          registerOnChange(t) {
            this.onChange = (e) => {
              (this.value = this._getOptionValue(e)), t(this.value);
            };
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
          _registerOption() {
            return (this._idCounter++).toString();
          }
          _getOptionId(t) {
            for (const e of Array.from(this._optionMap.keys()))
              if (this._compareWith(this._optionMap.get(e), t)) return e;
            return null;
          }
          _getOptionValue(t) {
            const e = (function (t) {
              return t.split(":")[0];
            })(t);
            return this._optionMap.has(e) ? this._optionMap.get(e) : t;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ea(cs), ea(os));
          }),
          (t.ɵdir = be({
            type: t,
            selectors: [
              ["select", "formControlName", "", 3, "multiple", ""],
              ["select", "formControl", "", 3, "multiple", ""],
              ["select", "ngModel", "", 3, "multiple", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                ha("change", function (t) {
                  return e.onChange(t.target.value);
                })("blur", function () {
                  return e.onTouched();
                });
            },
            inputs: { compareWith: "compareWith" },
            features: [es([Fg])],
          })),
          t
        );
      })();
      const Hg = { provide: sg, useExisting: vt(() => qg), multi: !0 };
      let qg = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this._optionMap = new Map()),
              (this._idCounter = 0),
              (this.onChange = (t) => {}),
              (this.onTouched = () => {}),
              (this._compareWith = $o);
          }
          set compareWith(t) {
            if ("function" != typeof t)
              throw new Error(
                `compareWith must be a function, but received ${JSON.stringify(
                  t
                )}`
              );
            this._compareWith = t;
          }
          writeValue(t) {
            let e;
            if (((this.value = t), Array.isArray(t))) {
              const n = t.map((t) => this._getOptionId(t));
              e = (t, e) => {
                t._setSelected(n.indexOf(e.toString()) > -1);
              };
            } else
              e = (t, e) => {
                t._setSelected(!1);
              };
            this._optionMap.forEach(e);
          }
          registerOnChange(t) {
            this.onChange = (e) => {
              const n = [];
              if (e.hasOwnProperty("selectedOptions")) {
                const t = e.selectedOptions;
                for (let e = 0; e < t.length; e++) {
                  const i = t.item(e),
                    r = this._getOptionValue(i.value);
                  n.push(r);
                }
              } else {
                const t = e.options;
                for (let e = 0; e < t.length; e++) {
                  const i = t.item(e);
                  if (i.selected) {
                    const t = this._getOptionValue(i.value);
                    n.push(t);
                  }
                }
              }
              (this.value = n), t(n);
            };
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
          _registerOption(t) {
            const e = (this._idCounter++).toString();
            return this._optionMap.set(e, t), e;
          }
          _getOptionId(t) {
            for (const e of Array.from(this._optionMap.keys()))
              if (this._compareWith(this._optionMap.get(e)._value, t)) return e;
            return null;
          }
          _getOptionValue(t) {
            const e = (function (t) {
              return t.split(":")[0];
            })(t);
            return this._optionMap.has(e) ? this._optionMap.get(e)._value : t;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ea(cs), ea(os));
          }),
          (t.ɵdir = be({
            type: t,
            selectors: [
              ["select", "multiple", "", "formControlName", ""],
              ["select", "multiple", "", "formControl", ""],
              ["select", "multiple", "", "ngModel", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                ha("change", function (t) {
                  return e.onChange(t.target);
                })("blur", function () {
                  return e.onTouched();
                });
            },
            inputs: { compareWith: "compareWith" },
            features: [es([Hg])],
          })),
          t
        );
      })();
      function $g(t, e) {
        return [...e.path, t];
      }
      function Yg(t, e) {
        t || Gg(e, "Cannot find control with"),
          e.valueAccessor || Gg(e, "No value accessor for form control with"),
          (t.validator = kg.compose([t.validator, e.validator])),
          (t.asyncValidator = kg.composeAsync([
            t.asyncValidator,
            e.asyncValidator,
          ])),
          e.valueAccessor.writeValue(t.value),
          (function (t, e) {
            e.valueAccessor.registerOnChange((n) => {
              (t._pendingValue = n),
                (t._pendingChange = !0),
                (t._pendingDirty = !0),
                "change" === t.updateOn && Bg(t, e);
            });
          })(t, e),
          (function (t, e) {
            t.registerOnChange((t, n) => {
              e.valueAccessor.writeValue(t), n && e.viewToModelUpdate(t);
            });
          })(t, e),
          (function (t, e) {
            e.valueAccessor.registerOnTouched(() => {
              (t._pendingTouched = !0),
                "blur" === t.updateOn && t._pendingChange && Bg(t, e),
                "submit" !== t.updateOn && t.markAsTouched();
            });
          })(t, e),
          e.valueAccessor.setDisabledState &&
            t.registerOnDisabledChange((t) => {
              e.valueAccessor.setDisabledState(t);
            }),
          e._rawValidators.forEach((e) => {
            e.registerOnValidatorChange &&
              e.registerOnValidatorChange(() => t.updateValueAndValidity());
          }),
          e._rawAsyncValidators.forEach((e) => {
            e.registerOnValidatorChange &&
              e.registerOnValidatorChange(() => t.updateValueAndValidity());
          });
      }
      function Bg(t, e) {
        t._pendingDirty && t.markAsDirty(),
          t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
          e.viewToModelUpdate(t._pendingValue),
          (t._pendingChange = !1);
      }
      function Gg(t, e) {
        let n;
        throw (
          ((n =
            t.path.length > 1
              ? `path: '${t.path.join(" -> ")}'`
              : t.path[0]
              ? `name: '${t.path}'`
              : "unspecified name attribute"),
          new Error(`${e} ${n}`))
        );
      }
      function Xg(t) {
        return null != t ? kg.compose(t.map(Eg)) : null;
      }
      function Wg(t) {
        return null != t ? kg.composeAsync(t.map(Tg)) : null;
      }
      const Zg = [cg, jg, Ig, Lg, qg, Dg];
      function Qg(t) {
        const e = Kg(t) ? t.validators : t;
        return Array.isArray(e) ? Xg(e) : e || null;
      }
      function Jg(t, e) {
        const n = Kg(e) ? e.asyncValidators : t;
        return Array.isArray(n) ? Wg(n) : n || null;
      }
      function Kg(t) {
        return null != t && !Array.isArray(t) && "object" == typeof t;
      }
      class tm {
        constructor(t, e) {
          (this.validator = t),
            (this.asyncValidator = e),
            (this._onCollectionChange = () => {}),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []);
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return "VALID" === this.status;
        }
        get invalid() {
          return "INVALID" === this.status;
        }
        get pending() {
          return "PENDING" == this.status;
        }
        get disabled() {
          return "DISABLED" === this.status;
        }
        get enabled() {
          return "DISABLED" !== this.status;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          this.validator = Qg(t);
        }
        setAsyncValidators(t) {
          this.asyncValidator = Jg(t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((t) => {
              t.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((t) => {
              t.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = "PENDING"),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = "DISABLED"),
            (this.errors = null),
            this._forEachChild((e) => {
              e.disable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: e })
            ),
            this._onDisabledChange.forEach((t) => t(!0));
        }
        enable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = "VALID"),
            this._forEachChild((e) => {
              e.enable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: e })
            ),
            this._onDisabledChange.forEach((t) => t(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              ("VALID" !== this.status && "PENDING" !== this.status) ||
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((e) => e._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? "DISABLED" : "VALID";
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            this.status = "PENDING";
            const e = Mg(this.asyncValidator(this));
            this._asyncValidationSubscription = e.subscribe((e) =>
              this.setErrors(e, { emitEvent: t })
            );
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            this._asyncValidationSubscription.unsubscribe();
        }
        setErrors(t, e = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== e.emitEvent);
        }
        get(t) {
          return (function (t, e, n) {
            if (null == e) return null;
            if (
              (Array.isArray(e) || (e = e.split(".")),
              Array.isArray(e) && 0 === e.length)
            )
              return null;
            let i = t;
            return (
              e.forEach((t) => {
                i =
                  i instanceof nm
                    ? i.controls.hasOwnProperty(t)
                      ? i.controls[t]
                      : null
                    : (i instanceof im && i.at(t)) || null;
              }),
              i
            );
          })(this, t);
        }
        getError(t, e) {
          const n = e ? this.get(e) : this;
          return n && n.errors ? n.errors[t] : null;
        }
        hasError(t, e) {
          return !!this.getError(t, e);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new rl()), (this.statusChanges = new rl());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? "DISABLED"
            : this.errors
            ? "INVALID"
            : this._anyControlsHaveStatus("PENDING")
            ? "PENDING"
            : this._anyControlsHaveStatus("INVALID")
            ? "INVALID"
            : "VALID";
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((e) => e.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _isBoxedValue(t) {
          return (
            "object" == typeof t &&
            null !== t &&
            2 === Object.keys(t).length &&
            "value" in t &&
            "disabled" in t
          );
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          Kg(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            this._parent &&
            this._parent.dirty &&
            !this._parent._anyControlsDirty()
          );
        }
      }
      class em extends tm {
        constructor(t = null, e, n) {
          super(Qg(e), Jg(n, e)),
            (this._onChange = []),
            this._applyFormState(t),
            this._setUpdateStrategy(e),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 }),
            this._initObservables();
        }
        setValue(t, e = {}) {
          (this.value = this._pendingValue = t),
            this._onChange.length &&
              !1 !== e.emitModelToViewChange &&
              this._onChange.forEach((t) =>
                t(this.value, !1 !== e.emitViewToModelChange)
              ),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          this.setValue(t, e);
        }
        reset(t = null, e = {}) {
          this._applyFormState(t),
            this.markAsPristine(e),
            this.markAsUntouched(e),
            this.setValue(this.value, e),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(t) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(t) {
          this._onChange.push(t);
        }
        _clearChangeFns() {
          (this._onChange = []),
            (this._onDisabledChange = []),
            (this._onCollectionChange = () => {});
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t);
        }
        _forEachChild(t) {}
        _syncPendingControls() {
          return !(
            "submit" !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1,
            }),
            0)
          );
        }
        _applyFormState(t) {
          this._isBoxedValue(t)
            ? ((this.value = this._pendingValue = t.value),
              t.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = t);
        }
      }
      class nm extends tm {
        constructor(t, e, n) {
          super(Qg(e), Jg(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 });
        }
        registerControl(t, e) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = e),
              e.setParent(this),
              e._registerOnCollectionChange(this._onCollectionChange),
              e);
        }
        addControl(t, e) {
          this.registerControl(t, e),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        removeControl(t) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        setControl(t, e) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            e && this.registerControl(t, e),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            Object.keys(t).forEach((n) => {
              this._throwIfControlMissing(n),
                this.controls[n].setValue(t[n], {
                  onlySelf: !0,
                  emitEvent: e.emitEvent,
                });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          Object.keys(t).forEach((n) => {
            this.controls[n] &&
              this.controls[n].patchValue(t[n], {
                onlySelf: !0,
                emitEvent: e.emitEvent,
              });
          }),
            this.updateValueAndValidity(e);
        }
        reset(t = {}, e = {}) {
          this._forEachChild((n, i) => {
            n.reset(t[i], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, e, n) => (
              (t[n] = e instanceof em ? e.value : e.getRawValue()), t
            )
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (t, e) => !!e._syncPendingControls() || t
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _throwIfControlMissing(t) {
          if (!Object.keys(this.controls).length)
            throw new Error(
              "\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.controls[t])
            throw new Error(`Cannot find form control with name: ${t}.`);
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((e) => t(this.controls[e], e));
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          let e = !1;
          return (
            this._forEachChild((n, i) => {
              e = e || (this.contains(i) && t(n));
            }),
            e
          );
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (t, e, n) => ((e.enabled || this.disabled) && (t[n] = e.value), t)
          );
        }
        _reduceChildren(t, e) {
          let n = t;
          return (
            this._forEachChild((t, i) => {
              n = e(n, t, i);
            }),
            n
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n])
              throw new Error(
                `Must supply a value for form control with name: '${n}'.`
              );
          });
        }
      }
      class im extends tm {
        constructor(t, e, n) {
          super(Qg(e), Jg(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 });
        }
        at(t) {
          return this.controls[t];
        }
        push(t) {
          this.controls.push(t),
            this._registerControl(t),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        insert(t, e) {
          this.controls.splice(t, 0, e),
            this._registerControl(e),
            this.updateValueAndValidity();
        }
        removeAt(t) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            this.updateValueAndValidity();
        }
        setControl(t, e) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            e && (this.controls.splice(t, 0, e), this._registerControl(e)),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            t.forEach((t, n) => {
              this._throwIfControlMissing(n),
                this.at(n).setValue(t, {
                  onlySelf: !0,
                  emitEvent: e.emitEvent,
                });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          t.forEach((t, n) => {
            this.at(n) &&
              this.at(n).patchValue(t, {
                onlySelf: !0,
                emitEvent: e.emitEvent,
              });
          }),
            this.updateValueAndValidity(e);
        }
        reset(t = [], e = {}) {
          this._forEachChild((n, i) => {
            n.reset(t[i], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this.controls.map((t) =>
            t instanceof em ? t.value : t.getRawValue()
          );
        }
        clear() {
          this.controls.length < 1 ||
            (this._forEachChild((t) => t._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity());
        }
        _syncPendingControls() {
          let t = this.controls.reduce(
            (t, e) => !!e._syncPendingControls() || t,
            !1
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _throwIfControlMissing(t) {
          if (!this.controls.length)
            throw new Error(
              "\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.at(t))
            throw new Error(`Cannot find form control at index ${t}`);
        }
        _forEachChild(t) {
          this.controls.forEach((e, n) => {
            t(e, n);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter((t) => t.enabled || this.disabled)
            .map((t) => t.value);
        }
        _anyControls(t) {
          return this.controls.some((e) => e.enabled && t(e));
        }
        _setUpControls() {
          this._forEachChild((t) => this._registerControl(t));
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n])
              throw new Error(
                `Must supply a value for form control at index: ${n}.`
              );
          });
        }
        _allControlsDisabled() {
          for (const t of this.controls) if (t.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(t) {
          t.setParent(this),
            t._registerOnCollectionChange(this._onCollectionChange);
        }
      }
      const rm = { provide: fg, useExisting: vt(() => am) },
        om = (() => Promise.resolve(null))();
      let am = (() => {
          class t extends fg {
            constructor(t, e) {
              super(),
                (this.submitted = !1),
                (this._directives = []),
                (this.ngSubmit = new rl()),
                (this.form = new nm({}, Xg(t), Wg(e)));
            }
            ngAfterViewInit() {
              this._setUpdateStrategy();
            }
            get formDirective() {
              return this;
            }
            get control() {
              return this.form;
            }
            get path() {
              return [];
            }
            get controls() {
              return this.form.controls;
            }
            addControl(t) {
              om.then(() => {
                const e = this._findContainer(t.path);
                (t.control = e.registerControl(t.name, t.control)),
                  Yg(t.control, t),
                  t.control.updateValueAndValidity({ emitEvent: !1 }),
                  this._directives.push(t);
              });
            }
            getControl(t) {
              return this.form.get(t.path);
            }
            removeControl(t) {
              om.then(() => {
                const e = this._findContainer(t.path);
                e && e.removeControl(t.name),
                  (function (t, e) {
                    const n = t.indexOf(e);
                    n > -1 && t.splice(n, 1);
                  })(this._directives, t);
              });
            }
            addFormGroup(t) {
              om.then(() => {
                const e = this._findContainer(t.path),
                  n = new nm({});
                (function (t, e) {
                  null == t && Gg(e, "Cannot find control with"),
                    (t.validator = kg.compose([t.validator, e.validator])),
                    (t.asyncValidator = kg.composeAsync([
                      t.asyncValidator,
                      e.asyncValidator,
                    ]));
                })(n, t),
                  e.registerControl(t.name, n),
                  n.updateValueAndValidity({ emitEvent: !1 });
              });
            }
            removeFormGroup(t) {
              om.then(() => {
                const e = this._findContainer(t.path);
                e && e.removeControl(t.name);
              });
            }
            getFormGroup(t) {
              return this.form.get(t.path);
            }
            updateModel(t, e) {
              om.then(() => {
                this.form.get(t.path).setValue(e);
              });
            }
            setValue(t) {
              this.control.setValue(t);
            }
            onSubmit(t) {
              return (
                (this.submitted = !0),
                (e = this._directives),
                this.form._syncPendingControls(),
                e.forEach((t) => {
                  const e = t.control;
                  "submit" === e.updateOn &&
                    e._pendingChange &&
                    (t.viewToModelUpdate(e._pendingValue),
                    (e._pendingChange = !1));
                }),
                this.ngSubmit.emit(t),
                !1
              );
              var e;
            }
            onReset() {
              this.resetForm();
            }
            resetForm(t) {
              this.form.reset(t), (this.submitted = !1);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.form._updateOn = this.options.updateOn);
            }
            _findContainer(t) {
              return t.pop(), t.length ? this.form.get(t) : this.form;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ea(vg, 10), ea(xg, 10));
            }),
            (t.ɵdir = be({
              type: t,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
                ["ng-form"],
                ["", "ngForm", ""],
              ],
              hostBindings: function (t, e) {
                1 & t &&
                  ha("submit", function (t) {
                    return e.onSubmit(t);
                  })("reset", function () {
                    return e.onReset();
                  });
              },
              inputs: { options: ["ngFormOptions", "options"] },
              outputs: { ngSubmit: "ngSubmit" },
              exportAs: ["ngForm"],
              features: [es([rm]), Ua],
            })),
            t
          );
        })(),
        sm = (() => {
          class t extends fg {
            ngOnInit() {
              this._checkParentType(), this.formDirective.addFormGroup(this);
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeFormGroup(this);
            }
            get control() {
              return this.formDirective.getFormGroup(this);
            }
            get path() {
              return $g(
                null == this.name ? this.name : this.name.toString(),
                this._parent
              );
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            get validator() {
              return Xg(this._validators);
            }
            get asyncValidator() {
              return Wg(this._asyncValidators);
            }
            _checkParentType() {}
          }
          return (
            (t.ɵfac = function (e) {
              return lm(e || t);
            }),
            (t.ɵdir = be({ type: t, features: [Ua] })),
            t
          );
        })();
      const lm = Kn(sm);
      class cm {
        static modelParentException() {
          throw new Error(
            '\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup\'s partner directive "formControlName" instead.  Example:\n\n      \n    <div [formGroup]="myGroup">\n      <input formControlName="firstName">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });\n\n      Or, if you\'d like to avoid registering this form control, indicate that it\'s standalone in ngModelOptions:\n\n      Example:\n\n      \n    <div [formGroup]="myGroup">\n       <input formControlName="firstName">\n       <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">\n    </div>\n  '
          );
        }
        static formGroupNameException() {
          throw new Error(
            `\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      ${zg}\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      ${Ug}`
          );
        }
        static missingNameException() {
          throw new Error(
            'If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as \'standalone\' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]="person.firstName" name="first">\n      Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">'
          );
        }
        static modelGroupParentException() {
          throw new Error(
            `\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      ${zg}\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      ${Ug}`
          );
        }
      }
      const um = { provide: fg, useExisting: vt(() => hm) };
      let hm = (() => {
        class t extends sm {
          constructor(t, e, n) {
            super(),
              (this._parent = t),
              (this._validators = e),
              (this._asyncValidators = n);
          }
          _checkParentType() {
            this._parent instanceof t ||
              this._parent instanceof am ||
              cm.modelGroupParentException();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ea(fg, 5), ea(vg, 10), ea(xg, 10));
          }),
          (t.ɵdir = be({
            type: t,
            selectors: [["", "ngModelGroup", ""]],
            inputs: { name: ["ngModelGroup", "name"] },
            exportAs: ["ngModelGroup"],
            features: [es([um]), Ua],
          })),
          t
        );
      })();
      const dm = { provide: bg, useExisting: vt(() => fm) },
        pm = (() => Promise.resolve(null))();
      let fm = (() => {
          class t extends bg {
            constructor(t, e, n, i) {
              super(),
                (this.control = new em()),
                (this._registered = !1),
                (this.update = new rl()),
                (this._parent = t),
                (this._rawValidators = e || []),
                (this._rawAsyncValidators = n || []),
                (this.valueAccessor = (function (t, e) {
                  if (!e) return null;
                  Array.isArray(e) ||
                    Gg(
                      t,
                      "Value accessor was not provided as an array for form control with"
                    );
                  let n = void 0,
                    i = void 0,
                    r = void 0;
                  return (
                    e.forEach((e) => {
                      var o;
                      e.constructor === dg
                        ? (n = e)
                        : ((o = e),
                          Zg.some((t) => o.constructor === t)
                            ? (i &&
                                Gg(
                                  t,
                                  "More than one built-in value accessor matches form control with"
                                ),
                              (i = e))
                            : (r &&
                                Gg(
                                  t,
                                  "More than one custom value accessor matches form control with"
                                ),
                              (r = e)));
                    }),
                    r ||
                      i ||
                      n ||
                      (Gg(t, "No valid value accessor for form control with"),
                      null)
                  );
                })(this, i));
            }
            ngOnChanges(t) {
              this._checkForErrors(),
                this._registered || this._setUpControl(),
                "isDisabled" in t && this._updateDisabled(t),
                (function (t, e) {
                  if (!t.hasOwnProperty("model")) return !1;
                  const n = t.model;
                  return !!n.isFirstChange() || !$o(e, n.currentValue);
                })(t, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._parent ? $g(this.name, this._parent) : [this.name];
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            get validator() {
              return Xg(this._rawValidators);
            }
            get asyncValidator() {
              return Wg(this._rawAsyncValidators);
            }
            viewToModelUpdate(t) {
              (this.viewModel = t), this.update.emit(t);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              Yg(this.control, this),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {
              !(this._parent instanceof hm) && this._parent instanceof sm
                ? cm.formGroupNameException()
                : this._parent instanceof hm ||
                  this._parent instanceof am ||
                  cm.modelParentException();
            }
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone() || this.name || cm.missingNameException();
            }
            _updateValue(t) {
              pm.then(() => {
                this.control.setValue(t, { emitViewToModelChange: !1 });
              });
            }
            _updateDisabled(t) {
              const e = t.isDisabled.currentValue,
                n = "" === e || (e && "false" !== e);
              pm.then(() => {
                n && !this.control.disabled
                  ? this.control.disable()
                  : !n && this.control.disabled && this.control.enable();
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                ea(fg, 9),
                ea(vg, 10),
                ea(xg, 10),
                ea(sg, 10)
              );
            }),
            (t.ɵdir = be({
              type: t,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [es([dm]), Ua, Ya],
            })),
            t
          );
        })(),
        gm = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = be({
              type: t,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""],
              ],
              hostAttrs: ["novalidate", ""],
            })),
            t
          );
        })();
      const mm = new jt("NgModelWithFormControlWarning"),
        bm = { provide: vg, useExisting: vt(() => _m), multi: !0 };
      let _m = (() => {
        class t {
          get required() {
            return this._required;
          }
          set required(t) {
            (this._required = null != t && !1 !== t && "false" !== `${t}`),
              this._onChange && this._onChange();
          }
          validate(t) {
            return this.required ? kg.required(t) : null;
          }
          registerOnValidatorChange(t) {
            this._onChange = t;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵdir = be({
            type: t,
            selectors: [
              [
                "",
                "required",
                "",
                "formControlName",
                "",
                3,
                "type",
                "checkbox",
              ],
              ["", "required", "", "formControl", "", 3, "type", "checkbox"],
              ["", "required", "", "ngModel", "", 3, "type", "checkbox"],
            ],
            hostVars: 1,
            hostBindings: function (t, e) {
              2 & t && Qo("required", e.required ? "" : null);
            },
            inputs: { required: "required" },
            features: [es([bm])],
          })),
          t
        );
      })();
      const ym = { provide: vg, useExisting: vt(() => wm), multi: !0 };
      let wm = (() => {
          class t {
            ngOnChanges(t) {
              "pattern" in t &&
                (this._createValidator(), this._onChange && this._onChange());
            }
            validate(t) {
              return this._validator(t);
            }
            registerOnValidatorChange(t) {
              this._onChange = t;
            }
            _createValidator() {
              this._validator = kg.pattern(this.pattern);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = be({
              type: t,
              selectors: [
                ["", "pattern", "", "formControlName", ""],
                ["", "pattern", "", "formControl", ""],
                ["", "pattern", "", "ngModel", ""],
              ],
              hostVars: 1,
              hostBindings: function (t, e) {
                2 & t && Qo("pattern", e.pattern ? e.pattern : null);
              },
              inputs: { pattern: "pattern" },
              features: [es([ym]), Ya],
            })),
            t
          );
        })(),
        Cm = (() => {
          class t {}
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })(),
        vm = (() => {
          class t {
            group(t, e = null) {
              const n = this._reduceControls(t);
              let i = null,
                r = null,
                o = void 0;
              return (
                null != e &&
                  ((function (t) {
                    return (
                      void 0 !== t.asyncValidators ||
                      void 0 !== t.validators ||
                      void 0 !== t.updateOn
                    );
                  })(e)
                    ? ((i = null != e.validators ? e.validators : null),
                      (r =
                        null != e.asyncValidators ? e.asyncValidators : null),
                      (o = null != e.updateOn ? e.updateOn : void 0))
                    : ((i = null != e.validator ? e.validator : null),
                      (r =
                        null != e.asyncValidator ? e.asyncValidator : null))),
                new nm(n, { asyncValidators: r, updateOn: o, validators: i })
              );
            }
            control(t, e, n) {
              return new em(t, e, n);
            }
            array(t, e, n) {
              const i = t.map((t) => this._createControl(t));
              return new im(i, e, n);
            }
            _reduceControls(t) {
              const e = {};
              return (
                Object.keys(t).forEach((n) => {
                  e[n] = this._createControl(t[n]);
                }),
                e
              );
            }
            _createControl(t) {
              return t instanceof em || t instanceof nm || t instanceof im
                ? t
                : Array.isArray(t)
                ? this.control(
                    t[0],
                    t.length > 1 ? t[1] : null,
                    t.length > 2 ? t[2] : null
                  )
                : this.control(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        xm = (() => {
          class t {}
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [Ng],
              imports: [Cm],
            })),
            t
          );
        })(),
        Om = (() => {
          class t {
            static withConfig(e) {
              return {
                ngModule: t,
                providers: [
                  { provide: mm, useValue: e.warnOnNgModelWithFormControl },
                ],
              };
            }
          }
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [vm, Ng],
              imports: [Cm],
            })),
            t
          );
        })();
      function km(t, e, n, i) {
        var r,
          o = arguments.length,
          a =
            o < 3
              ? e
              : null === i
              ? (i = Object.getOwnPropertyDescriptor(e, n))
              : i;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
          a = Reflect.decorate(t, e, n, i);
        else
          for (var s = t.length - 1; s >= 0; s--)
            (r = t[s]) &&
              (a = (o < 3 ? r(a) : o > 3 ? r(e, n, a) : r(e, n)) || a);
        return o > 3 && a && Object.defineProperty(e, n, a), a;
      }
      const Pm = function (t) {
        return { "snotifyToast__buttons--bold": t };
      };
      function Mm(t, e) {
        if (1 & t) {
          const t = la();
          oa(0, "button", 2),
            ha("click", function () {
              Xe(t);
              const n = e.$implicit,
                i = fa();
              return n.action ? n.action(i.toast) : i.remove();
            }),
            Da(1),
            aa();
        }
        if (2 & t) {
          const t = e.$implicit;
          ia("ngClass", Ws(2, Pm, t.bold)), Zi(1), ja(" ", t.text, " ");
        }
      }
      const Sm = function (t) {
        return { "snotifyToast__input--filled": t };
      };
      function Em(t, e) {
        1 & t && sa(0, "div", 2), 2 & t && va("opacity", fa().backdrop);
      }
      function Tm(t, e) {
        if (1 & t) {
          const t = la();
          oa(0, "ng-snotify-toast", 4),
            ha("stateChanged", function (e) {
              return Xe(t), fa(2).stateChanged(e);
            }),
            aa();
        }
        2 & t && ia("toast", e.$implicit);
      }
      function Am(t, e) {
        if (
          (1 & t &&
            (oa(0, "div"),
            Ko(1, Tm, 1, 1, "ng-snotify-toast", 3),
            Ks(2, "slice"),
            aa()),
          2 & t)
        ) {
          const t = e.$implicit,
            i = fa();
          "snotify snotify-",
            (n = t),
            "",
            Pa(ie, Oa, Jo(Be(), "snotify snotify-", n, ""), !0),
            Zi(1),
            ia(
              "ngForOf",
              (function (t, e, n, i, r) {
                const o = Be(),
                  a = je(o, 2);
                return il(
                  o,
                  nl(o, 2)
                    ? Js(o, en(), 4, a.transform, n, i, r, a)
                    : a.transform(n, i, r)
                );
              })(0, 0, i.notifications[t], i.blockSizeA, i.blockSizeB)
            );
        }
        var n;
      }
      const Im = function (t) {
        return { width: t };
      };
      function Rm(t, e) {
        if ((1 & t && (oa(0, "div", 5), sa(1, "span", 6), aa()), 2 & t)) {
          const t = fa();
          Zi(1), ia("ngStyle", Ws(1, Im, 100 * t.state.progress + "%"));
        }
      }
      function Nm(t, e) {
        if (
          (1 & t && (oa(0, "div", 12), Da(1), Ks(2, "truncate"), aa()), 2 & t)
        ) {
          const t = fa(2);
          Qo("id", "snotify_" + t.toast.id),
            Zi(1),
            ja(
              " ",
              el(2, 2, t.toast.title, t.toast.config.titleMaxLength),
              " "
            );
        }
      }
      function Dm(t, e) {
        if (
          (1 & t && (oa(0, "div", 13), Da(1), Ks(2, "truncate"), aa()), 2 & t)
        ) {
          const t = fa(2);
          Zi(1), Va(el(2, 1, t.toast.body, t.toast.config.bodyMaxLength));
        }
      }
      function Vm(t, e) {
        1 & t && sa(0, "ng-snotify-prompt", 14),
          2 & t && ia("toast", fa(2).toast);
      }
      const jm = function (t) {
        return ["snotify-icon", t];
      };
      function zm(t, e) {
        if ((1 & t && sa(0, "div", 15), 2 & t)) {
          const t = fa(2);
          ia(
            "ngClass",
            Ws(
              1,
              jm,
              t.toast.config.iconClass || "snotify-icon--" + t.toast.config.type
            )
          );
        }
      }
      function Um(t, e) {
        1 & t && sa(0, "img", 16),
          2 & t && ia("src", fa(2).toast.config.icon, Ri);
      }
      function Fm(t, e) {
        if (
          (1 & t &&
            (oa(0, "div", 7),
            Ko(1, Nm, 3, 5, "div", 8),
            Ko(2, Dm, 3, 4, "div", 9),
            Ko(3, Vm, 1, 1, "ng-snotify-prompt", 4),
            Ko(4, zm, 1, 3, "div", 10),
            Ko(5, Um, 1, 1, "ng-template", null, 11, ol),
            aa()),
          2 & t)
        ) {
          const t = ta(6),
            e = fa();
          Zi(1),
            ia("ngIf", e.toast.title),
            Zi(1),
            ia("ngIf", e.toast.body),
            Zi(1),
            ia("ngIf", e.toast.config.type === e.state.promptType),
            Zi(1),
            ia("ngIf", !e.toast.config.icon)("ngIfElse", t);
        }
      }
      function Lm(t, e) {
        1 & t && sa(0, "div", 17),
          2 & t && ia("innerHTML", fa().toast.config.html, Ii);
      }
      function Hm(t, e) {
        1 & t && sa(0, "ng-snotify-button", 14),
          2 & t && ia("toast", fa().toast);
      }
      const qm = function (t, e, n) {
          return ["snotifyToast animated", t, e, n];
        },
        $m = function (t, e, n, i) {
          return {
            "-webkit-transition": t,
            transition: e,
            "-webkit-animation-duration": n,
            "animation-duration": i,
          };
        };
      var Ym = (function (t) {
        return (
          (t.simple = "simple"),
          (t.success = "success"),
          (t.error = "error"),
          (t.warning = "warning"),
          (t.info = "info"),
          (t.async = "async"),
          (t.confirm = "confirm"),
          (t.prompt = "prompt"),
          t
        );
      })({});
      function Bm(t, e, n) {
        return e === Ym.async
          ? {
              value(...t) {
                let e;
                return (
                  (e =
                    2 === t.length
                      ? { title: null, body: t[0], config: null, action: t[1] }
                      : 3 === t.length
                      ? "string" == typeof t[1]
                        ? {
                            title: t[1],
                            body: t[0],
                            config: null,
                            action: t[2],
                          }
                        : {
                            title: null,
                            body: t[0],
                            config: t[2],
                            action: t[1],
                          }
                      : {
                          title: t[1],
                          body: t[0],
                          config: t[3],
                          action: t[2],
                        }),
                  n.value.apply(this, [e])
                );
              },
            }
          : {
              value(...t) {
                let e;
                return (
                  (e =
                    1 === t.length
                      ? { title: null, body: t[0], config: null }
                      : 3 === t.length
                      ? { title: t[1], body: t[0], config: t[2] }
                      : {
                          title: null,
                          config: null,
                          body: t[0],
                          ["string" == typeof t[1] ? "title" : "config"]: t[1],
                        }),
                  n.value.apply(this, [e])
                );
              },
            };
      }
      function Gm(t) {
        return t && "object" == typeof t && !Array.isArray(t);
      }
      function Xm(...t) {
        const e = {};
        if (!t.length) return e;
        for (; t.length > 0; ) {
          const n = t.shift();
          if (Gm(n))
            for (const t in n)
              Gm(n[t])
                ? (e[t] = Xm(e[t], n[t]))
                : Object.assign(e, { [t]: n[t] });
        }
        return e;
      }
      function Wm(t, e, n) {
        return {
          value(...t) {
            return (
              (t[0].config = Object.assign(Object.assign({}, t[0].config), {
                type: e,
              })),
              n.value.apply(this, t)
            );
          },
        };
      }
      class Zm {
        constructor(t, e, n, i) {
          (this.id = t),
            (this.title = e),
            (this.body = n),
            (this.config = i),
            (this.eventEmitter = new k()),
            (this.eventsHolder = []),
            this.config.type === Ym.prompt && (this.value = ""),
            this.on("hidden", () => {
              this.eventsHolder.forEach((t) => {
                t.unsubscribe();
              });
            });
        }
        on(t, e) {
          return (
            this.eventsHolder.push(
              this.eventEmitter.subscribe((n) => {
                n === t && e(this);
              })
            ),
            this
          );
        }
        equals(t) {
          return (
            this.body === t.body &&
            this.title === t.title &&
            this.config.type === t.config.type
          );
        }
      }
      let Qm = (() => {
          let t = class {
            constructor(t) {
              (this.config = t),
                (this.emitter = new k()),
                (this.toastChanged = new k()),
                (this.toastDeleted = new k()),
                (this.notifications = []);
            }
            emit() {
              this.emitter.next(this.notifications.slice());
            }
            get(t) {
              return this.notifications.find((e) => e.id === t);
            }
            add(t) {
              (this.config.global.filterDuplicates && this.containsToast(t)) ||
                (this.config.global.newOnTop
                  ? this.notifications.unshift(t)
                  : this.notifications.push(t),
                this.emit());
            }
            containsToast(t) {
              return this.notifications.some((e) => e.equals(t));
            }
            remove(t, e) {
              return t
                ? e
                  ? ((this.notifications = this.notifications.filter(
                      (e) => e.id !== t
                    )),
                    this.emit())
                  : void this.toastDeleted.next(t)
                : this.clear();
            }
            clear() {
              (this.notifications = []), this.emit();
            }
            create(t) {
              const e = Xm(
                  this.config.toast,
                  this.config.type[t.config.type],
                  t.config
                ),
                n = new Zm(
                  Math.floor(Math.random() * (Date.now() - 1)) + 1,
                  t.title,
                  t.body,
                  e
                );
              return this.add(n), n;
            }
            setDefaults(t) {
              return (this.config = Xm(this.config, t));
            }
            simple(t) {
              return this.create(t);
            }
            success(t) {
              return this.create(t);
            }
            error(t) {
              return this.create(t);
            }
            info(t) {
              return this.create(t);
            }
            warning(t) {
              return this.create(t);
            }
            confirm(t) {
              return this.create(t);
            }
            prompt(t) {
              return this.create(t);
            }
            async(t) {
              let e;
              e = t.action instanceof Promise ? L(t.action) : t.action;
              const n = this.create(t);
              return (
                n.on("mounted", () => {
                  const t = e.subscribe(
                    (t) => {
                      this.mergeToast(n, t);
                    },
                    (e) => {
                      this.mergeToast(n, e, Ym.error), t.unsubscribe();
                    },
                    () => {
                      this.mergeToast(n, {}, Ym.success), t.unsubscribe();
                    }
                  );
                }),
                n
              );
            }
            mergeToast(t, e, n) {
              e.body && (t.body = e.body),
                e.title && (t.title = e.title),
                (t.config = n
                  ? Xm(
                      t.config,
                      this.config.global,
                      this.config.toast[n],
                      { type: n },
                      e.config
                    )
                  : Xm(t.config, e.config)),
                e.html && (t.config.html = e.html),
                this.emit(),
                this.toastChanged.next(t);
            }
            html(t, e) {
              return this.create({
                title: null,
                body: null,
                config: Object.assign(Object.assign({}, e), { html: t }),
              });
            }
          };
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt("SnotifyToastConfig"));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            km([Bm, Wm], t.prototype, "simple", null),
            km([Bm, Wm], t.prototype, "success", null),
            km([Bm, Wm], t.prototype, "error", null),
            km([Bm, Wm], t.prototype, "info", null),
            km([Bm, Wm], t.prototype, "warning", null),
            km([Bm, Wm], t.prototype, "confirm", null),
            km([Bm, Wm], t.prototype, "prompt", null),
            km([Bm, Wm], t.prototype, "async", null),
            t
          );
        })(),
        Jm = (() => {
          let t = class {
            constructor(t) {
              this.service = t;
            }
            remove() {
              this.service.remove(this.toast.id);
            }
          };
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ea(Qm));
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["ng-snotify-button"]],
              inputs: { toast: "toast" },
              decls: 2,
              vars: 1,
              consts: [
                [1, "snotifyToast__buttons"],
                [
                  "type",
                  "button",
                  3,
                  "ngClass",
                  "click",
                  4,
                  "ngFor",
                  "ngForOf",
                ],
                ["type", "button", 3, "ngClass", "click"],
              ],
              template: function (t, e) {
                1 & t && (oa(0, "div", 0), Ko(1, Mm, 2, 4, "button", 1), aa()),
                  2 & t && (Zi(1), ia("ngForOf", e.toast.config.buttons));
              },
              directives: [Tc, Sc],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        Km = (() => {
          let t = class {
            constructor() {
              this.isPromptFocused = !1;
            }
          };
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["ng-snotify-prompt"]],
              inputs: { toast: "toast" },
              decls: 6,
              vars: 8,
              consts: [
                [1, "snotifyToast__input", 3, "ngClass"],
                [
                  "autofocus",
                  "",
                  "type",
                  "text",
                  1,
                  "snotifyToast__input__field",
                  3,
                  "id",
                  "input",
                  "focus",
                  "blur",
                ],
                [1, "snotifyToast__input__label", 3, "for"],
                [1, "snotifyToast__input__labelContent"],
              ],
              template: function (t, e) {
                1 & t &&
                  (oa(0, "span", 0),
                  oa(1, "input", 1),
                  ha("input", function (t) {
                    return (
                      (e.toast.value = t.target.value),
                      e.toast.eventEmitter.next("input")
                    );
                  })("focus", function () {
                    return (e.isPromptFocused = !0);
                  })("blur", function () {
                    return (e.isPromptFocused = !!e.toast.value.length);
                  }),
                  aa(),
                  oa(2, "label", 2),
                  oa(3, "span", 3),
                  Da(4),
                  Ks(5, "truncate"),
                  aa(),
                  aa(),
                  aa()),
                  2 & t &&
                    (ia("ngClass", Ws(6, Sm, e.isPromptFocused)),
                    Zi(1),
                    ia("id", e.toast.id),
                    Zi(1),
                    ia("for", e.toast.id),
                    Zi(2),
                    Va(tl(5, 4, e.toast.config.placeholder)));
              },
              directives: function () {
                return [Sc];
              },
              pipes: function () {
                return [rb];
              },
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })();
      var tb = (function (t) {
        return (
          (t.leftTop = "leftTop"),
          (t.leftCenter = "leftCenter"),
          (t.leftBottom = "leftBottom"),
          (t.rightTop = "rightTop"),
          (t.rightCenter = "rightCenter"),
          (t.rightBottom = "rightBottom"),
          (t.centerTop = "centerTop"),
          (t.centerCenter = "centerCenter"),
          (t.centerBottom = "centerBottom"),
          t
        );
      })({});
      let eb = (() => {
          let t = class {
            constructor(t) {
              (this.service = t), (this.backdrop = -1);
            }
            ngOnInit() {
              this.emitter = this.service.emitter.subscribe((t) => {
                this.service.config.global.newOnTop
                  ? ((this.dockSizeA = -this.service.config.global.maxOnScreen),
                    (this.dockSizeB = void 0),
                    (this.blockSizeA = -this.service.config.global
                      .maxAtPosition),
                    (this.blockSizeB = void 0),
                    (this.withBackdrop = t.filter(
                      (t) => t.config.backdrop >= 0
                    )))
                  : ((this.dockSizeA = 0),
                    (this.dockSizeB = this.service.config.global.maxOnScreen),
                    (this.blockSizeA = 0),
                    (this.blockSizeB = this.service.config.global.maxAtPosition),
                    (this.withBackdrop = t
                      .filter((t) => t.config.backdrop >= 0)
                      .reverse())),
                  (this.notifications = this.splitToasts(
                    t.slice(this.dockSizeA, this.dockSizeB)
                  )),
                  this.stateChanged("mounted");
              });
            }
            stateChanged(t) {
              if (this.withBackdrop.length)
                switch (t) {
                  case "mounted":
                    this.backdrop < 0 && (this.backdrop = 0);
                    break;
                  case "beforeShow":
                    this.backdrop = this.withBackdrop[
                      this.withBackdrop.length - 1
                    ].config.backdrop;
                    break;
                  case "beforeHide":
                    1 === this.withBackdrop.length && (this.backdrop = 0);
                    break;
                  case "hidden":
                    1 === this.withBackdrop.length && (this.backdrop = -1);
                }
              else this.backdrop >= 0 && (this.backdrop = -1);
            }
            splitToasts(t) {
              const e = {};
              for (const n in tb) tb.hasOwnProperty(n) && (e[tb[n]] = []);
              return (
                t.forEach((t) => {
                  e[t.config.position].push(t);
                }),
                e
              );
            }
            ngOnDestroy() {
              this.emitter.unsubscribe();
            }
          };
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ea(Qm));
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["ng-snotify"]],
              decls: 3,
              vars: 4,
              consts: [
                ["class", "snotify-backdrop", 3, "opacity", 4, "ngIf"],
                [3, "class", 4, "ngFor", "ngForOf"],
                [1, "snotify-backdrop"],
                [3, "toast", "stateChanged", 4, "ngFor", "ngForOf"],
                [3, "toast", "stateChanged"],
              ],
              template: function (t, e) {
                1 & t &&
                  (Ko(0, Em, 1, 2, "div", 0),
                  Ko(1, Am, 3, 8, "div", 1),
                  Ks(2, "keys")),
                  2 & t &&
                    (ia("ngIf", e.backdrop >= 0),
                    Zi(1),
                    ia("ngForOf", tl(2, 2, e.notifications)));
              },
              directives: function () {
                return [Ic, Tc, nb];
              },
              pipes: function () {
                return [ib, Vc];
              },
              encapsulation: 2,
            })),
            t
          );
        })(),
        nb = (() => {
          let t = class {
            constructor(t) {
              (this.service = t),
                (this.stateChanged = new rl()),
                (this.state = {
                  paused: !1,
                  progress: 0,
                  animation: "",
                  isDestroying: !1,
                  promptType: Ym.prompt,
                });
            }
            ngOnInit() {
              (this.toastChangedSubscription = this.service.toastChanged.subscribe(
                (t) => {
                  this.toast.id === t.id && this.initToast();
                }
              )),
                (this.toastDeletedSubscription = this.service.toastDeleted.subscribe(
                  (t) => {
                    this.toast.id === t && this.onRemove();
                  }
                )),
                this.toast.config.timeout ||
                  (this.toast.config.showProgressBar = !1),
                this.toast.eventEmitter.next("mounted"),
                (this.state.animation = "snotifyToast--in");
            }
            ngAfterContentInit() {
              setTimeout(() => {
                this.stateChanged.emit("beforeShow"),
                  this.toast.eventEmitter.next("beforeShow"),
                  (this.state.animation = this.toast.config.animation.enter);
              }, this.service.config.toast.animation.time / 5);
            }
            ngOnDestroy() {
              cancelAnimationFrame(this.animationFrame),
                this.toast.eventEmitter.next("destroyed"),
                this.toastChangedSubscription.unsubscribe(),
                this.toastDeletedSubscription.unsubscribe();
            }
            onClick() {
              this.toast.eventEmitter.next("click"),
                this.toast.config.closeOnClick &&
                  this.service.remove(this.toast.id);
            }
            onRemove() {
              (this.state.isDestroying = !0),
                this.toast.eventEmitter.next("beforeHide"),
                this.stateChanged.emit("beforeHide"),
                (this.state.animation = this.toast.config.animation.exit),
                setTimeout(() => {
                  this.stateChanged.emit("hidden"),
                    (this.state.animation = "snotifyToast--out"),
                    this.toast.eventEmitter.next("hidden"),
                    setTimeout(
                      () => this.service.remove(this.toast.id, !0),
                      this.toast.config.animation.time / 2
                    );
                }, this.toast.config.animation.time / 2);
            }
            onMouseEnter() {
              this.toast.eventEmitter.next("mouseenter"),
                this.toast.config.pauseOnHover && (this.state.paused = !0);
            }
            onMouseLeave() {
              this.toast.config.pauseOnHover &&
                this.toast.config.timeout &&
                ((this.state.paused = !1),
                this.startTimeout(
                  this.toast.config.timeout * this.state.progress
                )),
                this.toast.eventEmitter.next("mouseleave");
            }
            onExitTransitionEnd() {
              this.state.isDestroying ||
                (this.initToast(), this.toast.eventEmitter.next("shown"));
            }
            initToast() {
              this.toast.config.timeout > 0 && this.startTimeout(0);
            }
            startTimeout(t = 0) {
              const e = performance.now(),
                n = () => {
                  this.animationFrame = requestAnimationFrame((i) => {
                    const r = i + t - e,
                      o = Math.min(r / this.toast.config.timeout, 1);
                    this.state.paused
                      ? cancelAnimationFrame(this.animationFrame)
                      : r < this.toast.config.timeout
                      ? ((this.state.progress = o), n())
                      : ((this.state.progress = 1),
                        cancelAnimationFrame(this.animationFrame),
                        this.service.remove(this.toast.id));
                  });
                };
              n();
            }
          };
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ea(Qm));
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["ng-snotify-toast"]],
              inputs: { toast: "toast" },
              outputs: { stateChanged: "stateChanged" },
              decls: 6,
              vars: 18,
              consts: [
                [
                  3,
                  "ngClass",
                  "ngStyle",
                  "animationend",
                  "click",
                  "mouseenter",
                  "mouseleave",
                ],
                ["class", "snotifyToast__progressBar", 4, "ngIf"],
                ["class", "snotifyToast__inner", 4, "ngIf", "ngIfElse"],
                ["toastHTML", ""],
                [3, "toast", 4, "ngIf"],
                [1, "snotifyToast__progressBar"],
                [1, "snotifyToast__progressBar__percentage", 3, "ngStyle"],
                [1, "snotifyToast__inner"],
                ["class", "snotifyToast__title", 4, "ngIf"],
                ["class", "snotifyToast__body", 4, "ngIf"],
                [3, "ngClass", 4, "ngIf", "ngIfElse"],
                ["elseBlock", ""],
                [1, "snotifyToast__title"],
                [1, "snotifyToast__body"],
                [3, "toast"],
                [3, "ngClass"],
                [1, "snotify-icon", 3, "src"],
                [1, "snotifyToast__inner", 3, "innerHTML"],
              ],
              template: function (t, e) {
                if (
                  (1 & t &&
                    (oa(0, "div", 0),
                    ha("animationend", function () {
                      return e.onExitTransitionEnd();
                    })("click", function () {
                      return e.onClick();
                    })("mouseenter", function () {
                      return e.onMouseEnter();
                    })("mouseleave", function () {
                      return e.onMouseLeave();
                    }),
                    Ko(1, Rm, 2, 3, "div", 1),
                    Ko(2, Fm, 7, 5, "div", 2),
                    Ko(3, Lm, 1, 1, "ng-template", null, 3, ol),
                    Ko(5, Hm, 1, 1, "ng-snotify-button", 4),
                    aa()),
                  2 & t)
                ) {
                  const t = ta(4);
                  ia(
                    "ngClass",
                    (9,
                    (n = qm),
                    (i = "snotify-" + e.toast.config.type),
                    (r = e.state.animation),
                    (o =
                      void 0 === e.toast.valid
                        ? ""
                        : e.toast.valid
                        ? "snotifyToast--valid"
                        : "snotifyToast--invalid"),
                    Js(Be(), en(), 9, n, i, r, o, void 0))
                  )(
                    "ngStyle",
                    (function (t, e, n, i, r, o, a) {
                      return (function (t, e, n, i, r, o, a, s, l) {
                        const c = e + n;
                        return (function (t, e, n, i, r, o) {
                          const a = Zo(t, e, n, i);
                          return Zo(t, e + 2, r, o) || a;
                        })(t, c, r, o, a, s)
                          ? Xo(
                              t,
                              c + 4,
                              l ? i.call(l, r, o, a, s) : i(r, o, a, s)
                            )
                          : Zs(t, c + 4);
                      })(Be(), en(), t, e, n, i, r, o, a);
                    })(
                      13,
                      $m,
                      e.toast.config.animation.time + "ms",
                      e.toast.config.animation.time + "ms",
                      e.toast.config.animation.time + "ms",
                      e.toast.config.animation.time + "ms"
                    )
                  ),
                    Qo(
                      "role",
                      e.toast.config.type === e.state.promptType
                        ? "dialog"
                        : "alert"
                    )("aria-labelledby", "snotify_" + e.toast.id)(
                      "aria-modal",
                      e.toast.config.type === e.state.promptType
                    ),
                    Zi(1),
                    ia("ngIf", e.toast.config.showProgressBar),
                    Zi(1),
                    ia("ngIf", !e.toast.config.html)("ngIfElse", t),
                    Zi(3),
                    ia("ngIf", e.toast.config.buttons);
                }
                var n, i, r, o;
              },
              directives: function () {
                return [Sc, Dc, Ic, Km, Jm];
              },
              pipes: function () {
                return [rb];
              },
              encapsulation: 2,
            })),
            t
          );
        })(),
        ib = (() => {
          let t = class {
            transform(t, e = null) {
              return t ? Object.keys(t) : t;
            }
          };
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵpipe = _e({ name: "keys", type: t, pure: !1 })),
            t
          );
        })(),
        rb = (() => {
          let t = class {
            transform(t, ...e) {
              let n = 40,
                i = "...";
              return (
                e.length > 0 &&
                  ((n = e.length > 0 ? parseInt(e[0], 10) : n),
                  (i = e.length > 1 ? e[1] : i)),
                t.length > n ? t.substring(0, n) + i : t
              );
            }
          };
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵpipe = _e({ name: "truncate", type: t, pure: !0 })),
            t
          );
        })();
      var ob;
      let ab = (() => {
        let t = (ob = class {
          static forRoot() {
            return { ngModule: ob, providers: [Qm] };
          }
        });
        return (
          (t.ɵmod = ge({ type: t })),
          (t.ɵinj = ut({
            factory: function (e) {
              return new (e || t)();
            },
            imports: [[jc]],
          })),
          t
        );
      })();
      const sb = {
          global: {
            newOnTop: !0,
            maxOnScreen: 8,
            maxAtPosition: 8,
            filterDuplicates: !1,
          },
          toast: {
            type: Ym.simple,
            showProgressBar: !0,
            timeout: 2e3,
            closeOnClick: !0,
            pauseOnHover: !0,
            bodyMaxLength: 150,
            titleMaxLength: 16,
            backdrop: -1,
            icon: null,
            iconClass: null,
            html: null,
            position: tb.rightBottom,
            animation: { enter: "fadeIn", exit: "fadeOut", time: 400 },
          },
          type: {
            [Ym.prompt]: {
              timeout: 0,
              closeOnClick: !1,
              buttons: [
                { text: "Ok", action: null, bold: !0 },
                { text: "Cancel", action: null, bold: !1 },
              ],
              placeholder: "Enter answer here...",
              type: Ym.prompt,
            },
            [Ym.confirm]: {
              timeout: 0,
              closeOnClick: !1,
              buttons: [
                { text: "Ok", action: null, bold: !0 },
                { text: "Cancel", action: null, bold: !1 },
              ],
              type: Ym.confirm,
            },
            [Ym.simple]: { type: Ym.simple },
            [Ym.success]: { type: Ym.success },
            [Ym.error]: { type: Ym.error },
            [Ym.warning]: { type: Ym.warning },
            [Ym.info]: { type: Ym.info },
            [Ym.async]: {
              pauseOnHover: !1,
              closeOnClick: !1,
              timeout: 0,
              showProgressBar: !1,
              type: Ym.async,
            },
          },
        },
        lb = function (t) {
          return { "is-invalid": t };
        };
      let cb = (() => {
          class t {
            constructor(t) {
              (this.http = t), (this.model = {});
            }
            ngOnInit() {}
            onSubmit(t, e, n, i) {
              const r = new Tf({ "Content-Type": "application/json" });
              this.http
                .post(
                  "https://formspree.io/f/mwkwpzve",
                  { name: t, subject: e, replyto: n, message: i },
                  { headers: r }
                )
                .subscribe((t) => {
                  console.log(t);
                });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ea($f));
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["app-contact"]],
              decls: 58,
              vars: 16,
              consts: [
                ["id", "contact", 1, "section"],
                [
                  1,
                  "cc-contact-information",
                  2,
                  "background-image",
                  "url('assets/images/contact.jpg')",
                ],
                [1, "container"],
                [1, "cc-contact"],
                [1, "row"],
                [1, "col-md-9"],
                ["data-aos", "zoom-in", 1, "card", "mb-0"],
                [1, "h4", "text-center", "title"],
                [1, "col-md-6"],
                [1, "card-body"],
                ["name", "form", "novalidate", "", 3, "ngSubmit"],
                ["f", "ngForm"],
                [1, "p", "pb-3"],
                [1, "row", "mb-3"],
                [1, "col"],
                [1, "input-group"],
                [
                  "type",
                  "text",
                  "name",
                  "name",
                  "placeholder",
                  "Name",
                  "required",
                  "",
                  1,
                  "form-control",
                  3,
                  "ngModel",
                  "ngClass",
                  "ngModelChange",
                ],
                ["name", "", "name", "ngModel"],
                [1, "input-container"],
                [
                  "type",
                  "text",
                  "name",
                  "subject",
                  "placeholder",
                  "Subject",
                  "required",
                  "",
                  1,
                  "form-control",
                  3,
                  "ngModel",
                  "ngClass",
                  "ngModelChange",
                ],
                ["subject", "", "subject", "ngModel"],
                [
                  "type",
                  "text",
                  "name",
                  "email",
                  "placeholder",
                  "E-mail",
                  "pattern",
                  "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$",
                  "required",
                  "",
                  1,
                  "form-control",
                  3,
                  "ngModel",
                  "ngClass",
                  "ngModelChange",
                ],
                ["email", "", "email", "ngModel"],
                [1, "form-group"],
                [
                  "name",
                  "message",
                  "placeholder",
                  "Your Message",
                  "required",
                  "",
                  1,
                  "form-control",
                  3,
                  "ngModel",
                  "ngClass",
                  "ngModelChange",
                ],
                ["message", "", "message", "ngModel"],
                ["type", "submit", 1, "btn", "btn-primary", 3, "click"],
                [1, "mb-0"],
                [1, "pb-2"],
                [1, "material"],
              ],
              template: function (t, e) {
                if (1 & t) {
                  const t = la();
                  oa(0, "div", 0),
                    oa(1, "div", 1),
                    oa(2, "div", 2),
                    oa(3, "div", 3),
                    oa(4, "div", 4),
                    oa(5, "div", 5),
                    oa(6, "div", 6),
                    oa(7, "div", 7),
                    Da(8, "Contact Me"),
                    aa(),
                    oa(9, "div", 4),
                    oa(10, "div", 8),
                    oa(11, "div", 9),
                    oa(12, "form", 10, 11),
                    ha("ngSubmit", function () {
                      return Xe(t), ta(13).resetForm();
                    }),
                    oa(14, "div", 12),
                    oa(15, "strong"),
                    Da(16, "Feel free to contact me "),
                    aa(),
                    aa(),
                    oa(17, "div", 13),
                    oa(18, "div", 14),
                    oa(19, "div", 15),
                    oa(20, "input", 16, 17),
                    ha("ngModelChange", function (t) {
                      return (e.model.name = t);
                    }),
                    aa(),
                    aa(),
                    aa(),
                    aa(),
                    oa(23, "div", 13),
                    oa(24, "div", 14),
                    oa(25, "div", 18),
                    oa(26, "input", 19, 20),
                    ha("ngModelChange", function (t) {
                      return (e.model.subject = t);
                    }),
                    aa(),
                    aa(),
                    aa(),
                    aa(),
                    oa(29, "div", 13),
                    oa(30, "div", 14),
                    oa(31, "div", 15),
                    oa(32, "input", 21, 22),
                    ha("ngModelChange", function (t) {
                      return (e.model.email = t);
                    }),
                    aa(),
                    aa(),
                    aa(),
                    aa(),
                    oa(35, "div", 13),
                    oa(36, "div", 14),
                    oa(37, "div", 23),
                    oa(38, "textarea", 24, 25),
                    ha("ngModelChange", function (t) {
                      return (e.model.message = t);
                    }),
                    aa(),
                    aa(),
                    aa(),
                    aa(),
                    oa(41, "div", 4),
                    oa(42, "div", 14),
                    oa(43, "button", 26),
                    ha("click", function () {
                      Xe(t);
                      const n = ta(21),
                        i = ta(27),
                        r = ta(33),
                        o = ta(39);
                      return e.onSubmit(n.value, i.value, r.value, o.value);
                    }),
                    Da(44, " Send"),
                    aa(),
                    aa(),
                    aa(),
                    aa(),
                    aa(),
                    aa(),
                    oa(45, "div", 8),
                    oa(46, "div", 9),
                    oa(47, "p", 27),
                    oa(48, "strong"),
                    Da(49, "Phone"),
                    aa(),
                    aa(),
                    oa(50, "p", 28),
                    Da(51, "+91 8088041006"),
                    aa(),
                    oa(52, "p", 27),
                    oa(53, "strong"),
                    Da(54, "Email"),
                    aa(),
                    aa(),
                    oa(55, "p"),
                    Da(56, "punithraaj14@gmail.com"),
                    aa(),
                    aa(),
                    aa(),
                    aa(),
                    aa(),
                    aa(),
                    aa(),
                    aa(),
                    aa(),
                    aa(),
                    aa(),
                    sa(57, "ng-snotify", 29);
                }
                if (2 & t) {
                  const t = ta(13),
                    n = ta(21),
                    i = ta(27),
                    r = ta(33),
                    o = ta(39);
                  Zi(20),
                    ia("ngModel", e.model.name)(
                      "ngClass",
                      Ws(8, lb, t.submitted && n.invalid)
                    ),
                    Zi(6),
                    ia("ngModel", e.model.subject)(
                      "ngClass",
                      Ws(10, lb, t.submitted && i.invalid)
                    ),
                    Zi(6),
                    ia("ngModel", e.model.email)(
                      "ngClass",
                      Ws(12, lb, t.submitted && r.invalid)
                    ),
                    Zi(6),
                    ia("ngModel", e.model.message)(
                      "ngClass",
                      Ws(14, lb, t.submitted && o.invalid)
                    );
                }
              },
              directives: [gm, wg, am, dg, _m, yg, fm, Sc, wm, eb],
              styles: [""],
            })),
            t
          );
        })(),
        ub = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["app-footer"]],
              decls: 13,
              vars: 0,
              consts: [
                [1, "footer"],
                [1, "container", "text-center"],
                [
                  "href",
                  "https://www.facebook.com/roaring.raaj/",
                  "target",
                  "_blank",
                  1,
                  "cc-facebook",
                  "btn",
                  "btn-link",
                ],
                ["aria-hidden", "true", 1, "fa", "fa-facebook", "fa-2x"],
                [
                  "href",
                  "https://www.instagram.com/roaring_raaj/",
                  "target",
                  "_blank",
                  1,
                  "cc-instagram",
                  "btn",
                  "btn-link",
                ],
                ["aria-hidden", "true", 1, "fa", "fa-instagram", "fa-2x"],
                [
                  "href",
                  "https://twitter.com/roaringraaj",
                  "target",
                  "_blank",
                  1,
                  "cc-twitter",
                  "btn",
                  "btn-link",
                ],
                ["aria-hidden", "true", 1, "fa", "fa-twitter", "fa-2x"],
                [
                  "href",
                  "https://github.com/punithraj14",
                  "target",
                  "_blank",
                  1,
                  "cc-github",
                  "btn",
                  "btn-link",
                ],
                ["aria-hidden", "true", 1, "fa", "fa-github", "fa-2x"],
                [1, "text-center", "text-muted"],
              ],
              template: function (t, e) {
                1 & t &&
                  (oa(0, "footer", 0),
                  oa(1, "div", 1),
                  oa(2, "a", 2),
                  sa(3, "i", 3),
                  aa(),
                  oa(4, "a", 4),
                  sa(5, "i", 5),
                  aa(),
                  oa(6, "a", 6),
                  sa(7, "i", 7),
                  aa(),
                  oa(8, "a", 8),
                  sa(9, "i", 9),
                  aa(),
                  aa(),
                  oa(10, "div", 10),
                  oa(11, "p"),
                  Da(12, "\xa9 All rights reserved."),
                  aa(),
                  aa(),
                  aa());
              },
              styles: [""],
            })),
            t
          );
        })(),
        hb = (() => {
          class t {
            constructor(t) {
              this.spinner = t;
            }
            ngOnInit() {
              this.spinner.show(),
                setTimeout(() => {
                  this.spinner.hide();
                }, 2e3);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ea(yf));
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["app-profile"]],
              decls: 10,
              vars: 0,
              consts: [
                [1, "page-content"],
                [
                  "bdColor",
                  "rgba(255,255,255,1)",
                  "size",
                  "medium",
                  "color",
                  "#033d5b",
                  "type",
                  "ball-spin-clockwise",
                ],
              ],
              template: function (t, e) {
                1 & t &&
                  (sa(0, "app-header"),
                  oa(1, "div", 0),
                  sa(2, "app-intro"),
                  sa(3, "app-about"),
                  sa(4, "app-experience"),
                  sa(5, "app-skills"),
                  sa(6, "app-education"),
                  sa(7, "app-contact"),
                  aa(),
                  sa(8, "app-footer"),
                  sa(9, "ngx-spinner", 1));
              },
              directives: [vf, xf, Of, kf, Pf, Mf, cb, ub, wf],
              styles: [""],
            })),
            t
          );
        })(),
        db = (() => {
          class t {}
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [{ provide: "SnotifyToastConfig", useValue: sb }, Qm],
              imports: [[jc, xm, ab, xm, Om, Cf]],
            })),
            t
          );
        })();
      const pb = [{ path: "", component: hb }],
        fb = { useHash: !0 };
      let gb = (() => {
        class t {}
        return (
          (t.ɵmod = ge({ type: t, bootstrap: [Yp] })),
          (t.ɵinj = ut({
            factory: function (e) {
              return new (e || t)();
            },
            providers: [],
            imports: [[pu, xm, Om, Vp.forRoot(pb, fb), db, og]],
          })),
          t
        );
      })();
      (function () {
        if (li)
          throw new Error("Cannot enable prod mode after platform setup.");
        si = !1;
      })(),
        hu()
          .bootstrapModule(gb)
          .catch((t) => console.error(t));
    },
    zn8P: function (t, e) {
      function n(t) {
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = "MODULE_NOT_FOUND"), e);
        });
      }
      (n.keys = function () {
        return [];
      }),
        (n.resolve = n),
        (t.exports = n),
        (n.id = "zn8P");
    },
  },
  [[0, 0]],
]);