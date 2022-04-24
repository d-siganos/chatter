import React, { useEffect, useState } from 'react'
import { useChat } from '../contexts/chatContext';
import { IoIosCloseCircleOutline } from 'react-icons/io';


const UploadImages = ({ sendImage }: { sendImage: any }) => {
  const { images, setImages } = useChat();
  const [imageURLs, setImageURLs] = useState<Array<string>>([]);

  const uploadImage = () => {
    Object.keys(images).forEach((i: any) => {
      const image = images[i];
      const reader = new FileReader();

      reader.onload = () => {
        sendImage(reader.result);
      };

      reader.readAsDataURL(image);
    });

    setImages([]);
  }

  useEffect(() => {
    if (images.length < 1) return;

    let newImageURLs: Array<string> = [];

    images.forEach((image: any) => newImageURLs.push(URL.createObjectURL(image)));
    setImageURLs(newImageURLs);

    return () => {
      newImageURLs.forEach((url: string) => URL.revokeObjectURL(url));
    }
  }, [images]);

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative md:w-1/3 w-screen mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col md:h-auto h-screen bg-white outline-none focus:outline-none p-8">
            <IoIosCloseCircleOutline className="text-gray-400 hover:text-gray-600 absolute top-0 right-0 m-4 cursor-pointer transition duration-200"
              size="32" onClick={() => setImages([])} />
            <h2 className="text-gray-900 text-2xl sm:text-3xl text-center font-bold">Upload image{images.length > 1 ? 's' : null}</h2>
            <div className="my-4 w-full border-t border-gray-300"></div>
            <div className="flex flex-col">
              {imageURLs.map((imageSrc: string, i: number) => (
                <div className="mx-auto my-2" key={i}>
                  <img src={imageSrc} className="rounded-lg" alt={`Upload ${i}`} />
                </div>
              ))}
            </div>
              <button
                onClick={uploadImage}
                className="w-1/3 mx-auto flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 
                hover:to-indigo-600 text-gray-100 p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500">
                Upload
              </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  )
}

export default UploadImages;