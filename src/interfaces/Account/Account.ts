export interface Account {
  studentCode: string
  email: string
  name: string
  semester?: number
  department?: string
}

export interface CreateAccountRequest {
  studentCode: string
  email: string
  name: string
  semester?: number
  department?: string
}

export interface UpdateAccountRequest {
  studentCode?: string
  email?: string
  name?: string
  semester?: number
  department?: string
}
