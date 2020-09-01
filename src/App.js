import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';
import { Box, Container, Checkbox, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const countries = [
  { label: "Singapore", value: 1 },
  { label: "Malaysia", value: 2 },
  { label: "Indonesia", value: 3 },
  { label: "Philippines", value: 4 },
  { label: "Thailand", value: 5 },
];

function App(){

  const [countriesState, setCountriesState] = React.useState(countries);
  const [searchInputState, setSearchInputState] = React.useState("");
  const [rightsState, setRightsState] = React.useState(true);
  const [displayState, setDisplayState] = React.useState(countriesState);
  const [showAllState, setShowAllState] = React.useState(false);

  const handleOnInputSelect = (value ) => {
    setSearchInputState(value);
  }


  const handleSeachValueChange = (value, {action} ) => {
    if(action != "input-blur" && action != "menu-close"){
      setSearchInputState(value);
    }
  }

  const handleCreate = () => {
    if(searchInputState.trim() != ""){
      var state = { label: searchInputState, value: countriesState.length+1 }
      setCountriesState([...countriesState, state]);

      if(!showAllState){
        var newDisplayState = [];
        for(var i = 0; i < 5; i++){
          newDisplayState[i] = [...countriesState, state][i];
        }
        setDisplayState(newDisplayState);
      }else{
        setDisplayState([...countriesState, state]);
      }
    }
  };

  const handleRightsChange = (event) => {
    setRightsState(event.target.checked);
  };

  const handleShowAllChange = (event) => {
    setShowAllState(event.target.checked);
    if(!event.target.checked){
      var newDisplayState = [];
      for(var i = 0; i < 5; i++){
        newDisplayState[i] = countriesState[i];
      }
      setDisplayState(newDisplayState);
    }else{
      setDisplayState(countriesState);
    }
  };

  return(
    <Box className="app">
      <Container className="container">
        <Box l={1} m={1} s={1}>
          <Select options={displayState}
            onInputChange={handleSeachValueChange}
            onChange={handleOnInputSelect}
            noOptionsMessage={() => searchInputState + " not found"}
          />
        </Box>
        
        <Box l={1} m={1} s={1}>
          {rightsState &&
            <Button variant="contained" style={{ float: "right", marginTop: "120px" }}
              onClick={handleCreate}
            >
              Add & Select
            </Button>
          }
        
          <label style={{ float: "left", marginTop: "120px"}}>
            has rights?
          </label>
          
          <Checkbox style={{ float: "left", marginTop: "111px" }}
            checked={rightsState}
            onChange={handleRightsChange}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />

          { countriesState.length > 5 &&
            <div>
              <label style={{ float: "left", marginTop: "120px"}}>
                show {countriesState.length - 5 } more?
              </label>
              <Checkbox style={{ float: "left", marginTop: "111px" }}
                checked={showAllState}
                onChange={handleShowAllChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </div>
          }

        </Box>

      </Container>
    </Box>
  );

}

export default App;