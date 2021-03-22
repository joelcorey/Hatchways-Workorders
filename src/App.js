import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import Workorder from './component/Workorder/Workorder';

function App() {

	const [workOrders, setWorkOrders] = useState([]);
	// const [workers, setWorkers] = useState([]);
	const [workerFilter, setWorkerFilter] = useState('');
	const [error, setError] = useState();
	const [response, setResponse] = useState();
	const [channel, setChannel] = useState();
	const [workFilter, setWorkFilter] = useState('earliest-first')

	async function fetchData(url, channel) {
		try {
			setChannel(channel)

			//if (channel === 'worker') {
				console.log(url)
			//}
			let options = {
				method: 'GET',
				headers: {"Content-Type": "application/json"}
			}
			await fetch(url, options)
				.then(response => response.json())
        .then(data => setResponse(data));
				
		} catch (error) {
			setError(error);
		}
	};

	function handleChange(e) {
		setWorkerFilter(e.target.value)
	}

	function handleSliderChange(e) {
		if (workFilter === 'earliest-first') {
			setWorkFilter('latest-first')
		} else {
			setWorkFilter('earliest-first')
		}
	}

	function sortWorkOrders() {
		if (workFilter === 'earliest-first') {
			// Sort the numbers in the array in descending order
			setWorkOrders(workOrders.sort((a, b) => {return a.deadline - b.deadline}));
		}

		if (workFilter === 'latest-first') {
			// Sort the numbers in the array in descending order
			setWorkOrders(workOrders.sort((a, b) => {return b.deadline - b.deadline}));
		}
	}

	function compareByDescending(a, b) {
		if (a > b) return 1;
		if (b > a) return -1;
		return 0;
	}

	/* First time load, let's get the work order data! */
	useEffect(() => {
		sortWorkOrders()

		fetchData(
			'https://api.hatchways.io/assessment/work_orders',
			'work-orders'
		)
	}, [] )

	useEffect(() => {
		if (channel === 'work-orders') {
			setWorkOrders(response.orders)
		}
		// if (channel === 'worker') {
		// 	let newWorkers = workers
		// 	newWorkers.push(response.worker)
		// 	setWorkers(newWorkers) 
		// }
	}, [response])

	useEffect(() => {
		sortWorkOrders()
		
	}, [workOrders, workFilter])

  return (
    <div className="App">

			<div className="flexcontainer">

				<form>
					<label>
						<input type="text" name="name" onChange={handleChange} />
					</label>
					{/* <input type="submit" value="Submit"  /> */}
				</form>

				<div className='slider-container'>
					<div className='slider-item'>Earliest first</div>
					<div className='slider-item'>
					<label class="switch">
						<input type="checkbox" 
							onChange={handleSliderChange}
						/>
						<span class="slider round"></span>
					</label>
					</div>
					<div className='slider-item'>Latest first</div>
				</div>

				{
					workOrders.length > 0 ?
						workOrders.map((order, index) => (
							<div>
								<Workorder
									key={index}
									deadline={order.deadline}
									description={order.description}
									id={order.id}
									name={order.name}
									// workers={workers}
									workerId={order.workerId}
									// fetchData={fetchData}
									workerFilter={workerFilter}
								/>
							</div>
						))
						:
						<h1>Loading Data</h1>
				}
			</div>

    </div>
  );
}

export default App;
