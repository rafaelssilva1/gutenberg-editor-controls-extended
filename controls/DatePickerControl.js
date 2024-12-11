/**
 *Text control component that extends functionality from the base Wordpress components
 
 * @param {string | null} controlName					optional control name that will be displayed in the editor
 * @param {string | null} id							optional unique id that is used to manage locking and unlocking the Wordpress editor (only necessary when required prop is set)
 * @param {string | number | array | object}  value		corresponds to the value that the control is currently managing
 * @param {function} callback							callback that handles the state changes for this particular control
 * @param {function} deleteCallback						callback that handles resets value
 * @param {boolean | null} required						prop is to manage required status of the control
 * @param {function} setError							used to manage the error state in the parent control file
 * @param {object} errorList							the current errors for this block
 * @param {regex | null} regex							optional expression that adds an extra layer of validation
 * @param {string | null} regexMessage					optional message related to the regex expression
 * @param {boolean  null} is12Hour						date time picker
 * @param {number | null} startOfWeek					the day that the week should start on. 0 for Sunday, 1 for Monday, etc.
 * @param {string | null} defaultText					string value to be displayed as placeholder in button component
 * 
 * Note: to format date import date from @wordpress/date and pass the desired format value
 */

import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import {
	DateTimePicker as WPDatePickerControl,
	Button,
} from '@wordpress/components';

import DropdownControl from './DropdownControl';

import Required from './utils/Required';
import ErrorMessage from './utils/ErrorMessage';
import handleError from '../../utils/handleError';

const DatePickerControl = ( {
	controlName,
	id,
	value,
	callback,
	deleteCallback,
	required = false,
	setError,
	errorList,
	regex,
	regexMessage,
	is12Hour = false,
	startOfWeek,
	defaultText = 'Pick a date',
	dateFormat,
	...props
} ) => {
	const error = required && ( ! value || ( regex && ! regex.test( value ) ) );
	const regexError = value && regex && ! regex.test( value );

	useEffect( () => {
		handleError( { errorList, setError, id, error } );
	}, [ value ] );

	return (
		<div className="settings__wrapper ">
			{ controlName ? (
				<p className="settings__title">
					{ __( `${ controlName }`, 'teato' ) }
					<Required required={ required } />:
				</p>
			) : null }
			<div>
				<div className="settings__wrapper row">
					<DropdownControl
						defaultText={ `${ __( `${ defaultText }`, 'teato' ) }` }
						renderContent={ () => (
							<WPDatePickerControl
								currentDate={ value }
								onChange={ callback }
								is12Hour={ is12Hour }
								startOfWeek={ startOfWeek }
								className={
									error ? 'mandatory-field-error' : ''
								}
								{ ...props }
							/>
						) }
					/>
					{ ! required && deleteCallback ? (
						<Button
							isDestructive
							icon={ 'trash' }
							onClick={ deleteCallback }
						/>
					) : null }
				</div>
			</div>
			<ErrorMessage
				error={ error }
				regexError={ regexError }
				regexMessage={ regexMessage }
			/>
		</div>
	);
};

export default DatePickerControl;
