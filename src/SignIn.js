import React from 'react'

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
    return
  }
}


handleChange=(event)=>{
  const {name, value} = event.target
  this.setState({[name]: value})
}

handleSubmit = (event)=> {
  event.preventDefault()
  this.logIn(this.state.email, this.state.password)
}
create = ()=> {
  window.location = '/create-account'
}


  render() {
    return (<div>
      <form onSubmit={this.handleSubmit}>
        <h2>Please Sign In</h2>
        <div class="uk-margin">
          <div class="uk-inline">
            <span class="uk-form-icon" uk-icon="icon: user"></span>
            <input class="uk-input" type="text" name="email" value={this.state.email} onChange={this.handleChange}/></div>
          </div>

          <div class="uk-margin">
            <div class="uk-inline">
              <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
              <input class="uk-input" type="text" name="password" value={this.state.password} onChange={this.handleChange}/></div>
              <br/>
              <button>Sign In</button>
            </div>
          </form>

          <button onClick={()=>this.create()}>Create Account</button>
        </div>
        )
  }
}

export default SignIn
