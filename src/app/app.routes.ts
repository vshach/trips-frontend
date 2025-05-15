import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ShowPhotosComponent } from './components/show-photos/show-photos.component';
import { ShowPhotosExactComponent } from './components/show-photos-exact/show-photos-exact.component';
import { PhotoeditdataComponent } from './components/photoeditdata/photoeditdata.component';
import { StopsComponent } from './components/stops/stops.component';
import { AdminRouteComponent } from './components/admin-route/admin-route.component';
import { PhotouploadComponent} from './components/photoupload/photoupload.component';

export const routes: Routes = [
    { path: 'admin', component: AdminComponent },        
    { path: 'edit/:picid', component: PhotoeditdataComponent },
    //{ path: 'pic/:locid', component: ShowPhotosComponent }
    { path: 'pic/:locid/:datetaken', component: ShowPhotosComponent },
    { path: 'admin-route', component:AdminRouteComponent},
    { path: 'stops/:datevisited', component: StopsComponent,//change this datetaken name
        children: [
            {
              path: 'picByRoute/:locid/:datetaken', // Route that activates the nested router-outlet
              component: ShowPhotosExactComponent,
            }
        ]
    },
    { path: 'upload-photo', component: PhotouploadComponent}
];
