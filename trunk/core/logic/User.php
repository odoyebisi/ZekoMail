<?php
/**
 * Created by JetBrains PhpStorm.
 * User: user
 * Date: 7/29/13
 * Time: 3:23 PM
 * To change this template use File | Settings | File Templates.
 */


require '../utility/cleaner.php';
require '../config/constants.php';
require '../model/UserModel.php';
require '../utility/Util.php';

$user_model = new UserModel();

$login_params = array(User_Auth::USERNAME, User_Auth::PASSWORD);
$sign_up_params = array(User_Auth::USERNAME, User_Auth::PASSWORD,
    User_Profile::FIRSTNAME, User_Profile::LASTNAME,
    User_Profile::ALT_EMAIL, User_Profile::GENDER,
    User_Profile::SECURITY_QUESTION, User_Profile::SECURITY_ANSWER);
$create_user_params = array(User_Auth::USERNAME, User_Auth::PASSWORD);
$profile_params = array(User_Profile::USER_AUTH_ID, User_Profile::FIRSTNAME,
    User_Profile::LASTNAME, User_Profile::ALT_EMAIL, User_Profile::GENDER,
    User_Profile::SECURITY_QUESTION, User_Profile::SECURITY_ANSWER);
$update_password_params = array(User_Auth::PASSWORD, User_Auth::USER_AUTH_ID);
$answer_params = array(User_Auth::USER_AUTH_ID, User_Profile::SECURITY_ANSWER);

if (isset($_REQUEST[QUERY])) {
    $query = $_REQUEST[QUERY];
    if ($query == USER_CREATE) {
        if (Util::isRequestParamsSet($sign_up_params)) {
            $username = $_REQUEST[User_Auth::USERNAME];
            if (!$user_model->isUsernameExisting($username)) {
                Util::encryptRequestPassword();
                $create_user_details = Util::stripRequestParams($create_user_params);
                $auth_id = $user_model->create($create_user_details);
                $_REQUEST[User_Profile::USER_AUTH_ID] = $auth_id;
                $profile_details = Util::stripRequestParams($profile_params);
                $user_model->createProfile($profile_details);
                $details = $user_model->getUserDetails($auth_id);
                ($details != false) ? Util::returnResponse($details) : Util::returnResponse(ERROR_OCCURRED, false);
            } else {
                Util::returnResponse(USERNAME_EXISTS, false);
            }
        } else {
            Util::returnResponse(PARAMS_ERROR, false);
        }
    } else if ($query == USER_LOGIN) {
        if (Util::isRequestParamsSet($login_params)) {
            Util::encryptRequestPassword();
            $auth_id = $user_model->authenticate(Util::stripRequestParams($login_params));
            if ($auth_id != false) {
                $details = $user_model->getUserDetails($auth_id);
                ($details != false) ? Util::returnResponse($details) : Util::returnResponse(ERROR_OCCURRED, false);
            } else {
                Util::returnResponse(INVALID_CREDENTIALS, false);
            }
        } else {
            Util::returnResponse(PARAMS_ERROR, false);
        }
    } else if ($query == USER_EXISTING) {
        if (isset($_REQUEST[User_Auth::USERNAME])) {
            $existing = $user_model->isUsernameExisting($_REQUEST[User_Auth::USERNAME]);
            Util::returnResponse($existing);
        } else {
            Util::returnResponse(PARAMS_ERROR, false);
        }
    } else if ($query == GET_ID_BY_USERNAME && isset($_REQUEST[User_Auth::USERNAME])) {
        $result = $user_model->isUsernameExisting($_REQUEST[User_Auth::USERNAME], true);
        ($result == false) ? Util::returnResponse(USERNAME_DOES_NOT_EXIST, false) : Util::returnResponse($result);
    } else if ($query == USER_GET_SECURITY_QUESTION && isset($_REQUEST[User_Auth::USERNAME])) {
        $auth_id = $user_model->isUsernameExisting($_REQUEST[User_Auth::USERNAME], true);

        if ($auth_id != false) {
            Util::returnResponse($user_model->getSecurityQuestion($auth_id));
        } else {
            Util::returnResponse(INVALID_USERNAME, false);
        }
    } else if ($query == IS_SECURITY_ANSWER) {
        if (Util::isRequestParamsSet($answer_params)) {
            $auth_id = $user_model->isSecurityAnswer(Util::stripRequestParams($answer_params));
            if ($auth_id != false) {
                Util::returnResponse(true);
            } else {
                Util::returnResponse(SECURITY_ANSWER_WRONG, false);
            }
        } else {
            Util::returnResponse(PARAMS_ERROR, false);
        }
    } else if ($query == CHANGE_PASSWORD) {
        if (Util::isRequestParamsSet($update_password_params)) {
            Util::encryptRequestPassword();
            $status = $user_model->updatePassword(Util::stripRequestParams($update_password_params));
            $status ? Util::returnResponse($status) : Util::returnResponse(ERROR_OCCURRED, false);
        } else {
            Util::returnResponse(PARAMS_ERROR, false);
        }

    }  else {
        Util::returnResponse(PARAMS_ERROR, false);
    }
}

