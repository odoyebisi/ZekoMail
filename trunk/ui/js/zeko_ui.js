/**
 * Created with JetBrains PhpStorm.
 * User: MICROSOFt
 * Date: 7/31/13
 * Time: 1:31 PM
 * To change this template use File | Settings | File Templates.
 */
(function () {
    Zeko.ui = {
        /**
         * Verifies all fields in a signup phase based on phase number given
         * @param phase_num
         * @returns {boolean}
         */
        verifySignup: function (phase_num) {
            var isEmpty = Zeko.utils.isEmpty;
            var fields = Zeko.config.signupFields;
            for (var property in fields) {
                var field = fields[property];
                if (field.phase === phase_num) {
                    if (isEmpty(field)) {
                        Zeko.utils.showAlert(field.text + " is empty");
                        return false;
                    }
                }
            }
            if (phase_num === 1) {
                if (!Zeko.utils.isEmailAdd($(fields.alt_email.id).val())) {
                    Zeko.utils.showAlert("Alt Email is not a valid email add");
                    return false;
                }
            } else if (phase_num === 3) {
                if (!Zeko.utils.compareFields(fields.pwd.id, fields.cpwd.id)) {
                    Zeko.utils.showAlert("Passwords don't match");
                    return false;
                }
            }
            return true;
        },
        /**
         * Verifies all fields required for login
         * @returns {boolean}
         */
        verifyLogin: function () {
            var isEmpty = Zeko.utils.isEmpty;
            var fields = Zeko.config.loginFields;
            for (var property in fields) {
                var field = fields[property];
                if (isEmpty(field)) {
                    Zeko.utils.showAlert(field.text + " is empty");
                    return false;
                }
            }
            return true;
        }
    }

    /**
     * Initializes the Main Zeko UI, and binds events handlers
     */
    Zeko.init = function () {
        var progress = $(".progress");
        progress.progressbar({
            value: false
        });
        progress.hide();
        $(Zeko.config.signup_button_1).click(function () {
            if (Zeko.ui.verifySignup(1)) {
                $(Zeko.config.signup_phase_1).hide();
                $(Zeko.config.signup_phase_2).fadeIn();
            }
        });
        $(Zeko.config.signup_button_2).click(function () {
            if (Zeko.ui.verifySignup(2)) {
                $(Zeko.config.signup_phase_2).hide();
                $(Zeko.config.signup_phase_3).fadeIn();
            }
        });
        $(Zeko.config.signup_button_back_1).click(function () {
            $(Zeko.config.signup_phase_2).hide();
            $(Zeko.config.signup_phase_1).fadeIn();
        });
        $(Zeko.config.signup_button_back_2).click(function () {
            $(Zeko.config.signup_phase_3).hide();
            $(Zeko.config.signup_phase_2).fadeIn();
        });
        $(Zeko.config.signup_button).click(function () {
            if (Zeko.ui.verifySignup(3)) {
                progress.show();
                Zeko.logic.user.signUp();
            }
        });
        $(Zeko.config.login_button).click(function () {
            if (Zeko.ui.verifyLogin()) {
                Zeko.logic.user.login();
            }
        });
        var usernameField = $(Zeko.config.signupFields.username.id);
        $(usernameField).blur(function () {
            Zeko.logic.user.isUsernameExists($(Zeko.config.signupFields.username.id).val());
        });
    }
})();
