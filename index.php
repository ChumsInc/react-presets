<?php
/**
 * @package Chums Inc
 * @subpackage Imprint Status
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2011, steve
 */

use chums\ui\WebUI2;
use chums\ui\JSOptions;
use chums\user\Groups;

require_once "autoload.inc.php";
$ui = new WebUI2([
    "contentFile" => "body.inc.php",
    "requiredRoles" => [Groups::SALES],
    "title" => "App Name"
]);

$ui->addViteManifest()
    ->render();
