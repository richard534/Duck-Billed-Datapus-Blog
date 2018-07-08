import React from 'react'
import { withRouteData, Link } from 'react-static'
import convert from 'htmr'

export default withRouteData(({ post }) => (
  <div className="grid-main">
      <div className="blog-post">
        <p className="date-stamp">{post.date}</p>
        <header>{post.title}</header>
        <div className="blog-content" dangerouslySetInnerHTML={{__html:post.contents}} />;
        {/* {convert(post.contents)} */}
      </div>
      <p className="comments">Comments (20)</p>

  </div>
))
