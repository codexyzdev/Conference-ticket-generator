import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Congrats from "./Congrats";
import "./Main.css";
export default function Main() {
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState(undefined);
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);
  const fileInfo = useRef(null);
  const [msgError, setMsgError] = useState(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      username: "",
    },
  });

  const generateTicketNumber = () => {
    const number = Math.floor(Math.random() * 100000); // Número entre 0 y 99999
    return number.toString().padStart(5, "0");
  };

  const onSubmit = (data) => {
    if (!image) {
      setMsgError("Upload your photo (JPG or PNG, max size: 500KB).");
    } else {
      setMsgError(undefined);
      setReady(true);
    }

    setForm({ ...data, avatar: image, ticketNumber: generateTicketNumber() });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtiene el primer archivo
    if (
      !file.type.startsWith("image/") &&
      file.type !== "image/jpeg" &&
      file.type !== "image/png"
    ) {
      setMsgError("Only (JPG or PNG) files are allowed.");
      return;
    }
    if (file.size > 500 * 1024) {
      setMsgError("File too large. Please upload a photo under 500KB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
    };
    reader.readAsDataURL(file);
    setMsgError(undefined);
  };

  const handleClearImage = (e) => {
    e.preventDefault();
    setImage(null);
    inputRef.current.value = ""; // Limpia el input
  };

  const handleChangeImage = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  return (
    <main className='max-w-4xl mx-auto px-4 md:px-8 lg:px-0 text-neutral-0 text-center'>
      {ready ? (
        <Congrats data={form} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className=' pb-4 font-semibold  md:pb-8 '>
            Your Journey to Coding Conf 2025 Starts Here!
          </h1>
          <p className='pb-4 md:pb-8 text-neutral-500 text-xl  mx-auto md:text-2xl font-semibold'>
            Secure your spot at next year's biggest coding conference.
          </p>

          <section className='max-w-[400px] mx-auto flex flex-col gap-6 text-left'>
            <div className=' flex flex-col gap-2'>
              <p>Upload Avatar</p>
              <label
                htmlFor='file'
                className='w-full h-28 bg-transparent backdrop-blur-xs rounded-md border-2 border-neutral-300 border-dotted relative'
              >
                <input
                  type='file'
                  id='file'
                  className='hidden'
                  onChange={handleFileChange}
                  ref={inputRef}
                />
                {image ? (
                  <div className='absolute flex flex-col justify-center gap-2 items-center w-full h-full'>
                    <div>
                      <img
                        alt='avatar'
                        src={image}
                        className='rounded-md size-12'
                      />
                    </div>
                    <div className='flex gap-3 text-xs'>
                      <button
                        onClick={handleClearImage}
                        className='bg-neutral-700 py-1 px-2 rounded-md'
                      >
                        Remove Image
                      </button>
                      <button
                        onClick={handleChangeImage}
                        className='bg-neutral-700 py-1 px-2 rounded-md'
                      >
                        Change Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='absolute flex flex-col justify-center gap-2 items-center w-full h-full'>
                    <div className='bg-neutral-700 rounded-md size-10 flex justify-center items-center'>
                      <img src='/assets/images/icon-upload.svg' alt='' />
                    </div>
                    <p className='text-neutral-700 text-xs'>
                      Drag and drop or click to upload
                    </p>
                  </div>
                )}
              </label>
              <p
                ref={fileInfo}
                className='text-xs  text-neutral-500 flex gap-1.5 '
              >
                <img src='/assets/images/icon-info.svg' alt='' />
                {!msgError ? (
                  <span>Upload your photo (JPG or PNG, max size: 500KB).</span>
                ) : (
                  <span className='text-orange-700'>{msgError}</span>
                )}
              </p>
            </div>
            <div className='flex flex-col gap-2 relative'>
              <label htmlFor='fullname'>Full Name</label>
              <input
                type='text'
                id='fullname'
                {...register("fullname", { required: true })}
                className='p-2 bg-transparent backdrop-blur-xs w-full border border-neutral-500 rounded-md'
              />
              {errors.fullname && (
                <span className='text-xs absolute -bottom-5 text-orange-700 flex justify-center items-center gap-2'>
                  {" "}
                  <img className='size-3' src='/assets/images/icon-info.svg' />
                  This field is required
                </span>
              )}
            </div>

            <div className='flex flex-col gap-2 relative'>
              <label htmlFor='email'>Email Address</label>
              <input
                type='email'
                id='email'
                {...register("email", { required: true })}
                className='p-2 bg-transparent backdrop-blur-xs w-full border border-neutral-500 rounded-md'
                placeholder='example@email.com'
              />
              {errors.email && (
                <span className='text-xs absolute -bottom-5 text-orange-700 flex justify-center items-center gap-2'>
                  {" "}
                  <img className='size-3' src='/assets/images/icon-info.svg' />
                  This field is required
                </span>
              )}
            </div>

            <div className='flex flex-col gap-2 relative'>
              <label htmlFor='username'>GitHub Username</label>
              <input
                type='text'
                id='username'
                {...register("username", { required: true })}
                className='p-2 bg-transparent backdrop-blur-xs w-full border border-neutral-500 rounded-md'
                placeholder='@yourusername'
              />
              {errors.username && (
                <span className='text-xs absolute -bottom-5 text-orange-700 flex justify-center items-center gap-2'>
                  {" "}
                  <img className='size-3' src='/assets/images/icon-info.svg' />
                  This field is required
                </span>
              )}
            </div>

            <button
              type='submit'
              className='bg-orange-500 w-full  rounded-md p-2 font-extrabold text-neutral-900 mb-12'
            >
              Generate My Ticket
            </button>
          </section>
        </form>
      )}
    </main>
  );
}
