import react from 'react'
import TrackList from '../TrackList/TrackList';
import './SearchResult.css'

class SearchResults extends react.Component
{




    render()
    {
        return(
            <div className="SearchResults">
  <h2>Results</h2>
  <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoveal={false} />
</div>
        )
    }
}

export default SearchResults;