import { useEffect, useState } from "react";
import { fetchCovers, RepoTreeFileWithName } from "../models/models";

export function useCovers() {
  const [covers, setCovers] = useState<RepoTreeFileWithName[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {    
    (async function fetchAllCovers() {
      try {
        const coversArray = await Promise.all([
          fetchCovers("psx"),
          fetchCovers("ps2"),
        ]);
        
        // console.log(json);
        setCovers([
          ...coversArray[0],
          ...coversArray[1],
        ]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setCovers]);

  return {covers, isLoading};
}