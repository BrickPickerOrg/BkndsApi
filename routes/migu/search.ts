/// <reference path="../../common/interface/migu_interface.ts" />
module.exports = {
  /**
   * @api {get} /migu/search/all
   * @apiDescription 搜索全部
   * @apiGroup 咪咕音乐|  搜索
   * @apiParam {string} text 关键字
   * @apiParam {string} type 搜索类型 song（歌曲名）| album（专辑名）| singer（歌手名）| playlist（歌单名）
   * @apiParam {number} page 页码
   * @apiVersion 0.0.0
   */
  async ['/all']({ req, res, request, cheerio }) {
    const text = req.query.text
    const type = req.query.type || 'song'
    const page = req.query.page || 1

    const searchSwitch = {
      song: Number(type === 'song'),
      album: Number(type === 'album'),
      singer: Number(type === 'singer'),
      songlist: Number(type === 'playlist'),
      tagSong: 0,
      mvSong: 0,
      bestShow: 1,
    }

    const result = await request.send({
      url: 'http://pd.musicapp.migu.cn/MIGUM3.0/v1.0/content/search_all.do',
      data: {
        '&ua': 'Android_migu',
        text: text,
        pageNo: page,
        pageSize: 20,
        version: '5.0.1',
        searchSwitch: JSON.stringify(searchSwitch),
      },
    })

    if (result.code !== '000000') {
      res.send({
        code: 200,
        data: { item: [] },
      })
      return
    }

    let items = []
    let totalCount = 0
    switch (type) {
      case 'song':
        totalCount = result.songResultData.totalCount
        items = result.songResultData.result.map((item: any) => {
          const id = item['id']
          const cid = item['copyrightId']
          const contentId = item['contentId']
          const songName = item['name']
          const cover = item['imgItems'][0]['img']
          const singers = item['singers']
          const album = item['albums']
            ? {
                id: item['albums'][0]['id'],
                name: item['albums'][0]['name'],
              }
            : null

          const song: MiguInterface.SongInfo = {
            id,
            cid,
            contentId,
            cover,
            songName,
            singers,
            album,
          }
          return song
        })
        break

      case 'singer':
        totalCount = result.singerResultData.totalCount
        items = result.singerResultData.result
        break

      case 'album':
        totalCount = result.albumResultData.totalCount
        items = result.albumResultData.result
        break
      case 'playlist':
        totalCount = result.songListResultData.totalCount
        items = result.songListResultData.result
        break

      default:
        break
    }

    res.send({
      code: 200,
      data: { totalCount, items },
    })
  },

  /**
   * @api {get} /migu/search/lyric
   * @apiDescription 获取歌词
   * @apiGroup 咪咕音乐|  搜索
   * @apiParam {string} cid 歌曲cid
   * @apiVersion 0.0.0
   */
  async ['/lyric']({ req, res, request, cheerio }) {
    const { cid } = req.query
    const result = await request.send(`http://music.migu.cn/v3/api/music/audioPlayer/getLyric?copyrightId=${cid}`)
    if (result.msg === '成功') {
      return res.send({
        result: 100,
        data: result.lyric,
      });
    }

    return res.send({
      result: 200,
      errMsg: result.msg,
    });
  },

  /**
   * @api {get} /migu/search/song_url
   * @apiDescription 获取歌曲播放链接
   * @apiGroup 咪咕音乐|  搜索
   * @apiParam {string} id 歌曲ID
   * @apiParam {string} name 歌曲名
   * @apiParam {string} singer 歌手名  (多个歌手名用/连接)
   * @apiVersion 0.0.0
   */
  async ['/song_url']({ req, res, request, cheerio }) {
    const { id } = req.query
    const { name } = req.query
    const { singer } = req.query

    const urlResult = await request.send({
      url: 'http://pd.musicapp.migu.cn/MIGUM3.0/v2.0/content/listen-url',
      data: {
        netType: '01',
        resourceType: 'E',
        songId: id,
        toneFlag: {
          128: 'PQ',
          320: 'HQ',
          flac: 'SQ',
        }[320],
        dataType: 2,
      },
      headers: {
        referer: 'http://music.migu.cn/v3/music/player/audio',
        channel: '0146951',
        uid: 1234,
      },
    })

    if (urlResult.code === '000000') {
      return res.send({
        code: 200,
        data: { url: urlResult.data.url },
      })
    } else {
      const result = await request.send({
        url: 'http://pd.musicapp.migu.cn/MIGUM3.0/v1.0/content/search_all.do',
        data: {
          '&ua': 'Android_migu',
          text: name + singer,
          pageNo: 1,
          pageSize: 20,
          version: '5.0.1',
          searchSwitch:
            '{song: 1,album: 0,singer: 0,tagSong: 0,mvSong: 0,songlist: 0,bestShow: 1}',
        },
      })
      const items = result.songResultData.result
      const formatResult = items.filter((item: any) => item['id'] === id)
      const PayingUrl = `http://218.205.239.34/MIGUM2.0/v1.0/content/sub/listenSong.do?toneFlag=HQ&netType=00&copyrightId=0&contentId=${formatResult[0].contentId}&resourceType=2&channel=0`

      return res.send({
        code: 200,
        data: { url: PayingUrl },
      })
    }
  },
}
