import { useEffect } from 'react'
import Router from 'next/router'
import cookies from 'next-cookies'
import cookie from 'js-cookie'
import fetch from 'isomorphic-unfetch'

export const login = ({ token }) => {
  // Set cookie with JWT token and set expiry
  // date to 31 days from now
  cookie.set('token', token, { expires: 31 })
  Router.push('/profile')
}

export const auth = async (ctx) => {
  const { token } = cookies(ctx)
  // NOTE: If there's no token, this means the user is
  // not logged in, redirect to the login form
  if (!token) {
    // Handle SSR
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/login' })
      ctx.res.end()
    } else {
      Router.push('/login')
    }
  }
  // NOTE:
  // Request header field authentication is not allowed
  // by Access-Control-Allow-Headers in preflight response
  // on this endpoint so I had to disable handling the token
  // validation.
  //
  /* else {
    try {
      const url = 'https://js1.10up.com/wp-json/jwt-auth/v1/token/validate'
      const response = await fetch(url, {
        method: 'POST',
        headers: { Authentication: `Bearer ${token}` }
      })
      if (response.status !== 200) {
        debugger
        const error = new Error(response.status)
        throw error
      }
    } catch (error) {
      // Handle SSR
      if (typeof window === 'undefined') {
        ctx.res.writeHead(302, { Location: '/login' })
        ctx.res.end()
      } else {
        logout()
      }
    }
  }
  */
  return token
}

export const logout = () => {
  cookie.remove('token')
  // NOTE: Send logout event for all open windows
  window.localStorage.setItem('logout', Date.now())
  Router.push('/login')
}

// HOC Auth
export const withAuthSync = (WrappedComponent) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/login')
      }
    }
    useEffect(() => {
      window.addEventListener('storage', syncLogout)
      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [])
    return <WrappedComponent {...props} />
  }

  Wrapper.getInitialProps = async (ctx) => {
    const token = auth(ctx)
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))
    return { ...componentProps, token }
  }

  return Wrapper
}
