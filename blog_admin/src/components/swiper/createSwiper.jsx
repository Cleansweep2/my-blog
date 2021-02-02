/**
 * 创建图片
 */
import React,{Component} from 'react'
import {Button, Form, Input, message,Select} from "antd";

import {addData} from "../../http";

const {Option} = Select

export default class  extends  Component{
  state = {
    imgUrl:'',
    desc:'',
    loading: false,
    localtion:'',
    author:'',
    isCover:false
  };


  //保存
  save = async () => {
    const { imgUrl,desc,localtion,author,isCover} = this.state;
    const res = await addData({ imgUrl,desc,localtion,author,isCover},'image');
    const {errCode} = res.data
    const msg = res.data.message
    if(errCode === 7)
    {
      return message.error(msg, 1);
    }
    this.setState({
      imgUrl:'',
      desc:'',
      isCover:false
    })
    message.success('保存成功', 1);
  };

  //是否为封面选择的时候
  Select2 = (isCover)=>{
    this.setState({
      isCover,
    })
  }
  render() {
    const {imgUrl,desc,localtion,author} = this.state;
    return (
      <div>
        <div className="m-15">
          <Form.Item
            label="图片展示地点"
          >
            <Input
              value={localtion}
              placeholder="请输入图片展示地点"
              allowClear
              onChange={(e) => {
                this.setState({
                  localtion:e.target.value
                })
              }}
            />
          </Form.Item>
        </div>
        <div className="m-15">
          <Form.Item
            label="图片作者"
          >
            <Input
              value={author}
              placeholder="请输入图片作者名称"
              allowClear
              onChange={(e) => {
                this.setState({
                  author:e.target.value
                })
              }}
            />
          </Form.Item>
        </div>
        <div className="m-15">
          <Form.Item
            label="是否展示为封面图片"
          >
            <Select
              style={{maxWidth:300}}
              showSearch
              placeholder="是否展示为封面图片"
              optionFilterProp="children"
              onChange={this.Select2}
              allowClear
            >
              <Option value={true}>
                是
              </Option>
              <Option value={false}>
                否
              </Option>
            </Select>
          </Form.Item>
        </div>
        <div className="m-15">
          <Form.Item
            label="图片地址"
          >
            <Input
              value={imgUrl}
              placeholder="请输入轮播图的地址"
              allowClear
              onChange={(e) => {
                this.setState({
                  imgUrl:e.target.value
                })
              }}
            />
          </Form.Item>
        </div>
        <div className="m-15">
          {imgUrl ? <div>
            <img  style={{maxWidth:500,maxHeight:500}} src={imgUrl}/>
          </div> : <div>填入路径后会有预览效果哦!</div>}
        </div>
        <div style={{ marginBottom: 15 }} className="jumpUrl">
          <Form.Item
            label="图片描述"
          >
            <Input
              value={desc}
              placeholder="请输入对轮播图的描述"
              allowClear
              onChange={(e) => {
                this.setState({
                  desc:e.target.value
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
