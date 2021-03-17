"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send("許可されていません");
}
var router = express_1.Router();
exports.router = router;
router.get("/login", function (req, res) {
    res.send("\n    <form method=\"POST\">\n      <div>\n        <label>Email</label>\n        <input name=\"email\" type=\"text\" />\n      </div>\n      <div>\n        <label>Password</label>\n        <input name=\"password\" type=\"password\" />\n      </div>\n      <button>Submit</button>\n    </form>\n  \n  ");
});
router.post("/login", function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === "a@a.com" && password === "password") {
        req.session = { loggedIn: true };
        res.redirect("/");
    }
    else {
        res.send("password email が一致しません");
    }
});
router.get("/", function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n      <div>\n        <div> \u30ED\u30B0\u30A4\u30F3\u3057\u307E\u3057\u305F\u3000</div>\n        <a href=\"/logout\">\u30ED\u30B0\u30A2\u30A6\u30C8</a>\n      </div>\n    ");
    }
    else {
        res.send("\n      <div>\n        <div> \u30ED\u30B0\u30A4\u30F3\u3057\u3066\u304F\u3060\u3055\u3044\u3000</div>\n        <a href=\"/login\">\u30ED\u30B0\u30A4\u30F3</a>\n      </div>\n    ");
    }
});
router.get("/logout", function (req, res) {
    req.session = undefined;
    res.redirect("/");
});
router.get("/protected", requireAuth, function (req, res) {
    res.send("保護されたルートです");
});
