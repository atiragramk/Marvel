(this.webpackJsonpmarvel=this.webpackJsonpmarvel||[]).push([[7],{209:function(t,e,c){},222:function(t,e,c){"use strict";c.r(e);var n=c(38),a=c(30),i=c(4),r=c(31),s=c(0),o=c(6),j=c(25),l=c(10),b=(c(209),c(2)),u=function(){var t=Object(s.useState)([]),e=Object(i.a)(t,2),c=e[0],n=e[1],u=Object(s.useState)(!1),m=Object(i.a)(u,2),O=m[0],d=m[1],f=Object(s.useState)(50),h=Object(i.a)(f,2),v=h[0],x=h[1],p=Object(s.useState)(!1),_=Object(i.a)(p,2),g=_[0],y=_[1],N=Object(r.a)(),S=N.loading,w=N.error,k=N.getComics;Object(s.useEffect)((function(){A(v,!0)}),[]);var C=function(t){var e=!1;t.length<8&&(e=!0),n((function(e){return[].concat(Object(a.a)(e),Object(a.a)(t))})),d(!1),x((function(t){return t+8})),y(e)},A=function(t,e){d(!e),k(t).then(C)};var E=function(t){var e=t.map((function(t,e){var c=t.price,n=t.title,a=t.thumbnail,i=(t.homepage,t.id);return Object(b.jsx)("li",{className:"comics__item",children:Object(b.jsxs)(o.b,{to:"./".concat(i),children:[Object(b.jsx)("img",{src:a,alt:"ultimate war",className:"comics__item-img"}),Object(b.jsx)("div",{className:"comics__item-name",children:n}),Object(b.jsx)("div",{className:"comics__item-price",children:c})]})},e)}));return Object(b.jsx)("ul",{className:"comics__grid",children:e})}(c),I=w?Object(b.jsx)(j.a,{}):null,J=S&&!O?Object(b.jsx)(l.a,{}):null;return Object(b.jsxs)("div",{className:"comics__list",children:[I,J,E,Object(b.jsx)("button",{tyle:{display:g?"none":"block"},disabled:O,onClick:function(){return A(v)},className:"button button__main button__long",children:Object(b.jsx)("div",{className:"inner",children:"load more"})})]})},m=c(90);e.default=function(){return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)(n.a,{children:[Object(b.jsx)("meta",{name:"description",content:"Comics list page"}),Object(b.jsx)("title",{children:"Comics Page"})]}),Object(b.jsx)(m.a,{}),Object(b.jsx)(u,{})]})}},30:function(t,e,c){"use strict";c.d(e,"a",(function(){return i}));var n=c(9);var a=c(7);function i(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||function(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(a.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}}]);
//# sourceMappingURL=7.a61d21f6.chunk.js.map