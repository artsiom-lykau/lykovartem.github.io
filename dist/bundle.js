/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by lykovartem on 27.12.2016.
	 */


	const layoutRender = __webpack_require__(1);
	const search = __webpack_require__(3);

	layoutRender.renderLayout();
	search();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by lykovartem on 31.12.2016.
	 */

	const vars = __webpack_require__(2);

	function renderLayout() {
	    let wrapper = document.createElement('div');
	    wrapper.setAttribute('class', 'wrapper');
	    document.body.appendChild(wrapper);

	    let searchContainer = document.createElement('div');
	    searchContainer.setAttribute('class', 'search-container');
	    searchContainer.innerHTML =
	        '<label><input id="search" placeholder="Enter a query..." value="" type="search"/>' +
	        '<button id="search-button"><i class="fa fa-search" aria-hidden="true"></i></button></label>';
	    wrapper.appendChild(searchContainer);

	    let videoBoard = document.createElement('div');
	    videoBoard.setAttribute('class', 'video-board');
	    videoBoard.setAttribute('id', 'video-board');
	    wrapper.appendChild(videoBoard);

	    let videoList = document.createElement('ul');
	    videoList.setAttribute('class', 'video-list');
	    videoList.setAttribute('id', 'video-list');
	    videoBoard.appendChild(videoList);

	    let pages = document.createElement('ul');
	    pages.setAttribute('class', 'pages');
	    pages.setAttribute('id', 'pages-list');
	    wrapper.appendChild(pages);
	}

	function setVideoListWidth() {
	    let videoList = document.getElementById('video-list');
	    videoList.style.width = `${2 * videoList.childElementCount * vars.VIDEO_ELEMENT_WIDTH_WITH_MARGINS}px`;
	    return videoList.childNodes;
	}

	module.exports = {
	    renderLayout,
	    setVideoListWidth
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Created by lykovartem on 02.01.2017.
	 */

	let vars = {
	    VIDEO_ELEMENT_WIDTH_WITH_MARGINS: 330,
	    ACTIVE_PAGE_COLOR: '#DB5461',
	    DEFAULT_PAGE_COLOR: '#393D3F',
	};

	module.exports = vars;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by lykovartem on 03.01.2017.
	 */

	const request = __webpack_require__(4);
	const resize = __webpack_require__(6);
	const vars = __webpack_require__(2);
	const pagination = __webpack_require__(7);
	const swipeHandler = __webpack_require__(8);


	function search() {
	    document.getElementById('search-button').addEventListener('click', callback);
	    document.getElementById('search').addEventListener('keypress', callback);

	    function callback(e) {
	        if (e.keyCode ? e.keyCode == 13 : true) {

	            let videoList = document.getElementById('video-list');
	            let query = document.getElementById('search').value;
	            let pagesList = document.getElementById('pages-list');

	            videoList.innerHTML = '';
	            vars.query = query;
	            request(query).then(videoList => resize(videoList));
	            window.onresize = () => resize(videoList.childNodes);
	            window.onload = swipeHandler();
	            videoList.style.left = `0px`;
	            pagesList.innerHTML = '';
	        }
	    }
	}

	module.exports = search;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by lykovartem on 31.12.2016.
	 */

	const slideRender = __webpack_require__(5);
	const vars = __webpack_require__(2);
	const layoutRender = __webpack_require__(1);


	function request(query, pageToken) {
	    return fetch(`https://www.googleapis.com/youtube/v3/search?pageToken=${pageToken || ''}&key=AIzaSyAyooU1ihXvK4FvCWPL0BELxO_aGlihvJg&type=video&part=snippet&maxResults=15&q=${vars.query}`)
	        .then(response => response.json())
	        .then(data => {
	            vars.token = data.nextPageToken;
	            return data.items.map(item => item.id.videoId)
	        })
	        .then(idArray => idArray.join(','))
	        .then(idString => {
	            return fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${idString}&key=AIzaSyAyooU1ihXvK4FvCWPL0BELxO_aGlihvJg`)
	                .then(response => response.json())
	                .then(data => {
	                    let infoArray = [];
	                    data.items.forEach(item => {
	                        let videoInfo = {
	                            href: `https://www.youtube.com/watch?v=${item.id}`,
	                            title: item.snippet.title,
	                            autor: item.snippet.channelTitle,
	                            descr: item.snippet.description,
	                            img: item.snippet.thumbnails.medium.url,
	                            date: `${item.snippet.publishedAt.slice(0, 10)}, ${item.snippet.publishedAt.slice(11, 19)}`,
	                            views: item.statistics.viewCount,
	                            hrefChannel: `https://www.youtube.com/channel/${item.snippet.channelId}`,
	                            likeCount: item.statistics.likeCount,
	                            dislikeCount: item.statistics.dislikeCount,
	                        };
	                        infoArray.push(videoInfo)
	                    });
	                    return infoArray
	                });
	        })
	        .then(infoArray => {
	            infoArray.forEach(item => {
	                slideRender(item)
	            });
	            return layoutRender.setVideoListWidth();
	        })
	        .then(videoList => {
	            return videoList;
	        })
	}

	module.exports = request;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Created by lykovartem on 31.12.2016.
	 */

	function render(item) {
	    let element = document.createElement('li');
	    let videoList = document.getElementById('video-list');
	    element.setAttribute('class', 'video-element');
	    element.innerHTML =
	        `<a href="${item.href}"><img src="${item.img}" alt="${item.title}"></a>
	                             <h4 class="title"><a href="${item.href}">${item.title}</a></h4>
	                             <p class="description">${item.descr}</p>
	                             <h5><a href="${item.hrefChannel}">
	                                <i class="fa fa-user" aria-hidden="true"></i> ${item.autor}</a>
	                             </h5>
	                             <p><i class="fa fa-calendar" aria-hidden="true"></i> ${item.date}</p>
	                             <p class="views"><i class="fa fa-eye" aria-hidden="true"></i> ${item.views}</p>
	                             <p class="likes"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> ${item.likeCount}</p>
	                             <p class="dislikes"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i> ${item.dislikeCount}</p>`;
	    videoList.appendChild(element);
	    element.setAttribute('data-el', `${videoList.childElementCount}`);

	}

	module.exports = render;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by lykovartem on 03.01.2017.
	 */

	const vars = __webpack_require__(2);
	const pagination = __webpack_require__(7);

	function resize(videoList) {
	    let videoPerPage = Math.floor(window.outerWidth / vars.VIDEO_ELEMENT_WIDTH_WITH_MARGINS) || 1;
	    let videoBoardWidth = videoPerPage * vars.VIDEO_ELEMENT_WIDTH_WITH_MARGINS;
	    let videoBoard = document.getElementById('video-board');

	    videoBoard.style.width = `${videoBoardWidth}px`;

	    vars.videoPerPage = videoPerPage;
	    vars.videoBoardWidth = videoBoardWidth;
	    pagination.pagination(videoList);
	}

	module.exports = resize;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by lykovartem on 03.01.2017.
	 */

	const vars = __webpack_require__(2);
	const resize = __webpack_require__(6);
	const request = __webpack_require__(4);

	function renderPages() {
	    let pagesCount = Math.round(vars.videoUl.childElementCount / vars.videoPerPage);

	    for (let i = 0; i < pagesCount; i++) {
	        let page = document.createElement('li');
	        page.setAttribute('data-page', `${i + 1}`);
	        page.innerHTML = `${i + 1}`;
	        vars.pagesList.appendChild(page);
	    }
	    Array.from(vars.pagesList.childNodes)[vars.pageNumber - 1].style.color = vars.ACTIVE_PAGE_COLOR;
	}

	function pagination(videoList) {

	    let pagesList = document.getElementById('pages-list');
	    let videoUl = document.getElementById('video-list');
	    vars.pagesList = pagesList;
	    vars.videoUl = videoUl;
	    vars.pagesList.innerHTML = '';

	    let pageNumber = Math.floor(-(parseInt(vars.videoUl.style.left, 10) / vars.videoBoardWidth) + 1);
	    vars.pageNumber = pageNumber;

	    let leftmostElement = videoList[(pageNumber - 1) * vars.videoPerPage];
	    let offset = (Math.ceil((leftmostElement.dataset.el / vars.videoPerPage) - 1) * -vars.videoBoardWidth);
	    document.getElementById('video-list').style.left = `${offset}px`;

	    renderPages();

	    vars.pagesList.onclick = function (e) {
	        if (e.target.nodeName == 'LI') {
	            changePage(e.target);
	        }
	    };
	}

	function changePage(prevPage) {
	    let prevPageNumber = prevPage.dataset.page - 1;
	    let leftOffset = -(prevPageNumber) * vars.videoBoardWidth;
	    let pageNumber = -(leftOffset / vars.videoBoardWidth) + 1;
	    vars.pageNumber = pageNumber;

	    vars.videoUl.style.left = `${leftOffset}px`;

	    Array.from(vars.pagesList.childNodes).forEach(item => {
	        item.style.color = vars.DEFAULT_PAGE_COLOR;
	    });
	    Array.from(vars.pagesList.childNodes)[vars.pageNumber - 1].style.color = vars.ACTIVE_PAGE_COLOR;

	    if (vars.videoUl.childElementCount - pageNumber * vars.videoPerPage < vars.videoPerPage) {
	        request(vars.query, vars.token)
	            .then(() => {
	                vars.pagesList.innerHTML = '';
	                renderPages();
	            })
	    }
	}

	module.exports = {
	    pagination,
	    changePage
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by lykovartem on 31.12.2016.
	 */

	const vars = __webpack_require__(2);
	const pagination = __webpack_require__(7);


	function swipeHandler() {
	    document.getElementById('video-board').ontouchstart = handleStart;
	    document.ontouchmove = handleMove;
	    document.getElementById('video-board').onmousedown = handleStart;
	    document.onmousemove = handleMove;

	    let xDown;
	    let yDown;

	    function handleStart(e) {
	        e.preventDefault();

	        xDown = e.clientX || e.touches[0].clientX;
	        yDown = e.clientY || e.touches[0].clientY;
	    }

	    function handleMove(e) {
	        e.preventDefault();

	        if (!xDown) {
	            return;
	        }

	        let xUp = e.clientX || e.touches[0].clientX;
	        let yUp = e.clientY || e.touches[0].clientY;

	        let xDiff = xDown - xUp;
	        let yDiff = yDown - yUp;

	        let videoUl = document.getElementById('video-list');
	        let leftOffset = parseInt(videoUl.style.left, 10);
	        let prevPage = -(leftOffset / vars.videoBoardWidth) + 1;
	        let pagesList = document.getElementById('pages-list').childNodes;


	        if (Math.abs(xDiff) > Math.abs(yDiff)) {
	            if (xDiff > 0) {
	                pagination.changePage(pagesList[prevPage]);
	            }
	            else if (xDiff < 0 && leftOffset != 0) {
	                pagination.changePage(pagesList[prevPage - 2]);
	            }
	        }
	        Array.from(pagesList)[vars.pageNumber - 1].scrollIntoView();
	        xDown = 0;
	    }
	}

	module.exports = swipeHandler;

/***/ }
/******/ ]);