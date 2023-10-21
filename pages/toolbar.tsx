import React from "react";
import styles from "../styles/Toolbar.module.css";

interface ToolbarProps {
  onSearch: (query: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onSearch }) => {
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
      </div>
    </div>
  );
};

export default Toolbar;
