export interface UserInfo {
  userId: string | number
  username: string
  realName: string
  avatar: string
  desc?: string
  homePath?: string
  roles: any
  qr?: string
  google_secret?: string
  is_new?: boolean
}
