export interface FileDetails {
  id: string;
  filePath: string;
  fileName: string;
  format: string;
  userId: string;
  folderId: string;
  dateAdded: string;
}

export interface UploadFileDto {
  file: File;
}
