// src/App.js
import React, { useState } from "react";
import axios from "axios";



const App = () => {

  const headers = {
    "Content-Type": "application/json",
    apikey: "461b24eefbc34c428f423fb861b19a32",
    workspace: "",
  };
  
  const shorten = async (url) => {
    const endpoint = "https://api.rebrandly.com/v1/links";
    const linkRequest = {
      destination: url,
      domain: { fullName: "rebrand.ly" },
    };
    const apiCall = {
      method: "post",
      url: endpoint,
      data: linkRequest,
      headers: headers,
    };
    try {
      const apiResponse = await axios(apiCall);
      const link = apiResponse.data;
      return link.shortUrl;
    } catch (error) {
      console.error("Error:", error.message);
      throw new Error("Failed to shorten URL");
    }
  };
  const [longUrl, setLongUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const shortenedUrl = await shorten(longUrl);
      setShortUrl(shortenedUrl);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 app-body gap-x-5">
        <div className="app-des">
          <h1>My URL Shortener App</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            vitae perferendis harum molestiae accusamus. Sunt dignissimos qui
            incidunt magnam, iure recusandae ex sequi, architecto, saepe quo
            officia! Optio, dicta ipsum!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            vitae perferendis harum molestiae accusamus. Sunt dignissimos qui
            incidunt magnam, iure recusandae ex sequi, architecto, saepe quo
            officia! Optio, dicta ipsum!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            vitae perferendis harum molestiae accusamus. Sunt dignissimos qui
            incidunt magnam, iure recusandae ex sequi, architecto, saepe quo
            officia! Optio, dicta ipsum!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            vitae perferendis harum molestiae accusamus. Sunt dignissimos qui
            incidunt magnam, iure recusandae ex sequi, architecto, saepe quo
            officia! Optio, dicta ipsum!
          </p>
        </div>
        <div className="app-wrap">
          <form onSubmit={handleSubmit}>
            <label htmlFor="longUrl">Enter Long URL:</label>
            <input
              type="text"
              id="longUrl"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
            <label htmlFor="customSlug">Enter Custom URL:</label>
            <input
              type="text"
              id="customSlug"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
            />
            <button type="submit">Shorten URL</button>
          </form>
          {shortUrl && (
            <div className="app-result">
              <p>Shortened URL:</p>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
