import {gql} from 'apollo-angular';
import {fragOrdenesTrabajo} from './fragments/ordenes-trabajo.fragment';

export const regOrdenTrabajo = gql`
    mutation regOrdenTrabajo($ordenTrabajo: OrdenesTrabajoInput)
    {
        regOrdenTrabajo(ordenTrabajo: $ordenTrabajo)
        {
            estatus
            mensaje
            documento
            {
                ...fragOrdenesTrabajo
            }
        }
    }
    ${fragOrdenesTrabajo}
`;
