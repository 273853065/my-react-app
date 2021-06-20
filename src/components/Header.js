import React, {Component} from 'react'
import {connect} from 'react-redux'
class Header extends Component {

  render() {
    const {list} = this.props
    let count = 0
    list.map(item => count = !item.finished ? count + 1 : count)
    return (
      <div>
        <h3 className="text-center">My Todos</h3>
        <h5>{count ? `You have ${count} Todo(s), please deal with.` : `There is no Todo, just add it.`}</h5>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    list: state.getTodoList.list
  }
}

export default connect(mapStateToProps)(Header)