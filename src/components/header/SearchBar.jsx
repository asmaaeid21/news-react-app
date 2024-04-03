import React, { useState } from 'react';

const SearchBar = ({articles, setFilteredArticles, setDisplayFiltered}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('newest'); // Default sort order
  
    const handleSearch = () => {
        let filtered = articles;
    
        if (searchTerm) {
          filtered = filtered.filter(article =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
    

        if (sortOrder) {
          filtered = filtered.sort((a, b) => {
            const dateA = new Date(a.publishedAt);
            const dateB = new Date(b.publishedAt);
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
          });
        }
  
        setFilteredArticles(filtered);
        setDisplayFiltered(true);
      };
  
  return (
    <div className='searchBar'>
         <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
     <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
     <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchBar