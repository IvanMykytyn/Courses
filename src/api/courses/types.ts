
export interface ICourse {
  id: string;
  title: string;
  tags: string[];
  launchDate: string;
  status: "launched";
  description: string;
  duration: number;
  lessonsCount: number;
  containsLockedLessons: boolean;
  previewImageLink: string;
  rating: number;
  meta: {
    slug: string;
    skills: string[];
    courseVideoPreview: {
      link: string;
      duration: number;
      previewImageLink: string;
    };
  };
}

export interface ICourses {
  courses: ICourse[]
}

export interface ILesson {
  id: string;
  title: string;
  duration: number;
  order: number;
  type: "video";
  status: "unlocked" | "locked";
  link: string;
  previewImageLink: string;
  meta: null | {
    difficulty: 'easy' | 'medium' | 'hard'
  };
}

export interface ICourseWithLessons extends Omit<ICourse, 'lessonsCount'> {
  lessons: ILesson[]
}
