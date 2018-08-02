import React from 'react'
import { withRouteData, Link } from 'react-static'

export default withRouteData(({ post }) => (
      <div className="blog-post">
        <p className="date-stamp">{post.date}</p>
        <div className="blog-content" dangerouslySetInnerHTML={{__html:post.contents}} />
        <p className="comments">Comments (20)</p>
      </div>
))
