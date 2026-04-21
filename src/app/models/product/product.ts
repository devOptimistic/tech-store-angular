export type Product = {
  id: number,
  name: string,
  description: string,
  shortDescription: string,
  price: number,
  imageUrls: string[],
  rating: number,
  reviewCount: number,
  inStock: boolean,
  category: string,
  brand: string,
  moreProperties: ProductProperty[]
}

export type ProductProperty = {
  label: string,
  value: string
}