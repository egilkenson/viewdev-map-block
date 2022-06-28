( function () {
	const mapDivs = document.querySelectorAll( '[data-target=vwd-map-div]' );
	const mapOptions = {
		zoom: 10,
		disableDefaultUI: true,
		fullscreenControl: false,
		mapTypeControl: false,
		streetViewControl: false,
	};

	mapDivs.forEach( ( mapDiv ) => {
		const position = {
			lat: parseFloat( mapDiv.dataset.lat ),
			lng: parseFloat( mapDiv.dataset.lng ),
		};
		mapOptions.center = position;
		mapOptions.zoom = parseInt( mapDiv.dataset.zoom );
		mapOptions.zoomControl = mapDiv.dataset.zoomcontrol === 'true';
		// eslint-disable-next-line no-undef
		const map = new google.maps.Map( mapDiv, mapOptions );
		// eslint-disable-next-line no-undef,no-unused-vars
		const marker = new google.maps.Marker( {
			map,
			position,
			draggable: false,
		} );
	} );
} )();
