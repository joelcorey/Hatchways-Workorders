import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

	const [workOrders, setWorkOrders] = useState({});
	const [error, setError] = useState();

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
				setWorkOrders(json);
			} catch (error) {
				setError(error);
			}
		};

		fetchData();	
	}, [] )


	useEffect(() => {
		console.log(workOrders)
	}, [workOrders])

  return (
    <div className="App">
      <header className="App-header">
       this is header
      </header>
			<div>
				
			</div>
			
    </div>
  );
}

export default App;
