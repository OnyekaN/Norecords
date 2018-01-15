'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import InfiniteScroll from 'react-infinite-scroller';
import AlbumComponent from './album.component';

class CollectionComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeAlbums: this.props.activeAlbums,
			loadedAlbums: [],
			hasMoreItems: true,
			//songs: []
		}
		this.loadItems = this.loadItems.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({activeAlbums: nextProps.activeAlbums, loadedAlbums: nextProps.activeAlbums});
	}

	loadItems(page) {
		if ( this.state.activeAlbums ) {
			let loadedAlbums = this.state.loadedAlbums,
					initial = 2,
					start = (page - initial) * 50,
					end = (page - initial + 1) * 50;

			if ( this.state.hasMoreItems ) {
				loadedAlbums = loadedAlbums.concat(this.state.activeAlbums.slice(start, end));
				this.setState({loadedAlbums: loadedAlbums});
				if ( end > this.state.activeAlbums.length )
					this.setState({hasMoreItems: false}); return;
			}
		}
	}

	render() {
		console.log(this.state)
		let collection = !this.state.loadedAlbums ? null :
			( this.state.loadedAlbums.map(obj => { return (
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

