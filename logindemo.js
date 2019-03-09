"use strict";
exports.__esModule = true;
var browserEnv = require("browser-env");
var fetch = require("node-fetch");
var window = browserEnv({
    url: "http://www.runtestcases.com",
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000
});
var global = window;
console.log({ window: window });
window.fetch = fetch;
global.fetch = fetch;
var CometchatGlobal = require("@cometchat-pro/chat");
var CometChat = CometchatGlobal.CometChat;
CometChat.init().then(function (a) {
    console.log(a);
}, function (error) {
    console.log(error);
});
