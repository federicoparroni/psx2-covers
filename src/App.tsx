import { useCallback, useEffect, useState } from 'react';
import psXlogo from '/psXlogo.png';
import ps2logo from '/ps2logo.svg';
import './App.css';
import { useCovers } from './hooks/useCovers';
import { PSX_GH_REPO, PS2_GH_REPO, PsVersion, RepoTreeFileWithName } from './models/models';
import PSCover from './components/PSCover';
import PsVersionSwitch from './components/PsVersionSwitch/PsVersionSwitch';

function App() {
  const { covers, isLoading } = useCovers();

  const [filter, setFilter] = useState<string>("");
  const [filterVersion, setFilterVersion] = useState<PsVersion | undefined>(undefined);

  const [filteredCovers, setFilteredCovers] = useState<RepoTreeFileWithName[]>([]);

  const filterCovers = useCallback((filter: string, filterVersion: PsVersion | undefined) => {
    let res = covers;

    if(filterVersion) {
      res = res.filter((cover) => cover.psVersion === filterVersion);
    }
    if (!filter) {
      return res?.slice(0, 50);
    }

    return covers
      .filter((cover) => cover.name.toLowerCase().includes(filter.toLowerCase()))
      .slice(0, 50);
  }, [covers]);

  useEffect(() => {
    setFilteredCovers(filterCovers(filter, filterVersion));
  }, [covers, filter, filterVersion]);

  return (
    <>
      <div className='w-full flex flex-row justify-center'>
        <img src={psXlogo} className="logo" alt="PSX logo" />
        <img src={ps2logo} className="logo" alt="PS2 logo" />
      </div>

      <div className='w-full flex flex-col gap-2 justify-center'>
        <h1>PSX/PS2 Covers</h1>
        <a href={`https://github.com/${PSX_GH_REPO}`}>
          {`https://github.com/${PSX_GH_REPO}`}
        </a>
        <a href={`https://github.com/${PS2_GH_REPO}`}>
          {`https://github.com/${PS2_GH_REPO}`}
        </a>
      </div>

      {
        isLoading ?
          <h4>Loading...</h4>
          :
          <div>
            <div className='card flex flex-row gap-4 flex-wrap justify-center'>
              <input
                type="text"
                placeholder='Search by serial'
                className='search'
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />

              <PsVersionSwitch
                value={filterVersion}
                setValue={setFilterVersion}
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
