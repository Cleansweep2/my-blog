import React, { Component } from "react";

import { connect } from "react-redux";
import {Route,Link,Switch,Redirect}  from 'react-router-dom'

import {clearInfoAsync} from './redux/actions'

//主页面
import Main from "./components/main/main";
//用户创建
import AdminCreate from "./components/admin/adminCreate";
//用户编辑
import AdminList from "./components/admin/adminList"
//分类创建
import CategoryCreate from "./components/category/categoryCreate.jsx";
//分类列表及编辑
import CategoryList from "./components/category/categoryList.jsx";
//文章创建
import ArticleCreate from "./components/article/articleCreate.jsx"
//文章列表机编辑
import ArticleList from "./components/article/articleList";
//标签创建
import createTag from "./components/Tag/createTag"
//标签创建 及编辑
import TagList from "./components/Tag/TagList";
//事件轴创建
import CreateCourse from "./components/course/createCourse";
//时间轴列表编辑
import CourseList from "./components/course/courseList";
//图片创建
import createSwiper from "./components/swiper/createSwiper";
//图片列表 及编辑
import swiperList from "./components/swiper/swiperList";
//评论列表 及编辑
import CommentList from "./components/comment/commentList";
//
import SentenceCreate from "./components/sentence/sentenceCreate";
import SentenceList from "./components/sentence/sentenceList";
//个人日记编写 及编辑
import MyDiary from "./components/my/myDiary";
//个人信息编写及编辑
import MyInfo from "./components/my/myInfo";
//图片上传
import imgUpload from "./components/img_upload/imgUpload";
//身份验证
import { verifyToken} from "./http";
//获取标题
import getTitle from "./util/getTitle";
//添加友链
import Links from "./components/link/link";




import {Layout, Menu, PageHeader, Breadcrumb,  Modal} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  TeamOutlined,
  FileImageOutlined,
  OrderedListOutlined,
  SnippetsOutlined,
  ClockCircleOutlined,
  RadarChartOutlined,
  HomeOutlined,
  CommentOutlined,
  CloseSquareOutlined,
  UploadOutlined,
  LinkOutlined,
  CustomerServiceOutlined 
} from '@ant-design/icons';

import './assets/style/base.css'

const { Header, Sider, Content } = Layout;
const {SubMenu} = Menu

class App extends Component {
  state = {
    collapsed: false,
    user:{},
    redirect:'',
    visible:true
  };

  async componentDidMount() {
    await this.verifyToken()
  }

