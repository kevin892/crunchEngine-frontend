import React from 'react'

class SearchForm extends React.Component {
  state = {
    search_form: '',
    search_type: ''
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.submitSearch(this.state.search_form, this.state.search_type)
    this.setState({search_form: ''})
  }
  render() {
    return (<div className='search-form'>
      <form onSubmit={this.handleSubmit}>
        <div>
        <input maxlength="50" className="uk-input search-input" name='search_form' value={this.state.search_form} onChange={this.handleChange}/>
        <span className="mag-glass"uk-icon="icon: search; ratio: 1.5"></span>
        </div>
        <br/>
        <br/>
        <label><input className="uk-radio" onChange={this.handleChange} type="radio" name="search_type" value='stackOverflow'/>
          Stack Overflow</label>
        <label><input className="uk-radio" type="radio" onChange={this.handleChange} name="search_type" value='docs'/>
          Documentation</label>
        <label><input className="uk-radio" type="radio" onChange={this.handleChange} name="search_type" value='gifs'/>
          GIFs</label>
        <br/>
        <br/>
        <button class="hvr-grow uk-button uk-button-secondary uk-width-1-2">Search</button>
      </form>
    </div>)
  }
}

export default SearchForm;
