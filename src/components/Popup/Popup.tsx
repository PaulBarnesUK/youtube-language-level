import React from 'react';
import styles from './Popup.module.scss';
import LanguageSettings from '../LanguageSettings';

const Popup: React.FC = () => {
  return (
    <div className={styles.popup}>
      <header className={styles.header}>
        <h1 className={styles.title}>YouTube Video Difficulty Rater</h1>
        <p className={styles.description}>
          Select languages to show difficulty ratings
        </p>
      </header>

      <main>
        <LanguageSettings />
      </main>

      <footer className={styles.footer}>
        <p>v1.0.0</p>
      </footer>
    </div>
  );
};

export default Popup; 