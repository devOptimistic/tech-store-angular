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
  color: string,
  discount: number,
  moreProperties: ProductProperty[]
}

export type ProductProperty = {
  label: string,
  value: string
}