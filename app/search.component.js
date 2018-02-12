'use strict'
import React from 'react'
import ReacDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SearchComponent extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			searchText: null,
		}

		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch(e) {
		if ( e.key === 'Enter' ) {
			let searchText = e.target.value.toLowerCase();
			this.props.searchHandler(searchText);
			this.setState({searchText: searchText});
		}
	}

	render() {
		const searchStatus = (
								<div className='search-display'>
									<span className='search-clear'><i className="far fa-times-circle"/></span>
									<span>{this.state.searchText}</span>
								</div>
							);

		return (
			<div>
				<ReactCSSTransitionGroup
					transitionName="search"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnter={false}
					transitionLeave={false}>

					<div className="search-box" key="search-box">
						<div className="search-container">
							<span className="search-icon"><i className="fa fa-search"/></span>
							<input id="search" type="text"
								placeholder="Search..." onKeyPress={this.handleSearch}/>
						</div>
					</div>

				</ReactCSSTransitionGroup>

			{this.state.searchText ? searchStatus : null}

			</div>
		);

	}

}

export default SearchComponent;
