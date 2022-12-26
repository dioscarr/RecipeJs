import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  TextField,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '80%',
    margin: '0 auto',
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

interface Message {
  id: number;
  author: string;
  message: string;
  timestamp: string;
}

const Chatui: React.FC = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState<Message[]>([    {      id: 1,      author: 'Alice',      message: 'Hello, Bob! How are you doing?',      timestamp: '12:00',    },    {      id: 2,      author: 'Bob',      message: 'I am doing well, thanks for asking. How about you?',
      timestamp: '12:01',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          author: 'You',
          message: newMessage,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <List>
          {messages.map((message) => (
            <React.Fragment key={message.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    {message.author[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={message.author}
                  secondary={`${message.message} - ${message.timestamp}`}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            className={classes.input}
                placeholder="Enter your message"
                value={newMessage}
                onChange={(event) => setNewMessage(event.target.value)}
              />
              <Button type="submit" variant="contained" color="primary">
                Send
              </Button>
            </form>
          </Paper>
        </div>
      );
    };
    
    export default Chatui;
    