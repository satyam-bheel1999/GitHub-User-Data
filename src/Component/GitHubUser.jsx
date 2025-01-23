import React from 'react'
import { useState } from 'react';

function GitHubUser() {
    const [username, setUsername] = useState(''); //set username from input field
  const [user, setUser] = useState(null); //insert data in user from github api
  const [error, setError] = useState('');// error state

  const handleSearch = async () => {
    try {
      setError('');
      const response = await fetch(`https://api.github.com/users/${username}`); //fetch user data from github api
      const data = await response.json();  //convert raw data into usable

      setUser(data);  //update user state

    }

    catch (err) {
      setUser(null);
      setError('User not found or error fetching data.');  //handle error
    }
  };

  return (
    <div className='w-screen h-screen border border-red-400 bg-cover bg-[url("https://images.pexels.com/photos/707582/pexels-photo-707582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")] bg-no-repeat'>
      <h1>GitHub User Finder</h1>

      {/* display input field and user data on webpage */}
      <div>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}  //set current user input value in username variable
        placeholder="Enter GitHub username"
      />
      <button onClick={handleSearch}>Search</button>

      </div>
      
      <div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

{user && (
  <div style={{ marginTop: '20px' }}>
    <img src={user.avatar_url} alt="User Avatar" width="100" />
    <h2>{user.name}</h2>
    <p>{user.bio}</p>
    <p>Followers: {user.followers}</p>
    <p>Following: {user.following}</p>
    <a href={user.html_url} target="_blank" rel="noopener noreferrer">
      View Profile
    </a>
  </div>
)}

      </div>

      
    </div>
  )
}

export default GitHubUser
