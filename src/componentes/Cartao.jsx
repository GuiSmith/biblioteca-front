import SmartImage from "@componentes/SmartImage";


const Cartao = ({ img = {}, titulo, botoes = [], className = '', children }) => {
    return (
        <div className={`card d-flex flex-row ${className}`} style={{minHeight: '150px' }}>
            <SmartImage
                src={img.src}
                alt=""
                className='card-img-left'
                style={{
                        maxWidth: '100px',
                        objectFit: 'cover',
                        borderRadius: '4%'
                }}
            />
            <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <div className='card-text'>
                    {children}
                </div>
                <div className="d-flex flex-wrap gap-2 justify-content-between">
                    {botoes.map((botao, index) => (
                        <span key={index}>{botao}</span>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Cartao;