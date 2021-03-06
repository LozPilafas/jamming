import react from 'react'
import '../Track/Track.css'


class Track extends react.Component
{
    constructor(props)
    {
        super(props)
        this.addTrack=this.addTrack.bind(this)
        this.removeTrack=this.removeTrack.bind(this)
    }


    renderAction()
    {
        let isRemoval=this.props.isRemoval;
        if(isRemoval===true)
        {
            
           return ( <button className='Track-action' onClick={this.removeTrack}>-</button>)
        }
        else
        {
          
            return ( <button className='Track-action' onClick={this.addTrack} >+</button>)
            
        }
    }

    addTrack()
    {
        this.props.onAdd(this.props.track)
    }

    removeTrack()
    {
        this.props.onRemove(this.props.track)
    }


    render()
    {
        return(
            <div className="Track">
  <div className="Track-information">
      
      <img alt='Track ' src={this.props.track.imgsrc} width='50px' height='50px'></img>
      <div className='Track-information2'>
    <h3>{this.props.track.name}</h3>
    <p> {this.props.track.artist} | {this.props.track.album}</p></div>
  </div>
   {this.renderAction()} 
</div>

        )
    }





}

export default Track