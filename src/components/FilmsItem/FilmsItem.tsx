
import skeletPoster from '../../assets/OutOfPoster.jpg';

function FilmsItem({ data }) {

    const nameCorrected = data.name.length > 30 ? data.name.slice(0, 25) + '...' : data.name

    return (
        <li className="films__item">

            <img className="films__item-image" src={data.poster || skeletPoster} alt={data.name} />

            <div className="films__item-info">
                <p className="films__item-title">{nameCorrected}</p>
                <p className="films__item-rating">{`Оценка IMDB: ${data.rating || 'отсуствует'}`}</p>
                <p className="films__item-year">{`${data.year} г.`}</p>
            </div>

        </li>
    );
}

export default FilmsItem;