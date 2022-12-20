import '@styles/LoadingSpinner.css';

interface IProps {
  asOverlay?: boolean;
}

const LoadingSpinner: React.FC<IProps> = props => {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className='lds-dual-ring'></div>
    </div>
  );
};

export default LoadingSpinner;
