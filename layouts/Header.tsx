import React from "react";
import styles from '@/styles/Home.module.scss'
import Image from 'next/image'

const Header = () => {

  return (
    <header>
        <div className={styles.heroFondo}>
        <Image
           className={styles.b21Icon}
            src="/hero.png"
            alt="Hero"
            width={1440}
            height={741}
            priority
          />
        <div className={styles.heroFondoChild} />
      </div>
      <div className={styles.elSecretoDeTuCocinaWrapper}>
        <b className={styles.elSecretoDeContainer}>
          <span className={styles.elSecretoDeContainer1}>
            <p className={styles.blankLine}>El secreto</p>
            <p className={styles.blankLine}>de tu cocina</p>
          </span>
        </b>
      </div>
      </header> 
  );
};

export default Header;