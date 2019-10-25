import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SplashComponent} from './splash/splash.component';
import {MenuComponent} from './menu/menu.component';
import {KeywordsComponent} from './keywords/keywords.component';
import {GameComponent} from './game/game.component';
import {SettingsComponent} from 'src/app/settings/settings.component';
import {AboutComponent} from './about/about.component';
import { NewGameComponent } from './new-game/new-game.component';
import { CategoriesComponent } from './categories/categories.component';
import { DialogComponent } from './dialog/dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
    declarations: [
        AppComponent,
        SplashComponent,
        MenuComponent,
        KeywordsComponent,
        GameComponent,
        SettingsComponent,
        AboutComponent,
        NewGameComponent,
        CategoriesComponent,
        DialogComponent,
        DropdownComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
