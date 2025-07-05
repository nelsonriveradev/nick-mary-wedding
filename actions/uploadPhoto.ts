import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export async function uploadPhoto(fileUpload: File): Promise<string> {
  try {
    // Generate unique filename to avoid conflicts
    const timestamp = Date.now();
    const filename = `${timestamp}_${fileUpload.name}`;

    // This creates a proper folder structure: uploads/filename
    const storageRef = ref(storage, `uploads/${filename}`);

    const uploadTask = uploadBytesResumable(storageRef, fileUpload);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          switch (snapshot.state) {
            case "paused":
              console.log(`Upload is paused`);
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              console.log("File uploaded");
              resolve(url);
            })
            .catch(reject);
        }
      );
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
