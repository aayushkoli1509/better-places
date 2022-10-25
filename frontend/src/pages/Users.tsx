import { useEffect, useState } from 'react';

import ErrorModal from '@components/shared/ErrorModal';
import LoadingSpinner from '@components/shared/LoadingSpinner';
import UsersList from '@components/users/UsersList';
import { useHttpClient } from '@hooks/httpHook';
import { IGetUsersResponse, IUser } from '@types';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } =
    useHttpClient<IGetUsersResponse>();
  const [loadedUsers, setLoadedUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users'
        );
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
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
