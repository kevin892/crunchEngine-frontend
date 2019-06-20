import React from 'react'
import Swal from 'sweetalert2'
import './Navbar.css'
import logo from'./images/crunchengine.png'
import './signIn.css'

class NewAccount extends React.Component {

  state ={
    username: '',
    email: '',
    password: ''
  }

  view = (data)=> {
    if(data.email){
      Swal.fire({
    type: 'info',
    title: 'Email is already in use'
  })
      this.setState({
        username: '',
        email: '',
        password: ''
      })
    } else{
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
}

  createUser = (username, email, password) => {
    if(username===''||username===''||password===''){
      Swal.fire({
    type: 'info',
    title: 'Please Complete Form'
  })
}else{
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
      <br/>
      <nav className="uk-navbar uk-margin" uk-navbar="mode: click" uk-navbar>
          <div className="uk-navbar-right">
              <ul className="uk-navbar-nav">
                <img className="logo uk-navbar-item uk-logo" src={logo}></img>
              </ul>
            </div>
      </nav><hr/>
      <form>
        <h2>Create Account</h2>

        <div class="uk-inline">
          <span class="uk-form-icon" uk-icon="icon: user"></span>
          <input class="uk-input" placeholder='username' type="text" name="username" value={this.state.username} onChange={this.handleChange}/></div>

          <div class="uk-inline">
            <span class="uk-form-icon" uk-icon="icon: mail"></span>
            <input class="uk-input" type="text" placeholder='email' name="email" value={this.state.email} onChange={this.handleChange}/></div>

            <div class="uk-inline">
              <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
              <input class="uk-input" type="password" placeholder='password'name="password" value={this.state.password} onChange={this.handleChange}/></div>
              <br/>
              <br/>
          </form>
            <button onClick={()=>  this.createUser(this.state.username,this.state.email, this.state.password)}className='hvr-button  add-account-button uk-button-primary'>Create Account</button><br/>
          <button onClick={()=>window.location = '/sign-in'}className='hvr-button back uk-button-primary'>Back to Sign In</button>
        </div>
        )
  }
}

export default NewAccount
