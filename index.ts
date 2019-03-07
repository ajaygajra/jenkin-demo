import { JSDOM } from 'jsdom';
import { CometChat } from '@cometchat-pro/chatsd';

const jsdom = new JSDOM();
const window = jsdom.window;
window.onload = function () {
    console.log("loaded");
    
    try {
        console.log(CometChat);
    } catch (error) {        
        console.log({ error });
        CometChat.init("helloworld");
        console.log({CometChat});
    }
}

export const sayHelloToCompiler = function (compiler: string) {
    console.log("Hello! " + compiler + ",\nthis is typescript saying hi");
}
sayHelloToCompiler("Jenkin from git");



