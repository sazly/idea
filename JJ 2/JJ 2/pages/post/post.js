/*var dataObj=require("../../data/data.js");
var DBPost=require('../../db/DBPost.js').DBPost;
Page({
  data: {
  },
  onLoad: function () {
    var dbPost=new DBPost();
    this.setData({
      //postList: dataObj.postList
      postList:dbPost.getAllPostData()
    })
  }
})*/

import { DBPost } from '../../db/DBPost.js';

Page({
  data: {
  },
  onLoad: function () {
    var dbPost = new DBPost();
    this.setData({
      postList: dbPost.getAllPostData()
    });
  },

  onTapToDetail(event) {
    var postId = event.currentTarget.dataset.postId;
    console.log(postId);
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },
  onSwiperTap: function (event) {
   return {
     title:this.postData.title,
     desc:this.postData.content,
     path:"/pages/post/postdetail/post-detail"
   }
   
   /* var postId = event.target.dataset.postId;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })*/
  }
})