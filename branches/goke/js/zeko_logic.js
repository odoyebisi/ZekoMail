/**
 * Created with JetBrains PhpStorm.
 * User: MICROSOFt
 * Date: 7/31/13
 * Time: 1:31 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Contains App Logic
 *
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
                Zeko.utils.showAlert(data);
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
            var url = Zeko.connect.base + Zeko.connect.actions.user;
            var dataObj = {};
            // Getting parameters
            dataObj[Zeko.connect.callParams.query] = Zeko.connect.queries.login;
            dataObj[Zeko.connect.callParams.username] = $(fields.username.id).id();
            dataObj[Zeko.connect.callParams.password] = $(fields.password.id).id();
            // Start Connection
            $.post(url, dataObj,function (data) {
                data = JSON.parse(data);
                if (data[Zeko.connect.responseParams.status] == true) {
                    var user_data = data[Zeko.connect.responseParams.response];
                    Zeko.logic.user.setUserCookies(user_data);
                    Zeko.utils.showAlert("Welcome " + user_data.username + " your name is " + user_data.firstname + " " + user_data.lastname);
                } else {
                    Zeko.utils.showAlert(data[Zeko.connect.responseParams.error_message]);
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

        },
        /**
         * Gets the security question of the username specified
         */
        getSecurityQuestion: function () {
            var username = $.cookie(Zeko.connect.responseParams.username);
            var url = Zeko.connect.base + Zeko.connect.actions.user;
            var dataObj = {};
            dataObj[Zeko.connect.callParams.query] = Zeko.connect.queries.get_security_question;
            dataObj[Zeko.connect.responseParams.username] = username;
            alert(dataObj);
            $.post(url, dataObj,function (data) {
                Zeko.utils.showAlert(data);
            }).error(function () {

                }).complete(function () {

                });
        },
        isSecurityAnswer: function () {

        },
        setPassword: function () {

        }
    }
}