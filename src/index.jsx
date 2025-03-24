/* @refresh reload */
import { render } from 'solid-js/web';


import "./styles/global.css";
import { Route, Router } from '@solidjs/router';
import HomePage from './components/Home/Home';
import About from './components/Home/About';
import Login from "./components/Login/Login";

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => <Router>
  <Route path="/about" component={About}/>
  <Route path="/" component={HomePage}/>
  <Route path="/login" component={Login} />
</Router>
, root);
