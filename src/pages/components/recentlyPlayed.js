import React from 'react'
import Image from 'next/image'
import { useRef } from 'react'

const RecentlyPlayed = props => {
  const auData = [
    'Changes',
    'Hope',
    'Exbitch',
    'BadVibes',
    'Remedy',
    'Moonlight',
    'Numb',
    'KillVibe'
  ]

  const audioBlocks = auData.map((data, index) => {
    return (
      <>
        <div key={data} className='blockCont'>
          <div
            className='block'
            id={data}
            onClick={() => props.sap(data, auData, index)}
          >
            <Image
              style={{
                display: 'block',
                margin: '0 auto 1rem auto',
                borderRadius: '0.5rem',
                boxSizing: 'border-box'
              }}
              className='blockImg'
              src={`/img/playlist2/${data}.webp`}
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
                margin-bottom: 1em;
                height: 19rem;
                width: 12rem;
                text-align: left;
                scroll-snap-align: center;

                background: rgba(255, 255, 255, 0.05);
                // box-shadow: 0 8px 10px 0 rgba( 31, 38, 135, 0.37 );
                backdrop-filter: blur(4px);
                -webkit-backdrop-filter: blur(4px);
                border-radius: 10px;
                border: 1px solid rgba(255, 255, 255, 0.04);
              }
              .block:is(:hover , :focus){
                background: rgba(255, 255, 255, 0.134);
                transition: all 0.1s ease-in-out;
              }
              .block h3 {
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
        `}
      </style>
      <div className='blockData'>{audioBlocks}</div>
    </>
  )
}

export default RecentlyPlayed
