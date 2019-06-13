import React from 'react'
import './DocContainer.css'

const DocSearchItem = (props) => {
  let searchValue = ''
if (props.title === undefined){
  searchValue = ""
} else {
  searchValue =
<div className='hvr-doc'>
  <a className='container hvr-doc' href={props.link} onClick={() => props.addVisitedPage(props.link, props.searchID)} target="_blank">{props.title}></a><span className='border'>📄</span>
  </div>

  // <img src={props.link} target="_blank">{props.link}</img>
}

  return(
    <div>
{searchValue}
</div>
  )
}

export default DocSearchItem;
