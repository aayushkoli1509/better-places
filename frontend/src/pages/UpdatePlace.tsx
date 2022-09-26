import Button from '@components/shared/Button';
import Card from '@components/shared/Card';
import Input from '@components/shared/Input';
import useForm from '@hooks/formHook';
import { IPlace } from '@types';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '@utils/validators';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './NewPlace/index.css';

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

const UpdatePlace = () => {
  const placeId = useParams<{ placeId: string }>().placeId;
  const [isLoading, setIsLoading] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const identifiedPlace = PLACES.find(place => place.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true
          },
          description: {
            value: identifiedPlace.description,
            isValid: true
          }
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='center'>
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
      <Input
        id='title'
        element='input'
        label='Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid text.'
        type='text'
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description (min 5 characters).'
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Button type='submit' disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
