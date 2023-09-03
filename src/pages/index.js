import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState, useRef } from 'react';

import Link from 'next/link'
import HeaderBlocks from './components/headerBlocks.js'
import JumpBackIn from './components/RecentlyPlayed.js'
import RecentlyPlayed from './components/JumpBackIn.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from "next/router";
// import Temp from './components/Header'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // const [conImgSrc, setConImgSrc] = useState(`/img/bg1.jpg`); // Provide a default image source

  const main = useRef(null);
  const curRange = useRef(null);
  const volRange = useRef(null);
  const audioRef = useRef(null);
  const playBtn = useRef(null);
  const conImg = useRef(null);
  const conName = useRef(null);
  const containerMusic = useRef(null);
  var currentSongFile;
  var songsQueue = [];
  var imgSrcGlobal;
  var rotationInterval;
  var tempBool;

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
        <> <span> to see you :-) </span> </>
      );
    }
  }

  // Rotate conImg continuously
  const rotateImage = (rotBool) => {

    if (rotBool || tempBool) {
      conImg.current.style.transition = 'none'; // Disable transition for instant rotation
      conImg.current.style.transform = 'rotate(0deg) scale(1.5)'; // Reset rotation to 0 degrees
      conImg.current.offsetWidth; // Trigger a reflow to apply the reset instantly
      conImg.current.style.transition = 'transform 4.5s linear'; // Re-enable transition for smooth rotation
      conImg.current.style.transform = 'rotate(360deg) scale(1.5)'; // Rotate the image
      console.log("rotate");
    } else {
      conImg.current.style.transition = 'transform 1s ease-in-out'; // Re-enable transition for smooth rotation
      conImg.current.style.transform = 'rotate(0deg) scale(1.5)'; // Reset rotation to 0 degrees
      // conImg.current.offsetWidth; // Trigger a reflow to apply the reset instantly
    }

  };
  const riFunc = (rotBool) => {
    if (rotBool) {
      tempBool = true;
      rotateImage(true)
      // Start rotating the image
      rotationInterval = setInterval(rotateImage, 4500); // Rotate every 5.5 seconds
      return rotationInterval;
    } else {
      tempBool = false;
      rotateImage(false)
      clearInterval(rotationInterval); // Stop rotating the image
    }

  }


  const searchAndPlay = (curr, queue, currIndex, imgSrc) => {

    containerMusic.current.style.bottom = 0;
    // sapIndex(currIndex);
    console.log("index : " + currentSongFile);
    console.log(curr);
    audioRef.current.src = `/songs/${curr}.mp3`;
    audioRef.current.play();
    playBtn.current.classList.remove('fa-play-circle');
    playBtn.current.classList.add('fa-pause-circle');

    // if (imgSrc == 'playlist1') {
    //   setConImgSrc(`/img/${imgSrc}/${curr}.jpg`);
    // } else {
    //   setConImgSrc(`/img/${imgSrc}/${curr}.webp`);
    // }
    conImg.key = curr;
    conName.current.innerHTML = curr;


    // rotateImage()
    riFunc(true)

    // alert(conImg.current.src);
    // console.log(conImg);


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

    audioRef.current.addEventListener('ended', () => {
      nextSong();
    });


    currentSongFile = currIndex;
    // songsQueue = queue;


    // console.log("found : " + songsQueue);
    // imgSrcGlobal = imgSrc;
    // return {
    //   // currentSongFile,
    //   // songsQueue,
    //   // imgSrcGlobal,
    //   currIndex,
    //   queue,
    //   imgSrc

    // };

    // sapIndex(0 , imgSrc , curr)
    // return currentSongFile;

  }

  // const sapIndex = (index, imgSrc, curr) => {
  //   // currentSongFile = index;
  //   console.log("sapind index : " + currentSongFile);
  //   // return {currentSongFile};

  // }






  const sapReturn = (auData, playlist) => {

    // currentSongFile = index;
    songsQueue = auData;


    // console.log("this rp : " +  songsQueue);
    imgSrcGlobal = playlist;
    return {
      // currentSongFile,
      songsQueue,
      imgSrcGlobal

    };
  }






  //   let a = 0;
  //   setInterval(() => {
  //   console.log("songsQueue : " + imgSrcGlobal + " : " + ++a);
  // }, 2000);





  const prevSong = () => {
    if (songsQueue[currentSongFile] == undefined || songsQueue[currentSongFile] == null || songsQueue[currentSongFile] == 0) {
      // console.log(currentSongFile);
      // currentSongFile = 1;
      // console.log(currentSongFile);
      console.log("no songs found");
      console.log("index : " + currentSongFile);
      console.log(imgSrcGlobal);
      console.log(songsQueue);
      // console.log(songsQueue[currentSongFile]);
      // console.log(songsQueue[currentSongFile + 1]);
      // console.log(songsQueue[currentSongFile - 1]);
      return;
    }
    let prevSongFileIndex = songsQueue[currentSongFile - 1];
    audioRef.current.src = `/songs/${prevSongFileIndex}.mp3`;
    audioRef.current.play();
    currentSongFile--;

    console.log("found : ");

    console.log("index : " + currentSongFile);
    // console.log(imgSrcGlobal);
    // console.log(songsQueue);
    // console.log(songsQueue[currentSongFile]);
    // console.log(songsQueue[currentSongFile + 1]);
    // console.log(songsQueue[currentSongFile - 1]);

    playBtn.current.classList.remove('fa-play-circle');
    playBtn.current.classList.add('fa-pauses-circle');

    conImg.key = songsQueue[currentSongFile];
    conName.current.innerHTML = songsQueue[currentSongFile];




  }

  const curSong = () => {
    if (audioRef.current.src == undefined || audioRef.current.src == null || audioRef.current.src == 0) {
      return;
    }
    if (audioRef.current.paused) {
      riFunc(true)
      audioRef.current.play();
      playBtn.current.classList.remove('fa-play-circle');
      playBtn.current.classList.add('fa-pause-circle');

    } else {
      rotateImage(false)
      riFunc(false)
      audioRef.current.pause();
      playBtn.current.classList.remove('fa-pause-circle');
      playBtn.current.classList.add('fa-play-circle');

    }

    //   let rotationInterval = setInterval(rotateImage, 4500); // Rotate every 5.5 seconds

    // if (audioRef.current.paused) {
    //   clearInterval(rotationInterval); // Stop rotating the image
    // }else{
    //   rotateImage()
    //   let rotationInterval = setInterval(rotateImage, 4500); // Rotate every 5.5 seconds
    // }

  }

  const nextSong = () => {
    if (songsQueue[currentSongFile] == undefined || songsQueue[currentSongFile] == null || songsQueue[currentSongFile] == 0) {
      // currentSongFile = songsQueue.length - 2;
      currentSongFile = -1;
      // return;
    }
    let nextSongFileIndex = songsQueue[currentSongFile + 1];
    audioRef.current.src = `/songs/${nextSongFileIndex}.mp3`;
    audioRef.current.play();
    currentSongFile++;

    playBtn.current.classList.remove('fa-play-circle');
    playBtn.current.classList.add('fa-pause-circle');

    conImg.key = songsQueue[currentSongFile];
    conName.current.innerHTML = songsQueue[currentSongFile];

  }


  return (
    <>
      <Head>
        <title>Spotify Clone</title>
        <meta name='description' content='Spotify Clone by ProgrammerXD' />
        <meta name='viewport' content='width=device-width, initial-scale=1 , maximum-scale=1' />
        <link rel='icon' href='/img/1.png' />

      </Head>
      <main className={styles.main} id='main' ref={main}>

        <div className={`${styles.containers} ${styles.cA}`}>
          <h1>Good {greetTime()} !</h1>
          <HeaderBlocks />
        </div>
        <div className={`${styles.containers} ${styles.cB}`}>
          <h2>Recently Played <span className={styles.playlistTitle}> - Playlist Name : Devotional 🍁✨</span></h2>
          <JumpBackIn sap={searchAndPlay} sapR={sapReturn} />
        </div>


        <div className={`${styles.containers} ${styles.cC}`}>
          <h2>Jump back In <span className={styles.playlistTitle}> - Playlist Name : XXXTENXTACION 👀</span></h2>
          <RecentlyPlayed sap={searchAndPlay} sapR={sapReturn} />
        </div> <br /><br /><br />



        <div className={`${styles.containerMusic} ${styles.cMusic}`}  ref={containerMusic}>
          <div className={styles.songData}>
            {/* <Image key={0} src={conImgSrc} ref={conImg} width={50} height={50} alt='Song Image' loading='lazy' onError={(e) => console.error("Image load error", e)}></Image> */}
            <Image key={0} src={`/img/4.png`} ref={conImg} width={50} height={50} alt='Song Image' loading='lazy' onError={(e) => console.error("Image load error", e)}></Image>
            <h3 ref={conName}>Song Name</h3>
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
