/**
 * Created with JetBrains PhpStorm.
 * User: MICROSOFt
 * Date: 7/31/13
 * Time: 1:31 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Contains App Logic
 * Todo Handle sessions in php
 */
Zeko.logic = {
    user: {
        signUp: function () {
            var fields = Zeko.config.signupFields;
            console.log("Signing up");
            var url = Zeko.connect.base + Zeko.connect.actions.user;
            var dataObj = {};
            // Getting parameters
            dataObj[Zeko.connect.callParams.query] = Zeko.connect.queries.signup;
            dataObj[Zeko.connect.callParams.username] = $(fields.username.id).val().trim();
            dataObj[Zeko.connect.callParams.firstname] = $(fields.firstname.id).val().trim();
            dataObj[Zeko.connect.callParams.lastname] = $(fields.lastname.id).val().trim();
            dataObj[Zeko.connect.callParams.gender] = $(fields.gender.id).val();
            dataObj[Zeko.connect.callParams.alt_email] = $(fields.alt_email.id).val().trim();
            dataObj[Zeko.connect.callParams.secret_question] = $(fields.secret_question.id).val().trim();
            dataObj[Zeko.connect.callParams.secret_answer] = $(fields.secret_answer.id).val().trim();
            dataObj[Zeko.connect.callParams.alt_email] = $(fields.alt_email.id).val().trim();
            dataObj[Zeko.connect.callParams.password] = $(fields.pwd.id).val().trim();
            // Starting Connection
            $.post(url, dataObj,function (data) {
                var data = JSON.parse(data);
                if (data[Zeko.connect.responseParams.status] == true) {
                    var user_data = data[Zeko.connect.responseParams.response];
                    Zeko.logic.user.setUserCookies(user_data);
                    Zeko.utils.showAlert("Welcome " + user_data.username + " your name is " + user_data.firstname + " " + user_data.lastname);
                    Zeko.utils.clearFields(fields);
                    Zeko.utils.showSignupPhase1();
                    setTimeout(function () {
                        document.location.href = "dashboard.html"
                    }, 3000);
                } else {
                    Zeko.utils.showAlert(data[Zeko.connect.responseParams.error_message]);
                }
            }).error(Zeko.utils.showConnectionError).complete(function () {
                    $(".progress").hide();
                });
        },
        isUsernameExists: function (username) {
            /**
             * Checks if the username exists or not
             * Possible responses
             * Not existing = 1
             * Existing = 0
             * Error = -1
             * @return Integer
             */
            username = username.trim();
            if (username !== "") {
                var url = Zeko.connect.base + Zeko.connect.actions.user;
                var dataObj = {};
                dataObj.query = Zeko.connect.queries.username_exists;
                dataObj.username = username;
                // Start Connection
                $.getJSON(url, dataObj,function (data) {
                    if (data.status == true) {
                        var src = data.response ? "img/nope.png" : "img/ok.png";
                        $(Zeko.config.signupFields.username.id).css("background-image", "url(" + src + ")");
                    }
                }).error(function () {

                        $(Zeko.config.signupFields.username.id).css("background-image", "none");
                    }).complete(function () {
                    });
            } else {
                $(Zeko.config.signupFields.username.id).css("background-image", "none");
            }
        },
        login: function () {
            console.log("Logging in...");
            var url = Zeko.connect.base + Zeko.connect.actions.user;
            var fields = Zeko.config.loginFields;
            var dataObj = {};
            // Getting parameters
            dataObj[Zeko.connect.callParams.query] = Zeko.connect.queries.login;
            dataObj[Zeko.connect.callParams.username] = $(fields.username.id).val().trim();
            dataObj[Zeko.connect.callParams.password] = $(fields.password.id).val().trim();
            // Start Connection
            $.post(url, dataObj,function (data) {
                data = JSON.parse(data);
                if (data[Zeko.connect.responseParams.status] == true) {
                    var user_data = data[Zeko.connect.responseParams.response];
                    if ($(Zeko.config.loginFields.remember_me.id).is(":checked")) {
                        Zeko.logic.user.setUserCookies(user_data);
                    }
                    Zeko.utils.showAlert("Welcome " + user_data.username + " your name is " + user_data.firstname + " " + user_data.lastname);
                    $("#uname_indicator").hide();
                    Zeko.utils.clearFields(fields);
                    setTimeout(function () {
                        document.location.href = "dashboard.html"
                    }, 3000);
                } else {
                    Zeko.utils.showAlert(data[Zeko.connect.responseParams.error_message]);
                }
            }).error(Zeko.utils.showConnectionError).complete(function () {
                });
        },
        setUserCookies: function (data) {
            // Expires in 14 days or 2 weeks
            var expiresDays = 14;
            $.cookie(Zeko.connect.responseParams.user_auth_id, data[Zeko.connect.responseParams.user_auth_id], {expires: expiresDays});
            $.cookie(Zeko.connect.responseParams.username, data[Zeko.connect.responseParams.username], {expires: expiresDays});
            $.cookie(Zeko.connect.responseParams.firstname, data[Zeko.connect.responseParams.firstname], {expires: expiresDays});
            $.cookie(Zeko.connect.responseParams.lastname, data[Zeko.connect.responseParams.lastname], {expires: expiresDays});
        },
        logout: function () {
            /**
             * Logs the user out and clears the cookies
             */
            $.removeCookie(Zeko.connect.responseParams.user_auth_id);
            $.removeCookie(Zeko.connect.responseParams.username);
            $.removeCookie(Zeko.connect.responseParams.firstname);
            $.removeCookie(Zeko.connect.responseParams.lastname);
        },
        /**
         * Gets the security question of the username specified
         */
        getSecurityQuestion: function (recovery_username) {
            var username = recovery_username.trim();
            var url = Zeko.connect.base + Zeko.connect.actions.user;
            var dataObj = {};
            dataObj[Zeko.connect.callParams.query] = Zeko.connect.queries.get_security_question;
            dataObj[Zeko.connect.responseParams.username] = username;
            $.post(url, dataObj,function (data) {
                data = JSON.parse(data);
                if (data[Zeko.connect.responseParams.status] == true) {
                    var question = data[Zeko.connect.responseParams.response][Zeko.connect.responseParams.security_question];
                    var user_auth_id = data[Zeko.connect.responseParams.response][Zeko.connect.responseParams.user_auth_id];
                    Zeko.user_auth_id = user_auth_id;
                    $(Zeko.config.recovery_question).html(question);
                    $(Zeko.config.recovery_phase_1).hide();
                    $(Zeko.config.recovery_phase_2).fadeIn();
                } else {
                    Zeko.utils.showAlert(data[Zeko.connect.responseParams.error_message]);
                }
            }).error(Zeko.utils.showConnectionError).complete(function () {
                    $(".progress").hide();
                });
        },
        isSecurityAnswer: function (recovery_answer) {
            var url = Zeko.connect.base + Zeko.connect.actions.user;
            var dataObj = {};
            dataObj[Zeko.connect.callParams.query] = Zeko.connect.queries.is_security_answer;
            dataObj[Zeko.connect.callParams.user_auth_id] = Zeko.user_auth_id;
            dataObj[Zeko.connect.callParams.secret_answer] = recovery_answer.trim();
            $.post(url, dataObj,function (data) {
                data = JSON.parse(data);
                if (data[Zeko.connect.responseParams.status] == true) {
                    var response = data[Zeko.connect.responseParams.response];
                    if (response) {
                        $(Zeko.config.recovery_phase_2).hide();
                        $(Zeko.config.recovery_phase_3).fadeIn();
                        return false;
                    }
                }
                Zeko.utils.showAlert(data[Zeko.connect.responseParams.error_message]);
            }).error(Zeko.utils.showConnectionError).complete(function () {
                    $(".progress").hide();
                });
        },
        changePassword: function (password) {
            var url = Zeko.connect.base + Zeko.connect.actions.user;
            var dataObj = {};
            dataObj[Zeko.connect.callParams.query] = Zeko.connect.queries.change_password;
            dataObj[Zeko.connect.callParams.user_auth_id] = Zeko.user_auth_id;
            dataObj[Zeko.connect.callParams.password] = password.trim();
            $.post(url, dataObj,function (data) {
                data = JSON.parse(data);
                if (data[Zeko.connect.responseParams.status] == true) {
                    var response = data[Zeko.connect.responseParams.response];
                    if (response) {
                        $(Zeko.config.recoveryFields.password.id).val("");
                        $(Zeko.config.recoveryFields.confirm_password.id).val("");
                        Zeko.user_auth_id = undefined;
                        Zeko.utils.showAlert("Your Password has been reset");
                        setTimeout(function () {
                            document.location.href = "../index.html";
                        }, 3000);
                    }
                }
                Zeko.utils.showAlert(data[Zeko.connect.responseParams.error_message]);
            }).error(Zeko.utils.showConnectionError).complete(function () {
                    $(".progress").hide();
                });
        },
        getIdByUsername: function (username) {
            var url = Zeko.connect.base + Zeko.connect.actions.user;
            var dataObj = {}
            dataObj[Zeko.connect.callParams.username] = username.trim();
            $.post(url, dataObj,function (data) {
                if (data.status) {
                    console.log(dataObj[Zeko.connect.responseParams.response][Zeko.connect.responseParams.user_auth_id]);
                }
            }, "json").error(function () {
                    Zeko.utils.showConnectionError();
                }).complete(function () {

                });
        }
    },
    mail: {
        sendComposedMail: function (user_auth_id, conversation_id, recipients, subject, body) {
            // conversation_id = -1 when adding a mail to a conversation
            var url = Zeko.connect.base + Zeko.connect.actions.mail;
            var dataObj = {};
            dataObj[Zeko.connect.callParams.query] = Zeko.connect.queries.send_mail;
            dataObj[Zeko.connect.callParams.user_auth_id] = user_auth_id;
            dataObj[Zeko.connect.callParams.body] = body;
            dataObj[Zeko.connect.callParams.recipient] = recipients;
            if (conversation_id !== -1) {
                dataObj[Zeko.connect.callParams.subject] = subject;
            } else {
                dataObj[Zeko.connect.callParams.conversation_id] = "";
            }
            // you cannot have both subject and conversation id at the same time
            $.post(url, dataObj,function (data) {
                if (data.status) {
                    // perform UI Ise
                    Zeko.utils.showAlert("Sent");
                }
            }, "json").error(function () {
                    Zeko.utils.showConnectionError();
                }).complete(function () {

                });
        },
        saveAsDraft: function (user_auth_id, subject, body, recipients) {
            var url = Zeko.connect.base + Zeko.connect.actions.mail;
            var dataObj = {};
            dataObj[Zeko.connect.callParams.query] = Zeko.connect.queries.save_mail;
            dataObj[Zeko.connect.callParams.user_auth_id] = user_auth_id;
            dataObj[Zeko.connect.callParams.subject] = subject;
            dataObj[Zeko.connect.callParams.body] = body;
            dataObj[Zeko.connect.callParams.recipient] = recipients;
            $.post(url, dataObj,function (data) {
                if (data.status) {
                    console.log(data[Zeko.connect.responseParams.response]);
                }
            }, "json").error(function () {
                    Zeko.utils.showConnectionError();
                }).complete(function () {
                });
        },
        getDrafts: function (user_auth_id) {
            // Tested
            var url = Zeko.connect.base + Zeko.connect.actions.mail;
            var dataObj = {};
            dataObj[Zeko.connect.callParams.query] = Zeko.connect.queries.get_drafts;
            dataObj[Zeko.connect.callParams.user_auth_id] = user_auth_id;
            var result;
            // you cannot have both subject and conversation id at the same time
            $.post(url, dataObj,function (data) {
                if (data.status) {
                    console.log(data[Zeko.connect.responseParams.response][Zeko.connect.responseParams.drafts]);
                }
            }, "json").error(function () {
                    Zeko.utils.showConnectionError();
                }).complete(function () {
                });
        },
        getInbox: function (user_auth_id) {
            var url = Zeko.connect.base + Zeko.connect.actions.mail;
            var dataObj = {};
            dataObj[Zeko.connect.callParams.query] = Zeko.connect.queries.get_inbox;
            dataObj[Zeko.connect.callParams.user_auth_id] = user_auth_id;
            $.post(url, dataObj,function (data) {
                if (data.status) {
                    console.log(data[Zeko.connect.responseParams.response][Zeko.connect.responseParams.inbox]);
                }
            }, "json").error(function () {
                    Zeko.utils.showConnectionError();
                }).complete(function () {
                });
        },
        getTrash: function (user_auth_id) {
            var url = Zeko.connect.base + Zeko.connect.actions.mail;
            var dataObj = {};
            dataObj[Zeko.connect.callParams.query] = Zeko.connect.queries.get_trash;
            dataObj[Zeko.connect.callParams.user_auth_id] = user_auth_id;
            $.post(url, dataObj,function (data) {
                if (data.status) {
                    console.log(data[Zeko.connect.responseParams.response][Zeko.connect.responseParams.trash]);
                }
            }, "json").error(function () {
                    Zeko.utils.showConnectionError();
                }).complete(function () {
                });
        },
        getSentMail: function (user_auth_id) {
            var url = Zeko.connect.base + Zeko.connect.actions.mail;
            var dataObj = {};
            dataObj[Zeko.connect.callParams.query] = Zeko.connect.queries.get_sent_mail;
            dataObj[Zeko.connect.callParams.user_auth_id] = user_auth_id;
            $.post(url, dataObj,function (data) {
                if (data.status) {
                    console.log(data[Zeko.connect.responseParams.response][Zeko.connect.responseParams.sent_mails]);
                }
            }, "json").error(function () {
                    Zeko.utils.showConnectionError();
                }).complete(function () {
                });
        },
        trashMail: function (user_auth_id, sent_mail_id, mail_type) {
            var url = Zeko.connect.base + Zeko.connect.actions.mail;
            var dataObj = {};
            dataObj[Zeko.connect.callParams.query] = Zeko.connect.queries.trash_mail;
            dataObj[Zeko.connect.callParams.user_auth_id] = user_auth_id;
            $.post(url, dataObj,function (data) {
                if (data.status) {
                    console.log(data[Zeko.connect.responseParams.response]);
                }
            }, "json").error(function () {
                    Zeko.utils.showConnectionError();
                }).complete(function () {
                });
        },
        trashConversation: function (user_auth_id, rel_conversation_id) {

        },
        deleteMail: function (user_auth_id, sent_mail_id, mail_type) {
            var url = Zeko.connect.base + Zeko.connect.actions.mail;
            var dataObj = {};
            dataObj[Zeko.connect.callParams.query] = Zeko.connect.queries.delete_mail;
            dataObj[Zeko.connect.callParams.user_auth_id] = user_auth_id;
            $.post(url, dataObj,function (data) {
                if (data.status) {
                    console.log(data[Zeko.connect.responseParams.response]);
                }
            }, "json").error(function () {
                    Zeko.utils.showConnectionError();
                }).complete(function () {
                });
        },
        markAsRead: function (user_auth_id, mail_id) {

        },
        getMailingList: function (user_auth_id) {
            var url = Zeko.connect.base + Zeko.connect.actions.mail;
            var dataObj = {};
            dataObj[Zeko.connect.callParams.query] = Zeko.connect.queries.get_mailing_list;
            dataObj[Zeko.connect.callParams.user_auth_id] = user_auth_id;
            $.post(url, dataObj,function (data) {
                if (data.status) {
                    console.log(JSON.stringify(data));
                }
            }, "json").error(function () {
                    Zeko.utils.showConnectionError();
                }).complete(function () {
                });
        }
    }
}