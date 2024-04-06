import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const verifyToken = (token: string): DecodedToken => {
  return jwtDecode(token) as DecodedToken;
};
