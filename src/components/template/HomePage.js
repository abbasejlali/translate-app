import React, { useEffect, useState } from "react";
import { CallApi } from "../../libs/helper/CallApi";

function HomePage() {
  const { REACT_APP_APIHUB_GET, REACT_APP_APIHUB_POST } = process.env;
  const [languages, setLanguages] = useState([]);
  const [languagesType, setLanguagesType] = useState({
    translated_from: "eng",
    translated_to: "eng",
  });
  const { translated_from, translated_to } = languagesType;
  const [TranslatedText, setTranslatedText] = useState("");
  const [result, setResult] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const FetchLang = async () => {
      const res = await CallApi().get("/languages", {
        headers: {
          "x-apihub-endpoint": REACT_APP_APIHUB_GET,
        },
      });

      if (res?.status === 200) {
        setLanguages(res.data);
      }
    };
    FetchLang();
  }, []);

  const ChangeLangHandeler = (e) => {
    setLanguagesType({
      ...languagesType,
      [e.target.name]: e.target.value,
    });
  };

  const ChangeTranslatedText = (e) => {
    setTranslatedText(e.target.value);
  };

  useEffect(() => {
    if (result) {
      document.getElementById("my_modal_1").showModal();
    }
  }, [result]);

  const BtnTranslation = async () => {
    if (translated_from && translated_to && TranslatedText) {
      setIsloading(true);
      const res = await CallApi().post(
        `/translate?translated_from=${translated_from}&translated_to=${translated_to}`,
        {
          ["input"]: TranslatedText.trim(),
        },
        {
          headers: {
            "x-apihub-endpoint": REACT_APP_APIHUB_POST,
          },
        }
      );

      setIsloading(false);
      if (res?.status === 200) {
        setResult(res.data.translation[0]);
      }
    } else {
      setError(true);
      console.log("invalid");
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-8/12 mx-auto mt-16 border border-neutral-100  border-spacing-2 flex flex-col justify-start items-center  ">
        <h2 className=" font-bold text-neutral-700 text-5xl mb-10 ">
          Translation App
        </h2>
        <div className=" flex flex-row w-full justify-between items-center ">
          <label className="form-control w-2/4">
            <div className="label">
              <span className="label-text">Translated From :</span>
            </div>
            <select
              onChange={ChangeLangHandeler}
              value={translated_from}
              name="translated_from"
              className="select   select-bordered  w-full"
            >
              <option disabled selected>
                Choose a language
              </option>
              {languages.length > 0 ? (
                languages.map((item, index) => (
                  <option value={item.language_code} key={index}>
                    {item.language}
                  </option>
                ))
              ) : (
                <option value="">Empty</option>
              )}
            </select>
          </label>
          <label className="form-control w-2/4 ml-5">
            <div className="label">
              <span className="label-text">Translated To :</span>
            </div>
            <select
              onChange={ChangeLangHandeler}
              value={translated_to}
              name="translated_to"
              className="select   select-bordered  w-full"
            >
              <option disabled selected>
                Choose a language
              </option>
              {languages.length > 0 ? (
                languages.map((item, index) => (
                  <option value={item.language_code} key={index}>
                    {item.language}
                  </option>
                ))
              ) : (
                <option value="">Empty</option>
              )}
            </select>
          </label>
        </div>
        <textarea
          placeholder="Enter text to translate"
          className="textarea textarea-bordered textarea-lg w-full my-5"
          onChange={ChangeTranslatedText}
          value={TranslatedText}
        ></textarea>
        <button
          className="btn font-medium text-xl w-full"
          onClick={BtnTranslation}
        >
          {isloading ? <span className="loading loading-spinner"></span> : null}
          Translation
        </button>
      </div>
      {result && (
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Translated Text</h3>
            <p className="py-4">{result}</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={() => setResult("")}>
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
      {error && (
        <div
          role="alert"
          className=" absolute top-[10%] left-[2%] w-[20%] alert z-50 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info h-6 w-6 shrink-0  "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Please fill in all fields</span>
          <button className="btn btn-sm" onClick={() => setError(false)}>
            close
          </button>
        </div>
      )}
    </>
  );
}

export default HomePage;
