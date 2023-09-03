import React from 'react'
import Image from 'next/image'
import { useRef } from 'react'

const RecentlyPlayed = props => {
  const auData = [
    'Ram Siya Ram',
    'भए प्रगट कृपाला',
    'सारे जहाँ के मालिक',
    'Hare Ram Hare Krishan',
    'Sankat Mochan Hanuman',
    'Ram Darshan',
    'तेरी बंदगी से पहले',
    'Jai Jai Narayan',
  ]

  let currentSongFile, songsQueue = [];
  let imgSrcGlobal;

  const audioBlocks = auData.map((data, index) => {


    // console.log(sapReturn(data, auData, index , 'playlist1'))

    //   let a = 0;
    //   setInterval(() => {
    //   console.log("songsQueue : " + imgSrcGlobal + " : " + ++a);
    // }, 2000);


    return (
      <>
        <div key={data} className='blockCont' onClick={() => props.sapR(auData, 'playlist1')}>
          <div
            className='block'
            onClick={() => {
              props.sap(data, auData, index, 'playlist1');
              // props.sapInd(index , 'playlist1' , data);
            }}
          >
            <Image
              style={{
                display: 'block',
                margin: '0 auto 1rem auto',
                borderRadius: '0.5rem',
                boxSizing: 'border-box'
              }}
              className='blockImg'
              src={`/img/playlist1/${data}.jpg`}
              width='140'
              height='150'
              alt={data}
              loading='lazy'
            />
            <h3>{data}</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <style jsx>
            {`
              .block {
                display: grid;
                place-items: ;
                padding: 1.3rem 1rem 1rem 1rem;
                border-radius: 0.5rem;
                margin: 1em;
                height: 19rem;
                width: 12rem;
                text-align: left;
                scroll-snap-align: center;

                background: rgba(150, 150, 150, 0.05);
                // box-shadow: 0 8px 10px 0 rgba( 31, 38, 135, 0.37 );
                backdrop-filter: blur(4px);
              
                -webkit-backdrop-filter: blur(4px);
                border-radius: 10px;
                border: 1px solid rgba(100, 100, 100, 0.04);
              }
              .block:is(:hover , :focus){
                background: rgba(150, 150, 150, 0.134);
                transition: all 0.1s ease-in-out;
              }
              .block h3 {
                font-weight: 600;
                wdith: 100%;
                white-space: nowrap; 

                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                
                white-space: nowrap; 
              }
              .block p {
                color: grey;
              }
              .blockImg {
                border-radius: 50%;
                border: 100px solid orange;
              }
              Image {
                border-radius: 50%;
                border: 100px solid orange;
              }
            `}
          </style>
        </div>
      </>
    )
  })

  return (
    <>
      <style jsx>
        {`
          .blockData {
            display: grid;
            place-items: center;
            grid-template-columns: repeat(15, 1fr);
            overflow-y: hidden;
            overflow-x: scroll;
            width: 100vw;
            scroll-snap-type: x mandatory;
          }
          .blockData::-webkit-scrollbar {
            display: none;
          }
          .blockCont{
            cursor: pointer;
          }
        `}
      </style>
      <div className='blockData'>{audioBlocks}</div>
    </>
  )
}

export default RecentlyPlayed
