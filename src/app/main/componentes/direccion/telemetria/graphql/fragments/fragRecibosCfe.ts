import {gql} from 'apollo-angular';

export const fragRecibosCfe = gql`
    fragment fragRecibosCfe on RecibosCfeType
    {
        dia
        mes
        ano
        costoKw
        pago
        lectura
        imgRecibo
    }
`;
