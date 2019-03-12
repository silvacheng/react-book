import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentInput from '../components/CommentInput';
import { addComment } from '../reducers/comments';
import { connect } from 'react-redux';
class CommentInputContainer extends Component{

  static propTypes = {
    comments: PropTypes.array,
    onSubmit: PropTypes.func
  }

  constructor() {
    super()
    this.state = {
      userName: ''
    }
  }

  componentWillMount = () => {
    this._loadUsername()
  }
  
  _loadUsername = () => {
    const userName = localStorage.getItem('userName')
    if(userName) {
      this.setState({userName})
    }
  }

  _saveUsername = (userName) => {
    localStorage.setItem('userName', userName)
  }

  handleSubmitComment = (comment) => {
    if(!comment) return
    if(!comment.userName) return alert('请输入用户名')
    if(!comment.content) return alert('请输入评论内容')
    const { comments } = this.props
    const newComments = [...comments, comment]
    localStorage.setItem('comments', JSON.stringify(newComments))
    if(this.props.onSubmit) {
      this.props.onSubmit(comment)
    }
  }
  
  render() {
    return (
      <CommentInput 
        userName={this.state.userName}
        onUserNameInputBlur={this._saveUsername.bind(this)}
        onSubmit={this.handleSubmitComment.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (comment) => {
      dispatch(addComment(comment))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInputContainer);