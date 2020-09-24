import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./core/guards/auth.guard";

const ApplicationRoutes: Routes = [
	{
		path: '',
		loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
	},
	{
		path: 'login',
		loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
	},
	{
		canActivate: [AuthGuard],
		path: 'groups',
		loadChildren: () => import('./pages/groups/groups.module').then(m => m.GroupsModule)
	},
	{
		canActivate: [AuthGuard],
		path: 'users',
		loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
	},
	{
		canActivate: [AuthGuard],
		path: 'camera-check',
		loadChildren: () => import('./pages/camera-check/camera-check.module').then(m => m.CameraCheckModule)
	},
	{
		path: '**',
		redirectTo: '/login'
	}
];

export const RoutingConfiguration = RouterModule.forRoot(ApplicationRoutes);