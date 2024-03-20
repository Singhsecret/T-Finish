//create the component to display the submitted entries in a tabular format (CodeSnippetList.js)

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CodeSnippetList = () => {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await axios.get('/snippets');
        setSnippets(response.data);
      } catch (error) {
        console.error('Error fetching code snippets:', error);
        alert('Failed to fetch code snippets. Please try again.');
      }
    };

    fetchSnippets();
  }, []);

  return (
    <div>
      <h2>Submitted Code Snippets</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Language</th>
            <th>Standard Input</th>
            <th>Source Code Preview</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {snippets.map((snippet, index) => (
            <tr key={index}>
              <td>{snippet.username}</td>
              <td>{snippet.language}</td>
              <td>{snippet.stdin}</td>
              <td>{snippet.source_code_preview}</td>
              <td>{new Date(snippet.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CodeSnippetList;
