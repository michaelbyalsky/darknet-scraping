(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{133:function(e,t,n){},152:function(e,t,n){},153:function(e,t,n){},175:function(e,t,n){"use strict";n.r(t);var a=n(5),r=n(0),c=n.n(r),s=n(13),o=n.n(s),i=(n(133),n(24)),l=n(14),u=n.n(l),d=n(20),b=n(10),p=n(66),j=n.n(p),f=j.a.create({baseURL:"/api/v1"}),h={getPastes:function(e,t){return f.get(e)},update:function(e,t){return f.patch(e,t)},create:function(e,t){return f.post(e,t)}},O=n(239),x=(n(152),n(111)),v=n(237),m=n(84),g=n(256),w=n(238),y=n(236),k=n(101),C=n.n(k),N=(n(153),n(258)),D=function(e){var t=e.tags;return Object(a.jsx)("div",{className:"labelsContainer",children:Object(a.jsx)("div",{className:"labels",children:t.map((function(e,t){return Object(a.jsx)("div",{className:"label",children:Object(a.jsx)(N.a,{classes:{root:"label"},label:"".concat(Object.keys(e)," : ").concat(Object.values(e)),color:"primary"})},t)}))})})},S=Object(x.a)((function(e){return{root:{width:"100%",backgroundColor:e.palette.background.paper,position:"relative",overflow:"auto"}}}));function P(e){var t,n=e.paste,c=Object(r.useState)(!1),s=Object(b.a)(c,2),o=s[0],i=s[1],l=S(),u=Object(r.useState)([]),d=Object(b.a)(u,2);d[0],d[1];return Object(a.jsx)("div",{children:Object(a.jsxs)("div",{className:"ticket",children:[Object(a.jsx)("div",{className:"section_1",children:Object(a.jsxs)(g.a,{expanded:o===n._id,onChange:(t=n._id,function(e,n){i(!!n&&t)}),children:[Object(a.jsx)(y.a,{expandIcon:Object(a.jsx)(C.a,{}),"aria-controls":"panel1bh-content",id:"panel1bh-header",children:Object(a.jsx)(v.a,{container:!0,alignItems:"center",children:Object(a.jsx)(v.a,{item:!0,children:Object(a.jsx)(m.a,{gutterBottom:!0,variant:"h6",children:n.Title})})})}),Object(a.jsx)(w.a,{children:Object(a.jsx)(O.a,{className:l.root,children:Object(a.jsx)(m.a,{color:"textSecondary",variant:"body2",children:n.Content})})})]})}),Object(a.jsxs)(v.a,{container:!0,alignItems:"center",children:[Object(a.jsx)(v.a,{item:!0,xs:!0,children:Object(a.jsx)(m.a,{gutterBottom:!0,children:"by ".concat(n.Author," | ").concat(n.Date)})}),Object(a.jsx)(v.a,{item:!0})]}),Object(a.jsx)("div",{className:"status",children:Object(a.jsx)(v.a,{container:!0,alignItems:"center",children:void 0!==n.Lables&&Object(a.jsx)(v.a,{item:!0,children:0!==n.Lables.length&&Object(a.jsx)(D,{className:"labels",tags:n.Lables})})})})]})})}var I=n(33),L=n(34),A=n(8),T=n(240),E=n(241),_=n(83),B=n(113),M=n(180),R=n(102),Y=n.n(R),F=n(107),H=function(e){var t=e.lables,n=e.setLables,c=(e.pastes,e.setPastes),s=e.options;e.setOptions;Object(r.useEffect)((function(){Object(d.a)(u.a.mark((function e(){var n,a,r,s,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,0!==t.length&&t){e.next=3;break}return e.abrupt("return");case 3:if("All"!==t.value){e.next=9;break}return e.next=6,h.getPastes("/pastes");case 6:return n=e.sent,a=n.data,e.abrupt("return",c(a));case 9:return e.next=11,h.getPastes("/pastes/search?search=".concat(t.value));case 11:r=e.sent,s=r.data,o=s.sort((function(e,t){return new Date(t.date)-new Date(e.date)})),c(o),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(0),console.error(e.t0);case 20:case"end":return e.stop()}}),e,null,[[0,17]])})))()}),[t]);var o={option:function(e){return Object(I.a)(Object(I.a)({},e),{},{color:"white",backgroundColor:"blue",borderBottom:"1px dotted black",height:"100%",width:"100%"})},control:function(e){return Object(I.a)(Object(I.a)({},e),{},{backgroundColor:"neutral30"})}};return Object(a.jsx)("div",{className:"labelFilter",children:Object(a.jsx)(F.a,{value:t,className:"selectLabels",maxMenuHeight:300,placeholder:"select labels",name:"labels",onChange:function(e){return n(e)},closeMenuOnSelect:!1,options:s,styles:o})})},z=n(103),J=n.n(z),U=n(242),W=n(249),G=n(179),K=n(177),q=n(181),Q=n(253),V=n(251),X=n(250),Z=n(254),$=n(257),ee=n(248),te=n(244),ne=n(245),ae=n(243),re=Object(x.a)((function(e){return{root:{width:"10px","& > * + *":{marginTop:e.spacing(2)}},grow:{flexGrow:1},appBar:{position:"fixed"},title:Object(L.a)({display:"none"},e.breakpoints.up("sm"),{display:"block"}),search:Object(L.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(A.c)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(A.c)(e.palette.common.white,.25)},marginRight:e.spacing(2),marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing(3),width:"auto"}),searchIcon:{padding:e.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:Object(L.a)({padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(e.spacing(4),"px)"),transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("md"),{width:"20ch"}),toolbar:{minHeight:0,alignItems:"flex-start",paddingTop:e.spacing(1),paddingBottom:e.spacing(2)},buttons2:{width:"400px"},buttons1:{marginRigth:-1,width:"200px",alignSelf:"flex-end"},button:{margin:"2px"}}}));var ce=function(e){var t=e.setAllNotitfications,n=e.searchText,s=e.handleChange,o=e.pastes,i=e.setPastes,l=e.allNotitfications,p=(e.keyword1,e.options),j=e.setOptions,f=re(),x=c.a.useState(!1),v=Object(b.a)(x,2),g=v[0],w=v[1],y=c.a.useRef(null),k=c.a.useState(!1),C=Object(b.a)(k,2),N=C[0],D=C[1],S=c.a.useState(""),P=Object(b.a)(S,2),L=P[0],A=P[1],R=Object(r.useState)([]),F=Object(b.a)(R,2),z=F[0],Q=F[1],ce=function(){var e=Object(d.a)(u.a.mark((function e(){var t,n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.getPastes("/pastes/keyword");case 3:t=e.sent,n=t.data,(a=n.map((function(e){return{value:e.name,label:e.name}}))).push({value:"All",label:"All"}),j(a),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();Object(r.useEffect)((function(){ce()}),[]);var se=function(){D(!1)},oe=function(e){y.current&&y.current.contains(e.target)||w(!1)};function ie(e){"Tab"===e.key&&(e.preventDefault(),w(!1))}var le=function(){var e=Object(d.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,D(!1),e.next=4,h.create("/pastes/keyword",{name:L});case 4:A(""),ce(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),ue=c.a.useRef(g);c.a.useEffect((function(){!0===ue.current&&!1===g&&y.current.focus(),ue.current=g}),[g]);var de=function(){var e=Object(d.a)(u.a.mark((function e(n,a){var r,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,"keyword"!==a){e.next=8;break}return e.next=4,h.update("/pastes",{_id:n});case 4:r=l.filter((function(e){return e._id!==n})),t(r),e.next=10;break;case 8:return e.next=10,h.update("/logs",{_id:n});case 10:c=l.filter((function(e){return e._id!==n})),t(c),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),console.error(e.t0);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(t,n){return e.apply(this,arguments)}}();return Object(a.jsx)("div",{className:f.grow,children:Object(a.jsx)(T.a,{size:"small",className:f.appBar,id:"wrapper",children:Object(a.jsxs)(E.a,{className:f.toolbar,children:[Object(a.jsx)(m.a,{className:f.title,variant:"h6",noWrap:!0,children:"DarkNet"}),Object(a.jsxs)("div",{className:f.search,children:[Object(a.jsx)("div",{className:f.searchIcon,children:Object(a.jsx)(Y.a,{})}),Object(a.jsx)(B.a,{size:"small",id:"searchInput",placeholder:"Search\u2026",classes:{root:f.inputRoot,input:f.inputInput},value:n,onChange:function(e){return s(e)}})]}),Object(a.jsx)("div",{sytle:{width:"100px"}}),Object(a.jsx)("div",{}),Object(a.jsx)("div",{id:"buttons",className:f.buttons2,children:Object(a.jsx)(H,{lables:z,setLables:Q,options:p,setOptions:j,pastes:o,setPastes:i})}),Object(a.jsxs)("div",{children:[Object(a.jsx)(U.a,{onClick:function(){D(!0)},children:"add keyword"}),Object(a.jsxs)($.a,{open:N,onClose:se,"aria-labelledby":"form-dialog-title",children:[Object(a.jsx)(ae.a,{id:"form-dialog-title",children:"Add keyword"}),Object(a.jsxs)(te.a,{children:[Object(a.jsx)(ne.a,{children:"add a new keyword"}),Object(a.jsx)(Z.a,{autoFocus:!0,margin:"dense",id:"name",label:"new keyword",type:"text",fullWidth:!0,onChange:function(e){return A(e.target.value)}})]}),Object(a.jsxs)(ee.a,{children:[Object(a.jsx)(U.a,{onClick:se,color:"primary",children:"Cancel"}),Object(a.jsx)(U.a,{onClick:le,color:"primary",children:"Add"})]})]}),Object(a.jsx)("div",{id:"buttons",className:f.buttons1})]}),Object(a.jsxs)("div",{id:"buttons",className:f.buttons1,children:[Object(a.jsx)(_.a,{ref:y,"aria-controls":g?"menu-list-grow":void 0,"aria-haspopup":"true",onClick:function(){w((function(e){return!e}))},id:"sortByUnDone",title:"sort by undone",size:"small",variant:"contained",color:"primary",children:Object(a.jsx)(M.a,{badgeContent:l.length,color:"secondary",children:Object(a.jsx)(J.a,{color:"action"})})}),Object(a.jsx)(q.a,{open:g,anchorEl:y.current,role:void 0,style:{overflowY:"auto",height:"300px"},transition:!0,disablePortal:!0,children:function(e){var t=e.TransitionProps,n=e.placement;return Object(a.jsx)(G.a,Object(I.a)(Object(I.a)({},t),{},{style:{transformOrigin:"bottom"===n?"center top":"center bottom"},children:Object(a.jsx)(K.a,{children:Object(a.jsx)(W.a,{onClickAway:oe,children:Object(a.jsx)(O.a,{autoFocusItem:g,onKeyDown:ie,children:0!==l.length&&l.map((function(e){return Object(a.jsxs)(X.a,{style:{marginTop:"2rem",display:"grid"},severity:"info",children:[Object(a.jsx)(m.a,{children:e.text}),Object(a.jsx)(V.a,{onClick:function(){return de(e._id,e.type)},children:"mark as read"})]})}))})})})}))}})]})]})})})},se=(n(105),n(173),n(260)),oe=n(40),ie=n.n(oe);function le(e){return Object(a.jsx)(Q.a,Object(I.a)({elevation:6,variant:"filled"},e))}var ue=Object(x.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}}));function de(e){var t=e.faildLogs,n=e.keyword1,s=ue(),o=c.a.useState(!1),i=Object(b.a)(o,2),l=i[0],u=i[1],d=c.a.useState(!1),p=Object(b.a)(d,2),j=p[0],f=p[1];Object(r.useEffect)((function(){t.filter((function(e){return ie()(e.date).toDate().valueOf()>ie()().subtract(2,"minutes").valueOf()})).length>0&&u(!0)}),[t]),Object(r.useEffect)((function(){n.filter((function(e){return ie()(e.date).toDate().valueOf()>ie()().subtract(8,"hours").valueOf()})).length>0&&f(!0)}),[n]);var h=function(e,t){"clickaway"!==t&&u(!1)},O=function(e,t){"clickaway"!==t&&f(!1)};return Object(a.jsxs)("div",{className:s.root,children:[Object(a.jsx)(se.a,{open:l,autoHideDuration:6e3,onClose:h,children:Object(a.jsx)(le,{onClose:h,severity:"error",children:"scrawler crashed"})}),Object(a.jsx)(se.a,{open:j,autoHideDuration:6e3,onClose:O,children:Object(a.jsx)(le,{onClose:O,severity:"info",children:"new paste with keyword Money Detached!"})})]})}var be=n(106),pe=n.n(be);var je=function(){var e=Object(r.useState)([]),t=Object(b.a)(e,2),n=t[0],c=t[1],s=Object(r.useState)([]),o=Object(b.a)(s,2),l=o[0],p=o[1],f=Object(r.useState)([]),O=Object(b.a)(f,2),x=O[0],v=O[1],m=Object(r.useState)([]),g=Object(b.a)(m,2),w=g[0],y=g[1],k=Object(r.useState)([]),C=Object(b.a)(k,2),N=C[0],D=C[1],S=Object(r.useState)([]),I=Object(b.a)(S,2),L=I[0],A=I[1],T=function(){var e=Object(d.a)(u.a.mark((function e(){var t,n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.getPastes("/pastes");case 3:t=e.sent,n=t.data,a=n.sort((function(e,t){return new Date(t.Date)-new Date(e.Date)})),c(a),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}(),E=function(){var e=Object(d.a)(u.a.mark((function e(t){var n,a,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.getPastes("/logs/".concat(t));case 3:return n=e.sent,a=n.data,r=a.map((function(e){return{text:"scroller ".concat(e.status," || ").concat(ie()(e.date).format("ddd DD-MMM-YYYY, hh:mm A")),_id:e._id,date:e.date,type:"log"}})),v(r),e.abrupt("return",r);case 10:e.prev=10,e.t0=e.catch(0),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),_=function(){var e=Object(d.a)(u.a.mark((function e(t){var n,a,r,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j.a.post("/api/v1/pastes/lable1",t);case 3:return n=e.sent,a=n.data,r=a.map((function(e){return e[0].map((function(t){return{text:"word with keyword ".concat(e[1].keyword," || ").concat(ie()(t.Date).format("DD-MM-YY, hh:mm A")),_id:t._id,date:t.Date,type:"keyword"}}))})),c=[],r.forEach((function(e){c.push.apply(c,Object(i.a)(e))})),y(c),e.abrupt("return",c);case 12:e.prev=12,e.t0=e.catch(0),console.error(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}(),B=Object(r.useCallback)(pe()((function(e){return M(e)}),1e3),[]),M=function(){var e=Object(d.a)(u.a.mark((function e(t){var n,a,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.getPastes("/pastes/search?search=".concat(t));case 3:n=e.sent,a=n.data,r=a.sort((function(e,t){return new Date(t.date)-new Date(e.date)})),c(r),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}(),R=function(){var e=Object(d.a)(u.a.mark((function e(t){var n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=[],t.forEach((function(e){n.push.apply(n,Object(i.a)(e))})),a=n.sort((function(e,t){return new Date(t.date)-new Date(e.date)})),D(a);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Y=function(){var e=Object(d.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=[E("faild"),_(L)],Promise.all(t).then((function(e){R(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){try{0!==L.length&&Y();var e=setInterval(Object(d.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Y();case 1:case"end":return e.stop()}}),e)}))),3e4);return function(){clearInterval(e)}}catch(t){console.error(t)}}),[L]),Object(r.useEffect)((function(){T()}),[]),Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(ce,{setAllNotitfications:D,allNotitfications:N,setPastes:c,pastes:n,faildLogs:x,handleChange:function(e){var t=e.target.value;p(t),B(t)},searchText:l,fetchAll:Y,options:L,setOptions:A}),x.length>0&&Object(a.jsx)("div",{style:{marginTop:"5rem"},children:Object(a.jsx)(de,{keyword1:w,faildLogs:x})}),Object(a.jsx)("div",{className:"mainArea",style:{marginTop:"3rem"},children:Object(a.jsx)("div",{className:"allPastes",style:{overflowY:"auto"},children:0!==n.length&&n.map((function(e,t){return Object(a.jsx)(P,{paste:e},t)}))})})]})},fe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,261)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))};o.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(je,{})}),document.getElementById("root")),fe()}},[[175,1,2]]]);
//# sourceMappingURL=main.206cd72c.chunk.js.map