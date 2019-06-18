import { domain, api_key } from '../ultils';
const getTopMovie = (callBackSuccess) => {

    fetch(`https://api.themoviedb.org/3/list/1?api_key=b85f43f08277cb889092aeac5c20ef5a&language=en-US&page=1`)
        .then((response) => response.json())//convert sang json
        .then((responseJson) => {//noi nhan du lieu sau khi convert
            console.log("responseJson", responseJson);
            callBackSuccess(responseJson);
        })
        .catch((error) => {
            console.error(error);
        });
}
const theloai = (so,cbSuccess) => {

    fetch(`https://api.themoviedb.org/3/list/3?api_key=b85f43f08277cb889092aeac5c20ef5a&language=en-US&page=1`)
        .then((response) => response.json())//convert sang json
        .then((responseJson) => {//noi nhan du lieu sau khi convert
            console.log("responseJson", responseJson);
            cbSuccess(responseJson);
        })
        .catch((error) => {
            console.error(error);
        });
}
const searchMovie = (keyword, callBackSuccess) => {
    fetch(`${domain}search/movie?api_key=${api_key}&language=en-US&query=${keyword}&page=1`)
        .then((response) => response.json())//convert sang json
        .then((responseJson) => {//noi nhan du lieu sau khi convert
            console.log("responseJson", responseJson);
            callBackSuccess(responseJson);
        })
        .catch((error) => {
            console.log("error", error);
        });
}
const dangnhap = (user, pass,cbSuccess) => { 
    fetch(`http://2f6a2975.ngrok.io/api/login/username=${user}&password=${pass}`) 
        .then((response) => response.json())//convert sang json
        .then((responseJson) => {//noi nhan du lieu sau khi convert
            console.log("responseJson", responseJson);
            cbSuccess(responseJson);
        })
        .catch((error) => {
            console.log("error", error);
        });
}
const danhsachphim = (cbSuccess) => { 
    fetch(`http://2f6a2975.ngrok.io/api/likes`) 
        .then((response) => response.json())//convert sang json
        .then((responseJson) => {//noi nhan du lieu sau khi convert
            console.log("responseJson", responseJson);
            cbSuccess(responseJson);
        })
        .catch((error) => {
            console.log("error", error);
        });
}

const postComment = (text, id_movie, name, callBackSuccess) => {
    fetch("http://2f6a2975.ngrok.io/api/comment", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment: text,
            id_movie: id_movie,
            username:"admin",
        })
    })

        .then((response) => response.json())
        .then((responseData) => {

            callBackSuccess(responseData);
        })
        .done(); 
}
const checkLuu = (id_movie, username, callBackSuccess) => {
    fetch("http://2f6a2975.ngrok.io/api/like/check", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_movie: id_movie,
            username:username,
        })
    })

        .then((response) => response.json())
        .then((responseData) => {

            callBackSuccess(responseData);
        })
        .done(); 
}
const postLike = (id_movie, name_movie, username ,url_image,release_date, vote_average , callBackSuccess) => {
    fetch("http://2f6a2975.ngrok.io/api/like", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_movie: id_movie,
            name_movie:name_movie,
            username:username,
            url_image:url_image,
            release_date: release_date,
            vote_average:vote_average,
            
        })
    })

        .then((response) => response.json())
        .then((responseData) => {

            callBackSuccess(responseData);
        })
        .done(); 
}
const showComment = (id_movie,callBackSuccess) => {
    fetch("http://2f6a2975.ngrok.io/api/comment/list", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_movie: id_movie,
        })
    })

        .then((response) => response.json())
        .then((responseData) => {

            callBackSuccess(responseData);
        })
        .done(); 
}


export {
    getTopMovie,
    searchMovie,
    postComment,
    theloai,
    dangnhap,
    showComment,
    postLike,
    checkLuu,
    danhsachphim
}