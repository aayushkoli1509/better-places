import Card from '@shared/components/Card';
import { IPlace } from '@shared/types';
import PlaceItem from '../PlaceItem';

import './index.css';

interface IProps {
  items: IPlace[];
}

const PlaceList: React.FC<IProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div>
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <button>Share Place</button>
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
        />
      ))}
    </ul>
  );
};

export default PlaceList;
