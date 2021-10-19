/*jquery.flexslider-min.js*/

!function ($) {
    $.flexslider = function (e, t) {
        var a = $(e);
        a.vars = $.extend({}, $.flexslider.defaults, t);
        var n = a.vars.namespace, i = window.navigator && window.navigator.msPointerEnabled && window.MSGesture, s = ("ontouchstart" in window || i || window.DocumentTouch && document instanceof DocumentTouch) && a.vars.touch, r = "click touchend MSPointerUp keyup", o = "", l, c = "vertical" === a.vars.direction, d = a.vars.reverse, u = a.vars.itemWidth > 0, v = "fade" === a.vars.animation, p = "" !== a.vars.asNavFor, m = {}, f = !0;
        $.data(e, "flexslider", a), m = {
            init: function () {
                a.animating = !1, a.currentSlide = parseInt(a.vars.startAt ? a.vars.startAt : 0, 10), isNaN(a.currentSlide) && (a.currentSlide = 0), a.animatingTo = a.currentSlide, a.atEnd = 0 === a.currentSlide || a.currentSlide === a.last, a.containerSelector = a.vars.selector.substr(0, a.vars.selector.search(" ")), a.slides = $(a.vars.selector, a), a.container = $(a.containerSelector, a), a.count = a.slides.length, a.syncExists = $(a.vars.sync).length > 0, "slide" === a.vars.animation && (a.vars.animation = "swing"), a.prop = c ? "top" : "marginLeft", a.args = {}, a.manualPause = !1, a.stopped = !1, a.started = !1, a.startTimeout = null, a.transitions = !a.vars.video && !v && a.vars.useCSS && function () {
                    var e = document.createElement("div"), t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var n in t) if (void 0 !== e.style[t[n]]) return a.pfx = t[n].replace("Perspective", "").toLowerCase(), a.prop = "-" + a.pfx + "-transform", !0;
                    return !1
                }(), a.ensureAnimationEnd = "", "" !== a.vars.controlsContainer && (a.controlsContainer = $(a.vars.controlsContainer).length > 0 && $(a.vars.controlsContainer)), "" !== a.vars.manualControls && (a.manualControls = $(a.vars.manualControls).length > 0 && $(a.vars.manualControls)), "" !== a.vars.customDirectionNav && (a.customDirectionNav = 2 === $(a.vars.customDirectionNav).length && $(a.vars.customDirectionNav)), a.vars.randomize && (a.slides.sort(function () {
                    return Math.round(Math.random()) - .5
                }), a.container.empty().append(a.slides)), a.doMath(), a.setup("init"), a.vars.controlNav && m.controlNav.setup(), a.vars.directionNav && m.directionNav.setup(), a.vars.keyboard && (1 === $(a.containerSelector).length || a.vars.multipleKeyboard) && $(document).bind("keyup", function (e) {
                    var t = e.keyCode;
                    if (!a.animating && (39 === t || 37 === t)) {
                        var n = 39 === t ? a.getTarget("next") : 37 === t ? a.getTarget("prev") : !1;
                        a.flexAnimate(n, a.vars.pauseOnAction)
                    }
                }), a.vars.mousewheel && a.bind("mousewheel", function (e, t, n, i) {
                    e.preventDefault();
                    var s = a.getTarget(0 > t ? "next" : "prev");
                    a.flexAnimate(s, a.vars.pauseOnAction)
                }), a.vars.pausePlay && m.pausePlay.setup(), a.vars.slideshow && a.vars.pauseInvisible && m.pauseInvisible.init(), a.vars.slideshow && (a.vars.pauseOnHover && a.hover(function () {
                    a.manualPlay || a.manualPause || a.pause()
                }, function () {
                    a.manualPause || a.manualPlay || a.stopped || a.play()
                }), a.vars.pauseInvisible && m.pauseInvisible.isHidden() || (a.vars.initDelay > 0 ? a.startTimeout = setTimeout(a.play, a.vars.initDelay) : a.play())), p && m.asNav.setup(), s && a.vars.touch && m.touch(), (!v || v && a.vars.smoothHeight) && $(window).bind("resize orientationchange focus", m.resize), a.find("img").attr("draggable", "false"), setTimeout(function () {
                    a.vars.start(a)
                }, 200)
            }, asNav: {
                setup: function () {
                    a.asNav = !0, a.animatingTo = Math.floor(a.currentSlide / a.move), a.currentItem = a.currentSlide, a.slides.removeClass(n + "active-slide").eq(a.currentItem).addClass(n + "active-slide"), i ? (e._slider = a, a.slides.each(function () {
                        var e = this;
                        e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", function (e) {
                            e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
                        }, !1), e.addEventListener("MSGestureTap", function (e) {
                            e.preventDefault();
                            var t = $(this), n = t.index();
                            $(a.vars.asNavFor).data("flexslider").animating || t.hasClass("active") || (a.direction = a.currentItem < n ? "next" : "prev", a.flexAnimate(n, a.vars.pauseOnAction, !1, !0, !0))
                        })
                    })) : a.slides.on(r, function (e) {
                        e.preventDefault();
                        var t = $(this), i = t.index(), s = t.offset().left - $(a).scrollLeft();
                        0 >= s && t.hasClass(n + "active-slide") ? a.flexAnimate(a.getTarget("prev"), !0) : $(a.vars.asNavFor).data("flexslider").animating || t.hasClass(n + "active-slide") || (a.direction = a.currentItem < i ? "next" : "prev", a.flexAnimate(i, a.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            }, controlNav: {
                setup: function () {
                    a.manualControls ? m.controlNav.setupManual() : m.controlNav.setupPaging()
                }, setupPaging: function () {
                    var e = "thumbnails" === a.vars.controlNav ? "control-thumbs" : "control-paging", t = 1, i, s;
                    if (a.controlNavScaffold = $('<ol class="' + n + "control-nav " + n + e + '"></ol>'), a.pagingCount > 1) for (var l = 0; l < a.pagingCount; l++) {
                        if (s = a.slides.eq(l), i = "thumbnails" === a.vars.controlNav ? '<img src="' + s.attr("data-thumb") + '"/>' : "<a>" + t + "</a>", "thumbnails" === a.vars.controlNav && !0 === a.vars.thumbCaptions) {
                            var c = s.attr("data-thumbcaption");
                            "" !== c && void 0 !== c && (i += '<span class="' + n + 'caption">' + c + "</span>")
                        }
                        a.controlNavScaffold.append("<li>" + i + "</li>"), t++
                    }
                    a.controlsContainer ? $(a.controlsContainer).append(a.controlNavScaffold) : a.append(a.controlNavScaffold), m.controlNav.set(), m.controlNav.active(), a.controlNavScaffold.delegate("a, img", r, function (e) {
                        if (e.preventDefault(), "" === o || o === e.type) {
                            var t = $(this), i = a.controlNav.index(t);
                            t.hasClass(n + "active") || (a.direction = i > a.currentSlide ? "next" : "prev", a.flexAnimate(i, a.vars.pauseOnAction))
                        }
                        "" === o && (o = e.type), m.setToClearWatchedEvent()
                    })
                }, setupManual: function () {
                    a.controlNav = a.manualControls, m.controlNav.active(), a.controlNav.bind(r, function (e) {
                        if (e.preventDefault(), "" === o || o === e.type) {
                            var t = $(this), i = a.controlNav.index(t);
                            t.hasClass(n + "active") || (a.direction = i > a.currentSlide ? "next" : "prev", a.flexAnimate(i, a.vars.pauseOnAction))
                        }
                        "" === o && (o = e.type), m.setToClearWatchedEvent()
                    })
                }, set: function () {
                    var e = "thumbnails" === a.vars.controlNav ? "img" : "a";
                    a.controlNav = $("." + n + "control-nav li " + e, a.controlsContainer ? a.controlsContainer : a)
                }, active: function () {
                    a.controlNav.removeClass(n + "active").eq(a.animatingTo).addClass(n + "active")
                }, update: function (e, t) {
                    a.pagingCount > 1 && "add" === e ? a.controlNavScaffold.append($("<li><a>" + a.count + "</a></li>")) : 1 === a.pagingCount ? a.controlNavScaffold.find("li").remove() : a.controlNav.eq(t).closest("li").remove(), m.controlNav.set(), a.pagingCount > 1 && a.pagingCount !== a.controlNav.length ? a.update(t, e) : m.controlNav.active()
                }
            }, directionNav: {
                setup: function () {
                    var e = $('<ul class="' + n + 'direction-nav"><li class="' + n + 'nav-prev"><a class="' + n + 'prev" href="#">' + a.vars.prevText + '</a></li><li class="' + n + 'nav-next"><a class="' + n + 'next" href="#">' + a.vars.nextText + "</a></li></ul>");
                    a.customDirectionNav ? a.directionNav = a.customDirectionNav : a.controlsContainer ? ($(a.controlsContainer).append(e), a.directionNav = $("." + n + "direction-nav li a", a.controlsContainer)) : (a.append(e), a.directionNav = $("." + n + "direction-nav li a", a)), m.directionNav.update(), a.directionNav.bind(r, function (e) {
                        e.preventDefault();
                        var t;
                        ("" === o || o === e.type) && (t = a.getTarget($(this).hasClass(n + "next") ? "next" : "prev"), a.flexAnimate(t, a.vars.pauseOnAction)), "" === o && (o = e.type), m.setToClearWatchedEvent()
                    })
                }, update: function () {
                    var e = n + "disabled";
                    1 === a.pagingCount ? a.directionNav.addClass(e).attr("tabindex", "-1") : a.vars.animationLoop ? a.directionNav.removeClass(e).removeAttr("tabindex") : 0 === a.animatingTo ? a.directionNav.removeClass(e).filter("." + n + "prev").addClass(e).attr("tabindex", "-1") : a.animatingTo === a.last ? a.directionNav.removeClass(e).filter("." + n + "next").addClass(e).attr("tabindex", "-1") : a.directionNav.removeClass(e).removeAttr("tabindex")
                }
            }, pausePlay: {
                setup: function () {
                    var e = $('<div class="' + n + 'pauseplay"><a></a></div>');
                    a.controlsContainer ? (a.controlsContainer.append(e), a.pausePlay = $("." + n + "pauseplay a", a.controlsContainer)) : (a.append(e), a.pausePlay = $("." + n + "pauseplay a", a)), m.pausePlay.update(a.vars.slideshow ? n + "pause" : n + "play"), a.pausePlay.bind(r, function (e) {
                        e.preventDefault(), ("" === o || o === e.type) && ($(this).hasClass(n + "pause") ? (a.manualPause = !0, a.manualPlay = !1, a.pause()) : (a.manualPause = !1, a.manualPlay = !0, a.play())), "" === o && (o = e.type), m.setToClearWatchedEvent()
                    })
                }, update: function (e) {
                    "play" === e ? a.pausePlay.removeClass(n + "pause").addClass(n + "play").html(a.vars.playText) : a.pausePlay.removeClass(n + "play").addClass(n + "pause").html(a.vars.pauseText)
                }
            }, touch: function () {
                function t(t) {
                    t.stopPropagation(), a.animating ? t.preventDefault() : (a.pause(), e._gesture.addPointer(t.pointerId), w = 0, p = c ? a.h : a.w, f = Number(new Date), l = u && d && a.animatingTo === a.last ? 0 : u && d ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : u && a.currentSlide === a.last ? a.limit : u ? (a.itemW + a.vars.itemMargin) * a.move * a.currentSlide : d ? (a.last - a.currentSlide + a.cloneOffset) * p : (a.currentSlide + a.cloneOffset) * p)
                }

                function n(t) {
                    t.stopPropagation();
                    var a = t.target._slider;
                    if (a) {
                        var n = -t.translationX, i = -t.translationY;
                        return w += c ? i : n, m = w, y = c ? Math.abs(w) < Math.abs(-n) : Math.abs(w) < Math.abs(-i), t.detail === t.MSGESTURE_FLAG_INERTIA ? void setImmediate(function () {
                            e._gesture.stop()
                        }) : void ((!y || Number(new Date) - f > 500) && (t.preventDefault(), !v && a.transitions && (a.vars.animationLoop || (m = w / (0 === a.currentSlide && 0 > w || a.currentSlide === a.last && w > 0 ? Math.abs(w) / p + 2 : 1)), a.setProps(l + m, "setTouch"))))
                    }
                }

                function s(e) {
                    e.stopPropagation();
                    var t = e.target._slider;
                    if (t) {
                        if (t.animatingTo === t.currentSlide && !y && null !== m) {
                            var a = d ? -m : m, n = t.getTarget(a > 0 ? "next" : "prev");
                            t.canAdvance(n) && (Number(new Date) - f < 550 && Math.abs(a) > 50 || Math.abs(a) > p / 2) ? t.flexAnimate(n, t.vars.pauseOnAction) : v || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0)
                        }
                        r = null, o = null, m = null, l = null, w = 0
                    }
                }

                var r, o, l, p, m, f, g, h, S, y = !1, x = 0, b = 0, w = 0;
                i ? (e.style.msTouchAction = "none", e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", t, !1), e._slider = a, e.addEventListener("MSGestureChange", n, !1), e.addEventListener("MSGestureEnd", s, !1)) : (g = function (t) {
                    a.animating ? t.preventDefault() : (window.navigator.msPointerEnabled || 1 === t.touches.length) && (a.pause(), p = c ? a.h : a.w, f = Number(new Date), x = t.touches[0].pageX, b = t.touches[0].pageY, l = u && d && a.animatingTo === a.last ? 0 : u && d ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : u && a.currentSlide === a.last ? a.limit : u ? (a.itemW + a.vars.itemMargin) * a.move * a.currentSlide : d ? (a.last - a.currentSlide + a.cloneOffset) * p : (a.currentSlide + a.cloneOffset) * p, r = c ? b : x, o = c ? x : b, e.addEventListener("touchmove", h, !1), e.addEventListener("touchend", S, !1))
                }, h = function (e) {
                    x = e.touches[0].pageX, b = e.touches[0].pageY, m = c ? r - b : r - x, y = c ? Math.abs(m) < Math.abs(x - o) : Math.abs(m) < Math.abs(b - o);
                    var t = 500;
                    (!y || Number(new Date) - f > t) && (e.preventDefault(), !v && a.transitions && (a.vars.animationLoop || (m /= 0 === a.currentSlide && 0 > m || a.currentSlide === a.last && m > 0 ? Math.abs(m) / p + 2 : 1), a.setProps(l + m, "setTouch")))
                }, S = function (t) {
                    if (e.removeEventListener("touchmove", h, !1), a.animatingTo === a.currentSlide && !y && null !== m) {
                        var n = d ? -m : m, i = a.getTarget(n > 0 ? "next" : "prev");
                        a.canAdvance(i) && (Number(new Date) - f < 550 && Math.abs(n) > 50 || Math.abs(n) > p / 2) ? a.flexAnimate(i, a.vars.pauseOnAction) : v || a.flexAnimate(a.currentSlide, a.vars.pauseOnAction, !0)
                    }
                    e.removeEventListener("touchend", S, !1), r = null, o = null, m = null, l = null
                }, e.addEventListener("touchstart", g, !1))
            }, resize: function () {
                !a.animating && a.is(":visible") && (u || a.doMath(), v ? m.smoothHeight() : u ? (a.slides.width(a.computedW), a.update(a.pagingCount), a.setProps()) : c ? (a.viewport.height(a.h), a.setProps(a.h, "setTotal")) : (a.vars.smoothHeight && m.smoothHeight(), a.newSlides.width(a.computedW), a.setProps(a.computedW, "setTotal")))
            }, smoothHeight: function (e) {
                if (!c || v) {
                    var t = v ? a : a.viewport;
                    e ? t.animate({height: a.slides.eq(a.animatingTo).height()}, e) : t.height(a.slides.eq(a.animatingTo).height())
                }
            }, sync: function (e) {
                var t = $(a.vars.sync).data("flexslider"), n = a.animatingTo;
                switch (e) {
                    case "animate":
                        t.flexAnimate(n, a.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        t.playing || t.asNav || t.play();
                        break;
                    case "pause":
                        t.pause()
                }
            }, uniqueID: function (e) {
                return e.filter("[id]").add(e.find("[id]")).each(function () {
                    var e = $(this);
                    e.attr("id", e.attr("id") + "_clone")
                }), e
            }, pauseInvisible: {
                visProp: null, init: function () {
                    var e = m.pauseInvisible.getHiddenProp();
                    if (e) {
                        var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(t, function () {
                            m.pauseInvisible.isHidden() ? a.startTimeout ? clearTimeout(a.startTimeout) : a.pause() : a.started ? a.play() : a.vars.initDelay > 0 ? setTimeout(a.play, a.vars.initDelay) : a.play()
                        })
                    }
                }, isHidden: function () {
                    var e = m.pauseInvisible.getHiddenProp();
                    return e ? document[e] : !1
                }, getHiddenProp: function () {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++) if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                    return null
                }
            }, setToClearWatchedEvent: function () {
                clearTimeout(l), l = setTimeout(function () {
                    o = ""
                }, 3e3)
            }
        }, a.flexAnimate = function (e, t, i, r, o) {
            if (a.vars.animationLoop || e === a.currentSlide || (a.direction = e > a.currentSlide ? "next" : "prev"), p && 1 === a.pagingCount && (a.direction = a.currentItem < e ? "next" : "prev"), !a.animating && (a.canAdvance(e, o) || i) && a.is(":visible")) {
                if (p && r) {
                    var l = $(a.vars.asNavFor).data("flexslider");
                    if (a.atEnd = 0 === e || e === a.count - 1, l.flexAnimate(e, !0, !1, !0, o), a.direction = a.currentItem < e ? "next" : "prev", l.direction = a.direction, Math.ceil((e + 1) / a.visible) - 1 === a.currentSlide || 0 === e) return a.currentItem = e, a.slides.removeClass(n + "active-slide").eq(e).addClass(n + "active-slide"), !1;
                    a.currentItem = e, a.slides.removeClass(n + "active-slide").eq(e).addClass(n + "active-slide"), e = Math.floor(e / a.visible)
                }
                if (a.animating = !0, a.animatingTo = e, t && a.pause(), a.vars.before(a), a.syncExists && !o && m.sync("animate"), a.vars.controlNav && m.controlNav.active(), u || a.slides.removeClass(n + "active-slide").eq(e).addClass(n + "active-slide"), a.atEnd = 0 === e || e === a.last, a.vars.directionNav && m.directionNav.update(), e === a.last && (a.vars.end(a), a.vars.animationLoop || a.pause()), v) s ? (a.slides.eq(a.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), a.slides.eq(e).css({
                    opacity: 1,
                    zIndex: 2
                }), a.wrapup(f)) : (a.slides.eq(a.currentSlide).css({zIndex: 1}).animate({opacity: 0}, a.vars.animationSpeed, a.vars.easing), a.slides.eq(e).css({zIndex: 2}).animate({opacity: 1}, a.vars.animationSpeed, a.vars.easing, a.wrapup)); else {
                    var f = c ? a.slides.filter(":first").height() : a.computedW, g, h, S;
                    u ? (g = a.vars.itemMargin, S = (a.itemW + g) * a.move * a.animatingTo, h = S > a.limit && 1 !== a.visible ? a.limit : S) : h = 0 === a.currentSlide && e === a.count - 1 && a.vars.animationLoop && "next" !== a.direction ? d ? (a.count + a.cloneOffset) * f : 0 : a.currentSlide === a.last && 0 === e && a.vars.animationLoop && "prev" !== a.direction ? d ? 0 : (a.count + 1) * f : d ? (a.count - 1 - e + a.cloneOffset) * f : (e + a.cloneOffset) * f, a.setProps(h, "", a.vars.animationSpeed), a.transitions ? (a.vars.animationLoop && a.atEnd || (a.animating = !1, a.currentSlide = a.animatingTo), a.container.unbind("webkitTransitionEnd transitionend"), a.container.bind("webkitTransitionEnd transitionend", function () {
                        clearTimeout(a.ensureAnimationEnd), a.wrapup(f)
                    }), clearTimeout(a.ensureAnimationEnd), a.ensureAnimationEnd = setTimeout(function () {
                        a.wrapup(f)
                    }, a.vars.animationSpeed + 100)) : a.container.animate(a.args, a.vars.animationSpeed, a.vars.easing, function () {
                        a.wrapup(f)
                    })
                }
                a.vars.smoothHeight && m.smoothHeight(a.vars.animationSpeed)
            }
        }, a.wrapup = function (e) {
            v || u || (0 === a.currentSlide && a.animatingTo === a.last && a.vars.animationLoop ? a.setProps(e, "jumpEnd") : a.currentSlide === a.last && 0 === a.animatingTo && a.vars.animationLoop && a.setProps(e, "jumpStart")), a.animating = !1, a.currentSlide = a.animatingTo, a.vars.after(a)
        }, a.animateSlides = function () {
            !a.animating && f && a.flexAnimate(a.getTarget("next"))
        }, a.pause = function () {
            clearInterval(a.animatedSlides), a.animatedSlides = null, a.playing = !1, a.vars.pausePlay && m.pausePlay.update("play"), a.syncExists && m.sync("pause")
        }, a.play = function () {
            a.playing && clearInterval(a.animatedSlides), a.animatedSlides = a.animatedSlides || setInterval(a.animateSlides, a.vars.slideshowSpeed), a.started = a.playing = !0, a.vars.pausePlay && m.pausePlay.update("pause"), a.syncExists && m.sync("play")
        }, a.stop = function () {
            a.pause(), a.stopped = !0
        }, a.canAdvance = function (e, t) {
            var n = p ? a.pagingCount - 1 : a.last;
            return t ? !0 : p && a.currentItem === a.count - 1 && 0 === e && "prev" === a.direction ? !0 : p && 0 === a.currentItem && e === a.pagingCount - 1 && "next" !== a.direction ? !1 : e !== a.currentSlide || p ? a.vars.animationLoop ? !0 : a.atEnd && 0 === a.currentSlide && e === n && "next" !== a.direction ? !1 : a.atEnd && a.currentSlide === n && 0 === e && "next" === a.direction ? !1 : !0 : !1
        }, a.getTarget = function (e) {
            return a.direction = e, "next" === e ? a.currentSlide === a.last ? 0 : a.currentSlide + 1 : 0 === a.currentSlide ? a.last : a.currentSlide - 1
        }, a.setProps = function (e, t, n) {
            var i = function () {
                var n = e ? e : (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo, i = function () {
                    if (u) return "setTouch" === t ? e : d && a.animatingTo === a.last ? 0 : d ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : a.animatingTo === a.last ? a.limit : n;
                    switch (t) {
                        case "setTotal":
                            return d ? (a.count - 1 - a.currentSlide + a.cloneOffset) * e : (a.currentSlide + a.cloneOffset) * e;
                        case "setTouch":
                            return d ? e : e;
                        case "jumpEnd":
                            return d ? e : a.count * e;
                        case "jumpStart":
                            return d ? a.count * e : e;
                        default:
                            return e
                    }
                }();
                return -1 * i + "px"
            }();
            a.transitions && (i = c ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)", n = void 0 !== n ? n / 1e3 + "s" : "0s", a.container.css("-" + a.pfx + "-transition-duration", n), a.container.css("transition-duration", n)), a.args[a.prop] = i, (a.transitions || void 0 === n) && a.container.css(a.args), a.container.css("transform", i)
        }, a.setup = function (e) {
            if (v) a.slides.css({
                width: "100%",
                "float": "left",
                marginRight: "-100%",
                position: "relative"
            }), "init" === e && (s ? a.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + a.vars.animationSpeed / 1e3 + "s ease",
                zIndex: 1
            }).eq(a.currentSlide).css({opacity: 1, zIndex: 2}) : 0 == a.vars.fadeFirstSlide ? a.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(a.currentSlide).css({zIndex: 2}).css({opacity: 1}) : a.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(a.currentSlide).css({zIndex: 2}).animate({opacity: 1}, a.vars.animationSpeed, a.vars.easing)), a.vars.smoothHeight && m.smoothHeight(); else {
                var t, i;
                "init" === e && (a.viewport = $('<div class="' + n + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(a).append(a.container), a.cloneCount = 0, a.cloneOffset = 0, d && (i = $.makeArray(a.slides).reverse(), a.slides = $(i), a.container.empty().append(a.slides))), a.vars.animationLoop && !u && (a.cloneCount = 2, a.cloneOffset = 1, "init" !== e && a.container.find(".clone").remove(), a.container.append(m.uniqueID(a.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(m.uniqueID(a.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), a.newSlides = $(a.vars.selector, a), t = d ? a.count - 1 - a.currentSlide + a.cloneOffset : a.currentSlide + a.cloneOffset, c && !u ? (a.container.height(200 * (a.count + a.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function () {
                    a.newSlides.css({display: "block"}), a.doMath(), a.viewport.height(a.h), a.setProps(t * a.h, "init")
                }, "init" === e ? 100 : 0)) : (a.container.width(200 * (a.count + a.cloneCount) + "%"), a.setProps(t * a.computedW, "init"), setTimeout(function () {
                    a.doMath(), a.newSlides.css({
                        width: a.computedW,
                        "float": "left",
                        display: "block"
                    }), a.vars.smoothHeight && m.smoothHeight()
                }, "init" === e ? 100 : 0))
            }
            u || a.slides.removeClass(n + "active-slide").eq(a.currentSlide).addClass(n + "active-slide"), a.vars.init(a)
        }, a.doMath = function () {
            var e = a.slides.first(), t = a.vars.itemMargin, n = a.vars.minItems, i = a.vars.maxItems;
            a.w = void 0 === a.viewport ? a.width() : a.viewport.width(), a.h = e.height(), a.boxPadding = e.outerWidth() - e.width(), u ? (a.itemT = a.vars.itemWidth + t, a.minW = n ? n * a.itemT : a.w, a.maxW = i ? i * a.itemT - t : a.w, a.itemW = a.minW > a.w ? (a.w - t * (n - 1)) / n : a.maxW < a.w ? (a.w - t * (i - 1)) / i : a.vars.itemWidth > a.w ? a.w : a.vars.itemWidth, a.visible = Math.floor(a.w / a.itemW), a.move = a.vars.move > 0 && a.vars.move < a.visible ? a.vars.move : a.visible, a.pagingCount = Math.ceil((a.count - a.visible) / a.move + 1), a.last = a.pagingCount - 1, a.limit = 1 === a.pagingCount ? 0 : a.vars.itemWidth > a.w ? a.itemW * (a.count - 1) + t * (a.count - 1) : (a.itemW + t) * a.count - a.w - t) : (a.itemW = a.w, a.pagingCount = a.count, a.last = a.count - 1), a.computedW = a.itemW - a.boxPadding
        }, a.update = function (e, t) {
            a.doMath(), u || (e < a.currentSlide ? a.currentSlide += 1 : e <= a.currentSlide && 0 !== e && (a.currentSlide -= 1), a.animatingTo = a.currentSlide), a.vars.controlNav && !a.manualControls && ("add" === t && !u || a.pagingCount > a.controlNav.length ? m.controlNav.update("add") : ("remove" === t && !u || a.pagingCount < a.controlNav.length) && (u && a.currentSlide > a.last && (a.currentSlide -= 1, a.animatingTo -= 1), m.controlNav.update("remove", a.last))), a.vars.directionNav && m.directionNav.update()
        }, a.addSlide = function (e, t) {
            var n = $(e);
            a.count += 1, a.last = a.count - 1, c && d ? void 0 !== t ? a.slides.eq(a.count - t).after(n) : a.container.prepend(n) : void 0 !== t ? a.slides.eq(t).before(n) : a.container.append(n), a.update(t, "add"), a.slides = $(a.vars.selector + ":not(.clone)", a), a.setup(), a.vars.added(a)
        }, a.removeSlide = function (e) {
            var t = isNaN(e) ? a.slides.index($(e)) : e;
            a.count -= 1, a.last = a.count - 1, isNaN(e) ? $(e, a.slides).remove() : c && d ? a.slides.eq(a.last).remove() : a.slides.eq(e).remove(), a.doMath(), a.update(t, "remove"), a.slides = $(a.vars.selector + ":not(.clone)", a), a.setup(), a.vars.removed(a)
        }, m.init()
    }, $(window).blur(function (e) {
        focused = !1
    }).focus(function (e) {
        focused = !0
    }), $.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        fadeFirstSlide: !0,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        customDirectionNav: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function () {
        },
        before: function () {
        },
        after: function () {
        },
        end: function () {
        },
        added: function () {
        },
        removed: function () {
        },
        init: function () {
        }
    }, $.fn.flexslider = function (e) {
        if (void 0 === e && (e = {}), "object" == typeof e) return this.each(function () {
            var t = $(this), a = e.selector ? e.selector : ".slides > li", n = t.find(a);
            1 === n.length && e.allowOneSlide === !0 || 0 === n.length ? (n.fadeIn(400), e.start && e.start(t)) : void 0 === t.data("flexslider") && new $.flexslider(this, e)
        });
        var t = $(this).data("flexslider");
        switch (e) {
            case "play":
                t.play();
                break;
            case "pause":
                t.pause();
                break;
            case "stop":
                t.stop();
                break;
            case "next":
                t.flexAnimate(t.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                t.flexAnimate(t.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof e && t.flexAnimate(e, !0)
        }
    }
}(jQuery);

/*jquery.bxslider.min.js*/
!function (t) {
    var e = {}, s = {
        mode: "horizontal",
        slideSelector: "",
        infiniteLoop: !0,
        hideControlOnEnd: !1,
        speed: 500,
        easing: null,
        slideMargin: 0,
        startSlide: 0,
        randomStart: !1,
        captions: !1,
        ticker: !1,
        tickerHover: !1,
        adaptiveHeight: !1,
        adaptiveHeightSpeed: 500,
        video: !1,
        useCSS: !0,
        preloadImages: "visible",
        responsive: !0,
        slideZIndex: 50,
        touchEnabled: !0,
        swipeThreshold: 50,
        oneToOneTouch: !0,
        preventDefaultSwipeX: !0,
        preventDefaultSwipeY: !1,
        pager: !0,
        pagerType: "full",
        pagerShortSeparator: " / ",
        pagerSelector: null,
        buildPager: null,
        pagerCustom: null,
        controls: !0,
        nextText: "Next",
        prevText: "Prev",
        nextSelector: null,
        prevSelector: null,
        autoControls: !1,
        startText: "Start",
        stopText: "Stop",
        autoControlsCombine: !1,
        autoControlsSelector: null,
        auto: !1,
        pause: 4e3,
        autoStart: !0,
        autoDirection: "next",
        autoHover: !1,
        autoDelay: 0,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 0,
        slideWidth: 0,
        onSliderLoad: function () {
        },
        onSlideBefore: function () {
        },
        onSlideAfter: function () {
        },
        onSlideNext: function () {
        },
        onSlidePrev: function () {
        },
        onSliderResize: function () {
        }
    };
    t.fn.bxSlider = function (n) {
        if (0 == this.length) return this;
        if (this.length > 1) return this.each(function () {
            t(this).bxSlider(n)
        }), this;
        var o = {}, r = this;
        e.el = this;
        var a = t(window).width(), l = t(window).height(), d = function () {
            o.settings = t.extend({}, s, n), o.settings.slideWidth = parseInt(o.settings.slideWidth), o.children = r.children(o.settings.slideSelector), o.children.length < o.settings.minSlides && (o.settings.minSlides = o.children.length), o.children.length < o.settings.maxSlides && (o.settings.maxSlides = o.children.length), o.settings.randomStart && (o.settings.startSlide = Math.floor(Math.random() * o.children.length)), o.active = {index: o.settings.startSlide}, o.carousel = o.settings.minSlides > 1 || o.settings.maxSlides > 1, o.carousel && (o.settings.preloadImages = "all"), o.minThreshold = o.settings.minSlides * o.settings.slideWidth + (o.settings.minSlides - 1) * o.settings.slideMargin, o.maxThreshold = o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin, o.working = !1, o.controls = {}, o.interval = null, o.animProp = "vertical" == o.settings.mode ? "top" : "left", o.usingCSS = o.settings.useCSS && "fade" != o.settings.mode && function () {
                var t = document.createElement("div"), e = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                for (var i in e) if (void 0 !== t.style[e[i]]) return o.cssPrefix = e[i].replace("Perspective", "").toLowerCase(), o.animProp = "-" + o.cssPrefix + "-transform", !0;
                return !1
            }(), "vertical" == o.settings.mode && (o.settings.maxSlides = o.settings.minSlides), r.data("origStyle", r.attr("style")), r.children(o.settings.slideSelector).each(function () {
                t(this).data("origStyle", t(this).attr("style"))
            }), c()
        }, c = function () {
            r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'), o.viewport = r.parent(), o.loader = t('<div class="bx-loading" />'), o.viewport.prepend(o.loader), r.css({
                width: "horizontal" == o.settings.mode ? 100 * o.children.length + 215 + "%" : "auto",
                position: "relative"
            }), o.usingCSS && o.settings.easing ? r.css("-" + o.cssPrefix + "-transition-timing-function", o.settings.easing) : o.settings.easing || (o.settings.easing = "swing"), f(), o.viewport.css({
                width: "100%",
                overflow: "hidden",
                position: "relative"
            }), o.viewport.parent().css({maxWidth: p()}), o.settings.pager || o.viewport.parent().css({margin: "0 auto 0px"}), o.children.css({
                "float": "horizontal" == o.settings.mode ? "left" : "none",
                listStyle: "none",
                position: "relative"
            }), o.children.css("width", u()), "horizontal" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginRight", o.settings.slideMargin), "vertical" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginBottom", o.settings.slideMargin), "fade" == o.settings.mode && (o.children.css({
                position: "absolute",
                zIndex: 0,
                display: "none"
            }), o.children.eq(o.settings.startSlide).css({
                zIndex: o.settings.slideZIndex,
                display: "block"
            })), o.controls.el = t('<div class="bx-controls" />'), o.settings.captions && P(), o.active.last = o.settings.startSlide == x() - 1, o.settings.video && r.fitVids();
            var e = o.children.eq(o.settings.startSlide);
            "all" == o.settings.preloadImages && (e = o.children), o.settings.ticker ? o.settings.pager = !1 : (o.settings.pager && T(), o.settings.controls && C(), o.settings.auto && o.settings.autoControls && E(), (o.settings.controls || o.settings.autoControls || o.settings.pager) && o.viewport.after(o.controls.el)), g(e, h)
        }, g = function (e, i) {
            var s = e.find("img, iframe").length;
            if (0 == s) return i(), void 0;
            var n = 0;
            e.find("img, iframe").each(function () {
                t(this).one("load", function () {
                    ++n == s && i()
                }).each(function () {
                    this.complete && t(this).load()
                })
            })
        }, h = function () {
            if (o.settings.infiniteLoop && "fade" != o.settings.mode && !o.settings.ticker) {
                var e = "vertical" == o.settings.mode ? o.settings.minSlides : o.settings.maxSlides, i = o.children.slice(0, e).clone().addClass("bx-clone"), s = o.children.slice(-e).clone().addClass("bx-clone");
                r.append(i).prepend(s)
            }
            o.loader.remove(), S(), "vertical" == o.settings.mode && (o.settings.adaptiveHeight = !0), o.viewport.height(v()), r.redrawSlider(), o.settings.onSliderLoad(o.active.index), o.initialized = !0, o.settings.responsive && t(window).bind("resize", Z), o.settings.auto && o.settings.autoStart && H(), o.settings.ticker && L(), o.settings.pager && q(o.settings.startSlide), o.settings.controls && W(), o.settings.touchEnabled && !o.settings.ticker && O()
        }, v = function () {
            var e = 0, s = t();
            if ("vertical" == o.settings.mode || o.settings.adaptiveHeight) if (o.carousel) {
                var n = 1 == o.settings.moveSlides ? o.active.index : o.active.index * m();
                for (s = o.children.eq(n), i = 1; i <= o.settings.maxSlides - 1; i++) s = n + i >= o.children.length ? s.add(o.children.eq(i - 1)) : s.add(o.children.eq(n + i))
            } else s = o.children.eq(o.active.index); else s = o.children;
            return "vertical" == o.settings.mode ? (s.each(function () {
                e += t(this).outerHeight()
            }), o.settings.slideMargin > 0 && (e += o.settings.slideMargin * (o.settings.minSlides - 1))) : e = Math.max.apply(Math, s.map(function () {
                return t(this).outerHeight(!1)
            }).get()), e
        }, p = function () {
            var t = "100%";
            return o.settings.slideWidth > 0 && (t = "horizontal" == o.settings.mode ? o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin : o.settings.slideWidth), t
        }, u = function () {
            var t = o.settings.slideWidth, e = o.viewport.width();
            return 0 == o.settings.slideWidth || o.settings.slideWidth > e && !o.carousel || "vertical" == o.settings.mode ? t = e : o.settings.maxSlides > 1 && "horizontal" == o.settings.mode && (e > o.maxThreshold || e < o.minThreshold && (t = (e - o.settings.slideMargin * (o.settings.minSlides - 1)) / o.settings.minSlides)), t
        }, f = function () {
            var t = 1;
            if ("horizontal" == o.settings.mode && o.settings.slideWidth > 0) if (o.viewport.width() < o.minThreshold) t = o.settings.minSlides; else if (o.viewport.width() > o.maxThreshold) t = o.settings.maxSlides; else {
                var e = o.children.first().width();
                t = Math.floor(o.viewport.width() / e)
            } else "vertical" == o.settings.mode && (t = o.settings.minSlides);
            return t
        }, x = function () {
            var t = 0;
            if (o.settings.moveSlides > 0) if (o.settings.infiniteLoop) t = o.children.length / m(); else for (var e = 0, i = 0; e < o.children.length;) ++t, e = i + f(), i += o.settings.moveSlides <= f() ? o.settings.moveSlides : f(); else t = Math.ceil(o.children.length / f());
            return t
        }, m = function () {
            return o.settings.moveSlides > 0 && o.settings.moveSlides <= f() ? o.settings.moveSlides : f()
        }, S = function () {
            if (o.children.length > o.settings.maxSlides && o.active.last && !o.settings.infiniteLoop) {
                if ("horizontal" == o.settings.mode) {
                    var t = o.children.last(), e = t.position();
                    b(-(e.left - (o.viewport.width() - t.width())), "reset", 0)
                } else if ("vertical" == o.settings.mode) {
                    var i = o.children.length - o.settings.minSlides, e = o.children.eq(i).position();
                    b(-e.top, "reset", 0)
                }
            } else {
                var e = o.children.eq(o.active.index * m()).position();
                o.active.index == x() - 1 && (o.active.last = !0), void 0 != e && ("horizontal" == o.settings.mode ? b(-e.left, "reset", 0) : "vertical" == o.settings.mode && b(-e.top, "reset", 0))
            }
        }, b = function (t, e, i, s) {
            if (o.usingCSS) {
                var n = "vertical" == o.settings.mode ? "translate3d(0, " + t + "px, 0)" : "translate3d(" + t + "px, 0, 0)";
                r.css("-" + o.cssPrefix + "-transition-duration", i / 1e3 + "s"), "slide" == e ? (r.css(o.animProp, n), r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                    r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), D()
                })) : "reset" == e ? r.css(o.animProp, n) : "ticker" == e && (r.css("-" + o.cssPrefix + "-transition-timing-function", "linear"), r.css(o.animProp, n), r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                    r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), b(s.resetValue, "reset", 0), N()
                }))
            } else {
                var a = {};
                a[o.animProp] = t, "slide" == e ? r.animate(a, i, o.settings.easing, function () {
                    D()
                }) : "reset" == e ? r.css(o.animProp, t) : "ticker" == e && r.animate(a, speed, "linear", function () {
                    b(s.resetValue, "reset", 0), N()
                })
            }
        }, w = function () {
            for (var e = "", i = x(), s = 0; i > s; s++) {
                var n = "";
                o.settings.buildPager && t.isFunction(o.settings.buildPager) ? (n = o.settings.buildPager(s), o.pagerEl.addClass("bx-custom-pager")) : (n = s + 1, o.pagerEl.addClass("bx-default-pager")), e += '<div class="bx-pager-item"><a href="" data-slide-index="' + s + '" class="bx-pager-link">' + n + "</a></div>"
            }
            o.pagerEl.html(e)
        }, T = function () {
            o.settings.pagerCustom ? o.pagerEl = t(o.settings.pagerCustom) : (o.pagerEl = t('<div class="bx-pager" />'), o.settings.pagerSelector ? t(o.settings.pagerSelector).html(o.pagerEl) : o.controls.el.addClass("bx-has-pager").append(o.pagerEl), w()), o.pagerEl.on("click", "a", I)
        }, C = function () {
            o.controls.next = t('<a class="bx-next" href="">' + o.settings.nextText + "</a>"), o.controls.prev = t('<a class="bx-prev" href="">' + o.settings.prevText + "</a>"), o.controls.next.bind("click", y), o.controls.prev.bind("click", z), o.settings.nextSelector && t(o.settings.nextSelector).append(o.controls.next), o.settings.prevSelector && t(o.settings.prevSelector).append(o.controls.prev), o.settings.nextSelector || o.settings.prevSelector || (o.controls.directionEl = t('<div class="bx-controls-direction" />'), o.controls.directionEl.append(o.controls.prev).append(o.controls.next), o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))
        }, E = function () {
            o.controls.start = t('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + o.settings.startText + "</a></div>"), o.controls.stop = t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + o.settings.stopText + "</a></div>"), o.controls.autoEl = t('<div class="bx-controls-auto" />'), o.controls.autoEl.on("click", ".bx-start", k), o.controls.autoEl.on("click", ".bx-stop", M), o.settings.autoControlsCombine ? o.controls.autoEl.append(o.controls.start) : o.controls.autoEl.append(o.controls.start).append(o.controls.stop), o.settings.autoControlsSelector ? t(o.settings.autoControlsSelector).html(o.controls.autoEl) : o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl), A(o.settings.autoStart ? "stop" : "start")
        }, P = function () {
            o.children.each(function () {
                var e = t(this).find("img:first").attr("title");
                void 0 != e && ("" + e).length && t(this).append('<div class="bx-caption"><span>' + e + "</span></div>")
            })
        }, y = function (t) {
            o.settings.auto && r.stopAuto(), r.goToNextSlide(), t.preventDefault()
        }, z = function (t) {
            o.settings.auto && r.stopAuto(), r.goToPrevSlide(), t.preventDefault()
        }, k = function (t) {
            r.startAuto(), t.preventDefault()
        }, M = function (t) {
            r.stopAuto(), t.preventDefault()
        }, I = function (e) {
            o.settings.auto && r.stopAuto();
            var i = t(e.currentTarget), s = parseInt(i.attr("data-slide-index"));
            s != o.active.index && r.goToSlide(s), e.preventDefault()
        }, q = function (e) {
            var i = o.children.length;
            return "short" == o.settings.pagerType ? (o.settings.maxSlides > 1 && (i = Math.ceil(o.children.length / o.settings.maxSlides)), o.pagerEl.html(e + 1 + o.settings.pagerShortSeparator + i), void 0) : (o.pagerEl.find("a").removeClass("active"), o.pagerEl.each(function (i, s) {
                t(s).find("a").eq(e).addClass("active")
            }), void 0)
        }, D = function () {
            if (o.settings.infiniteLoop) {
                var t = "";
                0 == o.active.index ? t = o.children.eq(0).position() : o.active.index == x() - 1 && o.carousel ? t = o.children.eq((x() - 1) * m()).position() : o.active.index == o.children.length - 1 && (t = o.children.eq(o.children.length - 1).position()), t && ("horizontal" == o.settings.mode ? b(-t.left, "reset", 0) : "vertical" == o.settings.mode && b(-t.top, "reset", 0))
            }
            o.working = !1, o.settings.onSlideAfter(o.children.eq(o.active.index), o.oldIndex, o.active.index)
        }, A = function (t) {
            o.settings.autoControlsCombine ? o.controls.autoEl.html(o.controls[t]) : (o.controls.autoEl.find("a").removeClass("active"), o.controls.autoEl.find("a:not(.bx-" + t + ")").addClass("active"))
        }, W = function () {
            1 == x() ? (o.controls.prev.addClass("disabled"), o.controls.next.addClass("disabled")) : !o.settings.infiniteLoop && o.settings.hideControlOnEnd && (0 == o.active.index ? (o.controls.prev.addClass("disabled"), o.controls.next.removeClass("disabled")) : o.active.index == x() - 1 ? (o.controls.next.addClass("disabled"), o.controls.prev.removeClass("disabled")) : (o.controls.prev.removeClass("disabled"), o.controls.next.removeClass("disabled")))
        }, H = function () {
            o.settings.autoDelay > 0 ? setTimeout(r.startAuto, o.settings.autoDelay) : r.startAuto(), o.settings.autoHover && r.hover(function () {
                o.interval && (r.stopAuto(!0), o.autoPaused = !0)
            }, function () {
                o.autoPaused && (r.startAuto(!0), o.autoPaused = null)
            })
        }, L = function () {
            var e = 0;
            if ("next" == o.settings.autoDirection) r.append(o.children.clone().addClass("bx-clone")); else {
                r.prepend(o.children.clone().addClass("bx-clone"));
                var i = o.children.first().position();
                e = "horizontal" == o.settings.mode ? -i.left : -i.top
            }
            b(e, "reset", 0), o.settings.pager = !1, o.settings.controls = !1, o.settings.autoControls = !1, o.settings.tickerHover && !o.usingCSS && o.viewport.hover(function () {
                r.stop()
            }, function () {
                var e = 0;
                o.children.each(function () {
                    e += "horizontal" == o.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0)
                });
                var i = o.settings.speed / e, s = "horizontal" == o.settings.mode ? "left" : "top", n = i * (e - Math.abs(parseInt(r.css(s))));
                N(n)
            }), N()
        }, N = function (t) {
            speed = t ? t : o.settings.speed;
            var e = {left: 0, top: 0}, i = {left: 0, top: 0};
            "next" == o.settings.autoDirection ? e = r.find(".bx-clone").first().position() : i = o.children.first().position();
            var s = "horizontal" == o.settings.mode ? -e.left : -e.top, n = "horizontal" == o.settings.mode ? -i.left : -i.top, a = {resetValue: n};
            b(s, "ticker", speed, a)
        }, O = function () {
            o.touch = {start: {x: 0, y: 0}, end: {x: 0, y: 0}}, o.viewport.bind("touchstart", X)
        }, X = function (t) {
            if (o.working) t.preventDefault(); else {
                o.touch.originalPos = r.position();
                var e = t.originalEvent;
                o.touch.start.x = e.changedTouches[0].pageX, o.touch.start.y = e.changedTouches[0].pageY, o.viewport.bind("touchmove", Y), o.viewport.bind("touchend", V)
            }
        }, Y = function (t) {
            var e = t.originalEvent, i = Math.abs(e.changedTouches[0].pageX - o.touch.start.x), s = Math.abs(e.changedTouches[0].pageY - o.touch.start.y);
            if (3 * i > s && o.settings.preventDefaultSwipeX ? t.preventDefault() : 3 * s > i && o.settings.preventDefaultSwipeY && t.preventDefault(), "fade" != o.settings.mode && o.settings.oneToOneTouch) {
                var n = 0;
                if ("horizontal" == o.settings.mode) {
                    var r = e.changedTouches[0].pageX - o.touch.start.x;
                    n = o.touch.originalPos.left + r
                } else {
                    var r = e.changedTouches[0].pageY - o.touch.start.y;
                    n = o.touch.originalPos.top + r
                }
                b(n, "reset", 0)
            }
        }, V = function (t) {
            o.viewport.unbind("touchmove", Y);
            var e = t.originalEvent, i = 0;
            if (o.touch.end.x = e.changedTouches[0].pageX, o.touch.end.y = e.changedTouches[0].pageY, "fade" == o.settings.mode) {
                var s = Math.abs(o.touch.start.x - o.touch.end.x);
                s >= o.settings.swipeThreshold && (o.touch.start.x > o.touch.end.x ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto())
            } else {
                var s = 0;
                "horizontal" == o.settings.mode ? (s = o.touch.end.x - o.touch.start.x, i = o.touch.originalPos.left) : (s = o.touch.end.y - o.touch.start.y, i = o.touch.originalPos.top), !o.settings.infiniteLoop && (0 == o.active.index && s > 0 || o.active.last && 0 > s) ? b(i, "reset", 200) : Math.abs(s) >= o.settings.swipeThreshold ? (0 > s ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto()) : b(i, "reset", 200)
            }
            o.viewport.unbind("touchend", V)
        }, Z = function () {
            var e = t(window).width(), i = t(window).height();
            (a != e || l != i) && (a = e, l = i, r.redrawSlider(), o.settings.onSliderResize.call(r, o.active.index))
        };
        return r.goToSlide = function (e, i) {
            if (!o.working && o.active.index != e) if (o.working = !0, o.oldIndex = o.active.index, o.active.index = 0 > e ? x() - 1 : e >= x() ? 0 : e, o.settings.onSlideBefore(o.children.eq(o.active.index), o.oldIndex, o.active.index), "next" == i ? o.settings.onSlideNext(o.children.eq(o.active.index), o.oldIndex, o.active.index) : "prev" == i && o.settings.onSlidePrev(o.children.eq(o.active.index), o.oldIndex, o.active.index), o.active.last = o.active.index >= x() - 1, o.settings.pager && q(o.active.index), o.settings.controls && W(), "fade" == o.settings.mode) o.settings.adaptiveHeight && o.viewport.height() != v() && o.viewport.animate({height: v()}, o.settings.adaptiveHeightSpeed), o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex: 0}), o.children.eq(o.active.index).css("zIndex", o.settings.slideZIndex + 1).fadeIn(o.settings.speed, function () {
                t(this).css("zIndex", o.settings.slideZIndex), D()
            }); else {
                o.settings.adaptiveHeight && o.viewport.height() != v() && o.viewport.animate({height: v()}, o.settings.adaptiveHeightSpeed);
                var s = 0, n = {left: 0, top: 0};
                if (!o.settings.infiniteLoop && o.carousel && o.active.last) if ("horizontal" == o.settings.mode) {
                    var a = o.children.eq(o.children.length - 1);
                    n = a.position(), s = o.viewport.width() - a.outerWidth()
                } else {
                    var l = o.children.length - o.settings.minSlides;
                    n = o.children.eq(l).position()
                } else if (o.carousel && o.active.last && "prev" == i) {
                    var d = 1 == o.settings.moveSlides ? o.settings.maxSlides - m() : (x() - 1) * m() - (o.children.length - o.settings.maxSlides), a = r.children(".bx-clone").eq(d);
                    n = a.position()
                } else if ("next" == i && 0 == o.active.index) n = r.find("> .bx-clone").eq(o.settings.maxSlides).position(), o.active.last = !1; else if (e >= 0) {
                    var c = e * m();
                    n = o.children.eq(c).position()
                }
                if ("undefined" != typeof n) {
                    var g = "horizontal" == o.settings.mode ? -(n.left - s) : -n.top;
                    b(g, "slide", o.settings.speed)
                }
            }
        }, r.goToNextSlide = function () {
            if (o.settings.infiniteLoop || !o.active.last) {
                var t = parseInt(o.active.index) + 1;
                r.goToSlide(t, "next")
            }
        }, r.goToPrevSlide = function () {
            if (o.settings.infiniteLoop || 0 != o.active.index) {
                var t = parseInt(o.active.index) - 1;
                r.goToSlide(t, "prev")
            }
        }, r.startAuto = function (t) {
            o.interval || (o.interval = setInterval(function () {
                "next" == o.settings.autoDirection ? r.goToNextSlide() : r.goToPrevSlide()
            }, o.settings.pause), o.settings.autoControls && 1 != t && A("stop"))
        }, r.stopAuto = function (t) {
            o.interval && (clearInterval(o.interval), o.interval = null, o.settings.autoControls && 1 != t && A("start"))
        }, r.getCurrentSlide = function () {
            return o.active.index
        }, r.getCurrentSlideElement = function () {
            return o.children.eq(o.active.index)
        }, r.getSlideCount = function () {
            return o.children.length
        }, r.redrawSlider = function () {
            o.children.add(r.find(".bx-clone")).outerWidth(u()), o.viewport.css("height", v()), o.settings.ticker || S(), o.active.last && (o.active.index = x() - 1), o.active.index >= x() && (o.active.last = !0), o.settings.pager && !o.settings.pagerCustom && (w(), q(o.active.index))
        }, r.destroySlider = function () {
            o.initialized && (o.initialized = !1, t(".bx-clone", this).remove(), o.children.each(function () {
                void 0 != t(this).data("origStyle") ? t(this).attr("style", t(this).data("origStyle")) : t(this).removeAttr("style")
            }), void 0 != t(this).data("origStyle") ? this.attr("style", t(this).data("origStyle")) : t(this).removeAttr("style"), t(this).unwrap().unwrap(), o.controls.el && o.controls.el.remove(), o.controls.next && o.controls.next.remove(), o.controls.prev && o.controls.prev.remove(), o.pagerEl && o.settings.controls && o.pagerEl.remove(), t(".bx-caption", this).remove(), o.controls.autoEl && o.controls.autoEl.remove(), clearInterval(o.interval), o.settings.responsive && t(window).unbind("resize", Z))
        }, r.reloadSlider = function (t) {
            void 0 != t && (n = t), r.destroySlider(), d()
        }, d(), this
    }
}(jQuery);



