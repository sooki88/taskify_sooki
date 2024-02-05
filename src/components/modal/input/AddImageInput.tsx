import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

function AddImageInput({ value, onChange }: { value?: string; onChange: Dispatch<SetStateAction<File | undefined>> }) {
  const [addImages, setAddImages] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | string | null>(null);

  const handleImageUpload = () => {
    const imageInput = document.getElementById("imageInput") as HTMLInputElement;
    imageInput.click();
  };

  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files;
    if (images) {
      const newImages = Array.from(images);
      const totalImages = addImages.length + newImages.length;
      if (totalImages <= 4) {
        setAddImages((prevImages) => [...newImages, ...prevImages]);
        console.log("선택된 파일:", newImages);
      } else {
        alert("이미지 추가는 최대 4개까지 가능합니다.");
      }
    }
  };

  const hanldeSelectedImage = (image: File) => {
    setSelectedImage(image);
    onChange(image);
  };

  const handleDeleteImage = (index: number) => {
    setAddImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setSelectedImage(null);
  };

  return (
    <div className="flex items-center gap-20">
      <input id="imageInput" type="file" accept="image/*" className="hidden" onChange={handleAddImage} />
      <button onClick={handleImageUpload}>
        <Image src={value || "/images/addimage.png"} alt="사진 추가" width={76} height={76} priority={true} />
      </button>
      {addImages.map((image, index) => (
        <div key={index} className="relative">
          <div onClick={() => hanldeSelectedImage(image)}>
            <img
              src={URL.createObjectURL(image)}
              alt={`추가된 이미지 ${index}`}
              width={76}
              height={76}
              className={`object-cover w-80 h-80 rounded-6 cursor-pointer ${selectedImage === image ? "border-2 border-purple" : ""}`}
            />
          </div>
          {selectedImage === image && (
            <button
              className="absolute flex items-center justify-center p-1 font-semibold text-white rounded-full w-25 h-25 -top-5 bg-purple font-Pretendard text-13 -right-5"
              onClick={() => handleDeleteImage(index)}>
              X
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default AddImageInput;
