
import * as browserEnv from 'browser-env';
import * as fetch from 'node-fetch';


const window =browserEnv({
    url: "http://www.runtestcases.com",    
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000
});
const global=window;
console.log({window});
window.fetch=fetch;
global.fetch=fetch;

import * as CometchatGlobal from '@cometchat-pro/chat';

let CometChat=CometchatGlobal.CometChat;
CometChat.init().then(a=>{
    console.log(a);
},error=>{
    console.log(error);
});