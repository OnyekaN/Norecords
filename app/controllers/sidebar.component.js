'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import SongsComponent from './song.component';


class SidebarComponent extends React.Component {
	constructor(props) {
		super(props);
		this.ytScriptInit();
		this.video = '';

		window['onYouTubeIframeAPIReady'] = (e) => {
				this.YT = window['YT'];
				this.player = new window['YT'].Player('player', {
					videoId: '',
					events: {
						'onStateChange': this.onPlayerStateChange.bind(this),
						'onReady': (e) => {
						}
					}
				});
			};


		this.ytPlayerEvent = this.ytPlayerEvent.bind(this);
	}

	ytScriptInit() {
		let tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/iframe_api';
 		let firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	ytPlayerEvent(videoIDs, index) {
		if ( this.player ) {
			this.player.loadPlaylist(videoIDs, index);
		}
	}

	onPlayerStateChange(event) {
			console.log(event)
			switch (event.data) {
				case window['YT'].PlayerState.PLAYING:
					break;
				case window['YT'].PlayerState.ENDED:
					console.log('ended ');
					break;
			};
		};

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
						<SongsComponent songs={album.songs} ytPlayerEvent={this.ytPlayerEvent}/>
					</div>
					<div className="iframe-container">
						<div className="embed-responsive embed-responsive-16by9" id="player"
								style={{height:'200px',width:'200px'}}></div>
					</div>
				</div>
			</div>
		);
	}
}

export default SidebarComponent;

