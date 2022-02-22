

class MarvelServices {



    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // _apiKey = 'apikey=d3355dee865c20d85e3e61765ea2d752'
    _apiKey = 'apikey=d49d3fc6fdb7197b16ad7a483365dd89'
    _offset = 550 

    getResource = async (url) => {
        let res = await fetch(url); 

        if (!res.ok) { 
            throw new Error (`Could not fetch ${url}, status: ${res.status}`);

        }

        return await res.json();
    } 

    getAllCharacters = async(offset = this._offset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformData)  
    }
    

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformData(res.data.results[0]);
    }

    _transformData = (char) => {
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
}

export default MarvelServices