import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route
} from 'react-router-dom';

import NewPlace from '@places/pages/NewPlace';
import Users from '@user/pages/Users';
import Navigation from '@shared/components/Navigation';
import UserPlaces from '@places/pages/UserPlaces';

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
