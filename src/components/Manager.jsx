import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef()
  const passwordref = useRef()
  const [form, setform] = useState({ site: "", userid: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    let passswards = localStorage.getItem("passwords")
    if (passswards) {
      setpasswordArray(JSON.parse(passswards))
    }
  }, [])


  const handelchange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const SavePassword = () => {
    if (form.site.length>3 && form.userid.length>3 && form.password.length>3) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      setform({ site: "", userid: "", password: "" })
    }
    else{
      alert("Enter More Than Three Character")
    }
  }

  const deletePassword = (id) => {
    setpasswordArray(passwordArray.filter(item => item.id !== id))
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
  }

  const editPassword = (id) => {
    console.log("editing")
    setform(passwordArray.filter(i => i.id === id)[0])
    setpasswordArray(passwordArray.filter(item => item.id !== id))
  }


  const ShowPassword = () => {
    
    if (ref.current.src.includes("icon/eye.png")) {
      ref.current.src = "icon/eyecross.png"
      passwordref.current.type = "text"
    }
    else {
      ref.current.src = "icon/eye.png"
      passwordref.current.type = "password"
    }
  }

  const copytext = (text) => {
    navigator.clipboard.writeText(text)
  }


  return (
    <>
      <div className='md:w-4xl mx-auto px-4 sm:px-6 md:px-10 min-h-[89.7vh] md:min-h-[87.9vh]'>
        <h1 className='text-2xl sm:text-3xl text-center font-bold'>
          <span className='text-green-700'>&lt;</span>
          Pass
          <span className='text-green-700'>MAN/&gt;</span>
        </h1>
        <p className='text-green-900 text-center font-bold'>Your Own Password Manager</p>
        <div className=" flex flex-col p-4 gap-3 items-center">
          <input value={form.site} onChange={handelchange} placeholder='Enter Website URL' className='rounded-full border border-green-500 text-black p-4 py-1 w-full' type="text" name='site' />
          <div className='flex flex-col md:flex-row w-full justify-between gap-4'>
            <input value={form.userid} onChange={handelchange} placeholder='Enter User ID' className='rounded-full border border-green-500 text-black p-4 py-1 w-full' type="text" name='userid' />
            <div className='relative'>
              <input ref={passwordref} value={form.password} onChange={handelchange} placeholder='Enter Password' className='rounded-full border border-green-500 text-black p-4 py-1 w-full' type="password" name='password' />
              <span className='absolute right-[4px] top-[4px] cursor-pointer' onClick={ShowPassword}>
                <img ref={ref} className='p-1 cur' width={25} src="icon/eye.png" alt="" />
              </span>
            </div>
          </div>
          <div>
            <button onClick={SavePassword} className='flex justify-center items-center gap-2 bg-green-400 border border-green-900 rounded-full px-4 py-2 sm:px-6 hover:bg-green-300 text-sm sm:text-base'>
              <lord-icon
                src="https://cdn.lordicon.com/efxgwrkc.json"
                trigger="hover">
              </lord-icon>
              Save Password</button>
          </div>
        </div>
        <div className="passwords">
          <h2>Your Passwords</h2>
          {passwordArray.length === 0 && <div>NO PASSWORDS</div>}
          {passwordArray.length != 0 && <div className="overflow-x-auto"><table className='table-auto min-w-[600px] md:w-full overflow-hidden rounded-md'>
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='md:py-2'>Site</th>
                <th className='md:py-2'>User ID</th>
                <th className='md:py-2'>Password</th>
                <th className='md:py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-green-100'>
              {passwordArray.map((item, index) => {
                return <tr key={index}>
                  <td className='text-center py-2 border border-white'>
                    <div className='flex items-center justify-center gap-2'>
                      <a href="item.site" target='_blank'>{item.site}</a>
                      <div className='cursor-pointer loardiconcopy' onClick={() => { copytext(item.site) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/xuoapdes.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='text-center py-2 border border-white'>
                    <div className='flex items-center justify-center gap-2'>
                      <span>{item.userid}</span>
                      <div className='cursor-pointer loardiconcopy' onClick={() => { copytext(item.userid) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/xuoapdes.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='text-center py-2 border border-white'>
                    <div className='flex items-center justify-center gap-2'>
                      <span>{"*".repeat(item.password.length)}</span>
                      <div className='cursor-pointer loardiconcopy' onClick={() => { copytext(item.password) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/xuoapdes.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='text-center py-2 border border-white'>
                    <div className='flex justify-center items-center gap-4'>
                      <span className='cursor-pointer' onClick={() => { editPassword(item.id) }}>
                        <img className='w-6' src="icon/edit.png" alt="edit" />
                      </span>
                      <span className='cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/xyfswyxf.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </span>
                    </div>
                  </td>
                </tr>
              })}
            </tbody>
          </table></div>}
        </div>

      </div>
    </>
  )
}

export default Manager
