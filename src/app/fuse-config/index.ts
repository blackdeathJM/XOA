import {FuseConfig} from '@fuse/types';

export const fuseConfig: FuseConfig = {
    // Color themes can be defined in src/app/app.theme.scss
    // colorTheme: 'theme-pink-dark',
    colorTheme: 'theme-blue-gray-dark',
    customScrollbars: true,
    layout: {
        style: 'vertical-layout-1',
        width: 'fullwidth',
        navbar: {
            primaryBackground: 'blue-grey-900-bg',
            secondaryBackground: 'blue-grey-800-bg',
            folded: false,
            hidden: false,
            position: 'left',
            variant: 'vertical-style-1'
        },
        toolbar: {
            customBackgroundColor: true,
            background: 'blue-grey-800-bg',
            hidden: false,
            position: 'below-static'
        },
        footer: {
            customBackgroundColor: true,
            background: 'fuse-navy-900',
            hidden: true,
            position: 'below-fixed'
        },
        sidepanel: {
            hidden: false,
            position: 'right'
        }
    }
};
