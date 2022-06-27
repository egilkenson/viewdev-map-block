/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

/**
 * Import our custom components.
 */
import PlacesAutocomplete from './components/PlacesAutocomplete';
import MapDisplay from './components/MapDisplay';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param { Object } props
 *
 * @return {WPElement} Element to render.
 */
const Edit = ({ attributes, setAttributes } ) => {
	const blockProps = useBlockProps({
		className: 'viewdev-map-block',
	})
	const style = {
		height: 350,
		display: 'flex',
		placeItems: 'center',
		padding: 50,
		backgroundColor: '#DDD',
	};

	return (
		<>
			<div {...blockProps}>
				{ attributes.formatted_address === null ? (
					<div style={ style }>
						<PlacesAutocomplete
							className="vwd-map-address-input"
							update={ setAttributes }
							attributes={ attributes }
						/>
					</div>
				) : (
					<MapDisplay
						attributes={ attributes }
						update={ setAttributes }
					/>
				) }
			</div>

			<InspectorControls>
				<PanelBody title="Map Location" initialOpen={ true }>
					<PlacesAutocomplete
						update={ setAttributes }
						attributes={ attributes }
					/>
				</PanelBody>
				<PanelBody title="Map Options" initialOpen={ false }>
					<RangeControl
						label="Height"
						value={ attributes.height }
						onChange={ ( height ) => setAttributes( { height } ) }
						min={ 100 }
						max={ 1000 }
					/>
					<ToggleControl
						label="Zoom Buttons"
						checked={ attributes.zoomControl }
						onChange={ () => {
							setAttributes( {
								zoomControl: ! attributes.zoomControl,
							} );
						} }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default Edit;
