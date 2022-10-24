import Button from '../Button';
import Modal from '../Modal';

interface IProps {
  error: string;
  onClear: () => void;
}

const ErrorModal: React.FC<IProps> = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header='An Error Occurred!'
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
