/**
 * Created with JetBrains PhpStorm.
 * User: MICROSOFt
 * Date: 7/31/13
 * Time: 3:24 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Mail Data Structure
 * Used to represent mails from the server
 */

ZekoMail = function (data) {
    if (typeof data === "undefined") {
        this.id = 0;
        this.convesation_id = 0;
        this.subject = "";
        this.sender_id = 0;
        this.body = "";
        this.create_time = "";
        this.modified_time = "";
        this.has_attachment = false;
        this.status = 0;
    } else {

    }
};

