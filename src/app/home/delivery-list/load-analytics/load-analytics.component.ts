import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeliveryListService } from 'src/app/shared/services/deliveryList.service';

@Component({
    selector: 'app-load-analytics',
    templateUrl: './load-analytics.component.html',
    styleUrls: ['./load-analytics.component.css']
})
export class LoadAnalyticsComponent implements OnInit {
    analytics = [];
    dateToday = new Date();
    colorsArray = [
        '#a883ba',
        '#b87c4c',
        '#7258db',
        '#87cafb',
        '#6fd693',
        '#4478f3',
        '#ffbb00',
        '#db71a2',
    ]
    notificationSubscription: Subscription;
    constructor(private _delivery: DeliveryListService) { }

    ngOnInit(): void {
        this.getAnalytics()
    }

    getAnalytics() {
        this._delivery.loadAnalytics().subscribe(res => {
            console.log(res);
            this.analytics = res.data
        })
    }
    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }
}
