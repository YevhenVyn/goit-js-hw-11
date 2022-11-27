import axios from 'axios';
const KEY = '31558954-93d8154f3a56d27c67498c1c8';
const BASE_URL = 'https://pixabay.com/api';

const searchOptionsObject = {
    key: KEY,
    image_type:'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
};

export default class PicturesAPIService {
    constructor(){
        this.searchRequest = '';
        this.page = 1;
        this.obj = searchOptionsObject
    }

    async fetchPictures(){
        // console.log(this.searchRequest);
        this.obj.q = this.searchRequest;
        this.obj.page = this.page;

        const requestParam = Object.entries(this.obj)
        .map(el=>el.join('='))
        .join('&');

        const URL = `${BASE_URL}?${requestParam}`;

        const r = await axios.get(URL);
        return r;
    }    

    increasePageNumber(){
        this.page +=1
    }

    resetPageNumber(){
        this.page =1
    }



    get searchValue(){
        return this.searchRequest;
    }

    set searchValue(newSearch){
        this.searchRequest = newSearch;
    }
}



