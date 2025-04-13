export interface FilterState {
  vibes: string[];
  participants: string[];
  budget: { min: number; max: number; } | null;
}

export const initialFilterState: FilterState = {
  vibes: [],
  participants: [],
  budget: null
};
