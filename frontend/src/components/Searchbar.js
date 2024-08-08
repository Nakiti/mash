import { useState } from 'react';

const SearchBar = (props) => {

  return (
    <form onSubmit={props.handleSearch} className="flex items-center space-x-2 w-2/3 mt-6">
      <input
        type="text"
        value={props.query}
        onChange={props.handleChange}
        placeholder="Search..."
        className="p-2 border border-gray-300 rounded-md w-full"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
