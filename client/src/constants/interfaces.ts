export interface File {
  path: string,
  name: string,
  size: number,
  type: string,
}

export interface User {
  email: string,
  firstName: string | null,
  lastName: string | null,
}