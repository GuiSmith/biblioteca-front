import SmartImage from "@componentes/SmartImage";


const Cartao = ({ img = {}, titulo, botoes = [], children }) => {
    return (
        <div className='card d-flex flex-row' style={{minHeight: '150px' }}>
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
                <div className="d-flex gap-2 justify-content-between">
                    {botoes.map((botao, index) => (
                        <span key={index}>{botao}</span>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Cartao;