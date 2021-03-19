import React, { useState, useEffect } from 'react';

export default function Workerorder(props) {

	const [worker, setWorker] = useState();
	const [error, setError] = useState();

	const { id, description, workers, fetchData, workerId, deadline } = props;

	function findWorkerById(workerId) {
		console.log('looking for worker in workers array')
		for (let i = 0; i < workers.length; i++) {
			console.log(workerId)
			/* find if worker already in workers array and if so return that worker */
			if (workers[i].id === workerId) {
				console.log('worker found in workers array')
				setWorker(workers[i]);
				return;
			}
		}
		/* if worker not already in workers array go and look up that worker and 
		it to the workers array and then return that worker */
		console.log('worker not found in workers array, performing API search')
		let updateWorkersArray = fetchData(
			`​https://api.hatchways.io/assessment/workers/​${workerId}`,
			'workers'
		)
		return;

	}

	function displayWorkerInfo() {
		if (worker !== undefined) {
			return (
				<div>{worker.name}</div>
			)
		}
	}

	function convertUnixEpochTime(timeSinceUnixEpoch, mode = 'short'){
		var date = new Date(timeSinceUnixEpoch * 1000);
		if (mode === 'short') return date.toLocaleString();
		if (mode === 'long')return date.toGMTString();
		return 'ERROR: Please select a valid date format!'
	}

	useEffect(() => {
		findWorkerById(workerId)
	}, [])

	useEffect(() => {
		console.log(worker)
	}, [worker])

	return (
		<div className='small-item'>
			<div>Work order {id}</div>
			<p className='left-text'>{description}</p>
			<div>
				{displayWorkerInfo()}
			</div>
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
