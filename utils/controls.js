export const handleAddItem = ( { data, template, setAttributes } ) => {
	const availableItems = [ ...data ];
	availableItems.push( template );

	setAttributes( { data: availableItems } );
};

export const handleDeleteItem = ( { data, index, setAttributes } ) => {
	const availableItems = [ ...data ];
	availableItems.splice( index, 1 );

	setAttributes( { data: availableItems } );
};

export const handleEditInnerItem = ( {
	data,
	content,
	index,
	attr,
	setAttributes,
} ) => {
	const availableItems = [ ...data ];
	const currentItem = availableItems[ index ];

	currentItem[ attr ] = content;

	setAttributes( { data: availableItems } );
};

export const handleResetInnerItem = ( {
	data,
	index,
	attr,
	setAttributes,
	resetValue,
} ) => {
	const availableItems = [ ...data ];
	const currentItem = availableItems[ index ];

	currentItem[ attr ] = resetValue;

	setAttributes( { data: availableItems } );
};

export const handleReorder = ( { data, index, action, setAttributes } ) => {
	const availableItems = [ ...data ];
	const itemToReorder = availableItems[ index ];

	availableItems.splice( index, 1 );
	if ( action === 'up' ) {
		availableItems.splice( index - 1, 0, itemToReorder );
	}
	if ( action === 'down' ) {
		availableItems.splice( index + 1, 0, itemToReorder );
	}

	setAttributes( { data: availableItems } );
};
