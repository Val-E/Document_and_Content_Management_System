(this["webpackJsonpreact-frontend"]=this["webpackJsonpreact-frontend"]||[]).push([[0],{31:function(e,t,s){},32:function(e,t,s){"use strict";s.r(t);var a=s(1),n=s.n(a),c=s(16),r=s.n(c),o=s(2),i=s(21),l=s(3),d=Object(a.createContext)(null),b=Object(a.createContext)(null),u=s(0),j=function(){var e=Object(a.useContext)(d).message,t=Object(a.useContext)(b),s=(t.userPassword,t.setUserPassword),n=Object(a.useState)(""),c=Object(o.a)(n,2),r=c[0],i=c[1];Object(a.useEffect)((function(){i(window.location.pathname)}),[e]);var l="",j="",h="",m="visually-hidden";return"/auth/sign-up-group"===r?(document.title="Sign Up Group",l="active",m="visually-hidden"):"/auth/sign-up"===r?(document.title="Sign Up",j="active",m="visually-hidden"):"/auth/login"===r?(document.title="Login",h="active",m="visually-hidden"):"/dashboard"===r&&(document.title="Dashboard",l="visually-hidden",j="visually-hidden",h="visually-hidden",m=""),Object(u.jsxs)("div",{className:"d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom container-fluid",children:[Object(u.jsx)("span",{className:"fs-4",children:" Document and Content Management Software "}),Object(u.jsxs)("ul",{className:"nav nav-pills",children:[Object(u.jsx)("li",{className:"nav-item",children:Object(u.jsx)("a",{className:"nav-link ".concat(l),href:"/auth/sign-up-group",children:"Sign Up Group"})}),Object(u.jsx)("li",{className:"nav-item",children:Object(u.jsx)("a",{href:"/auth/logout",children:Object(u.jsx)("button",{className:"btn btn-danger ".concat(m),href:"/auth/logout",onClick:function(e){return s("")},children:"Logout"})})}),Object(u.jsx)("li",{className:"nav-item",children:Object(u.jsx)("a",{className:"nav-link ".concat(j),href:"/auth/sign-up",children:"Sign Up"})}),Object(u.jsx)("li",{className:"nav-item",children:Object(u.jsx)("a",{className:"nav-link ".concat(h),href:"/auth/login",children:"Login"})})]})]})},h=function(){return Object(u.jsx)("header",{children:Object(u.jsx)(j,{})})},m=function(){var e=Object(a.useContext)(d),t=e.message,s=e.setMessage,n=Object(a.useState)(!0),c=Object(o.a)(n,2),r=c[0],i=c[1];return Object(u.jsxs)("div",{className:"container container-fluid",children:[r&&""===document.cookie?Object(u.jsxs)("div",{className:"alert alert-primary alert-dismissible fade show",role:"alert",children:[Object(u.jsx)("strong",{children:"The website uses cookies!"}),Object(u.jsx)("br",{}),"Cookies are necessary to ensure the functionality of the website.",Object(u.jsx)("button",{type:"button",class:"btn-close","aria-label":"Close",onClick:function(){i(!1),document.cookie="_"}})]}):null,2===Object.keys(window.flashed_messages).length?Object(u.jsxs)("div",{className:"alert alert-".concat(window.flashed_messages.category," alert-dismissible fade show"),role:"alert",children:[window.flashed_messages.message,Object(u.jsx)("button",{type:"button",className:"btn-close","data-bs-dismiss":"alert","aria-label":"Close"})]}):null,t?Object(u.jsxs)("div",{className:"alert alert-".concat(t.category?t.category:"secondary","\n          d-flex align-items-center container"),role:"alert",children:[Object(u.jsxs)("div",{className:"container",children:[t.msg,t.message]}),Object(u.jsx)("button",{type:"button",className:"btn-close","aria-label":"Close",onClick:function(){return s(null)}})]}):null]})},O=function(){return Object(u.jsx)("footer",{className:"d-none d-lg-block footer sticky-bottom mt-auto py-3 bg-light container-fluid",role:"alert",children:Object(u.jsxs)("center",{children:[Object(u.jsx)("span",{className:"text-muted",children:"\xa9 2021 Valentin Svet "}),Object(u.jsx)("span",{children:" <valentin.svet.12345@gmail.com> "}),Object(u.jsx)("span",{children:Object(u.jsx)("button",{type:"button",class:"btn btn-secondary","data-bs-container":"body","data-bs-toggle":"popover","data-bs-placement":"top","data-bs-content":'\n              Redistribution and use in source and binary forms,\n              with or without modification, are permitted provided that the following conditions are met:\n              1. Redistributions of source code must retain the above copyright notice,\n                 this list of conditions and the following disclaimer.\n              2. Redistributions in binary form must reproduce the above copyright notice,\n                 this list of conditions and the following disclaimer in the documentation\n                 and/or other materials provided with the distribution.\n              3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse\n                 or promote products derived from this software without specific prior written permission.\n              THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n              "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,\n              INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF\n              MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.\n              IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE\n              FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES\n              (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;\n              LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,\n              WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING\n              IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n            ',children:"License"})})]})})},p=function(){var e=Object(a.useContext)(d).message;if(e){if("The group has been registered!"===e.msg)return Object(u.jsx)(l.a,{to:"/auth/sign-up"});if("Account was created and you were logged in automatically!"===e.msg||"You have been logged in!"===e.msg)return Object(u.jsx)(l.a,{to:"/dashboard"})}return null},f=(s(31),function(){return Object(u.jsxs)("div",{className:"container alert alert-success",role:"alert",children:[Object(u.jsx)("h2",{className:"alert-heading",children:"Welcome!"}),Object(u.jsx)("h4",{className:"h4",children:"The website offers you the service to collect data and store it indefinitely in order to create documents based on it."}),Object(u.jsx)("hr",{}),Object(u.jsxs)("p",{className:"mb-0",children:["All datasets are stored in encrypted form.",Object(u.jsx)("br",{}),"The webapp does not collect metadata."]}),Object(u.jsx)("br",{}),Object(u.jsx)("br",{}),Object(u.jsx)("div",{className:"card",children:Object(u.jsxs)("div",{className:"card-body",children:[Object(u.jsx)("h5",{className:"card-title",children:"API"}),Object(u.jsx)("h6",{className:"card-subtitle mb-2 text-muted",children:"Try the API-Interface!"}),Object(u.jsx)("p",{className:"card-text",children:"The webapp offers you the option to write your own interface or to integrate the webapp into your own application using the API."}),Object(u.jsx)("a",{href:"/api",class:"card-link",children:"Open Swagger API UI"})]})}),Object(u.jsx)("br",{}),Object(u.jsx)("div",{className:"card",children:Object(u.jsxs)("div",{className:"card-body",children:[Object(u.jsx)("h5",{className:"card-title",children:"Q&A"}),Object(u.jsx)("p",{className:"card-text",children:"If you have questions about the functionality, read the documentation on Github! If you want to report a problem use the features provided by Github or write an email!"}),Object(u.jsx)("a",{href:"http://www.github.com/Val-E/Document_and_Content_Management_System/",class:"card-link",children:"Github"})]})})]})}),x=function(){var e=Object(a.useState)(""),t=Object(o.a)(e,2),s=t[0],n=t[1],c=Object(a.useState)(""),r=Object(o.a)(c,2),i=r[0],l=r[1],j=Object(a.useContext)(d).setMessage,h=Object(a.useContext)(b),m=h.userPassword,O=h.setUserPassword;return Object(u.jsx)("div",{className:"container",children:Object(u.jsxs)("div",{className:"row g-4",children:[Object(u.jsxs)("div",{className:"col-md",children:[Object(u.jsx)("label",{for:"group_name",className:"visually-hidden",children:"Group Name"}),Object(u.jsx)("input",{type:"text",className:"form-control",id:"group_name",name:"group_name",placeholder:"Group Name",onChange:function(e){return n(e.target.value)}})]}),Object(u.jsxs)("div",{className:"col-md",children:[Object(u.jsx)("label",{for:"username",className:"visually-hidden",children:"Your Username"}),Object(u.jsx)("input",{type:"text",className:"form-control",id:"username",name:"username",placeholder:"Your Username",onChange:function(e){return l(e.target.value)}})]}),Object(u.jsxs)("div",{className:"col-md",children:[Object(u.jsx)("label",{for:"user_password",className:"visually-hidden",children:"Your Password"}),Object(u.jsx)("input",{type:"password",className:"form-control",id:"user_password",name:"user_password",placeholder:"Your Password",onChange:function(e){return O(e.target.value)}})]}),Object(u.jsx)("div",{className:"col-auto",children:Object(u.jsx)("button",{type:"submit",className:"btn btn-primary mb-3",onClick:function(){fetch("/api/auth/login",{method:"post",headers:{"content-type":"application/json; charset=utf-8"},body:JSON.stringify({group_name:s,username:i,user_password:m})}).then((function(e){return e.json()})).then((function(e){return j(e)})).catch((function(e){return console.log(e)}))},children:"Login!"})})]})})},g=function(){var e=Object(a.useContext)(d).setMessage,t=Object(a.useContext)(b),s=t.userPassword,n=t.setUserPassword,c=Object(a.useState)(""),r=Object(o.a)(c,2),i=r[0],l=r[1],j=Object(a.useState)(""),h=Object(o.a)(j,2),m=h[0],O=h[1],p=Object(a.useState)(""),f=Object(o.a)(p,2),x=f[0],g=f[1];return Object(u.jsxs)("div",{className:"container",children:[Object(u.jsxs)("div",{className:"mb-3 row",children:[Object(u.jsx)("label",{for:"group_name",className:"col-sm-2 col-form-label",children:"Your Group"}),Object(u.jsx)("div",{className:"col-sm-10",children:Object(u.jsx)("input",{type:"text",className:"form-control",id:"group_name",name:"group_name",placeholder:"Your Group",onChange:function(e){return l(e.target.value)}})})]}),Object(u.jsxs)("div",{className:"mb-3 row",children:[Object(u.jsx)("label",{for:"group_password",className:"col-sm-2 col-form-label",children:"Group Password"}),Object(u.jsx)("div",{className:"col-sm-10",children:Object(u.jsx)("input",{type:"password",className:"form-control",id:"group_password",name:"group_password",placeholder:"Group Password",onChange:function(e){return O(e.target.value)}})})]}),Object(u.jsx)("hr",{}),Object(u.jsxs)("div",{className:"row g-4",children:[Object(u.jsxs)("div",{className:"col-md",children:[Object(u.jsx)("label",{for:"username",className:"visually-hidden",children:"Your Username"}),Object(u.jsx)("input",{type:"text",className:"form-control",id:"username",name:"username",placeholder:"Your Username",onChange:function(e){return g(e.target.value)}})]}),Object(u.jsxs)("div",{className:"col-md",children:[Object(u.jsx)("label",{for:"user_password",className:"visually-hidden",children:"Your Password"}),Object(u.jsx)("input",{type:"password",className:"form-control",id:"user_password",name:"user_password",placeholder:"Your Password",onChange:function(e){return n(e.target.value)}})]}),Object(u.jsx)("div",{className:"col-auto",children:Object(u.jsx)("button",{type:"submit",className:"btn btn-primary mb-3",onClick:function(){fetch("/api/auth/sign-up",{method:"post",headers:{"content-type":"application/json; charset=utf-8"},body:JSON.stringify({group_name:i,group_password:m,username:x,user_password:s})}).then((function(e){return e.json()})).then((function(t){return e(t)})).catch((function(e){return console.log(e)}))},children:"Sign Up!"})})]}),Object(u.jsx)("br",{})]})},N=function(){var e=Object(a.useContext)(d).setMessage,t=Object(a.useState)(""),s=Object(o.a)(t,2),n=s[0],c=s[1],r=Object(a.useState)(""),i=Object(o.a)(r,2),l=i[0],b=i[1],j=Object(a.useState)(""),h=Object(o.a)(j,2),m=h[0],O=h[1];return Object(u.jsxs)("div",{className:"container",children:[Object(u.jsxs)("div",{className:"form-floating mb-3",children:[Object(u.jsx)("input",{type:"text",className:"form-control",id:"group_name",name:"group_name",placeholder:"Group Name",onChange:function(e){return c(e.target.value)}}),Object(u.jsx)("label",{for:"group_name",children:"Group Name"})]}),Object(u.jsxs)("div",{className:"form-floating",children:[Object(u.jsx)("input",{type:"password",className:"form-control",id:"group_password",name:"group_password",placeholder:"Group Password",onChange:function(e){return b(e.target.value)}}),Object(u.jsx)("label",{for:"group_password",children:"Group Password"})]}),Object(u.jsx)("br",{}),Object(u.jsxs)("div",{className:"form-floating",children:[Object(u.jsx)("textarea",{className:"form-control",id:"topics",name:"topics",style:{height:100},placeholder:"Topics",onChange:function(e){return O(e.target.value)}}),Object(u.jsx)("label",{for:"topics",children:"Topics"})]}),Object(u.jsx)("hr",{}),Object(u.jsx)("center",{children:Object(u.jsx)("button",{type:"submit",className:"btn btn-primary mb-3",onClick:function(){fetch("/api/auth/sign-up-group",{method:"post",headers:{"content-type":"application/json; charset=utf-8"},body:JSON.stringify({group_name:n,group_password:l,topics:m.split(";").filter((function(e){return e}))})}).then((function(e){return e.json()})).then((function(t){return e(t)}))},children:"Sign Up Group!"})})]})},y=function(){var e=Object(a.useContext)(b),t=e.userPassword,s=e.setUserPassword,n=Object(a.useContext)(d).setMessage,c=Object(a.useState)([]),r=Object(o.a)(c,2),i=r[0],l=r[1],j=Object(a.useState)([]),h=Object(o.a)(j,2),m=h[0],O=h[1];Object(a.useEffect)((function(){p()}),[]);var p=function(){fetch("/api/verify-keys/get-assigned-data",{method:"get",headers:{"content-type":"application/json; charset=utf-8"}}).then((function(e){return e.json()})).then((function(e){l(e.classes),O(e.users)})).catch((function(e){return console.log(e)}))};return Object(u.jsxs)("div",{className:"container container-fluid",children:[Object(u.jsx)("h4",{className:"h4",children:"Key Administration!"}),Object(u.jsxs)("div",{className:"btn-group me-2",role:"group",children:[Object(u.jsx)("button",{type:"button",className:"btn btn-outline-primary btn-lg",onClick:function(e){return p()},children:"Update!"}),Object(u.jsx)("button",{type:"button",className:"btn btn-outline-danger btn-lg",onClick:function(){fetch("/api/verify-keys/clear-unverified-keys",{method:"get",headers:{"content-type":"application/json; charset=utf-8"}}).then((function(e){return e.json()})).then((function(e){return n(e)})).then((function(e){return p()})).catch((function(e){return console.log(e)}))},children:"Clear Unverified Keys!"}),Object(u.jsx)("button",{type:"button",className:"btn btn-outline-warning btn-lg",onClick:function(){fetch("/api/verify-keys/verify",{method:"post",headers:{"content-type":"application/json; charset=utf-8"},body:JSON.stringify({user_password:t})}).then((function(e){return e.json()})).then((function(e){return n(e)})).then((function(e){return p()})).catch((function(e){return console.log(e)}))},children:"Verify Keys!"}),Object(u.jsxs)("div",{className:"form-floating",children:[Object(u.jsx)("input",{type:"password",id:"user_password",name:"user_password",className:"border border-warning border-rounded form-control","aria-describedby":"user_password",value:t,onChange:function(e){return s(e.target.value)}}),Object(u.jsx)("label",{for:"user_password",children:"User Password"})]})]}),Object(u.jsx)("br",{}),Object(u.jsx)("div",{className:"container container-fluid",children:Object(u.jsx)("table",{children:Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{style:{padding:50},children:Object(u.jsxs)("ol",{className:"list-group list-group-numbered",children:[i.length>0?Object(u.jsx)("h5",{className:"h5",children:"Must be verified:"}):null,i.map((function(e){return Object(u.jsx)("li",{className:"list-group-item",children:e})}))]})}),Object(u.jsx)("td",{style:{padding:50},children:Object(u.jsxs)("ol",{className:"list-group list-group-numbered",children:[m.length>0?Object(u.jsx)("h5",{className:"h5",children:"Need to verify:"}):null,m.map((function(e){return Object(u.jsx)("li",{className:"list-group-item",children:e})}))]})})]})})})]})},v=s(19),w=function(e){var t=Object(a.useContext)(d).setMessage,s=Object(a.useState)(""),n=Object(o.a)(s,2),c=n[0],r=n[1],i=Object(a.useState)(0),l=Object(o.a)(i,2),b=l[0],j=l[1],h=Object(a.useState)([]),O=Object(o.a)(h,2),p=O[0],f=O[1],x=Object(a.useState)([]),g=Object(o.a)(x,2),N=g[0],y=g[1],w=e.value.lists,C=e.value.form,_=Object(a.useState)({}),S=Object(o.a)(_,1)[0],I=Object(a.useState)([]),E=Object(o.a)(I,1)[0],T=Object(a.useState)(0),D=Object(o.a)(T,2),A=D[0],R=D[1];return Object(a.useEffect)((function(){"addDatasets"===C&&fetch("/api/sign-up-data/get-class-list",{method:"get",headers:{"content-type":"application/json; charset=utf-8"}}).then((function(e){return e.json()})).then((function(e){return y(e.class_list)})).catch((function(e){return console.log(e)}))}),[C]),Object(a.useEffect)((function(){for(var e=[],t=function(t){if(!E[t]){E.push({});var s,a=Object(v.a)(w.topic_list);try{for(a.s();!(s=a.n()).done;){var n=s.value;E[t][n]=""}}catch(c){a.e(c)}finally{a.f()}}e.push(Object(u.jsx)("tr",{children:w.topic_list.map((function(e){return Object(u.jsx)("td",{children:Object(u.jsx)("center",{children:Object(u.jsxs)("div",{className:"form-floating",style:{width:"190px"},children:[Object(u.jsx)("input",{type:"text",name:"dataset-".concat(t,"-").concat(e),id:"dataset-".concat(t,"-").concat(e),className:"form-control",placeholder:e,list:"user_list",value:E[t][e]?E[t][e]:S[e],onChange:function(s){E[t][e]=s.target.value,R(0===A?1:0)}}),Object(u.jsxs)("label",{for:"dataset-".concat(t,"-").concat(e),children:[" User for ",e]})]})})})}))}))},s=0;s<b;s++)t(s);E.length=Math.round(Math.abs(b)),f(e)}),[b,A]),Object(u.jsxs)("div",{className:"container modal-content",children:[Object(u.jsxs)("div",{className:"modal-header",children:[Object(u.jsx)("h5",{className:"modal-title",id:"newClassLabel",children:"addClass"===C?"Add Class":"Add Datasets"}),Object(u.jsx)("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),Object(u.jsxs)("div",{className:"modal-body form-group",children:[Object(u.jsxs)("div",{className:"row g-3 align-items-center",children:[Object(u.jsx)(m,{}),Object(u.jsx)("div",{className:"col-md",children:Object(u.jsxs)("div",{className:"form-floating",children:[Object(u.jsx)("input",{type:"text",className:"form-control",list:"addDatasets"===C?"class_list":null,id:"class_name",name:"class_name",placeholder:"Class Name","aria-describedby":"class_name",onChange:function(e){return r(e.target.value)}}),Object(u.jsx)("label",{for:"class_name",children:"Class Name"}),Object(u.jsx)("datalist",{id:"class_list",children:N.map((function(e){return Object(u.jsx)("option",{children:e})}))})]})}),Object(u.jsx)("div",{className:"col-md",children:Object(u.jsxs)("div",{className:"form-floating",children:[Object(u.jsx)("input",{type:"number",id:"dataset_number",name:"dataset_number",className:"form-control",placeholder:"Number of Datasets","aria-describedby":"dataset_number",onChange:function(e){return j(e.target.value)}}),Object(u.jsx)("label",{for:"dataset_number",children:"Number of Datasets"})]})})]}),Object(u.jsx)("hr",{}),Object(u.jsx)("br",{}),Object(u.jsx)("br",{}),Object(u.jsx)("datalist",{id:"user_list",children:w.user_list.map((function(e){return Object(u.jsx)("option",{children:e})}))}),Object(u.jsx)("div",{style:{"overflow-x":"scroll",height:"500px"},children:Object(u.jsxs)("table",{className:"table table-bordered border-dark\n              ".concat("addClass"===C?"table-primary":"table-success","\n              table-striped"),children:[Object(u.jsxs)("thead",{children:[Object(u.jsx)("tr",{children:w.topic_list.map((function(e){return Object(u.jsx)("th",{className:"bg-info",scope:"col",children:Object(u.jsxs)("center",{children:[" ",e," "]})})}))}),Object(u.jsx)("tr",{children:w.topic_list.map((function(e){return Object(u.jsx)("td",{className:"bg-danger",children:Object(u.jsx)("center",{children:Object(u.jsxs)("div",{className:"form-floating",style:{width:"190px"},children:[Object(u.jsx)("input",{type:"text",name:"global-".concat(e),id:"global-".concat(e),className:"form-control",placeholder:e,list:"user_list",onChange:function(t){S[e]=t.target.value,R(0===A?1:0)}}),Object(u.jsxs)("label",{for:"global-".concat(e),children:["User for ",e]})]})})})}))})]}),Object(u.jsx)("tbody",{children:p})]})})]}),Object(u.jsxs)("div",{className:"modal-footer",children:[Object(u.jsx)("button",{type:"button",className:"btn btn-primary",onClick:function(){if(E.push(S),"addClass"===C)var e="/api/sign-up-data/sign-up-class";else e="/api/sign-up-data/sign-up-datasets";fetch(e,{method:"post",headers:{"content-type":"application/json; charset=utf-8"},body:JSON.stringify({class_name:c,datasets:E})}).then((function(e){return e.json()})).then((function(e){return t(e)})).catch((function(e){return console.log(e)})),E.pop()},children:"addClass"===C?"Sign Up Class":"Sign Up Datasets"}),Object(u.jsx)("button",{type:"button",className:"btn btn-secondary","data-bs-dismiss":"modal",children:"Close!"})]})]})},C=function(e){var t=Object(a.useContext)(d).setMessage,s=Object(a.useContext)(b),n=s.userPassword,c=s.setUserPassword,r=Object(a.useState)([]),i=Object(o.a)(r,2),l=i[0],j=i[1],h=e.values.form,O=e.values.lists.topic_list,p=function(e){fetch("/api/manipulate-entries/delete-data",{method:"post",headers:{"content-type":"application/json; charset=utf-8"},body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(e){return t(e)})).catch((function(e){return console.log(e)}))};return Object(u.jsxs)("div",{className:"container modal-content",children:[Object(u.jsxs)("div",{className:"modal-header",children:[Object(u.jsx)("h5",{className:"modal-title",id:"newClassLabel",children:"editData"===h?"Edit Class Values":"Delete Data"}),Object(u.jsx)("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),Object(u.jsx)("div",{className:"modal-body form-group",children:Object(u.jsxs)("div",{className:"row g-3 align-items-center",children:[Object(u.jsx)(m,{}),Object(u.jsxs)("div",{className:"btn-group me-2",role:"group",children:[Object(u.jsx)("button",{type:"button",className:"btn btn-outline-success",onClick:function(e){fetch("/api/manipulate-entries/get-datasets",{method:"post",headers:{"content-type":"application/json; charset=utf-8"},body:JSON.stringify({user_password:n})}).then((function(e){return e.json()})).then((function(e){Object.keys(e).indexOf("msg")>=0?t(e):j(e.class_groups)})).catch((function(e){return console.log(e)}))},children:"Get Datasets!"}),Object(u.jsxs)("div",{className:"form-floating",children:[Object(u.jsx)("input",{type:"password",id:"user_password",name:"user_password",className:"border border-success border-rounded form-control","aria-describedby":"user_password",defaultValue:n,onChange:function(e){return c(e.target.value)}}),Object(u.jsx)("label",{for:"user_password",children:"User Password"})]})]}),Object(u.jsx)("br",{}),Object(u.jsx)("hr",{}),Object(u.jsx)("div",{style:{"overflow-x":"scroll",height:"500px"},children:Object.keys(l).map((function(e){return Object(u.jsxs)("div",{className:"container container-fluid",children:[Object(u.jsxs)("table",{className:"table table-bordered border-dark table-striped",children:[Object(u.jsxs)("thead",{children:[Object(u.jsx)("tr",{children:Object(u.jsx)("th",{className:"bg-warning",colspan:"".concat("editData"===h?O.length:O.length+1),children:Object(u.jsx)("center",{children:"editData"===h?Object(u.jsx)("div",{children:e}):Object(u.jsxs)("button",{type:"button",id:"class-".concat(l[e].class_id),name:"class-".concat(l[e].class_id),className:"btn btn-danger",onClick:function(t){return p({class_id:l[e].class_id})},children:["Delete ",Object(u.jsx)("span",{className:"badge bg-light text-danger",children:e})]})})})}),Object(u.jsxs)("tr",{children:["deleteData"===h?Object(u.jsx)("th",{className:"bg-info",children:Object(u.jsx)("center",{children:"#"})}):null,O.map((function(e){return Object(u.jsx)("th",{className:"bg-info",children:Object(u.jsx)("center",{children:e})})}))]})]}),Object(u.jsx)("tbody",{children:l[e].datasets.map((function(e){return Object(u.jsxs)("tr",{children:["deleteData"===h?Object(u.jsx)("td",{className:"bg-primary lol",children:Object(u.jsx)("center",{children:Object(u.jsxs)("button",{name:"dataset-".concat(e.dataset_id),id:"dataset-".concat(e.dataset_id),type:"button",className:"btn btn-danger",onClick:function(t){return p({dataset_id:e.dataset_id})},children:["Delete ",Object(u.jsx)("span",{className:"badge bg-light text-danger",children:"Dataset"})]})})}):null,O.map((function(s){var a=e[s];return a?Object(u.jsx)("td",{className:"bg-primary",children:Object(u.jsx)("center",{children:"editData"===h?Object(u.jsxs)("div",{className:"form-floating",style:{width:"190px"},children:[Object(u.jsx)("input",{type:"text",name:"data-".concat(a.data_id),id:"data-".concat(a.data_id),className:"form-control",style:{width:"190px"},placeholder:s,defaultValue:a.record,onChange:function(e){return s=a.data_id,c=e.target.value,void fetch("/api/manipulate-entries/push-data",{method:"post",headers:{"content-type":"application/json; charset=utf-8"},body:JSON.stringify({data_id:s,new_data:c,user_password:n})}).then((function(e){return e.json()})).then((function(e){t(e)})).catch((function(e){return console.log(e)}));var s,c}}),Object(u.jsxs)("label",{for:"data-".concat(a.record),children:[" Content for ",s]})]}):Object(u.jsxs)("button",{name:"data-".concat(a.data_id),id:"data-".concat(a.data_id),type:"button",className:"btn btn-danger",onClick:function(e){return p({data_id:a.data_id})},children:["Delete ",Object(u.jsx)("span",{className:"badge bg-light text-danger",children:a.record})]})})}):Object(u.jsx)("td",{className:"bg-primary"})}))]})}))})]}),Object(u.jsx)("br",{})]})}))})]})}),Object(u.jsx)("div",{className:"modal-footer",children:Object(u.jsx)("button",{type:"button",className:"btn btn-secondary","data-bs-dismiss":"modal",children:"Close!"})})]})},_=s(20),S=function(){var e=Object(a.useContext)(b),t=e.userPassword,s=e.setUserPassword,n=Object(a.useContext)(d).setMessage;return Object(u.jsxs)("div",{className:"container container-fluid",children:[Object(u.jsx)("h4",{className:"h4",children:"Download Datasets!"}),Object(u.jsxs)("div",{className:"btn-group me-2",role:"group",children:[Object(u.jsx)("button",{type:"button",className:"btn btn-outline-secondary btn-lg",onClick:function(){fetch("/api/get-files/download-datasets",{method:"post",headers:{"content-type":"application/json; charset=utf-8"},body:JSON.stringify({user_password:t})}).then((function(e){return e.blob()})).then((function(e){"application/json"===e.type?n({msg:"An error occurred.",category:"danger"}):Object(_.saveAs)(e,"package.zip")})).catch((function(e){return console.log(e)}))},children:"Download Datasets"}),Object(u.jsxs)("div",{className:"form-floating",children:[Object(u.jsx)("input",{type:"password",id:"user_password",name:"user_password",className:"border border-secondary border-rounded form-control","aria-describedby":"user_password",value:t,onChange:function(e){return s(e.target.value)}}),Object(u.jsx)("label",{for:"user_password",children:"User Password"})]})]})]})},I=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),s=t[0],n=t[1],c=Object(a.useState)([]),r=Object(o.a)(c,2),i=r[0],l=r[1];return Object(a.useEffect)((function(){fetch("/api/sign-up-data/get-topic-user-lists",{method:"get",headers:{"content-type":"application/json; charset=utf-8"}}).then((function(e){return e.json()})).then((function(e){return l(e)})).catch((function(e){return console.log(e)}))}),[]),Object(u.jsx)("div",{className:"container",children:Object(u.jsxs)("center",{children:[Object(u.jsx)("h1",{className:"h1",children:"Dashboard"}),Object(u.jsx)("hr",{}),Object(u.jsx)("br",{}),Object(u.jsxs)("div",{className:"container container-fluid",children:[Object(u.jsx)("h4",{className:"h4",children:"Class Administration"}),Object(u.jsxs)("div",{className:"container container-fluid mb-3",role:"toolbar","aria-label":"Toolbar with button groups",children:[Object(u.jsxs)("div",{className:"btn-group me-2",role:"group","aria-label":"First group",children:[Object(u.jsx)("button",{type:"button",className:"btn btn-outline-info btn-lg","data-bs-toggle":"modal","data-bs-target":"#modal",onClick:function(){return n(Object(u.jsx)(w,{value:{lists:i,form:"addClass"}}))},children:"Add Class"}),Object(u.jsx)("button",{type:"button",className:"btn btn-outline-info btn-lg","data-bs-toggle":"modal","data-bs-target":"#modal",onClick:function(){return n(Object(u.jsx)(w,{value:{lists:i,form:"addDatasets"}}))},children:"Add Datasets"})]}),Object(u.jsx)("div",{className:"btn-group me-2",role:"group","aria-label":"Second group",children:Object(u.jsx)("button",{type:"button",className:"btn btn-outline-danger btn-lg","data-bs-toggle":"modal","data-bs-target":"#modal",onClick:function(){return n(Object(u.jsx)(C,{values:{lists:i,form:"deleteData"}}))},children:"Delete Data"})}),Object(u.jsx)("div",{className:"btn-group",role:"group","aria-label":"Third group",children:Object(u.jsx)("button",{type:"button",className:"btn btn-outline-primary btn-lg","data-bs-toggle":"modal","data-bs-target":"#modal",onClick:function(){return n(Object(u.jsx)(C,{values:{lists:i,form:"editData"}}))},children:"Edit Class Values"})})]})]}),Object(u.jsx)("br",{}),Object(u.jsx)("br",{}),Object(u.jsx)(S,{}),Object(u.jsx)("br",{}),Object(u.jsx)("br",{}),Object(u.jsx)(y,{}),Object(u.jsx)("div",{className:"modal fade",id:"modal",tabindex:"-1","aria-labelledby":"modal","aria-hidden":"true",children:Object(u.jsx)("div",{className:"modal-dialog modal-xl",children:s})})]})})},E=function(){var e=Object(a.useState)(""),t=Object(o.a)(e,2),s=t[0],n=t[1],c=Object(a.useState)(""),r=Object(o.a)(c,2),j=r[0],y=r[1];return Object(u.jsxs)(i.a,{children:["/"===window.location.pathname?Object(u.jsx)(l.a,{to:"/home"}):null,window.isAuthenticated?Object(u.jsx)(l.a,{to:"/dashboard"}):null,Object(u.jsx)(d.Provider,{value:{message:s,setMessage:n},children:Object(u.jsxs)(b.Provider,{value:{userPassword:j,setUserPassword:y},children:[Object(u.jsxs)(l.b,{path:"/",children:[Object(u.jsx)(p,{}),Object(u.jsx)(h,{}),Object(u.jsx)(m,{}),Object(u.jsx)(O,{})]}),Object(u.jsx)(l.b,{path:"/home",component:f}),Object(u.jsx)(l.b,{path:"/auth/sign-up",component:g}),Object(u.jsx)(l.b,{path:"/auth/sign-up-group",component:N}),Object(u.jsx)(l.b,{path:"/auth/login",component:x}),Object(u.jsx)(l.b,{path:"/dashboard",component:I})]})})]})};r.a.render(Object(u.jsx)(n.a.StrictMode,{children:Object(u.jsx)(E,{})}),document.getElementById("app"))}},[[32,1,2]]]);
//# sourceMappingURL=main.199328c6.chunk.js.map