import React from 'react'
 
import { css } from '@emotion/core' 
export default function Overlay({ ready, clicked, setClicked }) {
  return (
    <>
      <div     css={css`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 1s;
      `} className={`fullscreen bg ${ready ? 'ready' : 'notready'} ${clicked && 'clicked'}`}>
        <div onClick={() => ready && setClicked(true)}>{!ready ? 'loading' : 'click to continue'}</div>
      </div>
 
    </>
  )
}
