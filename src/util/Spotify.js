


let accessToken;


const clientID='8c9e18dfa24f4f5e8925544826390be5';
const redirect_uri='http://lozp.surge.sh'



const Spotify =
{
 

    getAccessToken()
    {
        if(accessToken)
        {
            return accessToken
        }
        else
        {
           const accessTokenMatch=window.location.href.match(/access_token=([^&]*)/)
           const expiresInMatch=window.location.href.match(/expires_in=([^&]*)/)
           
           if( accessTokenMatch && expiresInMatch)
           {
           
               accessToken=accessTokenMatch[1];
               console.log(accessToken)
               const expiresIn=Number(expiresInMatch[1]);
               window.setTimeout(() =>{ accessToken = ''},  expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return accessToken
           }
           else
           {
               window.location=`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`
           }
        }
    },

     search(searchTerm)
    {
        const accessToken=Spotify.getAccessToken()
        const searchEndpoint=`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`
        return fetch(searchEndpoint,{
            method:'GET',
            cache:'no-cache',
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${accessToken}`
            }
        })
        
        .then(response=>
            {
                
                return response.json()
                
            })
        .then(data=>{
            if(!data.tracks)
            {
                return [];
            }
            console.log(data.tracks)
            return data.tracks.items.map(item=>
                (
                    {
                    
                    
                    'id':item.id,
                    'name':item.name,
                    'artist':item.artists[0].name,
                    'album':item.album.name,
                    'uri':item.uri,
                    'imgsrc':item.album.images[0].url
                    
                    
                }
                ))
                
        })
       
        
    },

    savePlaylist(playlistName,tracksURIs)
    {

        if(!playlistName || !tracksURIs)
        {
            return
        }
        let accessToken=this.getAccessToken()
        
        let userID="";
        let endPoint='https://api.spotify.com/v1/me';
        
         return fetch(endPoint,{

            method:'GET',
            headers:{
                'Authorization':'Bearer '+accessToken,
                'content-type':'application/json',
                
            }
        })
        .then(response=>
            {
                return response.json()
            })
            .then(data=>{
                
                userID=data.id
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
                    method:'POST',
                    headers:{
                        'Authorization':'Bearer '+accessToken,
                        'Content-type':'application/json',


                    },
                    body:JSON.stringify({
                        name:playlistName,
                        description:'Playlist created with Jamming '
                    })
                }).then(response=>
                    {
                        return response.json()
                    }).then(playlist=>
                        {
                            let playlistID=playlist.id
                            return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,{
                                method:'POST',
                                headers:{
                                    'Authorization':'Bearer '+accessToken,
                                    'Content-type':'application/json',

                                },
                                body:JSON.stringify({uris:tracksURIs})
                            }).then(received=>
                                {
                                    return received.json()
                                }).then(data=>
                                    {
                                        return data
                                    })
                        })

                
                


                
            })



            
        


    }

}

export default Spotify;
