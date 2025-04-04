import { Router, Route } from "@solidjs/router";
import Homepage from "./components/Filesharing/Homepage";
import File from "./components/Filesharing/Filesharing";
import About from "./components/Filesharing/About";
import Syntaxia from "./components/Filesharing/Notes";

function App() {
  return (
    <Router>
      <Route path="/" component={Homepage} />
      <Route path="/filesharing" component={File} />
      <Route path="/about" component={About} />
      <Route path="/notes" component={Syntaxia} />
    </Router>
  );
}

export default App;
