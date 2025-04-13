import { create } from 'zustand';
import { sync } from '@tonk/keepsync';

// Vibrant color palette
const VIBE_COLORS = [
  '#f59e0b', // amber
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#10b981', // emerald
  '#0ea5e9', // sky
  '#ef4444', // red
  '#eab308'  // yellow
];

interface VibeColorState {
  colorMap: Record<string, string>;
  getVibeColor: (vibe: string) => string;
}

export const useVibeColorStore = create<VibeColorState>(
  sync(
    (set, get) => ({
      colorMap: {},
      getVibeColor: (vibe: string) => {
        const { colorMap } = get();
        
        // Return existing color if vibe exists
        if (colorMap[vibe]) {
          return colorMap[vibe];
        }

        // Assign new random color
        const availableColors = VIBE_COLORS.filter(color => 
          !Object.values(colorMap).includes(color)
        );
        
        const newColor = availableColors.length > 0
          ? availableColors[Math.floor(Math.random() * availableColors.length)]
          : VIBE_COLORS[Math.floor(Math.random() * VIBE_COLORS.length)];

        // Update the map
        set(state => ({
          colorMap: { ...state.colorMap, [vibe]: newColor }
        }));

        return newColor;
      }
    }),
    {
      docId: 'vibe-colors'
    }
  )
);
