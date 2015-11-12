<?php
/**
 * Created by JetBrains PhpStorm.
 * User: user
 * Date: 7/29/13
 * Time: 11:53 AM
 * To change this template use File | Settings | File Templates.
 */
require '../model/BaseModel.php';

class MailModel extends BaseModel
{

    public function  addToSentMail($params)
    {
        return $this->add(Mail::ADD_TO_SENT_MAIL, $params);

    }

    public function createConversation($subject)
    {
        return $this->add(Mail::ADD_TO_CONVERSATION, $subject);
    }

    public function addUserToConversation($auth_ids, $conversation_id)
    {
        if (is_array($auth_ids)) {
            for ($i = 0; $i < count($auth_ids); $i++) {
                if (!$this->isUserInConversation($auth_ids[$i], $conversation_id)) {
                    $params = array($auth_ids[$i], $conversation_id);
                    $this->execute(Mail::ADD_TO_REL_USER_CONVERSATION, $params);
                }
            }
        } else {
            if (!$this->isUserInConversation($auth_ids, $conversation_id)) {
                $params = func_get_args();
                $this->execute(Mail::ADD_TO_REL_USER_CONVERSATION, $params);
            }
        }
    }

    public function isUserInConversation($auth_id, $conversation_id)
    {
        $params = func_get_args();
        $result = $this->getByParam(Mail::GET_ID_FROM_CONVERSATION, $params);
        return ($result != false) ? true : $result;
    }

    public function sendMail($auth_ids, $sent_mail_id, $conversation_id)
    {
        if (is_array($auth_ids)) {
            for ($i = 0; $i < count($auth_ids); $i++) {
                $params = array($auth_ids[$i], $sent_mail_id, $conversation_id);
                $this->execute(Mail::ADD_TO_REL_USER_SENTMAIL, $params);
            }
        } else {
            $params = func_get_args();
            $this->execute(Mail::ADD_TO_REL_USER_SENTMAIL, $params);
        }

    }

    public function saveMail($params)
    {
        return $this->execute(Mail::ADD_TO_DRAFT_MAIL, $params);
    }

    public function updateDraftMailStatus($status, $mail_id, $auth_id)
    {
        $params = func_get_args();
        return $this->execute(Mail::UPDATE_DRAFT_MAIL, $params);
    }

    public function updateSentMailStatus($status, $mail_id, $auth_id)
    {
        $params = func_get_args();
        return $this->execute(Mail::UPDATE_SENT_MAIL, $params);
    }

    public function updateInboxMailStatus($status, $mail_id, $auth_id)
    {
        $params = func_get_args();
        return $this->execute(Mail::UPDATE_INBOX_MAIL, $params);
    }

    public function getDrafts($auth_id)
    {

        return $this->getAllByParam(Mail::GET_DRAFTS_BY_ID, $auth_id);
    }

    public function getInbox($auth_id, $limit = 0, $offset = 0)
    {

    }

    public function getSentMail($auth_id)
    {
        return $this->getAllByParam(Mail::GET_SENT_MAIL_BY_ID, $auth_id);
    }

    public function addToMailingList($contacts, $auth_id)
    {
        if (is_array($contacts)) {
            for ($i = 0; $i < count($contacts); $i++) {

                if (!$this->isUserInMailingList($contacts[$i], $auth_id)) {
                    $this->execute(User::ADD_TO_MAILING_LIST, array($auth_id, $contacts[$i]));
                }
            }
        } else {

            if (!$this->isUserInMailingList($contacts, $auth_id)) {
                $this->execute(User::ADD_TO_MAILING_LIST, array($auth_id, $contacts));
            }
        }
    }

    public function isUserInMailingList($contact, $owner)
    {
        $params = func_get_args();
        $result = $this->getByParam(User::GET_CONTACT, $params);
        return ($result != false) ? true : $result;
    }

    public function getMailingList($auth_id)
    {
        return $this->getAllByParam(User::GET_MAILING_LIST, $auth_id);
    }

}

