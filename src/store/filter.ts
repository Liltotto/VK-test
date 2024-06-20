import { makeAutoObservable } from "mobx"
import { Film } from "../services/FilmsService";


class Filter {
    selectedGenres: string[] = []
    genres: string[] = []
    ratingDiapason = [0, 10]
    dateDiapason = [1990, 2024];

    filteredFilms: Film[] = [];
    showedFilms: Film[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    setSelectedGenres(genres: string[]) {
        this.selectedGenres = genres
    }

    setGenres(genres: string[]) {
        this.genres = genres
    }

    setRatingDiapason(min: number, max: number) {
        this.ratingDiapason = [min, max]
    }

    setDateDiapason(min: number, max: number) {
        this.dateDiapason = [min, max]
    }

    setFilteredFilms(films: Film[]) {
        this.filteredFilms = films
    }

    setShowedFilms(films: Film[]) {
        this.showedFilms = films
    }
}   

export default new Filter()