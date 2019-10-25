
import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {CategoriesService} from 'src/app/categories/categories.service';

@Injectable({
    providedIn: 'root'
})
export class CanActivateKeywordsGuard implements CanActivate {

    constructor(private categoriesService: CategoriesService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
        if (!this.categoriesService.hasCategories) {
            this.router.navigateByUrl('/categories');
            return false;
        }
        return true;
    }
}
