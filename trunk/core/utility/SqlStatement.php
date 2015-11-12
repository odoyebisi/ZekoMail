<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Olaoye Adeyemi
 * Date: 7/29/13
 * Time: 1:38 PM
 * To change this template use File | Settings | File Templates.
 */

class User
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
    //insert into mailing_list
    const ADD_TO_MAILING_LIST = "INSERT INTO mailing_list(owner, contact) VALUES (:owner, :contact)";
    //get mailing list
    const GET_MAILING_LIST = "SELECT user_auth.username, mailing_list.contact AS user_auth_id FROM mailing_list LEFT JOIN user_auth ON user_auth.user_auth_id = mailing_list.owner WHERE user_auth.user_auth_id = :user_auth_id";
    //get contact from mailing list by owner
    const GET_CONTACT = "SELECT owner FROM mailing_list WHERE contact = :contact AND owner = :owner";
}

class Mail
{
//insert into sent_mail
    const ADD_TO_SENT_MAIL = "INSERT INTO sent_mail(user_auth_id,body,create_time,modified_time) VALUES (:user_auth_id,:body,NOW(),NOW())";
//insert into conversation
    const ADD_TO_CONVERSATION = "INSERT INTO conversation(subject,create_time) VALUES(:subject,NOW())";
//insert into rel_user_conversation
    const ADD_TO_REL_USER_CONVERSATION = "INSERT INTO rel_user_conversation(user_auth_id,conversation_id,create_time,modified_time) VALUES(:user_auth_id,:conversation_id,NOW(),NOW())";
//insert into rel_user_sentmail
    const ADD_TO_REL_USER_SENTMAIL = "INSERT INTO rel_user_sentmail(user_auth_id,sent_mail_id, conversation_id,create_time,modified_time) VALUES(:user_auth_id,:sent_mail_id,:conversation_id,NOW(),NOW())";
//select user_auth_id from rel_user_conversation using user_auth_id and conversation_id
    const GET_ID_FROM_CONVERSATION = "SELECT user_auth_id FROM rel_user_conversation WHERE user_auth_id = :user_auth_id AND conversation_id = :conversation_id";
    //insert into draft_mail
    const ADD_TO_DRAFT_MAIL = "INSERT INTO draft_mail(user_auth_id, subject,body, recipient, create_time, modified_time) VALUES (:user_auth_id, :subject, :body, :recipient, NOW(), NOW())";
    //update draft mail status
    const UPDATE_DRAFT_MAIL = "UPDATE draft_mail SET status = :status WHERE draft_mail_id = :draft_mail_id AND user_auth_id = :user_auth_id";
    //update sent mail status
    const UPDATE_SENT_MAIL = "UPDATE sent_mail SET status = :status WHERE sent_mail_id = :sent_mail_id AND user_auth_id = :user_auth_id";
    //update rel_user_sent_mail status
    const UPDATE_INBOX_MAIL = "UPDATE rel_user_sentmail SET status = :status WHERE rel_user_sentmail_id = :sent_mail_id AND user_auth_id = :user_auth_id";
//get drafts by user_auth_id from draft_mail
    const GET_DRAFTS_BY_ID = "SELECT draft_mail_id,subject,body,recipient,modified_time FROM draft_mail WHERE user_auth_id = :user_auth_id AND status = 1";
//get sent mail bey user_auth_id from sent_mail
    const GET_SENT_MAIL_BY_ID = "SELECT sent_mail.sent_mail_id, sent_mail.body, rel_user_sentmail.user_auth_id AS recipients FROM sent_mail LEFT JOIN rel_user_sentmail ON sent_mail.sent_mail_id = rel_user_sentmail.sent_mail_id WHERE sent_mail.user_auth_id = :user_auth_id AND sent_mail.status = 1";
}

