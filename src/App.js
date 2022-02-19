import './App.css';
import React from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import DataList from './component/views/DataList';

function App() {
  let [data, setData] = React.useState(null)
  let [laut, setlaut] = React.useState(null)
  let track = []
  React.useEffect(() => {
    const fetchData = async () => {
      let result = await axios.get('http://api.nobelprize.org/v1/prize.json')
      console.log(result);
      let filteredData = result.data.prizes.filter(item => {
        if (+item.year >= 1900 && +item.year <= 2018 && item.laureates) {
          return true
        } else {
          return false
        }
      })
      filteredData = filteredData.map((item, index) => {
        let lau = (item.laureates.map(element => {
          track[item.id] = track[item.id] !== undefined ? ++track[item.id] : 0
          return element.firstname + " " + element.surname
        })).join(', ')
        return {
          id: (index + 1),
          year: +item.year,
          category: item.category,
          laureates: lau,
        };
      })
      setData(filteredData)
      setlaut(track)
    }

    if (!data) {

      fetchData()
    }
  }, [data])

  return (

    <div className="App">
      {data == null ? <CircularProgress /> : <><h1>data fetched</h1><br /><h5>
        <DataList rows={data} />
      </h5></>}
    </div>
  );
}

export default App;
