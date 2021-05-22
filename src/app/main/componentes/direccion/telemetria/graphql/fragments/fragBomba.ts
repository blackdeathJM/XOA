import {gql} from '@apollo/client/core';

export const fragBomba = gql`
    fragment fragBomba on BombaType
    {
        id
        observaciones
        imgEvidenciaInst
        imgEvidenciaRet
        serie
        marca
        activa
        fechaRetiro
        fechaInstalacion
        descripcion
        diametro
        eficiencia
        lts
        modelo
        noImpulsores
        rpm
        tipo
        motivoRetiro
    }
`;
