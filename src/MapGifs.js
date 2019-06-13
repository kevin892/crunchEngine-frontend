import React from 'react'
import GifItem from './GifItem'
import './Container.css'

const MapGifs = (props) => {
  let savedGifs;

  if (props.savedGifs){
    savedGifs = props.savedGifs.map((gif, index) => {
    return <GifItem {...gif} key={Date.now() + index}/>
  })
}else {
  savedGifs = ''
}
  return (<div>
    <h2>Saved GIFs</h2>
    <div className="saved-gifs-container">
      {savedGifs}
    </div>
  </div>)
}

export default MapGifs
