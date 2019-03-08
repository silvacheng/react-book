import React, { Component } from 'react';
import PropTypes from 'prop-types'
import wrapWithLoadData from './wrapWithLoadData'
class CommentInput extends Component{

  static propTypes = {
    onSubmit: PropTypes.func,
    data: PropTypes.any,
    saveData: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      userName: props.data,
      content: ''
    }
  }

  handleUsernameChange = (event) => {
    this.setState({
      userName: event.target.value
    })
  }

  handleContentChange = (event) => {
    this.setState({
      content: event.target.value
    })
  }

  handleSubmit = () => {
    if(this.props.onSubmit) {
      const {userName, content} = this.state
      let createdTime = +new Date()
      this.props.onSubmit({userName, content, createdTime})
    } 
    this.setState({
      content: ''
    })
  }

  handleUsernameBlur = (event) => {
    this.props.saveData(event.target.value)
  }

  // _setUsername = (name) => {
  //   localStorage.setItem('userName', name)
  // }

  // _loadUsername = () => {
  //   const userName = localStorage.getItem('userName')
  //   if(userName) {
  //     this.setState({userName: userName})
  //   }
  // }

  // componentWillMount = () => {
  //   this._loadUsername()
  // }

  componentDidMount = () => {
    this.textarea.focus()
  }
  
  render() {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input 
              value={this.state.userName} 
              onChange={this.handleUsernameChange.bind(this)}
              onBlur={this.handleUsernameBlur.bind(this)}
            />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea 
              ref={(textarea) => this.textarea = textarea}
              value={this.state.content}
              onChange={this.handleContentChange.bind(this)}
             />
          </div>
        </div>
        <div className='comment-field-button'>
          <button onClick={this.handleSubmit.bind(this)}>
            发布
          </button>
        </div>
      </div>
    )
  }
}
CommentInput = wrapWithLoadData(CommentInput, 'userName')
export default CommentInput;