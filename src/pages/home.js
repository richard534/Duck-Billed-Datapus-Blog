import React from "react";
import { withRouteData, Link } from "react-static";
import Post from "../containers/post";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Home = ({ posts, pageNum, totalNumPages }) => (
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
      {posts.map(post => <Post key={post.slug} post={post} />)}
      <div className="pagination">
        {pageNum != 1 ? <Link to={ pageNum == 2 ? "/" : "/page/" + (pageNum - 1)}><div className="newer-posts"><FontAwesomeIcon icon="arrow-left" /> Newer Posts</div></Link> : undefined}
        <div className="page-num">Page {pageNum} of {totalNumPages}</div>
        {pageNum != totalNumPages ? <Link to={"/page/" + (pageNum + 1)}><div className="older-posts">Older Posts <FontAwesomeIcon icon="arrow-right" /></div></Link> : undefined}
      </div>
    </div>

    <div className="navigation-links">
      <p>Index</p>
      <p>About Me</p>
    </div>
  </div>
)

export default withRouteData(Home);
