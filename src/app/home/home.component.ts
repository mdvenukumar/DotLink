import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanService } from '../plan.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  true5GPlans: any[] = [];
  dataBoosterPlans: any[] = [];
  popularPlans: any[] = [];
  valuePlans: any[] = [];
  annualPlans: any[] = [];
  selectedTab: string = 'True 5G'; // Default selected tab

  tabs = [
    { label: 'True 5G', value: 'True 5G' },
    { label: 'Data Booster', value: 'Data Booster' },
    { label: 'Popular', value: 'Popular' },
    { label: 'Value', value: 'Value' },
    { label: 'Annual', value: 'Annual' }
  ];

  constructor(private planService: PlanService, private router: Router) { }

  ngOnInit(): void {
    this.planService.getTrue5G().subscribe(data => {
      console.log('True 5G Plans:', data);
      this.true5GPlans = data;
    });

    this.planService.getDataBooster().subscribe(data => {
      console.log('Data Booster Plans:', data);
      this.dataBoosterPlans = data;
    });

    this.planService.getPopular().subscribe(data => {
      console.log('Popular Plans:', data);
      this.popularPlans = data;
    });

    this.planService.getValue().subscribe(data => {
      console.log('Value Plans:', data);
      this.valuePlans = data;
    });

    this.planService.getAnnual().subscribe(data => {
      console.log('Annual Plans:', data);
      this.annualPlans = data;
    });
  }

  selectTab(tab: any): void {
    this.selectedTab = tab.value;
  }

  choosePlan(plan: any): void {
    const validityInDays = this.extractNumberFromString(plan.validity);
    this.router.navigate(['/validate'], {
      queryParams: {
        cost: plan.price,
        validity: validityInDays
      }
    });
  }

  private extractNumberFromString(value: string): number {
    const match = value.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }
}
