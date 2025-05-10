const Input = () => {
  return (
    <section className="flex flex-row items-center justify-center pt-20 w-full">
      <form action="/">
        <input type="text" placeholder="e.g ingredients ..." className=" mr-5 border text-black w-[15rem]  sm:w-[20rem] md:w-[30rem] h-[2.5rem] rounded-md p-2.5" />
        <button className=" px-2 sm:px-5 md:px-10 sm:text-[0.8rem] text-[0.7rem] tracking-[0.1rem] font-semibold">
          + Add ingredients
        </button>
      </form>
    </section>
  );
};

export default Input;
