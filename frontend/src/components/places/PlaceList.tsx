import '@styles/PlaceList.css';

import Card from '@components/shared/Card';
import { IPlace } from '@types';

import Button from '../shared/Button';
import PlaceItem from './PlaceItem';

interface IProps {
  items: IPlace[];
  onDeletePlace: (placeId: string) => void;
}

const PlaceList: React.FC<IProps> = ({ items, onDeletePlace }) => {
  if (items.length === 0) {
    return (
      <div className='place-list center'>
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to='/places/new'>Share Place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className='place-list'>
      {items.map(place => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageURL}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
