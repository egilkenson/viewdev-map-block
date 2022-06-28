import { useBlockProps } from '@wordpress/block-editor';

const Save = ( props ) => {
	const { className, attributes } = props;

	if ( attributes.formatted_address === null ) {
		return null;
	}

	const style = { height: `${ attributes.height }px` };
	const blockProps = useBlockProps.save( {
		className,
		style,
	} );

	return (
		<div
			{ ...blockProps }
			data-lng={ attributes.lng }
			data-lat={ attributes.lat }
			data-zoom={ attributes.zoom }
			data-zoomcontrol={ attributes.zoomControl }
			data-target="vwd-map-div"
		/>
	);
};

export default Save;
