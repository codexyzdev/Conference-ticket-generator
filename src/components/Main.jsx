import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Congrats from "./Congrats";
export default function Main() {
  const [ready, setReady] = useState(false);
  const [upload, setUload] = useState(true);
  const [form, setForm] = useState(undefined);
  const [image, setImage] = useState(null); // Almacena la URL de la imagen
  const inputRef = useRef(null); // Referencia al input para borrar la imagen
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      username: "",
    },
  });

  const onSubmit = (data) => {
    setReady(true);
    setForm({ ...data, avatar: image,ticketNumber:'01609'})
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtiene el primer archivo
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, selecciona una imagen.");
      event.target.value = "";
    }
  };

  const handleClearImage = (e) => {
    e.preventDefault();
    setImage(null);
    inputRef.current.value = ""; // Limpia el input
  };

  return (
    <main class='max-w-4xl mx-auto px-4 md:px-8 lg:px-0 text-neutral-0 text-center'>
      {ready ? (
        <Congrats
          data={form}
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className='text-3xl  pb-4 font-semibold md:text-6xl md:pb-8 '>
            Your Journey to Coding Conf 2025 Starts Here!
          </h1>
          <p className='pb-4 md:pb-8 text-neutral-500 text-xl  mx-auto md:text-2xl font-semibold'>
            Secure your spot at next year's biggest coding conference.
          </p>

          <section className='max-w-[400px] mx-auto flex flex-col gap-4 text-left'>
            <div className=' flex flex-col gap-2'>
              <p>Upload Avatar</p>
              <label
                htmlFor='file'
                className='w-full h-28 bg-neutral-900 rounded-md border-2 border-neutral-300 border-dotted relative'
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
                      <img alt='' src={image} className='rounded-md size-12' />
                    </div>
                    <div className='flex gap-3 text-xs'>
                      <button
                        onClick={handleClearImage}
                        className='bg-neutral-700 py-1 px-2 rounded-md'
                      >
                        Remove Image
                      </button>
                      <button
                        onClick={() => inputRef.current.click()}
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
              <p className='text-xs  text-neutral-500 flex gap-1.5 '>
                <img src='/assets/images/icon-info.svg' alt='' />
                Upload your photo (JPG or PNG, max size: 500KB).
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='fullname'>Full Name</label>
              <input
                type='text'
                id='fullname'
                {...register("fullname")}
                className='p-2 bg-neutral-900 w-full border border-neutral-500 rounded-md'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='email'>Email Address</label>
              <input
                type='email'
                id='email'
                {...register("email")}
                className='p-2 bg-neutral-900 w-full border border-neutral-500 rounded-md'
                placeholder='example@email.com'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='username'>GitHub Username</label>
              <input
                type='email'
                id='username'
                {...register("username")}
                className='p-2 bg-neutral-900 w-full border border-neutral-500 rounded-md'
                placeholder='@yourusername'
              />
            </div>

            <button
              type='submit'
              className='bg-orange-500 w-full  rounded-md p-2 font-extrabold text-neutral-900 mt-4 mb-8'
            >
              Generate My Ticket
            </button>
          </section>
        </form>
      )}
    </main>
  );
}
