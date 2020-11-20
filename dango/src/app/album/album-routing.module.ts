import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAlbumComponent } from './view-album/view-album.component';

const routes: Routes = [{ path: '', component: ViewAlbumComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
