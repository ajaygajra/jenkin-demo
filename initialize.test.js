"use strict";
exports.__esModule = true;
var browserEnv = require("browser-env");
var fetch = require("node-fetch");
require("jasmine");
/**
 * Creating the window object to setup browese like envirnnoment in node module.
 */
var window = browserEnv({
    url: "http://www.runtestcases.com",
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000
});
var appId = 'abcdefghijklmnopqrstuvwxyz';
var global = window;
window.fetch = fetch;
global.fetch = fetch;
var chat_1 = require("@cometchat-pro/chat");
describe("Initialize the CometChat Object", function () {
    it("Should throw an error on blank initialization", function (done) {
        chat_1.CometChat.init().then(function () {
            done.fail("CometChat got initialize even if no appId is provided");
        }, function (error) {
            expect(error.message).toEqual("mandatory parameter appId missing");
            done();
        });
    });
    it("Should initialize the CometChat", function (done) {
        chat_1.CometChat.init(appId).then(function () {
            done();
        }, function (error) {
            done.fail(error);
        });
    });
});
