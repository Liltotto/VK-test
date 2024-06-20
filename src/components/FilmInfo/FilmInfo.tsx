import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
// import filter from "../../store/filter";
import { useEffect, useState } from "react";
import useFilmsService, { Film } from "../../services/FilmsService";
import skeletPoster from '../../assets/OutOfPoster.jpg';
import { useQuery } from "@tanstack/react-query";


const FilmInfo = observer(() => {

    const { getFilmById } = useFilmsService()

    const { filmId } = useParams()

    const [filmData, setFilmData] = useState<Film>({} as Film)

    const { data, isLoading, error, isSuccess } = useQuery({
        queryKey: ['film', filmId],
        queryFn: () => getFilmById(Number(filmId)),
    })

    useEffect(() => {
        if (isSuccess && data) {
            setFilmData(data)
        }


    }, [isSuccess, data])

    //const data = filter.showedFilms.find((film) => film.id === Number(filmId))

    return (
        <div className="films__info">
            {isLoading && <h2>Loading...</h2>}
            {error && <h2>Произошла ошибка</h2>}
            {isSuccess && filmData && (
                <>
                    <h1 className="films__title"><span>Film</span> info</h1>
                    <div className="films__info-core">
                        <img className="films__info-image" src={filmData.poster || skeletPoster} alt={filmData.name} />
                        <div className="films__info-text">
                            <h2>{filmData.name}</h2>
                            <p>{filmData.description}</p>
                            <p>{`Оценка imdb: ${filmData.rating}`}</p>
                            {/* <div className="films__info-genres">
                                <p><b>Жанры:</b> </p>
                                <div style={{ display: 'flex', gap: '10px' }}>{filmData.genres?.map((genre) => <p key={genre.name}>{genre.name}</p>)}</div>
                            </div> */}

                            <div className="films__info-genres">
                                <p><b>Жанры:</b> {filmData.genres?.map((genre) => genre.name).join(', ')}</p>
                            </div>

                            <p>{`${filmData.year} г.`}</p>
                        </div>
                        <Link to="/">
                            <button className="films__info-button">Назад</button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
})

export default FilmInfo;