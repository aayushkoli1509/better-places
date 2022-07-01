import UserItem from '../UserItem';

import { IUser } from '@shared/types';

import './index.css';

interface IProps {
  items: IUser[];
}

const UsersList = ({ items }: IProps) => {
  if (items.length === 0) {
    return (
      <div>
        <h2>No users found.</h2>
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
            placeCount={user.places}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;
