const Richtext = ( props ) => {
	const { content } = props;
	return <div dangerouslySetInnerHTML={ { __html: content } }></div>;
};

export default Richtext;
