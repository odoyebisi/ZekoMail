<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Olaoye Adeyemi
 * Date: 7/22/13
 * Time: 12:25 PM
 * To change this template use File | Settings | File Templates.
 */


require '../model/BaseModel.php';


class UserModel extends BaseModel
{
    public function create($params)
    {
        return $this->add(User::CREATE, $params);
    }

    public function createProfile($params)
    {
        return $this->execute(User::CREATE_PROFILE, $params);

    }

    public function deactivate($id)
    {
        $this->execute(User::DEACTIVATE, $id);
    }

    public function authenticate($params)
    {
        $result = $this->getByParam(User::AUTH, $params);
        if ($result != false) {
            return $result[User_Auth::USER_AUTH_ID];
        } else {
            return $result;
        }
    }

    public function getUserDetails($auth_id)
    {
        return $this->getByParam(User::GET_USER_DETAILS_BY_ID, $auth_id);
    }

    public function isUsernameExisting($username, $return = false)
    {
        $result = $this->getByParam(User::GET_BY_USERNAME, $username);
        if ($return) {
            return $result[User_Auth::USER_AUTH_ID];
        }
        return ($result != false) ? true : false;
    }

    public function getById($id)
    {
        $this->getByParam(User::GET_BY_ID, $id);
    }

    public function getSecurityQuestion($auth_id)
    {
        return $this->getByParam(User::GET_SECURITY_QUESTION, $auth_id);
    }

    public function isSecurityAnswer($params)
    {
        return $this->getByParam(User::GET_ID_BY_SECURITY_ANSWER, $params);

    }

    public function updatePassword($params)
    {

        return $this->execute(User::UPDATE_PASSWORD_BY_ID, $params);
    }


}