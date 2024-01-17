import React, { useEffect, useState } from 'react';
import PlanetContext from './PlanetContext';
import useFetch from '../hooks/useFetch';
import { Planet, PlanetProps } from '../Types';

function PlanetProvider({ children }: PlanetProps) {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const { data, loading, error: fetchError } = useFetch('https://swapi.dev/api/planets/');

  useEffect(() => {
    if (data) {
      try {
        const filteredPlanet = data.results.map(({ residents, ...planet }:
        any) => planet); setPlanets(filteredPlanet);
      } catch (catchError) {
        console.error('Erro ao processar dados:', catchError);
      }
    }
  }, [data]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (fetchError) {
    return <p>Ocorreu um erro ao carregar</p>;
  }

  return (
    <PlanetContext.Provider value={ { planets, loading, error: fetchError } }>
      {children}
    </PlanetContext.Provider>
  );
}

export default PlanetProvider;
