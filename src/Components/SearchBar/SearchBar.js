import react from 'react';
import './SearchBar.css'


class SearchBar extends react.Component
{
    constructor(props)
    {
        super(props)
        this.handleChange=this.handleChange.bind(this)
    }


    handleChange(e)
    {
        this.props.onChange(e.target.value)
    }

    render()
    {
        return (
        
        <div className="SearchBar">
  <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleChange}/>
  <button className="SearchButton">SEARCH</button>
</div>)

    }
}

export default SearchBar