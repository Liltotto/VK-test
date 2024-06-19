import { useState } from "react";
//import Dropdown from "../UI/Dropdown/Dropdown";
import 'rc-slider/assets/index.css';
import TooltipSlider from "../TooltipSlider/TooltipSlider";
import { observer } from "mobx-react-lite";
import filter from "../../store/filter";

const FilmsFilter = observer(({ setSelectedOptionFormGlobal, setSelectedOptionPositionGlobal }) => {

	//const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

	const handleClickGenres = (item: string) => {
		if (filter.selectedGenres.includes(item)) {
			filter.setSelectedGenres(filter.selectedGenres.filter(genre => genre !== item))
		} else {
			filter.setSelectedGenres([...filter.selectedGenres, item])
		}
	}

	

	const [diapasonRating, setDiapasonRating] = useState([0, 10]);


	const handleSliderChangeRating = (values: number[]) => {
		filter.setRatingDiapason(values[0], values[1]);
	}

	const handleSliderChangeDate = (values: number[]) => {
		filter.setDateDiapason(values[0], values[1]);
	}

	return (
		<div className="films__filter">
			<div className="films__filter-core">
				<div className="films__filter-items">

					<div className="films__filter-genres">
						{filter.genres.map((item) => (
							<button key={item} onClick={() => handleClickGenres(item)}>{item}</button>
						))}
					</div>

					<TooltipSlider
						range
						min={0}
						max={10}
						defaultValue={[3, 10]}
						tipFormatter={(value) => `${value}`} tipProps={undefined}
						onChange={handleSliderChangeRating} />

					<TooltipSlider
						range
						min={0}
						max={10}
						defaultValue={[3, 10]}
						tipFormatter={(value) => `${value}`} tipProps={undefined}
						onChange={handleSliderChangeDate} />
				</div>

				{/* <button className="films__filter-button" onClick={handleClick}>Search</button> */}
			</div>



			

		</div>
	)
})

export default FilmsFilter