import { useState, useEffect } from "react";
import { getBrochure, getDescription } from '../api/apiCall'

function Theme() {

  const [description, setDescription] = useState('')
  const [brochure, setBrochure] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const responce = await getDescription()
        setDescription(responce.data)
        toast.success(`Yes, ${responce.message}}`);

      } catch (error) {
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      const response = await getBrochure()
      setBrochure(response.data)
    }
    fetchData()
  }, [])
  return (
    <>
      <div className="flex flex-col gap-8 py-14 mt-4 text-center w-full px-10 xl:px-56">
        <h2 className="text-4xl lg:text-6xl text-[#335C67] font-bold font-manjari">
          വരാന്ത
        </h2>
        <p className="text-lg lg:text-xl font-thin text-justify font-manjari">{description} </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16 px-10 xl:px-56">

        {Object.values(brochure || {}).map((imgObj, index) => (
          imgObj?.path && (
            <img
              key={index}
              src={imgObj.path}
              className="object-cover h-full w-full rounded-md "
              alt={`Gallery ${index + 1}`}
            />
          )
        ))}
      </div>
    </>
  )
}

export default Theme