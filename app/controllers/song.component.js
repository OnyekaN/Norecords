'use strict'
import React from 'react';
import ReactDOM from 'react-dom';

class SongComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		}
	}

	componentDidMount() {
	}

	render() {
		let {artist, song} = this.props;
		console.log({artist, song});
		return (
			<p>This is a song component</p>
		)
	}
}

export default SongComponent;
