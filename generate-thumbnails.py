import os
from PIL import Image

# Define paths
gallery_folder = "./assets/images/testmonial"  # Path to your gallery images
thumbnail_folder = "./assets/images/testmonial/thumbnails"  # Path to save thumbnails
thumbnail_size = (1080, 1080)  # Thumbnail size (width, height)

# Create the thumbnail folder if it doesn't exist
if not os.path.exists(thumbnail_folder):
    os.makedirs(thumbnail_folder)

# Function to generate thumbnails
def create_thumbnails():
    for filename in os.listdir(gallery_folder):
        # Process only image files
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            img_path = os.path.join(gallery_folder, filename)
            thumbnail_path = os.path.join(thumbnail_folder, filename)

            try:
                # Open the image
                with Image.open(img_path) as img:
                    # Convert to RGB if the image has an alpha channel
                    if img.mode in ("RGBA", "P"):
                        img = img.convert("RGB")

                    # Resize the image to fit within the thumbnail size, maintaining aspect ratio
                    img.thumbnail(thumbnail_size)

                    # Save the thumbnail in WebP format for better compression
                    thumbnail_webp_path = os.path.splitext(thumbnail_path)[0] + ".webp"
                    img.save(thumbnail_webp_path, "WEBP", quality=100)

                    print(f"Thumbnail created: {thumbnail_webp_path}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

# Run the function
if __name__ == "__main__":
    create_thumbnails()
