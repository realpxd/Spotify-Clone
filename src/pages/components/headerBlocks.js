import React from 'react';
import Image from 'next/image';
import { useRef } from 'react';
import styles from '@/styles/Home.module.css'
import { wind } from 'fontawesome';

const HeaderBlocks = () => {
  const auData = [
    'artist1',
    'artist2',
    'artist3',
    'artist4',
    'artist5',
    'artist6'
  ];


  const audioBlocks = auData.map(data => {
    const handleThover = () => {
      main.style = `
        background-image: linear-gradient(to bottom,
        rgba(${Math.floor(Math.random(70) * 200) + 70}, 51, ${Math.floor(Math.random(70) * 200) + 20}, 0.622) -15%,
        rgba(21, 21, 21, 0.722) 13%,
        rgba(21, 21, 21, 0.722) 70vh);
        transition: 0.5s;
        `

      // window.onload = function () {
      //   document.getElementsByTagName("main")[0].style.backgroundColor = "red";

      // }
    }
    return (
      <>
        <div key={data} className={`${styles.blockCont}`}>




          <div className={`${styles.block}`} onMouseEnter={handleThover}>
            <Image style={{
              borderRadius: '0.5rem'
              , float: 'left', boxSizing: 'border-box', marginLeft: '0rem', marginRight: '1rem', boxShadow: '2px 0 black'
            }} className='blockImg' src={`/img/artists/${data}.jpg`} width='100' height='80' alt={data} loading='lazy'></Image>
            <h3>{data}</h3>

          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <style jsx>
        {`
      `}
      </style>
      <div className={`${styles.blockData}`}>
        {audioBlocks}
      </div>
    </>
  );
};

export default HeaderBlocks;
