import { __ } from '@wordpress/i18n';
import ToggleControl from '../ToggleControl';

const VideoSettings = ( { value, callback, error, ...props } ) => {
	return value && value.type === 'video' ? (
		<>
			<p className="settings__title spacing-top">
				{ __( 'Video settings', 'teato' ) }:
			</p>
			<ToggleControl
				controlName={ 'Autoplay' }
				value={ value.autoplay }
				onChange={ ( content ) => {
					const parsedContent = {
						...value,
						autoplay: content,
					};
					callback( parsedContent );
				} }
				className={ error ? 'mandatory-field-error' : '' }
				{ ...props }
			/>
			<ToggleControl
				controlName={ 'Muted' }
				value={ value.muted }
				onChange={ ( content ) => {
					const parsedContent = {
						...value,
						muted: content,
					};
					callback( parsedContent );
				} }
				className={ error ? 'mandatory-field-error' : '' }
				{ ...props }
			/>
			<ToggleControl
				controlName={ 'Loop' }
				value={ value.loop }
				onChange={ ( content ) => {
					const parsedContent = {
						...value,
						loop: content,
					};
					callback( parsedContent );
				} }
				className={ error ? 'mandatory-field-error' : '' }
				{ ...props }
			/>
		</>
	) : null;
};

export default VideoSettings;
