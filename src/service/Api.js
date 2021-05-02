import axios from "axios";

const instance = axios.create({
    baseURL: 'https://p0y7ssu9ik.execute-api.us-east-2.amazonaws.com/Prod',
    headers: {
        'content-type':'application/json'
    },
});

const Api = {
    getBookMarks: () =>
        instance({
            'method':'GET',
            'url':'/favoulinks',
        }),
        addBookMark: (bookMark) =>
        instance({
            'method':'POST',
            'url':'/favoulinks',
            'data': bookMark,
        }),
        updateBookMark: (bookMark) =>
        instance({
            'method':'PUT',
            'url':'/favoulinks',
            'data': bookMark,
        }),
        deleteBookMark: (url) =>
        instance({
            'method':'DELETE',
            'url':'/favoulinks',
            'params': {
                'url': url,
            },
        }),
}

export default Api
