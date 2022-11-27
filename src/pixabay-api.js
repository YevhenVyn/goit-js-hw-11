const KEY = '31558954-93d8154f3a56d27c67498c1c8';
const BASE_URL = 'https://pixabay.com/api';

const searchOptionsObject = {
    image_type:'photo',
    orientation: 'horizontal',
    safesearch: true,
    key: KEY,
    per_page: 40,
};

export default class PicturesAPIService {
    constructor(){
        this.searchRequest = '';
        this.page = 1;
    }

    fetchPictures(){
        console.log(this.searchRequest);
        const obj = searchOptionsObject;
        obj.q = this.searchRequest;
        obj.page = this.page;

        const requestParam = Object.entries(obj)
        .map(el=>el.join('='))
        .join('&');

        const URL = `${BASE_URL}?${requestParam}`;

        return fetch(URL)
    .then(r=>r.json())
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



