webpackJsonp([5],{G90U:function(e,r){},PWvr:function(e,r,s){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t={data:function(){return{backtitle:"<< 回去登录",show:!0,count:"",timer:null,ruleForm:{username:"",password:"",code:""},rules:{username:[{required:!0,message:"请输入手机号",trigger:"blur"},{min:3,max:15,message:"长度为11个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:3,max:15,message:"长度在 3 到 15 个字符",trigger:"blur"}],code:[{required:!0,message:"请输入验证码",trigger:"blur"},{min:3,max:15,message:"长度在 3 到 15 个字符",trigger:"blur"}]}}},methods:{submitForm:function(e){this.$refs[e].validate(function(e){e?alert("通过验证"):alert("验证错误")})},register:function(){this.$router.push({path:"/register/"})},backtohome:function(){this.$router.push({path:"/login/"})},getCode:function(){var e=this;this.timer||(this.count=60,this.show=!1,this.timer=setInterval(function(){e.count>0&&e.count<=60?e.count--:(e.show=!0,clearInterval(e.timer),e.timer=null)},1e3))}},computed:{},components:{}},o={render:function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("el-row",[s("span",{staticClass:"back",staticStyle:{cursor:"pointer"},on:{click:e.backtohome}},[e._v(e._s(e.backtitle))]),e._v(" "),s("el-col",{attrs:{xs:"{span:20,offset:2}",sm:{span:12,offset:6},md:{span:10,offset:7},lg:{span:10,offset:7},xl:{span:10,offset:7}}},[s("div",{staticClass:"login"},[s("h1",[e._v("注册")]),e._v(" "),s("div",{staticClass:"form"},[s("el-form",{ref:"ruleForm",staticClass:"login-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"手机号",prop:"username"}},[s("el-input",{model:{value:e.ruleForm.username,callback:function(r){e.$set(e.ruleForm,"username",r)},expression:"ruleForm.username"}})],1),e._v(" "),s("el-form-item",{staticClass:"codeform",attrs:{label:"验证码",prop:"code"}},[s("el-input",{staticClass:"codeinput",model:{value:e.ruleForm.code,callback:function(r){e.$set(e.ruleForm,"code",r)},expression:"ruleForm.code"}}),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],on:{click:e.getCode}},[e._v("获取验证码")]),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:!e.show,expression:"!show"}],staticClass:"count"},[e._v(e._s(e.count)+" s")])],1),e._v(" "),s("el-form-item",{attrs:{label:"密码",prop:"password"}},[s("el-input",{model:{value:e.ruleForm.password,callback:function(r){e.$set(e.ruleForm,"password",r)},expression:"ruleForm.password"}})],1),e._v(" "),s("el-form-item",[s("el-button",{staticClass:"loginBtn",attrs:{type:"primary"},on:{click:function(r){e.submitForm("ruleForm")}}},[e._v("注册")])],1)],1)],1)])])],1)},staticRenderFns:[]};var a=s("Z0/y")(t,o,!1,function(e){s("G90U")},"data-v-890457d8",null);r.default=a.exports}});
//# sourceMappingURL=5.5803876c84a8195bd3be.js.map