import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import PostDetail from './components/PostDetail';
function App() {
  return (
    <Router>
      <div className="App">

        {/* Routes for different pages */}
        <Routes>
          {/* Route for SignIn page */}
          <Route path="/signin" element={<SignIn />} />

          {/* Route for SignUp page */}
          <Route path="/signup" element={<SignUp />} />

          {/* Route for MainPage (Home) */}
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
