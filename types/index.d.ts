declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare type GetArrayItemType<T extends unknown[]> = T extends Array<infer S> ? S : never

declare type TargetContext = '_self' | '_blank'
declare module '*.svg' {
  // It's really a string, precisely a resolved path pointing to the image file
  const filePath: string

  export default filePath
}
