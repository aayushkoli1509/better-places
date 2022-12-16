import './index.css';

import { useEffect, useRef, useState } from 'react';

import Button from '../Button';

interface IProps {
  id: string;
  name: string;
  onInput: (id: 'image', file: File | null, isValid: boolean) => void;
  errorText: string;
  center?: boolean;
}

const ImageUpload: React.FC<IProps> = ({
  id,
  center,
  onInput,
  name,
  errorText
}) => {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current?.click();
  };

  const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile: File | null = null;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      console.log('in');
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(pickedFile);
    } else {
      console.log('No file picked');
      setIsValid(false);
      setIsTouched(true);
      fileIsValid = false;
    }
    onInput('image', pickedFile, fileIsValid);
  };

  console.log(isTouched);

  return (
    <div
      className={`form-control ${
        !isValid && isTouched && 'form-control--invalid'
      }`}
    >
      <input
        type='file'
        id={id}
        style={{ display: 'none' }}
        accept='.jpg,.png,.jpeg'
        ref={filePickerRef}
        onChange={pickedHandler}
        onClick={() => setIsTouched(true)}
      />
      <div className={`image-upload ${center && 'center'}`}>
        <div className='image-upload__preview'>
          {previewUrl ? (
            <img src={previewUrl} alt='Preview' />
          ) : (
            <p>Please pick an image.</p>
          )}
        </div>
        <Button type='button' onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
