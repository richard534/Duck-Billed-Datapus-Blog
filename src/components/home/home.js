import React from 'react'
import { withSiteData } from 'react-static'

const Welcome = ({ siteTitle }) => (
  <div className="grid-container">
    <div className="navbar-background">
      <div className="navbar">
        <img src="https://s3-eu-west-1.amazonaws.com/duck-billed-datapus/public/duck-billed-dev.png" />
      </div>
    </div>

    <div className="header-background">
      <div className="header">
        <header>Duck Billed Datapus</header>
        <p>A programming blog of sorts</p>
      </div>
    </div>

    <div className="grid-main">
      <div className="blog-post">
        <p className="date-stamp">31 Dec 2018</p>
        <header>Getting Started With Data Engineering</header>
        <article>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
          totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
          magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
          dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
          dolore magnam aliquam quaerat voluptatem.
          <img className="img-fluid" src="https://s3.eu-west-2.amazonaws.com/streamlo/static/belfast1.jpg" />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
          totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
          magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
          dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
          dolore magnam aliquam quaerat voluptatem.
        </article>
        <p className="comments">Comments (20)</p>
      </div>
      <div className="blog-post">
        <p className="date-stamp">31 Dec 2018</p>
        <header className="post-title">Getting Started With Data Engineering</header>
        <article>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
          totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
          magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
          dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
          dolore magnam aliquam quaerat voluptatem.
          <img className="img-fluid" src="https://s3.eu-west-2.amazonaws.com/streamlo/static/belfast1.jpg" />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
          totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
          magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
          dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
          dolore magnam aliquam quaerat voluptatem.
        </article>
        <p className="comments">Comments (20)</p>
      </div>
      <nav className="pagination">
        <p className="page-num">Page 1 of 100</p>
        <p className="older-posts">
          Next Page <i className="fas fa-arrow-right" />
        </p>
      </nav>
    </div>
    <div className="navigation-links">
      <p>Index</p>
      <p>About Me</p>
    </div>
  </div>
)

export default withSiteData(Welcome)