/*main.js*/
function web_wrap() {
    var W = $(window).width();
    var H = $(window).height();
    if (W < 768) {
        $(".header-top").removeClass("pc").removeClass("vt").removeClass("vt880").removeClass("mob").addClass("mob");
        $('body').removeClass("vt").removeClass("vt880").removeClass("pc").addClass("mob");
        $('.cm-list>a').removeClass('cm-order');
        $(".co-customer-info").find("div").eq(1).addClass('.co-activity-field');

    } else if (W < 980 & W > 767) {
        $(".header-top").removeClass("mob").removeClass("pc").addClass("vt");
        $('body').removeClass("mob").removeClass("pc").addClass("vt");
        $('.cm-list>a').removeClass('cm-order');
        if ($("#m_p_list").hasClass("hover")) {
            $(".dropdown-menu").fadeIn();
        }
        if (W < 880) {
            $(".header-top").addClass("vt880");
            $('body').addClass("vt880");
        }

        if (slider) {
            slider.destroySlider();
        }
        //top kpi page issue fixed
        $(".tab2").removeClass("active");
        $(".tab1").addClass("active");
        $(".tabcontent1").removeAttr("style");
        $(".toggleTitle").removeClass("toggleactive");
        $(".tabcontent1 .toggleTitle").addClass("toggleactive");
        if ($(".toggleContent").attr("style")) {
            $(".toggleContent").removeAttr("style");
        }
    } else {
        $(".header-top").removeClass("vt").removeClass("vt880").removeClass("mob").addClass("pc");
        $('body').removeClass("vt").removeClass("vt880").removeClass("mob").addClass("pc");
        if ($(".header-top .nav-bar,#primary-nav, #myCon").is(":hidden")) {
            $(".header-top .nav-bar,#primary-nav, #myCon").fadeIn("fast");
        }
        if ($("#m_p_list").hasClass("hover")) {
            $(".dropdown-menu").removeAttr("style");
        }
        if ($(".cat-box").attr("style")) {
            $(".cat-box").removeAttr("style");
        }
        if ($("#mask").attr("style")) {
            $("#mask").removeAttr("style");
        }
        if ($(".tabcontents>div").attr("style")) {
            $(".tabcontents>div").removeAttr("style");
        }
        if ($(".toggleContent").attr("style")) {
            $(".toggleContent").removeAttr("style");
        }
    }

    if (W < 375) {
        $('.cm-mob-titlelist').css('width', '280px');
        $('.cm-mob-titlelist span').eq(3).css('display', 'none');
    }
    if (W > 1024) {
        $('.pc-list-total').addClass('.sa-list-total').css('left', '66.5%');
        $('.col-order-date span').css('padding-right', '4.5%');
    }
}

