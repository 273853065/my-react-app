import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addItem } from '../actions'

class Input extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  addTodo(value) {
    this.props.addItem(value)
    this.setState({ value: '' })
  }

  render() {
    return (
      <div>
        <div className="col-sm-12 mb10 pr0">
          <input
            id="todo_input"
            className="form-control"
            placeholder="Please enter TODO"
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
            onKeyDown={e => {
              if (e.key === "Enter") {
                let title = e.target.value;
                if (title.length > 0) {
                  this.addTodo(title);
                }
              }
            }
            }
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    text: ''
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addItem: bindActionCreators(addItem, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input)