<?php
/**
 * Plugin Name:       ViewDev Map Block
 * Description:       Example static block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            Eben Gilkenson
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       viewdev-map-block
 *
 * @package           viewdev-map-block
 */

const VIEWDEV_MAP_VERSION = '0.1.0';

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function viewdev_map_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'viewdev_map_block_init' );

/**
 * Enqueue block assets for use within Gutenberg.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/
 */
function viewdev_map_block_scripts() {
	$google_api = get_option('viewdev_map_block_plugin_google_maps_api');
	wp_enqueue_script( 'google-maps', "https://maps.googleapis.com/maps/api/js?key=" . $google_api . "&libraries=places");
	wp_enqueue_script( 'vwd-basic-google-map', plugin_dir_url( __FILE__) . 'viewdev-map-block-frontend.js', ['google-maps'], VIEWDEV_MAP_VERSION, true);
}
add_action( 'enqueue_block_assets', 'viewdev_map_block_scripts');


/**
 * Load the settings page.
 */
require_once 'viewdev-map-block-settings-page.php';

