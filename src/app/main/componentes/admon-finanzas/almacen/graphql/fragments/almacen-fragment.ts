import {gql} from 'apollo-angular';

export const fragNotaAlmacen = gql`
fragment fragNotaAlmacen on NotaAlmacenType
{
    _id
    departamentoId
    ordenID
    noNota
    fechaSalida
    cantidad
    descripcion
    unidadMedida
    emitio
    recibio
}
`;
