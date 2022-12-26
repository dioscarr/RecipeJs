import React from 'react';
import logo from './logo.svg';
import './App.css';
import RecipeForm from './Recipe';
import { Grid } from '@material-ui/core';
import RecipeImages from './RecipeImages';
import Chatui from './chatui';

function App() {
  return (
    <div className="App">
  
      <Grid container-fluid spacing={2}> 
        <Grid item xs={12}>
          <RecipeForm/>  
        </Grid>
        <Grid item xs={12}>
         <Chatui/>
        </Grid>
       
      </Grid>
    </div>
  );
}

export default App;
