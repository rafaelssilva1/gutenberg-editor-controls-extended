const Image = ( { content, usedInControl, ...props } ) => {
	const { url, alt, width, height, loading, position } = content || {};

	if ( ! url ) return null;

	return (
		<img
			src={ url }
			alt={ alt }
			width={ width }
			height={ height }
			loading={ loading ? 'lazy' : 'eager' }
			style={ {
				objectPosition: usedInControl
					? ''
					: `${ position ? position.xAxis : '' } ${
							position ? position.yAxis : ''
					  }`,
			} }
			{ ...props }
		/>
	);
};

export default Image;
