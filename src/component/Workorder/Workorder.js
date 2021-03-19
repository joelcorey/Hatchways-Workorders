import React, { useState, useEffect } from 'react';

export default function Workerorder(props) {

	const [worker, setWorker] = useState();
	const [error, setError] = useState();
	const { id, description, workerId, deadline } = props;

	function convertUnixEpochTime(timeSinceUnixEpoch, mode = 'short'){
		// var date = new Date(timeSinceUnixEpoch);
		// var utc = date.getTime() + (date.getTimezoneOffset() * 60000);  //This converts to UTC 00:00
		// var nd = new Date(utc + (3600000 * offset));
		// return nd.toLocaleString();

		var date = new Date(timeSinceUnixEpoch * 1000);
		if (mode === 'short') return date.toLocaleString();
		if (mode === 'long')return date.toGMTString();
		return 'ERROR: Please select a valid date format!'
	}

	useEffect(() => {
		let url = `​https://api.hatchways.io/assessment/workers/${workerId}`;
		let options = {
			method: 'GET',
			headers: {"Content-Type": "application/json"}
		}

		const fetchData = async () => {
			try {
				const response = await fetch(url, options);
				const json = await response.json();
				setWorker(json.worker);
			} catch (error) {
				setError(error);
			}
		};

		fetchData();
	}, [])

	useEffect(() => {
		console.log(worker)
	}, [worker])

	return (
		<div className='small-item'>
			<div>Work order {id}</div>
			<p className='left-text'>{description}</p>
			{
				worker !== undefined &&
					<div>{worker.name}</div>
			}
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
