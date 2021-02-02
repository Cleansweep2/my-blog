/**
 * 心情语录创建
 */
import React,{Component} from 'react'
import {Button, Form, Input, message} from "antd";

import {addData} from "../../http";

export default class SentenceCreate  extends  Component{
  state = {
    content:'',
    author:'',
    blogger:'',
    images:['']
  };
  //保存
  save = async () => {
    const { content,author,blogger,images } = this.state;
    let res = await addData({ content,author,blogger,images},'sentence');
    const {errCode} = res.data
    const msg = res.data.message
    if(errCode === 7)
    {
      return message.error(msg, 1);
    }
    this.setState({
      content:'',
      author:'',
      blogger:'',
      images:['']
    })
    message.success('保存成功', 1);
  };

  render() {
    const { content,author,blogger,images} = this.state;
    return (
      <div>
        <div  className="m-20">
          <Form.Item
            label="博主Id"
          >
            <Input
              value={blogger}
              placeholder="请输入博主Id"
              allowClear
              onChange={(e) => {
                this.setState({
                  blogger:e.target.value
                })
              }}
            />
          </Form.Item>
        </div>
        <div  className="m-215">
          <Form.Item
            label="内容"
          >
            <Input
              value={content}
              placeholder="请输入内容"
              allowClear
              onChange={(e) => {
                this.setState({
                  content:e.target.value
                })
              }}
            />
          </Form.Item>
        </div>
        <div  className="m-15">
          <Form.Item
            label="author"
          >
            <Input
              value={author}
              placeholder="请输入作者"
              allowClear
              onChange={(e) => {
                this.setState({
                  author:e.target.value
                })
              }}
            />
          </Form.Item>
        </div>
        <div  className="m-15">
          {images.map((v,i)=>{
            return (
              <div
                key = {i}
              >
                <Form.Item
                  label={'图片链接' + (i + 1)}
                >
                  <Input
                    value={images[i]}
                    placeholder="请输入图片链接"
                    allowClear
                    onChange={(e) => {
                      const {images} = this.state
                      const val = e.target.value
                      images[i] = val
                      this.setState({
                        images,
                      })
                    }}
                  />
                </Form.Item>
                <div style={{textAlign:'end',marginBottom:10,display:'flex',justifyContent:"space-between"}}>
                  <div style={{ marginBottom: 15 }} className="jumpUrl">
                    {images[i] ? <div>
                      <img  style={{maxWidth:500,maxHeight:100}} src={images[i]}/>
                    </div> : <div>填入路径后会有预览效果哦!</div>}
                  </div>
                  <Button type="primary" onClick={()=>{
                    const {images} = this.state
                    images.splice(i,1)
                    this.setState({
                      images,
                    })
                  }}>
                    删除链接
                  </Button>
                </div>
              </div>
            )
          })}
          <Button type="primary" onClick={()=>{
            const {images} = this.state
            images.push('')
            this.setState({
              images,
            })
          }}>
            添加链接
          </Button>
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