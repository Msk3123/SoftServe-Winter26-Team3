export interface User{
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  roleName: string,
  createdAt: string,
}

export interface UserCreate{
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string,
  roleId: number,
}