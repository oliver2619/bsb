import { Routes } from '@angular/router';
import { SplashComponent } from './page/splash/splash.component';
import { gameGuard } from './guard/game.guard';
import { buzzwordsGuard } from './guard/buzzwords.guard';
import { newGameGuard } from './guard/new-game.guard';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: SplashComponent,
}, {
    path: 'about',
    loadComponent: () => import('./page/about/about.component').then(it => it.AboutComponent),
}, {
    path: 'buzzwords',
    loadComponent: () => import('./page/buzzwords/buzzwords.component').then(it => it.BuzzwordsComponent),
    canActivate: [buzzwordsGuard],
}, {
    path: 'game',
    loadComponent: () => import('./page/game/game.component').then(it => it.GameComponent),
    canActivate: [gameGuard],
    data: { gameVisible: true },
}, {
    path: 'meetings',
    loadComponent: () => import('./page/meetings/meetings.component').then(it => it.MeetingsComponent),
}, {
    path: 'new-game',
    loadComponent: () => import('./page/new-game/new-game.component').then(it => it.NewGameComponent),
    canActivate: [newGameGuard],
}, {
    path: 'rules',
    loadComponent: () => import('./page/rules/rules.component').then(it => it.RulesComponent),
}, {
    path: 'settings',
    loadComponent: () => import('./page/settings/settings.component').then(it => it.SettingsComponent),
}, {
    path: '**',
    redirectTo: '',
}];
