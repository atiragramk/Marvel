import { useState } from "react";
import {Helmet} from "react-helmet";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharSearch from "../charSearch/charSearch";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedId, setSelectedId] = useState(null);

    const getId = (id) => {
        setSelectedId(id)
    }



    return (
        <>

            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                    />
                <title>Marvel information portal</title>

            </Helmet>

            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <CharSearch/>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList getId={getId}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={selectedId}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}
export default MainPage;