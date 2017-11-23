'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import SongComponent from './song.component';

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
			<div id="sidebar" className="container-fluid">
				<div className="row">
					<div className="col-md-3 col-sm-3 col-xs-3">
						<button type="button" className= "btn btn-default btn-xs" onClick={this.props.closeSidebar}>X</button>
						<img className="sidebar-image-icon" src={album.art} alt={album.name + " album cover"}/>
					</div>
					<div className="col-md-6 col-sm-6 col-xs-4">
						<h3>{album.artist}</h3>
						<h2><b>{album.name}</b></h2>
						<div className="songs">
							<ul>
								{album.songs.map(obj => 
								 	obj.youtube_link != 'N/A' ? 	
										( 
										<li key={obj.song_name}>
											<a href={obj.youtube_link.replace('watch?v=', 'embed/')+"?autoplay=1"} 
													target="yt_iframe">
												<img className="sidebar-play-button" src="images/play-button.png" 
													alt="play button"/>{obj.song_name}
											</a>
										</li> 
										) :
										(
										<li key={obj.song_name}>{obj.song_name}</li> 
										)
									)}
							</ul>
						</div>
					</div>
						<iframe height="200px" width="200px" src="" frameBorder="0"  name="yt_iframe"></iframe>

				</div>
			</div>		
		);
	}
}

export default SidebarComponent;

