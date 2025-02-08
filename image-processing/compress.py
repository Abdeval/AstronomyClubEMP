from flask import Flask, request, send_file, jsonify
import pyvips

app = Flask(__name__)

@app.route("/")
def home():
    return {"message": "Image Compression Server is Running!"}, 200
@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({"message": "Server is running"}), 200

@app.route('/compress', methods=['POST'])
def compress_image():
    if 'image' not in request.files:
        return {"error": "No image provided"}, 400

    image_file = request.files['image']
    input_path = f"/tmp/{image_file.filename}"
    output_path = f"/tmp/compressed.webp"

    
    image_file.save(input_path)
    
    image = pyvips.Image.new_from_file(input_path, access="sequential")
    image.write_to_file(output_path, Q=90)  

    return send_file(output_path, mimetype="image/webp")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
