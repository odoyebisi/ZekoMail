<?php

function cleanString($string)
{
    $clean1 = stripslashes($string);
    //$cleaned= ($clean1);

    return cleanxss($clean1);
}

function cleanxss($input)
{
/// Prevents XXS Attacks www.itshacked.com
    $search = array(
        '@&amp;lt;script[^&amp;gt;]*?&amp;gt;.*?&amp;lt;/script&amp;gt;@si', // Strip out javascript
        '@&amp;lt;[\/\!]*?[^&amp;lt;&amp;gt;]*?&amp;gt;@si', // Strip out HTML tags
        '@&amp;lt;style[^&amp;gt;]*?&amp;gt;.*?&amp;lt;/style&amp;gt;@siU', // Strip style tags properly
        '@&amp;lt;![\s\S]*?--[ \t\n\r]*&amp;gt;@' // Strip multi-line comments
    );

    $inputx = preg_replace($search, '', $input);
    $inputx = trim($inputx);
    if (get_magic_quotes_gpc()) {
        $inputx = stripslashes($inputx);
    }
//$inputx = mysql_real_escape_string($inputx);
    return stripHtmlXters($inputx);

}

function stripHtmlXters($input)
{
    $final = htmlspecialchars($input, ENT_QUOTES);
    return $final;
}

?>