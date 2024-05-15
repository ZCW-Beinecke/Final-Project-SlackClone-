import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/login';
import Home from './Components/Home/Home'; // Import your Home component
import { Container } from 'reactstrap';
import Rightsidebar from './Components/RightSidebar/RightSidebar';
import Sidebar from './Components/Sidebar/sidebar';
import SearchBar from './Components/SearchBar/Searchbar';
import './App.css';

function MainUI() {
  const handleSearch = term => {
    // Implement your logic for handling user search here
    console.log('Search term:', term);
  };

  return (
    <div className="container">
      {' '}
      {/* Wrap your entire app content */}
      <Router>
        <Rightsidebar />
        <Sidebar />
        {/* <channels /> */}
        <SearchBar onSearch={handleSearch} />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Route for Home component */}
            <Route path="/login" element={<Login />} /> {/* Login page as first screen*/}
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default MainUI;
