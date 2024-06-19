import axios from "axios";

export interface Film {
    id: string
    name: string
    poster: string
    description: string
    rating: number
    year: number
    genres: {name: string}[]
}

const useFilmsService = () => {

    const _apiBase = 'https://api.kinopoisk.dev/v1.4/movie'
    const _apiToken = 'VYXWM4V-NTR44BP-QY5DYAS-XDNQQDD'

    const getAllFilms = async (page: number = 1) : Promise<Film[]> => {
        const result = await axios.get(_apiBase, {
            params: {
                limit: 50,
                page
            },
            headers: {
                    'X-API-KEY': _apiToken
                }
            }
        );
        console.log(result);
        const transformedFilms = result.data.docs.map((item: unknown) => {
            return _transformFilm(item);
        });
        return transformedFilms;

    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _transformFilm = (film: any) : Film => {
        return {
            id: film.id,
            name: film.name || film.alternativeName,
            poster: film.poster?.url,
            description: film.description || film.shortDescription,
            rating: film.rating.imdb,
            year: film.year,
            genres: film.genres
        }
    }

    return { getAllFilms }
}

export default useFilmsService