<?php

/**
 * Register a setting to hold the Google Maps API key.
 */
function viewdev_map_block_register_settings() {
	register_setting(
		'viewdev_map_block_plugin_settings',
		'viewdev_map_block_plugin_google_maps_api',
		[
			'default'       => '',
			'show_in_rest'  => true,
			'type'          => 'string',
		]
	);

	add_settings_section(
		'viewdev_map_block_apis',
		__( 'API Keys', 'viewdev_map_block' ),
		'viewdev_map_block_api_fields',
		'viewdev_map_block_settings'
	);

	add_settings_field(
		'viewdev_map_block_google_maps_api',
		__( 'Google Maps API Key', 'viewdev_map_block' ),
		'viewdev_map_block_google_maps_api_field',
		'viewdev_map_block_settings',
		'viewdev_map_block_apis'
	);
}
add_action( 'admin_init', 'viewdev_map_block_register_settings' );

function viewdev_map_block_api_fields() {
	echo '<p>' . __( 'Enter your Google Maps API key here. This is required for the Google Maps API to work.', 'viewdev_map_block' ) . '</p>';
}

function viewdev_map_block_google_maps_api_field() {
	echo '<input style="width: 40ch;" type="text" name="viewdev_map_block_plugin_google_maps_api" value="' . esc_attr( get_option( 'viewdev_map_block_plugin_google_maps_api' ) ) . '" />';
}

function viewdev_map_block_settings_page() {
	add_options_page(
		__( 'ViewDev Map Block Settings', 'viewdev_map_block' ),
		__( 'ViewDev Map Block', 'viewdev_map_block' ),
		'manage_options',
		'viewdev_map_block_settings',
		function() {
			?>
			<div id="viewdev-map-block-settings" class="wrap">
				<h1><?php esc_html_e( get_admin_page_title() ); ?></h1>

				<form method="post" action="options.php">
					<?php settings_fields('viewdev_map_block_plugin_settings'); ?>
					<?php do_settings_sections('viewdev_map_block_settings') ?>
					<?php submit_button(); ?>
				</form>
			</div>
			<?php
		},
	);
}
add_action( 'admin_menu', 'viewdev_map_block_settings_page', 10 );

function viewdev_map_block_settings_link( $links ) : array {
	$label = esc_html__( 'Settings', 'viewdev_map_block' );
	$slug  = 'viewdev_map_block_settings';

	array_unshift( $links, "<a href='options-general.php?page=$slug'>$label</a>" );

	return $links;
}
add_action( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'viewdev_map_block_settings_link', 10 );
