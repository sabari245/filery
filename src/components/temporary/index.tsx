import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { QrCodeIcon, PlusIcon } from '@heroicons/react/24/outline'
import QRCode from "qrcode.react";
import Modal from './modal';

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

export default function TemporaryDashboard() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [qrCode, setQrCode] = useState('');

    function openModal(content: string) {
        setIsModalOpen(true);
        setQrCode(content);
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
                            <button className="inline-block px-4 py-2 text-xs font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700">
                                <span className='mr-3'><PlusIcon className='inline-block w-4 h-4' /></span>Add File
                            </button>
                        </div>

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
                        <Modal open={isModalOpen} setOpen={setIsModalOpen} content={qrCode} />
                    </div>
                </main>
            </div>
        </>
    )
}
