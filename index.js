/**
* creating window object for testing pupose only.
*/
const window = require('browser-env')({
    url: "http://www.runtestcases.com",    
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000
});

const fetch = require('node-fetch');
const CometChat = require('@cometchat-pro/chat').CometChat;

window.fetch = fetch;
global.fetch = fetch;

const appId = "12573e6ce3866",
    apiKey = "75c762224d81cea788df4fedce21d66cdeb382b9",
    jasmine = require("jasmine");

beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;    
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});
describe("Helloworld", function () {
    it("helloworld and this is testing", function (done) {
        try {
            CometChat.init(appId).then(() => {
                CometChat.login("superhero1", apiKey).then(error => {
                    console.log({ error });
                    done();
                }, e => {
                    console.log(e);
                    done.fail();
                });
            }, e => {
                console.log(e);
            });
        } catch (e) {
            console.log(e);
        }

    });
});
