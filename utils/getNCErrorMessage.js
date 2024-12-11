import { __ } from '@wordpress/i18n';

const getNCErrorMessage = ( { min, max, value, step } ) => {
	const isNumberBetweenInterval = value && value >= min && value <= max;

	if ( ! max && value < min )
		return __( `Number must be greater than ${ min }`, 'teato' );
	if ( ! min && value > max )
		return __( `Number must be smaller than ${ max }`, 'teato' );
	if ( min && max && ! isNumberBetweenInterval )
		return __( `Number must be between ${ min } and ${ max }`, 'teato' );
	if ( step && value % step !== 0 )
		return __( `Number must be in intervals of ${ step }`, 'teato' );

	return '';
};

export default getNCErrorMessage;
