import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { color, getRelativePosition } from 'chart.js/helpers';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    @ViewChild('salesChart') private salesChart: ElementRef;
    @ViewChild('statusChart') private statusChart: ElementRef;
    dateToday = new Date();
    stats;
    charts;
    statsMonth = new Date();
    searchParams = {
        month: ''
    }
    salesChartCanvas: any;
    statusChartCanvas: any;
    chartLabels;
    constructor(private _dashboard: DashboardService, private datePipe: DatePipe) {
        this.searchParams.month = this.datePipe.transform(new Date(), 'YYYY-MM');
    }

    ngOnInit(): void {
        // 
    }

    getDashboardStats() {
        this._dashboard.dashboardStats(this.searchParams).subscribe(res => {
            this.stats = res.data;
        })
    }

    getDashboardCharts() {
        this._dashboard.dashboardCharts(this.searchParams).subscribe(res => {
            this.charts = res.data
            this.generateSalesChart();
            this.generateStatusChart();
        })
    }
    monthValue(event) {
        this.searchParams.month = this.datePipe.transform(event, 'YYYY-MM')
        this.getDashboardStats()
        this.getDashboardCharts()

    }

    generateSalesChart() {
        if (this.salesChartCanvas)
            this.salesChartCanvas.destroy();
        const config: ChartConfiguration = {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'Doors',
                        data: this.charts.sales_summary_chart.doors,
                        borderColor: 'red',
                        tension: 0.3,
                    },
                    {
                        label: 'Frames',
                        data: this.charts.sales_summary_chart.frames,
                        borderColor: 'green',
                        tension: 0.3,
                    },
                    {
                        label: 'Others',
                        data: this.charts.sales_summary_chart.others,
                        borderColor: 'blue',
                        tension: 0.3,
                    }
                ],
            },
            options: {
                scales: {
                    y: {
                        ticks: {

                            // Include a dollar sign in the ticks
                            callback: function (value, index, ticks) {
                                if (index === ticks.length - 1) return '£' + value;
                                else if (index === 0) return '£' + value;
                                else return '';
                            }
                        },
                        grid: {
                            display: false
                        }
                    },
                    x: {
                        display: false,
                        grid: {
                            display: false
                        }
                    }
                },
                animations: {
                    radius: {
                        duration: 400,
                        easing: 'linear',
                        loop: (context) => context.active
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        align: 'end',
                        labels: {
                            boxWidth: 10,
                            boxHeight: 10,
                            usePointStyle: true,
                            pointStyle: 'circle',
                        }
                    },

                }
            },
        };

        this.salesChartCanvas = new Chart(this.salesChart.nativeElement, config);
    }

    generateStatusChart() {
        if (this.statusChartCanvas)
            this.statusChartCanvas.destroy();
        let salesValues = this.charts.sales_status_chart;
        let data = [
            salesValues.booked.value,
            salesValues.delivered.value,
            salesValues.in_factory.value,
            salesValues.invoiced.value,
            salesValues.to_factory.value,
            salesValues.withdrawn.value];
        this.chartLabels = [
            { label: 'Booked', color: '#1BC5BD', value: salesValues.booked.value },
            { label: 'Delivered', color: '#00A73A', value: salesValues.delivered.value },
            { label: 'In Factory', color: '#656565', value: salesValues.in_factory.value },
            { label: 'Invoiced', color: '#432BFA', value: salesValues.invoiced.value },
            { label: 'To Factory', color: '#6ECE57', value: salesValues.to_factory.value },
            { label: 'Withdrawn', color: '#EDE634', value: salesValues.withdrawn.value }
        ];
        const config: ChartConfiguration = {
            type: 'doughnut',
            data: {
                labels: ['Booked', 'Delivered', 'In Factory', 'Invoiced', 'To Factory', 'Withdrawn'],
                datasets: [
                    {
                        weight: 1,
                        data: data,
                        backgroundColor: ['#1BC5BD', '#00A73A', '#656565', '#432BFA', '#6ECE57', '#EDE634']
                    }
                ],
            },
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: false,
                    },
                }
            },
        };

        this.statusChartCanvas = new Chart(this.statusChart.nativeElement, config);
    }
}
