/**
* Text control component that extends functionality from the base Wordpress components

* @param {string | null} controlName				optional control name that will be displayed in the editor
* @param {string | null} id							optional unique id that is used to manage locking and unlocking the Wordpress editor (only necessary when required prop is set)
* @param {string | number | array | object} value	corresponds to the value that the control is currently managing
* @param {function} callback						callback that handles the state changes for this particular control
* @param {boolean | null} required					prop is to manage required status of the control
* @param {function} setError						used to manage the error state in the parent control file
* @param {object} errorList							the current errors for this block
*/

import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import { __experimentalUnitControl as WPUnitControl } from '@wordpress/components';

import Required from './utils/Required';
import ErrorMessage from './utils/ErrorMessage';
import handleError from '../../utils/handleError';

const Unitcontrol = ( {
	controlName,
	id,
	value,
	callback,
	required = false,
	setError,
	errorList,
	regex,
	regexMessage,
	...props
} ) => {
	const numberRegex = /\d/;
	const error = required && ! numberRegex.test( value );
	const regexError = value && regex && ! regex.test( value );

	useEffect( () => {
		handleError( { errorList, setError, id, error } );
	}, [ value ] );

	return (
		<div>
			{ controlName ? (
				<p className="settings__title">
					{ __( `${ controlName }`, 'teato' ) }
					<Required required={ required } />:
				</p>
			) : null }
			<WPUnitControl value={ value } onChange={ callback } { ...props } />
			<ErrorMessage
				error={ error }
				regexError={ regexError }
				regexMessage={ regexMessage }
			/>
		</div>
	);
};
export default Unitcontrol;
