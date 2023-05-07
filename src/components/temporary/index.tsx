import { Fragment, useEffect, useRef, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { QrCodeIcon, PlusIcon } from '@heroicons/react/24/outline'
import QRCode from "qrcode.react";
import QRModal from './qrModal';

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

const title = ["Name", "Size", "Date", "Download"]
const records = [
    {
        name: 'IMG_4985.HEIC',
        size: '3.9 MB',
        date: 'July 11, 2020',
        href: 'https://google.com',
    },
    {
        name: 'IMG_4986.HEIC',
        size: '3.1 MB',
        date: 'July 11, 2020',
        href: '#',
    },
    {
        name: 'IMG_4987.HEIC',
        size: '2.9 MB',
        date: 'July 11, 2020',
        href: '#',
    },
]


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function FileUploading() {
    return (
        <div className="relative w-full p-4 mb-8 overflow-hidden bg-white shadow-lg rounded-xl md:w-72">
            <div className="flex items-center w-full">
                <a href="#" className="relative block p-2 text-indigo-600 bg-indigo-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                    </svg>
                </a>
                <div className="flex flex-col items-center ml-2">
                    <span className="">
                        Uploading file
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-between my-2">
            </div>
            <div className="w-full h-2 bg-blue-200 rounded-full">
                <div className="w-2/3 h-full text-xs text-center text-white bg-blue-600 rounded-full">
                </div>
            </div>
        </div>
    )
}

export default function TemporaryDashboard() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const fileUploadRef = useRef<HTMLInputElement>(null);

    function openModal(content: string) {
        setIsModalOpen(true);
        setQrCode(content);
    }

    function handleFileUpload() {
        fileUploadRef.current?.click();
    }

    return (
        <>
            <div className="min-h-full">

                <header className="bg-white shadow">
                    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">File Sharing</h1>
                    </div>
                </header>
                <main>
                    <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative px-3 py-1 text-sm leading-6 text-gray-600 rounded-full ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                create an account for more benefits. It’s your choice! 😊 .{' '}
                                <a href="#" className="font-semibold text-indigo-600">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    Sign In <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-row-reverse my-4">
                            <input ref={fileUploadRef} type='file' hidden />
                            <button onClick={handleFileUpload} className="inline-block px-4 py-2 text-xs font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700">
                                <span className='mr-3'><PlusIcon className='inline-block w-4 h-4' /></span>Add File
                            </button>
                        </div>

                        <FileUploading />

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm bg-white divide-y-2 divide-gray-200">
                                <thead className="ltr:text-left rtl:text-right">
                                    <tr>
                                        {
                                            title.map((item, key) => (
                                                <th key={key} className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
                                                    {item}
                                                </th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {
                                        records.map((file, key) => (
                                            <tr key={key}>
                                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                    {file.name}
                                                </td>
                                                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{file.size}</td>
                                                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{file.date}</td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <button onClick={() => openModal(file.href)} className="inline-block px-4 py-2 text-xs font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700">
                                                        QR Code <span className='ml-3'>
                                                            <QrCodeIcon className="inline-block w-4 h-4" />
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <QRModal open={isModalOpen} setOpen={setIsModalOpen} content={qrCode} />
                    </div>
                </main>
            </div>
        </>
    )
}
