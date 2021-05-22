import {gql} from 'apollo-angular';

export const fragDocExt = gql`
    fragment fragDocExt on DocExtType
    {
        _id
        noSeguimiento
        identificadorDoc
        folio
        tipoDoc
        esInterno
        dependencia
        comentario
        asunto
        docUrl
        docRespUrl
        acuseUrl
        fechaRecepcion
        fechaLimiteEntrega
        fechaTerminado
        proceso
        notificarAdministrador
        usuarioFolio
        enviadoPor
        ano
        ref
        usuarioDestino
        {
            usuario
            observaciones
            docUrl
            fechaEnvio
            autorizado
            subproceso
            notificarUsuario
            notificarRespDelUsuario
        }
    }`;
