import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import Workorder from './component/Workorder/Workorder';

function App() {

	const [workOrders, setWorkOrders] = useState([]);
	const [workers, setWorkers] = useState();
	const [error, setError] = useState();
	const [response, setReponse] = useState();

	async function fetchData(url, options, channel = 'workOrders') {
		try {
			const response = await fetch(url, options)
				.then(res => res.json())
				.then(json => {
					handleChannel(json, channel)
				})
				
		} catch (error) {
			setError(error);
		}
	};

	function handleChannel(json, channel) {
		if (channel === 'workOrders') setWorkOrders(json.orders)
	}

	/* First time load, let's get the work order data! */
	useEffect(() => {
		fetchData(
			'https://api.hatchways.io/assessment/work_orders',
			{
				method: 'GET',
				headers: {"Content-Type": "application/json"}
			}
		)
	}, [] )

	useEffect(() => {
		console.log(workOrders)
	}, [workOrders])

  return (
    <div className="App">

			<div className="flexcontainer">
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
									workerId={order.workerId}
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
