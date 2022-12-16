import { useCallback, useReducer } from 'react';

enum EFormActionType {
  INPUT_CHANGE = 'INPUT_CHANGE',
  TOUCH = 'TOUCH',
  SET_DATA = 'SET_DATA'
}

interface EFormAction {
  type: EFormActionType;
  inputId?: 'title' | 'description' | 'address' | 'image';
  isValid?: boolean;
  value?: string | File | null;
  inputs?: TInputs;
  formIsValid?: boolean;
  // validators?: IValidator[];
}

interface IFormState {
  inputs: {
    [key: string]: {
      value: string | null | File;
      isValid: boolean;
    };
  };
  isValid: boolean;
}

const formReducer = (state: IFormState, action: EFormAction): IFormState => {
  switch (action.type) {
    case EFormActionType.INPUT_CHANGE:
      let isFormValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          isFormValid = isFormValid && action.isValid!;
        } else {
          isFormValid =
            isFormValid &&
            state.inputs[
              inputId as 'title' | 'description' | 'address' | 'image'
            ].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId!]: { value: action.value!, isValid: action.isValid! }
        },
        isValid: isFormValid
      };
    case EFormActionType.SET_DATA:
      return {
        inputs: action.inputs!,
        isValid: action.formIsValid!
      };
    default:
      return state;
  }
};

type TInputs = {
  [key: string]: {
    value: string | null | File;
    isValid: boolean;
  };
};

const useForm = (initialInputs: TInputs, initialFormValidity: boolean) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
  });

  const inputHandler = useCallback(
    (
      id: 'title' | 'description' | 'address' | 'image',
      value: string | File | null,
      isValid: boolean
    ) => {
      dispatch({
        type: EFormActionType.INPUT_CHANGE,
        inputId: id,
        value,
        isValid
      });
    },
    []
  );

  const setFormData = useCallback(
    (inputData: TInputs, formValidity: boolean) => {
      dispatch({
        type: EFormActionType.SET_DATA,
        inputs: inputData,
        formIsValid: formValidity
      });
    },
    []
  );

  return [formState, inputHandler, setFormData] as const;
};

export default useForm;
