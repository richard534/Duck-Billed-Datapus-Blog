import React from "react";
import PropTypes from 'prop-types';
import { withRouteData, Link } from "react-static";
import Post from "../containers/post";

class PostPage extends React.Component {
  componentDidMount () {
    var disqus_config = function () {
      this.page.url = window.location.href;
      this.page.identifier = this.props.post.slug;
      this.page.title = this.props.post.title;
    };
    
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://duckbilleddatapus.disqus.com/embed.js';
    script.setAttribute('data-timestamp', +new Date())
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  
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
      <div className="grid-container">
        <div className="navbar-background">
          <div className="navbar">
            <Link to="/"><img src="https://s3-eu-west-1.amazonaws.com/duck-billed-datapus/public/duck-billed-dev.png" /></Link>
          </div>
        </div>

        <div className="header-background">
          <div className="header">
            <header>Duck Billed Datapus</header>
            <p>A programming blog of sorts</p>
          </div>
        </div>

        <div className="grid-main">
          <Post key={this.props.post.slug} post={this.props.post} />
          <div className="post-navigation">
            {nextPostLink}
            {previousPostLink}
          </div>
          <div className="comments" id="disqus_thread" />
        </div>

        <div className="navigation-links">
          <Link to="/post/about-me"><p>About Me</p></Link>
        </div>
      </div>
    )
  }
}

PostPage.propTypes = {
  post: PropTypes.object,
  nextPost: PropTypes.object,
  previousPost: PropTypes.object
}

export default withRouteData(PostPage);
