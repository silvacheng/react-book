import React, { Component } from 'react';
import propTypes from 'prop-types';
import CommentList from '../components/CommentList';
import {initComments, deleteComment} from '../reducers/comments';
import { connect } from 'react-redux';
class CommentListContainer extends Component{

  static propTypes = {
    comments: propTypes.array,
    initComments: propTypes.func,
    onDeleteComment: propTypes.func
  }

  componentWillMount = () => {
    this._loadComments()
  }
  
  _loadComments = () => {
    const data = localStorage.getItem('comments')
    let comments = data ? JSON.parse(data) : []
    this.props.initComments(comments) 
  }

  handleDeleteComment = (index) => {
    const { comments } = this.state
    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ]
    localStorage.setItem('comments', JSON.stringify(newComments))
    if(this.props.onDeleteComment) {
      this.props.onDeleteComment(index)
    }
  }

  render() {
    return (
      <div>
          <CommentList
            comments={this.props.comments} 
            onDeleteComment={this.handleDeleteComment.bind(this)}
          />
      </div>
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
    initComments: (comments) => {
      dispatch(initComments(comments))
    },
    onDeleteComment: (commentIndex) => {
      dispatch(deleteComment(commentIndex))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);