/**
 * Created by lykovartem on 03.01.2017.
 */

const request = require('./request');
const resize = require('./resize');
const vars = require('./vars');
const pagination = require('./pagination');
const swipeHandler = require('./swipeHandler');


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
