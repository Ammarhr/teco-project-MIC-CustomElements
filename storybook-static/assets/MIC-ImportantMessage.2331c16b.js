import{S as V,i as W,s as Y,e as j,a as g,t as E,c as z,b as C,d,r as q,o as J,g as B,I as K,u as v,w as h,v as u,D as N,A as T,B as H,F as Q,G as U,x as S,H as L,q as I,z as D,j as X,C as F,m as Z,n as $,N as x}from"./index.3f9d4901.js";import{M as ee}from"./MIC-ImportantMessagesDetails.30ee8c4c.js";import{f as se,u as O,g as te}from"./LazyImage.778e8951.js";const le=[{Title:"Removing Your Envelope.",Code:"MESG_REM_ENVELOPE",message:`<p>We&rsquo;ve noticed that you have been paying your bill electronically lately. To help cut down on clutter and waste, we are no longer including a remittance envelope with your bill. Should you want to mail in your payment, you can request a payment envelope by calling 813-223-0800 or simply use a regular envelope and address it to TECO P.O. Box 31318, Tampa, Florida 33631-3318.</p>
`}],ie={messages:le};function ne(r){let e,s,t,l,i,o,a,n,m,p,f,M;function c(_,w){return _[2]||_[2]&&_[2]!==""?me:re}let y=c(r),k=y(r),b=r[0].messages&&G(r);return{c(){e=v("div"),s=v("div"),t=v("div"),k.c(),l=h(),i=v("h4"),i.textContent="Important Message",o=h(),a=v("img"),m=h(),b&&b.c(),u(t,"class","message-counter svelte-10mbdro"),u(i,"id","title"),u(i,"class","svelte-10mbdro"),N(a.src,n="https://tecocdn.azureedge.net/ibill/iBill-assets/toggle.svg")||u(a,"src",n),u(a,"alt",""),u(a,"id",r[4]),u(a,"class","svelte-10mbdro"),u(s,"id","message-header"),u(s,"class","svelte-10mbdro"),u(e,"class","container svelte-10mbdro"),u(e,"style",r[5])},m(_,w){g(_,e,w),T(e,s),T(s,t),k.m(t,null),T(s,l),T(s,i),T(s,o),T(s,a),T(e,m),b&&b.m(e,null),p=!0,f||(M=[H(O.call(null,a)),Q(s,"click",r[12])],f=!0)},p(_,w){y===(y=c(_))&&k?k.p(_,w):(k.d(1),k=y(_),k&&(k.c(),k.m(t,null))),(!p||w&16)&&u(a,"id",_[4]),_[0].messages?b?(b.p(_,w),w&1&&C(b,1)):(b=G(_),b.c(),C(b,1),b.m(e,null)):b&&(B(),E(b,1,1,()=>{b=null}),z()),(!p||w&32)&&u(e,"style",_[5])},i(_){p||(C(b),p=!0)},o(_){E(b),p=!1},d(_){_&&d(e),k.d(),b&&b.d(),f=!1,U(M)}}}function ae(r){let e,s;return{c(){e=S("Error: "),s=S(r[7])},m(t,l){g(t,e,l),g(t,s,l)},p(t,l){l&128&&L(s,t[7])},i:I,o:I,d(t){t&&d(e),t&&d(s)}}}function oe(r){let e;return{c(){e=v("mic-loading")},m(s,t){g(s,e,t)},p:I,i:I,o:I,d(s){s&&d(e)}}}function re(r){let e,s,t,l,i,o;return{c(){e=v("img"),t=h(),l=v("span"),l.textContent=`\xA0${0}\xA0`,N(e.src,s="https://tecocdn.azureedge.net/ibill/iBill-assets/envelope-solid.svg")||u(e,"src",s),u(e,"alt",""),u(l,"id","unreaded-msgs"),u(l,"class","svelte-10mbdro")},m(a,n){g(a,e,n),g(a,t,n),g(a,l,n),i||(o=H(O.call(null,e)),i=!0)},p:I,d(a){a&&d(e),a&&d(t),a&&d(l),i=!1,o()}}}function me(r){let e,s,t,l,i,o=r[0].messages.length+"",a,n,m,p;return{c(){e=v("img"),t=h(),l=v("span"),i=S("\xA0"),a=S(o),n=S("\xA0"),N(e.src,s="https://tecocdn.azureedge.net/ibill/iBill-assets/envelope-solid.svg")||u(e,"src",s),u(e,"alt",""),u(l,"id","unreaded-msgs"),u(l,"class","svelte-10mbdro")},m(f,M){g(f,e,M),g(f,t,M),g(f,l,M),T(l,i),T(l,a),T(l,n),m||(p=H(O.call(null,e)),m=!0)},p(f,M){M&1&&o!==(o=f[0].messages.length+"")&&L(a,o)},d(f){f&&d(e),f&&d(t),f&&d(l),m=!1,p()}}}function G(r){let e,s,t=r[3]&&P(r);return{c(){t&&t.c(),e=j()},m(l,i){t&&t.m(l,i),g(l,e,i),s=!0},p(l,i){l[3]?t?(t.p(l,i),i&8&&C(t,1)):(t=P(l),t.c(),C(t,1),t.m(e.parentNode,e)):t&&(B(),E(t,1,1,()=>{t=null}),z())},i(l){s||(C(t),s=!0)},o(l){E(t),s=!1},d(l){t&&t.d(l),l&&d(e)}}}function P(r){let e,s,t,l,i,o;function a(c,y){return c[2]&&c[2]!==""?ue:ce}let n=a(r),m=n(r);const p=[ge,pe],f=[];function M(c,y){return c[0].messages[0].empty?0:1}return l=M(r),i=f[l]=p[l](r),{c(){e=v("div"),m.c(),s=h(),t=v("div"),i.c(),u(e,"class","message-body svelte-10mbdro"),u(t,"class","message-footer svelte-10mbdro")},m(c,y){g(c,e,y),m.m(e,null),g(c,s,y),g(c,t,y),f[l].m(t,null),o=!0},p(c,y){n===(n=a(c))&&m?m.p(c,y):(m.d(1),m=n(c),m&&(m.c(),m.m(e,null)));let k=l;l=M(c),l===k?f[l].p(c,y):(B(),E(f[k],1,1,()=>{f[k]=null}),z(),i=f[l],i?i.p(c,y):(i=f[l]=p[l](c),i.c()),C(i,1),i.m(t,null))},i(c){o||(C(i),o=!0)},o(c){E(i),o=!1},d(c){c&&d(e),m.d(),c&&d(s),c&&d(t),f[l].d()}}}function ce(r){let e;return{c(){e=v("p"),e.textContent="No Messages",u(e,"class","msg-data svelte-10mbdro"),D(e,"height","105px"),D(e,"text-align","center")},m(s,t){g(s,e,t)},p:I,d(s){s&&d(e)}}}function ue(r){let e;function s(i,o){return!i[0].messages[0].empty&&i[0].messages[0]&&i[0].messages[0].Title!==""!==""?_e:fe}let t=s(r),l=t(r);return{c(){e=v("div"),l.c(),u(e,"class","msg-data svelte-10mbdro")},m(i,o){g(i,e,o),l.m(e,null)},p(i,o){t===(t=s(i))&&l?l.p(i,o):(l.d(1),l=t(i),l&&(l.c(),l.m(e,null)))},d(i){i&&d(e),l.d()}}}function fe(r){let e;return{c(){e=v("span"),u(e,"class","svelte-10mbdro")},m(s,t){g(s,e,t),e.innerHTML=r[2]},p(s,t){t&4&&(e.innerHTML=s[2])},d(s){s&&d(e)}}}function _e(r){let e,s,t=r[0].messages[0].Title+"",l,i,o,a,n=r[0].messages[0].Title!==""&&R();return{c(){e=v("span"),s=v("p"),l=S(t),i=h(),n&&n.c(),o=h(),a=new x(!1),u(s,"class","msg-title svelte-10mbdro"),a.a=null,u(e,"class","svelte-10mbdro")},m(m,p){g(m,e,p),T(e,s),T(s,l),T(e,i),n&&n.m(e,null),T(e,o),a.m(r[2],e)},p(m,p){p&1&&t!==(t=m[0].messages[0].Title+"")&&L(l,t),m[0].messages[0].Title!==""?n||(n=R(),n.c(),n.m(e,o)):n&&(n.d(1),n=null),p&4&&a.p(m[2])},d(m){m&&d(e),n&&n.d()}}}function R(r){let e;return{c(){e=v("br")},m(s,t){g(s,e,t)},d(s){s&&d(e)}}}function pe(r){let e,s,t,l,i;return l=new ee({props:{messages:r[0].messages}}),{c(){e=v("mic-messagesdetails"),t=h(),X(l.$$.fragment),F(e,"messages",s=r[0].messages)},m(o,a){g(o,e,a),g(o,t,a),Z(l,o,a),i=!0},p(o,a){(!i||a&1&&s!==(s=o[0].messages))&&F(e,"messages",s);const n={};a&1&&(n.messages=o[0].messages),l.$set(n)},i(o){i||(C(l.$$.fragment,o),i=!0)},o(o){E(l.$$.fragment,o),i=!1},d(o){o&&d(e),o&&d(t),$(l,o)}}}function ge(r){let e;return{c(){e=v("span")},m(s,t){g(s,e,t)},p:I,i:I,o:I,d(s){s&&d(e)}}}function de(r){let e,s,t,l;const i=[oe,ae,ne],o=[];function a(n,m){return n[6]?0:n[7]?1:n[1]&&n[1].messages&&n[0]&&n[0].messages&&n[0].messages[0]&&n[8]!==!0?2:-1}return~(e=a(r))&&(s=o[e]=i[e](r)),{c(){s&&s.c(),t=j()},m(n,m){~e&&o[e].m(n,m),g(n,t,m),l=!0},p(n,[m]){let p=e;e=a(n),e===p?~e&&o[e].p(n,m):(s&&(B(),E(o[p],1,1,()=>{o[p]=null}),z()),~e?(s=o[e],s?s.p(n,m):(s=o[e]=i[e](n),s.c()),C(s,1),s.m(t.parentNode,t)):s=null)},i(n){l||(C(s),l=!0)},o(n){E(s),l=!1},d(n){~e&&o[e].d(n),n&&d(t)}}}function be(r,e,s){let t,l,i,o;q(r,te,_=>s(8,o=_));let a={},n,m=!0,p="rotate-svg-"+m;const[f,M,c,y]=se();q(r,f,_=>s(1,t=_)),q(r,M,_=>s(6,l=_)),q(r,c,_=>s(7,i=_)),J(()=>{K(f,t=ie,t)});let k;const b=()=>{s(3,m=!m),s(4,p="rotate-svg-"+m),m===!0?s(5,k="max-height: 200vh;opacity: 1;transition:200ms;"):s(5,k="height: unset;margin: 0; transition:200ms;")};return r.$$.update=()=>{r.$$.dirty&2&&t&&t.messages&&s(0,a=t),r.$$.dirty&1&&(a&&a.messages&&a.messages[0]&&a.messages[0].message&&a.messages[0].message.length&&a.messages[0].message.length>1e6?s(2,n=a.messages[0].message.slice(0,300-a.messages[0].Title.length)+"..."):a&&a.messages&&a.messages[0]&&a.messages[0].message&&a.messages[0].message!==""&&s(2,n=a.messages[0].message))},[a,t,n,m,p,k,l,i,o,f,M,c,b]}class A extends V{constructor(e){super(),W(this,e,be,de,Y,{})}}const Me=A;A.__docgen={version:3,name:"MIC-ImportantMessage.svelte",data:[],computed:[],methods:[],components:[],description:null,keywords:[],events:[],slots:[],refs:[]};export{Me as M};
//# sourceMappingURL=MIC-ImportantMessage.2331c16b.js.map
