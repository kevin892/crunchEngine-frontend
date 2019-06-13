import React from 'react'

class NewAccount extends React.Component {

  state ={
    username: '',
    email: '',
    password: ''
  }

  view = (data)=> {
    return fetch('http://localhost:3000/authenticate', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: this.state.email, password: this.state.password})
    }).then(response => response.json())
    .then(data => this.handleSignInResponse(data, this.state.email))
    .catch(error => {
      console.log(error);
    });
  }

  createUser = (username, email, password) => {
    return fetch('http://localhost:3000/create-user', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "user": "Create"
      },
      body: JSON.stringify({profile_gif:'https://www.chases.msstate.edu/sites/www.chases.msstate.edu/files/default_images/defaultpic.png', username: username, email: email, password: password})
    }).then(response => response.json())
    .then(data => this.view(data))
    .catch(error => {
      console.log(error)
    });
  }

  handleSignInResponse = (response, email)=> {
    if(response.auth_token){
      localStorage.setItem('jwt', response.auth_token)
      localStorage.setItem('user_id', response.user_id)
      localStorage.setItem('username', response.name)
      localStorage.setItem('profile_gif', response.profile_gif)

      window.location = '/'
    }else{
      return
    }
  }

handleResponse = (response, email)=> {
  if(response.auth_token){
    localStorage.setItem('jwt', response.auth_token)
    localStorage.setItem('user_id', response.user_id)
    localStorage.setItem('username', response.name)
    window.location = '/'
  }else{
    return
  }
}


handleChange=(event)=>{
  const {name, value} = event.target
  this.setState({[name]: value})
}

handleSubmit = (event)=> {
  event.preventDefault()
  this.createUser(this.state.username,this.state.email, this.state.password)
}


  render() {
    return (<div>
      <form onSubmit={this.handleSubmit}>
        <h2>Create Account</h2>

        <div class="uk-inline">
          <span class="uk-form-icon" uk-icon="icon: user"></span>
          <input class="uk-input" type="text" name="username" value={this.state.username} onChange={this.handleChange}/></div>

          <div class="uk-inline">
            <span class="uk-form-icon" uk-icon="icon: mail"></span>
            <input class="uk-input" type="text" name="email" value={this.state.email} onChange={this.handleChange}/></div>

            <div class="uk-inline">
              <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
              <input class="uk-input" type="text" name="password" value={this.state.password} onChange={this.handleChange}/></div>
              <br/>
              <br/>
              <button>Create Account</button>

          </form>
        </div>
        )
  }
}

export default NewAccount
