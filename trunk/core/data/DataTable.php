<?php

class Attachment
{
    const TABLE_NAME = "attachment";
    const MAIL_ID = "mail_id";
    const FILENAME = "filename";
    const IS_DRAFT = "is_draft";
    Const CREATE_TIME = "create_time";

}

class Ref_Log_Type
{
    const TABLE_NAME = "ref_log_type";
    const REF_LOG_TYPE_ID = "ref_log_type_id";
    const NAME = "name";
    const FLAG = "flag";

}

class Mailing_List
{
    const TABLE_NAME = "mailing_list";
    const OWNER = "owner";
    const CONTACT = "contact";
    const MAILING_LIST_ID = "mailing_list-id";
}

class Draft_Mail
{
    const TABLE_NAME = "draft_mail";
    const DRAFT_MAIL_ID = "draft_mail_id";
    const  USER_AUTH_ID = "user_auth_id";
    const SUBJECT = "subject";
    const BODY = "body";
    const RECIPIENT = "recipient";
    const HAS_ATTACHMENT = "has_attachment";
    const STATUS = "status";
    const CREATE_TIME = "create_time";
    const MODIFIED_TIME = "modified_time";
}

class Sent_Mail
{
    const TABLE_NAME = "sent_mail";
    const SENT_MAIL_ID = "	sent_mail_id";
    const  USER_AUTH_ID = "user_auth_id";
    const HAS_ATTACHMENT = "has_attachment";
    const STATUS = "status";
    const BODY = "body";
    const CREATE_TIME = "create_time";
    const MODIFIED_TIME = "modified_time";


}

class Rel_User_Sentmail
{
    const TABLE_NAME = "rel_user_sentmail";
    const REL_USER_SENTMAIL_ID = "rel_user_sentmail_id";
    const USER_AUTH_ID = "user_auth_id";
    const SENT_MAIL_ID = "sent_mail_id";
    const CONVERSATION_ID = "conversation_id";
    const IS_READ = "is_read";
    const STATUS = "status";
    const CREATE_TIME = "create_time";
    const MODIFIED_TIME = "modified_time";

}

class User_Profile
{
    const TABLE_NAME = "user_profile";
    const USER_AUTH_ID = "user_auth_id";
    const FIRSTNAME = "firstname";
    const LASTNAME = "lastname";
    const ALT_EMAIL = "alt_email";
    const GENDER = "gender";
    const SIGNATURE = "signature";
    const MODIFIED_TIME = "modified";
    const SECURITY_QUESTION = "security_question";
    const SECURITY_ANSWER = "security_answer";

}

class Ref_User_Privacy
{
    const TABLE_NAME = "ref_user_privacy";
    const REF_USER_PRIVACY_ID = "ref_user_privacy_id";
    const NAME = "name";
    const FLAG = "flag";
    const USER_PUBLIC = 1;
    const USER_PRIVATE = 1;


}

class Ref_User_Status
{
    const TABLE_NAME = "ref_user_status";
    const REF_USER_STATUS_ID = "ref_user_status_id";
    const NAME = "name";
    const FLAG = "flag";
    const ACTIVE = 1;
    const INACTIVE = 2;


}

class User_Auth
{
    const TABLE_NAME = "user_auth";
    const USER_AUTH_ID = "user_auth_id";
    const USERNAME = "username";
    const PASSWORD = "password";
    const USER_PRIVACY = "user_privacy";
    const USER_STATUS = "user_status";
    const CREATE_TIME = "create_time";
    const MODIFIED_TIME = "modified_time";

}

class Conversation
{
    const TABLE_NAME = "conversation";
    const CONVERSATION_ID = "conversation_id";
    const SUBJECT = "subject";
    const CREATE_TIME = "create_time";

}

class Ref_Mail_Status
{
    const TABLE_NAME = "ref_mail_status";
    const REF_MAIL_STATUS_ID = "ref_mail_status_id";
    const NAME = "name";
    const FLAG = "flag";
    const NORMAL = 1;
    const TEMP_DELETE = 2;
    const PERM_DELETE = 3;

}

class Rel_User_Conversation
{
    const TABLE_NAME = "ref_user_conversation";
    const REL_USER_CONVERSATION_ID = "rel_user_conversation_id";
    const USER_AUTH_ID = "user_auth_id";
    const CONVERSATION_ID = "conversation_id";
    const CREATE_TIME = "create_time";
    const MODIFIED_TIME = "modified_time";

}

class Log
{
    const TABLE_NAME = "log";
    const LOG_ID = "log_id";
    const USER_AUTH_ID = "user_auth_id";
    const MAIL_ID = "mail_id";
    const LOG_TYPE = "log_type";
    const IP_ADDRESS = "ip_address";
    const BROWSER_TYPE = "browser_type";
    const CREATE_TIME = "create_time";

}
 


 









