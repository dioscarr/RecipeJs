import React, { useState } from "react";
import ChatGPT from "chatgpt";
import axios from "axios";
import "./Recipe.css";
import hljs from "highlight.js";
import styled from "styled-components";
import allowedLanguages from './allowedLanguages.js'
import { CircularProgress } from "@material-ui/core";


import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Badge,
  makeStyles,
} from "@material-ui/core";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Typist from "react-typist";
import UserIcon from "./user-icon.svg"; // Add user icon image
import AssistantIcon from "./assistant-icon.svg"; // Add assistant icon image
import { BorderAllRounded } from "@mui/icons-material";

interface Recipe {
  ingredients: string[];
  instructions: string[];
}

interface message {
  q: string;
  text: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(0),
    backgroundColor: "#ffffff",
    maxHeight:'95vh'
  },
  chatMain: {
    height: '89vh',
    display: 'grid',
    padding: '8px',
    minWidth: '96vw',
    maxHeight: '89vh',
    overflowY: 'scroll',
    backgroundColor: '#ffffff' ,
  },
  form: { 
  },
  bottombar:{ 
    position: 'absolute',
    bottom: '0px',
    width: '100vw',
    left: '0px',
    display: 'grid',
    gridTemplateColumns: '8fr 2fr'
  },
  textField: {
    borderRadius:'22px !important',
    marginRight: theme.spacing(0),
    '& .MuiOutlinedInput-input': {
      
      width:'92%',
      borderRadius:'10px'
    },
   
  },
  button: {
    height:'88%',
    width:'100%',
    borderRadius:22,
    display:'grid',
    alignSelf:'center',
    justifySelf:'center',
    backgroundColor:'#8975c1',
    margin: theme.spacing(),
  },
}));

const ChatUI: React.FC = () => {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [messages, setMessages] = useState<message[]>([]);
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<string>("");
  const [isCode, setIsCode] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if(input !=="")
      {
        setLoading(true);
        setInput("");
        // const response = await axios.post('http://localhost:3000/openai', {
        const response = await axios.post("https://recipexerver.onrender.com/openai",
        {
        input: `${input}`,
        }
        );
        setMessages([...messages, { q: input, text: response.data }]);
        const detectedLanguage = hljs.highlightAuto(response.data).language;
        if (detectedLanguage !== undefined) setLanguage(detectedLanguage);

        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const clearMessages = () => {
    setMessages([]);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.chatMain} elevation={0}>
        {messages.length > 0 && (
          <List>
            {messages.map((message, index) => (
             
<>
             <Paper
                key={index}
                style={{
                  display: "grid",
                  rowGap: 10,
                  margin:'20px 0px 20px 20px',
                  borderTopLeftRadius:'20px',
                  borderBottomLeftRadius:'20px',
                  padding:'20px 10px',
                  backgroundColor: "#d1c0ff",
                }}
              >
                <div style={{width:'24px',display:'inline-grid',alignContent:'center',gridTemplateColumns:'24px 1fr'}}>
                  <svg style={{width:'14px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                  <Typography
                    style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    marginBottom: 10,
                  
                  }}
                >
                  You:
                </Typography>
                </div>
                {/* <SyntaxHighlighter
                  language={language}
                  style={vscDarkPlus}
                  customStyle={{
                    fontSize: 14,
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                > */}
                 <Typography
                  style={{
                 
                    fontSize: 14,
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {message.q}
                  </Typography>
            </Paper>
            <Paper
                key={index}
                style={{
                  display: "grid",
                  rowGap: 10,
                  margin:'20px 20px 20px 0',
                  borderTopRightRadius:'20px',
                  borderBottomRightRadius:'20px',
                  padding:'20px 10px',
                  backgroundColor: "#f6f5ff",
                }}
              >
                {/* </SyntaxHighlighter> */}
                <div style={{width:'24px',display:'inline-grid',alignContent:'center',gridTemplateColumns:'24px 1fr'}}>
                <svg style={{width:'14px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M176 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64c-35.3 0-64 28.7-64 64H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64c0 35.3 28.7 64 64 64v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448c35.3 0 64-28.7 64-64h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V280h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V176h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448c0-35.3-28.7-64-64-64V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H280V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H176V24zM160 128H352c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32zm192 32H160V352H352V160z"/></svg>
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  Assistant:
                </Typography>
                </div>
                {/* <SyntaxHighlighter
                  language={language}
                  style={vscDarkPlus}
                  customStyle={{
                    fontSize: 14,
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                > */}
                 <Typography
                  style={{
                    fontSize: 14,
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {message.text}
                  </Typography>
                {/* </SyntaxHighlighter> */}
              </Paper>
            </>
            ))
          }
            {loading&&(<div className="dot-elastic"></div>)}
          </List>
        )}
      </Paper>
      <form className={classes.form} onSubmit={handleSubmit}>
       <div className={classes.bottombar}> <TextField
       InputProps={{
        
        style: {
          borderRadius: '22px',
          backgroundColor:'#fbf9ff',
          display:'grid',
          justifySelf:'center',
          width:'98%'

        },
      }}
          variant="outlined"
          label="Ask a question"          
          className={classes.textField}
          value={input}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          Send
        </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatUI;

