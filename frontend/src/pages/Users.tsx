import axios from 'axios';
import { useEffect, useState } from 'react';

import ErrorModal from '@components/shared/ErrorModal';
import LoadingSpinner from '@components/shared/LoadingSpinner';
import { IGetUsersResponse, IUser } from '@types';

import UsersList from '../components/users/UsersList';

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [loadedUsers, setLoadedUsers] = useState<IUser[]>([]);
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<IGetUsersResponse>(
          'http://localhost:5000/api/users'
        );
        const responseData = response.data;
        setLoadedUsers(responseData.users);
      } catch (_err) {
        const err = _err as { response: { data: { message?: string } } };
        setError(
          err?.response.data.message! ||
            'Something went wrong, please try again.'
        );
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);
  return (
    <>
      {error && <ErrorModal error={error} onClear={() => setError(null)} />}
      {isLoading || !loadedUsers ? (
        <div className='center'>
          <LoadingSpinner />
        </div>
      ) : (
        <UsersList items={loadedUsers} />
      )}
    </>
  );
};

export default Users;
