import React,{Component} from 'react'
import PubSub from 'pubsub-js'
import { message} from 'antd';

import {getList} from "../../http";




import CommentItem from "./commentItem";

import './style.css'



export default class CommentList extends  Component{
    state={
      comments:[]
    }
  debounce = (fun,time)=>{
    let bs ;
    return function () {
      let _seif = this
      let args = arguments
      if(bs) clearTimeout(bs)
      bs = setTimeout(function () {
        fun.call(_seif,...args)
      },time)
    }
  }
    componentDidMount() {
      this.getCommentList()
      PubSub.subscribe('update',async ()=>{
        this.debounce(await this.getCommentList(),200)
      })
    }

    getCommentList = async  ()=>{
      const res = await getList('comment')
      const {errCode} = res.data
      const msg = res.data.message
      if(errCode === 7)
      {
        return message.error(msg, 1);
      }
      const comments = res.data.data
      this.setState({
        comments,
      })
    }

  render() {
      const {comments} = this.state
        return (
            <div className="commentItems">
              {comments.map((v,i)=>{
                return (
                  <CommentItem key={v._id} _id={v._id} comment_item={v}/>
                )
              })}

            </div>
        )
    }
}
