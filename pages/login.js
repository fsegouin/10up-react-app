import React, { useState } from 'react'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'

import Layout from '../components/layout'
import { login } from '../utils/auth'

const Login = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    error: ''
  })

  const handleForm = async (e) => {
    e.preventDefault()
    setUserData(Object.assign({}, userData, { error: '' }))

    const username = userData.username
    const password = userData.password
    const url = 'https://js1.10up.com/wp-json/jwt-auth/v1/token'

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (response.status === 200) {
        const { token } = await response.json()
        await login({ token })
      } else {
        const error = new Error(response.status)
        error.response = response
        throw error
      }
    } catch (error) {
      const { response } = error
      setUserData(
        Object.assign({}, userData, {
          error:
            response.status === 403
              ? 'There seems to be a problem with your credentials. Please try again!'
              : `There seems to be a problem with the server (error ${response.status}). Please try again later`
        })
      )
    }
  }

  return (
    <Layout>
      <div className="form">
        <form onSubmit={handleForm}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={(e) =>
              setUserData(
                Object.assign({}, userData, { username: e.target.value })
              )
            }
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={userData.password}
            onChange={(e) =>
              setUserData(
                Object.assign({}, userData, { password: e.target.value })
              )
            }
          />
          <button type="submit">Login</button>
          {userData.error && (
            <div className="error">Error: {userData.error}</div>
          )}
        </form>
      </div>
      <style jsx>{
        /* CSS */ `
          form {
            display: flex;
            flex-direction: column;
            max-width: 20rem;
            margin: 0 auto;
          }

          input {
            margin-bottom: 1rem;
          }

          .error {
            margin-top: 1rem;
            color: red;
          }
        `
      }</style>
    </Layout>
  )
}

export default Login
