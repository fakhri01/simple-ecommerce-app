import CartProducts from './Assets/components/Cart';
import Home from './Assets/components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/cart' component={CartProducts} />
        </Switch>
      </div>

    </Router >
  );
}

export default App;
