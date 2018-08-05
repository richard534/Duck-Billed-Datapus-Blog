import React from "react";
import { withRouteData, Link } from "react-static";
import Post from "../containers/post";

const PostPage = ({ post }) => (
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
      <Post key={post.slug} post={post} />
    </div>

    <div className="navigation-links">
      <p>Index</p>
      <p>About Me</p>
    </div>
  </div>
)

export default withRouteData(PostPage);
