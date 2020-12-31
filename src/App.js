import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from "./containers/Home/Home.js";
import DataTable from "./containers/DataTable/DataTable.js";
import Rules from "./containers/Rules/Rules.js";
import Navbar from "./components/Navbar/Navbar.js";

function App() {
  return (
    <div>
        <Router>
            <div>
                <Navbar/>
        <Switch>
            <Route exact component={Home} path="/"/>
            <Route path="/rules" component={Rules} />
        </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;
