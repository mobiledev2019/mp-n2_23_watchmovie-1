#!/usr/bin/python3
# -*- coding: utf-8 -*-
from flask import Flask
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo
from bson import json_util, ObjectId

# TOKEN ##############################################

#######################################################
app = Flask(__name__)

# Connect MongoDb with URL .......
app.config['MONGO_DBNAME']  = 'user'
app.config['MONGO_URI']     = 'mongodb://127.0.0.1:27017/user'
# Convert ASCII ^.^
app.config['JSON_AS_ASCII'] = False
# DELETE NOW , FIXING , NERVERMIND
mongo = PyMongo(app)
# GET HELLO WORLD!!!!!!
@app.route('/',methods=['GET'])
def get():
  return jsonify({'result' : "Hello_World"})
# GET COMMENT
@app.route('/api/comment', methods=['GET'])
def get_comments():
  comment = mongo.db.user
  output =[]
  for s in comment.find():
    output.append({'id_movie' : s['id_movie'] , 'comment' : s['comment'] ,'username' : s['username']})
  return jsonify({'result' : output})
# POST COMMENT
@app.route('/api/comment',methods=['POST'])
def post_comments():
  post_comment = mongo.db.user
  id_movie = request.json['id_movie']
  comment = request.json['comment']
  username = request.json['username']
  post_comment_id = post_comment.insert({'id_movie' :id_movie, 'comment' : comment , 'username' : username})
  new_post_comment = post_comment.find_one({'_id' :post_comment_id})
  output = {'id_movive' : new_post_comment['id_movie'],'comment' : new_post_comment['comment'],'username': new_post_comment['username']}
  return jsonify({"result" : "Bạn vừa đăng tin thành công"})
# GET COMMENT BY ID_MOVIE
@app.route('/api/comment/list', methods=['POST'])
def get_comment_one():
  get_comment_id = mongo.db.user
  id_movie = request.json['id_movie']
  output =[]
  for s in get_comment_id.find({'id_movie':id_movie}):
    output.append({'id_movie' : s['id_movie'] , 'comment' : s['comment'] ,'username' : s['username']})   
  return jsonify({'result' : output})  
# LOGIN
@app.route('/api/login/username=<username>&password=<password>', methods=['GET'])
def get_login(username,password):
  get_login =mongo.db.login
  s=get_login.find_one({'username' : username, 'password' : password})
  if s:
    output ={'username':s['username'] ,'age':s['age'],'phone':s['phone']}
  else:
    output =0
  return jsonify({'result' : output})
# Like Video
@app.route('/api/like',methods=['POST'])
def post_like():
  post_like = mongo.db.like
  id_movie = request.json['id_movie']
  name_movie = request.json['name_movie']
  username = request.json['username']
  url_image = request.json['url_image']
  release_date=request.json['release_date']
  vote_average=request.json['vote_average']
  for s in post_like.find({'id_movie':id_movie,'username':username}):
    output={'check':1,'notify' :"Bạn đã thích phim này rồi" }
    return jsonify({"result":output})
  else:
    post_like_id = post_like.insert({'id_movie' :id_movie, 'name_movie' : name_movie, 'username':username,'url_image':url_image,'release_date':release_date,'vote_average':vote_average})
    new_post_like = post_like.find_one({'_id' :post_like_id})
    output = {'id_movive' : new_post_like['id_movie'],'name_movie' : new_post_like['id_movie'], 'username': new_post_like['username'],'url_image' : new_post_like['url_image'],'release_date':new_post_like['release_date'],'vote_average':new_post_like['vote_average']}
    output={'check':0,'notify' :"Bạn vừa thích bộ phim này" }
    return jsonify({"result" : output})
# Get Movie Like
@app.route('/api/likes',methods=['GET'])
def get_likes():
  likes = mongo.db.like
  output =[]
  for s in likes.find():
    output.append({'id_movie' : s['id_movie'] , 'name_movie' : s['name_movie'] ,'username': s['username'] , 'url_image': s['url_image'],'release_date':s['release_date'],'vote_average':s['vote_average']})
  return jsonify({'result' : output})
# Check TrangThai
@app.route('/api/like/check', methods =['POST'])
def check_like():
  check_like=mongo.db.like
  id_movie = request.json['id_movie']
  username = request.json['username']
  for s in check_like.find({'id_movie':id_movie,'username':username}):
    output={'check':0,'notify':"Ðã luu"}
    return jsonify({"result":output})
  else:
    output={'check':1,'notify':"Chua luu"}
    return jsonify({"result":output})
# Delete Movie Like
@app.route('/api/likes/remove', methods=['DELETE'])
def remove_likes():
   remove = mongo.db.like
   id_movie = request.json['id_movie']
   for s in removie.find({'id_movie' : id_movie}):
     ##remove.delete('id_movie' : id_movie)
     return jsonify({"result":"Ðã xóa"})  
if __name__ == "__main__":
    app.run(host="127.0.0.1", debug=True)
    
