import React from 'react'
import Swal from 'sweetalert2'
import './Navbar.css'
import logo from'./images/crunchengine.png'
import './signIn.css'

class SignIn extends React.Component {

  state ={
    email: '',
    password: ''
  }

  logIn = (email, password) => {
    return fetch('http://localhost:3000/authenticate', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: email, password: password})
    }).then(response => response.json())
    .then(data => this.handleResponse(data, this.state.email))
    .catch(error => {
      console.log(error);
    });
  }

handleResponse = (response, email)=> {
  if(response.auth_token){
    localStorage.setItem('jwt', response.auth_token)
    localStorage.setItem('user_id', response.user_id)
    localStorage.setItem('username', response.name)
    localStorage.setItem('profile_gif', response.profile_gif)
    window.location = '/'
  }else{
    Swal.fire({
  type: 'error',
  title: 'Oops...',
  text: 'Incorrect name and password',
  footer: 'Please try again!'
})
this.setState({
  email: '',
  password: ''
})
  }
}


handleChange=(event)=>{
  const {name, value} = event.target
  this.setState({[name]: value})
}

create = ()=> {
  window.location = '/create-account'
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
        <h2>Please Sign In</h2>
        <div class="uk-margin">
          <div class="uk-inline">
            <span class="uk-form-icon" uk-icon="icon: mail"></span>
            <input class="uk-input" placeholder='email'type="text" name="email" value={this.state.email} onChange={this.handleChange}/></div>
          </div>

          <div class="uk-margin">
            <div class="uk-inline">
              <span class="uk-form-icon uk-form-icon" uk-icon="icon: lock"></span>
              <input class="uk-input" type="password" placeholder='password' name="password" value={this.state.password} onChange={this.handleChange}/></div>
              <br/>
            </div>
          </form>
          <button className="sign-in hvr-button uk-button-primary"onClick={()=>this.logIn(this.state.email,this.state.password)}>Sign In</button>
          <button className="uk-button-primary hvr-button create-account" onClick={()=>this.create()}>Create Account</button>

        </div>
        )
  }
}

export default SignIn
