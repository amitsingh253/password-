import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuid } from 'uuid';

const Manager = () => {
    const eyeIcon = useRef()
    const passRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passAry, setPassAry] = useState([])

    // Load all the pass from Local storage
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPassAry(JSON.parse(passwords)) // convert string to JSON and add data
        }
    }, [])

    // Functions

    const copyText = (text) => {
        navigator.clipboard.writeText(text)

        // Toast emitter
        toast('📋Copied to clipboard!', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    }
    const togglePass = () => {
        if (eyeIcon.current.src.includes("visibility_on.svg")) {
            passRef.current.type = "password"
            eyeIcon.current.src = "icons/visibility_off.svg"
        }
        else {
            passRef.current.type = "text"
            eyeIcon.current.src = "icons/visibility_on.svg"
        }
    }
    const savePass = () => {
        if (form.site == "" || form.username == "" || form.password == "") {
            // alert("Please fill all the values.")
            toast('❗ Not Saved!', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            return;
        }

        setPassAry([...passAry, { ...form, id: uuid() }])
        localStorage.setItem("passwords", JSON.stringify([...passAry, { ...form, id: uuid() }]))
        console.log([...passAry, { ...form, id: uuid() }]);

        // Empty the form after saving
        setForm({ site: "", username: "", password: "" })

        toast('💾 Saved!', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    }
    const handleEdit = (id) => {
        // Fill the selected data in the input tags to change
        let selected = passAry.filter(item => item.id == id)
        setForm(selected[0])
        console.log(selected[0]);

        // Display the remaining data
        let unSelected = passAry.filter(item => item.id !== id) // get all the todos except the button clicked
        setPassAry(unSelected)
    }
    const handleDelete = (id) => {
        let resp = confirm("Are you sure you want to delete this password?")
        if (resp) {
            let unSelected = passAry.filter(item => item.id !== id) // get all the todos except the button clicked
            setPassAry(unSelected)
            localStorage.setItem("passwords", JSON.stringify(unSelected))

            toast('🗑️ Deleted!', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }
    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (

        <div className='main min-h-[89vh] flex justify-center items-center text-white'>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="box min-h-[60vh] bg-gray-800 w-[95vw] p-3 py-2 flex flex-col gap-5 mobile rounded-md">
                {/* Logo */}
                <div className='logo text-center'>
                    <span className="logo text-3xl font-bold">
                        <span className='text-green-500'>&lt;</span>
                        <span>Pass</span>
                        <span className='text-green-500'>OP/&gt;</span>
                    </span>
                    <div>Your own Password Manager</div>
                </div>

                {/* Input tags */}
                <div>
                    <div><input value={form.site} onChange={handleChange} name='site'
                        placeholder='Enter your website URL' className='input' type="text" id="site" />
                    </div>

                    <div className='flex flex-col md:flex-row gap-5 justify-between mt-5'>
                        <input value={form.username} onChange={handleChange} name='username'
                            placeholder='Username' className='input' type="text" id="user" />
                        <span className='relative w-full'>
                            <input ref={passRef} value={form.password} onChange={handleChange} name='password'
                                placeholder='Password' className='input' type="password" id="pass" />
                            <button onClick={togglePass} className='absolute top-2 right-4 text-black'>
                                <img ref={eyeIcon} className='text-black' src="icons/visibility_off.svg" />
                            </button>
                        </span>
                    </div>
                </div>

                <button onClick={savePass} className='flex justify-center items-center gap-1 w-fit mx-auto bg-green-500 px-5 rounded-full hover:bg-green-600'>
                    <img className='w-[40px]' src="icons/add.png" alt="" />
                    Save
                </button>

                {/* Passwords container */}
                {passAry.length == 0 && <div>No passwords to show</div>}

                {passAry.length != 0 && <div>
                    <h2 className='text-xl font-bold mb-3'>Your Passwords</h2>
                    <table className="table-auto w-full text-center rounded-md overflow-hidden">
                        <thead>
                            <tr className='bg-green-600 text-md'>
                                <th className='py-1 w-12 font-medium'>Site</th>
                                <th className='py-1 w-12 font-medium'>Username</th>
                                <th className='py-1 w-12 font-medium'>Password</th>
                                <th className='py-1 w-12 font-medium'>Actions</th>
                            </tr>
                        </thead>

                        <tbody className='bg-gray-700'>
                            {passAry.map((item, index) => {
                                return <tr key={index}>
                                    <td>
                                        <div onClick={() => copyText(item.site)} className='flex items-center gap-1 justify-center cursor-pointer my-1'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <img src="icons/copy.svg" alt="" />
                                        </div>
                                    </td>
                                    <td>
                                        <div onClick={() => copyText(item.username)} className='flex items-center gap-1 justify-center cursor-pointer'>
                                            {item.username}
                                            <img src="icons/copy.svg" alt="" />
                                        </div>
                                    </td>
                                    <td>
                                        <div onClick={() => copyText(item.password)} className='flex items-center gap-1 justify-center cursor-pointer'>
                                            {item.password}
                                            <img src="icons/copy.svg" alt="" />
                                        </div>
                                    </td>

                                    {/* Edit and delete buttons */}
                                    <td>
                                        <div className='flex items-center gap-2 justify-center cursor-pointer'>
                                            <span onClick={() => handleEdit(item.id)} className="material-symbols-outlined text-blue-400 hover:text-blue-500">
                                                edit
                                            </span>
                                            <span onClick={() => handleDelete(item.id)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    colors="primary:#e83a30"
                                                    style={{ "width": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                </div>}
            </div>
        </div >
    )
}

export default Manager