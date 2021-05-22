import {gql} from 'apollo-angular';

export const fragLecturas = gql`
    fragment fragLecturas on LecturasType
    {
        ano
        ene
        feb
        mar
        abr
        may
        jun
        jul
        ago
        sep
        oct
        nov
        dic
        total
    }
`;