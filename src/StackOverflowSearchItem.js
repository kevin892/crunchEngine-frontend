import React from 'react'
import './DocContainer.css'

const StackOverflowSearchItem = (props) => {
  let searchValue = ''
if (props.title === undefined){
  searchValue = ""
} else {
  searchValue =
<div className='hvr-doc'>
  <a className='container hvr-doc'  onClick={()=>props.addVisitedPage(props.link, props.searchID)}href={props.link} target="_blank">{props.title}></a>

<span className='upvote-text'>🔺</span><span className='upvote-amount'>{props.pagemap.answer?props.pagemap.answer[0].upvotecount: 0}</span>
<span className='border'>💬</span><span className='answers'>{props.pagemap.answer?props.pagemap.answer.length: 0}</span>
  </div>
}

  return(
    <div>
{searchValue}
</div>
  )
}

export default StackOverflowSearchItem;
