/**
 * Core Javascript for Zeko
 */
//Todo Check field length - Max and Min
//Todo Create data structure for mails, object
//Todo Fecth Inbox
//Todo Fetch Drafts
(function () {

    var Zeko = {}; //App namespace

    /**
     * Initializes the App
     */
    Zeko.init = function () {
        console.log("Starting Zeko App");
        $(Zeko.config.signup_button).click(function () {
            Zeko.logic.user.signUp();
        });
        $(Zeko.config.login_button).click(function () {
            Zeko.logic.user.login();
        });
    }

    /**
     * Contains config data for Zeko App
     */
    Zeko.config = {
        signupFields: {
            username: {id: "#signup_uname", required: true, text: "Username", max_length: 25},
            firstname: {id: "#signup_firstname", required: true, text: "Firstname", max_length: 25},
            lastname: {id: "#signup_lastname", required: true, text: "Lastname", max_length: 25},
            gender: {id: "#signup_gender", required: true, text: "Gender", max_length: 6},
            secret_question: {id: "#signup_secret_q", required: true, text: "Secret Question", max_length: 50},
            secret_answer: {id: "#signup_secret_a", required: true, text: "Secret Answer", max_length: 20},
            alt_email: {id: "#signup_alt_email", required: true, text: "Alt Email", max_length: 50},
            pwd: {id: "#signup_pwd", required: true, text: "Password", min_length: 8},
            cpwd: {id: "#signup_cpwd", required: true, text: "Confirm Password", min_length: 8}
        },
        loginFields: {
            username: {id: "#login_uname", required: true, text: "Username"},
            password: {id: "#login_pwd", required: true, text: "Password"}
        },
        signup_button: "#signup_btn",
        login_button: "#login_btn"
    }

    /**
     *  Contains connections constants, response callParams and urls
     */
    Zeko.connect = {
        base: "http://localhost/zeko/trunk/core/logic/",
        queries: {
            signup: "create",
            login: "login",
            username_exists: "existing"
        },
        actions: {
            user: "user.php"
        },
        callParams: {
            query: "query",
            username: "username",
            password: "password",
            firstname: "firstname",
            lastname: "lastname",
            secret_question: "secret_question",
            secret_answer: "secret_answer",
            gender: "gender",
            alt_email: "alt_email"
        },
        responseParams: {
            status: "status",
            response: "response",
            user_auth_id: "user_auth_id",
            username: "username",
            firstname: "firstname",
            lastname: "lastname"
        }
    }

    /**
     * Contains utility Functions
     * @type {{compareFields: Function, isEmpty: Function, isEmailAdd: Function}}
     */
    Zeko.utils = {
        compareFields: function (fieldId1, fieldId2) {
            return !!($(fieldId1).id() === $(fieldId2).id());
        },
        isEmpty: function (fieldObj) {
            if (!fieldObj.required) {
                return false;
            } else {
                return $(fieldObj.id).id().length <= 0;
            }
        },
        isEmailAdd: function (email) {
            var regexp = new RegExp("^[a-z|A-Z][a-z|A-Z|0-9]*@[a-z|A-Z]+.[a-z|A-Z].?[a-z|A-Z]?");
            return regexp.test(email);
        }
    }

    /**
     * Contains App Logic
     */
    Zeko.logic = {
        user: {
            signUp: function () {
                var isEmpty = Zeko.utils.isEmpty;
                var fields = Zeko.config.signupFields;
                for (var property in fields) {
                    var field = fields[property];
                    if (Zeko.utils.isEmpty(field)) {
                        alert(field.text + " is empty");
                        return false;
                    }
                }
                if (!Zeko.utils.isEmailAdd($(fields.alt_email.id).id())) {
                    alert("Alt Email is not a valid email add");
                    return false;
                }
                if (!Zeko.utils.compareFields(fields.pwd.id, fields.cpwd.id)) {
                    alert("Passwords don't match");
                    return false;
                }
                console.log("Signing up");
                var url = Zeko.connect.base + Zeko.connect.actions.user;
                alert(url);
                var dataObj = {};
                // Getting parameters
                dataObj[Zeko.connect.callParams.query] = Zeko.connect.queries.signup;
                dataObj[Zeko.connect.callParams.username] = $(fields.username.id).id();
                dataObj[Zeko.connect.callParams.firstname] = $(fields.firstname.id).id();
                dataObj[Zeko.connect.callParams.lastname] = $(fields.lastname.id).id();
                dataObj[Zeko.connect.callParams.gender] = $(fields.gender.id).id();
                dataObj[Zeko.connect.callParams.alt_email] = $(fields.alt_email.id).id();
                dataObj[Zeko.connect.callParams.secret_question] = $(fields.secret_question.id).id();
                dataObj[Zeko.connect.callParams.secret_answer] = $(fields.secret_answer.id).id();
                dataObj[Zeko.connect.callParams.alt_email] = $(fields.alt_email.id).id();
                dataObj[Zeko.connect.callParams.password] = $(fields.pwd.id).id();
                alert(JSON.stringify(dataObj));
                // Start Connection Ise
                $.post(url, dataObj,function (data) {
                    alert(data);
                }).error(function () {

                    }).complete(function () {
                        console.log("done");
                    });
            },
            isUsernameExists: function () {
                /**
                 * Checks if the username exists or not
                 * Possible responses
                 * Not existing = 1
                 * Existing = 0
                 * Error = -1
                 * @return Integer
                 */
                var url = Zeko.connect.base;
                var dataObj = {};
                dataObj.query = Zeko.connect.queries.username_exists;
                dataObj.username = $(Zeko.config.signupFields.username.id).id();
                alert(JSON.stringify(dataObj));
                // Start Connection
                var response;
                $.getJSON(url, dataObj,function (data) {
                    response = data.response ? 0 : 1;
                }).error(function () {
                        response = -1;
                    }).complete(function () {
                    });
                return response;
            },
            login: function () {
                var isEmpty = Zeko.utils.isEmpty;
                var fields = Zeko.config.loginFields;
                for (var property in fields) {
                    var field = fields[property];
                    if (Zeko.utils.isEmpty(field)) {
                        alert(field.text + " is empty");
                        return false;
                    }
                }
                console.log("Logging in...");
                var url = Zeko.connect.base;
                var dataObj = {};
                // Getting parameters
                dataObj[Zeko.connect.callParams.query] = Zeko.connect.queries.login;
                dataObj[Zeko.connect.callParams.username] = $(fields.username.id).id();
                dataObj[Zeko.connect.callParams.password] = $(fields.password.id).id();
                // Start Connection
                $.post("./login.json", dataObj,function (data) {
                    if (data[Zeko.connect.responseParams.status] == true) {
                        alert("Ose");
                        Zeko.logic.user.setUserCookies(data[Zeko.connect.responseParams.response]);
                    } else {
                        alert("Lai lai");
                    }
                }).error(function () {
                        alert("Error occured while logging in");
                    }).complete(function () {
                    });
            },
            setUserCookies: function (data) {
                // Expires in 14 days
                var expiresDays = 14;
                $.cookie(Zeko.connect.responseParams.user_auth_id, data[Zeko.connect.responseParams.user_auth_id], {expires: 14});
                $.cookie(Zeko.connect.responseParams.username, data[Zeko.connect.responseParams.username], {expires: 14});
                $.cookie(Zeko.connect.responseParams.firstname, data[Zeko.connect.responseParams.firstname], {expires: 14});
                $.cookie(Zeko.connect.responseParams.lastname, data[Zeko.connect.responseParams.lastname], {expires: 14});
            },
            logout: function () {
                /**
                 * Logs the user out
                 */
                $.removeCookie(Zeko.connect.responseParams.user_auth_id);
                $.removeCookie(Zeko.connect.responseParams.username);
                $.removeCookie(Zeko.connect.responseParams.firstname);
                $.removeCookie(Zeko.connect.responseParams.lastname);
                // Perform UI Changes here

            }
        }
    }
    /**
     * Starts the Zeko App
     */
    $(document).ready(function () {
        Zeko.init();
    });
})();