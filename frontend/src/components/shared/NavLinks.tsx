import '@styles/NavLinks.css';

import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '@context/authContext';

const NavLinks = () => {
  const auth = useContext(AuthContext);
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/'>ALL USERS</NavLink>
      </li>
      {auth.isLoggedIn && (
        <>
          <li>
            <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
          </li>
          <li>
            <NavLink to='/places/new'>ADD PLACE</NavLink>
          </li>
        </>
      )}

      {!auth.isLoggedIn ? (
        <li>
          <NavLink to='/auth'>LOGIN/SIGNUP</NavLink>
        </li>
      ) : (
        <li>
          <NavLink to='/auth' onClick={auth.logout}>
            LOGOUT
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
