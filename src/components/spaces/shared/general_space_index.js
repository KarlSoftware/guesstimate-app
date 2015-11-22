import React, {Component, PropTypes} from 'react'
import Icon from'react-fa'
import { connect } from 'react-redux';
import SpaceList from 'gComponents/spaces/list'
import * as search from 'gModules/search_spaces/actions'

function mapStateToProps(state) {
  return {
    searchSpaces: state.searchSpaces,
    me: state.me
  }
}

@connect(mapStateToProps)
export default class GeneralSpaceIndex extends Component{
  displayName: 'GeneralSpaceIndex'
  componentWillMount(){
    this.props.dispatch(search.fetch('', this._filters()))
  }
  _search(e) {
    this.props.dispatch(search.fetch(e.target.value, this._filters()))
  }
  _nextPage() {
    this.props.dispatch(search.fetchNextPage())
  }
  _filters(){
    if (!_.isUndefined(this.props.userId)){
      return {user_id: this.props.userId}
    } else {
      return {}
    }
  }
  render () {
    const {searchSpaces} = this.props
    let style = {paddingTop: '3em'}
    const spaces = searchSpaces.hits || []
    const hasMorePages = _.isFinite(searchSpaces.page) && (searchSpaces.page < (searchSpaces.nbPages - 1))
    return (
      <div className='wrap container-fluid' style={style}>
        {this.props.children}
        <div className='ui divider'></div>
        <input onChange={this._search.bind(this)}/>
        <div className='spaceList'>
          <SpaceList spaces={spaces} showUsers={true} hasMorePages={hasMorePages} loadMore={this._nextPage.bind(this)}/>
        </div>
      </div>
    )
  }
}