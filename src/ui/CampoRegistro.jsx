// Bibliotecas
import { useState, useEffect } from "react";

const CampoRegistro = ({ idProps = {}, textoProps = {}, children }) => {

    const [textDisabled,setTextDisabled] = useState(false);
    
    useEffect(() => {
        console.log(textDisabled);
    },[textDisabled]);

    return (
        <div>
            <input
                style={{
                    width: '10%',
                    display: 'inline-block',
                    borderTopRightRadius: '0',
                    borderBottomRightRadius: '0'
                }}
                onChange={(e) => {
                    console.log(e.target.value);
                    setTextDisabled(e.target.value > 0)
                }}
                pattern="[0-9]+"
                type='text'
                className='form-control'
                {...idProps} />
            <input
                style={{
                    width: '90%',
                    display: 'inline-block',
                    borderTopLeftRadius: '0',
                    borderBottomLeftRadius: '0'
                }}
                disabled={textDisabled}
                type="text"
                className='form-control'
                {...textoProps} />
            {children}
        </div>
    )
}

export default CampoRegistro;