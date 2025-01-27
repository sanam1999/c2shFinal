const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer storage configuration
const storage = multer.diskStorage({
    // Dynamically set the destination based on 'type' (from request body)
    destination: async (req, file, cb) => {
        try {
            // Get the 'type' from the request body or set a default value
            const type = file.fieldname || 'general';  // Default to 'general' if no type is provided

            const uploadDir = path.join(__dirname, `../uploads/${type}`);

            // Ensure the directory exists, create it if it doesn't
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true }); 
            }

            // Pass the directory to the callback
            cb(null, uploadDir);
        } catch (error) {
            // In case of error, pass it to the callback
            cb(new Error('Failed to set destination directory: ' + error.message));
        }
    },

    // Dynamically set the filename (you could use type here too)
    filename: (req, file, cb) => {
        try {
            // Get the 'type' from the request body or set a default value
            const type = file.fieldname || 'general';  

            // Generate a unique file name based on type, timestamp, and file extension
            const uniqueName = `${req.user.name}_${Date.now()}${path.extname(file.originalname)}`;
            cb(null, uniqueName);
        } catch (error) {
            // In case of error, pass it to the callback
            cb(new Error('Failed to generate unique filename: ' + error.message));
        }
    }
});

// Multer middleware setup
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size: 10MB
    },
    fileFilter: (req, file, cb) => {
        try {
            const allowedImageMimeTypes = [
                'image/jpeg',
                'image/png',
                'image/gif',
                'image/bmp',
                'image/webp',
                'image/tiff'
            ];

            // Check if the file's mime type is allowed
            if (allowedImageMimeTypes.includes(file.mimetype)) {
                return cb(null, true); // Accept the file
            } else {
                cb(new Error('Only image files are allowed.')); // Reject the file
            }
        } catch (error) {
            // Handle unexpected error
            cb(new Error('File filter failed: ' + error.message));
        }
    }
});

// Helper function to delete an image file
const deleteImage = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(new Error(`Failed to delete image: ${err.message}`));
            } else {
                resolve('Image deleted successfully');
            }
        });
    }).catch((error) => {
        throw new Error(`Error deleting file: ${error.message}`);
    });
};

module.exports = {
    upload,
    deleteImage,
};
