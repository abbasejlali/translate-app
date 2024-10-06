import React from "react";

function HomePage() {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-8/12 mx-auto mt-16 border border-neutral-100  border-spacing-2 flex flex-col justify-start items-center  ">
        <h2 className=" font-bold text-neutral-700 text-5xl mb-10 ">
          Translation App
        </h2>
        <div className=" flex flex-row w-full justify-between items-center ">
          <select className="select   select-bordered  w-2/4">
            <option disabled selected>
              Choose a language
            </option>
            <option>Homer</option>
            <option>Marge</option>
            <option>Bart</option>
            <option>Lisa</option>
            <option>Maggie</option>
          </select>
          <select className="select   select-bordered  w-2/4 ml-5">
            <option disabled selected>
              Choose a language
            </option>
            <option>Homer</option>
            <option>Marge</option>
            <option>Bart</option>
            <option>Lisa</option>
            <option>Maggie</option>
          </select>
        </div>
        <textarea
          placeholder="Enter text to translate"
          className="textarea textarea-bordered textarea-lg w-full my-5 "
        ></textarea>
        <button className="btn btn-wide w-full">Translation</button>
      </div>
    </>
  );
}

export default HomePage;
