import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "page/home";
import Infinite from "page/infinite";
import Detail from "page/character";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/infinite" component={Infinite} />
        <Route exact path="/character/:id" component={Detail} />
      </Switch>
    </Router>
  );
}

export default App;
