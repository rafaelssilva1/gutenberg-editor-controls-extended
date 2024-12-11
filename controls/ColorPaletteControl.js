/**
* Color Palette control component that extends functionality from the base Wordpress components
	
* @param {string | null} controlName 					control name that will be displayed in the editor
* @param {string | null} id 							unique id that is used to manage locking and unlocking the Wordpress editor (only necessary when required prop is set)
* @param {string || number || array || object} value 	corresponds to the value that the control is currently managing
* @param {function} callback 							callback that handles the state changes for this particular control
* @param {boolean | null} required 						prop is to manage required status of the control
* @param {function} setError 							used to manage the error state in the parent control file
* @param {object} errorList 							the current errors for this block
* @param {regex | null} regex 							expression that adds an extra layer of validation
* @param {string | null} regexMessage 					message related to the regex expression
* @param {boolean | null} disableCustomColors 			prop that allows the user to select a custom color using a color picker
*/
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

import { ColorPalette as WPColorPalette } from '@wordpress/components';

import Required from './utils/Required';
import ErrorMessage from './utils/ErrorMessage';
import handleError from '../../utils/handleError';

const ColorPaletteControl = ( {
	controlName,
	id,
	value,
	callback,
	required = false,
	setError,
	errorList,
	disableCustomColors = true,
	...props
} ) => {
	const error = required && ! value;

	useEffect( () => {
		handleError( { errorList, setError, id, error } );
	}, [ value ] );

	const colors = useSelect( 'core/block-editor' ).getSettings().colors;

	return (
		<div className="settings__wrapper">
			{ controlName ? (
				<p className="settings__title">
					{ __( `${ controlName }`, 'teato' ) }
					<Required required={ required } />:
				</p>
			) : null }
			<WPColorPalette
				value={ value }
				colors={ colors }
				onChange={ callback }
				className={ error ? 'mandatory-field-error' : '' }
				disableCustomColors={ disableCustomColors }
				{ ...props }
			/>
			<ErrorMessage error={ error } />
		</div>
	);
};

export default ColorPaletteControl;
