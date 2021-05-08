import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "page/home";
import Infinite from "page/infinite";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/infinite" component={Infinite} />
      </Switch>
    </Router>
  );
}

export default App;
