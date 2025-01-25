interface GlobalUrlService {
  getBaseUrl(): string;
}

class DevelopmentUrlService implements GlobalUrlService {
  public getBaseUrl(): string {
    return 'http://localhost:9090/';
  }
}

class ProductionUrlService implements GlobalUrlService {
  public getBaseUrl(): string {
    return '/';
  }
}

const globalUrlService: GlobalUrlService = process.env.NODE_ENV === 'production'
  ? new ProductionUrlService()
  : new DevelopmentUrlService();
export default globalUrlService;