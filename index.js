(function () {
    var video = document.querySelector('.camera__video');
    var filters = [ 'camera__video__grayscale',
                    'camera__video__invert',
                    'camera__video__threshold' ];

    var getVideoStream = function (callback) {
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true},
                function (stream) {
                    video.src = window.URL.createObjectURL(stream);
                    video.onloadedmetadata = function (e) {
                        video.play();

                        callback();
                    };
                },
                function (err) {
                    console.log("The following error occured: " + err.name);
                }
            );
        } else {
            console.log("getUserMedia not supported");
        }
    };

    var applyFilter = function () {
        var selectedFilter = document.querySelector('.controls__filter').value;

        for (var i = 0; i < filters.length; i++) {
            video.classList.remove(filters[i]);
        }

        video.classList.add('camera__video__' + selectedFilter);
    };

    getVideoStream(function () {
        setInterval(applyFilter, 16);
    });
})();
