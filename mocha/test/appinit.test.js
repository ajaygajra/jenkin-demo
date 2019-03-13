const window = require('browser-env')({
    url: "http://www.runtestcases.com",
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000
});
const fetch = require('node-fetch');
const CometChat = require('@cometchat-pro/chat').CometChat;
const assert = require('chai').assert;
const chai = require('chai');
window.fetch = fetch;
global.fetch = fetch;

const appId="DUMMY_APP_ID";

describe('Array', function () {
    describe('#indexOf()', function () {
        it('Should generate the error if no appId/blank appId is provided', function (done) {
            CometChat.init('').then(function () {
                done.fail('initialization done without the valid appId');
            }, function (error) {
                assert.exists(error);
                done();
            });
        });
        it('Should initialize the CometChat once valide appId is provided', function (done) {
            CometChat.init(appId).then(function () {
                if (CometChat.isInitialized()) done();
                else done(new Error("CometChat is not initialized"));
            }, function (error) {
                done(new Error(JSON.stringify(error)));
            });
        });
    });
});