

import React, { useState } from 'react';
import axios from 'axios';

const CodeSnippetForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    language: '',
    stdin: '',
    sourceCode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/submit', formData);
      // Clear form fields after submission
      setFormData({
        username: '',
        language: '',
        stdin: '',
        sourceCode: ''
      });
      alert('Code snippet submitted successfully!');
    } catch (error) {
      console.error('Error submitting code snippet:', error);
      alert('Failed to submit code snippet. Please try again.');
    }
  };

  return (
    <div>
      <h2>Submit Code Snippet</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Preferred Language:</label>
          <select name="language" value={formData.language} onChange={handleChange} required>
            <option value="">Select Language</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
          </select>
        </div>
        <div>
          <label>Standard Input:</label>
          <input type="text" name="stdin" value={formData.stdin} onChange={handleChange} />
        </div>
        <div>
          <label>Source Code:</label>
          <textarea name="sourceCode" value={formData.sourceCode} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CodeSnippetForm;
