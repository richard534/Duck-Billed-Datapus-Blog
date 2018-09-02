import React from "react";
import PropTypes from 'prop-types';
import { withRouteData, Link } from "react-static";
import ReactDisqusComments from 'react-disqus-comments';

import Post from "../containers/post";
import PostHeader from "../containers/postHeader";

class PostPage extends React.Component {
  render() {
    // Optionally render nextPost Link 
    let nextPostLink;
    let nextPost = this.props.nextPost
    if(nextPost) {
      nextPostLink = (
        <Link to={"/post/" + nextPost.slug}>
          <div className="post-nav-header">Next Post</div>
          <div className="post-nav-body">{nextPost.title}</div>
        </Link>
      )
    }
    
    // Optionally render previousPost Link
    let previousPostLink;
    let previousPost = this.props.previousPost
    if(previousPost) {
      previousPostLink = (
        <Link to={"/post/" + previousPost.slug}>
          <div className="post-nav-header">Previous Post</div>
          <div className="post-nav-body">{previousPost.title}</div>
        </Link>
      )
    }
    
    return (
      <React.Fragment>
        <PostHeader/>

        <div className="grid-main">
          <Post key={this.props.post.slug} post={this.props.post} />
          <div className="post-navigation">
            {nextPostLink}
            {previousPostLink}
          </div>
          <ReactDisqusComments
            shortname="duckbilleddatapus-1"
            identifier={this.props.post.slug}
            title={this.props.post.title}
          />
        </div>

        <div className="navigation-links">
          <Link to="/posts"><p>Index</p></Link>
          <Link to="/post/about-me"><p>About Me</p></Link>
        </div>
      </React.Fragment>
    )
  }
}

PostPage.propTypes = {
  post: PropTypes.object,
  nextPost: PropTypes.object,
  previousPost: PropTypes.object
}

export default withRouteData(PostPage);
