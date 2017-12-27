'use strict'
import React from 'react';
import ReactDOM from 'react-dom';

class CollectionComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			albums: this.props.collection,
			songs: []
		}
	}
	
	componentDidMount() {
	}

	render() {
		let collection = !this.props.collection ? null :
			( this.props.collection.map(obj => { return (
									<Album				
										key={obj.name}
										album={obj}
										clickHandler={this.props.clickHandler}
									/> )
								}) 
			)
		return (
			<div>
				{collection}
			</div>
		);
	}

}

const Album = props => {
	const handleClick = () => {
		props.clickHandler(props.album)
	}

	return (	
		<div className="img-container"
		 onClick={handleClick}>
			<img className="thumb-img" src={props.album.art} alt={props.album.name} />
				<div>	
					<span>{props.album.name} - {props.album.artist}</span>
				</div>
		</div>
	)
}

export default CollectionComponent;

