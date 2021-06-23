function ace_detect_device_type() {
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? (ace.mobile = !0, ace.html.addClass("crt-mobile")) : (ace.mobile = !1, ace.html.addClass("crt-desktop"))
}

function ace_append_overlay() {
    ace.body.append(ace.overlay.obj), ace.overlay.obj[0].style.opacity = 0, window.getComputedStyle(ace.overlay.obj[0]).opacity, ace.overlay.obj[0].style.opacity = 1
}

function ace_remove_overlay() {
    ace.overlay.obj[0].style.opacity = 0, ace.overlay.obj.remove()
}

function ace_lock_scroll() {
    var e = ace.html.outerWidth(),
        t = ace.body.outerHeight(),
        o = [self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop];
    ace.html.data("scroll-position", o), ace.html.data("previous-overflow", ace.html.css("overflow")), ace.html.css("overflow", "hidden"), window.scrollTo(o[0], o[1]);
    var r = ace.body.outerWidth() - e,
        i = ace.body.outerHeight() - t;
    ace.body.css({
        "margin-right": r,
        "margin-bottom": i
    }), ace.html.addClass("crt-lock-scroll")
}

function ace_unlock_scroll() {
    ace.html.css("overflow", ace.html.data("previous-overflow"));
    var e = ace.html.data("scroll-position");
    window.scrollTo(e[0], e[1]), ace.body.css({
        "margin-right": 0,
        "margin-bottom": 0
    }), ace.html.removeClass("crt-lock-scroll")
}

function ace_open_sidebar() {
    ace.html.addClass("crt-sidebar-opened"), ace_append_overlay(), ace_lock_scroll()
}

function ace_close_sidebar() {
    ace.html.removeClass("crt-sidebar-opened"), ace_remove_overlay(), ace_unlock_scroll()
}

function ace_progress_chart(e, t, o, r) {
    void 0 === t && (t = ""), new ProgressBar.Circle(e, {
        color: certy.vars.themeColor,
        strokeWidth: 5,
        trailWidth: 0,
        text: {
            value: t,
            className: "progress-text",
            style: {
                top: "50%",
                left: "50%",
                color: certy.progress.textColor,
                position: "absolute",
                margin: 0,
                padding: 0,
                transform: {
                    prefix: !0,
                    value: "translate(-50%, -50%)"
                }
            },
            autoStyleContainer: !0,
            alignToBottom: !0
        },
        svgStyle: {
            display: "block",
            width: "100%"
        },
        duration: r,
        easing: "easeOut"
    }).animate(o)
}

function ace_progress_line(e, t, o, r) {
    void 0 === t && (t = ""), new ProgressBar.Line(e, {
        strokeWidth: 4,
        easing: "easeInOut",
        duration: r,
        color: certy.vars.themeColor,
        trailColor: certy.progress.trailColor,
        trailWidth: 4,
        svgStyle: {
            width: "100%",
            height: "100%"
        },
        text: {
            value: t,
            className: "progress-text",
            style: {
                top: "-25px",
                right: "0",
                color: certy.progress.textColor,
                position: "absolute",
                margin: 0,
                padding: 0,
                transform: {
                    prefix: !0,
                    value: "translate(0, 0)"
                }
            },
            autoStyleContainer: !0
        }
    }).animate(o)
}

function ace_is_elem_in_viewport(e, t) {
    var o = e[0].getBoundingClientRect();
    return o.bottom >= 0 && o.right >= 0 && o.top + t <= (window.innerHeight || document.documentElement.clientHeight) && o.left <= (window.innerWidth || document.documentElement.clientWidth)
}

function ace_is_elems_in_viewport(e, t) {
    for (var o = 0; o < e.length; o++) {
        var r = jQuery(e[o]);
        if (r.hasClass("crt-animate") && ace_is_elem_in_viewport(r, t)) {
            if (r.removeClass("crt-animate").addClass("crt-animated"), r.hasClass("progress-chart")) {
                var i = r.find(".progress-bar");
                ace_progress_chart(i[0], i.data("text"), i.data("value"), 1e3)
            }
            if (r.hasClass("progress-line")) {
                var a = r.find(".progress-bar");
                ace_progress_line(a[0], a.data("text"), a.data("value"), 1e3)
            }
        }
    }
}

