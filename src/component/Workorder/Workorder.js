import React, { useState, useEffect } from 'react';

export default function Workerorder(props) {

	const [worker, setWorker] = useState();
	const [error, setError] = useState();

	const { id, description, workerId, deadline } = props;

	async function fetchData(url) {
		try {
			let options = {
				method: 'GET',
				headers: {"Content-Type": "application/json"}
			}
			await fetch(url, options)
				.then(response => response.json())
        .then(data => setWorker(data.worker));
				
		} catch (error) {
			setError(error);
		}
	};
	
	function displayWorkerInfo() {
		if (worker !== undefined) {
			return (
				<div className='worker-container'>
				<div><img className='worker-image' src={worker.image} /></div>
				<div className='worker-info-column left-text'>
						<div>{worker.name}</div>
						<div>{worker.companyName}</div>
						<div>{worker.email}</div>
					</div>
				</div>
			)
		} else {
			<div>Loading user data..</div>
		}
	}

	function convertUnixEpochTime(timeSinceUnixEpoch, mode = 'short'){
		var date = new Date(timeSinceUnixEpoch * 1000);
		if (mode === 'short') return date.toLocaleString();
		if (mode === 'long')return date.toGMTString();
		return 'ERROR: Please select a valid date format!'
	}

	useEffect(() => {
		fetchData(`https://api.hatchways.io/assessment/workers/${workerId}`)
	}, [])

	useEffect(() => {
		console.log(worker)
	}, [worker])

	return (
		<div className='small-item'>
			<div>Work order {id}</div>
			<p className='left-text'>{description}</p>
			{displayWorkerInfo()}
			<div className='deadline-date-time'>{convertUnixEpochTime(deadline, 'short')}</div>
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
