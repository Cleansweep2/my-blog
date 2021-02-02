/*
**文章创建页面
 */
import React, { Component } from "react";
import {message, Input, Button, Select,Form} from "antd";
import Editor from 'for-editor'



import { addData, getList } from "../../http/index";



const { Option } = Select;



class ArticleCreate extends Component {

  state = {
    category: '',
    title: "",
    content: "",
    content1:'',
    source:'',
    cover:'',
    tags:[],
    isOriginal:true,
    loading: false,
    data:[],
    data1:[],
    isRecommend:false,
  };

  componentDidMount() {
    this.getCategoryList()
  }

  //获取所有的分类
  getCategoryList = async ()=>{
    const res = await getList("category");
    const {errCode} = res.data
    const msg = res.data.message
    if(errCode === 7)
    {
      return message.error(msg, 1);
    }
    const data = res.data.data;
    const res1 = await getList("tag");
    const data1 = res1.data.data;
    this.setState({
      data,
      data1
    });
  }

  //显示弹出框
  handleEditor = (content1) => {
    this.setState({
      content1
    })
    setTimeout(()=>{
      let content = document.querySelector('.for-preview').innerHTML
      this.setState({
        content,
      })
    })
  }

  //当富文本框 文本变化时触发
  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      const imgUrl = info.file.response.imgUrl;
      // Get this url from response in real world.
      this.setState({
         cover:imgUrl,
        loading: false,
      });
    }
  };

  //将内容传到后端
  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const { category, title, content,source,cover,author,desc,isOriginal,tags,content1,article_file,isRecommend} = this.state;
    if(!title)
    {
      return message.error("请填写文章标题", 1);
    }
    if(!content)
    {
     return message.error("请填写文章内容", 1);
    }
    const res = await addData( { category, title, content,source,cover,author,desc,isOriginal,tags,content1,article_file,isRecommend},'article');
    const {errCode} = res.data
    const msg = res.data.message
    if(errCode === 7)
    {
      return message.error(msg, 1);
    }
    message.success("保存成功", 1);
    this.setState({
      title: "",
      content: "",
      source:'',
      editorState:'',
      author:'',
      desc:'',
      content1:'',
      cover:'',
      article_file:'',
      isRecommend:false,
    });
  };


  //当选中分类的时候触发
  Select = (category) =>{
    this.setState({
      category
    })
  }

  //当选中标签的时候触发
  Select1 = (tags) =>{
    this.setState({
      tags
    })
  }

  //当选中是不是原创时触发
  Select2 = (isOriginal) =>{
    this.setState({
      isOriginal
    })
  }

  render() {
    const { data,data1,title,source,cover,author,desc,content1,article_file} = this.state;
    return (
      <div>
        <div className='m-15'>
            <Select
              style={{minWidth:300}}
              showSearch
              placeholder="请选择文章分类"
              optionFilterProp="children"
              onChange={this.Select}
              mode="multiple"
            >
              {data.map((v, i) => {
                return (
                  <Option value={v._id} key={v._id}>
                    {v.name}
                  </Option>
                );
              })}
            </Select>
          <Select
            style={{marginLeft:'20px',minWidth:300}}
            showSearch
            placeholder="请选择文章标签"
            optionFilterProp="children"
            onChange={this.Select1}
            mode="multiple"
          >
            {data1.map((v, i) => {
              return (
                <Option value={v._id} key={v._id}>
                  {v.tag_name}
                </Option>
              );
            })}
          </Select>
          <Select
            style={{marginLeft:'20px',minWidth:300}}
            showSearch
            placeholder="是否为推荐文章"
            optionFilterProp="children"
            onChange={(val)=>{
              this.setState({
                isRecommend:val
              })
            }}
            allowClear
          >
            <Option value={true}>
              是
            </Option>
            <Option value={false}>
              否
            </Option>
          </Select>
          <Select
            style={{marginLeft:'20px',minWidth:300}}
            showSearch
            placeholder="是否原创"
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
        </div>
        <div  className="jumpUrl m-15">
          <Form.Item
            label="标题"
          >
            <Input
              value={title}
              placeholder="请输入文章标题"
              allowClear
              onChange={(e) => {
                this.setState({
                  title: e.target.value,
                });
              }}
            />
          </Form.Item>

        </div>
        <div className="jumpUrl m-15">
          <Form.Item
            label="文章描述"
          >
            <Input
              value={desc}
              placeholder="请输入文章描述"
              allowClear
              onChange={(e) => {
                this.setState({
                  desc: e.target.value,
                });
              }}
            />
          </Form.Item>

        </div>
        <div  className="jumpUrl m-20">
          <Form.Item
            label="文章作者"
          >
            <Input
              value={author}
              placeholder="请填写文章作者"
              allowClear
              onChange={(e) => {
                this.setState({
                  author: e.target.value,
                });
              }}
            />
          </Form.Item>
        </div>
        <div className="jumpUrl m-20">
          <Form.Item
            label="文章归档"
          >
            <Input
              value={article_file}
              placeholder="请填写文章归档时间 格式为 YYYY-MM-DD"
              allowClear
              onChange={(e) => {
                this.setState({
                  article_file: e.target.value,
                });
              }}
            />
          </Form.Item>
        </div>
        <div  className="jumpUrl m-20">
          <Form.Item
            label="文章来源"
          >
            <Input
              value={source}
              placeholder="请输入文章来源"
              allowClear
              onChange={(e) => {
                this.setState({
                  source: e.target.value,
                });
              }}
            />
          </Form.Item>
        </div>
        <div className="m-15">
          <Form.Item
            label="文章封面"
          >
            <Input
              value={cover}
              placeholder="请输入文章封面地址"
              allowClear
              onChange={(e) => {
                this.setState({
                  cover: e.target.value,
                });
              }}
            />
          </Form.Item>
        </div>
        <div  className="my-component m-20">
          <Editor value={content1} onChange={this.handleEditor} />
        </div>
        <div className="save">
          <Button type="primary" onClick={this.submitContent}>
            保存
          </Button>
        </div>
      </div>
    );
  }
}


export default ArticleCreate;
