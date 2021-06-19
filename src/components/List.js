import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import { addItem, removeItem, toggleItem, modifyItem } from '../actions';

class List extends Component {

  toggleItem(index) {
    this.props.toggleItem(index)
  }

  modify(value, index) {
    this.props.modifyItem(value, index)
  }

  removeItem(index) {
    this.props.removeItem(index)
  }

  render() {
    const { list } = this.props
    return (
      <ul>
        {
          list.map((item, index) => {
            return (
              <li key={index}>
                <div className="row mb10">
                  <div className="col-sm-10">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Checkbox
                          onChange={() => this.toggleItem(index)}
                          checked={item.finished}
                          aria-label="Checkbox for following text input" />
                      </InputGroup.Prepend>
                      <FormControl
                        defaultValue={item.title}
                        autoFocus={false}
                        onKeyDown={(e) => {
                          if (e.keyCode.toString() === '13') {
                            let title = e.target.value
                            this.modify(title, index)
                          }
                        }}
                        aria-label="Text input with checkbox" />
                    </InputGroup>
                  </div>
                  <div className="col-sm-2">
                    <Button className="col-sm-12" variant="outline-danger" onClick={() => this.removeItem(index)}>Delete</Button>
                  </div>
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {
    list: state.getTodoList.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addItem: bindActionCreators(addItem, dispatch),
    removeItem: bindActionCreators(removeItem, dispatch),
    toggleItem: bindActionCreators(toggleItem, dispatch),
    modifyItem: bindActionCreators(modifyItem, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)