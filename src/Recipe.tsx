import React, { useState } from 'react';
import ChatGPT from 'chatgpt';
import axios from 'axios';
import './Recipe.css';
import  hljs from 'highlight.js';
import styled from 'styled-components'
import {
  Container,
  List,
  ListItem,
  ListItemText,
  TextField,

  Divider,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  Badge,
  Button,
} from '@material-ui/core';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
interface Recipe {
  ingredients: string[];
  instructions: string[];
}
const allowedLanguages = [
  
  'less',
  'coffeescript',
  'bash',
 'awk',
'css','html',  'cpp',
  'abnf',
  'csharp',
  'arcade', 
  'javaScript', 
  'python', 
  'c', 
  'c++', 
  'java', 
  'c#', 
  'php', 
  'ruby', 
  'go', 
  'swift', 
  'rust', 
  'sql', 
  'mysql'
];
interface message {
  q: string,
  text: string
}
const RecipeForm: React.FC = () => {
  const [input, setRecipePrompt] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [messages, setMessages] = useState<message[]>([])
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<string>('');
  const [isCode, setIsCode] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipePrompt(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://recipexerver.onrender.com/openai', {
        input: `${input}`,
     
      });
      setMessages([...messages, { q: input, text: response.data}])
      const detectedLanguage = hljs.highlightAuto(response.data).language;
        if(detectedLanguage!==undefined)
          setLanguage(detectedLanguage);
       
      setRecipePrompt('');
    } catch (error) {
      console.error(error);
    }


  };
  const clearMessages = () => {
    setMessages([])
  }
  


 

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  
  return (
    <Container maxWidth="lg" style={{marginTop:30}} >
      
        <AppBar position="static" style={{backgroundColor:'#532c2c14'}}>
         <Toolbar variant="dense"> 
         
          <Typography variant="h6" style={{color:'#532c2c'}}> Home Recipe <Badge>{messages.length}</Badge> <Badge>{language}</Badge> </Typography> 
         </Toolbar> 
        </AppBar>
      
      <Paper className="ChatMain" style={{ height: '70vh',maxHeight:'70vh', overflowY:'scroll',padding:'15px', backgroundColor:'#532c2c',
       
     }}>
      {messages.length>0 && (
        <List >
          {messages.map((message, index) => (
            <Paper key={index} style={{ display: 'grid', rowGap: 10, backgroundColor:'#ffffff' }}>
             
              
              <Typography style={{fontWeight:'bolder',color:'#532c2c', maxWidth:'100%',  overflowWrap: 'break-word' }}>{message.q}</Typography>            
 
              <Paper style={{backgroundColor:'#ffffff'}}>
            
                <ListItem >
                  <ListItemText style={{color:'#532c2c'}} >
                  { hljs.highlightAuto(message.text).language !== undefined && allowedLanguages.includes(hljs.highlightAuto(message.text)?.language??"") ? (
                   <div style={{maxWidth:'100%',overflowWrap: 'break-word'}}> <SyntaxHighlighter  language={undefined} style={vscDarkPlus} >
                    {`${message.text}`}
                    </SyntaxHighlighter>
                    </div>
                    ) : (
                      <div style={{overflowWrap: 'break-word'}}>{message.text}</div>
                    )
                  }
                <CopyToClipboard text={`${message.text}`} onCopy={handleCopy}>
                    <button>{copied ? 'Copied!' : 'Copy'}</button>
                </CopyToClipboard>
                              
                  </ListItemText>
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

export default RecipeForm;
