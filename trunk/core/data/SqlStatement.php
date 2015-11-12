<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Olaoye Adeyemi
 * Date: 7/29/13
 * Time: 1:38 PM
 * To change this template use File | Settings | File Templates.
 */

class User_Data
{
    //Insert required data into UserAuth Table
    const CREATE = "INSERT INTO user_auth(username,password,create_time,modified_time) VALUES (:username,:password,NOW(),NOW())";
    //Insert into User_Profile Table
    const CREATE_PROFILE = "INSERT INTO user_profile(user_auth_id,firstname,lastname,alt_email,gender,signature,modified_time,security_question,security_answer) VALUES (:user_auth_id,:firstname,:lastname,:alt_email,:gender,'',NOW(),:security_question,:security_answer)";
    //Select user_auth_id using username and password from User_Auth Table
    const AUTH = "SELECT user_auth_id FROM user_auth WHERE username=:username AND password=:password";
    //Update User status flag given the User id in User_Auth table
    const DEACTIVATE = "UPDATE user_auth SET user_auth_id=:user_auth_id WHERE user_status=:user_status";
    //Select user id from User_Auth table using username
    const GET_BY_USERNAME = "SELECT user_auth_id FROM user_auth WHERE username=:username";
    //Select a row from User_Auth table using user id
    const GET_BY_ID = "SELECT user_auth_id,username,password,user_privacy,user_status,create_time,modified_time FROM user_auth WHERE user_auth_id=:user_auth_id";
    //Get user's firstname, lastname, authid and username of user given the user_auth_id
    //(this might require you joining the User_Auth and User_Profile tables ;))
    const GET_USER_DETAILS_BY_ID = "SELECT user_auth.user_auth_id,user_auth.username,user_profile.firstname,user_profile.lastname FROM user_auth LEFT JOIN user_profile ON user_auth.user_auth_id = user_profile.user_auth_id WHERE user_auth.user_auth_id = :user_auth_id";
    //Select a row from User_Profile table using user id
    const GET_PROFILE_BY_ID = "SELECT user_auth_id,firstname,lastname,alt_email,gender,signature,modified_time,security_question,security_answer FROM user_profile WHERE user_auth_id=:user_auth_id";
    //get security_question from user profile table given the user_auth_id
    const GET_SECURITY_QUESTION = "SELECT security_question,user_auth_id  FROM user_profile WHERE user_auth_id=:user_auth_id";
    //get user_auth_id from user profile table given the user_auth_id and security_answer
    const GET_ID_BY_SECURITY_ANSWER = "SELECT user_auth_id FROM user_profile WHERE user_auth_id=:user_auth_id AND security_answer=:security_answer ";
    //update user's password using the user_auth_id
    const UPDATE_PASSWORD_BY_ID = "UPDATE user_auth SET password=:password WHERE user_auth_id=:user_auth_id ";
}

class Mail_Data
{
//insert into sent_mail
    const ADD_TO_SENT_MAIL = "INSERT INTO sent_mail(body,create_time,modified_time) VALUES (:body,NOW(),NOW())";
//insert into conversation
    const ADD_TO_CONVERSATION = "INSERT INTO conversation(suject,create_time) VALUES(:subject,NOW())";
//insert into rel_user_conversation
    const ADD_TO_REL_USER_CONVERSATION = "INSERT INTO rel_user_conversation(user_auth_id,conversation_id,create_time,modified_time) VALUES(:user_auth_id,:conversation_id,NOW(),NOW())";
//insert into rel_user_sentmail
    const ADD_TO_REL_USER_SENTMAIL = "INSERT INTO rel_user_sentmail(is_read,create_time,modified_time) VALUES(:is_read,NOW(),NOW())";
//select user_auth_id from rel_user_conversation using user_auth_id and conversation_id
    const GET_ID_FROM_CONVERSATION = "SELECT user_auth_id FROM rel_user_conversation WHERE user_auth=:user_auth AND conversation_id=:conversation_id";
    //insert into draft_mail
    const ADD_TO_DRAFT_MAIL = "";
    //insert into mailing_list
    const ADD_TO_MAILING_LIST = "";
    //update draft mail status
    const UPDATE_DRAFT_MAIL = "";
    //update sent mail status
    const UPDATE_SENT_MAIL = "";
    //update rel_user_sent_mail status
    const UPDATE_INBOX_MAIL = "";
//get drafts by user_auth_id from draft_mail
    const GET_DRAFTS_BY_ID = "";


}


