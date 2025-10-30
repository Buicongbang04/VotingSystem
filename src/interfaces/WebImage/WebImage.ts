export interface WebImage {
  name: string
  imageUrl: string
}

export interface CreateWebImageRequest {
  name: string
  imageUrl: string
}

export interface UpdateWebImageRequest {
  name: string
  imageUrl?: string
}

export interface WebImageResponse {
  data: WebImage[]
  message: string
}

export interface SingleWebImageResponse {
  data: WebImage
  message: string
}
