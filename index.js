let window = require('browser-env')({
    url: "http://localhost",
    referrer: "https://example.com/",
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000
});
const fetch = require('node-fetch');
var request = require("request");
window.fetch=fetch;
global.fetch=fetch;
var options = {
    method: 'GET',
    url: 'https://api.cometchat-dev.com/v1/me',
    headers: {
        'Postman-Token': 'bd9eb533-8b38-48fc-a2a4-aa2f0d1e183b',
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authToken: 'user_3/026da4e48ad80a1a85f18d467caf99d2d50971f9',
        appId: '6e13b23d7a3'
    }
};



request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
let CometChat = require('@cometchat-pro/chat').CometChat;
const appId = "12573e6ce3866";
const apiKey = "75c762224d81cea788df4fedce21d66cdeb382b9";
let jasmine = require("jasmine");
beforeEach(function() {    
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    console.log(originalTimeout);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});
describe("Helloworld", function () {
    it("helloworld and this is testing", function (done) {
        try {
            CometChat.init(appId).then(() => {                              
                    CometChat.login("superhero1", apiKey).then(error=>{
                        console.log({error});
                        done();
                    },e=>{                        
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
