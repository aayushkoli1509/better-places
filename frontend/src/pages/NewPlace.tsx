import '@styles/NewPlace.css';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@components/shared/Button';
import ErrorModal from '@components/shared/ErrorModal';
import ImageUpload from '@components/shared/ImageUpload';
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
      },
      image: {
        value: null,
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
    const formData = new FormData();
    formData.append('title', formState.inputs.title.value as string);
    formData.append(
      'description',
      formState.inputs.description.value as string
    );
    formData.append('address', formState.inputs.address.value as string);
    formData.append('image', formState.inputs.image.value as File);

    try {
      await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/places`,
        'POST',
        formData,
        {
          Authorization: `Bearer ${auth.token}`
        }
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
        <ImageUpload
          center
          id='image'
          onInput={inputHandler}
          errorText='Please provide an image.'
        />
        <Button type='submit' disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
