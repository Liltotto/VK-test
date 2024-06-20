
import { Link } from 'react-router-dom';
import skeletPoster from '../../assets/OutOfPoster.jpg';
import { Film } from '../../services/FilmsService';

interface FilmCard extends Partial<Film> {
    id: number
    name: string
    poster: string
    rating: number
    year: number
}

function FilmsItem({ data }: { data: FilmCard }) {

    const nameCorrected = data.name.length > 30 ? data.name.slice(0, 25) + '...' : data.name

    return (
        <li className="films__item">

            <Link to={`/${data.id}`}>
                <img className="films__item-image" src={data.poster || skeletPoster} alt={data.name} />

                <div className="films__item-info">
                    <p className="films__item-title">{nameCorrected}</p>
                    <p className="films__item-rating">{`Оценка IMDB: ${data.rating || 'отсуствует'}`}</p>
                    <p className="films__item-year">{`${data.year} г.`}</p>
                </div>
            </Link>

        </li>
    );
}

export default FilmsItem;