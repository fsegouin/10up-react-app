import React from 'react'

import Layout from '../components/layout'
import { withAuthSync, logout } from '../utils/auth'

const Profile = (props) => {
  return (
    <Layout>
      <div className="hero">
        <h1 className="title">Profile</h1>
        <div className="content">
          If you can see this, you are logged in. Congrats!
        </div>
        <button style={{ marginTop: '1rem' }} onClick={() => logout()}>
          Log out
        </button>
      </div>
    </Layout>
  )
}

export default withAuthSync(Profile)
