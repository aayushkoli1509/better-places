import '@styles/Input.css';
import { IValidator } from '@types';
import { validate } from '@utils/validators';
import { useEffect, useReducer } from 'react';

interface IProps {
  id: string;
  label: string;
  element: 'input' | 'textarea';
  errorText: string;
  validators: IValidator[];
  onInput: Function;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  rows?: number;
  initialValid?: boolean;
  initialValue?: string;
}

enum EInputActionType {
  CHANGE = 'CHANGE',
  TOUCH = 'TOUCH'
}

interface EInputAction {
  type: EInputActionType;
  value?: string;
  validators?: IValidator[];
}

interface IInputState {
  value: string;
  isValid: boolean;
  isTouched: boolean;
}

const inputReducer = (
  state: IInputState,
  action: EInputAction
): IInputState => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value!,
        isValid: validate(action.value!, action.validators!)
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true
      };
    default:
      return state;
  }
};

const Input: React.FC<IProps> = ({
  id,
  label,
  element,
  type,
  validators,
  onInput,
  errorText,
  placeholder,
  rows,
  initialValid,
  initialValue
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    isValid: initialValid || false,
    isTouched: false
  });

  const { isValid, value } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [value, isValid, id, onInput]);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: EInputActionType.CHANGE,
      value: e.target.value,
      validators: validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: EInputActionType.TOUCH
    });
  };

  const inputElement =
    element === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {inputElement}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
