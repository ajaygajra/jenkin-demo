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
window.fetch = fetch;
global['fetch'] = fetch;
var chat_1 = require("@cometchat-pro/chat");
var appId = "12573e6ce3866", apiKey = "75c762224d81cea788df4fedce21d66cdeb382b9", uid = "superhero1";
console.log(fetch);
chat_1.CometChat.init(appId);
describe("CometChat login with apiKey", function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    it("Login Cometchat using valid user and apiKey", function (done) {
        chat_1.CometChat.login(uid, apiKey).then(function (user) {
            console.log(user);
            expect(user instanceof chat_1.CometChat.AppUser).toBe(true);
            done();
        }, function (error) {
            console.log(error);
            done.fail(error);
        });
    });
});
