import ajax from "./ajax";

//添加数据
export const addData = (data,model)=>{
    return ajax(`/admin/crud/${model}/add`,data,'POST')
}


//获取多个数据
export const getList = (model) =>{
  return ajax(`/admin/crud/${model}/get`)
}


//获取单个数据
export const getOne = (model,id) =>{
  return ajax(`/admin/crud/${model}/get_one/${id}`)
}

//删除单个数据
export const deleteOne = (model,id) =>{
  return ajax(`/admin/crud/${model}/delete/${id}`,{},'delete')
}

//更新单个数据
export const updateOne = (data,model,id) => {
  return ajax(`/admin/crud/${model}/update/${id}`,data,'put')
}

//注册
export const registe = (data)=>{
  return ajax('/admin/user/register',data,'POST')
}

//登录
export const login = (data)=>{
  return ajax('/admin/user/login',data,'POST')
}

//验证

export const verifyToken = () =>{
  return ajax('/admin/user/verify',{},'POST')
}

//根据分类 或者作者获取文章列表
export const getArticleByType = (type,name) =>{
  return ajax(`/admin/crud/article/${type}/${name}/get`,{},)
}

