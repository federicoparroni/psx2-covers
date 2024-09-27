import useDownloader from 'react-use-downloader';
import { RepoTreeFileWithName } from '../models/models';

interface PSCoverProps {
  cover: RepoTreeFileWithName
}

function PSCover({ cover }: PSCoverProps) {
  const {
    // size,
    // elapsed,
    percentage,
    download,
    cancel,
    error,
    isInProgress,
  } = useDownloader();

  const filename = cover.name;

  return (
    <div key={cover.path} className='cover w-[90%] sm:w-[45%] md:w-[30%] lg:w-[18%] flex flex-col gap-4 items-center justify-center'>
      <a href={cover.imgUrl}>
        <img src={cover.imgUrl} className='w-full'></img>
      </a>
      {!isInProgress &&
        <button onClick={() => download(cover.imgUrl, filename)}>
          Download {cover.name}
        </button>
      }
      {isInProgress &&
        <div>
          <progress id={cover.url} value={percentage} max="100" />
          <button onClick={() => cancel()}>Cancel</button>
        </div>
      }
      {error && <p className='text-red-500'>{JSON.stringify(error)}</p>}
    </div>
  )
}

export default PSCover
