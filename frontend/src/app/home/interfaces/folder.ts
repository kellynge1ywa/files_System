export interface Folder {
  id: string;
  folderName: string;
  userId: string;
}

export interface AddFolderDto {
  folderName: string;
}

export interface FolderResponse {
  error: string;
  result: Folder[];
  success: boolean;
}
