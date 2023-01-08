import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
    const dataInput = evt.target.value.trim();
    if (dataInput === '') {
        info.innerHTML = [];
        list.innerHTML = [];
    } else {
        fetchCountries(dataInput)
            .then(data => {
                if (data.length > 10) {
                    Notiflix.Notify.failure("Too many matches found. Please enter a more specific name.");
                    info.innerHTML = [];
                    list.innerHTML = [];
                } else if (data.length >= 2 && data.length <= 10) {
                    createMarkupList(data)
                } else if (data.length === 1) {
                    createMarkupInfo(data)
                }
            })
            .catch(err => console.log(err))
    }
}

function createMarkupList(obj) {
    const markupList = obj.map(({
        flags: {
            svg
        },
        name: {
            official
        } }) => `<li class="list-item">
        <img src="${svg}" alt="${official}" width="30" height="20">
        <h2 class="list-title">${official}</h2>
        </li>`)
    
    list.innerHTML = markupList.join('');
    info.innerHTML = [];
}

function createMarkupInfo(obj) {
    const markupInfo = obj.map(({
        flags: {
            svg
        },
        name: {
            official
        },
        capital,
        population,
        languages
    }) => `<li>
    <div class="info-container">
    <img src="${svg}" alt="${official}" width="30" height="20">
    <h2 class="info-title">${official}</h2></div>
    <p>
    <span class="info-span">Capital:</span> ${capital}</p>
    <p>
    <span class="info-span">Population:</span> ${population}</p>
    <p>
    <span class="info-span">Languages:</span> ${Object.values(languages)}</p>
    </li>`)

    info.innerHTML = markupInfo.join('');
    list.innerHTML = [];
}