const Text = ( props ) => {
	const { content } = props;
	return <div { ...props }>{ content }</div>;
};

export default Text;
