import { useHttp } from "../hooks/http.hook";



const  useMarvelServices  = () => {
 
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // _apiKey = 'apikey=d3355dee865c20d85e3e61765ea2d752'
    const _apiKey = 'apikey=d49d3fc6fdb7197b16ad7a483365dd89'
    const _offset = 650 

    

    const getAllCharacters = async(offset = _offset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformData)  
    }
    

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformData(res.data.results[0]);
    }

    const getComics = async (offset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics)
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformData = (char) => {
        return {
            name: char.name,
            description:char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }

    
    const _transformComics = (comic) => {
        return {
            price: comic.prices[0].price,
            title: comic.title,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            homepage: comic.urls[0].url,
            id: comic.id,
            descr: comic.textObjects[0].text,
            lang: comic.textObjects[0].language
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getComics, getComic}
}

export default useMarvelServices