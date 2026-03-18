export interface IAdmin {
  adminId: string;
  username: string;
  role: string;
}

export interface ILoginResponse {
  access_token: string;
}

export interface IDashboardStats {
  totalOrders: number;
  totalRevenue: number;
  activeSessions: number;
  totalTables: number;
}
