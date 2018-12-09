import React, { Component } from 'react';

class App extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    fetch('http://localhost:4000/games')
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.state)}
      </div>
    );
  }
}

export default App;
