import 'antd/dist/antd.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { CreatePokemon } from './components/create.pokemon';
import { PokemonDetail } from './components/pokemon.detail';
import { PokemonList } from './components/pokemon.list';

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path='/pokemons' component={PokemonList} />
                    <Route exact path='/pokemons/create' component={CreatePokemon} />
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
