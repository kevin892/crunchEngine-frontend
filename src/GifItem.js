import React from 'react'
import './Container.css'
import Swal from 'sweetalert2'

const GifItem = (props) => {

const linkAlert = ()=>{ Swal.fire({
  title: "📌",
  text: props.url,
})}
  return(
    <div className='saved-gif-item hvr-gif' onClick={()=>linkAlert()}>
      <img src={props.url}></img>
    </div>
  )
}

export default GifItem
