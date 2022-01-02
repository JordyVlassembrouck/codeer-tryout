import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PokemonDetail } from "./pokemons/pokemon.detail";
import { PokemonList } from "./pokemons/pokemon.list";

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <PokemonList />
                    </Route>
                    <Route exact path="/:id">
                        <PokemonDetail />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
