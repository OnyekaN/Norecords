import React from 'react';
import ReactDOM from 'react-dom';

class SidebarComponent extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		console.log(this.props.album);
		let album = this.props.album;
		album.songs.sort(function (a, b) {
			return a.song_id - b.song_id;
		});
		return (
			<div id="sidebar">
				<img src={album.art} alt={album.name + " album cover"}/>
				<h3>{album.artist}</h3>
				<h2>{album.name}</h2><br/>
				<ul>
					{album.songs.map(obj => 
						<a key={obj.song_name} href={obj.youtube_link}><li>{obj.song_name}</li></a>
					)}
				</ul>
			</div>		
		);
	}
}

export default SidebarComponent;

