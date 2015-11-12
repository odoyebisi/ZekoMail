<?php
/**
 * Created by JetBrains PhpStorm.
 * User: user
 * Date: 7/29/13
 * Time: 2:05 PM
 * To change this template use File | Settings | File Templates.
 */

class Util
{
    static function encryptPassword($password)
    {
        $arr = str_split(sha1($password), 5);
        $new = array();
        $last = count($arr) - 1;
        $new[] = $arr[3];
        for ($i = $last; $i >= 0; --$i) {
            $new[] = $arr[$i];
        }
        $new[] = $arr[6];
        return join('', $new);

    }

    static function encryptRequestPassword()
    {
        $arr = str_split(sha1($_REQUEST[User_Auth::PASSWORD]), 5);
        $new = array();
        $last = count($arr) - 1;
        $new[] = $arr[3];
        for ($i = $last; $i >= 0; --$i) {
            $new[] = $arr[$i];
        }
        $new[] = $arr[6];
        $_REQUEST[User_Auth::PASSWORD] = join('', $new);
    }

    static function isRequestParamsSet($params)
    {
        if (count($params) > count($_REQUEST)) {
            return false;
        }
        for ($i = 0; $i < count($params); $i++) {
            if ($_REQUEST[$params[$i]] == "") {
                return false;
            }
        }

        return true;
    }

    static function stripRequestParams($placeholders)
    {
        $params = array();
        for ($i = 0; $i < count($placeholders); $i++) {
            $params[$i] = $_REQUEST[$placeholders[$i]];
        }
        return $params;
    }

    static function returnResponse($response, $status = true)
    {
        $result = array();
        $result["status"] = $status;
        $result[$status ? "response" : "error_message"] = $response;
        echo(json_encode($result));
    }

    static function logError($error)
    {
        file_put_contents('../logs/pdo_errors.txt', DATE('H:i:s, D, d M Y') . ' >>>> ' . $error . "\n", FILE_APPEND);
        exit();
    }

    static function splitCSV($data)
    {
        preg_match_all("/[0-9]+/", $data, $result);
        $arr = $result[0];
        return ($arr > 1) ? $arr : $arr[0];

    }
}