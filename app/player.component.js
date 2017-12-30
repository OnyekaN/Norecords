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
			albums: undefined
		}

		this.albumClick = this.albumClick.bind(this);
		this.closeSidebar = this.closeSidebar.bind(this);
	}
	
	componentDidMount() {
		axios.get('/api/sorted_albums/')
			.then(res => {
				const albums = res.data;	
				const albumsArray = $.map(albums, (value, index) => {
					return [value];
				});	
				albumsArray.sort((a,b) => {
					if ( a.artist < b.artist ) { return -1}
					if ( b.artist < a.artist ) { return 1}
					return 0;
				});
				this.setState({albums: albumsArray});
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

	searchAlbums() {
		let foundAlbums = [] 	
	}

	render() {
		let album = this.state.album;
		const sidebar = ( <SidebarComponent album={album} closeSidebar={this.closeSidebar}/> );
		return (
			<div>
				<div id="search">
					<input className="search-bar" type="text"/>
				</div>
				{this.state.showSidebar ? sidebar : null} 
				<div id="collection">
					<CollectionComponent activeAlbums={this.state.albums} 
						clickHandler={this.albumClick} sidebar={this.state.showSidebar} />
				</div>
			</div>
		);
	}

}

export default PlayerComponent;
