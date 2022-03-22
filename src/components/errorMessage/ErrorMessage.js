import Error from './error.gif'

const ErrorMessage = (props) => {
    return (
        // <img src={process.env.PUBLIC_URL + '/Error.gif'} alt="" /> //редко используется
        <img 
        style={props.grid ? {margin: '0 auto', background: 'none', display: 'block', gridColumn: '2'} : {margin: '0 auto', background: 'none', display: 'block'}} 
        src={Error} alt="" />

    )
}

export default ErrorMessage