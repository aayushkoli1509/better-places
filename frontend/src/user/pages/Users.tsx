import { IUser } from '@shared/types';
import UsersList from '../components/UsersList';

const Users = () => {
  const USERS: IUser[] = [
    {
      id: 'u1',
      name: 'Mubin',
      image: 'https://avatars.githubusercontent.com/u/48734821?v=4',
      places: 3
    }
  ];
  return <UsersList items={USERS} />;
};

export default Users;
