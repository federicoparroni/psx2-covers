import { useEffect, useState } from "react";
import { COVERS_REPO, RepoCoverType, RepoTree, RepoTreeFileWithName } from "../models/models";

export function useCovers() {
  const [covers, setCovers] = useState<RepoTreeFileWithName[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {    
    (async function fetchCovers() {
      try {
        const response = await fetch(COVERS_REPO);
        const json: RepoTree = await response.json();
        // console.log(json);
        setCovers(
          json.tree
            .filter((t) => t.type === "blob")
            .filter((t) => t.path.startsWith('covers/'))
            .map(t => {
              const pathPieces = t.path.split("/");
              return {
                ...t,
                name: pathPieces.pop() ?? "",
                coverType: (pathPieces.pop() ?? "") as RepoCoverType,
                imgUrl: `https://raw.githubusercontent.com/xlenore/ps2-covers/main/${t.path}`
              };
          })
        );
      } finally {
        setIsLoading(false);
      }
    })();

  }, [setCovers]);

  return {covers, isLoading};
}