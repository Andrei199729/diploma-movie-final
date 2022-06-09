class MainApi {
  constructor({ address }) {
    this.address = address;
  }

  _getResponseData(res) {
    return res.ok
      ? res.json()
      : Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getSaveMovies() {
    return fetch(`${this.address}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: this.getToken(),
      },
    }).then(this._getResponseData);
  }

  getAboutUser() {
    return fetch(`${this.address}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: this.getToken(),
      },
    }).then(this._getResponseData);
  }

  editProfile(data) {
    return fetch(`${this.address}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: this.getToken(),
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._getResponseData);
  }

  saveMovie(movieData) {
    return fetch(`${this.address}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: this.getToken(),
      },
      body: JSON.stringify(movieData),
    }).then(this._getResponseData);
  }

  deleteMovie(dataId) {
    return fetch(`${this.address}/movies/${dataId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: this.getToken(),
      },
    }).then(this._getResponseData);
  }
  getToken() {
    return `Bearer ${localStorage.getItem("token")}`;
  }
}

const mainApi = new MainApi({
  address: "https://api.arahalevich.movie.nomoredomains.work",
});

export default mainApi;
