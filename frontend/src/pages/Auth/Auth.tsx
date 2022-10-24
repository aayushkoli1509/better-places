import './Auth.css';

import axios from 'axios';
import { useContext, useState } from 'react';

import Button from '@components/shared/Button';
import Card from '@components/shared/Card';
import Input from '@components/shared/Input';
import { AuthContext } from '@context/authContext';
import useForm from '@hooks/formHook';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '@utils/validators';

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

  const auth = useContext(AuthContext);

  const authSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isLoginMode) {
    } else {
      const response = await axios.post<{
        message?: string;
        user?: {
          name: string;
          email: string;
          password: string;
          image: string;
          places: any[];
          id: string;
        };
      }>(
        'http://localhost:5000/api/users/signup',
        {
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const responseData = response.data;
    }

    auth.login();
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
        <Button disabled={!formState.isValid} type='submit'>
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
