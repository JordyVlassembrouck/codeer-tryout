import 'antd/dist/antd.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { PokemonDetail } from './pokemons/pokemon.detail';
import { PokemonList } from './pokemons/pokemon.list';

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path='/pokemons' component={PokemonList} />
                    <Route exact path='/pokemons/:id' component={PokemonDetail} />
                </Switch>
            </div>
            <Route exact path='/'>
                <Redirect to='/pokemons'/>
            </Route>
        </Router>
    );
}

export default App;
