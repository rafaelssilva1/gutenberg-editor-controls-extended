import { __ } from '@wordpress/i18n';
import ToggleControl from '../ToggleControl';
import Unitcontrol from '../UnitControl';
import NumberControl from '../NumberControl';

import {
	MIN_COLUMNS,
	MAX_COLUMNS,
} from '../../../block-editor/blocks/cards/controls';

const GridSettings = ( { attributes, setAttributes, clientId, ...props } ) => {
	const { customGridColumns, minWidth, customGridSettings } = attributes;

	return (
		<>
			<p className="settings__title spacing-bottom">
				{ __( 'Grid settings', 'teato' ) }
			</p>
			<ToggleControl
				controlName={ 'Custom grid columns' }
				value={ customGridColumns }
				onChange={ ( content ) =>
					setAttributes( { customGridColumns: content } )
				}
			/>
			{ customGridColumns ? (
				<div>
					<NumberControl
						controlName={ 'No. Columns Desktop' }
						value={ customGridSettings.desktop }
						onChange={ ( content ) => {
							setAttributes( {
								customGridSettings: {
									...customGridSettings,
									desktop: +content,
								},
							} );
						} }
						min={ MIN_COLUMNS }
						max={ MAX_COLUMNS }
						help={ __( 'Bigger than 1440px' ) }
						{ ...props }
					/>
					<NumberControl
						controlName={ 'No. Columns Small Desktop' }
						value={ customGridSettings.smallDesktop }
						onChange={ ( content ) => {
							setAttributes( {
								customGridSettings: {
									...customGridSettings,
									smallDesktop: +content,
								},
							} );
						} }
						min={ MIN_COLUMNS }
						max={ MAX_COLUMNS }
						help={ __( 'Up to 1439px' ) }
						{ ...props }
					/>
					<NumberControl
						controlName={ 'No. Columns Tablet' }
						value={ customGridSettings.tablet }
						onChange={ ( content ) => {
							setAttributes( {
								customGridSettings: {
									...customGridSettings,
									tablet: +content,
								},
							} );
						} }
						min={ MIN_COLUMNS }
						max={ MAX_COLUMNS }
						help={ __( 'Up to 1023px' ) }
						{ ...props }
					/>
					<NumberControl
						controlName={ 'No. Columns Mobile' }
						value={ customGridSettings.mobile }
						onChange={ ( content ) => {
							setAttributes( {
								customGridSettings: {
									...customGridSettings,
									mobile: +content,
								},
							} );
						} }
						min={ MIN_COLUMNS }
						max={ MAX_COLUMNS }
						help={ __( 'Up to 767px' ) }
						{ ...props }
					/>
				</div>
			) : (
				<Unitcontrol
					controlName={ 'Card minimum width' }
					id={ `cards-minwidth-${ clientId }` }
					value={ minWidth }
					onChange={ ( content ) => {
						setAttributes( { minWidth: content } );
					} }
				/>
			) }
		</>
	);
};

export default GridSettings;
