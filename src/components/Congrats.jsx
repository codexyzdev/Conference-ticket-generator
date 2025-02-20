import "./congrats.css";
export default function Congrats({ data }) {
  return (
    <section>
      <h1 className='pb-4 font-semibold md:pb-8'>
        Congrats, <span className='username'>{data.fullname}</span> Your ticket
        is ready
      </h1>
      <p className='pb-16 md:pb-20 text-neutral-300 max-w-[450px] mx-auto md:text-lg font-semibold'>
        We've emailed your ticket to{" "}
        <span className='text-orange-500'>{data.email}</span> and will send
        updates in the run up to the event.
      </p>
      <div className='max-w-[320px] md:max-w-[600px] relative mx-auto'>
        <img src='/assets/images/pattern-ticket.svg' alt='' />
        <div className='absolute top-4 left-4 flex justify-center items-center gap-4 md:top-8 md:left-8 md:gap-6'>
          <img
            src='/assets/images/logo-mark.svg'
            className='size-8 md:size-10 md:self-start'
            alt=''
          />
          <div className='flex flex-col items-start md:gap-2'>
            <h2 className='font-bold md:text-4xl'>Coding Conf</h2>
            <p className='text-xs text-neutral-500 md:text-xl'>
              Jan 31, 2025 / Austin, TX
            </p>
          </div>
        </div>
        <div className='absolute bottom-5 left-4 flex justify-center items-center gap-4 md:bottom-8 md:left-8 md:gap-6'>
          <img
            src={data.avatar}
            className='size-10 rounded-md md:size-24'
            alt=''
          />
          <div className='flex flex-col items-start md:gap-3'>
            <h3 className='md:text-3xl'>{data.fullname}</h3>
            <p className='text-xs lowercase text-neutral-500 flex justify-center items-center gap-1 md:gap-3 md:text-xl'>
              <img
                src='/assets/images/icon-github.svg'
                className='size-4 md:size-8'
                alt=''
              />
              @{data.username}
            </p>
          </div>
        </div>
        <div className='absolute text-neutral-500 right-1 rotate-90 top-[50%] translate-y-[-50%] md:text-4xl md:right-0'>
          #{data.ticketNumber}
        </div>
      </div>
    </section>
  );
}
