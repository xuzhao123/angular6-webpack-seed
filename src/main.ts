import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModuleRef } from '@angular/core';

import { AppModule } from './app/app.module';
import { ROOT_SELECTOR } from './app/app.component';
import { environment } from './environments/environment';

import './styles/reset.css';

if (environment.production) {
    enableProdMode();
}

export function main(): void {
    let modulePromise: Promise<NgModuleRef<AppModule>> = null;

    if (module['hot']) {
        module['hot'].accept();
    }

    modulePromise = platformBrowserDynamic().bootstrapModule(AppModule);
    modulePromise.catch(err => console.log(err));
}

if (document.readyState !== 'complete') {
    //debugger
}
main();

// switch (document.readyState) {
//     case 'loading':
//         document.addEventListener('DOMContentLoaded', _domReadyHandler, false);
//         break;
//     case 'interactive':
//     case 'complete':
//     default:
//         main();
// }

// function _domReadyHandler() {
//     document.removeEventListener('DOMContentLoaded', _domReadyHandler, false);
//     main();
// }