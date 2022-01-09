
import react from 'react';
import Spotify from '../../util/Spotify';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResult/SearchResult';
import './App.css';



 class App extends react.Component{
   constructor(props)
   {
     super(props)
     this.state={searchResults:[],
     playlistName:'My Playlist name',
     playlistTracks:[
       
     ]}
     this.addTrack=this.addTrack.bind(this)
     this.removeTrack=this.removeTrack.bind(this)
     this.updatePlaylistName=this.updatePlaylistName.bind(this)
     this.savePlaylist=this.savePlaylist.bind(this)
     this.search=this.search.bind(this)
   }   

   addTrack(track)
   {
     let tracks=this.state.playlistTracks;
     if(this.state.playlistTracks.find(savedTrack=>
      
        savedTrack.id===track.id
        
      ))
      {
        
        return
      }
      else
      {
        
        tracks.push(track)
        
        this.setState({playlistTracks:tracks})

      }

   }

   removeTrack(track)
   {

    let tracks=this.state.playlistTracks;

   if(tracks.find(savedtrack=>savedtrack.id===track.id))
   {
     tracks=tracks.filter(tracksitem=>tracksitem.id!==track.id)
     this.setState({playlistTracks:tracks})
   }
   
   
    



   }

   updatePlaylistName(name)
   {
     this.setState({playlistName:name})
   }

   savePlaylist()
   {
     let tracksURIs=[];
     this.state.playlistTracks.forEach(track=>tracksURIs.push(track.uri))
     Spotify.savePlaylist(this.state.playlistName,tracksURIs).then(()=>
     {
     this.setState({playlistTracks:[]})
     this.setState({playlistName:'New Playlist :)'})
     }
     )
   }

   search(term)
   {
     Spotify.search(term).then(data=>
      this.setState({searchResults:data}))
   }




  render()
  {
    
    return(
    <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onChange={this.search}/>
    
    <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
     
    <Playlist playlistTracks={this.state.playlistTracks} 
    playlist={this.state.playlistName} 
    onRemove={this.removeTrack} 
    onChange={this.updatePlaylistName}
    onSave={this.savePlaylist} 
    />
   <div className="App-playlist">
     
    </div>
  </div>
</div>)
  }
}

export default App;
