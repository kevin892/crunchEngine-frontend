import React from 'react'
import MapSearchHistories from './MapSearchHistories'
import Navbar from './Navbar'

class SearchHistoryContainer extends React.Component {
  state = {
    savedSearches: []
  }

  async componentDidMount() {
    try {
      const response = await fetch(`http://localhost:3000/users/${localStorage.getItem('user_id')}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      const result = await response.json()
      this.setState({savedSearches: result.search_terms})
    } catch (error) {
      console.log(error.message);
    }
  }
destroyAll =() => {
    return fetch(`http://localhost:3000/destroyall/${localStorage.getItem('user_id')}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(response => response.json())
    .then(window.location.reload())
    .catch(error => {
      console.log(error);
    });
}
  render() {
    return (
      !localStorage.user_id
      ? window.location = '/sign-in'
      : <div>
      <Navbar/>
      <span onClick={this.destroyAll} className='trash hvr-grow'>🗑</span>
        <MapSearchHistories searches={this.state.savedSearches}/>
      </div>)
  }
}

export default SearchHistoryContainer
