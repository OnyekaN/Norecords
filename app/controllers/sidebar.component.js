'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import SongsComponent from './song.component';


class SidebarComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let album = this.props.album,
				yearGenre = [];
		if ( album.genre ) yearGenre.push(album.genre);
		if ( album.year ) yearGenre.push(album.year);
		yearGenre = yearGenre.join(" · ");

		album.songs.sort(function (a, b) {
			return a.song_id - b.song_id;
		});

		return (
			<div id="sidebar" className="">
				<div className="sidebar-container">
					<button type="button" className="" onClick={this.props.closeSidebar}>X</button>
					<div className="album-image-container">
						<img className="sidebar-album-image" src={album.art} alt={album.name + " album cover"}/>
					</div>
					<div className="songs-container">
						<h3>{album.artist}</h3>
						<h2><b>{album.name}</b></h2>
						<h4>{yearGenre}</h4>
						<SongsComponent songs={album.songs} ytPlayerEvent={this.props.ytPlayerEvent}/>
					</div>
				</div>
			</div>
		);
	}
}

export default SidebarComponent;

