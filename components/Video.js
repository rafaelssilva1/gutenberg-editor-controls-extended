const Video = ( { content, controls, usedInControl, ...props } ) => {
	const { url, width, height, mime, position } = content || {};
	const { autoplay, muted, loop } = controls || {};

	if ( ! url ) return null;

	return (
		<video
			width={ width }
			height={ height }
			autoPlay={ autoplay }
			muted={ muted }
			loop={ loop }
			className="components__media-control--preview"
			style={ {
				objectPosition: usedInControl
					? ''
					: `${ position.xAxis } ${ position.yAxis }`,
			} }
			{ ...props }
		>
			<source src={ url } type={ mime } />
		</video>
	);
};

export default Video;
