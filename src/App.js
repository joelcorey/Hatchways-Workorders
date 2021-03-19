import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import Workorder from './component/Workorder/Workorder';

function App() {

	const [workOrders, setWorkOrders] = useState([]);
	const [workers, setWorkers] = useState();
	const [error, setError] = useState();

	/* First time load, let's get the work order data! */
	useEffect(() => {
		let url = 'https://api.hatchways.io/assessment/work_orders';
		let options = {
			method: 'GET',
			headers: {"Content-Type": "application/json"}
		}

		const fetchData = async () => {
			try {
				const response = await fetch(url, options);
				const json = await response.json();
				setWorkOrders(json.orders);
			} catch (error) {
				setError(error);
			}
		};

		fetchData();	
	}, [] )

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
