import React, { Component } from 'react';

class AllTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        this.setState({
          posts: json
        });
      });
  }

  render() {
    const { posts } = this.state;

    return (
      <div>
        <h1>List of posts!</h1>
        {posts.length > 0 ? (
          posts.map(post => {
            return (
              <div>
                {post.id}
                {post.title}
              </div>
            );
          })
        ) : (
          <div>loading...</div>
        )}
      </div>
    );
  }
}

export default AllTest;
