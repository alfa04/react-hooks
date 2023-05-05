// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'
import {useEffect, useState} from "react";

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(null);
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
    console.log('Mount',pokemonName);
    useEffect(() => {
        if (!pokemonName) return;
        console.log(pokemonName, 'effect')

        setPokemon(null);

        fetchPokemon(pokemonName).then(
             pokemonData => {
                 setPokemon(pokemonData)
             },
            error => setError(error),
           )
    }, [pokemonName])
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // 💣 remove this {pokemonName && <PokemonDataView pokemon={pokemon} />  }
    const PokemonAlternative = pokemon != null ? <PokemonDataView pokemon={pokemon} /> : <PokemonInfoFallback name={pokemonName} />;
  return (
      <>
          {pokemonName ?  PokemonAlternative : 'Submit a pokemon' }
          {error &&
          <div role="alert">
            There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
            </div>
          }

      </>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
