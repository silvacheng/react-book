import React, { Component } from 'react';
import PropTypes from 'prop-types'
export default class CommentInput extends Component{

  static propTypes = {
    onSubmit: PropTypes.func,
    userName: PropTypes.any,
    onUserNameInputBlur: PropTypes.func
  }

  static defaultProps = {
    userName: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      userName: props.userName,
      content: ''
    }
  }

  componentDidMount = () => {
    this.textarea.focus()
  }

  handleUsernameBlur = (event) => {
    if(this.props.onUserNameInputBlur) {
      this.props.onUserNameInputBlur(event.target.value)
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

