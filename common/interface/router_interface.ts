namespace RouterInterface {
  // 路由对象，/routes 文件夹下的ts中
  export interface RouterObj {
    func: Function
    method?: string
    [propName: string]: any
  }

  // 每个 /routes 文件夹里的对象
  export interface RouterMap {
    [propsName: string]: RouterObj
  }
}
