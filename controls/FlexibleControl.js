/**
* Text control component that extends functionality from the base Wordpress components

* @param {array | null} data				data array that contains the block content
* @param {array | null} flexible			array that contains the flexible content
* @param {string} attr						string that corresponds to the attributte that will be used in the helpers
* @param {array} allowedFlexibleContent		array that contains the allowed flexible content control (@argument ALLOWED_BLOCKS is used to limit that allowed controls)
* @param {function} setAttributes			function that sets the content state for the block
* @param {number} index						number value used in the helpers
* @param {string | null} defaultText		default string for the add flexible content button 
* @param {boolean | null} isRepeater		boolean used in the helpers to determine whether or not the block is being used inside a repeater or not
*/

import { __ } from '@wordpress/i18n';

import DropdownControl from './DropdownControl';

import {
	handleAddInnerFlexibleItem,
	handleEditInnerFlexibleItem,
	handleDeleteInnerFlexibleItem,
	handleReorderInnerFlexibleItem,
	handleAddFlexibleItem,
	handleEditFlexibleItem,
	handleDeleteFlexibleItem,
} from '../../utils/flexible-content';
import handleRemoveItemFromErrorList from '../../utils/handleRemoveItemFromErrorList';

import * as controls from '../controls';
import { PanelBody, Button } from '@wordpress/components';
import { Icon, arrowUp, arrowDown } from '@wordpress/icons';

export const ALLOWED_BLOCKS = {
	MediaControl: {
		control: 'Media',
		name: 'Media',
	},
	NumberControl: {
		control: 'Number',
		name: 'Number',
	},
	RichTextControl: {
		control: 'RichText',
		name: 'Rich Text Editor',
	},
	TextareaControl: {
		control: 'Textarea',
		name: 'Text area',
	},
	TextControl: {
		control: 'Text',
		name: 'Text',
	},
};

const FlexibleControl = ( {
	data,
	flexible,
	attr,
	allowedFlexibleContent,
	setAttributes,
	index,
	clientId,
	defaultText = 'Add field',
	isRepeater,
	...props
} ) => {
	const { errorList, setError } = props;

	return (
		<PanelBody
			title={ __( 'Flexible content' ) }
			initialOpen={ false }
			className="gap"
		>
			<div className="settings__wrapper">
				{ flexible &&
					flexible.map( ( el, innerIndex ) => {
						const ControlComponent =
							controls[ `${ el.type }Control` ];

						return (
							<div
								className="blocks__flexible"
								key={ innerIndex }
							>
								<div className="blocks__flexible--arrows">
									<Button
										isDestructive
										icon={ 'trash' }
										onClick={ () => {
											isRepeater
												? handleDeleteInnerFlexibleItem(
														{
															data,
															index,
															innerIndex,
															setAttributes,
														}
												  )
												: handleDeleteFlexibleItem( {
														data,
														innerIndex,
														setAttributes,
												  } );
											handleRemoveItemFromErrorList( {
												error: errorList,
												setError,
												attrs: [ el.id ],
											} );
										} }
									/>
									<div className="settings__slider--arrows">
										{ innerIndex > 0 ? (
											<Icon
												size={ 20 }
												icon={ arrowUp }
												onClick={ () =>
													isRepeater
														? handleReorderInnerFlexibleItem(
																{
																	data,
																	index,
																	innerIndex,
																	action:
																		'up',
																	setAttributes,
																}
														  )
														: handleReorderlexibleItem(
																{
																	data,
																	innerIndex,
																	action:
																		'up',
																	setAttributes,
																}
														  )
												}
											/>
										) : null }
										{ flexible.length - 1 !== innerIndex ? (
											<Icon
												size={ 20 }
												icon={ arrowDown }
												onClick={ () =>
													isRepeater
														? handleReorderInnerFlexibleItem(
																{
																	data,
																	index,
																	innerIndex,
																	action:
																		'down',
																	setAttributes,
																}
														  )
														: handleReorderlexibleItem(
																{
																	data,
																	innerIndex,
																	action:
																		'down',
																	setAttributes,
																}
														  )
												}
											/>
										) : null }
									</div>
								</div>

								<ControlComponent
									controlName={ el.controlName }
									value={ el.content }
									id={ el.id }
									key={ innerIndex }
									callback={ ( content ) =>
										isRepeater
											? handleEditInnerFlexibleItem( {
													data,
													content: content,
													index,
													innerIndex,
													setAttributes,
											  } )
											: handleEditFlexibleItem( {
													data,
													content: content,
													innerIndex,
													setAttributes,
											  } )
									}
									required
									{ ...props }
								/>
							</div>
						);
					} ) }
				<DropdownControl
					defaultText={ __( defaultText ) }
					renderContent={ ( { onClose } ) => {
						const options = allowedFlexibleContent.map(
							( el, j ) => (
								<span
									key={ j }
									onClick={ () => {
										isRepeater
											? handleAddInnerFlexibleItem( {
													index,
													attr,
													data,
													content: {
														type: el.type,
														controlName: el.name,
														content: undefined,
														id: el.id,
													},
													setAttributes,
											  } )
											: handleAddFlexibleItem( {
													data,
													content: {
														type: el.type,
														controlName: el.name,
														content: undefined,
														id: el.id,
													},
													setAttributes,
											  } );
										onClose();
									} }
								>
									{ el.name }
								</span>
							)
						);

						return options;
					} }
					{ ...props }
				/>
			</div>
		</PanelBody>
	);
};

export default FlexibleControl;
