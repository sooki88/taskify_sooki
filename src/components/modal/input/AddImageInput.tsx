import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";

type ImageObject = {
  url: string;
  name: string;
  type: string;
};

function AddImageInput({
  value,
  onChange,
}: {
  value?: string;
  onChange: Dispatch<SetStateAction<File | ImageObject | undefined>>;
}) {
  const [addImages, setAddImages] = useState<(File | ImageObject)[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | ImageObject | null>({
    url: "",
    name: "",
    type: "",
  });

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
        // console.log("선택된 파일:", newImages);
      } else {
        alert("이미지 추가는 최대 4개까지 가능합니다.");
      }
    }
  };

  const handleSelectedImage = (image: File) => {
    setSelectedImage(image);
    onChange(image);
  };

  const handleDeleteImage = (index: number) => {
    setAddImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setSelectedImage(null);
  };

  function isFile(image: File | ImageObject): image is File {
    return (image as File).size !== undefined;
  }

  useEffect(() => {
    if (value) {
      const imageObject = {
        url: value,
        name: "기존 이미지",
        type: "image/jpeg",
      };

      setAddImages([imageObject]);
    }
  }, [value]);
  return (
    <div className="flex items-center gap-20">
      <input id="imageInput" type="file" accept="image/*" className="hidden" onChange={handleAddImage} />
      <div className="relative">
        <button onClick={handleImageUpload}>
          <Image src={"/images/addimage.png"} alt="사진 추가" width={76} height={76} priority={true} />
        </button>
      </div>
      {addImages.map((image, index) => {
        let src: string;

        if (isFile(image)) {
          src = URL.createObjectURL(image);
        } else {
          src = image.url;
        }

        return (
          <div key={index} className="relative">
            <div onClick={() => handleSelectedImage(image as File)}>
              <Image
                src={src}
                alt={`추가된 이미지 ${index}`}
                width={76}
                height={76}
                className={`object-cover w-80 h-80 rounded-6 cursor-pointer ${
                  selectedImage === image ? "border-2 border-purple" : ""
                }`}
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
        );
      })}
    </div>
  );
}

export default AddImageInput;
