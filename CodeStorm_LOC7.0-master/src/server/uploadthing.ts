import { createUploadthing, type FileRouter } from "uploadthing/server";

export const uploadRouter = {
  fileUpload: createUploadthing()
    .fileTypes(["image/*", "application/pdf"]) // Allow images and PDFs
    .maxSize(4 * 1024 * 1024) // 4MB max file size
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("File uploaded:", file);
      return { url: file.url }; // Return the uploaded file's URL
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
