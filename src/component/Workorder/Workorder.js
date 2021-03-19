import React, { useState, useEffect } from 'react';

export default function Workerorder(props) {

	const [worker, setWorker] = useState();
	const [error, setError] = useState();

	const { id, description, workers, fetchData, deadline } = props;

	function findWorkerById(workerId) {
		for (let i = 0; i < workers.length; i++) {

			/* find if worker already in workers array and if so return that worker */
			if (workers.id === worker.id) return workers[i]

			/* if worker not already in workers array go and look up that worker and 
			it to the workers array and then return that worker */
			
			
		}
	}

	function convertUnixEpochTime(timeSinceUnixEpoch, mode = 'short'){
		var date = new Date(timeSinceUnixEpoch * 1000);
		if (mode === 'short') return date.toLocaleString();
		if (mode === 'long')return date.toGMTString();
		return 'ERROR: Please select a valid date format!'
	}

	useEffect(() => {
		console.log(worker)
	}, [worker])

	return (
		<div className='small-item'>
			<div>Work order {id}</div>
			<p className='left-text'>{description}</p>
			<div>{findWorkerById}</div>
			<div className="deadline-date-time">{convertUnixEpochTime(deadline, 'short')}</div>
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
