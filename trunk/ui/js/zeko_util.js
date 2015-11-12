/**
 * Created with JetBrains PhpStorm.
 * User: MICROSOFt
 * Date: 7/31/13
 * Time: 1:32 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Contains utility Functions
 * @type {{compareFields: Function, isEmpty: Function, isEmailAdd: Function}}
 */
Zeko.utils = {
    compareFields: function (fieldId1, fieldId2) {
        return !!($(fieldId1).val() === $(fieldId2).val());
    },
    isEmpty: function (fieldObj) {
        if (!fieldObj.required) {
            return false;
        } else {
            return $(fieldObj.id).val().trim().length <= 0;
        }
    },
    isEmailAdd: function (email) {
        var emailRegex = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
//        var emailRegex = "^[a-z|A-Z][a-z|A-Z|0-9|.|_]*@[a-z|A-Z].[a-z|A-Z].?[a-z|A-Z]?";
        var regexp = new RegExp(emailRegex);
        return regexp.test(email);
    },
    showAlert: function (messageString) {
        $(Zeko.config.modalOptions.bodyId).html(messageString);
        $(Zeko.config.modalOptions.id).dialog({height: 200, width: 400, modal: true, resizable: false, draggable: false});
    },
    showConnectionError: function () {
        Zeko.utils.showAlert(Zeko.config.error_message);
    },
    clearFields: function (field_array) {
        var fields = field_array;
        for (var property in fields) {
            var field = fields[property];
            if (field.required) {
                $(field.id).val("");
            }
        }
    },
    // Should be in the UI, will still rearrange
    showSignupPhase1: function () {
        $(Zeko.config.signup_phase_3).hide();
        $(Zeko.config.signup_phase_1).fadeIn();
    }
}
