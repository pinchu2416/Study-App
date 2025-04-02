/* @refresh reload */
import { render } from 'solid-js/web';


import "./styles/global.css";
import { Route, Router } from '@solidjs/router';
import File from './components/Filesharing/Filesharing';
import Homepage from './components/Filesharing/Homepage';
import About from './components/Filesharing/About';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => <Router>
  <Route path="/" component={Homepage}/>
  <Route path="/filesharing" component={File}/>
  <Route path="/about" component={About} />
</Router>
, root);
