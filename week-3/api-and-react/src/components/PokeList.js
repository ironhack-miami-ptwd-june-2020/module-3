import React, { Component } from "react";
import axios from "axios";

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
                console.log({ poke: pokemonFromApi.data.results });

                this.setState({ listOfPokemon: pokemonFromApi.data.results });
            })
            .catch((err) => console.log({ err }));
    }

    displayPokemonList() {
        return this.state.listOfPokemon.map((pokemon, i) => {
            return (
                <div key={i} className="list-item-box centerContent">
                    <h3>{pokemon.name}</h3>
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
