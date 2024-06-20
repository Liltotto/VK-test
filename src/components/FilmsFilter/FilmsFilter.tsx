import 'rc-slider/assets/index.css';
import TooltipSlider from "../TooltipSlider/TooltipSlider";
import { observer } from "mobx-react-lite";
import filter from "../../store/filter";

const FilmsFilter = observer(() => {

	const handleClickGenres = (item: string) => {
		if (filter.selectedGenres.includes(item)) {
			filter.setSelectedGenres(filter.selectedGenres.filter(genre => genre !== item))
		} else {
			filter.setSelectedGenres([...filter.selectedGenres, item])
		}
	}

	const handleSliderChangeRating = (values: number[]) => {
		filter.setRatingDiapason(values[0], values[1]);
	}

	const handleSliderChangeDate = (values: number[]) => {
		filter.setDateDiapason(values[0], values[1]);
	}

	const handleClickSearch = () => {
		filter.setShowedFilms(filter.filteredFilms);
	}

	return (
		<div className="films__filter">
			<div className="films__filter-core">
				<div className="films__filter-items">
					<div>
						<div style={{ marginBottom: '10px' }}>Genres</div>
						<div className="films__filter-genres">

							{filter.genres.map((item) => (
								<button
									key={item}
									onClick={() => handleClickGenres(item)}
									className={filter.selectedGenres.includes(item) ? 'films__filter-genres-button active' : 'films__filter-genres-button'}
								>
									{item}
								</button>
							))}
						</div>

					</div>

					<div>
						<div style={{ marginBottom: '10px' }}>Rating</div>
						<TooltipSlider
							range
							min={0}
							max={10}
							defaultValue={[0, 10]}
							tipFormatter={(value) => `${value}`} tipProps={undefined}
							onChange={handleSliderChangeRating} />
					</div>

					<div>
						<div style={{ marginBottom: '10px' }}>Year</div>
						<TooltipSlider
							range
							min={1990}
							max={2024}
							defaultValue={[1990, 2024]}
							tipFormatter={(value) => `${value}`} tipProps={undefined}
							onChange={handleSliderChangeDate} />
					</div>


				</div>

				<button className="films__filter-button" onClick={handleClickSearch}>Search</button>
			</div>





		</div>
	)
})

export default FilmsFilter