import React from 'react'
import UrlItem from './UrlItem'

const MapUrls = (props) => {
  const urls = props.urls.map((url, index) => {
    return <UrlItem {...url} key={Date.now() + index}/>
  })
  return (<ul>
    {urls}
  </ul>)
}

export default MapUrls
