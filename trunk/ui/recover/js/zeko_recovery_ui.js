/**
 * Created with JetBrains PhpStorm.
 * User: MICROSOFt
 * Date: 8/2/13
 * Time: 4:11 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Handles all ui events in the password recovery page
 */
(function () {
    $(document).ready(function () {
        /**
         * Handles the click events for button of recvovery phase 1
         */
        var progress = $(".progress");
        progress.progressbar({
            value: false
        });
        progress.hide();
        $(Zeko.config.recovery_button_1).click(function () {
            var field = Zeko.config.recoveryFields.username;
            if (Zeko.utils.isEmpty(field)) {
                Zeko.utils.showAlert(field.text + " is empty");
            } else {
                var username = $(field.id).val();
                progress.show();
                Zeko.logic.user.getSecurityQuestion(username);
            }
        });
        /**
         * Handles the click events for button of recvovery phase 2
         */
        $(Zeko.config.recovery_button_2).click(function () {
            var field = Zeko.config.recoveryFields.answer;
            if (Zeko.utils.isEmpty(field)) {
                Zeko.utils.showAlert(field.text + " is empty");
            } else {
                var answer = $(field.id).val();
                progress.show();
                Zeko.logic.user.isSecurityAnswer(answer);
            }
        });
        /**
         * Handles the click events for button of recvovery phase 3
         */
        $(Zeko.config.recovery_button_3).click(function () {
            var check;
            var pwd_id = Zeko.config.recoveryFields.password.id;
            var cpwd_id = Zeko.config.recoveryFields.confirm_password.id;
            var isEmpty = Zeko.utils.isEmpty;
            var fields = Zeko.config.recoveryFields;
            for (var property in fields) {
                check = false;
                var field = fields[property];
                if (isEmpty(field)) {
                    Zeko.utils.showAlert(field.text + " is empty");
                    break;
                }
                check = true;
            }
            if (check && Zeko.utils.compareFields(pwd_id, cpwd_id)) {
                var pwd = $(pwd_id).val();
                progress.show();
                Zeko.logic.user.changePassword(pwd);
            }
        });
    });
})();