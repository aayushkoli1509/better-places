import './Auth.css';
import Input from '@components/shared/Input';
import useForm from '@hooks/formHook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '@utils/validators';
import Card from '@components/shared/Card';
import Button from '@components/shared/Button';
import { useState } from 'react';

const Auth = () => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );
  const [isLoginMode, setIsLoginMode] = useState(true);

  const authSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState.inputs); // Send this to the backend!
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      const formData = { ...formState.inputs };
      delete formData.name;
      setFormData(
        formData,
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  return (
    <Card className='authentication'>
      <h2>{isLoginMode ? 'Login' : 'Signup'}</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element='input'
            type='text'
            id='name'
            label='Your Name'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a name.'
            onInput={inputHandler}
          />
        )}
        <Input
          type='email'
          label='Email'
          id='email'
          element='input'
          errorText='Please enter a valid email.'
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
        />
        <Input
          type='password'
          label='Password'
          id='password'
          element='input'
          errorText='Please enter a valid password (at least 6 characters).'
          validators={[VALIDATOR_MINLENGTH(6)]}
          onInput={inputHandler}
        />
        <Button disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
  );
};

export default Auth;
