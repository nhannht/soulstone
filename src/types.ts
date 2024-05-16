export type Plugin =  {
  author: string,
  createdOn: string,
  updatedOn: string,
  description: string,
  name: string,
  pluginId: string,
  pluginVersionList: PluginVersion[],
  repo: Repo,
  statsDetails: StatsDetails

}
export type PluginVersion = {
  downloadNumbers: string,
  versionId: number,
  versionName: string,
}

export type Repo = {
  owner: string,
  repoId: number,
  repoName: string,
}

export type StatsDetails = {
  detailId: number,
  downloads: string,
  updated: number
}
