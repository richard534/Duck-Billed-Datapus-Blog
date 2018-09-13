import React from "react";
import PropTypes from 'prop-types';
import { withRouteData, Link } from "react-static";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Post from "../containers/post";
import PostHeader from "../containers/postHeader";

const Home = ({ posts, pageNum, totalNumPages }) => (
  <React.Fragment>
    <PostHeader/>

    <div className="grid-main">
      {
        posts.map(post => {
          return (
            <React.Fragment key={post.slug}>
              <Post post={post} />
              <Link to={"/post/" + post.slug + "#comments"}>
                <p id="comments" className="comments">
                  Comments
                </p>
              </Link>
            </React.Fragment>
          );
        })
      }

      <div className="pagination">
        {pageNum != 1 ? <Link className="newer-posts" to={ pageNum == 2 ? "/" : "/page/" + (pageNum - 1)}><div><FontAwesomeIcon icon="arrow-left" width="20" height="20"/> Newer Posts</div></Link> : undefined}
        <div className="page-num">Page {pageNum} of {totalNumPages}</div>
        {pageNum != totalNumPages ? <Link className="older-posts" to={"/page/" + (pageNum + 1)}><div>Older Posts <FontAwesomeIcon icon="arrow-right" width="20" height="20" /></div></Link> : undefined}
      </div>
    </div>

    <div className="navigation-links">
      <Link to="/posts"><p>Index</p></Link>
      <Link to="/post/about-me"><p>About Me</p></Link>
      <a href="https://duckbilleddatapus.com/rss/index.xml" type="application/rss+xml" className="navigation-links-icon"><p><FontAwesomeIcon icon="rss-square" width="20" height="20" /></p></a>
    </div>
  </React.Fragment>
)

Home.propTypes = {
  posts: PropTypes.array,
  pageNum: PropTypes.number,
  totalNumPages: PropTypes.number
}

export default withRouteData(Home);
