import React from 'react'
import Swal from 'sweetalert2'

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
    if (this.state.search_type === ''){
      Swal.fire({
    type: 'info',
    title: 'Please select search type'
  })
      return
    }else{
    this.props.submitSearch(this.state.search_form, this.state.search_type)
    this.setState({search_form: ''})
  }
  }
  render() {
    return (<div className='search-form'>
      <form onSubmit={this.handleSubmit}>
        <div>
        <input maxlength="50" className="uk-input search-input" name='search_form' value={this.state.search_form} onChange={this.handleChange}/>
        <span className="mag-glass hvr-growr"onClick={this.handleSubmit}uk-icon="icon: search; ratio: 3"></span>
        </div>
        <br/>
        <br/>
        <label className="searchLabel"><input className="searchLabels uk-radio" onChange={this.handleChange} type="radio" name="search_type" value='stackOverflow'/>
          <span> │ </span>Stack Overflow</label>
        <label className="searchLabel"><input className="searchLabels uk-radio" type="radio" onChange={this.handleChange} name="search_type" value='docs'/>
          <span> │ </span>Documentation</label>
        <label className="searchLabel"><input className="searchLabels uk-radio" type="radio" onChange={this.handleChange} name="search_type" value='gifs'/>
          <span> │ </span>GIFs</label>
        <br/>
        <br/>

      </form>
    </div>)
  }
}

export default SearchForm;
