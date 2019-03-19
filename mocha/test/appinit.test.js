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


    describe.skip('Initialise CometChat', function () {
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
