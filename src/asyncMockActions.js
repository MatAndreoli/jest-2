require('isomorphic-fetch');

const asyncMockActions = {
  url: `http://localhost:3005/comments`,
  fetchData(url){
    return fetch(url)
      .then(response => response.json())
      .catch(error => error)
  }
}

module.exports = asyncMockActions;