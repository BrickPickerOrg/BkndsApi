namespace MiguInterface {
  // 歌曲信息
  export interface SongInfo {
    id: String
    cid: String
    contentId?: String
    cover: String
    songName: String
    singers: {
      id: String
      name: String
    }[]
    album?: {
      id: String
      name: String
    }
  }
}
