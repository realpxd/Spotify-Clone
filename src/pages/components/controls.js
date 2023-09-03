import React from 'react'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useState, useRef } from 'react';
import JumpBackIn from './RecentlyPlayed.js'


const controls = () => {
    const [conImgSrc, setConImgSrc] = useState(`/img/bg1.jpg`); // Provide a default image source

    const conImg = useRef(null);
    const conName = useRef(null);
    const playBtn = useRef(null);
    const curRange = useRef(null);
    const volRange = useRef(null);
    const audioRef = useRef(null);
    var currentSongFile;
    var songsQueue = [];
    var imgSrcGlobal;


    

  const searchAndPlay = (curr, queue, currIndex, imgSrc) => {
   

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

    // alert(conImg.current.src);
    console.log(conImg);


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

  const sapIndex = (index , imgSrc , curr) => {
    // currentSongFile = index;
    console.log("sapind index : " + currentSongFile);
    // return {currentSongFile};


    if (imgSrc == 'playlist1') {
      setConImgSrc(`/img/${imgSrc}/${curr}.jpg`);
    } else {
      setConImgSrc(`/img/${imgSrc}/${curr}.webp`);
    }
  }





      
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
    console.log(imgSrcGlobal);
    console.log(songsQueue);
    console.log(songsQueue[currentSongFile]);
    console.log(songsQueue[currentSongFile + 1]);
    console.log(songsQueue[currentSongFile - 1]);


    // console.log(imgSrcGlobal);

    // if (imgSrcGlobal == 'playlist1') {
    //   setConImgSrc(`/img/${imgSrcGlobal}/${songsQueue[currentSongFile]}.jpg`);
    // } else {
    //   setConImgSrc(`/img/${imgSrcGlobal}/${songsQueue[currentSongFile]}.webp`);
    // }
    // conImg.key = songsQueue[currentSongFile];
    // conName.current.innerHTML = songsQueue[currentSongFile];




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



    if (imgSrcGlobal == 'playlist1') {
      setConImgSrc(`/img/${imgSrcGlobal}/${songsQueue[currentSongFile]}.jpg`);
    } else {
      setConImgSrc(`/img/${imgSrcGlobal}/${songsQueue[currentSongFile]}.webp`);
    }
    conImg.key = songsQueue[currentSongFile];
    conName.current.innerHTML = songsQueue[currentSongFile];

  }













  return (
    <>
    
    <div className={`${styles.containers} ${styles.cB}`}>
          <h2>Recently Played <span className={styles.playlistTitle}> - Playlist Name : Devotional 🍁✨</span></h2>
          <JumpBackIn sap={searchAndPlay} sapR={sapReturn} sapInd={sapIndex}  />
        </div>

    <div className={`${styles.containerMusic} ${styles.cMusic}`}>
      <div className={styles.songData}>
        <Image key={0} src={conImgSrc} ref={conImg} width={50} height={50} alt='Song Image' loading='lazy'
          onError={(e) => console.error("Image load error", e)}></Image>
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

    </>
      )
}

export default controls