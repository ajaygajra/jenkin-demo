import * as browserEnv from 'browser-env';
import * as fetch from 'node-fetch';
import 'jasmine';

/**
 * Creating the window object to setup browese like envirnnoment in node module.
 */
const window = browserEnv({
    url: "http://www.runtestcases.com",
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000
});
const appId = 'abcdefghijklmnopqrstuvwxyz';
const global = window;
window.fetch = fetch;
global.fetch = fetch;


import { CometChat } from '@cometchat-pro/chat';

describe("Initialize the CometChat Object", () => {
    it("Should throw an error on blank initialization", (done) => {
        CometChat.init().then(() => {
            done.fail("CometChat got initialize even if no appId is provided");
        }, error => {        
            expect(error.message).toEqual("mandatory parameter appId missing");
            done();
        });
    });
    it("Should initialize the CometChat", (done) => {
        CometChat.init(appId).then(() => {
            done();            
        }, error => {
            done.fail(error);
        });
    });
});
