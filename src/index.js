import './css/styles.css';
import _debounce from "lodash.debounce";
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
// import PicturesAPIService from './pixabay-api-async';
import PicturesAPIService from './pixabay-api-async-axios';


// const DEBOUNCE_DELAY = 1000;
const formRef = document.querySelector('#search-form');
const inputRef = formRef.querySelector('input');
const submitBtnRef = document.querySelector('button[type = submit]');
const galleryRef = document.querySelector('.gallery');
const imageRef = document.querySelector('.photo-card__image');
const loadMoreBtnRef = document.querySelector('.load-more');
const picturesAPIService = new PicturesAPIService;


  function handleSearchBtn (event){
    event.preventDefault();

    galleryRef.innerHTML = '';
    picturesAPIService.searchRequest = event.currentTarget.elements.searchQuery.value;

    picturesAPIService.resetPageNumber();
 
    picturesAPIService.fetchPictures().then(responceData => {
      console.log(picturesAPIService.obj)
        if(responceData.data.total === 0) {
            return errorMessage('Sorry, there are no images matching your search query. Please try again.')
        }
        addGalleryToHTML(responceData)            
        successMessage(`Hooray! We found ${responceData.data.totalHits} images.`);
        loadMoreBtnRef.classList.remove('is-hidden')

        if((picturesAPIService.obj.page) * picturesAPIService.obj.per_page >= responceData.data.totalHits){
          handleNoMoreHits();
        }
    })
    .catch (handleErrorResponce)
}

function handleNoMoreHits(){
  loadMoreBtnRef.setAttribute('disabled', true);
  loadMoreBtnRef.classList.add('disabled-button');
  loadMoreBtnRef.textContent = `We're sorry, but you've reached the end of search results.`
}

function handleLoadMoreBtn(){
    picturesAPIService.increasePageNumber();
    picturesAPIService.fetchPictures().then(responceData =>{
        if((picturesAPIService.obj.page+1) * picturesAPIService.obj.per_page >= responceData.data.totalHits){
          handleNoMoreHits();
        }
            return addGalleryToHTML(responceData)})
            .catch (handleErrorResponce)
}

function createGallery(responceObj){
    console.log(responceObj)
    return responceObj.data.hits.map(el => {const {webformatURL, tags, likes, views, comments, downloads, largeImageURL} = el;
        return `<div class="photo-card">
        <a class="photo-card__image" href="${largeImageURL}">
        <img src="${webformatURL}" alt='${tags}' loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b><br>${likes}
          </p>
          <p class="info-item">
            <b>Views</b><br>${views}
          </p>
          <p class="info-item">
            <b>Comments</b><br> ${comments }
          </p>
          <p class="info-item">
            <b>Downloads</b><br>${downloads }
          </p>
        </div>
      </div>`}
    ).join('');
}

function addGalleryToHTML(responceData){
  const galleryContainer = createGallery(responceData);

  galleryRef.insertAdjacentHTML('beforeend',galleryContainer);

  let lightbox = new SimpleLightbox('.gallery .photo-card__image', {
});
return lightbox;
}

function handleErrorResponce(errorResponce){
  Notiflix.Notify.failure(errorResponce.message);
}

function infoMessage (message){
    Notiflix.Notify.info(message)
};

function errorMessage(message){
    Notiflix.Notify.failure(message)
};

function successMessage(message){
     Notiflix.Notify.success(message)
};

// function showLargePictureByClick(event) {
//     event.preventDefault();
//     if (!event.target.classList.contains('photo-card__image'))
//     {return};
//   };
  
  // imageRef.addEventListener('click',showLargePictureByClick);

formRef.addEventListener('submit', handleSearchBtn )
loadMoreBtnRef.addEventListener('click',handleLoadMoreBtn)

// function checkAxios(event){
//   event.preventDefault();
//   picturesAPIService.searchRequest = event.currentTarget.elements.searchQuery.value;
//   picturesAPIService.fetchPictures().then(responceData => {
//     console.log(responceData)
//   })
// }

// formRef.addEventListener('submit', checkAxios )













