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
      <h1 className="relative top-12 text-3xl text-white font-bold font-serif border-b-4 border-black">GitHub User Finder</h1>

      {/* display input field and user data on webpage */}

      <div className="w-screen h-min flex flex-row justify-around relative top-36">
      <div className="border border-blue-700 w-lg h-96  bg-fuchsia-100 rounded-3xl text-center p-10">
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
        <div className="border border-yellow-400 w-lg h-72 flex items-center justify-around bg-fuchsia-100 rounded-3xl">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} //set current user input value in username variable
            placeholder="Enter GitHub username"
            className="p-2.5 bg-black text-white rounded-2xl w-56 "
          />
          <button onClick={handleSearch} className="border border-violet-500 p-2.5 rounded-2xl w-36 text-black cursor-pointer">Search</button>
        </div>

        
      </div>
    </div>
  );
}

export default GitHubUser;
