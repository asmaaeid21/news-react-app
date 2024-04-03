import React from 'react'

const Articles_Grid = ({articles}) => {
    console.log(articles)
    return(
        <div className='articles_grid'>
        {articles.length > 0 ?  articles.map((article, index) => (
        <div key={index} className="article">
        {article.imageUrl && <img src={article.imageUrl} className='article_image' alt={article.title } />}
          <p className='category_date'>{article.category} | {new Date(article.date).toLocaleDateString()}</p>
          <h5 className="article_title">{article.title}</h5>
          <p className="article_text">{article.desciption}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
        )) : <p>Can't find related articles</p>}
       
      </div>
    )
}

export default Articles_Grid;