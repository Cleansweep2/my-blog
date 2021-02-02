/**
 * 文章列表与编辑
 */
//第三方
import React, { Component } from "react";
import {Table, Button, Modal, message, Tag, Form, Select, Input, Badge} from "antd";
import { ExclamationCircleOutlined ,SearchOutlined } from "@ant-design/icons";
import Editor from 'for-editor'



import {getList, deleteOne, updateOne ,getArticleByType} from "../../http";

const {Option} = Select

class ArticleList extends Component {
  state = {
    dataSource: [],
    category: [],
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
    visible:false,
    visible1:false,
    article_file:'',
    id:'',
    keyword:'',
    isRecommend:false
  };
  //列表数据
  columns = [
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",
      render: (text, record, index) => (
        <div style={{maxWidth:'70px'}}>
          {record._id}
        </div>
      )
    },
    {
      title:'作者',
      dataIndex: "author",
      key: "author",
    },
    {
      title: "分类",
      dataIndex: "category",
      key: "category",
      render: (text, record, index) => (
        record.category.map((v,i)=>{
          return (
            <Tag color="success" key={i}>{v.name}</Tag>
          )
        })
      ),
    },
    {
      title: "标签",
      dataIndex: "tags",
      key: "tags",
      render: (text, record, index) => (
        record.tags.map((v,i)=>{
          return (
            <Tag color="warning" key={i}>{v.tag_name}</Tag>
          )
        })
      ),
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      render: (text, record, index) => (
        <div style={{maxWidth:'70px'}}>
          {record.title}
        </div>
      )
    },
    {
      title: "关键字",
      dataIndex: "title",
      key: "title",
      render: (text, record, index) => (
        <div style={{maxWidth:'70px'}}>
          {record.title}
        </div>
      )
    },
    {
      title: "来源",
      dataIndex: "source",
      key: "source",
      render: (text, record, index) => (
        <div style={{maxWidth:'70px'}}>
          {record.source}
        </div>
      ),
    },
    {
      title: "封面",
      dataIndex: "cover",
      key: "cover",
      render: (text, record, index) => (
        <img style={{ height: 64, width: 64 ,borderRadius:'50%'}} src={record.cover}></img>
      ),
    },
    {
      title: "观看",
      dataIndex: "read_num",
      key: "read_num",
      sorter: (a, b) => a.read_num - b.read_num,
      render: (text, record, index) => (
        <Badge className="site-badge-count-109" showZero={true} count={record.read_num} style={{ backgroundColor: '#52c41a' }} />
      ),
    },
    {
      title: "点赞",
      dataIndex: "favor",
      key: "favor",
      sorter: (a, b) => a.favor - b.favor,
      render: (text, record, index) => (
        <Badge className="site-badge-count-109" showZero={true} count={record.favor} style={{ backgroundColor: '#52c41a' }} />
      ),
    },
    {
      title: "评论",
      dataIndex: "comment_num",
      key: "comment_num",
      sorter: (a, b) => a.comment_num - b.comment_num,
      render: (text, record, index) => (
        <Badge className="site-badge-count-109" showZero={true} count={record.comment_num} style={{ backgroundColor: '#52c41a' }} />
      ),
    },
    {
      title: "文章归档",
      dataIndex: "article_file",
      key: "article_file",
      render: (text, record, index) => (
        <div>{record.article_file}</div>
      ),
    },
    {
      title: "是否为推荐文章",
      dataIndex: "isRecommend",
      key: "isRecommend",
      render: (text, record, index) => (
        <div style={{maxWidth:'50px'}}>
          {record.isRecommend?<Tag color="blue">是</Tag> : <Tag color="red">否</Tag>}
        </div>
      ),
    },
    {
      title: "是否原创",
      dataIndex: "isOriginal",
      key: "isOriginal",
      render: (text, record, index) => (
        record.isOriginal?<Tag  color="blue">原创</Tag> : <Tag color="red">非原创</Tag>
      ),
    },
    {
      title: "操作",
      dataIndex: "actions",
      key: "actions",
      render: (text, record, index) => (
        <div>
          <div>
            <Button onClick={()=>this.showModal(text, record, index,1)} >编辑</Button>
            <Button style={{marginLeft:'5px'}} onClick={()=>this.showModal(text, record, index,2)} >详情</Button>
            <Button style={{marginLeft:'5px'}} onClick={() => this.delete(text, record, index)}>删除</Button>
          </div>
        </div>
      ),
    },
  ];


  componentDidMount() {
    this.getArticleList()
    this.getCategoryList()
  }

  //获取文章列表
  getArticleList = async ()=>{
    const res = await getList("article");
    const {errCode} = res.data
    const msg = res.data.message
    if(errCode === 6)
    {
      return message.error(msg, 1);
    }else if(errCode === 7)
    {
      return message.error(msg, 1);
    }
    return 
    let result = res.data.data;
    result.forEach((v, i) => {
      v.key = v._id;
    });
    this.setState({
      dataSource: result,
    });
  }

  //获取分类列表
  getCategoryList = async ()=>{
    const res = await getList("category");
    const {errCode} = res.data
    const msg = res.data.message
    if(errCode === 6)
    {
      return message.error(msg, 1);
    }else if(errCode === 7)
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

  //删除文章时触发
  delete = (text, record, index) => {
    const id = record._id;
    const { title } = record;
    Modal.confirm({
      title: "删除",
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除文章${title}吗`,
      okText: "确认",
      cancelText: "取消",
      onCancel: () => {
        message.success('已取消',1)
      },
      onOk: async () => {
        await deleteOne("article", id);
        message.success('数据删除成功',1)
        this.getArticleList()
      },
    });
  };


  //显示弹出框的时候显示
  showModal = (text, record, index,type) => {
    if(type === 1)
    {
      const {category,tags,isOriginal,title,desc,author,source,cover,article_file,isRecommend} = record
      const id = record._id
      this.setState({
        visible: true,
        category,
        tags,
        isOriginal,
        title,
        desc,
        author,
        source,
        cover,
        id,
        article_file,
        isRecommend
      });
    }else if(type === 2)
    {
      const {content1} = record
      const id = record._id
      this.setState({
        content1,
        id,
        visible1: true,
      })
    }
  };

  //弹出框确定的时候触发
  handleOk =async (type) => {
    if(type===1)
    {
      const {
        category,
        tags,
        isOriginal,
        title,
        desc,
        author,
        source,
        cover,
        article_file
        ,id} = this.state;
      await updateOne({
        category,
        tags,
        isOriginal,
        title,
        desc,
        author,
        source,
        article_file,
        cover }, "article", id);
      this.getArticleList()
      message.success("修改成功", 1);
      this.setState({
        visible: false,
      });
    }else if(type === 2)
    {
      const {content,content1,id} = this.state
      console.log(content)
      await updateOne({
        content,content1}, "article", id);
      this.getArticleList()
      this.setState({
        visible1: false,
      });
    }
  };


  //弹出框取消的时候触发
  handleCancel = (type) => {
    if(type===1)
    {
      this.setState({
        visible: false,
      });
    }else if(type===2)
    {
      this.setState({
        visible1: false,
      });
    }
  };

  //编辑的时候富文本变化触发
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

  //编辑的时候选择分类触发
  Select = (category)=>{
    this.setState({
      category
    })
  }

  //编辑的时候选择标签的时候触发
  Select1 = (tags)=>{
    this.setState({
      tags
    })
  }

  //搜索 type什么方式搜索 name搜索的关键字之类
  search = async (type,name)=>{
    const res = await getArticleByType(type,name)
    const msg = res.data.message
    const {errCode} = res.data
    if(errCode === 6)
    {
      return message.error(msg, 1);
    }else if(errCode === 7)
    {
      return message.error(msg, 1);
    }
    let result = res.data.data;
    result.forEach((v, i) => {
      v.key = v._id;
    });
    this.setState({
      dataSource: result,
    });
  }

  //通过关键字搜索
  keywordSearch = async ()=>{
    const {keyword} = this.state
    this.search('title',keyword)
  }

  //通过分类来搜索
    Select2 = (author)=>{
      this.search('author',author)
    }

    //通过分类来搜索
  Select3 = (category)=>{
    this.search('category',category)
  }


  render() {
    const { dataSource,data,data1,title,source,cover,author,desc,content1 ,isOriginal,tags,category,article_file,keyword,isRecommend} = this.state;
    return (
      <div>
        <div className="row m-20" >
          <Button style={{marginRight:20}} onClick={this.getArticleList}>
            获取全部
          </Button>
          <Input value={keyword} style={{width:300}}
                 allowClear
                 onChange={(e) => {
            this.setState({
              keyword: e.target.value,
            });
          }} addonAfter={<SearchOutlined onClick={this.keywordSearch}/>} placeholder="关键字搜索" />
          <Select
            style={{minWidth:300,marginLeft:20}}
            // value={isOriginal}
            showSearch
            placeholder="按作者查询"
            allowClear
            optionFilterProp="children"
            onChange={this.Select2}
          >
            {dataSource.map((v,i)=>{
              return (
                <Option key={i} value={v.author}>
                  {v.author}
                </Option>
              )
            })}

          </Select>
          <Select
            style={{minWidth:300,marginLeft:20}}
            // value={isOriginal}
            showSearch
            allowClear
            placeholder="按分类查询"
            optionFilterProp="children"
            onChange={this.Select3}
          >
            {data.map((v,i)=>{
              return (
                <Option key={i} value={v._id}>
                  {v.name}
                </Option>
              )
            })}

          </Select>
        </div>
        <Table dataSource={dataSource}
               pagination={{
                 defaultCurrent:1,
                 pageSize:5,
                 hideOnSinglePage:true
               }}
               bordered
               columns={this.columns} />
        <Modal
          cancelText="取消"
          okText="编辑"
          title="文章编辑"
          visible={this.state.visible}
          onOk={()=>{this.handleOk(1)}}
          onCancel={()=>{this.handleCancel(1)}}
        >
          <div style={{ marginBottom: 15 }}>
            <Select
              style={{minWidth:300}}
              value={category ? category.map(v => v.name) :null}
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
          </div>
          <div className="m-15">
            <Select
              style={{minWidth:300}}
              showSearch
              value={tags.map((v)=> v.id)}
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
          </div>
          <div className="m-15">
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
          </div>
          <div className="m-15">
            <Select
              style={{minWidth:300}}
              value={isOriginal}
              showSearch
              placeholder="是否原创"
              optionFilterProp="children"
              onChange={this.Select2}
              allowClear
            >
              <Option key={1} value={true}>
                是
              </Option>
              <Option key={2} value={false}>
                否
              </Option>
            </Select>
          </div>
          <div className="m-15">
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
          <div className="m-15">
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
          <div className="m-15">
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
          <div className="m-20">
            <Form.Item
              label="文章归档"
            >
              <Input
                value={article_file}
                placeholder="请填写文章归档时间 格式为 YYYY-MM"
                allowClear
                onChange={(e) => {
                  this.setState({
                    article_file: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </div>
          <div className="m-20">
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
        </Modal>

        <Modal
          cancelText="取消"
          okText="编辑"
          title="文章内容编辑"
          visible={this.state.visible1}
          onOk={()=>{this.handleOk(2)}}
          onCancel={()=>{this.handleCancel(2)}}
          allowClear
        >
          <Editor value={content1} onChange={this.handleEditor} />
        </Modal>
      </div>
      );
  }
}

export default ArticleList
