import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ChatBox from '@/Components/ChatBox';
import { Head } from '@inertiajs/react';

export default function Dashboard({ user }) {

    const rootUrl = "http://127.0.0.1:8000";

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    
                    { user ? (
                        <>
                            <div className="p-6 text-gray-900">
                                You're logged in!
                            </div>
                            <div className="p-6 text-gray-900">
                                Welcome, {user.name}
                            </div>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}

                    </div>
                </div>
            </div>

            <ChatBox rootUrl={rootUrl} user={user}/>

        </AuthenticatedLayout>
    );
}
