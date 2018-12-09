import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const STATUS = {
  HOME: 'HOME',
  BORROWED: 'BORROWED',
  WISH: 'WISH',
  LOST: 'LOST',
};
const STATUSES_LITERALS = {
  [STATUS.HOME]: 'W domu',
  [STATUS.BORROWED]: 'Pożyczona',
  [STATUS.WISH]: 'Chcę kupić',
  [STATUS.LOST]: 'Zagubiona',
};

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
    console.log(['render'], this.state)
    if (!this.state.data) {
      return (
        <CircularProgress />
      );
    }

    return (
      <div>
        <Grid container style={{ padding: 24 }} spacing={24}>
        {this.state.data.games.map((game) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  style={{ objectFit: 'contain' }}
                  image={game.image}
                  title={game.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">{game.title}</Typography>
                  <Typography component="p">Status: {STATUSES_LITERALS[game.status]}</Typography>
                  <Typography component="p">Opis: {game.description}</Typography>
                  <Typography component="p">Ilość graczy: {game.players}</Typography>
                  <Typography component="p">Wydawca: {game.publisher}</Typography>
                  <Typography component="p">Kategoria: {game.category}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        </Grid>
      </div>
    );
  }
}

export default App;