//check whether the device is mobile
function del_wrap() {
    var W = $(window).width();
    if (W < 769) {
    }
}

function isMobile() {
    var regExp = /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|iPad/i;
    if (navigator.userAgent.match(regExp)) {
        return true;
    } else {
        return false;
    }
}

$(window).scroll(function () {
    // 滚动条距离顶部的距离 大于 200px时display: block; width: 615%; position: relative; transition-duration: 0.5s; transform: translate3d(-131px, 0px, 0px);
    if ($(window).scrollTop() >= 60) {
        if ($("#m_nav").is(":visible")) {
            $(".header").css("position", "relative");
        } else {
            $(".header").css("position", "fixed");
        }
    } else {
        $(".header").css("position", "relative");
    }
});
var slider, slider_pc, slider_m;

function m_slider(obj) {
    slider = $(obj).bxSlider({
        pager: false,
        controls: false,
        minSlides: 2,
        maxSlides: 100,
        slideWidth: 106,
        infiniteLoop: false,
    });
}

//validate whether it support 'placeholder' attribute for input
function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}


//CartOverlay - if pNum > 0 will show the details, if pNum <= 0 will show a link
function cartOverlayShow(pNum) {
    if (pNum > 0) {
        $(".order-my .ord-details").css("display", "block");
        $(".order-my .ord-nodata").css("display", "none");
    } else {
        $(".order-my .ord-details").css("display", "none");
        $(".order-my .ord-nodata").css("display", "block");
    }
}

