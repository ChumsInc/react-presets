<?php
/**
 * @package Chums
 * @subpackage Routings
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2012, steve
 */

require_once "autoload.inc.php";
include_once "access.inc.php";

$bodyPath = "/apps/app-name";
$title = "App Title";
$ui = new WebUI($bodyPath, $title, '', true, 5);
//$ui->bodyClassName = 'container-fluid';
$ui->addManifest("./public/js/manifest.json");
$ui->Send();
