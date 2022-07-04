import Button from '@shared/components/Button';
import Card from '@shared/components/Card';
import { ILocation } from '@shared/types';

import './index.css';

interface IProps {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creatorId: string;
  coordinates: ILocation;
}

const PlaceItem: React.FC<IProps> = ({
  id,
  image,
  title,
  description,
  address,
  creatorId,
  coordinates
}) => {
  return (
    <li className='place-item'>
      <Card className='place-item__content'>
        <div className='place-item__image'>
          <img src={image} alt={title} />
        </div>
        <div className='place-item__info'>
          <h2>{title}</h2>
          <h3>{address}</h3>
          <p>{description}</p>
        </div>
        <div className='place-item__actions'>
          <Button inverse>VIEW ON MAP</Button>
          <Button to={`places/${id}`}>EDIT</Button>
          <Button danger>DELETE</Button>
        </div>
      </Card>
    </li>
  );
};

export default PlaceItem;
