import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { HomeService } from './home.service';
import { TrasactionModel } from '../dto/transaction.model.dto';
import { of } from 'rxjs';

describe('HomeService', () => {
  let service: HomeService;
  let httpMock: HttpTestingController;
  let mockResult: TrasactionModel[];
  let mockTransactinModel: TrasactionModel;
  let provide;
  let http: any;
  let mockHttpOptions = new Headers({});
  let mockTrasactionId: number = 17;
  const apiUrl = 'https://transactions-challenge.test.stockopedia.com//api/v1/transactions';
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(HomeService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    mockTransactinModel = new TrasactionModel({
      id: 17,
      type: "buy",
      cashflow: -5005,
      value: 5005,
      date: "2019-01-02T09:34:02.000Z",
      security: "Carr's",
      shares: 317
    })

    mockResult = [new TrasactionModel({
      id: 17,
      type: "buy",
      cashflow: -5005,
      value: 5005,
      date: "2019-01-02T09:34:02.000Z",
      security: "Carr's",
      shares: 317
    })];
    provide = (mock: any): any => mock;
    // http = {
    //   get: jest.fn(() => of(mockResult)),
    //   post: jest.fn(() => of(mockResult[0])),
    //   put: jest.fn(() => of(mockResult[0])),
    //   delete: jest.fn(() => of(mockResult[0]))
    // };
    // service = new HomeService(provide(http));
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getTransactions test suites', () => {
    it('it should call http client get API', () => {
      service.getTransactions().subscribe(data => {
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      expect(req.request.url).toBe(apiUrl);
      httpMock.verify();
    });
    it('it should return data of type TrasactionModel', () => {
      service.getTransactions().subscribe(data => {
        expect(data instanceof TrasactionModel).toBe(true);
      });
    });
    it('It should return the expected data', () => {
      service.getTransactions().subscribe(data => {
        expect(data).toEqual(mockResult);
        expect(data.length).toBe(1);
      });
    });
  });

  describe('#createTransaction test suites', () => {
    it('it should call http client post API', () => {
      service.createTransaction(mockTransactinModel).subscribe(data => {
      });
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.url).toBe(apiUrl);
      expect(req.request.body).toBe(mockTransactinModel);
      httpMock.verify();
    });
    it('it should return data of type TrasactionModel', () => {
      service.createTransaction(mockTransactinModel).subscribe(data => {
        expect(data instanceof TrasactionModel).toBe(true);
      });
    });
    it('It should return the expected data', () => {
      service.createTransaction(mockTransactinModel).subscribe(data => {
        expect(data).toEqual(mockResult[0]);
        expect(Object.keys(data).length).toBe(1);
      });
    });
  });

  describe('#updateTransaction test suites', () => {
    it('it should call http client put API', () => {
      service.updateTransaction(mockTrasactionId,mockTransactinModel).subscribe(data => {
      });
      const req = httpMock.expectOne(apiUrl+'/'+mockTrasactionId);
      expect(req.request.method).toBe('PUT');
      expect(req.request.urlWithParams).toBe(apiUrl+'/'+mockTrasactionId);
      expect(req.request.body).toBe(mockTransactinModel);
      httpMock.verify();
    });
    it('it should return data of type TrasactionModel', () => {
      service.createTransaction(mockTransactinModel).subscribe(data => {
        expect(data instanceof TrasactionModel).toBe(true);
      });
    });
    it('It should return the expected data', () => {
      service.updateTransaction(mockTrasactionId, mockTransactinModel).subscribe(data => {
        expect(data).toEqual(mockResult[0]);
        expect(Object.keys(data).length).toBe(1);
      });
    });
  });

  describe('#deleteTransaction test suites', () => {
    it('it should call http client delete API', () => {
      service.deleteTransaction(mockTrasactionId).subscribe(data => {
      });
      const req = httpMock.expectOne(apiUrl+'/'+mockTrasactionId);
      expect(req.request.method).toBe('DELETE');
      expect(req.request.urlWithParams).toBe(apiUrl+'/'+mockTrasactionId);
      expect(req.request.body).toBe(null);
      httpMock.verify();
    });
    it('it should return data of type TrasactionModel', () => {
      service.deleteTransaction(mockTrasactionId).subscribe(data => {
        expect(data instanceof TrasactionModel).toBe(true);
      });
    });
    it('It should return the expected data', () => {
      service.createTransaction(mockTransactinModel).subscribe(data => {
        expect(data).toEqual(mockResult[0]);
        expect(Object.keys(data).length).toBe(1);
      });
    });
  });

});
