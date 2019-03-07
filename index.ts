import { CometChat } from '@cometchat-pro/chat'
export const sayHelloToCompiler=function(compiler:string){
    console.log("Hello! "+compiler+",\nthis is typescript saying hi");
    console.log(CometChat.getInstance().getApiKey());
}
sayHelloToCompiler("Jenkin from git");
