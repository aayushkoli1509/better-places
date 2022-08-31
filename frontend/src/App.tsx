import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';

import Navigation from '@components/shared/Navigation';
import NewPlace from '@pages/NewPlace';
import UserPlaces from '@pages/UserPlaces';
import Users from '@pages/Users';

const App = () => {
  return (
    <Router>
      <Navigation />
      <main>
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/places/new' element={<NewPlace />} />
          <Route path='/:userId/places' element={<UserPlaces />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
