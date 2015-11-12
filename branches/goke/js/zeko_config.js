/**
 * Created with JetBrains PhpStorm.
 * User: MICROSOFt
 * Date: 7/31/13
 * Time: 1:33 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Proper File Order
 * zeko_config
 * zeko_utils
 * zeko_logic
 * zeko_init
 */

var Zeko = {}; //App namespace

/*
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
    modalOptions: {
        id: "#dialog",
        bodyId: "#text"
    },
    signup_button: "#signup_btn",
    login_button: "#login_btn"
}

/**
 *  Contains connections constants, response/call params and urls
 */
Zeko.connect = {
    base: "http://localhost/zeko/trunk/core/logic/",
    queries: {
        signup: "create",
        login: "login",
        username_exists: "existing",
        get_security_question: "get_security_question"
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
        secret_question: "security_question",
        secret_answer: "security_answer",
        gender: "gender",
        alt_email: "alt_email"
    },
    responseParams: {
        status: "status",
        response: "response",
        error_message: "error_message",
        user_auth_id: "user_auth_id",
        username: "username",
        firstname: "firstname",
        lastname: "lastname"
    }
}

