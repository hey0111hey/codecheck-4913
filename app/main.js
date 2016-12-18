"use strict";

function main(argv) {

  var parser = require('xml2json');
  var request = require('request');

  var data = [];

  var onload = function(){
    var ans={'name':'',count:0};
    data.forEach(function(v){
      if(ans['count']<=v['count'])ans=v;
    });
    console.log(ans);
  };

  var getData=function(onload){

    var maxCount = argv.length;
    var count = 0;
    var _onload=function(){
      count++;
      if(maxCount<=count){
        onload();
      }
    }

    argv.forEach( function(v){
      var url='http://54.92.123.84/search?ackey=869388c0968ae503614699f99e09d960f9ad3e12&q=Body:';
      var query=v;
      url += encodeURIComponent(query);
      request(url, function (error, response, xml) {
        if (!error && response.statusCode == 200) {
          var json = JSON.parse(parser.toJson(xml));
          var res = json['response'];
          if(res['status']!='OK'){
            console.log('error:' + res['code']);
          }else{
            var count = res['result']['numFound'];
            var ans = {'name':query,'count':count};
            data.push(ans);
          }
        } else {
          console.log('error: '+ response.statusCode);
        }
        _onload();
      })
    });
  }
  getData(onload);
}

module.exports = main;
