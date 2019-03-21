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


var chai = require('chai');
var expect = require('chai').expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();
const assert = require('chai').assert;

const appId = "1089f54cd9e81d",
    uid = "jstestuser1",
    invalidUid = 'jstestuser',
    invalidApiKey = '3de4f1672b44a43f1593ea03a27e3b3202a3869C',
    apiKey = "fe9d19181100853ce4aab9c096ea851716cd9554";



describe('Initialize the CometChat and login', function () {
    this.timeout(10000);

    before(async function () {
        await CometChat.init(appId);
        if (CometChat.isInitialized()) {
            let user = await CometChat.login(uid, apiKey);
            expect(user).to.be.instanceof(CometChat.AppUser);
        }
    })

    describe('Create groups', function () {
        describe('Creating public group', function () {

            this.timeout(10000);
            let public_GUID = "test_public_group" + "_" + new Date().getTime();
            let notjoined_public_GUID = "test_group_one";

            let public_group_name = "Hello Group!";
            let public_group_des = "Hello Group! created  at " + new Date().toString();
            let group_type_public = CometChat.GROUP_TYPE.PUBLIC;

            var public_group = new CometChat.Group(public_GUID, public_group_name, group_type_public);
            public_group.setDescription(public_group_des);

            let public_group_to_be_joined = "jstestgroup1",
            public_group_to_be_left = "jstestgroup1";

            it("Should create public group", function () {            
                return CometChat.createGroup(public_group).should.eventually.to.be.instanceof(CometChat.Group);
            });

            it("Should not create public group since it's already present", function () {
                return CometChat.createGroup(public_group).should.be.rejectedWith(CometChat.CometChatException);
            });

            it("Get Group information for type=public and status=joined group", function () {
                return CometChat.getGroup(public_GUID).should.eventually.to.be.an.instanceof(CometChat.Group);
            });

            it("Get Group information for type=public and status=joined group", function () {
                return CometChat.getGroup(notjoined_public_GUID).should.be.rejectedWith(CometChat.CometChatException);
            });

            it("joining the group", function () {
                return CometChat.joinGroup(public_group_to_be_joined, group_type_public).should.eventually.to.be.an.instanceof(CometChat.Group);
            });

            it("leaving the group", function () {
                return CometChat.leaveGroup(public_group_to_be_left).should.eventually.to.be.true
            });
        });

        describe('Creating private group', function () {
            let private_GUID = "test_private_group" + "_" + new Date().getTime();
            let private_group_name = "Hello Group!";
            let private_group_des = "Hello Group! created  at " + new Date().toString();
            let group_type_private = CometChat.GROUP_TYPE.PRIVATE;
            let private_group = new CometChat.Group(private_GUID, private_group_name, group_type_private);



            let notjoined_private_GUID = "SUPERGROUP1";
            private_group.setDescription(private_group_des);


            let private_group_to_be_joined = "jstestgroup3",
            private_group_to_be_left = "jstestgroup3";
            


            it("Should create private group", function () {
                return CometChat.createGroup(private_group).should.eventually.to.be.an.instanceof(CometChat.Group)
            });

            it("Should not create private group since it's already present", function () {
                return CometChat.createGroup(private_group).should.be.rejectedWith(CometChat.CometChatException)
            });

            it("Get Group information for type=private and status=joined group", function () {
                return CometChat.getGroup(private_GUID).should.eventually.to.be.an.instanceof(CometChat.Group);
            });

            it("Get Group information for type=private and status=not joined group", function () {
                return CometChat.getGroup(notjoined_private_GUID).should.be.rejectedWith(CometChat.CometChatException);
            });
            it("Joining the private group", function () {
                return CometChat.joinGroup(private_group_to_be_joined, group_type_private).should.eventually.to.be.an.instanceof(CometChat.Group);
            });            
            it("Leaving the privte group", function () {
                return CometChat.leaveGroup(private_group_to_be_left).should.eventually.to.be.true
            });
        });

        describe('Creating password group', function () {
            let password_GUID = "jstestgroup6";
            let password_group_name = "Password Test Group One";
            let password_group_des = "Password";
            let group_type_password = CometChat.GROUP_TYPE.PASSWORD;
            let password = "password";

            let notjoined_password_GUID = "SUPERGROUP1";

            let password_group = new CometChat.Group(password_GUID, password_group_name, group_type_password, password);
            password_group.setDescription(password_group_des);

            it("Should create password group", function () {
                return CometChat.createGroup(password_group).should.eventually.to.be.an.instanceof(CometChat.Group)
            });

            it("Should not create password group since it's already present", function () {
                return CometChat.createGroup(password_group).should.be.rejectedWith(CometChat.CometChatException)
            });

            it("Get Group information for type=password and status=joined group", function () {
                return CometChat.getGroup(password_GUID).should.eventually.to.be.an.instanceof(CometChat.Group);
            });

            it("Get Group information for type=password and status=not joined group", function () {
                return CometChat.getGroup(notjoined_password_GUID).should.be.rejectedWith(CometChat.CometChatException);
            });

            it("Joining the password group", function () {
                return CometChat.joinGroup(password_group_to_be_joined, group_type_password,password).should.eventually.to.be.an.instanceof(CometChat.Group);
            });
               it("Leaving the privte group", function () {
                   return CometChat.leaveGroup(password_group_to_be_left).should.eventually.to.be.true
               });
        });
    });
});
