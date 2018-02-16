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
			page: 1,
		}
		this.loadItems = this.loadItems.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		let loaded = undefined;
		if ( nextProps.activeAlbums.length < 50 ) {
			this.setState({hasMoreItems: false});
			loaded = nextProps.activeAlbums;
		} else {
			loaded = nextProps.activeAlbums.slice(0, 50);
			this.setState({hasMoreItems: true, page: 1});
		}
		this.setState({activeAlbums: nextProps.activeAlbums, loadedAlbums: loaded});
	}

	shouldComponentUpdate(nextProps) {
		if ( typeof nextProps.update === 'undefined' )
			return true
		else return ( nextProps.update )
	}

	loadItems(cycle) {
		if ( this.state.activeAlbums ) {
			this.setState({page: this.state.page + 1});
			let loadedAlbums = this.state.loadedAlbums,
					page = this.state.page,
					initial = 2,
					start = (page - initial) * 50,
					end = (page - initial + 1) * 50;

			if ( this.state.hasMoreItems ) {
				if ( !!start ) {
					loadedAlbums = loadedAlbums.concat(this.state.activeAlbums.slice(start, end));
				}
				this.setState({loadedAlbums: loadedAlbums});
				this.forceUpdate()
				if ( end > this.state.activeAlbums.length )
					this.setState({hasMoreItems: false}); return;
			}
		}
	}

	render() {
		let collection = !this.state.activeAlbums ? null :
			( this.state.loadedAlbums.map(obj => { return (
									<AlbumComponent
										key={Math.random()}
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

