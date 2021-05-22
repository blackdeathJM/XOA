import {gql} from 'apollo-angular';
import {fragDocExt} from './docExterna.fragment';


// Obtener la tabla completa de documentos registrados
export const todosDocsExt = gql`
    query todosDocsExt($proceso: String!)
    {
        todosDocsExt(proceso: $proceso)
        {
            estatus
            mensaje
            documentos
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;

export const docExtProceso = gql`
    query docExtProceso($proceso: PROCESOS_DOC!) {
        docExtProceso( proceso: $proceso) {
            estatus
            mensaje
            documentos
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;

export const todosLosDocsPorUsuario = gql`
    query todosLosDocsPorUsuario($usuario: String!)
    {
        todosLosDocsPorUsuario(usuario: $usuario)
        {
            estatus
            mensaje
            documentos
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;
export const docsEntreFechas = gql`
    query docsEntreFechas($fechaRecepcionInicial: String!, $fechaRecepcionFinal: String!)
    {
        docsEntreFechas(fechaRecepcionInicial: $fechaRecepcionInicial, fechaRecepcionFinal: $fechaRecepcionFinal)
        {
            estatus
            mensaje
            documentos
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;
export const busquedaGral = gql`
    query busquedaGral($consulta: String!)
    {
        busquedaGral(consulta: $consulta)
        {
            estatus
            mensaje
            documentos
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;

export const docPorTipo = gql`
    query docPorTipo($tipoDoc: String!)
    {
        docPorTipo(tipoDoc: $tipoDoc)
        {
            estatus
            mensaje
            documentos
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;
export const todosLosDocs = gql`
    query
    {
        todosLosDocs
        {
            estatus
            mensaje
            documentos
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;
export const intOExt = gql`
    query intOExt($esInterno: Boolean!)
    {
        intOExt(esInterno: $esInterno)
        {
            estatus
            mensaje
            documentos
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;

export const ultimoFolio = gql`
    query ultimoFolio
    {
        ultimoFolio
        {
            estatus
            mensaje
            documentos
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;
