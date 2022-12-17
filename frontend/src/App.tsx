import { useCallback, useState } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
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
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback((uid: string, token: string) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  let routes;

  if (token) {
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
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, userId, token, login, logout }}
    >
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
