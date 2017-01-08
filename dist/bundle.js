!function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={exports:{},id:i,loaded:!1};return e[i].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var i=n(1),o=n(3);i.renderLayout(),o()},function(e,t,n){"use strict";function i(){var e=document.createElement("div");e.setAttribute("class","wrapper"),document.body.appendChild(e);var t=document.createElement("div");t.setAttribute("class","search-container"),t.innerHTML='<label><input id="search" placeholder="Enter a query..." value="" type="search"/><button id="search-button"><i class="fa fa-search" aria-hidden="true"></i></button></label>',e.appendChild(t);var n=document.createElement("div");n.setAttribute("class","video-board"),n.setAttribute("id","video-board"),e.appendChild(n);var i=document.createElement("ul");i.setAttribute("class","video-list"),i.setAttribute("id","video-list"),n.appendChild(i);var o=document.createElement("ul");o.setAttribute("class","pages"),o.setAttribute("id","pages-list"),e.appendChild(o)}function o(){var e=document.getElementById("video-list");return e.style.width=2*e.childElementCount*a.VIDEO_ELEMENT_WIDTH_WITH_MARGINS+"px",e.childNodes}var a=n(2);e.exports={renderLayout:i,setVideoListWidth:o}},function(e,t){"use strict";var n={VIDEO_ELEMENT_WIDTH_WITH_MARGINS:330,ACTIVE_PAGE_COLOR:"#DB5461",DEFAULT_PAGE_COLOR:"#393D3F"};e.exports=n},function(e,t,n){"use strict";function i(){function e(e){e.keyCode&&13!=e.keyCode||!function(){var e=document.getElementById("video-list"),t=document.getElementById("search").value,n=document.getElementById("pages-list");e.innerHTML="",r.query=t,o(t).then(function(e){return a(e)}),window.onresize=function(){return a(e.childNodes)},window.onload=s(),e.style.left="0px",n.innerHTML=""}()}document.getElementById("search-button").addEventListener("click",e),document.getElementById("search").addEventListener("keypress",e)}var o=n(4),a=n(6),r=n(2),s=n(8);e.exports=i},function(e,t,n){"use strict";function i(e,t){return fetch("https://www.googleapis.com/youtube/v3/search?pageToken="+(t||"")+"&key=AIzaSyAyooU1ihXvK4FvCWPL0BELxO_aGlihvJg&type=video&part=snippet&maxResults=15&q="+a.query).then(function(e){return e.json()}).then(function(e){return a.token=e.nextPageToken,e.items.map(function(e){return e.id.videoId})}).then(function(e){return e.join(",")}).then(function(e){return fetch("https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id="+e+"&key=AIzaSyAyooU1ihXvK4FvCWPL0BELxO_aGlihvJg").then(function(e){return e.json()}).then(function(e){var t=[];return e.items.forEach(function(e){var n={href:"https://www.youtube.com/watch?v="+e.id,title:e.snippet.title,autor:e.snippet.channelTitle,descr:e.snippet.description,img:e.snippet.thumbnails.medium.url,date:e.snippet.publishedAt.slice(0,10)+", "+e.snippet.publishedAt.slice(11,19),views:e.statistics.viewCount,hrefChannel:"https://www.youtube.com/channel/"+e.snippet.channelId,likeCount:e.statistics.likeCount,dislikeCount:e.statistics.dislikeCount};t.push(n)}),t})}).then(function(e){return e.forEach(function(e){o(e)}),r.setVideoListWidth()}).then(function(e){return e})}var o=n(5),a=n(2),r=n(1);e.exports=i},function(e,t){"use strict";function n(e){var t=document.createElement("li"),n=document.getElementById("video-list");t.setAttribute("class","video-element"),t.innerHTML='<a href="'+e.href+'"><img src="'+e.img+'" alt="'+e.title+'"></a>\n                             <h4 class="title"><a href="'+e.href+'">'+e.title+'</a></h4>\n                             <p class="description">'+e.descr+'</p>\n                             <h5><a href="'+e.hrefChannel+'">\n                                <i class="fa fa-user" aria-hidden="true"></i> '+e.autor+'</a>\n                             </h5>\n                             <p><i class="fa fa-calendar" aria-hidden="true"></i> '+e.date+'</p>\n                             <p class="views"><i class="fa fa-eye" aria-hidden="true"></i> '+e.views+'</p>\n                             <p class="likes"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> '+e.likeCount+'</p>\n                             <p class="dislikes"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i> '+e.dislikeCount+"</p>",n.appendChild(t),t.setAttribute("data-el",""+n.childElementCount)}e.exports=n},function(e,t,n){"use strict";function i(e){var t=Math.floor(window.outerWidth/o.VIDEO_ELEMENT_WIDTH_WITH_MARGINS)||1,n=t*o.VIDEO_ELEMENT_WIDTH_WITH_MARGINS,i=document.getElementById("video-board");i.style.width=n+"px",o.videoPerPage=t,o.videoBoardWidth=n,a.pagination(e)}var o=n(2),a=n(7);e.exports=i},function(e,t,n){"use strict";function i(){for(var e=Math.round(r.videoUl.childElementCount/r.videoPerPage),t=0;t<e;t++){var n=document.createElement("li");n.setAttribute("data-page",""+(t+1)),n.innerHTML=""+(t+1),r.pagesList.appendChild(n)}Array.from(r.pagesList.childNodes)[r.pageNumber-1].style.color=r.ACTIVE_PAGE_COLOR}function o(e){var t=document.getElementById("pages-list"),n=document.getElementById("video-list");r.pagesList=t,r.videoUl=n,r.pagesList.innerHTML="";var o=Math.floor(-(parseInt(r.videoUl.style.left,10)/r.videoBoardWidth)+1);r.pageNumber=o;var s=e[(o-1)*r.videoPerPage],d=Math.ceil(s.dataset.el/r.videoPerPage-1)*-r.videoBoardWidth;document.getElementById("video-list").style.left=d+"px",i(),r.pagesList.onclick=function(e){"LI"==e.target.nodeName&&a(e.target)}}function a(e){var t=e.dataset.page-1,n=-t*r.videoBoardWidth,o=-(n/r.videoBoardWidth)+1;r.pageNumber=o,r.videoUl.style.left=n+"px",Array.from(r.pagesList.childNodes).forEach(function(e){e.style.color=r.DEFAULT_PAGE_COLOR}),Array.from(r.pagesList.childNodes)[r.pageNumber-1].style.color=r.ACTIVE_PAGE_COLOR,r.videoUl.childElementCount-o*r.videoPerPage<r.videoPerPage&&s(r.query,r.token).then(function(){r.pagesList.innerHTML="",i()})}var r=n(2),s=n(4);e.exports={pagination:o,changePage:a}},function(e,t,n){"use strict";function i(){function e(e){e.preventDefault(),n=e.clientX||e.touches[0].clientX,i=e.clientY||e.touches[0].clientY}function t(e){if(n){var t=e.clientX||e.touches[0].clientX,r=e.clientY||e.touches[0].clientY,s=n-t,d=i-r,c=parseInt(o.videoUl.style.left,10),u=-(c/o.videoBoardWidth)+1,l=o.pagesList.childNodes;Math.abs(s)>Math.abs(d)&&(s>0?a.changePage(l[u]):s<0&&0!=c&&a.changePage(l[u-2])),Array.from(l)[o.pageNumber-1].scrollIntoView(),n=0}}document.getElementById("video-board").ontouchstart=e,document.ontouchmove=t,document.getElementById("video-board").onmousedown=e,document.onmousemove=t;var n=void 0,i=void 0}var o=n(2),a=n(7);e.exports=i}]);