import '@styles/UsersList.css';

import Card from '@components/shared/Card';
import { IUser } from '@types';

import UserItem from './UserItem';

interface IProps {
  items: IUser[];
}

const UsersList = ({ items }: IProps) => {
  if (items.length === 0) {
    return (
      <div className='center'>
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className='users-list'>
      {items.map(user => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.places.length}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;
