export default function AboutUs() {
  const cardsData = [
    {
      image: "education",
      title: "Education",
      paragraph:
        "We have a qualified crew and they have all the required skills to deal with the learn difficulty that your child have.",
    },
    {
      image: "nurse",
      title: "Medical Care",
      paragraph:
        "We have a great medical support for our students and we care about all their medical condition details.",
    },
    {
      image: "entertainment",
      title: "Entertainment",
      paragraph:
        "We do a lot of activities to make the students more comfortable and to get them use to deal with each other and to integrate them into society.",
    },
  ];
  return (
    <div className="py-32" id="aboutus">
      <h1 className="text-blue text-[40px] font-bold mb-1">About Us</h1>
      <p className="text-sm text-gray w-[70%]">
        "We help your child adapt to their surrounding environment, interact
        with peers, express themselves, and provide support for them to
        understand the potential dangers in their surroundings"
      </p>

      <div className="mt-20 flex justify-between mb-10">
        {cardsData.map((card, index) => {
          return (
            <div
              key={index}
              className={`px-6 py-8 ${
                index === 1 ? "mx-4" : ""
              } max-w-[340px] h-fill shadow-lg border border-lightgray rounded-md`}
            >
              <img
                className="mb-10 min-h-[82px] max-w-[80px] object-contain"
                src={`/assets/aboutus/${card.image}.svg`}
                alt=""
              />
              <span className="font-bold text-darkText">{card.title}</span>
              <hr className="w-[50px] border border-red my-5" />
              <p className=" text-sm text-gray">{card.paragraph}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
