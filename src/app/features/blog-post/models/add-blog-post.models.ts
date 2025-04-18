export interface AddBlogPost {
    title: string;
    shortDescription: string;
    content: string;
    featureImageUrl: string;
    authorName: string;
    urlHandle: string;
    publishedDate?: Date | null;
    isVisible: boolean;
    categories: string[];
    isPublished: boolean;
  }
  