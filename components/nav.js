import React from 'react'
import Link from 'next/link'

const Nav = () => (
  <nav>
    <div className="title">
      <Link href="/">
        <a>10up Blog</a>
      </Link>
    </div>
    <ul>
      <li>
        <Link href="/about">
          <a>About</a>
        </Link>
      </li>
      <li>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
      </li>
    </ul>

    <style jsx>{
      /* CSS */ `
        nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background-color: rgba(0, 0, 0, 0.22);
        }
        ul {
          display: flex;
          justify-content: flex-end;
        }
        li {
          display: flex;
          padding: 8px;
        }
        a {
          color: inherit;
          text-decoration: none;
          font-size: 13px;
        }
        .title a {
          font-size: 1.33em;
        }
      `
    }</style>
  </nav>
)

export default Nav
