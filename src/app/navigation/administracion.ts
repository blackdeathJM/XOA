import {FuseNavigation} from '@plantilla/types';

export const ADMINISTRACION: FuseNavigation =
    {
        id: 'administrador',
        title: 'Administrador',
        type: 'group',
        children:
            [
                {
                    id: 'usuarioAdmin',
                    title: 'Usuario',
                    icon: 'settings',
                    type: 'collapsable',
                    children:
                        [
                            {
                                id: 'configUsuario',
                                title: 'Admininistracion',
                                type: 'item',
                                url: '/sistema-comercial/usuarios/config'
                            },
                            {
                                id: 'miDocumentacion',
                                title: 'Mi documentacion',
                                type: 'item',
                                url: '/sistema-comercial/usuarios/docs-usuario'
                            }
                        ]
                },
            ]
    };
