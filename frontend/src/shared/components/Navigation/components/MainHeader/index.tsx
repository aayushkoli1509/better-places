import './index.css';

interface IProps {
  children: React.ReactNode;
}

const MainHeader = ({ children }: IProps) => {
  return <header className='main-header'>{children}</header>;
};

export default MainHeader;
