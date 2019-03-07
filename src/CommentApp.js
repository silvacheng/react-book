import React, { Component } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

class CommentApp extends Component {

  constructor() {
    super()
    this.state = {
      comments: []
    }
  }

  _saveComments = (comments) => {
    localStorage.setItem('comments', JSON.stringify(comments))
  }

  _loadComments = () => {
    let comments = localStorage.getItem('comments')
    if(comments) {
      comments = JSON.parse(comments)
      this.setState({comments})
    }
  }

  handleSubmitContent = (comment) => {
    if (!comment) return
    if (!comment.userName) return alert('请输入用户名')
    if (!comment.content) return alert('请输入评论内容')
    const comments = this.state.comments
    comments.unshift(comment)
    this.setState({comments})
    this._saveComments(comments)
  }

  handleDeleteComment= (index) => {
    const comments = this.state.comments
    comments.splice(index, 1)
    this.setState({comments})
    this._saveComments(comments)
  }
  
  componentWillMount = () => {
    this._loadComments()
  }

  render() {
    return (
      <div className='wrapper'>
        <CommentInput 
          onSubmit={this.handleSubmitContent.bind(this)}
        />
        <CommentList 
        onDeleteComment={this.handleDeleteComment.bind(this)}
        comments={this.state.comments} />  
      </div>
    )
  }
}

export default CommentApp