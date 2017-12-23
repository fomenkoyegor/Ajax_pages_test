function get_request(url, onresponse) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        onresponse(xhr.response, xhr.status, xhr.statusText);
    };
    xhr.send();
}

var page = {
    init: function () {
        this.navigator.init();
    }
};
page.navigator = {
    init: function () {
        this.menu = document.querySelector('.nav');
        this.container = document.querySelector('.container');
        this.eventAttach();

       this.openP(this.menu.querySelector("a").getAttribute("href"));
    },
    eventAttach: function () {
        this.menu.addEventListener('click', function (e) {
            e.preventDefault();
            if (e.target.matches("a")) this.openP(e.target.getAttribute("href"));
        }.bind(this));
    },
    openP: function (pageUrl) {
        get_request(pageUrl, function (response) {
            this.container.innerHTML = response;
        }.bind(this))
    }
};


window.addEventListener('load', function () {
    page.init()
});
