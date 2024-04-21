import logo from './logo.svg';
import './App.css';
import HomePage from './components/home/HomePage.js';
import NavBar from './components/NavBar.js';
import SignIn from './components/signin/SignIn.js';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <SignIn/>
      {/* <HomePage/> */}
    </div>
  );
}

export default App;
