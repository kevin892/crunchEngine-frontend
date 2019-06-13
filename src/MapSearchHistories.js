import React from 'react'
import SearchItem from './SearchItem'

const MapSearchHistories = (props) => {
  let searches;
  if (props.searches){
    searches = props.searches.map((search, index) => {
     return <SearchItem {...search} key={Date.now() + index}/>
     })
  }else{
    searches = ''
}
  return (<div>
    <h2>Search History</h2>
    <br/>
    <div>
      {searches}
    </div>
  </div>)
}

export default MapSearchHistories
