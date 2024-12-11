/*
	Function that manages the error state object
*/

const handleError = ( { errorList, setError, id, error } ) => {
	if ( errorList && setError ) {
		const errorExistsInList = errorList
			? errorList.hasOwnProperty( id )
			: false;
		const filteredErrorList = errorList
			? Object.keys( errorList )
					.filter( ( key ) => key != id )
					.reduce( ( acc, key ) => {
						acc[ key ] = errorList[ key ];
						return acc;
					}, {} )
			: {};

		if ( error ) {
			errorExistsInList
				? setError( () => ( {
						...filteredErrorList,
						[ id ]: true,
				  } ) )
				: setError( ( prev ) => ( { ...prev, [ id ]: true } ) );
		} else {
			errorExistsInList
				? setError( () => ( {
						...filteredErrorList,
						[ id ]: false,
				  } ) )
				: setError( ( prev ) => ( { ...prev, [ id ]: false } ) );
		}
	}
};

export default handleError;
