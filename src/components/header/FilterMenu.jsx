import React, { useState } from 'react';

const FilterMenu = ({ setPreferences, articles}) => {
  const [selectedCategories, setSelectedCategories] = useState('All');
  const [selectedSources, setSelectedSources] = useState('All');
  const [selectedAuthors, setSelectedAuthors] = useState('All');

  // Extract unique categories, sources, and authors from articles
  const uniqueCategories = ['All', ...new Set(articles.map(article => article.category))];
  const uniqueSources = ['All', ...new Set(articles.map(article => article.source))];
  const uniqueAuthors = ['All', ...new Set(articles.map(article => article.author))];

  const applyPreferences = () => {
    setPreferences({
      categories: selectedCategories === 'All' ? [] : [selectedCategories],
      sources: selectedSources === 'All' ? [] : [selectedSources],
      authors: selectedAuthors === 'All' ? [] : [selectedAuthors],
    });
  };

  return (
    <div className='filterMenu'>
     <div className='filtered'>
     <div>
        <h4>Categories</h4>
        <select value={selectedCategories} onChange={(e) => setSelectedCategories(e.target.value)}>
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Source dropdown */}
      <div>
        <h4>Sources</h4>
        <select value={selectedSources} onChange={(e) => setSelectedSources(e.target.value)}>
          {uniqueSources.map((source, index) => (
            <option key={index} value={source}>{source}</option>
          ))}
        </select>
      </div>

      {/* Author dropdown */}
      <div>
        <h4>Authors</h4>
        <select value={selectedAuthors} onChange={(e) => setSelectedAuthors(e.target.value)}>
          {uniqueAuthors.map((author, index) => (
            <option key={index} value={author}>{author}</option>
          ))}
        </select>
      </div>
     </div>

      <button onClick={applyPreferences}>Filter</button>
    </div>
  );
};

export default FilterMenu;
