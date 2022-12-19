import '@styles/Card.css';

interface IProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Card = (props: IProps) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
