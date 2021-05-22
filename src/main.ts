import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {environment} from '@env/environment';
import {hmrBootstrap} from 'hmr';
import {MainModule} from './app/main/main.module';

if (environment.production)
{
    enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(MainModule);
const caliente = 'hot';
if (environment.hmr)
{
    if (module[caliente])
    {
        hmrBootstrap(module, bootstrap);
    } else
    {
        console.error('HMR is not enabled for webpack-dev-server!');
        console.log('Are you using the --hmr flag for ng serve?');
    }
} else
{
    bootstrap().catch(err => console.error(err));
}
