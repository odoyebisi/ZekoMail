<?php
/**
 * Created by JetBrains PhpStorm.
 * User: user
 * Date: 7/29/13
 * Time: 11:47 AM
 * To change this template use File | Settings | File Templates.
 */
require '../data/DataTable.php';
require '../utility/DatabaseHandler.php';
require '../utility/SqlStatement.php';

class BaseModel
{

    public function execute($query, $params)
    {
        $db_handler = new DatabaseHandler();
        return $db_handler->executeQuery($query, $params);
    }

    public function add($query, $params)
    {
        $db_handler = new DatabaseHandler();
        return $db_handler->add($query, $params);
    }

    public function getByParam($query, $param)
    {
        $db_handler = new DatabaseHandler();
        $stmt = $db_handler->executeNonQuery($query, $param);
        return $db_handler->fetch($stmt, true);
    }

    public function getAllByParam($query, $param)
    {
        $db_handler = new DatabaseHandler();
        $stmt = $db_handler->executeNonQuery($query, $param);
        $result = $db_handler->fetchAll($stmt, true);
        return ($result != false) ? $result : array();
    }


}