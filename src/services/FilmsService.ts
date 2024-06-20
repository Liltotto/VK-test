import axios from "axios";

export interface Film {
    id: number
    name: string
    poster: string
    description: string
    rating: number
    year: number
    genres: { name: string }[]
}

const useFilmsService = () => {

    const _apiBase = 'https://api.kinopoisk.dev/v1.4/movie'
    const _apiToken = 'A5TRXA7-GQQMVZA-HEZJW91-NJSHK4Y'

    const getAllFilms = async (page: number = 1): Promise<Film[]> => {
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

    const getFilmById = async (id: number): Promise<Film> => {
        try {
            const result = await axios.get(`${_apiBase}/${id}`, {
                headers: {
                    'X-API-KEY': _apiToken,
                },
            });
            return _transformFilm(result.data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _transformFilm = (film: any): Film => {
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

    return { getAllFilms, getFilmById }
}

export default useFilmsService