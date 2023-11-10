import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header';
import React, { useEffect, useState } from 'react';
import { getFilteredResults } from './api/filters';
import Loading from '../components/Loading';

const inter = Inter({ subsets: ['latin'] });
export default function Home() {
  const [selectedItem, setSelectedItem] = useState('consejos');
  const [resultData, setResultData] = useState<
    Array<{ id: number; title: string; content: string; url: string; image: string }>
  >([]);
  const [shouldLoadAnimation, setShouldLoadAnimation] = useState(false);

  useEffect(() => {
    handleNavItemClick(selectedItem);
  }, []);

  const handleNavItemClick = async (item: string) => {
    try {
      setShouldLoadAnimation(true);
      const data = await getFilteredResults(item);
      setSelectedItem(item);
      setResultData(data);
    } catch (error) {
      console.error(`Error al obtener los resultados para "${item}":`, error);
    } finally {
      setShouldLoadAnimation(false);
    }
  };

  const handleListItemClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (target && target.tagName === 'B' && target.textContent) {
      const itemText = target.textContent;
      handleNavItemClick(itemText);
    }
  };

  useEffect(() => {
    const list = document.querySelector('.menuList');
    if (list) {
      list.addEventListener('click', handleListItemClick as EventListener);
    }
    return () => {
      if (list) {
        list.removeEventListener('click', handleListItemClick as EventListener);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnimationHide = () => {
  };

  return (
    <>
      <Head>
        <title>Next App</title>
        <meta name="description" content="Test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.ejercicioFrontEnd}>
          <div className={styles.ejercicioFrontEndChild} />
          <Header />

          <div className={styles.ejercicioFrontEndItem} />
          <Loading shouldLoadAnimation={shouldLoadAnimation} onHideAnimation={handleAnimationHide} />
          <div className={styles.pageContainer}>
            <div className={styles.articlesContainer}>
              {resultData.map((item) => (
                <div key={item.id} className={styles.cardBody}>
                  <a href={item.url} className={styles.link}>
                    <Image
                      className={styles.groupChild}
                      src={item.image}
                      alt={item.title}
                      width={270}
                      height={204}
                      priority
                    />
                    <b className={styles.cardTitle}>{item.title}</b>
                    <div className={styles.descriptionCard}>{item.content}</div>
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          <nav className={styles.todosProductosRecetasContainer}>
            <ul className={styles.menuList}>
              <li>
                <button
                  className={`${styles.linkButton} ${selectedItem === 'todos' ? styles.selected : ''}`}
                  onClick={() => handleNavItemClick('')}
                >
                  <b>todos</b>
                </button>
              </li>
              <li>
                <button
                  className={`${styles.linkButton} ${selectedItem === 'Productos' ? styles.selected : ''}`}
                  onClick={() => handleNavItemClick('Productos')}
                >
                  <b>Productos</b>
                </button>
              </li>
              <li>
                <button
                  className={`${styles.linkButton} ${selectedItem === 'recetas' ? styles.selected : ''}`}
                  onClick={() => handleNavItemClick('recetas')}
                >
                  <b>recetas</b>
                </button>
              </li>
              <li>
                <button
                  className={`${styles.linkButton} ${selectedItem === 'consejos' ? styles.selected : ''}`}
                  onClick={() => handleNavItemClick('consejos')}
                >
                  <b>consejos</b>
                </button>
              </li>
            </ul>
          </nav>
<div className={styles.foot}><Footer /></div>   
        </div>
      </main>
    </>
  );
}
