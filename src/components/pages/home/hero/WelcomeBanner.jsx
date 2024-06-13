export default function WelcomeBanner() {
  return (
    <div className="absolute top-0 right-0 bg-white z-10 flex flex-col justify-evenly max-w-[380px] h-[600px] px-7 py-10 border-[20px] border-primary rounded-bl-[4.3rem]">
      <div>
        <span className="text-5xl font-bold text-blue">Welcome</span> <br />
        <span className="text-darkText text-[40px]">to our family</span>
      </div>
      <p className="text-xl text-gray">
        Jood is a center for caring of “people of Determination” and helping
        them to lice and into society .
      </p>

      <div className="flex text-sm font-bold">
        <a
          className="bg-blue rounded flex justify-center items-center w-full px-7 py-3 text-white transition hover:text-blue hover:bg-white border border-white hover:border-blue"
          href="/signin"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}
