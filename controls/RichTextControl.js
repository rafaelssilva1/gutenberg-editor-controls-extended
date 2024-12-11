/**
*Text control component that extends functionality from the base Wordpress components

@param {string | null} controlName					optional control name that will be displayed in the editor
@param {string | null} id							optional unique id that is used to manage locking and unlocking the Wordpress editor (only necessary when required prop is set)
@param {string | number | array | object} value		corresponds to the value that the control is currently managing
@param {function} callback							callback that handles the state changes for this particular control
@param {boolean | null} required					prop is to manage required status of the control
@param {function} setError							used to manage the error state in the parent control file
@param {object} errorList							the current errors for this block
@param {regex | null} regex							optional expression that adds an extra layer of validation
@param {string | null} regexMessage					optional message related to the regex expression
@param {string | null} placeholder					placeholder string to be displayed in rich text control
@param {boolean | null} renderNewLinesAsParagraphs	sets if new lines should be rendered as paragraphs (<p></p>) or line breaks (<br />)

* Note: for the text to be rendered as html you must pass the dangerouslySetInnerHTML; example: <div dangerouslySetInnerHTML={{ __html: richText }}></div>
*/

import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import { RichText as WPRichTextControl } from '@wordpress/block-editor';

import Required from './utils/Required';
import ErrorMessage from './utils/ErrorMessage';
import handleError from '../../utils/handleError';

const RichTextControl = ( {
	controlName,
	id,
	value,
	callback,
	required = false,
	setError,
	errorList,
	regex,
	regexMessage,
	placeholder,
	renderNewLinesAsParagraphs,
	...props
} ) => {
	const error = required && ( ! value || ( regex && ! regex.test( value ) ) );
	const regexError = value && regex && ! regex.test( value );

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
			<div className="blocks__richtext">
				<WPRichTextControl
					value={ value }
					onChange={ callback }
					className={ error ? 'mandatory-field-error' : '' }
					placeholder={ placeholder }
					multiline={ renderNewLinesAsParagraphs ? 'p' : '' }
					{ ...props }
				/>
			</div>
			<ErrorMessage
				error={ error }
				regexError={ regexError }
				regexMessage={ regexMessage }
			/>
		</div>
	);
};

export default RichTextControl;
