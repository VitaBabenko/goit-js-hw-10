import Notiflix from 'notiflix';
import { list } from './index';
import { info } from './index';

function fetchCountries(name) {
    const BASE_URL = 'https://restcountries.com/v3.1/name';
    return fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`)
        .then(resp => {
            if (!resp.ok) {
                if (resp.status === 404) {
                    Notiflix.Notify.failure("Oops, there is no country with that name");
                    info.innerHTML = [];
                    list.innerHTML = [];
                }
                throw new Error(resp.status)
            }

            return resp.json()
        })
}

export { fetchCountries };