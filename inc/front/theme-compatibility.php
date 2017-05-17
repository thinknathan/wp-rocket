<?php
defined( 'ABSPATH' ) or die( 'Cheatin&#8217; uh?' );

/**
 * Conflict with Avada theme and WP Rocket CDN
 *
 * @since 2.6.1
 *
 * @param array  $vars An array of variables.
 * @param string $handle Name of the avada resource.
 * @return array updated array of variables
 */
function rocket_fix_cdn_for_avada_theme( $vars, $handle ) {
	if ( 'avada-dynamic' === $handle && get_rocket_option( 'cdn' ) ) {
		$src = get_rocket_cdn_url( get_template_directory_uri() . '/assets/less/theme/dynamic.less' );
		$vars['template-directory'] = sprintf( '~"%s"', dirname( dirname( dirname( dirname( $src ) ) ) ) );
		$vars['lessurl'] = sprintf( '~"%s"', dirname( $src ) );
	}
	return $vars;
}
add_filter( 'less_vars', 'rocket_fix_cdn_for_avada_theme', 11, 2 );

/**
 * Replaces URLs in data-bg-image attributes of divs with CDN URL.
 * This basically copies rocket_cdn_images() from WP Rocket.
 *
 * @since 2.10
 *
 * @param  string $html HTML content to parse.
 * @return string modified HTML content
 */
function rocket_avada_parallax_cdn( $html ) {

	// Do not use CDN if the image is in admin, a feed or in a post preview.
	if ( is_admin() || is_feed() || is_preview() || empty( $html ) ) {
		return $html;
	}

	$zone = array( 'all', 'images' );
	if ( $cnames = get_rocket_cdn_cnames( $zone ) ) {

		$cnames = array_flip( $cnames );
		$home_url = home_url( '/' );

		// Retrieve all divs[data-bg-image] from the page buffer.
		preg_match_all( '#<div([^>]+?)data-bg-image=([\'"\\\]*)([^\'"\s\\\>]+)([\'"\\\]*)([^>]*)>#i', $html, $images_match );

		foreach ( $images_match[3] as $k => $image_url ) {

			list( $host, $path, $scheme, $query ) = get_rocket_parse_url( $image_url );
			$path = trim( $path );

			if ( empty( $path ) || '{href}' === $path || '+markerData[i].thumbnail+' === $path ) {
				continue;
			}

			if ( isset( $cnames[ $host ] ) ) {
				continue;
			}

			// Image path is relative, apply the host to it.
			if ( empty( $host ) ) {
				$image_url = $home_url . ltrim( $image_url, '/' );
				$host = parse_url( $image_url, PHP_URL_HOST );
			}

			// Check if the link is not external.
			if ( parse_url( $home_url, PHP_URL_HOST ) !== $host ) {
				continue;
			}

			// Check if the URL is not a DATA-URI.
			if ( false !== strpos( $image_url, 'data:image' ) ) {
				continue;
			}

			$html = str_replace(
				$images_match[0][ $k ],
				sprintf(
					'<div %1$s %2$s %3$s>',
					trim( $images_match[1][ $k ] ),
					'data-bg-image=' . $images_match[2][ $k ] . get_rocket_cdn_url( $image_url, $zone ) . $images_match[4][ $k ],
					trim( $images_match[5][ $k ] )
				),
				$html
			);
		}
	}

	return $html;
}
add_filter( 'rocket_buffer', 'rocket_avada_parallax_cdn', PHP_INT_MAX );
