import React, { useState, useEffect } from 'react';

export default function Workerorder(props) {

	const { id, description } = props;

	return (
		<div 
			className='small-item'
		>
			<p>Work order {id}</p>
			<p className='left-text'>{description}</p>
		</div>
	) 
}

/*
	key={index}
	deadline={order.deadline}
	description={order.description}
	id={order.id}
	name={order.name}
	workerId={order.workerId}	
*/
