import React from 'react';
import './App.css';
import MainComponent from './MainComponent'
import DocContainer from './DocContainer'
import StackContainer from './StackContainer'
import SearchForm from './SearchForm'
import Swal from 'sweetalert2'
import Navbar from './Navbar'
import ApiKeys from './ApiKeys.js'

class App extends React.Component {
  state = {
    search: [
      "", ""
    ],
    type: '',
    searchInput: '',
    searchID: '',
    profileGif: false
  }
componentWillMount=()=> {
  if (localStorage.user_id){
     return
  } else{
     window.location = '/sign-in'
  }
}

  handleSearch = (search, type) => {
    switch (type) {
      case '':
        return `&q=${search}`
        break;
      case 'docs':
        return `&q=${search}+documentation`
        break;
      case 'stackOverflow':
        return `&q=${search}+stackoverflow.com`
        break;
      case 'gifs':
        return `&searchType=image&q=${search}+gif`
        break;
      default:
    }
  }

  submitSearch = (newSearchTerm, newSearchType) => {
    this.addSearch(newSearchTerm)
    const searchTerm = newSearchTerm.split(' ').join('+')
    const field = this.handleSearch(searchTerm, newSearchType)
    const url = `https://www.googleapis.com/customsearch/v1?key=${ApiKeys.cseKeyTwo}&cx=${ApiKeys.cx}${field}`
    fetch(url).then(response => {
      return response.json();
    }).then(result => {
      result.error
        ? Swal.fire('Change key Kevin')
        : this.setState({search: result, type: newSearchType, searchInput: newSearchTerm})
    })
  }

  changeProfileGif =(gif) => {
    this.setState({profileGif: gif})
    localStorage.setItem('profile_gif', gif)
    return fetch(`http://localhost:3000/users/${localStorage.getItem('user_id')}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({profile_gif: gif})
    }).then(response => {
      Swal.fire({type: 'success', title: 'Profile GIF set!'})
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  addGif = (link) => {
    return fetch('http://localhost:3000/gifs/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({user_id: localStorage.getItem('user_id'), url: link})
    }).then(response => {
      Swal.fire({type: 'success', title: 'GIF added to collection!'})
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  addSearch = (search) => {
    return fetch('http://localhost:3000/search_terms/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({user_id: localStorage.getItem('user_id'), search: search})
    }).then(response => response.json())
    .then(data => this.setState({searchID: data.id}))
    .catch(error => {
      console.log(error);
    });
  }

  addVisitedPage = (link, search) => {
    return fetch('http://localhost:3000/visited_pages/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({search_term_id: search, url: link})
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (<div>
      <Navbar gif={this.state.profileGif}/>
      <SearchForm submitSearch={this.submitSearch}/>
      <br/>
      <MainComponent makeProfileGif={this.changeProfileGif} type={this.state.type} addGif={this.addGif} search={this.state.search} searchID={this.state.searchID} searchInput={this.state.searchInput} addVisitedPage={this.addVisitedPage}/>

    </div>)
  }
}
export default App;
