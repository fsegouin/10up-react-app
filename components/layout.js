import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import cookies from 'next-cookies'
import fetch from 'isomorphic-unfetch'

import { withAuthSync } from '../utils/auth'
import Nav from './nav'

const Layout = (props) => {
  return (
    <>
      <Head>
        <title>10up Blog</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Nav isLoggedIn={props.data !== undefined} />

      <main>
        <div className="container">{props.children}</div>
      </main>

      <style jsx global>{
        /* CSS */ `
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            color: #333;
            font-family: 'Montserrat', -apple-system, BlinkMacSystemFont,
              sans-serif;
          }

          img {
            width: 100%;
          }

          .container {
            max-width: 65rem;
            margin: 1.5rem auto;
            padding-left: 1rem;
            padding-right: 1rem;
          }
        `
      }</style>
    </>
  )
}

Layout.getInitialProps = async (ctx) => {
  const { token } = cookies(ctx)
  const url = 'https://js1.10up.com/wp-json/jwt-auth/v1/token/validate'

  const redirectOnError = () =>
    // Maybe simply erase token here?
    typeof window !== 'undefined'
      ? Router.push('/login')
      : ctx.res.writeHead(302, { Location: '/login' }).end()

  try {
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${JSON.stringify({ token })}`
      }
    })

    if (response.ok) {
      const json = await response.json()
      return json
    } else {
      return await redirectOnError()
    }
  } catch (error) {
    return redirectOnError()
  }
}

export default withAuthSync(Layout)
