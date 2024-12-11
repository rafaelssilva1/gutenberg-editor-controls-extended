import { __ } from '@wordpress/i18n';

const ErrorMessage = ( {
	error,
	regexError,
	regexMessage,
	addMargin = true,
} ) => {
	return error ? (
		<p
			className="required"
			style={ { marginBlock: addMargin ? '0.8rem' : '' } }
		>
			{ regexError ? regexMessage : __( 'Campo obrigatório!', 'teato' ) }
		</p>
	) : null;
};

export default ErrorMessage;
