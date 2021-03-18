import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

	const [workOrders, setWorkOrders] = useState({});

	useEffect(async () => {
		fetch('​https://api.hatchways.io/assessment/work_orders')
			.then(response => {
				setWorkOrders(response);
			})
	}, [] )

  return (
    <div className="App">
      <header className="App-header">
       this is header
      </header>
			<div>{workOrders}</div>
			
    </div>
  );
}

export default App;
