import React, { useState } from 'react';
import ChatGPT from 'chatgpt';
import axios from 'axios';
import './Recipe.css';
import styled from 'styled-components'
import {
  Container,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Divider,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  Badge,
} from '@material-ui/core';


interface Recipe {
  ingredients: string[];
  instructions: string[];
}
interface message {
  q: string,
  text: string
}
const RecipeImages: React.FC = () => {
  const [input, setRecipePrompt] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [messages, setMessages] = useState<message[]>([])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipePrompt(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://api.openai.com/v1/images/generations', {
        prompt: `${input}`,
        n: 2,
        size: "1024x1024"
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
      
      setMessages([...messages, { q: input, text: response.data.data[0].url }])
      setRecipePrompt('');
    } catch (error) {
      console.error(error);
    }


  };
  const clearMessages = () => {
    setMessages([])
  }
  return (
    <Container maxWidth="sm" style={{marginTop:30}} >
      
        <AppBar position="static" style={{backgroundColor:'#fcfcfc'}}>
         <Toolbar variant="dense"> 
         
          <Typography variant="h6" style={{color:'#735a2e'}}> Home Recipe <Badge>{messages.length}</Badge> </Typography> 
         </Toolbar> 
        </AppBar>
      
      <Paper className="ChatMain" style={{ height: '70vh',maxHeight:'70vh', overflowY:'scroll',padding:'15px', backgroundColor:'#ffffff',
       
     }}>
      {messages.length>0 && (
        <List>
          {messages.map((message, index) => (
            <Paper key={index} style={{ display: 'grid', rowGap: 10, backgroundColor:'#ffdad6' }}>
             
              
                  <Typography style={{fontWeight:'bolder',color:'#532c2c'}}>{message.q}</Typography>            
 
              <Paper style={{backgroundColor:'#ffedea'}}>
                
                <img src={message.text} style={{width:'100%'}} alt=""/>
                <ListItem >
                  <ListItemText style={{color:'#532c2c'}} primary={message.text} />
                </ListItem>
              </Paper>
            </Paper>
          ))}
        </List>
        )}
      </Paper>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Message"
          value={input}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
      <Button onClick={clearMessages} variant="contained" color="secondary">
        Clear
      </Button>
    </Container>
  );
};

export default RecipeImages;
