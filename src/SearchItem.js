import React from 'react'
import Swal from 'sweetalert2'
import "./history.css"
import MapUrls from './MapUrls'

class SearchItem extends React.Component {

  state = {
    isHidden: true
  }

  handleToggle = () => {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  render() {
    return (<div>
      <div className='history-div hvr-grow1' onClick={this.handleToggle}>
        <p>
          <span className='search-term '>
            <span className="search-icon"></span>{this.props.search}</span>
          <span className='visited'>🗂
          </span>
          <span className='num-pages'>{this.props.visited_pages.length}</span>
          <span className='date-visited'>🗓<span className="num">{this.props.created_at.substring(0, 10)}</span>
          </span>
        </p>
      </div>
      <div>
        {
          this.state.isHidden
            ? ''
            : <MapUrls urls={this.props.visited_pages}/>
        }
      </div>
    </div>)
  }
}

export default SearchItem
