import { Token } from "./token";

export interface LoginResponse {
    isSuccess: boolean;
    message: string;
    token?: Token; 
}