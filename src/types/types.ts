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

export enum WorkoutStatus {
  Completed = 'Completed',
  InProgress = 'In Progress',
  NotStarted = 'Not Started',
}

export type ActiveWorkoutType = WorkoutType & {
  currentSets: number;
  status: WorkoutStatus;
};
