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
                             <h5><a href="${item.hrefChannel}">${item.autor}</a></h5>
                             <p>${item.date}</p>
                             <p class="views">Views: ${item.views}</p>
                             <p class="likes">likes: ${item.likeCount}</p>
                             <p class="dislikes">dislikes: ${item.dislikeCount}</p>`;
    videoList.appendChild(element);
    element.setAttribute('data-el', `${videoList.childElementCount}`);

}

module.exports = render;
