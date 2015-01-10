function getHandler(links, options) {
    return function (e) {
        options = options || {};
        options.event = e;
        blueimp.Gallery(links, options);
    };
}

(function () {
    var images = document.getElementsByClassName('image');
    for (var i = 0; i < images.length; i++) {
        var img = images[i].childNodes[0];
        var link = images[i].parentNode;
        var src = img.src;
        link.onclick = getHandler([src]);
    }
}());
(function () {
    var videos = document.getElementsByClassName('video');
    for (var i = 0; i < videos.length; i++) {
        var preview = videos[i].childNodes[0];
        var link = videos[i].parentNode;
        var videoId = link.getAttribute('data-id');
        link.onclick = getHandler([{
            href: link.href,
            type: 'text/html',
            youtube: videoId,
            poster: preview.src
        }], {
            youTubeClickToPlay: false
        });
    }
}());
(function () {
    var galleries = document.getElementsByClassName('gallery-container');
    for (var i = 0; i < galleries.length; i++) {
        var gallery = galleries[i];
        var imagesHtml = gallery.getElementsByTagName('img');
        var images = [];
        for (var j = 0; j < imagesHtml.length; j++) {
            images.push(imagesHtml[j].src);
        }
        gallery.onclick = getHandler(images);
    }
}());
(function () {
    var up = document.getElementsByClassName('go-up-btn')[0];
    if (up) {
        up.onclick = function (e) {
            e.stopPropagation && e.stopPropagation();
            e.preventDefault && e.preventDefault();
            window.scrollTo && window.scrollTo(0, 0);
            return false;
        };
    }
}());
