'use strict'
import React from 'react';
import ReactDOM from 'react-dom';

class SongComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
						<div className="songs">
							<ul>
								{this.props.songs.map(obj =>
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
		)
	}
}

export default SongComponent;
