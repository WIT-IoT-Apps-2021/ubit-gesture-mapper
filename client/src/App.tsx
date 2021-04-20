import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import { Alert } from './features/alert/Alert';
import { MicrobitData } from './features/microbit/MicrobitData';
import { Recorder } from './features/recorder/Recorder';
import { Models } from './features/models/Models';
import { connectMicrobitDevice, disconnectMicrobit } from './uBit/uBit';
import { Model } from './features/models/Model';
import { Audio } from './features/audio/Audio'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  link: {
    color: "unset"
  },
}));


function App() {
  return (
    <Router>
      <div className="App">
        <RecordHeader />
        <Alert />
        <Switch>
          <Route exact path="/recorder/:id" component={Recorder} />
          <Route exact path="/models">
            <Models />
          </Route>
          <Route exact path="/model/:id" component={Model}/>
          {/* Temporary link fro development purposes */}
          <Route exact path="/audio">
            <Audio />
          </Route>
          <Route path="/">
            <DataHeader />
            <MicrobitData />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function RecordHeader() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography variant="h6">
          μBit Gesture Mapper
        </Typography>
        <div className={classes.grow} ></div>
        <Link to="/" className={classes.link}>
          <Button color="inherit">
            Microbit
          </Button>
        </Link>
        <Link to="/models" className={classes.link}>
          <Button color="inherit">
            Models
          </Button>
        </Link>
        {/* Temporary link fro development purposes */}
        <Link to="/audio" className={classes.link}>
          <Button color="inherit">
            Audio
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

function DataHeader() {
  const classes = useStyles();
  return (
    <AppBar color="default" position="static" className={classes.root}>
      <Toolbar>
        <Button color="inherit" onClick={connectMicrobitDevice}>
          Pair MicroBit
          </Button>
        <Button color="inherit" onClick={disconnectMicrobit}>
          Disconnect MicroBit
          </Button>
      </Toolbar>
    </AppBar>
  );
}

export default App;
