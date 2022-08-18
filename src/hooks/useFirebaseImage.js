import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

export default function useFirebaseImage(setValue, getValues) {
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState("");

    const handleUploadImage = (file) => {
        const storage = getStorage();

        const storageRef = ref(storage, "images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progressPercent =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progressPercent);
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        console.log("Nothing");
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log("Error");
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    setImage(downloadURL);
                });
            }
        );
    };

    const handleSelectImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setValue("image_name", file.name);
        handleUploadImage(file);
    };

    const handleDeleteImage = () => {
        const storage = getStorage();
        const imageRef = ref(storage, "images/" + getValues("image_name"));
        deleteObject(imageRef)
            .then(() => {
                console.log("Thanh cong");
                setImage("");
                setProgress(0);
            })
            .catch((error) => {
                console.log("That bai");
            });
    };

    const handleResetUpload = () => {
        setImage("");
        setProgress(0);
    };

    return {
        image,
        handleResetUpload,
        progress,
        handleSelectImage,
        handleDeleteImage,
    };
}
