import logo from './logo.svg';
import './App.css';
import HomePage from './components/home/HomePage.js';
import NavBar from './components/NavBar.js';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <HomePage/>
    </div>
  );
}

export default App;
