"use strict";


function main(argv) {
  var asahiAPI = require('./asahiAPI.js');
  var data = [];
  var count = 0;
  var maxCount = argv.length;
  var onload = function(){
    var ans =data[0];
    data.forEach(function(v){
      if(ans['count']<=v['count'])ans=v;
    });
    console.log(JSON.stringify(ans));
  };
  var _onload = function(){
    count++;
    if(count>=maxCount)onload();
  };

  argv.forEach(function(v){
    asahiAPI.get({'q':{'Body':v}},data,_onload);
  });
  
}

module.exports = main;
