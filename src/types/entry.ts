export interface Entry {
  id: string;
  authorName: string;
  authorPic?: string;
  activity: string;
  vibe?: string;  // Make vibe optional
  budget: number;
  createdAt?: number;
}
