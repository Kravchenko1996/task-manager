import os
from shutil import copy

STATIC_CSS = 'static/css'
STATIC_JS = 'static/js'
STATIC_IMG = 'static/img'
TEMPLATES = 'templates'
DIST_FOLDER = 'GUI/dist'

for file_name in next(os.walk(DIST_FOLDER))[2]:
    from_dir = os.path.join(DIST_FOLDER, file_name)
    name, ext = os.path.splitext(file_name)

    if ext == '.js':
        target_folder = STATIC_JS
    # elif ext == '.html':
    #     target_folder = TEMPLATES
    elif ext == '.css':
        target_folder = STATIC_CSS
    elif ext == '.ico':
        target_folder = STATIC_IMG
    else:
        continue
    copy(from_dir, target_folder)
