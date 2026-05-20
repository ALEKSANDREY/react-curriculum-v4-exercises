import { useState } from 'react';
import { getSinglePost } from './api.js';
import './Lesson07Styles.css';

export default function FetchOnClick() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleClick() {
    setLoading(true);
    try {
      const data = await getSinglePost(1);
      setPost(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="root">
      <h1 className="heading">Fetch single post on click</h1>
      <button type="button" onClick={handleClick}>
        Get post
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="content">
        {post ? (
          <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ) : (
          <p>Click the button to fetch a post</p>
        )}
      </div>
    </div>
  );
}
