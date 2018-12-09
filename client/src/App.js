import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
const SERVER_HOST = 'http://localhost:4000/games';

class App extends Component {
  state = {
    data: null,
    sortBy: '',
  };

  componentDidMount() {
    this.fetchList();
  }

  handleSortByChange = event => this.fetchList(event.target.value);

  fetchList(sortBy = '') {
    return fetch(`${SERVER_HOST}?sortBy=${sortBy}`)
      .then(response => response.json())
      .then(data => this.setState({ data, sortBy }))
      .catch(error => console.error(error))
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
        <AppBar position="static" color="default">
          <Toolbar>
            <FormControl style={{ width: 150 }}>
              <InputLabel htmlFor="sortBy">Sortowanie</InputLabel>
              <Select
                value={this.state.sortBy}
                onChange={this.handleSortByChange}
                inputProps={{ id: 'sortBy' }}
              >
                <MenuItem value="">
                  <em>Brak</em>
                </MenuItem>
                <MenuItem value="title">Tytuł</MenuItem>
                <MenuItem value="category">Kategoria</MenuItem>
                <MenuItem value="publisher">Wydawnictwo</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
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
