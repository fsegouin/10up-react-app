import React from 'react'
// import { Suspense } from 'react'
import fetch from 'isomorphic-unfetch'
// import useSWR from 'swr'

import Layout from '../components/layout'
import Article from '../components/article'

const fetcher = (url) => fetch(url).then((r) => r.json())

// NOTE: Server-side rendering method
export async function getServerSideProps() {
  const data = await fetcher('https://js1.10up.com/wp-json/wp/v2/posts')
  return { props: { data } }
}

// NOTE: Another way of doing this could be using SWR on client-side
// const Articles = () => {
//   const { data, error } = useSWR(
//     'https://js1.10up.com/wp-json/wp/v2/posts',
//     fetcher
//   )
//   if (error) return <div>Failed to load articles</div>
//   if (!data) return <div>Loading articles...</div>
//   return data.map((article) => <Article key={article.id} data={article} />)
// }

const Home = (props) => {
  const { data } = props

  return (
    <Layout>
      <div className="hero">
        <div className="articles">
          {data !== undefined &&
            data.map((article) => <Article key={article.id} data={article} />)}
        </div>
      </div>
      <style jsx>{
        /* CSS */ `
          .hero {
            width: 100%;
            color: #333;
          }
        `
      }</style>
    </Layout>
  )
}

export default Home
