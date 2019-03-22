/**********************************************
   Boilerplate ends here for CometChat testing .
 **********************************************/
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

/***************************************
   Boilerplate ends here for CometChat.
 ***************************************/

const expect = require('chai').expect;
const appId = "1089f54cd9e81d";
    

describe('Initialise CometChat', function () {
    it('Should generate the error if initializing CometChat SDK without APP_ID', function () {
        return CometChat.init('').then(function () {
            expect(true).to.be.false;
        }, function (error) {
            expect(error).to.be.instanceof(CometChat.CometChatException);
        });
    });

    it('Should initialize on initializing CometChat SDK with APPID.', function () {
        return CometChat.init(appId).then(function () {
            expect(CometChat.isInitialized()).to.be.true;
        }, function (error) {
            expect(error).to.not.exist;
        });
    });
});