//product list AD-block sliders 
var promo_slider;


$(function () {
    $('body').addClass("vt");
    //shopping-cart 点击mask iframe消失 begin
    $("#additional-buy-ID").on("click", function () {
        if (!$(".mask-content1").hasClass("additional-buy-iframe")) {
            $("#mask").show();
            $(".mask-content").show();
            $(".mask-content1").addClass("additional-buy-iframe");
            $('html').toggleClass('body-fixed');

        }
    });
    $(".mask-content").on("click", ".additional-buy-iframe", function (e) {
        e.stopPropagation();
    });
    $(".mask-content").on("click", function () {
        $(this).hide();
        $(".additional-buy-iframe").hide();
        $("#mask").hide();
        $('html').removeClass('body-fixed');
        $(".mask-content1").removeClass("additional-buy-iframe");
    });
    $("#close-mask").on("click", function () {
        $(".additional-buy-iframe").hide();
        $(".mask-content").hide();
        $("#mask").hide();
        $('html').removeClass('body-fixed');
        $(".mask-content1").removeClass("additional-buy-iframe");
    });

    //shopping-cart 点击mask iframe消失 end
    //10/12 angela cancel
    // //shopping-cart 点击mask mask-container消失 begin
    // $("#sc-panel1 .product-img,#sc-panel2 .product-img,.oc-orderlist .product-img,.od-orderlist .product-img,#sc-panel1 .name,#sc-panel2 .name,.oc-orderlist .name,.od-orderlist .name").on("click",function(){
    // if(!$(".mask-content1").hasClass("mask-container")){
    // $("#mask").show();
    // $(".mask-content").show();
    // $(".mask-content1").addClass("mask-container");
    // $(".mask-container").show();
    // $('html').toggleClass('body-fixed');
    // }
    // });
    $(".mask-content").on("click", ".mask-container", function (e) {
        e.stopPropagation();
    });
    $(".mask-content").on("click", function () {
        $(this).hide();
        $(".mask-container").hide();
        $("#mask").hide();
        $('html').removeClass('body-fixed');
        $(".mask-content1").removeClass("mask-container");
    });
    $("#close-mask1").on("click", function () {
        $(".mask-container").hide();
        $(".mask-content").hide();
        $("#mask").hide();
        $('html').removeClass('body-fixed');
        $(".mask-content1").removeClass("mask-container");
    });
    //shopping-cart 点击mask mask-container消失 end

    //order-confirm 点击用户条款和法律声明 begin 20161109 Angela add
    $(".business-license").click(function () {
        var topBottom = ($(window).height() - 460) / 2;
        $(".license-iframe").css({"top": topBottom, "bottom": topBottom, "left": "5%", "right": "5%"});
        if (!$(".mask-content1").hasClass("license-iframe")) {
            $("#mask").show();
            $(".mask-content").show();
            $(".mask-content1").addClass("license-iframe");
            $(".license-iframe").show();
            $('html').toggleClass('body-fixed');
        }
    });
    $(".mask-content").on("click", ".mask-container", function (e) {
        e.stopPropagation();
    });
    $(".mask-content").on("click", function () {
        $(this).hide();
        $(".license-iframe").hide();
        $("#mask").hide();
        $('html').removeClass('body-fixed');
        $(".mask-content1").removeClass("license-iframe");
    });
    $("#close-mask1").on("click", function () {
        $(".license-iframe").hide();
        $(".mask-content").hide();
        $("#mask").hide();
        $('html').removeClass('body-fixed');
        $(".mask-content1").removeClass("license-iframe");
    });
    //order-confirm 点击用户条款和法律声明 end


    web_wrap();
    del_wrap();
    $(window).resize(function () {
        web_wrap();
        del_wrap();
        /* 		if(slider){slider.reload();}
                if(slider_pc){slider_pc.reloadSlider();}
                if(slider_m){slider_m.reloadSlider();} */
        $('.order-my').css("display", "none");
        $('.cart-menu').removeClass('hover');
    });
    var W = $(window).width();

    // 判断浏览器是否支持 placeholder

    function inputCheck() {
        if (!placeholderSupport()) {
            var pwdField = $("input[type=password]");
            for (var i = 0; i < pwdField.length; i++) {
                var pwdVal = pwdField.eq(i).attr('placeholder');
                pwdField.eq(i).after('<input class="text-model" type="text" value=' + pwdVal + ' />');
                pwdField.hide();
                var textTemp = $('.text-model');
                textTemp.eq(i).focus(function () {
                    var org = $(this).prev("input[type=password]")
                    $(this).hide();
                    org.show().focus();
                })

                pwdField.eq(i).blur(function () {
                    if ($(this).val() == '') {
                        $(this).hide();
                        $(this).next("input[type=text]").show();
                    }
                })

            }
            $('[placeholder]').focus(function () {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function () {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            });

        }
    }

    $(window).load(function () {
        inputCheck();
        $(".fpB-verifyno").blur();
        $("#login-userno").blur();
        $(".fh-verifyno").blur();
    });
    //IE8对password框的特殊处理1.创建一个text框 2获取焦点和失去焦点的时候切换
    // var pwdField    = $("input[type=password]");
    // var pwdVal      = pwdField.attr('placeholder');
    // pwdField.after('<input id="pwdPlaceholder" type="text" value='+pwdVal+' autocomplete="off" />');
    // var pwdPlaceholder = $('#pwdPlaceholder');
    // pwdPlaceholder.show();
    // pwdField.hide();

    // pwdPlaceholder.focus(function(){
    // pwdPlaceholder.hide();
    // pwdField.show();
    // pwdField.focus();
    // });

    // pwdField.blur(function(){
    // if(pwdField.val() == '' ||pwdField.val() == '密码' ||pwdField.val() == '设定新密码' ||pwdField.val() == '重复填写密码') {
    // pwdPlaceholder.show();
    // pwdField.hide();
    // }
    // });

    /* for About page */
    $(".about-intro-more .more-btn").click(function () {
        $('.about-intro .read-more').fadeIn();
        $('.about-intro-more').hide();
    });

    $('.tab1').click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $('.tabcontent1').show();
        $('.tabcontent2').hide();
    });
    $('.tab2').click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $('.tabcontent1').hide();
        $('.tabcontent2').show();

    });


    $('.toggleTitle').click(function () {
        if ($(this).hasClass("toggleactive")) {
            $(this).removeClass("toggleactive");
            $(this).parent().css("height", "30");
            $(this).nextAll().hide();
        } else {
            $('.toggleactive').nextAll().hide();
            $('.toggleTitle').removeClass("toggleactive");
            $(this).addClass("toggleactive");
            $(this).parent().css("height", "auto");
            $(this).nextAll().show();
        }

    });
    //login function --start--modify by liaojl liguofeng
    $("#login-btn").click(function () {
        var errMsg = $("#errMsg");
        if ($("input[name='userno']").val() == '' || $("input[name='userno']").val() == $("input[name='userno']").attr("placehoder")) {
            //alert("请输入正确的"+$("input[name='userno']").attr("placeholder"));
            errMsg.html(" * " + "请输入正确的" + $("input[name='userno']").attr("placeholder"));
            $("input[name='userno']").focus();
            return false;
        }
        if ($("input[name='password']").val() == '' || $("input[name='password']").val() == $("input[name='password']").attr("placehoder")) {
            //alert("请输入正确的"+$("input[name='password']").attr("placeholder"));
            errMsg.html(" * " + "请输入正确的" + $("input[name='password']").attr("placeholder"));
            $("input[name='password']").focus();
            return false;
        }
        //$("form[name='login-frm']").submit();
        user.login();
    });
    //--end--modify by liaojl
    /* main navigation hover beginning*/
    $('.pc #primary-nav li').hover(function () {
            if ($("#log-successful").is(":visible") && $(".sub_my").is(":visible")) {
                $(".sub_my").fadeOut("fast");
            }
            $(this).addClass('hover').children('ul').fadeIn('fast');
        },
        function () {
            $(this).removeClass('hover').children('ul').fadeOut('fast');
        });
    /* main navigation hover ending*/
    /* main navigation click beginning */
    $('.pc #primary-nav li').click(function () {
        if ($(this).hasClass("hover")) {
            $(this).removeClass('hover');

        } else {
            $('#primary-nav li').removeClass("hover");
            if ($("#log-successful").is(":visible") && $(".sub_my").is(":visible")) {
                $(".sub_my").fadeOut("fast");
            }
            $(this).addClass('hover');
        }

    });

    //阻止冒泡
    function stopPropagation(e) {
        e = e || window.event;
        if (e.stopPropagation) { //W3C阻止冒泡方法
            e.stopPropagation();
        } else {
            e.cancelBubble = true; //IE阻止冒泡方法
        }
    }


    /*
        $('#order-cart').click(function() {// 修改点击购物车出现下拉菜单的问题  hy2017-03-02
            var W = $(window).width();
            if(W <979) {
                if($('#m_nav').is(":hidden")) {
                    $(this).addClass('active_btn');
                    $('#m_nav').fadeIn('fast');
                    $(".header-top").css({"padding-bottom":"60px"});
                    return false;
                }
               else {
                    $(this).removeClass('active_btn');
                    $('#m_nav').fadeOut('fast');
                    $(".header-top").css({"padding-bottom":"0px"});
                    return false;
                }
            }
        });	*/
    // //cart overlay begin - pc 修改闪烁情况angela0519   11/8 Angela cancel 改用css控制

    // $(window).resize(function(){
    // $('.cart-menu').removeClass('hover');
    // //$(".order-my").hide();
    // var W = $(window).width();
    // if(W > 979) {
    // $('#order-cart').hover(function(){
    // if($('.order-my').is(":hidden")) {
    // $('.cart-menu').addClass('hover');
    // $(".order-my").show();

    // }else{
    // $('.cart-menu').removeClass('hover');
    // $(".order-my").hide();
    // }
    // });
    // }
    // })
    // $(window).load(function(){
    // $('.cart-menu').removeClass('hover');
    // //$(".order-my").hide();
    // var W = $(window).width();
    // if(W > 979) {
    // $('#order-cart').hover(function(){
    // if($('.order-my').is(":hidden")) {
    // $('.cart-menu').addClass('hover');
    // $(".order-my").show();

    // }else{
    // $('.cart-menu').removeClass('hover');
    // $(".order-my").hide();

    // }
    // });
    // }
    // })

    // //cart overlay end - pc 修改闪烁情况angela0519


    //cart overlay - mobile
    $('#mob-cart-menu').click(function () {
        var W = $(window).width();
        if (W < 980 || W > 1024) {
            window.location.href = "shopping-cart.html"; // 修改点击购物车不跳的问题  hy2017-03-02
        }
    });
    $('#pay-btn').click(function () {
        //window.location.href = "shopping-cart.html";
    })
    $('#pay-btn.pay-btn-MCD').click(function () {
        //window.location.href = "shopping-cart-MCD.html";
    })
    /*	$('.order-my').click(function(e) {
            stopPropagation(e);
        });*/

    /* main navigation click ending */


    //my-acc click event
    var flg = 'none';
    $('.my-acc').click(function () {
        if (flg == 'none') {
            $(".sub_my").css('display', 'none');
        }

        if ($(".sub_my").css('display') == 'block') {
            $(".sub_my").css('display', 'none');
        } else {
            $(".sub_my").css('display', 'block');
            flg = 'block';
        }
    })
    $('.sub_my li').click(function (e) {
        stopPropagation(e);
    });


    $('.pc #accFather').hover(function () {

            if ($('.sub_my').is(":hidden")) {
                $(this).find('.my-acc').addClass('hover');
                $(".sub_my").show();
                $(".account-mask").show();
            }
        },
        function () {
            if ($(this).find('.my-acc').hasClass('hover')) {
                $(this).find('.my-acc').removeClass('hover');
                $(".sub_my").hide();
                setTimeout(function () {
                    $(".account-mask").hide();
                }, 1000)

            }
        });

    $('.my-acc').on("click", function () {
        if (!$(this).hasClass('hover')) {
            $(this).addClass("hover");
            $(this).removeClass("extraclass1");
            $('.sub_my').show();

        } else {
            $('.sub_my').css('display', 'none');
            $('.my-acc').removeClass("hover");
            $(this).addClass("extraclass1");

        }

    });


    // $('#accFather').hover(function() {
    // var W = $(window).width();
    // if(W > 979){
    // if($('.sub_my').is(":hidden")) {
    // $(this).find('.my-acc').addClass('hover');
    // $(".sub_my").fadeIn('fast');
    // return false;
    // }else{
    // $(this).find('.my-acc').removeClass('hover');
    // $(".sub_my").fadeOut('fast');
    // return false;
    // }
    // }
    // });
    /*hambergur menu click event beginning  */
    $('#nav_btn').click(function () {
        if ($('#m_nav').is(":hidden")) {
            $(this).addClass('active_btn');
            $('#m_nav').fadeIn('fast');
            $("body").scrollTop(0);
            $(".header-top").css({"padding-bottom": "60px"});
            return false;
        }
        else {
            $(this).removeClass('active_btn');
            $('#m_nav').fadeOut('fast');
            $(".header-top").css({"padding-bottom": "0px"});
            return false;
        }
    });
    /*hambergur menu click event ending  */
    /* header images sliders on Homepage beginning*/
    $("#heroImg").flexslider({
        animation: "slide",
        directionNav: false
    });
    /* header images slider on Homepage ending*/
    /* Advertisement sliders on Homepage beginning*/
    $("#slider-box").flexslider({
        animation: "slide",
        directionNav: false,
        slideshowSpeed: 9000
    });
    $(".flexslider").flexslider({
        animation: "slide",
        controlNav: "thumbnails"
    });
    /* Advertisement sliders on Homepage ending*/
    /* add to cart button click */
    // $(".cart-add-btn").click(function(){                                           //20161205 Angela cancel根据swire要求针对jira1595
    // $(this).removeClass("cart-add-btn").addClass("cart-progress");
    // $(this).text("处理中");
    // });

    $(".cart-add-btn").not(".additionalProduct-add-btn").click(function () {       //20161205 Angela add根据swire要求针对jira1595
                                                                                   //$(this).removeClass("cart-add-btn").addClass("cart-progress");
                                                                                   //$(this).text("处理中");
        addCart(this);
    });

    /* products category menus show or hide on phone beginning*/
    $('#m_p_list').click(function () {
        if (!$(this).hasClass('hover')) {
            $(this).addClass('hover');
            $("#primary-nav").fadeIn();
            $("#primary-nav .dropdown-menu").fadeIn();
            if (isMobile()) {
                m_slider($("#primary-nav .dropdown-menu"));
            }
            ;
        } else {
            $(this).removeClass('hover');
            $("#primary-nav").fadeOut();
            $("#primary-nav .dropdown-menu").fadeOut();
        }
        return false
    });
    /* products category menus show or hide on phone ending*/
    /* search button click event beginning*/

    /*$(".pc .btn-s").click(function(){	//处理2022
            $("div").scrollTop(0);
            $(".pc .form-control").focus();
            return false;
    });*/
    /* search button click event ending*/
    /* search button function  */
    $(".search_box button").click(function () {
        $("div").scrollTop(0);
        $(".search_box form").submit();
    });

    $(".pc .filter-btn").hover(function () {
        $(this).addClass("hover");

    }, function () {
        $(this).removeClass("hover");
    });
    //移动端点击选中，再点击取消
