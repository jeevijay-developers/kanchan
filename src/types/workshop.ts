export interface categoryType {
  categoryName: string;
  _id: string;
}

export interface Workshop {
  _id: string;
  image: string;
  longDec: string;
  ratings: any[]; // Assuming an array, replace `any` with the actual rating type if available
  shortDec: string;
  title: string;
  __v: number;
}

export interface WorkshopCategory {
  _id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  workShops: string[]; // Assuming it stores workshop IDs
  __v: number;
}
