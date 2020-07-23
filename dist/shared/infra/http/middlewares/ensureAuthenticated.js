"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("@config/auth"));
function ensureAuthentication(request, response, next) {
    var authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new Error('JWT Token is missing');
    }
    var _a = authHeader.split(' '), token = _a[1];
    try {
        var decoded = jsonwebtoken_1.verify(token, auth_1.default.jwt.secret);
        var sub = decoded.sub;
        request.user = {
            id: sub,
        };
        return next();
    }
    catch (error) {
        throw new Error('JWT Token Invalid');
    }
}
exports.default = ensureAuthentication;
