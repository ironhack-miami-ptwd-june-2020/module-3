import React, { Component } from "react";
import axios from "axios";

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: null,
        };
    }

    componentDidMount() {
        console.log({ props: this.props.match.params.pokeId });

        axios
            .get(
                `https://pokeapi.co/api/v2/pokemon/${this.props.match.params.pokeId}`
            )
            .then((pokemonFromApi) => {
                console.log({ poke: pokemonFromApi.data });

                this.setState({ pokemon: pokemonFromApi.data });
            })
            .catch((err) => console.log({ err }));
    }

    loading() {
        return (
            <div>
                <h2>Pokemon DéTaIlS</h2>
                <br />
                <h3>Loading ...</h3>
            </div>
        );
    }

    displayPokemonDetails() {
        const { pokemon } = this.state;
        return (
            <div className="centerContent pokemonDetails">
                <h2>{pokemon.name} DéTaIlS</h2>
                <br />
                <div className=" centerContent row-display">
                    <img
                        src={`${pokemon.sprites.front_default}`}
                        alt={`${pokemon.name} sprite`}
                    />
                    <img
                        src={`${pokemon.sprites.back_default}`}
                        alt={`${pokemon.name} sprite`}
                    />
                </div>

                <h3>ID: {pokemon.id}</h3>

                <div className=" centerContent row-display">
                    <ul className="centerContent">
                        <h3>Abilities</h3>
                        {pokemon.abilities.map((item, i) => {
                            return <li key={i}>{item.ability.name}</li>;
                        })}
                    </ul>

                    <ul className="centerContent">
                        <h3>Type</h3>
                        {pokemon.types.map((item, i) => {
                            return <li key={i}>{item.type.name}</li>;
                        })}
                    </ul>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="red-background details-page">
                {this.state.pokemon
                    ? this.displayPokemonDetails()
                    : this.loading()}
            </div>
        );
    }
}

export default Details;
