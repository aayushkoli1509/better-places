import './index.css';

interface IProps {
  id: string;
  label: string;
  element: 'input' | 'textarea';
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  rows?: number;
}

const Input: React.FC<IProps> = ({
  id,
  label,
  element,
  type,
  placeholder,
  rows
}) => {
  const inputElement =
    element === 'input' ? (
      <input id={id} type={type} placeholder={placeholder} />
    ) : (
      <textarea id={id} rows={rows || 3} />
    );

  return (
    <div className={`form-control`}>
      <label htmlFor={id}>{label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
