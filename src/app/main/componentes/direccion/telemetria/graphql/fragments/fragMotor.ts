import {gql} from 'apollo-angular';

export const fragMotor = gql`
    fragment fragMotor on MotorType
    {
        id
        modelo
        eficiencia
        descripcion
        fechaInstalacion
        activa
        marca
        serie
        imgEvidenciaInst
        imgEvidenciaRet
        observaciones
        amperaje
        factPotencia
        fechaRetiro
        hp
        voltaje
        motivoRetiro
    }
`;
