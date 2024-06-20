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

    function filterMovies(
        movies: Film[],
        selectedGenres: string[],
        minRating: number,
        maxRating: number,
        minDate: number,
        maxDate: number
      ): Film[] {
        
        return movies
          .filter((movie) =>
            !selectedGenres.length
              ? true
              : selectedGenres.every((genre) =>
                  movie.genres?.map((g) => g.name).includes(genre)
                )
          )
          .filter((movie) => {
            if (!movie.rating) {
              return false;
            }
            return movie.rating >= minRating && movie.rating <= maxRating;
          })
          
          .filter((movie) => {
            if (!movie.year) {
              return false;
            }
            return movie.year >= minDate && movie.year <= maxDate;
          })}



    useEffect(() => {
        if (isSuccess) {
            const genresToRender = getUniqueGenres(data)
            filter.setGenres(genresToRender)
            filter.setFilteredFilms(data)
            filter.setShowedFilms(data)
        }
        console.log('1223231');


    }, [data])


    useEffect(() => {
        if (isSuccess) {
          filter.setFilteredFilms(
            filterMovies(
              data,
              filter.selectedGenres,
              filter.ratingDiapason[0],
              filter.ratingDiapason[1],
              filter.dateDiapason[0],
              filter.dateDiapason[1]
            )
          );
        }
      }, [filter.selectedGenres, filter.ratingDiapason, filter.dateDiapason, data]);

    return (
        <div>
            <ul className="films__list">
                {isLoading && <h2>Loading...</h2>}
                {error && <h2>Произошла ошибка</h2>}
                {isSuccess && filter.showedFilms && (
                    <>
                        {filter.showedFilms.map(item => <FilmsItem key={item.id} data={item} />)}
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