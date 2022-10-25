import { useCallback, useState } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';

import Navigation from '@components/shared/Navigation';
import { AuthContext } from '@context/authContext';
import Auth from '@pages/Auth/Auth';
import NewPlace from '@pages/NewPlace';
import UpdatePlace from '@pages/UpdatePlace';
import UserPlaces from '@pages/UserPlaces';
import Users from '@pages/Users';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback((uid: string) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <>
        <Route path='/' element={<Users />} />
        <Route path='/:userId/places' element={<UserPlaces />} />
        <Route path='/places/new' element={<NewPlace />} />
        <Route path='/places/:placeId' element={<UpdatePlace />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path='/' element={<Users />} />
        <Route path='/:userId/places' element={<UserPlaces />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='*' element={<Navigate to='/auth' replace />} />
      </>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      <Router>
        <Navigation />
        <main>
          <Routes>{routes}</Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
