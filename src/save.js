const Save = ( props ) => {
	const { className, attributes } = props;
	const style = { height: `${ attributes.height }px` };

	if ( attributes.formatted_address === null ) {
		return null;
	}
	return (
		<div
			className={ className }
			data-lng={ attributes.lng }
			data-lat={ attributes.lat }
			data-zoom={ attributes.zoom }
			data-zoomcontrol={ attributes.zoomControl }
			data-target="vwd-map-div"
			style={ style }
		/>
	);
};

export default Save;
