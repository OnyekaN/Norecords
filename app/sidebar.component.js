import React from 'react';
import ReactDOM from 'react-dom';

class SidebarComponent extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		let album = this.props.album;
		album.songs.sort(function (a, b) {
			return a.song_id - b.song_id;
		});
		return (
			<div id="sidebar">
				<button type="button" className= "btn button-outline-dark btn-sm" onClick={this.props.closeSidebar}>X</button>
				<img className="sidebar-image-icon" src={album.art} alt={album.name + " album cover"}/>
				<h3>{album.artist}</h3>
				<h2><em>{album.name}</em></h2><br/>
				<ul>
					{album.songs.map(obj =>
						obj.youtube_link != 'N/A' ? <li key={obj.song_name}><a href={obj.youtube_link.replace('watch?v=', 'embed/')+'?autoplay=1'} target="yt_iframe"><img className="sidebar-play-button" src="images/play-button.png" alt="play button"/>{obj.song_name}</a></li> : <li key={obj.song_name}>{obj.song_name}</li> 
					)}
				</ul>
				<iframe height="200px" width="200px" src="" name="yt_iframe"></iframe>
			</div>		
		);
	}
}

export default SidebarComponent;

