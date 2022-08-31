import './index.css';

import React from 'react';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { ILocation } from '@types';

interface IProps {
  center: ILocation;
  zoom: number;
  className?: string;
  style?: React.CSSProperties;
}

const Map: React.FC<IProps> = ({ center, zoom, className, style }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    map.setZoom(zoom);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(_: google.maps.Map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName={`map ${className}`}
      mapContainerStyle={style}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        <Marker position={center} />
      </>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(Map);
