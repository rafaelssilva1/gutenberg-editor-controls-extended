# Gutenberg Editor Controls Extended

## What's the purpose of this repo?
To give already prepared controls that build upon the Wordpress Gutenberg control base.
For example a simple, a simple text control now will have field validation (min or max characters, required, or even a custom regex); a repeater or flexible fields (very common when using ACF) are now also attainable using these controls.
This project is the result of countless hours and aims to help anyone that is facing the same issues.

## How to use
Clone repository inside your custom plugin folder.
Follow Wordpress documentation for creating your custom Gutenberg block and import controls as needed.

## Examples
### Simple control with validation
Inside you edit.js import the following component:
```
import { __ } from '@wordpress/i18n';

import { useDispatch, useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { store as noticesStore } from '@wordpress/notices';

import { useState, useEffect } from '@wordpress/element';

import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

import TextControl from './components/controls/TextControl';
import ColorPaletteControl from './components/controls/ColorPaletteControl';
import DropdownControl from './components/controls/DropdownControl';

import handleEditor from './utils/handleEditor';

const Controls = ({attributes, setAttributes, clientId, ...props}) => {
    const {title, backgroundColor, form} = attributes;

	const [ error, setError ] = useState( {} );

	const { lockPostSaving, unlockPostSaving } = useDispatch( editorStore );
	const { createErrorNotice, removeNotice } = useDispatch( noticesStore );

	const notices = useSelect( ( select ) =>
		select( noticesStore ).getNotices()
	);

	useEffect( () => {
		handleEditor( {
			error,
			lockPostSaving,
			unlockPostSaving,
			createErrorNotice,
			removeNotice,
			notices,
			clientId,
			blockName: 'Contactos',
		} );
	}, [ error ] );

	const additionalProps = {
		errorList: error,
		setError,
	};

    return (
        <InspectorControls { ...props }>
			<PanelBody title={ __( 'Panel Title', 'gbec' ) }>
                <TextControl
					controlName="Title"
					id={`title-${clientId}`}
					callback={ ( content ) =>
						setAttributes( { title: content } )
					}
					value={ title }
					required
					{ ...additionalProps }
				/>
				<ColorPaletteControl
					controlName={ 'Background Color' }
					value={ backgroundColor }
					onChange={ ( content ) =>
						setAttributes({backgroundColor: content})
					}
					required
					{ ...additionalProps }
				/>
			</PanelBody>
		</InspectorControls>
    )
};

export default Controls;
```

In this example you have created a Text and Color Palette controls that are required.