  //验证用户是否登录
  verifyToken = async ()=>{
    const res = await verifyToken()
    const {errCode,user} = res.data
    if(errCode === 7)
    {
      this.setState({
        redirect:7
      })
    }
    else if(errCode === 0){
      this.setState({
        user,
      })
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };


  handleOk =async () => {
    this.props.history.replace('/login')
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.props.history.go(0)
  };

  //退出
  out = async ()=>{
    localStorage.tokenA = ''
    const res = await verifyToken()
    this.props.clearInfoAsync()
    this.setState({
      user:{}
    })
    const {errCode} = res.data
    if(errCode === 6)
    {
      this.setState({
        user:{},
        redirect:6,
      })
    }
  }

  render() {
    const {user,redirect} = this.state
    if(redirect === 6)
    {
      return (<Redirect to="/login"></Redirect>)
    }
    //如果是首页
    const headr = (
      <div style={{fontWeight:500}}>
        <div style={{fontSize:18}}>欢迎您!</div>
        <div style={{fontSize:15}}>
          头像&nbsp;:&nbsp;<img style={{height:50,width:50,borderRadius:'50%'}} src={user?user.avatar:null}/>&nbsp;&nbsp;&nbsp;
          名称&nbsp;:&nbsp;<span style={{color:'red'}}>{user && user.userName}</span>&nbsp;&nbsp;&nbsp;
          账户状态&nbsp;:&nbsp;<span style={{color:'red'}}>正常</span>
        </div>
      </div>
    )
    //获取当前路径
    const path = this.props.location.pathname
    //获取标题
    const title = getTitle(path).title
    return (
      <Layout>
        {
          redirect===7 ? (
            <Modal
              cancelText="重新刷新"
              okText="去登录页"
              visible={this.state.visible}
              onOk={this.handleOk}
            >
              <h2>
                未登录! 请先登录
              </h2>
            </Modal>
          ):null
        }
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <SubMenu key="sub1" icon={<HomeOutlined />} title="主页">
              <Menu.Item key="1">
                <Link to="/main">主页</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<UserOutlined />} title="个人管理">
              <Menu.Item key="2">
                <Link to="/main/diary/management">日记管理</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/main/my_info/management">个人信息管理</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<TeamOutlined />} title="用户管理">
              <Menu.Item key="4">
                <Link to="/main/user/create">创建管理员</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/main/user/list">用户列表</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub12" icon={<LinkOutlined />} title="友链管理">
              <Menu.Item key="20">
                <Link to="/main/links">友链编辑</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub11" icon={<UploadOutlined />} title="图片上传">
              <Menu.Item key="19">
                <Link to="/main/img/upload">图片上传</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<OrderedListOutlined />} title="分类管理">
              <Menu.Item key="6"><Link to="/main/category/create">新建分类</Link></Menu.Item>
              <Menu.Item key="7"><Link to="/main/category/list">分类列表</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" icon={<SnippetsOutlined />} title="文章管理">
              <Menu.Item key="8"><Link to="/main/article/create">新建文章</Link></Menu.Item>
              <Menu.Item key="9"><Link to="/main/article/list">文章列表</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub6" icon={<RadarChartOutlined />} title="标签管理">
              <Menu.Item key="10"><Link to="/main/tag/create">新建标签</Link></Menu.Item>
              <Menu.Item key="11"><Link to="/main/tag/list">标签列表</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub7" icon={<FileImageOutlined/>} title="图片管理">
              <Menu.Item key="12"><Link to="/main/swiper/create">新建图片</Link></Menu.Item>
              <Menu.Item key="13"><Link to="/main/swiper/list">图片列表</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub8" icon={<ClockCircleOutlined />} title="时间轴管理">
              <Menu.Item key="14"><Link to="/main/course/create">新建时间轴</Link></Menu.Item>
              <Menu.Item key="15"><Link to="/main/course/list">时间轴列表</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub9" icon={<CustomerServiceOutlined />} title="心情语录">
              <Menu.Item key="16"><Link to="/main/sentence/create">新建心情语录</Link></Menu.Item>
              <Menu.Item key="17"><Link to="/main/sentence/list">心情语录列表</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub10" icon={<CommentOutlined />} title="评论管理">
              <Menu.Item key="18"><Link to="/main/comment/list">评论列表</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header style={{display:'flex'}} className="site-layout-background" style={{ padding: 0 ,backgroundColor:'#fff'}}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle
            })}
            <span style={{fontSize:24,paddingLeft:100,color:'#000',fontWeight:'700'}}>
              少年已老博客管理后台
            </span>
            <span
              onClick={this.out}
              style={{float:'right',display:'flex',cursor:'pointer','alignItems':'center',paddingRight:20}}>
              {
                redirect === 7 ? (<span>重新登陆</span>): (<span >
                  <CloseSquareOutlined />
                  <span style={{paddingLeft:4,fontSize:14}}>退出</span>
                </span>)
              }

            </span>
          </Header>
          {/*所在网站的位置*/}
          <Breadcrumb style={{paddingLeft:24,paddingTop:24}} separator=">">
            <Breadcrumb.Item href="/main">我的主页</Breadcrumb.Item>
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
          </Breadcrumb>

          <Content
            className="site-layout-background"
            style={{
              backgroundColor:'#fff',
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <PageHeader title={title==='首页'?headr:title} style={{paddingLeft:0,marginBottom:20,borderBottom:'1px solid #f0f0f0'}}></PageHeader>
            <Switch>
              {/*  用户管理*/}
              <Route path="/main/user/create" component={AdminCreate} />
              <Route path="/main/user/list" component={AdminList}/>
            {/*  分类管理*/}
              <Route path="/main/category/create" component={CategoryCreate} />
              <Route path="/main/category/list" component={CategoryList}/>
            {/*  标签管理*/}
              <Route path="/main/tag/create" component={createTag} />
              <Route path="/main/tag/list" component={TagList}/>
            {/*  文章管理*/}
              <Route path="/main/article/create" component={ArticleCreate} />
              <Route path="/main/article/list" component={ArticleList}/>
            {/*  时间轴管理*/}
            <Route path="/main/course/create" component={CreateCourse}/>
              <Route path="/main/course/list" component={CourseList}/>
            {/*  轮播图管理*/}
              <Route path="/main/swiper/create" component={createSwiper}/>
              <Route path="/main/swiper/list" component={swiperList}/>
              {/*每日一句*/}
              <Route path="/main/sentence/create" component={SentenceCreate}/>
              <Route path="/main/sentence/list" component={SentenceList}/>
              {/*评论管理*/}
              <Route path="/main/comment/list" component={CommentList}/>
              {/*个人管理*/}
              <Route path="/main/diary/management" component={MyDiary}></Route>
              {/*个人信息管理*/}
              <Route  path="/main/my_info/management" component={MyInfo}/>
              {/*图片上传*/}
              <Route path='/main/img/upload' component={imgUpload}/>
              {/*添加友链*/}
              <Route path="/main/links" component={Links}/>
              {/*主页面*/}
              <Route path="/main" component={Main} />
              <Redirect to="/main"/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default connect((state) => ({ user: state.User }),{clearInfoAsync})(App);
