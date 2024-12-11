const Required = ( { required = true, ...props } ) => {
	return required ? (
		<span className="required" { ...props }>
			*
		</span>
	) : null;
};

export default Required;
