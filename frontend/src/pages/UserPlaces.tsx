import { useParams } from 'react-router-dom';

import { IPlace } from '@types';

import PlaceList from '../components/places/PlaceList';

const UserPlaces = () => {
  const PLACES: IPlace[] = [
    {
      id: 'p1',
      title: 'Mt. Yoshino',
      description:
        'UNESCO World Heritage site with thousands of cherry trees, ancient temples and pilgrimage routes.',
      imageURL:
        'https://media.cntraveler.com/photos/58d2c0a97e623821b9f3181d/master/w_1920%2Cc_limit/yoshinoyama--japan-GettyImages-488852217.jpg',
      address: 'Yoshinoyama, Yoshino, Yoshino District, Nara 639-3115, Japan',
      location: { lat: 34.357773537015, lng: 135.8704440224147 },
      creator: 'u1'
    },
    {
      id: 'p2',
      title: 'Ashikaga Flower Park',
      description:
        'Charming flower gardens offering 8 seasonal thematic displays & a spring wisteria festival.',
      imageURL:
        'https://media.cntraveler.com/photos/58d2b8c7ed5947303561e5f3/master/w_1920%2Cc_limit/ashikaga-flower-park-wisteria-GettyImages-473675978.jpg',
      address: 'Ashikaga Flower Park, Ashigaka, Japan',
      location: { lat: 36.31432898191364, lng: 139.52017240117095 },
      creator: 'u2'
    }
  ];

  const userId = useParams<{ userId: string }>().userId;
  const loadedPlaces = PLACES.filter(place => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
