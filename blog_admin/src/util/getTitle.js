export default function (path) {
  const titleArr = [
    {
    path : /\/user\/create/,
    title:'创建管理员'
    },
    {
      path : /\/user\/list/,
      title:'用户列表'
    },
    {
      path : /\/category\/create/,
      title:'新建分类',
    },
    {
      path : /\/category\/list/,
      title:'分类列表'
    },
    {
      path : /\/tag\/create/,
      title:'新建标签'
    },
    {
      path : /\/tag\/list/,
      title:'标签列表'
    },
    {
      path : /\/article\/create/,
      title:'新建文章'
    },
    {
      path:/\/img\/upload/,
      title:'图片上传'
    },
    {
      path : /\/article\/list/,
      title:'文章列表'
    },
    {
      path : /\/course\/create/,
      title:'新建时间轴'
    },
    {
      path : /\/course\/list/,
      title:'时间轴列表'
    },
    {
      path : /\/swiper\/create/,
      title:'新建图片'
    },
    {
      path : /\/swiper\/list/,
      title:'图片列表'
    },
    {
      path : /\/comment\/list/,
      title:'评论列表'
    },
    {
      path : /\/sentence\/list/,
      title:'新建心情语录'
    },
    {
      path:/\/sentence\/create/,
      title:'心情语录列表'
    },
    {
      path : /\/diary\/management/,
      title:'日记管理'
    },
    {
      path:/\/my_info\/management/,
      title:'个人信息管理'
    },
    {
      path:/\/links/,
      title:'友链编辑'
    },
    {
      path:/\/main/,
      title:'首页'
    },
      ]

  return titleArr.find((v)=>{
    return v.path.test(path)
  })
}