import './index.css';

import Input from '@components/shared/Input';

const NewPlace = () => {
  return (
    <form className='place-form'>
      <Input type='text' label='Title' id='title' element='input' />
    </form>
  );
};

export default NewPlace;
