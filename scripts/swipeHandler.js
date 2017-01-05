/**
 * Created by lykovartem on 31.12.2016.
 */

const vars = require('./vars');
const request = require('./request');
const pagination = require('./pagination');


function swipeHandler() {
    document.getElementById('video-board').ontouchstart = handleStart;
    document.ontouchmove = handleMove;


   /* document.getElementById('video-board').removeEventListener('touchstart', handleStart)
    document.getElementById('video-board').addEventListener('touchstart', handleStart, false)
    document.removeEventListener('touchmove', handleMove)
    document.addEventListener('touchmove', handleMove, false)*/


    document.getElementById('video-board').onmousedown = handleStart;
    document.onmousemove = handleMove;

    let xDown;
    let yDown;

    function handleStart(e) {
        e.preventDefault()
        console.log('handleStart')
        xDown = e.clientX || e.touches[0].clientX;
        yDown = e.clientY || e.touches[0].clientY;
        // console.log(xDown, yDown)
    }

    function handleMove(e) {
        e.preventDefault();
        // console.log('handleMove')

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
                console.log('prevPage = ' + prevPage);
                pagination.changePage(pagesList[prevPage]);

            }
            else if (xDiff < 0 && leftOffset != 0) {
                console.log('prevPage = ' + prevPage);
                pagination.changePage(pagesList[prevPage - 2]);
            }
        }
        xDown = 0;
    }
}

module.exports = swipeHandler;