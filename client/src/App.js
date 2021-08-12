import {BrowserRouter as Router,Route} from 'react-router-dom'
import PageRender from './PageRender';
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import { useSelector } from 'react-redux'
import Header from './pages/Header';
import './styles/global.css';

function App() {
  const { auth} = useSelector(state => state)
  return (
    <Router>
      <input type="checkbox" id="theme" />
    <div className="App">
      {auth.token && <Header/>}
      <Route exact path="/" component={auth.token ? Home : Login} />
      <Route exact path='/:page' component={PageRender} />
      <Route exact path='/:page/id' component={PageRender} />
    </div>
    </Router>
  );
}

export default App;
