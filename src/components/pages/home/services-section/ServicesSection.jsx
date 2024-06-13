export default function ServicesSection() {
  const cardsData = [
    {
      image: "DOLT",
      title: "Difficulty Of Learning Therapy",
      paragraph:
        "We focus on helping your child to absorption and make learning easy operation for them by working at this with a lot of patience and insistance.",
    },
    {
      image: "AS",
      title: "Autism Spectrum",
      paragraph:
        "We have a highly qualified specialists to help this case by using a lot of support and understanding to your child to make them more capable to deal with others.",
    },
    {
      image: "DOS",
      title: "Difficulty Of Speech",
      paragraph:
        "A lot of kids have speaking problems so we deal with this situation and enable them to get the right spelling of letters and words easily.",
    },
  ];
  return (
    <div className="py-24" id="services">
      <h1 className="text-blue text-[40px] font-bold mb-1">Services</h1>
      <p className="text-sm text-gray w-[70%]">
        We help your child adapt with the surrounding environment and keeping
        them up with the children from the same generation.
      </p>
      <div className="mt-20 flex justify-between mb-10">
        {cardsData.map((card, index) => {
          return (
            <div
              key={index}
              className={`w-[340] h-fit ${
                index === 1 ? "mx-4" : ""
              } max-w-[340px] h-fill`}
            >
              <img
                className="h-[300px]"
                src={`/assets/servicesImages/${card.image}.png`}
                alt=""
              />
              <div className="pl-5 pt-7">
                <span className="font-bold text-darkText ">{card.title}</span>
                <p className="mt-16 text-sm text-gray">{card.paragraph}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
