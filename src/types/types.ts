export type WorkoutType = {
  id: number;
  name: string;
  reps: number;
  sets: number;
  category: string;
  description: string;
  difficulty: string;
  duration_minutes: number;
  equipment: string;
};

export type ActiveWorkoutType = WorkoutType & {
  currentSets: number;
  status: string;
};
