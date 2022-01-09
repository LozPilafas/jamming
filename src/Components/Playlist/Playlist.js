import react from 'react'
import TrackList from '../TrackList/TrackList'
import './Playlist.css'

class Playlist extends react.Component
{

    constructor(props)
    {
        super(props);
        this.handleNameChange=this.handleNameChange.bind(this)
    }

    handleNameChange(event)
    {
        this.props.onChange(event.target.value)
    }




    render()
    {
        return(
            <div className="Playlist">
  <input defaultValue={this.props.playlist} onChange={this.handleNameChange} value={this.props.playlist}/>
  <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
  <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
</div>
        )
    }
}

export default Playlist