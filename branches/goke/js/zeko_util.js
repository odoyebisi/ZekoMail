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
    },
    showAlert: function (messageString) {
        $(Zeko.config.modalOptions.bodyId).html(messageString);
        $(Zeko.config.modalOptions.id).dialog({height: 200, width: 400, modal: true, resizable: false, draggable: false});
    }
}
