// https://api.github.com/repos/xlenore/ps2-covers/git/trees/main?recursive=1
export const COVERS_REPO = 'https://api.github.com/repos/xlenore/ps2-covers/git/trees/main?recursive=1';

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

export type RepoCoverType = "3d" | "custom" | "default";
export interface RepoTreeFileWithName extends RepoTreeFile {
  name: string
  coverType: RepoCoverType
  imgUrl: string
}
