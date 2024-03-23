
from PIL import Image
import base64
import io
import sys

file = sys.argv[1]
im = Image.open(file)

size =  int(im.width/ 80),int(im.height/80)
og_size=  im.width,im.height
im_resized = im.resize(size, Image.BICUBIC)
im_resized = im_resized.resize(og_size, Image.BOX)


img_byte_arr = io.BytesIO()
im_resized.save(img_byte_arr, format='PNG')
img_byte_arr = img_byte_arr.getvalue()
base64_utf8_str = base64.b64encode(img_byte_arr).decode('utf-8')

ext     = file.split('.')[-1]
dataurl = f'data:image/{ext};base64,{base64_utf8_str}'
print(dataurl)