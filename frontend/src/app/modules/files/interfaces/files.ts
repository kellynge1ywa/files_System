export interface FileDetails {
  id?: string;
  filename: string;
  filePath: string;
  format?: string;
  userId?: string;
  folderId: string;
  isDeleted?: boolean;
  isStarred?: boolean;
}
