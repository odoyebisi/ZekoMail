CREATE DATABASE IF NOT EXISTS zeko;
USE zeko;

/*by sushy*/
CREATE TABLE IF NOT EXISTS ref_user_privacy
(
ref_user_privacy_id SMALLINT unsigned AUTO_INCREMENT NOT NULL primary key,
name VARCHAR(15) NOT NULL,
flag BOOLEAN NOT NULL
);
INSERT INTO ref_user_privacy (name,flag) VALUES ("PUBLIC", 1);
INSERT INTO ref_user_privacy (name,flag) VALUES ("PRIVATE", 1);


CREATE TABLE IF NOT EXISTS ref_user_status
(
ref_user_status_id SMALLINT unsigned AUTO_INCREMENT NOT NULL primary key,
name VARCHAR(15) NOT NULL,
flag BOOLEAN NOT NULL
);
INSERT INTO ref_user_status (name,flag) VALUES ("ACTIVE", 1);
INSERT INTO ref_user_status (name,flag) VALUES ("INACTIVE", 1);


/*by sushy*/
CREATE TABLE IF NOT EXISTS ref_mail_status
(
ref_mail_status_id SMALLINT unsigned AUTO_INCREMENT NOT NULL primary key,
name VARCHAR(15) NOT NULL,
flag BOOLEAN NOT NULL
);

INSERT INTO ref_mail_status (name,flag) VALUES ("NORMAL", 1);
INSERT INTO ref_mail_status (name,flag) VALUES ("TEMP_DELETE", 1);
INSERT INTO ref_mail_status (name,flag) VALUES ("PERM_DELETE", 1);


/* by sushy */
CREATE TABLE IF NOT EXISTS user_auth
(
user_auth_id INT unsigned AUTO_INCREMENT NOT NULL primary key,
username VARCHAR(25) NOT NULL,
password VARCHAR(68) NOT NULL,
user_privacy SMALLINT unsigned NOT NULL DEFAULT 1,
user_status SMALLINT unsigned NOT NULL DEFAULT 1,
create_time DATETIME NOT NULL,
modified_time DATETIME NOT NULL ,
CONSTRAINT fk_user_privacy FOREIGN KEY (user_privacy) REFERENCES ref_user_privacy(ref_user_privacy_id),
CONSTRAINT fk_user_status FOREIGN KEY (user_status) REFERENCES ref_user_status(ref_user_status_id)
); 


/*by bimbo*/
CREATE TABLE IF NOT EXISTS user_profile
(
user_auth_id INT unsigned NOT NULL,
firstname VARCHAR(25) NOT NULL,
lastname VARCHAR(25) NOT NULL,
alt_email VARCHAR(50) NOT NULL,
gender ENUM ("MALE", "FEMALE") NOT NULL,
signature TEXT NOT NULL,
modified_time DATETIME NOT NULL,
security_question VARCHAR(50) NOT NULL,
security_answer VARCHAR(20) NOT NULL,
CONSTRAINT fk_profile_user_auth FOREIGN KEY (user_auth_id) REFERENCES user_auth(user_auth_id)
);

/*by simi*/
CREATE TABLE IF NOT EXISTS attachment
(
mail_id INT UNSIGNED NOT NULL,
filename VARCHAR(255) NOT NULL,
is_draft BOOLEAN NOT NULL,
create_time DATETIME NOT NULL
);

/*by simi*/
CREATE TABLE IF NOT EXISTS draft_mail
(
draft_mail_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
user_auth_id INT UNSIGNED NOT NULL,
subject TEXT NOT NULL,
`body` TEXT NOT NULL,
has_attachment BOOLEAN NOT NULL DEFAULT 0,
recipient TEXT NOT NULL,
status SMALLINT UNSIGNED NOT NULL DEFAULT 1,
create_time DATETIME NOT NULL,
modified_time DATETIME NOT NULL,
PRIMARY KEY (draft_mail_id),
CONSTRAINT fk_draft_user_auth_id FOREIGN KEY (user_auth_id) REFERENCES user_auth(user_auth_id),
CONSTRAINT fk_draft_status FOREIGN KEY (status) REFERENCES ref_mail_status(ref_mail_status_id)
);


