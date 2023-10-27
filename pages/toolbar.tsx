import { use, useEffect, useState } from "react";
import styles from "../styles/Toolbar.module.css";

interface LocationListResponse {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}
interface ToolbarProps {
  onSearch: (query: string) => void;
  onLocationSelect: (locationLatLong: string) => void;
  locationList: Array<LocationListResponse>;
  locationListLoading: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onSearch,
  onLocationSelect,
  locationList,
  locationListLoading,
}) => {
  const [locationSelected, setLocationSelected] = useState(false);

  const renderLocationList = (locationList: Array<LocationListResponse>) => {
    return locationList.map((location) => {
      return (
        <div
          key={location.id}
          onClick={() => handleLocationSelect(location.lat, location.lon)}
        >
          <div className={styles.locationRow}>
            <div className={styles.locationLatLong}>{location.name}</div>
            <div className={styles.locationRegion}>
              {location.region}, {location.country}
            </div>
          </div>
        </div>
      );
    });
  };

  const renderLocationListLoading = () => {
    return <div className={styles.locationRow}>Loading...</div>;
  };

  const handleLocationSelect = (latitude: number, longitude: number) => {
    const locationLatLong = `${latitude},${longitude}`;
    onLocationSelect(locationLatLong);
    setLocationSelected(true);
  };

  useEffect(() => {
    if (locationList) {
      setLocationSelected(false);
    }
  }, [locationList]);

  return (
    <div className={styles.toolbar}>
      <div className={styles.brand}>
        {/* Website Logo */}
        <img className={styles.logo} src="/logo.png" alt="Website Logo" />

        <div className={styles.brandName}>
          <p>podcastsora</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Type your location..."
          onChange={(e) => onSearch(e.target.value)}
        />
        <div className={styles.locationList}>
          {locationSelected === false && locationListLoading === false
            ? renderLocationList(locationList)
            : locationListLoading === false
            ? null
            : renderLocationListLoading()}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
