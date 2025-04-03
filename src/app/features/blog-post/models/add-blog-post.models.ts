export interface AddBlogPost {
    //id?: string;
    title: string;
    shortDescription: string;
    content: string;
    featureImageUrl: string;
    authorName: string;
    urlHandle: string;
    publishedDate?: Date | null; // Nullable DateTime
    isVisible: boolean;
    categoryId?: string | null; // Nullable Foreign Key
    //createdAt?: Date; // Auto-generated on the backend
    isPublished: boolean;
}