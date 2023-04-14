import React from 'react'

export default function ProgressBar(props: {width: number}) {
    let width = props.width;
  return (
    <div className='playground-progress'>
        <div style={{width: `${width}%`, color: width <= 0 ? 'rgb(255, 255, 255)' : 'rgb(18, 18, 18)' }}>{width.toFixed(1)}%</div>
    </div>
  )
}
