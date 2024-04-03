import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from "./components/header/Header";
import SearchBar from './components/header/SearchBar';
import FilterMenu from './components/header/FilterMenu';
import ArticlesGrid from './components/Article_Grid';

function App() {

  const [articles, setArticles] = useState([]);
  const [preferences, setPreferences] = useState({
    categories: [],
    sources: [],
    authors: []
  });
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [displayFiltered, setDisplayFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const newsApiResponse = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: { apiKey: 'e1199b930e8642fba5dacb23b2217d53', country: 'us' }
          });
        const guardianApiResponse = await axios.get('https://content.guardianapis.com/search', {
            params: { 'api-key': 'c782eb76-e611-4aa4-9fe6-969d12fb1234', 'show-fields': 'all'}
          });
        const nyTimesApiResponse = await axios.get('https://api.nytimes.com/svc/topstories/v2/home.json', {
            params: { 'api-key': 'kpfXjHsrB590bvxxTt6dn2G61sr40w3D' }
          });
        
        // Combine the articles from different sources and extract all required details
        const combinedArticles = [
          ...newsApiResponse.data.articles.map(article => ({
            title: article.title,
            imageUrl: article.urlToImage,
            date: article.publishedAt,
            category: article.source.name, 
            author: article.author,
            source: article.source.name,
            url: article.url,
            description: article.description
          })),
          ...guardianApiResponse.data.response.results.map(article => ({
            title: article.webTitle,
            imageUrl: article.fields.thumbnail,
            date: article.webPublicationDate,
            category: article.sectionName,
            author: article.fields.byline,
            source: 'The Guardian',
            url: article.webUrl,
            description: article.fields.trailText
          })),
          ...nyTimesApiResponse.data.results.map(article => ({
            title: article.title,
            imageUrl: article.multimedia ? article.multimedia[0].url : '',
            date: article.published_date,
            category: article.section,
            author: article.byline,
            source: 'The New York Times',
            url: article.url,
            description: article.abstract
          }))
        ];

       let filterd_articles = combinedArticles.filter((article) => {
         return article.title !== '[Removed]' && article;
       })
        setArticles(filterd_articles);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    fetchArticles();
  }, []);

  if (isLoading) {
    return <div class="loader"></div>;
  }

  if (error) {
    return <p>Error fetching articles: {error.message}</p>;
  }
  
  // Function to update preferences based on user selection in the filterMenu
  const updatePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    filterArticles(newPreferences);
    setDisplayFiltered(true);
  };

  // Function to filter articles based on preferences
  const filterArticles = (prefs) => {
    let filtered = articles;
    

    if (prefs.categories.length) {
      filtered = filtered.filter(article =>
        prefs.categories.includes(article.category)
      );
    }

    if (prefs.sources.length) {
      filtered = filtered.filter(article =>
        prefs.sources.includes(article.source)
      );
    }

    if (prefs.authors.length) {
      filtered = filtered.filter(article =>
        prefs.authors.includes(article.author)
      );
    }

    setFilteredArticles(filtered);
  };

  return (
    <div className="App">
       <Header />
       <SearchBar articles={articles} setFilteredArticles={setFilteredArticles} setDisplayFiltered={setDisplayFiltered}/>
       <FilterMenu articles={articles} setPreferences={updatePreferences} />
       <ArticlesGrid  articles={displayFiltered ? filteredArticles : articles}/>
    </div>
  );
}

export default App;
