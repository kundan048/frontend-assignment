import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const columns = [{
    title: 'S.No.',
    indexKey: 's.no'
  }, {
    title: 'Percentage funded',
    indexKey: 'percentage.funded'
  }, {
    title: 'Amount pledged',
    indexKey: 'amt.pledged'
  }]

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json').then(res => res.json());
      setData(response);
    }
    fetchData();
  }, []);


  return (
    <div className="App">
      <div className="table-container">
        <Table
          columns={columns}
          data={data}
          pagination={
            {
              dataPerPage: 5
            }
          }
        />
      </div>

    </div>
  );
}

export default App;
