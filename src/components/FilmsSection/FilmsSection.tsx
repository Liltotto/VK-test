
import { useState } from 'react';
import FilmsFilter from '../FilmsFilter/FilmsFilter';
import FilmsList from '../FilmsList/FilmsList';
import './filmsSection.scss';

export default function FilmsSection() {


	return (
		<div className="films">
			<header className="films__header">
				<h1 className="films__title">List of <span>films</span></h1>
				<FilmsFilter />
			</header>
			<FilmsList />
		</div>

	)
}
