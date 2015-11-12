<?php
/**
 * Created by JetBrains PhpStorm.
 * User: user
 * Date: 8/2/13
 * Time: 11:33 AM
 * To change this template use File | Settings | File Templates.
 */
require '../utility/cleaner.php';
require '../config/constants.php';
require '../model/MailModel.php';
require '../utility/Util.php';

$send_mail_params = array(User_Auth::USER_AUTH_ID, Sent_Mail::BODY, RECIPIENT);
$save_mail_params = array(User_Auth::USER_AUTH_ID, Draft_Mail::SUBJECT, Draft_Mail::BODY, Draft_Mail::RECIPIENT);
$mail_model = new MailModel();
$query = $_REQUEST[QUERY];
if (isset($query)) {
    if ($query == SEND_MAIL) {
        if (Util::isRequestParamsSet($send_mail_params)) {
            if (isset($_REQUEST[Conversation::SUBJECT]) && isset($_REQUEST[Conversation::CONVERSATION_ID])) {
                Util::returnResponse(PARAMS_ERROR, false);
                exit();
            }
            if (isset($_REQUEST[Conversation::SUBJECT])) {
                $conversation_id = $mail_model->createConversation($_REQUEST[Conversation::SUBJECT]);
            } else if (isset($_REQUEST[Conversation::CONVERSATION_ID])) {
                if ($mail_model->isUserInConversation($_REQUEST[User_Auth::USER_AUTH_ID], ($_REQUEST[Conversation::CONVERSATION_ID]))) {
                    $conversation_id = $_REQUEST[Conversation::CONVERSATION_ID];
                } else {
                    Util::returnResponse(USER_NOT_IN_CONVERSATION, false);
                    exit();
                }
            } else {
                Util::returnResponse(PARAMS_ERROR, false);
                exit();
            }
            $sent_mail_id = $mail_model->addToSentMail(Util::stripRequestParams(array(User_Auth::USER_AUTH_ID, Sent_Mail::BODY)));
            $recipients = Util::splitCSV($_REQUEST[RECIPIENT]);
            $mail_model->addUserToConversation($_REQUEST[User_Auth::USER_AUTH_ID], $conversation_id);
            $mail_model->addUserToConversation($recipients, $conversation_id);
            $mail_model->sendMail($recipients, $sent_mail_id, $conversation_id);
            $mail_model->addToMailingList($recipients, $_REQUEST[User_Auth::USER_AUTH_ID]);
            Util::returnResponse(true);
        } else {
            Util::returnResponse(PARAMS_ERROR, false);
        }
    } else if ($query == SAVE_MAIL) {
        if (Util::isRequestParamsSet($save_mail_params)) {
            $mail_model->saveMail(Util::stripRequestParams($save_mail_params));
        } else {
            Util::returnResponse(PARAMS_ERROR, false);
        }
    } else if ($query == DELETE_MAIL || $query == TRASH_MAIL) {
        $delete_params = array(User_Auth::USER_AUTH_ID, MAIL_TYPE, MAIL_ID);
        if (Util::isRequestParamsSet($delete_params)) {
            $mail_type = $_REQUEST[MAIL_TYPE];
            $mail_status = ($query == DELETE_MAIL) ? Ref_Mail_Status::PERM_DELETE : Ref_Mail_Status::TEMP_DELETE;
            if ($mail_type == Draft_Mail::TABLE_NAME) {
                $mail_model->updateDraftMailStatus($mail_status, $_REQUEST[MAIL_ID], $_REQUEST[User_Auth::USER_AUTH_ID]);
            } else if ($mail_type == Sent_Mail::TABLE_NAME) {
                $mail_model->updateSentMailStatus($mail_status, $_REQUEST[MAIL_ID], $_REQUEST[User_Auth::USER_AUTH_ID]);
            } else if ($mail_type == INBOX) {
                $mail_model->updateInboxMailStatus($mail_status, $_REQUEST[MAIL_ID], $_REQUEST[User_Auth::USER_AUTH_ID]);
            }
        }
    } else if ($query == GET_INBOX && isset($_REQUEST[User_Auth::USER_AUTH_ID])) {

        // get inbox


    } else if ($query == GET_DRAFTS && isset($_REQUEST[User_Auth::USER_AUTH_ID])) {
        $result["drafts"] = $mail_model->getDrafts($_REQUEST[User_Auth::USER_AUTH_ID]);
        Util::returnResponse($result);

    } else if ($query == GET_MAILING_LIST && isset($_REQUEST[User_Auth::USER_AUTH_ID])) {
        $result["mailing_list"] = $mail_model->getMailingList($_REQUEST[User_Auth::USER_AUTH_ID]);
        Util::returnResponse($result);
    } else if ($query == GET_SENT_MAIL && isset($_REQUEST[User_Auth::USER_AUTH_ID])) {
        $result = $mail_model->getSentMail($_REQUEST[User_Auth::USER_AUTH_ID]);
        $final = array();
        for ($i = 0; $i < count($result); $i++) {
            $id = $result[$i]["sent_mail_id"];
            $recipient = "";
            $count = 0;
            for ($j = $i; $j < count($result); $j++) {
                if ($result[$j]["sent_mail_id"] == $id) {
                    $count++;
                    $recipient = $recipient . $result[$j]["recipients"] . ",";
                }
            }
            if ($count > 1) {
                $recipient = substr($recipient,0,strlen($recipient)-1);
                $result[$i]["recipients"] = $recipient;
                array_push($final, $result[$i]);
                array_splice($result, $i, $count);
            } else {
                array_push($final, $result[$i]);
            }


        }
        Util::returnResponse($final);

    } else {
        Util::returnResponse(PARAMS_ERROR, false);
    }
} else {
    Util::returnResponse(PARAMS_ERROR, false);
}
