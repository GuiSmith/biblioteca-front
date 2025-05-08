const Cartao = ({ img = {}, titulo, texto = '', botoes= [] }) => {
    return (
        <div className='card'>
            {img.src && img.alt ? <img src={img.src} alt={img.alt} className="card-img-top" /> : ''}
            <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <p>{texto}</p>
            </div>
        </div>
    )
};

export default Cartao;