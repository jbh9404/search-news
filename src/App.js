import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from './components/Login';
import Search from './components/Search';
import Header from './components/Header';
import Like from './components/Like';


function App() {
  return (
    <div className="App">
      <Router >
        <Header/>
        <Route path="/" exact component={Search} />
        <Route path="/login" exact component={Login} />
        <Route path="/like" exact component={Like} />
      </Router>
    </div>
  );
}

export default App;
