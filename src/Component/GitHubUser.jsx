import React from "react";
import { useState } from "react";

function GitHubUser() {
  const [username, setUsername] = useState(""); //set username from input field
  const [user, setUser] = useState(null); //insert data in user from github api
  const [error, setError] = useState(""); // error state

  const handleSearch = async () => {
    try {
      setError("");
      const response = await fetch(
        `https://api.github.com/users/${username}`
      ); //fetch user data from github api

      if(!response.ok){ //check if response status is not okay

        throw new Error("User not Found")


      }
      const data = await response.json(); //convert raw data into usable

      setUser(data); //update user state
    } catch (err) {
      setUser(null);
      setError("User not found or error fetching data."); //handle error
    }
  };

  return (
    <div className='flex flex-col items-center w-screen h-screen bg-cover bg-center bg-no-repeat bg-[url("https://images.pexels.com/photos/2457284/pexels-photo-2457284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")]'>
      <h1>GitHub User Finder</h1>

      {/* display input field and user data on webpage */}

      <div className="w-screen h-min flex flex-row justify-around border border-red-600">
      <div className="border border-blue-700 min-w-96 min-h-auto">
          {error && <p style={{ color: "red" }}>{error}</p>}

          {user && (
            <div style={{ marginTop: "20px" }}>
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
        <div className="border border-yellow-400 p-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} //set current user input value in username variable
            placeholder="Enter GitHub username"
            className="p-2.5 bg-gray-300 rounded-2xl w-3xs"
          />
          <button onClick={handleSearch} className="border border-yellow-300 p-2.5 rounded-2xl relative left-5.5">Search</button>
        </div>

        
      </div>
    </div>
  );
}

export default GitHubUser;
