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
                msg = json.message || json.title || JSON.stringify(json.errors) || msg;
            } else {
                msg = await res.text();
            }
        } catch {}
        throw new Error(msg);
    }

    return res.json()
}

interface RegisterResponse {
    token: string,
    id: number,
    email: string,
    fullName: string,
    role: string
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

interface OrderResponse {
    id: number,
    status: string,
    totalAmount: number
}

export interface OrderRequest {
    vehicle?: VehicleDto
    services: OrderServiceDto[]
    details: OrderDetailsDto[]
    comment?: string
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

export const orderApi = {
    createOrder: (data: OrderRequest) => request<OrderResponse>('/order/addOrder', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
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
    })
}