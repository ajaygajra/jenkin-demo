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
    });
    describe("Get the group list", function () {
        it("Get the group list with valid limit", function () {
            let limit = 5,
                groupRequest = new CometChat.GroupsRequestBuilder().setLimit(limit).build();
            return groupRequest.fetchNext().then(groupList => {
                console.log(groupList.length);
            })
        });

        it("Get the group list with invalid/no limit", function () {
            let limit = 0,
                groupRequest = new CometChat.GroupsRequestBuilder().setLimit(limit).build();
            return groupRequest.fetchNext().then(groupList => {
                console.log(groupList.length);
            }, error => {
                console.log(error);
                expect(error).to.be.instanceof(CometChat.CometChatException);
            })
        });
    });

    describe('Create groups', function () {
        describe('Creating public group', function () {

            this.timeout(10000);
            let public_GUID = "test_public_group" + new Date().getTime()
            let notjoined_public_GUID = "jstestgroup2";

            let public_group_name = "Hello Group!";
            let public_group_des = "Hello Group! created  at " + new Date().toString();
            let group_type_public = CometChat.GROUP_TYPE.PUBLIC;

            var public_group = new CometChat.Group(public_GUID, public_group_name, group_type_public);
            public_group.setDescription(public_group_des);

            let public_group_to_be_joined = "jstestgroup1",
                public_group_to_be_left = "jstestgroup1";

            it("Should create public group", function () {
                return CometChat.createGroup(public_group).then(group => {
                    expect(group).to.be.an.instanceof(CometChat.Group) && expect(group).to.have.property('hasJoined') && expect(group.getHasJoined()).to.be.true;
                }, error => {
                    expect(error).to.not.exist;
                });
            });

            it("Should not create public group since it's already present", function () {
                return CometChat.createGroup(public_group).then(group => {
                    expect(group).to.not.exist;
                }, error => {

                    expect(error).to.be.an.instanceof(CometChat.CometChatException) && expect(error).to.have.property('details') && expect(error['details']).to.have.property('guid');
                });
            });

            it("Should get Group information for type=public and status=joined", function () {
                CometChat.getGroup(public_GUID).then(group => {
                    expect(group).to.be.an.instanceof(CometChat.Group);
                }, error => {
                    console.log(error);
                    expect(error).to.not.exist;
                });

            });

            it("Should not  get group information for type=public and status= not joined ", function () {
                CometChat.getGroup(notjoined_public_GUID).then(group => {
                    expect(group).to.not.exist;
                }, error => {
                    expect(error).to.be.an.instanceof(CometChat.CometChatException) && expect(error).to.have.property('code') && expect(error.code).to.be.equal('ERR_GROUP_NOT_JOINED');
                })
            });

            it("Should join the public group", function () {
                return CometChat.joinGroup(public_group_to_be_joined, group_type_public).then(group => {
                    expect(group).to.be.an.instanceof(CometChat.Group) && expect(group).to.haveOwnProperty('hasJoined') && expect(group.getHasJoined()).to.be.true;
                }, error => {
                    expect(error).to.not.exist;
                });
            });

            it("Should not join the public group since user is already a member", function () {
                return CometChat.joinGroup(public_group_to_be_joined, group_type_public).then(group => {
                    expect(group).to.not.exist;

                }, error => {
                    expect(error).to.be.an.instanceof(CometChat.CometChatException) && expect(error).to.have.property('code') && expect(error.code).to.be.equal('ERR_ALREADY_JOINED');
                });
            });

            it("Should leave the public group", function () {
                return CometChat.leaveGroup(public_group_to_be_left).then(hasLeft => {
                    expect(hasLeft).to.be.true;
                }, error => {
                    expect(error).to.not.exist;
                })
            });

            it("Should not leave the public group since user is not a member", function () {
                return CometChat.leaveGroup(public_group_to_be_left).then(hasLeft => {
                    expect(error).to.not.exist;
                }, error => {
                    expect(error).to.be.an.instanceof(CometChat.CometChatException) && expect(error).to.have.property('code') && expect(error.code).to.be.equal('ERR_GROUP_NOT_JOINED');

                })
            });
            it("Should delete the public group", function () {
                return CometChat.deleteGroup(public_GUID).then(
                    response => {
                        expect(response).to.be.true;
                    },
                    error => {
                        expect(error).to.not.exist;
                    }
                );
            });
            it("Should delete the public group which is not present", function () {
                return CometChat.deleteGroup(public_GUID).then(
                    response => {
                        expect(response).to.not.exist;
                    },
                    error => {
                        expect(error).to.be.an.instanceof(CometChat.CometChatException) && expect(error).to.have.property('code') && expect(error.code).to.be.equal('ERR_GUID_NOT_FOUND');
                    }
                );
            });
            it("Should delete the public group which he is not part of", function () {
                return CometChat.deleteGroup(public_group_to_be_left).then(
                    response => {
                        expect(response).to.not.exist;
                    },
                    error => {

                        expect(error).to.be.an.instanceof(CometChat.CometChatException) && expect(error).to.have.property('code') && expect(error.code).to.be.equal('ERR_GROUP_NOT_JOINED');
                    }
                );
            })
        });



        describe('Creating private group', function () {
            let private_GUID = "test_private_group" + "_" + new Date().getTime();
            let private_group_name = "Hello Group!";
            let private_group_des = "Hello Group! created  at " + new Date().toString();
            let group_type_private = CometChat.GROUP_TYPE.PRIVATE;
            let private_group = new CometChat.Group(private_GUID, private_group_name, group_type_private);



            let notjoined_private_GUID = "jstestgroup4";
            private_group.setDescription(private_group_des);


            let private_group_to_be_joined = "jstestgroup3",
                private_group_to_be_left = "jstestgroup3";




            it("Should create private group", function () {
                return CometChat.createGroup(private_group).then(group => {
                    expect(group).to.be.an.instanceof(CometChat.Group) && expect(group).to.have.property('hasJoined') && expect(group.getHasJoined()).to.be.true;
                }, error => {
                    expect(error).to.not.exist;
                });
            });

            it("Should not create private group since it's already present", function () {
                return CometChat.createGroup(private_group).then(group => {
                    expect(group).to.not.exist;
                }, error => {

                    expect(error).to.be.an.instanceof(CometChat.CometChatException) && expect(error).to.have.property('details') && expect(error['details']).to.have.property('guid');
                });
            });

            it("Should  get Group information for type=private and status=joined", function () {
                CometChat.getGroup(private_GUID).then(group => {
                    expect(group).to.be.an.instanceof(CometChat.Group);
                }, error => {
                    expect(error).to.not.exist;
                });

            });

            it("Should not  get group information for type=private and status= not joined ", function () {
                CometChat.getGroup(notjoined_private_GUID).then(group => {
                    expect(group).to.not.exist;
                }, error => {
                    expect(error).to.be.an.instanceof(CometChat.CometChatException) && expect(error).to.have.property('code') && expect(error.code).to.be.equal('ERR_GROUP_NOT_JOINED');
                })
            });

            it("Should join the private group", function () {
                return CometChat.joinGroup(private_group_to_be_joined, group_type_private).then(group => {
                    expect(group).to.be.an.instanceof(CometChat.Group) && expect(group).to.haveOwnProperty('hasJoined') && expect(group.getHasJoined()).to.be.true;
                }, error => {
                    expect(error).to.not.exist;
                });
            });

            it("Should not join the private group since user is already a member", function () {
                return CometChat.joinGroup(private_group_to_be_joined, group_type_private).then(group => {
                    expect(group).to.not.exist;

                }, error => {

                    expect(error).to.be.an.instanceof(CometChat.CometChatException) && expect(error).to.have.property('code') && expect(error.code).to.be.equal('ERR_ALREADY_JOINED');
                });
            });

            it("Should leave the private group", function () {
                return CometChat.leaveGroup(private_group_to_be_left).then(hasLeft => {
                    expect(hasLeft).to.be.true;
                }, error => {
                    expect(error).to.not.exist;
                })
            });

            it("Should not leave the private group since user is not a member", function () {
                return CometChat.leaveGroup(private_group_to_be_left).then(hasLeft => {
                    expect(error).to.not.exist;
                }, error => {
                    expect(error).to.be.an.instanceof(CometChat.CometChatException) && expect(error).to.have.property('code') && expect(error.code).to.be.equal('ERR_GROUP_NOT_JOINED');
                })
            });

            it("Should delete the public group", function () {
                return CometChat.deleteGroup(private_GUID).then(
                    response => {
                        expect(response).to.be.true;
                    },
                    error => {
                        expect(error).to.not.exist;
                    }
                );
            });
            it("Should delete the private group which is not present", function () {
                return CometChat.deleteGroup(private_GUID).then(
                    response => {
                        expect(response).to.not.exist;
                    },
                    error => {
                        expect(error).to.be.an.instanceof(CometChat.CometChatException) && expect(error).to.have.property('code') && expect(error.code).to.be.equal('ERR_GUID_NOT_FOUND');
                    }
                );
            });
            it("Should delete the private group which he is not part of", function () {
                return CometChat.deleteGroup(private_group_to_be_left).then(
                    response => {
                        expect(response).to.not.exist;
                    },
                    error => {

                        expect(error).to.be.an.instanceof(CometChat.CometChatException) && expect(error).to.have.property('code') && expect(error.code).to.be.equal('ERR_GROUP_NOT_JOINED');
                    }
                );
            })
        });


    });

    describe('Creating password group', function () {
        let password_GUID = "test_password_group" + "_" + new Date().getTime();
        let password_group_name = "Password Test Group One";
        let password_group_des = "Hello Group! created  at " + new Date().toString();
        let group_type_password = CometChat.GROUP_TYPE.PASSWORD;
        let password = "password";
        let invlidPassword = "invalidPassword";

        let notjoined_password_GUID = "jstestgroup6";

        let password_group = new CometChat.Group(password_GUID, password_group_name, group_type_password, password);
        password_group.setDescription(password_group_des);

        let password_group_to_be_left = 'jstestgroup5',
            password_group_to_be_joined = "jstestgroup5";




        it("Should create password group", function () {
            return CometChat.createGroup(password_group).then(group => {
                expect(group).to.be.an.instanceof(CometChat.Group) && expect(group).to.have.property('hasJoined') && expect(group.getHasJoined()).to.be.true;
            }, error => {
                expect(error).to.not.exist;
            });
        });

        it("Should not create password group since it's already present", function () {
            return CometChat.createGroup(password_group).then(group => {
                expect(group).to.not.exist;
            }, error => {

                expect(error).to.be.an.instanceof(CometChat.CometChatException) && expect(error).to.have.property('details') && expect(error['details']).to.have.property('guid');
            });
        });

        it("Should get Group information for type=password and status=joined", function () {
            return CometChat.getGroup(password_GUID).then(group => {
                expect(group).to.be.an.instanceof(CometChat.Group);
            }, error => {
                expect(error).to.not.exist;
            });

        });

        it("Should not get group information for type=password and status= not joined ", function () {
            return CometChat.getGroup(notjoined_password_GUID).then(group => {
                expect(group).to.not.exist;
            }, error => {
                expect(error).to.be.an.instanceof(CometChat.CometChatException) && expect(error).to.have.property('code') && expect(error.code).to.be.equal('ERR_GROUP_NOT_JOINED');
            })
        });

        it("Should join the password group", function () {
            return CometChat.joinGroup(password_group_to_be_joined, group_type_password, password).then(group => {
                expect(group).to.be.an.instanceof(CometChat.Group) && expect(group).to.haveOwnProperty('hasJoined') && expect(group.getHasJoined()).to.be.true;
            }, error => {
                expect(error).to.not.exist;
            });
        });

        it("Should not join the password group since user is already a member", function () {
            return CometChat.joinGroup(password_group_to_be_joined, group_type_password, password).then(group => {
                expect(group).to.not.exist;

            }, error => {

                expect(error).to.be.an.instanceof(CometChat.CometChatException) && expect(error).to.have.property('code') && expect(error.code).to.be.equal('ERR_ALREADY_JOINED');
            });
        });

        it("Should leave the password group", function () {
            return CometChat.leaveGroup(password_group_to_be_left).then(hasLeft => {
                expect(hasLeft).to.be.true;
            }, error => {
                expect(error).to.not.exist;
            })
        });

        it("Should not leave the password group since user is not a member", function () {
            return CometChat.leaveGroup(password_group_to_be_left).then(hasLeft => {
                expect(hasLeft).to.not.exist;
            }, error => {
                expect(error).to.be.an.instanceof(CometChat.CometChatException) && expect(error).to.have.property('code') && expect(error.code).to.be.equal('ERR_GROUP_NOT_JOINED');
            })
        });
        it("Should delete the public group", function () {
            return CometChat.deleteGroup(password_GUID).then(
                response => {
                    expect(response).to.be.true;
                },
                error => {
                    expect(error).to.not.exist;
                }
            );
        });

        it("Should delete the password group which is not present", function () {
            return CometChat.deleteGroup(password_GUID).then(
                response => {
                    expect(response).to.not.exist;
                },
                error => {
                    expect(error).to.be.an.instanceof(CometChat.CometChatException) && expect(error).to.have.property('code') && expect(error.code).to.be.equal('ERR_GUID_NOT_FOUND');
                }
            );
        });
        it("Should delete the private group which he is not part of", function () {
            return CometChat.deleteGroup(password_group_to_be_left).then(
                response => {
                    expect(response).to.not.exist;
                },
                error => {
                    expect(error).to.be.an.instanceof(CometChat.CometChatException) && expect(error).to.have.property('code') && expect(error.code).to.be.equal('ERR_GROUP_NOT_JOINED');
                }
            );
        })

    });
})