### Repeater control
In this example you have a simple repeater of N fields:
```
import { __ } from '@wordpress/i18n';

import { useDispatch, useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { store as noticesStore } from '@wordpress/notices';

import { useState, useEffect, useMemo } from '@wordpress/element';

import { InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';

import TextControl from '../../../components/controls/TextControl';
import RichTextControl from '../../../components/controls/RichTextControl';
import MediaControl from '../../../components/controls/MediaControl';
import DropdownControl from '../../../components/controls/DropdownControl';

import handleEditor from '../../../utils/handleEditor';

import {
	handleAddItem,
	handleDeleteItem,
	handleEditInnerItem,
	handleReorder,
	handleResetInnerItem,
} from '../../../utils/controls';
import handleRemoveItemFromErrorList from '../../../utils/handleRemoveItemFromErrorList';
import { Icon, arrowUp, arrowDown } from '@wordpress/icons';

const Controls = ({attributes, setAttributes, clientId, ...props}) => {
    const {title, startingYear, data} = attributes;
	const [ newSlide, setNewSlide ] = useState( false );

	const [ error, setError ] = useState( {} );

	const { lockPostSaving, unlockPostSaving } = useDispatch( editorStore );
	const { createErrorNotice, removeNotice } = useDispatch( noticesStore );

	const notices = useSelect( ( select ) =>
		select( noticesStore ).getNotices()
	);

	useEffect( () => {
		handleEditor( {
			error,
			lockPostSaving,
			unlockPostSaving,
			createErrorNotice,
			removeNotice,
			notices,
			clientId,
			blockName: 'Cronologia',
		} );
	}, [ error ] );

	const additionalProps = {
		errorList: error,
		setError,
	};

	const renderedTimelineControls = useMemo(
		() =>
			data.map( ( slide, index ) => {
				const {
					title,
					description,
					image
				} = slide;

				return (
					<div className="settings__slider--wrapper" key={ index }>
						<div className="settings__slider--arrows">
							{ index > 0 ? (
								<Icon
									size={ 20 }
									icon={ arrowUp }
									onClick={ () =>
										handleReorder( {
											data,
											index,
											action: 'up',
											setAttributes,
										} )
									}
								/>
							) : null }
							{ data.length - 1 !== index ? (
								<Icon
									size={ 20 }
									icon={ arrowDown }
									onClick={ () =>
										handleReorder( {
											data,
											index,
											action: 'down',
											setAttributes,
										} )
									}
								/>
							) : null }
						</div>
						<PanelBody
							title={ __( `Cronologia: ${ production_year } | ${ title }`, 'gbec' ) }
							initialOpen={
								newSlide && index === data.length - 1
									? true
									: false
							}
						>
							<div className="settings__slider--inner-wrapper">
								<TextControl
									controlName={ 'Title' }
									id={ `title-${ index }-${ clientId }` }
									value={ title }
									callback={ ( content ) =>
										handleEditInnerItem( {
											index,
											attr: 'title',
											data,
											content,
											setAttributes,
										} )
									}
									maxLength={ 24 }
									required
									{ ...additionalProps }
								/>
								<RichTextControl
									controlName={ 'Descrição' }
									id={ `description-${ index }-${ clientId }` }
									value={ description }
									callback={ ( content ) =>
										handleEditInnerItem( {
											index,
											attr: 'description',
											data,
											content,
											setAttributes,
										} )
									}
									maxLength={ 24 }
									required
									{ ...additionalProps }
								/>
								<MediaControl
									controlName={ 'Image' }
									id={ `image-${ index }-${ clientId }` }
									value={ image }
									callback={ ( content ) => {
										handleEditInnerItem( {
											index,
											attr: 'image',
											data,
											content,
											setAttributes,
										} );
									} }
									deleteCallback={ () =>
										handleResetInnerItem( {
											index,
											attr: 'image',
											data,
											setAttributes,
											resetValue: {},
										} )
									}
									allowedTypes={ [ 'image' ] }
									required
									{ ...additionalProps }
								/>
								<Button
									isDestructive
									icon={ 'trash' }
									onClick={ () => {
										handleDeleteItem( {
											data,
											index,
											setAttributes,
										} );
										handleRemoveItemFromErrorList( {
											error,
											setError,
											index,
											clientId,
											attrs: [
												`title-${ index }-${ clientId }`,
												`description-${ index }-${ clientId }`,
												`media-${ index }-${ clientId }`,
											],
										} );
									} }
								>
									{ __( 'Delete', 'gbec' ) }
								</Button>
							</div>
						</PanelBody>
					</div>
				);
			} ),
		[ data ]
	);

    return (
        <InspectorControls { ...props }>
			<PanelBody title={ __( 'Panel Title', 'gbec' ) }>
                <TextControl
					controlName="Title"
					id={`title-${clientId}`}
					callback={ ( content ) =>
						setAttributes( { title: content } )
					}
					value={ title }
					required
					{ ...additionalProps }
				/>
			</PanelBody>
			<PanelBody title={ __( 'Repeater Title', 'gbec' ) }>
				<div>{ renderedTimelineControls }</div>
				<Button
					text={ 'Add new' }
					variant={ 'primary' }
					onClick={ () => {
						handleAddItem( {
							data,
							template: {
								title: {},
								description: '',
								media: '',
							},
							setAttributes,
						} );
						setNewSlide( true );
					} }
				/>
			</PanelBody>
		</InspectorControls>
    )
};

export default Controls;
```

## Known issues:
- Wordpress is not aware of blocks being deleted so, the useEffect might not be the best approach (it causes an imediate validation of fields, causing the editor to disable saving when a block is added, clicked and removed).

Reach out if you have any questions or notice any bugs!
