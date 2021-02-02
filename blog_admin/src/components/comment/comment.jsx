/**
 * 评论
 */
//第三方包
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import PubSub from 'pubsub-js'
import {Avatar, Comment,  Tooltip, Select,message,Tag,Button,Input} from "antd";
import dayjs from 'dayjs'

import {addData,deleteOne} from "../../http";
import {updateOne} from "../../http";

const Option = Select

export default class Com extends  Component{
  state = {
    content:'',
    publisher:''
  }

  //当选择是否通过的时候触发
  Select = async (verification)=>{
    let msg
    switch (verification) {
      case 0:
        msg = '已通过审核'
        break
      case 1:
        msg = '待审核'
       case 2:
        msg = '已删除'
    }
    const {_id} = this.props

    if(verification === 0 || verification === 1)
    {
      await updateOne({verification},'comment',_id)
    }else if(verification === 2){
      await deleteOne('comment',_id)
    }
    await PubSub.publish('update')
    message.success(msg, 1);
  }

  //当点击 回复他的时候触发
  pubComment = async ()=>{
    const {_id} = this.props
    const {userName} = this.props.comment_item.publisher
    const prefix = '@'+userName+'  '
    const {content,publisher} = this.state
    await addData({verification:0,content:prefix+ '' +content  ,to:_id,publisher},'comment')
    PubSub.publish('update')
  }

  render() {
    const {comment_item} = this.props
    const {content,publisher}   = comment_item
    return (
      <div className="commentItem">
        <Comment
          style={{ marginBottom: 15 }}
          author={<a>{publisher.userName}</a>}
          avatar={
            <Avatar
              style={{width:'50px',height:'50px'}}
              src={publisher.avatar}
              alt="Han Solo"
            />
          }
          content={
            <p style={{fontSize:'15px'}}>
              {content}
            </p>
          }
          datetime={
            <Tooltip title={dayjs().format('YYYY-MM-DD HH:mm:ss')}>
            </Tooltip>
          }
        />
        <div style={{display:'flex',alignItems:"center"}}>
          <Select
            style={{width:'200px'}}
            showSearch
            optionFilterProp="children"
            placeholder="审核"
            onChange={this.Select}
          >
            <Option value={0}>
              通过此评论
            </Option>
            <Option value={1}>
              待审核
            </Option>
            <Option value={2}>
              删除此评论
            </Option>
          </Select>
          <div style={{"paddingLeft":'40px',display:'flex','alignItems':"center"}}>
            <span>
              状态:
            </span>
            &nbsp;
            &nbsp;
            {comment_item.verification === 0? (<Tag color="success" style={{height:'32px',display:'flex','alignItems':"center"}}>评论已通过审核</Tag>):
              <Tag style={{height:'32px',display:'flex','alignItems':"center"}} color="gold">待审核</Tag>}
              <div style={{paddingLeft:100,display:'flex','alignItems':"center"}}>
                <span>留言地点:</span>
                &nbsp;
                &nbsp;
                <span>{comment_item.localtion}</span>
              </div>
            <div style={{paddingLeft:100}}>
              <span>管理员Id:</span>
              &nbsp;
              &nbsp;
              <Input onChange={(e)=>{
                this.setState({
                  publisher:e.target.value
                })
              }} placeholder="请输入管理员Id" />
            </div>
              <div style={{paddingLeft:100,display:'flex'}}>
                <Input onChange={(e)=>{
                  this.setState({
                    content:e.target.value
                  })
                }} placeholder="请输入评论的内容" />
                <Button type="primary" onClick={this.pubComment} size='middle'>
                  回复他
                </Button>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

Com.propTypes = {
  comment_item:PropTypes.object,
  _id:PropTypes.string
}