//	$(".mob .filter-btn").click(function(){
//		if(!$(this).hasClass("hover")){
//			 $(this).addClass("hover");
//			 $(this).next().css("color","#FFF");
//		}else{
//		 $(this).removeClass("hover");
//		 $(this).next().css("color","#ce322b");
//	}
//	});

    /* photos slider on product detail page beginning  */
    $(".photos-slider").bxSlider({
        pagerCustom: '#bx-pager',
        slideMargin: 1,
        nextSelector: '#photo_next',
        prevSelector: '#photo_prev',
    });
    /* photos slider on product detail page ending  */

    // the AD-block sliders on product list Page
    if (W > 980) {
        var slideWidth = $(window).width() / 4;
        if (W <= 1024) {
            slideWidth = $(window).width() / 4;
        }
        promo_slider = $('#promotion-list').bxSlider({
            minSlides: 1,
            maxSlides: 4,
            slideWidth: slideWidth,
            infiniteLoop: false,
            hideControlOnEnd: true,
            controls: true,
            pager: false
        });
    } else {
        promo_slider = $('#promotion-list').bxSlider({
            minSlides: 1,
            controls: true,

            pager: false
        });
    }

    //social-media 微信图标等点击出现二维码滚动事件 begin
    $(".QR-code-click").click(function () {
        if ($('.QR-code-mask1').is(":hidden")) {
            $(".QR-code-mask1").show();
            $(".QR-code-mask2").hide();
            $(".QR-code-mask3").hide();
            $(".QR-slides-title1").show();
            $(".QR-slides-title2").hide();
            $(".QR-slides-title3").hide();
            $(document).scrollTop($('body').height());
            if (W > 980) {
                var slideWidth = $(window).width() / 5;
                if (W <= 1024) {
                    var slideWidth = $(window).width() / 5;
                }
                var wrapper = $('.QR-code-mask1').find('.bx-wrapper');
                if (wrapper.length === 0) {
                    promo_slider = $('.QR-code-mask1 #QR-list1').bxSlider({
                        minSlides: 1,
                        maxSlides: 5,
                        slideWidth: slideWidth,
                        infiniteLoop: false,
                        hideControlOnEnd: true,
                        controls: true,
                        pager: false
                    });
                }
            } else {
                var wrapper = $('.QR-code-mask1').find('.bx-wrapper');
                if (wrapper.length === 0) {
                    promo_slider = $('#QR-list1').bxSlider({
                        minSlides: 1,
                        controls: true,

                        pager: false
                    });
                }
            }
        }

    })
    //改善IOS微信浏览器点击footer的二维码图标出现闪屏2064/ 20170228
    $(".wechat-click").click(function () {
        if ($('.QR-code-mask2').is(":hidden")) {
            $(".QR-code-mask2").show();
            $(".QR-code-mask1").hide();
            $(".QR-code-mask3").hide();
            $(".QR-slides-title1").hide();
            $(".QR-slides-title2").show();
            $(".QR-slides-title3").hide();
            $('body').scrollTop($('body').height());
            if (W > 980) {
                var slideWidth = $(window).width() / 5;
                if (W <= 1024) {
                    var slideWidth = $(window).width() / 5;
                }
                var wrapper = $('.QR-code-mask2').find('.bx-wrapper');
                if (wrapper.length === 0) {
                    promo_slider = $('.QR-code-mask2 #QR-list2').bxSlider({
                        minSlides: 1,
                        maxSlides: 5,
                        slideWidth: slideWidth,
                        infiniteLoop: false,
                        hideControlOnEnd: true,
                        controls: true,
                        pager: false
                    });
                }
            } else {
                var wrapper = $('.QR-code-mask2').find('.bx-wrapper');
                if (wrapper.length === 0) {
                    promo_slider = $('#QR-list2').bxSlider({
                        minSlides: 1,
                        controls: true,

                        pager: false
                    });
                }
            }
        }

    })
    $(".sina-click").click(function () {
        if ($('.QR-code-mask3').is(":hidden")) {
            $(".QR-code-mask3").show();
            $(".QR-code-mask1").hide();
            $(".QR-code-mask2").hide();
            $(".QR-slides-title1").hide();
            $(".QR-slides-title2").hide();
            $(".QR-slides-title3").show();
            $(document).scrollTop($('body').height());
            if (W > 980) {
                var slideWidth = $(window).width() / 5;
                if (W <= 1024) {
                    var slideWidth = $(window).width() / 5;
                }
                var wrapper = $('.QR-code-mask3').find('.bx-wrapper');
                if (wrapper.length === 0) {
                    promo_slider = $('.QR-code-mask3 #QR-list3').bxSlider({
                        minSlides: 1,
                        maxSlides: 5,
                        slideWidth: slideWidth,
                        infiniteLoop: false,
                        hideControlOnEnd: true,
                        controls: true,
                        pager: false
                    });
                }
            } else {
                var wrapper = $('.QR-code-mask3').find('.bx-wrapper');
                if (wrapper.length === 0) {
                    promo_slider = $('#QR-list3').bxSlider({
                        minSlides: 1,
                        controls: true,

                        pager: false
                    });
                }
            }
        }

    })

    $(".QR-code-mask1 .close-reveal-modal").click(function () {
        $(".QR-code-mask1").hide();
        promo_slider.destroySlider();

    })
    $(".QR-code-mask2 .close-reveal-modal").click(function () {
        $(".QR-code-mask2").hide();
        promo_slider.destroySlider();

    })
    $(".QR-code-mask3 .close-reveal-modal").click(function () {
        $(".QR-code-mask3").hide();
        promo_slider.destroySlider();

    })

    //social-media 微信图标等点击出现二维码滚动事件 end


    /* product ad slider beginning */

    var slideWidth = ($(window).width() - 280) / 3;
    if (W <= 1024) {
        slideWidth = ($(window).width() - 160) / 3;
    }
    //if image number > 3 will show prev and next in pc
    $('#product-ads').bxSlider({
        minSlides: 1,
        maxSlides: 3,
        slideWidth: 315,
        controls: true,
        pager: false
    });
    $('#videos').bxSlider({
        minSlides: 1,
        maxSlides: 3,
        slideWidth: 315,
        controls: true,
        pager: false
    });

    /* product ad slider ending */

    //展开当前搜索条件，折叠其它搜索文件，BY ZKF
    $(".cat-nav li").click(function () {
        $.each($(".cat-items > li"), function (index, item) {
            $(item).removeClass("hover");
        });
        $(".cat-items > li").eq($(this).index()).addClass("hover");
    });

    $(".cat-items > li > a").click(function (e) {
        if ($(this).parent().hasClass("hover")) {
            $(this).parent().removeClass("hover");
        } else {
            $(this).parent().addClass("hover");
        }
    });

    // topkpi mobile error ,update by zkf
    $(".siderbar-toggle").click(function () {
        var height = $(".list-box").height();
        //$("#mask").css({"height":height+20});
        $(".cat-box").toggle("fast");


    });

    //processing the data of pagination
    $("#pro-list-prev").click(function () {
        var height = $(".list-box").height();
        var height = $("#mask").css({"height": height + 20});
        $("#mask").fadeIn();
        $("#hint_content").fadeIn();
        /*放数据处理代码块*/
        setTimeout(function () {
            $("#hint_content").fadeOut();
            $("#mask").fadeOut();
        }, 1000);

    });
    $("#pro-list-next").click(function () {
        var height = $(".list-box").height();
        var height = $("#mask").css({"height": height + 20});
        $("#mask").fadeIn();
        $("#hint_content").fadeIn();
        /*放数据处理代码块*/
        setTimeout(function () {
            $("#hint_content").fadeOut();
            $("#mask").fadeOut();
        }, 1000);

    });
    /* for product list page ending */

    /* for Account page beginning */
    //click button named more
    $(".account-tb .more-btn").click(function () {
        $(".toggle-tb").fadeIn("fast");
        $(this).fadeOut("fast");
        return false;
    });

    $(".account-info a").click(function () {
        if ($(this).parent(".col-title").parent(".col-md-6").hasClass("hover")) {
            $(this).parent(".col-title").parent(".col-md-6").removeClass("hover");
        } else {
            $(this).parent(".col-title").parent(".col-md-6").addClass("hover");
        }
    });
    /* for Account page ending */

    //first login confirmation
    /*$("#confirm-btn").click(function(){
        var topBottom = ($(window).height()-260)/2;
        var leftRight = ($(window).width()-220)/2
        $(".login-hint").css({"top":topBottom,"bottom":topBottom,"left":leftRight,"right":leftRight});

        $("#mask").fadeIn();
        $(".login-hint").fadeIn();
        setTimeout(function(){
            $("#mask").fadeOut();
            $(".login-hint").fadeOut();
            //location.href=location.href.substring(0,location.href.lastIndexOf("/"))+"/login.html";
        },2000);

        //$('form[name="flogin-frm"]').submit();//后期需要自行释放注释
    });*/
    //confirm order click事件
    $("#confirm-order-btn").click(function () {
        if ($(".icheckbox_square-red").hasClass("checked")) {                         /*10/21 angela add if条件*/
            var topBottom = ($(window).height() - 236) / 2;
            var leftRight = ($(window).width() - 220) / 2
            $(".oc-hint").css({"top": topBottom, "bottom": topBottom, "left": leftRight, "right": leftRight});
            $(".oc-success-hint").css({"top": topBottom, "bottom": topBottom, "left": leftRight, "right": leftRight});

            $("#mask").fadeIn();
            $(".oc-hint").fadeIn();
            $(".close-reveal-modal").hide();
            /*20161109 angela add*/
            setTimeout(function () {
                //$("#mask").fadeOut();
                $(".oc-hint").fadeOut();
                $("#mask").fadeIn();
                $(".oc-success-hint").fadeIn();
            }, 2000);
            setTimeout(function () {
                $("#mask").fadeOut();
                $(".oc-success-hint").fadeOut();
                location.href = location.href.substring(0, location.href.lastIndexOf("/")) + "/confirmation-message.html";  //订单跳转2017-03-02 hy

            }, 5000);
        }

    });

    $(".laststep").click(function () {
        //location.href=location.href.substring(0,location.href.lastIndexOf("/"))+"/shopping-cart.html";
    })

    $('html, body').animate({scrollTop: 0}, 500);
    var winHeight = $(document.body).scrollTop();
    var baseHeight = $(document).scrollTop();//滚动条的初始位置

    var wh = $(window).height();	//设备屏幕高度
    var bh = $(document.body).height();
    var divTop = $(".photos-section").height() + $(".pro-box").height() + $(".header").height();
    // var shopCartTop = $(".sc-list").height()+$(".steps").height()+$(".mobtitle").height()+$(".header").height()+90;             /*20161114 angela cancel*/
    var shopCartTop = $("#sc-panel1").height() + $("#sc-panel2").height() + $(".steps").height() + $(".mobtitle").height() + $(".header").height() + 90;
    /*20161114 angela add*/
    var divH = $(".group .cart-control").height();
    $(window).scroll(function () {
        var scrollY = $(document).scrollTop();// 获取垂直滚动的距离，即滚动了多少

        /* hide or show header navigation bar beginning  */
        if (baseHeight < scrollY) {
            $('.header').addClass('header-hidden');
        }
        if (baseHeight > scrollY) {

            $('.header').removeClass('header-hidden');
        }
        if (scrollY <= winHeight) {
            $('.header').removeClass('header-hidden');
        }
        setTimeout(function () {
            baseHeight = scrollY
        }, 0);
        /* hide or show header navigation bar ending */
        var W = $(window).width();
        if (W < 980) {
            /*hy02-15*商品详情输入数量固定**/
            //当滚动条滚动距离超出cart-control上端
//				if(scrollY >= divTop){
//					$(".group .cart-control").css({"top":"auto","bottom":"auto",'position':"relative"});
//				}else{					
//					$(".group .cart-control").css({"top":"auto","bottom":"0",'position':"fixed"});
//				}
            shopCartTop = $(".steps").height() + $(".mobtitle").height() + $(".header").height() + 90;       //20161129 angela 根据swire开发要求添加
            $(".sc-list").each(function () {
                shopCartTop += $(this).height();
            });
            //滚动条到最底端时
            if ((scrollY + wh) < shopCartTop) {
                //show footer when scroll height add window height less than top of the total
                shopCartCssFooter();
            } else {
                //revert tot normal css
                shopCartCssRevertMob();
            }
        }

        /* On product detail page, cart will float ending */
    });


    /* Change rem to px */
    (function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
            };

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        var loadEvent = 'load';
        win.addEventListener(loadEvent, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);

    /* T40 Rebate - popup div */
    $('#r-cash-mob,#cash-click').click(function () {                         /*10/12 angela update 选择器更新*/
        if (!$("#r-cash-pc").hasClass('hover') || !$("#r-cash").hasClass('hover')) {
            $("#r-cash-pc").addClass('hover');
            $("#r-cash").addClass('hover');
            $("#cash-rebate").fadeIn();
            $("#r-product-pc").removeClass('hover');
            $("#r-product").removeClass('hover');
            $("#product-rebate").fadeOut();
            return false;
        } else {
            $("#r-cash-pc").removeClass('hover');
            $("#r-cash").removeClass('hover');
            $("#cash-rebate").fadeOut();
        }
    });

    $('#r-product-mob,#product-pc').click(function () {                   /*10/12 angela update 选择器更新*/
        if (!$("#r-product-pc").hasClass('hover') || !$("#r-product").hasClass('hover')) {
            $("#r-product-pc").addClass('hover');
            $("#r-product").addClass('hover');
            $("#product-rebate").fadeIn();
            $("#r-cash-pc").removeClass('hover');
            $("#r-cash").removeClass('hover');
            $("#cash-rebate").fadeOut();
            return false;
        } else {
            $("#r-product-pc").removeClass('hover');
            $("#r-product").removeClass('hover');
            $("#product-rebate").fadeOut();
        }
    });
    $(window).bind('orientationchange', function (event) {
        if (window.orientation == 90 || window.orientation == -90) {
            if ($("#m_p_list").hasClass("hover") || $(".nav-bar").attr("style")) {
                history.go(0);
            }
        }

    });

    $("#sc-tem-id").addClass("save-tem").css({"display": "block"});

    window.onload = changeSize;

    window.onresize = changeSize;

    function changeSize() {
        var W = $(window).width();
        if (W > 1000) {
            $('.promotion .right').height($('.promotion .left img').height() - 30);
        }
        $('.ord-detail dl').height($('.ord-img img').height() + 5);
        $('.ad-list .col-md-4 img').width($('#product-ads li').width() - 10);

        if (W > 979) {
            shopCartCssPC();
            $('.kind_notice').css({'float': 'left', 'left': '600px'})
        } else {
            //if($(".save-tem").is(":hidden")){
            shopCartCssMob();//用于显示底部的导航栏
            var scrollY = $(document).scrollTop();
            if ((scrollY + wh) < shopCartTop) {
                shopCartCssFooter();
            }
            //}
            $('.kind_notice').css({'float': 'left', 'left': '0px'})
        }
    }

    /* shopping cart pc css */
    function shopCartCssPC() {
        $("#sc-tem-id,#sc-total-id,#sc-next-btn,#sc-footer-id").removeAttr("style");
        $("#sc-tem-id").addClass("save-tem").css({"clear": "both", "margin": "30px 9.22% 15px 0px"});
        $("#sc-total-id").addClass("sc-total");
        $("#sc-footer-id").addClass("sc-footer");
    }

    /* shopping cart mob css */
    function shopCartCssMob() {
        $("#sc-tem-id,#sc-total-id,#sc-next-btn,#sc-footer-id").removeAttr("style");
        $("#sc-tem-id").addClass("save-tem").css({
            "position": "absolute",
            "left": "0px",
            "bottom": "1px",
            "margin": "0",
            "clear": "both"
        });
        $("#sc-total-id").addClass("sc-total").css({
            "position": "absolute",
            "top": "0px",
            "clear": "both",
            "width": "100%",
            "margin": "0",
            "text-align": "left",
            "float": "right",
            "left": "0"
        });
        $("#sc-footer-id").addClass("sc-footer").css({
            "position": "relative",
            "height": "100px",
            "bottom": "0",
            "top": "auto",
            "background-color": "#fff",
            "margin": "10px 4% 65px",
            "width": "auto",
            "clear": "both",
            "box-sizing": "border-box",
            "z-index": "98",
            "padding": "0"
        });
        // $("#sa-total-id").addClass("sa-total").css({"top":"auto"});
    }

    /* shopping cart slider footer css for mobile */
    function shopCartCssFooter() {
        $(".save-tem").css("display", "none");
        $(".sc-footer").css({
            'position': "fixed",
            "height": "50px",
            "width": "100%",
            "margin": "0px",
            "border-top": "1px solid #8a8c8f",
            "border-bottom": "1px solid #8a8c8f",
            "z-index": "9999"
        });
        $(".sc-total").css({"top": "auto", "bottom": "5px", "width": "70%", "left": "4%"});
        $('.coB-total').css("width", "100%");
        $(".extraclass1").css({"top": "-20px"});
        $(".next-btn").css({"top": "5px"});
        $(".extraclass2").css({"top": "0px", 'position': 'relative'});
    }

    /* shopping cart returns from footer css */
    function shopCartCssRevertMob() {
        $(".save-tem").css("display", "block");
        $(".sc-footer").css({
            'position': "relative",
            "height": "100px",
            "width": "auto",
            "margin": "10px 4% 65px",
            "border": "none",
            "z-index": "98"
        });
        $(".sc-total").css({"top": "0px", "bottom": "auto", "width": "100%", "left": "0"});
        $(".next-btn").css({"top": "auto"});
        $(".extraclass1").css({"top": "130px"});
        $(".extraclass2").css({"top": "50px"});
    }

    //shopping cart delete and redelete
    //pc
    $('body').delegate('.list-tudel', 'click', function () {
        $(this).parent(".list-del").children(".list-tudel").hide();
        $(this).parent(".list-del").children(".list-redel").show();
        $(this).parent(".list-del").parent(".table-row").addClass("gray");
        $(this).parent(".list-del").parent(".table-row").find(".table-row-mask").css('display', 'block');
        $(this).parent(".list-del").parent(".table-row").find('input').attr('disabled', true);

    })
    $('body').delegate('.list-redel', 'click', function () {
        $(this).parent(".list-del").children(".list-tudel").show();
        $(this).parent(".list-del").children(".list-redel").hide();
        $(this).parent(".list-del").parent(".table-row").removeClass("gray");
        $(this).parent(".list-del").parent(".table-row").find(".table-row-mask").css('display', 'none');
        $(this).parent(".list-del").parent(".table-row").find('input').attr('disabled', false);
    })


    $('#order-cart .ord-detail').click(function () {
        //window.location.href = "product-detail.html";
    });
    /* order detail mob show or hidden total section */
    $("#order-total,.pay-detail .drop-icon").click(function () {
        if (!$(this).parent().hasClass('hover')) {
            $(this).parent().addClass('hover');
            $(this).parent().nextAll().fadeIn('fast');
            return false;
        } else {
            $(this).parent().removeClass('hover');
            $(this).parent().nextAll().fadeOut('fast');
        }
    });

    //order list hover
    $(".order-box").hover(function () {
        $(this).addClass("hover");

    }, function () {
        $(this).removeClass("hover");

    });

    // video - ie8
    var browser = navigator.appName;
    var b_version = navigator.appVersion;
    if (browser == "Microsoft Internet Explorer") {
        var version = b_version.split(";");
        var trim_Version = version[1].replace(/[ ]/g, "");
        if (trim_Version == "MSIE8.0") {
            $(".video-embed").css("display", "none");
            $(".video-ie8").css("display", "block");
        }
    }

    //shopping-cart next step

    $("#sc-next-btn").click(function () {
        if (!$('.next-btn').hasClass('none-next-btn')) {
            var topBottom = ($(window).height() - 236) / 2;
            var leftRight = ($(window).width() - 220) / 2
            $(".sc-hint").css({"top": topBottom, "bottom": topBottom, "left": leftRight, "right": leftRight});
            $("#mask").fadeIn();
            $(".sc-hint").fadeIn();
            $(".close-reveal-modal").hide();
            /*20161110 angela add*/
            setTimeout(function () {
                $("#mask").fadeOut();
                $(".sc-hint").fadeOut();
                location.href = location.href.substring(0, location.href.lastIndexOf("/")) + "/order-confirm.html";//2017-03-02订单跳转
            }, 2000);
        }
    });

    //CartOverlay - if pNum > 0 will show the details, if pNum <= 0 will show a link
    var pNum = 3;
    cartOverlayShow(pNum);

});


