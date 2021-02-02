/**
 * 分类创建页面
 */
import React, { Component } from "react";
import { message, Input, Button,Select ,Form} from "antd";

import { addData, getList } from "../../http/index";

const { Option } = Select;




class CategoryCreate extends Component {
  state = {
    data:[],
    name:'',
    parent:'',
    loading: false,
  };

  async componentDidMount(){
    await this.getCategory()
  }

  //获取分类列表
  getCategory = async ()=>{
    const res = await getList('category')
    const {errCode} = res.data
    const msg = res.data.message
    if(errCode === 7)
    {
      return message.error(msg, 1);
    }
    const data = res.data.data
    this.setState({
      data
    })
  }

  //保存
  save = async () => {
    const { name , parent } = this.state;
    let res
    if(parent)
    {
     res = await addData({ name , parent},'category');
    }else{
    res =  await addData({ name},'category');
    }
    this.setState({
      name:'',
      parent:''
    })
    message.success('保存成功', 1);
    const res1 = await getList('category')
    const {errCode} = res.data
    const msg = res.data.message
    if(errCode === 6)
    {
      return message.error(msg, 1);
    }
    const data = res1.data.data
    this.setState({
      data
    })
  };

  //选择父分类的时候触发
  Select = (parent) =>{
    this.setState({
      parent,
    })
  }


  render() {
    const { name ,  data} = this.state;
    return (
      <div>
        <div className="m-15">
          <Form.Item
            label="父级分类"
          >
            <Select
              showSearch
              placeholder="请选择一个上级分类"
              optionFilterProp="children"
              onChange={this.Select}
              allowClear
            >
              {data.map((v, i) => {
                return (
                  <Option value={v._id} key={v._id}>
                    {v.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>
         <div className="m-15">
           <Form.Item
             label="分类名称"
           >
             <Input
               value={name}
               placeholder="请输入分类名称"
               allowClear
               onChange={(e) => {
                 this.setState({
                   name:e.target.value
                 })
               }}
             />
           </Form.Item>
        </div>
        <div className="save">
          <Button type="primary" onClick={this.save}>
            保存
          </Button>
        </div>
      </div>
    );
  }
}


export default CategoryCreate
