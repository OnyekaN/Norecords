'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CollectionComponent from './collection.component';
import SidebarComponent from './sidebar.component';

class PlayerComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showSidebar: false,
			album: undefined,
			allAlbums: undefined,
			activeAlbums: undefined,
			keywords: []
		}

		this.albumClick = this.albumClick.bind(this);
		this.closeSidebar = this.closeSidebar.bind(this);
		this.searchAlbums = this.searchAlbums.bind(this);
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
					let string = `${album.name} ${album.artist}`
					keywordsArray.push(string.toLowerCase());
				});
				this.setState({allAlbums: albumsArray, activeAlbums: albumsArray});
				this.setState({keywords: keywordsArray});
			});
	}

	albumClick(album) {
		if ( album == this.state.album ) {
			this.setState({
				showSidebar: !this.state.showSidebar,
				album: album
			});
		}
		else {
			this.setState({
				showSidebar: true,
				album: album
			});
		}
	}

	closeSidebar() {
		this.setState({
			showSidebar: false,
		})
	}

	searchAlbums(e) {
		if ( e.key === 'Enter') {
			let matchAlbums = [],
					text = e.target.value.toLowerCase(),
					searchTerms = text.split(' ');
			for ( let i = 0 ; i < this.state.allAlbums.length ; i++ ) {
				let match = true;
				searchTerms.forEach(searchTerm => {
					if ( this.state.keywords[i].indexOf(searchTerm) == -1 )
						match = false;
				});
				match ? matchAlbums.push(this.state.allAlbums[i]) : null;
			}
			if ( matchAlbums.length )
				this.setState({activeAlbums: matchAlbums});
			else
				this.setState({activeAlbums: this.state.allAlbums});

		}
	}

	render() {
		let album = this.state.album;
		const sidebar = ( <SidebarComponent album={album} closeSidebar={this.closeSidebar}/> );
		return (
			<div>
				<div id="search">
					<input className="search-bar" type="text" onKeyPress={this.searchAlbums}/>
				</div>
				{this.state.showSidebar ? sidebar : null}
				<div id="collection">
					<CollectionComponent activeAlbums={this.state.activeAlbums}
						clickHandler={this.albumClick} />
				</div>
			</div>
		);
	}

}

export default PlayerComponent;
