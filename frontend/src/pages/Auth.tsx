import styles from '@styles/Auth.module.css';

import { useContext, useState } from 'react';

import Button from '@components/shared/Button';
import Card from '@components/shared/Card';
import ErrorModal from '@components/shared/ErrorModal';
import ImageUpload from '@components/shared/ImageUpload';
import Input from '@components/shared/Input';
import LoadingSpinner from '@components/shared/LoadingSpinner';
import { AuthContext } from '@context/authContext';
import useForm from '@hooks/formHook';
import { useHttpClient } from '@hooks/httpHook';
import { IAuthResponse } from '@types';
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
  const { isLoading, error, sendRequest, clearError } =
    useHttpClient<IAuthResponse>();

  const auth = useContext(AuthContext);

  const authSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (isLoginMode) {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/users/login`,
          'POST',
          {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          },
          { 'Content-Type': 'application/json' }
        );
        auth.login(responseData.userId, responseData.token);
      } else {
        const formData = new FormData();
        formData.append('name', formState.inputs.name.value as string);
        formData.append('email', formState.inputs.email.value as string);
        formData.append('password', formState.inputs.password.value as string);
        formData.append('image', formState.inputs.image.value as File);
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/users/signup`,
          'POST',
          formData
        );
        auth.login(responseData.userId, responseData.token);
      }
    } catch (err) {}
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      const formData = { ...formState.inputs };
      delete formData.name;
      delete formData.image;
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
          },
          image: {
            value: null,
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
      <Card className={styles.authentication}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoginMode ? 'Login' : 'Signup'}</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <>
              <Input
                element='input'
                type='text'
                id='name'
                label='Your Name'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter a name.'
                onInput={inputHandler}
                placeholder='Rick Rollins'
              />
              <ImageUpload
                id='image'
                name={formState.inputs.name.value as string}
                onInput={inputHandler}
                errorText='Please provide an image'
                center
              />
            </>
          )}
          <Input
            type='email'
            label='Email'
            id='email'
            element='input'
            errorText='Please enter a valid email.'
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
            placeholder='rickroll@example.com'
          />
          <Input
            type='password'
            label='Password'
            id='password'
            element='input'
            errorText='Please enter a valid password (at least 6 characters).'
            validators={[VALIDATOR_MINLENGTH(6)]}
            onInput={inputHandler}
            placeholder='********'
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
