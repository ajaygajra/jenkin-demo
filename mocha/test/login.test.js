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





const assert = require('chai').assert;
const appId = "6e13b23d7a3",
    uid = "SUPERHERO1",
    invalidUid = 'SUPERHERO666',
    invalidApiKey = '3de4f1672b44a43f1593ea03a27e3b3202a3869C',
    apiKey = "3de4f1672b44a43f1593ea03a27e3b3202a3869b";



    describe('Initialise CometChat and perfrom login functions', function () {
        this.timeout(10000);
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

        it('Login should fail on blank userid', function (done) {
            CometChat.login('', apiKey).then(user => {
                done("blank userid still login");
            }, error => {
                done();
            });
        });

        it('Login should faile on blank apiKey', function (done) {
            CometChat.login(uid, '').then(user => {
                done(new Error("Invalid apiKey still loged in"));
            }, error => {
                done();
            })
        });

        it('Login should faile on invalid uid', function (done) {
            CometChat.login(invalidUid, apiKey).then(user => {
                done(new Error("Invalid `uid` still loged in"));
            }, error => {
                done();
            })
        });

        it('Login should faile on invalid apiKey', function (done) {
            CometChat.login(uid, invalidApiKey).then(user => {
                done(new Error("Invalid `apiKey` still loged in"));
            }, error => {
                done();
            })
        });

        it('Login should faile on invalid uid & apiKey', function (done) {
            CometChat.login(invalidUid, invalidApiKey).then(user => {
                done(new Error("Invalid `apiKey` and invalid `user` still loged in"));
            }, error => {
                done();
            })
        });

        it('Login to CometChat', function (done) {
            CometChat.login(uid, apiKey).then(user => {
                if (user instanceof CometChat.AppUser)
                    done();
                else
                    done(new Error("failed with error"));
            }, error => {
                done(new Error(JSON.stringify(error)));
            })
        });
    });
