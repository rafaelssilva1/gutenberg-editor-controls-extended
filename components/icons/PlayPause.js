const PlayPause = ( { ...props } ) => {
	return (
		<svg
			className="icons__play-pause"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			height="24px"
			width="24px"
			fill="currentColor"
			viewBox="0 0 24 24"
			{ ...props }
		>
			<g
				stroke="none"
				strokeWidth="1"
				fill="currentColor"
				fillRule="evenodd"
			>
				<path
					d="M15,18 L15,6 L17,6 L17,18 L15,18 Z M20,18 L20,6 L22,6 L22,18 L20,18 Z M2,5 L13,12 L2,19 L2,5 Z"
					fill="currentColor"
				/>
			</g>
		</svg>
	);
};

export default PlayPause;
