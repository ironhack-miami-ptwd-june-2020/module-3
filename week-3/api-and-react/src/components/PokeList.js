import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class PokeList extends Component {
    constructor() {
        super();
        this.state = {
            listOfPokemon: null,
        };
    }

    componentDidMount() {
        axios
            .get("https://pokeapi.co/api/v2/pokemon/?limit=1000")
            .then((pokemonFromApi) => {
                // console.log({ poke: pokemonFromApi.data.results });

                this.setState({ listOfPokemon: pokemonFromApi.data.results });
            })
            .catch((err) => console.log({ err }));
    }

    displayPokemonList() {
        return this.state.listOfPokemon.map((pokemon, i) => {
            // console.log({ id: Number(pokemon.url.split("/")[6]) });
            return (
                <div key={i} className="list-item-box centerContent">
                    <Link to={`/details/${Number(pokemon.url.split("/")[6])}`}>
                        {pokemon.name}
                    </Link>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <h2>List of Pokemon</h2>
                <hr />
                <div className="centerContent list-item-container">
                    {this.state.listOfPokemon && this.displayPokemonList()}
                </div>
            </div>
        );
    }
}

export default PokeList;
