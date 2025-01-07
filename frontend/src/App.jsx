import { Routes, Route } from 'react-router-dom';
import Userlogin from './pages/Userlogin';
import Usersignup from './pages/Usersignup';
import Captainlogin from './pages/Captainlogin';
import Captainsignup from './pages/Captainsignup';
import Start from './pages/Start';
import Home from './pages/Home';
import UserProtectedWrapper from './pages/UserProtectedWrapper'; // Fixed naming
import UserLogout from './pages/UserLogout';
import CaptainHome from './pages/CaptainHome';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Userlogin />} />
        <Route path="/signup" element={<Usersignup />} />
        <Route path="/captain-login" element={<Captainlogin />} />
        <Route path="/captain-signup" element={<Captainsignup />} />
        
        {/* Protected Route for Home */}
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />

        {/* Logout Route */}
        <Route path="/user/logout" 
        element={<UserProtectedWrapper>
           {<UserLogout />} 
        </UserProtectedWrapper>
        }
        />
        <Route path = '/captain-home' element = {<CaptainHome/>} />
      </Routes>
      
    </div>
  );
};

export default App;