/******hy2017-02-16********/

/*********hy02-15**首页加减按钮*********/
$(function () {
    'use strict';

    /**
     * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
     *
     * @codingstandard ftlabs-jsv2
     * @copyright The Financial Times Limited [All Rights Reserved]
     * @license MIT License (see LICENSE.txt)
     */

    /*jslint browser:true, node:true*/

    /*global define, Event, Node*/


    /**
     * Instantiate fast-clicking listeners on the specified layer.
     *
     * @constructor
     * @param {Element} layer The layer to listen on
     * @param {Object} [options={}] The options to override the defaults
     */
    function FastClick(layer, options) {
        var oldOnClick;

        options = options || {};

        /**
         * Whether a click is currently being tracked.
         *
         * @type boolean
         */
        this.trackingClick = false;


        /**
         * Timestamp for when click tracking started.
         *
         * @type number
         */
        this.trackingClickStart = 0;


        /**
         * The element being tracked for a click.
         *
         * @type EventTarget
         */
        this.targetElement = null;


        /**
         * X-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartX = 0;


        /**
         * Y-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartY = 0;


        /**
         * ID of the last touch, retrieved from Touch.identifier.
         *
         * @type number
         */
        this.lastTouchIdentifier = 0;


        /**
         * Touchmove boundary, beyond which a click will be cancelled.
         *
         * @type number
         */
        this.touchBoundary = options.touchBoundary || 10;


        /**
         * The FastClick layer.
         *
         * @type Element
         */
        this.layer = layer;

        /**
         * The minimum time between tap(touchstart and touchend) events
         *
         * @type number
         */
        this.tapDelay = options.tapDelay || 200;

        /**
         * The maximum time for a tap
         *
         * @type number
         */
        this.tapTimeout = options.tapTimeout || 700;

        if (FastClick.notNeeded(layer)) {
            return;
        }

        // Some old versions of Android don't have Function.prototype.bind
        function bind(method, context) {
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
            if (isAndroid) {
                return function () {
                    return method.apply(context, arguments);
                };
            }
        }


        var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
        var context = this;
        for (var i = 0, l = methods.length; i < l; i++) {
            context[methods[i]] = bind(context[methods[i]], context);
        }

        // Set up event handlers as required
        if (deviceIsAndroid) {
            layer.addEventListener('mouseover', this.onMouse, true);
            layer.addEventListener('mousedown', this.onMouse, true);
            layer.addEventListener('mouseup', this.onMouse, true);
        }

        layer.addEventListener('click', this.onClick, true);
        layer.addEventListener('touchstart', this.onTouchStart, false);
        layer.addEventListener('touchmove', this.onTouchMove, false);
        layer.addEventListener('touchend', this.onTouchEnd, false);
        layer.addEventListener('touchcancel', this.onTouchCancel, false);

        // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
        // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
        // layer when they are cancelled.
        if (!Event.prototype.stopImmediatePropagation) {
            layer.removeEventListener = function (type, callback, capture) {
                var rmv = Node.prototype.removeEventListener;
                if (type === 'click') {
                    rmv.call(layer, type, callback.hijacked || callback, capture);
                } else {
                    rmv.call(layer, type, callback, capture);
                }
            };

            layer.addEventListener = function (type, callback, capture) {
                var adv = Node.prototype.addEventListener;
                if (type === 'click') {
                    adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
                        if (!event.propagationStopped) {
                            callback(event);
                        }
                    }), capture);
                } else {
                    adv.call(layer, type, callback, capture);
                }
            };
        }

        // If a handler is already declared in the element's onclick attribute, it will be fired before
        // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
        // adding it as listener.
        if (typeof layer.onclick === 'function') {

            // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
            // - the old one won't work if passed to addEventListener directly.
            oldOnClick = layer.onclick;
            layer.addEventListener('click', function (event) {
                oldOnClick(event);
            }, false);
            layer.onclick = null;
        }
    }

    /**
     * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
     *
     * @type boolean
     */
    var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

    /**
     * Android requires exceptions.
     *
     * @type boolean
     */
    var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


    /**
     * iOS requires exceptions.
     *
     * @type boolean
     */
    var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


    /**
     * iOS 4 requires an exception for select elements.
     *
     * @type boolean
     */
    var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


    /**
     * iOS 6.0-7.* requires the target element to be manually derived
     *
     * @type boolean
     */
    var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

    /**
     * BlackBerry requires exceptions.
     *
     * @type boolean
     */
    var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

    /**
     * Determine whether a given element requires a native click.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element needs a native click
     */
    FastClick.prototype.needsClick = function (target) {
        switch (target.nodeName.toLowerCase()) {

            // Don't send a synthetic click to disabled inputs (issue #62)
            case 'button':
            case 'select':
            case 'textarea':
                if (target.disabled) {
                    return true;
                }

                break;
            case 'input':

                // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
                if ((deviceIsIOS && target.type === 'file') || target.disabled) {
                    return true;
                }

                break;
            case 'label':
            case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
            case 'video':
                return true;
        }

        return (/\bneedsclick\b/).test(target.className);
    };


    /**
     * Determine whether a given element requires a call to focus to simulate click into element.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
     */
    FastClick.prototype.needsFocus = function (target) {
        switch (target.nodeName.toLowerCase()) {
            case 'textarea':
                return true;
            case 'select':
                return !deviceIsAndroid;
            case 'input':
                switch (target.type) {
                    case 'button':
                    case 'checkbox':
                    case 'file':
                    case 'image':
                    case 'radio':
                    case 'submit':
                        return false;
                }

                // No point in attempting to focus disabled inputs
                return !target.disabled && !target.readOnly;
            default:
                return (/\bneedsfocus\b/).test(target.className);
        }
    };


    /**
     * Send a click event to the specified element.
     *
     * @param {EventTarget|Element} targetElement
     * @param {Event} event
     */
    FastClick.prototype.sendClick = function (targetElement, event) {
        var clickEvent, touch;

        // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
        if (document.activeElement && document.activeElement !== targetElement) {
            document.activeElement.blur();
        }

        touch = event.changedTouches[0];

        // Synthesise a click event, with an extra attribute so it can be tracked
        clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        clickEvent.forwardedTouchEvent = true;
        targetElement.dispatchEvent(clickEvent);
    };

    FastClick.prototype.determineEventType = function (targetElement) {

        //Issue #159: Android Chrome Select Box does not open with a synthetic click event
        if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
            return 'mousedown';
        }

        return 'click';
    };


    /**
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.focus = function (targetElement) {
        var length;

        // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
        if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
            length = targetElement.value.length;
            targetElement.setSelectionRange(length, length);
        } else {
            targetElement.focus();
        }
    };


    /**
     * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
     *
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.updateScrollParent = function (targetElement) {
        var scrollParent, parentElement;

        scrollParent = targetElement.fastClickScrollParent;

        // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
        // target element was moved to another parent.
        if (!scrollParent || !scrollParent.contains(targetElement)) {
            parentElement = targetElement;
            do {
                if (parentElement.scrollHeight > parentElement.offsetHeight) {
                    scrollParent = parentElement;
                    targetElement.fastClickScrollParent = parentElement;
                    break;
                }

                parentElement = parentElement.parentElement;
            } while (parentElement);
        }

        // Always update the scroll top tracker if possible.
        if (scrollParent) {
            scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
        }
    };


    /**
     * @param {EventTarget} targetElement
     * @returns {Element|EventTarget}
     */
    FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {

        // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
        if (eventTarget.nodeType === Node.TEXT_NODE) {
            return eventTarget.parentNode;
        }

        return eventTarget;
    };


    /**
     * On touch start, record the position and scroll offset.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchStart = function (event) {
        var targetElement, touch, selection;

        // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
        if (event.targetTouches.length > 1) {
            return true;
        }

        targetElement = this.getTargetElementFromEventTarget(event.target);
        touch = event.targetTouches[0];
        var nodeName = targetElement.nodeName.toLowerCase();
        var typeAttribute = targetElement.getAttribute('type');
        if (nodeName === "select" || (typeAttribute === 'date' && nodeName === "input") || (typeAttribute === 'datetime' && nodeName === "input")) {
            return false;
        }
        if (deviceIsIOS) {

            // Only trusted events will deselect text on iOS (issue #49)
            selection = window.getSelection();
            if (selection.rangeCount && !selection.isCollapsed) {
                return true;
            }

            if (!deviceIsIOS4) {

                // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
                // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
                // with the same identifier as the touch event that previously triggered the click that triggered the alert.
                // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
                // immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
                // Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
                // which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
                // random integers, it's safe to to continue if the identifier is 0 here.
                if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
                    event.preventDefault();
                    return false;
                }

                this.lastTouchIdentifier = touch.identifier;

                // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
                // 1) the user does a fling scroll on the scrollable layer
                // 2) the user stops the fling scroll with another tap
                // then the event.target of the last 'touchend' event will be the element that was under the user's finger
                // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
                // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
                this.updateScrollParent(targetElement);
            }
        }

        this.trackingClick = true;
        this.trackingClickStart = event.timeStamp;
        this.targetElement = targetElement;

        this.touchStartX = touch.pageX;
        this.touchStartY = touch.pageY;

        // Prevent phantom clicks on fast double-tap (issue #36)
        if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
            event.preventDefault();
        }

        return true;
    };


    /**
     * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.touchHasMoved = function (event) {
        var touch = event.changedTouches[0], boundary = this.touchBoundary;

        if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
            return true;
        }

        return false;
    };


    /**
     * Update the last position.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchMove = function (event) {
        if (!this.trackingClick) {
            return true;
        }

        // If the touch has moved, cancel the click tracking
        if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
            this.trackingClick = false;
            this.targetElement = null;
        }

        return true;
    };


    /**
     * Attempt to find the labelled control for the given label element.
     *
     * @param {EventTarget|HTMLLabelElement} labelElement
     * @returns {Element|null}
     */
    FastClick.prototype.findControl = function (labelElement) {

        // Fast path for newer browsers supporting the HTML5 control attribute
        if (labelElement.control !== undefined) {
            return labelElement.control;
        }

        // All browsers under test that support touch events also support the HTML5 htmlFor attribute
        if (labelElement.htmlFor) {
            return document.getElementById(labelElement.htmlFor);
        }

        // If no for attribute exists, attempt to retrieve the first labellable descendant element
        // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
        return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
    };


    /**
     * On touch end, determine whether to send a click event at once.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchEnd = function (event) {
        var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

        if (!this.trackingClick) {
            return true;
        }

        // Prevent phantom clicks on fast double-tap (issue #36)
        if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
            this.cancelNextClick = true;
            return true;
        }

        if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
            return true;
        }

        // Reset to prevent wrong click cancel on input (issue #156).
        this.cancelNextClick = false;

        this.lastClickTime = event.timeStamp;

        trackingClickStart = this.trackingClickStart;
        this.trackingClick = false;
        this.trackingClickStart = 0;

        // On some iOS devices, the targetElement supplied with the event is invalid if the layer
        // is performing a transition or scroll, and has to be re-detected manually. Note that
        // for this to function correctly, it must be called *after* the event target is checked!
        // See issue #57; also filed as rdar://13048589 .
        if (deviceIsIOSWithBadTarget) {
            touch = event.changedTouches[0];

            // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
            targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
            targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
        }

        targetTagName = targetElement.tagName.toLowerCase();
        if (targetTagName === 'label') {
            forElement = this.findControl(targetElement);
            if (forElement) {
                this.focus(targetElement);
                if (deviceIsAndroid) {
                    return false;
                }

                targetElement = forElement;
            }
        } else if (this.needsFocus(targetElement)) {

            // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
            // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
            if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
                this.targetElement = null;
                return false;
            }

            this.focus(targetElement);
            this.sendClick(targetElement, event);

            // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
            // Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
            if (!deviceIsIOS || targetTagName !== 'select') {
                this.targetElement = null;
                event.preventDefault();
            }

            return false;
        }

        if (deviceIsIOS && !deviceIsIOS4) {

            // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
            // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
            scrollParent = targetElement.fastClickScrollParent;
            if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
                return true;
            }
        }

        // Prevent the actual click from going though - unless the target node is marked as requiring
        // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
        if (!this.needsClick(targetElement)) {
            event.preventDefault();
            this.sendClick(targetElement, event);
        }

        return false;
    };


    /**
     * On touch cancel, stop tracking the click.
     *
     * @returns {void}
     */
    FastClick.prototype.onTouchCancel = function () {
        this.trackingClick = false;
        this.targetElement = null;
    };


    /**
     * Determine mouse events which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onMouse = function (event) {

        // If a target element was never set (because a touch event was never fired) allow the event
        if (!this.targetElement) {
            return true;
        }

        if (event.forwardedTouchEvent) {
            return true;
        }

        // Programmatically generated events targeting a specific element should be permitted
        if (!event.cancelable) {
            return true;
        }

        // Derive and check the target element to see whether the mouse event needs to be permitted;
        // unless explicitly enabled, prevent non-touch click events from triggering actions,
        // to prevent ghost/doubleclicks.
        if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

            // Prevent any user-added listeners declared on FastClick element from being fired.
            if (event.stopImmediatePropagation) {
                event.stopImmediatePropagation();
            } else {

                // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
                event.propagationStopped = true;
            }

            // Cancel the event
            event.stopPropagation();
            event.preventDefault();

            return false;
        }

        // If the mouse event is permitted, return true for the action to go through.
        return true;
    };


    /**
     * On actual clicks, determine whether this is a touch-generated click, a click action occurring
     * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
     * an actual click which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onClick = function (event) {
        var permitted;

        // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
        if (this.trackingClick) {
            this.targetElement = null;
            this.trackingClick = false;
            return true;
        }

        // Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
        if (event.target.type === 'submit' && event.detail === 0) {
            return true;
        }

        permitted = this.onMouse(event);

        // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
        if (!permitted) {
            this.targetElement = null;
        }

        // If clicks are permitted, return true for the action to go through.
        return permitted;
    };


    /**
     * Remove all FastClick's event listeners.
     *
     * @returns {void}
     */
    FastClick.prototype.destroy = function () {
        var layer = this.layer;

        if (deviceIsAndroid) {
            layer.removeEventListener('mouseover', this.onMouse, true);
            layer.removeEventListener('mousedown', this.onMouse, true);
            layer.removeEventListener('mouseup', this.onMouse, true);
        }

        layer.removeEventListener('click', this.onClick, true);
        layer.removeEventListener('touchstart', this.onTouchStart, false);
        layer.removeEventListener('touchmove', this.onTouchMove, false);
        layer.removeEventListener('touchend', this.onTouchEnd, false);
        layer.removeEventListener('touchcancel', this.onTouchCancel, false);
    };


    /**
     * Check whether FastClick is needed.
     *
     * @param {Element} layer The layer to listen on
     */
    FastClick.notNeeded = function (layer) {
        var metaViewport;
        var chromeVersion;
        var blackberryVersion;
        var firefoxVersion;

        // Devices that don't support touch don't need FastClick
        if (typeof window.ontouchstart === 'undefined') {
            return true;
        }

        // Chrome version - zero for other browsers
        chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

        if (chromeVersion) {

            if (deviceIsAndroid) {
                metaViewport = document.querySelector('meta[name=viewport]');

                if (metaViewport) {
                    // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                        return true;
                    }
                    // Chrome 32 and above with width=device-width or less don't need FastClick
                    if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
                        return true;
                    }
                }

                // Chrome desktop doesn't need FastClick (issue #15)
            } else {
                return true;
            }
        }

        if (deviceIsBlackBerry10) {
            blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

            // BlackBerry 10.3+ does not require Fastclick library.
            // https://github.com/ftlabs/fastclick/issues/251
            if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
                metaViewport = document.querySelector('meta[name=viewport]');

                if (metaViewport) {
                    // user-scalable=no eliminates click delay.
                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                        return true;
                    }
                    // width=device-width (or less than device-width) eliminates click delay.
                    if (document.documentElement.scrollWidth <= window.outerWidth) {
                        return true;
                    }
                }
            }
        }

        // IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
        if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
            return true;
        }

        // Firefox version - zero for other browsers
        firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

        if (firefoxVersion >= 27) {
            // Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

            metaViewport = document.querySelector('meta[name=viewport]');
            if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
                return true;
            }
        }

        // IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
        // http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
        if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
            return true;
        }

        return false;
    };


    /**
     * Factory method for creating a FastClick object
     *
     * @param {Element} layer The layer to listen on
     * @param {Object} [options={}] The options to override the defaults
     */
    FastClick.attach = function (layer, options) {
        return new FastClick(layer, options);
    };


    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

        // AMD. Register as an anonymous module.
        define(function () {
            return FastClick;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = FastClick.attach;
        module.exports.FastClick = FastClick;
    } else {
        window.FastClick = FastClick;
    }
}());
//fastclick
window.addEventListener('load', function () {
    FastClick.attach(document.body);
}, false);


if ($(window).width() <= 320) {
    $('.cart-action').css({'top': '-35px', 'width': '0px', 'min-width': '90%'});
    $('.cart-input-box').css('width', '30px');
    $('.il-block').css('width', '20px');
}



        
		 
		
		