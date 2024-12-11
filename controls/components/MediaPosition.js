import { __ } from '@wordpress/i18n';
import { ButtonGroup, Button } from '@wordpress/components';

import UnitControl from '../UnitControl';
import ToggleControl from '../ToggleControl';

const MediaPosition = ( { value, callback, ...props } ) => {
	const VERTICAL_ALIGMENT = [ 'Top', 'Center', 'Bottom' ];
	const HORIZONTAL_ALIGMENT = [ 'Left', 'Center', 'Right' ];

	return (
		<div>
			<p className="settings__title">
				{ __( 'Media position settings', 'teato' ) }:
			</p>
			<ToggleControl
				controlName={ 'Custom position' }
				value={ value && value.position && value.position.custom }
				onChange={ ( content ) => {
					const parsedContent = {
						...value,
						position: {
							...value.position,
							custom: content,
						},
					};
					callback( parsedContent );
				} }
				className={ 'spacing-top' }
			/>
			{ value && value.position && value.position.custom ? (
				<div className="settings__wrapper row">
					<UnitControl
						controlName={ 'X axis' }
						value={ value.position?.xAxis }
						onChange={ ( content ) => {
							const parsedContent = {
								...value,
								position: {
									...value.position,
									xAxis: content,
								},
							};
							callback( parsedContent );
						} }
					/>
					<UnitControl
						controlName={ 'Y axis' }
						value={ value.position?.yAxis }
						onChange={ ( content ) => {
							const parsedContent = {
								...value,
								position: {
									...value.position,
									yAxis: content,
								},
							};
							callback( parsedContent );
						} }
						{ ...props }
					/>
				</div>
			) : (
				<>
					<div>
						<h3>{ __( 'X Axis' ) }</h3>
						<ButtonGroup className="button_group">
							{ HORIZONTAL_ALIGMENT.map(
								( aligment, innerIndex ) => {
									const isFirstButton =
										innerIndex === 0 ? 'first_button' : '';
									const isLastButton =
										innerIndex ===
										HORIZONTAL_ALIGMENT.length - 1
											? 'last_button'
											: '';

									return (
										<Button
											variant={
												value &&
												value.position &&
												value.position.xAxis ===
													aligment.toLowerCase()
													? 'primary'
													: 'secondary'
											}
											className={ `${ isFirstButton } ${ isLastButton }` }
											onClick={ ( e ) => {
												const parsedContent = {
													...value,
													position: {
														...value.position,
														xAxis: e.target.textContent.toLowerCase(),
													},
												};
												callback( parsedContent );
											} }
											key={ innerIndex }
										>
											{ aligment }
										</Button>
									);
								}
							) }
						</ButtonGroup>
					</div>
					<div>
						<h3>{ __( 'Y Axis' ) }</h3>
						<ButtonGroup className="button_group">
							{ VERTICAL_ALIGMENT.map(
								( aligment, innerIndex ) => {
									const isFirstButton =
										innerIndex === 0 ? 'first_button' : '';
									const isLastButton =
										innerIndex ===
										VERTICAL_ALIGMENT.length - 1
											? 'last_button'
											: '';

									return (
										<Button
											variant={
												value &&
												value.position &&
												value.position.yAxis ===
													aligment.toLowerCase()
													? 'primary'
													: 'secondary'
											}
											className={ `${ isFirstButton } ${ isLastButton }` }
											onClick={ ( e ) => {
												const parsedContent = {
													...value,
													position: {
														...value.position,
														yAxis: e.target.textContent.toLowerCase(),
													},
												};
												callback( parsedContent );
											} }
											key={ innerIndex }
										>
											{ aligment }
										</Button>
									);
								}
							) }
						</ButtonGroup>
					</div>
				</>
			) }
		</div>
	);
};

export default MediaPosition;
