export const prepareCategoryViewData = (movie = {}) => [
    {
        value: 'tv-show',
        label: 'TV Show',
        selected: movie.category === 'tv-show'
    },
    {
        value: 'animation',
        label: 'Animation',
        selected: movie.category === 'animation'
    },
    {
        value: 'movie',
        label: 'Movie',
        selected: movie.category === 'movie'
    },
];