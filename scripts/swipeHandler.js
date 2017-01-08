/**
 * Created by lykovartem on 31.12.2016.
 */

const vars = require('./vars');
const pagination = require('./pagination');


function swipeHandler() {
    document.getElementById('video-board').ontouchstart = handleStart;
    document.ontouchmove = handleMove;
    document.getElementById('video-board').onmousedown = handleStart;
    document.onmousemove = handleMove;

    let xDown;
    let yDown;

    function handleStart(e) {
        // e.preventDefault();

        xDown = e.clientX || e.touches[0].clientX;
        yDown = e.clientY || e.touches[0].clientY;
    }

    function handleMove(e) {
        // e.preventDefault();

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
        // Array.from(pagesList)[vars.pageNumber - 1].scrollIntoView();
        xDown = 0;
    }
}

module.exports = swipeHandler;