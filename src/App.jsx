import { Router, Route } from "@solidjs/router";
import Homepage from "./components/Filesharing/Homepage";
import File from "./components/Filesharing/Filesharing";
import About from "./components/Filesharing/About";

function App() {
  return (
    <Router>
      <Route path="/" component={Homepage} />
      <Route path="/filesharing" component={File} />
      <Route path="/about" component={About} />
    </Router>
  );
}

export default App;
