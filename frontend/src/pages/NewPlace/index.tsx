import './index.css';

import Input from '@components/shared/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '@utils/validators';
import { useCallback, useReducer } from 'react';
import Button from '@components/shared/Button';
import useForm from '@hooks/formHook';

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

  const placeSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState.inputs); // Send this to the backend!
  };

  return (
    <form className='place-form' onSubmit={placeSubmitHandler}>
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
  );
};

export default NewPlace;
