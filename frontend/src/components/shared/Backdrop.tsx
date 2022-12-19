import ReactDOM from 'react-dom';

import '@styles/Backdrop.css';

interface IProps {
  onClick: () => void;
}

const Backdrop = ({ onClick }: IProps) => {
  return ReactDOM.createPortal(
    <div className='backdrop' onClick={onClick}></div>,
    document.getElementById('backdrop-hook')!
  );
};

export default Backdrop;
