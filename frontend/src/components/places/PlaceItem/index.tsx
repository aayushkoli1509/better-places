import './index.css';

import { useContext, useState } from 'react';

import Button from '@components/shared/Button';
import Card from '@components/shared/Card';
import Map from '@components/shared/Map';
import Modal from '@components/shared/Modal';
import { AuthContext } from '@context/authContext';
import { ILocation } from '@types';

interface IProps {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creatorId: string;
  coordinates: ILocation;
}

const PlaceItem: React.FC<IProps> = ({
  id,
  image,
  title,
  description,
  address,
  creatorId,
  coordinates
}) => {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const auth = useContext(AuthContext);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteWarningHandler = () => setShowConfirmModal(false);

  const confirmDeleteHandler = () => {
    console.log('Deleting...');
    cancelDeleteWarningHandler();
  };

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClassName='place-item__modal-content'
        footerClassName='place-item__modal-actions'
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className='map-container'>
          <Map center={coordinates} zoom={14} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteWarningHandler}
        header='Are you sure?'
        footerClassName='place-item__modal-actions'
        footer={
          <>
            <Button inverse onClick={cancelDeleteWarningHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter
        </p>
      </Modal>
      <li className='place-item'>
        <Card className='place-item__content'>
          <div className='place-item__image'>
            <img src={image} alt={title} />
          </div>
          <div className='place-item__info'>
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className='place-item__actions'>
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && (
              <>
                <Button to={`/places/${id}`}>EDIT</Button>
                <Button danger onClick={showDeleteWarningHandler}>
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
