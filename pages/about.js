import React from 'react'
import fetch from 'isomorphic-unfetch'

import Layout from '../components/layout'

const fetcher = (url) => fetch(url).then((r) => r.json())

export async function getServerSideProps() {
  const data = await fetcher('https://js1.10up.com/wp-json/wp/v2/pages')
  return { props: { data } }
}

const Home = (props) => {
  return (
    <Layout>
      <div className="hero">
        <h2 className="title">About</h2>
        <div
          className="content"
          // TODO: This should be handled using another
          // method making sure we sanitize the HTML input
          dangerouslySetInnerHTML={{ __html: props.data[0].content.rendered }}
        />
      </div>
    </Layout>
  )
}

export default Home
