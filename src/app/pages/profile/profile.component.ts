import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from "../../components/admin-dashboard/admin-dashboard.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminDashboardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  isAdmin: boolean = false;
  activeTab: string = 'profile';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.isAdmin = this.currentUser?.role === 'admin';
    
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
