define({ "api": [
  {
    "type": "get",
    "url": "/base/air/detail",
    "title": "",
    "description": "<p>空气质量城市详情</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>城市id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/air.ts",
    "groupTitle": "【base】",
    "name": "GetBaseAirDetail"
  },
  {
    "type": "get",
    "url": "/base/air/pm25Detail",
    "title": "",
    "description": "<p>获取PM2.5新闻详情</p>",
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/air.ts",
    "groupTitle": "【base】",
    "name": "GetBaseAirPm25detail"
  },
  {
    "type": "get",
    "url": "/base/air/pm25List",
    "title": "",
    "description": "<p>获取PM2.5新闻列表</p>",
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/air.ts",
    "groupTitle": "【base】",
    "name": "GetBaseAirPm25list"
  },
  {
    "type": "get",
    "url": "/base/air/search",
    "title": "",
    "description": "<p>通过城市名搜索</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "city",
            "description": "<p>城市名</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/air.ts",
    "groupTitle": "【base】",
    "name": "GetBaseAirSearch"
  },
  {
    "type": "get",
    "url": "/base/air/sort",
    "title": "",
    "description": "<p>空气质量城市列表</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "sort",
            "description": "<p>列表排序方式</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/air.ts",
    "groupTitle": "【base】",
    "name": "GetBaseAirSort"
  },
  {
    "type": "get",
    "url": "/base/baoan/",
    "title": "",
    "description": "<p>保安日记</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "num",
            "description": "<p>第几个</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/baoan.ts",
    "groupTitle": "【base】",
    "name": "GetBaseBaoan"
  },
  {
    "type": "get",
    "url": "/base/bible/",
    "title": "",
    "description": "<p>基督教圣经列表</p>",
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/bible.ts",
    "groupTitle": "【base】",
    "name": "GetBaseBible"
  },
  {
    "type": "get",
    "url": "/base/bible/detail",
    "title": "",
    "description": "<p>基督教圣经详情</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>详情ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/bible.ts",
    "groupTitle": "【base】",
    "name": "GetBaseBibleDetail"
  },
  {
    "type": "get",
    "url": "/base/bible/directory",
    "title": "",
    "description": "<p>根据章节ID获取详细目录</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>章节ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/bible.ts",
    "groupTitle": "【base】",
    "name": "GetBaseBibleDirectory"
  },
  {
    "type": "get",
    "url": "/base/bible/search",
    "title": "",
    "description": "<p>搜索关键词</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "key",
            "description": "<p>关键词</p>"
          }
        ]
      }
    },
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/bible.ts",
    "groupTitle": "【base】",
    "name": "GetBaseBibleSearch"
  },
  {
    "type": "get",
    "url": "/base/chengyu/detail",
    "title": "",
    "description": "<p>成语详情</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>成语id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/chengyu.ts",
    "groupTitle": "【base】",
    "name": "GetBaseChengyuDetail"
  },
  {
    "type": "get",
    "url": "/base/chengyu/resou",
    "title": "",
    "description": "<p>成语热搜</p>",
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/chengyu.ts",
    "groupTitle": "【base】",
    "name": "GetBaseChengyuResou"
  },
  {
    "type": "get",
    "url": "/base/chengyu/search",
    "title": "",
    "description": "<p>成语搜索</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "key",
            "description": "<p>成语名称 支持模糊搜索</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/chengyu.ts",
    "groupTitle": "【base】",
    "name": "GetBaseChengyuSearch"
  },
  {
    "type": "get",
    "url": "/base/constellation/fortune",
    "title": "",
    "description": "<p>星座运势</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "en_name",
            "description": "<p>星座英文名称</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/constellation.ts",
    "groupTitle": "【base】",
    "name": "GetBaseConstellationFortune"
  },
  {
    "type": "get",
    "url": "/base/constellation/match",
    "title": "",
    "description": "<p>星座匹配</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "male",
            "description": "<p>男生星座ID</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "female",
            "description": "<p>女生星座ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/constellation.ts",
    "groupTitle": "【base】",
    "name": "GetBaseConstellationMatch"
  },
  {
    "type": "get",
    "url": "/base/daxie/",
    "title": "",
    "description": "<p>金额转大写</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "money",
            "description": "<p>金额</p>"
          }
        ]
      }
    },
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/daxie.ts",
    "groupTitle": "【base】",
    "name": "GetBaseDaxie"
  },
  {
    "type": "get",
    "url": "/base/everyday/detail",
    "title": "",
    "description": "<p>每日一句口语</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "href",
            "description": "<p>详情地址</p>"
          }
        ]
      }
    },
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/everyday.ts",
    "groupTitle": "【base】",
    "name": "GetBaseEverydayDetail"
  },
  {
    "type": "get",
    "url": "/base/everyday/list",
    "title": "",
    "description": "<p>每日一句口语</p>",
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/everyday.ts",
    "groupTitle": "【base】",
    "name": "GetBaseEverydayList"
  },
  {
    "type": "get",
    "url": "/base/foxue/",
    "title": "",
    "description": "<p>佛学辞典列表</p>",
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/foxue.ts",
    "groupTitle": "【base】",
    "name": "GetBaseFoxue"
  },
  {
    "type": "get",
    "url": "/base/foxue/detail",
    "title": "",
    "description": "<p>佛学辞典语录详情</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>详情ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/foxue.ts",
    "groupTitle": "【base】",
    "name": "GetBaseFoxueDetail"
  },
  {
    "type": "get",
    "url": "/base/foxue/directory",
    "title": "",
    "description": "<p>根据辞典ID获取辞典目录</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>辞典ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/foxue.ts",
    "groupTitle": "【base】",
    "name": "GetBaseFoxueDirectory"
  },
  {
    "type": "get",
    "url": "/base/foxue/search",
    "title": "",
    "description": "<p>搜索关键词</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "key",
            "description": "<p>关键词</p>"
          }
        ]
      }
    },
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/foxue.ts",
    "groupTitle": "【base】",
    "name": "GetBaseFoxueSearch"
  },
  {
    "type": "get",
    "url": "/base/garbage/resou",
    "title": "",
    "description": "<p>垃圾分类热搜词</p>",
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/garbage.ts",
    "groupTitle": "【base】",
    "name": "GetBaseGarbageResou"
  },
  {
    "type": "get",
    "url": "/base/garbage/search",
    "title": "",
    "description": "<p>垃圾分类搜索</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "key",
            "description": "<p>关键字</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/garbage.ts",
    "groupTitle": "【base】",
    "name": "GetBaseGarbageSearch"
  },
  {
    "type": "get",
    "url": "/base/huangli",
    "title": "",
    "description": "<p>老黄历查询</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "date",
            "description": "<p>日期 格式yyyymmdd</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/huangli.ts",
    "groupTitle": "【base】",
    "name": "GetBaseHuangli"
  },
  {
    "type": "get",
    "url": "/base/huo",
    "title": "",
    "description": "<p>火星文转换</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>0简体, 1繁体, 2火星文</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "key",
            "description": "<p>日期 格式yyyymmdd</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/huo.ts",
    "groupTitle": "【base】",
    "name": "GetBaseHuo"
  },
  {
    "type": "get",
    "url": "/base/koran/detail",
    "title": "",
    "description": "<p>古兰经章节详情</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>详情ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/koran.ts",
    "groupTitle": "【base】",
    "name": "GetBaseKoranDetail"
  },
  {
    "type": "get",
    "url": "/base/koran/directory",
    "title": "",
    "description": "<p>获取古兰经目录</p>",
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/koran.ts",
    "groupTitle": "【base】",
    "name": "GetBaseKoranDirectory"
  },
  {
    "type": "get",
    "url": "/base/lishi/",
    "title": "",
    "description": "<p>历史上的今天</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "m",
            "description": "<p>月</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "d",
            "description": "<p>日</p>"
          }
        ]
      }
    },
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/lishi.ts",
    "groupTitle": "【base】",
    "name": "GetBaseLishi"
  },
  {
    "type": "get",
    "url": "/base/lishi/detail",
    "title": "",
    "description": "<p>历史上的今天</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/lishi.ts",
    "groupTitle": "【base】",
    "name": "GetBaseLishiDetail"
  },
  {
    "type": "get",
    "url": "/base/one/article_detail",
    "title": "",
    "description": "<p>获取【一个】文章详情</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>文章ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/one.ts",
    "groupTitle": "【base】",
    "name": "GetBaseOneArticle_detail"
  },
  {
    "type": "get",
    "url": "/base/one/home",
    "title": "",
    "description": "<p>获取【一个】首页推荐</p>",
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/one.ts",
    "groupTitle": "【base】",
    "name": "GetBaseOneHome"
  },
  {
    "type": "get",
    "url": "/base/pachong/detail",
    "title": "",
    "description": "<p>宠物详情</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>宠物ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "key",
            "description": "<p>宠物类别</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/pachong.ts",
    "groupTitle": "【base】",
    "name": "GetBasePachongDetail"
  },
  {
    "type": "get",
    "url": "/base/pachong/list",
    "title": "",
    "description": "<p>宠物列表</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>宠物类别【wugui zhizhu xiyi yu】</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/pachong.ts",
    "groupTitle": "【base】",
    "name": "GetBasePachongList"
  },
  {
    "type": "get",
    "url": "/base/sanzijing/",
    "title": "",
    "description": "<p>三字经列表</p>",
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/sanzijing.ts",
    "groupTitle": "【base】",
    "name": "GetBaseSanzijing"
  },
  {
    "type": "get",
    "url": "/base/sanzijing/detail",
    "title": "",
    "description": "<p>三字经详情解释</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>段落ID</p>"
          }
        ]
      }
    },
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/sanzijing.ts",
    "groupTitle": "【base】",
    "name": "GetBaseSanzijingDetail"
  },
  {
    "type": "get",
    "url": "/base/twelve_animals/luck",
    "title": "",
    "description": "<p>生肖运势</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>生肖code</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "cury",
            "description": "<p>需要查询的年份</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "sxy",
            "description": "<p>生肖年份</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/twelve_animals.ts",
    "groupTitle": "【base】",
    "name": "GetBaseTwelve_animalsLuck"
  },
  {
    "type": "get",
    "url": "/base/twelve_animals/match",
    "title": "",
    "description": "<p>生肖匹配</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "male",
            "description": "<p>男生肖code</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "female",
            "description": "<p>女生肖code</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/twelve_animals.ts",
    "groupTitle": "【base】",
    "name": "GetBaseTwelve_animalsMatch"
  },
  {
    "type": "get",
    "url": "/base/yilin/article_detail",
    "title": "",
    "description": "<p>获取意林杂志文章详情</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>文章ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/yilin.ts",
    "groupTitle": "【base】",
    "name": "GetBaseYilinArticle_detail"
  },
  {
    "type": "get",
    "url": "/base/yilin/article_list",
    "title": "",
    "description": "<p>获取意林杂志文章目录</p>",
    "group": "【base】",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>杂志ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/base/yilin.ts",
    "groupTitle": "【base】",
    "name": "GetBaseYilinArticle_list"
  },
  {
    "type": "get",
    "url": "/base/yilin/home",
    "title": "",
    "description": "<p>获取意林杂志列表</p>",
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/yilin.ts",
    "groupTitle": "【base】",
    "name": "GetBaseYilinHome"
  },
  {
    "type": "get",
    "url": "/base/zhongyao/detail",
    "title": "",
    "description": "<p>中草药详情解释</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>中草药ID</p>"
          }
        ]
      }
    },
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/zhongyao.ts",
    "groupTitle": "【base】",
    "name": "GetBaseZhongyaoDetail"
  },
  {
    "type": "get",
    "url": "/base/zhongyao/resou/",
    "title": "",
    "description": "<p>中草药大全热搜</p>",
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/zhongyao.ts",
    "groupTitle": "【base】",
    "name": "GetBaseZhongyaoResou"
  },
  {
    "type": "get",
    "url": "/base/zhongyao/search/",
    "title": "",
    "description": "<p>中草药大全搜索</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "key",
            "description": "<p>中草药关键字</p>"
          }
        ]
      }
    },
    "group": "【base】",
    "version": "0.0.0",
    "filename": "routes/base/zhongyao.ts",
    "groupTitle": "【base】",
    "name": "GetBaseZhongyaoSearch"
  },
  {
    "type": "get",
    "url": "/migu/search/all",
    "title": "",
    "description": "<p>搜索全部</p>",
    "group": "咪咕音乐|_搜索",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>关键字</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>搜索类型 song（歌曲名）| album（专辑名）| singer（歌手名）| playlist（歌单名）</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "page",
            "description": "<p>页码</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/migu/search.ts",
    "groupTitle": "咪咕音乐|_搜索",
    "name": "GetMiguSearchAll"
  },
  {
    "type": "get",
    "url": "/migu/search/lyric",
    "title": "",
    "description": "<p>获取歌词</p>",
    "group": "咪咕音乐|_搜索",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "cid",
            "description": "<p>歌曲cid</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/migu/search.ts",
    "groupTitle": "咪咕音乐|_搜索",
    "name": "GetMiguSearchLyric"
  },
  {
    "type": "get",
    "url": "/migu/search/song_url",
    "title": "",
    "description": "<p>获取歌曲播放链接</p>",
    "group": "咪咕音乐|_搜索",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>歌曲ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>歌曲名</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "singer",
            "description": "<p>歌手名  (多个歌手名用/连接)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/migu/search.ts",
    "groupTitle": "咪咕音乐|_搜索",
    "name": "GetMiguSearchSong_url"
  },
  {
    "type": "get",
    "url": "/migu/top/top_detail",
    "title": "",
    "description": "<p>排行榜详情</p>",
    "group": "咪咕音乐|_榜单",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>榜单类型</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/migu/top.ts",
    "groupTitle": "咪咕音乐|_榜单",
    "name": "GetMiguTopTop_detail"
  },
  {
    "type": "get",
    "url": "/migu/top/top_types",
    "title": "",
    "description": "<p>榜单种类列表</p>",
    "group": "咪咕音乐|_榜单",
    "version": "0.0.0",
    "filename": "routes/migu/top.ts",
    "groupTitle": "咪咕音乐|_榜单",
    "name": "GetMiguTopTop_types"
  },
  {
    "type": "get",
    "url": "/migu/playlist/detail",
    "title": "",
    "description": "<p>歌单详情</p>",
    "group": "咪咕音乐|_歌单",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>歌单ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/migu/playlist.ts",
    "groupTitle": "咪咕音乐|_歌单",
    "name": "GetMiguPlaylistDetail"
  },
  {
    "type": "get",
    "url": "/migu/playlist/list",
    "title": "",
    "description": "<p>歌单列表</p>",
    "group": "咪咕音乐|_歌单",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "sort",
            "description": "<p>歌单列表类型 latest最新|recommend推荐 （根据歌单标签搜索不填该参数）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "tagId",
            "description": "<p>根据歌单标签搜索</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "page",
            "description": "<p>页码</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/migu/playlist.ts",
    "groupTitle": "咪咕音乐|_歌单",
    "name": "GetMiguPlaylistList"
  },
  {
    "type": "get",
    "url": "/migu/singer/all_song",
    "title": "",
    "description": "<p>获取歌手全部歌曲</p>",
    "group": "咪咕音乐|_歌手",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>歌手ID</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "page",
            "description": "<p>页码</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/migu/singer.ts",
    "groupTitle": "咪咕音乐|_歌手",
    "name": "GetMiguSingerAll_song"
  },
  {
    "type": "get",
    "url": "/migu/singer/singer_detail",
    "title": "",
    "description": "<p>歌手详情信息</p>",
    "group": "咪咕音乐|_歌手",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>歌手ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/migu/singer.ts",
    "groupTitle": "咪咕音乐|_歌手",
    "name": "GetMiguSingerSinger_detail"
  },
  {
    "type": "get",
    "url": "/migu/home/",
    "title": "",
    "description": "<p>首页</p>",
    "group": "咪咕音乐|_首页",
    "version": "0.0.0",
    "filename": "routes/migu/home.ts",
    "groupTitle": "咪咕音乐|_首页",
    "name": "GetMiguHome"
  },
  {
    "type": "get",
    "url": "/migu/home/banner",
    "title": "",
    "description": "<p>首页专辑banner轮播图</p>",
    "group": "咪咕音乐|_首页",
    "version": "0.0.0",
    "filename": "routes/migu/home.ts",
    "groupTitle": "咪咕音乐|_首页",
    "name": "GetMiguHomeBanner"
  },
  {
    "type": "get",
    "url": "/migu/album/album_detail",
    "title": "",
    "description": "<p>专辑详情</p>",
    "group": "咪咕音乐|专辑",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>专辑ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/migu/album.ts",
    "groupTitle": "咪咕音乐|专辑",
    "name": "GetMiguAlbumAlbum_detail"
  },
  {
    "type": "get",
    "url": "/migu/album/album_list",
    "title": "",
    "description": "<p>专辑列表</p>",
    "group": "咪咕音乐|专辑",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "page",
            "description": "<p>页码</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/migu/album.ts",
    "groupTitle": "咪咕音乐|专辑",
    "name": "GetMiguAlbumAlbum_list"
  }
] });
