const handleRemoveItemFromErrorList = ( { error, setError, attrs } ) => {
	const errorList = { ...error };

	attrs.forEach( ( el ) => delete errorList[ el ] );

	setError( errorList );
};

export default handleRemoveItemFromErrorList;
