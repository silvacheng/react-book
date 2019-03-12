import React, { Component } from 'react';
import propTypes from 'prop-types'
class Comment extends Component {

  static propTypes = {
    comment: propTypes.object.isRequired,
    index: propTypes.number,
    onDeleteComment: propTypes.func
  }

  constructor() {
    super()
    this.state = {
      timeString: ''
    }
  }

  componentWillMount = () => {
    this._updateTimestring()
    this._timer = setInterval(() => {
      this._updateTimestring()
    }, 5000)
  }

  componentWillUnmount = () => {
    clearInterval(this._timer)
  }

  handleDeleteComment = () => {
    if(this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index)
    }
  }

  _updateTimestring = () => {
    const {comment} = this.props
    const duration = (+Date.now() - comment.createdTime) / 1000
    this.setState({
      timeString: duration > 60 ? `${Math.round(duration /60)}分钟前` : `${Math.round(Math.max(duration, 1))}秒前`
    })
  }

  _getProcessedContent = (content) => {
    return content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
  }

  render() {
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span>{this.props.comment.userName} </span>：
        </div>
        {/* <p>{this.props.comment.content}</p> */}
        <p dangerouslySetInnerHTML={{__html: this._getProcessedContent(this.props.comment.content)}}/>
        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>
        <span 
          onClick={this.handleDeleteComment.bind(this)}
          className='comment-delete'>
          删除
        </span>
      </div>
    )
  }
}
export default Comment;