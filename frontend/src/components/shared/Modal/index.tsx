import './index.css';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Backdrop from '../Backdrop';

interface IModalOverlayProps {
  header: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  style?: React.CSSProperties;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ModalOverlay = ({
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  style,
  header,
  footer,
  children,
  onSubmit
}: IModalOverlayProps) => {
  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClassName}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : e => e.preventDefault()}>
        <div className={`modal__content ${contentClassName}`}>{children}</div>
        <footer className={`modal__footer ${footerClassName}`}>{footer}</footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook')!);
};

interface IModalProps extends IModalOverlayProps {
  show: boolean;
  onCancel: () => void;
}

const Modal = (props: IModalProps) => {
  const { show, onCancel } = props;
  return (
    <>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames='modal'
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
