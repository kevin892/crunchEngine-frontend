import React from 'react'
import MapGifs from './MapGifs'
import ls from 'local-storage'
import Navbar from './Navbar'

class SavedGifsContainer extends React.Component {
  state = {
    savedGifs: []
  }

  async componentDidMount() {
    try {
      const response = await fetch(`http://localhost:3000/users/${localStorage.getItem('user_id')}`,{
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      const result = await response.json()
      this.setState({savedGifs: result.gifs})
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    return (  !localStorage.user_id
      ? window.location = '/sign-in'
      : <div>
      <Navbar/>
      <MapGifs savedGifs={this.state.savedGifs}/>
    </div>)
  }
}

export default SavedGifsContainer
