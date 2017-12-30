'use strict'
import React from 'react';
import ReactDOM from 'react-dom';

class AlbumComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			album: this.props.album,	
		}
		
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.clickHandler(this.state.album);
	}

	render() {
		return (	
			<div className="img-container"
			 onClick={this.handleClick}>
				<img className="thumb-img" src={this.state.album.art} alt={this.state.album.name} />
					<div>	
						<span>{this.state.album.name} - {this.state.album.artist}</span>
					</div>
			</div>
		)	
	}

}

export default AlbumComponent;
