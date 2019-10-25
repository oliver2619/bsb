
import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';
import {SplashComponent} from 'src/app/splash/splash.component';
import {KeywordsComponent} from 'src/app/keywords/keywords.component';
import {GameComponent} from 'src/app/game/game.component';
import {AboutComponent} from 'src/app/about/about.component';
import {SettingsComponent} from 'src/app/settings/settings.component';
import {NewGameComponent} from 'src/app/new-game/new-game.component';
import {CategoriesComponent} from 'src/app/categories/categories.component';
import {CanActivateGameGuard} from 'src/app/game/can-activate-game.guard';
import {CanActivateKeywordsGuard} from 'src/app/keywords/can-activate-keywords.guard';
import {CanActivateNewGameGuard} from 'src/app/new-game/can-activate-new-game.guard';

const routes: Route[] = [{
    path: '',
    pathMatch: 'full',
    component: SplashComponent
}, {
    path: 'categories',
    pathMatch: 'full',
    component: CategoriesComponent
}, {
    path: 'keywords',
    pathMatch: 'full',
    component: KeywordsComponent,
    canActivate: [CanActivateKeywordsGuard]
}, {
    path: 'newGame',
    pathMatch: 'full',
    component: NewGameComponent,
    canActivate: [CanActivateNewGameGuard]
}, {
    path: 'game',
    pathMatch: 'full',
    component: GameComponent,
    canActivate: [CanActivateGameGuard]
}, {
    path: 'settings',
    pathMatch: 'full',
    component: SettingsComponent
}, {
    path: 'about',
    pathMatch: 'full',
    component: AboutComponent
}];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
