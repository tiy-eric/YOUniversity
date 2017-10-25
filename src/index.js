//stuff that comes with the base app
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//Routing and redux imports
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

//Import of our reducers.
//the reducers put the data in the store
import reducer from './reducers'

//Import our components
import Home from './components/Home'
import RegisterContainer from "./containers/Register";
import SearchResultsContainer from "./containers/SearchResults";
import EditUserContainer from "./containers/EditUser";
import SchoolDetailsContainer from "./containers/SchoolDetails";
import FavoriteList from "./containers/FavoriteList"

//create the store with our reducers
let store = createStore(reducer, applyMiddleware(thunk))

//keep our routing history synced with the store
const history = syncHistoryWithStore(browserHistory, store)

//render the default application
ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/register" component={RegisterContainer} />
            <Route path="/searchresults" component={SearchResultsContainer} />
            <Route path="/edituser" component={EditUserContainer} />
            <Route path="/favoritelist" component={FavoriteList} />
            <Route path="schooldetails/:id" component={SchoolDetailsContainer}/>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
