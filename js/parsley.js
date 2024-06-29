/*!
 * Parsley.js
 * Version 2.8.0 - built Wed, Sep 13th 2017, 11:04 pm
 * http://parsleyjs.org
 * Guillaume Potier - <guillaume@wisembly.com>
 * Marc-Andre Lafortune - <petroselinum@marc-andre.ca>
 * MIT Licensed
 */
function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
        return i
    }
    return Array.from(e)
}
var _slice = Array.prototype.slice,
    _slicedToArray = function() {
        function e(e, t) {
            var i = [],
                n = !0,
                r = !1,
                s = void 0;
            try {
                for (var a, o = e[Symbol.iterator](); !(n = (a = o.next()).done) && (i.push(a.value), !t || i.length !== t); n = !0);
            } catch (l) {
                r = !0, s = l
            } finally {
                try {
                    !n && o["return"] && o["return"]()
                } finally {
                    if (r) throw s
                }
            }
            return i
        }
        return function(t, i) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, i);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }(),
    _extends = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var i = arguments[t];
            for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
        }
        return e
    };
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], t) : e.parsley = t(e.jQuery)
}(this, function(e) {
    "use strict";

    function t(e, t) {
        return e.parsleyAdaptedCallback || (e.parsleyAdaptedCallback = function() {
            var i = Array.prototype.slice.call(arguments, 0);
            i.unshift(this), e.apply(t || M, i)
        }), e.parsleyAdaptedCallback
    }

    function i(e) {
        return 0 === e.lastIndexOf(D, 0) ? e.substr(D.length) : e
    }
    /**
     * inputevent - Alleviate browser bugs for input events
     * https://github.com/marcandre/inputevent
     * @version v0.0.3 - (built Thu, Apr 14th 2016, 5:58 pm)
     * @author Marc-Andre Lafortune <github@marc-andre.ca>
     * @license MIT
     */
    function n() {
        var t = this,
            i = window || global;
        _extends(this, {
            isNativeEvent: function(e) {
                return e.originalEvent && e.originalEvent.isTrusted !== !1
            },
            fakeInputEvent: function(i) {
                t.isNativeEvent(i) && e(i.target).trigger("input")
            },
            misbehaves: function(i) {
                t.isNativeEvent(i) && (t.behavesOk(i), e(document).on("change.inputevent", i.data.selector, t.fakeInputEvent), t.fakeInputEvent(i))
            },
            behavesOk: function(i) {
                t.isNativeEvent(i) && e(document).off("input.inputevent", i.data.selector, t.behavesOk).off("change.inputevent", i.data.selector, t.misbehaves)
            },
            install: function() {
                if (!i.inputEventPatched) {
                    i.inputEventPatched = "0.0.3";
                    for (var n = ["select", 'input[type="checkbox"]', 'input[type="radio"]', 'input[type="file"]'], r = 0; r < n.length; r++) {
                        var s = n[r];
                        e(document).on("input.inputevent", s, {
                            selector: s
                        }, t.behavesOk).on("change.inputevent", s, {
                            selector: s
                        }, t.misbehaves)
                    }
                }
            },
            uninstall: function() {
                delete i.inputEventPatched, e(document).off(".inputevent")
            }
        })
    }
    var r = 1,
        s = {},
        a = {
            attr: function(e, t, i) {
                var n, r, s, a = new RegExp("^" + t, "i");
                if ("undefined" == typeof i) i = {};
                else
                    for (n in i) i.hasOwnProperty(n) && delete i[n];
                if (!e) return i;
                for (s = e.attributes, n = s.length; n--;) r = s[n], r && r.specified && a.test(r.name) && (i[this.camelize(r.name.slice(t.length))] = this.deserializeValue(r.value));
                return i
            },
            checkAttr: function(e, t, i) {
                return e.hasAttribute(t + i)
            },
            setAttr: function(e, t, i, n) {
                e.setAttribute(this.dasherize(t + i), String(n))
            },
            getType: function(e) {
                return e.getAttribute("type") || "text"
            },
            generateID: function() {
                return "" + r++
            },
            deserializeValue: function(e) {
                var t;
                try {
                    return e ? "true" == e || "false" != e && ("null" == e ? null : isNaN(t = Number(e)) ? /^[\[\{]/.test(e) ? JSON.parse(e) : e : t) : e
                } catch (i) {
                    return e
                }
            },
            camelize: function(e) {
                return e.replace(/-+(.)?/g, function(e, t) {
                    return t ? t.toUpperCase() : ""
                })
            },
            dasherize: function(e) {
                return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
            },
            warn: function() {
                var e;
                window.console && "function" == typeof window.console.warn && (e = window.console).warn.apply(e, arguments)
            },
            warnOnce: function(e) {
                s[e] || (s[e] = !0, this.warn.apply(this, arguments))
            },
            _resetWarnings: function() {
                s = {}
            },
            trimString: function(e) {
                return e.replace(/^\s+|\s+$/g, "")
            },
            parse: {
                date: function S(e) {
                    var t = e.match(/^(\d{4,})-(\d\d)-(\d\d)$/);
                    if (!t) return null;
                    var i = t.map(function(e) {
                            return parseInt(e, 10)
                        }),
                        n = _slicedToArray(i, 4),
                        r = (n[0], n[1]),
                        s = n[2],
                        a = n[3],
                        S = new Date(r, s - 1, a);
                    return S.getFullYear() !== r || S.getMonth() + 1 !== s || S.getDate() !== a ? null : S
                },
                string: function(e) {
                    return e
                },
                integer: function(e) {
                    return isNaN(e) ? null : parseInt(e, 10)
                },
                number: function(e) {
                    if (isNaN(e)) throw null;
                    return parseFloat(e)
                },
                "boolean": function(e) {
                    return !/^\s*false\s*$/i.test(e)
                },
                object: function(e) {
                    return a.deserializeValue(e)
                },
                regexp: function(e) {
                    var t = "";
                    return /^\/.*\/(?:[gimy]*)$/.test(e) ? (t = e.replace(/.*\/([gimy]*)$/, "$1"), e = e.replace(new RegExp("^/(.*?)/" + t + "$"), "$1")) : e = "^" + e + "$", new RegExp(e, t)
                }
            },
            parseRequirement: function(e, t) {
                var i = this.parse[e || "string"];
                if (!i) throw 'Unknown requirement specification: "' + e + '"';
                var n = i(t);
                if (null === n) throw "Requirement is not a " + e + ': "' + t + '"';
                return n
            },
            namespaceEvents: function(t, i) {
                return t = this.trimString(t || "").split(/\s+/), t[0] ? e.map(t, function(e) {
                    return e + "." + i
                }).join(" ") : ""
            },
            difference: function(t, i) {
                var n = [];
                return e.each(t, function(e, t) {
                    i.indexOf(t) == -1 && n.push(t)
                }), n
            },
            all: function(t) {
                return e.when.apply(e, _toConsumableArray(t).concat([42, 42]))
            },
            objectCreate: Object.create || function() {
                var e = function() {};
                return function(t) {
                    if (arguments.length > 1) throw Error("Second argument not supported");
                    if ("object" != typeof t) throw TypeError("Argument must be an object");
                    e.prototype = t;
                    var i = new e;
                    return e.prototype = null, i
                }
            }(),
            _SubmitSelector: 'input[type="submit"], button:submit'
        },
        o = {
            namespace: "data-parsley-",
            inputs: "input, textarea, select",
            excluded: "input[type=button], input[type=submit], input[type=reset], input[type=hidden]",
            priorityEnabled: !0,
            multiple: null,
            group: null,
            uiEnabled: !0,
            validationThreshold: 3,
            focus: "first",
            trigger: !1,
            triggerAfterFailure: "input",
            errorClass: "parsley-error",
            successClass: "parsley-success",
            classHandler: function(e) {},
            errorsContainer: function(e) {},
            errorsWrapper: '<ul class="parsley-errors-list"></ul>',
            errorTemplate: "<li></li>"
        },
        l = function() {
            this.__id__ = a.generateID()
        };
    l.prototype = {
        asyncSupport: !0,
        _pipeAccordingToValidationResult: function() {
            var t = this,
                i = function() {
                    var i = e.Deferred();
                    return !0 !== t.validationResult && i.reject(), i.resolve().promise()
                };
            return [i, i]
        },
        actualizeOptions: function() {
            return a.attr(this.element, this.options.namespace, this.domOptions), this.parent && this.parent.actualizeOptions && this.parent.actualizeOptions(), this
        },
        _resetOptions: function(e) {
            this.domOptions = a.objectCreate(this.parent.options), this.options = a.objectCreate(this.domOptions);
            for (var t in e) e.hasOwnProperty(t) && (this.options[t] = e[t]);
            this.actualizeOptions()
        },
        _listeners: null,
        on: function(e, t) {
            this._listeners = this._listeners || {};
            var i = this._listeners[e] = this._listeners[e] || [];
            return i.push(t), this
        },
        subscribe: function(t, i) {
            e.listenTo(this, t.toLowerCase(), i)
        },
        off: function(e, t) {
            var i = this._listeners && this._listeners[e];
            if (i)
                if (t)
                    for (var n = i.length; n--;) i[n] === t && i.splice(n, 1);
                else delete this._listeners[e];
            return this
        },
        unsubscribe: function(t, i) {
            e.unsubscribeTo(this, t.toLowerCase())
        },
        trigger: function(e, t, i) {
            t = t || this;
            var n, r = this._listeners && this._listeners[e];
            if (r)
                for (var s = r.length; s--;)
                    if (n = r[s].call(t, t, i), n === !1) return n;
            return !this.parent || this.parent.trigger(e, t, i)
        },
        asyncIsValid: function(e, t) {
            return a.warnOnce("asyncIsValid is deprecated; please use whenValid instead"), this.whenValid({
                group: e,
                force: t
            })
        },
        _findRelated: function() {
            return this.options.multiple ? e(this.parent.element.querySelectorAll("[" + this.options.namespace + 'multiple="' + this.options.multiple + '"]')) : this.$element
        }
    };
    var u = function(e, t) {
            var i = e.match(/^\s*\[(.*)\]\s*$/);
            if (!i) throw 'Requirement is not an array: "' + e + '"';
            var n = i[1].split(",").map(a.trimString);
            if (n.length !== t) throw "Requirement has " + n.length + " values when " + t + " are needed";
            return n
        },
        d = function(e, t, i) {
            var n = null,
                r = {};
            for (var s in e)
                if (s) {
                    var o = i(s);
                    "string" == typeof o && (o = a.parseRequirement(e[s], o)), r[s] = o
                } else n = a.parseRequirement(e[s], t);
            return [n, r]
        },
        h = function(t) {
            e.extend(!0, this, t)
        };
    h.prototype = {
        validate: function(e, t) {
            if (this.fn) return arguments.length > 3 && (t = [].slice.call(arguments, 1, -1)), this.fn(e, t);
            if (Array.isArray(e)) {
                if (!this.validateMultiple) throw "Validator `" + this.name + "` does not handle multiple values";
                return this.validateMultiple.apply(this, arguments)
            }
            var i = arguments[arguments.length - 1];
            if (this.validateDate && i._isDateInput()) return arguments[0] = a.parse.date(arguments[0]), null !== arguments[0] && this.validateDate.apply(this, arguments);
            if (this.validateNumber) return !isNaN(e) && (arguments[0] = parseFloat(arguments[0]), this.validateNumber.apply(this, arguments));
            if (this.validateString) return this.validateString.apply(this, arguments);
            throw "Validator `" + this.name + "` only handles multiple values"
        },
        parseRequirements: function(t, i) {
            if ("string" != typeof t) return Array.isArray(t) ? t : [t];
            var n = this.requirementType;
            if (Array.isArray(n)) {
                for (var r = u(t, n.length), s = 0; s < r.length; s++) r[s] = a.parseRequirement(n[s], r[s]);
                return r
            }
            return e.isPlainObject(n) ? d(n, t, i) : [a.parseRequirement(n, t)]
        },
        requirementType: "string",
        priority: 2
    };
    var p = function(e, t) {
            this.__class__ = "ValidatorRegistry", this.locale = "en", this.init(e || {}, t || {})
        },
        c = {
            email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
            number: /^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,
            integer: /^-?\d+$/,
            digits: /^\d+$/,
            alphanum: /^\w+$/i,
            date: {
                test: function(e) {
                    return null !== a.parse.date(e)
                }
            },
            url: new RegExp("^(?:(?:https?|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$", "i")
        };
    c.range = c.number;
    var f = function(e) {
            var t = ("" + e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
            return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0
        },
        m = function(e, t) {
            return t.map(a.parse[e])
        },
        g = function(e, t) {
            return function(i) {
                for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++) r[s - 1] = arguments[s];
                return r.pop(), t.apply(void 0, [i].concat(_toConsumableArray(m(e, r))))
            }
        },
        v = function(e) {
            return {
                validateDate: g("date", e),
                validateNumber: g("number", e),
                requirementType: e.length <= 2 ? "string" : ["string", "string"],
                priority: 30
            }
        };
    p.prototype = {
        init: function(e, t) {
            this.catalog = t, this.validators = _extends({}, this.validators);
            for (var i in e) this.addValidator(i, e[i].fn, e[i].priority);
            window.Parsley.trigger("parsley:validator:init")
        },
        setLocale: function(e) {
            if ("undefined" == typeof this.catalog[e]) throw new Error(e + " is not available in the catalog");
            return this.locale = e, this
        },
        addCatalog: function(e, t, i) {
            return "object" == typeof t && (this.catalog[e] = t), !0 === i ? this.setLocale(e) : this
        },
        addMessage: function(e, t, i) {
            return "undefined" == typeof this.catalog[e] && (this.catalog[e] = {}), this.catalog[e][t] = i, this
        },
        addMessages: function(e, t) {
            for (var i in t) this.addMessage(e, i, t[i]);
            return this
        },
        addValidator: function(e, t, i) {
            if (this.validators[e]) a.warn('Validator "' + e + '" is already defined.');
            else if (o.hasOwnProperty(e)) return void a.warn('"' + e + '" is a restricted keyword and is not a valid validator name.');
            return this._setValidator.apply(this, arguments)
        },
        hasValidator: function(e) {
            return !!this.validators[e]
        },
        updateValidator: function(e, t, i) {
            return this.validators[e] ? this._setValidator.apply(this, arguments) : (a.warn('Validator "' + e + '" is not already defined.'), this.addValidator.apply(this, arguments))
        },
        removeValidator: function(e) {
            return this.validators[e] || a.warn('Validator "' + e + '" is not defined.'), delete this.validators[e], this
        },
        _setValidator: function(e, t, i) {
            "object" != typeof t && (t = {
                fn: t,
                priority: i
            }), t.validate || (t = new h(t)), this.validators[e] = t;
            for (var n in t.messages || {}) this.addMessage(n, e, t.messages[n]);
            return this
        },
        getErrorMessage: function(e) {
            var t;
            if ("type" === e.name) {
                var i = this.catalog[this.locale][e.name] || {};
                t = i[e.requirements]
            } else t = this.formatMessage(this.catalog[this.locale][e.name], e.requirements);
            return t || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage
        },
        formatMessage: function(e, t) {
            if ("object" == typeof t) {
                for (var i in t) e = this.formatMessage(e, t[i]);
                return e
            }
            return "string" == typeof e ? e.replace(/%s/i, t) : ""
        },
        validators: {
            notblank: {
                validateString: function(e) {
                    return /\S/.test(e)
                },
                priority: 2
            },
            required: {
                validateMultiple: function(e) {
                    return e.length > 0
                },
                validateString: function(e) {
                    return /\S/.test(e)
                },
                priority: 512
            },
            type: {
                validateString: function(e, t) {
                    var i = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
                        n = i.step,
                        r = void 0 === n ? "any" : n,
                        s = i.base,
                        a = void 0 === s ? 0 : s,
                        o = c[t];
                    if (!o) throw new Error("validator type `" + t + "` is not supported");
                    if (!o.test(e)) return !1;
                    if ("number" === t && !/^any$/i.test(r || "")) {
                        var l = Number(e),
                            u = Math.max(f(r), f(a));
                        if (f(l) > u) return !1;
                        var d = function(e) {
                            return Math.round(e * Math.pow(10, u))
                        };
                        if ((d(l) - d(a)) % d(r) != 0) return !1
                    }
                    return !0
                },
                requirementType: {
                    "": "string",
                    step: "string",
                    base: "number"
                },
                priority: 256
            },
            pattern: {
                validateString: function(e, t) {
                    return t.test(e)
                },
                requirementType: "regexp",
                priority: 64
            },
            minlength: {
                validateString: function(e, t) {
                    return e.length >= t
                },
                requirementType: "integer",
                priority: 30
            },
            maxlength: {
                validateString: function(e, t) {
                    return e.length <= t
                },
                requirementType: "integer",
                priority: 30
            },
            length: {
                validateString: function(e, t, i) {
                    return e.length >= t && e.length <= i
                },
                requirementType: ["integer", "integer"],
                priority: 30
            },
            mincheck: {
                validateMultiple: function(e, t) {
                    return e.length >= t
                },
                requirementType: "integer",
                priority: 30
            },
            maxcheck: {
                validateMultiple: function(e, t) {
                    return e.length <= t
                },
                requirementType: "integer",
                priority: 30
            },
            check: {
                validateMultiple: function(e, t, i) {
                    return e.length >= t && e.length <= i
                },
                requirementType: ["integer", "integer"],
                priority: 30
            },
            min: v(function(e, t) {
                return e >= t
            }),
            max: v(function(e, t) {
                return e <= t
            }),
            range: v(function(e, t, i) {
                return e >= t && e <= i
            }),
            equalto: {
                validateString: function(t, i) {
                    var n = e(i);
                    return n.length ? t === n.val() : t === i
                },
                priority: 256
            }
        }
    };
    var y = {},
        _ = function k(e, t, i) {
            for (var n = [], r = [], s = 0; s < e.length; s++) {
                for (var a = !1, o = 0; o < t.length; o++)
                    if (e[s].assert.name === t[o].assert.name) {
                        a = !0;
                        break
                    }
                a ? r.push(e[s]) : n.push(e[s])
            }
            return {
                kept: r,
                added: n,
                removed: i ? [] : k(t, e, !0).added
            }
        };
    y.Form = {
        _actualizeTriggers: function() {
            var e = this;
            this.$element.on("submit.Parsley", function(t) {
                e.onSubmitValidate(t)
            }), this.$element.on("click.Parsley", a._SubmitSelector, function(t) {
                e.onSubmitButton(t)
            }), !1 !== this.options.uiEnabled && this.element.setAttribute("novalidate", "")
        },
        focus: function() {
            if (this._focusedField = null, !0 === this.validationResult || "none" === this.options.focus) return null;
            for (var e = 0; e < this.fields.length; e++) {
                var t = this.fields[e];
                if (!0 !== t.validationResult && t.validationResult.length > 0 && "undefined" == typeof t.options.noFocus && (this._focusedField = t.$element, "first" === this.options.focus)) break
            }
            return null === this._focusedField ? null : this._focusedField.focus()
        },
        _destroyUI: function() {
            this.$element.off(".Parsley")
        }
    }, y.Field = {
        _reflowUI: function() {
            if (this._buildUI(), this._ui) {
                var e = _(this.validationResult, this._ui.lastValidationResult);
                this._ui.lastValidationResult = this.validationResult, this._manageStatusClass(), this._manageErrorsMessages(e), this._actualizeTriggers(), !e.kept.length && !e.added.length || this._failedOnce || (this._failedOnce = !0, this._actualizeTriggers())
            }
        },
        getErrorsMessages: function() {
            if (!0 === this.validationResult) return [];
            for (var e = [], t = 0; t < this.validationResult.length; t++) e.push(this.validationResult[t].errorMessage || this._getErrorMessage(this.validationResult[t].assert));
            return e
        },
        addError: function(e) {
            var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                i = t.message,
                n = t.assert,
                r = t.updateClass,
                s = void 0 === r || r;
            this._buildUI(), this._addError(e, {
                message: i,
                assert: n
            }), s && this._errorClass()
        },
        updateError: function(e) {
            var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                i = t.message,
                n = t.assert,
                r = t.updateClass,
                s = void 0 === r || r;
            this._buildUI(), this._updateError(e, {
                message: i,
                assert: n
            }), s && this._errorClass()
        },
        removeError: function(e) {
            var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                i = t.updateClass,
                n = void 0 === i || i;
            this._buildUI(), this._removeError(e), n && this._manageStatusClass()
        },
        _manageStatusClass: function() {
            this.hasConstraints() && this.needsValidation() && !0 === this.validationResult ? this._successClass() : this.validationResult.length > 0 ? this._errorClass() : this._resetClass()
        },
        _manageErrorsMessages: function(t) {
            if ("undefined" == typeof this.options.errorsMessagesDisabled) {
                if ("undefined" != typeof this.options.errorMessage) return t.added.length || t.kept.length ? (this._insertErrorWrapper(), 0 === this._ui.$errorsWrapper.find(".parsley-custom-error-message").length && this._ui.$errorsWrapper.append(e(this.options.errorTemplate).addClass("parsley-custom-error-message")), this._ui.$errorsWrapper.addClass("filled").find(".parsley-custom-error-message").html(this.options.errorMessage)) : this._ui.$errorsWrapper.removeClass("filled").find(".parsley-custom-error-message").remove();
                for (var i = 0; i < t.removed.length; i++) this._removeError(t.removed[i].assert.name);
                for (i = 0; i < t.added.length; i++) this._addError(t.added[i].assert.name, {
                    message: t.added[i].errorMessage,
                    assert: t.added[i].assert
                });
                for (i = 0; i < t.kept.length; i++) this._updateError(t.kept[i].assert.name, {
                    message: t.kept[i].errorMessage,
                    assert: t.kept[i].assert
                })
            }
        },
        _addError: function(t, i) {
            var n = i.message,
                r = i.assert;
            this._insertErrorWrapper(), this._ui.$errorsWrapper.addClass("filled").append(e(this.options.errorTemplate).addClass("parsley-" + t).html(n || this._getErrorMessage(r)))
        },
        _updateError: function(e, t) {
            var i = t.message,
                n = t.assert;
            this._ui.$errorsWrapper.addClass("filled").find(".parsley-" + e).html(i || this._getErrorMessage(n))
        },
        _removeError: function(e) {
            this._ui.$errorsWrapper.removeClass("filled").find(".parsley-" + e).remove()
        },
        _getErrorMessage: function(e) {
            var t = e.name + "Message";
            return "undefined" != typeof this.options[t] ? window.Parsley.formatMessage(this.options[t], e.requirements) : window.Parsley.getErrorMessage(e)
        },
        _buildUI: function() {
            if (!this._ui && !1 !== this.options.uiEnabled) {
                var t = {};
                this.element.setAttribute(this.options.namespace + "id", this.__id__), t.$errorClassHandler = this._manageClassHandler(), t.errorsWrapperId = "parsley-id-" + (this.options.multiple ? "multiple-" + this.options.multiple : this.__id__), t.$errorsWrapper = e(this.options.errorsWrapper).attr("id", t.errorsWrapperId), t.lastValidationResult = [], t.validationInformationVisible = !1, this._ui = t
            }
        },
        _manageClassHandler: function() {
            if ("string" == typeof this.options.classHandler && e(this.options.classHandler).length) return e(this.options.classHandler);
            var t = this.options.classHandler;
            if ("string" == typeof this.options.classHandler && "function" == typeof window[this.options.classHandler] && (t = window[this.options.classHandler]), "function" == typeof t) {
                var i = t.call(this, this);
                if ("undefined" != typeof i && i.length) return i
            } else {
                if ("object" == typeof t && t instanceof jQuery && t.length) return t;
                t && a.warn("The class handler `" + t + "` does not exist in DOM nor as a global JS function")
            }
            return this._inputHolder()
        },
        _inputHolder: function() {
            return this.options.multiple && "SELECT" !== this.element.nodeName ? this.$element.parent() : this.$element
        },
        _insertErrorWrapper: function() {
            var t = this.options.errorsContainer;
            if (0 !== this._ui.$errorsWrapper.parent().length) return this._ui.$errorsWrapper.parent();
            if ("string" == typeof t) {
                if (e(t).length) return e(t).append(this._ui.$errorsWrapper);
                "function" == typeof window[t] ? t = window[t] : a.warn("The errors container `" + t + "` does not exist in DOM nor as a global JS function")
            }
            return "function" == typeof t && (t = t.call(this, this)), "object" == typeof t && t.length ? t.append(this._ui.$errorsWrapper) : this._inputHolder().after(this._ui.$errorsWrapper)
        },
        _actualizeTriggers: function() {
            var e, t = this,
                i = this._findRelated();
            i.off(".Parsley"), this._failedOnce ? i.on(a.namespaceEvents(this.options.triggerAfterFailure, "Parsley"), function() {
                t._validateIfNeeded()
            }) : (e = a.namespaceEvents(this.options.trigger, "Parsley")) && i.on(e, function(e) {
                t._validateIfNeeded(e)
            })
        },
        _validateIfNeeded: function(e) {
            var t = this;
            e && /key|input/.test(e.type) && (!this._ui || !this._ui.validationInformationVisible) && this.getValue().length <= this.options.validationThreshold || (this.options.debounce ? (window.clearTimeout(this._debounced), this._debounced = window.setTimeout(function() {
                return t.validate()
            }, this.options.debounce)) : this.validate())
        },
        _resetUI: function() {
            this._failedOnce = !1, this._actualizeTriggers(), "undefined" != typeof this._ui && (this._ui.$errorsWrapper.removeClass("filled").children().remove(), this._resetClass(), this._ui.lastValidationResult = [], this._ui.validationInformationVisible = !1)
        },
        _destroyUI: function() {
            this._resetUI(), "undefined" != typeof this._ui && this._ui.$errorsWrapper.remove(), delete this._ui
        },
        _successClass: function() {
            this._ui.validationInformationVisible = !0, this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass)
        },
        _errorClass: function() {
            this._ui.validationInformationVisible = !0, this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass)
        },
        _resetClass: function() {
            this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass)
        }
    };
    var w = function(t, i, n) {
            this.__class__ = "Form", this.element = t, this.$element = e(t), this.domOptions = i, this.options = n, this.parent = window.Parsley, this.fields = [], this.validationResult = null
        },
        b = {
            pending: null,
            resolved: !0,
            rejected: !1
        };
    w.prototype = {
        onSubmitValidate: function(e) {
            var t = this;
            if (!0 !== e.parsley) {
                var i = this._submitSource || this.$element.find(a._SubmitSelector)[0];
                if (this._submitSource = null, this.$element.find(".parsley-synthetic-submit-button").prop("disabled", !0), !i || null === i.getAttribute("formnovalidate")) {
                    window.Parsley._remoteCache = {};
                    var n = this.whenValidate({
                        event: e
                    });
                    "resolved" === n.state() && !1 !== this._trigger("submit") || (e.stopImmediatePropagation(), e.preventDefault(), "pending" === n.state() && n.done(function() {
                        t._submit(i)
                    }))
                }
            }
        },
        onSubmitButton: function(e) {
            this._submitSource = e.currentTarget
        },
        _submit: function(t) {
            if (!1 !== this._trigger("submit")) {
                if (t) {
                    var i = this.$element.find(".parsley-synthetic-submit-button").prop("disabled", !1);
                    0 === i.length && (i = e('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element)), i.attr({
                        name: t.getAttribute("name"),
                        value: t.getAttribute("value")
                    })
                }
                this.$element.trigger(_extends(e.Event("submit"), {
                    parsley: !0
                }))
            }
        },
        validate: function(t) {
            if (arguments.length >= 1 && !e.isPlainObject(t)) {
                a.warnOnce("Calling validate on a parsley form without passing arguments as an object is deprecated.");
                var i = _slice.call(arguments),
                    n = i[0],
                    r = i[1],
                    s = i[2];
                t = {
                    group: n,
                    force: r,
                    event: s
                }
            }
            return b[this.whenValidate(t).state()]
        },
        whenValidate: function() {
            var t, i = this,
                n = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                r = n.group,
                s = n.force,
                o = n.event;
            this.submitEvent = o, o && (this.submitEvent = _extends({}, o, {
                preventDefault: function() {
                    a.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`"), i.validationResult = !1
                }
            })), this.validationResult = !0, this._trigger("validate"), this._refreshFields();
            var l = this._withoutReactualizingFormOptions(function() {
                return e.map(i.fields, function(e) {
                    return e.whenValidate({
                        force: s,
                        group: r
                    })
                })
            });
            return (t = a.all(l).done(function() {
                i._trigger("success")
            }).fail(function() {
                i.validationResult = !1, i.focus(), i._trigger("error")
            }).always(function() {
                i._trigger("validated")
            })).pipe.apply(t, _toConsumableArray(this._pipeAccordingToValidationResult()))
        },
        isValid: function(t) {
            if (arguments.length >= 1 && !e.isPlainObject(t)) {
                a.warnOnce("Calling isValid on a parsley form without passing arguments as an object is deprecated.");
                var i = _slice.call(arguments),
                    n = i[0],
                    r = i[1];
                t = {
                    group: n,
                    force: r
                }
            }
            return b[this.whenValid(t).state()]
        },
        whenValid: function() {
            var t = this,
                i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                n = i.group,
                r = i.force;
            this._refreshFields();
            var s = this._withoutReactualizingFormOptions(function() {
                return e.map(t.fields, function(e) {
                    return e.whenValid({
                        group: n,
                        force: r
                    })
                })
            });
            return a.all(s)
        },
        refresh: function() {
            return this._refreshFields(), this
        },
        reset: function() {
            for (var e = 0; e < this.fields.length; e++) this.fields[e].reset();
            this._trigger("reset")
        },
        destroy: function() {
            this._destroyUI();
            for (var e = 0; e < this.fields.length; e++) this.fields[e].destroy();
            this.$element.removeData("Parsley"), this._trigger("destroy")
        },
        _refreshFields: function() {
            return this.actualizeOptions()._bindFields()
        },
        _bindFields: function() {
            var t = this,
                i = this.fields;
            return this.fields = [], this.fieldsMappedById = {}, this._withoutReactualizingFormOptions(function() {
                t.$element.find(t.options.inputs).not(t.options.excluded).each(function(e, i) {
                    var n = new window.Parsley.Factory(i, {}, t);
                    if (("Field" === n.__class__ || "FieldMultiple" === n.__class__) && !0 !== n.options.excluded) {
                        var r = n.__class__ + "-" + n.__id__;
                        "undefined" == typeof t.fieldsMappedById[r] && (t.fieldsMappedById[r] = n, t.fields.push(n))
                    }
                }), e.each(a.difference(i, t.fields), function(e, t) {
                    t.reset()
                })
            }), this
        },
        _withoutReactualizingFormOptions: function(e) {
            var t = this.actualizeOptions;
            this.actualizeOptions = function() {
                return this
            };
            var i = e();
            return this.actualizeOptions = t, i
        },
        _trigger: function(e) {
            return this.trigger("form:" + e)
        }
    };
    var F = function(e, t, i, n, r) {
            var s = window.Parsley._validatorRegistry.validators[t],
                a = new h(s);
            n = n || e.options[t + "Priority"] || a.priority, r = !0 === r, _extends(this, {
                validator: a,
                name: t,
                requirements: i,
                priority: n,
                isDomConstraint: r
            }), this._parseRequirements(e.options)
        },
        C = function(e) {
            var t = e[0].toUpperCase();
            return t + e.slice(1)
        };
    F.prototype = {
        validate: function(e, t) {
            var i;
            return (i = this.validator).validate.apply(i, [e].concat(_toConsumableArray(this.requirementList), [t]))
        },
        _parseRequirements: function(e) {
            var t = this;
            this.requirementList = this.validator.parseRequirements(this.requirements, function(i) {
                return e[t.name + C(i)]
            })
        }
    };
    var E = function(t, i, n, r) {
            this.__class__ = "Field", this.element = t, this.$element = e(t), "undefined" != typeof r && (this.parent = r), this.options = n, this.domOptions = i, this.constraints = [], this.constraintsByName = {}, this.validationResult = !0, this._bindConstraints()
        },
        A = {
            pending: null,
            resolved: !0,
            rejected: !1
        };
    E.prototype = {
        validate: function(t) {
            arguments.length >= 1 && !e.isPlainObject(t) && (a.warnOnce("Calling validate on a parsley field without passing arguments as an object is deprecated."), t = {
                options: t
            });
            var i = this.whenValidate(t);
            if (!i) return !0;
            switch (i.state()) {
                case "pending":
                    return null;
                case "resolved":
                    return !0;
                case "rejected":
                    return this.validationResult
            }
        },
        whenValidate: function() {
            var e, t = this,
                i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                n = i.force,
                r = i.group;
            if (this.refresh(), !r || this._isInGroup(r)) return this.value = this.getValue(), this._trigger("validate"), (e = this.whenValid({
                force: n,
                value: this.value,
                _refreshed: !0
            }).always(function() {
                t._reflowUI()
            }).done(function() {
                t._trigger("success")
            }).fail(function() {
                t._trigger("error")
            }).always(function() {
                t._trigger("validated")
            })).pipe.apply(e, _toConsumableArray(this._pipeAccordingToValidationResult()))
        },
        hasConstraints: function() {
            return 0 !== this.constraints.length
        },
        needsValidation: function(e) {
            return "undefined" == typeof e && (e = this.getValue()), !(!e.length && !this._isRequired() && "undefined" == typeof this.options.validateIfEmpty)
        },
        _isInGroup: function(t) {
            return Array.isArray(this.options.group) ? -1 !== e.inArray(t, this.options.group) : this.options.group === t
        },
        isValid: function(t) {
            if (arguments.length >= 1 && !e.isPlainObject(t)) {
                a.warnOnce("Calling isValid on a parsley field without passing arguments as an object is deprecated.");
                var i = _slice.call(arguments),
                    n = i[0],
                    r = i[1];
                t = {
                    force: n,
                    value: r
                }
            }
            var s = this.whenValid(t);
            return !s || A[s.state()]
        },
        whenValid: function() {
            var t = this,
                i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                n = i.force,
                r = void 0 !== n && n,
                s = i.value,
                o = i.group,
                l = i._refreshed;
            if (l || this.refresh(), !o || this._isInGroup(o)) {
                if (this.validationResult = !0, !this.hasConstraints()) return e.when();
                if ("undefined" != typeof s && null !== s || (s = this.getValue()), !this.needsValidation(s) && !0 !== r) return e.when();
                var u = this._getGroupedConstraints(),
                    d = [];
                return e.each(u, function(i, n) {
                    var r = a.all(e.map(n, function(e) {
                        return t._validateConstraint(s, e)
                    }));
                    if (d.push(r), "rejected" === r.state()) return !1
                }), a.all(d)
            }
        },
        _validateConstraint: function(t, i) {
            var n = this,
                r = i.validate(t, this);
            return !1 === r && (r = e.Deferred().reject()), a.all([r]).fail(function(e) {
                n.validationResult instanceof Array || (n.validationResult = []), n.validationResult.push({
                    assert: i,
                    errorMessage: "string" == typeof e && e
                })
            })
        },
        getValue: function() {
            var e;
            return e = "function" == typeof this.options.value ? this.options.value(this) : "undefined" != typeof this.options.value ? this.options.value : this.$element.val(), "undefined" == typeof e || null === e ? "" : this._handleWhitespace(e)
        },
        reset: function() {
            return this._resetUI(), this._trigger("reset")
        },
        destroy: function() {
            this._destroyUI(), this.$element.removeData("Parsley"), this.$element.removeData("FieldMultiple"), this._trigger("destroy")
        },
        refresh: function() {
            return this._refreshConstraints(), this
        },
        _refreshConstraints: function() {
            return this.actualizeOptions()._bindConstraints()
        },
        refreshConstraints: function() {
            return a.warnOnce("Parsley's refreshConstraints is deprecated. Please use refresh"), this.refresh()
        },
        addConstraint: function(e, t, i, n) {
            if (window.Parsley._validatorRegistry.validators[e]) {
                var r = new F(this, e, t, i, n);
                "undefined" !== this.constraintsByName[r.name] && this.removeConstraint(r.name), this.constraints.push(r), this.constraintsByName[r.name] = r
            }
            return this
        },
        removeConstraint: function(e) {
            for (var t = 0; t < this.constraints.length; t++)
                if (e === this.constraints[t].name) {
                    this.constraints.splice(t, 1);
                    break
                }
            return delete this.constraintsByName[e], this
        },
        updateConstraint: function(e, t, i) {
            return this.removeConstraint(e).addConstraint(e, t, i)
        },
        _bindConstraints: function() {
            for (var e = [], t = {}, i = 0; i < this.constraints.length; i++) !1 === this.constraints[i].isDomConstraint && (e.push(this.constraints[i]), t[this.constraints[i].name] = this.constraints[i]);
            this.constraints = e, this.constraintsByName = t;
            for (var n in this.options) this.addConstraint(n, this.options[n], void 0, !0);
            return this._bindHtml5Constraints()
        },
        _bindHtml5Constraints: function() {
            null !== this.element.getAttribute("required") && this.addConstraint("required", !0, void 0, !0), null !== this.element.getAttribute("pattern") && this.addConstraint("pattern", this.element.getAttribute("pattern"), void 0, !0);
            var e = this.element.getAttribute("min"),
                t = this.element.getAttribute("max");
            null !== e && null !== t ? this.addConstraint("range", [e, t], void 0, !0) : null !== e ? this.addConstraint("min", e, void 0, !0) : null !== t && this.addConstraint("max", t, void 0, !0), null !== this.element.getAttribute("minlength") && null !== this.element.getAttribute("maxlength") ? this.addConstraint("length", [this.element.getAttribute("minlength"), this.element.getAttribute("maxlength")], void 0, !0) : null !== this.element.getAttribute("minlength") ? this.addConstraint("minlength", this.element.getAttribute("minlength"), void 0, !0) : null !== this.element.getAttribute("maxlength") && this.addConstraint("maxlength", this.element.getAttribute("maxlength"), void 0, !0);
            var i = a.getType(this.element);
            return "number" === i ? this.addConstraint("type", ["number", {
                step: this.element.getAttribute("step") || "1",
                base: e || this.element.getAttribute("value")
            }], void 0, !0) : /^(email|url|range|date)$/i.test(i) ? this.addConstraint("type", i, void 0, !0) : this
        },
        _isRequired: function() {
            return "undefined" != typeof this.constraintsByName.required && !1 !== this.constraintsByName.required.requirements
        },
        _trigger: function(e) {
            return this.trigger("field:" + e)
        },
        _handleWhitespace: function(e) {
            return !0 === this.options.trimValue && a.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"'), "squish" === this.options.whitespace && (e = e.replace(/\s{2,}/g, " ")), "trim" !== this.options.whitespace && "squish" !== this.options.whitespace && !0 !== this.options.trimValue || (e = a.trimString(e)), e
        },
        _isDateInput: function() {
            var e = this.constraintsByName.type;
            return e && "date" === e.requirements
        },
        _getGroupedConstraints: function() {
            if (!1 === this.options.priorityEnabled) return [this.constraints];
            for (var e = [], t = {}, i = 0; i < this.constraints.length; i++) {
                var n = this.constraints[i].priority;
                t[n] || e.push(t[n] = []), t[n].push(this.constraints[i])
            }
            return e.sort(function(e, t) {
                return t[0].priority - e[0].priority
            }), e
        }
    };
    var x = E,
        $ = function() {
            this.__class__ = "FieldMultiple"
        };
    $.prototype = {
        addElement: function(e) {
            return this.$elements.push(e), this
        },
        _refreshConstraints: function() {
            var t;
            if (this.constraints = [], "SELECT" === this.element.nodeName) return this.actualizeOptions()._bindConstraints(), this;
            for (var i = 0; i < this.$elements.length; i++)
                if (e("html").has(this.$elements[i]).length) {
                    t = this.$elements[i].data("FieldMultiple")._refreshConstraints().constraints;
                    for (var n = 0; n < t.length; n++) this.addConstraint(t[n].name, t[n].requirements, t[n].priority, t[n].isDomConstraint)
                } else this.$elements.splice(i, 1);
            return this
        },
        getValue: function() {
            if ("function" == typeof this.options.value) return this.options.value(this);
            if ("undefined" != typeof this.options.value) return this.options.value;
            if ("INPUT" === this.element.nodeName) {
                var t = a.getType(this.element);
                if ("radio" === t) return this._findRelated().filter(":checked").val() || "";
                if ("checkbox" === t) {
                    var i = [];
                    return this._findRelated().filter(":checked").each(function() {
                        i.push(e(this).val())
                    }), i
                }
            }
            return "SELECT" === this.element.nodeName && null === this.$element.val() ? [] : this.$element.val();
        },
        _init: function() {
            return this.$elements = [this.$element], this
        }
    };
    var P = function(t, i, n) {
        this.element = t, this.$element = e(t);
        var r = this.$element.data("Parsley");
        if (r) return "undefined" != typeof n && r.parent === window.Parsley && (r.parent = n, r._resetOptions(r.options)), "object" == typeof i && _extends(r.options, i), r;
        if (!this.$element.length) throw new Error("You must bind Parsley on an existing element.");
        if ("undefined" != typeof n && "Form" !== n.__class__) throw new Error("Parent instance must be a Form instance");
        return this.parent = n || window.Parsley, this.init(i)
    };
    P.prototype = {
        init: function(e) {
            return this.__class__ = "Parsley", this.__version__ = "2.8.0", this.__id__ = a.generateID(), this._resetOptions(e), "FORM" === this.element.nodeName || a.checkAttr(this.element, this.options.namespace, "validate") && !this.$element.is(this.options.inputs) ? this.bind("parsleyForm") : this.isMultiple() ? this.handleMultiple() : this.bind("parsleyField")
        },
        isMultiple: function() {
            var e = a.getType(this.element);
            return "radio" === e || "checkbox" === e || "SELECT" === this.element.nodeName && null !== this.element.getAttribute("multiple")
        },
        handleMultiple: function() {
            var t, i, n = this;
            if (this.options.multiple = this.options.multiple || (t = this.element.getAttribute("name")) || this.element.getAttribute("id"), "SELECT" === this.element.nodeName && null !== this.element.getAttribute("multiple")) return this.options.multiple = this.options.multiple || this.__id__, this.bind("parsleyFieldMultiple");
            if (!this.options.multiple) return a.warn("To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.", this.$element), this;
            this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, ""), t && e('input[name="' + t + '"]').each(function(e, t) {
                var i = a.getType(t);
                "radio" !== i && "checkbox" !== i || t.setAttribute(n.options.namespace + "multiple", n.options.multiple)
            });
            for (var r = this._findRelated(), s = 0; s < r.length; s++)
                if (i = e(r.get(s)).data("Parsley"), "undefined" != typeof i) {
                    this.$element.data("FieldMultiple") || i.addElement(this.$element);
                    break
                }
            return this.bind("parsleyField", !0), i || this.bind("parsleyFieldMultiple")
        },
        bind: function(t, i) {
            var n;
            switch (t) {
                case "parsleyForm":
                    n = e.extend(new w(this.element, this.domOptions, this.options), new l, window.ParsleyExtend)._bindFields();
                    break;
                case "parsleyField":
                    n = e.extend(new x(this.element, this.domOptions, this.options, this.parent), new l, window.ParsleyExtend);
                    break;
                case "parsleyFieldMultiple":
                    n = e.extend(new x(this.element, this.domOptions, this.options, this.parent), new $, new l, window.ParsleyExtend)._init();
                    break;
                default:
                    throw new Error(t + "is not a supported Parsley type")
            }
            return this.options.multiple && a.setAttr(this.element, this.options.namespace, "multiple", this.options.multiple), "undefined" != typeof i ? (this.$element.data("FieldMultiple", n), n) : (this.$element.data("Parsley", n), n._actualizeTriggers(), n._trigger("init"), n)
        }
    };
    var V = e.fn.jquery.split(".");
    if (parseInt(V[0]) <= 1 && parseInt(V[1]) < 8) throw "The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";
    V.forEach || a.warn("Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim");
    var T = _extends(new l, {
        element: document,
        $element: e(document),
        actualizeOptions: null,
        _resetOptions: null,
        Factory: P,
        version: "2.8.0"
    });
    _extends(x.prototype, y.Field, l.prototype), _extends(w.prototype, y.Form, l.prototype), _extends(P.prototype, l.prototype), e.fn.parsley = e.fn.psly = function(t) {
        if (this.length > 1) {
            var i = [];
            return this.each(function() {
                i.push(e(this).parsley(t))
            }), i
        }
        if (0 != this.length) return new P(this[0], t)
    }, "undefined" == typeof window.ParsleyExtend && (window.ParsleyExtend = {}), T.options = _extends(a.objectCreate(o), window.ParsleyConfig), window.ParsleyConfig = T.options, window.Parsley = window.psly = T, T.Utils = a, window.ParsleyUtils = {}, e.each(a, function(e, t) {
        "function" == typeof t && (window.ParsleyUtils[e] = function() {
            return a.warnOnce("Accessing `window.ParsleyUtils` is deprecated. Use `window.Parsley.Utils` instead."), a[e].apply(a, arguments)
        })
    });
    var O = window.Parsley._validatorRegistry = new p(window.ParsleyConfig.validators, window.ParsleyConfig.i18n);
    window.ParsleyValidator = {}, e.each("setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator hasValidator".split(" "), function(e, t) {
        window.Parsley[t] = function() {
            return O[t].apply(O, arguments)
        }, window.ParsleyValidator[t] = function() {
            var e;
            return a.warnOnce("Accessing the method '" + t + "' through Validator is deprecated. Simply call 'window.Parsley." + t + "(...)'"), (e = window.Parsley)[t].apply(e, arguments)
        }
    }), window.Parsley.UI = y, window.ParsleyUI = {
        removeError: function(e, t, i) {
            var n = !0 !== i;
            return a.warnOnce("Accessing UI is deprecated. Call 'removeError' on the instance directly. Please comment in issue 1073 as to your need to call this method."), e.removeError(t, {
                updateClass: n
            })
        },
        getErrorsMessages: function(e) {
            return a.warnOnce("Accessing UI is deprecated. Call 'getErrorsMessages' on the instance directly."), e.getErrorsMessages()
        }
    }, e.each("addError updateError".split(" "), function(e, t) {
        window.ParsleyUI[t] = function(e, i, n, r, s) {
            var o = !0 !== s;
            return a.warnOnce("Accessing UI is deprecated. Call '" + t + "' on the instance directly. Please comment in issue 1073 as to your need to call this method."), e[t](i, {
                message: n,
                assert: r,
                updateClass: o
            })
        }
    }), !1 !== window.ParsleyConfig.autoBind && e(function() {
        e("[data-parsley-validate]").length && e("[data-parsley-validate]").parsley()
    });
    var M = e({}),
        R = function() {
            a.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley")
        },
        D = "parsley:";
    e.listen = function(e, n) {
        var r;
        if (R(), "object" == typeof arguments[1] && "function" == typeof arguments[2] && (r = arguments[1], n = arguments[2]), "function" != typeof n) throw new Error("Wrong parameters");
        window.Parsley.on(i(e), t(n, r))
    }, e.listenTo = function(e, n, r) {
        if (R(), !(e instanceof x || e instanceof w)) throw new Error("Must give Parsley instance");
        if ("string" != typeof n || "function" != typeof r) throw new Error("Wrong parameters");
        e.on(i(n), t(r))
    }, e.unsubscribe = function(e, t) {
        if (R(), "string" != typeof e || "function" != typeof t) throw new Error("Wrong arguments");
        window.Parsley.off(i(e), t.parsleyAdaptedCallback)
    }, e.unsubscribeTo = function(e, t) {
        if (R(), !(e instanceof x || e instanceof w)) throw new Error("Must give Parsley instance");
        e.off(i(t))
    }, e.unsubscribeAll = function(t) {
        R(), window.Parsley.off(i(t)), e("form,input,textarea,select").each(function() {
            var n = e(this).data("Parsley");
            n && n.off(i(t))
        })
    }, e.emit = function(e, t) {
        var n;
        R();
        var r = t instanceof x || t instanceof w,
            s = Array.prototype.slice.call(arguments, r ? 2 : 1);
        s.unshift(i(e)), r || (t = window.Parsley), (n = t).trigger.apply(n, _toConsumableArray(s))
    };
    e.extend(!0, T, {
        asyncValidators: {
            "default": {
                fn: function(e) {
                    return e.status >= 200 && e.status < 300
                },
                url: !1
            },
            reverse: {
                fn: function(e) {
                    return e.status < 200 || e.status >= 300
                },
                url: !1
            }
        },
        addAsyncValidator: function(e, t, i, n) {
            return T.asyncValidators[e] = {
                fn: t,
                url: i || !1,
                options: n || {}
            }, this
        }
    }), T.addValidator("remote", {
        requirementType: {
            "": "string",
            validator: "string",
            reverse: "boolean",
            options: "object"
        },
        validateString: function(t, i, n, r) {
            var s, a, o = {},
                l = n.validator || (!0 === n.reverse ? "reverse" : "default");
            if ("undefined" == typeof T.asyncValidators[l]) throw new Error("Calling an undefined async validator: `" + l + "`");
            i = T.asyncValidators[l].url || i, i.indexOf("{value}") > -1 ? i = i.replace("{value}", encodeURIComponent(t)) : o[r.element.getAttribute("name") || r.element.getAttribute("id")] = t;
            var u = e.extend(!0, n.options || {}, T.asyncValidators[l].options);
            s = e.extend(!0, {}, {
                url: i,
                data: o,
                type: "GET"
            }, u), r.trigger("field:ajaxoptions", r, s), a = e.param(s), "undefined" == typeof T._remoteCache && (T._remoteCache = {});
            var d = T._remoteCache[a] = T._remoteCache[a] || e.ajax(s),
                h = function() {
                    var t = T.asyncValidators[l].fn.call(r, d, i, n);
                    return t || (t = e.Deferred().reject()), e.when(t)
                };
            return d.then(h, h)
        },
        priority: -1
    }), T.on("form:submit", function() {
        T._remoteCache = {}
    }), l.prototype.addAsyncValidator = function() {
        return a.warnOnce("Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`"), T.addAsyncValidator.apply(T, arguments)
    }, T.addMessages("en", {
        defaultMessage: "This value seems to be invalid.",
        type: {
            email: "This value should be a valid email.",
            url: "This value should be a valid url.",
            number: "This value should be a valid number.",
            integer: "This value should be a valid integer.",
            digits: "This value should be digits.",
            alphanum: "This value should be alphanumeric."
        },
        notblank: "This value should not be blank.",
        required: "This value is required.",
        pattern: "This value seems to be invalid.",
        min: "This value should be greater than or equal to %s.",
        max: "This value should be lower than or equal to %s.",
        range: "This value should be between %s and %s.",
        minlength: "This value is too short. It should have %s characters or more.",
        maxlength: "This value is too long. It should have %s characters or fewer.",
        length: "This value length is invalid. It should be between %s and %s characters long.",
        mincheck: "You must select at least %s choices.",
        maxcheck: "You must select %s choices or fewer.",
        check: "You must select between %s and %s choices.",
        equalto: "This value should be the same."
    }), T.setLocale("en");
    var I = new n;
    I.install();
    var q = T;
    return q
});
//# sourceMappingURL=parsley.min.js.map