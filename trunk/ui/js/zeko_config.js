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
        firstname: {id: "#signup_firstname", required: true, text: "Firstname", max_length: 25, phase: 1},
        lastname: {id: "#signup_lastname", required: true, text: "Lastname", max_length: 25, phase: 1},
        gender: {id: "#signup_gender", required: false, text: "Gender", max_length: 6, phase: 1},
        alt_email: {id: "#signup_alt_email", required: true, text: "Alt Email", max_length: 50, phase: 1},
        secret_question: {id: "#signup_secret_q", required: true, text: "Secret Question", max_length: 50, phase: 2},
        secret_answer: {id: "#signup_secret_a", required: true, text: "Secret Answer", max_length: 20, phase: 2},
        username: {id: "#signup_uname", required: true, text: "Username", max_length: 25, phase: 3},
        pwd: {id: "#signup_pwd", required: true, text: "Password", min_length: 8, phase: 3},
        cpwd: {id: "#signup_cpwd", required: true, text: "Confirm Password", min_length: 8, phase: 3}
    },
    loginFields: {
        username: {id: "#login_uname", required: true, text: "Username"},
        password: {id: "#login_pwd", required: true, text: "Password"},
        remember_me: {id: "#login_remember", required: false}
    },
    recoveryFields: {
        username: {id: "#recovery_uname", required: true, text: "Username"},
        answer: {id: "#recovery_answer", required: true, text: "Security Answer"},
        password: {id: "#recovery_pwd", required: true, text: "Password"},
        confirm_password: {id: "#recovery_cpwd", required: true, text: "Confirm Password"}
    },
    modalOptions: {
        id: "#dialog",
        bodyId: "#text"
    },
    recovery_button_1: "#recovery_btn_1",
    recovery_button_2: "#recovery_btn_2",
    recovery_button_3: "#recovery_btn_3",
    recovery_question: "#recovery_question",
    signup_button_1: "#signup_btn_1",
    signup_button_2: "#signup_btn_2",
    signup_button_back_1: "#signup_btn_back_1",
    signup_button_back_2: "#signup_btn_back_2",
    signup_button: "#signup_btn",
    login_button: "#login_btn",
    signup_phase_1: "#signup_phase_1",
    signup_phase_2: "#signup_phase_2",
    signup_phase_3: "#signup_phase_3",
    recovery_phase_1: "#recovery_phase_1",
    recovery_phase_2: "#recovery_phase_2",
    recovery_phase_3: "#recovery_phase_3",
    error_message: "An error occured, please try again"
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
        get_security_question: "get_security_question",
        change_password: "change_password",
        is_security_answer: "is_security_answer",
        send_mail: "send_mail",
        get_drafts: "get_drafts",
        get_trash: "get_trash",
        save_mail: "save_mail",
        get_inbox: "get_inbox",
        get_sent_mail: "get_sent_mail",
        trash_mail: "trash_mail",
        get_mailing_list: "get_mailing_list",
        delete_mail: "delete_mail",
        restore_mail: "restore_mail",
        save_mail: "save_mail"
    },
    actions: {
        user: "user.php",
        mail: "mail.php"
    },
    callParams: {
        query: "query",
        username: "username",
        user_auth_id: "user_auth_id",
        password: "password",
        firstname: "firstname",
        lastname: "lastname",
        secret_question: "security_question",
        secret_answer: "security_answer",
        gender: "gender",
        alt_email: "alt_email",
        body: "body",
        recipient: "recipient",
        subject: "subject",
        conversation_id: "conversation_id",
        mail_type: "mail_type"
    },
    responseParams: {
        status: "status",
        response: "response",
        error_message: "error_message",
        user_auth_id: "user_auth_id",
        inbox: "inbox",
        username: "username",
        firstname: "firstname",
        lastname: "lastname",
        security_question: "security_question",
        drafts: "drafts",
        trash: "trash",
        sent_mails: "sent_mails"
    }, mailTypes: {
        draft: "draft_mail",
        inbox: "inbox",
        sent_mail: "sent_mail"
    }
}

