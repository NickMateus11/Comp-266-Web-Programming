// Retrieved from: https://theysaidso.com/gadgets/v3/theysaidso.js

TheySaidSo = new function() {
    var e = ("https:" == document.location.protocol ? "https://" : "http://") + "theysaidso.com/gadgets/v3/",
        t = e + "default.css",
        d = e + "quote";
    this.render = function(e) {
        var o, i, n, s, r, a;
        void 0 === (e = function() {
            for (var e = 1; e < arguments.length; e++)
                for (var t in arguments[e]) arguments[e].hasOwnProperty(t) && (arguments[0][t] = arguments[e][t]);
            return arguments[0]
        }({
            node_id: Math.random().toString(36).substring(7)
        }, e)).qod_category && "undefined" != typeof theysaidso_category && (e.qod_category = theysaidso_category), void 0 === e.publisher_id && "undefined" != typeof theysaidso_publisher_id && (e.publisher_id = theysaidso_publisher_id), void 0 === e.quote_id && "undefined" != typeof theysaidso_quote_id && (e.quote_id = theysaidso_quote_id), null === document.getElementById(e.node_id) && document.write("<div id='" + e.node_id + "' style='display: none'></div>"), this.serverResponse = function(e) {
            if (e) {
                var t = document.getElementById(e.node),
                    d = document.createElement("div");
                t.appendChild(d), d.innerHTML = e.contents, t.style.display = "block", t.style.visibility = "visible"
            }
        }, o = t, i = e, n = document.createElement("script"), s = "?node=" + encodeURIComponent(i.node_id), r = "", a = "", void 0 !== i.qod_category && (r = "&category=" + encodeURIComponent(i.qod_category)), void 0 !== i.publisher_id && (r = "&publisherid=" + encodeURIComponent(i.publisher_id)), void 0 !== i.quote_id && (a = "&id=" + encodeURIComponent(i.quote_id)), n.src = d + s + r + a, document.getElementsByTagName("head")[0].appendChild(n)
    }, this.init = function() {
        var e = Math.random().toString(36).substring(7);
        this.render(e)
    }
};