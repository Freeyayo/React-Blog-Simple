import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
// import './App.css';
import "./App.scss";

// import Posts from "./components/post";
// import PostForm from "./components/postForm";
import Header from "./components/header";
// import Body from "./components/body";
import Content from "./components/content";
import Articles from "./components/articles";

import SineWave from "./components/arts/sinewave";
import Snake from "./components/arts/snake";
import SocketSpace from "./components/arts/socketspace";
import Masonry from "./components/arts/masonry";

import Bio from "./components/bio";
import Ots from "./components/ots";

import Footer from "./components/footer";

import { Provider } from "react-redux";
import store from "./store";

const Context = React.createContext('default');

export default class App extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    if(navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i)){
      alert("为了更好浏览体验，请使用PC端浏览")
    }
  }

  render(){
    return(
      <Provider store = {store}>
        <Router>
          <div className="App">
            <Header/>
            <Route exact path="/" component={Content} />
            <Route exact path="/articles" component={Articles} />
            <Route exact path="/sinewave" component={SineWave} />
            <Route exact path="/snake" component={Snake} />
            <Route exact path="/masonry" component={Masonry} />
            <Route exact path="/socketspace" component={SocketSpace} />
            <Route exact path="/bio" component={Bio} />
            <Route exact path="/ots" component={Ots} />
            <Footer/>   
          </div>
        </Router>
      </Provider>     
    )
  }
};
