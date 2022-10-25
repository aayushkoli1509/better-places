import './Auth.css';

import axios from 'axios';
import { useContext, useState } from 'react';

import Button from '@components/shared/Button';
import Card from '@components/shared/Card';
import ErrorModal from '@components/shared/ErrorModal';
import Input from '@components/shared/Input';
import LoadingSpinner from '@components/shared/LoadingSpinner';
import { AuthContext } from '@context/authContext';
import useForm from '@hooks/formHook';
import { useHttpClient } from '@hooks/httpHook';
import { ILoginResponse, ISignUpResponse } from '@types';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '@utils/validators';

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
  const { isLoading, error, sendRequest, clearError } = useHttpClient<
    ILoginResponse | ISignUpResponse
  >();

  const auth = useContext(AuthContext);

  const authSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (isLoginMode) {
        await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          },
          { 'Content-Type': 'application/json' }
        );
        auth.login();
      } else {
        await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          {
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          },
          { 'Content-Type': 'application/json' }
        );
        auth.login();
      }
    } catch (err) {}
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
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <Card className='authentication'>
        {isLoading && <LoadingSpinner asOverlay />}
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
          <Button disabled={!formState.isValid} type='submit'>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
