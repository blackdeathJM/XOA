import {fragBomba} from './fragBomba';
import {fragLecturas} from './fragLecturas';
import {fragMedidor} from './fragMedidor';
import {fragMotor} from './fragMotor';
import {fragParametrosElectricos} from './fragParametrosElectricos';
import {gql} from '@apollo/client';

export const fragInstalacion = gql`
    fragment fragInstalacion on InstalacionType
    {
        _id
        nombre
        direccion
        noInstalacion
        profPozo
        diamPerfo
        diamAdeme
        diamColumna
        longColumna
        fechaReg
        fechaRet
        activo
        telemetria
        {
            radio
            plc
            switch
            repetidor
            camara
        }
        parametrosElectricos
        {
            voltajes
            {
                ...fragParametrosElectricos
            }
            amperajes
            {
                ...fragParametrosElectricos
            }
            factorPotencia
            {
                ...fragParametrosElectricos
            }
            kilowatts
            {
                ...fragParametrosElectricos
            }
        }
        bomba
        {
            ...fragBomba
        }
        motor
        {
            ...fragMotor
        }
        lecturas
        {
            macro
            {
                ...fragLecturas
            }
            cfe
            {
                ...fragLecturas
            }
            nivelD
            {
                ...fragLecturas
            }
            nivelE
            {
                ...fragLecturas
            }
        }
        medidores
        {
            ...fragMedidor
        }
    }
    ${fragMedidor}
    ${fragBomba}
    ${fragMotor}
    ${fragParametrosElectricos}
    ${fragLecturas}
`;
