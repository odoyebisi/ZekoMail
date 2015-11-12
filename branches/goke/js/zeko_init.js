/**
 * Created with JetBrains PhpStorm.
 * User: MICROSOFt
 * Date: 7/31/13
 * Time: 1:44 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Here the entire App is initialized
 */

/**
 * Initializes the App
 */
(function () {
    Zeko.init = function () {
        console.log("Starting Zeko App");
        $(Zeko.config.signup_button).click(function () {
            Zeko.logic.user.signUp();
        });
        $(Zeko.config.login_button).click(function () {
            Zeko.logic.user.login();
        });
    }

    $(document).ready(function () {
        Zeko.init();
    });

    $("#auto").autocomplete({
        source: ["Auto", "Jide", "Goke"]
    });
})();

