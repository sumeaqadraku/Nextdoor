const ImageUploadPreview = ({ images, setImages }) => {
  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages(previews)
  };

  return (
    <div className="w-full flex flex-col gap-2 mt-2">
      <label className="text-[19px] font-semibold">Upload Images</label>
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        accept="image/*"
        className="bg-[#F6F6F6] p-2 rounded-lg"
      />
      <div className="mt-3 flex flex-wrap gap-3">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative w-28 h-28 rounded-lg overflow-hidden border border-gray-300 shadow-sm"
          >
            <img
              src={img.url}
              alt={`Preview ${idx}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploadPreview;
