import React, { useState, useEffect } from 'react'
import './App.css';
import { Paper } from '@material-ui/core';
import SearchBar from "material-ui-search-bar";
import axios from 'axios';
import { Button } from '@material-ui/core';
require('dotenv').config()



const App = () => {
  const [value, setValue] = useState('');
  const [search, setSearch] = useState(false);
  const [data, setData] = useState(null);
  const makeApiCallForSearch = (data) => {
    console.log("Hi")
    setSearch(!search);
    setValue(data);
  }
  useEffect(() => {
    console.log("makeing an API call");
    console.log(value);
    if (value != '') {
      axios.post(`http://localhost:4000/api/locate`, {
        address: value
      }).then((res) => {
        // console.log(data);
        let data = res.data;
        setData(
          <div>
            <ul>
              <p>{JSON.stringify(data)}</p>
            </ul>
          </div>
        )
      })
        .catch(err => {
          setData(
            <div>
              <p>{JSON.stringify(err.message)}</p>
            </div>
          )
        })
    }
  }, [search])


  return (
    <div className="App">
      <SearchBar
        value={value}
        onChange={(newValue) => setValue(newValue)}
        onRequestSearch={() => makeApiCallForSearch(value)}
      />
      {/* <Button type="primary" onClick={makeApiCallForSearch}>Search</Button> */}
      {data}
    </div>
  );
}

export default App;
