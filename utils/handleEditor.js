import { __ } from '@wordpress/i18n';

const handleEditor = ( {
	error,
	lockPostSaving,
	unlockPostSaving,
	createErrorNotice,
	removeNotice,
	notices,
	clientId,
	data,
	blockName,
	additionalText = ''
} ) => {
	const hasError = data && ! data?.length || !! Object.values( error ).find( Boolean );

	if ( hasError ) {
		lockPostSaving();

		createErrorNotice(
			__(
				`O bloco ${ blockName } tem erros. Por favor corriga-os para poder gravar. ${additionalText}`,
				'teato'
			),
			{
				type: 'snackbar',
				explicitDismiss: true,
				id: clientId,
			}
		);
	} else {
		unlockPostSaving();

		const errorIndex = notices.findIndex(
			( notice ) => notice.id === clientId
		);
		removeNotice( notices[ errorIndex ]?.id );
	}
};

export default handleEditor;
