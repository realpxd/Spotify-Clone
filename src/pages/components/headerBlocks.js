import React from 'react';
import Image from 'next/image';
import { useRef } from 'react';

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
    return (
      <>
      <div key={data} className="blockCont">
        <div className="block">
          <Image style={{ borderRadius: '0.5rem' 
          , float:'left' , boxSizing:'border-box' ,marginLeft:'0rem', marginRight:'1rem' , boxShadow: '2px 0 black' }} className='blockImg' src={`/img/artists/${data}.jpg`} width='100' height='80' alt={data} loading='lazy'></Image>
          <h3>{data}</h3>
          
        </div>
      <style jsx>
        {`
          .block {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0;
            border-radius: 0.5rem;
            margin: 1em;
            margin-bottom: 1em;
            height: 5rem; width: 25rem;

            background: rgba( 255, 255, 255, 0.15 );
            // box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
            backdrop-filter: blur( 7.5px );
            -webkit-backdrop-filter: blur( 7.5px );
            // border: 1px solid rgba( 255, 255, 255, 0.18 );
          }
          .block:is(:hover , :focus){
            background: rgba(255, 255, 255, 0.2);
            transition: all 0.1s ease-in-out;
          }
          .block h3{
            margin-right: 9rem;
            text-align: left;
            width: 7rem;
          }
          .blockImg{
            border-radius: 50%;
            border: 100px solid orange;
          }
          Image{
            border-radius: 50%;
            border: 100px solid orange;
          }
          @media  screen and (max-width:768px) {
            .block {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0;
              border-radius: 0.5rem;
              margin: 1em;
              margin-bottom: 1em;
              height: 3rem; width: 5rem;
  
              background: rgba( 255, 255, 255, 0.15 );
              // box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
              backdrop-filter: blur( 7.5px );
              -webkit-backdrop-filter: blur( 7.5px );
              // border: 1px solid rgba( 255, 255, 255, 0.18 );
            }
            .block:is(:hover , :focus){
              background: rgba(255, 255, 255, 0.2);
              transition: all 0.1s ease-in-out;
            }
            .block h3{
              margin-right: 9rem;
              text-align: left;
              width: 7rem;
            }
            .blockImg{
              border-radius: 50%;
              border: 100px solid orange;
            }
            .block img{
              border-radius: 50%;
              hieght: 1rem;
              width: 1rem;
              border: 100px solid orange;
            }
          }
        `}
      </style>
      </div>
    </>
    );
  });

  return (
    <>
    <style jsx>
      {`
        .blockData{
          display: grid;
          place-items: center;
          grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
          overflow:hidden;
          width: 100%;
        }
        @media  screen and (max-width:768px) {
          .blockData{
            display: none;
            grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
        }
      `}
    </style>
      <div className="blockData">
        {audioBlocks}
      </div>
    </>
  );
};

export default HeaderBlocks;
