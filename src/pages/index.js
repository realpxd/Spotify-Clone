import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState, useRef } from 'react'
import Link from 'next/link'
import HeaderBlocks from './components/headerBlocks'
import JumpBackIn from './components/jumpBackIn'
import RecentlyPlayed from './components/recentlyPlayed'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import Temp from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const curRange = useRef(null);
  const volRange = useRef(null);
  const audioRef = useRef(null);
  const playBtn = useRef(null);
  let currentSongFile, songsQueue = [];

  const greetTime = () => {
    let date = new Date();
    let hour = date.getHours();
    if (hour >= 0 && hour < 12) {
      return (
      <> <span>Morning</span> </>
      );
    } else if (hour >= 12 && hour < 16) {
      return (
      <> <span>Afternoon</span> </>
      );
    } else if (hour >= 16 && hour < 20) {
      return (
      <> <span>Evening</span> </>
      );
    } else {
      return (
      <> <span> Potato</span> </>
      );
    }
  }


  const searchAndPlay = (curr, queue, currIndex) => {
    console.log(curr);
    audioRef.current.src = `/songs/${curr}.mp3`;
    audioRef.current.play();
    playBtn.current.classList.remove('fa-play-circle');
    playBtn.current.classList.add('fa-pause-circle');

    audioRef.current.addEventListener('timeupdate', () => {
      const curTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      curRange.current.value = (curTime / duration) * 100;
    })
    audioRef.current.addEventListener('ended', () => {
      nextSong();
    })

    curRange.current.addEventListener('change', () => {
      // const curTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      audioRef.current.currentTime = (curRange.current.value * duration) / 100;
    })
    volRange.current.addEventListener('change', () => {
      audioRef.current.volume = volRange.current.value / 100;
    })

    currentSongFile = currIndex;
    songsQueue = queue;
    console.log("local : " + songsQueue);
    return currentSongFile, songsQueue;



  }

  const prevSong = () => {
    if (songsQueue[currentSongFile] == undefined || songsQueue[currentSongFile] == null || songsQueue[currentSongFile] == 0) {
      // console.log(currentSongFile);
      // currentSongFile = 1;
      // console.log(currentSongFile);
      return;
    }
    let prevSongFileIndex = songsQueue[currentSongFile - 1];
    audioRef.current.src = `/songs/${prevSongFileIndex}.mp3`;
    audioRef.current.play();
    currentSongFile--;
  }

  const curSong = () => {
    if (audioRef.current.src == undefined || audioRef.current.src == null || audioRef.current.src == 0) {
      return;
    }
    if (audioRef.current.paused) {
      audioRef.current.play();
      playBtn.current.classList.remove('fa-play-circle');
      playBtn.current.classList.add('fa-pause-circle');
    } else {
      audioRef.current.pause();
      playBtn.current.classList.remove('fa-pause-circle');
      playBtn.current.classList.add('fa-play-circle');
    }
  }

  const nextSong = () => {
    if (songsQueue[currentSongFile] == undefined || songsQueue[currentSongFile] == null || songsQueue[currentSongFile] == 0) {
      // currentSongFile = songsQueue.length - 2;
      return;
    }
    let nextSongFileIndex = songsQueue[currentSongFile + 1];
    audioRef.current.src = `/songs/${nextSongFileIndex}.mp3`;
    audioRef.current.play();
    currentSongFile++;
  }



  return (
    <>
      <Head>
        <title>Spotify Clone</title>
        <meta name='description' content='Spotify Clone by ProgrammerXD' />
        <meta name='viewport' content='width=device-width, initial-scale=1 , maximum-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        
      </Head>
      <main className={styles.main}>

        <div className={`${styles.containers} ${styles.cA}`}>
          <h1>Good {greetTime()} !</h1>
          <HeaderBlocks />
        </div>
        <div className={`${styles.containers} ${styles.cB}`}>
          <h2>Recently Played <span className={styles.playlistTitle}> - Playlist Name : Devotional 🍁✨</span></h2>
          <JumpBackIn sap={searchAndPlay} />
        </div>


        <div className={`${styles.containers} ${styles.cC}`}>
          <h2>Jump back In <span className={styles.playlistTitle}> - Playlist Name : XXXTENXTACION 👀</span></h2>
          <RecentlyPlayed sap={searchAndPlay} />
        </div> <br /><br /><br />



        <div className={`${styles.containerMusic} ${styles.cMusic}`}>
          <div className={styles.songData}>
            <Image src={`/img/playlist2/changes.webp`} width={50} height={50}></Image>
            <h3>Song Name</h3>
          </div>

          <div className={styles.songControls}>
            <div className={styles.controlTop}>
              <button><i class="fa fa-random" aria-hidden="true"></i></button>
              <button onClick={prevSong}><i className='fa fa-step-backward'></i></button>
              <button onClick={curSong}><i ref={playBtn} className='fa fa-play-circle'></i></button>
              <button onClick={nextSong}><i className='fa fa-step-forward'></i></button>
              <button><i class="fa fa-repeat" aria-hidden="true"></i></button>
              <audio ref={audioRef} src="./audio/audio.mp3" />
              {/* <FontAwesomeIcon icon="fa fa-coffee" />
              <FontAwesomeIcon icon="fa-sharp fa-solid fa-hat-chef" />
              <FontAwesomeIcon icon="fa-thin fa-hat-cowboy" />
              <FontAwesomeIcon icon={faEnvelope} */}
            </div>
            <input ref={curRange} type="range" name="" id="" />
          </div>

          <div className={styles.controlsRight}>
            <i class="fa fa-volume-up" aria-hidden="true"></i>
            <input ref={volRange} type="range" name="" id="" />
          </div>
        </div>
      </main>
    </>
  )
}
