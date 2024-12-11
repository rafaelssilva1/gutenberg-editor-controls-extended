/**
* MediaControl component that extends functionality from the base Wordpress components
	
* @param {string | null} controlName				optional control name that will be displayed in the editor
* @param {string | null} selectText					optional string that is used for the select display section
* @param {string | null} previewText				optional string that is used for the preview display section
* @param {string | number | array | object} value	corresponds to the value that the control is currently managing
* @param {function} callback						callback that handles the state changes for this particular control
* @param {function} deleteCallback					callback that handles deleting the image
* @param {arrray | null} allowedTypes				array that that is used to manage the allowed media types
* @param {string | null} id							optional unique id that is used to manage locking and unlocking the Wordpress editor (only necessary when required prop is set)
* @param {function} setError						used to manage the error state in the parent control file
* @param {object} errorList							the current errors for this block
* @param {boolean | null} required					prop used to manage required status of the control
* @param {boolean | null} allowMultiple				prop that enable gallery view for media upload control and the upload of multiple images
* @param {boolean | null} usedInControl				prop that is used to manage if the object-position is passed to the controls or not
*/

import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';

import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { Icon, close } from '@wordpress/icons';

import MediaPosition from './components/MediaPosition';

import OtherSettings from './components/OtherSettings';
import VideoSettings from './components/VideoSettings';

import Image from '../Image';
import Video from '../Video';

import Required from './utils/Required';
import ErrorMessage from './utils/ErrorMessage';
import handleError from '../../utils/handleError';

const MediaControl = ( {
	controlName,
	previewText = 'Pré-visualização',
	selectText = 'Selecione uma imagem',
	value,
	callback,
	deleteCallback,
	allowedTypes = [ 'image', 'video' ],
	setError,
	errorList,
	id,
	required = false,
	allowMultiple,
	usedInControl = true,
	...props
} ) => {
	const error =
		required &&
		( value && allowMultiple
			? value.length === 0
			: value
			? ! value.url
			: true );

	useEffect( () => {
		handleError( { errorList, setError, id, error } );
	}, [ value ] );

	const [ hover, setHover ] = useState( false );

	return (
		<div className="settings__wrapper">
			{ controlName ? (
				<span className="settings__title">
					{ __( `${ controlName }`, 'teato' ) }
					<Required required={ required } />:
				</span>
			) : null }
			{ ! value?.length ? (
				value?.url ? (
					<>
						<div className="settings__subtitle">{ `${ __(
							`${ previewText }`,
							'teato'
						) }:` }</div>
						<div
							onMouseEnter={ () => setHover( true ) }
							onMouseLeave={ () => setHover( false ) }
							className="settings__innerwrapper"
						>
							{ value.type === 'video' ? (
								<Video
									content={ value }
									usedInControl={ usedInControl }
								/>
							) : (
								<Image
									content={ value }
									usedInControl={ usedInControl }
								/>
							) }
							{ hover ? (
								<div className="settings__overlay"></div>
							) : null }
							<Icon
								icon={ close }
								onClick={ deleteCallback }
								className={ `settings__close ${
									hover ? 'white' : ''
								}` }
							/>
						</div>
						<div>
							<span className="settings__subtitle">
								{ __( 'Filename', 'teato' ) }
							</span>
							{ `: ${ value.filename }` }
						</div>
					</>
				) : (
					<p className="settings__subtitle">{ `${ __(
						`${ selectText }`,
						'teato'
					) }:` }</p>
				)
			) : (
				value?.length > 0 && (
					<div
						onMouseEnter={ () => setHover( true ) }
						onMouseLeave={ () => setHover( false ) }
						className="settings__innerwrapper"
					>
						{ value.map( ( image, index ) => (
							<Image content={ image } key={ index } />
						) ) }
						{ hover ? (
							<div className="settings__overlay"></div>
						) : null }
						<Icon
							icon={ close }
							onClick={ deleteCallback }
							className={ `settings__close ${
								hover ? 'white' : ''
							}` }
						/>
					</div>
				)
			) }
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ callback }
					allowedTypes={ allowedTypes }
					value={ value ? value.url : '' }
					render={ ( { open } ) => (
						<Button
							variant="secondary"
							onClick={ open }
							className="settings__width--fitcontent"
						>
							{ __( 'Open Media Library', 'teato' ) }
						</Button>
					) }
					multiple={ allowMultiple }
					gallery={ allowMultiple }
					{ ...props }
				/>
			</MediaUploadCheck>
			<ErrorMessage error={ error } addMargin={ false } />
			{ ! allowMultiple ? (
				<>
					<MediaPosition
						value={ value }
						callback={ callback }
						{ ...props }
					/>
					<OtherSettings
						value={ value }
						callback={ callback }
						{ ...props }
					/>
					<VideoSettings
						value={ value }
						callback={ callback }
						{ ...props }
					/>
				</>
			) : null }
		</div>
	);
};

export default MediaControl;
