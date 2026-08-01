import cv2
import os
import shutil

video_path = r"C:\Users\raziee\Desktop\Dipankar\rak\PCB_circuit_board_explodes_anime_202608011641.mp4"
output_dir = r"C:\Users\raziee\Desktop\Dipankar\rak\portfolio\public\frames"

# Clean the output directory
if os.path.exists(output_dir):
    shutil.rmtree(output_dir)
os.makedirs(output_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
count = 1

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    
    # Save as ezgif-frame-001.jpg
    filename = f"ezgif-frame-{count:03d}.jpg"
    filepath = os.path.join(output_dir, filename)
    cv2.imwrite(filepath, frame)
    count += 1

cap.release()
print(f"TOTAL_FRAMES={count-1}")
