/* 
 * Copyright (c) 2016 Juriy Bodunov-Skvortsov (https://github.com/moscow-beast)
 */

function ajсycle(props, callback) {
    var a = {
        encoding: [
            'application/x-www-form-urlencoded',
            'multipart/form-data'
        ],
        init: function () {
            a.xmlhttp = a.getXmlHttp();
            switch (a.props.method) {
                case 'get':
                    a.get();
                    break;
                case 'post':
                    a.post();
                    break;
            }
        },
        getXmlHttp: function () {
            // Древняя как говно мамонта магия IE
            var xmlhttp;
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (E) {
                    xmlhttp = false;
                }
            }
            if (!xmlhttp && typeof XMLHttpRequest !== 'undefined') {
                // Хотя по сути в наше время все используют этот вариант:
                xmlhttp = new XMLHttpRequest();
            }
            return xmlhttp;
        },
        serializeObject: function (obj) {
            var str = [];
            for (var p in obj)
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return str.join("&");
        },
        prepareBodyForPost: function () {
            switch (props.encoding) {
                case 0:
                    return a.serializeObject(a.props.values);
                    break;
                case 1:
                    var boundary = String(Math.random()).slice(2);
                    var boundaryMiddle = '--' + boundary + '\r\n';
                    var boundaryLast = '--' + boundary + '--\r\n'

                    var body = ['\r\n'];
                    for (var key in a.props.values) {
                        body.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n' + a.props.values[key] + '\r\n');
                    }
                    a.encoding[1] += '; boundary=' + boundary;
                    return body.join(boundaryMiddle) + boundaryLast;
                    break;
            }
        },
        get: function () {
            var reqUrl = typeof (a.props.values) === "object" ? a.props.url + '?' + a.serializeObject(a.props.values) : a.props.url;
            a.xmlhttp.open('GET', reqUrl, true);
            a.xmlhttp.send(null);
            a.xmlhttp.onreadystatechange = function () {
                if (a.xmlhttp.readyState === 4) {
                    if (a.xmlhttp.status === 200) {
                        a.callback(a.xmlhttp.responseText);
                    }
                }
            };
        },
        post: function () {
            if (typeof props.encoding !== 'number') {
                props.encoding = 0;
            }
            var body = a.prepareBodyForPost();
            a.xmlhttp.open("POST", a.props.url, true);
            a.xmlhttp.setRequestHeader('Content-Type', a.encoding[props.encoding]);
            a.xmlhttp.onreadystatechange = function () {
                if (a.xmlhttp.readyState === 4) {
                    if (a.xmlhttp.status === 200) {
                        a.callback(a.xmlhttp.responseText);
                    }
                }
            };
            a.xmlhttp.send(body);
        }

    };
    a.props = props;
    a.callback = callback;
    a.init();
}

