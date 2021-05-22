import {gql} from 'apollo-angular';
import {fragDocExt} from '../../../../direccion/documentos/graphql/docExterna.fragment';

export const acDocUrlEnUsuarioDestino = gql`

    mutation acDocUrlEnUsuarioDestino($_id: String!, $usuario: String!, $docUrl: String!, $subproceso: String!)
    {
        acDocUrlEnUsuarioDestino(_id: $_id, usuario: $usuario, docUrl: $docUrl, subproceso: $subproceso)
        {
            estatus
            mensaje
            documento
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;
export const asigElfolioPorTipoDoc = gql`
    mutation asigElfolioPorTipoDoc($documento: DocExtInput!, $refDoc: Int)
    {
        asigElfolioPorTipoDoc(documento: $documento, refDoc: $refDoc)
        {
            estatus
            mensaje
            documento
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;

export const genFolioRespDoc = gql`
    mutation genFolioRespDoc($_id: ID!, $usuario: String!, $centroGestor: String!)
    {
        genFolioRespDoc(_id: $_id, usuario: $usuario, centroGestor: $centroGestor)
        {
            estatus
            mensaje
            documento
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;
export const docRespUrlAcuseUrl = gql`
    mutation docRespUrlAcuseUrl($_id: ID!, $documento: String!, $proceso: String!, $usuario: String!, $esInterno: Boolean!, $esDocRespUrl: Boolean!)
    {
        docRespUrlAcuseUrl(_id: $_id, documento: $documento, proceso: $proceso, usuario: $usuario, esInterno: $esInterno, esDocRespUrl: $esDocRespUrl)
        {
            estatus
            mensaje
            documento
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;

export const acAcuse = gql`
    mutation acAcuse($_id: ID!, $acuseUrl: String!, $proceso: PROCESOS_DOC!)
    {
        acAcuse(_id: $_id, acuseUrl: $acuseUrl, proceso: $proceso)
        {
            estatus
            mensaje
            documento
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;
export const terminarDocUsuario = gql`
    mutation terminarDocUsuario($_id: ID!)
    {
        terminarDocUsuario(_id: $_id)
        {
            estatus
            mensaje
            documento
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;


