import '@styles/PlaceItem.css';

import { useContext, useState } from 'react';

import Button from '@components/shared/Button';
import Card from '@components/shared/Card';
import ErrorModal from '@components/shared/ErrorModal';
import LoadingSpinner from '@components/shared/LoadingSpinner';
import Map from '@components/shared/Map';
import { AuthContext } from '@context/authContext';
import { useHttpClient } from '@hooks/httpHook';
import { ILocation } from '@types';
import Modal from '../../Modal';

interface IProps {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creatorId: string;
  coordinates: ILocation;
  onDelete: (pid: string) => void;
}

const PlaceItem: React.FC<IProps> = ({
  id,
  image,
  title,
  description,
  address,
  creatorId,
  coordinates,
  onDelete
}) => {
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const auth = useContext(AuthContext);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteWarningHandler = () => setShowConfirmModal(false);

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/places/${id}`,
        'DELETE',
        null,
        { Authorization: `Bearer ${auth.token}` }
      );
      onDelete(id);
    } catch (err) {}
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
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
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='place-item__image'>
            <img
              src={`${import.meta.env.VITE_ASSETS_URL}/${image}`}
              alt={title}
            />
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
            {auth.isLoggedIn && creatorId === auth.userId && (
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
