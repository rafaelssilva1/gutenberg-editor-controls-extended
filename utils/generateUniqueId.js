const generateUniqueId = () => {
	const uniqueId = Math.random().toString( 16 ).slice( 2 );

	return uniqueId;
};

export default generateUniqueId;
