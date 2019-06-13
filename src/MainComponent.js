import React from 'react'
import StackOverflowSearchItem from './StackOverflowSearchItem'
import GifSearchItem from './GifSearchItem'
import DocSearchItem from './DocSearchItem'

const MainComponent = (props) => {
  let mySearch;
  if (props.search.items && props.type === 'stackOverflow' && props.search[0] !== '') {
    mySearch = props.search.items.filter(item => item.link.includes('stackoverflow.com/questions'))
    mySearch = mySearch.map((search_item, index) => {
      return <StackOverflowSearchItem {...search_item} addVisitedPage={props.addVisitedPage} searchID={props.searchID} key={Date.now() + index}/>
    })
  } else if (props.search.items && props.type === 'gifs' && props.search[0] !== '') {
    mySearch = props.search.items.map((search_item, index) => {
      return <GifSearchItem {...search_item}
        makeProfileGif={props.makeProfileGif} addVisitedPage={props.addVisitedPage
} searchID={props.searchID} addGif={props.addGif} key={Date.now() + index}/>
    })
  } else if (props.search.items && props.type === 'docs' && props.search[0] !== '') {
    mySearch = props.search.items.slice(0, 2)
    mySearch = mySearch.map((search_item, index) => {
      return <DocSearchItem {...search_item} addVisitedPage={props.addVisitedPage} searchID={props.searchID} key={Date.now() + index}/>
    })
  } else {
    console.log("hello");
  }

  return (<div>
    {
      props.searchInput !== ''
        ? <h3>🔎 {props.searchInput}</h3>
        : ''
    }

  {mySearch}
  </div>)
}
export default MainComponent;