/*by bimbo*/
CREATE TABLE IF NOT EXISTS sent_mail
(
sent_mail_id INT UNSIGNED NOT NULL AUTO_INCREMENT primary key,
user_auth_id INT UNSIGNED NOT NULL,
has_attachment BOOLEAN NOT NULL DEFAULT 0,
`status` SMALLINT UNSIGNED NOT NULL DEFAULT 1,
`body` TEXT NOT NULL,
create_time DATETIME NOT NULL ,
modified_time DATETIME NOT NULL ,
CONSTRAINT fk_rev_user_auth_id FOREIGN KEY (user_auth_id) REFERENCES user_auth(user_auth_id),
CONSTRAINT fk_rev_status FOREIGN KEY (`status`) REFERENCES ref_mail_status(ref_mail_status_id)
);

/*by bimbo*/
CREATE TABLE IF NOT EXISTS conversation
(
conversation_id INT UNSIGNED NOT NULL AUTO_INCREMENT primary key,
subject TEXT NOT NULL,
create_time DATETIME NOT NULL 
);

/*by bimbo*/
CREATE TABLE IF NOT EXISTS rel_user_conversation
(
rel_user_conversation_id INT UNSIGNED NOT NULL AUTO_INCREMENT primary key,
user_auth_id INT UNSIGNED NOT NULL,
conversation_id INT UNSIGNED NOT NULL,
create_time DATETIME NOT NULL ,
modified_time DATETIME NOT NULL ,
CONSTRAINT fk_user_auth_id FOREIGN KEY (user_auth_id) REFERENCES user_auth(user_auth_id),
CONSTRAINT fk_conversion_id FOREIGN KEY (conversation_id) REFERENCES conversation(conversation_id)
);

/*by bimbo*/
CREATE TABLE IF NOT EXISTS rel_user_sentmail
(
rel_user_sentmail_id INT UNSIGNED NOT NULL AUTO_INCREMENT primary key,
user_auth_id INT UNSIGNED NOT NULL,
sent_mail_id INT UNSIGNED NOT NULL,
conversation_id INT UNSIGNED NOT NULL,
is_read BOOLEAN NOT NULL DEFAULT 1,
`status` SMALLINT UNSIGNED NOT NULL DEFAULT 1,
create_time DATETIME NOT NULL ,
modified_time DATETIME NOT NULL,
CONSTRAINT fk_sent_user_auth_id FOREIGN KEY (user_auth_id) REFERENCES user_auth(user_auth_id),
CONSTRAINT fk_sent_conversation_id FOREIGN KEY (conversation_id) REFERENCES conversation(conversation_id),
CONSTRAINT fk_sent_status_id FOREIGN KEY (`status`) REFERENCES ref_mail_status(ref_mail_status_id),
CONSTRAINT fk_sent_sent_mail_id FOREIGN KEY (sent_mail_id) REFERENCES sent_mail(sent_mail_id)
);


CREATE TABLE IF NOT EXISTS mailing_list
(
mailing_list_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
owner INT UNSIGNED NOT NULL,
contact INT UNSIGNED NOT NULL,
CONSTRAINT fk_owner FOREIGN KEY (owner) REFERENCES user_auth(user_auth_id),
CONSTRAINT fk_contact FOREIGN KEY (contact) REFERENCES user_auth(user_auth_id)
);

/*by sushy*/
CREATE TABLE IF NOT EXISTS ref_log_type
(
ref_log_type_id SMALLINT unsigned NOT NULL AUTO_INCREMENT  primary key,
name VARCHAR(15) NOT NULL,
flag BOOLEAN NOT NULL
);

/*by simi*/
CREATE TABLE IF NOT EXISTS `log`
(
log_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
user_auth_id  INT UNSIGNED NOT NULL,
mail_id INT UNSIGNED NOT NULL,
log_type SMALLINT UNSIGNED NOT NULL,
ip_address VARCHAR(150) NOT NULL,
browser_type VARCHAR(75) NOT NULL,
create_time DATETIME NOT NULL,
PRIMARY KEY (log_id),
CONSTRAINT fk_res_user_auth_id FOREIGN KEY (user_auth_id) REFERENCES user_auth(user_auth_id),
CONSTRAINT fk_log_type FOREIGN KEY (log_type) REFERENCES ref_log_type(ref_log_type_id)
);
