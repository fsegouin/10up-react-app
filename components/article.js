import React from 'react'
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'

const fetcher = (url) => fetch(url).then((r) => r.json())

const Author = (props) => {
  const { authorId } = props
  const { data, error } = useSWR(
    `https://js1.10up.com/wp-json/wp/v2/users/${authorId}`,
    fetcher
  )
  if (error) return <div>Error while fetching author name</div>
  return <div>{data !== undefined ? `By ${data.name}` : ''}</div>
}

const Article = (props) => (
  <>
    <div className="article">
      <div className="article__title">{props.data.title.rendered}</div>
      <div className="article__metadata">
        <div className="article__metadata__author">
          <Author authorId={props.data.author} />
        </div>
        <div className="article__metadata__date">
          {moment(props.data.date).format('LLL')}
        </div>
      </div>
      <div
        className="article__content"
        // TODO: This should be handled using another
        // method making sure we sanitize the HTML input
        dangerouslySetInnerHTML={{ __html: props.data.content.rendered }}
      />
    </div>
    <style jsx>{
      /* CSS */ `
        .article {
          margin: 2rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .article__title {
          font-weight: 800;
          font-size: 1.85rem;
        }
        .article__metadata {
          display: flex;
          min-height: 1.125em;
          font-size: 1.125rem;
          justify-content: space-between;
          margin: 1.5rem 0;
        }
        .article__metadata__date {
          margin-left: 1.5rem;
        }
        .article__content {
          text-align: center;
          font-size: 1.125rem;
        }
      `
    }</style>
  </>
)

export default Article
