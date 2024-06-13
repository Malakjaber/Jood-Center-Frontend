export default function Footer() {
  return (
    <div
      id="footer"
      className="footer-background h-[250px] flex justify-center"
    >
      <div className="self-center w-[75%] flex justify-between">
        <div>
          <h1 className="text-base text-darkText font-bold mb-4">
            Company Info
          </h1>
          <div className="flex flex-col text-sm text-gray font-bold justify-between h-20">
            <p>August,9,2015</p>
            <a href="http://www.jod.ps/">http://www.jod.ps/</a>
            <a href="https://www.facebook.com/jod.institute/">
              https://www.facebook.com/jod.institute/
            </a>
          </div>
        </div>
        <div>
          <h1 className="text-base text-darkText font-bold mb-4">Resources</h1>
          <div className="flex flex-col text-sm text-gray font-bold justify-between h-12">
            <p>معهد جود للتربية الخاصة</p>
            <p>المركز الوطني لصعوبات التعلم -معهد جود</p>
          </div>
        </div>
        <div>
          <h1 className="text-base text-darkText font-bold mb-4">
            Get In Touch
          </h1>
          <div className="flex flex-col text-sm text-gray font-bold justify-between h-[100px]">
            <a className="flex items-center" href="tel:+972592770099">
              <img
                className="mr-[10px]"
                src="/assets/footer/phoneIcon.svg"
                alt=""
              />
              <span>972592770099</span>
            </a>
            <address className="flex items-center">
              <img
                className="mr-[10px]"
                src="/assets/footer/locationIcon.svg"
                alt=""
              />
              <span>Al-Bireh-Albalo-Beside Blue Moon Caffee</span>
            </address>
            <a
              className="flex items-center"
              href="mailto:Duaa_kh_Salahat@hotmail.com"
            >
              <img
                className="mr-[10px]"
                src="/assets/footer/mailIcon.svg"
                alt=""
              />
              <span>Duaa_kh_Salahat@hotmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
