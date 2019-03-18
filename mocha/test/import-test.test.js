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

/******************************************
   Boilerplate ends here for CometChat testing.
 ******************************************/


const expect = require('expect.js');
describe('Exports the correct objects', () => {
    it('should export raw objects', (done) => {        
        
        expect(Object.keys(CometChat)).to.be.eql([
            'setAuthToken',
            'getAppId',
            'init',
            'isInitialized',
            'getInstance',
            'login',
            'sendMessage',
            'sendDirectMessage',
            'sendGroupMessage',
            'sendMediaMessage',
            'getLastDeliveredMessageId',
            'startTyping',
            'endTyping',
            'markMessageAsRead',
            'getMessageDetails',
            'getPreviousMessagesByTimestamp',
            'getPreviousMessagesById',
            'getNextMessagesByTimestamp',
            'getNextMessagesById',
            'getUser',
            'getLoggedinUser',
            'createGroup',
            'getGroup',
            'joinGroup',
            'updateGroup',
            'deleteGroup',
            'leaveGroup',
            'kickGroupMember',
            'updateGroupMemberScope',
            'banGroupMember',
            'unbanGroupMember',
            'initiateCall',
            'acceptCall',
            'rejectCall',
            'endCall',
            'getActiveCall',
            'startCall',
            'rejectIncomingCall',
            'cancelCall',
            'sendBusyResponse',
            'sendUnansweredResponse',
            'addMessageListener',
            'removeMessageListener',
            'addCallListener',
            'removeCallListener',
            'addUserListener',
            'removeUserListener',
            'addGroupListener',
            'removeGroupListener',
            'generateAuthToken',
            'XMPPLogin',
            'getAppSettings',
            'logout',
            'clearCache',
            'typingTimer',
            'initialzed',
            'TextMessage',
            'MediaMessage',
            'Action',
            'Call',
            'TypingNotification',
            'Group',
            'AppUser',
            'MessagesRequest',
            'MessagesRequestBuilder',
            'UsersRequest',
            'UsersRequestBuilder',
            'GroupsRequest',
            'GroupsRequestBuilder',
            'GroupMembersRequest',
            'GroupMembersRequestBuilder',
            'BannedMembersRequest',
            'BannedMembersRequestBuilder',
            'MessageListener',
            'UserListener',
            'GroupListener',
            'OngoingCallListener',
            'CallListener',
            'MESSAGE_TYPE',
            'CATEGORY_MESSAGE',
            'CATEGORY_ACTION',
            'CATEGORY_CALL',
            'ACTION_TYPE',
            'CALL_TYPE',
            'RECEIVER_TYPE',
            'CALL_STATUS',
            'CallController',
            'GROUP_MEMBER_SCOPE',
            'GROUP_TYPE',
            'MESSAGE_REQUEST',
            'isCall',
            'endpointFactory',
            'startTypingCount',
            'endTypingCount'
        ]);
        done();
    });
});