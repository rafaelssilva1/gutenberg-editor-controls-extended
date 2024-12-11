export const handleAddFlexibleItem = ( { data, content, setAttributes } ) => {
	const availableItems = [ ...data ];
	const currentItem = availableItems[ 'flexible' ];

	currentItem.push( content );

	setAttributes( { data: availableItems } );
};

export const handleEditFlexibleItem = ( {
	data,
	content,
	innerIndex,
	setAttributes,
} ) => {
	const availableItems = [ ...data ];
	const contentToUpdate = availableItems[ 'flexible' ][ innerIndex ];

	contentToUpdate[ 'content' ] = content;

	setAttributes( { data: availableItems } );
};

export const handleDeleteFlexibleItem = ( {
	data,
	innerIndex,
	setAttributes,
} ) => {
	const availableItems = [ ...data ];
	const flexibleContent = availableItems[ 'flexible' ];

	flexibleContent.splice( innerIndex, 1 );

	setAttributes( { data: availableItems } );
};

export const handleReorderFlexibleItem = ( {
	data,
	innerIndex,
	action,
	setAttributes,
} ) => {
	const availableItems = [ ...data ];
	const flexibleContent = availableItems[ 'flexible' ];
	const flexibleItemToReorder = flexibleContent[ innerIndex ];

	flexibleContent.splice( innerIndex, 1 );
	if ( action === 'up' ) {
		flexibleContent.splice( innerIndex - 1, 0, flexibleItemToReorder );
	}
	if ( action === 'down' ) {
		flexibleContent.splice( innerIndex + 1, 0, flexibleItemToReorder );
	}

	setAttributes( { data: availableItems } );
};

export const handleAddInnerFlexibleItem = ( {
	data,
	content,
	index,
	attr,
	setAttributes,
} ) => {
	const availableItems = [ ...data ];
	const currentItem = availableItems[ index ];

	currentItem[ attr ].push( content );

	setAttributes( { data: availableItems } );
};

export const handleEditInnerFlexibleItem = ( {
	data,
	content,
	index,
	innerIndex,
	setAttributes,
} ) => {
	const availableItems = [ ...data ];
	const currentItem = availableItems[ index ];

	const contentToUpdate = currentItem[ 'flexible' ][ innerIndex ];
	contentToUpdate[ 'content' ] = content;

	setAttributes( { data: availableItems } );
};

export const handleDeleteInnerFlexibleItem = ( {
	data,
	index,
	innerIndex,
	setAttributes,
} ) => {
	const availableItems = [ ...data ];
	const currentItem = availableItems[ index ];

	const flexibleContent = currentItem[ 'flexible' ];
	flexibleContent.splice( innerIndex, 1 );

	setAttributes( { data: availableItems } );
};

export const handleReorderInnerFlexibleItem = ( {
	data,
	index,
	innerIndex,
	action,
	setAttributes,
} ) => {
	const availableItems = [ ...data ];
	const currentItem = availableItems[ index ];
	const flexibleContent = currentItem[ 'flexible' ];
	const flexibleItemToReorder = flexibleContent[ innerIndex ];

	flexibleContent.splice( innerIndex, 1 );
	if ( action === 'up' ) {
		flexibleContent.splice( innerIndex - 1, 0, flexibleItemToReorder );
	}
	if ( action === 'down' ) {
		flexibleContent.splice( innerIndex + 1, 0, flexibleItemToReorder );
	}

	setAttributes( { data: availableItems } );
};
