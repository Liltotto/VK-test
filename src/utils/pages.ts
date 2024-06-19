import { Film } from "../services/FilmsService";

export const getPagesArray = (totalPages: number) => {
    const result = [];
    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1)
    }
    return result;
}

// interface Genre {
//     name: string;
//   }

// interface Item extends Partial<Film> {
//     genres: Genre[];
// }

export const getUniqueGenres = (arr: Film[]): string[] => {
    const uniqueGenres: string[] = [];

    console.log('object');
    console.log(arr);

    arr.forEach((item) => {
        if (item.genres) {
            item.genres.forEach((genre) => {
                if (!uniqueGenres.includes(genre.name)) {
                    uniqueGenres.push(genre.name);
                }
            });
        }

    });

    return uniqueGenres;
}