function ace_appear_elems(e, t) {
    ace_is_elems_in_viewport(e, t), jQuery(window).scroll(function () {
        ace_is_elems_in_viewport(e, t)
    }), jQuery(window).resize(function () {
        ace_is_elems_in_viewport(e, t)
    })
}

function initialiseGoogleMap(e) {
    var t, o = 44.5403,
        r = -78.5463,
        i = jQuery("#map"),
        a = i.get(0),
        s = jQuery.parseJSON(e);
    i.data("latitude") && (o = i.data("latitude")), i.data("longitude") && (r = i.data("longitude")), t = new google.maps.LatLng(o, r);
    var n = {
        zoom: 14,
        center: t,
        scrollwheel: !0,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: s
    };
    i = new google.maps.Map(a, n);
    new google.maps.Marker({
        map: i,
        position: t,
        icon: {
            path: "M125 410 c-56 -72 -111 -176 -120 -224 -7 -36 11 -83 49 -124 76 -85 223 -67 270 31 28 60 29 88 6 150 -19 51 -122 205 -148 221 -6 3 -32 -21 -57 -54z m110 -175 c35 -34 33 -78 -4 -116 -35 -35 -71 -37 -105 -7 -40 35 -43 78 -11 116 34 41 84 44 120 7z",
            fillColor: certy_vars_from_WP.themeColor,
            fillOpacity: 1,
            scale: .1,
            strokeColor: certy_vars_from_WP.themeColor,
            strokeWeight: 1,
            anchor: new google.maps.Point(185, 500)
        },
        title: "Hello World!"
    });
    google.maps.event.addDomListener(window, "resize", function () {
        i.setCenter(t)
    })
}
var navStiky = !1;
1 == certy_vars_from_WP.enable_sticky && (navStiky = !0);
var certy = {
    vars: {
        rtl: !1,
        themeColor: certy_vars_from_WP.themeColor,
        screenMd: "992px"
    },
    nav: {
        height: "auto",
        arrow: !1,
        sticky: {
            top: "-1px",
            active: navStiky
        },
        tooltip: {
            active: !0
        }
    },
    sideBox: {
        sticky: {
            top: "20px",
            active: !1
        }
    },
    progress: {
        animation: !0,
        textColor: "inherit",
        trailColor: "rgba(0,0,0,0.07)"
    }
};
! function (e, t, o, r) {
    var i = function (r, i) {
        this.elem = r, this.$elem = e(r), this.options = i, this.metadata = this.$elem.data("plugin-options"), this.$win = e(t), this.sections = {}, this.didScroll = !1, this.$doc = e(o), this.docHeight = this.$doc.height()
    };
    i.prototype = {
        defaults: {
            navItems: "a",
            currentClass: "current",
            changeHash: !1,
            easing: "swing",
            filter: "",
            scrollSpeed: 750,
            scrollThreshold: .5,
            begin: !1,
            end: !1,
            scrollChange: !1
        },
        init: function () {
            return this.config = e.extend({}, this.defaults, this.options, this.metadata), this.$nav = this.$elem.find(this.config.navItems), "" !== this.config.filter && (this.$nav = this.$nav.filter(this.config.filter)), this.$nav.on("click.onePageNav", e.proxy(this.handleClick, this)), this.getPositions(), this.bindInterval(), this.$win.on("resize.onePageNav", e.proxy(this.getPositions, this)), this
        },
        adjustNav: function (e, t) {
            e.$elem.find("." + e.config.currentClass).removeClass(e.config.currentClass), t.addClass(e.config.currentClass)
        },
        bindInterval: function () {
            var e, t = this;
            t.$win.on("scroll.onePageNav", function () {
                t.didScroll = !0
            }), t.t = setInterval(function () {
                e = t.$doc.height(), t.didScroll && (t.didScroll = !1, t.scrollChange()), e !== t.docHeight && (t.docHeight = e, t.getPositions())
            }, 250)
        },
        getHash: function (e) {
            return e.attr("href").split("#")[1]
        },
        getPositions: function () {
            var t, o, r, i = this;
            i.$nav.each(function () {
                t = i.getHash(e(this)), r = e("#" + t), r.length && (o = r.offset().top, i.sections[t] = Math.round(o))
            })
        },
        getSection: function (e) {
            var t = null,
                o = Math.round(this.$win.height() * this.config.scrollThreshold);
            for (var r in this.sections) this.sections[r] - o < e && (t = r);
            return t
        },
        handleClick: function (o) {
            var r = this,
                i = e(o.currentTarget),
                a = i.parent(),
                s = "#" + r.getHash(i);
            a.hasClass(r.config.currentClass) || (r.config.begin && r.config.begin(), r.adjustNav(r, a), r.unbindInterval(), r.scrollTo(s, function () {
                r.config.changeHash && (history.pushState ? history.pushState(null, null, s) : t.location.hash = s), r.bindInterval(), r.config.end && r.config.end()
            })), o.preventDefault()
        },
        scrollChange: function () {
            var e, t = this.$win.scrollTop(),
                o = this.getSection(t);
            null !== o && (e = this.$elem.find('a[href$="#' + o + '"]').parent(), e.hasClass(this.config.currentClass) || (this.adjustNav(this, e), this.config.scrollChange && this.config.scrollChange(e)))
        },
        scrollTo: function (t, o) {
            var r = e(t).offset().top;
            e(t).closest(".crt-paper-layers").hasClass("crt-animate") ? r -= 145 : r -= 45, e("html, body").animate({
                scrollTop: r
            }, this.config.scrollSpeed, this.config.easing, o)
        },
        unbindInterval: function () {
            clearInterval(this.t), this.$win.unbind("scroll.onePageNav")
        }
    }, i.defaults = i.prototype.defaults, e.fn.onePageNav = function (e) {
        return this.each(function () {
            new i(this, e).init()
        })
    }
}(jQuery, window, document), certy.initGlobalVars = function () {
    this.vars.html = jQuery("html"), this.vars.body = jQuery("body"), this.vars.footer = jQuery("#crtFooter"), this.vars.windowW = jQuery(window).width(), this.vars.windowH = jQuery(window).height(), this.vars.windowScrollTop = jQuery(window).scrollTop(), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? (this.vars.mobile = !0, this.vars.html.addClass("mobile")) : (this.vars.mobile = !1, this.vars.html.addClass("desktop"))
}, certy.lockScroll = function () {
    var e = certy.vars.html.outerWidth(),
        t = certy.vars.body.outerHeight(),
        o = [self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop];
    certy.vars.html.data("scroll-position", o), certy.vars.html.data("previous-overflow", certy.vars.html.css("overflow")), certy.vars.html.css("overflow", "hidden"), window.scrollTo(o[0], o[1]);
    var r = certy.vars.body.outerWidth() - e,
        i = certy.vars.body.outerHeight() - t;
    certy.vars.body.css({
        "margin-right": r,
        "margin-bottom": i
    }), certy.vars.html.addClass("lock-scroll")
}, certy.unlockScroll = function () {
    certy.vars.html.css("overflow", certy.vars.html.data("previous-overflow"));
    var e = certy.vars.html.data("scroll-position");
    window.scrollTo(e[0], e[1]), certy.vars.body.css({
        "margin-right": 0,
        "margin-bottom": 0
    }), certy.vars.html.removeClass("lock-scroll")
}, certy.nav.initScroll = function (e) {
    e.height(e.height()).animate({
        height: certy.nav.height
    }, 700, function () {
        e.mCustomScrollbar({
            axis: "y",
            scrollbarPosition: "outside"
        })
    }), certy.nav.arrow && (jQuery("#crtNavTools").removeClass("hidden"), jQuery("#crtNavArrow").on("click", function () {
        e.mCustomScrollbar("scrollTo", "-=" + certy.nav.height)
    }))
}, certy.nav.exists = !1, certy.nav.makeSticky = function () {
    this.sticky.active && !certy.vars.mobile && Modernizr.mq("(min-width: " + certy.vars.screenMd + ")") && (this.exists ? certy.vars.windowScrollTop > this.wrap.offset().top ? this.el.css({
        top: this.sticky.top,
        left: this.wrap.offset().left,
        width: this.wrap.width(),
        bottom: "auto",
        position: "fixed"
    }) : this.el.css({
        top: "0",
        left: "auto",
        width: "auto",
        bottom: "auto",
        position: "relative"
    }) : (this.el = jQuery("#crtNavInner"), this.wrap = jQuery("#crtNavWrap"), this.el.length > 0 && this.wrap.length > 0 && (this.exists = !0)))
}, certy.nav.tooltip.el = "", certy.nav.tooltip.timer = 0, certy.nav.tooltip.show = function (e) {
    certy.nav.tooltip.timer = setTimeout(function () {
        certy.nav.tooltip.el = jQuery('<div class="crt-tooltip"></div>');
        var t = e.offset().top,
            o = e.offset().left,
            r = o + e.outerWidth();
        e.outerWidth();
        certy.vars.body.append(certy.nav.tooltip.el), certy.nav.tooltip.el.text(e.data("tooltip")), r + certy.nav.tooltip.el.outerWidth() < certy.vars.windowW ? certy.nav.tooltip.el.addClass("arrow-left").css({
            left: r + "px",
            top: t + 4 + "px"
        }) : certy.nav.tooltip.el.addClass("arrow-right text-right").css({
            left: o - certy.nav.tooltip.el.outerWidth() - 10 + "px",
            top: t + 4 + "px"
        }), certy.nav.tooltip.el.fadeIn(150)
    }, 150)
}, certy.nav.tooltip.hide = function () {
    clearTimeout(certy.nav.tooltip.timer), certy.nav.tooltip.el.length > 0 && certy.nav.tooltip.el.fadeOut(150, function () {
        certy.nav.tooltip.el.remove()
    })
}, certy.sideBox.exists = !1, certy.sideBox.makeSticky = function () {
    this.sticky.active && !certy.vars.mobile && Modernizr.mq("(min-width: " + certy.vars.screenMd + ")") && (this.exists ? certy.vars.windowScrollTop > this.wrap.offset().top ? this.el.css({
        top: this.sticky.top,
        left: this.wrap.offset().left,
        width: this.wrap.width(),
        bottom: "auto",
        position: "fixed"
    }) : this.el.css({
        top: "0",
        left: "auto",
        width: "auto",
        bottom: "auto",
        position: "relative"
    }) : (this.el = jQuery("#crtSideBox"), this.wrap = jQuery("#crtSideBoxWrap"), this.el.length > 0 && this.wrap.length > 0 && (this.exists = !0)))
}, certy.slider = function (e) {
    for (var t = 0; t < e.length; t++) "none" != jQuery(e[t]).data("init") && jQuery(e[t]).slick()
}, certy.carousel = function (e) {
    for (var t = 0; t < e.length; t++) "none" !== jQuery(e[t]).data("init") && jQuery(e[t]).slick({
        dots: !0
    })
}, certy.portfolio = {
    popupSlider: "",
    popupCarousel: "",
    currentEmbed: !1,
    currentEmbedType: !1,
    initGrid: function (e) {
        var t = e.isotope({
            isOriginLeft: !certy.vars.rtl,
            itemSelector: ".pf-grid-item",
            percentPosition: !0,
            masonry: {
                columnWidth: ".pf-grid-sizer"
            }
        });
        t.imagesLoaded().progress(function () {
            t.isotope("layout")
        });
        var o = e.closest(".pf-wrap").find(".pf-filter");
        if (o.length > 0) {
            var r = o.find("button");
            jQuery(".pf-filter button:first-child").addClass("active"), r.on("click", function () {
                r.removeClass("active"), jQuery(this).addClass("active");
                var e = jQuery(this).attr("data-filter");
                t.isotope({
                    filter: e
                })
            })
        }
    },
    openPopup: function (e) {
        certy.vars.html.addClass("crt-pf-popup-opened"), this.popup_wrapper = jQuery('<div id="pf-popup-wrap"><button id="pf-popup-close"><i class="crt-icon crt-icon-close"></i></button><div class="pf-popup-inner"><div class="pf-popup-middle"><div class="pf-popup-container"><button id="pf-popup-close"><i class="rsicon rsicon-close"></i></button><div id="pf-popup-content" class="pf-popup-content"></div></div></div></div></div>'), certy.vars.body.append(this.popup_wrapper), this.popup_content = jQuery("#pf-popup-content"), this.popup_content.append(e.clone()), this.popupSlider = jQuery("#pf-popup-content .pf-popup-media"), this.popupSlider.on("init", function (e, t) {
            certy.portfolio.loadEmbed(0), jQuery(window).trigger("resize")
        }), this.popupSlider.on("beforeChange", function (e, t, o, r) {
            if (certy.portfolio.currentEmbed && certy.portfolio.currentEmbedType) switch (certy.portfolio.currentEmbedType) {
                case "iframe":
                    var i = certy.portfolio.currentEmbed.find("iframe");
                    i.attr("src", i.attr("src"));
                    break;
                case "video":
                    certy.portfolio.currentEmbed.find("video")[0].pause()
            }
            certy.portfolio.loadEmbed(r)
        }), this.popupSlider.slick({
            speed: 500,
            dots: !1,
            arrow: !0,
            infinite: !1,
            slidesToShow: 1,
            adaptiveHeight: !0
        }), this.popupCarousel = jQuery("#pf-popup-content .pf-rel-carousel"), this.popupCarousel.slick({
            dots: !1,
            infinite: !0,
            slidesToShow: 3,
            slidesToScroll: 3,
            lazyLoad: "ondemand"
        }), this.popup_wrapper.addClass("pf-opened"), certy.lockScroll()
    },
    closePopup: function (e) {
        certy.vars.html.removeClass("cr-portfolio-opened"), this.popup_wrapper.removeClass("pf-opened"), setTimeout(function () {
            certy.portfolio.popup_wrapper.remove(), certy.unlockScroll()
        }, 500)
    },
    loadEmbed: function (e) {
        var t = jQuery('#pf-popup-content .pf-popup-slide[data-slick-index="' + e + '"]').find(".pf-popup-embed"),
            o = jQuery.trim(t.data("type")),
            r = jQuery.trim(t.data("url"));
        if (certy.portfolio.currentEmbed = t, certy.portfolio.currentEmbedType = o, !t.hasClass("pf-embed-loaded") && void 0 !== o && !1 !== o && "" !== o && void 0 !== r && !1 !== r && "" !== r) {
            var i = jQuery.trim(t.data("width")),
                a = jQuery.trim(t.data("height"));
            switch (void 0 !== i && !1 !== i && "" !== i && void 0 !== a && !1 !== a && "" !== a && t.css({
                "padding-top": a / i * 100 + "%"
            }), o) {
                case "image":
                    t.addClass("pf-embed-image");
                    var s = jQuery("<img/>", {
                        src: r,
                        style: "display:none"
                    }).load(function () {
                        jQuery(this).fadeIn(500), t.addClass("pf-embed-loaded")
                    }).error(function () {
                        t.addClass("pf-embed-error")
                    });
                    t.empty().append(s);
                    break;
                case "iframe":
                    t.addClass("pf-embed-iframe");
                    var n = jQuery("<iframe/>", {
                        src: r,
                        style: "display:none",
                        allowfullscreen: ""
                    }).load(function () {
                        jQuery(this).fadeIn(500), t.addClass("pf-embed-loaded")
                    }).error(function () {
                        t.addClass("pf-embed-error")
                    });
                    t.empty().append(n);
                    break;
                case "video":
                    t.addClass("pf-embed-video");
                    var c = this.parseOptions(r),
                        l = "<video ";
                    c.poster && (l += 'poster="' + c.poster + '" '), l += 'controls="controls" preload="yes">', c.mp4 && (l += '<source type="video/mp4" src="' + c.mp4 + '"/>'), c.webm && (l += '<source type="video/webm" src="' + c.webm + '"/>'), c.ogv && (l += '<source type="video/ogg" src="' + c.ogv + '"/>'), l += "Your browser does not support the video tag.</video>", t.empty().append(jQuery(l))
            }
        }
    },
    parseOptions: function (e) {
        var t, o, r, i, a, s, n, c = {};
        for (a = e.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ",").split(","), n = 0, s = a.length; n < s && (o = a[n], -1 === o.search(/^(http|https|ftp):\/\//) && -1 !== o.search(":")); n++) t = o.indexOf(":"), r = o.substring(0, t), i = o.substring(t + 1), i || (i = void 0), "string" == typeof i && (i = "true" === i || "false" !== i && i), "string" == typeof i && (i = isNaN(i) ? i : +i), c[r] = i;
        return null == r && null == i ? e : c
    }
},
    function (e) {
        "use strict";
        e(function () {
            certy.initGlobalVars(), certy.vars.body.hasClass("crt-nav-on") && (Modernizr.mq("(min-width: " + certy.vars.screenMd + ")") && "auto" !== certy.nav.height && certy.nav.initScroll(e("#crtNavScroll")), certy.nav.makeSticky(), certy.nav.tooltip.active && e("#crtNav a").hover(function () {
                certy.nav.tooltip.show(e(this))
            }, function () {
                certy.nav.tooltip.hide()
            }), e("#crtNav").onePageNav({
                changeHash: !0,
                scrollThreshold: .5,
                filter: ":not(.external)"
            })), certy.sideBox.makeSticky();
            var t = e(".pf-grid");
            if (t.length > 0) {
                for (var o = 0; o < t.length; o++) certy.portfolio.initGrid(e(t[o]));
                e(document).on("click", ".pf-project", function () {
                    var t = e(this).attr("href");
                    return certy.portfolio.openPopup(e(t)), !1
                }), e(document).on("click", ".pf-rel-href", function () {
                    var t = e(this).attr("href");
                    if (-1 != t.indexOf("#")) return certy.portfolio.closePopup(), setTimeout(function () {
                        certy.portfolio.openPopup(e(t))
                    }, 500), !1
                }), e(document).on("click", "#pf-popup-close", function () {
                    certy.portfolio.closePopup()
                }), e(document).on("touchstart click", ".crt-pf-popup-opened #pf-popup-wrap", function (t) {
                    var o = e("#pf-popup-content");
                    o.is(t.target) || 0 !== o.has(t.target).length || certy.portfolio.closePopup()
                })
            }
            certy.slider(e(".cr-slider")), certy.carousel(e(".cr-carousel"));
            var r = e("#crtBtnUp");
            r.length > 0 && (e(window).scrollTop() > 100 ? r.show(0) : r.hide(0), e(window).scroll(function () {
                e(this).scrollTop() > 100 ? r.show(0) : r.hide(0)
            }), r.on("click", function () {
                return e("html, body").animate({
                    scrollTop: 0
                }, 800), !1
            }))
        }), e(window).on("resize", function () {
            certy.vars.windowW = e(window).width(), certy.vars.windowH = e(window).height(), certy.vars.windowScrollTop = e(window).scrollTop(), certy.nav.makeSticky(), certy.sideBox.makeSticky()
        }), e(window).on("scroll", function () {
            certy.vars.windowScrollTop = e(window).scrollTop(), certy.nav.makeSticky(), certy.sideBox.makeSticky(), certy.nav.tooltip.el.length > 0 && certy.nav.tooltip.el.remove()
        }), e(window).on("load", function () { })
    }(jQuery);
var ace = {
    html: "",
    body: "",
    mobile: "",
    sidebar: {
        obj: "",
        btn: ""
    },
    nav: {
        obj: "",
        tooltip: jQuery('<div class="crt-tooltip"></div>')
    },
    overlay: {
        obj: jQuery('<div id="crtOverlay"></div>')
    },
    progress: {
        lines: "",
        charts: "",
        bullets: ""
    }
};
! function (e) {
    "use strict";
    e(function () {
        if (ace.html = e("html"), ace.body = e("body"), ace_detect_device_type(), e("#crtMainNavSm .menu-item-has-children > a").on("click touchstart", function () {
            return !!e(this).hasClass("hover") || (e(this).addClass("hover"), e(this).next().slideDown(500), !1)
        }), ace.sidebar.obj = e("#crtSidebar"), ace.sidebar.btn = e("#crtSidebarBtn"), ace.sidebar.btn.on("touchstart click", function () {
            ace_open_sidebar()
        }), e(document).on("touchstart click", ".crt-sidebar-opened #crtOverlay", function (e) {
            var t = ace.sidebar.obj;
            t.is(e.target) || 0 !== t.has(e.target).length || ace_close_sidebar()
        }), e("#crtSidebarClose").on("click", function () {
            ace_close_sidebar()
        }), e("#crtSidebarInner").mCustomScrollbar({
            axis: "y",
            theme: "minimal-dark",
            autoHideScrollbar: !0,
            scrollButtons: {
                enable: !0
            }
        }), !certy.progress.animation || ace.mobile) {
            ace.progress.charts = e(".progress-chart .progress-bar");
            for (var t = 0; t < ace.progress.charts.length; t++) {
                var o = e(ace.progress.charts[t]);
                ace_progress_chart(o[0], o.data("text"), o.data("value"), 1)
            }
            ace.progress.lines = e(".progress-line .progress-bar");
            for (var t = 0; t < ace.progress.lines.length; t++) {
                var r = e(ace.progress.lines[t]);
                ace_progress_line(r[0], r.data("text"), r.data("value"), 1)
            }
        }
        certy.progress.animation && !ace.mobile && ace_appear_elems(e(".crt-animate"), 0), e("pre").each(function (e, t) {
            hljs.highlightBlock(t)
        }), e(".alert .close").on("click", function () {
            var t = e(this).parent();
            t.fadeOut(500, function () {
                t.remove()
            })
        }), e(".slider").slick({
            dots: !0
        }), e("#map").length > 0 && initialiseGoogleMap(certy_vars_from_WP.mapStyles);
        var i = e(".tabs-menu>li.active");
        if (i.length > 0)
            for (var t = 0; t < i.length; t++) {
                var a = e(i[t]).children().attr("href");
                e(a).addClass("active").show()
            }
        e(".tabs-menu a").on("click", function (t) {
            var o = e(this),
                r = o.attr("href"),
                i = o.closest(".tabs"),
                a = i.find(".tab-content");
            o.parent().addClass("active"), o.parent().siblings().removeClass("active"), a.not(r).removeClass("active").hide(), e(r).addClass("active").fadeIn(500), t.preventDefault()
        });
        var s = e(".togglebox>li.active");
        s.length > 0 && s.find(".togglebox-content").show(), e(".togglebox-header").on("click", function () {
            var t = e(this);
            t.next(".togglebox-content").slideToggle(300), t.parent().toggleClass("active")
        });
        var n = e(".accordion>li.active");
        n.length > 0 && n.find(".accordion-content").show(), e(".accordion-header").on("click", function () {
            var t = e(this),
                o = t.parent(),
                r = t.next(),
                i = t.closest(".accordion").find(".accordion-content");
            o.hasClass("active") ? (o.removeClass("active"), r.slideUp()) : (o.siblings().removeClass("active"), o.addClass("active"), i.slideUp(300), r.slideDown(300))
        }), e(".comment-replys-link").on("click", function () {
            return e(this).closest(".comment").toggleClass("show-replies"), !1
        });
        var c = {};
        c.wrapper = null, c.content = null, c.slider = null, c.open = function (t) {
            this.wrapper = e('<div id="pf-popup-wrap" class="pf-popup-wrap"><div class="pf-popup-inner"><div class="pf-popup-middle"><div class="pf-popup-container"><button id="pf-popup-close"><i class="rsicon rsicon-close"></i></button><div id="pf-popup-content" class="pf-popup-content"></div></div></div></div>'), ace.body.append(this.wrapper), this.content = e("#pf-popup-content"), this.content.append(t.clone()), c.wrapper.addClass("opened"), ace_lock_scroll()
        }, c.close = function () {
            this.wrapper.removeClass("opened"), setTimeout(function () {
                c.wrapper.remove(), ace_unlock_scroll()
            }, 500)
        }, e(document).on("click", ".pf-btn-view", function () {
            var t = e(this).attr("href");
            return c.open(e(t)), ace.html.addClass("crt-portfolio-opened"), !1
        }), e(document).on("touchstart click", ".crt-portfolio-opened #pf-popup-wrap", function (t) {
            var o = e("#pf-popup-content");
            o.is(t.target) || 0 !== o.has(t.target).length || (c.close(), ace.html.removeClass("crt-portfolio-opened"))
        }), e(".toggle-link").on("click", function () {
            var t = e(this).attr("href");
            return e(this).hasClass("opened") ? (e(t).slideUp(500), e(this).removeClass("opened")) : (e(t).slideDown(500), e(this).addClass("opened")), !1
        }), e(".share-btn").on("mouseenter", function () {
            e(this).parent().addClass("hovered")
        }), e(".share-box").on("mouseleave", function () {
            var t = e(this);
            t.hasClass("hovered") && (t.addClass("closing"), setTimeout(function () {
                t.removeClass("hovered"), t.removeClass("closing")
            }, 300))
        })
    })
}(jQuery);
window.onload = function () {
    function e(e) {
        return e.stopPropagation ? e.stopPropagation() : window.event && (window.event.cancelBubble = !0), e.preventDefault(), !1
    }
    document.addEventListener("contextmenu", function (e) {
        e.preventDefault()
    }, !1), document.addEventListener("keydown", function (t) {
        t.ctrlKey && t.shiftKey && 73 == t.keyCode && e(t), t.ctrlKey && t.shiftKey && 74 == t.keyCode && e(t), 83 == t.keyCode && (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) && e(t), t.ctrlKey && 85 == t.keyCode && e(t), 123 == event.keyCode && e(t)
    }, !1)
};