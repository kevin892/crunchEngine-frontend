import React from 'react'
import Swal from 'sweetalert2'
import './Container.css'

const GifSearchItem = (props) => {

  const linkAlert = ()=>{ Swal.fire({
    title: "📌",
    text: props.link,
  })}

  let searchValue = ''
  if (props.title === undefined) {
    searchValue = ""
  } else {
    searchValue = <div className="item">
      <a href={props.link} target="_blank">
        <img className='gif-card'src={props.link} onClick={() => props.addVisitedPage(props.link, props.searchID)} alt="Nothing found" target="_blank"></img>
      </a>
      <span className="icon hvr-grow-add" onClick={() => props.addGif(props.link)} uk-icon="icon: plus-circle; ratio: 3.5"></span>
      <span className="icon hvr-grow-gif" onClick={()=>props.makeProfileGif(props.link)} uk-icon="icon: user; ratio: 3.5"></span>
      <span className="icon hvr-grow-link" onClick={()=>linkAlert()} uk-icon="icon: link; ratio: 3.5"></span>
    </div>
  }

  return (<div>
    {searchValue}
  </div>)
}

export default GifSearchItem;
