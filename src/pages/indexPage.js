import React from "react";
import PropTypes from "prop-types";
import { withRouteData, Link } from "react-static";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import PostHeader from "../containers/postHeader";

class IndexPage extends React.Component {
  render() {
    let yearToPostsMap = new Map();
    this.props.posts.map(post => {
      let postYear = post.date.split(' ')[2];
      if (yearToPostsMap.has(`${postYear}`)) {
        // get the blog post array assocated with this year key. Append the post
        let currentVal = yearToPostsMap.get(`${postYear}`);
        yearToPostsMap.set(`${postYear}`, currentVal.concat(post));
      } else {
        // add new year key to object, associate it with an array containing the blog post
        yearToPostsMap.set(`${postYear}`, [post]);
      }
    })
    let yearToPostsArray = Array.from(yearToPostsMap);
    
    return (
      <React.Fragment>
        <PostHeader />
        <div className="grid-main">
          {
            yearToPostsArray.map(postYearGroup => {
              return (
                <div key={postYearGroup[0]} className="index-header-date">{postYearGroup[0]}
                  {
                    postYearGroup[1].map(post => {
                      return (
                        <div key={post.slug} className="index-body">
                          <p className="index-body-date">{post.date.split(' ').slice(0,2).join(' ')}</p>
                          <Link to={`/post/${post.slug}`}><p className="index-body-title">{post.title}</p></Link>
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
        <div className="navigation-links">
          <Link to="/posts"><p>Index</p></Link>
          <Link to="/post/about-me"><p>About Me</p></Link>
          <a href="https://duckbilleddatapus.com/rss/index.xml" type="application/rss+xml" className="navigation-links-icon"><p><FontAwesomeIcon icon="rss-square" width="20" height="20"/></p></a>
        </div>
      </React.Fragment>
    );
  }
}

IndexPage.propTypes = {
  posts: PropTypes.array
};

export default withRouteData(IndexPage);
