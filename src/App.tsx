import { useCallback, useEffect, useState } from 'react'
import pslogo from '/pslogo.png'
import './App.css'
import { useCovers } from './hooks/useCovers';
import { RepoTreeFileWithName } from './models/models';
import PSCover from './components/PSCover';
// import PokemonList from './components/PokemonList';

function App() {
  const { covers, isLoading } = useCovers();

  const [filter, setFilter] = useState<string>("");
  const [filteredCovers, setFilteredCovers] = useState<RepoTreeFileWithName[]>([]);

  const filterCovers = useCallback(() => {
    if (!filter) {
      return covers?.slice(0, 50);
    }

    return covers
      .filter((cover) => cover.name.toLowerCase().includes(filter.toLowerCase()))
      .slice(0, 50);
  }, [covers, filter]);

  useEffect(() => {
    setFilteredCovers(filterCovers());
  }, [covers, filter]);

  return (
    <>
      <div className='w-full flex flex-row justify-center'>
        <img src={pslogo} className="logo" alt="PS logo" />
      </div>
      <h1>PSX/PS2 Covers</h1>
      <a href="https://github.com/xlenore/ps2-covers">
        https://github.com/xlenore/ps2-covers
      </a>

      {
        isLoading ?
          <h4>Loading...</h4>
          :
          <div>
            <div className='card'>
              <input
                type="text"
                placeholder='Search by name or serial'
                className='search'
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>

            <div className="cover-list w-full flex flex-row flex-wrap gap-y-8 items-center justify-around">
              {filteredCovers.slice(0, 24).map(cover => (
                <PSCover key={cover.path} cover={cover}>
                </PSCover>
              ))}
            </div>
          </div>
      }

    </>
  )
}

export default App
