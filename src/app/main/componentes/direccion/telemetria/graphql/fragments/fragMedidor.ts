import {gql} from 'apollo-angular';
import {fragRecibosCfe} from '@telemetria/fragments/fragRecibosCfe';

export const fragMedidor = gql`
    fragment fragMedidor on MedidorType
    {
        fechaInstalacion
        fechaRetiro
        medidor
        activa
        recibos
        {
            ...fragRecibosCfe
        }
    }
    ${fragRecibosCfe}
`;
