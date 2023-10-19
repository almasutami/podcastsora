import React from "react";
import styles from "../styles/Toolbar.module.css";
import { useEffect, useState } from "react";

interface ToolbarProps {
  onSearch: (query: string) => void;
  userAvatarSrc: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ onSearch, userAvatarSrc }) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.brand}>
        {/* Website Logo */}
        <img className={styles.logo} src="/logo.png" alt="Website Logo" />

        <div className={styles.brandName}>
          <h2>Podcastsora</h2>
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

      {/* User Avatar */}
      <img className={styles.avatar} src={userAvatarSrc} alt="User Avatar" />
    </div>
  );
};

export default Toolbar;
