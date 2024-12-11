import { __ } from '@wordpress/i18n';

import ToggleControl from '../ToggleControl';

const OtherSettings = ( { value, callback, error, ...props } ) => {
	return value && value.type === 'image' ? (
		<>
			<p className="settings__title spacing-top">
				{ __( 'Other Settings', 'teato' ) }:
			</p>
			<ToggleControl
				controlName={ 'Lazy loading' }
				value={ value.loading }
				onChange={ ( content ) => {
					const parsedContent = {
						...value,
						loading: content,
					};
					callback( parsedContent );
				} }
				className={ error ? 'mandatory-field-error' : '' }
				{ ...props }
			/>
		</>
	) : null;
};

export default OtherSettings;
