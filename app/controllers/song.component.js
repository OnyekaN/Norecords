'use strict'
import React from 'react';
import ReactDOM from 'react-dom';

class SongComponent extends React.Component {
	constructor(props) {
		super(props);

		this.songClick = this.songClick.bind(this);
	}

	componentDidMount() {
		this.songs = this.props.songs;
		this.videoIDs = this.songs.map((obj, index) => {
					obj.index = index;
					return obj.youtube_link.replace('https://youtube.com/embed/', '')
							.replace('?autoplay=1', '');
				});
	}

	songClick(index) {
		console.log(this.videoIDs);
		this.props.ytPlayerEvent(this.videoIDs.join(','), index);
	}

	render() {

		return (
						<div className="songs">
							<ul>
								{this.props.songs.map((obj, index) =>
								 	obj.youtube_link != 'N/A' ?
										(
											<li key={obj.song_name}>
												<a onClick={(e) => this.songClick(index)}>
													<img className="sidebar-play-button" src="images/play-button.png"
														style={{verticalAlign: 'middle'}} alt="play button"/>
													<span>{obj.song_name}</span>
												</a>
											</li>
										) :
										(
											<li key={obj.song_name} style={{color:'#888', fontSize:'1em'}}>
												{obj.song_name}
											</li>
										)
								)}
							</ul>
						</div>
		)
	}
}

export default SongComponent;

