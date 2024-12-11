/**
* Number control component that extends functionality from the base Wordpress components
	
* @param {string | null} controlName				optional control name that will be displayed in the editor
* @param {string | null} id							optional unique id that is used to manage locking and unlocking the Wordpress editor (only necessary when required prop is set)
* @param {string | number | array | object} value	corresponds to the value that the control is currently managing
* @param {function} callback						callback that handles the state changes for this particular control
* @param {boolean | null} required					prop is to manage required status of the control
* @param {function} setError						used to manage the error state in the parent control file
* @param {object} errorList							object // the current errors for this block
* @param {number} min								optional minimum value for the control
* @param {number} max								optional maximum value for the control
*/

import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import { __experimentalNumberControl as WPNumberControl } from '@wordpress/components';

import Required from './utils/Required';
import ErrorMessage from './utils/ErrorMessage';
import handleError from '../../utils/handleError';
import getNCErrorMessage from '../../utils/getNCErrorMessage';

const NumberControl = ( {
	controlName,
	id,
	value,
	callback,
	required = false,
	setError,
	errorList,
	min,
	max,
	step,
	isDragEnabled = false,
	...props
} ) => {
	const errorMessage = getNCErrorMessage( { min, max, value, step } );
	const error = ( required && ! value ) || errorMessage;

	useEffect( () => {
		handleError( { errorList, setError, id, error } );
	}, [ value ] );

	return (
		<div className="settings__wrapper">
			{ controlName ? (
				<p className="settings__title">
					{ __( `${ controlName }`, 'teato' ) }
					<Required required={ required } />:
				</p>
			) : null }
			<WPNumberControl
				value={ value }
				onChange={ callback }
				className={ error ? 'mandatory-field-error' : '' }
				min={ min }
				max={ max }
				isDragEnabled={ isDragEnabled }
				{ ...props }
			/>
			<ErrorMessage
				error={ error }
				regexError={ !! errorMessage }
				regexMessage={ errorMessage }
			/>
		</div>
	);
};

export default NumberControl;
