import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';

import LoadingSpinner from '@components/shared/LoadingSpinner';
import Navigation from '@components/shared/Navigation';
import { AuthContext } from '@context/authContext';
import { useAuth } from '@hooks/authHook';
import { Suspense, lazy } from 'react';

const Users = lazy(() => import('@pages/Users'));
const UserPlaces = lazy(() => import('@pages/UserPlaces'));
const UpdatePlace = lazy(() => import('@pages/UpdatePlace'));
const NewPlace = lazy(() => import('@pages/NewPlace'));
const Auth = lazy(() => import('@pages/Auth'));

const App = () => {
  const { token, login, logout, userId } = useAuth();
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
          <Suspense
            fallback={
              <div className='center'>
                <LoadingSpinner />
              </div>
            }
          >
            <Routes>{routes}</Routes>
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
