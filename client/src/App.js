import {BrowserRouter as Router,Route} from 'react-router-dom'
import PageRender from './PageRender';


function App() {
  return (
    <Router>
      <input type="checkbox" id="theme" />
    <div className="App">
      <Route exact path='/:page' component={PageRender} />
      <Route exact path='/:page/id' component={PageRender} />
    </div>
    </Router>
  );
}

export default App;
