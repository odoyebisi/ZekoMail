<?php
/**
 * Created by JetBrains PhpStorm.
 * User: yemex4God
 * Date: 7/21/13
 * Time: 7:33 PM
 * To change this template use File | Settings | File Templates.
 */

require '../config/config.php';

class DatabaseHandler
{

    const STATUS_OK = 1;
    const STATUS_FAIL = -1;
    public static $error_message;
    private $pdo;
    private $dsn = "";
    private $stmt = "";

    /**
     * @throws PDOException
     */
    function __construct()
    {
        try {
            $this->dsn = "mysql:dbname=" . DBNAME . ";host=" . HOST;
            $this->pdo = new PDO($this->dsn, USERNAME, PASSWORD);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        } catch (PDOException $ex) {
            Util::returnResponse(ERROR_OCCURRED, false);
            Util::logError($ex->getMessage());
        }
    }

    public function add($query, $params)
    {
        $this->executeQuery($query, $params);
        return $this->getLastInsertId();
    }

    /**
     * @throws PDOException
     */
    public function executeQuery($query, $params = array())
    {
        try {
            $this->stmt = $this->pdo->prepare($query);
            $placeholders = $this->stripParams($query);
            return $this->stmt->execute($this->makeParamsArray($placeholders, $params));

        } catch (PDOException $ex) {
            Util::returnResponse(ERROR_OCCURRED, false);
            Util::logError($ex->getMessage());
        }
        return false;
    }

    /** get the parameters from the query by searching for words that follow a colon */
    private function stripParams($query)
    {
        preg_match_all("/[:][a-z|A-Z|_]*/", $query, $placeholders);

        return $placeholders[0];
    }

    /** Build an associative array of parameters and their values */
    public function makeParamsArray($placeholders, $params)
    {

        $arr = array();
        // check if $params is an array of parameters
        if (is_array($params)) {
            for ($i = 0; $i < count($params); $i++) {
                $arr[$placeholders[$i]] = $params[$i];
            }
        } else {
            $arr[$placeholders[0]] = $params;
        }
        return $arr;
    }

    public function getLastInsertId()
    {
        return $this->pdo->lastInsertId();
    }

    public function executeNonQuery($query, $params = array())
    {
        try {
            $this->stmt = $this->pdo->prepare($query);
            $placeholders = $this->stripParams($query);
            $this->stmt->execute($this->makeParamsArray($placeholders, $params));
            return $this->stmt;
        } catch (PDOException $ex) {
            Util::returnResponse(ERROR_OCCURRED, false);
            Util::logError($ex->getMessage());
        }
        return false;
    }

    public function fetch($stmt, $is_assoc = true)
    {
        return $stmt->fetch($is_assoc ? PDO::FETCH_ASSOC : PDO::FETCH_NUM);
    }

    public function fetchAll($stmt, $is_assoc = true)
    {
        return $stmt->fetchAll($is_assoc ? PDO::FETCH_ASSOC : PDO::FETCH_NUM);
    }

    public function fetchObj($stmt, $is_assoc = true)
    {
        return $stmt->fetchObject($is_assoc ? PDO::FETCH_ASSOC : PDO::FETCH_NUM);
    }


}

