import * as browserEnv from 'browser-env';
import * as fetch from 'node-fetch';
import "jasmine";

    
/**
 * Creating the window object to setup browese like envirnnoment in node module.
 */

 /**
  * Helloworld
  */
var window = browserEnv({
    url: "http://www.runtestcases.com",
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000
});


window.fetch = fetch;
global['fetch']=fetch;
import { CometChat } from '@cometchat-pro/chat';

const appId = "12573e6ce3866",
    apiKey = "75c762224d81cea788df4fedce21d66cdeb382b9",
    uid = "superhero1";    
    console.log(fetch);

CometChat.init(appId);

describe("CometChat login with apiKey", () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL=100000;
    it("Login Cometchat using valid user and apiKey", (done) => {        
        CometChat.login(uid, apiKey).then(user => {
            console.log(user);
            expect(user instanceof CometChat.AppUser).toBe(true);
            done();
        }, error => {
            console.log(error);
            done.fail(error);
        });
    });
});
