


import FilmsItem from "../FilmsItem/FilmsItem";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useFilmsService, { Film } from "../../services/FilmsService";
import { getPagesArray, getUniqueGenres } from "../../utils/pages";
import { observer } from "mobx-react-lite";
import filter from "../../store/filter";


const FilmsList = observer(() => {

    const { getAllFilms } = useFilmsService()

    const [page, setPage] = useState<number>(1)
    const pagesArray = getPagesArray(5)

    const { data, isLoading, error, isSuccess } = useQuery({
        queryKey: ['films', page],
        queryFn: () => getAllFilms(page),
    })



    const [filteredFilms, setFilteredFilms] = useState([])

    const [showedFilms, setshowedFilms] = useState(50)


    function filterMoviesByGenres(movies: Film[], selectedGenres: string[]): Film[] {
        if (!selectedGenres.length) { return movies }
        return movies.filter((movie) => {
            if (!movie.genres) {
                return false;
            }

            const movieGenres = movie.genres.map((genre) => genre.name);
            return selectedGenres.every((genre) => movieGenres.includes(genre));
        });
    }

    function filterMoviesByRating(movies: Film[], minRating: number, maxRating: number): Film[] {
        return movies.filter((movie) => movie.rating >= minRating && movie.rating <= maxRating);
    }

    function filterMoviesByDate(movies: Film[], minDate: number, maxDate: number): Film[] {
        return movies.filter((movie) => movie.rating >= minDate && movie.rating <= maxDate);
    }



    useEffect(() => {
        if (isSuccess) {
            const genresToRender = getUniqueGenres(data)
            filter.setGenres(genresToRender)
            setFilteredFilms(data)
        }



    }, [isSuccess, data])

    useEffect(() => {
        if (isSuccess) {
            let filtered = data;
            filtered = filterMoviesByGenres(filtered, filter.selectedGenres);
            setFilteredFilms(filtered);
        }
    }, [isSuccess, data, filter.selectedGenres]);

    useEffect(() => {
        if (isSuccess) {
            let filtered = data;
            filtered = filterMoviesByRating(filtered, filter.ratingDiapason[0], filter.ratingDiapason[1]);
            setFilteredFilms(filtered);
        }
    }, [isSuccess, data, filter.ratingDiapason]);

    useEffect(() => {
        if (isSuccess) {
            let filtered = data;
            filtered = filterMoviesByDate(filtered, filter.dateDiapason[0], filter.dateDiapason[1]);
            setFilteredFilms(filtered);
        }
    }, [isSuccess, data, filter.dateDiapason]);

    return (
        <div>
            <ul className="films__list">
                {isLoading && <h2>Loading...</h2>}
                {error && <h2>Произошла ошибка</h2>}
                {isSuccess && filteredFilms && (
                    <>
                        {filteredFilms.map(item => <FilmsItem key={item.id} data={item} />)}

                    </>

                )}
            </ul>

            <div className="films__pages">
                {pagesArray.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setPage(item)}
                        className={page === item ? 'films__pages-item films__pages-item_active' : 'films__pages-item'}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>

    );
})

export default FilmsList;