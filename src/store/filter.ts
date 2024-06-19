import { makeAutoObservable } from "mobx"


class Filter {
    selectedGenres: string[] = []
    genres: string[] = []
    ratingDiapason = [0, 10]
    dateDiapason = [1990, (() => {
        const now = new Date();
        return now.getFullYear();
      })()];

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
}

export default new Filter()