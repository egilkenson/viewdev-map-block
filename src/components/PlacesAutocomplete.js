import React, { useEffect, useRef } from 'react';

const PlacesAutocomplete = ( props ) => {
	const mapInput = useRef( null );

	useEffect( () => {
		const input = mapInput.current;
		// eslint-disable-next-line no-undef
		const dropdown = new google.maps.places.Autocomplete( input );
		dropdown.addListener( 'place_changed', () => {
			const place = dropdown.getPlace();
			if ( ! place.geometry ) return;
			props.update( {
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng(),
				formatted_address: place.formatted_address,
			} );
		} );
	}, [ mapInput ] );

	return (
		<>
			<input
				className="components-text-control__input"
				ref={ mapInput }
				placeholder={ props.attributes.formatted_address }
			/>
		</>
	);
};

export default PlacesAutocomplete;
