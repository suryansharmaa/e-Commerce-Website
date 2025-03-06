import { v2 as cloudinary } from "cloudinary";
import multer, { memoryStorage } from "multer";

cloudinary.config({
  // Everything will be available when you'll login Cloudinary

  cloud_name: "xyzname",
  api_key: "some_numbers",
  api_secret: "iulsnkjdfg9viowinerv",
});

const storage = new memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
}

const upload = multer({ storage });

export default { upload, imageUploadUtil };
