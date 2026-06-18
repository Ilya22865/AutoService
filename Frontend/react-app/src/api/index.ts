const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5130/api'

function getToken(): string | null {
    return localStorage.getItem('token')
}

async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getToken()
    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string>),
        'Content-Type': 'application/json',
    }
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    })

    if (!res.ok) {
        let msg = `Request failed with status ${res.status}`;
        try {
            const ct = res.headers.get('content-type') || '';
            if (ct.includes('application/json')) {
                const json = await res.json();
                msg = typeof json === 'string' ? json : json.message || json.title || JSON.stringify(json.errors) || msg;
            } else {
                msg = await res.text();
            }
        } catch {}
        throw new Error(msg);
    }

    return res.json()
}

interface RegisterResponse {
    token?: string,
    id?: number,
    email?: string,
    fullName?: string,
    role?: string,
    message?: string
}

export interface ClientRegisterResponse extends RegisterResponse {
    address: string,
    phoneNumber: string
} 

export interface EmployeeRegisterResponse extends RegisterResponse {
    salary: number,
    position: string,
}

interface LoginResponse {
    token: string
    id: number
    email: string
    role: string
    fullName: string
}

export interface ClientDto {
    fullName: string;
    email: string;
    address: string;
    phoneNumber: string;
    vehicles: VehicleDto[];
}

export interface OrderDto {
    orderId: number;
    status: string;
    client: ClientDto | null;
    vehicle: VehicleDto | null;
    services: OrderServiceDto[];
    details: OrderDetailsDto[];
    comment: string | null;
    scheduledDate?: string | null;
    assignedEmployeeId?: number | null;
    assignedEmployeeName?: string | null;
}

export interface OrderRequest {
    vehicle?: VehicleDto
    services: OrderServiceDto[]
    details: OrderDetailsDto[]
    comment?: string
    scheduledDate?: string | null
}

export interface VehicleDto {
    model: string,
    year: number
    vinNumber: string
    registrationNumber: string
}

export interface OrderServiceDto {
    serviceName: string,
    priceAtSale: number
    quantity: number
    serviceDescription?: string
}

export interface OrderDetailsDto {
    detailName: string
    quantity: number
    priceAtSale: number
    detailDescription?: string
}

interface ReviewRequest {
    rating: number
    vehicleModel: string
    comment: string
}

export interface ReviewDto {
    clientId: number
    rating: number
    comment: string
    clientName: string
    date: string
    vehicleModel: string
}
export const catalogApi = {
    getServices: () => request<{ id: number; name: string; description: string; price: number; category: string | null }[]>('/catalog/services'),
    getDetails: () => request<{ id: number; name: string; description: string; price: number; category: string | null }[]>('/catalog/details'),
}

export const orderApi = {
    createOrder: (data: OrderRequest) => request<{ id: number; status: string; totalAmount: number }>('/order/addOrder', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
}

export const getOrdersApi = {
    getOrders: () => request<OrderDto[]>('/order/getOrders', {
        method: 'GET',
    }),
}

export const getClientsApi = {
    getClients: () => request<ClientDto[]>('/client/getClients', {
        method: 'GET',
    }),
}
export const logApi = {
    download: () => fetch(`${API_URL}/log/download`, {
        headers: { 'Authorization': `Bearer ${getToken()}` },
    }),
}
export const reviewApi = {
    addReview: (data: ReviewRequest) => request<ReviewDto>('/review/addReview', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    getReviews: () => request<ReviewDto[]>('/review/getReviews', {
        method: 'GET'
    })
}
export const orderStatusApi = {
    getOrder: (id: number) => request<OrderStatusDto>(`/order/${id}`),
}

interface OrderServiceView {
    serviceName: string;
    priceAtSale: number;
    quantity: number;
    totalPrice: number;
}

interface OrderDetailView {
    detailName: string;
    quantity: number;
    priceAtSale: number;
    totalPrice: number;
}

interface OrderClientView {
    fullName: string;
    email: string;
    address: string;
    phoneNumber: string;
}

interface OrderVehicleView {
    model: string;
    year: number;
    vinNumber: string;
    registrationNumber: string;
}

export interface OrderStatusDto {
    orderId: number;
    status: string;
    client?: OrderClientView | null;
    vehicle?: OrderVehicleView | null;
    services: OrderServiceView[];
    details: OrderDetailView[];
    comment?: string | null;
    totalAmount?: number;
    createdAt?: string;
    scheduledDate?: string | null;
    assignedEmployeeId?: number | null;
    assignedEmployeeName?: string | null;
}

export interface TimeSlotDto {
    time: string;
    available: boolean;
}

export interface EmployeeDto {
    id: number;
    fullName: string;
    position?: string;
}

export const orderApiExt = {
    updateStatus: (id: number, status: string) => request<{ message: string }>(`/order/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
    }),
    assignEmployee: (orderId: number, employeeId: number) => request<{ message: string }>(`/order/${orderId}/assign`, {
        method: 'PUT',
        body: JSON.stringify({ employeeId }),
    }),
    schedule: (orderId: number, scheduledDate: string) => request<{ message: string }>(`/order/${orderId}/schedule`, {
        method: 'PUT',
        body: JSON.stringify({ scheduledDate }),
    }),
    getSlots: (date: string) => request<TimeSlotDto[]>(`/order/slots?date=${date}`),
}

export const employeeApi = {
    list: () => request<EmployeeDto[]>('/employee/list'),
}

export const authApi = {
    register: (data: {
        fullName: string,
        email: string,
        password: string,
        employeeCode?: string,
        address?: string,
        phoneNumber?: string,
        salary?: number,
        position?: string,
    }) => request<RegisterResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    login: (data: {
        email: string,
        password: string
    }) => request<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    verifyEmail: (token: string) => request<{ message: string }>(`/auth/verify-email?token=${token}`)
}