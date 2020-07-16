import React , { useState, useEffect } from 'react';
import './App.css';

import Posts from "./components/post";
import PostForm from "./components/postForm";

import { Provider } from "react-redux";
import store from "./store";

const Context = React.createContext('default');

export default class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Provider store = {store}>
        <div className="App">
          <PostForm/> 
          <Posts/>
          <IncreaseCounts />
        </div>
      </Provider>     
    )
  }
};

class InnerComponent extends React.Component{
  static contextType = Context;
  render(){
    return (
        <h1>
          inner c {this.context}
          <Context.Consumer>
            {value => {
              return (
                <div>
                  this is {value}
                </div>
              )
            }}
          </Context.Consumer>
        </h1>
    )
  } 
}

function IncreaseCounts() {
  let counts = useIncreaseCounts();

  if(counts > 1000){
    return(
      <Context.Provider value = "full screen"> 
        <header className="App-header">
          Window Width {counts}
          <InnerComponent />
        </header>
      </Context.Provider>
    )
  }else{
    return(
      <Context.Provider value = "mobile screen"> 
        <header className="App-header">
          Window Width {counts}
          <InnerComponent />
        </header>
      </Context.Provider>
    )
  }
 
}

function useIncreaseCounts(){
  const [counts, setCounts] = useState(window.innerWidth);



  useEffect(() => {
      window.addEventListener("resize", resizeHandler);
      return () => {
        window.removeEventListener("resize",resizeHandler)
      }
  })

  function resizeHandler(e){
    setCounts(window.innerWidth);
  }

  return counts;
}
