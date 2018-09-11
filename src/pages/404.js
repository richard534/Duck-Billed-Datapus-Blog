import React from 'react'
import { Link } from "react-static";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import PostHeader from "../containers/postHeader";

export default () => (
    
  <React.Fragment>
    <PostHeader/>

    <div className="grid-main">
      404 Page not found :(
    </div>

    <div className="navigation-links">
      <Link to="/posts"><p>Index</p></Link>
      <Link to="/post/about-me"><p>About Me</p></Link>
      <a href="https://duckbilleddatapus.com/rss/index.xml" type="application/rss+xml" className="navigation-links-icon"><p><FontAwesomeIcon icon="rss-square" width="20" height="20"/></p></a>
    </div>
  </React.Fragment>


)
