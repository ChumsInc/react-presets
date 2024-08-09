<?php
/**
 * @package Chums
 * @subpackage Routings
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2012, steve
 */

use chums\ui\WebUI2;
use chums\user\Groups;

require_once ("autoload.inc.php");

/**
 * @TODO: Assign required roles
 * @TODO: Assign Page Title
 * @TODO: Add description if required
 *
 * Helpful hint for PHPStorm: set PHP Include Path to /includes of project intranet.chums.com
 */
$ui = new WebUI2([
    'requiredRoles' => [],
    'title' => "",
    'description' => ''
]);

$ui->addManifestJSON('public/js/manifest.json')->render();
