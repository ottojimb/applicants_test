function getApi(url) {
    'use strict';

    let ajax = new XMLHttpRequest();

    //defined as promise - ES6
    return new Promise((res, rej) => {
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
                if(ajax.status === 200) {
                    //resolve the promise
                    res(JSON.parse(ajax.responseText));
                } else {
                    //reject the promise
                    rej(ajax.responseText);
                }
            }
            //else: readyState <> 4 is not functional as promise
        };
        //open the connection. By default it's async (used for multipart forms)
        ajax.open('GET', url);
        ajax.send();
    });
}

export {getApi};