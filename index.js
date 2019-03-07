"use strict";
exports.__esModule = true;
var jsdom_1 = require("jsdom");
var chat_1 = require("@cometchat-pro/chat");
var jsdom = new jsdom_1.JSDOM();
var window = jsdom.window;
window.onload = function () {
    console.log("loaded");
    try {
        console.log(chat_1.CometChat);
    }
    catch (error) {
        console.log({ error: error });
        chat_1.CometChat.init("helloworld");
        console.log({ CometChat: chat_1.CometChat });
    }
};
exports.sayHelloToCompiler = function (compiler) {
    console.log("Hello! " + compiler + ",\nthis is typescript saying hi");
};
exports.sayHelloToCompiler("Jenkin from git");
