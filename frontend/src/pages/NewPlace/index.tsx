import './index.css';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@components/shared/Button';
import ErrorModal from '@components/shared/ErrorModal';
import Input from '@components/shared/Input';
import LoadingSpinner from '@components/shared/LoadingSpinner';
import { AuthContext } from '@context/authContext';
import useForm from '@hooks/formHook';
import { useHttpClient } from '@hooks/httpHook';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '@utils/validators';

const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
    },
    false
  );
  const { sendRequest, clearError, error, isLoading } = useHttpClient();

  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const placeSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendRequest(
        'http://localhost:5000/api/places',
        'POST',
        {
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId
        },
        { 'Content-Type': 'application/json' }
      );
      navigate('/');
    } catch (err) {}
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <form className='place-form' onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          type='text'
          label='Title'
          id='title'
          element='input'
          errorText='Please enter a valid title.'
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          label='Description'
          id='description'
          element='textarea'
          errorText='Please enter a valid description (at least 5 characters).'
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
        />
        <Input
          label='Address'
          id='address'
          element='input'
          errorText='Please enter a valid address.'
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
