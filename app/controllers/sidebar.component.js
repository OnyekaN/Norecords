'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import SongComponent from './song.component';

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
						<div className="songs">
							<ul>
								{album.songs.map(obj =>
								 	obj.youtube_link != 'N/A' ?
										(
										<li key={obj.song_name}>
											<a href={obj.youtube_link}
													target="yt_iframe">
												<img className="sidebar-play-button" src="images/play-button.png" style={{verticalAlign: 'middle'}} alt="play button"/><span>{obj.song_name}</span>
											</a>
										</li>
										) :
										(
										<li key={obj.song_name} style={{color:'#555', fontSize:'1em'}}>{obj.song_name}</li> 
										)
									)}
							</ul>
						</div>
					</div>
					<div className="iframe-container">
						<iframe height="200px" width="200px" src="" frameBorder="0"  name="yt_iframe"></iframe>
					</div>

				</div>
			</div>		
		);
	}
}

export default SidebarComponent;

