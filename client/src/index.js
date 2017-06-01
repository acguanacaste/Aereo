import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import React, {Component} from 'react';
//import axios from 'axios';
import './index.css';


/*
const Home = () =><div> Home </div>;
const About = () => <div> About</div>;
const NotFound = () => <div> Not Found </div>;


class App extends Component {
    renderRoute(){
        switch (window.location.pathname){
            case '/' : return <Home />;
            case '/about' : return <About />
            default: return <NotFound />;
        }
    }

    render(){
        return (
            <div>
                {this.renderRoute()}
            </div>
        );
    }
}

export default App;
 */

//{/*<App />*/}
ReactDOM.render(
<App />
    ,

  document.getElementById('root')
);
