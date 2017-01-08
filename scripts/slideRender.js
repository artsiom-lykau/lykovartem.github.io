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
