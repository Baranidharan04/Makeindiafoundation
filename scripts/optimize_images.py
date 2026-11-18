import os
from PIL import Image

def optimize_image(src_path, quality=80, max_size=None):
    if not os.path.exists(src_path):
        return
    orig_size = os.path.getsize(src_path)
    im = Image.open(src_path)
    
    # If dimensions exceed max_size, resize
    if max_size:
        w, h = im.size
        if max(w, h) > max_size:
            im.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
    
    # Save optimized WebP
    base, ext = os.path.splitext(src_path)
    webp_path = f"{base}.webp"
    
    # If image has alpha and saving as JPEG or WebP
    if im.mode in ('RGBA', 'LA') and ext.lower() in ('.jpg', '.jpeg'):
        background = Image.new('RGB', im.size, (255, 255, 255))
        background.paste(im, mask=im.split()[-1])
        im = background
    elif im.mode == 'RGBA':
        im.save(webp_path, 'WEBP', quality=quality)
    else:
        im = im.convert('RGB')
        im.save(webp_path, 'WEBP', quality=quality)
        
    webp_size = os.path.getsize(webp_path) if os.path.exists(webp_path) else 0

    # Also optimize the original file in-place if possible (e.g. PNG/JPG)
    if ext.lower() == '.png':
        # Re-save png with optimize
        try:
            im.save(src_path, 'PNG', optimize=True)
            new_size = os.path.getsize(src_path)
            print(f"PNG {src_path}: {orig_size//1024}KB -> {new_size//1024}KB | WebP: {webp_size//1024}KB")
        except Exception as e:
            print(f"Error optimizing {src_path}: {e}")
    elif ext.lower() in ('.jpg', '.jpeg'):
        try:
            im.save(src_path, 'JPEG', quality=quality, optimize=True)
            new_size = os.path.getsize(src_path)
            print(f"JPG {src_path}: {orig_size//1024}KB -> {new_size//1024}KB | WebP: {webp_size//1024}KB")
        except Exception as e:
            print(f"Error optimizing {src_path}: {e}")

images_to_optimize = [
    ('src/assets/competitions/c2.png', 80, 1400),
    ('src/assets/competitions/c1.png', 80, 1400),
    ('src/assets/hero/hero1.png', 80, 1400),
    ('src/assets/hero/hero2.png', 80, 1400),
    ('src/assets/hero/hero3.png', 80, 1400),
    ('src/assets/hero/hero_2.png', 80, 1400),
    ('src/assets/hero/makerhero.png', 80, 1400),
    ('src/assets/competitions/building.jpg', 80, 1000),
    ('src/assets/competitions/drone.jpg', 80, 1000),
    ('src/assets/keerthan-dm-XA92214FLiM-unsplash.jpg', 80, 1200),
    ('src/assets/adplix-logo.png', 85, 600),
    ('src/assets/Vishnu.PNG', 80, 600),
    ('src/assets/murugan.PNG', 80, 600),
    ('src/assets/DR sunadaramoorthy.PNG', 80, 600),
    ('src/assets/team-photo.jpg', 80, 800),
    ('src/assets/technology.jpg', 80, 800),
    ('src/assets/engineering.jpg', 80, 800),
]

for item in images_to_optimize:
    path = item[0]
    q = item[1]
    m = item[2]
    optimize_image(path, q, m)

# Process workshop images
workshops_dir = 'src/assets/workshops'
if os.path.exists(workshops_dir):
    for f in os.listdir(workshops_dir):
        if f.lower().endswith(('.jpg', '.jpeg', '.png')):
            optimize_image(os.path.join(workshops_dir, f), 80, 1000)

print("Done optimizing images!")
