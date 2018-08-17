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
  post: PropTypes.object
}

export default withRouteData(PostPage);
