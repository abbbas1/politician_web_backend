import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const envData = process.env;

const getFolder=(model)=>{
  return model
}

cloudinary.config({
  cloud_name: envData.CLOUD_NAME,
  api_key: envData.API_KEY,
  api_secret: envData.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req,file)=>getFolder(req.params.model), 
    format: async (req, file) => file.originalname.split(".").pop(),
    public_id: (req, file) => `${file.fieldname}_${Date.now()}${file.originalname}`,
  },
});
const upload = multer({ storage: storage });
export default upload;
