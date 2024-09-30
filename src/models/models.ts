// https://api.github.com/repos/xlenore/psx-covers/git/trees/main?recursive=1
// https://api.github.com/repos/xlenore/ps2-covers/git/trees/main?recursive=1
export const PSX_GH_REPO = "xlenore/psx-covers";
export const PS2_GH_REPO = "xlenore/ps2-covers";
export const PS_REPO_NAME_BY_VERSION: Record<PsVersion, string> = {
  psx: PSX_GH_REPO,
  ps2: PS2_GH_REPO,
};

interface RepoTreeBaseItem {
  path: string
  mode: string
  sha: string
  url: string
}
export interface RepoTreeFile extends RepoTreeBaseItem {
  type: "blob"
  size: number
}
export interface RepoTreeDir extends RepoTreeBaseItem {
  type: "tree"
}

export interface RepoTree {
  sha: string
  url: string
  tree: (RepoTreeFile | RepoTreeDir)[]
}

export type PsVersion = "psx" | "ps2";
export type RepoCoverType = "3d" | "custom" | "default";
export interface RepoTreeFileWithName extends RepoTreeFile {
  name: string
  psVersion: PsVersion
  coverType: RepoCoverType
  imgUrl: string
}

export async function fetchCovers(psVersion: PsVersion): Promise<RepoTreeFileWithName[]> {
  const url = `https://api.github.com/repos/${PS_REPO_NAME_BY_VERSION[psVersion]}/git/trees/main?recursive=1`;
  const response = await fetch(url);
  const json: RepoTree = await response.json();

  return json.tree
  .filter((t) => t.type === "blob")
  .filter((t) => t.path.startsWith('covers/'))
  .map(t => {
    const pathPieces = t.path.split("/");
    return {
      ...t,
      name: pathPieces.pop() ?? "",
      psVersion,
      coverType: (pathPieces.pop() ?? "") as RepoCoverType,
      imgUrl: `https://raw.githubusercontent.com/${PS_REPO_NAME_BY_VERSION[psVersion]}/main/${t.path}`
    };
  });
}