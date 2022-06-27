import React, { useEffect, useRef } from 'react';

const MapDisplay = ( props ) => {
	const mapDiv = useRef( null );
	const { zoom, height } = props.attributes;
	const style = { height };

	const position = { lat: props.attributes.lat, lng: props.attributes.lng };
	const mapOptions = {
		center: position,
		zoom,
		fullscreenControl: false,
		mapTypeControl: false,
		streetViewControl: false,
		gestureHandling: 'cooperative',
	};

	useEffect( () => {
		const map = new google.maps.Map( mapDiv.current, mapOptions );
		map.addListener( 'zoom_changed', () => {
			props.update( {
				zoom: map.getZoom(),
			} );
		} );
		const marker = new google.maps.Marker( {
			map,
			position,
			draggable: true,
		} );
		marker.addListener( 'mouseup', () =>
			props.update( {
				lat: marker.position.lat(),
				lng: marker.position.lng(),
			} )
		);
	}, [ props.attributes.formatted_address ] );

	return <div ref={ mapDiv } className="map-display" style={ style } />;
};

export default MapDisplay;
