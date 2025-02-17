import { useState } from "react";
import { useForm } from "react-hook-form";
import Congrats from "./Congrats";
export default function Main() {
  const [ready, setReady] = useState(false);
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
      file: undefined,
    },
  });

  const onSubmit = (data) => console.log(data);

  console.log(watch("example"));
  return (
    <main class='max-w-4xl mx-auto px-4 md:px-8 lg:px-0 text-neutral-0 text-center'>
      {ready ? (
        <Congrats
          data={{
            fullname: "Jonatan Kristof",
            email: "Jonatankristof@email.com",
            username: "Jonatankristof0101",
            ticketNumber: "01609",
          }}
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
                className='w-full h-28 bg-neutral-900 rounded-md border-2 border-neutral-300 border-dotted'
              >
                <input
                  type='file'
                  id='file'
                  placeholder=' '
                  {...register("file", {
                    required: "Debes seleccionar un archivo",
                    validate: (file) => {
                      const isValidSize = file[0]?.size < 5_000;
                      return isValidSize || "El archivo es demasiado grande";
                    },
                  })}
                  className='hidden'
                />
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
                className='p-2 bg-neutral-900 w-full border border-neutral-500 rounded-md'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='email'>Email Address</label>
              <input
                type='email'
                id='email'
                className='p-2 bg-neutral-900 w-full border border-neutral-500 rounded-md'
                placeholder='example@email.com'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='username'>GitHub Username</label>
              <input
                type='email'
                id='username'
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
