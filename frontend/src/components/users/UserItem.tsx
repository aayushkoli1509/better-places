import '@styles/UserItem.css';

import { Link } from 'react-router-dom';

import Avatar from '@components/shared/Avatar';
import Card from '@components/shared/Card';

interface IProps {
  id: string;
  name: string;
  image: string;
  placeCount: number;
}

const UserItem = ({ id, name, image, placeCount }: IProps) => {
  return (
    <li className='user-item'>
      <Card className='user-item__content'>
        <Link to={`/${id}/places`}>
          <div className='user-item__image'>
            <Avatar
              image={`${import.meta.env.VITE_ASSETS_URL}/${image}`}
              alt={image}
            />
          </div>
          <div className='user-item__info'>
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
