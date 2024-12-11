/**
*Toggle control component that extends functionality from the base Wordpress components

@param {string | null} controlName					optional control name that will be displayed in the editor
@param {string | null} id							optional unique id that is used to manage locking and unlocking the Wordpress editor (only necessary when required prop is set)
@param {string | number | array | object} value		corresponds to the value that the control is currently managing
@param {function} callback							callback that handles the state changes for this particular control
@param {string | null} helpText						help text; cna use in conjunction with the checked value to change help text value
*/

import { __ } from '@wordpress/i18n';

import { ToggleControl as WPToggleControl } from '@wordpress/components';

const ToggleControl = ( {
	controlName,
	id,
	value,
	callback,
	helpText,
	...props
} ) => {
	return (
		<div>
			<WPToggleControl
				checked={ value }
				onChange={ callback }
				label={ controlName && __( `${ controlName }`, 'teato' ) }
				help={ helpText }
				{ ...props }
			/>
		</div>
	);
};

export default ToggleControl;
