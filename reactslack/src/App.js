import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/login';
import Home from './Components/Home/Home'; // Import your Home component
import { Container } from 'reactstrap';
import Rightsidebar from './Components/RightSidebar/RightSidebar';
import Sidebar from './Components/Sidebar/sidebar';
import MainComponent from './Components/MainComponent/MainComponent';

function App() {
  return (
    <Router>
      {/* <channels /> */}
      <Container>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<MainComponent />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
