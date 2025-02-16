export interface IIngredient {
  code: string
  name: string
  time: number
  g: number
  kcal: number
  price: number
  imageUrl: string
  imageUrlGroup?: string
  auto?: boolean
}

export type TSummaryIcon = {
  size: 'md' | 'sm' | 'xs'
  variant: string
  iconName: string
  text?: string
}
