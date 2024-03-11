import { storage } from "@/firebase";
import { getDownloadURL, ref } from "firebase/storage";

const fetchImgFromFireStorage = async (userId: string) => {
  try {
    console.log(storage);
    const pathReference = ref(storage, userId);
    console.log(storage);
    console.log(pathReference);

    const url = await getDownloadURL(pathReference);

    const response = await fetch(url);
    const blob = await response.blob();
    const imageURL = URL.createObjectURL(blob);
    return imageURL;
  } catch (error) {
    console.error("Error loading image:", error);
    return null;
  }
};
export default fetchImgFromFireStorage;
