import React from 'react'
import "./history.css"

const UrlItem = (props) => {
  return (<div className="hidden-div">
    <a className="hidden-url" target="_blank" href={props.url}>
      <u>{props.url}</u>
    </a>
  </div>)
}

export default UrlItem
