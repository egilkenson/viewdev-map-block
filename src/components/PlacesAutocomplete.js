import React from 'react';

class PlacesAutocomplete extends React.Component {
	constructor( props ) {
		super( props );
		this.mapInput = React.createRef();
	}

	componentDidMount() {
		const input = this.mapInput.current;
		const dropdown = new google.maps.places.Autocomplete( input );
		dropdown.addListener( 'place_changed', () => {
			const place = dropdown.getPlace();
			if ( ! place.geometry ) return;
			this.props.update( {
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng(),
				formatted_address: place.formatted_address,
			} );
		} );
	}

	render() {
		return (
			<>
				<input
					className="components-text-control__input"
					ref={ this.mapInput }
					placeholder={ this.props.attributes.formatted_address }
				/>
			</>
		);
	}
}

export default PlacesAutocomplete;
