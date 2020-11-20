import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  { path: 'album/:id', loadChildren: () => import('./album/album.module').then(m => m.AlbumModule) },
  { path: 'user/:id', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'logs', loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    relativeLinkResolution: 'corrected',
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
