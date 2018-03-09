'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SearchComponent from './search.component';
import SidebarComponent from './sidebar.component';
import CollectionComponent from './collection.component';

class PlayerComponent extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			updateColl: true,
			showSidebar: false,
			album: undefined,
			allAlbums: undefined,
			activeAlbums: undefined,
			keywords: [],
			ytActive: ""
		}

		this.albumsByArtist = undefined;
		this.albumsByAlbumName = undefined;
		this.albumsByYear = undefined;
		this.albumClick = this.albumClick.bind(this);
		this.closeSidebar = this.closeSidebar.bind(this);
		this.searchAlbums = this.searchAlbums.bind(this);
		this.sortAlbumsBy = this.sortAlbumsBy.bind(this);
		this.closeYtPlayer = this.closeYtPlayer.bind(this);
		this.ytPlayerEvent = this.ytPlayerEvent.bind(this);
		this.ytScriptInit();
		this.ytPlayerContainer = document.getElementsByClassName('yt-player-container')[0];

		window['onYouTubeIframeAPIReady'] = (e) => {
				this.YT = window['YT'];
				this.ytPlayer = new window['YT'].Player('player', {
					videoId: '',
				});
			};

	}

	componentDidMount() {

		axios.get('/api/sorted_albums/')
			.then(res => {
				let albums = res.data,
						albumsArray = $.map(albums, (value, index) => {
					return [value];
				});
				albumsArray.sort((a,b) => {
					if ( a.artist < b.artist ) { return -1}
					if ( b.artist < a.artist ) { return 1}
					return 0;
				});
				let keywordsArray = [];
				albumsArray.forEach(album => {
					let string = `${album.name} ${album.artist} ${album.genre} ${album.year}`
					keywordsArray.push(string.toLowerCase());
				});
				this.albumsByArtist = albumsArray;
				this.setState({allAlbums: albumsArray, activeAlbums: albumsArray});
				this.setState({keywords: keywordsArray});
			});

	}

	albumClick(album) {

		if ( album == this.state.album ) {
			this.setState({
				showSidebar: !this.state.showSidebar,
				album: album,
				updateColl: false
			});
		}
		else {
			this.setState({
				showSidebar: true,
				album: album,
				updateColl: false
			});
		}
	}

	closeSidebar() {

		this.setState({
			showSidebar: false,
			updateColl: false
		})
	}

	ytScriptInit() {
		let tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/iframe_api';
 		let firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	ytPlayerEvent(videoIDs, index) {
		if ( this.ytPlayer ) {
			this.setState({ytActive: "yt-appear-active"});
			this.ytPlayer.loadPlaylist(videoIDs, index);
		}
	}

	closeYtPlayer() {
		this.setState({ytActive: ""});
		this.ytPlayer.stopVideo();
	}

	searchAlbums(text) {

		if ( !text ) {
			this.setState({activeAlbums: this.albumsByArtist, updateColl: true});
			return;
		}

		let matchAlbums = [],
				searchText = text.toLowerCase(),
				searchTerms = searchText.split(' ');

		for ( let i = 0 ; i < this.albumsByArtist.length ; i++ ) {
			let match = true;
			searchTerms.forEach(searchTerm => {
				if ( this.state.keywords[i].indexOf(searchTerm) == -1 )
					match = false;
			});
			match ? matchAlbums.push(this.albumsByArtist[i]) : null;

			if ( matchAlbums.length ) {
				this.setState({activeAlbums: matchAlbums, updateColl: true});
				if ( window.pageYOffset > 120 ) {
					window.scrollTo(0, 120);
				}
			}
			else this.setState({activeAlbums: [], updateColl: true});
		}
	}

	sortAlbumsBy(sortOption) {

		switch(sortOption) {
			case 'Artist':
				this.setState({allAlbums: this.albumsByArtist, activeAlbums: this.albumsByArtist,
												updateColl: true});
				break;
			case 'Album':
				if ( !this.albumsByAlbumName ) {
					this.albumsByAlbumName = this.albumsByArtist.slice(0);
					this.albumsByAlbumName.sort((a,b) => {
					let nameA = a.name.toLowerCase(),
							nameB = b.name.toLowerCase();
					if ( nameA < nameB )
						return -1;
					if ( nameA > nameB )
						return 1;
					return 0;
					});
				}
				this.setState({allAlbums: this.albumsByAlbumName, activeAlbums: this.albumsByAlbumName,
												updateColl: true});
				break;
			case 'Year':
				if ( !this.albumsByYear ) {
					this.albumsByYear = this.albumsByArtist.slice(0);
					this.albumsByYear.sort((a,b) => {
					let yearA = a.year,
							yearB = b.year;
					if ( yearA > yearB )
						return -1;
					if ( yearA < yearB )
						return 1;
					return 0;
					});
				}
				this.setState({allAlbums: this.albumsByYear, activeAlbums: this.albumsByYear,
												updateColl: true});
				break;
						default:
					console.log(sortOption);
		}
		if ( window.pageYOffset > 120 ) {
					window.scrollTo(0, 120);
				}
	}

	render() {

		let album = this.state.album;
		const sidebar = ( <SidebarComponent album={album} closeSidebar={this.closeSidebar}
												ytPlayerEvent={this.ytPlayerEvent}/> );

		return (
			<div>
				<SearchComponent searchHandler={this.searchAlbums} sortHandler={this.sortAlbumsBy}/>
				{this.state.showSidebar ? sidebar : null}

				<div id="collection">
					<CollectionComponent activeAlbums={this.state.activeAlbums}
						clickHandler={this.albumClick} update={this.state.updateColl}/>
				</div>
				<div className={"yt-player-container yt-appear "+this.state.ytActive}>
					<a onClick={this.closeYtPlayer}>
						<span className="yt-close-icon">
							<i className="fas fa-times-circle"></i>
						</span>
					</a>
					<div id="player" className="embed-responsive embed-responsive-16by9"
						style={{height:'200px', width:'200px'}}>
					</div>
				</div>

			</div>
		);
	}

}

export default PlayerComponent;
