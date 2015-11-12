<?php
require_once('filter_class.php');
$arr = array_keys($_REQUEST);

for ($i = 0; $i < count($arr); ++$i) {
    $_REQUEST[$arr[$i]] = cleanString($_REQUEST[$arr[$i]]);
}
?>