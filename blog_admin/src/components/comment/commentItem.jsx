import React,{Component} from 'react'
import PropTypes from 'prop-types'


import Com from "./comment";




export default class CommentItem extends  Component{
    render() {
      const {comment_item} = this.props
      const {froms} = comment_item
      return (
        <div className="m-30"
        >
          <div className="m-20"
          >
            <Com _id={comment_item._id}  comment_item={comment_item}/>
          </div>
          <div
            className="second-comment m-l-70">
            {froms.length ? froms.map((v,i)=>{
              return (
                <div
                key={v._id}>
                  <Com _id={v._id} comment_item={v} key={v._id}/>
                  {
                    v.froms.length ? v.froms.map((v1,i1)=>{
                      return (
                        <div
                          className="m-l-70"
                        >
                          <Com _id={v1._id} comment_item={v1} key={v1._id}/>
                        </div>
                        )
                    }):null
                  }
                </div>
                )
            }):null}
          </div>
        </div>
      )
    }
}

CommentItem.propTypes = {
  comment_item:PropTypes.object,
}
