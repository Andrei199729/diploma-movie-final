class MoviesApi {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _getResponseData(res) {
        return res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}`));
    }


    getMovies() {
        return fetch(`${this._url}`, {
            headers: this._headers,
        }).then(this._getResponseData);
    };
};

const moviesApi = new MoviesApi({
    url: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default moviesApi;