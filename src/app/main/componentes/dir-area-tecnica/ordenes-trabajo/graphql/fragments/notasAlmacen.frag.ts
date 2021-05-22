import gql from 'graphql-tag';

export const fragMaterial = gql`
    fragment fragMaterial on MaterialType
    {
        cantidad
        descripcion
        uMedida
    }
`;

export const fragNotasAlmacen = gql`
    fragment  fragNotasAlmacen on NotasType
    {
        nota
        material
        {
            ...fragMaterial
        }
    }
    ${fragMaterial}
`;
