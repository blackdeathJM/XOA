import {gql} from 'apollo-angular';
import {fragInstalacion} from '../fragments/fragInstalacion';

export const regInstalacion = gql`
    mutation regInstalacion($instalacion: InstalacionInput!)
    {
        regInstalacion(instalacion: $instalacion)
        {
            estatus
            mensaje
            documento
            {
                ...fragInstalacion
            }
        }
    }
    ${fragInstalacion}
`;
export const actInstalacion = gql`
    mutation actInstalacion($instalacion: InstalacionInput!)
    {
        actInstalacion(instalacion: $instalacion)
        {
            estatus
            mensaje
            documento
            {
                ...fragInstalacion
            }
        }
    }
    ${fragInstalacion}
`;

export const agIps = gql`
    mutation agIps($_id: ID!, $tipo: String!, $ip: String!)
    {
        agIps(_id: $_id, tipo: $tipo, ip: $ip)
        {
            estatus
            mensaje
            documento
            {
                ...fragInstalacion
            }
        }
    }
    ${fragInstalacion}
`;
export const actElimIp = gql`
    mutation actElimIp($_id: ID!, $tipo: String!, $ipAnterior: String!, $ipNva: String)
    {
        actElimIp(_id: $_id, tipo: $tipo, ipAnterior: $ipAnterior, ipNva: $ipNva)
        {
            estatus
            mensaje
            documento
            {
                ...fragInstalacion
            }
        }
    }
    ${fragInstalacion}
`;

export const regParamElectricos = gql`
    mutation regParamElectricos($_id: ID,  $parametrosElectricos: ParametrosInput, $parametro: String!)
    {
        regParamElectricos(_id: $_id, parametrosElectricos: $parametrosElectricos, parametro: $parametro)
        {
            estatus
            mensaje
            documento
            {
                ...fragInstalacion
            }
        }
    }
    ${fragInstalacion}
`;
export const regMotor = gql`
    mutation regMotor($_id: ID!, $motor: MotorInput!)
    {
        regMotor(_id: $_id, motor: $motor)
        {
            estatus
            mensaje
            documento
            {
                ...fragInstalacion
            }
        }
    }
    ${fragInstalacion}
`;

export const actMotor = gql`
    mutation actMotor($_id: ID!, $motor: MotorInput!)
    {
        actMotor(_id: $_id, motor: $motor)
        {
            estatus
            mensaje
            documento
            {
                ...fragInstalacion
            }
        }
    }
    ${fragInstalacion}
`;
export const actBobma = gql`
    mutation actBomba($_id: ID!, $bomba: BombaInput!)
    {
        actBomba(_id: $_id, bomba: $bomba)
        {
            estatus
            mensaje
            documento
            {
                ...fragInstalacion
            }
        }
    }
    ${fragInstalacion}
`;

export const regBomba = gql`
    mutation regBomba($_id: ID!, $bomba: BombaInput!)
    {
        regBomba(_id: $_id, bomba: $bomba)
        {
            estatus
            mensaje
            documento
            {
                ...fragInstalacion
            }
        }
    }
    ${fragInstalacion}
`;

export const bajaEquipo = gql`
    mutation  bajaEquipo($_id: ID!, $id: String!, $fechaBaja: String!, $equipo: String!, $motivoRetiro: String!)
    {
        bajaEquipo(_id: $_id, id:$id, fechaBaja: $fechaBaja, equipo: $equipo, motivoRetiro: $motivoRetiro)
        {
            estatus
            mensaje
            documento
            {
                ...fragInstalacion
            }
        }
    }
    ${fragInstalacion}
`;

export const regLecturas = gql`
    mutation regLecturas($_id: ID!,$tipo: String! $lecturas: LecturasInput!)
    {
        regLecturas(_id: $_id, tipo: $tipo lecturas: $lecturas)
        {
            estatus
            mensaje
            documento
            {
                ...fragInstalacion
            }
        }
    }
    ${fragInstalacion}
`;
export const editarLectura = gql`
    mutation editarLectura($_id: ID!, $ano: Int!, $mes: String!, $tipoLect: String!, $valorMes: Float!, $totalMes: Float!)
    {
        editarLectura(_id: $_id, ano: $ano, mes: $mes, tipoLect: $tipoLect, valorMes: $valorMes, totalMes: $totalMes)
        {
            estatus
            mensaje
            documento
            {
                ...fragInstalacion
            }
        }
    }
    ${fragInstalacion}
`;

export const regMedidor = gql`
    mutation regMedidor($_id: ID!, $medidor: MedidorInput!)
    {
        regMedidor(_id: $_id, medidor: $medidor)
        {
            estatus
            mensaje
            documento
            {
                ...fragInstalacion
            }
        }
    }
    ${fragInstalacion}
`;
export const bajaMedidor = gql`
    mutation bajaMedidor($_id: ID!, $medidor: String!, $fechaBaja: String!)
    {
        bajaMedidor(_id: $_id, medidor: $medidor, fechaBaja: $fechaBaja)
        {
            estatus
            mensaje
            documento
            {
                ...fragInstalacion
            }
        }
    }
    ${fragInstalacion}
`;
export const regReciboCfe = gql`
    mutation regReciboCfe($_id: ID!, $medidor: String!, $reciboCfe: RecibosCfeInput!)
    {
        regReciboCfe(_id: $_id, medidor: $medidor, reciboCfe: $reciboCfe)
        {
            estatus
            mensaje
            documento
            {
                ...fragInstalacion
            }
        }
    }
    ${fragInstalacion}
`;

export const evidencia = gql`
    mutation evidencia($_id: ID!, $id: String, $coleccionImg: [String!], $esInstalacion: Boolean!, $equipo: String!)
    {
        evidencia(_id: $_id, id:$id, coleccionImg: $coleccionImg, esInstalacion: $esInstalacion, equipo: $equipo)
        {
            estatus
            mensaje
            documento
            {
                ...fragInstalacion
            }
        }
    }
    ${fragInstalacion}
`;
