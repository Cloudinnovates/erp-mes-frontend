import {TestBed} from '@angular/core/testing';

import {DeliveryService} from '../app/delivery.service';
import {ItemService} from "../app/item.service";
import {ReportService} from "../app/report.service";
import {TaskService} from "../app/task.service";
import {TeamService} from "../app/team.service";
import {HolidayService} from "../app/holiday.service";
import {EmployeeService} from "../app/employee.service";
import {DeliveriesComponent} from "../app/deliveries/deliveries.component";
import {DeliveryComponent} from "../app/delivery/delivery.component";
import {ItemComponent} from "../app/item/item.component";
import {ItemsComponent} from "../app/items/items.component";
import {ReportsComponent} from "../app/reports/reports.component";
import {ReportComponent} from "../app/report/report.component";
import {AddHolidayComponent} from "../app/add-holiday/add-holiday.component";
import {AddEmployeeComponent} from "../app/add-employee/add-employee.component";
import {appRoutes} from "../app/app.routing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {AddTaskComponent} from "../app/add-task/add-task.component";
import {AddDeliveryComponent} from "../app/add-delivery/add-delivery.component";
import {AddItemComponent} from "../app/add-item/add-item.component";
import {EmployeeComponent} from "../app/employee/employee.component";
import {EmployeesComponent} from "../app/employees/employees.component";
import {TeamComponent} from "../app/team/team.component";
import {TeamsComponent} from "../app/teams/teams.component";
import {TasksComponent} from "../app/tasks/tasks.component";
import {TaskComponent} from "../app/task/task.component";
import {CurrentReportComponent} from "../app/current-report/current-report.component";
import {LoginComponent} from "../app/login/login.component";
import {ValidateComponent} from "../app/validate/validate.component";
import {SpecialPlansComponent} from "../app/special-plans/special-plans.component";
import {PlanningComponent} from "../app/planning/planning.component";
import {UpdateDailyPlanComponent} from "../app/update-daily-plan/update-daily-plan.component";
import {PlanningService} from "../app/planning.service";

const mockDeliveries = [
  {
    "id": 1,
    "deliveryItems": [
      {
        "id": 1,
        "item": {
          "id": 1,
          "name": "przedmiot1",
          "quantity": 10,
          "stockPrice": 10,
          "originalPrice": 20,
          "currentPrice": 20
        },
        "quantity": 10
      },
      {
        "id": 2,
        "item": {
          "id": 2,
          "name": "przedmiot2",
          "quantity": 5,
          "stockPrice": 10,
          "originalPrice": 20,
          "currentPrice": 20
        },
        "quantity": 5
      }
    ],
    "scheduledFor": new Date('2018-08-15'),
    "value": 150
  },
  {
    "id": 2,
    "deliveryItems": [
      {
        "id": 3,
        "item": {
          "id": 3,
          "name": "przedmiot3",
          "quantity": 25,
          "stockPrice": 10,
          "originalPrice": 20,
          "currentPrice": 20
        },
        "quantity": 25
      }
    ],
    "scheduledFor": new Date('2018-08-15'),
    "value": 250
  }
];

const mockDeliveryRequest = {
  "deliveryItemRequests": [
    {
      "itemId": 3,
      "quantity": 25
    }
  ],
  "scheduledFor": new Date('2018-08-15'),
};

const mockDeliveryItemRequests = [
  {
    "itemId": 3,
    "quantity": 25
  },
  {
    "itemId": 5,
    "quantity": 16
  }
];

describe('DeliveryService', () => {
  let service: DeliveryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(appRoutes)
      ],
      declarations: [
        AddEmployeeComponent,
        AddHolidayComponent,
        AddTaskComponent,
        AddDeliveryComponent,
        AddItemComponent,
        EmployeeComponent,
        EmployeesComponent,
        TeamComponent,
        TeamsComponent,
        TasksComponent,
        TaskComponent,
        CurrentReportComponent,
        ReportComponent,
        ReportsComponent,
        ItemsComponent,
        ItemComponent,
        DeliveryComponent,
        DeliveriesComponent,
        ValidateComponent,
        LoginComponent,
        UpdateDailyPlanComponent,
        PlanningComponent,
        SpecialPlansComponent
      ],
      providers: [
        EmployeeService,
        HolidayService,
        TeamService,
        TaskService,
        ReportService,
        ItemService,
        DeliveryService,
        PlanningService
      ]
    });
    service = TestBed.get(DeliveryService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('given fetchAllDeliveries method', () => {
    describe('when called', () => {

      it('should hit "/deliveries" with GET and return deliveries', () => {
        service.fetchAllDeliveries().subscribe(deliveries => {
          expect(deliveries.length).toBe(2);
          expect(deliveries).toEqual(mockDeliveries);

          const req = httpMock.expectOne('http://localhost:8080/deliveries');
          expect(req.request.method).toBe('GET');
          req.flush(mockDeliveries);

          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchOneDelivery method', () => {
    describe('when called', () => {

      it('should hit "/deliveries/1" with GET and return delivery', () => {
        service.fetchOneDelivery(1).subscribe(delivery => {
          expect(delivery).toEqual(mockDeliveries[0]);
        });

        const req = httpMock.expectOne('http://localhost:8080/deliveries/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockDeliveries[0]);

        httpMock.verify();
      });
    });
  });

  describe('given addNewDelivery method', () => {
    describe('when called', () => {

      it('should hit "/deliveries/add" with POST', () => {
        service.addNewDelivery(mockDeliveryRequest).subscribe(() => {
        });

        const req = httpMock.expectOne('http://localhost:8080/deliveries');
        expect(req.request.method).toBe('POST');

        httpMock.verify();
      });
    });
  });

  describe('given getRecommendations method', () => {
    describe('when called', () => {

      it('should hit "/deliveries/recommended-delivery" with GET and return recommendations', () => {
        service.getRecommendations().subscribe(deliveryItemRequests => {
          expect(deliveryItemRequests).toEqual(mockDeliveryItemRequests);
        });

        const req = httpMock.expectOne('http://localhost:8080/deliveries/recommended-delivery');
        expect(req.request.method).toBe('GET');
        req.flush(mockDeliveryItemRequests);

        httpMock.verify();
      });
    });
  });

});