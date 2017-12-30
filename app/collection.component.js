'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import InfiniteScroll from 'react-infinite-scroller';
import AlbumComponent from './album.component';

class CollectionComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			albums: this.props.activeAlbums,
			displayAlbums: [], 
			hasMoreItems: true,
			songs: []
		}

		this.loadItems = this.loadItems.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({albums: nextProps.activeAlbums});
	}
	
	loadItems(page) {
		if ( this.state.albums ) {
			let displayAlbums = this.state.displayAlbums,
					initial = 2,
					start = (page - initial) * 50,
					end = (page - initial + 1) * 50;

			if ( this.state.hasMoreItems ) {
				displayAlbums = displayAlbums.concat(this.state.albums.slice(start, end));			
				this.setState({displayAlbums: displayAlbums});
				if ( end > this.state.albums.length )
					this.setState({hasMoreItems: false}); return;
			}	
		}
	}

	render() {
		let collection = !this.state.displayAlbums ? null :
			( this.state.displayAlbums.map(obj => { return (
									<AlbumComponent
										key={obj.name}
										album={obj}
										clickHandler={this.props.clickHandler}
									/> )
								}) 
			)
		return (
			<InfiniteScroll
				pageStart={0}
				threshold={2000}
				loadMore={this.loadItems}
				hasMore={this.state.hasMoreItems}>
				<div id="infinite-container">
					{collection}
				</div>
			</InfiniteScroll>
		);
	}

}

export default CollectionComponent;

